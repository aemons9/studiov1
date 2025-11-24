# Visual Novel Asset Generation Prompts
## Photorealistic Photography Style

This document contains the professional-grade prompts for generating all Visual Novel assets using **photorealistic photography** style.

---

## 📸 Character Sprites (Photorealistic)

### Core Template for All Sprites

```
PHOTOREALISTIC CHARACTER PORTRAIT | Professional photography | PNG with alpha transparency | 9:16 vertical

CHARACTER: Beautiful Indian woman, age 25, 5'8" height, elegant hourglass figure (36-26-38"), warm brown skin tone, long flowing black hair, captivating brown eyes, natural beauty

OUTFIT: [Specific outfit details]

POSE & EXPRESSION: Full body standing pose, [specific expression and pose], eyes looking directly at camera, [specific body language]

PHOTOGRAPHY: Professional studio portrait photography, shot with 85mm f/1.8 lens, shallow depth of field, full body framing from head to toe

LIGHTING: Professional 3-point studio lighting setup, soft diffused key light from front-left creating gentle shadows, subtle rim light for depth and separation, soft fill light, no harsh shadows, even flattering illumination on skin

BACKGROUND: PURE TRANSPARENT BACKGROUND (alpha channel), isolated subject only, clean professional cutout, perfect edge detection, NO background elements, NO floor, NO props

QUALITY: High-resolution professional photography, magazine quality, commercial standard, sharp focus on subject, natural skin texture, realistic lighting, cinematic color grading

TECHNICAL: PNG format with alpha transparency, 9:16 aspect ratio perfect for mobile/vertical display, ready for compositing over any background

```

### Specific Expressions

**Neutral Expression:**
- `neutral friendly expression, soft genuine smile, welcoming body language, hands relaxed at sides`

**Happy/Smile:**
- `warm genuine smile, happy expression, welcoming body language, eyes sparkling with joy`

**Flirty:**
- `playful flirty expression with slight smirk, confident sultry gaze, hand on hip, playful body language`

**Shy:**
- `shy blushing expression, slightly looking away, vulnerable sweet expression, hands clasped nervously`

---

## 🎬 CG Images (Photorealistic Scenes)

### Template for CG Scenes

```
PHOTOREALISTIC CINEMATIC SCENE | Professional photography | 16:9 widescreen

SCENE: [Detailed scene description]

CHARACTER: Beautiful Indian woman, age 25, 5'8", elegant hourglass figure, warm brown skin, long black hair, brown eyes

SETTING: [Specific location and atmosphere]

COMPOSITION: [Camera angle and framing details]

PHOTOGRAPHY: Shot with cinema camera (RED/ARRI), cinematic color grading, [specific lens details], depth of field, professional film quality

LIGHTING: [Specific lighting setup for the scene]

MOOD: [Emotional atmosphere and tone]

QUALITY: High-resolution cinematic photography, film quality, commercial standard, natural skin texture, realistic lighting, professional color grading

TECHNICAL: 16:9 aspect ratio, widescreen composition, photograph (not illustration)

```

---

## 🖼️ Background Images (Photorealistic)

### Art Gallery Background

```
PHOTOREALISTIC INTERIOR PHOTOGRAPHY | 16:9 widescreen

LOCATION: Upscale contemporary art gallery interior, modern minimalist architecture, high ceilings with track lighting, white walls with large contemporary art pieces, polished light grey concrete floors

TIME & LIGHTING: Golden hour (late afternoon), warm amber sunlight streaming through floor-to-ceiling windows, dramatic light rays with dust particles visible, chiaroscuro effect (high contrast light/shadow), professional color grading

COMPOSITION: Rule of thirds, clear foreground for character placement (lower third empty), gallery depth extending into background, blurred figures in far background (bokeh effect), architectural lines leading eye to center

DEPTH OF FIELD: Shallow DoF, foreground sharp, mid-ground slightly soft, background with beautiful bokeh blur, professional cinema lens aesthetic (f/2.8)

ATMOSPHERE: Sophisticated upscale ambiance, warm inviting tones, artistic cultural vibe, evening cocktail event atmosphere, museum-quality space

TECHNICAL: NO people in foreground (reserved for sprite layer), professional architectural photography, cinema-quality color grading, teal and orange complementary colors, film-like grain texture

PHOTOGRAPHY: Shot with full-frame camera, wide-angle lens (24mm), professional architectural photography techniques

QUALITY: Commercial visual novel standard, 4K downsampled to 1080p, professional photography, Steam-release quality, high-end architectural photography

TECHNICAL: 16:9 aspect ratio, photograph (not illustration or rendering)

```

---

## 🎯 Key Differences: Photorealistic vs Anime

| Aspect | ❌ Anime/Illustrated | ✅ Photorealistic |
|--------|---------------------|-------------------|
| **Style Keywords** | anime, cel-shaded, visual novel art, character sprite | professional photography, portrait, studio shot |
| **Quality Reference** | Studio Key, Type-Moon | magazine quality, commercial photography |
| **Camera Details** | N/A | 85mm f/1.8 lens, shallow DOF |
| **Focus** | illustrated character art | photograph of real person |
| **Art Medium** | digital illustration, linework | photograph, camera |
| **Skin Rendering** | smooth cel-shading | natural skin texture, realistic |

---

## 🔧 Technical Specifications

### Character Sprites
- **Aspect Ratio:** 9:16 (portrait)
- **Format:** PNG with alpha transparency
- **Style:** Photorealistic photography
- **Background:** Fully transparent (alpha channel)
- **Framing:** Full body, head to toe

