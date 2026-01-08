/**
 * Claude API Prompt Optimization Service
 * AI-enhanced prompt optimization for haute couture image generation
 * Integrates with Imagen 4 optimizer and uses Claude API for intelligent improvements
 */

import Anthropic from "@anthropic-ai/sdk";
import * as dotenv from "dotenv";

dotenv.config();

interface PromptData {
  shot: string;
  subject: {
    variant: string;
    pose: string;
    hair_color: string;
    hair_style: string;
    nail_art: string;
    high_heels: string;
    tattoos: string;
    piercings: string;
    body_art: string;
    skin_finish: string;
    hand_and_nail_details: string;
  };
  wardrobe: string;
  environment: string;
  lighting: string;
  camera: {
    focal_length: string;
    aperture: string;
    distance: string;
    angle: string;
    framing: string;
  };
  color_grade: string;
  style: string;
  quality: string;
  figure_and_form: string;
  skin_micro_details: string;
  fabric_physics: string;
  material_properties: string;
}

interface OptimizationAnalysis {
  originalPrompt: string;
  enhancedPrompt: string;
  keyImprovements: string[];
  technicalSuggestions: string[];
  safetyAssessment: {
    riskLevel: "low" | "moderate" | "high";
    concerns: string[];
    recommendations: string[];
  };
  qualityEnhancements: {
    visualClarity: number; // 1-10
    artisticDepth: number; // 1-10
    technicalAccuracy: number; // 1-10
  };
  imagenOptimizations: string[];
}

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

/**
 * Enhance a fashion prompt using Claude's understanding of haute couture
 * Leverages Claude's knowledge of fashion terminology and aesthetic principles
 */
export async function enhanceFashionPrompt(
  basePrompt: string,
  context: {
    intimacyLevel?: number;
    qualityPreset?: "standard" | "premium" | "gallery" | "masterpiece";
    styleEmphasis?: "photorealistic" | "cinematic" | "editorial" | "fine-art";
    targetArchetype?: string;
  } = {}
): Promise<string> {
  const systemPrompt = `You are a world-class haute couture creative director and AI image generation prompt specialist. 
Your expertise spans:
- High-fashion photography and styling
- AI image generation optimization for models like Imagen 4
- Indian fashion, cultural sensitivity, and traditional aesthetics
- Professional photography terminology and camera settings
- Safety-first content guidelines for image generation

When enhancing prompts:
1. Preserve the core vision while amplifying technical precision
2. Add sensory details that help AI models render photorealistic results
3. Include specific camera, lighting, and composition guidance
4. Use industry-standard terminology from fashion photography
5. Ensure cultural respect and authenticity for Indian aesthetic elements
6. Balance artistic ambition with content safety guidelines`;

  const userPrompt = `Enhance this fashion/beauty image generation prompt for maximum visual impact and AI rendering quality:

Base Prompt:
${basePrompt}

${context.intimacyLevel ? `Intimacy Level: ${context.intimacyLevel}/10` : ""}
${context.qualityPreset ? `Quality Target: ${context.qualityPreset}` : ""}
${context.styleEmphasis ? `Style Emphasis: ${context.styleEmphasis}` : ""}
${context.targetArchetype ? `Target Archetype: ${context.targetArchetype}` : ""}

Requirements:
1. Enhance with specific technical photography details
2. Add Imagen 4-specific trigger words that improve rendering
3. Strengthen visual composition descriptions
4. Ensure safety compliance while maintaining artistic vision
5. Add micro-details for photorealistic rendering

Return ONLY the enhanced prompt, ready for direct use with Imagen 4. No explanations.`;

  const message = await client.messages.create({
    model: "claude-opus-4-1",
    max_tokens: 1500,
    system: systemPrompt,
    messages: [
      {
        role: "user",
        content: userPrompt,
      },
    ],
  });

  const enhancedPrompt =
    message.content[0].type === "text" ? message.content[0].text : "";

  return enhancedPrompt;
}

/**
 * Analyze and optimize a complete PromptData structure
 * Provides detailed analysis of each component with suggestions
 */
