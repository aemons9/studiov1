#!/usr/bin/env node

/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  BRONZE METALLIC MESH 10+ INTIMATE COLLECTION
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *  Reference: Ideogram Indian Muse + Candlelit Fur Throw Aesthetics
 *  Focus: Bronze/Copper Metallic Mesh with Minimal Coverage
 *  Intimacy: 10+ Premium
 *
 *  Key Elements:
 *  - Bronze/copper metallic mesh (skin-tone amalgamation)
 *  - Fur throw/sheepskin surfaces
 *  - Candlelight + warm ambient lighting
 *  - Intimate poses: kneeling, seated, reclined, contemplative
 *
 * ═══════════════════════════════════════════════════════════════════════════
 */

import fs from 'fs';
import path from 'path';

const OUTPUT_DIR = '/home/ecolex/version1/generated-bronze-mesh-intimate';
const PROJECT_ID = 'zaranovel';
const LOCATION = 'us-central1';
const PROXY_URL = 'http://localhost:3001';

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// ═══════════════════════════════════════════════════════════════════════════
// INDIAN MUSE MODEL - EXACT FROM MESHMINIMAL
// ═══════════════════════════════════════════════════════════════════════════

const INDIAN_MUSE = `Stunning Indian muse with striking angular features and captivating intense gaze, sun-kissed bronze skin with golden undertones and visible natural texture, dramatic statuesque high fashion model physique with elegant proportions, tall 5'8" frame with graceful elongated limbs, sleek black hair pulled back in sophisticated low bun, strong defined cheekbones and jawline, full natural lips, dark expressive almond eyes, visible collarbones and elegant neck, natural matte skin finish with authentic texture and fine pores, age 24-28`;

// ═══════════════════════════════════════════════════════════════════════════
// BRONZE METALLIC MESH WARDROBES - MINIMAL COVERAGE 10+
// ═══════════════════════════════════════════════════════════════════════════

const BRONZE_WARDROBES = {
  bronze_chainmail_minimal: {
    name: 'Bronze Chainmail Minimal',
    description: `ultra-minimal bronze metallic chainmail bikini set, fine interlocking metal rings in warm copper-bronze tone matching skin undertones, thin chain straps, minimal triangle coverage, high-cut design, metal catching warm light with subtle shimmer, amalgamative skin-tone harmony`
  },

  copper_mesh_bodychain: {
    name: 'Copper Mesh Bodychain',
    description: `delicate copper mesh body chain with strategic minimal panels, fine bronze metallic mesh draped across torso creating web-like pattern, thin chains connecting minimal coverage points, skin visible through open mesh design, warm metallic glow matching bronze skin`
  },

  bronze_scale_micro: {
    name: 'Bronze Scale Micro Set',
    description: `micro bronze scale-textured bikini with fish-scale metallic finish, minimal coverage triangles in warm copper tone, thin metallic straps, iridescent bronze shimmer catching candlelight, barely-there aesthetic with luxurious metallic texture`
  },

  antique_bronze_drape: {
    name: 'Antique Bronze Mesh Drape',
    description: `flowing antique bronze mesh fabric draped minimally across body, single-shoulder asymmetric design with strategic draping, sheer metallic mesh revealing skin beneath, warm patina tones harmonizing with bronze skin, artistic textile sculpture`
  },

  rose_gold_whisper: {
    name: 'Rose Gold Whisper Mesh',
    description: `ultra-sheer rose gold metallic mesh slip, whisper-thin fabric barely visible against skin, thin spaghetti straps, thigh-length with high side slit, pink-gold metallic sheen catching warm light, near-invisible minimal coverage`
  },

  burnished_copper_cage: {
    name: 'Burnished Copper Cage',
    description: `architectural burnished copper strappy set with cage-like geometric design, thin metallic bands creating open framework pattern, minimal triangular coverage at key points, copper tone matching skin warmth, avant-garde metallic structure`
  }
};

// ═══════════════════════════════════════════════════════════════════════════
// INTIMATE POSES - FROM REFERENCE IMAGES
// ═══════════════════════════════════════════════════════════════════════════

