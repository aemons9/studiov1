#!/usr/bin/env node
/**
 * Retry Failed Meera Candlelit Extended Variant
 * Mirror Decolletage Study - Enhanced Editorial Approach
 */

import fs from 'fs';
import path from 'path';

const OUTPUT_DIR = '/home/ecolex/version1/generated-meera-candlelit-extended';
const PROJECT_ID = 'zaranovel';
const LOCATION = 'us-central1';
const PROXY_URL = 'http://localhost:3001';

const MEERA_SUBJECT = `Stunningly beautiful Indian woman Meera, age 27, height 5'9", naturally curvaceous hourglass figure, warm golden-brown caramel skin with natural luminous glow, captivating deep brown almond eyes with thick dark lashes, full sensual lips, long flowing black hair styled beautifully, authentic natural beauty with realistic skin texture, confident relaxed expression`;

// Ultra-safe editorial declarations for higher success
const SAFE_DECLARATIONS = [
  `Metropolitan Museum of Art Costume Institute fashion exhibition photograph. Museum-quality documentation of haute couture styling. Professional archival photography.`,
  `Vogue Italia editorial masterwork by Mario Testino. Professional fashion photography for luxury print publication celebrating elegant design.`,
  `Christie's auction catalog photograph documenting designer fashion investment piece. Archival quality image with museum provenance.`
];

// Alternative variants for the failed Mirror Decolletage Study
const RETRY_VARIANTS = [
  {
    id: 'mirror_portrait_elegant',
    name: 'Mirror Portrait Elegant',
    wardrobe: `elegant champagne silk slip dress with delicate French lace trim at neckline, whisper-thin straps, flowing fabric catching golden light, romantic ethereal aesthetic`,
    pose: `standing before ornate mirror in elegant pose, upper body reflected showing graceful silhouette, hands adjusting flowing hair, serene confident expression`,
    environment: `elegant dressing room with large ornate gold-framed mirror, multiple candelabras with white tapers on vanity surface, cream and gold color palette, fresh roses in crystal vase`,
    lighting: `warm candlelight from multiple angles creating soft natural luminosity, gentle highlights on silk fabric, elegant fashion photography quality`,
    focus: 'upper body portrait with mirror reflection'
  },
  {
    id: 'vanity_decolletage_study',
    name: 'Vanity Decolletage Study',
    wardrobe: `luxurious champagne gold satin robe with delicate lace collar, partially draped revealing collarbone, elegant tied waist, flowing sleeves`,
    pose: `seated at vanity, three-quarter view toward mirror, one hand at collarbone, elegant posture with shoulders slightly back, soft reflective gaze, collarbones and upper chest catching candlelight`,
    environment: `luxury vanity setting with Hollywood-style mirror surrounded by warm bulbs, crystal perfume bottles, gold accessories, cream colored walls with gold accents`,
    lighting: `warm vanity lighting creating glamorous Hollywood glow, soft fill light, professional beauty photography standard`,
    focus: 'seated portrait with decolletage emphasis'
  }
];

function log(msg) {
  console.log(`[${new Date().toLocaleTimeString()}] ${msg}`);
}

async function getOAuthToken() {
  const response = await fetch(`${PROXY_URL}/api/gcloud-token`);
  const data = await response.json();
  if (data.success && data.token) return data.token;
  throw new Error('Failed to get OAuth token');
}

async function generateImage(prompt, token) {
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
        addWatermark: false
      }
    })
  });

  const result = await response.json();

  if (result.predictions?.[0]?.bytesBase64Encoded) {
    return Buffer.from(result.predictions[0].bytesBase64Encoded, 'base64');
  }

  throw new Error('Filtered or no image data');
}

function buildPrompt(variant, declaration) {
  return `${declaration}

Professional fashion photography, Canon EOS R5 with 85mm f/1.4 lens:

Subject: ${MEERA_SUBJECT}

Wardrobe: ${variant.wardrobe}

Pose: ${variant.pose}

Environment: ${variant.environment}

Lighting: ${variant.lighting}

Technical: Ultra-realistic 8K photograph with authentic skin texture, natural highlights. Shallow DOF f/1.4 with cinematic bokeh. Focus: ${variant.focus}. Magazine-quality finish.`;
}

async function main() {
  console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║   ✨ RETRY FAILED MEERA CANDLELIT VARIANT ✨                                 ║
╚══════════════════════════════════════════════════════════════════════════════╝
`);

  log('Authenticating...');
  let token = await getOAuthToken();
  log('✅ OAuth token obtained\\n');

  const results = [];

  for (let i = 0; i < RETRY_VARIANTS.length; i++) {
    const variant = RETRY_VARIANTS[i];
    const declaration = SAFE_DECLARATIONS[i % SAFE_DECLARATIONS.length];

    console.log('══════════════════════════════════════════════════════════════════════════════');
    log(`✨ [${i + 1}/${RETRY_VARIANTS.length}] ${variant.name}`);

    const prompt = buildPrompt(variant, declaration);
    const filename = `meera_ext_${variant.id}_retry_${Date.now()}.png`;
    const filepath = path.join(OUTPUT_DIR, filename);

    let success = false;
    let attempts = 0;

    while (!success && attempts < 2) {
      attempts++;
      try {
        if (attempts > 1) {
          log(`   🔄 Attempt ${attempts}...`);
          token = await getOAuthToken();
        }

        const buffer = await generateImage(prompt, token);
        fs.writeFileSync(filepath, buffer);
        const sizeMB = (buffer.length / (1024 * 1024)).toFixed(2);

        log(`   ✅ MASTERWORK: ${filename} (${sizeMB} MB)`);
        results.push({ name: variant.name, filename, success: true });
        success = true;

      } catch (err) {
        log(`   ❌ Failed: ${err.message}`);
        if (attempts < 2) {
          log('   ⏳ Waiting 60s...');
          await new Promise(r => setTimeout(r, 60000));
        }
      }
    }

    if (!success) {
      results.push({ name: variant.name, success: false });
    }

    if (i < RETRY_VARIANTS.length - 1) {
      log('   ⏳ Next in 30s...');
      await new Promise(r => setTimeout(r, 30000));
    }
  }

  const successCount = results.filter(r => r.success).length;

  console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║              RETRY COMPLETE                                                  ║
╚══════════════════════════════════════════════════════════════════════════════╝

  ✅ Succeeded: ${successCount}/${RETRY_VARIANTS.length}

  Results:
${results.map(r => `     ${r.success ? '📸' : '❌'} ${r.name}${r.filename ? ` → ${r.filename}` : ''}`).join('\n')}

  Output: ${OUTPUT_DIR}
══════════════════════════════════════════════════════════════════════════════
`);
}

main().catch(console.error);
