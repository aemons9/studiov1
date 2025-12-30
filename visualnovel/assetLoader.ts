/**
 * Asset Loader Service - Bridge between generated assets and Visual Novel game
 *
 * This service:
 * 1. Loads generated assets from local file system only
 * 2. Maps asset IDs to scene/character references
 * 3. Provides fallback URLs if assets not generated
 * 4. Hot-reloads when new assets are generated
 *
 * Asset Priority: File System → Unsplash Fallback
 */

import { COMPLETE_ASSET_MANIFEST, type AssetRequirement } from './assetManifest';

// Dynamically import all assets from the file system using Vite's glob import
// This makes assets available at runtime without localStorage size limits
// Note: Supports both PNG and JPG formats
// OPTIMIZATION: eager: false for lazy loading - assets loaded on demand, not bundled upfront
const fileSystemAssets = import.meta.glob<{ default: string }>('./assets/**/*.{png,jpg,jpeg,webp,mp4,mp3,wav}', {
  eager: false,
  import: 'default'
});

export interface LoadedAssets {
  backgrounds: Record<string, string>; // sceneId -> imageUrl from file system
  sprites: Record<string, string>;     // expressionKey -> imageUrl from file system
  cg: Record<string, string>;          // cgId -> imageUrl from file system
  ui: Record<string, string>;          // uiId -> imageUrl from file system
  maps: Record<string, string>;        // mapId -> imageUrl from file system
  lastUpdated: number;                 // Timestamp for hot-reload detection
}

/**
 * Map asset IDs from assetManifest to RealVisualNovel scene backgrounds
 * These map to the actual asset IDs in assetManifest.ts
 *
 * EXPANDED STORY: Chapter 1: Erotic Art & Boudoir Photography (10 scenes)
 * Scene IDs: scene_1_arrival, scene_2_wardrobe_intimacy, scene_3_lighting_comfort,
 *            scene_4_initial_shoot, scene_5_intimacy_gateway, scene_6_boudoir_session,
 *            scene_7_artistic_intimacy, scene_8_emotional_depth, scene_9_climax_intimate,
 *            scene_10_reflection
 */
const BACKGROUND_MAP: Record<string, string[]> = {
  // Studio - Morning Arrival (Scene 1)
  'bg_studio_morning_arrival': ['scene_1_arrival'],

  // Wardrobe & Styling Area (Scenes 1 & 2)
  'bg_wardrobe_styling': ['scene_1_arrival', 'scene_2_wardrobe_intimacy'],

  // Studio Center - Neutral Professional Setup (Scenes 3 & 4)
  'bg_studio_neutral_setup': ['scene_3_lighting_comfort', 'scene_4_initial_shoot'],

  // Studio - High Contrast Dramatic (Scene 4 & 9, Experimental mode)
  'bg_studio_highcontrast': ['scene_4_initial_shoot', 'scene_9_climax_intimate'],

  // Studio - Soft Glow Intimate (Scenes 3 & 4)
  'bg_studio_softglow': ['scene_3_lighting_comfort', 'scene_4_initial_shoot'],

  // Studio - Experimental Conceptual (Scene 9, Experimental mode)
  'bg_studio_experimental': ['scene_9_climax_intimate'],

  // Studio - Platinum Luxury (Scene 9, Platinum mode)
  'bg_studio_platinum': ['scene_9_climax_intimate'],

  // Studio - End of Day Wrap (Scene 10)
  'bg_studio_wrap': ['scene_10_reflection'],

  // === NEW BOUDOIR & INTIMATE LOCATIONS (Expansion) ===

  // Boudoir - Intimate Bedroom Natural Light (Scenes 6 & 8)
  'bg_boudoir_bedroom_natural': ['scene_6_boudoir_session', 'scene_8_emotional_depth'],

  // Boudoir - Luxury Dramatic (Scenes 7 & 9)
  'bg_boudoir_luxury_dramatic': ['scene_7_artistic_intimacy', 'scene_9_climax_intimate'],

  // Studio - Intimate Private Corner (Scenes 5 & 7)
  'bg_studio_intimate_corner': ['scene_5_intimacy_gateway', 'scene_7_artistic_intimacy'],

  // Private Dressing Room (Scene 2)
  'bg_dressing_room_private': ['scene_2_wardrobe_intimacy'],

  // Natural Light Loft (Scenes 8 & 10)
  'bg_natural_light_loft': ['scene_8_emotional_depth', 'scene_10_reflection'],
};

