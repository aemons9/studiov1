#!/usr/bin/env node
/**
 * Prepare Carousels from tempimages
 *
 * Analyzes images, categorizes by style, resizes for Instagram,
 * and creates carousel combinations for review.
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const CONFIG = {
  SOURCE_DIR: path.join(process.cwd(), 'tempimages'),
  OUTPUT_DIR: path.join(process.cwd(), 'preview-output', 'carousels'),
  MIN_RATIO: 0.8,  // 4:5 portrait
  MAX_RATIO: 1.91, // 1.91:1 landscape
};

// Style categories based on visual analysis
const CATEGORIES = {
  vintage_romantic: {
    folders: ['pimages'],
    caption: 'Timeless elegance in every frame ✨',
    hashtags: '#vintage #romantic #boudoir #elegance #timeless #classic #beauty #aesthetic #candlelight #intimate #fashion #model #photography #editorial #luxurylifestyle',
  },
  shadow_artistic: {
    folders: ['23images'],
    caption: 'Playing with light and shadow.',
    hashtags: '#shadowplay #artistic #moody #lightandshadow #photography #creative #visualart #dramatic #aesthetic #fineart #editorial #mood #atmosphere #contrast #artphotography',
  },
  corporate_chic: {
    folders: ['kimages', 'fimages'],
    caption: 'Power moves only.',
    hashtags: '#bosslady #corporate #powersuit #office #professional #executive #fashion #style #girlboss #luxury #citylife #nightlife #elegant #sophisticated #businesswoman',
  },
  luxury_spa: {
    folders: ['limages'],
    caption: 'Self-care is the best care.',
    hashtags: '#spa #wellness #selfcare #relaxation #luxury #jacuzzi #candlelit #pamper #beauty #lifestyle #peaceful #serene #retreat #indulgence #bliss',
  },
  abstract_artistic: {
    folders: ['44images'],
    caption: 'Art in every form.',
    hashtags: '#abstract #artistic #bodyart #fineart #creative #visualart #contemporary #aesthetic #goldenhour #sculptural #form #beauty #artphotography #editorial #avantgarde',
  },
  behind_scenes: {
    folders: ['seimages'],
    caption: 'Behind the magic ✨',
    hashtags: '#bts #behindthescenes #filmset #studio #onset #production #cinematography #filmmaking #photoshoot #setlife #cameras #lighting #creative #model #photography',
  },
  hotel_intimate: {
    folders: ['sd3images'],
    caption: 'Late night thoughts.',
    hashtags: '#hotel #intimate #evening #mood #luxury #lifestyle #travel #wanderlust #nightlife #aesthetic #warm #cozy #romantic #suite #cityview',
  },
  neon_art: {
    folders: ['2222images'],
    caption: 'Glow different.',
    hashtags: '#neon #glow #lightart #artistic #moody #dark #creative #visualart #aesthetic #nightlife #futuristic #cyberpunk #atmosphere #dramatic #editorial',
  },
  dance_movement: {
    folders: ['imo98ages'],
    caption: 'Poetry in motion.',
    hashtags: '#dance #movement #ballet #contemporary #grace #elegant #minimalist #studio #dancer #artistic #flow #body #expression #performance #art',
  },
  golden_fashion: {
    folders: ['im4567ages'],
    caption: 'Golden hour magic.',
    hashtags: '#goldenhour #fashion #satin #editorial #model #photography #style #elegant #luxury #sunlight #shadow #architectural #minimalist #chic #highfashion',
  },
  mixed_moody: {
    folders: ['fr7images', 'im98jages', 'imager4es', 'imi89ages', 'imagek9s', 'ju89kimages'],
    caption: 'Mood: Unapologetic ✨',
    hashtags: '#mood #aesthetic #vibes #fashion #model #photography #editorial #style #beauty #artistic #creative #visualart #atmosphere #elegant #stunning',
  },
};

// Creative captions pool
const CREATIVE_CAPTIONS = [
  'Where art meets emotion.',
  'Every frame tells a story →',
  'Captured moments of beauty.',
  'Visual poetry.',
  'The art of being extraordinary.',
  'Elegance personified.',
  'A study in light and form.',
  'Mood: Elevated ✨',
  'Living art.',
  'Frame by frame.',
];

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

/**
 * Smart resize for Instagram - preserves heads/faces
 * Uses gravity north for portraits to keep heads visible
 */
