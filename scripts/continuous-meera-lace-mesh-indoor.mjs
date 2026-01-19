#!/usr/bin/env node

/**
 * MEERA LACE MESH INDOOR - Continuous Generation
 *
 * Single lace ultra transparent avant garde meshed bodysuit
 * Foundation garment of minimal mesh fabric
 * Indoor wooden floors with evening lights
 * Ultra realistic skin pores and detailed tones
 */

import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

const OUTPUT_DIR = './generated-meera-lace-mesh-indoor';
const CYCLE_INTERVAL = 8 * 60 * 1000; // 8 minutes
const IMAGES_PER_CYCLE = 8;

// ═══════════════════════════════════════════════════════════════════════════════
// LACE MESH AVANT-GARDE WARDROBES
// ═══════════════════════════════════════════════════════════════════════════════

const WARDROBES = [
  { name: 'single_lace_bodysuit_ultra', desc: `Single piece ultra-transparent French Chantilly lace bodysuit: Full-length bodysuit in whisper-thin ivory lace (95% transparency), delicate floral lace pattern barely visible against bronze skin, high-cut leg openings, plunging neckline to navel, thin spaghetti straps (1mm), entire body visible through sheer lace, haute couture construction with invisible seaming, avant-garde minimal coverage bodysuit` },

  { name: 'mesh_foundation_minimal', desc: `Minimal mesh fabric foundation garment: Ultra-fine silver mesh two-piece foundation set, micro-mesh bralette with geometric construction (97% transparency), matching high-waisted mesh brief, fabric so fine individual threads nearly invisible, body completely visible through mesh, architectural underwire creating subtle structure, foundation garment as fine art` },

  { name: 'avantgarde_lace_cutout', desc: `Avant-garde lace bodysuit with strategic cutouts: Black Chantilly lace bodysuit with large geometric cutouts revealing skin, intricate lace pattern framing exposed areas, high neck with open back, cutouts at midriff and sides, 90% transparency where lace exists, bold artistic design celebrating form` },

  { name: 'crystalline_mesh_catsuit', desc: `Crystalline mesh full catsuit: Floor-length catsuit in silver crystalline mesh, embedded micro-crystals catching light throughout, 95% transparency revealing every curve, long sleeves and high neck, mesh clinging to form like second skin, haute couture bodycon construction, crystals creating starlight effect on bronze skin` },

  { name: 'gossamer_lace_teddy', desc: `Gossamer lace teddy foundation: Single-piece champagne lace teddy in ultra-sheer construction, deep V front and back, high-cut sides revealing hip to underarm, delicate scalloped lace edges, 96% transparency, minimal coverage foundation piece, body art through textile` },

  { name: 'open_mesh_bodysuit', desc: `Open weave mesh bodysuit avant-garde: Large open-weave silver mesh bodysuit, holes in mesh pattern creating geometric negative space, 85% skin visible through open construction, architectural mesh framing curves, single piece from neck to thigh, avant-garde mesh sculpture on body` },

  { name: 'sheer_lace_chemise_mini', desc: `Ultra-sheer lace mini chemise: Whisper-thin white lace chemise falling mid-thigh, complete transparency showing full form beneath, thin ribbon straps, loose flowing fit following curves, lace pattern casting delicate shadows on skin, romantic minimal coverage` },

  { name: 'dual_mesh_layer', desc: `Dual layer minimal mesh set: Two-piece in layered silver and champagne mesh creating moire effect, bralette with double-layer transparency (still 90% sheer), matching brief with mesh layers, subtle shimmer where layers overlap, architectural fashion-forward design` }
];

// ═══════════════════════════════════════════════════════════════════════════════
// INDOOR WOODEN FLOOR ENVIRONMENTS WITH EVENING LIGHTS
// ═══════════════════════════════════════════════════════════════════════════════

