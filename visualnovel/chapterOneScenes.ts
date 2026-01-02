/**
 * Chapter 1: Light & Shadow - Scene Structure
 * Complete scene definitions with branching logic, choices, and variable tracking
 *
 * Story: Professional photographer (player) conducts fashion shoot with Zara
 * Variables: ZaraComfort (0-100), Trust (-20 to +30), ArtisticCohesion (0-100)
 * Modes: Experimental, Platinum, Vera, Artistic
 */

export type ShootingMode = 'experimental' | 'platinum' | 'vera' | 'artistic';
export type ContentRating = 'general' | 'mature' | 'artistic_nudity';

export interface GameVariables {
  ZaraComfort: number;        // 0-100: Emotional safety and comfort
  Trust: number;               // -20 to +30: Relationship depth
  ArtisticCohesion: number;   // 0-100: Stylistic unity of portfolio
  selectedMode: ShootingMode | null;
  RequiresNudityConsent: boolean;
  Flag_ArtNudeUsed: boolean;
  currentScene: string;
}

export interface ChoiceEffect {
  ZaraComfort?: number;
  Trust?: number;
  ArtisticCohesion?: number;
  selectedMode?: ShootingMode;
  RequiresNudityConsent?: boolean;
  Flag_ArtNudeUsed?: boolean;
  unlock?: string;  // Unlocks special shots or dialogue
}

export interface Choice {
  id: string;
  text: string;
  effects: ChoiceEffect;
  conditions?: string;  // JavaScript condition string to evaluate
  nextScene: string;
}

export interface DialogueLine {
  speaker: 'player' | 'zara' | 'narrator' | 'rhea';
  line: string;
  emotion?: string;  // For character sprite selection
}

export interface SceneBeat {
  beat: string;
  content: string;
  dialogue?: DialogueLine[];
  background?: string;  // Asset ID
  character?: string;   // Character sprite asset ID
  cg?: string;          // CG image asset ID (replaces background + character)
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
  ZaraComfort: 50,           // Starts neutral
  Trust: 0,                   // Starts at zero, can go negative
  ArtisticCohesion: 0,       // Builds through shoot
  selectedMode: null,
  RequiresNudityConsent: false,
  Flag_ArtNudeUsed: false,
  currentScene: 'scene_1_calltime'
};

// ============================================================================
// SCENE DEFINITIONS
// ============================================================================

