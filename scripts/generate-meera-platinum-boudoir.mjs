#!/usr/bin/env node

/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                                                                              ║
 * ║   ███╗   ███╗███████╗███████╗██████╗  █████╗                                 ║
 * ║   ████╗ ████║██╔════╝██╔════╝██╔══██╗██╔══██╗                                ║
 * ║   ██║╚██╔╝██║██╔══╝  ██╔══╝  ██╔══██╗██╔══██║                                ║
 * ║   ██║ ╚═╝ ██║███████╗███████╗██║  ██║██║  ██║                                ║
 * ║   ╚═╝     ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝                                ║
 * ║                                                                              ║
 * ║   PLATINUM STRING BOUDOIR - PERSONAL INTIMATE COLLECTION                     ║
 * ║                                                                              ║
 * ║   God-Mode Max Creativity • Water Lower • Shadow Upper                       ║
 * ║   Platinum Chain Accent • Private Spa Boudoir • Unpublished                  ║
 * ║                                                                              ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

import fs from 'fs';
import path from 'path';

const OUTPUT_DIR = '/home/ecolex/version1/generated-meera-platinum-boudoir';
const PROJECT_ID = 'zaranovel';
const LOCATION = 'us-central1';
const PROXY_URL = 'http://localhost:3001';

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// ═══════════════════════════════════════════════════════════════════════════════
// MEERA - INTIMATE BOUDOIR MUSE
// ═══════════════════════════════════════════════════════════════════════════════

const MEERA_SUBJECT = `Stunningly beautiful Indian woman Meera, age 27, height 5'9", naturally curvaceous hourglass figure with divine proportions, warm golden-brown caramel skin with natural luminous glow and water droplets glistening, realistic skin texture with subtle pores and natural highlights, captivating deep brown almond eyes with thick dark lashes conveying intimate vulnerability, full sensual lips slightly parted, long flowing black hair wet and sleek, authentic natural beauty radiating warmth and trust`;

// ═══════════════════════════════════════════════════════════════════════════════
// FINE ART DECLARATIONS
// ═══════════════════════════════════════════════════════════════════════════════

const ART_DECLARATIONS = [
  `Gagosian Gallery private collection fine art photography. Intimate boudoir study exploring vulnerability through interplay of water, shadow, and minimal adornment. Collector-grade artistic documentation.`,

  `Christie's private auction photography. Museum-quality intimate portraiture combining water coverage, shadow architecture, and delicate platinum accent. Investment-grade fine art.`,

  `Tate Modern private exhibition. Contemporary boudoir photography exploring form through strategic water, architectural shadow, and single platinum thread element. Gallery standard.`,

  `MoMA private collection acquisition. Intimate study of trust and vulnerability through water, shadow, and minimal platinum chain accent. Museum permanent collection quality.`,

  `Centre Pompidou private photography archive. European fine art boudoir combining spa atmosphere with shadow mesh and delicate chain detail. International exhibition standard.`,

  `Aperture Foundation private award collection. Documentary intimate portraiture with water lower coverage, shadow upper mesh, and platinum string accent. Professional excellence.`
];

// ═══════════════════════════════════════════════════════════════════════════════
// PLATINUM STRING ACCENT VARIATIONS
// ═══════════════════════════════════════════════════════════════════════════════

const PLATINUM_ACCENTS = {
  singleDrape: `single ultra-thin platinum chain draped delicately across décolletage, catching light like liquid silver, minimal elegant accent`,

  hipChain: `whisper-thin platinum thread chain resting on hip bone, single strand catching light, minimal strategic accent`,

  shoulderStrand: `single platinum lace thread draped from shoulder across torso diagonally, barely visible glinting line`,

  waistThread: `delicate platinum micro-chain circling waist loosely, single strand creating subtle definition`,

  crossBody: `single platinum thread chain creating X pattern across torso, minimal strategic coverage accent`,

  neckToHip: `ultra-fine platinum chain draped from neck down center of body to hip, single glinting vertical line`
};

// ═══════════════════════════════════════════════════════════════════════════════
// SHADOW MESH UPPER COVERAGE
// ═══════════════════════════════════════════════════════════════════════════════