/**
 * Map sprite asset IDs to expression keys used in dialogue
 *
 * EXPANDED STORY: Character sprite assets map to emotion strings used in DialogueLine.emotion
 * Available sprites: 12 core emotional states + 4 mode variants + 8 intimate wardrobe sprites
 */
const SPRITE_MAP: Record<string, string> = {
  // Core Emotional States (6 base sprites)
  'zara_neutral': 'neutral',
  'zara_confident': 'confident',
  'zara_vulnerable': 'vulnerable',
  'zara_playful': 'playful',
  'zara_uncomfortable': 'uncomfortable',
  'zara_trusting': 'trusting',

  // Mode-Specific Wardrobe Variants (4 mode sprites)
  'zara_experimental': 'experimental',
  'zara_platinum': 'platinum',
  'zara_vera': 'vera',
  'zara_artistic': 'artistic',

  // Story-Specific Moments (2 special sprites)
  'zara_crisis_reveal': 'crisis_reveal',
  'zara_wrap_satisfied': 'satisfied',

  // Additional emotion mappings for dialogue compatibility
  'zara_professional': 'professional',
  'zara_thoughtful': 'thoughtful',
  'zara_curious': 'curious',
  'zara_excited': 'excited',
  'zara_hopeful': 'hopeful',

  // === NEW INTIMATE WARDROBE SPRITES (Boudoir Expansion) ===

  // Lingerie Wardrobe Sprites
  'zara_lingerie_elegant': 'lingerie_elegant',
  'zara_lingerie_minimal': 'lingerie_minimal',

  // Intimate Attire Sprites
  'zara_silk_robe_open': 'silk_robe',
  'zara_artistic_drape_partial': 'artistic_drape',
  'zara_minimal_artistic': 'minimal_artistic',

  // Boudoir Expression Variants
  'zara_boudoir_confident': 'boudoir_confident',
  'zara_boudoir_vulnerable': 'boudoir_vulnerable',

  // Deep Emotional Connection
  'zara_intimate_trust': 'intimate_trust',
};

/**
 * Map CG asset IDs to special event scenes
 * These map to the actual asset IDs in assetManifest.ts
 *
 * EXPANDED STORY: 18 pivotal CG images for narrative moments (10 original + 8 new intimate)
 */
const CG_MAP: Record<string, string> = {
  // Scene 1: Arrival & Erotic Art Discussion
  'cg_first_greeting': 'scene_1_arrival',

  // Scene 2: Wardrobe & Intimacy Negotiation
  'cg_wardrobe_discussion': 'scene_2_wardrobe_intimacy',
  'cg_mirror_preparation': 'scene_2_wardrobe_intimacy',

  // Scene 3: Lighting & Comfort Building
  'cg_lighttest': 'scene_3_lighting_comfort',
  'cg_equipment_hiccup': 'scene_3_lighting_comfort',

  // Scene 4: Initial Shoot
  'cg_first_frame_vulnerable': 'scene_4_initial_shoot',
  'cg_first_frame_commanding': 'scene_4_initial_shoot',
  'cg_first_intimate_portrait': 'scene_4_initial_shoot',

  // Scene 6: Boudoir Session
  'cg_boudoir_pose': 'scene_6_boudoir_session',

  // Scene 7: Artistic Intimacy
  'cg_artistic_draping_moment': 'scene_7_artistic_intimacy',

  // Scene 8: Emotional Depth (Midpoint)
  'cg_personal_reveal': 'scene_8_emotional_depth',
  'cg_intimate_close_moment': 'scene_8_emotional_depth',

  // Scene 9: Climax Intimate (mode-specific)
  'cg_climax_experimental': 'scene_9_climax_intimate',
  'cg_climax_platinum': 'scene_9_climax_intimate',
  'cg_climax_vera': 'scene_9_climax_intimate',
  'cg_climax_boudoir': 'scene_9_climax_intimate',
  'cg_climax_minimal': 'scene_9_climax_intimate',

  // Scene 10: Reflection & Future
  'cg_camera_back_review': 'scene_10_reflection',
};

