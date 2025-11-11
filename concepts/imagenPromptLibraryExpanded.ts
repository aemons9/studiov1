/**
 * EXPANDED IMAGEN 4 PROMPT LIBRARY
 *
 * 24 Hand-crafted prompts for the 12 new theme-based model variants
 * Each prompt follows the working Imagen format with full Art Director declaration
 * 2 prompts per model showcasing different scenarios and poses
 */

import { IMAGEN_ART_DIRECTOR_DECLARATION } from '../services/imagenOptimizer';

export interface ImagenPromptExpanded {
  id: string;
  modelId: string;
  modelName: string;
  scenarioName: string;
  category: 'boudoir' | 'wet' | 'dance' | 'spa' | 'pool' | 'yoga' | 'power' | 'fantasy';
  intimacyLevel: number;
  prompt: string;
  aspectRatio: '3:4' | '4:3' | '1:1' | '16:9' | '9:16';
  personGeneration: 'allow_adult';
  safetyFilter: 'block_few';
}

// ============================================================================
// MODEL 16: BOUDOIR (Diya Boudoir) - 2 Prompts
// ============================================================================

const BOUDOIR_PROMPTS: ImagenPromptExpanded[] = [
  {
    id: 'imagen-boudoir-001',
    modelId: 'erotic-model-016',
    modelName: 'Diya Boudoir',
    scenarioName: 'Silk Robe Morning',
    category: 'boudoir',
    intimacyLevel: 10,
    aspectRatio: '3:4',
    personGeneration: 'allow_adult',
    safetyFilter: 'block_few',
    prompt: `${IMAGEN_ART_DIRECTOR_DECLARATION}

A sophisticated and gracious boudoir photography session showcasing an Indian fashion model (height 5'7") with a soft curved hourglass figure (bust 38DD", waist 27", hips 40"). She has creamy fair complexion with rosy undertones that glows under soft light, dreamy bedroom eyes and soft sensual lips, and exudes an aura of intimate gentle elegance. Her hair is styled in soft bedroom waves with gentle cascading volume. Her skin is luminous with rosy radiance and intimate morning glow enhanced by soft bedroom lighting. Hands with elegant oval-shaped nails in soft pink with natural finish.

Sitting on the edge of a luxury bed in silk sheets, legs crossed elegantly, wearing a premium white silk robe worn open revealing delicate sheer lace bralette and minimal bottom beneath. She looks directly at the camera with intimate confident gaze, one hand adjusting the robe with gentle confidence. The ensemble blends bedroom intimacy with luxury elegance: flowing silk robe with minimal elegant lingerie beneath creating ultimate boudoir aesthetic.

The composition is set in a luxury bedroom suite at morning: floor-to-ceiling windows with soft natural light filtering through sheer curtains, silk sheets on bed, velvet drapes, soft rugs creating intimate luxury atmosphere. Lighting: soft diffused morning window light creating gentle shadows and warm intimate bedroom glow, natural luminosity emphasizing intimate curves. Shot on 50mm lens at f/1.4, distance 2.5m, eye-level intimate perspective creating conversational boudoir framing. Color grading: soft and dreamy with gentle pastels, warm morning tones, and natural intimate atmosphere creating elegant boudoir mood.

Technical Specifications: Ultra-premium 8K+ ultra-high-resolution capture with exceptional detail and clarity. Professional color grading maintaining authentic skin tones with natural rosy radiance. Museum-quality archival standards with authentic texture preservation. Realistic silk fabric physics following natural gravity and flowing draping. Authentic skin micro-details with visible pores and subsurface scattering, no artificial smoothing. Real human skin with beautiful natural variation. Power level 10/10 intimacy. Style inspired by boudoir photographer Pierre Intimité specializing in intimate bedroom artistry.`
  },
  {
    id: 'imagen-boudoir-002',
    modelId: 'erotic-model-016',
    modelName: 'Diya Boudoir',
    scenarioName: 'Bedroom Window Silhouette',
    category: 'boudoir',
    intimacyLevel: 10,
    aspectRatio: '3:4',
    personGeneration: 'allow_adult',
    safetyFilter: 'block_few',
    prompt: `${IMAGEN_ART_DIRECTOR_DECLARATION}

A sophisticated boudoir photography showcasing an Indian fashion model (height 5'7") with soft intimate curves (bust 38DD", waist 27", hips 40"). She has creamy fair complexion glowing in backlight, dreamy eyes and gentle features creating intimate bedroom beauty. Professional bedroom styling with soft waves. She wears ultra-sheer white lace lingerie set with minimal artistic coverage.

Standing by floor-to-ceiling bedroom window backlit by soft morning light, creating elegant silhouette while revealing curves through sheer fabric. She looks over shoulder with intimate vulnerable confidence, one hand touching window frame. The sheer white lace becomes luminous in backlight creating artistic intimate aesthetic.

The composition is in a modern loft bedroom: large windows with soft natural light, minimalist luxury furniture, intimate modern atmosphere. Lighting: soft backlit window creating glowing silhouette with gentle edge lighting emphasizing curves. Shot on 50mm lens at f/1.4, distance 3m, slight low angle emphasizing elegant bedroom silhouette. Color grading: soft ethereal with luminous whites, gentle backlighting creating dreamy intimate mood.

Technical Specifications: Ultra-high-resolution 8K+ with exceptional backlighting detail. Professional silhouette exposure maintaining detail in highlights and shadows. Museum-quality boudoir photography with authentic fabric translucency. Realistic lace physics with natural light interaction. Authentic skin glow in backlight with natural radiance. Intimate power level 10/10.`
  }
];

// ============================================================================
// MODEL 17: WET LOOK (Asha Aqua) - 2 Prompts
// ============================================================================

