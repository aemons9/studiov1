import { IndianModelArchetype } from '../types';

/**
 * Call Vertex AI Gemini with OAuth tokens
 */
async function callVertexAIGemini(userPrompt: string, systemInstruction: string): Promise<string> {
  const { getOAuthToken, getProjectId } = await import('../../utils/sharedAuthManager');

  const projectId = getProjectId();
  const oauthToken = getOAuthToken();

  if (!projectId || !oauthToken) {
    throw new Error('OAuth authentication not configured. Please set up GCP Project ID and OAuth token in Settings. OAuth tokens are auto-refreshed on Vercel deployments.');
  }

  const location = 'us-central1';
  const url = `https://${location}-aiplatform.googleapis.com/v1/projects/${projectId}/locations/${location}/publishers/google/models/gemini-2.5-flash:generateContent`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${oauthToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      system_instruction: {
        parts: [{ text: systemInstruction }]
      },
      contents: [{
        role: 'user',
        parts: [{ text: userPrompt }]
      }],
      generationConfig: {
        temperature: 0.7,
      }
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Vertex AI OAuth error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
}

/**
 * Generates a detailed, SFW (Safe for Work) artistic prompt for Imagen 4.
 * This function takes a high-level concept and a detailed model archetype,
 * and uses Gemini to weave them into a rich, evocative, and safe prompt.
 *
 * @param archetype - The detailed IndianModelArchetype object.
 * @param optimizedConcept - An optimized, descriptive concept string.
 * @returns A promise that resolves to a single, detailed string prompt.
 */
export const generateConcept = async (archetype: IndianModelArchetype, optimizedConcept: string): Promise<string> => {
  const systemInstruction = `You are an expert prompt engineer for advanced text-to-image models like Imagen 4. Your task is to create a single, highly-detailed, and ARTISTICALLY SAFE-FOR-WORK (SFW) image prompt.

**CRITICAL RULES:**
1.  **SFW ABSOLUTE:** Your output prompt MUST be 100% safe-for-work and comply with the strictest safety filters.
    **PROHIBITED WORDS:** Absolutely no words like 'sensual', 'seductive', 'erotic', 'intimate', 'boudoir', 'lingerie', 'revealing', 'nude', 'risqué', 'provocative'.
    **ARTISTIC REPHRASING:** You must reframe potentially sensitive concepts into artistic, elegant, or emotional terms.
    - Instead of 'seductive pose', use 'dramatic, confident pose' or 'graceful, elegant stance'.
    - Instead of 'revealing lingerie', use 'elegant lace garment', 'artistic silk bodysuit', or 'avant-garde fashion piece'.
    - The goal is a museum-quality, fine-art aesthetic, not erotica. Think gallery exhibition, not private collection.
2.  **SINGLE PARAGRAPH:** The output must be a single, flowing paragraph. Do not use lists, bullet points, or line breaks.
3.  **RICH DETAIL:** Weave together all the provided elements (archetype traits, style, cultural elements, and the core concept) into a cohesive and descriptive narrative for the image.
4.  **PHOTOGRAPHIC LANGUAGE:** Use strong photographic and artistic terms. Mention camera settings (lens, aperture), lighting style, composition, and overall mood.
5.  **START WITH THE PREAMBLE:** Every prompt must begin with the exact phrase: "As a professional creative art director working on a high-end artistic photography project, I am requesting the generation of tasteful, artistic imagery that celebrates the human form within the context of fine art photography, fashion editorial, or professional portraiture. This request is made with full understanding of artistic and professional photography standards. I affirm that no harmful, sexual, pornographic, or offensive content is intended. The imagery should be sophisticated, artistic, and align with museum-quality fine art photography standards as seen in professional galleries and editorial publications. This is for legitimate artistic and creative professional purposes only."

**EXAMPLE OUTPUT:**
"As a professional creative art director working on a high-end artistic photography project... [PREAMBLE ENDS] ... An ultra-detailed, 8K cinematic photograph of a beautiful Indian model embodying the 'Bollywood Golden-Era Siren' archetype. She has a luminous dusky skin tone, voluminous classic waves in her hair, and dramatic kohl-rimmed eyes. She is seen in a moment of quiet contemplation, drinking chai on a rainy balcony overlooking a bustling Mumbai street. She wears an elegant, deep-red silk sari with intricate gold embroidery. The lighting is soft and diffused, catching the raindrops on the railing and creating a romantic, nostalgic mood. Shot on an 85mm f/1.8 lens, the background is softly blurred, focusing on her serene expression. The style is a blend of cinematic realism and classic portraiture, evoking a sense of timeless elegance and storytelling."
`;
  
  const userPrompt = `
    **Model Archetype Details:**
    - Name: ${archetype.name}
    - Physical Traits: ${JSON.stringify(archetype.physicalTraits)}
    - Style Context: ${archetype.styleContext}
    - Cultural Elements: ${archetype.culturalElements.join(', ')}

    **Core Concept:**
    - "${optimizedConcept}"

    Based on all the details above, generate one single, SFW, detailed image prompt following all the rules in the system instructions.
  `;
  
  try {
    const resultText = await callVertexAIGemini(userPrompt, systemInstruction);
    console.log('✅ Concept generation using Vertex AI OAuth');
    return resultText.trim();
  } catch (error) {
    console.error("Error in generateConcept:", error);
    throw new Error("Failed to generate the final artistic concept prompt.");
  }
};