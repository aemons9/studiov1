/**
 * INSTAGRAM PUBLISHING SERVICE
 *
 * Official Instagram Graph API integration for StudioV.
 * Production-safe implementation using Meta's official endpoints.
 *
 * @module services/instagram
 *
 * IMPORTANT CONSTRAINTS:
 * - All publishing MUST go through graph.facebook.com endpoints
 * - Images MUST be accessible via public HTTPS URLs
 * - No browser automation, scraping, or private APIs
 * - No multipart uploads or base64 to Instagram directly
 *
 * @see https://developers.facebook.com/docs/instagram-api/guides/content-publishing
 */

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type {
  // Configuration types
  InstagramConfig,
  ImageHostingConfig,
  AutoPostAgentConfig,
  ScheduleConfig,

  // Publishing types
  InstagramPublishInput,
  InstagramPublishResult,
  MediaContainerResponse,
  MediaContainerStatus,
  MediaPublishResponse,

  // Queue and logging types
  PostQueueItem,
  InstagramPublishLog,

  // Strategy types
  CaptionStyle,
  ImageSelectionStrategy,

  // Rate limiting
  RateLimitState,
} from './types';

export { INSTAGRAM_API_LIMITS, INSTAGRAM_STORAGE_KEYS } from './types';

// ============================================================================
// IMAGE HOSTING SERVICE
// ============================================================================

export {
  // Main hosting function
  hostImage,

  // GitHub-specific functions
  uploadToGitHub,

  // Utilities
  imageToBase64,
  generateInstagramFilename,
  validatePublicUrl,

  // Configuration helpers
  saveHostingConfig,
  loadHostingConfig,
  getDefaultHostingConfig,
  DEFAULT_GITHUB_CONFIG,
  DEFAULT_WEBSITE_CONFIG,

  // Types
  type HostImageResult,
} from './imageHostingService';

// ============================================================================
// INSTAGRAM API SERVICE
// ============================================================================

export {
  // Main publishing function
  publishToInstagram,

  // Individual API steps (for advanced use)
  createMediaContainer,
  checkContainerStatus,
  publishMediaContainer,

  // Caption utilities
  formatCaption,
  getDefaultHashtags,

  // Rate limiting
  getRateLimitState,
  canMakeApiCall,

  // Configuration management
  saveInstagramConfig,
  loadInstagramConfig,
  getDefaultInstagramConfig,
  validateAccessToken,

  // Constants
  DEFAULT_INSTAGRAM_ACCOUNT_ID,
  DEFAULT_FACEBOOK_PAGE_ID,
} from './instagramApiService';

// ============================================================================
// TOKEN MANAGER
// ============================================================================

export {
  // Token operations
  saveTokenInfo,
  loadTokenInfo,
  saveAppCredentials,
  loadAppCredentials,
  saveGitHubToken,
  loadGitHubToken,
  clearTokens,

  // Token exchange/refresh
  exchangeForLongLivedToken,
  refreshLongLivedToken,
  getPageAccessToken,
  ensureValidToken,
  initializeFromToken,

  // Validation and status
  validateToken,
  getInstagramAccountId,
  getTokenStatus,
  isTokenExpiringSoon,

  // Types
  type TokenInfo,
  type TokenRefreshResult,
} from './tokenManager';

// ============================================================================
// AUTO-POSTING AGENT
// ============================================================================

export {
  // Agent control
  startAgent,
  stopAgent,
  isAgentRunning,
  triggerAgentNow,

  // Queue management
  getPostQueue,
  addToQueue,
  updateQueueItem,
  removeFromQueue,
  getNextPendingItem,
  clearCompletedFromQueue,

  // Logging
  getPublishLogs,
  addLogEntry,
  clearOldLogs,

  // State and configuration
  getAgentState,
  getAgentConfig,
  saveAgentConfig,
  getDefaultAgentConfig,

  // Caption generation
  generateCaption,

  // Quick publish (bypass queue)
  quickPublish,

  // Scheduling helpers
  canPostNow,
  processNextQueueItem,
} from './autoPostAgent';

// ============================================================================
// CONVENIENCE FUNCTION
// ============================================================================

import type { InstagramConfig, ImageHostingConfig } from './types';
import { publishToInstagram } from './instagramApiService';
import { loadInstagramConfig, getDefaultInstagramConfig } from './instagramApiService';
import { loadHostingConfig, getDefaultHostingConfig } from './imageHostingService';

/**
 * Simplified "Send to Instagram" function
 *
 * This is the main entry point for programmatic Instagram publishing.
 * Can be triggered by:
 * - UI button click
 * - Programmatic call from generation services
 * - Agent/automation workflows
 *
 * @param imageData - Image data (base64, data URL, blob URL, or public HTTPS URL)
 * @param caption - Optional caption for the post
 * @param hashtags - Optional array of hashtags
 * @param config - Optional configuration override
 *
 * @example
 * // Basic usage with just image
 * const result = await sendToInstagram(imageBase64);
 *
 * @example
 * // With caption and hashtags
 * const result = await sendToInstagram(imageUrl, {
 *   caption: 'Beautiful shot',
 *   hashtags: ['photography', 'art', 'fashion']
 * });
 *
 * @example
 * // With custom configuration
 * const result = await sendToInstagram(imageData, {
 *   caption: 'Custom post'
 * }, {
 *   instagram: myInstagramConfig,
 *   hosting: myHostingConfig
 * });
 */
export async function sendToInstagram(
  imageData: string,
  options?: {
    caption?: string;
    hashtags?: string[];
    format?: 'jpg' | 'jpeg' | 'png';
  },
  config?: {
    instagram?: InstagramConfig;
    hosting?: ImageHostingConfig;
  }
): Promise<{
  success: boolean;
  mediaId?: string;
  publicUrl?: string;
  error?: string;
}> {
  // Load or use provided Instagram config
  const instagramConfig = config?.instagram
    || loadInstagramConfig()
    || getDefaultInstagramConfig();

  // Validate we have an access token
  if (!instagramConfig.accessToken) {
    return {
      success: false,
      error: 'Instagram access token is required. Configure it in settings.',
    };
  }

  // Load or use provided hosting config
  const hostingConfig = config?.hosting
    || loadHostingConfig()
    || getDefaultHostingConfig();

  // Validate hosting config
  if (hostingConfig.provider === 'github' && !hostingConfig.github?.token) {
    return {
      success: false,
      error: 'GitHub token is required for image hosting. Configure it in settings.',
    };
  }

  // Publish
  const result = await publishToInstagram(
    {
      imageData,
      format: options?.format || 'jpg',
      caption: options?.caption,
      hashtags: options?.hashtags,
    },
    instagramConfig,
    hostingConfig
  );

  return {
    success: result.success,
    mediaId: result.mediaId,
    publicUrl: result.hostedImageUrl,
    error: result.error?.message,
  };
}

// ============================================================================
// DEFAULT EXPORT
// ============================================================================

export default {
  sendToInstagram,
  publishToInstagram,
};
