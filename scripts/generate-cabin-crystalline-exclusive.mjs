#!/usr/bin/env node
/**
 * VERALABS WOODEN CABIN CRYSTALLINE 10+ EXCLUSIVE
 *
 * Private Exclusive Wooden Cabin Collection
 *
 * Environment: Warmly lit private wooden cabin
 * Style: Modern + Victorian minimalist fusion
 * Design: Elegant yet minimalist
 * Wardrobe: Amalgamative dynamics - texture matching surface
 * Intimacy: Premium 10+ Exclusive
 *
 * Surfaces: Floor, Bed, Sofa, Table, Tub
 * Cinematic Realism with Private Housing Interior References
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const PROXY_URL = 'http://localhost:3001';
const OUTPUT_DIR = '/home/ecolex/version1/generated-cabin-crystalline';
const PROJECT_ID = 'zaranovel';
const LOCATION = 'us-central1';

// ============================================================================
// CABIN MUSE - Same Indian Hourglass Model
// ============================================================================
const CABIN_MUSE = `Stunning Indian fashion muse, 5'8" tall,
fit athletic voluptuous hourglass figure with dramatic sculptural curves,
bust 37DD", cinched waist 27", wide rounded hips 40",
sun-kissed bronze complexion with NATURAL MATTE FINISH,
visible skin pores and fine vellus hair catching warm cabin light,
authentic human skin texture with subtle natural imperfections,
striking Indian features with captivating dark magnetic gaze,
full sensual lips, dramatic high cheekbones, defined jawline,
long flowing jet-black hair with natural loose waves,
age 26, commanding presence of luxury lifestyle model`;

// ============================================================================
// REALISTIC SKIN TEXTURE
// ============================================================================
const REALISTIC_SKIN = `
Photorealistic skin rendering:
- Visible skin pores with natural texture variation
- Fine vellus hair catching warm light naturally
- Matte natural skin finish, NO artificial oily sheen
- Subtle skin imperfections for authenticity
- No plastic AI appearance, no airbrushed look
- Medium format camera skin detail quality`;

// ============================================================================
// WOODEN CABIN ENVIRONMENT - Victorian-Modern Minimalist Fusion
// ============================================================================
const CABIN_BASE = `Private exclusive wooden cabin interior:
- Warm honey-toned wood paneling on walls and ceiling
- Exposed wooden beams with rich grain texture
- Modern-Victorian minimalist design fusion
- Warm ambient lighting from Edison bulbs and candles
- Large windows with soft natural light filtering through
- Elegant minimalist furnishings with quality materials
- Cozy intimate private housing atmosphere
- Color palette: warm woods, cream, ivory, soft grays`;

// ============================================================================
// SURFACE-SPECIFIC ENVIRONMENTS
// ============================================================================
const CABIN_SURFACES = {
  wooden_floor: {
    name: 'Wooden Floor Intimate',
    description: `${CABIN_BASE}
    - Polished honey oak hardwood floor with rich grain
    - Plush cream sheepskin rug as accent
    - Low warm lighting from nearby fireplace glow
    - Minimalist space with floor as main surface
    - Victorian-modern side table with single candle`
  },
  cabin_bed: {
    name: 'Cabin Bed Chamber',
    description: `${CABIN_BASE}
    - Low platform bed with natural wood frame
    - Crisp white linen sheets with subtle texture
    - Cream and ivory throw pillows
    - Soft ambient light from bedside Edison lamps
    - Sheer curtains filtering morning light
    - Minimalist Victorian headboard in carved wood`
  },
  leather_sofa: {
    name: 'Leather Sofa Lounge',
    description: `${CABIN_BASE}
    - Cognac brown leather Chesterfield sofa
    - Victorian-inspired tufted design with modern lines
    - Cream cashmere throw draped on arm
    - Warm fireplace glow illuminating the scene
    - Minimalist wooden side tables
    - Soft reading lamp creating intimate pool of light`
  },
  wooden_table: {
    name: 'Wooden Table Scene',
    description: `${CABIN_BASE}
    - Rustic reclaimed wood dining table
    - Warm honey tones with natural imperfections
    - Single white candle in iron holder
    - Soft window light from behind
    - Minimalist Victorian chairs with cream cushions
    - Intimate breakfast nook atmosphere`
  },
  copper_tub: {
    name: 'Copper Soaking Tub',
    description: `${CABIN_BASE}
    - Freestanding copper soaking tub with patina
    - Victorian clawfoot design with modern minimalist placement
    - Warm water with subtle steam
    - Candles arranged around tub edge
    - Natural wood floor beneath
    - Large window with mountain/forest view
    - White fluffy towels nearby`
  }
};

// ============================================================================
// AMALGAMATIVE WARDROBES - Texture Matching Surface
// ============================================================================
const AMALGAMATIVE_WARDROBES = {
  // FOR WOODEN FLOOR - Warm tones matching wood
  honey_silk: {
    name: 'Honey Silk Minimal',
    surface: 'wooden_floor',
    description: `Minimal silk two-piece in warm honey gold,
    color matching the wooden floor tones,
    delicate bralette with thin straps,
    high-cut brief with silk sheen,
    fabric catching light like polished wood,
    barely-there coverage creating skin-silk-wood harmony`
  },
  cream_lace_floor: {
    name: 'Cream Lace on Sheepskin',
    surface: 'wooden_floor',
    description: `Delicate cream French lace bodysuit,
    matching the sheepskin rug texture,
    intricate lacework creating textile harmony,
    soft ivory tone blending with cream fur,
    minimal coverage with elegant detailing,
    skin-lace-fur visual amalgamation`
  },

  // FOR BED - White/cream matching sheets
  white_mesh_bed: {
    name: 'White Crystalline Mesh',
    surface: 'cabin_bed',
    description: `Pure white crystalline mesh two-piece,
    matching the white linen sheets,
    geometric mesh pattern with subtle sparkle,
    bralette and brief in matching white,
    fabric blending into bedding,
    skin emerging from white-on-white harmony`
  },
  ivory_silk_bed: {
    name: 'Ivory Silk Whisper',
    surface: 'cabin_bed',
    description: `Whisper-thin ivory silk teddy,
    matching the cream throw pillows,
    plunging neckline with minimal coverage,
    silk pooling like liquid on sheets,
    barely visible against white linens,
    ethereal skin-silk-linen fusion`
  },

  // FOR LEATHER SOFA - Cognac/brown tones
  cognac_lace: {
    name: 'Cognac Lace Elegance',
    surface: 'leather_sofa',
    description: `Rich cognac brown French lace set,
    matching the leather sofa color,
    structured bralette with underwire,
    high-waisted brief with scalloped edges,
    lace pattern echoing leather texture,
    warm brown skin-lace-leather harmony`
  },
  cream_cashmere: {
    name: 'Cream Cashmere Drape',
    surface: 'leather_sofa',
    description: `Soft cream cashmere wrap as coverage,
    matching the throw on sofa arm,
    draped artistically across body,
    strategic minimal coverage,
    luxurious texture against skin,
    cashmere-skin-leather visual flow`
  },

  // FOR WOODEN TABLE - Natural wood tones
  nude_mesh_table: {
    name: 'Nude Mesh Natural',
    surface: 'wooden_table',
    description: `Skin-tone nude mesh bodysuit,
    matching bronze skin and wood tones,
    barely visible coverage,
    geometric pattern creating texture,
    body appearing to emerge from wood,
    nude-skin-wood seamless transition`
  },
  caramel_silk: {
    name: 'Caramel Silk Flow',
    surface: 'wooden_table',
    description: `Flowing caramel silk slip dress,
    matching warm wood table tones,
    thin straps with plunging back,
    silk pooling on table surface,
    warm browns creating harmony,
    silk-wood-skin color fusion`
  },

  // FOR COPPER TUB - Water/copper aesthetic
  sheer_wet: {
    name: 'Sheer White Wet Look',
    surface: 'copper_tub',
    description: `Sheer white bodysuit appearing wet,
    translucent fabric clinging to curves,
    water droplets on skin and fabric,
    minimal coverage with wet transparency,
    fabric becoming one with water,
    wet-skin-water visual merger`
  },
  copper_silk: {
    name: 'Copper Silk Accent',
    surface: 'copper_tub',
    description: `Copper-rose silk wrap draped on tub edge,
    matching the copper tub patina,
    strategically covering while in water,
    metallic sheen echoing copper,
    warm rose-gold against bronze skin,
    copper-silk-skin warm harmony`
  }
};

// ============================================================================
// 10+ EXCLUSIVE POSES
// ============================================================================
const CABIN_POSES = {
  // FLOOR POSES
  floor_recline: {
    name: 'Floor Recline on Sheepskin',
    description: `Reclining on cream sheepskin rug on wooden floor,
    body in elegant S-curve showing hourglass silhouette,
    one arm behind head, other trailing down body,
    warm firelight casting golden glow on skin,
    expression of complete private relaxation`
  },
  floor_stretch: {
    name: 'Morning Floor Stretch',
    description: `Stretching languidly on wooden floor,
    arms extended above head,
    back arched in natural awakening pose,
    sunlight from window warming skin,
    intimate private morning moment`
  },

  // BED POSES
  bed_tangled: {
    name: 'Tangled in Sheets',
    description: `Lying in bed with sheets artistically tangled,
    white linen partially covering body,
    one leg exposed showing full length,
    arms above head in surrender,
    just-awakened intimate expression`
  },
  bed_side_gaze: {
    name: 'Side Gaze in Bed',
    description: `Lying on side in white sheets,
    direct intense gaze at camera,
    hourglass profile fully visible,
    sheets pooled at waist,
    intimate private bedroom moment`
  },

  // SOFA POSES
  sofa_recline: {
    name: 'Leather Sofa Recline',
    description: `Reclined on leather Chesterfield sofa,
    legs draped over arm rest,
    one hand behind head,
    firelight warming the scene,
    luxurious private lounge moment`
  },
  sofa_kneel: {
    name: 'Kneeling on Sofa',
    description: `Kneeling on leather sofa facing camera,
    sitting back on heels,
    arms creating elegant frame,
    confident sensual expression,
    intimate living room setting`
  },

  // TABLE POSES
  table_perch: {
    name: 'Table Edge Perch',
    description: `Perched on edge of wooden table,
    legs crossed elegantly,
    leaning back on hands,
    morning light from window behind,
    casual intimate breakfast scene`
  },
  table_recline: {
    name: 'Table Recline Artistic',
    description: `Reclining across wooden table surface,
    body creating sculptural line,
    wood grain visible beneath,
    artistic pose merging body with furniture,
    avant-garde intimate composition`
  },

  // TUB POSES
  tub_emerge: {
    name: 'Emerging from Bath',
    description: `Rising from copper tub,
    water streaming down body,
    one hand on tub edge for balance,
    looking over shoulder at camera,
    steam creating ethereal atmosphere`
  },
  tub_recline: {
    name: 'Bathing Recline',
    description: `Reclining in copper soaking tub,
    head resting on tub edge,
    one knee raised above water,
    candlelight reflecting on water and copper,
    ultimate private relaxation moment`
  }
};

// ============================================================================
// WARM CABIN LIGHTING
// ============================================================================
const CABIN_LIGHTING = {
  fireplace_glow: {
    name: 'Fireplace Glow',
    description: `Warm flickering fireplace as primary light,
    orange-gold tones on skin at 2200K,
    dancing shadows creating movement,
    intimate cozy atmosphere,
    deep shadows with warm fill`
  },
  morning_window: {
    name: 'Morning Window Light',
    description: `Soft diffused morning light through windows,
    warm golden hour quality around 3200K,
    natural shadows defining form,
    intimate private morning atmosphere,
    gentle gradients across skin`
  },
  edison_ambient: {
    name: 'Edison Bulb Ambient',
    description: `Warm Edison bulb lighting overhead,
    vintage tungsten warmth at 2700K,
    soft pools of light on subject,
    Victorian-modern lighting aesthetic,
    intimate low-light atmosphere`
  },
  candle_romance: {
    name: 'Candlelight Romance',
    description: `Multiple candles as primary illumination,
    flickering warm light creating romance,
    deep intimate shadows,
    orange-gold color temperature,
    ultimate private moment lighting`
  }
};

// ============================================================================
// BUILD 20 CURATED VARIANTS
// ============================================================================
const CABIN_VARIANTS = [];

const CURATED_COMBINATIONS = [
  // WOODEN FLOOR SERIES (4 variants)
  { surface: 'wooden_floor', wardrobe: 'honey_silk', pose: 'floor_recline', lighting: 'fireplace_glow' },
  { surface: 'wooden_floor', wardrobe: 'cream_lace_floor', pose: 'floor_stretch', lighting: 'morning_window' },
  { surface: 'wooden_floor', wardrobe: 'honey_silk', pose: 'floor_stretch', lighting: 'candle_romance' },
  { surface: 'wooden_floor', wardrobe: 'cream_lace_floor', pose: 'floor_recline', lighting: 'edison_ambient' },

  // BED SERIES (4 variants)
  { surface: 'cabin_bed', wardrobe: 'white_mesh_bed', pose: 'bed_tangled', lighting: 'morning_window' },
  { surface: 'cabin_bed', wardrobe: 'ivory_silk_bed', pose: 'bed_side_gaze', lighting: 'edison_ambient' },
  { surface: 'cabin_bed', wardrobe: 'white_mesh_bed', pose: 'bed_side_gaze', lighting: 'candle_romance' },
  { surface: 'cabin_bed', wardrobe: 'ivory_silk_bed', pose: 'bed_tangled', lighting: 'morning_window' },

  // LEATHER SOFA SERIES (4 variants)
  { surface: 'leather_sofa', wardrobe: 'cognac_lace', pose: 'sofa_recline', lighting: 'fireplace_glow' },
  { surface: 'leather_sofa', wardrobe: 'cream_cashmere', pose: 'sofa_kneel', lighting: 'edison_ambient' },
  { surface: 'leather_sofa', wardrobe: 'cognac_lace', pose: 'sofa_kneel', lighting: 'candle_romance' },
  { surface: 'leather_sofa', wardrobe: 'cream_cashmere', pose: 'sofa_recline', lighting: 'fireplace_glow' },

  // WOODEN TABLE SERIES (4 variants)
  { surface: 'wooden_table', wardrobe: 'nude_mesh_table', pose: 'table_perch', lighting: 'morning_window' },
  { surface: 'wooden_table', wardrobe: 'caramel_silk', pose: 'table_recline', lighting: 'edison_ambient' },
  { surface: 'wooden_table', wardrobe: 'nude_mesh_table', pose: 'table_recline', lighting: 'candle_romance' },
  { surface: 'wooden_table', wardrobe: 'caramel_silk', pose: 'table_perch', lighting: 'morning_window' },

  // COPPER TUB SERIES (4 variants)
  { surface: 'copper_tub', wardrobe: 'sheer_wet', pose: 'tub_emerge', lighting: 'candle_romance' },
  { surface: 'copper_tub', wardrobe: 'copper_silk', pose: 'tub_recline', lighting: 'edison_ambient' },
  { surface: 'copper_tub', wardrobe: 'sheer_wet', pose: 'tub_recline', lighting: 'fireplace_glow' },
  { surface: 'copper_tub', wardrobe: 'copper_silk', pose: 'tub_emerge', lighting: 'candle_romance' }
];

CURATED_COMBINATIONS.forEach((combo, idx) => {
  const surface = CABIN_SURFACES[combo.surface];
  const wardrobe = AMALGAMATIVE_WARDROBES[combo.wardrobe];
  const pose = CABIN_POSES[combo.pose];
  const lighting = CABIN_LIGHTING[combo.lighting];

  CABIN_VARIANTS.push({
    id: `cabin_${combo.surface.split('_')[0]}_${combo.wardrobe.split('_')[0]}_${idx}`,
    name: `${pose.name} - ${wardrobe.name}`,
    surface: surface,
    wardrobe: wardrobe,
    pose: pose,
    lighting: lighting,
    category: surface.name.toUpperCase()
  });
});

// ============================================================================
// QUALITY PREFIX
// ============================================================================
const QUALITY_PREFIX = `Masterpiece cinematic photograph with real interior housing reference quality.
Private exclusive wooden cabin setting with Victorian-modern minimalist design.
Award-winning architectural digest interior photography aesthetic.
Museum-quality intimate portraiture in luxury private residence.`;

// ============================================================================
// BUILD OPTIMIZED PROMPT
// ============================================================================
function buildCabinPrompt(variant) {
  return `${QUALITY_PREFIX}

MODEL:
${CABIN_MUSE}

ENVIRONMENT - ${variant.surface.name}:
${variant.surface.description}

WARDROBE - ${variant.wardrobe.name} (Amalgamative with Surface):
${variant.wardrobe.description}

POSE - ${variant.pose.name}:
${variant.pose.description}

LIGHTING - ${variant.lighting.name}:
${variant.lighting.description}

ARTISTIC DIRECTION:
Premium 10+ VIP Exclusive intimate collection.
Warmly lit private wooden cabin with Victorian-modern minimalist fusion.
AMALGAMATIVE DYNAMICS: Wardrobe texture/color matching the lying surface.
Elegant minimalist design with quality materials and warm wood tones.
Real cinematic realism with private housing interior authenticity.
Intimate private moment in exclusive personal cabin retreat.

${REALISTIC_SKIN}
Shot on Hasselblad X2D 100C, 80mm f/1.9 lens.
8K ultra-detailed with exceptional dynamic range.
Warm color grading emphasizing wood tones and skin.
Subtle Kodak Portra 400 film grain.`;
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
║    ██████╗ █████╗ ██████╗ ██╗███╗   ██╗                                      ║
║   ██╔════╝██╔══██╗██╔══██╗██║████╗  ██║                                      ║
║   ██║     ███████║██████╔╝██║██╔██╗ ██║                                      ║
║   ██║     ██╔══██║██╔══██╗██║██║╚██╗██║                                      ║
║   ╚██████╗██║  ██║██████╔╝██║██║ ╚████║                                      ║
║    ╚═════╝╚═╝  ╚═╝╚═════╝ ╚═╝╚═╝  ╚═══╝                                      ║
║                                                                              ║
║         ✨ WOODEN CABIN CRYSTALLINE 10+ EXCLUSIVE ✨                          ║
║                                                                              ║
║    Victorian-Modern Minimalist Fusion • Warm Wood Tones                      ║
║    Amalgamative Dynamics: Wardrobe Matching Surface                          ║
║    Premium 10+ Intimacy • Cinematic Realism                                  ║
║                                                                              ║
║    FLOOR | BED | SOFA | TABLE | TUB                                          ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
  `);

  // Create output directory structure
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const categories = ['floor', 'bed', 'sofa', 'table', 'tub'];
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
  const count = parseInt(args[1]) || CABIN_VARIANTS.length;
  const categoryFilter = args[2];

  let variantsToGenerate = CABIN_VARIANTS;
  if (categoryFilter) {
    variantsToGenerate = variantsToGenerate.filter(v =>
      v.category.toLowerCase().includes(categoryFilter.toLowerCase())
    );
  }
  variantsToGenerate = variantsToGenerate.slice(startIndex, startIndex + count);

  console.log(`\n${'═'.repeat(78)}`);
  log(`✨ GENERATING ${variantsToGenerate.length} WOODEN CABIN 10+ EXCLUSIVE VARIANTS`);
  if (categoryFilter) log(`   Surface filter: ${categoryFilter}`);
  console.log(`${'═'.repeat(78)}`);

  const results = { success: [], failed: [] };
  let tokenRefreshCounter = 0;

  for (let i = 0; i < variantsToGenerate.length; i++) {
    const variant = variantsToGenerate[i];

    tokenRefreshCounter++;
    if (tokenRefreshCounter > 4) {
      log('🔄 Refreshing OAuth token...');
      oauthToken = await getOAuthToken();
      tokenRefreshCounter = 0;
    }

    // Extract surface type from variant for category directory
    const surfaceKey = Object.keys(CABIN_SURFACES).find(k => variant.surface.name.includes(CABIN_SURFACES[k].name.split(' ')[0]));
    const catDir = surfaceKey ? surfaceKey.split('_')[0] : 'misc';
    const timestamp = Date.now();
    const outputPath = path.join(OUTPUT_DIR, catDir, `cabin_${variant.id}_${timestamp}.png`);
    const prompt = buildCabinPrompt(variant);

    console.log(`\n${'─'.repeat(78)}`);
    log(`✨ [${i + 1}/${variantsToGenerate.length}] ${variant.name}`);
    log(`   Surface: ${variant.surface.name}`);
    log(`   Wardrobe: ${variant.wardrobe.name}`);
    log(`   Lighting: ${variant.lighting.name}`);

    try {
      const result = await generateImage(prompt, outputPath, oauthToken);
      log(`   ✅ Saved: ${path.basename(outputPath)} (${(result.size / 1024 / 1024).toFixed(2)} MB)`);

      results.success.push({
        name: variant.name,
        id: variant.id,
        surface: variant.surface.name,
        wardrobe: variant.wardrobe.name,
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
  console.log('              WOODEN CABIN 10+ EXCLUSIVE COMPLETE');
  console.log(`${'═'.repeat(78)}`);

  console.log(`\n  ✅ Successful: ${results.success.length}`);
  console.log(`  ❌ Failed: ${results.failed.length}`);

  if (results.success.length > 0) {
    const byCategory = {};
    results.success.forEach(r => {
      const cat = r.surface;
      if (!byCategory[cat]) byCategory[cat] = [];
      byCategory[cat].push(r);
    });

    for (const [category, items] of Object.entries(byCategory)) {
      console.log(`     🏠 ${category}: ${items.length} images`);
      items.forEach(item => {
        console.log(`        📸 ${item.name} (${(item.size / 1024 / 1024).toFixed(2)} MB)`);
      });
    }
  }

  console.log(`\n  Output: ${OUTPUT_DIR}`);
  console.log(`${'═'.repeat(78)}\n`);

  // Save manifest
  const manifestPath = path.join(OUTPUT_DIR, 'cabin-manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify({
    series: 'Wooden Cabin Crystalline 10+ Exclusive',
    timestamp: new Date().toISOString(),
    concept: 'Victorian-Modern minimalist wooden cabin with amalgamative wardrobe dynamics',
    environment: 'Private exclusive wooden cabin with warm lighting',
    surfaces: Object.keys(CABIN_SURFACES),
    wardrobes: Object.keys(AMALGAMATIVE_WARDROBES),
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
