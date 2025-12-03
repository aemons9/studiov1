#!/usr/bin/env python3
"""
VeraLabs Minimalism Instagram Post Generator
Creates sophisticated, high-profile minimalist posts for creative director aesthetic
"""

from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance
import os
from pathlib import Path

# Brand Design System - Minimalist Palette
COLORS = {
    # Core minimalist tones
    'pure_white': (255, 255, 255),
    'off_white': (250, 248, 245),
    'warm_white': (252, 250, 247),
    'cool_gray': (180, 180, 185),
    'silver': (200, 200, 205),
    'charcoal': (45, 42, 40),
    'deep_black': (15, 12, 10),
    'true_black': (0, 0, 0),
    # Accent tones
    'warm_nude': (225, 210, 195),
    'pale_blush': (240, 225, 220),
    'dusty_rose': (195, 165, 160),
    'golden_hour': (255, 235, 200),
    'midnight': (25, 22, 28),
    'espresso': (35, 30, 28),
    # Highlight accents
    'gold_accent': (195, 165, 115),
    'copper': (180, 130, 100),
    'champagne': (235, 225, 210),
}

# Instagram dimensions
SQUARE = (1080, 1080)
PORTRAIT = (1080, 1350)

PHOTO_DIR = Path('/home/user/studiov1/photo')
OUTPUT_DIR = Path('/home/user/studiov1/photo')

def get_font(size, bold=False):
    """Get elegant serif font"""
    fonts_to_try = [
        '/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf',
        '/usr/share/fonts/truetype/liberation/LiberationSerif-Regular.ttf',
        '/usr/share/fonts/truetype/freefont/FreeSerif.ttf',
    ]
    if bold:
        fonts_to_try = [
            '/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf',
            '/usr/share/fonts/truetype/liberation/LiberationSerif-Bold.ttf',
        ] + fonts_to_try

    for font_path in fonts_to_try:
        if os.path.exists(font_path):
            try:
                return ImageFont.truetype(font_path, size)
            except:
                continue
    return ImageFont.load_default()

