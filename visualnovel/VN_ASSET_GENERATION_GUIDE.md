# Visual Novel Asset Generation from Main App

## Overview

All Visual Novel assets can now be generated directly from the **main Photo Persona app** using pre-built concepts in the concept selector. No need to switch to a separate mode!

## Quick Start

1. **Open the main Photo Persona app**
2. **Find the Concept Selector** (dropdown at the top)
3. **Look for VN concepts** - they're labeled like:
   - `VN Sprite: Zara Neutral`
   - `VN BG: Art Gallery`
   - `VN CG: First Meeting`
4. **Select a concept** → All fields auto-populate!
5. **Click Generate** → Asset created with perfect settings

## Available Concepts

### 🧍 Character Sprites (6 concepts)
Perfect for character sprites with transparent backgrounds:

| Concept Name | Description | Aspect Ratio | Use Case |
|--------------|-------------|--------------|----------|
| `VN Sprite: Zara Neutral` | Neutral friendly expression, standing pose | 9:16 Portrait | General dialogue scenes |
| `VN Sprite: Zara Smile` | Warm genuine smile, welcoming gesture | 9:16 Portrait | Happy/friendly scenes |
| `VN Sprite: Zara Flirty` | Playful coy smile, hand on hip | 9:16 Portrait | Flirtation scenes |
| `VN Sprite: Zara Shy` | Shy gentle smile, vulnerable expression | 9:16 Portrait | Tender moments |
| `VN Sprite: Zara Studio Outfit` | Professional photoshoot attire | 9:16 Portrait | Photography studio scenes |
| `VN Sprite: Zara Boudoir Outfit` | Fine art boudoir ensemble | 9:16 Portrait | Intimate artistic scenes |

**All sprites include:**
- ✅ Full body portraits (head to toe)
- ✅ Professional photography specs (Canon EOS R5, 85mm f/1.4)
- ✅ Transparent background instructions (PNG with alpha channel)
- ✅ Professional lighting setup details
- ✅ 1024x2048 resolution specs

### 🖼️ Backgrounds (5 concepts)
Cinematic 16:9 backgrounds ready for sprite compositing:

| Concept Name | Description | Time of Day | Atmosphere |
|--------------|-------------|-------------|------------|
| `VN BG: Art Gallery` | Contemporary gallery, golden hour | Late afternoon | Sophisticated upscale |
| `VN BG: Photography Studio` | Professional loft studio | Daytime | Creative professional |
| `VN BG: Luxury Bedroom` | Upscale apartment bedroom | Evening/twilight | Intimate romantic |
| `VN BG: Upscale Cafe` | Trendy modern cafe interior | Late afternoon | Casual sophisticated |
| `VN BG: Fashion Showroom` | High-end boutique showroom | Bright day | Luxury retail |

**All backgrounds include:**
- ✅ 16:9 widescreen format (1920x1080)
- ✅ Clear foreground space for character sprites
- ✅ Depth and bokeh for visual interest
- ✅ Professional architectural photography
- ✅ NO people (reserved for sprite layer)

### ✨ CG Images (5 concepts)
Special cinematic moments for key story beats:

| Concept Name | Description | Type | Emotional Tone |
|--------------|-------------|------|----------------|
| `VN CG: First Meeting` | Eye contact moment at gallery | Medium close-up | Romantic connection |
| `VN CG: Studio Photoshoot` | Behind-the-scenes collaboration | Medium shot | Creative intimacy |
| `VN CG: Viewing Photos Together` | Emotional photo review moment | Close-up | Vulnerable sharing |
| `VN CG: Boudoir Photoshoot` | Fine art boudoir session | Medium/full shot | Artistic sensuality |
| `VN CG: Intimate Connection` | Culminating emotional moment | Extreme close-up | Deep intimacy |

**All CG images include:**
- ✅ 16:9 cinematic format
- ✅ Zara with viewer in scene context
- ✅ Shallow depth of field (f/1.4-f/2.0)
- ✅ Cinematic color grading (A24 film quality)
- ✅ Emotional storytelling photography

## How It Works

### Concept Selection Auto-Populates Everything

When you select a VN concept, the form automatically fills:

#### Example: Selecting "VN Sprite: Zara Neutral"

**Shot:**
```
PHOTOREALISTIC CHARACTER PORTRAIT | Professional photography |
PNG with alpha transparency | 9:16 vertical portrait
```

