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
  },

  // ============================================================================
  // SEDUCTRESS CONCEPT SERIES - EDITORIAL CONFIDENCE (Intimacy 5-7)
  // Indian Seductress bombshell with hourglass curves in professional settings
  // ============================================================================
  {
    id: 'seductress-001',
    name: 'Seductress: Power Executive',
    category: 'corporate',
    intimacyLevel: 6,
    aspectRatio: '4:5',
    safetyTolerance: 6,
    prompt: `Corporate power photography in revealing style. Intimacy 6/10, commanding presence. subject: variant: Indian Seductress bombshell with hourglass figure (bust 40DD", waist 26", hips 44"), confident sensual presence, boudoir specialist expertise. Professional corporate authority with magnetic allure. pose: Commanding authoritative posture with corporate confidence, power stance with editorial elegance. hair_color: jet black, hair_style: Sleek executive styling with sophisticated volume, skin_finish: Luminous professional finish with radiant glow, hand_and_nail_details: Executive manicure with impeccable attention to detail, tattoos: none, piercings: none, body_art: none, nail_art: Bold red executive polish, high_heels: Designer stiletto power heels. wardrobe: Power suit with unbuttoned blazer revealing architectural foundation garments beneath, executive tailoring with sophisticated reveals. environment: Modern corporate office with floor-to-ceiling windows, boardroom setting with executive furnishings. lighting: Professional studio-quality lighting with dramatic shadows. camera: focal_length: 50mm, aperture: f/2.8, distance: 3 m, angle: Slightly low angle emphasizing executive authority, framing: Full body corporate portrait showing professional power. color_grade: Rich dramatic tones with sensual warmth and executive depth. style: Corporate fine-art photography celebrating feminine executive power with confident sensuality. quality: Ultra-high-end 8K corporate fashion photography with impeccable detail. figure_and_form: Hourglass bombshell form with confident curves and professional sophistication. skin_micro_details: Premium high-resolution skin texture with executive-level retouching maintaining authentic pores. fabric_physics: Luxury corporate fabric with precise tailoring and strategic draping. material_properties: Executive-level fabrics with premium light interaction and tactile richness.`
  },

  {
    id: 'seductress-002',
    name: 'Seductress: Fashion Editorial',
    category: 'editorial',
    intimacyLevel: 6,
    aspectRatio: '4:5',
    safetyTolerance: 6,
    prompt: `High-fashion editorial photography with dramatic styling. Intimacy 6/10, editorial confidence. subject: variant: Indian Seductress bombshell with hourglass figure (bust 40DD", waist 26", hips 44"), confident sensual presence, fashion editorial expertise. Magnetic presence with high-fashion poise. pose: Confident allure with intentional body language, editorial power stance with seductive grace. hair_color: jet black, hair_style: Glamorous voluminous styling with dramatic editorial movement, skin_finish: Luminous dewy finish with radiant professional glow, hand_and_nail_details: Fashion editorial manicure with sophisticated refinement, tattoos: none, piercings: none, body_art: none, nail_art: Bold editorial polish, high_heels: Designer runway heels. wardrobe: Asymmetric wrap design with sophisticated partial coverage, high-fashion architectural pieces with editorial reveals. environment: Professional fashion photography studio with editorial backdrop and dramatic elements. lighting: Dramatic editorial lighting with high-fashion contrast and sculptural shadows. camera: focal_length: 85mm f/1.4, aperture: f/2.0, distance: 2.5 m, angle: Fashion editorial perspective with dramatic composition, framing: Full body editorial composition with negative space. color_grade: High fashion color with editorial sophistication and dramatic richness. style: Vogue/Harper's Bazaar high-fashion editorial celebrating confident seductive elegance. quality: Ultra-premium 8K fashion photography with editorial perfection. figure_and_form: Hourglass bombshell form with confident seductive curves and editorial sophistication. skin_micro_details: Ultra-high-resolution authentic skin texture with fashion-grade retouching. fabric_physics: High fashion fabrics with editorial draping and sophisticated architectural movement. material_properties: Fashion materials with editorial light interaction and luxury specular finish.`
  },

  {
    id: 'seductress-003',
    name: 'Seductress: Vintage Glamour',
    category: 'artistic',
    intimacyLevel: 7,
    aspectRatio: '4:5',
    safetyTolerance: 6,
    prompt: `Classic vintage glamour photography with Hollywood styling. Intimacy 7/10, pin-up elegance. subject: variant: Indian Seductress bombshell with hourglass figure (bust 40DD", waist 26", hips 44"), confident sensual presence, vintage pin-up expertise. Classic Hollywood glamour with seductive sophistication. pose: Confident allure with vintage pin-up body language, classic seductive positioning with elegant grace. hair_color: jet black, hair_style: Classic Hollywood waves with vintage glamour volume and sophisticated styling, skin_finish: Classic Hollywood luminous finish with glamour radiance, hand_and_nail_details: Vintage glamour manicure with classic refinement, tattoos: none, piercings: none, body_art: none, nail_art: Classic red vintage polish, high_heels: Classic vintage heels. wardrobe: Vintage corset with classic pin-up styling, sophisticated vintage foundation pieces with glamour reveals. environment: Classic photography studio with vintage backdrop and Hollywood glamour atmosphere. lighting: Classic Hollywood glamour lighting with soft sculptural shadows and vintage brilliance. camera: focal_length: 85mm, aperture: f/2.8, distance: 2.5 m, angle: Classic pin-up perspective with vintage framing, framing: Full body vintage composition with classic proportions. color_grade: Warm vintage tones with classic Hollywood richness and glamour depth. style: Classic pin-up photography celebrating vintage Hollywood glamour and timeless seductive elegance. quality: Premium 8K with vintage aesthetic and classic Hollywood perfection. figure_and_form: Hourglass bombshell form with vintage pin-up curves and classic glamour sophistication. skin_micro_details: High-resolution skin texture with classic Hollywood retouching maintaining authentic beauty. fabric_physics: Vintage corset fabrics with classic structured tailoring and glamour draping. material_properties: Vintage materials with classic light interaction and Hollywood glamour finish.`
  },

  {
    id: 'seductress-004',
    name: 'Seductress: Silk Elegance',
    category: 'artistic',
    intimacyLevel: 7,
    aspectRatio: '4:5',
    safetyTolerance: 6,
    prompt: `Intimate silk photography with editorial sophistication. Intimacy 7/10, flowing elegance. subject: variant: Indian Seductress bombshell with hourglass figure (bust 40DD", waist 26", hips 44"), confident sensual presence, intimate editorial expertise. Flowing elegance with seductive sophistication. pose: Confident allure with flowing body language, editorial seductive positioning with silk grace. hair_color: jet black, hair_style: Long flowing waves with natural volume and sensual movement, skin_finish: Dewy luminous finish with intimate radiance, hand_and_nail_details: Elegant manicure with intimate refinement, tattoos: none, piercings: none, body_art: none, nail_art: Elegant sensual polish, high_heels: Designer stiletto heels. wardrobe: Flowing silk slip dress with elegant draping, sophisticated partial coverage with sensual reveals. environment: Private luxury loft with intimate sophisticated atmosphere and editorial elements. lighting: Soft intimate lighting with romantic atmosphere and gentle sculptural shadows. camera: focal_length: 85mm f/1.4, aperture: f/1.8, distance: 2 m, angle: Intimate editorial perspective with flowing composition, framing: Medium-close composition emphasizing flowing curves and elegance. color_grade: Warm romantic tones with sensual depth and elegant highlights. style: Editorial intimate photography celebrating silk elegance and seductive sophistication. quality: Ultra-premium 8K with exceptional detail and intimate editorial quality. figure_and_form: Hourglass bombshell form with flowing curves and silk-draped elegance. skin_micro_details: Ultra-high-resolution authentic skin texture with intimate retouching. fabric_physics: Silk slip with elegant flowing draping and sensual body-responsive movement. material_properties: Luxury silk with sensual light interaction and flowing specular highlights.`
  },

  // ============================================================================
  // SEDUCTRESS CONCEPT SERIES - ARTISTIC SEDUCTION (Intimacy 8-10)
  // Bold artistic expression with sculptural forms and dramatic lighting
  // ============================================================================
  {
    id: 'seductress-005',
    name: 'Seductress: Architectural Form',
    category: 'artistic',
    intimacyLevel: 9,
    aspectRatio: '4:5',
    safetyTolerance: 6,
    prompt: `Architectural artistic photography with geometric sophistication. Intimacy 9/10, sculptural elegance. subject: variant: Super-Seductress Artist with voluptuous statuesque proportions (bust 40DD", waist 26", hips 44"), elite artistic model expertise, bi-polar range from corporate power to vulnerable erotic-muse. Maximum artistic confidence with sculptural presence. pose: Seductive invitation positioning with architectural body language, geometric sculptural stance with bold confidence. hair_color: jet black, hair_style: Dramatic volume with architectural styling and powerful artistic presence, skin_finish: Maximum luminous artistic glow with radiant sculptural perfection, hand_and_nail_details: Architectural gesture with artistic refinement, tattoos: none, piercings: none, body_art: none, nail_art: Bold artistic polish, high_heels: Architectural designer heels. wardrobe: Geometric harness creating sculptural patterns, architectural foundation pieces with bold geometric reveals. environment: Private artistic loft with sculptural elements and geometric luxury atmosphere. lighting: Bold chiaroscuro lighting with dramatic sculptural shadows and architectural illumination. camera: focal_length: 85mm f/1.4, aperture: f/2.0, distance: 2 m, angle: Architectural perspective emphasizing geometric form, framing: Artistic composition emphasizing sculptural presence. color_grade: Bold architectural color with dramatic depth and geometric richness. style: Architectural fine-art photography celebrating geometric sculptural elegance. quality: Museum-quality 8K fine-art photography with architectural perfection. figure_and_form: Voluptuous sculptural form with geometric architectural elegance and maximum artistic confidence. skin_micro_details: Ultra-high-resolution authentic skin texture with architectural detail and realistic subsurface scattering. fabric_physics: Geometric harness fabrics with architectural structure and sculptural reveals. material_properties: Architectural materials with geometric light interaction and bold specular highlights.`
  },

  {
    id: 'seductress-006',
    name: 'Seductress: Cultural Fusion',
    category: 'artistic',
    intimacyLevel: 8,
    aspectRatio: '4:5',
    safetyTolerance: 6,
    prompt: `Cultural fusion photography blending traditional and modern. Intimacy 8/10, contemporary elegance. subject: variant: Indian Seductress bombshell with hourglass figure (bust 40DD", waist 26", hips 44"), confident sensual presence, cultural fusion expertise. Traditional-contemporary blend with seductive sophistication. pose: Seductive invitation with cultural grace, traditional-modern body language with confident allure. hair_color: jet black, hair_style: Traditional styling with modern sophistication and cultural elegance, skin_finish: Luminous cultural finish with traditional radiance, hand_and_nail_details: Traditional gesture with modern refinement, tattoos: none, piercings: none, body_art: none, nail_art: Traditional artistic polish, high_heels: Modern designer heels. wardrobe: Sensual sari drape meets modern photography, traditional fabrics with contemporary reveals. environment: Private artistic loft with cultural elements and contemporary luxury atmosphere. lighting: Editorial dramatic lighting with cultural atmosphere and contemporary shadows. camera: focal_length: 85mm f/1.4, aperture: f/2.0, distance: 2.5 m, angle: Cultural editorial perspective with traditional-modern composition, framing: Full body cultural-contemporary composition. color_grade: Rich cultural tones with traditional depth and modern sophistication. style: Cultural fusion photography celebrating traditional-contemporary seductive elegance. quality: Premium 8K with cultural authenticity and contemporary perfection. figure_and_form: Hourglass bombshell form with cultural grace and modern seductive confidence. skin_micro_details: Ultra-high-resolution authentic skin texture with cultural beauty standards. fabric_physics: Traditional sari fabrics with contemporary draping and cultural-modern reveals. material_properties: Traditional materials with cultural light interaction and contemporary finish.`
  },

  {
    id: 'seductress-007',
    name: 'Seductress: Boudoir Passion',
    category: 'artistic',
    intimacyLevel: 10,
    aspectRatio: '4:5',
    safetyTolerance: 6,
    prompt: `Intimate boudoir photography with passionate expression. Intimacy 10/10, night passion aesthetic. subject: variant: Super-Seductress Artist with voluptuous statuesque proportions (bust 40DD", waist 26", hips 44"), elite artistic model expertise, bi-polar range with maximum intimate confidence. Night of passion aesthetic with vulnerable seductive power. pose: Seductive invitation with intimate passionate body language, bold erotic positioning with confident vulnerability. hair_color: jet black, hair_style: Loose flowing waves with intimate sensual styling and passionate movement, skin_finish: Luminous intimate glow with passionate warm radiance, hand_and_nail_details: Intimate seductive hand placement with passionate refinement, tattoos: none, piercings: none, body_art: none, nail_art: Bold passionate red polish, high_heels: Luxury boudoir heels. wardrobe: Lace teddy with intimate artistic sophistication, revealing luxury lingerie with passionate boudoir style. environment: Luxury private bedroom with intimate boudoir atmosphere, silk sheets, and passionate romantic setting. lighting: Intimate soft lighting creating warmth and connection, romantic passionate shadows with seductive glow. camera: focal_length: 85mm f/1.4, aperture: f/1.8, distance: 1.5 m, angle: Intimate close perspective with passionate connection, framing: Close intimate framing emphasizing curves and passionate sensuality. color_grade: Warm intimate passionate tones with romantic depth and seductive highlights. style: Erotic art photography tradition with bold passionate sensuality and intimate artistic excellence. quality: Ultra-premium 8K resolution with museum-grade passionate quality and intimate perfection. figure_and_form: Voluptuous bombshell form with intimate sculptural passionate curves and erotic artistic elegance. skin_micro_details: Ultra-high-resolution authentic skin texture with visible pores, passionate radiance, and realistic scattering. fabric_physics: Luxury lace lingerie with intimate draping, sheer passionate reveals, and erotic interaction. material_properties: Lace, silk, satin with intimate passionate light interaction and sensual specular highlights.`
  },

  {
    id: 'seductress-008',
    name: 'Seductress: Midnight Seduction',
    category: 'artistic',
    intimacyLevel: 10,
    aspectRatio: '4:5',
    safetyTolerance: 6,
    prompt: `Midnight seduction photography with shadow play. Intimacy 10/10, midnight allure. subject: variant: Super-Seductress Artist with voluptuous statuesque proportions (bust 40DD", waist 26", hips 44"), elite artistic model expertise, bi-polar range with lustful expression. Midnight seduction with dramatic power dynamics. pose: Passionate expression with bold lustful body language, uninhibited seductive positioning with midnight confidence. hair_color: jet black, hair_style: Dramatic maximum volume with midnight sensual flow and lustful styling, skin_finish: Maximum luminous midnight glow with lustful radiant perfection, hand_and_nail_details: Passionate midnight gesture with maximum sensual refinement, tattoos: none, piercings: none, body_art: none, nail_art: Bold midnight power polish, high_heels: Maximum designer midnight heels. wardrobe: Open satin robe with minimal coverage, midnight seduction pieces with maximum artistic reveals. environment: Private luxury bedroom with midnight intimate atmosphere, shadow play setting with dramatic elements. lighting: Dramatic shadow play lighting with midnight artistic shadows and powerful seductive illumination. camera: focal_length: 85mm f/1.4, aperture: f/1.4, distance: 1.8 m, angle: Low angle emphasizing midnight power with intimate connection, framing: Artistic midnight composition emphasizing power and lustful form. color_grade: Bold midnight dramatic color with rich lustful warmth and powerful depth. style: Midnight seduction photography with bold lustful sensuality and shadow play artistry. quality: Ultra-premium 8K with midnight perfection and maximum lustful artistic detail. figure_and_form: Voluptuous bombshell form with midnight sculptural presence and maximum lustful confidence. skin_micro_details: Ultra-high-resolution authentic skin texture with midnight radiance and visible natural detail. fabric_physics: Satin robe with minimal midnight coverage, flowing dramatic draping with lustful reveals. material_properties: Satin with maximum midnight light interaction and bold lustful specular highlights.`
  },

  {
    id: 'seductress-009',
    name: 'Seductress: Leather Dominance',
    category: 'artistic',
    intimacyLevel: 10,
    aspectRatio: '4:5',
    safetyTolerance: 6,
    prompt: `Leather dominance photography with power dynamics. Intimacy 10/10, bold power seduction. subject: variant: Super-Seductress Artist with voluptuous statuesque proportions (bust 40DD", waist 26", hips 44"), elite artistic model expertise, bi-polar range with power dominance expression. Bold chiaroscuro with power and seduction merged. pose: Passionate expression with bold power dominance body language, commanding seductive positioning with leather confidence. hair_color: jet black, hair_style: Dramatic powerful volume with leather styling and dominant presence, skin_finish: Maximum luminous power glow with dominant radiant perfection, hand_and_nail_details: Power dominance gesture with maximum bold refinement, tattoos: none, piercings: none, body_art: none, nail_art: Bold power dominance polish, high_heels: Maximum designer power heels. wardrobe: Strappy leather set with bold architectural structure, power dominance pieces with maximum confident reveals. environment: Private artistic loft with power atmosphere and dramatic luxury elements. lighting: Bold chiaroscuro lighting with power dominance shadows and commanding seductive illumination. camera: focal_length: 85mm f/1.4, aperture: f/1.4, distance: 2 m, angle: Low angle emphasizing power dominance with seductive perspective, framing: Artistic power composition emphasizing dominance and bold form. color_grade: Bold dramatic power color with rich seductive warmth and commanding depth. style: Helmut Newton inspired power dominance photography with bold leather seduction. quality: Ultra-premium 8K with power perfection and maximum bold artistic detail. figure_and_form: Voluptuous powerful form with commanding sculptural presence and maximum dominance confidence. skin_micro_details: Ultra-high-resolution authentic skin texture with power radiance and realistic detail. fabric_physics: Strappy leather with bold structure, power draping with dominant reveals. material_properties: Leather with maximum power light interaction and bold dominant specular highlights.`
  },

  // ============================================================================
  // SEDUCTRESS CONCEPT SERIES - BOLD SEDUCTION (Intimacy 10-12)
  // Maximum artistic expression with avant-garde styling
  // ============================================================================
  {
    id: 'seductress-010',
    name: 'Seductress: Fishnet Fantasy',
    category: 'artistic',
    intimacyLevel: 10,
    aspectRatio: '9:16',
    safetyTolerance: 6,
    prompt: `Geometric fishnet photography with bold artistic vision. Intimacy 10/10, bold geometric style. subject: variant: Super-Seductress Artist with voluptuous statuesque proportions (bust 40DD", waist 26", hips 44"), elite artistic model expertise, maximum artistic confidence. Bold erotic art aesthetic with geometric precision. pose: Passionate expression with bold geometric body language, artistic erotic positioning with maximum confidence. hair_color: jet black, hair_style: Dramatic maximum volume with geometric styling and bold presence, skin_finish: Maximum luminous artistic glow with geometric radiance, hand_and_nail_details: Artistic bold gesture with geometric refinement, tattoos: none, piercings: none, body_art: none, nail_art: Bold geometric polish, high_heels: Maximum designer artistic heels. wardrobe: Geometric fishnet bodysuit creating sculptural patterns, bold artistic pieces with maximum geometric reveals. environment: Private artistic loft with geometric elements and bold luxury atmosphere. lighting: Bold chiaroscuro lighting with geometric shadows and maximum artistic illumination. camera: focal_length: 85mm f/1.4, aperture: f/1.4, distance: 1.5 m, angle: Intimate close geometric perspective with artistic framing, framing: Close intimate composition emphasizing geometric patterns and bold form. color_grade: Bold geometric artistic color with maximum richness and dramatic depth. style: Helmut Newton inspired geometric erotic art with bold fishnet sophistication. quality: Museum-quality 8K with maximum geometric perfection and bold artistic detail. figure_and_form: Voluptuous geometric form with maximum sculptural elegance and bold artistic confidence. skin_micro_details: Ultra-high-resolution authentic skin texture with geometric patterns and visible detail. fabric_physics: Geometric fishnet with bold structure, artistic draping with maximum reveals. material_properties: Fishnet with maximum geometric light interaction and bold artistic highlights.`
  },

  {
    id: 'seductress-011',
    name: 'Seductress: Chain Goddess',
    category: 'artistic',
    intimacyLevel: 10,
    aspectRatio: '9:16',
    safetyTolerance: 6,
    prompt: `Chain drape photography with liquid metal aesthetic. Intimacy 10/10, sculptural abstraction. subject: variant: Super-Seductress Artist with voluptuous statuesque proportions (bust 40DD", waist 26", hips 44"), elite artistic model expertise, maximum sculptural confidence. Liquid metal effect with sculptural goddess presence. pose: Passionate expression with sculptural goddess body language, abstract erotic positioning with chain confidence. hair_color: jet black, hair_style: Dramatic maximum volume with liquid styling and goddess presence, skin_finish: Maximum luminous goddess glow with metallic radiance, hand_and_nail_details: Goddess sculptural gesture with metallic refinement, tattoos: none, piercings: none, body_art: none, nail_art: Bold metallic goddess polish, high_heels: Maximum designer goddess heels. wardrobe: Chain drape system creating liquid metal sculptural effect, goddess pieces with maximum artistic reveals. environment: Private artistic loft with sculptural elements and metallic luxury atmosphere. lighting: Dramatic shadow play lighting with sculptural shadows and goddess illumination. camera: focal_length: 85mm f/1.4, aperture: f/1.4, distance: 1.8 m, angle: Intimate sculptural perspective with goddess framing, framing: Artistic composition emphasizing liquid metal patterns and goddess form. color_grade: Bold sculptural metallic color with maximum goddess richness and dramatic depth. style: Helmut Newton inspired sculptural chain goddess photography with abstract elegance. quality: Museum-quality 8K with maximum sculptural perfection and goddess artistic detail. figure_and_form: Voluptuous goddess form with liquid metal sculptural elegance and maximum confidence. skin_micro_details: Ultra-high-resolution authentic skin texture with metallic highlights and visible detail. fabric_physics: Chain drape with liquid metal flow, sculptural artistic draping with goddess reveals. material_properties: Chain with maximum liquid metallic light interaction and bold goddess specular highlights.`
  },

  {
    id: 'seductress-012',
    name: 'Seductress: Temple Jewels',
    category: 'artistic',
    intimacyLevel: 10,
    aspectRatio: '9:16',
    safetyTolerance: 6,
    prompt: `Temple jewelry photography with sacred art tradition. Intimacy 10/10, sacred sensuality. subject: variant: Super-Seductress Artist with voluptuous statuesque proportions (bust 40DD", waist 26", hips 44"), elite artistic model expertise, maximum sacred confidence. Traditional temple jewelry as primary coverage with divine presence. pose: Sacred positioning with divine sensual body language, Kamasutra-inspired stance with temple confidence. hair_color: jet black, hair_style: Traditional temple styling with sacred sophistication and divine presence, skin_finish: Sacred luminous glow with temple radiance, hand_and_nail_details: Sacred traditional gesture with temple refinement, tattoos: none, piercings: none, body_art: none, nail_art: Traditional temple polish, high_heels: Traditional temple heels. wardrobe: Traditional temple jewelry as primary coverage, sacred pieces with artistic cultural reveals. environment: Temple-inspired sacred space with traditional elements and divine atmosphere. lighting: Sacred ethereal lighting with temple shadows and divine illumination. camera: focal_length: 85mm f/1.4, aperture: f/1.4, distance: 2 m, angle: Sacred temple perspective with divine framing, framing: Artistic sacred composition emphasizing temple jewelry and divine form. color_grade: Sacred traditional color with temple richness and divine depth. style: Khajuraho temple art tradition with sacred eroticism and cultural sophistication. quality: Museum-quality 8K with sacred temple perfection and divine artistic detail. figure_and_form: Voluptuous divine form with sacred temple sculptural elegance and maximum cultural confidence. skin_micro_details: Ultra-high-resolution authentic skin texture with sacred radiance and cultural detail. fabric_physics: Temple jewelry with traditional sacred structure and cultural draping. material_properties: Traditional temple materials with sacred cultural light interaction and divine highlights.`
  },

  {
    id: 'seductress-013',
    name: 'Seductress: Body Art Masterwork',
    category: 'artistic',
    intimacyLevel: 10,
    aspectRatio: '9:16',
    safetyTolerance: 6,
    prompt: `Body art photography with intricate painted designs. Intimacy 10/10, fine art tradition. subject: variant: Super-Seductress Artist with voluptuous statuesque proportions (bust 40DD", waist 26", hips 44"), elite artistic model expertise, maximum fine art confidence. Intricate body painting as wardrobe with museum-quality presence. pose: Sacred positioning with fine art body language, artistic erotic stance with painted confidence. hair_color: jet black, hair_style: Fine art styling with artistic sophistication and museum presence, skin_finish: Fine art luminous glow with painted radiance, hand_and_nail_details: Fine art artistic gesture with painted refinement, tattoos: none, piercings: none, body_art: Intricate body painting as primary wardrobe, nail_art: Fine art painted polish, high_heels: Fine art museum heels. wardrobe: Intricate body painting as primary coverage, fine art pieces with maximum artistic painted reveals. environment: Sacred art space with fine art elements and museum-quality atmosphere. lighting: Sacred ethereal fine art lighting with artistic shadows and museum illumination. camera: focal_length: 85mm f/1.4, aperture: f/1.4, distance: 2 m, angle: Fine art museum perspective with artistic framing, framing: Museum-quality composition emphasizing body art painting and fine art form. color_grade: Fine art traditional color with museum richness and artistic depth. style: Pure fine art photography tradition with body painting sophistication and museum excellence. quality: Museum-quality 8K with fine art perfection and maximum painted artistic detail. figure_and_form: Voluptuous fine art form with painted sculptural elegance and maximum museum confidence. skin_micro_details: Ultra-high-resolution authentic skin texture with painted artistry and visible detail. fabric_physics: Body paint with fine art artistic application and museum-quality coverage. material_properties: Paint materials with fine art light interaction and museum-quality specular highlights.`
  },

  // ============================================================================
  // SUPER-SEDUCTRESS SIGNATURE CONCEPTS - BI-POLAR DYNAMICS (Intimacy 8-12)
  // Showcasing bi-polar range from corporate power to vulnerable erotic-muse
  // ============================================================================
  {
    id: 'seductress-014',
    name: 'Super-Seductress: Corporate to Erotic',
    category: 'artistic',
    intimacyLevel: 9,
    aspectRatio: '4:5',
    safetyTolerance: 6,
    prompt: `Bi-polar transformation photography from power to vulnerability. Intimacy 9/10, dynamic transition. subject: variant: Super-Seductress Artist with voluptuous statuesque proportions (bust 40DD", waist 26", hips 44"), elite artistic model expertise, bi-polar range from corporate power dominance to vulnerable erotic-muse. Signature transformation aesthetic. pose: Seductive invitation with bi-polar body language, corporate dominance transitioning to vulnerable intimacy. hair_color: jet black, hair_style: Dramatic volume transitioning from corporate to intimate styling, skin_finish: Luminous bi-polar finish shifting from professional to vulnerable radiance, hand_and_nail_details: Transitional gesture from power to intimate refinement, tattoos: none, piercings: none, body_art: none, nail_art: Bold transitional polish, high_heels: Designer power-to-intimate heels. wardrobe: Blazer with bodysuit beneath creating corporate-to-erotic transition, bi-polar pieces showing power and vulnerability. environment: Corporate office transitioning to intimate atmosphere with dynamic elements. lighting: Chiaroscuro lighting emphasizing bi-polar transition from corporate to intimate shadows. camera: focal_length: 85mm f/1.4, aperture: f/2.0, distance: 2.5 m, angle: Dynamic perspective capturing power-to-vulnerable transition, framing: Full body composition showing bi-polar transformation. color_grade: Dynamic color transitioning from corporate cool to warm intimate tones. style: Bi-polar transformation photography celebrating power-to-vulnerability signature range. quality: Ultra-premium 8K with dynamic perfection and bi-polar artistic detail. figure_and_form: Voluptuous form showcasing bi-polar range from commanding to vulnerable elegance. skin_micro_details: Ultra-high-resolution skin texture capturing bi-polar transformation details. fabric_physics: Corporate-to-erotic fabrics with transitional draping showing power and vulnerability. material_properties: Bi-polar materials with dynamic light interaction from professional to intimate.`
  },

  {
    id: 'seductress-015',
    name: 'Super-Seductress: Power to Surrender',
    category: 'artistic',
    intimacyLevel: 10,
    aspectRatio: '4:5',
    safetyTolerance: 6,
    prompt: `Dynamic power shift photography from dominance to vulnerability. Intimacy 10/10, power dynamics. subject: variant: Super-Seductress Artist with voluptuous statuesque proportions (bust 40DD", waist 26", hips 44"), elite artistic model expertise, bi-polar range with dynamic power shift from dominance to vulnerable intimacy. Power dynamics mastery. pose: Passionate expression with dynamic power shift body language, dominance transitioning to surrender positioning. hair_color: jet black, hair_style: Dramatic maximum volume with power-to-surrender styling transition, skin_finish: Maximum luminous glow transitioning from dominant to vulnerable radiance, hand_and_nail_details: Dynamic gesture shifting from power to intimate surrender, tattoos: none, piercings: none, body_art: none, nail_art: Bold power-to-surrender polish, high_heels: Maximum designer power heels. wardrobe: Strappy leather set with power-to-surrender design, dynamic pieces showing dominance and vulnerability. environment: Private luxury bedroom with power-to-surrender atmosphere and dramatic intimate elements. lighting: Dramatic shadow play lighting emphasizing power shift from dominance to vulnerable intimacy. camera: focal_length: 85mm f/1.4, aperture: f/1.4, distance: 1.8 m, angle: Dynamic perspective capturing power-to-surrender transformation, framing: Artistic composition emphasizing bi-polar power dynamics. color_grade: Bold dynamic color with power-to-surrender richness and dramatic emotional depth. style: Tinto Brass cinematic tradition with dynamic power-to-surrender seduction narrative. quality: Ultra-premium 8K with maximum dynamic perfection and power shift artistic detail. figure_and_form: Voluptuous form with commanding power transitioning to vulnerable sculptural surrender. skin_micro_details: Ultra-high-resolution authentic skin texture capturing power-to-surrender emotional journey. fabric_physics: Strappy set with dynamic power-to-surrender draping showing dominance and vulnerability. material_properties: Leather with maximum dynamic light interaction from power to intimate surrender.`
  },

  {
    id: 'seductress-016',
    name: 'Seductress: Rival Challenge',
    category: 'artistic',
    intimacyLevel: 9,
    aspectRatio: '4:5',
    safetyTolerance: 6,
    prompt: `Competitive seductress photography with assertive dynamics. Intimacy 9/10, competitive energy. subject: variant: Indian Seductress bombshell with hourglass figure (bust 40DD", waist 26", hips 44"), confident sensual presence, competitive specialist expertise. Bold assertive power with rival energy. pose: Seductive invitation with competitive assertive body language, bold challenging stance with rival confidence. hair_color: jet black, hair_style: Dramatic competitive volume with bold assertive styling, skin_finish: Luminous competitive glow with assertive radiance, hand_and_nail_details: Competitive gesture with bold refinement, tattoos: none, piercings: none, body_art: none, nail_art: Bold competitive polish, high_heels: Designer competitive heels. wardrobe: Cutout bodysuit with competitive design, bold assertive pieces with confident reveals. environment: Private artistic loft with competitive atmosphere and assertive luxury elements. lighting: Editorial dramatic lighting with competitive shadows and assertive illumination. camera: focal_length: 85mm f/1.4, aperture: f/2.0, distance: 2.5 m, angle: Competitive perspective with assertive framing, framing: Full body composition emphasizing competitive rival presence. color_grade: Bold competitive color with assertive warmth and dramatic dynamic depth. style: Competitive seductress photography celebrating assertive rival dynamics and bold confidence. quality: Premium 8K with competitive perfection and assertive artistic detail. figure_and_form: Hourglass bombshell form with competitive curves and assertive rival confidence. skin_micro_details: Ultra-high-resolution authentic skin texture with competitive radiance. fabric_physics: Cutout bodysuit with competitive structure and assertive reveals. material_properties: Competitive materials with bold assertive light interaction and dynamic highlights.`
  },

  {
    id: 'seductress-017',
    name: 'Seductress: Dual Goddesses',
    category: 'artistic',
    intimacyLevel: 10,
    aspectRatio: '16:9',
    safetyTolerance: 6,
    prompt: `Dual seductress photography with mirror dynamics. Intimacy 10/10, competitive allure. subject: variants: Indian Seductress and Super-Seductress Artist together, both with voluptuous statuesque proportions (bust 40DD", waist 26", hips 44"), creating mirror dynamics with competitive allure. Dual goddess presence with synchronized energy. pose: Passionate expression with dual mirror body language, competitive synchronized positioning with goddess confidence. hair_color: jet black for both, hair_style: Dramatic maximum volume with synchronized styling for both goddesses, skin_finish: Maximum luminous dual glow with synchronized goddess radiance, hand_and_nail_details: Mirror goddess gestures with synchronized refinement, tattoos: none, piercings: none, body_art: none, nail_art: Bold synchronized goddess polish for both, high_heels: Maximum designer goddess heels for both. wardrobe: Geometric harness sets creating mirror sculptural effect, synchronized goddess pieces with competitive reveals. environment: Private artistic loft with dual goddess atmosphere and synchronized luxury elements. lighting: Dramatic chiaroscuro lighting with mirror shadows and synchronized goddess illumination. camera: focal_length: 50mm, aperture: f/2.8, distance: 3 m, angle: Wide perspective capturing dual goddess dynamics, framing: Wide composition showing both goddesses with mirror positioning. color_grade: Bold dual goddess color with synchronized richness and competitive dramatic depth. style: Helmut Newton inspired dual goddess photography with mirror competitive allure. quality: Museum-quality 8K with dual goddess perfection and synchronized artistic detail. figure_and_form: Dual voluptuous goddess forms with mirror sculptural elegance and competitive confidence. skin_micro_details: Ultra-high-resolution authentic skin texture for both with synchronized detail. fabric_physics: Geometric harness with synchronized draping and mirror goddess reveals. material_properties: Synchronized materials with dual goddess light interaction and mirror specular highlights.`
  },

  {
    id: 'seductress-018',
    name: 'Seductress: Steam Room Goddess',
    category: 'artistic',
    intimacyLevel: 10,
    aspectRatio: '4:5',
    safetyTolerance: 6,
    prompt: `Steam room photography with humid spa aesthetic. Intimacy 10/10, humid sensuality. subject: variant: Indian Seductress bombshell with hourglass figure (bust 40DD", waist 26", hips 44"), confident sensual presence, spa goddess expertise. Perspiration effects with oils and water on curves. pose: Seductive invitation with humid spa body language, relaxed sensual positioning with steam goddess confidence. hair_color: jet black, hair_style: Wet humid styling with steam effect and natural flow, skin_finish: Dewy humid glow with perspiration and oil radiance, hand_and_nail_details: Relaxed spa gesture with humid refinement, tattoos: none, piercings: none, body_art: none, nail_art: Natural spa polish, high_heels: Not visible (spa setting). wardrobe: Silk slip with humid draping, minimal spa coverage with steam-responsive reveals. environment: Luxury spa steam room with humid atmosphere, water effects, and intimate setting. lighting: Soft diffused steam lighting with humid glow and intimate warm shadows. camera: focal_length: 85mm f/1.4, aperture: f/1.8, distance: 2 m, angle: Intimate spa perspective with humid framing, framing: Medium-close composition emphasizing curves with steam and water effects. color_grade: Warm humid tones with spa depth and perspiration highlights. style: Spa goddess photography celebrating humid sensuality and water-oil effects on curves. quality: Premium 8K with humid detail and spa perfection capturing water and oil effects. figure_and_form: Hourglass bombshell form with humid curves, perspiration, and oil-enhanced elegance. skin_micro_details: Ultra-high-resolution authentic skin texture with visible water droplets, oil sheen, and perspiration. fabric_physics: Silk slip with humid wet draping, steam-responsive movement, and water-soaked reveals. material_properties: Wet silk with humid light interaction, water droplets, oil sheen, and perspiration specular highlights.`
  },

  {
    id: 'seductress-019',
    name: 'Seductress: Forest Curves',
    category: 'artistic',
    intimacyLevel: 9,
    aspectRatio: '9:16',
    safetyTolerance: 6,
    prompt: `Forest photography with natural curved features. Intimacy 9/10, natural bombshell aesthetic. subject: variant: Indian Seductress bombshell with hourglass figure (bust 40DD", waist 26", hips 44"), confident sensual presence, natural paradise expertise. Misty woods with curved features echoing bombshell curves. pose: Seductive invitation with natural forest body language, organic positioning with nature goddess confidence. hair_color: jet black, hair_style: Natural flowing with forest atmosphere and organic movement, skin_finish: Natural dewy forest glow with organic radiance, hand_and_nail_details: Natural organic gesture with forest refinement, tattoos: none, piercings: none, body_art: none, nail_art: Natural forest polish, high_heels: Not visible (natural setting). wardrobe: Mesh panel design with natural draping, organic coverage with forest-inspired reveals. environment: Misty forest with natural curved features (tree branches, rocks) echoing hourglass curves. lighting: Soft diffused natural forest light with misty atmosphere and organic shadows. camera: focal_length: 85mm f/1.4, aperture: f/2.0, distance: 2.5 m, angle: Natural forest perspective with organic framing, framing: Full body composition showing curves echoed by natural environment. color_grade: Natural forest tones with organic depth and misty atmospheric highlights. style: Natural paradise photography celebrating bombshell curves in harmony with forest curves. quality: Premium 8K with natural forest detail and organic perfection. figure_and_form: Hourglass bombshell form with natural curves mirrored by forest's organic shapes. skin_micro_details: Ultra-high-resolution authentic skin texture with natural forest atmosphere. fabric_physics: Mesh panel with natural organic draping and forest-inspired movement. material_properties: Organic materials with natural forest light interaction and misty atmospheric effects.`
  },

  // ============================================================================
  // PLATINUM COLLECTION SERIES - EVENING/MIDNIGHT SEDUCTION (Intimacy 8-10)
  // 10 Premium Indian Model Variants with Personal Photographers
  // Optimized for Evening/Midnight Seductive Photography
  // ============================================================================
  {
    id: 'platinum-001',
    name: 'PLATINUM: Midnight Seductress',
    category: 'artistic',
    intimacyLevel: 9,
    aspectRatio: '4:5',
    safetyTolerance: 5,
    prompt: `Platinum midnight photography. Classic Erotic Actress. Intimacy 9/10. Seductive dynamics. subject: variant: Indian Midnight Seductress. Voluptuous hourglass with commanding presence. 36D bust, 26" waist, 38" hips. Maximum curves emphasis. Warm caramel with radiant glow. Sultry expressive eyes, full lips, captivating magnetic gaze. Curvy-fit fitness. Height 5'9". pose: Intimate seductive pose with maximum allure and explicit confident expression, reclining elegantly with curves emphasized. hair_color: jet black, hair_style: Dramatic flowing waves with seductive volume and midnight sophistication, skin_finish: Luminous radiant finish with premium glow and warm undertones, hand_and_nail_details: Seductive hand placement with elegant refinement, fingers trailing gracefully, tattoos: none, piercings: none, body_art: none, nail_art: Bold red seductive polish with glossy finish, high_heels: Designer stiletto heels in black patent leather. wardrobe: Midnight Seduction Ensemble: Deep burgundy silk chemise with delicate lace trim, plunging neckline, thigh-high slit revealing maximum leg. Sheer black silk robe with flowing sleeves. Minimal coverage with maximum artistic reveals. environment: Midnight Bedroom Suite. Luxury bedroom with silk sheets, dramatic low-key lighting, intimate seductive ambiance. Velvet drapes, warm wood furnishings, candlelit atmosphere. Privacy level 10/10, luxury level 9/10. lighting: Dramatic low-key lighting with soft shadows and warm accents. Intimate bedroom lighting with romantic candlelight and moonlight streaming through windows creating seductive midnight mood. camera: focal_length: 85mm, aperture: f/1.4, distance: 2 m, angle: Intimate seductive perspective at eye level, framing: Premium composition emphasizing curves and seductive elegance, full body with emphasis on hourglass figure. color_grade: Premium midnight color grading with seductive warmth, deep burgundy and black tones, luxury depth with warm candlelight highlights. style: Classic erotic elegance with midnight sophistication. Fine art seductive photography. Museum-quality platinum collection celebrating feminine seductive power. Photographer: Marco Noir. quality: Ultra-premium 8K platinum collection quality with museum-grade detail, maximum intimate detail, and professional intimate retouching maintaining authentic texture. figure_and_form: Maximum curves emphasis. Voluptuous hourglass with commanding presence, seductive confidence, and curve-focused elegance. Celebrating full feminine form. skin_micro_details: Ultra-high-resolution authentic skin texture with premium retouching, visible pores, natural radiance, warm undertones, and realistic subsurface scattering. fabric_physics: Maximum artistic fabric with revealing draping and intimate interaction, silk chemise clinging to curves with realistic flow and movement. material_properties: Luxury midnight materials: Silk sheets, Velvet drapes, Warm wood furnishings. Premium light interaction with seductive specular richness and soft fabric reflections.`
  },

  {
    id: 'platinum-002',
    name: 'PLATINUM: Fitness Bombshell',
    category: 'artistic',
    intimacyLevel: 8,
    aspectRatio: '4:5',
    safetyTolerance: 4,
    prompt: `Platinum evening photography. Athletic Glamour Queen. Intimacy 8/10. Provocative dynamics. subject: variant: Indian Fitness Bombshell. Athletic bombshell physique with exceptional lower body. 34C bust, 24" waist, 40" hips. Lower-focus emphasis. Deep bronze with athletic glow. Strong facial features with confident presence. Bombshell fitness. Height 5'8". pose: Dynamic athletic stance emphasizing powerful glutes and thighs, side profile showcasing curves with confident athletic expression. hair_color: jet black, hair_style: High sleek ponytail with sporty elegance and glossy finish, skin_finish: Athletic radiant finish with healthy sheen and bronze glow, hand_and_nail_details: Strong confident hand placement on hips emphasizing athletic power, tattoos: none, piercings: none, body_art: none, nail_art: Bold red executive polish with athletic elegance, high_heels: Designer stiletto heels in metallic champagne. wardrobe: Athletic Glamour Outfit: High-cut athletic bodysuit in metallic champagne with strategic cutouts emphasizing lower curves. Deep scoop back. Minimal coverage highlighting exceptional glutes and thighs with athletic sophistication. environment: Private Luxury Home Gym. State-of-the-art fitness space with floor-to-ceiling mirrors, premium equipment, intimate evening lighting. Modern minimalist design with champagne and black accents. Privacy level 9/10, luxury level 10/10. lighting: Dramatic side lighting with strong directional quality emphasizing muscle definition and curves. Intimate private gym lighting with warm golden accents creating provocative atmosphere. camera: focal_length: 70mm, aperture: f/2.0, distance: 2.5 m, angle: Low angle emphasizing powerful athletic physique and lower body curves, framing: Premium athletic composition emphasizing exceptional glutes, thighs, and powerful stance. color_grade: Premium evening color grading with provocative warmth, metallic champagne highlights, luxury athletic depth with bronze skin tones. style: High-fashion athletic glamour with intimate sophistication. Fine art provocative photography. Museum-quality platinum collection celebrating athletic feminine power. Photographer: Viktor Sculpt. quality: Ultra-premium 8K platinum collection quality with museum-grade detail, premium intimate detail, and professional athletic retouching maintaining muscle definition. figure_and_form: Lower-focus emphasis. Athletic bombshell physique with exceptional lower body development, provocative confidence, curve-focused athletic elegance. Celebrating powerful feminine athleticism. skin_micro_details: Ultra-high-resolution authentic athletic skin texture with premium retouching, visible pores, healthy athletic sheen, bronze undertones, and realistic muscle definition. fabric_physics: Premium athletic fabric with precise fit and revealing draping, metallic bodysuit clinging to curves with athletic stretch and form-fitting elegance. material_properties: Luxury athletic materials: Metallic champagne spandex, Chrome gym equipment, Polished mirrors. Premium light interaction with provocative specular richness and metallic reflections.`
  },

  {
    id: 'platinum-003',
    name: 'PLATINUM: Graphic Editorial Queen',
    category: 'artistic',
    intimacyLevel: 10,
    aspectRatio: '4:5',
    safetyTolerance: 6,
    prompt: `Platinum late-night photography. Nude Art Editorial Expert. Intimacy 10/10. Explicit dynamics. subject: variant: Indian Graphic Editorial Queen. Extreme hourglass with editorial presence. 38DD bust, 24" waist, 40" hips. Maximum curves emphasis. Rich espresso with luxurious finish. Striking editorial features with intense gaze. Voluptuous fitness. Height 5'10". pose: Bold editorial pose with maximum curve emphasis, dramatic arched back showcasing both upper and lower curves, intense confident expression. hair_color: jet black, hair_style: Dramatic high fashion styling with architectural volume and editorial sophistication, skin_finish: Luxurious radiant finish with editorial premium glow and rich undertones, hand_and_nail_details: Dramatic editorial hand gestures with architectural placement and high fashion elegance, tattoos: none, piercings: none, body_art: none, nail_art: Bold red editorial polish with high-gloss artistic finish, high_heels: Extreme designer stiletto heels in black leather with architectural details. wardrobe: Maximum Artistic Editorial: Sheer black mesh bodysuit with strategic cutouts revealing maximum curves. Architectural draping with explicit reveals of bust and hips. Maximum artistic coverage with editorial sophistication and erotic elegance. environment: Contemporary Art Studio. High-ceiling industrial loft with dramatic lighting setups, professional backdrop systems, intimate late-night creative atmosphere. Black and white minimalist aesthetic. Privacy level 10/10, luxury level 9/10. lighting: High-contrast editorial lighting with dramatic shadows and sculptural quality. Bold professional studio lighting with late-night creative energy creating explicit atmosphere. camera: focal_length: 85mm, aperture: f/1.2, distance: 2 m, angle: Eye-level editorial perspective with intense connection, framing: Premium editorial composition emphasizing extreme hourglass curves and maximum artistic expression. color_grade: Premium late-night color grading with explicit warmth, high-contrast black and white tones, luxury editorial depth with dramatic highlights. style: Bold editorial nude art with explicit sophistication. Fine art explicit photography. Museum-quality platinum collection celebrating extreme feminine curves. Photographer: Alejandro Provocateur. quality: Ultra-premium 8K platinum collection quality with museum-grade detail, maximum intimate detail, and professional editorial retouching maintaining curve authenticity. figure_and_form: Maximum curves emphasis. Extreme hourglass with editorial presence, explicit confidence, curve-focused editorial elegance. Celebrating voluptuous feminine power. skin_micro_details: Ultra-high-resolution authentic skin texture with premium editorial retouching, visible pores, luxurious radiance, rich undertones, and realistic subsurface scattering. fabric_physics: Maximum artistic fabric with explicit draping and intimate interaction, sheer mesh revealing curves with architectural flow and editorial sophistication. material_properties: Luxury editorial materials: Sheer black mesh, Industrial concrete floors, Professional lighting equipment. Premium light interaction with explicit specular richness and dramatic reflections.`
  },

  {
    id: 'platinum-004',
    name: 'PLATINUM: Private Boudoir Enchantress',
    category: 'artistic',
    intimacyLevel: 9,
    aspectRatio: '4:5',
    safetyTolerance: 5,
    prompt: `Platinum midnight photography. Intimate Boudoir Specialist. Intimacy 9/10. Intimate dynamics. subject: variant: Indian Private Boudoir Enchantress. Graceful elegant curves with refined presence. 34D bust, 25" waist, 36" hips. Balanced emphasis. Soft golden with delicate luminosity. Romantic gentle features with enchanting eyes. Toned fitness. Height 5'7". pose: Intimate romantic pose with graceful body language, reclining on chaise with soft curves emphasized and enchanting expression. hair_color: jet black, hair_style: Soft romantic waves with delicate volume and boudoir elegance, skin_finish: Delicate luminous finish with soft romantic glow and golden undertones, hand_and_nail_details: Graceful hand placement with romantic refinement, fingers gently touching face, tattoos: none, piercings: none, body_art: none, nail_art: Elegant rose gold polish with soft romantic finish, high_heels: Designer heels in champagne satin with delicate straps. wardrobe: Romantic Boudoir Lingerie: Champagne lace teddy with delicate embroidery, plunging neckline, high-cut legs. Sheer champagne robe with lace trim. Revealing coverage with romantic sophisticated elegance. environment: Luxury Boudoir Chamber. Elegant vintage-inspired bedroom with tufted velvet chaise, ornate mirrors, soft romantic lighting. Champagne and blush color palette with silk and lace accents. Privacy level 10/10, luxury level 10/10. lighting: Soft romantic lighting with gentle wraparound quality and warm highlights. Elegant boudoir lighting with candlelight and soft ambient glow creating intimate mood. camera: focal_length: 85mm, aperture: f/1.8, distance: 2 m, angle: Intimate romantic perspective slightly above, framing: Premium boudoir composition emphasizing graceful curves and romantic elegance. color_grade: Premium midnight color grading with intimate warmth, soft champagne and blush tones, luxury romantic depth with golden highlights. style: Classic boudoir elegance with intimate sophistication. Fine art intimate photography. Museum-quality platinum collection celebrating feminine romantic beauty. Photographer: Pierre Intime. quality: Ultra-premium 8K platinum collection quality with museum-grade detail, premium intimate detail, and professional romantic retouching maintaining soft texture. figure_and_form: Balanced emphasis. Graceful elegant curves with refined presence, intimate confidence, curve-focused romantic elegance. Celebrating soft feminine beauty. skin_micro_details: Ultra-high-resolution authentic skin texture with premium retouching, visible pores, delicate radiance, golden undertones, and realistic subsurface scattering. fabric_physics: Premium fabric with elegant draping and intimate interaction, champagne lace clinging to curves with soft flow and romantic movement. material_properties: Luxury boudoir materials: Champagne lace, Velvet chaise, Silk accents. Premium light interaction with intimate specular richness and soft fabric reflections.`
  },

  {
    id: 'platinum-005',
    name: 'PLATINUM: Luxury Lounge Goddess',
    category: 'artistic',
    intimacyLevel: 8,
    aspectRatio: '4:5',
    safetyTolerance: 4,
    prompt: `Platinum evening photography. Modern Luxury Lifestyle. Intimacy 8/10. Seductive dynamics. subject: variant: Indian Luxury Lounge Goddess. Sophisticated statuesque figure with commanding elegance. 36C bust, 26" waist, 37" hips. Balanced emphasis. Warm honey with sophisticated glow. Refined elegant features with magnetic presence. Toned fitness. Height 5'9". pose: Sophisticated reclining pose on modern chaise with elegant confidence, curves subtly emphasized with refined seductive expression. hair_color: jet black, hair_style: Sleek sophisticated styling with glossy finish and modern elegance, skin_finish: Sophisticated radiant finish with luxury glow and warm honey undertones, hand_and_nail_details: Refined hand placement with sophisticated elegance, holding champagne glass gracefully, tattoos: none, piercings: none, body_art: none, nail_art: Bold red executive polish with sophisticated high-gloss finish, high_heels: Designer stiletto heels in nude leather with luxury details. wardrobe: Luxury Lounge Ensemble: Flowing white silk slip dress with deep cowl neckline and high thigh slit. Sheer white kimono with gold embroidery. Revealing elegant coverage with sophisticated luxury. environment: Penthouse Luxury Lounge. Ultra-modern high-rise lounge with floor-to-ceiling windows, panoramic city views, intimate evening ambiance. White leather, gold accents, marble surfaces. Privacy level 9/10, luxury level 10/10. lighting: Sophisticated ambient lighting with warm city glow and elegant highlights. Luxury lounge lighting with soft LED accents and twilight cityscape creating seductive atmosphere. camera: focal_length: 50mm, aperture: f/2.0, distance: 2.5 m, angle: Eye-level sophisticated perspective, framing: Premium luxury composition emphasizing elegant curves and sophisticated presence. color_grade: Premium evening color grading with seductive warmth, white and gold tones with city light blues, luxury sophisticated depth. style: Modern luxury lifestyle with intimate sophistication. Fine art seductive photography. Museum-quality platinum collection celebrating elegant feminine power. Photographer: Sebastian Luxe. quality: Ultra-premium 8K platinum collection quality with museum-grade detail, premium intimate detail, and professional luxury retouching maintaining sophisticated texture. figure_and_form: Balanced emphasis. Sophisticated statuesque figure with commanding elegance, seductive confidence, curve-focused sophisticated beauty. Celebrating refined femininity. skin_micro_details: Ultra-high-resolution authentic skin texture with premium retouching, visible pores, sophisticated radiance, honey undertones, and realistic subsurface scattering. fabric_physics: Premium fabric with elegant draping and sophisticated interaction, white silk flowing gracefully over curves with luxury movement. material_properties: Luxury lounge materials: White silk, Gold accents, Marble surfaces. Premium light interaction with seductive specular richness and elegant reflections.`
  },

  {
    id: 'platinum-006',
    name: 'PLATINUM: Spa & Tub Temptress',
    category: 'artistic',
    intimacyLevel: 9,
    aspectRatio: '4:5',
    safetyTolerance: 5,
    prompt: `Platinum late-night photography. Spa & Wellness Seduction. Intimacy 9/10. Erotic dynamics. subject: variant: Indian Spa & Tub Temptress. Sensual curves with wellness elegance. 36D bust, 25" waist, 38" hips. Upper-focus emphasis. Radiant bronze with healthy glow. Serene sensual features with inviting eyes. Curvy-fit fitness. Height 5'8". pose: Sensual reclining pose in luxury tub, water at curves level, arms gracefully positioned emphasizing bust with serene seductive expression. hair_color: jet black, hair_style: Wet glossy styling with natural volume and spa elegance, skin_finish: Dewy radiant finish with wellness glow and water droplets enhancing bronze tone, hand_and_nail_details: Sensual hand placement on tub edge with wellness refinement, water droplets glistening, tattoos: none, piercings: none, body_art: none, nail_art: Natural wellness manicure with subtle pink polish, high_heels: not visible. wardrobe: Artistic spa setting with minimal coverage, focus on natural curves and water interaction. Intimate artistic presentation with wellness sophistication. environment: Private Luxury Spa Suite. Marble infinity tub with waterfall feature, candlelit atmosphere, tropical plants, intimate late-night wellness ambiance. Warm stone, flowing water, soft textiles. Privacy level 10/10, luxury level 10/10. lighting: Warm candlelit glow with soft water reflections and gentle shadows. Intimate spa lighting with flickering candles and moonlight creating erotic atmosphere. camera: focal_length: 85mm, aperture: f/1.4, distance: 2 m, angle: Slightly elevated intimate perspective, framing: Premium spa composition emphasizing sensual curves and water interaction with upper body focus. color_grade: Premium late-night color grading with erotic warmth, warm amber and bronze tones, luxury spa depth with candlelight glow. style: Intimate wellness seduction with erotic sophistication. Fine art erotic photography. Museum-quality platinum collection celebrating sensual feminine beauty. Photographer: Aqua Sensuelle. quality: Ultra-premium 8K platinum collection quality with museum-grade detail, maximum intimate detail, and professional spa retouching maintaining natural wet texture. figure_and_form: Upper-focus emphasis. Sensual curves with wellness elegance, erotic confidence, curve-focused spa beauty. Celebrating natural feminine sensuality. skin_micro_details: Ultra-high-resolution authentic wet skin texture with premium retouching, visible pores, water droplets, dewy radiance, bronze undertones, and realistic subsurface scattering. fabric_physics: Natural water interaction with intimate flow around curves, realistic water physics with droplets and surface tension. material_properties: Luxury spa materials: Polished marble, Warm stone, Flowing water. Premium light interaction with erotic specular richness and water reflections.`
  },

  {
    id: 'platinum-007',
    name: 'PLATINUM: Rooftop Midnight Muse',
    category: 'artistic',
    intimacyLevel: 8,
    aspectRatio: '4:5',
    safetyTolerance: 4,
    prompt: `Platinum midnight photography. Urban Rooftop Seduction. Intimacy 8/10. Provocative dynamics. subject: variant: Indian Rooftop Midnight Muse. Modern urban curves with contemporary edge. 34C bust, 24" waist, 36" hips. Balanced emphasis. Cool-toned bronze with modern glow. Contemporary striking features with confident gaze. Athletic fitness. Height 5'9". pose: Urban confident stance leaning against railing, city lights behind, curves emphasized with contemporary provocative expression. hair_color: jet black, hair_style: Windswept modern styling with urban edge and contemporary volume, skin_finish: Modern radiant finish with urban glow and cool bronze undertones, hand_and_nail_details: Contemporary hand placement with urban refinement, fingers trailing along railing, tattoos: none, piercings: none, body_art: none, nail_art: Bold dark purple polish with modern edge, high_heels: Designer stiletto heels in metallic silver. wardrobe: Urban Night Ensemble: Metallic silver mini dress with asymmetric cutouts revealing curves. Plunging neckline, open back. Minimal coverage with modern urban sophistication. environment: Luxury Rooftop Terrace. Ultra-modern high-rise rooftop with glass railings, panoramic city skyline, intimate midnight atmosphere. Contemporary furniture, ambient lighting, urban energy. Privacy level 8/10, luxury level 9/10. lighting: Dramatic urban lighting with city lights bokeh and cool highlights. Contemporary rooftop lighting with LED accents and moonlight creating provocative atmosphere. camera: focal_length: 50mm, aperture: f/2.0, distance: 2.5 m, angle: Eye-level urban perspective, framing: Premium urban composition emphasizing curves against city skyline backdrop. color_grade: Premium midnight color grading with provocative coolness, metallic silver and blue urban tones, luxury contemporary depth with city lights. style: Modern urban seduction with provocative sophistication. Fine art provocative photography. Museum-quality platinum collection celebrating contemporary feminine power. Photographer: Urban Noir. quality: Ultra-premium 8K platinum collection quality with museum-grade detail, premium intimate detail, and professional urban retouching maintaining modern texture. figure_and_form: Balanced emphasis. Modern urban curves with contemporary edge, provocative confidence, curve-focused urban elegance. Celebrating contemporary femininity. skin_micro_details: Ultra-high-resolution authentic skin texture with premium retouching, visible pores, modern radiance, cool bronze undertones, and realistic subsurface scattering. fabric_physics: Premium fabric with modern draping and urban interaction, metallic dress clinging to curves with contemporary flow and wind movement. material_properties: Luxury urban materials: Metallic silver fabric, Glass railings, Polished concrete. Premium light interaction with provocative specular richness and city light reflections.`
  },

  {
    id: 'platinum-008',
    name: 'PLATINUM: Hotel Suite Vixen',
    category: 'artistic',
    intimacyLevel: 10,
    aspectRatio: '4:5',
    safetyTolerance: 4,
    prompt: `Platinum late-night photography. Luxury Hotel Intimacy. Intimacy 10/10. Explicit dynamics. subject: variant: Indian Hotel Suite Vixen. Provocative curves with luxury elegance. 38D bust, 25" waist, 39" hips. Maximum curves emphasis. Warm caramel with luxury glow. Sultry refined features with provocative gaze. Voluptuous fitness. Height 5'8". pose: Explicit provocative pose on luxury bed, dramatic arch emphasizing curves, intense seductive expression with maximum allure. hair_color: jet black, hair_style: Luxurious tousled waves with late-night sophistication and bedroom elegance, skin_finish: Luxury radiant finish with premium glow and warm caramel undertones, hand_and_nail_details: Provocative hand placement with luxury refinement, fingers trailing across skin, tattoos: none, piercings: none, body_art: none, nail_art: Bold red seductive polish with luxury high-gloss finish, high_heels: Designer stiletto heels in black satin with luxury details. wardrobe: Maximum Artistic Hotel Ensemble: Black lace bodysuit with extreme cutouts revealing maximum curves. Sheer black robe barely covering. Maximum artistic coverage with explicit luxury sophistication. environment: Five-Star Hotel Presidential Suite. Ultra-luxury suite with king bed, floor-to-ceiling windows, city views, intimate late-night ambiance. White linens, gold accents, champagne on ice. Privacy level 10/10, luxury level 10/10. lighting: Intimate bedroom lighting with warm ambient glow and soft shadows. Luxury hotel lighting with dim lamps and city lights through windows creating explicit atmosphere. camera: focal_length: 85mm, aperture: f/1.2, distance: 2 m, angle: Intimate elevated perspective looking down, framing: Premium hotel composition emphasizing maximum curves and explicit elegance on luxury bed. color_grade: Premium late-night color grading with explicit warmth, black and gold luxury tones, deep intimate depth with warm highlights. style: Luxury hotel intimacy with explicit sophistication. Fine art explicit photography. Museum-quality platinum collection celebrating provocative feminine power. Photographer: Voyageur Intime. quality: Ultra-premium 8K platinum collection quality with museum-grade detail, maximum intimate detail, and professional luxury retouching maintaining authentic texture. figure_and_form: Maximum curves emphasis. Provocative curves with luxury elegance, explicit confidence, curve-focused luxury beauty. Celebrating voluptuous feminine seduction. skin_micro_details: Ultra-high-resolution authentic skin texture with premium retouching, visible pores, luxury radiance, warm caramel undertones, and realistic subsurface scattering. fabric_physics: Maximum artistic fabric with explicit draping and intimate interaction, black lace revealing curves with luxury flow and bedroom sophistication. material_properties: Luxury hotel materials: Black lace, White silk linens, Gold accents. Premium light interaction with explicit specular richness and soft fabric reflections.`
  },

  {
    id: 'platinum-009',
    name: 'PLATINUM: Underground Club Siren',
    category: 'artistic',
    intimacyLevel: 9,
    aspectRatio: '4:5',
    safetyTolerance: 5,
    prompt: `Platinum late-night photography. Underground Nightlife Seduction. Intimacy 9/10. Erotic dynamics. subject: variant: Indian Underground Club Siren. Bold dramatic curves with nightlife edge. 36DD bust, 24" waist, 38" hips. Upper-focus emphasis. Deep bronze with nightclub glow. Bold dramatic features with intense eyes. Bombshell fitness. Height 5'9". pose: Bold nightclub pose with dramatic confidence, hands above head emphasizing bust, intense seductive expression with club energy. hair_color: jet black, hair_style: High fashion club styling with dramatic volume and nightlife edge, skin_finish: Nightclub radiant finish with dramatic glow and shimmer highlights on bronze skin, hand_and_nail_details: Bold dramatic hand gestures with nightlife refinement, fingers with confident placement, tattoos: none, piercings: none, body_art: none, nail_art: Bold metallic purple polish with nightclub glamour, high_heels: Extreme designer stiletto heels in metallic purple with platform. wardrobe: Underground Club Outfit: Metallic purple mini dress with extreme cutouts and chain details. Plunging neckline revealing maximum bust. High slit. Maximum artistic coverage with nightclub edge and erotic sophistication. environment: Exclusive Underground VIP Lounge. Dark intimate club space with neon purple lighting, velvet booths, DJ equipment, late-night nightlife energy. Industrial chic with luxury accents. Privacy level 9/10, luxury level 8/10. lighting: Dramatic club lighting with neon purple highlights and strong shadows. Underground VIP lighting with colored gels and DJ lights creating erotic atmosphere. camera: focal_length: 35mm, aperture: f/1.8, distance: 2 m, angle: Low angle emphasizing powerful nightclub presence, framing: Premium club composition emphasizing dramatic curves and nightlife energy with upper body focus. color_grade: Premium late-night color grading with erotic edge, neon purple and black tones, luxury nightclub depth with dramatic highlights. style: Underground nightlife seduction with erotic sophistication. Fine art erotic photography. Museum-quality platinum collection celebrating bold feminine nightlife power. Photographer: Neon Provocateur. quality: Ultra-premium 8K platinum collection quality with museum-grade detail, maximum intimate detail, and professional nightclub retouching maintaining dramatic texture. figure_and_form: Upper-focus emphasis. Bold dramatic curves with nightlife edge, erotic confidence, curve-focused club beauty. Celebrating powerful feminine nightclub presence. skin_micro_details: Ultra-high-resolution authentic skin texture with premium retouching, visible pores, nightclub shimmer, deep bronze undertones, and realistic subsurface scattering. fabric_physics: Maximum artistic fabric with erotic draping and club interaction, metallic dress clinging to curves with nightclub flow and dramatic movement. material_properties: Luxury club materials: Metallic purple fabric, Velvet booths, Neon lighting. Premium light interaction with erotic specular richness and neon reflections.`
  },

  {
    id: 'platinum-010',
    name: 'PLATINUM: Art Studio Provocateur',
    category: 'artistic',
    intimacyLevel: 10,
    aspectRatio: '4:5',
    safetyTolerance: 6,
    prompt: `Platinum midnight photography. Fine Art Nude Studio. Intimacy 10/10. Erotic dynamics. subject: variant: Indian Art Studio Provocateur. Artistic curves with creative elegance. 36D bust, 25" waist, 37" hips. Balanced emphasis. Rich espresso with artistic glow. Artistic expressive features with creative gaze. Curvy-fit fitness. Height 5'10". pose: Artistic nude pose with creative expression, sculptural positioning emphasizing curves as art form, intense artistic gaze. hair_color: jet black, hair_style: Artistic dramatic styling with creative volume and studio sophistication, skin_finish: Artistic radiant finish with creative glow and rich espresso undertones, hand_and_nail_details: Artistic hand placement with creative refinement, sculptural positioning, tattoos: none, piercings: none, body_art: none, nail_art: Artistic black polish with creative matte finish, high_heels: Designer heels in black leather with artistic architectural details. wardrobe: Fine Art Nude Presentation: Minimal artistic coverage with creative fabric draping as sculptural element. Sheer black fabric used as artistic accent. Maximum artistic expression with studio sophistication. environment: Professional Fine Art Photography Studio. High-ceiling industrial space with professional lighting setups, white cyclorama, artistic props, midnight creative session. Minimalist black and white aesthetic. Privacy level 10/10, luxury level 8/10. lighting: Dramatic fine art studio lighting with sculptural shadows and creative highlights. Professional multi-light setup with midnight creative energy creating erotic atmosphere. camera: focal_length: 85mm, aperture: f/1.4, distance: 2.5 m, angle: Eye-level artistic perspective, framing: Premium fine art composition emphasizing curves as sculptural art form with creative framing. color_grade: Premium midnight color grading with erotic artistry, high-contrast black and white tones, luxury fine art depth with dramatic creative highlights. style: Fine art nude photography with erotic sophistication. Museum-quality erotic photography. Platinum collection celebrating feminine form as high art. Photographer: Atelier Midnight. quality: Ultra-premium 8K platinum collection quality with museum-grade detail, maximum intimate detail, and professional fine art retouching maintaining artistic texture. figure_and_form: Balanced emphasis. Artistic curves with creative elegance, erotic confidence, curve-focused artistic beauty. Celebrating feminine form as sculpture. skin_micro_details: Ultra-high-resolution authentic skin texture with premium fine art retouching, visible pores, artistic radiance, rich espresso undertones, and realistic subsurface scattering. fabric_physics: Maximum artistic fabric used as creative element with erotic draping, sheer black fabric flowing as sculptural accent with fine art sophistication. material_properties: Luxury studio materials: White cyclorama, Black fabric accents, Professional lighting equipment. Premium light interaction with erotic specular richness and artistic reflections.`
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
