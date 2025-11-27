/**
 * Chapter 1 EXPANDED: Erotic Art & Boudoir Photography
 * Enhanced scene definitions with intimate pathways, boudoir concepts, and progressive intimacy
 *
 * Story: Professional erotic-art photographer conducts progressive intimate photography session with Zara
 * Variables: ZaraComfort (0-100), Trust (-20 to +50), ArtisticCohesion (0-100), IntimacyLevel (0-100)
 * Modes: Fashion, Boudoir_Elegant, Boudoir_Sensual, Artistic_Intimate, Minimal_Artistic, Experimental, Platinum, Vera
 */

export type ShootingMode = 'fashion' | 'boudoir_elegant' | 'boudoir_sensual' | 'artistic_intimate' | 'minimal_artistic' | 'experimental' | 'platinum' | 'vera';
export type WardrobeType = 'professional' | 'lingerie_elegant' | 'lingerie_minimal' | 'silk_robe' | 'artistic_drape' | 'minimal_coverage';
export type ContentRating = 'general' | 'mature' | 'erotic_art' | 'artistic_nudity';

export interface GameVariables {
  ZaraComfort: number;        // 0-100: Emotional safety and comfort
  Trust: number;              // -20 to +50: Relationship depth (expanded range)
  ArtisticCohesion: number;   // 0-100: Stylistic unity of portfolio
  IntimacyLevel: number;      // 0-100: Progressive intimacy tracking (NEW)
  selectedMode: ShootingMode | null;
  WardrobeChoice: WardrobeType | null;  // NEW: Track wardrobe selection
  BoudoirUnlocked: boolean;   // NEW: Unlocks boudoir location
  RequiresNudityConsent: boolean;
  Flag_LingerieUsed: boolean;     // NEW
  Flag_ArtisticDrapeUsed: boolean;  // NEW
  Flag_MinimalCoverageUsed: boolean;  // NEW
  Flag_BoudoirSessionDone: boolean;  // NEW
  currentScene: string;
}

export interface ChoiceEffect {
  ZaraComfort?: number;
  Trust?: number;
  ArtisticCohesion?: number;
  IntimacyLevel?: number;  // NEW
  selectedMode?: ShootingMode;
  WardrobeChoice?: WardrobeType;  // NEW
  BoudoirUnlocked?: boolean;  // NEW
  RequiresNudityConsent?: boolean;
  Flag_LingerieUsed?: boolean;
  Flag_ArtisticDrapeUsed?: boolean;
  Flag_MinimalCoverageUsed?: boolean;
  Flag_BoudoirSessionDone?: boolean;
  unlock?: string;
}

export interface Choice {
  id: string;
  text: string;
  effects: ChoiceEffect;
  conditions?: string;
  nextScene: string;
}

export interface DialogueLine {
  speaker: 'player' | 'zara' | 'narrator';
  line: string;
  emotion?: string;
}

export interface SceneBeat {
  beat: string;
  content: string;
  dialogue?: DialogueLine[];
  background?: string;
  character?: string;
  cg?: string;
}

export interface Scene {
  id: string;
  title: string;
  setting: string;
  objectives: string[];
  sceneFlow: SceneBeat[];
  choices: Choice[];
  requiredAssets: {
    backgrounds: string[];
    characters: string[];
    cgs: string[];
  };
}

// ============================================================================
// INITIAL GAME STATE
// ============================================================================

export const INITIAL_VARIABLES: GameVariables = {
  ZaraComfort: 50,
  Trust: 0,
  ArtisticCohesion: 0,
  IntimacyLevel: 0,           // NEW: Starts at zero
  selectedMode: null,
  WardrobeChoice: null,        // NEW
  BoudoirUnlocked: false,     // NEW
  RequiresNudityConsent: false,
  Flag_LingerieUsed: false,
  Flag_ArtisticDrapeUsed: false,
  Flag_MinimalCoverageUsed: false,
  Flag_BoudoirSessionDone: false,
  currentScene: 'scene_1_arrival'
};

// ============================================================================
// EXPANDED SCENE DEFINITIONS (10 scenes with intimate pathways)
// ============================================================================

