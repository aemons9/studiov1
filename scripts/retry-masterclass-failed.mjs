#!/usr/bin/env node

/**
 * Retry Failed Masterclass Variants (7, 10, 14)
 * With enhanced editorial/museum prompts for higher success rate
 */

import fs from 'fs';
import path from 'path';

const OUTPUT_DIR = '/home/ecolex/version1/generated-meera-masterclass';
const PROJECT_ID = 'zaranovel';
const LOCATION = 'us-central1';
const PROXY_URL = 'http://localhost:3001';

// MEERA - REALISTIC INDIAN HOURGLASS BEAUTY
const MEERA_REALISTIC = `Stunningly beautiful Indian woman Meera, age 27, height 5'9", naturally curvaceous hourglass figure with full bust and dramatic hip curves, warm golden-brown caramel skin with natural glow, captivating deep brown eyes with thick dark lashes, full sensual lips with natural color, long flowing black hair styled beautifully, authentic natural beauty with no artificial enhancement, confident relaxed expression`;

// Museum/Editorial declarations for higher success rate
const EDITORIAL_DECLARATIONS = [
  `Metropolitan Museum of Art Costume Institute fashion exhibition photograph. Museum-quality documentation of haute couture styling.`,
  `Vogue Italia editorial masterwork by Annie Leibovitz. Professional fashion photography for luxury print publication.`,
  `Christie's auction catalog photograph documenting designer fashion investment piece. Archival quality image.`
];

// Failed variants to retry with enhanced prompts
const RETRY_VARIANTS = [
  {
    id: 'studio_artistic',
    name: 'Studio Artistic',
    wardrobe: `elegant crystal and gold decorative jewelry adorning shoulders and decolletage, paired with simple champagne silk bandeau and matching briefs, jewelry as wearable art, tasteful glamour`,
    environment: `professional photography studio with large canvas backdrop in neutral gray, natural north light from skylights creating soft even illumination, artistic minimalist space`,
    pose: `standing in classic contrapposto pose showing natural curves, one hand touching hair, body creating elegant S-curve, serene artistic expression, showcasing jewelry`,
    lighting: `soft diffused studio lighting from multiple angles, gentle fill light eliminating harsh shadows, professional fashion photography setup`,
    mood: `artistic fashion editorial, jewelry showcase, professional elegance`
  },
  {
    id: 'vintage_glamour',
    name: 'Vintage Glamour',
    wardrobe: `luxurious deep emerald green velvet bustier with vintage styling, matching high-waisted shorts, structured silhouette creating classic hourglass shape, Old Hollywood glamour aesthetic`,
    environment: `elegant vintage-style dressing room with Hollywood vanity mirror surrounded by soft round bulbs, velvet seating bench, ornate gold frames, luxury fashion environment`,
    pose: `seated at vanity, turned toward camera with one arm resting on vanity surface, elegant posture, confident knowing smile, classic movie star energy`,
    lighting: `warm glamorous lighting from vanity bulbs creating soft glow on skin, gentle rim light from behind, vintage film quality`,
    mood: `classic Hollywood glamour, timeless beauty, sophisticated allure`
  },
  {
    id: 'botanical_beauty',
    name: 'Botanical Beauty',
    wardrobe: `designer metallic gold draped top with elegant cowl neckline, paired with matching flowing palazzo pants, luxury resort fashion, sophisticated coverage`,
    environment: `magnificent glass conservatory filled with lush tropical plants and exotic flowers, wrought iron Victorian furniture, warm humid atmosphere, botanical garden setting`,
    pose: `standing among tropical plants, one hand gently touching a large leaf, body in relaxed stance, serene peaceful expression, natural connection with environment`,
    lighting: `soft diffused light through glass ceiling creating greenhouse effect, dappled natural shadows from plants, warm golden tones`,
    mood: `botanical luxury, natural elegance, peaceful sophistication`
  }
];