const ENVIRONMENTS = [
  { name: 'loft_wooden_floor_evening', desc: `Industrial loft with polished wooden floors at evening: Wide plank honey-toned oak hardwood floor with natural grain visible, exposed brick walls, large steel-frame windows showing purple dusk sky, warm Edison bulb string lights creating golden pools of light (2700K), cream fur throw on wooden floor, urban industrial romance at twilight` },

  { name: 'bedroom_hardwood_lamplight', desc: `Intimate bedroom with dark hardwood floors and lamplight: Rich espresso-stained hardwood floor with deep grain, king bed with cream silk sheets in background, bedside table lamps casting warm amber glow (2500K), soft shadows in corners, white sheer curtains filtering last evening light, romantic bedroom intimacy` },

  { name: 'studio_wooden_floor_spots', desc: `Artist studio with wooden floors and spot lighting: Paint-splattered wide pine floor with character marks, large canvas against wall, adjustable studio spotlights creating dramatic pools of light, deep shadows between light pools, cream throw rug as focal area, creative intimate workspace at evening` },

  { name: 'penthouse_oak_sunset', desc: `Penthouse living with oak floors at sunset: Premium white oak herringbone floor pattern, floor-to-ceiling windows with orange-purple sunset flooding in, minimalist white furniture, golden hour light painting long shadows across wood grain, contemporary luxury evening atmosphere` },

  { name: 'cabin_rustic_firelight', desc: `Rustic cabin with pine floors and firelight: Knotty pine plank floor with natural imperfections, large stone fireplace with roaring flames as main light source, orange-golden firelight dancing on wooden surfaces (2000K), fur rug before hearth, log walls visible, primal evening warmth` },

  { name: 'vintage_parquet_chandeliers', desc: `Vintage room with parquet floors and crystal chandeliers: Intricate parquet pattern in warm walnut wood, ornate crystal chandelier casting prismatic evening light, velvet chaise lounge, gilded mirror reflecting lights, old-world European elegance at dusk, warm amber and crystal sparkle` },

  { name: 'modern_walnut_ambient', desc: `Modern apartment with walnut floors and ambient lighting: Dark walnut engineered floor with contemporary grain, recessed ambient lighting creating soft overall glow, white sectional sofa, large abstract art on wall, floor-to-ceiling windows with city lights beyond, sophisticated urban evening` },

  { name: 'boudoir_cherry_candles', desc: `Private boudoir with cherry wood floors and candles: Rich cherry wood floor with red undertones, dozens of white pillar candles scattered creating warm intimate glow (2200K), antique vanity with mirror, silk curtains, deep romantic shadows, traditional boudoir evening atmosphere` }
];

// ═══════════════════════════════════════════════════════════════════════════════
// POSES: RECLINED BED, TABLE TOP, FLOOR, WALL SENSUAL
// ═══════════════════════════════════════════════════════════════════════════════

const POSES = [
  { name: 'reclined_bed_elegant', desc: `Elegant recline on bed: Lying on silk sheets with upper body propped on elbow, head tilted with serene expression, one knee bent creating triangular negative space, free arm resting on hip accentuating hourglass curves, classical Venus recline on luxurious bed, full body visible in 3/4 view` },

  { name: 'reclined_bed_sprawl', desc: `Artistic bed sprawl: Lying on back across bed with arms extended above head, one leg straight and one bent at knee, back slightly arched, eyes closed in relaxation, hair fanned on pillows, uninhibited elegant sprawl showing full form` },

  { name: 'table_top_seated', desc: `Seated on table top: Sitting on edge of wooden table with legs dangling, hands gripping table edge for support, slight lean back showing arched spine, head tilted with playful knowing expression, legs slightly parted for balance, confident tabletop pose` },

  { name: 'table_top_reclined', desc: `Reclined across table surface: Lying back on wooden table with upper body hanging slightly off edge, one arm supporting head, other arm trailing to floor, dramatic recline across hard surface, sculptural pose on furniture` },

  { name: 'wooden_floor_sprawl', desc: `Artistic sprawl on wooden floor: Lying on polished hardwood with limbs arranged artistically, body creating elegant S-curve, one arm extended, hair spread on floor catching light, full body contact with warm wood surface, raw intimate floor pose` },

  { name: 'wooden_floor_seated', desc: `Seated on wooden floor: Sitting on hardwood with knees drawn to side, one hand on floor for support, torso twisted showing curves, looking over shoulder at camera, casual intimate floor sitting, relaxed yet alluring` },

  { name: 'wall_lean_sensual', desc: `Sensual lean against wall: Standing with back pressed against wall, one knee bent with foot flat on wall, arms raised above head, spine arched away from wall creating curve, head tilted back, eyes heavy-lidded, wall as support for sensual standing pose` },

  { name: 'wall_side_press', desc: `Side press against wall: Standing sideways against wall with full body contact, one arm raised against wall, hip pressed into surface creating dramatic curve, head turned toward camera with intense gaze, wall highlighting silhouette` }
];

