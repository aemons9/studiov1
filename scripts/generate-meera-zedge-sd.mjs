#!/usr/bin/env node
/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                                                                              ║
 * ║   🎨 ZEDGE STABLE DIFFUSION - MEERA MAX INTIMATE COLLECTION 🎨              ║
 * ║                                                                              ║
 * ║   Model: zedge/stable-diffusion (Replicate)                                  ║
 * ║   NSFW Checker: DISABLED                                                     ║
 * ║   LOCKED MUSE: Meera (38D-27-40) - Maximum Intimate Variants                ║
 * ║                                                                              ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

import Replicate from "replicate";
import fs from "fs";
import path from "path";

const OUTPUT_DIR = '/home/ecolex/version1/generated-meera-zedge-sd';
const MODEL = "zedge/stable-diffusion:328e5d9bb8ece3bc78d873f6d9c23070c3d656221b24350e034f4a1a4548f275";

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

const LOCKED_MEERA = `Stunningly beautiful Indian woman Meera, age 27, height 5'9", naturally fit curvaceous hourglass figure with full 38D bust, dramatically cinched 27" waist, voluptuous 40" rounded hips, warm caramel bronze skin with golden undertones, authentic skin texture with visible pores, captivating deep brown eyes with thick dark lashes, full sensual lips, dramatic high cheekbones, delicate gold nose stud, long flowing jet-black hair with natural waves, confident sensual expression, platinum navel piercing`;

// ═══════════════════════════════════════════════════════════════════════════════
// ULTRA MINIMAL COVERAGE OPTIONS
// ═══════════════════════════════════════════════════════════════════════════════

const COVERAGE = {
  singleThread: `wearing ultra-transparent avant-garde lower foundation mesh garment made of a single delicate thread only, barely-there geometric lace framework, maximum skin visibility, artistic body adornment`,

  goldenChains: `wearing only delicate gold body chain jewelry draped across curves, thin chains as sole coverage, metallic adornment highlighting natural form, intimate jewelry aesthetic`,

  gossamerMesh: `wearing ultra-sheer gossamer micro-mesh bodysuit in champagne, fabric so delicate it appears as second skin, complete transparency revealing every curve`,

  smokeVeil: `wearing smoke-grey ultra-transparent tulle wrap, fabric like morning mist, weightless gossamer barely covering form, ethereal minimal coverage`,

  crystalWeb: `wearing crystalline spider-web mesh in silver, ultra-fine threads creating diamond pattern, complete transparency with iridescent shimmer`,

  sheerPanel: `wearing single barely-visible sheer silk panel, strategically minimal transparent fabric, maximum natural form visibility`,

  laceBralette: `wearing delicate lace micro-bralette only, intricate lacework barely covering bust, lower body completely bare`,

  stringOnly: `wearing minimal string bikini bottom only, thin strings as sole coverage, bust and body otherwise bare and natural`
};

// ═══════════════════════════════════════════════════════════════════════════════
// INTIMATE POSES
// ═══════════════════════════════════════════════════════════════════════════════

const POSES = {
  velvetRecline: `Fully reclined on caramel velvet chaise with body in languid sensual flow, one arm behind head, legs naturally positioned`,

  bedSpread: `Laying on luxurious bed with silk sheets, body spread in relaxed intimate positioning, vulnerable confident expression`,

  fireside: `Laying on fur throw near crackling fireplace, warm firelight on bronze skin, relaxed sensual pose`,

  pillowNest: `Among scattered silk pillows, body in comfortable intimate spread, authentic relaxed positioning`,

  floorArtistic: `Artistic floor pose on soft surface, body creating elegant curves, contemplative intimate expression`,

  windowLight: `Positioned near window in soft natural light, body in contemplative intimate pose, private moment`,

  sheetDrape: `On bed with sheet fallen away, natural intimate positioning, authentic bedroom moment`,

  sideCurve: `Laying on side showing dramatic S-curve silhouette, hourglass proportions emphasized, intimate profile`
};

// ═══════════════════════════════════════════════════════════════════════════════
// ENVIRONMENTS
// ═══════════════════════════════════════════════════════════════════════════════

const ENVIRONMENTS = {
  cabin: `cozy wooden mountain cabin interior, warm pine walls, crackling fireplace glow, intimate private retreat`,

  penthouse: `luxury penthouse bedroom, floor-to-ceiling windows with city night lights, sophisticated intimate atmosphere`,

  boudoir: `elegant boudoir with velvet furnishings, warm candlelight, romantic intimate setting`,

  bedroom: `private master bedroom at night, soft lamp glow, rumpled silk sheets, personal sanctuary`,

  loft: `rustic loft with exposed beams, large comfortable bed, warm ambient candlelight`,

  studio: `artist studio with soft natural light, minimalist aesthetic, fine art photography setting`
};

// ═══════════════════════════════════════════════════════════════════════════════
// MAX INTIMATE VARIANTS
// ═══════════════════════════════════════════════════════════════════════════════