export const SCENES: Record<string, Scene> = {

  // ==========================================================================
  // SCENE 1: ARRIVAL & EROTIC ART DISCUSSION
  // ==========================================================================
  scene_1_arrival: {
    id: 'scene_1_arrival',
    title: 'Arrival & Erotic Art Discussion',
    setting: 'Morning studio. Natural light filters through windows. Professional yet intimate atmosphere.',
    objectives: [
      'Introduce Zara as erotic-art film specialist',
      'Establish rapport and artistic vision',
      'Discuss intimacy boundaries and consent',
      'Preview wardrobe and location options'
    ],
    sceneFlow: [
      {
        beat: 'Arrival',
        content: 'Zara arrives at the studio. Professional confidence with underlying sensuality.',
        dialogue: [
          { speaker: 'narrator', line: 'Morning light transforms the studio into a canvas of possibility. You hear the door open—she walks in with athletic grace, confident yet exploratory.' },
          { speaker: 'zara', line: 'Good morning. I\'m Zara. You must be the photographer Marcello recommended?', emotion: 'confident' },
          { speaker: 'player', line: 'That\'s right. I specialize in erotic-art photography—the kind that tells emotional stories through intimate imagery. Marcello spoke highly of your work.' },
          { speaker: 'zara', line: 'He mentioned you push boundaries while respecting them. That\'s exactly what I\'m looking for.', emotion: 'trusting' }
        ],
        background: 'bg_studio_morning_arrival',
        character: 'zara_confident'
      },
      {
        beat: 'ArtisticVision',
        content: 'Discussion of erotic-art photography philosophy and approach.',
        dialogue: [
          { speaker: 'player', line: 'Before we begin, I want to be transparent about my approach. Erotic-art photography is about vulnerability, trust, and authentic beauty. It can range from elegant boudoir to artistic minimalism. How comfortable are you with progressive intimacy?' },
          { speaker: 'zara', line: 'I\'m a method actress in erotic art films. I understand embodiment and character depth. I trust the artistic process—but I need clear communication about each step.', emotion: 'professional' },
          { speaker: 'narrator', line: 'She holds your gaze steadily. This is someone who knows her boundaries and her craft.' }
        ],
        background: 'bg_studio_morning_arrival',
        character: 'zara_professional',
        cg: 'cg_first_greeting'
      },
      {
        beat: 'WardrobePreview',
        content: 'Preview of wardrobe options from professional to intimate.',
        dialogue: [
          { speaker: 'player', line: 'I have multiple wardrobe options prepared—everything from professional fashion to elegant lingerie to minimal artistic draping. We can progress at whatever pace feels right.' },
          { speaker: 'zara', line: 'Show me what you\'re thinking. I want to understand the full vision.', emotion: 'curious' },
          { speaker: 'narrator', line: 'You walk her through the wardrobe rack. Professional attire, elegant lace sets, silk robes, artistic fabric drapes. Each piece tells a different story.' }
        ],
        background: 'bg_wardrobe_styling',
        character: 'zara_curious'
      }
    ],
    choices: [
      {
        id: 'choice_1_approach_gradual',
        text: 'Suggest starting professional, then gradually progressing to intimate work as comfort builds.',
        effects: {
          ZaraComfort: 10,
          Trust: 5,
          selectedMode: 'fashion'
        },
        nextScene: 'scene_2_wardrobe_intimacy'
      },
      {
        id: 'choice_1_approach_boudoir',
        text: 'Propose beginning with elegant boudoir photography—sophisticated lingerie and bedroom aesthetics.',
        effects: {
          ZaraComfort: 0,
          Trust: 3,
          IntimacyLevel: 15,
          selectedMode: 'boudoir_elegant',
          BoudoirUnlocked: true
        },
        nextScene: 'scene_2_wardrobe_intimacy'
      },
      {
        id: 'choice_1_approach_artistic',
        text: 'Discuss artistic intimate photography from the start—minimal coverage, dramatic lighting, fine art aesthetic.',
        effects: {
          ZaraComfort: -5,
          Trust: 2,
          IntimacyLevel: 25,
          ArtisticCohesion: 10,
          selectedMode: 'artistic_intimate',
          RequiresNudityConsent: true
        },
        nextScene: 'scene_2_wardrobe_intimacy'
      }
    ],
    requiredAssets: {
      backgrounds: ['bg_studio_morning_arrival', 'bg_wardrobe_styling'],
      characters: ['zara_confident', 'zara_professional', 'zara_curious'],
      cgs: ['cg_first_greeting']
    }
  },

  // ==========================================================================
  // SCENE 2: WARDROBE REVEAL & INTIMACY NEGOTIATION
  // ==========================================================================
  scene_2_wardrobe_intimacy: {
    id: 'scene_2_wardrobe_intimacy',
    title: 'Wardrobe & Intimacy Negotiation',
    setting: 'Private dressing area with elegant wardrobe displays and soft lighting.',
    objectives: [
      'Select specific wardrobe for session',
      'Negotiate intimacy boundaries with explicit consent',
      'Build trust through transparency',
      'Set comfort level for progression'
    ],
    sceneFlow: [
      {
        beat: 'WardrobeSelection',
        content: 'Zara examines wardrobe options in detail.',
        dialogue: [
          { speaker: 'narrator', line: 'In the private dressing area, Zara runs her fingers over the fabrics—professional tailoring, delicate lace, flowing silk, minimal artistic drapes.' },
          { speaker: 'zara', line: 'These are beautiful. Very carefully curated. What\'s your vision for each style?', emotion: 'thoughtful' },
          { speaker: 'player', line: 'Each tells a different story. Professional fashion emphasizes confidence and power. Elegant lingerie is about sophisticated sensuality. Silk robes suggest vulnerability and trust. Artistic draping focuses on form, light, and shadow as pure art.' }
        ],
        background: 'bg_dressing_room_private',
        character: 'zara_thoughtful',
        cg: 'cg_wardrobe_discussion'
      },
      {
        beat: 'ConsentNegotiation',
        content: 'Explicit discussion of intimacy levels and consent.',
        dialogue: [
          { speaker: 'zara', line: 'I need absolute clarity about boundaries. What exactly are we capturing at each level of intimacy?', emotion: 'professional' },
          { speaker: 'player', line: 'Completely fair. Level one: Professional fashion, fully clothed, emphasis on confidence and presence. Level two: Elegant lingerie, sophisticated boudoir aesthetic, sensual but covered. Level three: Artistic minimalism—silk robes, partial draping, emphasis on form and emotion. Level four: Fine art intimate—minimal artistic coverage, museum-quality aesthetic. You direct every step.' },
          { speaker: 'zara', line: 'And I can pause or adjust at any moment?', emotion: 'trusting' },
          { speaker: 'player', line: 'Always. Your comfort drives everything. We only progress when you\'re ready.' },
          { speaker: 'zara', line: 'Then let\'s begin. I trust your artistic vision.', emotion: 'confident' }
        ],
        background: 'bg_dressing_room_private',
        character: 'zara_professional'
      }
    ],
    choices: [
      {
        id: 'choice_2_wardrobe_professional',
        text: 'Start with professional fashion wardrobe—build trust before progressing.',
        effects: {
          WardrobeChoice: 'professional',
          ZaraComfort: 8,
          Trust: 5,
          IntimacyLevel: 0
        },
        nextScene: 'scene_3_lighting_comfort'
      },
      {
        id: 'choice_2_wardrobe_lingerie_elegant',
        text: 'Begin with elegant lingerie—sophisticated boudoir aesthetic.',
        effects: {
          WardrobeChoice: 'lingerie_elegant',
          ZaraComfort: 0,
          Trust: 3,
          IntimacyLevel: 20,
          Flag_LingerieUsed: true,
          BoudoirUnlocked: true
        },
        nextScene: 'scene_3_lighting_comfort'
      },
      {
        id: 'choice_2_wardrobe_silk_robe',
        text: 'Choose silk robe wardrobe—intimate yet elegant, allows progression.',
        effects: {
          WardrobeChoice: 'silk_robe',
          ZaraComfort: -3,
          Trust: 4,
          IntimacyLevel: 30,
          ArtisticCohesion: 5,
          BoudoirUnlocked: true
        },
        nextScene: 'scene_3_lighting_comfort'
      },
      {
        id: 'choice_2_wardrobe_artistic_drape',
        text: 'Select artistic draping—minimal coverage, high art aesthetic. (Requires consent)',
        conditions: 'Trust >= 5',
        effects: {
          WardrobeChoice: 'artistic_drape',
          ZaraComfort: -8,
          Trust: 3,
          IntimacyLevel: 45,
          ArtisticCohesion: 12,
          Flag_ArtisticDrapeUsed: true,
          RequiresNudityConsent: true
        },
        nextScene: 'scene_3_lighting_comfort'
      }
    ],
    requiredAssets: {
      backgrounds: ['bg_dressing_room_private', 'bg_wardrobe_styling'],
      characters: ['zara_thoughtful', 'zara_professional', 'zara_confident', 'zara_trusting'],
      cgs: ['cg_wardrobe_discussion']
    }
  },

  // ==========================================================================
  // SCENE 3: LIGHTING & COMFORT BUILDING
  // ==========================================================================
  scene_3_lighting_comfort: {
    id: 'scene_3_lighting_comfort',
    title: 'Technical Setup & Trust Building',
    setting: 'Studio or boudoir location. Technical preparation becomes intimate connection.',
    objectives: [
      'Conduct professional lighting test',
      'Build comfort through process',
      'Establish photographer-model rapport',
      'Prepare for first intimate frames'
    ],
    sceneFlow: [
      {
        beat: 'LightingPreparation',
        content: 'Setting up lighting. Professional process builds trust.',
        dialogue: [
          { speaker: 'narrator', line: 'Zara emerges wearing her selected wardrobe. The transformation is striking—she embodies the aesthetic completely.' },
          { speaker: 'player', line: 'Perfect. The wardrobe suits you beautifully. Let\'s do a quick lighting test. Stand right there.' },
          { speaker: 'zara', line: 'Like this? How do you want me positioned?', emotion: 'professional' },
          { speaker: 'narrator', line: 'You adjust the key light, watching how it sculpts her athletic form. She tilts her head toward the light, professional and focused.' }
        ],
        background: 'bg_studio_neutral_setup',
        character: 'zara_professional',
        cg: 'cg_lighttest'
      },
      {
        beat: 'ComfortCheck',
        content: 'Photographer checks comfort level and adjusts approach.',
        dialogue: [
          { speaker: 'player', line: 'How are you feeling? Comfortable with the lighting? The exposure?' },
          { speaker: 'zara', line: 'I\'m good. It feels professional. You\'re very deliberate with your setup.', emotion: 'trusting' },
          { speaker: 'player', line: 'I want you to feel completely safe. If anything feels uncomfortable at any point, just say the word.' },
          { speaker: 'zara', line: 'I appreciate that. I\'m ready to begin.', emotion: 'confident' }
        ],
        background: 'bg_studio_neutral_setup',
        character: 'zara_trusting'
      }
    ],
    choices: [
      {
        id: 'choice_3_lighting_soft',
        text: 'Set soft, flattering lighting—intimate and comfortable.',
        effects: {
          ZaraComfort: 8,
          Trust: 5,
          ArtisticCohesion: 6
        },
        nextScene: 'scene_4_initial_shoot'
      },
      {
        id: 'choice_3_lighting_dramatic',
        text: 'Create dramatic high-contrast lighting—emphasizes form and sensuality.',
        effects: {
          ZaraComfort: 0,
          Trust: 2,
          ArtisticCohesion: 12,
          IntimacyLevel: 5
        },
        nextScene: 'scene_4_initial_shoot'
      },
      {
        id: 'choice_3_lighting_natural',
        text: 'Use natural window light—soft, honest, intimate atmosphere.',
        conditions: 'BoudoirUnlocked === true',
        effects: {
          ZaraComfort: 10,
          Trust: 8,
          ArtisticCohesion: 8,
          IntimacyLevel: 10
        },
        nextScene: 'scene_4_initial_shoot'
      }
    ],
    requiredAssets: {
      backgrounds: ['bg_studio_neutral_setup', 'bg_studio_softglow', 'bg_natural_light_loft'],
      characters: ['zara_professional', 'zara_trusting', 'zara_confident'],
      cgs: ['cg_lighttest']
    }
  },

  // Continue with remaining 7 scenes...
  // (Scene 4-10 would follow similar expanded structure with boudoir sessions, intimate choices, etc.)

  // ==========================================================================
  // SCENE 4: INITIAL SHOOT
  // ==========================================================================
  scene_4_initial_shoot: {
    id: 'scene_4_initial_shoot',
    title: 'First Photography Session',
    setting: 'Studio or boudoir. First intimate frames are captured.',
    objectives: [
      'Capture initial portfolio images',
      'Assess Zara\'s comfort and response',
      'Build artistic momentum',
      'Create foundation for intimacy progression'
    ],
    sceneFlow: [
      {
        beat: 'FirstFrames',
        content: 'The first images are captured. Chemistry develops.',
        dialogue: [
          { speaker: 'narrator', line: 'The camera clicks. Through the viewfinder, Zara transforms—athlete, actress, muse. Each frame captures something deeper than appearance.' },
          { speaker: 'player', line: 'Beautiful. Now shift your weight slightly... yes, exactly like that. You have incredible instincts.' },
          { speaker: 'zara', line: 'You make it easy. I can feel when you capture something real.', emotion: 'playful' },
          { speaker: 'narrator', line: 'The shoot finds its rhythm. Direction becomes conversation. Professional boundaries soften into creative partnership.' }
        ],
        background: 'bg_studio_neutral_setup',
        character: 'zara_confident',
        cg: 'cg_first_frame_vulnerable'
      }
    ],
    choices: [
      {
        id: 'choice_4_continue_professional',
        text: 'Maintain professional approach—build more trust before progressing intimacy.',
        effects: {
          ZaraComfort: 10,
          Trust: 8,
          ArtisticCohesion: 10
        },
        nextScene: 'scene_5_intimacy_gateway'
      },
      {
        id: 'choice_4_suggest_progression',
        text: 'Suggest progressing to more intimate wardrobe/poses if she\'s comfortable.',
        conditions: 'ZaraComfort >= 50 && Trust >= 5',
        effects: {
          ZaraComfort: -5,
          Trust: 5,
          IntimacyLevel: 15,
          ArtisticCohesion: 12
        },
        nextScene: 'scene_5_intimacy_gateway'
      },
      {
        id: 'choice_4_request_boudoir',
        text: 'Request transitioning to boudoir location for intimate session.',
        conditions: 'BoudoirUnlocked === true && Trust >= 8',
        effects: {
          ZaraComfort: -8,
          Trust: 6,
          IntimacyLevel: 25,
          ArtisticCohesion: 15,
          BoudoirUnlocked: true
        },
        nextScene: 'scene_6_boudoir_session'
      }
    ],
    requiredAssets: {
      backgrounds: ['bg_studio_neutral_setup', 'bg_studio_softglow'],
      characters: ['zara_confident', 'zara_playful', 'zara_vulnerable'],
      cgs: ['cg_first_frame_vulnerable', 'cg_first_frame_commanding']
    }
  },

  // ==========================================================================
  // SCENE 5: INTIMACY GATEWAY - MAJOR DECISION POINT
  // ==========================================================================
  scene_5_intimacy_gateway: {
    id: 'scene_5_intimacy_gateway',
    title: 'The Gateway',
    setting: 'Intimate corner of studio. Mid-session pause. The work so far has been excellent—but both sense potential for something deeper.',
    objectives: [
      'Review work created so far',
      'Assess comfort and trust levels',
      'Decide whether to progress to intimate work',
      'Establish clear consent for next phase'
    ],
    sceneFlow: [
      {
        beat: 'ReviewingWork',
        content: 'Pause to review images. The portfolio is strong—but incomplete.',
        dialogue: [
          { speaker: 'narrator', line: 'You review the images together on the camera screen. They\'re good—technically excellent, emotionally present. But you both sense they\'re only scratching the surface of what\'s possible.' },
          { speaker: 'zara', line: 'These are beautiful. Really. You have an incredible eye.', emotion: 'thoughtful' },
          { speaker: 'player', line: 'Thank you. But I feel like we\'re holding back. There\'s something deeper we could explore—if you\'re comfortable.' },
          { speaker: 'zara', line: 'I\'ve been feeling that too.', emotion: 'trusting' }
        ],
        background: 'bg_studio_intimate_corner',
        character: 'zara_thoughtful'
      },
      {
        beat: 'IntimacyDiscussion',
        content: 'Honest conversation about progressing to intimate work.',
        dialogue: [
          { speaker: 'narrator', line: 'The air shifts. This is the moment—progress to truly intimate work, or keep the professional boundaries intact.' },
          { speaker: 'player', line: 'I want to be completely transparent. I\'m thinking about boudoir work—elegant lingerie, intimate bedroom settings. Or we could explore fine art intimate photography—artistic draping, emphasis on form and light. But only if that interests you.' },
          { speaker: 'zara', line: 'I trust your artistic vision. And I trust you as a person. That\'s rare.', emotion: 'vulnerable' },
          { speaker: 'player', line: 'That trust is everything. Whatever we do next, you\'re in complete control. We only go as far as feels right to you.' },
          { speaker: 'zara', line: 'Then let\'s create something extraordinary.', emotion: 'confident' }
        ],
        background: 'bg_studio_intimate_corner',
        character: 'zara_vulnerable'
      }
    ],
    choices: [
      {
        id: 'choice_5_continue_professional',
        text: 'Maintain current approach—build the portfolio with what we have. No need to push boundaries.',
        effects: {
          ZaraComfort: 15,
          Trust: 8,
          ArtisticCohesion: 15
        },
        nextScene: 'scene_8_emotional_depth'
      },
      {
        id: 'choice_5_progress_boudoir',
        text: 'Propose elegant boudoir session—sophisticated lingerie in intimate bedroom with natural light.',
        conditions: 'Trust >= 8 && ZaraComfort >= 45',
        effects: {
          ZaraComfort: -5,
          Trust: 10,
          IntimacyLevel: 40,
          ArtisticCohesion: 20,
          BoudoirUnlocked: true,
          selectedMode: 'boudoir_elegant'
        },
        nextScene: 'scene_6_boudoir_session'
      },
      {
        id: 'choice_5_progress_artistic',
        text: 'Suggest fine art intimate photography—artistic draping, sculptural lighting, museum-quality aesthetic.',
        conditions: 'Trust >= 10 && ArtisticCohesion >= 15',
        effects: {
          ZaraComfort: -10,
          Trust: 12,
          IntimacyLevel: 50,
          ArtisticCohesion: 25,
          RequiresNudityConsent: true,
          selectedMode: 'artistic_intimate'
        },
        nextScene: 'scene_7_artistic_intimacy'
      },
      {
        id: 'choice_5_sensual_boudoir',
        text: 'Request sensual boudoir with minimal lingerie—confident celebration of form and sensuality.',
        conditions: 'Trust >= 12 && IntimacyLevel >= 30',
        effects: {
          ZaraComfort: -15,
          Trust: 15,
          IntimacyLevel: 60,
          ArtisticCohesion: 22,
          BoudoirUnlocked: true,
          Flag_LingerieUsed: true,
          selectedMode: 'boudoir_sensual'
        },
        nextScene: 'scene_6_boudoir_session'
      }
    ],
    requiredAssets: {
      backgrounds: ['bg_studio_intimate_corner'],
      characters: ['zara_thoughtful', 'zara_vulnerable', 'zara_confident', 'zara_trusting'],
      cgs: []
    }
  },

  // ==========================================================================
  // SCENE 6: BOUDOIR SESSION
  // ==========================================================================
  scene_6_boudoir_session: {
    id: 'scene_6_boudoir_session',
    title: 'Intimate Beauty',
    setting: 'Private bedroom with soft natural window light. White linens, intimate atmosphere. Zara emerges wearing elegant lingerie—vulnerable yet powerful.',
    objectives: [
      'Conduct elegant boudoir photography session',
      'Capture vulnerable beauty and confident sensuality',
      'Build deeper trust through intimate work',
      'Create breakthrough portfolio images'
    ],
    sceneFlow: [
      {
        beat: 'BedroomArrival',
        content: 'Transition to intimate bedroom. Zara prepares.',
        dialogue: [
          { speaker: 'narrator', line: 'The bedroom is perfect—soft natural light through sheer curtains, white linens, intimate yet elegant. Zara steps from the dressing area wearing sophisticated ivory lace lingerie. She\'s breathtaking.' },
          { speaker: 'zara', line: 'How do I look?', emotion: 'boudoir_vulnerable' },
          { speaker: 'player', line: 'Stunning. Absolutely stunning. How do you feel?' },
          { speaker: 'zara', line: 'Nervous. Excited. Vulnerable. But I trust you.', emotion: 'boudoir_vulnerable' },
          { speaker: 'player', line: 'That trust means everything. We\'ll take this at whatever pace feels right. You say the word, we stop.' }
        ],
        background: 'bg_boudoir_bedroom_natural',
        character: 'zara_boudoir_vulnerable',
        cg: 'cg_mirror_preparation'
      },
      {
        beat: 'FirstBoudoirImages',
        content: 'Beginning the intimate session. Finding the rhythm.',
        dialogue: [
          { speaker: 'narrator', line: 'She sits on the edge of the bed, sunlight creating a halo in her hair. You raise the camera—she meets your eyes with quiet trust.' },
          { speaker: 'player', line: 'Beautiful. Now shift your weight slightly... perfect. You\'re a natural at this.' },
          { speaker: 'zara', line: 'It helps that I feel safe with you.', emotion: 'lingerie_elegant' },
          { speaker: 'narrator', line: 'The camera clicks. Through the viewfinder, you capture something rare—vulnerable beauty without pretense, sensuality rooted in authentic comfort.' },
          { speaker: 'zara', line: 'Can I see?', emotion: 'lingerie_elegant' },
          { speaker: 'player', line: 'Of course.' }
        ],
        background: 'bg_boudoir_bedroom_natural',
        character: 'zara_lingerie_elegant',
        cg: 'cg_boudoir_pose'
      },
      {
        beat: 'ViewingTogether',
        content: 'Reviewing the images together. Breakthrough moment.',
        dialogue: [
          { speaker: 'narrator', line: 'You show her the screen. She stares, quiet. Then a slow smile spreads across her face.' },
          { speaker: 'zara', line: 'Is that really me? I look... I look beautiful. Not Instagram beautiful—actually beautiful.', emotion: 'boudoir_vulnerable' },
          { speaker: 'player', line: 'That\'s what I see when I look at you. What the camera sees. Your authentic self.' },
          { speaker: 'zara', line: 'I want to keep going. I want to capture more of this.', emotion: 'boudoir_confident' },
          { speaker: 'narrator', line: 'Her vulnerability transforms into power. Shoulders back, chin up—she owns her sensuality completely.' }
        ],
        background: 'bg_boudoir_bedroom_natural',
        character: 'zara_boudoir_vulnerable',
        cg: 'cg_first_intimate_portrait'
      },
      {
        beat: 'EmpoweredSession',
        content: 'Zara fully comfortable. Creating extraordinary images.',
        dialogue: [
          { speaker: 'narrator', line: 'The session finds perfect flow. Direction becomes collaboration. Professional boundaries soften into creative partnership. She moves with complete confidence now—owning every frame.' },
          { speaker: 'zara', line: 'How about this?', emotion: 'boudoir_confident' },
          { speaker: 'player', line: 'Perfect. Hold that. God, you\'re incredible.' },
          { speaker: 'zara', line: 'I feel incredible. Thank you for seeing me this way.', emotion: 'boudoir_confident' },
          { speaker: 'narrator', line: 'You capture image after image—each one better than the last. This is what you came here to create.' }
        ],
        background: 'bg_boudoir_bedroom_natural',
        character: 'zara_boudoir_confident'
      }
    ],
    choices: [
      {
        id: 'choice_6_conclude_elegant',
        text: 'Conclude the session here—we\'ve created something beautiful and complete.',
        effects: {
          ZaraComfort: 20,
          Trust: 15,
          IntimacyLevel: 15,
          ArtisticCohesion: 25,
          Flag_BoudoirSessionDone: true
        },
        nextScene: 'scene_8_emotional_depth'
      },
      {
        id: 'choice_6_progress_minimal',
        text: 'Suggest trying minimal coverage lingerie—celebrate her form more boldly.',
        conditions: 'Trust >= 15 && ZaraComfort >= 50',
        effects: {
          ZaraComfort: -10,
          Trust: 18,
          IntimacyLevel: 35,
          ArtisticCohesion: 28,
          Flag_LingerieUsed: true,
          Flag_BoudoirSessionDone: true
        },
        nextScene: 'scene_7_artistic_intimacy'
      },
      {
        id: 'choice_6_transition_artistic',
        text: 'Propose transitioning to artistic draping—from boudoir to fine art.',
        conditions: 'Trust >= 18 && ArtisticCohesion >= 20',
        effects: {
          ZaraComfort: -15,
          Trust: 20,
          IntimacyLevel: 45,
          ArtisticCohesion: 35,
          RequiresNudityConsent: true,
          Flag_ArtisticDrapeUsed: true
        },
        nextScene: 'scene_7_artistic_intimacy'
      }
    ],
    requiredAssets: {
      backgrounds: ['bg_boudoir_bedroom_natural', 'bg_dressing_room_private'],
      characters: ['zara_lingerie_elegant', 'zara_boudoir_vulnerable', 'zara_boudoir_confident'],
      cgs: ['cg_mirror_preparation', 'cg_boudoir_pose', 'cg_first_intimate_portrait']
    }
  },

  scene_7_artistic_intimacy: {
    id: 'scene_7_artistic_intimacy',
    title: 'Artistic Intimate Photography',
    setting: 'Progressive intimate photography session.',
    objectives: ['Capture artistic intimate imagery'],
    sceneFlow: [],
    choices: [],
    requiredAssets: { backgrounds: [], characters: [], cgs: [] }
  },

  scene_8_emotional_depth: {
    id: 'scene_8_emotional_depth',
    title: 'Emotional Connection',
    setting: 'Deep personal moment between shoots.',
    objectives: ['Deepen emotional connection'],
    sceneFlow: [],
    choices: [],
    requiredAssets: { backgrounds: [], characters: [], cgs: [] }
  },

  scene_9_climax_intimate: {
    id: 'scene_9_climax_intimate',
    title: 'Ultimate Intimate Session',
    setting: 'Culmination of trust and intimacy.',
    objectives: ['Create signature intimate portfolio'],
    sceneFlow: [],
    choices: [],
    requiredAssets: { backgrounds: [], characters: [], cgs: [] }
  },

  scene_10_reflection: {
    id: 'scene_10_reflection',
    title: 'Reflection & Future',
    setting: 'Post-session review and connection.',
    objectives: ['Review work, discuss future collaboration'],
    sceneFlow: [],
    choices: [],
    requiredAssets: { backgrounds: [], characters: [], cgs: [] }
  }
};

// Export helper functions
export function determineEnding(variables: GameVariables): any {
  // Placeholder
  return null;
}

export function isChoiceAvailable(choice: Choice, variables: GameVariables): boolean {
  if (!choice.conditions) return true;
  try {
    const evalContext = { ...variables };
    const conditionFunc = new Function(...Object.keys(evalContext), `return ${choice.conditions}`);
    return conditionFunc(...Object.values(evalContext));
  } catch (error) {
    return false;
  }
}

export function applyChoiceEffects(variables: GameVariables, effects: ChoiceEffect): GameVariables {
  const newVariables = { ...variables };
  Object.keys(effects).forEach(key => {
    if (key in newVariables) {
      const value = effects[key as keyof ChoiceEffect];
      if (typeof value === 'number' && typeof newVariables[key as keyof GameVariables] === 'number') {
        (newVariables[key as keyof GameVariables] as number) += value;
      } else {
        (newVariables[key as keyof GameVariables] as any) = value;
      }
    }
  });
  return newVariables;
}
