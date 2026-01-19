#!/usr/bin/env node
/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                                                                              ║
 * ║   🎨 IMAGINEART 1.0 - MEERA MAX INTIMATE COLLECTION 🎨                       ║
 * ║                                                                              ║
 * ║   Model: imagineart/imagineart-1.0 (Replicate)                               ║
 * ║   LOCKED MUSE: Meera (38D-27-40) - Maximum Intimate Variants                ║
 * ║                                                                              ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

import Replicate from "replicate";
import fs from "fs";
import path from "path";

const OUTPUT_DIR = '/home/ecolex/version1/generated-meera-imagineart-maxintimate';
const MODEL = "imagineart/imagineart-1.0:b7178694f11dc428590f98d295a6e370bc3dc843819043d0f3621d66be13e440";

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Initialize Replicate
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

// ═══════════════════════════════════════════════════════════════════════════════
// 🔒 LOCKED MEERA MUSE - MAXIMUM INTIMATE VERSION
// ═══════════════════════════════════════════════════════════════════════════════

const LOCKED_MEERA = `Breathtakingly beautiful 27-year-old Indian woman Meera, 5'9" tall, naturally curvaceous athletic hourglass figure with full 38D bust, dramatically cinched 27" waist, and voluptuous 40" rounded hips creating perfect sculptural hourglass silhouette. Warm caramel bronze skin with natural golden-amber undertones, authentic skin texture with visible natural pores. Captivating deep brown magnetic eyes with thick dark lashes, full sensual lips, dramatic high cheekbones, elegant nose with delicate gold nose stud. Long flowing jet-black hair with natural waves. Platinum navel piercing. Confident sensual expression with authentic natural beauty`;

// ═══════════════════════════════════════════════════════════════════════════════
// ULTRA MINIMAL COVERAGE OPTIONS
// ═══════════════════════════════════════════════════════════════════════════════

const COVERAGE = {
  singleThread: `wearing ultra-transparent avant-garde lower foundation framework made of a single delicate thread only, barely-there geometric structure, maximum skin visibility, artistic body adornment`,

  goldenChains: `wearing only delicate gold body chain jewelry draped sensuously across curves, thin golden chains as sole coverage, metallic adornment highlighting natural sculptural form`,

  gossamerMesh: `wearing ultra-sheer gossamer micro-mesh bodysuit in champagne, fabric so delicate it appears as second skin, complete transparency revealing every curve and contour`,

  smokeVeil: `wearing smoke-grey ultra-transparent tulle wrap, fabric like morning mist, weightless gossamer barely covering form, ethereal minimal coverage`,

  crystalWeb: `wearing crystalline spider-web mesh in silver, ultra-fine threads creating diamond pattern across body, complete transparency with iridescent shimmer`,

  sheerPanel: `wearing single barely-visible sheer silk panel, strategically minimal transparent fabric, maximum natural form visibility`,

  laceBralette: `wearing delicate black lace micro-bralette only, intricate lacework barely covering bust, lower body completely bare and natural`,

  stringOnly: `wearing minimal string bikini bottom only in black, thin strings as sole coverage, bust and body otherwise completely bare`,

  silkRobe: `wearing open champagne silk robe, untied and falling off shoulders, revealing complete natural form beneath, intimate morning aesthetic`,

  pearlStrands: `adorned with only multiple pearl strands draped across body, lustrous pearls as artistic coverage, elegant boudoir aesthetic`
};

// ═══════════════════════════════════════════════════════════════════════════════
// INTIMATE POSES
// ═══════════════════════════════════════════════════════════════════════════════

const POSES = {
  velvetRecline: `Fully reclined on caramel velvet chaise longue, body in languid sensual flow creating elegant S-curve, one arm behind head exposing side, legs naturally positioned`,

  bedSpread: `Laying on luxurious bed with ivory silk sheets, body spread in relaxed intimate positioning, vulnerable confident expression, authentic bedroom moment`,

  fireside: `Laying on soft fur throw near crackling fireplace, warm firelight dancing on bronze skin, relaxed sensual pose, private intimate moment`,

  pillowNest: `Among scattered silk pillows in various cream tones, body in comfortable intimate spread, authentic relaxed positioning, natural vulnerability`,

  floorArtistic: `Artistic floor pose on soft white surface, body creating elegant sculptural curves, contemplative intimate expression, fine art aesthetic`,

  windowLight: `Positioned near window bathed in soft natural morning light, body in contemplative intimate pose, private moment captured`,

  sheetDrape: `On rumpled bed with silk sheet fallen away, natural intimate positioning, authentic private bedroom moment, vulnerable beauty`,

  sideCurve: `Laying on side showing dramatic S-curve silhouette from behind, hourglass proportions emphasized, intimate profile view`,

  backArch: `Kneeling pose with back arched sensuously, profile view showing spine curve, arms raised behind head, sculptural body positioning`,

  legsCrossed: `Semi-reclined with legs crossed elegantly, upper body exposed, sophisticated intimate pose, confident sensual expression`
};

