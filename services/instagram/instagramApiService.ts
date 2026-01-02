/**
 * INSTAGRAM GRAPH API SERVICE
 *
 * Official Instagram Graph API integration for publishing content.
 * Uses the official Meta/Facebook Graph API endpoints.
 *
 * IMPORTANT: This service ONLY uses official Graph API endpoints:
 * - POST graph.facebook.com/{ig-user-id}/media (create container)
 * - POST graph.facebook.com/{ig-user-id}/media_publish (publish container)
 *
 * Instagram Graph API does NOT accept:
 * - Local file uploads
 * - Base64 encoded images
 * - Multipart form data
 *
 * Images MUST be accessible via public HTTPS URLs.
 */

import type {
  InstagramConfig,
  InstagramPublishInput,
  InstagramPublishResult,
  MediaContainerResponse,
  MediaContainerStatus,
  MediaPublishResponse,
  RateLimitState,
  INSTAGRAM_API_LIMITS,
} from './types';

import {
  hostImage,
  validatePublicUrl,
  type HostImageResult,
} from './imageHostingService';

import type { ImageHostingConfig } from './types';

// ============================================================================
// CONSTANTS
// ============================================================================

const GRAPH_API_BASE = 'https://graph.facebook.com/v21.0';

/**
 * Default Instagram Business Account ID for @veracrvs
 */
export const DEFAULT_INSTAGRAM_ACCOUNT_ID = '17841478517688462';

/**
 * Default Facebook Page ID for Studiov
 */
export const DEFAULT_FACEBOOK_PAGE_ID = '888169534380297';

// ============================================================================
// RATE LIMITING
// ============================================================================

const RATE_LIMIT_KEY = 'instagram_rate_limit';

/**
 * Get current rate limit state
 */
export function getRateLimitState(): RateLimitState {
  const stored = localStorage.getItem(RATE_LIMIT_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      // Invalid state, reset
    }
  }

  // Initialize fresh rate limit state
  const now = Date.now();
  return {
    callCount: 0,
    windowStart: now,
    remaining: 25, // Posts per day
    resetAt: now + 24 * 60 * 60 * 1000, // 24 hours from now
  };
}

/**
 * Update rate limit state after API call
 */
function updateRateLimitState(success: boolean): void {
  const state = getRateLimitState();
  const now = Date.now();

  // Reset window if expired
  if (now >= state.resetAt) {
    state.callCount = 0;
    state.windowStart = now;
    state.remaining = 25;
    state.resetAt = now + 24 * 60 * 60 * 1000;
  }

  if (success) {
    state.callCount++;
    state.remaining = Math.max(0, 25 - state.callCount);
  }

  localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(state));
}

/**
 * Check if we can make another API call
 */
export function canMakeApiCall(): { allowed: boolean; reason?: string } {
  const state = getRateLimitState();
  const now = Date.now();

  // Reset if window expired
  if (now >= state.resetAt) {
    return { allowed: true };
  }

  // Check remaining posts
  if (state.remaining <= 0) {
    const resetIn = Math.ceil((state.resetAt - now) / 1000 / 60);
    return {
      allowed: false,
      reason: `Rate limit reached. Resets in ${resetIn} minutes.`,
    };
  }

  return { allowed: true };
}

// ============================================================================
// CAPTION HELPERS
// ============================================================================

/**
 * Format caption with hashtags for Instagram
 */
export function formatCaption(
  caption?: string,
  hashtags?: string[]
): string {
  const parts: string[] = [];

  // Add caption if provided
  if (caption?.trim()) {
    parts.push(caption.trim());
  }

  // Add hashtags if provided
  if (hashtags && hashtags.length > 0) {
    // Ensure hashtags start with #
    const formattedHashtags = hashtags
      .map(tag => tag.startsWith('#') ? tag : `#${tag}`)
      .slice(0, 30) // Instagram max: 30 hashtags
      .join(' ');

    if (parts.length > 0) {
      parts.push('\n\n'); // Double newline before hashtags
    }
    parts.push(formattedHashtags);
  }

  const finalCaption = parts.join('');

  // Instagram max caption length: 2200 characters
  if (finalCaption.length > 2200) {
    return finalCaption.substring(0, 2197) + '...';
  }

  return finalCaption;
}

