/**
 * Visual Novel Asset Manifest - Chapter 1: The Golden Hour Connection
 * Complete list of all required assets before the game can be playable
 */

export interface AssetRequirement {
  id: string;
  type: 'character_sprite' | 'background' | 'cg_image' | 'cutscene_video' | 'ui_element' | 'bgm' | 'sfx' | 'location_map';
  name: string;
  description: string;
  prompt: string; // AI generation prompt
  specifications: {
    width?: number; // Optional for audio
    height?: number; // Optional for audio
    format: string;
    aspectRatio?: string;
    duration?: number; // For audio/video (in seconds)
    sampleRate?: number; // For audio (e.g., 44100 Hz)
  };
  priority: 'critical' | 'high' | 'medium' | 'low';
  sceneUsage: string[]; // Which scenes use this asset
  generated: boolean;
  filePath?: string;
  timeOfDay?: 'morning' | 'afternoon' | 'evening' | 'night'; // For location maps
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
    prompt: `PHOTOREALISTIC CHARACTER PORTRAIT | Professional photography | PNG with alpha transparency | 9:16 vertical

CHARACTER: Beautiful Indian woman, age 25, 5'8" height, elegant hourglass figure (36-26-38"), warm brown skin tone, long flowing black hair, captivating brown eyes, natural beauty

OUTFIT: Elegant white linen summer dress (knee-length), simple gold jewelry (small earrings, delicate bracelet), natural makeup emphasizing her features

POSE & EXPRESSION: Full body standing pose, weight on one leg (natural confident stance), neutral friendly expression, soft genuine smile, eyes looking directly at camera, welcoming body language, hands relaxed at sides

PHOTOGRAPHY: Professional studio portrait photography, shot with 85mm f/1.8 lens, shallow depth of field, full body framing from head to toe

LIGHTING: Professional 3-point studio lighting setup, soft diffused key light from front-left creating gentle shadows, subtle rim light for depth and separation, soft fill light, no harsh shadows, even flattering illumination on skin

BACKGROUND: PURE TRANSPARENT BACKGROUND (alpha channel), isolated subject only, clean professional cutout, perfect edge detection, NO background elements, NO floor, NO props

QUALITY: High-resolution professional photography, magazine quality, commercial standard, sharp focus on subject, natural skin texture, realistic lighting, cinematic color grading

TECHNICAL: PNG format with alpha transparency, 9:16 aspect ratio perfect for mobile/vertical display, ready for compositing over any background

    specifications: {
      width: 1024,
      height: 2048,
      format: 'PNG',
      aspectRatio: '9:16'
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
    specifications: {
      width: 1024,
      height: 2048,
      format: 'PNG',
      aspectRatio: '9:16'
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
    specifications: {
      width: 1024,
      height: 2048,
      format: 'PNG',
      aspectRatio: '9:16'
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
    specifications: {
      width: 1024,
      height: 2048,
      format: 'PNG',
      aspectRatio: '9:16'
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
    specifications: {
      width: 1024,
      height: 2048,
      format: 'PNG',
      aspectRatio: '9:16'
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
      aspectRatio: '9:16'
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
    prompt: `VISUAL NOVEL BACKGROUND | Cinematic photography | 16:9 widescreen | 1920x1080px

LOCATION: Upscale contemporary art gallery interior, modern minimalist architecture, high ceilings with track lighting, white walls with large contemporary art pieces, polished light grey concrete floors

TIME & LIGHTING: Golden hour (late afternoon), warm amber sunlight streaming through floor-to-ceiling windows, dramatic light rays with dust particles visible, chiaroscuro effect (high contrast light/shadow), professional color grading

COMPOSITION: Rule of thirds, clear foreground for character placement (lower third empty), gallery depth extending into background, blurred figures in far background (bokeh effect), architectural lines leading eye to center

DEPTH OF FIELD: Shallow DoF, foreground sharp, mid-ground slightly soft, background with beautiful bokeh blur, professional cinema lens aesthetic (f/2.8)

ATMOSPHERE: Sophisticated upscale ambiance, warm inviting tones, artistic cultural vibe, evening cocktail event atmosphere, museum-quality space

TECHNICAL: NO people in foreground (reserved for sprite layer), professional architectural photography, cinema-quality color grading, teal and orange complementary colors, film-like grain texture

QUALITY: Commercial visual novel standard, 4K downsampled to 1080p, professional photography, Steam-release quality, Makoto Shinkai background quality

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
// BACKGROUND MUSIC (BGM) - Lyria / Vertex AI Music Generation
// ============================================================================

export const BGM_TRACKS: AssetRequirement[] = [
  {
    id: 'bgm_main_menu',
    type: 'bgm',
    name: 'Main Menu Theme',
    description: 'Elegant, sophisticated looping track for main menu',
    prompt: `Elegant sophisticated instrumental background music for visual novel main menu. Soft piano melody with subtle strings, warm romantic atmosphere, modern upscale feel. Loopable, 2 minutes, calming but inviting. High-quality production, cinematic feel.`,
    specifications: {
      format: 'MP3',
      duration: 120, // 2 minutes
      sampleRate: 44100
    },
    priority: 'high',
    sceneUsage: ['menu', 'title_screen'],
    generated: false
  },
  {
    id: 'bgm_gallery_opening',
    type: 'bgm',
    name: 'Art Gallery Social',
    description: 'Upbeat sophisticated track for gallery opening scene',
    prompt: `Upbeat sophisticated instrumental background music for art gallery social event. Light jazz with soft percussion, elegant atmosphere, golden hour vibes. Bright but not overwhelming, conversational feel. Loopable, 3 minutes. High-quality production.`,
    specifications: {
      format: 'MP3',
      duration: 180, // 3 minutes
      sampleRate: 44100
    },
    priority: 'critical',
    sceneUsage: ['intro'],
    generated: false
  },
  {
    id: 'bgm_photoshoot_creative',
    type: 'bgm',
    name: 'Creative Photoshoot',
    description: 'Uplifting creative energy for photoshoot scenes',
    prompt: `Uplifting creative instrumental background music for artistic photoshoot scene. Indie folk with acoustic guitar, light percussion, inspiring atmosphere. Artistic, flowing, positive energy. Loopable, 4 minutes. High-quality production.`,
    specifications: {
      format: 'MP3',
      duration: 240, // 4 minutes
      sampleRate: 44100
    },
    priority: 'critical',
    sceneUsage: ['photographer_studio', 'photographer_path'],
    generated: false
  },
  {
    id: 'bgm_intimate_conversation',
    type: 'bgm',
    name: 'Intimate Conversation',
    description: 'Soft romantic track for personal moments',
    prompt: `Soft romantic instrumental background music for intimate conversation scenes. Gentle piano with ambient pads, warm emotional atmosphere, tender and vulnerable feel. Slow tempo, heartfelt. Loopable, 3 minutes. High-quality production, cinematic.`,
    specifications: {
      format: 'MP3',
      duration: 180, // 3 minutes
      sampleRate: 44100
    },
    priority: 'high',
    sceneUsage: ['charm_path', 'coffee_date', 'build_trust'],
    generated: false
  },
  {
    id: 'bgm_boudoir_session',
    type: 'bgm',
    name: 'Artistic Boudoir',
    description: 'Sensual sophisticated track for boudoir scenes',
    prompt: `Sensual sophisticated instrumental background music for artistic boudoir photography scene. Slow tempo with cello, ambient textures, intimate emotional depth. Tasteful, empowering, museum-quality aesthetic. Not overtly sexual, more emotional connection. Loopable, 5 minutes. High-quality production, cinematic.`,
    specifications: {
      format: 'MP3',
      duration: 300, // 5 minutes
      sampleRate: 44100
    },
    priority: 'critical',
    sceneUsage: ['boudoir_artistic'],
    generated: false
  },
  {
    id: 'bgm_emotional_ending',
    type: 'bgm',
    name: 'Emotional Ending Theme',
    description: 'Heartfelt track for chapter endings',
    prompt: `Heartfelt emotional instrumental background music for visual novel ending scene. Full orchestral with strings and piano, bittersweet romantic atmosphere, satisfying resolution feel. Cinematic, profound, tender. 2 minutes. High-quality production, film-quality.`,
    specifications: {
      format: 'MP3',
      duration: 120, // 2 minutes
      sampleRate: 44100
    },
    priority: 'medium',
    sceneUsage: ['chapter2_preview', 'all_endings'],
    generated: false
  }
];

// ============================================================================
// LOCATION MAPS - Travel/Time System
// ============================================================================

export const LOCATION_MAPS: AssetRequirement[] = [
  {
    id: 'map_city_overview',
    type: 'location_map',
    name: 'City Map Overview',
    description: 'Interactive map showing all available locations',
    prompt: `Visual novel location map UI. Stylized illustrated map of upscale city district showing key locations: Art Gallery, Photography Studio, Zara's Apartment, Trendy Cafe, Fashion Boutique. Clean modern design, warm color palette, icon markers for each location. 16:9 widescreen, professional UI design. Map should be clickable/interactive-ready.`,
    specifications: {
      width: 1920,
      height: 1080,
      format: 'PNG',
      aspectRatio: '16:9'
    },
    priority: 'high',
    sceneUsage: ['travel_system', 'location_select'],
    generated: false
  },
  {
    id: 'map_location_gallery',
    type: 'location_map',
    name: 'Art Gallery - Afternoon',
    description: 'Gallery location card for map selection',
    prompt: `Visual novel location card for Art Gallery. Elegant illustrated exterior view of modern art gallery building, warm afternoon sunlight. Clean UI card design with location name "The Golden Hour Gallery", atmospheric illustration style. Suitable for location selection menu. 800x600px, professional visual novel UI art.`,
    specifications: {
      width: 800,
      height: 600,
      format: 'PNG'
    },
    priority: 'medium',
    sceneUsage: ['location_select'],
    generated: false,
    timeOfDay: 'afternoon'
  },
  {
    id: 'map_location_studio',
    type: 'location_map',
    name: 'Photography Studio - Day',
    description: 'Studio location card for map selection',
    prompt: `Visual novel location card for Photography Studio. Illustrated exterior view of modern loft-style photography studio building, bright daytime. Clean UI card design with location name "Lightworks Studio", atmospheric illustration style. Suitable for location selection menu. 800x600px, professional visual novel UI art.`,
    specifications: {
      width: 800,
      height: 600,
      format: 'PNG'
    },
    priority: 'medium',
    sceneUsage: ['location_select'],
    generated: false,
    timeOfDay: 'afternoon'
  },
  {
    id: 'map_location_apartment',
    type: 'location_map',
    name: "Zara's Apartment - Evening",
    description: 'Apartment location card for map selection',
    prompt: `Visual novel location card for luxury apartment. Illustrated exterior view of modern upscale apartment building, warm evening lights in windows. Clean UI card design with location name "Zara's Apartment", atmospheric illustration style. Suitable for location selection menu. 800x600px, professional visual novel UI art.`,
    specifications: {
      width: 800,
      height: 600,
      format: 'PNG'
    },
    priority: 'medium',
    sceneUsage: ['location_select'],
    generated: false,
    timeOfDay: 'evening'
  },
  {
    id: 'map_location_cafe',
    type: 'location_map',
    name: 'Trendy Cafe - Morning',
    description: 'Cafe location card for map selection',
    prompt: `Visual novel location card for trendy cafe. Illustrated exterior view of modern upscale cafe with outdoor seating, morning light, people with coffee (blurred). Clean UI card design with location name "Aroma & Light Cafe", atmospheric illustration style. Suitable for location selection menu. 800x600px, professional visual novel UI art.`,
    specifications: {
      width: 800,
      height: 600,
      format: 'PNG'
    },
    priority: 'low',
    sceneUsage: ['location_select'],
    generated: false,
    timeOfDay: 'morning'
  },
  {
    id: 'map_time_indicator',
    type: 'location_map',
    name: 'Time of Day Indicator UI',
    description: 'UI element showing current time (morning/afternoon/evening/night)',
    prompt: `UI element for visual novel time-of-day indicator. Four icon states showing sun positions for morning (sunrise), afternoon (high sun), evening (sunset), night (moon). Clean modern design, warm color palette, 200x60px each state. Professional visual novel UI design.`,
    specifications: {
      width: 800,
      height: 60,
      format: 'PNG'
    },
    priority: 'medium',
    sceneUsage: ['all'],
    generated: false
  }
];

// ============================================================================
// SOUND EFFECTS (SFX) - UI Interactions
// ============================================================================

export const SFX_LIBRARY: AssetRequirement[] = [
  {
    id: 'sfx_ui_click',
    type: 'sfx',
    name: 'UI Click',
    description: 'Subtle click sound for button presses',
    prompt: `Subtle elegant UI click sound effect. Soft, professional, modern. Very brief (0.1 seconds), not harsh. High-quality audio production.`,
    specifications: {
      format: 'WAV',
      duration: 0.1,
      sampleRate: 44100
    },
    priority: 'medium',
    sceneUsage: ['all'],
    generated: false
  },
  {
    id: 'sfx_choice_select',
    type: 'sfx',
    name: 'Choice Selection',
    description: 'Confirmation sound for making a choice',
    prompt: `Elegant confirmation sound effect for choosing options in visual novel. Soft chime, pleasant, positive feeling. Brief (0.3 seconds). High-quality audio production.`,
    specifications: {
      format: 'WAV',
      duration: 0.3,
      sampleRate: 44100
    },
    priority: 'high',
    sceneUsage: ['all'],
    generated: false
  },
  {
    id: 'sfx_text_advance',
    type: 'sfx',
    name: 'Text Advance',
    description: 'Subtle sound when advancing dialogue',
    prompt: `Very subtle page turn or soft whoosh sound effect for advancing text in visual novel. Gentle, not intrusive, professional. Brief (0.2 seconds). High-quality audio production.`,
    specifications: {
      format: 'WAV',
      duration: 0.2,
      sampleRate: 44100
    },
    priority: 'low',
    sceneUsage: ['all'],
    generated: false
  },
  {
    id: 'sfx_scene_transition',
    type: 'sfx',
    name: 'Scene Transition',
    description: 'Smooth transition sound between scenes',
    prompt: `Smooth elegant transition sound effect for changing scenes in visual novel. Subtle whoosh with soft fade, cinematic feel. Medium length (0.8 seconds). High-quality audio production.`,
    specifications: {
      format: 'WAV',
      duration: 0.8,
      sampleRate: 44100
    },
    priority: 'medium',
    sceneUsage: ['all'],
    generated: false
  },
  {
    id: 'sfx_achievement_unlock',
    type: 'sfx',
    name: 'Achievement Unlock',
    description: 'Positive sound for unlocking content',
    prompt: `Positive achievement unlock sound effect for visual novel. Sparkle chimes, celebratory but tasteful, rewarding feeling. Brief (1 second). High-quality audio production.`,
    specifications: {
      format: 'WAV',
      duration: 1.0,
      sampleRate: 44100
    },
    priority: 'medium',
    sceneUsage: ['boudoir_unlock', 'achievements'],
    generated: false
  },
  {
    id: 'sfx_menu_open',
    type: 'sfx',
    name: 'Menu Open',
    description: 'Sound for opening menus or panels',
    prompt: `Elegant menu open sound effect for visual novel. Soft slide or panel sound, modern UI feel. Brief (0.4 seconds). High-quality audio production.`,
    specifications: {
      format: 'WAV',
      duration: 0.4,
      sampleRate: 44100
    },
    priority: 'low',
    sceneUsage: ['menu', 'settings'],
    generated: false
  },
  {
    id: 'sfx_camera_shutter',
    type: 'sfx',
    name: 'Camera Shutter',
    description: 'Professional camera click for photoshoot scenes',
    prompt: `Professional DSLR camera shutter click sound effect. Realistic, high-end camera feel, satisfying mechanical sound. Brief (0.3 seconds). High-quality audio recording.`,
    specifications: {
      format: 'WAV',
      duration: 0.3,
      sampleRate: 44100
    },
    priority: 'high',
    sceneUsage: ['photographer_studio', 'boudoir_artistic'],
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
  ...UI_ELEMENTS,
  ...BGM_TRACKS,
  ...SFX_LIBRARY,
  ...LOCATION_MAPS
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
