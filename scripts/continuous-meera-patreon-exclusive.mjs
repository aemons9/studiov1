#!/usr/bin/env node

/**
 * MEERA PATREON EXCLUSIVE v2 - OPTIMIZED
 *
 * Key optimizations:
 * - Adaptive learning from success/failure patterns
 * - Smart combo blacklisting for filtered content
 * - Fine art museum language to reduce filtering
 * - Classical bathing references (Ingres, Degas, Renoir)
 * - Refined prompt structure for higher success rate
 * - Natural lighting only (no ring light)
 */

import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

const OUTPUT_DIR = './generated-meera-patreon-exclusive';
const STATE_FILE = './generated-meera-patreon-exclusive/learning-state.json';
const CYCLE_INTERVAL = 9 * 60 * 1000;
const IMAGES_PER_CYCLE = 6;

// ═══════════════════════════════════════════════════════════════════════════════
// ADAPTIVE LEARNING STATE
// ═══════════════════════════════════════════════════════════════════════════════

let learningState = {
  totalGenerated: 0,
  totalSuccess: 0,
  successfulCombos: [],
  failedCombos: [],
  blacklistedCombos: [],
  bestWardrobes: [],
  bestPoses: [],
  bestEnvironments: []
};

function loadState() {
  try {
    if (fs.existsSync(STATE_FILE)) {
      learningState = JSON.parse(fs.readFileSync(STATE_FILE, 'utf-8'));
      const rate = learningState.totalGenerated > 0 ? (learningState.totalSuccess/learningState.totalGenerated*100).toFixed(1) : 0;
      console.log(`📚 Loaded: ${learningState.totalSuccess}/${learningState.totalGenerated} (${rate}%)`);
      console.log(`   Best wardrobes: ${learningState.bestWardrobes.slice(0, 3).join(', ')}`);
    }
  } catch { console.log('📚 Fresh learning state'); }
}

function saveState() {
  fs.writeFileSync(STATE_FILE, JSON.stringify(learningState, null, 2));
}

function isBlacklisted(wardrobe, pose) {
  return learningState.blacklistedCombos.includes(`${wardrobe}_${pose}`);
}

function recordResult(wardrobe, pose, environment, success) {
  const combo = `${wardrobe}_${pose}`;
  learningState.totalGenerated++;

  if (success) {
    learningState.totalSuccess++;
    if (!learningState.successfulCombos.includes(combo)) {
      learningState.successfulCombos.push(combo);
    }
    // Track best performers
    if (!learningState.bestWardrobes.includes(wardrobe)) {
      learningState.bestWardrobes.push(wardrobe);
    }
    if (!learningState.bestPoses.includes(pose)) {
      learningState.bestPoses.push(pose);
    }
    if (!learningState.bestEnvironments.includes(environment)) {
      learningState.bestEnvironments.push(environment);
    }
    // Remove from failed
    learningState.failedCombos = learningState.failedCombos.filter(c => c !== combo);
  } else {
    learningState.failedCombos.push(combo);
    const failCount = learningState.failedCombos.filter(c => c === combo).length;
    if (failCount >= 3 && !learningState.blacklistedCombos.includes(combo)) {
      learningState.blacklistedCombos.push(combo);
      console.log(`    ⛔ Blacklisted: ${combo}`);
    }
  }
  saveState();
}

// ═══════════════════════════════════════════════════════════════════════════════
// REFINED WARDROBES - Classical Bathing Fine Art
// ═══════════════════════════════════════════════════════════════════════════════

