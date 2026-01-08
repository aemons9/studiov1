/**
 * Vertex AI Imagen Service - OAuth Authentication
 * Uses the aiplatform.googleapis.com endpoint (NOT generativelanguage.googleapis.com)
 *
 * Updated: Now integrates with sharedAuthManager for auto-refresh tokens
 */

import { getOAuthToken, getProjectId, forceRefreshToken } from '../utils/sharedAuthManager';

export interface VertexImagenConfig {
  projectId: string;
  location?: string; // Default: us-central1
  accessToken: string;
  model?: string; // Default: imagen-4.0-ultra-generate-001
}

export interface VertexImagenParameters {
  aspectRatio?: string; // "1:1", "3:4", "4:3", "9:16", "16:9"
  sampleCount?: number; // 1-4
  sampleImageSize?: string; // "256", "512", "1024", "2048" - Higher = better quality
  negativePrompt?: string;
  enhancePrompt?: boolean;
  personGeneration?: 'dont_allow' | 'allow_adult' | 'allow_all';
  safetySetting?: 'block_most' | 'block_some' | 'block_few' | 'block_fewest';
  addWatermark?: boolean;
  includeRaiReason?: boolean;
  language?: string; // "auto" or language code
  outputMimeType?: 'image/png' | 'image/jpeg'; // Output format
  compressionQuality?: number; // 0-100, for JPEG only
}

/**
 * Get Vertex AI config with auto-refreshed credentials
 * Convenience function that fetches token and project ID automatically
 */
