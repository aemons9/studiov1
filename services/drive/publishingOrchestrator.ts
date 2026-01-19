/**
 * PUBLISHING ORCHESTRATOR
 *
 * Main orchestration service that coordinates:
 * 1. Google Drive ingestion
 * 2. Content strategy decisions
 * 3. Reel/video generation
 * 4. Instagram publishing
 *
 * Uses the long-lived Facebook Page Access Token for publishing.
 */

import * as fs from 'fs';
import * as path from 'path';

import {
  ingestFromDrive,
  DriveImage,
  ImageBatch,
  getImageAsBase64,
  downloadImage,
  cleanupCache,
} from './driveIngestionService';

import {
  analyzeAndStrategize,
  createContentPlan,
  getNextContent,
  ContentCandidate,
  generateCaption,
  generateHashtags,
} from './contentStrategist';

import {
  createSimpleReel,
  videoToBase64,
  cleanupReels,
  ReelConfig,
} from './reelGenerator';

import {
  addPostRecord,
  isFilePosted,
  getPostingStats,
  getHistorySummary,
  PostType,
} from './postingHistory';

// ============================================================================
// TYPES
// ============================================================================

export interface PublishingConfig {
  accessToken: string;
  githubToken: string;
  instagramAccountId?: string;
  musicPath?: string;           // Optional background music for reels
  dryRun?: boolean;             // If true, don't actually publish
  maxPostsPerRun?: number;      // Limit posts per execution
  preferredFormat?: PostType;   // Prefer specific format
}

export interface PublishResult {
  success: boolean;
  postType: PostType;
  mediaId?: string;
  driveFileIds: string[];
  batchTimestamps: number[];
  caption?: string;
  error?: string;
}

export interface OrchestratorResult {
  success: boolean;
  postsCreated: number;
  results: PublishResult[];
  summary: string;
  error?: string;
}

// ============================================================================
// CONFIGURATION
// ============================================================================

// Instagram Graph API base
const GRAPH_API_BASE = 'https://graph.facebook.com/v21.0';

// Default Instagram account (from tokenManager)
const DEFAULT_IG_ACCOUNT_ID = '17841478517688462';

// GitHub hosting config
const GITHUB_CONFIG = {
  owner: 'aemons9',
  repo: 'studiov1',
  branch: 'main',
  pathPrefix: 'photo/instagram',
};

// Note: Proxy server URL managed by sharedAuthManager.getProxyBaseUrl() when needed

// ============================================================================
// IMAGE HOSTING
// ============================================================================

/**
 * Upload image to GitHub for public URL
 */
async function uploadToGitHub(
  imageData: string,
  githubToken: string,
  filename?: string
): Promise<string | null> {
  try {
    const finalFilename = filename || `auto-${Date.now()}-${Math.random().toString(36).substring(2, 6)}.jpg`;
    const filePath = `${GITHUB_CONFIG.pathPrefix}/${finalFilename}`;

    // Clean base64
    let cleanBase64 = imageData;
    if (cleanBase64.includes(',')) {
      cleanBase64 = cleanBase64.split(',')[1];
    }

    console.log(`📤 Uploading to GitHub: ${filePath}`);

    const apiUrl = `https://api.github.com/repos/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/contents/${filePath}`;

    const response = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${githubToken}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `[Auto] Add image: ${finalFilename}`,
        content: cleanBase64,
        branch: GITHUB_CONFIG.branch,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('❌ GitHub upload failed:', error);
      return null;
    }

    const publicUrl = `https://raw.githubusercontent.com/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/${GITHUB_CONFIG.branch}/${filePath}`;
    console.log(`✅ Uploaded: ${publicUrl}`);

    // Wait for GitHub CDN propagation
    await new Promise(resolve => setTimeout(resolve, 2000));

    return publicUrl;
  } catch (error) {
    console.error('❌ GitHub upload error:', error);
    return null;
  }
}

/**
 * Upload video to GitHub for public URL
 */