### CG Images
- **Aspect Ratio:** 16:9 (widescreen)
- **Format:** JPG or PNG
- **Style:** Cinematic photography
- **Composition:** Widescreen cinematic framing

### Backgrounds
- **Aspect Ratio:** 16:9 (landscape)
- **Format:** JPG or PNG
- **Style:** Architectural/environmental photography
- **Foreground:** Empty (for character sprites)

---

## 💡 Pro Tips for Photorealistic Generation

### For Character Sprites:
1. **Always specify:** "professional photography", "studio portrait", "85mm lens"
2. **Transparent background:** Emphasize "PURE TRANSPARENT BACKGROUND (alpha channel)"
3. **Natural skin:** "natural skin texture", "realistic lighting"
4. **Real person:** Use "photograph of real person" not "character" or "sprite"
5. **Photography details:** Mention camera, lens, lighting setup
6. **Note:** Imagen doesn't support negative prompts - use strong positive descriptions

### For CG Scenes:
1. **Cinematic language:** "shot with cinema camera", "film quality"
2. **Lighting details:** Describe specific lighting scenarios
3. **Composition:** Use photography terms (rule of thirds, depth of field)
4. **Real locations:** Describe as real places, not illustrated scenes

### For Backgrounds:
1. **Empty foreground:** "NO people in foreground (reserved for sprite layer)"
2. **Depth:** "shallow depth of field", "bokeh blur in background"
3. **Architectural:** Use architectural photography terminology
4. **Atmosphere:** Describe lighting and mood cinematically

---

## 🚨 Common Issues & Fixes

### Issue: Getting cartoon/anime style instead of photos
**Fix:**
- Use strong positive descriptions: `professional photography`, `photograph of real person`, `studio portrait`
- Add camera details: `shot with 85mm lens`, `cinema camera`, `full-frame camera`
- Emphasize: `photorealistic`, `magazine quality`, `natural skin texture`
- Note: Imagen doesn't support negative prompts, so focus on what you WANT

### Issue: Background not transparent (checkerboard visible)
**Fix:**
- The checkerboard is NORMAL - it shows transparency
- It will disappear when composited over a background in the Visual Novel
- Make sure to save as PNG format

### Issue: Character too illustrated/stylized
**Fix:**
- Emphasize: `photorealistic`, `natural skin texture`, `realistic lighting`
- Specify camera: `85mm f/1.8 lens`, `shallow depth of field`

### Issue: Background elements in sprite cutouts
**Fix:**
- Strong emphasis: `PURE TRANSPARENT BACKGROUND`, `isolated subject only`
- Negative: `background visible, floor visible, NO background elements`

---

## 📊 Generation Settings (Imagen 4.0)

- **Model:** imagen-4.0-ultra-generate-001 (best quality)
- **Aspect Ratio Sprites:** 9:16
- **Aspect Ratio Backgrounds/CG:** 16:9
- **Person Generation:** allow_all
- **Safety Setting:** block_few
- **Add Watermark:** false

---

## 🎨 Example Full Prompts

### Example 1: Neutral Sprite
```
PHOTOREALISTIC CHARACTER PORTRAIT | Professional photography | PNG with alpha transparency | 9:16 vertical

CHARACTER: Beautiful Indian woman, age 25, 5'8" height, elegant hourglass figure (36-26-38"), warm brown skin tone, long flowing black hair, captivating brown eyes, natural beauty

OUTFIT: Elegant white linen summer dress (knee-length), simple gold jewelry (small earrings, delicate bracelet), natural makeup emphasizing her features

POSE & EXPRESSION: Full body standing pose, weight on one leg (natural confident stance), neutral friendly expression, soft genuine smile, eyes looking directly at camera, welcoming body language, hands relaxed at sides

PHOTOGRAPHY: Professional studio portrait photography, shot with 85mm f/1.8 lens, shallow depth of field, full body framing from head to toe

LIGHTING: Professional 3-point studio lighting setup, soft diffused key light from front-left creating gentle shadows, subtle rim light for depth and separation, soft fill light, no harsh shadows, even flattering illumination on skin

BACKGROUND: PURE TRANSPARENT BACKGROUND (alpha channel), isolated subject only, clean professional cutout, perfect edge detection, NO background elements, NO floor, NO props

QUALITY: High-resolution professional photography, magazine quality, commercial standard, sharp focus on subject, natural skin texture, realistic lighting, cinematic color grading

TECHNICAL: PNG format with alpha transparency, 9:16 aspect ratio perfect for mobile/vertical display, ready for compositing over any background

```

### Example 2: Art Gallery Background
```
PHOTOREALISTIC INTERIOR PHOTOGRAPHY | 16:9 widescreen | Upscale contemporary art gallery, high ceilings, white walls, modern art, polished concrete floors | Golden hour afternoon light streaming through floor-to-ceiling windows, warm amber glow, dramatic light rays, dust particles visible | Rule of thirds composition, clear empty foreground (lower third) for character sprites, gallery extends into background with beautiful bokeh blur | Shot with full-frame camera, 24mm wide lens, f/2.8, shallow depth of field | Professional architectural photography, cinema-quality color grading, teal and orange tones, film grain | NO people in foreground, sophisticated upscale atmosphere, museum quality | 4K quality photograph

NOTE: Imagen does not support negative prompts. Focus on strong positive descriptions of what you want instead.
```

---

**Last Updated:** November 24, 2025
**Style:** Photorealistic Photography
**Quality Target:** Commercial/Magazine/Film Quality
