/**
 * Claude API Concept Generation Service
 * AI-powered concept generation for haute couture image scenarios
 * Integrates with Imagen 4 concepts and generates enhanced variations
 */

import Anthropic from "@anthropic-ai/sdk";
import * as dotenv from "dotenv";

dotenv.config();

interface ConceptEnhancement {
  originalConcept: string;
  enhancedConcept: string;
  variations: ConceptVariation[];
  artisticDirection: string;
  targetArchetypes: string[];
  intimacyRecommendation: number;
  tags: string[];
}

interface ConceptVariation {
  name: string;
  description: string;
  prompt: string;
  subtleties: string[];
  recommendedArchetype?: string;
}

interface ConceptTheme {
  theme: string;
  moodBoard: string[];
  colorPalette: string[];
  conceptPrompts: string[];
  variations: Array<{
    name: string;
    description: string;
    prompt: string;
  }>;
}

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

/**
 * Enhance an existing concept with creative variations
 * Generates multiple artistic interpretations and styling options
 */
export async function enhanceConceptWithVariations(
  conceptName: string,
  baseDescription: string,
  archetypeContext?: string
): Promise<ConceptEnhancement> {
  const conceptPrompt = `You are a creative director for haute couture fashion photography and AI image generation. 
Enhance this concept with multiple creative variations:

Concept Name: ${conceptName}
Base Description: ${baseDescription}
${archetypeContext ? `Archetype Context: ${archetypeContext}` : ""}

Generate comprehensive concept enhancements including:
1. Enhanced concept description
2. 4-5 specific variations with unique artistic approaches
3. Recommended archetypes for this concept
4. Suggested intimacy level (1-10)
5. Mood and artistic direction
6. Relevant tags for cataloging

Return JSON:
{
  "enhancedConcept": "Detailed enhanced concept description",
  "artisticDirection": "Overall artistic vision and mood",
  "variations": [
    {
      "name": "Variation name",
      "description": "Artistic direction for this variation",
      "prompt": "Imagen 4 ready prompt",
      "subtleties": ["Detail 1", "Detail 2"]
    }
  ],
  "targetArchetypes": ["Suggested archetype IDs"],
  "intimacyLevel": 1-10,
  "tags": ["relevant", "tags"],
  "lightingStrategy": "Overall lighting philosophy",
  "colorStrategy": "Color palette approach"
}

Return ONLY valid JSON.`;

  const message = await client.messages.create({
    model: "claude-opus-4-1",
    max_tokens: 3000,
    messages: [
      {
        role: "user",
        content: conceptPrompt,
      },
    ],
  });

  const enhancedText =
    message.content[0].type === "text" ? message.content[0].text : "{}";

  let enhancedData;
  try {
    enhancedData = JSON.parse(enhancedText);
  } catch {
    const cleanedText = enhancedText
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();
    enhancedData = JSON.parse(cleanedText);
  }

  return {
    originalConcept: baseDescription,
    enhancedConcept: enhancedData.enhancedConcept || "",
    variations: enhancedData.variations || [],
    artisticDirection: enhancedData.artisticDirection || "",
    targetArchetypes: enhancedData.targetArchetypes || [],
    intimacyRecommendation: enhancedData.intimacyLevel || 5,
    tags: enhancedData.tags || [],
  };
}

/**
 * Generate completely new concepts from a creative brief
 * Creates original conceptual scenarios suitable for haute couture photography
 */
export async function generateNewConcepts(
  creativeBrief: string,
  numberOfConcepts: number = 3,
  stylePreferences?: {
    era?: string;
    cultural?: string;
    mood?: string;
    aesthetic?: string;
  }
): Promise<
  Array<{
    name: string;
    description: string;
    basePrompt: string;
    variations: Array<{ name: string; prompt: string }>;
    recommendedArchetypes: string[];
    intimacyRange: [number, number];
  }>
