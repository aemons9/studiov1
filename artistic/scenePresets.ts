/**
 * SCENE PRESETS - Pre-configured scene templates for Artistic Mode
 * Office themes, boudoir concepts, and urban environments
 */

export interface ScenePreset {
  id: string;
  name: string;
  category: 'office' | 'boudoir' | 'urban' | 'studio' | 'natural';
  intimacyLevel: number[]; // Suitable intimacy levels
  description: string;

  // Pre-filled fields for quick generation
  scene: string;
  lighting: string;
  composition: string;
  suggestedWardrobe: string[];

  // Technical recommendations
  technicalSpecs: {
    camera: string;
    lens: string;
    aperture: string;
    colorGrade: string;
  };

  // Master style recommendations
  masterStyleFit: string[];
}

export const SCENE_PRESETS: ScenePreset[] = [
  // === OFFICE THEMES ===
  {
    id: 'executive-after-hours',
    name: 'Executive After Hours',
    category: 'office',
    intimacyLevel: [7, 8, 9],
    description: 'Corner office at night with city skyline view - corporate power meets personal sovereignty',
    scene: 'Floor-to-ceiling window of a corner office, 60 stories above the city. Empty headquarters after dark, glittering cityscape providing dramatic backdrop. Polished mahogany desk and leather executive chair visible in shadows.',
    lighting: 'Cool blue city lights provide dramatic rim lighting, while a single warm desk lamp creates intimate pools of light. The contrast between warm interior and cool exterior creates visual tension.',
    composition: 'Model leaning against the window, hand on cool glass. Low angle shot emphasizing power and the vast cityscape. Reflection in glass creates layered composition.',
    suggestedWardrobe: ['strappy-bodysuit-black', 'sheer-blouse-tailored', 'harness-leather-minimal'],
    technicalSpecs: {
      camera: 'Medium format digital',
      lens: '85mm f/1.4',
      aperture: 'f/2.0',
      colorGrade: 'Cool cinematic with warm amber accents'
    },
    masterStyleFit: ['newton', 'ritts']
  },

  {
    id: 'boardroom-dominance',
    name: 'Boardroom Dominance',
    category: 'office',
    intimacyLevel: [8, 9, 10],
    description: 'Empty boardroom transformed into personal domain - absolute authority',
    scene: 'Long mahogany conference table in executive boardroom. Floor-to-ceiling windows with vertical blinds. Scattered papers and tablets suggest recent strategic victory. Leather executive chairs line the table.',
    lighting: 'Dramatic overhead track lighting creates hard shadows across the table. Golden hour light streams through vertical blinds, striping the space with warm and cool patterns.',
    composition: 'Seated at head of table, leaning back in chair with one foot on polished surface. Direct gaze, challenging perspective. Low angle emphasizing power and scale.',
    suggestedWardrobe: ['blazer-bralette-power', 'transparent-suit-black', 'corset-architectural'],
    technicalSpecs: {
      camera: 'Sony A1',
      lens: '35mm f/1.4',
      aperture: 'f/2.8',
      colorGrade: 'Rich mahogany tones with cool steel accents'
    },
    masterStyleFit: ['newton', 'ritts']
  },

  {
    id: 'architects-studio',
    name: 'Architect\'s Drafting Room',
    category: 'office',
    intimacyLevel: [6, 7, 8],
    description: 'Creative studio with drafting table - intersection of human form and architectural precision',
    scene: 'Massive drafting table covered in blueprints and vellum. Large industrial windows with sunset light. Architectural tools scattered artfully. Gold dust particles visible in air.',
    lighting: 'Warm sunset light streaming through industrial windows creates long shadows and golden highlights. The quality feels both technical and romantic.',
    composition: 'Standing before drafting table, body arching in concentration. Tracing lines on vellum, curve of back echoing architectural drawings. Profile or three-quarter view.',
    suggestedWardrobe: ['blazer-minimal-tailored', 'bodysuit-mesh-black', 'wrap-silk-minimal'],
    technicalSpecs: {
      camera: 'Hasselblad X2D',
      lens: '65mm f/2.8',
      aperture: 'f/4.0',
      colorGrade: 'Sepia tones with brilliant highlights'
    },
    masterStyleFit: ['penn', 'roversi']
  },

  {
    id: 'data-center-tech',
    name: 'Data Center Goddess',
    category: 'office',
    intimacyLevel: [7, 8, 9],
    description: 'Server farm environment - contrast between organic warmth and digital infrastructure',
    scene: 'Rows of server racks with blinking LEDs. Cool blue server lights creating geometric patterns. Emergency lighting providing warm accents. Digital infrastructure as cathedral.',
    lighting: 'Cool blue server LEDs provide dramatic underlighting. Warm orange emergency lights create facial illumination. Color temperature contrast becomes visual narrative.',
    composition: 'Leaning against server rack, becoming the living center of digital universe. Serene and all-knowing expression. Light traces contours of form.',
    suggestedWardrobe: ['bodysuit-tech-fabric', 'catsuit-latex-minimal', 'mesh-geometric'],
    technicalSpecs: {
      camera: 'Nikon Z9',
      lens: '24-70mm f/2.8 at 35mm',
      aperture: 'f/4.0',
      colorGrade: 'Cool digital blues with warm skin tones'
    },
    masterStyleFit: ['ritts', 'newton']
  },

  {
    id: 'penthouse-conference',
    name: 'Penthouse Command Center',
    category: 'office',
    intimacyLevel: [9, 10],
    description: 'Private penthouse meeting space - corporate authority meets personal luxury',
    scene: 'Wall of digital stock tickers and holographic displays. Panoramic city views. Minimalist luxury furniture. Modern art on walls. Space blurs corporate and personal domains.',
    lighting: 'Cool glow of multiple screens provides key light. Warm ambient lighting from hidden sources creates depth. Mixed lighting creates complex, layered illumination.',
    composition: 'Standing before trading screens, sipping espresso. Relaxed dominance posture. City spreads infinitely behind. Reflections in dark windows create visual complexity.',
    suggestedWardrobe: ['blazer-cashmere-minimal', 'jumpsuit-cutout-white', 'harness-chain-delicate'],
    technicalSpecs: {
      camera: 'Phase One IQ4',
      lens: '110mm f/2.8',
      aperture: 'f/4.5',
      colorGrade: 'Cool digital blues with warm luxury accents'
    },
    masterStyleFit: ['newton', 'ritts']
  },

  {
    id: 'rainy-office-window',
    name: 'Storm-Watched Executive',
    category: 'office',
    intimacyLevel: [8, 9],
    description: 'High-rise office during thunderstorm - moment of vulnerability amid corporate chaos',
    scene: 'Rain-streaked floor-to-ceiling windows during storm. Dark office interior lit only by computer glow. City blurred through water-covered glass. Lightning illuminates clouds.',
    lighting: 'Lightning flashes provide dramatic momentary illumination. Cool glow of monitors creates ambient fill. Rain on glass diffuses and abstracts city lights.',
    composition: 'Pressing against rain-streaked window, palm flat on glass. Forehead nearly touching. Intimacy with tempest. Profile or reflection view.',
    suggestedWardrobe: ['blouse-silk-white', 'bodysuit-wet-sheer', 'wrap-minimal-silk'],
    technicalSpecs: {
      camera: 'Canon R5',
      lens: '50mm f/1.2',
      aperture: 'f/1.8',
      colorGrade: 'Cool storm tones with warm skin contrast'
    },
    masterStyleFit: ['roversi', 'penn']
  },

  // === BOUDOIR THEMES ===
  {
    id: 'silk-geometry-minimal',
    name: 'Silk Geometry',
    category: 'boudoir',
    intimacyLevel: [7, 8, 9],
    description: 'Sun-drenched morning room with single silk drape - reductionist luxury',
    scene: 'Minimalist morning room with large north-facing window. Padded silk bench. White walls and natural wood floor. Single decorative plant. Abundant natural light.',
    lighting: 'Soft morning light from large north-facing window creates gentle, sculptural illumination. Light wraps around form, revealing texture without harsh contrasts.',
    composition: 'Kneeling on silk bench, body creating elegant arcs and angles. Single square of silk draped diagonally. Hand touches silk at shoulder. Contemplative pose.',
    suggestedWardrobe: ['silk-square-minimal', 'wrap-charmeuse-black', 'kimono-sheer-open'],
    technicalSpecs: {
      camera: 'Hasselblad X2D',
      lens: '120mm macro',
      aperture: 'f/4.5',
      colorGrade: 'Monochromatic with warm skin tones'
    },
    masterStyleFit: ['penn', 'roversi']
  },

  {
    id: 'pearl-collar-minimal',
    name: 'Pearl Collar & Cuffs',
    category: 'boudoir',
    intimacyLevel: [9, 10],
    description: 'White-on-white space where jewelry becomes entire wardrobe - ultra-minimalist',
    scene: 'Pure white boudoir space. White walls, white floor, white ambient light. No furniture visible. Dusky skin provides only color contrast.',
    lighting: 'Soft, diffused light from large softbox creates even, shadowless illumination. Pearls glow with internal light, creating bright points.',
    composition: 'Statuesque standing pose, arms slightly away from body. Neck elongated. Pearls map three points: neck, wrists, spaces between. Frontal or three-quarter view.',
    suggestedWardrobe: ['jewelry-pearl-collar', 'body-jewelry-minimal', 'chain-body-delicate'],
    technicalSpecs: {
      camera: 'Sony A7RIV',
      lens: '90mm f/2.8 macro',
      aperture: 'f/8.0',
      colorGrade: 'High key with brilliant highlights'
    },
    masterStyleFit: ['penn', 'ritts']
  },

  {
    id: 'transparency-kimono',
    name: 'Transparency Layer',
    category: 'boudoir',
    intimacyLevel: [8, 9],
    description: 'Single-layer chiffon kimono - study in veiling and revelation through transparency',
    scene: 'Dark wood floor in minimalist room. Large window for backlighting. Simple shoji screen or textured wall. Traditional Japanese aesthetic meets modern sensibility.',
    lighting: 'Backlighting from large window turns chiffon into glowing screen. Frontal fill light ensures skin detail. Backlight creates halo effect.',
    composition: 'Standing, kimono falling open naturally. Turning slightly toward light. Hands tucked into opposite sleeves in traditional gesture. Elegant profile.',
    suggestedWardrobe: ['kimono-chiffon-sheer', 'robe-silk-minimal', 'caftan-mesh-black'],
    technicalSpecs: {
      camera: 'Nikon Z9',
      lens: '85mm f/1.8',
      aperture: 'f/2.8',
      colorGrade: 'High contrast with brilliant highlights'
    },
    masterStyleFit: ['roversi', 'penn']
  },

  {
    id: 'ribbon-mapping',
    name: 'Satin Ribbon Cartography',
    category: 'boudoir',
    intimacyLevel: [8, 9, 10],
    description: 'Single ribbon mapping body\'s elegant lines - conceptual minimalism',
    scene: 'White linen sheets on raised platform. Completely white environment. No distracting elements. Body becomes landscape, ribbon becomes map.',
    lighting: 'Soft, directional window light creates gentle modeling. Satin ribbon catches highlights that contrast with matte skin finish.',
    composition: 'Lying in graceful serpentine curve. Ribbon wraps in intricate pattern following natural contours. Secured with single knot at hip. Overhead or three-quarter view.',
    suggestedWardrobe: ['ribbon-satin-4inch', 'strap-leather-continuous', 'chain-delicate-mapping'],
    technicalSpecs: {
      camera: 'Fujifilm GFX100',
      lens: '120mm f/4 macro',
      aperture: 'f/5.6',
      colorGrade: 'Soft monochrome with texture emphasis'
    },
    masterStyleFit: ['penn', 'newton']
  },

  {
    id: 'harness-minimal',
    name: 'Leather Harness Minimal',
    category: 'boudoir',
    intimacyLevel: [9, 10],
    description: 'Single continuous leather strap - architectural study in elegant restraint',
    scene: 'Minimalist concrete space. Single concrete plinth for seating. Industrial aesthetic meets refined elegance. Brutal honesty in materials.',
    lighting: 'Hard, directional light from single source creates dramatic shadows. Lighting emphasizes strap\'s path across body. Almost brutal in honesty.',
    composition: 'Sitting on concrete plinth, posture upright and elegant. Leather strap in continuous loop. Hands rest lightly on knees. Frontal or profile view.',
    suggestedWardrobe: ['harness-leather-minimal', 'strap-leather-continuous', 'harness-geometric-black'],
    technicalSpecs: {
      camera: 'Canon R5',
      lens: '100mm f/2.8 macro',
      aperture: 'f/4.0',
      colorGrade: 'High contrast monochrome'
    },
    masterStyleFit: ['newton', 'ritts']
  },

  // === URBAN THEMES ===
  {
    id: 'urban-noir-empress',
    name: 'Urban Noir Empress',
    category: 'urban',
    intimacyLevel: [8, 9],
    description: 'Abandoned industrial loft - powerful contrapposto against weathered concrete',
    scene: 'Abandoned industrial loft with weathered concrete walls. Exposed brick, metal beams overhead. Single overhead industrial lamp. Urban decay meets high fashion.',
    lighting: 'Dramatic chiaroscuro from single overhead industrial lamp creates hard shadows. Rim light from distant window highlights silhouette.',
    composition: 'Powerful contrapposto stance, one hand on hip, other trailing along wall. Direct, confident gaze. Three-quarter view emphasizing sculptural form.',
    suggestedWardrobe: ['harness-leather-geometric', 'bodysuit-architectural-black', 'strappy-bodysuit-black'],
    technicalSpecs: {
      camera: 'Medium format',
      lens: '85mm f/1.4',
      aperture: 'f/2.0',
      colorGrade: 'High contrast black and white'
    },
    masterStyleFit: ['newton', 'ritts']
  },

  {
    id: 'monsoon-dusk',
    name: 'Monsoon Dusk Temptress',
    category: 'urban',
    intimacyLevel: [8, 9],
    description: 'Rooftop during first monsoon rain - sensual communion with elements',
    scene: 'Urban rooftop at twilight with cascading water sheet. City skyline in background. Wet surfaces reflecting lights. Rain creates natural curtain.',
    lighting: 'Last golden hour light filtering through rain creates halo. City lights below provide warm bokeh background. Water acts as thousands of tiny lenses.',
    composition: 'Standing beneath water cascade, arching back, eyes closed, arms raised. Embracing rainfall. Water streams down form. Dynamic movement.',
    suggestedWardrobe: ['caftan-mesh-sheer', 'kimono-sheer-open', 'blouse-silk-white'],
    technicalSpecs: {
      camera: 'Sony A7RIV',
      lens: '50mm f/1.2',
      aperture: 'f/1.8',
      colorGrade: 'Warm amber and deep blue contrast'
    },
    masterStyleFit: ['roversi', 'penn']
  },

  // === STUDIO THEMES ===
  {
    id: 'steel-sanctuary',
    name: 'Silk & Steel Sanctuary',
    category: 'studio',
    intimacyLevel: [8, 9],
    description: 'Minimalist concrete space with polished steel - living sculpture effect',
    scene: 'Minimalist concrete studio with polished steel platform. Industrial aesthetic. Clean lines and hard surfaces. Metallic reflections.',
    lighting: 'Precise studio lighting with soft boxes creating gentle wrap-around illumination. Hard accent light catches silk sheen. Lighting sculpts without revealing.',
    composition: 'Reclining on steel platform, creating graceful S-curve. One arm extended above head. Classical Greek sculpture reimagined. Side view.',
    suggestedWardrobe: ['silk-liquid-black', 'wrap-charmeuse-black', 'drape-silk-minimal'],
    technicalSpecs: {
      camera: 'Phase One XT',
      lens: '120mm macro',
      aperture: 'f/4.0',
      colorGrade: 'Desaturated with cool blue and warm skin'
    },
    masterStyleFit: ['penn', 'ritts']
  },

  {
    id: 'geometric-shadow-play',
    name: 'Geometric Shadow Play',
    category: 'studio',
    intimacyLevel: [7, 8, 9],
    description: 'Sun-drenched studio with geometric window patterns - mathematics of beauty',
    scene: 'Vintage velvet chaise in sun-drenched studio. Geometric window dividers create shadow patterns. Classic photographer\'s space.',
    lighting: 'Hard afternoon sun streaming through geometric window dividers creates stark black and white patterns. Contrast between light and shadow becomes subject.',
    composition: 'Seated on velvet chaise, direct gaze at viewer. Body striped with geometric shadows. Knowing confidence. Frontal or three-quarter view.',
    suggestedWardrobe: ['body-jewelry-chain', 'harness-chain-delicate', 'jewelry-pearl-collar'],
    technicalSpecs: {
      camera: 'Hasselblad H6D',
      lens: '100mm f/2.2',
      aperture: 'f/5.6',
      colorGrade: 'Monochrome with silver gelatin quality'
    },
    masterStyleFit: ['ritts', 'newton']
  }
];

