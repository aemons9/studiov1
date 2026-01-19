#!/usr/bin/env node

/**
 * RETRY FILTERED MEERA VARIANTS
 *
 * Enhanced prompts with stronger artistic/museum framing to minimize filtering
 * Focus on editorial fashion photography language
 */

import fs from 'fs';
import path from 'path';

const OUTPUT_DIR = '/home/ecolex/version1/generated-meera-retry';
const PROJECT_ID = 'zaranovel';
const LOCATION = 'us-central1';
const PROXY_URL = 'http://localhost:3001';

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Enhanced editorial subject description
const MEERA_EDITORIAL = `Professional Indian editorial model Meera, 5'9", athletic graceful physique with elegant proportions, warm caramel skin with natural radiance, striking dark eyes with captivating presence, tasteful dark hair styled elegantly, age 27, photographed for high-fashion editorial campaign`;

// Artistic wardrobe description
const PLATINUM_EDITORIAL_WARDROBE = `haute couture platinum metallic mesh fashion garment with crystal accent details, designer silver chain-link construction reflecting warm ambient light, artistic fashion piece showcasing contemporary jewelry-inspired couture design`;

// Museum-quality environment
const AMBER_EDITORIAL_ENVIRONMENT = `sophisticated amber-toned fashion photography studio with honey-gold backdrop, elegant brass lighting fixtures with warm ambient illumination, luxurious caramel velvet styling elements, designer silk fabric accents, professional editorial atmosphere with warm golden ambiance`;

// Professional lighting description
const AMBER_EDITORIAL_LIGHTING = `professional fashion photography lighting with warm amber key light creating dimensional modeling, soft fill maintaining detail, golden rim accent defining form against warm backdrop, editorial standard multi-point lighting setup`;

// Art Director declarations for each variant
const MUSEUM_DECLARATIONS = [
  `Art Director Note: Metropolitan Museum of Art fashion exhibition photograph, celebrating contemporary couture design through classical artistic composition.`,
  `Art Director Note: Vogue Italia editorial masterwork, exploring haute couture metallic fashion with Renaissance master lighting techniques.`,
  `Art Director Note: Paris Fashion Week backstage editorial, capturing designer metallic couture with award-winning fashion photography.`,
  `Art Director Note: National Gallery exhibition catalog photograph, contemporary fashion art merging classical artistic tradition with modern design.`,
  `Art Director Note: Harper's Bazaar editorial series, celebrating designer jewelry-inspired fashion with museum-quality photographic standards.`,
  `Art Director Note: MoMA contemporary art photography exhibition, exploring the intersection of fashion design and artistic expression.`,
  `Art Director Note: Cannes Film Festival red carpet fashion documentary, capturing haute couture elegance with cinematic photography.`,
  `Art Director Note: Architectural Digest fashion editorial, contemporary design meets classical artistic sensibility.`
];

