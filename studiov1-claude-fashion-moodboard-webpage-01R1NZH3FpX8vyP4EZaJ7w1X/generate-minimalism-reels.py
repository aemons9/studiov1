#!/usr/bin/env python3
"""
VeraLabs Minimalism Instagram Reels Generator
Creates 10 sophisticated 60-second reels using all minimalism images
High-profile creative director aesthetic
"""

from moviepy import *
from PIL import Image, ImageDraw, ImageFont, ImageEnhance
import numpy as np
import os
from pathlib import Path

# Configuration
REEL_SIZE = (1080, 1920)
REEL_DURATION = 60
FPS = 30

PHOTO_DIR = Path('/home/user/studiov1/photo')
OUTPUT_DIR = Path('/home/user/studiov1/photo')

# Minimalist color palette
COLORS = {
    'pure_white': (255, 255, 255),
    'off_white': (250, 248, 245),
    'warm_white': (252, 250, 247),
    'cool_gray': (180, 180, 185),
    'silver': (200, 200, 205),
    'charcoal': (45, 42, 40),
    'deep_black': (15, 12, 10),
    'true_black': (0, 0, 0),
    'warm_nude': (225, 210, 195),
    'golden_hour': (255, 235, 200),
    'midnight': (25, 22, 28),
    'espresso': (35, 30, 28),
    'gold_accent': (195, 165, 115),
    'copper': (180, 130, 100),
}

def get_font(size, bold=False):
    """Get system font"""
    fonts = [
        '/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf' if bold else '/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf',
        '/usr/share/fonts/truetype/liberation/LiberationSerif-Bold.ttf' if bold else '/usr/share/fonts/truetype/liberation/LiberationSerif-Regular.ttf',
    ]
    for f in fonts:
        if os.path.exists(f):
            try:
                return ImageFont.truetype(f, size)
            except:
                continue
    return ImageFont.load_default()

def get_sans_font(size, bold=False):
    """Get sans-serif font"""
    fonts = [
        '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf' if bold else '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',
    ]
    for f in fonts:
        if os.path.exists(f):
            try:
                return ImageFont.truetype(f, size)
            except:
                continue
    return ImageFont.load_default()

def get_minimalism_photos():
    """Get all minimalism source photos"""
    photos = []
    for ext in ['jpg', 'jpeg', 'png']:
        photos.extend(PHOTO_DIR.glob(f'minimal-*.{ext}'))
        photos.extend(PHOTO_DIR.glob(f'minimalist-*.{ext}'))
    return sorted(set(photos), key=lambda p: p.name)

def load_and_prepare_image(img_path, target_size, zoom=1.0, pan=(0, 0)):
    """Load image and prepare for video with zoom/pan effect"""
    img = Image.open(img_path).convert('RGB')

    target_ratio = target_size[0] / target_size[1]
    img_ratio = img.width / img.height

    if img_ratio > target_ratio:
        new_height = int(img.width / target_ratio)
        new_width = img.width
    else:
        new_width = int(img.height * target_ratio)
        new_height = img.height

    zoom_width = int(new_width * zoom)
    zoom_height = int(new_height * zoom)

    img = img.resize((zoom_width, zoom_height), Image.Resampling.LANCZOS)

    left = (img.width - target_size[0]) // 2 + int(pan[0])
    top = (img.height - target_size[1]) // 2 + int(pan[1])

    left = max(0, min(left, img.width - target_size[0]))
    top = max(0, min(top, img.height - target_size[1]))

    img = img.crop((left, top, left + target_size[0], top + target_size[1]))

    return np.array(img)

def apply_grade(frame, style='warm'):
    """Apply color grading to frame"""
    img = Image.fromarray(frame)

    if style == 'warm':
        enhancer = ImageEnhance.Color(img)
        img = enhancer.enhance(0.85)
        tint = Image.new('RGB', img.size, (255, 248, 240))
        img = Image.blend(img, tint, 0.06)
    elif style == 'cool':
        enhancer = ImageEnhance.Color(img)
        img = enhancer.enhance(0.75)
        tint = Image.new('RGB', img.size, (240, 245, 255))
        img = Image.blend(img, tint, 0.08)
    elif style == 'noir':
        enhancer = ImageEnhance.Color(img)
        img = enhancer.enhance(0.35)
        enhancer = ImageEnhance.Contrast(img)
        img = enhancer.enhance(1.25)
    elif style == 'golden':
        tint = Image.new('RGB', img.size, COLORS['golden_hour'])
        img = Image.blend(img, tint, 0.1)

    return np.array(img)

