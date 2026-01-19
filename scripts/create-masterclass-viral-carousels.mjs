#!/usr/bin/env node
/**
 * VERALABS MASTERCLASS VIRAL CAROUSEL GENERATOR
 *
 * Creates viral-worthy Instagram carousel posts using:
 * - Sharp.js for image compositing
 * - CSS-inspired branding system
 * - Multiple layout templates
 * - Professional typography overlays
 *
 * Usage: node scripts/create-masterclass-viral-carousels.mjs
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const OUTPUT_DIR = '/home/ecolex/version1/instagram-masterclass-carousels';
const SOURCE_DIR = '/home/ecolex/version1/studiov1-claude-fashion-moodboard-webpage-01R1NZH3FpX8vyP4EZaJ7w1X/generated-vera-variants';

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// ═══════════════════════════════════════════════════════════════════
// VERALABS BRAND SYSTEM (from styles.css)
// ═══════════════════════════════════════════════════════════════════

const BRAND = {
  colors: {
    creamWhite: '#FAF8F5',
    ivory: '#F7F3ED',
    champagne: '#E8DFD3',
    nudeBeige: '#D4C4B0',
    warmTaupe: '#B8A28E',
    softCharcoal: '#3E3A37',
    deepEspresso: '#1C1917',
    roseGold: '#E8B4B8',
    paleGold: '#D4AF37',
    dustyMauve: '#C8A2B8',
    deepRed: '#8B0000',
    richBrown: '#2C1810',
  },
  fonts: {
    display: 'Playfair Display',
    body: 'Inter',
    luxury: 'Bodoni Moda',
  }
};

// ═══════════════════════════════════════════════════════════════════
// CAROUSEL CONFIGURATIONS - Viral Content Series
// ═══════════════════════════════════════════════════════════════════

const VIRAL_CAROUSELS = [
  {
    id: 'shadow_mastery',
    name: 'Shadow Mastery',
    collection: 'CHIAROSCURO COLLECTION',
    theme: 'dark',
    slides: [
      {
        image: 'vera_godmode_recline_abandon_1767888908992.png',
        headline: { white: 'light', gold: 'sculpts' },
        subtext: 'venetian shadows on skin'
      },
      {
        image: 'vera_godmode_sprawl_divine_1767888969527.png',
        headline: { white: 'divine', gold: 'abandon' },
        subtext: 'surrendering to shadow'
      },
      {
        image: 'vera_godmode_twist_reveal_1767889224861.png',
        headline: { white: 'twist', gold: 'reveal' },
        subtext: 'the art of tension'
      },
      {
        image: 'vera_godmode_floor_intimate_1767889332364.png',
        headline: { white: 'floor', gold: 'poetry' },
        subtext: 'grounded sensuality'
      },
      {
        image: 'vera_godmode_languid_stretch_1767889250331.png',
        headline: { white: 'languid', gold: 'stretch' },
        subtext: 'elegance in extension'
      }
    ],
    caption: `Light sculpts what darkness reveals.

In this collection, venetian blinds become the artist's brush — painting stripes of gold across skin, creating visual poetry through natural chiaroscuro.

Swipe to experience the full Shadow Mastery series.

Which frame speaks to your soul? Tell us in the comments.

#VERALABS #ShadowMastery #ChiaroscuroArt #LightAndShadow #FineArtBoudoir #VenetianLight #ArtisticPhotography #IntimateArt #GoldenHour #MuseumQuality`,
    firstComment: `The interplay of light and shadow has been the foundation of fine art for centuries. We honor that legacy.

#BoudoirArt #ShadowPlay #BodyAsCanvas #ArtisticNude #FineArtNude #SensualArt #PhotographyArt #VisualPoetry #ContemporaryArt`
  },
  {
    id: 'lace_elegance',
    name: 'Lace Elegance',
    collection: 'TEXTILE ARTISTRY',
    theme: 'warm',
    slides: [
      {
        image: 'vera_chantilly_dream_1767888280802.png',
        headline: { white: 'chantilly', gold: 'dreams' },
        subtext: 'french lace whispers'
      },
      {
        image: 'vera_french_elegance_1767888545419.png',
        headline: { white: 'french', gold: 'elegance' },
        subtext: 'timeless sophistication'
      },
      {
        image: 'vera_lace_renaissance_1767888233122.png',
        headline: { white: 'lace', gold: 'renaissance' },
        subtext: 'rebirth of beauty'
      },
      {
        image: 'vera_contemporary_mesh_1767888568496.png',
        headline: { white: 'contemporary', gold: 'mesh' },
        subtext: 'modern transparency'
      }
    ],
    caption: `When textile becomes poetry.

French Chantilly lace meets contemporary vision. Every thread tells a story. Every pattern holds a secret.

This collection celebrates the intersection of textile artistry and intimate expression.

Save this for your boudoir inspiration board.

#VERALABS #LaceElegance #ChantillyLace #TextileArt #FrenchLace #BoudoirPhotography #IntimateApparel #LuxuryLingerie #ArtisticExpression #EditorialFashion`,
    firstComment: `Lace has adorned royalty for centuries. We bring that regal energy to contemporary intimate portraiture.

#LaceDetails #DelicateLace #FashionArt #IntimateDesign #LuxuryIntimate #ArtisticLingerie #FineArtPortrait`
  },
  {
    id: 'minimalist_forms',
    name: 'Minimalist Forms',
    collection: 'LESS IS MORE',
    theme: 'minimal',
    slides: [
      {
        image: 'minimalist_whisper_lace_1767887825929.png',
        headline: { white: 'whisper', gold: 'lace' },
        subtext: 'barely there beauty'
      },
      {
        image: 'minimalist_shadow_mesh_1767887852458.png',
        headline: { white: 'shadow', gold: 'mesh' },
        subtext: 'transparency speaks'
      },
      {
        image: 'minimalist_ethereal_veil_1767887886587.png',
        headline: { white: 'ethereal', gold: 'veil' },
        subtext: 'dreams made visible'
      }
    ],
    caption: `In minimalism, every detail matters more.

When you strip away excess, what remains is pure essence. These images celebrate the body as art with the lightest possible touch.

Less fabric. More meaning.

Double tap if minimalism speaks to you.

#VERALABS #MinimalistArt #LessIsMore #PureForm #ArtisticNude #FineArtPhotography #BodyPositive #SelfExpression #ContemporaryArt #MuseumQuality`,
    firstComment: `Minimalism isn't about having less. It's about making room for more of what matters.

#MinimalAesthetic #CleanLines #PureBeauty #ArtisticExpression #IntimateArt #FormAndFunction`
  },
  {
    id: 'artistic_intimate',
    name: 'Artistic Intimate',
    collection: 'GALLERY SERIES',
    theme: 'gallery',
    slides: [
      {
        image: 'vera_artistic_intimate_v1_1767867682825.png',
        headline: { white: 'gallery', gold: 'worthy' },
        subtext: 'museum quality art'
      },
      {
        image: 'vera_artistic_intimate_v3_1767867752651.png',
        headline: { white: 'intimate', gold: 'vision' },
        subtext: 'private exhibition'
      },
      {
        image: 'vera_artistic_intimate_v4_1767867785409.png',
        headline: { white: 'curated', gold: 'beauty' },
        subtext: 'collected moments'
      }
    ],
    caption: `Art belongs in galleries. And sometimes, the gallery is Instagram.

This series brings museum-quality intimate portraiture to your feed. Each image crafted with the precision of a master painter, the eye of a sculptor.

Would you hang this on your wall? Let us know.

#VERALABS #GalleryArt #MuseumQuality #FineArtPhotography #ArtCollector #CuratedBeauty #IntimatePortrait #ContemporaryArt #ArtisticVision #EditorialArt`,
    firstComment: `Every image in this series could hang in a contemporary art museum. That's the standard we hold ourselves to.

#ArtGallery #FineArtNude #CollectorEdition #ArtInvestment #ContemporaryPortrait #MuseumPiece`
  },
  {
    id: 'fit_goddess',
    name: 'Fit Goddess',
    collection: 'POWER AND GRACE',
    theme: 'powerful',
    slides: [
      {
        image: 'vera_fit_v2_1767868298349.png',
        headline: { white: 'power', gold: 'pose' },
        subtext: 'strength is beautiful'
      },
      {
        image: 'vera_fit_v4_1_1767868679362.png',
        headline: { white: 'athletic', gold: 'grace' },
        subtext: 'muscle meets elegance'
      },
      {
        image: 'vera_fit_v4_8_1767868868805.png',
        headline: { white: 'goddess', gold: 'energy' },
        subtext: 'divine feminine power'
      }
    ],
    caption: `Strong is the new beautiful. Always was.

This series celebrates the athletic feminine form — where discipline meets desire, where strength becomes sensuality.

The body is a temple. These images are the worship.

Tag someone who embodies goddess energy.

#VERALABS #FitGoddess #StrongIsBeautiful #AthleticBeauty #PowerAndGrace #FemininePower #BodyPositive #FitnessArt #GoddesEnergy #WomenEmpowerment`,
    firstComment: `Celebrating bodies that move, stretch, strengthen, and inspire. This is what goddess energy looks like.

#FitWomen #AthleticFeminine #StrengthAndBeauty #PowerfulWomen #BodyArt #FitnessInspiration`
  },
  {
    id: 'lingerie_luxe',
    name: 'Lingerie Luxe',
    collection: 'INTIMATE COUTURE',
    theme: 'luxe',
    slides: [
      {
        image: 'lingerie_lace_teddy_1767869031426.png',
        headline: { white: 'lace', gold: 'teddy' },
        subtext: 'one piece wonder'
      },
      {
        image: 'lingerie_sheer_chemise_1767869094959.png',
        headline: { white: 'sheer', gold: 'chemise' },
        subtext: 'transparent luxury'
      },
      {
        image: 'lingerie_strappy_set_1767870019844.png',
        headline: { white: 'strappy', gold: 'set' },
        subtext: 'architectural intimacy'
      }
    ],
    caption: `Lingerie is the first layer of self-expression.

What you wear closest to your skin reveals who you truly are. This collection celebrates pieces that make you feel powerful before anyone else sees them.

Your confidence starts here.

Save this for your next lingerie shopping spree.

#VERALABS #LingerieLuxe #IntimateCouture #LuxuryLingerie #LaceLingerie #BoudoirFashion #IntimateApparel #LingerieAddict #SelfLove #ConfidenceIsSexy`,
    firstComment: `The right lingerie doesn't just look good — it transforms how you feel. That's the real luxury.

#LingerieCollection #LuxuryIntimate #DesignerLingerie #IntimateWear #LingerieStyle #SelfCare`
  },
  {
    id: 'silk_satin',
    name: 'Silk and Satin',
    collection: 'LIQUID LUXURY',
    theme: 'silky',
    slides: [
      {
        image: 'vera_midnight_silk_1767888520040.png',
        headline: { white: 'midnight', gold: 'silk' },
        subtext: 'liquid darkness'
      },
      {
        image: 'vera_satin_noir_1767888303700.png',
        headline: { white: 'satin', gold: 'noir' },
        subtext: 'noir elegance'
      },
      {
        image: 'vera_mesh_moderne_1767888257912.png',
        headline: { white: 'mesh', gold: 'moderne' },
        subtext: 'contemporary transparency'
      }
    ],
    caption: `Some fabrics don't just drape — they cascade.

Silk and satin move like liquid, catching light and shadow in ways no other material can. This series celebrates textiles that feel as good as they look.

Close your eyes. Imagine the touch.

Which texture calls to you? Comment below.

#VERALABS #SilkAndSatin #LiquidLuxury #SatinNoir #MidnightSilk #LuxuryFabrics #TextureArt #SensualFabrics #IntimatePhotography #FabricArt`,
    firstComment: `The way silk catches light is almost magical. We tried to capture that magic in these frames.

#SilkDreams #SatinLove #LuxuryTextures #FabricPhotography #TextileBeauty #SensualTextures`
  }
];

// ═══════════════════════════════════════════════════════════════════
// SVG TEMPLATE GENERATORS
// ═══════════════════════════════════════════════════════════════════

/**
 * Generate branded overlay SVG for carousel slides
 */
