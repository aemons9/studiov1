#!/usr/bin/env node

/**
 * INDIAN HOURGLASS AMALGAMATIVE EXCELLENCE V2
 * Streamlined prompts based on successful cabin generation
 */

import fs from 'fs';
import path from 'path';

const OUTPUT_DIR = '/home/ecolex/version1/generated-indian-hourglass-amalgamative';

// Ensure directories exist
['contrast', 'true_amalgamation', 'luxury'].forEach(type => {
  const dir = path.join(OUTPUT_DIR, type);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// ═══════════════════════════════════════════════════════════════════════════
// STREAMLINED VARIANTS - Proven prompt structure
// ═══════════════════════════════════════════════════════════════════════════

const VARIANTS = [
  // CONTRAST AMALGAMATION - Black on Cream (Reference Match)
  {
    id: 'black_fishnet_warm',
    type: 'contrast',
    name: 'Black Fishnet Floral - Warm Lamp',
    prompt: `Award-winning boudoir photography, Hasselblad medium format,

Beautiful Indian woman late 20s, voluptuous hourglass figure with dramatic curves, full bust and wide hips with defined waist, rich warm brown skin with golden undertones, long flowing black wavy hair cascading over shoulders, dark brown eyes with smoky makeup, full lips with deep red lipstick, confident radiant smile, gold drop earrings, visible pores and natural skin texture, matte natural finish NO artificial sheen,

wearing elegant black fishnet lace bodysuit with intricate floral applique patterns, long sleeves with scalloped edges, deep plunging neckline, form-fitting silhouette accentuating hourglass curves,

reclining elegantly on cream upholstered chaise lounge, one arm resting on armrest, legs extended, knees slightly bent, torso angled toward camera, confident direct gaze with genuine smile,

luxurious private room with dark charcoal walls, ivory satin pillow, polished brass desk lamp providing warm golden glow, dark wood side table, framed artwork, sophisticated intimate atmosphere,

warm ambient lighting from brass lamp, soft shadows, Mario Testino aesthetic, shallow DOF f/1.8, photorealistic, 8K`
  },
  {
    id: 'black_fishnet_dramatic',
    type: 'contrast',
    name: 'Black Fishnet Floral - Dramatic',
    prompt: `Award-winning boudoir photography, Hasselblad medium format,

Beautiful Indian woman late 20s, voluptuous hourglass figure with dramatic curves, full bust and wide hips with defined waist, rich warm brown skin with golden undertones, long flowing black wavy hair cascading over shoulders, dark brown eyes with smoky makeup, full lips with deep red lipstick, confident radiant smile, gold drop earrings, visible pores and natural skin texture, matte natural finish NO artificial sheen,

wearing elegant black fishnet lace bodysuit with intricate floral applique patterns, long sleeves with scalloped edges, deep plunging neckline, form-fitting silhouette accentuating hourglass curves,

reclining elegantly on cream upholstered chaise lounge, one arm resting on armrest, legs extended, knees slightly bent, torso angled toward camera, confident direct gaze with genuine smile,

luxurious private room with dark charcoal walls, ivory satin pillow, polished brass desk lamp, dark wood side table, framed artwork, sophisticated intimate atmosphere,

dramatic single source side lighting, deep shadows, rim light on curves, chiaroscuro effect, cinematic mood, Helmut Newton aesthetic, shallow DOF f/1.8, photorealistic, 8K`
  },
  {
    id: 'black_baroque_candlelight',
    type: 'contrast',
    name: 'Black Baroque Mesh - Candlelight',
    prompt: `Award-winning boudoir photography, Hasselblad medium format,

Beautiful Indian woman late 20s, voluptuous hourglass figure with dramatic curves, full bust and wide hips with defined waist, rich warm brown skin with golden undertones, long flowing black wavy hair cascading over shoulders, dark brown eyes with smoky makeup, full lips with deep red lipstick, confident radiant smile, gold drop earrings, visible pores and natural skin texture, matte natural finish NO artificial sheen,

wearing sophisticated black baroque mesh bodysuit with ornate scrollwork patterns, sheer mesh panels between baroque motifs, long sleeves with bell cuff detail, sweetheart neckline, high-waisted design,

reclining elegantly on cream upholstered chaise lounge, one arm resting on armrest, legs extended, torso angled toward camera, confident direct gaze with genuine smile,

luxurious private room with dark charcoal walls, ivory satin pillow, brass accents, dark wood furniture, framed artwork, sophisticated intimate atmosphere,

warm candlelight flickering nearby, golden dancing light on skin, intimate romantic atmosphere, soft focus background, shallow DOF f/1.8, photorealistic, 8K`
  },
  {
    id: 'black_baroque_ambient',
    type: 'contrast',
    name: 'Black Baroque Mesh - Soft Ambient',
    prompt: `Award-winning boudoir photography, Hasselblad medium format,

Beautiful Indian woman late 20s, voluptuous hourglass figure with dramatic curves, full bust and wide hips with defined waist, rich warm brown skin with golden undertones, long flowing black wavy hair cascading over shoulders, dark brown eyes with smoky makeup, full lips with deep red lipstick, confident radiant smile, gold drop earrings, visible pores and natural skin texture, matte natural finish NO artificial sheen,

wearing sophisticated black baroque mesh bodysuit with ornate scrollwork patterns, sheer mesh panels between baroque motifs, long sleeves with bell cuff detail, sweetheart neckline, high-waisted design,

reclining elegantly on cream upholstered chaise lounge, one arm resting on armrest, legs extended, torso angled toward camera, confident direct gaze with genuine smile,

luxurious private room with dark charcoal walls, ivory satin pillow, brass desk lamp, dark wood furniture, framed artwork, sophisticated intimate atmosphere,

soft diffused ambient lighting, even illumination, gentle shadows preserving depth, flattering beauty lighting, warm inviting atmosphere, shallow DOF f/1.8, photorealistic, 8K`
  },

  // TRUE AMALGAMATION - Cream/Ivory on Cream
  {
    id: 'cream_lace_warm',
    type: 'true_amalgamation',
    name: 'Cream French Lace - Warm Lamp',
    prompt: `Award-winning boudoir photography, Hasselblad medium format,

Beautiful Indian woman late 20s, voluptuous hourglass figure with dramatic curves, full bust and wide hips with defined waist, rich warm brown skin with golden undertones, long flowing black wavy hair cascading over shoulders, dark brown eyes with smoky makeup, full lips with deep red lipstick, confident radiant smile, gold drop earrings, visible pores and natural skin texture, matte natural finish NO artificial sheen,

wearing delicate cream French Chantilly lace bodysuit with intricate floral patterns in soft ivory, scalloped edges throughout, long sleeves with sheer lace, cream lace blending seamlessly with cream furniture,

reclining elegantly on cream upholstered chaise lounge, one arm resting on armrest, legs extended, knees slightly bent, torso angled toward camera, confident direct gaze with genuine smile,

luxurious private room with dark charcoal walls, ivory satin pillow, polished brass desk lamp providing warm golden glow, dark wood side table, framed artwork, sophisticated intimate atmosphere,

warm ambient lighting from brass lamp, soft shadows, elegant monochromatic cream palette, Mario Testino aesthetic, shallow DOF f/1.8, photorealistic, 8K`
  },
  {
    id: 'cream_lace_dramatic',
    type: 'true_amalgamation',
    name: 'Cream French Lace - Dramatic',
    prompt: `Award-winning boudoir photography, Hasselblad medium format,

Beautiful Indian woman late 20s, voluptuous hourglass figure with dramatic curves, full bust and wide hips with defined waist, rich warm brown skin with golden undertones, long flowing black wavy hair cascading over shoulders, dark brown eyes with smoky makeup, full lips with deep red lipstick, confident radiant smile, gold drop earrings, visible pores and natural skin texture, matte natural finish NO artificial sheen,

wearing delicate cream French Chantilly lace bodysuit with intricate floral patterns in soft ivory, scalloped edges throughout, long sleeves with sheer lace, cream lace blending seamlessly with cream furniture,

reclining elegantly on cream upholstered chaise lounge, one arm resting on armrest, legs extended, torso angled toward camera, confident direct gaze with genuine smile,

luxurious private room with dark charcoal walls, ivory satin pillow, brass accents, dark wood furniture, framed artwork, sophisticated intimate atmosphere,

dramatic single source side lighting, deep shadows, rim light on curves, chiaroscuro effect, Helmut Newton aesthetic, shallow DOF f/1.8, photorealistic, 8K`
  },
  {
    id: 'ivory_silk_candlelight',
    type: 'true_amalgamation',
    name: 'Ivory Silk Overlay - Candlelight',
    prompt: `Award-winning boudoir photography, Hasselblad medium format,

Beautiful Indian woman late 20s, voluptuous hourglass figure with dramatic curves, full bust and wide hips with defined waist, rich warm brown skin with golden undertones, long flowing black wavy hair cascading over shoulders, dark brown eyes with smoky makeup, full lips with deep red lipstick, confident radiant smile, gold drop earrings, visible pores and natural skin texture, matte natural finish NO artificial sheen,

wearing ivory silk teddy with delicate lace overlay, cream silk base with sheer ivory lace top layer, floral lace trim at neckline and hem, thin adjustable straps, silk catching warm light,

reclining elegantly on cream upholstered chaise lounge, one arm resting on armrest, legs extended, torso angled toward camera, confident direct gaze with genuine smile,

luxurious private room with dark charcoal walls, ivory satin pillow matching silk teddy, brass accents, dark wood furniture, framed artwork, sophisticated intimate atmosphere,

warm candlelight flickering nearby, golden dancing light on silk fabric, intimate romantic atmosphere, shallow DOF f/1.8, photorealistic, 8K`
  },
  {
    id: 'ivory_silk_ambient',
    type: 'true_amalgamation',
    name: 'Ivory Silk Overlay - Soft Ambient',
    prompt: `Award-winning boudoir photography, Hasselblad medium format,

Beautiful Indian woman late 20s, voluptuous hourglass figure with dramatic curves, full bust and wide hips with defined waist, rich warm brown skin with golden undertones, long flowing black wavy hair cascading over shoulders, dark brown eyes with smoky makeup, full lips with deep red lipstick, confident radiant smile, gold drop earrings, visible pores and natural skin texture, matte natural finish NO artificial sheen,

wearing ivory silk teddy with delicate lace overlay, cream silk base with sheer ivory lace top layer, floral lace trim at neckline and hem, thin adjustable straps, silk catching warm light,

reclining elegantly on cream upholstered chaise lounge, one arm resting on armrest, legs extended, torso angled toward camera, confident direct gaze with genuine smile,

luxurious private room with dark charcoal walls, ivory satin pillow matching silk teddy, brass desk lamp, dark wood furniture, framed artwork, sophisticated intimate atmosphere,

soft diffused ambient lighting, even illumination, gentle shadows, flattering beauty lighting, shallow DOF f/1.8, photorealistic, 8K`
  },

  // LUXURY AMALGAMATION - Gold/Champagne on Cream
  {
    id: 'gold_lace_warm',
    type: 'luxury',
    name: 'Gold Metallic Lace - Warm Lamp',
    prompt: `Award-winning boudoir photography, Hasselblad medium format,

Beautiful Indian woman late 20s, voluptuous hourglass figure with dramatic curves, full bust and wide hips with defined waist, rich warm brown skin with golden undertones, long flowing black wavy hair cascading over shoulders, dark brown eyes with smoky makeup, full lips with deep red lipstick, confident radiant smile, gold drop earrings, visible pores and natural skin texture, matte natural finish NO artificial sheen,

wearing stunning gold metallic lace bodysuit with intricate baroque patterns in shimmering gold thread, warm metallic finish, long sleeves with scalloped cuffs, plunging neckline,

reclining elegantly on cream upholstered chaise lounge, one arm resting on armrest, legs extended, torso angled toward camera, confident direct gaze with genuine smile,

luxurious private room with dark charcoal walls, ivory satin pillow, polished brass desk lamp harmonizing with gold lace, dark wood side table, framed artwork, sophisticated intimate atmosphere,

warm golden lighting from brass lamp, gold warmth harmonizing with cream and brass, luxury metallic amalgamation, shallow DOF f/1.8, photorealistic, 8K`
  },
  {
    id: 'gold_lace_dramatic',
    type: 'luxury',
    name: 'Gold Metallic Lace - Dramatic',
    prompt: `Award-winning boudoir photography, Hasselblad medium format,

Beautiful Indian woman late 20s, voluptuous hourglass figure with dramatic curves, full bust and wide hips with defined waist, rich warm brown skin with golden undertones, long flowing black wavy hair cascading over shoulders, dark brown eyes with smoky makeup, full lips with deep red lipstick, confident radiant smile, gold drop earrings, visible pores and natural skin texture, matte natural finish NO artificial sheen,

wearing stunning gold metallic lace bodysuit with intricate baroque patterns in shimmering gold thread, warm metallic finish, long sleeves with scalloped cuffs, plunging neckline,

reclining elegantly on cream upholstered chaise lounge, one arm resting on armrest, legs extended, torso angled toward camera, confident direct gaze with genuine smile,

luxurious private room with dark charcoal walls, ivory satin pillow, brass accents, dark wood furniture, framed artwork, sophisticated intimate atmosphere,

dramatic single source side lighting, deep shadows highlighting metallic gold threads, rim light on curves, chiaroscuro effect, Helmut Newton aesthetic, shallow DOF f/1.8, photorealistic, 8K`
  },
  {
    id: 'champagne_mesh_candlelight',
    type: 'luxury',
    name: 'Champagne Sequin Mesh - Candlelight',
    prompt: `Award-winning boudoir photography, Hasselblad medium format,

Beautiful Indian woman late 20s, voluptuous hourglass figure with dramatic curves, full bust and wide hips with defined waist, rich warm brown skin with golden undertones, long flowing black wavy hair cascading over shoulders, dark brown eyes with smoky makeup, full lips with deep red lipstick, confident radiant smile, gold drop earrings, visible pores and natural skin texture, matte natural finish NO artificial sheen,

wearing luxurious champagne gold sequined mesh bodysuit, delicate gold sequins catching light, sheer mesh base in warm champagne tone, strategic sequin clusters, long sleeves, deep V neckline,

reclining elegantly on cream upholstered chaise lounge, one arm resting on armrest, legs extended, torso angled toward camera, confident direct gaze with genuine smile,

luxurious private room with dark charcoal walls, ivory satin pillow, brass accents, dark wood furniture, framed artwork, sophisticated intimate atmosphere,

warm candlelight flickering nearby, sequins sparkling in golden candlelight, intimate romantic luxury atmosphere, shallow DOF f/1.8, photorealistic, 8K`
  },
  {
    id: 'champagne_mesh_ambient',
    type: 'luxury',
    name: 'Champagne Sequin Mesh - Soft Ambient',
    prompt: `Award-winning boudoir photography, Hasselblad medium format,

Beautiful Indian woman late 20s, voluptuous hourglass figure with dramatic curves, full bust and wide hips with defined waist, rich warm brown skin with golden undertones, long flowing black wavy hair cascading over shoulders, dark brown eyes with smoky makeup, full lips with deep red lipstick, confident radiant smile, gold drop earrings, visible pores and natural skin texture, matte natural finish NO artificial sheen,

wearing luxurious champagne gold sequined mesh bodysuit, delicate gold sequins catching light, sheer mesh base in warm champagne tone, strategic sequin clusters, long sleeves, deep V neckline,

reclining elegantly on cream upholstered chaise lounge, one arm resting on armrest, legs extended, torso angled toward camera, confident direct gaze with genuine smile,

luxurious private room with dark charcoal walls, ivory satin pillow, brass desk lamp, dark wood furniture, framed artwork, sophisticated intimate atmosphere,

soft diffused ambient lighting, even illumination, subtle sequin shimmer, gentle shadows, flattering beauty lighting, shallow DOF f/1.8, photorealistic, 8K`
  }
];

// ═══════════════════════════════════════════════════════════════════════════
// VERTEX AI GENERATION
// ═══════════════════════════════════════════════════════════════════════════

async function getOAuthToken() {
  const response = await fetch('http://localhost:3001/api/gcloud-token');
  if (!response.ok) throw new Error('Failed to get OAuth token');
  const data = await response.json();
  return data.token;
}

async function generateImage(prompt, token) {
  const projectId = 'zaranovel';
  const location = 'us-central1';
  const model = 'imagen-4.0-ultra-generate-001';

  const endpoint = `https://${location}-aiplatform.googleapis.com/v1/projects/${projectId}/locations/${location}/publishers/google/models/${model}:predictLongRunning`;

  const requestBody = {
    instances: [{ prompt }],
    parameters: {
      sampleCount: 1,
      aspectRatio: '1:1',
      outputOptions: { mimeType: 'image/png' },
      personGeneration: 'allow_adult',
      safetyFilterLevel: 'block_few'
    }
  };

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`API error: ${response.status} - ${error.substring(0, 100)}`);
  }

  const operation = await response.json();
  return pollOperation(operation.name, token);
}

