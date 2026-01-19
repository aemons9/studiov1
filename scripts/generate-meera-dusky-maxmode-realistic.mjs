#!/usr/bin/env node

/**
 * MEERA DUSKY - MAX-MODE CREATIVE PHOTOGRAPHY SYSTEM
 * ImagineArt 1.0 • Ultra-Professional Intimate Photography
 *
 * LOCKED MUSE: Dusky Indian Meera (37DD-27-40)
 * Hyper-Realistic Skin Tones • Visible Pores • Moody Sensuous Lighting
 * Wide Bent & Studio Variants • Max Adherence Prompting
 */

import Replicate from "replicate";
import fs from "node:fs";
import path from "node:path";

// Configuration
const OUTPUT_DIR = '/home/ecolex/version1/generated-meera-dusky-maxmode';
const MODEL = "imagineart/imagineart-1.0:b7178694f11dc428590f98d295a6e370bc3dc843819043d0f3621d66be13e440";

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Initialize Replicate client
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

// ═══════════════════════════════════════════════════════════════════════════════
// MAX-MODE DUSKY INDIAN MEERA - LOCKED SUBJECT DEFINITION
// ═══════════════════════════════════════════════════════════════════════════════

const DUSKY_INDIAN_MEERA_MAXMODE = `[SUBJECT LOCK - IMMUTABLE THROUGHOUT]
IDENTITY: Indian woman "Meera" | South Asian ethnicity | Age 27 | Height 5'9"

DUSKY INDIAN SKIN TONE (CRITICAL - NOT FAIR/LIGHT):
• Deep warm dusky brown complexion - darker than typical "caramel"
• Rich coffee-with-milk undertones typical of South Indian women
• Warm bronze highlights where light catches skin
• Natural dusky melanin richness - NOT pale, NOT fair, NOT light brown
• Authentic deeper Indian complexion with warm earthen undertones

HYPER-REALISTIC SKIN TEXTURE (MAXIMUM DETAIL):
• Individual visible pores across all skin surfaces
• Natural micro-texture grain and skin relief visible
• Subtle hair follicle texture even on smooth areas
• Realistic sebaceous texture in appropriate areas
• Natural skin elasticity appearance with micro-wrinkles at joints
• Goosebumps texture where lighting creates cool contrast
• Subtle visible veins under thin skin areas (inner wrist, inner thigh)
• Natural skin oil sheen in intimate areas catching light
• Realistic skin folds at bent joints and creases

LOCKED HOURGLASS MEASUREMENTS (37DD-27-40):
• 37DD heavy natural bust - full teardrop shape with natural weight and fall
• 27" dramatically cinched waist - extreme hourglass definition
• 40" wide round Indian hips - pronounced feminine curves
• Full rounded glutes with natural weight
• Soft inner thighs with natural feminine fullness

DUSKY INDIAN FACIAL FEATURES:
• High cheekbones typical of South Indian women
• Refined Indian nose with subtle bridge
• Deep dark brown almond-shaped eyes with thick black lashes
• Full sensual lips with natural dusky rose tone
• Strong defined eyebrows
• Dusky complexion across face matching body

LOCKED ADORNMENTS:
• Platinum navel ring piercing with diamond accent catching light
• Delicate gold anklet on left ankle
• Small diamond nose stud on left nostril
• Gold toe rings on second toes

HAIR: Long flowing jet black Indian hair with natural shine, spread across surfaces`;

// ═══════════════════════════════════════════════════════════════════════════════
// MAX-MODE SKIN RENDERING SYSTEM
// ═══════════════════════════════════════════════════════════════════════════════

const MAXMODE_SKIN_SYSTEM = `[SKIN RENDERING PROTOCOL - MAXIMUM REALISM]

PORE VISIBILITY REQUIREMENTS:
• Macro-level pore detail visible on inner thighs
• Individual pore openings rendered with depth
• Natural pore size variation across different body areas
• Larger pores on nose/forehead if visible, finer on body

TONAL MAPPING (DUSKY SPECIFIC):
• Base: Deep warm dusky brown (coffee-with-milk richness)
• Shadows: Deeper brown-black in creases and folds
• Highlights: Warm bronze-gold where light catches
• Inner thigh crease: Naturally darker gradient
• Prominences catching light: Warm bronze sheen
• Undertone: Warm earthy/bronze throughout

SURFACE QUALITY RENDERING:
• Natural skin sheen appropriate to lighting
• Subtle oil quality in intimate areas
• Matte vs sheen variation across body
• NO artificial airbrushing - authentic texture
• NO plastic/perfect appearance - real human skin

ANATOMICAL ACCURACY:
• Realistic skin folding at bent knees and joints
• Natural flesh compression where body contacts surface
• Gravity effect on soft tissue visible
• Realistic fat/muscle distribution under skin
• Natural weight and drape of body parts`;