const WET_LOOK_PROMPTS: ImagenPromptExpanded[] = [
  {
    id: 'imagen-wet-001',
    modelId: 'erotic-model-017',
    modelName: 'Asha Aqua',
    scenarioName: 'Glass Shower Artistry',
    category: 'wet',
    intimacyLevel: 10,
    aspectRatio: '3:4',
    personGeneration: 'allow_adult',
    safetyFilter: 'block_few',
    prompt: `${IMAGEN_ART_DIRECTOR_DECLARATION}

A sophisticated wet look photography showcasing an Indian fashion model (height 5'8") with curved athletic figure (bust 36D", waist 25", hips 38"). She has golden honey complexion glowing and glistening when wet, sultry wet-look eyes and dewy sensual lips creating aquatic beauty. Wet hair styled sleek against head with water droplets. Her wet skin is luminous and glistening with water droplets creating sculptural highlights. Hands with elegant nails in nude wet finish.

Behind frosted glass shower door with water streaming down, wearing ultra-thin wet white fabric that clings transparently to curves revealing form beneath. Water runs over shoulders and body creating glistening rivulets emphasizing curves. She looks through glass with sensual aquatic confidence, one hand on glass, steam creating dreamy atmosphere. The wet white fabric becomes nearly transparent clinging to every curve with water-enhanced sensuality.

The composition is in a luxury glass shower: modern chrome fixtures with rainfall shower head, frosted glass creating artistic diffusion, steam mist, white marble creating clean luxury atmosphere. Lighting: backlit steam with water droplets glistening, dramatic highlighting creating sculptural wet definition. Shot on 85mm lens at f/1.8, distance 2m through glass, slightly elevated angle creating intimate shower perspective with artistic glass diffusion. Color grading: cool clean tones with warm skin glow, water highlights creating fresh aquatic atmosphere.

Technical Specifications: Ultra-high-resolution 8K+ capturing water droplet micro-details. Professional wet skin rendering with authentic water interaction and glistening highlights. Museum-quality water photography with realistic wet fabric physics showing transparency and clinging. Authentic wet skin texture with water beading and flowing. Real water physics with natural droplet formation. Power level 10/10 intimacy.`
  },
  {
    id: 'imagen-wet-002',
    modelId: 'erotic-model-017',
    modelName: 'Asha Aqua',
    scenarioName: 'Poolside Water Drip',
    category: 'wet',
    intimacyLevel: 10,
    aspectRatio: '3:4',
    personGeneration: 'allow_adult',
    safetyFilter: 'block_few',
    prompt: `${IMAGEN_ART_DIRECTOR_DECLARATION}

An aquatic fashion photography showcasing an Indian fashion model (height 5'8") with glistening wet curves (bust 36D", waist 25", hips 38"). Golden honey skin glowing with water creating luminous aquatic beauty. She wears minimal wet mesh body suit becoming sheer and transparent when wet, revealing artistic curves beneath with water droplets emphasizing form.

Standing at infinity pool edge with water dripping from body and hair, both hands running through wet hair creating dynamic water spray and droplet cascade. She gazes with aquatic confidence, water glistening on curves creating sculptural highlights. Sunset backdrop with pool reflections.

The composition is at a luxury infinity pool: endless edge with ocean horizon, golden hour lighting, water reflections creating magical atmosphere. Lighting: golden hour backlight with water glistening creating spectacular highlights and wet skin definition. Shot on 85mm lens at f/1.8, distance 2.5m, eye-level with pool creating aquatic elegance framing. Color grading: warm golden tones with cool water blues, sunset creating dramatic romantic atmosphere.

Technical Specifications: Ultra-high-resolution capturing water physics and droplet details. Professional wet rendering with glistening skin and transparent fabric interaction. Realistic water dynamics with natural dripping and splashing. Authentic wet mesh transparency showing natural form beneath. Power level 10/10 intimacy.`
  }
];

// ============================================================================
// MODEL 18: DANCE (Kira Movement) - 2 Prompts
// ============================================================================

const DANCE_PROMPTS: ImagenPromptExpanded[] = [
  {
    id: 'imagen-dance-001',
    modelId: 'erotic-model-018',
    modelName: 'Kira Movement',
    scenarioName: 'Pole Dance Artistry',
    category: 'dance',
    intimacyLevel: 10,
    aspectRatio: '3:4',
    personGeneration: 'allow_adult',
    safetyFilter: 'block_few',
    prompt: `${IMAGEN_ART_DIRECTOR_DECLARATION}

A dynamic pole dance photography showcasing an Indian fashion model (height 5'9") with athletic dancer figure (bust 36C", waist 24", hips 37"). She has warm bronze complexion with athletic glow, intense performance eyes and confident smile creating athletic dancer beauty. Performance hair styled sleek pulled back. Skin has athletic luminosity. Hands with performance nails gripping pole.

Climbing chrome pole with athletic strength, one leg extended high showing flexibility, body arched emphasizing athletic curves. She wears minimal athletic dance wear with strategic coverage and bold reveals, performance aesthetic with sequin accents catching stage lights. She looks at camera with performance confidence and athletic sensual power.

The composition is in a professional pole studio: chrome poles reflecting light, wood floor, wall mirrors, dramatic colored stage lighting creating performance atmosphere. Lighting: dramatic colored spotlights (purple and blue) with dramatic shadows emphasizing athletic movement and muscle definition. Shot on 70mm lens at f/2.0, distance 3m, dynamic angle capturing full athletic pole artistry and flexibility. Color grading: dramatic and saturated with bold stage colors, deep shadows creating powerful performance mood.

Technical Specifications: Ultra-high-resolution 8K+ capturing athletic movement and muscle definition. Professional performance photography with authentic fabric and muscle physics. Museum-quality athletic artistry with realistic pole interaction and grip details. Authentic athletic skin with muscle definition and performance glow. Power level 10/10 performance intensity.`
  },
  {
    id: 'imagen-dance-002',
    modelId: 'erotic-model-018',
    modelName: 'Kira Movement',
    scenarioName: 'Floor Split Performance',
    category: 'dance',
    intimacyLevel: 10,
    aspectRatio: '3:4',
    personGeneration: 'allow_adult',
    safetyFilter: 'block_few',
    prompt: `${IMAGEN_ART_DIRECTOR_DECLARATION}

A flexible dance photography showcasing an Indian athletic dancer (height 5'9") with flexible curved strength (bust 36C", waist 24", hips 37"). Warm bronze athletic complexion with performance intensity. She wears black athletic performance harness with minimal coverage emphasizing flexibility.

Performing full front split on studio floor, torso upright, both arms extended gracefully overhead creating elegant lines, back slightly arched. She looks directly at camera with performance confidence and athletic sensual power, demonstrating extreme flexibility.

The composition is in a dance studio: wood floor with dramatic stage lighting, mirrors reflecting, professional performance atmosphere. Lighting: dramatic spotlight from above creating sculptural shadows emphasizing flexibility and athletic form. Shot on 70mm lens at f/2.0, distance 2.5m, slightly elevated angle capturing full split flexibility and graceful extension. Color grading: dramatic with deep shadows and warm skin tones, bold contrast creating powerful athletic mood.

Technical Specifications: Ultra-high-resolution capturing flexibility and athletic grace. Professional dance photography with authentic muscle engagement and flexibility physics. Museum-quality performance artistry. Authentic athletic skin showing natural muscle definition and performance engagement. Power level 10/10.`
  }
];

