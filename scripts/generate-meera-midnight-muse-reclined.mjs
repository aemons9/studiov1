#!/usr/bin/env node

/**
 * MEERA - MIDNIGHT MUSE RECLINED COLLECTION
 * ImagineArt 1.0 • Full Body Reclined • Inner Thigh Focus
 *
 * Erotic Muse Masterclass • Candlelit Midnight Environments
 * Bed & Couch Reclined Poses • Legendary Cinematographic Ambience
 * STRICTLY LOCKED INDIAN MUSE: Meera (38D-27-40)
 */

import Replicate from "replicate";
import fs from "node:fs";
import path from "node:path";

// Configuration
const OUTPUT_DIR = '/home/ecolex/version1/generated-meera-midnight-muse-reclined';
const MODEL = "imagineart/imagineart-1.0:b7178694f11dc428590f98d295a6e370bc3dc843819043d0f3621d66be13e440";

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Initialize Replicate client
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

// LOCKED INDIAN MEERA - FULL DEFINITION
const LOCKED_INDIAN_MEERA = `SUBJECT (LOCKED - DO NOT ALTER): Indian woman named Meera, South Asian Indian ethnicity, 27 years old, 5'9" height.

INDIAN FACIAL FEATURES: High cheekbones typical of Indian women, refined Indian nose, deep brown almond-shaped Indian eyes with thick black lashes, full sensual lips with natural rose tone, warm confident Indian expression, sultry provocative gaze.

INDIAN HOURGLASS BODY: Curvaceous Indian hourglass body type - 38D full natural bust with teardrop shape, 27-inch dramatically cinched waist creating extreme curves, 40-inch wide rounded hips with full glutes, smooth toned inner thighs with natural feminine softness.

INDIAN SKIN DETAIL: Golden-brown caramel Indian skin complexion with natural luminous glow, warm undertones typical of South Asian women, HYPER-REALISTIC skin texture with visible pores, natural skin variations, subtle veins visible under skin, micro-texture detail on inner thighs. NOT pale/white skin - authentic golden-brown Indian complexion catching candlelight.

INDIAN HAIR: Long flowing jet black Indian hair past shoulders with natural shine and soft waves, hair cascading across pillows and surfaces.

ARTISTIC PIERCINGS & JEWELRY: Elegant platinum navel ring piercing with diamond accent catching candlelight on flat midriff. Delicate gold anklet on left ankle glinting in low light. Small diamond nose stud on left nostril. Gold toe rings on second toes.

Authentic Indian beauty with South Asian features, NO Western features.`;

// Inner Thigh Reclined Focus
const INNER_THIGH_RECLINED_FOCUS = {
  fullSpread: `FULL BODY RECLINED - INNER THIGH PROMINENCE: Legs naturally parted revealing complete inner thigh landscape. V-shaped intimate space between thighs catching candlelight. Golden-brown Indian skin from hips to knees fully visible. Soft shadows defining inner thigh curves. Natural feminine gap between toned thighs. Upper inner thigh detail near hip junction prominently displayed.`,

  kneesBent: `KNEES BENT RECLINED - THIGH FOCUS: Both knees bent and fallen apart naturally, inner thighs fully exposed. Feet flat on surface, creating triangular negative space. Complete view from hips through inner thigh curves to knees. Golden-brown skin catching warm light along inner leg surfaces.`,

  oneLegRaised: `ONE LEG RAISED - INNER THIGH DETAIL: One leg extended, other raised with knee bent showing full inner thigh of raised leg. Inner thigh catching candlelight from multiple angles. Golden-brown skin texture visible with natural pores. Hip-to-knee inner curve prominently displayed.`,

  sideRecline: `SIDE RECLINE - THIGH SILHOUETTE: Lying on side, top leg draped forward revealing inner thigh from behind. S-curve silhouette with inner thigh prominence. Golden-brown skin contrasting with dark bedding. Full body curves visible with thigh focus.`,

  legsCrossed: `CROSSED LEG RECLINE - THIGH INTERSECTION: One leg crossed over other at thigh, creating intimate framing of inner thigh curves. Point of crossing emphasizing soft inner thigh flesh. Golden-brown skin at thigh intersection catching light.`,

  butterflySplay: `BUTTERFLY SPLAY - FULL INNER THIGH: Legs in butterfly position, soles together, knees fallen outward. Maximum inner thigh exposure from hips to knees on both legs. Diamond-shaped negative space between legs. Golden-brown Indian skin fully illuminated.`
};

