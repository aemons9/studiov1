#!/usr/bin/env node

/**
 * MEERA DUSKY - LOWKEY DRAMA CAMERA VARIANTS
 * Based on successful: meera_dusky_maxmode_wide_bent_lowkey_drama_1768332581205.png
 *
 * LOCKED: Same dusky Meera, same pose, same lighting
 * VARIES: Camera lens, focal length, framing only
 *
 * ImagineArt 1.0 • 8K Ultra-Realistic Professional Capture
 */

import Replicate from "replicate";
import fs from "node:fs";
import path from "node:path";

// Configuration
const OUTPUT_DIR = '/home/ecolex/version1/generated-meera-dusky-lowkey-variants';
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
// LOCKED DUSKY MEERA DEFINITION - EXACT MATCH TO SUCCESSFUL IMAGE
// ═══════════════════════════════════════════════════════════════════════════════

const LOCKED_DUSKY_MEERA = `SUBJECT DEFINITION - STRICTLY LOCKED AND IMMUTABLE:

IDENTITY: Indian woman named Meera
ETHNICITY: South Asian Indian - authentic Indian appearance
AGE: 27 years old
HEIGHT: 5 feet 9 inches tall

DUSKY INDIAN COMPLEXION (CRITICAL - DO NOT LIGHTEN):
Deep warm dusky brown skin tone - darker than caramel, coffee-with-milk richness
Rich bronze undertones typical of South Indian women
NOT fair, NOT light brown, NOT pale - authentic darker Indian complexion
Warm earthen golden-bronze highlights where light catches skin
Natural dusky melanin depth throughout entire body

HYPER-REALISTIC SKIN TEXTURE (MAXIMUM DETAIL):
Individual visible pores clearly rendered on all skin surfaces
Natural micro-texture and skin grain visible at close inspection
Realistic sebaceous texture in appropriate intimate areas
Natural skin elasticity with micro-wrinkles at joints and bends
Goosebumps texture where applicable
Subtle visible veins under thin skin areas - inner wrist, inner thigh
Natural skin oil sheen catching light in intimate areas
Realistic skin folds at bent joints, hips, and creases
NO airbrushing, NO plastic appearance - authentic human skin

LOCKED BODY MEASUREMENTS (37DD-27-40):
37DD bust - heavy natural breasts with full teardrop shape, natural weight and fall
27 inch waist - dramatically cinched, extreme hourglass definition visible
40 inch hips - wide round Indian hips with pronounced feminine curves
Full rounded glutes with natural weight
Soft full inner thighs with natural feminine fullness
Fit toned body with natural softness

FACIAL FEATURES:
High cheekbones typical of Indian women
Deep dark brown almond-shaped eyes with thick black lashes
Full sensual lips with natural dusky rose tone
Strong defined eyebrows
Diamond nose stud on left nostril
Dusky complexion matching body tone

JEWELRY (ALWAYS PRESENT):
Platinum navel ring piercing with diamond accent catching light
Delicate gold anklet on left ankle
Small diamond nose stud
Gold toe rings on second toes

HAIR:
Long flowing jet black Indian hair with natural shine
Hair spread across surface behind head`;

// ═══════════════════════════════════════════════════════════════════════════════
// LOCKED POSE - WIDE BENT KNEES (EXACT FROM SUCCESSFUL IMAGE)
// ═══════════════════════════════════════════════════════════════════════════════

const LOCKED_WIDE_BENT_POSE = `POSE - WIDE BENT KNEES APART (LOCKED - DO NOT CHANGE):

POSITION: Laying flat on back on soft dark surface
KNEES: Both knees bent at approximately 90 degrees
SPREAD: Knees fallen completely apart to opposite sides - maximum comfortable spread
WIDTH: Knees approaching or touching the surface on each side
FEET: Flat on surface or slightly lifted from extreme wide spread
INNER THIGHS: Fully exposed from hips to knees, creating dramatic V-shape toward intimate area
HIPS: 40 inch round hips visible and framing the inner thigh composition
TORSO: Relaxed flat on back, 37DD bust falling naturally to sides with gravity
WAIST: 27 inch cinched waist visible, navel piercing prominent at center
ARMS: Relaxed above head or at sides, not blocking body view
HEAD: Resting on surface, hair spread out
EXPRESSION: Relaxed, sensuous, confident - eyes can be closed or looking at camera

ANATOMICAL REQUIREMENTS:
Natural flesh compression where body contacts surface
Realistic skin folding at bent knee joints
Inner thigh creases naturally darker in tone
Natural weight distribution and gravity effects
Authentic body proportions maintained throughout`;