function generateBrandedOverlaySVG(width, height, options) {
  const {
    collection,
    headlineWhite,
    headlineGold,
    subtext,
    theme = 'dark',
    slideNumber,
    totalSlides
  } = options;

  // Theme-based colors
  const themes = {
    dark: {
      gradient: 'rgba(28, 25, 23, 0.75)',
      textPrimary: '#FAF8F5',
      textGold: '#D4AF37',
      textMuted: 'rgba(250, 248, 245, 0.7)'
    },
    warm: {
      gradient: 'rgba(44, 24, 16, 0.7)',
      textPrimary: '#FAF8F5',
      textGold: '#E8B4B8',
      textMuted: 'rgba(250, 248, 245, 0.7)'
    },
    minimal: {
      gradient: 'rgba(62, 58, 55, 0.6)',
      textPrimary: '#FAF8F5',
      textGold: '#D4AF37',
      textMuted: 'rgba(250, 248, 245, 0.7)'
    },
    gallery: {
      gradient: 'rgba(28, 25, 23, 0.65)',
      textPrimary: '#FAF8F5',
      textGold: '#D4AF37',
      textMuted: 'rgba(250, 248, 245, 0.7)'
    },
    powerful: {
      gradient: 'rgba(139, 0, 0, 0.5)',
      textPrimary: '#FAF8F5',
      textGold: '#D4AF37',
      textMuted: 'rgba(250, 248, 245, 0.7)'
    },
    luxe: {
      gradient: 'rgba(44, 24, 16, 0.65)',
      textPrimary: '#FAF8F5',
      textGold: '#E8B4B8',
      textMuted: 'rgba(250, 248, 245, 0.7)'
    },
    silky: {
      gradient: 'rgba(28, 25, 23, 0.6)',
      textPrimary: '#FAF8F5',
      textGold: '#C8A2B8',
      textMuted: 'rgba(250, 248, 245, 0.7)'
    }
  };

  const t = themes[theme] || themes.dark;

  return `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Bottom gradient for text legibility -->
    <linearGradient id="bottomGradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:transparent;stop-opacity:0" />
      <stop offset="40%" style="stop-color:${t.gradient};stop-opacity:0.3" />
      <stop offset="100%" style="stop-color:${t.gradient};stop-opacity:1" />
    </linearGradient>

    <!-- Top subtle gradient -->
    <linearGradient id="topGradient" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" style="stop-color:transparent;stop-opacity:0" />
      <stop offset="100%" style="stop-color:rgba(28,25,23,0.4);stop-opacity:1" />
    </linearGradient>

    <!-- Gold text gradient -->
    <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#D4AF37" />
      <stop offset="50%" style="stop-color:#F0D78C" />
      <stop offset="100%" style="stop-color:#D4AF37" />
    </linearGradient>
  </defs>

  <!-- Top gradient overlay -->
  <rect x="0" y="0" width="${width}" height="200" fill="url(#topGradient)" />

  <!-- Bottom gradient overlay -->
  <rect x="0" y="${height - 400}" width="${width}" height="400" fill="url(#bottomGradient)" />

  <!-- Collection name at top -->
  <text x="${width / 2}" y="70"
        font-family="Inter, sans-serif"
        font-size="20"
        font-weight="300"
        letter-spacing="8"
        fill="${t.textMuted}"
        text-anchor="middle">${collection}</text>

  <!-- Decorative line under collection -->
  <line x1="${width / 2 - 40}" y1="95" x2="${width / 2 + 40}" y2="95"
        stroke="${t.textGold}" stroke-width="1" opacity="0.6" />

  <!-- Main headline - white part -->
  <text x="60" y="${height - 180}"
        font-family="Georgia, serif"
        font-size="72"
        font-weight="400"
        font-style="italic"
        fill="${t.textPrimary}">${headlineWhite}</text>

  <!-- Main headline - gold part -->
  <text x="${60 + headlineWhite.length * 38}" y="${height - 180}"
        font-family="Georgia, serif"
        font-size="72"
        font-weight="400"
        font-style="italic"
        fill="${t.textGold}"> ${headlineGold}</text>

  <!-- Subtext -->
  <text x="60" y="${height - 120}"
        font-family="Inter, sans-serif"
        font-size="22"
        font-weight="300"
        letter-spacing="2"
        fill="${t.textMuted}">${subtext}</text>

  <!-- VERALABS brand mark -->
  <text x="${width - 60}" y="${height - 50}"
        font-family="Inter, sans-serif"
        font-size="16"
        font-weight="400"
        letter-spacing="6"
        fill="${t.textMuted}"
        text-anchor="end">VERALABS</text>

  <!-- Slide indicator -->
  <text x="60" y="${height - 50}"
        font-family="Inter, sans-serif"
        font-size="14"
        font-weight="300"
        fill="${t.textMuted}">${slideNumber} / ${totalSlides}</text>

  <!-- Corner accents -->
  <line x1="40" y1="40" x2="80" y2="40" stroke="${t.textGold}" stroke-width="1" opacity="0.4" />
  <line x1="40" y1="40" x2="40" y2="80" stroke="${t.textGold}" stroke-width="1" opacity="0.4" />

  <line x1="${width - 40}" y1="40" x2="${width - 80}" y2="40" stroke="${t.textGold}" stroke-width="1" opacity="0.4" />
  <line x1="${width - 40}" y1="40" x2="${width - 40}" y2="80" stroke="${t.textGold}" stroke-width="1" opacity="0.4" />
</svg>`;
}

