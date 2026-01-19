#!/usr/bin/env node

/**
 * MEERA MAX INTIMACY - Ultra Private Collection Generator
 *
 * Maximum intimacy (10/10+) with minimal coverage
 * Midnight themed indoor intimate sensuous reveal
 * Baroque boudoir fine art aesthetic
 * Strict enforcement of provided RAW PROMPT patterns
 */

import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

const OUTPUT_DIR = './generated-meera-max-intimacy';
const CYCLE_INTERVAL = 8 * 60 * 1000; // 8 minutes
const IMAGES_PER_CYCLE = 8;

// ═══════════════════════════════════════════════════════════════════════════════
// ULTRA MINIMAL WARDROBES - Maximum Intimacy (10/10+)
// ═══════════════════════════════════════════════════════════════════════════════

const WARDROBES = [
  // BLACK MESH ARTISTIC - Fine Art Language
  {
    name: 'noir_mesh_artistic',
    desc: `Elegant black mesh artistic bodysuit for fine art photography: Delicate open-weave black fabric creating geometric patterns, haute couture lingerie design with architectural mesh construction, fashion editorial quality, Alexander McQueen inspired dark romanticism.`
  },
  {
    name: 'ebony_lace_mesh_couture',
    desc: `Haute couture ebony lace-mesh hybrid: Designer black mesh with integrated lace panels, luxury lingerie aesthetic combining transparency with texture, Versace atelier craftsmanship, fashion week runway intimates collection.`
  },
  {
    name: 'midnight_mesh_foundation',
    desc: `Midnight black mesh foundation garment: Architectural lower coverage with mesh fabric, designer intimate wear with structured mesh panels, La Perla luxury aesthetic, editorial fashion lingerie.`
  },
  {
    name: 'obsidian_net_sculptural',
    desc: `Sculptural obsidian net bodypiece: Wide-weave black net fabric as wearable art, fashion sculpture aesthetic, Iris van Herpen inspired mesh construction, haute couture body jewelry in fabric form.`
  },
  // ULTRA MINIMAL ARTISTIC
  {
    name: 'bifurcated_tension_strap',
    desc: `An avant-garde lower foundation garment with a bifurcated, open-front design, held in place by tension straps at the hips, for conceptual art. Minimal architectural coverage revealing sculptural form.`
  },
  {
    name: 'pearl_tipped_architectural',
    desc: `A haute couture tailored lower garment featuring a bifurcated, open-front architectural design, held together by delicate pearl-tipped straps at the hips. For artistic, private gallery compositions.`
  },
  {
    name: 'single_lace_panel_venus',
    desc: `Single whisper-thin gossamer lace panel as artistic coverage: One delicate transparent lace piece (95% sheer) draped strategically, classical Venus modesty reference with modern minimal aesthetic.`
  },
  {
    name: 'silk_ribbon_artistic',
    desc: `Single cream silk ribbon artistically draped: One continuous ribbon creating elegant lines across form, ribbon as artistic drawing on body, fashion photography styling, minimal coverage with maximum elegance.`
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
// MIDNIGHT INTIMATE ENVIRONMENTS
// ═══════════════════════════════════════════════════════════════════════════════

const ENVIRONMENTS = [
  {
    name: 'venetian_velvet_boudoir',
    desc: `Opulent Venetian velvet boudoir: Rich burgundy velvet curtains as dramatic backdrop, antique brass four-poster bed with cream silk sheets, ornate brass candelabras with flickering candles, plush cream faux fur throw on dark hardwood floor, antique gilded mirror, deep baroque shadows with warm amber highlights (2200K).`
  },
  {
    name: 'amber_candlelit_chamber',
    desc: `Luxurious private amber-toned boudoir chamber with warm honey-gold walls, ornate brass candelabras with flickering amber pillar candles, caramel velvet chaise with silk cushions, baroque intimacy at midnight, golden light dancing on surfaces.`
  },
  {
    name: 'midnight_silk_sanctuary',
    desc: `Midnight silk sanctuary: Deep midnight blue velvet walls, king bed with black silk sheets and silver embroidery, clusters of white candles creating pools of warm light, sterling silver antique vanity, moonlight through sheer curtains mixing with candlelight.`
  },
  {
    name: 'renaissance_masters_studio',
    desc: `Renaissance master's private studio: Aged wood paneled walls with oil paintings, ornate daybed with crimson velvet, brass oil lamps creating Rembrandt lighting, artist's easel in corner, deep shadows with pools of warm illumination (2400K).`
  },
  {
    name: 'baroque_fireplace_chamber',
    desc: `Baroque fireplace chamber: Massive stone fireplace with roaring fire as primary light, bear fur rug before hearth, dark wood paneling, brass candlesticks on mantle, fire glow casting dancing shadows, intimate warmth in cold stone room.`
  },
  {
    name: 'collectors_private_gallery',
    desc: `Private collector's intimate gallery: White walls with single spotlight creating dramatic pool of light, minimalist platform bed in center, figure as living artwork, museum-quality presentation, stark contrast of bright subject against darkness.`
  },
  {
    name: 'ottoman_seraglio_chamber',
    desc: `Ottoman seraglio private chamber: Rich jewel-toned silk cushions in deep emerald and ruby, intricate brass lanterns casting patterned light, Persian carpets layered thick, incense smoke visible in amber light, opulent Eastern intimacy.`
  },
  {
    name: 'parisian_midnight_atelier',
    desc: `Parisian artist's midnight atelier: Exposed brick walls, large north-facing window with city lights beyond, unmade daybed with white linen, scattered canvases, single warm lamp creating intimate island of light in bohemian darkness.`
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
// INTIMATE SENSUOUS POSES - Maximum Reveal
// ═══════════════════════════════════════════════════════════════════════════════

const POSES = [
  {
    name: 'venus_awakening_recline',
    desc: `Venus awakening recline on silk sheets: Lying with gentle awakening stretch, one arm raised above head gracefully, eyes with sleepy sensual gaze, back slightly arched lifting elegantly, one knee bent creating triangular negative space, free hand resting on lower abdomen, Botticelli Birth of Venus vulnerability.`
  },
  {
    name: 'languid_chaise_flow',
    desc: `Fully reclined on velvet chaise with body in languid sensual flow, spine gently arched, one arm extended above head with fingers in hair, other hand on hip, head tilted back with sultry half-lidded gaze, complete surrender to viewer.`
  },
  {
    name: 'titian_venus_urbino',
    desc: `Titian's Venus of Urbino pose: Reclining propped on elbow, direct inviting gaze at viewer, one hand resting near thigh in classical gesture, other arm behind supporting, legs extended with slight bend, ultimate art historical intimate reference.`
  },
  {
    name: 'odalisque_midnight_sprawl',
    desc: `Ingres Odalisque midnight sprawl: Lying on stomach facing away, looking over shoulder with knowing smile, back and posterior curves prominent, one leg bent at knee, arms arranged gracefully, spine creating S-curve, private harem fantasy.`
  },
  {
    name: 'kneeling_goddess_worship',
    desc: `Kneeling goddess worship pose: Kneeling upright on silk, back arched dramatically, hands in hair lifting it up, head tilted back with closed eyes in ecstasy, thighs parted naturally, devotional sensual expression, worshipped goddess aesthetic.`
  },
  {
    name: 'seated_floor_intimate',
    desc: `Intimate seated floor pose: Seated on plush rug, one knee raised, other leg extended, leaning back on hands, torso presented openly, hair cascading down back, direct vulnerable eye contact, private moment captured.`
  },
  {
    name: 'standing_mirror_reveal',
    desc: `Standing before antique mirror: Full frontal stance reflected in gilded mirror, hands adjusting hair, watching own reflection with knowing expression, both front and back visible simultaneously, narcissistic intimacy.`
  },
  {
    name: 'bed_edge_invitation',
    desc: `Seated on bed edge leaning back: Sitting at edge of silk-covered bed, leaning back on extended arms, chest lifted, legs parted naturally, direct sultry gaze, hair falling back, invitation pose.`
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
// LIGHTING SCHEMES
// ═══════════════════════════════════════════════════════════════════════════════

const LIGHTING = [
  `Rembrandt triangle lighting with soft shadow gradation, warm golden tones highlighting sculptural form, deep baroque shadows in recesses, museum portrait quality.`,
  `Warm amber candlelight creating intimate golden atmosphere, low-angle honey-gold key light emphasizing form, golden rim light creating divine outline.`,
  `Chiaroscuro firelight: Single strong source from fireplace creating dramatic contrast, deep shadows on one side, warm orange rim defining curves, Caravaggio intensity.`,
  `Soft diffused candlelight from multiple sources, even warm illumination (2400K), gentle shadows preserving detail, intimate boudoir atmosphere.`,
  `Dramatic single spotlight in darkness, figure emerging from black void, hard-edged theatrical lighting, gallery exhibition quality.`,
  `Mixed moonlight and candlelight: Cool blue from window mixing with warm amber candles, cinematic color contrast, mysterious midnight atmosphere.`
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

async function generateImage(prompt, outputPath, token) {
  const url = 'https://us-central1-aiplatform.googleapis.com/v1/projects/zaranovel/locations/us-central1/publishers/google/models/imagen-4.0-ultra-generate-001:predict';

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 120000); // 2 min timeout

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
      const status = response.status;
      if (status === 429) {
        console.log('    ⏳ Rate limited, waiting 60s...');
        await new Promise(r => setTimeout(r, 60000));
        return 'rate_limited';
      }
      throw new Error(`API error: ${status}`);
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
      console.log('    ⏳ Request timeout');
      return 'timeout';
    }
    throw err;
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// PROMPT BUILDER - Strict RAW PROMPT Enforcement
// ═══════════════════════════════════════════════════════════════════════════════

function buildPrompt(wardrobe, environment, pose, lighting) {
  return `RAW PROMPT:
shot: Full body portrait (3:4), baroque boudoir fine art, midnight intimate session.

subject:
variant: Stunning Indian haute couture supermodel Meera, age 27, standing 5'8" tall, athletic yet voluptuous hourglass figure with dramatic sculptural curves, bust 37DD creating elegant fullness with perfect teardrop shape, cinched waist at 27" emphasizing dramatic hourglass proportions, wide feminine hips measuring 40" completing classic proportions, sun-kissed bronze complexion with NATURAL MATTE FINISH (NO artificial sheen), visible skin pores with natural texture variation, fine vellus hair catching ambient light, authentic human skin texture with subtle natural imperfections, striking South Indian features with deep captivating dark magnetic eyes, full sensual lips naturally parted in serene contemplation, dramatic high cheekbones casting subtle shadows, defined elegant jawline leading to graceful swan neck, long flowing jet-black hair with natural wave cascading past shoulders, commanding presence of international runway supermodel.

pose: ${pose.desc}

hair_color: jet black
hair_style: long flowing waves with natural movement, catching warm highlights
skin_finish: Natural matte bronze with visible pores - NO artificial sheen
hand_and_nail_details: Elegant graceful positioning, natural manicure
tattoos: none
piercings: subtle gold ear studs
body_art: none
nail_art: Natural nude polish
high_heels: barefoot

wardrobe: ${wardrobe.desc}

environment: ${environment.desc}

lighting: ${lighting}

camera:
focal_length: 80mm
aperture: f/2.0
distance: 3 m
angle: 3/4 elevated classical
framing: Full body with baroque setting

color_grade: Rich burgundy and ivory, warm amber with platinum accents
style: Renaissance boudoir, Titian Venus reference, super-exclusive elite private collection
quality: Phase One IQ4. 8K, painterly quality, museum collection

figure_and_form: Classical Venus pose with maximum intimate reveal. Voluptuous hourglass proportions celebrated. Full sculptural curves visible.

skin_micro_details: Authentic museum-quality skin texture with visible pores and natural texture variation across shoulders and décolletage. Fine vellus hair catching ambient light along arms and midriff. NATURAL MATTE FINISH (NO artificial oily sheen). Real human skin quality with subtle natural imperfections. Warm bronze tones with golden undertones.

fabric_physics: delicate and organic, minimal coverage maximizing revealed form
material_properties: wardrobe as artistic accent, not concealment

STRICT ENFORCEMENT:
- Maximum intimacy (10/10+) exclusive private session
- Midnight themed indoor intimate sensuous reveal
- Minimal coverage - wardrobe as art, not concealment
- Natural matte skin - NO artificial sheen
- Authentic museum-quality photorealism
- 8K ULTRA-DETAILED. PRIVATE COLLECTION MASTERWORK.`;
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN CYCLE
// ═══════════════════════════════════════════════════════════════════════════════

async function runCycle(cycleNum) {
  console.log(`\n${'═'.repeat(70)}`);
  console.log(`🔥 MAX INTIMACY CYCLE ${cycleNum + 1}`);
  console.log(`   Intimacy: 10/10+ | Midnight Indoor | Baroque Fine Art`);
  console.log(`   Minimal Coverage | Private Collection Exclusive`);
  console.log(`${'═'.repeat(70)}`);

  const cycleDir = path.join(OUTPUT_DIR, `cycle-${String(cycleNum + 1).padStart(3, '0')}`);
  if (!fs.existsSync(cycleDir)) fs.mkdirSync(cycleDir, { recursive: true });

  let token = await getToken();
  const results = [];
  let cycleSuccess = 0;

  for (let i = 0; i < IMAGES_PER_CYCLE; i++) {
    const wardrobe = WARDROBES[(i + cycleNum) % WARDROBES.length];
    const environment = ENVIRONMENTS[(i + cycleNum * 2) % ENVIRONMENTS.length];
    const pose = POSES[(i + cycleNum * 3) % POSES.length];
    const lighting = LIGHTING[(i + cycleNum) % LIGHTING.length];

    const variantName = `meera_max_c${cycleNum + 1}_${wardrobe.name}_${pose.name}`;
    console.log(`\n  [${i + 1}/${IMAGES_PER_CYCLE}] ${variantName}`);
    console.log(`    Wardrobe: ${wardrobe.name}`);
    console.log(`    Pose: ${pose.name}`);
    console.log(`    Environment: ${environment.name}`);

    try {
      const prompt = buildPrompt(wardrobe, environment, pose, lighting);
      console.log(`    Prompt: ${prompt.length} chars`);
      console.log('    🔥 Generating max intimacy...');

      const filename = `${variantName}_${Date.now()}.png`;
      const outputPath = path.join(cycleDir, filename);

      const result = await generateImage(prompt, outputPath, token);

      if (result === 'success') {
        const sizeMB = (fs.statSync(outputPath).size / (1024 * 1024)).toFixed(2);
        console.log(`    ✅ ${filename} (${sizeMB} MB)`);
        results.push({ name: variantName, file: filename, size: sizeMB, status: 'success' });
        cycleSuccess++;
      } else if (result === 'rate_limited' || result === 'timeout') {
        console.log(`    ⏳ ${result} - will retry`);
        results.push({ name: variantName, status: result });
      } else {
        console.log('    ❌ Filtered');
        results.push({ name: variantName, status: 'filtered' });
      }

      if (i < IMAGES_PER_CYCLE - 1) {
        console.log('    ⏳ Waiting 15s...');
        await new Promise(r => setTimeout(r, 15000));
      }
    } catch (err) {
      console.log(`    ❌ Error: ${err.message}`);
      results.push({ name: variantName, status: 'error', error: err.message });
    }
  }

  console.log(`\n🔥 Cycle ${cycleNum + 1}: ${cycleSuccess}/${IMAGES_PER_CYCLE} successful`);

  fs.writeFileSync(path.join(cycleDir, 'manifest.json'), JSON.stringify({
    cycle: cycleNum + 1,
    results,
    timestamp: new Date().toISOString(),
    successCount: cycleSuccess
  }, null, 2));

  return cycleSuccess;
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════════════════════

async function main() {
  console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║   🔥 MEERA MAX INTIMACY - Ultra Private Collection                           ║
╠══════════════════════════════════════════════════════════════════════════════╣
║   Intimacy: 10/10+ | Minimal Coverage | Midnight Indoor                      ║
║   Baroque Boudoir Fine Art | Strict RAW PROMPT Enforcement                   ║
║   ${IMAGES_PER_CYCLE} images per cycle • 8 min intervals                                     ║
╚══════════════════════════════════════════════════════════════════════════════╝
`);

  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  let cycle = 0;
  let totalSuccess = 0;

  while (true) {
    const success = await runCycle(cycle);
    totalSuccess += success;
    cycle++;

    console.log(`\n📊 TOTAL: ${totalSuccess} max intimacy images across ${cycle} cycles`);
    console.log(`⏰ Next cycle in 8 minutes...\n`);

    await new Promise(r => setTimeout(r, CYCLE_INTERVAL));
  }
}

main().catch(console.error);
