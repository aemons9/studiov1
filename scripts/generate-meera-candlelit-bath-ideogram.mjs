#!/usr/bin/env node

/**
 * MEERA CANDLELIT BATH - IDEOGRAM 3.0 COLLECTION
 * Replicate API • Ideogram V3 Balanced
 * Ultra-Realistic Bath Photography • Candlelight Ambiance
 * STRICTLY LOCKED INDIAN MUSE: Meera (38D-27-40)
 *
 * Using proven prompt format for Ideogram 3.0
 */

import Replicate from "replicate";
import fs from "node:fs";
import path from "node:path";

// Configuration
const OUTPUT_DIR = '/home/ecolex/version1/generated-meera-bath-ideogram';
const MODEL = "ideogram-ai/ideogram-v3-balanced";

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Initialize Replicate client
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

// LOCKED INDIAN MEERA SUBJECT - DO NOT ALTER
const LOCKED_SUBJECT = `SUBJECT [LOCKED - CANNOT ALTER]: Stunningly beautiful Indian woman named Meera, 27 years old, 5'9" tall, South Asian Indian ethnicity.
Face: High cheekbones, elegant Indian nose, deep brown almond eyes with thick black lashes, full sensual lips with natural rose color, warm confident expression.
Body: Curvaceous Indian hourglass figure - 38D full natural bust, dramatically cinched 27" waist, voluptuous 40" wide rounded hips, smooth toned thighs.
Skin: Golden-brown caramel Indian complexion with natural luminous glow, warm undertones, realistic skin texture with visible pores. Wet glistening skin from bath water.
Hair: Long flowing jet black Indian hair past shoulders with natural shine, wet and clinging.
CRITICAL: Must be authentic South Asian Indian woman with golden-brown skin, NOT pale/white skin`;

// Photography Specifications
const PHOTOGRAPHY_SPECS = `PHOTOGRAPHY SPECIFICATIONS:
- Shot on Canon EOS R5 Mark II with 85mm f/1.2L lens
- 8K ultra-high resolution with exceptional detail
- Medium-close framing capturing full body and face
- Professional boudoir photography style`;

// Body Rendering - Bath specific
const BODY_RENDERING = `BODY RENDERING:
- Natural hourglass proportions: 38D bust, 27" waist, 40" hips
- Wet glistening skin with water droplets catching candlelight
- Curves, hips, decolletage, and glutes emphasized through pose
- Full feminine form with anatomical accuracy
- Water level artistically positioned around curves`;

// Skin Rendering - Wet skin
const SKIN_RENDERING = `SKIN RENDERING:
- Hyper-realistic wet golden-brown Indian skin texture
- Water droplets beading on smooth caramel complexion
- Warm undertones typical of South Asian women
- Natural luminosity enhanced by water and candlelight
- Glistening wet skin catching flickering light
- No airbrushing, authentic wet skin rendering`;

// Style footer
const STYLE_FOOTER = `STYLE: Renaissance master influence meets modern boudoir photography. Private spa collection quality. Sensuous aquatic artistic expression.
CRITICAL: Subject must be Indian woman with South Asian features, golden-brown Indian skin tone (NOT pale), black hair, brown eyes, 38D-27-40 hourglass figure. Ultra-realistic photographic quality.`;

// Bath Environments
const BATH_ENVIRONMENTS = {
  marbleSanctuary: `grand marble bathroom sanctuary, deep soaking tub filled with clear water, hundreds of candles creating warm amber glow, rose petals floating, steam rising softly`,
  romanBath: `ancient Roman bath house recreation, marble columns, warm candlelit alcoves, ornate stone tub, classical sculptures in background, warm water with soft ripples`,
  venetianPalazzo: `opulent Venetian palazzo bathroom, gold fixtures, ornate mirrors reflecting candlelight, deep copper tub, Murano glass candle holders, warm water with rose oil sheen`,
  japaneseSento: `traditional Japanese onsen bath, smooth stones, wooden accents, paper lanterns casting warm glow, steam rising, minimalist elegance, clear hot spring water`,
  moorishHammam: `exotic Moroccan hammam, intricate tile work, pierced metal lanterns creating star patterns, large marble basin, warm mist, aromatic steam`,
  modernLuxury: `ultra-modern luxury bathroom, freestanding sculptural tub, floor-to-ceiling windows showing city lights, minimalist candle arrangement, warm water with subtle bubbles`,
  victorianBoudoir: `Victorian-era claw-foot copper tub, ornate brass fixtures, velvet drapes, crystal candelabras with dozens of candles, rose petals in water`,
  grecianPool: `Grecian-style bathing pool, white marble with gold accents, goddess statues, floating candles on water surface, classical columns, warm natural spring water`
};

