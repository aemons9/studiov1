#!/usr/bin/env node

/**
 * INDIAN HOURGLASS AMALGAMATIVE EXCELLENCE
 *
 * Reference: Reclining on cream chaise with black fishnet lace bodysuit
 * Model: Indian hourglass variant - voluptuous, confident
 * Approach: Amalgamative Excellence (wardrobe complementing/matching surface)
 *
 * Variants:
 * 1. Black Lace on Cream (contrast amalgamation) - matching reference
 * 2. Cream/Ivory Lace on Cream (true amalgamation)
 * 3. Gold/Champagne on Cream (luxury amalgamation)
 */

import fs from 'fs';
import path from 'path';

const OUTPUT_DIR = '/home/ecolex/version1/generated-indian-hourglass-amalgamative';

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// ═══════════════════════════════════════════════════════════════════════════
// INDIAN HOURGLASS MODEL - EXACT SPECIFICATION
// ═══════════════════════════════════════════════════════════════════════════

const INDIAN_HOURGLASS_MODEL = `Stunning Indian woman in her late 20s,
voluptuous hourglass figure with dramatic curves,
full bust and wide hips with defined waist,
rich warm brown skin with golden undertones,
long flowing black hair with natural waves cascading over shoulders,
expressive dark brown eyes with smoky makeup and winged eyeliner,
full lips with deep red lipstick,
confident radiant smile showing perfect teeth,
delicate gold earrings,
manicured nails with nude polish,
visible pores and natural skin texture,
matte natural finish with NO artificial sheen or oily glow`;

// ═══════════════════════════════════════════════════════════════════════════
// EXACT ENVIRONMENT - LUXURY DARK ROOM WITH CREAM CHAISE
// ═══════════════════════════════════════════════════════════════════════════

const LUXURY_ROOM_ENVIRONMENT = `Luxurious private room with dark charcoal walls,
cream ivory upholstered chaise lounge with plush cushioning,
ivory satin pillow accent,
polished brass desk lamp providing warm glow,
dark wood side table with white ceramic vase,
framed artwork on dark walls,
gold and brass decorative accents throughout,
intimate sophisticated atmosphere,
high-end residential interior design,
warm ambient lighting with soft shadows`;

// ═══════════════════════════════════════════════════════════════════════════
// POSE - RECLINING ON CHAISE
// ═══════════════════════════════════════════════════════════════════════════

const RECLINING_POSE = `Reclining elegantly on cream chaise lounge,
one arm resting gracefully on armrest,
legs extended along the chaise,
knees slightly bent in relaxed position,
torso angled toward camera,
weight supported by hip and elbow,
confident direct gaze at camera,
radiant genuine smile,
head tilted slightly with hair flowing`;

// ═══════════════════════════════════════════════════════════════════════════
// AMALGAMATIVE WARDROBES
// ═══════════════════════════════════════════════════════════════════════════

const AMALGAMATIVE_WARDROBES = {
  // CONTRAST AMALGAMATION - Black on Cream (Reference Match)
  black_fishnet_floral: {
    name: 'Black Fishnet Floral Lace',
    type: 'contrast',
    description: `Elegant black fishnet lace bodysuit,
    intricate floral appliqué patterns strategically placed,
    long sleeves with scalloped edges,
    deep plunging neckline,
    high-cut leg openings,
    sheer mesh revealing skin through geometric pattern,
    form-fitting silhouette accentuating hourglass curves,
    black lace contrasting beautifully against cream furniture`
  },

  black_baroque_mesh: {
    name: 'Black Baroque Mesh',
    type: 'contrast',
    description: `Sophisticated black baroque mesh bodysuit,
    ornate scrollwork and damask patterns in opaque sections,
    sheer mesh panels between baroque motifs,
    long sleeves with bell cuff detail,
    sweetheart neckline,
    high-waisted design emphasizing curves,
    dramatic black against ivory chaise`
  },

  // TRUE AMALGAMATION - Cream/Ivory on Cream
  cream_french_lace: {
    name: 'Cream French Lace',
    type: 'true_amalgamation',
    description: `Delicate cream French Chantilly lace bodysuit,
    intricate floral patterns in soft ivory,
    scalloped edges throughout,
    long sleeves with sheer lace,
    subtle coverage with romantic aesthetic,
    cream lace blending seamlessly with cream furniture,
    skin tone visible through delicate pattern,
    elegant monochromatic amalgamation`
  },

  ivory_silk_overlay: {
    name: 'Ivory Silk with Lace Overlay',
    type: 'true_amalgamation',
    description: `Ivory silk teddy with delicate lace overlay,
    cream silk base with sheer ivory lace top layer,
    floral lace trim at neckline and hem,
    thin adjustable straps,
    high-cut sides,
    silk catching warm lamplight,
    matching the satin pillow tones perfectly,
    subtle luxury amalgamation`
  },

  // LUXURY AMALGAMATION - Gold/Champagne on Cream
  champagne_sequin_mesh: {
    name: 'Champagne Sequin Mesh',
    type: 'luxury',
    description: `Luxurious champagne gold sequined mesh bodysuit,
    delicate gold sequins catching brass lamp light,
    sheer mesh base in warm champagne tone,
    strategic placement of sequin clusters,
    long sleeves for elegant coverage,
    deep V neckline,
    gold tones complementing brass accents in room,
    champagne matching cream furniture undertones`
  },

  gold_metallic_lace: {
    name: 'Gold Metallic Lace',
    type: 'luxury',
    description: `Stunning gold metallic lace bodysuit,
    intricate baroque patterns in shimmering gold thread,
    warm metallic finish matching brass lamp,
    long sleeves with scalloped cuffs,
    plunging neckline with lace trim,
    high-cut silhouette,
    golden warmth harmonizing with cream and brass,
    luxury metallic amalgamation`
  }
};

