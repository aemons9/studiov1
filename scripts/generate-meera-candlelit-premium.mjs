#!/usr/bin/env node

/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                                                                              ║
 * ║   ███╗   ███╗███████╗███████╗██████╗  █████╗                                 ║
 * ║   ████╗ ████║██╔════╝██╔════╝██╔══██╗██╔══██╗                                ║
 * ║   ██╔████╔██║█████╗  █████╗  ██████╔╝███████║                                ║
 * ║   ██║╚██╔╝██║██╔══╝  ██╔══╝  ██╔══██╗██╔══██║                                ║
 * ║   ██║ ╚═╝ ██║███████╗███████╗██║  ██║██║  ██║                                ║
 * ║   ╚═╝     ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝                                ║
 * ║                                                                              ║
 * ║   CANDLELIT CHAMBER PREMIUM EXCLUSIVE - MEERA COLLECTION                     ║
 * ║                                                                              ║
 * ║   God-Mode Adaptive Intelligent Creation Engine                              ║
 * ║   10+ Premium Subscriber Exclusive Variants                                  ║
 * ║                                                                              ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

import fs from 'fs';
import path from 'path';

const OUTPUT_DIR = '/home/ecolex/version1/generated-meera-candlelit-premium';
const PROJECT_ID = 'zaranovel';
const LOCATION = 'us-central1';
const PROXY_URL = 'http://localhost:3001';

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// ═══════════════════════════════════════════════════════════════════════════════
// MEERA - ELITE INDIAN GLAMOUR MUSE
// ═══════════════════════════════════════════════════════════════════════════════

const MEERA_SUBJECT = `Elite Indian fit glamour model Meera, height 5'9", transcendent full-body glamour presence, perfect fit hourglass figure with balanced divine proportions, warm caramel complexion with golden highlights, striking magnetic dark eyes with intense gaze, full sensual lips, sleek black hair styled elegantly, magnificent confident presence, age 26-30, authentic natural skin texture with subtle luminosity`;

// ═══════════════════════════════════════════════════════════════════════════════
// ART DIRECTOR DECLARATIONS
// ═══════════════════════════════════════════════════════════════════════════════

const ART_DECLARATIONS = {
  cannes: `Art Director Declaration: Creating transcendent masterwork in the tradition of Cannes Film Festival Palme d'Or winning intimate cinematography, celebrating complete divine feminine form with European art-house master sophistication`,

  renaissance: `Art Director Declaration: Renaissance master sensual portraiture worthy of Criterion Collection permanent archive, Titian transcendent mastery with UNESCO World Heritage artistic legitimacy`,

  museum: `Art Director Declaration: Met Museum contemporary photography collection standard, museum-caliber sophistication with gallery-worthy intimate portraiture celebrating natural divine feminine perfection`,

  cinema: `Art Director Declaration: Lars von Trier art-house boldness with MoMA film archive permanent collection standard, dramatic film-noir chiaroscuro creating intimate transcendent atmosphere`,

  heritage: `Art Director Declaration: UNESCO World Heritage complete divine form celebration, Khajuraho temple sculpture authenticity with sacred artistic tradition honoring feminine beauty`
};

// ═══════════════════════════════════════════════════════════════════════════════
// PREMIUM EXCLUSIVE VARIANTS - 16 MASTERWORKS
// ═══════════════════════════════════════════════════════════════════════════════

