/**
 * INSTAGRAM REELS SERVICE
 *
 * Frontend service for creating and publishing Instagram Reels.
 * Converts static images to videos with music and publishes via Graph API.
 *
 * Features:
 * - Music library management
 * - Image-to-video conversion with audio
 * - Reel publishing via Instagram Graph API
 */

import { getProxyBaseUrl } from '../../utils/sharedAuthManager';

// Dynamic proxy URL for remote development support
const getProxyBase = () => getProxyBaseUrl();

// ============================================================================
// TYPES
// ============================================================================

export interface MusicTrack {
  id: string;
  filename: string;
  title: string;
  artist: string;
  size: number;
}

export interface CreateVideoOptions {
  imageData: string;
  musicId?: string;
  duration?: number;
  fadeIn?: number;
  fadeOut?: number;
}

export interface CreateVideoResult {
  success: boolean;
  videoData?: string;
  size?: number;
  duration?: number;
  hasAudio?: boolean;
  error?: string;
}

export interface PublishReelOptions {
  accessToken: string;
  videoUrl: string;
  caption?: string;
  hashtags?: string[];
  coverUrl?: string;
  shareToFeed?: boolean;
  audioName?: string;
}

export interface PublishReelResult {
  success: boolean;
  mediaId?: string;
  videoUrl?: string;
  caption?: string;
  type?: string;
  publishedAt?: string;
  error?: string;
  details?: string;
}

export interface FullReelPublishOptions {
  accessToken: string;
  imageData: string;
  caption?: string;
  musicId?: string;
  duration?: number;
  hashtags?: string[];
  githubToken: string;
  audioName?: string;
}

// ============================================================================
// MUSIC LIBRARY
// ============================================================================

/**
 * Get list of available music tracks from the library
 */
export async function getMusicLibrary(): Promise<MusicTrack[]> {
  try {
    const response = await fetch(`${getProxyBase()}/api/music/library`);
    const data = await response.json();

    if (!response.ok || !data.success) {
      console.error('Failed to load music library:', data.error);
      return [];
    }

    return data.tracks || [];
  } catch (error) {
    console.error('Error loading music library:', error);
    return [];
  }
}

/**
 * Upload a music file to the library
 */
export async function uploadMusic(file: File): Promise<{
  success: boolean;
  filename?: string;
  error?: string;
}> {
  try {
    const response = await fetch(`${getProxyBase()}/api/music/upload`, {
      method: 'POST',
      headers: {
        'Content-Type': file.type || 'audio/mpeg',
        'X-Filename': file.name,
      },
      body: file,
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.error || 'Upload failed' };
    }

    return { success: true, filename: data.filename };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Upload failed',
    };
  }
}

// ============================================================================
// VIDEO CREATION
// ============================================================================

/**
 * Create a video from an image with optional music
 */
export async function createVideo(options: CreateVideoOptions): Promise<CreateVideoResult> {
  try {
    console.log('🎬 Creating video from image...');

    const response = await fetch(`${getProxyBase()}/api/reels/create-video`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        imageData: options.imageData,
        musicId: options.musicId,
        duration: options.duration || 15,
        fadeIn: options.fadeIn || 1,
        fadeOut: options.fadeOut || 2,
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      return {
        success: false,
        error: data.error || 'Video creation failed',
      };
    }

    console.log(`✅ Video created: ${(data.size / 1024 / 1024).toFixed(2)} MB`);

    return {
      success: true,
      videoData: data.videoData,
      size: data.size,
      duration: data.duration,
      hasAudio: data.hasAudio,
    };
  } catch (error) {
    console.error('Video creation error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Video creation failed',
    };
  }
}

// ============================================================================
// REEL PUBLISHING
// ============================================================================

/**
 * Publish a video as an Instagram Reel
 * Requires the video to already be hosted at a public URL
 */
export async function publishReel(options: PublishReelOptions): Promise<PublishReelResult> {
  try {
    console.log('🎬 Publishing Reel to Instagram...');

    const response = await fetch(`${getProxyBase()}/api/instagram/publish-reel`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        accessToken: options.accessToken,
        videoUrl: options.videoUrl,
        caption: options.caption,
        hashtags: options.hashtags,
        coverUrl: options.coverUrl,
        shareToFeed: options.shareToFeed ?? true,
        audioName: options.audioName,
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      return {
        success: false,
        error: data.error || 'Reel publish failed',
        details: data.details,
      };
    }

    console.log(`✅ Reel published! Media ID: ${data.mediaId}`);

    return {
      success: true,
      mediaId: data.mediaId,
      videoUrl: data.videoUrl,
      caption: data.caption,
      type: data.type,
      publishedAt: data.publishedAt,
    };
  } catch (error) {
    console.error('Reel publish error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Reel publish failed',
    };
  }
}

/**
 * Complete flow: Create video from image + music, upload, and publish as Reel
 */
export async function createAndPublishReel(options: FullReelPublishOptions): Promise<PublishReelResult> {
  try {
    console.log('🎬 Starting full Reel creation and publishing...');

    const response = await fetch(`${getProxyBase()}/api/reels/upload-and-publish`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        accessToken: options.accessToken,
        imageData: options.imageData,
        caption: options.caption,
        musicId: options.musicId,
        duration: options.duration || 15,
        hashtags: options.hashtags,
        githubToken: options.githubToken,
        audioName: options.audioName,
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      return {
        success: false,
        error: data.error || 'Reel creation failed',
        details: data.details,
      };
    }

    console.log(`✅ Reel published! Media ID: ${data.mediaId}`);

    return {
      success: true,
      mediaId: data.mediaId,
      videoUrl: data.videoUrl,
      caption: data.caption,
      type: data.type,
      publishedAt: data.publishedAt,
    };
  } catch (error) {
    console.error('Reel creation error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Reel creation failed',
    };
  }
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Check if the Reels service is available (proxy server running)
 */
export async function isReelsServiceAvailable(): Promise<boolean> {
  try {
    const response = await fetch(`${getProxyBase()}/health`);
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * Format duration for display
 */
export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return mins > 0 ? `${mins}:${secs.toString().padStart(2, '0')}` : `${secs}s`;
}

/**
 * Default music track options for quick selection
 */
export const DEFAULT_REEL_DURATIONS = [
  { value: 10, label: '10 seconds' },
  { value: 15, label: '15 seconds (Recommended)' },
  { value: 30, label: '30 seconds' },
  { value: 60, label: '60 seconds' },
  { value: 90, label: '90 seconds (Max)' },
];