async function uploadVideoToGitHub(
  videoPath: string,
  githubToken: string
): Promise<string | null> {
  try {
    const videoBuffer = fs.readFileSync(videoPath);
    const base64 = videoBuffer.toString('base64');

    const filename = `reel-${Date.now()}.mp4`;
    const filePath = `photo/reels/${filename}`;

    console.log(`📤 Uploading video to GitHub: ${filePath}`);

    const apiUrl = `https://api.github.com/repos/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/contents/${filePath}`;

    const response = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${githubToken}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `[Auto] Add reel: ${filename}`,
        content: base64,
        branch: GITHUB_CONFIG.branch,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('❌ Video upload failed:', error);
      return null;
    }

    const publicUrl = `https://raw.githubusercontent.com/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/${GITHUB_CONFIG.branch}/${filePath}`;
    console.log(`✅ Video uploaded: ${publicUrl}`);

    // Wait for propagation
    await new Promise(resolve => setTimeout(resolve, 3000));

    return publicUrl;
  } catch (error) {
    console.error('❌ Video upload error:', error);
    return null;
  }
}

// ============================================================================
// INSTAGRAM PUBLISHING
// ============================================================================

/**
 * Publish a single image as feed post
 */
async function publishFeedPost(
  imageUrl: string,
  caption: string,
  accessToken: string,
  accountId: string
): Promise<{ success: boolean; mediaId?: string; error?: string }> {
  try {
    console.log('📸 Publishing feed post...');

    // Create media container
    const containerUrl = `${GRAPH_API_BASE}/${accountId}/media`;
    const containerParams = new URLSearchParams({
      image_url: imageUrl,
      caption,
      access_token: accessToken,
    });

    const containerResponse = await fetch(containerUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: containerParams.toString(),
    });

    const containerData = await containerResponse.json();

    if (!containerResponse.ok) {
      return {
        success: false,
        error: containerData.error?.message || 'Container creation failed',
      };
    }

    const containerId = containerData.id;
    console.log(`   Container created: ${containerId}`);

    // Wait for processing
    await waitForContainerReady(containerId, accessToken);

    // Publish
    const publishUrl = `${GRAPH_API_BASE}/${accountId}/media_publish`;
    const publishParams = new URLSearchParams({
      creation_id: containerId,
      access_token: accessToken,
    });

    const publishResponse = await fetch(publishUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: publishParams.toString(),
    });

    const publishData = await publishResponse.json();

    if (!publishResponse.ok) {
      return {
        success: false,
        error: publishData.error?.message || 'Publish failed',
      };
    }

    console.log(`✅ Feed post published! Media ID: ${publishData.id}`);
    return { success: true, mediaId: publishData.id };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Publish carousel post
 */
async function publishCarousel(
  imageUrls: string[],
  caption: string,
  accessToken: string,
  accountId: string
): Promise<{ success: boolean; mediaId?: string; error?: string }> {
  try {
    console.log(`📚 Publishing carousel with ${imageUrls.length} images...`);

    // Create child containers for each image
    const childIds: string[] = [];

    for (const imageUrl of imageUrls) {
      const containerUrl = `${GRAPH_API_BASE}/${accountId}/media`;
      const containerParams = new URLSearchParams({
        image_url: imageUrl,
        is_carousel_item: 'true',
        access_token: accessToken,
      });

      const response = await fetch(containerUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: containerParams.toString(),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error(`❌ Failed to create carousel item:`, data.error);
        continue;
      }

      childIds.push(data.id);
      console.log(`   Child container: ${data.id}`);
    }

    if (childIds.length < 2) {
      return { success: false, error: 'Need at least 2 carousel items' };
    }

    // Wait for all children to be ready
    for (const childId of childIds) {
      await waitForContainerReady(childId, accessToken);
    }

    // Create carousel container
    const carouselUrl = `${GRAPH_API_BASE}/${accountId}/media`;
    const carouselParams = new URLSearchParams({
      media_type: 'CAROUSEL',
      children: childIds.join(','),
      caption,
      access_token: accessToken,
    });

    const carouselResponse = await fetch(carouselUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: carouselParams.toString(),
    });

    const carouselData = await carouselResponse.json();

    if (!carouselResponse.ok) {
      return {
        success: false,
        error: carouselData.error?.message || 'Carousel creation failed',
      };
    }

    const containerId = carouselData.id;
    console.log(`   Carousel container: ${containerId}`);

    // Wait for carousel to be ready
    await waitForContainerReady(containerId, accessToken);

    // Publish
    const publishUrl = `${GRAPH_API_BASE}/${accountId}/media_publish`;
    const publishParams = new URLSearchParams({
      creation_id: containerId,
      access_token: accessToken,
    });

    const publishResponse = await fetch(publishUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: publishParams.toString(),
    });

    const publishData = await publishResponse.json();

    if (!publishResponse.ok) {
      return {
        success: false,
        error: publishData.error?.message || 'Publish failed',
      };
    }

    console.log(`✅ Carousel published! Media ID: ${publishData.id}`);
    return { success: true, mediaId: publishData.id };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Publish reel
 */
