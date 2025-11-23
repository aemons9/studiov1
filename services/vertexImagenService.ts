/**
 * Vertex AI Imagen Service - OAuth Authentication
 * Uses the aiplatform.googleapis.com endpoint (NOT generativelanguage.googleapis.com)
 */

export interface VertexImagenConfig {
  projectId: string;
  location?: string; // Default: us-central1
  accessToken: string;
  model?: string; // Default: imagen-4.0-ultra-generate-001
}

export interface VertexImagenParameters {
  aspectRatio?: string; // "1:1", "3:4", "4:3", "9:16", "16:9"
  sampleCount?: number; // 1-4
  negativePrompt?: string;
  enhancePrompt?: boolean;
  personGeneration?: 'dont_allow' | 'allow_adult' | 'allow_all';
  safetySetting?: 'block_most' | 'block_some' | 'block_few' | 'block_fewest';
  addWatermark?: boolean;
  includeRaiReason?: boolean;
  language?: string; // "auto" or language code
}

/**
 * Generate images with Vertex AI Imagen (OAuth)
 * Uses the correct aiplatform.googleapis.com endpoint
 */
export async function generateWithVertexImagen(
  prompt: string,
  config: VertexImagenConfig,
  parameters: VertexImagenParameters = {}
): Promise<string[]> {
  const location = config.location || 'us-central1';
  const model = config.model || 'imagen-4.0-ultra-generate-001';

  // Build Vertex AI endpoint (aiplatform, not generativelanguage!)
  const endpoint = `https://${location}-aiplatform.googleapis.com/v1/projects/${config.projectId}/locations/${location}/publishers/google/models/${model}:predict`;

  // Build request body in Vertex AI format
  const requestBody = {
    instances: [
      {
        prompt: prompt
      }
    ],
    parameters: {
      aspectRatio: parameters.aspectRatio || '1:1',
      sampleCount: parameters.sampleCount || 1,
      negativePrompt: parameters.negativePrompt || '',
      enhancePrompt: parameters.enhancePrompt || false,
      personGeneration: parameters.personGeneration || 'allow_adult',
      safetySetting: parameters.safetySetting || 'block_few',
      addWatermark: parameters.addWatermark !== undefined ? parameters.addWatermark : false,
      includeRaiReason: parameters.includeRaiReason !== undefined ? parameters.includeRaiReason : true,
      language: parameters.language || 'auto'
    }
  };

  console.log(`🎨 Vertex AI Imagen Generation:`, {
    endpoint,
    model,
    location,
    projectId: config.projectId,
    aspectRatio: requestBody.parameters.aspectRatio,
    sampleCount: requestBody.parameters.sampleCount,
    hasToken: !!config.accessToken
  });

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.accessToken}`
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({ error: { message: `HTTP ${response.status}` } }));
      console.error('❌ Vertex AI Imagen Error:', errorBody);

      throw new Error(
        `Vertex AI Imagen Error (${response.status}): ${errorBody?.error?.message || 'Unknown error'}`
      );
    }

    const data = await response.json();
    console.log('✅ Vertex AI Response received:', {
      hasPredictions: !!data.predictions,
      predictionCount: data.predictions?.length || 0,
      fullResponse: data // Log entire response to debug structure
    });

    // Extract base64 images from predictions
    const images: string[] = [];

    if (data.predictions && Array.isArray(data.predictions)) {
      for (let i = 0; i < data.predictions.length; i++) {
        const prediction = data.predictions[i];

        console.log(`🔍 Prediction ${i} structure:`, {
          keys: Object.keys(prediction),
          hasBytesBase64Encoded: !!prediction.bytesBase64Encoded,
          bytesLength: prediction.bytesBase64Encoded?.length || 0,
          prediction: prediction // Full prediction object
        });

        // Vertex AI returns base64 images in bytesBase64Encoded field
        if (prediction.bytesBase64Encoded) {
          const imageData = prediction.bytesBase64Encoded;
          console.log(`📦 Image data length: ${imageData.length} bytes`);
          images.push(imageData);
        }
        // Or sometimes in mimeType/bytesBase64Encoded structure
        else if (prediction.mimeType && prediction.bytesBase64Encoded) {
          images.push(prediction.bytesBase64Encoded);
        }
      }
    }

    if (images.length === 0) {
      // Check if blocked by safety filters
      if (data.predictions && data.predictions[0]?.raiFilteredReason) {
        const reason = data.predictions[0].raiFilteredReason;
        throw new Error(`Blocked by safety filters: ${reason}`);
      }

      throw new Error('No images returned from Vertex AI Imagen. Check safety filters or request format.');
    }

    console.log(`✅ Successfully generated ${images.length} image(s) with Vertex AI Imagen`);
    return images;

  } catch (error) {
    console.error('❌ Vertex AI Imagen generation failed:', error);
    throw error;
  }
}

/**
 * Map aspect ratios to Vertex AI format
 */
export function mapAspectRatioForVertex(ratio: string): string {
  const validRatios = ['1:1', '3:4', '4:3', '9:16', '16:9'];

  // Direct match
  if (validRatios.includes(ratio)) {
    return ratio;
  }

  // Handle variations
  const ratioMap: Record<string, string> = {
    'square': '1:1',
    'portrait': '3:4',
    'landscape': '4:3',
    'vertical': '9:16',
    'horizontal': '16:9',
    '3:5': '3:4', // Closest match
    '2:3': '3:4',
    '16:10': '16:9',
    '21:9': '16:9'
  };

  return ratioMap[ratio] || '1:1'; // Default to square
}
