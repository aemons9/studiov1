#!/usr/bin/env node

/**
 * MEERA - BENT KNEES & V LEGS CLOSEUP REALISTIC SERIES
 * ImagineArt 1.0 • Ultra-Realistic Skin Detail
 *
 * Bent Knees Apart • V Legs Closeup • Intimate Captures
 * Varying Lighting • Hyper-Realistic Skin Tones
 * STRICTLY LOCKED INDIAN MUSE: Meera (37DD-27-40)
 */

import Replicate from "replicate";
import fs from "node:fs";
import path from "node:path";

// Configuration
const OUTPUT_DIR = '/home/ecolex/version1/generated-meera-bent-v-closeup-realistic';
const MODEL = "imagineart/imagineart-1.0:b7178694f11dc428590f98d295a6e370bc3dc843819043d0f3621d66be13e440";

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Initialize Replicate client
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

// LOCKED INDIAN MEERA - ULTRA REALISTIC
const LOCKED_INDIAN_MEERA = `SUBJECT (STRICTLY LOCKED - IMMUTABLE): Indian woman Meera, South Asian Indian ethnicity.

LOCKED MEASUREMENTS (37DD-27-40):
- 37DD heavy natural bust with teardrop fullness
- 27" dramatically cinched waist with visible navel piercing
- 40" wide round Indian hips with full feminine curves
- Soft toned inner thighs with natural feminine fullness

ULTRA-REALISTIC INDIAN SKIN (CRITICAL):
- Golden-brown caramel complexion typical of South Asian women
- HYPER-REALISTIC skin rendering with visible pores
- Natural skin texture variations and micro-imperfections
- Subtle visible veins under skin surface
- Natural skin shine and oil in intimate areas
- Goosebumps texture where applicable
- Realistic skin folds at joints and bends
- Natural color variations - slightly darker in creases, lighter on prominences
- Authentic golden-brown Indian tone - NOT pale/white

LOCKED FEATURES:
- Deep brown almond Indian eyes, thick black lashes
- Long jet black Indian hair spread on surface
- Platinum navel ring with diamond catching light
- Gold anklet on left ankle
- Small diamond nose stud`;

// BENT KNEES APART POSES - Detailed Variations
const BENT_KNEES_POSES = {
  classicBent: `POSE - CLASSIC BENT KNEES: Laying on back, both knees bent at 90 degrees and fallen apart naturally to sides. Feet flat on surface shoulder-width apart. Inner thighs fully exposed creating V-shape toward intimate area. Natural relaxed positioning. Golden-brown inner thigh skin catching light from ankle to hip.`,

  wideBent: `POSE - WIDE BENT KNEES: Knees bent and spread extra wide, almost touching surface on each side. Maximum inner thigh exposure. Dramatic V-shape with intimate shadowing. Feet may lift slightly from wide spread. Full inner thigh landscape visible.`,

  asymmetricBent: `POSE - ASYMMETRIC BENT: One knee bent and fallen outward, other knee bent but more upright. Asymmetric intimate framing. One inner thigh fully exposed, other partially. Natural unposed appearance.`,

  feetTogetherKneesApart: `POSE - FEET TOGETHER KNEES APART: Soles of feet touching/close together, knees fallen completely outward in butterfly-adjacent position. Diamond negative space between thighs. Full inner thigh exposure from hip to knee on both sides.`,

  elevatedBent: `POSE - ELEVATED BENT KNEES: Knees bent with feet elevated slightly off surface, knees spread apart. Inner thighs visible from slightly below. Gravity effect on soft thigh flesh.`,

  deepBent: `POSE - DEEP BENT: Knees pulled back toward chest then fallen apart. Deeper angle showing more of inner thigh underside. More intimate closeup perspective. Hip crease detail visible.`
};