// Midnight Candlelit Environments
const MIDNIGHT_ENVIRONMENTS = {
  candlelitBed: `ENVIRONMENT: Luxurious king-size bed with black silk sheets and burgundy velvet pillows. Dozens of flickering candles surrounding bed on floor and nightstands. Warm amber candlelight dancing across golden-brown skin. Dark midnight atmosphere with pools of golden light. Scattered rose petals. Private penthouse bedroom at midnight.`,

  velvetCouch: `ENVIRONMENT: Antique velvet chaise lounge in deep burgundy, positioned before roaring fireplace. Candlelit sconces on walls casting dancing shadows. Persian rug beneath. Dark wood paneling. Midnight hour intimacy. Warm firelight mixing with candleglow on skin.`,

  floorCushions: `ENVIRONMENT: Scattered silk cushions and throws on floor creating intimate nest. Ring of pillar candles creating circle of warm light. Sheer curtains diffusing moonlight. Incense smoke wisps visible. Bohemian midnight sanctuary. Moroccan-inspired artifacts.`,

  bathroomVanity: `ENVIRONMENT: Marble vanity with ornate mirror reflecting candlelight infinitely. Clawfoot tub edge visible. Crystal chandelier with dimmed bulbs. Dozens of candles on every surface. Steam and mist creating soft atmosphere. Midnight bathing ritual setting.`,

  windowDaybed: `ENVIRONMENT: Plush daybed beneath large window showing city lights at midnight. Sheer curtains partially drawn. Candles clustered on window ledge and floor. Moonlight mixing with candlelight. Urban penthouse midnight escape. Silk throws and pillows.`,

  libraryChaise: `ENVIRONMENT: Leather chaise in private library. Floor-to-ceiling books as backdrop. Reading lamp and candles providing warm pools of light. Midnight reading sanctuary. Rich wood and leather textures. Antique artifacts and globes.`,

  gardenPavillion: `ENVIRONMENT: Outdoor garden pavilion draped in sheer fabrics. Hundreds of fairy lights and candles. Midnight summer air. Plush daybed with silk coverings. Stars visible through fabric. Private midnight garden. Jasmine and roses scenting air.`,

  studioLoft: `ENVIRONMENT: Artist's loft studio at midnight. Large windows showing moonlit sky. Candles grouped on work tables and floor. Unfinished paintings visible. Bohemian creative space. Draped fabrics and artistic chaos. Warm intimate lighting.`
};

// Cinematographic Lighting Styles
const CINEMATIC_LIGHTING = {
  rembrandt: `LIGHTING: Rembrandt lighting with single soft key creating triangular highlight on cheek and body. Deep shadows on opposite side. Candle flames as practical lights. Chiaroscuro mastery. Museum-quality dramatic illumination.`,

  goldenHour: `LIGHTING: Warm golden candlelight simulating perpetual golden hour. Amber tones wrapping around curves. Soft fill from multiple flame sources. Romantic warmth suffusing golden-brown Indian skin.`,

  moonAndCandle: `LIGHTING: Cool moonlight from window mixing with warm candlelight. Color temperature contrast creating visual interest. Blue rim light, amber key light. Cinematic color grading in-camera.`,

  fireSideGlow: `LIGHTING: Flickering firelight creating animated shadows. Warm orange-red undertones. Dancing light patterns on skin. Primal intimate atmosphere. Constant subtle movement in lighting.`,

  lowKeyDrama: `LIGHTING: Extreme low-key lighting with candles as sole source. Deep pools of shadow, selective illumination of curves. Noir-inspired mystery. Inner thigh catching single shaft of light.`,

  softDiffused: `LIGHTING: Multiple candles creating omnidirectional soft light. Minimal shadows, glowing skin quality. Beauty lighting effect from flame sources. Even illumination revealing skin texture detail.`,

  backRim: `LIGHTING: Candles positioned behind creating rim light outline. Body silhouette with glowing edge. Face and inner thighs catching frontal fill. Ethereal goddess lighting.`,

  spotlightPool: `LIGHTING: Single cluster of candles creating spotlight effect. Body emerging from darkness into pool of warm light. Theatrical dramatic emphasis. Inner thigh as focal point in light.`
};