// ═══════════════════════════════════════════════════════════════════════════════
// LOCKED LIGHTING - LOW-KEY DRAMATIC (EXACT FROM SUCCESSFUL IMAGE)
// ═══════════════════════════════════════════════════════════════════════════════

const LOCKED_LOWKEY_LIGHTING = `LIGHTING - LOW-KEY DRAMATIC CHIAROSCURO (LOCKED):

SETUP: Single concentrated light source creating extreme contrast
RATIO: 80% of frame in deep shadow, 20% illuminated
KEY LIGHT: Single hard directional source from upper side angle
SHADOW: Deep black shadows with minimal fill
MOOD: Noir, mysterious, sensuous, emotionally evocative

ILLUMINATION PATTERN:
Strategic body parts catching concentrated light
Inner thighs receiving focused illumination
Curves sculpted by dramatic light-shadow interplay
Face may be in partial shadow for mystery
Platinum navel piercing catching bright highlight
Gold anklet glinting in light

COLOR TEMPERATURE:
Warm amber-gold on illuminated dusky skin
Deep neutral blacks in shadow areas
Bronze highlights on skin prominences
Rich contrast between light and shadow

ATMOSPHERE:
Renaissance chiaroscuro meets modern intimate photography
Museum fine art quality dramatic lighting
Emotionally evocative sensuous mood
Professional studio low-key technique`;

// ═══════════════════════════════════════════════════════════════════════════════
// LOCKED ENVIRONMENT - BLACK STUDIO (EXACT FROM SUCCESSFUL IMAGE)
// ═══════════════════════════════════════════════════════════════════════════════

const LOCKED_ENVIRONMENT = `ENVIRONMENT - DRAMATIC BLACK STUDIO (LOCKED):

SETTING: Professional photography studio with dark setup
BACKGROUND: Deep black seamless backdrop or black velvet
SURFACE: Black fabric platform, soft matte black surface beneath subject
ATMOSPHERE: Dramatic, noir, high-contrast potential
FOCUS: Subject emerging from darkness, minimal environmental distraction
NEGATIVE SPACE: Dark void surrounding illuminated subject
MOOD: Intimate, private, gallery-quality fine art setting`;

// ═══════════════════════════════════════════════════════════════════════════════
// CAMERA VARIANTS - ONLY THING THAT CHANGES
// ═══════════════════════════════════════════════════════════════════════════════