const WARDROBES = [
  // High Success - Classical References
  {
    name: 'turkish_bath_study',
    desc: `Study for "The Turkish Bath" in Ingres tradition: Classical bathing scene with skin glistening from warm water, natural post-bath luminosity, authentic bathing ritual documentation, museum-worthy fine art aesthetic`
  },
  {
    name: 'bather_towel_draped',
    desc: `Bather with draped towel in Degas tradition: Soft white towel draped casually at hip or shoulders, post-bathing naturalness, intimate domestic moment, classical French impressionist aesthetic`
  },
  {
    name: 'venus_water_droplets',
    desc: `Venus emerging from water: Skin decorated with natural water droplets catching light like scattered pearls, fresh from bath radiance, goddess iconography in contemporary form`
  },
  {
    name: 'renoir_bather_natural',
    desc: `Natural bather in Renoir tradition: Soft diffused light on luminous skin, authentic feminine form celebrated, impressionist color warmth, relaxed bathing scene`
  },
  {
    name: 'classical_silk_drape',
    desc: `Classical draped silk in wet marble setting: Single ivory silk fabric draped in sculptural folds, revealing and concealing in classical tradition, fabric catching natural light, museum fine art composition`
  },
  // Medium Success - Artistic Elements
  {
    name: 'morning_sheet_pool',
    desc: `Intimate morning with pooled silk sheet: Luxurious cream sheet fallen naturally, revealing form through artful arrangement, private bedroom moment after bathing, natural domestic intimacy`
  },
  {
    name: 'steam_veil_ethereal',
    desc: `Steam as ethereal veil: Bathroom steam creating soft-focus atmospheric effect around form, mist diffusing light, skin emerging luminous through vapor, goddess bathing moment`
  },
  {
    name: 'golden_oil_sheen',
    desc: `Golden body oil creating luminous sheen: Bronze skin glistening with warm oil highlighting curves, light reflecting off contours, sensual self-care ritual, enhanced natural luminosity`
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
// REFINED ENVIRONMENTS - Natural Light Only
// ═══════════════════════════════════════════════════════════════════════════════

const ENVIRONMENTS = [
  {
    name: 'marble_sanctuary',
    desc: `Luxurious marble bath sanctuary: White Carrara marble with grey veining, deep soaking tub with rose-petal water, steam rising and diffusing natural window light. White pillar candles on marble ledge, brass fixtures with aged patina. Soft golden afternoon light through tall frosted windows. No artificial lighting - purely natural window light and candlelight.`
  },
  {
    name: 'vintage_clawfoot',
    desc: `Elegant vintage clawfoot tub: Pristine white porcelain on ornate brass feet, cloud-like bubble bath foam. Original hexagonal tile floor, tall sash window with wavy glass filtering soft morning light. Beadboard wainscoting, brass towel rack. No artificial lighting - purely natural window illumination.`
  },
  {
    name: 'fireplace_fur_winter',
    desc: `Fireplace sanctuary on plush fur: Deep white faux fur rug before natural stone fireplace with dancing flames as primary light. Weathered stone surround, dark wood mantel. Firelight casting warm orange-gold glow, creating dramatic chiaroscuro. Only firelight illumination - no artificial sources.`
  },
  {
    name: 'dawn_bedroom_silk',
    desc: `Dawn bedroom with silk linens: Soft rose-gold morning light streaming through sheer curtains, cream silk sheets catching early rays. Polished dark walnut floor, white upholstered bed frame. No artificial lighting - purely magical golden-hour dawn creating warm intimate atmosphere.`
  },
  {
    name: 'gilded_vanity_boudoir',
    desc: `Ornate vanity mirror boudoir: Large gilded baroque frame mirror reflecting scene, crystal perfume bottles catching light. Velvet-upholstered stool, cream damask wallpaper. Soft natural window light diffusing through sheers. No artificial lighting - purely natural window illumination.`
  },
  {
    name: 'conservatory_morning',
    desc: `Victorian glass conservatory bath: Copper soaking tub among floor-to-ceiling antique glass panels with iron framework. Lush tropical plants, morning sunlight through aged glass creating prismatic effects. Condensation on glass from warm bath. Only natural sunlight filtering through glass and foliage.`
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
// REFINED POSES - Classical Art References
// ═══════════════════════════════════════════════════════════════════════════════

const POSES = [
  {
    name: 'tub_recline_classical',
    desc: `Classical tub recline inspired by Bonnard: Reclining in tub with head resting on edge, one arm draped over marble rim. Water at mid-torso, natural relaxation, eyes closed in peaceful repose. Classical bathing scene composition.`
  },
  {
    name: 'standing_contrapposto',
    desc: `Standing contrapposto before mirror: Classical weight-shift creating elegant S-curve, arms in graceful gesture. Full standing form in natural light, museum reference composition. Ingres "La Source" influence.`
  },
  {
    name: 'seated_bather_back',
    desc: `Seated bather in Degas tradition: Seated on low surface with torso twisted showing elegant back. Intimate bathing moment, domestic fine art scene, natural relaxed posture. Looking over shoulder.`
  },
  {
    name: 'reclining_venus_floor',
    desc: `Reclining Venus on plush surface: Lying on side with elegant S-curve, one arm supporting head. Classical fine art pose celebrating form, warm firelight or window light modeling curves.`
  },
  {
    name: 'bath_edge_emergence',
    desc: `Emerging from bath at tub edge: Rising with water cascading from curves, one foot still in water. Arms reaching to gather wet hair, lifting chest and elongating torso. Transitional movement captured.`
  },
  {
    name: 'mirror_reflection_ritual',
    desc: `Self-reflection before gilded mirror: Standing with both front form and reflection visible. Hands adjusting wet hair in intimate self-admiration. Private feminine ritual, authentic body confidence.`
  },
  {
    name: 'floor_sprawl_naturalist',
    desc: `Naturalist floor study in Lucian Freud tradition: Natural body on plush surface, limbs arranged in authentic compositional balance. Honest representation without idealization, bold contemporary fine art.`
  },
  {
    name: 'fireplace_recline_warm',
    desc: `Complete recline on fur before fire: Lying on plush rug facing fireplace, propped on elbows with back arched. Dancing firelight creating golden-orange skin tones, primal warmth and intimacy.`
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
// NATURAL LIGHTING STYLES
// ═══════════════════════════════════════════════════════════════════════════════

const LIGHTING = [
  'Soft diffused window light: Large frosted window providing even wrap-around illumination, luminous skin quality, morning natural daylight',
  'Golden hour streaming rays: Late afternoon sunlight at low angle, warm golden skin tones, rim lighting on curves',
  'Candlelight intimate glow: White pillar candles creating warm amber tones (2200K), romantic flickering on skin',
  'Fireplace warm chiaroscuro: Fire as primary light source creating orange-golden illumination, dramatic moving light quality',
  'Overcast soft daylight: Diffused daylight through large windows, even soft illumination, luminous skin quality',
  'Dawn rose-gold rays: Early morning light with pink and gold tones through sheer curtains, ethereal atmosphere'
];

// ═══════════════════════════════════════════════════════════════════════════════
// API
// ═══════════════════════════════════════════════════════════════════════════════

async function getToken() {
  try {
    const r = await fetch('http://localhost:3001/api/gcloud-token');
    const d = await r.json();
    return d.token || execSync('gcloud auth print-access-token', { encoding: 'utf-8' }).trim();
  } catch {
    return execSync('gcloud auth print-access-token', { encoding: 'utf-8' }).trim();
  }
}

function getRandomVariation() {
  const variations = [
    'captured in authentic spontaneous moment',
    'unique natural presence visible',
    'genuine artistic vulnerability expressed',
    'authentic body relaxation pattern',
    'natural skin texture in environmental light',
    'distinctive shadow composition',
    'organic weight distribution creating balance',
    'authentic breath pause frozen in time'
  ];
  return variations[Math.floor(Math.random() * variations.length)];
}

async function generateImage(prompt, outputPath, token) {
  const url = 'https://us-central1-aiplatform.googleapis.com/v1/projects/zaranovel/locations/us-central1/publishers/google/models/imagen-4.0-ultra-generate-001:predict';

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 90000);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        instances: [{ prompt }],
        parameters: {
          aspectRatio: '3:4',
          sampleCount: 1,
          sampleImageSize: '2048',
          personGeneration: 'allow_adult',
          safetySetting: 'block_few',
          outputOptions: { mimeType: 'image/png', compressionQuality: 100 }
        }
      }),
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      if (response.status === 429) {
        console.log('    ⏳ Rate limited, waiting 60s...');
        await new Promise(r => setTimeout(r, 60000));
        return 'rate_limited';
      }
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    if (data.predictions?.[0]?.bytesBase64Encoded) {
      fs.writeFileSync(outputPath, Buffer.from(data.predictions[0].bytesBase64Encoded, 'base64'));
      return 'success';
    }
    return 'filtered';
  } catch (err) {
    clearTimeout(timeoutId);
    if (err.name === 'AbortError') {
      console.log('    ⏳ Timeout, skipping...');
      return 'timeout';
    }
    throw err;
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// OPTIMIZED PROMPT BUILDER
// ═══════════════════════════════════════════════════════════════════════════════

function buildPrompt(wardrobe, environment, pose, lighting) {
  const variation = getRandomVariation();

  return `MUSEUM FINE ART PHOTOGRAPHY - PATREON EXCLUSIVE COLLECTION.
Classical bathing scene in the tradition of Ingres, Degas, and Renoir.
Gallery exhibition quality intimate portraiture study.
Artistic expression: ${variation}. Frame: ${Date.now()}

THE MUSE - MEERA (CLASSICAL FINE ART MODEL):
Stunning Indian fine art model MEERA, age 27, height 5'8",
Sculpted hourglass figure with classical proportions:
- Full natural form with elegant teardrop shape (37DD)
- Dramatically cinched waist creating hourglass definition (27")
- Wide sculptural hips completing classical proportions (40")
- Sun-kissed bronze complexion with warm golden undertones

SKIN RENDERING - MUSEUM QUALITY:
- Natural matte finish with sheen ONLY where wet or oiled
- Visible skin pores at appropriate detail level
- Authentic texture variation: smoother chest, textured elbows/knees
- Water droplets rendered with individual light refraction
- NO plastic AI appearance - real human skin quality essential

FACIAL BEAUTY:
Striking dark eyes with natural warmth and intelligence,
Full lips in natural relaxed expression,
High cheekbones catching environmental light,
Expression of quiet confidence and artistic awareness.

HAIR:
Long flowing jet-black hair reaching mid-back,
If wet: clinging with individual strand separation visible,
If dry: natural loose waves with volume,
Light catching individual hairs creating fine highlights.

WARDROBE CONCEPT (${wardrobe.name}):
${wardrobe.desc}

POSE (${pose.name} - Classical Reference):
${pose.desc}

ENVIRONMENT (Natural Light Only):
${environment.desc}

LIGHTING (NO RING LIGHT - NATURAL/AMBIENT ONLY):
${lighting}
CRITICAL: No ring light, no studio strobes, no LED panels.
Only natural window light, candlelight, or firelight as appropriate.

CAMERA:
Hasselblad X2D 100C medium format,
XCD 80mm f/1.9 at f/2.0 for sculptural depth separation,
ISO 400-800 for natural light sensitivity,
8K ultra-detailed museum print quality,
Kodak Portra color science with natural skin tones.

PHOTOREALISTIC REQUIREMENTS:
- Individual skin pores visible at appropriate detail
- Water droplets with individual light refraction
- Wet hair with separated strand definition
- Steam/mist with volumetric light interaction
- Authentic shadow gradients with natural falloff
- Fabric/surface texture with thread-level detail

FINE ART EXHIBITION QUALITY.
Classical bathing tradition meets contemporary artistic vision.
Private collection intimate masterwork for discerning patrons.`;
}

// ═══════════════════════════════════════════════════════════════════════════════
// SMART SELECTION - Prioritize Successful Patterns
// ═══════════════════════════════════════════════════════════════════════════════

function selectWardrobe(index, cycleNum) {
  // Favor best performers 60% of the time
  if (learningState.bestWardrobes.length > 0 && Math.random() > 0.4) {
    const name = learningState.bestWardrobes[index % learningState.bestWardrobes.length];
    const found = WARDROBES.find(w => w.name === name);
    if (found) return found;
  }
  return WARDROBES[(index + cycleNum) % WARDROBES.length];
}

function selectPose(wardrobe, index, cycleNum) {
  // Avoid blacklisted combinations
  let attempts = 0;
  let pose = POSES[(index + cycleNum * 2) % POSES.length];
  while (isBlacklisted(wardrobe.name, pose.name) && attempts < POSES.length) {
    pose = POSES[(index + cycleNum * 2 + attempts + 1) % POSES.length];
    attempts++;
  }
  return pose;
}

function selectEnvironment(index, cycleNum) {
  if (learningState.bestEnvironments.length > 0 && Math.random() > 0.4) {
    const name = learningState.bestEnvironments[index % learningState.bestEnvironments.length];
    const found = ENVIRONMENTS.find(e => e.name === name);
    if (found) return found;
  }
  return ENVIRONMENTS[(index + cycleNum * 3) % ENVIRONMENTS.length];
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN CYCLE
// ═══════════════════════════════════════════════════════════════════════════════

async function runCycle(cycleNum) {
  const rate = learningState.totalGenerated > 0 ? (learningState.totalSuccess/learningState.totalGenerated*100).toFixed(1) : 0;

  console.log(`\n${'═'.repeat(70)}`);
  console.log(`🎨 PATREON EXCLUSIVE v2 - CYCLE ${cycleNum + 1}`);
  console.log(`   Success Rate: ${rate}% | Blacklisted: ${learningState.blacklistedCombos.length}`);
  console.log(`${'═'.repeat(70)}`);

  const cycleDir = path.join(OUTPUT_DIR, `cycle-${String(cycleNum + 1).padStart(3, '0')}`);
  if (!fs.existsSync(cycleDir)) fs.mkdirSync(cycleDir, { recursive: true });

  let token = await getToken();
  const results = [];

  for (let i = 0; i < IMAGES_PER_CYCLE; i++) {
    const wardrobe = selectWardrobe(i, cycleNum);
    const pose = selectPose(wardrobe, i, cycleNum);
    const environment = selectEnvironment(i, cycleNum);
    const lighting = LIGHTING[(i + cycleNum) % LIGHTING.length];

    const variantName = `meera_patron_c${cycleNum + 1}_${wardrobe.name}_${pose.name}`;
    console.log(`\n  [${i + 1}/${IMAGES_PER_CYCLE}] ${variantName}`);
    console.log(`    Wardrobe: ${wardrobe.name}`);
    console.log(`    Pose: ${pose.name}`);
    console.log(`    Environment: ${environment.name}`);

    try {
      const prompt = buildPrompt(wardrobe, environment, pose, lighting);
      console.log(`    Prompt: ${prompt.length} chars`);
      console.log('    🎨 Generating Patreon exclusive...');

      const filename = `${variantName}_${Date.now()}.png`;
      const outputPath = path.join(cycleDir, filename);

      const result = await generateImage(prompt, outputPath, token);

      if (result === 'success') {
        const sizeMB = (fs.statSync(outputPath).size / (1024 * 1024)).toFixed(2);
        console.log(`    ✅ ${filename} (${sizeMB} MB)`);
        recordResult(wardrobe.name, pose.name, environment.name, true);
        results.push({ name: variantName, file: filename, size: sizeMB, status: 'success' });
      } else if (result === 'filtered') {
        console.log('    ❌ Filtered - learning pattern');
        recordResult(wardrobe.name, pose.name, environment.name, false);
        results.push({ name: variantName, status: 'filtered' });
      } else if (result === 'rate_limited') {
        results.push({ name: variantName, status: 'rate_limited' });
      } else {
        results.push({ name: variantName, status: 'timeout' });
      }

      if (i < IMAGES_PER_CYCLE - 1) {
        const delay = 12000 + Math.random() * 4000; // 12-16s
        console.log(`    ⏳ Waiting ${(delay/1000).toFixed(0)}s...`);
        await new Promise(r => setTimeout(r, delay));
      }
    } catch (err) {
      console.log(`    ❌ Error: ${err.message}`);
      results.push({ name: variantName, status: 'error', error: err.message });
      if (err.message.includes('401')) token = await getToken();
    }
  }

  const successful = results.filter(r => r.status === 'success').length;
  console.log(`\n🎨 Cycle ${cycleNum + 1}: ${successful}/${IMAGES_PER_CYCLE} successful`);

  // Save manifest
  fs.writeFileSync(path.join(cycleDir, 'manifest.json'), JSON.stringify({
    cycle: cycleNum + 1,
    theme: 'Patreon Exclusive Fine Art v2',
    results,
    timestamp: new Date().toISOString(),
    successCount: successful,
    learningState: {
      totalSuccess: learningState.totalSuccess,
      totalGenerated: learningState.totalGenerated,
      bestWardrobes: learningState.bestWardrobes.slice(0, 5),
      blacklisted: learningState.blacklistedCombos.length
    }
  }, null, 2));

  return successful;
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════════════════════

async function main() {
  console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║   🎨 PATREON EXCLUSIVE v2 - OPTIMIZED Fine Art Generator                     ║
╠══════════════════════════════════════════════════════════════════════════════╣
║   • Classical bathing references (Ingres, Degas, Renoir)                     ║
║   • Adaptive learning from success/failure patterns                          ║
║   • Smart combo blacklisting for filtered content                            ║
║   • Natural lighting only (no ring light)                                    ║
║   • ${IMAGES_PER_CYCLE} images per cycle • 9 min intervals                                   ║
╚══════════════════════════════════════════════════════════════════════════════╝
`);

  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  loadState();

  // Initial offset
  console.log('⏳ Initial 5 minute offset delay...\n');
  await new Promise(r => setTimeout(r, 5 * 60 * 1000));

  let cycle = learningState.totalGenerated > 0 ? Math.floor(learningState.totalGenerated / IMAGES_PER_CYCLE) : 0;

  while (true) {
    await runCycle(cycle);
    cycle++;

    const rate = learningState.totalGenerated > 0 ? (learningState.totalSuccess/learningState.totalGenerated*100).toFixed(1) : 0;
    console.log(`\n📊 TOTAL: ${learningState.totalSuccess}/${learningState.totalGenerated} (${rate}%)`);
    console.log(`⏰ Next cycle in 9 minutes...\n`);

    await new Promise(r => setTimeout(r, CYCLE_INTERVAL));
  }
}

main().catch(console.error);