// ═══════════════════════════════════════════════════════════════════════════
// LIGHTING VARIATIONS
// ═══════════════════════════════════════════════════════════════════════════

const LIGHTING_STYLES = {
  warm_lamp: {
    name: 'Warm Brass Lamp',
    description: `Warm golden light from brass desk lamp,
    soft directional illumination from side,
    gentle shadows on dark walls,
    intimate bedroom lighting,
    warm color temperature around 2700K`
  },

  dramatic_single: {
    name: 'Dramatic Single Source',
    description: `Single dramatic light source from one side,
    deep shadows on opposite side,
    rim lighting on curves,
    chiaroscuro effect,
    cinematic mood lighting`
  },

  soft_ambient: {
    name: 'Soft Ambient Glow',
    description: `Soft diffused ambient lighting,
    even illumination across scene,
    gentle shadows preserving depth,
    flattering beauty lighting,
    warm inviting atmosphere`
  },

  candlelight_accent: {
    name: 'Candlelight Accent',
    description: `Warm candlelight flickering nearby,
    golden dancing light on skin,
    intimate romantic atmosphere,
    soft focus background,
    warm highlights on curves`
  }
};

// ═══════════════════════════════════════════════════════════════════════════
// GENERATE VARIANTS MATRIX
// ═══════════════════════════════════════════════════════════════════════════

function generateVariants() {
  const variants = [];
  let index = 0;

  // Generate all wardrobe x lighting combinations
  for (const [wardrobeKey, wardrobe] of Object.entries(AMALGAMATIVE_WARDROBES)) {
    for (const [lightKey, lighting] of Object.entries(LIGHTING_STYLES)) {
      variants.push({
        id: `indian_hourglass_${wardrobeKey}_${lightKey}_${index}`,
        index: index,
        wardrobe: wardrobe,
        wardrobeKey: wardrobeKey,
        lighting: lighting,
        lightKey: lightKey,
        name: `${wardrobe.name} - ${lighting.name}`
      });
      index++;
    }
  }

  return variants;
}

// ═══════════════════════════════════════════════════════════════════════════
// PROMPT BUILDER
// ═══════════════════════════════════════════════════════════════════════════

function buildPrompt(variant) {
  return `Award-winning intimate boudoir photography, Hasselblad H6D-400c,
${INDIAN_HOURGLASS_MODEL},

wearing ${variant.wardrobe.description},

${RECLINING_POSE},

in ${LUXURY_ROOM_ENVIRONMENT},

${variant.lighting.description},

shot by Mario Testino meets Helmut Newton aesthetic,
premium fashion editorial quality,
shallow depth of field f/1.8,
tack sharp focus on eyes and face,
natural skin texture with visible pores,
NO artificial skin smoothing,
NO oily or glossy skin appearance,
photorealistic detail,
8K resolution, RAW format quality`;
}

// ═══════════════════════════════════════════════════════════════════════════
// VERTEX AI IMAGEN GENERATION
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
  throw new Error('Operation timeout after 120 seconds');
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN EXECUTION
// ═══════════════════════════════════════════════════════════════════════════

