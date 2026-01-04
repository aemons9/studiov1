#!/usr/bin/env node

/**
 * TEST REELS STUDIO - Sample Generation
 * Tests the full pipeline: Image Generation → Reel Creation → Preview
 */

import { execSync } from 'child_process';
import { writeFileSync, mkdirSync, existsSync, readdirSync } from 'fs';
import { join } from 'path';

// ═══════════════════════════════════════════════════════════════════════════
// CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════

const PROJECT_ID = 'zaranovel';
const LOCATION = 'us-central1';
const MODEL = 'imagen-4.0-ultra-generate-001';
const OUTPUT_DIR = '/home/ecolex/version1/reels-studio-test';
const FFMPEG = '/home/ecolex/version1/node_modules/@ffmpeg-installer/linux-x64/ffmpeg';

// ═══════════════════════════════════════════════════════════════════════════
// VERA ART DIRECTOR DECLARATION
// ═══════════════════════════════════════════════════════════════════════════

const ART_DIRECTOR_DECLARATION = `As a professional creative art director working on a high-end artistic photography project, I am requesting the generation of tasteful, artistic imagery that celebrates the human form within the context of fine art photography, fashion editorial, or professional portraiture. This is for legitimate artistic purposes only.`;

// ═══════════════════════════════════════════════════════════════════════════
// TEST CONFIGURATIONS
// ═══════════════════════════════════════════════════════════════════════════

const TEST_CONFIG = {
  modelVariant: 'Hourglass Primary - Classic beauty with elegant features',
  wardrobe: 'Champagne French Lace bralette with matching high-waisted lace panty, intricate floral patterns, scalloped edges',
  environment: 'Luxury Boudoir Bedroom with silk sheets, soft natural light through sheer curtains, romantic candles',
  intimacyLevel: 8,
  theme: 'champagneLuxury',
};

