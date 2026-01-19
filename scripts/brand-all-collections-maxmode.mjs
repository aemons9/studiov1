#!/usr/bin/env node

/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  VERALABS MAX-MODE BRANDING MASTERCLASS
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *  Brands ALL today's generated collections into Instagram-ready carousels
 *  Organized by themes for strategic storytelling posts
 *
 *  Output: instagram_branded_new/
 *
 * ═══════════════════════════════════════════════════════════════════════════
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const OUTPUT_DIR = '/home/ecolex/version1/instagram_branded_new';
const FFMPEG = '/home/ecolex/version1/node_modules/@ffmpeg-installer/linux-x64/ffmpeg';

// ═══════════════════════════════════════════════════════════════════════════
// THEMED CAROUSEL COLLECTIONS - Strategic Posts for Maximum Engagement
// ═══════════════════════════════════════════════════════════════════════════

const THEMED_COLLECTIONS = [
  // 1. BRONZE METALLIC MESH MASTERCLASS
  {
    id: 'bronze_mesh_masterclass',
    name: 'BRONZE MESH',
    collection: 'METALLIC INTIMACY',
    invocation: 'where metal meets skin',
    sources: [
      '/home/ecolex/version1/generated-bronze-mesh-intimate',
      '/home/ecolex/version1/generated-indian-hourglass-amalgamative/luxury'
    ],
    caption: `BRONZE MESH | Metallic Intimacy

Where metal meets skin, alchemy happens. Bronze chainmail and copper mesh harmonize with sun-kissed bronze skin in perfect amalgamation.

Candlelit luxury meets industrial edge.

Swipe to experience the full metallic journey.

#VERALABS #BronzeMesh #MetallicIntimacy #CandlelitLuxury #AmalgamativeArt #ChainmailCouture #FineArtBoudoir #HourglassMuse #IndustrialGlamour #CopperGlow`
  },

  // 2. MESHMINIMAL INDIAN MUSE
  {
    id: 'meshminimal_muse',
    name: 'MESHMINIMAL',
    collection: 'INDIAN MUSE SERIES',
    invocation: 'minimalism elevated',
    sources: [
      '/home/ecolex/version1/generated-meshminimal/phase1_reference',
      '/home/ecolex/version1/generated-meshminimal/phase2_intimate'
    ],
    caption: `MESHMINIMAL | Indian Muse Series

Where Helmut Newton meets Annie Leibovitz. The statuesque Indian muse in Victorian-modern wooden cabin. Minimal mesh. Maximum impact.

Architecture meets sensuality in every frame.

#VERALABS #MeshMinimal #IndianMuse #WoodenCabin #FineArtPhotography #HelmutNewton #MinimalCoverage #StatuesqueBeauty #BoudoirArt #EditorialExcellence`
  },

  // 3. CANDLELIT CHAMBER COLLECTION
  {
    id: 'candlelit_chamber',
    name: 'CANDLELIT CHAMBER',
    collection: 'INTIMATE DEVOTION',
    invocation: 'surrender to golden light',
    sources: [
      '/home/ecolex/version1/generated-bronze-mesh-intimate',
      '/home/ecolex/version1/generated-candlelit-chamber-extended'
    ],
    keywords: ['candlelit', 'candle', 'chamber'],
    caption: `CANDLELIT CHAMBER | Intimate Devotion

Golden flames dance on bronze skin. Candelabras cast shadows of desire. This is where art becomes devotion.

Every flicker tells a story.

#VERALABS #CandlelitChamber #IntimateArt #GoldenLight #FlickeringFlames #BoudoirMasterclass #DevotionalArt #ShadowAndLight #FineArtBoudoir #LuxuryIntimacy`
  },

  // 4. WOODEN CABIN CRYSTALLINE
  {
    id: 'wooden_cabin_crystalline',
    name: 'CABIN CRYSTALLINE',
    collection: 'VICTORIAN INTIMACY',
    invocation: 'where wood whispers warmth',
    sources: [
      '/home/ecolex/version1/generated-cabin-crystalline'
    ],
    caption: `CABIN CRYSTALLINE | Victorian Intimacy

Victorian-modern fusion. Warm wooden walls embrace crystalline beauty. Morning light through cabin windows paints stories of private luxury.

Amalgamative dynamics at their finest.

#VERALABS #CabinCrystalline #VictorianIntimacy #WoodenCabin #MorningLight #AmalgamativeArt #CrystallineMesh #PrivateLuxury #FineArtBoudoir #WarmWoodTones`
  },

  // 5. CRYSTALLINE EXCLUSIVE COLLECTION
  {
    id: 'crystalline_exclusive',
    name: 'CRYSTALLINE',
    collection: 'EXCLUSIVE 10+ SERIES',
    invocation: 'premium intimacy unveiled',
    sources: [
      '/home/ecolex/version1/generated-crystalline-exclusive',
      '/home/ecolex/version1/generated-crystalline-variations'
    ],
    caption: `CRYSTALLINE | Exclusive 10+ Series

Cream fur meets dark walls. Candles illuminate crystalline mesh. This is premium intimacy at its most exclusive.

Every pose a revelation.

#VERALABS #CrystallineExclusive #PremiumIntimacy #FurThrow #CandlelightGlow #DarkWalls #ExclusiveCollection #FineArtNude #BoudoirMasterclass #10PlusSeries`
  },

  // 6. INDIAN HOURGLASS AMALGAMATIVE
  {
    id: 'indian_hourglass_amalgamative',
    name: 'HOURGLASS',
    collection: 'AMALGAMATIVE EXCELLENCE',
    invocation: 'curves in conversation',
    sources: [
      '/home/ecolex/version1/generated-indian-hourglass-amalgamative/contrast',
      '/home/ecolex/version1/generated-indian-hourglass-amalgamative/true_amalgamation'
    ],
    caption: `HOURGLASS | Amalgamative Excellence

Black lace on cream. Cream lace on cream. Gold on warm skin. This is the art of perfect pairing - wardrobe meets surface in visual poetry.

Three types of amalgamation. Infinite beauty.

#VERALABS #HourglassMuse #AmalgamativeArt #ContrastBeauty #LaceOnCream #IndianBeauty #BoudoirArt #FashionEditorial #SensualElegance #CurvesInConversation`
  },

  // 7. VIP UNDERGROUND SERIES
  {
    id: 'vip_underground',
    name: 'VIP UNDERGROUND',
    collection: 'GOSSAMER NOIR',
    invocation: 'exclusive after hours',
    sources: [
      '/home/ecolex/version1/generated-vip-underground'
    ],
    caption: `VIP UNDERGROUND | Gossamer Noir

Behind velvet ropes, in rooms where shadows speak. Gossamer mesh catches dim lights. This is the art of the exclusive - seen by few, remembered forever.

Private club aesthetics.

#VERALABS #VIPUnderground #GossamerNoir #PrivateClub #ExclusiveAccess #DarkLuxury #GossamerMesh #BoudoirNoir #UndergroundArt #AfterHours`
  },

  // 8. VELVET INTIMACY COLLECTION
  {
    id: 'velvet_intimacy',
    name: 'VELVET THRONE',
    collection: 'SHADOW MASTERY',
    invocation: 'draped in darkness',
    sources: [
      '/home/ecolex/version1/generated-velvet-intimacy',
      '/home/ecolex/version1/generated-velvet-editorial',
      '/home/ecolex/version1/generated-premium-velvet-hybrid'
    ],
    caption: `VELVET THRONE | Shadow Mastery

Deep velvet absorbs light. Silk reflects desire. Shadow and form dance in perfect choreography.

This is where texture becomes poetry.

#VERALABS #VelvetThrone #ShadowMastery #VelvetLuxury #SilkDraping #ChiaroscuroArt #TexturePoetry #BoudoirArt #DrapedInDarkness #SensualShadows`
  },

  // 9. MASTERPIECE II SHADOW MESH
  {
    id: 'masterpiece_ii',
    name: 'MASTERPIECE II',
    collection: 'SHADOW MESH INTIMACY',
    invocation: 'shadows become clothing',
    sources: [
      '/home/ecolex/version1/generated-masterpiece-ii'
    ],
    caption: `MASTERPIECE II | Shadow Mesh Intimacy

When light creates pattern, shadow becomes wardrobe. Mesh-like shadows draped across curves. Art that wears itself.

No fabric needed - just light and form.

#VERALABS #MasterpieceII #ShadowMesh #LightAsClothing #PatternedShadows #ArtisticIntimacy #FineArtNude #ShadowPlay #ChiaroscuroMastery #LightSculpting`
  },

  // 10. PREMIUM COUCH EDITORIAL
  {
    id: 'premium_editorial',
    name: 'EDITORIAL',
    collection: 'PREMIUM COUCH SERIES',
    invocation: 'luxury lounging',
    sources: [
      '/home/ecolex/version1/generated-premium-couch-editorial'
    ],
    caption: `EDITORIAL | Premium Couch Series

Velvet cushions. Silk throws. The art of elegant repose. This is fashion editorial meets intimate luxury.

Every pose tells a designer's story.

#VERALABS #PremiumEditorial #LuxuryLounging #VelvetCouch #FashionEditorial #SilkThrows #ElegantRepose #BoudoirEditorial #DesignerIntimacy #PremiumSeries`
  }
];