export const SCENES: Record<string, Scene> = {

  // ==========================================================================
  // SCENE 1: ARRIVAL & BRIEFING
  // ==========================================================================
  scene_1_calltime: {
    id: 'scene_1_calltime',
    title: 'Arrival & Briefing',
    setting: 'Morning in a minimal white studio. Soft, cool daylight through blinds.',
    objectives: [
      'Introduce Zara and establish rapport',
      'Explain the day\'s brief',
      'Let player choose shooting mode',
      'Set initial relationship variables'
    ],
    sceneFlow: [
      {
        beat: 'IntroDialogue',
        content: 'Player greets Zara in morning studio. Casual banter establishes rapport.',
        dialogue: [
          { speaker: 'narrator', line: 'Morning light filters through the studio blinds, painting stripes across the polished concrete floor. Professional equipment stands ready—light stands, softboxes, a pristine white backdrop rolled and waiting.' },
          { speaker: 'narrator', line: 'The door opens, and she walks in.' },
          { speaker: 'zara', line: 'Morning! Ready to make something a little dangerous with light?', emotion: 'playful' },
          { speaker: 'player', line: 'Dangerous in the best way. What are we calling this—mystery, or luxury?' },
          { speaker: 'zara', line: 'That\'s your call. I\'m here to bring whatever vision you have to life. What\'s the concept?', emotion: 'confident' }
        ],
        background: 'bg_studio_morning_arrival',
        character: 'zara_playful'
      },
      {
        beat: 'SelectMode',
        content: 'Player selects shooting mode. This choice determines wardrobe, lighting, and available intimate options.',
        dialogue: [
          { speaker: 'narrator', line: 'This is the moment. The aesthetic direction you choose now will shape everything—the lighting, the wardrobe, the emotional tone. Zara waits, professional yet open, ready to collaborate.' },
          { speaker: 'player', line: 'I have four different directions in mind. Let me walk you through them and you tell me what resonates.' }
        ],
        background: 'bg_studio_morning_arrival',
        character: 'zara_neutral'
      }
    ],
    choices: [
      {
        id: 'choice_1_mode_experimental',
        text: 'Pitch "Experimental" — Edgy conceptual work. High-contrast silhouettes, unusual props, body as sculpture. Helmut Newton meets contemporary art installation.',
        effects: {
          selectedMode: 'experimental',
          ArtisticCohesion: 5,
          ZaraComfort: 0  // Neutral, professional interest
        },
        nextScene: 'scene_2_set_prep'
      },
      {
        id: 'choice_1_mode_platinum',
        text: 'Pitch "Platinum" — Luxury editorial glamour. Polished, sophisticated, high-end lingerie with draped silk. Vogue meets Harper\'s Bazaar.',
        effects: {
          selectedMode: 'platinum',
          ArtisticCohesion: 5,
          ZaraComfort: -3  // Slightly more vulnerable, but she\'s professional
        },
        nextScene: 'scene_2_set_prep'
      },
      {
        id: 'choice_1_mode_vera',
        text: 'Pitch "Vera" — Intimate emotional portraits. Soft natural light, honest vulnerability, close-ups emphasizing human connection over fashion.',
        effects: {
          selectedMode: 'vera',
          ArtisticCohesion: 5,
          ZaraComfort: 5,  // Appreciates the emotional honesty approach
          Trust: 2
        },
        nextScene: 'scene_2_set_prep'
      },
      {
        id: 'choice_1_mode_artistic',
        text: 'Pitch "Artistic" — Fine art sculptural study. Classical art-nude aesthetic inspired by masters. Museum-quality chiaroscuro. (Requires explicit consent)',
        effects: {
          selectedMode: 'artistic',
          ArtisticCohesion: 5,
          ZaraComfort: -5,  // More vulnerable ask, requires trust
          RequiresNudityConsent: true
        },
        nextScene: 'scene_2_set_prep'
      }
    ],
    requiredAssets: {
      backgrounds: ['bg_studio_morning_arrival'],
      characters: ['zara_neutral', 'zara_playful', 'zara_confident'],
      cgs: ['cg_first_greeting']
    }
  },

  // ==========================================================================
  // SCENE 2: WARDROBE & LIGHT TEST
  // ==========================================================================
  scene_2_set_prep: {
    id: 'scene_2_set_prep',
    title: 'Wardrobe & Light Test',
    setting: 'Wardrobe racks, softboxes, and a small dressing area.',
    objectives: [
      'Conduct light test and short camera roll',
      'Gain consent if "artistic" mode selected',
      'Introduce minor adversity (lighting stand malfunction)',
      'Build technical trust through professional process'
    ],
    sceneFlow: [
      {
        beat: 'LightTest',
        content: 'Player sets up lighting while Zara changes into mode-appropriate wardrobe.',
        dialogue: [
          { speaker: 'narrator', line: 'Twenty minutes later. Zara emerges from the styling area in the wardrobe you discussed. The transformation is immediate—she\'s not just wearing the outfit, she *is* the concept.' },
          { speaker: 'zara', line: 'How\'s this? Does it work for what you\'re seeing?', emotion: 'professional' },
          { speaker: 'player', line: 'Perfect. Let\'s do a quick light test. Stand right there, face toward the key light.' },
          { speaker: 'narrator', line: 'You raise the light meter toward her face. Zara tilts her head toward the softbox, eyes squinting slightly against the brightness, professional and focused.' }
        ],
        background: 'bg_wardrobe_styling',
        character: 'zara_professional'
      },
      {
        beat: 'ConsentCheck',
        content: 'If "artistic" mode selected, explicit consent conversation happens here.',
        dialogue: [
          { speaker: 'player', line: 'Before we go further—the artistic direction we discussed involves tasteful partial nudity. Classical fine art aesthetic, emphasis on form and light, nothing explicit. I want to make absolutely sure you\'re comfortable with this approach.' },
          { speaker: 'zara', line: 'I appreciate you asking directly. I need to know: what exactly are we talking about? How much coverage, what\'s the artistic intent?', emotion: 'thoughtful' },
          { speaker: 'player', line: 'Think Helmut Newton, Irving Penn—sculptural draping with partial coverage. The focus is form, shadow, and composition. Museum-quality fine art photography. You\'d have full control to pause or adjust at any time.' },
          { speaker: 'zara', line: '...Okay. I trust your vision, and I appreciate the clarity. Let\'s create something beautiful. But if I say pause, we pause.', emotion: 'trusting' },
          { speaker: 'player', line: 'Absolutely. That\'s the deal.' }
        ],
        background: 'bg_wardrobe_styling',
        character: 'zara_thoughtful',
        cg: 'cg_consent_moment'
      },
      {
        beat: 'EquipmentHiccup',
        content: 'A light stand slips, creating spontaneous dramatic shadow—creative opportunity or professional recovery?',
        dialogue: [
          { speaker: 'narrator', line: 'As you adjust the rim light, the stand shifts—the softbox tilts at a sharp angle. Suddenly half of Zara\'s face falls into deep shadow, the other half brilliantly lit. Accidental Rembrandt lighting, dramatic and beautiful.' },
          { speaker: 'zara', line: 'Oh—should I move?', emotion: 'uncomfortable' },
          { speaker: 'narrator', line: 'She\'s frozen in an interesting pose, hand instinctively reaching for balance. The moment is unexpected but compelling. Do you fix it professionally, or seize the creative accident?' }
        ],
        background: 'bg_studio_neutral_setup',
        character: 'zara_uncomfortable',
        cg: 'cg_equipment_hiccup'
      }
    ],
    choices: [
      {
        id: 'choice_2_light_contrast',
        text: 'Set high-contrast, Newton-like rim lighting for dramatic sculptural effect.',
        effects: {
          ArtisticCohesion: 8,
          ZaraComfort: 0
        },
        nextScene: 'scene_3_first_shoot'
      },
      {
        id: 'choice_2_light_soft',
        text: 'Set soft, diffused glow for intimate portraiture approach.',
        effects: {
          ArtisticCohesion: 6,
          ZaraComfort: 5,
          Trust: 2
        },
        nextScene: 'scene_3_first_shoot'
      },
      {
        id: 'choice_2_handle_hiccup_professional',
        text: 'Fix the light calmly and reassure Zara. "Just a second, let me secure this properly."',
        effects: {
          ZaraComfort: 7,
          Trust: 5
        },
        nextScene: 'scene_3_first_shoot'
      },
      {
        id: 'choice_2_handle_hiccup_impulsive',
        text: 'Use the slipping stand as a dramatic moment. "Hold that pose! This is perfect—don\'t move."',
        effects: {
          ZaraComfort: -10,
          ArtisticCohesion: 10,
          Trust: -3
        },
        conditions: 'ZaraComfort > 50',  // Only available if comfort is above threshold
        nextScene: 'scene_3_first_shoot'
      }
    ],
    requiredAssets: {
      backgrounds: ['bg_wardrobe_styling', 'bg_studio_neutral_setup'],
      characters: ['zara_professional', 'zara_thoughtful', 'zara_uncomfortable', 'zara_trusting', 'zara_lighttest'],
      cgs: ['cg_lighttest', 'cg_equipment_hiccup', 'cg_consent_moment']
    }
  },

  // ==========================================================================
  // SCENE 3: FIRST FRAME — ESTABLISHING PORTRAIT
  // ==========================================================================
  scene_3_first_shoot: {
    id: 'scene_3_first_shoot',
    title: 'First Frame — Establishing Portrait',
    setting: 'Studio center, one key light, Zara on mark.',
    objectives: [
      'Capture a strong opening image that sets chapter tone',
      'Assess Zara\'s comfort and adapt direction',
      'Record player\'s creative choices for later callbacks',
      'Build artistic cohesion'
    ],
    sceneFlow: [
      {
        beat: 'Directing',
        content: 'Player gives Zara direction—vulnerable, commanding, or playful—each elicits different expressions.',
        dialogue: [
          { speaker: 'narrator', line: 'Everything is ready. Zara stands in the center of the studio, the key light creating perfect modeling across her face. The camera is tethered, Capture One open on the laptop. This is the moment—the first real frame.' },
          { speaker: 'zara', line: 'Okay. I\'m ready. Direct me.', emotion: 'professional' },
          { speaker: 'narrator', line: 'How do you want her to feel in this image? What emotion are you trying to capture?' }
        ],
        background: 'bg_studio_neutral_setup',
        character: 'zara_professional'
      },
      {
        beat: 'Click',
        content: 'Player takes the key frame. System records ArtisticCohesion and ZaraComfort delta.',
        dialogue: [
          { speaker: 'narrator', line: 'You press the shutter. The mechanical click echoes in the quiet studio. The image appears on the laptop screen—and it\'s exactly what you envisioned.' },
          { speaker: 'zara', line: 'Can I see?', emotion: 'curious' }
        ]
      }
    ],
    choices: [
      {
        id: 'choice_3_direct_vulnerable',
        text: 'Ask Zara to look vulnerable and soft. "Breathe slowly, eyes open to the truth. Let me see what\'s beneath the professional mask."',
        effects: {
          ZaraComfort: 5,
          Trust: 8,
          ArtisticCohesion: 10,
          unlock: 'intimate_expression_shot'
        },
        nextScene: 'scene_4_midpoint'
      },
      {
        id: 'choice_3_direct_commanding',
        text: 'Direction: strong and commanding. "Chin up, own the room. You\'re not asking for attention—you\'re demanding it."',
        effects: {
          ZaraComfort: -2,
          ArtisticCohesion: 12,
          Trust: 2
        },
        nextScene: 'scene_4_midpoint'
      },
      {
        id: 'choice_3_playful',
        text: 'Keep it playful and spontaneous. "Forget the pose. Just laugh—think of something ridiculous. Let\'s capture you, not the model."',
        effects: {
          ZaraComfort: 8,
          Trust: 6,
          ArtisticCohesion: 8
        },
        nextScene: 'scene_4_midpoint'
      }
    ],
    requiredAssets: {
      backgrounds: ['bg_studio_neutral_setup', 'bg_studio_highcontrast', 'bg_studio_softglow'],
      characters: ['zara_professional', 'zara_confident', 'zara_vulnerable', 'zara_playful', 'zara_experimental', 'zara_platinum', 'zara_vera'],
      cgs: ['cg_first_frame_vulnerable', 'cg_first_frame_commanding', 'cg_first_frame_playful']
    }
  },

  // ==========================================================================
  // SCENE 4: CRISIS & CHOICE (MIDPOINT)
  // ==========================================================================
  scene_4_midpoint: {
    id: 'scene_4_midpoint',
    title: 'Crisis & Choice',
    setting: 'Mid-shoot. Zara mentions a personal memory affecting her current energy.',
    objectives: [
      'Deepen character through personal revelation',
      'Present choice affecting trust and creative direction',
      'Branch paths toward supportive vs. opportunistic photographer',
      'Unlock special shots based on emotional connection'
    ],
    sceneFlow: [
      {
        beat: 'PersonalReveal',
        content: 'Zara briefly shares a nostalgic or vulnerable memory. Player must respond with empathy, curiosity, or professional detachment.',
        dialogue: [
          { speaker: 'narrator', line: 'You\'re halfway through the shoot. The images are strong—technically perfect, aesthetically cohesive. But then Zara pauses.' },
          { speaker: 'zara', line: 'Can we take a minute?', emotion: 'thoughtful' },
          { speaker: 'player', line: 'Of course. Everything okay?' },
          { speaker: 'zara', line: 'Yeah, just... this reminds me of something. My first real shoot, years ago. Different studio, but same kind of light. The photographer then—he didn\'t really *see* me, you know? I was just a body holding a pose.', emotion: 'vulnerable' },
          { speaker: 'narrator', line: 'She\'s looking away now, hand touching her own arm in a self-comforting gesture. This is real vulnerability, a moment of genuine trust. How do you respond?' }
        ],
        background: 'bg_studio_softglow',
        character: 'zara_crisis_reveal',
        cg: 'cg_personal_reveal'
      },
      {
        beat: 'DecisionImpact',
        content: 'Response alters ZaraComfort significantly and unlocks or blocks intimate shots later.',
        dialogue: [
          { speaker: 'narrator', line: 'Your response will shape everything that follows. This is the moment where professional collaboration can become genuine human connection—or remain transactional.' }
        ]
      }
    ],
    choices: [
      {
        id: 'choice_4_empathize',
        text: 'Respond with genuine empathy. "Thanks for sharing that with me. I want this to feel different. We can make the rest of this shoot whatever you need it to be—gentle, powerful, whatever feels right."',
        effects: {
          ZaraComfort: 15,
          Trust: 10,
          unlock: 'intimate_expression_shot'
        },
        nextScene: 'scene_5_climax_shot'
      },
      {
        id: 'choice_4_inquire',
        text: 'Gently inquire to understand deeper. "Tell me more about that experience. What would \'being seen\' have looked like for you then? What does it look like now?"',
        effects: {
          ZaraComfort: 5,
          Trust: 5,
          ArtisticCohesion: 5,
          unlock: 'story_driven_shot'
        },
        nextScene: 'scene_5_climax_shot'
      },
      {
        id: 'choice_4_detach',
        text: 'Maintain professional distance. "I understand. Take the time you need. We\'ll pick back up when you\'re ready—no rush."',
        effects: {
          ZaraComfort: -8,
          Trust: -5
        },
        nextScene: 'scene_5_climax_shot'
      }
    ],
    requiredAssets: {
      backgrounds: ['bg_studio_softglow'],
      characters: ['zara_crisis_reveal', 'zara_vulnerable', 'zara_thoughtful'],
      cgs: ['cg_personal_reveal']
    }
  },

  // ==========================================================================
  // SCENE 5: CLIMACTIC FRAME (MODE-SPECIFIC)
  // ==========================================================================
  scene_5_climax_shot: {
    id: 'scene_5_climax_shot',
    title: 'Climactic Frame',
    setting: 'Final setup with deliberate lighting. Mode-specific composition.',
    objectives: [
      'Execute the shoot\'s signature image',
      'Resolve chapter choices into concrete portfolio piece',
      'Handle artistic/intimate content with consent checks',
      'Leave narrative hooks for next chapter'
    ],
    sceneFlow: [
      {
        beat: 'FinalDirection',
        content: 'Player chooses final direction strongly impacting the final image and Zara\'s emotional arc.',
        dialogue: [
          { speaker: 'narrator', line: 'This is it. The culmination of everything—the technical decisions, the trust built (or eroded), the aesthetic vision. One final image to complete the series.' },
          { speaker: 'player', line: 'Okay, Zara. Let\'s create the signature shot. Everything we\'ve done leads to this moment.' },
          { speaker: 'zara', line: 'I\'m ready. Direct me.', emotion: 'trusting' }
        ],
        background: 'bg_studio_experimental',  // Changes based on selected mode
        character: 'zara_experimental'  // Changes based on selected mode
      },
      {
        beat: 'Release',
        content: 'Photographer releases Zara to wrap. After-action dialogue and set cleanup.',
        dialogue: [
          { speaker: 'narrator', line: 'The shutter clicks one final time. You lower the camera and Zara relaxes from the pose, the professional mask returning—or, depending on the shoot, remaining off.' },
          { speaker: 'player', line: 'That\'s it. We got it.' },
          { speaker: 'zara', line: 'Really? Can I see?', emotion: 'excited' }
        ]
      }
    ],
    choices: [
      {
        id: 'choice_5_direction_high_art',
        text: 'Push for sculptural "high art" perfection. "Hold that pose. Absolute stillness. Don\'t even breathe. Three... two... one..."',
        effects: {
          ArtisticCohesion: 20,
          ZaraComfort: -5,
          Trust: -2
        },
        nextScene: 'scene_6_wrap'
      },
      {
        id: 'choice_5_direction_emotional',
        text: 'Aim for emotional, candid authenticity. "Forget the pose. Just be. Move naturally, laugh if you want—let\'s capture *you*, not an image."',
        effects: {
          ArtisticCohesion: 15,
          ZaraComfort: 10,
          Trust: 8
        },
        nextScene: 'scene_6_wrap'
      },
      {
        id: 'choice_5_direction_consensual_artistic',
        text: 'Proceed with fine art nude composition (Newton-inspired silhouette study). "This is the moment we discussed. Sculptural, timeless, museum-quality. Ready?"',
        conditions: 'selectedMode === "artistic" && RequiresNudityConsent === true && ZaraComfort >= 70',
        effects: {
          ArtisticCohesion: 30,
          ZaraComfort: 0,
          Trust: 5,
          Flag_ArtNudeUsed: true
        },
        nextScene: 'scene_6_wrap'
      }
    ],
    requiredAssets: {
      backgrounds: ['bg_studio_experimental', 'bg_studio_platinum', 'bg_studio_softglow'],
      characters: ['zara_experimental', 'zara_platinum', 'zara_vera', 'zara_artistic', 'zara_climax_direction'],
      cgs: ['cg_climax_experimental', 'cg_climax_platinum', 'cg_climax_vera']
    }
  },

  // ==========================================================================
  // SCENE 6: WRAP & AFTERMATH
  // ==========================================================================
  scene_6_wrap: {
    id: 'scene_6_wrap',
    title: 'Wrap & Aftermath',
    setting: 'Packing up, brief review of frames on camera back, light-hearted closing.',
    objectives: [
      'Show immediate feedback on final image (success/failure metrics)',
      'Set up narrative threads for future chapters',
      'Calculate final variables for ending determination',
      'Save state for chapter progression'
    ],
    sceneFlow: [
      {
        beat: 'ReviewImages',
        content: 'Zara and player review the day\'s images together.',
        dialogue: [
          { speaker: 'narrator', line: 'You sit together at the laptop, scrolling through the day\'s captures. The light has shifted—golden hour coming through the windows now, casting warm tones over the studio as equipment gets packed away.' },
          { speaker: 'zara', line: 'These are... really good. No, these are *really* good.', emotion: 'satisfied' },
          { speaker: 'player', line: 'We made something special today.' },
          { speaker: 'zara', line: 'We did. Thank you—for seeing me, not just photographing me.', emotion: 'trusting' }
        ],
        background: 'bg_studio_wrap',
        character: 'zara_wrap_satisfied',
        cg: 'cg_camera_back_review'
      },
      {
        beat: 'EndingDetermination',
        content: 'System calculates ending based on final variables.',
        dialogue: [
          { speaker: 'narrator', line: 'As Zara gathers her things and heads toward the door, she pauses.' },
          { speaker: 'zara', line: 'Hey—I have another project coming up. Would you want to work together again?', emotion: 'hopeful' },
          { speaker: 'narrator', line: 'Her question hangs in the air. The answer depends on everything that came before—the trust built, the comfort maintained, the artistry achieved.' }
        ]
      }
    ],
    choices: [
      {
        id: 'choice_6_future_collaboration',
        text: 'Absolutely. This was just the beginning. Let\'s create a whole series together.',
        conditions: 'ZaraComfort >= 60 && Trust >= 5',
        effects: {
          Trust: 5
        },
        nextScene: 'ending_strong'
      },
      {
        id: 'choice_6_professional_only',
        text: 'I\'d be interested. Let me see how these images turn out first, and we can discuss next steps.',
        effects: {
          Trust: 0
        },
        nextScene: 'ending_neutral'
      },
      {
        id: 'choice_6_decline',
        text: 'I appreciate the offer, but I think we got what we needed from this session.',
        conditions: 'Trust <= 0 || ZaraComfort < 40',
        effects: {
          Trust: -5
        },
        nextScene: 'ending_tense'
      }
    ],
    requiredAssets: {
      backgrounds: ['bg_studio_wrap'],
      characters: ['zara_wrap_satisfied', 'zara_trusting', 'zara_neutral'],
      cgs: ['cg_camera_back_review']
    }
  }
};

