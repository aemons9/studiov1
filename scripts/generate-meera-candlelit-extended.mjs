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
 * ║   CANDLELIT CHAMBER EXTENDED - AVANT-GARDE INTIMACY COLLECTION               ║
 * ║                                                                              ║
 * ║   God-Mode Adaptive Intelligent Creation Engine                              ║
 * ║   12 Exclusive Intimacy Variants • Bifurcated Avant-Garde Design             ║
 * ║                                                                              ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

import fs from 'fs';
import path from 'path';

const OUTPUT_DIR = '/home/ecolex/version1/generated-meera-candlelit-extended';
const PROJECT_ID = 'zaranovel';
const LOCATION = 'us-central1';
const PROXY_URL = 'http://localhost:3001';

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// ═══════════════════════════════════════════════════════════════════════════════
// MEERA - ELITE REALISTIC INDIAN GLAMOUR MUSE
// ═══════════════════════════════════════════════════════════════════════════════

const MEERA_SUBJECT = `Stunningly beautiful Indian woman Meera, age 27, height 5'9", naturally curvaceous hourglass figure with full bust and dramatic hip curves, warm golden-brown caramel skin with natural luminous glow, captivating deep brown almond eyes with thick dark lashes, full sensual lips with natural color, long flowing black hair styled beautifully, authentic natural beauty with realistic skin texture including subtle pores and natural highlights, confident relaxed expression`;

// ═══════════════════════════════════════════════════════════════════════════════
// MUSEUM/EDITORIAL ART DIRECTOR DECLARATIONS
// ═══════════════════════════════════════════════════════════════════════════════

const ART_DECLARATIONS = {
  metMuseum: `Metropolitan Museum of Art Costume Institute fashion exhibition photograph. Museum-quality documentation of avant-garde conceptual intimate apparel design. Professional archival photography.`,

  vogueItalia: `Vogue Italia editorial masterwork by Annie Leibovitz. Professional fashion photography celebrating innovative lingerie architecture for luxury print publication. Award-winning editorial aesthetic.`,

  christies: `Christie's auction catalog photograph documenting designer conceptual intimate apparel as wearable art investment piece. Archival quality image with museum provenance.`,

  tate: `Tate Modern contemporary art photography exhibition. Conceptual fashion as artistic expression, celebrating the intersection of architecture and intimate design. Gallery-standard documentation.`,

  gagosian: `Gagosian Gallery fine art photography collection. Conceptual fashion portraiture exploring form and negative space in avant-garde intimate design. Museum-caliber artistic vision.`,

  aperture: `Aperture Foundation award-winning photography. Documentary fine art capturing innovative fashion design with editorial sophistication and authentic artistic integrity.`
};

// ═══════════════════════════════════════════════════════════════════════════════
// AVANT-GARDE WARDROBE - BIFURCATED OPEN-FRONT DESIGN
// ═══════════════════════════════════════════════════════════════════════════════

const AVANT_GARDE_WARDROBE = {
  base: `avant-garde designer lower foundation garment in midnight black mesh with architectural bifurcated open-front design, separated panels held precisely in place by delicate tension straps at the hips, conceptual intimate architecture creating artistic negative space, fine elastic bands with gold hardware adjusters, high-cut silhouette accentuating hip curves`,

  champagne: `avant-garde designer lower foundation garment in champagne gold mesh with architectural bifurcated open-front design, separated panels connected by delicate tension straps with rose gold hardware at the hips, conceptual intimate architecture, high-cut silhouette with artistic negative space`,

  rose: `avant-garde designer lower foundation garment in blush rose mesh with architectural bifurcated open-front design, separated panels held by thin tension straps with silver hardware at the hips, conceptual wearable art creating elegant negative space, high-cut design`,

  bronze: `avant-garde designer lower foundation garment in warm bronze metallic mesh with architectural bifurcated open-front design, separated panels connected by thin chain tension straps at the hips, conceptual intimate architecture with warm metallic sheen`
};

