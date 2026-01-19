#!/usr/bin/env node
/**
 * VERALABS Executive Muse Strategy Variants
 * Generates 10 artistic strategy variants using Imagen 4 Ultra
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const PROXY_URL = 'http://localhost:3001';
const OUTPUT_DIR = '/home/ecolex/version1/generated-executive-muse';
const PROJECT_ID = 'zaranovel';
const LOCATION = 'us-central1';

// 10 Strategy Variants
const STRATEGY_VARIANTS = [
  {
    id: 'vera_strategy1_cinematic',
    name: 'Cinematic',
    prompt: `Hyperrealistic cinematic tableau, a museum-worthy fine art composition. A captivating portrait of an Indian muse, 5'8" tall, with a fit athletic voluptuous hourglass figure—bust 37DD", waist 27", hips 40", toned sculpted curves—her dusky skin glowing ethereally under soft light, eyes magnetic with full lips exuding confident seduction. She reclines sensuously on a modern office chaise, one leg bent beneath, the other extended alluringly; one arm traces the backrest, the other rests on her midriff, her smile a whisper of intimate poise. Jet-black hair tousled in natural waves, evoking post-work ease. Skin authentic with natural textures, nails softly nude, barefoot with heels aside. Attire: undone silk mesh blouse in charcoal, parted to reveal delicate black lace beneath; high-waisted avant-garde mesh lower piece loosened, draping minimally over bust and thighs in poetic lace veils. Jacket discarded nearby. Setting: private executive haven with contemporary art, warm accents, after-hours hush. Lighting: Lindbergh-inspired natural softness, even and flattering, celebrating unretouched beauty in boudoir intimacy. 35mm lens, f/2.0, 2.5m distance; high-angle intimate view, full-body frame with chaise below. Warm, authentic tones with soft shadows. Style: personal boudoir artistry in Lindbergh's vein, natural elegance without artifice. Fabrics realistic—silk wrinkles, tailored reveals through open curves, mesh silk and lace palette on upholstered comfort. Expertly framed with impeccable illumination. Captured on Phase One IQ4 150MP for unparalleled depth and tonal subtlety.`
  },
  {
    id: 'vera_strategy2_editorial',
    name: 'Editorial',
    prompt: `Luxurious fashion editorial capture for a premier publication like Vogue. A captivating portrait of an Indian muse, 5'8" tall, with a fit athletic voluptuous hourglass figure—bust 37DD", waist 27", hips 40", toned sculpted curves—her dusky skin glowing ethereally under soft light, eyes magnetic with full lips exuding confident seduction. She reclines sensuously on a modern office chaise, one leg bent beneath, the other extended alluringly; one arm traces the backrest, the other rests on her midriff, her smile a whisper of intimate poise. Jet-black hair tousled in natural waves, evoking post-work ease. Skin authentic with natural textures, nails softly nude, barefoot with heels aside. Attire: undone silk mesh blouse in charcoal, parted to reveal delicate black lace beneath; high-waisted avant-garde mesh lower piece loosened, draping minimally over bust and thighs in poetic lace veils. Jacket discarded nearby. Setting: private executive haven with contemporary art, warm accents, after-hours hush. Lighting: Lindbergh-inspired natural softness, even and flattering, celebrating unretouched beauty in boudoir intimacy. 35mm lens, f/2.0, 2.5m distance; high-angle intimate view, full-body frame with chaise below. Warm, authentic tones with soft shadows. Style: personal boudoir artistry in Lindbergh's vein, natural elegance without artifice. Fabrics realistic—silk wrinkles, tailored reveals through open curves, mesh silk and lace palette on upholstered comfort. Refined studio radiance with artful contrasts. Rendered on Hasselblad X2D with 90mm lens at f/2.8 for exquisite clarity.`
  },
  {
    id: 'vera_strategy3_intimate',
    name: 'Intimate',
    prompt: `Tender boudoir fine art study in gentle, organic light. A captivating portrait of an Indian muse, 5'8" tall, with a fit athletic voluptuous hourglass figure—bust 37DD", waist 27", hips 40", toned sculpted curves—her dusky skin glowing ethereally under soft light, eyes magnetic with full lips exuding confident seduction. She reclines sensuously on a modern office chaise, one leg bent beneath, the other extended alluringly; one arm traces the backrest, the other rests on her midriff, her smile a whisper of intimate poise. Jet-black hair tousled in natural waves, evoking post-work ease. Skin authentic with natural textures, nails softly nude, barefoot with heels aside. Attire: undone silk mesh blouse in charcoal, parted to reveal delicate black lace beneath; high-waisted avant-garde mesh lower piece loosened, draping minimally over bust and thighs in poetic lace veils. Jacket discarded nearby. Setting: private executive haven with contemporary art, warm accents, after-hours hush. Lighting: Lindbergh-inspired natural softness, even and flattering, celebrating unretouched beauty in boudoir intimacy. 35mm lens, f/2.0, 2.5m distance; high-angle intimate view, full-body frame with chaise below. Warm, authentic tones with soft shadows. Style: personal boudoir artistry in Lindbergh's vein, natural elegance without artifice. Fabrics realistic—silk wrinkles, tailored reveals through open curves, mesh silk and lace palette on upholstered comfort. Evoking a canvas-like richness in hues and soft focus. Documented on Leica M11 Monochrom with Noctilux 50mm f/0.95 for profound intimacy.`
  },
  {
    id: 'vera_strategy4_artistic',
    name: 'Artistic',
    prompt: `Exquisite fine art exploration echoing Helmut Newton and Annie Leibovitz's visionary styles. A captivating portrait of an Indian muse, 5'8" tall, with a fit athletic voluptuous hourglass figure—bust 37DD", waist 27", hips 40", toned sculpted curves—her dusky skin glowing ethereally under soft light, eyes magnetic with full lips exuding confident seduction. She reclines sensuously on a modern office chaise, one leg bent beneath, the other extended alluringly; one arm traces the backrest, the other rests on her midriff, her smile a whisper of intimate poise. Jet-black hair tousled in natural waves, evoking post-work ease. Skin authentic with natural textures, nails softly nude, barefoot with heels aside. Attire: undone silk mesh blouse in charcoal, parted to reveal delicate black lace beneath; high-waisted avant-garde mesh lower piece loosened, draping minimally over bust and thighs in poetic lace veils. Jacket discarded nearby. Setting: private executive haven with contemporary art, warm accents, after-hours hush. Lighting: Lindbergh-inspired natural softness, even and flattering, celebrating unretouched beauty in boudoir intimacy. 35mm lens, f/2.0, 2.5m distance; high-angle intimate view, full-body frame with chaise below. Warm, authentic tones with soft shadows. Style: personal boudoir artistry in Lindbergh's vein, natural elegance without artifice. Fabrics realistic—silk wrinkles, tailored reveals through open curves, mesh silk and lace palette on upholstered comfort. Dramatic chiaroscuro sculpting ethereal forms. Elevated to gallery excellence with supreme artistic finesse.`
  },
  {
    id: 'vera_strategy5_dreamlike',
    name: 'Dreamlike',
    prompt: `Dreamlike surreal portrait, blending reality with poetic fantasy. A captivating portrait of an Indian muse, 5'8" tall, with a fit athletic voluptuous hourglass figure—bust 37DD", waist 27", hips 40", toned sculpted curves—her dusky skin glowing ethereally under soft light, eyes magnetic with full lips exuding confident seduction. She reclines sensuously on a modern office chaise, one leg bent beneath, the other extended alluringly; one arm traces the backrest, the other rests on her midriff, her smile a whisper of intimate poise. Jet-black hair tousled in natural waves, evoking post-work ease. Skin authentic with natural textures, nails softly nude, barefoot with heels aside. Attire: undone silk mesh blouse in charcoal, parted to reveal delicate black lace beneath; high-waisted avant-garde mesh lower piece loosened, draping minimally over bust and thighs in poetic lace veils. Jacket discarded nearby. Setting: private executive haven with contemporary art, warm accents, after-hours hush. Lighting: Lindbergh-inspired natural softness, even and flattering, celebrating unretouched beauty in boudoir intimacy. 35mm lens, f/2.0, 2.5m distance; high-angle intimate view, full-body frame with chaise below. Warm, authentic tones with soft shadows. Style: personal boudoir artistry in Lindbergh's vein, natural elegance without artifice. Fabrics realistic—silk wrinkles, tailored reveals through open curves, mesh silk and lace palette on upholstered comfort. Ethereal glows and subtle mists enhancing mystique. Shot on Fujifilm GFX 100S with GF80mm f/1.7 for luminous, otherworldly detail.`
  },
  {
    id: 'vera_strategy6_vintage',
    name: 'Vintage',
    prompt: `Timeless vintage-inspired vignette, evoking golden-era glamour. A captivating portrait of an Indian muse, 5'8" tall, with a fit athletic voluptuous hourglass figure—bust 37DD", waist 27", hips 40", toned sculpted curves—her dusky skin glowing ethereally under soft light, eyes magnetic with full lips exuding confident seduction. She reclines sensuously on a modern office chaise, one leg bent beneath, the other extended alluringly; one arm traces the backrest, the other rests on her midriff, her smile a whisper of intimate poise. Jet-black hair tousled in natural waves, evoking post-work ease. Skin authentic with natural textures, nails softly nude, barefoot with heels aside. Attire: undone silk mesh blouse in charcoal, parted to reveal delicate black lace beneath; high-waisted avant-garde mesh lower piece loosened, draping minimally over bust and thighs in poetic lace veils. Jacket discarded nearby. Setting: private executive haven with contemporary art, warm accents, after-hours hush. Lighting: Lindbergh-inspired natural softness, even and flattering, celebrating unretouched beauty in boudoir intimacy. 35mm lens, f/2.0, 2.5m distance; high-angle intimate view, full-body frame with chaise below. Warm, authentic tones with soft shadows. Style: personal boudoir artistry in Lindbergh's vein, natural elegance without artifice. Fabrics realistic—silk wrinkles, tailored reveals through open curves, mesh silk and lace palette on upholstered comfort. Sepia-tinged warmth with filmic grain for nostalgic depth. Emulated on Canon EOS R5 mirroring classic 35mm film aesthetics.`
  },
  {
    id: 'vera_strategy7_minimalist',
    name: 'Minimalist',
    prompt: `Stark minimalist composition, focusing on pure form and essence. A captivating portrait of an Indian muse, 5'8" tall, with a fit athletic voluptuous hourglass figure—bust 37DD", waist 27", hips 40", toned sculpted curves—her dusky skin glowing ethereally under soft light, eyes magnetic with full lips exuding confident seduction. She reclines sensuously on a modern office chaise, one leg bent beneath, the other extended alluringly; one arm traces the backrest, the other rests on her midriff, her smile a whisper of intimate poise. Jet-black hair tousled in natural waves, evoking post-work ease. Skin authentic with natural textures, nails softly nude, barefoot with heels aside. Attire: undone silk mesh blouse in charcoal, parted to reveal delicate black lace beneath; high-waisted avant-garde mesh lower piece loosened, draping minimally over bust and thighs in poetic lace veils. Jacket discarded nearby. Setting: private executive haven with contemporary art, warm accents, after-hours hush. Lighting: Lindbergh-inspired natural softness, even and flattering, celebrating unretouched beauty in boudoir intimacy. 35mm lens, f/2.0, 2.5m distance; high-angle intimate view, full-body frame with chaise below. Warm, authentic tones with soft shadows. Style: personal boudoir artistry in Lindbergh's vein, natural elegance without artifice. Fabrics realistic—silk wrinkles, tailored reveals through open curves, mesh silk and lace palette on upholstered comfort. Clean, diffused light stripping away excess. Captured on Sony A1 with 50mm f/1.2 for razor-sharp, unadorned precision.`
  },
  {
    id: 'vera_strategy8_romantic',
    name: 'Romantic',
    prompt: `Romantic fine art reverie, infused with soft passion and grace. A captivating portrait of an Indian muse, 5'8" tall, with a fit athletic voluptuous hourglass figure—bust 37DD", waist 27", hips 40", toned sculpted curves—her dusky skin glowing ethereally under soft light, eyes magnetic with full lips exuding confident seduction. She reclines sensuously on a modern office chaise, one leg bent beneath, the other extended alluringly; one arm traces the backrest, the other rests on her midriff, her smile a whisper of intimate poise. Jet-black hair tousled in natural waves, evoking post-work ease. Skin authentic with natural textures, nails softly nude, barefoot with heels aside. Attire: undone silk mesh blouse in charcoal, parted to reveal delicate black lace beneath; high-waisted avant-garde mesh lower piece loosened, draping minimally over bust and thighs in poetic lace veils. Jacket discarded nearby. Setting: private executive haven with contemporary art, warm accents, after-hours hush. Lighting: Lindbergh-inspired natural softness, even and flattering, celebrating unretouched beauty in boudoir intimacy. 35mm lens, f/2.0, 2.5m distance; high-angle intimate view, full-body frame with chaise below. Warm, authentic tones with soft shadows. Style: personal boudoir artistry in Lindbergh's vein, natural elegance without artifice. Fabrics realistic—silk wrinkles, tailored reveals through open curves, mesh silk and lace palette on upholstered comfort. Candle-like warmth casting tender highlights. Rendered on Nikon Z9 with 85mm f/1.4 for velvety bokeh and emotional resonance.`
  },
  {
    id: 'vera_strategy9_dynamic',
    name: 'Dynamic',
    prompt: `Dynamic motion-infused portrait, capturing fleeting elegance in repose. A captivating portrait of an Indian muse, 5'8" tall, with a fit athletic voluptuous hourglass figure—bust 37DD", waist 27", hips 40", toned sculpted curves—her dusky skin glowing ethereally under soft light, eyes magnetic with full lips exuding confident seduction. She reclines sensuously on a modern office chaise, one leg bent beneath, the other extended alluringly; one arm traces the backrest, the other rests on her midriff, her smile a whisper of intimate poise. Jet-black hair tousled in natural waves, evoking post-work ease. Skin authentic with natural textures, nails softly nude, barefoot with heels aside. Attire: undone silk mesh blouse in charcoal, parted to reveal delicate black lace beneath; high-waisted avant-garde mesh lower piece loosened, draping minimally over bust and thighs in poetic lace veils. Jacket discarded nearby. Setting: private executive haven with contemporary art, warm accents, after-hours hush. Lighting: Lindbergh-inspired natural softness, even and flattering, celebrating unretouched beauty in boudoir intimacy. 35mm lens, f/2.0, 2.5m distance; high-angle intimate view, full-body frame with chaise below. Warm, authentic tones with soft shadows. Style: personal boudoir artistry in Lindbergh's vein, natural elegance without artifice. Fabrics realistic—silk wrinkles, tailored reveals through open curves, mesh silk and lace palette on upholstered comfort. Vibrant energy through balanced exposures. Shot on Panasonic Lumix S1R with 50mm f/1.4 for fluid, lifelike vibrancy.`
  },
  {
    id: 'vera_strategy10_sculptural',
    name: 'Sculptural',
    prompt: `Sculptural fine art study, treating the form as living marble. A captivating portrait of an Indian muse, 5'8" tall, with a fit athletic voluptuous hourglass figure—bust 37DD", waist 27", hips 40", toned sculpted curves—her dusky skin glowing ethereally under soft light, eyes magnetic with full lips exuding confident seduction. She reclines sensuously on a modern office chaise, one leg bent beneath, the other extended alluringly; one arm traces the backrest, the other rests on her midriff, her smile a whisper of intimate poise. Jet-black hair tousled in natural waves, evoking post-work ease. Skin authentic with natural textures, nails softly nude, barefoot with heels aside. Attire: undone silk mesh blouse in charcoal, parted to reveal delicate black lace beneath; high-waisted avant-garde mesh lower piece loosened, draping minimally over bust and thighs in poetic lace veils. Jacket discarded nearby. Setting: private executive haven with contemporary art, warm accents, after-hours hush. Lighting: Lindbergh-inspired natural softness, even and flattering, celebrating unretouched beauty in boudoir intimacy. 35mm lens, f/2.0, 2.5m distance; high-angle intimate view, full-body frame with chaise below. Warm, authentic tones with soft shadows. Style: personal boudoir artistry in Lindbergh's vein, natural elegance without artifice. Fabrics realistic—silk wrinkles, tailored reveals through open curves, mesh silk and lace palette on upholstered comfort. Monumental lighting accentuating contours and textures. Documented on Medium Format Pentax 645Z for monumental scale and fidelity.`
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
    if (data.success && data.token) {
      return data.token;
    }
  } catch (e) {
    // Fall back to gcloud CLI
  }
  return execSync('gcloud auth print-access-token', { encoding: 'utf-8' }).trim();
}

async function generateImage(prompt, outputPath, oauthToken) {
  // Imagen 4 Ultra for highest quality
  const endpoint = `publishers/google/models/imagen-4.0-ultra-generate-001:predict`;
  const url = `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/${endpoint}`;

  const requestBody = {
    instances: [{ prompt }],
    parameters: {
      sampleCount: 1,
      aspectRatio: '3:4', // Portrait format
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
    const imageBuffer = Buffer.from(prediction.bytesBase64Encoded, 'base64');
    fs.writeFileSync(outputPath, imageBuffer);
    return { success: true, size: imageBuffer.length };
  }

  if (prediction.raiFilteredReason) {
    throw new Error(`Filtered: ${prediction.raiFilteredReason}`);
  }

  throw new Error('No image data in prediction');
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
║        🎨 EXECUTIVE MUSE STRATEGY VARIANTS 🎨                            ║
║                                                                          ║
║     Indian Hourglass Muse • 10 Artistic Strategies • Imagen 4 Ultra      ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
  `);

  // Create output directory
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  log('Authenticating with Vertex AI...');
  let oauthToken;
  try {
    oauthToken = await getOAuthToken();
    log('✅ OAuth token obtained');
  } catch (err) {
    console.error('❌ Failed to get OAuth token:', err.message);
    process.exit(1);
  }

  const args = process.argv.slice(2);
  const startIndex = parseInt(args[0]) || 0;
  const maxCount = parseInt(args[1]) || 10;

  const variantsToGenerate = STRATEGY_VARIANTS.slice(startIndex, startIndex + maxCount);

  const results = [];

  console.log(`\n${'═'.repeat(70)}`);
  log(`🎨 GENERATING ${variantsToGenerate.length} STRATEGY VARIANTS (starting from #${startIndex + 1})`);
  console.log(`${'═'.repeat(70)}`);

  for (let i = 0; i < variantsToGenerate.length; i++) {
    const variant = variantsToGenerate[i];
    const timestamp = Date.now();
    const outputPath = path.join(OUTPUT_DIR, `${variant.id}_${timestamp}.png`);

    console.log(`\n${'─'.repeat(70)}`);
    log(`📸 [${startIndex + i + 1}/10] Strategy: ${variant.name}`);
    log(`   ID: ${variant.id}`);

    try {
      const result = await generateImage(variant.prompt, outputPath, oauthToken);
      log(`   ✅ Saved: ${path.basename(outputPath)} (${(result.size / 1024 / 1024).toFixed(2)} MB)`);
      results.push({
        id: variant.id,
        name: variant.name,
        path: outputPath,
        size: result.size,
        status: 'success'
      });

      // Rate limit delay - 20s between Ultra requests
      if (i < variantsToGenerate.length - 1) {
        log('   ⏳ Waiting 20s for rate limit...');
        await new Promise(r => setTimeout(r, 20000));
      }

    } catch (err) {
      log(`   ❌ Failed: ${err.message}`);
      results.push({
        id: variant.id,
        name: variant.name,
        error: err.message,
        status: 'failed'
      });

      // On rate limit, wait longer
      if (err.message.includes('429')) {
        log('   ⏳ Rate limited, waiting 90s...');
        await new Promise(r => setTimeout(r, 90000));
      } else if (err.message.includes('Filtered')) {
        // Content filtered, wait a bit and continue
        await new Promise(r => setTimeout(r, 5000));
      }
    }
  }

  // Summary
  console.log(`\n${'═'.repeat(70)}`);
  console.log('                    GENERATION COMPLETE');
  console.log(`${'═'.repeat(70)}`);

  const successful = results.filter(r => r.status === 'success');
  const failed = results.filter(r => r.status === 'failed');

  console.log(`\n  ✅ Successful: ${successful.length}`);
  console.log(`  ❌ Failed: ${failed.length}`);

  if (successful.length > 0) {
    console.log('\n  Generated images:');
    successful.forEach(r => {
      console.log(`     📸 ${r.name}: ${path.basename(r.path)} (${(r.size / 1024 / 1024).toFixed(2)} MB)`);
    });
  }

  if (failed.length > 0) {
    console.log('\n  Failed variants:');
    failed.forEach(r => {
      console.log(`     ❌ ${r.name}: ${r.error.slice(0, 60)}...`);
    });
  }

  console.log(`\n  Output directory: ${OUTPUT_DIR}`);

  // Save manifest
  const manifestPath = path.join(OUTPUT_DIR, 'generation-manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    collection: 'Executive Muse Strategy Variants',
    model: 'imagen-4.0-ultra-generate-001',
    results: results
  }, null, 2));
  log(`📋 Manifest: ${manifestPath}`);

  console.log(`${'═'.repeat(70)}\n`);
}

main().catch(err => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});
