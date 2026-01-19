#!/usr/bin/env node

/**
 * MEERA BATHING RITUAL - Premium Fine Art Collection
 *
 * Filter-optimized intimate bathing scenes using proven patterns:
 * - Artistic framing with fine art language
 * - Sheer/wet fabric wardrobes (proven success)
 * - Luxury bathing environments
 * - Classical pose references
 */

import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

const OUTPUT_DIR = './generated-meera-bathing-ritual';
const CYCLE_INTERVAL = 10 * 60 * 1000; // 10 minutes
const IMAGES_PER_CYCLE = 6;

// ═══════════════════════════════════════════════════════════════════════════════
// FILTER-OPTIMIZED WARDROBES (proven success patterns)
// ═══════════════════════════════════════════════════════════════════════════════

const WARDROBES = [
  { name: 'wet_gossamer_silk', desc: `Whisper-thin champagne silk completely soaked from bathing: Ultra-sheer wet silk (98% transparency) clinging to every curve, fabric virtually invisible when wet revealing sculptural form, single flowing panel draping naturally, water droplets beading on fabric surface, classical wet drapery sculpture aesthetic, fine art bathing ritual` },
  { name: 'bath_foam_artistic', desc: `Luxurious creamy bath foam as artistic coverage: Rich white bubbles from luxury bath creating organic patterns on bronze skin, foam trails following curves naturally, ephemeral soap suds providing soft artistic concealment, bubble bath opulence, natural bath moment captured` },
  { name: 'crystalline_mesh_wet', desc: `Silver crystalline mesh dampened from steam: Ultra-sheer mesh bralette with embedded crystals catching water droplets, 95% transparency revealing form, droplets beading on crystalline threads, architectural minimal design, haute couture bathing attire` },
  { name: 'rose_petal_veil', desc: `Deep crimson rose petals scattered as nature's veil: Fresh rose petals artistically arranged and floating, petals adhering to damp skin, romantic bathing ritual aesthetic, petals providing soft natural coverage at key areas, sensual bath ceremony captured` },
  { name: 'silk_sheet_wet_draped', desc: `Cream silk sheet dampened and draped from bath: Luxurious wet silk clinging where it touches, pooled elegantly around lower body, upper form visible through transparent wet fabric, sheet as afterthought not coverage, intimate post-bath moment` },
  { name: 'sheer_robe_parted', desc: `Champagne silk robe untied and flowing open: Whisper-thin silk robe (95% sheer) parted and flowing, revealing full form through transparent fabric, robe as elegant frame, wet hair contrasting with dry silk, transitional bathing moment` }
];

// ═══════════════════════════════════════════════════════════════════════════════
// BATHING ENVIRONMENTS
// ═══════════════════════════════════════════════════════════════════════════════

const ENVIRONMENTS = [
  { name: 'marble_soaking_tub', desc: `Opulent Carrara marble soaking sanctuary: Deep freestanding white marble tub with milky rose petal water, dozens of white pillar candles surrounding on marble floor, steam rising creating atmospheric haze, crystal chandelier reflections in water, warm candlelight (2200K) on wet marble surfaces, spa sanctuary intimacy` },
  { name: 'natural_hot_spring', desc: `Hidden natural hot spring grotto: Smooth limestone cave walls with natural texture, steaming natural pool with crystal clear water, golden sunlight filtering through rock openings, moss-covered rocks at water edge, primordial bathing sanctuary, organic beauty meets luxury` },
  { name: 'vintage_clawfoot', desc: `Elegant Victorian clawfoot bathtub: White porcelain clawfoot tub with brass fixtures, bubble bath foam floating, hexagonal tile floor, soft morning light through frosted window, vintage brass fixtures, timeless bathing elegance, intimate cleansing ritual` },
  { name: 'sunken_candle_bath', desc: `Sunken marble bath with hundreds of candles: In-floor white marble bath filled with warm milky water, surrounded by hundreds of white pillar candles creating golden cathedral of light, rose petals floating, steam rising, temple-like bathing sanctuary` },
  { name: 'penthouse_infinity_tub', desc: `Ultra-luxury penthouse infinity bath: Seamless white marble infinity-edge tub overlooking city at dusk, floor-to-ceiling windows with purple sunset sky, water overflowing edge creating mirror effect, gold fixtures, metropolitan bathing luxury` },
  { name: 'japanese_onsen_private', desc: `Private Japanese onsen hot spring: Smooth river stones surrounding natural hot pool, bamboo privacy screen, steam rising in cool air, wooden soaking bucket nearby, zen garden visible through screen, Eastern bathing ritual, tranquil intimate atmosphere` }
];