// Bath Poses - Emphasizing wet curves
const BATH_POSES = {
  risingVenus: `rising from the water like Venus, water cascading down 38D bust and 40" hips, arms lifted gracefully, direct confident gaze at camera`,
  reclinedBath: `reclined in bath with head resting on edge, one knee raised breaking water surface, 38D decolletage above waterline, sensual relaxed expression`,
  sideLying: `side-lying on submerged ledge, water at hip level, full curve of 40" hips and 38D bust visible, wet hair draped elegantly`,
  kneeling: `kneeling in shallow water, 40" hips prominent, water dripping from body, torso twisted showing waist-to-hip ratio, looking over shoulder`,
  standing: `standing in hip-deep water, full body visible above waterline, water drops on golden-brown skin, hands running through wet hair`,
  backArch: `dramatic back arch with hands on tub edge behind, water at waist level, 38D bust prominently lifted, head tilted back in pleasure`,
  seated: `seated on submerged bench, knees drawn up, water at chest level, intimate protected pose, direct soft gaze`,
  emerging: `emerging from water, stepping up from tub, full body glistening wet, water streaming down curves, graceful movement captured`
};

// Candlelight Variations
const CANDLELIGHT = {
  goldenGlow: `warm golden candlelight from dozens of candles creating soft ambient glow, gentle shadows accentuating curves`,
  dramaticFlicker: `dramatic flickering candlelight creating chiaroscuro effect, deep shadows and bright highlights on wet skin`,
  romanticSoft: `romantic soft candlelight diffused by steam, dreamy atmosphere, gentle illumination on glistening curves`,
  sidelight: `side candlelight creating rim lighting on wet body, dramatic silhouette with illuminated edges`,
  underlighting: `candles positioned low creating underlighting effect, dramatic shadows upward, sculptural appearance`,
  scattered: `scattered candle positions creating complex shadow play, multiple light sources, painterly quality`,
  reflectedGlow: `candlelight reflected in water surface creating doubled illumination, shimmering golden light`,
  intimate: `close intimate candlelight, single cluster near subject, soft personal illumination, warm skin tones`
};

