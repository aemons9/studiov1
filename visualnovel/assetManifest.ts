/**
 * Visual Novel Asset Manifest - Chapter 1: The Golden Hour Connection
 * Complete list of all required assets before the game can be playable
 */

export interface AssetRequirement {
  id: string;
  type: 'character_sprite' | 'background' | 'cg_image' | 'cutscene_video' | 'ui_element';
  name: string;
  description: string;
  prompt: string; // AI generation prompt
  specifications: {
    width: number;
    height: number;
    format: string;
    aspectRatio?: string;
  };
  priority: 'critical' | 'high' | 'medium' | 'low';
  sceneUsage: string[]; // Which scenes use this asset
  generated: boolean;
  filePath?: string;
}

// ============================================================================
// CHARACTER SPRITES - Zara (Instagram Model)
// ============================================================================

export const CHARACTER_SPRITES: AssetRequirement[] = [
  {
    id: 'zara_neutral_full',
    type: 'character_sprite',
    name: 'Zara - Neutral (Full Body)',
    description: 'Standing pose, neutral expression, gallery opening outfit',
    prompt: `Full body character sprite of beautiful Indian model Zara (5'8", hourglass figure 36-26-38"). Standing pose, neutral friendly expression. Wearing elegant white linen dress, simple gold jewelry. Perfect for visual novel game - transparent background, PNG format. Professional lighting, soft smile, direct gaze. High-quality character art in visual novel style, crisp details, perfect for layering over backgrounds.`,
    specifications: {
      width: 1024,
      height: 2048,
      format: 'PNG',
      aspectRatio: '1:2'
    },
    priority: 'critical',
    sceneUsage: ['intro', 'photographer_path', 'stylist_path', 'charm_path'],
    generated: false
  },
  {
    id: 'zara_smile_full',
    type: 'character_sprite',
    name: 'Zara - Smile (Full Body)',
    description: 'Standing pose, warm smile, gallery outfit',
    prompt: `Full body character sprite of beautiful Indian model Zara (5'8", hourglass figure 36-26-38"). Standing pose, warm genuine smile. Wearing elegant white linen dress, simple gold jewelry. Perfect for visual novel game - transparent background, PNG format. Professional lighting, happy expression, welcoming body language. High-quality character art in visual novel style.`,
    specifications: {
      width: 1024,
      height: 2048,
      format: 'PNG',
      aspectRatio: '1:2'
    },
    priority: 'critical',
    sceneUsage: ['intro', 'photographer_path', 'stylist_path'],
    generated: false
  },
  {
    id: 'zara_flirty_full',
    type: 'character_sprite',
    name: 'Zara - Flirty (Full Body)',
    description: 'Standing pose, playful flirty expression',
    prompt: `Full body character sprite of beautiful Indian model Zara (5'8", hourglass figure 36-26-38"). Standing pose, playful flirty expression with slight smirk. Wearing elegant white linen dress. Perfect for visual novel game - transparent background, PNG format. Professional lighting, confident sultry gaze, hand on hip. High-quality character art in visual novel style.`,
    specifications: {
      width: 1024,
      height: 2048,
      format: 'PNG',
      aspectRatio: '1:2'
    },
    priority: 'high',
    sceneUsage: ['intro', 'boudoir_artistic'],
    generated: false
  },
  {
    id: 'zara_shy_full',
    type: 'character_sprite',
    name: 'Zara - Shy (Full Body)',
    description: 'Standing pose, shy/blushing expression',
    prompt: `Full body character sprite of beautiful Indian model Zara (5'8", hourglass figure 36-26-38"). Standing pose, shy blushing expression, slightly looking away. Wearing elegant white linen dress. Perfect for visual novel game - transparent background, PNG format. Professional lighting, vulnerable sweet expression, hands clasped. High-quality character art in visual novel style.`,
    specifications: {
      width: 1024,
      height: 2048,
      format: 'PNG',
      aspectRatio: '1:2'
    },
    priority: 'high',
    sceneUsage: ['photographer_studio', 'boudoir_artistic'],
    generated: false
  },
  {
    id: 'zara_studio_outfit',
    type: 'character_sprite',
    name: 'Zara - Studio Outfit (Full Body)',
    description: 'Simple white linen dress for photoshoot',
    prompt: `Full body character sprite of beautiful Indian model Zara (5'8", hourglass figure 36-26-38"). Standing pose, natural expression. Wearing simple white linen blouse and flowing skirt for photoshoot. Perfect for visual novel game - transparent background, PNG format. Natural soft lighting, artistic photoshoot outfit. High-quality character art in visual novel style.`,
    specifications: {
      width: 1024,
      height: 2048,
      format: 'PNG',
      aspectRatio: '1:2'
    },
    priority: 'high',
    sceneUsage: ['photographer_studio'],
    generated: false
  },
  {
    id: 'zara_boudoir_outfit',
    type: 'character_sprite',
    name: 'Zara - Boudoir Outfit (Full Body)',
    description: 'Elegant minimal black lace lingerie',
    prompt: `Full body character sprite of beautiful Indian model Zara (5'8", hourglass figure 36-26-38"). Standing pose, confident sensual expression. Wearing elegant minimal black lace lingerie, tasteful and artistic. Perfect for visual novel game - transparent background, PNG format. Soft bedroom lighting, empowered confident pose. High-quality character art in visual novel style, museum-quality aesthetic.`,
    specifications: {
      width: 1024,
      height: 2048,
      format: 'PNG',
      aspectRatio: '1:2'
    },
    priority: 'critical',
    sceneUsage: ['boudoir_artistic'],
    generated: false
  }
];

