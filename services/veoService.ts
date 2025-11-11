/**
 * Google Veo 3.1 Video Generation Service
 *
 * Uses Vertex AI API with OAuth token (same as Imagen)
 * Generates 8-second video clips with cinematic quality
 */

const PROJECT_ID = "creatives-476816";
const LOCATION_ID = "us-central1";
const API_ENDPOINT = "us-central1-aiplatform.googleapis.com";
const MODEL_ID = "veo-3.1-generate-preview";

export interface VeoGenerationRequest {
  prompt: string;
  aspectRatio: '16:9' | '9:16' | '1:1';
  durationSeconds: '8';
  resolution: '720p' | '1080p';
  personGeneration: 'allow_adult';
  addWatermark: boolean;
  includeRaiReason: boolean;
  generateAudio: boolean;
}

export interface VeoGenerationResult {
  operationId: string;
  videoUrl?: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  error?: string;
}

/**
 * Start a Veo 3.1 video generation operation
 */
export async function generateVeoVideo(
  prompt: string,
  accessToken: string,
  options: Partial<VeoGenerationRequest> = {}
): Promise<VeoGenerationResult> {
  try {
    const requestBody = {
      instances: [
        {
          prompt: prompt
        }
      ],
      parameters: {
        aspectRatio: options.aspectRatio || '16:9',
        sampleCount: 1, // Always 1 sample
        durationSeconds: '8', // Always 8 seconds
        personGeneration: 'allow_adult', // Always allow adults
        addWatermark: options.addWatermark !== undefined ? options.addWatermark : true,
        includeRaiReason: options.includeRaiReason !== undefined ? options.includeRaiReason : true,
        generateAudio: options.generateAudio !== undefined ? options.generateAudio : true,
        resolution: options.resolution || '720p'
      }
    };

    console.log('🎬 Veo 3.1 Generation Request:', { prompt: prompt.substring(0, 100), ...requestBody.parameters });

    const response = await fetch(
      `https://${API_ENDPOINT}/v1/projects/${PROJECT_ID}/locations/${LOCATION_ID}/publishers/google/models/${MODEL_ID}:predictLongRunning`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(requestBody)
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Veo API Error:', errorText);
      throw new Error(`Veo API request failed: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    console.log('✅ Veo Operation Started:', result);

    // Extract operation ID from response
    const operationId = result.name || '';

    return {
      operationId,
      status: 'pending'
    };
  } catch (error: any) {
    console.error('❌ Veo Generation Error:', error);
    return {
      operationId: '',
      status: 'failed',
      error: error.message
    };
  }
}

/**
 * Check the status of a Veo video generation operation
 */
export async function fetchVeoOperation(
  operationId: string,
  accessToken: string
): Promise<VeoGenerationResult> {
  try {
    const requestBody = {
      operationName: operationId
    };

    const response = await fetch(
      `https://${API_ENDPOINT}/v1/projects/${PROJECT_ID}/locations/${LOCATION_ID}/publishers/google/models/${MODEL_ID}:fetchPredictOperation`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(requestBody)
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Fetch operation failed: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    console.log('📊 Veo Operation Status:', result);

    // Parse operation status
    if (result.done === true) {
      // Operation completed
      if (result.response && result.response.predictions && result.response.predictions[0]) {
        const prediction = result.response.predictions[0];
        const videoUrl = prediction.bytesBase64Encoded || prediction.gcsUri || '';

        return {
          operationId,
          videoUrl,
          status: 'completed'
        };
      } else if (result.error) {
        return {
          operationId,
          status: 'failed',
          error: result.error.message || 'Video generation failed'
        };
      }
    }

    // Still processing
    return {
      operationId,
      status: 'processing'
    };
  } catch (error: any) {
    console.error('❌ Fetch Operation Error:', error);
    return {
      operationId,
      status: 'failed',
      error: error.message
    };
  }
}

/**
 * Poll for video generation completion
 * Default: 100 attempts × 3 seconds = 5 minutes timeout
 */
export async function pollVeoOperation(
  operationId: string,
  accessToken: string,
  maxAttempts: number = 100,
  intervalMs: number = 3000 // 3 seconds
): Promise<VeoGenerationResult> {
  let attempts = 0;

  while (attempts < maxAttempts) {
    const result = await fetchVeoOperation(operationId, accessToken);

    if (result.status === 'completed' || result.status === 'failed') {
      return result;
    }

    // Wait before next poll
    await new Promise(resolve => setTimeout(resolve, intervalMs));
    attempts++;

    console.log(`⏳ Polling attempt ${attempts}/${maxAttempts}...`);
  }

  return {
    operationId,
    status: 'failed',
    error: 'Timeout: Video generation took too long'
  };
}
