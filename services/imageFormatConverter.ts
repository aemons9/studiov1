/**
 * Client-side image format conversion
 * Converts JPEG base64 to PNG base64 using Canvas API
 */

export interface ConversionOptions {
  quality?: number; // For PNG compression (0-1), not used for lossless
  maxWidth?: number; // Optional resize
  maxHeight?: number; // Optional resize
}

/**
 * Convert base64 image to PNG format client-side
 * Works with both JPEG and PNG inputs (idempotent for PNG)
 */
export async function convertToPNG(
  base64Image: string,
  options: ConversionOptions = {}
): Promise<string> {
  return new Promise((resolve, reject) => {
    // Create image element
    const img = new Image();

    // Determine input format
    const isDataUrl = base64Image.startsWith('data:');
    const inputFormat = isDataUrl
      ? base64Image.substring(5, base64Image.indexOf(';'))
      : 'image/jpeg'; // Assume JPEG if raw base64

    // If already PNG and no resize needed, return as-is
    if (inputFormat === 'image/png' && !options.maxWidth && !options.maxHeight) {
      console.log('✅ Image already PNG format, no conversion needed');
      resolve(base64Image);
      return;
    }

    console.log(`🔄 Converting ${inputFormat} to PNG...`);

    img.onload = () => {
      try {
        // Calculate dimensions (with optional resize)
        let width = img.width;
        let height = img.height;

        if (options.maxWidth || options.maxHeight) {
          const scale = Math.min(
            options.maxWidth ? options.maxWidth / width : 1,
            options.maxHeight ? options.maxHeight / height : 1,
            1 // Don't upscale
          );
          width = Math.floor(width * scale);
          height = Math.floor(height * scale);
        }

        // Create canvas
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }

        // Draw image to canvas
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to PNG
        const pngDataUrl = canvas.toDataURL('image/png');

        console.log(`✅ Converted to PNG:`, {
          originalFormat: inputFormat,
          originalSize: base64Image.length,
          pngSize: pngDataUrl.length,
          dimensions: `${width}x${height}`
        });

        resolve(pngDataUrl);
      } catch (error) {
        reject(error);
      }
    };

    img.onerror = () => {
      reject(new Error('Failed to load image for conversion'));
    };

    // Load image
    if (isDataUrl) {
      img.src = base64Image;
    } else {
      // Add data URL prefix if missing
      img.src = `data:image/jpeg;base64,${base64Image}`;
    }
  });
}

/**
 * Convert multiple base64 images to PNG
 */
export async function convertMultipleToPNG(
  base64Images: string[],
  options: ConversionOptions = {}
): Promise<string[]> {
  console.log(`🔄 Converting ${base64Images.length} image(s) to PNG...`);

  const converted = await Promise.all(
    base64Images.map(img => convertToPNG(img, options))
  );

  console.log(`✅ All ${converted.length} images converted to PNG`);
  return converted;
}

/**
 * Detect image format from base64 string
 */
export function detectImageFormat(base64Image: string): 'png' | 'jpeg' | 'unknown' {
  if (base64Image.startsWith('data:image/png')) return 'png';
  if (base64Image.startsWith('data:image/jpeg') || base64Image.startsWith('data:image/jpg')) return 'jpeg';

  // Check magic bytes for raw base64
  const bytes = atob(base64Image.substring(0, 20));
  if (bytes.charCodeAt(0) === 0x89 && bytes.charCodeAt(1) === 0x50) return 'png'; // PNG: 89 50 4E 47
  if (bytes.charCodeAt(0) === 0xFF && bytes.charCodeAt(1) === 0xD8) return 'jpeg'; // JPEG: FF D8

  return 'unknown';
}

/**
 * Get file extension for image format
 */
export function getExtensionForFormat(format: string): string {
  if (format.includes('png')) return 'png';
  if (format.includes('jpeg') || format.includes('jpg')) return 'jpg';
  return 'png'; // Default to PNG
}