// ============================================================================
// BACKGROUND SCENES
// ============================================================================

export const BACKGROUND_SCENES: AssetRequirement[] = [
  {
    id: 'bg_art_gallery',
    type: 'background',
    name: 'Art Gallery Opening',
    description: 'Upscale modern art gallery during golden hour',
    prompt: `Cinematic background for visual novel: Upscale modern art gallery interior during golden hour. Large windows with warm sunlight streaming in, white walls with contemporary art pieces, polished concrete floors. Elegant crowd mingling in background (blurred). Professional architectural photography, 16:9 widescreen format. No people in foreground. Perfect for layering character sprites. High quality, atmospheric lighting, bokeh background.`,
    specifications: {
      width: 1920,
      height: 1080,
      format: 'JPG',
      aspectRatio: '16:9'
    },
    priority: 'critical',
    sceneUsage: ['intro'],
    generated: false
  },
  {
    id: 'bg_photography_studio',
    type: 'background',
    name: 'Photography Studio',
    description: 'Minimalist photography studio with north-facing window',
    prompt: `Cinematic background for visual novel: Minimalist photography studio interior. Large north-facing window with soft natural light, white walls, hardwood floors. Photography equipment visible but not dominant. Professional clean aesthetic, 16:9 widescreen format. No people. Perfect for layering character sprites. High quality, bright airy lighting, professional workspace.`,
    specifications: {
      width: 1920,
      height: 1080,
      format: 'JPG',
      aspectRatio: '16:9'
    },
    priority: 'critical',
    sceneUsage: ['photographer_studio'],
    generated: false
  },
  {
    id: 'bg_luxury_bedroom',
    type: 'background',
    name: 'Luxury Bedroom Studio',
    description: 'Upscale bedroom with luxury white bedding, dramatic lighting',
    prompt: `Cinematic background for visual novel: Luxury bedroom interior set up for artistic boudoir photography. King bed with pristine white luxury bedding, minimalist modern furniture. Dramatic chiaroscuro lighting from side window, deep shadows and highlights. Professional upscale aesthetic, 16:9 widescreen format. No people. Perfect for layering character sprites. High quality, moody atmospheric lighting, renaissance painting quality.`,
    specifications: {
      width: 1920,
      height: 1080,
      format: 'JPG',
      aspectRatio: '16:9'
    },
    priority: 'critical',
    sceneUsage: ['boudoir_artistic'],
    generated: false
  },
  {
    id: 'bg_upscale_cafe',
    type: 'background',
    name: 'Upscale Cafe',
    description: 'Modern upscale cafe interior',
    prompt: `Cinematic background for visual novel: Modern upscale cafe interior. Marble counters, pendant lighting, lush plants, floor-to-ceiling windows. Soft afternoon light, wooden tables, contemporary design. Professional architectural photography, 16:9 widescreen format. No people in foreground. Perfect for layering character sprites. High quality, warm inviting atmosphere.`,
    specifications: {
      width: 1920,
      height: 1080,
      format: 'JPG',
      aspectRatio: '16:9'
    },
    priority: 'medium',
    sceneUsage: ['coffee_date'],
    generated: false
  },
  {
    id: 'bg_fashion_showroom',
    type: 'background',
    name: 'Fashion Showroom',
    description: 'High-end fashion styling showroom',
    prompt: `Cinematic background for visual novel: High-end fashion styling showroom. Racks of luxury designer clothing, full-length mirrors, plush seating. Bright professional lighting, marble floors, gold accents. Professional interior photography, 16:9 widescreen format. No people. Perfect for layering character sprites. High quality, glamorous upscale aesthetic.`,
    specifications: {
      width: 1920,
      height: 1080,
      format: 'JPG',
      aspectRatio: '16:9'
    },
    priority: 'medium',
    sceneUsage: ['fashion_shoot'],
    generated: false
  }
];

