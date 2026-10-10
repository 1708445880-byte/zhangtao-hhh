"""Browser smoke checks. Requires Python Playwright and Chromium on PATH."""
from pathlib import Path
from playwright.sync_api import sync_playwright, expect
import json
import os
import shutil
from urllib.parse import urljoin

base = os.environ.get('PORTFOLIO_TEST_URL', 'http://127.0.0.1:5173').rstrip('/')
root = Path(__file__).resolve().parents[1]
output = root / 'artifacts'
output.mkdir(exist_ok=True)
report = {'widths': [], 'projects': [], 'errors': []}

with sync_playwright() as p:
    browser = p.chromium.launch(executable_path=shutil.which('chromium'), headless=True, args=['--no-sandbox'])
    page = browser.new_page(viewport={'width': 1440, 'height': 1080}, permissions=['clipboard-read', 'clipboard-write'])
    page.on('pageerror', lambda e: report['errors'].append(str(e)))
    page.goto(base, wait_until='networkidle')
    expect(page.locator('.project-card')).to_have_count(16)
    for width in [320, 375, 390, 600, 768, 1024, 1440]:
        page.set_viewport_size({'width': width, 'height': 1080})
        assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'), f'Home overflow at {width}px'
        assert page.locator('.hero-feature > img').evaluate('(e)=>e.clientHeight') <= 170, f'Oversized hero at {width}px'
        assert page.locator('.project-image').first.evaluate('(e)=>e.clientHeight') <= 190, f'Oversized thumbnail at {width}px'
        report['widths'].append(width)
    page.screenshot(path=str(output / 'desktop.png'), full_page=True)
    page.screenshot(path=str(output / 'desktop-top.png'))
    page.set_viewport_size({'width': 390, 'height': 844})
    page.screenshot(path=str(output / 'mobile.png'), full_page=True)
    page.screenshot(path=str(output / 'mobile-top.png'))
    page.locator('.hero-route [data-quick-filter="lighting"]').click()
    expect(page.locator('.project-card')).to_have_count(7)
    expect(page.locator('#project-count')).to_have_text('07 / 16 个项目')
    page.locator('[data-view="list"]').click()
    expect(page.locator('#project-grid')).to_have_class('project-grid list-view')
    assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'), 'Mobile list overflow'
    page.locator('[data-view="grid"]').click()
    expect(page.locator('#project-grid')).to_have_class('project-grid')
    for category, count in [('lighting', 7), ('previsualization', 4), ('theatre', 5), ('all', 16)]:
        page.locator(f'[data-filter="{category}"]').click()
        expect(page.locator('.project-card')).to_have_count(count)
        expect(page.locator(f'[data-filter="{category}"]')).to_have_attribute('aria-pressed', 'true')
    urls = page.locator('.project-card').evaluate_all('(els)=>els.map(e=>e.getAttribute("href"))')
    for url in urls:
        page.goto(urljoin(base + '/', url), wait_until='networkidle')
        expect(page.locator('.project-detail')).to_have_count(1)
        page.locator('.site-footer').scroll_into_view_if_needed()
        page.wait_for_function('Array.from(document.querySelectorAll(".detail-gallery img,.detail-cover")).every(i=>i.complete && i.naturalWidth>0)')
        for width in [320, 390, 768, 1440]:
            page.set_viewport_size({'width': width, 'height': 900})
            assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'), f'Overflow at {url}, {width}px'
            assert page.locator('.gallery-image img').first.evaluate('(e)=>e.clientHeight') <= 200, f'Oversized gallery at {url}, {width}px'
        page.locator('.gallery-image').first.click()
        expect(page.locator('dialog')).to_be_visible()
        page.keyboard.press('Escape')
        expect(page.locator('dialog')).to_have_count(0)
        assert not page.evaluate('document.body.classList.contains("modal-open")'), f'Scroll lock remains: {url}'
        report['projects'].append({'route': url, 'images': page.locator('.detail-gallery img').count(), 'passed': True})
    page.locator('#project-selector').select_option(label='02 / 星海之汐')
    expect(page).to_have_url(base + '/work/star-tide')
    page.locator('.page-rail [data-quick-filter="previsualization"]').click()
    expect(page.locator('.project-card')).to_have_count(4)
    expect(page.locator('[data-filter="previsualization"]')).to_have_attribute('aria-pressed', 'true')
    page.locator('[data-filter="all"]').click()
    page.goto(base, wait_until='networkidle')
    page.locator('a.project-card[href$="/work/star-tide"]').click()
    expect(page).to_have_url(base + '/work/star-tide')
    page.locator('.back-link').click()
    expect(page.locator('.project-card')).to_have_count(16)
    page.locator('a.project-card[href$="/work/star-tide"]').click()
    page.go_back()
    expect(page.locator('.project-card')).to_have_count(16)
    page.locator('.site-header nav a').nth(1).click()
    expect(page).to_have_url(base + '/#about')
    expect(page.locator('.education')).to_contain_text('中央戏剧学院')
    expect(page.locator('a[href="mailto:tao_0706@foxmail.com"]')).to_have_count(1)
    page.locator('#copy-wechat').click()
    expect(page.locator('.copy-status')).to_have_text('微信号已复制。')
    resume = page.request.get(base + '/files/resume.pdf')
    assert resume.status == 200 and resume.body().startswith(b'%PDF'), 'Résumé PDF did not load'
    if os.environ.get('PORTFOLIO_STATIC'):
        page.evaluate("history.pushState({}, '', new URL('work/does-not-exist', document.querySelector('.wordmark').href)); window.dispatchEvent(new PopStateEvent('popstate'))")
    else:
        page.goto(base + '/work/does-not-exist', wait_until='networkidle')
    expect(page.locator('.not-found')).to_have_count(1)
    page.goto(base + '/work/star-tide', wait_until='networkidle')
    page.set_viewport_size({'width': 390, 'height': 844})
    page.screenshot(path=str(output / 'project-mobile.png'), full_page=True)
    assert not report['errors'], report['errors']
    browser.close()

(output / 'validation.json').write_text(json.dumps(report, ensure_ascii=False, indent=2))
print('PASS: 7 screen widths and compact images; 16 project routes; category shortcuts; grid/list switch; project selector; zoom + Escape; history; résumé PDF; contact copy; no JS errors.')
