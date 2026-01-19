#!/usr/bin/env node
/**
 * VERALABS VIP UNDERGROUND GOSSAMER COLLECTION
 *
 * Premium Private Club Editorial Series
 *
 * Concepts:
 * - Gossamer mesh high-textured realistic transparency
 * - Underground VIP private club minimalist environment
 * - Multiple poses: couch, floor, bed, walls, counter, table
 * - Cinematic noir + classical-modern fusion
 * - Editorial boudoir meets haute couture
 * - Mesh high fashion: lingerie, bodice, bodysuit, open framework
 * - Strategic minimal coverage with sensuous artistry
 * - Realistic skin texture (NO oily AI glow)
 *
 * Max-God Mode Nexus Execution
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const PROXY_URL = 'http://localhost:3001';
const OUTPUT_DIR = '/home/ecolex/version1/generated-vip-underground';
const PROJECT_ID = 'zaranovel';
const LOCATION = 'us-central1';

// ============================================================================
// VIP UNDERGROUND MUSE - Premium Indian Hourglass with Realistic Skin
// ============================================================================
const VIP_MUSE = `Stunning Indian fashion muse, 5'8" tall,
fit athletic voluptuous hourglass figure with dramatic sculptural curves,
bust 37DD", cinched waist 27", wide rounded hips 40",
sun-kissed bronze complexion with NATURAL MATTE FINISH,
visible skin pores and fine vellus hair catching ambient light,
authentic human skin texture with subtle natural imperfections,
striking Indian features with captivating dark magnetic gaze,
full sensual lips, dramatic high cheekbones, defined jawline,
long flowing jet-black hair styled in loose waves,
age 26, commanding presence of luxury brand ambassador`;

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
// QUALITY PREFIX - Cinematic Noir Fine Art
// ============================================================================
const QUALITY_PREFIX = `Masterpiece cinematic noir photograph fusing classical fine art
with modern editorial excellence. In the tradition of Helmut Newton's powerful
compositions, Peter Lindbergh's raw intimacy, and Paolo Roversi's ethereal beauty.
Museum-quality intimate portraiture for prestigious gallery exhibition.
Award-winning fashion editorial meets fine art boudoir photography.`;

// ============================================================================
// QUALITY SUFFIX - Technical Excellence
// ============================================================================
const QUALITY_SUFFIX = `
Shot on Hasselblad X2D 100C medium format, Zeiss Otus 85mm f/1.4.
8K ultra-detailed resolution with exceptional tonal depth.
${REALISTIC_SKIN}
Cinematic color grading with rich blacks and warm skin tones.
Subtle Kodak Vision3 500T film grain for organic texture.
Collector's edition archival print quality.`;

// ============================================================================
// GOSSAMER MESH WARDROBES - High Fashion Transparency Concepts
// ============================================================================
const GOSSAMER_WARDROBES = {
  // MESH HIGH FASHION
  architectural_mesh_bodysuit: {
    name: 'Architectural Mesh Bodysuit',
    intimacy: 10,
    description: `High-fashion architectural mesh bodysuit in midnight black,
    geometric grid pattern with strategic opacity variations,
    sheer mesh panels revealing sculptural form beneath,
    structured bodice with underwire silhouette,
    mesh extending over shoulders and down to mid-thigh,
    architectural seaming creating visual framework on skin`
  },
  gossamer_lace_bodice: {
    name: 'Gossamer Lace Bodice',
    intimacy: 9,
    description: `Delicate French Chantilly lace bodice in champagne ivory,
    gossamer-thin translucent fabric with intricate floral patterns,
    structured underwire cups with sheer lace overlay,
    high-cut French leg design with strategic coverage,
    tiny silk ribbon details at shoulders and hips,
    fabric so fine the skin texture shows through`
  },
  open_framework_lingerie: {
    name: 'Open Framework Couture',
    intimacy: 10,
    description: `Avant-garde open framework lingerie in matte black,
    architectural straps creating geometric patterns across torso,
    minimal triangular coverage with connector straps,
    body chain elements integrated with fabric framework,
    negative space design emphasizing sculptural form,
    haute couture construction with strategic minimalism`
  },
  sheer_noir_teddy: {
    name: 'Sheer Noir Teddy',
    intimacy: 9,
    description: `Ultra-sheer black teddy in gossamer mesh fabric,
    plunging neckline to navel with delicate chain detail,
    high-cut sides revealing hip bones and upper thigh,
    barely-there fabric with visible skin texture beneath,
    thin spaghetti straps and open back design,
    snap closure with silk ribbon accents`
  },
  crystalline_mesh_set: {
    name: 'Crystalline Mesh Ensemble',
    intimacy: 10,
    description: `Two-piece crystalline mesh set in silver-gray,
    micro-mesh bralette with geometric underwire structure,
    matching high-waisted mesh brief with sheer panels,
    fabric embedded with tiny crystal particles catching light,
    architectural seaming creating diamond patterns,
    barely-there opacity revealing every contour`
  },
  velvet_mesh_fusion: {
    name: 'Velvet Mesh Fusion',
    intimacy: 9,
    description: `Luxurious velvet and mesh fusion bodysuit,
    rich burgundy velvet strategic panels at bust and hips,
    sheer black mesh connecting velvet sections,
    plunging V-neckline with velvet trim,
    mesh side panels revealing waist and ribs,
    thong back with velvet waistband detail`
  }
};

// ============================================================================
// VIP UNDERGROUND CLUB ENVIRONMENTS
// ============================================================================
const VIP_ENVIRONMENTS = {
  noir_lounge_couch: {
    name: 'Noir Lounge - Velvet Couch',
    description: `Underground VIP lounge with deep charcoal walls,
    luxurious curved velvet sofa in rich burgundy,
    minimalist concrete floor with subtle sheen,
    dramatic overhead spotlight creating pool of light,
    exposed industrial ceiling with black pipes,
    single neon accent strip in warm amber along wall`
  },
  private_floor_space: {
    name: 'Private Room - Floor',
    description: `Intimate private room with polished concrete floor,
    plush faux fur throw in cream on the floor,
    dark textured walls with subtle venetian plaster,
    low warm lighting from recessed wall sconces,
    minimalist industrial-luxe aesthetic,
    single dramatic shaft of light from above`
  },
  vip_bed_chamber: {
    name: 'VIP Chamber - Platform Bed',
    description: `Exclusive VIP chamber with low platform bed,
    crisp white sheets with charcoal silk pillows,
    dark matte walls with integrated LED strip lighting,
    industrial exposed brick accent wall,
    minimalist nightstand with single candle,
    intimate ambient lighting in warm tones`
  },
  club_wall_lean: {
    name: 'Club Wall - Lean',
    description: `Underground club corridor with textured concrete wall,
    dramatic side lighting creating sharp shadows,
    industrial metal accent panels,
    polished dark floor reflecting ambient light,
    minimalist raw aesthetic with luxury touches,
    single spotlight illuminating wall section`
  },
  bar_counter_perch: {
    name: 'Private Bar - Counter',
    description: `Exclusive private bar with black marble counter,
    polished surface reflecting soft amber lighting,
    dark leather bar stool with chrome details,
    backlit shelving with premium spirits,
    industrial pendant lights overhead,
    intimate club atmosphere with luxury finishes`
  },
  lounge_table_scene: {
    name: 'VIP Lounge - Coffee Table',
    description: `Private lounge area with low glass coffee table,
    plush floor cushions in deep jewel tones,
    dark walls with subtle texture and sheen,
    warm candlelight creating intimate atmosphere,
    industrial-luxe minimalist design,
    soft ambient glow from hidden LED strips`
  }
};

// ============================================================================
// ARTISTIC POSES FOR VIP SETTINGS
// ============================================================================
const VIP_POSES = {
  // COUCH POSES
  couch_recline_seductive: {
    name: 'Velvet Recline',
    furniture: 'couch',
    description: `Reclined along velvet sofa with legs extended,
    one arm draped behind head, other resting on hip,
    back arched showing dramatic S-curve silhouette,
    head tilted back with sensual expression,
    mesh fabric catching light along every curve,
    private moment of luxury relaxation captured`
  },
  couch_seated_power: {
    name: 'Power Seated',
    furniture: 'couch',
    description: `Seated confidently on couch edge,
    legs crossed at knee showing sculpted thigh,
    leaning slightly forward with commanding presence,
    one hand on knee, other on couch arm,
    direct intense gaze into camera,
    mesh bodysuit creating geometric patterns in light`
  },

  // FLOOR POSES
  floor_artistic_recline: {
    name: 'Floor Artistic',
    furniture: 'floor',
    description: `Artistic recline on plush fur throw,
    body in graceful curved position,
    one knee raised creating sculptural angle,
    arms framing face with elegant gesture,
    looking up at camera with intimate expression,
    gossamer fabric pooling artistically around form`
  },
  floor_kneeling_grace: {
    name: 'Kneeling Grace',
    furniture: 'floor',
    description: `Kneeling on soft surface with perfect posture,
    sitting back on heels with spine elongated,
    arms creating artistic frame at sides,
    chin lifted with serene confident expression,
    mesh fabric stretched taut across curves,
    private devotional moment frozen in time`
  },

  // BED POSES
  bed_morning_stretch: {
    name: 'Morning Stretch',
    furniture: 'bed',
    description: `Stretching languidly across white sheets,
    arms extended above head in awakening gesture,
    back arched in natural stretch revealing silhouette,
    one knee bent creating dynamic angle,
    expression of private pleasure and comfort,
    sheer fabric contrasting against crisp linens`
  },
  bed_side_recline: {
    name: 'Side Recline',
    furniture: 'bed',
    description: `Lying on side showing full hourglass profile,
    head propped on bent arm with sensual expression,
    other arm draped along dramatic hip curve,
    legs slightly bent in relaxed natural position,
    sheets rumpled artistically around form,
    mesh revealing every sculptural contour`
  },

  // WALL POSES
  wall_lean_confident: {
    name: 'Wall Lean',
    furniture: 'wall',
    description: `Leaning against concrete wall with shoulder,
    one leg bent with foot flat against wall,
    arms at sides with relaxed confidence,
    head turned slightly with smoldering gaze,
    dramatic shadows from side lighting,
    architectural mesh creating linear patterns`
  },
  wall_hands_above: {
    name: 'Arms Raised',
    furniture: 'wall',
    description: `Standing against wall with arms raised overhead,
    hands resting on wall creating vertical line,
    body in slight S-curve emphasizing hourglass,
    weight on one hip in classical contrapposto,
    expression of confident vulnerability,
    mesh stretched taut revealing every curve`
  },

  // COUNTER POSES
  counter_perched: {
    name: 'Counter Perch',
    furniture: 'counter',
    description: `Perched on bar counter with legs crossed,
    leaning back slightly on hands behind,
    showcasing full front silhouette,
    one heel hooked on counter edge,
    confident alluring expression,
    mesh fabric catching bar lighting from above`
  },
  counter_lean_forward: {
    name: 'Counter Lean',
    furniture: 'counter',
    description: `Leaning forward onto counter on forearms,
    body curved showing dramatic back arch,
    looking over shoulder at camera,
    legs straight in elegant stance,
    posterior prominently displayed in frame,
    sheer fabric highlighting sculptural form`
  },

  // TABLE POSES
  table_lounging: {
    name: 'Table Lounge',
    furniture: 'table',
    description: `Lounging beside low table on floor cushions,
    one arm resting on table surface,
    body in relaxed reclined position,
    legs extended with elegant pointed toes,
    intimate conversation pose captured,
    gossamer fabric flowing across curves`
  },
  table_kneeling_lean: {
    name: 'Table Lean',
    furniture: 'table',
    description: `Kneeling beside table leaning onto surface,
    arms crossed on table supporting upper body,
    looking directly at camera with intensity,
    body creating dramatic curves from angle,
    private contemplative moment,
    mesh patterns visible in ambient lighting`
  }
};

// ============================================================================
// CINEMATIC NOIR LIGHTING STYLES
// ============================================================================
const NOIR_LIGHTING = {
  single_spotlight: `Single dramatic overhead spotlight creating pool of light,
    deep velvety shadows surrounding the subject,
    Helmut Newton-inspired high contrast with rich blacks,
    rim light defining silhouette edges against darkness`,

  venetian_noir: `Venetian blind shadows creating classic noir stripes,
    warm amber light filtering through creating linear patterns,
    deep shadows alternating with golden highlights,
    cinematic film noir atmosphere with modern edge`,

  ambient_glow: `Soft ambient glow from hidden LED strips,
    warm intimate lighting enveloping the scene,
    subtle fill preventing harsh shadows,
    luxurious private club atmosphere captured`,

  candle_intimate: `Warm candlelight creating romantic intimate atmosphere,
    soft flickering highlights on skin,
    deep shadows with warm orange undertones,
    classical painting illumination in modern setting`,

  neon_accent: `Dramatic pool of warm light with neon accent edge,
    amber main light with subtle pink or blue rim,
    contemporary club lighting aesthetic,
    creating color separation on skin tones`,

  chiaroscuro_modern: `Modern chiaroscuro with single strong side light,
    Renaissance-inspired dramatic shadow play,
    form emerging from darkness like classical painting,
    sculptural illumination defining every curve`
};

// ============================================================================
// BUILD COMPREHENSIVE VARIANT LIST
// ============================================================================
const VIP_VARIANTS = [];

// Generate all combinations systematically
const wardrobeKeys = Object.keys(GOSSAMER_WARDROBES);
const environmentKeys = Object.keys(VIP_ENVIRONMENTS);
const poseKeys = Object.keys(VIP_POSES);
const lightingKeys = Object.keys(NOIR_LIGHTING);

// Curated premium combinations (24 variants)
const CURATED_COMBINATIONS = [
  // COUCH SERIES
  { wardrobe: 'architectural_mesh_bodysuit', env: 'noir_lounge_couch', pose: 'couch_recline_seductive', lighting: 'single_spotlight', category: 'COUCH SERIES' },
  { wardrobe: 'gossamer_lace_bodice', env: 'noir_lounge_couch', pose: 'couch_seated_power', lighting: 'venetian_noir', category: 'COUCH SERIES' },
  { wardrobe: 'sheer_noir_teddy', env: 'noir_lounge_couch', pose: 'couch_recline_seductive', lighting: 'ambient_glow', category: 'COUCH SERIES' },
  { wardrobe: 'velvet_mesh_fusion', env: 'noir_lounge_couch', pose: 'couch_seated_power', lighting: 'neon_accent', category: 'COUCH SERIES' },

  // FLOOR SERIES
  { wardrobe: 'crystalline_mesh_set', env: 'private_floor_space', pose: 'floor_artistic_recline', lighting: 'candle_intimate', category: 'FLOOR SERIES' },
  { wardrobe: 'open_framework_lingerie', env: 'private_floor_space', pose: 'floor_kneeling_grace', lighting: 'chiaroscuro_modern', category: 'FLOOR SERIES' },
  { wardrobe: 'gossamer_lace_bodice', env: 'private_floor_space', pose: 'floor_artistic_recline', lighting: 'single_spotlight', category: 'FLOOR SERIES' },
  { wardrobe: 'architectural_mesh_bodysuit', env: 'private_floor_space', pose: 'floor_kneeling_grace', lighting: 'venetian_noir', category: 'FLOOR SERIES' },

  // BED SERIES
  { wardrobe: 'sheer_noir_teddy', env: 'vip_bed_chamber', pose: 'bed_morning_stretch', lighting: 'ambient_glow', category: 'BED SERIES' },
  { wardrobe: 'gossamer_lace_bodice', env: 'vip_bed_chamber', pose: 'bed_side_recline', lighting: 'candle_intimate', category: 'BED SERIES' },
  { wardrobe: 'velvet_mesh_fusion', env: 'vip_bed_chamber', pose: 'bed_morning_stretch', lighting: 'chiaroscuro_modern', category: 'BED SERIES' },
  { wardrobe: 'crystalline_mesh_set', env: 'vip_bed_chamber', pose: 'bed_side_recline', lighting: 'single_spotlight', category: 'BED SERIES' },

  // WALL SERIES
  { wardrobe: 'open_framework_lingerie', env: 'club_wall_lean', pose: 'wall_lean_confident', lighting: 'venetian_noir', category: 'WALL SERIES' },
  { wardrobe: 'architectural_mesh_bodysuit', env: 'club_wall_lean', pose: 'wall_hands_above', lighting: 'chiaroscuro_modern', category: 'WALL SERIES' },
  { wardrobe: 'sheer_noir_teddy', env: 'club_wall_lean', pose: 'wall_lean_confident', lighting: 'neon_accent', category: 'WALL SERIES' },
  { wardrobe: 'crystalline_mesh_set', env: 'club_wall_lean', pose: 'wall_hands_above', lighting: 'single_spotlight', category: 'WALL SERIES' },

  // COUNTER SERIES
  { wardrobe: 'velvet_mesh_fusion', env: 'bar_counter_perch', pose: 'counter_perched', lighting: 'ambient_glow', category: 'COUNTER SERIES' },
  { wardrobe: 'gossamer_lace_bodice', env: 'bar_counter_perch', pose: 'counter_lean_forward', lighting: 'neon_accent', category: 'COUNTER SERIES' },
  { wardrobe: 'open_framework_lingerie', env: 'bar_counter_perch', pose: 'counter_perched', lighting: 'single_spotlight', category: 'COUNTER SERIES' },
  { wardrobe: 'architectural_mesh_bodysuit', env: 'bar_counter_perch', pose: 'counter_lean_forward', lighting: 'venetian_noir', category: 'COUNTER SERIES' },

  // TABLE SERIES
  { wardrobe: 'crystalline_mesh_set', env: 'lounge_table_scene', pose: 'table_lounging', lighting: 'candle_intimate', category: 'TABLE SERIES' },
  { wardrobe: 'sheer_noir_teddy', env: 'lounge_table_scene', pose: 'table_kneeling_lean', lighting: 'ambient_glow', category: 'TABLE SERIES' },
  { wardrobe: 'velvet_mesh_fusion', env: 'lounge_table_scene', pose: 'table_lounging', lighting: 'chiaroscuro_modern', category: 'TABLE SERIES' },
  { wardrobe: 'gossamer_lace_bodice', env: 'lounge_table_scene', pose: 'table_kneeling_lean', lighting: 'single_spotlight', category: 'TABLE SERIES' }
];

// Build variants from curated combinations
CURATED_COMBINATIONS.forEach((combo, idx) => {
  const wardrobe = GOSSAMER_WARDROBES[combo.wardrobe];
  const env = VIP_ENVIRONMENTS[combo.env];
  const pose = VIP_POSES[combo.pose];
  const lighting = NOIR_LIGHTING[combo.lighting];

  VIP_VARIANTS.push({
    id: `vip_${combo.pose}_${combo.wardrobe.split('_')[0]}_${idx}`,
    name: `${pose.name} - ${wardrobe.name}`,
    wardrobe: wardrobe,
    environment: env,
    pose: pose,
    lighting: lighting,
    category: combo.category
  });
});

// ============================================================================
// BUILD OPTIMIZED PROMPT
// ============================================================================
function buildVIPPrompt(variant) {
  return `${QUALITY_PREFIX}

MODEL: ${VIP_MUSE}

WARDROBE - ${variant.wardrobe.name}:
${variant.wardrobe.description}

POSE - ${variant.pose.name}:
${variant.pose.description}

ENVIRONMENT - ${variant.environment.name}:
${variant.environment.description}

LIGHTING:
${variant.lighting}

ARTISTIC VISION:
Cinematic noir editorial boudoir fused with classical fine art sensibility.
Underground VIP private club atmosphere with luxury minimalist aesthetic.
Gossamer mesh transparency creating sculptural interplay of fabric and form.
Intimate private moment captured with haute couture editorial excellence.
Modern fashion photography meets timeless artistic composition.

${QUALITY_SUFFIX}`;
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
║   ██╗   ██╗██╗██████╗     ██╗   ██╗███╗   ██╗██████╗ ███████╗██████╗         ║
║   ██║   ██║██║██╔══██╗    ██║   ██║████╗  ██║██╔══██╗██╔════╝██╔══██╗        ║
║   ██║   ██║██║██████╔╝    ██║   ██║██╔██╗ ██║██║  ██║█████╗  ██████╔╝        ║
║   ╚██╗ ██╔╝██║██╔═══╝     ██║   ██║██║╚██╗██║██║  ██║██╔══╝  ██╔══██╗        ║
║    ╚████╔╝ ██║██║         ╚██████╔╝██║ ╚████║██████╔╝███████╗██║  ██║        ║
║     ╚═══╝  ╚═╝╚═╝          ╚═════╝ ╚═╝  ╚═══╝╚═════╝ ╚══════╝╚═╝  ╚═╝        ║
║                                                                              ║
║               ✨ GOSSAMER UNDERGROUND COLLECTION ✨                           ║
║                                                                              ║
║    VIP Private Club • Cinematic Noir • Haute Couture Mesh                    ║
║    Level 9-10 Intimacy • Realistic Skin Texture                              ║
║                                                                              ║
║    COUCH | FLOOR | BED | WALL | COUNTER | TABLE                              ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
  `);

  // Create output directory structure
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const categories = [...new Set(VIP_VARIANTS.map(v => v.category.toLowerCase().replace(/[^a-z0-9]/g, '_')))];
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
  const count = parseInt(args[1]) || VIP_VARIANTS.length;
  const categoryFilter = args[2];

  // Filter variants
  let variantsToGenerate = VIP_VARIANTS;
  if (categoryFilter) {
    variantsToGenerate = variantsToGenerate.filter(v =>
      v.category.toLowerCase().includes(categoryFilter.toLowerCase())
    );
  }
  variantsToGenerate = variantsToGenerate.slice(startIndex, startIndex + count);

  console.log(`\n${'═'.repeat(78)}`);
  log(`✨ GENERATING ${variantsToGenerate.length} VIP UNDERGROUND VARIANTS`);
  if (categoryFilter) log(`   Category filter: ${categoryFilter}`);
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

    const catDir = variant.category.toLowerCase().replace(/[^a-z0-9]/g, '_');
    const timestamp = Date.now();
    const outputPath = path.join(OUTPUT_DIR, catDir, `vip_${variant.id}_${timestamp}.png`);
    const prompt = buildVIPPrompt(variant);

    console.log(`\n${'─'.repeat(78)}`);
    log(`✨ [${i + 1}/${variantsToGenerate.length}] ${variant.name}`);
    log(`   Category: ${variant.category} | Pose: ${variant.pose.furniture}`);

    try {
      const result = await generateImage(prompt, outputPath, oauthToken);
      log(`   ✅ Saved: ${path.basename(outputPath)} (${(result.size / 1024 / 1024).toFixed(2)} MB)`);

      results.success.push({
        name: variant.name,
        id: variant.id,
        category: variant.category,
        furniture: variant.pose.furniture,
        wardrobe: variant.wardrobe.name,
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
  console.log('              VIP UNDERGROUND COLLECTION COMPLETE');
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
  const manifestPath = path.join(OUTPUT_DIR, 'vip-underground-manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify({
    series: 'VIP Underground Gossamer Collection',
    timestamp: new Date().toISOString(),
    concept: 'Cinematic noir editorial boudoir with gossamer mesh haute couture',
    skinTexture: 'Realistic with visible pores, NO oily glow',
    intimacyRange: '9-10',
    furnitureTypes: ['couch', 'floor', 'bed', 'wall', 'counter', 'table'],
    wardrobeTypes: Object.keys(GOSSAMER_WARDROBES),
    categories: categories,
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
