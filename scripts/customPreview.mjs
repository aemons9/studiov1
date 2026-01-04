#!/usr/bin/env node
/**
 * Custom Preview - Select specific images by filename
 */

import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const CONFIG = {
  CREDS_PATH: '/home/ecolex/version1/studiov-drive-ingest-870127e5767e.json',
  PREVIEW_DIR: path.join(process.cwd(), 'preview-output', 'pending'),
  PENDING_FILE: path.join(process.cwd(), 'data', 'pending-publish.json'),
  CACHE_DIR: path.join(process.cwd(), 'temp', 'drive-cache'),
};

// Specific images requested
const REQUESTED_FILES = [
  'ai-image-studio-1763836681210-1',
  'ai-image-studio-1763836479489-2',
  'ai-image-studio-1763836476625-1',
  'ai-image-studio-1763836330283-1',
  'ai-image-studio-1763836182175-1',
];

// Creative captions for fashion/artistic content
const CAPTIONS = [
  'Elegance in every frame ✨',
  'Art meets fashion.',
  'A visual story in four acts.',
  'Where light becomes art.',
  'Captured moments of beauty.',
  'The art of being extraordinary.',
  'Visual poetry.',
  'Every frame tells a story →',
];

const HASHTAGS = [
  '#fashion', '#editorial', '#photography', '#model', '#beauty',
  '#aesthetic', '#art', '#photooftheday', '#instagood', '#style',
  '#fashionphotography', '#portrait', '#creative', '#visualart', '#mood',
  '#artistic', '#elegance', '#luxury', '#stunning', '#gorgeous',
  '#aiart', '#digitalart', '#studiov', '#explore', '#viral',
];

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function resizeForInstagram(inputPath) {
  const outputPath = inputPath.replace(/\.(png|jpg|jpeg|webp)$/i, '-ig.jpg');

  try {
    const identifyCmd = `identify -format "%w %h" "${inputPath}"`;
    const dimensions = execSync(identifyCmd, { encoding: 'utf8' }).trim();
    const [width, height] = dimensions.split(' ').map(Number);
    const ratio = width / height;

    console.log(`   📐 Original: ${width}x${height} (ratio: ${ratio.toFixed(2)})`);

    const minRatio = 0.8;
    const maxRatio = 1.91;

    let convertCmd;

    if (ratio < minRatio) {
      const newHeight = Math.round(width / minRatio);
      console.log(`   ✂️ Cropping to 4:5 portrait (${width}x${newHeight})`);
      convertCmd = `convert "${inputPath}" -gravity center -crop ${width}x${newHeight}+0+0 +repage -quality 95 "${outputPath}"`;
    } else if (ratio > maxRatio) {
      const newWidth = Math.round(height * maxRatio);
      console.log(`   ✂️ Cropping to 1.91:1 landscape (${newWidth}x${height})`);
      convertCmd = `convert "${inputPath}" -gravity center -crop ${newWidth}x${height}+0+0 +repage -quality 95 "${outputPath}"`;
    } else {
      console.log(`   ✅ Ratio OK, converting to JPG`);
      convertCmd = `convert "${inputPath}" -quality 95 "${outputPath}"`;
    }

    execSync(convertCmd);
    return outputPath;
  } catch (error) {
    console.error(`   ⚠️ Resize failed: ${error.message}`);
    return inputPath;
  }
}

