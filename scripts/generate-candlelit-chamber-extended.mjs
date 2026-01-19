#!/usr/bin/env node

/**
 * CANDLELIT CHAMBER EXTENDED - More Intimate Variants
 * Based on new reference images with grey walls, candelabras, silver silk
 */

import fs from 'fs';
import path from 'path';

const OUTPUT_DIR = '/home/ecolex/version1/generated-candlelit-chamber-extended';
const PROJECT_ID = 'zaranovel';
const LOCATION = 'us-central1';
const PROXY_URL = 'http://localhost:3001';

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const INDIAN_MUSE = `Stunning Indian woman with striking angular features and captivating intense gaze, sun-kissed bronze skin with golden undertones and visible natural texture, dramatic statuesque high fashion model physique, tall 5'8" frame with graceful elongated limbs, sleek black hair pulled back in sophisticated low bun, strong defined cheekbones and jawline, full natural lips, dark expressive almond eyes, elegant neck and visible collarbones, natural matte skin finish with authentic texture, age 24-28`;

// Extended candlelit variants
const VARIANTS = [
  // SILVER CHAMBER SERIES - matching reference 1
  {
    id: 'silver_chamber_worship',
    name: 'Silver Chamber Worship',
    wardrobe: `delicate champagne gold beaded bodychain with intricate geometric pattern, thin beaded straps creating web-like design across torso, minimal strategic coverage with beaded cups, high-cut design with chain accents, crystals catching candlelight`,
    pose: `kneeling on plush cream fur throw, sitting back on heels, head tilted upward with eyes closed in serene expression, arms resting on thighs, spine elongated, contemplative goddess energy`,
    environment: `luxurious private chamber with textured grey plaster walls, ornate brass candelabras with flickering white candles, silver-grey silk drapery flowing from ceiling, plush grey velvet chaise in background, cream fur throw on floor, warm golden candlelight throughout`,
    lighting: `warm golden candlelight from multiple candelabras, flickering flames creating dancing highlights on beaded bodychain and skin, deep shadows, intimate romantic atmosphere`
  },
  {
    id: 'silver_chamber_recline',
    name: 'Silver Chamber Recline',
    wardrobe: `sheer champagne mesh bodysuit with delicate gold embroidery, thin spaghetti straps, plunging neckline, high-cut silhouette, fabric catching warm light like second skin`,
    pose: `reclining on side on plush fur throw, head propped on hand, other arm draped along body curve, legs slightly overlapping, body creating flowing S-curve, intimate direct eye contact`,
    environment: `luxurious private chamber with textured grey plaster walls, ornate brass candelabras with flickering white candles, silver-grey silk drapery, grey velvet chaise, cream fur throw, golden candlelight`,
    lighting: `warm candlelight creating golden highlights on champagne mesh, soft shadows defining curves, intimate atmosphere`
  },
  {
    id: 'silver_chamber_seated',
    name: 'Silver Chamber Seated',
    wardrobe: `bronze metallic chainmail bikini set, fine interlocking metal rings in warm copper-bronze tone, thin chain straps, minimal triangle coverage, metal catching warm candlelight`,
    pose: `seated on fur throw with knees drawn up to chest, arms wrapped around legs in self-embrace, chin resting on knee, contemplative sideways gaze, vulnerable introspective mood`,
    environment: `luxurious private chamber with grey textured walls, brass candelabras with white candles, silver silk drapery, grey velvet furniture, cream sheepskin rug`,
    lighting: `multiple candlelight sources creating warm ambient glow, subtle shadows, golden highlights on metallic bikini`
  },

  // INDUSTRIAL GLAMOUR SERIES - matching reference 2
  {
    id: 'industrial_glamour_embrace',
    name: 'Industrial Glamour Embrace',
    wardrobe: `flowing champagne gold sequined cape draped over minimal nude mesh bodysuit, sequins catching light, ethereal draping revealing legs, luxurious fabric pooling on floor`,
    pose: `seated on large fur throw with legs extended to side, arms wrapped around legs, head tilted with contemplative gaze, hair flowing over shoulder`,
    environment: `modern industrial loft with exposed metal pipes and beams, large brown fur throw on polished wooden floor, vintage industrial floor lamp with warm edison bulbs, raw concrete walls, intimate urban luxury`,
    lighting: `warm side lighting from vintage industrial lamp, golden glow on sequined cape, dramatic shadows on industrial elements`
  },
  {
    id: 'industrial_glamour_stretch',
    name: 'Industrial Glamour Stretch',
    wardrobe: `sheer nude mesh slip dress with gold lace trim, barely-there fabric, thin straps, thigh-length with side slit, minimal coverage`,
    pose: `lying on fur throw with one leg extended, other knee bent, arms positioned above head in languid stretch, torso slightly arched, head turned toward camera`,
    environment: `industrial loft with metal clothing rack visible, large fur throw on wooden floor, vintage lamp providing warm light, exposed pipes and industrial elements`,
    lighting: `warm directional light from floor lamp, creating dramatic chiaroscuro, golden highlights on skin`
  },

  // CANDLELIT VELVET SERIES - luxury upgrade
  {
    id: 'velvet_candlelit_kneeling',
    name: 'Velvet Candlelit Kneeling',
    wardrobe: `rose gold metallic lace bodysuit with baroque patterns, shimmering threads catching candlelight, long sleeves with scalloped edges, plunging neckline`,
    pose: `kneeling on velvet cushion on floor, sitting back on heels, hands resting on thighs, spine elongated, direct intense gaze at camera, commanding presence`,
    environment: `opulent candlelit chamber with deep burgundy velvet walls, multiple brass candelabras with white tapers, gold-framed mirror reflecting candlelight, burgundy velvet floor cushions, cream fur accents`,
    lighting: `warm candlelight from ornate candelabras, golden glow on rose gold lace, deep shadows on velvet walls`
  },
  {
    id: 'velvet_candlelit_prone',
    name: 'Velvet Candlelit Prone',
    wardrobe: `champagne silk chemise with delicate lace trim, thin straps, flowing fabric, mid-thigh length, romantic ethereal aesthetic`,
    pose: `lying prone on plush fur throw, weight on forearms, upper body lifted, chin resting on hands, legs bent with feet raised, direct forward gaze`,
    environment: `candlelit chamber with burgundy velvet walls, brass candle holders, gold-framed artwork, velvet and fur textures, warm amber lighting`,
    lighting: `candlelight creating warm glow, soft shadows, golden highlights on silk chemise`
  },

  // NOIR LUXURY SERIES - darker aesthetic
  {
    id: 'noir_chamber_worship',
    name: 'Noir Chamber Worship',
    wardrobe: `black sheer mesh bodysuit with strategic opaque panels, geometric cutouts, long sleeves, high neck with keyhole opening, form-fitting silhouette`,
    pose: `kneeling on black fur throw, sitting back on heels, head tilted upward with eyes closed, arms at sides, surrendered pose`,
    environment: `dark luxurious chamber with charcoal black walls, matte black candelabras with black candles, black silk drapery, black fur throw, silver accents`,
    lighting: `single dramatic candlelight source, deep shadows, rim lighting on curves, noir cinematic mood`
  },
  {
    id: 'noir_chamber_recline',
    name: 'Noir Chamber Recline',
    wardrobe: `black lace teddy with floral patterns, thin straps, deep V neckline, high-cut silhouette, sheer fabric revealing skin beneath`,
    pose: `reclining back on black fur throw supported by hands behind, head tilted back, legs extended, torso arched gracefully`,
    environment: `dark chamber with black walls, matte candelabras, black velvet chaise, dark fur throw, silver mirror accents`,
    lighting: `dramatic single source candlelight, chiaroscuro contrast, silver rim highlights`
  },

  // WARM AMBER SERIES - golden warmth
  {
    id: 'amber_glow_embrace',
    name: 'Amber Glow Embrace',
    wardrobe: `copper mesh bodychain with amber crystal accents, delicate chains creating web pattern, warm metallic tones matching skin`,
    pose: `seated on amber velvet cushion with knees drawn up, arms wrapped around legs, head resting on knees, warm vulnerable expression`,
    environment: `warm amber-toned chamber with honey-gold walls, brass candelabras with amber glass votives, golden silk drapery, caramel fur throw`,
    lighting: `warm amber candlelight throughout, golden glow on copper mesh, soft inviting atmosphere`
  },
  {
    id: 'amber_glow_floor',
    name: 'Amber Glow Floor Stretch',
    wardrobe: `gold metallic mesh slip, whisper-thin fabric in warm gold tone, barely visible against bronze skin, thin straps, thigh-length`,
    pose: `lying on fur throw with serpentine body line, one arm above head, other trailing along body, legs creating elegant curve`,
    environment: `amber-toned chamber with golden walls, brass candle holders with pillar candles, gold silk curtains, caramel sheepskin rug`,
    lighting: `multiple amber candlelight sources, warm golden highlights, soft diffused shadows`
  },

  // PLATINUM ELEGANCE - cool luxury
  {
    id: 'platinum_chamber_twist',
    name: 'Platinum Chamber Twist',
    wardrobe: `silver metallic mesh bodysuit with crystalline accents, cool platinum shimmer, thin straps, plunging back`,
    pose: `seated on fur with legs to one side, torso twisted toward camera, one hand on floor, looking over shoulder with sultry gaze`,
    environment: `cool platinum-toned chamber with silver-grey walls, silver candelabras with white candles, platinum silk drapery, white fur throw`,
    lighting: `cool white candlelight with silver undertones, elegant highlights on metallic mesh`
  }
];

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

  throw new Error('No image data');
}