/**
 * Generate cover slide SVG (first slide with more prominent branding)
 */
function generateCoverSlideSVG(width, height, options) {
  const { collection, name, theme = 'dark', totalSlides } = options;

  const themes = {
    dark: { bg: 'rgba(28, 25, 23, 0.8)', gold: '#D4AF37' },
    warm: { bg: 'rgba(44, 24, 16, 0.75)', gold: '#E8B4B8' },
    minimal: { bg: 'rgba(62, 58, 55, 0.7)', gold: '#D4AF37' },
    gallery: { bg: 'rgba(28, 25, 23, 0.75)', gold: '#D4AF37' },
    powerful: { bg: 'rgba(139, 0, 0, 0.6)', gold: '#D4AF37' },
    luxe: { bg: 'rgba(44, 24, 16, 0.7)', gold: '#E8B4B8' },
    silky: { bg: 'rgba(28, 25, 23, 0.7)', gold: '#C8A2B8' }
  };

  const t = themes[theme] || themes.dark;

  return `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="coverGradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:${t.bg};stop-opacity:0.5" />
      <stop offset="50%" style="stop-color:transparent;stop-opacity:0" />
      <stop offset="100%" style="stop-color:${t.bg};stop-opacity:0.9" />
    </linearGradient>
  </defs>

  <!-- Full overlay gradient -->
  <rect x="0" y="0" width="${width}" height="${height}" fill="url(#coverGradient)" />

  <!-- Collection name at top -->
  <text x="${width / 2}" y="100"
        font-family="Inter, sans-serif"
        font-size="18"
        font-weight="300"
        letter-spacing="10"
        fill="rgba(250, 248, 245, 0.6)"
        text-anchor="middle">${collection}</text>

  <!-- Decorative elements -->
  <line x1="${width / 2 - 60}" y1="130" x2="${width / 2 + 60}" y2="130"
        stroke="${t.gold}" stroke-width="1" opacity="0.5" />

  <!-- Series name - large centered -->
  <text x="${width / 2}" y="${height / 2 + 20}"
        font-family="Georgia, serif"
        font-size="64"
        font-weight="400"
        font-style="italic"
        fill="#FAF8F5"
        text-anchor="middle">${name}</text>

  <!-- Swipe indicator -->
  <text x="${width / 2}" y="${height - 120}"
        font-family="Inter, sans-serif"
        font-size="16"
        font-weight="300"
        letter-spacing="3"
        fill="rgba(250, 248, 245, 0.5)"
        text-anchor="middle">SWIPE TO EXPLORE</text>

  <!-- Arrow indicator -->
  <path d="M${width / 2 - 15} ${height - 80} L${width / 2} ${height - 65} L${width / 2 + 15} ${height - 80}"
        stroke="${t.gold}" stroke-width="2" fill="none" opacity="0.6" />

  <!-- Slide count -->
  <text x="${width / 2}" y="${height - 45}"
        font-family="Inter, sans-serif"
        font-size="14"
        font-weight="300"
        fill="rgba(250, 248, 245, 0.4)"
        text-anchor="middle">${totalSlides} IMAGES</text>

  <!-- VERALABS brand mark -->
  <text x="${width - 60}" y="${height - 50}"
        font-family="Inter, sans-serif"
        font-size="16"
        font-weight="400"
        letter-spacing="6"
        fill="rgba(250, 248, 245, 0.5)"
        text-anchor="end">VERALABS</text>

  <!-- Corner accents -->
  <rect x="50" y="50" width="30" height="1" fill="${t.gold}" opacity="0.4" />
  <rect x="50" y="50" width="1" height="30" fill="${t.gold}" opacity="0.4" />
  <rect x="${width - 80}" y="50" width="30" height="1" fill="${t.gold}" opacity="0.4" />
  <rect x="${width - 51}" y="50" width="1" height="30" fill="${t.gold}" opacity="0.4" />
  <rect x="50" y="${height - 51}" width="30" height="1" fill="${t.gold}" opacity="0.4" />
  <rect x="50" y="${height - 80}" width="1" height="30" fill="${t.gold}" opacity="0.4" />
  <rect x="${width - 80}" y="${height - 51}" width="30" height="1" fill="${t.gold}" opacity="0.4" />
  <rect x="${width - 51}" y="${height - 80}" width="1" height="30" fill="${t.gold}" opacity="0.4" />
</svg>`;
}

