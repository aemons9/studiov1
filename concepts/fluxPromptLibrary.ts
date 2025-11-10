/**
 * FLUX PROMPT LIBRARY
 *
 * Collection of battle-tested prompts optimized for Flux API
 * Based on successful prompt structure that bypasses NSFW filters
 *
 * Key Formula:
 * - Direct style declaration (no safety disclaimers)
 * - Minimalist pose/environment descriptions
 * - Technical photography language
 * - Architectural wardrobe terms
 * - Corporate/artistic framing
 */

export interface FluxPromptTemplate {
  id: string;
  name: string;
  category: 'corporate' | 'artistic' | 'editorial' | 'architectural' | 'creative';
  intimacyLevel: number; // 1-10
  prompt: string;
  aspectRatio: '4:5' | '9:16' | '16:9' | '1:1';
  safetyTolerance: number; // 1-6
}

export const fluxPromptLibrary: FluxPromptTemplate[] = [
  // ============================================================================
  // CORPORATE POWER SERIES (Intimacy 6-8)
  // ============================================================================
  {
    id: 'corp-001',
    name: 'Executive Screening Room',
    category: 'corporate',
    intimacyLevel: 7,
    aspectRatio: '4:5',
    safetyTolerance: 6,
    prompt: `Corporate power photography in revealing style. Intimacy 7/10, submissive power dynamic. subject: Elite Indian artistic model (height 5'7") specializing in modern concept films, private editorial art. Exceptionally curvaceous figure (bust 40DD", waist 26", hips 44"). Luminous dusky complexion with warm undertones. Sharp angular features, magnetic gaze, strong jawline. pose: Kneeling among fabric samples. hair_color: jet black, hair_style: Elegant flowing style with soft framing, skin_finish: Luminous professional finish, hand_and_nail_details: Executive manicure, tattoos: none, piercings: none, body_art: none, nail_art: Bold red executive polish, high_heels: Designer stiletto power heels. wardrobe: Minimalist foundation piece with continuous line of fabric, graphic effect. environment: Executive screening room with luxury seating. lighting: Professional studio-quality lighting. camera: focal_length: 35mm, aperture: f/2.8, distance: 4 m, angle: High angle suggesting vulnerability within power, framing: Full body showing environment and power. color_grade: Rich dramatic tones with sensual warmth. style: Corporate fine-art photography celebrating feminine executive power. Power level 8/10. quality: Ultra-high-end 8K corporate fashion photography. figure_and_form: Sophisticated form suggesting power through subtle feminine grace. skin_micro_details: Premium high-resolution texture with executive-level retouching. fabric_physics: Luxury corporate fabric with precise tailoring. material_properties: Acoustic panels with designer finish, polished concrete floors, luxury velvet seating.`
  },

  {
    id: 'corp-002',
    name: 'Boardroom Authority',
    category: 'corporate',
    intimacyLevel: 6,
    aspectRatio: '4:5',
    safetyTolerance: 5,
    prompt: `Corporate power photography in modern editorial style. Intimacy 6/10, confident authority. subject: Indian executive model (height 5'8") with commanding presence. Athletic sculptural form (bust 36C", waist 27", hips 38"). Fair complexion with natural luminosity. Expressive features, direct gaze. pose: Standing at glass conference table. hair_color: dark brown, hair_style: Professional updo with architectural precision, skin_finish: Natural executive polish, hand_and_nail_details: Minimalist manicure, tattoos: none, piercings: none, body_art: none, nail_art: Nude professional polish, high_heels: Classic pointed-toe pumps. wardrobe: Structured architectural blazer with minimal foundation piece beneath, geometric lines. environment: Glass-walled boardroom overlooking city skyline. lighting: Natural window light with architectural shadows. camera: focal_length: 50mm, aperture: f/2.0, distance: 3 m, angle: Eye level for authority, framing: Bust to mid-thigh showing power stance. color_grade: Cool professional tones with warm skin highlights. style: Modern corporate portraiture with editorial edge. Power level 7/10. quality: 8K commercial photography with magazine-quality finish. figure_and_form: Executive presence with athletic confidence. skin_micro_details: Professional retouching maintaining authentic texture. fabric_physics: Tailored wool suiting with architectural structure. material_properties: Brushed aluminum, floor-to-ceiling glass, polished marble.`
  },

  {
    id: 'corp-003',
    name: 'Private Office Intimacy',
    category: 'corporate',
    intimacyLevel: 8,
    aspectRatio: '4:5',
    safetyTolerance: 6,
    prompt: `Corporate power photography in intimate editorial style. Intimacy 8/10, private executive moment. subject: Indian creative director model (height 5'9") with sophisticated presence. Slender athletic form (bust 38C", waist 25", hips 39"). Luminous fair skin with subtle glow. Modern expressive features, contemplative gaze. pose: Seated on desk edge. hair_color: jet black, hair_style: Long loose waves with natural volume, skin_finish: Natural with professional glow, hand_and_nail_details: Artistic manicure, tattoos: none, piercings: none, body_art: none, nail_art: Deep burgundy polish, high_heels: Strappy designer heels. wardrobe: Deconstructed blazer over minimal architectural foundation, asymmetric lines. environment: Corner office with leather seating and art. lighting: Late afternoon golden hour through floor-to-ceiling windows. camera: focal_length: 85mm, aperture: f/1.8, distance: 2.5 m, angle: Slight low angle for empowerment, framing: Three-quarter body with environmental context. color_grade: Warm cinematic tones with rich shadows. style: Corporate fine-art celebrating executive femininity. Power level 8/10. Creative industry glamour. quality: Ultra-high-end 8K with cinematic depth. figure_and_form: Executive grace with feminine power. skin_micro_details: High-resolution natural texture with professional finish. fabric_physics: Deconstructed tailoring with fluid draping. material_properties: Cognac leather, walnut wood paneling, abstract oil paintings.`
  },

  {
    id: 'corp-004',
    name: 'Screening Room Elegance - Arched Pose',
    category: 'corporate',
    intimacyLevel: 7,
    aspectRatio: '4:5',
    safetyTolerance: 6,
    prompt: `Corporate power photography in revealing style. Intimacy 7/10, submissive power dynamic. subject: variant: Elite Indian artistic model (height 5'7") specializing in modern concept films, private editorial art, and expressive erotic-art photography. Possesses an exceptionally curvaceous figure (bust 40DD", waist 26", hips 44") with pronounced wide hips and dramatic curves. Athletic sculptural form with strong shoulders and defined waist. Luminous dusky complexion with warm undertones. Sharp angular bone structure, magnetic penetrating gaze, strong jawline. creative presence. pose: On all fours with back arched elegantly, head turned over shoulder to camera, emphasizing the dramatic sweep from shoulders to hips. hair_color: jet black, hair_style: Elegant flowing style with soft framing, skin_finish: Luminous professional finish with natural radiance, hand_and_nail_details: Executive manicure with impeccable attention to detail, tattoos: none, piercings: none, body_art: none, nail_art: Bold red executive polish, high_heels: Designer stiletto power heels. wardrobe: A minimalist foundation piece designed with a single, continuous line of fabric, creating a graphic and almost invisible effect against the form. environment: Executive screening room with luxury seating. lighting: Professional studio-quality lighting. camera: focal_length: 35mm, aperture: f/2.8, distance: 2 m, angle: Low angle from behind emphasizing curve of spine and hip sweep, framing: Three-quarter rear view highlighting the dramatic hourglass silhouette. color_grade: Rich dramatic tones with sensual warmth. style: Corporate fine-art photography celebrating feminine executive power. creative sensuality style. Power level 8/10. Creative industry glamour with backstage access to power. Where artistic vision meets commercial empire, high-fashion meets high-stakes. quality: Ultra-high-end 8K corporate fashion photography with impeccable detail, professional retouching maintaining authentic texture. figure_and_form: Sophisticated form suggesting power through subtle feminine grace. skin_micro_details: Premium high-resolution skin texture with executive-level retouching, maintaining authentic pores and natural radiance while perfecting professional appearance. fabric_physics: Luxury corporate fabric with precise tailoring and strategic draping. Professional draping with subtle body-conscious elements. material_properties: Luxury materials from environment: Acoustic panels with designer finish, Polished concrete industrial floors, Luxury velvet curtains and seating. Executive-level fabrics with premium light interaction and tactile richness.`
  },

  {
    id: 'corp-005',
    name: 'Screening Room Elegance - Asymmetric Curves',
    category: 'corporate',
    intimacyLevel: 7,
    aspectRatio: '4:5',
    safetyTolerance: 6,
    prompt: `Corporate power photography in revealing style. Intimacy 7/10, submissive power dynamic. subject: variant: Elite Indian artistic model (height 5'7") specializing in modern concept films, private editorial art, and expressive erotic-art photography. Possesses an exceptionally curvaceous figure (bust 40DD", waist 26", hips 44") with pronounced wide hips and dramatic curves. Athletic sculptural form with strong shoulders and defined waist. Luminous dusky complexion with warm undertones. Sharp angular bone structure, magnetic penetrating gaze, strong jawline. creative presence. pose: Resting on hands and knees with weight shifted to one side, creating asymmetrical curves that highlight the 44-inch hip span, head tilted in contemplative gaze. hair_color: jet black, hair_style: Elegant flowing style with soft framing, skin_finish: Luminous professional finish with natural radiance, hand_and_nail_details: Executive manicure with impeccable attention to detail, tattoos: none, piercings: none, body_art: none, nail_art: Bold red executive polish, high_heels: Designer stiletto power heels. wardrobe: A minimalist foundation piece designed with a single, continuous line of fabric, creating a graphic and almost invisible effect against the form. environment: Executive screening room with luxury seating. lighting: Professional studio-quality lighting. camera: focal_length: 35mm, aperture: f/2.8, distance: 3 m, angle: Side profile angle perfectly capturing the dramatic waist-to-hip ratio, framing: Environmental composition showing the elegant pose within luxury setting. color_grade: Rich dramatic tones with sensual warmth. style: Corporate fine-art photography celebrating feminine executive power. creative sensuality style. Power level 8/10. Creative industry glamour with backstage access to power. Where artistic vision meets commercial empire, high-fashion meets high-stakes. quality: Ultra-high-end 8K corporate fashion photography with impeccable detail, professional retouching maintaining authentic texture. figure_and_form: Sophisticated form suggesting power through subtle feminine grace. skin_micro_details: Premium high-resolution skin texture with executive-level retouching, maintaining authentic pores and natural radiance while perfecting professional appearance. fabric_physics: Luxury corporate fabric with precise tailoring and strategic draping. Professional draping with subtle body-conscious elements. material_properties: Luxury materials from environment: Acoustic panels with designer finish, Polished concrete industrial floors, Luxury velvet curtains and seating. Executive-level fabrics with premium light interaction and tactile richness.`
  },

  // ============================================================================
  // ARTISTIC STUDIO SERIES (Intimacy 7-9)
  // ============================================================================
  {
    id: 'art-001',
    name: 'Studio Workshop',
    category: 'artistic',
    intimacyLevel: 8,
    aspectRatio: '4:5',
    safetyTolerance: 6,
    prompt: `Artistic studio photography in fine-art style. Intimacy 8/10, creative vulnerability. subject: Indian artist model (height 5'6") with bohemian creative energy. Curvaceous form (bust 38D", waist 28", hips 40"). Dusky warm complexion. Expressive artistic features, distant contemplative gaze. pose: Sitting on workshop stool surrounded by materials. hair_color: black with warm highlights, hair_style: Messy artistic bun with loose tendrils, skin_finish: Natural authentic matte, hand_and_nail_details: Paint-stained hands with short nails, tattoos: none, piercings: none, body_art: none, nail_art: Natural unpolished, high_heels: Not visible. wardrobe: Oversized linen shirt partially unbuttoned, minimal foundation beneath, raw aesthetic. environment: Artist studio with canvases and natural light. lighting: Soft north-facing window light creating gentle shadows. camera: focal_length: 50mm, aperture: f/2.2, distance: 2 m, angle: Eye level documentary style, framing: Medium shot emphasizing creative process. color_grade: Muted natural tones with warm skin highlights. style: Documentary fine-art portraiture. Contemporary artist aesthetic. quality: 8K natural light photography with authentic imperfection. figure_and_form: Natural artistic form without commercial polish. skin_micro_details: Authentic texture with visible pores and natural beauty. fabric_physics: Worn linen with natural wrinkles and lived-in drape. material_properties: Raw canvas, wooden easels, natural fiber fabrics, paint-splattered floors.`
  },

  {
    id: 'art-002',
    name: 'Gallery Opening',
    category: 'artistic',
    intimacyLevel: 7,
    aspectRatio: '4:5',
    safetyTolerance: 5,
    prompt: `Fine-art gallery photography in conceptual style. Intimacy 7/10, artistic confidence. subject: Indian contemporary artist model (height 5'8") with avant-garde presence. Athletic form (bust 36B", waist 26", hips 37"). Fair luminous complexion. Strong architectural features, direct artistic gaze. pose: Leaning against white gallery wall. hair_color: jet black, hair_style: Sleek minimal styling with geometric precision, skin_finish: Natural with subtle luminosity, hand_and_nail_details: Minimalist artistic aesthetic, tattoos: none, piercings: none, body_art: none, nail_art: Black matte polish, high_heels: Minimalist leather sandals. wardrobe: Architectural draped fabric creating sculptural form, deconstructed design. environment: White cube gallery with track lighting and abstract art. lighting: Museum-quality track lighting with architectural shadows. camera: focal_length: 35mm, aperture: f/2.8, distance: 3 m, angle: Straight-on documentary approach, framing: Full body with gallery context. color_grade: High-contrast with deep blacks and bright whites. style: Contemporary art photography with museum aesthetic. quality: 8K gallery-quality documentation. figure_and_form: Sculptural presence within architectural space. skin_micro_details: Natural texture with artistic authenticity. fabric_physics: Architectural fabric with gravity-defying drape. material_properties: White painted walls, polished concrete, track lighting, contemporary sculptures.`
  },

  {
    id: 'art-003',
    name: 'Photography Studio',
    category: 'artistic',
    intimacyLevel: 9,
    aspectRatio: '9:16',
    safetyTolerance: 6,
    prompt: `Photography studio behind-the-scenes in intimate documentary style. Intimacy 9/10, artistic exploration. subject: Indian photography muse (height 5'7") with captivating presence. Voluptuous form (bust 40DD", waist 27", hips 42"). Warm dusky complexion. Expressive features, vulnerable authentic gaze. pose: Seated on seamless paper backdrop. hair_color: black, hair_style: Natural air-dried waves with raw texture, skin_finish: Authentic natural without manipulation, hand_and_nail_details: Natural relaxed positioning, tattoos: none, piercings: none, body_art: none, nail_art: Natural bare nails, high_heels: Not visible. wardrobe: Draped silk fabric creating form-following lines, minimalist coverage. environment: Photography studio with lighting equipment visible. lighting: Single key light with dramatic chiaroscuro effect. camera: focal_length: 85mm, aperture: f/1.4, distance: 2 m, angle: Eye level intimate connection, framing: Vertical full body emphasizing form and studio. color_grade: Dramatic black and white with rich tonal range. style: Behind-the-scenes documentary celebrating creative process. quality: 8K with raw authentic aesthetic. figure_and_form: Natural curves celebrated as sculptural elements. skin_micro_details: Unretouched natural texture with visible authenticity. fabric_physics: Silk responding to body movement and gravity. material_properties: White seamless paper, black flags, silver reflectors, studio equipment.`
  },

  // ============================================================================
  // EDITORIAL FASHION SERIES (Intimacy 6-8)
  // ============================================================================
  {
    id: 'edit-001',
    name: 'Vogue Editorial',
    category: 'editorial',
    intimacyLevel: 7,
    aspectRatio: '4:5',
    safetyTolerance: 5,
    prompt: `High-fashion editorial photography in Vogue style. Intimacy 7/10, editorial confidence. subject: Indian supermodel (height 5'10") with runway presence. Statuesque athletic form (bust 34B", waist 24", hips 36"). Luminous fair complexion. Strong editorial features, powerful distant gaze. pose: Dynamic standing with architectural posture. hair_color: jet black, hair_style: Editorial high fashion with volume and movement, skin_finish: Editorial perfection with natural glow, hand_and_nail_details: High-fashion manicure, tattoos: none, piercings: none, body_art: none, nail_art: Glossy crimson editorial polish, high_heels: Architectural couture heels. wardrobe: Avant-garde architectural piece with geometric cutouts, haute couture construction. environment: Minimalist white studio with stark shadows. lighting: Dramatic fashion lighting with hard shadows and highlights. camera: focal_length: 70mm, aperture: f/4.0, distance: 4 m, angle: Slight low angle for editorial power, framing: Full body with negative space. color_grade: High-contrast editorial with punchy colors. style: Contemporary Vogue editorial celebrating high fashion. quality: 8K editorial photography with magazine perfection. figure_and_form: Editorial athletic perfection with runway confidence. skin_micro_details: High-end retouching maintaining editorial realism. fabric_physics: Couture construction with architectural integrity. material_properties: Seamless white cyclorama, professional studio equipment.`
  },

  {
    id: 'edit-002',
    name: 'Bazaar Intimacy',
    category: 'editorial',
    intimacyLevel: 8,
    aspectRatio: '4:5',
    safetyTolerance: 6,
    prompt: `Editorial fashion photography in Harper's Bazaar intimate style. Intimacy 8/10, editorial sensuality. subject: Indian editorial model (height 5'8") with magazine presence. Feminine curves (bust 36C", waist 26", hips 38"). Dusky warm complexion. Modern beauty with magazine appeal, inviting gaze. pose: Reclining on designer furniture. hair_color: dark brown, hair_style: Tousled editorial waves with natural movement, skin_finish: Editorial natural with luminous quality, hand_and_nail_details: Magazine-worthy manicure, tattoos: none, piercings: none, body_art: none, nail_art: Nude editorial polish, high_heels: Designer stilettos. wardrobe: Deconstructed couture piece with strategic coverage, editorial minimalism. environment: Luxury penthouse with designer furniture. lighting: Natural window light with editorial softness. camera: focal_length: 85mm, aperture: f/2.0, distance: 3 m, angle: Slight high angle for editorial vulnerability, framing: Three-quarter body with luxury context. color_grade: Warm editorial tones with rich depth. style: Harper's Bazaar intimate editorial celebrating feminine power. quality: 8K editorial with luxury magazine finish. figure_and_form: Editorial curves with magazine sophistication. skin_micro_details: Editorial retouching with natural authenticity. fabric_physics: Couture deconstruction with intentional draping. material_properties: Italian leather furniture, cashmere throws, polished marble.`
  },

  // ============================================================================
  // ARCHITECTURAL FORM SERIES (Intimacy 7-9)
  // ============================================================================
  {
    id: 'arch-001',
    name: 'Geometric Study',
    category: 'architectural',
    intimacyLevel: 8,
    aspectRatio: '1:1',
    safetyTolerance: 6,
    prompt: `Architectural form study in conceptual photography style. Intimacy 8/10, geometric exploration. subject: Indian form study model (height 5'7") with sculptural presence. Balanced proportions (bust 36C", waist 27", hips 38"). Luminous skin with neutral undertones. Classical features, contemplative distant gaze. pose: Geometric positioning creating architectural lines. hair_color: black, hair_style: Pulled back to emphasize form and structure, skin_finish: Natural matte emphasizing shadow play, hand_and_nail_details: Precise geometric hand placement, tattoos: none, piercings: none, body_art: none, nail_art: Matte nude minimalist, high_heels: Not visible. wardrobe: Architectural wire-frame piece creating negative space, sculptural design. environment: White architectural space with geometric shadows. lighting: Directional architectural lighting creating sharp shadows and geometry. camera: focal_length: 50mm, aperture: f/8, distance: 3 m, angle: Straight-on architectural documentation, framing: Square format emphasizing geometric composition. color_grade: High-contrast black and white with graphic quality. style: Architectural photography celebrating form as sculpture. quality: 8K with absolute sharpness and geometric precision. figure_and_form: Body as architectural element within geometric composition. skin_micro_details: Natural texture with geometric shadow patterns. fabric_physics: Wire-frame construction maintaining architectural integrity. material_properties: White architectural surfaces, geometric shadows, negative space.`
  },

  {
    id: 'arch-002',
    name: 'Brutalist Composition',
    category: 'architectural',
    intimacyLevel: 9,
    aspectRatio: '4:5',
    safetyTolerance: 6,
    prompt: `Brutalist architecture photography in fine-art style. Intimacy 9/10, architectural contrast. subject: Indian architectural muse (height 5'9") with powerful presence. Dramatic curves (bust 38D", waist 26", hips 40"). Fair luminous complexion. Strong features contrasting architectural hardness, direct powerful gaze. pose: Standing against concrete brutalist wall. hair_color: jet black, hair_style: Severe architectural styling with geometric precision, skin_finish: Natural with architectural lighting effects, hand_and_nail_details: Strong architectural hand positioning, tattoos: none, piercings: none, body_art: none, nail_art: Black architectural polish, high_heels: Architectural platform heels. wardrobe: Minimal geometric piece creating stark contrast with concrete, sculptural minimalism. environment: Brutalist concrete architecture with raw textures. lighting: Harsh architectural sunlight creating dramatic shadows. camera: focal_length: 35mm, aperture: f/5.6, distance: 3 m, angle: Eye level architectural documentation, framing: Full body with brutalist architectural context. color_grade: Stark contrast with desaturated tones and rich blacks. style: Architectural fine-art celebrating softness against hardness. quality: 8K architectural photography with textural detail. figure_and_form: Feminine curves contrasting angular architecture. skin_micro_details: Natural skin texture contrasting rough concrete. fabric_physics: Minimal fabric creating geometric lines. material_properties: Raw poured concrete, exposed aggregate, geometric shadows.`
  },

  // ============================================================================
  // CREATIVE INDUSTRY SERIES (Intimacy 7-8)
  // ============================================================================
  {
    id: 'creative-001',
    name: 'Fashion Atelier',
    category: 'creative',
    intimacyLevel: 7,
    aspectRatio: '4:5',
    safetyTolerance: 5,
    prompt: `Fashion atelier photography in creative documentary style. Intimacy 7/10, designer workspace. subject: Indian fashion designer model (height 5'7") with creative elegance. Graceful form (bust 36B", waist 25", hips 37"). Fair complexion with natural beauty. Expressive creative features, focused artistic gaze. pose: Working at design table with fabric. hair_color: dark brown, hair_style: Elegant updo with creative looseness, skin_finish: Natural professional, hand_and_nail_details: Creative professional manicure, tattoos: none, piercings: none, body_art: none, nail_art: Elegant nude with subtle art, high_heels: Designer flats. wardrobe: Draped couture sample creating elegant coverage, design in progress. environment: Fashion atelier with fabrics and dress forms. lighting: Natural atelier light with architectural quality. camera: focal_length: 50mm, aperture: f/2.8, distance: 3 m, angle: Slight high angle documentary, framing: Medium shot showing creative process and environment. color_grade: Natural with rich fabric colors and warm skin tones. style: Creative industry documentary celebrating fashion artistry. quality: 8K creative documentary with authentic atmosphere. figure_and_form: Designer elegance with creative confidence. skin_micro_details: Professional natural texture with authentic beauty. fabric_physics: Couture fabrics in various stages of construction. material_properties: Luxury fabrics, dress forms, cutting tables, natural textiles.`
  },

  {
    id: 'creative-002',
    name: 'Film Set Glamour',
    category: 'creative',
    intimacyLevel: 8,
    aspectRatio: '16:9',
    safetyTolerance: 6,
    prompt: `Film production photography in cinematic style. Intimacy 8/10, behind-the-scenes glamour. subject: Indian film creative (height 5'8") with cinematic presence. Curvaceous form (bust 38C", waist 27", hips 40"). Dusky warm complexion with cinematic glow. Expressive features, cinematic distant gaze. pose: Seated in director's chair. hair_color: jet black, hair_style: Glamorous waves with cinematic volume, skin_finish: Cinematic natural glow, hand_and_nail_details: Film industry polish, tattoos: none, piercings: none, body_art: none, nail_art: Classic red cinema polish, high_heels: Classic pumps. wardrobe: Architectural draped piece suggesting costume design, cinematic aesthetic. environment: Film set with lighting rigs and equipment. lighting: Cinematic three-point lighting creating dramatic depth. camera: focal_length: 35mm, aperture: f/2.8, distance: 4 m, angle: Cinematic eye level, framing: Wide shot showing film production environment. color_grade: Cinematic color grading with rich shadows and warm highlights. style: Behind-the-scenes film production celebrating creative industry. quality: 8K cinematic photography with film-like depth. figure_and_form: Cinematic glamour with authentic presence. skin_micro_details: Cinematic lighting revealing natural texture. fabric_physics: Costume-quality draping with intentional design. material_properties: Film equipment, director's chairs, lighting rigs, cinematic atmosphere.`
  },

  // ============================================================================
  // EXPERIMENTAL MODE SERIES - SAFE TIER (Intimacy 5-6)
  // Professional editorial concepts with corporate/editorial sophistication
  // ============================================================================
  {
    id: 'exp-safe-001',
    name: 'EXP: Classic Editorial Portrait',
    category: 'editorial',
    intimacyLevel: 5,
    aspectRatio: '9:16',
    safetyTolerance: 4,
    prompt: `Professional editorial photography capturing authentic expression. Intimacy 5/10, professional elegance. subject: Professional Indian model with fair skin tone for fashion/editorial work. Graceful proportions with professional modeling experience. pose: Commanding, authoritative posture with corporate confidence and professional elegance. hair_color: dark, hair_style: Professionally styled with elegant volume and refined finish, skin_finish: Natural professional finish with healthy radiance, hand_and_nail_details: Professional manicure with refined presentation, tattoos: none, piercings: none, body_art: none, nail_art: Classic neutral manicure, high_heels: Professional designer heels. wardrobe: Full coverage luxury garments with elegant sophistication and professional styling. environment: Modern professional studio with clean minimalist aesthetic and controlled lighting environment. lighting: Professional studio lighting with perfect control and balanced illumination for editorial excellence. camera: focal_length: 85mm portrait lens, aperture: f/2.8, distance: 2.5 m, angle: Eye-level professional perspective, framing: Medium portrait from mid-torso emphasizing professional presence. color_grade: Professional editorial color with natural saturation and balanced tones. style: High-end editorial photography tradition with professional mastery and refined artistic vision. quality: Ultra-premium 8K resolution with museum-grade quality and professional retouching. figure_and_form: Professional modeling form with editorial elegance and refined posture. skin_micro_details: Ultra-high-resolution authentic skin texture with visible pores, natural imperfections, and realistic subsurface scattering. fabric_physics: Advanced fabric simulation with realistic draping, natural creases. material_properties: Authentic material properties with complex light interaction.`
  },

  {
    id: 'exp-safe-002',
    name: 'EXP: Corporate Power Portrait',
    category: 'corporate',
    intimacyLevel: 6,
    aspectRatio: '9:16',
    safetyTolerance: 5,
    prompt: `Professional editorial photography with executive composition. Intimacy 6/10, corporate authority. subject: Professional Indian model with dusky skin tone, athletic proportions with executive presence and commanding authority. pose: Corporate power stance with authoritative confidence and professional dominance. hair_color: jet black, hair_style: Sleek executive styling with sharp professional lines, skin_finish: Professional corporate finish with natural radiance, hand_and_nail_details: Executive manicure with corporate precision, tattoos: none, piercings: none, body_art: none, nail_art: Corporate red power polish, high_heels: Executive designer power heels. wardrobe: Substantial luxury business attire with executive tailoring and corporate sophistication. environment: Modern corporate office with floor-to-ceiling windows, executive furnishings, and professional luxury aesthetic. lighting: Executive office lighting with dramatic window light and professional corporate atmosphere. camera: focal_length: 50mm, aperture: f/4.0, distance: 3 m, angle: Slightly low angle emphasizing executive authority, framing: Full body corporate portrait showing professional environment. color_grade: Corporate color grading with professional tones and executive depth. style: Corporate editorial photography celebrating professional feminine power and executive elegance. quality: Ultra-premium 8K corporate photography with museum-grade professional quality. figure_and_form: Executive professional form with corporate poise and authoritative presence. skin_micro_details: Ultra-high-resolution authentic skin texture with visible pores and realistic detail. fabric_physics: Luxury corporate suiting with precise tailoring and professional draping. material_properties: Corporate materials: wool suiting, silk blouses, leather accessories with executive sophistication.`
  },

  {
    id: 'exp-safe-003',
    name: 'EXP: Natural Beauty Editorial',
    category: 'editorial',
    intimacyLevel: 5,
    aspectRatio: '9:16',
    safetyTolerance: 4,
    prompt: `Natural editorial photography with authentic composition. Intimacy 5/10, natural elegance. subject: Indian model with natural allure and authentic beauty, healthy proportions with organic grace. pose: Natural confident stance with authentic expression and organic elegance. hair_color: dark, hair_style: Natural flowing style with organic volume and soft movement, skin_finish: Natural dewy finish with healthy authentic glow, hand_and_nail_details: Natural hand placement with organic grace, tattoos: none, piercings: none, body_art: none, nail_art: Natural neutral nails, high_heels: not visible. wardrobe: Elegant natural fabrics with organic draping and sophisticated simplicity. environment: Natural light studio with soft diffusion and organic atmosphere. lighting: Soft natural window light with gentle wrap-around illumination and organic shadows. camera: focal_length: 85mm f/1.8, aperture: f/2.0, distance: 2 m, angle: Natural eye-level connection, framing: Intimate medium shot with natural framing. color_grade: Warm natural tones with organic color and soft highlights. style: Natural beauty photography with authentic elegance and organic sophistication. quality: Premium 8K natural photography with authentic texture and organic quality. figure_and_form: Natural feminine form with organic grace and authentic beauty. skin_micro_details: Ultra-high-resolution authentic skin texture with natural imperfections. fabric_physics: Natural fabric flow with organic draping and soft movement. material_properties: Natural materials with soft light absorption and organic texture.`
  },

  // ============================================================================
  // EXPERIMENTAL MODE SERIES - MODERATE TIER (Intimacy 7-8)
  // High fashion seductive editorial with sophisticated reveals
  // ============================================================================
  {
    id: 'exp-mod-001',
    name: 'EXP: High Fashion Seduction',
    category: 'editorial',
    intimacyLevel: 7,
    aspectRatio: '9:16',
    safetyTolerance: 6,
    prompt: `Intimate editorial photography creating emotional connection. Intimacy 7/10, magnetic allure. subject: Indian Seductress with bombshell hourglass figure, confident sensual presence, and boudoir specialist expertise. pose: Seductive, intentional positioning conveying magnetic allure with confident body language and editorial elegance. hair_color: jet black, hair_style: Glamorous voluminous styling with sensual movement, skin_finish: Luminous dewy finish with radiant glow, hand_and_nail_details: Seductive hand placement with elegant gesture, tattoos: none, piercings: none, body_art: none, nail_art: Bold red seductive polish, high_heels: Designer stiletto heels. wardrobe: Tasteful partial coverage with editorial sophistication, revealing elegance with high fashion sensuality. environment: Luxury boutique hotel suite with designer furnishings and intimate atmosphere. lighting: Warm intimate lighting with romantic atmosphere and seductive shadows. camera: focal_length: 85mm f/1.4, aperture: f/1.8, distance: 2 m, angle: Slightly low angle with seductive perspective, framing: Medium-close composition emphasizing curves and allure. color_grade: Warm romantic tones with sensual depth and rich highlights. style: High fashion seduction photography with editorial excellence and confident sensuality. quality: Ultra-premium 8K with exceptional clarity and professional seductive quality. figure_and_form: Hourglass bombshell form with confident curves and seductive elegance. skin_micro_details: Ultra-high-resolution authentic skin texture with realistic subsurface scattering. fabric_physics: Fashion fabric with elegant partial draping and seductive reveals. material_properties: Luxury fashion materials with sensual light interaction and rich texture.`
  },

  {
    id: 'exp-mod-002',
    name: 'EXP: Confident Allure Portrait',
    category: 'editorial',
    intimacyLevel: 7,
    aspectRatio: '9:16',
    safetyTolerance: 6,
    prompt: `Magnetic intimate photography with confident composition. Intimacy 7/10, seductive confidence. subject: Indian model with seductive presence, curvaceous proportions with magnetic confidence. pose: Magnetic presence with intentional body language expressing confident allure and seductive elegance. hair_color: jet black, hair_style: Styled with dramatic volume and seductive flow, skin_finish: Radiant luminous finish with seductive glow, hand_and_nail_details: Confident hand gesture with seductive refinement, tattoos: none, piercings: none, body_art: none, nail_art: Bold glamorous polish, high_heels: Sharp designer heels. wardrobe: Moderate elegant coverage with sophisticated reveals and confident sensual styling. environment: Luxury penthouse with city views and intimate sophisticated atmosphere. lighting: Dramatic rim lighting with seductive shadows and confident illumination. camera: focal_length: 50mm, aperture: f/2.8, distance: 2.5 m, angle: Eye-level magnetic connection, framing: Full body showing confident seductive presence. color_grade: Rich dramatic tones with seductive warmth and confident depth. style: Confident allure photography with editorial seduction and magnetic sophistication. quality: Premium 8K with seductive clarity and confident professional quality. figure_and_form: Confident curvaceous form with magnetic seductive elegance. skin_micro_details: Ultra-high-resolution authentic skin texture with museum-grade detail. fabric_physics: Elegant moderate fabric with sophisticated draping and confident reveals. material_properties: Luxury materials with seductive specular highlights and rich interaction.`
  },

  {
    id: 'exp-mod-003',
    name: 'EXP: Fashion Forward Sensuality',
    category: 'editorial',
    intimacyLevel: 8,
    aspectRatio: '9:16',
    safetyTolerance: 6,
    prompt: `Professional editorial photography with fashion-forward composition. Intimacy 8/10, runway sensuality. subject: Indian editorial model with fashion expertise, statuesque proportions with runway confidence. pose: Fashion-forward power stance with seductive confidence and editorial poise. hair_color: jet black, hair_style: High fashion styling with editorial sophistication, skin_finish: Professional editorial finish with fashion radiance, hand_and_nail_details: Editorial hand positioning with fashion refinement, tattoos: none, piercings: none, body_art: none, nail_art: Fashion editorial polish, high_heels: Runway designer heels. wardrobe: High fashion editorial pieces with sophisticated partial coverage and runway sensuality. environment: Fashion studio with editorial backdrop and high-fashion atmosphere. lighting: Dramatic fashion lighting with editorial precision and seductive highlights. camera: focal_length: 70mm, aperture: f/4.0, distance: 3 m, angle: Fashion editorial perspective, framing: Full editorial composition with fashion presence. color_grade: High fashion color with editorial sophistication and seductive richness. style: Fashion-forward editorial with confident sensuality and runway excellence. quality: Ultra-premium 8K fashion photography with editorial perfection. figure_and_form: Statuesque fashion form with editorial poise and seductive confidence. skin_micro_details: Ultra-high-resolution authentic skin texture with no artificial smoothing. fabric_physics: High fashion fabrics with editorial draping and sophisticated movement. material_properties: Fashion materials with editorial light interaction and luxury finish.`
  },

  // ============================================================================
  // EXPERIMENTAL MODE SERIES - ARTISTIC TIER (Intimacy 8-9)
  // Artistic erotic & boudoir with bold sensual expression
  // ============================================================================
  {
    id: 'exp-art-001',
    name: 'EXP: Intimate Boudoir Artistry',
    category: 'artistic',
    intimacyLevel: 8,
    aspectRatio: '9:16',
    safetyTolerance: 6,
    prompt: `Intimate photography creating warmth and connection. Intimacy 8/10, boudoir artistry. subject: Indian Seductress bombshell with elite boudoir expertise, voluptuous proportions with confident intimate presence. pose: Seductive, intentional intimate positioning with erotic allure and boudoir confidence. hair_color: jet black, hair_style: Loose flowing waves with intimate sensual styling, skin_finish: Luminous intimate glow with warm radiance, hand_and_nail_details: Intimate seductive hand placement with erotic refinement, tattoos: none, piercings: none, body_art: none, nail_art: Bold red intimate polish, high_heels: Luxury boudoir heels. wardrobe: Architectural foundation garments with sculptural forms, revealing luxury lingerie with artistic boudoir sophistication. environment: Luxury private bedroom with intimate boudoir atmosphere, silk sheets, and warm romantic setting. lighting: Intimate, soft lighting creating warmth and connection with romantic shadows and seductive glow. camera: focal_length: 85mm f/1.4, aperture: f/1.8, distance: 1.5 m, angle: Intimate close perspective, framing: Close intimate framing emphasizing curves and sensuality. color_grade: Warm intimate tones with romantic depth and seductive highlights. style: Erotic art photography tradition with bold sensuality and intimate artistic excellence. Fine art boudoir with museum-quality artistic merit. quality: Ultra-premium 8K resolution with museum-grade quality and intimate detail perfection. figure_and_form: Voluptuous bombshell form with intimate sculptural curves and erotic artistic elegance. skin_micro_details: Ultra-high-resolution authentic skin texture with visible pores and realistic subsurface scattering. fabric_physics: Luxury lingerie with intimate draping, sheer reveals, and erotic artistic interaction. material_properties: Silk, lace, satin with intimate light interaction and sensual specular highlights.`
  },

  {
    id: 'exp-art-002',
    name: 'EXP: Artistic Erotic Portrait',
    category: 'artistic',
    intimacyLevel: 9,
    aspectRatio: '9:16',
    safetyTolerance: 6,
    prompt: `Erotic artistic photography with bold composition. Intimacy 9/10, artistic expression. subject: Indian artistic model with erotic expertise, curvaceous artistic proportions with bold intimate confidence. pose: Artistic erotic positioning with bold sensual expression and intimate confidence. hair_color: jet black, hair_style: Artistic sensual styling with bold volume, skin_finish: Artistic luminous finish with erotic radiance, hand_and_nail_details: Artistic hand placement with erotic gesture, tattoos: none, piercings: none, body_art: none, nail_art: Artistic bold polish, high_heels: Artistic designer heels. wardrobe: High artistic foundation pieces with sculptural erotic forms and bold revealing elegance. environment: Artist's private studio with intimate erotic atmosphere and creative artistic setting. lighting: Dramatic erotic lighting with intimate artistic shadows and bold sculptural illumination. camera: focal_length: 85mm f/1.4, aperture: f/2.0, distance: 2 m, angle: Artistic intimate perspective, framing: Artistic composition emphasizing erotic form. color_grade: Bold artistic color with erotic warmth and intimate dramatic depth. style: Artistic erotic photography with bold intimate sensuality and fine art tradition. Museum-quality erotic art excellence. quality: Museum-quality 8K fine-art photography with erotic artistic perfection. figure_and_form: Curvaceous artistic form with erotic sculptural elegance and bold intimate confidence. skin_micro_details: Ultra-high-resolution authentic skin texture with museum-grade detail. fabric_physics: Artistic foundation fabrics with erotic reveals and sculptural intimate draping. material_properties: Luxury artistic materials with erotic light interaction and intimate specular richness.`
  },

  {
    id: 'exp-art-003',
    name: 'EXP: Sensual Art Photography',
    category: 'artistic',
    intimacyLevel: 8,
    aspectRatio: '9:16',
    safetyTolerance: 6,
    prompt: `Sensual artistic photography with intimate aesthetic. Intimacy 8/10, fine art elegance. subject: Indian sensual artist model with intimate expertise, graceful sensual proportions with artistic confidence. pose: Sensual artistic pose with intimate expression and elegant erotic grace. hair_color: dark, hair_style: Sensual artistic flow with intimate styling, skin_finish: Sensual artistic glow with intimate luminosity, hand_and_nail_details: Sensual artistic gesture with intimate refinement, tattoos: none, piercings: none, body_art: none, nail_art: Artistic sensual polish, high_heels: Artistic sensual heels. wardrobe: Artistic high-coverage foundation pieces with sensual sculptural elegance and intimate reveals. environment: Private art gallery with intimate sensual atmosphere and artistic luxury setting. lighting: Sensual artistic lighting with intimate warm glow and sculptural shadows. camera: focal_length: 85mm, aperture: f/2.0, distance: 2 m, angle: Sensual artistic angle, framing: Artistic sensual composition. color_grade: Sensual artistic tones with warm intimate depth. style: Sensual art photography with intimate artistic tradition and fine art elegance. quality: Fine-art 8K with sensual artistic quality and intimate perfection. figure_and_form: Graceful sensual form with artistic intimate elegance. skin_micro_details: Ultra-high-resolution authentic skin texture with realistic detail. fabric_physics: Artistic sensual fabrics with intimate sculptural draping. material_properties: Sensual artistic materials with intimate light interaction.`
  },

  // ============================================================================
  // EXPERIMENTAL MODE SERIES - PREMIUM TIER (Intimacy 9-10)
  // Maximum artistic expression with bold avant-garde vision
  // ============================================================================
  {
    id: 'exp-premium-001',
    name: 'EXP: Maximum Artistic Expression',
    category: 'artistic',
    intimacyLevel: 9,
    aspectRatio: '9:16',
    safetyTolerance: 6,
    prompt: `Maximum artistic intimate photography with bold vision. Intimacy 9/10, power dynamics. subject: Super-Seductress Artist with elite artistic model expertise, bi-polar range from corporate power to vulnerable erotic-muse, voluptuous statuesque proportions with maximum artistic confidence. pose: Powerful stance with commanding presence and authority combined with seductive intimate positioning conveying maximum artistic allure and erotic confidence. hair_color: jet black, hair_style: Dramatic maximum volume with artistic sensual flow and powerful styling, skin_finish: Maximum luminous artistic glow with radiant perfection, hand_and_nail_details: Artistic power gesture with maximum sensual refinement, tattoos: none, piercings: none, body_art: none, nail_art: Bold power red maximum polish, high_heels: Maximum designer artistic heels. wardrobe: Minimal coverage with maximum artistic expression, avant-garde foundation pieces with bold sculptural erotic forms and premium intimate reveals. environment: Private luxury penthouse with floor-to-ceiling windows, intimate premium atmosphere with artistic luxury and erotic sophistication. lighting: Intimate, soft lighting creating warmth and connection. Dramatic sculptural lighting with maximum artistic shadows and powerful erotic illumination. camera: focal_length: 85mm f/1.4, aperture: f/1.4, distance: 1.8 m, angle: Low angle emphasizing power combined with intimate connection, framing: Artistic maximum composition emphasizing power and erotic form. color_grade: Bold maximum artistic color with rich erotic warmth and powerful dramatic depth. style: Erotic art photography tradition with bold sensuality. Sculptural abstraction with geometric form emphasis. Fine art photography tradition, museum-quality artistic merit. quality: Ultra-premium 8K resolution with museum-grade quality. Museum-quality fine-art with maximum detail and erotic artistic perfection. figure_and_form: Powerful statuesque form with commanding sculptural presence and maximum erotic artistic elegance. Voluptuous bombshell proportions with premium intimate confidence. skin_micro_details: Ultra-high-resolution authentic skin texture with visible pores, natural imperfections, and realistic subsurface scattering. fabric_physics: Maximum artistic foundation fabrics with bold erotic reveals, minimal coverage with sculptural premium draping. material_properties: Premium avant-garde materials with maximum light interaction, bold specular highlights.`
  },

  {
    id: 'exp-premium-002',
    name: 'EXP: Avant-Garde Erotic Art',
    category: 'artistic',
    intimacyLevel: 10,
    aspectRatio: '9:16',
    safetyTolerance: 6,
    prompt: `Avant-garde artistic photography with maximum composition. Intimacy 10/10, bold vision. subject: Super-Seductress Artist with maximum artistic range, elite erotic-muse expertise, statuesque proportions with avant-garde confidence. pose: Avant-garde erotic positioning with maximum artistic bold expression and premium intimate confidence. hair_color: jet black, hair_style: Avant-garde artistic maximum styling with bold dramatic presence, skin_finish: Premium artistic glow with maximum luminous radiance, hand_and_nail_details: Avant-garde artistic gesture with maximum erotic refinement, tattoos: none, piercings: none, body_art: none, nail_art: Bold avant-garde polish, high_heels: Premium avant-garde heels. wardrobe: Maximum artistic minimal coverage with avant-garde erotic sculptural forms and premium bold reveals. environment: Private avant-garde gallery with maximum intimate atmosphere and premium artistic luxury. lighting: Dramatic avant-garde lighting with maximum artistic erotic shadows and bold intimate illumination. camera: focal_length: 85mm f/1.4, aperture: f/1.4, distance: 1.5 m, angle: Avant-garde artistic intimate perspective, framing: Maximum artistic erotic composition. color_grade: Bold avant-garde artistic color with maximum erotic richness and premium dramatic depth. style: Avant-garde erotic art photography with maximum bold sensuality. Fine art photography tradition, museum-quality artistic merit. quality: Museum-quality 8K with maximum erotic artistic perfection and premium avant-garde excellence. figure_and_form: Statuesque avant-garde form with maximum erotic sculptural elegance and premium artistic confidence. skin_micro_details: Ultra-high-resolution authentic skin texture with visible pores and natural imperfections. fabric_physics: Avant-garde minimal fabrics with maximum erotic reveals and premium sculptural artistic draping. material_properties: Premium avant-garde materials with maximum erotic light interaction and bold artistic specular richness.`
  },

  {
    id: 'exp-premium-003',
    name: 'EXP: Fine Art Erotic Mastery',
    category: 'artistic',
    intimacyLevel: 10,
    aspectRatio: '9:16',
    safetyTolerance: 6,
    prompt: `Fine art erotic photography with museum-quality composition. Intimacy 10/10, artistic mastery. subject: Super-Seductress Artist with museum-quality expertise, maximum artistic erotic range, voluptuous statuesque proportions with fine art confidence. pose: Fine art erotic positioning with museum-quality artistic expression and maximum intimate boldness. hair_color: jet black, hair_style: Fine art styling with maximum artistic sophistication, skin_finish: Museum-quality luminous finish with fine art radiance, hand_and_nail_details: Fine art gesture with maximum artistic erotic refinement, tattoos: none, piercings: none, body_art: none, nail_art: Fine art bold polish, high_heels: Museum-quality designer heels. wardrobe: Maximum artistic minimal coverage with fine art erotic forms and museum-quality sculptural reveals. environment: Private museum-quality gallery with maximum intimate fine art atmosphere and premium luxury. lighting: Fine art erotic lighting with museum-quality artistic shadows and maximum intimate illumination. camera: focal_length: 85mm f/1.4, aperture: f/1.4, distance: 1.8 m, angle: Fine art intimate perspective, framing: Museum-quality erotic artistic composition. color_grade: Fine art color with maximum erotic artistic richness and museum-quality depth. style: Fine art erotic photography with museum-quality tradition and maximum bold sensuality. Premium artistic mastery. quality: Museum-quality 8K fine-art photography with maximum erotic perfection and premium artistic excellence. figure_and_form: Voluptuous fine art form with maximum erotic sculptural elegance and museum-quality confidence. skin_micro_details: Ultra-high-resolution authentic skin texture with visible pores, natural imperfections, and realistic subsurface scattering. fabric_physics: Fine art minimal fabrics with maximum erotic reveals and museum-quality sculptural draping. material_properties: Museum-quality materials with maximum erotic light interaction and fine art specular perfection.`
  }
];

/**
 * Helper function to get prompts by category
 */
export function getPromptsByCategory(category: FluxPromptTemplate['category']): FluxPromptTemplate[] {
  return fluxPromptLibrary.filter(p => p.category === category);
}

/**
 * Helper function to get prompts by intimacy level
 */
export function getPromptsByIntimacy(minLevel: number, maxLevel: number): FluxPromptTemplate[] {
  return fluxPromptLibrary.filter(p => p.intimacyLevel >= minLevel && p.intimacyLevel <= maxLevel);
}

/**
 * Helper function to get prompt by ID
 */
export function getPromptById(id: string): FluxPromptTemplate | undefined {
  return fluxPromptLibrary.find(p => p.id === id);
}

/**
 * Get recommended safety tolerance for intimacy level
 */
export function getRecommendedSafetyTolerance(intimacyLevel: number): number {
  if (intimacyLevel <= 4) return 3;
  if (intimacyLevel <= 6) return 4;
  if (intimacyLevel <= 8) return 5;
  return 6;
}