/**
 * Fallback URLs (Unsplash images used when assets not yet generated)
 *
 * EXPANDED STORY: Fallback backgrounds for expanded Chapter 1 (10 scenes)
 */
const FALLBACK_BACKGROUNDS: Record<string, string> = {
  // Scene 1: Arrival & erotic art discussion
  'scene_1_arrival': 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=1920',

  // Scene 2: Wardrobe intimacy negotiation
  'scene_2_wardrobe_intimacy': 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1920',

  // Scene 3: Lighting comfort building
  'scene_3_lighting_comfort': 'https://images.unsplash.com/photo-1558365849-6ebd8b0454b2?w=1920',

  // Scene 4: Initial shoot
  'scene_4_initial_shoot': 'https://images.unsplash.com/photo-1616594266787-088c647e2c42?w=1920',

  // Scene 5: Intimacy gateway decision
  'scene_5_intimacy_gateway': 'https://images.unsplash.com/photo-1569683795645-b62e50fbf103?w=1920',

  // Scene 6: Boudoir session
  'scene_6_boudoir_session': 'https://images.unsplash.com/photo-1595433562696-a8a6d6ce8b9d?w=1920',

  // Scene 7: Artistic intimacy
  'scene_7_artistic_intimacy': 'https://images.unsplash.com/photo-1616594266787-088c647e2c42?w=1920',

  // Scene 8: Emotional depth midpoint
  'scene_8_emotional_depth': 'https://images.unsplash.com/photo-1569683795645-b62e50fbf103?w=1920',

  // Scene 9: Climax intimate session
  'scene_9_climax_intimate': 'https://images.unsplash.com/photo-1595433562696-a8a6d6ce8b9d?w=1920',

  // Scene 10: Reflection and future
  'scene_10_reflection': 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=1920',
};

/**
 * Mapping from asset IDs to actual generated filenames
 * This handles the mismatch between expected IDs and generated filenames
 */