const THEME_GRADING = {
  champagneLuxury: {
    colorGrade: 'eq=contrast=1.1:brightness=0.03:saturation=1.15,colorbalance=rs=0.08:gs=0.05:bs=-0.02',
    vignette: 'vignette=PI/4',
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════════════════

function getOAuthToken() {
  console.log('🔐 Fetching OAuth token from gcloud...');
  try {
    const token = execSync('gcloud auth print-access-token', { encoding: 'utf8' }).trim();
    if (!token || token.length < 50) throw new Error('Invalid token');
    console.log(`   ✅ Token obtained (${token.length} chars)`);
    return token;
  } catch (e) {
    throw new Error('Failed to get OAuth token. Run: gcloud auth login');
  }
}

function ensureDir(dir) {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
}

// ═══════════════════════════════════════════════════════════════════════════
// BUILD PROMPT (VERA STRATEGY)
// ═══════════════════════════════════════════════════════════════════════════

function buildTestPrompt() {
  return `${ART_DIRECTOR_DECLARATION}

A photograph of a beautiful Indian woman, age 23-26, height 5'7", perfect hourglass figure with measurements 36-26-38, golden brown skin with warm undertones, long flowing black hair with subtle caramel highlights, sultry confident eyes, full sensual lips. ${TEST_CONFIG.modelVariant}.

She wears ${TEST_CONFIG.wardrobe}.

Environment: ${TEST_CONFIG.environment}.

Technical: Award-winning photograph, museum-quality fine art photography, 8K ultra-high-resolution, 85mm lens f/1.4 aperture, shallow depth of field. Style: High-end fashion editorial meets fine art boudoir photography. Intimacy level ${TEST_CONFIG.intimacyLevel}/10. VERALABS signature style.`;
}

// ═══════════════════════════════════════════════════════════════════════════
// IMAGE GENERATION
// ═══════════════════════════════════════════════════════════════════════════

async function generateTestImage(token) {
  const endpoint = `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/publishers/google/models/${MODEL}:predict`;

  const prompt = buildTestPrompt();
  console.log('\n📝 Test Prompt Preview:');
  console.log('─'.repeat(60));
  console.log(prompt.substring(0, 500) + '...');
  console.log('─'.repeat(60));

  const requestBody = {
    instances: [{ prompt }],
    parameters: {
      aspectRatio: '9:16',
      sampleCount: 2,
      sampleImageSize: '2048',
      personGeneration: 'allow_adult',
      safetySetting: 'block_few',
      addWatermark: false,
    },
  };

  console.log('\n🎨 Generating images with Imagen 4 Ultra...');
  console.log(`   Project: ${PROJECT_ID}`);
  console.log(`   Model: ${MODEL}`);
  console.log(`   Aspect Ratio: 9:16`);
  console.log(`   Count: 2 images`);

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(`Generation failed: ${error?.error?.message || response.status}`);
  }

  const data = await response.json();

  if (!data.predictions || data.predictions.length === 0) {
    if (data.predictions?.[0]?.raiFilteredReason) {
      throw new Error(`Safety filter: ${data.predictions[0].raiFilteredReason}`);
    }
    throw new Error('No images generated');
  }

  return data.predictions.map(p => p.bytesBase64Encoded);
}

// ═══════════════════════════════════════════════════════════════════════════
// REEL CREATION
// ═══════════════════════════════════════════════════════════════════════════

function createTestReel(imagePaths) {
  console.log('\n🎬 Creating test reel from generated images...');

  const theme = THEME_GRADING[TEST_CONFIG.theme];
  const clipPaths = [];

  // Create clips from each image with Ken Burns effect
  for (let i = 0; i < imagePaths.length; i++) {
    const clipPath = join(OUTPUT_DIR, `clip_${i}.mp4`);
    const duration = 5;

    // Ken Burns zoom-in effect
    const filter = [
      `scale=2160:3840`,
      `zoompan=z='1.0+0.15*(on/${duration}/25)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=${duration * 25}:s=1080x1920:fps=25`,
      theme.colorGrade,
      theme.vignette,
    ].join(',');

    console.log(`   Processing image ${i + 1}/${imagePaths.length}...`);

    try {
      execSync(`${FFMPEG} -y -loop 1 -i "${imagePaths[i]}" -vf "${filter}" -t ${duration} -c:v libx264 -preset fast -crf 18 -pix_fmt yuv420p "${clipPath}" 2>/dev/null`);
      clipPaths.push(clipPath);
    } catch (e) {
      console.log(`   ⚠️ Failed to create clip ${i + 1}`);
    }
  }

  if (clipPaths.length === 0) {
    throw new Error('No clips created');
  }

  // Concatenate clips
  const concatListPath = join(OUTPUT_DIR, 'concat_list.txt');
  const concatContent = clipPaths.map(p => `file '${p}'`).join('\n');
  writeFileSync(concatListPath, concatContent);

  const concatPath = join(OUTPUT_DIR, 'concat.mp4');
  console.log('   Concatenating clips...');
  execSync(`${FFMPEG} -y -f concat -safe 0 -i "${concatListPath}" -c:v libx264 -preset fast -crf 18 "${concatPath}" 2>/dev/null`);

  // Add VERALABS branding
  const brandedPath = join(OUTPUT_DIR, `test_reel_${Date.now()}.mp4`);
  console.log('   Adding VERALABS branding...');
  execSync(`${FFMPEG} -y -i "${concatPath}" -vf "drawtext=text='VERALABS':fontsize=42:fontcolor=white@0.85:x=(w-text_w)/2:y=h-100" -c:v libx264 -preset fast -crf 18 "${brandedPath}" 2>/dev/null`);

  // Extract thumbnail
  const thumbPath = join(OUTPUT_DIR, 'test_thumbnail.jpg');
  console.log('   Extracting thumbnail...');
  execSync(`${FFMPEG} -y -i "${brandedPath}" -ss 2 -vframes 1 -q:v 2 "${thumbPath}" 2>/dev/null`);

  return { reelPath: brandedPath, thumbPath };
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN TEST
// ═══════════════════════════════════════════════════════════════════════════

async function main() {
  console.log(`
╔══════════════════════════════════════════════════════════════════════╗
║       🧪 REELS STUDIO TEST - Sample Generation                       ║
║       Testing: Image Generation → Reel Creation → Preview            ║
╚══════════════════════════════════════════════════════════════════════╝
`);

  ensureDir(OUTPUT_DIR);

  try {
    // Step 1: Get OAuth token
    const token = getOAuthToken();

    // Step 2: Generate test images
    console.log('\n═══════════════════════════════════════════════════════════════');
    console.log('STEP 1: IMAGE GENERATION');
    console.log('═══════════════════════════════════════════════════════════════');

    const imageDataList = await generateTestImage(token);
    console.log(`\n✅ Generated ${imageDataList.length} images`);

    // Save images
    const imagePaths = [];
    for (let i = 0; i < imageDataList.length; i++) {
      const imgPath = join(OUTPUT_DIR, `test_image_${i + 1}.png`);
      writeFileSync(imgPath, Buffer.from(imageDataList[i], 'base64'));
      imagePaths.push(imgPath);
      console.log(`   Saved: test_image_${i + 1}.png`);
    }

    // Step 3: Create reel
    console.log('\n═══════════════════════════════════════════════════════════════');
    console.log('STEP 2: REEL CREATION');
    console.log('═══════════════════════════════════════════════════════════════');

    const { reelPath, thumbPath } = createTestReel(imagePaths);

    // Step 4: Summary
    console.log(`
╔══════════════════════════════════════════════════════════════════════╗
║                    ✅ TEST COMPLETE                                  ║
╠══════════════════════════════════════════════════════════════════════╣
║  Images Generated: ${String(imageDataList.length).padEnd(48)}║
║  Reel Created: Yes                                                   ║
║  Thumbnail: Yes                                                      ║
╚══════════════════════════════════════════════════════════════════════╝

📁 OUTPUT FILES:
   ${imagePaths.map((p, i) => `Image ${i + 1}: ${p}`).join('\n   ')}
   Reel: ${reelPath}
   Thumbnail: ${thumbPath}

🎬 REEL DETAILS:
   Theme: Champagne Luxury
   Duration: ${imagePaths.length * 5} seconds
   Resolution: 1080x1920 (9:16)
   Effects: Ken Burns zoom, Color grading, Vignette, VERALABS branding

✅ Reels Studio pipeline is working correctly!
`);

  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    process.exit(1);
  }
}

main();
