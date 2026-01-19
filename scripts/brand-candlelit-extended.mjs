#!/usr/bin/env node
/**
 * Brand Candlelit Chamber Extended Images
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const SRC_DIR = '/home/ecolex/version1/generated-candlelit-chamber-extended';
const OUT_DIR = '/home/ecolex/version1/instagram_branded_new/candlelit_chamber_extended';

// Create output directory
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

// Get all PNG images
const images = fs.readdirSync(SRC_DIR)
  .filter(f => f.endsWith('.png'))
  .sort();

console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║         ✨ BRANDING CANDLELIT CHAMBER EXTENDED ✨                            ║
║                                                                              ║
║    7 Intimate Variants • Silver • Industrial • Velvet • Amber • Platinum    ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
`);

console.log(`[${new Date().toLocaleTimeString()}] Found ${images.length} images to brand\n`);

const branded = [];

images.forEach((img, i) => {
  const srcPath = path.join(SRC_DIR, img);
  const outName = `slide_${String(i + 1).padStart(2, '0')}.jpg`;
  const outPath = path.join(OUT_DIR, outName);

  // Determine variant name from filename
  let variantName = 'CANDLELIT CHAMBER';
  if (img.includes('silver')) variantName = 'SILVER CHAMBER';
  else if (img.includes('industrial')) variantName = 'INDUSTRIAL GLAMOUR';
  else if (img.includes('velvet')) variantName = 'VELVET CANDLELIT';
  else if (img.includes('amber')) variantName = 'AMBER GLOW';
  else if (img.includes('platinum')) variantName = 'PLATINUM ELEGANCE';

  const filterComplex = [
    `scale=1080:1350:force_original_aspect_ratio=increase`,
    `crop=1080:1350`,
    `drawbox=y=ih*0.72:w=iw:h=ih*0.28:color=black@0.55:t=fill`,
    `drawtext=text='INTIMATE DEVOTION':fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf:fontsize=26:fontcolor=0xc9a962:x=(w-text_w)/2:y=h*0.77`,
    `drawtext=text='${variantName}':fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf:fontsize=44:fontcolor=white:x=(w-text_w)/2:y=h*0.83`,
    `drawtext=text='Flames whisper secrets...':fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSerif-Italic.ttf:fontsize=28:fontcolor=0xc9a962:x=(w-text_w)/2:y=h*0.90`,
    `drawtext=text='VERALABS':fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf:fontsize=20:fontcolor=0xc9a962@0.8:x=(w-text_w)/2:y=h*0.96`
  ].join(',');

  const cmd = `ffmpeg -y -i "${srcPath}" -vf "${filterComplex}" -q:v 2 "${outPath}" 2>/dev/null`;

  try {
    execSync(cmd);
    console.log(`[${new Date().toLocaleTimeString()}] ✅ [${i + 1}/${images.length}] ${variantName} → ${outName}`);
    branded.push({ src: img, out: outName, variant: variantName });
  } catch (err) {
    console.log(`[${new Date().toLocaleTimeString()}] ❌ [${i + 1}/${images.length}] Failed: ${img}`);
  }
});

// Create caption
const caption = `CANDLELIT CHAMBER EXTENDED | Intimate Devotion

By candlelight, form becomes sacred. Seven new variants exploring silver chambers, industrial glamour, velvet warmth, amber glow, and platinum elegance.

Bronze candelabras cast dancing shadows on silk and skin. This is worship through artistry.

Surrender to the glow.

#VERALABS #CandlelitChamber #IntimateDevtion #ExtendedCollection #Candlelight #BronzeCandelabra #SilkAndShadow #FineArtBoudoir #SacredArt #WarmGlow #DevotionalBeauty #SilverChamber #IndustrialGlamour #VelvetWarmth #AmberGlow #PlatinumElegance`;

fs.writeFileSync(path.join(OUT_DIR, 'caption.txt'), caption);

console.log(`
══════════════════════════════════════════════════════════════════════════════
              BRANDING COMPLETE
══════════════════════════════════════════════════════════════════════════════

  ✅ Branded: ${branded.length} images
  📂 Output: ${OUT_DIR}
  📝 Caption saved

  Variants branded:
${branded.map(b => `     📸 ${b.variant}`).join('\n')}

══════════════════════════════════════════════════════════════════════════════
`);