// ═══════════════════════════════════════════════════════════════════
// IMAGE PROCESSING FUNCTIONS
// ═══════════════════════════════════════════════════════════════════

/**
 * Process source image to Instagram square format
 */
async function processImageToSquare(inputPath, size = 1080) {
  const image = sharp(inputPath);
  const metadata = await image.metadata();

  // Calculate crop dimensions for center crop to square
  const minDim = Math.min(metadata.width, metadata.height);
  const left = Math.floor((metadata.width - minDim) / 2);
  const top = Math.floor((metadata.height - minDim) / 2);

  return image
    .extract({ left, top, width: minDim, height: minDim })
    .resize(size, size, { fit: 'cover', position: 'center' })
    .toBuffer();
}

/**
 * Create branded carousel slide
 */
async function createBrandedSlide(sourceImagePath, outputPath, options) {
  const {
    collection,
    headlineWhite,
    headlineGold,
    subtext,
    theme,
    slideNumber,
    totalSlides,
    isCover = false
  } = options;

  const SIZE = 1080;

  // Process source image to square
  const imageBuffer = await processImageToSquare(sourceImagePath, SIZE);

  // Generate appropriate SVG overlay
  const svgOverlay = isCover
    ? generateCoverSlideSVG(SIZE, SIZE, { collection, name: options.seriesName, theme, totalSlides })
    : generateBrandedOverlaySVG(SIZE, SIZE, {
        collection,
        headlineWhite,
        headlineGold,
        subtext,
        theme,
        slideNumber,
        totalSlides
      });

  // Composite image with overlay
  await sharp(imageBuffer)
    .composite([
      {
        input: Buffer.from(svgOverlay),
        top: 0,
        left: 0
      }
    ])
    .jpeg({ quality: 95 })
    .toFile(outputPath);

  return outputPath;
}