// 16 Candlelit Bath Variants
const BATH_VARIANTS = [
  {
    name: 'Venus Rising',
    pose: BATH_POSES.risingVenus,
    env: BATH_ENVIRONMENTS.marbleSanctuary,
    light: CANDLELIGHT.goldenGlow,
    mood: 'Goddess emerging from sacred waters'
  },
  {
    name: 'Roman Goddess',
    pose: BATH_POSES.reclinedBath,
    env: BATH_ENVIRONMENTS.romanBath,
    light: CANDLELIGHT.dramaticFlicker,
    mood: 'Classical beauty in ancient bath'
  },
  {
    name: 'Venetian Nights',
    pose: BATH_POSES.sideLying,
    env: BATH_ENVIRONMENTS.venetianPalazzo,
    light: CANDLELIGHT.romanticSoft,
    mood: 'Opulent Venetian relaxation'
  },
  {
    name: 'Zen Tranquility',
    pose: BATH_POSES.seated,
    env: BATH_ENVIRONMENTS.japaneseSento,
    light: CANDLELIGHT.intimate,
    mood: 'Peaceful Japanese bath meditation'
  },
  {
    name: 'Hammam Queen',
    pose: BATH_POSES.kneeling,
    env: BATH_ENVIRONMENTS.moorishHammam,
    light: CANDLELIGHT.scattered,
    mood: 'Exotic Moroccan bathing ritual'
  },
  {
    name: 'Modern Luxury',
    pose: BATH_POSES.standing,
    env: BATH_ENVIRONMENTS.modernLuxury,
    light: CANDLELIGHT.sidelight,
    mood: 'Contemporary spa goddess'
  },
  {
    name: 'Victorian Elegance',
    pose: BATH_POSES.backArch,
    env: BATH_ENVIRONMENTS.victorianBoudoir,
    light: CANDLELIGHT.reflectedGlow,
    mood: 'Victorian private bathing chamber'
  },
  {
    name: 'Grecian Pool',
    pose: BATH_POSES.emerging,
    env: BATH_ENVIRONMENTS.grecianPool,
    light: CANDLELIGHT.goldenGlow,
    mood: 'Classical Greek goddess emerging'
  },
  {
    name: 'Marble Dreams',
    pose: BATH_POSES.sideLying,
    env: BATH_ENVIRONMENTS.marbleSanctuary,
    light: CANDLELIGHT.underlighting,
    mood: 'Dreamy marble sanctuary beauty'
  },
  {
    name: 'Steam Goddess',
    pose: BATH_POSES.risingVenus,
    env: BATH_ENVIRONMENTS.romanBath,
    light: CANDLELIGHT.romanticSoft,
    mood: 'Rising through steam and candlelight'
  },
  {
    name: 'Copper Curves',
    pose: BATH_POSES.reclinedBath,
    env: BATH_ENVIRONMENTS.victorianBoudoir,
    light: CANDLELIGHT.dramaticFlicker,
    mood: 'Warm copper glow on curves'
  },
  {
    name: 'Lantern Light',
    pose: BATH_POSES.kneeling,
    env: BATH_ENVIRONMENTS.moorishHammam,
    light: CANDLELIGHT.scattered,
    mood: 'Exotic lantern patterns on wet skin'
  },
  {
    name: 'City Lights Soak',
    pose: BATH_POSES.seated,
    env: BATH_ENVIRONMENTS.modernLuxury,
    light: CANDLELIGHT.intimate,
    mood: 'Urban luxury nighttime bath'
  },
  {
    name: 'Palazzo Indulgence',
    pose: BATH_POSES.backArch,
    env: BATH_ENVIRONMENTS.venetianPalazzo,
    light: CANDLELIGHT.sidelight,
    mood: 'Venetian palazzo indulgence'
  },
  {
    name: 'Spring Waters',
    pose: BATH_POSES.standing,
    env: BATH_ENVIRONMENTS.japaneseSento,
    light: CANDLELIGHT.goldenGlow,
    mood: 'Natural hot spring beauty'
  },
  {
    name: 'Ultimate Bath',
    pose: BATH_POSES.emerging,
    env: BATH_ENVIRONMENTS.marbleSanctuary,
    light: CANDLELIGHT.reflectedGlow,
    mood: 'Peak candlelit bath artistry'
  }
];

// Build ultra-realistic bath prompt
function buildBathPrompt(variant) {
  return `Ultra-realistic professional fine-art photography, museum quality masterpiece. Candlelit bath photography.

${LOCKED_SUBJECT}

POSE: ${variant.pose}

ENVIRONMENT: ${variant.env}

LIGHTING: ${variant.light}

${PHOTOGRAPHY_SPECS}

${BODY_RENDERING}

${SKIN_RENDERING}

${STYLE_FOOTER}

MOOD: ${variant.mood}. Maximum intimacy level 10+.`;
}

// Download and save image
async function downloadImage(url, filename) {
  const response = await fetch(url);
  const buffer = Buffer.from(await response.arrayBuffer());
  const filepath = path.join(OUTPUT_DIR, filename);
  fs.writeFileSync(filepath, buffer);
  const stats = fs.statSync(filepath);
  return (stats.size / 1024 / 1024).toFixed(2);
}

