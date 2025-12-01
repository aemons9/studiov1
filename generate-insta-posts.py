#!/usr/bin/env python3
"""
VeraLabs Instagram Post Generator
Creates premium haute couture Instagram posts with model photography
"""

from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance
import os
import random
from pathlib import Path

# Brand Design System
COLORS = {
    'cream_white': (250, 248, 245),
    'ivory': (247, 243, 237),
    'champagne': (232, 223, 211),
    'nude_beige': (212, 196, 176),
    'warm_taupe': (184, 162, 142),
    'soft_charcoal': (62, 58, 55),
    'deep_espresso': (28, 25, 23),
    'rose_gold': (232, 180, 184),
    'pale_gold': (212, 175, 55),
    'dusty_mauve': (200, 162, 184),
}

# Instagram dimensions
SQUARE = (1080, 1080)
PORTRAIT = (1080, 1350)  # 4:5
STORY = (1080, 1920)  # 9:16

PHOTO_DIR = Path('/home/user/studiov1/photo')
OUTPUT_DIR = Path('/home/user/studiov1/photo')

def get_font(size, bold=False):
    """Get a system font or fallback"""
    fonts_to_try = [
        '/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf',
        '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',
        '/usr/share/fonts/truetype/liberation/LiberationSerif-Regular.ttf',
        '/usr/share/fonts/truetype/freefont/FreeSerif.ttf',
    ]
    if bold:
        fonts_to_try = [
            '/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf',
            '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',
            '/usr/share/fonts/truetype/liberation/LiberationSerif-Bold.ttf',
        ] + fonts_to_try

    for font_path in fonts_to_try:
        if os.path.exists(font_path):
            try:
                return ImageFont.truetype(font_path, size)
            except:
                continue
    return ImageFont.load_default()

def load_and_crop_image(img_path, target_size):
    """Load image and crop to target aspect ratio"""
    img = Image.open(img_path).convert('RGB')

    # Calculate aspect ratios
    target_ratio = target_size[0] / target_size[1]
    img_ratio = img.width / img.height

    if img_ratio > target_ratio:
        # Image is wider, crop width
        new_width = int(img.height * target_ratio)
        left = (img.width - new_width) // 2
        img = img.crop((left, 0, left + new_width, img.height))
    else:
        # Image is taller, crop height
        new_height = int(img.width / target_ratio)
        top = (img.height - new_height) // 2
        img = img.crop((0, top, img.width, top + new_height))

    return img.resize(target_size, Image.Resampling.LANCZOS)

def add_gradient_overlay(img, direction='bottom', color=(0, 0, 0), opacity=0.6):
    """Add gradient overlay"""
    overlay = Image.new('RGBA', img.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)

    width, height = img.size

    if direction == 'bottom':
        for y in range(height):
            alpha = int(255 * opacity * (y / height) ** 1.5)
            draw.rectangle([(0, y), (width, y + 1)], fill=(*color, alpha))
    elif direction == 'top':
        for y in range(height):
            alpha = int(255 * opacity * ((height - y) / height) ** 1.5)
            draw.rectangle([(0, y), (width, y + 1)], fill=(*color, alpha))
    elif direction == 'center_vignette':
        for y in range(height):
            for x in range(width):
                # Distance from center
                cx, cy = width // 2, height // 2
                dist = ((x - cx) ** 2 + (y - cy) ** 2) ** 0.5
                max_dist = ((cx) ** 2 + (cy) ** 2) ** 0.5
                alpha = int(255 * opacity * (dist / max_dist) ** 2)
                overlay.putpixel((x, y), (*color, min(alpha, 255)))

    img_rgba = img.convert('RGBA')
    return Image.alpha_composite(img_rgba, overlay).convert('RGB')

def add_vignette(img, strength=0.4):
    """Add subtle vignette effect"""
    width, height = img.size
    overlay = Image.new('RGBA', img.size, (0, 0, 0, 0))

    cx, cy = width // 2, height // 2
    max_dist = (cx ** 2 + cy ** 2) ** 0.5

    # Create vignette pixel by pixel (optimized with numpy would be faster)
    pixels = overlay.load()
    for y in range(height):
        for x in range(width):
            dist = ((x - cx) ** 2 + (y - cy) ** 2) ** 0.5
            alpha = int(255 * strength * (dist / max_dist) ** 2)
            pixels[x, y] = (0, 0, 0, min(alpha, 200))

    img_rgba = img.convert('RGBA')
    return Image.alpha_composite(img_rgba, overlay).convert('RGB')

