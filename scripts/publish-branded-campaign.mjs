#!/usr/bin/env node
/**
 * VERALABS Branded Campaign Publisher
 *
 * Publishes branded images to Instagram:
 * - Upload to GitHub CDN
 * - Create carousel posts
 * - Publish teaser stories
 */

import fs from 'fs';
import path from 'path';

const BRANDED_DIR = '/home/ecolex/version1/instagram-branded';
const PROXY_URL = 'http://localhost:3001';

// From environment
const INSTAGRAM_TOKEN = process.env.INSTAGRAM_TOKEN;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || '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';
const INSTAGRAM_ACCOUNT_ID = '17841478517688462';

// Carousel configurations
const CAROUSELS = [
  {
    id: 'shadow_symphony',
    name: 'Shadow Symphony',
    images: ['shadow_symphony_1.jpg', 'shadow_symphony_2.jpg', 'shadow_symphony_3.jpg', 'shadow_symphony_4.jpg', 'shadow_symphony_5.jpg'],
    caption: `Shadow speaks where words dare not venture.

Light sculpts. Darkness embraces. The body becomes canvas.

In this collection, venetian blinds become the artist — painting stripes of gold across skin, creating visual poetry through natural chiaroscuro.

Where do you find your poetry?

#VERALABS #ShadowSymphony #ChiaroscuroArt #LightAndShadow #FineArtBoudoir #VenetianLight #ArtisticPhotography #IntimateArt #EditorialPhotography`,
    firstComment: `More from the Shadow Symphony collection on our profile.

#BoudoirArt #ShadowPlay #GoldenHour #BodyAsCanvas #ArtisticNude #FineArtNude #LightPainting #SensualArt #PhotographyArt #VisualPoetry`,
  },
  {
    id: 'lace_poetry',
    name: 'Lace Poetry',
    images: ['lace_poetry_1.jpg', 'lace_poetry_2.jpg', 'lace_poetry_3.jpg', 'lace_poetry_4.jpg'],
    caption: `Geometry meets desire.

Architecture for the body. Poetry for the soul. Mathematics of attraction.

Each piece tells a story of craftsmanship meeting skin — where French lace becomes a second language of elegance.

Tag someone who appreciates the art of structure.

#VERALABS #LacePoetry #GeometricLace #SculpturalLingerie #FrenchLace #ChantillyLace #IntimateDesign #LuxuryLingerie #EditorialFashion`,
    firstComment: `The Lace Poetry collection celebrates the intersection of textile artistry and intimate expression.

#BoudoirPhotography #LaceDetails #DelicateLace #FashionArt #TextileArt #IntimateApparel #LuxuryIntimate #ArtisticLingerie`,
  },
  {
    id: 'mesh_silk',
    name: 'Mesh and Silk',
    images: ['mesh_silk_1.jpg', 'mesh_silk_2.jpg', 'mesh_silk_3.jpg', 'mesh_silk_4.jpg'],
    caption: `Silk confessions.

Some truths are only told in textures.

The interplay of sheer mesh and liquid silk — transparency meeting opacity, modern meeting timeless.

Feel this. Save this. Share this.

#VERALABS #MeshAndSilk #SilkConfessions #ModernLingerie #SheerElegance #SatinNoir #ContemporaryIntimate #LuxuryTextures #EditorialStyle`,
    firstComment: `Contemporary intimacy through the lens of texture and transparency.

#MeshDetails #SilkTexture #LuxurySilk #IntimateWear #FashionTextures #SheerFashion #SatinLingerie #ModernBoudoir`,
  },
];

// Story configurations
const STORIES = [
  { file: 'story_story_shadow.jpg', name: 'Shadow Story' },
  { file: 'story_story_lace.jpg', name: 'Lace Story' },
  { file: 'story_story_silk.jpg', name: 'Silk Story' },
];

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
      filename: `branded_${timestamp}_${filename}`,
      owner: 'aemons9',
      repo: 'studiov1',
      pathPrefix: 'photo/branded-campaign',
    }),
  });

  if (!response.ok) {
    throw new Error(`GitHub upload failed: ${await response.text()}`);
  }

  const data = await response.json();
  return data.publicUrl || data.url;
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

  if (!response.ok) {
    throw new Error(`Create carousel item failed: ${await response.text()}`);
  }

  const data = await response.json();
  return data.id;
}

async function createCarousel(childrenIds, caption) {
  const response = await fetch(`${PROXY_URL}/api/instagram/create-carousel`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      accessToken: INSTAGRAM_TOKEN,
      childrenIds,
      caption,
      instagramAccountId: INSTAGRAM_ACCOUNT_ID,
    }),
  });

  if (!response.ok) {
    throw new Error(`Create carousel failed: ${await response.text()}`);
  }

  const data = await response.json();
  return data.id;
}

async function publishContainer(containerId) {
  const response = await fetch(`${PROXY_URL}/api/instagram/publish-container`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      accessToken: INSTAGRAM_TOKEN,
      containerId: containerId,
      instagramAccountId: INSTAGRAM_ACCOUNT_ID,
    }),
  });

  if (!response.ok) {
    throw new Error(`Publish failed: ${await response.text()}`);
  }

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

  if (!response.ok) {
    throw new Error(`Story publish failed: ${await response.text()}`);
  }

  return await response.json();
}

