#!/usr/bin/env node
/**
 * VERALABS Masterclass Carousel Publisher
 * Publishes all 7 masterclass carousels to Instagram with branded slides
 */

import fs from 'fs';
import path from 'path';

// Config
const INSTAGRAM_TOKEN = process.env.INSTAGRAM_TOKEN;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || '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';
const IG_ACCOUNT_ID = '17841478517688462';
const GRAPH_API = 'https://graph.facebook.com/v21.0';
const PROXY_URL = 'http://localhost:3001';
const CAROUSELS_DIR = '/home/ecolex/version1/instagram-masterclass-carousels';

// Carousel definitions with captions
const CAROUSELS = [
  {
    id: 'shadow_mastery',
    name: 'Shadow Mastery',
    collection: 'CHIAROSCURO COLLECTION',
    caption: `Light sculpts what darkness reveals.

In this collection, venetian blinds become the artist's brush - painting stripes of gold across skin, creating visual poetry through natural chiaroscuro.

Swipe to experience the full Shadow Mastery series.

Which frame speaks to your soul? Tell us in the comments.

#VERALABS #ShadowMastery #ChiaroscuroArt #LightAndShadow #FineArtBoudoir #VenetianLight #ArtisticPhotography #IntimateArt #GoldenHour #MuseumQuality`
  },
  {
    id: 'lace_elegance',
    name: 'Lace Elegance',
    collection: 'TEXTILE ARTISTRY',
    caption: `When textile becomes poetry.

Chantilly whispers. French elegance speaks. The language of lace needs no translation - it speaks directly to the soul.

This series celebrates the timeless artistry of delicate fabrics that transform the ordinary into the extraordinary.

Save this for your next moment of inspiration.

#VERALABS #LaceElegance #TextileArtistry #FrenchLace #ChantillyDreams #IntimateElegance #BoudoirArt #LuxuryLingerie #FineArtPhotography #MuseumQuality`
  },
  {
    id: 'minimalist_forms',
    name: 'Minimalist Forms',
    collection: 'LESS IS MORE',
    caption: `In restraint, we find freedom.

The minimalist eye sees what others miss. Every line intentional. Every shadow purposeful. Every breath of negative space a meditation.

Less truly is more.

Double tap if you appreciate the art of simplicity.

#VERALABS #MinimalistForms #LessIsMore #MinimalArt #NegativeSpace #IntimateMinimalism #FineArtPhotography #ContemporaryArt #MuseumQuality #ArtisticVision`
  },
  {
    id: 'artistic_intimate',
    name: 'Artistic Intimate',
    collection: 'GALLERY SERIES',
    caption: `Gallery-worthy. Museum-quality.

This series brings museum-quality intimate portraiture to your feed. Each image crafted with the precision of a master painter, the eye of a sculptor.

Would you hang this on your wall? Let us know.

#VERALABS #GalleryArt #MuseumQuality #FineArtPhotography #ArtCollector #CuratedBeauty #IntimatePortrait #ContemporaryArt #ArtisticVision #EditorialArt`
  },
  {
    id: 'fit_goddess',
    name: 'Fit Goddess',
    collection: 'POWER AND GRACE',
    caption: `Strong is the new beautiful. Always was.

This series celebrates the athletic feminine form - where discipline meets desire, where strength becomes sensuality.

The body is a temple. These images are the worship.

Tag someone who embodies goddess energy.

#VERALABS #FitGoddess #StrongIsBeautiful #AthleticBeauty #PowerAndGrace #FemininePower #BodyPositive #FitnessArt #GoddessEnergy #WomenEmpowerment`
  },
  {
    id: 'lingerie_luxe',
    name: 'Lingerie Luxe',
    collection: 'INTIMATE COUTURE',
    caption: `Lingerie is the first layer of self-expression.

What you wear closest to your skin reveals who you truly are. This collection celebrates pieces that make you feel powerful before anyone else sees them.

Your confidence starts here.

Save this for your next lingerie shopping spree.

#VERALABS #LingerieLuxe #IntimateCouture #LuxuryLingerie #LaceLingerie #BoudoirFashion #IntimateApparel #LingerieAddict #SelfLove #ConfidenceIsSexy`
  },
  {
    id: 'silk_satin',
    name: 'Silk and Satin',
    collection: 'LIQUID LUXURY',
    caption: `Some fabrics do not just drape - they cascade.

Silk and satin move like liquid, catching light and shadow in ways no other material can. This series celebrates textiles that feel as good as they look.

Close your eyes. Imagine the touch.

Which texture calls to you? Comment below.

#VERALABS #SilkAndSatin #LiquidLuxury #SatinNoir #MidnightSilk #LuxuryFabrics #TextureArt #SensualFabrics #IntimatePhotography #FabricArt`
  }
];

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function log(msg) {
  const time = new Date().toLocaleTimeString();
  console.log(`[${time}] ${msg}`);
}