// Provocative Philosophy Moods
const PROVOCATIVE_MOODS = {
  vulnerableStrength: `MOOD: Paradox of vulnerable exposure and inner strength. Eyes meeting camera with confident surrender. Body language simultaneously inviting and powerful. Erotic philosophy of strength through vulnerability.`,

  midnightReverie: `MOOD: Lost in midnight thoughts, dreamy distant gaze. Body relaxed in complete surrender to the hour. Sensual meditation. Mind wandering while body displayed. Philosophical reverie made flesh.`,

  provocativeChallenge: `MOOD: Direct challenging gaze, slight smirk. Body positioned as deliberate provocation. Daring the viewer to look. Erotic philosophy of the provocative muse. Power in displayed sexuality.`,

  intimateSurrender: `MOOD: Complete intimate surrender, eyes closed or half-lidded. Body given over to sensation and moment. Trust and vulnerability manifest. Erotic surrender as philosophical statement.`,

  playfulTease: `MOOD: Playful knowing expression, teasing positioning. Joy in erotic display. Fingers playing with jewelry or hair. Lighthearted seduction. Philosophy of pleasure and play.`,

  passionateIntensity: `MOOD: Intense passionate expression, parted lips, flushed appearance. Body arched in ecstasy suggestion. Peak moment captured. Erotic intensity as life force.`,

  sereneGoddess: `MOOD: Serene goddess energy, peaceful powerful expression. Body displayed as temple of pleasure. Divine feminine manifest. Erotic philosophy of sacred sexuality.`,

  darkDesire: `MOOD: Smoldering dark desire in eyes, mysterious expression. Body as object of obsession. Dangerous seductive energy. Philosophy of dark eros.`
};

