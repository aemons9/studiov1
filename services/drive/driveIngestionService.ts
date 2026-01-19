/**
 * GOOGLE DRIVE INGESTION SERVICE
 *
 * Authenticates using service account credentials and ingests images from Google Drive.
 * Uses Application Default Credentials (ADC) via GOOGLE_APPLICATION_CREDENTIALS env var.
 *
 * Target folder structure:
 * asset1.1drive/
 * └── asset1.1/
 *     ├── ai-image-studio-<timestamp>-<index>.png
 *     └── ...
 */

import { google, drive_v3 } from 'googleapis';
import * as fs from 'fs';
import * as path from 'path';

// ============================================================================
// TYPES
// ============================================================================

export interface DriveImage {
  id: string;
  name: string;
  mimeType: string;
  createdTime: string;
  modifiedTime: string;
  size: number;
  webContentLink?: string;
  thumbnailLink?: string;
  batchTimestamp: number;
  batchIndex: number;
}

export interface ImageBatch {
  timestamp: number;
  images: DriveImage[];
  createdAt: Date;
}

export interface DriveIngestionResult {
  success: boolean;
  images: DriveImage[];
  batches: ImageBatch[];
  error?: string;
}

// ============================================================================
// CONFIGURATION
// ============================================================================

const ASSET_FOLDER_NAME = 'asset1.1';
const IMAGE_PREFIX = 'ai-image-studio';
const CREDENTIALS_PATH = process.env.GOOGLE_APPLICATION_CREDENTIALS ||
  '/home/ecolex/version1/studiov-drive-ingest-870127e5767e.json';

// Local cache directory for downloaded images
const CACHE_DIR = path.join(process.cwd(), 'temp', 'drive-cache');

// ============================================================================
// AUTHENTICATION
// ============================================================================

let driveClient: drive_v3.Drive | null = null;

/**
 * Initialize Google Drive client with service account credentials
 */
export async function initializeDriveClient(): Promise<drive_v3.Drive> {
  if (driveClient) return driveClient;

  console.log('🔐 Initializing Google Drive client with service account...');

  try {
    // Load service account credentials
    const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf8'));

    // Create JWT auth client
    const auth = new google.auth.JWT({
      email: credentials.client_email,
      key: credentials.private_key,
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    });

    // Initialize Drive client
    driveClient = google.drive({ version: 'v3', auth });

    console.log('✅ Google Drive client initialized');
    console.log(`   Service Account: ${credentials.client_email}`);

    return driveClient;
  } catch (error) {
    console.error('❌ Failed to initialize Drive client:', error);
    throw error;
  }
}

// ============================================================================
// FOLDER DISCOVERY
// ============================================================================

/**
 * Find the asset1.1 folder by name
 */
