/**
 * REELS STUDIO MODE - Type Definitions
 * Professional reel/post generation with Instagram publishing
 */

import { GenerationSettings } from '../types';

// ═══════════════════════════════════════════════════════════════════════════
// REEL CONFIGURATION TYPES
// ═══════════════════════════════════════════════════════════════════════════

export type ReelTheme =
  | 'bigNudes'        // B&W high contrast (Helmut Newton)
  | 'sleepwalker'     // Moody blue-toned cinematic
  | 'domesticNude'    // Warm golden intimate
  | 'polaroid'        // Vintage editorial
  | 'theyrecoming'    // Bold power stance
  | 'champagneLuxury' // Champagne gold luxury
  | 'boudoirGlow'     // Boudoir warmth
  | 'midnightMystery' // Midnight blue mystery
  | 'goldenSensual';  // Golden hour sensual

export type KenBurnsMotion =
  | 'slowZoomIn'
  | 'slowZoomOut'
  | 'panLeftToRight'
  | 'panRightToLeft'
  | 'diagonalDrift'
  | 'faceZoom';

export type ModelVariant =
  | 'hourglassPrimary'
  | 'hourglassCurves'
  | 'hourglassSensual'
  | 'classic'
  | 'sultry'
  | 'playful'
  | 'mysterious'
  | 'powerful';

export type WardrobeCategory =
  | 'champagneLace'
  | 'blackMesh'
  | 'burgundySilk'
  | 'geometricStraps'
  | 'shadowLace'
  | 'liquidGold'
  | 'architecturalCutout'
  | 'sheerChiffon';

export type EnvironmentType =
  | 'luxuryBoudoir'
  | 'penthouseNight'
  | 'goldenHourStudio'
  | 'midnightPool'
  | 'artisticCave'
  | 'vipLounge'
  | 'heritageHaveli'
  | 'mountainCabin';

// ═══════════════════════════════════════════════════════════════════════════
// REEL GENERATION CONFIG
// ═══════════════════════════════════════════════════════════════════════════

export interface ReelGenerationConfig {
  // Content settings
  theme: ReelTheme;
  motionPreset: KenBurnsMotion;
  clipDuration: number; // seconds per clip
  totalDuration: number; // target reel duration

  // Model settings
  modelVariant: ModelVariant;
  intimacyLevel: number; // 1-10

  // Wardrobe & Environment
  wardrobeCategory: WardrobeCategory;
  environment: EnvironmentType;

  // Technical settings
  aspectRatio: '9:16' | '16:9' | '1:1' | '4:5';
  resolution: '1080p' | '720p';
  frameRate: 25 | 30;

  // Effects
  addVignette: boolean;
  addGrain: boolean;
  addBranding: boolean;
  brandingText: string;

  // Audio
  addMusic: boolean;
  musicTrack: string | null;
}

// ═══════════════════════════════════════════════════════════════════════════
// IMAGE GENERATION CONFIG (for source images)
// ═══════════════════════════════════════════════════════════════════════════

export interface ImageGenerationConfig {
  // Provider
  provider: 'vertex-ai' | 'replicate-flux' | 'veo';

  // Model selection
  model: string;

  // Generation settings
  numberOfImages: number;
  aspectRatio: '9:16' | '16:9' | '1:1' | '4:5' | '3:4';

  // Safety settings
  safetySetting: 'block_few' | 'block_some' | 'block_most';
  personGeneration: 'allow_adult' | 'allow_all' | 'dont_allow';
  safetyBypassStrategy: string;

  // Quality
  sampleImageSize: '1024' | '2048';
  enhancePrompt: boolean;
}

// ═══════════════════════════════════════════════════════════════════════════
// PUBLISHING CONFIG
// ═══════════════════════════════════════════════════════════════════════════

export interface PublishConfig {
  // Instagram
  instagramToken: string;
  instagramAccountId: string;

  // GitHub CDN
  githubToken: string;
  githubUser: string;
  githubRepo: string;
  githubBranch: string;
  githubPath: string;

  // Post settings
  caption: string;
  shareToFeed: boolean;
  publishStory: boolean;
}

// ═══════════════════════════════════════════════════════════════════════════
// GENERATED CONTENT TYPES
// ═══════════════════════════════════════════════════════════════════════════

export interface GeneratedReel {
  id: string;
  path: string;
  thumbnailPath: string;
  storyPath: string;
  theme: ReelTheme;
  duration: number;
  createdAt: Date;
  caption: string;
  status: 'pending' | 'ready' | 'published' | 'failed';
  instagramMediaId?: string;
  sourceImages?: string[]; // Base64 or URLs of source images
}

