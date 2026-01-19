/**
 * CONTENT STRATEGIST
 *
 * Acts as an AI art director to make creative decisions about:
 * - Which images to post
 * - What format to use (feed/carousel/reel)
 * - How to group images for maximum impact
 *
 * Decision logic:
 * - 1 image in batch → Feed post candidate
 * - 2-10 images in batch → Carousel candidate
 * - 5+ images (same or recent batches) → Reel candidate
 */

import {
  DriveImage,
  ImageBatch,
  downloadImage,
} from './driveIngestionService';
import {
  isFilePosted,
  isBatchPosted,
  getPostedFileIds,
  PostType,
} from './postingHistory';

// ============================================================================
// TYPES
// ============================================================================

export interface ContentCandidate {
  id: string;
  type: PostType;
  images: DriveImage[];
  batchTimestamps: number[];
  score: number;           // Quality/priority score (higher = better)
  reason: string;          // Why this format was chosen
  captionStyle: CaptionStyle;
}

export type CaptionStyle = 'editorial' | 'minimalist' | 'luxury' | 'cinematic';

export interface StrategyResult {
  candidates: ContentCandidate[];
  skippedBatches: number[];  // Already posted
  summary: string;
}

export interface ContentPlan {
  feedPosts: ContentCandidate[];
  carousels: ContentCandidate[];
  reels: ContentCandidate[];
  totalCandidates: number;
}

// ============================================================================
// CONFIGURATION
// ============================================================================

// Minimum images for each format
const MIN_CAROUSEL_IMAGES = 2;
const MAX_CAROUSEL_IMAGES = 10;
const MIN_REEL_IMAGES = 5;
const MAX_REEL_IMAGES = 12;

// Score weights for creative decisions
const SCORE_WEIGHTS = {
  batchSize: 1.0,         // Larger batches = more coherent
  recency: 0.5,           // Newer = higher priority
  uniqueness: 2.0,        // Not posted before = much higher
};

// ============================================================================
// CANDIDATE GENERATION
// ============================================================================

/**
 * Generate unique candidate ID
 */
