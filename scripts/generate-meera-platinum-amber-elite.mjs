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
 * ║   PLATINUM CHAINMAIL × AMBER INTIMATE - SUPER ELITE COLLECTION              ║
 * ║                                                                              ║
 * ║   Based on: meera_platinum_chaise_twist_13 (Masterwork Reference)           ║
 * ║   Mood: Amber Intimate • Recline Closeups • Sensual Framing                 ║
 * ║   Standard: Private Super-Exclusive Elite Collection                         ║
 * ║                                                                              ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

import fs from 'fs';
import path from 'path';

const OUTPUT_DIR = '/home/ecolex/version1/generated-meera-platinum-amber-elite';
const PROJECT_ID = 'zaranovel';
const LOCATION = 'us-central1';
const PROXY_URL = 'http://localhost:3001';

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// ═══════════════════════════════════════════════════════════════════════════════
// MEERA - ELITE INDIAN GLAMOUR MUSE (Exact Form Reference)
// ═══════════════════════════════════════════════════════════════════════════════

const MEERA_ELITE = `Elite Indian fit glamour model Meera, height 5'9", transcendent full-body glamour presence with perfect fit hourglass figure, warm caramel complexion with golden amber highlights catching intimate light, striking magnetic dark eyes with intense sultry gaze, full sensual lips slightly parted, sleek black hair elegantly styled, magnificent confident presence radiating elite sophistication, authentic natural skin texture with warm luminosity and subtle golden undertones, age 26-30`;

// ═══════════════════════════════════════════════════════════════════════════════
// SIGNATURE WARDROBE - Platinum Chainmail (Exact Reference Match)
// ═══════════════════════════════════════════════════════════════════════════════

const PLATINUM_CHAINMAIL_WARDROBE = `platinum silver chainmail micro bikini set with crystal fringe accents, cool silver interlocking metal rings catching warm amber light creating liquid mercury shimmer, minimal triangle coverage with delicate chain straps, crystal drops cascading from edges creating sparkle movement, thin chains connecting top and bottom pieces across torso, metal warming against caramel skin`;

// ═══════════════════════════════════════════════════════════════════════════════
// AMBER INTIMATE ENVIRONMENT
// ═══════════════════════════════════════════════════════════════════════════════

const AMBER_ENVIRONMENT = `luxurious private amber-toned boudoir chamber with warm honey-gold walls, ornate brass candelabras with flickering amber pillar candles casting dancing golden light, rich caramel velvet chaise lounge with silk cushions, golden silk drapery catching warm light, plush cream sheepskin throws, intimate candlelit atmosphere with warm amber glow throughout`;

const AMBER_LIGHTING = `warm amber candlelight creating intimate golden atmosphere, low-angle honey-gold key light from multiple candelabras emphasizing form with Renaissance warmth, soft amber fill light maintaining sensual detail in shadows, golden rim light creating divine outline against warm background, Titian master warmth with chiaroscuro depth`;

// ═══════════════════════════════════════════════════════════════════════════════
// SUPER ELITE VARIANTS - 12 MASTERCLASS POSES
// ═══════════════════════════════════════════════════════════════════════════════

