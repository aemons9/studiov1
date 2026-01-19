#!/usr/bin/env node
/**
 * VERALABS PREMIUM VELVET HYBRID SERIES
 * Premium Couch Subject × Velvet Environment × Artistic Intimacy
 *
 * Level 9-10 Intimacy through Sophisticated Artistic Framing
 * Focus: Skin Luminosity, Figure Sculpture, Form Poetry
 *
 * Strategic Max-Mode Nexus Architecture
 * Helmut Newton × Irving Penn × Edward Weston Style
 * Imagen 4 Ultra - Fine Art Excellence
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const PROXY_URL = 'http://localhost:3001';
const OUTPUT_DIR = '/home/ecolex/version1/generated-premium-velvet-hybrid';
const PROJECT_ID = 'zaranovel';
const LOCATION = 'us-central1';

// ═══════════════════════════════════════════════════════════════════════════
// INDIAN HOURGLASS MUSE - Authentic Skin & Form Focus
// ═══════════════════════════════════════════════════════════════════════════

const INDIAN_MUSE_FORM = `Captivating Indian fine art model, 5'8" tall,
sculptural athletic feminine silhouette with graceful natural curves,
sun-kissed bronze complexion with warm golden luminosity,
skin with authentic texture showing natural pores and subtle imperfections,
body oil creating sculptural highlights that define every contour,
striking almond eyes with magnetic depth, full expressive lips,
long flowing jet-black hair in natural waves,
age 26, classical beauty with modern confidence,
figure that echoes Renaissance sculpture and contemporary fine art`;

// ═══════════════════════════════════════════════════════════════════════════
// QUALITY ARCHITECTURE - Fine Art Masters
// ═══════════════════════════════════════════════════════════════════════════

const QUALITY_PREFIX = `Masterpiece fine art photograph in the tradition of Edward Weston's form studies,
Irving Penn's sculptural portraits, and Helmut Newton's powerful compositions.
Museum-quality intimate portraiture celebrating the human form as living sculpture.
Shot by a master photographer for permanent gallery exhibition.`;

const QUALITY_SUFFIX = `Phase One IQ4 150MP with Schneider-Kreuznach 110mm lens.
Masterful chiaroscuro with cinematic depth and rich tonal range.
Perfect exposure revealing every subtle gradation of skin tone.
85mm equivalent, f/2.0 for sculptural depth of field.
8K resolution, silver gelatin print quality.
Photorealistic with authentic skin luminosity and natural imperfections.
Every pore, every highlight, every shadow rendered with reverence.`;

// ═══════════════════════════════════════════════════════════════════════════
// VELVET INTIMATE ENVIRONMENTS
// ═══════════════════════════════════════════════════════════════════════════

const VELVET_INTIMATE = {
  private_chamber: `Private velvet chamber bathed in warm golden light,
deep burgundy walls creating infinite depth, silk sheets in champagne,
single shaft of light sculpting form from darkness,
intimate sanctuary where art and beauty merge`,

  baroque_alcove: `Hidden baroque alcove with crushed velvet in wine-dark tones,
gilded mirror reflecting candlelight, luxurious excess,
warm amber glow creating skin luminosity,
private world of sensual artistry`,

  artists_studio: `Artist's private studio with velvet draping as backdrop,
warm north light filtering through, classical art references,
the space where masters created their nude studies,
reverent atmosphere for figure work`,

  midnight_boudoir: `Midnight boudoir with layers of silk and velvet,
single warm lamp creating pools of golden light,
shadows as soft as velvet, skin glowing ethereally,
intimate space for private artistic expression`
};

// ═══════════════════════════════════════════════════════════════════════════
// ARTISTIC WARDROBE CONCEPTS - Maximum Expression
// ═══════════════════════════════════════════════════════════════════════════

const ARTISTIC_WARDROBES = {
  silk_cascade: `Flowing silk fabric in champagne gold used as artistic draping,
fabric cascading from shoulder creating sculptural composition,
strategic gathering at essential areas through natural fabric physics,
silk catching light to enhance rather than conceal the form beneath`,

  shadow_veil: `Gossamer fabric in skin-matching tone creating veil effect,
fabric so sheer it becomes suggestion rather than coverage,
light passes through revealing form as shadow and highlight,
artistic transparency that celebrates rather than hides`,

  velvet_whisper: `Minimal velvet pieces in deep burgundy,
fabric touching skin at strategic anchor points only,
negative space as primary design element,
velvet texture contrasting with skin luminosity`,

  golden_light: `Body adorned only with oil creating golden highlights,
light itself becoming the wardrobe,
shadows providing natural modesty at intimate areas,
skin as canvas, light as clothing`,

  lace_architecture: `Architectural French lace creating geometric patterns,
lace as artistic framework rather than coverage,
skin visible through delicate negative spaces,
traditional craft reimagined as contemporary art`
};

// ═══════════════════════════════════════════════════════════════════════════
// PREMIUM VELVET HYBRID VARIANTS - Artistic Intimacy Level 9-10
// ═══════════════════════════════════════════════════════════════════════════

const PREMIUM_HYBRID_VARIANTS = [
  // ─────────────────────────────────────────────────────────────────────────
  // FORM STUDY SERIES - Classical Figure Work
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'hybrid_form_study_recline',
    name: 'Reclining Form Study',
    category: 'FORM STUDY',
    intimacyLevel: 9,
    prompt: `${QUALITY_PREFIX}

MODEL: ${INDIAN_MUSE_FORM}

SETTING: ${VELVET_INTIMATE.artists_studio}

ARTISTIC CONCEPT: Classical reclining figure study in the tradition of Ingres and Manet,
celebrating the natural curves and proportions of the feminine form.
The body as landscape, each curve a hill, each valley a shadow.

COMPOSITION: Model reclines on velvet chaise in classical pose,
body creating elegant S-curve from shoulder through hip to extended leg.
${ARTISTIC_WARDROBES.silk_cascade}
One arm draped above head elongating torso, expression of serene confidence.
Full figure visible in harmonious composition emphasizing natural proportions.

LIGHTING: Warm north light from studio window creating soft modeling,
every curve defined by gentle gradation from highlight to shadow.
Skin luminosity enhanced by subtle oil sheen.
Rembrandt-quality chiaroscuro celebrating form.

ARTISTIC VISION: Museum-quality figure study honoring classical traditions.
The human form as the ultimate subject of fine art photography.
Reverent, tasteful, celebrating natural beauty without exploitation.

${QUALITY_SUFFIX}`
  },
  {
    id: 'hybrid_form_study_standing',
    name: 'Standing Figure Sculpture',
    category: 'FORM STUDY',
    intimacyLevel: 9,
    prompt: `${QUALITY_PREFIX}

MODEL: ${INDIAN_MUSE_FORM}

SETTING: ${VELVET_INTIMATE.private_chamber}

ARTISTIC CONCEPT: Standing figure study echoing classical Greek sculpture,
contrapposto pose creating natural weight distribution and graceful curves.
Living marble, bronze skin catching warm light.

COMPOSITION: Model stands in classical contrapposto against velvet backdrop,
weight on one leg creating natural hip tilt and elegant S-curve of spine.
${ARTISTIC_WARDROBES.golden_light}
Arms positioned to create elegant lines, gaze confident and direct.
Full standing figure showing complete proportions and natural grace.

LIGHTING: Single warm spotlight from above creating sculptural drama,
form emerging from velvet darkness like sculpture from stone.
Skin glowing with golden luminosity, every contour defined.
Dramatic chiaroscuro worthy of Caravaggio.

ARTISTIC VISION: The body as living sculpture, timeless and powerful.
Fine art photography at its most elevated and reverent.

${QUALITY_SUFFIX}`
  },
  {
    id: 'hybrid_form_study_profile',
    name: 'Profile Silhouette Study',
    category: 'FORM STUDY',
    intimacyLevel: 9,
    prompt: `${QUALITY_PREFIX}

MODEL: ${INDIAN_MUSE_FORM}

SETTING: ${VELVET_INTIMATE.baroque_alcove}

ARTISTIC CONCEPT: Profile silhouette study celebrating the outline of feminine form,
every curve from forehead to toes traced by light against velvet darkness.
Edward Weston's shell studies translated to human form.

COMPOSITION: Model in pure profile against deep velvet background,
silhouette revealing complete contour of figure.
${ARTISTIC_WARDROBES.shadow_veil}
Natural arch of back, curve of hip, elegant line from neck to shoulder.
Full profile figure showing the poetry of human outline.

LIGHTING: Strong side light creating perfect silhouette,
rim of golden light tracing every curve against darkness.
Skin tones visible in subtle gradation within the lit areas.
Graphic simplicity with infinite depth.

ARTISTIC VISION: The silhouette as ultimate reduction to essential form.
Every unnecessary element stripped away, leaving only beauty.

${QUALITY_SUFFIX}`
  },

  // ─────────────────────────────────────────────────────────────────────────
  // SKIN LUMINOSITY SERIES - Celebrating Bronze Tones
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'hybrid_skin_golden',
    name: 'Golden Hour Skin Study',
    category: 'SKIN LUMINOSITY',
    intimacyLevel: 9,
    prompt: `${QUALITY_PREFIX}

MODEL: ${INDIAN_MUSE_FORM}

SETTING: ${VELVET_INTIMATE.midnight_boudoir}

ARTISTIC CONCEPT: Intimate study celebrating bronze skin tones under golden light,
each highlight and shadow revealing the living warmth of human skin.
The body as vessel of light, skin as canvas for illumination.

COMPOSITION: Model reclining on silk in intimate pose,
warm lamplight painting golden highlights across bronze skin.
${ARTISTIC_WARDROBES.silk_cascade}
Body arranged to catch maximum light on curves, creating sculptural definition.
Full figure bathed in warm glow, expression of quiet contentment.

LIGHTING: Single warm lamp creating pools of golden light,
skin absorbing and reflecting warmth, oil enhancing luminosity.
Every pore visible, every subtle gradation of skin tone honored.
Intimate lighting that worships the human form.

ARTISTIC VISION: Celebration of diverse beauty and bronze skin tones.
The human body as the most beautiful subject in all of art.

${QUALITY_SUFFIX}`
  },
  {
    id: 'hybrid_skin_candlelight',
    name: 'Candlelight Skin Poetry',
    category: 'SKIN LUMINOSITY',
    intimacyLevel: 10,
    prompt: `${QUALITY_PREFIX}

MODEL: ${INDIAN_MUSE_FORM}

SETTING: ${VELVET_INTIMATE.baroque_alcove}

ARTISTIC CONCEPT: Intimate candlelit study where flame light dances on skin,
warm flickering illumination revealing the living quality of human flesh.
Old Master painting technique translated to photography.

COMPOSITION: Model seated in baroque alcove, multiple candles creating warm glow,
body positioned to catch dancing light on curves and planes.
${ARTISTIC_WARDROBES.velvet_whisper}
Light playing across skin creating movement even in stillness.
Full figure in intimate candlelit composition, expression dreamy and soft.

LIGHTING: Multiple candles creating warm, flickering illumination,
light dancing across skin revealing texture and warmth.
Deep shadows and golden highlights in constant subtle motion.
The most intimate and reverent lighting possible.

ARTISTIC VISION: The sacred intimacy of candlelight on human skin.
Timeless beauty captured in the most ancient of illuminations.

${QUALITY_SUFFIX}`
  },

  // ─────────────────────────────────────────────────────────────────────────
  // VELVET CONTRAST SERIES - Texture Against Skin
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'hybrid_velvet_embrace',
    name: 'Velvet Embrace',
    category: 'VELVET CONTRAST',
    intimacyLevel: 9,
    prompt: `${QUALITY_PREFIX}

MODEL: ${INDIAN_MUSE_FORM}

SETTING: ${VELVET_INTIMATE.private_chamber}

ARTISTIC CONCEPT: The contrast of velvet texture against smooth bronze skin,
two surfaces that both absorb and reflect light differently.
Tactile poetry where fabric and flesh create visual harmony.

COMPOSITION: Model enveloped in burgundy velvet, fabric creating frame,
skin emerging from velvet like pearl from oyster.
${ARTISTIC_WARDROBES.velvet_whisper}
Velvet draped strategically to reveal curves while creating rich backdrop.
Full figure partially wrapped in velvet, the interplay of textures central.

LIGHTING: Warm side light emphasizing texture contrast,
velvet absorbing light into infinite depth while skin glows luminously.
The tactile quality of both surfaces made visible.
Rich, warm, intimate lighting.

ARTISTIC VISION: The sensual contrast of different textures,
velvet's softness against skin's living warmth.

${QUALITY_SUFFIX}`
  },
  {
    id: 'hybrid_velvet_throne',
    name: 'Velvet Throne Intimate',
    category: 'VELVET CONTRAST',
    intimacyLevel: 10,
    prompt: `${QUALITY_PREFIX}

MODEL: ${INDIAN_MUSE_FORM}

SETTING: Private velvet throne room with deep burgundy walls,
ornate gilded throne, single dramatic spotlight,
the intimacy of power and beauty combined.

ARTISTIC CONCEPT: Intimate throne portrait merging power with vulnerability,
the model as empress of her own domain, confident in natural beauty.
Helmut Newton's power dynamics with contemporary artistic sensibility.

COMPOSITION: Model seated on velvet throne in commanding yet intimate pose,
body arranged with regal confidence, curves emphasized by posture.
${ARTISTIC_WARDROBES.lace_architecture}
Expression combining imperial confidence with intimate invitation.
Full figure on throne, architectural lace creating artistic framework.

LIGHTING: Single gold spotlight from above creating theatrical drama,
dramatic shadows defining form against velvet darkness.
Skin glowing under spotlight, lace casting delicate shadows.
Power lighting for intimate subject.

ARTISTIC VISION: The intersection of power and intimacy,
beauty as authority, confidence as ultimate sensuality.

${QUALITY_SUFFIX}`
  },

  // ─────────────────────────────────────────────────────────────────────────
  // INTIMATE ATMOSPHERE SERIES - Mood as Subject
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'hybrid_intimate_morning',
    name: 'Intimate Morning Light',
    category: 'INTIMATE ATMOSPHERE',
    intimacyLevel: 9,
    prompt: `${QUALITY_PREFIX}

MODEL: ${INDIAN_MUSE_FORM}

SETTING: ${VELVET_INTIMATE.midnight_boudoir} at dawn,
first light filtering through sheer curtains,
the intimate transition from night to day.

ARTISTIC CONCEPT: The vulnerable beauty of morning light on skin,
the intimate moment of waking, still soft from sleep.
Private moment made art through masterful observation.

COMPOSITION: Model stretching languidly on silk sheets,
body creating natural curves in moment of waking.
${ARTISTIC_WARDROBES.silk_cascade}
Arms reaching, back arching, the body's natural morning ritual.
Full figure in intimate morning composition, expression soft and unguarded.

LIGHTING: Soft dawn light filtering through, mixing with warm lamp glow,
the gentle transition of illumination on skin.
Soft, flattering, intimate morning light.
The most vulnerable and beautiful light.

ARTISTIC VISION: The sacred intimacy of private morning moments,
vulnerability as ultimate beauty, trust as ultimate intimacy.

${QUALITY_SUFFIX}`
  },
  {
    id: 'hybrid_intimate_mirror',
    name: 'Mirror Reflection Intimate',
    category: 'INTIMATE ATMOSPHERE',
    intimacyLevel: 10,
    prompt: `${QUALITY_PREFIX}

MODEL: ${INDIAN_MUSE_FORM}

SETTING: ${VELVET_INTIMATE.baroque_alcove} with ornate gilded mirror,
reflection creating duality, private self-admiration moment.

ARTISTIC CONCEPT: The intimate act of self-regard in the mirror,
the private moment of appreciating one's own beauty.
Reflection as meditation, mirror as confessor.

COMPOSITION: Model before gilded mirror, body visible in both direct and reflection,
pose of confident self-admiration, hand touching skin gently.
${ARTISTIC_WARDROBES.shadow_veil}
Mirror creating doubled composition, multiple angles visible.
Full figure in mirror duality, expression of self-assured beauty.

LIGHTING: Warm candlelight creating soft glow on both figure and reflection,
gilded frame catching highlights, skin luminous in double exposure.
Intimate lighting doubled and enriched by reflection.
The most private lighting made public.

ARTISTIC VISION: The beauty of self-love and body acceptance,
the mirror as witness to private appreciation of one's own form.

${QUALITY_SUFFIX}`
  },

  // ─────────────────────────────────────────────────────────────────────────
  // ARTISTIC EXPRESSION SERIES - Maximum Creativity
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'hybrid_artistic_odalisque',
    name: 'Modern Odalisque',
    category: 'ARTISTIC EXPRESSION',
    intimacyLevel: 10,
    prompt: `${QUALITY_PREFIX}

MODEL: ${INDIAN_MUSE_FORM}

SETTING: ${VELVET_INTIMATE.private_chamber}

ARTISTIC CONCEPT: Contemporary interpretation of the classical odalisque,
honoring Ingres and Matisse while celebrating contemporary diverse beauty.
The most painted pose in art history, reimagined for today.

COMPOSITION: Classic odalisque recline on velvet chaise,
body creating the timeless S-curve from shoulder to hip.
${ARTISTIC_WARDROBES.golden_light}
Looking over shoulder at viewer with confident gaze.
Full figure in classical pose, every curve celebrated.

LIGHTING: Warm Rembrandt lighting with golden fill,
the lighting of Old Masters applied to contemporary beauty.
Skin glowing with oil-enhanced luminosity.
Museum-quality illumination for museum-quality subject.

ARTISTIC VISION: The odalisque tradition continues with diverse beauty,
classical art elevated by contemporary understanding.

${QUALITY_SUFFIX}`
  },
  {
    id: 'hybrid_artistic_venus',
    name: 'Venus Rising',
    category: 'ARTISTIC EXPRESSION',
    intimacyLevel: 10,
    prompt: `${QUALITY_PREFIX}

MODEL: ${INDIAN_MUSE_FORM}

SETTING: ${VELVET_INTIMATE.artists_studio}

ARTISTIC CONCEPT: Venus rising from velvet sea, classical mythology reimagined,
Botticelli's Venus with bronze skin and contemporary confidence.
Goddess made manifest through artistic photography.

COMPOSITION: Model in standing emergence pose, body rising from velvet draping,
arms creating elegant lines, hair flowing naturally.
${ARTISTIC_WARDROBES.silk_cascade}
Expression of divine confidence, body displayed as gift to art.
Full standing figure emerging from fabric like Venus from sea foam.

LIGHTING: Soft ethereal light from all directions creating divine glow,
skin luminous with otherworldly quality.
The lighting reserved for depicting goddesses.
Transcendent illumination for transcendent subject.

ARTISTIC VISION: The goddess archetype celebrated in contemporary form,
divine feminine beauty honored through artistic mastery.

${QUALITY_SUFFIX}`
  },
  {
    id: 'hybrid_artistic_serpentine',
    name: 'Serpentine Form',
    category: 'ARTISTIC EXPRESSION',
    intimacyLevel: 10,
    prompt: `${QUALITY_PREFIX}

MODEL: ${INDIAN_MUSE_FORM}

SETTING: ${VELVET_INTIMATE.baroque_alcove}

ARTISTIC CONCEPT: The body as serpentine sculpture, continuous flowing line,
Art Nouveau curves translated to human form.
Mucha's sinuous lines made flesh and photographed.

COMPOSITION: Model in continuous serpentine pose on velvet,
body creating unbroken flowing line from head to toe.
${ARTISTIC_WARDROBES.shadow_veil}
Every curve flowing into the next, the body as single elegant gesture.
Full figure in sinuous composition, expression dreamy and artistic.

LIGHTING: Soft side light emphasizing the continuous flow of form,
shadows and highlights creating sense of movement in stillness.
The body as river of light flowing through velvet darkness.
Artistic lighting for artistic concept.

ARTISTIC VISION: The body as pure artistic line and form,
human sculpture in its most elegant expression.

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
║   ██████╗ ██████╗ ███████╗███╗   ███╗██╗██╗   ██╗███╗   ███╗                 ║
║   ██╔══██╗██╔══██╗██╔════╝████╗ ████║██║██║   ██║████╗ ████║                 ║
║   ██████╔╝██████╔╝█████╗  ██╔████╔██║██║██║   ██║██╔████╔██║                 ║
║   ██╔═══╝ ██╔══██╗██╔══╝  ██║╚██╔╝██║██║██║   ██║██║╚██╔╝██║                 ║
║   ██║     ██║  ██║███████╗██║ ╚═╝ ██║██║╚██████╔╝██║ ╚═╝ ██║                 ║
║   ╚═╝     ╚═╝  ╚═╝╚══════╝╚═╝     ╚═╝╚═╝ ╚═════╝ ╚═╝     ╚═╝                 ║
║                                                                              ║
║          🔥 PREMIUM VELVET HYBRID SERIES 🔥                                  ║
║                                                                              ║
║    Premium Couch × Velvet Environment × Artistic Max-Mode                   ║
║    Level 9-10 Intimacy • Skin Luminosity • Figure & Form                    ║
║                                                                              ║
║    FORM STUDY | SKIN LUMINOSITY | VELVET CONTRAST                           ║
║    INTIMATE ATMOSPHERE | ARTISTIC EXPRESSION                                 ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
  `);

  log('Authenticating with Vertex AI...');
  let oauthToken = await getOAuthToken();
  log('✅ OAuth token obtained');

  // Create output directories
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  const categories = ['form_study', 'skin_luminosity', 'velvet_contrast', 'intimate_atmosphere', 'artistic_expression'];
  categories.forEach(cat => {
    fs.mkdirSync(path.join(OUTPUT_DIR, cat), { recursive: true });
  });

  const args = process.argv.slice(2);
  const categoryFilter = args[0];
  const startIndex = parseInt(args[1]) || 0;
  const maxCount = parseInt(args[2]) || 12;

  let variantsToGenerate = PREMIUM_HYBRID_VARIANTS;

  if (categoryFilter) {
    variantsToGenerate = PREMIUM_HYBRID_VARIANTS.filter(v =>
      v.category.toLowerCase().includes(categoryFilter.toLowerCase()) ||
      v.id.toLowerCase().includes(categoryFilter.toLowerCase())
    );
  }

  variantsToGenerate = variantsToGenerate.slice(startIndex, startIndex + maxCount);

  const results = [];
  let successCount = 0;
  let failCount = 0;

  console.log(`\n${'═'.repeat(78)}`);
  log(`🔥 GENERATING ${variantsToGenerate.length} PREMIUM VELVET HYBRID VARIANTS`);
  if (categoryFilter) log(`   Category filter: ${categoryFilter}`);
  console.log(`${'═'.repeat(78)}\n`);

  for (let i = 0; i < variantsToGenerate.length; i++) {
    const variant = variantsToGenerate[i];
    const timestamp = Date.now();
    const categoryDir = variant.category.toLowerCase().replace(/ /g, '_');
    const outputPath = path.join(OUTPUT_DIR, categoryDir, `${variant.id}_${timestamp}.png`);

    console.log(`${'─'.repeat(78)}`);
    log(`🔥 [${i + 1}/${variantsToGenerate.length}] ${variant.name}`);
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
  const manifestPath = path.join(OUTPUT_DIR, 'premium-velvet-hybrid-manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    series: 'Premium Velvet Hybrid Series',
    concept: 'Premium Couch × Velvet × Artistic Max-Mode',
    model: 'Indian Hourglass Muse',
    style: 'Edward Weston × Irving Penn × Helmut Newton',
    intimacyRange: '9-10',
    approach: 'Sophisticated artistic framing, form and skin focus',
    results
  }, null, 2));

  console.log(`\n${'═'.repeat(78)}`);
  console.log(`              PREMIUM VELVET HYBRID COMPLETE`);
  console.log(`${'═'.repeat(78)}`);
  console.log(`\n  ✅ Successful: ${successCount}`);
  console.log(`  ❌ Failed: ${failCount}`);

  const byCategory = {};
  results.filter(r => r.status === 'success').forEach(r => {
    if (!byCategory[r.category]) byCategory[r.category] = [];
    byCategory[r.category].push(r);
  });

  Object.entries(byCategory).forEach(([cat, items]) => {
    console.log(`     🔥 ${cat}: ${items.length} images`);
    items.forEach(item => {
      const sizeMB = (item.size / 1024 / 1024).toFixed(2);
      console.log(`        📸 ${item.name} (${sizeMB} MB)`);
    });
  });

  console.log(`\n  Output: ${OUTPUT_DIR}`);
  console.log(`${'═'.repeat(78)}\n`);
}

main().catch(console.error);
