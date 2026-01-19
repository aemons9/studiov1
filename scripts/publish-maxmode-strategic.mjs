#!/usr/bin/env node
/**
 * VERALABS MAX-MODE STRATEGIC PUBLISHING
 *
 * Phase 1: Teaser Stories - Build anticipation for each collection
 * Phase 2: Carousel Publishing - Full collections with strategic captions
 *
 * Strategic positioning for maximum engagement and profile visits
 */

import fs from 'fs';
import path from 'path';

const PROXY_URL = 'http://localhost:3001';
const INSTAGRAM_TOKEN = process.env.INSTAGRAM_TOKEN;
const INSTAGRAM_ACCOUNT_ID = '17841478517688462';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || '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';

const BRANDED_DIR = '/home/ecolex/version1/instagram_branded_new';

// Strategic collection data with teaser + carousel content
const COLLECTIONS = [
  {
    id: 'bronze_mesh_masterclass',
    name: 'BRONZE MESH',
    theme: 'METALLIC INTIMACY',
    teaserText: 'COMING NOW',
    teaserSubtext: 'Bronze Mesh Masterclass',
    teaserInvocation: 'Where metal meets skin...',
    caption: `BRONZE MESH | Metallic Intimacy

Where metal meets skin, alchemy happens. Bronze chainmail and copper mesh harmonize with sun-kissed bronze skin in perfect amalgamation.

Candlelit luxury meets industrial edge.

Swipe to experience the full metallic journey.

#VERALABS #BronzeMesh #MetallicIntimacy #CandlelitLuxury #AmalgamativeArt #ChainmailCouture #FineArtBoudoir #HourglassMuse #IndustrialGlamour #CopperGlow`
  },
  {
    id: 'meshminimal_muse',
    name: 'MESHMINIMAL',
    theme: 'INDIAN MUSE SERIES',
    teaserText: 'NEW DROP',
    teaserSubtext: 'MeshMinimal Muse',
    teaserInvocation: 'Sheer artistry unveiled...',
    caption: `MESHMINIMAL | Indian Muse Series

Sheer elegance meets sculptural form. Black mesh whispers against bronze skin in this tribute to minimal expression and maximum beauty.

Victorian warmth. Modern edge. Timeless muse.

#VERALABS #MeshMinimal #IndianMuse #SheerElegance #VictorianModern #BronzeSkin #MinimalArt #FineArtBoudoir #SculpturalBeauty #MuseCollection`
  },
  {
    id: 'wooden_cabin_crystalline',
    name: 'CABIN CRYSTALLINE',
    theme: 'VICTORIAN INTIMACY',
    teaserText: 'EXCLUSIVE',
    teaserSubtext: 'Cabin Crystalline',
    teaserInvocation: 'Rustic luxury whispers...',
    caption: `CABIN CRYSTALLINE | Victorian Intimacy

Where rustic warmth meets crystalline elegance. Leather and lace intertwine in Victorian wooden chambers, skin glowing against amber light.

Heritage meets haute couture.

#VERALABS #CabinCrystalline #VictorianIntimacy #RusticLuxury #LeatherAndLace #AmberLight #WoodenCabin #FineArtBoudoir #HeritageCouture #IntimateArt`
  },
  {
    id: 'crystalline_exclusive',
    name: 'CRYSTALLINE',
    theme: 'EXCLUSIVE 10+ SERIES',
    teaserText: 'PREMIUM',
    teaserSubtext: 'Crystalline Exclusive',
    teaserInvocation: 'Light through gossamer...',
    caption: `CRYSTALLINE | Exclusive 10+ Series

Light whispers through gossamer threads. Crystalline fabric becomes one with skin, revealing form in its purest expression.

This is where art transcends boundaries.

#VERALABS #Crystalline #ExclusiveSeries #GossamerArt #LightAndForm #FineArtBoudoir #PureExpression #TranscendentBeauty #HourglassMuse #ArtisticVision`
  },
  {
    id: 'indian_hourglass_amalgamative',
    name: 'HOURGLASS',
    theme: 'AMALGAMATIVE EXCELLENCE',
    teaserText: 'SIGNATURE',
    teaserSubtext: 'Hourglass Amalgamative',
    teaserInvocation: 'Form becomes surface...',
    caption: `HOURGLASS | Amalgamative Excellence

When wardrobe and surface become one. Black lace on cream velvet. Gold mesh on amber silk. This is amalgamative art - perfect harmony of form and ground.

Experience the excellence.

#VERALABS #Hourglass #AmalgamativeArt #IndianMuse #BlackLace #GoldMesh #VelvetLuxury #FineArtBoudoir #HarmoniousDesign #ExcellenceInArt`
  },
  {
    id: 'vip_underground',
    name: 'VIP UNDERGROUND',
    theme: 'GOSSAMER NOIR',
    teaserText: 'VIP ACCESS',
    teaserSubtext: 'Underground Gossamer',
    teaserInvocation: 'Darkness reveals beauty...',
    caption: `VIP UNDERGROUND | Gossamer Noir

Behind velvet curtains, in spaces few have seen. Gossamer fabric catches penthouse light as curves emerge from shadow.

This is VIP access to intimate art.

#VERALABS #VIPUnderground #GossamerNoir #VelvetCurtains #PenthouseArt #IntimateAccess #DarkLuxury #FineArtBoudoir #ExclusiveViews #ShadowPlay`
  },
  {
    id: 'velvet_intimacy',
    name: 'VELVET THRONE',
    theme: 'SHADOW MASTERY',
    teaserText: 'THRONE SERIES',
    teaserSubtext: 'Velvet Shadow Mastery',
    teaserInvocation: 'Command the light...',
    caption: `VELVET THRONE | Shadow Mastery

Upon velvet, shadows dance. Form emerges from darkness like royalty claiming their throne. This is the mastery of light and absence.

Every shadow tells a story.

#VERALABS #VelvetThrone #ShadowMastery #ChiaroscuroArt #VelvetLuxury #FormAndShadow #FineArtBoudoir #RoyalAesthetic #DramaticLight #ArtisticVision`
  },
  {
    id: 'masterpiece_ii',
    name: 'MASTERPIECE II',
    theme: 'SHADOW MESH INTIMACY',
    teaserText: 'MASTERPIECE',
    teaserSubtext: 'Shadow Mesh Chapter II',
    teaserInvocation: 'Evolution of excellence...',
    caption: `MASTERPIECE II | Shadow Mesh Intimacy

The evolution continues. Mesh and shadow intertwine in this second chapter of our masterpiece series. Where first was foundation, this is transcendence.

Art evolves. Beauty remains.

#VERALABS #MasterpieceII #ShadowMesh #IntimateArt #EvolutionOfArt #MeshAesthetics #FineArtBoudoir #TranscendentBeauty #ChapterTwo #ArtisticEvolution`
  },
  {
    id: 'premium_editorial',
    name: 'EDITORIAL',
    theme: 'PREMIUM COUCH SERIES',
    teaserText: 'EDITORIAL',
    teaserSubtext: 'Premium Couch Series',
    teaserInvocation: 'Magazine-worthy moments...',
    caption: `EDITORIAL | Premium Couch Series

Magazine spreads come to life. On premium velvet, editorial vision meets intimate artistry. Every frame worthy of the finest publications.

This is where fashion meets fine art.

#VERALABS #Editorial #PremiumCouch #MagazineStyle #EditorialArt #VelvetLuxury #HighFashion #FineArtBoudoir #PublicationWorthy #ArtisticEditorial`
  },
  {
    id: 'candlelit_chamber',
    name: 'CANDLELIT CHAMBER',
    theme: 'INTIMATE DEVOTION',
    teaserText: 'DEVOTION',
    teaserSubtext: 'Candlelit Chamber',
    teaserInvocation: 'Flames whisper secrets...',
    caption: `CANDLELIT CHAMBER | Intimate Devotion

By candlelight, form becomes sacred. Bronze candelabras cast dancing shadows on silk and skin. This is worship through artistry.

Surrender to the glow.

#VERALABS #CandlelitChamber #IntimateDevtion #Candlelight #BronzeCandelabra #SilkAndShadow #FineArtBoudoir #SacredArt #WarmGlow #DevotionalBeauty`
  }
];