def create_text_overlay(text, size, font_size=60, color=None, subtitle=None, position='center'):
    """Create text overlay image"""
    if color is None:
        color = COLORS['off_white']

    img = Image.new('RGBA', size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    font = get_font(font_size, bold=True)

    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]

    if position == 'center':
        x = (size[0] - text_width) // 2
        y = (size[1] - text_height) // 2 - 40
    elif position == 'bottom':
        x = (size[0] - text_width) // 2
        y = size[1] - 300

    # Shadow
    draw.text((x + 3, y + 3), text, font=font, fill=(0, 0, 0, 120))
    draw.text((x, y), text, font=font, fill=(*color, 255))

    if subtitle:
        sub_font = get_sans_font(int(font_size * 0.35))
        sub_bbox = draw.textbbox((0, 0), subtitle, font=sub_font)
        sub_x = (size[0] - (sub_bbox[2] - sub_bbox[0])) // 2
        draw.text((sub_x, y + text_height + 25), subtitle, font=sub_font,
                  fill=(*COLORS['gold_accent'], 255))

    return np.array(img)

def create_brand_overlay(size):
    """Create minimal brand overlay"""
    img = Image.new('RGBA', size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Top brand
    font = get_sans_font(28, bold=True)
    draw.text((size[0]//2, 80), "VERALABS", font=font, fill=(*COLORS['off_white'], 230), anchor='mm')

    # Thin line
    draw.line([(size[0]//2 - 60, 110), (size[0]//2 + 60, 110)],
              fill=(*COLORS['gold_accent'], 180), width=1)

    # Bottom tag
    small_font = get_sans_font(14)
    draw.text((size[0]//2, size[1] - 70), "MINIMALISM",
              font=small_font, fill=(*COLORS['cool_gray'], 200), anchor='mm')

    return np.array(img)

def create_number_overlay(number, size):
    """Create large number overlay for editorial style"""
    img = Image.new('RGBA', size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    font = get_font(200, bold=True)
    text = f"{number:02d}"

    draw.text((80, 150), text, font=font, fill=(*COLORS['off_white'], 60))

    return np.array(img)

def create_word_overlay(word, size):
    """Create dramatic word overlay"""
    img = Image.new('RGBA', size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    font = get_font(90, bold=True)
    bbox = draw.textbbox((0, 0), word, font=font)
    text_width = bbox[2] - bbox[0]
    x = (size[0] - text_width) // 2
    y = size[1] // 2 - 50

    # Shadow
    draw.text((x + 4, y + 4), word, font=font, fill=(0, 0, 0, 100))
    draw.text((x, y), word, font=font, fill=(*COLORS['off_white'], 255))

    # Underline
    draw.line([(x, y + 100), (x + text_width, y + 100)],
              fill=(*COLORS['gold_accent'], 200), width=2)

    return np.array(img)

def create_gradient_overlay(size, direction='bottom', opacity=0.5, color=None):
    """Create gradient overlay"""
    if color is None:
        color = COLORS['deep_black']

    img = Image.new('RGBA', size, (0, 0, 0, 0))

    for y in range(size[1]):
        if direction == 'bottom':
            alpha = int(255 * opacity * (y / size[1]) ** 1.4)
        elif direction == 'top':
            alpha = int(255 * opacity * ((size[1] - y) / size[1]) ** 1.4)
        else:
            alpha = int(255 * opacity * 0.5)

        for x in range(size[0]):
            img.putpixel((x, y), (*color, min(alpha, 255)))

    return np.array(img)

def create_vignette_overlay(size, strength=0.4):
    """Create vignette overlay"""
    img = Image.new('RGBA', size, (0, 0, 0, 0))

    cx, cy = size[0] // 2, size[1] // 2
    max_dist = (cx ** 2 + cy ** 2) ** 0.5

    pixels = img.load()
    for y in range(size[1]):
        for x in range(size[0]):
            dist = ((x - cx) ** 2 + (y - cy) ** 2) ** 0.5
            alpha = int(255 * strength * (dist / max_dist) ** 1.8)
            pixels[x, y] = (*COLORS['deep_black'], min(alpha, 200))

    return np.array(img)

def make_ken_burns_clip(img_path, duration, zoom_start=1.0, zoom_end=1.08, pan_start=(0, 0), pan_end=(0, 0), grade='warm'):
    """Create Ken Burns effect clip with grading"""
    def make_frame(t):
        progress = t / duration
        current_zoom = zoom_start + (zoom_end - zoom_start) * progress
        current_pan = (
            pan_start[0] + (pan_end[0] - pan_start[0]) * progress,
            pan_start[1] + (pan_end[1] - pan_start[1]) * progress
        )
        frame = load_and_prepare_image(img_path, REEL_SIZE, current_zoom, current_pan)
        return apply_grade(frame, grade)

    return VideoClip(make_frame, duration=duration)

def create_reel_essence(photos, reel_num):
    """Reel: ESSENCE - Clean minimalist showcase"""
    print(f"\n=== Creating Reel {reel_num}: ESSENCE ===")

    clips = []

    # Opening (0-6s)
    opening_bg = ColorClip(size=REEL_SIZE, color=COLORS['off_white']).with_duration(6)
    title = create_text_overlay("ESSENCE", REEL_SIZE, 80, COLORS['charcoal'], "MINIMALISM COLLECTION")
    title_clip = ImageClip(title).with_duration(4).with_start(1)
    title_clip = title_clip.with_effects([vfx.CrossFadeIn(0.8), vfx.CrossFadeOut(0.5)])
    clips.append(CompositeVideoClip([opening_bg, title_clip]))

    # Photo sequence (6-54s) - 12 photos at 4s each
    for i, photo in enumerate(photos[:12]):
        print(f"  Processing photo {i+1}/12...")
        duration = 4

        photo_clip = make_ken_burns_clip(photo, duration, 1.0, 1.06,
                                          (0, -20 if i % 2 == 0 else 20),
                                          (0, 20 if i % 2 == 0 else -20), 'warm')

        gradient = create_gradient_overlay(REEL_SIZE, 'bottom', 0.4)
        gradient_clip = ImageClip(gradient).with_duration(duration)

        brand = create_brand_overlay(REEL_SIZE)
        brand_clip = ImageClip(brand).with_duration(duration)

        scene = CompositeVideoClip([photo_clip, gradient_clip, brand_clip])
        scene = scene.with_effects([vfx.CrossFadeIn(0.15), vfx.CrossFadeOut(0.15)])
        clips.append(scene)

    # Closing (54-60s)
    closing_bg = ColorClip(size=REEL_SIZE, color=COLORS['charcoal']).with_duration(6)
    closing = create_text_overlay("VERALABS", REEL_SIZE, 72, COLORS['off_white'], "Link in Bio")
    closing_clip = ImageClip(closing).with_duration(4).with_start(1)
    closing_clip = closing_clip.with_effects([vfx.CrossFadeIn(0.5)])
    clips.append(CompositeVideoClip([closing_bg, closing_clip]))

    final = concatenate_videoclips(clips, method="compose")
    final = final.subclipped(0, min(60, final.duration))

    output_path = OUTPUT_DIR / f'reel-{reel_num:02d}-minimalism-essence.mp4'
    print(f"  Exporting to {output_path}...")
    final.write_videofile(str(output_path), fps=FPS, codec='libx264', audio=False,
                          preset='medium', threads=4, ffmpeg_params=['-pix_fmt', 'yuv420p'])
    return output_path

def create_reel_silence(photos, reel_num):
    """Reel: SILENCE - Moody noir aesthetic"""
    print(f"\n=== Creating Reel {reel_num}: SILENCE ===")

    clips = []

    # Opening
    opening_bg = ColorClip(size=REEL_SIZE, color=COLORS['true_black']).with_duration(5)
    title = create_text_overlay("SILENCE", REEL_SIZE, 90, COLORS['off_white'], "A VISUAL MEDITATION")
    title_clip = ImageClip(title).with_duration(3.5).with_start(0.75)
    title_clip = title_clip.with_effects([vfx.CrossFadeIn(0.6), vfx.CrossFadeOut(0.4)])
    clips.append(CompositeVideoClip([opening_bg, title_clip]))

    # Slow, dramatic photos
    for i, photo in enumerate(photos[:10]):
        print(f"  Processing photo {i+1}/10...")
        duration = 5

        photo_clip = make_ken_burns_clip(photo, duration, 1.02, 1.12,
                                          (-15, -25), (15, 25), 'noir')

        vignette = create_vignette_overlay(REEL_SIZE, 0.5)
        vignette_clip = ImageClip(vignette).with_duration(duration)

        brand = create_brand_overlay(REEL_SIZE)
        brand_clip = ImageClip(brand).with_duration(duration)

        scene = CompositeVideoClip([photo_clip, vignette_clip, brand_clip])
        scene = scene.with_effects([vfx.CrossFadeIn(0.3), vfx.CrossFadeOut(0.3)])
        clips.append(scene)

    # Closing
    closing_bg = ColorClip(size=REEL_SIZE, color=COLORS['true_black']).with_duration(5)
    closing = create_text_overlay("VERALABS", REEL_SIZE, 72, COLORS['off_white'])
    closing_clip = ImageClip(closing).with_duration(3.5).with_start(0.75)
    closing_clip = closing_clip.with_effects([vfx.CrossFadeIn(0.5)])
    clips.append(CompositeVideoClip([closing_bg, closing_clip]))

    final = concatenate_videoclips(clips, method="compose")
    final = final.subclipped(0, min(60, final.duration))

    output_path = OUTPUT_DIR / f'reel-{reel_num:02d}-minimalism-silence.mp4'
    print(f"  Exporting to {output_path}...")
    final.write_videofile(str(output_path), fps=FPS, codec='libx264', audio=False,
                          preset='medium', threads=4, ffmpeg_params=['-pix_fmt', 'yuv420p'])
    return output_path

def create_reel_golden(photos, reel_num):
    """Reel: GOLDEN - Warm golden hour aesthetic"""
    print(f"\n=== Creating Reel {reel_num}: GOLDEN ===")

    clips = []

    opening_bg = ColorClip(size=REEL_SIZE, color=COLORS['warm_nude']).with_duration(5)
    title = create_text_overlay("GOLDEN", REEL_SIZE, 85, COLORS['charcoal'], "HOUR")
    title_clip = ImageClip(title).with_duration(3.5).with_start(0.75)
    title_clip = title_clip.with_effects([vfx.CrossFadeIn(0.6), vfx.CrossFadeOut(0.4)])
    clips.append(CompositeVideoClip([opening_bg, title_clip]))

    for i, photo in enumerate(photos[:11]):
        print(f"  Processing photo {i+1}/11...")
        duration = 4.5

        photo_clip = make_ken_burns_clip(photo, duration, 1.0, 1.08,
                                          (20 if i % 2 == 0 else -20, 0),
                                          (-20 if i % 2 == 0 else 20, 0), 'golden')

        gradient = create_gradient_overlay(REEL_SIZE, 'bottom', 0.35, COLORS['espresso'])
        gradient_clip = ImageClip(gradient).with_duration(duration)

        brand = create_brand_overlay(REEL_SIZE)
        brand_clip = ImageClip(brand).with_duration(duration)

        scene = CompositeVideoClip([photo_clip, gradient_clip, brand_clip])
        scene = scene.with_effects([vfx.CrossFadeIn(0.2), vfx.CrossFadeOut(0.2)])
        clips.append(scene)

    closing_bg = ColorClip(size=REEL_SIZE, color=COLORS['espresso']).with_duration(5.5)
    closing = create_text_overlay("VERALABS", REEL_SIZE, 72, COLORS['golden_hour'])
    closing_clip = ImageClip(closing).with_duration(4).with_start(0.75)
    closing_clip = closing_clip.with_effects([vfx.CrossFadeIn(0.5)])
    clips.append(CompositeVideoClip([closing_bg, closing_clip]))

    final = concatenate_videoclips(clips, method="compose")
    final = final.subclipped(0, min(60, final.duration))

    output_path = OUTPUT_DIR / f'reel-{reel_num:02d}-minimalism-golden.mp4'
    print(f"  Exporting to {output_path}...")
    final.write_videofile(str(output_path), fps=FPS, codec='libx264', audio=False,
                          preset='medium', threads=4, ffmpeg_params=['-pix_fmt', 'yuv420p'])
    return output_path

def create_reel_editorial(photos, reel_num):
    """Reel: EDITORIAL - Magazine-style numbered sequence"""
    print(f"\n=== Creating Reel {reel_num}: EDITORIAL ===")

    clips = []

    opening_bg = ColorClip(size=REEL_SIZE, color=COLORS['off_white']).with_duration(5)
    title = create_text_overlay("EDITORIAL", REEL_SIZE, 70, COLORS['charcoal'], "LOOKS 01-10")
    title_clip = ImageClip(title).with_duration(3.5).with_start(0.75)
    title_clip = title_clip.with_effects([vfx.CrossFadeIn(0.6), vfx.CrossFadeOut(0.4)])
    clips.append(CompositeVideoClip([opening_bg, title_clip]))

    for i, photo in enumerate(photos[:10]):
        print(f"  Processing look {i+1}/10...")
        duration = 5

        photo_clip = make_ken_burns_clip(photo, duration, 1.0, 1.06, (0, -15), (0, 15), 'warm')

        gradient = create_gradient_overlay(REEL_SIZE, 'top', 0.3)
        gradient_clip = ImageClip(gradient).with_duration(duration)

        number = create_number_overlay(i + 1, REEL_SIZE)
        number_clip = ImageClip(number).with_duration(duration)

        brand = create_brand_overlay(REEL_SIZE)
        brand_clip = ImageClip(brand).with_duration(duration)

        scene = CompositeVideoClip([photo_clip, gradient_clip, number_clip, brand_clip])
        scene = scene.with_effects([vfx.CrossFadeIn(0.2), vfx.CrossFadeOut(0.2)])
        clips.append(scene)

    closing_bg = ColorClip(size=REEL_SIZE, color=COLORS['charcoal']).with_duration(5)
    closing = create_text_overlay("VERALABS", REEL_SIZE, 72, COLORS['off_white'])
    closing_clip = ImageClip(closing).with_duration(3.5).with_start(0.75)
    closing_clip = closing_clip.with_effects([vfx.CrossFadeIn(0.5)])
    clips.append(CompositeVideoClip([closing_bg, closing_clip]))

    final = concatenate_videoclips(clips, method="compose")
    final = final.subclipped(0, min(60, final.duration))

    output_path = OUTPUT_DIR / f'reel-{reel_num:02d}-minimalism-editorial.mp4'
    print(f"  Exporting to {output_path}...")
    final.write_videofile(str(output_path), fps=FPS, codec='libx264', audio=False,
                          preset='medium', threads=4, ffmpeg_params=['-pix_fmt', 'yuv420p'])
    return output_path

def create_reel_words(photos, reel_num):
    """Reel: WORDS - Typography-focused mood words"""
    print(f"\n=== Creating Reel {reel_num}: WORDS ===")

    words = ["FORM", "LIGHT", "SHADOW", "SPACE", "CALM", "PURE", "BREATH", "STILL"]

    clips = []

    opening_bg = ColorClip(size=REEL_SIZE, color=COLORS['midnight']).with_duration(4)
    title = create_text_overlay("WORDS", REEL_SIZE, 90, COLORS['off_white'])
    title_clip = ImageClip(title).with_duration(2.5).with_start(0.75)
    title_clip = title_clip.with_effects([vfx.CrossFadeIn(0.5), vfx.CrossFadeOut(0.4)])
    clips.append(CompositeVideoClip([opening_bg, title_clip]))

    for i, (photo, word) in enumerate(zip(photos[:8], words)):
        print(f"  Processing word {i+1}/8: {word}...")
        duration = 6.5

        photo_clip = make_ken_burns_clip(photo, duration, 1.0, 1.1, (0, -30), (0, 30), 'noir')

        dark_overlay = create_gradient_overlay(REEL_SIZE, 'full', 0.45, COLORS['midnight'])
        dark_clip = ImageClip(dark_overlay).with_duration(duration)

        vignette = create_vignette_overlay(REEL_SIZE, 0.35)
        vignette_clip = ImageClip(vignette).with_duration(duration)

        word_img = create_word_overlay(word, REEL_SIZE)
        word_clip = ImageClip(word_img).with_duration(duration - 1).with_start(0.5)
        word_clip = word_clip.with_effects([vfx.CrossFadeIn(0.4), vfx.CrossFadeOut(0.4)])

        brand = create_brand_overlay(REEL_SIZE)
        brand_clip = ImageClip(brand).with_duration(duration)

        scene = CompositeVideoClip([photo_clip, dark_clip, vignette_clip, word_clip, brand_clip])
        scene = scene.with_effects([vfx.CrossFadeIn(0.25), vfx.CrossFadeOut(0.25)])
        clips.append(scene)

    closing_bg = ColorClip(size=REEL_SIZE, color=COLORS['midnight']).with_duration(4)
    closing = create_text_overlay("VERALABS", REEL_SIZE, 72, COLORS['off_white'])
    closing_clip = ImageClip(closing).with_duration(2.5).with_start(0.75)
    closing_clip = closing_clip.with_effects([vfx.CrossFadeIn(0.5)])
    clips.append(CompositeVideoClip([closing_bg, closing_clip]))

    final = concatenate_videoclips(clips, method="compose")
    final = final.subclipped(0, min(60, final.duration))

    output_path = OUTPUT_DIR / f'reel-{reel_num:02d}-minimalism-words.mp4'
    print(f"  Exporting to {output_path}...")
    final.write_videofile(str(output_path), fps=FPS, codec='libx264', audio=False,
                          preset='medium', threads=4, ffmpeg_params=['-pix_fmt', 'yuv420p'])
    return output_path

def create_reel_flow(photos, reel_num):
    """Reel: FLOW - Smooth continuous movement"""
    print(f"\n=== Creating Reel {reel_num}: FLOW ===")

    clips = []

    opening_bg = ColorClip(size=REEL_SIZE, color=COLORS['cool_gray']).with_duration(4)
    title = create_text_overlay("FLOW", REEL_SIZE, 100, COLORS['charcoal'])
    title_clip = ImageClip(title).with_duration(2.5).with_start(0.75)
    title_clip = title_clip.with_effects([vfx.CrossFadeIn(0.5), vfx.CrossFadeOut(0.4)])
    clips.append(CompositeVideoClip([opening_bg, title_clip]))

    # Faster paced, more photos
    for i, photo in enumerate(photos[:14]):
        print(f"  Processing photo {i+1}/14...")
        duration = 3.7

        # Alternating movement directions for flow
        if i % 4 == 0:
            photo_clip = make_ken_burns_clip(photo, duration, 1.0, 1.08, (-30, 0), (30, 0), 'cool')
        elif i % 4 == 1:
            photo_clip = make_ken_burns_clip(photo, duration, 1.08, 1.0, (0, -30), (0, 30), 'warm')
        elif i % 4 == 2:
            photo_clip = make_ken_burns_clip(photo, duration, 1.0, 1.08, (30, 0), (-30, 0), 'cool')
        else:
            photo_clip = make_ken_burns_clip(photo, duration, 1.08, 1.0, (0, 30), (0, -30), 'warm')

        gradient = create_gradient_overlay(REEL_SIZE, 'bottom', 0.3)
        gradient_clip = ImageClip(gradient).with_duration(duration)

        brand = create_brand_overlay(REEL_SIZE)
        brand_clip = ImageClip(brand).with_duration(duration)

        scene = CompositeVideoClip([photo_clip, gradient_clip, brand_clip])
        scene = scene.with_effects([vfx.CrossFadeIn(0.1), vfx.CrossFadeOut(0.1)])
        clips.append(scene)

    closing_bg = ColorClip(size=REEL_SIZE, color=COLORS['charcoal']).with_duration(4.2)
    closing = create_text_overlay("VERALABS", REEL_SIZE, 72, COLORS['off_white'])
    closing_clip = ImageClip(closing).with_duration(2.7).with_start(0.75)
    closing_clip = closing_clip.with_effects([vfx.CrossFadeIn(0.5)])
    clips.append(CompositeVideoClip([closing_bg, closing_clip]))

    final = concatenate_videoclips(clips, method="compose")
    final = final.subclipped(0, min(60, final.duration))

    output_path = OUTPUT_DIR / f'reel-{reel_num:02d}-minimalism-flow.mp4'
    print(f"  Exporting to {output_path}...")
    final.write_videofile(str(output_path), fps=FPS, codec='libx264', audio=False,
                          preset='medium', threads=4, ffmpeg_params=['-pix_fmt', 'yuv420p'])
    return output_path

def create_reel_contrast(photos, reel_num):
    """Reel: CONTRAST - High contrast black and white feel"""
    print(f"\n=== Creating Reel {reel_num}: CONTRAST ===")

    clips = []

    opening_bg = ColorClip(size=REEL_SIZE, color=COLORS['true_black']).with_duration(5)
    title = create_text_overlay("CONTRAST", REEL_SIZE, 75, COLORS['pure_white'], "LIGHT & SHADOW")
    title_clip = ImageClip(title).with_duration(3.5).with_start(0.75)
    title_clip = title_clip.with_effects([vfx.CrossFadeIn(0.6), vfx.CrossFadeOut(0.4)])
    clips.append(CompositeVideoClip([opening_bg, title_clip]))

    for i, photo in enumerate(photos[:11]):
        print(f"  Processing photo {i+1}/11...")
        duration = 4.5

        photo_clip = make_ken_burns_clip(photo, duration, 1.02, 1.1, (-20, -20), (20, 20), 'noir')

        vignette = create_vignette_overlay(REEL_SIZE, 0.45)
        vignette_clip = ImageClip(vignette).with_duration(duration)

        brand = create_brand_overlay(REEL_SIZE)
        brand_clip = ImageClip(brand).with_duration(duration)

        scene = CompositeVideoClip([photo_clip, vignette_clip, brand_clip])
        scene = scene.with_effects([vfx.CrossFadeIn(0.2), vfx.CrossFadeOut(0.2)])
        clips.append(scene)

    closing_bg = ColorClip(size=REEL_SIZE, color=COLORS['true_black']).with_duration(5.5)
    closing = create_text_overlay("VERALABS", REEL_SIZE, 72, COLORS['pure_white'])
    closing_clip = ImageClip(closing).with_duration(4).with_start(0.75)
    closing_clip = closing_clip.with_effects([vfx.CrossFadeIn(0.5)])
    clips.append(CompositeVideoClip([closing_bg, closing_clip]))

    final = concatenate_videoclips(clips, method="compose")
    final = final.subclipped(0, min(60, final.duration))

    output_path = OUTPUT_DIR / f'reel-{reel_num:02d}-minimalism-contrast.mp4'
    print(f"  Exporting to {output_path}...")
    final.write_videofile(str(output_path), fps=FPS, codec='libx264', audio=False,
                          preset='medium', threads=4, ffmpeg_params=['-pix_fmt', 'yuv420p'])
    return output_path

def create_reel_space(photos, reel_num):
    """Reel: SPACE - Negative space focus"""
    print(f"\n=== Creating Reel {reel_num}: SPACE ===")

    clips = []

    opening_bg = ColorClip(size=REEL_SIZE, color=COLORS['warm_white']).with_duration(5)
    title = create_text_overlay("SPACE", REEL_SIZE, 100, COLORS['charcoal'], "BREATHING ROOM")
    title_clip = ImageClip(title).with_duration(3.5).with_start(0.75)
    title_clip = title_clip.with_effects([vfx.CrossFadeIn(0.6), vfx.CrossFadeOut(0.4)])
    clips.append(CompositeVideoClip([opening_bg, title_clip]))

    for i, photo in enumerate(photos[:10]):
        print(f"  Processing photo {i+1}/10...")
        duration = 5

        # Very slow, meditative movement
        photo_clip = make_ken_burns_clip(photo, duration, 1.0, 1.04, (0, -10), (0, 10), 'warm')

        gradient = create_gradient_overlay(REEL_SIZE, 'bottom', 0.25, COLORS['warm_nude'])
        gradient_clip = ImageClip(gradient).with_duration(duration)

        brand = create_brand_overlay(REEL_SIZE)
        brand_clip = ImageClip(brand).with_duration(duration)

        scene = CompositeVideoClip([photo_clip, gradient_clip, brand_clip])
        scene = scene.with_effects([vfx.CrossFadeIn(0.3), vfx.CrossFadeOut(0.3)])
        clips.append(scene)

    closing_bg = ColorClip(size=REEL_SIZE, color=COLORS['charcoal']).with_duration(5)
    closing = create_text_overlay("VERALABS", REEL_SIZE, 72, COLORS['off_white'])
    closing_clip = ImageClip(closing).with_duration(3.5).with_start(0.75)
    closing_clip = closing_clip.with_effects([vfx.CrossFadeIn(0.5)])
    clips.append(CompositeVideoClip([closing_bg, closing_clip]))

    final = concatenate_videoclips(clips, method="compose")
    final = final.subclipped(0, min(60, final.duration))

    output_path = OUTPUT_DIR / f'reel-{reel_num:02d}-minimalism-space.mp4'
    print(f"  Exporting to {output_path}...")
    final.write_videofile(str(output_path), fps=FPS, codec='libx264', audio=False,
                          preset='medium', threads=4, ffmpeg_params=['-pix_fmt', 'yuv420p'])
    return output_path

def create_reel_form(photos, reel_num):
    """Reel: FORM - Focus on shape and composition"""
    print(f"\n=== Creating Reel {reel_num}: FORM ===")

    clips = []

    opening_bg = ColorClip(size=REEL_SIZE, color=COLORS['silver']).with_duration(4)
    title = create_text_overlay("FORM", REEL_SIZE, 110, COLORS['charcoal'])
    title_clip = ImageClip(title).with_duration(2.5).with_start(0.75)
    title_clip = title_clip.with_effects([vfx.CrossFadeIn(0.5), vfx.CrossFadeOut(0.4)])
    clips.append(CompositeVideoClip([opening_bg, title_clip]))

    for i, photo in enumerate(photos[:12]):
        print(f"  Processing photo {i+1}/12...")
        duration = 4.3

        photo_clip = make_ken_burns_clip(photo, duration, 1.02, 1.08,
                                          (15 if i % 2 == 0 else -15, 10),
                                          (-15 if i % 2 == 0 else 15, -10), 'cool')

        gradient = create_gradient_overlay(REEL_SIZE, 'bottom', 0.35)
        gradient_clip = ImageClip(gradient).with_duration(duration)

        brand = create_brand_overlay(REEL_SIZE)
        brand_clip = ImageClip(brand).with_duration(duration)

        scene = CompositeVideoClip([photo_clip, gradient_clip, brand_clip])
        scene = scene.with_effects([vfx.CrossFadeIn(0.15), vfx.CrossFadeOut(0.15)])
        clips.append(scene)

    closing_bg = ColorClip(size=REEL_SIZE, color=COLORS['charcoal']).with_duration(4.4)
    closing = create_text_overlay("VERALABS", REEL_SIZE, 72, COLORS['off_white'])
    closing_clip = ImageClip(closing).with_duration(2.9).with_start(0.75)
    closing_clip = closing_clip.with_effects([vfx.CrossFadeIn(0.5)])
    clips.append(CompositeVideoClip([closing_bg, closing_clip]))

    final = concatenate_videoclips(clips, method="compose")
    final = final.subclipped(0, min(60, final.duration))

    output_path = OUTPUT_DIR / f'reel-{reel_num:02d}-minimalism-form.mp4'
    print(f"  Exporting to {output_path}...")
    final.write_videofile(str(output_path), fps=FPS, codec='libx264', audio=False,
                          preset='medium', threads=4, ffmpeg_params=['-pix_fmt', 'yuv420p'])
    return output_path

def create_reel_collection(photos, reel_num):
    """Reel: COLLECTION - Full collection showcase"""
    print(f"\n=== Creating Reel {reel_num}: COLLECTION ===")

    clips = []

    opening_bg = ColorClip(size=REEL_SIZE, color=COLORS['off_white']).with_duration(5)
    title = create_text_overlay("THE COLLECTION", REEL_SIZE, 60, COLORS['charcoal'], "MINIMALISM")
    title_clip = ImageClip(title).with_duration(3.5).with_start(0.75)
    title_clip = title_clip.with_effects([vfx.CrossFadeIn(0.6), vfx.CrossFadeOut(0.4)])
    clips.append(CompositeVideoClip([opening_bg, title_clip]))

    # Use all available photos, faster pace
    num_photos = min(len(photos), 16)
    duration_per_photo = (60 - 10) / num_photos  # 10s for opening and closing

    for i, photo in enumerate(photos[:num_photos]):
        print(f"  Processing photo {i+1}/{num_photos}...")
        duration = duration_per_photo

        grades = ['warm', 'cool', 'golden', 'noir']
        grade = grades[i % len(grades)]

        photo_clip = make_ken_burns_clip(photo, duration, 1.0, 1.06,
                                          (0, -15 if i % 2 == 0 else 15),
                                          (0, 15 if i % 2 == 0 else -15), grade)

        gradient = create_gradient_overlay(REEL_SIZE, 'bottom', 0.3)
        gradient_clip = ImageClip(gradient).with_duration(duration)

        brand = create_brand_overlay(REEL_SIZE)
        brand_clip = ImageClip(brand).with_duration(duration)

        scene = CompositeVideoClip([photo_clip, gradient_clip, brand_clip])
        scene = scene.with_effects([vfx.CrossFadeIn(0.1), vfx.CrossFadeOut(0.1)])
        clips.append(scene)

    closing_bg = ColorClip(size=REEL_SIZE, color=COLORS['charcoal']).with_duration(5)
    closing = create_text_overlay("VERALABS", REEL_SIZE, 72, COLORS['off_white'], "Shop Now")
    closing_clip = ImageClip(closing).with_duration(3.5).with_start(0.75)
    closing_clip = closing_clip.with_effects([vfx.CrossFadeIn(0.5)])
    clips.append(CompositeVideoClip([closing_bg, closing_clip]))

    final = concatenate_videoclips(clips, method="compose")
    final = final.subclipped(0, min(60, final.duration))

    output_path = OUTPUT_DIR / f'reel-{reel_num:02d}-minimalism-collection.mp4'
    print(f"  Exporting to {output_path}...")
    final.write_videofile(str(output_path), fps=FPS, codec='libx264', audio=False,
                          preset='medium', threads=4, ffmpeg_params=['-pix_fmt', 'yuv420p'])
    return output_path

def main():
    print("=" * 60)
    print("VERALABS Minimalism Reels Generator")
    print("Creating 10 x 60-second Minimalism Reels")
    print("=" * 60)

    photos = get_minimalism_photos()
    print(f"\nFound {len(photos)} minimalism source photos")

    if len(photos) < 10:
        print(f"Warning: Only {len(photos)} photos available")
        return

    # Create all 10 reels, each with different photo selections
    reel_creators = [
        (create_reel_essence, 11),
        (create_reel_silence, 12),
        (create_reel_golden, 13),
        (create_reel_editorial, 14),
        (create_reel_words, 15),
        (create_reel_flow, 16),
        (create_reel_contrast, 17),
        (create_reel_space, 18),
        (create_reel_form, 19),
        (create_reel_collection, 20),
    ]

    results = []
    for creator, reel_num in reel_creators:
        # Rotate photos for variety
        offset = (reel_num - 11) * 2
        rotated_photos = photos[offset:] + photos[:offset]
        result = creator(rotated_photos, reel_num)
        results.append(result)

    print("\n" + "=" * 60)
    print("ALL MINIMALISM REELS COMPLETE!")
    print("=" * 60)
    for r in results:
        print(f"  {r}")
    print("\nFormat: 1080x1920 (9:16) | 60 seconds | 30 FPS")
    print("=" * 60)

if __name__ == '__main__':
    main()