def get_sans_font(size, bold=False):
    """Get clean sans-serif font for minimalist look"""
    fonts_to_try = [
        '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',
        '/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf',
    ]
    if bold:
        fonts_to_try = [
            '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',
            '/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf',
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

    target_ratio = target_size[0] / target_size[1]
    img_ratio = img.width / img.height

    if img_ratio > target_ratio:
        new_width = int(img.height * target_ratio)
        left = (img.width - new_width) // 2
        img = img.crop((left, 0, left + new_width, img.height))
    else:
        new_height = int(img.width / target_ratio)
        top = (img.height - new_height) // 2
        img = img.crop((0, top, img.width, top + new_height))

    return img.resize(target_size, Image.Resampling.LANCZOS)

def apply_minimalist_grade(img, style='warm'):
    """Apply sophisticated color grading"""
    if style == 'warm':
        enhancer = ImageEnhance.Color(img)
        img = enhancer.enhance(0.85)
        tint = Image.new('RGB', img.size, (255, 248, 240))
        img = Image.blend(img, tint, 0.08)
    elif style == 'cool':
        enhancer = ImageEnhance.Color(img)
        img = enhancer.enhance(0.75)
        tint = Image.new('RGB', img.size, (240, 245, 255))
        img = Image.blend(img, tint, 0.1)
    elif style == 'noir':
        enhancer = ImageEnhance.Color(img)
        img = enhancer.enhance(0.4)
        enhancer = ImageEnhance.Contrast(img)
        img = enhancer.enhance(1.2)
    elif style == 'golden':
        tint = Image.new('RGB', img.size, COLORS['golden_hour'])
        img = Image.blend(img, tint, 0.12)
        enhancer = ImageEnhance.Contrast(img)
        img = enhancer.enhance(1.05)

    return img

def add_vignette(img, strength=0.3, color=(0, 0, 0)):
    """Add subtle vignette"""
    width, height = img.size
    overlay = Image.new('RGBA', img.size, (0, 0, 0, 0))

    cx, cy = width // 2, height // 2
    max_dist = (cx ** 2 + cy ** 2) ** 0.5

    pixels = overlay.load()
    for y in range(height):
        for x in range(width):
            dist = ((x - cx) ** 2 + (y - cy) ** 2) ** 0.5
            alpha = int(255 * strength * (dist / max_dist) ** 2)
            pixels[x, y] = (*color, min(alpha, 200))

    img_rgba = img.convert('RGBA')
    return Image.alpha_composite(img_rgba, overlay).convert('RGB')

def create_negative_space_post(photo_path, output_name, text="LESS IS MORE"):
    """Create post with dramatic negative space - signature minimalist aesthetic"""
    canvas = Image.new('RGB', SQUARE, COLORS['off_white'])

    # Load photo smaller, positioned asymmetrically
    photo = load_and_crop_image(photo_path, (620, 780))
    photo = apply_minimalist_grade(photo, 'warm')

    # Position photo on right side with breathing room
    canvas.paste(photo, (420, 150))

    draw = ImageDraw.Draw(canvas)

    # Large typography on left side
    title_font = get_font(72, bold=True)

    # Draw text vertically spaced
    words = text.split()
    y_pos = 280
    for word in words:
        draw.text((60, y_pos), word, font=title_font, fill=COLORS['charcoal'])
        y_pos += 85

    # Thin accent line
    draw.line([(60, y_pos + 20), (200, y_pos + 20)], fill=COLORS['gold_accent'], width=2)

    # Brand at bottom left
    draw.text((60, SQUARE[1] - 80), "VERALABS", font=get_sans_font(14), fill=COLORS['cool_gray'])

    canvas.save(OUTPUT_DIR / f'{output_name}.jpg', 'JPEG', quality=95)
    print(f"Created: {output_name}.jpg")

def create_centered_focus_post(photo_path, output_name, caption="SIMPLICITY"):
    """Create centered photo with elegant border and minimal text"""
    canvas = Image.new('RGB', SQUARE, COLORS['warm_white'])

    # Load photo with generous border
    photo = load_and_crop_image(photo_path, (880, 880))
    photo = apply_minimalist_grade(photo, 'cool')
    photo = add_vignette(photo, 0.25)

    # Center photo
    canvas.paste(photo, (100, 100))

    draw = ImageDraw.Draw(canvas)

    # Subtle frame
    draw.rectangle([(95, 95), (985, 985)], outline=COLORS['silver'], width=1)

    # Caption at bottom center
    caption_font = get_sans_font(16)
    bbox = draw.textbbox((0, 0), caption, font=caption_font)
    text_width = bbox[2] - bbox[0]
    draw.text(((SQUARE[0] - text_width) // 2, SQUARE[1] - 50), caption,
              font=caption_font, fill=COLORS['cool_gray'])

    # Brand mark top left
    draw.text((100, 60), "V", font=get_font(28, bold=True), fill=COLORS['charcoal'])

    canvas.save(OUTPUT_DIR / f'{output_name}.jpg', 'JPEG', quality=95)
    print(f"Created: {output_name}.jpg")

def create_split_composition(photo_path, output_name, word="FORM"):
    """Create dramatic split composition with typography"""
    canvas = Image.new('RGB', SQUARE, COLORS['deep_black'])

    # Photo takes left half
    photo = load_and_crop_image(photo_path, (540, 1080))
    photo = apply_minimalist_grade(photo, 'noir')

    canvas.paste(photo, (0, 0))

    draw = ImageDraw.Draw(canvas)

    # Right side: minimalist typography
    # Large word
    word_font = get_font(120, bold=True)
    draw.text((600, 400), word, font=word_font, fill=COLORS['off_white'])

    # Thin line below
    bbox = draw.textbbox((0, 0), word, font=word_font)
    word_width = bbox[2] - bbox[0]
    draw.line([(600, 520), (600 + word_width, 520)], fill=COLORS['gold_accent'], width=1)

    # Subtitle
    draw.text((600, 550), "VERALABS", font=get_sans_font(14), fill=COLORS['cool_gray'])

    canvas.save(OUTPUT_DIR / f'{output_name}.jpg', 'JPEG', quality=95)
    print(f"Created: {output_name}.jpg")

def create_editorial_strip(photo_path, output_name, number="01"):
    """Create editorial strip composition with number marker"""
    canvas = Image.new('RGB', PORTRAIT, COLORS['off_white'])

    # Full width photo strip in center
    photo = load_and_crop_image(photo_path, (1080, 850))
    photo = apply_minimalist_grade(photo, 'golden')
    photo = add_vignette(photo, 0.2)

    canvas.paste(photo, (0, 250))

    draw = ImageDraw.Draw(canvas)

    # Large number top left
    number_font = get_font(180, bold=True)
    draw.text((60, 30), number, font=number_font, fill=COLORS['charcoal'])

    # Thin vertical line
    draw.line([(250, 60), (250, 200)], fill=COLORS['gold_accent'], width=1)

    # Category label
    draw.text((280, 120), "EDITORIAL", font=get_sans_font(14), fill=COLORS['cool_gray'])

    # Bottom brand
    draw.text((PORTRAIT[0] // 2, PORTRAIT[1] - 60), "VERALABS",
              font=get_sans_font(18, bold=True), fill=COLORS['charcoal'], anchor='mm')
    draw.text((PORTRAIT[0] // 2, PORTRAIT[1] - 35), "Minimalism Collection",
              font=get_sans_font(11), fill=COLORS['cool_gray'], anchor='mm')

    canvas.save(OUTPUT_DIR / f'{output_name}.jpg', 'JPEG', quality=95)
    print(f"Created: {output_name}.jpg")

def create_mood_typography(photo_path, output_name, mood_word="SILENCE"):
    """Create dramatic mood word overlay on full bleed photo"""
    img = load_and_crop_image(photo_path, SQUARE)
    img = apply_minimalist_grade(img, 'noir')
    img = add_vignette(img, 0.4, COLORS['midnight'])

    # Dark overlay for text readability
    overlay = Image.new('RGBA', SQUARE, (*COLORS['deep_black'], 160))
    img = Image.alpha_composite(img.convert('RGBA'), overlay).convert('RGB')

    draw = ImageDraw.Draw(img)

    # Large centered word
    word_font = get_font(100, bold=True)
    bbox = draw.textbbox((0, 0), mood_word, font=word_font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]

    x = (SQUARE[0] - text_width) // 2
    y = (SQUARE[1] - text_height) // 2 - 20

    # Shadow
    draw.text((x + 3, y + 3), mood_word, font=word_font, fill=(0, 0, 0))
    # Main text
    draw.text((x, y), mood_word, font=word_font, fill=COLORS['off_white'])

    # Underline accent
    draw.line([(x, y + text_height + 15), (x + text_width, y + text_height + 15)],
              fill=COLORS['gold_accent'], width=2)

    # Brand bottom
    draw.text((SQUARE[0] // 2, SQUARE[1] - 60), "VERALABS",
              font=get_sans_font(14), fill=COLORS['cool_gray'], anchor='mm')

    img.save(OUTPUT_DIR / f'{output_name}.jpg', 'JPEG', quality=95)
    print(f"Created: {output_name}.jpg")

def create_gallery_frame(photo_path, output_name, title="STUDY"):
    """Create museum-style gallery frame presentation"""
    canvas = Image.new('RGB', SQUARE, COLORS['warm_white'])

    # Photo centered with wide mat
    photo = load_and_crop_image(photo_path, (700, 700))
    photo = apply_minimalist_grade(photo, 'warm')

    # Shadow effect
    shadow = Image.new('RGB', (720, 720), COLORS['cool_gray'])
    canvas.paste(shadow, (195, 195))
    canvas.paste(photo, (190, 190))

    draw = ImageDraw.Draw(canvas)

    # Gallery label below
    draw.text((SQUARE[0] // 2, 940), title, font=get_sans_font(12),
              fill=COLORS['charcoal'], anchor='mm')
    draw.text((SQUARE[0] // 2, 960), "Archival Print  |  Limited Edition",
              font=get_sans_font(10), fill=COLORS['cool_gray'], anchor='mm')

    # Top corner mark
    draw.text((60, 50), "VL", font=get_font(20, bold=True), fill=COLORS['charcoal'])

    canvas.save(OUTPUT_DIR / f'{output_name}.jpg', 'JPEG', quality=95)
    print(f"Created: {output_name}.jpg")

def create_diptych_post(photo_path1, photo_path2, output_name):
    """Create elegant diptych composition"""
    canvas = Image.new('RGB', SQUARE, COLORS['off_white'])

    # Two vertical panels
    panel_width = 480
    panel_height = 900
    gap = 20

    photo1 = load_and_crop_image(photo_path1, (panel_width, panel_height))
    photo2 = load_and_crop_image(photo_path2, (panel_width, panel_height))

    photo1 = apply_minimalist_grade(photo1, 'warm')
    photo2 = apply_minimalist_grade(photo2, 'cool')

    start_x = (SQUARE[0] - (panel_width * 2 + gap)) // 2

    canvas.paste(photo1, (start_x, 90))
    canvas.paste(photo2, (start_x + panel_width + gap, 90))

    draw = ImageDraw.Draw(canvas)

    # Minimal frame lines
    draw.rectangle([(start_x - 5, 85), (start_x + panel_width + 5, 995)],
                   outline=COLORS['silver'], width=1)
    draw.rectangle([(start_x + panel_width + gap - 5, 85),
                   (start_x + panel_width * 2 + gap + 5, 995)],
                   outline=COLORS['silver'], width=1)

    # Bottom text
    draw.text((SQUARE[0] // 2, SQUARE[1] - 40), "DIPTYCH  I",
              font=get_sans_font(12), fill=COLORS['charcoal'], anchor='mm')

    canvas.save(OUTPUT_DIR / f'{output_name}.jpg', 'JPEG', quality=95)
    print(f"Created: {output_name}.jpg")

def create_statement_post(photo_path, output_name, statement="The art of restraint"):
    """Create post with statement quote overlay"""
    img = load_and_crop_image(photo_path, SQUARE)
    img = apply_minimalist_grade(img, 'golden')
    img = add_vignette(img, 0.35)

    # Gradient overlay at bottom
    overlay = Image.new('RGBA', SQUARE, (0, 0, 0, 0))
    for y in range(SQUARE[1]):
        alpha = int(180 * (y / SQUARE[1]) ** 1.5)
        for x in range(SQUARE[0]):
            overlay.putpixel((x, y), (*COLORS['espresso'], alpha))

    img = Image.alpha_composite(img.convert('RGBA'), overlay).convert('RGB')

    draw = ImageDraw.Draw(img)

    # Quote marks
    draw.text((80, SQUARE[1] - 280), '"', font=get_font(80), fill=COLORS['gold_accent'])

    # Statement text
    statement_font = get_font(36, bold=True)
    draw.text((80, SQUARE[1] - 200), statement, font=statement_font, fill=COLORS['off_white'])

    # Attribution
    draw.text((80, SQUARE[1] - 140), "VERALABS", font=get_sans_font(12), fill=COLORS['cool_gray'])

    img.save(OUTPUT_DIR / f'{output_name}.jpg', 'JPEG', quality=95)
    print(f"Created: {output_name}.jpg")

def create_lookbook_card(photo_path, output_name, look_num=1):
    """Create clean lookbook-style card"""
    canvas = Image.new('RGB', PORTRAIT, COLORS['pure_white'])

    # Photo with slim margins
    photo = load_and_crop_image(photo_path, (980, 1150))
    photo = apply_minimalist_grade(photo, 'warm')

    canvas.paste(photo, (50, 100))

    draw = ImageDraw.Draw(canvas)

    # Top header line
    draw.line([(50, 60), (PORTRAIT[0] - 50, 60)], fill=COLORS['charcoal'], width=1)

    # Look number left
    draw.text((50, 35), f"LOOK {look_num:02d}", font=get_sans_font(12), fill=COLORS['charcoal'])

    # Brand right
    draw.text((PORTRAIT[0] - 50, 35), "VERALABS", font=get_sans_font(12),
              fill=COLORS['charcoal'], anchor='ra')

    # Bottom line
    draw.line([(50, PORTRAIT[1] - 60), (PORTRAIT[0] - 50, PORTRAIT[1] - 60)],
              fill=COLORS['charcoal'], width=1)

    # Season label
    draw.text((PORTRAIT[0] // 2, PORTRAIT[1] - 35), "MINIMALISM COLLECTION",
              font=get_sans_font(10), fill=COLORS['cool_gray'], anchor='mm')

    canvas.save(OUTPUT_DIR / f'{output_name}.jpg', 'JPEG', quality=95)
    print(f"Created: {output_name}.jpg")

def get_minimalism_photos():
    """Get all minimalism source photos"""
    photos = []

    # Get minimal-*.jpg/jpeg/png files
    for ext in ['jpg', 'jpeg', 'png']:
        photos.extend(PHOTO_DIR.glob(f'minimal-*.{ext}'))
        photos.extend(PHOTO_DIR.glob(f'minimalist-*.{ext}'))

    # Sort by name
    photos = sorted(set(photos), key=lambda p: p.name)

    return photos

def main():
    print("=" * 60)
    print("VERALABS Minimalism Post Generator")
    print("Creating 10 sophisticated minimalist posts")
    print("=" * 60)

    photos = get_minimalism_photos()
    print(f"\nFound {len(photos)} minimalism source photos")

    if len(photos) < 10:
        print(f"Warning: Only {len(photos)} photos available")

    posts_created = 0

    # Post 1: Negative Space
    print("\n--- Creating Post 1: Negative Space ---")
    if len(photos) > 0:
        create_negative_space_post(photos[0], 'insta-minimalism-01-negative-space', "LESS IS MORE")
        posts_created += 1

    # Post 2: Centered Focus
    print("\n--- Creating Post 2: Centered Focus ---")
    if len(photos) > 1:
        create_centered_focus_post(photos[1], 'insta-minimalism-02-centered', "ESSENCE")
        posts_created += 1

    # Post 3: Split Composition
    print("\n--- Creating Post 3: Split Composition ---")
    if len(photos) > 2:
        create_split_composition(photos[2], 'insta-minimalism-03-split', "FORM")
        posts_created += 1

    # Post 4: Editorial Strip
    print("\n--- Creating Post 4: Editorial Strip ---")
    if len(photos) > 3:
        create_editorial_strip(photos[3], 'insta-minimalism-04-editorial', "01")
        posts_created += 1

    # Post 5: Mood Typography
    print("\n--- Creating Post 5: Mood Typography ---")
    if len(photos) > 4:
        create_mood_typography(photos[4], 'insta-minimalism-05-mood', "SILENCE")
        posts_created += 1

    # Post 6: Gallery Frame
    print("\n--- Creating Post 6: Gallery Frame ---")
    if len(photos) > 5:
        create_gallery_frame(photos[5], 'insta-minimalism-06-gallery', "STUDY NO. 1")
        posts_created += 1

    # Post 7: Diptych
    print("\n--- Creating Post 7: Diptych ---")
    if len(photos) > 7:
        create_diptych_post(photos[6], photos[7], 'insta-minimalism-07-diptych')
        posts_created += 1

    # Post 8: Statement
    print("\n--- Creating Post 8: Statement ---")
    if len(photos) > 8:
        create_statement_post(photos[8], 'insta-minimalism-08-statement', "The art of restraint")
        posts_created += 1

    # Post 9: Lookbook
    print("\n--- Creating Post 9: Lookbook ---")
    if len(photos) > 9:
        create_lookbook_card(photos[9], 'insta-minimalism-09-lookbook', 1)
        posts_created += 1

    # Post 10: Another Mood Typography
    print("\n--- Creating Post 10: Mood Typography II ---")
    if len(photos) > 10:
        create_mood_typography(photos[10], 'insta-minimalism-10-mood-ii', "BREATHE")
        posts_created += 1

    print("\n" + "=" * 60)
    print(f"COMPLETE: Created {posts_created} Minimalism Instagram posts")
    print(f"Output directory: {OUTPUT_DIR}")
    print("=" * 60)

if __name__ == '__main__':
    main()