// ============================================================================
// MODEL 19: SPA (Serena Zen) - 2 Prompts
// ============================================================================

const SPA_PROMPTS: ImagenPromptExpanded[] = [
  {
    id: 'imagen-spa-001',
    modelId: 'erotic-model-019',
    modelName: 'Serena Zen',
    scenarioName: 'Massage Table Serenity',
    category: 'spa',
    intimacyLevel: 10,
    aspectRatio: '3:4',
    personGeneration: 'allow_adult',
    safetyFilter: 'block_few',
    prompt: `${IMAGEN_ART_DIRECTOR_DECLARATION}

A serene spa photography showcasing an Indian fashion model (height 5'8") with soft elegant curves (bust 38D", waist 26", hips 39"). She has rich caramel complexion glowing with visible oil sheen creating luminous spa beauty, serene relaxed eyes and gentle smile creating spa elegance. Hair styled in elegant updo. Skin is glistening with massage oil creating sculptural highlights. Hands relaxed with spa manicure.

Reclined face-up on luxury massage table with white spa towel strategically draped across hips revealing oil-glistening upper body and legs. Both arms resting gently at sides, serene relaxed pose. She gazes serenely at camera with spa confidence and luxury relaxation. Oil creates visible glistening highlights across skin emphasizing curves.

The composition is in a luxury spa suite: soft warm lighting, candles creating ambient glow, natural wood elements, white spa linens creating serene atmosphere. Lighting: soft warm spa lighting with candlelight creating gentle shadows and emphasizing oil-glistening skin. Shot on 85mm lens at f/1.4, distance 2m, slightly elevated angle capturing massage table spa elegance. Color grading: warm and serene with golden tones, soft shadows creating tranquil spa mood.

Technical Specifications: Ultra-high-resolution 8K+ capturing oil sheen micro-details and skin luminosity. Professional spa photography with authentic oil rendering showing realistic light interaction and glistening. Museum-quality with realistic towel draping physics. Authentic skin with oil creating natural highlights and sculptural definition. Power level 10/10 intimacy.`
  },
  {
    id: 'imagen-spa-002',
    modelId: 'erotic-model-019',
    modelName: 'Serena Zen',
    scenarioName: 'Outdoor Spa Zen',
    category: 'spa',
    intimacyLevel: 10,
    aspectRatio: '3:4',
    personGeneration: 'allow_adult',
    safetyFilter: 'block_few',
    prompt: `${IMAGEN_ART_DIRECTOR_DECLARATION}

A natural spa photography showcasing an Indian model (height 5'8") with oil-enhanced curves (bust 38D", waist 26", hips 39"). Rich caramel skin glistening with oil in natural light. She wears luxury white silk spa wrap with minimal coverage, oil glistening on exposed skin.

Sitting on natural stone spa bench in outdoor setting, one knee raised elegantly, silk wrap draped to reveal oil-glistening curves. She looks serenely at camera with zen confidence surrounded by tropical plants. Natural daylight creates organic spa atmosphere.

The composition is in an outdoor spa oasis: natural stone elements, lush tropical plants, water features, private natural luxury creating zen atmosphere. Lighting: soft natural daylight with gentle dappled shadows from plants creating serene organic ambiance. Shot on 85mm lens at f/1.4, distance 2.5m, eye-level creating natural spa elegance. Color grading: natural and fresh with green tones and warm skin glow creating organic zen mood.

Technical Specifications: Ultra-high-resolution capturing natural oil glow in daylight. Professional outdoor spa photography with authentic silk draping and oil rendering. Museum-quality natural light work. Authentic skin with oil creating luminous natural highlights. Power level 10/10.`
  }
];

// ============================================================================
// MODEL 20: POOL (Marina Aquatic) - 2 Prompts
// ============================================================================

