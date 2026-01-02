/**
 * INSTAGRAM AUTO-POSTING AGENT
 *
 * Autonomous agent for automated Instagram publishing.
 * Can operate independently of UI actions.
 *
 * Features:
 * - Monitor for new images (GitHub commits, local generation)
 * - Select images based on configurable rules
 * - Auto-generate captions (editorial, minimalist, luxury styles)
 * - Scheduled posting with cron-like expressions
 * - Rate limit compliance
 * - Comprehensive logging
 */

import type {
  InstagramConfig,
  ImageHostingConfig,
  AutoPostAgentConfig,
  PostQueueItem,
  InstagramPublishLog,
  CaptionStyle,
  ImageSelectionStrategy,
  ScheduleConfig,
} from './types';

import {
  publishToInstagram,
  formatCaption,
  getDefaultHashtags,
  canMakeApiCall,
  getDefaultInstagramConfig,
} from './instagramApiService';

import {
  getDefaultHostingConfig,
} from './imageHostingService';

// ============================================================================
// STORAGE KEYS
// ============================================================================

const STORAGE_KEYS = {
  QUEUE: 'instagram_post_queue',
  LOGS: 'instagram_publish_logs',
  AGENT_CONFIG: 'instagram_agent_config',
  LAST_POST_TIME: 'instagram_last_post_time',
  AGENT_STATE: 'instagram_agent_state',
};

// ============================================================================
// CAPTION GENERATION
// ============================================================================

/**
 * Caption templates by style
 */
const CAPTION_TEMPLATES: Record<CaptionStyle, string[]> = {
  editorial: [
    'Captured in a moment of pure elegance.',
    'Where light meets form, art emerges.',
    'The essence of modern sophistication.',
    'A study in contrasts and harmony.',
    'Timeless beauty, contemporary vision.',
    'Every frame tells a story of refinement.',
    'The intersection of fashion and art.',
    'Elevating the ordinary to extraordinary.',
  ],
  minimalist: [
    'Less is more.',
    'Simplicity speaks.',
    'Pure form.',
    'Essential beauty.',
    'Clean lines.',
    'Quiet elegance.',
    'Refined simplicity.',
    'The art of restraint.',
  ],
  luxury: [
    'Indulge in the extraordinary.',
    'Where luxury meets artistry.',
    'The pinnacle of refined taste.',
    'Crafted for the discerning eye.',
    'Opulence redefined.',
    'The height of sophistication.',
    'Uncompromising excellence.',
    'A celebration of the exceptional.',
  ],
  artistic: [
    'A canvas of light and shadow.',
    'Where imagination takes form.',
    'The poetry of visual expression.',
    'Breaking boundaries, creating beauty.',
    'Art in its purest essence.',
    'A visual symphony.',
    'The language of creativity.',
    'Exploring the depths of expression.',
  ],
  casual: [
    'Loving this vibe!',
    'Behind the scenes magic.',
    'Another day, another beautiful shot.',
    'Can\'t get enough of this look.',
    'This is what we live for.',
    'Good vibes only.',
    'Making memories one shot at a time.',
    'The best is yet to come.',
  ],
  custom: [], // Custom captions are provided by user
};

/**
 * Generate a caption based on style and optional metadata
 */
export function generateCaption(
  style: CaptionStyle,
  metadata?: {
    conceptName?: string;
    tags?: string[];
    customCaption?: string;
  }
): string {
  // If custom style and caption provided, use it
  if (style === 'custom' && metadata?.customCaption) {
    return metadata.customCaption;
  }

  // Get templates for the style
  const templates = CAPTION_TEMPLATES[style] || CAPTION_TEMPLATES.editorial;

  // Select a random template
  const template = templates[Math.floor(Math.random() * templates.length)];

  // Optionally enhance with concept name
  if (metadata?.conceptName) {
    return `${template}\n\n${metadata.conceptName}`;
  }

  return template;
}