export async function getAutoRefreshConfig(
  model?: string,
  location?: string
): Promise<VertexImagenConfig> {
  const [accessToken, projectId] = await Promise.all([
    getOAuthToken(),
    getProjectId()
  ]);

  return {
    projectId,
    accessToken,
    location: location || 'us-central1',
    model: model || 'imagen-4.0-ultra-generate-001'
  };
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
  // Validate configuration
  if (!config.projectId || config.projectId.trim().length === 0) {
    throw new Error('❌ Project ID is required for Vertex AI Imagen');
  }

  if (!config.accessToken || config.accessToken.trim().length === 0) {
    throw new Error('❌ OAuth Access Token is required for Vertex AI Imagen');
  }

  // Check for truncated project ID (common issue)
  if (config.projectId.includes('...') || config.projectId.includes('…')) {
    throw new Error(
      `❌ PROJECT ID IS TRUNCATED\n\n` +
      `Your project ID appears to be cut off: "${config.projectId}"\n\n` +
      `Please enter your COMPLETE Google Cloud Project ID.\n` +
      `You can find it at: https://console.cloud.google.com/home/dashboard`
    );
  }

  // Check for suspiciously short project ID
  if (config.projectId.length < 6) {
    throw new Error(
      `❌ PROJECT ID TOO SHORT\n\n` +
      `The project ID "${config.projectId}" seems incomplete.\n\n` +
      `A valid Google Cloud Project ID is typically 20-30 characters.\n` +
      `Please check and enter the complete project ID.`
    );
  }

  // Check for suspiciously short OAuth token
  if (config.accessToken.length < 20) {
    throw new Error(
      `❌ OAUTH TOKEN TOO SHORT\n\n` +
      `The OAuth token appears incomplete (${config.accessToken.length} characters).\n\n` +
      `A valid OAuth token is typically hundreds of characters long.\n` +
      `Please regenerate and copy the complete token.`
    );
  }

  const location = config.location || 'us-central1';
  const model = config.model || 'imagen-4.0-ultra-generate-001';

  // Build Vertex AI endpoint (aiplatform, not generativelanguage!)
  const endpoint = `https://${location}-aiplatform.googleapis.com/v1/projects/${config.projectId}/locations/${location}/publishers/google/models/${model}:predict`;

  // Determine output mime type
  const mimeType = parameters.outputMimeType || 'image/png';
  const compressionQuality = parameters.compressionQuality || 100;

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
      sampleImageSize: parameters.sampleImageSize || '2048', // Maximum quality: 2048x2048 or aspect ratio equivalent
      negativePrompt: parameters.negativePrompt || '',
      enhancePrompt: parameters.enhancePrompt || false,
      personGeneration: parameters.personGeneration || 'allow_adult',
      safetySetting: parameters.safetySetting || 'block_few',
      addWatermark: parameters.addWatermark !== undefined ? parameters.addWatermark : false,
      includeRaiReason: parameters.includeRaiReason !== undefined ? parameters.includeRaiReason : true,
      language: parameters.language || 'auto',
      // Output format configuration (nested structure per API docs)
      outputOptions: {
        mimeType: mimeType,
        compressionQuality: compressionQuality
      }
    }
  };

  console.log(`🎨 Vertex AI Imagen Generation:`, {
    endpoint,
    model,
    location,
    projectId: config.projectId,
    projectIdLength: config.projectId.length,
    aspectRatio: requestBody.parameters.aspectRatio,
    sampleCount: requestBody.parameters.sampleCount,
    sampleImageSize: requestBody.parameters.sampleImageSize, // Resolution quality
    outputOptions: requestBody.parameters.outputOptions,
    tokenLength: config.accessToken.length,
    tokenPrefix: config.accessToken.substring(0, 20) + '...'
  });

  console.log('📋 Full request parameters:', JSON.stringify(requestBody.parameters, null, 2));

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

      // Enhanced error handling for common issues
      let errorMessage = `Vertex AI Imagen Error (${response.status}): `;

      if (response.status === 403) {
        const fullError = errorBody?.error?.message || '';

        if (fullError.includes('Permission') && fullError.includes('denied')) {
          errorMessage = `🔒 VERTEX AI PERMISSION DENIED (403)\n\n` +
                        `❌ Your OAuth token doesn't have permission to access Vertex AI Imagen.\n\n` +
                        `🔍 Project ID: ${config.projectId}\n` +
                        `📍 Location: ${location}\n` +
                        `🎨 Model: ${model}\n\n` +
                        `✅ REQUIRED IAM ROLES:\n` +
                        `  1. Vertex AI User (roles/aiplatform.user)\n` +
                        `  2. Service Usage Consumer (roles/serviceusage.serviceUsageConsumer)\n\n` +
                        `📝 HOW TO FIX:\n` +
                        `  1. Go to: https://console.cloud.google.com/iam-admin/iam?project=${config.projectId}\n` +
                        `  2. Find your account in the IAM table\n` +
                        `  3. Click the Edit icon (pencil) next to your account\n` +
                        `  4. Click "ADD ANOTHER ROLE"\n` +
                        `  5. Search for and add "Vertex AI User"\n` +
                        `  6. Click "ADD ANOTHER ROLE" again\n` +
                        `  7. Search for and add "Service Usage Consumer"\n` +
                        `  8. Click "SAVE"\n` +
                        `  9. Wait 1-2 minutes for permissions to propagate\n` +
                        `  10. Regenerate your OAuth token\n\n` +
                        `💡 TIP: Make sure your project ID is complete (not truncated)\n\n` +
                        `📋 Full error: ${fullError}`;
        } else {
          errorMessage += fullError || 'Forbidden - Check your project ID and OAuth token';
        }
      } else if (response.status === 401) {
        errorMessage = `🔐 AUTHENTICATION FAILED (401)\n\n` +
                      `❌ Your OAuth token is invalid or expired.\n\n` +
                      `📝 HOW TO FIX:\n` +
                      `  1. Regenerate your OAuth token\n` +
                      `  2. Update it in your settings\n\n` +
                      `📋 Full error: ${errorBody?.error?.message || 'Unauthorized'}`;
      } else if (response.status === 404) {
        errorMessage = `🔍 NOT FOUND (404)\n\n` +
                      `❌ The Vertex AI endpoint or model was not found.\n\n` +
                      `🔍 Check your settings:\n` +
                      `  • Project ID: ${config.projectId}\n` +
                      `  • Location: ${location}\n` +
                      `  • Model: ${model}\n\n` +
                      `💡 Make sure:\n` +
                      `  1. Your project ID is complete and correct\n` +
                      `  2. Vertex AI API is enabled in your project\n` +
                      `  3. The model name is correct\n\n` +
                      `📋 Full error: ${errorBody?.error?.message || 'Not Found'}`;
      } else if (response.status === 429) {
        const fullError = errorBody?.error?.message || '';
        errorMessage = `⏱️ QUOTA EXCEEDED (429)\n\n` +
                      `❌ You've exceeded your quota for model: ${model}\n\n` +
                      `🔄 AUTOMATIC FALLBACK OPTIONS:\n` +
                      `  • Imagen 4.0 Ultra (imagen-4.0-ultra-generate-001)\n` +
                      `  • Imagen 4.0 Fast (imagen-4.0-fast-generate-001)\n\n` +
                      `💡 TIP: The system will automatically try alternative models\n\n` +
                      `📋 Full error: ${fullError}`;
      } else {
        errorMessage += errorBody?.error?.message || 'Unknown error';
      }

      throw new Error(errorMessage);
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