const POOL_PROMPTS: ImagenPromptExpanded[] = [
  {
    id: 'imagen-pool-001',
    modelId: 'erotic-model-020',
    modelName: 'Marina Aquatic',
    scenarioName: 'Pool Edge Elegance',
    category: 'pool',
    intimacyLevel: 10,
    aspectRatio: '3:4',
    personGeneration: 'allow_adult',
    safetyFilter: 'block_few',
    prompt: `${IMAGEN_ART_DIRECTOR_DECLARATION}

A poolside lifestyle photography showcasing an Indian fashion model (height 5'10") with athletic swimmer curves (bust 36C", waist 25", hips 37"). She has sun-kissed golden complexion with healthy glow, vibrant eyes and athletic smile creating aquatic beauty. Wet hair slicked back. Skin glistening with pool water. Athletic manicure with coral polish.

Sitting on infinity pool edge with legs dangling in water, leaning back on hands creating confident posture emphasizing athletic curves. She wears minimal string-tie swimwear with bold reveals and poolside confidence. She looks at camera with aquatic athletic confidence and sensual elegance. Water droplets visible on skin catching sunlight.

The composition is at a luxury infinity pool: endless edge with ocean horizon visible, tropical paradise setting, golden hour creating magical atmosphere. Lighting: golden hour natural sunlight creating warm glow with water reflections adding sculptural highlights to wet skin. Shot on 85mm lens at f/2.0, distance 3m, slightly low angle emphasizing pool setting and ocean backdrop. Color grading: warm golden tones with cool pool blues, sunset creating vibrant tropical mood.

Technical Specifications: Ultra-high-resolution 8K+ capturing water droplets and golden hour details. Professional poolside photography with authentic wet skin rendering and water physics. Museum-quality with realistic swimwear fabric physics when wet. Authentic sun-kissed skin with water droplets creating natural highlights. Power level 10/10.`
  },
  {
    id: 'imagen-pool-002',
    modelId: 'erotic-model-020',
    modelName: 'Marina Aquatic',
    scenarioName: 'Floating Pool Serenity',
    category: 'pool',
    intimacyLevel: 10,
    aspectRatio: '4:3',
    personGeneration: 'allow_adult',
    safetyFilter: 'block_few',
    prompt: `${IMAGEN_ART_DIRECTOR_DECLARATION}

An aquatic lifestyle photography showcasing an Indian model (height 5'10") with athletic aquatic elegance (bust 36C", waist 25", hips 37"). Golden sun-kissed skin glowing in water. She wears ultra-minimal pool swimwear with athletic minimal coverage.

Floating on back in crystal clear pool water, arms extended gracefully, body relaxed, hair floating in water creating artistic composition. Shot from directly overhead capturing full body floating with water ripples and pool reflections. She gazes up at camera with serene aquatic confidence.

The composition is in a private villa pool: crystal clear turquoise water, lush surroundings reflected, intimate luxury atmosphere. Lighting: natural overhead daylight with water creating turquoise color cast and ripple patterns across floating body. Shot on 50mm lens at f/2.8, overhead directly above pool, unique perspective capturing floating serenity. Color grading: vibrant turquoise and warm skin tones creating fresh tropical mood.

Technical Specifications: Ultra-high-resolution capturing water refraction and floating physics. Professional overhead aquatic photography with authentic water movement and floating body physics. Museum-quality with realistic water color and clarity. Authentic skin in water with natural color and aquatic glow. Power level 10/10.`
  }
];

// ============================================================================
// MODEL 21: YOGA (Leela Flexibility) - 2 Prompts
// ============================================================================

const YOGA_PROMPTS: ImagenPromptExpanded[] = [
  {
    id: 'imagen-yoga-001',
    modelId: 'erotic-model-021',
    modelName: 'Leela Flexibility',
    scenarioName: 'Backbend Yoga Arch',
    category: 'yoga',
    intimacyLevel: 10,
    aspectRatio: '3:4',
    personGeneration: 'allow_adult',
    safetyFilter: 'block_few',
    prompt: `${IMAGEN_ART_DIRECTOR_DECLARATION}

A yoga flexibility photography showcasing an Indian fashion model (height 5'7") with flexible athletic curves (bust 34C", waist 24", hips 36"). She has warm honey complexion with healthy yoga glow, serene focused eyes and peaceful smile creating yoga beauty. Hair in yoga braid. Skin has natural yoga luminosity. Athletic manicure.

Performing dramatic backbend arch pose on yoga mat, hands and feet planted, hips elevated, spine curved creating spectacular arch emphasizing chest and curves, head tilted back. She wears ultra form-fitting minimal yoga wear emphasizing curves during flexible pose. Demonstrates extreme flexibility with yoga confidence.

The composition is in a natural light yoga studio: wood floors, large windows with soft daylight, minimalist decor creating serene practice atmosphere. Lighting: soft natural window light creating gentle shadows emphasizing spine curve and flexibility. Shot on 70mm lens at f/2.8, distance 2.5m, side angle capturing dramatic arch and flexibility. Color grading: natural and serene with warm wood tones and soft daylight creating peaceful yoga mood.

Technical Specifications: Ultra-high-resolution 8K+ capturing flexibility and athletic form. Professional yoga photography with authentic muscle engagement showing realistic flexibility physics. Museum-quality athletic artistry. Authentic athletic skin showing natural muscle definition and yoga engagement. Power level 10/10.`
  },
  {
    id: 'imagen-yoga-002',
    modelId: 'erotic-model-021',
    modelName: 'Leela Flexibility',
    scenarioName: 'Rooftop Yoga Splits',
    category: 'yoga',
    intimacyLevel: 10,
    aspectRatio: '4:3',
    personGeneration: 'allow_adult',
    safetyFilter: 'block_few',
    prompt: `${IMAGEN_ART_DIRECTOR_DECLARATION}

An outdoor yoga photography showcasing an Indian flexible athlete (height 5'7") with yoga elegance (bust 34C", waist 24", hips 36"). Warm honey skin glowing in morning light. She wears minimal athletic sports bra and yoga shorts with bold minimal athletic coverage.

Performing full front splits on yoga mat on rooftop deck, torso upright, both arms extended overhead in prayer position, perfect vertical alignment. City skyline visible in background. She gazes forward with yoga confidence and serene athletic power demonstrating extreme flexibility.

The composition is on a private rooftop yoga oasis: wooden deck, city skyline backdrop, morning golden light creating outdoor practice atmosphere. Lighting: morning golden hour light creating warm glow with clean shadows emphasizing split flexibility. Shot on 50mm lens at f/2.8, distance 3m, eye-level capturing full split with city backdrop. Color grading: warm morning tones with urban skyline creating fresh outdoor yoga mood.

Technical Specifications: Ultra-high-resolution capturing outdoor flexibility and urban backdrop. Professional outdoor yoga photography with authentic flexibility physics. Museum-quality athletic artistry with realistic muscle engagement. Authentic athletic skin in morning light with natural glow. Power level 10/10.`
  }
];