async function addComment(mediaId, text) {
  const response = await fetch(`${PROXY_URL}/api/instagram/comment`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      accessToken: INSTAGRAM_TOKEN,
      mediaId,
      text,
    }),
  });

  return response.ok;
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function publishCarousel(carousel) {
  console.log(`\n${'═'.repeat(60)}`);
  console.log(`📸 ${carousel.name.toUpperCase()}`);
  console.log(`${'═'.repeat(60)}\n`);

  // Step 1: Upload images to GitHub CDN
  console.log('☁️  Uploading to GitHub CDN...');
  const imageUrls = [];
  for (let i = 0; i < carousel.images.length; i++) {
    const imagePath = path.join(BRANDED_DIR, carousel.images[i]);
    console.log(`   📤 [${i + 1}/${carousel.images.length}] ${carousel.images[i]}`);
    const url = await uploadToGitHub(imagePath, carousel.images[i]);
    imageUrls.push(url);
    console.log(`   ✅ ${url.substring(0, 70)}...`);
  }

  // Wait for CDN propagation
  console.log('\n⏳ Waiting for CDN propagation (5s)...');
  await sleep(5000);

  // Step 2: Create carousel children
  console.log('\n🎯 Creating carousel items...');
  const childrenIds = [];
  for (let i = 0; i < imageUrls.length; i++) {
    console.log(`   📦 Creating child ${i + 1}/${imageUrls.length}...`);
    const childId = await createCarouselItem(imageUrls[i]);
    childrenIds.push(childId);
    console.log(`   ✅ Child ID: ${childId}`);
  }

  // Step 3: Create parent carousel
  console.log('\n📦 Creating carousel container...');
  const containerId = await createCarousel(childrenIds, carousel.caption);
  console.log(`   ✅ Container ID: ${containerId}`);

  // Wait for processing
  console.log('\n⏳ Waiting for container processing (30s)...');
  await sleep(30000);

  // Step 4: Publish
  console.log('\n🚀 Publishing to Instagram...');
  const result = await publishContainer(containerId);
  console.log(`   ✅ PUBLISHED! Media ID: ${result.id}`);

  // Step 5: Add first comment with additional hashtags
  if (carousel.firstComment && result.id) {
    console.log('\n💬 Adding first comment...');
    await addComment(result.id, carousel.firstComment);
    console.log('   ✅ Comment added');
  }

  return result;
}

async function publishStoryPost(story) {
  console.log(`   📱 ${story.name}`);

  const imagePath = path.join(BRANDED_DIR, story.file);
  console.log(`      📤 Uploading to CDN...`);
  const imageUrl = await uploadToGitHub(imagePath, story.file);
  console.log(`      ✅ Uploaded`);

  console.log(`      📱 Publishing story...`);
  const result = await publishStory(imageUrl);
  console.log(`      ✅ Story ID: ${result.id}`);

  return result;
}

async function main() {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║   V E R A L A B S                                          ║
║   Branded Campaign Publisher                               ║
║                                                            ║
║   Publishing to Instagram:                                 ║
║   • 3 Branded Carousels (13 images total)                  ║
║   • 3 Teaser Stories                                       ║
║   • First comment hashtag strategy                         ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
`);

  if (!INSTAGRAM_TOKEN) {
    console.error('❌ INSTAGRAM_TOKEN environment variable required');
    process.exit(1);
  }

  // Check for dry run
  const isDryRun = process.argv.includes('--dry');
  if (isDryRun) {
    console.log('🔍 DRY RUN MODE - No actual publishing\n');
    console.log('Carousels to publish:');
    CAROUSELS.forEach((c, i) => {
      console.log(`  ${i + 1}. ${c.name} (${c.images.length} images)`);
    });
    console.log('\nStories to publish:');
    STORIES.forEach((s, i) => {
      console.log(`  ${i + 1}. ${s.name}`);
    });
    console.log('\nRun without --dry to publish.');
    return;
  }

  // Check specific carousel
  const carouselArg = process.argv.find(arg => arg.startsWith('--carousel='));
  const carouselIndex = carouselArg ? parseInt(carouselArg.split('=')[1]) - 1 : null;

  // Publish carousels
  if (carouselIndex !== null) {
    if (carouselIndex >= 0 && carouselIndex < CAROUSELS.length) {
      await publishCarousel(CAROUSELS[carouselIndex]);
    } else {
      console.error(`Invalid carousel number. Use 1-${CAROUSELS.length}`);
    }
  } else {
    // Publish all carousels with delay between each
    for (let i = 0; i < CAROUSELS.length; i++) {
      await publishCarousel(CAROUSELS[i]);

      if (i < CAROUSELS.length - 1) {
        console.log('\n⏳ Waiting 2 minutes before next carousel...');
        await sleep(120000);
      }
    }
  }

  // Publish stories
  if (carouselIndex === null) {
    console.log(`\n${'═'.repeat(60)}`);
    console.log('📱 TEASER STORIES');
    console.log(`${'═'.repeat(60)}\n`);

    for (const story of STORIES) {
      await publishStoryPost(story);
      await sleep(5000);
    }
  }

  console.log(`
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║   ✅ BRANDED CAMPAIGN PUBLISHED!                           ║
║                                                            ║
║   Check @veralabs.ai for live posts                        ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
`);
}

main().catch(console.error);