// 20 Midnight Muse Reclined Variants
const MIDNIGHT_VARIANTS = [
  // BED SERIES
  {
    name: 'Candlelit Surrender',
    thighFocus: INNER_THIGH_RECLINED_FOCUS.fullSpread,
    environment: MIDNIGHT_ENVIRONMENTS.candlelitBed,
    lighting: CINEMATIC_LIGHTING.rembrandt,
    mood: PROVOCATIVE_MOODS.intimateSurrender,
    description: 'Full spread surrender on candlelit bed'
  },
  {
    name: 'Midnight Butterfly',
    thighFocus: INNER_THIGH_RECLINED_FOCUS.butterflySplay,
    environment: MIDNIGHT_ENVIRONMENTS.candlelitBed,
    lighting: CINEMATIC_LIGHTING.goldenHour,
    mood: PROVOCATIVE_MOODS.vulnerableStrength,
    description: 'Butterfly position revealing maximum inner thigh'
  },
  {
    name: 'Silk Sheets Reverie',
    thighFocus: INNER_THIGH_RECLINED_FOCUS.kneesBent,
    environment: MIDNIGHT_ENVIRONMENTS.candlelitBed,
    lighting: CINEMATIC_LIGHTING.softDiffused,
    mood: PROVOCATIVE_MOODS.midnightReverie,
    description: 'Knees bent apart on silk sheets, dreamy mood'
  },
  {
    name: 'One Leg Raised Glory',
    thighFocus: INNER_THIGH_RECLINED_FOCUS.oneLegRaised,
    environment: MIDNIGHT_ENVIRONMENTS.candlelitBed,
    lighting: CINEMATIC_LIGHTING.spotlightPool,
    mood: PROVOCATIVE_MOODS.provocativeChallenge,
    description: 'Raised leg revealing full inner thigh detail'
  },

  // COUCH/CHAISE SERIES
  {
    name: 'Velvet Recline',
    thighFocus: INNER_THIGH_RECLINED_FOCUS.fullSpread,
    environment: MIDNIGHT_ENVIRONMENTS.velvetCouch,
    lighting: CINEMATIC_LIGHTING.fireSideGlow,
    mood: PROVOCATIVE_MOODS.sereneGoddess,
    description: 'Full body reclined on velvet chaise by firelight'
  },
  {
    name: 'Fireside Passion',
    thighFocus: INNER_THIGH_RECLINED_FOCUS.kneesBent,
    environment: MIDNIGHT_ENVIRONMENTS.velvetCouch,
    lighting: CINEMATIC_LIGHTING.fireSideGlow,
    mood: PROVOCATIVE_MOODS.passionateIntensity,
    description: 'Passionate intensity on velvet by fire'
  },
  {
    name: 'Chaise Butterfly',
    thighFocus: INNER_THIGH_RECLINED_FOCUS.butterflySplay,
    environment: MIDNIGHT_ENVIRONMENTS.velvetCouch,
    lighting: CINEMATIC_LIGHTING.lowKeyDrama,
    mood: PROVOCATIVE_MOODS.darkDesire,
    description: 'Dramatic butterfly on antique chaise'
  },
  {
    name: 'Library Muse',
    thighFocus: INNER_THIGH_RECLINED_FOCUS.sideRecline,
    environment: MIDNIGHT_ENVIRONMENTS.libraryChaise,
    lighting: CINEMATIC_LIGHTING.rembrandt,
    mood: PROVOCATIVE_MOODS.midnightReverie,
    description: 'Side recline in private library, intellectual seduction'
  },

  // FLOOR/CUSHION SERIES
  {
    name: 'Cushion Nest',
    thighFocus: INNER_THIGH_RECLINED_FOCUS.fullSpread,
    environment: MIDNIGHT_ENVIRONMENTS.floorCushions,
    lighting: CINEMATIC_LIGHTING.goldenHour,
    mood: PROVOCATIVE_MOODS.playfulTease,
    description: 'Playful recline among silk cushions'
  },
  {
    name: 'Bohemian Surrender',
    thighFocus: INNER_THIGH_RECLINED_FOCUS.butterflySplay,
    environment: MIDNIGHT_ENVIRONMENTS.floorCushions,
    lighting: CINEMATIC_LIGHTING.softDiffused,
    mood: PROVOCATIVE_MOODS.intimateSurrender,
    description: 'Complete surrender on bohemian floor nest'
  },
  {
    name: 'Incense Dreams',
    thighFocus: INNER_THIGH_RECLINED_FOCUS.kneesBent,
    environment: MIDNIGHT_ENVIRONMENTS.floorCushions,
    lighting: CINEMATIC_LIGHTING.moonAndCandle,
    mood: PROVOCATIVE_MOODS.midnightReverie,
    description: 'Dreamy recline with incense smoke atmosphere'
  },

  // WINDOW/DAYBED SERIES
  {
    name: 'City Lights Muse',
    thighFocus: INNER_THIGH_RECLINED_FOCUS.oneLegRaised,
    environment: MIDNIGHT_ENVIRONMENTS.windowDaybed,
    lighting: CINEMATIC_LIGHTING.moonAndCandle,
    mood: PROVOCATIVE_MOODS.provocativeChallenge,
    description: 'Provocative pose against city night skyline'
  },
  {
    name: 'Moonlit Curves',
    thighFocus: INNER_THIGH_RECLINED_FOCUS.fullSpread,
    environment: MIDNIGHT_ENVIRONMENTS.windowDaybed,
    lighting: CINEMATIC_LIGHTING.backRim,
    mood: PROVOCATIVE_MOODS.sereneGoddess,
    description: 'Backlit by moon, inner thighs in warm foreground light'
  },
  {
    name: 'Penthouse Passion',
    thighFocus: INNER_THIGH_RECLINED_FOCUS.legsCrossed,
    environment: MIDNIGHT_ENVIRONMENTS.windowDaybed,
    lighting: CINEMATIC_LIGHTING.lowKeyDrama,
    mood: PROVOCATIVE_MOODS.darkDesire,
    description: 'Dark desire in penthouse, crossed thighs'
  },

  // SPECIAL ENVIRONMENTS
  {
    name: 'Vanity Reflection',
    thighFocus: INNER_THIGH_RECLINED_FOCUS.sideRecline,
    environment: MIDNIGHT_ENVIRONMENTS.bathroomVanity,
    lighting: CINEMATIC_LIGHTING.softDiffused,
    mood: PROVOCATIVE_MOODS.vulnerableStrength,
    description: 'Mirror reflection doubling inner thigh display'
  },
  {
    name: 'Garden Midnight',
    thighFocus: INNER_THIGH_RECLINED_FOCUS.fullSpread,
    environment: MIDNIGHT_ENVIRONMENTS.gardenPavillion,
    lighting: CINEMATIC_LIGHTING.goldenHour,
    mood: PROVOCATIVE_MOODS.sereneGoddess,
    description: 'Outdoor pavilion under stars, goddess energy'
  },
  {
    name: 'Artist Studio Muse',
    thighFocus: INNER_THIGH_RECLINED_FOCUS.butterflySplay,
    environment: MIDNIGHT_ENVIRONMENTS.studioLoft,
    lighting: CINEMATIC_LIGHTING.rembrandt,
    mood: PROVOCATIVE_MOODS.provocativeChallenge,
    description: 'Model as muse in artist midnight studio'
  },

  // ULTIMATE SERIES
  {
    name: 'Ultimate Recline',
    thighFocus: INNER_THIGH_RECLINED_FOCUS.fullSpread,
    environment: MIDNIGHT_ENVIRONMENTS.candlelitBed,
    lighting: CINEMATIC_LIGHTING.rembrandt,
    mood: PROVOCATIVE_MOODS.passionateIntensity,
    description: 'Peak inner thigh display, passionate midnight'
  },
  {
    name: 'Erotic Philosophy',
    thighFocus: INNER_THIGH_RECLINED_FOCUS.butterflySplay,
    environment: MIDNIGHT_ENVIRONMENTS.velvetCouch,
    lighting: CINEMATIC_LIGHTING.fireSideGlow,
    mood: PROVOCATIVE_MOODS.vulnerableStrength,
    description: 'Philosophical erotic masterpiece'
  },
  {
    name: 'Midnight Masterpiece',
    thighFocus: INNER_THIGH_RECLINED_FOCUS.fullSpread,
    environment: MIDNIGHT_ENVIRONMENTS.floorCushions,
    lighting: CINEMATIC_LIGHTING.goldenHour,
    mood: PROVOCATIVE_MOODS.intimateSurrender,
    description: 'Ultimate midnight muse inner thigh masterpiece'
  }
];