async function pollOperation(operationName, token) {
  const pollUrl = `https://us-central1-aiplatform.googleapis.com/v1/${operationName}`;

  for (let i = 0; i < 60; i++) {
    await new Promise(r => setTimeout(r, 2000));

    const response = await fetch(pollUrl, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!response.ok) continue;

    const result = await response.json();

    if (result.done) {
      if (result.response?.predictions?.[0]?.bytesBase64Encoded) {
        return result.response.predictions[0].bytesBase64Encoded;
      }
      if (result.response?.predictions?.[0]?.filterResults) {
        throw new Error('Filtered: ' + JSON.stringify(result.response.predictions[0].filterResults).substring(0, 100));
      }
      throw new Error('No image data in response');
    }
  }
  throw new Error('Operation timeout');
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════════════════

async function main() {
  console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║         ✨ INDIAN HOURGLASS AMALGAMATIVE EXCELLENCE V2 ✨                    ║
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

    try {
      const imageData = await generateImage(variant.prompt, token);
      const buffer = Buffer.from(imageData, 'base64');

      const filename = `indian_${variant.id}_${i}_${Date.now()}.png`;
      const filepath = path.join(OUTPUT_DIR, variant.type, filename);

      fs.writeFileSync(filepath, buffer);
      const sizeMB = (buffer.length / (1024 * 1024)).toFixed(2);

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
    collection: 'Indian Hourglass Amalgamative Excellence V2',
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