function generateCandidateId(): string {
  return `cand-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
}

/**
 * Calculate quality score for a candidate
 */
function calculateScore(images: DriveImage[], batchTimestamp: number): number {
  let score = 0;

  // Batch size score (prefer larger coherent batches)
  score += Math.min(images.length / 5, 2) * SCORE_WEIGHTS.batchSize;

  // Recency score (prefer newer content)
  const ageHours = (Date.now() - batchTimestamp) / (1000 * 60 * 60);
  const recencyScore = Math.max(0, 1 - (ageHours / (24 * 7))); // Decay over a week
  score += recencyScore * SCORE_WEIGHTS.recency;

  // Uniqueness score (not posted = much higher)
  const postedIds = getPostedFileIds();
  const unpostedCount = images.filter(img => !postedIds.has(img.id)).length;
  const uniquenessRatio = unpostedCount / images.length;
  score += uniquenessRatio * SCORE_WEIGHTS.uniqueness;

  return score;
}

/**
 * Choose caption style based on image characteristics
 */
function chooseCaptionStyle(images: DriveImage[]): CaptionStyle {
  // For now, rotate between styles based on batch timestamp
  // Could be enhanced with actual image analysis
  const styles: CaptionStyle[] = ['editorial', 'minimalist', 'luxury', 'cinematic'];
  const timestamp = images[0]?.batchTimestamp || Date.now();
  return styles[timestamp % styles.length];
}

/**
 * Analyze a single batch and determine best format
 */
function analyzeBatch(batch: ImageBatch): ContentCandidate | null {
  const { images, timestamp } = batch;

  // Filter out already posted images
  const postedIds = getPostedFileIds();
  const unpostedImages = images.filter(img => !postedIds.has(img.id));

  if (unpostedImages.length === 0) {
    return null; // All images already posted
  }

  // Determine format based on image count
  let type: PostType;
  let selectedImages: DriveImage[];
  let reason: string;

  if (unpostedImages.length === 1) {
    // Single image → Feed post
    type = 'feed';
    selectedImages = unpostedImages;
    reason = 'Single image batch - best as standalone feed post';
  } else if (unpostedImages.length >= MIN_CAROUSEL_IMAGES && unpostedImages.length <= MAX_CAROUSEL_IMAGES) {
    // 2-10 images → Carousel
    type = 'carousel';
    selectedImages = unpostedImages.slice(0, MAX_CAROUSEL_IMAGES);
    reason = `${unpostedImages.length} images form a coherent visual sequence - ideal for carousel`;
  } else if (unpostedImages.length > MAX_CAROUSEL_IMAGES) {
    // More than 10 → Could be Reel or split
    if (unpostedImages.length >= MIN_REEL_IMAGES) {
      type = 'reel';
      selectedImages = unpostedImages.slice(0, MAX_REEL_IMAGES);
      reason = `Large batch (${unpostedImages.length} images) - dynamic sequence for Reel`;
    } else {
      type = 'carousel';
      selectedImages = unpostedImages.slice(0, MAX_CAROUSEL_IMAGES);
      reason = 'Batch split for carousel format';
    }
  } else {
    // Default to carousel for 2+ images
    type = 'carousel';
    selectedImages = unpostedImages;
    reason = 'Multiple related images - carousel format';
  }

  return {
    id: generateCandidateId(),
    type,
    images: selectedImages,
    batchTimestamps: [timestamp],
    score: calculateScore(selectedImages, timestamp),
    reason,
    captionStyle: chooseCaptionStyle(selectedImages),
  };
}

/**
 * Try to combine recent batches for a Reel
 */
function findReelCandidates(batches: ImageBatch[]): ContentCandidate[] {
  const candidates: ContentCandidate[] = [];
  const postedIds = getPostedFileIds();

  // Look for sequences of related batches
  // (batches within 24 hours of each other)
  const timeWindow = 24 * 60 * 60 * 1000; // 24 hours

  for (let i = 0; i < batches.length; i++) {
    const startBatch = batches[i];
    const relatedImages: DriveImage[] = [];
    const relatedTimestamps: number[] = [];

    // Collect images from this and nearby batches
    for (let j = i; j < batches.length && j < i + 5; j++) {
      const batch = batches[j];

      // Check if within time window
      if (Math.abs(batch.timestamp - startBatch.timestamp) > timeWindow) {
        break;
      }

      // Add unposted images
      for (const img of batch.images) {
        if (!postedIds.has(img.id) && relatedImages.length < MAX_REEL_IMAGES) {
          relatedImages.push(img);
        }
      }

      if (!relatedTimestamps.includes(batch.timestamp)) {
        relatedTimestamps.push(batch.timestamp);
      }
    }

    // Create Reel candidate if we have enough images
    if (relatedImages.length >= MIN_REEL_IMAGES) {
      candidates.push({
        id: generateCandidateId(),
        type: 'reel',
        images: relatedImages,
        batchTimestamps: relatedTimestamps,
        score: calculateScore(relatedImages, startBatch.timestamp) + 0.5, // Bonus for Reels
        reason: `Combined ${relatedTimestamps.length} related batches (${relatedImages.length} images) for dynamic Reel`,
        captionStyle: 'cinematic', // Reels often work best with cinematic style
      });
    }
  }

  return candidates;
}

// ============================================================================
// MAIN STRATEGY FUNCTIONS
// ============================================================================

/**
 * Analyze all batches and generate content candidates
 */
export function analyzeAndStrategize(batches: ImageBatch[]): StrategyResult {
  console.log('🎨 Content Strategist analyzing batches...');

  const candidates: ContentCandidate[] = [];
  const skippedBatches: number[] = [];

  // Analyze each batch individually
  for (const batch of batches) {
    if (isBatchPosted(batch.timestamp)) {
      skippedBatches.push(batch.timestamp);
      continue;
    }

    const candidate = analyzeBatch(batch);
    if (candidate) {
      candidates.push(candidate);
    }
  }

  // Look for Reel opportunities from combined batches
  const reelCandidates = findReelCandidates(batches);
  for (const reel of reelCandidates) {
    // Only add if not overlapping with existing candidates
    const overlaps = candidates.some(c =>
      c.images.some(img => reel.images.some(ri => ri.id === img.id))
    );
    if (!overlaps) {
      candidates.push(reel);
    }
  }

  // Sort by score (highest first)
  candidates.sort((a, b) => b.score - a.score);

  // Generate summary
  const feedCount = candidates.filter(c => c.type === 'feed').length;
  const carouselCount = candidates.filter(c => c.type === 'carousel').length;
  const reelCount = candidates.filter(c => c.type === 'reel').length;

  const summary = `
📊 CONTENT STRATEGY SUMMARY
═══════════════════════════
Total Candidates: ${candidates.length}
├─ Feed Posts: ${feedCount}
├─ Carousels: ${carouselCount}
└─ Reels: ${reelCount}

Skipped (already posted): ${skippedBatches.length} batches

Top Candidates:
${candidates.slice(0, 5).map((c, i) =>
    `${i + 1}. ${c.type.toUpperCase()} (${c.images.length} images, score: ${c.score.toFixed(2)})
   Reason: ${c.reason}`
  ).join('\n')}
`.trim();

  console.log(summary);

  return {
    candidates,
    skippedBatches,
    summary,
  };
}

/**
 * Create a content plan from candidates
 */
export function createContentPlan(candidates: ContentCandidate[]): ContentPlan {
  return {
    feedPosts: candidates.filter(c => c.type === 'feed'),
    carousels: candidates.filter(c => c.type === 'carousel'),
    reels: candidates.filter(c => c.type === 'reel'),
    totalCandidates: candidates.length,
  };
}

/**
 * Get the next best content to post
 */
export function getNextContent(candidates: ContentCandidate[]): ContentCandidate | null {
  if (candidates.length === 0) return null;

  // Return highest scored candidate
  const sorted = [...candidates].sort((a, b) => b.score - a.score);
  return sorted[0];
}

/**
 * Get next content of specific type
 */
export function getNextContentByType(
  candidates: ContentCandidate[],
  type: PostType
): ContentCandidate | null {
  const filtered = candidates.filter(c => c.type === type);
  if (filtered.length === 0) return null;

  const sorted = [...filtered].sort((a, b) => b.score - a.score);
  return sorted[0];
}

// ============================================================================
// CAPTION GENERATION
// ============================================================================

/**
 * Generate caption based on style
 */
export function generateCaption(style: CaptionStyle, imageCount: number): string {
  const captions: Record<CaptionStyle, string[]> = {
    editorial: [
      'Behind the lens, beauty unfolds.',
      'Where art meets intention.',
      'Crafted with precision, captured with passion.',
      'Every frame tells a story.',
      'The art of visual storytelling.',
    ],
    minimalist: [
      '.',
      'Light. Shadow. Essence.',
      'Less is more.',
      'In simplicity, truth.',
      'Pure vision.',
    ],
    luxury: [
      'Excellence in every detail.',
      'Where luxury meets artistry.',
      'Curated for the discerning eye.',
      'Timeless elegance, captured.',
      'The epitome of refined beauty.',
    ],
    cinematic: [
      'A moment frozen in time.',
      'Between the frames, magic happens.',
      'Every image, a scene.',
      'The drama of light and shadow.',
      'Cinematic beauty, unveiled.',
    ],
  };

  const styleOptions = captions[style];
  const randomCaption = styleOptions[Math.floor(Math.random() * styleOptions.length)];

  // Add context for multi-image posts
  if (imageCount > 1) {
    return `${randomCaption}\n\nSwipe for the full story.`;
  }

  return randomCaption;
}

/**
 * Generate hashtags based on content type and style
 */
export function generateHashtags(type: PostType, style: CaptionStyle): string[] {
  const baseHashtags = [
    'veracrvs', 'aiart', 'digitalart', 'photography',
    'visualart', 'artistsoninstagram', 'creative',
  ];

  const styleHashtags: Record<CaptionStyle, string[]> = {
    editorial: ['editorial', 'editorialphotography', 'fashionphotography', 'highfashion'],
    minimalist: ['minimal', 'minimalism', 'minimalart', 'cleandesign'],
    luxury: ['luxury', 'luxurylifestyle', 'elegance', 'highend'],
    cinematic: ['cinematic', 'cinematicphotography', 'filmvibes', 'visualstorytelling'],
  };

  const typeHashtags: Record<PostType, string[]> = {
    feed: ['instadaily', 'photooftheday', 'instagood'],
    carousel: ['carousel', 'swipe', 'gallerrypost'],
    reel: ['reels', 'reelsviral', 'instareels', 'trending'],
  };

  return [
    ...baseHashtags,
    ...styleHashtags[style],
    ...typeHashtags[type],
  ];
}
