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
 */
const BACKGROUND_MAP: Record<string, string[]> = {
  // Art Gallery - used in intro and multiple paths
  'bg_art_gallery': ['intro', 'photographer_path', 'stylist_path', 'charm_path'],

  // Photography Studio - photographer path
  'bg_photography_studio': ['photographer_studio', 'photographer_intimate'],

  // Luxury Bedroom - intimate/boudoir scenes
  'bg_luxury_bedroom': ['stylist_loft', 'charm_apartment', 'boudoir_artistic', 'boudoir_empowering'],

  // Upscale Cafe - conversation scenes
  'bg_upscale_cafe': ['cafe_conversation'],

  // Fashion Showroom - stylist path
  'bg_fashion_showroom': ['stylist_path'],
};

/**
 * Map sprite asset IDs to expression keys used in dialogue
 */
const SPRITE_MAP: Record<string, string> = {
  'zara_neutral_full': 'neutral',
  'zara_smile_full': 'smile',
  'zara_flirty_full': 'flirty',
  'zara_shy_full': 'shy',
  'zara_studio_outfit': 'confident',
  'zara_boudoir_outfit': 'sensual',
};

/**
 * Map CG asset IDs to special event scenes
 * These map to the actual asset IDs in assetManifest.ts
 */
const CG_MAP: Record<string, string> = {
  'cg_first_meeting': 'intro',
  'cg_studio_photoshoot': 'photographer_studio',
  'cg_viewing_photos': 'photographer_intimate',
  'cg_boudoir_session': 'boudoir_artistic',
  'cg_intimate_moment': 'boudoir_empowering',
};

/**
 * Fallback URLs (current Unsplash images used in RealVisualNovel)
 */
const FALLBACK_BACKGROUNDS: Record<string, string> = {
  'intro': 'https://images.unsplash.com/photo-1569683795645-b62e50fbf103?w=1920',
  'photographer_path': 'https://images.unsplash.com/photo-1558365849-6ebd8b0454b2?w=1920',
  'photographer_studio': 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=1920',
  'photographer_intimate': 'https://images.unsplash.com/photo-1558365849-6ebd8b0454b2?w=1920',
  'stylist_path': 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1920',
  'stylist_loft': 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1920',
  'charm_path': 'https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?w=1920',
  'charm_apartment': 'https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=1920',
  'boudoir_artistic': 'https://images.unsplash.com/photo-1616594266787-088c647e2c42?w=1920',
  'boudoir_empowering': 'https://images.unsplash.com/photo-1595433562696-a8a6d6ce8b9d?w=1920',
  'cafe_conversation': 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=1920',
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
  console.log('🧍 Sprites (6):');
  ['zara_neutral_full', 'zara_smile_full', 'zara_flirty_full', 'zara_shy_full', 'zara_studio_outfit', 'zara_boudoir_outfit']
    .forEach(id => console.log(`  ./assets/sprites/${id}.png`));

  console.log('\n🖼️ Backgrounds (5):');
  ['bg_art_gallery', 'bg_photography_studio', 'bg_luxury_bedroom', 'bg_upscale_cafe', 'bg_fashion_showroom']
    .forEach(id => console.log(`  ./assets/backgrounds/${id}.png`));

  console.log('\n✨ CG Images (5):');
  ['cg_first_meeting', 'cg_studio_photoshoot', 'cg_viewing_photos', 'cg_boudoir_session', 'cg_intimate_moment']
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
