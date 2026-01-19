#!/usr/bin/env node
/**
 * VERALABS Lingerie Masterclass Generator
 * Curvaceous hourglass Indian muse in elegant intimate apparel
 */

import fs from 'fs';
import path from 'path';

const PROXY_URL = 'http://localhost:3001';
const OUTPUT_DIR = '/home/ecolex/version1/instagram-intimate-masterclass/lingerie_collection';
const PROJECT_ID = 'zaranovel';
const LOCATION = 'us-central1';

// Curvaceous Hourglass Indian Muse
const MUSE_MODEL = `Stunning curvaceous Indian woman, late 20s,
perfect hourglass figure with voluptuous athletic curves,
full generous bust, dramatically cinched waist, wide rounded hips,
toned shapely thighs and sculpted glutes,
flawless caramel skin with golden undertones,
long flowing black hair cascading past shoulders,
expressive dark almond-shaped eyes with bedroom gaze,
full sensual lips, high cheekbones,
confident alluring presence, natural beauty`;

// Lingerie Session Prompts - Architectural Mesh & Strategic Drape
const LINGERIE_PROMPTS = [
  {
    id: 'architectural_mesh_1',
    pose: 'Standing with weight shifted to one hip, hand on waist emphasizing dramatic hourglass silhouette, looking over shoulder with sultry confidence',
    wardrobe: 'architectural black textured mesh bodysuit with single-line strategic draping, geometric cutouts following body contours, minimalist haute couture intimate design',
    lighting: 'dramatic chiaroscuro lighting with golden rim light outlining every curve, deep shadows defining cinched waist',
    environment: 'minimalist dark studio with single beam of golden light, high fashion editorial setting'
  },
  {
    id: 'strategic_drape_2',
    pose: 'Seated elegantly with legs crossed, leaning back on arms, chin tilted up confidently, generous bust prominent',
    wardrobe: 'sheer black mesh one-piece with strategic fabric draping across chest and hips, architectural single-line design, avant-garde lingerie',
    lighting: 'venetian blind shadows casting dramatic stripes across curvaceous form, high contrast',
    environment: 'luxurious cream silk backdrop, intimate boudoir atmosphere'
  },
  {
    id: 'geometric_cutout_3',
    pose: 'Standing in profile showing full hourglass silhouette, rounded hips and glutes emphasized, looking back at camera with alluring gaze',
    wardrobe: 'textured mesh bodysuit with geometric architectural cutouts, single continuous line design wrapping around curves, minimalist coverage',
    lighting: 'dramatic side lighting sculpting every curve, rim light on silhouette',
    environment: 'pure black void, fine art nude aesthetic, gallery quality'
  },
  {
    id: 'one_line_intimate_4',
    pose: 'Lying on side showcasing dramatic hip curve and rounded glutes, one arm supporting head, intimate bedroom gaze',
    wardrobe: 'architectural one-line mesh design with strategic draping, minimal coverage emphasizing curvaceous figure, haute couture intimate',
    lighting: 'warm golden hour glow, soft diffused light creating luminous skin, golden highlights on curves',
    environment: 'luxurious silk sheets in champagne gold, intimate private boudoir'
  },
  {
    id: 'mesh_sculpture_5',
    pose: 'Standing with back to camera, looking over shoulder, full rounded glutes and cinched waist visible, confident pose',
    wardrobe: 'sculptural black mesh bodysuit with architectural strapping, strategic single-line drape across back, minimalist design',
    lighting: 'dramatic spotlight from above creating deep shadows, rim light outlining silhouette',
    environment: 'dark velvet backdrop, editorial fashion mood, museum quality'
  },
  {
    id: 'strategic_reveal_6',
    pose: 'Artistic pose with arms raised above head creating elegant S-curve, emphasizing full bust and tiny waist, eyes closed in serene expression',
    wardrobe: 'avant-garde textured mesh with single continuous strap design, strategic coverage creating geometric patterns on skin, architectural lingerie',
    lighting: 'dramatic studio lighting with sharp shadows defining every contour of hourglass figure',
    environment: 'infinite black backdrop, single dramatic light source, fine art aesthetic'
  },
  {
    id: 'drape_elegance_7',
    pose: 'Reclining elegantly on chaise lounge, one knee raised showing shapely thigh, generous curves on full display, smoldering confident gaze',
    wardrobe: 'sheer textured mesh with strategic draping across generous bust, architectural hip detailing, minimalist haute couture',
    lighting: 'warm ambient glow with golden reflections, intimate lighting emphasizing curves',
    environment: 'vintage velvet chaise in burgundy, dark rich colors, classic boudoir setting'
  },
  {
    id: 'architectural_mirror_8',
    pose: 'Standing before mirror, both front and back view visible in reflection, adjusting architectural strap, intimate self-appreciation',
    wardrobe: 'geometric mesh bodysuit with single-line strategic design, minimal coverage, architectural fashion-forward intimate wear',
    lighting: 'soft vanity lighting with warm golden glow, flattering light on full figure',
    environment: 'elegant dressing room with gilded mirror, intimate feminine setting'
  }
];

