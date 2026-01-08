/**
 * ASPECT RATIO CONVERTER
 *
 * Converts between Flux and Imagen aspect ratio formats
 */

export type FluxAspectRatio = '1:1' | '4:5' | '9:16' | '16:9' | '3:4' | '4:3';
export type ImagenAspectRatio = '1:1' | '9:16' | '16:9' | '3:4' | '4:3';

/**
 * Aspect ratio mappings between Flux and Imagen
 * Flux supports 4:5, but Imagen doesn't - we map it to 3:4 (closest portrait ratio)
 */
const FLUX_TO_IMAGEN_RATIO_MAP: Record<string, ImagenAspectRatio> = {
  '1:1': '1:1',
  '4:5': '3:4',   // Flux 4:5 → Imagen 3:4 (closest portrait)
  '9:16': '9:16',
  '16:9': '16:9',
  '3:4': '3:4',
  '4:3': '4:3'
};

/**
 * Convert Flux aspect ratio to Imagen-compatible format
 */
export function convertToImagenAspectRatio(fluxRatio: string): ImagenAspectRatio {
  const imagenRatio = FLUX_TO_IMAGEN_RATIO_MAP[fluxRatio];

  if (!imagenRatio) {
    console.warn(`Unknown aspect ratio: ${fluxRatio}, defaulting to 3:4`);
    return '3:4';
  }

  if (fluxRatio === '4:5') {
    console.log('🔄 Converting Flux aspect ratio 4:5 → Imagen 3:4 (closest portrait ratio)');
  }

  return imagenRatio;
}

/**
 * Check if aspect ratio is valid for Imagen
 */
export function isValidImagenAspectRatio(ratio: string): ratio is ImagenAspectRatio {
  const validRatios: ImagenAspectRatio[] = ['1:1', '9:16', '16:9', '3:4', '4:3'];
  return validRatios.includes(ratio as ImagenAspectRatio);
}

/**
 * Check if aspect ratio is valid for Flux
 */
export function isValidFluxAspectRatio(ratio: string): ratio is FluxAspectRatio {
  const validRatios: FluxAspectRatio[] = ['1:1', '4:5', '9:16', '16:9', '3:4', '4:3'];
  return validRatios.includes(ratio as FluxAspectRatio);
}

/**
 * Get recommended aspect ratio for provider
 */
export function getRecommendedAspectRatio(
  provider: 'vertex-ai' | 'replicate-flux',
  preferredRatio?: string
): string {
  if (provider === 'vertex-ai') {
    // For Imagen, convert if needed
    if (preferredRatio) {
      return convertToImagenAspectRatio(preferredRatio);
    }
    return '3:4'; // Default portrait for Imagen
  } else {
    // For Flux, use as-is or default
    return preferredRatio || '4:5'; // Default portrait for Flux
  }
}
