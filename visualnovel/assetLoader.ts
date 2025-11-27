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
const fileSystemAssets = import.meta.glob<{ default: string }>('./assets/**/*.{png,jpg,jpeg,mp4,mp3,wav}', {
  eager: true,
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
 * NEW STORY: Chapter 1: Light & Shadow (Photography Studio Story)
 * Scene IDs: scene_1_calltime, scene_2_set_prep, scene_3_first_shoot,
 *            scene_4_midpoint, scene_5_climax_shot, scene_6_wrap
 */
const BACKGROUND_MAP: Record<string, string[]> = {
  // Studio - Morning Arrival (Scene 1)
  'bg_studio_morning_arrival': ['scene_1_calltime'],

  // Wardrobe & Styling Area (Scene 2)
  'bg_wardrobe_styling': ['scene_2_set_prep'],

  // Studio Center - Neutral Professional Setup (Scenes 2 & 3)
  'bg_studio_neutral_setup': ['scene_2_set_prep', 'scene_3_first_shoot'],

  // Studio - High Contrast Dramatic (Scenes 3 & 5, Experimental mode)
  'bg_studio_highcontrast': ['scene_3_first_shoot', 'scene_5_climax_shot'],

  // Studio - Soft Glow Intimate (Scenes 3 & 4, Vera mode)
  'bg_studio_softglow': ['scene_3_first_shoot', 'scene_4_midpoint'],

  // Studio - Experimental Conceptual (Scene 5, Experimental mode)
  'bg_studio_experimental': ['scene_5_climax_shot'],

  // Studio - Platinum Luxury (Scene 5, Platinum mode)
  'bg_studio_platinum': ['scene_5_climax_shot'],

  // Studio - End of Day Wrap (Scene 6)
  'bg_studio_wrap': ['scene_6_wrap'],
};

/**
 * Map sprite asset IDs to expression keys used in dialogue
 *
 * NEW STORY: Character sprite assets map to emotion strings used in DialogueLine.emotion
 * Available sprites: 12 core emotional states + mode-specific variants
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
  // (These use asset names as-is for emotions that match)
  'zara_professional': 'professional',
  'zara_thoughtful': 'thoughtful',
  'zara_curious': 'curious',
  'zara_excited': 'excited',
  'zara_hopeful': 'hopeful',
};

/**
 * Map CG asset IDs to special event scenes
 * These map to the actual asset IDs in assetManifest.ts
 *
 * NEW STORY: 10 pivotal CG images for key narrative moments
 */
const CG_MAP: Record<string, string> = {
  // Scene 1: Arrival & Briefing
  'cg_first_greeting': 'scene_1_calltime',

  // Scene 2: Wardrobe & Light Test
  'cg_lighttest': 'scene_2_set_prep',
  'cg_equipment_hiccup': 'scene_2_set_prep',

  // Scene 3: First Frame
  'cg_first_frame_vulnerable': 'scene_3_first_shoot',
  'cg_first_frame_commanding': 'scene_3_first_shoot',

  // Scene 4: Crisis & Choice (Midpoint)
  'cg_personal_reveal': 'scene_4_midpoint',

  // Scene 5: Climactic Frame (mode-specific)
  'cg_climax_experimental': 'scene_5_climax_shot',
  'cg_climax_platinum': 'scene_5_climax_shot',
  'cg_climax_vera': 'scene_5_climax_shot',

  // Scene 6: Wrap & Aftermath
  'cg_camera_back_review': 'scene_6_wrap',
};

/**
 * Fallback URLs (Unsplash images used when assets not yet generated)
 *
 * NEW STORY: Fallback backgrounds for Chapter 1 scenes
 */
const FALLBACK_BACKGROUNDS: Record<string, string> = {
  // Scene 1: Morning studio arrival
  'scene_1_calltime': 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=1920',

  // Scene 2: Wardrobe and set preparation
  'scene_2_set_prep': 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1920',

  // Scene 3: First professional shoot
  'scene_3_first_shoot': 'https://images.unsplash.com/photo-1558365849-6ebd8b0454b2?w=1920',

  // Scene 4: Midpoint emotional moment
  'scene_4_midpoint': 'https://images.unsplash.com/photo-1569683795645-b62e50fbf103?w=1920',

  // Scene 5: Climactic signature shot
  'scene_5_climax_shot': 'https://images.unsplash.com/photo-1616594266787-088c647e2c42?w=1920',

  // Scene 6: End of day wrap
  'scene_6_wrap': 'https://images.unsplash.com/photo-1595433562696-a8a6d6ce8b9d?w=1920',
};

/**
 * Get asset filename from asset ID using our naming convention
 *
 * Naming convention:
 * - Character sprites: zara_*.png (e.g., zara_neutral_full.png)
 * - Backgrounds: bg_*.png (e.g., bg_art_gallery.png)
 * - CG images: cg_*.png (e.g., cg_first_meeting.png)
 * - UI elements: ui_*.png (e.g., ui_dialogue_box.png)
 * - Location maps: map_*.png (e.g., map_city_overview.png)
 * - BGM: bgm_*.mp3 (e.g., bgm_main_menu.mp3)
 * - SFX: sfx_*.wav (e.g., sfx_ui_click.wav)
 * - Videos: cutscene_*.mp4 (e.g., cutscene_chapter_intro.mp4)
 */
function getAssetFilename(assetId: string): string {
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
 * Load a single asset from file system only
 *
 * Returns:
 * - Asset URL if file exists in visualnovel/assets/**
 * - null if not found
 */
function loadAsset(assetId: string): string | null {
  // Load from file system only
  try {
    const filename = getAssetFilename(assetId);
    const subfolder = getAssetSubfolder(assetId);
    const path = `./assets/${subfolder}/${filename}`;

    // Check if file exists in our imported assets
    if (fileSystemAssets[path]) {
      console.log(`✅ 📁 Loaded ${assetId} from file system: ${path}`);
      return fileSystemAssets[path] as string;
    }

    console.log(`❌ Asset not found: ${assetId} (expected at ${path})`);
    return null;
  } catch (error) {
    console.error(`❌ Error loading asset ${assetId}:`, error);
    return null;
  }
}

/**
 * Load all generated visual novel assets from local file system
 *
 * Priority for each asset:
 * 1. File System (visualnovel/assets/**) - Loads from local folders
 * 2. Unsplash fallback - Used in getBackgroundForScene if asset not found
 */
export function loadAllVisualNovelAssets(): LoadedAssets {
  const loaded: LoadedAssets = {
    backgrounds: {},
    sprites: {},
    cg: {},
    ui: {},
    maps: {},
    lastUpdated: Date.now(),
  };

  // Load backgrounds and map to scenes
  Object.entries(BACKGROUND_MAP).forEach(([assetId, sceneIds]) => {
    const imageData = loadAsset(assetId);
    if (imageData) {
      // Apply this background to all its scenes
      sceneIds.forEach(sceneId => {
        loaded.backgrounds[sceneId] = imageData;
      });
    }
  });

  // Load character sprites
  Object.entries(SPRITE_MAP).forEach(([assetId, expressionKey]) => {
    const imageData = loadAsset(assetId);
    if (imageData) {
      loaded.sprites[expressionKey] = imageData;
    }
  });

  // Load CG images
  Object.entries(CG_MAP).forEach(([assetId, sceneId]) => {
    const imageData = loadAsset(assetId);
    if (imageData) {
      loaded.cg[sceneId] = imageData;
    }
  });

  // Load UI elements
  const uiElements = ['ui_dialogue_box', 'ui_choice_button'];
  uiElements.forEach(assetId => {
    const imageData = loadAsset(assetId);
    if (imageData) {
      loaded.ui[assetId] = imageData;
    }
  });

  // Load location maps
  const mapElements = ['map_city_overview', 'map_location_gallery', 'map_location_studio', 'map_location_apartment', 'map_location_cafe', 'map_time_indicator'];
  mapElements.forEach(assetId => {
    const imageData = loadAsset(assetId);
    if (imageData) {
      loaded.maps[assetId] = imageData;
    }
  });

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
 * Get asset generation status for UI display
 * Checks file system only
 */
export function getAssetStatus(): {
  total: number;
  generated: number;
  critical: number;
  criticalGenerated: number;
  progress: number;
} {
  const criticalAssets = COMPLETE_ASSET_MANIFEST.filter(a => a.priority === 'critical');
  let generatedCount = 0;
  let criticalGeneratedCount = 0;

  COMPLETE_ASSET_MANIFEST.forEach(asset => {
    if (loadAsset(asset.id)) {
      generatedCount++;
      if (asset.priority === 'critical') {
        criticalGeneratedCount++;
      }
    }
  });

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

  console.log('\n=== EXPECTED PATHS (based on naming convention) ===');
  console.log('🧍 Sprites (12 core + 5 additional dialogue emotions):');
  ['zara_neutral', 'zara_confident', 'zara_vulnerable', 'zara_playful', 'zara_uncomfortable', 'zara_trusting',
   'zara_experimental', 'zara_platinum', 'zara_vera', 'zara_artistic', 'zara_crisis_reveal', 'zara_wrap_satisfied',
   'zara_professional', 'zara_thoughtful', 'zara_curious', 'zara_excited', 'zara_hopeful']
    .forEach(id => console.log(`  ./assets/sprites/${id}.png`));

  console.log('\n🖼️ Backgrounds (8):');
  ['bg_studio_morning_arrival', 'bg_wardrobe_styling', 'bg_studio_neutral_setup', 'bg_studio_highcontrast',
   'bg_studio_softglow', 'bg_studio_experimental', 'bg_studio_platinum', 'bg_studio_wrap']
    .forEach(id => console.log(`  ./assets/backgrounds/${id}.png`));

  console.log('\n✨ CG Images (10):');
  ['cg_first_greeting', 'cg_lighttest', 'cg_equipment_hiccup', 'cg_first_frame_vulnerable', 'cg_first_frame_commanding',
   'cg_personal_reveal', 'cg_climax_experimental', 'cg_climax_platinum', 'cg_climax_vera', 'cg_camera_back_review']
    .forEach(id => console.log(`  ./assets/cg/${id}.png`));

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
