/**
 * INDIAN ROLE-PLAY MODE - MIDNIGHT ENCOUNTERS
 *
 * 9 pre-built role-playing scenarios with gamified elements
 * Each based on one of the 9 specialized Indian glamour models
 * Realistic natural environments with midnight themes
 */

import { PromptData } from '../types';

export interface RolePlayScenario {
  id: string;
  name: string;
  modelId: string;
  modelName: string;
  theme: string;
  environment: string;
  scenario: string;
  intimacyLevel: number;
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  gameElements: {
    objective: string;
    progressionSteps: string[];
    rewards: string[];
    challenges: string[];
  };
  promptTemplate: string;
  safetyTolerance: number;
  aspectRatio: '4:5' | '9:16' | '16:9' | '1:1';
}

export const ROLEPLAY_SCENARIOS: RolePlayScenario[] = [
  // ============================================================================
  // SCENARIO 1: EXECUTIVE MIDNIGHT MEETING (Aisha Décolletage)
  // ============================================================================
  {
    id: 'roleplay-001',
    name: 'Executive Midnight Meeting',
    modelId: 'erotic-model-001',
    modelName: 'Aisha Décolletage',
    theme: 'Corporate After-Hours Seduction',
    environment: 'Private Luxury Office - Midnight City Views',
    scenario: 'You\'ve been called to a midnight meeting at the CEO\'s private office. The city lights glimmer through floor-to-ceiling windows as Aisha, the powerful executive, greets you in surprisingly minimal attire beneath her designer blazer. The tension is palpable as she discusses "special performance reviews".',
    intimacyLevel: 10,
    difficultyLevel: 'expert',
    gameElements: {
      objective: 'Navigate the power dynamics of a midnight executive encounter while maintaining professional sophistication',
      progressionSteps: [
        'Initial formal greeting with subtle tension',
        'Discussion of "performance metrics" with increasing intimacy',
        'Power shift as executive reveals vulnerability',
        'Mutual seductive confidence emerges',
        'Ultimate intimate executive encounter'
      ],
      rewards: [
        'Unlock "Power Executive" wardrobe variations',
        'Gain access to luxury office environments',
        'Earn "Corporate Seduction Master" achievement'
      ],
      challenges: [
        'Maintain professional framing while increasing intimacy',
        'Balance power dynamics in dialogue',
        'Navigate safety filters with corporate language'
      ]
    },
    promptTemplate: `Midnight corporate photography. Executive after-hours encounter. Intimacy 10/10. Power seduction dynamics. subject: variant: Indian upper body reveal specialist Aisha Décolletage (height 5'10"). Voluptuous upper-focused hourglass figure. Bust 40DD", waist 27", hips 38". Warm honey complexion with golden undertones. Professional executive with commanding presence. pose: {ROLEPLAY_POSE} with executive sophistication and midnight seductive confidence. hair_color: jet black, hair_style: Professional executive styling with strategic loose strands for midnight intimacy, skin_finish: Luminous executive glow with golden honey radiance, hand_and_nail_details: Executive manicure with seductive hand positioning, tattoos: none, piercings: none, body_art: none, nail_art: Bold red executive polish, high_heels: Designer executive stilettos. wardrobe: {ROLEPLAY_WARDROBE} with executive minimalist aesthetic and maximum upper body artistic reveals. environment: Private luxury office with floor-to-ceiling windows, midnight city views, leather executive furniture, dramatic desk lighting creating intimate atmosphere. Privacy 10/10, luxury 9/10. lighting: Dramatic midnight desk lamp with city lights ambient glow, intimate executive shadows. camera: focal_length: 85mm, aperture: f/1.4, distance: 2m, angle: {ROLEPLAY_ANGLE}, framing: {ROLEPLAY_FRAMING} emphasizing executive seductive power. style: Corporate midnight seduction. Fine art executive intimacy. Personal photographer: Dante Révélation, 10/10 intimacy.`,
    safetyTolerance: 6,
    aspectRatio: '4:5'
  },

  // ============================================================================
  // SCENARIO 2: MIDNIGHT POOLSIDE ENCOUNTER (Priya Curves)
  // ============================================================================
  {
    id: 'roleplay-002',
    name: 'Midnight Poolside Temptation',
    modelId: 'erotic-model-002',
    modelName: 'Priya Curves',
    theme: 'Late Night Pool Club Seduction',
    environment: 'Luxury Rooftop Pool - Midnight Ambiance',
    scenario: 'The exclusive rooftop pool is closed to everyone except VIPs. Priya, known for her spectacular curves, invited you for a "private swim" at midnight. The pool lights create mesmerizing reflections on the water as she emerges, her curves glistening with water droplets.',
    intimacyLevel: 10,
    difficultyLevel: 'advanced',
    gameElements: {
      objective: 'Build sensual tension through poolside midnight atmosphere and curve celebration',
      progressionSteps: [
        'Arrival at exclusive midnight pool',
        'Poolside conversation building tension',
        'Water-enhanced curve emphasis moments',
        'Intimate positioning by pool edge',
        'Ultimate midnight poolside seduction'
      ],
      rewards: [
        'Unlock "Poolside Siren" wardrobe set',
        'Access rooftop luxury environments',
        'Achievement: "Curve Worship Master"'
      ],
      challenges: [
        'Maintain natural wet fabric physics',
        'Balance water environment with intimacy',
        'Emphasize curves artistically'
      ]
    },
    promptTemplate: `Midnight poolside photography. Late-night pool seduction. Intimacy 10/10. Curve celebration dynamics. subject: variant: Indian lower body curves specialist Priya Curves (height 5'8"). Dramatically curved pear-shaped goddess. Bust 36C", waist 26", hips 46". Deep dusky complexion with rich warm tones. Specialist in hip emphasis and curve celebration. pose: {ROLEPLAY_POSE} with poolside positioning emphasizing spectacular curves and midnight confidence. hair_color: jet black, hair_style: Wet poolside styling with natural volume and water-enhanced drama, skin_finish: Glistening dusky skin with water droplets and natural radiance, hand_and_nail_details: Wet elegant positioning emphasizing curve lines, tattoos: none, piercings: none, body_art: none, nail_art: Deep burgundy waterproof polish, high_heels: None - barefoot poolside elegance. wardrobe: {ROLEPLAY_WARDROBE} with minimal wet aesthetic emphasizing curves and poolside midnight artistry. environment: Luxury rooftop pool with underwater lights, midnight city skyline views, lounge chairs, intimate privacy. Privacy 10/10, luxury 9/10. lighting: Pool lights creating upward dramatic glow, midnight ambient darkness with city lights background. camera: focal_length: 70mm, aperture: f/2.0, distance: 2.5m, angle: {ROLEPLAY_ANGLE}, framing: {ROLEPLAY_FRAMING} celebrating curve magnificence. style: Midnight poolside seduction. Curve worship photography. Personal photographer: Lorenzo Curvas, 10/10 intimacy.`,
    safetyTolerance: 6,
    aspectRatio: '9:16'
  },

  // ============================================================================
  // SCENARIO 3: PENTHOUSE BALCONY ENCOUNTER (Meera Sensualité)
  // ============================================================================
  {
    id: 'roleplay-003',
    name: 'Penthouse Balcony Midnight',
    modelId: 'erotic-model-003',
    modelName: 'Meera Sensualité',
    theme: 'Luxury Penthouse Midnight Romance',
    environment: 'Penthouse Balcony - City Lights Below',
    scenario: 'Invited to an exclusive penthouse party that has wound down, you find yourself alone with Meera on the expansive balcony. The cool midnight air contrasts with her warm presence as she leans against the railing, city lights twinkling below, creating an intimate atmosphere high above the world.',
    intimacyLevel: 10,
    difficultyLevel: 'intermediate',
    gameElements: {
      objective: 'Create balanced sensual connection in luxury elevated setting with complete form celebration',
      progressionSteps: [
        'Quiet penthouse party wind-down',
        'Private balcony conversation emergence',
        'Midnight air and tension building',
        'Intimate positioning at balcony edge',
        'Complete sensual midnight encounter'
      ],
      rewards: [
        'Unlock "Penthouse Luxury" environment set',
        'Access "Balanced Glamour" wardrobes',
        'Achievement: "Midnight Romance Master"'
      ],
      challenges: [
        'Balance outdoor midnight atmosphere',
        'Maintain complete form emphasis',
        'Create natural elevated intimacy'
      ]
    },
    promptTemplate: `Midnight balcony photography. Penthouse luxury romance. Intimacy 10/10. Balanced sensual dynamics. subject: variant: Indian overall sensual glamour specialist Meera Sensualité (height 5'9"). Perfect hourglass with balanced proportions. Bust 38D", waist 26", hips 40". Warm caramel complexion with golden highlights. Complete form celebration specialist. pose: {ROLEPLAY_POSE} with balcony positioning emphasizing balanced curves and midnight sophisticated confidence. hair_color: jet black, hair_style: Midnight breeze-tousled dramatic waves with natural sophisticated volume, skin_finish: Warm caramel glow with midnight city lights reflection creating luminosity, hand_and_nail_details: Elegant balcony railing positioning with graceful confidence, tattoos: none, piercings: none, body_art: none, nail_art: Deep ruby midnight polish with luxury finish, high_heels: Designer luxury heels suitable for balcony elegance. wardrobe: {ROLEPLAY_WARDROBE} with luxury balanced aesthetic and complete form artistic reveals. environment: Luxury penthouse balcony with glass railings, expansive city views below, midnight skyline, comfortable outdoor furniture, ultimate privacy. Privacy 10/10, luxury 10/10. lighting: Cool midnight moonlight with warm city lights from below creating balanced dramatic glow. camera: focal_length: 50mm, aperture: f/1.8, distance: 3m, angle: {ROLEPLAY_ANGLE}, framing: {ROLEPLAY_FRAMING} emphasizing complete balanced form. style: Penthouse midnight romance. Balanced sensual artistry. Personal photographer: Rafael Sensualité, 10/10 intimacy.`,
    safetyTolerance: 6,
    aspectRatio: '4:5'
  },

  // ============================================================================
  // SCENARIO 4: FILM SET AFTER HOURS (Zara Cinématique)
  // ============================================================================
  {
    id: 'roleplay-004',
    name: 'Film Set Midnight Rehearsal',
    modelId: 'erotic-model-004',
    modelName: 'Zara Cinématique',
    theme: 'After-Hours Film Set Intimate Scene',
    environment: 'Professional Film Set - Midnight Rehearsal',
    scenario: 'The crew has left for the night, but Zara, the method actress, insists on rehearsing the intimate scene one more time. The empty film set feels charged with dramatic tension as she suggests "getting deeper into character" for the midnight rehearsal. The camera equipment stands ready, lights dimmed to intimate levels.',
    intimacyLevel: 10,
    difficultyLevel: 'expert',
    gameElements: {
      objective: 'Navigate method acting approach to intimate scene with narrative depth and emotional vulnerability',
      progressionSteps: [
        'Script reading with increasing intensity',
        'Physical blocking with intimate positioning',
        '"Character study" deepening connection',
        'Emotional vulnerability breakthrough',
        'Method acting ultimate intimate scene'
      ],
      rewards: [
        'Unlock "Film Noir" cinematic environments',
        'Access "Method Acting" narrative wardrobes',
        'Achievement: "Cinematic Seduction Director"'
      ],
      challenges: [
        'Maintain film quality narrative framing',
        'Balance dramatic lighting with intimacy',
        'Create authentic emotional depth'
      ]
    },
    promptTemplate: `Midnight film set photography. After-hours intimate rehearsal. Intimacy 10/10. Method acting dynamics. subject: variant: Indian erotic-art film specialist Zara Cinématique (height 5'7"). Versatile actress physique with dramatic curves. Bust 38DD", waist 27", hips 39". Fair complexion with dramatic lighting potential. Method acting specialist with emotional range. pose: {ROLEPLAY_POSE} with cinematic character embodiment and dramatic midnight vulnerability. hair_color: jet black, hair_style: Character-driven midnight rehearsal styling with dramatic sophistication, skin_finish: Fair skin with dramatic film set lighting creating character depth, hand_and_nail_details: Expressive method acting gestures with emotional narrative depth, tattoos: none, piercings: none, body_art: none, nail_art: Character-appropriate dramatic polish, high_heels: Film-appropriate character heels. wardrobe: {ROLEPLAY_WARDROBE} with cinematic character aesthetic and narrative intimate reveals. environment: Professional film set after hours with practical lighting, camera equipment visible, midnight creative atmosphere, intimate set design. Privacy 10/10, luxury 8/10. lighting: Dramatic film set practical lights creating cinematic shadows and midnight rehearsal mood. camera: focal_length: 35mm, aperture: f/2.0, distance: 2m, angle: {ROLEPLAY_ANGLE}, framing: {ROLEPLAY_FRAMING} with film-quality narrative composition. style: Cinematic midnight rehearsal. Method acting intimacy. Personal photographer: Marcello Eros, 10/10 intimacy.`,
    safetyTolerance: 6,
    aspectRatio: '16:9'
  },

  // ============================================================================
  // SCENARIO 5: PRIVATE GYM MIDNIGHT SESSION (Kavya Athléa)
  // ============================================================================
  {
    id: 'roleplay-005',
    name: 'Midnight Gym Personal Training',
    modelId: 'erotic-model-005',
    modelName: 'Kavya Athléa',
    theme: 'After-Hours Athletic Training Seduction',
    environment: 'Private Luxury Gym - Midnight Session',
    scenario: 'Kavya, the renowned fitness model, offers you a "special midnight training session" at her exclusive private gym. The facility is empty, mirrors reflecting every angle as she demonstrates increasingly intimate "stretching techniques" while her athletic curves glisten with effort.',
    intimacyLevel: 9,
    difficultyLevel: 'advanced',
    gameElements: {
      objective: 'Build fitness-based seductive tension through athletic positioning and natural curved strength',
      progressionSteps: [
        'Professional training introduction',
        'Increasingly intimate exercise guidance',
        'Physical contact "form correction"',
        'Athletic curves emphasis positioning',
        'Ultimate midnight fitness seduction'
      ],
      rewards: [
        'Unlock "Athletic Glamour" wardrobe variants',
        'Access private gym environments',
        'Achievement: "Fitness Seduction Coach"'
      ],
      challenges: [
        'Maintain athletic natural aesthetic',
        'Balance fitness activity with sensuality',
        'Emphasize curved athletic definition'
      ]
    },
    promptTemplate: `Midnight athletic photography. Private gym training seduction. Intimacy 9/10. Fitness glamour dynamics. subject: variant: Indian natural athletic glamour specialist Kavya Athléa (height 5'11"). Athletic hourglass with muscular definition. Bust 36C", waist 25", hips 38". Sun-kissed bronze with athletic glow. Fitness curves specialist. pose: {ROLEPLAY_POSE} with athletic training positioning emphasizing fitness curves and midnight confident strength. hair_color: jet black, hair_style: Athletic midnight training style with natural fitness elegance, skin_finish: Bronze athletic skin with natural training glow and healthy radiance, hand_and_nail_details: Athletic positioning with fitness confidence and natural strength, tattoos: none, piercings: none, body_art: none, nail_art: Natural athletic polish with organic elegance, high_heels: None - athletic barefoot training authenticity. wardrobe: {ROLEPLAY_WARDROBE} with athletic fitness aesthetic and natural curved athletic reveals. environment: Private luxury gym with professional equipment, floor mirrors, midnight empty facility, intimate training atmosphere. Privacy 10/10, luxury 9/10. lighting: Clean gym lighting with dramatic shadows emphasizing athletic definition and midnight training mood. camera: focal_length: 70mm, aperture: f/2.8, distance: 2.5m, angle: {ROLEPLAY_ANGLE}, framing: {ROLEPLAY_FRAMING} celebrating athletic curves. style: Midnight fitness seduction. Athletic glamour artistry. Personal photographer: Santiago Athléa, 10/10 intimacy.`,
    safetyTolerance: 5,
    aspectRatio: '9:16'
  },

  // ============================================================================
  // SCENARIO 6: LUXURY HOTEL SUITE MIDNIGHT (Ishani Glamazon)
  // ============================================================================
  {
    id: 'roleplay-006',
    name: 'Five-Star Suite Midnight Glamour',
    modelId: 'erotic-model-006',
    modelName: 'Ishani Glamazon',
    theme: 'Ultimate Luxury Hotel Suite Encounter',
    environment: 'Presidential Suite - Maximum Luxury',
    scenario: 'Ishani, the ultimate glamour icon, has invited you to her presidential suite for "champagne and conversation". The suite is pure luxury - marble, gold accents, silk everywhere. She greets you draped in golden chains that leave little to imagination, her commanding presence filling the opulent space.',
    intimacyLevel: 10,
    difficultyLevel: 'expert',
    gameElements: {
      objective: 'Match the ultra-luxury glamour energy while celebrating maximum bold confidence',
      progressionSteps: [
        'Grand suite entrance with luxury atmosphere',
        'Champagne toast with glamorous conversation',
        'Increasing boldness and luxury reveals',
        'Maximum glamour confidence expression',
        'Ultimate luxury glamour encounter'
      ],
      rewards: [
        'Unlock "Maximum Glamour" luxury wardrobes',
        'Access presidential suite environments',
        'Achievement: "Glamour Diva Master"'
      ],
      challenges: [
        'Maintain ultra-luxury aesthetic',
        'Balance maximum glamour with artistic taste',
        'Create commanding bold presence'
      ]
    },
    promptTemplate: `Midnight luxury photography. Presidential suite maximum glamour. Intimacy 10/10. Bold commanding dynamics. subject: variant: Indian maximum glamour diva specialist Ishani Glamazon (height 5'9"). Perfect glamorous hourglass with commanding presence. Bust 38DD", waist 25", hips 40". Luminous fair complexion with golden glamour glow. Maximum glamour specialist. pose: {ROLEPLAY_POSE} with commanding glamorous power and midnight bold confidence. hair_color: jet black, hair_style: Dramatic luxury glamour styling with maximum sophisticated volume, skin_finish: Luminous golden glamour glow with premium radiance, hand_and_nail_details: Luxury positioning with bold glamorous confidence, tattoos: none, piercings: none, body_art: none, nail_art: Golden luxury polish with maximum glamour, high_heels: Designer luxury stilettos with architectural glamour details. wardrobe: {ROLEPLAY_WARDROBE} with ultra-luxury glamour aesthetic and maximum bold artistic reveals. environment: Presidential hotel suite with marble surfaces, golden accents, silk furnishings, floor-to-ceiling windows with midnight city views, ultimate luxury. Privacy 10/10, luxury 10/10. lighting: Dramatic luxury lighting with golden highlights creating maximum glamour glow. camera: focal_length: 50mm, aperture: f/1.4, distance: 2.5m, angle: {ROLEPLAY_ANGLE}, framing: {ROLEPLAY_FRAMING} emphasizing glamorous commanding presence. style: Ultimate luxury glamour. Maximum bold sophistication. Personal photographer: Alessandro Lusso, 10/10 intimacy.`,
    safetyTolerance: 6,
    aspectRatio: '4:5'
  },

  // ============================================================================
  // SCENARIO 7: UNDERGROUND CLUB VIP ROOM (Maya Midnight)
  // ============================================================================
  {
    id: 'roleplay-007',
    name: 'Underground Club VIP Seduction',
    modelId: 'erotic-model-007',
    modelName: 'Maya Midnight',
    theme: 'Mysterious Underground Club Encounter',
    environment: 'Exclusive Underground Club - VIP Room',
    scenario: 'The exclusive underground club pulses with music below, but Maya has led you to the private VIP room - a dark, luxurious space where the bass vibrates through velvet furniture. She\'s a mysterious figure in shadows, her enigmatic smile promising secrets as she closes the soundproof door.',
    intimacyLevel: 10,
    difficultyLevel: 'expert',
    gameElements: {
      objective: 'Navigate mysterious midnight energy with shadowy seduction and enigmatic allure',
      progressionSteps: [
        'Mysterious VIP room entrance',
        'Shadow-play conversation with mystery',
        'Gradual enigmatic reveals',
        'Dark sensual positioning',
        'Ultimate mysterious midnight seduction'
      ],
      rewards: [
        'Unlock "Midnight Mystery" dark wardrobes',
        'Access underground club environments',
        'Achievement: "Shadow Seduction Master"'
      ],
      challenges: [
        'Maintain mysterious shadowy aesthetic',
        'Balance darkness with visibility',
        'Create enigmatic midnight atmosphere'
      ]
    },
    promptTemplate: `Midnight underground photography. VIP room mysterious seduction. Intimacy 10/10. Enigmatic shadow dynamics. subject: variant: Indian midnight mystique seductress specialist Maya Midnight (height 5'8"). Mysteriously curved seductive silhouette. Bust 36D", waist 24", hips 37". Deep mocha with mysterious dark undertones. Midnight seduction specialist. pose: {ROLEPLAY_POSE} with mysterious shadowy positioning and enigmatic midnight allure. hair_color: jet black, hair_style: Mysterious midnight club styling with shadowy dramatic volume, skin_finish: Deep mocha with mysterious shadows and dark enigmatic glow, hand_and_nail_details: Enigmatic gestures with mysterious seductive positioning, tattoos: none, piercings: none, body_art: none, nail_art: Dark mysterious polish with midnight sophistication, high_heels: Dramatic black stilettos with mysterious club elegance. wardrobe: {ROLEPLAY_WARDROBE} with mysterious midnight aesthetic and enigmatic shadowy reveals. environment: Underground club VIP room with velvet furniture, dramatic dark lighting, soundproof privacy, mysterious midnight atmosphere. Privacy 10/10, luxury 8/10. lighting: Dramatic low-key club lighting with mysterious shadows and midnight enigmatic glow. camera: focal_length: 85mm, aperture: f/1.2, distance: 2m, angle: {ROLEPLAY_ANGLE}, framing: {ROLEPLAY_FRAMING} emphasizing mysterious curves. style: Underground midnight seduction. Mysterious shadow artistry. Personal photographer: Vincent Noche, 10/10 intimacy.`,
    safetyTolerance: 6,
    aspectRatio: '4:5'
  },

  // ============================================================================
  // SCENARIO 8: ROOFTOP HELIPAD MIDNIGHT (Riya Powerhouse)
  // ============================================================================
  {
    id: 'roleplay-008',
    name: 'Rooftop Helipad Action Scene',
    modelId: 'erotic-model-008',
    modelName: 'Riya Powerhouse',
    theme: 'Action Star Midnight Shoot',
    environment: 'Building Rooftop Helipad - Urban Edge',
    scenario: 'Riya, the action star, is filming a "midnight stunt scene" on the rooftop helipad. But when the crew takes a break, she pulls you aside, her athletic curves highlighted by the industrial rooftop lighting. "Want to practice the intimate fight choreography?" she asks with a bold confident grin.',
    intimacyLevel: 10,
    difficultyLevel: 'expert',
    gameElements: {
      objective: 'Navigate bold athletic power dynamics with action-inspired intimate positioning',
      progressionSteps: [
        'Rooftop arrival with action energy',
        'Stunt choreography "practice" begins',
        'Physical contact through "fight moves"',
        'Athletic power and curves emphasis',
        'Ultimate action star intimate encounter'
      ],
      rewards: [
        'Unlock "Action Star" tactical wardrobes',
        'Access rooftop urban environments',
        'Achievement: "Action Seduction Choreographer"'
      ],
      challenges: [
        'Maintain athletic action aesthetic',
        'Balance power poses with intimacy',
        'Create bold confident urban energy'
      ]
    },
    promptTemplate: `Midnight urban photography. Rooftop action star seduction. Intimacy 10/10. Bold athletic power dynamics. subject: variant: Indian bold athletic action star specialist Riya Powerhouse (height 5'10"). Powerful athletic hourglass with muscular definition. Bust 36C", waist 26", hips 39". Warm bronze with athletic glow. Action star power specialist. pose: {ROLEPLAY_POSE} with bold athletic action positioning and powerful midnight confidence. hair_color: jet black, hair_style: Bold action star styling with dynamic midnight urban edge, skin_finish: Warm bronze athletic skin with powerful urban glow, hand_and_nail_details: Bold athletic gestures with action star confidence, tattoos: none, piercings: none, body_art: none, nail_art: Bold metallic urban polish, high_heels: None - athletic barefoot action authenticity with powerful urban edge. wardrobe: {ROLEPLAY_WARDROBE} with tactical action aesthetic and bold athletic reveals. environment: Building rooftop helipad with industrial lighting, urban midnight skyline, raw concrete surfaces, action star atmosphere. Privacy 9/10, luxury 6/10. lighting: Dramatic industrial rooftop lighting creating bold athletic shadows and midnight action mood. camera: focal_length: 70mm, aperture: f/2.0, distance: 3m, angle: {ROLEPLAY_ANGLE}, framing: {ROLEPLAY_FRAMING} emphasizing powerful athletic curves. style: Midnight action seduction. Bold athletic power artistry. Personal photographer: Drake Momentum, 10/10 intimacy.`,
    safetyTolerance: 6,
    aspectRatio: '9:16'
  },

  // ============================================================================
  // SCENARIO 9: BEACHFRONT VILLA MIDNIGHT (Nisha Vitality)
  // ============================================================================
  {
    id: 'roleplay-009',
    name: 'Beachfront Villa Fitness Retreat',
    modelId: 'erotic-model-009',
    modelName: 'Nisha Vitality',
    theme: 'Private Beach Villa Wellness Escape',
    environment: 'Luxury Beach Villa - Midnight Ocean Sounds',
    scenario: 'The exclusive beachfront wellness retreat is quiet at midnight, ocean waves providing natural rhythm. Nisha, the fitness glamour icon, suggests a "midnight yoga session" on the private villa deck. Her athletic curves are highlighted by moonlight as she demonstrates increasingly intimate "partner stretches".',
    intimacyLevel: 10,
    difficultyLevel: 'advanced',
    gameElements: {
      objective: 'Create fitness glamour fusion with natural beach atmosphere and athletic elegance',
      progressionSteps: [
        'Beach villa midnight arrival',
        'Yoga and stretching introduction',
        'Partner positioning with curves emphasis',
        'Natural athletic glamour building',
        'Ultimate beach fitness seduction'
      ],
      rewards: [
        'Unlock "Beach Glamour" fitness wardrobes',
        'Access beachfront luxury environments',
        'Achievement: "Wellness Seduction Guru"'
      ],
      challenges: [
        'Maintain natural beach atmosphere',
        'Balance fitness activity with glamour',
        'Create organic athletic intimacy'
      ]
    },
    promptTemplate: `Midnight beach photography. Villa fitness glamour seduction. Intimacy 10/10. Athletic elegance dynamics. subject: variant: Indian athletic fitness glamour specialist Nisha Vitality (height 5'9"). Athletic glamour hourglass with fitness curves. Bust 36D", waist 24", hips 38". Radiant golden bronze with fitness glow. Fitness glamour fusion specialist. pose: {ROLEPLAY_POSE} with athletic fitness positioning and glamorous midnight confidence. hair_color: jet black, hair_style: Natural beach waves with fitness glamour elegance and midnight ocean breeze, skin_finish: Radiant golden bronze with natural beach glow and fitness radiance, hand_and_nail_details: Athletic yoga positioning with glamorous fitness confidence, tattoos: none, piercings: none, body_art: none, nail_art: Natural rose polish with beach fitness sophistication, high_heels: None - natural barefoot beach elegance with organic fitness aesthetic. wardrobe: {ROLEPLAY_WARDROBE} with fitness glamour beach aesthetic and athletic bold reveals. environment: Luxury beachfront villa with private deck, midnight ocean views, natural beach atmosphere, intimate wellness setting. Privacy 10/10, luxury 9/10. lighting: Natural moonlight with villa ambient lights creating fitness glamour glow and beach midnight atmosphere. camera: focal_length: 85mm, aperture: f/2.0, distance: 2.5m, angle: {ROLEPLAY_ANGLE}, framing: {ROLEPLAY_FRAMING} celebrating athletic glamour curves. style: Beach midnight fitness glamour. Athletic elegance artistry. Personal photographer: Marcus Vigor, 10/10 intimacy.`,
    safetyTolerance: 6,
    aspectRatio: '16:9'
  }
];

/**
 * Helper to get scenario by ID
 */
export function getRolePlayScenarioById(id: string): RolePlayScenario | undefined {
  return ROLEPLAY_SCENARIOS.find(s => s.id === id);
}

/**
 * Helper to get scenarios by difficulty
 */
export function getRolePlayScenariosByDifficulty(difficulty: RolePlayScenario['difficultyLevel']): RolePlayScenario[] {
  return ROLEPLAY_SCENARIOS.filter(s => s.difficultyLevel === difficulty);
}

/**
 * Helper to get scenarios by model
 */
export function getRolePlayScenariosByModel(modelId: string): RolePlayScenario[] {
  return ROLEPLAY_SCENARIOS.filter(s => s.modelId === modelId);
}