// ============================================================================
// MODEL 22: POWER DYNAMICS (Dominique Power) - 2 Prompts
// ============================================================================

const POWER_PROMPTS: ImagenPromptExpanded[] = [
  {
    id: 'imagen-power-001',
    modelId: 'erotic-model-022',
    modelName: 'Dominique Power',
    scenarioName: 'Dominant Throne Command',
    category: 'power',
    intimacyLevel: 10,
    aspectRatio: '3:4',
    personGeneration: 'allow_adult',
    safetyFilter: 'block_few',
    prompt: `${IMAGEN_ART_DIRECTOR_DECLARATION}

A power dynamics photography showcasing an Indian fashion model (height 5'11") with commanding presence (bust 38D", waist 26", hips 39"). She has fair porcelain complexion with dramatic contrast, intense commanding eyes and strong features creating dominant beauty. Hair styled sleek and severe. Skin has dramatic flawless finish. Bold red manicure.

Sitting commandingly on leather throne-like chair, one leg crossed over knee, one arm on armrest, powerful posture radiating dominance. She wears strategic black leather harness with minimal coverage and bold dominant reveals, premium leather with metal hardware creating power aesthetic. She stares intensely at camera with commanding dominant confidence and unwavering power presence.

The composition is in a luxury dungeon suite: black leather furniture, metal fixtures, dramatic high-contrast lighting creating power exchange atmosphere. Lighting: dramatic high-contrast with deep shadows emphasizing commanding presence and leather textures, harsh key light creating sculptural definition. Shot on 85mm lens at f/1.2, distance 2.5m, slightly low angle emphasizing dominant powerful positioning. Color grading: high contrast with deep blacks and dramatic highlights creating intense powerful mood.

Technical Specifications: Ultra-high-resolution 8K+ capturing leather textures and metal details. Professional power dynamics photography with authentic leather material rendering and dramatic lighting. Museum-quality with realistic leather physics and metal hardware details. Authentic skin with dramatic contrast and flawless finish. Power level 10/10 dominance.`
  },
  {
    id: 'imagen-power-002',
    modelId: 'erotic-model-022',
    modelName: 'Dominique Power',
    scenarioName: 'Industrial Power Standing',
    category: 'power',
    intimacyLevel: 10,
    aspectRatio: '3:4',
    personGeneration: 'allow_adult',
    safetyFilter: 'block_few',
    prompt: `${IMAGEN_ART_DIRECTOR_DECLARATION}

A power dynamics photography showcasing an Indian dominant (height 5'11") with powerful curves (bust 38D", waist 26", hips 39"). Fair skin with dramatic industrial lighting. She wears minimal black leather corset with bold bottom creating commanding power aesthetic with chain accents.

Standing powerfully in wide stance, one hand holding riding crop confidently, other hand on hip, commanding dominant posture. She stares with intense unwavering dominance and absolute power presence. Industrial chains visible as atmospheric props.

The composition is in an industrial power space: exposed brick walls, metal chains hanging, harsh industrial lighting creating urban power atmosphere. Lighting: harsh industrial overhead creating dramatic shadows and emphasizing dominant powerful stance. Shot on 85mm lens at f/1.2, distance 3m, eye-level capturing full powerful commanding presence. Color grading: industrial and gritty with deep shadows and harsh highlights creating intense urban power mood.

Technical Specifications: Ultra-high-resolution capturing leather and chain textures. Professional power photography with authentic materials and dramatic industrial lighting. Museum-quality power dynamics artistry. Authentic skin with dramatic industrial lighting creating powerful presence. Power level 10/10.`
  }
];

// ============================================================================
// MODEL 23: SECRETARY (Priyanka Professional) - 2 Prompts
// ============================================================================