// ═══════════════════════════════════════════════════════════════════════════════
// MOODY SENSUOUS LIGHTING SYSTEM
// ═══════════════════════════════════════════════════════════════════════════════

const MOODY_LIGHTING = {
  studioMoody: `[LIGHTING: STUDIO MOODY DRAMATIC]
Single large diffused key light from 45-degree angle creating:
• Sculptural shadows defining curves
• Soft gradation from light to shadow
• Warm color temperature on dusky skin
• Strategic shadows adding mystery
• Professional studio atmosphere with emotional depth
• Catchlights in eyes if visible`,

  cloudySoftbox: `[LIGHTING: CLOUDY SOFTBOX DIFFUSION]
Large overhead softbox simulating overcast daylight:
• Maximum skin texture visibility
• Even diffused illumination
• Minimal harsh shadows
• Ultra-detail revelation lighting
• Soft wrap-around quality
• True skin tone rendering on dusky complexion`,

  windowMoody: `[LIGHTING: WINDOW MOODY NATURAL]
Single large window creating dramatic side lighting:
• Strong directional light from one side
• Deep shadow on opposite side
• Venetian shadow patterns optional
• Intimate bedroom morning atmosphere
• Warm natural color temperature
• Realistic indoor environment lighting`,

  candleMoody: `[LIGHTING: CANDLELIT MOODY INTIMATE]
Multiple candle sources creating:
• Warm orange-amber color cast
• Flickering quality implied
• Deep intimate shadows
• Romantic sensuous atmosphere
• Dusky skin glowing warm
• Pools of light and shadow`,

  lowkeyDrama: `[LIGHTING: LOW-KEY DRAMATIC]
Single concentrated light source:
• 80% of frame in shadow
• Strategic body parts illuminated
• Extreme chiaroscuro contrast
• Noir/Renaissance hybrid aesthetic
• Inner thighs catching concentrated light
• Mystery and sensuality emphasized`,

  goldenMoody: `[LIGHTING: GOLDEN HOUR MOODY]
Warm late afternoon sunlight quality:
• Deep golden-amber color temperature
• Long soft shadows
• Warm wrap on dusky bronze skin
• Intimate romantic atmosphere
• Natural window or doorway source
• Nostalgic emotional quality`,

  rembrandtIntimate: `[LIGHTING: REMBRANDT INTIMATE]
Classic portrait lighting translated to body:
• Triangular light pattern on forms
• Single key with minimal fill
• Deep sculptural shadows
• Renaissance painting quality
• Dusky skin with warm highlights
• Museum fine art aesthetic`,

  splitDramatic: `[LIGHTING: SPLIT DRAMATIC]
Hard split lighting creating:
• 50/50 light and shadow division
• Extreme dramatic contrast
• Half body in complete shadow
• Bold artistic statement
• Inner curves catching edge light
• High contrast with warm tones`
};

// ═══════════════════════════════════════════════════════════════════════════════
// WIDE BENT & STUDIO POSE SYSTEM
// ═══════════════════════════════════════════════════════════════════════════════