async function publishReel(
  videoUrl: string,
  caption: string,
  accessToken: string,
  accountId: string
): Promise<{ success: boolean; mediaId?: string; error?: string }> {
  try {
    console.log('🎬 Publishing reel...');

    // Create reel container
    const containerUrl = `${GRAPH_API_BASE}/${accountId}/media`;
    const containerParams = new URLSearchParams({
      media_type: 'REELS',
      video_url: videoUrl,
      caption,
      share_to_feed: 'true',
      access_token: accessToken,
    });

    const containerResponse = await fetch(containerUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: containerParams.toString(),
    });

    const containerData = await containerResponse.json();

    if (!containerResponse.ok) {
      return {
        success: false,
        error: containerData.error?.message || 'Reel container creation failed',
      };
    }

    const containerId = containerData.id;
    console.log(`   Reel container: ${containerId}`);

    // Wait for video processing (reels take longer)
    await waitForContainerReady(containerId, accessToken, 60);

    // Publish
    const publishUrl = `${GRAPH_API_BASE}/${accountId}/media_publish`;
    const publishParams = new URLSearchParams({
      creation_id: containerId,
      access_token: accessToken,
    });

    const publishResponse = await fetch(publishUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: publishParams.toString(),
    });

    const publishData = await publishResponse.json();

    if (!publishResponse.ok) {
      return {
        success: false,
        error: publishData.error?.message || 'Reel publish failed',
      };
    }

    console.log(`✅ Reel published! Media ID: ${publishData.id}`);
    return { success: true, mediaId: publishData.id };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Wait for media container to be ready
 */
async function waitForContainerReady(
  containerId: string,
  accessToken: string,
  maxAttempts: number = 30
): Promise<boolean> {
  for (let i = 0; i < maxAttempts; i++) {
    await new Promise(resolve => setTimeout(resolve, 2000));

    const statusUrl = `${GRAPH_API_BASE}/${containerId}?fields=status,status_code&access_token=${accessToken}`;
    const response = await fetch(statusUrl);
    const data = await response.json();

    if (data.status === 'FINISHED') {
      return true;
    }

    if (data.status === 'ERROR') {
      throw new Error(`Container processing failed: ${data.status_code}`);
    }

    console.log(`   Status check ${i + 1}/${maxAttempts}: ${data.status || 'IN_PROGRESS'}`);
  }

  throw new Error('Timeout waiting for container to be ready');
}

// ============================================================================
// MAIN ORCHESTRATION
// ============================================================================

/**
 * Process and publish a single content candidate
 */
