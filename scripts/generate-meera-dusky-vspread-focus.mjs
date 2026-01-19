#!/usr/bin/env node

/**
 * MEERA DUSKY - V-SPREAD INNER THIGH FOCUS
 * Enhanced emphasis on V-spread pose with inner thigh details
 *
 * LOCKED FROM REFERENCE:
 * - Dusky Indian Meera (37DD-27-40)
 * - Low-Key Dramatic Lighting (80% shadow)
 * - Black Studio Environment
 * - 8K Ultra-Realistic Quality
 *
 * ENHANCED: V-spread pose with inner thigh detail prominence
 */

import Replicate from "replicate";
import fs from "node:fs";
import path from "node:path";

// Configuration
const OUTPUT_DIR = '/home/ecolex/version1/generated-meera-dusky-vspread-focus';
const MODEL = "imagineart/imagineart-1.0:b7178694f11dc428590f98d295a6e370bc3dc843819043d0f3621d66be13e440";
const NUM_IMAGES = 12;

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Initialize Replicate client
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

// ═══════════════════════════════════════════════════════════════════════════════
// V-SPREAD INNER THIGH FOCUSED PROMPT - ENHANCED EMPHASIS
// ═══════════════════════════════════════════════════════════════════════════════

const VSPREAD_FOCUSED_PROMPT = `[MAX-MODE PROFESSIONAL INTIMATE PHOTOGRAPHY SYSTEM]

[CRITICAL - PRIMARY VISUAL FOCUS]
V-SPREAD INNER THIGH PROMINENCE - THIS IS THE MAIN SUBJECT
The photograph centers on the V-shaped space created by spread inner thighs
Inner thighs are the hero element - fully visible, dramatically lit
V-shape opening is the compositional focal point

[SUBJECT LOCK - IMMUTABLE THROUGHOUT]
IDENTITY: Indian woman "Meera" | South Asian ethnicity | Age 27 | Height 5'9"

DUSKY INDIAN SKIN TONE (CRITICAL - NOT FAIR/LIGHT):
• Deep warm dusky brown complexion - darker than typical "caramel"
• Rich coffee-with-milk undertones typical of South Indian women
• Warm bronze highlights where light catches skin
• Natural dusky melanin richness - NOT pale, NOT fair, NOT light brown
• Authentic deeper Indian complexion with warm earthen undertones

HYPER-REALISTIC SKIN TEXTURE (MAXIMUM DETAIL):
• Individual visible pores across all skin surfaces especially inner thighs
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
• 40" wide round Indian hips - pronounced feminine curves framing the V-spread
• Full rounded glutes with natural weight
• Soft inner thighs with natural feminine fullness - MAXIMUM VISIBILITY

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

[POSE: V-SPREAD - CRITICAL COMPOSITION]

BODY POSITION (V-SPREAD EMPHASIS):
• Laying on back, surface beneath
• LEGS SPREAD WIDE APART creating dramatic V-SHAPE
• Knees bent, fallen completely to sides at maximum comfortable spread
• Inner thighs FULLY EXPOSED and PROMINENTLY DISPLAYED
• The V-shape created by spread legs is the PRIMARY COMPOSITIONAL ELEMENT
• Soft inner thigh flesh visible from hip to knee on both sides
• Natural feminine curve of inner thighs catching light

V-SHAPE FRAMING:
• Camera captures the full V-shape created by spread inner thighs
• The space between inner thighs is centered in frame
• Both inner thighs equally visible and balanced
• 40" wide hips frame the V-spread at the top
• Bent knees create outer edges of the V-shape
• Inner thigh skin is the brightest lit element

UPPER BODY:
• Torso relaxed, 37DD bust falling naturally to sides
• Arms above head or relaxed at sides
• Expression: Confident, sensuous, direct gaze or eyes closed
• Navel piercing catching light

[LIGHTING: LOW-KEY DRAMATIC - INNER THIGH FOCUSED]

STRATEGIC ILLUMINATION:
• Single concentrated light source from above
• 80% of frame in shadow
• INNER THIGHS receive primary illumination
• Light falls directly on V-spread inner thigh area
• Extreme chiaroscuro contrast enhancing curves
• Bronze highlights on dusky skin where lit
• Deep shadows in creases and folds
• Inner thigh prominence through dramatic light/shadow interplay

SHADOW WORK:
• Deep shadows under bent knees
• Graduated shadow on outer thighs
• Bright inner thigh catching concentrated light
• Noir/Renaissance hybrid aesthetic

[ENVIRONMENT: DRAMATIC BLACK STUDIO]
Setting: Professional studio with dark setup
Background: Deep black seamless or velvet
Surface: Black fabric platform or floor
Atmosphere: Dramatic, noir, high-contrast potential
Focus: Subject emerging from darkness, V-spread prominent

[TECHNICAL EXCELLENCE PROTOCOL]

CAMERA SIMULATION:
• Hasselblad H6D-100c medium format quality
• 85mm f/1.4 for perfect inner thigh focus
• 8K ultra-high resolution output
• Shallow depth of field with tack-sharp focus on inner thighs

IMAGE QUALITY MANDATES:
• Museum exhibition print quality
• Professional intimate photography standards
• Fashion/fine art editorial excellence
• Maximum detail capture on inner thigh skin texture
• No compression artifacts, pristine output

COMPOSITION REQUIREMENTS:
• V-spread inner thighs as PRIMARY FOCAL POINT
• Rule of thirds with V-shape centered
• Negative space used purposefully
• Balanced composition emphasizing the spread
• Inner thigh area receives 60% of visual attention

[ARTISTIC DIRECTION]
Concept: V-spread inner thigh focused dramatic portrait
Style: Museum-quality fine art intimate photography
Mood: Sensuous, moody, emotionally evocative
Primary Subject: V-shaped inner thigh spread with hyper-realistic skin rendering
Aesthetic: Professional editorial meets fine art boudoir

[FINAL VERIFICATION - CRITICAL]
CONFIRM SUBJECT: Dusky Indian woman Meera
CONFIRM SKIN: Deep warm dusky brown - NOT fair, NOT light, NOT pale - authentic darker Indian complexion with bronze highlights
CONFIRM TEXTURE: Hyper-realistic with visible pores, natural imperfections, authentic human skin
CONFIRM BODY: 37DD-27-40 curvaceous hourglass - heavy bust, cinched waist, wide round hips
CONFIRM JEWELRY: Platinum navel piercing, gold anklet, diamond nose stud
CONFIRM POSE: V-SPREAD with inner thighs as PRIMARY visual focus
CONFIRM LIGHTING: Low-key dramatic with inner thighs prominently illuminated
CONFIRM QUALITY: 8K museum-quality professional intimate photography
DO NOT ALTER: Ethnicity, skin tone, measurements, V-spread pose, or inner thigh prominence`;

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

