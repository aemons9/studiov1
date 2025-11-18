/**
 * INSTAGRAM INFLUENCER MODEL VARIANTS
 *
 * Pre-configured Instagram influencer model variants for main mode.
 * Based on viral bedroom mirror selfie aesthetics with Indian models.
 */

export interface InstagramInfluencerVariant {
  id: string;
  name: string;
  displayName: string;
  description: string;
  measurements: {
    bust: string;
    waist: string;
    hips: string;
  };
  height: string;
  intimacyRange: [number, number];
  viralPotential: 'High' | 'Very High' | 'Extreme';
  category: string;
  hashtags: string[];
}

/**
 * VARIANT 1: Bedroom Mirror Selfie Queen (36-26-38)
 * The viral Instagram influencer with classic mirror selfie aesthetic
 */
export const BEDROOM_MIRROR_QUEEN: InstagramInfluencerVariant = {
  id: 'instagram_bedroom_mirror_36-26-38',
  name: 'Bedroom Mirror Selfie Queen',
  displayName: 'Bedroom Mirror Selfie Queen (36-26-38)',
  description: 'Viral Instagram influencer specializing in bedroom mirror selfies with bold confidence and aspirational glamour.',
  measurements: {
    bust: '36D"',
    waist: '26"',
    hips: '38"'
  },
  height: '5\'7"',
  intimacyRange: [7, 10],
  viralPotential: 'Extreme',
  category: 'Instagram Viral Influencer - Mirror Selfie Specialist',
  hashtags: ['#MirrorSelfie', '#BoldConfidence', '#InstagramGlam', '#InfluencerLife', '#VeraLabs']
};

/**
 * VARIANT 2: College Lifestyle Influencer (34-25-36)
 * Relatable college girl with bold confidence and accessible glamour
 */
export const COLLEGE_LIFESTYLE: InstagramInfluencerVariant = {
  id: 'instagram_college_lifestyle_34-25-36',
  name: 'College Lifestyle Influencer',
  displayName: 'College Lifestyle Influencer (34-25-36)',
  description: 'Fresh college girl vibe with bold confidence, relatable yet stunning for viral Instagram appeal.',
  measurements: {
    bust: '34C"',
    waist: '25"',
    hips: '36"'
  },
  height: '5\'6"',
  intimacyRange: [6, 8],
  viralPotential: 'Very High',
  category: 'Instagram College Girl - Relatable Confidence Specialist',
  hashtags: ['#CollegeLife', '#FresherVibes', '#BoldAndConfident', '#DesiGirl', '#CampusQueen']
};

/**
 * VARIANT 3: Bollywood Glam Influencer (36-24-36)
 * Movie star glamour with dramatic confidence and cinematic presence
 */
export const BOLLYWOOD_GLAM: InstagramInfluencerVariant = {
  id: 'instagram_bollywood_glam_36-24-36',
  name: 'Bollywood Glam Influencer',
  displayName: 'Bollywood Glam Influencer (36-24-36)',
  description: 'Bollywood actress aesthetic with movie star glamour and aspirational lifestyle content.',
  measurements: {
    bust: '36C"',
    waist: '24"',
    hips: '36"'
  },
  height: '5\'8"',
  intimacyRange: [8, 10],
  viralPotential: 'Extreme',
  category: 'Instagram Bollywood Roleplay - Actress Aesthetic Specialist',
  hashtags: ['#BollywoodGlam', '#ActressVibes', '#DramaticBeauty', '#CinematicLife', '#MovieStarStyle']
};

/**
 * VARIANT 4: Morning Routine Influencer (35-26-37)
 * Intimate lifestyle content with natural beauty and authentic morning moments
 */
export const MORNING_ROUTINE: InstagramInfluencerVariant = {
  id: 'instagram_morning_routine_35-26-37',
  name: 'Morning Routine Influencer',
  displayName: 'Morning Routine Influencer (35-26-37)',
  description: 'Intimate morning routine content celebrating natural beauty and authentic lifestyle moments.',
  measurements: {
    bust: '35C"',
    waist: '26"',
    hips: '37"'
  },
  height: '5\'7"',
  intimacyRange: [7, 9],
  viralPotential: 'Very High',
  category: 'Instagram Morning Routine - Intimate Lifestyle Specialist',
  hashtags: ['#MorningRoutine', '#NaturalBeauty', '#LifestyleContent', '#AuthenticMoments', '#MorningGlow']
};

/**
 * All Instagram Influencer Variants
 */
export const INSTAGRAM_INFLUENCER_VARIANTS: InstagramInfluencerVariant[] = [
  BEDROOM_MIRROR_QUEEN,
  COLLEGE_LIFESTYLE,
  BOLLYWOOD_GLAM,
  MORNING_ROUTINE
];