const ELITE_VARIANTS = [
  // ─────────────────────────────────────────────────────────────────────────────
  // RECLINE SERIES - Intimate Closeup Details
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'amber_recline_intimate',
    name: 'Amber Recline Intimate',
    pose: `fully reclined on caramel velvet chaise with body in languid sensual flow, spine gently arched lifting chest toward warm light, one arm extended above head with fingers in flowing hair, other hand resting on hip accentuating waist-to-hip curve, one leg extended showcasing full length, other knee bent falling open in intimate composition, head tilted back on silk cushion with sultry half-lidded gaze, lips parted in sensual expression`,
    framing: `intimate medium-close framing from elevated angle, capturing torso and face with shallow depth of field, chainmail detail sharp against soft amber bokeh background`,
    mood: `private intimate moment of complete sensual surrender, elite sophistication with vulnerable beauty`
  },
  {
    id: 'amber_recline_profile',
    name: 'Amber Recline Profile',
    pose: `lying on side on velvet chaise in elegant profile view, body creating flowing S-curve from shoulders through waist to hips, head propped on hand with elbow on cushion, other arm draped along body following curves, top leg slightly forward revealing hip line, direct sideways gaze with knowing confident expression`,
    framing: `profile full-body framing capturing complete silhouette against amber candlelight, rim lighting defining every curve`,
    mood: `commanding elegance with intimate accessibility, elite private collection standard`
  },
  {
    id: 'amber_recline_overhead',
    name: 'Amber Overhead View',
    pose: `lying back on silk sheets with arms extended above head creating long elegant line, fingers interlaced in hair, spine arched with chest lifted, legs positioned with one extended and one knee bent outward, head turned toward camera with intense magnetic gaze, complete body flow from fingertips to toes`,
    framing: `elevated overhead angle capturing full form against amber silk, chainmail catching light across entire body`,
    mood: `transcendent goddess energy with complete artistic revelation, museum-caliber intimacy`
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // CLOSEUP DETAIL SERIES - Sensual Framing
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'amber_torso_detail',
    name: 'Amber Torso Closeup',
    pose: `seated recline position with torso as focal point, slight twist showing both front curves and side profile, one hand at collarbone near chainmail strap, other hand at hip where chain connects, chin lifted with confident expression, breathing naturally with subtle chest movement`,
    framing: `intimate torso closeup from chest to hips, chainmail detail crystal-sharp, warm amber light caressing every curve and metal link`,
    mood: `hyper-detailed intimate study of form and adornment, elite collector standard`
  },
  {
    id: 'amber_face_shoulders',
    name: 'Amber Portrait Intimate',
    pose: `reclined with shoulders and face in frame, one shoulder lifted creating elegant line, chainmail straps visible on shoulders, hands framing face or in hair, head tilted with sultry direct gaze, lips slightly parted, neck elongated showing elegant column`,
    framing: `intimate portrait from shoulders to above head, shallow depth of field with face sharp and background in warm amber blur`,
    mood: `magnetic intimate connection, elite private portrait standard`
  },
  {
    id: 'amber_hip_curve_detail',
    name: 'Amber Hip Curve Study',
    pose: `lying on side with hip curve as focal point, dramatic waist-to-hip ratio emphasized, chainmail bottom piece catching amber light, one hand resting on hip, torso twisted showing back arch, face visible looking over shoulder`,
    framing: `artistic hip and waist closeup study, chainmail detail visible, amber light sculpting curves with Renaissance chiaroscuro`,
    mood: `sculptural form celebration, Khajuraho artistic tradition with modern elite aesthetic`
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // ARTISTIC POSE SERIES - Varying Reveals
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'amber_serpentine_flow',
    name: 'Amber Serpentine Flow',
    pose: `lying on amber silk with serpentine S-curve body line, torso twisted to show both profile and front, one arm trailing above head, other hand at waist where chains meet, legs creating elegant flowing curve with one extended and one bent, head turned toward camera with intense gaze`,
    framing: `full body artistic framing capturing complete serpentine flow, chainmail catching light at multiple points`,
    mood: `fluid artistic movement frozen in amber light, elite choreographed intimacy`
  },
  {
    id: 'amber_venus_pose',
    name: 'Amber Venus Classic',
    pose: `classic Venus recline on velvet with one arm supporting upper body, other arm gracefully positioned at hip, legs arranged in elegant classical composition with one knee raised, head tilted with serene confident expression, body in three-quarter view`,
    framing: `classical full-body composition with Renaissance proportions, amber candlelight creating museum-worthy lighting`,
    mood: `timeless classical beauty with modern elite sensibility, Titian masterwork standard`
  },
  {
    id: 'amber_arch_surrender',
    name: 'Amber Arch Surrender',
    pose: `lying back with dramatic spine arch lifting torso toward amber light, arms extended above head or gripping silk sheets, head tilted back with eyes closed in transcendent expression, legs extended with pointed toes, complete body tension creating dramatic form`,
    framing: `side-angle capturing dramatic arch, chainmail catching light along entire torso curve`,
    mood: `transcendent surrender to artistic moment, private collection climax piece`
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // MAX-MODE REACH SERIES - Elite Standards
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'amber_seated_intimate',
    name: 'Amber Seated Intimate',
    pose: `seated on velvet chaise edge with one leg extended to floor, other knee drawn up creating open intimate composition, torso leaning slightly back with arms supporting behind, chest lifted toward warm light, direct magnetic gaze with confident vulnerability`,
    framing: `three-quarter seated composition capturing complete form with intimate accessibility`,
    mood: `approachable elite intimacy, private moment shared with trusted viewer`
  },
  {
    id: 'amber_kneeling_goddess',
    name: 'Amber Kneeling Goddess',
    pose: `kneeling on sheepskin with knees apart, sitting back slightly on heels, spine elongated with chest lifted, hands resting on inner thighs, head tilted with confident direct gaze, chainmail catching amber light across entire form`,
    framing: `frontal kneeling composition with intimate accessibility, warm amber enveloping form`,
    mood: `goddess worship energy with intimate invitation, super-exclusive elite standard`
  },
  {
    id: 'amber_floor_stretch',
    name: 'Amber Floor Stretch',
    pose: `lying on sheepskin with full body stretch, both arms extended above head creating long elegant line, spine arched naturally, legs together and extended with pointed toes, head turned to side with peaceful sensual expression`,
    framing: `full body floor composition capturing complete stretched form, chainmail creating continuous line of light`,
    mood: `complete vulnerable beauty in private sanctuary, masterclass collection finale`
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
// ART DIRECTOR DECLARATION
// ═══════════════════════════════════════════════════════════════════════════════

const ART_DECLARATION = `Art Director Declaration: Creating super-exclusive elite private collection masterwork in the tradition of Renaissance master intimate portraiture, Cannes Film Festival Palme d'Or winning cinematography, and UNESCO World Heritage celebration of divine feminine form. Museum-caliber sophistication with authentic realistic tones and hyper-detailed masterclass photography standards.`;

// ═══════════════════════════════════════════════════════════════════════════════
// GENERATION ENGINE
// ═══════════════════════════════════════════════════════════════════════════════

async function getOAuthToken() {
  const response = await fetch(`${PROXY_URL}/api/gcloud-token`);
  const data = await response.json();
  if (data.success && data.token) return data.token;
  throw new Error('Failed to get OAuth token');
}

async function generateImage(prompt, outputPath, token) {
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

function buildElitePrompt(variant) {
  return `${ART_DECLARATION}

Masterclass fine art boudoir photography, super-exclusive private collection standard, Canon EOS R5 with 85mm f/1.4 lens capturing hyper-realistic detail,

Subject: ${MEERA_ELITE},

Signature Wardrobe: ${PLATINUM_CHAINMAIL_WARDROBE},

Elite Pose: ${variant.pose},

Sensual Framing: ${variant.framing},

Amber Intimate Environment: ${AMBER_ENVIRONMENT},

Master Lighting: ${AMBER_LIGHTING},

Artistic Mood: ${variant.mood},

ULTIMATE 8K resolution with hyper-realistic authentic skin texture showing natural pores and subtle variations, detailed chainmail with individual metal links visible, realistic fabric physics on silk and velvet, professional masterclass color grading with warm amber tones, shallow DOF f/1.4 with cinematic bokeh, museum-caliber finish with zero artificial enhancement, celebrating natural divine feminine perfection as sacred intimate art.`;
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
║   ✨ PLATINUM CHAINMAIL × AMBER INTIMATE ✨                                  ║
║                                                                              ║
║   Super-Exclusive Elite Private Collection                                    ║
║   12 Masterclass Poses • Recline Closeups • Sensual Framing                  ║
║                                                                              ║
║   Reference: meera_platinum_chaise_twist_13 (Exact Wardrobe Match)           ║
║   Mood: Amber Intimate • Realistic Tones • Max-Mode Reach                    ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
  `);

  log('Authenticating with Vertex AI...');
  let token = await getOAuthToken();
  log('✅ OAuth token obtained\\n');

  const results = { successful: [], failed: [] };
  let consecutiveFailures = 0;

  for (let i = 0; i < ELITE_VARIANTS.length; i++) {
    const variant = ELITE_VARIANTS[i];

    // Refresh token every 4 images
    if (i > 0 && i % 4 === 0) {
      log('🔄 Refreshing OAuth token...');
      token = await getOAuthToken();
    }

    console.log('══════════════════════════════════════════════════════════════════════════════');
    log(`✨ [${i + 1}/${ELITE_VARIANTS.length}] ${variant.name}`);
    log(`   Framing: ${variant.framing.slice(0, 50)}...`);

    const prompt = buildElitePrompt(variant);
    const filename = `meera_platinum_amber_${variant.id}_${i}_${Date.now()}.png`;
    const filepath = path.join(OUTPUT_DIR, filename);

    try {
      const result = await generateImage(prompt, filepath, token);
      const sizeMB = (result.size / (1024 * 1024)).toFixed(2);
      log(`   ✅ ELITE MASTERWORK: ${filename} (${sizeMB} MB)`);
      results.successful.push({ ...variant, filename, sizeMB });
      consecutiveFailures = 0;
    } catch (error) {
      log(`   ❌ Failed: ${error.message}`);
      results.failed.push({ ...variant, error: error.message });
      consecutiveFailures++;

      if (error.message.includes('Filtered')) {
        const waitTime = Math.min(90 + (consecutiveFailures * 30), 180);
        log(`   ⏳ Adaptive wait: ${waitTime}s`);
        await new Promise(r => setTimeout(r, waitTime * 1000));
      } else if (error.message.includes('429')) {
        log(`   ⏳ Rate limited, waiting 120s...`);
        await new Promise(r => setTimeout(r, 120000));
      }
    }

    const delay = 25000 + (consecutiveFailures * 5000);
    log(`   ⏳ Next in ${delay / 1000}s...`);
    await new Promise(r => setTimeout(r, delay));
  }

  console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║        PLATINUM × AMBER ELITE COLLECTION COMPLETE                            ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝

  ✅ Elite Masterworks: ${results.successful.length}
  ❌ Failed: ${results.failed.length}
  📊 Success Rate: ${((results.successful.length / ELITE_VARIANTS.length) * 100).toFixed(1)}%

  SUCCESSFUL VARIANTS:
${results.successful.map(v => `     📸 ${v.name} (${v.sizeMB} MB)`).join('\\n')}

  Output: ${OUTPUT_DIR}
══════════════════════════════════════════════════════════════════════════════
`);

  const manifest = {
    timestamp: new Date().toISOString(),
    collection: 'Platinum Chainmail × Amber Intimate Elite',
    subject: 'Meera',
    reference: 'meera_platinum_chaise_twist_13_1768158499783.png',
    variants: ELITE_VARIANTS.length,
    successful: results.successful,
    failed: results.failed,
    successRate: ((results.successful.length / ELITE_VARIANTS.length) * 100).toFixed(1) + '%'
  };

  fs.writeFileSync(path.join(OUTPUT_DIR, 'manifest.json'), JSON.stringify(manifest, null, 2));
  log('📋 Manifest saved\\n');
}

main().catch(console.error);
