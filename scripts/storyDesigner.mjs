#!/usr/bin/env node

/**
 * VERALABS STORY DESIGNER
 * Ultra-creative, enchanting layouts with story-like impressions
 * Focused on: Boudoir, Midnight Muse, Golden Hour aesthetics
 */

import { execSync } from 'child_process';
import { readdirSync, existsSync, mkdirSync, writeFileSync } from 'fs';
import { join, basename } from 'path';

// ═══════════════════════════════════════════════════════════════════════════
// AESTHETIC THEMES
// ═══════════════════════════════════════════════════════════════════════════

const AESTHETICS = {
  boudoir: {
    name: 'Boudoir',
    mood: 'Intimate & Dreamy',
    colors: {
      primary: '#1a0a0a',      // Deep burgundy black
      secondary: '#2d1f1f',    // Warm dark
      accent: '#e8b4b8',       // Soft rose
      gold: '#d4a574',         // Warm gold
      cream: '#f5ebe0',        // Soft cream
    },
    quotes: [
      'Whispers of silk...',
      'Where shadows dance',
      'Softly unveiled',
      'In gentle light',
      'A moment suspended',
      'Between dreams',
      'Tender & bold',
      'Intimate hours',
    ],
    chapters: ['Dawn', 'Awakening', 'Reverie', 'Dusk'],
  },

  midnightMuse: {
    name: 'Midnight Muse',
    mood: 'Mysterious & Enchanting',
    colors: {
      primary: '#0a0a14',      // Deep midnight blue
      secondary: '#141428',    // Dark indigo
      accent: '#c9b8ff',       // Soft lavender
      gold: '#ffd700',         // Starlight gold
      silver: '#c0c0c0',       // Moonlight silver
    },
    quotes: [
      'When stars whisper...',
      'Moonlit secrets',
      'The night reveals',
      'Dancing with shadows',
      'Cosmic dreams',
      'Velvet darkness',
      'Starlit muse',
      'After midnight',
    ],
    chapters: ['Twilight', 'Midnight', 'Witching Hour', 'Pre-Dawn'],
  },

  goldenHour: {
    name: 'Golden Hour',
    mood: 'Warm & Ethereal',
    colors: {
      primary: '#1a1408',      // Deep amber black
      secondary: '#2d2410',    // Warm sepia
      accent: '#ffd89b',       // Soft gold
      gold: '#ffb347',         // Sunset orange
      cream: '#fff8e7',        // Warm white
    },
    quotes: [
      'Chasing the light...',
      'Sun-kissed dreams',
      'Liquid gold',
      'Fading warmth',
      'Golden whispers',
      'The magic hour',
      'Amber glow',
      'Before sunset',
    ],
    chapters: ['Sunrise', 'Morning Glow', 'Golden Peak', 'Sunset'],
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// CREATIVE LAYOUT TEMPLATES
// ═══════════════════════════════════════════════════════════════════════════

const LAYOUTS = {
  // Cinematic film strip style
  cinematicStrip: {
    name: 'Cinematic Strip',
    description: 'Widescreen film panels with sprocket holes',
    images: 3,
  },

  // Story chapter with large quote
  storyChapter: {
    name: 'Story Chapter',
    description: 'Single image with chapter number and poetic quote',
    images: 1,
  },

  // Dreamy overlapping collage
  dreamCollage: {
    name: 'Dream Collage',
    description: 'Overlapping transparent images like memories',
    images: 4,
  },

  // Mysterious partial reveal
  mysteryReveal: {
    name: 'Mystery Reveal',
    description: 'Dramatically cropped to create intrigue',
    images: 1,
  },

  // Diptych contrast narrative
  diptychStory: {
    name: 'Diptych Story',
    description: 'Two contrasting images telling a story',
    images: 2,
  },

  // Floating fragments with blur
  floatingFragments: {
    name: 'Floating Fragments',
    description: 'Scattered images floating in void',
    images: 5,
  },

  // Film contact sheet
  contactSheet: {
    name: 'Contact Sheet',
    description: 'Multiple frames like film negatives',
    images: 6,
  },

  // Triptych journey
  triptychJourney: {
    name: 'Triptych Journey',
    description: 'Three panels showing a visual journey',
    images: 3,
  },

  // Full bleed with text overlay
  poeticBleed: {
    name: 'Poetic Bleed',
    description: 'Full image with elegant text overlay',
    images: 1,
  },

  // Fragmented mirror
  fragmentedMirror: {
    name: 'Fragmented Mirror',
    description: 'Broken mirror effect with multiple reflections',
    images: 1,
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// OUTPUT CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════

const OUTPUT_DIR = '/home/ecolex/version1/veralabs-stories';
const TEMP_DIR = '/tmp/veralabs-story-temp';
const IMAGE_SOURCES = [
  '/home/ecolex/version1/tempimages/asset1.1',
  '/home/ecolex/version1/tempimages/asset2',
];

// ═══════════════════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

function ensureDir(dir) {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
}

function getImages(folder) {
  if (!existsSync(folder)) return [];
  return readdirSync(folder)
    .filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f))
    .filter(f => !f.startsWith('post')) // Exclude generated posts
    .map(f => join(folder, f));
}

function shuffleArray(arr) {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function exec(cmd) {
  try {
    execSync(cmd, { stdio: 'pipe' });
    return true;
  } catch (e) {
    console.error(`   ⚠️  Command failed: ${e.message}`);
    return false;
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// LAYOUT GENERATORS
// ═══════════════════════════════════════════════════════════════════════════

function createCinematicStrip(images, aesthetic, outputPath, number) {
  const theme = AESTHETICS[aesthetic];
  const quote = randomFrom(theme.quotes);
  const temp = `${TEMP_DIR}/cinema_${number}`;
  ensureDir(temp);

  // Create 1080x1080 canvas with cinematic bars
  const cmds = [
    // Base canvas
    `convert -size 1080x1080 xc:"${theme.colors.primary}" ${temp}/base.png`,

    // Add film grain texture
    `convert ${temp}/base.png -attenuate 0.15 +noise Gaussian ${temp}/base_grain.png`,

    // Process 3 images as widescreen panels (1080x250 each)
    ...images.slice(0, 3).map((img, i) =>
      `convert "${img}" -resize 1000x240^ -gravity center -extent 1000x240 -modulate 100,110,100 ${temp}/panel_${i}.png`
    ),

    // Add sprocket holes to sides
    `convert -size 1080x1080 xc:none \\
      -fill "${theme.colors.secondary}" \\
      -draw "roundrectangle 15,100 35,130 3,3" \\
      -draw "roundrectangle 15,200 35,230 3,3" \\
      -draw "roundrectangle 15,300 35,330 3,3" \\
      -draw "roundrectangle 15,400 35,430 3,3" \\
      -draw "roundrectangle 15,500 35,530 3,3" \\
      -draw "roundrectangle 15,600 35,630 3,3" \\
      -draw "roundrectangle 15,700 35,730 3,3" \\
      -draw "roundrectangle 15,800 35,830 3,3" \\
      -draw "roundrectangle 15,900 35,930 3,3" \\
      -draw "roundrectangle 1045,100 1065,130 3,3" \\
      -draw "roundrectangle 1045,200 1065,230 3,3" \\
      -draw "roundrectangle 1045,300 1065,330 3,3" \\
      -draw "roundrectangle 1045,400 1065,430 3,3" \\
      -draw "roundrectangle 1045,500 1065,530 3,3" \\
      -draw "roundrectangle 1045,600 1065,630 3,3" \\
      -draw "roundrectangle 1045,700 1065,730 3,3" \\
      -draw "roundrectangle 1045,800 1065,830 3,3" \\
      -draw "roundrectangle 1045,900 1065,930 3,3" \\
      ${temp}/sprockets.png`,

    // Composite panels onto base
    `convert ${temp}/base_grain.png \\
      ${temp}/panel_0.png -geometry +40+120 -composite \\
      ${temp}/panel_1.png -geometry +40+420 -composite \\
      ${temp}/panel_2.png -geometry +40+720 -composite \\
      ${temp}/sprockets.png -composite \\
      ${temp}/with_panels.png`,

    // Add text
    `convert ${temp}/with_panels.png \\
      -font Georgia -pointsize 28 -fill "${theme.colors.accent}" \\
      -gravity south -annotate +0+40 "${quote}" \\
      -font Helvetica -pointsize 14 -fill "${theme.colors.gold}" \\
      -gravity northeast -annotate +60+40 "VERALABS" \\
      -font Helvetica -pointsize 12 -fill "#666666" \\
      -gravity northwest -annotate +60+40 "35mm" \\
      "${outputPath}"`,
  ];

  cmds.forEach(cmd => exec(cmd));
  exec(`rm -rf ${temp}`);
}

function createStoryChapter(images, aesthetic, outputPath, number) {
  const theme = AESTHETICS[aesthetic];
  const quote = randomFrom(theme.quotes);
  const chapter = theme.chapters[number % theme.chapters.length];
  const chapterNum = String(number + 1).padStart(2, '0');
  const temp = `${TEMP_DIR}/chapter_${number}`;
  ensureDir(temp);

  const cmds = [
    // Process main image with vignette
    `convert "${images[0]}" -resize 1080x1080^ -gravity center -extent 1080x1080 \\
      -modulate 95,105,100 \\
      \\( +clone -fill black -colorize 100% -fill white -draw "circle 540,540 540,100" -blur 0x80 \\) \\
      -compose multiply -composite \\
      ${temp}/main.png`,

    // Add gradient overlay
    `convert ${temp}/main.png \\
      \\( -size 1080x1080 gradient:"${theme.colors.primary}80"-"transparent" -rotate 180 \\) \\
      -compose over -composite \\
      ${temp}/with_gradient.png`,

    // Add chapter number and text
    `convert ${temp}/with_gradient.png \\
      -font Helvetica -pointsize 100 -fill "${theme.colors.gold}40" \\
      -gravity northwest -annotate +60+60 "${chapterNum}" \\
      -font Georgia -pointsize 16 -fill "${theme.colors.accent}" \\
      -gravity northwest -annotate +65+170 "CHAPTER ${chapterNum}" \\
      -font Georgia-Italic -pointsize 42 -fill white \\
      -gravity southwest -annotate +60+120 "${chapter}" \\
      -font Georgia-Italic -pointsize 24 -fill "${theme.colors.cream}cc" \\
      -gravity southwest -annotate +60+80 "${quote}" \\
      -font Helvetica -pointsize 14 -fill "${theme.colors.gold}" \\
      -gravity southeast -annotate +60+60 "VERALABS · ${theme.name.toUpperCase()}" \\
      "${outputPath}"`,
  ];

  cmds.forEach(cmd => exec(cmd));
  exec(`rm -rf ${temp}`);
}

function createDreamCollage(images, aesthetic, outputPath, number) {
  const theme = AESTHETICS[aesthetic];
  const quote = randomFrom(theme.quotes);
  const temp = `${TEMP_DIR}/dream_${number}`;
  ensureDir(temp);

  // Process images with different opacities and positions
  const positions = [
    { x: -50, y: 0, opacity: 40, rotation: -5, size: '700x700' },
    { x: 350, y: -50, opacity: 50, rotation: 8, size: '600x600' },
    { x: 100, y: 400, opacity: 45, rotation: -3, size: '650x650' },
    { x: 450, y: 350, opacity: 55, rotation: 5, size: '550x550' },
  ];

  const cmds = [
    // Base canvas
    `convert -size 1080x1080 xc:"${theme.colors.primary}" ${temp}/base.png`,

    // Process each image
    ...images.slice(0, 4).map((img, i) => {
      const pos = positions[i];
      return `convert "${img}" -resize ${pos.size}^ -gravity center -extent ${pos.size} \\
        -modulate 100,90,100 -blur 0x1 \\
        -background none -rotate ${pos.rotation} \\
        -channel A -evaluate set ${pos.opacity}% +channel \\
        ${temp}/layer_${i}.png`;
    }),

    // Composite all layers
    `convert ${temp}/base.png \\
      ${positions.map((pos, i) => `${temp}/layer_${i}.png -geometry +${pos.x + 540}+${pos.y + 540} -composite`).join(' \\\n      ')} \\
      ${temp}/collage.png`,

    // Add dreamy glow
    `convert ${temp}/collage.png \\
      \\( +clone -blur 0x30 -modulate 100,120,100 \\) \\
      -compose screen -composite \\
      ${temp}/with_glow.png`,

    // Add text
    `convert ${temp}/with_glow.png \\
      -font Georgia-Italic -pointsize 48 -fill "${theme.colors.cream}dd" \\
      -gravity center -annotate +0+400 "${quote}" \\
      -font Helvetica -pointsize 14 -fill "${theme.colors.gold}" \\
      -gravity northeast -annotate +60+60 "VERALABS" \\
      -font Georgia -pointsize 18 -fill "${theme.colors.accent}" \\
      -gravity northwest -annotate +60+60 "${theme.name}" \\
      "${outputPath}"`,
  ];

  cmds.forEach(cmd => exec(cmd));
  exec(`rm -rf ${temp}`);
}

function createMysteryReveal(images, aesthetic, outputPath, number) {
  const theme = AESTHETICS[aesthetic];
  const quote = randomFrom(theme.quotes);
  const temp = `${TEMP_DIR}/mystery_${number}`;
  ensureDir(temp);

  const cmds = [
    // Create dramatically cropped image (focus on partial reveal)
    `convert "${images[0]}" -resize 1200x1200^ -gravity center -extent 1200x1200 \\
      -crop 1080x1080+60+60 +repage \\
      -modulate 90,110,100 \\
      ${temp}/cropped.png`,

    // Add heavy vignette for mystery
    `convert ${temp}/cropped.png \\
      \\( -size 1080x1080 radial-gradient:"transparent"-"${theme.colors.primary}" \\) \\
      -compose multiply -composite \\
      ${temp}/vignetted.png`,

    // Add noir gradient from bottom
    `convert ${temp}/vignetted.png \\
      \\( -size 1080x600 gradient:"${theme.colors.primary}"-"transparent" -rotate 180 \\) \\
      -gravity south -composite \\
      ${temp}/with_noir.png`,

    // Add mysterious text
    `convert ${temp}/with_noir.png \\
      -font Georgia-Italic -pointsize 56 -fill "${theme.colors.cream}" \\
      -gravity southwest -annotate +80+150 "${quote}" \\
      -font Helvetica -pointsize 12 -fill "${theme.colors.gold}aa" \\
      -gravity southwest -annotate +80+110 "— ${theme.name.toUpperCase()} SERIES" \\
      -font Helvetica -pointsize 14 -fill "${theme.colors.gold}" \\
      -gravity northeast -annotate +60+60 "VERALABS" \\
      "${outputPath}"`,
  ];

  cmds.forEach(cmd => exec(cmd));
  exec(`rm -rf ${temp}`);
}

function createDiptychStory(images, aesthetic, outputPath, number) {
  const theme = AESTHETICS[aesthetic];
  const quote = randomFrom(theme.quotes);
  const temp = `${TEMP_DIR}/diptych_${number}`;
  ensureDir(temp);

  const cmds = [
    // Base canvas
    `convert -size 1080x1080 xc:"${theme.colors.primary}" ${temp}/base.png`,

    // Process two images as panels
    `convert "${images[0]}" -resize 520x900^ -gravity center -extent 520x900 \\
      -modulate 95,100,100 ${temp}/left.png`,
    `convert "${images[1]}" -resize 520x900^ -gravity center -extent 520x900 \\
      -modulate 105,100,100 ${temp}/right.png`,

    // Add subtle borders
    `convert ${temp}/left.png -bordercolor "${theme.colors.gold}40" -border 2 ${temp}/left_border.png`,
    `convert ${temp}/right.png -bordercolor "${theme.colors.gold}40" -border 2 ${temp}/right_border.png`,

    // Composite panels with gap
    `convert ${temp}/base.png \\
      ${temp}/left_border.png -geometry +15+88 -composite \\
      ${temp}/right_border.png -geometry +541+88 -composite \\
      ${temp}/panels.png`,

    // Add connecting text in center gap
    `convert ${temp}/panels.png \\
      -font Georgia-Italic -pointsize 14 -fill "${theme.colors.accent}" \\
      -gravity center -annotate +0+0 "&" \\
      -font Georgia-Italic -pointsize 32 -fill white \\
      -gravity south -annotate +0+35 "${quote}" \\
      -font Helvetica -pointsize 14 -fill "${theme.colors.gold}" \\
      -gravity northeast -annotate +20+20 "VERALABS" \\
      -font Georgia -pointsize 14 -fill "${theme.colors.cream}aa" \\
      -gravity northwest -annotate +20+20 "${theme.name}" \\
      "${outputPath}"`,
  ];

  cmds.forEach(cmd => exec(cmd));
  exec(`rm -rf ${temp}`);
}

function createFloatingFragments(images, aesthetic, outputPath, number) {
  const theme = AESTHETICS[aesthetic];
  const quote = randomFrom(theme.quotes);
  const temp = `${TEMP_DIR}/float_${number}`;
  ensureDir(temp);

  // Floating fragment positions with rotation and size
  const fragments = [
    { x: 50, y: 100, w: 280, h: 350, rot: -8, shadow: 15 },
    { x: 380, y: 50, w: 320, h: 400, rot: 5, shadow: 20 },
    { x: 700, y: 180, w: 300, h: 380, rot: -3, shadow: 12 },
    { x: 150, y: 480, w: 340, h: 420, rot: 7, shadow: 18 },
    { x: 550, y: 520, w: 380, h: 450, rot: -5, shadow: 22 },
  ];

  const cmds = [
    // Dark base with subtle gradient
    `convert -size 1080x1080 \\
      gradient:"${theme.colors.primary}"-"${theme.colors.secondary}" \\
      ${temp}/base.png`,

    // Process each fragment
    ...images.slice(0, 5).map((img, i) => {
      const f = fragments[i];
      return `convert "${img}" -resize ${f.w}x${f.h}^ -gravity center -extent ${f.w}x${f.h} \\
        -bordercolor "${theme.colors.cream}" -border 8 \\
        -background none -rotate ${f.rot} \\
        \\( +clone -background "${theme.colors.primary}" -shadow 60x${f.shadow}+8+8 \\) \\
        +swap -background none -layers merge +repage \\
        ${temp}/frag_${i}.png`;
    }),

    // Composite all fragments
    `convert ${temp}/base.png \\
      ${fragments.map((f, i) => `${temp}/frag_${i}.png -geometry +${f.x}+${f.y} -composite`).join(' \\\n      ')} \\
      ${temp}/composed.png`,

    // Add soft overall glow
    `convert ${temp}/composed.png \\
      -modulate 100,95,100 \\
      ${temp}/final.png`,

    // Add text
    `convert ${temp}/final.png \\
      -font Georgia-Italic -pointsize 36 -fill "${theme.colors.accent}" \\
      -gravity south -annotate +0+40 "${quote}" \\
      -font Helvetica -pointsize 14 -fill "${theme.colors.gold}" \\
      -gravity northeast -annotate +40+40 "VERALABS" \\
      "${outputPath}"`,
  ];

  cmds.forEach(cmd => exec(cmd));
  exec(`rm -rf ${temp}`);
}

function createContactSheet(images, aesthetic, outputPath, number) {
  const theme = AESTHETICS[aesthetic];
  const temp = `${TEMP_DIR}/contact_${number}`;
  ensureDir(temp);

  const cmds = [
    // Dark film base
    `convert -size 1080x1080 xc:"${theme.colors.primary}" ${temp}/base.png`,

    // Process 6 images as contact frames (3x2 grid)
    ...images.slice(0, 6).map((img, i) =>
      `convert "${img}" -resize 320x440^ -gravity center -extent 320x440 \\
        -bordercolor "#1a1a1a" -border 3 \\
        -bordercolor "${theme.colors.cream}20" -border 1 \\
        ${temp}/frame_${i}.png`
    ),

    // Create frame number overlays
    ...Array(6).fill(0).map((_, i) =>
      `convert -size 320x440 xc:none \\
        -font Courier -pointsize 11 -fill "${theme.colors.gold}80" \\
        -gravity southwest -annotate +8+8 "${String(number * 6 + i + 1).padStart(2, '0')}A" \\
        -gravity southeast -annotate +8+8 "◀ ▶" \\
        ${temp}/num_${i}.png`
    ),

    // Composite grid
    `convert ${temp}/base.png \\
      ${temp}/frame_0.png -geometry +35+80 -composite \\
      ${temp}/num_0.png -geometry +35+80 -composite \\
      ${temp}/frame_1.png -geometry +380+80 -composite \\
      ${temp}/num_1.png -geometry +380+80 -composite \\
      ${temp}/frame_2.png -geometry +725+80 -composite \\
      ${temp}/num_2.png -geometry +725+80 -composite \\
      ${temp}/frame_3.png -geometry +35+555 -composite \\
      ${temp}/num_3.png -geometry +35+555 -composite \\
      ${temp}/frame_4.png -geometry +380+555 -composite \\
      ${temp}/num_4.png -geometry +380+555 -composite \\
      ${temp}/frame_5.png -geometry +725+555 -composite \\
      ${temp}/num_5.png -geometry +725+555 -composite \\
      ${temp}/grid.png`,

    // Add header text
    `convert ${temp}/grid.png \\
      -font Courier -pointsize 14 -fill "${theme.colors.gold}" \\
      -gravity north -annotate +0+25 "VERALABS · ${theme.name.toUpperCase()} · CONTACT SHEET ${String(number + 1).padStart(2, '0')}" \\
      -font Courier -pointsize 11 -fill "${theme.colors.accent}aa" \\
      -gravity south -annotate +0+25 "KODAK 5219  500T  VISION3" \\
      "${outputPath}"`,
  ];

  cmds.forEach(cmd => exec(cmd));
  exec(`rm -rf ${temp}`);
}

function createTriptychJourney(images, aesthetic, outputPath, number) {
  const theme = AESTHETICS[aesthetic];
  const quote = randomFrom(theme.quotes);
  const stages = ['Before', 'During', 'After'];
  const temp = `${TEMP_DIR}/triptych_${number}`;
  ensureDir(temp);

  const cmds = [
    // Base with gradient
    `convert -size 1080x1080 \\
      gradient:"${theme.colors.secondary}"-"${theme.colors.primary}" \\
      ${temp}/base.png`,

    // Process 3 vertical panels
    ...images.slice(0, 3).map((img, i) =>
      `convert "${img}" -resize 330x750^ -gravity center -extent 330x750 \\
        -modulate ${95 + i * 5},${100 + i * 5},100 \\
        ${temp}/panel_${i}.png`
    ),

    // Add labels to panels
    ...Array(3).fill(0).map((_, i) =>
      `convert ${temp}/panel_${i}.png \\
        -font Helvetica -pointsize 11 -fill "${theme.colors.gold}cc" \\
        -gravity south -annotate +0+15 "${stages[i].toUpperCase()}" \\
        ${temp}/labeled_${i}.png`
    ),

    // Composite panels with gaps
    `convert ${temp}/base.png \\
      ${temp}/labeled_0.png -geometry +30+130 -composite \\
      ${temp}/labeled_1.png -geometry +375+130 -composite \\
      ${temp}/labeled_2.png -geometry +720+130 -composite \\
      ${temp}/triptych.png`,

    // Add connecting lines and text
    `convert ${temp}/triptych.png \\
      -stroke "${theme.colors.gold}60" -strokewidth 1 \\
      -draw "line 365,505 370,505" \\
      -draw "line 710,505 715,505" \\
      -stroke none \\
      -font Georgia-Italic -pointsize 38 -fill white \\
      -gravity north -annotate +0+50 "${theme.name}" \\
      -font Georgia-Italic -pointsize 22 -fill "${theme.colors.accent}" \\
      -gravity south -annotate +0+55 "${quote}" \\
      -font Helvetica -pointsize 14 -fill "${theme.colors.gold}" \\
      -gravity southeast -annotate +30+25 "VERALABS" \\
      "${outputPath}"`,
  ];

  cmds.forEach(cmd => exec(cmd));
  exec(`rm -rf ${temp}`);
}

function createPoeticBleed(images, aesthetic, outputPath, number) {
  const theme = AESTHETICS[aesthetic];
  const quote = randomFrom(theme.quotes);
  const temp = `${TEMP_DIR}/poetic_${number}`;
  ensureDir(temp);

  const cmds = [
    // Full bleed image
    `convert "${images[0]}" -resize 1080x1080^ -gravity center -extent 1080x1080 \\
      -modulate 95,110,100 \\
      ${temp}/main.png`,

    // Add cinematic bars
    `convert ${temp}/main.png \\
      -fill "${theme.colors.primary}" \\
      -draw "rectangle 0,0 1080,80" \\
      -draw "rectangle 0,1000 1080,1080" \\
      ${temp}/with_bars.png`,

    // Add gradient overlay for text readability
    `convert ${temp}/with_bars.png \\
      \\( -size 1080x400 gradient:"transparent"-"${theme.colors.primary}ee" \\) \\
      -gravity south -composite \\
      ${temp}/with_gradient.png`,

    // Add elegant text
    `convert ${temp}/with_gradient.png \\
      -font Georgia-Italic -pointsize 64 -fill white \\
      -gravity center -annotate +0+350 "${quote}" \\
      -font Helvetica -pointsize 14 -fill "${theme.colors.gold}" \\
      -gravity north -annotate +0+30 "VERALABS  ·  ${theme.name.toUpperCase()}" \\
      -font Georgia -pointsize 12 -fill "${theme.colors.cream}88" \\
      -gravity south -annotate +0+30 "— ${theme.mood} —" \\
      "${outputPath}"`,
  ];

  cmds.forEach(cmd => exec(cmd));
  exec(`rm -rf ${temp}`);
}

function createFragmentedMirror(images, aesthetic, outputPath, number) {
  const theme = AESTHETICS[aesthetic];
  const quote = randomFrom(theme.quotes);
  const temp = `${TEMP_DIR}/mirror_${number}`;
  ensureDir(temp);

  // Create shattered mirror effect with multiple crops of same image
  const shards = [
    { x: 100, y: 50, w: 400, h: 500, cropX: 0, cropY: 0 },
    { x: 450, y: 100, w: 350, h: 450, cropX: 300, cropY: 50 },
    { x: 150, y: 520, w: 380, h: 480, cropX: 50, cropY: 400 },
    { x: 500, y: 480, w: 420, h: 520, cropX: 350, cropY: 350 },
    { x: 750, y: 200, w: 280, h: 350, cropX: 600, cropY: 150 },
  ];

  const cmds = [
    // Dark reflective base
    `convert -size 1080x1080 xc:"${theme.colors.primary}" \\
      -fill "${theme.colors.secondary}" \\
      -draw "polygon 0,0 1080,400 1080,1080 0,1080" \\
      ${temp}/base.png`,

    // Create shards from same image
    ...shards.map((s, i) =>
      `convert "${images[0]}" -resize 1200x1200^ -gravity center -extent 1200x1200 \\
        -crop ${s.w}x${s.h}+${s.cropX}+${s.cropY} +repage \\
        -modulate ${100 - i * 3},100,100 \\
        -bordercolor "${theme.colors.cream}40" -border 2 \\
        \\( +clone -background black -shadow 40x8+5+5 \\) +swap \\
        -background none -layers merge +repage \\
        ${temp}/shard_${i}.png`
    ),

    // Composite shards
    `convert ${temp}/base.png \\
      ${shards.map((s, i) => `${temp}/shard_${i}.png -geometry +${s.x}+${s.y} -composite`).join(' \\\n      ')} \\
      ${temp}/shattered.png`,

    // Add crack lines
    `convert ${temp}/shattered.png \\
      -stroke "${theme.colors.cream}30" -strokewidth 1 \\
      -draw "line 480,0 520,500" \\
      -draw "line 520,500 400,1080" \\
      -draw "line 520,500 700,400" \\
      -draw "line 700,400 800,0" \\
      -draw "line 700,400 1080,600" \\
      -stroke none \\
      ${temp}/with_cracks.png`,

    // Add text
    `convert ${temp}/with_cracks.png \\
      -font Georgia-Italic -pointsize 42 -fill "${theme.colors.cream}" \\
      -gravity south -annotate +0+80 "${quote}" \\
      -font Helvetica -pointsize 12 -fill "${theme.colors.gold}aa" \\
      -gravity south -annotate +0+50 "VERALABS · ${theme.name.toUpperCase()}" \\
      "${outputPath}"`,
  ];

  cmds.forEach(cmd => exec(cmd));
  exec(`rm -rf ${temp}`);
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN GENERATOR
// ═══════════════════════════════════════════════════════════════════════════

async function generate() {
  console.log(`
══════════════════════════════════════════════════════════════════════
   ✨ VERALABS STORY DESIGNER
   Ultra-Creative Enchanting Layouts
══════════════════════════════════════════════════════════════════════
`);

  ensureDir(OUTPUT_DIR);
  ensureDir(TEMP_DIR);

  // Collect all images
  let allImages = [];
  for (const source of IMAGE_SOURCES) {
    const imgs = getImages(source);
    allImages.push(...imgs);
    console.log(`   📂 ${basename(source)}: ${imgs.length} images`);
  }

  console.log(`\n   📊 Total source images: ${allImages.length}\n`);

  if (allImages.length < 6) {
    console.log('   ❌ Need at least 6 images to generate layouts');
    return;
  }

  // Shuffle images for variety
  allImages = shuffleArray(allImages);

  console.log('──────────────────────────────────────────────────────────────────────');
  console.log('🎨 GENERATING STORY POSTS');
  console.log('──────────────────────────────────────────────────────────────────────\n');

  const layouts = [
    { fn: createCinematicStrip, name: 'Cinematic Strip', images: 3 },
    { fn: createStoryChapter, name: 'Story Chapter', images: 1 },
    { fn: createDreamCollage, name: 'Dream Collage', images: 4 },
    { fn: createMysteryReveal, name: 'Mystery Reveal', images: 1 },
    { fn: createDiptychStory, name: 'Diptych Story', images: 2 },
    { fn: createFloatingFragments, name: 'Floating Fragments', images: 5 },
    { fn: createContactSheet, name: 'Contact Sheet', images: 6 },
    { fn: createTriptychJourney, name: 'Triptych Journey', images: 3 },
    { fn: createPoeticBleed, name: 'Poetic Bleed', images: 1 },
    { fn: createFragmentedMirror, name: 'Fragmented Mirror', images: 1 },
  ];

  const aesthetics = ['boudoir', 'midnightMuse', 'goldenHour'];
  let postNum = 1;
  let imageIndex = 0;

  const results = { boudoir: 0, midnightMuse: 0, goldenHour: 0 };

  // Generate 3 posts per layout per aesthetic = 90 posts
  // But we'll do 2 per layout per aesthetic = 60 posts to be reasonable
  for (const aesthetic of aesthetics) {
    const theme = AESTHETICS[aesthetic];
    console.log(`\n   🎭 ${theme.name.toUpperCase()} - ${theme.mood}`);
    console.log('   ─────────────────────────────────────────────');

    for (const layout of layouts) {
      for (let i = 0; i < 2; i++) {
        // Get required images
        const neededImages = layout.images;
        const selectedImages = [];

        for (let j = 0; j < neededImages; j++) {
          selectedImages.push(allImages[imageIndex % allImages.length]);
          imageIndex++;
        }

        const outputPath = join(OUTPUT_DIR,
          `story_${String(postNum).padStart(2, '0')}_${aesthetic}_${layout.name.toLowerCase().replace(/\s+/g, '_')}.jpg`
        );

        console.log(`   Creating: ${layout.name} #${i + 1}...`);

        try {
          layout.fn(selectedImages, aesthetic, outputPath, postNum);
          console.log(`   ✅ Post ${postNum}: ${layout.name}`);
          results[aesthetic]++;
          postNum++;
        } catch (e) {
          console.log(`   ⚠️  Failed: ${layout.name} - ${e.message}`);
        }
      }
    }
  }

  // Cleanup
  exec(`rm -rf ${TEMP_DIR}`);

  console.log(`
══════════════════════════════════════════════════════════════════════
   ✨ STORY POSTS GENERATED
══════════════════════════════════════════════════════════════════════

   📊 SUMMARY BY AESTHETIC
   ─────────────────────────────────────────
   Boudoir:        ${results.boudoir} posts
   Midnight Muse:  ${results.midnightMuse} posts
   Golden Hour:    ${results.goldenHour} posts
   ─────────────────────────────────────────
   TOTAL:          ${postNum - 1} story posts

   📁 Output: ${OUTPUT_DIR}

   🎨 LAYOUT STYLES USED:
      • Cinematic Strip - Film panel aesthetic
      • Story Chapter - Numbered chapters with quotes
      • Dream Collage - Overlapping memories
      • Mystery Reveal - Dramatic cropping
      • Diptych Story - Contrasting panels
      • Floating Fragments - Scattered polaroids
      • Contact Sheet - Film negative style
      • Triptych Journey - Three-panel narrative
      • Poetic Bleed - Full image with text
      • Fragmented Mirror - Shattered reflection

══════════════════════════════════════════════════════════════════════
`);
}

generate().catch(console.error);