// V LEGS POSES - Detailed Variations
const V_LEGS_POSES = {
  classicV: `POSE - CLASSIC V SPREAD: Legs extended straight and spread in V-shape. Inner thighs visible full length from hip to ankle. V-angle approximately 60-90 degrees. Clean geometric body lines. Full inner thigh surface exposed.`,

  wideV: `POSE - WIDE V SPREAD: Legs spread in very wide V, approaching 120 degrees. Maximum inner thigh exposure. Extreme spread showing full inner leg surfaces. Dramatic intimate geometry.`,

  raisedV: `POSE - RAISED V: Legs raised off surface and spread in V toward ceiling. Inner thighs visible from below angle. Gravity effect on soft flesh. V-shape framing view upward toward body.`,

  softV: `POSE - SOFT V: Legs in relaxed V with slight knee bend, not rigidly straight. Natural comfortable spread. Soft inner thigh curves. More intimate casual positioning.`,

  oneRaisedV: `POSE - ASYMMETRIC V: One leg extended on surface, other raised and spread creating asymmetric V. Different angle on each inner thigh. Dynamic intimate composition.`,

  closeupV: `POSE - CLOSEUP V FOCUS: Camera positioned close between V-spread legs. Extreme closeup of inner thigh area where V converges. Intimate detail of inner thigh skin meeting at top.`
};

// VARYING LIGHTING STYLES - Realistic
const REALISTIC_LIGHTING = {
  softWindow: `LIGHTING - SOFT WINDOW: Natural soft light from large window. Even diffused illumination. Realistic indoor daylight. Subtle shadows defining curves. True-to-life skin color rendering. No harsh contrast.`,

  goldenAfternoon: `LIGHTING - GOLDEN AFTERNOON: Warm late afternoon sunlight. Golden tones wrapping around golden-brown Indian skin. Long soft shadows. Romantic realistic warmth. Natural sun positioning.`,

  overheadSoft: `LIGHTING - OVERHEAD SOFT: Soft overhead lighting as if from skylight. Even top-down illumination. Minimal shadows on inner thighs facing up. Clean realistic detail visibility.`,

  sideNatural: `LIGHTING - SIDE NATURAL: Natural light from side creating gentle shadows. One side illuminated, other in soft shadow. Sculptural realistic rendering. Depth through shadow.`,

  morningLight: `LIGHTING - MORNING LIGHT: Soft early morning light. Cool undertones mixing with warm skin. Gentle awakening atmosphere. Realistic bedroom morning scene.`,

  cloudySoft: `LIGHTING - CLOUDY SOFT: Overcast day diffused lighting. Ultra-soft shadows. Maximum skin detail visibility. Even realistic illumination perfect for detail photography.`,

  warmLamp: `LIGHTING - WARM LAMP: Warm tungsten lamp light. Orange-warm tones on golden-brown skin. Intimate evening indoor lighting. Realistic domestic atmosphere.`,

  mixedNatural: `LIGHTING - MIXED NATURAL: Multiple natural light sources. Window light plus reflected fill. Complex realistic lighting scenario. True-to-life indoor illumination.`,

  backlit: `LIGHTING - BACKLIT NATURAL: Light source behind subject. Rim light outlining body. Inner thighs catching fill from front. Ethereal yet realistic rendering.`,

  firelight: `LIGHTING - FIRELIGHT GLOW: Warm flickering firelight. Orange-amber tones. Dancing subtle shadows. Intimate realistic fireplace scene.`,

  candleMultiple: `LIGHTING - MULTIPLE CANDLES: Several candles creating soft omnidirectional glow. Warm intimate lighting. Realistic candlelit atmosphere. Minimal harsh shadows.`,

  studioDiffused: `LIGHTING - STUDIO DIFFUSED: Professional soft studio lighting. Even illumination for maximum detail. Clean realistic rendering. Beauty photography quality.`
};

