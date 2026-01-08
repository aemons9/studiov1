/**
 * Google Veo 3.1 Video Generation Service
 *
 * Uses Vertex AI API with OAuth token (same as Imagen)
 * Generates 8-second video clips with cinematic quality
 *
 * Updated: Now uses sharedAuthManager for dynamic project ID and auto-refresh tokens
 */

import { getProjectId, getOAuthToken, forceRefreshToken } from '../utils/sharedAuthManager';

const LOCATION_ID = "us-central1";
const API_ENDPOINT = "us-central1-aiplatform.googleapis.com";
const MODEL_ID = "veo-3.1-generate-preview";

// Fallback project ID if proxy not available
const FALLBACK_PROJECT_ID = localStorage.getItem('vertex_project_id') || localStorage.getItem('vera_project_id') || "zaranovel";

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
 * Now supports both provided token and auto-fetch from sharedAuthManager
 */
export async function generateVeoVideo(
  prompt: string,
  accessToken?: string,
  options: Partial<VeoGenerationRequest> = {}
): Promise<VeoGenerationResult> {
  try {
    // Get credentials - use provided token or fetch from auth manager
    let token = accessToken;
    let projectId: string;

    if (!token) {
      console.log('🔄 No token provided, fetching from auth manager...');
      token = await getOAuthToken();
    }

    // Always get dynamic project ID
    try {
      projectId = await getProjectId();
    } catch {
      console.warn('⚠️ Could not fetch project ID, using fallback');
      projectId = FALLBACK_PROJECT_ID;
    }

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

    console.log('🎬 Veo 3.1 Generation Request:', {
      projectId,
      prompt: prompt.substring(0, 100),
      ...requestBody.parameters
    });

    const response = await fetch(
      `https://${API_ENDPOINT}/v1/projects/${projectId}/locations/${LOCATION_ID}/publishers/google/models/${MODEL_ID}:predictLongRunning`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(requestBody)
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Veo API Error:', errorText);

      // If 401, try refreshing token and retry once
      if (response.status === 401) {
        console.log('🔄 Token expired, refreshing and retrying...');
        const newToken = await forceRefreshToken();
        return generateVeoVideo(prompt, newToken, options);
      }

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
  accessToken?: string
): Promise<VeoGenerationResult> {
  try {
    // Get credentials
    let token = accessToken;
    let projectId: string;

    if (!token) {
      token = await getOAuthToken();
    }

    try {
      projectId = await getProjectId();
    } catch {
      projectId = FALLBACK_PROJECT_ID;
    }

    const requestBody = {
      operationName: operationId
    };

    const response = await fetch(
      `https://${API_ENDPOINT}/v1/projects/${projectId}/locations/${LOCATION_ID}/publishers/google/models/${MODEL_ID}:fetchPredictOperation`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
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