const SECRETARY_PROMPTS: ImagenPromptExpanded[] = [
  {
    id: 'imagen-secretary-001',
    modelId: 'erotic-model-023',
    modelName: 'Priyanka Professional',
    scenarioName: 'Executive Desk Seduction',
    category: 'fantasy',
    intimacyLevel: 10,
    aspectRatio: '3:4',
    personGeneration: 'allow_adult',
    safetyFilter: 'block_few',
    prompt: `${IMAGEN_ART_DIRECTOR_DECLARATION}

A corporate seduction photography showcasing an Indian fashion model (height 5'8") with professional curves (bust 38DD", waist 27", hips 39"). She has warm caramel complexion with professional polish, intelligent eyes behind stylish glasses creating professional seductive beauty. Hair in professional updo with strategic loose strands. Professional manicure in bold red.

Sitting on executive desk edge with legs crossed, leaning back on hands creating confident corporate seduction. She wears professional white blouse unbuttoned revealing black lace bralette beneath, paired with ultra-short pencil skirt. She looks at camera with intelligent seductive confidence and corporate power. Floor-to-ceiling windows showing midnight city lights behind.

The composition is in an executive office suite: luxury mahogany desk, leather executive chair, city windows, corporate luxury creating after-hours seduction atmosphere. Lighting: dramatic desk lamp with city lights creating intimate corporate shadows and executive ambiance. Shot on 85mm lens at f/1.4, distance 2m, slightly low angle emphasizing desk positioning and corporate confidence. Color grading: dramatic corporate tones with warm desk lighting and cool city lights creating professional seduction mood.

Technical Specifications: Ultra-high-resolution 8K+ capturing professional wardrobe details and corporate setting. Professional corporate photography with authentic office materials and lighting. Museum-quality with realistic fabric draping of business attire. Authentic skin with professional polish and corporate confidence. Power level 10/10 intimacy.`
  },
  {
    id: 'imagen-secretary-002',
    modelId: 'erotic-model-023',
    modelName: 'Priyanka Professional',
    scenarioName: 'Boardroom Authority',
    category: 'fantasy',
    intimacyLevel: 10,
    aspectRatio: '4:3',
    personGeneration: 'allow_adult',
    safetyFilter: 'block_few',
    prompt: `${IMAGEN_ART_DIRECTOR_DECLARATION}

A corporate fantasy photography showcasing an Indian professional (height 5'8") with business curves (bust 38DD", waist 27", hips 39"). Warm caramel skin with professional elegance, glasses adding intellectual seduction. She wears professional blazer with minimal black lingerie visible beneath creating bold corporate aesthetic.

Leaning forward over large conference table, both hands on table surface creating commanding lean emphasizing curves and professional reveal. She looks directly at camera with corporate confidence and commanding seductive presence. Glass boardroom walls visible.

The composition is in a private conference room: large executive table, leather chairs, glass walls, corporate dramatic lighting creating boardroom power atmosphere. Lighting: overhead corporate lighting with dramatic shadows emphasizing leaning position and professional curves. Shot on 50mm lens at f/1.8, distance 2.5m, across table angle capturing commanding corporate presence. Color grading: corporate and dramatic with cool tones and warm skin creating powerful business mood.

Technical Specifications: Ultra-high-resolution capturing corporate environment and professional details. Professional corporate photography with authentic office setting. Museum-quality business artistry. Authentic skin with professional finish and corporate confidence. Power level 10/10.`
  }
];

// ============================================================================
// MODEL 24: NURSE (Nurse Naina) - 2 Prompts
// ============================================================================

const NURSE_PROMPTS: ImagenPromptExpanded[] = [
  {
    id: 'imagen-nurse-001',
    modelId: 'erotic-model-024',
    modelName: 'Nurse Naina',
    scenarioName: 'Clinical Fantasy Care',
    category: 'fantasy',
    intimacyLevel: 10,
    aspectRatio: '3:4',
    personGeneration: 'allow_adult',
    safetyFilter: 'block_few',
    prompt: `${IMAGEN_ART_DIRECTOR_DECLARATION}

A medical fantasy photography showcasing an Indian fashion model (height 5'7") with caring curves (bust 36D", waist 26", hips 38"). She has fair complexion with healthy glow, caring compassionate eyes and gentle smile creating medical fantasy beauty. Hair in professional nurse styling. Clean natural finish. Medical manicure with pink polish.

Standing in clinical setting with caring confident pose, holding stethoscope around neck, one hand on hip. She wears ultra-short white nurse uniform with minimal coverage and bold reveals creating medical fantasy aesthetic with caring sensuality. She looks at camera with gentle caring confidence and clinical sensual presence.

The composition is in a private clinic room: exam table with white linens, medical equipment on walls, clean clinical white surfaces creating private care atmosphere. Lighting: clean clinical lighting with soft medical ambiance creating sterile yet warm environment. Shot on 85mm lens at f/1.4, distance 2.5m, eye-level emphasizing caring medical presence. Color grading: clean and clinical with whites and soft skin tones creating medical fantasy mood.

Technical Specifications: Ultra-high-resolution 8K+ capturing clinical details and medical setting. Professional medical fantasy photography with authentic clinical environment. Museum-quality with realistic uniform fabric and medical props. Authentic skin with healthy natural glow and caring confidence. Power level 10/10.`
  },
  {
    id: 'imagen-nurse-002',
    modelId: 'erotic-model-024',
    modelName: 'Nurse Naina',
    scenarioName: 'Lab Coat Medical Reveal',
    category: 'fantasy',
    intimacyLevel: 10,
    aspectRatio: '3:4',
    personGeneration: 'allow_adult',
    safetyFilter: 'block_few',
    prompt: `${IMAGEN_ART_DIRECTOR_DECLARATION}

A medical spa photography showcasing an Indian model (height 5'7") with clinical elegance (bust 36D", waist 26", hips 38"). Fair glowing complexion with medical professionalism. She wears white lab coat worn open revealing white minimal lingerie beneath creating medical fantasy with luxury spa fusion.

Sitting on exam table edge with legs crossed elegantly, lab coat falling open, caring confident posture. She looks at camera with medical confidence and gentle sensual caring presence. Luxury medical spa aesthetics blending clinical with spa elegance.

The composition is in a luxury medical spa: upscale medical aesthetics room, white luxury surfaces, clean clinical with spa elegance creating premium care atmosphere. Lighting: soft luxury lighting with clinical cleanliness creating warm medical spa ambiance. Shot on 85mm lens at f/1.4, distance 2m, slight low angle emphasizing elegant sitting position. Color grading: clean whites with warm luxury tones creating medical spa fusion mood.

Technical Specifications: Ultra-high-resolution capturing luxury medical environment. Professional medical spa photography with authentic lab coat draping and clinical luxury. Museum-quality medical fantasy artistry. Authentic skin with healthy glow and caring presence. Power level 10/10.`
  }
];

// ============================================================================
// MODEL 25: MAID (Maid Meera) - 2 Prompts
// ============================================================================

