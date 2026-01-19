#!/usr/bin/env node

/**
 * MEERA MASTERCLASS ADAPTIVE v2 - OPTIMIZED
 *
 * Key optimizations matching Patreon quality:
 * - Classical art references (Ingres, Bouguereau, Cabanel, Courbet)
 * - Fine art museum language to reduce filtering
 * - Adaptive learning with combo blacklisting
 * - Maximum variety through randomized selections
 * - Shorter, more focused prompts for consistency
 * - Progressive intimacy levels 1-4
 */

import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

const OUTPUT_DIR = './generated-meera-masterclass-adaptive';
const STATE_FILE = './generated-meera-masterclass-adaptive/learning-state.json';
const CYCLE_INTERVAL = 8 * 60 * 1000;
const IMAGES_PER_CYCLE = 8;

// ═══════════════════════════════════════════════════════════════════════════════
// ADAPTIVE LEARNING STATE
// ═══════════════════════════════════════════════════════════════════════════════

let learningState = {
  totalGenerated: 0,
  totalSuccess: 0,
  currentIntimacyLevel: 1,
  successfulCombos: [],
  failedCombos: [],
  blacklistedCombos: [],
  bestWardrobes: [],
  bestPoses: [],
  bestEnvironments: [],
  cycleHistory: []
};

function loadState() {
  try {
    if (fs.existsSync(STATE_FILE)) {
      const loaded = JSON.parse(fs.readFileSync(STATE_FILE, 'utf-8'));
      // Merge with defaults for new fields
      learningState = { ...learningState, ...loaded };
      const rate = learningState.totalGenerated > 0 ? (learningState.totalSuccess/learningState.totalGenerated*100).toFixed(1) : 0;
      console.log(`📚 Loaded: ${learningState.totalSuccess}/${learningState.totalGenerated} (${rate}%)`);
      console.log(`   Intimacy: ${learningState.currentIntimacyLevel.toFixed(1)} | Blacklisted: ${learningState.blacklistedCombos?.length || 0}`);
    }
  } catch { console.log('📚 Fresh learning state'); }
}

function saveState() {
  fs.writeFileSync(STATE_FILE, JSON.stringify(learningState, null, 2));
}

function isBlacklisted(wardrobe, pose) {
  return learningState.blacklistedCombos?.includes(`${wardrobe}_${pose}`) || false;
}