// ═══════════════════════════════════════════════════════════════════════════
// BRANDING FUNCTION - Veralabs Style
// ═══════════════════════════════════════════════════════════════════════════

function addBrandingOverlay(inputPath, outputPath, collection) {
  const filterComplex = [
    // Scale to 1080x1350 (4:5 ratio for Instagram carousel)
    `scale=1080:1350:force_original_aspect_ratio=increase`,
    `crop=1080:1350`,
    // Semi-transparent black gradient at bottom (elegant fade)
    `drawbox=y=ih*0.72:w=iw:h=ih*0.28:color=black@0.55:t=fill`,
    // Collection subtitle (small, gold) - escape single quotes
    `drawtext=text='${collection.collection.replace(/'/g, "\\'")}':fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf:fontsize=26:fontcolor=0xc9a962:x=(w-text_w)/2:y=h*0.77`,
    // Main title (large, white)
    `drawtext=text='${collection.name.replace(/'/g, "\\'")}':fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf:fontsize=44:fontcolor=white:x=(w-text_w)/2:y=h*0.83`,
    // Invocation tagline (italic, gold)
    `drawtext=text='${collection.invocation.replace(/'/g, "\\'")}':fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSerif-Italic.ttf:fontsize=28:fontcolor=0xc9a962:x=(w-text_w)/2:y=h*0.90`,
    // VERALABS watermark
    `drawtext=text='VERALABS':fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf:fontsize=20:fontcolor=0xc9a962@0.8:x=(w-text_w)/2:y=h*0.96`
  ].join(',');

  const cmd = `${FFMPEG} -y -i "${inputPath}" -vf "${filterComplex}" -q:v 2 "${outputPath}"`;

  try {
    execSync(cmd, { stdio: 'pipe' });
    return true;
  } catch (err) {
    return false;
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// FIND IMAGES IN DIRECTORIES
// ═══════════════════════════════════════════════════════════════════════════

function findAllImages(directories, keywords = []) {
  const images = [];

  function scanDir(dir) {
    if (!fs.existsSync(dir)) return;

    const items = fs.readdirSync(dir);
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        scanDir(fullPath);
      } else if (item.endsWith('.png') || item.endsWith('.jpg')) {
        // If keywords specified, filter by filename
        if (keywords.length > 0) {
          const matchesKeyword = keywords.some(kw =>
            item.toLowerCase().includes(kw.toLowerCase())
          );
          if (matchesKeyword) {
            images.push(fullPath);
          }
        } else {
          images.push(fullPath);
        }
      }
    }
  }

  for (const dir of directories) {
    scanDir(dir);
  }

  return images.sort();
}