// Muse Reinforcement
const MUSE_REINFORCEMENT = `CRITICAL ETHNICITY & SKIN LOCK: Subject MUST be Indian woman Meera with South Asian Indian features, golden-brown caramel Indian skin (NOT pale/white), hyper-realistic skin texture with visible pores and natural variations, black hair, brown eyes, Indian hourglass figure 38D-27-40, platinum navel piercing catching candlelight, gold anklet glinting. Inner thighs prominently displayed with realistic skin detail. DO NOT change ethnicity, skin color, or body type. Authentic Indian beauty in midnight candlelit setting.`;

// Build prompt
function buildMidnightPrompt(variant) {
  return `EROTIC MUSE MASTERCLASS - Midnight Candlelit Inner Thigh Reclined Photography.
Legendary cinematographic fine art nude. Professional Patreon adult artistic collection.

${LOCKED_INDIAN_MEERA}

RECLINED POSE & INNER THIGH FOCUS:
${variant.thighFocus}

${variant.environment}

${variant.lighting}

${variant.mood}

CAMERA SPECIFICATIONS:
- Full body framing showing complete reclined figure
- Shot with cinema-grade lens for legendary quality
- 8K ultra-high resolution capturing skin pores and texture
- Shallow depth of field with inner thighs in sharp focus
- Professional intimate photography, museum-quality composition

SKIN RENDERING REQUIREMENTS:
- Hyper-realistic golden-brown Indian skin catching candlelight
- Visible natural pores, subtle skin texture variations
- Micro-detail on inner thigh surfaces
- Natural skin luminosity in warm light
- Realistic skin imperfections and variations
- Warm caramel undertones glowing in flame light
- NO airbrushing - authentic detailed skin

ARTISTIC PIERCINGS IN LIGHT:
- Platinum navel ring catching and reflecting candlelight
- Diamond accent creating small sparkle points
- Gold anklet glinting with flame reflections
- All jewelry interacting naturally with lighting

ARTISTIC MOOD: ${variant.description}

${MUSE_REINFORCEMENT}`;
}

