#!/usr/bin/env node
/**
 * VERALABS NEXUS MASTERCLASS SERIES
 * Ultra-Creative Generation with Max-Mode Skills
 *
 * 5 NEXUS Series:
 * - OBSIDIAN TEMPLE: Ancient Indian architecture + contemporary portraiture
 * - MONSOON NOIR: Rain-soaked urban intimacy
 * - CRYSTALLINE DREAMS: Luxury hotel, mirrors, crystal reflections
 * - VELVET UNDERGROUND: Deep burgundy, black, underground club royalty
 * - ETHEREAL BLOOM: Botanical gardens, nature as sanctuary
 *
 * Architect: Claude Opus 4.5 (Nexus Architect v4.0 Max-Mode)
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const PROXY_URL = 'http://localhost:3001';
const OUTPUT_DIR = '/home/ecolex/version1/generated-nexus-masterclass';
const PROJECT_ID = 'zaranovel';
const LOCATION = 'us-central1';

// ═══════════════════════════════════════════════════════════════════════════
// NEXUS MODEL SPECIFICATION - Indian Hourglass Muse (Enhanced)
// ═══════════════════════════════════════════════════════════════════════════

const NEXUS_MUSE = `Stunning Indian muse, 5'8" tall,
fit athletic voluptuous hourglass figure with dramatic statuesque curves,
bust 37DD", cinched waist 27", wide rounded hips 40",
toned sculpted thighs and shapely rounded glutes,
golden brown skin with warm undertones and subtle oil sheen for light capture,
waist-length jet-black silk hair with subtle burgundy highlights in natural waves,
deep brown magnetic eyes with golden flecks and dramatic natural lashes,
refined classical Indian beauty with subtle gold nose ring,
full sensual lips and dramatic cheekbones,
small lotus shoulder tattoo, delicate gold belly chain,
age 25, commanding confident presence, professional fashion model physique`;

// ═══════════════════════════════════════════════════════════════════════════
// QUALITY ARCHITECTURE
// ═══════════════════════════════════════════════════════════════════════════

const QUALITY_PREFIX = `As a world-renowned fine art photographer with museum exhibitions globally,
creating the definitive work in contemporary intimate portraiture.
Shot with Phase One IQ4 150MP, Schneider 110mm f/2.8, ISO 100, f/4.
Tethered to Capture One with color-managed workflow.`;

const QUALITY_SUFFIX = `Museum quality, award-winning photography, gallery exhibition print.
Hasselblad Masters finalist, 8K resolution, skin texture preserved.
Natural retouching with authentic human detail.
Photorealistic rendering with authentic skin texture and fabric physics.
Professional color grading with cinematic depth.`;

// ═══════════════════════════════════════════════════════════════════════════
// SERIES 1: OBSIDIAN TEMPLE - Ancient Sacred Architecture
// ═══════════════════════════════════════════════════════════════════════════

const OBSIDIAN_TEMPLE_VARIANTS = [
  {
    id: 'obsidian_haveli_courtyard',
    name: 'Haveli Courtyard Reverie',
    series: 'OBSIDIAN TEMPLE',
    intimacyLevel: 8,
    location: 'Abandoned Haveli courtyard at dusk, crumbling ornate plaster walls with exposed ancient brick, single shaft of golden light through broken roof creating divine spotlight, dust particles dancing in the beam, weathered carved stone pillars',
    wardrobe: 'Antique gold tissue silk drape worn as sculptural element, traditional fabric cascading from shoulder to floor revealing one side completely, hammered brass jewelry adorning neck and waist, bare feet with gold anklets',
    pose: 'Standing in the light beam like a deity manifest, body creating classical tribhanga curve, one hand touching carved pillar, head tilted back catching the golden light, curves dramatically silhouetted',
    lighting: 'Single shaft of warm golden light from above creating divine chiaroscuro, deep obsidian shadows, sacred geometry of light and dark',
    mood: 'Sacred feminine power, goddess incarnate, timeless beauty in ancient setting'
  },
  {
    id: 'obsidian_stepwell_chamber',
    name: 'Stepwell Sanctuary',
    series: 'OBSIDIAN TEMPLE',
    intimacyLevel: 9,
    location: 'Hidden underground stepwell chamber, geometric water reflections on carved stone ceiling, ancient pillars descending into darkness, subterranean intimacy with mystical atmosphere',
    wardrobe: 'Sheer chanderi silk with intricate gold zari border, fabric wet and clinging from stepwell water, traditional draping revealing sculptural form beneath translucent layers, oxidized silver body chains',
    pose: 'Emerging from water at stepwell edge, body half-submerged, fabric floating on surface, dramatic arch of back as she rises, water droplets on bronze skin catching light',
    lighting: 'Reflected light from water creating dancing patterns on stone and skin, underwater luminescence, deep shadows in recesses',
    mood: 'Emergence and rebirth, water goddess rising, ancient ritual beauty'
  },
  {
    id: 'obsidian_temple_sanctum',
    name: 'Temple Sanctum After Dark',
    series: 'OBSIDIAN TEMPLE',
    intimacyLevel: 9,
    location: 'Inner temple sanctum illuminated only by oil lamps, carved deity figures in deep shadows, sacred geometry on walls, incense smoke creating ethereal atmosphere',
    wardrobe: 'Minimal hammered brass and copper body jewelry only, strategic placement creating geometric patterns across skin, temple dancer aesthetic with maximum artistic expression',
    pose: 'Classical temple dancer pose, body echoing the carved stone figures behind her, arms in mudra positions, spine arched dramatically, one leg bent showing sculpted thigh',
    lighting: 'Flickering oil lamp light creating movement and mystery, warm terracotta glow on skin, carved shadows from temple architecture',
    mood: 'Sacred sensuality, body as temple architecture, devotional beauty'
  },
  {
    id: 'obsidian_palace_jharokha',
    name: 'Palace Jharokha Frame',
    series: 'OBSIDIAN TEMPLE',
    intimacyLevel: 8,
    location: 'Ornate stone jharokha window of weathered palace, intricate carved frame creating natural portrait border, dust particles in light beams, distant courtyard visible through lattice',
    wardrobe: 'Sheer chanderi with heavy gold border, fabric draped minimally to reveal maximum hourglass silhouette, antique gold maang tikka and nose chain, traditional yet bold',
    pose: 'Body filling the ornate window opening, one arm raised touching carved arch, leaning forward with curves prominently framed, direct confident gaze through the frame',
    lighting: 'Afternoon light streaming through jharokha creating golden spotlight, silhouette against bright exterior, warm highlights on curves',
    mood: 'Royal intimacy, private moment captured, heritage beauty reimagined'
  }
];

// ═══════════════════════════════════════════════════════════════════════════
// SERIES 2: MONSOON NOIR - Rain-Soaked Urban Intimacy
// ═══════════════════════════════════════════════════════════════════════════

const MONSOON_NOIR_VARIANTS = [
  {
    id: 'monsoon_flooded_terrace',
    name: 'Rooftop Rain Reverie',
    series: 'MONSOON NOIR',
    intimacyLevel: 7,
    location: 'Rain-flooded penthouse terrace at night, ankle-deep water reflecting city lights like scattered diamonds, streaming sheer curtains billowing in storm wind, lightning illuminating skyline',
    wardrobe: 'Rain-soaked white cotton shirt becoming completely transparent, clinging to every curve, high-waisted black mesh bottom barely visible through water, barefoot in the urban lake',
    pose: 'Standing in the flooded terrace with head thrown back, arms spread catching rain, water streaming down body, fabric completely molded to hourglass form, ecstatic surrender',
    lighting: 'Lightning flash freezing the moment, neon city lights reflecting in water surface, rain creating silver streaks in exposure',
    mood: 'Urban goddess, storm surrender, liberation in rain'
  },
  {
    id: 'monsoon_neon_alley',
    name: 'Neon Rain Noir',
    series: 'MONSOON NOIR',
    intimacyLevel: 8,
    location: 'Rain-slicked urban alleyway with neon signs in Hindi and English, puddles reflecting colored lights, steam rising from grates, cinematic noir atmosphere',
    wardrobe: 'Wet-look metallic mini dress in silver, water beading on PVC-like surface, sheer rain coat worn open revealing everything beneath, high heels creating ripples in puddles',
    pose: 'Looking at her reflection in rain puddle creating duality composition, one knee bent, leaning against graffitied wall, mysterious film noir expression',
    lighting: 'Neon signs casting colored glow through rain, pink and blue reflections on wet skin, noir shadows under umbrella rim',
    mood: 'Urban mystery, rain-washed seduction, night city dreams'
  },
  {
    id: 'monsoon_water_tank',
    name: 'Industrial Rain Cathedral',
    series: 'MONSOON NOIR',
    intimacyLevel: 8,
    location: 'Rooftop water tank platform during monsoon downpour, industrial concrete creating brutalist frame, rain falling like waterfall from tank overflow, urban skyline in storm haze',
    wardrobe: 'Wet black silk slip clinging like second skin, fabric sculpted by water to every curve, minimal coverage as rain washes fabric aside, raw elemental beauty',
    pose: 'Under the waterfall of rain from tank overflow, body arched back receiving the water, arms reaching up, fabric streaming, primal water ritual',
    lighting: 'Overcast monsoon light creating even dramatic tones, water creating silver curtains, industrial contrast with organic form',
    mood: 'Primal cleansing, industrial goddess, rain ritual power'
  },
  {
    id: 'monsoon_parking_flood',
    name: 'Flooded Parking Noir',
    series: 'MONSOON NOIR',
    intimacyLevel: 7,
    location: 'Flooded basement parking garage, car headlights piercing through water creating underwater glow, reflections on ceiling, cinematic apocalyptic atmosphere',
    wardrobe: 'Sheer transparent rain coat over minimal black lace, water streaming down plastic fabric, everything visible beneath, urban survival aesthetic',
    pose: 'Wading through flooded parking, one hand on car hood for support, water at mid-thigh, looking over shoulder at camera, determined sensual expression',
    lighting: 'Car headlights creating dramatic backlighting through flood water, ceiling reflections creating supernatural glow, noir shadows',
    mood: 'Urban survivor beauty, post-storm sensuality, cinematic drama'
  }
];

// ═══════════════════════════════════════════════════════════════════════════
// SERIES 3: CRYSTALLINE DREAMS - Luxury Mirror & Crystal
// ═══════════════════════════════════════════════════════════════════════════

const CRYSTALLINE_DREAMS_VARIANTS = [
  {
    id: 'crystal_mirror_infinity',
    name: 'Infinite Reflection Suite',
    series: 'CRYSTALLINE DREAMS',
    intimacyLevel: 8,
    location: 'Luxury hotel mirror suite with wall-to-wall mirrors creating infinite reflections, multiple versions of subject extending into infinity, silvered surfaces catching light',
    wardrobe: 'Crystal and Swarovski chain harness creating geometric pattern across body, silver chains catching light in every reflection, minimal strategic coverage, body as crystal sculpture',
    pose: 'Positioned for maximum mirror multiplication, body at angle showing infinite copies receding, one pose captured from every angle simultaneously, arms creating elegant lines multiplied infinitely',
    lighting: 'Soft diffused hotel lighting creating luminous glow, every reflection catching different angle of light, crystalline sparkle throughout',
    mood: 'Infinite beauty, multiplied sensuality, luxury narcissism'
  },
  {
    id: 'crystal_chandelier_room',
    name: 'Chandelier Rainbow',
    series: 'CRYSTALLINE DREAMS',
    intimacyLevel: 8,
    location: 'Grand ballroom with massive crystal chandelier casting thousands of rainbow prisms across white walls and floor, light fractured into spectrum dancing on surfaces',
    wardrobe: 'Sheer white silk organza robe with marabou feather trim, worn open revealing pearl string composition beneath, pearls catching rainbow light, ultimate luxury boudoir',
    pose: 'Standing directly beneath chandelier with arms raised as if conducting the light, rainbow prisms painting across bronze skin, robe falling open showing pearl-adorned figure',
    lighting: 'Crystal chandelier creating rainbow spectrum painting entire scene, prisms creating living artwork on skin, divine illumination',
    mood: 'Light goddess, rainbow embodiment, crystalline transcendence'
  },
  {
    id: 'crystal_white_bathroom',
    name: 'White Marble Sanctuary',
    series: 'CRYSTALLINE DREAMS',
    intimacyLevel: 9,
    location: 'All-white luxury bathroom sanctuary, Carrara marble surfaces, chrome fixtures catching light, floating in pure white space, steam creating ethereal atmosphere',
    wardrobe: 'Mirror sequin minimal piece reflecting the white environment, body becoming part of the white space, strategic coverage creating mystery within luminosity',
    pose: 'Reclining on marble surface, body blending with white environment, curves creating the only shadows in pure space, one leg raised elegantly',
    lighting: 'Diffused white light from all directions creating shadowless luminosity, form defined by subtle tonal variation, ethereal floating quality',
    mood: 'Pure light embodiment, white on white poetry, transcendent beauty'
  },
  {
    id: 'crystal_glass_elevator',
    name: 'Ascending Through Light',
    series: 'CRYSTALLINE DREAMS',
    intimacyLevel: 7,
    location: 'Glass elevator cabin ascending through luxury atrium, city lights visible through transparent walls, multiple reflections in glass panels, nighttime ascent',
    wardrobe: 'Champagne silk slip with crystal detailing, fabric catching city lights through glass, elegant evening wear with strategic transparency',
    pose: 'Pressed against glass wall looking at city below, body reflected multiple times in glass panels, confident ascent expression, curves silhouetted against cityscape',
    lighting: 'City lights streaming past through glass, internal elevator glow on skin, multiple reflections creating depth',
    mood: 'Urban ascent, rising power, city goddess surveying domain'
  }
];

// ═══════════════════════════════════════════════════════════════════════════
// SERIES 4: VELVET UNDERGROUND - Deep Burgundy Luxury
// ═══════════════════════════════════════════════════════════════════════════

const VELVET_UNDERGROUND_VARIANTS = [
  {
    id: 'velvet_private_room',
    name: 'Velvet Throne Room',
    series: 'VELVET UNDERGROUND',
    intimacyLevel: 9,
    location: 'Private red velvet room with floor-to-ceiling crushed velvet walls in deep burgundy, single gold spotlight creating theatrical focus, art deco details in gold',
    wardrobe: 'Velvet corset in matching burgundy with gold hardware and garter attachments, Victorian dominance aesthetic, vintage luxury lingerie with modern boldness',
    pose: 'Seated on velvet throne chair like royalty, commanding presence, one leg crossed showing garter, head held high with imperious expression, curves emphasized by corset architecture',
    lighting: 'Single gold spotlight from above creating theatrical drama, velvet absorbing light creating infinite depth, gold hardware catching highlights',
    mood: 'Underground royalty, velvet empress, commanding sensuality'
  },
  {
    id: 'velvet_wine_cellar',
    name: 'Cellar Vintage',
    series: 'VELVET UNDERGROUND',
    intimacyLevel: 8,
    location: 'Underground wine cellar with aged oak barrels, candlelit stone arches, centuries of wine stains on ancient stone, intimate speakeasy atmosphere',
    wardrobe: 'Red Chantilly lace full bodysuit with strategic openings, wine-dark color matching cellar aesthetic, satin ribbons at key points, glass of red wine as prop',
    pose: 'Leaning against oak barrel, wine glass in hand, mysterious expression in candlelight, body creating elegant S-curve, one hand tracing barrel curve echoing her own',
    lighting: 'Candlelight creating warm flickering illumination, deep shadows in cellar recesses, wine-dark atmosphere, romantic chiaroscuro',
    mood: 'Aged elegance, wine-dark mystery, cellar seduction'
  },
  {
    id: 'velvet_speakeasy',
    name: 'Speakeasy Siren',
    series: 'VELVET UNDERGROUND',
    intimacyLevel: 8,
    location: 'Hidden speakeasy back room with art deco details, jazz-era intimacy, velvet banquettes, brass fixtures, prohibition atmosphere with modern luxury',
    wardrobe: 'Burgundy silk wrap dress worn loosely, Old Hollywood glamour, fabric cascading to reveal long legs and dramatic decolletage, vintage diamond jewelry',
    pose: 'Reclining on velvet banquette in classic Hollywood pose, one arm draped overhead, dress fallen open showing leg from hip to heel, seductive jazz-era expression',
    lighting: 'Warm amber art deco sconces creating period atmosphere, shadows playing across features, golden age glamour lighting',
    mood: 'Prohibition glamour, hidden luxury, vintage seduction reimagined'
  },
  {
    id: 'velvet_maximalist',
    name: 'Maximalist Desire',
    series: 'VELVET UNDERGROUND',
    intimacyLevel: 9,
    location: 'Boutique hotel penthouse suite in maximalist baroque style, layered velvet textures in burgundy and gold, ornate mirrors, excess as aesthetic',
    wardrobe: 'Velvet choker and matching minimal pieces only, gold chains connecting elements, baroque body jewelry creating ornate pattern, luxurious minimalism within maximalist space',
    pose: 'Sprawled across silk sheets in decadent abandon, surrounded by velvet pillows, body creating baroque curves, arms above head, expression of luxurious surrender',
    lighting: 'Multiple warm sources creating rich golden glow, velvet textures catching light at different angles, opulent warmth',
    mood: 'Decadent excess, baroque sensuality, maximalist intimacy'
  }
];

// ═══════════════════════════════════════════════════════════════════════════
// SERIES 5: ETHEREAL BLOOM - Botanical Nature Sanctuary
// ═══════════════════════════════════════════════════════════════════════════

const ETHEREAL_BLOOM_VARIANTS = [
  {
    id: 'bloom_greenhouse',
    name: 'Private Greenhouse',
    series: 'ETHEREAL BLOOM',
    intimacyLevel: 8,
    location: 'Private tropical greenhouse with humid glass walls, lush green foliage creating natural frames, condensation on glass creating soft focus background, morning light diffusing through',
    wardrobe: 'Sheer botanical print organza with leaf patterns, fabric matching and blending with surrounding foliage, camouflage with nature aesthetic, minimal coverage beneath transparency',
    pose: 'Standing among tropical plants, body partially hidden by large leaves, natural framing creating artistic composition, serene expression of unity with nature',
    lighting: 'Diffused morning light through greenhouse glass, humid atmosphere creating glow, green-filtered natural illumination',
    mood: 'Nature integration, greenhouse goddess, organic beauty'
  },
  {
    id: 'bloom_garden_dawn',
    name: 'Garden Pavilion Dawn',
    series: 'ETHEREAL BLOOM',
    intimacyLevel: 9,
    location: 'Garden pavilion at dawn with morning mist, dew on flower petals catching golden light, classical garden architecture with climbing roses, magical hour atmosphere',
    wardrobe: 'Fresh flower crown as only adornment, body decorated with morning dew and flower petals, Eve in garden mythology, honey and gold shimmer on skin',
    pose: 'Emerging from flower bed, body rising among blooms, natural framing by flowers at key areas, arms reaching toward morning sun, expression of natural worship',
    lighting: 'Golden hour dawn light filtering through mist, dew drops creating countless tiny highlights, ethereal natural glow',
    mood: 'Garden Eve, natural awakening, primal floral beauty'
  },
  {
    id: 'bloom_lotus_pond',
    name: 'Lotus Pond Meditation',
    series: 'ETHEREAL BLOOM',
    intimacyLevel: 8,
    location: 'Edge of serene lotus pond with pink and white water lilies, reflection creating perfect mirror image, ancient stone steps descending to water, zen garden atmosphere',
    wardrobe: 'Wet silk in lotus pink clinging to form, fabric matching flower colors, water lily petals arranged artistically on skin, natural modesty through artistic placement',
    pose: 'Reclining at water edge with reflection creating duality, one hand touching lotus flower, legs partially in water, serene meditative expression',
    lighting: 'Soft overcast light creating perfect reflections, water surface like mirror, peaceful natural illumination',
    mood: 'Lotus serenity, water meditation, reflected beauty'
  },
  {
    id: 'bloom_overgrown_ruin',
    name: 'Overgrown Garden Ruin',
    series: 'ETHEREAL BLOOM',
    intimacyLevel: 9,
    location: 'Overgrown garden ruin where nature reclaims architecture, vines climbing crumbling columns, wildflowers pushing through stone floors, romantic decay',
    wardrobe: 'Woven natural elements as artistic coverage, vines and leaves creating temporary garments, body as part of the reclamation, wild beauty aesthetic',
    pose: 'Vine embrace with nature wrapping around body, leaning against crumbling column, wild hair matching wild setting, primal goddess of the overgrown temple',
    lighting: 'Dappled sunlight through overgrown canopy, golden light spotting through leaves, romantic natural chiaroscuro',
    mood: 'Nature reclaiming, wild goddess, organic sensuality'
  }
];

// ═══════════════════════════════════════════════════════════════════════════
// COMBINE ALL SERIES
// ═══════════════════════════════════════════════════════════════════════════

const ALL_NEXUS_VARIANTS = [
  ...OBSIDIAN_TEMPLE_VARIANTS,
  ...MONSOON_NOIR_VARIANTS,
  ...CRYSTALLINE_DREAMS_VARIANTS,
  ...VELVET_UNDERGROUND_VARIANTS,
  ...ETHEREAL_BLOOM_VARIANTS
];

// ═══════════════════════════════════════════════════════════════════════════
// PROMPT BUILDER
// ═══════════════════════════════════════════════════════════════════════════

function buildNexusPrompt(variant) {
  return `${QUALITY_PREFIX}

MODEL: ${NEXUS_MUSE}

SERIES: ${variant.series} - ${variant.name}
Intimacy Level: ${variant.intimacyLevel}/10

LOCATION: ${variant.location}

WARDROBE: ${variant.wardrobe}

POSE: ${variant.pose}

LIGHTING: ${variant.lighting}

MOOD & NARRATIVE: ${variant.mood}

STYLE DIRECTION:
Fine art boudoir photography at museum-quality excellence.
Echoing the masters: Helmut Newton's power, Peter Lindbergh's raw beauty, Paolo Roversi's ethereal quality.
Every frame worthy of gallery exhibition.
Celebrating the feminine form with artistic reverence.

TECHNICAL: 85mm lens, f/2.0, full-body composition with environmental context.
${variant.intimacyLevel >= 9 ? 'Maximum artistic expression through strategic minimal coverage.' : 'Sophisticated intimate portraiture with tasteful revelation.'}

${QUALITY_SUFFIX}`;
}

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

// ═══════════════════════════════════════════════════════════════════════════
// MAIN EXECUTION
// ═══════════════════════════════════════════════════════════════════════════

async function main() {
  console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║    ███╗   ██╗███████╗██╗  ██╗██╗   ██╗███████╗    ███╗   ███╗ █████╗ ██╗  ██╗║
║    ████╗  ██║██╔════╝╚██╗██╔╝██║   ██║██╔════╝    ████╗ ████║██╔══██╗╚██╗██╔╝║
║    ██╔██╗ ██║█████╗   ╚███╔╝ ██║   ██║███████╗    ██╔████╔██║███████║ ╚███╔╝ ║
║    ██║╚██╗██║██╔══╝   ██╔██╗ ██║   ██║╚════██║    ██║╚██╔╝██║██╔══██║ ██╔██╗ ║
║    ██║ ╚████║███████╗██╔╝ ██╗╚██████╔╝███████║    ██║ ╚═╝ ██║██║  ██║██╔╝ ██╗║
║    ╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝    ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝║
║                                                                              ║
║                    🏛️  NEXUS MASTERCLASS SERIES  🏛️                          ║
║                                                                              ║
║    5 SERIES • 20 VARIANTS • INDIAN HOURGLASS MUSE • IMAGEN 4 ULTRA          ║
║                                                                              ║
║    OBSIDIAN TEMPLE | MONSOON NOIR | CRYSTALLINE DREAMS                      ║
║    VELVET UNDERGROUND | ETHEREAL BLOOM                                       ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
  `);

  log('Authenticating with Vertex AI...');
  let oauthToken = await getOAuthToken();
  log('✅ OAuth token obtained');

  // Create output directories
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  const seriesDirs = ['obsidian_temple', 'monsoon_noir', 'crystalline_dreams', 'velvet_underground', 'ethereal_bloom'];
  seriesDirs.forEach(dir => fs.mkdirSync(path.join(OUTPUT_DIR, dir), { recursive: true }));

  // Parse arguments
  const args = process.argv.slice(2);
  const seriesFilter = args[0]; // e.g., "obsidian" or "monsoon"
  const startIndex = parseInt(args[1]) || 0;
  const maxCount = parseInt(args[2]) || 20;

  let variantsToGenerate = ALL_NEXUS_VARIANTS;

  if (seriesFilter) {
    variantsToGenerate = ALL_NEXUS_VARIANTS.filter(v =>
      v.series.toLowerCase().includes(seriesFilter.toLowerCase()) ||
      v.id.toLowerCase().includes(seriesFilter.toLowerCase())
    );
  }

  variantsToGenerate = variantsToGenerate.slice(startIndex, startIndex + maxCount);

  const results = [];
  let successCount = 0;
  let failCount = 0;

  console.log(`\n${'═'.repeat(78)}`);
  log(`🏛️ GENERATING ${variantsToGenerate.length} NEXUS MASTERCLASS VARIANTS`);
  if (seriesFilter) log(`   Series filter: ${seriesFilter}`);
  console.log(`${'═'.repeat(78)}\n`);

  for (let i = 0; i < variantsToGenerate.length; i++) {
    const variant = variantsToGenerate[i];
    const timestamp = Date.now();
    const seriesDir = variant.series.toLowerCase().replace(/ /g, '_');
    const outputPath = path.join(OUTPUT_DIR, seriesDir, `${variant.id}_${timestamp}.png`);

    console.log(`${'─'.repeat(78)}`);
    log(`🎨 [${i + 1}/${variantsToGenerate.length}] ${variant.name}`);
    log(`   Series: ${variant.series} | Intimacy: Level ${variant.intimacyLevel}`);

    const prompt = buildNexusPrompt(variant);

    try {
      // Refresh token every 4 images
      if (i > 0 && i % 4 === 0) {
        log('   🔄 Refreshing OAuth token...');
        oauthToken = await getOAuthToken();
      }

      const result = await generateImage(prompt, outputPath, oauthToken);
      const sizeMB = (result.size / 1024 / 1024).toFixed(2);
      log(`   ✅ Saved: ${path.basename(outputPath)} (${sizeMB} MB)`);

      results.push({
        id: variant.id,
        name: variant.name,
        series: variant.series,
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
        series: variant.series,
        intimacyLevel: variant.intimacyLevel,
        error: error.message,
        status: 'failed'
      });
      failCount++;

      if (error.message.includes('429') || error.message.includes('Filtered')) {
        log(`   ⏳ Waiting 90s...`);
        await new Promise(r => setTimeout(r, 90000));
      }
    }

    // Rate limit delay
    if (i < variantsToGenerate.length - 1) {
      log(`   ⏳ Waiting 25s for rate limit...`);
      await new Promise(r => setTimeout(r, 25000));
    }
  }

  // Save manifest
  const manifestPath = path.join(OUTPUT_DIR, 'nexus-masterclass-manifest.json');
  const manifest = {
    timestamp: new Date().toISOString(),
    collection: 'NEXUS Masterclass Series',
    architect: 'Claude Opus 4.5 (Nexus Architect v4.0 Max-Mode)',
    model: 'Indian Hourglass Muse (Enhanced)',
    series: ['OBSIDIAN TEMPLE', 'MONSOON NOIR', 'CRYSTALLINE DREAMS', 'VELVET UNDERGROUND', 'ETHEREAL BLOOM'],
    totalVariants: ALL_NEXUS_VARIANTS.length,
    results
  };
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

  // Summary
  console.log(`\n${'═'.repeat(78)}`);
  console.log(`              NEXUS MASTERCLASS GENERATION COMPLETE`);
  console.log(`${'═'.repeat(78)}`);
  console.log(`\n  ✅ Successful: ${successCount}`);
  console.log(`  ❌ Failed: ${failCount}`);
  console.log(`\n  Generated by series:`);

  const bySeries = {};
  results.filter(r => r.status === 'success').forEach(r => {
    if (!bySeries[r.series]) bySeries[r.series] = [];
    bySeries[r.series].push(r);
  });

  Object.entries(bySeries).forEach(([series, items]) => {
    console.log(`     🏛️ ${series}: ${items.length} images`);
    items.forEach(item => {
      const sizeMB = (item.size / 1024 / 1024).toFixed(2);
      console.log(`        📸 ${item.name} (${sizeMB} MB)`);
    });
  });

  console.log(`\n  Output directory: ${OUTPUT_DIR}`);
  log(`📋 Manifest: ${manifestPath}`);
  console.log(`${'═'.repeat(78)}\n`);
}

main().catch(console.error);
