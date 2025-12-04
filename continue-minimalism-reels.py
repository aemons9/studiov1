#!/usr/bin/env python3
"""
Continue rendering minimalism reels 13-20
(Reels 11-12 already exist)
"""

from moviepy import *
from PIL import Image, ImageDraw, ImageFont, ImageEnhance
import numpy as np
import os
from pathlib import Path

# Import all functions from the main generator
exec(compile(open('generate-minimalism-reels.py').read().split("if __name__")[0], 'generate-minimalism-reels.py', 'exec'))

def main():
    print("=" * 60)
    print("VERALABS Minimalism Reels Generator - CONTINUATION")
    print("Rendering Reels 13-20 (8 remaining)")
    print("=" * 60)

    photos = get_minimalism_photos()
    print(f"\nFound {len(photos)} minimalism source photos")

    if len(photos) < 10:
        print(f"Warning: Only {len(photos)} photos available")
        return

    # Only render reels 13-20 (skipping 11 and 12 which exist)
    reel_creators = [
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
    print("REMAINING REELS COMPLETE!")
    print("=" * 60)
    for r in results:
        print(f"  {r}")
    print("\nFormat: 1080x1920 (9:16) | 60 seconds | 30 FPS")
    print("=" * 60)

if __name__ == '__main__':
    main()
