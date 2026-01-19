#!/usr/bin/env node
/**
 * VERALABS Publish All Branded Carousels
 * Uses correct proxy endpoints for Instagram carousel publishing
 */

import fs from 'fs';
import path from 'path';

const PROXY_URL = 'http://localhost:3001';
const INSTAGRAM_TOKEN = process.env.INSTAGRAM_TOKEN;
const INSTAGRAM_ACCOUNT_ID = '17841478517688462';

const BRANDED_DIR = '/home/ecolex/version1/instagram-all-branded';

// Collection captions
const COLLECTION_DATA = {
  vera_masterclass: {
    name: 'VERA MASTERCLASS',
    caption: `VERA MASTERCLASS | Artistic Vision

Where light meets form, magic emerges. This is the language of fine art photography - spoken in shadow and revealed in silk.

Every frame a masterpiece. Every curve a story.

Follow @veralabs.ai for daily artistic inspiration.

#VERALABS #VeraMasterclass #FineArtPhotography #ArtisticVision #MuseumQuality #BoudoirArt #LightAndShadow #CurvaceousFigure #HourglassMuse #IntimateArt #MasterclassCollection`
  },
  executive_muse: {
    name: 'EXECUTIVE MUSE',
    caption: `EXECUTIVE MUSE | Strategy Variants

Power meets elegance. Confidence meets curves. This is the art of presence - commanding, captivating, unforgettable.

Four strategies. One vision. Absolute mastery.

Which variant speaks to your soul?

#VERALABS #ExecutiveMuse #PowerfulWomen #ConfidentBeauty #FineArtBoudoir #StrategyVariants #HourglassFigure #EditorialArt #CinematicBeauty #SculpturalForm`
  },
  boundary_intimacy: {
    name: 'BOUNDARY INTIMACY',
    caption: `BOUNDARY INTIMACY | Seductress Archetypes

Where art meets desire, boundaries dissolve. This is maximum expression through minimum restraint - the purest form of artistic intimacy.

Eight archetypes. Infinite beauty. One vision.

Tap to explore the full collection.

#VERALABS #BoundaryArt #SeductressArchetypes #IntimateArt #FineArtNude #MaximumExpression #ArtisticIntimacy #HourglassMuse #SculpturalBeauty #BoudoirMasterclass`
  },
  premium_minimal: {
    name: 'PREMIUM MINIMAL',
    caption: `PREMIUM MINIMAL | Maximum Expression

Less reveals more. Shadow conceals to reveal. Silk whispers what words cannot.

This is the art of strategic minimalism - where every absence speaks volumes.

Swipe to experience the full series.

#VERALABS #PremiumMinimal #MaximumExpression #ShadowArt #SilkDraping #MinimalCoverage #FineArtBoudoir #StrategicDesign #HourglassFigure #ChiaroscuroMastery`
  }
};

function log(msg) {
  const time = new Date().toLocaleTimeString();
  console.log(`[${time}] ${msg}`);
}

async function createCarouselItem(imageUrl) {
  const response = await fetch(`${PROXY_URL}/api/instagram/create-carousel-item`, {
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

async function createCarousel(childIds, caption) {
  const response = await fetch(`${PROXY_URL}/api/instagram/create-carousel`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      accessToken: INSTAGRAM_TOKEN,
      childrenIds: childIds,
      caption,
      instagramAccountId: INSTAGRAM_ACCOUNT_ID,
    }),
  });
  return await response.json();
}

async function publishContainer(containerId) {
  const response = await fetch(`${PROXY_URL}/api/instagram/publish-container`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      accessToken: INSTAGRAM_TOKEN,
      containerId,
      instagramAccountId: INSTAGRAM_ACCOUNT_ID,
    }),
  });
  return await response.json();
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

async function getContainerStatus(containerId) {
  const response = await fetch(`${PROXY_URL}/api/instagram/container-status/${containerId}?accessToken=${INSTAGRAM_TOKEN}`);
  return await response.json();
}

async function waitForContainer(containerId, maxWait = 120000) {
  const start = Date.now();
  while (Date.now() - start < maxWait) {
    const status = await getContainerStatus(containerId);
    log(`   📊 Status: ${status.status_code}`);

    if (status.status_code === 'FINISHED') {
      return true;
    } else if (status.status_code === 'ERROR') {
      throw new Error(`Container error: ${status.status}`);
    }

    await new Promise(r => setTimeout(r, 5000));
  }
  return false;
}

// Read the manifest to get uploaded URLs
function getUploadedUrls(collectionId) {
  // The URLs were uploaded to GitHub - we need to reconstruct them from the CDN pattern
  // or read from a saved state. Let's check if there's a state file.
  const stateFile = path.join(BRANDED_DIR, collectionId, 'urls.json');
  if (fs.existsSync(stateFile)) {
    return JSON.parse(fs.readFileSync(stateFile, 'utf-8'));
  }
  return null;
}

async function uploadToGitHub(filePath, filename) {
  const GITHUB_TOKEN = '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';
  const fileBuffer = fs.readFileSync(filePath);
  const base64Data = fileBuffer.toString('base64');
  const timestamp = Date.now();

  const response = await fetch(`${PROXY_URL}/api/instagram/upload-to-github`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      githubToken: GITHUB_TOKEN,
      imageData: base64Data,
      filename: `${timestamp}_${filename}`,
      owner: 'aemons9',
      repo: 'studiov1',
      pathPrefix: 'photo/all-collections-publish',
    }),
  });

  const data = await response.json();
  return data.publicUrl || data.url;
}