const INTIMATE_POSES = {
  kneeling_worship: {
    name: 'Kneeling Worship',
    description: `kneeling on plush fur throw, sitting back on heels, head tilted upward with eyes closed in serene expression, arms resting on thighs, spine elongated, chest lifted, contemplative goddess energy, soft vulnerable beauty`
  },

  seated_embrace: {
    name: 'Seated Embrace',
    description: `seated on fur throw with knees drawn up to chest, arms wrapped around legs in self-embrace, chin resting on knee, contemplative sideways gaze, body creating compact intimate form, vulnerable introspective mood`
  },

  side_recline_fur: {
    name: 'Side Recline on Fur',
    description: `lying on side on luxurious fur throw, head propped on hand, other arm draped along body curve, legs slightly overlapping, body creating flowing S-curve, intimate direct eye contact, sensual relaxed elegance`
  },

  back_recline_gaze: {
    name: 'Back Recline with Upward Gaze',
    description: `reclining back on fur throw supported by both hands behind, head tilted back with upward gaze, legs extended and slightly parted, torso arched gracefully, exposed throat line, surrendered vulnerable beauty`
  },

  kneeling_forward: {
    name: 'Kneeling Forward Lean',
    description: `kneeling on fur with weight forward on hands, back arched in feline stretch, head raised with direct intense gaze at camera, hair falling forward, primal sensual energy, curves emphasized by pose`
  },

  seated_twist: {
    name: 'Seated Twist',
    description: `seated on fur throw with legs to one side, torso twisted toward camera, one hand on floor for support, other arm relaxed, looking over shoulder with sultry gaze, elegant spiral body line`
  },

  prone_artistic: {
    name: 'Prone on Fur',
    description: `lying prone on plush fur throw, weight on forearms, upper body lifted, chin resting on hands, legs bent at knees with feet raised, direct forward gaze, classical odalisque reimagined`
  },

  floor_stretch: {
    name: 'Floor Artistic Stretch',
    description: `lying on fur throw with one leg extended, other knee bent, arms positioned gracefully above head in languid stretch, torso slightly arched, head turned toward camera, serpentine body line`
  }
};

// ═══════════════════════════════════════════════════════════════════════════
// ENVIRONMENTS - CANDLELIT LUXURY + WOODEN CABIN
// ═══════════════════════════════════════════════════════════════════════════

const ENVIRONMENTS = {
  candlelit_chamber: {
    name: 'Candlelit Chamber',
    description: `dark luxurious private chamber with charcoal grey walls, multiple candelabras with flickering candles, ornate brass candle holders, plush cream fur throw on floor, silver-grey silk drapery, intimate candlelit atmosphere, warm golden glow throughout`
  },

  wooden_cabin_fur: {
    name: 'Wooden Cabin with Fur',
    description: `Victorian-modern minimalist wooden cabin with warm honey-toned wood walls, large plush sheepskin rug on wooden floor, soft morning light through windows, edison bulb ambient lighting, rustic luxury intimate atmosphere`
  },

  industrial_warm: {
    name: 'Industrial Loft Warm',
    description: `modern industrial loft with exposed pipes and beams, large fur throw on polished wooden floor, warm side lighting from vintage industrial lamp, raw concrete and metal contrasting with soft fur, intimate urban luxury`
  }
};

// ═══════════════════════════════════════════════════════════════════════════
// LIGHTING STYLES
// ═══════════════════════════════════════════════════════════════════════════

const LIGHTING = {
  candlelight_golden: {
    name: 'Candlelight Golden',
    description: `warm golden candlelight from multiple sources, flickering flame creating dancing highlights on metallic mesh and skin, deep shadows, intimate romantic atmosphere, rich warm color temperature`
  },

  rembrandt_warm: {
    name: 'Rembrandt Warm',
    description: `Rembrandt style lighting with golden warmth, soft directional light creating triangle highlight under eye, subtle shadows sculpting features, professional 3-point feel with natural warmth`
  },

  soft_window_morning: {
    name: 'Soft Window Morning',
    description: `soft morning window light with gentle diffusion, warm golden hour quality, subtle shadows preserving depth, flattering beauty lighting on metallic surfaces`
  },

  dramatic_single: {
    name: 'Dramatic Single Source',
    description: `dramatic single source side lighting, deep chiaroscuro shadows, strong contrast highlighting metallic mesh texture, cinematic mood, rim light defining silhouette`
  }
};

// ═══════════════════════════════════════════════════════════════════════════
// GENERATE VARIANTS - CURATED COMBINATIONS
// ═══════════════════════════════════════════════════════════════════════════

