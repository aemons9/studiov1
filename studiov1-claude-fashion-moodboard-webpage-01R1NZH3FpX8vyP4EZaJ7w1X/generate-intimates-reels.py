#!/usr/bin/env python3
"""
VeraLabs Intimates Instagram Reels Generator
Creates elegant 60-second video reels for the Intimates collection
"""

from moviepy import *
from PIL import Image, ImageDraw, ImageFont
import numpy as np
import os
from pathlib import Path

# Configuration
REEL_SIZE = (1080, 1920)  # Instagram Reels 9:16
REEL_DURATION = 60  # seconds
FPS = 30

PHOTO_DIR = Path('/home/user/studiov1/photo')
OUTPUT_DIR = Path('/home/user/studiov1/photo')

# Intimates-focused color palette
COLORS = {
    'cream_white': (250, 248, 245),
    'ivory': (247, 243, 237),
    'champagne': (232, 223, 211),
    'deep_espresso': (28, 25, 23),
    'rose_gold': (232, 180, 184),
    'pale_gold': (212, 175, 55),
    'warm_taupe': (184, 162, 142),
    'blush_pink': (245, 218, 223),
    'soft_rose': (230, 190, 195),
    'pearl': (253, 251, 249),
    'dusty_lavender': (198, 182, 200),
    'midnight_silk': (35, 32, 38),
    'bordeaux': (88, 45, 52),
    'deep_plum': (62, 38, 48),
}

def get_font(size):
    """Get system font"""
    fonts = [
        '/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf',
        '/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf',
        '/usr/share/fonts/truetype/liberation/LiberationSerif-Bold.ttf',
    ]
    for f in fonts:
        if os.path.exists(f):
            try:
                return ImageFont.truetype(f, size)
            except:
                continue
    return ImageFont.load_default()

def create_text_image(text, size, font_size=60, color=COLORS['cream_white'], bg_color=None,
                       subtitle=None, subtitle_color=COLORS['rose_gold']):
    """Create an image with centered text"""
    img = Image.new('RGBA', size, (0, 0, 0, 0) if bg_color is None else (*bg_color, 255))
    draw = ImageDraw.Draw(img)

    font = get_font(font_size)
    subtitle_font = get_font(int(font_size * 0.4))

    # Calculate text position
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]

    x = (size[0] - text_width) // 2
    y = (size[1] - text_height) // 2

    if subtitle:
        y -= 40

    # Draw shadow
    draw.text((x + 3, y + 3), text, font=font, fill=(0, 0, 0, 150))
    # Draw text
    draw.text((x, y), text, font=font, fill=(*color, 255))

    if subtitle:
        sub_bbox = draw.textbbox((0, 0), subtitle, font=subtitle_font)
        sub_width = sub_bbox[2] - sub_bbox[0]
        sub_x = (size[0] - sub_width) // 2
        draw.text((sub_x, y + text_height + 30), subtitle, font=subtitle_font, fill=(*subtitle_color, 255))

    return np.array(img)