// ULTRA-REALISTIC SKIN DETAIL EMPHASIS
const SKIN_DETAIL = `ULTRA-REALISTIC SKIN RENDERING (CRITICAL REQUIREMENT):

TEXTURE DETAIL:
- Visible skin pores on inner thighs - individual pore detail
- Natural skin texture grain and micro-relief
- Subtle hair follicle texture even if hairless
- Realistic skin elasticity appearance

TONAL VARIATION:
- Slightly darker golden-brown in inner thigh creases
- Lighter tones on thigh prominences catching light
- Natural color gradient from hip to knee
- Realistic undertone showing blood flow warmth

SURFACE QUALITY:
- Natural skin sheen in intimate areas
- Realistic moisture/oil appearance where natural
- Matte vs slight shine variation
- No artificial airbrushed smoothness

IMPERFECTIONS (REALISTIC):
- Subtle natural skin variations
- Minor realistic texture irregularities
- Natural skin appearance, not plastic/perfect
- Authentic human skin quality

ANATOMICAL ACCURACY:
- Realistic skin folding at bent joints
- Natural flesh compression where pressed
- Gravity effect on soft tissue
- Realistic muscle/fat distribution under skin`;

// 24 BENT KNEES & V LEGS CLOSEUP VARIANTS
const CLOSEUP_VARIANTS = [
  // BENT KNEES - VARYING LIGHTING
  { name: 'Bent Window Light', pose: BENT_KNEES_POSES.classicBent, light: REALISTIC_LIGHTING.softWindow, desc: 'Classic bent knees in soft window light' },
  { name: 'Bent Golden Hour', pose: BENT_KNEES_POSES.classicBent, light: REALISTIC_LIGHTING.goldenAfternoon, desc: 'Bent knees in warm golden afternoon' },
  { name: 'Wide Bent Morning', pose: BENT_KNEES_POSES.wideBent, light: REALISTIC_LIGHTING.morningLight, desc: 'Wide bent knees in soft morning light' },
  { name: 'Wide Bent Firelight', pose: BENT_KNEES_POSES.wideBent, light: REALISTIC_LIGHTING.firelight, desc: 'Wide spread in warm firelight glow' },
  { name: 'Asymmetric Side Light', pose: BENT_KNEES_POSES.asymmetricBent, light: REALISTIC_LIGHTING.sideNatural, desc: 'Asymmetric bent with sculpting side light' },
  { name: 'Feet Together Overhead', pose: BENT_KNEES_POSES.feetTogetherKneesApart, light: REALISTIC_LIGHTING.overheadSoft, desc: 'Feet together knees apart overhead view' },
  { name: 'Elevated Bent Backlit', pose: BENT_KNEES_POSES.elevatedBent, light: REALISTIC_LIGHTING.backlit, desc: 'Elevated bent knees with rim light' },
  { name: 'Deep Bent Candlelit', pose: BENT_KNEES_POSES.deepBent, light: REALISTIC_LIGHTING.candleMultiple, desc: 'Deep bent intimate candlelight' },
  { name: 'Bent Cloudy Soft', pose: BENT_KNEES_POSES.classicBent, light: REALISTIC_LIGHTING.cloudySoft, desc: 'Maximum detail in cloudy soft light' },
  { name: 'Wide Bent Studio', pose: BENT_KNEES_POSES.wideBent, light: REALISTIC_LIGHTING.studioDiffused, desc: 'Wide bent professional studio detail' },
  { name: 'Deep Bent Lamp', pose: BENT_KNEES_POSES.deepBent, light: REALISTIC_LIGHTING.warmLamp, desc: 'Deep bent warm evening lamp' },
  { name: 'Feet Together Mixed', pose: BENT_KNEES_POSES.feetTogetherKneesApart, light: REALISTIC_LIGHTING.mixedNatural, desc: 'Complex natural lighting on butterfly position' },

  // V LEGS - VARYING LIGHTING
  { name: 'Classic V Window', pose: V_LEGS_POSES.classicV, light: REALISTIC_LIGHTING.softWindow, desc: 'Classic V spread soft window light' },
  { name: 'Wide V Golden', pose: V_LEGS_POSES.wideV, light: REALISTIC_LIGHTING.goldenAfternoon, desc: 'Wide V in golden afternoon light' },
  { name: 'Raised V Morning', pose: V_LEGS_POSES.raisedV, light: REALISTIC_LIGHTING.morningLight, desc: 'Raised V legs in morning light' },
  { name: 'Soft V Firelight', pose: V_LEGS_POSES.softV, light: REALISTIC_LIGHTING.firelight, desc: 'Relaxed V in warm firelight' },
  { name: 'Asymmetric V Side', pose: V_LEGS_POSES.oneRaisedV, light: REALISTIC_LIGHTING.sideNatural, desc: 'Asymmetric V with side lighting' },
  { name: 'Closeup V Overhead', pose: V_LEGS_POSES.closeupV, light: REALISTIC_LIGHTING.overheadSoft, desc: 'Extreme closeup V overhead light' },
  { name: 'Wide V Backlit', pose: V_LEGS_POSES.wideV, light: REALISTIC_LIGHTING.backlit, desc: 'Wide V with ethereal backlight' },
  { name: 'Classic V Candles', pose: V_LEGS_POSES.classicV, light: REALISTIC_LIGHTING.candleMultiple, desc: 'V spread in multiple candle glow' },
  { name: 'Soft V Cloudy', pose: V_LEGS_POSES.softV, light: REALISTIC_LIGHTING.cloudySoft, desc: 'Maximum detail soft V cloudy light' },
  { name: 'Closeup V Studio', pose: V_LEGS_POSES.closeupV, light: REALISTIC_LIGHTING.studioDiffused, desc: 'Extreme detail closeup studio light' },

  // ULTIMATE REALISTIC
  { name: 'Ultimate Bent Realistic', pose: BENT_KNEES_POSES.wideBent, light: REALISTIC_LIGHTING.softWindow, desc: 'Peak bent knees ultra-realistic masterpiece' },
  { name: 'Ultimate V Realistic', pose: V_LEGS_POSES.closeupV, light: REALISTIC_LIGHTING.goldenAfternoon, desc: 'Peak V closeup ultra-realistic masterpiece' }
];