// ═══════════════════════════════════════════════════════════════════════════════
// LIGHTING (Evening indoor variants)
// ═══════════════════════════════════════════════════════════════════════════════

const LIGHTING = [
  'Warm Edison bulb glow (2700K) creating golden pools on wooden floor, soft shadows between light sources, intimate evening warmth highlighting bronze skin tones',
  'Dramatic single lamp spotlight with deep shadows, Rembrandt triangle on face, strong contrast between lit and shadow areas, evening noir aesthetic',
  'Fireplace glow as primary source (2200K), orange-golden dancing light, warm shadows on opposite side, primal evening warmth on skin',
  'Golden hour sunset streaming through windows, warm rim lighting on curves, long shadows across wooden floor, magic hour indoor lighting',
  'Crystal chandelier creating prismatic sparkle, even glamorous illumination, tiny light reflections on mesh/lace, elegant evening atmosphere',
  'Soft ambient combined with accent spots, even base illumination with dramatic highlights, sophisticated evening studio lighting',
  'Candlelight clusters creating warm intimate glow (2000K), flickering shadows, romantic boudoir evening atmosphere',
  'Mixed window light and lamp light, natural dusk blue combining with warm artificial amber, transitional evening complexity'
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
    if (response.status === 429) {
      console.log('    ⏳ Rate limited, waiting 30s...');
      await new Promise(r => setTimeout(r, 30000));
      return false;
    }
    throw new Error(`API error: ${response.status}`);
  }
  const data = await response.json();
  if (data.predictions?.[0]?.bytesBase64Encoded) {
    fs.writeFileSync(outputPath, Buffer.from(data.predictions[0].bytesBase64Encoded, 'base64'));
    return true;
  }
  return false;
}

// ═══════════════════════════════════════════════════════════════════════════════
// PROMPT BUILDER - ULTRA REALISTIC SKIN FOCUS
// ═══════════════════════════════════════════════════════════════════════════════

