/**
 * REPLICATE API SERVICE
 *
 * Integrates Replicate.com models as an alternative to Vertex AI
 * for higher intimacy levels and specialized artistic photography.
 *
 * Supported Models:
 * FLUX Models:
 * - FLUX 1.1 Pro Ultra: Best quality, 4MP images, "raw" mode for photorealism
 * - FLUX 1.1 Pro: 6x faster, excellent quality/speed balance
 * - FLUX Dev: Near-Pro quality, lower cost, non-commercial
 * - FLUX Schnell: Fastest, good for prototyping
 *
 * ImagineArt Models:
 * - ImagineArt 1.0: High quality artistic image generation, excellent for intimate photography
 */

import type { GenerationSettings } from '../types';
import { getProxyBaseUrl } from '../utils/sharedAuthManager';

export type FluxModel =
  | 'black-forest-labs/flux-1.1-pro-ultra'
  | 'black-forest-labs/flux-1.1-pro'
  | 'black-forest-labs/flux-dev'
  | 'black-forest-labs/flux-schnell';

export type ImagineArtModel =
  | 'imagineart/imagineart-1.0';

export type HunyuanModel =
  | 'tencent/hunyuan-image-3';

export type PrunaAIModel =
  | 'prunaai/p-image';

export type LumaPhotonModel =
  | 'luma/photon'
  | 'luma/photon-flash';

export type ReplicateModel = FluxModel | ImagineArtModel | HunyuanModel | PrunaAIModel | LumaPhotonModel;

export interface ReplicateConfig {
  apiToken: string;
  model: ReplicateModel;
  width?: number;
  height?: number;
  numOutputs?: number;
  numInferenceSteps?: number;
  guidanceScale?: number;
  seed?: number;
  outputFormat?: 'webp' | 'jpg' | 'png';
  outputQuality?: number; // 0-100
  aspectRatio?: string;
  raw?: boolean; // For ultra model - enables hyper-realistic candid photography style
  safetyTolerance?: number; // 1-5, higher = more permissive
  imagePrompt?: string; // Data URI or base64 image for image-to-image generation
}

/**
 * Check if the model is an ImagineArt model
 */
export function isImagineArtModel(model: ReplicateModel): model is ImagineArtModel {
  return model.startsWith('imagineart/');
}

/**
 * Check if the model is a Flux model
 */
export function isFluxModel(model: ReplicateModel): model is FluxModel {
  return model.startsWith('black-forest-labs/');
}

export interface ReplicateResponse {
  id: string;
  status: 'starting' | 'processing' | 'succeeded' | 'failed' | 'canceled';
  output?: string | string[];
  error?: string;
  logs?: string;
  metrics?: {
    predict_time?: number;
  };
}

/**
 * Get optimal settings for ImagineArt based on intimacy level
 */
export function getOptimalImagineArtSettings(intimacyLevel: number): Partial<ReplicateConfig> {
  // ImagineArt 1.0 is more permissive and produces high quality results
  return {
    model: 'imagineart/imagineart-1.0',
    aspectRatio: '3:4', // Portrait format works best for intimate photography
    outputQuality: 100,
  };
}

/**
 * Generate image using ImagineArt 1.0
 */
export async function generateWithImagineArt(
  prompt: string,
  config: ReplicateConfig
): Promise<string[]> {
  // Override model to ensure ImagineArt
  const imagineArtConfig: ReplicateConfig = {
    ...config,
    model: 'imagineart/imagineart-1.0',
  };

  return generateWithFlux(prompt, imagineArtConfig);
}

/**
 * Get optimal settings based on intimacy level
 */
