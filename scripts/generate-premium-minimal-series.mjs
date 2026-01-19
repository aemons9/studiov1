#!/usr/bin/env node
/**
 * VERALABS Premium Series - Minimal Coverage Maximum Expression
 * Hybrid optimal logic with strategic direction
 * Imagen 4 Ultra - Gallery Quality
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const PROXY_URL = 'http://localhost:3001';
const OUTPUT_DIR = '/home/ecolex/version1/generated-premium-minimal';
const PROJECT_ID = 'zaranovel';
const LOCATION = 'us-central1';

// Fit Hourglass Indian Muse - Our Signature Model
const PREMIUM_MUSE = `Stunning Indian muse, 5'8" tall,
fit athletic voluptuous hourglass figure with dramatic statuesque curves,
bust 37DD", cinched waist 27", wide rounded hips 40",
toned sculpted thighs and shapely glutes,
sun-kissed bronze skin with luminous golden undertones glowing ethereally,
striking magnetic gaze with full sensual lips and dramatic cheekbones,
long flowing jet-black hair with natural tousled waves,
age 26, commanding confident presence, professional fashion model physique`;

// Hybrid Optimal Strategies - Minimal Coverage Maximum Expression
const PREMIUM_VARIANTS = [
  // SHADOW SCULPTED SERIES - Light as coverage
  {
    id: 'shadow_sculpted_1',
    name: 'Shadow Sculpted Silhouette',
    category: 'SHADOW COVERAGE',
    wardrobe: 'Artistic shadow coverage only - dramatic chiaroscuro shadows strategically concealing intimate areas while revealing sculpted hourglass silhouette, skin emerging from darkness like living marble',
    pose: 'Standing in dramatic contrapposto, weight on one hip emphasizing hourglass curves, arms raised creating elegant negative space, head tilted back in artistic ecstasy',
    lighting: 'Single dramatic spotlight from 45 degrees creating deep sculptural shadows, rim light outlining every curve, shadow bands as natural coverage',
    environment: 'Pure infinite black void, form emerging from darkness, museum-quality fine art setting',
    style: 'Bill Brandt surreal nudes meets Helmut Newton power, chiaroscuro mastery'
  },
  {
    id: 'shadow_sculpted_2',
    name: 'Venetian Shadow Dance',
    category: 'SHADOW COVERAGE',
    wardrobe: 'Venetian blind shadows creating natural stripe coverage across curvaceous form, alternating light and shadow bands strategically placed',
    pose: 'Profile view showing complete hourglass silhouette, one arm reaching upward, dramatic S-curve of spine, looking over shoulder',
    lighting: 'Venetian blind light casting dramatic horizontal stripes, warm golden light through slats, shadows providing artistic modesty',
    environment: 'Minimalist space with single window, afternoon light, intimate private atmosphere',
    style: 'Classic noir photography, Helmut Newton editorial sensuality'
  },

  // SILK CASCADE SERIES - Fabric as strategic coverage
  {
    id: 'silk_cascade_1',
    name: 'Liquid Gold Cascade',
    category: 'SILK DRAPING',
    wardrobe: 'Single length of champagne gold silk strategically cascading across body, minimal coverage maximum elegance, fabric caught mid-flow revealing sculpted form beneath',
    pose: 'Standing with silk draped from one shoulder, flowing diagonally across torso and hips, one hand holding fabric at hip, confident direct gaze',
    lighting: 'Golden hour warmth with luminous fabric glow, soft rim lighting, silk catching beautiful highlights',
    environment: 'Ethereal white infinity backdrop, floating fabric aesthetic, haute couture atmosphere',
    style: 'Irving Penn elegance meets Richard Avedon movement'
  },
  {
    id: 'silk_cascade_2',
    name: 'Midnight Silk Embrace',
    category: 'SILK DRAPING',
    wardrobe: 'Sheer black silk organza barely veiling curves, strategic draping across bust and hips, fabric transparency creating artistic suggestion rather than explicit reveal',
    pose: 'Reclining on side, silk pooling around curves, one knee raised, arm supporting head, intimate bedroom gaze through fabric',
    lighting: 'Warm ambient glow with selective highlights on silk, chiaroscuro depth, fabric luminosity',
    environment: 'Luxurious dark boudoir with velvet textures, intimate private setting',
    style: 'Peter Lindbergh raw intimacy, sensual sophistication'
  },

  // ARCHITECTURAL MINIMAL SERIES - Geometric strategic pieces
  {
    id: 'architectural_minimal_1',
    name: 'Single Line Architecture',
    category: 'ARCHITECTURAL',
    wardrobe: 'Ultra-minimal single continuous line design - thin architectural strap creating geometric pattern across body, strategic placement at key points only, negative space as design element',
    pose: 'Standing with arms at sides, weight shifted to emphasize hip curve, chin lifted confidently, body as canvas for architectural design',
    lighting: 'Clean studio lighting with subtle shadows defining form, rim light on silhouette',
    environment: 'Minimalist white studio, pure form against pure space, gallery installation aesthetic',
    style: 'Herb Ritts sculptural purity, geometric minimalism'
  },
  {
    id: 'architectural_minimal_2',
    name: 'Geometric Negative Space',
    category: 'ARCHITECTURAL',
    wardrobe: 'Architectural body harness with geometric straps creating abstract pattern, maximum negative space between minimal straps, form revealed through framework',
    pose: 'Arms raised above head creating elongated silhouette, slight twist at waist showing hourglass from dynamic angle, serene expression',
    lighting: 'Dramatic side lighting sculpting muscle definition, shadows in negative spaces',
    environment: 'Dark velvet backdrop, single dramatic light source, haute couture editorial',
    style: 'Helmut Newton architectural power, fashion-forward edge'
  },

  // MESH TRANSPARENCY SERIES - Sheer strategic coverage
  {
    id: 'mesh_transparency_1',
    name: 'Gossamer Veil',
    category: 'MESH SHEER',
    wardrobe: 'Ultra-sheer gossamer mesh bodysuit, fabric so delicate it appears as mist on skin, strategic gathering at intimate areas creating texture variation for modesty',
    pose: 'Elegant seated pose on sculptural chair, legs crossed at ankle, torso twisted showing curves, one arm draped over chair back',
    lighting: 'Soft diffused beauty lighting, mesh creating subtle texture on skin, luminous glow',
    environment: 'High-end photography studio, sculptural furniture, editorial luxury',
    style: 'Paolo Roversi ethereal beauty, soft focus romance'
  },
  {
    id: 'mesh_transparency_2',
    name: 'Crystalline Structure',
    category: 'MESH SHEER',
    wardrobe: 'Textured crystalline mesh creating prismatic effect on skin, geometric pattern providing strategic coverage through visual complexity rather than opacity',
    pose: 'Standing backlit showing silhouette through mesh, hands on hips, looking back over shoulder with smoldering confidence',
    lighting: 'Strong backlight creating silhouette, mesh diffracting light into patterns, rim lighting defining edges',
    environment: 'Studio with dramatic backlight setup, high fashion editorial mood',
    style: 'Nick Knight experimental edge, fashion-forward innovation'
  },

  // BODY ADORNMENT SERIES - Jewelry as coverage
  {
    id: 'body_adornment_1',
    name: 'Golden Chain Sculpture',
    category: 'ADORNMENT',
    wardrobe: 'Delicate gold body chains creating web-like pattern across torso, chains draped strategically, body as canvas for metallic art, minimal coverage through ornate design',
    pose: 'Standing in classical contrapposto, chains catching light with movement, arms slightly away from body to display adornment, regal presence',
    lighting: 'Warm golden lighting making chains glow, soft shadows on skin, metallic highlights',
    environment: 'Rich dark background, chains as focal point against skin, fine jewelry editorial',
    style: 'Classical Renaissance meets contemporary fashion jewelry'
  },
  {
    id: 'body_adornment_2',
    name: 'Pearl Cascade',
    category: 'ADORNMENT',
    wardrobe: 'Multiple strands of lustrous pearls draped across body in flowing patterns, strategic placement creating elegant coverage, pearls against bronze skin',
    pose: 'Reclining odalisque pose, pearls pooling and draping with gravity, one hand adjusting strand, serene classical expression',
    lighting: 'Soft beauty lighting making pearls luminous, warm skin tones, classical painting aesthetic',
    environment: 'Rich velvet draping, Old Master painting atmosphere, museum quality setting',
    style: 'Vermeer luminosity meets Klimt decoration'
  },

  // LIGHT PAINTING SERIES - Pure light as coverage
  {
    id: 'light_painting_1',
    name: 'Aurora Form',
    category: 'LIGHT COVERAGE',
    wardrobe: 'Body illuminated by projected colored light patterns, light itself creating coverage through visual abstraction, form defined by illumination',
    pose: 'Standing with arms extended gracefully, body as canvas for light projection, dynamic pose frozen in light',
    lighting: 'Multiple colored light projections creating abstract patterns on skin, strategic bright areas providing coverage',
    environment: 'Dark studio with projection equipment, experimental fine art setting',
    style: 'Contemporary light art photography, experimental technique'
  },
  {
    id: 'light_painting_2',
    name: 'Chiaroscuro Maximum',
    category: 'LIGHT COVERAGE',
    wardrobe: 'Pure dramatic lighting as only coverage - pools of light and deep shadow strategically placed, form emerging partially from complete darkness',
    pose: 'Dramatic arched back pose, selective body parts illuminated while others remain in shadow, artistic partial reveal',
    lighting: 'Extreme chiaroscuro with only strategic areas lit, rest in complete darkness, sculptural light placement',
    environment: 'Pure black void, form emerging from darkness, fine art gallery aesthetic',
    style: 'Caravaggio drama meets contemporary fine art nude'
  }
];

// Premium quality triggers
const QUALITY_PREFIX = `Award-winning museum-quality fine art photograph, gallery exhibition masterpiece.`;
const QUALITY_SUFFIX = `Shot on Phase One IQ4 150MP for exceptional detail. Masterful composition with perfect exposure. Professional color grading with cinematic depth. Photorealistic rendering with authentic skin texture.`;

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

function buildPremiumPrompt(variant) {
  return `${QUALITY_PREFIX}

MODEL: ${PREMIUM_MUSE}

CONCEPT: ${variant.name} - ${variant.category}

WARDROBE/COVERAGE: ${variant.wardrobe}

POSE: ${variant.pose}

LIGHTING: ${variant.lighting}

SETTING: ${variant.environment}

STYLE: ${variant.style}
Fine art boudoir photography with maximum artistic expression.
Minimal coverage through artistic strategy rather than explicit exposure.
Tasteful, sophisticated, gallery-worthy execution.

TECHNICAL: 85mm lens, f/1.8, shallow depth of field.
Full body composition emphasizing hourglass silhouette.

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
║        💎 PREMIUM MINIMAL COVERAGE SERIES 💎                             ║
║                                                                          ║
║     Minimal Coverage • Maximum Expression • Hybrid Optimal Logic         ║
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
  const specificCategory = args[0];
  const maxCount = parseInt(args[1]) || 12;

  // Filter by category if specified
  let variantsToGenerate = specificCategory
    ? PREMIUM_VARIANTS.filter(v => v.category.toLowerCase().includes(specificCategory.toLowerCase()) || v.id.includes(specificCategory))
    : PREMIUM_VARIANTS;

  variantsToGenerate = variantsToGenerate.slice(0, maxCount);

  if (variantsToGenerate.length === 0) {
    console.error(`❌ Category not found: ${specificCategory}`);
    console.log('Available: shadow, silk, architectural, mesh, adornment, light');
    process.exit(1);
  }

  const results = [];

  console.log(`\n${'═'.repeat(70)}`);
  log(`💎 GENERATING ${variantsToGenerate.length} PREMIUM MINIMAL VARIANTS`);
  console.log(`${'═'.repeat(70)}`);

  for (let i = 0; i < variantsToGenerate.length; i++) {
    const variant = variantsToGenerate[i];
    const timestamp = Date.now();

    // Create category subdirectory
    const categoryDir = path.join(OUTPUT_DIR, variant.category.toLowerCase().replace(/\s+/g, '_'));
    if (!fs.existsSync(categoryDir)) {
      fs.mkdirSync(categoryDir, { recursive: true });
    }

    const outputPath = path.join(categoryDir, `${variant.id}_${timestamp}.png`);
    const prompt = buildPremiumPrompt(variant);

    console.log(`\n${'─'.repeat(70)}`);
    log(`💎 [${i + 1}/${variantsToGenerate.length}] ${variant.name}`);
    log(`   Category: ${variant.category}`);

    try {
      const result = await generateImage(prompt, outputPath, oauthToken);
      log(`   ✅ Saved: ${path.basename(outputPath)} (${(result.size / 1024 / 1024).toFixed(2)} MB)`);
      results.push({
        id: variant.id,
        name: variant.name,
        category: variant.category,
        path: outputPath,
        size: result.size,
        status: 'success'
      });

      // Rate limit delay
      if (i < variantsToGenerate.length - 1) {
        log('   ⏳ Waiting 25s for rate limit...');
        await new Promise(r => setTimeout(r, 25000));
      }

    } catch (err) {
      log(`   ❌ Failed: ${err.message.slice(0, 80)}`);
      results.push({
        id: variant.id,
        name: variant.name,
        category: variant.category,
        error: err.message,
        status: 'failed'
      });

      if (err.message.includes('429')) {
        log('   ⏳ Rate limited, waiting 90s...');
        await new Promise(r => setTimeout(r, 90000));
      } else {
        await new Promise(r => setTimeout(r, 5000));
      }
    }
  }

  // Summary
  console.log(`\n${'═'.repeat(70)}`);
  console.log('              PREMIUM MINIMAL SERIES COMPLETE');
  console.log(`${'═'.repeat(70)}`);

  const successful = results.filter(r => r.status === 'success');
  const failed = results.filter(r => r.status === 'failed');

  console.log(`\n  ✅ Successful: ${successful.length}`);
  console.log(`  ❌ Failed: ${failed.length}`);

  if (successful.length > 0) {
    console.log('\n  Generated by category:');
    const byCategory = {};
    successful.forEach(r => {
      if (!byCategory[r.category]) byCategory[r.category] = [];
      byCategory[r.category].push(r);
    });
    for (const [cat, items] of Object.entries(byCategory)) {
      console.log(`     💎 ${cat}: ${items.length} images`);
      items.forEach(i => console.log(`        📸 ${i.name} (${(i.size / 1024 / 1024).toFixed(2)} MB)`));
    }
  }

  console.log(`\n  Output directory: ${OUTPUT_DIR}`);

  // Save manifest
  const manifestPath = path.join(OUTPUT_DIR, 'premium-minimal-manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    series: 'Premium Minimal Coverage Maximum Expression',
    model: 'Fit Hourglass Indian Muse',
    strategy: 'Hybrid Optimal Logic',
    results: results
  }, null, 2));
  log(`📋 Manifest: ${manifestPath}`);

  console.log(`${'═'.repeat(70)}\n`);
}

main().catch(err => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});
