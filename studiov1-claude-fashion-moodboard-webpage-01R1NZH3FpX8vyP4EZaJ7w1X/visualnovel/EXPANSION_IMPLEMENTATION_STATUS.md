# Chapter 1 Expansion - Implementation Status

## Executive Summary

This document tracks the expansion of Chapter 1 from a 6-scene fashion photography story to a comprehensive 10-scene erotic-art and boudoir photography narrative with progressive intimacy pathways, multiple wardrobe choices, and intimate location variations.

## Expansion Scope

### Original Chapter 1:
- **Scenes**: 6 scenes (Arrival → Wrap)
- **Assets**: 30 total (12 sprites + 8 backgrounds + 10 CG images)
- **Focus**: Fashion photography with 4 aesthetic modes
- **Intimacy**: Limited, primarily professional with artistic nude option

### Expanded Chapter 1:
- **Scenes**: 10 scenes (Arrival → Reflection)
- **Assets**: 51 total (20 sprites + 13 backgrounds + 18 CG images)
- **Focus**: Erotic-art and boudoir photography with progressive intimacy
- **Intimacy**: Multiple levels from professional to intimate artistic
- **New Features**:
  - Boudoir photography sessions
  - Intimate wardrobe progression
  - Multiple location variations
  - Enhanced consent and comfort mechanics
  - IntimacyLevel variable tracking

## Phase 1: Planning & Structure ✅ COMPLETED

### Files Created:

1. **chapterOneExpandedScenes.ts** ✅
   - New GameVariables with IntimacyLevel, WardrobeChoice, BoudoirUnlocked
   - Expanded from 6 to 10 scenes
   - Scenes 1-4 fully implemented with dialogue and choices
   - Scenes 5-10 structure created (placeholder content)
   - New shooting modes: fashion, boudoir_elegant, boudoir_sensual, artistic_intimate, minimal_artistic
   - New wardrobe types: professional, lingerie_elegant, lingerie_minimal, silk_robe, artistic_drape, minimal_coverage

2. **EXPANDED_ASSETS_SPEC.md** ✅
   - Complete list of 21 new assets required
   - 8 new intimate wardrobe character sprites
   - 5 new boudoir/intimate backgrounds
   - 8 new intimate moment CG images
   - Asset generation prompt templates
   - Implementation priority order

3. **EXPANSION_IMPLEMENTATION_STATUS.md** ✅ (this file)
   - Tracks all expansion work
   - Phase-by-phase implementation plan

## Phase 2: Asset Expansion 🔄 IN PROGRESS

### What Needs to Be Done:

#### 2.1 Update assetManifest.ts
- [ ] Add 8 new intimate wardrobe sprite definitions with full prompts
- [ ] Add 5 new boudoir/intimate background definitions with full prompts
- [ ] Add 8 new intimate CG image definitions with full prompts
- [ ] Update COMPLETE_ASSET_MANIFEST to include all new assets
- [ ] Verify all assets use updated Zara character baseline

#### 2.2 Update assetLoader.ts
- [ ] Expand BACKGROUND_MAP with new boudoir locations
  ```typescript
  'bg_boudoir_bedroom_natural': ['scene_6_boudoir_session'],
  'bg_boudoir_luxury_dramatic': ['scene_7_artistic_intimacy', 'scene_9_climax_intimate'],
  'bg_studio_intimate_corner': ['scene_5_intimacy_gateway'],
  'bg_dressing_room_private': ['scene_2_wardrobe_intimacy'],
  'bg_natural_light_loft': ['scene_8_emotional_depth'],
  ```

- [ ] Expand SPRITE_MAP with new intimate wardrobe sprites
  ```typescript
  'zara_lingerie_elegant': 'lingerie_elegant',
  'zara_lingerie_minimal': 'lingerie_minimal',
  'zara_silk_robe_open': 'silk_robe',
  'zara_artistic_drape_partial': 'artistic_drape',
  'zara_minimal_artistic': 'minimal_artistic',
  'zara_boudoir_confident': 'boudoir_confident',
  'zara_boudoir_vulnerable': 'boudoir_vulnerable',
  'zara_intimate_trust': 'intimate_trust',
  ```

- [ ] Expand CG_MAP with new intimate moment CG images
  ```typescript
  'cg_wardrobe_discussion': 'scene_2_wardrobe_intimacy',
  'cg_mirror_preparation': 'scene_2_wardrobe_intimacy',
  'cg_first_intimate_portrait': 'scene_4_initial_shoot',
  'cg_boudoir_pose': 'scene_6_boudoir_session',
  'cg_artistic_draping_moment': 'scene_7_artistic_intimacy',
  'cg_intimate_close_moment': 'scene_8_emotional_depth',
  'cg_climax_boudoir': 'scene_9_climax_intimate',
  'cg_climax_minimal': 'scene_9_climax_intimate',
  ```

- [ ] Update FALLBACK_BACKGROUNDS with new scene IDs
- [ ] Update debugAssetPaths() to show new expected assets

## Phase 3: Scene Content Completion 🔄 IN PROGRESS

### Scenes Requiring Full Implementation:

#### Scene 5: Intimacy Gateway ❌ PENDING
- **Purpose**: Major decision point - maintain current intimacy or progress to boudoir/intimate work
- **Key Choices**:
  - Continue professional path
  - Progress to boudoir session
  - Request artistic intimate progression
- **Unlocks**: Boudoir location, intimate wardrobe options

#### Scene 6: Boudoir Session ❌ PENDING
- **Setting**: Intimate bedroom with natural light
- **Wardrobe**: Lingerie elegant or lingerie minimal
- **Content**: Sensual boudoir photography, trust building through vulnerability
- **Choices**:
  - Maintain elegant coverage
  - Progress to minimal lingerie
  - Add silk robe for artistic variation

