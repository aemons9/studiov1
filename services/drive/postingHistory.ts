/**
 * POSTING HISTORY TRACKER
 *
 * Tracks which images/batches have been posted to prevent duplicates.
 * Stores history in a local JSON file for persistence.
 */

import * as fs from 'fs';
import * as path from 'path';

// ============================================================================
// TYPES
// ============================================================================

export type PostType = 'feed' | 'carousel' | 'reel';

export interface PostRecord {
  id: string;                    // Unique post ID
  driveFileIds: string[];        // Google Drive file IDs used
  batchTimestamps: number[];     // Batch timestamps involved
  postType: PostType;            // Type of post
  instagramMediaId?: string;     // Instagram media ID after publishing
  caption?: string;              // Caption used
  hashtags?: string[];           // Hashtags used
  postedAt: string;              // ISO timestamp
  success: boolean;              // Whether post was successful
  error?: string;                // Error message if failed
}

export interface PostingHistory {
  version: number;
  posts: PostRecord[];
  lastUpdated: string;
}

// ============================================================================
// CONFIGURATION
// ============================================================================

const HISTORY_FILE = path.join(process.cwd(), 'data', 'posting-history.json');
const HISTORY_VERSION = 1;

// ============================================================================
// HISTORY MANAGEMENT
// ============================================================================

/**
 * Ensure data directory exists
 */
function ensureDataDir(): void {
  const dataDir = path.dirname(HISTORY_FILE);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

/**
 * Load posting history from file
 */
export function loadHistory(): PostingHistory {
  ensureDataDir();

  if (!fs.existsSync(HISTORY_FILE)) {
    return {
      version: HISTORY_VERSION,
      posts: [],
      lastUpdated: new Date().toISOString(),
    };
  }

  try {
    const data = fs.readFileSync(HISTORY_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('⚠️ Failed to load posting history, starting fresh:', error);
    return {
      version: HISTORY_VERSION,
      posts: [],
      lastUpdated: new Date().toISOString(),
    };
  }
}

/**
 * Save posting history to file
 */
export function saveHistory(history: PostingHistory): void {
  ensureDataDir();

  history.lastUpdated = new Date().toISOString();

  try {
    fs.writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2));
    console.log(`💾 Posting history saved (${history.posts.length} records)`);
  } catch (error) {
    console.error('❌ Failed to save posting history:', error);
  }
}

// ============================================================================
// POST TRACKING
// ============================================================================

/**
 * Generate unique post ID
 */