async function uploadToGitHub(imagePath, filename) {
  const buffer = fs.readFileSync(imagePath);
  const base64 = buffer.toString('base64');

  const response = await fetch(`${PROXY_URL}/api/instagram/upload-to-github`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      githubToken: GITHUB_TOKEN,
      imageData: base64,
      filename: `masterclass_${filename}_${Date.now()}.jpg`,
      owner: 'aemons9',
      repo: 'studiov1',
      pathPrefix: 'photo/masterclass-carousels'
    })
  });

  if (!response.ok) {
    throw new Error(`GitHub upload failed: ${await response.text()}`);
  }

  const data = await response.json();
  return data.publicUrl || data.url;
}

async function waitForContainer(containerId, maxAttempts = 40) {
  for (let i = 0; i < maxAttempts; i++) {
    await sleep(3000);

    const url = `${GRAPH_API}/${containerId}?fields=status,status_code&access_token=${INSTAGRAM_TOKEN}`;
    const response = await fetch(url);
    const data = await response.json();

    const status = (data.status || '').toUpperCase();

    if (status === 'FINISHED' || status.includes('FINISHED')) {
      return true;
    }

    if (status === 'ERROR' || status.includes('ERROR')) {
      throw new Error(`Container error: ${data.status_code || status}`);
    }

    process.stdout.write('.');
  }

  throw new Error('Timeout waiting for container');
}

async function publishCarousel(imageUrls, caption) {
  log(`   Creating ${imageUrls.length} child containers...`);

  const childIds = [];

  for (let i = 0; i < imageUrls.length; i++) {
    const params = new URLSearchParams({
      image_url: imageUrls[i],
      is_carousel_item: 'true',
      access_token: INSTAGRAM_TOKEN
    });

    const response = await fetch(`${GRAPH_API}/${IG_ACCOUNT_ID}/media`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString()
    });

    const data = await response.json();

    if (!response.ok) {
      log(`   ❌ Child ${i + 1} failed: ${data.error?.message}`);
      continue;
    }

    childIds.push(data.id);
    log(`   ✅ Child ${i + 1}: ${data.id}`);
    await sleep(1000);
  }

  if (childIds.length < 2) {
    throw new Error('Need at least 2 carousel items');
  }

  // Wait for all children to process
  log('   ⏳ Processing images');
  for (const childId of childIds) {
    await waitForContainer(childId);
  }
  console.log(' Done');

  // Create carousel container
  log('   📦 Creating carousel container...');
  const carouselParams = new URLSearchParams({
    media_type: 'CAROUSEL',
    children: childIds.join(','),
    caption: caption,
    access_token: INSTAGRAM_TOKEN
  });

  const carouselResponse = await fetch(`${GRAPH_API}/${IG_ACCOUNT_ID}/media`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: carouselParams.toString()
  });

  const carouselData = await carouselResponse.json();

  if (!carouselResponse.ok) {
    throw new Error(carouselData.error?.message || 'Carousel creation failed');
  }

  const containerId = carouselData.id;
  log(`   📦 Container ID: ${containerId}`);

  // Wait for carousel to process
  process.stdout.write('   ⏳ Processing carousel');
  await waitForContainer(containerId);
  console.log(' Done');

  // Publish
  log('   🚀 Publishing...');
  const publishParams = new URLSearchParams({
    creation_id: containerId,
    access_token: INSTAGRAM_TOKEN
  });

  const publishResponse = await fetch(`${GRAPH_API}/${IG_ACCOUNT_ID}/media_publish`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: publishParams.toString()
  });

  const publishData = await publishResponse.json();

  if (!publishResponse.ok) {
    throw new Error(publishData.error?.message || 'Publish failed');
  }

  return publishData.id;
}