const VARIANTS = [
  // Candlelit Chamber Series
  { wardrobe: 'bronze_chainmail_minimal', pose: 'kneeling_worship', env: 'candlelit_chamber', light: 'candlelight_golden' },
  { wardrobe: 'bronze_chainmail_minimal', pose: 'side_recline_fur', env: 'candlelit_chamber', light: 'candlelight_golden' },
  { wardrobe: 'copper_mesh_bodychain', pose: 'back_recline_gaze', env: 'candlelit_chamber', light: 'candlelight_golden' },
  { wardrobe: 'copper_mesh_bodychain', pose: 'seated_embrace', env: 'candlelit_chamber', light: 'dramatic_single' },
  { wardrobe: 'antique_bronze_drape', pose: 'kneeling_forward', env: 'candlelit_chamber', light: 'candlelight_golden' },
  { wardrobe: 'rose_gold_whisper', pose: 'prone_artistic', env: 'candlelit_chamber', light: 'candlelight_golden' },

  // Wooden Cabin Series
  { wardrobe: 'bronze_scale_micro', pose: 'floor_stretch', env: 'wooden_cabin_fur', light: 'soft_window_morning' },
  { wardrobe: 'bronze_scale_micro', pose: 'seated_twist', env: 'wooden_cabin_fur', light: 'rembrandt_warm' },
  { wardrobe: 'burnished_copper_cage', pose: 'kneeling_worship', env: 'wooden_cabin_fur', light: 'rembrandt_warm' },
  { wardrobe: 'burnished_copper_cage', pose: 'side_recline_fur', env: 'wooden_cabin_fur', light: 'soft_window_morning' },
  { wardrobe: 'antique_bronze_drape', pose: 'seated_embrace', env: 'wooden_cabin_fur', light: 'soft_window_morning' },
  { wardrobe: 'rose_gold_whisper', pose: 'floor_stretch', env: 'wooden_cabin_fur', light: 'rembrandt_warm' },

  // Industrial Loft Series
  { wardrobe: 'bronze_chainmail_minimal', pose: 'seated_embrace', env: 'industrial_warm', light: 'dramatic_single' },
  { wardrobe: 'copper_mesh_bodychain', pose: 'kneeling_forward', env: 'industrial_warm', light: 'dramatic_single' },
  { wardrobe: 'bronze_scale_micro', pose: 'prone_artistic', env: 'industrial_warm', light: 'rembrandt_warm' },
  { wardrobe: 'burnished_copper_cage', pose: 'back_recline_gaze', env: 'industrial_warm', light: 'dramatic_single' },
];

// ═══════════════════════════════════════════════════════════════════════════
// PROMPT BUILDER
// ═══════════════════════════════════════════════════════════════════════════

function buildPrompt(variant) {
  const wardrobe = BRONZE_WARDROBES[variant.wardrobe];
  const pose = INTIMATE_POSES[variant.pose];
  const env = ENVIRONMENTS[variant.env];
  const light = LIGHTING[variant.light];

  return `Award-winning fine art boudoir photography by Helmut Newton and Peter Lindbergh, museum-quality masterpiece, Canon EOS R5 with 85mm f/1.4,

${INDIAN_MUSE},

wearing ${wardrobe.description},

${pose.description},

in ${env.description},

${light.description},

bronze metallic harmonizing with sun-kissed skin creating amalgamative beauty, intimate private artistic exploration, premium 10+ sensuality with tasteful artistic framing, hyper-detailed with authentic skin texture and visible pores, photo-realistic fabric physics on metallic mesh, professional color grading with cinematic warmth, shallow DOF f/1.4, 8K resolution`;
}

// ═══════════════════════════════════════════════════════════════════════════
// VERTEX AI GENERATION
// ═══════════════════════════════════════════════════════════════════════════

async function getOAuthToken() {
  const response = await fetch(`${PROXY_URL}/api/gcloud-token`);
  const data = await response.json();
  if (data.success && data.token) return data.token;
  throw new Error('Failed to get OAuth token');
}

async function generateImage(prompt, outputPath, token) {
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
    const error = await response.text();
    throw new Error(`API error: ${response.status} - ${error.slice(0, 150)}`);
  }

  const result = await response.json();
  const prediction = result.predictions?.[0];

  if (prediction?.bytesBase64Encoded) {
    const buffer = Buffer.from(prediction.bytesBase64Encoded, 'base64');
    fs.writeFileSync(outputPath, buffer);
    return { success: true, size: buffer.length };
  }

  if (prediction?.raiFilteredReason) {
    throw new Error(`Filtered: ${prediction.raiFilteredReason}`);
  }

  throw new Error('No image data');
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════════════════