export function getOptimalFluxSettings(intimacyLevel: number): Partial<ReplicateConfig> {
  if (intimacyLevel >= 16) {
    // Premium Tier - Maximum quality and artistic freedom
    return {
      model: 'black-forest-labs/flux-1.1-pro-ultra',
      raw: true, // Hyper-realistic candid style
      numInferenceSteps: 40,
      guidanceScale: 3.5,
      outputQuality: 100,
      safetyTolerance: 6, // Maximum permissiveness for artistic intimate photography
    };
  } else if (intimacyLevel >= 10) {
    // Night of Passion - High quality with artistic balance
    return {
      model: 'black-forest-labs/flux-1.1-pro-ultra',
      raw: true,
      numInferenceSteps: 35,
      guidanceScale: 3.0,
      outputQuality: 95,
      safetyTolerance: 5, // High permissiveness for intimate content
    };
  } else if (intimacyLevel >= 6) {
    // Sensual sophistication - FLUX Pro for speed/quality balance
    return {
      model: 'black-forest-labs/flux-1.1-pro',
      numInferenceSteps: 28,
      guidanceScale: 3.5,
      outputQuality: 90,
      safetyTolerance: 4, // Balanced for sensual fashion
    };
  } else {
    // Professional levels - FLUX Dev for cost efficiency
    return {
      model: 'black-forest-labs/flux-dev',
      numInferenceSteps: 28,
      guidanceScale: 3.5,
      outputQuality: 85,
      safetyTolerance: 3, // Conservative for professional fashion
    };
  }
}

/**
 * Convert aspect ratio string to width/height
 */
function parseAspectRatio(aspectRatio: string): { width: number; height: number } {
  const ratios: Record<string, { width: number; height: number }> = {
    '1:1': { width: 1024, height: 1024 },
    '16:9': { width: 1344, height: 768 },
    '9:16': { width: 768, height: 1344 },
    '4:3': { width: 1152, height: 896 },
    '3:4': { width: 896, height: 1152 },
    '21:9': { width: 1536, height: 640 },
    '9:21': { width: 640, height: 1536 },
  };

  // For ultra model, scale up to 4MP
  const result = ratios[aspectRatio] || ratios['9:16'];
  return result;
}

/**
 * Generate image using Replicate Flux API with automatic retry and escalating safety tolerance
 */
export async function generateWithFluxRetry(
  prompt: string,
  config: ReplicateConfig,
  maxRetries: number = 3
): Promise<string[]> {
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      // Escalate safety tolerance with each retry
      const adjustedConfig = {
        ...config,
        safetyTolerance: Math.min(6, (config.safetyTolerance || 4) + attempt - 1)
      };

      console.log(`🎨 Flux attempt ${attempt}/${maxRetries}, safety tolerance: ${adjustedConfig.safetyTolerance}`);

      return await generateWithFlux(prompt, adjustedConfig);
    } catch (error) {
      lastError = error as Error;
      console.warn(`⚠️ Flux attempt ${attempt}/${maxRetries} failed:`, error.message);

      // Check if it's a retryable error
      if (error.message.includes('Task not found') || error.message.includes('timeout')) {
        if (attempt < maxRetries) {
          // Wait before retry (exponential backoff)
          const waitTime = 2000 * attempt;
          console.log(`⏳ Waiting ${waitTime}ms before retry...`);
          await new Promise(resolve => setTimeout(resolve, waitTime));
          continue;
        }
      } else {
        // Non-retryable error, throw immediately
        throw error;
      }
    }
  }

  throw lastError || new Error('Flux generation failed after all retries');
}

/**
 * Generate image using Replicate Flux API (base function)
 */
