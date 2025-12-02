#!/usr/bin/env python3
"""
VeraLabs Haute Couture Intimates - Ultra-Premium Post Generator
Inspired by La Perla, Agent Provocateur, Carine Gilson, Fleur du Mal
Creates museum-quality editorial imagery for luxury intimates
"""

from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance, ImageOps
import os
import random
from pathlib import Path
import math

# Ultra-Luxury Color Palette
HAUTE_COLORS = {
    # Silk & Satin tones
    'pure_silk': (253, 251, 250),
    'french_ivory': (255, 253, 248),
    'champagne_foam': (245, 238, 228),
    'blush_petal': (248, 228, 230),
    'rose_quartz': (244, 210, 215),
    'dusty_peony': (218, 175, 185),

    # Deep Luxe tones
    'bordeaux_wine': (92, 38, 48),
    'midnight_velvet': (28, 22, 30),
    'deep_amethyst': (55, 35, 58),
    'noir_absolute': (18, 15, 18),
    'charcoal_silk': (48, 44, 50),

    # Metallic accents
    'antique_gold': (195, 165, 115),
    'rose_gold': (235, 185, 175),
    'platinum': (220, 218, 225),
    'bronze_shimmer': (175, 135, 95),

    # Romantic neutrals
    'warm_bisque': (235, 215, 195),
    'nude_silk': (228, 205, 185),
    'powder_pink': (250, 235, 238),
    'lavender_mist': (228, 220, 235),
}

# Instagram dimensions
SQUARE = (1080, 1080)
PORTRAIT = (1080, 1350)
STORY = (1080, 1920)

PHOTO_DIR = Path('/home/user/studiov1/photo')
OUTPUT_DIR = Path('/home/user/studiov1/photo')

def get_font(size, bold=False, serif=True):
    """Get elegant typography"""
    if serif:
        fonts_to_try = [
            '/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf',
            '/usr/share/fonts/truetype/liberation/LiberationSerif-Regular.ttf',
        ]
        if bold:
            fonts_to_try = [
                '/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf',
                '/usr/share/fonts/truetype/liberation/LiberationSerif-Bold.ttf',
            ] + fonts_to_try
    else:
        fonts_to_try = [
            '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',
            '/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf',
        ]
        if bold:
            fonts_to_try = [
                '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',
            ] + fonts_to_try

    for font_path in fonts_to_try:
        if os.path.exists(font_path):
            try:
                return ImageFont.truetype(font_path, size)
            except:
                continue
    return ImageFont.load_default()

def load_and_crop(img_path, target_size):
    """Smart crop maintaining subject focus"""
    img = Image.open(img_path).convert('RGB')

    target_ratio = target_size[0] / target_size[1]
    img_ratio = img.width / img.height

    if img_ratio > target_ratio:
        new_width = int(img.height * target_ratio)
        left = (img.width - new_width) // 2
        img = img.crop((left, 0, left + new_width, img.height))
    else:
        new_height = int(img.width / target_ratio)
        top = (img.height - new_height) // 3  # Rule of thirds - favor upper portion
        img = img.crop((0, top, img.width, top + new_height))

    return img.resize(target_size, Image.Resampling.LANCZOS)

def apply_film_grain(img, intensity=0.03):
    """Add subtle film grain for editorial quality"""
    import random
    pixels = img.load()
    for i in range(img.size[0]):
        for j in range(img.size[1]):
            if random.random() < intensity:
                r, g, b = pixels[i, j]
                noise = random.randint(-12, 12)
                pixels[i, j] = (
                    max(0, min(255, r + noise)),
                    max(0, min(255, g + noise)),
                    max(0, min(255, b + noise))
                )
    return img