**Subject:**
```
Elite Indian artistic model Zara Cinématique, age 25, height 5'7",
dramatic curves (38DD-27-39"), fair complexion, long black hair,
expressive brown eyes...
```

**Wardrobe:**
```
Elegant ivory silk wrap dress, gold jewelry, minimal professional makeup...
```

**Environment:**
```
PURE TRANSPARENT BACKGROUND (alpha channel), isolated subject only,
clean professional cutout, NO background elements...
```

**Camera:**
- Focal Length: 85mm f/1.4
- Aperture: f/1.8
- Distance: 2 m
- Framing: Full body portrait 9:16

**Lighting:**
```
Professional 3-point studio lighting, soft diffused key light,
rim light for separation, even flattering illumination...
```

**Quality:**
```
Canon EOS R5, 8K resolution, commercial quality, magazine-worthy,
PNG with alpha transparency, 1024x2048 pixels...
```

### All Fields Are Editable

After concept selection:
- ✅ Review all auto-populated fields
- ✅ Modify any section if needed
- ✅ Add custom touches
- ✅ Or generate as-is!

## Generation Workflow

### Complete VN Asset Set Generation

**Generate all 16 assets systematically:**

1. **Character Sprites (6 assets)**
   ```
   Select: VN Sprite: Zara Neutral → Generate → Save as zara_neutral_full.png
   Select: VN Sprite: Zara Smile → Generate → Save as zara_smile_full.png
   Select: VN Sprite: Zara Flirty → Generate → Save as zara_flirty_full.png
   Select: VN Sprite: Zara Shy → Generate → Save as zara_shy_full.png
   Select: VN Sprite: Zara Studio Outfit → Generate → Save as zara_studio_outfit.png
   Select: VN Sprite: Zara Boudoir Outfit → Generate → Save as zara_boudoir_outfit.png
   ```

2. **Backgrounds (5 assets)**
   ```
   Select: VN BG: Art Gallery → Generate → Save as bg_art_gallery.png
   Select: VN BG: Photography Studio → Generate → Save as bg_photography_studio.png
   Select: VN BG: Luxury Bedroom → Generate → Save as bg_luxury_bedroom.png
   Select: VN BG: Upscale Cafe → Generate → Save as bg_upscale_cafe.png
   Select: VN BG: Fashion Showroom → Generate → Save as bg_fashion_showroom.png
   ```

3. **CG Images (5 assets)**
   ```
   Select: VN CG: First Meeting → Generate → Save as cg_first_meeting.png
   Select: VN CG: Studio Photoshoot → Generate → Save as cg_studio_photoshoot.png
   Select: VN CG: Viewing Photos Together → Generate → Save as cg_viewing_photos.png
   Select: VN CG: Boudoir Photoshoot → Generate → Save as cg_boudoir_session.png
   Select: VN CG: Intimate Connection → Generate → Save as cg_intimate_moment.png
   ```

4. **Place files in correct directories:**
   ```
   visualnovel/assets/sprites/zara_*.png
   visualnovel/assets/backgrounds/bg_*.png
   visualnovel/assets/cg/cg_*.png
   ```

5. **Restart Visual Novel:**
   ```bash
   npm run dev:vn
   ```

6. **Verify in-game** - All assets should load automatically!

## Generation Settings

### Recommended Provider: Imagen 4.0

Best for sprites with transparency:
- ✅ Native alpha transparency support
- ✅ Excellent at following detailed prompts
- ✅ High-quality character rendering
- ✅ Perfect for photorealistic portraits

**Settings:**
- Guidance Scale: 15
- Safety: block_few
- Person Generation: allow_all
- Add Watermark: false

### Alternative: Flux Pro Ultra

Also works well:
- ✅ Raw mode for photorealistic quality
- ✅ Quality: 100%
- ✅ Safety Tolerance: 6

**Note:** May need manual background removal (see REMOVE_WHITE_BACKGROUNDS.md)

## Tips for Best Results

### Sprite Generation

1. **Transparency is Critical**
   - Prompts include "PNG with alpha transparency"
   - Prompts include "PURE TRANSPARENT BACKGROUND"
   - If white background appears, use remove.bg or tools from REMOVE_WHITE_BACKGROUNDS.md

2. **Consistent Character**
   - All sprite concepts use same character description
   - Zara Cinématique specifications are consistent
   - This ensures character looks same across all sprites

3. **Full Body Framing**
   - All sprites specify "full body" framing
   - Shows character from head to toe
   - Proper for visual novel sprite compositing

