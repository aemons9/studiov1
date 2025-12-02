#!/usr/bin/env python3
"""
VeraLabs Instagram Reels Generator
Creates stunning 60-second video reels for Instagram
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

# Brand Colors (RGB)
COLORS = {
    'cream_white': (250, 248, 245),
    'ivory': (247, 243, 237),
    'champagne': (232, 223, 211),
    'deep_espresso': (28, 25, 23),
    'rose_gold': (232, 180, 184),
    'pale_gold': (212, 175, 55),
    'warm_taupe': (184, 162, 142),
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
                       subtitle=None, subtitle_color=COLORS['pale_gold']):
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

def create_brand_overlay(size):
    """Create brand overlay with logo"""
    img = Image.new('RGBA', size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Top brand
    font = get_font(36)
    draw.text((size[0]//2, 80), "VERALABS", font=font, fill=(*COLORS['cream_white'], 255), anchor='mm')

    # Decorative line
    draw.line([(size[0]//2 - 80, 120), (size[0]//2 + 80, 120)], fill=(*COLORS['pale_gold'], 255), width=2)

    # Bottom tagline
    small_font = get_font(18)
    draw.text((size[0]//2, size[1] - 80), "HAUTE COUTURE • AI ARTISTRY", font=small_font,
              fill=(*COLORS['warm_taupe'], 200), anchor='mm')

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

def create_gradient_overlay(size, direction='bottom', opacity=0.6):
    """Create gradient overlay"""
    img = Image.new('RGBA', size, (0, 0, 0, 0))

    for y in range(size[1]):
        if direction == 'bottom':
            alpha = int(255 * opacity * (y / size[1]) ** 1.5)
        elif direction == 'top':
            alpha = int(255 * opacity * ((size[1] - y) / size[1]) ** 1.5)
        else:
            alpha = int(255 * opacity * 0.3)

        for x in range(size[0]):
            img.putpixel((x, y), (0, 0, 0, min(alpha, 255)))

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

def create_reel_1_brand_story():
    """Create Reel 1: Brand Story - Introduction to VeraLabs"""
    print("\n=== Creating Reel 1: Brand Story ===")

    clips = []

    # Get photos
    couture_photos = sorted([p for p in PHOTO_DIR.glob('couture-*.jpg') if 'insta' not in p.name])[:8]

    # Scene 1: Opening (0-8s) - Dark screen with logo reveal
    print("  Creating opening scene...")
    opening_bg = ColorClip(size=REEL_SIZE, color=COLORS['deep_espresso']).with_duration(8)

    # Logo text
    logo_text = create_text_image("VERALABS", REEL_SIZE, font_size=72,
                                   subtitle="Where Haute Couture Meets Digital Artistry")
    logo_clip = ImageClip(logo_text).with_duration(6).with_start(1).with_position('center')
    logo_clip = logo_clip.with_effects([vfx.CrossFadeIn(1), vfx.CrossFadeOut(1)])

    scene1 = CompositeVideoClip([opening_bg, logo_clip])
    clips.append(scene1)

    # Scene 2-5: Photo reveals with quotes (8-40s)
    quotes = [
        ("THE ART OF", "ELEGANCE"),
        ("CRAFTED WITH", "VISION"),
        ("TIMELESS", "BEAUTY"),
        ("DIGITAL", "ARTISTRY"),
    ]

    for i, (photo, (line1, line2)) in enumerate(zip(couture_photos[:4], quotes)):
        print(f"  Creating photo scene {i+1}...")
        duration = 8

        # Ken Burns photo
        photo_clip = make_ken_burns_clip(
            photo, duration,
            zoom_start=1.0, zoom_end=1.15,
            pan_start=(0, -50), pan_end=(0, 50)
        )

        # Gradient overlay
        gradient = create_gradient_overlay(REEL_SIZE, 'bottom', 0.6)
        gradient_clip = ImageClip(gradient).with_duration(duration)

        # Text overlay
        text_img = create_text_image(line1, REEL_SIZE, font_size=48, subtitle=line2)
        text_clip = ImageClip(text_img).with_duration(duration - 2).with_start(1)
        text_clip = text_clip.with_effects([vfx.CrossFadeIn(0.5), vfx.CrossFadeOut(0.5)])

        # Brand overlay
        brand = create_brand_overlay(REEL_SIZE)
        brand_clip = ImageClip(brand).with_duration(duration)

        scene = CompositeVideoClip([photo_clip, gradient_clip, text_clip, brand_clip])
        scene = scene.with_effects([vfx.CrossFadeIn(0.5), vfx.CrossFadeOut(0.5)])
        clips.append(scene)

    # Scene 6: Closing (40-48s)
    print("  Creating closing scene...")
    if len(couture_photos) > 4:
        closing_photo = make_ken_burns_clip(couture_photos[4], 8, zoom_start=1.1, zoom_end=1.0)
    else:
        closing_photo = ColorClip(size=REEL_SIZE, color=COLORS['deep_espresso']).with_duration(8)

    gradient = create_gradient_overlay(REEL_SIZE, 'bottom', 0.7)
    gradient_clip = ImageClip(gradient).with_duration(8)

    closing_text = create_text_image("EXPLORE THE", REEL_SIZE, font_size=48,
                                      subtitle="COLLECTION")
    closing_clip = ImageClip(closing_text).with_duration(6).with_start(1)
    closing_clip = closing_clip.with_effects([vfx.CrossFadeIn(0.5)])

    brand = create_brand_overlay(REEL_SIZE)
    brand_clip = ImageClip(brand).with_duration(8)

    scene6 = CompositeVideoClip([closing_photo, gradient_clip, closing_clip, brand_clip])
    clips.append(scene6)

    # Scene 7: Final branding (48-60s)
    print("  Creating final branding...")
    final_bg = ColorClip(size=REEL_SIZE, color=COLORS['deep_espresso']).with_duration(12)

    final_text = create_text_image("VERALABS", REEL_SIZE, font_size=80,
                                    subtitle="@veralabs • Link in Bio")
    final_clip = ImageClip(final_text).with_duration(10).with_start(1)
    final_clip = final_clip.with_effects([vfx.CrossFadeIn(1), vfx.CrossFadeOut(1)])

    scene7 = CompositeVideoClip([final_bg, final_clip])
    clips.append(scene7)

    # Concatenate all scenes
    print("  Concatenating scenes...")
    final_video = concatenate_videoclips(clips, method="compose")

    # Trim to exactly 60 seconds
    final_video = final_video.subclipped(0, min(60, final_video.duration))

    # Export
    output_path = OUTPUT_DIR / 'reel-01-brand-story.mp4'
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
    print(f"  ✓ Reel 1 complete: {output_path}")
    return output_path

def create_reel_2_collection():
    """Create Reel 2: Collection Showcase"""
    print("\n=== Creating Reel 2: Collection Showcase ===")

    clips = []

    # Get photos
    couture_photos = sorted([p for p in PHOTO_DIR.glob('couture-*.jpg') if 'insta' not in p.name])[8:20]

    # Opening (0-4s)
    print("  Creating opening...")
    opening_bg = ColorClip(size=REEL_SIZE, color=COLORS['deep_espresso']).with_duration(4)
    opening_text = create_text_image("THE COLLECTION", REEL_SIZE, font_size=56,
                                      subtitle="2025 COUTURE")
    opening_clip = ImageClip(opening_text).with_duration(3).with_start(0.5)
    opening_clip = opening_clip.with_effects([vfx.CrossFadeIn(0.5), vfx.CrossFadeOut(0.5)])

    scene_open = CompositeVideoClip([opening_bg, opening_clip])
    clips.append(scene_open)

    # Photo montage (4-52s) - 12 photos, ~4s each
    look_names = ["LOOK I", "LOOK II", "LOOK III", "LOOK IV", "LOOK V", "LOOK VI",
                  "LOOK VII", "LOOK VIII", "LOOK IX", "LOOK X", "LOOK XI", "LOOK XII"]

    for i, photo in enumerate(couture_photos[:12]):
        print(f"  Creating look {i+1}...")
        duration = 4

        # Alternate zoom directions
        if i % 2 == 0:
            photo_clip = make_ken_burns_clip(photo, duration, 1.0, 1.12, (0, -30), (0, 30))
        else:
            photo_clip = make_ken_burns_clip(photo, duration, 1.12, 1.0, (0, 30), (0, -30))

        # Gradient
        gradient = create_gradient_overlay(REEL_SIZE, 'bottom', 0.5)
        gradient_clip = ImageClip(gradient).with_duration(duration)

        # Look number
        look_text = create_text_image(look_names[i], REEL_SIZE, font_size=36)
        look_clip = ImageClip(look_text).with_duration(duration - 1).with_start(0.5)
        look_clip = look_clip.with_effects([vfx.CrossFadeIn(0.3), vfx.CrossFadeOut(0.3)])

        scene = CompositeVideoClip([photo_clip, gradient_clip, look_clip])
        scene = scene.with_effects([vfx.CrossFadeIn(0.3), vfx.CrossFadeOut(0.3)])
        clips.append(scene)

    # Closing (52-60s)
    print("  Creating closing...")
    closing_bg = ColorClip(size=REEL_SIZE, color=COLORS['deep_espresso']).with_duration(8)
    closing_text = create_text_image("VERALABS", REEL_SIZE, font_size=72,
                                      subtitle="Discover More")
    closing_clip = ImageClip(closing_text).with_duration(6).with_start(1)
    closing_clip = closing_clip.with_effects([vfx.CrossFadeIn(0.5), vfx.CrossFadeOut(0.5)])

    scene_close = CompositeVideoClip([closing_bg, closing_clip])
    clips.append(scene_close)

    # Concatenate
    print("  Concatenating scenes...")
    final_video = concatenate_videoclips(clips, method="compose")
    final_video = final_video.subclipped(0, min(60, final_video.duration))

    # Export
    output_path = OUTPUT_DIR / 'reel-02-collection.mp4'
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
    print(f"  ✓ Reel 2 complete: {output_path}")
    return output_path

def create_reel_3_behind_art():
    """Create Reel 3: Behind the Art - Creative Process"""
    print("\n=== Creating Reel 3: Behind the Art ===")

    clips = []

    # Get diverse photos
    all_photos = (
        sorted([p for p in PHOTO_DIR.glob('couture-*.jpg') if 'insta' not in p.name])[20:28] +
        sorted([p for p in PHOTO_DIR.glob('editorial-*.jpg')])[:4] +
        sorted([p for p in PHOTO_DIR.glob('minimal-*.jpg')])[:4]
    )

    # Opening (0-6s)
    print("  Creating opening...")
    opening_bg = ColorClip(size=REEL_SIZE, color=COLORS['deep_espresso']).with_duration(6)
    opening_text = create_text_image("BEHIND", REEL_SIZE, font_size=64,
                                      subtitle="THE ART")
    opening_clip = ImageClip(opening_text).with_duration(4).with_start(1)
    opening_clip = opening_clip.with_effects([vfx.CrossFadeIn(0.5), vfx.CrossFadeOut(0.5)])

    scene_open = CompositeVideoClip([opening_bg, opening_clip])
    clips.append(scene_open)

    # Creative process sections
    sections = [
        ("CONCEPTUALIZATION", "Where Ideas Take Form"),
        ("AI SYNTHESIS", "Technology Meets Vision"),
        ("ARTISTIC CURATION", "Refined Excellence"),
        ("EDITORIAL BEAUTY", "The Final Touch"),
    ]

    photo_idx = 0
    for section_name, section_subtitle in sections:
        print(f"  Creating section: {section_name}...")

        # Section title (2s)
        title_bg = ColorClip(size=REEL_SIZE, color=COLORS['deep_espresso']).with_duration(2)
        title_text = create_text_image(section_name, REEL_SIZE, font_size=42,
                                        subtitle=section_subtitle, color=COLORS['pale_gold'])
        title_clip = ImageClip(title_text).with_duration(1.5).with_start(0.25)
        title_clip = title_clip.with_effects([vfx.CrossFadeIn(0.25), vfx.CrossFadeOut(0.25)])

        title_scene = CompositeVideoClip([title_bg, title_clip])
        clips.append(title_scene)

        # 3 photos per section (3s each = 9s)
        for j in range(3):
            if photo_idx < len(all_photos):
                photo = all_photos[photo_idx]
                photo_idx += 1

                photo_clip = make_ken_burns_clip(photo, 3, 1.0, 1.1,
                                                  (j * 20 - 20, 0), (-j * 20 + 20, 0))

                gradient = create_gradient_overlay(REEL_SIZE, 'bottom', 0.4)
                gradient_clip = ImageClip(gradient).with_duration(3)

                brand = create_brand_overlay(REEL_SIZE)
                brand_clip = ImageClip(brand).with_duration(3)

                scene = CompositeVideoClip([photo_clip, gradient_clip, brand_clip])
                scene = scene.with_effects([vfx.CrossFadeIn(0.2), vfx.CrossFadeOut(0.2)])
                clips.append(scene)

    # Closing (last 8s)
    print("  Creating closing...")
    closing_bg = ColorClip(size=REEL_SIZE, color=COLORS['deep_espresso']).with_duration(8)

    closing_text = create_text_image("VERALABS", REEL_SIZE, font_size=80,
                                      subtitle="The Future of Fashion")
    closing_clip = ImageClip(closing_text).with_duration(6).with_start(1)
    closing_clip = closing_clip.with_effects([vfx.CrossFadeIn(0.5), vfx.CrossFadeOut(0.5)])

    scene_close = CompositeVideoClip([closing_bg, closing_clip])
    clips.append(scene_close)

    # Concatenate
    print("  Concatenating scenes...")
    final_video = concatenate_videoclips(clips, method="compose")
    final_video = final_video.subclipped(0, min(60, final_video.duration))

    # Export
    output_path = OUTPUT_DIR / 'reel-03-behind-art.mp4'
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
    print(f"  ✓ Reel 3 complete: {output_path}")
    return output_path

def create_styled_text_box(text, size, font_size=32, bg_opacity=0.85):
    """Create a styled text box with background"""
    img = Image.new('RGBA', size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    font = get_font(font_size)

    # Calculate text dimensions
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]

    # Create box
    padding = 40
    box_width = text_width + padding * 2
    box_height = text_height + padding * 2
    box_x = (size[0] - box_width) // 2
    box_y = size[1] - box_height - 200  # Position near bottom

    # Draw semi-transparent background
    for y in range(box_y, box_y + box_height):
        for x in range(box_x, box_x + box_width):
            img.putpixel((x, y), (28, 25, 23, int(255 * bg_opacity)))

    # Draw text centered in box
    text_x = box_x + (box_width - text_width) // 2
    text_y = box_y + (box_height - text_height) // 2
    draw.text((text_x, text_y), text, font=font, fill=(*COLORS['cream_white'], 255))

    return np.array(img)

def create_tip_card(tip_number, tip_text, size):
    """Create an informative tip card overlay"""
    img = Image.new('RGBA', size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Card dimensions
    card_width = size[0] - 120
    card_height = 280
    card_x = 60
    card_y = size[1] - card_height - 180

    # Draw card background with gradient effect
    for y in range(card_y, card_y + card_height):
        alpha = int(230 * (1 - (y - card_y) / card_height * 0.3))
        for x in range(card_x, card_x + card_width):
            img.putpixel((x, y), (28, 25, 23, alpha))

    # Tip number
    num_font = get_font(72)
    draw.text((card_x + 40, card_y + 30), f"0{tip_number}", font=num_font,
              fill=(*COLORS['pale_gold'], 255))

    # Tip text
    text_font = get_font(28)
    # Word wrap
    words = tip_text.split()
    lines = []
    current_line = []
    for word in words:
        current_line.append(word)
        test_line = ' '.join(current_line)
        bbox = draw.textbbox((0, 0), test_line, font=text_font)
        if bbox[2] - bbox[0] > card_width - 160:
            current_line.pop()
            lines.append(' '.join(current_line))
            current_line = [word]
    if current_line:
        lines.append(' '.join(current_line))

    y_offset = card_y + 50
    for line in lines[:3]:  # Max 3 lines
        draw.text((card_x + 140, y_offset), line, font=text_font,
                  fill=(*COLORS['cream_white'], 255))
        y_offset += 45

    return np.array(img)

def create_reel_4_style_guide():
    """Create Reel 4: Style Guide - Styling Tips & How to Wear"""
    print("\n=== Creating Reel 4: Style Guide ===")

    clips = []

    # Get minimalist and editorial photos for styling content
    minimal_photos = sorted([p for p in PHOTO_DIR.glob('minimal*.jpg')])[:8]
    editorial_photos = sorted([p for p in PHOTO_DIR.glob('editorial-*.jpg')])[:4]
    couture_photos = sorted([p for p in PHOTO_DIR.glob('couture-*.jpg') if 'insta' not in p.name])[30:38]

    all_photos = minimal_photos + editorial_photos + couture_photos

    # Opening (0-6s)
    print("  Creating opening...")
    opening_bg = ColorClip(size=REEL_SIZE, color=COLORS['deep_espresso']).with_duration(6)
    opening_text = create_text_image("STYLE GUIDE", REEL_SIZE, font_size=64,
                                      subtitle="5 WAYS TO ELEVATE YOUR LOOK")
    opening_clip = ImageClip(opening_text).with_duration(4).with_start(1)
    opening_clip = opening_clip.with_effects([vfx.CrossFadeIn(0.5), vfx.CrossFadeOut(0.5)])

    scene_open = CompositeVideoClip([opening_bg, opening_clip])
    clips.append(scene_open)

    # Styling tips sections
    tips = [
        ("LAYER WITH INTENTION", "Mix textures and proportions for depth"),
        ("EMBRACE NEGATIVE SPACE", "Let each piece breathe and speak"),
        ("THE POWER OF NEUTRALS", "Build a timeless foundation"),
        ("ACCESSORIZE MINIMALLY", "One statement piece says more"),
        ("CONFIDENCE IS KEY", "Wear it like it was made for you"),
    ]

    photo_idx = 0
    for i, (tip_title, tip_detail) in enumerate(tips):
        print(f"  Creating tip {i+1}: {tip_title}...")

        # Each tip: 2 photos (5s each) = 10s per tip
        for j in range(2):
            if photo_idx < len(all_photos):
                photo = all_photos[photo_idx]
                photo_idx += 1
                duration = 5

                # Ken Burns with subtle movement
                if j == 0:
                    photo_clip = make_ken_burns_clip(photo, duration, 1.0, 1.08, (0, -20), (0, 20))
                else:
                    photo_clip = make_ken_burns_clip(photo, duration, 1.08, 1.0, (0, 20), (0, -20))

                # Gradient
                gradient = create_gradient_overlay(REEL_SIZE, 'bottom', 0.55)
                gradient_clip = ImageClip(gradient).with_duration(duration)

                # Tip card (only on first photo of each tip)
                if j == 0:
                    tip_card = create_tip_card(i + 1, f"{tip_title}\n{tip_detail}", REEL_SIZE)
                    tip_clip = ImageClip(tip_card).with_duration(duration - 0.5).with_start(0.25)
                    tip_clip = tip_clip.with_effects([vfx.CrossFadeIn(0.25), vfx.CrossFadeOut(0.25)])
                else:
                    # Just show the tip title on second photo
                    title_img = create_styled_text_box(tip_title, REEL_SIZE, font_size=28)
                    tip_clip = ImageClip(title_img).with_duration(duration - 0.5).with_start(0.25)
                    tip_clip = tip_clip.with_effects([vfx.CrossFadeIn(0.25), vfx.CrossFadeOut(0.25)])

                # Brand
                brand = create_brand_overlay(REEL_SIZE)
                brand_clip = ImageClip(brand).with_duration(duration)

                scene = CompositeVideoClip([photo_clip, gradient_clip, tip_clip, brand_clip])
                scene = scene.with_effects([vfx.CrossFadeIn(0.2), vfx.CrossFadeOut(0.2)])
                clips.append(scene)

    # Closing (last 4s)
    print("  Creating closing...")
    closing_bg = ColorClip(size=REEL_SIZE, color=COLORS['deep_espresso']).with_duration(4)
    closing_text = create_text_image("VERALABS", REEL_SIZE, font_size=72,
                                      subtitle="Style Elevated")
    closing_clip = ImageClip(closing_text).with_duration(3).with_start(0.5)
    closing_clip = closing_clip.with_effects([vfx.CrossFadeIn(0.3), vfx.CrossFadeOut(0.3)])

    scene_close = CompositeVideoClip([closing_bg, closing_clip])
    clips.append(scene_close)

    # Concatenate
    print("  Concatenating scenes...")
    final_video = concatenate_videoclips(clips, method="compose")
    final_video = final_video.subclipped(0, min(60, final_video.duration))

    # Export
    output_path = OUTPUT_DIR / 'reel-04-style-guide.mp4'
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
    print(f"  ✓ Reel 4 complete: {output_path}")
    return output_path

def create_detail_caption(text, size):
    """Create elegant detail caption"""
    img = Image.new('RGBA', size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    font = get_font(24)

    # Position at bottom center
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    x = (size[0] - text_width) // 2
    y = size[1] - 250

    # Background bar
    bar_padding = 30
    for by in range(y - 15, y + 40):
        for bx in range(x - bar_padding, x + text_width + bar_padding):
            if 0 <= bx < size[0]:
                img.putpixel((bx, by), (28, 25, 23, 200))

    # Decorative lines
    draw.line([(x - bar_padding, y - 15), (x - bar_padding, y + 40)],
              fill=(*COLORS['pale_gold'], 255), width=2)
    draw.line([(x + text_width + bar_padding, y - 15), (x + text_width + bar_padding, y + 40)],
              fill=(*COLORS['pale_gold'], 255), width=2)

    draw.text((x, y), text, font=font, fill=(*COLORS['cream_white'], 255))

    return np.array(img)

def create_reel_5_craftsmanship():
    """Create Reel 5: Fabric & Craftsmanship - Details & Textures"""
    print("\n=== Creating Reel 5: Fabric & Craftsmanship ===")

    clips = []

    # Get photos emphasizing details
    silk_photos = sorted([p for p in PHOTO_DIR.glob('silk*.jpg')])
    couture_photos = sorted([p for p in PHOTO_DIR.glob('couture-*.jpg') if 'insta' not in p.name])[40:52]
    minimal_photos = sorted([p for p in PHOTO_DIR.glob('minimal*.jpg')])[8:16]

    all_photos = silk_photos + couture_photos + minimal_photos

    # Opening (0-5s)
    print("  Creating opening...")
    opening_bg = ColorClip(size=REEL_SIZE, color=COLORS['deep_espresso']).with_duration(5)
    opening_text = create_text_image("CRAFTSMANSHIP", REEL_SIZE, font_size=56,
                                      subtitle="THE ART OF DETAIL")
    opening_clip = ImageClip(opening_text).with_duration(3.5).with_start(0.75)
    opening_clip = opening_clip.with_effects([vfx.CrossFadeIn(0.5), vfx.CrossFadeOut(0.5)])

    scene_open = CompositeVideoClip([opening_bg, opening_clip])
    clips.append(scene_open)

    # Detail sections with captions
    details = [
        ("SILK & SATIN", "Luxurious textures that whisper elegance"),
        ("PRECISION CUTS", "Every seam tells a story"),
        ("TONAL HARMONY", "Colors that complement the soul"),
        ("FLOWING FORMS", "Movement frozen in fabric"),
        ("INTIMATE DETAILS", "Beauty in the unseen"),
    ]

    photo_idx = 0
    for section_title, section_desc in details:
        print(f"  Creating section: {section_title}...")

        # Section title card (2s)
        title_bg = ColorClip(size=REEL_SIZE, color=COLORS['deep_espresso']).with_duration(2)
        title_text = create_text_image(section_title, REEL_SIZE, font_size=40,
                                        color=COLORS['pale_gold'], subtitle=section_desc)
        title_clip = ImageClip(title_text).with_duration(1.5).with_start(0.25)
        title_clip = title_clip.with_effects([vfx.CrossFadeIn(0.25), vfx.CrossFadeOut(0.25)])

        clips.append(CompositeVideoClip([title_bg, title_clip]))

        # 2 detail photos per section (4s each)
        for j in range(2):
            if photo_idx < len(all_photos):
                photo = all_photos[photo_idx]
                photo_idx += 1
                duration = 4

                # Slow, intimate zoom
                photo_clip = make_ken_burns_clip(photo, duration, 1.05, 1.15,
                                                  (j * 15, 0), (-j * 15, 0))

                # Light gradient
                gradient = create_gradient_overlay(REEL_SIZE, 'bottom', 0.4)
                gradient_clip = ImageClip(gradient).with_duration(duration)

                # Detail caption
                caption = create_detail_caption(section_title, REEL_SIZE)
                caption_clip = ImageClip(caption).with_duration(duration - 0.5).with_start(0.25)
                caption_clip = caption_clip.with_effects([vfx.CrossFadeIn(0.2), vfx.CrossFadeOut(0.2)])

                # Brand
                brand = create_brand_overlay(REEL_SIZE)
                brand_clip = ImageClip(brand).with_duration(duration)

                scene = CompositeVideoClip([photo_clip, gradient_clip, caption_clip, brand_clip])
                scene = scene.with_effects([vfx.CrossFadeIn(0.15), vfx.CrossFadeOut(0.15)])
                clips.append(scene)

    # Closing (5s)
    print("  Creating closing...")
    closing_bg = ColorClip(size=REEL_SIZE, color=COLORS['deep_espresso']).with_duration(5)
    closing_text = create_text_image("VERALABS", REEL_SIZE, font_size=72,
                                      subtitle="Crafted with Vision")
    closing_clip = ImageClip(closing_text).with_duration(4).with_start(0.5)
    closing_clip = closing_clip.with_effects([vfx.CrossFadeIn(0.3), vfx.CrossFadeOut(0.3)])

    scene_close = CompositeVideoClip([closing_bg, closing_clip])
    clips.append(scene_close)

    # Concatenate
    print("  Concatenating scenes...")
    final_video = concatenate_videoclips(clips, method="compose")
    final_video = final_video.subclipped(0, min(60, final_video.duration))

    # Export
    output_path = OUTPUT_DIR / 'reel-05-craftsmanship.mp4'
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
    print(f"  ✓ Reel 5 complete: {output_path}")
    return output_path

def create_lifestyle_quote(quote, author, size):
    """Create elegant lifestyle quote overlay"""
    img = Image.new('RGBA', size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Quote marks
    quote_font = get_font(80)
    draw.text((80, size[1]//2 - 150), '"', font=quote_font, fill=(*COLORS['pale_gold'], 180))

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

    y_offset = size[1]//2 - 80
    for line in lines[:4]:
        bbox = draw.textbbox((0, 0), line, font=text_font)
        x = (size[0] - (bbox[2] - bbox[0])) // 2
        # Shadow
        draw.text((x + 2, y_offset + 2), line, font=text_font, fill=(0, 0, 0, 150))
        draw.text((x, y_offset), line, font=text_font, fill=(*COLORS['cream_white'], 255))
        y_offset += 50

    # Author
    author_font = get_font(20)
    bbox = draw.textbbox((0, 0), f"— {author}", font=author_font)
    x = (size[0] - (bbox[2] - bbox[0])) // 2
    draw.text((x, y_offset + 30), f"— {author}", font=author_font,
              fill=(*COLORS['warm_taupe'], 255))

    return np.array(img)

def create_reel_6_lifestyle():
    """Create Reel 6: Morning Rituals / Lifestyle - The VeraLabs Woman"""
    print("\n=== Creating Reel 6: Lifestyle ===")

    clips = []

    # Get lifestyle-oriented photos
    editorial_photos = sorted([p for p in PHOTO_DIR.glob('editorial-*.jpg')])
    portrait_photos = sorted([p for p in PHOTO_DIR.glob('portrait*.jpg')])
    minimalist_photos = sorted([p for p in PHOTO_DIR.glob('minimalist*.jpg')])
    contemporary_photos = sorted([p for p in PHOTO_DIR.glob('contemporary*.jpg')])

    all_photos = editorial_photos + portrait_photos + minimalist_photos + contemporary_photos

    # Opening (0-5s)
    print("  Creating opening...")
    opening_bg = ColorClip(size=REEL_SIZE, color=COLORS['deep_espresso']).with_duration(5)
    opening_text = create_text_image("A DAY IN", REEL_SIZE, font_size=48,
                                      subtitle="THE LIFE")
    opening_clip = ImageClip(opening_text).with_duration(3.5).with_start(0.75)
    opening_clip = opening_clip.with_effects([vfx.CrossFadeIn(0.5), vfx.CrossFadeOut(0.5)])

    scene_open = CompositeVideoClip([opening_bg, opening_clip])
    clips.append(scene_open)

    # Lifestyle moments with quotes
    moments = [
        ("DAWN", "Elegance begins with intention", "The quiet hours hold magic"),
        ("PRESENCE", "She moves with purpose", "Every moment is a canvas"),
        ("GRACE", "Confidence needs no announcement", "Beauty in simplicity"),
        ("EVENING", "Understated, unforgettable", "The night belongs to her"),
    ]

    photo_idx = 0
    for time_of_day, tagline, quote in moments:
        print(f"  Creating moment: {time_of_day}...")

        # Section intro (2s)
        intro_bg = ColorClip(size=REEL_SIZE, color=COLORS['deep_espresso']).with_duration(2)
        intro_text = create_text_image(time_of_day, REEL_SIZE, font_size=52,
                                        color=COLORS['pale_gold'])
        intro_clip = ImageClip(intro_text).with_duration(1.5).with_start(0.25)
        intro_clip = intro_clip.with_effects([vfx.CrossFadeIn(0.25), vfx.CrossFadeOut(0.25)])

        clips.append(CompositeVideoClip([intro_bg, intro_clip]))

        # 3 photos per moment
        for j in range(3):
            if photo_idx < len(all_photos):
                photo = all_photos[photo_idx % len(all_photos)]
                photo_idx += 1
                duration = 4

                # Dreamy, slow movement
                pan_x = (j - 1) * 25
                photo_clip = make_ken_burns_clip(photo, duration, 1.0, 1.06,
                                                  (pan_x, -15), (-pan_x, 15))

                # Soft gradient
                gradient = create_gradient_overlay(REEL_SIZE, 'bottom', 0.5)
                gradient_clip = ImageClip(gradient).with_duration(duration)

                # Quote on middle photo
                if j == 1:
                    quote_img = create_lifestyle_quote(quote, "VERALABS", REEL_SIZE)
                    quote_clip = ImageClip(quote_img).with_duration(duration - 0.5).with_start(0.25)
                    quote_clip = quote_clip.with_effects([vfx.CrossFadeIn(0.3), vfx.CrossFadeOut(0.3)])
                else:
                    # Tagline on other photos
                    tag_img = create_styled_text_box(tagline, REEL_SIZE, font_size=26)
                    quote_clip = ImageClip(tag_img).with_duration(duration - 0.5).with_start(0.25)
                    quote_clip = quote_clip.with_effects([vfx.CrossFadeIn(0.2), vfx.CrossFadeOut(0.2)])

                # Brand
                brand = create_brand_overlay(REEL_SIZE)
                brand_clip = ImageClip(brand).with_duration(duration)

                scene = CompositeVideoClip([photo_clip, gradient_clip, quote_clip, brand_clip])
                scene = scene.with_effects([vfx.CrossFadeIn(0.2), vfx.CrossFadeOut(0.2)])
                clips.append(scene)

    # Closing (4s)
    print("  Creating closing...")
    closing_bg = ColorClip(size=REEL_SIZE, color=COLORS['deep_espresso']).with_duration(4)
    closing_text = create_text_image("VERALABS", REEL_SIZE, font_size=72,
                                      subtitle="Live Beautifully")
    closing_clip = ImageClip(closing_text).with_duration(3).with_start(0.5)
    closing_clip = closing_clip.with_effects([vfx.CrossFadeIn(0.3), vfx.CrossFadeOut(0.3)])

    scene_close = CompositeVideoClip([closing_bg, closing_clip])
    clips.append(scene_close)

    # Concatenate
    print("  Concatenating scenes...")
    final_video = concatenate_videoclips(clips, method="compose")
    final_video = final_video.subclipped(0, min(60, final_video.duration))

    # Export
    output_path = OUTPUT_DIR / 'reel-06-lifestyle.mp4'
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
    print(f"  ✓ Reel 6 complete: {output_path}")
    return output_path

def create_collection_badge(text, size):
    """Create elegant collection badge"""
    img = Image.new('RGBA', size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Badge dimensions
    badge_width = 300
    badge_height = 100
    badge_x = (size[0] - badge_width) // 2
    badge_y = 180

    # Draw badge background
    for y in range(badge_y, badge_y + badge_height):
        for x in range(badge_x, badge_x + badge_width):
            img.putpixel((x, y), (*COLORS['deep_espresso'], 240))

    # Border
    draw.rectangle([(badge_x, badge_y), (badge_x + badge_width, badge_y + badge_height)],
                   outline=(*COLORS['pale_gold'], 255), width=2)

    # Text
    font = get_font(24)
    bbox = draw.textbbox((0, 0), text, font=font)
    text_x = badge_x + (badge_width - (bbox[2] - bbox[0])) // 2
    text_y = badge_y + (badge_height - (bbox[3] - bbox[1])) // 2
    draw.text((text_x, text_y), text, font=font, fill=(*COLORS['cream_white'], 255))

    return np.array(img)

def create_reel_7_seasonal():
    """Create Reel 7: Seasonal Collection Preview"""
    print("\n=== Creating Reel 7: Seasonal Collection ===")

    clips = []

    # Get premium couture photos for collection preview
    couture_photos = sorted([p for p in PHOTO_DIR.glob('couture-*.jpg') if 'insta' not in p.name])
    fluid_photos = sorted([p for p in PHOTO_DIR.glob('fluid*.jpg')])
    gilded_photos = sorted([p for p in PHOTO_DIR.glob('gilded*.jpg')])
    monsoon_photos = sorted([p for p in PHOTO_DIR.glob('monsoon*.jpg')])
    quiet_photos = sorted([p for p in PHOTO_DIR.glob('quiet*.jpg')])

    # Mix for variety
    all_photos = (couture_photos[0:4] + fluid_photos + gilded_photos +
                  monsoon_photos + quiet_photos + couture_photos[4:12])

    # Opening (0-6s) - Dramatic reveal
    print("  Creating opening...")
    opening_bg = ColorClip(size=REEL_SIZE, color=COLORS['deep_espresso']).with_duration(6)

    # "INTRODUCING" text
    intro_text = create_text_image("INTRODUCING", REEL_SIZE, font_size=32,
                                    color=COLORS['warm_taupe'])
    intro_clip = ImageClip(intro_text).with_duration(2).with_start(0.5)
    intro_clip = intro_clip.with_effects([vfx.CrossFadeIn(0.3), vfx.CrossFadeOut(0.3)])

    # Collection name
    title_text = create_text_image("SPRING 2025", REEL_SIZE, font_size=72,
                                    subtitle="THE NEW COLLECTION")
    title_clip = ImageClip(title_text).with_duration(3).with_start(2.5)
    title_clip = title_clip.with_effects([vfx.CrossFadeIn(0.5), vfx.CrossFadeOut(0.3)])

    scene_open = CompositeVideoClip([opening_bg, intro_clip, title_clip])
    clips.append(scene_open)

    # Collection categories
    categories = [
        ("ETHEREAL", "Pieces that float"),
        ("SCULPTURAL", "Form meets function"),
        ("INTIMATE", "Close to the heart"),
        ("LUXE", "Uncompromising quality"),
    ]

    photo_idx = 0
    for cat_name, cat_desc in categories:
        print(f"  Creating category: {cat_name}...")

        # Category intro (2s)
        cat_bg = ColorClip(size=REEL_SIZE, color=COLORS['deep_espresso']).with_duration(2)
        cat_text = create_text_image(cat_name, REEL_SIZE, font_size=48,
                                      color=COLORS['pale_gold'], subtitle=cat_desc)
        cat_clip = ImageClip(cat_text).with_duration(1.5).with_start(0.25)
        cat_clip = cat_clip.with_effects([vfx.CrossFadeIn(0.25), vfx.CrossFadeOut(0.25)])

        clips.append(CompositeVideoClip([cat_bg, cat_clip]))

        # 3 collection pieces per category
        for j in range(3):
            if photo_idx < len(all_photos):
                photo = all_photos[photo_idx % len(all_photos)]
                photo_idx += 1
                duration = 3.5

                # Elegant reveal movement
                if j % 2 == 0:
                    photo_clip = make_ken_burns_clip(photo, duration, 1.02, 1.1, (0, -25), (0, 25))
                else:
                    photo_clip = make_ken_burns_clip(photo, duration, 1.1, 1.02, (0, 25), (0, -25))

                # Gradient
                gradient = create_gradient_overlay(REEL_SIZE, 'bottom', 0.45)
                gradient_clip = ImageClip(gradient).with_duration(duration)

                # Collection badge
                badge = create_collection_badge(f"SPRING '25 • {cat_name}", REEL_SIZE)
                badge_clip = ImageClip(badge).with_duration(duration - 0.5).with_start(0.25)
                badge_clip = badge_clip.with_effects([vfx.CrossFadeIn(0.2), vfx.CrossFadeOut(0.2)])

                # Brand
                brand = create_brand_overlay(REEL_SIZE)
                brand_clip = ImageClip(brand).with_duration(duration)

                scene = CompositeVideoClip([photo_clip, gradient_clip, badge_clip, brand_clip])
                scene = scene.with_effects([vfx.CrossFadeIn(0.15), vfx.CrossFadeOut(0.15)])
                clips.append(scene)

    # Closing CTA (6s)
    print("  Creating closing...")
    closing_bg = ColorClip(size=REEL_SIZE, color=COLORS['deep_espresso']).with_duration(6)

    closing_text = create_text_image("AVAILABLE NOW", REEL_SIZE, font_size=42,
                                      color=COLORS['pale_gold'])
    closing_clip = ImageClip(closing_text).with_duration(2.5).with_start(0.5)
    closing_clip = closing_clip.with_effects([vfx.CrossFadeIn(0.3), vfx.CrossFadeOut(0.3)])

    cta_text = create_text_image("VERALABS", REEL_SIZE, font_size=72,
                                  subtitle="Link in Bio")
    cta_clip = ImageClip(cta_text).with_duration(2.5).with_start(3)
    cta_clip = cta_clip.with_effects([vfx.CrossFadeIn(0.3), vfx.CrossFadeOut(0.3)])

    scene_close = CompositeVideoClip([closing_bg, closing_clip, cta_clip])
    clips.append(scene_close)

    # Concatenate
    print("  Concatenating scenes...")
    final_video = concatenate_videoclips(clips, method="compose")
    final_video = final_video.subclipped(0, min(60, final_video.duration))

    # Export
    output_path = OUTPUT_DIR / 'reel-07-seasonal.mp4'
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
    print(f"  ✓ Reel 7 complete: {output_path}")
    return output_path

def main():
    print("=" * 60)
    print("VERALABS Instagram Reels Generator")
    print("Creating 7 x 60-second Reels")
    print("=" * 60)

    # Create all reels
    reel1 = create_reel_1_brand_story()
    reel2 = create_reel_2_collection()
    reel3 = create_reel_3_behind_art()
    reel4 = create_reel_4_style_guide()
    reel5 = create_reel_5_craftsmanship()
    reel6 = create_reel_6_lifestyle()
    reel7 = create_reel_7_seasonal()

    print("\n" + "=" * 60)
    print("ALL REELS COMPLETE!")
    print("=" * 60)
    print(f"\n📹 Reel 1: {reel1}")
    print(f"📹 Reel 2: {reel2}")
    print(f"📹 Reel 3: {reel3}")
    print(f"📹 Reel 4: {reel4}")
    print(f"📹 Reel 5: {reel5}")
    print(f"📹 Reel 6: {reel6}")
    print(f"📹 Reel 7: {reel7}")
    print("\nFormat: 1080x1920 (9:16) • 60 seconds • 30 FPS")
    print("=" * 60)

if __name__ == '__main__':
    main()