export interface GeneratedPost {
  id: string;
  imagePath: string;
  caption: string;
  createdAt: Date;
  status: 'pending' | 'published' | 'failed';
  instagramMediaId?: string;
}

export interface SourceAsset {
  id: string;
  path: string;
  type: 'image' | 'video';
  selected: boolean;
  thumbnailUrl?: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// MODE STATE
// ═══════════════════════════════════════════════════════════════════════════

export interface ReelsStudioState {
  // Active tab
  activeTab: 'generate' | 'compose' | 'preview' | 'publish';

  // Source assets
  sourceAssets: SourceAsset[];
  selectedAssets: string[];

  // Configurations
  reelConfig: ReelGenerationConfig;
  imageConfig: ImageGenerationConfig;
  publishConfig: PublishConfig;

  // Generated content
  generatedReels: GeneratedReel[];
  generatedPosts: GeneratedPost[];

  // Preview
  previewUrl: string | null;
  isPreviewPlaying: boolean;

  // Status
  isGenerating: boolean;
  isPublishing: boolean;
  progress: number;
  statusMessage: string;
  error: string | null;
}

// ═══════════════════════════════════════════════════════════════════════════
// THEME DEFINITIONS
// ═══════════════════════════════════════════════════════════════════════════

export interface ThemeDefinition {
  id: ReelTheme;
  name: string;
  description: string;
  colorGrade: string;
  vignette: string;
  mood: string;
  previewColor: string;
}

export const THEME_DEFINITIONS: ThemeDefinition[] = [
  {
    id: 'bigNudes',
    name: 'Big Nudes',
    description: 'Classic Helmut Newton - High contrast B&W with stark shadows',
    colorGrade: 'colorchannelmixer=.3:.4:.3:0:.3:.4:.3:0:.3:.4:.3,eq=contrast=1.4:brightness=-0.05:saturation=0',
    vignette: 'vignette=PI/3:1.2',
    mood: 'Dramatic, Bold, Timeless',
    previewColor: '#1a1a1a',
  },
  {
    id: 'sleepwalker',
    name: 'Sleepwalker',
    description: 'Moody blue-toned with cinematic mystery',
    colorGrade: 'eq=contrast=1.25:brightness=-0.02:saturation=0.8,colorbalance=rs=-0.05:gs=0:bs=0.12',
    vignette: 'vignette=PI/3.5:1.3',
    mood: 'Mysterious, Cinematic, Dreamy',
    previewColor: '#1a2a3a',
  },
  {
    id: 'domesticNude',
    name: 'Domestic Nude',
    description: 'Warm golden tones with intimate softness',
    colorGrade: 'eq=contrast=1.15:brightness=0.03:saturation=1.1,colorbalance=rs=0.1:gs=0.06:bs=-0.04',
    vignette: 'vignette=PI/4:1.0',
    mood: 'Intimate, Warm, Soft',
    previewColor: '#3a2a1a',
  },
  {
    id: 'polaroid',
    name: 'Polaroid',
    description: 'Vintage fashion editorial with subtle grain',
    colorGrade: 'eq=contrast=1.1:brightness=0.02:saturation=1.15,colorbalance=rs=0.08:gs=0.04:bs=0.02',
    vignette: 'vignette=PI/4.5:0.8',
    mood: 'Vintage, Editorial, Nostalgic',
    previewColor: '#2a2a2a',
  },
  {
    id: 'theyrecoming',
    name: 'They Are Coming',
    description: 'Bold power stance - High saturation dramatic',
    colorGrade: 'eq=contrast=1.3:brightness=0:saturation=1.25',
    vignette: 'vignette=PI/3:1.4',
    mood: 'Powerful, Bold, Commanding',
    previewColor: '#2a1a2a',
  },
  {
    id: 'champagneLuxury',
    name: 'Champagne Luxury',
    description: 'Elegant champagne gold with luxury warmth',
    colorGrade: 'eq=contrast=1.1:brightness=0.03:saturation=1.15,colorbalance=rs=0.08:gs=0.05:bs=-0.02',
    vignette: 'vignette=PI/4',
    mood: 'Luxurious, Elegant, Golden',
    previewColor: '#3a3020',
  },
  {
    id: 'boudoirGlow',
    name: 'Boudoir Glow',
    description: 'Soft boudoir warmth with romantic undertones',
    colorGrade: 'eq=contrast=1.08:brightness=0.02:saturation=1.2,colorbalance=rs=0.1:gs=0.06:bs=0.02',
    vignette: 'vignette=PI/4.5',
    mood: 'Romantic, Soft, Sensual',
    previewColor: '#3a2025',
  },
  {
    id: 'midnightMystery',
    name: 'Midnight Mystery',
    description: 'Deep midnight tones with mysterious shadows',
    colorGrade: 'eq=contrast=1.15:brightness=-0.02:saturation=0.95,colorbalance=rs=-0.02:gs=0:bs=0.08',
    vignette: 'vignette=PI/3.5',
    mood: 'Mysterious, Dark, Alluring',
    previewColor: '#15152a',
  },
  {
    id: 'goldenSensual',
    name: 'Golden Sensual',
    description: 'Rich golden hour with sensual warmth',
    colorGrade: 'eq=contrast=1.05:brightness=0.04:saturation=1.25,colorbalance=rs=0.12:gs=0.08:bs=-0.04',
    vignette: 'vignette=PI/5',
    mood: 'Sensual, Golden, Radiant',
    previewColor: '#4a3010',
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// CAPTION TEMPLATES
// ═══════════════════════════════════════════════════════════════════════════

export const CAPTION_TEMPLATES: { mood: string; caption: string }[] = [
  {
    mood: 'dramatic',
    caption: `Shadows don't lie. They reveal what light cannot.\n\n#VERALABS #HelmutNewton #HighFashion #ArtisticPhotography #ShadowPlay`,
  },
  {
    mood: 'power',
    caption: `Power isn't given.\nIt's taken.\n\n#VERALABS #PowerPose #FashionArt #Confidence #BoldWomen`,
  },
  {
    mood: 'mysterious',
    caption: `Between light and shadow,\nthere's a story waiting to be told.\n\n#VERALABS #ChiaroscuroArt #VisualStorytelling #FineArtPhotography`,
  },
  {
    mood: 'elegant',
    caption: `Silence speaks volumes\nwhen the composition is perfect.\n\n#VERALABS #FashionPhotography #TimelessBeauty #EditorialStyle`,
  },
  {
    mood: 'iconic',
    caption: `Some moments are meant\nto be immortalized.\n\n#VERALABS #IconicMoments #LuxuryFashion #Photography #Timeless`,
  },
  {
    mood: 'architectural',
    caption: `The body is architecture.\nLight is the architect.\n\n#VERALABS #BodyAsArt #ArchitecturalBeauty #FineArt`,
  },
  {
    mood: 'bold',
    caption: `Bold choices.\nBolder results.\n\n#VERALABS #BoldBeauty #FearlessFashion #ArtisticFreedom`,
  },
  {
    mood: 'intense',
    caption: `In the stillness,\nfind the storm.\n\n#VERALABS #IntenseBeauty #QuietPower #DramaticLighting`,
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// DEFAULT CONFIGURATIONS
// ═══════════════════════════════════════════════════════════════════════════

export const DEFAULT_REEL_CONFIG: ReelGenerationConfig = {
  theme: 'champagneLuxury',
  motionPreset: 'slowZoomIn',
  clipDuration: 4,
  totalDuration: 30,
  modelVariant: 'hourglassPrimary',
  intimacyLevel: 8,
  wardrobeCategory: 'champagneLace',
  environment: 'luxuryBoudoir',
  aspectRatio: '9:16',
  resolution: '1080p',
  frameRate: 25,
  addVignette: true,
  addGrain: false,
  addBranding: true,
  brandingText: 'VERALABS',
  addMusic: true,
  musicTrack: null,
};

export const DEFAULT_IMAGE_CONFIG: ImageGenerationConfig = {
  provider: 'vertex-ai',
  model: 'imagen-4.0-ultra-generate-001',
  numberOfImages: 4,
  aspectRatio: '9:16',
  safetySetting: 'block_few',
  personGeneration: 'allow_adult',
  safetyBypassStrategy: 'verastrategy',
  sampleImageSize: '2048',
  enhancePrompt: true,
};

export const DEFAULT_PUBLISH_CONFIG: PublishConfig = {
  instagramToken: '',
  instagramAccountId: '17841478517688462',
  githubToken: '',
  githubUser: 'aemons9',
  githubRepo: 'studiov1',
  githubBranch: 'main',
  githubPath: 'photo/reels',
  caption: '',
  shareToFeed: true,
  publishStory: true,
};
