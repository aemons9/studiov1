/**
 * Check Auto-Publish Status
 *
 * Quick check of Drive content and publishing candidates.
 */

import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';

// Configuration
const CREDS_PATH = '/home/ecolex/version1/studiov-drive-ingest-870127e5767e.json';
const ASSET_FOLDER_NAME = 'asset1.1';
const IMAGE_PREFIX = 'ai-image-studio';
const HISTORY_FILE = path.join(process.cwd(), 'data', 'posting-history.json');

// Parse filename for batch info
function parseFilename(filename) {
  const match = filename.match(/ai-image-studio-(\d+)-(\d+)\.(png|jpg|jpeg|webp)$/i);
  if (!match) return null;
  return {
    timestamp: parseInt(match[1], 10),
    index: parseInt(match[2], 10),
  };
}

// Load posting history
function loadHistory() {
  if (!fs.existsSync(HISTORY_FILE)) {
    return { posts: [] };
  }
  try {
    return JSON.parse(fs.readFileSync(HISTORY_FILE, 'utf8'));
  } catch {
    return { posts: [] };
  }
}

async function main() {
  console.log('\n' + '═'.repeat(60));
  console.log('📊 AUTO-PUBLISH STATUS CHECK');
  console.log('═'.repeat(60) + '\n');

  // Load credentials
  const creds = JSON.parse(fs.readFileSync(CREDS_PATH, 'utf8'));
  console.log('🔐 Service Account:', creds.client_email);

  // Initialize Drive
  const auth = new google.auth.JWT({
    email: creds.client_email,
    key: creds.private_key,
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  });

  const drive = google.drive({ version: 'v3', auth });

  // Find folder
  console.log('\n📂 Google Drive Status:');

  const folderResponse = await drive.files.list({
    q: `name = '${ASSET_FOLDER_NAME}' and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
    fields: 'files(id, name)',
    spaces: 'drive',
  });

  const folders = folderResponse.data.files || [];

  if (folders.length === 0) {
    console.log('   ❌ Folder not found!');
    return;
  }

  const folderId = folders[0].id;
  console.log(`   Folder: ${ASSET_FOLDER_NAME} (${folderId})`);

  // List all images
  const imagesResponse = await drive.files.list({
    q: `'${folderId}' in parents and mimeType contains 'image/' and trashed = false`,
    fields: 'files(id, name, createdTime)',
    pageSize: 100,
    orderBy: 'createdTime desc',
  });

  const allImages = imagesResponse.data.files || [];
  const studioImages = allImages.filter(f => f.name?.startsWith(IMAGE_PREFIX));

  console.log(`   Total images: ${allImages.length}`);
  console.log(`   Studio images: ${studioImages.length}`);

  // Group by batch
  const batches = new Map();
  for (const img of studioImages) {
    const parsed = parseFilename(img.name);
    if (parsed) {
      if (!batches.has(parsed.timestamp)) {
        batches.set(parsed.timestamp, []);
      }
      batches.get(parsed.timestamp).push(img);
    }
  }

  console.log(`   Unique batches: ${batches.size}`);

  // Load history
  console.log('\n📝 Posting History:');
  const history = loadHistory();
  const successfulPosts = history.posts?.filter(p => p.success) || [];
  const postedFileIds = new Set();

  successfulPosts.forEach(post => {
    post.driveFileIds?.forEach(id => postedFileIds.add(id));
  });

  console.log(`   Total posts: ${history.posts?.length || 0}`);
  console.log(`   Successful: ${successfulPosts.length}`);
  console.log(`   Files posted: ${postedFileIds.size}`);

  // Count unposted
  const unpostedImages = studioImages.filter(img => !postedFileIds.has(img.id));
  console.log(`   Unposted images: ${unpostedImages.length}`);

  // Analyze candidates
  console.log('\n🎨 Content Candidates:');

  let feedCandidates = 0;
  let carouselCandidates = 0;
  let reelCandidates = 0;

  for (const [timestamp, images] of batches) {
    const unposted = images.filter(img => !postedFileIds.has(img.id));
    if (unposted.length === 0) continue;

    if (unposted.length === 1) {
      feedCandidates++;
    } else if (unposted.length >= 2 && unposted.length <= 10) {
      carouselCandidates++;
    } else if (unposted.length > 10) {
      reelCandidates++;
    }

    if (unposted.length >= 5) {
      // Could also be a reel
      reelCandidates++;
    }
  }

  console.log(`   Feed posts: ${feedCandidates}`);
  console.log(`   Carousels: ${carouselCandidates}`);
  console.log(`   Reels: ${reelCandidates}`);

  // Sample recent batches
  console.log('\n📷 Recent Batches (newest first):');
  const sortedBatches = [...batches.entries()]
    .sort((a, b) => b[0] - a[0])
    .slice(0, 5);

  for (const [timestamp, images] of sortedBatches) {
    const date = new Date(timestamp).toLocaleString();
    const unposted = images.filter(img => !postedFileIds.has(img.id)).length;
    const status = unposted === 0 ? '✅ Posted' : `📌 ${unposted} unposted`;
    console.log(`   ${date} - ${images.length} images - ${status}`);
  }

  console.log('\n' + '═'.repeat(60));
  console.log('✅ Status check complete!');
  console.log('\nRun commands:');
  console.log('  npm run auto:status     - Full status check');
  console.log('  npm run auto:publish:dry - Dry run (preview)');
  console.log('  npm run auto:publish     - Publish content');
  console.log('  npm run auto:quick       - Quick single publish');
  console.log('═'.repeat(60) + '\n');
}

main().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
