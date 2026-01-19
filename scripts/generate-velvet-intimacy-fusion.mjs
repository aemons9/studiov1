#!/usr/bin/env node
/**
 * VERALABS VELVET INTIMACY FUSION SERIES
 * Premium Couch Subject × Velvet Underground Environment
 *
 * Level 9-10 Intimacy • Strategic Artistic Focus
 * Decolletage | Lower Back | Glutes | Full Body
 *
 * Helmut Newton × Annie Leibovitz × Mario Testino Style
 * Imagen 4 Ultra - Museum Excellence
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const PROXY_URL = 'http://localhost:3001';
const OUTPUT_DIR = '/home/ecolex/version1/generated-velvet-intimacy';
const PROJECT_ID = 'zaranovel';
const LOCATION = 'us-central1';

// ═══════════════════════════════════════════════════════════════════════════
// INDIAN HOURGLASS MUSE - Premium Couch Subject (Enhanced)
// ═══════════════════════════════════════════════════════════════════════════

const INDIAN_HOURGLASS_MUSE = `Stunning Indian muse, 5'8" tall,
fit athletic voluptuous hourglass figure with dramatic statuesque curves,
bust 37DD", cinched waist 27", wide rounded hips 40",
toned sculpted thighs and shapely rounded glutes,
sun-kissed bronze skin with luminous golden undertones glowing ethereally,
striking magnetic gaze with full sensual lips and dramatic cheekbones,
long flowing jet-black hair with natural tousled waves cascading over shoulders,
age 26, commanding confident presence, professional fashion model physique,
authentic skin texture with natural pores and subtle imperfections,
body oil sheen catching every light for sculptural definition`;

// ═══════════════════════════════════════════════════════════════════════════
// VELVET UNDERGROUND ENVIRONMENTS
// ═══════════════════════════════════════════════════════════════════════════

const VELVET_ENVIRONMENTS = {
  throne_room: `Private red velvet room with floor-to-ceiling crushed velvet walls in deep burgundy,
single gold spotlight creating theatrical focus, art deco details in gold,
rich mahogany furniture, crystal decanters, luxury beyond measure`,

  wine_cellar: `Underground wine cellar with aged oak barrels stacked to ceiling,
candlelit stone arches casting dancing shadows, centuries of wine stains on ancient stone,
intimate speakeasy atmosphere, wine-dark ambiance, romantic mystery`,

  speakeasy: `Hidden speakeasy back room with art deco geometric details,
jazz-era intimacy with velvet banquettes in burgundy, brass fixtures gleaming,
prohibition atmosphere with modern luxury, vintage glamour reimagined`,

  maximalist_suite: `Boutique hotel penthouse in maximalist baroque style,
layered velvet textures in burgundy and gold, ornate gilded mirrors,
excess as aesthetic, silk sheets in champagne and burgundy, opulent warmth`,

  opera_box: `Private opera box with red velvet curtains and gold trim,
chandelier light filtering through, empty theatre below in darkness,
exclusive intimacy above the crowd, dramatic theatrical setting`,

  burlesque_backstage: `Burlesque theatre backstage with vanity mirrors ringed by warm bulbs,
velvet costumes hanging, feather boas draped, vintage glamour atmosphere,
intimate dressing room energy, performer's private sanctuary`
};

// ═══════════════════════════════════════════════════════════════════════════
// QUALITY ARCHITECTURE - Helmut Newton × Annie Leibovitz × Mario Testino
// ═══════════════════════════════════════════════════════════════════════════

const QUALITY_PREFIX = `Exquisite fine art exploration echoing Helmut Newton and Annie Leibovitz's visionary styles.
Shot in the style of renowned fashion photographers like Mario Testino or Peter Lindbergh.
Award-winning museum-quality masterpiece photograph.
As a world-renowned fine art photographer with gallery exhibitions globally.`;

const QUALITY_SUFFIX = `Dramatic chiaroscuro sculpting ethereal forms.
Elevated to gallery excellence with supreme artistic finesse.
Shot on Phase One IQ4 150MP with Schneider-Kreuznach optics.
Masterful composition, perfect exposure, professional color grading with cinematic depth.
Photorealistic rendering with authentic skin texture and luminous quality.
85mm lens, f/1.8, shallow depth of field with subject in perfect focus.
Full body composition with strategic artistic framing.
8K resolution, museum quality, gallery exhibition print.`;

// ═══════════════════════════════════════════════════════════════════════════
// WARDROBE CONCEPTS - Level 9-10 Intimacy
// ═══════════════════════════════════════════════════════════════════════════

const INTIMATE_WARDROBES = {
  velvet_minimal: `Minimal burgundy velvet choker with matching velvet micro-pieces,
gold chain connections creating geometric body pattern, strategic coverage only at essentials,
Victorian dominance aesthetic with contemporary boldness`,

  lace_architecture: `Architectural French lace in wine-dark burgundy,
single-line design framing curves, delicate lace barely covering essentials,
negative space as design element, body visible through gossamer fabric`,

  chain_sculpture: `Delicate gold body chains creating sculptural pattern across form,
chains draping from neck across decolletage, circling waist, framing hips,
minimal fabric only at strategic points, jewelry as primary wardrobe`,

  sheer_silk_cascade: `Ultra-sheer burgundy silk worn as artistic draping,
fabric cascading from one shoulder revealing complete silhouette,
strategic gathering only at most intimate areas, silk catching light`,

  mesh_one_line: `Ultra-sheer black mesh bodysuit with strategic architectural one-line coverage,
mesh creating gossamer veil effect, minimal fabric strategically placed,
body sculpture visible through translucent material`,

  shadow_nude: `Shadow nude-art bodysuit in barely-there nude mesh,
impeccably tailored with strategic architectural coverage matching skin tone,
fabric creating artistic illusion of pure form, almost invisible coverage`
};

// ═══════════════════════════════════════════════════════════════════════════
// INTIMATE VARIANTS - Strategic Focus Areas
// ═══════════════════════════════════════════════════════════════════════════

const VELVET_INTIMACY_VARIANTS = [
  // ─────────────────────────────────────────────────────────────────────────
  // DECOLLETAGE FOCUS SERIES
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'velvet_decolletage_throne',
    name: 'Velvet Throne Decolletage',
    category: 'DECOLLETAGE FOCUS',
    intimacyLevel: 10,
    environment: VELVET_ENVIRONMENTS.throne_room,
    wardrobe: INTIMATE_WARDROBES.velvet_minimal,
    pose: `Seated regally on velvet throne, spine arched back pushing chest forward,
one arm draped on armrest, other hand near throat drawing attention to decolletage,
head tilted back exposing graceful neck line, imperious confident expression,
legs crossed showing thigh, full body visible with decolletage prominently displayed`,
    lighting: `Single gold spotlight from above creating theatrical drama,
light sculpting decolletage curves with precision, deep shadows in cleavage depth,
velvet absorbing ambient light creating infinite backdrop, skin glowing golden`,
    mood: 'Regal sensuality, underground empress, commanding decolletage display',
    focus: 'Decolletage prominence, bust architecture, neck elegance, throne power'
  },
  {
    id: 'velvet_decolletage_wine',
    name: 'Wine Cellar Decolletage',
    category: 'DECOLLETAGE FOCUS',
    intimacyLevel: 9,
    environment: VELVET_ENVIRONMENTS.wine_cellar,
    wardrobe: INTIMATE_WARDROBES.lace_architecture,
    pose: `Leaning forward against oak barrel, arms pressing together enhancing cleavage,
wine glass held near chest drawing eye to decolletage, mysterious smile,
body angled to show complete bust line framed by architectural lace,
one leg bent creating elegant line, full body composition`,
    lighting: `Warm candlelight flickering across decolletage, dancing shadows,
wine-dark atmosphere with golden highlights on curves,
chiaroscuro defining every contour of bust and cleavage`,
    mood: 'Wine-dark mystery, cellar seduction, candlelit decolletage revelation',
    focus: 'Decolletage depth, bust enhancement through pose, lace framing'
  },
  {
    id: 'velvet_decolletage_mirror',
    name: 'Backstage Mirror Decolletage',
    category: 'DECOLLETAGE FOCUS',
    intimacyLevel: 10,
    environment: VELVET_ENVIRONMENTS.burlesque_backstage,
    wardrobe: INTIMATE_WARDROBES.chain_sculpture,
    pose: `Seated at vanity mirror, reflection showing front while camera captures profile,
torso twisted to reveal both direct and reflected decolletage views,
one hand adjusting chains across chest, expression of self-admiration,
legs visible in mirror, creating doubled full-body composition`,
    lighting: `Warm vanity bulbs creating soft glamour lighting,
chains catching light creating sparkle across decolletage,
mirror multiplying the illumination, vintage Hollywood glow`,
    mood: 'Performer intimacy, mirror duality, chain-adorned decolletage',
    focus: 'Double decolletage view, chain patterns on bust, mirror composition'
  },

  // ─────────────────────────────────────────────────────────────────────────
  // LOWER BACK & LUMBAR FOCUS SERIES
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'velvet_lumbar_drape',
    name: 'Velvet Drape Lumbar Poetry',
    category: 'LOWER BACK FOCUS',
    intimacyLevel: 10,
    environment: VELVET_ENVIRONMENTS.maximalist_suite,
    wardrobe: INTIMATE_WARDROBES.sheer_silk_cascade,
    pose: `Standing with back to camera, silk draping from one shoulder,
complete back exposed from neck to lower curve, spine creating dramatic S-curve,
looking over shoulder with smoldering gaze, arms raised arranging hair,
full posterior view showing lumbar dimples and back architecture`,
    lighting: `Warm golden light cascading down spine, shadows defining muscle valleys,
silk catching light creating liquid highlights, baroque warmth from multiple sources`,
    mood: 'Baroque sensuality, silk revelation, lumbar poetry',
    focus: 'Complete back exposure, spine curve, lumbar dimples, shoulder blade sculpture'
  },
  {
    id: 'velvet_lumbar_recline',
    name: 'Opera Box Back Reveal',
    category: 'LOWER BACK FOCUS',
    intimacyLevel: 9,
    environment: VELVET_ENVIRONMENTS.opera_box,
    wardrobe: INTIMATE_WARDROBES.mesh_one_line,
    pose: `Lying face down on velvet chaise in opera box, propped on elbows,
back arched dramatically creating deep lumbar curve, looking over shoulder,
mesh revealing complete back architecture, legs slightly parted,
theatre lights creating dramatic atmosphere, full body prone position`,
    lighting: `Chandelier light filtering through, warm light cascading down spine,
dramatic theatrical shadows, rim light defining silhouette edges`,
    mood: 'Theatrical intimacy, opera house secrets, arched back display',
    focus: 'Lumbar arch, back muscle definition, mesh-revealed spine'
  },
  {
    id: 'velvet_lumbar_standing',
    name: 'Speakeasy Back Silhouette',
    category: 'LOWER BACK FOCUS',
    intimacyLevel: 10,
    environment: VELVET_ENVIRONMENTS.speakeasy,
    wardrobe: INTIMATE_WARDROBES.shadow_nude,
    pose: `Standing in doorway silhouette, complete back visible from nape to lower curves,
one hip cocked creating dramatic waist-to-hip curve, arms on door frame,
head turned in profile, shadow-nude fabric revealing complete back anatomy,
venetian blind shadows striping across back creating graphic pattern`,
    lighting: `Strong backlight creating silhouette with selective front fill,
venetian blind light creating stripe patterns across back and glutes,
noir atmosphere with sculptural definition`,
    mood: 'Noir mystery, doorway revelation, striped shadow art',
    focus: 'Complete back silhouette, waist-hip ratio, shadow stripe patterns'
  },

  // ─────────────────────────────────────────────────────────────────────────
  // GLUTES FOCUS SERIES
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'velvet_glutes_throne',
    name: 'Throne Room Glutes Sculpture',
    category: 'GLUTES FOCUS',
    intimacyLevel: 10,
    environment: VELVET_ENVIRONMENTS.throne_room,
    wardrobe: INTIMATE_WARDROBES.velvet_minimal,
    pose: `Kneeling on velvet throne facing away, torso twisted to show profile,
glutes prominently displayed with velvet micro-piece creating frame,
back arched to maximize posterior curves, looking over shoulder imperiously,
hands gripping throne back, full posterior body visible`,
    lighting: `Gold spotlight sculpting glute roundness, dramatic shadows defining curves,
velvet throne creating rich textured backdrop, skin glowing warmly`,
    mood: 'Imperial posterior display, throne dominance, sculpted glutes',
    focus: 'Glute roundness, hip width, waist-to-hip dramatic ratio'
  },
  {
    id: 'velvet_glutes_cellar',
    name: 'Wine Barrel Glutes Frame',
    category: 'GLUTES FOCUS',
    intimacyLevel: 10,
    environment: VELVET_ENVIRONMENTS.wine_cellar,
    wardrobe: INTIMATE_WARDROBES.lace_architecture,
    pose: `Bent forward over wine barrel, hands on barrel surface,
glutes elevated and prominent, lace thong creating minimal coverage,
looking back through cascade of hair, spine arched creating dramatic curve,
legs straight emphasizing glute lift and thigh sculpture, full body visible`,
    lighting: `Candlelight warming skin from multiple angles, shadows in glute crease,
wine-dark atmosphere enhancing bronze skin tones, sculptural definition`,
    mood: 'Cellar submission aesthetic, barrel frame, candlelit glutes',
    focus: 'Elevated glutes, thigh-to-glute transition, lace frame detail'
  },
  {
    id: 'velvet_glutes_mirror',
    name: 'Vanity Mirror Glutes Double',
    category: 'GLUTES FOCUS',
    intimacyLevel: 10,
    environment: VELVET_ENVIRONMENTS.burlesque_backstage,
    wardrobe: INTIMATE_WARDROBES.chain_sculpture,
    pose: `Standing before full-length mirror, back to camera,
mirror reflecting front view creating complete body visibility,
weight on one leg emphasizing glute asymmetry and roundness,
chains draping across hips and glutes creating decorative pattern,
head turned watching reflection, full body doubled`,
    lighting: `Vanity lights creating soft even illumination,
mirror doubling the light sources, chains sparkling,
warm golden glow enhancing skin luminosity`,
    mood: 'Double exposure beauty, chain-adorned posterior, mirror multiplication',
    focus: 'Glute sculpture from multiple angles, chain patterns on curves'
  },

  // ─────────────────────────────────────────────────────────────────────────
  // FULL BODY ARTISTIC SERIES
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'velvet_fullbody_recline',
    name: 'Maximalist Odalisque',
    category: 'FULL BODY ARTISTIC',
    intimacyLevel: 10,
    environment: VELVET_ENVIRONMENTS.maximalist_suite,
    wardrobe: INTIMATE_WARDROBES.sheer_silk_cascade,
    pose: `Classic odalisque recline on silk sheets, body creating S-curve,
head propped on hand, top leg bent forward revealing full silhouette,
silk barely covering essentials with artful draping,
complete hourglass visible from bust through waist to hips to legs,
confident inviting expression, museum-painting composition`,
    lighting: `Rembrandt lighting with warm golden fill, chiaroscuro depth,
silk catching light creating liquid highlights, baroque opulence,
every curve sculpted by masterful illumination`,
    mood: 'Classical odalisque reimagined, silk poetry, complete form worship',
    focus: 'Full hourglass silhouette, all curves in harmony, classical composition'
  },
  {
    id: 'velvet_fullbody_standing',
    name: 'Opera Box Standing Figure',
    category: 'FULL BODY ARTISTIC',
    intimacyLevel: 10,
    environment: VELVET_ENVIRONMENTS.opera_box,
    wardrobe: INTIMATE_WARDROBES.mesh_one_line,
    pose: `Standing at opera box railing, body in contrapposto pose,
mesh revealing complete figure from neck to ankles,
one hand on velvet curtain, other on hip emphasizing waist,
theatre lights below creating upward illumination,
full statuesque body displayed with theatrical drama`,
    lighting: `Dramatic theatrical lighting from below and chandelier above,
mesh creating gossamer effect, skin glowing through fabric,
velvet curtain creating rich textured frame`,
    mood: 'Theatrical goddess, opera house muse, standing figure study',
    focus: 'Complete standing figure, contrapposto grace, theatrical presence'
  },
  {
    id: 'velvet_fullbody_dynamic',
    name: 'Speakeasy Dance Freeze',
    category: 'FULL BODY ARTISTIC',
    intimacyLevel: 9,
    environment: VELVET_ENVIRONMENTS.speakeasy,
    wardrobe: INTIMATE_WARDROBES.shadow_nude,
    pose: `Dynamic dance pose frozen in time, one leg extended,
arms creating elegant lines, hair in motion,
shadow-nude fabric revealing complete figure in movement,
jazz-era energy captured in single frame,
full body showing athletic grace and sensual power`,
    lighting: `Art deco sconces creating warm period atmosphere,
motion blur suggestion through lighting,
skin glowing with exertion and passion`,
    mood: 'Jazz age energy, dance freeze, dynamic sensuality',
    focus: 'Body in motion, athletic curves, dynamic full figure'
  }
];

// ═══════════════════════════════════════════════════════════════════════════
// PROMPT BUILDER
// ═══════════════════════════════════════════════════════════════════════════

function buildVelvetIntimacyPrompt(variant) {
  return `${QUALITY_PREFIX}

MODEL: ${INDIAN_HOURGLASS_MUSE}

CONCEPT: ${variant.name} - Level ${variant.intimacyLevel} Intimacy
Category: ${variant.category}

ENVIRONMENT: ${variant.environment}

WARDROBE: ${variant.wardrobe}

POSE & COMPOSITION: ${variant.pose}

LIGHTING: ${variant.lighting}

MOOD & NARRATIVE: ${variant.mood}

VISUAL FOCUS: ${variant.focus}

STYLE DIRECTION:
Fine art boudoir photography at its most expressive.
Maximum artistic expression through strategic minimal coverage.
Tasteful, sophisticated, museum-quality execution.
Celebrating the feminine form with reverence and artistic integrity.
Velvet Underground luxury meets intimate revelation.

TECHNICAL REQUIREMENTS:
Full body composition emphasizing ${variant.focus}.
Every curve sculpted by masterful lighting.
Photorealistic skin with authentic texture and luminosity.

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
║   ██╗   ██╗███████╗██╗    ██╗   ██╗███████╗████████╗                         ║
║   ██║   ██║██╔════╝██║    ██║   ██║██╔════╝╚══██╔══╝                         ║
║   ██║   ██║█████╗  ██║    ██║   ██║█████╗     ██║                            ║
║   ╚██╗ ██╔╝██╔══╝  ██║    ╚██╗ ██╔╝██╔══╝     ██║                            ║
║    ╚████╔╝ ███████╗███████╗╚████╔╝ ███████╗   ██║                            ║
║     ╚═══╝  ╚══════╝╚══════╝ ╚═══╝  ╚══════╝   ╚═╝                            ║
║                                                                              ║
║            🔥 VELVET INTIMACY FUSION SERIES 🔥                               ║
║                                                                              ║
║    Premium Couch Subject × Velvet Underground Environment                   ║
║    Level 9-10 Intimacy • Strategic Artistic Focus                           ║
║                                                                              ║
║    DECOLLETAGE | LOWER BACK | GLUTES | FULL BODY                            ║
║    Helmut Newton × Annie Leibovitz × Mario Testino                          ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
  `);

  log('Authenticating with Vertex AI...');
  let oauthToken = await getOAuthToken();
  log('✅ OAuth token obtained');

  // Create output directories
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  const categories = ['decolletage_focus', 'lower_back_focus', 'glutes_focus', 'full_body_artistic'];
  categories.forEach(cat => {
    fs.mkdirSync(path.join(OUTPUT_DIR, cat), { recursive: true });
  });

  // Parse arguments
  const args = process.argv.slice(2);
  const categoryFilter = args[0];
  const startIndex = parseInt(args[1]) || 0;
  const maxCount = parseInt(args[2]) || 12;

  let variantsToGenerate = VELVET_INTIMACY_VARIANTS;

  if (categoryFilter) {
    variantsToGenerate = VELVET_INTIMACY_VARIANTS.filter(v =>
      v.category.toLowerCase().includes(categoryFilter.toLowerCase()) ||
      v.id.toLowerCase().includes(categoryFilter.toLowerCase())
    );
  }

  variantsToGenerate = variantsToGenerate.slice(startIndex, startIndex + maxCount);

  const results = [];
  let successCount = 0;
  let failCount = 0;

  console.log(`\n${'═'.repeat(78)}`);
  log(`🔥 GENERATING ${variantsToGenerate.length} VELVET INTIMACY VARIANTS`);
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

    const prompt = buildVelvetIntimacyPrompt(variant);

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
  const manifestPath = path.join(OUTPUT_DIR, 'velvet-intimacy-manifest.json');
  const manifest = {
    timestamp: new Date().toISOString(),
    series: 'Velvet Intimacy Fusion Series',
    concept: 'Premium Couch Subject × Velvet Underground Environment',
    model: 'Indian Hourglass Muse',
    style: 'Helmut Newton × Annie Leibovitz × Mario Testino',
    intimacyRange: '9-10',
    categories: ['DECOLLETAGE FOCUS', 'LOWER BACK FOCUS', 'GLUTES FOCUS', 'FULL BODY ARTISTIC'],
    totalVariants: VELVET_INTIMACY_VARIANTS.length,
    results
  };
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

  // Summary
  console.log(`\n${'═'.repeat(78)}`);
  console.log(`              VELVET INTIMACY FUSION COMPLETE`);
  console.log(`${'═'.repeat(78)}`);
  console.log(`\n  ✅ Successful: ${successCount}`);
  console.log(`  ❌ Failed: ${failCount}`);
  console.log(`\n  Generated by category:`);

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

  console.log(`\n  Output directory: ${OUTPUT_DIR}`);
  log(`📋 Manifest: ${manifestPath}`);
  console.log(`${'═'.repeat(78)}\n`);
}

main().catch(console.error);
