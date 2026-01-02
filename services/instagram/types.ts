/**
 * INSTAGRAM PUBLISHING TYPES
 *
 * Type definitions for Instagram Graph API integration
 * Supports official Meta/Instagram Graph API endpoints only
 */

// ============================================================================
// CONFIGURATION TYPES
// ============================================================================

/**
 * Instagram API Configuration
 * All credentials and account information needed for publishing
 */
export interface InstagramConfig {
  /** Instagram Business Account ID (required for Graph API) */
  instagramBusinessAccountId: string;

  /** Facebook Page ID linked to the Instagram account */
  facebookPageId: string;

  /** Long-lived Page Access Token with instagram_content_publish permission */
  accessToken: string;

  /** Meta Developer App ID (for reference/debugging) */
  appId?: string;
}

/**
 * Image hosting configuration for making images publicly accessible
 */
export interface ImageHostingConfig {
  /** Primary hosting method */
  provider: 'github' | 'website';

  /** GitHub configuration (if provider is 'github') */
  github?: {
    owner: string;
    repo: string;
    branch: string;
    token: string;
    /** Path prefix within repo (e.g., 'photo/instagram') */
    pathPrefix: string;
  };

  /** Website/CDN configuration (if provider is 'website') */
  website?: {
    /** Base URL for public access (e.g., 'https://studiov.aemons.com') */
    baseUrl: string;
    /** Path prefix for images */
    pathPrefix: string;
  };
}

// ============================================================================
// PUBLISHING TYPES
// ============================================================================

/**
 * Caption generation style for auto-posting
 */
export type CaptionStyle =
  | 'editorial'    // Professional, magazine-style captions
  | 'minimalist'   // Clean, simple captions with key details
  | 'luxury'       // High-end, aspirational language
  | 'artistic'     // Creative, evocative descriptions
  | 'casual'       // Friendly, conversational tone
  | 'custom';      // User-provided caption

/**
 * Input for publishing an image to Instagram
 */
export interface InstagramPublishInput {
  /** Image data - can be base64, data URL, blob URL, or file path */
  imageData: string;

  /** Image format */
  format: 'jpg' | 'jpeg' | 'png';

  /** Optional caption for the post */
  caption?: string;

  /** Hashtags to append to caption */
  hashtags?: string[];

  /** Location tag (if available) */
  locationId?: string;

  /** Whether to disable comments on the post */
  disableComments?: boolean;
}

/**
 * Result of publishing to Instagram
 */
export interface InstagramPublishResult {
  success: boolean;

  /** Instagram media ID of the published post */
  mediaId?: string;

  /** Public URL of the hosted image */
  hostedImageUrl?: string;

  /** Final caption used (including hashtags) */
  finalCaption?: string;

  /** Timestamp of publication */
  publishedAt?: string;

  /** Error details if failed */
  error?: {
    code: string;
    message: string;
    details?: any;
  };
}

/**
 * Instagram media container status
 */
export type MediaContainerStatus =
  | 'IN_PROGRESS'
  | 'FINISHED'
  | 'ERROR'
  | 'EXPIRED';

/**
 * Response from creating a media container
 */
export interface MediaContainerResponse {
  id: string;
  status?: MediaContainerStatus;
  status_code?: string;
}

/**
 * Response from publishing a media container
 */
export interface MediaPublishResponse {
  id: string;
}

// ============================================================================
// AUTO-POSTING AGENT TYPES
// ============================================================================

/**
 * Image selection strategy for auto-posting
 */
export type ImageSelectionStrategy =
  | 'latest'       // Most recently generated
  | 'random'       // Random selection from pool
  | 'tag-based'    // Based on specific tags/concepts
  | 'queue';       // From a manual queue

/**
 * Scheduling configuration for auto-posting
 */
export interface ScheduleConfig {
  /** Enable scheduled posting */
  enabled: boolean;

  /** Cron expression or interval (e.g., '0 9,18 * * *' for 9am and 6pm) */
  schedule?: string;

  /** Minimum interval between posts in minutes */
  minIntervalMinutes: number;

  /** Maximum posts per day */
  maxPostsPerDay: number;

  /** Timezone for scheduling */
  timezone: string;
}

/**
 * Auto-posting agent configuration
 */
export interface AutoPostAgentConfig {
  /** Instagram API configuration */
  instagram: InstagramConfig;

  /** Image hosting configuration */
  hosting: ImageHostingConfig;

  /** Image selection strategy */
  selectionStrategy: ImageSelectionStrategy;

  /** Tags to filter images (for tag-based selection) */
  filterTags?: string[];

  /** Caption generation style */
  captionStyle: CaptionStyle;

  /** Default hashtags to include */
  defaultHashtags: string[];

  /** Scheduling configuration */
  schedule: ScheduleConfig;

  /** Whether to require manual approval before posting */
  requireApproval: boolean;
}

/**
 * Queue item for pending Instagram posts
 */
export interface PostQueueItem {
  id: string;
  imageData: string;
  hostedUrl?: string;
  caption: string;
  hashtags: string[];
  scheduledFor?: string;
  status: 'pending' | 'approved' | 'publishing' | 'published' | 'failed';
  createdAt: string;
  publishedAt?: string;
  instagramMediaId?: string;
  error?: string;
  metadata?: {
    conceptName?: string;
    generatedAt?: string;
    intimacyLevel?: number;
    tags?: string[];
  };
}

/**
 * Log entry for Instagram publishing activity
 */
export interface InstagramPublishLog {
  id: string;
  timestamp: string;
  action: 'publish' | 'schedule' | 'approve' | 'reject' | 'error';
  imageUrl: string;
  caption: string;
  instagramMediaId?: string;
  success: boolean;
  error?: string;
  metadata?: Record<string, any>;
}

// ============================================================================
// API RATE LIMITING
// ============================================================================

/**
 * Rate limit tracking for Instagram API
 */
export interface RateLimitState {
  /** Number of API calls made in current window */
  callCount: number;

  /** Window start timestamp */
  windowStart: number;

  /** Calls remaining in current window */
  remaining: number;

  /** When rate limit resets (timestamp) */
  resetAt: number;
}

/**
 * Instagram API limits (per Meta documentation)
 */
export const INSTAGRAM_API_LIMITS = {
  /** Content Publishing Limit - 25 posts per 24 hours */
  POSTS_PER_DAY: 25,

  /** API calls per hour (general) */
  CALLS_PER_HOUR: 200,

  /** Maximum caption length */
  MAX_CAPTION_LENGTH: 2200,

  /** Maximum hashtags per post */
  MAX_HASHTAGS: 30,

  /** Image minimum dimensions */
  MIN_IMAGE_SIZE: 320,

  /** Image maximum dimensions */
  MAX_IMAGE_SIZE: 1440,

  /** Supported aspect ratios */
  ASPECT_RATIO_MIN: 0.8,  // 4:5
  ASPECT_RATIO_MAX: 1.91, // 1.91:1
} as const;

// ============================================================================
// STORAGE KEYS
// ============================================================================

export const INSTAGRAM_STORAGE_KEYS = {
  CONFIG: 'instagram_config',
  HOSTING_CONFIG: 'instagram_hosting_config',
  AUTO_POST_CONFIG: 'instagram_auto_post_config',
  POST_QUEUE: 'instagram_post_queue',
  PUBLISH_LOGS: 'instagram_publish_logs',
  RATE_LIMIT: 'instagram_rate_limit',
  LAST_POST_TIME: 'instagram_last_post_time',
} as const;
