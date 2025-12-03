/**
 * Gemini API Helper - API Key Authentication
 * Provides functions for calling Gemini API with API key (no OAuth needed)
 */

import { getGeminiApiKey } from './apiKeyManager';

export interface GeminiAPIConfig {
  apiKey?: string;
  model?: string;
}

/**
 * Call Gemini API for text generation
 */
export async function callGeminiText(
  prompt: string | any[],
  config: GeminiAPIConfig = {}
): Promise<string> {
  const apiKey = config.apiKey || await getGeminiApiKey();
  const model = config.model || 'gemini-2.5-flash';

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const requestBody = {
    contents: Array.isArray(prompt) ? prompt : [
      {
        role: 'user',
        parts: [{ text: prompt }]
      }
    ],
    generationConfig: {
      temperature: 0.9,
      maxOutputTokens: 8192,
    }
  };

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorBody = await response.json();
      throw new Error(`Gemini API Error: ${errorBody?.error?.message || `HTTP ${response.status}`}`);
    }

    const data = await response.json();

    if (data.candidates && data.candidates.length > 0) {
      const candidate = data.candidates[0];
      if (candidate.content?.parts && candidate.content.parts.length > 0) {
        return candidate.content.parts[0].text || '';
      }
    }

    throw new Error("No response from Gemini API");
  } catch (error) {
    console.error("Gemini text generation error:", error);
    throw error;
  }
}

/**
 * Call Gemini API for image generation using Imagen
 * Note: Uses the generativelanguage.googleapis.com endpoint which supports image generation with API keys
 */
export async function callGeminiImage(
  prompt: string,
  options: {
    apiKey?: string;
    model?: string;
    numberOfImages?: number;
    aspectRatio?: string;
    seed?: number;
    negativePrompt?: string;
  } = {}
): Promise<string[]> {
  const apiKey = options.apiKey || await getGeminiApiKey();
  const model = options.model || 'imagen-3.0-generate-001';
  const numberOfImages = options.numberOfImages || 1;
  const aspectRatio = options.aspectRatio || '3:4';

  // For Imagen models through generativelanguage API
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const requestBody: any = {
    contents: [
      {
        parts: [
          {
            text: prompt
          }
        ]
      }
    ],
    generationConfig: {
      responseModalities: ["image"]
      // Note: outputMimeType is not supported by Imagen 4.0 via generativelanguage API
    }
  };

  // Add optional parameters
  if (options.negativePrompt) {
    requestBody.contents[0].parts.push({
      text: `Negative prompt: ${options.negativePrompt}`
    });
  }

  try {
    console.log(`🎨 Generating ${numberOfImages} image(s) with ${model}...`);

    // Generate images (may need multiple calls for multiple images)
    const images: string[] = [];

    for (let i = 0; i < numberOfImages; i++) {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorBody = await response.json();
        console.error('Image generation error:', errorBody);
        throw new Error(`Imagen API Error: ${errorBody?.error?.message || `HTTP ${response.status}`}`);
      }

      const data = await response.json();

      if (data.candidates && data.candidates.length > 0) {
        const candidate = data.candidates[0];
        if (candidate.content?.parts) {
          for (const part of candidate.content.parts) {
            if (part.inlineData?.data) {
              images.push(part.inlineData.data);
            } else if (part.fileData?.fileUri) {
              // Handle file URI if returned
              console.log('Received file URI:', part.fileData.fileUri);
              // You might need to fetch this
            }
          }
        }
      }

      // Add small delay between requests
      if (i < numberOfImages - 1) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }

    if (images.length === 0) {
      throw new Error("No images returned from API. The model may have blocked the request due to safety filters.");
    }

    console.log(`✅ Successfully generated ${images.length} image(s)`);
    return images;

  } catch (error) {
    console.error("Image generation error:", error);
    throw error;
  }
}

/**
 * Stream text generation from Gemini (for real-time responses)
 */
export async function* streamGeminiText(
  prompt: string | any[],
  config: GeminiAPIConfig = {}
): AsyncGenerator<string, void, unknown> {
  const apiKey = config.apiKey || await getGeminiApiKey();
  const model = config.model || 'gemini-2.5-flash';

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent?key=${apiKey}`;

  const requestBody = {
    contents: Array.isArray(prompt) ? prompt : [
      {
        role: 'user',
        parts: [{ text: prompt }]
      }
    ],
    generationConfig: {
      temperature: 0.9,
      maxOutputTokens: 8192,
    }
  };

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorBody = await response.json();
      throw new Error(`Gemini API Error: ${errorBody?.error?.message || `HTTP ${response.status}`}`);
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error("No response body");
    }

    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (line.trim() === '') continue;
        if (line.startsWith('data: ')) {
          try {
            const data = JSON.parse(line.slice(6));
            if (data.candidates && data.candidates.length > 0) {
              const candidate = data.candidates[0];
              if (candidate.content?.parts && candidate.content.parts.length > 0) {
                const text = candidate.content.parts[0].text || '';
                if (text) yield text;
              }
            }
          } catch (e) {
            // Skip invalid JSON
          }
        }
      }
    }
  } catch (error) {
    console.error("Streaming generation error:", error);
    throw error;
  }
}