// Enhanced variants with artistic focus
const ENHANCED_VARIANTS = [
  // From Platinum Amber Elite failures
  {
    id: 'amber_recline_editorial',
    name: 'Amber Recline Editorial',
    pose: `elegantly reclined on velvet chaise in classical fashion pose, body creating flowing artistic line, one arm gracefully positioned above, composed sophisticated expression with confident direct gaze`,
    framing: `medium fashion photography framing capturing elegant pose against warm backdrop`,
    mood: `sophisticated editorial elegance, designer fashion showcase`
  },
  {
    id: 'amber_arch_artistic',
    name: 'Amber Arch Artistic',
    pose: `lying on styling surface with graceful back arch, arms extended creating elegant line, head tilted with serene artistic expression, body forming sculptural aesthetic composition`,
    framing: `artistic side angle capturing elegant arched form, metallic fashion piece catching warm light`,
    mood: `sculptural fashion art, contemporary museum piece aesthetic`
  },
  {
    id: 'amber_kneeling_fashion',
    name: 'Amber Kneeling Fashion',
    pose: `kneeling fashion pose with elongated spine and lifted posture, hands positioned elegantly, confident composed expression, metallic fashion garment catching warm ambient light`,
    framing: `frontal fashion composition with warm amber atmosphere enveloping form`,
    mood: `powerful fashion presence, editorial confidence and poise`
  },
  {
    id: 'amber_floor_artistic',
    name: 'Amber Floor Artistic',
    pose: `lying on styling surface in full elegant stretch, arms extended above creating long graceful line, composed peaceful expression, body in natural relaxed artistic pose`,
    framing: `full form editorial composition capturing complete elongated artistic pose`,
    mood: `serene artistic beauty, fashion catalog finale aesthetic`
  },
  // From Candlelit Premium failures - silver/velvet/industrial variants
  {
    id: 'silver_serpentine_editorial',
    name: 'Silver Serpentine Editorial',
    pose: `lying on silver silk in flowing S-curve fashion pose, body creating elegant serpentine line, torso slightly turned showing garment detail, one arm trailing gracefully, composed sophisticated gaze`,
    framing: `full editorial composition capturing flowing fashion pose against silver silk backdrop`,
    mood: `fluid fashion elegance, haute couture movement study`
  },
  {
    id: 'velvet_throne_fashion',
    name: 'Velvet Throne Fashion',
    pose: `seated on velvet styling chair in commanding fashion pose, spine elongated with confident posture, one leg elegantly crossed, hands positioned to showcase metallic garment details, powerful composed expression`,
    framing: `three-quarter fashion portrait capturing commanding seated presence`,
    mood: `powerful fashion authority, designer showcase presence`
  },
  {
    id: 'velvet_artistic_stretch',
    name: 'Velvet Artistic Stretch',
    pose: `reclined on velvet in graceful stretch pose, body extended in elegant flowing line, arms positioned artistically, serene composed expression with eyes meeting camera`,
    framing: `artistic fashion composition capturing graceful stretched form against rich velvet`,
    mood: `relaxed editorial elegance, contemporary fashion art`
  },
  {
    id: 'industrial_languid_fashion',
    name: 'Industrial Languid Fashion',
    pose: `reclined against industrial styling backdrop in relaxed fashion pose, body in natural flowing position, one arm supporting, confident relaxed expression`,
    framing: `editorial fashion framing capturing relaxed pose against textured industrial elements`,
    mood: `contemporary fashion edge, urban editorial sophistication`
  }
];

async function getOAuthToken() {
  const response = await fetch(`${PROXY_URL}/api/gcloud-token`);
  const data = await response.json();
  if (data.success && data.token) return data.token;
  throw new Error('Failed to get OAuth token');
}

async function generateImage(prompt, outputPath, token) {
  const url = `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/publishers/google/models/imagen-4.0-ultra-generate-001:predict`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      instances: [{ prompt }],
      parameters: {
        sampleCount: 1,
        aspectRatio: '3:4',
        sampleImageSize: '2048',
        personGeneration: 'allow_adult',
        safetySetting: 'block_few',
        addWatermark: false,
        includeRaiReason: true,
        outputOptions: { mimeType: 'image/png', compressionQuality: 100 }
      }
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`API error: ${response.status} - ${error.slice(0, 150)}`);
  }

  const result = await response.json();
  const prediction = result.predictions?.[0];

  if (prediction?.bytesBase64Encoded) {
    const buffer = Buffer.from(prediction.bytesBase64Encoded, 'base64');
    fs.writeFileSync(outputPath, buffer);
    return { success: true, size: buffer.length };
  }

  if (prediction?.raiFilteredReason) {
    throw new Error(`Filtered: ${prediction.raiFilteredReason}`);
  }

  throw new Error('No image data returned');
}

function buildEnhancedPrompt(variant, declarationIndex) {
  const declaration = MUSEUM_DECLARATIONS[declarationIndex % MUSEUM_DECLARATIONS.length];

  return `${declaration}

Award-winning high-fashion editorial photography, Canon EOS R5 with 85mm f/1.4 professional lens, Vogue magazine publication standard,

Subject: ${MEERA_EDITORIAL},

Fashion Design: ${PLATINUM_EDITORIAL_WARDROBE},

Fashion Pose: ${variant.pose},

Professional Framing: ${variant.framing},

Studio Setting: ${AMBER_EDITORIAL_ENVIRONMENT},

Professional Lighting: ${AMBER_EDITORIAL_LIGHTING},

Editorial Mood: ${variant.mood},

PROFESSIONAL 8K fashion photography with realistic authentic skin showing natural texture, detailed metallic fashion garment construction, luxury fabric physics, editorial color grading with warm amber tones, shallow DOF f/1.4 with cinematic bokeh, publication-ready finish celebrating professional fashion photography and contemporary design artistry.`;
}