> {
  const conceptBriefPrompt = `As a world-class concept designer for high-fashion photography, generate ${numberOfConcepts} unique, original concepts from this brief:

Creative Brief:
${creativeBrief}

${stylePreferences?.era ? `Time Era: ${stylePreferences.era}` : ""}
${stylePreferences?.cultural ? `Cultural Influence: ${stylePreferences.cultural}` : ""}
${stylePreferences?.mood ? `Mood: ${stylePreferences.mood}` : ""}
${stylePreferences?.aesthetic ? `Aesthetic: ${stylePreferences.aesthetic}` : ""}

Each concept should:
1. Be completely original and suitable for Imagen 4
2. Include compelling artistic vision
3. Have 2-3 variations with distinct moods
4. Suggest compatible model archetypes
5. Specify appropriate intimacy level range

Return JSON array:
[
  {
    "name": "Concept name",
    "description": "Detailed concept description",
    "basePrompt": "Base Imagen 4 ready prompt",
    "variations": [
      { "name": "Variation", "prompt": "Specific prompt" }
    ],
    "recommendedArchetypes": ["archetype-ids"],
    "intimacyRange": [min, max]
  }
]

Return ONLY valid JSON array.`;

  const message = await client.messages.create({
    model: "claude-opus-4-1",
    max_tokens: 3500,
    messages: [
      {
        role: "user",
        content: conceptBriefPrompt,
      },
    ],
  });

  const conceptsText =
    message.content[0].type === "text" ? message.content[0].text : "[]";

  let concepts;
  try {
    concepts = JSON.parse(conceptsText);
  } catch {
    const cleanedText = conceptsText
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();
    concepts = JSON.parse(cleanedText);
  }

  return concepts || [];
}

/**
 * Create mood board and thematic concept suite
 * Generates coordinated concepts around a central theme
 */
export async function createThematicConceptSuite(
  theme: string,
  numberOfConcepts: number = 5
): Promise<ConceptTheme> {
  const themePrompt = `Create a cohesive thematic concept suite for haute couture photography around this theme: "${theme}"

Generate:
1. Mood board description (visual inspiration)
2. Color palette (3-5 colors with hex or descriptions)
3. ${numberOfConcepts} coordinated concept prompts
4. Variations on each concept
5. Unifying artistic elements

Each concept must:
- Fit the overall theme
- Be distinct from others
- Work for Imagen 4 generation
- Include specific fashion/styling details
- Be suitable for professional photography

Return JSON:
{
  "theme": "${theme}",
  "moodBoard": ["Visual inspiration element 1", "Element 2"],
  "colorPalette": ["Color description/hex", ...],
  "conceptPrompts": ["Prompt 1", "Prompt 2", ...],
  "variations": [
    {
      "name": "Concept variation name",
      "description": "Description",
      "prompt": "Full Imagen 4 prompt"
    }
  ],
  "unifyingElements": ["Element 1", "Element 2"],
  "lighteningStrategy": "How lighting unifies the suite",
  "narrativeArc": "Overall story or progression"
}

Return ONLY valid JSON.`;

  const message = await client.messages.create({
    model: "claude-opus-4-1",
    max_tokens: 3000,
    messages: [
      {
        role: "user",
        content: themePrompt,
      },
    ],
  });

  const themeText =
    message.content[0].type === "text" ? message.content[0].text : "{}";

  let themeData;
  try {
    themeData = JSON.parse(themeText);
  } catch {
    const cleanedText = themeText
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();
    themeData = JSON.parse(cleanedText);
  }

  return {
    theme: themeData.theme || theme,
    moodBoard: themeData.moodBoard || [],
    colorPalette: themeData.colorPalette || [],
    conceptPrompts: themeData.conceptPrompts || [],
    variations: themeData.variations || [],
  };
}

/**
 * Evolve existing concepts with AI insights
 * Takes existing concepts and generates evolved versions with new perspectives
 */
export async function evolveExistingConcepts(
  concepts: Array<{ name: string; description: string; prompt: string }>,
  evolutionDirection: string
): Promise<
  Array<{
    originalName: string;
    evolvedName: string;
    evolutionInsights: string;
    newPrompt: string;
    enhancedElements: string[];
  }>