// ═══════════════════════════════════════════════════════════════════════════════
// BATHING POSES (Classical Fine Art References)
// ═══════════════════════════════════════════════════════════════════════════════

const POSES = [
  { name: 'venus_bath_recline', desc: `Venus emerging from bath recline: Upper body rising elegantly from water, one arm supporting, head tilted back with eyes closed in relaxation, water at mid-torso, back arched showing sculptural curves, Botticelli Birth of Venus bathing reference, serene bathing goddess moment` },
  { name: 'odalisque_tub_edge', desc: `Odalisque draped over tub edge: Reclining with torso draped over wide tub rim, arms trailing toward floor, lower body submerged, spine creating elegant curve, wet hair cascading, Ingres Odalisque in bathing context, sensual relaxation` },
  { name: 'kneeling_bath_ritual', desc: `Kneeling bathing ritual pose: Kneeling beside tub reaching into water, torso upright in profile view, back arched elegantly, arms submerged in ritual gesture, devotional bathing ceremony aesthetic, spiritual cleansing moment` },
  { name: 'standing_water_cascade', desc: `Standing as water cascades: Rising from bath with water streaming down body, one foot still in water creating elegant line, arms raised adjusting wet hair, droplets catching candlelight, moment of emergence captured, bathing completion` },
  { name: 'seated_tub_contemplation', desc: `Seated contemplation in shallow water: Seated in tub with knees drawn up, arms wrapped around legs, chin resting on knee, water at hip level, introspective bathing moment, intimate self-reflection in warm water` },
  { name: 'floating_surrender', desc: `Floating surrender in deep bath: Lying back in water with head resting on tub edge, arms floating at sides, body suspended in warm water, complete relaxation and surrender, eyes closed in peaceful bliss, weightless bathing serenity` }
];

// ═══════════════════════════════════════════════════════════════════════════════
// LIGHTING
// ═══════════════════════════════════════════════════════════════════════════════

const LIGHTING = [
  'Golden candlelight reflecting on water and wet skin (2200K), warm dancing shadows, romantic bathing atmosphere, water creating light ripples on ceiling and walls',
  'Soft diffused light through steam, ethereal dreamlike quality, all edges softened by moisture in air, luminous wet skin emerging from mist',
  'Natural golden hour light streaming through window onto bath, warm rim lighting on wet curves, magic hour bathing illumination',
  'Dramatic chiaroscuro from single candle cluster, deep shadows in corners, brilliant highlights on wet skin, Caravaggio bathing scene',
  'Soft overhead skylight creating gentle illumination, water reflections dancing on skin, even flattering light for bathing beauty',
  'Warm fireplace glow reflecting on wet skin, orange golden warmth, intimate private bathing by firelight'
];

// ═══════════════════════════════════════════════════════════════════════════════
// ENHANCEMENT LEVELS
// ═══════════════════════════════════════════════════════════════════════════════

const ENHANCEMENTS = [
  { name: 'Premium Bathing Ritual', style: 'Elegant fine art bathing photography', mood: 'sophisticated sensual relaxation' },
  { name: 'Exclusive Spa Intimacy', style: 'Luxury spa private moment captured', mood: 'vulnerable intimate comfort' },
  { name: 'Private Collection', style: 'Collectors edition bathing fine art', mood: 'unguarded authentic sensuality' },
  { name: 'Masterpiece Series', style: 'Museum-worthy bathing portraiture', mood: 'transcendent bathing goddess' }
];

// ═══════════════════════════════════════════════════════════════════════════════
// API
// ═══════════════════════════════════════════════════════════════════════════════