// ============================================================================
// ENDING OUTCOMES
// ============================================================================

export interface Ending {
  id: string;
  title: string;
  condition: string;  // JavaScript condition to evaluate
  description: string;
  unlocks: string[];  // What this ending unlocks for future chapters
}

export const ENDINGS: Ending[] = [
  {
    id: 'ending_strong',
    title: 'Strong Partnership',
    condition: 'ZaraComfort >= 70 && ArtisticCohesion >= 60 && Trust >= 10',
    description: 'Zara feels respected and the collaboration yielded a signature portfolio. Strong foundation for future work together. Unlocks premium content and deepest trust paths in Chapter 2.',
    unlocks: ['TrustMajor', 'chapter2_intimate_paths', 'portfolio_exhibition']
  },
  {
    id: 'ending_artistic_success',
    title: 'Artistic Triumph',
    condition: 'ArtisticCohesion >= 80 && ZaraComfort >= 50',
    description: 'The portfolio is stunning and cohesive. Professional success even if personal connection was moderate. Unlocks editorial opportunities in Chapter 2.',
    unlocks: ['ArtisticRecognition', 'chapter2_magazine_feature']
  },
  {
    id: 'ending_neutral',
    title: 'Professional Completion',
    condition: 'ZaraComfort >= 40 && ZaraComfort < 70 && Trust >= 0',
    description: 'The shoot completed professionally. Images are good but not exceptional. Zara is cordial but not deeply connected. Standard progression to Chapter 2.',
    unlocks: ['chapter2_standard']
  },
  {
    id: 'ending_tense',
    title: 'Strained Relationship',
    condition: 'ZaraComfort < 40 || Trust < 0',
    description: 'Zara thanks you but expresses unease. Boundaries were pushed. Reputation affected. Future chapters harder, explicit artistic direction locked. Requires reconciliation in Chapter 2.',
    unlocks: ['ReputationDip', 'chapter2_reconciliation_required']
  },
  {
    id: 'ending_artistic_controversial',
    title: 'Controversial Masterpiece',
    condition: 'Flag_ArtNudeUsed === true && ZaraComfort >= 70 && Trust >= 10',
    description: 'Art-nude work created ethically with full consent and high comfort. Triggers editorial review scene in Chapter 2. Public recognition but also controversy.',
    unlocks: ['ArtisticApproval', 'chapter2_gallery_exhibition', 'chapter2_controversy_arc']
  },
  {
    id: 'ending_consent_violated',
    title: 'Broken Trust',
    condition: 'Flag_ArtNudeUsed === true && (ZaraComfort < 70 || Trust < 5)',
    description: 'Artistic nudity attempted without sufficient trust or comfort. Major conflict. This is a failure state that triggers difficult conversation in Chapter 2.',
    unlocks: ['TrustBroken', 'chapter2_conflict_resolution']
  }
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Evaluate which ending the player achieved based on final variables
 */
export function determineEnding(variables: GameVariables): Ending {
  // Check endings in priority order (most specific to most general)
  for (const ending of ENDINGS) {
    try {
      // Create evaluation context with variables
      const evalContext = { ...variables };
      // Use Function constructor to safely evaluate condition
      const conditionFunc = new Function(...Object.keys(evalContext), `return ${ending.condition}`);
      if (conditionFunc(...Object.values(evalContext))) {
        return ending;
      }
    } catch (error) {
      console.error(`Error evaluating ending condition for ${ending.id}:`, error);
    }
  }
  // Default to neutral ending if no conditions match
  return ENDINGS.find(e => e.id === 'ending_neutral')!;
}

/**
 * Check if a choice is available based on current variables
 */
export function isChoiceAvailable(choice: Choice, variables: GameVariables): boolean {
  if (!choice.conditions) return true;

  try {
    const evalContext = { ...variables };
    const conditionFunc = new Function(...Object.keys(evalContext), `return ${choice.conditions}`);
    return conditionFunc(...Object.values(evalContext));
  } catch (error) {
    console.error(`Error evaluating choice condition for ${choice.id}:`, error);
    return false;
  }
}

/**
 * Apply choice effects to game variables
 */
export function applyChoiceEffects(variables: GameVariables, effects: ChoiceEffect): GameVariables {
  const newVariables = { ...variables };

  // Apply numeric changes
  if (effects.ZaraComfort !== undefined) {
    newVariables.ZaraComfort = Math.max(0, Math.min(100, newVariables.ZaraComfort + effects.ZaraComfort));
  }
  if (effects.Trust !== undefined) {
    newVariables.Trust = Math.max(-20, Math.min(30, newVariables.Trust + effects.Trust));
  }
  if (effects.ArtisticCohesion !== undefined) {
    newVariables.ArtisticCohesion = Math.max(0, Math.min(100, newVariables.ArtisticCohesion + effects.ArtisticCohesion));
  }

  // Apply flag changes
  if (effects.selectedMode !== undefined) {
    newVariables.selectedMode = effects.selectedMode;
  }
  if (effects.RequiresNudityConsent !== undefined) {
    newVariables.RequiresNudityConsent = effects.RequiresNudityConsent;
  }
  if (effects.Flag_ArtNudeUsed !== undefined) {
    newVariables.Flag_ArtNudeUsed = effects.Flag_ArtNudeUsed;
  }

  return newVariables;
}

/**
 * Get required assets for a scene
 */
export function getSceneAssets(sceneId: string): Scene['requiredAssets'] | null {
  const scene = SCENES[sceneId];
  return scene ? scene.requiredAssets : null;
}

/**
 * Get next scene ID based on choice
 */
export function getNextScene(choiceId: string): string | null {
  for (const scene of Object.values(SCENES)) {
    const choice = scene.choices.find(c => c.id === choiceId);
    if (choice) {
      return choice.nextScene;
    }
  }
  return null;
}
