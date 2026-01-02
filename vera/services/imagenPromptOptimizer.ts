import { GoogleGenAI } from "@google/genai";
import { getGeminiApiKey } from '../../services/apiKeyManager';

async function getAiInstance(): Promise<GoogleGenAI> {
  const apiKey = await getGeminiApiKey();
  return new GoogleGenAI({ apiKey });
}

/**
 * Takes a simple user concept and uses Gemini to flesh it out into a more
 * descriptive and evocative version suitable for prompt generation.
 *
 * @param concept - The user's simple input string.
 * @returns A promise that resolves to an optimized, more detailed concept string.
 */
export const optimizePrompt = async (concept: string): Promise<string> => {
  const systemInstruction = `You are a creative assistant. Your task is to take a user's simple idea for a scene and expand it into a more descriptive, evocative, and atmospheric sentence or two. Focus on sensory details, mood, and action. Do not create a full image prompt, just enhance the core concept.

**Example 1:**
User input: "drinking chai on a balcony"
Your output: "A quiet, introspective moment, drinking steaming hot chai on a rain-slicked balcony, watching the bustling city life below."

**Example 2:**
User input: "reading a book"
Your output: "Lost in the world of a leather-bound book in a grand, sun-drenched library, dust motes dancing in the light."

**Example 3:**
User input: "walking in a market"
Your output: "Navigating a vibrant, chaotic spice market at dusk, the air thick with the scent of cardamom and jasmine, her expression a mix of curiosity and wonder."
`;
  
  const userPrompt = `Enhance the following concept: "${concept}"`;
  
  try {
    const ai = await getAiInstance();
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: userPrompt,
        config: { systemInstruction: systemInstruction },
      });
    return response.text.trim();
  } catch (error) {
    console.error("Error in optimizePrompt:", error);
    throw new Error("Failed to optimize the user concept.");
  }
};