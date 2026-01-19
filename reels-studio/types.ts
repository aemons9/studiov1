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

// ═══════════════════════════════════════════════════════════════════════════
// MODEL VARIANTS - All Models from All Modes
// ═══════════════════════════════════════════════════════════════════════════

export type ModelVariant =
  // Hourglass Muse Models
  | 'hourglassPrimary'
  | 'hourglassCurves'
  | 'hourglassSensual'
  | 'indianHourglassMuse'
  // Erotic Glamour Models (Indian)
  | 'aishaDecolletage'      // Upper body specialist
  | 'priyaCurves'           // Lower body/hip emphasis
  | 'zaraHarmony'           // Full-body form
  | 'simranCinema'          // Cinematic erotic
  | 'meeraAthletic'         // Athletic glamour
  // Platinum Collection
  | 'midnightSeductress'    // Classic erotic actress
  | 'fitnessBombshell'      // Athletic curves
  | 'graphicEditorialQueen' // Artistic minimal
  | 'privateBoudoirEnchantress'
  | 'luxuryLoungeGoddess'
  | 'spaTubTemptress'       // Water/spa specialist
  | 'rooftopMidnightMuse'
  | 'hotelSuiteVixen'
  | 'undergroundClubSiren'
  | 'artStudioProvocateur'  // Fine art nude
  // Classic Variants
  | 'classic'
  | 'sultry'
  | 'playful'
  | 'mysterious'
  | 'powerful';

// ═══════════════════════════════════════════════════════════════════════════
// WARDROBE CATEGORIES - Complete Catalogue
// ═══════════════════════════════════════════════════════════════════════════

export type WardrobeCategory =
  // Luxury Lingerie
  | 'champagneLace'
  | 'blackMesh'
  | 'burgundySilk'
  | 'midnightLaceBodysuit'
  | 'crimsonSilkTeddy'
  | 'luxuryLaceSet'
  | 'sheerLaceTeddy'
  | 'satinChemise'
  // Architectural & Geometric
  | 'geometricStraps'
  | 'geometricCutoutBodysuit'
  | 'architecturalCutout'
  | 'strappyHarness'
  | 'chainCouture'
  | 'sculptedLeather'
  // Sheer & Transparent
  | 'sheerChiffon'
  | 'sheerSilkRobe'
  | 'meshOverlayGown'
  | 'sheerSpaWrap'
  // Luxury Loungewear
  | 'silkKimonoRobe'
  | 'velvetLoungeRobe'
  | 'cashmereLounge'
  | 'luxuryHotelRobe'
  | 'satinPajamaSet'
  // Athletic & Fitness
  | 'luxurySportsBra'
  | 'glamourYogaSet'
  | 'athleticMinimal'
  | 'postWorkoutSeduction'
  // Club & Night
  | 'neonMeshBodysuit'
  | 'latexClubMini'
  | 'vinylClubSet'
  | 'sequinMiniDress'
  // Artistic & Editorial
  | 'artisticFabricDraping'
  | 'paintSplatteredMinimal'
  | 'editorialBodyArt'
  | 'minimalArtPieces'
  // Water & Spa
  | 'wetSilkCamisole'
  | 'luxurySpaBikini'
  | 'artisticTowelDraping'
  | 'wetLaceBodysuit'
  // Body Jewelry
  | 'goldenBodyChains'
  | 'singleThreadHarness'
  | 'chainHarnessTop'
  // Shadow & Mystery
  | 'shadowLace'
  | 'liquidGold'
  | 'noirSilkNightgown'
  | 'midnightLaceRobe';

// ═══════════════════════════════════════════════════════════════════════════
// ENVIRONMENT TYPES - All Locations
// ═══════════════════════════════════════════════════════════════════════════

export type EnvironmentType =
  // Luxury Boudoir & Bedroom
  | 'luxuryBoudoir'
  | 'intimateBedroomMorning'
  | 'velvetDrapedBoudoir'
  | 'luxuryPrivateBoudoir'
  | 'messyLuxuryHotelRoom'
  // Penthouse & Urban
  | 'penthouseNight'
  | 'penthouseSuite'
  | 'rooftopHelipad'
  | 'rooftopMidnight'
  | 'urbanLoft'
  | 'industrialLoft'
  // Studio & Artistic
  | 'goldenHourStudio'
  | 'photographyStudio'
  | 'minimalistArtGallery'
  | 'sculptorsAtelier'
  | 'artistsLoftNorthLight'
  | 'emptyDanceStudio'
  | 'abandonedTheatre'
  // Water & Spa
  | 'midnightPool'
  | 'luxuryBathroomTub'
  | 'privateSteamRoom'
  | 'hotStoneMassageSpa'
  | 'hammamIndulgence'
  | 'poolClubVIP'
  // Exotic & Heritage
  | 'heritageHaveli'
  | 'maharajasPalace'
  | 'baroquePalaceBallroom'
  | 'vintageOrientExpress'
  | 'tuscanVillaPatio'
  // Nature & Outdoor
  | 'mountainCabin'
  | 'secludedBeachSunset'
  | 'secludedCabinWoods'
  | 'fieldOfFlowers'
  // Night & Club
  | 'vipLounge'
  | 'undergroundClub'
  | 'neonCyberpunkAlley'
  | 'rainSoakedNeonAlley'
  | 'craftBarCounter'
  | 'poolTableLounge'
  // Professional
  | 'modernExecutiveOffice'
  | 'cornerOfficeDaytime'
  | 'luxuryBoardroom'
  | 'privateJetInterior'
  // Conceptual
  | 'infiniteWhiteVoid'
  | 'infiniteBlackVoid'
  | 'roomOfMirrors'
  | 'submergedInWater'
  | 'abstractGeometricSet'
  | 'projectedUniverse'
  | 'artisticCave'
  // Indian Locations
  | 'narrowAlleyLights'
  | 'oldCityChandniChowk';

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
// MODEL DEFINITIONS - Detailed Specifications
// ═══════════════════════════════════════════════════════════════════════════