const CAMERA_VARIANTS = [
  {
    name: 'Full Body Wide Master',
    camera: `CAMERA - FULL BODY WIDE MASTER SHOT:
Lens: 35mm wide angle
Aperture: f/2.8 for full scene sharpness
Distance: 3.5 meters from subject
Angle: Elevated frontal, camera above and in front of subject's feet
Framing: Complete full body visible from hair to feet
Composition: Subject centered with black negative space surrounding
Focus: Tack sharp across entire body, inner thighs as focal anchor
Resolution: 8K ultra-high resolution, museum exhibition print quality
Purpose: Establishing shot showing complete pose and body proportions`,
    desc: 'Complete full body establishing shot - wide 35mm'
  },
  {
    name: 'Full Body Standard',
    camera: `CAMERA - FULL BODY STANDARD PORTRAIT:
Lens: 50mm standard portrait
Aperture: f/2.0 for slight background separation
Distance: 3 meters from subject
Angle: Frontal elevated, camera between subject's feet looking toward head
Framing: Full body from just above head to just below feet
Composition: Tight full body with minimal excess space
Focus: Sharp focus on torso and inner thighs, slight falloff at extremities
Resolution: 8K ultra-high resolution, professional intimate photography
Purpose: Classic full body portrait emphasizing hourglass proportions`,
    desc: 'Standard full body portrait - 50mm'
  },
  {
    name: 'Torso Inner Thigh Focus',
    camera: `CAMERA - TORSO TO THIGH FOCUS:
Lens: 85mm portrait telephoto
Aperture: f/1.8 for creamy background blur
Distance: 2.5 meters from subject
Angle: Elevated frontal, focused on midsection
Framing: From bust to knees - torso and inner thigh emphasis
Composition: Navel piercing at upper third, inner thigh V-shape prominent
Focus: Tack sharp on inner thighs and navel area
Resolution: 8K, exceptional anatomical detail
Purpose: Emphasizing hourglass waist-to-hip ratio and inner thigh exposure`,
    desc: 'Torso to thigh framing - 85mm portrait'
  },
  {
    name: 'Inner Thigh Closeup',
    camera: `CAMERA - INNER THIGH CLOSEUP:
Lens: 100mm macro telephoto
Aperture: f/2.8 for detail with slight depth
Distance: 2 meters from subject
Angle: Low frontal, camera at hip level between parted knees
Framing: Hips to knees only - intimate inner thigh detail shot
Composition: Inner thigh V-shape filling frame, navel at top edge
Focus: Maximum sharpness on inner thigh skin texture
Resolution: 8K macro detail, visible pores and skin texture
Purpose: Intimate detail study of inner thigh area with realistic skin rendering`,
    desc: 'Inner thigh detail closeup - 100mm macro'
  },
  {
    name: 'Extreme Inner Thigh Detail',
    camera: `CAMERA - EXTREME INNER THIGH MACRO:
Lens: 100mm macro at close focus
Aperture: f/4.0 for maximum skin detail sharpness
Distance: 1.5 meters from subject
Angle: Intimate frontal, camera close between bent knees
Framing: Extreme closeup of inner thigh V-shape convergence area
Composition: Where inner thighs meet as primary subject, skin texture visible
Focus: Hyper-sharp on inner thigh skin, visible pores and texture
Resolution: 8K extreme macro detail, individual pores visible
Purpose: Maximum skin detail study - hyper-realistic texture capture`,
    desc: 'Extreme inner thigh macro - maximum skin detail'
  },
  {
    name: 'Hip to Knee Landscape',
    camera: `CAMERA - HIP TO KNEE LANDSCAPE:
Lens: 85mm portrait
Aperture: f/2.0
Distance: 2 meters from subject
Angle: Side-elevated, capturing width of spread knees
Framing: Horizontal emphasis - hips to knees with wide spread visible
Composition: Both bent knees visible at edges, inner thighs spanning frame
Focus: Sharp across full inner thigh width
Resolution: 8K professional intimate photography
Purpose: Emphasizing the dramatic width of the wide bent spread pose`,
    desc: 'Hip to knee width emphasis - 85mm horizontal'
  },
  {
    name: 'Navel Down Intimate',
    camera: `CAMERA - NAVEL DOWN INTIMATE FRAME:
Lens: 85mm f/1.4
Aperture: f/1.4 shallow depth
Distance: 2 meters from subject
Angle: Elevated frontal focused on lower torso
Framing: From navel piercing down to mid-thigh
Composition: Platinum navel ring at top, V-shaped inner thighs below
Focus: Sharp on navel and inner thigh area with dreamy edge falloff
Resolution: 8K intimate professional capture
Purpose: Intimate framing emphasizing navel piercing and inner thigh connection`,
    desc: 'Navel down intimate focus - 85mm shallow DOF'
  },
  {
    name: 'Low Angle Dramatic',
    camera: `CAMERA - LOW ANGLE DRAMATIC PERSPECTIVE:
Lens: 35mm wide from low position
Aperture: f/2.8
Distance: 2 meters, camera very low
Angle: Extremely low, camera at surface level between feet looking up
Framing: Full body with dramatic perspective - legs prominent in foreground
Composition: Inner thighs large in frame, body receding toward head
Focus: Sharp on inner thighs, depth through body
Resolution: 8K cinematic perspective photography
Purpose: Dramatic low angle emphasizing inner thigh presence`,
    desc: 'Low angle dramatic perspective - 35mm'
  },
  {
    name: 'Overhead Birds Eye',
    camera: `CAMERA - OVERHEAD BIRDS EYE VIEW:
Lens: 35mm wide
Aperture: f/4.0 for full scene sharpness
Distance: 2.5 meters directly above
Angle: Directly overhead looking straight down at subject
Framing: Full body visible from above - geometric composition
Composition: Body as artistic shape, V-spread legs creating pattern
Focus: Sharp across entire body from overhead
Resolution: 8K artistic overhead capture
Purpose: Geometric artistic perspective showing full pose spread`,
    desc: 'Overhead birds eye geometric - 35mm'
  },
  {
    name: 'Three Quarter Full Body',
    camera: `CAMERA - THREE QUARTER ELEVATED FULL BODY:
Lens: 50mm standard
Aperture: f/2.0
Distance: 3 meters
Angle: Three-quarter elevated from subject's right side
Framing: Full body from slight side angle
Composition: Shows body depth, one bent knee prominent, inner thigh visible
Focus: Sharp on near inner thigh and curves
Resolution: 8K professional intimate photography
Purpose: Dimensional view showing body curves and pose depth`,
    desc: 'Three quarter elevated view - 50mm'
  },
  {
    name: 'Ultimate Detail Master',
    camera: `CAMERA - ULTIMATE DETAIL MASTER CAPTURE:
Lens: 100mm f/2.8 macro prime
Aperture: f/2.8 optimal sharpness
Distance: 2 meters from subject
Angle: Elevated frontal with optimal lighting angle
Framing: From bust to knees - optimal detail capture zone
Composition: Perfect balance of body context and intimate detail
Focus: Maximum sharpness on inner thighs with full texture rendering
Resolution: 8K legendary professional capture, museum exhibition quality
Purpose: Ultimate combination of framing, detail, and artistic quality`,
    desc: 'Ultimate master capture - peak quality 100mm'
  },
  {
    name: 'Cinematic Wide Intimate',
    camera: `CAMERA - CINEMATIC WIDE INTIMATE:
Lens: 24mm ultra-wide
Aperture: f/2.8
Distance: 2.5 meters
Angle: Low frontal cinematic perspective
Framing: Environmental full body with dramatic black negative space
Composition: Subject in lower frame with vast dark space above
Focus: Sharp on subject with environmental context
Resolution: 8K cinematic capture, film production quality
Purpose: Cinematic framing for dramatic visual impact`,
    desc: 'Cinematic ultra-wide intimate - 24mm'
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
// QUALITY MANDATES - 8K ULTRA-REALISTIC
// ═══════════════════════════════════════════════════════════════════════════════

const QUALITY_MANDATES = `TECHNICAL QUALITY REQUIREMENTS - NON-NEGOTIABLE:

RESOLUTION: 8K ultra-high resolution output
DETAIL: Museum exhibition print quality
SKIN: Hyper-realistic with visible pores and natural texture
ANATOMY: Correct proportions, realistic body mechanics
LIGHTING: Professional low-key dramatic chiaroscuro
COLOR: Accurate dusky brown Indian skin tone rendering
SHARPNESS: Tack-sharp on focus area, natural falloff elsewhere
NOISE: Clean, low noise professional capture
STYLE: Fine art intimate photography, legendary cinematographic quality

DO NOT:
- Alter the dusky skin tone (keep it deep warm brown)
- Change the pose (wide bent knees apart locked)
- Modify the lighting (low-key dramatic locked)
- Adjust body proportions (37DD-27-40 locked)
- Remove jewelry (platinum navel ring, gold anklet, nose stud)
- Add clothing or coverings
- Airbrush or plastic-ify the skin`;

// ═══════════════════════════════════════════════════════════════════════════════
// FINAL REINFORCEMENT LOCK
// ═══════════════════════════════════════════════════════════════════════════════

const FINAL_LOCK = `FINAL VERIFICATION BEFORE GENERATION:

✓ SUBJECT: Dusky Indian woman Meera - deep warm brown complexion
✓ BODY: 37DD-27-40 hourglass - heavy bust, cinched waist, wide round hips
✓ SKIN: Hyper-realistic with visible pores, NOT airbrushed
✓ POSE: Wide bent knees apart, laying on back, inner thighs fully exposed
✓ LIGHTING: Low-key dramatic, 80% shadow, concentrated illumination
✓ ENVIRONMENT: Black studio, dark void surrounding subject
✓ JEWELRY: Platinum navel piercing, gold anklet, diamond nose stud
✓ QUALITY: 8K ultra-realistic legendary professional capture

GENERATE NOW - MAINTAIN ALL LOCKED ELEMENTS`;

// ═══════════════════════════════════════════════════════════════════════════════
// PROMPT BUILDER
// ═══════════════════════════════════════════════════════════════════════════════

function buildPrompt(variant) {
  return `${LOCKED_DUSKY_MEERA}

${LOCKED_WIDE_BENT_POSE}

${LOCKED_LOWKEY_LIGHTING}

${LOCKED_ENVIRONMENT}

${variant.camera}

${QUALITY_MANDATES}

${FINAL_LOCK}`;
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
  console.log(`[${new Date().toLocaleTimeString()}] 📷 [${index + 1}/${total}] ${variant.name}`);
  console.log(`[${new Date().toLocaleTimeString()}]    Camera: ${variant.desc}`);
  console.log(`[${new Date().toLocaleTimeString()}]    Base: Wide Bent Lowkey Drama (LOCKED)`);
  console.log(`[${new Date().toLocaleTimeString()}]    Muse: Dusky Indian Meera (37DD-27-40)`);

  const prompt = buildPrompt(variant);

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
      const filename = `meera_dusky_lowkey_${variant.name.toLowerCase().replace(/\s+/g, '_')}_${Date.now()}.png`;
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
║   📷 MEERA DUSKY - LOWKEY DRAMA CAMERA VARIANTS 📷                          ║
║                                                                              ║
║   Based on: meera_dusky_maxmode_wide_bent_lowkey_drama_1768332581205.png    ║
║                                                                              ║
║   LOCKED ELEMENTS (from successful reference):                              ║
║   • Dusky Indian Meera (37DD-27-40)                                         ║
║   • Wide Bent Knees Apart Pose                                              ║
║   • Low-Key Dramatic Chiaroscuro Lighting                                   ║
║   • Black Studio Environment                                                ║
║                                                                              ║
║   VARYING: Camera lens, focal length, framing, perspective                  ║
║                                                                              ║
║   ${CAMERA_VARIANTS.length} Camera Variants • 8K Ultra-Realistic Quality                         ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
  `);

  if (!process.env.REPLICATE_API_TOKEN) {
    console.error('❌ REPLICATE_API_TOKEN not set!');
    console.log('Set it with: export REPLICATE_API_TOKEN=r8_L30cnEji7Zl6Mb8pm5OYPDfxGPkOonw4Gw2PL');
    process.exit(1);
  }

  console.log(`[${new Date().toLocaleTimeString()}] ✅ Replicate API configured`);
  console.log(`[${new Date().toLocaleTimeString()}] 🔒 ALL ELEMENTS LOCKED FROM REFERENCE IMAGE`);
  console.log(`[${new Date().toLocaleTimeString()}] 📷 Varying: Camera perspective only`);
  console.log(`[${new Date().toLocaleTimeString()}] 🎯 Model: ImagineArt 1.0`);
  console.log();

  const results = [];
  let successCount = 0;

  for (let i = 0; i < CAMERA_VARIANTS.length; i++) {
    const result = await generateImage(CAMERA_VARIANTS[i], i, CAMERA_VARIANTS.length);
    results.push(result);
    if (result.success) successCount++;

    if (i < CAMERA_VARIANTS.length - 1) {
      console.log(`[${new Date().toLocaleTimeString()}]    ⏳ Next in 10s...`);
      await new Promise(resolve => setTimeout(resolve, 10000));
    }
  }

  console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║          📷 MEERA DUSKY LOWKEY CAMERA VARIANTS COMPLETE 📷                  ║
╚══════════════════════════════════════════════════════════════════════════════╝

  ✅ Success: ${successCount}/${CAMERA_VARIANTS.length}
  📊 Rate: ${((successCount / CAMERA_VARIANTS.length) * 100).toFixed(1)}%
  📁 Output: ${OUTPUT_DIR}
`);

  results.filter(r => r.success).forEach(r => {
    console.log(`     📷 ${r.variant} (${r.size} MB)`);
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
      collection: 'Meera Dusky - Lowkey Drama Camera Variants',
      baseReference: 'meera_dusky_maxmode_wide_bent_lowkey_drama_1768332581205.png',
      model: 'imagineart/imagineart-1.0',
      lockedMuse: 'Dusky Indian Meera (37DD-27-40)',
      lockedPose: 'Wide Bent Knees Apart',
      lockedLighting: 'Low-Key Dramatic Chiaroscuro',
      lockedEnvironment: 'Black Studio',
      varying: 'Camera lens, focal length, framing, perspective',
      generated: new Date().toISOString(),
      variants: results,
      stats: { total: CAMERA_VARIANTS.length, successful: successCount }
    }, null, 2)
  );
  console.log(`[${new Date().toLocaleTimeString()}] 📋 Manifest saved`);
}

main().catch(console.error);