def create_intimates_brand_overlay(size):
    """Create brand overlay for intimates collection"""
    img = Image.new('RGBA', size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Top brand
    font = get_font(32)
    draw.text((size[0]//2, 80), "VERALABS", font=font, fill=(*COLORS['pearl'], 255), anchor='mm')

    # Decorative line with dots
    center_x = size[0]//2
    draw.line([(center_x - 100, 115), (center_x - 20, 115)], fill=(*COLORS['rose_gold'], 200), width=1)
    draw.ellipse([(center_x - 5, 112), (center_x + 5, 118)], fill=(*COLORS['rose_gold'], 255))
    draw.line([(center_x + 20, 115), (center_x + 100, 115)], fill=(*COLORS['rose_gold'], 200), width=1)

    # Bottom tagline
    small_font = get_font(16)
    draw.text((size[0]//2, size[1] - 80), "INTIMATES COLLECTION", font=small_font,
              fill=(*COLORS['dusty_lavender'], 200), anchor='mm')

    return np.array(img)

def load_and_prepare_image(img_path, target_size, zoom=1.0, pan=(0, 0)):
    """Load image and prepare for video with zoom/pan effect"""
    img = Image.open(img_path).convert('RGB')

    # Calculate dimensions for zoom
    target_ratio = target_size[0] / target_size[1]
    img_ratio = img.width / img.height

    if img_ratio > target_ratio:
        new_height = int(img.width / target_ratio)
        new_width = img.width
    else:
        new_width = int(img.height * target_ratio)
        new_height = img.height

    # Apply zoom
    zoom_width = int(new_width * zoom)
    zoom_height = int(new_height * zoom)

    # Resize
    img = img.resize((zoom_width, zoom_height), Image.Resampling.LANCZOS)

    # Calculate crop with pan
    left = (img.width - target_size[0]) // 2 + int(pan[0])
    top = (img.height - target_size[1]) // 2 + int(pan[1])

    left = max(0, min(left, img.width - target_size[0]))
    top = max(0, min(top, img.height - target_size[1]))

    img = img.crop((left, top, left + target_size[0], top + target_size[1]))

    return np.array(img)

def create_soft_gradient_overlay(size, direction='bottom', opacity=0.5, color=None):
    """Create soft romantic gradient overlay"""
    if color is None:
        color = COLORS['deep_plum']

    img = Image.new('RGBA', size, (0, 0, 0, 0))

    for y in range(size[1]):
        if direction == 'bottom':
            alpha = int(255 * opacity * (y / size[1]) ** 1.3)
        elif direction == 'top':
            alpha = int(255 * opacity * ((size[1] - y) / size[1]) ** 1.3)
        else:
            alpha = int(255 * opacity * 0.4)

        for x in range(size[0]):
            img.putpixel((x, y), (*color, min(alpha, 255)))

    return np.array(img)

def create_romantic_vignette(size, strength=0.4):
    """Create romantic soft vignette"""
    img = Image.new('RGBA', size, (0, 0, 0, 0))

    cx, cy = size[0] // 2, size[1] // 2
    max_dist = (cx ** 2 + cy ** 2) ** 0.5

    pixels = img.load()
    for y in range(size[1]):
        for x in range(size[0]):
            dist = ((x - cx) ** 2 + (y - cy) ** 2) ** 0.5
            alpha = int(255 * strength * (dist / max_dist) ** 1.8)
            pixels[x, y] = (*COLORS['bordeaux'], min(alpha, 180))

    return np.array(img)

def make_ken_burns_clip(img_path, duration, zoom_start=1.0, zoom_end=1.1, pan_start=(0, 0), pan_end=(0, 0)):
    """Create Ken Burns effect clip"""
    def make_frame(t):
        progress = t / duration
        current_zoom = zoom_start + (zoom_end - zoom_start) * progress
        current_pan = (
            pan_start[0] + (pan_end[0] - pan_start[0]) * progress,
            pan_start[1] + (pan_end[1] - pan_start[1]) * progress
        )
        return load_and_prepare_image(img_path, REEL_SIZE, current_zoom, current_pan)

    return VideoClip(make_frame, duration=duration)

def create_romantic_text_card(text, size, subtitle=None):
    """Create romantic styled text card"""
    img = Image.new('RGBA', size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Elegant centered text
    font = get_font(52)
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]

    x = (size[0] - text_width) // 2
    y = size[1] // 2 - 50

    # Decorative elements
    draw.line([(x - 40, y - 20), (x - 10, y - 20)], fill=(*COLORS['rose_gold'], 200), width=1)
    draw.line([(x + text_width + 10, y - 20), (x + text_width + 40, y - 20)],
              fill=(*COLORS['rose_gold'], 200), width=1)

    # Shadow and text
    draw.text((x + 2, y + 2), text, font=font, fill=(0, 0, 0, 100))
    draw.text((x, y), text, font=font, fill=(*COLORS['pearl'], 255))

    if subtitle:
        sub_font = get_font(22)
        sub_bbox = draw.textbbox((0, 0), subtitle, font=sub_font)
        sub_x = (size[0] - (sub_bbox[2] - sub_bbox[0])) // 2
        draw.text((sub_x, y + text_height + 25), subtitle, font=sub_font,
                  fill=(*COLORS['rose_gold'], 255))

    return np.array(img)

def create_elegant_caption(text, size):
    """Create elegant bottom caption"""
    img = Image.new('RGBA', size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    font = get_font(24)
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    x = (size[0] - text_width) // 2
    y = size[1] - 220

    # Subtle background bar
    bar_padding = 40
    for by in range(y - 20, y + 50):
        for bx in range(x - bar_padding, x + text_width + bar_padding):
            if 0 <= bx < size[0]:
                img.putpixel((bx, by), (*COLORS['midnight_silk'], 180))

    # Decorative accents
    draw.line([(x - bar_padding, y - 20), (x - bar_padding, y + 50)],
              fill=(*COLORS['rose_gold'], 200), width=1)
    draw.line([(x + text_width + bar_padding, y - 20), (x + text_width + bar_padding, y + 50)],
              fill=(*COLORS['rose_gold'], 200), width=1)

    draw.text((x, y), text, font=font, fill=(*COLORS['pearl'], 255))

    return np.array(img)

def create_reel_intimates_intro():
    """Create Reel 8: Intimates Collection Introduction"""
    print("\n=== Creating Reel 8: Intimates Introduction ===")

    clips = []

    # Get intimates photos
    intimates_photos = sorted(PHOTO_DIR.glob('insta-intimates-*.jpg'))[:16]
    couture_photos = sorted([p for p in PHOTO_DIR.glob('couture-*.jpg') if 'insta' not in p.name])[:8]

    all_photos = intimates_photos + couture_photos

    # Opening (0-8s) - Elegant reveal
    print("  Creating opening...")
    opening_bg = ColorClip(size=REEL_SIZE, color=COLORS['midnight_silk']).with_duration(8)

    # Brand reveal
    intro_text = create_text_image("VERALABS", REEL_SIZE, font_size=64,
                                    color=COLORS['pearl'])
    intro_clip = ImageClip(intro_text).with_duration(3).with_start(1)
    intro_clip = intro_clip.with_effects([vfx.CrossFadeIn(0.8), vfx.CrossFadeOut(0.5)])

    # Collection name
    collection_text = create_text_image("INTIMATES", REEL_SIZE, font_size=80,
                                         subtitle="THE COLLECTION", color=COLORS['rose_gold'])
    collection_clip = ImageClip(collection_text).with_duration(3.5).with_start(4)
    collection_clip = collection_clip.with_effects([vfx.CrossFadeIn(0.5), vfx.CrossFadeOut(0.5)])

    scene_open = CompositeVideoClip([opening_bg, intro_clip, collection_clip])
    clips.append(scene_open)

    # Photo reveals with romantic captions (8-52s)
    captions = [
        "SILK & SOFTNESS",
        "ELEGANT SIMPLICITY",
        "QUIET LUXURY",
        "INTIMATE MOMENTS",
        "PURE COMFORT",
        "TIMELESS BEAUTY",
        "DELICATE DETAILS",
        "SENSUAL GRACE",
        "NATURAL ALLURE",
        "EFFORTLESS STYLE",
        "MORNING LIGHT",
        "EVENING ELEGANCE",
    ]

    for i, (photo, caption) in enumerate(zip(all_photos[:12], captions)):
        print(f"  Creating photo scene {i+1}...")
        duration = 3.5

        # Ken Burns with gentle movement
        if i % 3 == 0:
            photo_clip = make_ken_burns_clip(photo, duration, 1.0, 1.08, (0, -20), (0, 20))
        elif i % 3 == 1:
            photo_clip = make_ken_burns_clip(photo, duration, 1.08, 1.0, (20, 0), (-20, 0))
        else:
            photo_clip = make_ken_burns_clip(photo, duration, 1.02, 1.1, (-15, 15), (15, -15))

        # Soft gradient
        gradient = create_soft_gradient_overlay(REEL_SIZE, 'bottom', 0.5, COLORS['deep_plum'])
        gradient_clip = ImageClip(gradient).with_duration(duration)

        # Caption
        caption_img = create_elegant_caption(caption, REEL_SIZE)
        caption_clip = ImageClip(caption_img).with_duration(duration - 0.5).with_start(0.25)
        caption_clip = caption_clip.with_effects([vfx.CrossFadeIn(0.2), vfx.CrossFadeOut(0.2)])

        # Brand
        brand = create_intimates_brand_overlay(REEL_SIZE)
        brand_clip = ImageClip(brand).with_duration(duration)

        scene = CompositeVideoClip([photo_clip, gradient_clip, caption_clip, brand_clip])
        scene = scene.with_effects([vfx.CrossFadeIn(0.2), vfx.CrossFadeOut(0.2)])
        clips.append(scene)

    # Closing (52-60s)
    print("  Creating closing...")
    closing_bg = ColorClip(size=REEL_SIZE, color=COLORS['midnight_silk']).with_duration(8)

    closing_text = create_text_image("DISCOVER", REEL_SIZE, font_size=48,
                                      color=COLORS['rose_gold'], subtitle="THE COLLECTION")
    closing_clip = ImageClip(closing_text).with_duration(3).with_start(1)
    closing_clip = closing_clip.with_effects([vfx.CrossFadeIn(0.5), vfx.CrossFadeOut(0.5)])

    final_text = create_text_image("VERALABS", REEL_SIZE, font_size=72,
                                    subtitle="Link in Bio", color=COLORS['pearl'])
    final_clip = ImageClip(final_text).with_duration(3).with_start(4.5)
    final_clip = final_clip.with_effects([vfx.CrossFadeIn(0.5)])

    scene_close = CompositeVideoClip([closing_bg, closing_clip, final_clip])
    clips.append(scene_close)

    # Concatenate
    print("  Concatenating scenes...")
    final_video = concatenate_videoclips(clips, method="compose")
    final_video = final_video.subclipped(0, min(60, final_video.duration))

    # Export
    output_path = OUTPUT_DIR / 'reel-08-intimates-intro.mp4'
    print(f"  Exporting to {output_path}...")
    final_video.write_videofile(
        str(output_path),
        fps=FPS,
        codec='libx264',
        audio=False,
        preset='medium',
        threads=4,
        ffmpeg_params=['-pix_fmt', 'yuv420p']
    )
    print(f"  ✓ Reel 8 complete: {output_path}")
    return output_path

def create_quote_overlay(quote, author, size):
    """Create elegant quote overlay for intimates"""
    img = Image.new('RGBA', size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Quote marks
    quote_font = get_font(72)
    draw.text((100, size[1]//2 - 180), '"', font=quote_font, fill=(*COLORS['rose_gold'], 150))

    # Quote text
    text_font = get_font(32)
    words = quote.split()
    lines = []
    current_line = []
    for word in words:
        current_line.append(word)
        test_line = ' '.join(current_line)
        bbox = draw.textbbox((0, 0), test_line, font=text_font)
        if bbox[2] - bbox[0] > size[0] - 200:
            current_line.pop()
            lines.append(' '.join(current_line))
            current_line = [word]
    if current_line:
        lines.append(' '.join(current_line))

    y_offset = size[1]//2 - 100
    for line in lines[:3]:
        bbox = draw.textbbox((0, 0), line, font=text_font)
        x = (size[0] - (bbox[2] - bbox[0])) // 2
        draw.text((x + 2, y_offset + 2), line, font=text_font, fill=(0, 0, 0, 120))
        draw.text((x, y_offset), line, font=text_font, fill=(*COLORS['pearl'], 255))
        y_offset += 50

    # Author
    author_font = get_font(18)
    bbox = draw.textbbox((0, 0), f"— {author}", font=author_font)
    x = (size[0] - (bbox[2] - bbox[0])) // 2
    draw.text((x, y_offset + 30), f"— {author}", font=author_font,
              fill=(*COLORS['dusty_lavender'], 255))

    return np.array(img)

def create_reel_intimates_luxury():
    """Create Reel 9: Luxury Intimates - Silk & Satin Focus"""
    print("\n=== Creating Reel 9: Luxury Intimates ===")

    clips = []

    # Get silk/luxury focused photos
    silk_photos = sorted(PHOTO_DIR.glob('insta-intimates-silk-*.jpg'))
    showcase_photos = sorted(PHOTO_DIR.glob('insta-intimates-showcase-*.jpg'))
    soft_photos = sorted(PHOTO_DIR.glob('insta-intimates-soft-*.jpg'))

    all_photos = silk_photos + showcase_photos + soft_photos

    # Opening (0-6s)
    print("  Creating opening...")
    opening_bg = ColorClip(size=REEL_SIZE, color=COLORS['deep_plum']).with_duration(6)

    title_text = create_text_image("SILK & SATIN", REEL_SIZE, font_size=56,
                                    subtitle="LUXURY REDEFINED", color=COLORS['pearl'])
    title_clip = ImageClip(title_text).with_duration(4).with_start(1)
    title_clip = title_clip.with_effects([vfx.CrossFadeIn(0.8), vfx.CrossFadeOut(0.5)])

    scene_open = CompositeVideoClip([opening_bg, title_clip])
    clips.append(scene_open)

    # Luxury sections with quotes
    sections = [
        ("THE FEEL", "Silken touch against skin",
         "Luxury is in the details that only you know"),
        ("THE LOOK", "Timeless elegance unveiled",
         "True beauty needs no announcement"),
        ("THE MOMENT", "When comfort meets confidence",
         "She wears it like a secret"),
    ]

    photo_idx = 0
    for section_title, section_subtitle, section_quote in sections:
        print(f"  Creating section: {section_title}...")

        # Section intro (2s)
        intro_bg = ColorClip(size=REEL_SIZE, color=COLORS['midnight_silk']).with_duration(2)
        intro_text = create_romantic_text_card(section_title, REEL_SIZE, section_subtitle)
        intro_clip = ImageClip(intro_text).with_duration(1.5).with_start(0.25)
        intro_clip = intro_clip.with_effects([vfx.CrossFadeIn(0.25), vfx.CrossFadeOut(0.25)])

        clips.append(CompositeVideoClip([intro_bg, intro_clip]))

        # 4 photos per section with quote on middle two
        for j in range(4):
            if photo_idx < len(all_photos):
                photo = all_photos[photo_idx % len(all_photos)]
                photo_idx += 1
                duration = 4

                # Slow, luxurious movement
                if j % 2 == 0:
                    photo_clip = make_ken_burns_clip(photo, duration, 1.0, 1.06, (0, -15), (0, 15))
                else:
                    photo_clip = make_ken_burns_clip(photo, duration, 1.06, 1.0, (10, 0), (-10, 0))

                # Soft overlay
                gradient = create_soft_gradient_overlay(REEL_SIZE, 'bottom', 0.45, COLORS['bordeaux'])
                gradient_clip = ImageClip(gradient).with_duration(duration)

                # Quote on middle photos
                if j == 1 or j == 2:
                    quote_img = create_quote_overlay(section_quote, "VERALABS", REEL_SIZE)
                    text_clip = ImageClip(quote_img).with_duration(duration - 0.4).with_start(0.2)
                    text_clip = text_clip.with_effects([vfx.CrossFadeIn(0.3), vfx.CrossFadeOut(0.3)])
                else:
                    caption_img = create_elegant_caption(section_title, REEL_SIZE)
                    text_clip = ImageClip(caption_img).with_duration(duration - 0.4).with_start(0.2)
                    text_clip = text_clip.with_effects([vfx.CrossFadeIn(0.2), vfx.CrossFadeOut(0.2)])

                # Brand
                brand = create_intimates_brand_overlay(REEL_SIZE)
                brand_clip = ImageClip(brand).with_duration(duration)

                scene = CompositeVideoClip([photo_clip, gradient_clip, text_clip, brand_clip])
                scene = scene.with_effects([vfx.CrossFadeIn(0.15), vfx.CrossFadeOut(0.15)])
                clips.append(scene)

    # Closing (6s)
    print("  Creating closing...")
    closing_bg = ColorClip(size=REEL_SIZE, color=COLORS['midnight_silk']).with_duration(6)

    closing_text = create_text_image("VERALABS", REEL_SIZE, font_size=72,
                                      subtitle="Luxury Intimates", color=COLORS['rose_gold'])
    closing_clip = ImageClip(closing_text).with_duration(4).with_start(1)
    closing_clip = closing_clip.with_effects([vfx.CrossFadeIn(0.5), vfx.CrossFadeOut(0.5)])

    scene_close = CompositeVideoClip([closing_bg, closing_clip])
    clips.append(scene_close)

    # Concatenate
    print("  Concatenating scenes...")
    final_video = concatenate_videoclips(clips, method="compose")
    final_video = final_video.subclipped(0, min(60, final_video.duration))

    # Export
    output_path = OUTPUT_DIR / 'reel-09-intimates-luxury.mp4'
    print(f"  Exporting to {output_path}...")
    final_video.write_videofile(
        str(output_path),
        fps=FPS,
        codec='libx264',
        audio=False,
        preset='medium',
        threads=4,
        ffmpeg_params=['-pix_fmt', 'yuv420p']
    )
    print(f"  ✓ Reel 9 complete: {output_path}")
    return output_path

def create_mood_word_overlay(word, size):
    """Create large mood word overlay"""
    img = Image.new('RGBA', size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    font = get_font(100)
    bbox = draw.textbbox((0, 0), word, font=font)
    text_width = bbox[2] - bbox[0]
    x = (size[0] - text_width) // 2
    y = size[1] // 2 - 50

    # Shadow
    draw.text((x + 4, y + 4), word, font=font, fill=(0, 0, 0, 100))
    # Main text
    draw.text((x, y), word, font=font, fill=(*COLORS['pearl'], 255))

    # Underline
    draw.line([(x, y + 90), (x + text_width, y + 90)],
              fill=(*COLORS['rose_gold'], 200), width=2)

    return np.array(img)

def create_reel_intimates_mood():
    """Create Reel 10: Intimates Mood - Sensual Typography"""
    print("\n=== Creating Reel 10: Intimates Mood ===")

    clips = []

    # Get typography-focused photos
    type_photos = sorted(PHOTO_DIR.glob('insta-intimates-type-*.jpg'))
    boudoir_photos = sorted(PHOTO_DIR.glob('insta-intimates-boudoir-*.jpg'))
    duotone_photos = sorted(PHOTO_DIR.glob('insta-intimates-duotone-*.jpg'))

    all_photos = type_photos + boudoir_photos + duotone_photos

    # Opening (0-5s)
    print("  Creating opening...")
    opening_bg = ColorClip(size=REEL_SIZE, color=COLORS['deep_espresso']).with_duration(5)

    title_text = create_text_image("MOOD", REEL_SIZE, font_size=72,
                                    color=COLORS['rose_gold'], subtitle="A VISUAL JOURNEY")
    title_clip = ImageClip(title_text).with_duration(3.5).with_start(0.75)
    title_clip = title_clip.with_effects([vfx.CrossFadeIn(0.5), vfx.CrossFadeOut(0.5)])

    scene_open = CompositeVideoClip([opening_bg, title_clip])
    clips.append(scene_open)

    # Mood words sequence
    mood_words = [
        "DESIRE",
        "ALLURE",
        "EMBRACE",
        "LUXE",
        "GRACE",
        "DREAM",
        "BLISS",
        "WARMTH",
    ]

    photo_idx = 0
    for word in mood_words:
        print(f"  Creating mood: {word}...")
        duration = 6.5

        if photo_idx < len(all_photos):
            photo = all_photos[photo_idx % len(all_photos)]
            photo_idx += 1

            # Slow dramatic movement
            photo_clip = make_ken_burns_clip(photo, duration, 1.0, 1.12, (0, -30), (0, 30))

            # Dark moody overlay
            overlay = create_soft_gradient_overlay(REEL_SIZE, 'full', 0.5, COLORS['midnight_silk'])
            overlay_clip = ImageClip(overlay).with_duration(duration)

            # Romantic vignette
            vignette = create_romantic_vignette(REEL_SIZE, 0.4)
            vignette_clip = ImageClip(vignette).with_duration(duration)

            # Mood word
            word_img = create_mood_word_overlay(word, REEL_SIZE)
            word_clip = ImageClip(word_img).with_duration(duration - 1).with_start(0.5)
            word_clip = word_clip.with_effects([vfx.CrossFadeIn(0.4), vfx.CrossFadeOut(0.4)])

            # Brand
            brand = create_intimates_brand_overlay(REEL_SIZE)
            brand_clip = ImageClip(brand).with_duration(duration)

            scene = CompositeVideoClip([photo_clip, overlay_clip, vignette_clip, word_clip, brand_clip])
            scene = scene.with_effects([vfx.CrossFadeIn(0.25), vfx.CrossFadeOut(0.25)])
            clips.append(scene)

    # Closing (last 7s)
    print("  Creating closing...")
    closing_bg = ColorClip(size=REEL_SIZE, color=COLORS['deep_espresso']).with_duration(7)

    closing_text = create_text_image("VERALABS", REEL_SIZE, font_size=80,
                                      subtitle="Feel Everything", color=COLORS['pearl'])
    closing_clip = ImageClip(closing_text).with_duration(5).with_start(1)
    closing_clip = closing_clip.with_effects([vfx.CrossFadeIn(0.5), vfx.CrossFadeOut(0.5)])

    scene_close = CompositeVideoClip([closing_bg, closing_clip])
    clips.append(scene_close)

    # Concatenate
    print("  Concatenating scenes...")
    final_video = concatenate_videoclips(clips, method="compose")
    final_video = final_video.subclipped(0, min(60, final_video.duration))

    # Export
    output_path = OUTPUT_DIR / 'reel-10-intimates-mood.mp4'
    print(f"  Exporting to {output_path}...")
    final_video.write_videofile(
        str(output_path),
        fps=FPS,
        codec='libx264',
        audio=False,
        preset='medium',
        threads=4,
        ffmpeg_params=['-pix_fmt', 'yuv420p']
    )
    print(f"  ✓ Reel 10 complete: {output_path}")
    return output_path

def main():
    print("=" * 60)
    print("VERALABS Intimates Reels Generator")
    print("Creating 3 x 60-second Intimates Reels")
    print("=" * 60)

    # Create all intimates reels
    reel8 = create_reel_intimates_intro()
    reel9 = create_reel_intimates_luxury()
    reel10 = create_reel_intimates_mood()

    print("\n" + "=" * 60)
    print("ALL INTIMATES REELS COMPLETE!")
    print("=" * 60)
    print(f"\n📹 Reel 8: {reel8}")
    print(f"📹 Reel 9: {reel9}")
    print(f"📹 Reel 10: {reel10}")
    print("\nFormat: 1080x1920 (9:16) • 60 seconds • 30 FPS")
    print("=" * 60)

if __name__ == '__main__':
    main()