export interface ModelDefinition {
  id: ModelVariant;
  name: string;
  category: 'hourglass' | 'indian' | 'platinum' | 'classic';
  description: string;
  physicalTraits: string;
  specialty: string;
  promptTemplate: string;
}

export const MODEL_DEFINITIONS: ModelDefinition[] = [
  // Hourglass Muse Models
  { id: 'hourglassPrimary', name: 'Hourglass Primary', category: 'hourglass', description: 'Classic hourglass Instagram muse', physicalTraits: '36-26-38, 5\'7", golden honey skin', specialty: 'Mirror selfies, bedroom content', promptTemplate: 'Stunning Indian woman with classic hourglass figure, 36-26-38 measurements, golden honey skin with warm undertones, long black hair with caramel highlights' },
  { id: 'hourglassCurves', name: 'Hourglass Curves', category: 'hourglass', description: 'Enhanced curves emphasis', physicalTraits: '38-26-40, voluptuous', specialty: 'Hip and curves focus', promptTemplate: 'Voluptuous Indian woman with enhanced hourglass curves, dramatic hip-to-waist ratio, sensual fuller figure' },
  { id: 'hourglassSensual', name: 'Hourglass Sensual', category: 'hourglass', description: 'Sensual intimate focus', physicalTraits: '36-25-38, athletic-curvy', specialty: 'Intimate artistic poses', promptTemplate: 'Sensual Indian woman with perfect hourglass proportions, athletic yet curvy, intimate presence' },
  { id: 'indianHourglassMuse', name: 'Indian Hourglass Muse', category: 'indian', description: 'The definitive Indian Instagram muse archetype', physicalTraits: '36-26-38, 5\'7", age 23-26, lotus tattoo', specialty: 'Instagram editorial, intimate artistry', promptTemplate: 'Beautiful Indian woman age 23-26, classic hourglass Instagram proportions, heart-shaped face, deep brown eyes, subtle lotus tattoo on shoulder blade, long black hair' },

  // Erotic Glamour Models (Indian)
  { id: 'aishaDecolletage', name: 'Aisha Décolletage', category: 'indian', description: 'Upper body reveal specialist', physicalTraits: '36C bust, elegant neck and shoulders', specialty: 'Bust and décolletage artistry', promptTemplate: 'Elegant Indian woman named Aisha, perfect décolletage, graceful neck and shoulders, 36C bust, sophisticated upper body focus' },
  { id: 'priyaCurves', name: 'Priya Curves', category: 'indian', description: 'Lower body and hip emphasis specialist', physicalTraits: '40" hips, dramatic curves', specialty: 'Hip and lower body focus', promptTemplate: 'Curvaceous Indian woman named Priya, dramatic 40-inch hips, emphasized lower body curves, sensual hip focus' },
  { id: 'zaraHarmony', name: 'Zara Harmony', category: 'indian', description: 'Full-body complete form specialist', physicalTraits: 'Perfectly proportioned full figure', specialty: 'Full-body sensual artistry', promptTemplate: 'Harmoniously proportioned Indian woman named Zara, perfect full-body form, balanced curves, complete figure artistry' },
  { id: 'simranCinema', name: 'Simran Cinema', category: 'indian', description: 'Cinematic erotic narrative specialist', physicalTraits: 'Expressive features, dramatic presence', specialty: 'Cinematic storytelling poses', promptTemplate: 'Dramatic Indian woman named Simran, cinematic presence, expressive features, erotic art film aesthetic' },
  { id: 'meeraAthletic', name: 'Meera Athletic', category: 'indian', description: 'Athletic glamour specialist', physicalTraits: 'Toned athletic build, defined muscles', specialty: 'Athletic sensual photography', promptTemplate: 'Athletic Indian woman named Meera, toned defined physique, fitness model curves, athletic glamour' },

  // Platinum Collection
  { id: 'midnightSeductress', name: 'Midnight Seductress', category: 'platinum', description: 'Classic erotic actress, midnight specialist', physicalTraits: 'Bombshell figure, dramatic features', specialty: 'Nocturnal seduction, silk and satin', promptTemplate: 'Glamorous midnight seductress, classic bombshell figure, dramatic eyes, silhouette in moonlight' },
  { id: 'fitnessBombshell', name: 'Fitness Bombshell', category: 'platinum', description: 'Athletic curves with lower body focus', physicalTraits: 'Athletic-curvy, toned glutes', specialty: 'Fitness glamour, athletic seduction', promptTemplate: 'Fitness bombshell with athletic curves, toned sculpted physique, gym-ready glamour body' },
  { id: 'graphicEditorialQueen', name: 'Graphic Editorial Queen', category: 'platinum', description: 'Artistic minimal, editorial nude art', physicalTraits: 'Editorial model proportions', specialty: 'Fine art nude, minimal coverage', promptTemplate: 'Editorial model with artistic proportions, graphic minimal aesthetic, fine art nude specialist' },
  { id: 'privateBoudoirEnchantress', name: 'Private Boudoir Enchantress', category: 'platinum', description: 'Intimate bedroom specialist', physicalTraits: 'Soft sensual curves', specialty: 'Private boudoir, intimate moments', promptTemplate: 'Intimate boudoir enchantress, soft sensual curves, private bedroom allure' },
  { id: 'luxuryLoungeGoddess', name: 'Luxury Lounge Goddess', category: 'platinum', description: 'Penthouse sophistication', physicalTraits: 'Elegant tall frame', specialty: 'Luxury penthouse, VIP lounge', promptTemplate: 'Sophisticated luxury goddess, elegant tall frame, penthouse elegance' },
  { id: 'spaTubTemptress', name: 'Spa & Tub Temptress', category: 'platinum', description: 'Water and spa specialist', physicalTraits: 'Glistening wet skin, water goddess', specialty: 'Steam room, hot tub, spa', promptTemplate: 'Water goddess with glistening wet skin, steam and spa specialist, sensual in water' },
  { id: 'rooftopMidnightMuse', name: 'Rooftop Midnight Muse', category: 'platinum', description: 'Urban night photography specialist', physicalTraits: 'Silhouette against city lights', specialty: 'Urban rooftop, city nights', promptTemplate: 'Urban midnight muse, silhouette against city lights, rooftop glamour' },
  { id: 'hotelSuiteVixen', name: 'Hotel Suite Vixen', category: 'platinum', description: 'Travel and intimacy specialist', physicalTraits: 'Jet-setter elegance', specialty: 'Luxury hotel rooms, travel glamour', promptTemplate: 'Hotel suite vixen, jet-setter elegance, luxury travel intimacy' },
  { id: 'undergroundClubSiren', name: 'Underground Club Siren', category: 'platinum', description: 'Late-night venue specialist', physicalTraits: 'Neon-lit dramatic features', specialty: 'Club scenes, neon lights', promptTemplate: 'Underground club siren, neon-lit features, late-night glamour' },
  { id: 'artStudioProvocateur', name: 'Art Studio Provocateur', category: 'platinum', description: 'Fine art nude specialist', physicalTraits: 'Classical artistic proportions', specialty: 'Artist studio, fine art nude', promptTemplate: 'Art studio provocateur, classical proportions, fine art nude model' },

  // Classic Variants
  { id: 'classic', name: 'Classic Beauty', category: 'classic', description: 'Timeless classic beauty', physicalTraits: 'Elegant proportions', specialty: 'Classic glamour photography', promptTemplate: 'Classic beautiful woman with elegant proportions, timeless glamour' },
  { id: 'sultry', name: 'Sultry Temptress', category: 'classic', description: 'Sultry seductive look', physicalTraits: 'Smoldering eyes, pouty lips', specialty: 'Seductive poses, bedroom eyes', promptTemplate: 'Sultry temptress with smoldering eyes, seductive presence' },
  { id: 'playful', name: 'Playful Vixen', category: 'classic', description: 'Playful flirtatious energy', physicalTraits: 'Youthful, energetic', specialty: 'Playful poses, teasing shots', promptTemplate: 'Playful vixen with flirtatious energy, youthful charm' },
  { id: 'mysterious', name: 'Mysterious Muse', category: 'classic', description: 'Enigmatic mysterious presence', physicalTraits: 'Dramatic shadows, hidden depths', specialty: 'Shadow play, mystery', promptTemplate: 'Mysterious muse with enigmatic presence, dramatic shadow play' },
  { id: 'powerful', name: 'Powerful Goddess', category: 'classic', description: 'Commanding powerful presence', physicalTraits: 'Strong confident stance', specialty: 'Power poses, commanding shots', promptTemplate: 'Powerful goddess with commanding presence, confident stance' },
];

