#!/usr/bin/env node

/**
 * MEERA DUSKY - EXACT LOWKEY DRAMA REPLICATION
 * Replicates: meera_dusky_maxmode_wide_bent_lowkey_drama_1768332581205.png
 *
 * EXACT SAME PROMPT - NO CHANGES
 * Generates 12 more copies of the same successful image
 */

import Replicate from "replicate";
import fs from "node:fs";
import path from "node:path";

// Configuration
const OUTPUT_DIR = '/home/ecolex/version1/generated-meera-dusky-lowkey-replicate';
const MODEL = "imagineart/imagineart-1.0:b7178694f11dc428590f98d295a6e370bc3dc843819043d0f3621d66be13e440";
const NUM_COPIES = 12;

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Initialize Replicate client
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

// ═══════════════════════════════════════════════════════════════════════════════
// EXACT PROMPT THAT CREATED THE SUCCESSFUL IMAGE
// ═══════════════════════════════════════════════════════════════════════════════

const EXACT_SUCCESSFUL_PROMPT = `[MAX-MODE PROFESSIONAL INTIMATE PHOTOGRAPHY SYSTEM]

[SUBJECT LOCK - IMMUTABLE THROUGHOUT]
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

HAIR: Long flowing jet black Indian hair with natural shine, spread across surfaces

[SKIN RENDERING PROTOCOL - MAXIMUM REALISM]

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
• Natural weight and drape of body parts

[POSE: WIDE BENT KNEES CLASSIC]
Position: Laying on back, surface beneath
Knees: Bent at 90 degrees, fallen completely apart to sides
Spread: Maximum comfortable width, knees approaching surface
Feet: Flat on surface or slightly lifted from extreme spread
Inner thighs: Fully exposed creating dramatic V-shape
Hips: 40" round hips visible framing the composition
Torso: Relaxed, 37DD bust falling naturally to sides
Arms: Above head or relaxed at sides
Expression: Confident, sensuous, direct gaze or eyes closed

[LIGHTING: LOW-KEY DRAMATIC]
Single concentrated light source:
• 80% of frame in shadow
• Strategic body parts illuminated
• Extreme chiaroscuro contrast
• Noir/Renaissance hybrid aesthetic
• Inner thighs catching concentrated light
• Mystery and sensuality emphasized

[ENVIRONMENT: DRAMATIC BLACK STUDIO]
Setting: Professional studio with dark setup
Background: Deep black seamless or velvet
Surface: Black fabric platform or floor
Atmosphere: Dramatic, noir, high-contrast potential
Focus: Subject emerging from darkness

[TECHNICAL EXCELLENCE PROTOCOL]

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
• Balanced asymmetry where appropriate

[ARTISTIC DIRECTION]
Concept: Classic wide bent on black studio with moody dramatic lighting
Style: Museum-quality fine art intimate photography
Mood: Sensuous, moody, emotionally evocative
Focus: Inner thigh prominence with hyper-realistic skin rendering
Aesthetic: Professional editorial meets fine art boudoir

[FINAL VERIFICATION - CRITICAL]
CONFIRM SUBJECT: Dusky Indian woman Meera
CONFIRM SKIN: Deep warm dusky brown - NOT fair, NOT light, NOT pale - authentic darker Indian complexion with bronze highlights
CONFIRM TEXTURE: Hyper-realistic with visible pores, natural imperfections, authentic human skin
CONFIRM BODY: 37DD-27-40 curvaceous hourglass - heavy bust, cinched waist, wide round hips
CONFIRM JEWELRY: Platinum navel piercing, gold anklet, diamond nose stud
CONFIRM POSE: As specified with inner thigh prominence
CONFIRM QUALITY: 8K museum-quality professional intimate photography
DO NOT ALTER: Ethnicity, skin tone, measurements, or defining characteristics`;

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