def apply_luxury_color_grade(img, style='warm_silk'):
    """Apply high-end color grading"""
    enhancer = ImageEnhance.Contrast(img)
    img = enhancer.enhance(1.05)

    enhancer = ImageEnhance.Brightness(img)
    img = enhancer.enhance(1.02)

    if style == 'warm_silk':
        # Warm, luminous skin tones
        r, g, b = img.split()
        r = r.point(lambda x: min(255, int(x * 1.03)))
        b = b.point(lambda x: int(x * 0.97))
        img = Image.merge('RGB', (r, g, b))
    elif style == 'cool_velvet':
        # Cool, moody tones
        r, g, b = img.split()
        r = r.point(lambda x: int(x * 0.97))
        b = b.point(lambda x: min(255, int(x * 1.04)))
        img = Image.merge('RGB', (r, g, b))
    elif style == 'noir':
        # Deep contrast noir
        enhancer = ImageEnhance.Contrast(img)
        img = enhancer.enhance(1.15)
        img = ImageEnhance.Brightness(img).enhance(0.95)
    elif style == 'rose_gold':
        r, g, b = img.split()
        r = r.point(lambda x: min(255, int(x * 1.05)))
        g = g.point(lambda x: int(x * 0.98))
        img = Image.merge('RGB', (r, g, b))

    return img