function generatePostId(): string {
  return `post-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
}

/**
 * Add a new post record
 */
export function addPostRecord(record: Omit<PostRecord, 'id' | 'postedAt'>): PostRecord {
  const history = loadHistory();

  const newRecord: PostRecord = {
    ...record,
    id: generatePostId(),
    postedAt: new Date().toISOString(),
  };

  history.posts.push(newRecord);
  saveHistory(history);

  console.log(`📝 Added post record: ${newRecord.id} (${newRecord.postType})`);
  return newRecord;
}

/**
 * Check if a Drive file has been posted
 */
export function isFilePosted(driveFileId: string): boolean {
  const history = loadHistory();

  return history.posts.some(
    post => post.success && post.driveFileIds.includes(driveFileId)
  );
}

/**
 * Check if a batch has been posted
 */
export function isBatchPosted(batchTimestamp: number): boolean {
  const history = loadHistory();

  return history.posts.some(
    post => post.success && post.batchTimestamps.includes(batchTimestamp)
  );
}

/**
 * Get all posted file IDs
 */
export function getPostedFileIds(): Set<string> {
  const history = loadHistory();
  const postedIds = new Set<string>();

  for (const post of history.posts) {
    if (post.success) {
      for (const fileId of post.driveFileIds) {
        postedIds.add(fileId);
      }
    }
  }

  return postedIds;
}

/**
 * Get all posted batch timestamps
 */
export function getPostedBatchTimestamps(): Set<number> {
  const history = loadHistory();
  const postedTimestamps = new Set<number>();

  for (const post of history.posts) {
    if (post.success) {
      for (const timestamp of post.batchTimestamps) {
        postedTimestamps.add(timestamp);
      }
    }
  }

  return postedTimestamps;
}

// ============================================================================
// QUERY FUNCTIONS
// ============================================================================

/**
 * Get recent posts
 */
export function getRecentPosts(limit: number = 20): PostRecord[] {
  const history = loadHistory();
  return history.posts
    .sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime())
    .slice(0, limit);
}

/**
 * Get posts by type
 */
export function getPostsByType(postType: PostType): PostRecord[] {
  const history = loadHistory();
  return history.posts.filter(post => post.postType === postType);
}

/**
 * Get successful posts
 */
export function getSuccessfulPosts(): PostRecord[] {
  const history = loadHistory();
  return history.posts.filter(post => post.success);
}

/**
 * Get failed posts
 */
export function getFailedPosts(): PostRecord[] {
  const history = loadHistory();
  return history.posts.filter(post => !post.success);
}

/**
 * Get posting statistics
 */
export function getPostingStats(): {
  totalPosts: number;
  successfulPosts: number;
  failedPosts: number;
  feedPosts: number;
  carouselPosts: number;
  reelPosts: number;
  uniqueFilesPosted: number;
  uniqueBatchesPosted: number;
} {
  const history = loadHistory();
  const postedFileIds = getPostedFileIds();
  const postedBatches = getPostedBatchTimestamps();

  return {
    totalPosts: history.posts.length,
    successfulPosts: history.posts.filter(p => p.success).length,
    failedPosts: history.posts.filter(p => !p.success).length,
    feedPosts: history.posts.filter(p => p.postType === 'feed' && p.success).length,
    carouselPosts: history.posts.filter(p => p.postType === 'carousel' && p.success).length,
    reelPosts: history.posts.filter(p => p.postType === 'reel' && p.success).length,
    uniqueFilesPosted: postedFileIds.size,
    uniqueBatchesPosted: postedBatches.size,
  };
}

// ============================================================================
// CLEANUP
// ============================================================================

/**
 * Remove old failed posts from history
 */
export function cleanupFailedPosts(maxAgeDays: number = 7): number {
  const history = loadHistory();
  const cutoff = Date.now() - (maxAgeDays * 24 * 60 * 60 * 1000);

  const originalCount = history.posts.length;

  history.posts = history.posts.filter(post => {
    if (post.success) return true;
    const postTime = new Date(post.postedAt).getTime();
    return postTime > cutoff;
  });

  const removed = originalCount - history.posts.length;

  if (removed > 0) {
    saveHistory(history);
    console.log(`🧹 Removed ${removed} old failed post records`);
  }

  return removed;
}

/**
 * Clear all history (use with caution)
 */
export function clearHistory(): void {
  const history: PostingHistory = {
    version: HISTORY_VERSION,
    posts: [],
    lastUpdated: new Date().toISOString(),
  };
  saveHistory(history);
  console.log('🗑️ Posting history cleared');
}

// ============================================================================
// EXPORT SUMMARY
// ============================================================================

/**
 * Export history as formatted summary
 */
export function getHistorySummary(): string {
  const stats = getPostingStats();
  const recentPosts = getRecentPosts(5);

  let summary = '📊 POSTING HISTORY SUMMARY\n';
  summary += '═══════════════════════════\n\n';

  summary += '📈 Statistics:\n';
  summary += `   Total Posts: ${stats.totalPosts}\n`;
  summary += `   Successful: ${stats.successfulPosts}\n`;
  summary += `   Failed: ${stats.failedPosts}\n`;
  summary += `   Feed Posts: ${stats.feedPosts}\n`;
  summary += `   Carousels: ${stats.carouselPosts}\n`;
  summary += `   Reels: ${stats.reelPosts}\n`;
  summary += `   Unique Files: ${stats.uniqueFilesPosted}\n`;
  summary += `   Unique Batches: ${stats.uniqueBatchesPosted}\n\n`;

  if (recentPosts.length > 0) {
    summary += '📝 Recent Posts:\n';
    for (const post of recentPosts) {
      const date = new Date(post.postedAt).toLocaleString();
      const status = post.success ? '✅' : '❌';
      summary += `   ${status} ${post.postType} - ${date}\n`;
      if (post.instagramMediaId) {
        summary += `      Media ID: ${post.instagramMediaId}\n`;
      }
    }
  }

  return summary;
}