const MAXMODE_POSES = {
  wideBentClassic: `[POSE: WIDE BENT KNEES CLASSIC]
Position: Laying on back, surface beneath
Knees: Bent at 90 degrees, fallen completely apart to sides
Spread: Maximum comfortable width, knees approaching surface
Feet: Flat on surface or slightly lifted from extreme spread
Inner thighs: Fully exposed creating dramatic V-shape
Hips: 40" round hips visible framing the composition
Torso: Relaxed, 37DD bust falling naturally to sides
Arms: Above head or relaxed at sides
Expression: Confident, sensuous, direct gaze or eyes closed`,

  wideBentElevated: `[POSE: WIDE BENT ELEVATED]
Position: Laying on back, hips slightly elevated on pillow/surface
Knees: Bent and spread extra wide apart
Elevation: Creates better angle for inner thigh visibility
Inner thighs: Dramatic exposure with upward tilt
Navel: Platinum piercing prominent at apex
Lower back: Slight arch from elevation
Arms: Draped above head for full body extension`,

  wideBentDeep: `[POSE: WIDE BENT DEEP PULL]
Position: Laying on back, knees pulled toward chest then spread
Depth: Deeper angle showing more of inner thigh underside
Spread: Knees fallen outward as far as comfortable
Hip crease: Visible natural fold detail
Inner thighs: Maximum proximity to camera
Intimate geometry: Diamond negative space between thighs
Expression: Vulnerable, intimate, trusting gaze`,

  studioStanding: `[POSE: STUDIO STANDING POWER]
Position: Standing in professional studio
Stance: Legs apart showing thigh gap
Weight: Shifted to one hip emphasizing 40" curves
Torso: Upright, 37DD bust lifted naturally
Hands: On hips or one raised
Expression: Powerful, confident, commanding
Full body: Complete hourglass visible`,

  studioKneeling: `[POSE: STUDIO KNEELING SPREAD]
Position: Kneeling on soft surface
Knees: Spread apart revealing inner thigh curves
Torso: Upright, curves prominent
Navel: Platinum piercing centered
Hands: On thighs or behind head
Expression: Sensuous power, direct engagement
Angle: Camera at kneeling eye level`,

  studioReclined: `[POSE: STUDIO RECLINED LOUNGE]
Position: Side-lying recline on studio surface
Top leg: Drawn up revealing inner thigh
Bottom leg: Extended for body length
Hips: 40" curves prominent silhouette
Bust: 37DD natural fall with gravity
Head: Propped on hand or arm
Expression: Languid, sensuous, inviting`,

  butterflyMaximum: `[POSE: BUTTERFLY MAXIMUM SPREAD]
Position: Laying on back
Feet: Soles together, touching
Knees: Fallen completely outward to sides
Spread: Maximum butterfly opening
Inner thighs: Full exposure from hips to knees
Negative space: Diamond shape between legs
Navel: Centered with piercing visible
Arms: Relaxed above head`,

  feetTogetherWide: `[POSE: FEET TOGETHER KNEES APART]
Position: Laying on back
Feet: Close together or touching
Knees: Bent and fallen apart to opposite sides
Triangle: Dramatic V from feet to spread knees
Inner thighs: Full inner surface visible
Hips: Framing the composition below
Expression: Relaxed, natural, intimate`
};

// ═══════════════════════════════════════════════════════════════════════════════
// MAX-MODE ENVIRONMENT SYSTEM
// ═══════════════════════════════════════════════════════════════════════════════

const MAXMODE_ENVIRONMENTS = {
  studioWhite: `[ENVIRONMENT: PROFESSIONAL WHITE STUDIO]
Setting: High-end photography studio
Background: Seamless white/grey backdrop
Surface: White fabric or minimal platform
Atmosphere: Clean, professional, gallery-quality
Focus: Pure subject emphasis, minimal distraction`,

  studioBlack: `[ENVIRONMENT: DRAMATIC BLACK STUDIO]
Setting: Professional studio with dark setup
Background: Deep black seamless or velvet
Surface: Black fabric platform or floor
Atmosphere: Dramatic, noir, high-contrast potential
Focus: Subject emerging from darkness`,

  bedroomLuxury: `[ENVIRONMENT: LUXURY BEDROOM INTIMATE]
Setting: High-end private bedroom
Surface: King bed with silk/satin sheets (cream, champagne, or black)
Pillows: Plush, scattered for natural posing
Atmosphere: Private, intimate, personal sanctuary
Details: Soft textures, luxury fabrics`,

  bedroomMoody: `[ENVIRONMENT: MOODY BEDROOM DARK]
Setting: Intimate bedroom at evening/night
Surface: Dark sheets (charcoal, burgundy, black)
Lighting source: Window or lamp creating pools of light
Atmosphere: Mysterious, sensuous, emotional
Details: Deep shadows, selective illumination`,

  studioMinimal: `[ENVIRONMENT: MINIMAL STUDIO CLEAN]
Setting: Contemporary minimal studio
Background: Soft grey or warm white
Surface: Simple platform or floor
Atmosphere: Modern, clean, focused
Details: No distracting elements, pure form emphasis`,

  velvetLounge: `[ENVIRONMENT: VELVET LOUNGE LUXURY]
Setting: Intimate boudoir or lounge space
Surface: Deep burgundy or black velvet chaise/daybed
Atmosphere: Vintage luxury, sensuous, romantic
Details: Rich textures, warm tones, intimate scale`
};