export async function analyzePromptStructure(
  promptData: PromptData,
  options: {
    focusAreas?: string[];
    targetAudience?: string;
  } = {}
): Promise<OptimizationAnalysis> {
  const promptJson = JSON.stringify(promptData, null, 2);

  const analysisPrompt = `As a premier image generation specialist, analyze this fashion photography prompt structure and provide comprehensive optimization analysis:

PROMPT STRUCTURE:
${promptJson}

${options.focusAreas ? `Focus Areas: ${options.focusAreas.join(", ")}` : ""}
${options.targetAudience ? `Target Audience: ${options.targetAudience}` : ""}

Provide analysis in JSON format with these exact fields:
{
  "keyImprovements": ["List of 3-5 key improvements"],
  "technicalSuggestions": ["Specific technical enhancements for Imagen 4"],
  "safetyRiskLevel": "low|moderate|high",
  "safetyConcerns": ["Any content concerns"],
  "safetyRecommendations": ["How to address concerns while maintaining vision"],
  "imagenOptimizations": ["Imagen 4 specific enhancement keywords and phrases"],
  "visualClarityScore": 1-10,
  "artisticDepthScore": 1-10,
  "technicalAccuracyScore": 1-10,
  "enhancedShotDescription": "Improved shot description",
  "enhancedSubjectDescription": "Improved subject description",
  "enhancedCameraSettings": "Improved camera technical details"
}

Return ONLY valid JSON, no markdown or explanations.`;

  const message = await client.messages.create({
    model: "claude-opus-4-1",
    max_tokens: 2000,
    messages: [
      {
        role: "user",
        content: analysisPrompt,
      },
    ],
  });

  const analysisText =
    message.content[0].type === "text" ? message.content[0].text : "{}";

  // Parse JSON response
  let analysis;
  try {
    analysis = JSON.parse(analysisText);
  } catch {
    // Clean up markdown if present
    const cleanedText = analysisText
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();
    analysis = JSON.parse(cleanedText);
  }

  return {
    originalPrompt: Object.entries(promptData)
      .map(([key, value]) => {
        if (typeof value === "object") {
          return `${key}: ${JSON.stringify(value).substring(0, 100)}...`;
        }
        return `${key}: ${String(value).substring(0, 100)}`;
      })
      .join("\n"),
    enhancedPrompt: `${analysis.enhancedShotDescription || ""}\n${analysis.enhancedSubjectDescription || ""}\n${analysis.enhancedCameraSettings || ""}`,
    keyImprovements: analysis.keyImprovements || [],
    technicalSuggestions: analysis.technicalSuggestions || [],
    safetyAssessment: {
      riskLevel: analysis.safetyRiskLevel || "moderate",
      concerns: analysis.safetyConcerns || [],
      recommendations: analysis.safetyRecommendations || [],
    },
    qualityEnhancements: {
      visualClarity: analysis.visualClarityScore || 5,
      artisticDepth: analysis.artisticDepthScore || 5,
      technicalAccuracy: analysis.technicalAccuracyScore || 5,
    },
    imagenOptimizations: analysis.imagenOptimizations || [],
  };
}

/**
 * Generate conceptual variations from a base prompt
 * Creates multiple artistic interpretations suitable for different contexts
 */
export async function generateConceptualVariations(
  basePrompt: string,
  numberOfVariations: number = 3,
  context: {
    theme?: string;
    mood?: string;
    culturalContext?: string;
  } = {}
): Promise<Array<{ name: string; prompt: string; description: string }>> {
  const variationPrompt = `You are a creative director developing multiple conceptual variations of a fashion photography scenario.

Base Concept:
${basePrompt}

${context.theme ? `Theme: ${context.theme}` : ""}
${context.mood ? `Mood: ${context.mood}` : ""}
${context.culturalContext ? `Cultural Context: ${context.culturalContext}` : ""}

Generate ${numberOfVariations} distinct creative variations that:
1. Maintain the core essence of the base concept
2. Explore different artistic directions
3. Are all suitable for Imagen 4 generation
4. Work well for haute couture/fashion image generation

Return as JSON array with this structure:
[
  {
    "name": "Variation name",
    "description": "Brief description of artistic direction",
    "prompt": "Complete optimized prompt for Imagen 4"
  }
]

Return ONLY valid JSON array, no markdown or additional text.`;

  const message = await client.messages.create({
    model: "claude-opus-4-1",
    max_tokens: 2500,
    messages: [
      {
        role: "user",
        content: variationPrompt,
      },
    ],
  });

  const variationsText =
    message.content[0].type === "text" ? message.content[0].text : "[]";

  // Parse JSON
  let variations;
  try {
    variations = JSON.parse(variationsText);
  } catch {
    const cleanedText = variationsText
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();
    variations = JSON.parse(cleanedText);
  }

  return variations;
}

/**
 * Generate safety-optimized prompt variations
 * Creates progressively safer versions while maintaining artistic vision
 */
export async function generateSafetyVariations(
  originalPrompt: string,
  context: {
    currentIntimacyLevel?: number;
    targetIntimacyLevel?: number;
  } = {}
): Promise<
  Array<{
    level: "conservative" | "balanced" | "artistic" | "boundary-pushing";
    prompt: string;
    safetyNotes: string;
  }>
