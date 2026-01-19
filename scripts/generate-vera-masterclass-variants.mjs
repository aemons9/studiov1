#!/usr/bin/env node
/**
 * VERALABS Masterclass Variant Generator
 * Generates curvaceous Indian hourglass muse with VERALABS branding themes
 * Using Vertex AI Imagen 4.0 for Instagram grid consistency
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const PROXY_URL = 'http://localhost:3001';
const OUTPUT_DIR = '/home/ecolex/version1/generated-vera-masterclass';
const PROJECT_ID = 'zaranovel';
const LOCATION = 'us-central1';

// VERALABS Brand Aesthetic
const BRAND_COLORS = {
  gold: '#c9a962',
  black: '#0a0a0a',
  charcoal: '#1a1a1a',
  cream: '#f5f0e8'
};

// Curvaceous Indian Hourglass Muse - Our Signature Model
const MUSE_MODEL = `Stunning curvaceous Indian woman, late 20s,
perfect hourglass figure with voluptuous athletic curves,
full generous bust (37DD), dramatically cinched waist (26"), wide rounded hips (42"),
toned shapely thighs and sculpted glutes,
flawless caramel skin with golden undertones,
long flowing black hair cascading past shoulders with subtle waves,
expressive dark almond-shaped eyes with bedroom gaze,
full sensual lips, high cheekbones, elegant neck and shoulders,
confident alluring presence, natural beauty with minimal makeup`;

// VERALABS Instagram Grid Themed Variants
const THEMED_VARIANTS = [
  // GOLDEN TOUCH COLLECTION
  {
    id: 'golden_touch_intimate',
    theme: 'GOLDEN TOUCH',
    collection: 'INTIMATE MASTERCLASS',
    pose: 'Standing elegantly with one hand on hip emphasizing dramatic hourglass silhouette, looking directly at camera with sultry confidence',
    wardrobe: 'luxurious champagne silk slip dress with delicate gold chain straps, fabric draping sensuously over curves, gold jewelry',
    lighting: 'warm golden hour sunlight streaming through sheer curtains, creating luminous rim lighting outlining every curve',
    environment: 'luxurious penthouse bedroom with cream silk sheets, floor-to-ceiling windows, champagne and gold interior'
  },
  {
    id: 'golden_touch_sensual',
    theme: 'GOLDEN TOUCH',
    collection: 'INTIMATE MASTERCLASS',
    pose: 'Reclining on silk daybed with one knee raised, arms stretched above head creating elegant S-curve, serene expression',
    wardrobe: 'sheer gold-tinted mesh bodysuit with strategic draping, minimal coverage highlighting curvaceous figure',
    lighting: 'golden ambient glow with soft shadows, warm light caressing skin creating luminous effect',
    environment: 'private boudoir with velvet chaise in cream and gold, intimate atmosphere'
  },

  // SHADOW WHISPERS COLLECTION
  {
    id: 'shadow_whispers_dramatic',
    theme: 'SHADOW WHISPERS',
    collection: 'CHIAROSCURO SERIES',
    pose: 'Standing in profile showing full hourglass silhouette, rounded hips and glutes emphasized, looking back at camera with smoldering gaze',
    wardrobe: 'black textured mesh bodysuit with architectural cutouts, strategic single-line draping across curves',
    lighting: 'venetian blind shadows casting dramatic stripes across curvaceous form, high contrast chiaroscuro',
    environment: 'minimalist dark studio with single dramatic light source, film noir atmosphere'
  },
  {
    id: 'shadow_whispers_sculptural',
    theme: 'SHADOW WHISPERS',
    collection: 'CHIAROSCURO SERIES',
    pose: 'Seated elegantly with legs crossed, leaning back showcasing generous bust and tiny waist, one hand on neck',
    wardrobe: 'sheer black mesh one-piece with architectural detailing, geometric patterns on skin',
    lighting: 'single spotlight from above creating deep shadows defining every contour, dramatic rim light',
    environment: 'pure black void, fine art aesthetic, gallery quality'
  },

  // SILK SURRENDER COLLECTION
  {
    id: 'silk_surrender_flowing',
    theme: 'SILK SURRENDER',
    collection: 'LIQUID LUXURY',
    pose: 'Standing gracefully wrapped in flowing silk fabric, gathering material at chest, ethereal expression',
    wardrobe: 'flowing champagne silk kaftan barely covering curves, strategic draping revealing silhouette',
    lighting: 'soft studio lighting creating luminous fabric glow, beauty lighting emphasizing skin',
    environment: 'ethereal white space with floating silk fabrics, dreamlike atmosphere'
  },
  {
    id: 'silk_surrender_intimate',
    theme: 'SILK SURRENDER',
    collection: 'LIQUID LUXURY',
    pose: 'Lying on side showcasing dramatic hip curve and rounded glutes, one arm supporting head, intimate gaze',
    wardrobe: 'burgundy satin short robe loosely tied, barely covering generous curves, luxurious fabric',
    lighting: 'warm soft box lighting, satin catching beautiful golden highlights',
    environment: 'luxury bedroom with silk pillows in champagne gold, intimate private setting'
  },

  // MIRROR REFLECTIONS COLLECTION
  {
    id: 'mirror_reflections_vanity',
    theme: 'MIRROR REFLECTIONS',
    collection: 'VANITY SERIES',
    pose: 'Standing before ornate mirror, adjusting delicate necklace, both front and back view visible in reflection',
    wardrobe: 'elegant black lace bodysuit with strategic coverage, gold chain details',
    lighting: 'soft vanity lighting with warm golden glow, flattering light on full figure',
    environment: 'elegant dressing room with gilded baroque mirror, Parisian boudoir aesthetic'
  },
  {
    id: 'mirror_reflections_intimate',
    theme: 'MIRROR REFLECTIONS',
    collection: 'VANITY SERIES',
    pose: 'Seated at vanity, applying lipstick, captured mid-ritual in elegant moment of self-appreciation',
    wardrobe: 'cream silk camisole with delicate lace trim, barely covering generous bust',
    lighting: 'natural window light mixed with warm vanity lights, romantic golden hour',
    environment: 'luxurious marble vanity, crystal perfume bottles, intimate feminine setting'
  },

  // ARCHITECTURAL MESH COLLECTION
  {
    id: 'architectural_mesh_1',
    theme: 'ARCHITECTURAL MESH',
    collection: 'INTIMATE COUTURE',
    pose: 'Standing with weight shifted to one hip, hand on waist emphasizing dramatic hourglass silhouette, confident expression',
    wardrobe: 'architectural black textured mesh bodysuit with single-line strategic draping, geometric cutouts following body contours',
    lighting: 'dramatic chiaroscuro lighting with golden rim light outlining every curve',
    environment: 'minimalist dark studio with single beam of golden light, haute couture editorial'
  },
  {
    id: 'architectural_mesh_2',
    theme: 'ARCHITECTURAL MESH',
    collection: 'INTIMATE COUTURE',
    pose: 'Standing with back to camera showing full rounded glutes and cinched waist, looking over shoulder with alluring gaze',
    wardrobe: 'sculptural black mesh bodysuit with architectural strapping, strategic single-line drape across back',
    lighting: 'dramatic spotlight from above creating deep shadows, rim light outlining silhouette',
    environment: 'dark velvet backdrop, museum quality fine art aesthetic'
  }
];

function log(msg) {
  const time = new Date().toLocaleTimeString();
  console.log(`[${time}] ${msg}`);
}

async function getOAuthToken() {
  try {
    const response = await fetch(`${PROXY_URL}/api/gcloud-token`);
    const data = await response.json();
    if (data.success && data.token) {
      return data.token;
    }
  } catch (e) {
    // Fall back to gcloud CLI
  }

  return execSync('gcloud auth print-access-token', { encoding: 'utf-8' }).trim();
}

function buildPrompt(variant) {
  return `Professional high-end fashion and boudoir photography, Vogue Italia editorial quality.

MODEL: ${MUSE_MODEL}

POSE: ${variant.pose}

WARDROBE: ${variant.wardrobe}

LIGHTING: ${variant.lighting}

SETTING: ${variant.environment}

STYLE: Elegant intimate fashion editorial for VERALABS Masterclass,
sophisticated and tasteful emphasizing feminine curves and hourglass silhouette,
warm golden color palette with ${variant.theme.includes('SHADOW') ? 'deep dramatic shadows' : 'soft golden highlights'},
shot on Hasselblad H6D-100c medium format, shallow depth of field,
magazine cover quality, empowering feminine beauty.

MOOD: Confident, alluring, elegant, intimate yet sophisticated.
Brand aesthetic: VERALABS signature warm gold tones, museum-quality fine art.`;
}

async function generateImage(prompt, outputPath, oauthToken) {
  // Use Imagen 4 Ultra for highest quality
  const endpoint = `publishers/google/models/imagen-4.0-ultra-generate-001:predict`;
  const url = `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/${endpoint}`;

  const requestBody = {
    instances: [{ prompt }],
    parameters: {
      sampleCount: 1,
      aspectRatio: '3:4', // Portrait format for Ultra
      sampleImageSize: '2048',
      personGeneration: 'allow_adult',
      safetySetting: 'block_few',
      addWatermark: false,
      includeRaiReason: true,
      outputOptions: {
        mimeType: 'image/png',
        compressionQuality: 100
      }
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
    return { success: true, size: imageBuffer.length };
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
║        🎨 MASTERCLASS VARIANT GENERATOR 🎨                               ║
║                                                                          ║
║     Indian Hourglass Muse • VERALABS Brand Themes • Instagram Grid       ║
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
  const specificTheme = args[0];
  const maxImages = parseInt(args[1]) || 10;

  // Filter variants by theme if specified
  let variantsToGenerate = specificTheme
    ? THEMED_VARIANTS.filter(v => v.theme.toLowerCase().includes(specificTheme.toLowerCase()))
    : THEMED_VARIANTS;

  variantsToGenerate = variantsToGenerate.slice(0, maxImages);

  if (variantsToGenerate.length === 0) {
    console.error(`❌ No variants found for theme: ${specificTheme}`);
    console.log('Available themes: golden_touch, shadow_whispers, silk_surrender, mirror_reflections, architectural_mesh');
    process.exit(1);
  }

  const results = [];

  console.log(`\n${'═'.repeat(70)}`);
  log(`🎨 GENERATING ${variantsToGenerate.length} VERALABS MASTERCLASS VARIANTS`);
  console.log(`${'═'.repeat(70)}`);

  for (let i = 0; i < variantsToGenerate.length; i++) {
    const variant = variantsToGenerate[i];
    const prompt = buildPrompt(variant);
    const timestamp = Date.now();

    // Create theme subdirectory
    const themeDir = path.join(OUTPUT_DIR, variant.theme.toLowerCase().replace(/\s+/g, '_'));
    if (!fs.existsSync(themeDir)) {
      fs.mkdirSync(themeDir, { recursive: true });
    }

    const outputPath = path.join(themeDir, `${variant.id}_${timestamp}.png`);

    console.log(`\n${'─'.repeat(70)}`);
    log(`📸 [${i + 1}/${variantsToGenerate.length}] ${variant.theme} - ${variant.id}`);
    log(`   Collection: ${variant.collection}`);

    try {
      const result = await generateImage(prompt, outputPath, oauthToken);
      log(`   ✅ Saved: ${path.basename(outputPath)} (${(result.size / 1024).toFixed(1)} KB)`);
      results.push({
        id: variant.id,
        theme: variant.theme,
        collection: variant.collection,
        path: outputPath,
        status: 'success'
      });

      // Rate limit delay
      if (i < variantsToGenerate.length - 1) {
        log('   ⏳ Waiting 15s for rate limit...');
        await new Promise(r => setTimeout(r, 15000));
      }

    } catch (err) {
      log(`   ❌ Failed: ${err.message}`);
      results.push({
        id: variant.id,
        theme: variant.theme,
        collection: variant.collection,
        error: err.message,
        status: 'failed'
      });

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
  const failed = results.filter(r => r.status === 'failed');

  console.log(`  ✅ Successful: ${successful.length}`);
  console.log(`  ❌ Failed: ${failed.length}`);

  // Group by theme
  const byTheme = {};
  successful.forEach(r => {
    if (!byTheme[r.theme]) byTheme[r.theme] = [];
    byTheme[r.theme].push(r.path);
  });

  console.log('\n  📁 Generated by theme:');
  for (const [theme, paths] of Object.entries(byTheme)) {
    console.log(`     ${theme}: ${paths.length} images`);
  }

  if (successful.length > 0) {
    console.log(`\n  Output directory: ${OUTPUT_DIR}`);
  }

  // Save manifest
  const manifestPath = path.join(OUTPUT_DIR, 'generation-manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    model: 'Indian Hourglass Goddess Muse',
    brand: 'VERALABS Masterclass',
    themes: Object.keys(byTheme),
    results: results
  }, null, 2));
  log(`📋 Manifest: ${manifestPath}`);

  console.log(`${'═'.repeat(70)}\n`);
}

main().catch(err => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});