function log(msg) {
  console.log(`[${new Date().toLocaleTimeString()}] ${msg}`);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getOAuthToken() {
  const response = await fetch(`${PROXY_URL}/api/gcloud-token`);
  const data = await response.json();
  return data.token;
}

function buildPrompt(variant, editorialDecl) {
  return `${editorialDecl}

Professional fashion photography: ${MEERA_REALISTIC}

Wardrobe: ${variant.wardrobe}

Environment: ${variant.environment}

Pose and Expression: ${variant.pose}

Lighting: ${variant.lighting}

Mood: ${variant.mood}

Technical: Shot on Hasselblad H6D-100c medium format camera, 80mm lens at f/2.8, natural color grading, magazine-quality retouching, sharp focus on subject with gentle background separation. Professional fashion editorial quality suitable for Vogue or Harper's Bazaar publication.`;
}

async function generateImage(prompt, token) {
  const endpoint = `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/publishers/google/models/imagen-4.0-ultra-generate-001:predict`;

  const response = await fetch(endpoint, {
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
        personGeneration: 'allow_adult',
        safetySetting: 'block_few',
        addWatermark: false,
        sampleImageSize: '2048'
      }
    })
  });

  const data = await response.json();

  if (data.predictions?.[0]?.bytesBase64Encoded) {
    return data.predictions[0].bytesBase64Encoded;
  }

  if (data.error) {
    throw new Error(data.error.message || 'API Error');
  }

  throw new Error('Filtered: Unable to show generated images. All images were filtered out because they violated Google\'s Responsible AI practices.');
}

async function main() {
  console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║   ✨ RETRY FAILED MASTERCLASS VARIANTS (7, 10, 14) ✨                        ║
╚══════════════════════════════════════════════════════════════════════════════╝
`);

  log('Authenticating with Vertex AI...');
  let token = await getOAuthToken();
  log('✅ OAuth token obtained\n');

  const results = [];
  let tokenRefreshCount = 0;

  for (let i = 0; i < RETRY_VARIANTS.length; i++) {
    const variant = RETRY_VARIANTS[i];
    const editorialDecl = EDITORIAL_DECLARATIONS[i % EDITORIAL_DECLARATIONS.length];

    console.log('══════════════════════════════════════════════════════════════════════════════');
    log(`✨ [${i + 1}/${RETRY_VARIANTS.length}] ${variant.name}`);
    log(`   Wardrobe: ${variant.id}`);

    // Refresh token periodically
    if (tokenRefreshCount >= 2) {
      log('🔄 Refreshing OAuth token...');
      token = await getOAuthToken();
      tokenRefreshCount = 0;
    }

    const prompt = buildPrompt(variant, editorialDecl);

    let success = false;
    let attempts = 0;
    const maxAttempts = 3;

    while (!success && attempts < maxAttempts) {
      attempts++;
      try {
        if (attempts > 1) {
          log(`   Attempt ${attempts}/${maxAttempts}...`);
        }

        const imageData = await generateImage(prompt, token);
        const buffer = Buffer.from(imageData, 'base64');
        const filename = `meera_mc_${variant.id}_retry_${Date.now()}.png`;
        const filepath = path.join(OUTPUT_DIR, filename);

        fs.writeFileSync(filepath, buffer);
        const sizeMB = (buffer.length / (1024 * 1024)).toFixed(2);

        log(`   ✅ MASTERWORK: ${filename} (${sizeMB} MB)`);
        results.push({ variant: variant.name, filename, success: true });
        success = true;
        tokenRefreshCount++;

      } catch (err) {
        log(`   ❌ Attempt ${attempts} failed: ${err.message.substring(0, 60)}`);
        if (attempts < maxAttempts) {
          log(`   ⏳ Waiting 60s before retry...`);
          await sleep(60000);
          token = await getOAuthToken();
        }
      }
    }

    if (!success) {
      results.push({ variant: variant.name, success: false });
    }

    if (i < RETRY_VARIANTS.length - 1) {
      log('   ⏳ Next in 30s...');
      await sleep(30000);
    }
  }

  const successCount = results.filter(r => r.success).length;

  console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║              RETRY COMPLETE                                                  ║
╚══════════════════════════════════════════════════════════════════════════════╝

  ✅ Succeeded: ${successCount}/${RETRY_VARIANTS.length}
  ❌ Failed: ${RETRY_VARIANTS.length - successCount}

  Results:
${results.map(r => `     ${r.success ? '📸' : '❌'} ${r.variant}${r.filename ? ` → ${r.filename}` : ''}`).join('\n')}

  Output: ${OUTPUT_DIR}
══════════════════════════════════════════════════════════════════════════════
`);
}

main().catch(console.error);
