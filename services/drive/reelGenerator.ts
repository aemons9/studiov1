/**
 * REEL VIDEO GENERATOR
 *
 * Creates Instagram Reels from multiple images using FFmpeg.
 * Applies transitions, motion effects (pan/zoom), and optional audio.
 *
 * Features:
 * - Multi-image slideshow with transitions
 * - Ken Burns effect (subtle pan/zoom)
 * - Crossfade transitions
 * - Optional background music
 * - Text overlay support
 */

import { spawn } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import ffmpegPath from '@ffmpeg-installer/ffmpeg';

import { DriveImage, downloadImage } from './driveIngestionService';

// ============================================================================
// TYPES
// ============================================================================

export interface ReelConfig {
  images: DriveImage[];
  outputPath?: string;
  duration?: number;           // Total duration in seconds
  imageDuration?: number;      // Duration per image in seconds
  transition?: TransitionType;
  transitionDuration?: number; // Transition duration in seconds
  effect?: MotionEffect;
  musicPath?: string;          // Path to background music
  musicVolume?: number;        // Volume 0-1
  fadeIn?: number;             // Audio fade in seconds
  fadeOut?: number;            // Audio fade out seconds
  resolution?: Resolution;
  fps?: number;
  textOverlay?: TextOverlay;
}

export type TransitionType = 'fade' | 'crossfade' | 'dissolve' | 'wipe' | 'none';
export type MotionEffect = 'ken_burns' | 'zoom_in' | 'zoom_out' | 'pan_left' | 'pan_right' | 'none';
export type Resolution = '1080x1920' | '1080x1350' | '1080x1080' | '720x1280';

export interface TextOverlay {
  text: string;
  position: 'top' | 'center' | 'bottom';
  fontSize?: number;
  fontColor?: string;
  backgroundColor?: string;
  startTime?: number;
  duration?: number;
}

export interface ReelResult {
  success: boolean;
  outputPath?: string;
  duration?: number;
  size?: number;
  error?: string;
}

// ============================================================================
// CONFIGURATION
// ============================================================================

const TEMP_DIR = path.join(process.cwd(), 'temp', 'reels');
const FFMPEG_PATH = ffmpegPath.path;

// Default settings
const DEFAULT_CONFIG: Partial<ReelConfig> = {
  imageDuration: 3,
  transition: 'crossfade',
  transitionDuration: 0.5,
  effect: 'ken_burns',
  resolution: '1080x1920', // Instagram Reel format
  fps: 30,
  musicVolume: 0.5,
  fadeIn: 1,
  fadeOut: 2,
};

// ============================================================================
// UTILITIES
// ============================================================================

/**
 * Ensure temp directory exists
 */
function ensureTempDir(): void {
  if (!fs.existsSync(TEMP_DIR)) {
    fs.mkdirSync(TEMP_DIR, { recursive: true });
  }
}

/**
 * Generate unique filename
 */
function generateFilename(): string {
  return `reel-${Date.now()}-${Math.random().toString(36).substring(2, 6)}.mp4`;
}

/**
 * Run FFmpeg command
 */
function runFFmpeg(args: string[]): Promise<void> {
  return new Promise((resolve, reject) => {
    console.log(`🎬 Running FFmpeg...`);

    const process = spawn(FFMPEG_PATH, args, {
      stdio: ['pipe', 'pipe', 'pipe'],
    });

    let stderr = '';

    process.stderr?.on('data', (data) => {
      stderr += data.toString();
      // Log progress
      const progressMatch = data.toString().match(/time=(\d{2}:\d{2}:\d{2}.\d{2})/);
      if (progressMatch) {
        console.log(`   Progress: ${progressMatch[1]}`);
      }
    });

    process.on('error', (error) => {
      reject(new Error(`FFmpeg error: ${error.message}`));
    });

    process.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`FFmpeg exited with code ${code}: ${stderr.slice(-500)}`));
      }
    });
  });
}

// ============================================================================
// VIDEO GENERATION
// ============================================================================

/**
 * Build filter complex for Ken Burns effect
 */
function buildKenBurnsFilter(
  index: number,
  duration: number,
  resolution: string
): string {
  const [width, height] = resolution.split('x').map(Number);

  // Random subtle zoom/pan direction
  const effects = [
    // Zoom in from center
    `scale=8000:-1,zoompan=z='min(zoom+0.0015,1.5)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=${duration * 30}:s=${width}x${height}:fps=30`,
    // Zoom out from center
    `scale=8000:-1,zoompan=z='if(lte(zoom,1.0),1.5,max(1.001,zoom-0.0015))':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=${duration * 30}:s=${width}x${height}:fps=30`,
    // Pan right
    `scale=8000:-1,zoompan=z='1.3':x='iw/2-(iw/zoom/2)+((iw-iw/zoom)/2*(t/${duration}))':y='ih/2-(ih/zoom/2)':d=${duration * 30}:s=${width}x${height}:fps=30`,
    // Pan left
    `scale=8000:-1,zoompan=z='1.3':x='iw/2-(iw/zoom/2)-((iw-iw/zoom)/2*(t/${duration}))':y='ih/2-(ih/zoom/2)':d=${duration * 30}:s=${width}x${height}:fps=30`,
  ];

  return effects[index % effects.length];
}

