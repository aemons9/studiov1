/**
 * SEDUCTRESS POSE COLLECTION
 * 21 signature poses from the seductress preset system
 * Compatible with all generation modes: Artistic, Experimental, Corporate, Platinum, Video
 */

export interface SeductressPose {
  id: string;
  name: string;
  description: string;
  category: 'power' | 'recline' | 'dance' | 'intimate' | 'standing' | 'detail';
  intimacyLevel: number;
  mood: string[];
  technicalNotes: string;
  suitableFor: string[]; // Which modes/styles this works best with
}

export const SEDUCTRESS_POSES: SeductressPose[] = [
  {
    id: 'languid-recline',
    name: 'Languid Recline',
    description: 'Reclining languidly on a velvet chaise lounge, one hand draped delicately over her forehead, exuding an air of romantic ennui.',
    category: 'recline',
    intimacyLevel: 7,
    mood: ['Romantic', 'Languid', 'Classical'],
    technicalNotes: 'Works best with soft lighting and baroque glamour style. Classic reclining composition.',
    suitableFor: ['Artistic Mode', 'Platinum Mode', 'Video Generation', 'Imagen Archetypes']
  },

  {
    id: 'power-stare',
    name: 'Power Stare',
    description: 'Seated on a grand chair like a throne, leaning forward with elbows on knees, looking directly and intensely into the camera with a powerful, confident expression.',
    category: 'power',
    intimacyLevel: 8,
    mood: ['Dominant', 'Powerful', 'Confident'],
    technicalNotes: 'Requires low angle shot and dramatic lighting. Direct eye contact essential.',
    suitableFor: ['Corporate Mode', 'Platinum Mode', 'Imagen Archetypes', 'Video Generation']
  },

  {
    id: 'over-shoulder-glance',
    name: 'Over-the-Shoulder Glance',
    description: 'Standing with her back mostly to the camera, glancing alluringly over a bare shoulder, with a subtle, knowing smile.',
    category: 'standing',
    intimacyLevel: 7,
    mood: ['Alluring', 'Mysterious', 'Seductive'],
    technicalNotes: 'Perfect for showcasing back detail and creating mystery. Shoulder and profile emphasis.',
    suitableFor: ['Artistic Mode', 'Video Generation', 'All Modes']
  },

  {
    id: 'window-arch',
    name: 'Window Arch',
    description: 'Arching her back gracefully against a large, rain-streaked window, silhouetted against the city lights at night.',
    category: 'standing',
    intimacyLevel: 8,
    mood: ['Dramatic', 'Urban', 'Silhouette'],
    technicalNotes: 'Requires backlighting from window creating rim light effect. Urban noir aesthetic.',
    suitableFor: ['Corporate Mode', 'Video Generation', 'Imagen Archetypes']
  },

  {
    id: 'tracing-form',
    name: 'Tracing the Form',
    description: 'One hand gently tracing the curve of her own hip or collarbone, a gesture of intimate self-awareness and confidence.',
    category: 'detail',
    intimacyLevel: 9,
    mood: ['Intimate', 'Sensual', 'Self-aware'],
    technicalNotes: 'Close-up or medium shot. Emphasize hand movement and curves. Soft intimate lighting.',
    suitableFor: ['Artistic Mode', 'Platinum Mode', 'Video Generation']
  },

  {
    id: 'draped-on-desk',
    name: 'Draped on Desk',
    description: 'Lying across a large, polished executive desk at night, surrounded by the soft glow of a desk lamp, a picture of corporate power and sensuality.',
    category: 'recline',
    intimacyLevel: 9,
    mood: ['Corporate', 'Sensual', 'Power'],
    technicalNotes: 'Desk lamp provides moody lighting. Executive environment essential.',
    suitableFor: ['Corporate Mode', 'Imagen Archetypes', 'Video Generation']
  },

  {
    id: 'bed-sheet-drape',
    name: 'Bed Sheet Drape',
    description: 'Sitting up in a messy bed, with a white silk sheet draped artfully around her form, concealing and revealing in equal measure.',
    category: 'recline',
    intimacyLevel: 8,
    mood: ['Intimate', 'Boudoir', 'Morning'],
    technicalNotes: 'Soft natural window light. Focus on fabric draping and suggestion.',
    suitableFor: ['Artistic Mode', 'Platinum Mode', 'Video Generation']
  },

  {
    id: 'pulling-stocking',
    name: 'Pulling on Stocking',
    description: 'Seated on the edge of a bed, captured in the act of slowly pulling on a sheer stocking, a classic and timelessly evocative pose.',
    category: 'detail',
    intimacyLevel: 7,
    mood: ['Classic', 'Intimate', 'Pin-up'],
    technicalNotes: 'Medium shot capturing leg detail and stocking texture. Classic boudoir lighting.',
    suitableFor: ['Artistic Mode', 'Platinum Mode', 'All Modes']
  },

  {
    id: 'car-interior',
    name: 'Car Interior',
    description: 'Seated in the passenger seat of a vintage luxury car, looking back at the camera, illuminated by passing streetlights.',
    category: 'standing',
    intimacyLevel: 7,
    mood: ['Cinematic', 'Urban', 'Noir'],
    technicalNotes: 'Moving light sources creating dynamic lighting. Vintage car aesthetic.',
    suitableFor: ['Video Generation', 'Imagen Archetypes', 'Artistic Mode']
  },

  {
    id: 'mirror-reflection',
    name: 'Mirror Reflection',
    description: 'Looking at her own reflection in an ornate, vintage mirror, with the camera capturing both her and her reflection, creating a dual portrait of introspection and allure.',
    category: 'standing',
    intimacyLevel: 8,
    mood: ['Introspective', 'Mysterious', 'Layered'],
    technicalNotes: 'Complex composition with reflection. Requires precise camera angle.',
    suitableFor: ['Artistic Mode', 'Platinum Mode', 'All Modes']
  },

  {
    id: 'kneeling-back-arch',
    name: 'Kneeling Back-Arch',
    description: 'Kneeling on a plush rug, arching her back to create a dramatic, sculptural S-curve with her spine, head tilted back.',
    category: 'dance',
    intimacyLevel: 9,
    mood: ['Sculptural', 'Dramatic', 'Artistic'],
    technicalNotes: 'Emphasize spine curve and sculptural form. Dramatic side or rim lighting.',
    suitableFor: ['Artistic Mode', 'Imagen Archetypes', 'Video Generation']
  },

  {
    id: 'lounging-fireplace',
    name: 'Lounging by Fireplace',
    description: 'Lying on her side on a bearskin rug in front of a crackling fireplace, propped up on one elbow, gazing into the flames.',
    category: 'recline',
    intimacyLevel: 8,
    mood: ['Intimate', 'Warm', 'Romantic'],
    technicalNotes: 'Firelight provides warm dramatic lighting. Natural relaxed pose.',
    suitableFor: ['Platinum Mode', 'Artistic Mode', 'Video Generation']
  },

  {
    id: 'balcony-silhouette',
    name: 'Balcony Silhouette',
    description: 'Standing on a high-rise balcony at twilight, her form silhouetted against the fading city skyline, creating a sense of mystery and urban romance.',
    category: 'standing',
    intimacyLevel: 7,
    mood: ['Mysterious', 'Urban', 'Silhouette'],
    technicalNotes: 'Backlighting from city skyline. Silhouette composition with rim light.',
    suitableFor: ['Corporate Mode', 'Video Generation', 'Imagen Archetypes']
  },

  {
    id: 'dominant-stand',
    name: 'Dominant Stand',
    description: 'Standing with legs slightly apart, hands on hips, looking down towards the camera with a commanding and dominant expression.',
    category: 'power',
    intimacyLevel: 8,
    mood: ['Dominant', 'Powerful', 'Commanding'],
    technicalNotes: 'Low angle shot essential to emphasize power. Strong direct gaze.',
    suitableFor: ['Corporate Mode', 'Platinum Mode', 'All Modes']
  },

  {
    id: 'bathtub-recline',
    name: 'Bathtub Recline',
    description: 'Reclining in a vintage claw-foot bathtub filled with milky water and rose petals, eyes closed in a state of blissful serenity.',
    category: 'recline',
    intimacyLevel: 9,
    mood: ['Serene', 'Luxurious', 'Intimate'],
    technicalNotes: 'Soft diffused lighting. Water surface and petals add texture.',
    suitableFor: ['Platinum Mode', 'Artistic Mode', 'Video Generation']
  },

  {
    id: 'unveiling-glance',
    name: 'Unveiling Glance',
    description: 'Partially obscured behind a sheer silk curtain, peering through with one eye, creating a sense of voyeuristic intimacy.',
    category: 'detail',
    intimacyLevel: 8,
    mood: ['Mysterious', 'Voyeuristic', 'Intimate'],
    technicalNotes: 'Sheer fabric texture essential. Eye contact through fabric.',
    suitableFor: ['Artistic Mode', 'Platinum Mode', 'All Modes']
  },

  {
    id: 'lipstick-application',
    name: 'Lipstick Application',
    description: 'A close-up shot as she meticulously applies a bold, red lipstick while looking in a compact mirror, a moment of intimate ritual.',
    category: 'detail',
    intimacyLevel: 6,
    mood: ['Intimate', 'Glamorous', 'Ritual'],
    technicalNotes: 'Extreme close-up. Beauty lighting. Focus on lips and compact mirror.',
    suitableFor: ['Platinum Mode', 'Corporate Mode', 'Video Generation']
  },

  {
    id: 'dancers-arch',
    name: 'Dancer\'s Arch',
    description: 'A pose inspired by ballet, with one leg extended and back arched, showcasing flexibility and a powerful, graceful line.',
    category: 'dance',
    intimacyLevel: 8,
    mood: ['Athletic', 'Graceful', 'Powerful'],
    technicalNotes: 'Emphasize athletic form and extension. Clean professional lighting.',
    suitableFor: ['Artistic Mode', 'Video Generation', 'Imagen Archetypes']
  },

  {
    id: 'lounging-armchair',
    name: 'Lounging in Armchair',
    description: 'Curled up in a large, comfortable armchair, one leg tucked under her, reading a book under a soft floor lamp.',
    category: 'recline',
    intimacyLevel: 6,
    mood: ['Relaxed', 'Intimate', 'Cozy'],
    technicalNotes: 'Soft ambient lighting from floor lamp. Natural relaxed positioning.',
    suitableFor: ['Platinum Mode', 'Artistic Mode', 'All Modes']
  },

  {
    id: 'adjusting-garter',
    name: 'Adjusting Garter',
    description: 'A candid-style shot capturing the moment of adjusting a garter on a stocking, a classic pin-up and boudoir trope.',
    category: 'detail',
    intimacyLevel: 8,
    mood: ['Classic', 'Pin-up', 'Candid'],
    technicalNotes: 'Medium shot focusing on leg detail. Classic boudoir lighting.',
    suitableFor: ['Platinum Mode', 'Artistic Mode', 'Video Generation']
  },

  {
    id: 'pinning-hair',
    name: 'Pinning Up Hair',
    description: 'Captured from behind, as she pins up her long hair in front of a vanity mirror, her bare back and shoulders the focus of the composition.',
    category: 'detail',
    intimacyLevel: 7,
    mood: ['Intimate', 'Elegant', 'Back-focused'],
    technicalNotes: 'Back view emphasizing shoulders and spine. Mirror reflection optional.',
    suitableFor: ['Artistic Mode', 'Platinum Mode', 'All Modes']
  }
];