// Download and save image
async function downloadImage(url, filename) {
  const response = await fetch(url);
  const buffer = Buffer.from(await response.arrayBuffer());
  const filepath = path.join(OUTPUT_DIR, filename);
  fs.writeFileSync(filepath, buffer);
  const stats = fs.statSync(filepath);
  return (stats.size / 1024 / 1024).toFixed(2);
}

// Generate single image
async function generateImage(variant, index, total) {
  console.log(`══════════════════════════════════════════════════════════════════════════════`);
  console.log(`[${new Date().toLocaleTimeString()}] 🌙 [${index + 1}/${total}] ${variant.name}`);
  console.log(`[${new Date().toLocaleTimeString()}]    Mood: ${variant.description}`);
  console.log(`[${new Date().toLocaleTimeString()}]    Type: Midnight Muse Reclined`);
  console.log(`[${new Date().toLocaleTimeString()}]    Muse: LOCKED Indian Meera (38D-27-40)`);

  const prompt = buildMidnightPrompt(variant);

  try {
    console.log(`[${new Date().toLocaleTimeString()}]    🔄 Generating with ImagineArt 1.0...`);

    const input = {
      prompt: prompt,
      aspect_ratio: "3:4"
    };

    const output = await replicate.run(MODEL, { input });

    let imageUrl;
    if (typeof output === 'string') {
      imageUrl = output;
    } else if (output && typeof output.url === 'function') {
      imageUrl = output.url();
    } else if (output && output.url) {
      imageUrl = output.url;
    } else if (Array.isArray(output) && output.length > 0) {
      imageUrl = typeof output[0] === 'string' ? output[0] : output[0].url?.() || output[0].url;
    }

    if (imageUrl) {
      const filename = `meera_midnight_${variant.name.toLowerCase().replace(/\s+/g, '_')}_${Date.now()}.png`;
      const size = await downloadImage(imageUrl, filename);

      console.log(`[${new Date().toLocaleTimeString()}]    ✅ SUCCESS: ${filename} (${size} MB)`);

      return {
        variant: variant.name,
        description: variant.description,
        filename,
        size,
        success: true
      };
    } else {
      console.log(`[${new Date().toLocaleTimeString()}]    ❌ No output URL`);
      return { variant: variant.name, success: false, error: 'No output' };
    }
  } catch (error) {
    console.log(`[${new Date().toLocaleTimeString()}]    ❌ Error: ${error.message}`);
    return { variant: variant.name, success: false, error: error.message };
  }
}

