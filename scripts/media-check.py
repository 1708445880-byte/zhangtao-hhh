"""Check mobile preview traffic, SVG icons and recovery after failed requests."""
from pathlib import Path
from urllib.parse import urlparse
from playwright.sync_api import sync_playwright, expect
import json
import os
import re
import shutil
import time

root = Path(__file__).resolve().parents[1]
base = os.environ.get('PORTFOLIO_TEST_URL', 'http://127.0.0.1:5173').rstrip('/')
output = root / 'artifacts'
output.mkdir(exist_ok=True)
report = {}
image_manifest = json.loads((root / 'src/image-manifest.json').read_text())

with sync_playwright() as p:
    browser = p.chromium.launch(executable_path=shutil.which('chromium'), headless=True, args=['--no-sandbox'])
    context = browser.new_context(viewport={'width': 390, 'height': 844}, device_scale_factor=3, is_mobile=True, has_touch=True)
    page = context.new_page()
    image_requests = set()
    errors = []
    page.on('request', lambda request: image_requests.add(request.url) if request.resource_type == 'image' else None)
    page.on('pageerror', lambda error: errors.append(str(error)))
    network = context.new_cdp_session(page)
    network.send('Network.enable')
    network.send('Network.setCacheDisabled', {'cacheDisabled': True})
    network.send('Network.emulateNetworkConditions', {
        'offline': False, 'latency': 300,
        'downloadThroughput': 1_500_000 / 8, 'uploadThroughput': 750_000 / 8,
    })
    start = time.monotonic()
    page.goto(base, wait_until='domcontentloaded')
    page.wait_for_function('document.querySelector(".hero-feature img")?.naturalWidth > 0 && document.querySelector(".project-image img")?.naturalWidth > 0', timeout=20000)
    report['simulated_mobile_first_images_seconds'] = round(time.monotonic() - start, 2)
    assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'), 'Mobile overflow'
    assert page.locator('.ui-icon').count() > 20
    assert page.locator('.ui-icon svg').count() == page.locator('.ui-icon').count(), 'A UI icon is not an SVG'
    assert not page.evaluate('/[↗→←↓×＋▦☰]/u.test(document.body.innerText)'), 'A font-based UI icon remains'
    for selector in ['.hero', '.site-header', '.project-card', '.about']:
        color = page.locator(selector).first.evaluate('(e)=>getComputedStyle(e).backgroundColor')
        assert min(int(c.strip()) for c in color[4:-1].split(',')) >= 235, f'Dark surface remains: {selector}'
    page.screenshot(path=str(output / 'mobile-network.png'))
    height = page.evaluate('document.documentElement.scrollHeight')
    for position in range(0, height, 500):
        page.evaluate('(y)=>window.scrollTo({top:y,behavior:"instant"})', position)
        page.wait_for_timeout(200)
    page.wait_for_function('Array.from(document.images).filter(i=>getComputedStyle(i).display!=="none").every(i=>i.complete && i.naturalWidth>0)', timeout=20000)
    paths = {urlparse(url).path.split('/images/', 1)[1] for url in image_requests if '/images/' in url}
    assert paths and all(path.startswith('previews/') for path in paths), 'Homepage fetched full-size originals'
    preview_bytes = sum((root / 'public/images' / path).stat().st_size for path in paths)
    originals = {Path(path).stem.rsplit('-', 1)[0] + '.webp' for path in paths}
    original_bytes = sum((root / 'public/images' / path).stat().st_size for path in originals)
    assert preview_bytes < original_bytes * .3, 'Mobile preview traffic is not substantially smaller'
    report.update({'requested_preview_bytes': preview_bytes, 'equivalent_original_bytes': original_bytes, 'image_payload_reduction': round(1-preview_bytes/original_bytes, 3), 'svg_icons': page.locator('.ui-icon svg').count()})
    context.close()

    # Fail one unique image three times: initial request and both automatic retries.
    context = browser.new_context(viewport={'width': 390, 'height': 844}, device_scale_factor=2, is_mobile=True)
    page = context.new_page()
    attempts = []
    def fail_then_recover(route):
        attempts.append(route.request.url)
        if len(attempts) <= 3:
            route.abort('failed')
        else:
            route.continue_()
    page.route('**/images/previews/c02-1-*', fail_then_recover)
    page.goto(base, wait_until='networkidle')
    page.locator('.portrait').scroll_into_view_if_needed()
    expect(page.locator('.image-status')).to_be_visible(timeout=10000)
    assert len(attempts) == 3, f'Unexpected automatic retry count: {len(attempts)}'
    page.locator('.image-status button').click()
    page.wait_for_function('document.querySelector(".portrait").naturalWidth>0')
    expect(page.locator('.image-status')).to_be_hidden()
    assert len(attempts) == 4, 'Manual retry did not request the failed image'
    report['automatic_and_manual_recovery'] = True

    # Offline-to-online recovery retries the remaining failed image without a click.
    attempts.clear()
    page.reload(wait_until='networkidle')
    page.locator('.portrait').scroll_into_view_if_needed()
    expect(page.locator('.image-status')).to_be_visible(timeout=10000)
    page.evaluate('window.dispatchEvent(new Event("online"))')
    page.wait_for_function('document.querySelector(".portrait").naturalWidth>0')
    expect(page.locator('.image-status')).to_be_hidden()
    report['online_recovery'] = True

    # The viewer starts with a preview while the original is delayed.
    page.goto(base + '/work/star-tide', wait_until='networkidle')
    original_requests = []
    def delay_first_original(route):
        original_requests.append(route)
        if len(original_requests) > 1:
            route.continue_()
    page.route('**/images/a01-1.webp', delay_first_original)
    page.locator('.gallery-image').first.click()
    expect(page.locator('dialog img')).to_have_attribute('srcset', re.compile('previews/'))
    page.wait_for_function('document.querySelector("dialog img")?.naturalWidth>0')
    expect(page.locator('.lightbox-progress')).to_have_text('加载高清图片…')
    assert len(original_requests) == 1
    # Navigate before the delayed original returns: it must not overwrite the next image.
    page.locator('.lightbox-next').click()
    page.wait_for_function('document.querySelector("dialog img")?.src.includes("/images/a01-2.webp") && !document.querySelector("dialog img")?.hasAttribute("srcset")')
    original_requests[0].continue_()
    page.wait_for_timeout(250)
    assert '/images/a01-2.webp' in page.locator('dialog img').get_attribute('src'), 'Late original overwrote the current slide'
    page.locator('.lightbox-previous').click()
    page.wait_for_function('(width)=>document.querySelector("dialog img")?.src.includes("/images/a01-1.webp") && document.querySelector("dialog img")?.naturalWidth===width', arg=image_manifest['/images/a01-1.webp']['width'])
    expect(page.locator('.lightbox-progress')).to_have_text('高清图片')
    page.locator('.lightbox-close').click()
    expect(page.locator('dialog')).to_have_count(0)
    report['progressive_full_resolution_viewer'] = True
    report['late_original_does_not_overwrite_next_slide'] = True
    assert not errors, errors
    context.close()
    browser.close()

(output / 'media-validation.json').write_text(json.dumps(report, ensure_ascii=False, indent=2))
print(f'PASS: mobile 3× display, simulated 1.5 Mbps / 300 ms network; SVG icons; {report["image_payload_reduction"]:.0%} less image data; automatic, manual and online recovery; full-resolution viewer.')
