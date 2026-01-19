#!/usr/bin/env node

/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  ███╗   ███╗███████╗███████╗██╗  ██╗███╗   ███╗██╗███╗   ██╗██╗███╗   ███╗ █████╗ ██╗
 *  ████╗ ████║██╔════╝██╔════╝██║  ██║████╗ ████║██║████╗  ██║██║████╗ ████║██╔══██╗██║
 *  ██╔████╔██║█████╗  ███████╗███████║██╔████╔██║██║██╔██╗ ██║██║██╔████╔██║███████║██║
 *  ██║╚██╔╝██║██╔══╝  ╚════██║██╔══██║██║╚██╔╝██║██║██║╚██╗██║██║██║╚██╔╝██║██╔══██║██║
 *  ██║ ╚═╝ ██║███████╗███████║██║  ██║██║ ╚═╝ ██║██║██║ ╚████║██║██║ ╚═╝ ██║██║  ██║███████╗
 *  ╚═╝     ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝╚═╝╚═╝     ╚═╝╚═╝  ╚═╝╚══════╝
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *  GOD-MAX-MODE MESHMINIMAL SERIES
 *
 *  Reference: Ideogram 3.0 Indian Muse
 *  Style: Helmut Newton × Annie Leibovitz × Peter Lindbergh
 *
 *  PHASE 1: Reference Match (Same model, wardrobe, setting)
 *  PHASE 2: Creative 10+ Intimacy Exploration
 *
 * ═══════════════════════════════════════════════════════════════════════════
 */

import fs from 'fs';
import path from 'path';

const OUTPUT_DIR = '/home/ecolex/version1/generated-meshminimal';
const PROJECT_ID = 'zaranovel';
const LOCATION = 'us-central1';
const PROXY_URL = 'http://localhost:3001';