// Generate single image
async function generateImage(variant, index, total) {
  console.log(`══════════════════════════════════════════════════════════════════════════════`);
  console.log(`[${new Date().toLocaleTimeString()}] 🛁 [${index + 1}/${total}] ${variant.name}`);
  console.log(`[${new Date().toLocaleTimeString()}]    Mood: ${variant.mood}`);
  console.log(`[${new Date().toLocaleTimeString()}]    Muse: LOCKED Indian Meera (38D-27-40)`);

  const prompt = buildBathPrompt(variant);

  try {
    console.log(`[${new Date().toLocaleTimeString()}]    🔄 Generating with Ideogram 3.0...`);

    const input = {
      prompt: prompt,
      resolution: "None",
      style_type: "Realistic",
      aspect_ratio: "3:4",
      style_preset: "None",
      magic_prompt_option: "Auto"
    };

    const output = await replicate.run(MODEL, { input });

    const imageUrl = output.url ? output.url() : (typeof output === 'string' ? output : null);

    if (imageUrl) {
      const filename = `meera_bath_ideogram_${variant.name.toLowerCase().replace(/\\s+/g, '_')}_${Date.now()}.png`;
      const size = await downloadImage(imageUrl, filename);

      console.log(`[${new Date().toLocaleTimeString()}]    ✅ SUCCESS: ${filename} (${size} MB)`);

      return {
        variant: variant.name,
        mood: variant.mood,
        filename,
        size,
        success: true
      };
    } else {
      console.log(`[${new Date().toLocaleTimeString()}]    ❌ No output URL`);
      return { variant: variant.name, success: false, error: 'No output' };
    }
  } catch (error) {
    console.log(`[${new Date().toLocaleTimeString()}]    ❌ Error: ${error.message}`);
    return { variant: variant.name, success: false, error: error.message };
  }
}

// Main
async function main() {
  console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║   🛁 MEERA CANDLELIT BATH - IDEOGRAM 3.0 COLLECTION 🛁                      ║
║                                                                              ║
║   Replicate API • Ideogram V3 Balanced • Candlelit Bath                     ║
║   STRICTLY LOCKED: Indian Woman Meera • South Asian Ethnicity              ║
║   Body: 38D Bust • 27" Waist • 40" Hips • Hourglass Figure                 ║
║   Skin: Golden-Brown Caramel Indian Complexion • Wet Glistening            ║
║                                                                              ║
║   16 Candlelit Bath Variants • Max Intimacy 10+ • Museum Quality           ║
║   Various Bath Environments • Candlelight Variations • Wet Skin Detail     ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
  `);

  if (!process.env.REPLICATE_API_TOKEN) {
    console.error('❌ REPLICATE_API_TOKEN not set!');
    process.exit(1);
  }

  console.log(`[${new Date().toLocaleTimeString()}] ✅ Replicate API configured`);
  console.log(`[${new Date().toLocaleTimeString()}] 🔒 MUSE STRICTLY LOCKED: Indian Meera (38D-27-40)`);
  console.log(`[${new Date().toLocaleTimeString()}] 🎯 Model: Ideogram 3.0 (V3 Balanced)`);
  console.log(`[${new Date().toLocaleTimeString()}] 🛁 Theme: Candlelit Bath Collection`);
  console.log();

  const results = [];
  let successCount = 0;

  for (let i = 0; i < BATH_VARIANTS.length; i++) {
    const result = await generateImage(BATH_VARIANTS[i], i, BATH_VARIANTS.length);
    results.push(result);
    if (result.success) successCount++;

    if (i < BATH_VARIANTS.length - 1) {
      console.log(`[${new Date().toLocaleTimeString()}]    ⏳ Next in 10s...`);
      await new Promise(resolve => setTimeout(resolve, 10000));
    }
  }

  console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║          🛁 MEERA CANDLELIT BATH IDEOGRAM COMPLETE 🛁                        ║
╚══════════════════════════════════════════════════════════════════════════════╝

  ✅ Success: ${successCount}/${BATH_VARIANTS.length}
  📊 Rate: ${((successCount / BATH_VARIANTS.length) * 100).toFixed(1)}%
  📁 Output: ${OUTPUT_DIR}
`);

  results.filter(r => r.success).forEach(r => {
    console.log(`     🛁 ${r.variant} (${r.size} MB)`);
  });

  if (results.some(r => !r.success)) {
    console.log(`\n  FAILED:`);
    results.filter(r => !r.success).forEach(r => {
      console.log(`     ❌ ${r.variant} - ${r.error}`);
    });
  }

  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'manifest.json'),
    JSON.stringify({
      collection: 'Meera Candlelit Bath - Ideogram 3.0',
      model: 'ideogram-ai/ideogram-v3-balanced',
      lockedMuse: 'Indian Meera (38D-27-40)',
      generated: new Date().toISOString(),
      variants: results,
      stats: { total: BATH_VARIANTS.length, successful: successCount }
    }, null, 2)
  );
  console.log(`[${new Date().toLocaleTimeString()}] 📋 Manifest saved`);
}

main().catch(console.error);