def draw_art_deco_frame(img, color=HAUTE_COLORS['antique_gold'], thickness=3):
    """Draw elegant art deco inspired frame"""
    draw = ImageDraw.Draw(img)
    w, h = img.size
    margin = 40
    corner_size = 80

    # Main frame lines
    draw.rectangle([margin, margin, w-margin, h-margin], outline=color, width=thickness)

    # Art deco corner accents
    for x, y in [(margin, margin), (w-margin-corner_size, margin),
                 (margin, h-margin-corner_size), (w-margin-corner_size, h-margin-corner_size)]:
        # Corner L shapes
        draw.line([(x, y), (x + corner_size//2, y)], fill=color, width=thickness+1)
        draw.line([(x, y), (x, y + corner_size//2)], fill=color, width=thickness+1)

    return img

def draw_minimal_line_accent(draw, position, width, color, line_width=2):
    """Draw minimal decorative line"""
    x, y = position
    draw.line([(x, y), (x + width, y)], fill=color, width=line_width)

def create_chiaroscuro_portrait(photo_path, output_path):
    """Dramatic light/shadow portrait - La Perla inspired"""
    img = load_and_crop(photo_path, PORTRAIT)

    # Apply dramatic contrast
    img = apply_luxury_color_grade(img, 'noir')

    # Create shadow vignette
    overlay = Image.new('RGBA', img.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)

    w, h = img.size
    center_x, center_y = w // 2, h // 3

    for i in range(100):
        alpha = int(180 * (i / 100) ** 2)
        radius_x = w // 2 + i * 5
        radius_y = h // 2 + i * 4
        draw.ellipse([center_x - radius_x, center_y - radius_y,
                      center_x + radius_x, center_y + radius_y],
                     outline=(0, 0, 0, alpha))

    img = img.convert('RGBA')
    img = Image.alpha_composite(img, overlay)
    img = img.convert('RGB')

    # Add subtle grain
    img = apply_film_grain(img, 0.02)

    # Minimal branding
    draw = ImageDraw.Draw(img)
    font = get_font(28, serif=True)
    draw.text((60, h - 80), "VERALABS", font=font, fill=HAUTE_COLORS['platinum'])
    draw.text((60, h - 50), "Atelier Privé", font=get_font(18), fill=HAUTE_COLORS['rose_gold'])

    img.save(output_path, 'JPEG', quality=95)
    print(f"  Saved: {output_path}")

def create_golden_hour_editorial(photo_path, output_path):
    """Warm, luminous golden hour look - Fleur du Mal inspired"""
    img = load_and_crop(photo_path, SQUARE)

    # Warm golden color grade
    img = apply_luxury_color_grade(img, 'warm_silk')

    # Add golden overlay gradient
    overlay = Image.new('RGBA', img.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)

    w, h = img.size
    gold = HAUTE_COLORS['antique_gold']

    # Diagonal golden light effect
    for i in range(h):
        alpha = int(40 * (1 - i/h) * math.sin(i/h * math.pi))
        draw.line([(0, i), (w, i)], fill=(*gold, alpha))

    img = img.convert('RGBA')
    img = Image.alpha_composite(img, overlay)
    img = img.convert('RGB')

    # Art deco frame
    img = draw_art_deco_frame(img, HAUTE_COLORS['antique_gold'])

    # Typography
    draw = ImageDraw.Draw(img)
    title_font = get_font(42, bold=True, serif=True)
    sub_font = get_font(20, serif=True)

    draw.text((w//2, h - 120), "VERALABS", font=title_font,
              fill=HAUTE_COLORS['antique_gold'], anchor='mm')
    draw.text((w//2, h - 75), "L U X E   I N T I M A T E S", font=sub_font,
              fill=HAUTE_COLORS['champagne_foam'], anchor='mm')

    img.save(output_path, 'JPEG', quality=95)
    print(f"  Saved: {output_path}")

def create_negative_space_minimal(photo_path, output_path):
    """Ultra-minimal with generous negative space"""
    canvas = Image.new('RGB', PORTRAIT, HAUTE_COLORS['french_ivory'])

    # Load photo smaller with breathing room
    img = load_and_crop(photo_path, (780, 975))
    img = apply_luxury_color_grade(img, 'warm_silk')

    # Center with offset
    x_offset = (1080 - 780) // 2
    y_offset = 120
    canvas.paste(img, (x_offset, y_offset))

    draw = ImageDraw.Draw(canvas)

    # Minimal line accent above image
    line_y = y_offset - 40
    line_width = 200
    draw.line([(440, line_y), (640, line_y)], fill=HAUTE_COLORS['rose_gold'], width=1)

    # Clean typography at bottom
    title_font = get_font(32, serif=True)
    sub_font = get_font(14, serif=False)

    draw.text((540, 1230), "VERALABS", font=title_font,
              fill=HAUTE_COLORS['charcoal_silk'], anchor='mm')

    # Spaced out subtitle
    subtitle = "C O U T U R E   I N T I M A T E S"
    draw.text((540, 1275), subtitle, font=sub_font,
              fill=HAUTE_COLORS['dusty_peony'], anchor='mm')

    canvas.save(output_path, 'JPEG', quality=95)
    print(f"  Saved: {output_path}")

def create_diptych_composition(photos, output_path):
    """Side-by-side diptych - gallery style"""
    canvas = Image.new('RGB', SQUARE, HAUTE_COLORS['noir_absolute'])

    gap = 20
    img_width = (1080 - gap * 3) // 2
    img_height = 1080 - gap * 2

    for i, photo_path in enumerate(photos[:2]):
        img = load_and_crop(photo_path, (img_width, img_height))
        img = apply_luxury_color_grade(img, 'cool_velvet')
        x = gap + i * (img_width + gap)
        canvas.paste(img, (x, gap))

    # Add subtle border around each
    draw = ImageDraw.Draw(canvas)
    for i in range(2):
        x = gap + i * (img_width + gap)
        draw.rectangle([x-1, gap-1, x+img_width, gap+img_height],
                       outline=HAUTE_COLORS['platinum'], width=1)

    # Bottom branding bar
    draw.rectangle([0, 1020, 1080, 1080], fill=HAUTE_COLORS['noir_absolute'])
    font = get_font(22, serif=True)
    draw.text((540, 1050), "VERALABS  |  Intimates Collection",
              font=font, fill=HAUTE_COLORS['platinum'], anchor='mm')

    canvas.save(output_path, 'JPEG', quality=95)
    print(f"  Saved: {output_path}")

def create_sculptural_crop(photo_path, output_path):
    """Dramatic tight crop focusing on form - Agent Provocateur inspired"""
    img = load_and_crop(photo_path, PORTRAIT)

    # Heavy contrast for sculptural effect
    img = ImageEnhance.Contrast(img).enhance(1.2)
    img = apply_luxury_color_grade(img, 'noir')

    # Create dramatic side lighting effect
    overlay = Image.new('RGBA', img.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)

    w, h = img.size
    for x in range(w):
        # Gradient from left side
        alpha = int(120 * (1 - x/w) ** 2)
        draw.line([(x, 0), (x, h)], fill=(0, 0, 0, alpha))

    img = img.convert('RGBA')
    img = Image.alpha_composite(img, overlay)
    img = img.convert('RGB')

    # Minimal typography
    draw = ImageDraw.Draw(img)
    font = get_font(36, bold=True, serif=True)
    small_font = get_font(14, serif=False)

    # Vertical text on right edge
    text = "VERALABS"
    x_pos = w - 50
    y_start = h // 2 - 100
    for i, char in enumerate(text):
        draw.text((x_pos, y_start + i * 35), char,
                  font=font, fill=HAUTE_COLORS['rose_gold'])

    img.save(output_path, 'JPEG', quality=95)
    print(f"  Saved: {output_path}")

def create_velvet_noir(photo_path, output_path):
    """Deep, moody noir aesthetic"""
    img = load_and_crop(photo_path, SQUARE)

    # Deep noir processing
    img = ImageEnhance.Brightness(img).enhance(0.85)
    img = ImageEnhance.Contrast(img).enhance(1.25)
    img = apply_luxury_color_grade(img, 'cool_velvet')

    # Add bordeaux color accent overlay
    overlay = Image.new('RGBA', img.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)

    w, h = img.size
    bordeaux = HAUTE_COLORS['bordeaux_wine']

    # Subtle color tint at edges
    for i in range(60):
        alpha = int(25 * (1 - i/60))
        draw.rectangle([i, i, w-i, h-i], outline=(*bordeaux, alpha))

    img = img.convert('RGBA')
    img = Image.alpha_composite(img, overlay)
    img = img.convert('RGB')

    # Film grain
    img = apply_film_grain(img, 0.025)

    # Typography
    draw = ImageDraw.Draw(img)
    title_font = get_font(48, bold=True, serif=True)

    draw.text((540, h - 100), "VERALABS", font=title_font,
              fill=HAUTE_COLORS['rose_gold'], anchor='mm')

    # Decorative line
    draw.line([(340, h-55), (740, h-55)], fill=HAUTE_COLORS['bordeaux_wine'], width=2)

    img.save(output_path, 'JPEG', quality=95)
    print(f"  Saved: {output_path}")

def create_boudoir_atmosphere(photo_path, output_path):
    """Soft, dreamy boudoir atmosphere - Carine Gilson inspired"""
    img = load_and_crop(photo_path, PORTRAIT)

    # Soft, dreamy processing
    img = img.filter(ImageFilter.GaussianBlur(radius=0.5))
    img = ImageEnhance.Contrast(img).enhance(0.95)
    img = apply_luxury_color_grade(img, 'rose_gold')

    # Soft glow overlay
    glow = img.filter(ImageFilter.GaussianBlur(radius=20))
    glow = ImageEnhance.Brightness(glow).enhance(1.2)
    img = Image.blend(img, glow, 0.15)

    # Soft vignette
    overlay = Image.new('RGBA', img.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)

    w, h = img.size
    for i in range(80):
        alpha = int(60 * (i/80) ** 2)
        draw.rectangle([i, i, w-i, h-i], outline=(0, 0, 0, alpha))

    img = img.convert('RGBA')
    img = Image.alpha_composite(img, overlay)
    img = img.convert('RGB')

    # Elegant script-style branding
    draw = ImageDraw.Draw(img)
    font = get_font(38, serif=True)
    sub_font = get_font(16, serif=True)

    draw.text((540, h - 110), "VERALABS", font=font,
              fill=HAUTE_COLORS['rose_gold'], anchor='mm')
    draw.text((540, h - 65), "Boudoir Collection", font=sub_font,
              fill=HAUTE_COLORS['dusty_peony'], anchor='mm')

    img.save(output_path, 'JPEG', quality=95)
    print(f"  Saved: {output_path}")

def create_museum_presentation(photo_path, output_path):
    """Gallery-style museum presentation"""
    # Large canvas with museum gray
    canvas = Image.new('RGB', SQUARE, (245, 243, 240))

    # Smaller image centered like gallery art
    img = load_and_crop(photo_path, (700, 875))
    img = apply_luxury_color_grade(img, 'warm_silk')

    # Add shadow effect
    shadow = Image.new('RGB', (720, 895), (200, 198, 195))
    canvas.paste(shadow, (195, 55))
    canvas.paste(img, (190, 50))

    # Museum-style label
    draw = ImageDraw.Draw(canvas)
    label_font = get_font(18, serif=True)
    artist_font = get_font(14, serif=False)

    # Gallery label card
    draw.rectangle([380, 960, 700, 1040], fill=(255, 255, 255))
    draw.rectangle([380, 960, 700, 1040], outline=(220, 218, 215), width=1)

    draw.text((540, 982), "Intimates Study No. " + str(random.randint(1, 99)),
              font=label_font, fill=(60, 58, 55), anchor='mm')
    draw.text((540, 1010), "VERALABS  |  2024",
              font=artist_font, fill=(120, 118, 115), anchor='mm')

    canvas.save(output_path, 'JPEG', quality=95)
    print(f"  Saved: {output_path}")

def create_silk_ribbon_accent(photo_path, output_path):
    """Elegant with silk ribbon graphic element"""
    img = load_and_crop(photo_path, PORTRAIT)
    img = apply_luxury_color_grade(img, 'warm_silk')

    draw = ImageDraw.Draw(img)
    w, h = img.size

    # Draw flowing ribbon element
    rose = HAUTE_COLORS['rose_gold']

    # Curved ribbon path (simplified as gradient rectangle)
    for i in range(5):
        y_offset = 80 + i * 2
        alpha_factor = 1 - (i * 0.15)
        ribbon_color = tuple(int(c * alpha_factor) for c in rose)
        draw.line([(0, y_offset), (w, y_offset + 30)], fill=ribbon_color, width=3)

    # Typography
    title_font = get_font(44, bold=True, serif=True)
    sub_font = get_font(18, serif=True)

    draw.text((540, h - 120), "VERALABS", font=title_font,
              fill=(255, 255, 255), anchor='mm')
    draw.text((540, h - 70), "Silk & Lace Atelier", font=sub_font,
              fill=HAUTE_COLORS['blush_petal'], anchor='mm')

    img.save(output_path, 'JPEG', quality=95)
    print(f"  Saved: {output_path}")

def get_couture_photos():
    """Get photos for haute couture generation"""
    patterns = ['couture-*.jpg', 'editorial-*.jpg', 'lookbook-*.jpg']
    photos = []
    for pattern in patterns:
        photos.extend(list(PHOTO_DIR.glob(pattern)))

    if not photos:
        photos = list(PHOTO_DIR.glob('*.jpg'))
        photos = [p for p in photos if not p.name.startswith(('insta-', 'reel-'))]

    return sorted(photos)[:20]

def main():
    print("=" * 60)
    print("VERALABS Haute Couture Intimates Generator")
    print("Creating museum-quality editorial imagery")
    print("=" * 60)

    photos = get_couture_photos()
    if not photos:
        print("No photos found!")
        return

    print(f"\nFound {len(photos)} photos for haute couture processing")

    # Generate each style
    styles = [
        ("Chiaroscuro Portrait", create_chiaroscuro_portrait, 4),
        ("Golden Hour Editorial", create_golden_hour_editorial, 4),
        ("Negative Space Minimal", create_negative_space_minimal, 3),
        ("Sculptural Crop", create_sculptural_crop, 3),
        ("Velvet Noir", create_velvet_noir, 3),
        ("Boudoir Atmosphere", create_boudoir_atmosphere, 3),
        ("Museum Presentation", create_museum_presentation, 2),
        ("Silk Ribbon Accent", create_silk_ribbon_accent, 2),
    ]

    photo_idx = 0
    total_created = 0

    for style_name, create_func, count in styles:
        print(f"\n=== Creating {style_name} posts ===")
        for i in range(count):
            if photo_idx >= len(photos):
                photo_idx = 0

            photo = photos[photo_idx]
            style_slug = style_name.lower().replace(' ', '-')
            output_name = f"insta-haute-{style_slug}-{i+1:02d}.jpg"
            output_path = OUTPUT_DIR / output_name

            try:
                create_func(photo, output_path)
                total_created += 1
            except Exception as e:
                print(f"  Error: {e}")

            photo_idx += 1

    # Create diptych compositions
    print(f"\n=== Creating Diptych Compositions ===")
    for i in range(2):
        if len(photos) >= 2:
            pair = random.sample(photos, 2)
            output_path = OUTPUT_DIR / f"insta-haute-diptych-{i+1:02d}.jpg"
            try:
                create_diptych_composition(pair, output_path)
                total_created += 1
            except Exception as e:
                print(f"  Error: {e}")

    print(f"\n{'=' * 60}")
    print(f"Created {total_created} haute couture intimates posts")
    print("=" * 60)

if __name__ == '__main__':
    main()
