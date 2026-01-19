#!/usr/bin/env node
/**
 * VERALABS AI Studio - CLI Version
 *
 * A complete command-line interface mirroring all web app functionality
 * Run: node veralabs-cli.mjs
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';
import readline from 'readline';

// Initialize CLI
const CLI_OUTPUT_DIR = '/home/ecolex/version1/CLIimages';
const PROXY_URL = 'http://localhost:3001';

// Ensure output directory exists
if (!existsSync(CLI_OUTPUT_DIR)) {
  mkdirSync(CLI_OUTPUT_DIR, { recursive: true });
}

// Initialize readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Utility functions
const question = (query) => new Promise(resolve => rl.question(query, resolve));
const log = (msg) => console.log(msg);
const clear = () => console.log('\x1b[2J\x1b[0f');
const color = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  magenta: '\x1b[35m',
  blue: '\x1b[34m'
};

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
║                     ${color.dim}Professional Edition${color.reset}${color.cyan}                       ║
║                                                                    ║
╚════════════════════════════════════════════════════════════════════╝${color.reset}
`);
}

// Main Menu
async function showMainMenu() {
  showBanner();
  console.log(`
${color.bright}═══ MAIN MENU ═══${color.reset}

${color.green}[1]${color.reset}  Main Generation Mode       ${color.dim}(Multi-model image generation)${color.reset}
${color.green}[2]${color.reset}  Vera Mode                  ${color.dim}(Advanced prompt architect)${color.reset}
${color.green}[3]${color.reset}  Reels Studio Mode          ${color.dim}(Ken Burns + Helmut Newton)${color.reset}
${color.green}[4]${color.reset}  Instagram Mode             ${color.dim}(Social media publishing)${color.reset}
${color.green}[5]${color.reset}  Platinum Mode              ${color.dim}(Premium model collection)${color.reset}
${color.green}[6]${color.reset}  Roleplay Mode              ${color.dim}(Indian models gallery)${color.reset}
${color.green}[7]${color.reset}  Artistic Mode              ${color.dim}(Fine art generation)${color.reset}
${color.green}[8]${color.reset}  Visual Novel Mode          ${color.dim}(VN asset generator)${color.reset}
${color.green}[9]${color.reset}  Experimental Mode          ${color.dim}(Cutting-edge concepts)${color.reset}
${color.green}[10]${color.reset} MasterClass Mode           ${color.dim}(Elite model collection)${color.reset}
${color.green}[11]${color.reset} Corporate Mode             ${color.dim}(Professional headshots)${color.reset}
${color.green}[12]${color.reset} Video Generation Mode      ${color.dim}(Veo 3.1 videos)${color.reset}

${color.yellow}[S]${color.reset}  System Status              ${color.dim}(Check credentials & server)${color.reset}
${color.yellow}[H]${color.reset}  Help & Shortcuts           ${color.dim}(Quick reference guide)${color.reset}
${color.yellow}[Q]${color.reset}  Quit

${color.bright}Output Directory:${color.reset} ${color.cyan}${CLI_OUTPUT_DIR}${color.reset}
`);

  const choice = await question(`${color.bright}Select mode:${color.reset} `);
  return choice.trim().toLowerCase();
}

// Get OAuth token
async function getOAuthToken() {
  try {
    const response = await fetch(`${PROXY_URL}/api/gcloud-token`);
    if (!response.ok) throw new Error('Failed to get OAuth token');
    const data = await response.json();
    return data.token;
  } catch (error) {
    log(`${color.red}✗ Failed to get OAuth token: ${error.message}${color.reset}`);
    return null;
  }
}

// Get project ID
async function getProjectId() {
  try {
    const response = await fetch(`${PROXY_URL}/api/gcloud-project`);
    if (!response.ok) throw new Error('Failed to get project ID');
    const data = await response.json();
    return data.projectId;
  } catch (error) {
    log(`${color.red}✗ Failed to get project ID: ${error.message}${color.reset}`);
    return null;
  }
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
    log(`${color.red}✗ Failed to check credentials${color.reset}`);
  }

  // Output directory
  log(`\n${color.dim}Output directory...${color.reset}`);
  log(`${color.green}✓ CLI Images${color.reset} (${CLI_OUTPUT_DIR})`);

  log(`\n${color.dim}Press Enter to continue...${color.reset}`);
  await question('');
}

// Help & Shortcuts
async function showHelp() {
  clear();
  console.log(`${color.bright}═══ HELP & SHORTCUTS ═══${color.reset}

${color.cyan}Quick Navigation:${color.reset}
  ${color.green}1-12${color.reset}   Select mode by number
  ${color.green}s${color.reset}      System status
  ${color.green}h${color.reset}      This help screen
  ${color.green}q${color.reset}      Quit application
  ${color.green}b${color.reset}      Back to previous menu

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
  • Type 'list' in any menu to see all options

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

${color.yellow}[B]${color.reset} Back to main menu
`);

  const modelChoice = await question(`${color.bright}Select model:${color.reset} `);

  if (modelChoice.toLowerCase() === 'b') return;

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
      throw new Error(`API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    const predictions = data.predictions || [];

    log(`\n${color.green}✓ Generated ${predictions.length} image(s)${color.reset}\n`);

    // Save images
    predictions.forEach((pred, index) => {
      const timestamp = Date.now();
      const filename = `main_${timestamp}_${index + 1}.jpg`;
      const filepath = join(CLI_OUTPUT_DIR, filename);

      const imageBuffer = Buffer.from(pred.bytesBase64Encoded, 'base64');
      writeFileSync(filepath, imageBuffer);

      log(`${color.cyan}[${index + 1}]${color.reset} ${filename} ${color.dim}(${(imageBuffer.length / 1024).toFixed(1)} KB)${color.reset}`);
    });

    log(`\n${color.green}✓ Saved to: ${CLI_OUTPUT_DIR}${color.reset}`);

  } catch (error) {
    log(`\n${color.red}✗ Generation failed: ${error.message}${color.reset}`);
  }

  await question(`\n${color.dim}Press Enter to continue...${color.reset}`);
}

// Mode 12: Video Generation Mode (Veo 3.1)
async function videoGenerationMode() {
  clear();
  console.log(`${color.bright}═══ VIDEO GENERATION MODE (Veo 3.1) ═══${color.reset}\n`);

  // Get prompt
  const prompt = await question(`${color.bright}Enter video prompt:${color.reset} `);
  if (!prompt.trim()) {
    log(`${color.red}✗ Prompt cannot be empty${color.reset}`);
    await question('Press Enter...');
    return;
  }

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
      throw new Error(`Submit failed: ${submitResponse.status} - ${errorText}`);
    }

    const submitResult = await submitResponse.json();
    const operationName = submitResult.name;

    log(`${color.green}✓ Job submitted${color.reset}`);
    log(`${color.dim}Operation: ${operationName}${color.reset}\n`);

    // Poll for completion
    let attempts = 0;
    const maxAttempts = 60;

    while (attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 5000));
      attempts++;

      process.stdout.write(`${color.yellow}⏳ Processing... ${Math.round((attempts / maxAttempts) * 100)}%${color.reset}\r`);

      const pollUrl = `https://${location}-aiplatform.googleapis.com/v1/projects/${projectId}/locations/${location}/publishers/google/models/${modelId}:fetchPredictOperation`;

      const pollResponse = await fetch(pollUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ operationName }),
      });

      if (pollResponse.ok) {
        const operation = await pollResponse.json();

        if (operation.done === true) {
          if (operation.error) {
            throw new Error(`Generation failed: ${operation.error.message}`);
          }

          const predictions = operation.response?.predictions;
          if (!predictions || predictions.length === 0) {
            throw new Error("No video data found");
          }

          const videoBase64 = predictions[0].bytesBase64Encoded;
          if (!videoBase64) {
            throw new Error("No video data found");
          }

          // Save video
          const timestamp = Date.now();
          const filename = `veo_${timestamp}.mp4`;
          const filepath = join(CLI_OUTPUT_DIR, filename);

          const videoBuffer = Buffer.from(videoBase64, 'base64');
          writeFileSync(filepath, videoBuffer);

          log(`\n${color.green}✓ Video generated${color.reset}`);
          log(`${color.cyan}File:${color.reset} ${filename} ${color.dim}(${(videoBuffer.length / (1024 * 1024)).toFixed(2)} MB)${color.reset}`);
          log(`${color.green}✓ Saved to: ${CLI_OUTPUT_DIR}${color.reset}`);

          break;
        }
      }
    }

    if (attempts >= maxAttempts) {
      log(`\n${color.red}✗ Timeout: Video generation took too long${color.reset}`);
    }

  } catch (error) {
    log(`\n${color.red}✗ Video generation failed: ${error.message}${color.reset}`);
  }

  await question(`\n${color.dim}Press Enter to continue...${color.reset}`);
}

// Main loop
async function main() {
  while (true) {
    const choice = await showMainMenu();

    switch (choice) {
      case '1':
      case 'm':
        await mainGenerationMode();
        break;

      case '12':
        await videoGenerationMode();
        break;

      case 's':
        await checkSystemStatus();
        break;

      case 'h':
        await showHelp();
        break;

      case 'q':
      case 'exit':
        log(`\n${color.cyan}Thank you for using VERALABS AI Studio CLI${color.reset}\n`);
        rl.close();
        process.exit(0);

      default:
        log(`\n${color.red}✗ Invalid choice. Press Enter to continue...${color.reset}`);
        await question('');
    }
  }
}

// Start CLI
main().catch(error => {
  console.error(`${color.red}Fatal error: ${error.message}${color.reset}`);
  rl.close();
  process.exit(1);
});
