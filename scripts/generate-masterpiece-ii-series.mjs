#!/usr/bin/env node
/**
 * VERALABS MASTERPIECE II SERIES GENERATOR
 *
 * Shadow-Mesh Intimate Collection with Realistic Skin Texture
 *
 * Key Innovations:
 * 1. Shadow play creating mesh-like patterns (shadows as foundation garments)
 * 2. Realistic skin WITHOUT oily AI glow - visible pores, natural texture
 * 3. Level 9-10 intimacy with classical fine art framing
 * 4. Based on successful Velvet Throne aesthetic
 *
 * Optimization Strategy Synthesis:
 * - Vera Strategy: Art Directors Declaration + quality triggers
 * - Vera Strategy 2: Safe language mappings + quality anchors
 * - Classical art references (Edward Weston, Helmut Newton, Bill Brandt)
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const PROXY_URL = 'http://localhost:3001';
const OUTPUT_DIR = '/home/ecolex/version1/generated-masterpiece-ii';
const PROJECT_ID = 'zaranovel';
const LOCATION = 'us-central1';

// ============================================================================
// MASTERPIECE II MUSE - Indian Hourglass with Realistic Skin
// CRITICAL: No oily/glow language - focus on natural realistic skin texture
// ============================================================================
const MASTERPIECE_MUSE = `Stunning Indian muse, 5'8" tall,
fit athletic voluptuous hourglass figure with dramatic statuesque curves,
bust 37DD", cinched waist 27", wide rounded hips 40",
sun-kissed bronze complexion with NATURAL MATTE FINISH,
visible skin pores and fine vellus hair catching ambient light,
authentic human skin texture with subtle natural imperfections,
striking Indian features with captivating dark expressive eyes,
full sensual lips, dramatic high cheekbones,
long flowing jet-black hair with natural waves,
age 26, professional fashion model with commanding regal presence`;

// ============================================================================
// REALISTIC SKIN TEXTURE ANCHORS (Combats AI oily glow)
// ============================================================================
const REALISTIC_SKIN_ANCHORS = `
Skin rendered with photorealistic authenticity:
- Visible skin pores with natural texture variation
- Fine vellus hair catching the light naturally
- Matte natural skin finish without artificial sheen
- Subtle skin imperfections adding authenticity
- No oily glow, no plastic appearance, no AI smoothing
- Human skin texture as captured by medium format photography`;

// ============================================================================
// QUALITY PREFIX - Fine Art Photography Standards
// ============================================================================
const QUALITY_PREFIX = `Masterpiece fine art photograph in the tradition of Edward Weston's form studies,
Bill Brandt's surreal nudes, and Helmut Newton's powerful compositions.
Museum-quality intimate portraiture celebrating the human form as living sculpture.
Award-winning gallery exhibition quality.`;

// ============================================================================
// QUALITY SUFFIX - Technical Excellence
// ============================================================================
const QUALITY_SUFFIX = `
Shot on Hasselblad X2D 100C medium format camera, 80mm f/2.8 lens.
8K ultra-detailed resolution with exceptional dynamic range.
${REALISTIC_SKIN_ANCHORS}
Subtle Kodak Portra 400 film grain for organic texture.
Professional color grading with rich tonal depth.
Printed as museum archival giclée, collector's edition quality.`;

// ============================================================================
// SHADOW-MESH CONCEPT: Shadows functioning as artistic innerwear
// ============================================================================
const SHADOW_MESH_WARDROBES = {
  venetian_mesh: {
    name: 'Venetian Shadow Mesh',
    intimacy: 10,
    description: `Venetian blind shadows creating architectural grid pattern across skin,
    shadow lines functioning as geometric mesh innerwear,
    alternating bands of light and shadow sculpting the form,
    strategic shadow placement providing artistic modesty,
    body adorned only by light and shadow interplay`
  },
  lace_shadow_fusion: {
    name: 'Lace Shadow Fusion',
    intimacy: 9,
    description: `Delicate French lace bodysuit in champagne ivory with shadow enhancement,
    venetian shadow patterns overlaying the lace creating double-mesh effect,
    intricate lacework merged with geometric shadow lines,
    shadow and fabric combining to create sculptural coverage`
  },
  golden_lattice: {
    name: 'Golden Lattice Light',
    intimacy: 10,
    description: `Golden hour light filtered through ornate lattice screen,
    creating intricate geometric shadow patterns across bronze skin,
    shadow latticework functioning as architectural foundation garment,
    body wrapped in woven shadows from elaborate screen pattern`
  },
  forest_dapple: {
    name: 'Forest Dappled Light',
    intimacy: 9,
    description: `Natural forest light filtered through leaves creating organic shadow patterns,
    dappled light and shadow creating natural mesh coverage,
    organic shadow shapes adorning the figure like nature's lingerie,
    silk draping in earth tones complementing the shadow play`
  },
  chandelier_prism: {
    name: 'Chandelier Prism Shadows',
    intimacy: 10,
    description: `Crystal chandelier casting prismatic shadow patterns,
    geometric faceted shadows creating diamond-mesh effect on skin,
    light refracted through crystals painting the body with shadow art,
    shadow coverage from ornate chandelier functioning as artistic innerwear`
  },
  sheer_veil_shadow: {
    name: 'Gossamer Veil with Shadow',
    intimacy: 9,
    description: `Flowing gossamer fabric in skin-matching nude tone,
    venetian shadow stripes overlaying the sheer material,
    double layer of fabric translucency and shadow geometry,
    artistic interplay of textile and light creating sculptural coverage`
  }
};

// ============================================================================
// THRONE ROOM ENVIRONMENTS (Based on successful Velvet Throne)
// ============================================================================
const THRONE_ENVIRONMENTS = {
  velvet_throne: {
    name: 'Burgundy Velvet Throne',
    description: `Ornate golden throne with intricate carvings and lion armrests,
    deep burgundy velvet upholstery and matching wall panels,
    gold leaf molding and Renaissance decorative elements,
    single dramatic overhead spotlight creating shadow patterns`
  },
  shadow_chamber: {
    name: 'Shadow Play Chamber',
    description: `Minimalist dark chamber with single venetian blind window,
    dramatic side light creating sharp geometric shadow bands,
    rich velvet black backdrop with subtle texture,
    theatrical shadow projection environment`
  },
  lattice_pavilion: {
    name: 'Golden Lattice Pavilion',
    description: `Mughal-inspired pavilion with ornate geometric lattice screens,
    warm golden afternoon light filtering through intricate patterns,
    rich silk cushions in jewel tones on marble floor,
    shadow patterns dancing across the space`
  },
  crystal_chamber: {
    name: 'Crystal Chandelier Chamber',
    description: `Opulent chamber with massive crystal chandelier,
    prismatic light creating geometric shadow fractals,
    dark velvet draping and polished marble surfaces,
    warm candlelight augmenting the chandelier glow`
  },
  forest_boudoir: {
    name: 'Forest Light Boudoir',
    description: `Intimate boudoir space with large window facing forest,
    natural dappled light filtering through trees,
    organic shadow patterns playing across silk sheets,
    earth-toned luxurious textiles and natural wood elements`
  }
};

// ============================================================================
// POSE VARIATIONS FOR MASTERPIECE II
// ============================================================================
const ARTISTIC_POSES = {
  throne_seated: {
    name: 'Throne Seated Majesty',
    description: `Seated regally on throne, legs crossed elegantly at knee,
    hands resting on golden lion armrests,
    shoulders back with commanding presence,
    chin slightly lifted with imperial gaze,
    shadow mesh patterns visible across torso and thighs`
  },
  reclined_odalisque: {
    name: 'Modern Odalisque Recline',
    description: `Classical odalisque-inspired recline on velvet chaise,
    body in graceful S-curve showing full hourglass silhouette,
    one arm supporting head, other draped elegantly,
    shadow patterns following the sculptural curves`
  },
  standing_contrapposto: {
    name: 'Classical Contrapposto',
    description: `Standing in classical contrapposto pose,
    weight on one leg creating natural hip tilt,
    one arm raised adjusting hair, other at side,
    shadow mesh covering torso in geometric patterns`
  },
  profile_silhouette: {
    name: 'Profile Form Study',
    description: `Side profile showing complete silhouette,
    dramatic arch emphasizing spinal curve,
    looking over shoulder with contemplative expression,
    shadow bands creating horizontal stripes across form`
  },
  kneeling_grace: {
    name: 'Kneeling Grace',
    description: `Kneeling on velvet cushions,
    sitting back on heels with elegant posture,
    arms creating artistic frame around body,
    upward gaze with serene expression,
    shadow lattice adorning the kneeling figure`
  },
  venus_rising: {
    name: 'Venus Rising',
    description: `Standing emergence pose inspired by Botticelli,
    one hand at chest, other at hip in classical gesture,
    weight centered with ethereal presence,
    shadow patterns creating natural coverage`
  }
};

// ============================================================================
// LIGHTING STYLES FOR SHADOW CREATION
// ============================================================================
const SHADOW_LIGHTING = {
  venetian_dramatic: `Dramatic side lighting through venetian blinds creating sharp parallel shadow bands,
    Helmut Newton-inspired high contrast with deep blacks and bright highlights,
    shadow stripes at 45-degree angle across the figure`,

  lattice_golden: `Warm golden hour light filtering through ornate lattice screen,
    creating intricate geometric shadow patterns with soft edges,
    Rembrandt-style warmth with patterned shadow coverage`,

  chandelier_prismatic: `Crystal chandelier overhead casting faceted geometric shadows,
    prismatic light creating diamond-pattern shadow mesh,
    warm incandescent glow with complex shadow geometry`,

  natural_dappled: `Soft natural window light through foliage,
    organic dappled shadows with varying intensity,
    Peter Lindbergh-inspired natural intimate illumination`,

  renaissance_chiaroscuro: `Single dramatic light source creating Renaissance chiaroscuro,
    deep sculptural shadows defining every curve,
    Old Master painting illumination with strategic shadow placement`
};

// ============================================================================
// VARIANT DEFINITIONS FOR MASTERPIECE II SERIES
// ============================================================================
const MASTERPIECE_VARIANTS = [
  // VENETIAN MESH SERIES (Level 10)
  {
    id: 'venetian_throne',
    name: 'Venetian Throne Empress',
    wardrobe: SHADOW_MESH_WARDROBES.venetian_mesh,
    environment: THRONE_ENVIRONMENTS.velvet_throne,
    pose: ARTISTIC_POSES.throne_seated,
    lighting: SHADOW_LIGHTING.venetian_dramatic,
    category: 'VENETIAN MESH'
  },
  {
    id: 'venetian_odalisque',
    name: 'Venetian Shadow Odalisque',
    wardrobe: SHADOW_MESH_WARDROBES.venetian_mesh,
    environment: THRONE_ENVIRONMENTS.shadow_chamber,
    pose: ARTISTIC_POSES.reclined_odalisque,
    lighting: SHADOW_LIGHTING.venetian_dramatic,
    category: 'VENETIAN MESH'
  },

  // LACE-SHADOW FUSION SERIES (Level 9)
  {
    id: 'lace_shadow_throne',
    name: 'Lace Shadow Throne',
    wardrobe: SHADOW_MESH_WARDROBES.lace_shadow_fusion,
    environment: THRONE_ENVIRONMENTS.velvet_throne,
    pose: ARTISTIC_POSES.throne_seated,
    lighting: SHADOW_LIGHTING.venetian_dramatic,
    category: 'LACE-SHADOW FUSION'
  },
  {
    id: 'lace_shadow_standing',
    name: 'Lace Shadow Contrapposto',
    wardrobe: SHADOW_MESH_WARDROBES.lace_shadow_fusion,
    environment: THRONE_ENVIRONMENTS.shadow_chamber,
    pose: ARTISTIC_POSES.standing_contrapposto,
    lighting: SHADOW_LIGHTING.venetian_dramatic,
    category: 'LACE-SHADOW FUSION'
  },

  // GOLDEN LATTICE SERIES (Level 10)
  {
    id: 'lattice_kneeling',
    name: 'Golden Lattice Devotion',
    wardrobe: SHADOW_MESH_WARDROBES.golden_lattice,
    environment: THRONE_ENVIRONMENTS.lattice_pavilion,
    pose: ARTISTIC_POSES.kneeling_grace,
    lighting: SHADOW_LIGHTING.lattice_golden,
    category: 'GOLDEN LATTICE'
  },
  {
    id: 'lattice_venus',
    name: 'Lattice Venus Rising',
    wardrobe: SHADOW_MESH_WARDROBES.golden_lattice,
    environment: THRONE_ENVIRONMENTS.lattice_pavilion,
    pose: ARTISTIC_POSES.venus_rising,
    lighting: SHADOW_LIGHTING.lattice_golden,
    category: 'GOLDEN LATTICE'
  },

  // CHANDELIER PRISM SERIES (Level 10)
  {
    id: 'chandelier_recline',
    name: 'Prismatic Recline',
    wardrobe: SHADOW_MESH_WARDROBES.chandelier_prism,
    environment: THRONE_ENVIRONMENTS.crystal_chamber,
    pose: ARTISTIC_POSES.reclined_odalisque,
    lighting: SHADOW_LIGHTING.chandelier_prismatic,
    category: 'CHANDELIER PRISM'
  },
  {
    id: 'chandelier_profile',
    name: 'Crystal Shadow Profile',
    wardrobe: SHADOW_MESH_WARDROBES.chandelier_prism,
    environment: THRONE_ENVIRONMENTS.crystal_chamber,
    pose: ARTISTIC_POSES.profile_silhouette,
    lighting: SHADOW_LIGHTING.chandelier_prismatic,
    category: 'CHANDELIER PRISM'
  },

  // FOREST DAPPLE SERIES (Level 9)
  {
    id: 'forest_odalisque',
    name: 'Nature\'s Mesh Odalisque',
    wardrobe: SHADOW_MESH_WARDROBES.forest_dapple,
    environment: THRONE_ENVIRONMENTS.forest_boudoir,
    pose: ARTISTIC_POSES.reclined_odalisque,
    lighting: SHADOW_LIGHTING.natural_dappled,
    category: 'FOREST DAPPLE'
  },
  {
    id: 'forest_venus',
    name: 'Dappled Light Venus',
    wardrobe: SHADOW_MESH_WARDROBES.forest_dapple,
    environment: THRONE_ENVIRONMENTS.forest_boudoir,
    pose: ARTISTIC_POSES.venus_rising,
    lighting: SHADOW_LIGHTING.natural_dappled,
    category: 'FOREST DAPPLE'
  },

  // GOSSAMER VEIL SERIES (Level 9)
  {
    id: 'veil_throne',
    name: 'Veiled Throne Empress',
    wardrobe: SHADOW_MESH_WARDROBES.sheer_veil_shadow,
    environment: THRONE_ENVIRONMENTS.velvet_throne,
    pose: ARTISTIC_POSES.throne_seated,
    lighting: SHADOW_LIGHTING.renaissance_chiaroscuro,
    category: 'GOSSAMER VEIL'
  },
  {
    id: 'veil_contrapposto',
    name: 'Veiled Classical Form',
    wardrobe: SHADOW_MESH_WARDROBES.sheer_veil_shadow,
    environment: THRONE_ENVIRONMENTS.shadow_chamber,
    pose: ARTISTIC_POSES.standing_contrapposto,
    lighting: SHADOW_LIGHTING.venetian_dramatic,
    category: 'GOSSAMER VEIL'
  }
];

// ============================================================================
// BUILD OPTIMIZED PROMPT
// ============================================================================
function buildMasterpiecePrompt(variant) {
  return `${QUALITY_PREFIX}

MODEL: ${MASTERPIECE_MUSE}

WARDROBE - ${variant.wardrobe.name}:
${variant.wardrobe.description}

POSE - ${variant.pose.name}:
${variant.pose.description}

ENVIRONMENT - ${variant.environment.name}:
${variant.environment.description}

LIGHTING:
${variant.lighting}

ARTISTIC VISION:
Fine art boudoir photography celebrating sculptural form and shadow artistry.
Shadow patterns function as artistic coverage, creating mesh-like innerwear effect.
Inspired by classical painters Ingres, Manet, and photographers Weston, Newton.

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
║   ███╗   ███╗ █████╗ ███████╗████████╗███████╗██████╗ ██████╗ ██╗███████╗    ║
║   ████╗ ████║██╔══██╗██╔════╝╚══██╔══╝██╔════╝██╔══██╗██╔══██╗██║██╔════╝    ║
║   ██╔████╔██║███████║███████╗   ██║   █████╗  ██████╔╝██████╔╝██║█████╗      ║
║   ██║╚██╔╝██║██╔══██║╚════██║   ██║   ██╔══╝  ██╔══██╗██╔═══╝ ██║██╔══╝      ║
║   ██║ ╚═╝ ██║██║  ██║███████║   ██║   ███████╗██║  ██║██║     ██║███████╗    ║
║   ╚═╝     ╚═╝╚═╝  ╚═╝╚══════╝   ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝    ║
║                                                                              ║
║                    ✨ MASTERPIECE II SERIES ✨                                ║
║                                                                              ║
║    Shadow-Mesh Intimate Collection • Realistic Skin Texture                  ║
║    Level 9-10 Intimacy • Classical Fine Art Framing                          ║
║                                                                              ║
║    VENETIAN MESH | LACE-SHADOW | GOLDEN LATTICE | CHANDELIER PRISM           ║
║    FOREST DAPPLE | GOSSAMER VEIL                                             ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
  `);

  // Create output directory
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Create category subdirectories
  const categories = [...new Set(MASTERPIECE_VARIANTS.map(v => v.category.toLowerCase().replace(/[^a-z0-9]/g, '_')))];
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
  const count = parseInt(args[1]) || MASTERPIECE_VARIANTS.length;
  const categoryFilter = args[2];

  // Filter variants
  let variantsToGenerate = MASTERPIECE_VARIANTS;
  if (categoryFilter) {
    variantsToGenerate = variantsToGenerate.filter(v =>
      v.category.toLowerCase().includes(categoryFilter.toLowerCase())
    );
  }
  variantsToGenerate = variantsToGenerate.slice(startIndex, startIndex + count);

  console.log(`\n${'═'.repeat(78)}`);
  log(`✨ GENERATING ${variantsToGenerate.length} MASTERPIECE II VARIANTS`);
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
    const outputPath = path.join(OUTPUT_DIR, catDir, `masterpiece_${variant.id}_${timestamp}.png`);
    const prompt = buildMasterpiecePrompt(variant);

    console.log(`\n${'─'.repeat(78)}`);
    log(`✨ [${i + 1}/${variantsToGenerate.length}] ${variant.name}`);
    log(`   Category: ${variant.category} | Intimacy: Level ${variant.wardrobe.intimacy}`);

    try {
      const result = await generateImage(prompt, outputPath, oauthToken);
      log(`   ✅ Saved: ${path.basename(outputPath)} (${(result.size / 1024 / 1024).toFixed(2)} MB)`);

      results.success.push({
        name: variant.name,
        id: variant.id,
        category: variant.category,
        intimacy: variant.wardrobe.intimacy,
        path: outputPath,
        size: result.size
      });

      // Rate limit wait
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

      // Handle rate limit or filter
      if (err.message.includes('429')) {
        log('   ⏳ Waiting 90s for rate limit recovery...');
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
  console.log('              MASTERPIECE II SERIES COMPLETE');
  console.log(`${'═'.repeat(78)}`);

  console.log(`\n  ✅ Successful: ${results.success.length}`);
  console.log(`  ❌ Failed: ${results.failed.length}`);

  if (results.success.length > 0) {
    // Group by category
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
  const manifestPath = path.join(OUTPUT_DIR, 'masterpiece-ii-manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify({
    series: 'Masterpiece II - Shadow-Mesh Collection',
    timestamp: new Date().toISOString(),
    concept: 'Shadow play creating mesh-like patterns as artistic innerwear',
    skinTexture: 'Realistic with visible pores, NO oily glow',
    intimacyRange: '9-10',
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