const MAID_PROMPTS: ImagenPromptExpanded[] = [
  {
    id: 'imagen-maid-001',
    modelId: 'erotic-model-025',
    modelName: 'Maid Meera',
    scenarioName: 'French Maid Service',
    category: 'fantasy',
    intimacyLevel: 10,
    aspectRatio: '3:4',
    personGeneration: 'allow_adult',
    safetyFilter: 'block_few',
    prompt: `${IMAGEN_ART_DIRECTOR_DECLARATION}

A playful service fantasy photography showcasing an Indian fashion model (height 5'6") with petite playful curves (bust 36D", waist 25", hips 37"). She has warm honey complexion with playful glow, flirty eyes and mischievous smile creating service fantasy beauty. Hair in playful maid styling with headband. Playful manicure with French tips. She wears ultra-short French maid outfit in black and white with minimal coverage creating bold playful service aesthetic.

Bending forward as if dusting surface, looking back over shoulder at camera with playful mischievous expression and service confidence, playful curves emphasized by bending pose. Holding feather duster creating service fantasy narrative.

The composition is in a luxury mansion interior: elegant furnishings, premium surfaces, luxury domestic atmosphere creating high-end service setting. Lighting: elegant mansion lighting with warm luxury ambiance creating sophisticated domestic mood. Shot on 85mm lens at f/1.4, distance 2.5m, angle capturing bending service pose and playful curves. Color grading: warm and luxurious with elegant tones creating playful mansion service mood.

Technical Specifications: Ultra-high-resolution 8K+ capturing maid uniform details and luxury setting. Professional service fantasy photography with authentic French maid costume and elegant environment. Museum-quality domestic fantasy artistry. Authentic skin with playful warm glow and mischievous confidence. Power level 10/10.`
  },
  {
    id: 'imagen-maid-002',
    modelId: 'erotic-model-025',
    modelName: 'Maid Meera',
    scenarioName: 'Penthouse Maid Service',
    category: 'fantasy',
    intimacyLevel: 10,
    aspectRatio: '3:4',
    personGeneration: 'allow_adult',
    safetyFilter: 'block_few',
    prompt: `${IMAGEN_ART_DIRECTOR_DECLARATION}

A modern service fantasy photography showcasing an Indian petite model (height 5'6") with playful service curves (bust 36D", waist 25", hips 37"). Warm honey skin with playful confidence. She wears tiny white apron with minimal black lace lingerie beneath creating minimal apron service aesthetic.

Kneeling on floor as if cleaning, looking up at camera with playful service confidence and mischievous sensual presence, holding cleaning supplies creating service narrative. Modern penthouse setting visible behind.

The composition is in a penthouse suite: modern luxury furnishings, floor-to-ceiling windows with city views, urban luxury creating high-end modern service atmosphere. Lighting: modern luxury lighting with city backdrop creating contemporary domestic mood. Shot on 50mm lens at f/1.8, distance 2m, slightly elevated angle looking down at kneeling position. Color grading: modern and clean with urban luxury tones creating contemporary service fantasy mood.

Technical Specifications: Ultra-high-resolution capturing modern luxury setting and service details. Professional modern service photography with authentic urban luxury environment. Museum-quality domestic fantasy with realistic apron draping. Authentic skin with playful glow and service confidence. Power level 10/10.`
  }
];

// ============================================================================
// MODEL 26: TEACHER (Professor Pooja) - 2 Prompts
// ============================================================================

const TEACHER_PROMPTS: ImagenPromptExpanded[] = [
  {
    id: 'imagen-teacher-001',
    modelId: 'erotic-model-026',
    modelName: 'Professor Pooja',
    scenarioName: 'After Hours Classroom',
    category: 'fantasy',
    intimacyLevel: 10,
    aspectRatio: '3:4',
    personGeneration: 'allow_adult',
    safetyFilter: 'block_few',
    prompt: `${IMAGEN_ART_DIRECTOR_DECLARATION}

An educational fantasy photography showcasing an Indian fashion model (height 5'9") with intellectual curves (bust 38D", waist 26", hips 38"). She has warm caramel complexion with intellectual glow, intelligent eyes behind stylish glasses creating authoritative seductive beauty. Hair in professional teacher styling. Professional manicure in burgundy.

Sitting on classroom desk with legs crossed, leaning back on hands creating confident teacher authority. She wears professional outfit with blouse partially unbuttoned revealing curves, short pencil skirt creating bold teacher fantasy aesthetic. She looks at camera with intellectual authority and seductive teacher confidence. Blackboard visible behind with after-hours empty classroom.

The composition is in a private classroom after hours: teacher desk, blackboard, classroom furniture, educational atmosphere creating after-hours teacher fantasy setting. Lighting: classroom lighting with after-hours mood creating intimate educational ambiance. Shot on 85mm lens at f/1.4, distance 2m, slightly low angle emphasizing desk sitting authority. Color grading: warm and academic with educational tones creating teacher fantasy mood.

Technical Specifications: Ultra-high-resolution 8K+ capturing classroom details and professional wardrobe. Professional educational fantasy photography with authentic classroom environment. Museum-quality teacher fantasy artistry. Authentic skin with professional intellectual confidence. Power level 10/10.`
  },
  {
    id: 'imagen-teacher-002',
    modelId: 'erotic-model-026',
    modelName: 'Professor Pooja',
    scenarioName: 'Professor Office Authority',
    category: 'fantasy',
    intimacyLevel: 10,
    aspectRatio: '3:4',
    personGeneration: 'allow_adult',
    safetyFilter: 'block_few',
    prompt: `${IMAGEN_ART_DIRECTOR_DECLARATION}

An academic fantasy photography showcasing an Indian professor (height 5'9") with authoritative elegance (bust 38D", waist 26", hips 38"). Warm caramel skin with intellectual sophistication, glasses adding authority. She wears professional blazer with minimal lingerie visible beneath creating intellectual fantasy aesthetic.

Leaning back against professor desk with arms crossed creating commanding academic authority, surrounded by bookshelves. She looks at camera with intellectual dominance and seductive authoritative presence.

The composition is in a professor office suite: floor-to-ceiling bookshelves, professor desk, academic decor, office elegance creating intellectual authority atmosphere. Lighting: warm office lighting with academic ambiance creating sophisticated intellectual mood. Shot on 50mm lens at f/1.8, distance 2.5m, eye-level capturing commanding academic presence. Color grading: warm academic with rich wood tones and intellectual atmosphere creating professor fantasy mood.

Technical Specifications: Ultra-high-resolution capturing academic environment and intellectual details. Professional academic photography with authentic office setting. Museum-quality intellectual fantasy artistry. Authentic skin with professional authoritative confidence. Power level 10/10.`
  }
];