> {
  const evolutionPrompt = `As a creative director, evolve these existing concepts with fresh perspectives:

Evolution Direction: ${evolutionDirection}

Existing Concepts:
${concepts
  .map(
    (c, i) => `
${i + 1}. ${c.name}
Description: ${c.description}
Current Prompt: ${c.prompt}
`
  )
  .join("")}

For each concept, create an evolved version that:
1. Maintains core identity
2. Incorporates new artistic perspective
3. Explores the ${evolutionDirection} direction
4. Enhances for maximum Imagen 4 rendering
5. Adds unexpected creative elements

Return JSON array:
[
  {
    "originalName": "Original name",
    "evolvedName": "New evolved name",
    "evolutionInsights": "Explanation of evolution",
    "newPrompt": "Updated Imagen 4 ready prompt",
    "enhancedElements": ["New element 1", "Element 2"]
  }
]

Return ONLY valid JSON array.`;

  const message = await client.messages.create({
    model: "claude-opus-4-1",
    max_tokens: 2500,
    messages: [
      {
        role: "user",
        content: evolutionPrompt,
      },
    ],
  });

  const evolutionText =
    message.content[0].type === "text" ? message.content[0].text : "[]";

  let evolved;
  try {
    evolved = JSON.parse(evolutionText);
  } catch {
    const cleanedText = evolutionText
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();
    evolved = JSON.parse(cleanedText);
  }

  return evolved || [];
}

/**
 * Generate Indian-inspired fashion concepts
 * Creates concepts rooted in Indian aesthetics, traditions, and contemporary fusion
 */
export async function generateIndianFashionConcepts(
  inspirationSource: {
    region?: string;
    tradition?: string;
    era?: string;
    modernFusion?: boolean;
  },
  numberOfConcepts: number = 4
): Promise<
  Array<{
    name: string;
    description: string;
    culturalInsights: string;
    traditionElements: string[];
    modernElements?: string[];
    basePrompt: string;
    variations: Array<{ name: string; prompt: string }>;
    authenticityNote: string;
  }>
> {
  const indianConceptPrompt = `Generate ${numberOfConcepts} Indian-inspired fashion concepts with authentic cultural roots:

Inspiration Source:
${inspirationSource.region ? `- Region: ${inspirationSource.region}` : ""}
${inspirationSource.tradition ? `- Tradition: ${inspirationSource.tradition}` : ""}
${inspirationSource.era ? `- Era: ${inspirationSource.era}` : ""}
${inspirationSource.modernFusion ? `- Modern Fusion Elements: Yes` : ""}

Each concept should:
1. Honor authentic Indian cultural elements
2. Be specifically designed for haute couture photography
3. Include traditional garment details and craftsmanship
4. Work with Imagen 4 generation
5. Be culturally respectful and sensitive
${inspirationSource.modernFusion ? "6. Incorporate contemporary fusion elements" : ""}

Return JSON array:
[
  {
    "name": "Concept name",
    "description": "Detailed description",
    "culturalInsights": "Background and cultural context",
    "traditionElements": ["Element 1", "Element 2"],
    "modernElements": ["Modern element 1", "Element 2"],
    "basePrompt": "Imagen 4 ready prompt",
    "variations": [
      { "name": "Variation", "prompt": "Prompt" }
    ],
    "authenticityNote": "Note on cultural accuracy and respect"
  }
]

Return ONLY valid JSON array.`;

  const message = await client.messages.create({
    model: "claude-opus-4-1",
    max_tokens: 3000,
    messages: [
      {
        role: "user",
        content: indianConceptPrompt,
      },
    ],
  });

  const conceptsText =
    message.content[0].type === "text" ? message.content[0].text : "[]";

  let indianConcepts;
  try {
    indianConcepts = JSON.parse(conceptsText);
  } catch {
    const cleanedText = conceptsText
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();
    indianConcepts = JSON.parse(cleanedText);
  }

  return indianConcepts || [];
}

/**
 * Generate archetype-specific concepts
 * Creates concepts optimized for specific model archetypes
 */