const SHADOW_UPPER = {
  venetian: `venetian blind shadows creating horizontal stripe mesh pattern across upper body and décolletage, light and shadow alternating`,

  lace: `ornate lace curtain shadows casting delicate floral mesh pattern across shoulders and chest, shadow as wearable art`,

  foliage: `tropical plant shadows creating organic dappled mesh across upper body, natural botanical shadow coverage`,

  geometric: `architectural window shadows creating geometric grid pattern across torso, structured shadow mesh`,

  lattice: `garden lattice shadows casting diamond pattern across upper form, elegant shadow jewelry`,

  palm: `palm frond shadows creating feathered stripe pattern across shoulders and chest, exotic shadow draping`
};

// ═══════════════════════════════════════════════════════════════════════════════
// WATER LOWER COVERAGE
// ═══════════════════════════════════════════════════════════════════════════════

const WATER_LOWER = {
  poolEdge: `lower body submerged in warm spa pool water at hip level, water surface creating soft optical coverage, droplets beading above waterline`,

  shallowPuddle: `kneeling in shallow warm water pooled on floor at thigh level, water providing natural coverage with reflections`,

  steamBath: `lower body veiled in rising steam from hot water below, mist creating soft ethereal coverage`,

  cascading: `warm water cascading down lower body from above, water streams creating liquid coverage`,

  floatingPetals: `lower body in milky water with rose petals floating strategically, romantic natural coverage`,

  tidalPool: `sitting in natural tide pool with sea water at hip level, crystal water providing artistic coverage`
};

// ═══════════════════════════════════════════════════════════════════════════════
// SPA BOUDOIR ENVIRONMENTS
// ═══════════════════════════════════════════════════════════════════════════════

const SPA_ENVIRONMENTS = {
  privateSpa: `ultra-luxurious private spa suite with warm stone surfaces, infinity edge soaking pool, soft ambient candlelight, tropical plants creating shadow patterns, steam rising, intimate sanctuary atmosphere`,

  balineseSpa: `authentic Balinese spa pavilion with carved wooden screens, natural stone pool, tropical flowers, incense smoke creating atmosphere, warm golden ambient light filtering through screens`,

  japaneseOnsen: `traditional Japanese private onsen with natural stone bath, bamboo elements, paper lanterns, steam rising, minimalist zen atmosphere with warm intimate lighting`,

  moroccanHammam: `opulent Moroccan hammam with zellige tile, brass lanterns casting intricate shadows, warm pool, rose petals, exotic intimate atmosphere`,

  modernSpa: `contemporary luxury spa with floor-to-ceiling windows, geometric shadow patterns, sleek infinity pool, city lights beyond, sophisticated intimate atmosphere`,

  gardenSpa: `hidden garden spa sanctuary with natural stone pool surrounded by tropical foliage creating dappled shadows, floating candles, evening golden hour light`,

  caveGrotto: `natural cave grotto spa with warm mineral pool, stalactites creating dramatic shadows, soft natural light from above, primal intimate sanctuary`,

  rooftopSpa: `exclusive rooftop spa at sunset with infinity pool, venetian blind shadows from pergola, city skyline, warm amber light, private urban sanctuary`
};

// ═══════════════════════════════════════════════════════════════════════════════
// 14 INTIMATE BOUDOIR VARIANTS
// ═══════════════════════════════════════════════════════════════════════════════