const ASSET_FILENAME_MAP: Record<string, string> = {
  // Backgrounds (JPG files, no 'bg_' prefix)
  'bg_studio_morning_arrival': 'studio_morning_arrival.jpg',
  'bg_wardrobe_styling': 'studio_wardrobe_styling_area.jpg',
  'bg_studio_neutral_setup': 'studio_center_neutral_professional_setup.jpg',
  'bg_studio_softglow': 'studio_soft_glow_intimate.jpg',
  'bg_boudoir_bedroom_natural': 'boudoir_bedroom_natural_light.jpg',
  'bg_boudoir_luxury_dramatic': 'boudoir_luxury_dramatic.jpg',
  'bg_studio_intimate_corner': 'studio_intimate_private_corner.jpg',
  'bg_dressing_room_private': 'private_dressing_room.jpg',
  'bg_natural_light_loft': 'natural_light_loft_space.jpg',

  // Character Sprites (PNG files with descriptive suffixes)
  'zara_neutral': 'zara_neutral_professional.png',
  'zara_confident': 'zara_confident_commanding.png',
  'zara_vulnerable': 'zara_vulnerable_open.png',
  'zara_playful': 'zara_playful_joyful.png',
  'zara_uncomfortable': 'zara_uncomfortable_guarded.png',
  'zara_trusting': 'zara_trusting_comfortable.png',
  'zara_experimental': 'zara_experimental_mode.png',
  'zara_platinum': 'zara_platinum_mode.png',
  'zara_vera': 'zara_vera_mode.png',
  'zara_artistic': 'zara_artistic_mode.png',
  'zara_wrap_satisfied': 'zara_end_of_day_relaxed.png',
  'zara_lingerie_elegant': 'zara_elegant_lingerie.png',
  'zara_lingerie_minimal': 'zara_minimal_lingerie.png',
  'zara_silk_robe_open': 'zara_silk_robe_partially_open.png',
  'zara_artistic_drape_partial': 'zara_artistic_fabric_draping.png',
  'zara_minimal_artistic': 'zara_minimal_artistic_coverage.png',
  'zara_boudoir_confident': 'zara_boudoir_confident.png',
  'zara_boudoir_vulnerable': 'zara_boudoir_vulnerable.png',
  'zara_intimate_trust': 'zara_deep_intimate_trust.png',

  // CG Images (JPG files)
  'cg_first_greeting': 'cg_first_greeting.jpg',
  'cg_wardrobe_discussion': 'cg_wardrobe_discussion.jpg',
  'cg_mirror_preparation': 'cg_mirror_preparation.jpg',
  'cg_lighttest': 'cg_light_test_preparation.jpg',
  'cg_equipment_hiccup': 'cg_equipment_hiccup_dramatic_shadow.jpg',
  'cg_first_frame_vulnerable': 'cg_first_frame_vulnerable_portrait.jpg',
  'cg_first_frame_commanding': 'cg_first_frame_commanding_editorial.jpg',
  'cg_first_intimate_portrait': 'cg_first_intimate_portrait.jpg',
  'cg_boudoir_pose': 'cg_boudoir_session.jpg',
  'cg_artistic_draping_moment': 'cg_artistic_fabric_draping.jpg',
  'cg_personal_reveal': 'cg_personal_revelation.jpg',
  'cg_intimate_close_moment': 'cg_intimate_connection_moment.jpg',
  'cg_climax_experimental': 'cg_climactic_shot_experimental.jpg',
  'cg_climax_platinum': 'cg_climactic_shot_platinum.jpg',
  'cg_climax_vera': 'cg_climactic_shot_vera.jpg',
  'cg_climax_boudoir': 'cg_climactic_boudoir.jpg',
  'cg_climax_minimal': 'cg_climactic_minimal_artistic.jpg',
};

/**
 * Get asset filename from asset ID using our naming convention
 *
 * Naming convention:
 * - Character sprites: zara_*.png (e.g., zara_neutral_professional.png)
 * - Backgrounds: *.jpg without bg_ prefix (e.g., studio_morning_arrival.jpg)
 * - CG images: cg_*.jpg (e.g., cg_first_greeting.jpg)
 * - UI elements: ui_*.png (e.g., ui_dialogue_box.png)
 * - Location maps: map_*.png (e.g., map_city_overview.png)
 * - BGM: bgm_*.mp3 (e.g., bgm_main_menu.mp3)
 * - SFX: sfx_*.wav (e.g., sfx_ui_click.wav)
 * - Videos: cutscene_*.mp4 (e.g., cutscene_chapter_intro.mp4)
 */
function getAssetFilename(assetId: string): string {
  // Check if we have a custom mapping for this asset
  if (ASSET_FILENAME_MAP[assetId]) {
    return ASSET_FILENAME_MAP[assetId];
  }

  const asset = COMPLETE_ASSET_MANIFEST.find(a => a.id === assetId);
  if (!asset) return `${assetId}.png`;

  // Use the asset ID as the filename, add appropriate extension
  const ext = asset.specifications.format ? asset.specifications.format.toLowerCase() : 'png';
  return `${assetId}.${ext}`;
}

/**
 * Get asset subfolder based on type
 */
function getAssetSubfolder(assetId: string): string {
  const asset = COMPLETE_ASSET_MANIFEST.find(a => a.id === assetId);
  if (!asset) return 'sprites';

  switch (asset.type) {
    case 'character_sprite': return 'sprites';
    case 'background': return 'backgrounds';
    case 'cg_image': return 'cg';
    case 'cutscene_video': return 'videos';
    case 'ui_element': return 'ui';
    case 'bgm': return 'bgm';
    case 'sfx': return 'sfx';
    case 'location_map': return 'maps';
    default: return 'sprites';
  }
}

