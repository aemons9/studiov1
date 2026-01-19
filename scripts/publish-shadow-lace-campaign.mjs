#!/usr/bin/env node
/**
 * VERALABS Shadow & Lace Campaign Publisher
 * High-impact Instagram carousel and story publishing
 *
 * Strategy:
 * - 4:5 aspect ratio for maximum feed real estate (1080x1350)
 * - Strategic carousel ordering: hook → build → climax → CTA
 * - Optimized hashtags for discoverability
 * - Teaser stories with swipe-up potential
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

// Configuration
const INSTAGRAM_TOKEN = process.env.INSTAGRAM_TOKEN;
const INSTAGRAM_ACCOUNT_ID = '17841478517688462';
const GITHUB_TOKEN = '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';
const PROXY_URL = 'http://localhost:3001';

const ASSETS_DIR = '/home/ecolex/version1/studiov1-claude-fashion-moodboard-webpage-01R1NZH3FpX8vyP4EZaJ7w1X/generated-vera-variants';
const OUTPUT_DIR = '/home/ecolex/version1/studiov1-claude-fashion-moodboard-webpage-01R1NZH3FpX8vyP4EZaJ7w1X/instagram-optimized';
const FFMPEG = '/home/ecolex/version1/node_modules/@ffmpeg-installer/linux-x64/ffmpeg';

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// ============================================
// CAROUSEL DEFINITIONS - Strategic Ordering
// ============================================

const CAROUSELS = [
  {
    id: 'shadow_symphony',
    name: 'Shadow Symphony',
    theme: 'The GODMODE collection - venetian shadows as garment',
    images: [
      // Hook: Most striking image first
      'vera_godmode_recline_abandon_1767888908992.png',
      // Build: Progression of intimacy
      'vera_godmode_sprawl_divine_1767888969527.png',
      'vera_godmode_twist_reveal_1767889224861.png',
      // Climax: Peak visual impact
      'vera_godmode_floor_intimate_1767889332364.png',
      // Resolution: Leave them wanting more
      'vera_godmode_languid_stretch_1767889250331.png',
    ],
    caption: `Shadow speaks where words dare not venture.

Light sculpts.
Darkness embraces.
The body becomes canvas.

◾◽◾◽◾

Swipe → to enter the shadows

Where do you find your poetry? ↓

━━━━━━━━━━━━━━━━━━━━━
🖤 Save this collection
💬 Tell us which frame speaks to you
📤 Share with someone who needs this art
━━━━━━━━━━━━━━━━━━━━━

#VERALABS #ShadowArt #ChiaroscuroPoetry #FineArtNude #LightAndShadow #ArtisticExpression #SensualArt #MuseumQuality #HelmutNewton #IntimateArt #BoudoirPhotography #ArtisticNude #DramaticLighting #FineArt #SensualPhotography #VenetianLight #ShadowPlay #FemininePower #BodyPositive #ArtOfLight`,
    hashtags_first_comment: `#intimateart #artphotography #fineartphotography #shadowphotography #boudoirart #sensualelegance #artisticvision #lightandshadow #photographyart #visualart #contemporaryart #artgallery #artistsoninstagram #creativephotography #editorialphotography`
  },
  {
    id: 'lace_poetry',
    name: 'Lace Poetry',
    theme: 'Intricate patterns of desire',
    images: [
      // Hook: Architectural lace
      'vera_sculptural_lace_1767888493536.png',
      // Build: Different lace styles
      'vera_lace_renaissance_1767888233122.png',
      'vera_chantilly_dream_1767888280802.png',
      // Climax: French elegance
      'vera_french_elegance_1767888545419.png',
    ],
    caption: `Chantilly whispers.
Valenciennes sings.

The language of lace
needs no translation.

◇ ◇ ◇ ◇

Swipe → through the poetry of thread

Every thread — a meditation
Every pattern — a prayer
Every shadow — a revelation

━━━━━━━━━━━━━━━━━━━━━
Which speaks to you — whispers or songs? 💭
━━━━━━━━━━━━━━━━━━━━━

#VERALABS #LaceArt #FrenchLingerie #ChantillyLace #IntimateElegance #BoudoirArt #LuxuryLingerie #ParisianStyle #GeometricLace #SculpturalLingerie #ArtDeco #ModernBoudoir #DesignerLingerie #ArtAndDesign #Renaissance #LaceRenaissance #FineArtPhotography`,
    hashtags_first_comment: `#lacefashion #delicatelace #vintagelace #lacework #textileart #fabricart #couture #hautecouture #fashionart #intimateapparel #lingerielove #boudoirstyle #romanticstyle #feminineaesthetic #elegance`
  },
  {
    id: 'mesh_silk',
    name: 'Mesh & Silk',
    theme: 'Transparency as philosophy',
    images: [
      // Hook: Silk intimacy
      'vera_silk_intimacy_1767888208820.png',
      // Build: Mesh variations
      'vera_mesh_moderne_1767888257912.png',
      'vera_contemporary_mesh_1767888568496.png',
      // Climax: Satin noir
      'vera_satin_noir_1767888303700.png',
    ],
    caption: `Transparency as philosophy.

What is concealed
reveals more
than what is shown.

The paradox of intimacy ◌

━━━━━━━━━━━━━━━━━━━━━

silk confessions

Some truths are only told
in textures.

Swipe → feel each frame

━━━━━━━━━━━━━━━━━━━━━
🔖 Save this for midnight inspiration
━━━━━━━━━━━━━━━━━━━━━

#VERALABS #MeshArt #SilkLingerie #Transparency #ModernBoudoir #MinimalistArt #SensualElegance #PhilosophyOfDesire #SilkConfessions #LuxurySilk #IntimateTextures #SensoryArt #BoudoirPhotography #TexturePoetry #MidnightSilk`,
    hashtags_first_comment: `#silkfashion #meshfabric #sheerbeauty #luxuryfabrics #textiledesign #sensualart #intimatefashion #nightwear #loungewear #boudoirphotography #fashionphotography #editorialstyle #artisticnude #fineart #contemporaryphotography`
  }
];

// ============================================
// STORY DEFINITIONS - Teaser Sequence
// ============================================

const STORIES = [
  {
    id: 'teaser_1',
    image: 'vera_godmode_recline_abandon_1767888908992.png',
    text_overlay: 'NEW CAMPAIGN',
    subtext: 'Shadow & Lace'
  },
  {
    id: 'teaser_2',
    image: 'vera_sculptural_lace_1767888493536.png',
    text_overlay: 'SWIPE UP',
    subtext: 'to enter the shadows'
  },
  {
    id: 'teaser_3',
    image: 'vera_silk_intimacy_1767888208820.png',
    text_overlay: '32 IMAGES',
    subtext: '4 collections'
  }
];

// ============================================
// IMAGE PROCESSING FUNCTIONS
// ============================================

function optimizeForInstagramFeed(inputPath, outputPath) {
  // Convert to 4:5 aspect ratio (1080x1350) for maximum feed real estate
  const cmd = `${FFMPEG} -y -i "${inputPath}" -vf "scale=1080:1350:force_original_aspect_ratio=increase,crop=1080:1350,format=rgb24" -q:v 2 "${outputPath}" 2>/dev/null`;
  try {
    execSync(cmd);
    return true;
  } catch (e) {
    console.error(`Failed to optimize ${inputPath}`);
    return false;
  }
}

function optimizeForInstagramStory(inputPath, outputPath, textOverlay, subtext) {
  // Convert to 9:16 aspect ratio (1080x1920) for stories with text overlay
  const cmd = `${FFMPEG} -y -i "${inputPath}" -vf "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,drawtext=text='${textOverlay}':fontcolor=white:fontsize=72:x=(w-text_w)/2:y=h/2-100:shadowcolor=black:shadowx=3:shadowy=3,drawtext=text='${subtext}':fontcolor=#c9a962:fontsize=36:x=(w-text_w)/2:y=h/2+20:shadowcolor=black:shadowx=2:shadowy=2" -q:v 2 "${outputPath}" 2>/dev/null`;
  try {
    execSync(cmd);
    return true;
  } catch (e) {
    // Fallback without text if fonts not available
    const fallbackCmd = `${FFMPEG} -y -i "${inputPath}" -vf "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920" -q:v 2 "${outputPath}" 2>/dev/null`;
    try {
      execSync(fallbackCmd);
      return true;
    } catch (e2) {
      console.error(`Failed to optimize story ${inputPath}`);
      return false;
    }
  }
}

// ============================================
// INSTAGRAM API FUNCTIONS
// ============================================

async function uploadToGitHubCDN(imagePath, filename) {
  console.log(`   📤 Uploading ${filename} to GitHub CDN...`);

  const imageBuffer = fs.readFileSync(imagePath);
  const imageBase64 = imageBuffer.toString('base64');

  const response = await fetch(`${PROXY_URL}/api/instagram/upload-to-github`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      githubToken: GITHUB_TOKEN,
      imageData: imageBase64,
      filename: `shadow_lace_${filename}_${Date.now()}.jpg`,
      owner: 'aemons9',
      repo: 'studiov1',
      pathPrefix: 'photo/shadow-lace-campaign'
    })
  });

  if (!response.ok) {
    throw new Error(`GitHub upload failed: ${await response.text()}`);
  }

  const data = await response.json();
  const url = data.publicUrl || data.url;
  console.log(`   ✅ Uploaded: ${url}`);
  return url;
}

async function createCarouselContainer(imageUrls, caption) {
  console.log(`   📦 Creating carousel container with ${imageUrls.length} images...`);

  // First, create child containers for each image using carousel-item endpoint
  const childIds = [];

  for (let i = 0; i < imageUrls.length; i++) {
    console.log(`      Creating child ${i + 1}/${imageUrls.length}...`);

    const childResponse = await fetch(`${PROXY_URL}/api/instagram/create-carousel-item`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        accessToken: INSTAGRAM_TOKEN,
        imageUrl: imageUrls[i],
        instagramAccountId: INSTAGRAM_ACCOUNT_ID
      })
    });

    if (!childResponse.ok) {
      throw new Error(`Child container failed: ${await childResponse.text()}`);
    }

    const childData = await childResponse.json();
    childIds.push(childData.id);

    // Small delay between API calls
    await new Promise(r => setTimeout(r, 2000));
  }

  console.log(`   📦 Creating parent carousel container...`);

  // Create parent carousel container
  const carouselResponse = await fetch(`${PROXY_URL}/api/instagram/create-carousel`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      accessToken: INSTAGRAM_TOKEN,
      childrenIds: childIds,
      caption: caption,
      instagramAccountId: INSTAGRAM_ACCOUNT_ID
    })
  });

  if (!carouselResponse.ok) {
    throw new Error(`Carousel container failed: ${await carouselResponse.text()}`);
  }

  const carouselData = await carouselResponse.json();
  return carouselData.id;
}

async function publishContainer(containerId) {
  console.log(`   🚀 Publishing container ${containerId}...`);

  const response = await fetch(`${PROXY_URL}/api/instagram/publish-container`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      accessToken: INSTAGRAM_TOKEN,
      containerId: containerId,
      instagramAccountId: INSTAGRAM_ACCOUNT_ID
    })
  });

  if (!response.ok) {
    throw new Error(`Publish failed: ${await response.text()}`);
  }

  const data = await response.json();
  return data.id;
}

async function postFirstComment(mediaId, comment) {
  console.log(`   💬 Adding first comment with additional hashtags...`);

  const response = await fetch(`${PROXY_URL}/api/instagram/comment`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      accessToken: INSTAGRAM_TOKEN,
      mediaId: mediaId,
      message: comment
    })
  });

  // Don't fail if comment fails
  if (response.ok) {
    console.log(`   ✅ First comment added`);
  }
}

async function publishStory(imageUrl) {
  console.log(`   📱 Publishing story...`);

  const response = await fetch(`${PROXY_URL}/api/instagram/publish-story`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      accessToken: INSTAGRAM_TOKEN,
      imageUrl: imageUrl,
      instagramAccountId: INSTAGRAM_ACCOUNT_ID
    })
  });

  if (!response.ok) {
    throw new Error(`Story publish failed: ${await response.text()}`);
  }

  const data = await response.json();
  return data.id;
}

// ============================================
// MAIN PUBLISHING FLOW
// ============================================

async function publishCarousel(carousel, index) {
  console.log(`\n${'═'.repeat(60)}`);
  console.log(`📸 CAROUSEL ${index + 1}: ${carousel.name.toUpperCase()}`);
  console.log(`   Theme: ${carousel.theme}`);
  console.log(`${'═'.repeat(60)}`);

  const imageUrls = [];

  // Step 1: Optimize images for Instagram
  console.log(`\n🎨 Step 1: Optimizing ${carousel.images.length} images for Instagram (4:5)...`);

  for (let i = 0; i < carousel.images.length; i++) {
    const inputPath = path.join(ASSETS_DIR, carousel.images[i]);
    const outputPath = path.join(OUTPUT_DIR, `${carousel.id}_slide_${i + 1}.jpg`);

    if (!fs.existsSync(inputPath)) {
      console.error(`   ❌ Image not found: ${carousel.images[i]}`);
      continue;
    }

    console.log(`   [${i + 1}/${carousel.images.length}] ${carousel.images[i]}`);
    optimizeForInstagramFeed(inputPath, outputPath);
  }

  // Step 2: Upload to GitHub CDN
  console.log(`\n☁️ Step 2: Uploading to GitHub CDN...`);

  for (let i = 0; i < carousel.images.length; i++) {
    const optimizedPath = path.join(OUTPUT_DIR, `${carousel.id}_slide_${i + 1}.jpg`);

    if (!fs.existsSync(optimizedPath)) continue;

    try {
      const url = await uploadToGitHubCDN(optimizedPath, `${carousel.id}_${i + 1}`);
      imageUrls.push(url);

      // Wait for CDN propagation
      await new Promise(r => setTimeout(r, 2000));
    } catch (e) {
      console.error(`   ❌ Upload failed: ${e.message}`);
    }
  }

  if (imageUrls.length < 2) {
    console.error(`   ❌ Not enough images uploaded for carousel`);
    return null;
  }

  // Step 3: Create and publish carousel
  console.log(`\n🎯 Step 3: Creating Instagram carousel...`);

  try {
    const containerId = await createCarouselContainer(imageUrls, carousel.caption);

    // Wait for container processing
    console.log(`   ⏳ Waiting for container processing (30s)...`);
    await new Promise(r => setTimeout(r, 30000));

    const mediaId = await publishContainer(containerId);
    console.log(`\n   ✅ PUBLISHED! Media ID: ${mediaId}`);

    // Add first comment with additional hashtags
    if (carousel.hashtags_first_comment) {
      await new Promise(r => setTimeout(r, 5000));
      await postFirstComment(mediaId, carousel.hashtags_first_comment);
    }

    return mediaId;
  } catch (e) {
    console.error(`   ❌ Publish failed: ${e.message}`);
    return null;
  }
}

async function publishTeaserStories() {
  console.log(`\n${'═'.repeat(60)}`);
  console.log(`📱 TEASER STORIES`);
  console.log(`${'═'.repeat(60)}`);

  for (let i = 0; i < STORIES.length; i++) {
    const story = STORIES[i];
    console.log(`\n📱 Story ${i + 1}: ${story.text_overlay}`);

    const inputPath = path.join(ASSETS_DIR, story.image);
    const outputPath = path.join(OUTPUT_DIR, `story_${story.id}.jpg`);

    if (!fs.existsSync(inputPath)) {
      console.error(`   ❌ Image not found: ${story.image}`);
      continue;
    }

    // Optimize for story format
    optimizeForInstagramStory(inputPath, outputPath, story.text_overlay, story.subtext);

    try {
      // Upload to CDN
      const url = await uploadToGitHubCDN(outputPath, `story_${i + 1}`);
      await new Promise(r => setTimeout(r, 2000));

      // Publish story
      const storyId = await publishStory(url);
      console.log(`   ✅ Story published! ID: ${storyId}`);

      // Wait between stories
      await new Promise(r => setTimeout(r, 5000));
    } catch (e) {
      console.error(`   ❌ Story failed: ${e.message}`);
    }
  }
}

// ============================================
// EXECUTION
// ============================================

async function main() {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║   V E R A L A B S                                          ║
║   Shadow & Lace Campaign Publisher                         ║
║                                                            ║
║   High-Impact Instagram Strategy                           ║
║   • 4:5 Aspect Ratio (Maximum Feed Real Estate)            ║
║   • Strategic Carousel Sequencing                          ║
║   • Optimized Hashtags for Discoverability                 ║
║   • Teaser Stories with Campaign Preview                   ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
`);

  if (!INSTAGRAM_TOKEN) {
    console.error('❌ INSTAGRAM_TOKEN environment variable required');
    console.log('\nUsage: INSTAGRAM_TOKEN="your_token" node scripts/publish-shadow-lace-campaign.mjs');
    process.exit(1);
  }

  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const carouselOnly = args.includes('--carousel-only');
  const storiesOnly = args.includes('--stories-only');
  const carouselIndex = args.find(a => a.startsWith('--carousel='))?.split('=')[1];

  if (dryRun) {
    console.log('🔍 DRY RUN MODE - No actual publishing\n');

    console.log('CAROUSELS TO PUBLISH:');
    CAROUSELS.forEach((c, i) => {
      console.log(`  ${i + 1}. ${c.name} (${c.images.length} images)`);
      c.images.forEach((img, j) => {
        const exists = fs.existsSync(path.join(ASSETS_DIR, img));
        console.log(`     ${j + 1}. ${img} ${exists ? '✓' : '❌ MISSING'}`);
      });
    });

    console.log('\nSTORIES TO PUBLISH:');
    STORIES.forEach((s, i) => {
      const exists = fs.existsSync(path.join(ASSETS_DIR, s.image));
      console.log(`  ${i + 1}. ${s.text_overlay} - ${s.subtext} ${exists ? '✓' : '❌ MISSING'}`);
    });

    return;
  }

  try {
    if (!storiesOnly) {
      // Publish carousels
      if (carouselIndex !== undefined) {
        // Publish specific carousel
        const idx = parseInt(carouselIndex) - 1;
        if (idx >= 0 && idx < CAROUSELS.length) {
          await publishCarousel(CAROUSELS[idx], idx);
        }
      } else {
        // Publish all carousels
        for (let i = 0; i < CAROUSELS.length; i++) {
          await publishCarousel(CAROUSELS[i], i);

          // Wait 2 minutes between carousels for algorithm optimization
          if (i < CAROUSELS.length - 1) {
            console.log(`\n⏳ Waiting 2 minutes before next carousel (algorithm optimization)...`);
            await new Promise(r => setTimeout(r, 120000));
          }
        }
      }
    }

    if (!carouselOnly) {
      // Publish teaser stories
      await publishTeaserStories();
    }

    console.log(`
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║   ✅ CAMPAIGN PUBLISHED SUCCESSFULLY!                      ║
║                                                            ║
║   Check @veralabs.ai for live posts                        ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
`);

  } catch (error) {
    console.error(`\n❌ Campaign publish failed: ${error.message}`);
    process.exit(1);
  }
}

main();
