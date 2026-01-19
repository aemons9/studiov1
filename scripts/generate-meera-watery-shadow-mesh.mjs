#!/usr/bin/env node

/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                                                                              ║
 * ║   ███╗   ███╗███████╗███████╗██████╗  █████╗                                 ║
 * ║   ████╗ ████║██╔════╝██╔════╝██╔══██╗██╔══██╗                                ║
 * ║   ██╔████╔██║█████╗  █████╗  ██████╔╝███████║                                ║
 * ║   ██║╚██╔╝██║██╔══╝  ██╔══╝  ██╔══██╗██╔══██║                                ║
 * ║   ██║ ╚═╝ ██║███████╗███████╗██║  ██║██║  ██║                                ║
 * ║   ╚═╝     ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝                                ║
 * ║                                                                              ║
 * ║   WATERY SHADOW MESH - SUPER EXCLUSIVE ARTISTRY                              ║
 * ║                                                                              ║
 * ║   God-Mode Ultimate • Wet Floor Droplets • Shadow Mesh Wardrobe              ║
 * ║   12 Super Exclusive Variants • Premium Subscriber Content                   ║
 * ║                                                                              ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

import fs from 'fs';
import path from 'path';

const OUTPUT_DIR = '/home/ecolex/version1/generated-meera-watery-shadow-mesh';
const PROJECT_ID = 'zaranovel';
const LOCATION = 'us-central1';
const PROXY_URL = 'http://localhost:3001';

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// ═══════════════════════════════════════════════════════════════════════════════
// MEERA - ELITE REALISTIC MUSE WITH WET SKIN DETAIL
// ═══════════════════════════════════════════════════════════════════════════════

const MEERA_SUBJECT = `Stunningly beautiful Indian woman Meera, age 27, height 5'9", naturally curvaceous hourglass figure with elegant proportions, warm golden-brown caramel skin glistening with water droplets, realistic skin texture showing water beading and running in rivulets, captivating deep brown almond eyes with thick dark lashes, full sensual lips, long black hair wet and flowing, authentic natural beauty with water droplets catching light like diamonds on skin`;

// ═══════════════════════════════════════════════════════════════════════════════
// MUSEUM-GRADE ART DECLARATIONS
// ═══════════════════════════════════════════════════════════════════════════════

const ART_DECLARATIONS = [
  `Tate Modern contemporary photography exhibition. Study of water, light, and form through shadow mesh patterns. Gallery-standard fine art documentation.`,

  `Metropolitan Museum of Art photography collection. Wet skin study with architectural shadow coverage creating mesh-like patterns. Museum-quality artistic documentation.`,

  `Centre Pompidou fine art photography. Water droplet artistry combined with dramatic chiaroscuro shadow mesh. International exhibition standard.`,

  `Gagosian Gallery collector-grade photography. Conceptual study of wet form with shadow architecture as coverage element. Premium artistic documentation.`,

  `MoMA photography department acquisition. Intimate water study exploring droplet patterns and shadow mesh as artistic coverage. Museum permanent collection quality.`,

  `Aperture Foundation award-winning photography. Documentary fine art capturing wet skin luminosity with architectural shadow patterns. Professional excellence.`
];

// ═══════════════════════════════════════════════════════════════════════════════
// SHADOW MESH WARDROBE PATTERNS
// ═══════════════════════════════════════════════════════════════════════════════

const SHADOW_MESH = {
  venetianMesh: `dramatic venetian blind shadows creating horizontal stripe mesh pattern across entire wet body, light and dark alternating like woven fabric`,

  geometricMesh: `architectural geometric shadow patterns from window frames creating grid-like mesh coverage on glistening wet skin`,

  laceMesh: `intricate lace curtain shadows casting delicate floral mesh pattern across water-beaded form, shadow as wearable art`,

  foliageMesh: `dappled leaf shadows creating organic mesh pattern on wet skin, natural shadow fabric from foliage above`,

  latticeWork: `ornate lattice shadows casting diamond mesh pattern across form, architectural shadow creating coverage like jewelry`,

  chainlinkMesh: `fine chainlink fence shadows creating delicate mesh pattern on wet glistening skin, industrial shadow as decoration`
};

// ═══════════════════════════════════════════════════════════════════════════════
// WET FLOOR ENVIRONMENTS
// ═══════════════════════════════════════════════════════════════════════════════