/**
 * Get poses by intimacy level
 */
export function getPosesByIntimacyLevel(level: number): SeductressPose[] {
  return SEDUCTRESS_POSES.filter(pose => pose.intimacyLevel === level);
}

/**
 * Get poses by category
 */
export function getPosesByCategory(category: string): SeductressPose[] {
  return SEDUCTRESS_POSES.filter(pose => pose.category === category);
}

/**
 * Get poses suitable for a specific mode
 */
export function getPosesForMode(mode: string): SeductressPose[] {
  return SEDUCTRESS_POSES.filter(pose =>
    pose.suitableFor.includes(mode) || pose.suitableFor.includes('All Modes')
  );
}

/**
 * Get poses by mood
 */
export function getPosesByMood(mood: string): SeductressPose[] {
  return SEDUCTRESS_POSES.filter(pose =>
    pose.mood.some(m => m.toLowerCase().includes(mood.toLowerCase()))
  );
}

/**
 * Get all power poses (for corporate/executive themes)
 */
export function getPowerPoses(): SeductressPose[] {
  return getPosesByCategory('power');
}

/**
 * Get all reclining poses (for boudoir/intimate themes)
 */
export function getReclinePoses(): SeductressPose[] {
  return getPosesByCategory('recline');
}

/**
 * Get all dance/athletic poses
 */
export function getDancePoses(): SeductressPose[] {
  return getPosesByCategory('dance');
}

/**
 * Get detail/close-up poses
 */
export function getDetailPoses(): SeductressPose[] {
  return getPosesByCategory('detail');
}

/**
 * Get random pose by intimacy level
 */
export function getRandomPoseByIntimacy(level: number): SeductressPose | undefined {
  const poses = getPosesByIntimacyLevel(level);
  if (poses.length === 0) return undefined;
  return poses[Math.floor(Math.random() * poses.length)];
}

/**
 * Get random pose for mode
 */
export function getRandomPoseForMode(mode: string): SeductressPose | undefined {
  const poses = getPosesForMode(mode);
  if (poses.length === 0) return undefined;
  return poses[Math.floor(Math.random() * poses.length)];
}