#### Scene 7: Artistic Intimacy ❌ PENDING
- **Setting**: Studio intimate corner or luxury boudoir
- **Wardrobe**: Artistic drape or silk robe
- **Content**: Fine art intimate photography emphasizing form and emotion
- **Choices**:
  - Focus on emotional connection
  - Emphasize artistic form
  - Progress to minimal coverage

#### Scene 8: Emotional Depth ❌ PENDING
- **Setting**: Natural light loft - intimate conversation space
- **Purpose**: Deep personal connection, vulnerability sharing
- **Content**: Midpoint emotional breakthrough similar to original scene_4_midpoint
- **Unlocks**: Deepest intimacy options for scene 9

#### Scene 9: Climax Intimate ❌ PENDING
- **Setting**: Mode-specific (boudoir luxury or studio dramatic)
- **Wardrobe**: Determined by chosen path (lingerie, artistic drape, or minimal)
- **Content**: Ultimate intimate photography session - culmination of trust and artistry
- **Multiple Paths**:
  - Boudoir climax (sensual peak)
  - Artistic climax (fine art peak)
  - Emotional climax (connection peak)

#### Scene 10: Reflection ❌ PENDING
- **Setting**: Studio wrap or boudoir natural light
- **Content**: Review portfolio together, discuss what was created, future collaboration
- **Endings**: Based on IntimacyLevel, Trust, ZaraComfort, and ArtisticCohesion

## Phase 4: VN Asset Generator Update ❌ PENDING

### What Needs to Be Done:

1. **UI Updates**:
   - [ ] Add section for "Boudoir & Intimate Assets"
   - [ ] Create tabs or categories: "Original 30" vs "Expanded +21"
   - [ ] Add wardrobe filter: Professional, Boudoir, Artistic Intimate
   - [ ] Add location filter: Studio, Boudoir, Natural Light

2. **Generation Logic**:
   - [ ] Update asset manifest import to include expanded assets
   - [ ] Add generation for intimate wardrobe sprites
   - [ ] Add generation for boudoir backgrounds
   - [ ] Add generation for intimate CG moments
   - [ ] Ensure Zara character consistency across all new assets

3. **Progress Tracking**:
   - [ ] Show "51 total assets" instead of "30 total assets"
   - [ ] Separate counters: "Original: X/30" and "Expanded: X/21"
   - [ ] Add content rating indicators (general/mature/erotic_art/artistic_nudity)

## Phase 5: Game System Updates ❌ PENDING

### GameStateManager.ts Updates:
- [ ] Add IntimacyLevel to ExtendedGameState interface
- [ ] Add WardrobeChoice to ExtendedGameState
- [ ] Add BoudoirUnlocked to ExtendedGameState
- [ ] Add new flag variables
- [ ] Expand Trust range from +30 to +50
- [ ] Create INITIAL_GAME_STATE with new variables

### RealVisualNovel.tsx Updates:
- [ ] Import chapterOneExpandedScenes instead of chapterOneScenes
- [ ] Add IntimacyLevel display in UI
- [ ] Add wardrobe indicator
- [ ] Update variable display to show all new tracked values

## Phase 6: Testing & Validation ❌ PENDING

### Test Scenarios:
1. **Professional Path**: Stay professional throughout → moderate trust ending
2. **Gradual Progression**: Fashion → Lingerie → Boudoir → High trust ending
3. **Artistic Path**: Skip to artistic intimate → requires high initial trust
4. **Consent Boundary**: Try to progress too fast → comfort drops, trust damaged
5. **Boudoir Excellence**: Focus on boudoir → unlock boudoir master ending
6. **Emotional Connection**: Prioritize trust and comfort → unlock intimate artist ending

### Validation Checklist:
- [ ] All scene transitions work correctly
- [ ] Choice conditions evaluate properly
- [ ] Variable effects apply correctly
- [ ] Asset references match assetManifest IDs
- [ ] Consent mechanics prevent unwanted progression
- [ ] Multiple playthroughs reach different endings

## Implementation Timeline Estimate

### Immediate (Phase 2): ~3-4 hours
- Update assetManifest.ts with 21 new asset definitions
- Update assetLoader.ts with new mappings

### Near-term (Phase 3): ~4-5 hours
- Complete scenes 5-10 with full dialogue and choices
- Ensure narrative coherence and emotional progression

### Medium-term (Phase 4): ~2-3 hours
- Update VN Asset Generator UI and logic
- Test asset generation for new intimate assets

### Final (Phases 5-6): ~2-3 hours
- Update game systems
- Comprehensive testing
- Bug fixes and polish

**Total Estimated Time**: 11-15 hours of focused development

## Current Status Summary

✅ **Completed**:
- Expansion planning and specification
- Scene structure (10 scenes with scenes 1-4 fully implemented)
- New variable system designed
- Asset requirements documented

🔄 **In Progress**:
- Awaiting implementation of Phase 2 (Asset Expansion)

❌ **Pending**:
- Phases 2-6 (Asset updates, scene completion, VN generator, testing)

## Next Steps

1. **Immediate**: Update assetManifest.ts with 21 new asset definitions
2. **Then**: Update assetLoader.ts with new asset mappings
3. **Then**: Complete scenes 5-10 with full dialogue
4. **Then**: Update VN Asset Generator page
5. **Finally**: Test all pathways and commit

## Notes

- This expansion transforms Chapter 1 from fashion photography to comprehensive erotic-art narrative
- Maintains original 6-scene structure as "professional path" option
- Adds 4 new scenes for players choosing intimate progression
- All intimate content gated by explicit consent choices
- Multiple endings based on path chosen (professional, boudoir, artistic, emotional)
- Estimated +21 new assets to generate (51 total from 30 original)