// Create directory structure
const PHASES = ['phase1_reference', 'phase2_intimate'];
PHASES.forEach(phase => {
  const dir = path.join(OUTPUT_DIR, phase);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// ═══════════════════════════════════════════════════════════════════════════
// IDEOGRAM 3.0 INDIAN MUSE - EXACT MODEL SPECIFICATION
// ═══════════════════════════════════════════════════════════════════════════

const INDIAN_MUSE_MODEL = `Stunning Indian muse with striking angular features and captivating intense gaze, sun-kissed bronze skin with golden undertones and visible natural texture, dramatic statuesque high fashion model physique with elegant proportions, tall 5'8" frame with graceful elongated limbs, sleek black hair pulled back in sophisticated low bun, strong defined cheekbones and jawline, full natural lips with subtle nude tone, dark expressive almond eyes with intense direct gaze, visible collarbones and elegant neck, natural matte skin finish with authentic texture and fine pores, age 24-28, professional fashion model bearing`;

// ═══════════════════════════════════════════════════════════════════════════
// REFERENCE ENVIRONMENT - VICTORIAN-MODERN WOODEN CABIN
// ═══════════════════════════════════════════════════════════════════════════

const CABIN_ENVIRONMENT = `Victorian-modern minimalist wooden cabin interior, rustic aged wood plank walls with natural grain and warm honey tones, multiple tall windows with soft morning light streaming through, bare wooden floors, minimalist wooden furniture, private exclusive intimate atmosphere, architectural details with clean lines, natural wood beams and trim, warm ambient natural illumination with gentle shadows`;

// ═══════════════════════════════════════════════════════════════════════════
// MESHMINIMAL WARDROBES - PHASE 1 (Reference) + PHASE 2 (Creative 10+)
// ═══════════════════════════════════════════════════════════════════════════

const WARDROBES = {
  // PHASE 1 - REFERENCE MATCH
  reference_black_mesh: {
    phase: 1,
    name: 'Black Sheer Mesh Wrap',
    description: `minimalist black sheer mesh wrap dress with asymmetric design, delicate black mesh fabric with strategic coverage, thin straps creating geometric crossover pattern across torso, flowing mesh skirt with fringe hem detail, form-fitting silhouette, designer high fashion piece`
  },

  // PHASE 2 - CREATIVE 10+ INTIMACY
  nude_crystalline_mesh: {
    phase: 2,
    name: 'Nude Crystalline Mesh',
    description: `ultra-sheer nude crystalline mesh bodysuit, skin-tone mesh fabric creating near-invisible effect, delicate geometric seams as only visible structure, strategic minimal coverage at key points, barely-there aesthetic blending with bronze skin, high fashion minimal concept`
  },

  charcoal_architectural_mesh: {
    phase: 2,
    name: 'Charcoal Architectural Mesh',
    description: `charcoal grey architectural mesh two-piece, structured geometric panels with sheer mesh connecting segments, asymmetric bandeau top with single diagonal strap, high-waisted mesh brief with architectural cutouts, modernist fashion sculpture`
  },

  ivory_gossamer_drape: {
    phase: 2,
    name: 'Ivory Gossamer Drape',
    description: `flowing ivory gossamer mesh draped asymmetrically, ethereal sheer white mesh creating veil-like effect, single shoulder anchor point with fabric cascading diagonally, minimal coverage with artistic draping, gallery-worthy textile art piece`
  },

  bronze_metallic_mesh: {
    phase: 2,
    name: 'Bronze Metallic Mesh',
    description: `bronze metallic mesh bodysuit matching skin undertones, fine chainmail-inspired mesh with subtle shimmer, plunging neckline with thin straps, high-cut silhouette, amalgamative design harmonizing with bronze skin tone`
  },

  black_deconstructed_minimal: {
    phase: 2,
    name: 'Black Deconstructed Minimal',
    description: `black deconstructed minimal mesh set, asymmetric single-cup bandeau with exposed side, ultra-minimal mesh brief with single hip strap, avant-garde fashion deconstruction, bold negative space design`
  },

  champagne_whisper_mesh: {
    phase: 2,
    name: 'Champagne Whisper Mesh',
    description: `champagne whisper-weight mesh slip, ultra-delicate champagne-toned mesh with barely-visible structure, thin spaghetti straps, thigh-length with side slit, fabric so sheer it catches light like second skin`
  }
};

// ═══════════════════════════════════════════════════════════════════════════
// POSES - Reference + Creative Intimate
// ═══════════════════════════════════════════════════════════════════════════

const POSES = {
  // PHASE 1 - REFERENCE POSES
  table_perch_reference: {
    phase: 1,
    name: 'Table Edge Perch',
    description: `gracefully perched on wooden table edge, both hands resting on table surface behind body, legs elegantly crossed, torso upright with slight lean back, elongated neck, direct intense gaze at camera, arched posture emphasizing natural grace`
  },

  table_recline_elegant: {
    phase: 1,
    name: 'Table Recline Elegant',
    description: `reclining back on wooden table with weight on both hands behind, legs extending forward off table edge, head tilted with direct gaze, body creating elegant diagonal line, graceful arm positioning`
  },

  // PHASE 2 - CREATIVE INTIMATE POSES
  floor_artistic_stretch: {
    phase: 2,
    name: 'Floor Artistic Stretch',
    description: `lying artistically on wooden floor, one leg extended, other knee bent, arms positioned above head in graceful stretch, torso slightly arched, head turned toward camera with intense gaze, body creating serpentine line`
  },

  window_silhouette_lean: {
    phase: 2,
    name: 'Window Silhouette Lean',
    description: `leaning against window frame with morning light creating rim illumination, one arm raised holding window edge, hip cocked creating curved silhouette, profile and three-quarter view, ethereal backlit effect`
  },

  kneeling_sculptural: {
    phase: 2,
    name: 'Kneeling Sculptural',
    description: `kneeling on wooden floor in sculptural pose, sitting back on heels, hands resting on thighs, spine elongated, shoulders back, chin lifted with direct commanding gaze, statuesque Greek goddess energy`
  },

  lying_sensual_recline: {
    phase: 2,
    name: 'Lying Sensual Recline',
    description: `lying on side on wooden surface, head propped on one hand, other arm draped along body curve, legs slightly overlapping, body creating flowing S-curve, intimate direct eye contact`
  },

  standing_contre_jour: {
    phase: 2,
    name: 'Standing Contre-Jour',
    description: `standing in front of window with contre-jour backlighting, arms slightly away from body, weight on one leg creating hip curve, silhouette effect with rim light defining form, dramatic artistic lighting`
  },

  table_prone_artistic: {
    phase: 2,
    name: 'Table Prone Artistic',
    description: `lying prone on wooden table, weight on forearms, upper body lifted, legs extended behind, head raised with intense forward gaze, back arched gracefully, classical odalisque reimagined`
  }
};

// ═══════════════════════════════════════════════════════════════════════════
// LIGHTING STYLES
// ═══════════════════════════════════════════════════════════════════════════

const LIGHTING = {
  rembrandt_golden: {
    name: 'Rembrandt Golden',
    description: `Rembrandt style lighting with golden warmth, soft natural window light creating gentle shadows on one side of face, subtle rim light for depth, warm color temperature, professional 3-point setup feel with natural source`
  },

  morning_window_soft: {
    name: 'Morning Window Soft',
    description: `soft morning window light pouring natural illumination, gentle directional light creating subtle shadows, warm golden hour quality, atmospheric light rays visible in dust motes`
  },

  dramatic_chiaroscuro: {
    name: 'Dramatic Chiaroscuro',
    description: `dramatic chiaroscuro lighting sculpting ethereal forms, strong contrast between light and shadow, single powerful light source, deep shadows defining curves, gallery-quality dramatic illumination`
  },

  contre_jour_silhouette: {
    name: 'Contre-Jour Silhouette',
    description: `contre-jour backlighting from window, subject silhouetted against bright window light, subtle rim light defining edges, ethereal glowing effect, artistic backlit photography`
  },

  soft_diffused_intimate: {
    name: 'Soft Diffused Intimate',
    description: `soft diffused intimate lighting, even gentle illumination from multiple windows, minimal shadows, flattering beauty light quality, warm inviting atmosphere`
  }
};

// ═══════════════════════════════════════════════════════════════════════════
// GENERATE VARIANTS MATRIX
// ═══════════════════════════════════════════════════════════════════════════

function generateVariants() {
  const variants = [];
  let index = 0;

  // PHASE 1: Reference Match Variants (4 variants)
  // Same wardrobe, same setting, different poses and lighting
  const phase1Wardrobes = Object.entries(WARDROBES).filter(([k, v]) => v.phase === 1);
  const phase1Poses = Object.entries(POSES).filter(([k, v]) => v.phase === 1);
  const phase1Lighting = ['rembrandt_golden', 'morning_window_soft'];

  for (const [wKey, wardrobe] of phase1Wardrobes) {
    for (const [pKey, pose] of phase1Poses) {
      for (const lKey of phase1Lighting) {
        variants.push({
          id: `meshmin_p1_${wKey}_${pKey}_${lKey}_${index}`,
          phase: 1,
          phaseDir: 'phase1_reference',
          wardrobe,
          wardrobeKey: wKey,
          pose,
          poseKey: pKey,
          lighting: LIGHTING[lKey],
          lightKey: lKey,
          name: `P1: ${wardrobe.name} - ${pose.name} - ${LIGHTING[lKey].name}`
        });
        index++;
      }
    }
  }

  // PHASE 2: Creative 10+ Intimacy (16 variants)
  // Creative wardrobes, intimate poses, varied lighting
  const phase2Wardrobes = Object.entries(WARDROBES).filter(([k, v]) => v.phase === 2);
  const phase2Poses = Object.entries(POSES).filter(([k, v]) => v.phase === 2);
  const phase2Combos = [
    // Wardrobe index, Pose index, Lighting key
    [0, 0, 'rembrandt_golden'],      // Nude Crystalline + Floor Stretch
    [0, 3, 'soft_diffused_intimate'], // Nude Crystalline + Lying Recline
    [1, 2, 'dramatic_chiaroscuro'],   // Charcoal Architectural + Kneeling
    [1, 1, 'contre_jour_silhouette'], // Charcoal Architectural + Window
    [2, 4, 'contre_jour_silhouette'], // Ivory Gossamer + Standing
    [2, 0, 'morning_window_soft'],    // Ivory Gossamer + Floor Stretch
    [3, 2, 'rembrandt_golden'],       // Bronze Metallic + Kneeling
    [3, 5, 'dramatic_chiaroscuro'],   // Bronze Metallic + Table Prone
    [4, 3, 'soft_diffused_intimate'], // Black Deconstructed + Lying Recline
    [4, 1, 'dramatic_chiaroscuro'],   // Black Deconstructed + Window
    [5, 0, 'morning_window_soft'],    // Champagne Whisper + Floor Stretch
    [5, 3, 'rembrandt_golden'],       // Champagne Whisper + Lying Recline
    [0, 2, 'dramatic_chiaroscuro'],   // Nude Crystalline + Kneeling
    [2, 3, 'soft_diffused_intimate'], // Ivory Gossamer + Lying Recline
    [3, 4, 'contre_jour_silhouette'], // Bronze Metallic + Standing
    [4, 5, 'morning_window_soft'],    // Black Deconstructed + Table Prone
  ];

  for (const [wIdx, pIdx, lKey] of phase2Combos) {
    const [wKey, wardrobe] = phase2Wardrobes[wIdx];
    const [pKey, pose] = phase2Poses[pIdx];

    variants.push({
      id: `meshmin_p2_${wKey}_${pKey}_${lKey}_${index}`,
      phase: 2,
      phaseDir: 'phase2_intimate',
      wardrobe,
      wardrobeKey: wKey,
      pose,
      poseKey: pKey,
      lighting: LIGHTING[lKey],
      lightKey: lKey,
      name: `P2: ${wardrobe.name} - ${pose.name}`
    });
    index++;
  }

  return variants;
}

// ═══════════════════════════════════════════════════════════════════════════
// PROMPT BUILDER - GOD-MAX-MODE
// ═══════════════════════════════════════════════════════════════════════════

function buildPrompt(variant) {
  const isPhase1 = variant.phase === 1;

  return `Award-winning fine art photography echoing Helmut Newton and Annie Leibovitz visionary styles, museum-quality masterpiece, Canon EOS R5, 35mm lens at f/2.0,

${INDIAN_MUSE_MODEL},

wearing ${variant.wardrobe.description},

${variant.pose.description},

in ${CABIN_ENVIRONMENT},

${variant.lighting.description},

Peter Lindbergh natural beauty philosophy meets Mario Testino sophistication, hyper-detailed with intricate details and flawless composition, photo-realistic rendering with authentic skin texture visible pores and fabric physics, professional color grading with cinematic depth, elevated to gallery excellence with supreme artistic finesse, intimate private artistic exploration, ${isPhase1 ? 'exact reference match aesthetic' : 'creative 10+ premium intimacy'}, shallow DOF, 8K resolution`;
}

// ═══════════════════════════════════════════════════════════════════════════
// VERTEX AI GENERATION
// ═══════════════════════════════════════════════════════════════════════════

async function getOAuthToken() {
  try {
    const response = await fetch(`${PROXY_URL}/api/gcloud-token`);
    const data = await response.json();
    if (data.success && data.token) return data.token;
  } catch (e) {}
  throw new Error('Failed to get OAuth token');
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

// ═══════════════════════════════════════════════════════════════════════════
// MAIN EXECUTION
// ═══════════════════════════════════════════════════════════════════════════

async function main() {
  console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║  ███╗   ███╗███████╗███████╗██╗  ██╗███╗   ███╗██╗███╗   ██╗██╗███╗   ███╗   ║
║  ████╗ ████║██╔════╝██╔════╝██║  ██║████╗ ████║██║████╗  ██║██║████╗ ████║   ║
║  ██╔████╔██║█████╗  ███████╗███████║██╔████╔██║██║██╔██╗ ██║██║██╔████╔██║   ║
║  ██║╚██╔╝██║██╔══╝  ╚════██║██╔══██║██║╚██╔╝██║██║██║╚██╗██║██║██║╚██╔╝██║   ║
║  ██║ ╚═╝ ██║███████╗███████║██║  ██║██║ ╚═╝ ██║██║██║ ╚████║██║██║ ╚═╝ ██║   ║
║  ╚═╝     ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝╚═╝╚═╝     ╚═╝   ║
║                                                                              ║
║         ✨ GOD-MAX-MODE MESHMINIMAL SERIES ✨                                 ║
║                                                                              ║
║    Reference: Ideogram 3.0 Indian Muse                                       ║
║    Style: Helmut Newton × Annie Leibovitz × Peter Lindbergh                 ║
║    Setting: Victorian-Modern Minimalist Wooden Cabin                         ║
║                                                                              ║
║    PHASE 1: Reference Match (4 variants)                                     ║
║    PHASE 2: Creative 10+ Intimacy (16 variants)                              ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
  `);

  const variants = generateVariants();

  console.log(`[${new Date().toLocaleTimeString()}] Authenticating with Vertex AI...`);
  let token = await getOAuthToken();
  console.log(`[${new Date().toLocaleTimeString()}] ✅ OAuth token obtained\n`);

  console.log('══════════════════════════════════════════════════════════════════════════════');
  console.log(`[${new Date().toLocaleTimeString()}] ✨ GENERATING ${variants.length} MESHMINIMAL VARIANTS`);
  console.log('══════════════════════════════════════════════════════════════════════════════\n');

  const results = {
    phase1: { successful: [], failed: [] },
    phase2: { successful: [], failed: [] }
  };

  let currentPhase = 0;

  for (let i = 0; i < variants.length; i++) {
    const variant = variants[i];

    // Phase transition announcement
    if (variant.phase !== currentPhase) {
      currentPhase = variant.phase;
      console.log('\n══════════════════════════════════════════════════════════════════════════════');
      console.log(`[${new Date().toLocaleTimeString()}] 🚀 ENTERING PHASE ${currentPhase}: ${currentPhase === 1 ? 'REFERENCE MATCH' : 'CREATIVE 10+ INTIMACY'}`);
      console.log('══════════════════════════════════════════════════════════════════════════════\n');
    }

    // Refresh token every 4 images
    if (i > 0 && i % 4 === 0) {
      console.log(`[${new Date().toLocaleTimeString()}] 🔄 Refreshing OAuth token...`);
      token = await getOAuthToken();
    }

    console.log('──────────────────────────────────────────────────────────────────────────────');
    console.log(`[${new Date().toLocaleTimeString()}] ✨ [${i + 1}/${variants.length}] ${variant.name}`);
    console.log(`[${new Date().toLocaleTimeString()}]    Phase: ${variant.phase} | Wardrobe: ${variant.wardrobe.name}`);
    console.log(`[${new Date().toLocaleTimeString()}]    Pose: ${variant.pose.name} | Lighting: ${variant.lighting.name}`);

    const prompt = buildPrompt(variant);
    const filename = `${variant.id}_${Date.now()}.png`;
    const filepath = path.join(OUTPUT_DIR, variant.phaseDir, filename);

    try {
      const result = await generateImage(prompt, filepath, token);
      const sizeMB = (result.size / (1024 * 1024)).toFixed(2);

      console.log(`[${new Date().toLocaleTimeString()}]    ✅ Saved: ${filename} (${sizeMB} MB)`);

      const resultKey = variant.phase === 1 ? 'phase1' : 'phase2';
      results[resultKey].successful.push({ ...variant, filename, sizeMB, filepath });

    } catch (error) {
      console.log(`[${new Date().toLocaleTimeString()}]    ❌ Failed: ${error.message}`);

      const resultKey = variant.phase === 1 ? 'phase1' : 'phase2';
      results[resultKey].failed.push({ ...variant, error: error.message });

      if (error.message.includes('Filtered') || error.message.includes('429')) {
        console.log(`[${new Date().toLocaleTimeString()}]    ⏳ Waiting 90s for rate limit...`);
        await new Promise(r => setTimeout(r, 90000));
      }
    }

    console.log(`[${new Date().toLocaleTimeString()}]    ⏳ Waiting 25s for rate limit...`);
    await new Promise(r => setTimeout(r, 25000));
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SUMMARY
  // ═══════════════════════════════════════════════════════════════════════════

  console.log('\n══════════════════════════════════════════════════════════════════════════════');
  console.log('              MESHMINIMAL SERIES COMPLETE');
  console.log('══════════════════════════════════════════════════════════════════════════════\n');

  console.log(`  📁 PHASE 1 - REFERENCE MATCH:`);
  console.log(`     ✅ Successful: ${results.phase1.successful.length}`);
  console.log(`     ❌ Failed: ${results.phase1.failed.length}`);
  for (const img of results.phase1.successful) {
    console.log(`        📸 ${img.name} (${img.sizeMB} MB)`);
  }

  console.log(`\n  📁 PHASE 2 - CREATIVE 10+ INTIMACY:`);
  console.log(`     ✅ Successful: ${results.phase2.successful.length}`);
  console.log(`     ❌ Failed: ${results.phase2.failed.length}`);
  for (const img of results.phase2.successful) {
    console.log(`        📸 ${img.wardrobe.name} - ${img.pose.name} (${img.sizeMB} MB)`);
  }

  const totalSuccess = results.phase1.successful.length + results.phase2.successful.length;
  const totalFailed = results.phase1.failed.length + results.phase2.failed.length;

  console.log(`\n  ══════════════════════════════════════════════════════════════`);
  console.log(`  TOTAL: ${totalSuccess} successful / ${totalFailed} failed`);
  console.log(`  Output: ${OUTPUT_DIR}`);
  console.log('══════════════════════════════════════════════════════════════════════════════\n');

  // Save manifest
  const manifest = {
    collection: 'MeshMinimal Series - God-Max-Mode',
    reference: 'Ideogram 3.0 Indian Muse',
    style: 'Helmut Newton × Annie Leibovitz × Peter Lindbergh',
    generated: new Date().toISOString(),
    phase1: {
      name: 'Reference Match',
      successful: results.phase1.successful.length,
      failed: results.phase1.failed.length,
      images: results.phase1.successful,
      failures: results.phase1.failed
    },
    phase2: {
      name: 'Creative 10+ Intimacy',
      successful: results.phase2.successful.length,
      failed: results.phase2.failed.length,
      images: results.phase2.successful,
      failures: results.phase2.failed
    }
  };

  const manifestPath = path.join(OUTPUT_DIR, 'meshminimal-manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`[${new Date().toLocaleTimeString()}] 📋 Manifest saved: ${manifestPath}\n`);
}

main().catch(console.error);
