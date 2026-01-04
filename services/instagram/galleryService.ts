/**
 * PERSISTENT GALLERY SERVICE
 *
 * IndexedDB-based storage for all generated images across all modes.
 * Provides reliable persistence across app restarts and browser sessions.
 *
 * Features:
 * - IndexedDB storage (handles large images better than localStorage)
 * - Automatic thumbnails generation for quick loading
 * - Tagging and categorization by source mode
 * - Search and filter capabilities
 * - Automatic cleanup of old images (configurable)
 */

// ============================================================================
// TYPES
// ============================================================================

export interface GalleryImage {
  id: string;
  url: string; // Full base64 data URL or external URL
  thumbnailUrl?: string; // Smaller thumbnail for quick loading
  prompt?: string;
  timestamp: number;
  sourceMode: SourceMode;
  metadata: {
    modelId?: string;
    seed?: number;
    aspectRatio?: string;
    intimacyLevel?: number;
    provider?: string;
    conceptId?: string;
    conceptName?: string;
    tags?: string[];
  };
  instagramStatus?: {
    posted: boolean;
    postedAt?: number;
    mediaId?: string;
  };
}

export type SourceMode =
  | 'classic'
  | 'roleplay'
  | 'experimental'
  | 'masterclass'
  | 'platinum'
  | 'vera'
  | 'visualnovel'
  | 'artistic'
  | 'corporate'
  | 'video'
  | 'unknown';

export interface GalleryFilter {
  sourceMode?: SourceMode | 'all';
  posted?: boolean;
  dateFrom?: number;
  dateTo?: number;
  searchTerm?: string;
  tags?: string[];
}

export interface GalleryStats {
  totalImages: number;
  byMode: Record<SourceMode, number>;
  posted: number;
  unposted: number;
  totalSizeEstimate: number; // In bytes
}

// ============================================================================
// INDEXEDDB SETUP
// ============================================================================

const DB_NAME = 'instagram_gallery';
const DB_VERSION = 1;
const STORE_NAME = 'images';

let dbPromise: Promise<IDBDatabase> | null = null;

/**
 * Initialize and get the IndexedDB database
 */
function getDB(): Promise<IDBDatabase> {
  if (dbPromise) return dbPromise;

  dbPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => {
      console.error('❌ Failed to open gallery database:', request.error);
      reject(request.error);
    };

    request.onsuccess = () => {
      console.log('✅ Gallery database opened successfully');
      resolve(request.result);
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      // Create the images store
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });

        // Create indexes for efficient querying
        store.createIndex('timestamp', 'timestamp', { unique: false });
        store.createIndex('sourceMode', 'sourceMode', { unique: false });
        store.createIndex('posted', 'instagramStatus.posted', { unique: false });

        console.log('📦 Created gallery store with indexes');
      }
    };
  });

  return dbPromise;
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Generate a unique ID for a gallery image
 */