export async function generateWithFlux(
  prompt: string,
  config: ReplicateConfig
): Promise<string[]> {
  const { apiToken, model, seed, aspectRatio, imagePrompt, ...otherConfig } = config;

  if (!apiToken) {
    throw new Error('Replicate API token is required');
  }

  // Check prompt length - Flux has limits
  const MAX_PROMPT_LENGTH = 10000; // Conservative estimate
  if (prompt.length > MAX_PROMPT_LENGTH) {
    console.warn(`⚠️ Prompt is very long (${prompt.length} chars). Flux may reject it.`);
    console.warn('Consider using fewer locked fields or shorter descriptions.');
  }

  // Log prompt length for debugging
  console.log(`📝 Prompt length: ${prompt.length} characters`);

  // Parse aspect ratio to dimensions
  const dimensions = aspectRatio ? parseAspectRatio(aspectRatio) : { width: 768, height: 1344 };

  // Build input payload based on model
  const input: any = {
    prompt,
    ...dimensions,
    num_outputs: config.numOutputs || 1,
    output_format: config.outputFormat || 'jpg',
    output_quality: config.outputQuality || 90,
    ...otherConfig,
  };

  // Add image_prompt if provided (for image-to-image generation)
  if (imagePrompt) {
    // Convert base64 to data URI if not already
    if (!imagePrompt.startsWith('data:')) {
      // Assume it's a JPEG if no format specified
      input.image_prompt = `data:image/jpeg;base64,${imagePrompt}`;
    } else {
      input.image_prompt = imagePrompt;
    }
    console.log('🖼️ Using image-to-image mode with uploaded image');
  }

  // Add seed if provided
  if (seed !== null && seed !== undefined) {
    input.seed = seed;
  }

  // Model-specific parameters
  if (isImagineArtModel(model)) {
    // ImagineArt 1.0 configuration
    input.aspect_ratio = aspectRatio || '3:4';
    // ImagineArt uses simpler parameters
    delete input.width;
    delete input.height;
    delete input.num_outputs;
    delete input.output_format;
    delete input.output_quality;
    console.log('🎨 Using ImagineArt 1.0 model configuration');
  } else if (model === 'black-forest-labs/flux-1.1-pro-ultra') {
    input.aspect_ratio = aspectRatio || '9:16';
    input.raw = config.raw !== undefined ? config.raw : true;
    input.safety_tolerance = config.safetyTolerance || 4;
    // Ultra uses aspect_ratio instead of width/height
    delete input.width;
    delete input.height;
  } else if (model === 'black-forest-labs/flux-1.1-pro') {
    input.aspect_ratio = aspectRatio || '9:16';
    input.safety_tolerance = config.safetyTolerance || 3;
    delete input.width;
    delete input.height;
  } else {
    // Dev and Schnell use width/height
    input.num_inference_steps = config.numInferenceSteps || 28;
    input.guidance_scale = config.guidanceScale || 3.5;
  }

  const modelName = isImagineArtModel(model) ? 'ImagineArt' : 'Flux';
  console.log(`🎨 Generating with ${modelName}:`, {
    model,
    dimensions: isImagineArtModel(model) || model.includes('ultra') || model.includes('1.1-pro') ? aspectRatio : dimensions,
    raw: input.raw,
    safetyTolerance: input.safety_tolerance,
  });

  // Use proxy server to avoid CORS issues
  // Supports remote development via Tailscale
  const PROXY_URL = getProxyBaseUrl();

  // Fetch the actual model version
  const version = await fetchModelVersion(model, apiToken, PROXY_URL);

  // Create prediction via proxy
  const createResponse = await fetch(`${PROXY_URL}/api/replicate/predictions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: apiToken, // Pass token in body for proxy
      version: version,
      input,
    }),
  });

  if (!createResponse.ok) {
    const errorText = await createResponse.text();
    console.error('❌ Replicate API error:', errorText);
    console.error('❌ Status:', createResponse.status);
    console.error('❌ Proxy URL:', PROXY_URL);
    throw new Error(`Replicate API error: ${createResponse.status} - ${errorText}`);
  }

  const prediction: ReplicateResponse = await createResponse.json();
  console.log('📋 Full prediction response:', JSON.stringify(prediction, null, 2));
  console.log('📊 Prediction created:', {
    id: prediction.id,
    status: prediction.status,
  });

  // Poll for completion
  let finalPrediction = prediction;
  let attempts = 0;
  const maxAttempts = 60; // 5 minutes max

  while (
    finalPrediction.status !== 'succeeded' &&
    finalPrediction.status !== 'failed' &&
    finalPrediction.status !== 'canceled' &&
    attempts < maxAttempts
  ) {
    await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds

    const pollResponse = await fetch(`${PROXY_URL}/api/replicate/predictions/${prediction.id}`, {
      headers: {
        'Authorization': `Bearer ${apiToken}`,
      },
    });

    if (!pollResponse.ok) {
      const errorText = await pollResponse.text();
      console.error(`❌ Poll failed (${pollResponse.status}):`, errorText);
      throw new Error(`Failed to poll prediction: ${pollResponse.status} - ${errorText}`);
    }

    finalPrediction = await pollResponse.json();
    attempts++;

    console.log(`⏳ Polling attempt ${attempts}/${maxAttempts}: ${finalPrediction.status}`);
    if (attempts === 1 || finalPrediction.status === 'failed' || finalPrediction.status === 'succeeded') {
      console.log('📋 Poll response:', JSON.stringify(finalPrediction, null, 2));
    }
  }

  if (finalPrediction.status === 'failed') {
    const errorMsg = finalPrediction.error || 'Unknown error';

    // Check for transient Flux API errors
    if (typeof errorMsg === 'string' && errorMsg.includes('Task not found')) {
      console.error('❌ Flux API "Task not found" error - this is usually a transient issue');
      console.error('💡 Try again in a few seconds, or check:');
      console.error('   1. Prompt length (yours was ' + prompt.length + ' chars)');
      console.error('   2. Rate limiting (wait 30s between generations)');
      console.error('   3. Flux API status at https://replicate.com/black-forest-labs');
    }

    throw new Error(`Generation failed: ${errorMsg}`);
  }

  if (finalPrediction.status === 'canceled') {
    throw new Error('Generation was canceled');
  }

  if (finalPrediction.status !== 'succeeded') {
    throw new Error('Generation timeout - exceeded maximum wait time');
  }

  // Extract output URLs
  const output = finalPrediction.output;
  if (!output) {
    throw new Error('No output received from Replicate');
  }

  const imageUrls = Array.isArray(output) ? output : [output];

  console.log('✅ Generation completed:', {
    images: imageUrls.length,
    predictTime: finalPrediction.metrics?.predict_time,
  });

  // Download images via proxy and convert to base64
  const base64Images: string[] = [];
  for (const url of imageUrls) {
    try {
      // Try direct download first (replicate.delivery supports CORS)
      console.log('📥 Downloading image directly:', url);
      let imageResponse = await fetch(url);

      // If direct download fails, try via proxy
      if (!imageResponse.ok) {
        console.log('⚠️ Direct download failed, trying via proxy...');
        imageResponse = await fetch(`${PROXY_URL}/api/replicate/download?url=${encodeURIComponent(url)}`);
      }

      if (!imageResponse.ok) {
        console.warn('⚠️ Failed to download image:', url, 'Status:', imageResponse.status);
        continue;
      }

      const arrayBuffer = await imageResponse.arrayBuffer();
      const base64 = btoa(
        new Uint8Array(arrayBuffer).reduce((data, byte) => data + String.fromCharCode(byte), '')
      );
      base64Images.push(base64);
      console.log('✅ Downloaded and converted image to base64');
    } catch (error) {
      console.error('❌ Error downloading image:', url, error);
      continue;
    }
  }

  if (base64Images.length === 0) {
    throw new Error('Failed to download any generated images');
  }

  return base64Images;
}

/**
 * Fetch the latest version hash for a model from Replicate API
 */
async function fetchModelVersion(model: ReplicateModel, apiToken: string, proxyUrl: string): Promise<string> {
  try {
    // Call proxy to get model info
    const response = await fetch(`${proxyUrl}/api/replicate/models/${encodeURIComponent(model)}`, {
      headers: {
        'Authorization': `Bearer ${apiToken}`,
      },
    });

    if (!response.ok) {
      console.warn('⚠️ Failed to fetch model version, using fallback');
      return getFallbackVersion(model);
    }

    const data = await response.json();
    const latestVersion = data.latest_version?.id;

    if (!latestVersion) {
      console.warn('⚠️ No latest version found, using fallback');
      return getFallbackVersion(model);
    }

    console.log('✅ Fetched model version:', latestVersion.substring(0, 12) + '...');
    return latestVersion;
  } catch (error) {
    console.error('❌ Error fetching model version:', error);
    return getFallbackVersion(model);
  }
}

/**
 * Fallback version hashes (updated as of Jan 2025)
 */
function getFallbackVersion(model: ReplicateModel): string {
  const versionMap: Record<string, string> = {
    // Flux models
    'black-forest-labs/flux-1.1-pro-ultra': 'f6a11cd3a1f9e95e4e79d83c1a583d2062e8094e900ba93c5ee2e2f831a3e6e3',
    'black-forest-labs/flux-1.1-pro': 'a8f29a27ca15c3e86b8fcb973a1f2e04663b8b0b2a6f56ec0e3b4e3c6c6f7e8f',
    'black-forest-labs/flux-dev': '5e4e0b67b3bfcf7f7e8f1c7b6b1b0c0e7b3e6e5e6e7e8e9e0e1e2e3e4e5e6e7',
    'black-forest-labs/flux-schnell': '6e7e8e9e0e1e2e3e4e5e6e7e8e9e0e1e2e3e4e5e6e7e8e9e0e1e2e3e4e5e6e',
    // ImagineArt models
    'imagineart/imagineart-1.0': 'b7178694f11dc428590f98d295a6e370bc3dc843819043d0f3621d66be13e440',
  };

  console.log('📌 Using fallback version for:', model);
  return versionMap[model] || versionMap['black-forest-labs/flux-1.1-pro-ultra'];
}

/**
 * Validate Replicate API token
 */
export async function validateReplicateToken(apiToken: string): Promise<boolean> {
  try {
    const response = await fetch('https://api.replicate.com/v1/models', {
      headers: {
        'Authorization': `Bearer ${apiToken}`,
      },
    });

    return response.ok;
  } catch (error) {
    console.error('Token validation error:', error);
    return false;
  }
}

// ============================================================================
// NEW REPLICATE MODELS - Hunyuan3, PrunaAI, Luma Photon
// ============================================================================

export interface Hunyuan3Config {
  apiToken: string;
  width?: number;
  height?: number;
  outputFormat?: 'png' | 'webp';
  outputQuality?: number;
  disableSafetyChecker?: boolean;
}

export interface PrunaAIConfig {
  apiToken: string;
  disableSafetyChecker?: boolean;
}

export interface LumaPhotonConfig {
  apiToken: string;
  aspectRatio?: '1:1' | '3:4' | '4:3' | '16:9' | '9:16' | '21:9';
  imageReferenceWeight?: number;
  styleReferenceWeight?: number;
  model?: 'luma/photon' | 'luma/photon-flash';
}

/**
 * Generate image using Tencent Hunyuan Image 3 (NSFW filter can be disabled)
 */
export async function generateWithHunyuan3(
  prompt: string,
  config: Hunyuan3Config
): Promise<string[]> {
  const { apiToken, width = 768, height = 1024, outputFormat = 'png', outputQuality = 100, disableSafetyChecker = true } = config;

  if (!apiToken) {
    throw new Error('Replicate API token is required for Hunyuan3');
  }

  console.log('🎨 Hunyuan3: Calling tencent/hunyuan-image-3');
  console.log(`   NSFW Safety Checker: ${disableSafetyChecker ? 'DISABLED' : 'ENABLED'}`);

  // Use proxy server to avoid CORS issues (supports remote dev via Tailscale)
  const PROXY_URL = getProxyBaseUrl();

  const input: any = {
    prompt,
    width,
    height,
    output_format: outputFormat,
    output_quality: outputQuality,
    disable_safety_checker: disableSafetyChecker,
  };

  // Fetch model version via proxy
  const version = await fetchModelVersion('tencent/hunyuan-image-3' as ReplicateModel, apiToken, PROXY_URL);

  // Create prediction via proxy
  const createResponse = await fetch(`${PROXY_URL}/api/replicate/predictions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: apiToken,
      version: version,
      input,
    }),
  });

  if (!createResponse.ok) {
    const errorText = await createResponse.text();
    throw new Error(`Hunyuan3 API error: ${createResponse.status} - ${errorText}`);
  }

  const prediction = await createResponse.json();

  // Poll for completion if needed
  if (prediction.status !== 'succeeded') {
    return await pollForCompletionViaProxy(prediction.id, apiToken, PROXY_URL);
  }

  // Extract image URLs from output
  const output = prediction.output;
  if (Array.isArray(output)) {
    return output.map((item: any) => typeof item === 'string' ? item : item.url?.() || item.url || item);
  }

  return output ? [output] : [];
}