async function main() {
  console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║    ██╗███╗   ██╗██████╗ ██╗ █████╗ ███╗   ██╗                               ║
║    ██║████╗  ██║██╔══██╗██║██╔══██╗████╗  ██║                               ║
║    ██║██╔██╗ ██║██║  ██║██║███████║██╔██╗ ██║                               ║
║    ██║██║╚██╗██║██║  ██║██║██╔══██║██║╚██╗██║                               ║
║    ██║██║ ╚████║██████╔╝██║██║  ██║██║ ╚████║                               ║
║    ╚═╝╚═╝  ╚═══╝╚═════╝ ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝                               ║
║                                                                              ║
║         ✨ HOURGLASS AMALGAMATIVE EXCELLENCE ✨                              ║
║                                                                              ║
║    Reference: Reclining on Cream Chaise • Black Fishnet Lace                ║
║    Model: Indian Hourglass Variant • Voluptuous Confidence                  ║
║    Approach: Amalgamative Excellence (Wardrobe ↔ Surface)                   ║
║                                                                              ║
║    CONTRAST: Black Lace on Cream                                            ║
║    TRUE AMALGAMATION: Cream/Ivory on Cream                                  ║
║    LUXURY: Gold/Champagne on Cream                                          ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
  `);

  const variants = generateVariants();
  console.log(`[${new Date().toLocaleTimeString()}] Authenticating with Vertex AI...`);

  let token = await getOAuthToken();
  console.log(`[${new Date().toLocaleTimeString()}] ✅ OAuth token obtained\n`);

  console.log('══════════════════════════════════════════════════════════════════════════════');
  console.log(`[${new Date().toLocaleTimeString()}] ✨ GENERATING ${variants.length} AMALGAMATIVE VARIANTS`);
  console.log('══════════════════════════════════════════════════════════════════════════════\n');

  const results = { successful: [], failed: [] };

  for (let i = 0; i < variants.length; i++) {
    const variant = variants[i];

    // Refresh token every 4 images
    if (i > 0 && i % 4 === 0) {
      console.log(`[${new Date().toLocaleTimeString()}] 🔄 Refreshing OAuth token...`);
      token = await getOAuthToken();
    }

    console.log('──────────────────────────────────────────────────────────────────────────────');
    console.log(`[${new Date().toLocaleTimeString()}] ✨ [${i + 1}/${variants.length}] ${variant.name}`);
    console.log(`[${new Date().toLocaleTimeString()}]    Type: ${variant.wardrobe.type}`);
    console.log(`[${new Date().toLocaleTimeString()}]    Wardrobe: ${variant.wardrobe.name}`);
    console.log(`[${new Date().toLocaleTimeString()}]    Lighting: ${variant.lighting.name}`);

    const prompt = buildPrompt(variant);

    try {
      const imageData = await generateImage(prompt, token);
      const buffer = Buffer.from(imageData, 'base64');

      // Create subdirectory based on wardrobe type
      const typeDir = path.join(OUTPUT_DIR, variant.wardrobe.type);
      if (!fs.existsSync(typeDir)) {
        fs.mkdirSync(typeDir, { recursive: true });
      }

      const filename = `indian_${variant.wardrobeKey}_${variant.lightKey}_${i}_${Date.now()}.png`;
      const filepath = path.join(typeDir, filename);

      fs.writeFileSync(filepath, buffer);
      const sizeMB = (buffer.length / (1024 * 1024)).toFixed(2);

      console.log(`[${new Date().toLocaleTimeString()}]    ✅ Saved: ${filename} (${sizeMB} MB)`);
      results.successful.push({ ...variant, filename, sizeMB, filepath });

    } catch (error) {
      console.log(`[${new Date().toLocaleTimeString()}]    ❌ Failed: ${error.message}`);
      results.failed.push({ ...variant, error: error.message });

      // Extended wait after filter or rate limit
      if (error.message.includes('Filtered') || error.message.includes('429')) {
        console.log(`[${new Date().toLocaleTimeString()}]    ⏳ Waiting 90s for rate limit...`);
        await new Promise(r => setTimeout(r, 90000));
      }
    }

    // Rate limiting between requests
    console.log(`[${new Date().toLocaleTimeString()}]    ⏳ Waiting 25s for rate limit...`);
    await new Promise(r => setTimeout(r, 25000));
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SUMMARY
  // ═══════════════════════════════════════════════════════════════════════════

  console.log('\n══════════════════════════════════════════════════════════════════════════════');
  console.log('              INDIAN HOURGLASS AMALGAMATIVE COMPLETE');
  console.log('══════════════════════════════════════════════════════════════════════════════\n');

  console.log(`  ✅ Successful: ${results.successful.length}`);
  console.log(`  ❌ Failed: ${results.failed.length}`);

  // Group by type
  const byType = {};
  for (const img of results.successful) {
    const type = img.wardrobe.type;
    if (!byType[type]) byType[type] = [];
    byType[type].push(img);
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
    collection: 'Indian Hourglass Amalgamative Excellence',
    reference: 'Reclining on cream chaise with black fishnet lace bodysuit',
    model: 'Indian hourglass variant',
    approach: 'Amalgamative Excellence',
    generated: new Date().toISOString(),
    total: variants.length,
    successful: results.successful.length,
    failed: results.failed.length,
    images: results.successful,
    failures: results.failed
  };

  const manifestPath = path.join(OUTPUT_DIR, 'amalgamative-manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`[${new Date().toLocaleTimeString()}] 📋 Manifest saved: ${manifestPath}\n`);
}

main().catch(console.error);
