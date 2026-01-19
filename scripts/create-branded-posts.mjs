#!/usr/bin/env node
/**
 * VERALABS Branded Instagram Post Creator
 *
 * Applies brand styling to images:
 * - Gold text overlays with poetic captions
 * - VERALABS brand mark
 * - Gradient overlays for legibility
 * - 4:5 aspect ratio optimization
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// VERALABS Brand Colors
const COLORS = {
  gold: '#c9a962',
  cream: '#f5f0e8',
  black: '#0a0a0a',
  charcoal: '#1a1a1a',
  rose: '#E8B4B8',
};

// Post configurations with text overlays
const BRANDED_POSTS = {
  // CAROUSEL 1: Shadow Symphony (GODMODE collection)
  shadow_symphony: {
    collection: 'SHADOW SYMPHONY',
    images: [
      {
        file: 'vera_godmode_recline_abandon_1767888908992.png',
        text: 'shadow',
        goldText: 'speaks',
        position: 'bottom-left',
      },
      {
        file: 'vera_godmode_sprawl_divine_1767888969527.png',
        text: 'divine',
        goldText: 'abandon',
        position: 'bottom-center',
      },
      {
        file: 'vera_godmode_twist_reveal_1767889224861.png',
        text: 'twist',
        goldText: 'reveal',
        position: 'bottom-right',
      },
      {
        file: 'vera_godmode_floor_intimate_1767889332364.png',
        text: 'feel the',
        goldText: 'light',
        position: 'bottom-left',
      },
      {
        file: 'vera_godmode_languid_stretch_1767889250331.png',
        text: 'languid',
        goldText: 'poetry',
        position: 'bottom-center',
      },
    ],
  },

  // CAROUSEL 2: Lace Poetry
  lace_poetry: {
    collection: 'LACE POETRY',
    images: [
      {
        file: 'vera_sculptural_lace_1767888493536.png',
        text: 'geometry of',
        goldText: 'desire',
        position: 'bottom-left',
      },
      {
        file: 'vera_lace_renaissance_1767888233122.png',
        text: 'renaissance',
        goldText: 'dreams',
        position: 'bottom-center',
      },
      {
        file: 'vera_chantilly_dream_1767888280802.png',
        text: 'chantilly',
        goldText: 'whispers',
        position: 'bottom-right',
      },
      {
        file: 'vera_french_elegance_1767888545419.png',
        text: 'french',
        goldText: 'elegance',
        position: 'bottom-left',
      },
    ],
  },

  // CAROUSEL 3: Mesh & Silk
  mesh_silk: {
    collection: 'MESH AND SILK',
    images: [
      {
        file: 'vera_silk_intimacy_1767888208820.png',
        text: 'silk',
        goldText: 'confessions',
        position: 'bottom-left',
      },
      {
        file: 'vera_mesh_moderne_1767888257912.png',
        text: 'mesh',
        goldText: 'moderne',
        position: 'bottom-center',
      },
      {
        file: 'vera_contemporary_mesh_1767888568496.png',
        text: 'contemporary',
        goldText: 'allure',
        position: 'bottom-right',
      },
      {
        file: 'vera_satin_noir_1767888303700.png',
        text: 'satin',
        goldText: 'noir',
        position: 'bottom-left',
      },
    ],
  },
};

// Story configurations
const BRANDED_STORIES = [
  {
    id: 'story_shadow',
    file: 'vera_godmode_recline_abandon_1767888908992.png',
    headline: 'NEW COLLECTION',
    subtext: 'SHADOW AND LACE',
    cta: 'SEE MORE',
  },
  {
    id: 'story_lace',
    file: 'vera_sculptural_lace_1767888493536.png',
    headline: 'SWIPE UP',
    subtext: 'LACE POETRY',
    cta: 'TAP TO EXPLORE',
  },
  {
    id: 'story_silk',
    file: 'vera_silk_intimacy_1767888208820.png',
    headline: '32 IMAGES',
    subtext: 'INTIMATE COLLECTION',
    cta: 'LINK IN BIO',
  },
];

const SOURCE_DIR = '/home/ecolex/version1/studiov1-claude-fashion-moodboard-webpage-01R1NZH3FpX8vyP4EZaJ7w1X/generated-vera-variants';
const OUTPUT_DIR = '/home/ecolex/version1/instagram-branded';

// Create SVG overlay for post (4:5 ratio - 1080x1350)
function createPostOverlay(config, collection) {
  const { text, goldText, position } = config;

  // Position calculations
  let textX, textY, textAnchor;
  switch (position) {
    case 'bottom-left':
      textX = 60;
      textY = 1250;
      textAnchor = 'start';
      break;
    case 'bottom-center':
      textX = 540;
      textY = 1250;
      textAnchor = 'middle';
      break;
    case 'bottom-right':
      textX = 1020;
      textY = 1250;
      textAnchor = 'end';
      break;
    default:
      textX = 60;
      textY = 1250;
      textAnchor = 'start';
  }

  return `
<svg width="1080" height="1350" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Bottom gradient for text legibility -->
    <linearGradient id="bottomFade" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:transparent;stop-opacity:0" />
      <stop offset="50%" style="stop-color:${COLORS.black};stop-opacity:0" />
      <stop offset="100%" style="stop-color:${COLORS.black};stop-opacity:0.85" />
    </linearGradient>

    <!-- Top subtle gradient -->
    <linearGradient id="topFade" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:${COLORS.black};stop-opacity:0.4" />
      <stop offset="30%" style="stop-color:transparent;stop-opacity:0" />
    </linearGradient>

    <!-- Gold gradient for accent -->
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:${COLORS.gold};stop-opacity:0.8" />
      <stop offset="50%" style="stop-color:${COLORS.gold};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${COLORS.gold};stop-opacity:0.8" />
    </linearGradient>
  </defs>

  <!-- Gradient overlays -->
  <rect width="1080" height="1350" fill="url(#bottomFade)" />
  <rect width="1080" height="400" fill="url(#topFade)" />

  <!-- Corner accents -->
  <path d="M40 40 L40 120 M40 40 L120 40" stroke="${COLORS.gold}" stroke-width="1" fill="none" opacity="0.5" />
  <path d="M1040 40 L1040 120 M1040 40 L960 40" stroke="${COLORS.gold}" stroke-width="1" fill="none" opacity="0.5" />

  <!-- Collection label at top -->
  <text x="540" y="80"
        font-family="Montserrat, Arial, sans-serif"
        font-size="14"
        font-weight="300"
        letter-spacing="8"
        fill="${COLORS.gold}"
        opacity="0.7"
        text-anchor="middle">
    ${collection}
  </text>

  <!-- Main text overlay -->
  <text x="${textX}" y="${textY}"
        font-family="Cormorant Garamond, Georgia, serif"
        font-size="72"
        font-style="italic"
        fill="${COLORS.cream}"
        text-anchor="${textAnchor}"
        text-shadow="0 4px 20px rgba(0,0,0,0.8)">
    ${text} <tspan fill="${COLORS.gold}">${goldText}</tspan>
  </text>

  <!-- Brand mark -->
  <text x="540" y="1320"
        font-family="Montserrat, Arial, sans-serif"
        font-size="12"
        font-weight="300"
        letter-spacing="6"
        fill="${COLORS.gold}"
        text-anchor="middle">
    VERALABS
  </text>

  <!-- Decorative line -->
  <line x1="490" y1="1295" x2="590" y2="1295" stroke="url(#goldGrad)" stroke-width="1" />
</svg>`;
}

// Create SVG overlay for story (9:16 ratio - 1080x1920)
function createStoryOverlay(config) {
  const { headline, subtext, cta } = config;

  return `
<svg width="1080" height="1920" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="storyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:${COLORS.black};stop-opacity:0.6" />
      <stop offset="20%" style="stop-color:transparent;stop-opacity:0" />
      <stop offset="70%" style="stop-color:transparent;stop-opacity:0" />
      <stop offset="100%" style="stop-color:${COLORS.black};stop-opacity:0.9" />
    </linearGradient>
  </defs>

  <!-- Full gradient overlay -->
  <rect width="1080" height="1920" fill="url(#storyGrad)" />

  <!-- Top brand mark -->
  <text x="540" y="120"
        font-family="Montserrat, Arial, sans-serif"
        font-size="14"
        font-weight="300"
        letter-spacing="10"
        fill="${COLORS.gold}"
        text-anchor="middle">
    VERALABS
  </text>

  <!-- Decorative frame corners -->
  <path d="M80 200 L80 320 M80 200 L200 200" stroke="${COLORS.gold}" stroke-width="1.5" fill="none" opacity="0.6" />
  <path d="M1000 200 L1000 320 M1000 200 L880 200" stroke="${COLORS.gold}" stroke-width="1.5" fill="none" opacity="0.6" />
  <path d="M80 1720 L80 1600 M80 1720 L200 1720" stroke="${COLORS.gold}" stroke-width="1.5" fill="none" opacity="0.6" />
  <path d="M1000 1720 L1000 1600 M1000 1720 L880 1720" stroke="${COLORS.gold}" stroke-width="1.5" fill="none" opacity="0.6" />

  <!-- Headline -->
  <text x="540" y="1650"
        font-family="Montserrat, Arial, sans-serif"
        font-size="20"
        font-weight="300"
        letter-spacing="12"
        fill="${COLORS.gold}"
        text-anchor="middle">
    ${headline}
  </text>

  <!-- Subtext -->
  <text x="540" y="1720"
        font-family="Cormorant Garamond, Georgia, serif"
        font-size="56"
        font-style="italic"
        fill="${COLORS.cream}"
        text-anchor="middle">
    ${subtext}
  </text>

  <!-- CTA -->
  <text x="540" y="1820"
        font-family="Montserrat, Arial, sans-serif"
        font-size="16"
        font-weight="400"
        letter-spacing="4"
        fill="${COLORS.cream}"
        opacity="0.8"
        text-anchor="middle">
    ${cta}
  </text>

  <!-- Bottom line accent -->
  <line x1="440" y1="1770" x2="640" y2="1770" stroke="${COLORS.gold}" stroke-width="1" opacity="0.5" />
</svg>`;
}

// Process single image
async function processImage(inputPath, outputPath, svgOverlay, targetWidth, targetHeight) {
  try {
    // Load source image
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    // Resize and crop to target aspect ratio
    const resizedImage = await image
      .resize(targetWidth, targetHeight, {
        fit: 'cover',
        position: 'center',
      })
      .toBuffer();

    // Create SVG buffer
    const svgBuffer = Buffer.from(svgOverlay);

    // Composite overlay on image
    await sharp(resizedImage)
      .composite([
        {
          input: svgBuffer,
          top: 0,
          left: 0,
        },
      ])
      .jpeg({ quality: 95 })
      .toFile(outputPath);

    console.log(`   ✅ Created: ${path.basename(outputPath)}`);
    return outputPath;
  } catch (error) {
    console.error(`   ❌ Error processing ${inputPath}: ${error.message}`);
    throw error;
  }
}

// Main function
async function main() {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║   V E R A L A B S                                          ║
║   Branded Post Creator                                     ║
║                                                            ║
║   Applying haute couture styling:                          ║
║   • Gold text overlays                                     ║
║   • Corner accents & decorative lines                      ║
║   • Collection labels                                      ║
║   • VERALABS brand mark                                    ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
`);

  // Create output directory
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const brandedPosts = {};
  const brandedStories = [];

  // Process carousels
  for (const [carouselId, carousel] of Object.entries(BRANDED_POSTS)) {
    console.log(`\n════════════════════════════════════════════════════════════`);
    console.log(`📸 ${carousel.collection}`);
    console.log(`════════════════════════════════════════════════════════════\n`);

    brandedPosts[carouselId] = [];

    for (let i = 0; i < carousel.images.length; i++) {
      const imgConfig = carousel.images[i];
      const inputPath = path.join(SOURCE_DIR, imgConfig.file);
      const outputPath = path.join(OUTPUT_DIR, `${carouselId}_${i + 1}.jpg`);

      if (!fs.existsSync(inputPath)) {
        console.log(`   ⚠️  Missing: ${imgConfig.file}`);
        continue;
      }

      const overlay = createPostOverlay(imgConfig, carousel.collection);
      await processImage(inputPath, outputPath, overlay, 1080, 1350);
      brandedPosts[carouselId].push(outputPath);
    }
  }

  // Process stories
  console.log(`\n════════════════════════════════════════════════════════════`);
  console.log(`📱 BRANDED STORIES`);
  console.log(`════════════════════════════════════════════════════════════\n`);

  for (const story of BRANDED_STORIES) {
    const inputPath = path.join(SOURCE_DIR, story.file);
    const outputPath = path.join(OUTPUT_DIR, `story_${story.id}.jpg`);

    if (!fs.existsSync(inputPath)) {
      console.log(`   ⚠️  Missing: ${story.file}`);
      continue;
    }

    const overlay = createStoryOverlay(story);
    await processImage(inputPath, outputPath, overlay, 1080, 1920);
    brandedStories.push(outputPath);
  }

  // Save manifest
  const manifest = {
    created: new Date().toISOString(),
    posts: brandedPosts,
    stories: brandedStories,
  };

  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'manifest.json'),
    JSON.stringify(manifest, null, 2)
  );

  console.log(`
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║   ✅ BRANDED IMAGES CREATED                                ║
║                                                            ║
║   Output: ${OUTPUT_DIR}
║                                                            ║
║   Next: Run publish-branded-campaign.mjs                   ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
`);

  return manifest;
}

main().catch(console.error);
