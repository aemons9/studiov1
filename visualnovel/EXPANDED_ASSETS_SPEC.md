# Chapter 1 EXPANDED - Complete Asset Requirements

## Overview
Expansion of Chapter 1 to include comprehensive boudoir and erotic-art photography pathways with progressive intimacy levels.

## New Character Sprites (8 additional wardrobe-specific sprites)

### Intimate Wardrobe Sprites
1. **zara_lingerie_elegant** - Elegant lace lingerie set (boudoir aesthetic)
2. **zara_lingerie_minimal** - Minimal coverage lingerie (sensual boudoir)
3. **zara_silk_robe_open** - Silk robe partially open, intimate yet elegant
4. **zara_artistic_drape_partial** - Artistic fabric draping with partial coverage
5. **zara_minimal_artistic** - Minimal coverage artistic pose (fine art)
6. **zara_boudoir_confident** - Boudoir wardrobe with confident expression
7. **zara_boudoir_vulnerable** - Boudoir wardrobe with vulnerable expression
8. **zara_intimate_trust** - Intimate wardrobe with trusting deep connection

### Total Sprites: 12 original + 8 new = 20 sprites

## New Backgrounds (5 additional intimate locations)

### Boudoir & Intimate Locations
1. **bg_boudoir_bedroom_natural** - Intimate bedroom with soft natural window light, white linens
2. **bg_boudoir_luxury_dramatic** - Luxury bedroom with dramatic lighting, rich fabrics
3. **bg_studio_intimate_corner** - Private corner of studio with soft lighting, intimate setup
4. **bg_dressing_room_private** - Private dressing area with elegant wardrobe displays
5. **bg_natural_light_loft** - Large windows with golden hour natural light, minimal furniture

### Total Backgrounds: 8 original + 5 new = 13 backgrounds

## New CG Images (8 additional intimate moments)

### Intimate Photography Moments
1. **cg_wardrobe_discussion** - Zara and photographer discussing intimate wardrobe options
2. **cg_mirror_preparation** - Zara preparing in mirror wearing intimate wardrobe
3. **cg_first_intimate_portrait** - First intimate photograph moment (breakthrough)
4. **cg_boudoir_pose** - Boudoir photography session in bedroom
5. **cg_artistic_draping_moment** - Photographer arranging artistic fabric on Zara
6. **cg_intimate_close_moment** - Close intimate connection between shoots
7. **cg_climax_boudoir** - Ultimate boudoir photograph (sensual peak)
8. **cg_climax_minimal** - Ultimate minimal artistic photograph (artistic peak)

### Total CG Images: 10 original + 8 new = 18 CG images

## Scene Structure (Expanded from 6 to 10 scenes)

### New Scene Flow
1. **scene_1_arrival** - Arrival & Erotic Art Discussion
2. **scene_2_wardrobe_intimacy** - Wardrobe Reveal & Intimacy Negotiation
3. **scene_3_lighting_comfort** - Technical Setup & Trust Building
4. **scene_4_initial_shoot** - First Photography Session
5. **scene_5_intimacy_gateway** - Decision Point: Progressive Intimacy (NEW)
6. **scene_6_boudoir_session** - Boudoir Photography Session (NEW)
7. **scene_7_artistic_intimacy** - Artistic Intimate Photography (NEW)
8. **scene_8_emotional_depth** - Emotional Connection & Vulnerability (EXPANDED)
9. **scene_9_climax_intimate** - Ultimate Intimate Session (EXPANDED)
10. **scene_10_reflection** - Reflection & Future Possibilities (EXPANDED)

## New Game Variables

- **IntimacyLevel**: 0-100 (tracks progression of intimate content)
- **WardrobeChoice**: string (tracks current wardrobe selection)
- **BoudoirUnlocked**: boolean (unlocks boudoir location access)
- **Flag_LingerieUsed**: boolean
- **Flag_ArtisticDrapeUsed**: boolean
- **Flag_MinimalCoverageUsed**: boolean
- **Flag_BoudoirSessionDone**: boolean

## New Shooting Modes

- **fashion** - Professional fashion photography
- **boudoir_elegant** - Elegant sophisticated boudoir
- **boudoir_sensual** - Sensual bedroom photography
- **artistic_intimate** - Intimate fine art photography
- **minimal_artistic** - Minimal coverage artistic
- **experimental** - Experimental avant-garde (retained)
- **platinum** - Luxury glamour (retained)
- **vera** - Intimate emotional portraits (retained)

## Wardrobe Types

- **professional** - Business/fashion attire
- **lingerie_elegant** - Sophisticated lace lingerie
- **lingerie_minimal** - Minimal coverage lingerie
- **silk_robe** - Silk robe (open/closed variations)
- **artistic_drape** - Artistic fabric draping
- **minimal_coverage** - Minimal artistic coverage

## Content Ratings

- **general** - Fully clothed, professional
- **mature** - Lingerie, sensual but covered
- **erotic_art** - Intimate artistic, partial nudity
- **artistic_nudity** - Fine art nude photography

## Priority Implementation Order

### Phase 1 (Critical - Immediate)
1. Create 5 new boudoir/intimate backgrounds
2. Create 8 new intimate wardrobe character sprites
3. Update assetLoader.ts with new mappings

### Phase 2 (High Priority)
1. Create 8 new intimate CG images
2. Complete scenes 5-10 with full dialogue
3. Update GameStateManager with new variables

### Phase 3 (Enhancement)
1. Update VN Asset Generator UI
2. Add intimacy level progression UI
3. Create consent validation system
4. Implement wardrobe selection UI

## Asset Generation Prompts - Template Structure

All new assets use the updated Zara character baseline:
```
CHARACTER: Zara, Indian erotic-art film athletic glamourous (height 5'9"),
with fit and toned body structure and exact measurements (bust 38D", waist 27", hips 39").
Fair complexion with dramatic lighting potential for cinematic character depth.
Method acting specialist with complete emotional range and authentic character embodiment.
```

### Boudoir Background Template
```
LOCATION: [Specific bedroom/intimate setting]
LIGHTING: [Natural/dramatic lighting description]
FURNISHINGS: [Bed, furniture, props details]
ATMOSPHERE: [Intimate, sensual, artistic mood]
COMPOSITION: [Wide shot showing full space, clear foreground for character]
STYLE: [Fine art boudoir photography, intimate editorial]
TECHNICAL: 1920x1080 (16:9), JPG, photorealistic
```

### Intimate Wardrobe Sprite Template
```
OUTFIT: [Specific intimate wardrobe description]
POSE & EXPRESSION: [Body language and facial expression for intimate context]
EMOTION: [Emotional state - confident, vulnerable, trusting, sensual]
LIGHTING: [Flattering intimate portrait lighting]
BACKGROUND: PURE TRANSPARENT BACKGROUND (alpha channel)
STYLE: Intimate portrait photography, sensual editorial
TECHNICAL: PNG with alpha, 1080x1920 (9:16)
```

## Total Asset Count

### Original Chapter 1:
- 12 sprites + 8 backgrounds + 10 CG images = **30 assets**

### Expanded Chapter 1:
- 20 sprites + 13 backgrounds + 18 CG images = **51 assets**

### Net Addition: **+21 new assets**

## Implementation Notes

- All new assets maintain character consistency with updated Zara baseline
- Progressive intimacy levels require explicit player choices
- Consent validation must be implemented for intimate content
- Multiple endings based on IntimacyLevel, Trust, and ZaraComfort
- Wardrobe changes trigger new sprite loads
- Location changes trigger new background loads