// ═══════════════════════════════════════════════════════════════════════════════
// 12 EXCLUSIVE INTIMACY VARIANTS
// ═══════════════════════════════════════════════════════════════════════════════

const EXCLUSIVE_VARIANTS = [
  // ─────────────────────────────────────────────────────────────────────────────
  // DECOLLETAGE DETAILS SERIES
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'decolletage_candlelit_portrait',
    name: 'Candlelit Decolletage Portrait',
    artDeclaration: ART_DECLARATIONS.vogueItalia,
    wardrobe: `${AVANT_GARDE_WARDROBE.champagne}, paired with matching champagne mesh bandeau with thin straps catching golden candlelight`,
    pose: `three-quarter portrait from waist up, shoulders slightly angled to camera, collarbone and decolletage prominently displayed in warm light, one hand delicately touching neck, head tilted with soft gaze, candlelight dancing on skin creating natural highlights on collarbones and upper chest`,
    environment: `intimate candlelit chamber with warm honey-gold textured walls, antique brass candelabras with flickering ivory tapers arranged nearby, champagne silk drapery cascading in background, soft cream fur throw visible`,
    lighting: `warm golden candlelight creating natural highlights on collarbones and decolletage, soft side lighting accentuating skin texture, shallow depth of field with gentle bokeh`,
    focus: 'upper body portrait with decolletage emphasis'
  },
  {
    id: 'decolletage_mirror_reflection',
    name: 'Mirror Decolletage Study',
    artDeclaration: ART_DECLARATIONS.metMuseum,
    wardrobe: `${AVANT_GARDE_WARDROBE.base}, paired with delicate black mesh bralette with thin straps, minimal coverage`,
    pose: `standing before ornate mirror, upper body reflected showing both front view and mirror reflection of back, hands adjusting hair upward exposing full neck and collarbones, decolletage prominently displayed in double view`,
    environment: `elegant dressing room with large ornate gold-framed mirror, multiple candelabras with white tapers on vanity, grey velvet walls, scattered rose petals on marble surface`,
    lighting: `warm candlelight from multiple angles creating natural skin luminosity, highlights on collar bones from front and rim light from behind via mirror reflection`,
    focus: 'decolletage and upper chest detail'
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // HIPS AND GLUTES FOCUS SERIES
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'hip_curves_standing',
    name: 'Standing Hip Architecture',
    artDeclaration: ART_DECLARATIONS.tate,
    wardrobe: `${AVANT_GARDE_WARDROBE.bronze}, tension straps prominently visible at hip bones creating architectural lines, paired with matching bronze mesh bandeau`,
    pose: `standing three-quarter back view showcasing dramatic hip curves, weight shifted to one leg creating natural S-curve, hands on hips emphasizing the architectural garment design, looking over shoulder with confident expression`,
    environment: `modern gallery space with neutral grey walls, soft directional lighting, minimalist aesthetic with warm amber candlelight accents from floor candelabras`,
    lighting: `warm directional light emphasizing hip curves and the tension strap architecture, rim lighting defining silhouette, professional fashion photography quality`,
    focus: 'hip curves and architectural garment detail'
  },
  {
    id: 'glutes_reclined_profile',
    name: 'Reclined Profile Curves',
    artDeclaration: ART_DECLARATIONS.gagosian,
    wardrobe: `${AVANT_GARDE_WARDROBE.champagne}, high-cut design accentuating glute curves, tension straps visible at hip line`,
    pose: `lying on side in profile view on velvet chaise, body creating dramatic flowing curve from shoulders through waist to hips, upper leg slightly forward showcasing hip and glute curve, head propped on hand, relaxed sensual expression`,
    environment: `luxurious velvet-draped chamber in deep burgundy, brass candelabras with amber glow, velvet chaise with cream fur throw`,
    lighting: `warm side lighting tracing the curve from hip through glutes, creating natural shadow definition, candlelight warmth on skin`,
    focus: 'side profile emphasizing hip and glute curves'
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // KNEELING CURVES SERIES
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'kneeling_worship_pose',
    name: 'Kneeling Worship',
    artDeclaration: ART_DECLARATIONS.christies,
    wardrobe: `${AVANT_GARDE_WARDROBE.rose}, bifurcated design visible from front, paired with matching rose mesh bralette with delicate straps`,
    pose: `kneeling on plush cream sheepskin, sitting back on heels with knees slightly apart, spine elongated with chest lifted, hands resting on thighs, head tilted upward with eyes closed in serene contemplative expression, the avant-garde garment design prominently displayed`,
    environment: `warm candlelit sanctuary with cream and gold textured walls, multiple brass candelabras surrounding the scene, cream sheepskin rug, golden silk drapery`,
    lighting: `warm enveloping candlelight from all sides, creating soft shadows defining form, golden glow on rose mesh fabric`,
    focus: 'frontal kneeling pose showing garment architecture'
  },
  {
    id: 'kneeling_back_arch',
    name: 'Kneeling Back Arch',
    artDeclaration: ART_DECLARATIONS.aperture,
    wardrobe: `${AVANT_GARDE_WARDROBE.base}, tension straps visible at hip line from behind, paired with minimal black mesh bandeau`,
    pose: `kneeling with knees apart, upper body arched backward with hands on floor behind for support, dramatic curve from knees through torso to head tilted back, showcasing both front curves and back arch simultaneously`,
    environment: `intimate chamber with dark charcoal walls, silver candelabras with white tapers creating dramatic contrast, black fur throw under knees`,
    lighting: `dramatic chiaroscuro lighting, key light from front defining body curve, rim light from behind creating silhouette outline`,
    focus: 'dramatic back arch in kneeling position'
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // RECLINING INTIMACY SERIES
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'reclined_venus_pose',
    name: 'Reclining Venus',
    artDeclaration: ART_DECLARATIONS.metMuseum,
    wardrobe: `${AVANT_GARDE_WARDROBE.champagne}, open-front design visible as body reclines, paired with champagne mesh bandeau`,
    pose: `fully reclined on silk chaise in classic Venus pose, body extended with natural curves on display, one arm above head flowing through hair, other hand resting at hip near the tension strap detail, one leg extended, other bent at knee, head on silk pillow with soft intimate gaze at viewer`,
    environment: `luxurious golden chamber with warm amber walls, ornate brass candelabras with ivory candles, champagne silk sheets pooling around form, cream fur throw accents`,
    lighting: `warm golden candlelight creating soft highlights across body, gentle fill eliminating harsh shadows, intimate romantic atmosphere`,
    focus: 'full body recline showing complete garment and form'
  },
  {
    id: 'reclined_twist',
    name: 'Reclining Torso Twist',
    artDeclaration: ART_DECLARATIONS.vogueItalia,
    wardrobe: `${AVANT_GARDE_WARDROBE.bronze}, architectural design catching warm light, paired with bronze mesh bralette`,
    pose: `lying on back on velvet surface with torso twisted, hips flat but shoulders turned toward camera, one arm extended above head, other across body, legs bent with knees together falling to one side, creating dynamic spiral composition showing multiple angles of the garment`,
    environment: `rich burgundy velvet chamber, brass candelabras creating warm amber pools of light, burgundy silk drapery, gold accent pillows`,
    lighting: `warm directional candlelight emphasizing the twist and curves, shadows defining muscle tone and form`,
    focus: 'twisted torso showing garment from multiple angles'
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // FLOOR POSES SERIES
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'floor_prone_curves',
    name: 'Floor Prone Curves',
    artDeclaration: ART_DECLARATIONS.tate,
    wardrobe: `${AVANT_GARDE_WARDROBE.base}, high-cut design visible from behind, tension straps at hip line`,
    pose: `lying prone on plush fur throw, weight on forearms lifting upper body, chin resting on hands, dramatic back arch with glutes elevated, legs bent with feet crossed at ankles pointing upward, looking forward with playful knowing expression`,
    environment: `intimate floor setting on luxurious cream fur throw, brass floor candelabras with pillar candles surrounding, warm wooden floor visible at edges, grey textured walls`,
    lighting: `warm side lighting from candles creating highlights along spine and glutes, soft ambient glow throughout`,
    focus: 'prone floor pose emphasizing back curves'
  },
  {
    id: 'floor_stretch_extended',
    name: 'Floor Extended Stretch',
    artDeclaration: ART_DECLARATIONS.gagosian,
    wardrobe: `${AVANT_GARDE_WARDROBE.rose}, bifurcated open-front design visible, paired with matching rose bandeau`,
    pose: `lying on fur throw with full body stretch, both arms extended above head creating long line, spine arched lifting torso, one leg extended straight, other bent with knee pointing upward, toes pointed, head tilted back in transcendent expression, entire body creating elegant elongated composition`,
    environment: `warm intimate chamber with golden walls, brass candelabras arranged around perimeter, plush cream fur throw creating soft surface, rose gold silk accents`,
    lighting: `warm enveloping candlelight, golden glow tracing full body length, soft shadows defining every curve`,
    focus: 'full body stretch showing complete form'
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // CREATIVE SENSUOUS ARTISTRY
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'artistic_shadow_play',
    name: 'Shadow Play Artistry',
    artDeclaration: ART_DECLARATIONS.christies,
    wardrobe: `${AVANT_GARDE_WARDROBE.base}, mesh catching light while shadows play through the bifurcated design`,
    pose: `seated on floor with one leg extended, other knee drawn up, torso leaning back with arms behind for support, head tilted catching dramatic side light, shadows from candle flames dancing across skin and mesh fabric creating artistic pattern`,
    environment: `dramatic chamber with charcoal walls, large brass candelabras with flickering flames casting dancing shadows, black velvet floor cushions, silver silk accents`,
    lighting: `single dramatic candlelight source creating bold shadow play, flames flickering to create moving shadow patterns on skin and walls`,
    focus: 'artistic shadow interplay with form'
  },
  {
    id: 'sensuous_embrace',
    name: 'Self-Embrace Intimacy',
    artDeclaration: ART_DECLARATIONS.aperture,
    wardrobe: `${AVANT_GARDE_WARDROBE.champagne}, elegant design visible in vulnerable pose, paired with minimal champagne bandeau`,
    pose: `seated with knees drawn up to chest, arms wrapped around legs in intimate self-embrace, chin resting on one knee with soft vulnerable sideways gaze, body creating compact yet elegant composition, the garment design visible at hip line`,
    environment: `warm intimate corner with honey-gold walls, brass candelabra with three candles nearby, champagne silk throw draped around, cream fur beneath`,
    lighting: `soft warm candlelight creating intimate cocoon of golden light, gentle shadows, vulnerable yet confident atmosphere`,
    focus: 'intimate self-embrace pose'
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
// ADAPTIVE FAILOVER VARIANTS (Used when primary fails)
// ═══════════════════════════════════════════════════════════════════════════════

const FAILOVER_VARIANTS = {
  decolletage_candlelit_portrait: {
    wardrobe: `elegant champagne silk chemise with delicate lace trim at neckline, thin straps, flowing fabric catching golden candlelight`,
    pose: `three-quarter portrait, soft natural pose with hand near collarbone, warm expression`
  },
  hip_curves_standing: {
    wardrobe: `bronze metallic mesh wrap skirt with chain detail at hips, architectural draping, paired with matching bandeau top`,
    pose: `standing three-quarter view, natural stance showing curves, confident expression`
  },
  kneeling_worship_pose: {
    wardrobe: `delicate rose gold beaded bodychain creating elegant patterns, minimal artistic coverage with crystal accents`,
    pose: `kneeling contemplative pose on fur throw, serene artistic expression`
  },
  reclined_venus_pose: {
    wardrobe: `flowing champagne silk slip with gold lace trim, romantic ethereal aesthetic`,
    pose: `reclining on velvet with elegant natural pose, soft intimate expression`
  },
  floor_prone_curves: {
    wardrobe: `architectural black mesh bodysuit with strategic coverage panels, form-fitting elegant design`,
    pose: `prone on fur throw with natural back arch, relaxed artistic pose`
  }
};

// ═══════════════════════════════════════════════════════════════════════════════
// GOD-MODE ADAPTIVE GENERATION ENGINE
// ═══════════════════════════════════════════════════════════════════════════════

async function getOAuthToken() {
  const response = await fetch(`${PROXY_URL}/api/gcloud-token`);
  const data = await response.json();
  if (data.success && data.token) return data.token;
  throw new Error('Failed to get OAuth token');
}

async function generateImage(prompt, token) {
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
    return Buffer.from(prediction.bytesBase64Encoded, 'base64');
  }

  if (prediction?.raiFilteredReason) {
    throw new Error(`Filtered: ${prediction.raiFilteredReason}`);
  }

  throw new Error('Filtered: No image data returned');
}