export async function findAssetFolder(): Promise<string | null> {
  const drive = await initializeDriveClient();

  try {
    console.log(`🔍 Searching for folder: ${ASSET_FOLDER_NAME}`);

    const response = await drive.files.list({
      q: `name = '${ASSET_FOLDER_NAME}' and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
      fields: 'files(id, name, parents)',
      spaces: 'drive',
    });

    const folders = response.data.files || [];

    if (folders.length === 0) {
      console.log(`⚠️ Folder '${ASSET_FOLDER_NAME}' not found`);
      return null;
    }

    const folder = folders[0];
    console.log(`✅ Found folder: ${folder.name} (ID: ${folder.id})`);
    return folder.id!;
  } catch (error) {
    console.error('❌ Error finding folder:', error);
    throw error;
  }
}

// ============================================================================
// IMAGE LISTING
// ============================================================================

/**
 * Parse filename to extract timestamp and index
 * Format: ai-image-studio-<timestamp>-<index>.png
 */
function parseFilename(filename: string): { timestamp: number; index: number } | null {
  // Match: ai-image-studio-1234567890123-0.png
  const match = filename.match(/ai-image-studio-(\d+)-(\d+)\.(png|jpg|jpeg|webp)$/i);

  if (!match) {
    // Try alternative formats
    const altMatch = filename.match(/ai-image-studio[_-]?(\d+)[_-]?(\d*)\.(png|jpg|jpeg|webp)$/i);
    if (altMatch) {
      return {
        timestamp: parseInt(altMatch[1], 10),
        index: altMatch[2] ? parseInt(altMatch[2], 10) : 0,
      };
    }
    return null;
  }

  return {
    timestamp: parseInt(match[1], 10),
    index: parseInt(match[2], 10),
  };
}

/**
 * List all images in the asset folder
 */
export async function listImages(folderId?: string): Promise<DriveImage[]> {
  const drive = await initializeDriveClient();

  // Find folder if not provided
  const targetFolderId = folderId || await findAssetFolder();
  if (!targetFolderId) {
    throw new Error(`Folder '${ASSET_FOLDER_NAME}' not found in Google Drive`);
  }

  console.log(`📂 Listing images in folder ID: ${targetFolderId}`);

  try {
    const images: DriveImage[] = [];
    let pageToken: string | undefined;

    do {
      const response = await drive.files.list({
        q: `'${targetFolderId}' in parents and mimeType contains 'image/' and trashed = false`,
        fields: 'nextPageToken, files(id, name, mimeType, createdTime, modifiedTime, size, webContentLink, thumbnailLink)',
        pageSize: 100,
        pageToken,
        orderBy: 'createdTime desc',
      });

      const files = response.data.files || [];

      for (const file of files) {
        // Filter by prefix
        if (!file.name?.startsWith(IMAGE_PREFIX)) {
          continue;
        }

        // Parse filename
        const parsed = parseFilename(file.name);
        if (!parsed) {
          console.log(`⚠️ Could not parse filename: ${file.name}`);
          continue;
        }

        images.push({
          id: file.id!,
          name: file.name,
          mimeType: file.mimeType || 'image/png',
          createdTime: file.createdTime || new Date().toISOString(),
          modifiedTime: file.modifiedTime || new Date().toISOString(),
          size: parseInt(file.size || '0', 10),
          webContentLink: file.webContentLink,
          thumbnailLink: file.thumbnailLink,
          batchTimestamp: parsed.timestamp,
          batchIndex: parsed.index,
        });
      }

      pageToken = response.data.nextPageToken || undefined;
    } while (pageToken);

    console.log(`✅ Found ${images.length} images matching prefix '${IMAGE_PREFIX}'`);
    return images;
  } catch (error) {
    console.error('❌ Error listing images:', error);
    throw error;
  }
}

// ============================================================================
// BATCH GROUPING
// ============================================================================

/**
 * Group images by their batch timestamp
 */
export function groupImagesByBatch(images: DriveImage[]): ImageBatch[] {
  const batchMap = new Map<number, DriveImage[]>();

  for (const image of images) {
    const existing = batchMap.get(image.batchTimestamp) || [];
    existing.push(image);
    batchMap.set(image.batchTimestamp, existing);
  }

  // Convert to array and sort by timestamp (newest first)
  const batches: ImageBatch[] = [];
  for (const [timestamp, batchImages] of batchMap) {
    // Sort images within batch by index
    batchImages.sort((a, b) => a.batchIndex - b.batchIndex);

    batches.push({
      timestamp,
      images: batchImages,
      createdAt: new Date(timestamp),
    });
  }

  // Sort batches by timestamp (newest first)
  batches.sort((a, b) => b.timestamp - a.timestamp);

  console.log(`📊 Grouped into ${batches.length} batches:`);
  for (const batch of batches.slice(0, 5)) {
    console.log(`   - Batch ${batch.timestamp}: ${batch.images.length} images`);
  }
  if (batches.length > 5) {
    console.log(`   ... and ${batches.length - 5} more batches`);
  }

  return batches;
}

// ============================================================================
// IMAGE DOWNLOAD
// ============================================================================

/**
 * Ensure cache directory exists
 */
function ensureCacheDir(): void {
  if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
  }
}

/**
 * Download an image from Google Drive
 */
export async function downloadImage(image: DriveImage): Promise<string> {
  const drive = await initializeDriveClient();
  ensureCacheDir();

  const localPath = path.join(CACHE_DIR, `${image.id}-${image.name}`);

  // Check if already cached
  if (fs.existsSync(localPath)) {
    console.log(`📁 Using cached: ${image.name}`);
    return localPath;
  }

  console.log(`📥 Downloading: ${image.name}`);

  try {
    const response = await drive.files.get(
      { fileId: image.id, alt: 'media' },
      { responseType: 'stream' }
    );

    return new Promise((resolve, reject) => {
      const dest = fs.createWriteStream(localPath);
      (response.data as NodeJS.ReadableStream)
        .pipe(dest)
        .on('finish', () => {
          console.log(`✅ Downloaded: ${image.name}`);
          resolve(localPath);
        })
        .on('error', (error) => {
          fs.unlinkSync(localPath);
          reject(error);
        });
    });
  } catch (error) {
    console.error(`❌ Failed to download ${image.name}:`, error);
    throw error;
  }
}

/**
 * Download multiple images from a batch
 */
export async function downloadBatch(batch: ImageBatch): Promise<string[]> {
  const paths: string[] = [];

  for (const image of batch.images) {
    try {
      const localPath = await downloadImage(image);
      paths.push(localPath);
    } catch (error) {
      console.error(`❌ Failed to download image from batch:`, error);
    }
  }

  return paths;
}

/**
 * Get image as base64 data URL
 */
export async function getImageAsBase64(image: DriveImage): Promise<string> {
  const localPath = await downloadImage(image);
  const buffer = fs.readFileSync(localPath);
  const base64 = buffer.toString('base64');
  const mimeType = image.mimeType || 'image/png';
  return `data:${mimeType};base64,${base64}`;
}

// ============================================================================
// MAIN INGESTION FUNCTION
// ============================================================================

/**
 * Full ingestion: list all images and group by batch
 */
export async function ingestFromDrive(): Promise<DriveIngestionResult> {
  try {
    console.log('🚀 Starting Google Drive ingestion...');

    // List all images
    const images = await listImages();

    if (images.length === 0) {
      return {
        success: true,
        images: [],
        batches: [],
      };
    }

    // Group by batch
    const batches = groupImagesByBatch(images);

    console.log(`✅ Ingestion complete: ${images.length} images in ${batches.length} batches`);

    return {
      success: true,
      images,
      batches,
    };
  } catch (error) {
    console.error('❌ Ingestion failed:', error);
    return {
      success: false,
      images: [],
      batches: [],
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Clean up cached images older than specified hours
 */
export function cleanupCache(maxAgeHours: number = 24): void {
  if (!fs.existsSync(CACHE_DIR)) return;

  const maxAge = maxAgeHours * 60 * 60 * 1000;
  const now = Date.now();

  const files = fs.readdirSync(CACHE_DIR);
  let cleaned = 0;

  for (const file of files) {
    const filePath = path.join(CACHE_DIR, file);
    const stats = fs.statSync(filePath);

    if (now - stats.mtimeMs > maxAge) {
      fs.unlinkSync(filePath);
      cleaned++;
    }
  }

  if (cleaned > 0) {
    console.log(`🧹 Cleaned ${cleaned} cached images older than ${maxAgeHours}h`);
  }
}

/**
 * Get statistics about the Drive folder
 */
export async function getDriveStats(): Promise<{
  totalImages: number;
  totalBatches: number;
  oldestBatch: Date | null;
  newestBatch: Date | null;
  averageBatchSize: number;
}> {
  const result = await ingestFromDrive();

  if (!result.success || result.batches.length === 0) {
    return {
      totalImages: 0,
      totalBatches: 0,
      oldestBatch: null,
      newestBatch: null,
      averageBatchSize: 0,
    };
  }

  const totalImages = result.images.length;
  const totalBatches = result.batches.length;
  const oldestBatch = result.batches[result.batches.length - 1].createdAt;
  const newestBatch = result.batches[0].createdAt;
  const averageBatchSize = totalImages / totalBatches;

  return {
    totalImages,
    totalBatches,
    oldestBatch,
    newestBatch,
    averageBatchSize,
  };
}
