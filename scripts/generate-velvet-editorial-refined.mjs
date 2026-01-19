#!/usr/bin/env node
/**
 * VERALABS VELVET EDITORIAL REFINED SERIES
 * Premium Subject × Velvet Environment × Artistic Sophistication
 *
 * Level 7-8 Intimacy • Refined Artistic Approach
 * Fashion Editorial Excellence with Boudoir Sensibility
 *
 * Helmut Newton × Peter Lindbergh × Paolo Roversi Style
 * Imagen 4 Ultra - Gallery Excellence
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const PROXY_URL = 'http://localhost:3001';
const OUTPUT_DIR = '/home/ecolex/version1/generated-velvet-editorial';
const PROJECT_ID = 'zaranovel';
const LOCATION = 'us-central1';

// ═══════════════════════════════════════════════════════════════════════════
// REFINED MODEL SPECIFICATION
// ═══════════════════════════════════════════════════════════════════════════

const EDITORIAL_MUSE = `Captivating Indian fashion model, 5'8" tall,
elegant athletic silhouette with graceful feminine curves,
sun-kissed bronze complexion with warm golden undertones,
striking almond eyes with magnetic intensity, full expressive lips,
long flowing jet-black hair in natural waves cascading elegantly,
age 26, commanding confident presence, haute couture model physique,
skin with natural luminosity and authentic texture`;

// ═══════════════════════════════════════════════════════════════════════════
// QUALITY ARCHITECTURE - Editorial Excellence
// ═══════════════════════════════════════════════════════════════════════════

const QUALITY_PREFIX = `Award-winning fashion editorial photograph for Vogue or Harper's Bazaar.
Shot by a master photographer in the tradition of Helmut Newton and Peter Lindbergh.
Museum-quality fine art portrait with exquisite composition.`;

const QUALITY_SUFFIX = `Shot on Phase One IQ4 150MP with Schneider-Kreuznach 110mm lens.
Masterful chiaroscuro lighting with cinematic depth.
Perfect exposure, professional color grading.
85mm equivalent, f/2.0, full-body composition.
8K resolution, gallery exhibition quality.
Photorealistic with authentic skin texture.`;

// ═══════════════════════════════════════════════════════════════════════════
// VELVET EDITORIAL VARIANTS - Refined Artistic Approach
// ═══════════════════════════════════════════════════════════════════════════

const VELVET_EDITORIAL_VARIANTS = [
  // ─────────────────────────────────────────────────────────────────────────
  // THRONE ROOM SERIES
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'velvet_throne_empress',
    name: 'Velvet Empress',
    category: 'THRONE ROOM',
    intimacyLevel: 7,
    prompt: `${QUALITY_PREFIX}

MODEL: ${EDITORIAL_MUSE}

SETTING: Private red velvet room with floor-to-ceiling crushed velvet walls in deep burgundy,
single gold spotlight creating theatrical focus, ornate gilded throne chair,
art deco gold details, crystal decanters on side table, luxury beyond measure.

WARDROBE: Elegant burgundy velvet evening gown with dramatic plunging neckline,
high slit revealing one leg, gold jewelry accents, bare shoulders,
sophisticated lingerie silhouette visible through strategic design.

POSE: Seated regally on velvet throne with commanding presence,
one leg crossed showing the high slit, spine elegantly straight,
one arm on armrest, other hand near collarbone, imperial expression,
full body visible in regal composition.

LIGHTING: Single gold spotlight from above creating theatrical drama,
velvet absorbing ambient light creating infinite depth,
warm golden tones on skin, dramatic shadows defining form.

MOOD: Underground royalty, velvet empress, sophisticated power.

${QUALITY_SUFFIX}`
  },
  {
    id: 'velvet_throne_recline',
    name: 'Throne Room Recline',
    category: 'THRONE ROOM',
    intimacyLevel: 8,
    prompt: `${QUALITY_PREFIX}

MODEL: ${EDITORIAL_MUSE}

SETTING: Opulent red velvet private room, crushed velvet chaise lounge,
burgundy and gold color palette, warm spotlight, baroque luxury atmosphere.

WARDROBE: Silk slip dress in champagne gold, delicate lace trim,
thin straps on shoulders, fabric draping elegantly over curves,
dress riding up slightly showing thigh, sophisticated intimacy.

POSE: Reclining on velvet chaise in classic odalisque position,
head propped on hand, body creating elegant S-curve,
one knee bent, full silhouette visible, inviting confident gaze.

LIGHTING: Rembrandt lighting with warm golden fill,
chiaroscuro creating sculptural definition,
silk catching light creating liquid highlights.

MOOD: Baroque sensuality, classical beauty reimagined, intimate luxury.

${QUALITY_SUFFIX}`
  },

  // ─────────────────────────────────────────────────────────────────────────
  // WINE CELLAR SERIES
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'velvet_cellar_mystery',
    name: 'Wine Cellar Mystery',
    category: 'WINE CELLAR',
    intimacyLevel: 7,
    prompt: `${QUALITY_PREFIX}

MODEL: ${EDITORIAL_MUSE}

SETTING: Underground wine cellar with aged oak barrels,
candlelit stone arches casting dancing shadows,
centuries of atmosphere, romantic mystery, wine-dark ambiance.

WARDROBE: Deep burgundy silk wrap dress, loosely tied,
revealing elegant décolletage and one shoulder,
fabric cascading to floor, wine glass as prop.

POSE: Leaning against oak barrel with mysterious expression,
wine glass held elegantly, body in graceful lean,
one hand touching barrel surface, full body visible,
candlelight catching eyes and creating intrigue.

LIGHTING: Warm candlelight creating flickering illumination,
deep shadows in stone recesses, wine-dark atmosphere,
romantic chiaroscuro, skin glowing warmly.

MOOD: Cellar mystery, wine-dark seduction, candlelit elegance.

${QUALITY_SUFFIX}`
  },
  {
    id: 'velvet_cellar_vintage',
    name: 'Vintage Wine Portrait',
    category: 'WINE CELLAR',
    intimacyLevel: 8,
    prompt: `${QUALITY_PREFIX}

MODEL: ${EDITORIAL_MUSE}

SETTING: Private wine cellar with stone walls and wooden racks,
single candelabra casting warm pools of light,
aged barrels creating textured backdrop, intimate speakeasy feel.

WARDROBE: Sheer burgundy chiffon blouse with lace camisole beneath,
high-waisted velvet trousers, elegant but revealing,
fabric catching candlelight, sophisticated layering.

POSE: Seated on wine barrel with legs crossed elegantly,
one hand supporting weight behind, other holding wine,
torso twisted showing profile and silhouette,
full body composition with vintage glamour.

LIGHTING: Single candelabra creating warm pools of light,
dramatic shadows on stone, warm highlights on fabric,
vintage Hollywood lighting quality.

MOOD: Vintage glamour, cellar intimacy, sophisticated sensuality.

${QUALITY_SUFFIX}`
  },

  // ─────────────────────────────────────────────────────────────────────────
  // SPEAKEASY SERIES
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'velvet_speakeasy_jazz',
    name: 'Speakeasy Jazz Siren',
    category: 'SPEAKEASY',
    intimacyLevel: 7,
    prompt: `${QUALITY_PREFIX}

MODEL: ${EDITORIAL_MUSE}

SETTING: Hidden speakeasy back room with art deco geometric details,
jazz-era intimacy, velvet banquettes in burgundy, brass fixtures,
prohibition atmosphere with modern luxury, vintage glamour reimagined.

WARDROBE: Vintage-inspired beaded slip dress in black and gold,
1920s silhouette with modern sensuality, thin straps,
dress catching light with every movement, elegant heels.

POSE: Reclining on velvet banquette in classic Hollywood pose,
one arm draped behind head, legs extended elegantly,
dress draping naturally, confident jazz-age expression,
full body visible in glamorous composition.

LIGHTING: Warm amber art deco sconces creating period atmosphere,
golden highlights on beading, vintage glow on skin,
shadows playing across features, old Hollywood quality.

MOOD: Prohibition glamour, jazz age elegance, vintage seduction.

${QUALITY_SUFFIX}`
  },
  {
    id: 'velvet_speakeasy_doorway',
    name: 'Speakeasy Doorway',
    category: 'SPEAKEASY',
    intimacyLevel: 8,
    prompt: `${QUALITY_PREFIX}

MODEL: ${EDITORIAL_MUSE}

SETTING: Art deco speakeasy doorway with geometric frame,
velvet curtain pulled aside, warm light spilling through,
mystery of hidden room beyond, noir atmosphere.

WARDROBE: Silk robe in deep burgundy worn loosely open,
elegant lace slip visible beneath, one shoulder exposed,
fabric catching light, sensual but sophisticated.

POSE: Standing in doorway silhouette, one hand on door frame,
body creating elegant S-curve, looking over shoulder,
fabric draping naturally, full figure backlit beautifully,
mysterious invitation in expression.

LIGHTING: Strong backlight creating silhouette with warm fill,
noir atmosphere with sculptural definition,
rim light defining elegant contours.

MOOD: Noir mystery, doorway invitation, silhouette poetry.

${QUALITY_SUFFIX}`
  },

  // ─────────────────────────────────────────────────────────────────────────
  // OPERA BOX SERIES
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'velvet_opera_box',
    name: 'Private Opera Box',
    category: 'OPERA BOX',
    intimacyLevel: 7,
    prompt: `${QUALITY_PREFIX}

MODEL: ${EDITORIAL_MUSE}

SETTING: Private opera box with red velvet curtains and gold trim,
chandelier light filtering through, empty theatre below in darkness,
exclusive intimacy above the crowd, dramatic theatrical setting.

WARDROBE: Elegant black evening gown with dramatic back reveal,
front modestly covered, back open to waist,
sophisticated opera-worthy attire, diamond earrings.

POSE: Standing at opera box railing looking down at theatre,
body in elegant contrapposto, back visible to camera,
graceful spine curve, one hand on railing,
full figure in theatrical composition.

LIGHTING: Chandelier light from above creating golden glow,
theatre lights creating upward illumination,
dramatic theatrical lighting with warm tones.

MOOD: Theatrical goddess, opera house elegance, elevated intimacy.

${QUALITY_SUFFIX}`
  },
  {
    id: 'velvet_opera_recline',
    name: 'Opera Box Recline',
    category: 'OPERA BOX',
    intimacyLevel: 8,
    prompt: `${QUALITY_PREFIX}

MODEL: ${EDITORIAL_MUSE}

SETTING: Plush opera box with velvet seating in deep red,
private curtained alcove, chandelier visible in distance,
theatre darkness beyond, intimate elevated sanctuary.

WARDROBE: Sheer evening overlay over structured bodice,
sophisticated see-through effect with strategic coverage,
elegant high slit showing one leg, evening glamour.

POSE: Reclining on velvet opera box seat,
legs draped elegantly over armrest,
upper body propped showing décolletage,
theatrical pose with confident expression, full body visible.

LIGHTING: Warm theatrical glow from multiple sources,
fabric catching light creating ethereal effect,
dramatic shadows enhancing curves.

MOOD: Private theatre intimacy, elevated sensuality, operatic drama.

${QUALITY_SUFFIX}`
  },

  // ─────────────────────────────────────────────────────────────────────────
  // BACKSTAGE SERIES
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'velvet_backstage_vanity',
    name: 'Backstage Vanity',
    category: 'BACKSTAGE',
    intimacyLevel: 7,
    prompt: `${QUALITY_PREFIX}

MODEL: ${EDITORIAL_MUSE}

SETTING: Burlesque theatre backstage with vanity mirror ringed by warm bulbs,
vintage glamour atmosphere, velvet costumes hanging nearby,
feather boas draped, performer's private sanctuary.

WARDROBE: Silk robe in blush pink worn loosely,
elegant lingerie silhouette visible beneath,
vintage Hollywood dressing room aesthetic.

POSE: Seated at vanity applying lipstick,
reflection visible in mirror creating duality,
robe fallen from one shoulder naturally,
full body visible in both direct and reflection.

LIGHTING: Warm vanity bulbs creating soft glamour glow,
mirror multiplying illumination,
vintage Hollywood lighting quality.

MOOD: Performer's intimacy, mirror duality, backstage glamour.

${QUALITY_SUFFIX}`
  },
  {
    id: 'velvet_backstage_preparing',
    name: 'Backstage Preparation',
    category: 'BACKSTAGE',
    intimacyLevel: 8,
    prompt: `${QUALITY_PREFIX}

MODEL: ${EDITORIAL_MUSE}

SETTING: Vintage dressing room with ornate mirror,
warm lighting, costume pieces nearby,
intimate preparation space, artistic atmosphere.

WARDROBE: Elegant corset in burgundy velvet with gold details,
matching high-waisted brief, stockings and garter,
vintage burlesque aesthetic with sophistication.

POSE: Standing before mirror adjusting costume,
arms raised fixing hair, body in elegant stretch,
profile visible showing silhouette,
full figure in pre-performance moment.

LIGHTING: Warm practical lighting from vanity,
soft shadows creating depth,
skin glowing with anticipation.

MOOD: Pre-performance anticipation, vintage intimacy, elegant preparation.

${QUALITY_SUFFIX}`
  },

  // ─────────────────────────────────────────────────────────────────────────
  // MAXIMALIST SUITE SERIES
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'velvet_maximalist_bed',
    name: 'Maximalist Boudoir',
    category: 'MAXIMALIST SUITE',
    intimacyLevel: 8,
    prompt: `${QUALITY_PREFIX}

MODEL: ${EDITORIAL_MUSE}

SETTING: Boutique hotel penthouse in maximalist baroque style,
layered velvet textures in burgundy and gold, ornate gilded mirrors,
silk sheets in champagne, excess as aesthetic, opulent warmth.

WARDROBE: Silk chemise in champagne with delicate lace trim,
thin straps, fabric draping elegantly over form,
sophisticated intimate wear, subtle luxury.

POSE: Reclining on silk sheets in elegant pose,
one arm above head, legs artfully arranged,
fabric draping naturally over curves,
full body in luxurious composition, serene expression.

LIGHTING: Multiple warm sources creating baroque opulence,
silk catching light creating liquid effect,
rich shadows and golden highlights.

MOOD: Baroque luxury, silk poetry, opulent sensuality.

${QUALITY_SUFFIX}`
  },
  {
    id: 'velvet_maximalist_window',
    name: 'Maximalist Window Light',
    category: 'MAXIMALIST SUITE',
    intimacyLevel: 7,
    prompt: `${QUALITY_PREFIX}

MODEL: ${EDITORIAL_MUSE}

SETTING: Luxurious penthouse with floor-to-ceiling windows,
burgundy velvet curtains pulled back, city lights visible,
baroque furniture, maximalist luxury aesthetic.

WARDROBE: Sheer silk robe in deep burgundy,
elegant negligee beneath, one shoulder exposed,
city lights creating silhouette, sophisticated intimacy.

POSE: Standing at window looking at city below,
body silhouetted against city lights,
robe flowing naturally, elegant posture,
full figure against urban backdrop.

LIGHTING: City lights creating rim illumination,
warm interior glow from behind,
dramatic silhouette with selective detail.

MOOD: Urban goddess, penthouse intimacy, city night elegance.

${QUALITY_SUFFIX}`
  }
];

// ═══════════════════════════════════════════════════════════════════════════
// GENERATION FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

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
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║   ██╗   ██╗███████╗██╗    ██╗   ██╗███████╗████████╗                         ║
║   ██║   ██║██╔════╝██║    ██║   ██║██╔════╝╚══██╔══╝                         ║
║   ██║   ██║█████╗  ██║    ██║   ██║█████╗     ██║                            ║
║   ╚██╗ ██╔╝██╔══╝  ██║    ╚██╗ ██╔╝██╔══╝     ██║                            ║
║    ╚████╔╝ ███████╗███████╗╚████╔╝ ███████╗   ██║                            ║
║     ╚═══╝  ╚══════╝╚══════╝ ╚═══╝  ╚══════╝   ╚═╝                            ║
║                                                                              ║
║          🎭 VELVET EDITORIAL REFINED SERIES 🎭                               ║
║                                                                              ║
║    Premium Subject × Velvet Environment × Artistic Sophistication           ║
║    Level 7-8 Intimacy • Fashion Editorial Excellence                        ║
║                                                                              ║
║    THRONE | WINE CELLAR | SPEAKEASY | OPERA | BACKSTAGE | SUITE             ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
  `);

  log('Authenticating with Vertex AI...');
  let oauthToken = await getOAuthToken();
  log('✅ OAuth token obtained');

  // Create output directories
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  const categories = ['throne_room', 'wine_cellar', 'speakeasy', 'opera_box', 'backstage', 'maximalist_suite'];
  categories.forEach(cat => {
    fs.mkdirSync(path.join(OUTPUT_DIR, cat), { recursive: true });
  });

  const args = process.argv.slice(2);
  const startIndex = parseInt(args[0]) || 0;
  const maxCount = parseInt(args[1]) || 12;

  const variantsToGenerate = VELVET_EDITORIAL_VARIANTS.slice(startIndex, startIndex + maxCount);

  const results = [];
  let successCount = 0;
  let failCount = 0;

  console.log(`\n${'═'.repeat(78)}`);
  log(`🎭 GENERATING ${variantsToGenerate.length} VELVET EDITORIAL VARIANTS`);
  console.log(`${'═'.repeat(78)}\n`);

  for (let i = 0; i < variantsToGenerate.length; i++) {
    const variant = variantsToGenerate[i];
    const timestamp = Date.now();
    const categoryDir = variant.category.toLowerCase().replace(/ /g, '_');
    const outputPath = path.join(OUTPUT_DIR, categoryDir, `${variant.id}_${timestamp}.png`);

    console.log(`${'─'.repeat(78)}`);
    log(`🎭 [${i + 1}/${variantsToGenerate.length}] ${variant.name}`);
    log(`   Category: ${variant.category} | Intimacy: Level ${variant.intimacyLevel}`);

    try {
      if (i > 0 && i % 4 === 0) {
        log('   🔄 Refreshing OAuth token...');
        oauthToken = await getOAuthToken();
      }

      const result = await generateImage(variant.prompt, outputPath, oauthToken);
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
        error: error.message,
        status: 'failed'
      });
      failCount++;

      if (error.message.includes('429') || error.message.includes('Filtered')) {
        log(`   ⏳ Waiting 90s...`);
        await new Promise(r => setTimeout(r, 90000));
      }
    }

    if (i < variantsToGenerate.length - 1) {
      log(`   ⏳ Waiting 25s for rate limit...`);
      await new Promise(r => setTimeout(r, 25000));
    }
  }

  // Save manifest
  const manifestPath = path.join(OUTPUT_DIR, 'velvet-editorial-manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    series: 'Velvet Editorial Refined Series',
    style: 'Helmut Newton × Peter Lindbergh × Paolo Roversi',
    intimacyRange: '7-8',
    results
  }, null, 2));

  console.log(`\n${'═'.repeat(78)}`);
  console.log(`              VELVET EDITORIAL COMPLETE`);
  console.log(`${'═'.repeat(78)}`);
  console.log(`\n  ✅ Successful: ${successCount}`);
  console.log(`  ❌ Failed: ${failCount}`);

  const byCategory = {};
  results.filter(r => r.status === 'success').forEach(r => {
    if (!byCategory[r.category]) byCategory[r.category] = [];
    byCategory[r.category].push(r);
  });

  Object.entries(byCategory).forEach(([cat, items]) => {
    console.log(`     🎭 ${cat}: ${items.length} images`);
  });

  console.log(`\n  Output: ${OUTPUT_DIR}`);
  console.log(`${'═'.repeat(78)}\n`);
}

main().catch(console.error);