function buildMasterPrompt(variant, useFailover = false) {
  const wardrobe = useFailover && FAILOVER_VARIANTS[variant.id]
    ? FAILOVER_VARIANTS[variant.id].wardrobe
    : variant.wardrobe;
  const pose = useFailover && FAILOVER_VARIANTS[variant.id]
    ? FAILOVER_VARIANTS[variant.id].pose
    : variant.pose;

  return `${variant.artDeclaration}

Professional fashion photography, museum-quality masterpiece, Canon EOS R5 with 85mm f/1.4 lens, award-winning editorial standard,

Subject: ${MEERA_SUBJECT},

Designer Wardrobe: ${wardrobe},

Pose and Expression: ${pose},

Environment: ${variant.environment},

Lighting: ${variant.lighting},

Technical Excellence: Ultra-realistic 8K resolution photograph with authentic skin texture showing natural pores, subtle highlights, and warm undertones. Professional retouching maintaining natural beauty. Shallow depth of field f/1.4 with cinematic bokeh. Focus: ${variant.focus}. Magazine-quality finish suitable for Vogue or Harper's Bazaar publication.`;
}

function log(msg) {
  console.log(`[${new Date().toLocaleTimeString()}] ${msg}`);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
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
║   ✨ CANDLELIT EXTENDED - AVANT-GARDE INTIMACY COLLECTION ✨                 ║
║                                                                              ║
║   12 Exclusive Variants • Bifurcated Avant-Garde Design                      ║
║   God-Mode Adaptive Engine with Auto-Failover                                ║
║                                                                              ║
║   Decolletage Details • Hips & Glutes Focus • Kneeling Curves                ║
║   Reclining Intimacy • Floor Poses • Creative Artistry                       ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
  `);

  log('Authenticating with Vertex AI...');
  let token = await getOAuthToken();
  log('✅ OAuth token obtained\\n');

  const results = { successful: [], failed: [], retried: [] };
  let consecutiveFailures = 0;

  for (let i = 0; i < EXCLUSIVE_VARIANTS.length; i++) {
    const variant = EXCLUSIVE_VARIANTS[i];

    // Refresh token every 3 images
    if (i > 0 && i % 3 === 0) {
      log('🔄 Refreshing OAuth token...');
      token = await getOAuthToken();
    }

    console.log('══════════════════════════════════════════════════════════════════════════════');
    log(`✨ [${i + 1}/${EXCLUSIVE_VARIANTS.length}] ${variant.name}`);
    log(`   Focus: ${variant.focus}`);

    let success = false;
    let attempts = 0;
    const maxAttempts = 3;

    while (!success && attempts < maxAttempts) {
      attempts++;
      const useFailover = attempts > 1 && FAILOVER_VARIANTS[variant.id];

      if (attempts > 1) {
        log(`   🔄 Attempt ${attempts}/${maxAttempts}${useFailover ? ' (failover wardrobe)' : ''}...`);
      }

      const prompt = buildMasterPrompt(variant, useFailover);
      const filename = `meera_ext_${variant.id}${useFailover ? '_alt' : ''}_${Date.now()}.png`;
      const filepath = path.join(OUTPUT_DIR, filename);

      try {
        const buffer = await generateImage(prompt, token);
        fs.writeFileSync(filepath, buffer);
        const sizeMB = (buffer.length / (1024 * 1024)).toFixed(2);

        log(`   ✅ MASTERWORK: ${filename} (${sizeMB} MB)`);
        results.successful.push({
          ...variant,
          filename,
          sizeMB,
          attempts,
          usedFailover: useFailover
        });

        if (useFailover) {
          results.retried.push(variant.name);
        }

        success = true;
        consecutiveFailures = 0;

      } catch (error) {
        log(`   ❌ Attempt ${attempts} failed: ${error.message.slice(0, 60)}`);

        if (attempts < maxAttempts) {
          const waitTime = error.message.includes('429') ? 90 : 45;
          log(`   ⏳ Waiting ${waitTime}s before retry...`);
          await sleep(waitTime * 1000);

          // Refresh token on retry
          token = await getOAuthToken();
        } else {
          results.failed.push({ ...variant, error: error.message });
          consecutiveFailures++;
        }
      }
    }

    // Adaptive delay between variants
    if (i < EXCLUSIVE_VARIANTS.length - 1) {
      const baseDelay = success ? 25000 : 45000;
      const adaptiveDelay = baseDelay + (consecutiveFailures * 10000);
      log(`   ⏳ Next in ${adaptiveDelay / 1000}s...`);
      await sleep(adaptiveDelay);
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // FINAL REPORT
  // ═══════════════════════════════════════════════════════════════════════════

  const successRate = ((results.successful.length / EXCLUSIVE_VARIANTS.length) * 100).toFixed(1);

  console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║        MEERA CANDLELIT EXTENDED - AVANT-GARDE COLLECTION COMPLETE            ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝

  ✅ Masterworks Created: ${results.successful.length}/${EXCLUSIVE_VARIANTS.length}
  🔄 Recovered via Failover: ${results.retried.length}
  ❌ Failed: ${results.failed.length}
  📊 Success Rate: ${successRate}%

  SUCCESSFUL VARIANTS:
${results.successful.map(v => `     📸 ${v.name} (${v.sizeMB} MB)${v.usedFailover ? ' [alt wardrobe]' : ''}`).join('\n')}
${results.failed.length > 0 ? `
  FAILED:
${results.failed.map(v => `     ❌ ${v.name}: ${v.error.slice(0, 50)}`).join('\n')}
` : ''}
  Output Directory: ${OUTPUT_DIR}
══════════════════════════════════════════════════════════════════════════════
`);

  // Save manifest
  const manifest = {
    timestamp: new Date().toISOString(),
    subject: 'Meera - Elite Indian Glamour Muse',
    collection: 'Candlelit Extended - Avant-Garde Intimacy',
    theme: 'Bifurcated open-front design with tension straps',
    variants: EXCLUSIVE_VARIANTS.length,
    successful: results.successful,
    failed: results.failed,
    retried: results.retried,
    successRate: successRate + '%'
  };

  fs.writeFileSync(path.join(OUTPUT_DIR, 'manifest.json'), JSON.stringify(manifest, null, 2));
  log('📋 Manifest saved\\n');
}

main().catch(console.error);