// ═══════════════════════════════════════════════════════════════════════════
// WARDROBE DEFINITIONS - Detailed Catalogue
// ═══════════════════════════════════════════════════════════════════════════

export interface WardrobeDefinition {
  id: WardrobeCategory;
  name: string;
  category: 'lingerie' | 'architectural' | 'sheer' | 'loungewear' | 'athletic' | 'club' | 'artistic' | 'water' | 'jewelry' | 'shadow';
  description: string;
  intimacyLevel: number; // 1-10
  coverage: 'minimal' | 'moderate' | 'revealing' | 'artistic';
  promptTemplate: string;
}

export const WARDROBE_DEFINITIONS: WardrobeDefinition[] = [
  // Luxury Lingerie
  { id: 'champagneLace', name: 'Champagne Lace Set', category: 'lingerie', description: 'Elegant champagne-colored French lace', intimacyLevel: 7, coverage: 'moderate', promptTemplate: 'wearing elegant champagne-colored French lace lingerie set, delicate embroidery' },
  { id: 'blackMesh', name: 'Black Mesh Bodysuit', category: 'lingerie', description: 'Sheer black mesh with strategic coverage', intimacyLevel: 8, coverage: 'revealing', promptTemplate: 'wearing sheer black mesh bodysuit with strategic lace panels' },
  { id: 'burgundySilk', name: 'Burgundy Silk Teddy', category: 'lingerie', description: 'Rich burgundy silk with lace trim', intimacyLevel: 7, coverage: 'moderate', promptTemplate: 'wearing luxurious burgundy silk teddy with delicate lace trim' },
  { id: 'midnightLaceBodysuit', name: 'Midnight Lace Bodysuit', category: 'lingerie', description: 'Dark midnight blue lace bodysuit', intimacyLevel: 8, coverage: 'revealing', promptTemplate: 'wearing midnight blue lace bodysuit with intricate floral patterns' },
  { id: 'crimsonSilkTeddy', name: 'Crimson Silk Teddy', category: 'lingerie', description: 'Vibrant crimson silk teddy', intimacyLevel: 7, coverage: 'moderate', promptTemplate: 'wearing vibrant crimson silk teddy with satin straps' },
  { id: 'luxuryLaceSet', name: 'Luxury Lace Set', category: 'lingerie', description: 'Designer luxury lace bra and panty set', intimacyLevel: 8, coverage: 'revealing', promptTemplate: 'wearing designer luxury lace bra and matching panty set' },
  { id: 'sheerLaceTeddy', name: 'Sheer Lace Teddy', category: 'lingerie', description: 'Completely sheer lace teddy', intimacyLevel: 9, coverage: 'revealing', promptTemplate: 'wearing completely sheer lace teddy with delicate embroidery' },
  { id: 'satinChemise', name: 'Satin Chemise Slip', category: 'lingerie', description: 'Flowing satin chemise slip', intimacyLevel: 6, coverage: 'moderate', promptTemplate: 'wearing flowing satin chemise slip dress' },

  // Architectural & Geometric
  { id: 'geometricStraps', name: 'Geometric Strap Set', category: 'architectural', description: 'Intricate geometric strap design', intimacyLevel: 9, coverage: 'minimal', promptTemplate: 'wearing intricate geometric strap lingerie with architectural lines' },
  { id: 'geometricCutoutBodysuit', name: 'Geometric Cutout Bodysuit', category: 'architectural', description: 'Strategic geometric cutouts', intimacyLevel: 8, coverage: 'revealing', promptTemplate: 'wearing black bodysuit with strategic geometric cutouts' },
  { id: 'architecturalCutout', name: 'Architectural Cutout Design', category: 'architectural', description: 'Avant-garde architectural cutouts', intimacyLevel: 9, coverage: 'revealing', promptTemplate: 'wearing avant-garde bodysuit with architectural cutout design' },
  { id: 'strappyHarness', name: 'Strappy Body Harness', category: 'architectural', description: 'Intricate strappy body harness', intimacyLevel: 9, coverage: 'minimal', promptTemplate: 'wearing intricate strappy body harness over bare skin' },
  { id: 'chainCouture', name: 'Chain Couture Ensemble', category: 'architectural', description: 'Designer chain body jewelry', intimacyLevel: 10, coverage: 'minimal', promptTemplate: 'wearing designer chain couture ensemble draped over body' },
  { id: 'sculptedLeather', name: 'Sculpted Leather Pieces', category: 'architectural', description: 'Sculptural leather lingerie', intimacyLevel: 8, coverage: 'revealing', promptTemplate: 'wearing sculptural leather lingerie pieces' },

  // Sheer & Transparent
  { id: 'sheerChiffon', name: 'Sheer Chiffon Robe', category: 'sheer', description: 'Flowing sheer chiffon robe', intimacyLevel: 7, coverage: 'revealing', promptTemplate: 'wearing flowing sheer chiffon robe, silhouette visible' },
  { id: 'sheerSilkRobe', name: 'Sheer Silk Robe', category: 'sheer', description: 'Luxurious sheer silk robe', intimacyLevel: 8, coverage: 'revealing', promptTemplate: 'wearing luxurious sheer silk robe falling off shoulders' },
  { id: 'meshOverlayGown', name: 'Mesh Overlay Gown', category: 'sheer', description: 'Floor-length mesh overlay', intimacyLevel: 8, coverage: 'revealing', promptTemplate: 'wearing floor-length mesh overlay gown' },
  { id: 'sheerSpaWrap', name: 'Sheer Spa Wrap', category: 'sheer', description: 'Translucent spa wrap', intimacyLevel: 9, coverage: 'revealing', promptTemplate: 'wearing translucent spa wrap, steam-kissed' },

  // Luxury Loungewear
  { id: 'silkKimonoRobe', name: 'Silk Kimono Robe', category: 'loungewear', description: 'Elegant silk kimono robe', intimacyLevel: 6, coverage: 'moderate', promptTemplate: 'wearing elegant silk kimono robe, loosely tied' },
  { id: 'velvetLoungeRobe', name: 'Velvet Lounge Robe', category: 'loungewear', description: 'Luxurious velvet lounge robe', intimacyLevel: 6, coverage: 'moderate', promptTemplate: 'wearing luxurious velvet lounge robe' },
  { id: 'cashmereLounge', name: 'Cashmere Lounge Set', category: 'loungewear', description: 'Soft cashmere lounge set', intimacyLevel: 5, coverage: 'moderate', promptTemplate: 'wearing soft cashmere lounge set' },
  { id: 'luxuryHotelRobe', name: 'Luxury Hotel Robe', category: 'loungewear', description: 'Plush hotel spa robe', intimacyLevel: 5, coverage: 'moderate', promptTemplate: 'wearing plush white hotel robe, slightly open' },
  { id: 'satinPajamaSet', name: 'Satin Pajama Set', category: 'loungewear', description: 'Elegant satin pajama set', intimacyLevel: 5, coverage: 'moderate', promptTemplate: 'wearing elegant satin pajama set' },

  // Athletic & Fitness
  { id: 'luxurySportsBra', name: 'Luxury Sports Bra Set', category: 'athletic', description: 'Designer sports bra and leggings', intimacyLevel: 5, coverage: 'moderate', promptTemplate: 'wearing designer sports bra and high-waisted leggings' },
  { id: 'glamourYogaSet', name: 'Glamour Yoga Set', category: 'athletic', description: 'Glamorous yoga attire', intimacyLevel: 6, coverage: 'moderate', promptTemplate: 'wearing glamorous yoga set with cutout details' },
  { id: 'athleticMinimal', name: 'Athletic Minimal Set', category: 'athletic', description: 'Minimal athletic wear', intimacyLevel: 7, coverage: 'revealing', promptTemplate: 'wearing minimal athletic set, sports bra and tiny shorts' },
  { id: 'postWorkoutSeduction', name: 'Post-Workout Seduction', category: 'athletic', description: 'Sweaty post-workout look', intimacyLevel: 7, coverage: 'revealing', promptTemplate: 'wearing post-workout minimal attire, glistening skin' },

  // Club & Night
  { id: 'neonMeshBodysuit', name: 'Neon Mesh Bodysuit', category: 'club', description: 'Neon-accented mesh bodysuit', intimacyLevel: 8, coverage: 'revealing', promptTemplate: 'wearing neon-accented mesh bodysuit for club' },
  { id: 'latexClubMini', name: 'Latex Club Mini', category: 'club', description: 'Shiny latex mini dress', intimacyLevel: 7, coverage: 'revealing', promptTemplate: 'wearing shiny latex mini dress' },
  { id: 'vinylClubSet', name: 'Vinyl Club Set', category: 'club', description: 'Vinyl two-piece club set', intimacyLevel: 8, coverage: 'revealing', promptTemplate: 'wearing vinyl two-piece club set' },
  { id: 'sequinMiniDress', name: 'Sequin Mini Dress', category: 'club', description: 'Sparkling sequin mini', intimacyLevel: 6, coverage: 'revealing', promptTemplate: 'wearing sparkling sequin mini dress' },

  // Artistic & Editorial
  { id: 'artisticFabricDraping', name: 'Artistic Fabric Draping', category: 'artistic', description: 'Artistic fabric draped over body', intimacyLevel: 9, coverage: 'artistic', promptTemplate: 'with artistic fabric draped strategically over body' },
  { id: 'paintSplatteredMinimal', name: 'Paint-Splattered Minimal', category: 'artistic', description: 'Body painted with art splatters', intimacyLevel: 10, coverage: 'minimal', promptTemplate: 'with minimal coverage, body splattered with artistic paint' },
  { id: 'editorialBodyArt', name: 'Editorial Body Art', category: 'artistic', description: 'Editorial body art coverage', intimacyLevel: 10, coverage: 'artistic', promptTemplate: 'with editorial body art as primary coverage' },
  { id: 'minimalArtPieces', name: 'Minimal Art Pieces', category: 'artistic', description: 'Minimal strategic art pieces', intimacyLevel: 10, coverage: 'minimal', promptTemplate: 'wearing minimal strategic art pieces only' },

  // Water & Spa
  { id: 'wetSilkCamisole', name: 'Wet Silk Camisole', category: 'water', description: 'Wet clinging silk camisole', intimacyLevel: 9, coverage: 'revealing', promptTemplate: 'wearing wet silk camisole clinging to body' },
  { id: 'luxurySpaBikini', name: 'Luxury Spa Bikini', category: 'water', description: 'Minimal spa bikini', intimacyLevel: 7, coverage: 'revealing', promptTemplate: 'wearing minimal luxury spa bikini' },
  { id: 'artisticTowelDraping', name: 'Artistic Towel Draping', category: 'water', description: 'Towel artistically draped', intimacyLevel: 9, coverage: 'artistic', promptTemplate: 'with white towel artistically draped, steam rising' },
  { id: 'wetLaceBodysuit', name: 'Wet Lace Bodysuit', category: 'water', description: 'Wet lace bodysuit', intimacyLevel: 9, coverage: 'revealing', promptTemplate: 'wearing wet lace bodysuit, water droplets on skin' },

  // Body Jewelry
  { id: 'goldenBodyChains', name: 'Golden Body Chains', category: 'jewelry', description: 'Intricate golden body chains', intimacyLevel: 10, coverage: 'minimal', promptTemplate: 'wearing only intricate golden body chains' },
  { id: 'singleThreadHarness', name: 'Single-Thread Harness', category: 'jewelry', description: 'Minimal single-thread body harness', intimacyLevel: 10, coverage: 'minimal', promptTemplate: 'wearing minimal single-thread body harness' },
  { id: 'chainHarnessTop', name: 'Chain Harness Top', category: 'jewelry', description: 'Chain harness as top', intimacyLevel: 10, coverage: 'minimal', promptTemplate: 'wearing chain harness as only top coverage' },

  // Shadow & Mystery
  { id: 'shadowLace', name: 'Shadow Lace', category: 'shadow', description: 'Dark shadow-themed lace', intimacyLevel: 8, coverage: 'revealing', promptTemplate: 'wearing dark shadow-themed lace lingerie' },
  { id: 'liquidGold', name: 'Liquid Gold Set', category: 'shadow', description: 'Liquid gold metallic lingerie', intimacyLevel: 8, coverage: 'revealing', promptTemplate: 'wearing liquid gold metallic lingerie set' },
  { id: 'noirSilkNightgown', name: 'Noir Silk Nightgown', category: 'shadow', description: 'Black silk nightgown', intimacyLevel: 7, coverage: 'moderate', promptTemplate: 'wearing noir silk nightgown with lace trim' },
  { id: 'midnightLaceRobe', name: 'Midnight Lace Robe', category: 'shadow', description: 'Midnight blue lace robe', intimacyLevel: 8, coverage: 'revealing', promptTemplate: 'wearing midnight blue lace robe, open front' },
];