/**
 * Load a single asset from file system only (async for lazy loading)
 *
 * Returns:
 * - Asset URL if file exists in visualnovel/assets/**
 * - null if not found
 */
async function loadAsset(assetId: string): Promise<string | null> {
  // Load from file system only (now async due to lazy loading)
  try {
    const filename = getAssetFilename(assetId);
    const subfolder = getAssetSubfolder(assetId);
    const path = `./assets/${subfolder}/${filename}`;

    // Check if file exists in our imported assets
    if (fileSystemAssets[path]) {
      console.log(`✅ 📁 Loading ${assetId} from file system: ${path}`);
      const module = await fileSystemAssets[path]();
      return module as string;
    }

    // Try alternative extensions if primary not found
    const alternatives = [
      path.replace(/\.(png|jpg|jpeg)$/, '.png'),
      path.replace(/\.(png|jpg|jpeg)$/, '.jpg'),
      path.replace(/\.(png|jpg|jpeg)$/, '.jpeg'),
      path.replace(/\.(png|jpg|jpeg)$/, '.webp'),
    ];

    for (const altPath of alternatives) {
      if (fileSystemAssets[altPath]) {
        console.log(`✅ 📁 Loading ${assetId} from file system (alternative): ${altPath}`);
        const module = await fileSystemAssets[altPath]();
        return module as string;
      }
    }

    console.log(`❌ Asset not found: ${assetId} (expected at ${path})`);
    console.log(`   Available paths in ${subfolder}:`, Object.keys(fileSystemAssets).filter(p => p.includes(subfolder)).slice(0, 5));
    return null;
  } catch (error) {
    console.error(`❌ Error loading asset ${assetId}:`, error);
    return null;
  }
}

/**
 * Load all generated visual novel assets from local file system (async for lazy loading)
 *
 * Priority for each asset:
 * 1. File System (visualnovel/assets/**) - Loads from local folders
 * 2. Unsplash fallback - Used in getBackgroundForScene if asset not found
 */
export async function loadAllVisualNovelAssets(): Promise<LoadedAssets> {
  const loaded: LoadedAssets = {
    backgrounds: {},
    sprites: {},
    cg: {},
    ui: {},
    maps: {},
    lastUpdated: Date.now(),
  };

  // Load backgrounds and map to scenes
  await Promise.all(
    Object.entries(BACKGROUND_MAP).map(async ([assetId, sceneIds]) => {
      const imageData = await loadAsset(assetId);
      if (imageData) {
        // Apply this background to all its scenes
        sceneIds.forEach(sceneId => {
          loaded.backgrounds[sceneId] = imageData;
        });
      }
    })
  );

  // Load character sprites
  await Promise.all(
    Object.entries(SPRITE_MAP).map(async ([assetId, expressionKey]) => {
      const imageData = await loadAsset(assetId);
      if (imageData) {
        loaded.sprites[expressionKey] = imageData;
      }
    })
  );

  // Load CG images
  await Promise.all(
    Object.entries(CG_MAP).map(async ([assetId, sceneId]) => {
      const imageData = await loadAsset(assetId);
      if (imageData) {
        loaded.cg[sceneId] = imageData;
      }
    })
  );

  // Load UI elements
  const uiElements = ['ui_dialogue_box', 'ui_choice_button'];
  await Promise.all(
    uiElements.map(async assetId => {
      const imageData = await loadAsset(assetId);
      if (imageData) {
        loaded.ui[assetId] = imageData;
      }
    })
  );

  // Load location maps
  const mapElements = ['map_city_overview', 'map_location_gallery', 'map_location_studio', 'map_location_apartment', 'map_location_cafe', 'map_time_indicator'];
  await Promise.all(
    mapElements.map(async assetId => {
      const imageData = await loadAsset(assetId);
      if (imageData) {
        loaded.maps[assetId] = imageData;
      }
    })
  );

  console.log('📦 Loaded Visual Novel Assets:', {
    backgrounds: Object.keys(loaded.backgrounds).length,
    sprites: Object.keys(loaded.sprites).length,
    cg: Object.keys(loaded.cg).length,
    ui: Object.keys(loaded.ui).length,
    maps: Object.keys(loaded.maps).length,
  });

  return loaded;
}