/**
 * Generate default hashtags based on content type
 */
export function getDefaultHashtags(style: string = 'fashion'): string[] {
  const hashtagSets: Record<string, string[]> = {
    fashion: [
      'fashion', 'style', 'ootd', 'fashionphotography', 'model',
      'instafashion', 'fashionista', 'photography', 'editorial',
      'highfashion', 'luxuryfashion', 'fashionmodel'
    ],
    artistic: [
      'art', 'photography', 'artistic', 'fineart', 'photoart',
      'visualart', 'creative', 'artphotography', 'contemporaryart'
    ],
    portrait: [
      'portrait', 'portraitphotography', 'portraitmood', 'portraitpage',
      'portraits', 'portraiture', 'moodyportraits', 'portraitgames'
    ],
    luxury: [
      'luxury', 'luxurylifestyle', 'luxuryfashion', 'elegance',
      'sophisticated', 'highend', 'exclusive', 'premiumquality'
    ],
    minimal: [
      'minimal', 'minimalism', 'minimalist', 'minimalstyle',
      'simplicity', 'lessismore', 'cleandesign'
    ],
  };

  return hashtagSets[style] || hashtagSets.fashion;
}

// ============================================================================
// INSTAGRAM GRAPH API CORE
// ============================================================================

/**
 * Step 1: Create a media container
 *
 * This creates a container that Instagram will process.
 * The image_url must be publicly accessible via HTTPS.
 *
 * @see https://developers.facebook.com/docs/instagram-api/guides/content-publishing
 */
