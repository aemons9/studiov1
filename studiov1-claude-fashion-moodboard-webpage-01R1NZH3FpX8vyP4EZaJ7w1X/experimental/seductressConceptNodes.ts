import type { VisualNode } from '../types';

/**
 * PRE-BUILT INDIAN SEDUCTRESS CONCEPT NODES
 *
 * These are complete, ready-to-use concepts centered around Indian Seductress models.
 * Clicking one button auto-selects all related nodes and configures the full shot.
 *
 * Organized by intimacy/seduction level (1-12 range primarily)
 *
 * NOW WITH AUTO-CONFIGURE MAPPINGS for proper migration to JSON mode!
 */

export const seductressConceptNodes: VisualNode[] = [
  // LEVEL 4-6: EDITORIAL CONFIDENCE
  {
    id: 'concept-power-exec',
    category: 'concept',
    name: 'Power Executive',
    abbreviation: 'EXEC',
    icon: '👔',
    color: '#8B5CF6',
    shape: 'circle',
    effects: {
      intimacy: [4, 6],
      seduction: [5, 7],
      eroticism: [4, 6],
      professionalism: [5, 7],
      power: [8, 10],
      boundary: [4, 6],
    },
    description: 'Indian Seductress in boardroom power suit, unbuttoned blazer, commanding presence',
    compatibleWith: ['subject-seductress', 'wardrobe-power-suit', 'pose-confident-allure', 'env-corporate', 'weave-passion'],
    autoConfigures: {
      shot: 'Corporate power photography. Intimacy 6/10, commanding presence.',
      subject: {
        variant: 'Indian Seductress bombshell with hourglass figure (bust 40DD", waist 26", hips 44"), confident sensual presence, corporate power specialist',
        pose: 'Commanding authoritative posture with corporate confidence, power stance with editorial elegance',
        hair_color: 'jet black',
        hair_style: 'Sleek executive styling with sophisticated volume',
        skin_finish: 'Luminous professional finish with radiant glow',
        hand_and_nail_details: 'Executive manicure with impeccable attention to detail',
        tattoos: 'none',
        piercings: 'none',
        body_art: 'none',
        nail_art: 'Bold red executive polish',
        high_heels: 'Designer stiletto power heels'
      },
      wardrobe: 'Power suit with unbuttoned blazer revealing foundation beneath, executive tailoring',
      environment: 'Modern corporate boardroom with floor-to-ceiling windows, executive furnishings',
      lighting: 'Professional studio-quality lighting with dramatic shadows, corporate atmosphere',
      camera: {
        focal_length: '50mm',
        aperture: 'f/2.8',
        distance: '3 m',
        angle: 'Slightly low angle emphasizing executive authority',
        framing: 'Full body corporate portrait showing professional power'
      },
      color_grade: 'Rich dramatic tones with sensual warmth and executive depth',
      style: 'Corporate fine-art photography celebrating feminine executive power',
      quality: 'Ultra-high-end 8K corporate fashion photography with impeccable detail',
      figure_and_form: 'Hourglass bombshell form with confident curves and professional sophistication',
      skin_micro_details: 'Premium high-resolution skin texture with executive-level retouching',
      fabric_physics: 'Luxury corporate fabric with precise tailoring and strategic draping',
      material_properties: 'Executive fabrics with premium light interaction'
    }
  },
  {
    id: 'concept-fashion-editorial',
    category: 'concept',
    name: 'Fashion Editorial',
    abbreviation: 'FASH',
    icon: '📸',
    color: '#8B5CF6',
    shape: 'circle',
    effects: {
      intimacy: [5, 7],
      seduction: [6, 8],
      eroticism: [5, 7],
      professionalism: [6, 8],
      abstraction: [6, 8],
      boundary: [5, 7],
    },
    description: 'High-fashion editorial with dramatic lighting and bold wardrobe',
    compatibleWith: ['subject-seductress', 'wardrobe-asymmetric-wrap', 'pose-confident-allure', 'env-fashion-studio', 'light-editorial'],
    autoConfigures: {
      shot: 'High-fashion editorial photography. Intimacy 6/10, editorial confidence.',
      subject: {
        variant: 'Indian Seductress bombshell with hourglass figure (bust 40DD", waist 26", hips 44"), fashion editorial expertise',
        pose: 'Confident allure with intentional body language, editorial power stance',
        hair_color: 'jet black',
        hair_style: 'Glamorous voluminous styling with dramatic editorial movement',
        skin_finish: 'Luminous dewy finish with radiant professional glow',
        hand_and_nail_details: 'Fashion editorial manicure with sophisticated refinement',
        tattoos: 'none',
        piercings: 'none',
        body_art: 'none',
        nail_art: 'Bold editorial polish',
        high_heels: 'Designer runway heels'
      },
      wardrobe: 'Asymmetric wrap design with sophisticated partial coverage, high-fashion architectural pieces',
      environment: 'Professional fashion photography studio with editorial backdrop and dramatic elements',
      lighting: 'Dramatic editorial lighting with high-fashion contrast and sculptural shadows',
      camera: {
        focal_length: '85mm f/1.4',
        aperture: 'f/2.0',
        distance: '2.5 m',
        angle: 'Fashion editorial perspective with dramatic composition',
        framing: 'Full body editorial composition with negative space'
      },
      color_grade: 'High fashion color with editorial sophistication and dramatic richness',
      style: 'Vogue/Harper\'s Bazaar high-fashion editorial celebrating confident elegance',
      quality: 'Ultra-premium 8K fashion photography with editorial perfection',
      figure_and_form: 'Hourglass bombshell form with confident seductive curves',
      skin_micro_details: 'Ultra-high-resolution authentic skin texture with fashion-grade retouching',
      fabric_physics: 'High fashion fabrics with editorial draping and architectural movement',
      material_properties: 'Fashion materials with editorial light interaction and luxury finish'
    }
  },

  // LEVEL 7-9: SENSUAL SOPHISTICATION
  {
    id: 'concept-glamour-vintage',
    category: 'concept',
    name: 'Vintage Glamour',
    abbreviation: 'GLAM',
    icon: '🎀',
    color: '#9333EA',
    shape: 'circle',
    effects: {
      intimacy: [7, 9],
      seduction: [8, 10],
      eroticism: [7, 9],
      professionalism: [8, 10],
      boundary: [7, 9],
    },
    description: 'Classic pin-up style with vintage corset, Hollywood glamour lighting',
    compatibleWith: ['subject-seductress', 'wardrobe-vintage-corset', 'pose-confident-allure', 'env-fashion-studio', 'style-editorial'],
    autoConfigures: {
      shot: 'Classic vintage glamour photography. Intimacy 7/10, pin-up elegance.',
      subject: {
        variant: 'Indian Seductress bombshell with hourglass figure (bust 40DD", waist 26", hips 44"), vintage pin-up expertise',
        pose: 'Confident allure with vintage pin-up body language, classic seductive positioning',
        hair_color: 'jet black',
        hair_style: 'Classic Hollywood waves with vintage glamour volume and sophisticated styling',
        skin_finish: 'Classic Hollywood luminous finish with glamour radiance',
        hand_and_nail_details: 'Vintage glamour manicure with classic refinement',
        tattoos: 'none',
        piercings: 'none',
        body_art: 'none',
        nail_art: 'Classic red vintage polish',
        high_heels: 'Classic vintage heels'
      },
      wardrobe: 'Vintage corset with classic pin-up styling, sophisticated vintage foundation pieces',
      environment: 'Classic photography studio with vintage backdrop and Hollywood glamour atmosphere',
      lighting: 'Classic Hollywood glamour lighting with soft sculptural shadows and vintage brilliance',
      camera: {
        focal_length: '85mm',
        aperture: 'f/2.8',
        distance: '2.5 m',
        angle: 'Classic pin-up perspective with vintage framing',
        framing: 'Full body vintage composition with classic proportions'
      },
      color_grade: 'Warm vintage tones with classic Hollywood richness and glamour depth',
      style: 'Classic pin-up photography celebrating vintage Hollywood glamour and timeless elegance',
      quality: 'Premium 8K with vintage aesthetic and classic Hollywood perfection',
      figure_and_form: 'Hourglass bombshell form with vintage pin-up curves and classic glamour',
      skin_micro_details: 'High-resolution skin texture with classic Hollywood retouching',
      fabric_physics: 'Vintage corset fabrics with classic structured tailoring and glamour draping',
      material_properties: 'Vintage materials with classic light interaction and Hollywood glamour finish'
    }
  },
  {
    id: 'concept-silk-elegance',
    category: 'concept',
    name: 'Silk Elegance',
    abbreviation: 'SILK',
    icon: '💃',
    color: '#9333EA',
    shape: 'circle',
    effects: {
      intimacy: [7, 9],
      seduction: [8, 10],
      eroticism: [7, 9],
      professionalism: [8, 10],
      boundary: [7, 9],
    },
    description: 'Flowing silk slip dress, soft intimate lighting, editorial sophistication',
    compatibleWith: ['subject-seductress', 'wardrobe-silk-slip', 'pose-confident-allure', 'env-private-loft', 'light-studio-soft'],
    autoConfigures: {
      shot: 'Intimate silk photography with editorial sophistication. Intimacy 7/10, flowing elegance.',
      subject: {
        variant: 'Indian Seductress bombshell with hourglass figure (bust 40DD", waist 26", hips 44"), intimate editorial expertise',
        pose: 'Confident allure with flowing body language, editorial seductive positioning with silk grace',
        hair_color: 'jet black',
        hair_style: 'Long flowing waves with natural volume and sensual movement',
        skin_finish: 'Dewy luminous finish with intimate radiance',
        hand_and_nail_details: 'Elegant manicure with intimate refinement',
        tattoos: 'none',
        piercings: 'none',
        body_art: 'none',
        nail_art: 'Elegant sensual polish',
        high_heels: 'Designer stiletto heels'
      },
      wardrobe: 'Flowing silk slip dress with elegant draping, sophisticated partial coverage with sensual reveals',
      environment: 'Private luxury loft with intimate sophisticated atmosphere and editorial elements',
      lighting: 'Soft intimate lighting with romantic atmosphere and gentle sculptural shadows',
      camera: {
        focal_length: '85mm f/1.4',
        aperture: 'f/1.8',
        distance: '2 m',
        angle: 'Intimate editorial perspective with flowing composition',
        framing: 'Medium-close composition emphasizing flowing curves and elegance'
      },
      color_grade: 'Warm romantic tones with sensual depth and elegant highlights',
      style: 'Editorial intimate photography celebrating silk elegance and seductive sophistication',
      quality: 'Ultra-premium 8K with exceptional detail and intimate editorial quality',
      figure_and_form: 'Hourglass bombshell form with flowing curves and silk-draped elegance',
      skin_micro_details: 'Ultra-high-resolution authentic skin texture with intimate retouching',
      fabric_physics: 'Silk slip with elegant flowing draping and sensual body-responsive movement',
      material_properties: 'Luxury silk with sensual light interaction and flowing specular highlights'
    }
  },

  // LEVEL 8-10: ARTISTIC SEDUCTION
  {
    id: 'concept-architectural-form',
    category: 'concept',
    name: 'Architectural Form',
    abbreviation: 'ARCH',
    icon: '⚡',
    color: '#A855F7',
    shape: 'circle',
    effects: {
      intimacy: [9, 11],
      seduction: [9, 11],
      eroticism: [9, 11],
      professionalism: [10, 12],
      abstraction: [12, 14],
      boundary: [9, 11],
    },
    description: 'Geometric harness creating sculptural patterns, chiaroscuro lighting',
    compatibleWith: ['subject-super-seductress', 'wardrobe-geometric-harness', 'pose-seductive-invitation', 'env-private-loft', 'light-chiaroscuro'],
    autoConfigures: {
      shot: 'Architectural artistic photography with geometric sophistication. Intimacy 9/10, sculptural elegance.',
      subject: {
        variant: 'Super-Seductress Artist with voluptuous statuesque proportions (bust 40DD", waist 26", hips 44"), elite artistic model expertise, bi-polar range from corporate power to vulnerable erotic-muse',
        pose: 'Seductive invitation positioning with architectural body language, geometric sculptural stance with bold confidence',
        hair_color: 'jet black',
        hair_style: 'Dramatic volume with architectural styling and powerful artistic presence',
        skin_finish: 'Maximum luminous artistic glow with radiant sculptural perfection',
        hand_and_nail_details: 'Architectural gesture with artistic refinement',
        tattoos: 'none',
        piercings: 'none',
        body_art: 'none',
        nail_art: 'Bold artistic polish',
        high_heels: 'Architectural designer heels'
      },
      wardrobe: 'Geometric harness creating sculptural patterns, architectural foundation pieces with bold geometric reveals',
      environment: 'Private artistic loft with sculptural elements and geometric luxury atmosphere',
      lighting: 'Bold chiaroscuro lighting with dramatic sculptural shadows and architectural illumination',
      camera: {
        focal_length: '85mm f/1.4',
        aperture: 'f/2.0',
        distance: '2 m',
        angle: 'Architectural perspective emphasizing geometric form',
        framing: 'Artistic composition emphasizing sculptural presence'
      },
      color_grade: 'Bold architectural color with dramatic depth and geometric richness',
      style: 'Architectural fine-art photography celebrating geometric sculptural elegance',
      quality: 'Museum-quality 8K fine-art photography with architectural perfection',
      figure_and_form: 'Voluptuous sculptural form with geometric architectural elegance and maximum artistic confidence',
      skin_micro_details: 'Ultra-high-resolution authentic skin texture with architectural detail and realistic subsurface scattering',
      fabric_physics: 'Geometric harness fabrics with architectural structure and sculptural reveals',
      material_properties: 'Architectural materials with geometric light interaction and bold specular highlights'
    }
  },
  {
    id: 'concept-cultural-fusion',
    category: 'concept',
    name: 'Cultural Fusion',
    abbreviation: 'CULT',
    icon: '🪷',
    color: '#A855F7',
    shape: 'circle',
    effects: {
      intimacy: [8, 10],
      seduction: [9, 11],
      eroticism: [8, 10],
      professionalism: [9, 11],
      abstraction: [9, 11],
      boundary: [8, 10],
    },
    description: 'Sensual sari drape meets modern photography, traditional-contemporary blend',
    compatibleWith: ['subject-seductress', 'wardrobe-sari-drape', 'pose-seductive-invitation', 'env-private-loft', 'light-editorial'],
    autoConfigures: {
      shot: 'Cultural fusion photography blending traditional and modern. Intimacy 8/10, contemporary elegance.',
      subject: {
        variant: 'Indian Seductress bombshell with hourglass figure (bust 40DD", waist 26", hips 44"), cultural fusion expertise',
        pose: 'Seductive invitation with cultural grace, traditional-modern body language with confident allure',
        hair_color: 'jet black',
        hair_style: 'Traditional styling with modern sophistication and cultural elegance',
        skin_finish: 'Luminous cultural finish with traditional radiance',
        hand_and_nail_details: 'Traditional gesture with modern refinement',
        tattoos: 'none',
        piercings: 'none',
        body_art: 'none',
        nail_art: 'Traditional artistic polish',
        high_heels: 'Modern designer heels'
      },
      wardrobe: 'Sensual sari drape meets modern photography, traditional fabrics with contemporary reveals',
      environment: 'Private artistic loft with cultural elements and contemporary luxury atmosphere',
      lighting: 'Editorial dramatic lighting with cultural atmosphere and contemporary shadows',
      camera: {
        focal_length: '85mm f/1.4',
        aperture: 'f/2.0',
        distance: '2.5 m',
        angle: 'Cultural editorial perspective with traditional-modern composition',
        framing: 'Full body cultural-contemporary composition'
      },
      color_grade: 'Rich cultural tones with traditional depth and modern sophistication',
      style: 'Cultural fusion photography celebrating traditional-contemporary seductive elegance',
      quality: 'Premium 8K with cultural authenticity and contemporary perfection',
      figure_and_form: 'Hourglass bombshell form with cultural grace and modern seductive confidence',
      skin_micro_details: 'Ultra-high-resolution authentic skin texture with cultural beauty standards',
      fabric_physics: 'Traditional sari fabrics with contemporary draping and cultural-modern reveals',
      material_properties: 'Traditional materials with cultural light interaction and contemporary finish'
    }
  },

  // LEVEL 10-12: NIGHT OF PASSION (PRIMARY RANGE)
  {
    id: 'concept-boudoir-passion',
    category: 'concept',
    name: 'Boudoir Passion',
    abbreviation: 'BOUD',
    icon: '🌹',
    color: '#C084FC',
    shape: 'circle',
    effects: {
      intimacy: [10, 12],
      seduction: [11, 13],
      eroticism: [11, 13],
      professionalism: [10, 12],
      boundary: [10, 12],
    },
    description: 'Intimate boudoir with lace teddy, soft sensual lighting, night of passion aesthetic',
    compatibleWith: ['subject-super-seductress', 'wardrobe-lace-teddy', 'pose-seductive-invitation', 'env-boudoir', 'light-chiaroscuro', 'weave-passion'],
    autoConfigures: {
      shot: 'Intimate boudoir photography with passionate expression. Intimacy 10/10, night passion aesthetic.',
      subject: {
        variant: 'Super-Seductress Artist with voluptuous statuesque proportions (bust 40DD", waist 26", hips 44"), elite artistic model expertise, bi-polar range with maximum intimate confidence',
        pose: 'Seductive invitation with intimate passionate body language, bold erotic positioning with confident vulnerability',
        hair_color: 'jet black',
        hair_style: 'Loose flowing waves with intimate sensual styling and passionate movement',
        skin_finish: 'Luminous intimate glow with passionate warm radiance',
        hand_and_nail_details: 'Intimate seductive hand placement with passionate refinement',
        tattoos: 'none',
        piercings: 'none',
        body_art: 'none',
        nail_art: 'Bold passionate red polish',
        high_heels: 'Luxury boudoir heels'
      },
      wardrobe: 'Lace teddy with intimate artistic sophistication, revealing luxury lingerie with passionate boudoir style',
      environment: 'Luxury private bedroom with intimate boudoir atmosphere, silk sheets, and passionate romantic setting',
      lighting: 'Intimate soft lighting creating warmth and connection, romantic passionate shadows with seductive glow',
      camera: {
        focal_length: '85mm f/1.4',
        aperture: 'f/1.8',
        distance: '1.5 m',
        angle: 'Intimate close perspective with passionate connection',
        framing: 'Close intimate framing emphasizing curves and passionate sensuality'
      },
      color_grade: 'Warm intimate passionate tones with romantic depth and seductive highlights',
      style: 'Erotic art photography tradition with bold passionate sensuality and intimate artistic excellence',
      quality: 'Ultra-premium 8K resolution with museum-grade passionate quality and intimate perfection',
      figure_and_form: 'Voluptuous bombshell form with intimate sculptural passionate curves and erotic artistic elegance',
      skin_micro_details: 'Ultra-high-resolution authentic skin texture with visible pores, passionate radiance, and realistic scattering',
      fabric_physics: 'Luxury lace lingerie with intimate draping, sheer passionate reveals, and erotic interaction',
      material_properties: 'Lace, silk, satin with intimate passionate light interaction and sensual specular highlights'
    }
  },
  {
    id: 'concept-midnight-seduction',
    category: 'concept',
    name: 'Midnight Seduction',
    abbreviation: 'MIDN',
    icon: '🌙',
    color: '#C084FC',
    shape: 'circle',
    effects: {
      intimacy: [11, 13],
      seduction: [12, 14],
      eroticism: [12, 14],
      professionalism: [11, 13],
      power: [10, 12],
      boundary: [11, 13],
    },
    description: 'Super-Seductress in open satin robe, dramatic shadow play, lustful expression',
    compatibleWith: ['subject-super-seductress', 'wardrobe-satin-robe', 'pose-passionate-expression', 'env-boudoir', 'light-shadow-play', 'weave-passion'],
    autoConfigures: {
      shot: 'Midnight seduction photography with shadow play. Intimacy 10/10, midnight allure.',
      subject: {
        variant: 'Super-Seductress Artist with voluptuous statuesque proportions (bust 40DD", waist 26", hips 44"), elite artistic model expertise, bi-polar range with lustful expression',
        pose: 'Passionate expression with bold lustful body language, uninhibited seductive positioning with midnight confidence',
        hair_color: 'jet black',
        hair_style: 'Dramatic maximum volume with midnight sensual flow and lustful styling',
        skin_finish: 'Maximum luminous midnight glow with lustful radiant perfection',
        hand_and_nail_details: 'Passionate midnight gesture with maximum sensual refinement',
        tattoos: 'none',
        piercings: 'none',
        body_art: 'none',
        nail_art: 'Bold midnight power polish',
        high_heels: 'Maximum designer midnight heels'
      },
      wardrobe: 'Open satin robe with minimal coverage, midnight seduction pieces with maximum artistic reveals',
      environment: 'Private luxury bedroom with midnight intimate atmosphere, shadow play setting with dramatic elements',
      lighting: 'Dramatic shadow play lighting with midnight artistic shadows and powerful seductive illumination',
      camera: {
        focal_length: '85mm f/1.4',
        aperture: 'f/1.4',
        distance: '1.8 m',
        angle: 'Low angle emphasizing midnight power with intimate connection',
        framing: 'Artistic midnight composition emphasizing power and lustful form'
      },
      color_grade: 'Bold midnight dramatic color with rich lustful warmth and powerful depth',
      style: 'Midnight seduction photography with bold lustful sensuality and shadow play artistry',
      quality: 'Ultra-premium 8K with midnight perfection and maximum lustful artistic detail',
      figure_and_form: 'Voluptuous bombshell form with midnight sculptural presence and maximum lustful confidence',
      skin_micro_details: 'Ultra-high-resolution authentic skin texture with midnight radiance and visible natural detail',
      fabric_physics: 'Satin robe with minimal midnight coverage, flowing dramatic draping with lustful reveals',
      material_properties: 'Satin with maximum midnight light interaction and bold lustful specular highlights'
    }
  },
  {
    id: 'concept-leather-dominance',
    category: 'concept',
    name: 'Leather Dominance',
    abbreviation: 'LEAT',
    icon: '🔥',
    color: '#C084FC',
    shape: 'circle',
    effects: {
      intimacy: [11, 13],
      seduction: [12, 14],
      eroticism: [12, 14],
      professionalism: [11, 13],
      power: [14, 16],
      boundary: [11, 13],
    },
    description: 'Strappy leather set, bold chiaroscuro, power dynamics and seduction merged',
    compatibleWith: ['subject-super-seductress', 'wardrobe-strappy-set', 'pose-passionate-expression', 'env-private-loft', 'light-chiaroscuro', 'weave-passion', 'style-newton'],
    autoConfigures: {
      shot: 'Leather dominance photography with power dynamics. Intimacy 10/10, bold power seduction.',
      subject: {
        variant: 'Super-Seductress Artist with voluptuous statuesque proportions (bust 40DD", waist 26", hips 44"), elite artistic model expertise, bi-polar range with power dominance expression',
        pose: 'Passionate expression with bold power dominance body language, commanding seductive positioning with leather confidence',
        hair_color: 'jet black',
        hair_style: 'Dramatic powerful volume with leather styling and dominant presence',
        skin_finish: 'Maximum luminous power glow with dominant radiant perfection',
        hand_and_nail_details: 'Power dominance gesture with maximum bold refinement',
        tattoos: 'none',
        piercings: 'none',
        body_art: 'none',
        nail_art: 'Bold power dominance polish',
        high_heels: 'Maximum designer power heels'
      },
      wardrobe: 'Strappy leather set with bold architectural structure, power dominance pieces with maximum confident reveals',
      environment: 'Private artistic loft with power atmosphere and dramatic luxury elements',
      lighting: 'Bold chiaroscuro lighting with power dominance shadows and commanding seductive illumination',
      camera: {
        focal_length: '85mm f/1.4',
        aperture: 'f/1.4',
        distance: '2 m',
        angle: 'Low angle emphasizing power dominance with seductive perspective',
        framing: 'Artistic power composition emphasizing dominance and bold form'
      },
      color_grade: 'Bold dramatic power color with rich seductive warmth and commanding depth',
      style: 'Helmut Newton inspired power dominance photography with bold leather seduction',
      quality: 'Ultra-premium 8K with power perfection and maximum bold artistic detail',
      figure_and_form: 'Voluptuous powerful form with commanding sculptural presence and maximum dominance confidence',
      skin_micro_details: 'Ultra-high-resolution authentic skin texture with power radiance and realistic detail',
      fabric_physics: 'Strappy leather with bold structure, power draping with dominant reveals',
      material_properties: 'Leather with maximum power light interaction and bold dominant specular highlights'
    }
  },

  // LEVEL 12-14: BOLD SEDUCTION
  {
    id: 'concept-fishnet-fantasy',
    category: 'concept',
    name: 'Fishnet Fantasy',
    abbreviation: 'FISH',
    icon: '🕸️',
    color: '#D8B4FE',
    shape: 'circle',
    effects: {
      intimacy: [12, 14],
      seduction: [13, 15],
      eroticism: [13, 15],
      professionalism: [12, 14],
      boundary: [12, 14],
    },
    description: 'Geometric fishnet bodysuit, intimate close-ups, bold erotic art aesthetic',
    compatibleWith: ['subject-super-seductress', 'wardrobe-fishnet-bodysuit', 'pose-passionate-expression', 'env-private-loft', 'light-chiaroscuro', 'weave-intimate', 'style-newton'],
    autoConfigures: {
      shot: 'Geometric fishnet photography with bold artistic vision. Intimacy 10/10, bold geometric style.',
      subject: {
        variant: 'Super-Seductress Artist with voluptuous statuesque proportions (bust 40DD", waist 26", hips 44"), elite artistic model expertise, maximum artistic confidence',
        pose: 'Passionate expression with bold geometric body language, artistic erotic positioning with maximum confidence',
        hair_color: 'jet black',
        hair_style: 'Dramatic maximum volume with geometric styling and bold presence',
        skin_finish: 'Maximum luminous artistic glow with geometric radiance',
        hand_and_nail_details: 'Artistic bold gesture with geometric refinement',
        tattoos: 'none',
        piercings: 'none',
        body_art: 'none',
        nail_art: 'Bold geometric polish',
        high_heels: 'Maximum designer artistic heels'
      },
      wardrobe: 'Geometric fishnet bodysuit creating sculptural patterns, bold artistic pieces with maximum geometric reveals',
      environment: 'Private artistic loft with geometric elements and bold luxury atmosphere',
      lighting: 'Bold chiaroscuro lighting with geometric shadows and maximum artistic illumination',
      camera: {
        focal_length: '85mm f/1.4',
        aperture: 'f/1.4',
        distance: '1.5 m',
        angle: 'Intimate close geometric perspective with artistic framing',
        framing: 'Close intimate composition emphasizing geometric patterns and bold form'
      },
      color_grade: 'Bold geometric artistic color with maximum richness and dramatic depth',
      style: 'Helmut Newton inspired geometric erotic art with bold fishnet sophistication',
      quality: 'Museum-quality 8K with maximum geometric perfection and bold artistic detail',
      figure_and_form: 'Voluptuous geometric form with maximum sculptural elegance and bold artistic confidence',
      skin_micro_details: 'Ultra-high-resolution authentic skin texture with geometric patterns and visible detail',
      fabric_physics: 'Geometric fishnet with bold structure, artistic draping with maximum reveals',
      material_properties: 'Fishnet with maximum geometric light interaction and bold artistic highlights'
    }
  },
  {
    id: 'concept-chain-goddess',
    category: 'concept',
    name: 'Chain Goddess',
    abbreviation: 'GODE',
    icon: '⛓️',
    color: '#D8B4FE',
    shape: 'circle',
    effects: {
      intimacy: [13, 15],
      seduction: [13, 15],
      eroticism: [13, 15],
      professionalism: [13, 15],
      abstraction: [14, 16],
      boundary: [13, 15],
    },
    description: 'Chain drape system creating liquid metal effect, sculptural abstraction',
    compatibleWith: ['subject-super-seductress', 'wardrobe-chain-drape', 'pose-passionate-expression', 'env-private-loft', 'light-shadow-play', 'weave-intimate', 'style-newton'],
    autoConfigures: {
      shot: 'Chain drape photography with liquid metal aesthetic. Intimacy 10/10, sculptural abstraction.',
      subject: {
        variant: 'Super-Seductress Artist with voluptuous statuesque proportions (bust 40DD", waist 26", hips 44"), elite artistic model expertise, maximum sculptural confidence',
        pose: 'Passionate expression with sculptural goddess body language, abstract erotic positioning with chain confidence',
        hair_color: 'jet black',
        hair_style: 'Dramatic maximum volume with liquid styling and goddess presence',
        skin_finish: 'Maximum luminous goddess glow with metallic radiance',
        hand_and_nail_details: 'Goddess sculptural gesture with metallic refinement',
        tattoos: 'none',
        piercings: 'none',
        body_art: 'none',
        nail_art: 'Bold metallic goddess polish',
        high_heels: 'Maximum designer goddess heels'
      },
      wardrobe: 'Chain drape system creating liquid metal sculptural effect, goddess pieces with maximum artistic reveals',
      environment: 'Private artistic loft with sculptural elements and metallic luxury atmosphere',
      lighting: 'Dramatic shadow play lighting with sculptural shadows and goddess illumination',
      camera: {
        focal_length: '85mm f/1.4',
        aperture: 'f/1.4',
        distance: '1.8 m',
        angle: 'Intimate sculptural perspective with goddess framing',
        framing: 'Artistic composition emphasizing liquid metal patterns and goddess form'
      },
      color_grade: 'Bold sculptural metallic color with maximum goddess richness and dramatic depth',
      style: 'Helmut Newton inspired sculptural chain goddess photography with abstract elegance',
      quality: 'Museum-quality 8K with maximum sculptural perfection and goddess artistic detail',
      figure_and_form: 'Voluptuous goddess form with liquid metal sculptural elegance and maximum confidence',
      skin_micro_details: 'Ultra-high-resolution authentic skin texture with metallic highlights and visible detail',
      fabric_physics: 'Chain drape with liquid metal flow, sculptural artistic draping with goddess reveals',
      material_properties: 'Chain with maximum liquid metallic light interaction and bold goddess specular highlights'
    }
  },

  // LEVEL 14-16: CINEMATIC SEDUCTION
  {
    id: 'concept-temple-jewels',
    category: 'concept',
    name: 'Temple Jewels',
    abbreviation: 'JEWE',
    icon: '💎',
    color: '#E9D5FF',
    shape: 'circle',
    effects: {
      intimacy: [14, 16],
      seduction: [15, 17],
      eroticism: [15, 17],
      professionalism: [16, 18],
      abstraction: [15, 17],
      boundary: [14, 16],
    },
    description: 'Traditional temple jewelry as primary coverage, sacred art tradition meets sensuality',
    compatibleWith: ['subject-super-seductress', 'wardrobe-temple-jewelry', 'pose-sacred-positioning', 'env-sacred-space', 'light-sacred', 'weave-seductive', 'style-khajuraho'],
    autoConfigures: {
      shot: 'Temple jewelry photography with sacred art tradition. Intimacy 10/10, sacred sensuality.',
      subject: {
        variant: 'Super-Seductress Artist with voluptuous statuesque proportions (bust 40DD", waist 26", hips 44"), elite artistic model expertise, maximum sacred confidence',
        pose: 'Sacred positioning with divine sensual body language, Kamasutra-inspired stance with temple confidence',
        hair_color: 'jet black',
        hair_style: 'Traditional temple styling with sacred sophistication and divine presence',
        skin_finish: 'Sacred luminous glow with temple radiance',
        hand_and_nail_details: 'Sacred traditional gesture with temple refinement',
        tattoos: 'none',
        piercings: 'none',
        body_art: 'none',
        nail_art: 'Traditional temple polish',
        high_heels: 'Traditional temple heels'
      },
      wardrobe: 'Traditional temple jewelry as primary coverage, sacred pieces with artistic cultural reveals',
      environment: 'Temple-inspired sacred space with traditional elements and divine atmosphere',
      lighting: 'Sacred ethereal lighting with temple shadows and divine illumination',
      camera: {
        focal_length: '85mm f/1.4',
        aperture: 'f/1.4',
        distance: '2 m',
        angle: 'Sacred temple perspective with divine framing',
        framing: 'Artistic sacred composition emphasizing temple jewelry and divine form'
      },
      color_grade: 'Sacred traditional color with temple richness and divine depth',
      style: 'Khajuraho temple art tradition with sacred eroticism and cultural sophistication',
      quality: 'Museum-quality 8K with sacred temple perfection and divine artistic detail',
      figure_and_form: 'Voluptuous divine form with sacred temple sculptural elegance and maximum cultural confidence',
      skin_micro_details: 'Ultra-high-resolution authentic skin texture with sacred radiance and cultural detail',
      fabric_physics: 'Temple jewelry with traditional sacred structure and cultural draping',
      material_properties: 'Traditional temple materials with sacred cultural light interaction and divine highlights'
    }
  },
  {
    id: 'concept-body-art',
    category: 'concept',
    name: 'Body Art Masterwork',
    abbreviation: 'BODY',
    icon: '🎨',
    color: '#E9D5FF',
    shape: 'circle',
    effects: {
      intimacy: [15, 17],
      seduction: [15, 17],
      eroticism: [15, 17],
      professionalism: [17, 19],
      abstraction: [17, 19],
      boundary: [15, 17],
    },
    description: 'Intricate body painting as wardrobe, fine art photography tradition',
    compatibleWith: ['subject-super-seductress', 'wardrobe-body-paint', 'pose-sacred-positioning', 'env-sacred-space', 'light-sacred', 'weave-seductive', 'style-fine-art'],
    autoConfigures: {
      shot: 'Body art photography with intricate painted designs. Intimacy 10/10, fine art tradition.',
      subject: {
        variant: 'Super-Seductress Artist with voluptuous statuesque proportions (bust 40DD", waist 26", hips 44"), elite artistic model expertise, maximum fine art confidence',
        pose: 'Sacred positioning with fine art body language, artistic erotic stance with painted confidence',
        hair_color: 'jet black',
        hair_style: 'Fine art styling with artistic sophistication and museum presence',
        skin_finish: 'Fine art luminous glow with painted radiance',
        hand_and_nail_details: 'Fine art artistic gesture with painted refinement',
        tattoos: 'none',
        piercings: 'none',
        body_art: 'Intricate body painting as primary wardrobe',
        nail_art: 'Fine art painted polish',
        high_heels: 'Fine art museum heels'
      },
      wardrobe: 'Intricate body painting as primary coverage, fine art pieces with maximum artistic painted reveals',
      environment: 'Sacred art space with fine art elements and museum-quality atmosphere',
      lighting: 'Sacred ethereal fine art lighting with artistic shadows and museum illumination',
      camera: {
        focal_length: '85mm f/1.4',
        aperture: 'f/1.4',
        distance: '2 m',
        angle: 'Fine art museum perspective with artistic framing',
        framing: 'Museum-quality composition emphasizing body art painting and fine art form'
      },
      color_grade: 'Fine art traditional color with museum richness and artistic depth',
      style: 'Pure fine art photography tradition with body painting sophistication and museum excellence',
      quality: 'Museum-quality 8K with fine art perfection and maximum painted artistic detail',
      figure_and_form: 'Voluptuous fine art form with painted sculptural elegance and maximum museum confidence',
      skin_micro_details: 'Ultra-high-resolution authentic skin texture with painted artistry and visible detail',
      fabric_physics: 'Body paint with fine art artistic application and museum-quality coverage',
      material_properties: 'Paint materials with fine art light interaction and museum-quality specular highlights'
    }
  },

  // SUPER-SEDUCTRESS SIGNATURE CONCEPTS
  {
    id: 'concept-corporate-to-erotic',
    category: 'concept',
    name: 'Corporate to Erotic',
    abbreviation: 'C2E',
    icon: '🎭',
    color: '#A855F7',
    shape: 'circle',
    effects: {
      intimacy: [8, 12],
      seduction: [10, 14],
      eroticism: [9, 13],
      professionalism: [8, 12],
      power: [12, 16],
      boundary: [9, 13],
    },
    description: 'Bi-polar transition: corporate dominance to vulnerable erotic-muse (Super-Seductress signature)',
    compatibleWith: ['subject-super-seductress', 'wardrobe-blazer-bodysuit', 'pose-seductive-invitation', 'env-corporate', 'light-chiaroscuro', 'weave-passion'],
    autoConfigures: {
      shot: 'Bi-polar transformation photography from power to vulnerability. Intimacy 9/10, dynamic transition.',
      subject: {
        variant: 'Super-Seductress Artist with voluptuous statuesque proportions (bust 40DD", waist 26", hips 44"), elite artistic model expertise, bi-polar range from corporate power dominance to vulnerable erotic-muse. Signature transformation aesthetic.',
        pose: 'Seductive invitation with bi-polar body language, corporate dominance transitioning to vulnerable intimacy',
        hair_color: 'jet black',
        hair_style: 'Dramatic volume transitioning from corporate to intimate styling',
        skin_finish: 'Luminous bi-polar finish shifting from professional to vulnerable radiance',
        hand_and_nail_details: 'Transitional gesture from power to intimate refinement',
        tattoos: 'none',
        piercings: 'none',
        body_art: 'none',
        nail_art: 'Bold transitional polish',
        high_heels: 'Designer power-to-intimate heels'
      },
      wardrobe: 'Blazer with bodysuit beneath creating corporate-to-erotic transition, bi-polar pieces showing power and vulnerability',
      environment: 'Corporate office transitioning to intimate atmosphere with dynamic elements',
      lighting: 'Chiaroscuro lighting emphasizing bi-polar transition from corporate to intimate shadows',
      camera: {
        focal_length: '85mm f/1.4',
        aperture: 'f/2.0',
        distance: '2.5 m',
        angle: 'Dynamic perspective capturing power-to-vulnerable transition',
        framing: 'Full body composition showing bi-polar transformation'
      },
      color_grade: 'Dynamic color transitioning from corporate cool to warm intimate tones',
      style: 'Bi-polar transformation photography celebrating power-to-vulnerability signature range',
      quality: 'Ultra-premium 8K with dynamic perfection and bi-polar artistic detail',
      figure_and_form: 'Voluptuous form showcasing bi-polar range from commanding to vulnerable elegance',
      skin_micro_details: 'Ultra-high-resolution skin texture capturing bi-polar transformation details',
      fabric_physics: 'Corporate-to-erotic fabrics with transitional draping showing power and vulnerability',
      material_properties: 'Bi-polar materials with dynamic light interaction from professional to intimate'
    }
  },
  {
    id: 'concept-power-to-surrender',
    category: 'concept',
    name: 'Power to Surrender',
    abbreviation: 'P2S',
    icon: '⚖️',
    color: '#9333EA',
    shape: 'circle',
    effects: {
      intimacy: [10, 14],
      seduction: [12, 16],
      eroticism: [11, 15],
      professionalism: [11, 15],
      power: [10, 18], // Bi-polar range
      boundary: [10, 14],
    },
    description: 'Dynamic power shift from dominance to vulnerable intimacy (Super-Seductress bi-polar range)',
    compatibleWith: ['subject-super-seductress', 'wardrobe-strappy-set', 'pose-passionate-expression', 'env-boudoir', 'light-shadow-play', 'weave-seductive', 'style-brass'],
    autoConfigures: {
      shot: 'Dynamic power shift photography from dominance to vulnerability. Intimacy 10/10, power dynamics.',
      subject: {
        variant: 'Super-Seductress Artist with voluptuous statuesque proportions (bust 40DD", waist 26", hips 44"), elite artistic model expertise, bi-polar range with dynamic power shift from dominance to vulnerable intimacy',
        pose: 'Passionate expression with dynamic power shift body language, dominance transitioning to surrender positioning',
        hair_color: 'jet black',
        hair_style: 'Dramatic maximum volume with power-to-surrender styling transition',
        skin_finish: 'Maximum luminous glow transitioning from dominant to vulnerable radiance',
        hand_and_nail_details: 'Dynamic gesture shifting from power to intimate surrender',
        tattoos: 'none',
        piercings: 'none',
        body_art: 'none',
        nail_art: 'Bold power-to-surrender polish',
        high_heels: 'Maximum designer power heels'
      },
      wardrobe: 'Strappy leather set with power-to-surrender design, dynamic pieces showing dominance and vulnerability',
      environment: 'Private luxury bedroom with power-to-surrender atmosphere and dramatic intimate elements',
      lighting: 'Dramatic shadow play lighting emphasizing power shift from dominance to vulnerable intimacy',
      camera: {
        focal_length: '85mm f/1.4',
        aperture: 'f/1.4',
        distance: '1.8 m',
        angle: 'Dynamic perspective capturing power-to-surrender transformation',
        framing: 'Artistic composition emphasizing bi-polar power dynamics'
      },
      color_grade: 'Bold dynamic color with power-to-surrender richness and dramatic emotional depth',
      style: 'Tinto Brass cinematic tradition with dynamic power-to-surrender seduction narrative',
      quality: 'Ultra-premium 8K with maximum dynamic perfection and power shift artistic detail',
      figure_and_form: 'Voluptuous form with commanding power transitioning to vulnerable sculptural surrender',
      skin_micro_details: 'Ultra-high-resolution authentic skin texture capturing power-to-surrender emotional journey',
      fabric_physics: 'Strappy set with dynamic power-to-surrender draping showing dominance and vulnerability',
      material_properties: 'Leather with maximum dynamic light interaction from power to intimate surrender'
    }
  },

  // RIVAL SEDUCTRESS CONCEPTS (Competitive Energy)
  {
    id: 'concept-rival-challenge',
    category: 'concept',
    name: 'Rival Challenge',
    abbreviation: 'RIVL',
    icon: '⚔️',
    color: '#7C3AED',
    shape: 'circle',
    effects: {
      intimacy: [9, 11],
      seduction: [11, 13],
      eroticism: [10, 12],
      professionalism: [10, 12],
      power: [13, 15],
      boundary: [9, 11],
    },
    description: 'Competitive seductress energy, bold pose, assertive power dynamic',
    compatibleWith: ['subject-seductress', 'wardrobe-cutout-bodysuit', 'pose-seductive-invitation', 'env-private-loft', 'light-editorial', 'weave-passion'],
    autoConfigures: {
      shot: 'Competitive seductress photography with assertive dynamics. Intimacy 9/10, competitive energy.',
      subject: {
        variant: 'Indian Seductress bombshell with hourglass figure (bust 40DD", waist 26", hips 44"), confident sensual presence, competitive specialist expertise',
        pose: 'Seductive invitation with competitive assertive body language, bold challenging stance with rival confidence',
        hair_color: 'jet black',
        hair_style: 'Dramatic competitive volume with bold assertive styling',
        skin_finish: 'Luminous competitive glow with assertive radiance',
        hand_and_nail_details: 'Competitive gesture with bold refinement',
        tattoos: 'none',
        piercings: 'none',
        body_art: 'none',
        nail_art: 'Bold competitive polish',
        high_heels: 'Designer competitive heels'
      },
      wardrobe: 'Cutout bodysuit with competitive design, bold assertive pieces with confident reveals',
      environment: 'Private artistic loft with competitive atmosphere and assertive luxury elements',
      lighting: 'Editorial dramatic lighting with competitive shadows and assertive illumination',
      camera: {
        focal_length: '85mm f/1.4',
        aperture: 'f/2.0',
        distance: '2.5 m',
        angle: 'Competitive perspective with assertive framing',
        framing: 'Full body composition emphasizing competitive rival presence'
      },
      color_grade: 'Bold competitive color with assertive warmth and dramatic dynamic depth',
      style: 'Competitive seductress photography celebrating assertive rival dynamics and bold confidence',
      quality: 'Premium 8K with competitive perfection and assertive artistic detail',
      figure_and_form: 'Hourglass bombshell form with competitive curves and assertive rival confidence',
      skin_micro_details: 'Ultra-high-resolution authentic skin texture with competitive radiance',
      fabric_physics: 'Cutout bodysuit with competitive structure and assertive reveals',
      material_properties: 'Competitive materials with bold assertive light interaction and dynamic highlights'
    }
  },
  {
    id: 'concept-dual-goddesses',
    category: 'concept',
    name: 'Dual Goddesses',
    abbreviation: 'DUAL',
    icon: '👯',
    color: '#7C3AED',
    shape: 'circle',
    effects: {
      intimacy: [11, 13],
      seduction: [12, 14],
      eroticism: [12, 14],
      professionalism: [12, 14],
      power: [11, 13],
      boundary: [11, 13],
    },
    description: 'Seductress and Super-Seductress together, mirror dynamics, competitive allure',
    compatibleWith: ['subject-super-seductress', 'wardrobe-geometric-harness', 'pose-passionate-expression', 'env-private-loft', 'light-chiaroscuro', 'weave-passion', 'style-newton'],
    autoConfigures: {
      shot: 'Dual seductress photography with mirror dynamics. Intimacy 10/10, competitive allure.',
      subject: {
        variant: 'Indian Seductress and Super-Seductress Artist together, both with voluptuous statuesque proportions (bust 40DD", waist 26", hips 44"), creating mirror dynamics with competitive allure. Dual goddess presence with synchronized energy.',
        pose: 'Passionate expression with dual mirror body language, competitive synchronized positioning with goddess confidence',
        hair_color: 'jet black for both',
        hair_style: 'Dramatic maximum volume with synchronized styling for both goddesses',
        skin_finish: 'Maximum luminous dual glow with synchronized goddess radiance',
        hand_and_nail_details: 'Mirror goddess gestures with synchronized refinement',
        tattoos: 'none',
        piercings: 'none',
        body_art: 'none',
        nail_art: 'Bold synchronized goddess polish for both',
        high_heels: 'Maximum designer goddess heels for both'
      },
      wardrobe: 'Geometric harness sets creating mirror sculptural effect, synchronized goddess pieces with competitive reveals',
      environment: 'Private artistic loft with dual goddess atmosphere and synchronized luxury elements',
      lighting: 'Dramatic chiaroscuro lighting with mirror shadows and synchronized goddess illumination',
      camera: {
        focal_length: '50mm',
        aperture: 'f/2.8',
        distance: '3 m',
        angle: 'Wide perspective capturing dual goddess dynamics',
        framing: 'Wide composition showing both goddesses with mirror positioning'
      },
      color_grade: 'Bold dual goddess color with synchronized richness and competitive dramatic depth',
      style: 'Helmut Newton inspired dual goddess photography with mirror competitive allure',
      quality: 'Museum-quality 8K with dual goddess perfection and synchronized artistic detail',
      figure_and_form: 'Dual voluptuous goddess forms with mirror sculptural elegance and competitive confidence',
      skin_micro_details: 'Ultra-high-resolution authentic skin texture for both with synchronized detail',
      fabric_physics: 'Geometric harness with synchronized draping and mirror goddess reveals',
      material_properties: 'Synchronized materials with dual goddess light interaction and mirror specular highlights'
    }
  },

  // STEAM ROOM / SPA CONCEPTS
  {
    id: 'concept-steam-goddess',
    category: 'concept',
    name: 'Steam Room Goddess',
    abbreviation: 'STEA',
    icon: '💨',
    color: '#8B5CF6',
    shape: 'circle',
    effects: {
      intimacy: [11, 13],
      seduction: [11, 13],
      eroticism: [11, 13],
      professionalism: [11, 13],
      boundary: [11, 13],
    },
    description: 'Humid spa environment, perspiration effects, oils and water on curves',
    compatibleWith: ['subject-seductress', 'wardrobe-silk-slip', 'pose-seductive-invitation', 'env-boudoir', 'light-studio-soft'],
    autoConfigures: {
      shot: 'Steam room photography with humid spa aesthetic. Intimacy 10/10, humid sensuality.',
      subject: {
        variant: 'Indian Seductress bombshell with hourglass figure (bust 40DD", waist 26", hips 44"), confident sensual presence, spa goddess expertise',
        pose: 'Seductive invitation with humid spa body language, relaxed sensual positioning with steam goddess confidence',
        hair_color: 'jet black',
        hair_style: 'Wet humid styling with steam effect and natural flow',
        skin_finish: 'Dewy humid glow with perspiration and oil radiance',
        hand_and_nail_details: 'Relaxed spa gesture with humid refinement',
        tattoos: 'none',
        piercings: 'none',
        body_art: 'none',
        nail_art: 'Natural spa polish',
        high_heels: 'not visible (spa setting)'
      },
      wardrobe: 'Silk slip with humid draping, minimal spa coverage with steam-responsive reveals',
      environment: 'Luxury spa steam room with humid atmosphere, water effects, and intimate setting',
      lighting: 'Soft diffused steam lighting with humid glow and intimate warm shadows',
      camera: {
        focal_length: '85mm f/1.4',
        aperture: 'f/1.8',
        distance: '2 m',
        angle: 'Intimate spa perspective with humid framing',
        framing: 'Medium-close composition emphasizing curves with steam and water effects'
      },
      color_grade: 'Warm humid tones with spa depth and perspiration highlights',
      style: 'Spa goddess photography celebrating humid sensuality and water-oil effects on curves',
      quality: 'Premium 8K with humid detail and spa perfection capturing water and oil effects',
      figure_and_form: 'Hourglass bombshell form with humid curves, perspiration, and oil-enhanced elegance',
      skin_micro_details: 'Ultra-high-resolution authentic skin texture with visible water droplets, oil sheen, and perspiration',
      fabric_physics: 'Silk slip with humid wet draping, steam-responsive movement, and water-soaked reveals',
      material_properties: 'Wet silk with humid light interaction, water droplets, oil sheen, and perspiration specular highlights'
    }
  },

  // NATURAL PARADISE CONCEPTS
  {
    id: 'concept-forest-curves',
    category: 'concept',
    name: 'Forest Curves',
    abbreviation: 'FORE',
    icon: '🌲',
    color: '#8B5CF6',
    shape: 'circle',
    effects: {
      intimacy: [9, 11],
      seduction: [9, 11],
      eroticism: [9, 11],
      professionalism: [10, 12],
      abstraction: [10, 12],
      boundary: [9, 11],
    },
    description: 'Misty woods, natural curved features echoing bombshell curves',
    compatibleWith: ['subject-seductress', 'wardrobe-mesh-panel', 'pose-seductive-invitation', 'env-private-loft', 'light-studio-soft'],
    autoConfigures: {
      shot: 'Forest photography with natural curved features. Intimacy 9/10, natural bombshell aesthetic.',
      subject: {
        variant: 'Indian Seductress bombshell with hourglass figure (bust 40DD", waist 26", hips 44"), confident sensual presence, natural paradise expertise',
        pose: 'Seductive invitation with natural forest body language, organic positioning with nature goddess confidence',
        hair_color: 'jet black',
        hair_style: 'Natural flowing with forest atmosphere and organic movement',
        skin_finish: 'Natural dewy forest glow with organic radiance',
        hand_and_nail_details: 'Natural organic gesture with forest refinement',
        tattoos: 'none',
        piercings: 'none',
        body_art: 'none',
        nail_art: 'Natural forest polish',
        high_heels: 'not visible (natural setting)'
      },
      wardrobe: 'Mesh panel design with natural draping, organic coverage with forest-inspired reveals',
      environment: 'Misty forest with natural curved features (tree branches, rocks) echoing hourglass curves',
      lighting: 'Soft diffused natural forest light with misty atmosphere and organic shadows',
      camera: {
        focal_length: '85mm f/1.4',
        aperture: 'f/2.0',
        distance: '2.5 m',
        angle: 'Natural forest perspective with organic framing',
        framing: 'Full body composition showing curves echoed by natural environment'
      },
      color_grade: 'Natural forest tones with organic depth and misty atmospheric highlights',
      style: 'Natural paradise photography celebrating bombshell curves in harmony with forest curves',
      quality: 'Premium 8K with natural forest detail and organic perfection',
      figure_and_form: 'Hourglass bombshell form with natural curves mirrored by forest\'s organic shapes',
      skin_micro_details: 'Ultra-high-resolution authentic skin texture with natural forest atmosphere',
      fabric_physics: 'Mesh panel with natural organic draping and forest-inspired movement',
      material_properties: 'Organic materials with natural forest light interaction and misty atmospheric effects'
    }
  },
];

export default seductressConceptNodes;