function buildPrompt(wardrobe, environment, pose, lighting, cycleNum) {
  return `MASTERPIECE FINE ART BOUDOIR PHOTOGRAPH - ULTRA REALISTIC.
In the tradition of Helmut Newton and Paolo Roversi.
Premium exclusive intimate artistic content.
FOCUS: Ultra realistic skin rendering with visible pores and detailed tones.

MODEL - MEERA (INDIAN MUSE):
Stunning Indian haute couture supermodel Meera, age 27, 5'8" tall,
athletic voluptuous hourglass figure with dramatic sculptural curves,
bust 37DD with elegant natural fullness, cinched 27" waist, 40" feminine hips,
ULTRA REALISTIC SKIN RENDERING:
- Sun-kissed bronze complexion with natural warm undertones
- VISIBLE SKIN PORES across shoulders, chest, and face with natural texture variation
- Fine vellus hair catching evening light along arms, lower back, and midriff
- Subtle skin tone variations: slightly darker at joints, lighter at curves
- Natural matte finish with realistic minimal sheen only at high points
- Authentic goosebumps where temperature changes occur
- Tiny beauty marks and natural skin character
- NO PLASTIC AI APPEARANCE - real human skin texture
Striking South Indian features with deep captivating dark magnetic eyes,
full sensual lips naturally parted, dramatic high cheekbones,
long flowing jet-black hair with natural wave and shine,
radiating confident sensual presence.

WARDROBE (LACE MESH AVANT-GARDE):
${wardrobe.desc}

ENVIRONMENT (INDOOR WOODEN FLOOR EVENING):
${environment.desc}

POSE:
${pose.desc}

LIGHTING:
${lighting}

CAMERA:
Hasselblad X2D 100C with XCD 80mm f/1.9 at f/2.0,
3/4 angle capturing full body and wooden floor environment,
ultra-shallow depth of field with warm evening bokeh,
8K ULTRA-DETAILED resolution capturing every skin pore,
Kodak Portra 400 warmth with subtle film grain,
museum exhibition print quality.

SKIN RENDERING CRITICAL REQUIREMENTS:
- Individual pores visible on close inspection
- Subtle texture variation across different body areas
- Fine vellus hair catching warm evening light
- Natural skin tone gradients (warmer at extremities)
- Realistic matte finish - NO artificial plastic sheen
- Authentic human skin imperfections adding character
- Detailed tone mapping: bronze base with golden highlights

ARTISTIC DIRECTION:
Intimate evening moment in private indoor space.
Sheer lace/mesh revealing sculptural form completely.
Warm wooden floors grounding the scene in domestic intimacy.
Evening light celebrating natural skin beauty.
Avant-garde fashion meets fine art photography.

8K ULTRA-DETAILED. PHOTOREALISTIC SKIN. MUSEUM QUALITY.`;
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN CONTINUOUS LOOP
// ═══════════════════════════════════════════════════════════════════════════════

async function runCycle(cycleNum) {
  console.log(`\n${'═'.repeat(70)}`);
  console.log(`🔥 LACE MESH INDOOR CYCLE ${cycleNum + 1}`);
  console.log(`   Wardrobe: Lace/Mesh Avant-Garde Bodysuits`);
  console.log(`   Environment: Indoor Wooden Floors + Evening Lights`);
  console.log(`   Focus: Ultra Realistic Skin Pores & Detailed Tones`);
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

    const variantName = `meera_lace_c${cycleNum + 1}_${wardrobe.name}_${pose.name}`;
    console.log(`\n  [${i + 1}/${IMAGES_PER_CYCLE}] ${variantName}`);
    console.log(`    Wardrobe: ${wardrobe.name}`);
    console.log(`    Pose: ${pose.name}`);

    try {
      const prompt = buildPrompt(wardrobe, environment, pose, lighting, cycleNum);
      console.log(`    Prompt: ${prompt.length} chars`);
      console.log('    🎨 Generating ultra-realistic...');

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

      if (i < IMAGES_PER_CYCLE - 1) {
        console.log('    ⏳ Waiting 10s...');
        await new Promise(r => setTimeout(r, 10000));
      }
    } catch (err) {
      console.log(`    ❌ Error: ${err.message}`);
      results.push({ name: variantName, status: 'error', error: err.message });
    }
  }

  const successful = results.filter(r => r.status === 'success');
  console.log(`\n🔥 Cycle ${cycleNum + 1}: ${successful.length}/${IMAGES_PER_CYCLE} successful`);

  fs.writeFileSync(path.join(cycleDir, 'manifest.json'), JSON.stringify({
    cycle: cycleNum + 1, results, timestamp: new Date().toISOString(),
    successCount: successful.length,
    theme: 'Lace Mesh Indoor - Ultra Realistic Skin'
  }, null, 2));

  return successful.length;
}

async function main() {
  console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║   🔥 MEERA LACE MESH INDOOR - Continuous Generation                          ║
╠══════════════════════════════════════════════════════════════════════════════╣
║   Wardrobe: Single Lace Ultra Transparent / Avant-Garde Mesh Bodysuits       ║
║   Environment: Indoor Wooden Floors + Evening Lights                         ║
║   Poses: Reclined Bed, Table Top, Floor, Wall Sensual                        ║
║   Focus: ULTRA REALISTIC SKIN PORES & DETAILED TONES                         ║
║   ${IMAGES_PER_CYCLE} images per cycle • 8 min intervals                                    ║
╚══════════════════════════════════════════════════════════════════════════════╝
`);

  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  let cycle = 0;
  let totalSuccess = 0;

  while (true) {
    const success = await runCycle(cycle);
    totalSuccess += success;
    cycle++;

    console.log(`\n📊 TOTAL: ${totalSuccess} images across ${cycle} cycles`);
    console.log(`⏰ Next cycle in 8 minutes...\n`);

    await new Promise(r => setTimeout(r, CYCLE_INTERVAL));
  }
}

main().catch(console.error);
