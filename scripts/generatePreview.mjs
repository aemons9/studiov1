/**
 * Generate Preview Content
 *
 * Downloads images from Google Drive and prepares preview content
 * with captions and metadata for review before publishing.
 */

import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import https from 'https';

// Configuration
const CREDS_PATH = '/home/ecolex/version1/studiov-drive-ingest-870127e5767e.json';
const ASSET_FOLDER_NAME = 'asset1.1';
const IMAGE_PREFIX = 'ai-image-studio';
const PREVIEW_DIR = path.join(process.cwd(), 'preview-output');
const HISTORY_FILE = path.join(process.cwd(), 'data', 'posting-history.json');

// Caption styles
const CAPTION_STYLES = {
  editorial: [
    'A study in light and form.',
    'Where elegance meets artistry.',
    'Capturing the essence of beauty.',
    'An exploration of grace.',
    'Timeless in its simplicity.',
  ],
  minimalist: [
    '—',
    '.',
    '✧',
    '◦',
    '∘',
  ],
  luxury: [
    'Crafted with intention. Captured with care.',
    'The art of being extraordinary.',
    'Where every detail matters.',
    'Excellence in every frame.',
    'Refined beauty, uncompromised.',
  ],
  cinematic: [
    'Frame by frame, story by story.',
    'A moment suspended in time.',
    'The poetry of visual storytelling.',
    'Where light becomes narrative.',
    'Cinema in stillness.',
  ],
};

const HASHTAGS = {
  base: ['studiov', 'aiart', 'aiimages', 'digitalart', 'creativeai'],
  feed: ['photography', 'portrait', 'beauty', 'aesthetic', 'visualart'],
  carousel: ['photoshoot', 'bts', 'collection', 'portfolio', 'visualstory'],
  reel: ['reels', 'video', 'motion', 'cinematic', 'visualjourney'],
};

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

// Get posted file IDs
function getPostedFileIds() {
  const history = loadHistory();
  const postedIds = new Set();
  (history.posts || []).forEach(post => {
    if (post.success) {
      (post.driveFileIds || []).forEach(id => postedIds.add(id));
    }
  });
  return postedIds;
}

// Download file from Drive
async function downloadFile(drive, fileId, destPath) {
  return new Promise((resolve, reject) => {
    drive.files.get(
      { fileId, alt: 'media' },
      { responseType: 'stream' },
      (err, response) => {
        if (err) {
          reject(err);
          return;
        }
        const dest = fs.createWriteStream(destPath);
        response.data
          .pipe(dest)
          .on('finish', () => resolve(destPath))
          .on('error', reject);
      }
    );
  });
}

// Generate caption
function generateCaption(style, imageCount) {
  const captions = CAPTION_STYLES[style] || CAPTION_STYLES.editorial;
  return captions[Math.floor(Math.random() * captions.length)];
}

// Generate hashtags
function generateHashtags(postType, count = 15) {
  const tags = [...HASHTAGS.base, ...HASHTAGS[postType] || HASHTAGS.feed];
  const shuffled = tags.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).map(t => `#${t}`).join(' ');
}

// Calculate content score
function calculateScore(batch, postedIds) {
  let score = 50;

  // Prefer unposted content
  const unpostedCount = batch.images.filter(img => !postedIds.has(img.id)).length;
  score += unpostedCount * 10;

  // Prefer newer content
  const hoursSinceCreation = (Date.now() - batch.timestamp) / (1000 * 60 * 60);
  if (hoursSinceCreation < 24) score += 20;
  else if (hoursSinceCreation < 72) score += 10;

  // Prefer batches with more images (better for carousels/reels)
  if (batch.images.length >= 5) score += 15;
  else if (batch.images.length >= 3) score += 10;

  return score;
}

// Determine post type
function getPostType(imageCount) {
  if (imageCount === 1) return 'feed';
  if (imageCount >= 2 && imageCount <= 10) return 'carousel';
  if (imageCount > 10) return 'reel';
  return 'feed';
}