function buildPrompt(v) {
  return `Award-winning fine art boudoir photography by Helmut Newton and Peter Lindbergh, museum-quality masterpiece, Canon EOS R5 with 85mm f/1.4,

${INDIAN_MUSE},

wearing ${v.wardrobe},

${v.pose},

in ${v.environment},

${v.lighting},

intimate private artistic exploration, premium 10+ sensuality with tasteful artistic framing, hyper-detailed with authentic skin texture visible pores, photo-realistic fabric physics, professional color grading with cinematic warmth, shallow DOF f/1.4, 8K resolution`;
}

async function main() {
  console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║         ✨ CANDLELIT CHAMBER EXTENDED - 12 INTIMATE VARIANTS ✨              ║
║                                                                              ║
║    Silver Chamber • Industrial Glamour • Velvet Candlelit                   ║
║    Noir Luxury • Amber Glow • Platinum Elegance                             ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
  `);

  console.log(`[${new Date().toLocaleTimeString()}] Authenticating...`);
  let token = await getOAuthToken();
  console.log(`[${new Date().toLocaleTimeString()}] ✅ OAuth token obtained\n`);

  const results = { successful: [], failed: [] };

  for (let i = 0; i < VARIANTS.length; i++) {
    const v = VARIANTS[i];

    if (i > 0 && i % 4 === 0) {
      console.log(`[${new Date().toLocaleTimeString()}] 🔄 Refreshing OAuth token...`);
      token = await getOAuthToken();
    }

    console.log('──────────────────────────────────────────────────────────────────────────────');
    console.log(`[${new Date().toLocaleTimeString()}] ✨ [${i + 1}/${VARIANTS.length}] ${v.name}`);

    const prompt = buildPrompt(v);
    const filename = `candlelit_${v.id}_${i}_${Date.now()}.png`;
    const filepath = path.join(OUTPUT_DIR, filename);

    try {
      const result = await generateImage(prompt, filepath, token);
      const sizeMB = (result.size / (1024 * 1024)).toFixed(2);
      console.log(`[${new Date().toLocaleTimeString()}]    ✅ Saved: ${filename} (${sizeMB} MB)`);
      results.successful.push({ ...v, filename, sizeMB });
    } catch (error) {
      console.log(`[${new Date().toLocaleTimeString()}]    ❌ Failed: ${error.message}`);
      results.failed.push({ ...v, error: error.message });
      if (error.message.includes('Filtered') || error.message.includes('429')) {
        console.log(`[${new Date().toLocaleTimeString()}]    ⏳ Waiting 90s...`);
        await new Promise(r => setTimeout(r, 90000));
      }
    }

    console.log(`[${new Date().toLocaleTimeString()}]    ⏳ Waiting 25s...`);
    await new Promise(r => setTimeout(r, 25000));
  }

  console.log('\n══════════════════════════════════════════════════════════════════════════════');
  console.log('              CANDLELIT CHAMBER EXTENDED COMPLETE');
  console.log('══════════════════════════════════════════════════════════════════════════════\n');
  console.log(`  ✅ Successful: ${results.successful.length}`);
  console.log(`  ❌ Failed: ${results.failed.length}\n`);
  console.log(`  Output: ${OUTPUT_DIR}`);

  fs.writeFileSync(path.join(OUTPUT_DIR, 'manifest.json'), JSON.stringify(results, null, 2));
  console.log(`[${new Date().toLocaleTimeString()}] 📋 Manifest saved\n`);
}

main().catch(console.error);
