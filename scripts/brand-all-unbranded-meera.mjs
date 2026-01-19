#!/usr/bin/env node
/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  VERALABS COMPREHENSIVE BRANDING - ALL UNBRANDED MEERA COLLECTIONS
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *  Brands all remaining Imagen 4 Meera collections with:
 *    - VERALabs signature gradient overlay
 *    - Collection & variant names
 *    - Elegant quotes/subtitles
 *    - Instagram-optimized 4:5 format (1080x1350)
 *
 *  Output: /home/ecolex/version1/instagram_branded_new/
 *
 * ═══════════════════════════════════════════════════════════════════════════
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const BASE_DIR = '/home/ecolex/version1';
const OUT_BASE = '/home/ecolex/version1/instagram_branded_new';

// Collections to brand (Imagen 4 generated, excluding ImagineArt)
const COLLECTIONS = [
  {
    id: 'meera_laying_all_angles',
    src: 'generated-meera-laying-all-angles',
    name: 'LAYING POSES',
    collection: 'ALL ANGLES SERIES',
    quote: 'Every angle reveals a story',
    variants: {
      'prone': { name: 'PRONE POETRY', subtitle: 'Horizontal elegance' },
      'supine': { name: 'SUPINE GRACE', subtitle: 'Face-up serenity' },
      'side': { name: 'SIDE SILHOUETTE', subtitle: 'Profile perfection' },
      'twisted': { name: 'TWISTED FORM', subtitle: 'Dynamic tension' },
      'reclined': { name: 'RECLINED BEAUTY', subtitle: 'Relaxed luxury' },
      'stretch': { name: 'STRETCH & FLOW', subtitle: 'Extended lines' },
      'curl': { name: 'CURLED INTIMACY', subtitle: 'Protective beauty' },
    },
    caption: `MEERA | Laying Poses - All Angles Series

Twenty-four masterful perspectives. One muse. Infinite beauty.

From prone poetry to supine grace. From side silhouettes to dynamic twists. Each angle reveals new dimensions of form and light.

This is the art of the horizontal figure.

#VERALABS #Meera #LayingPoses #AllAngles #FigureStudy #BodyArt #IntimatePortraiture #HorizontalBeauty #FormAndLight #FineArtNude #RealisticPhotography`
  },

  {
    id: 'meera_dusky_maxmode',
    src: 'generated-meera-dusky-maxmode',
    name: 'DUSKY MAXMODE',
    collection: 'MAXIMUM EXPRESSION',
    quote: 'Where shadow meets bronze',
    variants: {
      'dramatic': { name: 'DRAMATIC SHADOW', subtitle: 'Chiaroscuro mastery' },
      'intimate': { name: 'INTIMATE GLOW', subtitle: 'Warm bronze light' },
      'artistic': { name: 'ARTISTIC FORM', subtitle: 'Body as sculpture' },
      'sensual': { name: 'SENSUAL DEPTHS', subtitle: 'Deep expression' },
    },
    caption: `MEERA | Dusky Maxmode - Maximum Expression

Twenty-four expressions at the edge of art. Deep warm dusky bronze skin meets dramatic chiaroscuro lighting.

This is photography at its most expressive - where shadow defines form and light reveals soul.

Maximum artistic freedom. Maximum beauty.

#VERALABS #Meera #DuskyMaxmode #MaximumExpression #BronzeSkin #ChiaroscuroArt #DramaticLighting #FineArtNude #IntimateArt #DuskyBeauty #ShadowAndLight`
  },

  {
    id: 'meera_bent_v_closeup',
    src: 'generated-meera-bent-v-closeup-realistic',
    name: 'BENT V CLOSEUP',
    collection: 'INTIMATE DETAILS',
    quote: 'Form in focus',
    variants: {
      'closeup': { name: 'INTIMATE CLOSEUP', subtitle: 'Detail mastery' },
      'bent': { name: 'BENT FORM', subtitle: 'Angular beauty' },
      'v_shape': { name: 'V FORMATION', subtitle: 'Geometric grace' },
      'texture': { name: 'SKIN TEXTURE', subtitle: 'Tactile artistry' },
    },
    caption: `MEERA | Bent V Closeup - Intimate Details Collection

Twenty-four studies in intimate detail. Bent forms creating natural V-shapes. Closeup photography revealing texture and tone.

This is the art of the focused frame - where less context means more impact.

Every curve tells a story.

#VERALABS #Meera #IntimateDetails #CloseupArt #FormStudy #TexturePhotography #GeometricBeauty #FineArtNude #DetailMastery #BentForm #VShape`
  },

  {
    id: 'meera_midnight_muse',
    src: 'generated-meera-midnight-muse-reclined',
    name: 'MIDNIGHT MUSE',
    collection: 'NOCTURNAL BEAUTY',
    quote: 'When night unveils art',
    variants: {
      'midnight': { name: 'MIDNIGHT DREAMS', subtitle: 'Nocturnal elegance' },
      'reclined': { name: 'RECLINED REVERIE', subtitle: 'Horizontal luxury' },
      'shadow': { name: 'SHADOW PLAY', subtitle: 'Light and dark dance' },
      'intimate': { name: 'INTIMATE HOURS', subtitle: 'Private moments' },
    },
    caption: `MEERA | Midnight Muse - Nocturnal Beauty Collection

Twenty frames of nocturnal elegance. Reclined forms bathed in midnight light. Shadow and skin in perfect harmony.

This is the muse at her most mysterious - when darkness becomes her canvas.

The night reveals what day conceals.

#VERALABS #Meera #MidnightMuse #NocturnalBeauty #ReclinedElegance #ShadowArt #IntimatePortrait #NightPhotography #FineArtNude #DarkBeauty #MidnightDreams`
  },

  {
    id: 'meera_helmut_newton',
    src: 'generated-meera-helmut-newton-bignudes',
    name: 'HELMUT NEWTON',
    collection: 'BIG NUDES TRIBUTE',
    quote: 'Power meets vulnerability',
    variants: {
      'power': { name: 'POWER STANCE', subtitle: 'Commanding presence' },
      'editorial': { name: 'EDITORIAL EDGE', subtitle: 'Fashion-forward' },
      'statuesque': { name: 'STATUESQUE', subtitle: 'Sculptural beauty' },
      'dramatic': { name: 'DRAMATIC LIGHT', subtitle: 'Contrast mastery' },
    },
    caption: `MEERA | Helmut Newton Tribute - Big Nudes Series

Twenty masterworks channeling the legendary Helmut Newton. Power stances. Editorial edge. Statuesque figures.

This is photography as statement - where the female form commands attention and demands respect.

A tribute to the master. A celebration of power.

#VERALABS #Meera #HelmutNewton #BigNudes #PowerPhotography #EditorialArt #StatuesqueBeauty #FashionNude #FineArtTribute #DramaticContrast #LegendaryStyle`
  },

  {
    id: 'meera_inner_thigh_closeup',
    src: 'generated-meera-inner-thigh-closeup',
    name: 'INNER THIGH',
    collection: 'INTIMATE FOCUS',
    quote: 'Where curves converge',
    variants: {
      'closeup': { name: 'INTIMATE FOCUS', subtitle: 'Detail artistry' },
      'texture': { name: 'SKIN POETRY', subtitle: 'Tactile beauty' },
      'shadow': { name: 'SHADOW LINES', subtitle: 'Chiaroscuro detail' },
      'form': { name: 'FORM STUDY', subtitle: 'Geometric grace' },
    },
    caption: `MEERA | Inner Thigh Focus - Intimate Closeup Series

Sixteen studies in intimate detail. Where curves converge and shadow defines form. Closeup artistry at its most focused.

This is the poetry of skin - where texture becomes art and proximity reveals beauty.

Every frame an intimate revelation.

#VERALABS #Meera #IntimateFocus #CloseupArt #SkinPoetry #FormStudy #DetailPhotography #FineArtNude #CurvesAndShadow #TextureArt #IntimateBeauty`
  },

  {
    id: 'meera_plus_sensuous',
    src: 'generated-meera-plus-sensuous',
    name: 'PLUS SENSUOUS',
    collection: 'ENHANCED INTIMACY',
    quote: 'Beyond boundaries',
    variants: {
      'sensuous': { name: 'PURE SENSUALITY', subtitle: 'Elevated art' },
      'intimate': { name: 'DEEP INTIMACY', subtitle: 'Private beauty' },
      'artistic': { name: 'ARTISTIC FORM', subtitle: 'Body as canvas' },
      'expression': { name: 'FREE EXPRESSION', subtitle: 'Boundary-free' },
    },
    caption: `MEERA | Plus Sensuous - Enhanced Intimacy Collection

Fourteen expressions of enhanced sensuality. Beyond conventional boundaries. Pure artistic expression.

This is intimacy elevated - where the sensuous becomes art and vulnerability becomes strength.

Beauty without limits.

#VERALABS #Meera #PlusSensuous #EnhancedIntimacy #ArtisticExpression #BoundaryFree #SensualArt #FineArtNude #PureBeauty #IntimateExpression #ElevatedArt`
  }
];