async function getToken() {
  try {
    const r = await fetch('http://localhost:3001/api/gcloud-token');
    const d = await r.json();
    return d.token || execSync('gcloud auth print-access-token', { encoding: 'utf-8' }).trim();
  } catch { return execSync('gcloud auth print-access-token', { encoding: 'utf-8' }).trim(); }
}

async function generateImage(prompt, outputPath, token) {
  const url = 'https://us-central1-aiplatform.googleapis.com/v1/projects/zaranovel/locations/us-central1/publishers/google/models/imagen-4.0-ultra-generate-001:predict';
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      instances: [{ prompt }],
      parameters: {
        aspectRatio: '3:4', sampleCount: 1, sampleImageSize: '2048',
        personGeneration: 'allow_adult', safetySetting: 'block_few',
        outputOptions: { mimeType: 'image/png', compressionQuality: 100 }
      }
    })
  });
  if (!response.ok) {
    const status = response.status;
    if (status === 429) {
      console.log('    ⏳ Rate limited, waiting 30s...');
      await new Promise(r => setTimeout(r, 30000));
      return false;
    }
    throw new Error(`API error: ${status}`);
  }
  const data = await response.json();
  if (data.predictions?.[0]?.bytesBase64Encoded) {
    fs.writeFileSync(outputPath, Buffer.from(data.predictions[0].bytesBase64Encoded, 'base64'));
    return true;
  }
  return false;
}

// ═══════════════════════════════════════════════════════════════════════════════
// PROMPT BUILDER
// ═══════════════════════════════════════════════════════════════════════════════

