#!/usr/bin/env node
/**
 * VERALABS Complete Collection Branding & Publishing
 * Brands all generated collections and publishes to Instagram as carousels
 * Consistent with Instagram grid mood, feel, and aesthetic
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const PROXY_URL = 'http://localhost:3001';
const INSTAGRAM_TOKEN = process.env.INSTAGRAM_TOKEN;
const INSTAGRAM_ACCOUNT_ID = '17841478517688462';
const GITHUB_TOKEN = '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';

const OUTPUT_DIR = '/home/ecolex/version1/instagram-all-branded';
const FFMPEG = '/home/ecolex/version1/node_modules/@ffmpeg-installer/linux-x64/ffmpeg';

// All Collections to Brand & Publish
const ALL_COLLECTIONS = [
  // VERA MASTERCLASS COLLECTION
  {
    id: 'vera_masterclass',
    name: 'VERA MASTERCLASS',
    collection: 'ARTISTIC VISION',
    invocation: 'where light meets form',
    sourceDir: '/home/ecolex/version1/generated-vera-masterclass',
    caption: `VERA MASTERCLASS | Artistic Vision

Where light meets form, magic emerges. This is the language of fine art photography - spoken in shadow and revealed in silk.

Every frame a masterpiece. Every curve a story.

Follow @veralabs.ai for daily artistic inspiration.

#VERALABS #VeraMasterclass #FineArtPhotography #ArtisticVision #MuseumQuality #BoudoirArt #LightAndShadow #CurvaceousFigure #HourglassMuse #IntimateArt #MasterclassCollection`
  },

  // EXECUTIVE MUSE COLLECTION
  {
    id: 'executive_muse',
    name: 'EXECUTIVE MUSE',
    collection: 'STRATEGY VARIANTS',
    invocation: 'power meets elegance',
    sourceDir: '/home/ecolex/version1/generated-executive-muse',
    caption: `EXECUTIVE MUSE | Strategy Variants

Power meets elegance. Confidence meets curves. This is the art of presence - commanding, captivating, unforgettable.

Four strategies. One vision. Absolute mastery.

Which variant speaks to your soul?

#VERALABS #ExecutiveMuse #PowerfulWomen #ConfidentBeauty #FineArtBoudoir #StrategyVariants #HourglassFigure #EditorialArt #CinematicBeauty #SculpturalForm`
  },

  // BOUNDARY INTIMACY COLLECTION
  {
    id: 'boundary_intimacy',
    name: 'BOUNDARY INTIMACY',
    collection: 'SEDUCTRESS ARCHETYPES',
    invocation: 'where art meets desire',
    sourceDir: '/home/ecolex/version1/generated-boundary-intimacy',
    caption: `BOUNDARY INTIMACY | Seductress Archetypes

Where art meets desire, boundaries dissolve. This is maximum expression through minimum restraint - the purest form of artistic intimacy.

Eight archetypes. Infinite beauty. One vision.

Tap to explore the full collection.

#VERALABS #BoundaryArt #SeductressArchetypes #IntimateArt #FineArtNude #MaximumExpression #ArtisticIntimacy #HourglassMuse #SculpturalBeauty #BoudoirMasterclass`
  },

  // PREMIUM MINIMAL COLLECTION
  {
    id: 'premium_minimal',
    name: 'PREMIUM MINIMAL',
    collection: 'MAXIMUM EXPRESSION',
    invocation: 'less reveals more',
    sourceDir: '/home/ecolex/version1/generated-premium-minimal',
    caption: `PREMIUM MINIMAL | Maximum Expression

Less reveals more. Shadow conceals to reveal. Silk whispers what words cannot.

This is the art of strategic minimalism - where every absence speaks volumes.

Swipe to experience the full series.

#VERALABS #PremiumMinimal #MaximumExpression #ShadowArt #SilkDraping #MinimalCoverage #FineArtBoudoir #StrategicDesign #HourglassFigure #ChiaroscuroMastery`
  }
];

function log(msg) {
  const time = new Date().toLocaleTimeString();
  console.log(`[${time}] ${msg}`);
}

function addBrandingOverlay(inputPath, outputPath, collection) {
  // Resize to Instagram portrait ratio (4:5 = 1080x1350) and add VERALABS branding
  const filterComplex = [
    // Scale to 1080x1350 (4:5 ratio for Instagram carousel)
    `scale=1080:1350:force_original_aspect_ratio=increase`,
    `crop=1080:1350`,
    // Semi-transparent black gradient at bottom (elegant fade)
    `drawbox=y=ih*0.72:w=iw:h=ih*0.28:color=black@0.55:t=fill`,
    // Collection subtitle (small, gold)
    `drawtext=text='${collection.collection}':fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf:fontsize=26:fontcolor=0xc9a962:x=(w-text_w)/2:y=h*0.77`,
    // Main title (large, white)
    `drawtext=text='${collection.name}':fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf:fontsize=44:fontcolor=white:x=(w-text_w)/2:y=h*0.83`,
    // Invocation tagline (italic, gold)
    `drawtext=text='${collection.invocation}':fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSerif-Italic.ttf:fontsize=28:fontcolor=0xc9a962:x=(w-text_w)/2:y=h*0.90`,
    // VERALABS watermark
    `drawtext=text='VERALABS':fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf:fontsize=20:fontcolor=0xc9a962@0.8:x=(w-text_w)/2:y=h*0.96`
  ].join(',');

  const cmd = `${FFMPEG} -y -i "${inputPath}" -vf "${filterComplex}" -q:v 2 "${outputPath}"`;

  try {
    execSync(cmd, { stdio: 'pipe' });
    return true;
  } catch (err) {
    log(`   ❌ Error: ${err.message.slice(0, 100)}`);
    return false;
  }
}

function findAllImages(directory) {
  const images = [];

  function scanDir(dir) {
    if (!fs.existsSync(dir)) return;

    const items = fs.readdirSync(dir);
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        scanDir(fullPath);
      } else if (item.endsWith('.png') || item.endsWith('.jpg')) {
        images.push(fullPath);
      }
    }
  }

  scanDir(directory);
  return images.sort();
}

async function uploadToGitHub(filePath, filename) {
  const fileBuffer = fs.readFileSync(filePath);
  const base64Data = fileBuffer.toString('base64');
  const timestamp = Date.now();

  const response = await fetch(`${PROXY_URL}/api/instagram/upload-to-github`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      githubToken: GITHUB_TOKEN,
      imageData: base64Data,
      filename: `veralabs_${timestamp}_${filename}`,
      owner: 'aemons9',
      repo: 'studiov1',
      pathPrefix: 'photo/all-collections',
    }),
  });

  const data = await response.json();
  return data.publicUrl || data.url;
}

async function publishCarousel(imageUrls, caption) {
  // Create carousel container
  const containerRes = await fetch(`${PROXY_URL}/api/instagram/create-carousel-container`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      accessToken: INSTAGRAM_TOKEN,
      children: imageUrls.map(url => ({ image_url: url })),
      caption,
      instagramAccountId: INSTAGRAM_ACCOUNT_ID,
    }),
  });

  const containerData = await containerRes.json();
  if (!containerData.id) {
    throw new Error(`Container creation failed: ${JSON.stringify(containerData)}`);
  }

  log(`   📦 Container created: ${containerData.id}`);

  // Wait for processing
  log(`   ⏳ Waiting for Instagram to process...`);
  await new Promise(r => setTimeout(r, 15000));

  // Publish
  const publishRes = await fetch(`${PROXY_URL}/api/instagram/publish-container`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      accessToken: INSTAGRAM_TOKEN,
      containerId: containerData.id,
      instagramAccountId: INSTAGRAM_ACCOUNT_ID,
    }),
  });

  const publishData = await publishRes.json();
  return publishData;
}

async function publishStory(imageUrl) {
  const response = await fetch(`${PROXY_URL}/api/instagram/publish-story`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      accessToken: INSTAGRAM_TOKEN,
      imageUrl,
      instagramAccountId: INSTAGRAM_ACCOUNT_ID,
    }),
  });
  return await response.json();
}

async function main() {
  console.log(`
╔══════════════════════════════════════════════════════════════════════════╗
║                                                                          ║
║   ██╗   ██╗███████╗██████╗  █████╗ ██╗      █████╗ ██████╗ ███████╗      ║
║   ██║   ██║██╔════╝██╔══██╗██╔══██╗██║     ██╔══██╗██╔══██╗██╔════╝      ║
║   ██║   ██║█████╗  ██████╔╝███████║██║     ███████║██████╔╝███████╗      ║
║   ╚██╗ ██╔╝██╔══╝  ██╔══██╗██╔══██║██║     ██╔══██║██╔══██╗╚════██║      ║
║    ╚████╔╝ ███████╗██║  ██║██║  ██║███████╗██║  ██║██████╔╝███████║      ║
║     ╚═══╝  ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═════╝ ╚══════╝      ║
║                                                                          ║
║    🎨 COMPLETE COLLECTION BRANDING & PUBLISHING 🎨                       ║
║                                                                          ║
║   Brand All Images • Upload to CDN • Publish Instagram Carousels         ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
  `);

  if (!INSTAGRAM_TOKEN) {
    console.error('❌ INSTAGRAM_TOKEN environment variable required');
    process.exit(1);
  }

  // Create output directory
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const publishedResults = [];

  for (const collection of ALL_COLLECTIONS) {
    console.log(`\n${'═'.repeat(70)}`);
    log(`🎨 PROCESSING: ${collection.name}`);
    console.log(`${'═'.repeat(70)}`);

    // Find all source images
    const sourceImages = findAllImages(collection.sourceDir);

    if (sourceImages.length === 0) {
      log(`   ⏭️ No images found in ${collection.sourceDir}`);
      continue;
    }

    log(`   📷 Found ${sourceImages.length} images`);

    // Create collection output folder
    const outputFolder = path.join(OUTPUT_DIR, collection.id);
    fs.mkdirSync(outputFolder, { recursive: true });

    // Brand all images
    const brandedImages = [];
    for (let i = 0; i < sourceImages.length; i++) {
      const inputPath = sourceImages[i];
      const outputPath = path.join(outputFolder, `slide_${String(i + 1).padStart(2, '0')}.jpg`);

      log(`   🖼️ [${i + 1}/${sourceImages.length}] Branding ${path.basename(inputPath)}...`);

      if (addBrandingOverlay(inputPath, outputPath, collection)) {
        brandedImages.push(outputPath);
        log(`   ✅ Created: slide_${String(i + 1).padStart(2, '0')}.jpg`);
      }
    }

    if (brandedImages.length === 0) {
      log(`   ❌ No images branded successfully`);
      continue;
    }

    // Upload to GitHub CDN
    log(`\n   📤 Uploading ${brandedImages.length} images to GitHub CDN...`);
    const imageUrls = [];

    for (let i = 0; i < brandedImages.length; i++) {
      const imagePath = brandedImages[i];
      const filename = `${collection.id}_slide_${i + 1}.jpg`;

      try {
        const url = await uploadToGitHub(imagePath, filename);
        imageUrls.push(url);
        log(`   ✅ [${i + 1}/${brandedImages.length}] Uploaded`);

        // Small delay to avoid rate limits
        await new Promise(r => setTimeout(r, 1000));
      } catch (err) {
        log(`   ❌ Upload failed: ${err.message}`);
      }
    }

    if (imageUrls.length === 0) {
      log(`   ❌ No images uploaded to CDN`);
      continue;
    }

    // Wait for CDN propagation
    log(`   ⏳ Waiting for CDN propagation (5s)...`);
    await new Promise(r => setTimeout(r, 5000));

    // Publish carousel (max 10 images)
    const carouselUrls = imageUrls.slice(0, 10);
    log(`\n   📱 Publishing carousel with ${carouselUrls.length} images...`);

    try {
      const result = await publishCarousel(carouselUrls, collection.caption);
      log(`   ✅ CAROUSEL PUBLISHED! Media ID: ${result.id}`);

      publishedResults.push({
        collection: collection.name,
        mediaId: result.id,
        images: carouselUrls.length,
        status: 'success'
      });

      // Publish first image as story
      log(`   📱 Publishing story...`);
      const storyResult = await publishStory(carouselUrls[0]);
      log(`   ✅ Story published: ${storyResult.id}`);

    } catch (err) {
      log(`   ❌ Publish failed: ${err.message}`);
      publishedResults.push({
        collection: collection.name,
        error: err.message,
        status: 'failed'
      });
    }

    // Wait between collections to avoid rate limits
    log(`\n   ⏳ Waiting 30s before next collection...`);
    await new Promise(r => setTimeout(r, 30000));
  }

  // Summary
  console.log(`\n${'═'.repeat(70)}`);
  console.log(`              COMPLETE COLLECTION PUBLISHING SUMMARY`);
  console.log(`${'═'.repeat(70)}`);

  const successful = publishedResults.filter(r => r.status === 'success');
  const failed = publishedResults.filter(r => r.status === 'failed');

  console.log(`\n  ✅ Published: ${successful.length} carousels`);
  successful.forEach(r => {
    console.log(`     📱 ${r.collection}: ${r.images} images (ID: ${r.mediaId})`);
  });

  if (failed.length > 0) {
    console.log(`\n  ❌ Failed: ${failed.length} carousels`);
    failed.forEach(r => {
      console.log(`     ⚠️ ${r.collection}: ${r.error}`);
    });
  }

  // Save manifest
  const manifestPath = path.join(OUTPUT_DIR, 'publish-manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    results: publishedResults
  }, null, 2));

  console.log(`\n  📋 Manifest saved: ${manifestPath}`);
  console.log(`${'═'.repeat(70)}\n`);
}

main().catch(console.error);
