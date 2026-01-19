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
 * ║   CANDLELIT BATH MASTERY - WATER & SHADOW ARTISTRY                           ║
 * ║                                                                              ║
 * ║   God-Mode Ultimate Camera Systems • Cinematic Sensuality                    ║
 * ║   12 Full Body Variants • Water Coverage • Shadow Detail                     ║
 * ║                                                                              ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

import fs from 'fs';
import path from 'path';

const OUTPUT_DIR = '/home/ecolex/version1/generated-meera-candlelit-bath';
const PROJECT_ID = 'zaranovel';
const LOCATION = 'us-central1';
const PROXY_URL = 'http://localhost:3001';

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// ═══════════════════════════════════════════════════════════════════════════════
// MEERA - ELITE REALISTIC MUSE
// ═══════════════════════════════════════════════════════════════════════════════

const MEERA_SUBJECT = `Stunningly beautiful Indian woman Meera, age 27, height 5'9", naturally curvaceous hourglass figure with elegant proportions, warm golden-brown caramel skin with natural luminous glow and realistic skin texture showing water droplets, captivating deep brown almond eyes with thick dark lashes, full sensual lips, long black hair wet and slicked or flowing in water, authentic natural beauty, expression of serene intimacy`;

// ═══════════════════════════════════════════════════════════════════════════════
// MUSEUM-GRADE ART DECLARATIONS
// ═══════════════════════════════════════════════════════════════════════════════

const ART_DECLARATIONS = [
  `Metropolitan Museum of Art photography collection. Renaissance-inspired bathing scene study in the tradition of classical masterworks. Museum-quality fine art documentation.`,

  `Tate Modern contemporary photography exhibition. Intimate water study exploring form, reflection, and candlelight. Gallery-standard artistic documentation.`,

  `Centre Pompidou fine art photography. Cinematic bathing portraiture with Caravaggio-inspired chiaroscuro lighting. International museum exhibition standard.`,

  `Gagosian Gallery collector-grade photography. Study of figure in water with dramatic shadow play and steam atmosphere. Premium artistic documentation.`,

  `MoMA photography department acquisition standard. Intimate portraiture exploring vulnerability and warmth in bathing ritual. Museum permanent collection quality.`,

  `Aperture Foundation award-winning photography. Documentary fine art capturing private bathing moment with editorial sophistication. Professional excellence.`
];

// ═══════════════════════════════════════════════════════════════════════════════
// CAMERA SYSTEMS MASTERY
// ═══════════════════════════════════════════════════════════════════════════════

const CAMERA_SYSTEMS = {
  hasselblad: `Hasselblad H6D-100c medium format, 80mm f/2.0 lens, extraordinary detail and tonal range, shallow DOF isolating subject`,
  phaseOne: `Phase One IQ4 150MP medium format, 110mm f/2.8 lens, ultimate resolution capturing water droplets and skin texture`,
  leica: `Leica S3 medium format, 70mm f/2.5 Summarit-S lens, legendary color science and micro-contrast`,
  canonCine: `Canon EOS C700 cinema camera, CN-E 85mm T1.3 lens, cinematic motion picture quality with filmic rendering`,
  redMonstro: `RED Monstro 8K VV, Sigma Cine 85mm T1.5 lens, cinema-grade dynamic range capturing candlelight extremes`,
  arri: `ARRI Alexa Mini LF, Zeiss Supreme Prime 85mm T1.5, Hollywood cinematography standard with natural skin tones`
};

// ═══════════════════════════════════════════════════════════════════════════════
// BATH ENVIRONMENT VARIATIONS
// ═══════════════════════════════════════════════════════════════════════════════

