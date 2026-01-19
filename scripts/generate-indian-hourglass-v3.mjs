#!/usr/bin/env node

/**
 * INDIAN HOURGLASS AMALGAMATIVE EXCELLENCE V3
 * Using correct API endpoint and parameters from successful cabin script
 */

import fs from 'fs';
import path from 'path';

const OUTPUT_DIR = '/home/ecolex/version1/generated-indian-hourglass-amalgamative';
const PROJECT_ID = 'zaranovel';
const LOCATION = 'us-central1';
const PROXY_URL = 'http://localhost:3001';

// Ensure directories exist
['contrast', 'true_amalgamation', 'luxury'].forEach(type => {
  const dir = path.join(OUTPUT_DIR, type);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// ═══════════════════════════════════════════════════════════════════════════
// STREAMLINED VARIANTS
// ═══════════════════════════════════════════════════════════════════════════

const VARIANTS = [
  // CONTRAST AMALGAMATION - Black on Cream (Reference Match)
  {
    id: 'black_fishnet_warm',
    type: 'contrast',
    name: 'Black Fishnet Floral - Warm Lamp',
    prompt: `Award-winning boudoir photography by Mario Testino, Hasselblad medium format, beautiful Indian woman late 20s with voluptuous hourglass figure, dramatic curves with full bust and wide hips, rich warm brown skin with golden undertones and visible pores, long flowing black wavy hair, dark brown eyes with smoky makeup, full lips with deep red lipstick, confident radiant smile, gold drop earrings, wearing elegant black fishnet lace bodysuit with intricate floral applique patterns and long sleeves, deep plunging neckline, form-fitting silhouette accentuating curves, reclining elegantly on cream upholstered chaise lounge with ivory satin pillow, one arm on armrest, legs extended, direct gaze at camera, luxurious private room with dark charcoal walls, polished brass desk lamp providing warm golden glow, dark wood side table, framed artwork, sophisticated intimate atmosphere, warm ambient lighting, shallow DOF f/1.8, photorealistic, 8K`
  },
  {
    id: 'black_fishnet_dramatic',
    type: 'contrast',
    name: 'Black Fishnet Floral - Dramatic',
    prompt: `Award-winning boudoir photography by Helmut Newton, Hasselblad medium format, beautiful Indian woman late 20s with voluptuous hourglass figure, dramatic curves with full bust and wide hips, rich warm brown skin with golden undertones and visible pores, long flowing black wavy hair, dark brown eyes with smoky makeup, full lips with deep red lipstick, confident radiant smile, gold drop earrings, wearing elegant black fishnet lace bodysuit with intricate floral applique patterns and long sleeves, deep plunging neckline, form-fitting silhouette, reclining elegantly on cream upholstered chaise lounge with ivory satin pillow, one arm on armrest, legs extended, direct gaze at camera, luxurious private room with dark charcoal walls, brass accents, dark wood furniture, framed artwork, dramatic single source side lighting with deep shadows, rim light on curves, chiaroscuro effect, cinematic mood, shallow DOF f/1.8, photorealistic, 8K`
  },
  {
    id: 'black_baroque_candlelight',
    type: 'contrast',
    name: 'Black Baroque Mesh - Candlelight',
    prompt: `Award-winning boudoir photography, Hasselblad medium format, beautiful Indian woman late 20s with voluptuous hourglass figure, dramatic curves with full bust and wide hips, rich warm brown skin with golden undertones and visible pores, long flowing black wavy hair, dark brown eyes with smoky makeup, full lips with deep red lipstick, confident radiant smile, gold drop earrings, wearing sophisticated black baroque mesh bodysuit with ornate scrollwork patterns, sheer mesh panels, long sleeves with bell cuff detail, sweetheart neckline, reclining elegantly on cream upholstered chaise lounge with ivory satin pillow, one arm on armrest, legs extended, direct gaze at camera, luxurious private room with dark charcoal walls, brass accents, dark wood furniture, warm candlelight flickering nearby creating golden dancing light on skin, intimate romantic atmosphere, shallow DOF f/1.8, photorealistic, 8K`
  },
  {
    id: 'black_baroque_ambient',
    type: 'contrast',
    name: 'Black Baroque Mesh - Soft Ambient',
    prompt: `Award-winning boudoir photography, Hasselblad medium format, beautiful Indian woman late 20s with voluptuous hourglass figure, dramatic curves with full bust and wide hips, rich warm brown skin with golden undertones and visible pores, long flowing black wavy hair, dark brown eyes with smoky makeup, full lips with deep red lipstick, confident radiant smile, gold drop earrings, wearing sophisticated black baroque mesh bodysuit with ornate scrollwork patterns, sheer mesh panels, long sleeves with bell cuff detail, sweetheart neckline, reclining elegantly on cream upholstered chaise lounge with ivory satin pillow, one arm on armrest, legs extended, direct gaze at camera, luxurious private room with dark charcoal walls, brass desk lamp, dark wood furniture, framed artwork, soft diffused ambient lighting with even illumination and gentle shadows, flattering beauty lighting, shallow DOF f/1.8, photorealistic, 8K`
  },

  // TRUE AMALGAMATION - Cream/Ivory on Cream
  {
    id: 'cream_lace_warm',
    type: 'true_amalgamation',
    name: 'Cream French Lace - Warm Lamp',
    prompt: `Award-winning boudoir photography by Mario Testino, Hasselblad medium format, beautiful Indian woman late 20s with voluptuous hourglass figure, dramatic curves with full bust and wide hips, rich warm brown skin with golden undertones and visible pores, long flowing black wavy hair, dark brown eyes with smoky makeup, full lips with deep red lipstick, confident radiant smile, gold drop earrings, wearing delicate cream French Chantilly lace bodysuit with intricate floral patterns in soft ivory, scalloped edges, long sleeves with sheer lace, cream lace blending seamlessly with cream furniture, reclining elegantly on cream upholstered chaise lounge with ivory satin pillow, one arm on armrest, legs extended, direct gaze at camera, luxurious private room with dark charcoal walls, polished brass desk lamp providing warm golden glow, dark wood side table, elegant monochromatic cream palette, shallow DOF f/1.8, photorealistic, 8K`
  },
  {
    id: 'cream_lace_dramatic',
    type: 'true_amalgamation',
    name: 'Cream French Lace - Dramatic',
    prompt: `Award-winning boudoir photography by Helmut Newton, Hasselblad medium format, beautiful Indian woman late 20s with voluptuous hourglass figure, dramatic curves with full bust and wide hips, rich warm brown skin with golden undertones and visible pores, long flowing black wavy hair, dark brown eyes with smoky makeup, full lips with deep red lipstick, confident radiant smile, gold drop earrings, wearing delicate cream French Chantilly lace bodysuit with intricate floral patterns in soft ivory, scalloped edges, long sleeves with sheer lace, cream lace matching furniture, reclining elegantly on cream upholstered chaise lounge with ivory satin pillow, one arm on armrest, legs extended, direct gaze at camera, luxurious private room with dark charcoal walls, brass accents, dramatic single source side lighting with deep shadows, rim light on curves, chiaroscuro effect, shallow DOF f/1.8, photorealistic, 8K`
  },
  {
    id: 'ivory_silk_candlelight',
    type: 'true_amalgamation',
    name: 'Ivory Silk Overlay - Candlelight',
    prompt: `Award-winning boudoir photography, Hasselblad medium format, beautiful Indian woman late 20s with voluptuous hourglass figure, dramatic curves with full bust and wide hips, rich warm brown skin with golden undertones and visible pores, long flowing black wavy hair, dark brown eyes with smoky makeup, full lips with deep red lipstick, confident radiant smile, gold drop earrings, wearing ivory silk teddy with delicate lace overlay, cream silk base with sheer ivory lace top layer, floral lace trim at neckline and hem, thin straps, silk catching warm light, matching ivory satin pillow tones, reclining elegantly on cream upholstered chaise lounge, one arm on armrest, legs extended, direct gaze at camera, luxurious private room with dark charcoal walls, warm candlelight flickering nearby creating golden dancing light on silk fabric, intimate romantic atmosphere, shallow DOF f/1.8, photorealistic, 8K`
  },
  {
    id: 'ivory_silk_ambient',
    type: 'true_amalgamation',
    name: 'Ivory Silk Overlay - Soft Ambient',
    prompt: `Award-winning boudoir photography, Hasselblad medium format, beautiful Indian woman late 20s with voluptuous hourglass figure, dramatic curves with full bust and wide hips, rich warm brown skin with golden undertones and visible pores, long flowing black wavy hair, dark brown eyes with smoky makeup, full lips with deep red lipstick, confident radiant smile, gold drop earrings, wearing ivory silk teddy with delicate lace overlay, cream silk base with sheer ivory lace top layer, floral lace trim at neckline and hem, thin straps, silk catching warm light, reclining elegantly on cream upholstered chaise lounge with ivory satin pillow matching silk teddy, one arm on armrest, legs extended, direct gaze at camera, luxurious private room with dark charcoal walls, brass desk lamp, soft diffused ambient lighting with even illumination and gentle shadows, flattering beauty lighting, shallow DOF f/1.8, photorealistic, 8K`
  },

  // LUXURY AMALGAMATION - Gold/Champagne on Cream
  {
    id: 'gold_lace_warm',
    type: 'luxury',
    name: 'Gold Metallic Lace - Warm Lamp',
    prompt: `Award-winning boudoir photography by Mario Testino, Hasselblad medium format, beautiful Indian woman late 20s with voluptuous hourglass figure, dramatic curves with full bust and wide hips, rich warm brown skin with golden undertones and visible pores, long flowing black wavy hair, dark brown eyes with smoky makeup, full lips with deep red lipstick, confident radiant smile, gold drop earrings, wearing stunning gold metallic lace bodysuit with intricate baroque patterns in shimmering gold thread, warm metallic finish, long sleeves with scalloped cuffs, plunging neckline, gold harmonizing with brass accents, reclining elegantly on cream upholstered chaise lounge with ivory satin pillow, one arm on armrest, legs extended, direct gaze at camera, luxurious private room with dark charcoal walls, polished brass desk lamp harmonizing with gold lace, dark wood side table, luxury metallic amalgamation, shallow DOF f/1.8, photorealistic, 8K`
  },
  {
    id: 'gold_lace_dramatic',
    type: 'luxury',
    name: 'Gold Metallic Lace - Dramatic',
    prompt: `Award-winning boudoir photography by Helmut Newton, Hasselblad medium format, beautiful Indian woman late 20s with voluptuous hourglass figure, dramatic curves with full bust and wide hips, rich warm brown skin with golden undertones and visible pores, long flowing black wavy hair, dark brown eyes with smoky makeup, full lips with deep red lipstick, confident radiant smile, gold drop earrings, wearing stunning gold metallic lace bodysuit with intricate baroque patterns in shimmering gold thread, warm metallic finish, long sleeves with scalloped cuffs, plunging neckline, reclining elegantly on cream upholstered chaise lounge with ivory satin pillow, one arm on armrest, legs extended, direct gaze at camera, luxurious private room with dark charcoal walls, brass accents, dramatic single source side lighting highlighting metallic gold threads, deep shadows, rim light on curves, chiaroscuro effect, shallow DOF f/1.8, photorealistic, 8K`
  },
  {
    id: 'champagne_mesh_candlelight',
    type: 'luxury',
    name: 'Champagne Sequin Mesh - Candlelight',
    prompt: `Award-winning boudoir photography, Hasselblad medium format, beautiful Indian woman late 20s with voluptuous hourglass figure, dramatic curves with full bust and wide hips, rich warm brown skin with golden undertones and visible pores, long flowing black wavy hair, dark brown eyes with smoky makeup, full lips with deep red lipstick, confident radiant smile, gold drop earrings, wearing luxurious champagne gold sequined mesh bodysuit with delicate gold sequins catching light, sheer mesh base in warm champagne tone, strategic sequin clusters, long sleeves, deep V neckline, reclining elegantly on cream upholstered chaise lounge with ivory satin pillow, one arm on armrest, legs extended, direct gaze at camera, luxurious private room with dark charcoal walls, warm candlelight flickering nearby, sequins sparkling in golden candlelight, intimate romantic luxury atmosphere, shallow DOF f/1.8, photorealistic, 8K`
  },
  {
    id: 'champagne_mesh_ambient',
    type: 'luxury',
    name: 'Champagne Sequin Mesh - Soft Ambient',
    prompt: `Award-winning boudoir photography, Hasselblad medium format, beautiful Indian woman late 20s with voluptuous hourglass figure, dramatic curves with full bust and wide hips, rich warm brown skin with golden undertones and visible pores, long flowing black wavy hair, dark brown eyes with smoky makeup, full lips with deep red lipstick, confident radiant smile, gold drop earrings, wearing luxurious champagne gold sequined mesh bodysuit with delicate gold sequins catching light, sheer mesh base in warm champagne tone, strategic sequin clusters, long sleeves, deep V neckline, reclining elegantly on cream upholstered chaise lounge with ivory satin pillow, one arm on armrest, legs extended, direct gaze at camera, luxurious private room with dark charcoal walls, brass desk lamp, soft diffused ambient lighting with subtle sequin shimmer, even illumination and gentle shadows, shallow DOF f/1.8, photorealistic, 8K`
  }
];

// ═══════════════════════════════════════════════════════════════════════════
// VERTEX AI GENERATION - Using correct endpoint from cabin script
// ═══════════════════════════════════════════════════════════════════════════

async function getOAuthToken() {
  try {
    const response = await fetch(`${PROXY_URL}/api/gcloud-token`);
    const data = await response.json();
    if (data.success && data.token) return data.token;
  } catch (e) {}
  throw new Error('Failed to get OAuth token');
}

async function generateImage(prompt, outputPath, oauthToken) {
  const endpoint = `publishers/google/models/imagen-4.0-ultra-generate-001:predict`;
  const url = `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/${endpoint}`;

  const requestBody = {
    instances: [{ prompt }],
    parameters: {
      sampleCount: 1,
      aspectRatio: '1:1',
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

// ═══════════════════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════════════════

async function main() {
  console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║         ✨ INDIAN HOURGLASS AMALGAMATIVE EXCELLENCE V3 ✨                    ║
║                                                                              ║
║    Reference: Reclining on Cream Chaise • Black Fishnet Lace                ║
║    Model: Indian Hourglass • Voluptuous Confidence                          ║
║                                                                              ║
║    CONTRAST: Black Lace on Cream (4 variants)                               ║
║    TRUE AMALGAMATION: Cream/Ivory on Cream (4 variants)                     ║
║    LUXURY: Gold/Champagne on Cream (4 variants)                             ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
  `);

  console.log(`[${new Date().toLocaleTimeString()}] Authenticating with Vertex AI...`);
  let token = await getOAuthToken();
  console.log(`[${new Date().toLocaleTimeString()}] ✅ OAuth token obtained\n`);

  console.log('══════════════════════════════════════════════════════════════════════════════');
  console.log(`[${new Date().toLocaleTimeString()}] ✨ GENERATING ${VARIANTS.length} AMALGAMATIVE VARIANTS`);
  console.log('══════════════════════════════════════════════════════════════════════════════\n');

  const results = { successful: [], failed: [] };

  for (let i = 0; i < VARIANTS.length; i++) {
    const variant = VARIANTS[i];

    if (i > 0 && i % 4 === 0) {
      console.log(`[${new Date().toLocaleTimeString()}] 🔄 Refreshing OAuth token...`);
      token = await getOAuthToken();
    }

    console.log('──────────────────────────────────────────────────────────────────────────────');
    console.log(`[${new Date().toLocaleTimeString()}] ✨ [${i + 1}/${VARIANTS.length}] ${variant.name}`);
    console.log(`[${new Date().toLocaleTimeString()}]    Type: ${variant.type}`);

    const filename = `indian_${variant.id}_${i}_${Date.now()}.png`;
    const filepath = path.join(OUTPUT_DIR, variant.type, filename);

    try {
      const result = await generateImage(variant.prompt, filepath, token);
      const sizeMB = (result.size / (1024 * 1024)).toFixed(2);

      console.log(`[${new Date().toLocaleTimeString()}]    ✅ Saved: ${filename} (${sizeMB} MB)`);
      results.successful.push({ ...variant, filename, sizeMB, filepath });

    } catch (error) {
      console.log(`[${new Date().toLocaleTimeString()}]    ❌ Failed: ${error.message}`);
      results.failed.push({ ...variant, error: error.message });

      if (error.message.includes('Filtered') || error.message.includes('429')) {
        console.log(`[${new Date().toLocaleTimeString()}]    ⏳ Waiting 90s for rate limit...`);
        await new Promise(r => setTimeout(r, 90000));
      }
    }

    console.log(`[${new Date().toLocaleTimeString()}]    ⏳ Waiting 25s for rate limit...`);
    await new Promise(r => setTimeout(r, 25000));
  }

  // Summary
  console.log('\n══════════════════════════════════════════════════════════════════════════════');
  console.log('              INDIAN HOURGLASS AMALGAMATIVE COMPLETE');
  console.log('══════════════════════════════════════════════════════════════════════════════\n');

  console.log(`  ✅ Successful: ${results.successful.length}`);
  console.log(`  ❌ Failed: ${results.failed.length}`);

  const byType = {};
  for (const img of results.successful) {
    if (!byType[img.type]) byType[img.type] = [];
    byType[img.type].push(img);
  }

  for (const [type, images] of Object.entries(byType)) {
    console.log(`\n     📁 ${type.toUpperCase()}: ${images.length} images`);
    for (const img of images) {
      console.log(`        📸 ${img.name} (${img.sizeMB} MB)`);
    }
  }

  console.log(`\n  Output: ${OUTPUT_DIR}`);
  console.log('══════════════════════════════════════════════════════════════════════════════\n');

  // Save manifest
  const manifest = {
    collection: 'Indian Hourglass Amalgamative Excellence V3',
    generated: new Date().toISOString(),
    successful: results.successful.length,
    failed: results.failed.length,
    images: results.successful,
    failures: results.failed
  };

  fs.writeFileSync(path.join(OUTPUT_DIR, 'manifest.json'), JSON.stringify(manifest, null, 2));
  console.log(`[${new Date().toLocaleTimeString()}] 📋 Manifest saved\n`);
}

main().catch(console.error);