// ═══════════════════════════════════════════════════════════════════
// CAROUSEL GENERATION
// ═══════════════════════════════════════════════════════════════════

async function generateCarousel(carouselConfig) {
  const { id, name, collection, theme, slides, caption, firstComment } = carouselConfig;
  const carouselDir = path.join(OUTPUT_DIR, id);

  if (!fs.existsSync(carouselDir)) {
    fs.mkdirSync(carouselDir, { recursive: true });
  }

  console.log(`\n${'═'.repeat(60)}`);
  console.log(`📸 Generating: ${name}`);
  console.log(`${'═'.repeat(60)}`);
  console.log(`   Collection: ${collection}`);
  console.log(`   Theme: ${theme}`);
  console.log(`   Slides: ${slides.length}`);

  const generatedSlides = [];

  for (let i = 0; i < slides.length; i++) {
    const slide = slides[i];
    const sourcePath = path.join(SOURCE_DIR, slide.image);

    if (!fs.existsSync(sourcePath)) {
      console.log(`   ⚠️ Missing: ${slide.image}`);
      continue;
    }

    const outputFilename = `slide_${String(i + 1).padStart(2, '0')}.jpg`;
    const outputPath = path.join(carouselDir, outputFilename);

    console.log(`   📷 Processing slide ${i + 1}: ${slide.headline.white} ${slide.headline.gold}`);

    await createBrandedSlide(sourcePath, outputPath, {
      collection,
      headlineWhite: slide.headline.white,
      headlineGold: slide.headline.gold,
      subtext: slide.subtext,
      theme,
      slideNumber: i + 1,
      totalSlides: slides.length,
      seriesName: name,
      isCover: i === 0
    });

    generatedSlides.push({
      index: i + 1,
      filename: outputFilename,
      path: outputPath,
      headline: `${slide.headline.white} ${slide.headline.gold}`,
      subtext: slide.subtext
    });

    console.log(`   ✅ Created: ${outputFilename}`);
  }

  // Save carousel metadata
  const metadata = {
    id,
    name,
    collection,
    theme,
    slides: generatedSlides,
    caption,
    firstComment,
    createdAt: new Date().toISOString()
  };

  const metadataPath = path.join(carouselDir, 'metadata.json');
  fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));

  console.log(`\n   ✅ Carousel complete: ${generatedSlides.length} slides`);
  console.log(`   📁 Output: ${carouselDir}`);

  return metadata;
}