const BATH_ENVIRONMENTS = {
  marble: `opulent Carrara marble bathroom sanctuary lit by dozens of brass candelabras with ivory tapers, deep soaking tub filled with milky opalescent water, steam rising in candlelight, rose petals floating, ornate gold fixtures, venetian mirrors reflecting warm glow`,

  japanese: `serene Japanese onsen-inspired bathroom with natural stone tub, wooden accents, bamboo elements, paper lanterns providing soft warm glow, steam rising, minimalist zen atmosphere with warm candlelight`,

  vintage: `romantic vintage clawfoot copper tub in elegant bathroom, exposed brick walls, antique brass fixtures, pillar candles in wrought iron holders, warm amber lighting, old-world European charm`,

  modern: `luxurious modern spa bathroom with freestanding sculptural tub, floor-to-ceiling windows with city lights beyond, architectural candle arrangements, sleek lines with warm intimate lighting`,

  moroccan: `exotic Moroccan hammam-inspired bathroom with zellige tile, ornate brass lanterns with carved patterns casting shadow designs, deep tiled bath, warm amber candlelight filtering through pierced metal`,

  tropical: `open-air tropical bathroom sanctuary, natural stone infinity tub overlooking jungle, wooden beams, floating candles in water, orchids and tropical foliage, golden hour light mixing with candlelight`
};

// ═══════════════════════════════════════════════════════════════════════════════
// 12 CANDLELIT BATH VARIANTS - WATER COVERAGE MASTERY
// ═══════════════════════════════════════════════════════════════════════════════