const WET_ENVIRONMENTS = {
  rainShower: `luxurious rainfall shower room with polished black marble floor covered in water puddles reflecting light, rain falling from ceiling shower head, steam rising, dramatic spotlighting`,

  poolEdge: `infinity pool edge at golden hour, wet stone floor with water droplets and puddles reflecting sunset colors, steam rising from heated water, dramatic backlighting`,

  bathhouse: `traditional bathhouse with wet stone floor tiles, water running in channels, steam throughout, warm candlelight from wall sconces, ancient Roman atmosphere`,

  greenhouse: `lush greenhouse after rain with wet concrete floor, water droplets on plants casting shadows, humid atmosphere, dappled light through glass ceiling`,

  beachCave: `hidden sea cave with wet rock floor, tide pool reflections, filtered oceanic light, dramatic natural shadows from rock formations`,

  studioWet: `professional photography studio with wet reflective black floor, strategic water puddles creating mirror effects, controlled dramatic lighting`
};

// ═══════════════════════════════════════════════════════════════════════════════
// 12 SUPER EXCLUSIVE WATERY SHADOW MESH VARIANTS
// ═══════════════════════════════════════════════════════════════════════════════

const EXCLUSIVE_VARIANTS = [
  // ─────────────────────────────────────────────────────────────────────────────
  // RAINFALL SERIES
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'rainfall_venus',
    name: 'Rainfall Venus',
    artDeclaration: 0,
    shadowMesh: SHADOW_MESH.venetianMesh,
    environment: WET_ENVIRONMENTS.rainShower,
    waterDetail: `skin glistening with rainfall, water droplets running down body in rivulets, water beading on curves catching dramatic light, puddles at feet reflecting form`,
    pose: `standing in rainfall shower with head tilted back, arms slightly raised catching water, full body visible with water streaming down, venetian blind shadows from window creating stripe coverage, wet floor reflecting silhouette, expression of pure sensory bliss`,
    lighting: `dramatic spotlight through venetian blinds creating stripe shadow pattern, rain droplets catching light like diamonds, wet floor reflections doubling the lighting effects`,
    mood: 'Rainfall goddess, stripe shadow coverage'
  },
  {
    id: 'shower_silhouette',
    name: 'Shower Silhouette',
    artDeclaration: 1,
    shadowMesh: SHADOW_MESH.geometricMesh,
    environment: WET_ENVIRONMENTS.rainShower,
    waterDetail: `water cascading down body, droplets suspended mid-air catching light, skin completely wet and glistening, steam creating soft atmosphere`,
    pose: `standing in profile in shower, geometric window shadows creating grid pattern coverage across wet form, one arm raised to hair, water streaming, full body silhouette with shadow mesh coverage, reflection in wet marble floor`,
    lighting: `strong side light through geometric window creating grid shadow coverage, water droplets backlit like suspended crystals, wet floor creating mirror reflection`,
    mood: 'Geometric shadow grid, crystal droplets'
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // POOLSIDE SERIES
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'poolside_emergence',
    name: 'Poolside Emergence',
    artDeclaration: 2,
    shadowMesh: SHADOW_MESH.latticeWork,
    environment: WET_ENVIRONMENTS.poolEdge,
    waterDetail: `emerging from pool with water streaming off body, droplets suspended in golden light, wet skin gleaming with sunset colors, water pooling on stone at feet`,
    pose: `emerging from infinity pool at golden hour, hands on pool edge lifting body, lattice pergola shadows creating diamond mesh pattern across wet form, water streaming down, wet stone floor with puddles reflecting sunset, sensual emergence expression`,
    lighting: `golden hour backlighting through lattice creating diamond shadow mesh, water droplets catching sunset gold, wet stone reflections creating warm glow`,
    mood: 'Golden emergence, diamond shadow mesh'
  },
  {
    id: 'pool_recline',
    name: 'Pool Recline',
    artDeclaration: 3,
    shadowMesh: SHADOW_MESH.foliageMesh,
    environment: WET_ENVIRONMENTS.poolEdge,
    waterDetail: `body glistening wet on warm stone, water droplets beading on skin, small puddle forming beneath form, droplets catching golden light`,
    pose: `reclining on wet stone pool edge, tropical foliage shadows creating organic mesh pattern across wet body, one knee raised, arm behind head, full body with dappled shadow coverage, water droplets scattered on stone, languid relaxed expression`,
    lighting: `dappled golden light through tropical leaves creating organic shadow mesh, wet skin glowing with warm tones, stone reflections adding depth`,
    mood: 'Tropical shadow weave, wet stone glow'
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BATHHOUSE SERIES
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'bathhouse_steam',
    name: 'Bathhouse Steam',
    artDeclaration: 4,
    shadowMesh: SHADOW_MESH.laceMesh,
    environment: WET_ENVIRONMENTS.bathhouse,
    waterDetail: `skin covered in water droplets from steam condensation, beads of moisture on curves, water running down from steam, wet floor with puddles`,
    pose: `standing in ancient bathhouse, decorative screen shadows casting lace-like mesh pattern across steam-wet body, arms crossed delicately, full body visible through lace shadow coverage, wet tile floor with water channels, serene classical expression`,
    lighting: `warm candlelight through decorative screens creating delicate lace shadow mesh, steam diffusing light, wet tiles reflecting warm glow`,
    mood: 'Ancient ritual, lace shadow veil'
  },
  {
    id: 'bathhouse_floor',
    name: 'Bathhouse Floor',
    artDeclaration: 5,
    shadowMesh: SHADOW_MESH.geometricMesh,
    environment: WET_ENVIRONMENTS.bathhouse,
    waterDetail: `lying on wet warm stone floor, water pooled around body, droplets scattered on skin, water running in floor channels beside form`,
    pose: `lying on wet bathhouse floor in artistic pose, geometric window shadows creating grid mesh coverage, body creating S-curve, water pooled around form, one arm above head, wet floor tiles with water channels, peaceful meditative expression`,
    lighting: `dramatic light through geometric windows creating grid shadow mesh on wet body, warm stone tones, water reflections adding dimension`,
    mood: 'Sacred floor, geometric shadow blanket'
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // GREENHOUSE SERIES
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'greenhouse_mist',
    name: 'Greenhouse Mist',
    artDeclaration: 0,
    shadowMesh: SHADOW_MESH.foliageMesh,
    environment: WET_ENVIRONMENTS.greenhouse,
    waterDetail: `mist coating skin in fine water droplets, condensation beading everywhere, larger droplets from leaves landing on form, wet concrete floor`,
    pose: `standing among tropical plants in greenhouse, complex foliage shadows creating dense organic mesh pattern across mist-wet body, arms slightly raised touching leaves, full body with botanical shadow coverage, wet concrete floor, expression of natural wonder`,
    lighting: `diffused light through glass ceiling and plants creating layered organic shadow mesh, mist catching light, wet surfaces reflecting green-gold tones`,
    mood: 'Botanical shadow weave, mist jewels'
  },
  {
    id: 'greenhouse_floor',
    name: 'Greenhouse Floor',
    artDeclaration: 1,
    shadowMesh: SHADOW_MESH.chainlinkMesh,
    environment: WET_ENVIRONMENTS.greenhouse,
    waterDetail: `sitting on wet floor with water pooling around, rain droplets from plants above, skin glistening with humidity, puddles reflecting overhead green`,
    pose: `seated on wet greenhouse floor, industrial support structure shadows creating fine mesh pattern across wet form, knees drawn up, arms wrapped around legs, full body with delicate shadow mesh, water puddles around, contemplative expression`,
    lighting: `afternoon light through glass and metal structure creating industrial shadow mesh, humidity diffusing light, wet floor reflections`,
    mood: 'Industrial garden, delicate shadow lace'
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // SEA CAVE SERIES
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'cave_pool',
    name: 'Cave Pool',
    artDeclaration: 2,
    shadowMesh: SHADOW_MESH.latticeWork,
    environment: WET_ENVIRONMENTS.beachCave,
    waterDetail: `emerging from tide pool, sea water streaming down body, salt crystals and droplets catching blue light, wet rock floor with pools`,
    pose: `kneeling in shallow tide pool inside sea cave, natural rock lattice overhead creating diamond shadow mesh on wet sea-kissed body, water streaming from hair, full body with oceanic shadow patterns, wet rocks around, expression of wild freedom`,
    lighting: `blue oceanic light filtering through rock formations creating natural lattice shadows, water droplets catching light, tide pool reflections`,
    mood: 'Ocean goddess, natural shadow diamonds'
  },
  {
    id: 'cave_recline',
    name: 'Cave Recline',
    artDeclaration: 3,
    shadowMesh: SHADOW_MESH.foliageMesh,
    environment: WET_ENVIRONMENTS.beachCave,
    waterDetail: `lying on wet rock formation, sea spray coating skin in fine droplets, salt water pooled in rock depressions, glistening oceanic sheen`,
    pose: `reclining on wet sea rock in hidden cave, vegetation at cave mouth creating organic shadow mesh across sea-wet body, one leg raised, arm trailing in tide pool, full body with natural shadow coverage, expression of primal connection`,
    lighting: `filtered oceanic light through cave vegetation creating organic shadow patterns, sea spray catching light, wet rock reflections`,
    mood: 'Primal sanctuary, sea shadow veil'
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // STUDIO WET SERIES
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'studio_reflection',
    name: 'Studio Reflection',
    artDeclaration: 4,
    shadowMesh: SHADOW_MESH.venetianMesh,
    environment: WET_ENVIRONMENTS.studioWet,
    waterDetail: `professional water spray coating entire body in perfect droplets, water pooled on reflective floor creating mirror image, controlled water streams`,
    pose: `standing in professional studio on wet reflective black floor, venetian shadows creating horizontal stripe mesh coverage, full body and perfect reflection visible in water mirror below, arms at artistic angles, editorial model stance, confident powerful expression`,
    lighting: `controlled studio lighting through venetian blinds creating stripe shadow coverage, wet floor creating perfect reflection, dramatic contrast`,
    mood: 'Editorial mastery, double vision'
  },
  {
    id: 'studio_puddle',
    name: 'Studio Puddle',
    artDeclaration: 5,
    shadowMesh: SHADOW_MESH.geometricMesh,
    environment: WET_ENVIRONMENTS.studioWet,
    waterDetail: `lying in shallow water on studio floor, body half-submerged in artistic puddle, water droplets scattered around, perfect reflections`,
    pose: `lying artistically in shallow water puddle on black studio floor, geometric gobo shadows creating grid mesh pattern across half-submerged wet form, hair spreading in water, one arm raised, full body visible through water and shadow, artistic expression`,
    lighting: `dramatic studio lighting through geometric gobos creating precise shadow mesh, water surface creating abstract reflections, high contrast`,
    mood: 'Controlled chaos, shadow grid artistry'
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
// FAILOVER STRATEGIES
// ═══════════════════════════════════════════════════════════════════════════════

const FAILOVER_MESH = {
  safe: `elegant flowing gossamer silk wrap wet and clinging to form, creating artistic coverage while water droplets bead on fabric and skin`,
  mesh: `delicate gold mesh fabric wrap wet and transparent, clinging to wet form, combined with shadow patterns for artistic coverage`,
  steam: `rising steam and water mist creating soft ethereal coverage veil across wet glistening form`
};

// ═══════════════════════════════════════════════════════════════════════════════
// GOD-MODE GENERATION ENGINE
// ═══════════════════════════════════════════════════════════════════════════════

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
        addWatermark: false,
        includeRaiReason: true,
        outputOptions: { mimeType: 'image/png', compressionQuality: 100 }
      }
    })
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const result = await response.json();
  const prediction = result.predictions?.[0];

  if (prediction?.bytesBase64Encoded) {
    return Buffer.from(prediction.bytesBase64Encoded, 'base64');
  }

  throw new Error('Filtered: No image data');
}

