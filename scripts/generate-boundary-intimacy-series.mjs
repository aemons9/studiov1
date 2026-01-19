#!/usr/bin/env node
/**
 * VERALABS Boundary-Pushing Intimacy Series Generator
 * Combines Imagen Ultra Optimizer strategies with Seductress Archetypes
 * Using optimized prompts for maximum artistic expression
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const PROXY_URL = 'http://localhost:3001';
const OUTPUT_DIR = '/home/ecolex/version1/generated-boundary-intimacy';
const PROJECT_ID = 'zaranovel';
const LOCATION = 'us-central1';

// Imagen 4 Quality Triggers (from imagenUltraOptimizer)
const QUALITY_TRIGGERS = {
  masterpiece: ['award-winning photograph', 'museum-quality', 'professionally photographed'],
  gallery: ['fine art photography', 'gallery exhibition quality', 'artistic masterwork']
};

// Indian Model Descriptors for boundary-pushing mode
const INDIAN_MODEL_BOUNDARY = {
  skinTone: 'sun-kissed bronze skin with luminous golden undertones',
  features: 'striking Indian features with captivating magnetic gaze, full sensual lips, dramatic cheekbones',
  figure: 'dramatic statuesque curves with fit athletic hourglass silhouette, bust 37DD, waist 27, hips 40'
};

// Base fit hourglass model description
const FIT_HOURGLASS_MUSE = `Stunning Indian muse, 5'8" tall, with fit athletic voluptuous hourglass figure,
bust 37DD", waist 27", hips 40", toned sculpted curves,
${INDIAN_MODEL_BOUNDARY.skinTone},
${INDIAN_MODEL_BOUNDARY.features},
long flowing jet-black hair with natural waves,
age 26, professional fashion model physique with dramatic statuesque presence`;

// Seductress Archetypes (from indianModelArchetypes.ts) - Intimacy Levels 7-10
const SEDUCTRESS_ARCHETYPES = [
  {
    id: 'editorial_sensuality',
    name: 'Editorial Sensuality',
    intimacyLevel: 7,
    physique: 'Hourglass silhouette emphasized through graphic mesh patterns and architectural seaming',
    skinFinish: 'Cool cinematic tones with desaturated palette and selective warm skin accents',
    expression: 'Intense smoldering gaze with dramatic S-curve pose, editorial boldness',
    styleContext: 'Helmut Newton neo-noir sensuality, dramatic shadows, powerful compositions',
    wardrobe: 'Graphic editorial mesh piece with sheer panels, architectural lines creating geometric patterns on skin, bold cut-outs following body contours',
    pose: 'Dramatic S-curve pose with intense smoldering gaze, one hand on hip emphasizing hourglass, head tilted with confidence',
    lighting: 'Neo-noir dramatic lighting with deep shadows and selective highlights, rim light defining silhouette',
    environment: 'Minimalist dark studio with venetian blind shadows, film noir atmosphere'
  },
  {
    id: 'intimate_artistry',
    name: 'Intimate Artistry',
    intimacyLevel: 8,
    physique: 'Sculptural framework with geometric straps revealing hourglass form through negative space',
    skinFinish: 'Warm cinematic with glowing highlights and rich shadows, pronounced skin luminosity',
    expression: 'Sensual artistic expression with dramatic arch, intimate minimalism',
    styleContext: 'Herb Ritts sculptural form studies, geometric composition, body as architecture',
    wardrobe: 'Architectural bodysuit with transparent mesh elements, geometric straps creating negative space, minimal strategic coverage highlighting curves',
    pose: 'Dramatic arched back pose revealing sculptural form, arms raised above head creating elegant lines, serene artistic expression',
    lighting: 'Sculptural studio lighting with dramatic side light, chiaroscuro effect defining every contour',
    environment: 'Pure black void with single dramatic light source, gallery-quality fine art setting'
  },
  {
    id: 'high_concept_seduction',
    name: 'High Concept Seduction',
    intimacyLevel: 9,
    physique: 'Pure graphic lines with hourglass silhouette sculpted by light, shadow, and minimal straps',
    skinFinish: 'High contrast with warm skin tones emerging from darkness',
    expression: 'Sculptural beauty with dancer-inspired flexibility, seductive artistic grace',
    styleContext: 'Peter Lindbergh raw intimacy, powerful simplicity, emotional connection',
    wardrobe: 'Minimalist architectural single-line design with strategic draping, gossamer fabric with artistic coverage, haute couture intimate piece',
    pose: 'Elegant reclining pose on silk fabrics, one knee raised showing sculpted thigh, arms creating artistic frame, intimate bedroom gaze',
    lighting: 'Peter Lindbergh natural soft lighting with high contrast, raw intimacy, beautiful skin texture',
    environment: 'Luxurious private boudoir with silk sheets in champagne gold, warm ambient glow'
  },
  {
    id: 'maximum_expression',
    name: 'Maximum Expression',
    intimacyLevel: 10,
    physique: 'Natural hourglass sculpted by delicate body chains and minimal adornments',
    skinFinish: 'Warm natural tones with glowing highlights, silver gelatin print aesthetic',
    expression: 'Classical fine art composition with odalisque-inspired pose, timeless museum quality',
    styleContext: 'Helmut Newton boldness meets fine art nude photography, museum quality composition',
    wardrobe: 'Ultra-minimal mesh foundation with delicate gold chain accents, strategic shadow coverage, artistic fabric draping across intimate areas',
    pose: 'Classical odalisque-inspired recline, showing full silhouette from side, one arm supporting head, rounded curves prominently displayed',
    lighting: 'Classical painting lighting with warm golden tones, Rembrandt-style shadows, museum-quality illumination',
    environment: 'Renaissance-inspired setting with rich velvet draping, dark luxurious backdrop, timeless classical atmosphere'
  },
  {
    id: 'pure_artistry',
    name: 'Pure Artistry',
    intimacyLevel: 10,
    physique: 'Form sculpted purely by light and shadow with silk draping, hourglass emerges from darkness',
    skinFinish: 'Rich warm tones like classical paintings, dramatic black and white with velvety blacks',
    expression: 'Transcendent artistic beauty with Renaissance-inspired pose, timeless classical composition',
    styleContext: 'Bill Brandt surreal nudes, Edward Weston form studies, Old Master painting lighting',
    wardrobe: 'Conceptual art wardrobe using shadow and silk as coverage, strategic light placement creating natural modesty, artistic fabric cascade',
    pose: 'Standing profile showing complete hourglass silhouette, back arched dramatically, looking over shoulder with transcendent expression',
    lighting: 'Old Master painting lighting with dramatic chiaroscuro, form emerging from pure darkness, sculptural illumination',
    environment: 'Pure black void with single shaft of golden light, fine art studio, timeless museum setting'
  }
];

// Strategy variants for each archetype (from executive muse strategies)
const STYLE_STRATEGIES = [
  { id: 'cinematic', prefix: 'Hyperrealistic cinematic tableau, museum-worthy fine art composition.', suffix: 'Captured on Phase One IQ4 150MP for unparalleled depth and tonal subtlety.' },
  { id: 'sculptural', prefix: 'Sculptural fine art study, treating the form as living marble.', suffix: 'Documented on Medium Format Pentax 645Z for monumental scale and fidelity.' },
  { id: 'romantic', prefix: 'Romantic fine art reverie, infused with soft passion and grace.', suffix: 'Rendered on Nikon Z9 with 85mm f/1.4 for velvety bokeh and emotional resonance.' },
  { id: 'minimalist', prefix: 'Stark minimalist composition, focusing on pure form and essence.', suffix: 'Captured on Sony A1 with 50mm f/1.2 for razor-sharp, unadorned precision.' }
];

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

function buildOptimizedPrompt(archetype, strategy) {
  const qualityTriggers = QUALITY_TRIGGERS.masterpiece.join(', ');

  return `${strategy.prefix}

${qualityTriggers}.

MODEL: ${FIT_HOURGLASS_MUSE}
Physique emphasis: ${archetype.physique}
Skin finish: ${archetype.skinFinish}

POSE: ${archetype.pose}
Expression: ${archetype.expression}

WARDROBE: ${archetype.wardrobe}

LIGHTING: ${archetype.lighting}

SETTING: ${archetype.environment}

STYLE: ${archetype.styleContext}
Fine art boudoir photography with masterpiece quality execution.
Shot in the style of ${archetype.intimacyLevel >= 9 ? 'Helmut Newton and Peter Lindbergh' : 'Irving Penn and Herb Ritts'}.

TECHNICAL: 35mm lens, f/2.0, intimate viewer perspective, full-body frame.
Photorealistic rendering with authentic skin texture and fabric physics.
Professional color grading with cinematic depth.

${strategy.suffix}`;
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
║        🔥 BOUNDARY-PUSHING INTIMACY SERIES 🔥                            ║
║                                                                          ║
║     Fit Hourglass Muse • Seductress Archetypes • Imagen 4 Ultra          ║
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
  const specificArchetype = args[0];
  const maxPerArchetype = parseInt(args[1]) || 1;

  // Filter archetypes if specified
  let archetypesToGenerate = specificArchetype
    ? SEDUCTRESS_ARCHETYPES.filter(a => a.id.includes(specificArchetype))
    : SEDUCTRESS_ARCHETYPES;

  if (archetypesToGenerate.length === 0) {
    console.error(`❌ Archetype not found: ${specificArchetype}`);
    console.log('Available: editorial_sensuality, intimate_artistry, high_concept_seduction, maximum_expression, pure_artistry');
    process.exit(1);
  }

  const results = [];
  let totalGenerated = 0;

  console.log(`\n${'═'.repeat(70)}`);
  log(`🔥 GENERATING BOUNDARY-PUSHING INTIMACY SERIES`);
  log(`   Archetypes: ${archetypesToGenerate.length}`);
  log(`   Strategies per archetype: ${Math.min(maxPerArchetype, STYLE_STRATEGIES.length)}`);
  console.log(`${'═'.repeat(70)}`);

  for (const archetype of archetypesToGenerate) {
    // Create archetype subdirectory
    const archetypeDir = path.join(OUTPUT_DIR, archetype.id);
    if (!fs.existsSync(archetypeDir)) {
      fs.mkdirSync(archetypeDir, { recursive: true });
    }

    console.log(`\n${'─'.repeat(70)}`);
    log(`🎭 ARCHETYPE: ${archetype.name} (Intimacy Level ${archetype.intimacyLevel})`);
    log(`   Style: ${archetype.styleContext.slice(0, 60)}...`);
    console.log(`${'─'.repeat(70)}`);

    const strategiesToUse = STYLE_STRATEGIES.slice(0, maxPerArchetype);

    for (const strategy of strategiesToUse) {
      const timestamp = Date.now();
      const outputPath = path.join(archetypeDir, `${archetype.id}_${strategy.id}_${timestamp}.png`);
      const prompt = buildOptimizedPrompt(archetype, strategy);

      log(`   📸 Strategy: ${strategy.id}`);

      try {
        const result = await generateImage(prompt, outputPath, oauthToken);
        log(`   ✅ Saved: ${path.basename(outputPath)} (${(result.size / 1024 / 1024).toFixed(2)} MB)`);
        results.push({
          archetype: archetype.name,
          archetypeId: archetype.id,
          intimacyLevel: archetype.intimacyLevel,
          strategy: strategy.id,
          path: outputPath,
          size: result.size,
          status: 'success'
        });
        totalGenerated++;

        // Rate limit delay
        log('   ⏳ Waiting 25s for rate limit...');
        await new Promise(r => setTimeout(r, 25000));

      } catch (err) {
        log(`   ❌ Failed: ${err.message.slice(0, 80)}`);
        results.push({
          archetype: archetype.name,
          archetypeId: archetype.id,
          strategy: strategy.id,
          error: err.message,
          status: 'failed'
        });

        if (err.message.includes('429')) {
          log('   ⏳ Rate limited, waiting 90s...');
          await new Promise(r => setTimeout(r, 90000));
        } else if (err.message.includes('Filtered')) {
          await new Promise(r => setTimeout(r, 5000));
        }
      }
    }
  }

  // Summary
  console.log(`\n${'═'.repeat(70)}`);
  console.log('              BOUNDARY-PUSHING SERIES COMPLETE');
  console.log(`${'═'.repeat(70)}`);

  const successful = results.filter(r => r.status === 'success');
  const failed = results.filter(r => r.status === 'failed');

  console.log(`\n  ✅ Successful: ${successful.length}`);
  console.log(`  ❌ Failed: ${failed.length}`);

  if (successful.length > 0) {
    console.log('\n  Generated images by archetype:');
    const byArchetype = {};
    successful.forEach(r => {
      if (!byArchetype[r.archetype]) byArchetype[r.archetype] = [];
      byArchetype[r.archetype].push(r);
    });
    for (const [name, items] of Object.entries(byArchetype)) {
      console.log(`     🎭 ${name}: ${items.length} images`);
      items.forEach(i => console.log(`        📸 ${i.strategy} (${(i.size / 1024 / 1024).toFixed(2)} MB)`));
    }
  }

  console.log(`\n  Output directory: ${OUTPUT_DIR}`);

  // Save manifest
  const manifestPath = path.join(OUTPUT_DIR, 'boundary-intimacy-manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    series: 'Boundary-Pushing Intimacy',
    model: 'Fit Hourglass Indian Muse',
    optimizer: 'imagenUltraOptimizer + Seductress Archetypes',
    results: results
  }, null, 2));
  log(`📋 Manifest: ${manifestPath}`);

  console.log(`${'═'.repeat(70)}\n`);
}

main().catch(err => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});