const BATH_VARIANTS = [
  // ─────────────────────────────────────────────────────────────────────────────
  // EMERGING SERIES
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'emerging_venus',
    name: 'Emerging Venus',
    artDeclaration: 0,
    camera: CAMERA_SYSTEMS.hasselblad,
    environment: BATH_ENVIRONMENTS.marble,
    waterCoverage: `milky opalescent bath water at chest level providing elegant coverage, water surface creating soft diffusion, rose petals floating strategically`,
    pose: `emerging from deep marble tub, upper body rising above milky water line, water streaming down shoulders and decolletage creating liquid patterns, both hands at tub edge for support, head tilted back with eyes closed in blissful expression, wet hair slicked back, full body visible through water below surface`,
    lighting: `warm golden candlelight from multiple brass candelabras creating dramatic chiaroscuro, dancing flames reflecting in water surface, rim light on wet skin from behind, deep shadows in marble recesses`,
    shadowDetail: `candle flames creating dancing shadow patterns on marble walls, water ripples casting organic light patterns on skin, dramatic shadows defining curves beneath water surface`,
    mood: 'Birth of Venus reimagined, divine emergence'
  },
  {
    id: 'surfacing_serenity',
    name: 'Surfacing Serenity',
    artDeclaration: 1,
    camera: CAMERA_SYSTEMS.phaseOne,
    environment: BATH_ENVIRONMENTS.japanese,
    waterCoverage: `clear warm water at shoulder level with steam providing soft diffusion, water surface creating gentle distortion of form below`,
    pose: `slowly surfacing in stone tub, face and shoulders emerging from water, body visible as soft silhouette beneath surface, arms floating at sides, serene meditative expression, wet hair spreading in water around shoulders`,
    lighting: `soft warm glow from paper lanterns and candles, steam diffusing light creating ethereal atmosphere, gentle highlights on wet skin above waterline`,
    shadowDetail: `steam creating layers of shadow depth, water surface casting gentle caustic patterns, soft shadows from wooden elements`,
    mood: 'Zen stillness, meditative surfacing'
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // RECLINING SERIES
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'reclining_goddess',
    name: 'Reclining Goddess',
    artDeclaration: 2,
    camera: CAMERA_SYSTEMS.canonCine,
    environment: BATH_ENVIRONMENTS.vintage,
    waterCoverage: `warm bath water at hip level, one leg extended above water surface creating elegant line, strategic water coverage with bubbles and movement`,
    pose: `reclining in vintage copper clawfoot tub, head resting on curved tub edge, one arm draped over side, one knee bent with leg emerging from water, body creating sinuous S-curve, expression of languid pleasure, wet hair cascading over tub edge`,
    lighting: `warm amber candlelight from pillar candles creating romantic glow, copper tub reflecting golden light, dramatic shadows on exposed brick`,
    shadowDetail: `flickering candle shadows dancing on brick walls, water ripples creating light patterns on copper surface, leg casting shadow through water`,
    mood: 'Victorian romanticism, languid luxury'
  },
  {
    id: 'floating_reverie',
    name: 'Floating Reverie',
    artDeclaration: 3,
    camera: CAMERA_SYSTEMS.arri,
    environment: BATH_ENVIRONMENTS.modern,
    waterCoverage: `body floating just below crystal clear water surface, water providing soft optical distortion as coverage, air bubbles clinging to skin`,
    pose: `floating on back in sculptural tub, body just beneath water surface with face above, hair spreading like dark halo in water, arms floating at sides, eyes closed in dreamy expression, full body visible through clear water with gentle distortion`,
    lighting: `city lights through windows providing cool ambient, warm candlelight from architectural arrangements creating contrast, underwater reflections`,
    shadowDetail: `city light shadows through water, candle flames reflecting on water surface, body casting shadow on tub bottom`,
    mood: 'Urban sanctuary, floating weightlessness'
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // SEATED SERIES
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'seated_contemplation',
    name: 'Seated Contemplation',
    artDeclaration: 4,
    camera: CAMERA_SYSTEMS.leica,
    environment: BATH_ENVIRONMENTS.moroccan,
    waterCoverage: `warm water at waist level, steam and water providing coverage, ornate tile visible through water creating pattern`,
    pose: `seated upright in deep Moroccan tiled bath, knees drawn up creating elegant composition, arms wrapped around legs, chin resting on knee, contemplative sideways gaze at camera, wet hair over one shoulder, water lapping at waist`,
    lighting: `warm amber light filtering through pierced brass lanterns casting intricate shadow patterns, multiple candles in niches creating depth`,
    shadowDetail: `elaborate geometric shadow patterns from Moroccan lanterns playing across skin and water surface, zellige tile patterns visible through water`,
    mood: 'Exotic intimacy, hammam mystique'
  },
  {
    id: 'bathing_ritual',
    name: 'Bathing Ritual',
    artDeclaration: 5,
    camera: CAMERA_SYSTEMS.redMonstro,
    environment: BATH_ENVIRONMENTS.marble,
    waterCoverage: `milky bath water at hip level with foam creating artistic coverage, water streaming from lifted arm`,
    pose: `seated in marble tub lifting water with cupped hands, letting water stream down over shoulder and chest, head tilted back catching the flow, eyes closed in sensory pleasure, full body visible with water and foam providing coverage`,
    lighting: `dramatic candlelight from above and sides creating Caravaggio chiaroscuro, water droplets catching light like diamonds, deep shadows in marble`,
    shadowDetail: `streaming water creating shadow trails, candle flames casting multiple shadow directions, dramatic contrast on marble surfaces`,
    mood: 'Sacred ritual, water worship'
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // EDGE SERIES
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'tub_edge_portrait',
    name: 'Tub Edge Portrait',
    artDeclaration: 0,
    camera: CAMERA_SYSTEMS.hasselblad,
    environment: BATH_ENVIRONMENTS.tropical,
    waterCoverage: `body submerged to shoulders in stone tub, arms folded on tub edge, water providing complete coverage below`,
    pose: `leaning forward on tub edge with arms folded, chin resting on arms, body submerged with only shoulders and face above water, soft intimate gaze at camera, wet hair swept to one side, jungle visible beyond, floating candles creating points of light`,
    lighting: `golden hour tropical light mixing with candlelight, warm glow on wet skin, jungle shadows creating depth`,
    shadowDetail: `tropical foliage casting organic shadow patterns, floating candle flames creating dancing light points, water surface reflecting sky colors`,
    mood: 'Paradise found, intimate escape'
  },
  {
    id: 'side_emergence',
    name: 'Side Emergence',
    artDeclaration: 1,
    camera: CAMERA_SYSTEMS.phaseOne,
    environment: BATH_ENVIRONMENTS.vintage,
    waterCoverage: `body partially emerged on tub side, water cascading down form, wet skin as coverage element`,
    pose: `perched on edge of copper tub with legs still in water, torso twisted toward camera, one arm supporting weight on tub rim, water streaming down body creating liquid trails, sensual over-shoulder gaze, hair dripping wet`,
    lighting: `romantic candlelight creating warm copper reflections, dramatic side lighting on wet skin, deep shadows on brick wall`,
    shadowDetail: `water trails creating shadow lines on skin, copper tub reflecting shadow patterns, candle flames dancing on wet surfaces`,
    mood: 'Romantic emergence, copper glow'
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // ARTISTIC FULL BODY SERIES
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'underwater_silhouette',
    name: 'Underwater Silhouette',
    artDeclaration: 2,
    camera: CAMERA_SYSTEMS.canonCine,
    environment: BATH_ENVIRONMENTS.modern,
    waterCoverage: `clear water providing optical coverage through refraction and distortion, full body visible as artistic silhouette beneath surface`,
    pose: `fully submerged in clear water with face near surface, body creating elegant diagonal line, arms gracefully extended, hair flowing like dark silk in water, serene underwater expression, full form visible through water's optical effects`,
    lighting: `candlelight from above creating surface reflections, city lights providing cool undertones, underwater shadows creating depth`,
    shadowDetail: `body casting shadow on tub bottom, surface ripples creating light patterns, hair creating flowing shadow forms`,
    mood: 'Submerged beauty, liquid suspension'
  },
  {
    id: 'steam_shroud',
    name: 'Steam Shroud',
    artDeclaration: 3,
    camera: CAMERA_SYSTEMS.arri,
    environment: BATH_ENVIRONMENTS.japanese,
    waterCoverage: `rising steam creating ethereal coverage veil, hot water at various levels, steam as primary artistic element`,
    pose: `standing in deep stone bath with water at thigh level, arms raised adjusting wet hair, full body revealed but veiled by rising steam, serene profile expression, steam swirling around form`,
    lighting: `warm candlelight diffused by steam creating soft ethereal glow, paper lanterns providing gentle pools of light, steam catching and scattering light`,
    shadowDetail: `steam creating layers of shadow depth, body as silhouette through steam layers, soft undefined shadow edges`,
    mood: 'Ethereal emergence, steam goddess'
  },
  {
    id: 'candlelit_full_form',
    name: 'Candlelit Full Form',
    artDeclaration: 4,
    camera: CAMERA_SYSTEMS.leica,
    environment: BATH_ENVIRONMENTS.marble,
    waterCoverage: `strategic rose petals floating on water surface at key areas, milky water providing soft coverage, water at hip level`,
    pose: `standing in marble bath with water at hip level, full body visible above water, arms crossed delicately over chest in modest classical pose, head tilted with serene expression, rose petals floating around form, wet skin glistening`,
    lighting: `dramatic Rembrandt lighting from candelabras, single key light creating defined shadows, fill from reflected marble, golden warmth throughout`,
    shadowDetail: `candle shadows creating dramatic relief on marble walls, body casting multiple soft shadows from various flame sources, rose petals creating shadow dots on water`,
    mood: 'Classical beauty, painterly mastery'
  },
  {
    id: 'reflection_study',
    name: 'Reflection Study',
    artDeclaration: 5,
    camera: CAMERA_SYSTEMS.redMonstro,
    environment: BATH_ENVIRONMENTS.marble,
    waterCoverage: `still water creating mirror reflection, body visible both directly and as reflection, water as artistic doubling element`,
    pose: `kneeling in shallow marble bath section, water at waist, torso leaning forward with hands on water surface creating ripples, face gazing down at own reflection, full body and reflection visible creating artistic double composition, wet hair framing face`,
    lighting: `warm candlelight reflected in still water, creating doubled light sources, venetian mirror adding depth of reflections, intimate pool of golden light`,
    shadowDetail: `shadow and reflection creating abstract composition, water ripples distorting shadow patterns, multiple reflection layers in mirrors`,
    mood: 'Narcissus reimagined, reflection intimacy'
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
// FAILOVER VARIATIONS
// ═══════════════════════════════════════════════════════════════════════════════

const FAILOVER_WATER = {
  milky: `luxuriously milky opalescent bath water with floating rose petals providing elegant artistic coverage`,
  foam: `soft bath foam and bubbles creating romantic coverage across water surface`,
  steam: `rising steam and hot water creating soft atmospheric coverage veil`
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
  const waterCoverage = useFailover
    ? FAILOVER_WATER[['milky', 'foam', 'steam'][variant.artDeclaration % 3]]
    : variant.waterCoverage;

  return `${declaration}

Professional fine art bathing portraiture, ${variant.camera}, museum exhibition standard,

Subject: ${MEERA_SUBJECT},

Water Coverage: ${waterCoverage},

Full Body Pose: ${variant.pose},

Luxurious Environment: ${variant.environment},

Master Lighting: ${variant.lighting},

Shadow Artistry: ${variant.shadowDetail},

Mood: ${variant.mood},

Technical Excellence: Ultra-realistic 8K photograph with extraordinary detail capturing water droplets on skin, steam atmosphere, candlelight reflections on wet surfaces. Authentic skin texture with natural luminosity. Cinematic sensuality with gallery-worthy artistic sophistication. Shallow depth of field with subject in sharp focus. Full body composition with water and shadow as primary coverage elements.`;
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
║   ✨ CANDLELIT BATH MASTERY - WATER & SHADOW ARTISTRY ✨                     ║
║                                                                              ║
║   12 Full Body Variants • Ultimate Camera Systems                            ║
║   Water Coverage • Shadow Detail • Cinematic Sensuality                      ║
║                                                                              ║
║   Hasselblad • Phase One • Leica • Canon Cine • RED • ARRI                   ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
  `);

  log('Authenticating with Vertex AI...');
  let token = await getOAuthToken();
  log('✅ OAuth token obtained\\n');

  const results = { successful: [], failed: [] };
  let consecutiveFailures = 0;

  for (let i = 0; i < BATH_VARIANTS.length; i++) {
    const variant = BATH_VARIANTS[i];

    // Refresh token every 3 images
    if (i > 0 && i % 3 === 0) {
      log('🔄 Refreshing OAuth token...');
      token = await getOAuthToken();
    }

    console.log('══════════════════════════════════════════════════════════════════════════════');
    log(`✨ [${i + 1}/${BATH_VARIANTS.length}] ${variant.name}`);
    log(`   Camera: ${variant.camera.split(',')[0]}`);
    log(`   Mood: ${variant.mood}`);

    let success = false;
    let attempts = 0;
    const maxAttempts = 3;

    while (!success && attempts < maxAttempts) {
      attempts++;
      const useFailover = attempts > 1;

      if (attempts > 1) {
        log(`   🔄 Attempt ${attempts}/${maxAttempts}${useFailover ? ' (enhanced water coverage)' : ''}...`);
      }

      const prompt = buildPrompt(variant, useFailover);
      const filename = `meera_bath_${variant.id}${useFailover ? '_alt' : ''}_${Date.now()}.png`;
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
    if (i < BATH_VARIANTS.length - 1) {
      const baseDelay = success ? 30000 : 60000;
      const adaptiveDelay = baseDelay + (consecutiveFailures * 15000);
      log(`   ⏳ Next in ${adaptiveDelay / 1000}s...`);
      await sleep(adaptiveDelay);
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // FINAL REPORT
  // ═══════════════════════════════════════════════════════════════════════════

  const successRate = ((results.successful.length / BATH_VARIANTS.length) * 100).toFixed(1);

  console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║          CANDLELIT BATH MASTERY COLLECTION COMPLETE                          ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝

  ✅ Masterworks Created: ${results.successful.length}/${BATH_VARIANTS.length}
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
    subject: 'Meera - Candlelit Bath Mastery',
    collection: 'Water & Shadow Artistry - Full Body Focus',
    theme: 'Water coverage with cinematic camera systems',
    cameraSystems: Object.keys(CAMERA_SYSTEMS),
    environments: Object.keys(BATH_ENVIRONMENTS),
    variants: BATH_VARIANTS.length,
    successful: results.successful,
    failed: results.failed,
    successRate: successRate + '%'
  };

  fs.writeFileSync(path.join(OUTPUT_DIR, 'manifest.json'), JSON.stringify(manifest, null, 2));
  log('📋 Manifest saved\\n');
}

main().catch(console.error);