// ============================================================================
// CG EVENT IMAGES (Special Moments)
// ============================================================================

export const CG_IMAGES: AssetRequirement[] = [
  {
    id: 'cg_first_meeting',
    type: 'cg_image',
    name: 'First Meeting - Gallery',
    description: 'Zara and player meeting at gallery, eye contact moment',
    prompt: `Cinematic CG illustration for visual novel: Beautiful Indian model Zara (5'8", hourglass figure 36-26-38", white linen dress) making eye contact with viewer at upscale art gallery opening. Golden hour light streaming through windows. Romantic atmospheric moment, soft focus background. Professional anime/visual novel CG art style, 16:9 widescreen, high quality detailed illustration. Intimate moment captured, warm colors, dreamy bokeh.`,
    specifications: {
      width: 1920,
      height: 1080,
      format: 'JPG',
      aspectRatio: '16:9'
    },
    priority: 'high',
    sceneUsage: ['intro'],
    generated: false
  },
  {
    id: 'cg_studio_photoshoot',
    type: 'cg_image',
    name: 'Studio Photoshoot Moment',
    description: 'Zara posing during photoshoot, viewer behind camera',
    prompt: `Cinematic CG illustration for visual novel: Beautiful Indian model Zara (5'8", hourglass figure 36-26-38", white linen outfit) posing naturally during photoshoot in minimalist studio. Soft window light, genuine smile, artistic moment. POV from photographer perspective. Professional anime/visual novel CG art style, 16:9 widescreen, high quality detailed illustration. Natural beauty, soft shadows, professional photography atmosphere.`,
    specifications: {
      width: 1920,
      height: 1080,
      format: 'JPG',
      aspectRatio: '16:9'
    },
    priority: 'high',
    sceneUsage: ['photographer_studio'],
    generated: false
  },
  {
    id: 'cg_viewing_photos',
    type: 'cg_image',
    name: 'Viewing Photos Together',
    description: 'Zara looking at camera screen, impressed reaction',
    prompt: `Cinematic CG illustration for visual novel: Close-up of beautiful Indian model Zara (5'8", hourglass figure) looking at camera screen showing her portrait photos, gasping in pleasant surprise. Professional studio background. Professional anime/visual novel CG art style, 16:9 widescreen, high quality detailed illustration. Emotional reaction, soft lighting, intimate moment of artistic appreciation.`,
    specifications: {
      width: 1920,
      height: 1080,
      format: 'JPG',
      aspectRatio: '16:9'
    },
    priority: 'high',
    sceneUsage: ['photographer_studio'],
    generated: false
  },
  {
    id: 'cg_boudoir_session',
    type: 'cg_image',
    name: 'Boudoir Session - Artistic',
    description: 'Zara reclining on bed during artistic boudoir shoot',
    prompt: `Cinematic CG illustration for visual novel: Beautiful Indian model Zara (5'8", hourglass figure, minimal elegant black lace lingerie) reclining artistically on luxury white bedding. Dramatic chiaroscuro lighting, renaissance painting quality. Tasteful, empowering, museum-quality aesthetic. Professional anime/visual novel CG art style, 16:9 widescreen, high quality detailed illustration. Sensual but artistic, shadows and highlights, intimate atmosphere.`,
    specifications: {
      width: 1920,
      height: 1080,
      format: 'JPG',
      aspectRatio: '16:9'
    },
    priority: 'critical',
    sceneUsage: ['boudoir_artistic'],
    generated: false
  },
  {
    id: 'cg_intimate_moment',
    type: 'cg_image',
    name: 'Intimate Connection Moment',
    description: 'Close romantic moment between Zara and player',
    prompt: `Cinematic CG illustration for visual novel: Intimate romantic moment between beautiful Indian model Zara and viewer. Close-up, soft focus, warm lighting. Eyes meeting, tension and connection. Professional anime/visual novel CG art style, 16:9 widescreen, high quality detailed illustration. Emotional intimacy, soft romantic lighting, dreamy atmosphere.`,
    specifications: {
      width: 1920,
      height: 1080,
      format: 'JPG',
      aspectRatio: '16:9'
    },
    priority: 'high',
    sceneUsage: ['boudoir_artistic'],
    generated: false
  }
];

// ============================================================================
// CUTSCENE VIDEOS (Veo Generated)
// ============================================================================

