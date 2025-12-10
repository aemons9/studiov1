# How to Remove White Backgrounds from Sprite PNGs

The visual novel sprites currently have **solid white backgrounds** instead of **alpha transparency**. CSS workarounds can only do so much - the proper solution is to remove the white background from the PNG files.

## Why This Matters

- ✅ **With alpha transparency**: Sprite blends seamlessly with any background
- ❌ **With white background**: Visible rectangular box, color bleed issues, blend mode problems

## Quick Solutions

### Option 1: Online Tool (Fastest, Free)
**remove.bg** - Automatic AI background removal

1. Go to https://remove.bg
2. Upload your sprite PNG (e.g., `zara_neutral_full.png`)
3. Click "Remove Background"
4. Download the result (PNG with transparency)
5. Replace the original file in `visualnovel/assets/sprites/`

**Pros**: Fast, automatic, high quality
**Cons**: Free tier limited to 50 images/month

### Option 2: Photoshop
1. Open sprite PNG in Photoshop
2. Select the Magic Wand tool (W)
3. Click on white background area
4. Press Delete to remove white
5. **File → Export → Export As...**
6. Format: **PNG-24** (important!)
7. Check **Transparency** option
8. Save and replace original

### Option 3: GIMP (Free Software)
1. Download GIMP: https://www.gimp.org
2. Open sprite PNG
3. **Layer → Transparency → Add Alpha Channel**
4. Select "Select by Color" tool
5. Click white background
6. Press Delete
7. **File → Export As...**
8. Choose PNG, ensure **Save color values from transparent pixels** is checked
9. Export and replace original

### Option 4: Python Script (Batch Processing)
If you have many sprites, use this Python script:

```python
from PIL import Image
import os

def remove_white_background(input_path, output_path, threshold=240):
    """Remove white background from PNG and make transparent"""
    img = Image.open(input_path).convert("RGBA")
    datas = img.getdata()

    newData = []
    for item in datas:
        # If pixel is close to white (R, G, B all > threshold)
        if item[0] > threshold and item[1] > threshold and item[2] > threshold:
            # Make it transparent
            newData.append((255, 255, 255, 0))
        else:
            # Keep original pixel
            newData.append(item)

    img.putdata(newData)
    img.save(output_path, "PNG")
    print(f"✅ Processed: {os.path.basename(output_path)}")

# Process all sprites
sprite_dir = "visualnovel/assets/sprites"
sprites = [
    "zara_neutral_full.png",
    "zara_smile_full.png",
    "zara_flirty_full.png",
    "zara_shy_full.png",
    "zara_studio_outfit.png",
    "zara_boudoir_outfit.png"
]

for sprite in sprites:
    input_path = os.path.join(sprite_dir, sprite)
    # Create backup
    backup_path = os.path.join(sprite_dir, f"{sprite}.backup")
    if os.path.exists(input_path) and not os.path.exists(backup_path):
        os.rename(input_path, backup_path)
        remove_white_background(backup_path, input_path, threshold=240)

print("\\n🎉 All sprites processed! Original files backed up with .backup extension")
```

**To run:**
```bash
# Install PIL (if needed)
pip install Pillow

# Run script
python remove_white_backgrounds.py
```

### Option 5: ImageMagick Command Line
```bash
cd visualnovel/assets/sprites

# Process each sprite
for file in zara_*.png; do
  # Create backup
  cp "$file" "${file}.backup"

  # Remove white background (fuzz 10% for near-white pixels)
  convert "$file" -fuzz 10% -transparent white "${file}"

  echo "✅ Processed: $file"
done
```

## After Removing Backgrounds

1. **Verify transparency**: Open PNG in image viewer - should see checkerboard pattern behind character
2. **Replace files**: Copy processed PNGs to `visualnovel/assets/sprites/`
3. **Clear browser cache**: Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
4. **Restart dev server**: `npm run dev:vn`
5. **Test in VN**: Sprites should now blend seamlessly without white boxes

## Checking Your Work

**Good PNG (alpha transparency):**
- Image viewer shows checkerboard pattern behind character
- File properties show "32-bit color depth" or "RGBA"
- No white rectangular areas around character

**Bad PNG (white background):**
- Solid white rectangle around character
- File might say "24-bit color depth" or "RGB"
- No transparency information

## Regenerating Sprites (Alternative)

If you want to regenerate instead of editing:

1. Use the Visual Novel Asset Generator
2. Ensure prompt includes:
   ```
   BACKGROUND: PURE TRANSPARENT BACKGROUND (alpha channel)
   PNG with alpha transparency
   Isolated subject only, clean professional cutout
   ```
3. For Imagen: Already supports transparent backgrounds
4. For Flux: Enable "transparent background" option if available
5. Verify downloaded PNG has transparency before using

---

**Note**: The CSS edge masks in the code are temporary workarounds. Proper alpha transparency is the correct solution for production-quality visual novels.