function log(msg) {
  const time = new Date().toLocaleTimeString();
  console.log(`[${time}] ${msg}`);
}

function createBrandingOverlay(collectionName, variantName, subtitle, quote) {
  const width = 1080;
  const height = 1350;
  const overlayY = Math.floor(height * 0.70);
  const overlayHeight = Math.floor(height * 0.30);

  return Buffer.from(`
    <svg width="${width}" height="${height}">
      <defs>
        <linearGradient id="fadeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:rgba(0,0,0,0)"/>
          <stop offset="25%" style="stop-color:rgba(0,0,0,0.55)"/>
          <stop offset="100%" style="stop-color:rgba(0,0,0,0.92)"/>
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="1" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      <rect x="0" y="${overlayY}" width="${width}" height="${overlayHeight}" fill="url(#fadeGrad)"/>

      <!-- Collection name -->
      <text x="${width/2}" y="${Math.floor(height * 0.76)}"
            font-family="DejaVu Sans, Arial, sans-serif"
            font-size="16"
            letter-spacing="4"
            fill="#d4af37"
            text-anchor="middle">${collectionName}</text>

      <!-- Variant name -->
      <text x="${width/2}" y="${Math.floor(height * 0.82)}"
            font-family="DejaVu Sans, Arial, sans-serif"
            font-size="32"
            font-weight="bold"
            fill="white"
            filter="url(#glow)"
            text-anchor="middle">${variantName}</text>

      <!-- Subtitle -->
      <text x="${width/2}" y="${Math.floor(height * 0.87)}"
            font-family="DejaVu Serif, Georgia, serif"
            font-size="18"
            font-style="italic"
            fill="#e8d5b7"
            text-anchor="middle">${subtitle}</text>

      <!-- Quote -->
      <text x="${width/2}" y="${Math.floor(height * 0.92)}"
            font-family="DejaVu Serif, Georgia, serif"
            font-size="14"
            font-style="italic"
            fill="rgba(232,213,183,0.7)"
            text-anchor="middle">"${quote}"</text>

      <!-- VERALABS signature -->
      <text x="${width/2}" y="${Math.floor(height * 0.97)}"
            font-family="DejaVu Sans, Arial, sans-serif"
            font-size="13"
            letter-spacing="6"
            fill="rgba(212,175,55,0.6)"
            text-anchor="middle">VERALABS</text>
    </svg>
  `);
}

