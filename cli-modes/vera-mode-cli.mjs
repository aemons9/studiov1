/**
 * Vera Mode CLI - Advanced Prompt Architect
 */

import { writeFileSync } from 'fs';
import { join } from 'path';

const PROXY_URL = 'http://localhost:3001';

// Vera Mode Models
const MODELS = [
  { id: 1, name: 'Classic', value: 'classic' },
  { id: 2, name: 'Sultry', value: 'sultry' },
  { id: 3, name: 'Playful', value: 'playful' },
  { id: 4, name: 'Mysterious', value: 'mysterious' },
  { id: 5, name: 'Powerful', value: 'powerful' },
  { id: 6, name: 'Hourglass Primary', value: 'hourglassPrimary' },
  { id: 7, name: 'Hourglass Curves', value: 'hourglassCurves' },
  { id: 8, name: 'Indian Hourglass Muse', value: 'indianHourglassMuse' },
];

// Photographer Styles
const PHOTOGRAPHERS = [
  { id: 1, name: 'Helmut Newton', value: 'helmut-newton' },
  { id: 2, name: 'Guy Bourdin', value: 'guy-bourdin' },
  { id: 3, name: 'Peter Lindbergh', value: 'peter-lindbergh' },
  { id: 4, name: 'Irving Penn', value: 'irving-penn' },
  { id: 5, name: 'Richard Avedon', value: 'richard-avedon' },
];

// Wardrobes
const WARDROBES = [
  { id: 1, name: 'Champagne Lace Lingerie', value: 'champagneLace' },
  { id: 2, name: 'Black Mesh Bodysuit', value: 'blackMesh' },
  { id: 3, name: 'Silk Kimono Robe', value: 'silkKimonoRobe' },
  { id: 4, name: 'Sheer Chiffon Draping', value: 'sheerChiffon' },
  { id: 5, name: 'Artistic Fabric Draping', value: 'artisticFabricDraping' },
];

// Environments
const ENVIRONMENTS = [
  { id: 1, name: 'Luxury Boudoir', value: 'luxuryBoudoir' },
  { id: 2, name: 'Golden Hour Studio', value: 'goldenHourStudio' },
  { id: 3, name: 'Penthouse Night', value: 'penthouseNight' },
  { id: 4, name: 'Minimalist Art Gallery', value: 'minimalistArtGallery' },
  { id: 5, name: 'Midnight Pool', value: 'midnightPool' },
];

export async function veraMode(question, log, color, CLI_OUTPUT_DIR, getOAuthToken, getProjectId) {
  log(`${color.bright}═══ VERA MODE - Advanced Prompt Architect ═══${color.reset}\n`);

  // Quick mode or custom
  log(`${color.cyan}Generation Mode:${color.reset}
${color.green}[1]${color.reset} Quick Generate (default settings)
${color.green}[2]${color.reset} Custom Configuration
${color.yellow}[B]${color.reset} Back
`);

  const modeChoice = await question(`${color.bright}Select mode:${color.reset} `);
  if (modeChoice.toLowerCase() === 'b') return;

  if (modeChoice === '1') {
    // Quick mode
    const idea = await question(`\n${color.bright}Enter your creative idea:${color.reset} `);
    if (!idea.trim()) return;

    await generateVera({
      idea,
      model: 'classic',
      photographer: 'helmut-newton',
      wardrobe: 'champagneLace',
      environment: 'luxuryBoudoir',
      numVariations: 1
    }, log, color, CLI_OUTPUT_DIR, getOAuthToken, getProjectId);

  } else {
    // Custom mode
    const idea = await question(`\n${color.bright}Enter your creative idea:${color.reset} `);
    if (!idea.trim()) return;

    // Select model
    log(`\n${color.cyan}Select Model:${color.reset}`);
    MODELS.forEach(m => log(`${color.green}[${m.id}]${color.reset} ${m.name}`));
    const modelChoice = await question(`${color.bright}Model [default: 1]:${color.reset} `) || '1';
    const model = MODELS.find(m => m.id === parseInt(modelChoice))?.value || 'classic';

    // Select photographer
    log(`\n${color.cyan}Select Photographer Style:${color.reset}`);
    PHOTOGRAPHERS.forEach(p => log(`${color.green}[${p.id}]${color.reset} ${p.name}`));
    const photoChoice = await question(`${color.bright}Style [default: 1]:${color.reset} `) || '1';
    const photographer = PHOTOGRAPHERS.find(p => p.id === parseInt(photoChoice))?.value || 'helmut-newton';

    // Select wardrobe
    log(`\n${color.cyan}Select Wardrobe:${color.reset}`);
    WARDROBES.forEach(w => log(`${color.green}[${w.id}]${color.reset} ${w.name}`));
    const wardrobeChoice = await question(`${color.bright}Wardrobe [default: 1]:${color.reset} `) || '1';
    const wardrobe = WARDROBES.find(w => w.id === parseInt(wardrobeChoice))?.value || 'champagneLace';

    // Select environment
    log(`\n${color.cyan}Select Environment:${color.reset}`);
    ENVIRONMENTS.forEach(e => log(`${color.green}[${e.id}]${color.reset} ${e.name}`));
    const envChoice = await question(`${color.bright}Environment [default: 1]:${color.reset} `) || '1';
    const environment = ENVIRONMENTS.find(e => e.id === parseInt(envChoice))?.value || 'luxuryBoudoir';

    // Number of variations
    const numVariations = await question(`\n${color.bright}Number of variations [1-4, default: 2]:${color.reset} `) || '2';

    await generateVera({
      idea,
      model,
      photographer,
      wardrobe,
      environment,
      numVariations: parseInt(numVariations)
    }, log, color, CLI_OUTPUT_DIR, getOAuthToken, getProjectId);
  }
}

async function generateVera(config, log, color, CLI_OUTPUT_DIR, getOAuthToken, getProjectId) {
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
      const errorText = await response.text();
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