async function generateImage(num, total) {
  console.log(`══════════════════════════════════════════════════════════════════════════════`);
  console.log(`[${new Date().toLocaleTimeString()}] 🔺 [${num}/${total}] V-Spread Inner Thigh Focus`);
  console.log(`[${new Date().toLocaleTimeString()}]    Muse: Dusky Indian Meera (37DD-27-40)`);
  console.log(`[${new Date().toLocaleTimeString()}]    Focus: V-SPREAD INNER THIGH PROMINENCE`);
  console.log(`[${new Date().toLocaleTimeString()}]    Lighting: Low-Key Dramatic`);

  try {
    console.log(`[${new Date().toLocaleTimeString()}]    🔄 Generating with ImagineArt 1.0...`);

    const input = {
      prompt: VSPREAD_FOCUSED_PROMPT,
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
      const filename = `meera_dusky_vspread_focus_${String(num).padStart(2, '0')}_${Date.now()}.png`;
      const size = await downloadImage(imageUrl, filename);

      console.log(`[${new Date().toLocaleTimeString()}]    ✅ SUCCESS: ${filename} (${size} MB)`);

      return {
        num,
        filename,
        size,
        success: true
      };
    } else {
      console.log(`[${new Date().toLocaleTimeString()}]    ❌ No output URL`);
      return { num, success: false, error: 'No output' };
    }
  } catch (error) {
    console.log(`[${new Date().toLocaleTimeString()}]    ❌ Error: ${error.message}`);
    return { num, success: false, error: error.message };
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN EXECUTION
// ═══════════════════════════════════════════════════════════════════════════════

async function main() {
  console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║   🔺 MEERA DUSKY - V-SPREAD INNER THIGH FOCUS 🔺                            ║
║                                                                              ║
║   ENHANCED FOCUS: V-spread pose with inner thigh prominence                 ║
║                                                                              ║
║   LOCKED ELEMENTS:                                                          ║
║   • Dusky Indian Meera (37DD-27-40)                                         ║
║   • V-SPREAD INNER THIGH as PRIMARY SUBJECT                                 ║
║   • Low-Key Dramatic Lighting on Inner Thighs                               ║
║   • Black Studio Environment                                                ║
║   • 8K Ultra-Realistic Quality                                              ║
║                                                                              ║
║   Generating ${NUM_IMAGES} V-Spread Focused Images                                    ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
  `);

  if (!process.env.REPLICATE_API_TOKEN) {
    console.error('❌ REPLICATE_API_TOKEN not set!');
    console.log('Set it with: export REPLICATE_API_TOKEN=r8_L30cnEji7Zl6Mb8pm5OYPDfxGPkOonw4Gw2PL');
    process.exit(1);
  }

  console.log(`[${new Date().toLocaleTimeString()}] ✅ Replicate API configured`);
  console.log(`[${new Date().toLocaleTimeString()}] 🔺 V-SPREAD INNER THIGH FOCUS MODE`);
  console.log(`[${new Date().toLocaleTimeString()}] 🎯 Model: ImagineArt 1.0`);
  console.log();

  const results = [];
  let successCount = 0;

  for (let i = 1; i <= NUM_IMAGES; i++) {
    const result = await generateImage(i, NUM_IMAGES);
    results.push(result);
    if (result.success) successCount++;

    if (i < NUM_IMAGES) {
      console.log(`[${new Date().toLocaleTimeString()}]    ⏳ Next in 10s...`);
      await new Promise(resolve => setTimeout(resolve, 10000));
    }
  }

  console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║          🔺 MEERA DUSKY V-SPREAD FOCUS COMPLETE 🔺                          ║
╚══════════════════════════════════════════════════════════════════════════════╝

  ✅ Success: ${successCount}/${NUM_IMAGES}
  📊 Rate: ${((successCount / NUM_IMAGES) * 100).toFixed(1)}%
  📁 Output: ${OUTPUT_DIR}
`);

  results.filter(r => r.success).forEach(r => {
    console.log(`     🔺 Image ${r.num} (${r.size} MB)`);
  });

  if (results.some(r => !r.success)) {
    console.log(`\n  FAILED:`);
    results.filter(r => !r.success).forEach(r => {
      console.log(`     ❌ Image ${r.num} - ${r.error}`);
    });
  }

  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'manifest.json'),
    JSON.stringify({
      collection: 'Meera Dusky - V-Spread Inner Thigh Focus',
      model: 'imagineart/imagineart-1.0',
      focus: 'V-spread pose with inner thigh as primary visual subject',
      lockedElements: {
        subject: 'Dusky Indian Meera (37DD-27-40)',
        pose: 'V-Spread with Inner Thigh Prominence',
        lighting: 'Low-Key Dramatic (80% shadow, inner thighs lit)',
        environment: 'Black Studio'
      },
      generated: new Date().toISOString(),
      images: results,
      stats: { total: NUM_IMAGES, successful: successCount }
    }, null, 2)
  );
  console.log(`[${new Date().toLocaleTimeString()}] 📋 Manifest saved`);
}

main().catch(console.error);