/**
 * Get background for a scene, with fallback to Unsplash
 */
export function getBackgroundForScene(sceneId: string, loadedAssets: LoadedAssets): string {
  // Check if we have a direct mapping from file system
  if (loadedAssets.backgrounds[sceneId]) {
    console.log(`✅ Loading background for scene "${sceneId}" from file system`);
    return loadedAssets.backgrounds[sceneId];
  }

  // Fall back to Unsplash
  if (FALLBACK_BACKGROUNDS[sceneId]) {
    console.log(`🌐 Using Unsplash fallback for scene "${sceneId}"`);
    return FALLBACK_BACKGROUNDS[sceneId];
  }

  // Ultimate fallback
  console.log(`⚠️ No background found for scene "${sceneId}", using intro fallback`);
  return FALLBACK_BACKGROUNDS['intro'];
}

/**
 * Get character sprite for expression, returns null if not generated
 */
export function getSpriteForExpression(expression: string, loadedAssets: LoadedAssets): string | null {
  return loadedAssets.sprites[expression] || null;
}

/**
 * Get CG image for scene, returns null if not generated
 */
export function getCGForScene(sceneId: string, loadedAssets: LoadedAssets): string | null {
  return loadedAssets.cg[sceneId] || null;
}

/**
 * Check if there are new assets (for hot-reload detection)
 */
export function hasNewAssets(oldAssets: LoadedAssets, newAssets: LoadedAssets): boolean {
  const oldCount = Object.keys(oldAssets.backgrounds).length +
                   Object.keys(oldAssets.sprites).length +
                   Object.keys(oldAssets.cg).length;

  const newCount = Object.keys(newAssets.backgrounds).length +
                   Object.keys(newAssets.sprites).length +
                   Object.keys(newAssets.cg).length;

  return newCount > oldCount;
}

/**
 * Get asset generation status for UI display (async for lazy loading)
 * Checks file system only
 */
export async function getAssetStatus(): Promise<{
  total: number;
  generated: number;
  critical: number;
  criticalGenerated: number;
  progress: number;
}> {
  const criticalAssets = COMPLETE_ASSET_MANIFEST.filter(a => a.priority === 'critical');
  let generatedCount = 0;
  let criticalGeneratedCount = 0;

  await Promise.all(
    COMPLETE_ASSET_MANIFEST.map(async asset => {
      const assetData = await loadAsset(asset.id);
      if (assetData) {
        generatedCount++;
        if (asset.priority === 'critical') {
          criticalGeneratedCount++;
        }
      }
    })
  );

  return {
    total: COMPLETE_ASSET_MANIFEST.length,
    generated: generatedCount,
    critical: criticalAssets.length,
    criticalGenerated: criticalGeneratedCount,
    progress: (generatedCount / COMPLETE_ASSET_MANIFEST.length) * 100,
  };
}

/**
 * Preload next scene assets for better performance
 */
export function preloadSceneAssets(currentSceneId: string, loadedAssets: LoadedAssets): void {
  // Get background for current scene and create image element to cache it
  const bgUrl = getBackgroundForScene(currentSceneId, loadedAssets);
  const img = new Image();
  img.src = bgUrl;

  console.log(`🔄 Preloading assets for scene: ${currentSceneId}`);
}

/**
 * Debug helper - call from browser console to see what files Vite found
 * Usage: window.debugAssets()
 */
