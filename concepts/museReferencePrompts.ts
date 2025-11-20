/**
 * Muse Reference Prompts - Based on User-Provided Reference Images
 *
 * These prompts are crafted to match specific reference aesthetics
 * provided by the user for the Indian Hourglass Muse
 */

import { IMAGEN_ART_DIRECTOR_DECLARATION } from '../services/imagenOptimizer';

/**
 * Reference Image #1: Ring Light Bedroom Mirror Selfie
 * Black halter top, distressed denim shorts, ring light, golden hour window light
 */
export const MUSE_REF_RINGLIGHT_BEDROOM = `${IMAGEN_ART_DIRECTOR_DECLARATION}

REFERENCE-MATCHED CONCEPT: Instagram Ring Light Bedroom Mirror Selfie

Indian Instagram influencer model taking mirror selfie in trendy bedroom. The Hourglass Muse.

PHYSICAL SPECIFICATIONS:
- Height: 5'7" (170cm)
- Measurements: 36-26-38 (classic hourglass figure)
- Age: 23-26
- Skin: Golden brown with warm undertones, healthy natural glow
- Hair: Long dark brown/black hair with subtle highlights, styled in loose natural waves
- Eyes: Deep brown with expressive gaze
- Face: Heart-shaped with contoured features, defined cheekbones
- Body: Athletic-toned hourglass figure, defined waist, curved hips, toned legs

DISTINGUISHING FEATURES:
- Small decorative tattoo visible on ribcage/side
- Infinity symbol or script tattoo on wrist
- Delicate belly chain/waist jewelry
- Layered gold necklaces
- Multiple rings on fingers
- Stacked bracelets on wrists
- Natural beauty mark

POSE & EXPRESSION:
Standing in front of full-length mirror taking selfie with phone held at chest/shoulder height. Body angled to show curves - one hip pushed out emphasizing hourglass silhouette. Free hand on hip or running through hair. Confident, sultry expression with direct eye contact through phone camera. Natural, relaxed posture showing comfort and confidence. Slight arch in back emphasizing curves.

WARDROBE:
- Black halter-style bikini top or crop top with tie detail at center, showing décolletage and toned midriff
- High-waisted distressed denim shorts with frayed hem, fitted to emphasize curves and show long legs
- Barefoot on bedroom floor
- Gold jewelry: layered necklaces, belly chain, bracelets, rings
- Accessories creating influencer aesthetic

ENVIRONMENT - TRENDY BEDROOM:
Modern minimalist bedroom with influencer aesthetic. Large full-length mirror (showing full reflection). Ring light visible in background creating circular glow. Fairy string lights on walls. Aesthetic tapestry or wall hanging. Plants (monstera or similar). Polaroid photos or prints on wall. White/cream bedding visible. Clean, organized space with Instagram-worthy decor. Window with venetian blinds creating striped light patterns.

LIGHTING - GOLDEN HOUR WITH RING LIGHT:
Primary: Warm golden hour sunlight streaming through window with venetian blinds, creating dramatic horizontal striped light patterns across body and room. Secondary: Ring light in background adding fill light and characteristic circular catchlight. Perfect Instagram lighting - warm, flattering, dimensional. Light emphasizing skin tone warmth, creating gentle shadows that sculpt body. Striped shadow pattern from blinds creating artistic depth and visual interest.

CAMERA SETTINGS:
- Perspective: Mirror selfie taken with phone (28mm equivalent)
- Framing: Full body visible in mirror reflection, vertical 9:16 or 4:5 Instagram format
- Focus: Sharp focus on model in mirror, slight depth creating sense of space
- Angle: Slightly high angle (phone at chest/shoulder level)
- Distance: Arm's length mirror selfie perspective

PHOTOGRAPHY STYLE:
Instagram influencer content photography. Natural but enhanced. Warm, golden color grading with lifted shadows and vibrant but realistic saturation. Emphasizing golden skin tones and warm atmosphere. Professional influencer quality while maintaining authentic selfie aesthetic. Not overly edited - natural skin texture preserved.

COLOR GRADING:
Warm golden tones throughout. Enhanced golden hour glow. Rich browns and golds. Lifted blacks for Instagram aesthetic. Warm white balance emphasizing cozy bedroom atmosphere. Skin tones rendered with warmth and natural glow. Vibrant but realistic color - not oversaturated.

TECHNICAL SPECIFICATIONS:
Shot quality matching iPhone 14 Pro/15 Pro in ideal conditions. 8K detail capturing skin texture, fabric details, room elements. Natural skin micro-details with golden glow - no artificial smoothing. Realistic fabric physics on denim and halter top. Authentic material properties - fabric texture, metal jewelry, skin. Professional Instagram influencer content quality.

INTIMACY LEVEL: 6/10 - Bold confident Instagram content, aspirational but relatable, celebrates curves and confidence within platform guidelines.

MOOD & ATMOSPHERE:
Confident, empowered, authentic. Modern Indian influencer aesthetic. Aspirational lifestyle content. Golden hour cozy bedroom vibes. Relatable luxury. Main character energy. Instagram goals aesthetic.

CULTURAL CONTEXT:
Modern Indian woman owning her narrative and confidence. Bridging traditional beauty standards with contemporary global aesthetics. Celebrating Indian curves and beauty through modern lens. Influencer culture meets authentic self-expression.`;