const PREMIUM_VARIANTS = [
  // ─────────────────────────────────────────────────────────────────────────────
  // SILVER CANDELABRA SERIES - Renaissance Devotion
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'silver_venus_recline',
    name: 'Silver Venus Recline',
    artDeclaration: ART_DECLARATIONS.renaissance,
    wardrobe: `transcendent minimal champagne gold beaded bodychain with intricate geometric lace pattern, ultra-thin beaded straps creating delicate web design across torso, strategic crystalline coverage with artistic aesthetic, architectural beaded cups catching candlelight, high-cut silhouette with chain accents at hips`,
    pose: `fully reclined on silver silk chaise with body extended in transcendent flow, one leg elegantly extended showcasing complete length, other leg bent at knee creating open intimate composition, spine gently arched with Renaissance Venus grace, one arm extended above head with hand in flowing hair, other hand resting on hip accentuating curves, head tilted with sultry gaze, lips slightly parted`,
    environment: `luxurious private chamber with textured grey plaster walls, ornate silver candelabras with flickering white tapers, silver-grey silk drapery flowing from ceiling, plush cream fur throw on silver chaise, warm golden candlelight throughout`,
    lighting: `dramatic Cannes-winning cinematic lighting with chiaroscuro masterwork, low-angle golden key light from candelabras, soft fill maintaining intimate detail, rim light creating divine outline, Titian sensual mastery`
  },
  {
    id: 'silver_worship_kneeling',
    name: 'Silver Chamber Worship',
    artDeclaration: ART_DECLARATIONS.heritage,
    wardrobe: `delicate rose gold metallic lace bodysuit with baroque floral patterns, shimmering threads catching warm light, plunging neckline with scalloped edges, high-cut design revealing hip curves, long sleeves with intricate lace detailing`,
    pose: `kneeling on plush cream sheepskin, sitting back on heels in contemplative goddess energy, spine elongated with chest lifted, arms resting gracefully on thighs, head tilted upward with eyes closed in serene transcendent expression, complete surrender to artistic moment`,
    environment: `candlelit chamber with grey textured walls, brass and silver candelabras with white tapers, silver silk drapery, grey velvet cushions, cream fur accents on floor`,
    lighting: `warm golden candlelight from multiple sources creating dancing highlights on metallic lace and skin, deep shadows defining form, intimate romantic atmosphere`
  },
  {
    id: 'silver_serpentine_flow',
    name: 'Silver Serpentine Flow',
    artDeclaration: ART_DECLARATIONS.museum,
    wardrobe: `bronze metallic chainmail micro bikini set, fine interlocking metal rings in warm copper-bronze tone, thin chain straps, minimal triangle coverage with chain fringe, metal catching candlelight with liquid shimmer`,
    pose: `lying on silver silk with serpentine S-curve body line, torso twisted showing both front curves and back arch, one arm trailing above head, other hand at hip, legs creating elegant flowing curve, head turned toward camera with intense magnetic gaze`,
    environment: `luxurious silver chamber with ornate candelabras, silver silk sheets pooling around form, grey velvet headboard visible, cream fur throw accent`,
    lighting: `multiple candlelight sources creating warm ambient glow, golden highlights dancing on chainmail, subtle shadows defining every curve`
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // VELVET CANDLELIT SERIES - Intimate Devotion
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'velvet_throne_command',
    name: 'Velvet Throne Command',
    artDeclaration: ART_DECLARATIONS.cannes,
    wardrobe: `sheer champagne mesh bodysuit with delicate gold embroidery tracing curves, ultra-thin fabric like second skin, plunging V-neckline to navel, high-cut at hips, strategic gold thread coverage`,
    pose: `seated on deep burgundy velvet throne chair, one leg crossed over other showcasing length, spine straight with commanding presence, one arm on armrest, other hand at collarbone, direct intense gaze at viewer with confident power`,
    environment: `opulent candlelit chamber with deep burgundy velvet walls, multiple brass candelabras with white tapers casting warm glow, gold-framed mirror reflecting candlelight, burgundy velvet floor cushions`,
    lighting: `dramatic Palme d'Or cinematic lighting, golden key light from candelabras, deep shadows on velvet walls, rim light defining silhouette`
  },
  {
    id: 'velvet_odalisque_prone',
    name: 'Velvet Odalisque',
    artDeclaration: ART_DECLARATIONS.renaissance,
    wardrobe: `champagne silk chemise with delicate Chantilly lace trim, whisper-thin straps, flowing fabric pooling around form, mid-thigh length with side slit, romantic ethereal aesthetic`,
    pose: `lying prone on burgundy velvet chaise, weight on forearms lifting upper body, chin resting on hands, back arched creating dramatic curve, legs bent with feet raised and crossed at ankles, direct forward gaze with knowing smile`,
    environment: `candlelit chamber with burgundy velvet walls, brass candle holders with pillar candles, gold-framed artwork in background, velvet and cream fur textures layered`,
    lighting: `warm candlelight creating golden glow on silk chemise, soft shadows caressing curves, intimate atmosphere`
  },
  {
    id: 'velvet_sacred_stretch',
    name: 'Velvet Sacred Stretch',
    artDeclaration: ART_DECLARATIONS.heritage,
    wardrobe: `copper mesh bodychain with amber crystal accents, delicate chains creating artistic web pattern across torso, warm metallic tones harmonizing with caramel skin, minimal strategic coverage with crystal focal points`,
    pose: `lying on velvet with full body stretch, both arms extended above head creating long line, spine arched lifting chest, one leg extended straight, other bent at knee, toes pointed, head tilted back in transcendent expression`,
    environment: `burgundy velvet chamber with golden candlelight, brass candelabras surrounding chaise, burgundy silk drapery, cream sheepskin accent`,
    lighting: `warm amber candlelight throughout, golden glow on copper mesh creating liquid highlights, soft inviting atmosphere`
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // INDUSTRIAL GLAMOUR SERIES - Modern Edge
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'industrial_fur_embrace',
    name: 'Industrial Fur Embrace',
    artDeclaration: ART_DECLARATIONS.cinema,
    wardrobe: `flowing champagne gold sequined cape draped over minimal nude mesh bodysuit, sequins catching warm light like liquid gold, ethereal draping revealing curves, luxurious fabric pooling on floor around form`,
    pose: `seated on large brown fur throw on polished wooden floor, legs extended to side with graceful curve, arms wrapped around drawn-up knees in self-embrace, head tilted with contemplative vulnerable gaze, hair flowing over one shoulder`,
    environment: `modern industrial loft with exposed metal pipes and beams, large fur throw on warm wooden floor, vintage industrial floor lamp with edison bulbs providing warm glow, raw concrete walls, intimate urban luxury`,
    lighting: `warm side lighting from vintage lamp creating golden glow on sequined cape, dramatic shadows on industrial elements, Lars von Trier cinematic boldness`
  },
  {
    id: 'industrial_languid_stretch',
    name: 'Industrial Languid',
    artDeclaration: ART_DECLARATIONS.museum,
    wardrobe: `sheer nude mesh slip dress with gold lace trim at bust and hem, barely-there fabric, thin spaghetti straps, thigh-length with side slit revealing leg, minimal artistic coverage`,
    pose: `lying on fur throw with one leg extended straight, other knee bent and fallen to side, arms positioned above head in languid stretch creating long body line, torso slightly arched, head turned toward camera with sultry half-lidded gaze`,
    environment: `industrial loft with metal clothing rack visible in background, large fur throw on wooden floor, vintage lamp providing warm directional light, exposed pipes and beams`,
    lighting: `warm directional light from floor lamp creating dramatic chiaroscuro, golden highlights on skin and mesh, museum-caliber sophistication`
  },
  {
    id: 'industrial_sculptural_kneel',
    name: 'Industrial Sculptural',
    artDeclaration: ART_DECLARATIONS.heritage,
    wardrobe: `architectural black mesh bodysuit with geometric cutouts creating artistic patterns, strategic opaque panels, high neck with keyhole opening, long sleeves, form-fitting silhouette celebrating every curve`,
    pose: `kneeling on fur throw with knees apart, sitting back on heels, hands resting on inner thighs, spine elongated with chest lifted, head tilted slightly with confident direct gaze, sculptural goddess presence`,
    environment: `industrial loft setting with warm wood floors, large fur throw, vintage lighting, exposed brick and metal elements, modern urban aesthetic`,
    lighting: `dramatic single source lighting creating bold shadows, rim light defining form against industrial background, Khajuraho sculptural quality`
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // AMBER GLOW SERIES - Golden Warmth
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'amber_intimate_recline',
    name: 'Amber Intimate Recline',
    artDeclaration: ART_DECLARATIONS.cannes,
    wardrobe: `gold metallic mesh slip in warm honey tone, whisper-thin fabric that catches light, thin straps, thigh-length with flowing silhouette, fabric barely distinguishable from golden skin`,
    pose: `reclined on amber velvet with body creating flowing S-curve, one arm above head, other trailing along body contour, one leg extended, other bent at knee falling open, head on pillow with intimate direct gaze, lips parted`,
    environment: `warm amber-toned chamber with honey-gold walls, brass candelabras with amber glass votives, golden silk drapery catching warm light, caramel fur throw`,
    lighting: `warm amber candlelight throughout, golden glow harmonizing with skin tone, soft intimate atmosphere worthy of Palme d'Or`
  },
  {
    id: 'amber_goddess_seated',
    name: 'Amber Seated Goddess',
    artDeclaration: ART_DECLARATIONS.renaissance,
    wardrobe: `rose gold beaded harness with crystal drops, delicate chains connecting geometric patterns across torso, minimal coverage with maximum artistic design, crystals catching and scattering amber light`,
    pose: `seated on amber velvet cushion with knees drawn up to chest, arms wrapped around legs in vulnerable self-embrace, chin resting on knee with sideways contemplative gaze, warm intimate expression`,
    environment: `amber-toned candlelit chamber with golden walls, multiple brass candelabras with pillar candles, golden silk panels, caramel sheepskin rug`,
    lighting: `multiple amber candlelight sources creating warm enveloping glow, golden highlights on beaded harness, Renaissance master warmth`
  },
  {
    id: 'amber_floor_worship',
    name: 'Amber Floor Worship',
    artDeclaration: ART_DECLARATIONS.heritage,
    wardrobe: `antique bronze mesh drape wrap, flowing metallic fabric that moves like liquid, wrapped minimally around hips with train flowing behind, torso adorned with thin bronze chains`,
    pose: `kneeling on caramel fur with upper body bowed forward in worship pose, forehead near floor, arms extended forward, back arched creating dramatic curve, one knee up showing hip and thigh line, sacred devotional energy`,
    environment: `warm amber chamber with golden candlelight, brass candelabras surrounding, golden walls and silk drapery, plush caramel fur throw`,
    lighting: `golden candlelight creating sacred atmosphere, highlights tracing spine and curves, UNESCO Heritage artistic reverence`
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // PLATINUM ELEGANCE SERIES - Cool Luxury
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'platinum_mirror_reflection',
    name: 'Platinum Mirror',
    artDeclaration: ART_DECLARATIONS.museum,
    wardrobe: `silver metallic mesh bodysuit with crystalline accents, cool platinum shimmer, thin straps, plunging back, fabric reflecting light like liquid mercury`,
    pose: `standing before full-length mirror, torso twisted to show both front and back reflection, one hand on hip, other touching mirror surface, looking at own reflection with confident self-admiration, full body visible in mirror`,
    environment: `cool platinum-toned chamber with silver-grey walls, elegant silver candelabras with white candles, platinum silk drapery, white fur throw on floor, large ornate silver-framed mirror`,
    lighting: `cool white candlelight with silver undertones, elegant highlights on metallic mesh, Met Museum contemporary sophistication`
  },
  {
    id: 'platinum_chaise_twist',
    name: 'Platinum Chaise Twist',
    artDeclaration: ART_DECLARATIONS.cannes,
    wardrobe: `platinum chainmail micro set with crystal fringe, cool silver metal catching light, minimal coverage with maximum sparkle, thin chains connecting pieces`,
    pose: `seated on white fur-draped chaise with legs to one side, torso twisted dramatically toward camera, one hand on chaise behind for support, other at neck, looking over shoulder with sultry intense gaze`,
    environment: `platinum chamber with silver-grey walls, silver candelabras with white tapers, platinum silk flowing from ceiling, white fur throw on grey velvet chaise`,
    lighting: `cool candlelight creating silver highlights, dramatic shadows, Cannes Film Festival cinematic elegance`
  },
  {
    id: 'platinum_venus_floor',
    name: 'Platinum Venus',
    artDeclaration: ART_DECLARATIONS.renaissance,
    wardrobe: `white sheer lace teddy with silver thread embroidery, delicate floral patterns, plunging neckline, high-cut silhouette, romantic ethereal aesthetic with cool elegance`,
    pose: `lying on white fur on floor in classic Venus pose, propped on one elbow, other arm draped along body, legs crossed at ankles, torso slightly turned, direct gaze with serene confidence`,
    environment: `platinum chamber with silver walls, white candles in silver holders, platinum silk panels, plush white fur throw creating cloud-like surface`,
    lighting: `soft white candlelight creating ethereal glow, Renaissance Venus lighting with contemporary edge`
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // NOIR LUXURY SERIES - Dark Elegance
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'noir_shadow_surrender',
    name: 'Noir Shadow Surrender',
    artDeclaration: ART_DECLARATIONS.cinema,
    wardrobe: `black sheer mesh bodysuit with strategic opaque geometric panels, architectural cutouts revealing skin, long sleeves, high neck with keyhole, form-fitting noir elegance`,
    pose: `kneeling on black fur throw, sitting back on heels, head tilted upward with eyes closed in surrendered expression, arms at sides with palms up in offering gesture, spine elongated, chest lifted`,
    environment: `dark luxurious chamber with charcoal black walls, matte black candelabras with black candles providing subtle glow, black silk drapery, black fur throw, silver accents`,
    lighting: `single dramatic candlelight source creating deep noir shadows, rim lighting on curves, Lars von Trier cinematic intensity`
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
// ADAPTIVE INTELLIGENT GENERATION ENGINE
// ═══════════════════════════════════════════════════════════════════════════════

async function getOAuthToken() {
  const response = await fetch(`${PROXY_URL}/api/gcloud-token`);
  const data = await response.json();
  if (data.success && data.token) return data.token;
  throw new Error('Failed to get OAuth token');
}

async function generateImage(prompt, outputPath, token, retryCount = 0) {
  const url = `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/publishers/google/models/imagen-4.0-ultra-generate-001:predict`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      instances: [{ prompt }],
      parameters: {
        sampleCount: 1,
        aspectRatio: '3:4',
        sampleImageSize: '2048',
        personGeneration: 'allow_adult',
        safetySetting: 'block_few',
        addWatermark: false,
        includeRaiReason: true,
        outputOptions: { mimeType: 'image/png', compressionQuality: 100 }
      }
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`API error: ${response.status} - ${error.slice(0, 150)}`);
  }

  const result = await response.json();
  const prediction = result.predictions?.[0];

  if (prediction?.bytesBase64Encoded) {
    const buffer = Buffer.from(prediction.bytesBase64Encoded, 'base64');
    fs.writeFileSync(outputPath, buffer);
    return { success: true, size: buffer.length };
  }

  if (prediction?.raiFilteredReason) {
    throw new Error(`Filtered: ${prediction.raiFilteredReason}`);
  }

  throw new Error('No image data returned');
}

