#!/usr/bin/env node
/**
 * VERALABS Intimate Collection Branding
 * Adds masterclass branding overlays to generated images for Instagram
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const INPUT_DIR = '/home/ecolex/version1/instagram-intimate-masterclass';
const OUTPUT_DIR = '/home/ecolex/version1/instagram-intimate-branded';

// Collection definitions
const COLLECTIONS = [
  {
    folder: 'golden_touch',
    name: 'GOLDEN TOUCH',
    collection: 'INTIMATE MASTERCLASS',
    invocation: 'golden intimacy',
    caption: `Golden touch. Golden hour. Golden soul.

Where warm light meets soft skin, magic happens. This is the language of intimate elegance - spoken in gold and whispered in silk.

Swipe to experience the full collection.

#VERALABS #GoldenTouch #IntimateArt #FineArtBoudoir #GoldenHour #MasterclassCollection #ArtisticPhotography #MuseumQuality`
  },
  {
    folder: 'shadow_whispers',
    name: 'SHADOW WHISPERS',
    collection: 'CHIAROSCURO SERIES',
    invocation: 'surrender to shadow',
    caption: `Shadow whispers. Light reveals.

Where darkness meets desire, stories unfold. Chiaroscuro masters the art of concealment and revelation.

Which shadow speaks to you?

#VERALABS #ShadowWhispers #ChiaroscuroArt #LightAndShadow #FineArtPhotography #DramaticLighting #IntimateArt`
  },
  {
    folder: 'silk_surrender',
    name: 'SILK SURRENDER',
    collection: 'LIQUID LUXURY',
    invocation: 'liquid elegance',
    caption: `Silk surrenders. Satin flows.

Fabrics that move like water, catching light like liquid gold. This is texture elevated to art.

Close your eyes. Feel the softness.

#VERALABS #SilkSurrender #LiquidLuxury #SatinDreams #FineArtPhotography #TextureArt #IntimateElegance`
  },
  {
    folder: 'mirror_reflections',
    name: 'MIRROR REFLECTIONS',
    collection: 'VANITY SERIES',
    invocation: 'self discovery',
    caption: `The mirror reflects. The soul reveals.

Moments of quiet self-appreciation. Feminine rituals of beauty and confidence.

What does your reflection show you?

#VERALABS #MirrorReflections #VanitySeries #SelfLove #FeminineBeauty #IntimatePortrait #BoudoirArt`
  },
  {
    folder: 'lingerie_collection',
    name: 'ARCHITECTURAL MESH',
    collection: 'INTIMATE COUTURE',
    invocation: 'strategic elegance',
    caption: `Architecture meets intimacy.

Single lines. Strategic draping. Geometric precision on curvaceous form. This is haute couture intimate.

Art that adorns. Design that reveals.

#VERALABS #ArchitecturalLingerie #IntimeCouture #StrategicDesign #HauteCouture #FineArtFashion #CurvaceousFigure`
  }
];

const FFMPEG = '/home/ecolex/version1/node_modules/@ffmpeg-installer/linux-x64/ffmpeg';

function log(msg) {
  const time = new Date().toLocaleTimeString();
  console.log(`[${time}] ${msg}`);
}

function addBrandingOverlay(inputPath, outputPath, collection) {
  // Resize to Instagram portrait ratio (4:5 = 1080x1350) and add VERALABS branding
  const filterComplex = [
    // Scale to 1080x1350 (4:5 ratio for Instagram carousel)
    `scale=1080:1350:force_original_aspect_ratio=increase`,
    `crop=1080:1350`,
    // Semi-transparent black gradient at bottom
    `drawbox=y=ih*0.7:w=iw:h=ih*0.3:color=black@0.6:t=fill`,
    // Collection name (small, gold)
    `drawtext=text='${collection.collection}':fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf:fontsize=28:fontcolor=0xc9a962:x=(w-text_w)/2:y=h*0.76`,
    // Main title (large, white)
    `drawtext=text='${collection.name}':fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf:fontsize=48:fontcolor=white:x=(w-text_w)/2:y=h*0.82`,
    // Invocation (italic, gold)
    `drawtext=text='${collection.invocation}':fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSerif-Italic.ttf:fontsize=32:fontcolor=0xc9a962:x=(w-text_w)/2:y=h*0.89`,
    // VERALABS logo at very bottom
    `drawtext=text='VERALABS':fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf:fontsize=22:fontcolor=0xc9a962:x=(w-text_w)/2:y=h*0.95`
  ].join(',');

  const cmd = `${FFMPEG} -y -i "${inputPath}" -vf "${filterComplex}" -q:v 2 "${outputPath}"`;

  try {
    execSync(cmd, { stdio: 'pipe' });
    return true;
  } catch (err) {
    console.error(`Error branding ${inputPath}:`, err.message);
    return false;
  }
}

async function main() {
  console.log(`
╔══════════════════════════════════════════════════════════════════════════╗
║                                                                          ║
║   ██╗   ██╗███████╗██████╗  █████╗ ██╗      █████╗ ██████╗ ███████╗      ║
║   ██║   ██║██╔════╝██╔══██╗██╔══██╗██║     ██╔══██╗██╔══██╗██╔════╝      ║
║   ██║   ██║█████╗  ██████╔╝███████║██║     ███████║██████╔╝███████╗      ║
║   ╚██╗ ██╔╝██╔══╝  ██╔══██╗██╔══██║██║     ██╔══██║██╔══██╗╚════██║      ║
║    ╚████╔╝ ███████╗██║  ██║██║  ██║███████╗██║  ██║██████╔╝███████║      ║
║     ╚═══╝  ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═════╝ ╚══════╝      ║
║                                                                          ║
║        🎨 INTIMATE COLLECTION BRANDING 🎨                                 ║
║                                                                          ║
║     Adding VERALABS Masterclass Overlays • Instagram Ready               ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
  `);

  // Create output directory
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const results = [];

  for (const collection of COLLECTIONS) {
    const folderPath = path.join(INPUT_DIR, collection.folder);

    if (!fs.existsSync(folderPath)) {
      log(`   ⏭️ Skipping ${collection.folder} - not found`);
      continue;
    }

    console.log(`\n${'═'.repeat(70)}`);
    log(`🎨 BRANDING: ${collection.name}`);
    console.log(`${'═'.repeat(70)}`);

    // Create collection output folder
    const outputFolder = path.join(OUTPUT_DIR, collection.folder);
    if (!fs.existsSync(outputFolder)) {
      fs.mkdirSync(outputFolder, { recursive: true });
    }

    // Get all images
    const images = fs.readdirSync(folderPath).filter(f => f.endsWith('.jpg') || f.endsWith('.png'));
    log(`   📷 Found ${images.length} images`);

    for (let i = 0; i < images.length; i++) {
      const inputPath = path.join(folderPath, images[i]);
      const outputPath = path.join(outputFolder, `slide_${String(i + 1).padStart(2, '0')}.jpg`);

      log(`   🖼️ Branding ${images[i]}...`);

      if (addBrandingOverlay(inputPath, outputPath, collection)) {
        log(`   ✅ Created: slide_${String(i + 1).padStart(2, '0')}.jpg`);
        results.push({
          collection: collection.name,
          slide: i + 1,
          path: outputPath,
          status: 'success'
        });
      } else {
        results.push({
          collection: collection.name,
          slide: i + 1,
          error: 'Branding failed',
          status: 'failed'
        });
      }
    }

    // Save collection metadata
    const metaPath = path.join(outputFolder, 'collection.json');
    fs.writeFileSync(metaPath, JSON.stringify({
      name: collection.name,
      collection: collection.collection,
      invocation: collection.invocation,
      caption: collection.caption,
      slides: images.length
    }, null, 2));
  }

  // Summary
  console.log(`\n${'═'.repeat(70)}`);
  console.log('                    BRANDING COMPLETE');
  console.log(`${'═'.repeat(70)}`);

  const successful = results.filter(r => r.status === 'success');
  console.log(`  ✅ Branded slides: ${successful.length}`);
  console.log(`  📁 Output: ${OUTPUT_DIR}`);

  // Save manifest
  const manifestPath = path.join(OUTPUT_DIR, 'branded-manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(results, null, 2));
  log(`📋 Manifest: ${manifestPath}`);

  console.log(`${'═'.repeat(70)}\n`);
}

main().catch(err => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});