async function main() {
  console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║  ██████╗ ██████╗  ██████╗ ███╗   ██╗███████╗███████╗                         ║
║  ██╔══██╗██╔══██╗██╔═══██╗████╗  ██║╚══███╔╝██╔════╝                         ║
║  ██████╔╝██████╔╝██║   ██║██╔██╗ ██║  ███╔╝ █████╗                           ║
║  ██╔══██╗██╔══██╗██║   ██║██║╚██╗██║ ███╔╝  ██╔══╝                           ║
║  ██████╔╝██║  ██║╚██████╔╝██║ ╚████║███████╗███████╗                         ║
║  ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝╚══════╝                         ║
║                                                                              ║
║         ✨ BRONZE METALLIC MESH 10+ INTIMATE COLLECTION ✨                   ║
║                                                                              ║
║    Model: Ideogram Indian Muse                                               ║
║    Focus: Bronze/Copper Metallic Mesh • Minimal Coverage                     ║
║    Surfaces: Fur Throw • Sheepskin • Plush Textures                         ║
║                                                                              ║
║    WARDROBES: Chainmail | Bodychain | Scale | Drape | Whisper | Cage        ║
║    ENVIRONMENTS: Candlelit Chamber | Wooden Cabin | Industrial Loft         ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
  `);

  console.log(`[${new Date().toLocaleTimeString()}] Authenticating with Vertex AI...`);
  let token = await getOAuthToken();
  console.log(`[${new Date().toLocaleTimeString()}] ✅ OAuth token obtained\n`);

  console.log('══════════════════════════════════════════════════════════════════════════════');
  console.log(`[${new Date().toLocaleTimeString()}] ✨ GENERATING ${VARIANTS.length} BRONZE MESH 10+ VARIANTS`);
  console.log('══════════════════════════════════════════════════════════════════════════════\n');

  const results = { successful: [], failed: [] };

  for (let i = 0; i < VARIANTS.length; i++) {
    const v = VARIANTS[i];
    const wardrobe = BRONZE_WARDROBES[v.wardrobe];
    const pose = INTIMATE_POSES[v.pose];
    const env = ENVIRONMENTS[v.env];

    if (i > 0 && i % 4 === 0) {
      console.log(`[${new Date().toLocaleTimeString()}] 🔄 Refreshing OAuth token...`);
      token = await getOAuthToken();
    }

    console.log('──────────────────────────────────────────────────────────────────────────────');
    console.log(`[${new Date().toLocaleTimeString()}] ✨ [${i + 1}/${VARIANTS.length}] ${wardrobe.name} - ${pose.name}`);
    console.log(`[${new Date().toLocaleTimeString()}]    Environment: ${env.name}`);

    const prompt = buildPrompt(v);
    const filename = `bronze_${v.wardrobe}_${v.pose}_${v.env}_${i}_${Date.now()}.png`;
    const filepath = path.join(OUTPUT_DIR, filename);

    try {
      const result = await generateImage(prompt, filepath, token);
      const sizeMB = (result.size / (1024 * 1024)).toFixed(2);
      console.log(`[${new Date().toLocaleTimeString()}]    ✅ Saved: ${filename} (${sizeMB} MB)`);
      results.successful.push({ ...v, filename, sizeMB, wardrobeName: wardrobe.name, poseName: pose.name });
    } catch (error) {
      console.log(`[${new Date().toLocaleTimeString()}]    ❌ Failed: ${error.message}`);
      results.failed.push({ ...v, error: error.message });
      if (error.message.includes('Filtered') || error.message.includes('429')) {
        console.log(`[${new Date().toLocaleTimeString()}]    ⏳ Waiting 90s...`);
        await new Promise(r => setTimeout(r, 90000));
      }
    }

    console.log(`[${new Date().toLocaleTimeString()}]    ⏳ Waiting 25s...`);
    await new Promise(r => setTimeout(r, 25000));
  }

  // Summary
  console.log('\n══════════════════════════════════════════════════════════════════════════════');
  console.log('              BRONZE METALLIC MESH 10+ COMPLETE');
  console.log('══════════════════════════════════════════════════════════════════════════════\n');

  console.log(`  ✅ Successful: ${results.successful.length}`);
  console.log(`  ❌ Failed: ${results.failed.length}\n`);

  for (const img of results.successful) {
    console.log(`     📸 ${img.wardrobeName} - ${img.poseName} (${img.sizeMB} MB)`);
  }

  console.log(`\n  Output: ${OUTPUT_DIR}`);
  console.log('══════════════════════════════════════════════════════════════════════════════\n');

  // Save manifest
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'bronze-mesh-manifest.json'),
    JSON.stringify({ collection: 'Bronze Metallic Mesh 10+ Intimate', generated: new Date().toISOString(), ...results }, null, 2)
  );
  console.log(`[${new Date().toLocaleTimeString()}] 📋 Manifest saved\n`);
}

main().catch(console.error);