export async function generateArchetypeSpecificConcepts(
  archetypeId: string,
  archetypeDescription: string,
  numberOfConcepts: number = 3
): Promise<
  Array<{
    conceptName: string;
    archetypeFit: string;
    strengths: string[];
    prompt: string;
    variations: Array<{ name: string; prompt: string }>;
  }>
> {
  const archetypePrompt = `Generate ${numberOfConcepts} concepts specifically optimized for this model archetype:

Archetype ID: ${archetypeId}
Description: ${archetypeDescription}

Each concept should:
1. Play to this archetype's unique strengths
2. Include specific styling for this archetype
3. Be Imagen 4 optimized
4. Showcase the archetype's distinctive features
5. Include variations that highlight different aspects

Return JSON array:
[
  {
    "conceptName": "Concept name",
    "archetypeFit": "Why this works for this archetype",
    "strengths": ["Strength 1", "Strength 2"],
    "prompt": "Base Imagen 4 prompt",
    "variations": [
      { "name": "Variation", "prompt": "Prompt" }
    ]
  }
]

Return ONLY valid JSON array.`;

  const message = await client.messages.create({
    model: "claude-opus-4-1",
    max_tokens: 2500,
    messages: [
      {
        role: "user",
        content: archetypePrompt,
      },
    ],
  });

  const conceptsText =
    message.content[0].type === "text" ? message.content[0].text : "[]";

  let archetypeConcepts;
  try {
    archetypeConcepts = JSON.parse(conceptsText);
  } catch {
    const cleanedText = conceptsText
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();
    archetypeConcepts = JSON.parse(cleanedText);
  }

  return archetypeConcepts || [];
}

/**
 * Generate seasonal collection concepts
 * Creates coordinated concepts for fashion seasons with cohesive themes
 */
export async function generateSeasonalCollection(
  season: "spring" | "summer" | "fall" | "winter",
  year: number,
  collectionTheme?: string
): Promise<{
  seasonalTheme: string;
  colorPalette: string[];
  keyTrends: string[];
  concepts: Array<{
    name: string;
    description: string;
    prompt: string;
    seasonalRelevance: string;
  }>;
  narrativeThread: string;
}> {
  const seasonPrompt = `Create a haute couture seasonal collection concept suite for ${season.toUpperCase()} ${year}:

${collectionTheme ? `Collection Theme: ${collectionTheme}` : ""}

Generate:
1. Overall seasonal theme and narrative
2. Color palette (3-5 colors reflecting the season)
3. Key fashion trends for this season
4. 5 coordinated concepts suitable for Imagen 4
5. How each concept fits the season
6. Unifying narrative thread

Each concept should:
- Reflect current fashion trends
- Be seasonally appropriate
- Include relevant textiles and colors
- Work for Imagen 4 generation
- Contribute to collection narrative

Return JSON:
{
  "seasonalTheme": "Overall theme",
  "colorPalette": ["Color 1", "Color 2"],
  "keyTrends": ["Trend 1", "Trend 2"],
  "concepts": [
    {
      "name": "Concept name",
      "description": "Description",
      "prompt": "Imagen 4 prompt",
      "seasonalRelevance": "Why it's relevant to the season"
    }
  ],
  "narrativeThread": "Connecting story"
}

Return ONLY valid JSON.`;

  const message = await client.messages.create({
    model: "claude-opus-4-1",
    max_tokens: 2500,
    messages: [
      {
        role: "user",
        content: seasonPrompt,
      },
    ],
  });

  const seasonalText =
    message.content[0].type === "text" ? message.content[0].text : "{}";

  let seasonalData;
  try {
    seasonalData = JSON.parse(seasonalText);
  } catch {
    const cleanedText = seasonalText
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();
    seasonalData = JSON.parse(cleanedText);
  }

  return {
    seasonalTheme: seasonalData.seasonalTheme || "",
    colorPalette: seasonalData.colorPalette || [],
    keyTrends: seasonalData.keyTrends || [],
    concepts: seasonalData.concepts || [],
    narrativeThread: seasonalData.narrativeThread || "",
  };
}

// Export types and functions
export { ConceptEnhancement, ConceptVariation, ConceptTheme };
