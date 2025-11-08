// Corporate Roles Enumeration
export type CorporateRole = 
  | 'chief_executive'
  | 'board_member' 
  | 'personal_secretary'
  | 'hr_executive'
  | 'design_executive'
  | 'government_official'
  | 'lawyer';

// Office Environment Types
export type OfficeEnvironmentType =
  | 'corporation_mnc'
  | 'hotel_chain'
  | 'real_estate'
  | 'entertainment'
  | 'nightclub_chain'
  | 'government'
  | 'head_of_state';

// Intimacy Calibration Levels
export type ArtisticExplicitness = 
  | 'minimal'
  | 'suggestive' 
  | 'revealing'
  | 'artistically_explicit';

export type PowerDynamic = 
  | 'submissive'
  | 'balanced'
  | 'dominant';

// Corporate State Interface
export interface CorporatePowerState {
  // Core Selections
  selectedRole: CorporateRole;
  selectedEnvironment: OfficeEnvironmentType;
  
  // Intimacy Configuration
  intimacyCalibration: {
    level: number; // 1-10 scale
    artisticExplicitness: ArtisticExplicitness;
    powerDynamic: PowerDynamic;
  };
  
  // Model Variants
  modelVariants: {
    measurements: {
      bust: string;
      waist: string; 
      hips: string;
    };
    skinTone: 'fair' | 'wheatish' | 'dusky' | 'ebony';
    mood: 'authoritative' | 'seductive' | 'intellectual' | 'playful' | 'commanding';
  };
  
  // Generation Settings
  generationSettings: {
    safetyProfile: 'corporate_conservative' | 'editorial_balanced' | 'artistic_progressive';
    qualityPreset: 'editorial' | 'gallery' | 'masterpiece';
    modelOptimization: 'imagen_office' | 'flux_corporate';
    batchGeneration: boolean;
    styleTransfer: boolean;
  };
}

// Role Profile Definitions
export interface CorporateRoleProfile {
  role: CorporateRole;
  powerLevel: number; // 1-10
  sensualityStyle: 'authoritative' | 'manipulative' | 'subversive' | 'intellectual' | 'bureaucratic' | 'legal' | 'creative';
  wardrobeSignature: string;
  environmentPreferences: string[];
  powerPoses: string[];
  corporateProps: string[];
}

// Office Environment Definitions  
export interface OfficeEnvironment {
  type: OfficeEnvironmentType;
  luxuryLevel: number; // 1-10
  privacyLevel: number; // 1-10
  aesthetic: string;
  exclusiveSpaces: string[];
  lightingProfiles: string[];
  materialPalette: string[];
}