function log(msg) {
  const time = new Date().toLocaleTimeString();
  console.log(`[${time}] ${msg}`);
}

async function getOAuthToken() {
  const response = await fetch(`${PROXY_URL}/api/gcloud-token`);
  const data = await response.json();
  if (!data.success || !data.token) {
    throw new Error('Failed to get OAuth token');
  }
  return data.token;
}

function buildPrompt(promptConfig) {
  return `Professional high-end lingerie fashion photography, Vogue Italia editorial quality.

MODEL: ${MUSE_MODEL}

POSE: ${promptConfig.pose}

WARDROBE: ${promptConfig.wardrobe}

LIGHTING: ${promptConfig.lighting}

SETTING: ${promptConfig.environment}

STYLE: Elegant intimate apparel editorial, sophisticated and tasteful,
emphasizing feminine curves and hourglass silhouette,
warm golden color palette with deep shadows,
shot on Hasselblad medium format, shallow depth of field,
magazine cover quality, empowering feminine beauty.

MOOD: Confident, alluring, elegant, intimate yet sophisticated.`;
}

async function generateImage(prompt, outputPath, oauthToken) {
  const endpoint = `publishers/google/models/imagen-4.0-generate-001:predict`;
  const url = `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/${endpoint}`;

  const requestBody = {
    instances: [{ prompt }],
    parameters: {
      sampleCount: 1,
      aspectRatio: '9:16',
      personGeneration: 'allow_adult',
      safetyFilterLevel: 'block_few',
      addWatermark: false
    }
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${oauthToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API error: ${response.status} - ${errorText.slice(0, 200)}`);
  }

  const result = await response.json();

  if (!result.predictions || result.predictions.length === 0) {
    throw new Error('No predictions - content may have been filtered');
  }

  const prediction = result.predictions[0];

  if (prediction.bytesBase64Encoded) {
    const imageBuffer = Buffer.from(prediction.bytesBase64Encoded, 'base64');
    fs.writeFileSync(outputPath, imageBuffer);
    return true;
  }

  if (prediction.raiFilteredReason) {
    throw new Error(`Filtered: ${prediction.raiFilteredReason}`);
  }

  throw new Error('No image data in prediction');
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
║        👙 LINGERIE MASTERCLASS GENERATOR 👙                               ║
║                                                                          ║
║     Curvaceous Hourglass Muse • Elegant Intimate Apparel • Editorial     ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
  `);

  // Create output directory
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  log('Authenticating with Vertex AI...');
  let oauthToken;
  try {
    oauthToken = await getOAuthToken();
    log('✅ OAuth token obtained');
  } catch (err) {
    console.error('❌ Failed to get OAuth token:', err.message);
    process.exit(1);
  }

  const args = process.argv.slice(2);
  const maxImages = parseInt(args[0]) || 4;

  const promptsToGenerate = LINGERIE_PROMPTS.slice(0, maxImages);
  const results = [];

  console.log(`\n${'═'.repeat(70)}`);
  log(`🎨 GENERATING ${promptsToGenerate.length} LINGERIE IMAGES`);
  console.log(`${'═'.repeat(70)}`);

  for (let i = 0; i < promptsToGenerate.length; i++) {
    const promptConfig = promptsToGenerate[i];
    const prompt = buildPrompt(promptConfig);
    const timestamp = Date.now();
    const outputPath = path.join(OUTPUT_DIR, `${promptConfig.id}_${timestamp}.jpg`);

    log(`   📸 [${i + 1}/${promptsToGenerate.length}] ${promptConfig.id}...`);

    try {
      await generateImage(prompt, outputPath, oauthToken);
      log(`   ✅ Saved: ${path.basename(outputPath)}`);
      results.push({ id: promptConfig.id, path: outputPath, status: 'success' });

      // Rate limit delay
      if (i < promptsToGenerate.length - 1) {
        await new Promise(r => setTimeout(r, 15000));
      }

    } catch (err) {
      log(`   ❌ Failed: ${err.message}`);
      results.push({ id: promptConfig.id, error: err.message, status: 'failed' });

      // On rate limit, wait longer
      if (err.message.includes('429')) {
        log('   ⏳ Rate limited, waiting 60s...');
        await new Promise(r => setTimeout(r, 60000));
      }
    }
  }

  // Summary
  console.log(`\n${'═'.repeat(70)}`);
  console.log('                    GENERATION COMPLETE');
  console.log(`${'═'.repeat(70)}`);

  const successful = results.filter(r => r.status === 'success');
  console.log(`  ✅ Successful: ${successful.length}`);
  console.log(`  ❌ Failed: ${results.length - successful.length}`);

  if (successful.length > 0) {
    console.log(`\n  Images saved to: ${OUTPUT_DIR}`);
  }

  // Save manifest
  const manifestPath = path.join(OUTPUT_DIR, 'manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(results, null, 2));
  log(`📋 Manifest: ${manifestPath}`);

  console.log(`${'═'.repeat(70)}\n`);
}

main().catch(err => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});
