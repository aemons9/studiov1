/**
 * GOOGLE DRIVE AUTO-PUBLISHING SERVICES
 *
 * Complete pipeline for automated Instagram content publishing from Google Drive.
 *
 * Features:
 * - Service account authentication for Drive access
 * - Batch grouping by filename timestamps
 * - Creative content strategy decisions
 * - Multi-image Reel generation with FFmpeg
 * - Instagram Graph API publishing (feed, carousel, reel)
 * - Posting history tracking
 */

// Drive ingestion
export {
  initializeDriveClient,
  findAssetFolder,
  listImages,
  groupImagesByBatch,
  downloadImage,
  downloadBatch,
  getImageAsBase64,
  ingestFromDrive,
  cleanupCache,
  getDriveStats,
  type DriveImage,
  type ImageBatch,
  type DriveIngestionResult,
} from './driveIngestionService';

// Content strategy
export {
  analyzeAndStrategize,
  createContentPlan,
  getNextContent,
  getNextContentByType,
  generateCaption,
  generateHashtags,
  type ContentCandidate,
  type CaptionStyle,
  type StrategyResult,
  type ContentPlan,
} from './contentStrategist';

// Reel generation
export {
  createMultiImageReel,
  createSimpleReel,
  videoToBase64,
  getVideoDuration,
  cleanupReels,
  type ReelConfig,
  type ReelResult,
  type TransitionType,
  type MotionEffect,
  type Resolution,
  type TextOverlay,
} from './reelGenerator';

// Posting history
export {
  loadHistory,
  saveHistory,
  addPostRecord,
  isFilePosted,
  isBatchPosted,
  getPostedFileIds,
  getPostedBatchTimestamps,
  getRecentPosts,
  getPostsByType,
  getSuccessfulPosts,
  getFailedPosts,
  getPostingStats,
  cleanupFailedPosts,
  clearHistory,
  getHistorySummary,
  type PostRecord,
  type PostType,
  type PostingHistory,
} from './postingHistory';

// Publishing orchestrator
export {
  runOrchestrator,
  quickAutoPublish,
  getOrchestratorStatus,
  type PublishingConfig,
  type PublishResult,
  type OrchestratorResult,
} from './publishingOrchestrator';