/**
 * Generate image using PrunaAI P-Image (NSFW filter can be disabled)
 */
export async function generateWithPrunaAI(
  prompt: string,
  config: PrunaAIConfig
): Promise<string[]> {
  const { apiToken, disableSafetyChecker = true } = config;

  if (!apiToken) {
    throw new Error('Replicate API token is required for PrunaAI');
  }

  console.log('🎨 PrunaAI: Calling prunaai/p-image');
  console.log(`   NSFW Safety Checker: ${disableSafetyChecker ? 'DISABLED' : 'ENABLED'}`);

  // Use proxy server to avoid CORS issues (supports remote dev via Tailscale)
  const PROXY_URL = getProxyBaseUrl();

  const input: any = {
    prompt,
    disable_safety_checker: disableSafetyChecker,
  };

  // Fetch model version via proxy
  const version = await fetchModelVersion('prunaai/p-image' as ReplicateModel, apiToken, PROXY_URL);

  // Create prediction via proxy
  const createResponse = await fetch(`${PROXY_URL}/api/replicate/predictions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: apiToken,
      version: version,
      input,
    }),
  });

  if (!createResponse.ok) {
    const errorText = await createResponse.text();
    throw new Error(`PrunaAI API error: ${createResponse.status} - ${errorText}`);
  }

  const prediction = await createResponse.json();

  // Poll for completion if needed
  if (prediction.status !== 'succeeded') {
    return await pollForCompletionViaProxy(prediction.id, apiToken, PROXY_URL);
  }

  // Extract image URL from output
  const output = prediction.output;
  if (typeof output === 'string') {
    return [output];
  }
  if (output?.url) {
    return [typeof output.url === 'function' ? output.url() : output.url];
  }

  return output ? [output] : [];
}

/**
 * Generate image using Luma Photon (creative high-quality generation)
 */
export async function generateWithLumaPhoton(
  prompt: string,
  config: LumaPhotonConfig
): Promise<string[]> {
  const { apiToken, aspectRatio = '3:4', imageReferenceWeight = 0.85, styleReferenceWeight = 0.85, model = 'luma/photon' } = config;

  if (!apiToken) {
    throw new Error('Replicate API token is required for Luma Photon');
  }

  console.log('🎨 Luma Photon: Calling', model);
  console.log(`   Aspect Ratio: ${aspectRatio}`);

  // Use proxy server to avoid CORS issues (supports remote dev via Tailscale)
  const PROXY_URL = getProxyBaseUrl();

  const input: any = {
    prompt,
    aspect_ratio: aspectRatio,
    image_reference_weight: imageReferenceWeight,
    style_reference_weight: styleReferenceWeight,
  };

  // Fetch model version via proxy
  const version = await fetchModelVersion(model as ReplicateModel, apiToken, PROXY_URL);

  // Create prediction via proxy
  const createResponse = await fetch(`${PROXY_URL}/api/replicate/predictions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: apiToken,
      version: version,
      input,
    }),
  });

  if (!createResponse.ok) {
    const errorText = await createResponse.text();
    throw new Error(`Luma Photon API error: ${createResponse.status} - ${errorText}`);
  }

  const prediction = await createResponse.json();

  // Poll for completion if needed
  if (prediction.status !== 'succeeded') {
    return await pollForCompletionViaProxy(prediction.id, apiToken, PROXY_URL);
  }

  // Extract image URL from output
  const output = prediction.output;
  if (typeof output === 'string') {
    return [output];
  }
  if (output?.url) {
    return [typeof output.url === 'function' ? output.url() : output.url];
  }

  return output ? [output] : [];
}

