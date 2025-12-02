#!/usr/bin/env python3
"""
VeraLabs Couture Intimates Instagram Post Generator
Creates elegant, editorial-style posts for luxury intimates collection
"""

from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance
import os
import random
from pathlib import Path
import math

# Brand Design System - Extended for Intimates
COLORS = {
    # Core palette
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
    # Intimates-specific palette
    'blush_pink': (245, 218, 223),
    'soft_rose': (230, 190, 195),
    'pearl': (253, 251, 249),
    'champagne_silk': (242, 235, 225),
    'dusty_lavender': (198, 182, 200),
    'warm_nude': (225, 200, 180),
    'midnight_silk': (35, 32, 38),
    'bordeaux': (88, 45, 52),
    'deep_plum': (62, 38, 48),
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
        new_width = int(img.height * target_ratio)
        left = (img.width - new_width) // 2
        img = img.crop((left, 0, left + new_width, img.height))
    else:
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
    elif direction == 'full':
        for y in range(height):
            draw.rectangle([(0, y), (width, y + 1)], fill=(*color, int(255 * opacity)))

    img_rgba = img.convert('RGBA')
    return Image.alpha_composite(img_rgba, overlay).convert('RGB')

def add_soft_vignette(img, strength=0.3, color=(0, 0, 0)):
    """Add soft romantic vignette"""
    width, height = img.size
    overlay = Image.new('RGBA', img.size, (0, 0, 0, 0))

    cx, cy = width // 2, height // 2
    max_dist = (cx ** 2 + cy ** 2) ** 0.5

    pixels = overlay.load()
    for y in range(height):
        for x in range(width):
            dist = ((x - cx) ** 2 + (y - cy) ** 2) ** 0.5
            alpha = int(255 * strength * (dist / max_dist) ** 1.8)
            pixels[x, y] = (*color, min(alpha, 180))

    img_rgba = img.convert('RGBA')
    return Image.alpha_composite(img_rgba, overlay).convert('RGB')

def apply_soft_glow(img, radius=2):
    """Apply subtle soft glow effect"""
    blurred = img.filter(ImageFilter.GaussianBlur(radius))
    return Image.blend(img, blurred, 0.3)

def draw_decorative_frame(draw, size, color, style='delicate'):
    """Draw decorative frame border"""
    w, h = size

    if style == 'delicate':
        # Thin elegant lines
        draw.rectangle([(30, 30), (w-30, h-30)], outline=color, width=1)
        # Corner flourishes
        corner_size = 40
        # Top-left
        draw.line([(30, 30), (30 + corner_size, 30)], fill=color, width=2)
        draw.line([(30, 30), (30, 30 + corner_size)], fill=color, width=2)
        # Top-right
        draw.line([(w-30-corner_size, 30), (w-30, 30)], fill=color, width=2)
        draw.line([(w-30, 30), (w-30, 30 + corner_size)], fill=color, width=2)
        # Bottom-left
        draw.line([(30, h-30-corner_size), (30, h-30)], fill=color, width=2)
        draw.line([(30, h-30), (30 + corner_size, h-30)], fill=color, width=2)
        # Bottom-right
        draw.line([(w-30-corner_size, h-30), (w-30, h-30)], fill=color, width=2)
        draw.line([(w-30, h-30-corner_size), (w-30, h-30)], fill=color, width=2)

    elif style == 'romantic':
        # Double frame with gap
        draw.rectangle([(25, 25), (w-25, h-25)], outline=color, width=1)
        draw.rectangle([(35, 35), (w-35, h-35)], outline=color, width=1)

    elif style == 'minimal':
        # Simple corner accents only
        accent_len = 60
        draw.line([(40, 40), (40 + accent_len, 40)], fill=color, width=1)
        draw.line([(40, 40), (40, 40 + accent_len)], fill=color, width=1)
        draw.line([(w-40-accent_len, h-40), (w-40, h-40)], fill=color, width=1)
        draw.line([(w-40, h-40-accent_len), (w-40, h-40)], fill=color, width=1)

def create_boudoir_editorial(photo_path, output_name, title="Intimates"):
    """Create elegant boudoir-style editorial post"""
    img = load_and_crop_image(photo_path, SQUARE)

    # Soft warm color grading
    enhancer = ImageEnhance.Color(img)
    img = enhancer.enhance(0.85)
    enhancer = ImageEnhance.Contrast(img)
    img = enhancer.enhance(1.05)

    # Apply soft glow
    img = apply_soft_glow(img, 3)

    # Subtle vignette
    img = add_soft_vignette(img, 0.4, COLORS['deep_plum'])

    # Bottom gradient for text
    img = add_gradient_overlay(img, 'bottom', COLORS['midnight_silk'], 0.55)

    draw = ImageDraw.Draw(img)

    # Delicate frame
    draw_decorative_frame(draw, SQUARE, COLORS['rose_gold'], 'delicate')

    # Typography
    subtitle_font = get_font(16)
    title_font = get_font(64, bold=True)
    brand_font = get_font(14)

    # Top subtitle
    draw.text((SQUARE[0]//2, 70), "THE COLLECTION", font=subtitle_font, fill=COLORS['champagne_silk'], anchor='mm')

    # Main title
    draw.text((SQUARE[0]//2, SQUARE[1]-140), title.upper(), font=title_font, fill=COLORS['pearl'], anchor='mm')

    # Underline
    title_bbox = draw.textbbox((0, 0), title.upper(), font=title_font)
    title_width = title_bbox[2] - title_bbox[0]
    draw.line([(SQUARE[0]//2 - title_width//2, SQUARE[1]-100),
               (SQUARE[0]//2 + title_width//2, SQUARE[1]-100)],
              fill=COLORS['rose_gold'], width=1)

    # Brand
    draw.text((SQUARE[0]//2, SQUARE[1]-60), "VERALABS", font=brand_font, fill=COLORS['dusty_mauve'], anchor='mm')

    img.save(OUTPUT_DIR / f'{output_name}.jpg', 'JPEG', quality=95)
    print(f"Created: {output_name}.jpg")

def create_silk_luxe_post(photo_path, output_name, collection_name="Silk & Lace"):
    """Create luxurious silk-inspired post"""
    img = Image.new('RGB', SQUARE, COLORS['champagne_silk'])

    # Load photo with padding
    photo = load_and_crop_image(photo_path, (840, 920))

    # Subtle photo enhancement
    enhancer = ImageEnhance.Brightness(photo)
    photo = enhancer.enhance(1.02)

    img.paste(photo, (120, 80))

    draw = ImageDraw.Draw(img)

    # Elegant border around photo
    draw.rectangle([(115, 75), (965, 1005)], outline=COLORS['warm_nude'], width=1)
    draw.rectangle([(110, 70), (970, 1010)], outline=COLORS['pale_gold'], width=1)

    # Top brand mark
    draw.text((SQUARE[0]//2, 40), "VERALABS", font=get_font(18, bold=True), fill=COLORS['soft_charcoal'], anchor='mm')

    # Bottom collection name
    draw.text((SQUARE[0]//2, SQUARE[1]-40), collection_name.upper(), font=get_font(14), fill=COLORS['warm_taupe'], anchor='mm')

    # Corner accents
    draw.rectangle([(40, 40), (80, 42)], fill=COLORS['rose_gold'])
    draw.rectangle([(40, 40), (42, 80)], fill=COLORS['rose_gold'])
    draw.rectangle([(SQUARE[0]-80, SQUARE[1]-42), (SQUARE[0]-40, SQUARE[1]-40)], fill=COLORS['rose_gold'])
    draw.rectangle([(SQUARE[0]-42, SQUARE[1]-80), (SQUARE[0]-40, SQUARE[1]-40)], fill=COLORS['rose_gold'])

    img.save(OUTPUT_DIR / f'{output_name}.jpg', 'JPEG', quality=95)
    print(f"Created: {output_name}.jpg")

def create_romantic_duotone(photo_path, output_name, look_number=1):
    """Create romantic duotone effect post"""
    img = load_and_crop_image(photo_path, SQUARE)

    # Convert to desaturated with warm tint
    enhancer = ImageEnhance.Color(img)
    img = enhancer.enhance(0.3)

    # Apply warm rose tint
    tint_overlay = Image.new('RGB', SQUARE, COLORS['soft_rose'])
    img = Image.blend(img, tint_overlay, 0.15)

    # Enhance contrast
    enhancer = ImageEnhance.Contrast(img)
    img = enhancer.enhance(1.1)

    # Soft vignette
    img = add_soft_vignette(img, 0.35)

    draw = ImageDraw.Draw(img)

    # Romantic frame
    draw_decorative_frame(draw, SQUARE, COLORS['pearl'], 'romantic')

    # Large look number
    look_font = get_font(180, bold=True)
    draw.text((SQUARE[0]//2, SQUARE[1]//2 - 30), f"{look_number:02d}", font=look_font, fill=(*COLORS['pearl'], 80), anchor='mm')

    # Subtitle
    draw.text((SQUARE[0]//2, SQUARE[1]//2 + 80), "L O O K", font=get_font(20), fill=COLORS['pearl'], anchor='mm')

    # Brand at bottom
    draw.text((SQUARE[0]//2, SQUARE[1]-50), "VERALABS INTIMATES", font=get_font(12), fill=COLORS['champagne'], anchor='mm')

    img.save(OUTPUT_DIR / f'{output_name}.jpg', 'JPEG', quality=95)
    print(f"Created: {output_name}.jpg")

def create_minimal_silhouette(photo_path, output_name, tagline="Effortless Elegance"):
    """Create minimal silhouette-focused post"""
    img = load_and_crop_image(photo_path, PORTRAIT)

    # High contrast, slightly desaturated
    enhancer = ImageEnhance.Contrast(img)
    img = enhancer.enhance(1.2)
    enhancer = ImageEnhance.Color(img)
    img = enhancer.enhance(0.75)

    # Dark gradient from top and bottom
    img = add_gradient_overlay(img, 'top', COLORS['deep_espresso'], 0.4)
    img = add_gradient_overlay(img, 'bottom', COLORS['deep_espresso'], 0.5)

    draw = ImageDraw.Draw(img)

    # Minimal corners
    draw_decorative_frame(draw, PORTRAIT, COLORS['pale_gold'], 'minimal')

    # Top brand
    draw.text((PORTRAIT[0]//2, 80), "VERALABS", font=get_font(28, bold=True), fill=COLORS['cream_white'], anchor='mm')

    # Tagline at bottom
    draw.text((PORTRAIT[0]//2, PORTRAIT[1]-120), tagline.upper(), font=get_font(18), fill=COLORS['rose_gold'], anchor='mm')

    # Decorative line
    draw.line([(PORTRAIT[0]//2-80, PORTRAIT[1]-90), (PORTRAIT[0]//2+80, PORTRAIT[1]-90)], fill=COLORS['pale_gold'], width=1)

    # Collection tag
    draw.text((PORTRAIT[0]//2, PORTRAIT[1]-60), "INTIMATES COLLECTION", font=get_font(11), fill=COLORS['warm_taupe'], anchor='mm')

    img.save(OUTPUT_DIR / f'{output_name}.jpg', 'JPEG', quality=95)
    print(f"Created: {output_name}.jpg")

def create_luxury_showcase(photo_path, output_name, piece_name="The Essential"):
    """Create luxury product showcase post"""
    img = Image.new('RGB', SQUARE, COLORS['pearl'])

    # Create subtle pattern background
    pattern = Image.new('RGB', SQUARE, COLORS['pearl'])
    pattern_draw = ImageDraw.Draw(pattern)

    # Subtle diagonal lines
    for i in range(-SQUARE[0], SQUARE[0]*2, 40):
        pattern_draw.line([(i, 0), (i + SQUARE[1], SQUARE[1])], fill=COLORS['champagne_silk'], width=1)

    img = Image.blend(img, pattern, 0.3)

    # Load photo
    photo = load_and_crop_image(photo_path, (750, 750))

    # Add subtle shadow
    shadow = Image.new('RGBA', (770, 770), (0, 0, 0, 0))
    shadow_draw = ImageDraw.Draw(shadow)
    shadow_draw.rectangle([(10, 10), (760, 760)], fill=(0, 0, 0, 30))
    shadow = shadow.filter(ImageFilter.GaussianBlur(15))

    img.paste(shadow.convert('RGB'), (155, 155), shadow.split()[3])
    img.paste(photo, (165, 165))

    draw = ImageDraw.Draw(img)

    # Elegant frame around photo
    draw.rectangle([(160, 160), (920, 920)], outline=COLORS['warm_nude'], width=2)

    # Top text
    draw.text((SQUARE[0]//2, 80), piece_name.upper(), font=get_font(32, bold=True), fill=COLORS['soft_charcoal'], anchor='mm')

    # Decorative line
    draw.line([(SQUARE[0]//2-60, 110), (SQUARE[0]//2+60, 110)], fill=COLORS['rose_gold'], width=1)

    # Bottom brand
    draw.text((SQUARE[0]//2, SQUARE[1]-60), "VERALABS", font=get_font(16), fill=COLORS['warm_taupe'], anchor='mm')
    draw.text((SQUARE[0]//2, SQUARE[1]-38), "Couture Intimates", font=get_font(11), fill=COLORS['dusty_mauve'], anchor='mm')

    img.save(OUTPUT_DIR / f'{output_name}.jpg', 'JPEG', quality=95)
    print(f"Created: {output_name}.jpg")

def create_sensual_typography(photo_path, output_name, word="Desire"):
    """Create bold typography overlay post"""
    img = load_and_crop_image(photo_path, SQUARE)

    # Dramatic color grading
    enhancer = ImageEnhance.Contrast(img)
    img = enhancer.enhance(1.15)
    enhancer = ImageEnhance.Color(img)
    img = enhancer.enhance(0.7)

    # Dark overlay
    img = add_gradient_overlay(img, 'full', COLORS['midnight_silk'], 0.4)

    # Soft blur in background
    img = add_soft_vignette(img, 0.5, COLORS['deep_espresso'])

    draw = ImageDraw.Draw(img)

    # Large typography
    word_font = get_font(120, bold=True)

    # Draw word with subtle shadow
    shadow_offset = 3
    draw.text((SQUARE[0]//2 + shadow_offset, SQUARE[1]//2 + shadow_offset),
              word.upper(), font=word_font, fill=(0, 0, 0, 100), anchor='mm')
    draw.text((SQUARE[0]//2, SQUARE[1]//2),
              word.upper(), font=word_font, fill=COLORS['pearl'], anchor='mm')

    # Underline
    word_bbox = draw.textbbox((0, 0), word.upper(), font=word_font)
    word_width = word_bbox[2] - word_bbox[0]
    draw.line([(SQUARE[0]//2 - word_width//2, SQUARE[1]//2 + 60),
               (SQUARE[0]//2 + word_width//2, SQUARE[1]//2 + 60)],
              fill=COLORS['rose_gold'], width=2)

    # Brand
    draw.text((SQUARE[0]//2, SQUARE[1]-80), "VERALABS", font=get_font(14), fill=COLORS['dusty_lavender'], anchor='mm')
    draw.text((SQUARE[0]//2, SQUARE[1]-55), "INTIMATES", font=get_font(11), fill=COLORS['warm_taupe'], anchor='mm')

    # Minimal corners
    draw_decorative_frame(draw, SQUARE, COLORS['rose_gold'], 'minimal')

    img.save(OUTPUT_DIR / f'{output_name}.jpg', 'JPEG', quality=95)
    print(f"Created: {output_name}.jpg")

def create_soft_focus_portrait(photo_path, output_name):
    """Create dreamy soft focus portrait"""
    img = load_and_crop_image(photo_path, PORTRAIT)

    # Create soft dreamy effect
    sharp = img.copy()
    blurred = img.filter(ImageFilter.GaussianBlur(4))
    img = Image.blend(sharp, blurred, 0.25)

    # Warm color grading
    enhancer = ImageEnhance.Color(img)
    img = enhancer.enhance(0.9)

    # Light tint overlay
    tint = Image.new('RGB', PORTRAIT, COLORS['blush_pink'])
    img = Image.blend(img, tint, 0.08)

    # Subtle vignette
    img = add_soft_vignette(img, 0.3, COLORS['bordeaux'])

    draw = ImageDraw.Draw(img)

    # Delicate border
    draw.rectangle([(20, 20), (PORTRAIT[0]-20, PORTRAIT[1]-20)], outline=(*COLORS['pearl'], 150), width=1)

    # Brand watermark
    draw.text((PORTRAIT[0]//2, PORTRAIT[1]-50), "VERALABS", font=get_font(14, bold=True), fill=COLORS['pearl'], anchor='mm')

    img.save(OUTPUT_DIR / f'{output_name}.jpg', 'JPEG', quality=95)
    print(f"Created: {output_name}.jpg")

def create_editorial_triptych(photo_paths, output_name):
    """Create three-panel editorial post"""
    img = Image.new('RGB', SQUARE, COLORS['cream_white'])

    panel_width = 340
    gap = 10
    panel_height = 920

    start_x = (SQUARE[0] - (panel_width * 3 + gap * 2)) // 2

    for i, photo_path in enumerate(photo_paths[:3]):
        panel = load_and_crop_image(photo_path, (panel_width, panel_height))
        x = start_x + i * (panel_width + gap)
        img.paste(panel, (x, 80))

    draw = ImageDraw.Draw(img)

    # Top text
    draw.text((SQUARE[0]//2, 40), "THE COLLECTION", font=get_font(12), fill=COLORS['warm_taupe'], anchor='mm')

    # Bottom brand
    draw.text((SQUARE[0]//2, SQUARE[1]-40), "VERALABS INTIMATES", font=get_font(14, bold=True), fill=COLORS['soft_charcoal'], anchor='mm')

    # Accent lines
    draw.line([(start_x, 60), (start_x + 60, 60)], fill=COLORS['rose_gold'], width=1)
    draw.line([(SQUARE[0]-start_x-60, 60), (SQUARE[0]-start_x, 60)], fill=COLORS['rose_gold'], width=1)

    img.save(OUTPUT_DIR / f'{output_name}.jpg', 'JPEG', quality=95)
    print(f"Created: {output_name}.jpg")

def create_mood_quote(photo_path, output_name, quote, attribution="VERALABS"):
    """Create atmospheric quote post"""
    img = load_and_crop_image(photo_path, SQUARE)

    # Moody color grading
    enhancer = ImageEnhance.Brightness(img)
    img = enhancer.enhance(0.65)
    enhancer = ImageEnhance.Color(img)
    img = enhancer.enhance(0.6)

    # Deep overlay
    img = add_gradient_overlay(img, 'full', COLORS['deep_plum'], 0.45)
    img = add_soft_vignette(img, 0.4, COLORS['deep_espresso'])

    draw = ImageDraw.Draw(img)

    # Quote marks
    quote_mark_font = get_font(100, bold=True)
    draw.text((SQUARE[0]//2, 280), '"', font=quote_mark_font, fill=(*COLORS['rose_gold'], 120), anchor='mm')

    # Quote text - wrap
    quote_font = get_font(36, bold=True)
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

    y_pos = 380
    for line in lines:
        draw.text((SQUARE[0]//2, y_pos), line, font=quote_font, fill=COLORS['pearl'], anchor='mm')
        y_pos += 55

    # Attribution
    draw.text((SQUARE[0]//2, y_pos + 50), f"— {attribution}", font=get_font(14), fill=COLORS['dusty_mauve'], anchor='mm')

    # Brand
    draw.text((SQUARE[0]//2, SQUARE[1]-50), "VERALABS", font=get_font(12), fill=COLORS['warm_taupe'], anchor='mm')

    # Minimal frame
    draw_decorative_frame(draw, SQUARE, COLORS['rose_gold'], 'minimal')

    img.save(OUTPUT_DIR / f'{output_name}.jpg', 'JPEG', quality=95)
    print(f"Created: {output_name}.jpg")

def create_collection_grid(photo_paths, output_name, collection_name="Spring"):
    """Create 2x2 collection grid"""
    img = Image.new('RGB', SQUARE, COLORS['pearl'])

    cell_size = 490
    gap = 20
    offset = (SQUARE[0] - cell_size * 2 - gap) // 2

    positions = [
        (offset, 100),
        (offset + cell_size + gap, 100),
        (offset, 100 + cell_size + gap),
        (offset + cell_size + gap, 100 + cell_size + gap)
    ]

    for photo_path, pos in zip(photo_paths[:4], positions):
        photo = load_and_crop_image(photo_path, (cell_size, cell_size))
        img.paste(photo, pos)

    draw = ImageDraw.Draw(img)

    # Top header
    draw.text((SQUARE[0]//2, 50), f"{collection_name.upper()} COLLECTION", font=get_font(20, bold=True), fill=COLORS['soft_charcoal'], anchor='mm')

    # Decorative lines
    draw.line([(offset, 80), (offset + 100, 80)], fill=COLORS['rose_gold'], width=1)
    draw.line([(SQUARE[0] - offset - 100, 80), (SQUARE[0] - offset, 80)], fill=COLORS['rose_gold'], width=1)

    # Brand
    draw.text((SQUARE[0]//2, SQUARE[1]-30), "VERALABS INTIMATES", font=get_font(12), fill=COLORS['warm_taupe'], anchor='mm')

    img.save(OUTPUT_DIR / f'{output_name}.jpg', 'JPEG', quality=95)
    print(f"Created: {output_name}.jpg")

def create_story_carousel(photo_path, output_name, slide_number=1, total_slides=5):
    """Create story format carousel slide"""
    img = load_and_crop_image(photo_path, STORY)

    # Elegant color grading
    enhancer = ImageEnhance.Contrast(img)
    img = enhancer.enhance(1.08)

    # Gradients
    img = add_gradient_overlay(img, 'top', COLORS['deep_espresso'], 0.5)
    img = add_gradient_overlay(img, 'bottom', COLORS['deep_espresso'], 0.6)

    draw = ImageDraw.Draw(img)

    # Progress indicators at top
    indicator_width = (STORY[0] - 100) // total_slides
    for i in range(total_slides):
        x = 50 + i * (indicator_width + 5)
        color = COLORS['pearl'] if i < slide_number else (*COLORS['pearl'][:3],)
        alpha = 255 if i < slide_number else 100
        draw.rectangle([(x, 50), (x + indicator_width - 5, 54)],
                      fill=color if i < slide_number else COLORS['warm_taupe'])

    # Brand
    draw.text((STORY[0]//2, 100), "VERALABS", font=get_font(24, bold=True), fill=COLORS['pearl'], anchor='mm')
    draw.text((STORY[0]//2, 130), "INTIMATES", font=get_font(12), fill=COLORS['rose_gold'], anchor='mm')

    # Slide number
    draw.text((STORY[0]//2, STORY[1]-200), f"{slide_number:02d}", font=get_font(120, bold=True), fill=COLORS['pearl'], anchor='mm')
    draw.text((STORY[0]//2, STORY[1]-100), "SWIPE", font=get_font(14), fill=COLORS['dusty_mauve'], anchor='mm')

    # Arrow
    draw.polygon([(STORY[0]//2-10, STORY[1]-60), (STORY[0]//2+10, STORY[1]-60), (STORY[0]//2, STORY[1]-45)],
                 fill=COLORS['rose_gold'])

    img.save(OUTPUT_DIR / f'{output_name}.jpg', 'JPEG', quality=95)
    print(f"Created: {output_name}.jpg")

def create_before_after(photo_path1, photo_path2, output_name):
    """Create comparison/duo post"""
    img = Image.new('RGB', SQUARE, COLORS['cream_white'])

    # Left and right panels
    left = load_and_crop_image(photo_path1, (520, 900))
    right = load_and_crop_image(photo_path2, (520, 900))

    img.paste(left, (20, 90))
    img.paste(right, (540, 90))

    draw = ImageDraw.Draw(img)

    # Center divider
    draw.line([(SQUARE[0]//2, 90), (SQUARE[0]//2, 990)], fill=COLORS['rose_gold'], width=2)

    # Center diamond
    cx, cy = SQUARE[0]//2, SQUARE[1]//2
    diamond_size = 15
    draw.polygon([(cx, cy-diamond_size), (cx+diamond_size, cy), (cx, cy+diamond_size), (cx-diamond_size, cy)],
                 fill=COLORS['pearl'], outline=COLORS['rose_gold'])

    # Top header
    draw.text((SQUARE[0]//2, 45), "DAY & NIGHT", font=get_font(20, bold=True), fill=COLORS['soft_charcoal'], anchor='mm')

    # Labels
    draw.text((280, SQUARE[1]-45), "MORNING", font=get_font(11), fill=COLORS['warm_taupe'], anchor='mm')
    draw.text((800, SQUARE[1]-45), "EVENING", font=get_font(11), fill=COLORS['warm_taupe'], anchor='mm')

    # Brand
    draw.text((SQUARE[0]//2, SQUARE[1]-20), "VERALABS", font=get_font(10), fill=COLORS['pale_gold'], anchor='mm')

    img.save(OUTPUT_DIR / f'{output_name}.jpg', 'JPEG', quality=95)
    print(f"Created: {output_name}.jpg")


def main():
    """Generate all intimates Instagram posts"""
    print("=" * 60)
    print("VERALABS Couture Intimates Post Generator")
    print("=" * 60)

    # Get couture photos
    couture_photos = sorted([p for p in PHOTO_DIR.glob('couture-*.jpg') if 'insta' not in p.name])

    print(f"\nFound {len(couture_photos)} couture photos")

    if len(couture_photos) < 10:
        print("Not enough photos to generate all variants")
        return

    posts_created = 0

    # 1-4: Boudoir Editorial Posts
    print("\n--- Creating Boudoir Editorial Posts ---")
    titles = ["Intimates", "Silk Dreams", "Desire", "Midnight"]
    for i, title in enumerate(titles):
        if i < len(couture_photos):
            create_boudoir_editorial(couture_photos[i], f'insta-intimates-boudoir-{i+1:02d}', title)
            posts_created += 1

    # 5-8: Silk Luxe Posts
    print("\n--- Creating Silk Luxe Posts ---")
    collections = ["Silk & Lace", "The Essentials", "Pure Comfort", "Night Collection"]
    for i, collection in enumerate(collections):
        idx = 4 + i
        if idx < len(couture_photos):
            create_silk_luxe_post(couture_photos[idx], f'insta-intimates-silk-{i+1:02d}', collection)
            posts_created += 1

    # 9-12: Romantic Duotone Posts
    print("\n--- Creating Romantic Duotone Posts ---")
    for i in range(4):
        idx = 8 + i
        if idx < len(couture_photos):
            create_romantic_duotone(couture_photos[idx], f'insta-intimates-duotone-{i+1:02d}', i + 1)
            posts_created += 1

    # 13-16: Minimal Silhouette Posts
    print("\n--- Creating Minimal Silhouette Posts ---")
    taglines = ["Effortless Elegance", "Pure Luxury", "Soft Touch", "Evening Grace"]
    for i, tagline in enumerate(taglines):
        idx = 12 + i
        if idx < len(couture_photos):
            create_minimal_silhouette(couture_photos[idx], f'insta-intimates-minimal-{i+1:02d}', tagline)
            posts_created += 1

    # 17-20: Luxury Showcase Posts
    print("\n--- Creating Luxury Showcase Posts ---")
    pieces = ["The Essential", "Silk Dreams", "Lace Edition", "Night Series"]
    for i, piece in enumerate(pieces):
        idx = 16 + i
        if idx < len(couture_photos):
            create_luxury_showcase(couture_photos[idx], f'insta-intimates-showcase-{i+1:02d}', piece)
            posts_created += 1

    # 21-24: Sensual Typography Posts
    print("\n--- Creating Sensual Typography Posts ---")
    words = ["Desire", "Allure", "Embrace", "Luxe"]
    for i, word in enumerate(words):
        idx = 20 + i
        if idx < len(couture_photos):
            create_sensual_typography(couture_photos[idx], f'insta-intimates-type-{i+1:02d}', word)
            posts_created += 1

    # 25-28: Soft Focus Portraits
    print("\n--- Creating Soft Focus Portraits ---")
    for i in range(4):
        idx = 24 + i
        if idx < len(couture_photos):
            create_soft_focus_portrait(couture_photos[idx], f'insta-intimates-soft-{i+1:02d}')
            posts_created += 1

    # 29-31: Editorial Triptychs
    print("\n--- Creating Editorial Triptychs ---")
    for i in range(3):
        start_idx = 28 + i * 3
        if start_idx + 2 < len(couture_photos):
            create_editorial_triptych(couture_photos[start_idx:start_idx+3], f'insta-intimates-triptych-{i+1:02d}')
            posts_created += 1

    # 32-34: Mood Quote Posts
    print("\n--- Creating Mood Quote Posts ---")
    quotes = [
        ("Elegance is the only beauty that never fades", "Audrey Hepburn"),
        ("Luxury must be comfortable, otherwise it is not luxury", "Coco Chanel"),
        ("Beauty begins the moment you decide to be yourself", "VERALABS"),
    ]
    for i, (quote, attr) in enumerate(quotes):
        idx = 37 + i
        if idx < len(couture_photos):
            create_mood_quote(couture_photos[idx], f'insta-intimates-quote-{i+1:02d}', quote, attr)
            posts_created += 1

    # 35-37: Collection Grids
    print("\n--- Creating Collection Grids ---")
    seasons = ["Spring", "Summer", "Evening"]
    for i, season in enumerate(seasons):
        start_idx = 40 + i * 4
        if start_idx + 3 < len(couture_photos):
            create_collection_grid(couture_photos[start_idx:start_idx+4], f'insta-intimates-grid-{i+1:02d}', season)
            posts_created += 1

    # 38-42: Story Carousel Slides
    print("\n--- Creating Story Carousel Slides ---")
    for i in range(5):
        idx = 52 + i
        if idx < len(couture_photos):
            create_story_carousel(couture_photos[idx], f'insta-intimates-story-{i+1:02d}', i + 1, 5)
            posts_created += 1

    # 43-45: Before/After Duo Posts
    print("\n--- Creating Duo Posts ---")
    for i in range(3):
        idx1 = 57 + i * 2
        idx2 = 58 + i * 2
        if idx2 < len(couture_photos):
            create_before_after(couture_photos[idx1], couture_photos[idx2], f'insta-intimates-duo-{i+1:02d}')
            posts_created += 1

    print("\n" + "=" * 60)
    print(f"COMPLETE: Created {posts_created} Intimates Instagram posts")
    print(f"Output directory: {OUTPUT_DIR}")
    print("=" * 60)


if __name__ == '__main__':
    main()
