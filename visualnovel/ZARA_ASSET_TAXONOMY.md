# Zara — Chapter 1: Light & Shadow
## Comprehensive Asset Taxonomy & Generation Specifications

**Story Context**: A choice-driven fashion photography visual novel exploring creative collaboration, power dynamics, and aesthetic decisions across 4 distinct shooting modes (Experimental, Platinum, Vera, Artistic).

**Character**: Zara — Indian model, age 25, height 5'7", classic hourglass figure (38DD-27-39), fair complexion with warm undertones, long flowing black hair, intensely expressive brown eyes, dramatic facial structure.

---

## Asset Categories

### 1. CHARACTER SPRITES — Zara (16 variants)

#### A. Emotional State Variants (Base Wardrobe: Casual Arrival)
1. **zara_neutral** — Professional, calm expression, soft smile
2. **zara_confident** — Chin up, commanding presence, direct gaze
3. **zara_vulnerable** — Soft eyes, slight head tilt, open expression
4. **zara_playful** — Genuine laugh, eyes bright, relaxed posture
5. **zara_thoughtful** — Introspective, looking away, contemplative
6. **zara_uncomfortable** — Subtle tension, guarded posture
7. **zara_trusting** — Relaxed shoulders, warm smile, direct eye contact
8. **zara_professional** — Poised, model-ready stance

#### B. Mode-Specific Wardrobe Variants
9. **zara_experimental** — Draped conceptual fabric, silhouette emphasis, edgy styling
10. **zara_platinum** — Luxury lingerie with draped silk, glamorous styling
11. **zara_vera** — Intimate portrait attire, emotional honesty styling
12. **zara_artistic** — Sculptural wrap, Newton-esque art nude preparation

#### C. Story-Specific Moments
13. **zara_lighttest** — Standing under lighting setup, technical pose
14. **zara_crisis_reveal** — Mid-shoot emotional moment, personal memory expression
15. **zara_climax_direction** — Receiving final direction, focused intensity
16. **zara_wrap_review** — Relaxed, reviewing photos, satisfied expression

**Sprite Specifications**:
- Format: PNG with alpha transparency
- Resolution: 1080x1920 (9:16 portrait for full-body sprites)
- Style: Photorealistic fashion photography aesthetic
- Lighting: Natural, studio-quality, matching scene context
- Consistency: Maintain Zara's distinctive features across all variants

---

### 2. BACKGROUNDS — Studio Settings (10 variants)

#### A. Scene-Specific Environments
1. **bg_studio_morning_arrival** — Minimal white studio, cool daylight through blinds, clean professional space
2. **bg_wardrobe_area** — Wardrobe racks with fabric samples, softboxes visible, styling station
3. **bg_studio_center_neutral** — Studio center, one key light visible, white backdrop, professional setup
4. **bg_studio_highcontrast** — Newton-inspired dramatic rim lighting, strong shadows, sculptural atmosphere
5. **bg_studio_softglow** — Diffused lighting, intimate portraiture setup, warm tones
6. **bg_studio_experimental** — Edgy setup with unusual props, conceptual lighting, high-contrast aesthetic
7. **bg_studio_platinum** — Luxury editorial setup, jewel-toned accents, polished glamorous atmosphere
8. **bg_studio_vera** — Intimate close-up setting, emotional portraiture environment, soft focused
9. **bg_studio_artistic** — Minimal sculptural setting, chiaroscuro lighting, museum-quality aesthetic
10. **bg_studio_wrap** — End-of-day studio, equipment being packed, warm casual atmosphere

**Background Specifications**:
- Format: JPG/PNG
- Resolution: 1920x1080 (16:9 landscape)
- Style: Photorealistic professional photography studio
- Lighting: Matches narrative beat and chosen mode
- Details: Include authentic studio equipment (softboxes, light stands, backdrops, camera gear)

---

### 3. CG IMAGES — Pivotal Story Moments (14 images)

#### Scene 1: Arrival & Briefing
1. **cg_first_greeting** — Zara and photographer (viewer POV hand/shoulder visible) meeting in morning studio, warm professional energy

#### Scene 2: Wardrobe & Light Test
2. **cg_lighttest_technical** — Zara standing under lighting setup, technical preparation moment
3. **cg_equipment_hiccup** — Light stand slipping, creating dramatic spontaneous shadow opportunity
4. **cg_consent_moment** — (If artistic mode) Zara and photographer discussing boundaries, serious professional conversation

#### Scene 3: First Frame
5. **cg_first_frame_vulnerable** — Close-up portrait, vulnerable soft expression, breathtaking emotional capture
6. **cg_first_frame_commanding** — Strong editorial portrait, chin up, commanding presence
7. **cg_first_frame_playful** — Candid laugh, spontaneous joyful moment

#### Scene 4: Crisis & Choice
8. **cg_personal_reveal** — Zara sharing personal memory mid-shoot, intimate emotional moment, photographer listening (partial viewer POV)