async function main() {
  console.log('\n' + '═'.repeat(60));
  console.log('🎯 CUSTOM CAROUSEL PREVIEW');
  console.log('═'.repeat(60) + '\n');

  // Load credentials
  const creds = JSON.parse(fs.readFileSync(CONFIG.CREDS_PATH, 'utf8'));
  const auth = new google.auth.JWT({
    email: creds.client_email,
    key: creds.private_key,
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  });
  const drive = google.drive({ version: 'v3', auth });

  // Find asset1.1 folder
  console.log('📂 Finding asset1.1 folder...');
  const folderResponse = await drive.files.list({
    q: "name = 'asset1.1' and mimeType = 'application/vnd.google-apps.folder' and trashed = false",
    fields: 'files(id, name)',
    spaces: 'drive',
  });

  const folders = folderResponse.data.files || [];
  if (folders.length === 0) {
    console.log('❌ asset1.1 folder not found!');
    return;
  }

  const folderId = folders[0].id;
  console.log(`   ✅ Found: ${folderId}`);

  // Search for specific files
  console.log('\n🔍 Searching for requested images...');
  const foundImages = [];

  for (const filename of REQUESTED_FILES) {
    const searchResponse = await drive.files.list({
      q: `'${folderId}' in parents and name contains '${filename}' and trashed = false`,
      fields: 'files(id, name, mimeType)',
      spaces: 'drive',
    });

    const files = searchResponse.data.files || [];
    if (files.length > 0) {
      foundImages.push(files[0]);
      console.log(`   ✅ Found: ${files[0].name}`);
    } else {
      console.log(`   ❌ Not found: ${filename}`);
    }
  }

  if (foundImages.length < 2) {
    console.log('\n❌ Need at least 2 images for carousel!');
    return;
  }

  // Clear and prepare preview directory
  ensureDir(CONFIG.PREVIEW_DIR);
  const previewFiles = fs.readdirSync(CONFIG.PREVIEW_DIR);
  for (const file of previewFiles) {
    fs.unlinkSync(path.join(CONFIG.PREVIEW_DIR, file));
  }

  // Download and resize images
  console.log('\n📥 Downloading and processing images...');
  ensureDir(CONFIG.CACHE_DIR);

  const previewImages = [];

  for (let i = 0; i < foundImages.length; i++) {
    const image = foundImages[i];
    console.log(`\n   📷 Image ${i + 1}/${foundImages.length}: ${image.name}`);

    try {
      // Download
      const localPath = path.join(CONFIG.CACHE_DIR, `${image.id}-${image.name}`);

      if (!fs.existsSync(localPath)) {
        const response = await drive.files.get(
          { fileId: image.id, alt: 'media' },
          { responseType: 'stream' }
        );

        await new Promise((resolve, reject) => {
          const dest = fs.createWriteStream(localPath);
          response.data
            .pipe(dest)
            .on('finish', resolve)
            .on('error', reject);
        });
      }

      // Resize
      const resizedPath = resizeForInstagram(localPath);

      // Copy to preview
      const ext = path.extname(resizedPath) || '.jpg';
      const previewPath = path.join(CONFIG.PREVIEW_DIR, `${i + 1}-preview${ext}`);
      fs.copyFileSync(resizedPath, previewPath);

      previewImages.push({
        index: i + 1,
        previewPath,
        originalName: image.name,
        driveId: image.id,
        sourceFolder: 'asset1.1',
        batchTimestamp: Date.now(),
      });

      console.log(`      ✅ Saved: ${previewPath}`);
    } catch (error) {
      console.log(`      ❌ Error: ${error.message}`);
    }
  }

  // Generate creative caption
  const caption = CAPTIONS[Math.floor(Math.random() * CAPTIONS.length)];
  const shuffledHashtags = HASHTAGS.sort(() => Math.random() - 0.5).slice(0, 25);
  const hashtags = shuffledHashtags.join(' ');
  const fullCaption = `${caption}\n\n${hashtags}`;

  // Save pending data
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

  // Summary
  console.log('\n' + '═'.repeat(60));
  console.log('✅ CUSTOM PREVIEW READY');
  console.log('═'.repeat(60));
  console.log(`\n📁 Preview Location: ${CONFIG.PREVIEW_DIR}`);
  console.log(`\n📷 Images (${previewImages.length}):`);
  previewImages.forEach(img => {
    console.log(`   ${img.index}. ${img.originalName}`);
  });
  console.log(`\n✍️ Caption: "${caption}"`);
  console.log(`\n🏷️ Hashtags: ${shuffledHashtags.length} tags`);
  console.log('\n' + '─'.repeat(60));
  console.log('📋 NEXT STEPS:');
  console.log('   1. Review images below');
  console.log('   2. If OK: npm run auto:carousel:publish');
  console.log('═'.repeat(60) + '\n');
}

main().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