function buildMasterPrompt(variant) {
  return `${variant.artDeclaration}

Award-winning fine art boudoir photography, museum-quality masterpiece, Canon EOS R5 with 85mm f/1.4 lens, Criterion Collection cinematic standard,

Subject: ${MEERA_SUBJECT},

Sacred Wardrobe: ${variant.wardrobe},

Divine Pose: ${variant.pose},

Transcendent Environment: ${variant.environment},

Master Lighting: ${variant.lighting},

ULTIMATE transcendent 8K resolution masterwork celebrating complete divine feminine form as sacred art. Professional museum-caliber finish with authentic skin texture, natural radiance, zero artificial enhancement. Cannes Palme d'Or aesthetic sophistication with Renaissance sensual elegance. Shallow DOF f/1.4 with cinematic bokeh.`;
}

function log(msg) {
  console.log(`[${new Date().toLocaleTimeString()}] ${msg}`);
}

async function main() {
  console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║   ███╗   ███╗███████╗███████╗██████╗  █████╗                                 ║
║   ████╗ ████║██╔════╝██╔════╝██╔══██╗██╔══██╗                                ║
║   ██╔████╔██║█████╗  █████╗  ██████╔╝███████║                                ║
║   ██║╚██╔╝██║██╔══╝  ██╔══╝  ██╔══██╗██╔══██║                                ║
║   ██║ ╚═╝ ██║███████╗███████╗██║  ██║██║  ██║                                ║
║   ╚═╝     ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝                                ║
║                                                                              ║
║   ✨ CANDLELIT CHAMBER PREMIUM EXCLUSIVE ✨                                  ║
║                                                                              ║
║   Elite Indian Glamour Muse • 16 Masterwork Variants                         ║
║                                                                              ║
║   Silver Candelabra • Velvet Devotion • Industrial Glamour                   ║
║   Amber Glow • Platinum Elegance • Noir Luxury                               ║
║                                                                              ║
║   God-Mode Adaptive Intelligent Creation Engine                              ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
  `);

  log('Authenticating with Vertex AI...');
  let token = await getOAuthToken();
  log('✅ OAuth token obtained\\n');

  const results = { successful: [], failed: [] };
  let consecutiveFailures = 0;

  for (let i = 0; i < PREMIUM_VARIANTS.length; i++) {
    const variant = PREMIUM_VARIANTS[i];

    // Refresh token every 4 images
    if (i > 0 && i % 4 === 0) {
      log('🔄 Refreshing OAuth token...');
      token = await getOAuthToken();
    }

    console.log('══════════════════════════════════════════════════════════════════════════════');
    log(`✨ [${i + 1}/${PREMIUM_VARIANTS.length}] ${variant.name}`);
    log(`   Art Declaration: ${variant.artDeclaration.slice(0, 60)}...`);

    const prompt = buildMasterPrompt(variant);
    const filename = `meera_${variant.id}_${i}_${Date.now()}.png`;
    const filepath = path.join(OUTPUT_DIR, filename);

    try {
      const result = await generateImage(prompt, filepath, token);
      const sizeMB = (result.size / (1024 * 1024)).toFixed(2);
      log(`   ✅ MASTERWORK CREATED: ${filename} (${sizeMB} MB)`);
      results.successful.push({ ...variant, filename, sizeMB });
      consecutiveFailures = 0;
    } catch (error) {
      log(`   ❌ Failed: ${error.message}`);
      results.failed.push({ ...variant, error: error.message });
      consecutiveFailures++;

      // Adaptive wait based on failure type
      if (error.message.includes('Filtered')) {
        const waitTime = Math.min(90 + (consecutiveFailures * 30), 180);
        log(`   ⏳ Adaptive wait: ${waitTime}s (consecutive failures: ${consecutiveFailures})`);
        await new Promise(r => setTimeout(r, waitTime * 1000));
      } else if (error.message.includes('429')) {
        log(`   ⏳ Rate limited, waiting 120s...`);
        await new Promise(r => setTimeout(r, 120000));
      }
    }

    // Standard delay between requests
    const baseDelay = 25000;
    const adaptiveDelay = baseDelay + (consecutiveFailures * 5000);
    log(`   ⏳ Next in ${adaptiveDelay / 1000}s...`);
    await new Promise(r => setTimeout(r, adaptiveDelay));
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // FINAL REPORT
  // ═══════════════════════════════════════════════════════════════════════════

  console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║              MEERA CANDLELIT PREMIUM EXCLUSIVE COMPLETE                      ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝

  ✅ Masterworks Created: ${results.successful.length}
  ❌ Failed: ${results.failed.length}
  📊 Success Rate: ${((results.successful.length / PREMIUM_VARIANTS.length) * 100).toFixed(1)}%

  SUCCESSFUL VARIANTS:
${results.successful.map(v => `     📸 ${v.name} (${v.sizeMB} MB)`).join('\n')}

  Output Directory: ${OUTPUT_DIR}
══════════════════════════════════════════════════════════════════════════════
`);

  // Save manifest
  const manifest = {
    timestamp: new Date().toISOString(),
    subject: 'Meera - Elite Indian Glamour Muse',
    collection: 'Candlelit Chamber Premium Exclusive',
    variants: PREMIUM_VARIANTS.length,
    successful: results.successful,
    failed: results.failed,
    successRate: ((results.successful.length / PREMIUM_VARIANTS.length) * 100).toFixed(1) + '%'
  };

  fs.writeFileSync(path.join(OUTPUT_DIR, 'manifest.json'), JSON.stringify(manifest, null, 2));
  log('📋 Manifest saved\\n');
}

main().catch(console.error);