def draw_text_with_shadow(draw, pos, text, font, fill, shadow_color=(0, 0, 0), shadow_offset=2):
    """Draw text with shadow"""
    x, y = pos
    # Draw shadow
    draw.text((x + shadow_offset, y + shadow_offset), text, font=font, fill=shadow_color)
    # Draw text
    draw.text(pos, text, font=font, fill=fill)

def create_minimal_couture_post(photo_path, output_name, look_number):
    """Create minimal couture post with elegant typography"""
    img = load_and_crop_image(photo_path, SQUARE)

    # Apply subtle color grading
    enhancer = ImageEnhance.Contrast(img)
    img = enhancer.enhance(1.1)
    enhancer = ImageEnhance.Color(img)
    img = enhancer.enhance(0.9)

    # Add gradient overlay
    img = add_gradient_overlay(img, 'bottom', COLORS['deep_espresso'], 0.5)

    draw = ImageDraw.Draw(img)

    # Typography
    title_font = get_font(72, bold=True)
    subtitle_font = get_font(24)
    brand_font = get_font(18)

    # Look number
    look_text = f"LOOK {look_number}"
    draw_text_with_shadow(draw, (60, SQUARE[1] - 180), look_text, subtitle_font, COLORS['pale_gold'])

    # Title
    draw_text_with_shadow(draw, (60, SQUARE[1] - 140), "Haute Couture", title_font, COLORS['cream_white'])

    # Brand
    draw.text((60, SQUARE[1] - 50), "VERALABS", font=brand_font, fill=COLORS['warm_taupe'])

    # Corner accents
    accent_color = (*COLORS['pale_gold'], 200)
    draw.line([(40, 40), (120, 40)], fill=COLORS['pale_gold'], width=1)
    draw.line([(40, 40), (40, 120)], fill=COLORS['pale_gold'], width=1)
    draw.line([(SQUARE[0] - 120, SQUARE[1] - 40), (SQUARE[0] - 40, SQUARE[1] - 40)], fill=COLORS['pale_gold'], width=1)
    draw.line([(SQUARE[0] - 40, SQUARE[1] - 120), (SQUARE[0] - 40, SQUARE[1] - 40)], fill=COLORS['pale_gold'], width=1)

    img.save(OUTPUT_DIR / f'{output_name}.jpg', 'JPEG', quality=95)
    print(f"Created: {output_name}.jpg")