const BOUDOIR_VARIANTS = [
  // ─────────────────────────────────────────────────────────────────────────────
  // PRIVATE SPA SERIES
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'spa_venus_rising',
    name: 'Spa Venus Rising',
    artDeclaration: 0,
    platinumAccent: PLATINUM_ACCENTS.singleDrape,
    shadowUpper: SHADOW_UPPER.venetian,
    waterLower: WATER_LOWER.poolEdge,
    environment: SPA_ENVIRONMENTS.privateSpa,
    pose: `rising from private spa pool, lower body submerged in warm water at hip level, venetian blind shadows creating stripe coverage across upper body and shoulders, single platinum chain draped across décolletage catching light, wet hair slicked back, arms slightly raised at sides, expression of serene confidence, full body composition with water reflection below`,
    mood: 'Divine emergence, private sanctuary'
  },
  {
    id: 'spa_contemplation',
    name: 'Spa Contemplation',
    artDeclaration: 1,
    platinumAccent: PLATINUM_ACCENTS.hipChain,
    shadowUpper: SHADOW_UPPER.lace,
    waterLower: WATER_LOWER.shallowPuddle,
    environment: SPA_ENVIRONMENTS.privateSpa,
    pose: `kneeling in shallow warm water pooled on heated stone floor, water at mid-thigh providing coverage, ornate lace shadow patterns across upper body from decorative screen, single platinum thread on hip bone, arms crossed delicately over chest, head tilted in contemplative vulnerability, wet skin glistening`,
    mood: 'Intimate reflection, vulnerable trust'
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BALINESE SERIES
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'balinese_goddess',
    name: 'Balinese Goddess',
    artDeclaration: 2,
    platinumAccent: PLATINUM_ACCENTS.shoulderStrand,
    shadowUpper: SHADOW_UPPER.foliage,
    waterLower: WATER_LOWER.floatingPetals,
    environment: SPA_ENVIRONMENTS.balineseSpa,
    pose: `reclining in stone pool with milky water and floating frangipani petals at hip level, tropical plant shadows creating organic coverage across torso and shoulders, single platinum thread from shoulder across chest, one arm behind head in hair, other trailing in water, expression of exotic serenity`,
    mood: 'Tropical goddess, petal sanctuary'
  },
  {
    id: 'balinese_ritual',
    name: 'Balinese Ritual',
    artDeclaration: 3,
    platinumAccent: PLATINUM_ACCENTS.waistThread,
    shadowUpper: SHADOW_UPPER.palm,
    waterLower: WATER_LOWER.cascading,
    environment: SPA_ENVIRONMENTS.balineseSpa,
    pose: `standing under gentle waterfall in pavilion, warm water cascading down lower body providing flowing coverage, palm frond shadows creating feathered stripes across upper body, platinum chain at waist, arms raised adjusting wet hair, eyes closed in ritual bliss`,
    mood: 'Sacred cleansing, water ritual'
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // JAPANESE SERIES
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'onsen_meditation',
    name: 'Onsen Meditation',
    artDeclaration: 4,
    platinumAccent: PLATINUM_ACCENTS.neckToHip,
    shadowUpper: SHADOW_UPPER.geometric,
    waterLower: WATER_LOWER.steamBath,
    environment: SPA_ENVIRONMENTS.japaneseOnsen,
    pose: `seated in natural stone bath with steam rising around lower body creating soft coverage, geometric shoji screen shadows creating grid pattern on upper body, single platinum chain from neck down center, hands in lap in meditation pose, serene zen expression`,
    mood: 'Zen stillness, meditative intimacy'
  },
  {
    id: 'onsen_emergence',
    name: 'Onsen Emergence',
    artDeclaration: 5,
    platinumAccent: PLATINUM_ACCENTS.crossBody,
    shadowUpper: SHADOW_UPPER.lattice,
    waterLower: WATER_LOWER.poolEdge,
    environment: SPA_ENVIRONMENTS.japaneseOnsen,
    pose: `emerging from onsen bath, lower body in water at hip level, bamboo lattice shadows creating diamond pattern across shoulders and chest, platinum chain X across torso, both hands on stone edge lifting body, profile view with hair streaming water, vulnerable determined expression`,
    mood: 'Graceful emergence, quiet strength'
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // MOROCCAN SERIES
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'hammam_queen',
    name: 'Hammam Queen',
    artDeclaration: 0,
    platinumAccent: PLATINUM_ACCENTS.singleDrape,
    shadowUpper: SHADOW_UPPER.lace,
    waterLower: WATER_LOWER.floatingPetals,
    environment: SPA_ENVIRONMENTS.moroccanHammam,
    pose: `lounging in warm hammam pool with rose petals floating at hip level, intricate brass lantern shadows casting lace pattern across upper body, platinum chain draped across décolletage, one leg bent creating elegant line, arm resting on pool edge, knowing sultry gaze`,
    mood: 'Exotic royalty, hammam mystique'
  },
  {
    id: 'hammam_floor',
    name: 'Hammam Floor',
    artDeclaration: 1,
    platinumAccent: PLATINUM_ACCENTS.hipChain,
    shadowUpper: SHADOW_UPPER.geometric,
    waterLower: WATER_LOWER.shallowPuddle,
    environment: SPA_ENVIRONMENTS.moroccanHammam,
    pose: `lying on warm zellige tile floor in shallow water pooled around lower body, geometric lantern shadows creating mesh across torso, platinum thread at hip, body creating S-curve, one arm above head, expression of languid pleasure`,
    mood: 'Tile mosaic, languid heat'
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // MODERN SERIES
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'urban_reflection',
    name: 'Urban Reflection',
    artDeclaration: 2,
    platinumAccent: PLATINUM_ACCENTS.shoulderStrand,
    shadowUpper: SHADOW_UPPER.venetian,
    waterLower: WATER_LOWER.poolEdge,
    environment: SPA_ENVIRONMENTS.modernSpa,
    pose: `standing in infinity pool with water at hip level and city lights reflected, venetian blind shadows creating stripes across upper body, platinum strand from shoulder, arms at artistic angles, silhouette against cityscape, powerful confident expression`,
    mood: 'Urban goddess, city sanctuary'
  },
  {
    id: 'modern_recline',
    name: 'Modern Recline',
    artDeclaration: 3,
    platinumAccent: PLATINUM_ACCENTS.waistThread,
    shadowUpper: SHADOW_UPPER.geometric,
    waterLower: WATER_LOWER.shallowPuddle,
    environment: SPA_ENVIRONMENTS.modernSpa,
    pose: `reclining on wet spa floor with water pooled around lower body, geometric window shadows creating grid across torso, platinum chain at waist, body creating elegant curve, one knee raised, contemplative gaze at ceiling`,
    mood: 'Minimalist luxury, contemporary intimacy'
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // NATURE SERIES
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'garden_nymph',
    name: 'Garden Nymph',
    artDeclaration: 4,
    platinumAccent: PLATINUM_ACCENTS.neckToHip,
    shadowUpper: SHADOW_UPPER.foliage,
    waterLower: WATER_LOWER.poolEdge,
    environment: SPA_ENVIRONMENTS.gardenSpa,
    pose: `wading in hidden garden pool at hip level, dense foliage shadows creating organic coverage across entire upper body, platinum chain from neck to hip catching golden light, surrounded by tropical plants, expression of wild natural freedom`,
    mood: 'Garden spirit, natural intimacy'
  },
  {
    id: 'grotto_secret',
    name: 'Grotto Secret',
    artDeclaration: 5,
    platinumAccent: PLATINUM_ACCENTS.crossBody,
    shadowUpper: SHADOW_UPPER.lattice,
    waterLower: WATER_LOWER.tidalPool,
    environment: SPA_ENVIRONMENTS.caveGrotto,
    pose: `sitting in warm grotto pool with mineral water at hip level, natural rock formations casting lattice shadows across shoulders and chest, platinum X chain catching shaft of light, wet hair clinging, primal vulnerable expression`,
    mood: 'Hidden sanctuary, primal trust'
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // ROOFTOP SERIES
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'sunset_silhouette',
    name: 'Sunset Silhouette',
    artDeclaration: 0,
    platinumAccent: PLATINUM_ACCENTS.singleDrape,
    shadowUpper: SHADOW_UPPER.venetian,
    waterLower: WATER_LOWER.poolEdge,
    environment: SPA_ENVIRONMENTS.rooftopSpa,
    pose: `standing in rooftop infinity pool at sunset, water at hip level with city below, pergola venetian shadows creating stripes across backlit upper body, platinum chain catching dying light, arms slightly raised, silhouette against painted sky`,
    mood: 'Golden hour goddess, urban twilight'
  },
  {
    id: 'rooftop_reverie',
    name: 'Rooftop Reverie',
    artDeclaration: 1,
    platinumAccent: PLATINUM_ACCENTS.hipChain,
    shadowUpper: SHADOW_UPPER.palm,
    waterLower: WATER_LOWER.cascading,
    environment: SPA_ENVIRONMENTS.rooftopSpa,
    pose: `under rooftop waterfall feature with warm water cascading down lower body, palm tree shadows creating feathered coverage on upper body, platinum thread at hip, head tilted back in evening breeze, expression of pure urban escapism`,
    mood: 'Rooftop escape, evening intimacy'
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
// FAILOVER STRATEGIES
// ═══════════════════════════════════════════════════════════════════════════════

const FAILOVER = {
  coverage1: `elegant sheer champagne silk wrap draped strategically across form, combined with water and shadow coverage`,
  coverage2: `delicate gold mesh fabric wrap wet and clinging, providing artistic coverage with platinum accent`,
  coverage3: `flowing gossamer fabric in nude tone creating soft coverage combined with water and shadow`
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
    ? `Artistic Coverage: ${FAILOVER[['coverage1', 'coverage2', 'coverage3'][variant.artDeclaration % 3]]}`
    : `Upper Shadow Coverage: ${variant.shadowUpper}

Lower Water Coverage: ${variant.waterLower}

Platinum Chain Accent: ${variant.platinumAccent}`;

  return `${declaration}

Professional fine art boudoir photography, Hasselblad H6D-100c medium format, 80mm f/2.0 lens, private collection standard,

Subject: ${MEERA_SUBJECT},

${coverage},

Intimate Pose: ${variant.pose},

Private Spa Environment: ${variant.environment},

Mood: ${variant.mood},

Technical Excellence: Ultra-realistic 8K photograph with hyper-detailed water droplets on skin, authentic skin texture with natural luminosity, steam atmosphere. Shadow mesh creating artistic upper coverage while water provides lower coverage. Single platinum chain catching light as minimal accent. Shallow depth of field f/2.0. Private boudoir atmosphere with complete environmental consistency. Gallery-quality fine art suitable for private collection.`;
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
║   ✨ PLATINUM STRING BOUDOIR - PRIVATE INTIMATE COLLECTION ✨                ║
║                                                                              ║
║   14 Personal Intimates • Water Lower • Shadow Upper • Platinum Accent       ║
║   Private Spa Boudoir • Unpublished Category • Max Creativity                ║
║                                                                              ║
║   Private Spa • Balinese • Japanese • Moroccan • Modern • Nature • Rooftop   ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
  `);

  log('Authenticating with Vertex AI...');
  let token = await getOAuthToken();
  log('✅ OAuth token obtained\\n');

  const results = { successful: [], failed: [] };
  let consecutiveFailures = 0;

  for (let i = 0; i < BOUDOIR_VARIANTS.length; i++) {
    const variant = BOUDOIR_VARIANTS[i];

    if (i > 0 && i % 3 === 0) {
      log('🔄 Refreshing OAuth token...');
      token = await getOAuthToken();
    }

    console.log('══════════════════════════════════════════════════════════════════════════════');
    log(`✨ [${i + 1}/${BOUDOIR_VARIANTS.length}] ${variant.name}`);
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
      const filename = `meera_boudoir_${variant.id}${useFailover ? '_alt' : ''}_${Date.now()}.png`;
      const filepath = path.join(OUTPUT_DIR, filename);

      try {
        const buffer = await generateImage(prompt, token);
        fs.writeFileSync(filepath, buffer);
        const sizeMB = (buffer.length / (1024 * 1024)).toFixed(2);

        log(`   ✅ MASTERWORK: ${filename} (${sizeMB} MB)`);
        results.successful.push({ ...variant, filename, sizeMB, attempts, usedFailover: useFailover });
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

    if (i < BOUDOIR_VARIANTS.length - 1) {
      const baseDelay = success ? 30000 : 60000;
      const adaptiveDelay = baseDelay + (consecutiveFailures * 15000);
      log(`   ⏳ Next in ${adaptiveDelay / 1000}s...`);
      await sleep(adaptiveDelay);
    }
  }

  const successRate = ((results.successful.length / BOUDOIR_VARIANTS.length) * 100).toFixed(1);

  console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║          PLATINUM STRING BOUDOIR COLLECTION COMPLETE                         ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝

  ✅ Masterworks Created: ${results.successful.length}/${BOUDOIR_VARIANTS.length}
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

  const manifest = {
    timestamp: new Date().toISOString(),
    subject: 'Meera - Platinum String Boudoir',
    collection: 'Private Intimate - Water Lower, Shadow Upper, Platinum Accent',
    category: 'Unpublished Personal Boudoir',
    platinumAccents: Object.keys(PLATINUM_ACCENTS),
    shadowTypes: Object.keys(SHADOW_UPPER),
    waterTypes: Object.keys(WATER_LOWER),
    environments: Object.keys(SPA_ENVIRONMENTS),
    variants: BOUDOIR_VARIANTS.length,
    successful: results.successful,
    failed: results.failed,
    successRate: successRate + '%'
  };

  fs.writeFileSync(path.join(OUTPUT_DIR, 'manifest.json'), JSON.stringify(manifest, null, 2));
  log('📋 Manifest saved\\n');
}

main().catch(console.error);
