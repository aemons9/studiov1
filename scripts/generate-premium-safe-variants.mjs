#!/usr/bin/env node
/**
 * VERALABS Premium Series - Safe Editorial Variants
 * Editorial fashion-forward approach with safer prompts
 * Imagen 4 Ultra - Gallery Quality
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const PROXY_URL = 'http://localhost:3001';
const OUTPUT_DIR = '/home/ecolex/version1/generated-premium-minimal';
const PROJECT_ID = 'zaranovel';
const LOCATION = 'us-central1';

// Fit Hourglass Indian Muse - Professional Editorial Focus
const PREMIUM_MUSE = `Stunning Indian fashion model, 5'8" tall,
fit athletic voluptuous hourglass figure with elegant statuesque curves,
sun-kissed bronze skin with luminous golden undertones,
striking magnetic gaze with dramatic cheekbones,
long flowing jet-black hair with natural waves,
age 26, commanding confident presence, high fashion editorial`;

// Safe Editorial Variants - Fashion-Forward Approach
const SAFE_VARIANTS = [
  // ARCHITECTURAL - Focus on fashion design elements
  {
    id: 'architectural_editorial_1',
    name: 'Geometric Couture',
    category: 'ARCHITECTURAL',
    wardrobe: 'Avant-garde geometric designer bodycon dress with bold architectural cutouts revealing shoulders and back, sharp angular lines creating striking silhouette, matte black fabric with sculptural construction',
    pose: 'Standing confidently with one hip cocked, hand on waist, chin lifted proudly, showcasing dress architecture, full body shot',
    lighting: 'Clean dramatic side lighting emphasizing geometric shapes, fashion studio quality',
    environment: 'Minimalist white studio, pure high fashion editorial setting',
    style: 'Vogue Italia editorial, Helmut Newton architectural fashion'
  },
  {
    id: 'architectural_editorial_2',
    name: 'Structural Elegance',
    category: 'ARCHITECTURAL',
    wardrobe: 'Designer structured bustier corset with elegant straps creating geometric patterns, paired with high-waisted wide-leg trousers, sophisticated evening wear construction',
    pose: 'Three-quarter view, arms elegantly positioned, showcasing bustier structure, confident model expression',
    lighting: 'Rim lighting defining silhouette, soft fill light, editorial lighting setup',
    environment: 'Dark velvet backdrop, luxury fashion editorial atmosphere',
    style: 'Harper\'s Bazaar elegance, Irving Penn sophistication'
  },

  // MESH/SHEER - Luxury evening wear approach
  {
    id: 'mesh_editorial_1',
    name: 'Crystal Evening',
    category: 'MESH SHEER',
    wardrobe: 'Couture evening gown with delicate crystal-embellished mesh overlay on bodice, nude lining beneath, elegant long sleeves with scattered crystals catching light',
    pose: 'Standing in elegant pose, one hand touching neck, serene expression, full length gown flowing beautifully',
    lighting: 'Soft glamour lighting with crystals catching beautiful highlights',
    environment: 'Grand ballroom atmosphere, luxury gala setting',
    style: 'Red carpet elegance, Elie Saab couture aesthetic'
  },
  {
    id: 'mesh_editorial_2',
    name: 'Lace Sophistication',
    category: 'MESH SHEER',
    wardrobe: 'Elegant French lace cocktail dress with delicate mesh details at neckline and sleeves, sophisticated bodycon fit, nude silk lining, timeless design',
    pose: 'Seated elegantly on velvet chaise, legs crossed at ankle, graceful hand placement, looking directly at camera',
    lighting: 'Beauty lighting with soft shadows, romantic evening ambiance',
    environment: 'Luxurious boudoir setting with velvet textures, intimate but sophisticated',
    style: 'Classic Vogue beauty editorial, timeless elegance'
  },

  // ADORNMENT - Statement jewelry focus
  {
    id: 'adornment_editorial_1',
    name: 'Golden Statement',
    category: 'ADORNMENT',
    wardrobe: 'Simple black silk slip dress with stunning statement gold collar necklace and matching earrings, jewelry as the hero piece, elegant simplicity letting gold shine',
    pose: 'Close-up beauty shot showing face and neck, jewelry prominently displayed, serene confidence',
    lighting: 'Warm golden lighting making jewelry glow, beauty lighting on face',
    environment: 'Clean neutral backdrop, fine jewelry campaign aesthetic',
    style: 'Cartier campaign elegance, jewelry editorial mastery'
  },
  {
    id: 'adornment_editorial_2',
    name: 'Pearl Elegance',
    category: 'ADORNMENT',
    wardrobe: 'Strapless black velvet gown with multiple strands of lustrous pearl necklaces draped elegantly, pearl drop earrings, classic sophistication with modern edge',
    pose: 'Three-quarter portrait, one hand touching pearls, elegant tilt of head, Old Hollywood glamour pose',
    lighting: 'Soft beauty lighting making pearls luminous, classic portrait lighting',
    environment: 'Dark rich background, museum portrait quality',
    style: 'Richard Avedon portrait mastery, classic glamour'
  },

  // LIGHT - Artistic portrait approach
  {
    id: 'light_editorial_1',
    name: 'Golden Hour Portrait',
    category: 'LIGHT COVERAGE',
    wardrobe: 'Flowing champagne silk kaftan catching golden light, elegant loose draping, sophisticated resort wear',
    pose: 'Standing in golden light with kaftan flowing, arms slightly raised, natural movement captured, joyful expression',
    lighting: 'Beautiful golden hour backlight, sun creating halo effect, warm tones',
    environment: 'Outdoor setting at sunset, natural golden atmosphere',
    style: 'Peter Lindbergh natural beauty, golden hour magic'
  },
  {
    id: 'light_editorial_2',
    name: 'Studio Light Portrait',
    category: 'LIGHT COVERAGE',
    wardrobe: 'Elegant satin wrap dress in deep burgundy, dramatic draping at shoulder, sophisticated evening elegance',
    pose: 'Beauty portrait with dramatic side lighting, one shoulder highlighted, mysterious gaze',
    lighting: 'Single dramatic beauty dish creating chiaroscuro effect, rim light on opposite side',
    environment: 'Pure black studio background, dramatic editorial lighting',
    style: 'Classic beauty editorial, dramatic light sculpting'
  }
];

// Quality triggers
const QUALITY_PREFIX = `Award-winning museum-quality fashion photograph, Vogue Italia editorial masterpiece.`;
const QUALITY_SUFFIX = `Shot on Phase One IQ4 150MP with Schneider-Kreuznach glass. Master fashion photography composition. Professional post-production with editorial color grading. Photorealistic rendering with authentic beauty.`;

function log(msg) {
  const time = new Date().toLocaleTimeString();
  console.log(`[${time}] ${msg}`);
}

async function getOAuthToken() {
  try {
    const response = await fetch(`${PROXY_URL}/api/gcloud-token`);
    const data = await response.json();
    if (data.success && data.token) return data.token;
  } catch (e) {}
  return execSync('gcloud auth print-access-token', { encoding: 'utf-8' }).trim();
}

function buildPrompt(variant) {
  return `${QUALITY_PREFIX}

MODEL: ${PREMIUM_MUSE}

CONCEPT: ${variant.name} - High Fashion ${variant.category} Editorial

WARDROBE: ${variant.wardrobe}

POSE: ${variant.pose}

LIGHTING: ${variant.lighting}

SETTING: ${variant.environment}

STYLE: ${variant.style}
High-end fashion editorial photography.
Sophisticated, elegant, gallery-worthy execution.

TECHNICAL: 85mm lens, f/2.0, sharp focus.
Full body or portrait composition as specified.

${QUALITY_SUFFIX}`;
}

async function generateImage(prompt, outputPath, oauthToken) {
  const endpoint = `publishers/google/models/imagen-4.0-ultra-generate-001:predict`;
  const url = `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/${endpoint}`;

  const requestBody = {
    instances: [{ prompt }],
    parameters: {
      sampleCount: 1,
      aspectRatio: '3:4',
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
    throw new Error(`API error: ${response.status} - ${errorText.slice(0, 300)}`);
  }

  const result = await response.json();

  if (!result.predictions || result.predictions.length === 0) {
    throw new Error('No predictions returned');
  }

  const prediction = result.predictions[0];

  if (prediction.bytesBase64Encoded) {
    const buffer = Buffer.from(prediction.bytesBase64Encoded, 'base64');
    fs.writeFileSync(outputPath, buffer);
    return { success: true, size: buffer.length };
  } else if (prediction.raiFilteredReason) {
    throw new Error(`Filtered: ${prediction.raiFilteredReason}`);
  } else {
    throw new Error('No image data in response');
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
║        💎 PREMIUM EDITORIAL VARIANTS 💎                                  ║
║                                                                          ║
║         Fashion-Forward • Editorial Excellence • Safe Approach           ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
  `);

  log('Authenticating with Vertex AI...');
  let oauthToken = await getOAuthToken();
  log('✅ OAuth token obtained');

  // Ensure output directories exist
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const categories = ['architectural', 'mesh_sheer', 'adornment', 'light_coverage'];
  categories.forEach(cat => {
    fs.mkdirSync(path.join(OUTPUT_DIR, cat), { recursive: true });
  });

  const results = [];
  let successCount = 0;
  let failCount = 0;

  console.log(`\n══════════════════════════════════════════════════════════════════════`);
  log(`💎 GENERATING ${SAFE_VARIANTS.length} EDITORIAL VARIANTS`);
  console.log(`══════════════════════════════════════════════════════════════════════\n`);

  for (let i = 0; i < SAFE_VARIANTS.length; i++) {
    const variant = SAFE_VARIANTS[i];
    const timestamp = Date.now();
    const categoryDir = variant.category.toLowerCase().replace(' ', '_');
    const outputPath = path.join(OUTPUT_DIR, categoryDir, `${variant.id}_${timestamp}.png`);

    console.log(`──────────────────────────────────────────────────────────────────────`);
    log(`💎 [${i + 1}/${SAFE_VARIANTS.length}] ${variant.name}`);
    log(`   Category: ${variant.category}`);

    const prompt = buildPrompt(variant);

    try {
      // Refresh token every 4 images
      if (i > 0 && i % 4 === 0) {
        log('   🔄 Refreshing OAuth token...');
        oauthToken = await getOAuthToken();
      }

      const result = await generateImage(prompt, outputPath, oauthToken);
      const sizeMB = (result.size / 1024 / 1024).toFixed(2);
      log(`   ✅ Saved: ${path.basename(outputPath)} (${sizeMB} MB)`);

      results.push({
        id: variant.id,
        name: variant.name,
        category: variant.category,
        path: outputPath,
        size: result.size,
        status: 'success'
      });
      successCount++;
    } catch (error) {
      log(`   ❌ Failed: ${error.message.slice(0, 80)}`);
      results.push({
        id: variant.id,
        name: variant.name,
        category: variant.category,
        error: error.message,
        status: 'failed'
      });
      failCount++;

      // Longer wait after rate limit
      if (error.message.includes('429') || error.message.includes('Filtered')) {
        log(`   ⏳ Rate limited, waiting 90s...`);
        await new Promise(r => setTimeout(r, 90000));
      }
    }

    // Rate limit delay
    if (i < SAFE_VARIANTS.length - 1) {
      log(`   ⏳ Waiting 25s for rate limit...`);
      await new Promise(r => setTimeout(r, 25000));
    }
  }

  // Update manifest
  const manifestPath = path.join(OUTPUT_DIR, 'editorial-manifest.json');
  const manifest = {
    timestamp: new Date().toISOString(),
    series: 'Premium Editorial Variants',
    model: 'Fit Hourglass Indian Muse',
    strategy: 'Fashion-Forward Editorial',
    results
  };
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

  // Summary
  console.log(`\n══════════════════════════════════════════════════════════════════════`);
  console.log(`              EDITORIAL VARIANTS COMPLETE`);
  console.log(`══════════════════════════════════════════════════════════════════════`);
  console.log(`\n  ✅ Successful: ${successCount}`);
  console.log(`  ❌ Failed: ${failCount}`);
  console.log(`\n  Generated by category:`);

  const byCategory = {};
  results.filter(r => r.status === 'success').forEach(r => {
    if (!byCategory[r.category]) byCategory[r.category] = [];
    byCategory[r.category].push(r);
  });

  Object.entries(byCategory).forEach(([cat, items]) => {
    console.log(`     💎 ${cat}: ${items.length} images`);
    items.forEach(item => {
      const sizeMB = (item.size / 1024 / 1024).toFixed(2);
      console.log(`        📸 ${item.name} (${sizeMB} MB)`);
    });
  });

  console.log(`\n  Output directory: ${OUTPUT_DIR}`);
  log(`📋 Manifest: ${manifestPath}`);
  console.log(`══════════════════════════════════════════════════════════════════════\n`);
}

main().catch(console.error);
