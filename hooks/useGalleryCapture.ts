/**
 * USE GALLERY CAPTURE HOOK
 *
 * React hook for automatically capturing generated images
 * and saving them to the persistent gallery.
 *
 * Usage:
 * const { captureImage, captureImages } = useGalleryCapture('platinum');
 * // After generating images:
 * captureImages(generatedImages);
 */

import { useCallback, useRef, useEffect } from 'react';
import type { GeneratedImageData } from '../types';
import {
  saveToGallery,
  saveMultipleToGallery,
  type GalleryImage,
  type SourceMode,
} from '../services/instagram/galleryService';

interface CaptureOptions {
  prompt?: string;
  conceptId?: string;
  conceptName?: string;
  intimacyLevel?: number;
  provider?: string;
  tags?: string[];
}

interface UseGalleryCaptureReturn {
  captureImage: (imageData: GeneratedImageData, options?: CaptureOptions) => Promise<GalleryImage | null>;
  captureImages: (images: GeneratedImageData[], options?: CaptureOptions) => Promise<GalleryImage[]>;
  captureFromUrl: (url: string, options?: CaptureOptions) => Promise<GalleryImage | null>;
}

/**
 * Hook for capturing generated images to the gallery
 *
 * @param sourceMode - The mode where images are being generated
 * @returns Functions to capture images
 */
export function useGalleryCapture(sourceMode: SourceMode): UseGalleryCaptureReturn {
  const sourceModeRef = useRef(sourceMode);

  // Keep sourceMode ref updated
  useEffect(() => {
    sourceModeRef.current = sourceMode;
  }, [sourceMode]);

  /**
   * Capture a single image to the gallery
   */
  const captureImage = useCallback(async (
    imageData: GeneratedImageData,
    options?: CaptureOptions
  ): Promise<GalleryImage | null> => {
    try {
      const galleryImage = await saveToGallery({
        url: imageData.url,
        prompt: options?.prompt,
        sourceMode: sourceModeRef.current,
        metadata: {
          modelId: imageData.settings?.modelId,
          seed: imageData.settings?.seed,
          aspectRatio: imageData.settings?.aspectRatio,
          intimacyLevel: options?.intimacyLevel,
          provider: options?.provider,
          conceptId: options?.conceptId,
          conceptName: options?.conceptName,
          tags: options?.tags,
        },
      });

      console.log(`📸 Captured image to gallery from ${sourceModeRef.current} mode:`, galleryImage.id);
      return galleryImage;
    } catch (error) {
      console.error('❌ Failed to capture image to gallery:', error);
      return null;
    }
  }, []);

  /**
   * Capture multiple images to the gallery
   */
  const captureImages = useCallback(async (
    images: GeneratedImageData[],
    options?: CaptureOptions
  ): Promise<GalleryImage[]> => {
    if (!images || images.length === 0) return [];

    try {
      const imagesToSave = images.map(img => ({
        url: img.url,
        prompt: options?.prompt,
        sourceMode: sourceModeRef.current,
        metadata: {
          modelId: img.settings?.modelId,
          seed: img.settings?.seed,
          aspectRatio: img.settings?.aspectRatio,
          intimacyLevel: options?.intimacyLevel,
          provider: options?.provider,
          conceptId: options?.conceptId,
          conceptName: options?.conceptName,
          tags: options?.tags,
        },
      }));

      const saved = await saveMultipleToGallery(imagesToSave);
      console.log(`📸 Captured ${saved.length} images to gallery from ${sourceModeRef.current} mode`);
      return saved;
    } catch (error) {
      console.error('❌ Failed to capture images to gallery:', error);
      return [];
    }
  }, []);

  /**
   * Capture an image from a URL (fetch and save)
   */
  const captureFromUrl = useCallback(async (
    url: string,
    options?: CaptureOptions
  ): Promise<GalleryImage | null> => {
    try {
      const galleryImage = await saveToGallery({
        url,
        prompt: options?.prompt,
        sourceMode: sourceModeRef.current,
        metadata: {
          intimacyLevel: options?.intimacyLevel,
          provider: options?.provider,
          conceptId: options?.conceptId,
          conceptName: options?.conceptName,
          tags: options?.tags,
        },
      });

      console.log(`📸 Captured URL image to gallery from ${sourceModeRef.current} mode:`, galleryImage.id);
      return galleryImage;
    } catch (error) {
      console.error('❌ Failed to capture URL image to gallery:', error);
      return null;
    }
  }, []);

  return {
    captureImage,
    captureImages,
    captureFromUrl,
  };
}

/**
 * Standalone function to capture images without hook
 * Useful for one-off captures in class components or outside React
 */
export async function captureImagesToGallery(
  images: GeneratedImageData[],
  sourceMode: SourceMode,
  options?: CaptureOptions
): Promise<GalleryImage[]> {
  if (!images || images.length === 0) return [];

  try {
    const imagesToSave = images.map(img => ({
      url: img.url,
      prompt: options?.prompt,
      sourceMode,
      metadata: {
        modelId: img.settings?.modelId,
        seed: img.settings?.seed,
        aspectRatio: img.settings?.aspectRatio,
        intimacyLevel: options?.intimacyLevel,
        provider: options?.provider,
        conceptId: options?.conceptId,
        conceptName: options?.conceptName,
        tags: options?.tags,
      },
    }));

    const saved = await saveMultipleToGallery(imagesToSave);
    console.log(`📸 Captured ${saved.length} images to gallery from ${sourceMode} mode`);
    return saved;
  } catch (error) {
    console.error('❌ Failed to capture images to gallery:', error);
    return [];
  }
}

export default useGalleryCapture;