async function brandImage(srcPath, outPath, collectionName, variantName, subtitle, quote) {
  try {
    const baseImage = await sharp(srcPath)
      .resize(1080, 1350, { fit: 'cover', position: 'center' })
      .toBuffer();

    const overlay = createBrandingOverlay(collectionName, variantName, subtitle, quote);

    await sharp(baseImage)
      .composite([{ input: overlay, top: 0, left: 0 }])
      .jpeg({ quality: 94 })
      .toFile(outPath);

    return true;
  } catch (err) {
    console.error(`   Error: ${err.message}`);
    return false;
  }
}

function getVariantInfo(filename, variants) {
  const lowerFilename = filename.toLowerCase();
  for (const [key, info] of Object.entries(variants)) {
    if (lowerFilename.includes(key)) {
      return info;
    }
  }
  // Default fallback
  const firstVariant = Object.values(variants)[0];
  return firstVariant || { name: 'MEERA', subtitle: 'Exclusive collection' };
}

async function brandCollection(collection) {
  const srcDir = path.join(BASE_DIR, collection.src);
  const outDir = path.join(OUT_BASE, collection.id);

  if (!fs.existsSync(srcDir)) {
    log(`   ⏭️ Source not found: ${collection.src}`);
    return { success: false, reason: 'source_not_found' };
  }

  // Create output directory
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  // Get source images
  const images = fs.readdirSync(srcDir)
    .filter(f => f.endsWith('.png') || f.endsWith('.jpg'))
    .sort()
    .slice(0, 20); // Max 20 slides

  if (images.length === 0) {
    log(`   ⏭️ No images in ${collection.src}`);
    return { success: false, reason: 'no_images' };
  }

  log(`   📷 Found ${images.length} source images`);

  const branded = [];

  for (let i = 0; i < images.length; i++) {
    const img = images[i];
    const srcPath = path.join(srcDir, img);
    const outName = `slide_${String(i + 1).padStart(2, '0')}.jpg`;
    const outPath = path.join(outDir, outName);

    const variantInfo = getVariantInfo(img, collection.variants);

    const success = await brandImage(
      srcPath,
      outPath,
      collection.collection,
      variantInfo.name,
      variantInfo.subtitle,
      collection.quote
    );

    if (success) {
      branded.push({ src: img, out: outName, variant: variantInfo.name });
      process.stdout.write(`\r   ✅ [${i + 1}/${images.length}] ${variantInfo.name.padEnd(20)}`);
    } else {
      process.stdout.write(`\r   ❌ [${i + 1}/${images.length}] Failed: ${img.slice(0, 30)}`);
    }
  }

  console.log(''); // New line after progress

  // Save caption
  fs.writeFileSync(path.join(outDir, 'caption.txt'), collection.caption);

  return {
    success: true,
    branded: branded.length,
    directory: outDir
  };
}