function log(msg) {
  const time = new Date().toLocaleTimeString();
  console.log(`[${time}] ${msg}`);
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN EXECUTION
// ═══════════════════════════════════════════════════════════════════════════

async function main() {
  console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║   ██╗   ██╗███████╗██████╗  █████╗ ██╗      █████╗ ██████╗ ███████╗          ║
║   ██║   ██║██╔════╝██╔══██╗██╔══██╗██║     ██╔══██╗██╔══██╗██╔════╝          ║
║   ██║   ██║█████╗  ██████╔╝███████║██║     ███████║██████╔╝███████╗          ║
║   ╚██╗ ██╔╝██╔══╝  ██╔══██╗██╔══██║██║     ██╔══██║██╔══██╗╚════██║          ║
║    ╚████╔╝ ███████╗██║  ██║██║  ██║███████╗██║  ██║██████╔╝███████║          ║
║     ╚═══╝  ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═════╝ ╚══════╝          ║
║                                                                              ║
║         ✨ MAX-MODE BRANDING MASTERCLASS ✨                                  ║
║                                                                              ║
║   Transform ALL Generated Collections into Instagram-Ready Carousels        ║
║   Strategic Themed Posts • Veralabs Signature Branding                       ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
  `);

  // Create main output directory
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const allResults = [];

  for (const collection of THEMED_COLLECTIONS) {
    console.log(`\n${'═'.repeat(70)}`);
    log(`🎨 BRANDING: ${collection.name} | ${collection.collection}`);
    console.log(`${'═'.repeat(70)}`);

    // Find all source images
    const sourceImages = findAllImages(collection.sources, collection.keywords || []);

    if (sourceImages.length === 0) {
      log(`   ⏭️ No images found, skipping...`);
      continue;
    }

    log(`   📷 Found ${sourceImages.length} source images`);

    // Create collection output folder
    const collectionDir = path.join(OUTPUT_DIR, collection.id);
    if (!fs.existsSync(collectionDir)) {
      fs.mkdirSync(collectionDir, { recursive: true });
    }

    // Brand images (max 10 for carousel, best selection)
    const maxImages = Math.min(sourceImages.length, 10);
    const selectedImages = sourceImages.slice(0, maxImages);

    const brandedImages = [];
    for (let i = 0; i < selectedImages.length; i++) {
      const inputPath = selectedImages[i];
      const outputPath = path.join(collectionDir, `slide_${String(i + 1).padStart(2, '0')}.jpg`);

      log(`   🖼️ [${i + 1}/${selectedImages.length}] Branding ${path.basename(inputPath).substring(0, 40)}...`);

      if (addBrandingOverlay(inputPath, outputPath, collection)) {
        brandedImages.push(outputPath);
        log(`   ✅ Created: slide_${String(i + 1).padStart(2, '0')}.jpg`);
      } else {
        log(`   ❌ Failed to brand image`);
      }
    }

    // Save collection caption
    const captionPath = path.join(collectionDir, 'caption.txt');
    fs.writeFileSync(captionPath, collection.caption);

    allResults.push({
      id: collection.id,
      name: collection.name,
      collection: collection.collection,
      images: brandedImages.length,
      captionPath,
      directory: collectionDir
    });

    log(`   ✅ ${brandedImages.length} images branded for ${collection.name}`);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SUMMARY
  // ═══════════════════════════════════════════════════════════════════════════

  console.log(`\n${'═'.repeat(70)}`);
  console.log('              MAX-MODE BRANDING COMPLETE');
  console.log(`${'═'.repeat(70)}\n`);

  let totalImages = 0;
  for (const result of allResults) {
    console.log(`  📁 ${result.name} | ${result.collection}`);
    console.log(`     📸 ${result.images} branded carousel images`);
    console.log(`     📝 Caption saved`);
    console.log(`     📂 ${result.directory}\n`);
    totalImages += result.images;
  }

  console.log(`  ══════════════════════════════════════════════════════════════`);
  console.log(`  TOTAL: ${allResults.length} themed carousels | ${totalImages} branded images`);
  console.log(`  Output: ${OUTPUT_DIR}`);
  console.log(`${'═'.repeat(70)}\n`);

  // Save master manifest
  const manifestPath = path.join(OUTPUT_DIR, 'branding-manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    collections: allResults,
    totalImages
  }, null, 2));

  log(`📋 Master manifest saved: ${manifestPath}`);
}

main().catch(console.error);