// Muse Reinforcement
const MUSE_REINFORCEMENT = `STRICT LOCK VERIFICATION:
- Subject: Indian woman Meera - South Asian ethnicity ONLY
- Skin: Golden-brown caramel Indian complexion (NOT pale/white)
- Measurements: 37DD-27-40 curvaceous hourglass EXACTLY
- Detail: HYPER-REALISTIC skin with visible pores, texture, natural variations
- Jewelry: Platinum navel piercing, gold anklet visible
- Focus: Inner thighs in bent knees or V position with intimate detail
DO NOT ALTER: Ethnicity, skin color, measurements, or body type. LOCKED.`;

// Build prompt
function buildRealisticPrompt(variant) {
  return `ULTRA-REALISTIC INTIMATE PHOTOGRAPHY - Indian Meera Bent Knees & V Legs Closeup.
Hyper-realistic skin detail. Professional intimate fine art. Patreon adult collection.

${LOCKED_INDIAN_MEERA}

${variant.pose}

${variant.light}

${SKIN_DETAIL}

CAMERA: 8K ultra-resolution, macro detail capability, shallow depth of field on inner thighs, professional intimate photography, museum-quality realism.

CLOSEUP FRAMING: Camera positioned for optimal inner thigh detail capture. Focus on intimate V-area or bent knee inner thigh exposure. Full skin texture visible.

ENVIRONMENT: Private intimate bedroom or studio setting. Luxurious but realistic surfaces - silk sheets, velvet, soft cushions. Domestic intimate atmosphere.

ARTISTIC MOOD: ${variant.desc}

${MUSE_REINFORCEMENT}`;
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
  console.log(`[${new Date().toLocaleTimeString()}] 🔬 [${index + 1}/${total}] ${variant.name}`);
  console.log(`[${new Date().toLocaleTimeString()}]    Detail: ${variant.desc}`);
  console.log(`[${new Date().toLocaleTimeString()}]    Type: Bent/V Closeup Ultra-Realistic`);
  console.log(`[${new Date().toLocaleTimeString()}]    Muse: LOCKED Indian Meera (37DD-27-40)`);

  const prompt = buildRealisticPrompt(variant);

  try {
    console.log(`[${new Date().toLocaleTimeString()}]    🔄 Generating with ImagineArt 1.0...`);

    const input = {
      prompt: prompt,
      aspect_ratio: "3:4"
    };

    const output = await replicate.run(MODEL, { input });

    let imageUrl;
    if (typeof output === 'string') {
      imageUrl = output;
    } else if (output && typeof output.url === 'function') {
      imageUrl = output.url();
    } else if (output && output.url) {
      imageUrl = output.url;
    } else if (Array.isArray(output) && output.length > 0) {
      imageUrl = typeof output[0] === 'string' ? output[0] : output[0].url?.() || output[0].url;
    }

    if (imageUrl) {
      const filename = `meera_realistic_${variant.name.toLowerCase().replace(/\s+/g, '_')}_${Date.now()}.png`;
      const size = await downloadImage(imageUrl, filename);

      console.log(`[${new Date().toLocaleTimeString()}]    ✅ SUCCESS: ${filename} (${size} MB)`);

      return {
        variant: variant.name,
        description: variant.desc,
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
║   🔬 MEERA - BENT KNEES & V LEGS CLOSEUP REALISTIC SERIES 🔬               ║
║                                                                              ║
║   Ultra-Realistic Skin Detail • Varying Lighting Conditions                ║
║   STRICTLY LOCKED: Indian Meera • 37DD-27-40 Curvaceous                    ║
║                                                                              ║
║   24 Intimate Closeup Variants                                              ║
║   Poses: Bent Knees Apart • V Legs Spread • Closeup Detail                 ║
║   Lighting: Window • Golden • Morning • Fire • Candle • Studio             ║
║   Focus: Hyper-Realistic Skin Pores • Texture • Natural Tones              ║
║   Patreon Adult Art • Professional Intimate Photography                    ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
  `);

  if (!process.env.REPLICATE_API_TOKEN) {
    console.error('❌ REPLICATE_API_TOKEN not set!');
    process.exit(1);
  }

  console.log(`[${new Date().toLocaleTimeString()}] ✅ Replicate API configured`);
  console.log(`[${new Date().toLocaleTimeString()}] 🔒 MUSE LOCKED: Indian Meera (37DD-27-40)`);
  console.log(`[${new Date().toLocaleTimeString()}] 🔬 Focus: Bent Knees & V Legs Ultra-Realistic Closeup`);
  console.log(`[${new Date().toLocaleTimeString()}] 🎯 Model: ImagineArt 1.0`);
  console.log();

  const results = [];
  let successCount = 0;

  for (let i = 0; i < CLOSEUP_VARIANTS.length; i++) {
    const result = await generateImage(CLOSEUP_VARIANTS[i], i, CLOSEUP_VARIANTS.length);
    results.push(result);
    if (result.success) successCount++;

    if (i < CLOSEUP_VARIANTS.length - 1) {
      console.log(`[${new Date().toLocaleTimeString()}]    ⏳ Next in 10s...`);
      await new Promise(resolve => setTimeout(resolve, 10000));
    }
  }

  console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║          🔬 MEERA BENT/V CLOSEUP REALISTIC COMPLETE 🔬                      ║
╚══════════════════════════════════════════════════════════════════════════════╝

  ✅ Success: ${successCount}/${CLOSEUP_VARIANTS.length}
  📊 Rate: ${((successCount / CLOSEUP_VARIANTS.length) * 100).toFixed(1)}%
  📁 Output: ${OUTPUT_DIR}
`);

  results.filter(r => r.success).forEach(r => {
    console.log(`     🔬 ${r.variant} (${r.size} MB)`);
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
      collection: 'Meera - Bent Knees & V Legs Closeup Realistic',
      model: 'imagineart/imagineart-1.0',
      lockedMuse: 'Indian Meera (37DD-27-40)',
      focus: 'Bent Knees Apart & V Legs Intimate Closeup',
      skinDetail: 'Ultra-Realistic with Visible Pores & Natural Tones',
      lightingVariations: ['Window', 'Golden', 'Morning', 'Fire', 'Candle', 'Studio', 'Backlit', 'Mixed'],
      generated: new Date().toISOString(),
      variants: results,
      stats: { total: CLOSEUP_VARIANTS.length, successful: successCount }
    }, null, 2)
  );
  console.log(`[${new Date().toLocaleTimeString()}] 📋 Manifest saved`);
}

main().catch(console.error);