### Background Generation

1. **Clear Foreground Space**
   - All backgrounds specify "clear foreground for character placement"
   - Lower third kept clear for sprites
   - Depth and bokeh in background

2. **NO People**
   - All background prompts specify "NO people visible"
   - Sprites go on separate layer
   - Clean compositing without conflicts

3. **Consistent Quality**
   - All backgrounds use cinematic photography specs
   - Professional architectural/environmental photography
   - Steam-release/commercial VN quality

### CG Image Generation

1. **Emotional Storytelling**
   - CG concepts focus on key emotional moments
   - Shallow depth of field (f/1.4-f/2.0)
   - Cinematic color grading (A24 quality)

2. **Character Context**
   - Zara integrated into scene environment
   - NOT isolated on transparent background
   - Full scene composition with context

3. **Narrative Beats**
   - Each CG represents important story moment
   - First meeting, creative collaboration, emotional vulnerability, etc.
   - Use at key dialogue moments for maximum impact

## Troubleshooting

### Issue: Generated sprite has white background instead of transparent

**Solutions:**
1. **Use Imagen 4.0** - Better native transparency support
2. **Manual removal** - See `REMOVE_WHITE_BACKGROUNDS.md` for 5 methods
3. **CSS workarounds** - Current VN code has edge masks (temporary)

### Issue: Character doesn't look consistent across sprites

**Solutions:**
1. **Use same generation session** - Generate all sprites in one sitting
2. **Same provider** - Don't mix Imagen and Flux for same character
3. **Review base prompt** - All concepts use same Zara description

### Issue: Background has people in it

**Solutions:**
1. **Regenerate** - Background prompts specify "NO people"
2. **Edit prompt** - Add "EMPTY SPACE, no people, no figures"
3. **Photoshop** - Remove people manually if otherwise perfect

### Issue: Wrong aspect ratio

**Solutions:**
1. **Check specifications** - Concept auto-sets correct ratio
2. **Sprites**: Should be 9:16 (1024x2048)
3. **Backgrounds/CGs**: Should be 16:9 (1920x1080)

## Advantages of This Approach

### vs. Separate VN Asset Generator Mode

| Aspect | Concept Selector (New) | VN Asset Generator Mode (Old) |
|--------|----------------------|-------------------------------|
| **Access** | Always available in main app | Need to switch modes |
| **Workflow** | Select concept → Generate | Navigate to mode → Select asset → Generate |
| **Customization** | All fields editable after selection | Limited editing |
| **Visibility** | All concepts visible in one list | Assets in separate interface |
| **Integration** | Seamless with main workflow | Separate workflow |

### Key Benefits

1. **No Mode Switching** - Stay in main app
2. **Full Customization** - Edit any field after concept selection
3. **Better Organized** - All concepts in one place
4. **Faster Workflow** - Select and generate immediately
5. **Consistent Quality** - Uses main app's generation engine

## File Naming Convention

After generation, save files with these exact names:

**Sprites:**
- `zara_neutral_full.png`
- `zara_smile_full.png`
- `zara_flirty_full.png`
- `zara_shy_full.png`
- `zara_studio_outfit.png`
- `zara_boudoir_outfit.png`

**Backgrounds:**
- `bg_art_gallery.png`
- `bg_photography_studio.png`
- `bg_luxury_bedroom.png`
- `bg_upscale_cafe.png`
- `bg_fashion_showroom.png`

**CG Images:**
- `cg_first_meeting.png`
- `cg_studio_photoshoot.png`
- `cg_viewing_photos.png`
- `cg_boudoir_session.png`
- `cg_intimate_moment.png`

Place in: `visualnovel/assets/[sprites|backgrounds|cg]/`

## Next Steps

1. **Pull latest changes:**
   ```bash
   git pull origin claude/fix-gallery-section-error-01C1VLtMeNjuvodxifQ8HQQJ
   ```

2. **Start main app:**
   ```bash
   npm run dev
   ```

3. **Generate all 16 assets** using concept selector

4. **Save with correct filenames** in visualnovel/assets/

5. **Start Visual Novel:**
   ```bash
   npm run dev:vn
   ```

6. **Enjoy your complete Visual Novel game!** 🎮✨

---

**Pro Tip:** Generate sprites first, then backgrounds, then CG images. This helps maintain consistency in character appearance and lets you verify transparency before moving to more complex compositions.