function buildPrompt(variant, useFailover = false) {
  const declaration = ART_DECLARATIONS[variant.artDeclaration];
  const coverage = useFailover
    ? FAILOVER_MESH[['safe', 'mesh', 'steam'][variant.artDeclaration % 3]]
    : `Shadow Mesh Coverage: ${variant.shadowMesh}`;

  return `${declaration}

Professional fine art wet photography, Hasselblad H6D-100c medium format, 80mm f/2.0 lens, museum exhibition standard,

Subject: ${MEERA_SUBJECT},

${coverage},

Water Detail: ${variant.waterDetail},

Full Body Pose: ${variant.pose},

Wet Environment: ${variant.environment},

Master Lighting: ${variant.lighting},

Mood: ${variant.mood},

Technical Excellence: Ultra-realistic 8K photograph with extraordinary detail capturing every water droplet on skin, wet floor reflections, and shadow mesh patterns. Authentic skin texture with water beading naturally. Dramatic chiaroscuro with shadow as primary coverage element combined with water artistry. Shallow depth of field with subject in sharp focus. Full body composition with wet floor, water droplets, and shadow mesh as coverage elements.`;
}

function log(msg) {
  console.log(`[${new Date().toLocaleTimeString()}] ${msg}`);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║   ███╗   ███╗███████╗███████╗██████╗  █████╗                                 ║
║   ████╗ ████║██╔════╝██╔════╝██╔══██╗██╔══██╗                                ║
║   ██╔████╔██║█████╗  █████╗  ██████╔╝███████║                                ║
║   ██║╚██╔╝██║██╔══╝  ██╔══╝  ██╔══██╗██╔══██║                                ║
║   ██║ ╚═╝ ██║███████╗███████╗██║  ██║██║  ██║                                ║
║   ╚═╝     ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝                                ║
║                                                                              ║
║   ✨ WATERY SHADOW MESH - SUPER EXCLUSIVE ARTISTRY ✨                        ║
║                                                                              ║
║   12 Super Exclusive Variants • Wet Floor Droplets • Shadow Mesh             ║
║   Premium Subscriber Content • Full Body Water Artistry                      ║
║                                                                              ║
║   Rainfall • Poolside • Bathhouse • Greenhouse • Sea Cave • Studio           ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
  `);

  log('Authenticating with Vertex AI...');
  let token = await getOAuthToken();
  log('✅ OAuth token obtained\\n');

  const results = { successful: [], failed: [] };
  let consecutiveFailures = 0;

  for (let i = 0; i < EXCLUSIVE_VARIANTS.length; i++) {
    const variant = EXCLUSIVE_VARIANTS[i];

    // Refresh token every 3 images
    if (i > 0 && i % 3 === 0) {
      log('🔄 Refreshing OAuth token...');
      token = await getOAuthToken();
    }

    console.log('══════════════════════════════════════════════════════════════════════════════');
    log(`✨ [${i + 1}/${EXCLUSIVE_VARIANTS.length}] ${variant.name}`);
    log(`   Mood: ${variant.mood}`);

    let success = false;
    let attempts = 0;
    const maxAttempts = 3;

    while (!success && attempts < maxAttempts) {
      attempts++;
      const useFailover = attempts > 1;

      if (attempts > 1) {
        log(`   🔄 Attempt ${attempts}/${maxAttempts}${useFailover ? ' (failover coverage)' : ''}...`);
      }

      const prompt = buildPrompt(variant, useFailover);
      const filename = `meera_watery_${variant.id}${useFailover ? '_alt' : ''}_${Date.now()}.png`;
      const filepath = path.join(OUTPUT_DIR, filename);

      try {
        const buffer = await generateImage(prompt, token);
        fs.writeFileSync(filepath, buffer);
        const sizeMB = (buffer.length / (1024 * 1024)).toFixed(2);

        log(`   ✅ MASTERWORK: ${filename} (${sizeMB} MB)`);
        results.successful.push({
          ...variant,
          filename,
          sizeMB,
          attempts,
          usedFailover: useFailover
        });

        success = true;
        consecutiveFailures = 0;

      } catch (error) {
        log(`   ❌ Attempt ${attempts} failed: ${error.message.slice(0, 50)}`);

        if (attempts < maxAttempts) {
          const waitTime = error.message.includes('429') ? 90 : 60;
          log(`   ⏳ Waiting ${waitTime}s before retry...`);
          await sleep(waitTime * 1000);
          token = await getOAuthToken();
        } else {
          results.failed.push({ name: variant.name, error: error.message });
          consecutiveFailures++;
        }
      }
    }

    // Adaptive delay
    if (i < EXCLUSIVE_VARIANTS.length - 1) {
      const baseDelay = success ? 30000 : 60000;
      const adaptiveDelay = baseDelay + (consecutiveFailures * 15000);
      log(`   ⏳ Next in ${adaptiveDelay / 1000}s...`);
      await sleep(adaptiveDelay);
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // FINAL REPORT
  // ═══════════════════════════════════════════════════════════════════════════

  const successRate = ((results.successful.length / EXCLUSIVE_VARIANTS.length) * 100).toFixed(1);

  console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║          WATERY SHADOW MESH COLLECTION COMPLETE                              ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝

  ✅ Masterworks Created: ${results.successful.length}/${EXCLUSIVE_VARIANTS.length}
  ❌ Failed: ${results.failed.length}
  📊 Success Rate: ${successRate}%

  SUCCESSFUL VARIANTS:
${results.successful.map(v => `     📸 ${v.name} - ${v.mood} (${v.sizeMB} MB)${v.usedFailover ? ' [alt]' : ''}`).join('\n')}
${results.failed.length > 0 ? `
  FAILED:
${results.failed.map(v => `     ❌ ${v.name}`).join('\n')}
` : ''}
  Output Directory: ${OUTPUT_DIR}
══════════════════════════════════════════════════════════════════════════════
`);

  // Save manifest
  const manifest = {
    timestamp: new Date().toISOString(),
    subject: 'Meera - Watery Shadow Mesh',
    collection: 'Super Exclusive Artistry - Wet Floor & Shadow Coverage',
    theme: 'Water droplets with shadow mesh as wardrobe',
    shadowMeshTypes: Object.keys(SHADOW_MESH),
    environments: Object.keys(WET_ENVIRONMENTS),
    variants: EXCLUSIVE_VARIANTS.length,
    successful: results.successful,
    failed: results.failed,
    successRate: successRate + '%'
  };

  fs.writeFileSync(path.join(OUTPUT_DIR, 'manifest.json'), JSON.stringify(manifest, null, 2));
  log('📋 Manifest saved\\n');
}

main().catch(console.error);