// ═══════════════════════════════════════════════════════════════════════════
// ENVIRONMENT DEFINITIONS - All Locations
// ═══════════════════════════════════════════════════════════════════════════

export interface EnvironmentDefinition {
  id: EnvironmentType;
  name: string;
  category: 'boudoir' | 'penthouse' | 'studio' | 'water' | 'exotic' | 'nature' | 'club' | 'professional' | 'conceptual' | 'indian';
  description: string;
  lighting: string;
  mood: string;
  promptTemplate: string;
}

export const ENVIRONMENT_DEFINITIONS: EnvironmentDefinition[] = [
  // Luxury Boudoir & Bedroom
  { id: 'luxuryBoudoir', name: 'Luxury Boudoir', category: 'boudoir', description: 'Opulent private boudoir', lighting: 'Warm candlelight and soft window light', mood: 'Intimate, romantic', promptTemplate: 'in a luxurious private boudoir with velvet drapes, candles, warm intimate lighting' },
  { id: 'intimateBedroomMorning', name: 'Intimate Bedroom (Morning)', category: 'boudoir', description: 'Sun-drenched morning bedroom', lighting: 'Soft morning sunlight through curtains', mood: 'Fresh, intimate', promptTemplate: 'in intimate bedroom with soft morning sunlight streaming through sheer curtains' },
  { id: 'velvetDrapedBoudoir', name: 'Velvet-Draped Boudoir', category: 'boudoir', description: 'Rich velvet-draped room', lighting: 'Dramatic candlelight', mood: 'Decadent, sensual', promptTemplate: 'in velvet-draped boudoir with rich fabrics and dramatic candlelight' },
  { id: 'luxuryPrivateBoudoir', name: 'Luxury Private Boudoir', category: 'boudoir', description: 'Ultimate private luxury', lighting: 'Warm ambient glow', mood: 'Private, exclusive', promptTemplate: 'in luxury private boudoir with silk sheets and ambient warm glow' },
  { id: 'messyLuxuryHotelRoom', name: 'Messy Luxury Hotel Room', category: 'boudoir', description: 'Disheveled luxury hotel room', lighting: 'Dim romantic lighting', mood: 'Passionate, spontaneous', promptTemplate: 'in messy luxury hotel room, sheets tangled, dim romantic lighting' },

  // Penthouse & Urban
  { id: 'penthouseNight', name: 'Penthouse at Night', category: 'penthouse', description: 'City penthouse with night views', lighting: 'City lights through windows', mood: 'Sophisticated, urban', promptTemplate: 'in penthouse suite at night with city lights visible through floor-to-ceiling windows' },
  { id: 'penthouseSuite', name: 'Penthouse Suite', category: 'penthouse', description: 'Luxurious penthouse interior', lighting: 'Designer ambient lighting', mood: 'Ultra-luxury', promptTemplate: 'in ultra-luxurious penthouse suite with designer furniture and ambient lighting' },
  { id: 'rooftopHelipad', name: 'Rooftop Helipad', category: 'penthouse', description: 'Dramatic rooftop helipad', lighting: 'Dramatic sky and city lights', mood: 'Powerful, dramatic', promptTemplate: 'on rooftop helipad with dramatic city skyline backdrop' },
  { id: 'rooftopMidnight', name: 'Rooftop at Midnight', category: 'penthouse', description: 'Urban rooftop at midnight', lighting: 'Moonlight and city glow', mood: 'Mysterious, urban', promptTemplate: 'on urban rooftop at midnight, moonlight and distant city glow' },
  { id: 'urbanLoft', name: 'Urban Loft', category: 'penthouse', description: 'Gritty urban loft space', lighting: 'Industrial window light', mood: 'Edgy, artistic', promptTemplate: 'in gritty urban loft with exposed brick, large industrial windows' },
  { id: 'industrialLoft', name: 'Industrial Loft', category: 'penthouse', description: 'Raw industrial loft', lighting: 'Dramatic side lighting', mood: 'Raw, artistic', promptTemplate: 'in raw industrial loft with concrete floors and steel beams' },

  // Studio & Artistic
  { id: 'goldenHourStudio', name: 'Golden Hour Studio', category: 'studio', description: 'Studio with golden hour light', lighting: 'Warm golden hour sunlight', mood: 'Warm, sensual', promptTemplate: 'in photography studio with warm golden hour sunlight streaming in' },
  { id: 'photographyStudio', name: 'Photography Studio', category: 'studio', description: 'Professional photo studio', lighting: 'Professional studio lighting', mood: 'Professional, controlled', promptTemplate: 'in professional photography studio with controlled lighting setup' },
  { id: 'minimalistArtGallery', name: 'Minimalist Art Gallery', category: 'studio', description: 'Clean white art gallery', lighting: 'Gallery track lighting', mood: 'Clean, artistic', promptTemplate: 'in minimalist white art gallery with track lighting' },
  { id: 'sculptorsAtelier', name: 'Sculptor\'s Atelier', category: 'studio', description: 'Artist\'s sculpture studio', lighting: 'North-facing skylight', mood: 'Creative, artistic', promptTemplate: 'in sculptor\'s atelier with marble dust and north-facing skylight' },
  { id: 'artistsLoftNorthLight', name: 'Artist\'s Loft (North Light)', category: 'studio', description: 'Artist loft with north light', lighting: 'Soft diffused north light', mood: 'Peaceful, artistic', promptTemplate: 'in artist\'s loft with soft diffused north-facing window light' },
  { id: 'emptyDanceStudio', name: 'Empty Dance Studio', category: 'studio', description: 'Bare dance studio with mirrors', lighting: 'Soft overhead lighting', mood: 'Graceful, movement', promptTemplate: 'in empty dance studio with mirrored walls and wooden floor' },
  { id: 'abandonedTheatre', name: 'Abandoned Theatre', category: 'studio', description: 'Decaying grand theatre', lighting: 'Dramatic shafts of light', mood: 'Haunting, dramatic', promptTemplate: 'in abandoned theatre with dramatic shafts of light through dusty air' },

  // Water & Spa
  { id: 'midnightPool', name: 'Midnight Pool', category: 'water', description: 'Luxury pool at midnight', lighting: 'Underwater pool lights', mood: 'Mysterious, sensual', promptTemplate: 'at luxury infinity pool at midnight, underwater lights creating glow' },
  { id: 'luxuryBathroomTub', name: 'Luxury Bathroom & Tub', category: 'water', description: 'Marble bathroom with soaking tub', lighting: 'Soft candlelight', mood: 'Relaxing, intimate', promptTemplate: 'in luxury marble bathroom with deep soaking tub, candles flickering' },
  { id: 'privateSteamRoom', name: 'Private Steam Room', category: 'water', description: 'Private luxury steam room', lighting: 'Warm amber through steam', mood: 'Sensual, steamy', promptTemplate: 'in private luxury steam room, dense white steam, warm amber lighting, teak wood benches' },
  { id: 'hotStoneMassageSpa', name: 'Hot Stone Massage Spa', category: 'water', description: 'Spa treatment room', lighting: 'Soft candlelight, warm tones', mood: 'Relaxing, sensual', promptTemplate: 'in spa treatment room with massage table, hot stones, eucalyptus steam' },
  { id: 'hammamIndulgence', name: 'Traditional Hammam', category: 'water', description: 'Traditional Turkish hammam', lighting: 'Steam-filtered light', mood: 'Exotic, sensual', promptTemplate: 'in traditional hammam with heated marble platforms, rising steam, traditional oils' },
  { id: 'poolClubVIP', name: 'Pool Club VIP Section', category: 'water', description: 'Rooftop pool club VIP', lighting: 'Sunset glow, pool lights', mood: 'Party, glamorous', promptTemplate: 'in rooftop pool club VIP section with city skyline views' },

  // Exotic & Heritage
  { id: 'heritageHaveli', name: 'Heritage Haveli', category: 'exotic', description: 'Traditional Indian haveli', lighting: 'Filtered through jali screens', mood: 'Cultural, intimate', promptTemplate: 'in heritage Indian haveli with intricate jali screens, filtered sunlight' },
  { id: 'maharajasPalace', name: 'Maharaja\'s Palace', category: 'exotic', description: 'Opulent palace interior', lighting: 'Chandelier and candlelight', mood: 'Royal, opulent', promptTemplate: 'in opulent maharaja\'s palace with gold accents and crystal chandeliers' },
  { id: 'baroquePalaceBallroom', name: 'Baroque Palace Ballroom', category: 'exotic', description: 'Grand baroque ballroom', lighting: 'Grand chandeliers', mood: 'Dramatic, royal', promptTemplate: 'in grand baroque palace ballroom with mirrors and chandeliers' },
  { id: 'vintageOrientExpress', name: 'Vintage Orient Express', category: 'exotic', description: 'Classic train carriage', lighting: 'Warm lamp light', mood: 'Nostalgic, romantic', promptTemplate: 'in vintage Orient Express carriage with velvet seats and brass fittings' },
  { id: 'tuscanVillaPatio', name: 'Tuscan Villa Patio', category: 'exotic', description: 'Sun-drenched Tuscan villa', lighting: 'Mediterranean sunlight', mood: 'Warm, romantic', promptTemplate: 'on sun-drenched Tuscan villa patio with terracotta and olive trees' },

  // Nature & Outdoor
  { id: 'mountainCabin', name: 'Mountain Cabin', category: 'nature', description: 'Cozy mountain retreat', lighting: 'Fireplace glow, snow light', mood: 'Cozy, intimate', promptTemplate: 'in cozy mountain cabin with roaring fireplace, snow visible outside' },
  { id: 'secludedBeachSunset', name: 'Secluded Beach at Sunset', category: 'nature', description: 'Private beach at golden hour', lighting: 'Golden sunset', mood: 'Romantic, primal', promptTemplate: 'on secluded private beach at sunset, golden light on waves' },
  { id: 'secludedCabinWoods', name: 'Secluded Cabin in Woods', category: 'nature', description: 'Hidden forest cabin', lighting: 'Dappled forest light', mood: 'Private, rustic', promptTemplate: 'in secluded cabin in the woods, dappled sunlight through trees' },
  { id: 'fieldOfFlowers', name: 'Field of Flowers', category: 'nature', description: 'Endless flower field', lighting: 'Soft diffused daylight', mood: 'Dreamy, romantic', promptTemplate: 'in endless field of colorful flowers, soft diffused light' },

  // Night & Club
  { id: 'vipLounge', name: 'VIP Lounge', category: 'club', description: 'Exclusive VIP lounge', lighting: 'Dim ambient, accent lights', mood: 'Exclusive, sexy', promptTemplate: 'in exclusive VIP lounge with velvet seating and dim accent lighting' },
  { id: 'undergroundClub', name: 'Underground Club', category: 'club', description: 'Underground club venue', lighting: 'Strobes and colored lights', mood: 'Edgy, energetic', promptTemplate: 'in underground club with strobing lights and industrial decor' },
  { id: 'neonCyberpunkAlley', name: 'Neon Cyberpunk Alley', category: 'club', description: 'Futuristic neon alleyway', lighting: 'Neon signs, rain reflections', mood: 'Futuristic, edgy', promptTemplate: 'in neon-lit cyberpunk alley with rain and reflections' },
  { id: 'rainSoakedNeonAlley', name: 'Rain-Soaked Neon Alley', category: 'club', description: 'Rainy neon urban alley', lighting: 'Neon reflections in puddles', mood: 'Moody, cinematic', promptTemplate: 'in rain-soaked alley with neon signs reflecting in puddles' },
  { id: 'craftBarCounter', name: 'Craft Bar Counter', category: 'club', description: 'Upscale craft cocktail bar', lighting: 'Warm bar lighting', mood: 'Sophisticated, flirty', promptTemplate: 'at craft cocktail bar counter with warm ambient lighting' },
  { id: 'poolTableLounge', name: 'Pool Table Lounge', category: 'club', description: 'Underground pool lounge', lighting: 'Overhead pool table light', mood: 'Playful, sexy', promptTemplate: 'in underground pool table lounge with overhead focused lighting' },

  // Professional
  { id: 'modernExecutiveOffice', name: 'Modern Executive Office', category: 'professional', description: 'Sleek executive office', lighting: 'Corporate ambient lighting', mood: 'Powerful, seductive', promptTemplate: 'in modern executive office with city views and designer furniture' },
  { id: 'cornerOfficeDaytime', name: 'Corner Office (Daytime)', category: 'professional', description: 'Corner office with views', lighting: 'Natural daylight', mood: 'Professional, commanding', promptTemplate: 'in corner office during day with panoramic city views' },
  { id: 'luxuryBoardroom', name: 'Luxury Boardroom', category: 'professional', description: 'High-end corporate boardroom', lighting: 'Professional overhead lighting', mood: 'Corporate, powerful', promptTemplate: 'in luxury boardroom with long conference table and leather chairs' },
  { id: 'privateJetInterior', name: 'Private Jet Interior', category: 'professional', description: 'Luxury private jet cabin', lighting: 'Soft cabin lighting', mood: 'Exclusive, luxurious', promptTemplate: 'in private jet interior with leather seats and champagne service' },

  // Conceptual
  { id: 'infiniteWhiteVoid', name: 'Infinite White Void', category: 'conceptual', description: 'Pure white infinite space', lighting: 'Even white light', mood: 'Clean, focused', promptTemplate: 'in infinite white void, pure white background, clean studio lighting' },
  { id: 'infiniteBlackVoid', name: 'Infinite Black Void', category: 'conceptual', description: 'Pure black infinite space', lighting: 'Dramatic spot lighting', mood: 'Dramatic, mysterious', promptTemplate: 'in infinite black void, dramatic spotlight on subject' },
  { id: 'roomOfMirrors', name: 'Room of Mirrors', category: 'conceptual', description: 'Infinite mirror reflections', lighting: 'Multiple reflected lights', mood: 'Surreal, infinite', promptTemplate: 'in room of mirrors with infinite reflections' },
  { id: 'submergedInWater', name: 'Submerged in Water', category: 'conceptual', description: 'Underwater photography', lighting: 'Filtered underwater light', mood: 'Ethereal, dreamlike', promptTemplate: 'submerged in crystal clear water, hair floating, underwater photography' },
  { id: 'abstractGeometricSet', name: 'Abstract Geometric Set', category: 'conceptual', description: 'Geometric art installation', lighting: 'Dramatic geometric shadows', mood: 'Artistic, modern', promptTemplate: 'on abstract geometric art set with dramatic angular shadows' },
  { id: 'projectedUniverse', name: 'Projected Universe', category: 'conceptual', description: 'Starfield projection', lighting: 'Projected stars and galaxies', mood: 'Cosmic, dreamlike', promptTemplate: 'with projected universe and stars covering body and background' },
  { id: 'artisticCave', name: 'Artistic Cave', category: 'conceptual', description: 'Dramatic cave setting', lighting: 'Natural cave light shafts', mood: 'Primal, dramatic', promptTemplate: 'in dramatic cave with shafts of light from above' },

  // Indian Locations
  { id: 'narrowAlleyLights', name: 'Narrow Alley with Lights', category: 'indian', description: 'Old city narrow alleyway', lighting: 'String lights and moon', mood: 'Romantic, cultural', promptTemplate: 'in narrow old city alleyway with string lights and colorful doors' },
  { id: 'oldCityChandniChowk', name: 'Old City Chandni Chowk', category: 'indian', description: 'Historic Delhi market area', lighting: 'Evening market lights', mood: 'Vibrant, cultural', promptTemplate: 'in historic Chandni Chowk with evening market lights and colorful shops' },
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
