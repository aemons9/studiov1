#!/usr/bin/env node
/**
 * VERALABS AI Studio - Complete CLI with All Modes
 *
 * Usage: node veralabs-complete-cli.mjs
 * All output: CLIimages/
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';
import readline from 'readline';

// Configuration
const CLI_OUTPUT_DIR = '/home/ecolex/version1/CLIimages';
const PROXY_URL = 'http://localhost:3001';
const FFMPEG = '/home/ecolex/version1/node_modules/@ffmpeg-installer/linux-x64/ffmpeg';
const MUSIC_DIR = '/home/ecolex/version1/veralabs-music';

// Ensure output directory
if (!existsSync(CLI_OUTPUT_DIR)) {
  mkdirSync(CLI_OUTPUT_DIR, { recursive: true });
}

// Readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Utilities
const question = (query) => new Promise(resolve => rl.question(query, resolve));
const log = (msg) => console.log(msg);
const clear = () => console.log('\x1b[2J\x1b[0f');

// Colors
const color = {
  reset: '\x1b[0m', bright: '\x1b[1m', dim: '\x1b[2m',
  cyan: '\x1b[36m', green: '\x1b[32m', yellow: '\x1b[33m',
  red: '\x1b[31m', magenta: '\x1b[35m', blue: '\x1b[34m'
};

// Data definitions
const MODELS = {
  hourglass: ['hourglassPrimary', 'hourglassCurves', 'hourglassSensual', 'indianHourglassMuse'],
  indian: ['aishaDecolletage', 'priyaCurves', 'zaraHarmony', 'simranCinema', 'meeraAthletic'],
  platinum: ['midnightSeductress', 'fitnessBombshell', 'graphicEditorialQueen', 'spaTubTemptress', 'undergroundClubSiren'],
  classic: ['classic', 'sultry', 'playful', 'mysterious', 'powerful']
};

const WARDROBES = [
  'champagneLace', 'blackMesh', 'burgundySilk', 'geometricStraps', 'sheerChiffon',
  'silkKimonoRobe', 'luxurySportsBra', 'neonMeshBodysuit', 'artisticFabricDraping',
  'wetSilkCamisole', 'goldenBodyChains', 'shadowLace'
];

const ENVIRONMENTS = [
  'luxuryBoudoir', 'penthouseNight', 'goldenHourStudio', 'midnightPool',
  'heritageHaveli', 'mountainCabin', 'vipLounge', 'modernExecutiveOffice',
  'infiniteWhiteVoid', 'roomOfMirrors'
];

const REEL_THEMES = [
  { id: 1, name: 'Big Nudes (B&W Newton)', value: 'bigNudes' },
  { id: 2, name: 'Champagne Luxury', value: 'champagneLuxury' },
  { id: 3, name: 'Golden Sensual', value: 'goldenSensual' },
  { id: 4, name: 'Midnight Mystery', value: 'midnightMystery' },
  { id: 5, name: 'Boudoir Glow', value: 'boudoirGlow' },
];

const KEN_BURNS = [
  { id: 1, name: 'Slow Zoom In', value: 'slowZoomIn' },
  { id: 2, name: 'Slow Zoom Out', value: 'slowZoomOut' },
  { id: 3, name: 'Pan Left to Right', value: 'panLeftToRight' },
  { id: 4, name: 'Pan Right to Left', value: 'panRightToLeft' },
  { id: 5, name: 'Diagonal Drift', value: 'diagonalDrift' },
  { id: 6, name: 'Face Zoom', value: 'faceZoom' },
];

// Helper functions
async function getOAuthToken() {
  try {
    const response = await fetch(`${PROXY_URL}/api/gcloud-token`);
    if (!response.ok) throw new Error('Failed');
    const data = await response.json();
    return data.token;
  } catch (error) {
    return null;
  }
}

async function getProjectId() {
  try {
    const response = await fetch(`${PROXY_URL}/api/gcloud-project`);
    if (!response.ok) throw new Error('Failed');
    const data = await response.json();
    return data.projectId;
  } catch (error) {
    return null;
  }
}

function loadEnvCredentials() {
  try {
    const envPath = join(process.cwd(), '.env.local');
    if (!existsSync(envPath)) return {};

    const envContent = readFileSync(envPath, 'utf8');
    const credentials = {};

    envContent.split('\n').forEach(line => {
      const match = line.match(/^([^#=]+)=(.*)$/);
      if (match) {
        const key = match[1].trim();
        const value = match[2].trim();
        credentials[key] = value;
      }
    });

    return credentials;
  } catch (error) {
    return {};
  }
}

// Banner
function showBanner() {
  clear();
  console.log(`
${color.cyan}╔════════════════════════════════════════════════════════════════════╗
║                                                                    ║
║  ${color.bright}██╗   ██╗███████╗██████╗  █████╗ ██╗      █████╗ ██████╗ ███████╗${color.reset}${color.cyan}  ║
║  ${color.bright}██║   ██║██╔════╝██╔══██╗██╔══██╗██║     ██╔══██╗██╔══██╗██╔════╝${color.reset}${color.cyan}  ║
║  ${color.bright}██║   ██║█████╗  ██████╔╝███████║██║     ███████║██████╔╝███████╗${color.reset}${color.cyan}  ║
║  ${color.bright}╚██╗ ██╔╝██╔══╝  ██╔══██╗██╔══██║██║     ██╔══██║██╔══██╗╚════██║${color.reset}${color.cyan}  ║
║   ${color.bright}╚████╔╝ ███████╗██║  ██║██║  ██║███████╗██║  ██║██████╔╝███████║${color.reset}${color.cyan}  ║
║    ${color.bright}╚═══╝  ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═════╝ ╚══════╝${color.reset}${color.cyan}  ║
║                                                                    ║
║              ${color.magenta}AI Studio - Command Line Interface${color.reset}${color.cyan}                 ║
║                  ${color.dim}Complete Professional Edition${color.reset}${color.cyan}                  ║
║                                                                    ║
╚════════════════════════════════════════════════════════════════════╝${color.reset}
`);
}

// Main Menu
async function showMainMenu() {
  showBanner();
  console.log(`
${color.bright}═══ MAIN MENU - ALL MODES AVAILABLE ═══${color.reset}

${color.green}[1]${color.reset}  Main Generation Mode       ${color.dim}(Imagen 4 & Ultra)${color.reset}
${color.green}[2]${color.reset}  Vera Mode                  ${color.dim}(Gemini + Imagen Ultra)${color.reset}
${color.green}[3]${color.reset}  Reels Studio Mode          ${color.dim}(Ken Burns + Helmut Newton)${color.reset}
${color.green}[4]${color.reset}  Instagram Mode             ${color.dim}(Publish to Instagram)${color.reset}
${color.green}[5]${color.reset}  Platinum Mode              ${color.dim}(10 Premium Models)${color.reset}
${color.green}[6]${color.reset}  Roleplay Mode              ${color.dim}(Indian Models Gallery)${color.reset}
${color.green}[7]${color.reset}  Artistic Mode              ${color.dim}(Fine Art Generation)${color.reset}
${color.green}[8]${color.reset}  Visual Novel Mode          ${color.dim}(VN Asset Generator)${color.reset}
${color.green}[9]${color.reset}  Experimental Mode          ${color.dim}(Cutting-Edge Concepts)${color.reset}
${color.green}[10]${color.reset} MasterClass Mode           ${color.dim}(Elite Collection)${color.reset}
${color.green}[11]${color.reset} Corporate Mode             ${color.dim}(Professional Headshots)${color.reset}
${color.green}[12]${color.reset} Video Generation Mode      ${color.dim}(Veo 3.1 Videos)${color.reset}

${color.yellow}[S]${color.reset}  System Status  ${color.yellow}[H]${color.reset}  Help  ${color.yellow}[Q]${color.reset}  Quit

${color.bright}Output:${color.reset} ${color.cyan}${CLI_OUTPUT_DIR}${color.reset}
`);

  const choice = await question(`${color.bright}Select mode:${color.reset} `);
  return choice.trim().toLowerCase();
}

// MODE 3: Reels Studio
async function reelsStudioMode() {
  clear();
  log(`${color.bright}═══ REELS STUDIO MODE ═══${color.reset}\n`);
  log(`${color.cyan}Professional reel creation with Ken Burns effects\n${color.reset}`);

  // Select theme
  log(`${color.bright}Select Color Grading Theme:${color.reset}`);
  REEL_THEMES.forEach(t => log(`${color.green}[${t.id}]${color.reset} ${t.name}`));
  const themeChoice = await question(`\n${color.bright}Theme [default: 1]:${color.reset} `) || '1';
  const theme = REEL_THEMES.find(t => t.id === parseInt(themeChoice))?.value || 'bigNudes';

  // Select Ken Burns effect
  log(`\n${color.bright}Select Ken Burns Motion:${color.reset}`);
  KEN_BURNS.forEach(k => log(`${color.green}[${k.id}]${color.reset} ${k.name}`));
  const motionChoice = await question(`\n${color.bright}Motion [default: 1]:${color.reset} `) || '1';
  const motion = KEN_BURNS.find(k => k.id === parseInt(motionChoice))?.value || 'slowZoomIn';

  // Get prompt for image generation
  const prompt = await question(`\n${color.bright}Enter prompt for image:${color.reset} `);
  if (!prompt.trim()) {
    log(`${color.red}✗ Prompt required${color.reset}`);
    await question('Press Enter...');
    return;
  }

  log(`\n${color.yellow}⏳ Step 1: Generating image...${color.reset}`);

  try {
    const token = await getOAuthToken();
    const projectId = await getProjectId();
    if (!token || !projectId) throw new Error('Credentials failed');

    // Generate image
    const imageResponse = await fetch(`https://us-central1-aiplatform.googleapis.com/v1/projects/${projectId}/locations/us-central1/publishers/google/models/imagen-4.0-ultra-generate-001:predict`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        instances: [{ prompt }],
        parameters: { sampleCount: 1, aspectRatio: '9:16', outputMimeType: 'image/jpeg' }
      }),
    });

    if (!imageResponse.ok) throw new Error('Image generation failed');

    const imageData = await imageResponse.json();
    const imageBase64 = imageData.predictions[0].bytesBase64Encoded;

    // Save temp image
    const timestamp = Date.now();
    const tempImagePath = join(CLI_OUTPUT_DIR, `temp_${timestamp}.jpg`);
    const imageBuffer = Buffer.from(imageBase64, 'base64');
    writeFileSync(tempImagePath, imageBuffer);

    log(`${color.green}✓ Image generated${color.reset}`);

    // Create reel via proxy
    log(`\n${color.yellow}⏳ Step 2: Creating professional reel...${color.reset}`);

    const reelResponse = await fetch(`${PROXY_URL}/api/reels/create-professional`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        imageUrl: `data:image/jpeg;base64,${imageBase64}`,
        duration: 8,
        theme,
        kenBurnsEffect: motion,
        addBranding: true,
        filmGrain: true,
        musicTrack: null
      })
    });

    if (!reelResponse.ok) {
      const error = await reelResponse.text();
      throw new Error(`Reel creation failed: ${error}`);
    }

    const reelData = await reelResponse.json();

    if (reelData.videoUrl) {
      // Download reel
      const filename = `reel_${theme}_${timestamp}.mp4`;
      const filepath = join(CLI_OUTPUT_DIR, filename);

      if (reelData.videoUrl.startsWith('data:')) {
        const base64Data = reelData.videoUrl.split(',')[1];
        const videoBuffer = Buffer.from(base64Data, 'base64');
        writeFileSync(filepath, videoBuffer);
      } else if (reelData.videoUrl.startsWith('http://localhost')) {
        const videoResponse = await fetch(reelData.videoUrl);
        const videoBuffer = Buffer.from(await videoResponse.arrayBuffer());
        writeFileSync(filepath, videoBuffer);
      }

      log(`\n${color.green}✓ Reel created successfully!${color.reset}`);
      log(`${color.cyan}File:${color.reset} ${filename} ${color.dim}(${(Buffer.byteLength(readFileSync(filepath)) / (1024 * 1024)).toFixed(2)} MB)${color.reset}`);
      log(`${color.cyan}Theme:${color.reset} ${theme}`);
      log(`${color.cyan}Motion:${color.reset} ${motion}`);
    }

  } catch (error) {
    log(`\n${color.red}✗ Reel creation failed: ${error.message}${color.reset}`);
  }

  await question(`\n${color.dim}Press Enter...${color.reset}`);
}

// MODE 4: Instagram Mode
async function instagramMode() {
  clear();
  log(`${color.bright}═══ INSTAGRAM MODE ═══${color.reset}\n`);

  log(`${color.cyan}What would you like to publish?${color.reset}
${color.green}[1]${color.reset} Generate & Publish Image
${color.green}[2]${color.reset} Publish Existing Image
${color.green}[3]${color.reset} Publish Existing Reel
${color.yellow}[B]${color.reset} Back
`);

  const choice = await question(`${color.bright}Select:${color.reset} `);
  if (choice.toLowerCase() === 'b') return;

  const credentials = loadEnvCredentials();
  const INSTAGRAM_TOKEN = credentials.INSTAGRAM_TOKEN || credentials.VITE_INSTAGRAM_TOKEN;
  const INSTAGRAM_ACCOUNT_ID = credentials.INSTAGRAM_ACCOUNT_ID || credentials.VITE_INSTAGRAM_ACCOUNT_ID || '17841478517688462';
  const GITHUB_TOKEN = credentials.GITHUB_TOKEN || credentials.VITE_GITHUB_TOKEN;

  if (!INSTAGRAM_TOKEN || !GITHUB_TOKEN) {
    log(`${color.red}✗ Instagram/GitHub tokens not found in .env.local${color.reset}`);
    await question('Press Enter...');
    return;
  }

  if (choice === '3') {
    // Publish existing reel
    const files = readdirSync(CLI_OUTPUT_DIR).filter(f => f.endsWith('.mp4'));
    if (files.length === 0) {
      log(`${color.red}✗ No reels found in ${CLI_OUTPUT_DIR}${color.reset}`);
      await question('Press Enter...');
      return;
    }

    log(`\n${color.cyan}Available Reels:${color.reset}`);
    files.forEach((f, i) => log(`${color.green}[${i + 1}]${color.reset} ${f}`));

    const fileChoice = await question(`\n${color.bright}Select reel:${color.reset} `);
    const selectedFile = files[parseInt(fileChoice) - 1];
    if (!selectedFile) return;

    const caption = await question(`\n${color.bright}Enter caption:${color.reset} `);

    log(`\n${color.yellow}⏳ Publishing reel...${color.reset}`);

    try {
      // Upload to GitHub
      const videoPath = join(CLI_OUTPUT_DIR, selectedFile);
      const videoBuffer = readFileSync(videoPath);
      const videoBase64 = videoBuffer.toString('base64');
      const timestamp = Date.now();
      const filename = `cli_reel_${timestamp}.mp4`;

      const uploadResponse = await fetch(`${PROXY_URL}/api/instagram/upload-to-github`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          githubToken: GITHUB_TOKEN,
          imageData: videoBase64,
          filename,
          owner: 'aemons9',
          repo: 'studiov1',
          pathPrefix: 'photo/reels'
        })
      });

      if (!uploadResponse.ok) throw new Error('GitHub upload failed');

      const uploadData = await uploadResponse.json();
      log(`${color.green}✓ Uploaded to CDN${color.reset}`);

      // Publish to Instagram
      const publishResponse = await fetch(`${PROXY_URL}/api/instagram/publish-reel`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          accessToken: INSTAGRAM_TOKEN,
          videoUrl: uploadData.publicUrl,
          caption,
          shareToFeed: true,
          instagramAccountId: INSTAGRAM_ACCOUNT_ID
        })
      });

      if (!publishResponse.ok) {
        const error = await publishResponse.text();
        throw new Error(`Publish failed: ${error}`);
      }

      const publishData = await publishResponse.json();
      log(`\n${color.green}✓ Published to Instagram!${color.reset}`);
      log(`${color.cyan}Post ID:${color.reset} ${publishData.id}`);

    } catch (error) {
      log(`\n${color.red}✗ Publishing failed: ${error.message}${color.reset}`);
    }
  }

  await question(`\n${color.dim}Press Enter...${color.reset}`);
}

// MODE 5: Platinum Mode
async function platinumMode() {
  clear();
  log(`${color.bright}═══ PLATINUM MODE - Premium Collection ═══${color.reset}\n`);

  log(`${color.cyan}Select Platinum Model:${color.reset}`);
  MODELS.platinum.forEach((m, i) => log(`${color.green}[${i + 1}]${color.reset} ${m}`));

  const modelChoice = await question(`\n${color.bright}Model [default: 1]:${color.reset} `) || '1';
  const model = MODELS.platinum[parseInt(modelChoice) - 1] || MODELS.platinum[0];

  const idea = await question(`\n${color.bright}Enter creative concept:${color.reset} `);
  if (!idea.trim()) return;

  log(`\n${color.yellow}⏳ Generating with Imagen 4 Ultra...${color.reset}`);

  try {
    const token = await getOAuthToken();
    const projectId = await getProjectId();
    if (!token || !projectId) throw new Error('Credentials failed');

    const prompt = `${model} model: ${idea}. High-end platinum collection photography, ultra luxurious, editorial quality, 8K detail`;

    const response = await fetch(`https://us-central1-aiplatform.googleapis.com/v1/projects/${projectId}/locations/us-central1/publishers/google/models/imagen-4.0-ultra-generate-001:predict`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        instances: [{ prompt }],
        parameters: { sampleCount: 2, aspectRatio: '9:16', outputMimeType: 'image/jpeg' }
      }),
    });

    if (!response.ok) throw new Error('Generation failed');

    const data = await response.json();
    const predictions = data.predictions || [];

    log(`\n${color.green}✓ Generated ${predictions.length} image(s)${color.reset}\n`);

    predictions.forEach((pred, index) => {
      const timestamp = Date.now();
      const filename = `platinum_${model}_${timestamp}_${index + 1}.jpg`;
      const filepath = join(CLI_OUTPUT_DIR, filename);

      const imageBuffer = Buffer.from(pred.bytesBase64Encoded, 'base64');
      writeFileSync(filepath, imageBuffer);

      log(`${color.cyan}[${index + 1}]${color.reset} ${filename} ${color.dim}(${(imageBuffer.length / 1024).toFixed(1)} KB)${color.reset}`);
    });

    log(`\n${color.green}✓ Saved to: ${CLI_OUTPUT_DIR}${color.reset}`);

  } catch (error) {
    log(`\n${color.red}✗ Generation failed: ${error.message}${color.reset}`);
  }

  await question(`\n${color.dim}Press Enter...${color.reset}`);
}

// MODE 8: Visual Novel Mode
async function visualNovelMode() {
  clear();
  log(`${color.bright}═══ VISUAL NOVEL MODE ═══${color.reset}\n`);

  log(`${color.cyan}Asset Type:${color.reset}
${color.green}[1]${color.reset} Character Sprite
${color.green}[2]${color.reset} Background Scene
${color.green}[3]${color.reset} CG Event
${color.yellow}[B]${color.reset} Back
`);

  const typeChoice = await question(`${color.bright}Select:${color.reset} `);
  if (typeChoice.toLowerCase() === 'b') return;

  const assetTypes = { '1': 'sprite', '2': 'background', '3': 'cg' };
  const assetType = assetTypes[typeChoice] || 'sprite';

  const description = await question(`\n${color.bright}Describe the ${assetType}:${color.reset} `);
  if (!description.trim()) return;

  const aspectRatios = { sprite: '3:4', background: '16:9', cg: '16:9' };
  const aspectRatio = aspectRatios[assetType];

  log(`\n${color.yellow}⏳ Generating VN asset...${color.reset}`);

  try {
    const token = await getOAuthToken();
    const projectId = await getProjectId();
    if (!token || !projectId) throw new Error('Credentials failed');

    const prompt = `Visual novel ${assetType}: ${description}. Anime/manga style, high detail, clean lines, professional VN quality`;

    const response = await fetch(`https://us-central1-aiplatform.googleapis.com/v1/projects/${projectId}/locations/us-central1/publishers/google/models/imagen-4.0-generate-001:predict`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        instances: [{ prompt }],
        parameters: { sampleCount: 1, aspectRatio, outputMimeType: 'image/jpeg' }
      }),
    });

    if (!response.ok) throw new Error('Generation failed');

    const data = await response.json();
    const imageBase64 = data.predictions[0].bytesBase64Encoded;

    const timestamp = Date.now();
    const filename = `vn_${assetType}_${timestamp}.jpg`;
    const filepath = join(CLI_OUTPUT_DIR, filename);

    const imageBuffer = Buffer.from(imageBase64, 'base64');
    writeFileSync(filepath, imageBuffer);

    log(`\n${color.green}✓ VN asset created!${color.reset}`);
    log(`${color.cyan}Type:${color.reset} ${assetType}`);
    log(`${color.cyan}File:${color.reset} ${filename}`);

  } catch (error) {
    log(`\n${color.red}✗ Generation failed: ${error.message}${color.reset}`);
  }

  await question(`\n${color.dim}Press Enter...${color.reset}`);
}

// Simplified modes (quick implementations)
async function roleplayMode() {
  clear();
  log(`${color.bright}═══ ROLEPLAY MODE - Indian Models Gallery ═══${color.reset}\n`);

  log(`${color.cyan}Select Model:${color.reset}`);
  MODELS.indian.forEach((m, i) => log(`${color.green}[${i + 1}]${color.reset} ${m}`));

  const modelChoice = await question(`\n${color.bright}Model:${color.reset} `) || '1';
  const model = MODELS.indian[parseInt(modelChoice) - 1] || MODELS.indian[0];

  const scene = await question(`${color.bright}Scene description:${color.reset} `);
  if (!scene.trim()) return;

  await generateWithModel(model, scene, '9:16');
}

async function artisticMode() {
  clear();
  log(`${color.bright}═══ ARTISTIC MODE - Fine Art Generation ═══${color.reset}\n`);

  const concept = await question(`${color.bright}Artistic concept:${color.reset} `);
  if (!concept.trim()) return;

  const prompt = `Fine art photography: ${concept}. Avant-garde, artistic nude, museum quality, conceptual`;
  await generateWithModel('artistic', prompt, '3:4');
}

async function experimentalMode() {
  clear();
  log(`${color.bright}═══ EXPERIMENTAL MODE - Cutting Edge ═══${color.reset}\n`);

  const experiment = await question(`${color.bright}Experimental concept:${color.reset} `);
  if (!experiment.trim()) return;

  const prompt = `Experimental cutting-edge concept: ${experiment}. Beta features, innovative, boundary-pushing`;
  await generateWithModel('experimental', prompt, '16:9');
}

async function masterclassMode() {
  clear();
  log(`${color.bright}═══ MASTERCLASS MODE - Elite Collection ═══${color.reset}\n`);

  const elite = await question(`${color.bright}Elite concept:${color.reset} `);
  if (!elite.trim()) return;

  const prompt = `Elite masterclass photography: ${elite}. Ultimate quality, premium collection, world-class`;
  await generateWithModel('masterclass', prompt, '9:16');
}

async function corporateMode() {
  clear();
  log(`${color.bright}═══ CORPORATE MODE - Professional Headshots ═══${color.reset}\n`);

  const style = await question(`${color.bright}Professional style:${color.reset} `);
  if (!style.trim()) return;

  const prompt = `Professional corporate photography: ${style}. Business headshot, executive style, professional lighting`;
  await generateWithModel('corporate', prompt, '3:4');
}

// Generic generator
async function generateWithModel(model, prompt, aspectRatio) {
  log(`\n${color.yellow}⏳ Generating with Imagen 4...${color.reset}`);

  try {
    const token = await getOAuthToken();
    const projectId = await getProjectId();
    if (!token || !projectId) throw new Error('Credentials failed');

    const response = await fetch(`https://us-central1-aiplatform.googleapis.com/v1/projects/${projectId}/locations/us-central1/publishers/google/models/imagen-4.0-generate-001:predict`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        instances: [{ prompt }],
        parameters: { sampleCount: 1, aspectRatio, outputMimeType: 'image/jpeg' }
      }),
    });

    if (!response.ok) throw new Error('Generation failed');

    const data = await response.json();
    const imageBase64 = data.predictions[0].bytesBase64Encoded;

    const timestamp = Date.now();
    const filename = `${model}_${timestamp}.jpg`;
    const filepath = join(CLI_OUTPUT_DIR, filename);

    const imageBuffer = Buffer.from(imageBase64, 'base64');
    writeFileSync(filepath, imageBuffer);

    log(`\n${color.green}✓ Generated!${color.reset}`);
    log(`${color.cyan}File:${color.reset} ${filename}`);

  } catch (error) {
    log(`\n${color.red}✗ Failed: ${error.message}${color.reset}`);
  }

  await question(`\n${color.dim}Press Enter...${color.reset}`);
}

// System Status
async function checkSystemStatus() {
  clear();
  console.log(`${color.bright}═══ SYSTEM STATUS ═══${color.reset}\n`);

  // Check proxy server
  log(`${color.dim}Checking proxy server...${color.reset}`);
  try {
    const response = await fetch(`${PROXY_URL}/health`, { timeout: 5000 });
    if (response.ok) {
      log(`${color.green}✓ Proxy server${color.reset} (${PROXY_URL})`);
    } else {
      log(`${color.red}✗ Proxy server unreachable${color.reset}`);
    }
  } catch (error) {
    log(`${color.red}✗ Proxy server offline${color.reset}`);
  }

  // Check OAuth token
  log(`\n${color.dim}Checking OAuth credentials...${color.reset}`);
  const token = await getOAuthToken();
  if (token) {
    log(`${color.green}✓ OAuth token${color.reset} (valid)`);
  } else {
    log(`${color.red}✗ OAuth token${color.reset} (failed)`);
  }

  // Check project ID
  const projectId = await getProjectId();
  if (projectId) {
    log(`${color.green}✓ GCP Project${color.reset} (${projectId})`);
  } else {
    log(`${color.red}✗ GCP Project${color.reset} (failed)`);
  }

  // Check Instagram credentials
  log(`\n${color.dim}Checking Instagram credentials...${color.reset}`);
  try {
    const envPath = join(process.cwd(), '.env.local');
    if (existsSync(envPath)) {
      const envContent = readFileSync(envPath, 'utf8');
      const hasInstaToken = envContent.includes('INSTAGRAM_TOKEN');
      const hasInstaAccount = envContent.includes('INSTAGRAM_ACCOUNT_ID');
      const hasGithubToken = envContent.includes('GITHUB_TOKEN');

      if (hasInstaToken) log(`${color.green}✓ Instagram token${color.reset}`);
      if (hasInstaAccount) log(`${color.green}✓ Instagram account ID${color.reset}`);
      if (hasGithubToken) log(`${color.green}✓ GitHub token${color.reset}`);
    } else {
      log(`${color.yellow}⚠ .env.local not found${color.reset}`);
    }
  } catch (error) {
    log(`${color.yellow}⚠ Error checking credentials${color.reset}`);
  }

  log(`\n${color.cyan}Output Directory:${color.reset} ${CLI_OUTPUT_DIR}`);
  await question(`\n${color.dim}Press Enter to continue...${color.reset}`);
}

// Help
async function showHelp() {
  clear();
  console.log(`${color.bright}═══ HELP & SHORTCUTS ═══${color.reset}

${color.cyan}Quick Navigation:${color.reset}
  ${color.green}1-12${color.reset}   Select mode by number
  ${color.green}s${color.reset}      System status
  ${color.green}h${color.reset}      This help screen
  ${color.green}q${color.reset}      Quit application
  ${color.green}0${color.reset}      Return to main menu (within modes)

${color.cyan}Mode Shortcuts:${color.reset}
  ${color.green}m${color.reset}      Main Generation Mode
  ${color.green}v${color.reset}      Vera Mode
  ${color.green}r${color.reset}      Reels Studio Mode
  ${color.green}i${color.reset}      Instagram Mode
  ${color.green}p${color.reset}      Platinum Mode
  ${color.green}vn${color.reset}     Visual Novel Mode
  ${color.green}ex${color.reset}     Experimental Mode

${color.cyan}Generation Options:${color.reset}
  ${color.green}quick${color.reset}  Quick generation with defaults
  ${color.green}ultra${color.reset}  Ultra quality mode
  ${color.green}batch${color.reset}  Batch generation mode

${color.cyan}Output Management:${color.reset}
  All images save to: ${color.cyan}${CLI_OUTPUT_DIR}${color.reset}
  Filename format: ${color.dim}[mode]_[timestamp]_[id].jpg${color.reset}

${color.cyan}Tips:${color.reset}
  • Proxy server must be running (node proxy-server.js)
  • OAuth tokens auto-refresh via proxy
  • Use number keys for quick selection
  • Press Enter to use default values

${color.dim}Press Enter to continue...${color.reset}`);
  await question('');
}

// Mode 1: Main Generation Mode
async function mainGenerationMode() {
  clear();
  console.log(`${color.bright}═══ MAIN GENERATION MODE ═══${color.reset}\n`);

  log(`${color.cyan}Available Models:${color.reset}
${color.green}[1]${color.reset} Imagen 4 Standard
${color.green}[2]${color.reset} Imagen 4 Ultra
${color.yellow}[0]${color.reset} Back to main menu
`);

  const modelChoice = await question(`${color.bright}Select model:${color.reset} `);

  if (modelChoice === '0') return;

  const model = modelChoice === '2' ? 'imagen-4.0-ultra-generate-001' : 'imagen-4.0-generate-001';

  // Get prompt
  const prompt = await question(`\n${color.bright}Enter prompt:${color.reset} `);
  if (!prompt.trim()) {
    log(`${color.red}✗ Prompt cannot be empty${color.reset}`);
    await question('Press Enter...');
    return;
  }

  // Aspect ratio
  log(`\n${color.cyan}Aspect Ratio:${color.reset}
${color.green}[1]${color.reset} 1:1 (Square)
${color.green}[2]${color.reset} 9:16 (Portrait)
${color.green}[3]${color.reset} 16:9 (Landscape)
${color.green}[4]${color.reset} 3:4 (Portrait)
${color.green}[5]${color.reset} 4:3 (Landscape)
`);

  const aspectChoice = await question(`${color.bright}Select aspect ratio [default: 2]:${color.reset} `) || '2';
  const aspectRatios = { '1': '1:1', '2': '9:16', '3': '16:9', '4': '3:4', '5': '4:3' };
  const aspectRatio = aspectRatios[aspectChoice] || '9:16';

  // Number of images
  const numImages = await question(`\n${color.bright}Number of images [1-4, default: 1]:${color.reset} `) || '1';

  // Generate
  log(`\n${color.yellow}⏳ Generating with ${model}...${color.reset}`);

  try {
    const token = await getOAuthToken();
    const projectId = await getProjectId();

    if (!token || !projectId) {
      throw new Error('Failed to get credentials');
    }

    const response = await fetch(`https://us-central1-aiplatform.googleapis.com/v1/projects/${projectId}/locations/us-central1/publishers/google/models/${model}:predict`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        instances: [{ prompt }],
        parameters: {
          sampleCount: parseInt(numImages),
          aspectRatio,
          outputMimeType: 'image/jpeg',
        }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Generation failed: ${response.status}`);
    }

    const data = await response.json();
    const predictions = data.predictions || [];

    log(`\n${color.green}✓ Generated ${predictions.length} image(s)${color.reset}\n`);

    predictions.forEach((pred, index) => {
      const timestamp = Date.now();
      const filename = `main_${timestamp}_${index + 1}.jpg`;
      const filepath = join(CLI_OUTPUT_DIR, filename);

      const imageBuffer = Buffer.from(pred.bytesBase64Encoded, 'base64');
      writeFileSync(filepath, imageBuffer);

      log(`  ${color.green}✓${color.reset} ${filename} ${color.dim}(${(imageBuffer.length / 1024).toFixed(1)} KB)${color.reset}`);
    });

  } catch (error) {
    log(`\n${color.red}✗ Failed: ${error.message}${color.reset}`);
  }

  await question(`\n${color.dim}Press Enter...${color.reset}`);
}

// Mode 2: Vera Mode
async function veraMode() {
  clear();
  console.log(`${color.bright}═══ VERA MODE - Advanced Prompt Architect ═══${color.reset}\n`);

  log(`${color.cyan}Generation Mode:${color.reset}
${color.green}[1]${color.reset} Quick Generate (default settings)
${color.green}[2]${color.reset} Custom Configuration
${color.yellow}[0]${color.reset} Back to main menu
`);

  const modeChoice = await question(`${color.bright}Select mode:${color.reset} `);
  if (modeChoice === '0') return;

  const idea = await question(`\n${color.bright}Enter your creative idea:${color.reset} `);
  if (!idea.trim()) return;

  let config;

  if (modeChoice === '1') {
    // Quick mode
    config = {
      idea,
      model: 'classic',
      photographer: 'helmut-newton',
      wardrobe: 'champagneLace',
      environment: 'luxuryBoudoir',
      numVariations: 1
    };
  } else {
    // Custom mode - simplified for CLI
    config = {
      idea,
      model: 'classic',
      photographer: 'helmut-newton',
      wardrobe: 'champagneLace',
      environment: 'luxuryBoudoir',
      numVariations: 2
    };
  }

  log(`\n${color.yellow}⏳ Step 1: Generating prompts with Gemini 2.5 Flash...${color.reset}`);

  try {
    const token = await getOAuthToken();
    const projectId = await getProjectId();

    if (!token || !projectId) {
      throw new Error('Failed to get credentials');
    }

    // Step 1: Generate prompts via Gemini
    const systemInstruction = `You are a world-class creative director specializing in high-end fashion and boudoir photography. Generate ${config.numVariations} detailed image prompts in the style of ${config.photographer}.`;

    const userPrompt = `Generate ${config.numVariations} image prompt variations:
- Core Idea: "${config.idea}"
- Model: ${config.model}
- Photographer Style: ${config.photographer}
- Wardrobe: ${config.wardrobe}
- Environment: ${config.environment}

Each prompt should be 200-300 words, highly detailed, and include technical camera specifications.

Return as JSON array: [{ "id": 1, "prompt_text": "...", "style_description": "..." }]`;

    const response = await fetch(`https://us-central1-aiplatform.googleapis.com/v1/projects/${projectId}/locations/us-central1/publishers/google/models/gemini-2.5-flash:generateContent`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          role: 'user',
          parts: [{ text: userPrompt }]
        }],
        systemInstruction: {
          parts: [{ text: systemInstruction }]
        },
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: 0.9,
        }
      }),
    });

    if (!response.ok) {
      throw new Error(`Prompt generation failed: ${response.status}`);
    }

    const data = await response.json();
    const resultText = data.candidates[0].content.parts[0].text;
    const prompts = JSON.parse(resultText);

    log(`${color.green}✓ Generated ${prompts.length} prompt(s)${color.reset}\n`);

    // Step 2: Generate images for each prompt
    log(`${color.yellow}⏳ Step 2: Generating images with Imagen 4 Ultra...${color.reset}\n`);

    for (const promptData of prompts) {
      log(`${color.cyan}[${promptData.id}] ${promptData.style_description}${color.reset}`);

      const imageResponse = await fetch(`https://us-central1-aiplatform.googleapis.com/v1/projects/${projectId}/locations/us-central1/publishers/google/models/imagen-4.0-ultra-generate-001:predict`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          instances: [{ prompt: promptData.prompt_text }],
          parameters: {
            sampleCount: 1,
            aspectRatio: '9:16',
            outputMimeType: 'image/jpeg',
          }
        }),
      });

      if (!imageResponse.ok) {
        log(`${color.red}✗ Failed to generate image ${promptData.id}${color.reset}`);
        continue;
      }

      const imageData = await imageResponse.json();
      const predictions = imageData.predictions || [];

      predictions.forEach((pred, index) => {
        const timestamp = Date.now();
        const filename = `vera_${config.photographer}_${timestamp}_${promptData.id}_${index + 1}.jpg`;
        const filepath = join(CLI_OUTPUT_DIR, filename);

        const imageBuffer = Buffer.from(pred.bytesBase64Encoded, 'base64');
        writeFileSync(filepath, imageBuffer);

        log(`  ${color.green}✓${color.reset} ${filename} ${color.dim}(${(imageBuffer.length / 1024).toFixed(1)} KB)${color.reset}`);
      });
    }

    log(`\n${color.green}✓ All images saved to: ${CLI_OUTPUT_DIR}${color.reset}`);

  } catch (error) {
    log(`\n${color.red}✗ Vera generation failed: ${error.message}${color.reset}`);
  }

  await question(`\n${color.dim}Press Enter to continue...${color.reset}`);
}

// Mode 12: Video Generation Mode
async function videoGenerationMode() {
  clear();
  console.log(`${color.bright}═══ VIDEO GENERATION MODE (Veo 3.1) ═══${color.reset}\n`);

  const prompt = await question(`${color.bright}Enter video prompt (or 0 to go back):${color.reset} `);
  if (!prompt.trim() || prompt === '0') return;

  log(`\n${color.yellow}⏳ Submitting Veo 3.1 generation job...${color.reset}`);
  log(`${color.dim}This may take 2-5 minutes${color.reset}\n`);

  try {
    const token = await getOAuthToken();
    const projectId = await getProjectId();

    if (!token || !projectId) {
      throw new Error('Failed to get credentials');
    }

    const modelId = 'veo-3.1-generate-preview';
    const location = 'us-central1';

    // Submit job
    const submitUrl = `https://${location}-aiplatform.googleapis.com/v1/projects/${projectId}/locations/${location}/publishers/google/models/${modelId}:predictLongRunning`;

    const submitResponse = await fetch(submitUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        instances: [{ prompt }],
        parameters: {
          sampleCount: 1,
          durationSeconds: '8',
          resolution: '720p',
          aspectRatio: '16:9',
          personGeneration: 'allow_adult',
          addWatermark: true,
          includeRaiReason: true,
          generateAudio: true,
        }
      }),
    });

    if (!submitResponse.ok) {
      const errorText = await submitResponse.text();
      throw new Error(`Submit failed: ${submitResponse.status}`);
    }

    const submitData = await submitResponse.json();
    const operationName = submitData.name;

    log(`${color.green}✓ Job submitted${color.reset}`);
    log(`${color.dim}Operation: ${operationName}${color.reset}\n`);
    log(`${color.yellow}⏳ Polling for completion (checking every 10s)...${color.reset}\n`);

    // Poll for completion
    const pollUrl = `https://${location}-aiplatform.googleapis.com/v1/${operationName}`;
    let attempts = 0;
    const maxAttempts = 60; // 10 minutes

    while (attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 10000)); // 10s

      const pollResponse = await fetch(pollUrl, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!pollResponse.ok) {
        throw new Error(`Poll failed: ${pollResponse.status}`);
      }

      const pollData = await pollResponse.json();

      if (pollData.done) {
        if (pollData.error) {
          throw new Error(`Generation failed: ${pollData.error.message}`);
        }

        log(`${color.green}✓ Video generation complete!${color.reset}\n`);

        // Extract video
        const videoBase64 = pollData.response.predictions[0].bytesBase64Encoded;
        const timestamp = Date.now();
        const filename = `veo_${timestamp}.mp4`;
        const filepath = join(CLI_OUTPUT_DIR, filename);

        const videoBuffer = Buffer.from(videoBase64, 'base64');
        writeFileSync(filepath, videoBuffer);

        log(`${color.green}✓ Saved:${color.reset} ${filename} ${color.dim}(${(videoBuffer.length / 1024 / 1024).toFixed(1)} MB)${color.reset}`);
        break;
      }

      attempts++;
      log(`${color.dim}  [${attempts}/${maxAttempts}] Still processing...${color.reset}`);
    }

    if (attempts >= maxAttempts) {
      log(`${color.yellow}⚠ Timeout reached. Video may still be processing.${color.reset}`);
    }

  } catch (error) {
    log(`\n${color.red}✗ Failed: ${error.message}${color.reset}`);
  }

  await question(`\n${color.dim}Press Enter...${color.reset}`);
}

// Main loop
async function main() {
  while (true) {
    const choice = await showMainMenu();

    switch (choice) {
      case '1': case 'm': await mainGenerationMode(); break;
      case '2': case 'v': await veraMode(); break;
      case '3': case 'r': await reelsStudioMode(); break;
      case '4': case 'i': await instagramMode(); break;
      case '5': case 'p': await platinumMode(); break;
      case '6': await roleplayMode(); break;
      case '7': await artisticMode(); break;
      case '8': case 'vn': await visualNovelMode(); break;
      case '9': case 'ex': await experimentalMode(); break;
      case '10': await masterclassMode(); break;
      case '11': await corporateMode(); break;
      case '12': await videoGenerationMode(); break;

      case 's': await checkSystemStatus(); break;
      case 'h': await showHelp(); break;

      case 'q': case 'exit':
        log(`\n${color.cyan}Thank you for using VERALABS AI Studio CLI${color.reset}\n`);
        rl.close();
        process.exit(0);

      default:
        log(`\n${color.red}✗ Invalid choice${color.reset}`);
        await question('Press Enter...');
    }
  }
}

// Start
main().catch(error => {
  console.error(`${color.red}Fatal error: ${error.message}${color.reset}`);
  rl.close();
  process.exit(1);
});