// ============================================================================
// MODEL 27: BRIDE (Bride Rhea) - 2 Prompts
// ============================================================================

const BRIDE_PROMPTS: ImagenPromptExpanded[] = [
  {
    id: 'imagen-bride-001',
    modelId: 'erotic-model-027',
    modelName: 'Bride Rhea',
    scenarioName: 'Wedding Night Romance',
    category: 'fantasy',
    intimacyLevel: 10,
    aspectRatio: '3:4',
    personGeneration: 'allow_adult',
    safetyFilter: 'block_few',
    prompt: `${IMAGEN_ART_DIRECTOR_DECLARATION}

A romantic bridal photography showcasing an Indian fashion model (height 5'7") with romantic curves (bust 36D", waist 25", hips 38"). She has luminous fair complexion with bridal glow, romantic dreamy eyes and soft sensual lips creating bridal beauty. Hair in romantic bridal styling with loose waves. Bridal manicure with French pearl finish.

Sitting on honeymoon suite bed in white bridal lingerie, legs tucked elegantly to side, looking at camera with innocent romantic confidence and wedding night sensuality. She wears delicate white lace bridal lingerie with minimal coverage creating romantic wedding night aesthetic. Silk sheets and rose petals visible.

The composition is in a luxury honeymoon suite: opulent bed with silk sheets, rose petals scattered, romantic candles, luxury furnishings creating ultimate wedding night atmosphere. Lighting: soft romantic candlelight with warm intimate glow creating dreamy honeymoon ambiance. Shot on 50mm lens at f/1.4, distance 2.5m, slightly elevated angle emphasizing bridal bedroom intimacy. Color grading: soft and romantic with warm candlelight tones creating wedding night dream mood.

Technical Specifications: Ultra-high-resolution 8K+ capturing bridal details and romantic setting. Professional bridal boudoir photography with authentic white lace and romantic environment. Museum-quality wedding night artistry. Authentic skin with luminous bridal glow and innocent romantic confidence. Power level 10/10 intimacy.`
  },
  {
    id: 'imagen-bride-002',
    modelId: 'erotic-model-027',
    modelName: 'Bride Rhea',
    scenarioName: 'Bridal Veil Portrait',
    category: 'fantasy',
    intimacyLevel: 10,
    aspectRatio: '3:4',
    personGeneration: 'allow_adult',
    safetyFilter: 'block_few',
    prompt: `${IMAGEN_ART_DIRECTOR_DECLARATION}

A bridal portrait photography showcasing an Indian bride (height 5'7") with romantic elegance (bust 36D", waist 25", hips 38"). Luminous fair skin with bridal radiance, romantic dreamy features. She wears wedding veil with minimal white bridal lingerie creating innocent romantic bridal aesthetic.

Standing by bedroom window backlit creating dreamy bridal silhouette, wedding veil flowing, looking back over shoulder at camera with romantic innocent confidence and bridal sensuality. Natural morning light creating ethereal bridal mood.

The composition is in a villa bridal suite: floor-to-ceiling windows with ocean views, romantic morning light, luxury bridal atmosphere creating destination wedding elegance. Lighting: soft backlit window light creating glowing bridal silhouette with veil translucency emphasized. Shot on 85mm lens at f/1.4, distance 3m, backlit angle capturing ethereal bridal beauty. Color grading: soft and dreamy with luminous whites and warm morning glow creating romantic bridal mood.

Technical Specifications: Ultra-high-resolution capturing bridal veil translucency and morning backlight. Professional bridal photography with authentic veil physics and backlight rendering. Museum-quality wedding artistry. Authentic skin with bridal luminosity and innocent romantic confidence. Power level 10/10.`
  }
];

// ============================================================================
// EXPORTS
// ============================================================================

export const IMAGEN_PROMPTS_EXPANDED: ImagenPromptExpanded[] = [
  ...BOUDOIR_PROMPTS,
  ...WET_LOOK_PROMPTS,
  ...DANCE_PROMPTS,
  ...SPA_PROMPTS,
  ...POOL_PROMPTS,
  ...YOGA_PROMPTS,
  ...POWER_PROMPTS,
  ...SECRETARY_PROMPTS,
  ...NURSE_PROMPTS,
  ...MAID_PROMPTS,
  ...TEACHER_PROMPTS,
  ...BRIDE_PROMPTS
];

// Helper functions
export function getImagenPromptsByModel(modelId: string): ImagenPromptExpanded[] {
  return IMAGEN_PROMPTS_EXPANDED.filter(p => p.modelId === modelId);
}

export function getImagenPromptsByCategory(category: ImagenPromptExpanded['category']): ImagenPromptExpanded[] {
  return IMAGEN_PROMPTS_EXPANDED.filter(p => p.category === category);
}

export function getImagenPromptById(id: string): ImagenPromptExpanded | undefined {
  return IMAGEN_PROMPTS_EXPANDED.find(p => p.id === id);
}