export const CUTSCENE_VIDEOS: AssetRequirement[] = [
  {
    id: 'cutscene_chapter_intro',
    type: 'cutscene_video',
    name: 'Chapter 1 Opening Cutscene',
    description: 'Camera pan through art gallery, landing on Zara',
    prompt: `Cinematic video cutscene for visual novel opening: Smooth camera movement through upscale modern art gallery during golden hour. Warm sunlight streaming through tall windows, contemporary art on walls. Camera glides past elegant crowd, focuses on beautiful Indian model in white linen dress standing by window looking at art. She turns toward camera with slight smile. Professional cinematography, 16:9, 10 seconds, smooth motion, warm color grade.`,
    specifications: {
      width: 1920,
      height: 1080,
      format: 'MP4',
      aspectRatio: '16:9'
    },
    priority: 'medium',
    sceneUsage: ['intro'],
    generated: false
  },
  {
    id: 'cutscene_photoshoot_montage',
    type: 'cutscene_video',
    name: 'Photoshoot Montage',
    description: 'Quick montage of photoshoot moments',
    prompt: `Cinematic video cutscene for visual novel: Montage of photoshoot moments. Beautiful Indian model posing in studio with natural window light, photographer shooting (camera clicks), model changing poses, laughter, artistic collaboration. Professional cinematography, 16:9, 8 seconds, energetic editing, bright natural lighting, professional fashion shoot aesthetic.`,
    specifications: {
      width: 1920,
      height: 1080,
      format: 'MP4',
      aspectRatio: '16:9'
    },
    priority: 'medium',
    sceneUsage: ['photographer_studio'],
    generated: false
  },
  {
    id: 'cutscene_boudoir_transition',
    type: 'cutscene_video',
    name: 'Boudoir Session Transition',
    description: 'Transition to intimate setting',
    prompt: `Cinematic video cutscene for visual novel: Slow fade from bright studio to dimly lit luxury bedroom. Camera reveals dramatic side lighting from window, luxury white bedding, artistic intimate atmosphere. Professional cinematography, 16:9, 6 seconds, smooth fade transition, chiaroscuro lighting, renaissance painting quality aesthetic.`,
    specifications: {
      width: 1920,
      height: 1080,
      format: 'MP4',
      aspectRatio: '16:9'
    },
    priority: 'low',
    sceneUsage: ['boudoir_artistic'],
    generated: false
  }
];

// ============================================================================
// UI ELEMENTS
// ============================================================================

export const UI_ELEMENTS: AssetRequirement[] = [
  {
    id: 'ui_dialogue_box',
    type: 'ui_element',
    name: 'Dialogue Box Background',
    description: 'Semi-transparent gradient dialogue box',
    prompt: `UI element for visual novel: Elegant semi-transparent dialogue box background. Dark gradient from black to transparent, subtle purple/pink edge glow. Modern clean design, 1920x300px. Professional UI design, suitable for overlaying text.`,
    specifications: {
      width: 1920,
      height: 300,
      format: 'PNG'
    },
    priority: 'medium',
    sceneUsage: ['all'],
    generated: false
  },
  {
    id: 'ui_choice_button',
    type: 'ui_element',
    name: 'Choice Button Template',
    description: 'Purple/pink gradient button for choices',
    prompt: `UI element for visual novel: Choice button template with purple-to-pink gradient background, subtle border glow, rounded corners. Modern elegant design, 800x100px. Professional UI design, ready for text overlay.`,
    specifications: {
      width: 800,
      height: 100,
      format: 'PNG'
    },
    priority: 'medium',
    sceneUsage: ['all'],
    generated: false
  }
];

// ============================================================================
// COMPLETE MANIFEST
// ============================================================================

export const COMPLETE_ASSET_MANIFEST: AssetRequirement[] = [
  ...CHARACTER_SPRITES,
  ...BACKGROUND_SCENES,
  ...CG_IMAGES,
  ...CUTSCENE_VIDEOS,
  ...UI_ELEMENTS
];

export function getAssetsByPriority(priority: 'critical' | 'high' | 'medium' | 'low'): AssetRequirement[] {
  return COMPLETE_ASSET_MANIFEST.filter(asset => asset.priority === priority);
}

export function getAssetsByType(type: AssetRequirement['type']): AssetRequirement[] {
  return COMPLETE_ASSET_MANIFEST.filter(asset => asset.type === type);
}

export function getAssetStats() {
  const total = COMPLETE_ASSET_MANIFEST.length;
  const generated = COMPLETE_ASSET_MANIFEST.filter(a => a.generated).length;
  const critical = COMPLETE_ASSET_MANIFEST.filter(a => a.priority === 'critical').length;
  const criticalGenerated = COMPLETE_ASSET_MANIFEST.filter(a => a.priority === 'critical' && a.generated).length;

  return {
    total,
    generated,
    remaining: total - generated,
    progress: (generated / total) * 100,
    critical,
    criticalGenerated,
    criticalRemaining: critical - criticalGenerated
  };
}