// Helper functions for scene selection
export function getScenesByCategory(category: ScenePreset['category']): ScenePreset[] {
  return SCENE_PRESETS.filter(scene => scene.category === category);
}

export function getScenesByIntimacy(intimacyLevel: number): ScenePreset[] {
  return SCENE_PRESETS.filter(scene =>
    scene.intimacyLevel.includes(intimacyLevel)
  );
}

export function getScenesByStyle(masterStyle: string): ScenePreset[] {
  return SCENE_PRESETS.filter(scene =>
    scene.masterStyleFit.includes(masterStyle)
  );
}

export function getSceneById(id: string): ScenePreset | undefined {
  return SCENE_PRESETS.find(scene => scene.id === id);
}

export function getRandomScene(
  intimacyLevel: number,
  masterStyle: string,
  category?: ScenePreset['category']
): ScenePreset {
  let filtered = SCENE_PRESETS.filter(scene =>
    scene.intimacyLevel.includes(intimacyLevel) &&
    scene.masterStyleFit.includes(masterStyle)
  );

  if (category) {
    filtered = filtered.filter(scene => scene.category === category);
  }

  if (filtered.length === 0) {
    filtered = SCENE_PRESETS; // Fallback to all scenes
  }

  return filtered[Math.floor(Math.random() * filtered.length)];
}