function log(msg) {
  const time = new Date().toLocaleTimeString();
  console.log(`[${time}] ${msg}`);
}

// Upload image to GitHub CDN
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
      filename: `${timestamp}_${filename}`,
      owner: 'aemons9',
      repo: 'studiov1',
      pathPrefix: 'photo/maxmode-publish',
    }),
  });

  const data = await response.json();
  return data.publicUrl || data.url;
}

// Create story container
async function createStoryContainer(imageUrl) {
  const response = await fetch(`${PROXY_URL}/api/instagram/create-story-container`, {
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

// Publish story
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

// Create carousel item
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

// Create carousel container
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

// Publish container
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

// Check container status
async function getContainerStatus(containerId) {
  const response = await fetch(`${PROXY_URL}/api/instagram/container-status/${containerId}?accessToken=${INSTAGRAM_TOKEN}`);
  return await response.json();
}

// Wait for container to be ready
async function waitForContainer(containerId, maxWait = 120000) {
  const start = Date.now();
  while (Date.now() - start < maxWait) {
    const status = await getContainerStatus(containerId);
    log(`   📊 Status: ${status.status_code || 'checking...'}`);

    if (status.status_code === 'FINISHED') {
      return true;
    } else if (status.status_code === 'ERROR') {
      throw new Error(`Container error: ${status.status}`);
    }

    await new Promise(r => setTimeout(r, 5000));
  }
  return false;
}

// Create teaser story image with FFmpeg
async function createTeaserStory(collection, sourceImage, outputPath) {
  const { execSync } = await import('child_process');

  // Story dimensions: 1080x1920 (9:16)
  const filterComplex = [
    // Scale and crop source to story size
    `scale=1080:1920:force_original_aspect_ratio=increase`,
    `crop=1080:1920`,
    // Add dark gradient overlay for text visibility
    `drawbox=y=0:w=iw:h=ih*0.35:color=black@0.6:t=fill`,
    `drawbox=y=ih*0.65:w=iw:h=ih*0.35:color=black@0.6:t=fill`,
    // Top text - "COMING NOW" etc
    `drawtext=text='${collection.teaserText}':fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf:fontsize=48:fontcolor=0xc9a962:x=(w-text_w)/2:y=h*0.08`,
    // Collection name
    `drawtext=text='${collection.name}':fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf:fontsize=64:fontcolor=white:x=(w-text_w)/2:y=h*0.14`,
    // Theme subtitle
    `drawtext=text='${collection.theme}':fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf:fontsize=32:fontcolor=0xc9a962:x=(w-text_w)/2:y=h*0.21`,
    // Bottom invocation
    `drawtext=text='${collection.teaserInvocation}':fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSerif-Italic.ttf:fontsize=36:fontcolor=white:x=(w-text_w)/2:y=h*0.82`,
    // Swipe up CTA
    `drawtext=text='SWIPE UP FOR FULL COLLECTION':fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf:fontsize=24:fontcolor=0xc9a962:x=(w-text_w)/2:y=h*0.88`,
    // VERALABS watermark
    `drawtext=text='VERALABS':fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf:fontsize=28:fontcolor=0xc9a962@0.9:x=(w-text_w)/2:y=h*0.94`
  ].join(',');

  const cmd = `ffmpeg -y -i "${sourceImage}" -vf "${filterComplex}" -q:v 2 "${outputPath}" 2>/dev/null`;

  try {
    execSync(cmd);
    return true;
  } catch (err) {
    log(`   ⚠️ FFmpeg error: ${err.message}`);
    return false;
  }
}

// Phase 1: Publish teaser stories
async function publishTeaserStories() {
  console.log(`
${'═'.repeat(74)}
                    PHASE 1: TEASER STORIES
${'═'.repeat(74)}
  `);

  const storyResults = [];
  const teaserDir = path.join(BRANDED_DIR, '_teaser_stories');
  if (!fs.existsSync(teaserDir)) {
    fs.mkdirSync(teaserDir, { recursive: true });
  }

  for (let i = 0; i < COLLECTIONS.length; i++) {
    const collection = COLLECTIONS[i];
    const collectionDir = path.join(BRANDED_DIR, collection.id);

    if (!fs.existsSync(collectionDir)) {
      log(`⏭️ Skipping ${collection.id} - not found`);
      continue;
    }

    console.log(`\n${'─'.repeat(74)}`);
    log(`📖 TEASER [${i + 1}/${COLLECTIONS.length}]: ${collection.name} | ${collection.theme}`);

    // Get first image for teaser
    const images = fs.readdirSync(collectionDir)
      .filter(f => f.endsWith('.jpg'))
      .sort();

    if (images.length === 0) {
      log(`   ⏭️ No images found`);
      continue;
    }

    const sourceImage = path.join(collectionDir, images[0]);
    const teaserPath = path.join(teaserDir, `teaser_${collection.id}.jpg`);

    // Create teaser story image
    log(`   🎨 Creating teaser story...`);
    const created = await createTeaserStory(collection, sourceImage, teaserPath);

    if (!created) {
      log(`   ❌ Failed to create teaser`);
      continue;
    }

    // Upload to GitHub
    log(`   📤 Uploading to CDN...`);
    const imageUrl = await uploadToGitHub(teaserPath, `teaser_${collection.id}.jpg`);

    if (!imageUrl) {
      log(`   ❌ Upload failed`);
      continue;
    }

    // Wait for CDN propagation
    await new Promise(r => setTimeout(r, 5000));

    // Publish story
    log(`   📱 Publishing story...`);
    const storyResult = await publishStory(imageUrl);

    if (storyResult.id) {
      log(`   ✅ Story published: ${storyResult.id}`);
      storyResults.push({
        collection: collection.name,
        storyId: storyResult.id,
        status: 'success'
      });
    } else {
      log(`   ❌ Story publish failed: ${JSON.stringify(storyResult).slice(0, 100)}`);
      storyResults.push({
        collection: collection.name,
        error: storyResult,
        status: 'failed'
      });
    }

    // Short delay between stories
    log(`   ⏳ Waiting 10s...`);
    await new Promise(r => setTimeout(r, 10000));
  }

  return storyResults;
}

// Phase 2: Publish carousels
async function publishCarousels() {
  console.log(`
${'═'.repeat(74)}
                    PHASE 2: CAROUSEL PUBLISHING
${'═'.repeat(74)}
  `);

  const carouselResults = [];

  for (let i = 0; i < COLLECTIONS.length; i++) {
    const collection = COLLECTIONS[i];
    const collectionDir = path.join(BRANDED_DIR, collection.id);

    if (!fs.existsSync(collectionDir)) {
      log(`⏭️ Skipping ${collection.id} - not found`);
      continue;
    }

    console.log(`\n${'─'.repeat(74)}`);
    log(`📱 CAROUSEL [${i + 1}/${COLLECTIONS.length}]: ${collection.name} | ${collection.theme}`);

    // Get carousel images
    const images = fs.readdirSync(collectionDir)
      .filter(f => f.endsWith('.jpg') && f.startsWith('slide_'))
      .sort()
      .slice(0, 10); // Max 10 for carousel

    if (images.length < 2) {
      log(`   ⏭️ Not enough images (need 2+, found ${images.length})`);
      continue;
    }

    log(`   📷 Found ${images.length} images`);

    // Upload all images to GitHub
    log(`   📤 Uploading to GitHub CDN...`);
    const imageUrls = [];

    for (let j = 0; j < images.length; j++) {
      const imagePath = path.join(collectionDir, images[j]);
      const url = await uploadToGitHub(imagePath, `${collection.id}_${images[j]}`);
      if (url) {
        imageUrls.push(url);
        log(`   ✅ [${j + 1}/${images.length}] Uploaded`);
      } else {
        log(`   ❌ [${j + 1}/${images.length}] Upload failed`);
      }
      await new Promise(r => setTimeout(r, 1500));
    }

    if (imageUrls.length < 2) {
      log(`   ❌ Not enough uploads succeeded`);
      continue;
    }

    // Wait for CDN propagation
    log(`   ⏳ Waiting 8s for CDN...`);
    await new Promise(r => setTimeout(r, 8000));

    // Create carousel items
    log(`   📦 Creating carousel items...`);
    const childIds = [];

    for (let j = 0; j < imageUrls.length; j++) {
      const result = await createCarouselItem(imageUrls[j]);
      if (result.id) {
        childIds.push(result.id);
        log(`   ✅ [${j + 1}/${imageUrls.length}] Item: ${result.id.slice(-8)}`);
      } else {
        log(`   ❌ [${j + 1}/${imageUrls.length}] Failed: ${JSON.stringify(result).slice(0, 80)}`);
      }
      await new Promise(r => setTimeout(r, 2000));
    }

    if (childIds.length < 2) {
      log(`   ❌ Not enough carousel items created`);
      carouselResults.push({
        collection: collection.name,
        status: 'failed',
        reason: 'insufficient_items'
      });
      continue;
    }

    // Create carousel container
    log(`   📦 Creating carousel container...`);
    const carousel = await createCarousel(childIds, collection.caption);

    if (!carousel.id) {
      log(`   ❌ Carousel creation failed: ${JSON.stringify(carousel).slice(0, 100)}`);
      carouselResults.push({
        collection: collection.name,
        status: 'failed',
        reason: 'container_failed'
      });
      continue;
    }

    log(`   ✅ Container: ${carousel.id.slice(-12)}`);

    // Wait for Instagram processing
    log(`   ⏳ Waiting for Instagram processing...`);
    const ready = await waitForContainer(carousel.id);

    if (!ready) {
      log(`   ⚠️ Container timed out, attempting publish anyway...`);
    }

    // Publish carousel
    log(`   📱 Publishing carousel...`);
    const publishResult = await publishContainer(carousel.id);

    if (publishResult.id) {
      log(`   ✅ PUBLISHED! Media ID: ${publishResult.id}`);
      carouselResults.push({
        collection: collection.name,
        mediaId: publishResult.id,
        images: imageUrls.length,
        status: 'success'
      });
    } else {
      log(`   ❌ Publish failed: ${JSON.stringify(publishResult).slice(0, 100)}`);
      carouselResults.push({
        collection: collection.name,
        status: 'failed',
        reason: 'publish_failed'
      });
    }

    // Wait between carousels to avoid rate limits
    if (i < COLLECTIONS.length - 1) {
      log(`\n   ⏳ Waiting 60s before next carousel...`);
      await new Promise(r => setTimeout(r, 60000));
    }
  }

  return carouselResults;
}

async function main() {
  console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║   ██╗   ██╗███████╗██████╗  █████╗ ██╗      █████╗ ██████╗ ███████╗          ║
║   ██║   ██║██╔════╝██╔══██╗██╔══██╗██║     ██╔══██╗██╔══██╗██╔════╝          ║
║   ██║   ██║█████╗  ██████╔╝███████║██║     ███████║██████╔╝███████╗          ║
║   ╚██╗ ██╔╝██╔══╝  ██╔══██╗██╔══██║██║     ██╔══██║██╔══██╗╚════██║          ║
║    ╚████╔╝ ███████╗██║  ██║██║  ██║███████╗██║  ██║██████╔╝███████║          ║
║     ╚═══╝  ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═════╝ ╚══════╝          ║
║                                                                              ║
║    ✨ MAX-MODE STRATEGIC PUBLISHING ✨                                       ║
║                                                                              ║
║    Phase 1: Teaser Stories (Build Anticipation)                              ║
║    Phase 2: Carousel Publishing (Full Collections)                           ║
║                                                                              ║
║    Strategic Positioning • Maximum Engagement • Profile Visits               ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
  `);

  if (!INSTAGRAM_TOKEN) {
    console.error('❌ INSTAGRAM_TOKEN environment variable required');
    console.log('   Set with: export INSTAGRAM_TOKEN="your_token"');
    process.exit(1);
  }

  log(`Starting max-mode strategic publishing...`);
  log(`Collections to publish: ${COLLECTIONS.length}`);
  log(`Source directory: ${BRANDED_DIR}\n`);

  // Phase 1: Teaser Stories
  const storyResults = await publishTeaserStories();

  // Brief pause between phases
  console.log(`\n${'═'.repeat(74)}`);
  log(`⏳ Waiting 30s between story and carousel phases...`);
  await new Promise(r => setTimeout(r, 30000));

  // Phase 2: Carousels
  const carouselResults = await publishCarousels();

  // Final Summary
  console.log(`
${'═'.repeat(74)}
              MAX-MODE STRATEGIC PUBLISHING COMPLETE
${'═'.repeat(74)}

  📖 TEASER STORIES:
     ✅ Published: ${storyResults.filter(r => r.status === 'success').length}
     ❌ Failed: ${storyResults.filter(r => r.status === 'failed').length}
`);

  storyResults.filter(r => r.status === 'success').forEach(r => {
    console.log(`     📖 ${r.collection}: ${r.storyId}`);
  });

  console.log(`
  📱 CAROUSELS:
     ✅ Published: ${carouselResults.filter(r => r.status === 'success').length}
     ❌ Failed: ${carouselResults.filter(r => r.status === 'failed').length}
`);

  carouselResults.filter(r => r.status === 'success').forEach(r => {
    console.log(`     📱 ${r.collection}: ${r.images} images (ID: ${r.mediaId})`);
  });

  // Save manifest
  const manifest = {
    timestamp: new Date().toISOString(),
    stories: storyResults,
    carousels: carouselResults,
    summary: {
      totalStories: storyResults.filter(r => r.status === 'success').length,
      totalCarousels: carouselResults.filter(r => r.status === 'success').length,
      totalImages: carouselResults.filter(r => r.status === 'success').reduce((sum, r) => sum + (r.images || 0), 0)
    }
  };

  const manifestPath = path.join(BRANDED_DIR, 'publish-manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

  console.log(`
  📋 Manifest saved: ${manifestPath}
${'═'.repeat(74)}
  `);
}

main().catch(console.error);
