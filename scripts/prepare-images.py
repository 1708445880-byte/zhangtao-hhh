"""Create responsive previews; keep the portfolio originals for full-screen viewing.

Requires Pillow. Generated previews and their manifest are checked in so normal
Vite builds do not need Python or an image-processing dependency.
"""
from pathlib import Path
from PIL import Image, ImageOps
import json

root = Path(__file__).resolve().parents[1]
source = root / 'public/images'
target = source / 'previews'
target.mkdir(exist_ok=True)
manifest = {}
original_bytes = preview_bytes = 0
for path in sorted(source.glob('*.webp')):
    original_bytes += path.stat().st_size
    with Image.open(path) as original:
        image = ImageOps.exif_transpose(original).convert('RGB')
        variants = []
        for size in (240, 480, 800):
            width = min(size, image.width)
            height = round(image.height * width / image.width)
            preview = image.resize((width, height), Image.Resampling.LANCZOS)
            filename = f'{path.stem}-{size}.webp'
            preview.save(target / filename, 'WEBP', quality=74 if size < 800 else 79, method=6)
            variants.append({'width': width, 'path': f'/images/previews/{filename}'})
            if size == 480:
                preview_bytes += (target / filename).stat().st_size
        manifest[f'/images/{path.name}'] = {'width': image.width, 'height': image.height, 'variants': variants}
(root / 'src/image-manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, separators=(',', ':')) + '\n')
print(f'Created {len(manifest) * 3} previews. 480px set: {preview_bytes:,} bytes; originals: {original_bytes:,} bytes ({(1 - preview_bytes / original_bytes):.0%} smaller).')
