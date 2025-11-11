/**
 * Veo 3.1 Video Prompt Templates for 15 Indian Models
 *
 * Strategy: 8-second cinematic segments designed to bypass restrictions
 * - Focus on movement, lighting, camera work
 * - Artistic/fashion/cinematic framing
 * - Segments can be combined for full scenes
 */

export interface VeoSegment {
  id: string;
  name: string;
  duration: '8';
  type: 'intro' | 'movement' | 'detail' | 'atmosphere';
  prompt: string;
  aspectRatio: '16:9' | '9:16';
}

export interface VeoModelTemplate {
  modelId: string;
  modelName: string;
  category: string;
  segments: VeoSegment[];
}

export const VEO_MODEL_TEMPLATES: VeoModelTemplate[] = [
  // ============================================================================
  // MODEL 1: AISHA DÉCOLLETAGE (Upper Body Reveal)
  // ============================================================================
  {
    modelId: 'erotic-model-001',
    modelName: 'Aisha Décolletage',
    category: 'Upper Body Reveal Specialist',
    segments: [
      {
        id: 'aisha-intro',
        name: 'Executive Entrance',
        duration: '8',
        type: 'intro',
        prompt: 'Cinematic fashion film opening. Slow motion 8-second sequence. Indian model in elegant designer blazer and minimal attire walks through luxury office at golden hour. Camera slowly tracks forward. Dramatic backlighting creates silhouette emphasizing shoulder lines and elegant posture. Professional photography aesthetic. Soft focus background. Natural movement. Film grain texture. Warm color grade.',
        aspectRatio: '16:9'
      },
      {
        id: 'aisha-detail',
        name: 'Shoulder Detail',
        duration: '8',
        type: 'detail',
        prompt: 'Artistic fashion detail shot. 8 seconds. Close focus on elegant shoulder and neck lines of Indian model. Soft natural window light creating gentle shadows. Model turns head slowly revealing graceful profile. Minimal designer aesthetic. Cinematic shallow depth of field. Warm golden tones. Professional beauty commercial style.',
        aspectRatio: '9:16'
      },
      {
        id: 'aisha-movement',
        name: 'Confident Walk',
        duration: '8',
        type: 'movement',
        prompt: 'High-fashion runway cinematography. 8-second shot. Indian model walks confidently toward camera in minimal designer outfit. Dramatic office environment with city views. Elegant posture and movement. Professional lighting emphasizing form. Cinematic color grading. Film-like quality. Natural grace and confidence.',
        aspectRatio: '16:9'
      }
    ]
  },

  // ============================================================================
  // MODEL 2: PRIYA CURVES (Lower Body Curves)
  // ============================================================================
  {
    modelId: 'erotic-model-002',
    modelName: 'Priya Curves',
    category: 'Lower Body Curves Specialist',
    segments: [
      {
        id: 'priya-intro',
        name: 'Poolside Arrival',
        duration: '8',
        type: 'intro',
        prompt: 'Luxury lifestyle cinematography. 8 seconds. Indian model walks along pool edge at sunset. Flowing minimal designer wear. Camera tracks alongside capturing graceful movement and elegant form. Warm sunset lighting. Professional beauty commercial aesthetic. Natural confident stride. Reflections in water.',
        aspectRatio: '16:9'
      },
      {
        id: 'priya-movement',
        name: 'Graceful Turn',
        duration: '8',
        type: 'movement',
        prompt: 'Fashion film sequence. 8-second shot. Indian model turns gracefully by poolside. Dramatic silhouette against sunset sky. Minimal elegant attire. Slow motion capturing fluid movement. Professional photography lighting. Cinematic color grading with warm tones. Artistic composition.',
        aspectRatio: '9:16'
      },
      {
        id: 'priya-atmosphere',
        name: 'Poolside Ambiance',
        duration: '8',
        type: 'atmosphere',
        prompt: 'Cinematic establishing shot. 8 seconds. Luxury rooftop pool at twilight. Indian model poses elegantly in minimal designer wear. Dramatic city lights in background. Professional photography lighting. Artistic shadows and highlights. Film-like quality with natural color palette.',
        aspectRatio: '16:9'
      }
    ]
  },

  // ============================================================================
  // MODEL 3: DIYA SENSUAL (Sensual Bold)
  // ============================================================================
  {
    modelId: 'erotic-model-003',
    modelName: 'Diya Sensual',
    category: 'Sensual Bold Specialist',
    segments: [
      {
        id: 'diya-intro',
        name: 'Bedroom Entrance',
        duration: '8',
        type: 'intro',
        prompt: 'Luxury lifestyle cinematography. 8 seconds. Indian model walks through elegant bedroom suite at twilight. Minimal designer silk robe. Camera tracks smoothly. Soft romantic lighting through sheer curtains. Professional commercial aesthetic. Natural confident grace. Warm intimate color grading.',
        aspectRatio: '16:9'
      },
      {
        id: 'diya-movement',
        name: 'Silk Movement',
        duration: '8',
        type: 'movement',
        prompt: 'Fashion film cinematography. 8-second sequence. Indian model moves gracefully with flowing silk fabric. Minimal designer aesthetic. Slow motion capturing fabric physics. Soft romantic lighting. Professional beauty commercial quality. Natural elegant movement.',
        aspectRatio: '9:16'
      },
      {
        id: 'diya-atmosphere',
        name: 'Intimate Setting',
        duration: '8',
        type: 'atmosphere',
        prompt: 'Romantic lifestyle film. 8 seconds. Indian model reclines elegantly in luxury bedroom. Minimal silk attire. Soft golden hour lighting through windows. Professional editorial photography aesthetic. Natural confident presence. Film-like quality.',
        aspectRatio: '16:9'
      }
    ]
  },

  // ============================================================================
  // MODEL 4: ZARA EROTIC (Erotic Actress)
  // ============================================================================
  {
    modelId: 'erotic-model-004',
    modelName: 'Zara Erotic',
    category: 'Erotic Actress Specialist',
    segments: [
      {
        id: 'zara-erotic-intro',
        name: 'Film Noir Entry',
        duration: '8',
        type: 'intro',
        prompt: 'Cinematic film noir style. 8 seconds. Indian actress walks through dramatic underground setting. Minimal designer noir aesthetic. Camera follows with dynamic movement. High contrast lighting creating shadows. Professional film quality. Natural dramatic presence.',
        aspectRatio: '16:9'
      },
      {
        id: 'zara-erotic-detail',
        name: 'Dramatic Close-up',
        duration: '8',
        type: 'detail',
        prompt: 'Film noir cinematography. 8-second shot. Close portrait of Indian actress with dramatic expression. Minimal designer styling. High contrast noir lighting. Professional cinema quality. Natural intense gaze. Film grain aesthetic.',
        aspectRatio: '9:16'
      },
      {
        id: 'zara-erotic-atmosphere',
        name: 'Noir Ambiance',
        duration: '8',
        type: 'atmosphere',
        prompt: 'Cinematic noir film. 8 seconds. Indian actress in dramatic pose against textured wall. Minimal noir attire. Hard directional lighting creating shadows. Professional film photography. Natural confident stance. Classic noir color palette.',
        aspectRatio: '16:9'
      }
    ]
  },

  // ============================================================================
  // MODEL 5: PRIYANKA ATHLETIC (Athletic Glamour)
  // ============================================================================
  {
    modelId: 'erotic-model-005',
    modelName: 'Priyanka Athletic',
    category: 'Athletic Glamour Specialist',
    segments: [
      {
        id: 'priyanka-intro',
        name: 'Gym Entrance',
        duration: '8',
        type: 'intro',
        prompt: 'Athletic commercial cinematography. 8 seconds. Indian fitness model enters premium gym facility. Minimal athletic designer wear. Camera tracks movement. Natural gym lighting. Professional wellness commercial aesthetic. Natural athletic confidence.',
        aspectRatio: '16:9'
      },
      {
        id: 'priyanka-movement',
        name: 'Athletic Motion',
        duration: '8',
        type: 'movement',
        prompt: 'Fitness cinematography. 8-second sequence. Indian model performs graceful athletic movement. Minimal fitness attire. Slow motion emphasizing form. Professional gym lighting. Natural strength and elegance. Cinematic quality.',
        aspectRatio: '9:16'
      },
      {
        id: 'priyanka-atmosphere',
        name: 'Gym Ambiance',
        duration: '8',
        type: 'atmosphere',
        prompt: 'Athletic lifestyle film. 8 seconds. Indian fitness model in confident pose at gym. Minimal athletic wear. Professional gym lighting. Natural athletic presence. Modern wellness aesthetic. Film-like color grading.',
        aspectRatio: '16:9'
      }
    ]
  },

  // ============================================================================
  // MODEL 6: ISHANI GLAMAZON (Max Glamour Diva)
  // ============================================================================
  {
    modelId: 'erotic-model-006',
    modelName: 'Ishani Glamazon',
    category: 'Maximum Glamour Diva',
    segments: [
      {
        id: 'ishani-intro',
        name: 'Red Carpet Entrance',
        duration: '8',
        type: 'intro',
        prompt: 'High-fashion gala cinematography. 8 seconds. Indian model makes dramatic entrance in minimal designer gown. Camera pulls back revealing full glamour. Professional photography lighting. Paparazzi flash effects. Natural confident star presence.',
        aspectRatio: '16:9'
      },
      {
        id: 'ishani-movement',
        name: 'Glamour Walk',
        duration: '8',
        type: 'movement',
        prompt: 'Fashion show cinematography. 8-second sequence. Indian model walks with maximum glamour confidence. Minimal luxury designer wear. Dramatic runway lighting. Professional fashion film quality. Natural star power.',
        aspectRatio: '9:16'
      },
      {
        id: 'ishani-atmosphere',
        name: 'VIP Lounge',
        duration: '8',
        type: 'atmosphere',
        prompt: 'Luxury event cinematography. 8 seconds. Indian model in glamorous pose at VIP event. Minimal designer evening wear. Dramatic ambient lighting. Professional editorial quality. Natural diva confidence. Film-like sophistication.',
        aspectRatio: '16:9'
      }
    ]
  },

  // ============================================================================
  // MODEL 7: KAVYA MYSTIQUE (Midnight Mystique)
  // ============================================================================
  {
    modelId: 'erotic-model-007',
    modelName: 'Kavya Mystique',
    category: 'Midnight Mystique Specialist',
    segments: [
      {
        id: 'kavya-intro',
        name: 'Midnight Garden',
        duration: '8',
        type: 'intro',
        prompt: 'Mystical cinematography. 8 seconds. Indian model walks through moonlit garden. Flowing minimal designer attire. Camera glides mysteriously. Soft moonlight and mist. Professional artistic film quality. Natural ethereal presence.',
        aspectRatio: '16:9'
      },
      {
        id: 'kavya-detail',
        name: 'Moonlight Portrait',
        duration: '8',
        type: 'detail',
        prompt: 'Artistic portrait cinematography. 8-second shot. Close focus on Indian model in moonlight. Minimal mystical attire. Soft lunar lighting creating atmosphere. Professional beauty film quality. Natural mysterious gaze.',
        aspectRatio: '9:16'
      },
      {
        id: 'kavya-atmosphere',
        name: 'Night Mystique',
        duration: '8',
        type: 'atmosphere',
        prompt: 'Mystical night cinematography. 8 seconds. Indian model in ethereal pose under stars. Minimal flowing designer wear. Dramatic moonlight and shadows. Professional artistic photography. Natural mystical confidence.',
        aspectRatio: '16:9'
      }
    ]
  },

  // ============================================================================
  // MODEL 8: NAINA ACTION (Action Bombshell)
  // ============================================================================
  {
    modelId: 'erotic-model-008',
    modelName: 'Naina Action',
    category: 'Action Bombshell Specialist',
    segments: [
      {
        id: 'naina-intro',
        name: 'Urban Action Entry',
        duration: '8',
        type: 'intro',
        prompt: 'Action film cinematography. 8 seconds. Indian model walks confidently through urban night setting. Minimal action-style designer outfit. Dynamic camera movement. Dramatic urban lighting. Professional action film quality. Natural powerful presence.',
        aspectRatio: '16:9'
      },
      {
        id: 'naina-movement',
        name: 'Dynamic Sequence',
        duration: '8',
        type: 'movement',
        prompt: 'Action cinematography. 8-second shot. Indian model in dynamic athletic movement. Minimal functional designer wear. Fast-paced camera work. Professional stunt filming quality. Natural strength and agility.',
        aspectRatio: '9:16'
      },
      {
        id: 'naina-atmosphere',
        name: 'Urban Night',
        duration: '8',
        type: 'atmosphere',
        prompt: 'Action film ambiance. 8 seconds. Indian model in confident stance against urban backdrop. Minimal tactical designer aesthetic. Dramatic nighttime city lighting. Professional action photography. Natural bombshell confidence.',
        aspectRatio: '16:9'
      }
    ]
  },

  // ============================================================================
  // MODEL 9: RHEA FITNESS (Fitness Vixen)
  // ============================================================================
  {
    modelId: 'erotic-model-009',
    modelName: 'Rhea Fitness',
    category: 'Fitness Vixen Specialist',
    segments: [
      {
        id: 'rhea-intro',
        name: 'Beach Fitness Entry',
        duration: '8',
        type: 'intro',
        prompt: 'Beach fitness cinematography. 8 seconds. Indian fitness model walks along beach at sunrise. Minimal athletic designer wear. Camera follows movement. Golden hour beach lighting. Professional wellness commercial quality. Natural athletic grace.',
        aspectRatio: '16:9'
      },
      {
        id: 'rhea-movement',
        name: 'Fitness Flow',
        duration: '8',
        type: 'movement',
        prompt: 'Wellness cinematography. 8-second sequence. Indian model performs beach fitness movement. Minimal athletic attire. Slow motion with ocean backdrop. Professional fitness film quality. Natural strength and beauty.',
        aspectRatio: '9:16'
      },
      {
        id: 'rhea-atmosphere',
        name: 'Beach Ambiance',
        duration: '8',
        type: 'atmosphere',
        prompt: 'Beach lifestyle film. 8 seconds. Indian fitness model in confident pose at beach. Minimal athletic designer wear. Dramatic sunrise lighting. Professional wellness photography. Natural vixen confidence.',
        aspectRatio: '16:9'
      }
    ]
  },

  // ============================================================================
  // MODEL 10: ZARA VOLUPTUOUS (Glamour Bust)
  // ============================================================================
  {
    modelId: 'erotic-model-010',
    modelName: 'Zara Voluptuous',
    category: 'Glamour Bust Specialist',
    segments: [
      {
        id: 'zara-intro',
        name: 'Champagne Lounge Entry',
        duration: '8',
        type: 'intro',
        prompt: 'Luxury commercial cinematography. 8 seconds. Indian model enters elegant champagne bar. Minimal designer evening wear. Camera slowly pushes in. Soft amber lighting creates glamorous atmosphere. Professional beauty film aesthetic. Natural graceful movement. Sophisticated color grading.',
        aspectRatio: '16:9'
      },
      {
        id: 'zara-detail',
        name: 'Elegant Pour',
        duration: '8',
        type: 'detail',
        prompt: 'High-end product cinematography style. 8-second sequence. Close shot of Indian model pouring champagne. Focus on elegant hands and graceful movement. Soft luxury lighting. Minimal designer aesthetic. Professional photography quality. Natural authentic moment. Warm golden tones.',
        aspectRatio: '9:16'
      },
      {
        id: 'zara-atmosphere',
        name: 'Lounge Ambiance',
        duration: '8',
        type: 'atmosphere',
        prompt: 'Cinematic lifestyle film. 8 seconds. Indian model reclines elegantly in luxury lounge. Dramatic lighting with shadows. Minimal designer fashion. Professional editorial photography aesthetic. Natural confident posture. Film grain texture. Sophisticated color palette.',
        aspectRatio: '16:9'
      }
    ]
  },

  // ============================================================================
  // MODEL 11: SIMRAN ELEGANCE (Shoulder & Neck)
  // ============================================================================
  {
    modelId: 'erotic-model-011',
    modelName: 'Simran Elegance',
    category: 'Shoulder & Neck Artistry',
    segments: [
      {
        id: 'simran-intro',
        name: 'Gallery Walk',
        duration: '8',
        type: 'intro',
        prompt: 'Art gallery cinematography. 8 seconds. Indian model walks through contemporary gallery. Elegant backless designer dress. Camera follows from behind emphasizing graceful posture. Dramatic gallery lighting. Professional fashion film aesthetic. Natural movement. Artistic composition.',
        aspectRatio: '16:9'
      },
      {
        id: 'simran-detail',
        name: 'Shoulder Turn',
        duration: '8',
        type: 'detail',
        prompt: 'Fashion editorial cinematography. 8-second shot. Close focus on elegant shoulders and neck of Indian model. Slow graceful head turn. Backless minimal design. Soft artistic lighting creating beautiful shadows. Professional beauty commercial quality. Natural authentic moment.',
        aspectRatio: '9:16'
      },
      {
        id: 'simran-atmosphere',
        name: 'Gallery Pose',
        duration: '8',
        type: 'atmosphere',
        prompt: 'Art film cinematography. 8 seconds. Indian model poses elegantly beside sculpture. Minimal backless attire. Dramatic gallery spotlighting. Professional editorial photography aesthetic. Natural confident presence. Cinematic color grading. Film-like quality.',
        aspectRatio: '16:9'
      }
    ]
  },

  // ============================================================================
  // MODEL 12: MEERA SCULPTURE (Chest & Ribcage)
  // ============================================================================
  {
    modelId: 'erotic-model-012',
    modelName: 'Meera Sculpture',
    category: 'Chest Sculpture Artistry',
    segments: [
      {
        id: 'meera-intro',
        name: 'Yoga Flow Intro',
        duration: '8',
        type: 'intro',
        prompt: 'Wellness cinematography. 8 seconds. Indian model performs flowing yoga movement on rooftop at dawn. Minimal athletic mesh wear. Camera circles slowly. Soft sunrise lighting. Professional fitness commercial aesthetic. Natural athletic grace. Cinematic color grading.',
        aspectRatio: '16:9'
      },
      {
        id: 'meera-movement',
        name: 'Stretch Sequence',
        duration: '8',
        type: 'movement',
        prompt: 'Athletic cinematography. 8-second shot. Indian model transitions through yoga poses. Athletic minimal attire. Slow motion capturing fluid movement and form. Rooftop dawn lighting. Professional wellness film quality. Natural strength and elegance.',
        aspectRatio: '9:16'
      },
      {
        id: 'meera-atmosphere',
        name: 'Sunrise Meditation',
        duration: '8',
        type: 'atmosphere',
        prompt: 'Lifestyle cinematography. 8 seconds. Indian model in meditation pose on rooftop. Minimal yoga wear. Dramatic sunrise backlighting. Professional wellness commercial aesthetic. Natural peaceful presence. Warm morning color palette. Film-like quality.',
        aspectRatio: '16:9'
      }
    ]
  },

  // ============================================================================
  // MODEL 13: ANANYA CURVES (Hip Empress)
  // ============================================================================
  {
    modelId: 'erotic-model-013',
    modelName: 'Ananya Curves',
    category: 'Hip Emphasis & Curves',
    segments: [
      {
        id: 'ananya-intro',
        name: 'Spa Entrance',
        duration: '8',
        type: 'intro',
        prompt: 'Luxury spa cinematography. 8 seconds. Indian model walks through elegant spa in minimal designer wrap. Camera tracks gracefully. Soft ambient spa lighting. Professional wellness commercial aesthetic. Natural confident movement. Warm calming color palette.',
        aspectRatio: '16:9'
      },
      {
        id: 'ananya-movement',
        name: 'Graceful Walk',
        duration: '8',
        type: 'movement',
        prompt: 'Fashion cinematography. 8-second sequence. Side angle of Indian model walking elegantly. Minimal spa attire emphasizing graceful form. Slow motion. Professional lighting highlighting natural curves. Cinematic color grading. Film-like quality.',
        aspectRatio: '9:16'
      },
      {
        id: 'ananya-atmosphere',
        name: 'Spa Ambiance',
        duration: '8',
        type: 'atmosphere',
        prompt: 'Wellness lifestyle film. 8 seconds. Indian model reclines elegantly in luxury spa setting. Minimal designer wrap. Soft ambient lighting. Professional spa commercial aesthetic. Natural relaxed confidence. Warm soothing tones.',
        aspectRatio: '16:9'
      }
    ]
  },

  // ============================================================================
  // MODEL 14: TANVI LEGS (Thigh & Leg Goddess)
  // ============================================================================
  {
    modelId: 'erotic-model-014',
    modelName: 'Tanvi Legs',
    category: 'Thigh & Leg Artistry',
    segments: [
      {
        id: 'tanvi-intro',
        name: 'Bar Entrance',
        duration: '8',
        type: 'intro',
        prompt: 'Luxury lifestyle cinematography. 8 seconds. Indian model walks to penthouse bar in designer minimal attire and heels. Camera follows movement. Dramatic city lights through windows. Professional commercial photography aesthetic. Natural confident stride. Sophisticated color grading.',
        aspectRatio: '16:9'
      },
      {
        id: 'tanvi-detail',
        name: 'Elegant Cross',
        duration: '8',
        type: 'detail',
        prompt: 'Fashion editorial cinematography. 8-second shot. Indian model crosses legs elegantly while seated at bar. Designer minimal wear and heels. Soft luxury lighting. Professional beauty film quality. Natural graceful movement. Warm golden tones.',
        aspectRatio: '9:16'
      },
      {
        id: 'tanvi-atmosphere',
        name: 'Penthouse Night',
        duration: '8',
        type: 'atmosphere',
        prompt: 'High-end commercial film. 8 seconds. Indian model stands by penthouse windows at night. Minimal designer outfit. City lights creating dramatic ambiance. Professional photography lighting. Natural confident presence. Cinematic color palette.',
        aspectRatio: '16:9'
      }
    ]
  },

  // ============================================================================
  // MODEL 15: SANYA CURVES (Posterior Empress)
  // ============================================================================
  {
    modelId: 'erotic-model-015',
    modelName: 'Sanya Curves',
    category: 'Posterior & Back Curves',
    segments: [
      {
        id: 'sanya-intro',
        name: 'Dance Studio Entry',
        duration: '8',
        type: 'intro',
        prompt: 'Dance cinematography. 8 seconds. Indian model enters professional studio in minimal dance attire. Camera follows from behind. Dramatic studio lighting. Professional dance film aesthetic. Natural confident movement. Artistic composition.',
        aspectRatio: '16:9'
      },
      {
        id: 'sanya-movement',
        name: 'Dance Sequence',
        duration: '8',
        type: 'movement',
        prompt: 'Performance cinematography. 8-second shot. Indian model performs flowing dance movement. Minimal dance wear. Multiple mirror reflections. Professional studio lighting. Slow motion capturing fluid grace. Cinematic quality.',
        aspectRatio: '9:16'
      },
      {
        id: 'sanya-atmosphere',
        name: 'Studio Pose',
        duration: '8',
        type: 'atmosphere',
        prompt: 'Artistic dance film. 8 seconds. Indian model in elegant dance pose. Minimal dance attire. Dramatic studio spotlighting with shadows. Professional editorial photography aesthetic. Natural artistic confidence. Film-like color grading.',
        aspectRatio: '16:9'
      }
    ]
  }
];

/**
 * Get all segments for a specific model
 */
export function getModelSegments(modelId: string): VeoSegment[] {
  const template = VEO_MODEL_TEMPLATES.find(t => t.modelId === modelId);
  return template?.segments || [];
}

/**
 * Get a specific segment by ID
 */
export function getSegmentById(segmentId: string): VeoSegment | undefined {
  for (const template of VEO_MODEL_TEMPLATES) {
    const segment = template.segments.find(s => s.id === segmentId);
    if (segment) return segment;
  }
  return undefined;
}