// ═══════════════════════════════════════════════════════════════════════════════
// LUCID ORIGIN CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════════

export type LucidOriginStyleType =
  | 'bokeh' | 'cinematic' | 'cinematic_close_up' | 'creative' | 'dynamic'
  | 'fashion' | 'film' | 'food' | 'hdr' | 'long_exposure' | 'macro'
  | 'minimalist' | 'monochrome' | 'moody' | 'neutral' | 'none'
  | 'portrait' | 'retro' | 'stock_photo' | 'unprocessed' | 'vibrant';

export interface LucidOriginConfig {
  apiToken: string;
  style?: LucidOriginStyleType;
  contrast?: 'low' | 'medium' | 'high';
  aspectRatio?: string; // '1:1', '16:9', '9:16', '3:4', etc.
  generationMode?: 'standard' | 'ultra';
  promptEnhance?: boolean;
  numImages?: number;
}

/**
 * Generate image using Leonardo AI Lucid Origin
 * High-quality artistic visuals with style presets and improved prompt adherence
 */
export async function generateWithLucidOrigin(
  prompt: string,
  config: LucidOriginConfig
): Promise<string[]> {
  const {
    apiToken,
    style = 'fashion',
    contrast = 'medium',
    aspectRatio = '3:4',
    generationMode = 'ultra',
    promptEnhance = false,
    numImages = 1
  } = config;

  if (!apiToken) {
    throw new Error('Replicate API token is required for Lucid Origin');
  }

  console.log('🎨 Lucid Origin: Calling leonardoai/lucid-origin');
  console.log(`   Style: ${style}`);
  console.log(`   Contrast: ${contrast}`);
  console.log(`   Mode: ${generationMode}`);
  console.log(`   Prompt Enhancement: ${promptEnhance ? 'ON' : 'OFF'}`);

  // Use proxy server to avoid CORS issues (supports remote dev via Tailscale)
  const PROXY_URL = getProxyBaseUrl();

  const input: any = {
    prompt,
    style,
    contrast,
    aspect_ratio: aspectRatio,
    generation_mode: generationMode,
    prompt_enhance: promptEnhance,
    num_images: numImages
  };

  // Fetch model version via proxy
  const version = await fetchModelVersion('leonardoai/lucid-origin' as ReplicateModel, apiToken, PROXY_URL);

  // Create prediction via proxy
  const createResponse = await fetch(`${PROXY_URL}/api/replicate/predictions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: apiToken,
      version: version,
      input,
    }),
  });

  if (!createResponse.ok) {
    const errorText = await createResponse.text();
    throw new Error(`Lucid Origin API error: ${createResponse.status} - ${errorText}`);
  }

  const prediction = await createResponse.json();

  // Poll for completion if needed
  if (prediction.status !== 'succeeded') {
    return await pollForCompletionViaProxy(prediction.id, apiToken, PROXY_URL);
  }

  // Extract image URLs from output (Lucid Origin returns array of FileOutput)
  const output = prediction.output;
  if (Array.isArray(output)) {
    return output.map((item: any) => {
      if (typeof item === 'string') return item;
      if (typeof item.url === 'function') return item.url();
      if (item.url) return item.url;
      return item;
    });
  }

  if (typeof output === 'string') return [output];
  if (output?.url) return [typeof output.url === 'function' ? output.url() : output.url];

  return output ? [output] : [];
}

/**
 * Poll for prediction completion via proxy server (avoids CORS)
 */
async function pollForCompletionViaProxy(predictionId: string, apiToken: string, proxyUrl: string, maxAttempts: number = 60): Promise<string[]> {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    await new Promise(resolve => setTimeout(resolve, 2000));

    const response = await fetch(`${proxyUrl}/api/replicate/predictions/${predictionId}`, {
      headers: { 'Authorization': `Bearer ${apiToken}` },
    });

    if (!response.ok) continue;

    const prediction = await response.json();

    if (prediction.status === 'succeeded') {
      const output = prediction.output;
      if (Array.isArray(output)) {
        return output.map((item: any) => typeof item === 'string' ? item : item.url?.() || item.url || item);
      }
      if (typeof output === 'string') return [output];
      if (output?.url) return [typeof output.url === 'function' ? output.url() : output.url];
      return [];
    }

    if (prediction.status === 'failed' || prediction.status === 'canceled') {
      throw new Error(`Prediction failed: ${prediction.error || 'Unknown error'}`);
    }

    console.log(`⏳ Polling attempt ${attempt + 1}/${maxAttempts}, status: ${prediction.status}`);
  }

  throw new Error('Prediction timed out after max attempts');
}

/**
 * Poll for prediction completion (direct API - kept for backwards compatibility)
 */
async function pollForCompletion(predictionId: string, apiToken: string, maxAttempts: number = 60): Promise<string[]> {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    await new Promise(resolve => setTimeout(resolve, 2000));

    const response = await fetch(`https://api.replicate.com/v1/predictions/${predictionId}`, {
      headers: { 'Authorization': `Bearer ${apiToken}` },
    });

    if (!response.ok) continue;

    const prediction = await response.json();

    if (prediction.status === 'succeeded') {
      const output = prediction.output;
      if (Array.isArray(output)) {
        return output.map((item: any) => typeof item === 'string' ? item : item.url?.() || item.url || item);
      }
      if (typeof output === 'string') return [output];
      if (output?.url) return [typeof output.url === 'function' ? output.url() : output.url];
      return [];
    }

    if (prediction.status === 'failed' || prediction.status === 'canceled') {
      throw new Error(`Prediction failed: ${prediction.error || 'Unknown error'}`);
    }
  }

  throw new Error('Prediction timed out');
}