function smartResizeForInstagram(inputPath, outputPath) {
  try {
    // Get dimensions
    const identifyCmd = `identify -format "%w %h" "${inputPath}"`;
    const dimensions = execSync(identifyCmd, { encoding: 'utf8' }).trim();
    const [width, height] = dimensions.split(' ').map(Number);
    const ratio = width / height;

    let convertCmd;

    if (ratio < CONFIG.MIN_RATIO) {
      // Too tall - crop from bottom to preserve head (gravity north)
      const newHeight = Math.round(width / CONFIG.MIN_RATIO);
      convertCmd = `convert "${inputPath}" -gravity North -crop ${width}x${newHeight}+0+0 +repage -quality 95 "${outputPath}"`;
    } else if (ratio > CONFIG.MAX_RATIO) {
      // Too wide - crop from center
      const newWidth = Math.round(height * CONFIG.MAX_RATIO);
      convertCmd = `convert "${inputPath}" -gravity Center -crop ${newWidth}x${height}+0+0 +repage -quality 95 "${outputPath}"`;
    } else {
      // Ratio OK - just copy/convert
      convertCmd = `convert "${inputPath}" -quality 95 "${outputPath}"`;
    }

    execSync(convertCmd);
    return { success: true, originalRatio: ratio };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Get all images from a folder
 */
function getImagesFromFolder(folderPath) {
  if (!fs.existsSync(folderPath)) return [];

  const files = fs.readdirSync(folderPath);
  return files
    .filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f))
    .map(f => ({
      name: f,
      path: path.join(folderPath, f),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Create a carousel from images
 */
function createCarousel(carouselId, images, category, categoryKey) {
  const carouselDir = path.join(CONFIG.OUTPUT_DIR, carouselId);
  ensureDir(carouselDir);

  console.log(`\n📚 Creating carousel: ${carouselId}`);
  console.log(`   Category: ${categoryKey}`);
  console.log(`   Images: ${images.length}`);

  const processedImages = [];

  for (let i = 0; i < images.length; i++) {
    const img = images[i];
    const outputName = `${i + 1}-${path.basename(img.path, path.extname(img.path))}.jpg`;
    const outputPath = path.join(carouselDir, outputName);

    console.log(`   Processing: ${img.name}`);
    const result = smartResizeForInstagram(img.path, outputPath);

    if (result.success) {
      processedImages.push({
        index: i + 1,
        originalName: img.name,
        originalPath: img.path,
        processedPath: outputPath,
        originalRatio: result.originalRatio,
      });
      console.log(`      ✅ Saved (ratio: ${result.originalRatio?.toFixed(2) || 'N/A'})`);
    } else {
      console.log(`      ❌ Failed: ${result.error}`);
    }
  }

  // Select caption
  const caption = category.caption || CREATIVE_CAPTIONS[Math.floor(Math.random() * CREATIVE_CAPTIONS.length)];

  // Create metadata
  const metadata = {
    carouselId,
    category: categoryKey,
    createdAt: new Date().toISOString(),
    imageCount: processedImages.length,
    caption,
    hashtags: category.hashtags,
    fullCaption: `${caption}\n\n${category.hashtags}`,
    images: processedImages,
    status: 'pending_review',
  };

  // Save metadata
  fs.writeFileSync(
    path.join(carouselDir, 'metadata.json'),
    JSON.stringify(metadata, null, 2)
  );

  // Create preview text
  fs.writeFileSync(
    path.join(carouselDir, 'preview.txt'),
    `═══════════════════════════════════════════
CAROUSEL: ${carouselId}
═══════════════════════════════════════════
Category: ${categoryKey}
Images: ${processedImages.length}

CAPTION:
${caption}

HASHTAGS:
${category.hashtags}

FILES:
${processedImages.map(img => `${img.index}. ${img.originalName}`).join('\n')}

STATUS: Pending Review
═══════════════════════════════════════════
`
  );

  return metadata;
}

async function main() {
  console.log('\n' + '═'.repeat(60));
  console.log('🎨 PREPARING CAROUSELS FROM TEMPIMAGES');
  console.log('═'.repeat(60));

  // Ensure output directory
  ensureDir(CONFIG.OUTPUT_DIR);

  // Clear existing carousels
  const existingCarousels = fs.readdirSync(CONFIG.OUTPUT_DIR);
  for (const dir of existingCarousels) {
    const dirPath = path.join(CONFIG.OUTPUT_DIR, dir);
    if (fs.statSync(dirPath).isDirectory()) {
      fs.rmSync(dirPath, { recursive: true });
    }
  }

  const allCarousels = [];
  let carouselCount = 0;

  // Process each category
  console.log('\n📂 Processing categories...\n');

  for (const [categoryKey, category] of Object.entries(CATEGORIES)) {
    console.log(`\n${'─'.repeat(50)}`);
    console.log(`📁 Category: ${categoryKey}`);
    console.log(`   Folders: ${category.folders.join(', ')}`);

    // Collect all images from category folders
    const categoryImages = [];
    for (const folder of category.folders) {
      const folderPath = path.join(CONFIG.SOURCE_DIR, folder);
      const images = getImagesFromFolder(folderPath);
      categoryImages.push(...images.map(img => ({ ...img, sourceFolder: folder })));
    }

    console.log(`   Total images: ${categoryImages.length}`);

    if (categoryImages.length === 0) continue;

    // Create carousels based on image count
    if (categoryImages.length <= 4) {
      // Single carousel with all images
      carouselCount++;
      const carouselId = `carousel-${String(carouselCount).padStart(2, '0')}-${categoryKey}`;
      const carousel = createCarousel(carouselId, categoryImages, category, categoryKey);
      allCarousels.push(carousel);
    } else {
      // Multiple carousels of 4 images each
      for (let i = 0; i < categoryImages.length; i += 4) {
        const chunk = categoryImages.slice(i, i + 4);
        if (chunk.length >= 2) { // Need at least 2 for carousel
          carouselCount++;
          const carouselId = `carousel-${String(carouselCount).padStart(2, '0')}-${categoryKey}`;
          const carousel = createCarousel(carouselId, chunk, category, categoryKey);
          allCarousels.push(carousel);
        }
      }
    }
  }

  // Create summary file
  const summary = {
    createdAt: new Date().toISOString(),
    totalCarousels: allCarousels.length,
    totalImages: allCarousels.reduce((sum, c) => sum + c.imageCount, 0),
    carousels: allCarousels.map(c => ({
      id: c.carouselId,
      category: c.category,
      images: c.imageCount,
      caption: c.caption,
    })),
  };

  fs.writeFileSync(
    path.join(CONFIG.OUTPUT_DIR, 'summary.json'),
    JSON.stringify(summary, null, 2)
  );

  // Print summary
  console.log('\n' + '═'.repeat(60));
  console.log('✅ CAROUSELS PREPARED FOR REVIEW');
  console.log('═'.repeat(60));
  console.log(`\n📊 Summary:`);
  console.log(`   Total Carousels: ${allCarousels.length}`);
  console.log(`   Total Images: ${summary.totalImages}`);
  console.log(`\n📁 Output: ${CONFIG.OUTPUT_DIR}`);
  console.log('\n📚 Carousels:');

  for (const carousel of allCarousels) {
    console.log(`   ${carousel.carouselId} (${carousel.imageCount} images)`);
    console.log(`      Caption: "${carousel.caption}"`);
  }

  console.log('\n' + '─'.repeat(60));
  console.log('📋 NEXT STEPS:');
  console.log('   1. Review carousels in: preview-output/carousels/');
  console.log('   2. Each folder contains images + metadata.json');
  console.log('   3. Tell me which carousels to publish');
  console.log('═'.repeat(60) + '\n');
}

main().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