// ═══════════════════════════════════════════════════════════════════
// MAIN EXECUTION
// ═══════════════════════════════════════════════════════════════════

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
║         📸 MASTERCLASS VIRAL CAROUSEL GENERATOR 📸                       ║
║                                                                          ║
║     Creating viral-worthy Instagram carousels with:                      ║
║     • CSS-inspired branding system                                       ║
║     • Professional typography overlays                                   ║
║     • Theme-based color grading                                          ║
║     • Optimized captions & hashtags                                      ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
  `);

  const results = [];

  for (const carousel of VIRAL_CAROUSELS) {
    try {
      const result = await generateCarousel(carousel);
      results.push(result);
    } catch (error) {
      console.error(`❌ Error generating ${carousel.name}: ${error.message}`);
    }
  }

  // Generate master index
  const masterIndex = {
    generated: new Date().toISOString(),
    totalCarousels: results.length,
    totalSlides: results.reduce((sum, r) => sum + r.slides.length, 0),
    carousels: results.map(r => ({
      id: r.id,
      name: r.name,
      slides: r.slides.length,
      path: path.join(OUTPUT_DIR, r.id)
    }))
  };

  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'master_index.json'),
    JSON.stringify(masterIndex, null, 2)
  );

  // Summary
  console.log(`
╔══════════════════════════════════════════════════════════════════════════╗
║                    CAROUSEL GENERATION COMPLETE                           ║
╠══════════════════════════════════════════════════════════════════════════╣`);

  results.forEach((r, i) => {
    console.log(`║  ${i + 1}. ${r.name.padEnd(25)} │ ${r.slides.length} slides │ ${r.theme}`);
  });

  console.log(`╠══════════════════════════════════════════════════════════════════════════╣
║  Total: ${results.length} carousels, ${masterIndex.totalSlides} slides                                    ║
║  Output: ${OUTPUT_DIR.slice(-50).padEnd(50)}     ║
╚══════════════════════════════════════════════════════════════════════════╝
  `);
}

main().catch(console.error);