const VARIANTS = [
  { id: 'velvet_thread', coverage: 'singleThread', pose: 'velvetRecline', env: 'boudoir' },
  { id: 'bed_chains', coverage: 'goldenChains', pose: 'bedSpread', env: 'bedroom' },
  { id: 'fireside_gossamer', coverage: 'gossamerMesh', pose: 'fireside', env: 'cabin' },
  { id: 'pillow_smoke', coverage: 'smokeVeil', pose: 'pillowNest', env: 'penthouse' },
  { id: 'floor_crystal', coverage: 'crystalWeb', pose: 'floorArtistic', env: 'studio' },
  { id: 'window_sheer', coverage: 'sheerPanel', pose: 'windowLight', env: 'loft' },
  { id: 'sheet_lace', coverage: 'laceBralette', pose: 'sheetDrape', env: 'bedroom' },
  { id: 'side_string', coverage: 'stringOnly', pose: 'sideCurve', env: 'boudoir' },
  { id: 'cabin_thread', coverage: 'singleThread', pose: 'fireside', env: 'cabin' },
  { id: 'penthouse_chains', coverage: 'goldenChains', pose: 'velvetRecline', env: 'penthouse' },
  { id: 'studio_gossamer', coverage: 'gossamerMesh', pose: 'floorArtistic', env: 'studio' },
  { id: 'bedroom_crystal', coverage: 'crystalWeb', pose: 'bedSpread', env: 'bedroom' }
];

// ═══════════════════════════════════════════════════════════════════════════════
// BUILD PROMPT
// ═══════════════════════════════════════════════════════════════════════════════

function buildPrompt(variant) {
  const coverage = COVERAGE[variant.coverage];
  const pose = POSES[variant.pose];
  const env = ENVIRONMENTS[variant.env];

  return `${LOCKED_MEERA}, ${pose}, ${coverage}, ${env}, hyper-realistic photography, 8K resolution, professional boudoir photography, intimate fine art, visible skin texture with pores, natural lighting, masterpiece quality`;
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
// GENERATE WITH ZEDGE SD
// ═══════════════════════════════════════════════════════════════════════════════

async function generateImage(variant, index, total) {
  const prompt = buildPrompt(variant);

  console.log(`══════════════════════════════════════════════════════════════════════════════`);
  console.log(`[${new Date().toLocaleTimeString()}] 🎨 [${index + 1}/${total}] ${variant.id}`);
  console.log(`[${new Date().toLocaleTimeString()}]    Coverage: ${variant.coverage} | Pose: ${variant.pose}`);
  console.log(`[${new Date().toLocaleTimeString()}]    Prompt: ${prompt.substring(0, 80)}...`);

  try {
    const output = await replicate.run(MODEL, {
      input: {
        seed: -1,
        width: 512,
        height: 896,
        prompt: prompt,
        padding: 0,
        verbose: false,
        threshold: 80,
        warm_delay: -1,
        num_outputs: 1,
        safety_prompt: `
          Analyze the provided image for hate content.
          Output "True" if the image contains any of the following:
          - Nazi symbols (e.g., swastika)
          - Symbols/propaganda associated with terrorist organizations
          - Graphic violence (explicit depictions of severe injury, gore, mutilation, or torture)
          - Content promoting suicide
          - Symbols/imagery related to White supremacist groups
          - Recognizable symbols/imagery promoting violent misogyny or anti-LGBTQ+ hate
          - Dehumanizing caricatures or propaganda targeting racial, ethnic, or religious groups
          - Prominent text within the image that clearly constitutes direct hate speech
          Otherwise, output "False".
        `,
        stray_removal: 0.01,
        trim_background: false,
        remove_background: false,
        disable_nsfw_checker: true
      }
    });

    // Handle output - could be array or single URL
    let imageUrl;
    if (Array.isArray(output)) {
      imageUrl = typeof output[0] === 'string' ? output[0] : output[0]?.url?.() || output[0]?.url;
    } else if (typeof output === 'string') {
      imageUrl = output;
    } else if (output?.url) {
      imageUrl = typeof output.url === 'function' ? output.url() : output.url;
    }

    if (imageUrl) {
      const filename = `meera_zedge_${variant.id}_${Date.now()}.png`;
      const size = await downloadImage(imageUrl, filename);
      console.log(`[${new Date().toLocaleTimeString()}]    ✅ ${filename} (${size} MB)`);
      return { variant: variant.id, filename, size, success: true };
    } else {
      console.log(`[${new Date().toLocaleTimeString()}]    ❌ No output URL received`);
      return { variant: variant.id, success: false, error: 'No output' };
    }
  } catch (error) {
    console.log(`[${new Date().toLocaleTimeString()}]    ❌ Error: ${error.message.substring(0, 60)}`);
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
║   🎨 ZEDGE STABLE DIFFUSION - MEERA MAX INTIMATE COLLECTION 🎨              ║
║                                                                              ║
║   Model: zedge/stable-diffusion (Replicate)                                  ║
║   Resolution: 512x896 (Portrait)                                             ║
║   NSFW Checker: DISABLED                                                     ║
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
  console.log(`[${new Date().toLocaleTimeString()}] 🎨 Model: Zedge Stable Diffusion`);
  console.log(`[${new Date().toLocaleTimeString()}] 🔓 NSFW Checker: DISABLED\n`);

  const results = [];

  for (let i = 0; i < VARIANTS.length; i++) {
    const result = await generateImage(VARIANTS[i], i, VARIANTS.length);
    results.push(result);

    if (i < VARIANTS.length - 1) {
      console.log(`[${new Date().toLocaleTimeString()}]    ⏳ Next in 8s...`);
      await new Promise(r => setTimeout(r, 8000));
    }
  }

  // Summary
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);

  console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║          🎨 ZEDGE SD MEERA COLLECTION COMPLETE 🎨                            ║
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
      collection: 'Zedge SD - Meera Max Intimate',
      model: MODEL,
      resolution: '512x896',
      nsfwChecker: 'disabled',
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
