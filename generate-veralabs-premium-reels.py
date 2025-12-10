#!/usr/bin/env python3
"""
VeraLabs Premium Instagram Reels Generator
Creates high-quality 60-second Instagram reels with holographic branding
"""

from moviepy import *
from moviepy import vfx
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import numpy as np
import os
from pathlib import Path

# Configuration
REEL_SIZE = (1080, 1920)  # Instagram Reels 9:16
REEL_DURATION = 60  # seconds
FPS = 30

PHOTO_DIR = Path('/home/user/studiov1/photo')
OUTPUT_DIR = Path('/home/user/studiov1/photo')

# Premium Brand Colors (RGB)
COLORS = {
    'cream_white': (250, 248, 245),
    'ivory': (247, 243, 237),
    'champagne': (232, 223, 211),
    'deep_espresso': (28, 25, 23),
    'rose_gold': (232, 180, 184),
    'pale_gold': (212, 175, 55),
    'warm_taupe': (184, 162, 142),
    'soft_charcoal': (68, 64, 60),
    'hologram_cyan': (0, 255, 255),
    'hologram_magenta': (255, 0, 255),
}

def get_font(size, bold=False):
    """Get premium system font"""
    fonts_bold = [
        '/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf',
        '/usr/share/fonts/truetype/liberation/LiberationSerif-Bold.ttf',
    ]
    fonts_regular = [
        '/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf',
        '/usr/share/fonts/truetype/liberation/LiberationSerif-Regular.ttf',
    ]

    font_list = fonts_bold if bold else fonts_regular

    for f in font_list:
        if os.path.exists(f):
            try:
                return ImageFont.truetype(f, size)
            except:
                continue
    return ImageFont.load_default()