#### Scene 5: Climactic Frame (Mode-Specific)
9. **cg_climax_experimental** — Edgy silhouette study, high-contrast, conceptual props, metaphorical composition
10. **cg_climax_platinum** — Luxury editorial glamour, implied nudity with draped fabrics, jewel tones, polished sophistication
11. **cg_climax_vera** — Intimate emotional portrait, close-up, honest vulnerable expression, soft lighting
12. **cg_climax_artistic** — Sculptural art-nude study, Newton-inspired chiaroscuro, tasteful non-explicit, form and shadow emphasis

#### Scene 6: Wrap & Aftermath
13. **cg_camera_back_review** — Zara and photographer looking at camera LCD screen together, reviewing the day's work
14. **cg_wrap_satisfaction** — End-of-shoot moment, Zara satisfied and relaxed, equipment being packed

**CG Specifications**:
- Format: JPG (high quality)
- Resolution: 1920x1080 (16:9 cinematic)
- Style: Professional fashion photography aesthetic, specific to mode
- Viewer POV: Player perspective (hands/shoulders occasionally visible as photographer)
- Composition: Cinematic, emotionally resonant, narrative-driving
- Content: Follows mode guidelines (experimental=conceptual, platinum=luxury, vera=intimate, artistic=tasteful art-nude)

---

### 4. UI ELEMENTS (12 elements)

#### A. Mode Selection & Navigation
1. **ui_mode_card_experimental** — Mode selector card with icon, description, intimacy level indicator
2. **ui_mode_card_platinum** — Platinum mode selector with luxury aesthetic
3. **ui_mode_card_vera** — Vera mode selector with intimate portrait styling
4. **ui_mode_card_artistic** — Artistic mode selector with fine art aesthetic

#### B. Consent & Safety
5. **ui_consent_modal** — Explicit consent dialog overlay with clear yes/no options
6. **ui_comfort_meter** — Visual indicator for ZaraComfort variable (thermometer or gauge style)
7. **ui_trust_indicator** — Heart/connection icon showing Trust level

#### C. Camera & Technical Interface
8. **ui_camera_viewfinder** — Photographer POV camera overlay with focus points, settings visible
9. **ui_light_meter** — Professional light meter display showing exposure settings
10. **ui_histogram** — RGB histogram display for technical photography authenticity
11. **ui_shutter_frame** — Camera shutter animation frame overlay

#### D. Variable Tracking
12. **ui_variable_hud** — Minimal HUD showing ZaraComfort, Trust, ArtisticCohesion as small indicators

**UI Specifications**:
- Format: PNG with alpha transparency
- Resolution: Varies by element (maintain 2x retina quality)
- Style: Clean, professional photography software aesthetic
- Color palette: Muted blacks, whites, subtle accent colors
- Readability: High contrast, clear typography

---

### 5. LOCATION MAPS & MISC (6 elements)

1. **map_studio_overview** — Top-down diagram of studio layout showing different shooting areas
2. **misc_title_screen** — "Zara — Chapter 1: Light & Shadow" title card with dramatic lighting
3. **misc_mode_selection_bg** — Background for mode selection screen
4. **misc_save_slot_thumbnail** — Template for save game thumbnails showing current scene
5. **misc_achievement_consent** — Achievement badge: "Professional Boundaries" (earned by handling consent properly)
6. **misc_achievement_trust** — Achievement badge: "Creative Trust" (earned by reaching Trust >= 20)

---

## Generation Prompts by Mode

### Experimental Mode Art Direction
**Aesthetic**: Edgy, high-contrast, conceptual. Silhouette and metaphor over skin exposure.
**Lighting**: Strong rim light, dramatic shadows, unusual angles
**Wardrobe**: Draped conceptual fabrics, sculptural forms, minimal coverage but non-explicit
**Props**: Geometric shapes, mirrors, unusual textures
**Reference**: Contemporary art photography, conceptual fashion, body as form

### Platinum Mode Art Direction
**Aesthetic**: Luxury fashion editorial, glamorous, provocative but tasteful
**Lighting**: Soft key light with subtle fill, polished professional
**Wardrobe**: High-end lingerie, draped silk, partial coverage, implied nudity
**Props**: Luxury fabrics, jewel-toned accents, elegant minimalism
**Reference**: Vogue editorials, luxury fashion campaigns, sophisticated glamour

### Vera Mode Art Direction
**Aesthetic**: Mature intimate portraits, emotional honesty, close-ups
**Lighting**: Soft diffused natural light, gentle shadows, warm tones
**Wardrobe**: Simple intimate attire emphasizing vulnerability over sexuality
**Props**: Minimal, focus on expression and connection
**Reference**: Intimate portrait photography, emotional documentary style, honest vulnerability

