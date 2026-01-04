#!/usr/bin/env node
/**
 * AUTO-PUBLISH - Standalone Script
 *
 * Publishes content from Google Drive to Instagram.
 * Works directly with Node.js (no ts-node required).
 *
 * Usage:
 *   node scripts/autoPublish.mjs [options]
 *
 * Options:
 *   --dry-run, -d       Preview without publishing
 *   --max <n>, -m       Maximum posts per run (default: 3)
 *   --status, -s        Show status only
 *   --quick, -q         Quick publish (next best single post)
 */

import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

// ============================================================================
// CONFIGURATION
// ============================================================================

// Validate required environment variables for publishing
const REQUIRE_TOKENS = !process.argv.includes('--dry-run') && !process.argv.includes('-d') && !process.argv.includes('--status') && !process.argv.includes('-s');
if (REQUIRE_TOKENS && !process.env.INSTAGRAM_TOKEN) throw new Error('INSTAGRAM_TOKEN environment variable required');
if (REQUIRE_TOKENS && !process.env.GITHUB_TOKEN) throw new Error('GITHUB_TOKEN environment variable required');

const CONFIG = {
  // Google Drive
  CREDS_PATH: '/home/ecolex/version1/studiov-drive-ingest-870127e5767e.json',
  // Multiple source folders - can use name+parent OR direct folder ID
  ASSET_FOLDERS: [
    { name: 'asset1.1', prefix: 'ai-image-studio' },
    { id: '1cygYarv8MNktju59Ulblh7WhduxncG24', name: 'Backups/Downloads', prefix: null }, // Direct folder ID - all images
  ],
  IMAGE_PREFIX: 'ai-image-studio', // Default prefix for asset1.1

  // Instagram - tokens from environment
  IG_ACCOUNT_ID: process.env.INSTAGRAM_ACCOUNT_ID || '17841478517688462',
  PAGE_ACCESS_TOKEN: process.env.INSTAGRAM_TOKEN || '',
  GRAPH_API_BASE: 'https://graph.facebook.com/v21.0',

  // GitHub hosting - tokens from environment
  GITHUB_TOKEN: process.env.GITHUB_TOKEN || '',
  GITHUB_OWNER: process.env.GITHUB_USER || 'aemons9',
  GITHUB_REPO: process.env.GITHUB_REPO || 'studiov1',
  GITHUB_BRANCH: 'main',
  GITHUB_PATH: 'photo/instagram',

  // Local
  CACHE_DIR: path.join(process.cwd(), 'temp', 'drive-cache'),
  HISTORY_FILE: path.join(process.cwd(), 'data', 'posting-history.json'),
  PREVIEW_DIR: path.join(process.cwd(), 'preview-output', 'pending'),
  PENDING_FILE: path.join(process.cwd(), 'data', 'pending-publish.json'),
};

// Caption styles - Creative and engaging
const CAPTION_STYLES = {
  editorial: [
    'A study in light and form.',
    'Where elegance meets artistry.',
    'Capturing the essence of beauty.',
    'An exploration of grace.',
    'Timeless in its simplicity.',
    'The intersection of art and emotion.',
    'Visual poetry in every frame.',
  ],
  minimalist: ['—', '.', '✧', '◦', '∘', '·', '⋆'],
  luxury: [
    'Crafted with intention. Captured with care.',
    'The art of being extraordinary.',
    'Where every detail matters.',
    'Excellence in every frame.',
    'Refined beauty, uncompromised.',
    'Elegance is an attitude.',
    'Luxury is in the details.',
  ],
  cinematic: [
    'Frame by frame, story by story.',
    'A moment suspended in time.',
    'The poetry of visual storytelling.',
    'Where light becomes narrative.',
    'Cinema in stillness.',
    'Every picture tells a story.',
    'Captured moments, eternal memories.',
  ],
  carousel: [
    'Swipe for more ✨',
    'A collection of moments →',
    'Four frames, one story.',
    'The journey continues... swipe →',
    'Every angle tells a different story.',
    'A visual diary →',
    'More to discover... keep swiping ✨',
    'Four perspectives, infinite beauty.',
    'Slide into beauty →',
    'Each frame, a new chapter.',
  ],
  viral: [
    'This is what dreams are made of ✨',
    'Main character energy.',
    'Obsessed with this aesthetic.',
    'Living for these vibes.',
    'The algorithm brought you here for a reason.',
    'POV: You found your new favorite account.',
    'This is your sign to follow ✨',
    'Serving looks, one frame at a time.',
  ],
};

// Popular Instagram hashtags - High engagement
const HASHTAGS = {
  base: ['studiov', 'aiart', 'aiimages', 'digitalart', 'creativeai'],
  feed: [
    'photography', 'portrait', 'beauty', 'aesthetic', 'visualart',
    'photooftheday', 'instagood', 'picoftheday', 'beautiful', 'art',
  ],
  carousel: [
    'photodump', 'aesthetic', 'vibes', 'mood', 'inspo',
    'photooftheday', 'explorepage', 'viral', 'trending', 'fyp',
    'contentcreator', 'digitalcreator', 'visualcontent', 'carousel',
  ],
  reel: ['reels', 'video', 'motion', 'cinematic', 'visualjourney'],
  popular: [
    'explore', 'viral', 'trending', 'fyp', 'foryou',
    'instagram', 'instagood', 'instadaily', 'instaart', 'instalike',
    'follow', 'like', 'comment', 'share', 'save',
    'aesthetic', 'aestheticphotos', 'aestheticedit', 'moodboard',
    'contentcreator', 'influencer', 'model', 'fashion', 'style',
  ],
};

// ============================================================================
// UTILITIES
// ============================================================================