async function main() {
  const maxPreviews = parseInt(process.argv[2], 10) || 5;

  console.log('\n' + '═'.repeat(60));
  console.log('🎨 GENERATING PREVIEW CONTENT');
  console.log('═'.repeat(60) + '\n');

  // Ensure preview directories exist
  ['feed', 'carousel', 'reel'].forEach(type => {
    const dir = path.join(PREVIEW_DIR, type);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });

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
  console.log('\n📂 Finding asset folder...');
  const folderResponse = await drive.files.list({
    q: `name = '${ASSET_FOLDER_NAME}' and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
    fields: 'files(id, name)',
    spaces: 'drive',
  });

  const folders = folderResponse.data.files || [];
  if (folders.length === 0) {
    console.log('❌ Folder not found!');
    return;
  }

  const folderId = folders[0].id;
  console.log(`   Found: ${ASSET_FOLDER_NAME} (${folderId})`);

  // List images
  console.log('\n📸 Fetching images...');
  const imagesResponse = await drive.files.list({
    q: `'${folderId}' in parents and mimeType contains 'image/' and trashed = false`,
    fields: 'files(id, name, createdTime, mimeType)',
    pageSize: 200,
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
        batches.set(parsed.timestamp, {
          timestamp: parsed.timestamp,
          images: [],
        });
      }
      batches.get(parsed.timestamp).images.push(img);
    }
  }

  // Get posted file IDs
  const postedIds = getPostedFileIds();
  console.log(`   Already posted: ${postedIds.size} files`);

  // Score and sort batches
  const scoredBatches = [...batches.values()]
    .map(batch => ({
      ...batch,
      score: calculateScore(batch, postedIds),
      unpostedImages: batch.images.filter(img => !postedIds.has(img.id)),
    }))
    .filter(batch => batch.unpostedImages.length > 0)
    .sort((a, b) => b.score - a.score);

  console.log(`   Unposted batches: ${scoredBatches.length}`);

  if (scoredBatches.length === 0) {
    console.log('\n⚠️ No unposted content available!');
    return;
  }

  // Generate previews
  console.log(`\n📥 Downloading top ${maxPreviews} content candidates...\n`);

  const previews = [];
  const captionStyles = Object.keys(CAPTION_STYLES);

  for (let i = 0; i < Math.min(maxPreviews, scoredBatches.length); i++) {
    const batch = scoredBatches[i];
    const postType = getPostType(batch.unpostedImages.length);
    const captionStyle = captionStyles[Math.floor(Math.random() * captionStyles.length)];
    const caption = generateCaption(captionStyle, batch.unpostedImages.length);
    const hashtags = generateHashtags(postType);

    const previewId = `preview-${i + 1}-${batch.timestamp}`;
    const previewDir = path.join(PREVIEW_DIR, postType, previewId);
    fs.mkdirSync(previewDir, { recursive: true });

    console.log(`\n📁 Preview ${i + 1}: ${postType.toUpperCase()}`);
    console.log(`   Batch: ${new Date(batch.timestamp).toLocaleString()}`);
    console.log(`   Images: ${batch.unpostedImages.length}`);
    console.log(`   Score: ${batch.score}`);

    // Download images
    const downloadedImages = [];
    for (let j = 0; j < batch.unpostedImages.length; j++) {
      const img = batch.unpostedImages[j];
      const ext = img.mimeType?.split('/')[1] || 'png';
      const destPath = path.join(previewDir, `image-${j + 1}.${ext}`);

      try {
        console.log(`   ⬇️  Downloading ${img.name}...`);
        await downloadFile(drive, img.id, destPath);
        downloadedImages.push({
          filename: `image-${j + 1}.${ext}`,
          originalName: img.name,
          driveId: img.id,
        });
      } catch (err) {
        console.log(`   ❌ Failed: ${err.message}`);
      }
    }

    // Create metadata file
    const metadata = {
      previewId,
      postType,
      batchTimestamp: batch.timestamp,
      batchDate: new Date(batch.timestamp).toISOString(),
      score: batch.score,
      captionStyle,
      caption,
      hashtags,
      fullCaption: `${caption}\n\n${hashtags}`,
      images: downloadedImages,
      driveFileIds: downloadedImages.map(img => img.driveId),
      generatedAt: new Date().toISOString(),
    };

    fs.writeFileSync(
      path.join(previewDir, 'metadata.json'),
      JSON.stringify(metadata, null, 2)
    );

    // Create a simple preview text file
    fs.writeFileSync(
      path.join(previewDir, 'preview.txt'),
      `═══════════════════════════════════════════
INSTAGRAM POST PREVIEW
═══════════════════════════════════════════

Type: ${postType.toUpperCase()}
Images: ${downloadedImages.length}
Style: ${captionStyle}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CAPTION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${caption}

${hashtags}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FILES:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${downloadedImages.map((img, idx) => `${idx + 1}. ${img.filename} (${img.originalName})`).join('\n')}

═══════════════════════════════════════════
Generated: ${new Date().toLocaleString()}
═══════════════════════════════════════════
`
    );

    previews.push(metadata);
    console.log(`   ✅ Preview saved to ${previewDir}`);
  }

  // Create summary file
  const summary = {
    generatedAt: new Date().toISOString(),
    totalPreviews: previews.length,
    byType: {
      feed: previews.filter(p => p.postType === 'feed').length,
      carousel: previews.filter(p => p.postType === 'carousel').length,
      reel: previews.filter(p => p.postType === 'reel').length,
    },
    previews: previews.map(p => ({
      id: p.previewId,
      type: p.postType,
      images: p.images.length,
      caption: p.caption,
      path: `${p.postType}/${p.previewId}`,
    })),
  };

  fs.writeFileSync(
    path.join(PREVIEW_DIR, 'summary.json'),
    JSON.stringify(summary, null, 2)
  );

  // Print summary
  console.log('\n' + '═'.repeat(60));
  console.log('✅ PREVIEW GENERATION COMPLETE');
  console.log('═'.repeat(60));
  console.log(`\n📊 Summary:`);
  console.log(`   Total Previews: ${previews.length}`);
  console.log(`   Feed Posts: ${summary.byType.feed}`);
  console.log(`   Carousels: ${summary.byType.carousel}`);
  console.log(`   Reels: ${summary.byType.reel}`);
  console.log(`\n📁 Output: ${PREVIEW_DIR}`);
  console.log('\n📝 Preview Locations:');
  for (const p of previews) {
    console.log(`   ${p.postType}/${p.previewId}/`);
  }
  console.log('\n' + '═'.repeat(60) + '\n');
}

main().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