async function publishStory(imageUrl) {
  const params = new URLSearchParams({
    image_url: imageUrl,
    media_type: 'STORIES',
    access_token: INSTAGRAM_TOKEN
  });

  const response = await fetch(`${GRAPH_API}/${IG_ACCOUNT_ID}/media`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString()
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error?.message || 'Story container failed');
  }

  await waitForContainer(data.id);

  const publishParams = new URLSearchParams({
    creation_id: data.id,
    access_token: INSTAGRAM_TOKEN
  });

  const publishResponse = await fetch(`${GRAPH_API}/${IG_ACCOUNT_ID}/media_publish`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: publishParams.toString()
  });

  const publishData = await publishResponse.json();
  return publishData.id;
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
║          📸 MASTERCLASS CAROUSEL INSTAGRAM PUBLISHER 📸                  ║
║                                                                          ║
║     Publishing 7 Carousels • 24 Branded Slides • Stories                 ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
  `);

  if (!INSTAGRAM_TOKEN) {
    console.error('❌ Missing INSTAGRAM_TOKEN');
    process.exit(1);
  }

  const args = process.argv.slice(2);
  const specificCarousel = args[0];
  const publishStories = args.includes('--stories');

  const carouselsToPublish = specificCarousel
    ? CAROUSELS.filter(c => c.id === specificCarousel)
    : CAROUSELS;

  if (carouselsToPublish.length === 0) {
    console.error(`❌ Carousel not found: ${specificCarousel}`);
    console.log('Available carousels:', CAROUSELS.map(c => c.id).join(', '));
    process.exit(1);
  }

  const results = [];

  for (const carousel of carouselsToPublish) {
    console.log(`\n${'═'.repeat(70)}`);
    log(`📸 PUBLISHING: ${carousel.name}`);
    console.log(`${'═'.repeat(70)}`);
    log(`   Collection: ${carousel.collection}`);

    const carouselDir = path.join(CAROUSELS_DIR, carousel.id);

    if (!fs.existsSync(carouselDir)) {
      log(`   ❌ Directory not found: ${carouselDir}`);
      continue;
    }

    // Get all slide images
    const slides = fs.readdirSync(carouselDir)
      .filter(f => f.startsWith('slide_') && f.endsWith('.jpg'))
      .sort();

    log(`   📷 Found ${slides.length} slides`);

    // Upload to GitHub CDN
    log('   📤 Uploading to GitHub CDN...');
    const imageUrls = [];

    for (const slide of slides) {
      const slidePath = path.join(carouselDir, slide);
      try {
        const url = await uploadToGitHub(slidePath, `${carousel.id}_${slide}`);
        imageUrls.push(url);
        log(`      ✅ ${slide}`);
        await sleep(1500);
      } catch (err) {
        log(`      ❌ ${slide}: ${err.message}`);
      }
    }

    if (imageUrls.length < 2) {
      log('   ❌ Not enough images uploaded');
      continue;
    }

    // Wait for CDN propagation
    log('   ⏳ Waiting for CDN propagation (5s)...');
    await sleep(5000);

    // Publish carousel
    try {
      const mediaId = await publishCarousel(imageUrls, carousel.caption);
      log(`   ✅ PUBLISHED! Media ID: ${mediaId}`);
      results.push({ carousel: carousel.name, mediaId, status: 'success' });

      // Publish first slide as story
      if (publishStories) {
        log('   📱 Publishing story...');
        try {
          const storyId = await publishStory(imageUrls[0]);
          log(`   ✅ Story published: ${storyId}`);
        } catch (err) {
          log(`   ⚠️ Story failed: ${err.message}`);
        }
      }

    } catch (err) {
      log(`   ❌ Failed: ${err.message}`);
      results.push({ carousel: carousel.name, error: err.message, status: 'failed' });
    }

    // Wait between carousels to avoid rate limits
    if (carouselsToPublish.indexOf(carousel) < carouselsToPublish.length - 1) {
      log('   ⏳ Waiting 30s before next carousel...');
      await sleep(30000);
    }
  }

  // Summary
  console.log(`\n${'═'.repeat(70)}`);
  console.log('                    PUBLISHING COMPLETE');
  console.log(`${'═'.repeat(70)}`);

  for (const r of results) {
    if (r.status === 'success') {
      console.log(`  ✅ ${r.carousel}: ${r.mediaId}`);
    } else {
      console.log(`  ❌ ${r.carousel}: ${r.error}`);
    }
  }

  console.log(`${'═'.repeat(70)}\n`);
}

main().catch(err => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});