export function generateImageId(): string {
  return `img_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
}

/**
 * Estimate the size of a base64 image in bytes
 */
export function estimateBase64Size(base64: string): number {
  // Remove data URL prefix if present
  const base64Data = base64.includes(',') ? base64.split(',')[1] : base64;
  // Each base64 char represents 6 bits, so 4 chars = 3 bytes
  return Math.ceil((base64Data.length * 3) / 4);
}

/**
 * Create a thumbnail from a base64 image
 */
export async function createThumbnail(
  imageUrl: string,
  maxWidth: number = 200,
  maxHeight: number = 200
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      // Calculate thumbnail dimensions
      let width = img.width;
      let height = img.height;

      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }
      if (height > maxHeight) {
        width = (width * maxHeight) / height;
        height = maxHeight;
      }

      // Create canvas and draw
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Failed to get canvas context'));
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);

      // Convert to base64 JPEG (smaller than PNG)
      resolve(canvas.toDataURL('image/jpeg', 0.7));
    };

    img.onerror = () => reject(new Error('Failed to load image for thumbnail'));
    img.src = imageUrl;
  });
}

// ============================================================================
// CORE GALLERY OPERATIONS
// ============================================================================

/**
 * Save an image to the gallery
 */
export async function saveToGallery(
  image: Omit<GalleryImage, 'id' | 'timestamp'> & { id?: string; timestamp?: number }
): Promise<GalleryImage> {
  const db = await getDB();

  // Generate thumbnail if not provided
  let thumbnailUrl = image.thumbnailUrl;
  if (!thumbnailUrl && image.url.startsWith('data:')) {
    try {
      thumbnailUrl = await createThumbnail(image.url);
    } catch (error) {
      console.warn('⚠️ Failed to create thumbnail:', error);
    }
  }

  const galleryImage: GalleryImage = {
    id: image.id || generateImageId(),
    url: image.url,
    thumbnailUrl,
    prompt: image.prompt,
    timestamp: image.timestamp || Date.now(),
    sourceMode: image.sourceMode || 'unknown',
    metadata: image.metadata || {},
    instagramStatus: image.instagramStatus || { posted: false },
  };

  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);

    const request = store.put(galleryImage);

    request.onsuccess = () => {
      console.log(`✅ Saved image to gallery: ${galleryImage.id}`);
      resolve(galleryImage);
    };

    request.onerror = () => {
      console.error('❌ Failed to save image to gallery:', request.error);
      reject(request.error);
    };
  });
}

/**
 * Save multiple images to the gallery at once
 */
export async function saveMultipleToGallery(
  images: Array<Omit<GalleryImage, 'id' | 'timestamp'>>
): Promise<GalleryImage[]> {
  const results: GalleryImage[] = [];

  for (const image of images) {
    try {
      const saved = await saveToGallery(image);
      results.push(saved);
    } catch (error) {
      console.error('❌ Failed to save image:', error);
    }
  }

  console.log(`✅ Saved ${results.length}/${images.length} images to gallery`);
  return results;
}

/**
 * Get all images from the gallery
 */
export async function getAllImages(): Promise<GalleryImage[]> {
  const db = await getDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const index = store.index('timestamp');

    // Get all, sorted by timestamp descending (newest first)
    const request = index.openCursor(null, 'prev');
    const results: GalleryImage[] = [];

    request.onsuccess = (event) => {
      const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
      if (cursor) {
        results.push(cursor.value);
        cursor.continue();
      } else {
        resolve(results);
      }
    };

    request.onerror = () => {
      console.error('❌ Failed to get images:', request.error);
      reject(request.error);
    };
  });
}

/**
 * Get images with filtering
 */
export async function getFilteredImages(filter: GalleryFilter): Promise<GalleryImage[]> {
  const allImages = await getAllImages();

  return allImages.filter(image => {
    // Filter by source mode
    if (filter.sourceMode && filter.sourceMode !== 'all' && image.sourceMode !== filter.sourceMode) {
      return false;
    }

    // Filter by posted status
    if (filter.posted !== undefined) {
      const isPosted = image.instagramStatus?.posted ?? false;
      if (filter.posted !== isPosted) return false;
    }

    // Filter by date range
    if (filter.dateFrom && image.timestamp < filter.dateFrom) return false;
    if (filter.dateTo && image.timestamp > filter.dateTo) return false;

    // Filter by search term (in prompt or concept name)
    if (filter.searchTerm) {
      const term = filter.searchTerm.toLowerCase();
      const matchesPrompt = image.prompt?.toLowerCase().includes(term);
      const matchesConcept = image.metadata.conceptName?.toLowerCase().includes(term);
      const matchesTags = image.metadata.tags?.some(tag => tag.toLowerCase().includes(term));
      if (!matchesPrompt && !matchesConcept && !matchesTags) return false;
    }

    // Filter by tags
    if (filter.tags && filter.tags.length > 0) {
      const imageTags = image.metadata.tags || [];
      const hasMatchingTag = filter.tags.some(tag => imageTags.includes(tag));
      if (!hasMatchingTag) return false;
    }

    return true;
  });
}

/**
 * Get a single image by ID
 */
export async function getImageById(id: string): Promise<GalleryImage | null> {
  const db = await getDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(id);

    request.onsuccess = () => {
      resolve(request.result || null);
    };

    request.onerror = () => {
      console.error('❌ Failed to get image:', request.error);
      reject(request.error);
    };
  });
}

/**
 * Delete an image from the gallery
 */
export async function deleteImage(id: string): Promise<void> {
  const db = await getDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.delete(id);

    request.onsuccess = () => {
      console.log(`✅ Deleted image: ${id}`);
      resolve();
    };

    request.onerror = () => {
      console.error('❌ Failed to delete image:', request.error);
      reject(request.error);
    };
  });
}

/**
 * Delete multiple images
 */
export async function deleteMultipleImages(ids: string[]): Promise<void> {
  for (const id of ids) {
    await deleteImage(id);
  }
  console.log(`✅ Deleted ${ids.length} images`);
}

/**
 * Update an image in the gallery
 */
export async function updateImage(
  id: string,
  updates: Partial<Omit<GalleryImage, 'id'>>
): Promise<GalleryImage | null> {
  const db = await getDB();
  const existing = await getImageById(id);

  if (!existing) {
    console.warn(`⚠️ Image not found: ${id}`);
    return null;
  }

  const updated: GalleryImage = {
    ...existing,
    ...updates,
    id, // Ensure ID doesn't change
    metadata: {
      ...existing.metadata,
      ...updates.metadata,
    },
    instagramStatus: {
      ...existing.instagramStatus,
      ...updates.instagramStatus,
    },
  };

  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.put(updated);

    request.onsuccess = () => {
      console.log(`✅ Updated image: ${id}`);
      resolve(updated);
    };

    request.onerror = () => {
      console.error('❌ Failed to update image:', request.error);
      reject(request.error);
    };
  });
}

/**
 * Mark an image as posted to Instagram
 */
export async function markAsPosted(id: string, mediaId: string): Promise<void> {
  await updateImage(id, {
    instagramStatus: {
      posted: true,
      postedAt: Date.now(),
      mediaId,
    },
  });
}

/**
 * Get gallery statistics
 */
export async function getGalleryStats(): Promise<GalleryStats> {
  const allImages = await getAllImages();

  const stats: GalleryStats = {
    totalImages: allImages.length,
    byMode: {
      classic: 0,
      roleplay: 0,
      experimental: 0,
      masterclass: 0,
      platinum: 0,
      vera: 0,
      visualnovel: 0,
      artistic: 0,
      corporate: 0,
      video: 0,
      unknown: 0,
    },
    posted: 0,
    unposted: 0,
    totalSizeEstimate: 0,
  };

  for (const image of allImages) {
    // Count by mode
    stats.byMode[image.sourceMode] = (stats.byMode[image.sourceMode] || 0) + 1;

    // Count posted/unposted
    if (image.instagramStatus?.posted) {
      stats.posted++;
    } else {
      stats.unposted++;
    }

    // Estimate total size
    if (image.url.startsWith('data:')) {
      stats.totalSizeEstimate += estimateBase64Size(image.url);
    }
  }

  return stats;
}

/**
 * Clear old images (keep only recent N days or N images)
 */
export async function cleanupOldImages(options: {
  maxAgeDays?: number;
  maxCount?: number;
  keepPosted?: boolean;
}): Promise<number> {
  const { maxAgeDays, maxCount, keepPosted = true } = options;
  const allImages = await getAllImages();

  let toDelete: GalleryImage[] = [];

  // Filter by age
  if (maxAgeDays) {
    const cutoffTime = Date.now() - maxAgeDays * 24 * 60 * 60 * 1000;
    toDelete = allImages.filter(img => {
      if (keepPosted && img.instagramStatus?.posted) return false;
      return img.timestamp < cutoffTime;
    });
  }

  // Filter by count (keep most recent)
  if (maxCount && allImages.length > maxCount) {
    const sortedByTime = [...allImages].sort((a, b) => b.timestamp - a.timestamp);
    const excess = sortedByTime.slice(maxCount);

    toDelete = [
      ...toDelete,
      ...excess.filter(img => {
        if (keepPosted && img.instagramStatus?.posted) return false;
        if (toDelete.some(d => d.id === img.id)) return false;
        return true;
      }),
    ];
  }

  // Delete the images
  for (const img of toDelete) {
    await deleteImage(img.id);
  }

  console.log(`🧹 Cleaned up ${toDelete.length} old images`);
  return toDelete.length;
}

/**
 * Clear all images from the gallery (use with caution!)
 */
export async function clearAllImages(): Promise<void> {
  const db = await getDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.clear();

    request.onsuccess = () => {
      console.log('✅ Cleared all images from gallery');
      resolve();
    };

    request.onerror = () => {
      console.error('❌ Failed to clear gallery:', request.error);
      reject(request.error);
    };
  });
}

// ============================================================================
// INITIALIZATION
// ============================================================================

/**
 * Initialize the gallery service
 * Call this early in app startup to ensure DB is ready
 */
export async function initGallery(): Promise<void> {
  try {
    await getDB();
    console.log('✅ Gallery service initialized');
  } catch (error) {
    console.error('❌ Failed to initialize gallery service:', error);
  }
}

// Auto-initialize when module loads
if (typeof window !== 'undefined') {
  initGallery().catch(console.error);
}