// ============================================================================
// POST QUEUE MANAGEMENT
// ============================================================================

/**
 * Get the current post queue
 */
export function getPostQueue(): PostQueueItem[] {
  const stored = localStorage.getItem(STORAGE_KEYS.QUEUE);
  if (!stored) return [];

  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

/**
 * Save the post queue
 */
function savePostQueue(queue: PostQueueItem[]): void {
  localStorage.setItem(STORAGE_KEYS.QUEUE, JSON.stringify(queue));
}

/**
 * Add an item to the post queue
 */
export function addToQueue(item: Omit<PostQueueItem, 'id' | 'createdAt' | 'status'>): PostQueueItem {
  const queue = getPostQueue();

  const newItem: PostQueueItem = {
    ...item,
    id: `post-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date().toISOString(),
    status: 'pending',
  };

  queue.push(newItem);
  savePostQueue(queue);

  console.log(`📥 Added to queue: ${newItem.id}`);

  return newItem;
}

/**
 * Update a queue item's status
 */
export function updateQueueItem(
  id: string,
  updates: Partial<PostQueueItem>
): PostQueueItem | null {
  const queue = getPostQueue();
  const index = queue.findIndex(item => item.id === id);

  if (index === -1) return null;

  queue[index] = { ...queue[index], ...updates };
  savePostQueue(queue);

  return queue[index];
}

/**
 * Remove an item from the queue
 */
export function removeFromQueue(id: string): boolean {
  const queue = getPostQueue();
  const filtered = queue.filter(item => item.id !== id);

  if (filtered.length === queue.length) return false;

  savePostQueue(filtered);
  return true;
}

/**
 * Get the next pending item in the queue
 */
export function getNextPendingItem(): PostQueueItem | null {
  const queue = getPostQueue();
  return queue.find(item =>
    item.status === 'pending' || item.status === 'approved'
  ) || null;
}

/**
 * Clear all completed/failed items from queue
 */
export function clearCompletedFromQueue(): number {
  const queue = getPostQueue();
  const filtered = queue.filter(item =>
    item.status !== 'published' && item.status !== 'failed'
  );

  const removed = queue.length - filtered.length;
  savePostQueue(filtered);

  return removed;
}

// ============================================================================
// LOGGING
// ============================================================================

/**
 * Get publish logs
 */
export function getPublishLogs(limit: number = 100): InstagramPublishLog[] {
  const stored = localStorage.getItem(STORAGE_KEYS.LOGS);
  if (!stored) return [];

  try {
    const logs = JSON.parse(stored) as InstagramPublishLog[];
    return logs.slice(-limit);
  } catch {
    return [];
  }
}

/**
 * Add a log entry
 */
export function addLogEntry(
  entry: Omit<InstagramPublishLog, 'id' | 'timestamp'>
): InstagramPublishLog {
  const logs = getPublishLogs(1000);

  const newEntry: InstagramPublishLog = {
    ...entry,
    id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date().toISOString(),
  };

  logs.push(newEntry);

  // Keep only last 1000 logs
  const trimmed = logs.slice(-1000);
  localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(trimmed));

  return newEntry;
}

/**
 * Clear old logs
 */
export function clearOldLogs(daysToKeep: number = 30): number {
  const logs = getPublishLogs(10000);
  const cutoff = Date.now() - daysToKeep * 24 * 60 * 60 * 1000;

  const filtered = logs.filter(log =>
    new Date(log.timestamp).getTime() > cutoff
  );

  const removed = logs.length - filtered.length;
  localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(filtered));

  return removed;
}

// ============================================================================
// AGENT STATE
// ============================================================================

interface AgentState {
  isRunning: boolean;
  lastCheck: string | null;
  lastPost: string | null;
  postsToday: number;
  errors: string[];
}

/**
 * Get agent state
 */
export function getAgentState(): AgentState {
  const stored = localStorage.getItem(STORAGE_KEYS.AGENT_STATE);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      // Fall through to default
    }
  }

  return {
    isRunning: false,
    lastCheck: null,
    lastPost: null,
    postsToday: 0,
    errors: [],
  };
}

/**
 * Update agent state
 */
function updateAgentState(updates: Partial<AgentState>): void {
  const state = getAgentState();
  localStorage.setItem(STORAGE_KEYS.AGENT_STATE, JSON.stringify({
    ...state,
    ...updates,
  }));
}

// ============================================================================
// AGENT CONFIGURATION
// ============================================================================

/**
 * Get agent configuration
 */
export function getAgentConfig(): AutoPostAgentConfig | null {
  const stored = localStorage.getItem(STORAGE_KEYS.AGENT_CONFIG);
  if (!stored) return null;

  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

/**
 * Save agent configuration
 */
export function saveAgentConfig(config: AutoPostAgentConfig): void {
  localStorage.setItem(STORAGE_KEYS.AGENT_CONFIG, JSON.stringify(config));
}

/**
 * Get default agent configuration
 */
export function getDefaultAgentConfig(): AutoPostAgentConfig {
  return {
    instagram: getDefaultInstagramConfig(),
    hosting: getDefaultHostingConfig(),
    selectionStrategy: 'latest',
    captionStyle: 'editorial',
    defaultHashtags: getDefaultHashtags('fashion'),
    schedule: {
      enabled: false,
      minIntervalMinutes: 60, // At least 1 hour between posts
      maxPostsPerDay: 5,
      timezone: 'Asia/Kolkata',
    },
    requireApproval: true, // Safe default
  };
}

// ============================================================================
// IMAGE SELECTION
// ============================================================================

interface ImageCandidate {
  imageData: string;
  metadata?: {
    conceptName?: string;
    generatedAt?: string;
    intimacyLevel?: number;
    tags?: string[];
  };
}

/**
 * Select an image based on strategy
 * This is a placeholder that should be connected to actual image sources
 */
export async function selectImage(
  strategy: ImageSelectionStrategy,
  options?: {
    tags?: string[];
    minIntimacy?: number;
    maxIntimacy?: number;
  }
): Promise<ImageCandidate | null> {
  // This function should be implemented to connect to actual image sources:
  // - Gallery storage
  // - GitHub repository
  // - Generation history

  console.log(`🔍 Selecting image with strategy: ${strategy}`);

  // For now, return null - actual implementation would fetch from sources
  // This is a hook point for integration

  return null;
}

// ============================================================================
// SCHEDULING
// ============================================================================

/**
 * Simple cron-like schedule parser
 * Supports: minute hour day-of-month month day-of-week
 * Example: "0 9,18 * * *" = 9am and 6pm every day
 */
function shouldRunNow(schedule: string, lastRun: Date | null): boolean {
  const now = new Date();

  // If never run, should run
  if (!lastRun) return true;

  // Parse schedule (simplified - handles common patterns)
  const parts = schedule.split(' ');
  if (parts.length !== 5) return false;

  const [minute, hour, , , ] = parts;

  // Check hour
  if (hour !== '*') {
    const hours = hour.split(',').map(h => parseInt(h, 10));
    if (!hours.includes(now.getHours())) return false;
  }

  // Check minute
  if (minute !== '*') {
    const minutes = minute.split(',').map(m => parseInt(m, 10));
    if (!minutes.includes(now.getMinutes())) return false;
  }

  // Check if we've already run in this minute
  if (
    lastRun.getHours() === now.getHours() &&
    lastRun.getMinutes() === now.getMinutes() &&
    lastRun.getDate() === now.getDate()
  ) {
    return false;
  }

  return true;
}

/**
 * Check if we can post based on schedule config
 */
export function canPostNow(config: ScheduleConfig): {
  allowed: boolean;
  reason?: string;
} {
  const state = getAgentState();
  const now = Date.now();

  // Check posts per day limit
  const lastPostTime = localStorage.getItem(STORAGE_KEYS.LAST_POST_TIME);
  if (lastPostTime) {
    const lastPost = new Date(lastPostTime);
    const today = new Date();

    // Reset daily counter if different day
    if (lastPost.toDateString() !== today.toDateString()) {
      updateAgentState({ postsToday: 0 });
    } else if (state.postsToday >= config.maxPostsPerDay) {
      return {
        allowed: false,
        reason: `Daily limit reached (${config.maxPostsPerDay} posts)`,
      };
    }

    // Check minimum interval
    const elapsed = now - lastPost.getTime();
    const minInterval = config.minIntervalMinutes * 60 * 1000;

    if (elapsed < minInterval) {
      const remaining = Math.ceil((minInterval - elapsed) / 1000 / 60);
      return {
        allowed: false,
        reason: `Must wait ${remaining} more minutes between posts`,
      };
    }
  }

  // Check Instagram rate limits
  const rateLimitCheck = canMakeApiCall();
  if (!rateLimitCheck.allowed) {
    return {
      allowed: false,
      reason: rateLimitCheck.reason,
    };
  }

  return { allowed: true };
}

// ============================================================================
// MAIN AGENT FUNCTIONS
// ============================================================================

/**
 * Process the next item in the queue
 */
export async function processNextQueueItem(
  instagramConfig: InstagramConfig,
  hostingConfig: ImageHostingConfig
): Promise<{
  processed: boolean;
  result?: any;
  error?: string;
}> {
  const item = getNextPendingItem();

  if (!item) {
    return { processed: false, error: 'No pending items in queue' };
  }

  console.log(`📤 Processing queue item: ${item.id}`);

  // Update status to publishing
  updateQueueItem(item.id, { status: 'publishing' });

  try {
    // Publish to Instagram
    const result = await publishToInstagram(
      {
        imageData: item.imageData,
        format: 'jpg',
        caption: item.caption,
        hashtags: item.hashtags,
      },
      instagramConfig,
      hostingConfig
    );

    if (result.success) {
      // Update queue item
      updateQueueItem(item.id, {
        status: 'published',
        publishedAt: result.publishedAt,
        instagramMediaId: result.mediaId,
        hostedUrl: result.hostedImageUrl,
      });

      // Log success
      addLogEntry({
        action: 'publish',
        imageUrl: result.hostedImageUrl || item.imageData,
        caption: result.finalCaption || item.caption,
        instagramMediaId: result.mediaId,
        success: true,
        metadata: item.metadata,
      });

      // Update state
      const state = getAgentState();
      updateAgentState({
        lastPost: new Date().toISOString(),
        postsToday: state.postsToday + 1,
      });
      localStorage.setItem(STORAGE_KEYS.LAST_POST_TIME, new Date().toISOString());

      return { processed: true, result };
    } else {
      // Update queue item with error
      updateQueueItem(item.id, {
        status: 'failed',
        error: result.error?.message,
      });

      // Log failure
      addLogEntry({
        action: 'error',
        imageUrl: item.imageData,
        caption: item.caption,
        success: false,
        error: result.error?.message,
        metadata: item.metadata,
      });

      return { processed: true, error: result.error?.message };
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    updateQueueItem(item.id, {
      status: 'failed',
      error: errorMessage,
    });

    addLogEntry({
      action: 'error',
      imageUrl: item.imageData,
      caption: item.caption,
      success: false,
      error: errorMessage,
    });

    return { processed: true, error: errorMessage };
  }
}

/**
 * Quick publish - immediately publish an image without queue
 */
export async function quickPublish(
  imageData: string,
  options: {
    caption?: string;
    hashtags?: string[];
    captionStyle?: CaptionStyle;
    metadata?: PostQueueItem['metadata'];
  },
  instagramConfig: InstagramConfig,
  hostingConfig: ImageHostingConfig
): Promise<{
  success: boolean;
  mediaId?: string;
  error?: string;
}> {
  console.log('⚡ Quick publish initiated...');

  // Generate caption if not provided
  const caption = options.caption || generateCaption(
    options.captionStyle || 'editorial',
    options.metadata
  );

  // Use default hashtags if not provided
  const hashtags = options.hashtags || getDefaultHashtags('fashion');

  // Publish directly
  const result = await publishToInstagram(
    {
      imageData,
      format: 'jpg',
      caption,
      hashtags,
    },
    instagramConfig,
    hostingConfig
  );

  // Log the attempt
  addLogEntry({
    action: 'publish',
    imageUrl: result.hostedImageUrl || imageData,
    caption: result.finalCaption || caption,
    instagramMediaId: result.mediaId,
    success: result.success,
    error: result.error?.message,
    metadata: options.metadata,
  });

  if (result.success) {
    // Update state
    const state = getAgentState();
    updateAgentState({
      lastPost: new Date().toISOString(),
      postsToday: state.postsToday + 1,
    });
    localStorage.setItem(STORAGE_KEYS.LAST_POST_TIME, new Date().toISOString());
  }

  return {
    success: result.success,
    mediaId: result.mediaId,
    error: result.error?.message,
  };
}

// ============================================================================
// AGENT RUNNER
// ============================================================================

let agentIntervalId: ReturnType<typeof setInterval> | null = null;

/**
 * Start the auto-posting agent
 * Runs on an interval, checking for items to post
 */
export function startAgent(config: AutoPostAgentConfig): void {
  if (agentIntervalId) {
    console.log('⚠️ Agent is already running');
    return;
  }

  console.log('🤖 Starting Instagram auto-posting agent...');

  saveAgentConfig(config);
  updateAgentState({ isRunning: true, errors: [] });

  // Check interval (every minute)
  const checkInterval = 60 * 1000;

  agentIntervalId = setInterval(async () => {
    const state = getAgentState();

    // Update last check time
    updateAgentState({ lastCheck: new Date().toISOString() });

    // Check if scheduled run
    if (config.schedule.enabled && config.schedule.schedule) {
      const lastRun = state.lastPost ? new Date(state.lastPost) : null;
      if (!shouldRunNow(config.schedule.schedule, lastRun)) {
        return;
      }
    }

    // Check if we can post
    const canPost = canPostNow(config.schedule);
    if (!canPost.allowed) {
      console.log(`⏸️ Cannot post: ${canPost.reason}`);
      return;
    }

    // Try to process queue
    const result = await processNextQueueItem(
      config.instagram,
      config.hosting
    );

    if (result.processed) {
      if (result.error) {
        const errors = [...state.errors, result.error].slice(-10);
        updateAgentState({ errors });
      }
    }
  }, checkInterval);

  console.log('✅ Agent started, checking every minute');
}

/**
 * Stop the auto-posting agent
 */
export function stopAgent(): void {
  if (agentIntervalId) {
    clearInterval(agentIntervalId);
    agentIntervalId = null;
  }

  updateAgentState({ isRunning: false });
  console.log('🛑 Agent stopped');
}

/**
 * Check if agent is running
 */
export function isAgentRunning(): boolean {
  return agentIntervalId !== null;
}

/**
 * Manually trigger agent to process queue now
 */
export async function triggerAgentNow(): Promise<{
  processed: boolean;
  result?: any;
  error?: string;
}> {
  const config = getAgentConfig();

  if (!config) {
    return { processed: false, error: 'Agent not configured' };
  }

  console.log('🔄 Manual agent trigger...');

  return processNextQueueItem(config.instagram, config.hosting);
}

// ============================================================================
// EXPORTS
// ============================================================================

export {
  type AutoPostAgentConfig,
  type PostQueueItem,
  type InstagramPublishLog,
  type CaptionStyle,
};
