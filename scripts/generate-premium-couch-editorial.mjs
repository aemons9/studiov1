#!/usr/bin/env node
/**
 * VERALABS Premium Editorial Couch Series
 * Level 9-10 Intimacy • Indoor Realistic Setting • Max-Mode Skills
 * Indian Hourglass Muse • Helmut Newton/Annie Leibovitz Style
 * Imagen 4 Ultra - Gallery Excellence
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const PROXY_URL = 'http://localhost:3001';
const OUTPUT_DIR = '/home/ecolex/version1/generated-premium-couch-editorial';
const PROJECT_ID = 'zaranovel';
const LOCATION = 'us-central1';

// Same Indian Hourglass Model from Boundary-Intimacy Series
const INDIAN_HOURGLASS_MUSE = `Stunning Indian muse, 5'8" tall,
fit athletic voluptuous hourglass figure with dramatic statuesque curves,
bust 37DD", cinched waist 27", wide rounded hips 40",
toned sculpted thighs and shapely rounded glutes,
sun-kissed bronze skin with luminous golden undertones glowing ethereally,
striking magnetic gaze with full sensual lips and dramatic cheekbones,
long flowing jet-black hair with natural tousled waves cascading over shoulders,
age 26, commanding confident presence, professional fashion model physique`;

// Realistic Indoor Couch Setting
const COUCH_SETTING = `Luxurious indoor setting with elegant velvet chaise lounge couch in rich burgundy or midnight blue,
sophisticated private room with warm ambient lighting,
plush textures and rich fabrics, intimate boudoir atmosphere,
soft natural light filtering through sheer curtains mixed with warm lamp glow,
tasteful interior with artistic decor, museum-quality fine art photography setting`;

// Quality Prefix - Helmut Newton/Annie Leibovitz Style
const QUALITY_PREFIX = `Exquisite fine art exploration echoing Helmut Newton and Annie Leibovitz's visionary styles.
Shot in the style of renowned fashion photographers like Mario Testino or Annie Leibovitz.
Award-winning museum-quality masterpiece photograph.`;

// Quality Suffix - Dramatic Chiaroscuro
const QUALITY_SUFFIX = `Dramatic chiaroscuro sculpting ethereal forms.
Elevated to gallery excellence with supreme artistic finesse.
Shot on Phase One IQ4 150MP with Schneider-Kreuznach optics.
Masterful composition, perfect exposure, professional color grading with cinematic depth.
Photorealistic rendering with authentic skin texture and luminous quality.`;

// Premium Editorial Variants - Level 9-10 Intimacy
const PREMIUM_VARIANTS = [
  // DECOLLETAGE FOCUS SERIES
  {
    id: 'decolletage_mesh_recline_1',
    name: 'Mesh Whispers Decolletage',
    category: 'DECOLLETAGE FOCUS',
    intimacyLevel: 10,
    wardrobe: 'Ultra-sheer black mesh bodysuit with strategic architectural one-line coverage, delicate mesh creating gossamer veil effect across decolletage, minimal fabric strategically placed, body visible through translucent material',
    pose: 'Reclining elegantly on velvet chaise, upper body slightly elevated, one arm draped overhead emphasizing decolletage curves, head tilted back in artistic abandon, full body visible',
    lighting: 'Warm golden side light caressing curves, dramatic shadows defining form, soft highlights on mesh fabric',
    focus: 'Emphasis on decolletage, bust line, and graceful neck curve'
  },
  {
    id: 'decolletage_lace_lounging_2',
    name: 'Lace Architecture Decolletage',
    category: 'DECOLLETAGE FOCUS',
    intimacyLevel: 10,
    wardrobe: 'Minimal French lace bodysuit with architectural cut strategic coverage, single-line design framing bust, delicate lace barely covering essentials, negative space as design element',
    pose: 'Lounging sideways on couch, propped on elbow, facing camera with confident gaze, bust prominently framed by lace architecture, legs extended elegantly',
    lighting: 'Chiaroscuro lighting with dramatic contrast, light sculpting decolletage definition',
    focus: 'Decolletage details, lace against bronze skin, confident feminine power'
  },
  {
    id: 'decolletage_shadow_nude_3',
    name: 'Shadow Nude Decolletage',
    category: 'DECOLLETAGE FOCUS',
    intimacyLevel: 10,
    wardrobe: 'Shadow nude-art bodysuit in barely-there nude mesh, impeccably tailored with strategic architectural one-line coverage, fabric matching skin tone creating artistic illusion',
    pose: 'Seated on couch edge leaning back on arms, chest lifted proudly, head thrown back exposing graceful throat line, full body composition',
    lighting: 'Dramatic single light source creating sculptural shadows, rim light defining silhouette',
    focus: 'Decolletage prominence, throat line elegance, confident posture'
  },

  // LOWER BACK/HIPS/GLUTES FOCUS SERIES
  {
    id: 'glutes_mesh_recline_1',
    name: 'Mesh Sculpture Back View',
    category: 'LOWER BACK FOCUS',
    intimacyLevel: 10,
    wardrobe: 'Minimal mesh thong bodysuit with architectural back design, strategic one-line straps creating geometric pattern across lower back, sheer fabric revealing sculpted glutes',
    pose: 'Lying face down on couch, propped on elbows, looking over shoulder seductively, back arched to emphasize lumbar curve and rounded glutes, legs slightly parted',
    lighting: 'Warm light cascading down spine, shadows defining muscle definition and curves',
    focus: 'Lower back curve, hip width, sculpted glutes depth'
  },
  {
    id: 'glutes_lace_kneeling_2',
    name: 'Lace Contours Hip Focus',
    category: 'LOWER BACK FOCUS',
    intimacyLevel: 10,
    wardrobe: 'Minimal lace high-cut bodysuit with daringly low back, architectural straps creating frame around wide hips and rounded glutes, lace barely covering essentials',
    pose: 'Kneeling on couch facing away, torso twisted to show profile, hands on hips, showcasing dramatic hip-to-waist ratio and glute roundness',
    lighting: 'Side lighting emphasizing hourglass curves, shadows in hip valleys',
    focus: 'Wide hips, rounded glutes, dramatic waist definition'
  },
  {
    id: 'glutes_shadow_artistic_3',
    name: 'Shadow Art Lumbar Poetry',
    category: 'LOWER BACK FOCUS',
    intimacyLevel: 10,
    wardrobe: 'Shadow nude bodysuit with strategic coverage only at essentials, impeccably tailored to reveal complete lower back and glute contours, architectural minimal design',
    pose: 'Standing beside couch, one knee on cushion, dramatic S-curve of spine visible, looking over shoulder with smoldering gaze, full posterior view',
    lighting: 'Dramatic venetian blind light creating stripe patterns across back and glutes',
    focus: 'Spine curve, lumbar dimples, glute sculpture, hip width'
  },

  // FULL BODY RECLINED SERIES
  {
    id: 'fullbody_mesh_languid_1',
    name: 'Languid Mesh Goddess',
    category: 'FULL BODY RECLINED',
    intimacyLevel: 10,
    wardrobe: 'Full-body ultra-sheer mesh bodysuit with strategic architectural panels, minimal coverage at key points, mesh revealing complete hourglass silhouette beneath',
    pose: 'Fully reclined on chaise, one arm above head, one leg bent at knee creating elegant line, body stretched showing full hourglass proportions, direct confident gaze',
    lighting: 'Golden hour warmth flooding scene, soft shadows defining every curve',
    focus: 'Complete hourglass figure, bust to hip ratio, sculpted legs'
  },
  {
    id: 'fullbody_lace_odalisque_2',
    name: 'Lace Odalisque',
    category: 'FULL BODY RECLINED',
    intimacyLevel: 10,
    wardrobe: 'Minimal lace teddy with dramatic plunging neckline and high-cut legs, architectural straps creating geometric design, strategic lace placement',
    pose: 'Classic odalisque recline on side, head propped on hand, top leg bent forward, showcasing complete silhouette from bust through hips to legs',
    lighting: 'Rembrandt lighting with soft golden fill, chiaroscuro depth',
    focus: 'Full body curves, dramatic waist, hip prominence'
  },
  {
    id: 'fullbody_shadow_venus_3',
    name: 'Shadow Venus Rising',
    category: 'FULL BODY RECLINED',
    intimacyLevel: 10,
    wardrobe: 'Shadow nude architectural bodysuit with minimal one-line strategic coverage, nude mesh creating second-skin effect, impeccably tailored to reveal maximum form',
    pose: 'Semi-reclined rising from couch, weight on one arm, body arched in dynamic movement, showcasing full figure from multiple angles, powerful feminine energy',
    lighting: 'Dramatic contra-jour backlighting creating silhouette with selective illumination',
    focus: 'Dynamic full-body pose, all curves in motion, powerful presence'
  },

  // CREATIVE COMBINATIONS
  {
    id: 'creative_mesh_serpentine_1',
    name: 'Serpentine Mesh Seduction',
    category: 'CREATIVE HYBRID',
    intimacyLevel: 10,
    wardrobe: 'Avant-garde mesh bodysuit with serpentine architectural design, single continuous line creating artistic pattern across body, maximum skin visibility with minimal strategic coverage',
    pose: 'Dramatic serpentine pose on couch, body creating S-curve, one hand in hair, legs intertwined with couch fabric, showing both decolletage and hip curves simultaneously',
    lighting: 'Multiple light sources creating complex shadow play',
    focus: 'Artistic body line, simultaneous front and profile elements'
  },
  {
    id: 'creative_lace_mirror_2',
    name: 'Lace Mirror Duality',
    category: 'CREATIVE HYBRID',
    intimacyLevel: 10,
    wardrobe: 'Minimal lace bodysuit with asymmetrical architectural design, one side revealing more than the other, strategic coverage creating visual intrigue',
    pose: 'Twisted pose showing both front decolletage and back/hip curves, body spiraling on couch, head turned to show profile, multiple aspects visible',
    lighting: 'Split lighting emphasizing the duality of pose',
    focus: 'Dual view - decolletage and glutes visible simultaneously'
  },
  {
    id: 'creative_shadow_sculpture_3',
    name: 'Living Sculpture Shadow Play',
    category: 'CREATIVE HYBRID',
    intimacyLevel: 10,
    wardrobe: 'Shadow nude bodysuit with geometric cutouts creating abstract pattern, architectural design revealing sculpted form through strategic negative space',
    pose: 'Artistic pose with limbs creating sculptural composition, body as living art installation on couch, every angle considered for visual impact',
    lighting: 'Extreme chiaroscuro with shadows as integral design element',
    focus: 'Body as sculpture, light and shadow as co-creators'
  }
];

function log(msg) {
  const time = new Date().toLocaleTimeString();
  console.log(`[${time}] ${msg}`);
}

async function getOAuthToken() {
  try {
    const response = await fetch(`${PROXY_URL}/api/gcloud-token`);
    const data = await response.json();
    if (data.success && data.token) return data.token;
  } catch (e) {}
  return execSync('gcloud auth print-access-token', { encoding: 'utf-8' }).trim();
}

function buildPremiumPrompt(variant) {
  return `${QUALITY_PREFIX}

MODEL: ${INDIAN_HOURGLASS_MUSE}

SETTING: ${COUCH_SETTING}

CONCEPT: ${variant.name} - Level ${variant.intimacyLevel} Intimacy
Category: ${variant.category}

WARDROBE: ${variant.wardrobe}

POSE: ${variant.pose}

LIGHTING: ${variant.lighting}

VISUAL FOCUS: ${variant.focus}

STYLE DIRECTION:
Fine art boudoir photography at its most expressive.
Maximum artistic expression through strategic minimal coverage.
Tasteful, sophisticated, museum-quality execution.
Celebrating the feminine form with reverence and artistic integrity.

TECHNICAL: 85mm lens, f/1.4, shallow depth of field with subject in perfect focus.
Full body composition emphasizing ${variant.focus}.

${QUALITY_SUFFIX}`;
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
    throw new Error(`API error: ${response.status} - ${errorText.slice(0, 300)}`);
  }

  const result = await response.json();

  if (!result.predictions || result.predictions.length === 0) {
    throw new Error('No predictions returned');
  }

  const prediction = result.predictions[0];

  if (prediction.bytesBase64Encoded) {
    const buffer = Buffer.from(prediction.bytesBase64Encoded, 'base64');
    fs.writeFileSync(outputPath, buffer);
    return { success: true, size: buffer.length };
  } else if (prediction.raiFilteredReason) {
    throw new Error(`Filtered: ${prediction.raiFilteredReason}`);
  } else {
    throw new Error('No image data in response');
  }
}

async function main() {
  console.log(`
╔══════════════════════════════════════════════════════════════════════════╗
║                                                                          ║
║   ██╗   ██╗███████╗██████╗  █████╗ ██╗      █████╗ ██████╗ ███████╗      ║
║   ██║   ██║██╔════╝██╔══██╗██╔══██╗██║     ██╔══██╗██╔══██╗██╔════╝      ║
║   ██║   ██║█████╗  ██████╔╝███████║██║     ███████║██████╔╝███████╗      ║
║   ╚██╗ ██╔╝██╔══╝  ██╔══██╗██╔══██║██║     ██╔══██║██╔══██╗╚════██║      ║
║    ╚████╔╝ ███████╗██║  ██║██║  ██║███████╗██║  ██║██████╔╝███████║      ║
║     ╚═══╝  ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═════╝ ╚══════╝      ║
║                                                                          ║
║    🔥 PREMIUM EDITORIAL COUCH SERIES 🔥                                   ║
║                                                                          ║
║   Level 9-10 Intimacy • Indian Hourglass Muse • Max-Mode Activated       ║
║   Helmut Newton × Annie Leibovitz × Mario Testino Style                  ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
  `);

  log('Authenticating with Vertex AI...');
  let oauthToken = await getOAuthToken();
  log('✅ OAuth token obtained');

  // Create output directories
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  const categories = ['decolletage_focus', 'lower_back_focus', 'full_body_reclined', 'creative_hybrid'];
  categories.forEach(cat => {
    fs.mkdirSync(path.join(OUTPUT_DIR, cat), { recursive: true });
  });

  const results = [];
  let successCount = 0;
  let failCount = 0;

  console.log(`\n${'═'.repeat(70)}`);
  log(`🔥 GENERATING ${PREMIUM_VARIANTS.length} PREMIUM EDITORIAL VARIANTS`);
  console.log(`${'═'.repeat(70)}\n`);

  for (let i = 0; i < PREMIUM_VARIANTS.length; i++) {
    const variant = PREMIUM_VARIANTS[i];
    const timestamp = Date.now();
    const categoryDir = variant.category.toLowerCase().replace(/ /g, '_');
    const outputPath = path.join(OUTPUT_DIR, categoryDir, `${variant.id}_${timestamp}.png`);

    console.log(`${'─'.repeat(70)}`);
    log(`🔥 [${i + 1}/${PREMIUM_VARIANTS.length}] ${variant.name}`);
    log(`   Category: ${variant.category} | Intimacy: Level ${variant.intimacyLevel}`);

    const prompt = buildPremiumPrompt(variant);

    try {
      // Refresh token every 4 images
      if (i > 0 && i % 4 === 0) {
        log('   🔄 Refreshing OAuth token...');
        oauthToken = await getOAuthToken();
      }

      const result = await generateImage(prompt, outputPath, oauthToken);
      const sizeMB = (result.size / 1024 / 1024).toFixed(2);
      log(`   ✅ Saved: ${path.basename(outputPath)} (${sizeMB} MB)`);

      results.push({
        id: variant.id,
        name: variant.name,
        category: variant.category,
        intimacyLevel: variant.intimacyLevel,
        path: outputPath,
        size: result.size,
        status: 'success'
      });
      successCount++;
    } catch (error) {
      log(`   ❌ Failed: ${error.message.slice(0, 80)}`);
      results.push({
        id: variant.id,
        name: variant.name,
        category: variant.category,
        intimacyLevel: variant.intimacyLevel,
        error: error.message,
        status: 'failed'
      });
      failCount++;

      // Longer wait after filtered/rate limit
      if (error.message.includes('429') || error.message.includes('Filtered')) {
        log(`   ⏳ Waiting 90s...`);
        await new Promise(r => setTimeout(r, 90000));
      }
    }

    // Rate limit delay
    if (i < PREMIUM_VARIANTS.length - 1) {
      log(`   ⏳ Waiting 25s for rate limit...`);
      await new Promise(r => setTimeout(r, 25000));
    }
  }

  // Save manifest
  const manifestPath = path.join(OUTPUT_DIR, 'premium-couch-manifest.json');
  const manifest = {
    timestamp: new Date().toISOString(),
    series: 'Premium Editorial Couch Series',
    model: 'Indian Hourglass Muse',
    style: 'Helmut Newton × Annie Leibovitz × Mario Testino',
    intimacyRange: '9-10',
    results
  };
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

  // Summary
  console.log(`\n${'═'.repeat(70)}`);
  console.log(`            PREMIUM EDITORIAL COUCH SERIES COMPLETE`);
  console.log(`${'═'.repeat(70)}`);
  console.log(`\n  ✅ Successful: ${successCount}`);
  console.log(`  ❌ Failed: ${failCount}`);
  console.log(`\n  Generated by category:`);

  const byCategory = {};
  results.filter(r => r.status === 'success').forEach(r => {
    if (!byCategory[r.category]) byCategory[r.category] = [];
    byCategory[r.category].push(r);
  });

  Object.entries(byCategory).forEach(([cat, items]) => {
    console.log(`     🔥 ${cat}: ${items.length} images`);
    items.forEach(item => {
      const sizeMB = (item.size / 1024 / 1024).toFixed(2);
      console.log(`        📸 ${item.name} (${sizeMB} MB)`);
    });
  });

  console.log(`\n  Output directory: ${OUTPUT_DIR}`);
  log(`📋 Manifest: ${manifestPath}`);
  console.log(`${'═'.repeat(70)}\n`);
}

main().catch(console.error);