async function publishCollection(collectionId) {
  const collectionDir = path.join(BRANDED_DIR, collectionId);
  const collectionData = COLLECTION_DATA[collectionId];

  if (!fs.existsSync(collectionDir)) {
    log(`   ⏭️ Skipping ${collectionId} - directory not found`);
    return null;
  }

  // Get branded images
  const images = fs.readdirSync(collectionDir)
    .filter(f => f.endsWith('.jpg'))
    .sort()
    .slice(0, 10); // Max 10 for carousel

  if (images.length === 0) {
    log(`   ⏭️ No images in ${collectionId}`);
    return null;
  }

  log(`   📷 Found ${images.length} branded images`);

  // Upload images to GitHub CDN
  log(`   📤 Uploading to GitHub CDN...`);
  const imageUrls = [];

  for (let i = 0; i < images.length; i++) {
    const imagePath = path.join(collectionDir, images[i]);
    const url = await uploadToGitHub(imagePath, `${collectionId}_${images[i]}`);
    imageUrls.push(url);
    log(`   ✅ [${i + 1}/${images.length}] ${images[i]} uploaded`);
    await new Promise(r => setTimeout(r, 1000));
  }

  // Save URLs for reference
  fs.writeFileSync(
    path.join(collectionDir, 'urls.json'),
    JSON.stringify(imageUrls, null, 2)
  );

  // Wait for CDN propagation
  log(`   ⏳ Waiting for CDN propagation (8s)...`);
  await new Promise(r => setTimeout(r, 8000));

  // Create carousel items
  log(`   📦 Creating carousel items...`);
  const childIds = [];

  for (let i = 0; i < imageUrls.length; i++) {
    const result = await createCarouselItem(imageUrls[i]);
    if (result.id) {
      childIds.push(result.id);
      log(`   ✅ [${i + 1}/${imageUrls.length}] Item: ${result.id}`);
    } else {
      log(`   ❌ Failed to create item ${i + 1}: ${JSON.stringify(result).slice(0, 100)}`);
    }
    await new Promise(r => setTimeout(r, 2000));
  }

  if (childIds.length < 2) {
    log(`   ❌ Not enough items for carousel (need 2+)`);
    return null;
  }

  // Create carousel container
  log(`   📦 Creating carousel container...`);
  const carousel = await createCarousel(childIds, collectionData.caption);

  if (!carousel.id) {
    log(`   ❌ Failed to create carousel: ${JSON.stringify(carousel).slice(0, 100)}`);
    return null;
  }

  log(`   ✅ Carousel container: ${carousel.id}`);

  // Wait for container to be ready
  log(`   ⏳ Waiting for Instagram processing...`);
  await waitForContainer(carousel.id);

  // Publish
  log(`   📱 Publishing carousel...`);
  const publishResult = await publishContainer(carousel.id);

  if (publishResult.id) {
    log(`   ✅ PUBLISHED! Media ID: ${publishResult.id}`);

    // Also publish first image as story
    log(`   📱 Publishing story...`);
    const storyResult = await publishStory(imageUrls[0]);
    if (storyResult.id) {
      log(`   ✅ Story published: ${storyResult.id}`);
    }

    return {
      mediaId: publishResult.id,
      storyId: storyResult?.id,
      images: imageUrls.length
    };
  } else {
    log(`   ❌ Publish failed: ${JSON.stringify(publishResult).slice(0, 100)}`);
    return null;
  }
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
║    📱 PUBLISH ALL BRANDED CAROUSELS 📱                                   ║
║                                                                          ║
║          Upload • Create Items • Publish Carousels + Stories             ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
  `);

  if (!INSTAGRAM_TOKEN) {
    console.error('❌ INSTAGRAM_TOKEN environment variable required');
    process.exit(1);
  }

  const collections = Object.keys(COLLECTION_DATA);
  const results = [];

  for (const collectionId of collections) {
    const collectionData = COLLECTION_DATA[collectionId];

    console.log(`\n${'═'.repeat(70)}`);
    log(`📱 PUBLISHING: ${collectionData.name}`);
    console.log(`${'═'.repeat(70)}`);

    try {
      const result = await publishCollection(collectionId);
      if (result) {
        results.push({
          collection: collectionData.name,
          ...result,
          status: 'success'
        });
      } else {
        results.push({
          collection: collectionData.name,
          status: 'failed'
        });
      }
    } catch (err) {
      log(`   ❌ Error: ${err.message}`);
      results.push({
        collection: collectionData.name,
        error: err.message,
        status: 'failed'
      });
    }

    // Wait between collections
    log(`\n   ⏳ Waiting 45s before next collection...`);
    await new Promise(r => setTimeout(r, 45000));
  }

  // Summary
  console.log(`\n${'═'.repeat(70)}`);
  console.log(`              PUBLISHING SUMMARY`);
  console.log(`${'═'.repeat(70)}`);

  const successful = results.filter(r => r.status === 'success');
  console.log(`\n  ✅ Published: ${successful.length} carousels`);
  successful.forEach(r => {
    console.log(`     📱 ${r.collection}: ${r.images} images (ID: ${r.mediaId})`);
  });

  const failed = results.filter(r => r.status === 'failed');
  if (failed.length > 0) {
    console.log(`\n  ❌ Failed: ${failed.length} carousels`);
    failed.forEach(r => {
      console.log(`     ⚠️ ${r.collection}`);
    });
  }

  // Save results
  const manifestPath = path.join(BRANDED_DIR, 'final-publish-manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    results
  }, null, 2));

  console.log(`\n  📋 Results saved: ${manifestPath}`);
  console.log(`${'═'.repeat(70)}\n`);
}

main().catch(console.error);