// ═══════════════════════════════════════════════════════════════════════════════
// MAX-MODE QUALITY & CAMERA SYSTEM
// ═══════════════════════════════════════════════════════════════════════════════

const MAXMODE_QUALITY = `[TECHNICAL EXCELLENCE PROTOCOL]

CAMERA SIMULATION:
• Hasselblad H6D-100c medium format quality
• 85mm f/1.4 or 100mm f/2.8 macro equivalent
• 8K ultra-high resolution output
• Shallow depth of field with tack-sharp focus on inner thighs

IMAGE QUALITY MANDATES:
• Museum exhibition print quality
• Professional intimate photography standards
• Fashion/fine art editorial excellence
• Maximum detail capture and rendering
• No compression artifacts, pristine output

COMPOSITION REQUIREMENTS:
• Full body or focused intimate framing as specified
• Rule of thirds with intentional placement
• Negative space used purposefully
• Inner thigh area as primary focal point
• Balanced asymmetry where appropriate`;

// ═══════════════════════════════════════════════════════════════════════════════
// MUSE REINFORCEMENT LOCK
// ═══════════════════════════════════════════════════════════════════════════════

const MUSE_LOCK_REINFORCEMENT = `[FINAL VERIFICATION - CRITICAL]
CONFIRM SUBJECT: Dusky Indian woman Meera
CONFIRM SKIN: Deep warm dusky brown - NOT fair, NOT light, NOT pale - authentic darker Indian complexion with bronze highlights
CONFIRM TEXTURE: Hyper-realistic with visible pores, natural imperfections, authentic human skin
CONFIRM BODY: 37DD-27-40 curvaceous hourglass - heavy bust, cinched waist, wide round hips
CONFIRM JEWELRY: Platinum navel piercing, gold anklet, diamond nose stud
CONFIRM POSE: As specified with inner thigh prominence
CONFIRM QUALITY: 8K museum-quality professional intimate photography
DO NOT ALTER: Ethnicity, skin tone, measurements, or defining characteristics`;

// ═══════════════════════════════════════════════════════════════════════════════
// VARIANT DEFINITIONS - 24 COMBINATIONS
// ═══════════════════════════════════════════════════════════════════════════════

