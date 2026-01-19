#!/usr/bin/env node
/**
 * VERALABS CRYSTALLINE FLOOR ARTISTIC VARIATIONS
 *
 * Based on successful: vip_vip_floor_artistic_recline_crystalline_4
 *
 * Same model, environment, mood, color, aesthetics
 * Varying: lighting, camera focus, depth of field, pose
 * Professional camera techniques
 * Intimacy calibration: 8-10 and Premium 10+ VIP Exclusives
 *
 * Max-God Mode Nexus Execution
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const PROXY_URL = 'http://localhost:3001';
const OUTPUT_DIR = '/home/ecolex/version1/generated-crystalline-variations';
const PROJECT_ID = 'zaranovel';
const LOCATION = 'us-central1';

// ============================================================================
// CRYSTALLINE MUSE - Same Indian Hourglass Model
// ============================================================================
const CRYSTALLINE_MUSE = `Stunning Indian fashion muse, 5'8" tall,
fit athletic voluptuous hourglass figure with dramatic sculptural curves,
bust 37DD", cinched waist 27", wide rounded hips 40",
sun-kissed bronze complexion with NATURAL MATTE FINISH,
visible skin pores and fine vellus hair catching ambient light,
authentic human skin texture with subtle natural imperfections,
striking Indian features with captivating dark magnetic gaze,
full sensual lips, dramatic high cheekbones, defined jawline,
long flowing jet-black hair styled in loose artistic waves,
age 26, commanding presence of haute couture model`;

// ============================================================================
// CRYSTALLINE MESH ENSEMBLE - Same Wardrobe
// ============================================================================
const CRYSTALLINE_WARDROBE = `Two-piece crystalline mesh ensemble in silver-gray,
micro-mesh bralette with geometric underwire structure,
matching high-waisted mesh brief with sheer translucent panels,
fabric embedded with tiny crystal particles catching light,
architectural seaming creating diamond patterns,
barely-there opacity revealing every sculptural contour,
gossamer textile with light-refracting crystalline threads`;

// ============================================================================
// PRIVATE FLOOR ENVIRONMENT - Same Setting
// ============================================================================
const FLOOR_ENVIRONMENT = `Intimate private room with polished concrete floor,
plush faux fur throw in cream on the floor,
dark textured walls with subtle venetian plaster,
low warm lighting from recessed wall sconces,
minimalist industrial-luxe aesthetic,
underground VIP private club atmosphere,
intimate ambient glow creating intimate mood`;

// ============================================================================
// REALISTIC SKIN TEXTURE ANCHORS
// ============================================================================
const REALISTIC_SKIN = `
Photorealistic skin rendering:
- Visible skin pores with natural texture variation
- Fine vellus hair catching light naturally
- Matte natural skin finish, NO artificial sheen
- Subtle skin imperfections for authenticity
- No oily glow, no plastic AI appearance
- Medium format camera skin detail quality`;

// ============================================================================
// CAMERA TECHNIQUES & PROFESSIONAL SETTINGS
// ============================================================================
const CAMERA_TECHNIQUES = {
  // SHALLOW DOF VARIATIONS
  ultra_shallow: {
    name: 'Ultra Shallow DOF Portrait',
    settings: `Shot on Sony A1 with 85mm f/1.2 GM lens wide open at f/1.2,
    ultra-shallow depth of field with creamy bokeh,
    eyes tack-sharp with soft falloff to body,
    intimate close-up framing emphasizing face and upper body,
    background dissolving into ethereal blur`
  },
  medium_shallow: {
    name: 'Medium DOF Artistic',
    settings: `Shot on Hasselblad X2D with 80mm f/1.9 at f/2.2,
    selective focus on torso and face with soft edges,
    medium-wide framing capturing full figure,
    bokeh balls from ambient light sources,
    three-quarter view composition`
  },
  deep_field: {
    name: 'Deep Field Editorial',
    settings: `Shot on Phase One IQ4 150MP with 110mm f/2.8 at f/5.6,
    sharp focus throughout frame for editorial clarity,
    full-body environmental portrait style,
    every texture visible from mesh to fur to skin,
    architectural composition showing spatial context`
  },

  // LENS PERSPECTIVES
  wide_intimate: {
    name: 'Wide Angle Intimate',
    settings: `Shot on Leica SL2 with 35mm f/1.4 Summilux at f/2.0,
    wide-angle intimate perspective creating presence,
    slight environmental distortion adding drama,
    low angle shooting from floor level,
    immersive viewer placement within scene`
  },
  telephoto_compress: {
    name: 'Telephoto Compression',
    settings: `Shot on Nikon Z9 with 105mm f/1.4 at f/1.8,
    telephoto compression flattening spatial depth,
    subject isolated from environment,
    tight framing on torso and face,
    background compressed into abstract shapes`
  },
  tilt_shift: {
    name: 'Tilt-Shift Miniature',
    settings: `Shot with Canon TS-E 90mm f/2.8 tilt-shift lens,
    selective focus plane tilted across body,
    dreamlike miniature effect on edges,
    sharp diagonal slice through frame,
    artistic defocus creating surreal mood`
  }
};

// ============================================================================
// LIGHTING VARIATIONS - Same Mood Different Techniques
// ============================================================================
const LIGHTING_VARIATIONS = {
  single_key_dramatic: {
    name: 'Single Key Dramatic',
    description: `Single dramatic overhead key light creating deep shadows,
    Rembrandt lighting pattern on face,
    sculptural shadows defining muscle tone and curves,
    warm 3200K tungsten creating golden skin tones,
    minimal fill letting shadows go deep black`
  },
  soft_wrap: {
    name: 'Soft Wraparound',
    description: `Large soft source wrapping around subject,
    beauty dish camera-left with silk diffusion,
    gentle gradients across skin,
    minimal shadows for ethereal beauty quality,
    warm ambient fill from environment`
  },
  rim_silhouette: {
    name: 'Rim Light Silhouette',
    description: `Strong rim light from behind creating halo effect,
    edge lighting defining silhouette against darkness,
    minimal frontal fill preserving mystery,
    backlight catching crystalline mesh creating sparkle,
    dramatic negative space in shadows`
  },
  split_contrast: {
    name: 'Split Light High Contrast',
    description: `Hard light splitting face and body 50/50,
    one half in bright illumination, other in shadow,
    film noir inspired high contrast ratio,
    no fill light for maximum drama,
    shadow side revealing only hints of form`
  },
  candlelight_intimate: {
    name: 'Candlelight Intimate',
    description: `Warm flickering candlelight as primary source,
    multiple candle placement creating soft movement,
    orange-gold color temperature around 2000K,
    romantic intimate atmosphere,
    gentle dancing shadows on skin`
  },
  moonlight_cool: {
    name: 'Moonlight Cool',
    description: `Cool blue-tinted light simulating moonlight,
    high contrast with silver highlights,
    nocturnal mysterious mood,
    single strong directional source from window,
    skin rendered in cool silver-blue tones`
  }
};

// ============================================================================
// POSE VARIATIONS - Floor Artistic Theme
// ============================================================================
const POSE_VARIATIONS = {
  // INTIMACY LEVEL 8
  recline_relaxed: {
    name: 'Relaxed Recline',
    intimacy: 8,
    description: `Reclining on fur throw in relaxed natural pose,
    body in gentle S-curve showing feminine proportions,
    one arm behind head, other resting on hip,
    legs bent naturally with knees together,
    serene contemplative expression, eyes to camera`
  },
  side_curl: {
    name: 'Side Curl',
    intimacy: 8,
    description: `Curled on side in fetal-inspired artistic pose,
    emphasizing curve of hip and waist,
    arms wrapped loosely around torso,
    hair spilling across fur throw,
    intimate vulnerable expression`
  },

  // INTIMACY LEVEL 9
  back_arch: {
    name: 'Dramatic Back Arch',
    intimacy: 9,
    description: `Lying back with dramatic spinal arch,
    chest lifted toward ceiling,
    arms extended above head creating line,
    legs extended with pointed toes,
    expression of ecstatic pleasure`
  },
  knees_raised: {
    name: 'Knees Raised Artistic',
    intimacy: 9,
    description: `On back with both knees raised and bent,
    arms creating frame around face,
    hourglass silhouette emphasized from angle,
    looking up at camera with intense gaze,
    mesh fabric stretched across curves`
  },
  hip_roll: {
    name: 'Hip Roll Profile',
    intimacy: 9,
    description: `Rolling onto hip showing full side profile,
    dramatic hip curve prominently displayed,
    one arm supporting head, other trailing down body,
    hair cascading across floor,
    sensual half-smile expression`
  },

  // INTIMACY LEVEL 10
  surrender_pose: {
    name: 'Artistic Surrender',
    intimacy: 10,
    description: `Full body stretch in surrender position,
    arms extended above head on floor,
    back arched lifting chest dramatically,
    legs parted naturally in relaxed position,
    expression of complete abandon and trust`
  },
  sculpted_reveal: {
    name: 'Sculpted Form Reveal',
    intimacy: 10,
    description: `Classical fine art pose revealing sculptural form,
    body positioned to show every curve and contour,
    strategic limb placement creating negative space,
    artistic display of feminine anatomy,
    transcendent artistic expression`
  },

  // PREMIUM 10+ VIP EXCLUSIVES
  odalisque_modern: {
    name: 'Modern Odalisque',
    intimacy: 10.5,
    description: `Inspired by Ingres' Grande Odalisque,
    lying on stomach with upper body raised on elbows,
    dramatic posterior curve prominently featured,
    looking over shoulder at camera,
    classical fine art composition updated for contemporary`
  },
  venus_reclining: {
    name: 'Venus of Urbino Tribute',
    intimacy: 10.5,
    description: `Inspired by Titian's Venus of Urbino,
    reclining on side with one arm supporting head,
    other hand resting elegantly at center,
    direct confident gaze engaging viewer,
    museum-quality fine art nude composition`
  },
  sculptural_abstract: {
    name: 'Abstract Sculptural Form',
    intimacy: 10.5,
    description: `Body as abstract sculptural element,
    twisted pose creating unexpected angles,
    limbs arranged as geometric composition,
    form over figure artistic approach,
    Edward Weston peppers-inspired abstraction`
  }
};

// ============================================================================
// BUILD COMPREHENSIVE VARIANTS
// ============================================================================
const CRYSTALLINE_VARIANTS = [];

// Generate curated combinations
const CURATED_VARIANTS = [
  // INTIMACY 8 - ENTRY LEVEL VIP
  { pose: 'recline_relaxed', camera: 'ultra_shallow', lighting: 'soft_wrap', level: 'LEVEL 8' },
  { pose: 'recline_relaxed', camera: 'medium_shallow', lighting: 'candlelight_intimate', level: 'LEVEL 8' },
  { pose: 'side_curl', camera: 'wide_intimate', lighting: 'single_key_dramatic', level: 'LEVEL 8' },
  { pose: 'side_curl', camera: 'telephoto_compress', lighting: 'rim_silhouette', level: 'LEVEL 8' },

  // INTIMACY 9 - PREMIUM VIP
  { pose: 'back_arch', camera: 'ultra_shallow', lighting: 'single_key_dramatic', level: 'LEVEL 9' },
  { pose: 'back_arch', camera: 'deep_field', lighting: 'split_contrast', level: 'LEVEL 9' },
  { pose: 'knees_raised', camera: 'medium_shallow', lighting: 'candlelight_intimate', level: 'LEVEL 9' },
  { pose: 'knees_raised', camera: 'wide_intimate', lighting: 'moonlight_cool', level: 'LEVEL 9' },
  { pose: 'hip_roll', camera: 'telephoto_compress', lighting: 'soft_wrap', level: 'LEVEL 9' },
  { pose: 'hip_roll', camera: 'tilt_shift', lighting: 'rim_silhouette', level: 'LEVEL 9' },

  // INTIMACY 10 - EXCLUSIVE VIP
  { pose: 'surrender_pose', camera: 'ultra_shallow', lighting: 'candlelight_intimate', level: 'LEVEL 10' },
  { pose: 'surrender_pose', camera: 'wide_intimate', lighting: 'single_key_dramatic', level: 'LEVEL 10' },
  { pose: 'sculpted_reveal', camera: 'deep_field', lighting: 'split_contrast', level: 'LEVEL 10' },
  { pose: 'sculpted_reveal', camera: 'medium_shallow', lighting: 'moonlight_cool', level: 'LEVEL 10' },

  // PREMIUM 10+ - ULTRA EXCLUSIVE VIP
  { pose: 'odalisque_modern', camera: 'deep_field', lighting: 'single_key_dramatic', level: 'PREMIUM 10+' },
  { pose: 'odalisque_modern', camera: 'medium_shallow', lighting: 'candlelight_intimate', level: 'PREMIUM 10+' },
  { pose: 'venus_reclining', camera: 'ultra_shallow', lighting: 'soft_wrap', level: 'PREMIUM 10+' },
  { pose: 'venus_reclining', camera: 'telephoto_compress', lighting: 'rim_silhouette', level: 'PREMIUM 10+' },
  { pose: 'sculptural_abstract', camera: 'tilt_shift', lighting: 'split_contrast', level: 'PREMIUM 10+' },
  { pose: 'sculptural_abstract', camera: 'wide_intimate', lighting: 'moonlight_cool', level: 'PREMIUM 10+' }
];

CURATED_VARIANTS.forEach((combo, idx) => {
  const pose = POSE_VARIATIONS[combo.pose];
  const camera = CAMERA_TECHNIQUES[combo.camera];
  const lighting = LIGHTING_VARIATIONS[combo.lighting];

  CRYSTALLINE_VARIANTS.push({
    id: `crystal_${combo.pose}_${combo.camera.split('_')[0]}_${idx}`,
    name: `${pose.name} - ${camera.name}`,
    pose: pose,
    camera: camera,
    lighting: lighting,
    category: combo.level
  });
});

// ============================================================================
// QUALITY PREFIX
// ============================================================================
const QUALITY_PREFIX = `Masterpiece fine art photograph in the tradition of Edward Weston's form studies,
Helmut Newton's powerful compositions, and Paolo Roversi's ethereal beauty.
Museum-quality intimate portraiture celebrating the human form as living sculpture.
Award-winning gallery exhibition quality for prestigious private collection.`;

// ============================================================================
// BUILD OPTIMIZED PROMPT
// ============================================================================
function buildCrystallinePrompt(variant) {
  return `${QUALITY_PREFIX}

MODEL: ${CRYSTALLINE_MUSE}

WARDROBE - Crystalline Mesh Ensemble:
${CRYSTALLINE_WARDROBE}

POSE - ${variant.pose.name}:
${variant.pose.description}

ENVIRONMENT:
${FLOOR_ENVIRONMENT}

CAMERA TECHNIQUE - ${variant.camera.name}:
${variant.camera.settings}

LIGHTING - ${variant.lighting.name}:
${variant.lighting.description}

ARTISTIC VISION:
Variations on crystalline mesh floor artistic theme.
Same model, same wardrobe, same environment aesthetic.
Professional camera technique variations creating unique perspectives.
Intimate private moment captured with haute couture excellence.
Fine art boudoir meets contemporary fashion photography.

TECHNICAL EXCELLENCE:
${REALISTIC_SKIN}
8K ultra-detailed resolution.
Subtle Kodak Portra 400 film grain.
Professional color grading with rich tonal depth.`;
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================
function log(msg) {
  const time = new Date().toLocaleTimeString();
  console.log(`[${time}] ${msg}`);
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getOAuthToken() {
  try {
    const response = await fetch(`${PROXY_URL}/api/gcloud-token`);
    const data = await response.json();
    if (data.success && data.token) return data.token;
  } catch (e) {}
  return execSync('gcloud auth print-access-token', { encoding: 'utf-8' }).trim();
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

// ============================================================================
// MAIN EXECUTION
// ============================================================================
async function main() {
  console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║    ██████╗██████╗ ██╗   ██╗███████╗████████╗ █████╗ ██╗     ██╗     ██╗███╗  ║
║   ██╔════╝██╔══██╗╚██╗ ██╔╝██╔════╝╚══██╔══╝██╔══██╗██║     ██║     ██║████╗ ║
║   ██║     ██████╔╝ ╚████╔╝ ███████╗   ██║   ███████║██║     ██║     ██║██╔██╗║
║   ██║     ██╔══██╗  ╚██╔╝  ╚════██║   ██║   ██╔══██║██║     ██║     ██║██║╚██║
║   ╚██████╗██║  ██║   ██║   ███████║   ██║   ██║  ██║███████╗███████╗██║██║ ╚█║
║    ╚═════╝╚═╝  ╚═╝   ╚═╝   ╚══════╝   ╚═╝   ╚═╝  ╚═╝╚══════╝╚══════╝╚═╝╚═╝  ║
║                                                                              ║
║            ✨ CRYSTALLINE FLOOR ARTISTIC VARIATIONS ✨                        ║
║                                                                              ║
║    Same Model • Same Wardrobe • Same Environment                             ║
║    Varying: Camera, Lighting, Pose, DOF                                      ║
║                                                                              ║
║    LEVEL 8 | LEVEL 9 | LEVEL 10 | PREMIUM 10+                                ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
  `);

  // Create output directory structure
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const categories = ['level_8', 'level_9', 'level_10', 'premium_10plus'];
  categories.forEach(cat => {
    const catDir = path.join(OUTPUT_DIR, cat);
    if (!fs.existsSync(catDir)) {
      fs.mkdirSync(catDir, { recursive: true });
    }
  });

  log('Authenticating with Vertex AI...');
  let oauthToken;
  try {
    oauthToken = await getOAuthToken();
    log('✅ OAuth token obtained');
  } catch (err) {
    console.error('❌ Failed to get OAuth token:', err.message);
    process.exit(1);
  }

  // Parse arguments
  const args = process.argv.slice(2);
  const startIndex = parseInt(args[0]) || 0;
  const count = parseInt(args[1]) || CRYSTALLINE_VARIANTS.length;
  const categoryFilter = args[2];

  // Filter variants
  let variantsToGenerate = CRYSTALLINE_VARIANTS;
  if (categoryFilter) {
    variantsToGenerate = variantsToGenerate.filter(v =>
      v.category.toLowerCase().includes(categoryFilter.toLowerCase())
    );
  }
  variantsToGenerate = variantsToGenerate.slice(startIndex, startIndex + count);

  console.log(`\n${'═'.repeat(78)}`);
  log(`✨ GENERATING ${variantsToGenerate.length} CRYSTALLINE VARIATIONS`);
  if (categoryFilter) log(`   Level filter: ${categoryFilter}`);
  console.log(`${'═'.repeat(78)}`);

  const results = { success: [], failed: [] };
  let tokenRefreshCounter = 0;

  for (let i = 0; i < variantsToGenerate.length; i++) {
    const variant = variantsToGenerate[i];

    // Refresh token every 4 images
    tokenRefreshCounter++;
    if (tokenRefreshCounter > 4) {
      log('🔄 Refreshing OAuth token...');
      oauthToken = await getOAuthToken();
      tokenRefreshCounter = 0;
    }

    const catDir = variant.category.toLowerCase().replace(/[^a-z0-9]/g, '_').replace('__', '_');
    const timestamp = Date.now();
    const outputPath = path.join(OUTPUT_DIR, catDir, `crystal_${variant.id}_${timestamp}.png`);
    const prompt = buildCrystallinePrompt(variant);

    console.log(`\n${'─'.repeat(78)}`);
    log(`✨ [${i + 1}/${variantsToGenerate.length}] ${variant.name}`);
    log(`   Level: ${variant.category} | Intimacy: ${variant.pose.intimacy}`);
    log(`   Camera: ${variant.camera.name} | Light: ${variant.lighting.name}`);

    try {
      const result = await generateImage(prompt, outputPath, oauthToken);
      log(`   ✅ Saved: ${path.basename(outputPath)} (${(result.size / 1024 / 1024).toFixed(2)} MB)`);

      results.success.push({
        name: variant.name,
        id: variant.id,
        category: variant.category,
        intimacy: variant.pose.intimacy,
        camera: variant.camera.name,
        lighting: variant.lighting.name,
        path: outputPath,
        size: result.size
      });

      log('   ⏳ Waiting 25s for rate limit...');
      await sleep(25000);

    } catch (err) {
      log(`   ❌ Failed: ${err.message.slice(0, 80)}`);

      results.failed.push({
        name: variant.name,
        id: variant.id,
        category: variant.category,
        error: err.message
      });

      if (err.message.includes('429')) {
        log('   ⏳ Waiting 90s for rate limit...');
        await sleep(90000);
      } else if (err.message.includes('Filtered')) {
        log('   ⏳ Waiting 90s after filter...');
        await sleep(90000);
      }
      log('   ⏳ Waiting 25s for rate limit...');
      await sleep(25000);
    }
  }

  // Summary
  console.log(`\n${'═'.repeat(78)}`);
  console.log('              CRYSTALLINE VARIATIONS COMPLETE');
  console.log(`${'═'.repeat(78)}`);

  console.log(`\n  ✅ Successful: ${results.success.length}`);
  console.log(`  ❌ Failed: ${results.failed.length}`);

  if (results.success.length > 0) {
    const byCategory = {};
    results.success.forEach(r => {
      if (!byCategory[r.category]) byCategory[r.category] = [];
      byCategory[r.category].push(r);
    });

    for (const [category, items] of Object.entries(byCategory)) {
      console.log(`     ✨ ${category}: ${items.length} images`);
      items.forEach(item => {
        console.log(`        📸 ${item.name} (${(item.size / 1024 / 1024).toFixed(2)} MB)`);
      });
    }
  }

  console.log(`\n  Output: ${OUTPUT_DIR}`);
  console.log(`${'═'.repeat(78)}\n`);

  // Save manifest
  const manifestPath = path.join(OUTPUT_DIR, 'crystalline-variations-manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify({
    series: 'Crystalline Floor Artistic Variations',
    timestamp: new Date().toISOString(),
    concept: 'Same model/wardrobe/environment with varying camera, lighting, pose',
    baseImage: 'vip_vip_floor_artistic_recline_crystalline_4_1768127909673.png',
    intimacyLevels: ['8', '9', '10', '10+'],
    cameraVariations: Object.keys(CAMERA_TECHNIQUES),
    lightingVariations: Object.keys(LIGHTING_VARIATIONS),
    poseVariations: Object.keys(POSE_VARIATIONS),
    results: {
      successful: results.success,
      failed: results.failed
    }
  }, null, 2));
  log(`📋 Manifest saved: ${manifestPath}`);
}

main().catch(err => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});