def create_editorial_split_post(photo_path1, photo_path2, output_name):
    """Create editorial split post with two images"""
    img = Image.new('RGB', SQUARE, COLORS['cream_white'])

    # Load and place photos
    left_img = load_and_crop_image(photo_path1, (520, 900))
    right_img = load_and_crop_image(photo_path2, (520, 900))

    img.paste(left_img, (20, 90))
    img.paste(right_img, (540, 90))

    draw = ImageDraw.Draw(img)

    # Add divider line
    draw.line([(540, 90), (540, 990)], fill=COLORS['rose_gold'], width=2)

    # Typography
    title_font = get_font(48, bold=True)
    brand_font = get_font(14)

    # Top text
    draw.text((SQUARE[0] // 2, 35), "EDITORIAL", font=get_font(16), fill=COLORS['warm_taupe'], anchor='mm')

    # Bottom brand
    draw.text((SQUARE[0] // 2, SQUARE[1] - 35), "VERALABS", font=brand_font, fill=COLORS['soft_charcoal'], anchor='mm')

    img.save(OUTPUT_DIR / f'{output_name}.jpg', 'JPEG', quality=95)
    print(f"Created: {output_name}.jpg")

def create_framed_portrait_post(photo_path, output_name, title):
    """Create elegant framed portrait"""
    img = Image.new('RGB', SQUARE, COLORS['ivory'])

    # Load photo with frame
    photo = load_and_crop_image(photo_path, (880, 880))

    # Create frame effect
    frame_size = 40
    img.paste(photo, (100, 100))

    draw = ImageDraw.Draw(img)

    # Double frame
    draw.rectangle([(80, 80), (1000, 1000)], outline=COLORS['champagne'], width=1)
    draw.rectangle([(95, 95), (985, 985)], outline=COLORS['pale_gold'], width=1)

    # Top left corner accent
    draw.rectangle([(60, 60), (140, 65)], fill=COLORS['pale_gold'])
    draw.rectangle([(60, 60), (65, 140)], fill=COLORS['pale_gold'])

    # Bottom right corner accent
    draw.rectangle([(940, 1015), (1020, 1020)], fill=COLORS['pale_gold'])
    draw.rectangle([(1015, 940), (1020, 1020)], fill=COLORS['pale_gold'])

    # Brand text
    brand_font = get_font(14)
    draw.text((SQUARE[0] // 2, 50), "VERALABS", font=brand_font, fill=COLORS['warm_taupe'], anchor='mm')
    draw.text((SQUARE[0] // 2, SQUARE[1] - 50), title.upper(), font=get_font(12), fill=COLORS['soft_charcoal'], anchor='mm')

    img.save(OUTPUT_DIR / f'{output_name}.jpg', 'JPEG', quality=95)
    print(f"Created: {output_name}.jpg")

def create_magazine_cover_post(photo_path, output_name, title, subtitle):
    """Create magazine cover style post"""
    img = load_and_crop_image(photo_path, PORTRAIT)

    # Enhance
    enhancer = ImageEnhance.Contrast(img)
    img = enhancer.enhance(1.15)

    # Add overlay
    img = add_gradient_overlay(img, 'bottom', COLORS['deep_espresso'], 0.6)
    img = add_gradient_overlay(img, 'top', COLORS['deep_espresso'], 0.3)

    draw = ImageDraw.Draw(img)

    # Magazine masthead
    masthead_font = get_font(64, bold=True)
    draw.text((PORTRAIT[0] // 2, 80), "VERALABS", font=masthead_font, fill=COLORS['cream_white'], anchor='mm')

    # Subtitle
    draw.text((PORTRAIT[0] // 2, 130), "HAUTE COUTURE STUDIO", font=get_font(14), fill=COLORS['pale_gold'], anchor='mm')

    # Main title at bottom
    title_font = get_font(56, bold=True)
    draw.text((60, PORTRAIT[1] - 200), title.upper(), font=title_font, fill=COLORS['cream_white'])

    # Subtitle
    draw.text((60, PORTRAIT[1] - 130), subtitle, font=get_font(20), fill=COLORS['rose_gold'])

    # Issue info
    draw.text((60, PORTRAIT[1] - 80), "COLLECTION 2025", font=get_font(14), fill=COLORS['warm_taupe'])

    # Decorative lines
    draw.line([(60, PORTRAIT[1] - 220), (400, PORTRAIT[1] - 220)], fill=COLORS['pale_gold'], width=1)

    img.save(OUTPUT_DIR / f'{output_name}.jpg', 'JPEG', quality=95)
    print(f"Created: {output_name}.jpg")

def create_quote_overlay_post(photo_path, output_name, quote, author):
    """Create quote overlay post"""
    img = load_and_crop_image(photo_path, SQUARE)

    # Darken and desaturate slightly
    enhancer = ImageEnhance.Brightness(img)
    img = enhancer.enhance(0.7)
    enhancer = ImageEnhance.Color(img)
    img = enhancer.enhance(0.8)

    # Add vignette
    img = add_vignette(img, 0.5)

    draw = ImageDraw.Draw(img)

    # Quote marks
    quote_mark_font = get_font(120, bold=True)
    draw.text((80, 300), '"', font=quote_mark_font, fill=(*COLORS['pale_gold'], 150))

    # Quote text - wrap manually
    quote_font = get_font(42, bold=True)
    words = quote.split()
    lines = []
    current_line = []
    for word in words:
        current_line.append(word)
        test_line = ' '.join(current_line)
        bbox = draw.textbbox((0, 0), test_line, font=quote_font)
        if bbox[2] > 900:
            current_line.pop()
            lines.append(' '.join(current_line))
            current_line = [word]
    if current_line:
        lines.append(' '.join(current_line))

    y_pos = 400
    for line in lines:
        draw.text((SQUARE[0] // 2, y_pos), line, font=quote_font, fill=COLORS['cream_white'], anchor='mm')
        y_pos += 60

    # Author
    draw.text((SQUARE[0] // 2, y_pos + 40), f"— {author}", font=get_font(20), fill=COLORS['rose_gold'], anchor='mm')

    # Brand
    draw.text((SQUARE[0] // 2, SQUARE[1] - 60), "VERALABS", font=get_font(16), fill=COLORS['warm_taupe'], anchor='mm')

    img.save(OUTPUT_DIR / f'{output_name}.jpg', 'JPEG', quality=95)
    print(f"Created: {output_name}.jpg")

def create_grid_collage_post(photo_paths, output_name):
    """Create 4-grid collage"""
    img = Image.new('RGB', SQUARE, COLORS['cream_white'])

    gap = 8
    cell_size = (SQUARE[0] - gap * 3) // 2

    positions = [
        (gap, gap),
        (gap * 2 + cell_size, gap),
        (gap, gap * 2 + cell_size),
        (gap * 2 + cell_size, gap * 2 + cell_size)
    ]

    for i, (photo_path, pos) in enumerate(zip(photo_paths[:4], positions)):
        photo = load_and_crop_image(photo_path, (cell_size, cell_size))
        img.paste(photo, pos)

    draw = ImageDraw.Draw(img)

    # Center overlay
    center_x, center_y = SQUARE[0] // 2, SQUARE[1] // 2
    overlay_size = 180

    # Semi-transparent center box
    overlay = Image.new('RGBA', SQUARE, (0, 0, 0, 0))
    overlay_draw = ImageDraw.Draw(overlay)
    overlay_draw.rectangle(
        [(center_x - overlay_size//2, center_y - overlay_size//2),
         (center_x + overlay_size//2, center_y + overlay_size//2)],
        fill=(*COLORS['cream_white'], 240)
    )
    img = Image.alpha_composite(img.convert('RGBA'), overlay).convert('RGB')

    draw = ImageDraw.Draw(img)
    draw.text((center_x, center_y - 20), "THE", font=get_font(16), fill=COLORS['warm_taupe'], anchor='mm')
    draw.text((center_x, center_y + 10), "COLLECTION", font=get_font(24, bold=True), fill=COLORS['deep_espresso'], anchor='mm')
    draw.text((center_x, center_y + 45), "VERALABS", font=get_font(12), fill=COLORS['pale_gold'], anchor='mm')

    img.save(OUTPUT_DIR / f'{output_name}.jpg', 'JPEG', quality=95)
    print(f"Created: {output_name}.jpg")

def create_minimal_text_post(photo_path, output_name, main_text, sub_text):
    """Create minimal text overlay post"""
    img = load_and_crop_image(photo_path, SQUARE)

    # Strong bottom gradient
    img = add_gradient_overlay(img, 'bottom', COLORS['deep_espresso'], 0.7)

    draw = ImageDraw.Draw(img)

    # Main text - large and elegant
    main_font = get_font(80, bold=True)
    draw.text((60, SQUARE[1] - 220), main_text.upper(), font=main_font, fill=COLORS['cream_white'])

    # Underline
    draw.line([(60, SQUARE[1] - 130), (300, SQUARE[1] - 130)], fill=COLORS['pale_gold'], width=2)

    # Subtext
    draw.text((60, SQUARE[1] - 100), sub_text, font=get_font(18), fill=COLORS['rose_gold'])

    # Brand in corner
    draw.text((SQUARE[0] - 60, 60), "VL", font=get_font(24, bold=True), fill=COLORS['cream_white'], anchor='rt')

    img.save(OUTPUT_DIR / f'{output_name}.jpg', 'JPEG', quality=95)
    print(f"Created: {output_name}.jpg")

def create_story_post(photo_path, output_name, look_number):
    """Create story format post (9:16)"""
    img = load_and_crop_image(photo_path, STORY)

    # Gradient overlays
    img = add_gradient_overlay(img, 'bottom', COLORS['deep_espresso'], 0.6)
    img = add_gradient_overlay(img, 'top', COLORS['deep_espresso'], 0.4)

    draw = ImageDraw.Draw(img)

    # Top brand
    draw.text((STORY[0] // 2, 100), "VERALABS", font=get_font(32, bold=True), fill=COLORS['cream_white'], anchor='mm')
    draw.text((STORY[0] // 2, 140), "HAUTE COUTURE", font=get_font(14), fill=COLORS['pale_gold'], anchor='mm')

    # Look number - large
    look_font = get_font(200, bold=True)
    draw.text((STORY[0] // 2, STORY[1] - 400), str(look_number).zfill(2), font=look_font, fill=(*COLORS['cream_white'][:3],), anchor='mm')

    # Look label
    draw.text((STORY[0] // 2, STORY[1] - 250), "LOOK", font=get_font(24), fill=COLORS['rose_gold'], anchor='mm')

    # Bottom info
    draw.text((STORY[0] // 2, STORY[1] - 100), "SWIPE UP TO EXPLORE", font=get_font(14), fill=COLORS['warm_taupe'], anchor='mm')

    # Decorative arrow
    arrow_y = STORY[1] - 60
    draw.polygon([(STORY[0]//2 - 10, arrow_y), (STORY[0]//2 + 10, arrow_y), (STORY[0]//2, arrow_y - 15)], fill=COLORS['cream_white'])

    img.save(OUTPUT_DIR / f'{output_name}.jpg', 'JPEG', quality=95)
    print(f"Created: {output_name}.jpg")

def create_color_blocked_post(photo_path, output_name, color_key='rose_gold'):
    """Create color blocked design"""
    img = Image.new('RGB', SQUARE, COLORS[color_key])

    # Photo in offset position
    photo = load_and_crop_image(photo_path, (700, 850))
    img.paste(photo, (280, 115))

    draw = ImageDraw.Draw(img)

    # Left side text area
    draw.text((60, 200), "THE", font=get_font(24), fill=COLORS['deep_espresso'])
    draw.text((60, 240), "ART", font=get_font(72, bold=True), fill=COLORS['deep_espresso'])
    draw.text((60, 320), "OF", font=get_font(24), fill=COLORS['deep_espresso'])
    draw.text((60, 360), "STYLE", font=get_font(72, bold=True), fill=COLORS['deep_espresso'])

    # Vertical text
    # draw.text((40, 600), "V E R A L A B S", font=get_font(12), fill=COLORS['soft_charcoal'])

    # Bottom brand
    draw.text((60, SQUARE[1] - 80), "VERALABS", font=get_font(14), fill=COLORS['soft_charcoal'])
    draw.text((60, SQUARE[1] - 55), "2025 COLLECTION", font=get_font(11), fill=COLORS['warm_taupe'])

    img.save(OUTPUT_DIR / f'{output_name}.jpg', 'JPEG', quality=95)
    print(f"Created: {output_name}.jpg")


def main():
    """Generate all Instagram posts"""
    print("=" * 50)
    print("VERALABS Instagram Post Generator")
    print("=" * 50)

    # Get all couture photos
    couture_photos = sorted([p for p in PHOTO_DIR.glob('couture-*.jpg') if 'insta' not in p.name])
    editorial_photos = sorted([p for p in PHOTO_DIR.glob('editorial-*.jpg')])
    minimal_photos = sorted([p for p in PHOTO_DIR.glob('minimal-*.jpg')])
    urban_photos = sorted([p for p in PHOTO_DIR.glob('contemporary-*.jpg')])

    all_photos = couture_photos + editorial_photos + minimal_photos + urban_photos

    print(f"\nFound {len(couture_photos)} couture photos")
    print(f"Found {len(editorial_photos)} editorial photos")
    print(f"Found {len(minimal_photos)} minimal photos")
    print(f"Found {len(urban_photos)} urban photos")
    print(f"Total: {len(all_photos)} photos\n")

    posts_created = 0

    # 1-5: Minimal Couture Posts
    print("\n--- Creating Minimal Couture Posts ---")
    for i, photo in enumerate(couture_photos[:5]):
        create_minimal_couture_post(photo, f'insta-couture-{i+1:02d}', i + 1)
        posts_created += 1

    # 6-8: Editorial Split Posts
    print("\n--- Creating Editorial Split Posts ---")
    if len(couture_photos) >= 6:
        create_editorial_split_post(couture_photos[5], couture_photos[6] if len(couture_photos) > 6 else couture_photos[0], 'insta-editorial-split-01')
        posts_created += 1
    if len(couture_photos) >= 8:
        create_editorial_split_post(couture_photos[7], couture_photos[8] if len(couture_photos) > 8 else couture_photos[1], 'insta-editorial-split-02')
        posts_created += 1
    if len(couture_photos) >= 10:
        create_editorial_split_post(couture_photos[9], couture_photos[10] if len(couture_photos) > 10 else couture_photos[2], 'insta-editorial-split-03')
        posts_created += 1

    # 9-11: Framed Portraits
    print("\n--- Creating Framed Portraits ---")
    titles = ["Eternal Elegance", "Quiet Luxury", "Timeless Beauty"]
    for i, photo in enumerate(couture_photos[10:13] if len(couture_photos) > 10 else couture_photos[:3]):
        create_framed_portrait_post(photo, f'insta-framed-{i+1:02d}', titles[i % len(titles)])
        posts_created += 1

    # 12-14: Magazine Cover Posts
    print("\n--- Creating Magazine Cover Posts ---")
    covers = [
        ("Silk", "The Art of Draping"),
        ("Gilded", "Golden Hour Collection"),
        ("Reverie", "Dreams in Fabric"),
    ]
    for i, (title, subtitle) in enumerate(covers):
        if i < len(couture_photos):
            idx = 13 + i if len(couture_photos) > 13 + i else i
            create_magazine_cover_post(couture_photos[idx], f'insta-magazine-{i+1:02d}', title, subtitle)
            posts_created += 1

    # 15-16: Quote Posts
    print("\n--- Creating Quote Posts ---")
    quotes = [
        ("Fashion is the armor to survive the reality of everyday life", "Bill Cunningham"),
        ("Elegance is not about being noticed, it is about being remembered", "Giorgio Armani"),
    ]
    for i, (quote, author) in enumerate(quotes):
        idx = 16 + i if len(couture_photos) > 16 + i else i + 5
        if idx < len(couture_photos):
            create_quote_overlay_post(couture_photos[idx], f'insta-quote-{i+1:02d}', quote, author)
            posts_created += 1

    # 17: Grid Collage
    print("\n--- Creating Grid Collage ---")
    if len(couture_photos) >= 4:
        create_grid_collage_post(couture_photos[18:22] if len(couture_photos) > 22 else couture_photos[:4], 'insta-grid-collage-01')
        posts_created += 1

    # 18-19: Minimal Text Posts
    print("\n--- Creating Minimal Text Posts ---")
    texts = [
        ("Couture", "Where Dreams Take Form"),
        ("Elegance", "The Art of Refinement"),
    ]
    for i, (main, sub) in enumerate(texts):
        idx = 22 + i if len(couture_photos) > 22 + i else i + 8
        if idx < len(couture_photos):
            create_minimal_text_post(couture_photos[idx], f'insta-minimal-text-{i+1:02d}', main, sub)
            posts_created += 1

    # 20-22: Story Format Posts
    print("\n--- Creating Story Format Posts ---")
    for i in range(3):
        idx = 24 + i if len(couture_photos) > 24 + i else i + 10
        if idx < len(couture_photos):
            create_story_post(couture_photos[idx], f'insta-story-{i+1:02d}', i + 1)
            posts_created += 1

    # 23-25: Color Blocked Posts
    print("\n--- Creating Color Blocked Posts ---")
    color_keys = ['rose_gold', 'champagne', 'ivory']
    for i, color in enumerate(color_keys):
        idx = 27 + i if len(couture_photos) > 27 + i else i + 12
        if idx < len(couture_photos):
            create_color_blocked_post(couture_photos[idx], f'insta-colorblock-{i+1:02d}', color)
            posts_created += 1

    print("\n" + "=" * 50)
    print(f"COMPLETE: Created {posts_created} Instagram posts")
    print(f"Output directory: {OUTPUT_DIR}")
    print("=" * 50)

if __name__ == '__main__':
    main()
