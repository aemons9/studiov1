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
// TOKEN MANAGER (SIMPLIFIED - Page Access Token)
// ============================================================================

export {
  // Page Access Token (primary)
  getPageAccessToken,
  savePageAccessToken,
  loadPageAccessToken,

  // Token operations (backward compatibility)
  saveTokenInfo,
  loadTokenInfo,
  ensureValidToken,
  initializeFromToken,

  // GitHub token
  saveGitHubToken,
  loadGitHubToken,

  // Validation and status
  validateToken,
  getInstagramAccountId,
  getPageId,
  getTokenStatus,
  clearTokens,

  // Deprecated (no-ops for backward compatibility)
  saveAppCredentials,
  loadAppCredentials,
  exchangeForLongLivedToken,
  refreshLongLivedToken,
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
// PERSISTENT GALLERY SERVICE
// ============================================================================

export {
  // Core operations
  saveToGallery,
  saveMultipleToGallery,
  getAllImages,
  getFilteredImages,
  getImageById,
  deleteImage,
  deleteMultipleImages,
  updateImage,
  markAsPosted,

  // Stats and cleanup
  getGalleryStats,
  cleanupOldImages,
  clearAllImages,

  // Utilities
  generateImageId,
  createThumbnail,
  initGallery,

  // Types
  type GalleryImage,
  type SourceMode,
  type GalleryFilter,
  type GalleryStats,
} from './galleryService';

// ============================================================================
// INSTAGRAM REELS SERVICE
// ============================================================================

export {
  // Music library
  getMusicLibrary,
  uploadMusic,

  // Video creation
  createVideo,

  // Reel publishing
  publishReel,
  createAndPublishReel,

  // Utilities
  isReelsServiceAvailable,
  formatDuration,
  DEFAULT_REEL_DURATIONS,

  // Types
  type MusicTrack,
  type CreateVideoOptions,
  type CreateVideoResult,
  type PublishReelOptions,
  type PublishReelResult,
  type FullReelPublishOptions,
} from './reelsService';

// ============================================================================
// CONVENIENCE FUNCTION
// ============================================================================

import type { InstagramConfig, ImageHostingConfig } from './types';
import { publishToInstagram } from './instagramApiService';
import { loadInstagramConfig, getDefaultInstagramConfig } from './instagramApiService';
import { loadHostingConfig, getDefaultHostingConfig } from './imageHostingService';
import { loadGitHubToken } from './tokenManager';

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
  let hostingConfig = config?.hosting
    || loadHostingConfig()
    || getDefaultHostingConfig();

  // Load GitHub token from token manager if not in hosting config
  if (hostingConfig.provider === 'github' && !hostingConfig.github?.token) {
    const githubToken = loadGitHubToken();

    if (githubToken && hostingConfig.github) {
      hostingConfig = {
        ...hostingConfig,
        github: {
          ...hostingConfig.github,
          token: githubToken,
        },
      };
    }
  }

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
