/**
 * Asset File Saver - Handles saving generated assets to files
 * Since this is a browser app, we provide download functionality
 */

import type { AssetRequirement } from './assetManifest';

/**
 * Convert base64 image to Blob
 */
function base64ToBlob(base64: string, mimeType: string = 'image/png'): Blob {
  // Strip data URI prefix if present (e.g., "data:image/png;base64,")
  let cleanBase64 = base64;
  if (cleanBase64.includes(',')) {
    cleanBase64 = cleanBase64.split(',')[1];
  }

  // Remove any whitespace, newlines, or other invalid characters
  cleanBase64 = cleanBase64.replace(/\s/g, '');

  const byteCharacters = atob(cleanBase64);
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: mimeType });
}

/**
 * Download a file to user's computer
 */
function downloadFile(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Get filename for an asset
 */
export function getAssetFilename(asset: AssetRequirement): string {
  const name = asset.name.toLowerCase().replace(/[^a-z0-9]+/g, '_');
  const ext = asset.specifications.format.toLowerCase();
  return `${name}.${ext}`;
}

/**
 * Save asset image to file (downloads to user's computer)
 */
export function saveAssetToFile(asset: AssetRequirement, base64Image: string): void {
  try {
    const blob = base64ToBlob(base64Image);
    const filename = getAssetFilename(asset);

    console.log(`💾 Downloading asset: ${filename}`);
    downloadFile(blob, filename);

  } catch (error) {
    console.error('Failed to save asset:', error);
    throw new Error(`Failed to save ${asset.name}: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Store asset in localStorage for persistence
 * DEPRECATED: Use saveAssetToFileSystem instead to avoid localStorage limits
 */
export function storeAssetInLocalStorage(asset: AssetRequirement, base64Image: string): void {
  try {
    const key = `vn_asset_${asset.id}`;
    const data = {
      id: asset.id,
      name: asset.name,
      type: asset.type,
      image: base64Image,
      timestamp: Date.now()
    };

    localStorage.setItem(key, JSON.stringify(data));
    console.log(`💾 Stored ${asset.name} in localStorage`);

  } catch (error) {
    console.warn(`Failed to store ${asset.name} in localStorage (may be too large):`, error);
  }
}

/**
 * Save asset to file system via backend API (NO localStorage limits!)
 */
export async function saveAssetToFileSystem(asset: AssetRequirement, base64Image: string): Promise<void> {
  try {
    const filename = getAssetFilename(asset);

    const response = await fetch('http://localhost:3001/api/save-asset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        assetId: asset.id,
        type: asset.type,
        base64Image: base64Image,
        filename: filename
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to save asset');
    }

    const result = await response.json();
    console.log(`✅ Saved to file system: ${result.path} (${(result.size / 1024).toFixed(1)} KB)`);
    console.log(`🔄 Visual Novel will auto-reload with new asset!`);

  } catch (error) {
    console.error(`❌ Failed to save ${asset.name} to file system:`, error);
    throw error;
  }
}

/**
 * Load asset from localStorage
 */
export function loadAssetFromLocalStorage(assetId: string): string | null {
  try {
    const key = `vn_asset_${assetId}`;
    const dataStr = localStorage.getItem(key);

    if (!dataStr) return null;

    const data = JSON.parse(dataStr);
    return data.image;

  } catch (error) {
    console.error(`Failed to load asset ${assetId}:`, error);
    return null;
  }
}

/**
 * Load all assets from localStorage
 */
export function loadAllAssetsFromLocalStorage(): Record<string, string> {
  const assetMap: Record<string, string> = {};

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('vn_asset_')) {
      try {
        const dataStr = localStorage.getItem(key);
        if (dataStr) {
          const data = JSON.parse(dataStr);
          assetMap[data.id] = data.image;
        }
      } catch (error) {
        console.error(`Failed to load asset from ${key}:`, error);
      }
    }
  }

  console.log(`📂 Loaded ${Object.keys(assetMap).length} assets from localStorage`);
  return assetMap;
}

/**
 * Clear all stored assets
 */
export function clearAllStoredAssets(): void {
  const keys: string[] = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('vn_asset_')) {
      keys.push(key);
    }
  }

  keys.forEach(key => localStorage.removeItem(key));
  console.log(`🗑️ Cleared ${keys.length} stored assets`);
}