> {
  const safetyPrompt = `As a content safety specialist for image generation, create 4 versions of this prompt with increasing safety levels:

Original Prompt:
${originalPrompt}

${context.currentIntimacyLevel ? `Current Intimacy Level: ${context.currentIntimacyLevel}` : ""}
${context.targetIntimacyLevel ? `Target Intimacy Level: ${context.targetIntimacyLevel}` : ""}

Generate progressively safer versions:
1. Conservative: Fully clothed, professional, safe for all audiences
2. Balanced: Elegant, fashion-forward, maintains artistic integrity
3. Artistic: Pushes artistic boundaries while respecting safety guidelines
4. Boundary-pushing: Maximum artistic expression within Imagen 4 limits

Return as JSON:
{
  "conservative": { "prompt": "...", "safetyNotes": "..." },
  "balanced": { "prompt": "...", "safetyNotes": "..." },
  "artistic": { "prompt": "...", "safetyNotes": "..." },
  "boundary_pushing": { "prompt": "...", "safetyNotes": "..." }
}

Return ONLY valid JSON, no markdown.`;

  const message = await client.messages.create({
    model: "claude-opus-4-1",
    max_tokens: 2000,
    messages: [
      {
        role: "user",
        content: safetyPrompt,
      },
    ],
  });

  const safetyText =
    message.content[0].type === "text" ? message.content[0].text : "{}";

  let safetyData;
  try {
    safetyData = JSON.parse(safetyText);
  } catch {
    const cleanedText = safetyText
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();
    safetyData = JSON.parse(cleanedText);
  }

  return [
    {
      level: "conservative",
      prompt: safetyData.conservative?.prompt || "",
      safetyNotes: safetyData.conservative?.safetyNotes || "",
    },
    {
      level: "balanced",
      prompt: safetyData.balanced?.prompt || "",
      safetyNotes: safetyData.balanced?.safetyNotes || "",
    },
    {
      level: "artistic",
      prompt: safetyData.artistic?.prompt || "",
      safetyNotes: safetyData.artistic?.safetyNotes || "",
    },
    {
      level: "boundary-pushing",
      prompt: safetyData.boundary_pushing?.prompt || "",
      safetyNotes: safetyData.boundary_pushing?.safetyNotes || "",
    },
  ];
}

/**
 * Generate Indian cultural context enhancements
 * Adds authenticity and cultural sensitivity for Indian aesthetic elements
 */
export async function enhanceWithCulturalContext(
  basePrompt: string,
  culturalContext: {
    region?: string;
    tradition?: string;
    aesthetic?: string;
  }
): Promise<{
  enhancedPrompt: string;
  culturalElements: string[];
  authenticityNotes: string[];
  respectfulApproach: string;
}> {
  const culturalPrompt = `As an expert in Indian fashion, culture, and aesthetics, enhance this prompt with authentic cultural elements:

Base Prompt:
${basePrompt}

${culturalContext.region ? `Regional Focus: ${culturalContext.region}` : ""}
${culturalContext.tradition ? `Tradition: ${culturalContext.tradition}` : ""}
${culturalContext.aesthetic ? `Aesthetic Focus: ${culturalContext.aesthetic}` : ""}

Enhance with:
1. Authentic cultural and traditional elements
2. Historically accurate details if applicable
3. Contemporary Indian fashion sensibilities
4. Respectful cultural representation
5. Specific material and color knowledge

Return JSON:
{
  "enhancedPrompt": "Complete enhanced prompt",
  "culturalElements": ["List of cultural elements added"],
  "authenticityNotes": ["Notes on authenticity"],
  "respectfulApproach": "How this respects the cultural context"
}

Return ONLY valid JSON.`;

  const message = await client.messages.create({
    model: "claude-opus-4-1",
    max_tokens: 1500,
    messages: [
      {
        role: "user",
        content: culturalPrompt,
      },
    ],
  });

  const culturalText =
    message.content[0].type === "text" ? message.content[0].text : "{}";

  let culturalData;
  try {
    culturalData = JSON.parse(culturalText);
  } catch {
    const cleanedText = culturalText
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();
    culturalData = JSON.parse(cleanedText);
  }

  return {
    enhancedPrompt: culturalData.enhancedPrompt || "",
    culturalElements: culturalData.culturalElements || [],
    authenticityNotes: culturalData.authenticityNotes || [],
    respectfulApproach: culturalData.respectfulApproach || "",
  };
}

// Export all functions for use in your application
export {
  PromptData,
  OptimizationAnalysis,
};