def create_hologram_overlay(size, intensity=0.3):
    """Create sophisticated hologram overlay effect"""
    img = Image.new('RGBA', size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    width, height = size

    # Diagonal holographic lines
    for i in range(0, width + height, 40):
        alpha = int(255 * intensity * 0.15)
        draw.line([(i, 0), (i - height, height)],
                 fill=(*COLORS['hologram_cyan'], alpha), width=2)

    # Subtle gradient circles
    for i in range(3):
        center_x = width // 2 + (i - 1) * 300
        center_y = height // 2 + (i - 1) * 200
        for radius in range(100, 300, 30):
            alpha = int(255 * intensity * 0.1 * (1 - radius / 300))
            draw.ellipse([center_x - radius, center_y - radius,
                         center_x + radius, center_y + radius],
                        outline=(*COLORS['pale_gold'], alpha), width=1)

    return np.array(img)

def create_premium_watermark(size, frame_time=0, duration=60):
    """Create animated premium watermark with hologram effect"""
    img = Image.new('RGBA', size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    width, height = size

    # Pulsing effect
    pulse = 0.8 + 0.2 * np.sin(2 * np.pi * frame_time / duration)

    # Top watermark - VERALABS
    font_large = get_font(int(42 * pulse), bold=True)
    text = "VERALABS"
    bbox = draw.textbbox((0, 0), text, font=font_large)
    text_width = bbox[2] - bbox[0]
    x = (width - text_width) // 2
    y = 60

    # Holographic glow
    for offset in range(3, 0, -1):
        alpha = int(80 / offset)
        draw.text((x + offset, y + offset), text, font=font_large,
                 fill=(*COLORS['hologram_cyan'], alpha))
        draw.text((x - offset, y - offset), text, font=font_large,
                 fill=(*COLORS['hologram_magenta'], alpha))

    # Main text
    draw.text((x, y), text, font=font_large, fill=(*COLORS['cream_white'], 255))

    # Decorative line under VERALABS
    line_y = y + 60
    line_width = 180
    draw.line([(width // 2 - line_width // 2, line_y),
              (width // 2 + line_width // 2, line_y)],
             fill=(*COLORS['pale_gold'], 200), width=3)

    # × STUDIOV
    font_medium = get_font(24)
    text2 = "× StudioV"
    bbox2 = draw.textbbox((0, 0), text2, font=font_medium)
    text2_width = bbox2[2] - bbox2[0]
    x2 = (width - text2_width) // 2
    y2 = line_y + 25

    draw.text((x2, y2), text2, font=font_medium,
             fill=(*COLORS['rose_gold'], 220))

    # Bottom signature
    font_small = get_font(16)
    tagline = "HAUTE COUTURE • AI ARTISTRY"
    bbox3 = draw.textbbox((0, 0), tagline, font=font_small)
    text3_width = bbox3[2] - bbox3[0]
    x3 = (width - text3_width) // 2
    y3 = height - 100

    # Shadow
    draw.text((x3 + 2, y3 + 2), tagline, font=font_small,
             fill=(0, 0, 0, 150))
    draw.text((x3, y3), tagline, font=font_small,
             fill=(*COLORS['warm_taupe'], 200))

    # Corner frame accents
    corner_size = 60
    corner_color = (*COLORS['pale_gold'], 180)

    # Top-left
    draw.line([(30, 30), (30 + corner_size, 30)], fill=corner_color, width=2)
    draw.line([(30, 30), (30, 30 + corner_size)], fill=corner_color, width=2)

    # Top-right
    draw.line([(width - 30, 30), (width - 30 - corner_size, 30)],
             fill=corner_color, width=2)
    draw.line([(width - 30, 30), (width - 30, 30 + corner_size)],
             fill=corner_color, width=2)

    # Bottom-left
    draw.line([(30, height - 30), (30 + corner_size, height - 30)],
             fill=corner_color, width=2)
    draw.line([(30, height - 30), (30, height - 30 - corner_size)],
             fill=corner_color, width=2)

    # Bottom-right
    draw.line([(width - 30, height - 30), (width - 30 - corner_size, height - 30)],
             fill=corner_color, width=2)
    draw.line([(width - 30, height - 30), (width - 30, height - 30 - corner_size)],
             fill=corner_color, width=2)

    # Website URL at very bottom
    font_tiny = get_font(14)
    url = "studiov.aemons.com"
    bbox4 = draw.textbbox((0, 0), url, font=font_tiny)
    text4_width = bbox4[2] - bbox4[0]
    x4 = (width - text4_width) // 2
    y4 = height - 50

    draw.text((x4, y4), url, font=font_tiny,
             fill=(*COLORS['pale_gold'], 180))

    return np.array(img)

def create_title_card(size, title, subtitle=None, duration=3):
    """Create elegant title card"""
    img = Image.new('RGB', size, COLORS['deep_espresso'])
    draw = ImageDraw.Draw(img)

    width, height = size

    # Radial gradient background
    for y in range(height):
        for x in range(width):
            dist = np.sqrt((x - width/2)**2 + (y - height/2)**2)
            max_dist = np.sqrt((width/2)**2 + (height/2)**2)
            factor = 1 - (dist / max_dist) * 0.3
            color = tuple(int(c * factor) for c in COLORS['deep_espresso'])
            img.putpixel((x, y), color)

    # Title
    font_title = get_font(72, bold=True)
    bbox = draw.textbbox((0, 0), title, font=font_title)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    x = (width - text_width) // 2
    y = (height - text_height) // 2 - 50

    # Glow effect
    for i in range(5, 0, -1):
        alpha_img = Image.new('RGBA', size, (0, 0, 0, 0))
        alpha_draw = ImageDraw.Draw(alpha_img)
        alpha_draw.text((x, y), title, font=font_title,
                       fill=(*COLORS['pale_gold'], int(40 / i)))
        alpha_img = alpha_img.filter(ImageFilter.GaussianBlur(radius=i*2))
        img.paste(alpha_img, (0, 0), alpha_img)

    draw = ImageDraw.Draw(img)
    draw.text((x, y), title, font=font_title, fill=COLORS['cream_white'])

    # Subtitle
    if subtitle:
        font_sub = get_font(28)
        bbox_sub = draw.textbbox((0, 0), subtitle, font=font_sub)
        sub_width = bbox_sub[2] - bbox_sub[0]
        x_sub = (width - sub_width) // 2
        y_sub = y + text_height + 50

        # Decorative line
        line_y = y_sub - 20
        draw.line([(width // 2 - 100, line_y), (width // 2 + 100, line_y)],
                 fill=COLORS['pale_gold'], width=2)

        draw.text((x_sub, y_sub), subtitle, font=font_sub,
                 fill=COLORS['rose_gold'])

    return img

def load_and_prepare_image(img_path, target_size, zoom=1.0):
    """Load and prepare image with premium quality"""
    img = Image.open(img_path).convert('RGB')

    # Calculate dimensions
    target_ratio = target_size[0] / target_size[1]
    img_ratio = img.width / img.height

    if img_ratio > target_ratio:
        new_height = int(img.width / target_ratio * zoom)
        new_width = int(img.width * zoom)
    else:
        new_width = int(img.height * target_ratio * zoom)
        new_height = int(img.height * zoom)

    # High-quality resize
    img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)

    # Center crop
    left = (img.width - target_size[0]) // 2
    top = (img.height - target_size[1]) // 2
    img = img.crop((left, top, left + target_size[0], top + target_size[1]))

    # Enhance quality
    from PIL import ImageEnhance
    enhancer = ImageEnhance.Contrast(img)
    img = enhancer.enhance(1.1)
    enhancer = ImageEnhance.Sharpness(img)
    img = enhancer.enhance(1.2)

    return np.array(img)

def create_gradient_overlay(size, style='bottom', opacity=0.5):
    """Create premium gradient overlay"""
    img = Image.new('RGBA', size, (0, 0, 0, 0))
    width, height = size

    for y in range(height):
        if style == 'bottom':
            alpha = int(255 * opacity * (y / height) ** 2)
        elif style == 'top':
            alpha = int(255 * opacity * ((height - y) / height) ** 2)
        elif style == 'edges':
            dist_y = abs(y - height / 2) / (height / 2)
            alpha = int(255 * opacity * dist_y ** 2)
        else:
            alpha = int(255 * opacity * 0.4)

        for x in range(width):
            img.putpixel((x, y), (0, 0, 0, min(alpha, 255)))

    return np.array(img)

def make_ken_burns_clip(img_path, duration, zoom_start=1.0, zoom_end=1.15):
    """Create smooth Ken Burns effect clip"""
    def make_frame(t):
        progress = t / duration
        current_zoom = zoom_start + (zoom_end - zoom_start) * progress

        img_array = load_and_prepare_image(img_path, REEL_SIZE, zoom=current_zoom)

        # Add subtle vignette
        gradient = create_gradient_overlay(REEL_SIZE, style='edges', opacity=0.2)

        # Composite
        img_pil = Image.fromarray(img_array).convert('RGBA')
        gradient_pil = Image.fromarray(gradient)
        img_pil = Image.alpha_composite(img_pil, gradient_pil)

        return np.array(img_pil.convert('RGB'))

    return VideoClip(make_frame, duration=duration)

def create_reel_01_intimate_luxury():
    """Reel 1: Intimate Luxury Collection"""
    print("🎬 Creating Reel 1: Intimate Luxury Collection...")

    photos = [
        'insta-intimates-soft-01.jpg',
        'insta-intimates-soft-02.jpg',
        'insta-intimates-triptych-01.jpg',
        'insta-intimates-type-01.jpg',
        'minimal-12.jpg',
        'minimalist-1763747045808.jpg',
        'insta-intimates-soft-03.jpg',
        'minimalist-1763747961303.jpg',
    ]

    # Title card
    title_img = create_title_card(REEL_SIZE, "Intimate\nLuxury",
                                  "VeraLabs Collection", duration=3)
    title_clip = ImageClip(np.array(title_img), duration=3)

    # Create clips
    clips = [title_clip]
    remaining_time = REEL_DURATION - 3
    clip_duration = remaining_time / len(photos)

    for photo in photos:
        photo_path = PHOTO_DIR / photo
        if photo_path.exists():
            clip = make_ken_burns_clip(str(photo_path), clip_duration,
                                      zoom_start=1.05, zoom_end=1.2)
            clips.append(clip)

    # Concatenate
    final = concatenate_videoclips(clips, method="compose")

    # Add watermark overlay
    def make_watermark_frame(t):
        return create_premium_watermark(REEL_SIZE, t, REEL_DURATION)

    watermark = VideoClip(make_watermark_frame, duration=REEL_DURATION).with_opacity(0.95)

    # Add hologram overlay
    hologram = ImageClip(create_hologram_overlay(REEL_SIZE, intensity=0.2), duration=REEL_DURATION).with_opacity(0.4)

    # Composite
    final = CompositeVideoClip([final, hologram, watermark])

    # Add fade transitions
    final = final.with_effects([vfx.FadeIn(0.5), vfx.FadeOut(0.5)])

    output_path = OUTPUT_DIR / "reel-01-intimate-luxury.mp4"
    final.write_videofile(str(output_path), fps=FPS, codec='libx264',
                         audio=False, preset='slow', bitrate='8000k')

    print(f"✅ Reel 1 saved: {output_path}")
    return output_path

def create_reel_02_couture_elegance():
    """Reel 2: Haute Couture Elegance"""
    print("🎬 Creating Reel 2: Haute Couture Elegance...")

    photos = [
        'couture-1763744421490.jpg',
        'couture-1763742446114.jpg',
        'couture-1763745189124.jpg',
        'couture-1763746058167.jpg',
        'couture-1763747597445.jpg',
        'couture-1763830130888.jpg',
        'editorial-fashion-shoot-1.jpg',
        'editorial-fashion-shoot-4.jpg',
    ]

    # Title card
    title_img = create_title_card(REEL_SIZE, "Haute\nCouture",
                                  "AI-Generated Elegance", duration=3)
    title_clip = ImageClip(np.array(title_img), duration=3)

    # Create clips
    clips = [title_clip]
    remaining_time = REEL_DURATION - 3
    clip_duration = remaining_time / len(photos)

    for photo in photos:
        photo_path = PHOTO_DIR / photo
        if photo_path.exists():
            clip = make_ken_burns_clip(str(photo_path), clip_duration,
                                      zoom_start=1.0, zoom_end=1.18)
            clips.append(clip)

    # Concatenate
    final = concatenate_videoclips(clips, method="compose")

    # Add watermark
    def make_watermark_frame(t):
        return create_premium_watermark(REEL_SIZE, t, REEL_DURATION)

    watermark = VideoClip(make_watermark_frame, duration=REEL_DURATION).with_opacity(0.95)

    # Add hologram
    hologram = ImageClip(create_hologram_overlay(REEL_SIZE, intensity=0.25), duration=REEL_DURATION).with_opacity(0.35)

    # Composite
    final = CompositeVideoClip([final, hologram, watermark])
    final = final.with_effects([vfx.FadeIn(0.5), vfx.FadeOut(0.5)])

    output_path = OUTPUT_DIR / "reel-02-couture-elegance.mp4"
    final.write_videofile(str(output_path), fps=FPS, codec='libx264',
                         audio=False, preset='slow', bitrate='8000k')

    print(f"✅ Reel 2 saved: {output_path}")
    return output_path

def create_reel_03_minimalist_poetry():
    """Reel 3: Minimalist Poetry"""
    print("🎬 Creating Reel 3: Minimalist Poetry...")

    photos = [
        'minimalist-1763747016555.jpg',
        'minimalist-1763747951158.jpg',
        'minimalist-1763748374789.jpg',
        'minimal-11.jpg',
        'minimal-7.jpg',
        'minimal-8.jpg',
        'minimalist-1763830892482.jpg',
        'minimal-13.jpg',
    ]

    # Title card
    title_img = create_title_card(REEL_SIZE, "Minimalist\nPoetry",
                                  "Understated Elegance", duration=3)
    title_clip = ImageClip(np.array(title_img), duration=3)

    # Create clips
    clips = [title_clip]
    remaining_time = REEL_DURATION - 3
    clip_duration = remaining_time / len(photos)

    for photo in photos:
        photo_path = PHOTO_DIR / photo
        if photo_path.exists():
            clip = make_ken_burns_clip(str(photo_path), clip_duration,
                                      zoom_start=1.0, zoom_end=1.15)
            clips.append(clip)

    # Concatenate
    final = concatenate_videoclips(clips, method="compose")

    # Add watermark
    def make_watermark_frame(t):
        return create_premium_watermark(REEL_SIZE, t, REEL_DURATION)

    watermark = VideoClip(make_watermark_frame, duration=REEL_DURATION).with_opacity(0.95)

    # Add hologram
    hologram = ImageClip(create_hologram_overlay(REEL_SIZE, intensity=0.2), duration=REEL_DURATION).with_opacity(0.3)

    # Composite
    final = CompositeVideoClip([final, hologram, watermark])
    final = final.with_effects([vfx.FadeIn(0.5), vfx.FadeOut(0.5)])

    output_path = OUTPUT_DIR / "reel-03-minimalist-poetry.mp4"
    final.write_videofile(str(output_path), fps=FPS, codec='libx264',
                         audio=False, preset='slow', bitrate='8000k')

    print(f"✅ Reel 3 saved: {output_path}")
    return output_path

def create_reel_04_editorial_narrative():
    """Reel 4: Editorial Narrative"""
    print("🎬 Creating Reel 4: Editorial Narrative...")

    photos = [
        'editorial-fashion-shoot-1.jpg',
        'editorial-fashion-shoot-2.jpg',
        'editorial-fashion-shoot-3.jpg',
        'editorial-fashion-shoot-4.jpg',
        'contemporary-urban-style.jpg',
        'contemporary-urban-style-3.jpg',
        'contemporary-urban-style-5.jpg',
        'contemporary-urban-style-7.jpg',
    ]

    # Title card
    title_img = create_title_card(REEL_SIZE, "Editorial\nNarrative",
                                  "Contemporary Fashion", duration=3)
    title_clip = ImageClip(np.array(title_img), duration=3)

    # Create clips
    clips = [title_clip]
    remaining_time = REEL_DURATION - 3
    clip_duration = remaining_time / len(photos)

    for photo in photos:
        photo_path = PHOTO_DIR / photo
        if photo_path.exists():
            clip = make_ken_burns_clip(str(photo_path), clip_duration,
                                      zoom_start=1.0, zoom_end=1.2)
            clips.append(clip)

    # Concatenate
    final = concatenate_videoclips(clips, method="compose")

    # Add watermark
    def make_watermark_frame(t):
        return create_premium_watermark(REEL_SIZE, t, REEL_DURATION)

    watermark = VideoClip(make_watermark_frame, duration=REEL_DURATION).with_opacity(0.95)

    # Add hologram
    hologram = ImageClip(create_hologram_overlay(REEL_SIZE, intensity=0.3), duration=REEL_DURATION).with_opacity(0.4)

    # Composite
    final = CompositeVideoClip([final, hologram, watermark])
    final = final.with_effects([vfx.FadeIn(0.5), vfx.FadeOut(0.5)])

    output_path = OUTPUT_DIR / "reel-04-editorial-narrative.mp4"
    final.write_videofile(str(output_path), fps=FPS, codec='libx264',
                         audio=False, preset='slow', bitrate='8000k')

    print(f"✅ Reel 4 saved: {output_path}")
    return output_path

if __name__ == "__main__":
    print("🎥 VeraLabs Premium Reels Generator")
    print("=" * 50)

    try:
        create_reel_01_intimate_luxury()
        create_reel_02_couture_elegance()
        create_reel_03_minimalist_poetry()
        create_reel_04_editorial_narrative()

        print("\n" + "=" * 50)
        print("✨ All premium reels created successfully!")
        print("📁 Location: /home/user/studiov1/photo/")

    except Exception as e:
        print(f"\n❌ Error: {e}")
        import traceback
        traceback.print_exc()