export async function createMediaContainer(
  imageUrl: string,
  caption: string,
  config: InstagramConfig
): Promise<{ success: boolean; containerId?: string; error?: string }> {
  const { instagramBusinessAccountId, accessToken } = config;

  console.log('📦 Creating Instagram media container...');
  console.log(`   Image URL: ${imageUrl}`);
  console.log(`   Caption length: ${caption.length} chars`);

  try {
    // Build the API URL with parameters
    const url = new URL(`${GRAPH_API_BASE}/${instagramBusinessAccountId}/media`);

    // Request body
    const params = new URLSearchParams({
      image_url: imageUrl,
      caption: caption,
      access_token: accessToken,
    });

    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('❌ Container creation failed:', data);
      return {
        success: false,
        error: data.error?.message || `API error: ${response.status}`,
      };
    }

    console.log(`✅ Container created: ${data.id}`);

    return {
      success: true,
      containerId: data.id,
    };
  } catch (error) {
    console.error('❌ Container creation error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Step 1b: Check media container status
 *
 * After creating a container, Instagram processes the image.
 * This can take a few seconds. We need to poll until it's ready.
 */
export async function checkContainerStatus(
  containerId: string,
  accessToken: string
): Promise<{ status: MediaContainerStatus; statusCode?: string; error?: string }> {
  try {
    const url = new URL(`${GRAPH_API_BASE}/${containerId}`);
    url.searchParams.set('fields', 'status,status_code');
    url.searchParams.set('access_token', accessToken);

    const response = await fetch(url.toString());
    const data = await response.json();

    if (!response.ok) {
      return {
        status: 'ERROR',
        error: data.error?.message || 'Failed to check status',
      };
    }

    return {
      status: data.status || 'IN_PROGRESS',
      statusCode: data.status_code,
    };
  } catch (error) {
    return {
      status: 'ERROR',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Wait for container to be ready
 * Polls the status until FINISHED or error
 */
async function waitForContainerReady(
  containerId: string,
  accessToken: string,
  maxWaitMs: number = 60000,
  pollIntervalMs: number = 2000
): Promise<{ ready: boolean; error?: string }> {
  const startTime = Date.now();

  console.log(`⏳ Waiting for container ${containerId} to be ready...`);

  while (Date.now() - startTime < maxWaitMs) {
    const status = await checkContainerStatus(containerId, accessToken);

    console.log(`   Status: ${status.status}`);

    if (status.status === 'FINISHED') {
      return { ready: true };
    }

    if (status.status === 'ERROR') {
      return {
        ready: false,
        error: status.statusCode || status.error || 'Container processing failed',
      };
    }

    if (status.status === 'EXPIRED') {
      return {
        ready: false,
        error: 'Container expired before publishing',
      };
    }

    // Wait before next poll
    await new Promise(resolve => setTimeout(resolve, pollIntervalMs));
  }

  return {
    ready: false,
    error: `Timeout waiting for container (${maxWaitMs / 1000}s)`,
  };
}

/**
 * Step 2: Publish the media container
 *
 * This actually posts the content to Instagram.
 * The container must have status FINISHED before publishing.
 */
export async function publishMediaContainer(
  containerId: string,
  config: InstagramConfig
): Promise<{ success: boolean; mediaId?: string; error?: string }> {
  const { instagramBusinessAccountId, accessToken } = config;

  console.log(`📤 Publishing container ${containerId}...`);

  try {
    const url = new URL(`${GRAPH_API_BASE}/${instagramBusinessAccountId}/media_publish`);

    const params = new URLSearchParams({
      creation_id: containerId,
      access_token: accessToken,
    });

    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('❌ Publish failed:', data);
      return {
        success: false,
        error: data.error?.message || `Publish error: ${response.status}`,
      };
    }

    console.log(`✅ Published! Media ID: ${data.id}`);

    // Update rate limit tracking
    updateRateLimitState(true);

    return {
      success: true,
      mediaId: data.id,
    };
  } catch (error) {
    console.error('❌ Publish error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// ============================================================================
// MAIN PUBLISHING FUNCTION
// ============================================================================

/**
 * Publish an image to Instagram
 *
 * This is the main entry point for Instagram publishing.
 * It handles the complete flow:
 * 1. Host the image at a public URL (if not already hosted)
 * 2. Create a media container via Graph API
 * 3. Wait for container to be ready
 * 4. Publish the container
 *
 * @param input - Publishing input (image data, caption, hashtags)
 * @param instagramConfig - Instagram API configuration
 * @param hostingConfig - Image hosting configuration
 */
export async function publishToInstagram(
  input: InstagramPublishInput,
  instagramConfig: InstagramConfig,
  hostingConfig: ImageHostingConfig
): Promise<InstagramPublishResult> {
  console.log('📸 Starting Instagram publish flow...');

  // Check rate limits first
  const rateLimitCheck = canMakeApiCall();
  if (!rateLimitCheck.allowed) {
    return {
      success: false,
      error: {
        code: 'RATE_LIMITED',
        message: rateLimitCheck.reason || 'Rate limit exceeded',
      },
    };
  }

  try {
    // Step 1: Host the image to get a public URL
    console.log('🌐 Step 1: Hosting image...');

    let publicUrl: string;

    // Check if imageData is already a public URL
    if (input.imageData.startsWith('https://')) {
      // Validate it's accessible
      const validation = await validatePublicUrl(input.imageData);
      if (validation.valid) {
        publicUrl = input.imageData;
        console.log(`   Using existing URL: ${publicUrl}`);
      } else {
        return {
          success: false,
          error: {
            code: 'INVALID_URL',
            message: `Image URL not accessible: ${validation.error}`,
          },
        };
      }
    } else {
      // Upload to hosting provider
      const hostResult = await hostImage(
        input.imageData,
        input.format,
        hostingConfig
      );

      if (!hostResult.success || !hostResult.publicUrl) {
        return {
          success: false,
          error: {
            code: 'HOSTING_FAILED',
            message: hostResult.error || 'Failed to host image',
          },
        };
      }

      publicUrl = hostResult.publicUrl;
      console.log(`   Hosted at: ${publicUrl}`);

      // Wait a moment for GitHub to propagate the file
      // Raw URLs should be available almost immediately
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Validate the URL is accessible
      const validation = await validatePublicUrl(publicUrl);
      if (!validation.valid) {
        console.warn(`⚠️ URL validation failed, proceeding anyway: ${validation.error}`);
        // Continue anyway - sometimes HEAD requests fail but the URL works
      }
    }

    // Step 2: Format caption with hashtags
    console.log('📝 Step 2: Formatting caption...');
    const finalCaption = formatCaption(input.caption, input.hashtags);
    console.log(`   Caption: ${finalCaption.substring(0, 50)}...`);

    // Step 3: Create media container
    console.log('📦 Step 3: Creating media container...');
    const containerResult = await createMediaContainer(
      publicUrl,
      finalCaption,
      instagramConfig
    );

    if (!containerResult.success || !containerResult.containerId) {
      return {
        success: false,
        hostedImageUrl: publicUrl,
        finalCaption,
        error: {
          code: 'CONTAINER_FAILED',
          message: containerResult.error || 'Failed to create media container',
        },
      };
    }

    // Step 4: Wait for container to be ready
    console.log('⏳ Step 4: Waiting for container processing...');
    const readyResult = await waitForContainerReady(
      containerResult.containerId,
      instagramConfig.accessToken
    );

    if (!readyResult.ready) {
      return {
        success: false,
        hostedImageUrl: publicUrl,
        finalCaption,
        error: {
          code: 'PROCESSING_FAILED',
          message: readyResult.error || 'Container processing failed',
        },
      };
    }

    // Step 5: Publish the container
    console.log('📤 Step 5: Publishing to Instagram...');
    const publishResult = await publishMediaContainer(
      containerResult.containerId,
      instagramConfig
    );

    if (!publishResult.success) {
      return {
        success: false,
        hostedImageUrl: publicUrl,
        finalCaption,
        error: {
          code: 'PUBLISH_FAILED',
          message: publishResult.error || 'Failed to publish',
        },
      };
    }

    // Success!
    console.log('🎉 Successfully published to Instagram!');

    return {
      success: true,
      mediaId: publishResult.mediaId,
      hostedImageUrl: publicUrl,
      finalCaption,
      publishedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error('❌ Instagram publish error:', error);
    return {
      success: false,
      error: {
        code: 'UNKNOWN_ERROR',
        message: error instanceof Error ? error.message : 'Unknown error occurred',
        details: error,
      },
    };
  }
}

// ============================================================================
// TOKEN MANAGEMENT
// ============================================================================

const TOKEN_STORAGE_KEY = 'instagram_access_token';
const CONFIG_STORAGE_KEY = 'instagram_config';

/**
 * Save Instagram configuration to localStorage
 * Note: Token is stored separately for security
 */
export function saveInstagramConfig(config: InstagramConfig): void {
  // Store token separately
  if (config.accessToken) {
    localStorage.setItem(TOKEN_STORAGE_KEY, config.accessToken);
  }

  // Store config without token
  const configToStore = {
    instagramBusinessAccountId: config.instagramBusinessAccountId,
    facebookPageId: config.facebookPageId,
    appId: config.appId,
  };

  localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(configToStore));
}

/**
 * Load Instagram configuration from localStorage
 */
export function loadInstagramConfig(): InstagramConfig | null {
  const configStr = localStorage.getItem(CONFIG_STORAGE_KEY);
  const token = localStorage.getItem(TOKEN_STORAGE_KEY);

  if (!configStr) return null;

  try {
    const config = JSON.parse(configStr);
    return {
      ...config,
      accessToken: token || '',
    };
  } catch {
    return null;
  }
}

/**
 * Get default Instagram configuration
 */
export function getDefaultInstagramConfig(): InstagramConfig {
  return {
    instagramBusinessAccountId: DEFAULT_INSTAGRAM_ACCOUNT_ID,
    facebookPageId: DEFAULT_FACEBOOK_PAGE_ID,
    accessToken: '', // Must be provided
    appId: '2812661588942942',
  };
}

/**
 * Validate access token by making a simple API call
 */
export async function validateAccessToken(
  accessToken: string,
  instagramAccountId: string = DEFAULT_INSTAGRAM_ACCOUNT_ID
): Promise<{ valid: boolean; username?: string; error?: string }> {
  try {
    const url = new URL(`${GRAPH_API_BASE}/${instagramAccountId}`);
    url.searchParams.set('fields', 'username,name,profile_picture_url');
    url.searchParams.set('access_token', accessToken);

    const response = await fetch(url.toString());
    const data = await response.json();

    if (!response.ok) {
      return {
        valid: false,
        error: data.error?.message || 'Invalid token',
      };
    }

    return {
      valid: true,
      username: data.username,
    };
  } catch (error) {
    return {
      valid: false,
      error: error instanceof Error ? error.message : 'Validation failed',
    };
  }
}

// ============================================================================
// CONVENIENCE EXPORTS
// ============================================================================

export {
  type InstagramConfig,
  type InstagramPublishInput,
  type InstagramPublishResult,
  type ImageHostingConfig,
};