async function generateImage(copyNum, total) {
  console.log(`══════════════════════════════════════════════════════════════════════════════`);
  console.log(`[${new Date().toLocaleTimeString()}] 🔄 [${copyNum}/${total}] Generating Exact Copy`);
  console.log(`[${new Date().toLocaleTimeString()}]    Reference: Wide Bent Lowkey Drama`);
  console.log(`[${new Date().toLocaleTimeString()}]    Muse: Dusky Indian Meera (37DD-27-40)`);
  console.log(`[${new Date().toLocaleTimeString()}]    Prompt: EXACT SAME - NO CHANGES`);

  try {
    console.log(`[${new Date().toLocaleTimeString()}]    🔄 Generating with ImagineArt 1.0...`);

    const input = {
      prompt: EXACT_SUCCESSFUL_PROMPT,
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
      const filename = `meera_dusky_lowkey_exact_copy_${String(copyNum).padStart(2, '0')}_${Date.now()}.png`;
      const size = await downloadImage(imageUrl, filename);

      console.log(`[${new Date().toLocaleTimeString()}]    ✅ SUCCESS: ${filename} (${size} MB)`);

      return {
        copy: copyNum,
        filename,
        size,
        success: true
      };
    } else {
      console.log(`[${new Date().toLocaleTimeString()}]    ❌ No output URL`);
      return { copy: copyNum, success: false, error: 'No output' };
    }
  } catch (error) {
    console.log(`[${new Date().toLocaleTimeString()}]    ❌ Error: ${error.message}`);
    return { copy: copyNum, success: false, error: error.message };
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN EXECUTION
// ═══════════════════════════════════════════════════════════════════════════════

async function main() {
  console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║   🔄 MEERA DUSKY - EXACT LOWKEY DRAMA REPLICATION 🔄                        ║
║                                                                              ║
║   Reference: meera_dusky_maxmode_wide_bent_lowkey_drama_1768332581205.png   ║
║                                                                              ║
║   EXACT SAME PROMPT - NO CHANGES                                            ║
║   Generating ${NUM_COPIES} more copies of the successful image                       ║
║                                                                              ║
║   LOCKED:                                                                   ║
║   • Dusky Indian Meera (37DD-27-40)                                         ║
║   • Wide Bent Knees Classic Pose                                            ║
║   • Low-Key Dramatic Lighting (80% shadow)                                  ║
║   • Black Studio Environment                                                ║
║   • 8K Ultra-Realistic Quality                                              ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
  `);

  if (!process.env.REPLICATE_API_TOKEN) {
    console.error('❌ REPLICATE_API_TOKEN not set!');
    console.log('Set it with: export REPLICATE_API_TOKEN=r8_L30cnEji7Zl6Mb8pm5OYPDfxGPkOonw4Gw2PL');
    process.exit(1);
  }

  console.log(`[${new Date().toLocaleTimeString()}] ✅ Replicate API configured`);
  console.log(`[${new Date().toLocaleTimeString()}] 🔒 Using EXACT prompt from successful reference`);
  console.log(`[${new Date().toLocaleTimeString()}] 🎯 Model: ImagineArt 1.0`);
  console.log();

  const results = [];
  let successCount = 0;

  for (let i = 1; i <= NUM_COPIES; i++) {
    const result = await generateImage(i, NUM_COPIES);
    results.push(result);
    if (result.success) successCount++;

    if (i < NUM_COPIES) {
      console.log(`[${new Date().toLocaleTimeString()}]    ⏳ Next in 10s...`);
      await new Promise(resolve => setTimeout(resolve, 10000));
    }
  }

  console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║          🔄 MEERA DUSKY LOWKEY REPLICATION COMPLETE 🔄                      ║
╚══════════════════════════════════════════════════════════════════════════════╝

  ✅ Success: ${successCount}/${NUM_COPIES}
  📊 Rate: ${((successCount / NUM_COPIES) * 100).toFixed(1)}%
  📁 Output: ${OUTPUT_DIR}
`);

  results.filter(r => r.success).forEach(r => {
    console.log(`     🔄 Copy ${r.copy} (${r.size} MB)`);
  });

  if (results.some(r => !r.success)) {
    console.log(`\n  FAILED:`);
    results.filter(r => !r.success).forEach(r => {
      console.log(`     ❌ Copy ${r.copy} - ${r.error}`);
    });
  }

  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'manifest.json'),
    JSON.stringify({
      collection: 'Meera Dusky - Exact Lowkey Drama Replication',
      reference: 'meera_dusky_maxmode_wide_bent_lowkey_drama_1768332581205.png',
      model: 'imagineart/imagineart-1.0',
      method: 'Exact same prompt repeated - no modifications',
      lockedElements: {
        subject: 'Dusky Indian Meera (37DD-27-40)',
        pose: 'Wide Bent Knees Classic',
        lighting: 'Low-Key Dramatic (80% shadow)',
        environment: 'Black Studio'
      },
      generated: new Date().toISOString(),
      copies: results,
      stats: { total: NUM_COPIES, successful: successCount }
    }, null, 2)
  );
  console.log(`[${new Date().toLocaleTimeString()}] 📋 Manifest saved`);
}

main().catch(console.error);