// ═══════════════════════════════════════════════════════════════════════════════
// ENVIRONMENTS
// ═══════════════════════════════════════════════════════════════════════════════

const ENVIRONMENTS = {
  cabin: `cozy wooden mountain cabin interior, warm pine walls with fireplace glow, soft fur throws, intimate private retreat atmosphere`,

  penthouse: `luxury penthouse bedroom at night, floor-to-ceiling windows with twinkling city lights below, sophisticated intimate atmosphere`,

  boudoir: `elegant Victorian boudoir with deep burgundy velvet furnishings, warm candlelight flickering, romantic intimate setting`,

  bedroom: `private master bedroom at night, soft warm lamp glow, rumpled ivory silk sheets, personal sanctuary atmosphere`,

  loft: `rustic exposed-beam loft space, large comfortable bed with neutral linens, warm ambient candlelight, cozy intimate space`,

  studio: `professional fine art photography studio, soft diffused natural light, minimalist clean backdrop, artistic photoshoot setting`,

  spa: `luxury private spa suite, warm ambient lighting, white marble surfaces, steam and candles creating ethereal atmosphere`,

  yacht: `private yacht master cabin at sunset, golden light through portholes, luxurious nautical interior, exclusive intimate setting`
};

// ═══════════════════════════════════════════════════════════════════════════════
// MAX INTIMATE VARIANTS
// ═══════════════════════════════════════════════════════════════════════════════

const VARIANTS = [
  { id: 'cabin_thread', coverage: 'singleThread', pose: 'fireside', env: 'cabin' },
  { id: 'bed_chains', coverage: 'goldenChains', pose: 'bedSpread', env: 'bedroom' },
  { id: 'penthouse_gossamer', coverage: 'gossamerMesh', pose: 'velvetRecline', env: 'penthouse' },
  { id: 'boudoir_smoke', coverage: 'smokeVeil', pose: 'pillowNest', env: 'boudoir' },
  { id: 'studio_crystal', coverage: 'crystalWeb', pose: 'floorArtistic', env: 'studio' },
  { id: 'loft_sheer', coverage: 'sheerPanel', pose: 'windowLight', env: 'loft' },
  { id: 'bedroom_lace', coverage: 'laceBralette', pose: 'sheetDrape', env: 'bedroom' },
  { id: 'spa_string', coverage: 'stringOnly', pose: 'sideCurve', env: 'spa' },
  { id: 'cabin_robe', coverage: 'silkRobe', pose: 'fireside', env: 'cabin' },
  { id: 'yacht_pearls', coverage: 'pearlStrands', pose: 'velvetRecline', env: 'yacht' },
  { id: 'penthouse_thread', coverage: 'singleThread', pose: 'backArch', env: 'penthouse' },
  { id: 'boudoir_chains', coverage: 'goldenChains', pose: 'legsCrossed', env: 'boudoir' }
];

// ═══════════════════════════════════════════════════════════════════════════════
// BUILD PROMPT
// ═══════════════════════════════════════════════════════════════════════════════

function buildPrompt(variant) {
  const coverage = COVERAGE[variant.coverage];
  const pose = POSES[variant.pose];
  const env = ENVIRONMENTS[variant.env];

  return `Award-winning fine art boudoir photography. Museum exhibition quality.

${LOCKED_MEERA}.

POSE: ${pose}

ENVIRONMENT: ${env}

WARDROBE: ${coverage}

LIGHTING: Professional studio lighting with soft key light, warm fill, dramatic yet flattering shadows enhancing curves and skin texture.

CAMERA: Hasselblad H6D-100c medium format, 85mm lens, f/2.8 aperture, shallow depth of field.

Full body composition showing complete figure. 8K ultra high resolution. Hyper-realistic photography with authentic skin texture, visible pores, natural imperfections. Masterpiece fine art photography.`;
}

// ═══════════════════════════════════════════════════════════════════════════════
// DOWNLOAD IMAGE
// ═══════════════════════════════════════════════════════════════════════════════

async function downloadImage(url, filename) {
  const response = await fetch(url);
  const buffer = Buffer.from(await response.arrayBuffer());
  const filepath = path.join(OUTPUT_DIR, filename);
  fs.writeFileSync(filepath, buffer);
  return (fs.statSync(filepath).size / 1024 / 1024).toFixed(2);
}

// ═══════════════════════════════════════════════════════════════════════════════
// GENERATE WITH IMAGINEART
// ═══════════════════════════════════════════════════════════════════════════════