// Main
async function main() {
  console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║   🌙 MEERA - MIDNIGHT MUSE RECLINED COLLECTION 🌙                           ║
║                                                                              ║
║   Erotic Muse Masterclass • Legendary Cinematographic Quality              ║
║   STRICTLY LOCKED: Indian Woman Meera • 38D-27-40 Hourglass                ║
║                                                                              ║
║   20 Inner Thigh Focused Reclined Variants                                  ║
║   Environments: Candlelit Bed • Velvet Couch • Floor Cushions              ║
║   Lighting: Rembrandt • Firelight • Moonlit • Low-Key Drama                ║
║   Focus: Full Body Reclined • Maximum Inner Thigh Display                  ║
║   Skin: Hyper-Realistic Pores • Golden-Brown Indian Detail                 ║
║   Patreon Adult Art Collection • Provocative Philosophy                    ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
  `);

  if (!process.env.REPLICATE_API_TOKEN) {
    console.error('❌ REPLICATE_API_TOKEN not set!');
    process.exit(1);
  }

  console.log(`[${new Date().toLocaleTimeString()}] ✅ Replicate API configured`);
  console.log(`[${new Date().toLocaleTimeString()}] 🔒 MUSE LOCKED: Indian Meera (38D-27-40)`);
  console.log(`[${new Date().toLocaleTimeString()}] 🌙 Theme: Midnight Candlelit Environments`);
  console.log(`[${new Date().toLocaleTimeString()}] 🎯 Model: ImagineArt 1.0`);
  console.log();

  const results = [];
  let successCount = 0;

  for (let i = 0; i < MIDNIGHT_VARIANTS.length; i++) {
    const result = await generateImage(MIDNIGHT_VARIANTS[i], i, MIDNIGHT_VARIANTS.length);
    results.push(result);
    if (result.success) successCount++;

    if (i < MIDNIGHT_VARIANTS.length - 1) {
      console.log(`[${new Date().toLocaleTimeString()}]    ⏳ Next in 10s...`);
      await new Promise(resolve => setTimeout(resolve, 10000));
    }
  }

  console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║          🌙 MEERA MIDNIGHT MUSE RECLINED COMPLETE 🌙                        ║
╚══════════════════════════════════════════════════════════════════════════════╝

  ✅ Success: ${successCount}/${MIDNIGHT_VARIANTS.length}
  📊 Rate: ${((successCount / MIDNIGHT_VARIANTS.length) * 100).toFixed(1)}%
  📁 Output: ${OUTPUT_DIR}
`);

  results.filter(r => r.success).forEach(r => {
    console.log(`     🌙 ${r.variant} (${r.size} MB)`);
  });

  if (results.some(r => !r.success)) {
    console.log(`\n  FAILED:`);
    results.filter(r => !r.success).forEach(r => {
      console.log(`     ❌ ${r.variant} - ${r.error}`);
    });
  }

  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'manifest.json'),
    JSON.stringify({
      collection: 'Meera - Midnight Muse Reclined',
      model: 'imagineart/imagineart-1.0',
      theme: 'Midnight Candlelit Inner Thigh Reclined',
      focus: 'Full Body Reclined with Inner Thigh Prominence',
      lockedMuse: 'Indian Meera (38D-27-40) with Piercings',
      environments: ['Candlelit Bed', 'Velvet Couch', 'Floor Cushions', 'Window Daybed', 'Library', 'Garden Pavilion', 'Studio Loft'],
      generated: new Date().toISOString(),
      variants: results,
      stats: { total: MIDNIGHT_VARIANTS.length, successful: successCount }
    }, null, 2)
  );
  console.log(`[${new Date().toLocaleTimeString()}] 📋 Manifest saved`);
}

main().catch(console.error);