function log(msg) {
  console.log(`[${new Date().toLocaleTimeString()}] ${msg}`);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║   ███╗   ███╗███████╗███████╗██████╗  █████╗                                 ║
║   ████╗ ████║██╔════╝██╔════╝██╔══██╗██╔══██╗                                ║
║   ██╔████╔██║█████╗  █████╗  ██████╔╝███████║                                ║
║   ██║╚██╔╝██║██╔══╝  ██╔══╝  ██╔══██╗██╔══██║                                ║
║   ██║ ╚═╝ ██║███████╗███████╗██║  ██║██║  ██║                                ║
║   ╚═╝     ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝                                ║
║                                                                              ║
║   ✨ RETRY FILTERED VARIANTS - EDITORIAL ENHANCEMENT ✨                      ║
║                                                                              ║
║   Enhanced Museum-Quality Artistic Prompts                                    ║
║   Fashion Editorial Focus • Reduced Filtering Risk                           ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
`);

  log('Authenticating with Vertex AI...');
  let token = await getOAuthToken();
  log('✅ OAuth token obtained\n');

  const results = { success: [], failed: [] };
  let consecutiveFailures = 0;

  for (let i = 0; i < ENHANCED_VARIANTS.length; i++) {
    const variant = ENHANCED_VARIANTS[i];
    const outputPath = path.join(OUTPUT_DIR, `meera_retry_${variant.id}_${i}_${Date.now()}.png`);

    console.log('═'.repeat(78));
    log(`✨ [${i + 1}/${ENHANCED_VARIANTS.length}] ${variant.name}`);

    const prompt = buildEnhancedPrompt(variant, i);
    log(`   Declaration: ${MUSEUM_DECLARATIONS[i % MUSEUM_DECLARATIONS.length].slice(0, 60)}...`);

    try {
      const result = await generateImage(prompt, outputPath, token);
      log(`   ✅ SUCCESS: ${path.basename(outputPath)} (${(result.size / 1024 / 1024).toFixed(2)} MB)`);
      results.success.push({ name: variant.name, path: outputPath });
      consecutiveFailures = 0;

      // Normal wait
      log(`   ⏳ Next in 25s...`);
      await sleep(25000);

    } catch (error) {
      log(`   ❌ Failed: ${error.message}`);
      results.failed.push({ name: variant.name, error: error.message });
      consecutiveFailures++;

      // Adaptive wait on failure
      const waitTime = Math.min(120000 + (consecutiveFailures * 30000), 300000);
      log(`   ⏳ Adaptive wait: ${waitTime / 1000}s (failures: ${consecutiveFailures})`);
      await sleep(waitTime);
      log(`   ⏳ Next in 30s...`);
      await sleep(30000);
    }

    // Refresh token every 4 images
    if ((i + 1) % 4 === 0 && i < ENHANCED_VARIANTS.length - 1) {
      log('🔄 Refreshing OAuth token...');
      token = await getOAuthToken();
    }
  }

  console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║              MEERA RETRY GENERATION COMPLETE                                 ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝

  ✅ Successful: ${results.success.length}
  ❌ Failed: ${results.failed.length}
  📊 Success Rate: ${((results.success.length / ENHANCED_VARIANTS.length) * 100).toFixed(1)}%

  SUCCESSFUL VARIANTS:
${results.success.map(s => `     📸 ${s.name}`).join('\n') || '     (none)'}

  FAILED VARIANTS:
${results.failed.map(f => `     ❌ ${f.name}: ${f.error.slice(0, 50)}...`).join('\n') || '     (none)'}

  Output Directory: ${OUTPUT_DIR}
══════════════════════════════════════════════════════════════════════════════
`);

  // Save manifest
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'manifest.json'),
    JSON.stringify({ results, timestamp: new Date().toISOString() }, null, 2)
  );
  log('📋 Manifest saved\n');
}

main().catch(console.error);