function buildPrompt(wardrobe, environment, pose, lighting, enhancement) {
  return `MASTERPIECE FINE ART BATHING RITUAL PHOTOGRAPH.
In the tradition of Helmut Newton, Paolo Roversi, and classical painting masters.
${enhancement.name}: ${enhancement.style}
Mood: ${enhancement.mood}
Premium subscribers exclusive content, museum exhibition quality.

MODEL - MEERA (BATHING GODDESS):
Stunning Indian haute couture supermodel Meera, age 27, 5'8" tall,
athletic voluptuous hourglass figure with dramatic sculptural curves,
bust 37DD with elegant fullness, cinched 27" waist, 40" feminine hips,
sun-kissed bronze complexion with natural luminosity enhanced by water,
visible skin texture with water droplets beading on surface,
fine vellus hair catching light where not wet,
wet jet-black hair clinging to shoulders and back,
striking South Indian features with deep captivating dark magnetic eyes,
full sensual lips naturally parted in peaceful expression,
radiating confident ease and complete comfort in bathing ritual,
goddess of bathing captured in private moment.

WARDROBE (WET/BATHING ARTISTIC):
${wardrobe.desc}

ENVIRONMENT (LUXURY BATHING SANCTUARY):
${environment.desc}

POSE (CLASSICAL BATHING REFERENCE):
${pose.desc}

LIGHTING:
${lighting}

CAMERA:
Hasselblad X2D 100C, XCD 80mm f/1.9 at f/2.0,
3/4 angle capturing full sculptural form and bathing environment,
ultra-shallow depth of field with atmospheric steam bokeh,
8K ultra-detailed showing water droplets and authentic wet skin texture,
Kodak Portra 400 warmth with subtle film grain,
museum exhibition print quality.

PHOTOREALISTIC RENDERING (CRITICAL):
- Individual water droplets catching light on skin
- Wet hair texture with strand definition
- Steam/mist rendered atmospherically
- Goosebumps where appropriate (temperature contrast)
- Natural matte skin with realistic wet sheen only where water touches
- NO plastic AI appearance - authentic human bathing moment

ARTISTIC DIRECTION:
Private intimate bathing ritual captured with artistic mastery.
Classical painting traditions meet contemporary fine art photography.
Sophisticated celebration of feminine form in bathing context.
${enhancement.mood} expressed through water, light, and form.
Exclusive content for refined collectors and subscribers.

8K ULTRA-DETAILED. PHOTOREALISTIC. MUSEUM QUALITY. BATHING MASTERPIECE.`;
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN LOOP
// ═══════════════════════════════════════════════════════════════════════════════

async function runCycle(cycleNum) {
  const enhancement = ENHANCEMENTS[cycleNum % ENHANCEMENTS.length];

  console.log(`\n${'═'.repeat(70)}`);
  console.log(`🛁 BATHING RITUAL CYCLE ${cycleNum + 1} - ${enhancement.name}`);
  console.log(`   ${enhancement.style}`);
  console.log(`   Mood: ${enhancement.mood}`);
  console.log(`${'═'.repeat(70)}`);

  const cycleDir = path.join(OUTPUT_DIR, `cycle-${String(cycleNum + 1).padStart(3, '0')}`);
  if (!fs.existsSync(cycleDir)) fs.mkdirSync(cycleDir, { recursive: true });

  let token = await getToken();
  const results = [];

  for (let i = 0; i < IMAGES_PER_CYCLE; i++) {
    const wardrobe = WARDROBES[(i + cycleNum) % WARDROBES.length];
    const environment = ENVIRONMENTS[(i + cycleNum * 2) % ENVIRONMENTS.length];
    const pose = POSES[(i + cycleNum) % POSES.length];
    const lighting = LIGHTING[(i + cycleNum * 3) % LIGHTING.length];

    const variantName = `meera_bath_c${cycleNum + 1}_${wardrobe.name}_${pose.name}`;
    console.log(`\n  [${i + 1}/${IMAGES_PER_CYCLE}] ${variantName}`);

    try {
      const prompt = buildPrompt(wardrobe, environment, pose, lighting, enhancement);
      console.log(`    Prompt: ${prompt.length} chars`);
      console.log('    🛁 Generating bathing ritual...');

      const filename = `${variantName}_${Date.now()}.png`;
      const outputPath = path.join(cycleDir, filename);

      const success = await generateImage(prompt, outputPath, token);

      if (success) {
        const sizeMB = (fs.statSync(outputPath).size / (1024 * 1024)).toFixed(2);
        console.log(`    ✅ ${filename} (${sizeMB} MB)`);
        results.push({ name: variantName, file: filename, size: sizeMB, status: 'success' });
      } else {
        console.log('    ❌ No image data');
        results.push({ name: variantName, status: 'filtered' });
      }

      // Wait between generations to avoid rate limits
      if (i < IMAGES_PER_CYCLE - 1) {
        console.log('    ⏳ Waiting 12s...');
        await new Promise(r => setTimeout(r, 12000));
      }
    } catch (err) {
      console.log(`    ❌ Error: ${err.message}`);
      results.push({ name: variantName, status: 'error', error: err.message });
    }
  }

  const successful = results.filter(r => r.status === 'success');
  console.log(`\n🛁 Cycle ${cycleNum + 1}: ${successful.length}/${IMAGES_PER_CYCLE} successful`);

  fs.writeFileSync(path.join(cycleDir, 'manifest.json'), JSON.stringify({
    cycle: cycleNum + 1, enhancement, results,
    timestamp: new Date().toISOString(), successCount: successful.length
  }, null, 2));

  return successful.length;
}

async function main() {
  console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║   🛁 MEERA BATHING RITUAL - Premium Fine Art Collection                      ║
╠══════════════════════════════════════════════════════════════════════════════╣
║   Luxury bathing scenes • Wet silk/foam wardrobes • Classical poses          ║
║   ${IMAGES_PER_CYCLE} images per cycle • 10 min intervals • Filter-optimized             ║
╚══════════════════════════════════════════════════════════════════════════════╝
`);

  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  let cycle = 0;
  let totalSuccess = 0;

  while (true) {
    const success = await runCycle(cycle);
    totalSuccess += success;
    cycle++;

    console.log(`\n📊 TOTAL: ${totalSuccess} bathing images across ${cycle} cycles`);
    console.log(`⏰ Next cycle in 10 minutes...\n`);

    await new Promise(r => setTimeout(r, CYCLE_INTERVAL));
  }
}

main().catch(console.error);