function parseFilename(filename) {
  const match = filename.match(/ai-image-studio-(\d+)-(\d+)\.(png|jpg|jpeg|webp)$/i);
  if (!match) return null;
  return {
    timestamp: parseInt(match[1], 10),
    index: parseInt(match[2], 10),
  };
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function loadHistory() {
  if (!fs.existsSync(CONFIG.HISTORY_FILE)) {
    return { posts: [] };
  }
  try {
    return JSON.parse(fs.readFileSync(CONFIG.HISTORY_FILE, 'utf8'));
  } catch {
    return { posts: [] };
  }
}

function saveHistory(history) {
  ensureDir(path.dirname(CONFIG.HISTORY_FILE));
  fs.writeFileSync(CONFIG.HISTORY_FILE, JSON.stringify(history, null, 2));
}

function getPostedFileIds() {
  const history = loadHistory();
  const ids = new Set();
  (history.posts || []).forEach(post => {
    if (post.success) {
      (post.driveFileIds || []).forEach(id => ids.add(id));
    }
  });
  return ids;
}

function addPostRecord(record) {
  const history = loadHistory();
  history.posts = history.posts || [];
  history.posts.push({
    ...record,
    id: `post-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    postedAt: new Date().toISOString(),
  });
  saveHistory(history);
}

function generateCaption(style) {
  const captions = CAPTION_STYLES[style] || CAPTION_STYLES.editorial;
  return captions[Math.floor(Math.random() * captions.length)];
}

function generateHashtags(postType, count = 20) {
  // Combine base + type-specific + popular hashtags
  const tags = [
    ...HASHTAGS.base,
    ...(HASHTAGS[postType] || HASHTAGS.feed),
    ...HASHTAGS.popular,
  ];
  // Remove duplicates and shuffle
  const uniqueTags = [...new Set(tags)];
  const shuffled = uniqueTags.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).map(t => `#${t}`).join(' ');
}

function generateCarouselCaption() {
  // Pick a creative carousel caption + a viral caption
  const carouselCaptions = CAPTION_STYLES.carousel;
  const viralCaptions = CAPTION_STYLES.viral;

  const main = carouselCaptions[Math.floor(Math.random() * carouselCaptions.length)];
  const viral = viralCaptions[Math.floor(Math.random() * viralCaptions.length)];

  // 50% chance to use viral style
  return Math.random() > 0.5 ? main : viral;
}

/**
 * Check if image might be inappropriate for Instagram
 * Filters by filename keywords that suggest adult/NSFW content
 */
function isInstagramSafe(imageName) {
  const unsafeKeywords = [
    'nude', 'nsfw', 'adult', '18+', 'xxx', 'explicit',
    'patreon', 'onlyfans', 'fansly', 'uncensored',
    'topless', 'naked', 'lingerie', 'boudoir', 'intimate',
    'private', 'exclusive', 'premium', 'vip',
    'seminude', 'semi-nude', 'revealing',
  ];

  const lowerName = imageName.toLowerCase();

  for (const keyword of unsafeKeywords) {
    if (lowerName.includes(keyword)) {
      return false;
    }
  }

  return true;
}

/**
 * Filter images for Instagram safety
 */
function filterSafeImages(images) {
  const safe = [];
  const filtered = [];

  for (const img of images) {
    if (isInstagramSafe(img.name)) {
      safe.push(img);
    } else {
      filtered.push(img);
    }
  }

  if (filtered.length > 0) {
    console.log(`   ⚠️ Filtered ${filtered.length} potentially inappropriate images`);
  }

  return safe;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Resize image to Instagram-compatible aspect ratio
 * Instagram supports: 4:5 (portrait) to 1.91:1 (landscape)
 * Min ratio: 0.8, Max ratio: 1.91
 */
function resizeForInstagram(inputPath) {
  const outputPath = inputPath.replace(/\.(png|jpg|jpeg|webp)$/i, '-ig.jpg');

  try {
    // Get current dimensions
    const identifyCmd = `identify -format "%w %h" "${inputPath}"`;
    const dimensions = execSync(identifyCmd, { encoding: 'utf8' }).trim();
    const [width, height] = dimensions.split(' ').map(Number);
    const ratio = width / height;

    console.log(`   📐 Original: ${width}x${height} (ratio: ${ratio.toFixed(2)})`);

    // Instagram constraints
    const minRatio = 0.8;  // 4:5 portrait
    const maxRatio = 1.91; // 1.91:1 landscape

    let convertCmd;

    if (ratio < minRatio) {
      // Too tall (portrait) - crop to 4:5
      const newHeight = Math.round(width / minRatio);
      console.log(`   ✂️ Cropping to 4:5 portrait (${width}x${newHeight})`);
      convertCmd = `convert "${inputPath}" -gravity center -crop ${width}x${newHeight}+0+0 +repage -quality 95 "${outputPath}"`;
    } else if (ratio > maxRatio) {
      // Too wide (landscape) - crop to 1.91:1
      const newWidth = Math.round(height * maxRatio);
      console.log(`   ✂️ Cropping to 1.91:1 landscape (${newWidth}x${height})`);
      convertCmd = `convert "${inputPath}" -gravity center -crop ${newWidth}x${height}+0+0 +repage -quality 95 "${outputPath}"`;
    } else {
      // Ratio is acceptable - just convert to JPG
      console.log(`   ✅ Ratio OK, converting to JPG`);
      convertCmd = `convert "${inputPath}" -quality 95 "${outputPath}"`;
    }

    execSync(convertCmd);
    return outputPath;
  } catch (error) {
    console.error(`   ⚠️ Resize failed: ${error.message}`);
    return inputPath; // Fall back to original
  }
}

// ============================================================================
// GOOGLE DRIVE
// ============================================================================

async function initDrive() {
  const creds = JSON.parse(fs.readFileSync(CONFIG.CREDS_PATH, 'utf8'));
  const auth = new google.auth.JWT({
    email: creds.client_email,
    key: creds.private_key,
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  });
  return google.drive({ version: 'v3', auth });
}

async function findAssetFolder(drive, folderName = 'asset1.1', parentPath = null) {
  // If parent path specified (e.g., "Backup"), find parent first
  let parentId = null;
  if (parentPath) {
    const parentResponse = await drive.files.list({
      q: `name = '${parentPath}' and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
      fields: 'files(id, name)',
      spaces: 'drive',
    });
    const parentFolders = parentResponse.data.files || [];
    if (parentFolders.length > 0) {
      parentId = parentFolders[0].id;
    } else {
      console.log(`   ⚠️ Parent folder '${parentPath}' not found`);
      return null;
    }
  }

  // Find the target folder
  let query = `name = '${folderName}' and mimeType = 'application/vnd.google-apps.folder' and trashed = false`;
  if (parentId) {
    query += ` and '${parentId}' in parents`;
  }

  const response = await drive.files.list({
    q: query,
    fields: 'files(id, name)',
    spaces: 'drive',
  });
  const folders = response.data.files || [];
  return folders.length > 0 ? folders[0].id : null;
}

async function findAllAssetFolders(drive) {
  const folderIds = [];

  for (const folderConfig of CONFIG.ASSET_FOLDERS) {
    // If direct folder ID is provided, use it
    if (folderConfig.id) {
      console.log(`   📂 Using direct folder ID: ${folderConfig.name}`);
      folderIds.push({
        id: folderConfig.id,
        name: folderConfig.name,
        prefix: folderConfig.prefix,
        fullPath: folderConfig.name,
      });
      console.log(`   ✅ Added: ${folderConfig.name} (${folderConfig.id})`);
    } else {
      // Search for folder by name
      console.log(`   🔍 Searching for: ${folderConfig.parentPath ? folderConfig.parentPath + '/' : ''}${folderConfig.name}`);
      const folderId = await findAssetFolder(drive, folderConfig.name, folderConfig.parentPath);
      if (folderId) {
        folderIds.push({
          id: folderId,
          name: folderConfig.name,
          prefix: folderConfig.prefix,
          fullPath: folderConfig.parentPath ? `${folderConfig.parentPath}/${folderConfig.name}` : folderConfig.name,
        });
        console.log(`   ✅ Found: ${folderConfig.name} (${folderId})`);
      } else {
        console.log(`   ⚠️ Not found: ${folderConfig.name}`);
      }
    }
  }

  return folderIds;
}

async function listImages(drive, folderId, prefix = null) {
  const images = [];
  let pageToken;

  do {
    const response = await drive.files.list({
      q: `'${folderId}' in parents and mimeType contains 'image/' and trashed = false`,
      fields: 'nextPageToken, files(id, name, mimeType, createdTime, size)',
      pageSize: 100,
      pageToken,
      orderBy: 'createdTime desc',
    });

    const files = response.data.files || [];
    for (const file of files) {
      // If prefix specified, filter by it
      if (prefix && !file.name?.startsWith(prefix)) continue;

      // Try to parse filename for batch info
      const parsed = parseFilename(file.name);

      // For images without prefix pattern, generate unique batch info
      const batchTimestamp = parsed?.timestamp || new Date(file.createdTime).getTime();
      const batchIndex = parsed?.index || 0;

      images.push({
        id: file.id,
        name: file.name,
        mimeType: file.mimeType || 'image/png',
        createdTime: file.createdTime,
        size: parseInt(file.size || '0', 10),
        batchTimestamp,
        batchIndex,
        source: folderId, // Track source folder
      });
    }

    pageToken = response.data.nextPageToken;
  } while (pageToken);

  return images;
}

async function listAllImages(drive) {
  const allImages = [];
  const folders = await findAllAssetFolders(drive);

  for (const folder of folders) {
    console.log(`   📸 Scanning: ${folder.fullPath}...`);
    const images = await listImages(drive, folder.id, folder.prefix);
    console.log(`      Found ${images.length} images`);

    // Add folder info to each image
    images.forEach(img => {
      img.sourceFolder = folder.fullPath;
    });

    allImages.push(...images);
  }

  return allImages;
}

function groupByBatch(images) {
  const batchMap = new Map();

  for (const image of images) {
    if (!batchMap.has(image.batchTimestamp)) {
      batchMap.set(image.batchTimestamp, []);
    }
    batchMap.get(image.batchTimestamp).push(image);
  }

  const batches = [];
  for (const [timestamp, imgs] of batchMap) {
    imgs.sort((a, b) => a.batchIndex - b.batchIndex);
    batches.push({ timestamp, images: imgs });
  }

  batches.sort((a, b) => b.timestamp - a.timestamp);
  return batches;
}

async function downloadImage(drive, image) {
  ensureDir(CONFIG.CACHE_DIR);
  const localPath = path.join(CONFIG.CACHE_DIR, `${image.id}-${image.name}`);

  if (fs.existsSync(localPath)) {
    return localPath;
  }

  const response = await drive.files.get(
    { fileId: image.id, alt: 'media' },
    { responseType: 'stream' }
  );

  return new Promise((resolve, reject) => {
    const dest = fs.createWriteStream(localPath);
    response.data
      .pipe(dest)
      .on('finish', () => resolve(localPath))
      .on('error', reject);
  });
}

async function getImageBase64(drive, image) {
  const localPath = await downloadImage(drive, image);
  // Resize to Instagram-compatible aspect ratio
  const resizedPath = resizeForInstagram(localPath);
  const buffer = fs.readFileSync(resizedPath);
  return buffer.toString('base64');
}

// ============================================================================
// GITHUB UPLOAD
// ============================================================================

async function uploadToGitHub(base64Data, filename) {
  const filePath = `${CONFIG.GITHUB_PATH}/${filename}`;
  const apiUrl = `https://api.github.com/repos/${CONFIG.GITHUB_OWNER}/${CONFIG.GITHUB_REPO}/contents/${filePath}`;

  console.log(`   📤 Uploading to GitHub: ${filename}`);

  const response = await fetch(apiUrl, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${CONFIG.GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: `[Auto] Add image: ${filename}`,
      content: base64Data,
      branch: CONFIG.GITHUB_BRANCH,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    console.error('   ❌ GitHub upload failed:', error.message || error);
    return null;
  }

  const publicUrl = `https://raw.githubusercontent.com/${CONFIG.GITHUB_OWNER}/${CONFIG.GITHUB_REPO}/${CONFIG.GITHUB_BRANCH}/${filePath}`;

  // Wait for CDN propagation
  await sleep(2000);

  return publicUrl;
}

// ============================================================================
// INSTAGRAM PUBLISHING
// ============================================================================

async function waitForContainer(containerId, maxAttempts = 30) {
  for (let i = 0; i < maxAttempts; i++) {
    await sleep(2000);

    const statusUrl = `${CONFIG.GRAPH_API_BASE}/${containerId}?fields=status,status_code&access_token=${CONFIG.PAGE_ACCESS_TOKEN}`;
    const response = await fetch(statusUrl);
    const data = await response.json();

    const status = (data.status || '').toUpperCase();

    // Check for finished state (case-insensitive)
    if (status === 'FINISHED' || status.startsWith('FINISHED')) {
      console.log(`   ✅ Container ready!`);
      return true;
    }

    if (status === 'ERROR' || status.startsWith('ERROR')) {
      throw new Error(`Container processing failed: ${data.status_code || data.status}`);
    }

    // Only log every 5th check to reduce noise
    if (i % 5 === 0) {
      console.log(`   Status check ${i + 1}/${maxAttempts}: ${data.status || 'IN_PROGRESS'}`);
    }
  }

  throw new Error('Timeout waiting for container');
}

async function publishFeedPost(imageUrl, caption) {
  console.log('📸 Publishing feed post...');

  // Create container
  const containerUrl = `${CONFIG.GRAPH_API_BASE}/${CONFIG.IG_ACCOUNT_ID}/media`;
  const containerParams = new URLSearchParams({
    image_url: imageUrl,
    caption,
    access_token: CONFIG.PAGE_ACCESS_TOKEN,
  });

  const containerResponse = await fetch(containerUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: containerParams.toString(),
  });

  const containerData = await containerResponse.json();

  if (!containerResponse.ok) {
    return {
      success: false,
      error: containerData.error?.message || 'Container creation failed',
    };
  }

  const containerId = containerData.id;
  console.log(`   Container created: ${containerId}`);

  // Wait for processing
  await waitForContainer(containerId);

  // Publish
  const publishUrl = `${CONFIG.GRAPH_API_BASE}/${CONFIG.IG_ACCOUNT_ID}/media_publish`;
  const publishParams = new URLSearchParams({
    creation_id: containerId,
    access_token: CONFIG.PAGE_ACCESS_TOKEN,
  });

  const publishResponse = await fetch(publishUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: publishParams.toString(),
  });

  const publishData = await publishResponse.json();

  if (!publishResponse.ok) {
    return {
      success: false,
      error: publishData.error?.message || 'Publish failed',
    };
  }

  console.log(`✅ Feed post published! Media ID: ${publishData.id}`);
  return { success: true, mediaId: publishData.id };
}

async function publishCarousel(imageUrls, caption) {
  console.log(`📚 Publishing carousel with ${imageUrls.length} images...`);

  // Create child containers
  const childIds = [];

  for (const imageUrl of imageUrls) {
    const containerUrl = `${CONFIG.GRAPH_API_BASE}/${CONFIG.IG_ACCOUNT_ID}/media`;
    const containerParams = new URLSearchParams({
      image_url: imageUrl,
      is_carousel_item: 'true',
      access_token: CONFIG.PAGE_ACCESS_TOKEN,
    });

    const response = await fetch(containerUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: containerParams.toString(),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(`   ❌ Failed to create carousel item:`, data.error);
      continue;
    }

    childIds.push(data.id);
    console.log(`   Child container: ${data.id}`);
  }

  if (childIds.length < 2) {
    return { success: false, error: 'Need at least 2 carousel items' };
  }

  // Wait for all children
  for (const childId of childIds) {
    await waitForContainer(childId);
  }

  // Create carousel container
  const carouselUrl = `${CONFIG.GRAPH_API_BASE}/${CONFIG.IG_ACCOUNT_ID}/media`;
  const carouselParams = new URLSearchParams({
    media_type: 'CAROUSEL',
    children: childIds.join(','),
    caption,
    access_token: CONFIG.PAGE_ACCESS_TOKEN,
  });

  const carouselResponse = await fetch(carouselUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: carouselParams.toString(),
  });

  const carouselData = await carouselResponse.json();

  if (!carouselResponse.ok) {
    return {
      success: false,
      error: carouselData.error?.message || 'Carousel creation failed',
    };
  }

  const containerId = carouselData.id;
  console.log(`   Carousel container: ${containerId}`);

  await waitForContainer(containerId);

  // Publish
  const publishUrl = `${CONFIG.GRAPH_API_BASE}/${CONFIG.IG_ACCOUNT_ID}/media_publish`;
  const publishParams = new URLSearchParams({
    creation_id: containerId,
    access_token: CONFIG.PAGE_ACCESS_TOKEN,
  });

  const publishResponse = await fetch(publishUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: publishParams.toString(),
  });

  const publishData = await publishResponse.json();

  if (!publishResponse.ok) {
    return {
      success: false,
      error: publishData.error?.message || 'Publish failed',
    };
  }

  console.log(`✅ Carousel published! Media ID: ${publishData.id}`);
  return { success: true, mediaId: publishData.id };
}

// ============================================================================
// CONTENT STRATEGY
// ============================================================================

function getPostType(imageCount) {
  if (imageCount === 1) return 'feed';
  if (imageCount >= 2 && imageCount <= 10) return 'carousel';
  return 'feed'; // Default to feed for very large batches
}

function scoreBatch(batch, postedIds) {
  let score = 50;

  // Prefer unposted content
  const unpostedCount = batch.images.filter(img => !postedIds.has(img.id)).length;
  score += unpostedCount * 10;

  // Prefer newer content
  const hoursSince = (Date.now() - batch.timestamp) / (1000 * 60 * 60);
  if (hoursSince < 24) score += 20;
  else if (hoursSince < 72) score += 10;

  // Prefer batches with more images
  if (batch.images.length >= 5) score += 15;
  else if (batch.images.length >= 3) score += 10;

  return score;
}

function selectCandidates(batches, postedIds, maxPosts) {
  const candidates = [];

  for (const batch of batches) {
    const unposted = batch.images.filter(img => !postedIds.has(img.id));
    if (unposted.length === 0) continue;

    candidates.push({
      batch,
      images: unposted,
      score: scoreBatch({ ...batch, images: unposted }, postedIds),
      postType: getPostType(unposted.length),
    });
  }

  // Sort by score
  candidates.sort((a, b) => b.score - a.score);

  return candidates.slice(0, maxPosts);
}

// ============================================================================
// MAIN FUNCTIONS
// ============================================================================

async function showStatus() {
  console.log('\n' + '═'.repeat(60));
  console.log('📊 AUTO-PUBLISH STATUS');
  console.log('═'.repeat(60) + '\n');

  const drive = await initDrive();
  const folderId = await findAssetFolder(drive);

  if (!folderId) {
    console.log('❌ Asset folder not found!');
    return;
  }

  const images = await listImages(drive, folderId);
  const batches = groupByBatch(images);
  const postedIds = getPostedFileIds();

  console.log('📂 Google Drive:');
  console.log(`   Total images: ${images.length}`);
  console.log(`   Batches: ${batches.length}`);
  console.log();

  // Count candidates
  let feedCount = 0, carouselCount = 0;

  for (const batch of batches) {
    const unposted = batch.images.filter(img => !postedIds.has(img.id));
    if (unposted.length === 0) continue;

    if (unposted.length === 1) feedCount++;
    else if (unposted.length >= 2) carouselCount++;
  }

  console.log('🎨 Content Candidates:');
  console.log(`   Feed posts: ${feedCount}`);
  console.log(`   Carousels: ${carouselCount}`);
  console.log();

  // History
  const history = loadHistory();
  const successful = (history.posts || []).filter(p => p.success).length;
  console.log('📝 Posting History:');
  console.log(`   Total posts: ${history.posts?.length || 0}`);
  console.log(`   Successful: ${successful}`);
  console.log(`   Posted files: ${postedIds.size}`);
  console.log();

  // Recent batches
  console.log('📷 Recent Batches:');
  for (const batch of batches.slice(0, 5)) {
    const date = new Date(batch.timestamp).toLocaleString();
    const unposted = batch.images.filter(img => !postedIds.has(img.id)).length;
    const status = unposted === 0 ? '✅ Posted' : `📌 ${unposted} unposted`;
    console.log(`   ${date} - ${batch.images.length} images - ${status}`);
  }

  console.log('\n' + '═'.repeat(60) + '\n');
}

async function runPublish(options) {
  const { dryRun, maxPosts } = options;

  console.log('\n' + '═'.repeat(60));
  console.log('🚀 AUTO-PUBLISHING TO INSTAGRAM');
  console.log('═'.repeat(60) + '\n');

  console.log('⚙️ Configuration:');
  console.log(`   Instagram Account: ${CONFIG.IG_ACCOUNT_ID}`);
  console.log(`   Dry Run: ${dryRun ? 'Yes' : 'No'}`);
  console.log(`   Max Posts: ${maxPosts}`);
  console.log();

  // Initialize Drive
  console.log('📂 Step 1: Loading from Google Drive...');
  const drive = await initDrive();
  const folderId = await findAssetFolder(drive);

  if (!folderId) {
    console.log('❌ Asset folder not found!');
    return;
  }

  const images = await listImages(drive, folderId);
  const batches = groupByBatch(images);
  const postedIds = getPostedFileIds();

  console.log(`   Found ${images.length} images in ${batches.length} batches`);

  // Select candidates
  console.log('\n🎨 Step 2: Selecting content...');
  const candidates = selectCandidates(batches, postedIds, maxPosts);

  if (candidates.length === 0) {
    console.log('   ⚠️ No unposted content available!');
    return;
  }

  console.log(`   Selected ${candidates.length} candidates`);

  // Publish each candidate
  console.log('\n📤 Step 3: Publishing...\n');

  const results = [];
  const captionStyles = Object.keys(CAPTION_STYLES);

  for (let i = 0; i < candidates.length; i++) {
    const candidate = candidates[i];
    const { images: candidateImages, postType, score } = candidate;

    console.log(`\n${'─'.repeat(50)}`);
    console.log(`📝 Post ${i + 1}/${candidates.length}: ${postType.toUpperCase()}`);
    console.log(`   Images: ${candidateImages.length}`);
    console.log(`   Score: ${score}`);

    // Generate caption
    const style = captionStyles[Math.floor(Math.random() * captionStyles.length)];
    const caption = generateCaption(style);
    const hashtags = generateHashtags(postType);
    const fullCaption = `${caption}\n\n${hashtags}`;

    console.log(`   Caption: "${caption}"`);

    if (dryRun) {
      console.log('   🔵 DRY RUN - Skipping actual publish');
      results.push({
        success: true,
        postType,
        dryRun: true,
        images: candidateImages.map(img => img.name),
      });
      continue;
    }

    try {
      let result;

      if (postType === 'feed') {
        // Single image
        const image = candidateImages[0];
        const base64 = await getImageBase64(drive, image);
        const filename = `auto-${Date.now()}-${Math.random().toString(36).substring(2, 6)}.jpg`;
        const imageUrl = await uploadToGitHub(base64, filename);

        if (!imageUrl) {
          throw new Error('Failed to upload to GitHub');
        }

        result = await publishFeedPost(imageUrl, fullCaption);
      } else if (postType === 'carousel') {
        // Multiple images
        const imageUrls = [];

        for (const image of candidateImages.slice(0, 10)) {
          const base64 = await getImageBase64(drive, image);
          const filename = `auto-${Date.now()}-${Math.random().toString(36).substring(2, 6)}.jpg`;
          const imageUrl = await uploadToGitHub(base64, filename);

          if (imageUrl) {
            imageUrls.push(imageUrl);
          }
        }

        if (imageUrls.length < 2) {
          throw new Error('Not enough images uploaded for carousel');
        }

        result = await publishCarousel(imageUrls, fullCaption);
      }

      // Record post
      addPostRecord({
        driveFileIds: candidateImages.map(img => img.id),
        batchTimestamps: [candidate.batch.timestamp],
        postType,
        instagramMediaId: result?.mediaId,
        caption: fullCaption,
        success: result?.success || false,
        error: result?.error,
      });

      results.push(result);

      // Delay between posts
      if (i < candidates.length - 1) {
        console.log('   ⏳ Waiting 5 seconds before next post...');
        await sleep(5000);
      }
    } catch (error) {
      console.error(`   ❌ Error: ${error.message}`);

      addPostRecord({
        driveFileIds: candidateImages.map(img => img.id),
        batchTimestamps: [candidate.batch.timestamp],
        postType,
        success: false,
        error: error.message,
      });

      results.push({ success: false, error: error.message });
    }
  }

  // Summary
  console.log('\n' + '═'.repeat(60));
  console.log('📊 PUBLISH COMPLETE');
  console.log('═'.repeat(60));
  console.log(`   Total: ${results.length}`);
  console.log(`   Successful: ${results.filter(r => r.success).length}`);
  console.log(`   Failed: ${results.filter(r => !r.success).length}`);
  console.log('═'.repeat(60) + '\n');
}

// ============================================================================
// PREVIEW MODE - Review before publishing
// ============================================================================

async function previewCarousel(options) {
  const { carouselCount } = options;

  console.log('\n' + '═'.repeat(60));
  console.log('👁️ CAROUSEL PREVIEW MODE');
  console.log('═'.repeat(60) + '\n');

  console.log('⚙️ Configuration:');
  console.log(`   Images to preview: ${carouselCount}`);
  console.log();

  // Initialize Drive
  console.log('📂 Step 1: Loading from ALL Google Drive sources...');
  const drive = await initDrive();
  const images = await listAllImages(drive);
  const batches = groupByBatch(images);
  const postedIds = getPostedFileIds();

  console.log(`\n   Total images: ${images.length} from all sources`);

  // Select random unposted images
  console.log(`\n🎨 Step 2: Selecting ${carouselCount} diverse images...`);

  const unpostedImages = images.filter(img => !postedIds.has(img.id));
  console.log(`   Unposted images available: ${unpostedImages.length}`);

  // Filter for Instagram-safe content
  const safeImages = filterSafeImages(unpostedImages);
  console.log(`   Instagram-safe images: ${safeImages.length}`);

  if (safeImages.length < carouselCount) {
    console.log(`   ⚠️ Only ${safeImages.length} safe unposted images available`);
  }

  if (safeImages.length < 2) {
    console.log('   ❌ Need at least 2 Instagram-safe images for a carousel!');
    return;
  }

  // Shuffle and select from safe images only
  const shuffled = safeImages.sort(() => Math.random() - 0.5);
  const selectedImages = shuffled.slice(0, Math.min(carouselCount, shuffled.length));

  console.log(`   Selected ${selectedImages.length} images`);

  // Generate caption
  const caption = generateCarouselCaption();
  const hashtags = generateHashtags('carousel', 25);
  const fullCaption = `${caption}\n\n${hashtags}`;

  // Create preview directory
  ensureDir(CONFIG.PREVIEW_DIR);

  // Clear previous preview
  const previewFiles = fs.readdirSync(CONFIG.PREVIEW_DIR);
  for (const file of previewFiles) {
    fs.unlinkSync(path.join(CONFIG.PREVIEW_DIR, file));
  }

  // Download and save preview images
  console.log('\n📥 Step 3: Downloading preview images...');

  const previewImages = [];
  for (let i = 0; i < selectedImages.length; i++) {
    const image = selectedImages[i];
    console.log(`\n   📷 Image ${i + 1}/${selectedImages.length}: ${image.name}`);
    console.log(`      Source: ${image.sourceFolder || 'unknown'}`);

    try {
      const localPath = await downloadImage(drive, image);
      const resizedPath = resizeForInstagram(localPath);

      // Copy to preview folder with numbered name
      const ext = path.extname(resizedPath) || '.jpg';
      const previewPath = path.join(CONFIG.PREVIEW_DIR, `${i + 1}-preview${ext}`);
      fs.copyFileSync(resizedPath, previewPath);

      previewImages.push({
        index: i + 1,
        previewPath,
        originalName: image.name,
        driveId: image.id,
        sourceFolder: image.sourceFolder,
        batchTimestamp: image.batchTimestamp,
      });

      console.log(`      ✅ Saved: ${previewPath}`);
    } catch (error) {
      console.log(`      ❌ Error: ${error.message}`);
    }
  }

  // Save pending publish data
  const pendingData = {
    createdAt: new Date().toISOString(),
    caption,
    hashtags,
    fullCaption,
    imageCount: previewImages.length,
    images: previewImages,
  };

  ensureDir(path.dirname(CONFIG.PENDING_FILE));
  fs.writeFileSync(CONFIG.PENDING_FILE, JSON.stringify(pendingData, null, 2));

  // Show summary
  console.log('\n' + '═'.repeat(60));
  console.log('✅ PREVIEW READY FOR REVIEW');
  console.log('═'.repeat(60));
  console.log(`\n📁 Preview Location: ${CONFIG.PREVIEW_DIR}`);
  console.log(`\n📷 Images (${previewImages.length}):`);
  previewImages.forEach(img => {
    console.log(`   ${img.index}. ${img.originalName}`);
    console.log(`      Source: ${img.sourceFolder}`);
  });
  console.log(`\n✍️ Caption: "${caption}"`);
  console.log(`\n🏷️ Hashtags: ${hashtags.split(' ').length} tags`);
  console.log('\n' + '─'.repeat(60));
  console.log('📋 NEXT STEPS:');
  console.log('   1. Review images in: preview-output/pending/');
  console.log('   2. If OK, run: npm run auto:carousel:publish');
  console.log('   3. If not OK, run: npm run auto:carousel:preview (new selection)');
  console.log('═'.repeat(60) + '\n');
}

async function publishPendingCarousel() {
  console.log('\n' + '═'.repeat(60));
  console.log('📤 PUBLISHING PENDING CAROUSEL');
  console.log('═'.repeat(60) + '\n');

  // Load pending data
  if (!fs.existsSync(CONFIG.PENDING_FILE)) {
    console.log('❌ No pending carousel found!');
    console.log('   Run: npm run auto:carousel:preview first');
    return;
  }

  const pendingData = JSON.parse(fs.readFileSync(CONFIG.PENDING_FILE, 'utf8'));

  console.log('📋 Pending Carousel:');
  console.log(`   Created: ${pendingData.createdAt}`);
  console.log(`   Images: ${pendingData.imageCount}`);
  console.log(`   Caption: "${pendingData.caption}"`);
  console.log();

  // Verify preview images exist
  const validImages = pendingData.images.filter(img =>
    fs.existsSync(img.previewPath)
  );

  if (validImages.length < 2) {
    console.log('❌ Not enough valid preview images!');
    console.log('   Run: npm run auto:carousel:preview again');
    return;
  }

  // Upload to GitHub
  console.log('📤 Step 1: Uploading images to GitHub...');
  const imageUrls = [];

  for (const img of validImages) {
    console.log(`   📷 Uploading image ${img.index}...`);
    try {
      const buffer = fs.readFileSync(img.previewPath);
      const base64 = buffer.toString('base64');
      const filename = `carousel-${Date.now()}-${img.index}-${Math.random().toString(36).substring(2, 6)}.jpg`;
      const imageUrl = await uploadToGitHub(base64, filename);

      if (imageUrl) {
        imageUrls.push(imageUrl);
        console.log(`      ✅ Uploaded`);
      } else {
        console.log(`      ❌ Upload failed`);
      }
    } catch (error) {
      console.log(`      ❌ Error: ${error.message}`);
    }
  }

  if (imageUrls.length < 2) {
    console.log('\n❌ Failed to upload enough images');
    return;
  }

  // Publish carousel
  console.log('\n📚 Step 2: Publishing to Instagram...');
  const result = await publishCarousel(imageUrls, pendingData.fullCaption);

  // Record result
  addPostRecord({
    driveFileIds: validImages.map(img => img.driveId),
    batchTimestamps: validImages.map(img => img.batchTimestamp),
    postType: 'carousel',
    instagramMediaId: result?.mediaId,
    caption: pendingData.fullCaption,
    success: result?.success || false,
    error: result?.error,
  });

  // Clean up pending file
  if (result?.success) {
    fs.unlinkSync(CONFIG.PENDING_FILE);
  }

  // Summary
  console.log('\n' + '═'.repeat(60));
  console.log('📊 PUBLISH RESULT');
  console.log('═'.repeat(60));
  if (result?.success) {
    console.log('   ✅ SUCCESS!');
    console.log(`   Media ID: ${result.mediaId}`);
    console.log(`   Images: ${imageUrls.length}`);
  } else {
    console.log(`   ❌ FAILED: ${result?.error || 'Unknown error'}`);
  }
  console.log('═'.repeat(60) + '\n');
}

// ============================================================================
// CAROUSEL PUBLISHING (Direct mode - no preview)
// ============================================================================

async function runCarouselPublish(options) {
  const { dryRun, carouselCount } = options;

  console.log('\n' + '═'.repeat(60));
  console.log('📚 CAROUSEL PUBLISHING TO INSTAGRAM');
  console.log('═'.repeat(60) + '\n');

  console.log('⚙️ Configuration:');
  console.log(`   Instagram Account: ${CONFIG.IG_ACCOUNT_ID}`);
  console.log(`   Images in Carousel: ${carouselCount}`);
  console.log(`   Dry Run: ${dryRun ? 'Yes' : 'No'}`);
  console.log();

  // Initialize Drive
  console.log('📂 Step 1: Loading from ALL Google Drive sources...');
  const drive = await initDrive();
  const images = await listAllImages(drive);
  const batches = groupByBatch(images);
  const postedIds = getPostedFileIds();

  console.log(`\n   Total images: ${images.length} from all sources`);

  // Select random unposted images from different batches for variety
  console.log(`\n🎨 Step 2: Selecting ${carouselCount} diverse images...`);

  const unpostedBatches = batches.filter(batch =>
    batch.images.some(img => !postedIds.has(img.id))
  );

  if (unpostedBatches.length < carouselCount) {
    console.log(`   ⚠️ Only ${unpostedBatches.length} unposted batches available`);
    if (unpostedBatches.length < 2) {
      console.log('   ❌ Need at least 2 images for a carousel!');
      return;
    }
  }

  // Shuffle batches and pick one image from each (for variety)
  const shuffledBatches = unpostedBatches.sort(() => Math.random() - 0.5);
  const selectedImages = [];

  for (const batch of shuffledBatches) {
    if (selectedImages.length >= carouselCount) break;

    const unpostedInBatch = batch.images.filter(img => !postedIds.has(img.id));
    if (unpostedInBatch.length > 0) {
      // Pick random image from batch
      const randomImg = unpostedInBatch[Math.floor(Math.random() * unpostedInBatch.length)];
      selectedImages.push(randomImg);
    }
  }

  const actualCount = Math.min(selectedImages.length, carouselCount);
  console.log(`   Selected ${actualCount} images from different batches`);

  if (actualCount < 2) {
    console.log('   ❌ Need at least 2 images for a carousel!');
    return;
  }

  // Generate creative caption and hashtags
  console.log('\n✍️ Step 3: Generating creative caption...');
  const caption = generateCarouselCaption();
  const hashtags = generateHashtags('carousel', 25);
  const fullCaption = `${caption}\n\n${hashtags}`;

  console.log(`   Caption: "${caption}"`);
  console.log(`   Hashtags: ${hashtags.split(' ').length} tags`);

  // Process images
  console.log('\n📤 Step 4: Processing and uploading images...');

  const imageUrls = [];
  const driveFileIds = [];

  for (let i = 0; i < actualCount; i++) {
    const image = selectedImages[i];
    console.log(`\n   📷 Image ${i + 1}/${actualCount}: ${image.name}`);

    if (dryRun) {
      console.log('      🔵 DRY RUN - Skipping upload');
      imageUrls.push(`[DRY-RUN-URL-${i + 1}]`);
      driveFileIds.push(image.id);
      continue;
    }

    try {
      // Download and resize
      const base64 = await getImageBase64(drive, image);
      const filename = `carousel-${Date.now()}-${i + 1}-${Math.random().toString(36).substring(2, 6)}.jpg`;
      const imageUrl = await uploadToGitHub(base64, filename);

      if (imageUrl) {
        imageUrls.push(imageUrl);
        driveFileIds.push(image.id);
        console.log(`      ✅ Uploaded successfully`);
      } else {
        console.log(`      ❌ Upload failed`);
      }
    } catch (error) {
      console.log(`      ❌ Error: ${error.message}`);
    }
  }

  if (dryRun) {
    console.log('\n🔵 DRY RUN COMPLETE - No actual publish');
    console.log('\n📋 Preview:');
    console.log(`   Type: CAROUSEL`);
    console.log(`   Images: ${actualCount}`);
    console.log(`   Caption: "${caption}"`);
    console.log(`   Hashtags: ${hashtags.split(' ').length} tags`);
    console.log('\n' + '═'.repeat(60) + '\n');
    return;
  }

  if (imageUrls.length < 2) {
    console.log('\n❌ Failed to upload enough images for carousel');
    return;
  }

  // Publish carousel
  console.log('\n📚 Step 5: Publishing carousel...');
  const result = await publishCarousel(imageUrls, fullCaption);

  // Record result
  addPostRecord({
    driveFileIds,
    batchTimestamps: selectedImages.map(img => img.batchTimestamp),
    postType: 'carousel',
    instagramMediaId: result?.mediaId,
    caption: fullCaption,
    success: result?.success || false,
    error: result?.error,
  });

  // Summary
  console.log('\n' + '═'.repeat(60));
  console.log('📊 CAROUSEL PUBLISH COMPLETE');
  console.log('═'.repeat(60));
  if (result?.success) {
    console.log(`   ✅ SUCCESS!`);
    console.log(`   Media ID: ${result.mediaId}`);
    console.log(`   Images: ${imageUrls.length}`);
  } else {
    console.log(`   ❌ FAILED: ${result?.error || 'Unknown error'}`);
  }
  console.log('═'.repeat(60) + '\n');
}

// ============================================================================
// CLI
// ============================================================================

function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    dryRun: false,
    maxPosts: 3,
    statusOnly: false,
    quick: false,
    carousel: false,
    carouselCount: 4,
    preview: false,
    publishPending: false,
  };

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--dry-run':
      case '-d':
        options.dryRun = true;
        break;
      case '--max':
      case '-m':
        options.maxPosts = parseInt(args[++i], 10) || 3;
        break;
      case '--status':
      case '-s':
        options.statusOnly = true;
        break;
      case '--quick':
      case '-q':
        options.quick = true;
        options.maxPosts = 1;
        break;
      case '--carousel':
      case '-c':
        options.carousel = true;
        // Check if next arg is a number for image count
        if (args[i + 1] && !args[i + 1].startsWith('-')) {
          const count = parseInt(args[++i], 10);
          if (count >= 2 && count <= 10) {
            options.carouselCount = count;
          }
        }
        break;
      case '--preview':
      case '-p':
        options.preview = true;
        // Check if next arg is a number for image count
        if (args[i + 1] && !args[i + 1].startsWith('-')) {
          const count = parseInt(args[++i], 10);
          if (count >= 2 && count <= 10) {
            options.carouselCount = count;
          }
        }
        break;
      case '--publish-pending':
        options.publishPending = true;
        break;
      case '--help':
      case '-h':
        console.log(`
Auto-Publish: Instagram from Google Drive

Usage: node scripts/autoPublish.mjs [options]

Options:
  -d, --dry-run         Preview without publishing
  -m, --max <n>         Maximum posts (default: 3)
  -s, --status          Show status only
  -q, --quick           Quick publish (1 feed post)
  -c, --carousel [n]    Publish carousel directly (default: 4 images)
  -p, --preview [n]     Preview carousel for review (default: 4 images)
  --publish-pending     Publish the pending preview carousel
  -h, --help            Show this help

Preview Workflow:
  1. npm run auto:carousel:preview     # Generate preview
  2. Review images in preview-output/pending/
  3. npm run auto:carousel:publish     # Publish if OK

Examples:
  node scripts/autoPublish.mjs --preview 4       # Preview 4 images
  node scripts/autoPublish.mjs --publish-pending # Publish after review
        `);
        process.exit(0);
    }
  }

  return options;
}

async function main() {
  const options = parseArgs();

  if (options.statusOnly) {
    await showStatus();
  } else if (options.preview) {
    await previewCarousel(options);
  } else if (options.publishPending) {
    await publishPendingCarousel();
  } else if (options.carousel) {
    await runCarouselPublish(options);
  } else {
    await runPublish(options);
  }
}

main().catch(err => {
  console.error('❌ Fatal error:', err.message);
  process.exit(1);
});