/**
 * Variations on the reference concept with different intimacy levels
 */
export const MUSE_REF_VARIATIONS = {
  casual_daytime: {
    intimacyLevel: 4,
    wardrobe: 'Oversized white t-shirt and denim shorts, casual daytime look',
    lighting: 'Natural morning light through window, soft and fresh'
  },

  evening_glam: {
    intimacyLevel: 7,
    wardrobe: 'Black lace bralette with high-waisted denim, evening aesthetic',
    lighting: 'Golden hour with ring light, warm intimate evening glow'
  },

  artistic_minimal: {
    intimacyLevel: 8,
    wardrobe: 'Minimal black triangle top and shorts, artistic minimalism',
    lighting: 'Dramatic window blind shadows, high contrast artistic lighting'
  },

  luxury_lounge: {
    intimacyLevel: 7,
    wardrobe: 'Silk crop top and matching shorts set, luxury loungewear',
    lighting: 'Soft golden hour with fairy lights, dreamy luxury aesthetic'
  }
};

/**
 * Location-specific variations using same model and aesthetic
 */
export const MUSE_REF_LOCATION_VARIATIONS = {
  luxury_apartment_balcony: {
    environment: 'High-rise apartment balcony at golden hour, city skyline in background',
    lighting: 'Natural golden hour from setting sun, city lights beginning to glow',
    mood: 'Urban luxury, metropolitan goddess'
  },

  minimalist_hostel: {
    environment: 'Clean white minimalist hostel room with yoga mat and backpack',
    lighting: 'Soft window light, spiritual simplicity',
    mood: 'Bohemian traveler, authentic wanderer'
  },

  pool_club_vip: {
    environment: 'Rooftop pool club VIP area with infinity pool and city lights',
    lighting: 'Neon pool lights mixing with golden hour, glamorous nightlife',
    mood: 'Exclusive luxury, party glamour'
  },

  art_gallery_after_hours: {
    environment: 'Contemporary art gallery with white walls and spot-lit artwork',
    lighting: 'Gallery spotlights creating dramatic pools of light',
    mood: 'Artistic sophistication, cultural maven'
  }
};

// Export for use in imagen prompt library
export const REFERENCE_BASED_PROMPTS = {
  MUSE_REF_RINGLIGHT_BEDROOM,
  MUSE_REF_VARIATIONS,
  MUSE_REF_LOCATION_VARIATIONS
};