async function main() {
  console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║   ██╗   ██╗███████╗██████╗  █████╗ ██╗      █████╗ ██████╗ ███████╗          ║
║   ██║   ██║██╔════╝██╔══██╗██╔══██╗██║     ██╔══██╗██╔══██╗██╔════╝          ║
║   ██║   ██║█████╗  ██████╔╝███████║██║     ███████║██████╔╝███████╗          ║
║   ╚██╗ ██╔╝██╔══╝  ██╔══██╗██╔══██║██║     ██╔══██║██╔══██╝╚════██║          ║
║    ╚████╔╝ ███████╗██║  ██║██║  ██║███████╗██║  ██║██████╔╝███████║          ║
║     ╚═══╝  ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═════╝ ╚══════╝          ║
║                                                                              ║
║    ✨ COMPREHENSIVE MEERA BRANDING MASTERCLASS ✨                            ║
║                                                                              ║
║    Branding ${COLLECTIONS.length} Collections • VERALabs Signature • Instagram Ready           ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
  `);

  const results = [];

  for (let i = 0; i < COLLECTIONS.length; i++) {
    const collection = COLLECTIONS[i];

    console.log(`\n${'═'.repeat(76)}`);
    log(`📱 [${i + 1}/${COLLECTIONS.length}] ${collection.name} - ${collection.collection}`);
    console.log(`${'═'.repeat(76)}`);

    const result = await brandCollection(collection);
    results.push({
      id: collection.id,
      name: collection.name,
      ...result
    });
  }

  // Summary
  console.log(`\n${'═'.repeat(76)}`);
  console.log(`                    BRANDING SUMMARY`);
  console.log(`${'═'.repeat(76)}`);

  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);

  console.log(`\n  ✅ Branded: ${successful.length} collections`);
  successful.forEach(r => {
    console.log(`     📁 ${r.name}: ${r.branded} slides → ${r.directory}`);
  });

  if (failed.length > 0) {
    console.log(`\n  ⏭️ Skipped: ${failed.length} collections`);
    failed.forEach(r => {
      console.log(`     ○ ${r.name}: ${r.reason}`);
    });
  }

  // Save manifest
  const manifestPath = path.join(OUT_BASE, 'branding-manifest-extended.json');
  fs.writeFileSync(manifestPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    collections: results,
    summary: {
      total: results.length,
      branded: successful.length,
      skipped: failed.length,
      totalSlides: successful.reduce((sum, r) => sum + (r.branded || 0), 0)
    }
  }, null, 2));

  console.log(`\n  📋 Manifest: ${manifestPath}`);
  console.log(`${'═'.repeat(76)}\n`);
}

main().catch(console.error);