### Artistic Mode Art Direction
**Aesthetic**: Classic art-nude inspired by fashion masters, sculptural, chiaroscuro
**Lighting**: Dramatic single-source lighting, strong contrast, museum-quality
**Wardrobe**: Minimal to none (tasteful art-nude), emphasis on form and shadow
**Props**: Minimal, classical simplicity
**Reference**: Helmut Newton, Irving Penn, Robert Mapplethorpe (form, not explicitness), fine art nude tradition
**Content Note**: Strictly non-explicit, emphasizes artistic merit, requires consent flags

---

## Character Consistency Guidelines

**Zara's Distinctive Features** (must appear in every asset):
- Indian ethnicity, fair complexion with warm undertones
- Classic hourglass figure: 38DD-27-39, athletic-fit build
- Long flowing black hair with natural shine (typically worn loose, sometimes styled for shoots)
- Intensely expressive brown eyes (key emotional communication tool)
- Dramatic facial structure with high cheekbones
- Distinctive mole on left cheek (beauty mark)
- Height 5'7" (slightly taller than average, professional model stature)
- Age 25 (mature, professional, experienced but not jaded)

**Personality Expression Through Sprites**:
- Confident: Direct eye contact, shoulders back, chin slightly up
- Vulnerable: Softer gaze, slight head tilt, open body language
- Playful: Genuine smile/laugh, crinkled eyes, relaxed posture
- Uncomfortable: Subtle tension in shoulders, guarded arms, averted gaze
- Professional: Neutral pleasant expression, poised stance, model-ready

---

## Technical Generation Settings

### For Character Sprites (PNG with transparency)
```
TECHNICAL SPECS:
- Model: Imagen 4.0 or Flux Pro Ultra
- Format: PNG with alpha channel
- Resolution: 1080x1920 (portrait, 9:16)
- Quality: Maximum (100%)
- Background: Transparent or easily removable
- Lighting: Soft studio light, gentle shadows
- Focus: Tack-sharp on face, slight blur on edges acceptable
```

### For Backgrounds (Photorealistic Environments)
```
TECHNICAL SPECS:
- Model: Imagen 4.0 (preferred for photorealism)
- Format: JPG
- Resolution: 1920x1080 (landscape, 16:9)
- Quality: Maximum
- Style: Photorealistic professional studio photography
- Details: Authentic equipment, realistic lighting, spatial depth
```

### For CG Images (Cinematic Story Moments)
```
TECHNICAL SPECS:
- Model: Imagen 4.0 (best for photorealistic narrative)
- Format: JPG
- Resolution: 1920x1080 (cinematic 16:9)
- Quality: Maximum
- Composition: Rule of thirds, cinematic framing
- Depth of field: Appropriate to mode (shallow for intimate, deeper for editorial)
- Color grading: Mode-appropriate (high contrast B&W for experimental, warm tones for vera, etc.)
```

---

## Asset Count Summary

| Category | Count | Priority |
|----------|-------|----------|
| Character Sprites | 16 | CRITICAL |
| Backgrounds | 10 | CRITICAL |
| CG Images | 14 | HIGH |
| UI Elements | 12 | HIGH |
| Location Maps & Misc | 6 | MEDIUM |
| **TOTAL** | **58** | — |

**Generation Order**:
1. Character Sprites (emotional states first, then mode-specific)
2. Backgrounds (scene order: arrival → wrap)
3. CG Images (pivotal moments in story order)
4. UI Elements (mode selection and consent system first)
5. Location Maps & Misc (polish and completeness)

---

## Story Variable Integration

Assets should visually reflect these tracked variables:

**ZaraComfort** (0-100):
- < 40: Uncomfortable sprite variants, tense body language
- 40-70: Neutral to comfortable variants
- > 70: Trusting, relaxed, open variants

**Trust** (-20 to +30):
- Negative: Guarded expressions, professional distance
- Positive: Warm eye contact, relaxed posture, genuine smiles

**ArtisticCohesion** (0-100):
- Affects which CG variants are unlocked
- Higher cohesion = more stylistically unified final portfolio

**Selected Mode**:
- Determines available wardrobe sprites and CG variants
- Locks/unlocks specific background settings
- Changes UI color schemes and mood

---

## Consent & Content Moderation

**Artistic Mode Specific Assets**:
- All art-nude assets MUST be tasteful, non-explicit, form-focused
- Emphasis on lighting, shadow, and sculptural composition
- NO explicit sexual content, NO graphic detail
- Reference fine art nude tradition (classical sculpture aesthetic)
- Require `RequiresNudityConsent == true` flag before display

**Age Verification**:
- Display age gate before any mature content
- Log verification in session (21+ required)

**Moderation Flags**:
- All intimate/nude assets tagged with content rating
- Consent modal UI must be generated and functional
- Pause/revoke UI must be accessible during sensitive sequences

---

*Document Version*: 1.0
*Author*: Veralabs Creative Direction Team
*Date*: 2025-11-26
*Status*: Ready for Asset Generation Pipeline