async function processCandidate(
  candidate: ContentCandidate,
  config: PublishingConfig
): Promise<PublishResult> {
  const { accessToken, githubToken, instagramAccountId, dryRun } = config;
  const accountId = instagramAccountId || DEFAULT_IG_ACCOUNT_ID;

  const driveFileIds = candidate.images.map(img => img.id);
  const batchTimestamps = candidate.batchTimestamps;

  // Generate caption and hashtags
  const captionText = generateCaption(candidate.captionStyle, candidate.images.length);
  const hashtags = generateHashtags(candidate.type, candidate.captionStyle);
  const fullCaption = `${captionText}\n\n${hashtags.map(h => `#${h}`).join(' ')}`;

  console.log(`\n📝 Processing ${candidate.type.toUpperCase()}: ${candidate.images.length} images`);
  console.log(`   Reason: ${candidate.reason}`);

  if (dryRun) {
    console.log('🔵 DRY RUN - Not actually publishing');
    return {
      success: true,
      postType: candidate.type,
      driveFileIds,
      batchTimestamps,
      caption: fullCaption,
    };
  }

  try {
    let result: { success: boolean; mediaId?: string; error?: string };

    switch (candidate.type) {
      case 'feed': {
        // Single image
        const image = candidate.images[0];
        const imageData = await getImageAsBase64(image);
        const imageUrl = await uploadToGitHub(imageData, githubToken);

        if (!imageUrl) {
          return {
            success: false,
            postType: 'feed',
            driveFileIds,
            batchTimestamps,
            error: 'Failed to upload image to GitHub',
          };
        }

        result = await publishFeedPost(imageUrl, fullCaption, accessToken, accountId);
        break;
      }

      case 'carousel': {
        // Multiple images
        const imageUrls: string[] = [];

        for (const image of candidate.images) {
          const imageData = await getImageAsBase64(image);
          const imageUrl = await uploadToGitHub(imageData, githubToken);

          if (imageUrl) {
            imageUrls.push(imageUrl);
          }
        }

        if (imageUrls.length < 2) {
          return {
            success: false,
            postType: 'carousel',
            driveFileIds,
            batchTimestamps,
            error: 'Failed to upload enough images for carousel',
          };
        }

        result = await publishCarousel(imageUrls, fullCaption, accessToken, accountId);
        break;
      }

      case 'reel': {
        // Create video from images
        const reelResult = await createSimpleReel({
          images: candidate.images,
          imageDuration: 3,
          musicPath: config.musicPath,
          resolution: '1080x1920',
        });

        if (!reelResult.success || !reelResult.outputPath) {
          return {
            success: false,
            postType: 'reel',
            driveFileIds,
            batchTimestamps,
            error: reelResult.error || 'Reel creation failed',
          };
        }

        const videoUrl = await uploadVideoToGitHub(reelResult.outputPath, githubToken);

        if (!videoUrl) {
          return {
            success: false,
            postType: 'reel',
            driveFileIds,
            batchTimestamps,
            error: 'Failed to upload video to GitHub',
          };
        }

        result = await publishReel(videoUrl, fullCaption, accessToken, accountId);
        break;
      }

      default:
        return {
          success: false,
          postType: candidate.type,
          driveFileIds,
          batchTimestamps,
          error: `Unknown post type: ${candidate.type}`,
        };
    }

    // Record the post
    addPostRecord({
      driveFileIds,
      batchTimestamps,
      postType: candidate.type,
      instagramMediaId: result.mediaId,
      caption: fullCaption,
      hashtags,
      success: result.success,
      error: result.error,
    });

    return {
      success: result.success,
      postType: candidate.type,
      mediaId: result.mediaId,
      driveFileIds,
      batchTimestamps,
      caption: fullCaption,
      error: result.error,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    addPostRecord({
      driveFileIds,
      batchTimestamps,
      postType: candidate.type,
      success: false,
      error: errorMessage,
    });

    return {
      success: false,
      postType: candidate.type,
      driveFileIds,
      batchTimestamps,
      error: errorMessage,
    };
  }
}

/**
 * Main orchestration function
 */
export async function runOrchestrator(config: PublishingConfig): Promise<OrchestratorResult> {
  console.log('\n' + '═'.repeat(60));
  console.log('🚀 INSTAGRAM AUTO-PUBLISHING ORCHESTRATOR');
  console.log('═'.repeat(60) + '\n');

  const results: PublishResult[] = [];
  const maxPosts = config.maxPostsPerRun || 3;

  try {
    // Step 1: Ingest from Google Drive
    console.log('📂 Step 1: Ingesting from Google Drive...');
    const ingestion = await ingestFromDrive();

    if (!ingestion.success) {
      return {
        success: false,
        postsCreated: 0,
        results: [],
        summary: 'Drive ingestion failed',
        error: ingestion.error,
      };
    }

    if (ingestion.batches.length === 0) {
      return {
        success: true,
        postsCreated: 0,
        results: [],
        summary: 'No new images found in Google Drive',
      };
    }

    // Step 2: Analyze and strategize
    console.log('\n🎨 Step 2: Analyzing content strategy...');
    const strategy = analyzeAndStrategize(ingestion.batches);

    if (strategy.candidates.length === 0) {
      return {
        success: true,
        postsCreated: 0,
        results: [],
        summary: 'All content has already been posted',
      };
    }

    // Step 3: Filter by preferred format if specified
    let candidates = strategy.candidates;
    if (config.preferredFormat) {
      candidates = candidates.filter(c => c.type === config.preferredFormat);
      console.log(`   Filtered to ${candidates.length} ${config.preferredFormat} candidates`);
    }

    // Step 4: Process candidates
    console.log(`\n📤 Step 3: Publishing (max ${maxPosts} posts)...`);

    let postsCreated = 0;
    for (const candidate of candidates.slice(0, maxPosts)) {
      const result = await processCandidate(candidate, config);
      results.push(result);

      if (result.success) {
        postsCreated++;
      }

      // Small delay between posts
      if (candidates.indexOf(candidate) < candidates.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    }

    // Step 5: Cleanup
    console.log('\n🧹 Step 4: Cleanup...');
    cleanupCache(24);
    cleanupReels(24);

    // Generate summary
    const stats = getPostingStats();
    const summary = `
═══════════════════════════════════════════════════════════
📊 ORCHESTRATOR COMPLETE
═══════════════════════════════════════════════════════════

Posts Created: ${postsCreated}/${maxPosts} max
├─ Successful: ${results.filter(r => r.success).length}
└─ Failed: ${results.filter(r => !r.success).length}

Overall Stats:
├─ Total Posts: ${stats.totalPosts}
├─ Feed Posts: ${stats.feedPosts}
├─ Carousels: ${stats.carouselPosts}
└─ Reels: ${stats.reelPosts}

═══════════════════════════════════════════════════════════
    `.trim();

    console.log('\n' + summary);

    return {
      success: true,
      postsCreated,
      results,
      summary,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('❌ Orchestrator error:', errorMessage);

    return {
      success: false,
      postsCreated: results.filter(r => r.success).length,
      results,
      summary: 'Orchestrator failed with error',
      error: errorMessage,
    };
  }
}

/**
 * Quick publish: just publish the next best content
 */
export async function quickAutoPublish(config: PublishingConfig): Promise<PublishResult | null> {
  console.log('⚡ Quick auto-publish...');

  const ingestion = await ingestFromDrive();
  if (!ingestion.success || ingestion.batches.length === 0) {
    console.log('No content available');
    return null;
  }

  const strategy = analyzeAndStrategize(ingestion.batches);
  const nextContent = getNextContent(strategy.candidates);

  if (!nextContent) {
    console.log('All content already posted');
    return null;
  }

  return processCandidate(nextContent, config);
}

/**
 * Get status without publishing
 */
export async function getOrchestratorStatus(): Promise<{
  driveStats: { batches: number; images: number };
  candidates: { feed: number; carousel: number; reel: number };
  history: string;
}> {
  const ingestion = await ingestFromDrive();
  const strategy = ingestion.success
    ? analyzeAndStrategize(ingestion.batches)
    : { candidates: [] };

  const plan = createContentPlan(strategy.candidates);

  return {
    driveStats: {
      batches: ingestion.batches.length,
      images: ingestion.images.length,
    },
    candidates: {
      feed: plan.feedPosts.length,
      carousel: plan.carousels.length,
      reel: plan.reels.length,
    },
    history: getHistorySummary(),
  };
}
