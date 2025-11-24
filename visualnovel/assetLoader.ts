/**
 * Asset Loader Service - Bridge between generated assets and Visual Novel game
 *
 * This service:
 * 1. Loads generated assets from file system (PRIMARY - unlimited size)
 * 2. Falls back to localStorage (SECONDARY - ~5MB limit)
 * 3. Maps asset IDs to scene/character references
 * 4. Provides fallback URLs if assets not generated
 * 5. Hot-reloads when new assets are generated
 *
 * Asset Priority: File System → localStorage → Unsplash Fallback
 */

import { COMPLETE_ASSET_MANIFEST, type AssetRequirement } from './assetManifest';

// Dynamically import all assets from the file system using Vite's glob import
// This makes assets available at runtime without localStorage size limits
const fileSystemAssets = import.meta.glob<{ default: string }>('./assets/**/*.{png,jpg,jpeg,mp4,mp3,wav}', {
  eager: true,
  import: 'default'
});

export interface LoadedAssets {
  backgrounds: Record<string, string>; // sceneId -> imageUrl (base64 or fallback)
  sprites: Record<string, string>;     // expressionKey -> imageUrl
  cg: Record<string, string>;          // cgId -> imageUrl
  ui: Record<string, string>;          // uiId -> imageUrl
  maps: Record<string, string>;        // mapId -> imageUrl
  lastUpdated: number;                 // Timestamp for hot-reload detection
}

/**
 * Map asset IDs from assetManifest to RealVisualNovel scene backgrounds
 */
const BACKGROUND_MAP: Record<string, string[]> = {
  // Art Gallery - used in intro and multiple paths
  'bg_art_gallery': ['intro', 'photographer_path', 'stylist_path', 'charm_path'],

  // Photography Studio - photographer path
  'bg_photography_studio': ['photographer_studio', 'photographer_intimate'],

  // Luxury Loft - intimate scenes
  'bg_luxury_loft': ['stylist_loft', 'charm_apartment'],

  // Bedroom - boudoir scenes
  'bg_intimate_bedroom': ['boudoir_artistic', 'boudoir_empowering'],

  // Cafe - conversation scenes
  'bg_cozy_cafe': ['cafe_conversation'],
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
  'zara_luxury_silk': 'sensual',
};

/**
 * Map CG asset IDs to special event scenes
 */
const CG_MAP: Record<string, string> = {
  'cg_first_meeting_gallery': 'intro',
  'cg_creative_photoshoot': 'photographer_studio',
  'cg_silk_styling': 'stylist_loft',
  'cg_deep_connection': 'charm_apartment',
  'cg_artistic_boudoir': 'boudoir_artistic',
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
 * Get asset filename from manifest
 */
function getAssetFilename(assetId: string): string {
  const asset = COMPLETE_ASSET_MANIFEST.find(a => a.id === assetId);
  return asset?.filename || `${assetId}.png`;
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
 * Load a single asset - checks file system first, then localStorage
 *
 * Priority:
 * 1. File System (visualnovel/assets/**) - Unlimited size
 * 2. localStorage - ~5MB limit
 * 3. null if not found
 */
function loadAsset(assetId: string): string | null {
  // 1. Try file system first (PRIMARY)
  try {
    const filename = getAssetFilename(assetId);
    const subfolder = getAssetSubfolder(assetId);
    const path = `./assets/${subfolder}/${filename}`;

    // Check if file exists in our imported assets
    if (fileSystemAssets[path]) {
      console.log(`✅ 📁 Loaded ${assetId} from file system`);
      return fileSystemAssets[path] as string;
    }
  } catch (error) {
    // Silent fallback to localStorage
  }

  // 2. Fall back to localStorage (SECONDARY)
  try {
    const key = `vn_asset_${assetId}`;
    const dataStr = localStorage.getItem(key);

    if (!dataStr) return null;

    const data = JSON.parse(dataStr);
    console.log(`✅ 💾 Loaded ${assetId} from localStorage`);
    return data.image; // Base64 string
  } catch (error) {
    return null;
  }
}

/**
 * Load all generated visual novel assets
 *
 * Priority for each asset:
 * 1. File System (visualnovel/assets/**) - PRIMARY, unlimited size
 * 2. localStorage - SECONDARY, ~5MB limit
 * 3. Unsplash fallback - used in getBackgroundForScene if asset not found
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
  const mapElements = ['map_city_overview', 'map_art_gallery', 'map_photo_studio', 'map_luxury_apartment', 'map_cozy_cafe'];
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
  // Find which asset ID maps to this scene
  let assetId: string | null = null;
  for (const [bgAssetId, scenes] of Object.entries(BACKGROUND_MAP)) {
    if (scenes.includes(sceneId)) {
      assetId = bgAssetId;
      break;
    }
  }

  // Try loaded asset using the mapped asset ID
  if (assetId && loadedAssets.backgrounds[assetId]) {
    console.log(`🖼️ Loading background for scene "${sceneId}" from asset "${assetId}"`);
    return loadedAssets.backgrounds[assetId];
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
 * Checks both file system and localStorage
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
  console.log('\nAll asset paths:');
  Object.keys(fileSystemAssets).forEach(path => {
    console.log(`  ${path}`);
  });
  console.log('\n=== EXPECTED PATHS ===');
  console.log('Backgrounds:', ['bg_art_gallery', 'bg_photography_studio', 'bg_luxury_bedroom', 'bg_cafe_exterior', 'bg_fashion_showroom'].map(id => `./assets/backgrounds/${id}.png`));
  console.log('Sprites:', ['zara_neutral_full', 'zara_smile_full', 'zara_flirty_full', 'zara_shy_full', 'zara_studio_outfit', 'zara_boudoir_outfit'].map(id => `./assets/sprites/${id}.png`));
}

// Expose to window for console debugging
if (typeof window !== 'undefined') {
  (window as any).debugAssets = debugAssetPaths;
}