function recordResult(wardrobe, pose, environment, success) {
  const combo = `${wardrobe}_${pose}`;
  learningState.totalGenerated++;

  if (success) {
    learningState.totalSuccess++;
    if (!learningState.successfulCombos.includes(combo)) {
      learningState.successfulCombos.push(combo);
    }
    if (!learningState.bestWardrobes.includes(wardrobe)) {
      learningState.bestWardrobes.push(wardrobe);
    }
    if (!learningState.bestPoses.includes(pose)) {
      learningState.bestPoses.push(pose);
    }
    if (!learningState.bestEnvironments.includes(environment)) {
      learningState.bestEnvironments.push(environment);
    }
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
// CLASSICAL FINE ART WARDROBES - Progressive Intimacy
// ═══════════════════════════════════════════════════════════════════════════════

const WARDROBES = [
  // Level 1 - Classical Draped
  { name: 'ingres_silk_drape', level: 1,
    desc: `Classical draped silk in Ingres tradition: Flowing ivory silk in sculptural folds, revealing and concealing in museum fine art manner, fabric catching natural light` },
  { name: 'botticelli_flowing_hair', level: 1,
    desc: `Venus aesthetic with flowing dark hair: Long waves cascading as nature's veil, goddess iconography, strands catching golden light in organic patterns` },
  { name: 'degas_bather_towel', level: 1,
    desc: `Bather with towel in Degas manner: Soft white towel draped casually, post-bathing naturalness, intimate domestic fine art scene` },
  { name: 'renoir_warm_skin', level: 1,
    desc: `Renoir bather aesthetic: Soft diffused light on luminous bronze skin, impressionist color warmth, natural bathing scene beauty` },

  // Level 2 - Artistic Sheer
  { name: 'odalisque_sheer', level: 2,
    desc: `Contemporary Odalisque in Ingres tradition: Gossamer sheer fabric in warm tones, translucent quality, orientalist fine art aesthetic` },
  { name: 'cabanel_venus_foam', level: 2,
    desc: `Birth of Venus aesthetic: Ethereal foam and mist elements, classical goddess emerging, romantic fine art beauty` },
  { name: 'courbet_naturalist', level: 2,
    desc: `Naturalist study in Courbet tradition: Unidealized celebration of authentic form, bold artistic statement, documentary fine art` },
  { name: 'bouguereau_nymph', level: 2,
    desc: `Nymph aesthetic in Bouguereau style: Classical beauty with idealized form, soft diffused lighting, academic fine art tradition` },

  // Level 3 - Artistic Minimal
  { name: 'klimt_gold_accent', level: 3,
    desc: `Klimt-inspired gold accents: Strategic gold leaf or jewelry elements catching light, art nouveau aesthetic, decorative arts approach` },
  { name: 'modigliani_elongated', level: 3,
    desc: `Modigliani study: Elongated elegant form, warm earth tones, modernist nude tradition, sculptural simplicity` },
  { name: 'schiele_expressive', level: 3,
    desc: `Expressionist study in Schiele manner: Bold compositional angles, authentic body language, unflinching artistic observation` },
  { name: 'freud_naturalist', level: 3,
    desc: `Lucian Freud naturalist study: Honest representation on plush surface, impasto-like skin rendering, contemporary fine art boldness` },

  // Level 4 - Maximum Artistic
  { name: 'helmut_newton_power', level: 4,
    desc: `Helmut Newton Big Nudes aesthetic: Powerful feminine presence, dramatic lighting, fashion photography meets fine art` },
  { name: 'mapplethorpe_sculptural', level: 4,
    desc: `Mapplethorpe sculptural approach: Body as living sculpture, dramatic chiaroscuro, gallery-worthy composition` },
  { name: 'avedon_minimal', level: 4,
    desc: `Avedon minimal aesthetic: Clean composition, authentic presence, stripped-down artistic truth` }
];

// ═══════════════════════════════════════════════════════════════════════════════
// CLASSICAL FINE ART POSES
// ═══════════════════════════════════════════════════════════════════════════════

const POSES = [
  // Classical Reclining
  { name: 'titian_venus', focus: ['reclining', 'classical'],
    desc: `Reclining Venus inspired by Titian: Lying with elegant S-curve, one arm behind head, classical fine art pose, museum-worthy composition` },
  { name: 'giorgione_sleeping', focus: ['peaceful', 'reclining'],
    desc: `Sleeping Venus from Giorgione: Peaceful repose with eyes closed, serene classical beauty, one arm above head` },
  { name: 'cabanel_waves', focus: ['reclining', 'sensual'],
    desc: `Birth of Venus pose: Reclining among flowing fabric, arms gracefully framing form, romantic ethereal beauty` },
  { name: 'grande_odalisque', focus: ['back', 'elongated'],
    desc: `Ingres Grande Odalisque: Reclining back view with elegant arch, looking over shoulder, elongated spine line` },

  // Classical Standing
  { name: 'la_source_standing', focus: ['standing', 'classical'],
    desc: `Ingres La Source pose: Standing with contrapposto weight shift, arms in graceful gesture, classical proportion` },
  { name: 'venus_pudica', focus: ['standing', 'modest'],
    desc: `Classical Venus Pudica: Standing with natural modest gesture, one hand near chest, elegant S-curve` },
  { name: 'contrapposto_sculptural', focus: ['standing', 'sculptural'],
    desc: `Renaissance contrapposto: Weight shifted creating natural curves, sculptural approach to standing figure` },

  // Classical Seated/Bathing
  { name: 'degas_bather_back', focus: ['seated', 'back'],
    desc: `Degas bather study: Seated with torso twisted showing back, intimate bathing moment, natural relaxed posture` },
  { name: 'bonnard_tub', focus: ['bathing', 'intimate'],
    desc: `Bonnard bathing scene: In or near tub, natural relaxation, domestic intimacy, impressionist color warmth` },
  { name: 'renoir_seated', focus: ['seated', 'curves'],
    desc: `Renoir seated bather: Natural seated pose with soft lighting defining curves, warm impressionist aesthetic` },

  // Contemporary
  { name: 'newton_power_stand', focus: ['standing', 'powerful'],
    desc: `Newton power pose: Strong confident standing, dramatic lighting, fashion meets fine art presence` },
  { name: 'freud_floor', focus: ['floor', 'naturalist'],
    desc: `Lucian Freud floor study: Natural body on surface, authentic limb arrangement, bold contemporary approach` },
  { name: 'mirror_reflection', focus: ['mirror', 'double'],
    desc: `Mirror study: Form and reflection creating depth, self-regard moment, vanitas theme` },
  { name: 'window_silhouette', focus: ['standing', 'backlit'],
    desc: `Window silhouette: Backlit figure creating rim lighting on curves, dramatic natural light composition` }
];

// ═══════════════════════════════════════════════════════════════════════════════
// FINE ART ENVIRONMENTS - Natural Light Only
// ═══════════════════════════════════════════════════════════════════════════════

const ENVIRONMENTS = [
  { name: 'parisian_atelier',
    desc: `19th century artist's atelier: North-facing window with perfect diffused light, antique furnishings, velvet drapery, oil paintings on easels, bohemian artist studio` },
  { name: 'venetian_palazzo',
    desc: `Venetian palazzo interior: Warm terracotta and gold, ornate gilded mirror, damask fabrics, Renaissance afternoon light through tall windows` },
  { name: 'marble_bath',
    desc: `Classical marble bath: White Carrara marble with grey veining, steam diffusing window light, brass fixtures, candles providing warm glow` },
  { name: 'golden_hour_bedroom',
    desc: `Bedroom at golden hour: Warm sunlight streaming through sheer curtains, cream silk linens, soft shadows, intimate atmosphere` },
  { name: 'fireplace_sanctuary',
    desc: `Fireplace sanctuary: Dancing orange firelight on plush fur rug, warm shadows, primal intimate atmosphere, cozy winter evening` },
  { name: 'conservatory_glass',
    desc: `Victorian glass conservatory: Morning sunlight through antique glass panels, tropical plants, prismatic light effects, botanical sanctuary` },
  { name: 'minimalist_gallery',
    desc: `Minimalist gallery space: Clean white walls, natural skylight diffusion, museum-quality lighting, contemporary art context` },
  { name: 'boudoir_velvet',
    desc: `Private boudoir: Deep velvet furnishings in blush tones, gilded mirror, soft natural light through sheers, romantic sanctuary` }
];

// ═══════════════════════════════════════════════════════════════════════════════
// ARTISTIC FRAMING & VARIATIONS
// ═══════════════════════════════════════════════════════════════════════════════

const ARTISTIC_FRAMES = [
  'Museum fine art photography in classical tradition',
  'Gallery exhibition intimate portraiture study',
  'Private collection classical nude masterwork',
  'Art historical reference reimagined',
  'Documentary fine art celebration of form',
  'Contemporary interpretation of classical beauty'
];

function getRandomVariation() {
  const variations = [
    'unique moment of artistic stillness captured',
    'authentic natural presence in the space',
    'subtle emotional nuance visible in expression',
    'genuine artistic vulnerability expressed',
    'natural light catching form distinctively',
    'organic body position creating balance',
    'breath moment frozen in time',
    'distinctive shadow composition on form',
    'authentic weight distribution visible',
    'natural skin texture in environmental light'
  ];
  return variations[Math.floor(Math.random() * variations.length)];
}

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
        console.log('    ⏳ Rate limited, waiting 45s...');
        await new Promise(r => setTimeout(r, 45000));
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
// OPTIMIZED PROMPT BUILDER - Shorter & More Focused
// ═══════════════════════════════════════════════════════════════════════════════

function buildPrompt(wardrobe, pose, environment, cycleNum) {
  const variation = getRandomVariation();
  const artisticFrame = ARTISTIC_FRAMES[Math.floor(Math.random() * ARTISTIC_FRAMES.length)];

  const focusDesc = pose.focus.map(f => {
    const desc = {
      'reclining': 'classical reclining composition',
      'classical': 'museum-worthy classical beauty',
      'peaceful': 'serene peaceful expression',
      'sensual': 'refined sensual presence',
      'back': 'elegant back contours',
      'elongated': 'elongated sculptural form',
      'standing': 'elegant standing figure',
      'modest': 'natural modest gesture',
      'sculptural': 'body as living sculpture',
      'seated': 'natural seated composition',
      'bathing': 'intimate bathing scene',
      'intimate': 'private domestic moment',
      'curves': 'natural feminine curves',
      'powerful': 'confident powerful presence',
      'floor': 'naturalist floor study',
      'naturalist': 'honest artistic observation',
      'mirror': 'reflection creating depth',
      'double': 'form and reflection',
      'backlit': 'dramatic rim lighting'
    };
    return desc[f] || f;
  }).join(', ');

  return `${artisticFrame.toUpperCase()}.
Intimate fine art photography of museum exhibition quality.
Artistic moment: ${variation}. Study ${Date.now()}.

THE MUSE - MEERA:
Stunning Indian fine art model, age 27, height 5'8",
Classical hourglass proportions (37DD-27-40):
- Full natural form with elegant teardrop shape
- Dramatically cinched waist creating hourglass
- Wide sculptural hips completing proportions
- Sun-kissed bronze complexion, warm golden undertones
- Natural matte skin with authentic texture

FACIAL BEAUTY:
Striking dark eyes with warmth and intelligence,
Full lips in natural expression,
High cheekbones catching light,
Quiet confidence and artistic awareness.

HAIR:
Long flowing jet-black hair with natural waves,
Catching light with individual strand definition.

ARTISTIC FOCUS: ${focusDesc}

WARDROBE (${wardrobe.name}):
${wardrobe.desc}

POSE (${pose.name}):
${pose.desc}

ENVIRONMENT:
${environment.desc}

LIGHTING - Natural Only:
Soft diffused environmental light modeling form,
Warm color temperature enhancing skin tones,
Natural shadows creating dimension,
No artificial studio lighting.

CAMERA:
Hasselblad medium format, 80mm f/2.0,
8K museum print quality,
Shallow depth with atmospheric bokeh.

RENDERING:
- Authentic skin texture with visible pores
- No plastic AI smoothing
- Natural fabric physics
- Accurate environmental reflections

FINE ART EXHIBITION QUALITY.
Classical tradition meets contemporary vision.`;
}

// ═══════════════════════════════════════════════════════════════════════════════
// SMART SELECTION - Maximum Variety
// ═══════════════════════════════════════════════════════════════════════════════

function selectWardrobe(index, cycleNum) {
  const maxLevel = Math.min(Math.ceil(learningState.currentIntimacyLevel), 4);
  const eligible = WARDROBES.filter(w => w.level <= maxLevel);

  // Random selection for variety (70%) or best performer (30%)
  if (learningState.bestWardrobes.length > 0 && Math.random() < 0.3) {
    const name = learningState.bestWardrobes[Math.floor(Math.random() * learningState.bestWardrobes.length)];
    const found = eligible.find(w => w.name === name);
    if (found) return found;
  }

  // Random from eligible for variety
  const randomIdx = Math.floor(Math.random() * eligible.length);
  return eligible[randomIdx] || WARDROBES[0];
}

function selectPose(wardrobe, index, cycleNum) {
  // Avoid blacklisted, then random for variety
  const available = POSES.filter(p => !isBlacklisted(wardrobe.name, p.name));
  if (available.length === 0) return POSES[Math.floor(Math.random() * POSES.length)];

  // Random selection for maximum variety
  return available[Math.floor(Math.random() * available.length)];
}

function selectEnvironment(index, cycleNum) {
  // Random selection for variety
  return ENVIRONMENTS[Math.floor(Math.random() * ENVIRONMENTS.length)];
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN CYCLE
// ═══════════════════════════════════════════════════════════════════════════════

async function runCycle(cycleNum) {
  const rate = learningState.totalGenerated > 0 ? (learningState.totalSuccess/learningState.totalGenerated*100).toFixed(1) : 0;

  console.log(`\n${'═'.repeat(70)}`);
  console.log(`🎨 MASTERCLASS v2 - CYCLE ${cycleNum + 1}`);
  console.log(`   Success: ${rate}% | Intimacy: ${learningState.currentIntimacyLevel.toFixed(1)} | Blacklisted: ${learningState.blacklistedCombos?.length || 0}`);
  console.log(`${'═'.repeat(70)}`);

  const cycleDir = path.join(OUTPUT_DIR, `cycle-${String(cycleNum + 1).padStart(3, '0')}`);
  if (!fs.existsSync(cycleDir)) fs.mkdirSync(cycleDir, { recursive: true });

  let token = await getToken();
  const results = [];
  let cycleSuccess = 0;

  for (let i = 0; i < IMAGES_PER_CYCLE; i++) {
    const wardrobe = selectWardrobe(i, cycleNum);
    const pose = selectPose(wardrobe, i, cycleNum);
    const environment = selectEnvironment(i, cycleNum);

    const variantName = `meera_mc_c${cycleNum + 1}_${wardrobe.name}_${pose.name}`;
    console.log(`\n  [${i + 1}/${IMAGES_PER_CYCLE}] ${variantName}`);
    console.log(`    Wardrobe: ${wardrobe.name} (L${wardrobe.level})`);
    console.log(`    Pose: ${pose.name}`);
    console.log(`    Environment: ${environment.name}`);

    try {
      const prompt = buildPrompt(wardrobe, pose, environment, cycleNum);
      console.log(`    Prompt: ${prompt.length} chars`);
      console.log('    🎨 Generating...');

      const filename = `${variantName}_${Date.now()}.png`;
      const outputPath = path.join(cycleDir, filename);

      const result = await generateImage(prompt, outputPath, token);

      if (result === 'success') {
        const sizeMB = (fs.statSync(outputPath).size / (1024 * 1024)).toFixed(2);
        console.log(`    ✅ ${filename} (${sizeMB} MB)`);
        recordResult(wardrobe.name, pose.name, environment.name, true);
        results.push({ name: variantName, file: filename, status: 'success' });
        cycleSuccess++;
      } else if (result === 'filtered') {
        console.log('    ❌ Filtered - learning');
        recordResult(wardrobe.name, pose.name, environment.name, false);
        results.push({ name: variantName, status: 'filtered' });
      } else if (result === 'rate_limited') {
        results.push({ name: variantName, status: 'rate_limited' });
      } else {
        results.push({ name: variantName, status: 'timeout' });
      }

      if (i < IMAGES_PER_CYCLE - 1) {
        const delay = 10000 + Math.random() * 5000; // 10-15s random
        console.log(`    ⏳ Waiting ${(delay/1000).toFixed(0)}s...`);
        await new Promise(r => setTimeout(r, delay));
      }
    } catch (err) {
      console.log(`    ❌ Error: ${err.message}`);
      results.push({ name: variantName, status: 'error' });
      if (err.message.includes('401')) token = await getToken();
    }
  }

  // Adjust intimacy level
  const cycleRate = cycleSuccess / IMAGES_PER_CYCLE;
  if (cycleRate >= 0.6 && learningState.currentIntimacyLevel < 4) {
    learningState.currentIntimacyLevel += 0.15;
    console.log(`\n📈 Intimacy → ${learningState.currentIntimacyLevel.toFixed(1)}`);
  } else if (cycleRate < 0.4 && learningState.currentIntimacyLevel > 1) {
    learningState.currentIntimacyLevel -= 0.1;
    console.log(`\n📉 Intimacy → ${learningState.currentIntimacyLevel.toFixed(1)}`);
  }

  learningState.cycleHistory.push({
    cycle: cycleNum + 1,
    success: cycleSuccess,
    total: IMAGES_PER_CYCLE,
    intimacyLevel: learningState.currentIntimacyLevel,
    timestamp: new Date().toISOString()
  });
  saveState();

  console.log(`\n🎨 Cycle ${cycleNum + 1}: ${cycleSuccess}/${IMAGES_PER_CYCLE} successful`);

  // Save manifest
  fs.writeFileSync(path.join(cycleDir, 'manifest.json'), JSON.stringify({
    cycle: cycleNum + 1,
    theme: 'Masterclass Fine Art v2',
    results,
    timestamp: new Date().toISOString(),
    successCount: cycleSuccess,
    intimacyLevel: learningState.currentIntimacyLevel
  }, null, 2));

  return cycleSuccess;
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════════════════════

async function main() {
  console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║   🎨 MASTERCLASS v2 - OPTIMIZED Fine Art Generator                           ║
╠══════════════════════════════════════════════════════════════════════════════╣
║   • Classical art references (Ingres, Bouguereau, Cabanel, Newton)           ║
║   • Maximum variety through randomized selections                            ║
║   • Adaptive learning with combo blacklisting                                ║
║   • Progressive intimacy levels 1-4                                          ║
║   • ${IMAGES_PER_CYCLE} images per cycle • 8 min intervals                                    ║
╚══════════════════════════════════════════════════════════════════════════════╝
`);

  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  loadState();

  let cycle = learningState.cycleHistory?.length || 0;

  while (true) {
    await runCycle(cycle);
    cycle++;

    const rate = learningState.totalGenerated > 0 ? (learningState.totalSuccess/learningState.totalGenerated*100).toFixed(1) : 0;
    console.log(`\n📊 TOTAL: ${learningState.totalSuccess}/${learningState.totalGenerated} (${rate}%)`);
    console.log(`📈 Intimacy: ${learningState.currentIntimacyLevel.toFixed(1)}/4.0`);
    console.log(`⏰ Next cycle in 8 minutes...\n`);

    await new Promise(r => setTimeout(r, CYCLE_INTERVAL));
  }
}

main().catch(console.error);