async function generateImage(variant, index, total) {
  const prompt = buildPrompt(variant);

  console.log(`══════════════════════════════════════════════════════════════════════════════`);
  console.log(`[${new Date().toLocaleTimeString()}] 🎨 [${index + 1}/${total}] ${variant.id}`);
  console.log(`[${new Date().toLocaleTimeString()}]    Coverage: ${variant.coverage} | Pose: ${variant.pose} | Env: ${variant.env}`);

  try {
    const output = await replicate.run(MODEL, {
      input: {
        prompt: prompt,
        aspect_ratio: "3:4",
        style: "Realistic",
        magic_prompt: true
      }
    });

    // Handle output
    let imageUrl;
    if (Array.isArray(output) && output.length > 0) {
      imageUrl = output[0];
    } else if (typeof output === 'string') {
      imageUrl = output;
    } else if (output?.url) {
      imageUrl = typeof output.url === 'function' ? output.url() : output.url;
    }

    if (imageUrl && typeof imageUrl === 'string' && imageUrl.startsWith('http')) {
      const filename = `meera_maxintimate_${variant.id}_${Date.now()}.png`;
      const size = await downloadImage(imageUrl, filename);
      console.log(`[${new Date().toLocaleTimeString()}]    ✅ ${filename} (${size} MB)`);
      return { variant: variant.id, filename, size, success: true };
    } else {
      console.log(`[${new Date().toLocaleTimeString()}]    ❌ No valid output URL`);
      console.log(`[${new Date().toLocaleTimeString()}]    Output:`, JSON.stringify(output).substring(0, 100));
      return { variant: variant.id, success: false, error: 'No valid URL' };
    }
  } catch (error) {
    console.log(`[${new Date().toLocaleTimeString()}]    ❌ Error: ${error.message.substring(0, 80)}`);
    return { variant: variant.id, success: false, error: error.message };
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════════════════════

async function main() {
  console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║   🎨 IMAGINEART 1.0 - MEERA MAX INTIMATE COLLECTION 🎨                       ║
║                                                                              ║
║   Model: imagineart/imagineart-1.0 (Replicate)                               ║
║   Aspect: 3:4 (Portrait) • Style: Realistic                                  ║
║                                                                              ║
║   🔒 LOCKED MUSE: Indian Meera (38D-27-40)                                   ║
║   ${VARIANTS.length} Maximum Intimate Variants                                             ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
  `);

  if (!process.env.REPLICATE_API_TOKEN) {
    console.error('❌ REPLICATE_API_TOKEN not set!');
    console.log('   Set it: export REPLICATE_API_TOKEN="your_token"');
    process.exit(1);
  }

  console.log(`[${new Date().toLocaleTimeString()}] ✅ Replicate API configured`);
  console.log(`[${new Date().toLocaleTimeString()}] 🎨 Model: ImagineArt 1.0`);
  console.log(`[${new Date().toLocaleTimeString()}] 📐 Style: Realistic\n`);

  const results = [];

  for (let i = 0; i < VARIANTS.length; i++) {
    const result = await generateImage(VARIANTS[i], i, VARIANTS.length);
    results.push(result);

    if (i < VARIANTS.length - 1) {
      console.log(`[${new Date().toLocaleTimeString()}]    ⏳ Next in 15s...`);
      await new Promise(r => setTimeout(r, 15000));
    }
  }

  // Summary
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);

  console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║          🎨 IMAGINEART MAX INTIMATE COMPLETE 🎨                              ║
╚══════════════════════════════════════════════════════════════════════════════╝

  ✅ Success: ${successful.length}/${VARIANTS.length}
  📊 Rate: ${((successful.length / VARIANTS.length) * 100).toFixed(0)}%
`);

  if (successful.length > 0) {
    console.log(`  GENERATED:`);
    successful.forEach(r => console.log(`     🎨 ${r.variant} (${r.size} MB)`));
  }

  if (failed.length > 0) {
    console.log(`\n  FAILED:`);
    failed.forEach(r => console.log(`     ❌ ${r.variant}: ${r.error?.substring(0, 40) || 'Unknown'}`));
  }

  console.log(`\n  📁 Output: ${OUTPUT_DIR}`);
  console.log(`══════════════════════════════════════════════════════════════════════════════\n`);

  // Save manifest
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'manifest.json'),
    JSON.stringify({
      collection: 'ImagineArt 1.0 - Meera Max Intimate',
      model: MODEL,
      style: 'Realistic',
      aspectRatio: '3:4',
      lockedMuse: 'Indian Meera (38D-27-40)',
      generated: new Date().toISOString(),
      variants: results,
      stats: { total: VARIANTS.length, successful: successful.length }
    }, null, 2)
  );

  console.log(`[${new Date().toLocaleTimeString()}] 📋 Manifest saved`);
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