export function debugAssetPaths(): void {
  console.log('=== FILE SYSTEM ASSETS DEBUG ===');
  console.log('Total files found by Vite:', Object.keys(fileSystemAssets).length);
  console.log('\n📁 All asset paths found:');
  Object.keys(fileSystemAssets).sort().forEach(path => {
    console.log(`  ✓ ${path}`);
  });

  console.log('\n=== EXPECTED PATHS (EXPANDED STORY - 51 total assets) ===');

  console.log('\n🧍 Character Sprites (20 total):');
  console.log('  Core Emotional States (6):');
  ['zara_neutral', 'zara_confident', 'zara_vulnerable', 'zara_playful', 'zara_uncomfortable', 'zara_trusting']
    .forEach(id => console.log(`    ./assets/sprites/${id}.png`));

  console.log('  Mode-Specific Variants (4):');
  ['zara_experimental', 'zara_platinum', 'zara_vera', 'zara_artistic']
    .forEach(id => console.log(`    ./assets/sprites/${id}.png`));

  console.log('  Story-Specific (2):');
  ['zara_crisis_reveal', 'zara_wrap_satisfied']
    .forEach(id => console.log(`    ./assets/sprites/${id}.png`));

  console.log('  === NEW: Intimate Wardrobe Sprites (8):');
  ['zara_lingerie_elegant', 'zara_lingerie_minimal', 'zara_silk_robe_open', 'zara_artistic_drape_partial',
   'zara_minimal_artistic', 'zara_boudoir_confident', 'zara_boudoir_vulnerable', 'zara_intimate_trust']
    .forEach(id => console.log(`    ./assets/sprites/${id}.png`));

  console.log('\n🖼️ Backgrounds (13 total):');
  console.log('  Studio Locations (8):');
  ['bg_studio_morning_arrival', 'bg_wardrobe_styling', 'bg_studio_neutral_setup', 'bg_studio_highcontrast',
   'bg_studio_softglow', 'bg_studio_experimental', 'bg_studio_platinum', 'bg_studio_wrap']
    .forEach(id => console.log(`    ./assets/backgrounds/${id}.png`));

  console.log('  === NEW: Boudoir & Intimate Locations (5):');
  ['bg_boudoir_bedroom_natural', 'bg_boudoir_luxury_dramatic', 'bg_studio_intimate_corner',
   'bg_dressing_room_private', 'bg_natural_light_loft']
    .forEach(id => console.log(`    ./assets/backgrounds/${id}.png`));

  console.log('\n✨ CG Images (18 total):');
  console.log('  Original Pivotal Moments (10):');
  ['cg_first_greeting', 'cg_lighttest', 'cg_equipment_hiccup', 'cg_first_frame_vulnerable', 'cg_first_frame_commanding',
   'cg_personal_reveal', 'cg_climax_experimental', 'cg_climax_platinum', 'cg_climax_vera', 'cg_camera_back_review']
    .forEach(id => console.log(`    ./assets/cg/${id}.png`));

  console.log('  === NEW: Intimate Photography Moments (8):');
  ['cg_wardrobe_discussion', 'cg_mirror_preparation', 'cg_first_intimate_portrait', 'cg_boudoir_pose',
   'cg_artistic_draping_moment', 'cg_intimate_close_moment', 'cg_climax_boudoir', 'cg_climax_minimal']
    .forEach(id => console.log(`    ./assets/cg/${id}.png`));

  console.log('\n📊 EXPANSION SUMMARY:');
  console.log('  Original assets: 30 (12 sprites + 8 backgrounds + 10 CG images)');
  console.log('  NEW assets: +21 (8 intimate sprites + 5 boudoir backgrounds + 8 intimate CG)');
  console.log('  TOTAL EXPANDED: 51 assets for complete boudoir/intimate story');

  console.log('\n🎨 UI Elements (2):');
  ['ui_dialogue_box', 'ui_choice_button']
    .forEach(id => console.log(`  ./assets/ui/${id}.png`));

  console.log('\n🗺️ Location Maps (6):');
  ['map_city_overview', 'map_location_gallery', 'map_location_studio', 'map_location_apartment', 'map_location_cafe', 'map_time_indicator']
    .forEach(id => console.log(`  ./assets/maps/${id}.png`));

  console.log('\n💡 TIP: Place your generated PNG files in visualnovel/assets/ with the exact paths shown above.');
}

// Expose to window for console debugging
if (typeof window !== 'undefined') {
  (window as any).debugAssets = debugAssetPaths;
}