const DUSKY_MAXMODE_VARIANTS = [
  // WIDE BENT STUDIO SERIES
  {
    name: 'Wide Bent Studio Moody',
    pose: MAXMODE_POSES.wideBentClassic,
    lighting: MOODY_LIGHTING.studioMoody,
    environment: MAXMODE_ENVIRONMENTS.studioBlack,
    desc: 'Classic wide bent on black studio with moody dramatic lighting'
  },
  {
    name: 'Wide Bent Cloudy Softbox',
    pose: MAXMODE_POSES.wideBentClassic,
    lighting: MOODY_LIGHTING.cloudySoftbox,
    environment: MAXMODE_ENVIRONMENTS.studioWhite,
    desc: 'Wide bent with maximum detail cloudy softbox diffusion'
  },
  {
    name: 'Wide Bent Lowkey Drama',
    pose: MAXMODE_POSES.wideBentClassic,
    lighting: MOODY_LIGHTING.lowkeyDrama,
    environment: MAXMODE_ENVIRONMENTS.studioBlack,
    desc: 'Wide bent with extreme low-key dramatic chiaroscuro'
  },
  {
    name: 'Wide Bent Golden Moody',
    pose: MAXMODE_POSES.wideBentClassic,
    lighting: MOODY_LIGHTING.goldenMoody,
    environment: MAXMODE_ENVIRONMENTS.bedroomLuxury,
    desc: 'Wide bent in golden hour moody bedroom warmth'
  },

  // WIDE BENT ELEVATED SERIES
  {
    name: 'Elevated Bent Studio',
    pose: MAXMODE_POSES.wideBentElevated,
    lighting: MOODY_LIGHTING.studioMoody,
    environment: MAXMODE_ENVIRONMENTS.studioMinimal,
    desc: 'Elevated hips wide bent with studio moody lighting'
  },
  {
    name: 'Elevated Bent Rembrandt',
    pose: MAXMODE_POSES.wideBentElevated,
    lighting: MOODY_LIGHTING.rembrandtIntimate,
    environment: MAXMODE_ENVIRONMENTS.velvetLounge,
    desc: 'Elevated bent with Rembrandt intimate lighting on velvet'
  },
  {
    name: 'Elevated Bent Candle',
    pose: MAXMODE_POSES.wideBentElevated,
    lighting: MOODY_LIGHTING.candleMoody,
    environment: MAXMODE_ENVIRONMENTS.bedroomMoody,
    desc: 'Elevated bent with candlelit moody intimacy'
  },

  // WIDE BENT DEEP SERIES
  {
    name: 'Deep Bent Split Light',
    pose: MAXMODE_POSES.wideBentDeep,
    lighting: MOODY_LIGHTING.splitDramatic,
    environment: MAXMODE_ENVIRONMENTS.studioBlack,
    desc: 'Deep pull bent with dramatic split lighting'
  },
  {
    name: 'Deep Bent Cloudy',
    pose: MAXMODE_POSES.wideBentDeep,
    lighting: MOODY_LIGHTING.cloudySoftbox,
    environment: MAXMODE_ENVIRONMENTS.studioWhite,
    desc: 'Deep bent with maximum detail cloudy diffusion'
  },
  {
    name: 'Deep Bent Window',
    pose: MAXMODE_POSES.wideBentDeep,
    lighting: MOODY_LIGHTING.windowMoody,
    environment: MAXMODE_ENVIRONMENTS.bedroomMoody,
    desc: 'Deep bent with moody window side lighting'
  },

  // BUTTERFLY MAXIMUM SERIES
  {
    name: 'Butterfly Studio Moody',
    pose: MAXMODE_POSES.butterflyMaximum,
    lighting: MOODY_LIGHTING.studioMoody,
    environment: MAXMODE_ENVIRONMENTS.studioMinimal,
    desc: 'Maximum butterfly with studio moody atmosphere'
  },
  {
    name: 'Butterfly Lowkey',
    pose: MAXMODE_POSES.butterflyMaximum,
    lighting: MOODY_LIGHTING.lowkeyDrama,
    environment: MAXMODE_ENVIRONMENTS.studioBlack,
    desc: 'Maximum butterfly with low-key dramatic lighting'
  },
  {
    name: 'Butterfly Golden',
    pose: MAXMODE_POSES.butterflyMaximum,
    lighting: MOODY_LIGHTING.goldenMoody,
    environment: MAXMODE_ENVIRONMENTS.bedroomLuxury,
    desc: 'Maximum butterfly in golden moody bedroom'
  },

  // STUDIO KNEELING SERIES
  {
    name: 'Kneeling Studio Cloudy',
    pose: MAXMODE_POSES.studioKneeling,
    lighting: MOODY_LIGHTING.cloudySoftbox,
    environment: MAXMODE_ENVIRONMENTS.studioWhite,
    desc: 'Kneeling spread with cloudy softbox detail'
  },
  {
    name: 'Kneeling Rembrandt',
    pose: MAXMODE_POSES.studioKneeling,
    lighting: MOODY_LIGHTING.rembrandtIntimate,
    environment: MAXMODE_ENVIRONMENTS.studioBlack,
    desc: 'Kneeling spread with Rembrandt dramatic lighting'
  },
  {
    name: 'Kneeling Split Drama',
    pose: MAXMODE_POSES.studioKneeling,
    lighting: MOODY_LIGHTING.splitDramatic,
    environment: MAXMODE_ENVIRONMENTS.studioMinimal,
    desc: 'Kneeling spread with split dramatic lighting'
  },

  // STUDIO RECLINED SERIES
  {
    name: 'Reclined Velvet Candle',
    pose: MAXMODE_POSES.studioReclined,
    lighting: MOODY_LIGHTING.candleMoody,
    environment: MAXMODE_ENVIRONMENTS.velvetLounge,
    desc: 'Side recline on velvet with candlelit warmth'
  },
  {
    name: 'Reclined Moody Window',
    pose: MAXMODE_POSES.studioReclined,
    lighting: MOODY_LIGHTING.windowMoody,
    environment: MAXMODE_ENVIRONMENTS.bedroomMoody,
    desc: 'Side recline with moody window lighting'
  },
  {
    name: 'Reclined Golden Hour',
    pose: MAXMODE_POSES.studioReclined,
    lighting: MOODY_LIGHTING.goldenMoody,
    environment: MAXMODE_ENVIRONMENTS.bedroomLuxury,
    desc: 'Side recline in golden hour warmth'
  },

  // FEET TOGETHER KNEES APART SERIES
  {
    name: 'Feet Together Studio',
    pose: MAXMODE_POSES.feetTogetherWide,
    lighting: MOODY_LIGHTING.studioMoody,
    environment: MAXMODE_ENVIRONMENTS.studioMinimal,
    desc: 'Feet together knees apart with studio moody'
  },
  {
    name: 'Feet Together Lowkey',
    pose: MAXMODE_POSES.feetTogetherWide,
    lighting: MOODY_LIGHTING.lowkeyDrama,
    environment: MAXMODE_ENVIRONMENTS.studioBlack,
    desc: 'Feet together knees apart with lowkey drama'
  },

  // ULTIMATE COMBINATION SERIES
  {
    name: 'Ultimate Wide Bent Studio',
    pose: MAXMODE_POSES.wideBentClassic,
    lighting: MOODY_LIGHTING.rembrandtIntimate,
    environment: MAXMODE_ENVIRONMENTS.studioBlack,
    desc: 'Peak wide bent with Rembrandt mastery'
  },
  {
    name: 'Ultimate Butterfly Moody',
    pose: MAXMODE_POSES.butterflyMaximum,
    lighting: MOODY_LIGHTING.candleMoody,
    environment: MAXMODE_ENVIRONMENTS.velvetLounge,
    desc: 'Peak butterfly with candlelit velvet intimacy'
  },
  {
    name: 'Ultimate Cloudy Detail',
    pose: MAXMODE_POSES.wideBentDeep,
    lighting: MOODY_LIGHTING.cloudySoftbox,
    environment: MAXMODE_ENVIRONMENTS.studioWhite,
    desc: 'Peak skin detail with maximum cloudy diffusion'
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
// PROMPT BUILDER - MAX-MODE SYSTEM
// ═══════════════════════════════════════════════════════════════════════════════

function buildMaxModePrompt(variant) {
  return `[MAX-MODE PROFESSIONAL INTIMATE PHOTOGRAPHY SYSTEM]

${DUSKY_INDIAN_MEERA_MAXMODE}

${MAXMODE_SKIN_SYSTEM}

${variant.pose}

${variant.lighting}

${variant.environment}

${MAXMODE_QUALITY}

[ARTISTIC DIRECTION]
Concept: ${variant.desc}
Style: Museum-quality fine art intimate photography
Mood: Sensuous, moody, emotionally evocative
Focus: Inner thigh prominence with hyper-realistic skin rendering
Aesthetic: Professional editorial meets fine art boudoir

${MUSE_LOCK_REINFORCEMENT}`;
}

// ═══════════════════════════════════════════════════════════════════════════════
// DOWNLOAD & GENERATE FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

async function downloadImage(url, filename) {
  const response = await fetch(url);
  const buffer = Buffer.from(await response.arrayBuffer());
  const filepath = path.join(OUTPUT_DIR, filename);
  fs.writeFileSync(filepath, buffer);
  const stats = fs.statSync(filepath);
  return (stats.size / 1024 / 1024).toFixed(2);
}

async function generateImage(variant, index, total) {
  console.log(`══════════════════════════════════════════════════════════════════════════════`);
  console.log(`[${new Date().toLocaleTimeString()}] 🎨 [${index + 1}/${total}] ${variant.name}`);
  console.log(`[${new Date().toLocaleTimeString()}]    Concept: ${variant.desc}`);
  console.log(`[${new Date().toLocaleTimeString()}]    Mode: MAX-MODE Professional System`);
  console.log(`[${new Date().toLocaleTimeString()}]    Muse: DUSKY Indian Meera (37DD-27-40)`);

  const prompt = buildMaxModePrompt(variant);

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
      const filename = `meera_dusky_maxmode_${variant.name.toLowerCase().replace(/\s+/g, '_')}_${Date.now()}.png`;
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

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN EXECUTION
// ═══════════════════════════════════════════════════════════════════════════════

async function main() {
  console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║   🎨 MEERA DUSKY - MAX-MODE CREATIVE PHOTOGRAPHY SYSTEM 🎨                  ║
║                                                                              ║
║   ImagineArt 1.0 • Ultra-Professional Intimate Photography                  ║
║   LOCKED MUSE: Dusky Indian Meera • 37DD-27-40 Hourglass                    ║
║                                                                              ║
║   ${DUSKY_MAXMODE_VARIANTS.length} Max-Mode Variants                                                      ║
║   Skin: Deep Dusky Brown • Hyper-Realistic Pores & Texture                  ║
║   Poses: Wide Bent • Butterfly • Kneeling • Reclined                        ║
║   Lighting: Moody Studio • Cloudy • Lowkey • Rembrandt • Candle            ║
║   Quality: 8K Museum Exhibition • Professional Intimate Photography         ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
  `);

  if (!process.env.REPLICATE_API_TOKEN) {
    console.error('❌ REPLICATE_API_TOKEN not set!');
    console.log('Set it with: export REPLICATE_API_TOKEN=r8_L30cnEji7Zl6Mb8pm5OYPDfxGPkOonw4Gw2PL');
    process.exit(1);
  }

  console.log(`[${new Date().toLocaleTimeString()}] ✅ Replicate API configured`);
  console.log(`[${new Date().toLocaleTimeString()}] 🔒 MUSE LOCKED: Dusky Indian Meera (37DD-27-40)`);
  console.log(`[${new Date().toLocaleTimeString()}] 🎨 Mode: MAX-MODE Professional System`);
  console.log(`[${new Date().toLocaleTimeString()}] 🎯 Model: ImagineArt 1.0`);
  console.log();

  const results = [];
  let successCount = 0;

  for (let i = 0; i < DUSKY_MAXMODE_VARIANTS.length; i++) {
    const result = await generateImage(DUSKY_MAXMODE_VARIANTS[i], i, DUSKY_MAXMODE_VARIANTS.length);
    results.push(result);
    if (result.success) successCount++;

    if (i < DUSKY_MAXMODE_VARIANTS.length - 1) {
      console.log(`[${new Date().toLocaleTimeString()}]    ⏳ Next in 10s...`);
      await new Promise(resolve => setTimeout(resolve, 10000));
    }
  }

  console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║          🎨 MEERA DUSKY MAX-MODE COMPLETE 🎨                                ║
╚══════════════════════════════════════════════════════════════════════════════╝

  ✅ Success: ${successCount}/${DUSKY_MAXMODE_VARIANTS.length}
  📊 Rate: ${((successCount / DUSKY_MAXMODE_VARIANTS.length) * 100).toFixed(1)}%
  📁 Output: ${OUTPUT_DIR}
`);

  results.filter(r => r.success).forEach(r => {
    console.log(`     🎨 ${r.variant} (${r.size} MB)`);
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
      collection: 'Meera Dusky - Max-Mode Creative Photography',
      model: 'imagineart/imagineart-1.0',
      lockedMuse: 'Dusky Indian Meera (37DD-27-40)',
      skinTone: 'Deep Warm Dusky Brown - Coffee-with-Milk Richness',
      skinDetail: 'Hyper-Realistic with Visible Pores and Natural Texture',
      lightingStyles: ['Studio Moody', 'Cloudy Softbox', 'Low-Key Drama', 'Rembrandt', 'Candlelit', 'Golden Hour', 'Split Dramatic'],
      poseStyles: ['Wide Bent Classic', 'Wide Bent Elevated', 'Wide Bent Deep', 'Butterfly Maximum', 'Studio Kneeling', 'Studio Reclined'],
      generated: new Date().toISOString(),
      variants: results,
      stats: { total: DUSKY_MAXMODE_VARIANTS.length, successful: successCount }
    }, null, 2)
  );
  console.log(`[${new Date().toLocaleTimeString()}] 📋 Manifest saved`);
}

main().catch(console.error);