/**
 * Create reel from multiple images
 */
export async function createMultiImageReel(config: ReelConfig): Promise<ReelResult> {
  ensureTempDir();

  const settings = { ...DEFAULT_CONFIG, ...config };
  const {
    images,
    imageDuration,
    transition,
    transitionDuration,
    effect,
    musicPath,
    musicVolume,
    fadeIn,
    fadeOut,
    resolution,
    fps,
  } = settings;

  if (images.length === 0) {
    return { success: false, error: 'No images provided' };
  }

  const outputPath = config.outputPath || path.join(TEMP_DIR, generateFilename());
  const totalDuration = config.duration || (images.length * imageDuration!);

  console.log(`🎬 Creating Reel from ${images.length} images`);
  console.log(`   Duration: ${totalDuration}s, Resolution: ${resolution}`);

  try {
    // Download all images
    console.log('📥 Downloading images...');
    const imagePaths: string[] = [];
    for (const image of images) {
      const localPath = await downloadImage(image);
      imagePaths.push(localPath);
    }

    // Build FFmpeg command
    const args: string[] = [];

    // Input images
    for (const imagePath of imagePaths) {
      args.push('-loop', '1', '-t', String(imageDuration), '-i', imagePath);
    }

    // Input audio if provided
    if (musicPath && fs.existsSync(musicPath)) {
      args.push('-i', musicPath);
    }

    // Build filter complex
    const [width, height] = resolution!.split('x').map(Number);
    const filterParts: string[] = [];

    // Process each image with effects
    for (let i = 0; i < imagePaths.length; i++) {
      if (effect === 'ken_burns') {
        filterParts.push(`[${i}:v]${buildKenBurnsFilter(i, imageDuration!, resolution!)}[v${i}]`);
      } else {
        filterParts.push(`[${i}:v]scale=${width}:${height}:force_original_aspect_ratio=decrease,pad=${width}:${height}:(ow-iw)/2:(oh-ih)/2,setsar=1[v${i}]`);
      }
    }

    // Concatenate with transitions
    let concatInput = '';
    for (let i = 0; i < imagePaths.length; i++) {
      if (i > 0 && transition === 'crossfade') {
        // Apply crossfade between clips
        const prev = i === 1 ? 'v0' : `xf${i - 1}`;
        filterParts.push(`[${prev}][v${i}]xfade=transition=fade:duration=${transitionDuration}:offset=${i * imageDuration! - transitionDuration! * i}[xf${i}]`);
      }
      concatInput += `[v${i}]`;
    }

    // Final concat if no transitions
    if (transition === 'none' || transition === 'fade') {
      filterParts.push(`${concatInput}concat=n=${imagePaths.length}:v=1:a=0[vout]`);
    } else {
      // Use last xfade output
      filterParts.push(`[xf${imagePaths.length - 1}]null[vout]`);
    }

    // Add audio processing if music
    let audioFilter = '';
    if (musicPath && fs.existsSync(musicPath)) {
      const audioIndex = imagePaths.length;
      audioFilter = `[${audioIndex}:a]afade=t=in:st=0:d=${fadeIn},afade=t=out:st=${totalDuration - fadeOut!}:d=${fadeOut},volume=${musicVolume}[aout]`;
      filterParts.push(audioFilter);
    }

    // Build complete filter
    const filterComplex = filterParts.join(';');

    args.push('-filter_complex', filterComplex);

    // Map outputs
    args.push('-map', '[vout]');
    if (musicPath && fs.existsSync(musicPath)) {
      args.push('-map', '[aout]');
    }

    // Output settings
    args.push(
      '-c:v', 'libx264',
      '-preset', 'medium',
      '-crf', '23',
      '-pix_fmt', 'yuv420p',
      '-r', String(fps),
      '-t', String(totalDuration),
    );

    if (musicPath && fs.existsSync(musicPath)) {
      args.push('-c:a', 'aac', '-b:a', '192k');
    }

    args.push('-y', outputPath);

    // Run FFmpeg
    await runFFmpeg(args);

    // Get file stats
    const stats = fs.statSync(outputPath);

    console.log(`✅ Reel created: ${outputPath}`);
    console.log(`   Size: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);

    return {
      success: true,
      outputPath,
      duration: totalDuration,
      size: stats.size,
    };
  } catch (error) {
    console.error('❌ Reel creation failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Create simple slideshow reel (simpler, more reliable)
 */
export async function createSimpleReel(config: ReelConfig): Promise<ReelResult> {
  ensureTempDir();

  const settings = { ...DEFAULT_CONFIG, ...config };
  const { images, resolution, musicPath, musicVolume, fadeIn, fadeOut, fps } = settings;

  if (images.length === 0) {
    return { success: false, error: 'No images provided' };
  }

  const outputPath = config.outputPath || path.join(TEMP_DIR, generateFilename());
  const imageDuration = config.imageDuration || 3;
  const totalDuration = config.duration || (images.length * imageDuration);

  console.log(`🎬 Creating simple Reel from ${images.length} images`);

  try {
    // Download all images
    const imagePaths: string[] = [];
    for (const image of images) {
      const localPath = await downloadImage(image);
      imagePaths.push(localPath);
    }

    // Create concat file
    const concatFile = path.join(TEMP_DIR, `concat-${Date.now()}.txt`);
    const concatContent = imagePaths.map(p =>
      `file '${p}'\nduration ${imageDuration}`
    ).join('\n');
    fs.writeFileSync(concatFile, concatContent);

    // Build FFmpeg args
    const [width, height] = resolution!.split('x').map(Number);
    const args: string[] = [
      '-f', 'concat',
      '-safe', '0',
      '-i', concatFile,
    ];

    if (musicPath && fs.existsSync(musicPath)) {
      args.push('-i', musicPath);
    }

    // Video filter for scaling
    args.push(
      '-vf', `scale=${width}:${height}:force_original_aspect_ratio=decrease,pad=${width}:${height}:(ow-iw)/2:(oh-ih)/2,setsar=1`,
    );

    // Audio filter if music
    if (musicPath && fs.existsSync(musicPath)) {
      args.push(
        '-af', `afade=t=in:st=0:d=${fadeIn},afade=t=out:st=${totalDuration - fadeOut!}:d=${fadeOut},volume=${musicVolume}`,
        '-c:a', 'aac',
        '-b:a', '192k',
        '-shortest',
      );
    }

    // Output settings
    args.push(
      '-c:v', 'libx264',
      '-preset', 'medium',
      '-crf', '23',
      '-pix_fmt', 'yuv420p',
      '-r', String(fps),
      '-t', String(totalDuration),
      '-y',
      outputPath,
    );

    await runFFmpeg(args);

    // Cleanup
    fs.unlinkSync(concatFile);

    const stats = fs.statSync(outputPath);

    console.log(`✅ Simple Reel created: ${outputPath}`);

    return {
      success: true,
      outputPath,
      duration: totalDuration,
      size: stats.size,
    };
  } catch (error) {
    console.error('❌ Simple Reel creation failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// ============================================================================
// VIDEO HELPERS
// ============================================================================

/**
 * Convert video to base64 data URL
 */
export function videoToBase64(videoPath: string): string {
  const buffer = fs.readFileSync(videoPath);
  return `data:video/mp4;base64,${buffer.toString('base64')}`;
}

/**
 * Get video duration using FFprobe (if available)
 */
export async function getVideoDuration(videoPath: string): Promise<number | null> {
  try {
    const ffprobePath = FFMPEG_PATH.replace('ffmpeg', 'ffprobe');
    if (!fs.existsSync(ffprobePath)) return null;

    return new Promise((resolve) => {
      const process = spawn(ffprobePath, [
        '-v', 'error',
        '-show_entries', 'format=duration',
        '-of', 'default=noprint_wrappers=1:nokey=1',
        videoPath,
      ]);

      let output = '';
      process.stdout?.on('data', (data) => {
        output += data.toString();
      });

      process.on('close', () => {
        const duration = parseFloat(output.trim());
        resolve(isNaN(duration) ? null : duration);
      });
    });
  } catch {
    return null;
  }
}

/**
 * Cleanup old reel files
 */
export function cleanupReels(maxAgeHours: number = 24): number {
  if (!fs.existsSync(TEMP_DIR)) return 0;

  const maxAge = maxAgeHours * 60 * 60 * 1000;
  const now = Date.now();
  let cleaned = 0;

  const files = fs.readdirSync(TEMP_DIR);
  for (const file of files) {
    const filePath = path.join(TEMP_DIR, file);
    const stats = fs.statSync(filePath);

    if (now - stats.mtimeMs > maxAge) {
      fs.unlinkSync(filePath);
      cleaned++;
    }
  }

  if (cleaned > 0) {
    console.log(`🧹 Cleaned ${cleaned} old reel files`);
  }

  return cleaned;
}
