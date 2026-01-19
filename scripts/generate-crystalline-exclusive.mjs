#!/usr/bin/env node
/**
 * VERALABS CRYSTALLINE 10+ EXCLUSIVE COLLECTION
 *
 * MISSION CRITICAL: Exact match to reference image environment
 * Base: vip_vip_floor_artistic_recline_crystalline_4_1768127909673.png
 *
 * EXACT ENVIRONMENT MATCH:
 * - Dark textured walls with venetian plaster finish
 * - Plush cream/white faux fur throw on polished concrete floor
 * - Warm amber wall sconces creating intimate glow
 * - Candles providing romantic accent lighting
 * - Underground VIP private club atmosphere
 *
 * EXACT WARDROBE MATCH:
 * - Silver-gray crystalline mesh two-piece set
 * - Geometric underwire bralette structure
 * - High-waisted mesh brief with sheer panels
 * - Crystal particles embedded in fabric
 *
 * Varying: Camera angles, lighting intensity, poses
 * Intimacy: 10+ Premium VIP Exclusive
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const PROXY_URL = 'http://localhost:3001';
const OUTPUT_DIR = '/home/ecolex/version1/generated-crystalline-exclusive';
const PROJECT_ID = 'zaranovel';
const LOCATION = 'us-central1';

// ============================================================================
// EXACT MUSE DESCRIPTION FROM REFERENCE IMAGE
// ============================================================================
const CRYSTALLINE_MUSE = `Stunning Indian fashion muse, 5'8" tall,
fit athletic voluptuous hourglass figure with dramatic sculptural curves,
bust 37DD", cinched waist 27", wide rounded hips 40",
sun-kissed bronze complexion with NATURAL MATTE FINISH,
visible skin pores and fine vellus hair catching ambient light,
authentic human skin texture with subtle natural imperfections,
striking Indian features with captivating dark magnetic gaze,
full sensual lips, dramatic high cheekbones, defined jawline,
long flowing jet-black hair with natural loose waves cascading down,
age 26, commanding presence of luxury haute couture model`;

// ============================================================================
// EXACT WARDROBE FROM REFERENCE IMAGE
// ============================================================================
const CRYSTALLINE_WARDROBE = `Silver-gray crystalline mesh two-piece lingerie set:
- Structured mesh bralette with geometric underwire design
- Delicate spaghetti straps in matching silver-gray
- High-waisted mesh brief with sheer translucent panels
- Fabric embedded with tiny crystal particles catching light
- Architectural seaming creating diamond/geometric patterns
- Barely-there opacity revealing sculptural form beneath
- Gossamer textile with light-refracting crystalline threads
- Minimalist elegant design with premium haute couture construction`;

// ============================================================================
// EXACT ENVIRONMENT FROM REFERENCE IMAGE - CRITICAL MATCH
// ============================================================================
const EXACT_ENVIRONMENT = `Intimate underground VIP private room setting:
- Dark charcoal-gray textured walls with venetian plaster finish
- Corner placement with two walls visible at 90-degree angle
- Polished dark concrete floor with subtle sheen
- PLUSH CREAM-WHITE FAUX FUR THROW on floor as key prop
- Warm amber wall sconces mounted on walls creating ambient glow
- CANDLES placed in background providing romantic accent light
- Gray fabric/blanket draped artistically near fur throw
- Minimalist industrial-luxe aesthetic
- Intimate private club atmosphere with warm intimate mood
- Low ambient lighting creating cozy intimate space`;

// ============================================================================
// REALISTIC SKIN TEXTURE
// ============================================================================
const REALISTIC_SKIN = `
Photorealistic skin rendering:
- Visible skin pores with natural texture variation
- Fine vellus hair catching light naturally
- Matte natural skin finish, NO artificial oily sheen
- Subtle skin imperfections for authenticity
- No plastic AI appearance, no airbrushed look
- Medium format camera skin detail quality`;

// ============================================================================
// QUALITY PREFIX
// ============================================================================
const QUALITY_PREFIX = `Masterpiece fine art boudoir photograph.
Museum-quality intimate portraiture celebrating feminine form.
Award-winning gallery exhibition quality.
In the tradition of Helmut Newton and Peter Lindbergh.`;

// ============================================================================
// 10+ EXCLUSIVE POSE VARIATIONS
// ============================================================================
const EXCLUSIVE_POSES = {
  // ARTISTIC RECLINE VARIATIONS (matching reference base pose)
  recline_original: {
    name: 'Original Artistic Recline',
    description: `Reclining on cream fur throw with dramatic artistic pose,
    body in elegant S-curve showing hourglass silhouette,
    one arm raised to head adjusting hair,
    head tilted back with eyes closed in ecstasy,
    torso lifted showing defined abs and sculptural form,
    legs extended with one knee slightly bent,
    crystalline mesh catching warm ambient light`
  },
  recline_side_view: {
    name: 'Side View Recline',
    description: `Similar recline on fur throw but shot from side angle,
    full hourglass profile visible against dark wall,
    dramatic hip curve emphasized by angle,
    arm position creating elegant line above head,
    expression of peaceful intimate pleasure,
    mesh fabric stretched across curves catching light`
  },
  recline_looking_camera: {
    name: 'Recline Direct Gaze',
    description: `Same recline position on cream fur throw,
    but now with intense direct eye contact at camera,
    magnetic gaze creating connection with viewer,
    slight smile suggesting intimate invitation,
    body position identical to reference,
    one hand trailing down torso`
  },

  // KNEELING VARIATIONS
  kneeling_on_fur: {
    name: 'Kneeling on Fur',
    description: `Kneeling on cream fur throw with elegant posture,
    sitting back on heels with spine perfectly straight,
    arms raised above head in worship/stretch pose,
    showing full front torso and mesh coverage,
    head tilted back with serene expression,
    fur pooling around knees`
  },
  kneeling_forward_lean: {
    name: 'Kneeling Forward Lean',
    description: `Kneeling on fur throw leaning forward onto hands,
    back arched dramatically showing spinal curve,
    looking up at camera with sultry expression,
    mesh pulled taut across body from pose,
    posterior raised in elegant curve,
    hair cascading forward over shoulders`
  },

  // LYING VARIATIONS
  lying_face_down: {
    name: 'Face Down Artistic',
    description: `Lying face down on cream fur throw,
    chin propped on crossed arms,
    looking directly at camera with intimate gaze,
    full back visible showing spine and posterior curves,
    legs bent at knee with feet raised,
    mesh brief accentuating hip curves`
  },
  lying_on_back: {
    name: 'On Back Stretch',
    description: `Lying on back on cream fur throw,
    arms stretched above head in surrender pose,
    back arched lifting chest toward ceiling,
    one knee bent creating elegant angle,
    expression of complete relaxation and trust,
    mesh fabric falling naturally with gravity`
  },

  // SEATED VARIATIONS
  seated_on_fur: {
    name: 'Seated on Fur',
    description: `Seated on cream fur throw with legs to side,
    one arm behind supporting body weight,
    other hand in hair with sensual gesture,
    legs bent elegantly showing thigh curves,
    torso twisted slightly showing waist definition,
    looking over shoulder at camera`
  },

  // STANDING NEAR WALL
  wall_lean_artistic: {
    name: 'Wall Lean by Fur',
    description: `Standing near fur throw leaning against dark wall,
    one foot on fur throw creating connection to setting,
    body in classical contrapposto with hip tilted,
    arms creating artistic frame around body,
    dramatic wall sconce lighting from side,
    intense gaze at camera`
  },

  // ODALISQUE TRIBUTE
  modern_odalisque: {
    name: 'Modern Odalisque',
    description: `Classical odalisque pose on cream fur throw,
    lying on side propped on one elbow,
    dramatic hip curve prominently displayed,
    looking over shoulder at camera,
    free arm draped elegantly along body,
    candles visible in soft focus background`
  }
};

// ============================================================================
// LIGHTING VARIATIONS (matching reference warm ambient style)
// ============================================================================
const LIGHTING_STYLES = {
  warm_ambient: {
    name: 'Warm Ambient (Reference Match)',
    description: `Warm amber lighting from wall sconces,
    soft candlelight providing romantic fill,
    intimate low-light atmosphere,
    warm 2700K color temperature,
    gentle shadows defining form without harshness`
  },
  dramatic_single: {
    name: 'Dramatic Single Source',
    description: `Single warm spotlight creating dramatic shadows,
    Rembrandt-style lighting on face,
    deep shadows on one side of body,
    sconces providing minimal ambient fill,
    high contrast with warm tones`
  },
  candle_primary: {
    name: 'Candlelight Primary',
    description: `Candles as primary light source,
    flickering warm glow on skin,
    romantic intimate atmosphere,
    soft dancing shadows,
    orange-gold color temperature around 2000K`
  },
  rim_backlight: {
    name: 'Rim Light Silhouette',
    description: `Strong backlight creating golden rim around figure,
    sconces positioned behind subject,
    silhouette effect with glowing edges,
    minimal frontal fill,
    dramatic separation from dark background`
  }
};

// ============================================================================
// CAMERA TECHNIQUES
// ============================================================================
const CAMERA_SETTINGS = {
  reference_match: {
    name: 'Reference Match (3/4 View)',
    description: `Shot from 3/4 elevated angle matching reference,
    Hasselblad X2D 100C with 80mm f/1.9 at f/2.2,
    medium-wide framing showing full body and environment,
    shallow depth of field with sharp subject,
    warm color grading matching reference aesthetic`
  },
  intimate_close: {
    name: 'Intimate Close-Up',
    description: `Sony A1 with 85mm f/1.2 GM wide open,
    ultra-shallow depth of field,
    tight framing on torso and face,
    creamy bokeh dissolving background,
    emphasis on expression and skin texture`
  },
  wide_environmental: {
    name: 'Wide Environmental',
    description: `Leica SL2 with 35mm f/1.4 at f/2.8,
    wide-angle showing full environment context,
    fur throw, walls, sconces all visible,
    subject as part of luxurious setting,
    intimate viewer placement`
  },
  overhead_artistic: {
    name: 'Overhead Artistic',
    description: `Shot from directly above subject,
    Nikon Z9 with 50mm f/1.2 at f/2.0,
    artistic bird's eye view of pose on fur,
    floor and fur throw filling frame,
    unique perspective on body geometry`
  }
};

// ============================================================================
// BUILD 20 EXCLUSIVE VARIANTS
// ============================================================================
const EXCLUSIVE_VARIANTS = [];

const CURATED_COMBINATIONS = [
  // RECLINE SERIES (8 variants)
  { pose: 'recline_original', lighting: 'warm_ambient', camera: 'reference_match' },
  { pose: 'recline_original', lighting: 'dramatic_single', camera: 'intimate_close' },
  { pose: 'recline_side_view', lighting: 'warm_ambient', camera: 'reference_match' },
  { pose: 'recline_side_view', lighting: 'candle_primary', camera: 'wide_environmental' },
  { pose: 'recline_looking_camera', lighting: 'warm_ambient', camera: 'intimate_close' },
  { pose: 'recline_looking_camera', lighting: 'rim_backlight', camera: 'reference_match' },
  { pose: 'recline_original', lighting: 'candle_primary', camera: 'overhead_artistic' },
  { pose: 'recline_side_view', lighting: 'dramatic_single', camera: 'intimate_close' },

  // KNEELING SERIES (4 variants)
  { pose: 'kneeling_on_fur', lighting: 'warm_ambient', camera: 'reference_match' },
  { pose: 'kneeling_on_fur', lighting: 'dramatic_single', camera: 'wide_environmental' },
  { pose: 'kneeling_forward_lean', lighting: 'candle_primary', camera: 'reference_match' },
  { pose: 'kneeling_forward_lean', lighting: 'rim_backlight', camera: 'intimate_close' },

  // LYING SERIES (4 variants)
  { pose: 'lying_face_down', lighting: 'warm_ambient', camera: 'reference_match' },
  { pose: 'lying_face_down', lighting: 'candle_primary', camera: 'overhead_artistic' },
  { pose: 'lying_on_back', lighting: 'dramatic_single', camera: 'reference_match' },
  { pose: 'lying_on_back', lighting: 'warm_ambient', camera: 'wide_environmental' },

  // SEATED & WALL (2 variants)
  { pose: 'seated_on_fur', lighting: 'warm_ambient', camera: 'reference_match' },
  { pose: 'wall_lean_artistic', lighting: 'dramatic_single', camera: 'reference_match' },

  // ODALISQUE (2 variants)
  { pose: 'modern_odalisque', lighting: 'candle_primary', camera: 'reference_match' },
  { pose: 'modern_odalisque', lighting: 'warm_ambient', camera: 'intimate_close' }
];

CURATED_COMBINATIONS.forEach((combo, idx) => {
  const pose = EXCLUSIVE_POSES[combo.pose];
  const lighting = LIGHTING_STYLES[combo.lighting];
  const camera = CAMERA_SETTINGS[combo.camera];

  EXCLUSIVE_VARIANTS.push({
    id: `exclusive_${combo.pose.split('_')[0]}_${idx}`,
    name: `${pose.name} - ${lighting.name}`,
    pose: pose,
    lighting: lighting,
    camera: camera,
    category: 'PREMIUM 10+ EXCLUSIVE'
  });
});

// ============================================================================
// BUILD PROMPT - EXACT ENVIRONMENT MATCH
// ============================================================================
function buildExclusivePrompt(variant) {
  return `${QUALITY_PREFIX}

MODEL:
${CRYSTALLINE_MUSE}

WARDROBE:
${CRYSTALLINE_WARDROBE}

EXACT ENVIRONMENT SETTING:
${EXACT_ENVIRONMENT}

POSE - ${variant.pose.name}:
${variant.pose.description}

LIGHTING - ${variant.lighting.name}:
${variant.lighting.description}

CAMERA - ${variant.camera.name}:
${variant.camera.description}

ARTISTIC DIRECTION:
Premium 10+ VIP Exclusive intimate boudoir collection.
EXACT match to reference environment aesthetic.
Cream fur throw on dark floor MUST be prominent.
Warm amber wall sconces and candles creating intimate atmosphere.
Dark textured walls as backdrop.
Same crystalline mesh wardrobe throughout.
Intimate private moment in underground VIP setting.

${REALISTIC_SKIN}
8K ultra-detailed resolution.
Subtle Kodak Portra 400 film grain.
Professional warm color grading.`;
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
║     ██╗ ██████╗        ███████╗██╗  ██╗ ██████╗██╗     ██╗   ██╗███████╗     ║
║    ███║██╔═████╗       ██╔════╝╚██╗██╔╝██╔════╝██║     ██║   ██║██╔════╝     ║
║    ╚██║██║██╔██║       █████╗   ╚███╔╝ ██║     ██║     ██║   ██║███████╗     ║
║     ██║████╔╝██║       ██╔══╝   ██╔██╗ ██║     ██║     ██║   ██║╚════██║     ║
║     ██║╚██████╔╝██╗    ███████╗██╔╝ ██╗╚██████╗███████╗╚██████╔╝███████║     ║
║     ╚═╝ ╚═════╝ ╚═╝    ╚══════╝╚═╝  ╚═╝ ╚═════╝╚══════╝ ╚═════╝ ╚══════╝     ║
║                                                                              ║
║              ✨ CRYSTALLINE 10+ EXCLUSIVE COLLECTION ✨                       ║
║                                                                              ║
║    MISSION CRITICAL: Exact Environment Match                                 ║
║    Base: vip_vip_floor_artistic_recline_crystalline_4                        ║
║                                                                              ║
║    Cream Fur Throw • Dark Walls • Warm Sconces • Candles                     ║
║    Same Model • Same Wardrobe • Premium 10+ Intimacy                         ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
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

  // Parse arguments
  const args = process.argv.slice(2);
  const startIndex = parseInt(args[0]) || 0;
  const count = parseInt(args[1]) || EXCLUSIVE_VARIANTS.length;

  const variantsToGenerate = EXCLUSIVE_VARIANTS.slice(startIndex, startIndex + count);

  console.log(`\n${'═'.repeat(78)}`);
  log(`✨ GENERATING ${variantsToGenerate.length} PREMIUM 10+ EXCLUSIVE VARIANTS`);
  log(`   Environment: EXACT MATCH to reference image`);
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

    const timestamp = Date.now();
    const outputPath = path.join(OUTPUT_DIR, `exclusive_${variant.id}_${timestamp}.png`);
    const prompt = buildExclusivePrompt(variant);

    console.log(`\n${'─'.repeat(78)}`);
    log(`✨ [${i + 1}/${variantsToGenerate.length}] ${variant.name}`);
    log(`   Camera: ${variant.camera.name}`);
    log(`   Lighting: ${variant.lighting.name}`);

    try {
      const result = await generateImage(prompt, outputPath, oauthToken);
      log(`   ✅ Saved: ${path.basename(outputPath)} (${(result.size / 1024 / 1024).toFixed(2)} MB)`);

      results.success.push({
        name: variant.name,
        id: variant.id,
        pose: variant.pose.name,
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
  console.log('              CRYSTALLINE 10+ EXCLUSIVE COMPLETE');
  console.log(`${'═'.repeat(78)}`);

  console.log(`\n  ✅ Successful: ${results.success.length}`);
  console.log(`  ❌ Failed: ${results.failed.length}`);

  if (results.success.length > 0) {
    console.log('\n  Generated images:');
    results.success.forEach(item => {
      console.log(`     📸 ${item.name} (${(item.size / 1024 / 1024).toFixed(2)} MB)`);
    });
  }

  console.log(`\n  Output: ${OUTPUT_DIR}`);
  console.log(`${'═'.repeat(78)}\n`);

  // Save manifest
  const manifestPath = path.join(OUTPUT_DIR, 'exclusive-manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify({
    series: 'Crystalline 10+ Exclusive Collection',
    timestamp: new Date().toISOString(),
    reference: 'vip_vip_floor_artistic_recline_crystalline_4_1768127909673.png',
    concept: 'EXACT environment match with pose/lighting/camera variations',
    environment: 'Cream fur throw, dark textured walls, warm sconces, candles',
    wardrobe: 'Silver-gray crystalline mesh two-piece set',
    intimacy: '10+ Premium VIP Exclusive',
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
