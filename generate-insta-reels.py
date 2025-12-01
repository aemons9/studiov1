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
        threads=4
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
        threads=4
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
        threads=4
    )
    print(f"  ✓ Reel 3 complete: {output_path}")
    return output_path

def main():
    print("=" * 60)
    print("VERALABS Instagram Reels Generator")
    print("Creating 3 x 60-second Reels")
    print("=" * 60)

    # Create all reels
    reel1 = create_reel_1_brand_story()
    reel2 = create_reel_2_collection()
    reel3 = create_reel_3_behind_art()

    print("\n" + "=" * 60)
    print("ALL REELS COMPLETE!")
    print("=" * 60)
    print(f"\n📹 Reel 1: {reel1}")
    print(f"📹 Reel 2: {reel2}")
    print(f"📹 Reel 3: {reel3}")
    print("\nFormat: 1080x1920 (9:16) • 60 seconds • 30 FPS")
    print("=" * 60)

if __name__ == '__main__':
    main()
