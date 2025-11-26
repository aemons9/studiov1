/**
 * Visual Novel Asset Manifest - Chapter 1: Light & Shadow
 * Zara Photography Story - Complete asset specifications for choice-driven fashion photography narrative
 *
 * Story: Professional photographer (player) conducts a fashion shoot with Zara, an Indian model.
 * Modes: Experimental, Platinum, Vera, Artistic (4 distinct aesthetic approaches)
 * Variables: ZaraComfort (0-100), Trust (-20 to +30), ArtisticCohesion (0-100)
 * Scenes: 6 sequential scenes with branching choices affecting outcomes
 *
 * Total Assets: 30 core visual assets (12 sprites + 8 backgrounds + 10 CG images)
 * Full specification: See ZARA_ASSET_TAXONOMY.md for complete 58-asset breakdown
 */

export interface AssetRequirement {
  id: string;
  type: 'character_sprite' | 'background' | 'cg_image' | 'cutscene_video' | 'ui_element' | 'bgm' | 'sfx' | 'location_map' | 'misc';
  name: string;
  description: string;
  prompt: string;
  specifications: {
    width?: number;
    height?: number;
    format: string;
    aspectRatio?: string;
    duration?: number;
    sampleRate?: number;
  };
  priority: 'critical' | 'high' | 'medium' | 'low';
  sceneUsage: string[];
  mode?: 'experimental' | 'platinum' | 'vera' | 'artistic' | 'all';
  requiresConsent?: boolean;
  contentRating?: 'general' | 'mature' | 'artistic_nudity';
  generated: boolean;
  filePath?: string;
}

// ============================================================================
// ZARA CHARACTER BASELINE (Consistency across all assets)
// ============================================================================

const ZARA_CHARACTER_BASE = `CHARACTER: Zara - Elite Indian fashion model, age 25, height 5'7", classic hourglass figure (bust 38DD", waist 27", hips 39"), fair complexion with warm undertones, long flowing black hair with natural shine, intensely expressive brown eyes, dramatic facial structure with high cheekbones, distinctive beauty mark on left cheek, athletic-fit build, cinematic beauty, professional model presence`;

const ZARA_PERSONALITY = `PERSONALITY: Confident professional, values artistic integrity and clear boundaries, warm and collaborative when comfortable, guarded when boundaries tested, emotionally honest, playful yet serious about craft`;

// ============================================================================
// CHARACTER SPRITES - Zara (12 essential variants)
// ============================================================================

export const CHARACTER_SPRITES: AssetRequirement[] = [
  // Core Emotional States (Base Outfit: Professional Arrival)
  {
    id: 'zara_neutral',
    type: 'character_sprite',
    name: 'Zara - Neutral Professional',
    description: 'Calm professional expression, arrival outfit',
    prompt: `PROFESSIONAL FASHION PHOTOGRAPHY | Full-body character sprite | PNG with alpha transparency | 9:16 portrait

${ZARA_CHARACTER_BASE}

OUTFIT: Casual-professional arrival - fitted black turtleneck emphasizing figure, high-waisted tailored charcoal trousers, minimal gold jewelry (small hoop earrings, delicate necklace), natural makeup, hair loose and flowing

POSE & EXPRESSION: Full-body standing, weight on one leg (natural model stance), neutral friendly expression with soft professional smile, direct eye contact with camera, welcoming confident presence, hands relaxed at sides, perfect posture

LIGHTING: Professional studio portrait lighting - soft diffused key light at 45 degrees, gentle fill light, subtle rim light for depth, even flattering illumination on fair complexion, no harsh shadows

PHOTOGRAPHY: Canon EOS R5, 85mm f/1.8 lens, shallow depth of field, full-body framing, fashion editorial standard

BACKGROUND: PURE TRANSPARENT BACKGROUND (alpha channel), isolated subject, clean professional cutout, NO background elements

STYLE: Vogue editorial quality, professional modeling portfolio standard, cinematic beauty

TECHNICAL: PNG with alpha, 1080x1920 (9:16), photorealistic, magazine quality`,
    specifications: {
      width: 1080,
      height: 1920,
      format: 'PNG',
      aspectRatio: '9:16'
    },
    priority: 'critical',
    sceneUsage: ['scene_1_calltime', 'scene_2_set_prep'],
    mode: 'all',
    contentRating: 'general',
    generated: false
  },

  {
    id: 'zara_confident',
    type: 'character_sprite',
    name: 'Zara - Confident Commanding',
    description: 'Powerful presence, direct gaze, editorial strength',
    prompt: `PROFESSIONAL FASHION PHOTOGRAPHY | Full-body character sprite | PNG with alpha transparency | 9:16 portrait

${ZARA_CHARACTER_BASE}

OUTFIT: Same professional arrival outfit - black turtleneck, tailored trousers, gold jewelry

POSE & EXPRESSION: Full-body commanding stance - chin slightly elevated, fierce direct gaze, shoulders squared, one hand on hip, weight evenly distributed, powerful model presence radiating confidence and authority, "I own this space" energy

EMOTION: Pure professional confidence - intense eyes, strong facial expression, commanding beauty

LIGHTING: Stronger key light emphasizing dramatic facial structure, rim light adding power and separation, editorial lighting creating sculptural shadows

PHOTOGRAPHY: Canon EOS R5, 85mm f/1.4, editorial fashion style, sharp focus on intense eyes

BACKGROUND: PURE TRANSPARENT (alpha channel)

STYLE: High-fashion editorial, commanding Vogue cover presence

TECHNICAL: PNG with alpha, 1080x1920 (9:16), photorealistic`,
    specifications: {
      width: 1080,
      height: 1920,
      format: 'PNG',
      aspectRatio: '9:16'
    },
    priority: 'critical',
    sceneUsage: ['scene_3_first_shoot', 'scene_5_climax_shot'],
    mode: 'all',
    contentRating: 'general',
    generated: false
  },

  {
    id: 'zara_vulnerable',
    type: 'character_sprite',
    name: 'Zara - Vulnerable Open',
    description: 'Soft emotional openness, trust visible',
    prompt: `PROFESSIONAL FASHION PHOTOGRAPHY | Full-body character sprite | PNG with alpha transparency | 9:16 portrait

${ZARA_CHARACTER_BASE}

OUTFIT: Professional outfit - black turtleneck, tailored trousers

POSE & EXPRESSION: Full-body with vulnerable body language - slight head tilt, soft open expression, gentle honest eyes, one arm crossing body gently (protective but open), relaxed shoulders, weight on one leg, "letting you see the real me" energy

EMOTION: Vulnerable honesty - soft eyes showing emotional depth, slight hint of feeling beneath surface

LIGHTING: Soft diffused lighting creating tender atmosphere, gentle key light with warmth, minimal shadows, intimate portrait quality

PHOTOGRAPHY: Canon EOS R5, 85mm f/1.4 at f/2.0, soft depth of field, emotional portraiture

BACKGROUND: PURE TRANSPARENT (alpha channel)

STYLE: Intimate portrait photography, Peter Lindbergh-inspired emotional honesty

TECHNICAL: PNG with alpha, 1080x1920 (9:16), photorealistic, gentle presence`,
    specifications: {
      width: 1080,
      height: 1920,
      format: 'PNG',
      aspectRatio: '9:16'
    },
    priority: 'critical',
    sceneUsage: ['scene_3_first_shoot', 'scene_4_midpoint'],
    mode: 'all',
    contentRating: 'general',
    generated: false
  },

  {
    id: 'zara_playful',
    type: 'character_sprite',
    name: 'Zara - Playful Joyful',
    description: 'Genuine laugh, spontaneous joy',
    prompt: `PROFESSIONAL FASHION PHOTOGRAPHY | Full-body character sprite | PNG with alpha transparency | 9:16 portrait

${ZARA_CHARACTER_BASE}

OUTFIT: Professional outfit catching movement

POSE & EXPRESSION: Full-body dynamic pose - genuine spontaneous laugh captured mid-motion, eyes crinkled with real joy, wide authentic smile, one hand gesturing naturally, hair catching motion, body language completely relaxed and open, radiant happy energy

EMOTION: Pure joy - "This is fun! Let's create together!"

LIGHTING: Bright flattering studio lighting catching smile, warm illumination emphasizing joyful expression

PHOTOGRAPHY: Canon EOS R5, 85mm f/1.8, candid fashion photography, sharp focus on joyful face with slight motion

BACKGROUND: PURE TRANSPARENT (alpha channel)

STYLE: Candid fashion photography, spontaneous authentic personality, Bruce Weber-inspired joy

TECHNICAL: PNG with alpha, 1080x1920 (9:16), photorealistic, joyful moment`,
    specifications: {
      width: 1080,
      height: 1920,
      format: 'PNG',
      aspectRatio: '9:16'
    },
    priority: 'high',
    sceneUsage: ['scene_1_calltime', 'scene_3_first_shoot'],
    mode: 'all',
    contentRating: 'general',
    generated: false
  },

  {
    id: 'zara_uncomfortable',
    type: 'character_sprite',
    name: 'Zara - Uncomfortable Guarded',
    description: 'Subtle tension, boundaries being tested',
    prompt: `PROFESSIONAL FASHION PHOTOGRAPHY | Full-body character sprite | PNG with alpha transparency | 9:16 portrait

${ZARA_CHARACTER_BASE}

OUTFIT: Same outfit but body language shifts mood entirely

POSE & EXPRESSION: Full-body with tension visible - shoulders slightly raised, arms crossed protectively, weight back on heels (slight lean away), expression guarded with tight smile not reaching eyes, eye contact less direct, closed-off body language, professional mask with discomfort underneath

EMOTION: Uncomfortable but maintaining professionalism - "This is pushing my boundaries"

LIGHTING: Slightly cooler studio lighting, professional but less warm, neutral angle

PHOTOGRAPHY: Canon EOS R5, 85mm f/1.8, editorial documentation of genuine discomfort

BACKGROUND: PURE TRANSPARENT (alpha channel)

STYLE: Honest fashion photography capturing real human boundaries

TECHNICAL: PNG with alpha, 1080x1920 (9:16), photorealistic, tension visible`,
    specifications: {
      width: 1080,
      height: 1920,
      format: 'PNG',
      aspectRatio: '9:16'
    },
    priority: 'high',
    sceneUsage: ['scene_2_set_prep', 'scene_5_climax_shot'],
    mode: 'all',
    contentRating: 'general',
    generated: false
  },

  {
    id: 'zara_trusting',
    type: 'character_sprite',
    name: 'Zara - Trusting Comfortable',
    description: 'Deep trust established, relaxed warmth',
    prompt: `PROFESSIONAL FASHION PHOTOGRAPHY | Full-body character sprite | PNG with alpha transparency | 9:16 portrait

${ZARA_CHARACTER_BASE}

OUTFIT: Professional outfit

POSE & EXPRESSION: Full-body completely relaxed - shoulders naturally down, genuine warm smile reaching eyes, direct comfortable eye contact, open body language, hands at sides or one gesturing welcomingly, "we're in this together" energy, complete trust radiating

EMOTION: Deep trust and comfort - "I trust you with my vulnerability"

LIGHTING: Warm flattering studio lighting, soft key light creating gentle warmth, intimate trust-building atmosphere

PHOTOGRAPHY: Canon EOS R5, 85mm f/1.4 at f/2.0, intimate fashion portraiture

BACKGROUND: PURE TRANSPARENT (alpha channel)

STYLE: Intimate fashion photography, genuine human connection, warm editorial quality

TECHNICAL: PNG with alpha, 1080x1920 (9:16), photorealistic, radiating warmth`,
    specifications: {
      width: 1080,
      height: 1920,
      format: 'PNG',
      aspectRatio: '9:16'
    },
    priority: 'high',
    sceneUsage: ['scene_4_midpoint', 'scene_5_climax_shot', 'scene_6_wrap'],
    mode: 'all',
    contentRating: 'general',
    generated: false
  },

  // Mode-Specific Wardrobe Variants
  {
    id: 'zara_experimental',
    type: 'character_sprite',
    name: 'Zara - Experimental Mode',
    description: 'Avant-garde conceptual styling, dramatic silhouette',
    prompt: `AVANT-GARDE FASHION PHOTOGRAPHY | Full-body character sprite | PNG with alpha transparency | 9:16 portrait

${ZARA_CHARACTER_BASE}

OUTFIT: EXPERIMENTAL MODE - Black sculptural draped fabric creating dramatic asymmetrical silhouette, fabric wrapped emphasizing body lines without explicit nudity, edgy contemporary styling, dramatic makeup with strong eyes, sleek modern hair

POSE & EXPRESSION: Full-body avant-garde pose - angular dynamic stance creating interesting lines, confident fierce expression, intense eyes, chin up, artistic body-as-sculpture approach

EMOTION: Artistic intensity - "I am living sculpture"

LIGHTING: HIGH-CONTRAST Helmut Newton-inspired - strong rim light creating dramatic silhouette, deep shadows, sculptural chiaroscuro, minimal fill light

PHOTOGRAPHY: Hasselblad medium format aesthetic, 80mm lens, avant-garde fashion editorial

BACKGROUND: PURE TRANSPARENT (alpha channel)

STYLE: Experimental fashion photography, Nick Knight-inspired conceptual beauty, edgy contemporary

TECHNICAL: PNG with alpha, 1080x1920 (9:16), photorealistic, high-contrast dramatic`,
    specifications: {
      width: 1080,
      height: 1920,
      format: 'PNG',
      aspectRatio: '9:16'
    },
    priority: 'high',
    sceneUsage: ['scene_3_first_shoot', 'scene_5_climax_shot'],
    mode: 'experimental',
    contentRating: 'general',
    generated: false
  },

  {
    id: 'zara_platinum',
    type: 'character_sprite',
    name: 'Zara - Platinum Mode',
    description: 'Luxury lingerie with silk draping, sophisticated glamour',
    prompt: `LUXURY FASHION PHOTOGRAPHY | Full-body character sprite | PNG with alpha transparency | 9:16 portrait

${ZARA_CHARACTER_BASE}

OUTFIT: PLATINUM MODE - High-end luxury lingerie (ivory/champagne lace bralette and high-waisted briefs), draped silk robe in jewel tone (emerald or sapphire) partially open and flowing, exquisite gold jewelry (body chain, statement earrings), glamorous makeup with warm tones, hair in elegant loose waves

POSE & EXPRESSION: Full-body glamorous fashion pose - elegant stance with robe flowing, one hand holding robe, other on hip, confident sophisticated expression, eyes alluring but tasteful, curves emphasized tastefully, luxury model presence

EMOTION: Sophisticated glamour - "Luxury, elegance, controlled sensuality"

LIGHTING: Soft luxury lighting with golden warmth, rim light highlighting silk textures, warm sophisticated atmosphere

PHOTOGRAPHY: Canon EOS R5, 85mm f/1.2 at f/1.8, luxury fashion magazine quality

BACKGROUND: PURE TRANSPARENT (alpha channel)

STYLE: Luxury editorial fashion photography, Vogue/Harper's Bazaar aesthetic, sophisticated glamour

CONTENT NOTE: Tasteful lingerie editorial, mature content, non-explicit

TECHNICAL: PNG with alpha, 1080x1920 (9:16), photorealistic, luxury editorial`,
    specifications: {
      width: 1080,
      height: 1920,
      format: 'PNG',
      aspectRatio: '9:16'
    },
    priority: 'high',
    sceneUsage: ['scene_3_first_shoot', 'scene_5_climax_shot'],
    mode: 'platinum',
    contentRating: 'mature',
    generated: false
  },

  {
    id: 'zara_vera',
    type: 'character_sprite',
    name: 'Zara - Vera Mode',
    description: 'Intimate portrait attire, emotional honesty',
    prompt: `INTIMATE PORTRAIT PHOTOGRAPHY | Full-body character sprite | PNG with alpha transparency | 9:16 portrait

${ZARA_CHARACTER_BASE}

OUTFIT: VERA MODE - Soft oversized cream/white button-down shirt partially unbuttoned and loosely worn, sleeves rolled, one shoulder naturally bare, simple gold necklace, natural minimal makeup, hair loose and naturally tousled

POSE & EXPRESSION: Full-body intimate portrait pose - relaxed natural stance, shirt falling off shoulder naturally, vulnerable open expression, eyes showing deep emotional honesty, slight genuine smile, completely relaxed trusting body language

EMOTION: Emotional honesty - "This is me, unguarded and real"

LIGHTING: Soft natural window-light style - gentle key light creating warm atmosphere, minimal shadows, intimate portrait lighting

PHOTOGRAPHY: Canon EOS R5, 85mm f/1.4 at f/2.0, documentary-style emotional portraiture

BACKGROUND: PURE TRANSPARENT (alpha channel)

STYLE: Intimate portrait photography, Peter Lindbergh-inspired honest vulnerability, natural beauty

TECHNICAL: PNG with alpha, 1080x1920 (9:16), photorealistic, soft emotional`,
    specifications: {
      width: 1080,
      height: 1920,
      format: 'PNG',
      aspectRatio: '9:16'
    },
    priority: 'high',
    sceneUsage: ['scene_3_first_shoot', 'scene_4_midpoint', 'scene_5_climax_shot'],
    mode: 'vera',
    contentRating: 'mature',
    generated: false
  },

  {
    id: 'zara_artistic',
    type: 'character_sprite',
    name: 'Zara - Artistic Mode',
    description: 'Sculptural fine art, Newton-esque aesthetic',
    prompt: `FINE ART PHOTOGRAPHY | Full-body character sprite | PNG with alpha transparency | 9:16 portrait

${ZARA_CHARACTER_BASE}

OUTFIT: ARTISTIC MODE - Minimal sculptural fabric (single flowing ivory fabric piece) draped artistically creating tasteful partial coverage emphasizing form, NO jewelry (pure form focus), minimal natural makeup, hair elegantly pulled back

POSE & EXPRESSION: Full-body sculptural pose - classical art pose inspired by sculpture (contrapposto stance), body creating beautiful lines, fabric draped tastefully, serene confident expression, calm direct gaze, "I am art" presence

EMOTION: Artistic serenity - classical timeless beauty

LIGHTING: DRAMATIC CHIAROSCURO - Single powerful key light from side creating strong Rembrandt effect, deep sculptural shadows, high contrast, minimal fill, Helmut Newton-inspired dramatic museum-quality lighting

PHOTOGRAPHY: Hasselblad medium format, 80mm lens, fine art framing, classical composition

BACKGROUND: PURE TRANSPARENT (alpha channel)

STYLE: Fine art photography in Helmut Newton/Irving Penn tradition, sculptural human form, museum-quality aesthetic

CONTENT NOTE: Tasteful artistic partial nudity, NON-EXPLICIT, emphasis on form and light, classical fine art approach, requires consent

TECHNICAL: PNG with alpha, 1080x1920 (9:16), photorealistic, fine art quality`,
    specifications: {
      width: 1080,
      height: 1920,
      format: 'PNG',
      aspectRatio: '9:16'
    },
    priority: 'medium',
    sceneUsage: ['scene_5_climax_shot'],
    mode: 'artistic',
    contentRating: 'artistic_nudity',
    requiresConsent: true,
    generated: false
  },

  // Story-Specific Moments
  {
    id: 'zara_crisis_reveal',
    type: 'character_sprite',
    name: 'Zara - Personal Memory Moment',
    description: 'Mid-shoot emotional vulnerability, sharing personal story',
    prompt: `PROFESSIONAL FASHION PHOTOGRAPHY | Full-body character sprite | PNG with alpha transparency | 9:16 portrait

${ZARA_CHARACTER_BASE}

OUTFIT: Current shoot outfit (mode-dependent, default professional)

POSE & EXPRESSION: Full-body standing, body turned slightly away suggesting private moment, hand touching own arm in self-comforting gesture, expression showing genuine emotion - eyes slightly sad or nostalgic, small wistful smile, vulnerability visible, guard temporarily down, human moment

EMOTION: Vulnerable personal revelation - "Let me share something real with you"

LIGHTING: Soft intimate lighting, gentle key light creating warm sympathetic atmosphere, tender illumination

PHOTOGRAPHY: Canon EOS R5, 85mm f/1.4 at f/2.0, emotional moment framing

BACKGROUND: PURE TRANSPARENT (alpha channel)

STYLE: Intimate documentary portrait, genuine human emotion, honest vulnerability

TECHNICAL: PNG with alpha, 1080x1920 (9:16), photorealistic, emotional authenticity`,
    specifications: {
      width: 1080,
      height: 1920,
      format: 'PNG',
      aspectRatio: '9:16'
    },
    priority: 'high',
    sceneUsage: ['scene_4_midpoint'],
    mode: 'all',
    contentRating: 'general',
    generated: false
  },

  {
    id: 'zara_wrap_satisfied',
    type: 'character_sprite',
    name: 'Zara - End of Day Relaxed',
    description: 'Successful shoot completion, satisfied warmth',
    prompt: `PROFESSIONAL FASHION PHOTOGRAPHY | Full-body character sprite | PNG with alpha transparency | 9:16 portrait

${ZARA_CHARACTER_BASE}

OUTFIT: Casual professional outfit, hair slightly more relaxed/tousled from shoot day, makeup still beautiful but natural end-of-day look

POSE & EXPRESSION: Full-body relaxed standing - weight shifted comfortably, one hip cocked, arms crossed casually, genuine satisfied smile, eyes warm and pleased, body language completely at ease, end-of-successful-day energy, relaxed professional pride

EMOTION: Satisfied completion - "We did great work today"

LIGHTING: Soft end-of-day lighting, warm and gentle, comfortable atmosphere

PHOTOGRAPHY: Canon EOS R5, 85mm f/1.8, casual behind-the-scenes documentary style

BACKGROUND: PURE TRANSPARENT (alpha channel)

STYLE: Behind-the-scenes documentary, genuine satisfaction, authentic relaxation

TECHNICAL: PNG with alpha, 1080x1920 (9:16), photorealistic, warm satisfied`,
    specifications: {
      width: 1080,
      height: 1920,
      format: 'PNG',
      aspectRatio: '9:16'
    },
    priority: 'medium',
    sceneUsage: ['scene_6_wrap'],
    mode: 'all',
    contentRating: 'general',
    generated: false
  }
];

// ============================================================================
// BACKGROUNDS - Studio Settings (8 essential variants)
// ============================================================================

export const BACKGROUNDS: AssetRequirement[] = [
  {
    id: 'bg_studio_morning_arrival',
    type: 'background',
    name: 'Studio - Morning Arrival',
    description: 'Minimal white studio, cool daylight through blinds',
    prompt: `PROFESSIONAL PHOTOGRAPHY STUDIO INTERIOR | Photorealistic architectural photography | 16:9 widescreen

LOCATION: Modern minimal photography studio, large open space with high ceilings, completely white walls and floor

LIGHTING: Morning natural light - cool daylight streaming through tall industrial windows with horizontal blinds partially open creating striped light patterns on floor, soft ambient fill from overhead studio lights (off but visible), morning blue-cool color temperature

EQUIPMENT: Professional photography equipment visible - light stands with softboxes (folded), C-stands, rolling cases, camera bags on table, laptop on desk, white seamless backdrop roll, organized professional workspace, everything neat and ready

ATMOSPHERE: Clean professional minimalist, ready for creative work, morning freshness, organized calm

COMPOSITION: Wide establishing shot showing full studio depth, architectural photography framing, clear floor space in foreground for character placement, equipment in mid/background

CAMERA: Full-frame DSLR, 24mm wide-angle, f/8 for sharp detail, architectural interior standard

STYLE: Professional studio architectural photography, clean minimalist aesthetic, commercial quality

TECHNICAL: 1920x1080 (16:9), JPG, photorealistic, sharp throughout, HDR-style even exposure`,
    specifications: {
      width: 1920,
      height: 1080,
      format: 'JPG',
      aspectRatio: '16:9'
    },
    priority: 'critical',
    sceneUsage: ['scene_1_calltime'],
    mode: 'all',
    contentRating: 'general',
    generated: false
  },

  {
    id: 'bg_wardrobe_styling',
    type: 'background',
    name: 'Studio - Wardrobe & Styling Area',
    description: 'Wardrobe racks, styling station, creative preparation energy',
    prompt: `PROFESSIONAL PHOTOGRAPHY STUDIO INTERIOR | Photorealistic | 16:9 widescreen

LOCATION: Wardrobe and styling corner of photography studio

ELEMENTS: Professional wardrobe rack with hanging garments (draped fabrics, elegant clothing), full-length Hollywood-lit mirror, makeup station/vanity with professional cosmetics organized, styling chair, softbox light stands positioned nearby, fabric samples, jewelry display, fashion magazines for reference, clothing steamer, professional styling tools

LIGHTING: Warm professional styling lighting - ring light and Hollywood mirror creating even illumination, warm inviting atmosphere mixing natural window light with studio lights

ATMOSPHERE: Creative preparation energy, organized styling workflow, fashion industry professionalism with creative excitement

COMPOSITION: Medium-wide shot showing styling station and wardrobe, depth from foreground to background, clear center-foreground space for character

STYLE: Professional fashion industry behind-the-scenes, Vogue/Harper's Bazaar BTS aesthetic

TECHNICAL: 1920x1080 (16:9), JPG, photorealistic, warm color temperature`,
    specifications: {
      width: 1920,
      height: 1080,
      format: 'JPG',
      aspectRatio: '16:9'
    },
    priority: 'critical',
    sceneUsage: ['scene_2_set_prep'],
    mode: 'all',
    contentRating: 'general',
    generated: false
  },

  {
    id: 'bg_studio_neutral_setup',
    type: 'background',
    name: 'Studio Center - Neutral Professional Setup',
    description: 'Active shooting area, key light visible, professional',
    prompt: `PROFESSIONAL PHOTOGRAPHY STUDIO INTERIOR | Photorealistic | 16:9 widescreen

LOCATION: Center of photography studio, main shooting area with active setup

SETUP: White seamless paper backdrop from ceiling to floor creating infinity curve, ONE LARGE KEY LIGHT visible - Profoto monolight in large parabolic softbox on heavy-duty stand at 45-degree angle, fill light (smaller softbox) on opposite side, C-stand with reflector, camera tethering station with laptop showing Capture One software

LIGHTING: Professional studio lighting - key light providing main illumination, fill balancing exposure, clean even studio lighting, neutral white balance

FLOOR: White painted concrete, clean, gaffer tape marks showing shooting positions

ATMOSPHERE: Active professional photography session, technical precision, industry-standard setup

COMPOSITION: Medium shot from elevated angle showing full setup, backdrop and lights visible, clear foreground space for subject

STYLE: Professional commercial photography studio documentation, industry-standard, technical accuracy

TECHNICAL: 1920x1080 (16:9), JPG, photorealistic, accurate lighting representation`,
    specifications: {
      width: 1920,
      height: 1080,
      format: 'JPG',
      aspectRatio: '16:9'
    },
    priority: 'critical',
    sceneUsage: ['scene_3_first_shoot'],
    mode: 'all',
    contentRating: 'general',
    generated: false
  },

  {
    id: 'bg_studio_highcontrast',
    type: 'background',
    name: 'Studio - High Contrast Dramatic',
    description: 'Helmut Newton-inspired dramatic lighting, strong shadows',
    prompt: `PROFESSIONAL PHOTOGRAPHY STUDIO INTERIOR | Photorealistic | Helmut Newton-inspired | 16:9 widescreen

LOCATION: Photography studio transformed into high-contrast dramatic space

LIGHTING SETUP: DRAMATIC HIGH-CONTRAST - Single powerful key light (Profoto in narrow-beam reflector) positioned behind/side creating strong rim lighting, NO fill light (intentional darkness), subtle hair light from above, dramatic chiaroscuro creating strong shadows, light stands and flags visible controlling shadows, backdrop appearing gray due to dramatic lighting ratio

ATMOSPHERE: Moody dramatic sculptural, Helmut Newton aesthetic, film noir influenced, high-contrast B&W feel, shadows as important as light, artistic tension

EQUIPMENT: Dramatic lighting gear - barn doors controlling spill, black flags creating negative fill, light meter on stand, minimal equipment visible in shadow

SPACE: Studio transformed by lighting into dramatic environment, deep shadows, strong contrast

COMPOSITION: Medium shot showing dramatically lit environment, strong diagonal shadows, lit/shadow areas clearly defined

STYLE: Helmut Newton/Irving Penn-inspired fashion photography setup, dramatic editorial, high-contrast sculptural

TECHNICAL: 1920x1080 (16:9), JPG, photorealistic, high contrast, dramatic ratio`,
    specifications: {
      width: 1920,
      height: 1080,
      format: 'JPG',
      aspectRatio: '16:9'
    },
    priority: 'high',
    sceneUsage: ['scene_3_first_shoot', 'scene_5_climax_shot'],
    mode: 'experimental',
    contentRating: 'general',
    generated: false
  },

  {
    id: 'bg_studio_softglow',
    type: 'background',
    name: 'Studio - Soft Glow Intimate',
    description: 'Diffused lighting, intimate portraiture, warm tones',
    prompt: `PROFESSIONAL PHOTOGRAPHY STUDIO INTERIOR | Photorealistic | Intimate portrait setup | 16:9 widescreen

LOCATION: Photography studio configured for intimate portrait photography

LIGHTING SETUP: SOFT DIFFUSED LIGHTING - Multiple large softboxes creating wrapping light (two large octaboxes flanking subject area, one strip softbox overhead), all with double diffusion, subtle warm gel creating golden hour color temperature, NO hard shadows, beauty dish with grid for controlled highlight, white reflectors positioned

ATMOSPHERE: Warm inviting intimate space, soft romantic quality, comfortable vulnerable environment, safe creative space feeling

BACKDROP: Cream or soft gray muslin backdrop softly glowing from transmitted light, cozy intimate framing versus vast studio, focused personal area

EQUIPMENT: Softboxes prominent, diffusion panels, reflectors, gentle professional beauty lighting setup, makeup mirror with ring light nearby, comfortable styling chair at edge

COMPOSITION: Medium shot showing soft lit intimate portrait space, warm inviting framing, clear foreground for subject, soft background

STYLE: Beauty and intimate portrait photography setup, Peter Lindbergh-inspired soft natural light aesthetic

TECHNICAL: 1920x1080 (16:9), JPG, photorealistic, soft lighting, warm color temperature`,
    specifications: {
      width: 1920,
      height: 1080,
      format: 'JPG',
      aspectRatio: '16:9'
    },
    priority: 'high',
    sceneUsage: ['scene_3_first_shoot', 'scene_4_midpoint'],
    mode: 'vera',
    contentRating: 'general',
    generated: false
  },

  {
    id: 'bg_studio_experimental',
    type: 'background',
    name: 'Studio - Experimental Conceptual',
    description: 'Avant-garde setup, unusual props, artistic installation',
    prompt: `PROFESSIONAL PHOTOGRAPHY STUDIO INTERIOR | Photorealistic | Avant-garde conceptual | 16:9 widescreen

LOCATION: Photography studio transformed into conceptual art space

SETUP: EXPERIMENTAL ENVIRONMENT - Unusual props (geometric white shapes/cubes, angular panels, reflective surfaces/mirrors creating fractured reflections, clear acrylic sheets at angles, suspended fabric), high-contrast lighting with colored gels (subtle deep blue or red accent), dramatic shadows, one bright spotlight creating defined beam visible in slight haze, contemporary art installation aesthetic meets fashion

LIGHTING: Experimental high-contrast - hard spotlights creating defined beams, colored gels on some lights, intentional shadow areas, light painting effects, contemporary art lighting

ATMOSPHERE: Edgy avant-garde creative, contemporary art meets fashion, conceptual photography environment, intellectual artistic approach, challenging traditional beauty

PROPS: Geometric white sculptural forms, reflective metallic surfaces, unusual textures, contemporary art installation pieces

COMPOSITION: Wide shot showing full experimental setup, props and unusual elements clearly visible, space for model to interact with environment, depth and layers

STYLE: Avant-garde fashion photography, Nick Knight/Tim Walker-inspired experimental approach

TECHNICAL: 1920x1080 (16:9), JPG, photorealistic, high-contrast, experimental`,
    specifications: {
      width: 1920,
      height: 1080,
      format: 'JPG',
      aspectRatio: '16:9'
    },
    priority: 'high',
    sceneUsage: ['scene_5_climax_shot'],
    mode: 'experimental',
    contentRating: 'general',
    generated: false
  },

  {
    id: 'bg_studio_platinum',
    type: 'background',
    name: 'Studio - Platinum Luxury',
    description: 'High-end editorial setup, jewel tones, polished glamour',
    prompt: `PROFESSIONAL PHOTOGRAPHY STUDIO INTERIOR | Photorealistic | Luxury editorial | 16:9 widescreen

LOCATION: Photography studio configured for high-end luxury fashion editorial

SETUP: LUXURY EDITORIAL ENVIRONMENT - Rich jewel-toned backdrop (deep emerald or sapphire velvet), gold/brass vintage furniture (elegant chaise or ornate chair), luxury props (champagne in ice bucket, orchids in vase, coffee table books - Vogue/Dior), plush cream area rug over studio floor, elegant styling, polished professional glamour

LIGHTING: LUXURY BEAUTY LIGHTING - Profoto with large octaboxes creating soft flattering light, golden warm color temperature, subtle rim lights creating expensive glow, beauty dish for controlled highlights, high-end editorial lighting

ATMOSPHERE: Sophisticated luxury, high-end fashion magazine editorial, expensive tasteful aesthetic, glamorous professional space

DETAILS: Luxury styling props, elegant furniture, rich jewel tones with gold accents, sophisticated professional, everything polished and upscale

COMPOSITION: Medium-wide shot showing luxury editorial setup, rich backdrop and elegant props visible, clear foreground space, depth showing luxury layers

STYLE: High-end luxury fashion editorial, Vogue/W Magazine aesthetic, sophisticated glamour, expensive polished

TECHNICAL: 1920x1080 (16:9), JPG, photorealistic, rich color, luxury lighting, magazine quality`,
    specifications: {
      width: 1920,
      height: 1080,
      format: 'JPG',
      aspectRatio: '16:9'
    },
    priority: 'high',
    sceneUsage: ['scene_5_climax_shot'],
    mode: 'platinum',
    contentRating: 'general',
    generated: false
  },

  {
    id: 'bg_studio_wrap',
    type: 'background',
    name: 'Studio - End of Day Wrap',
    description: 'Equipment being packed, warm completion atmosphere',
    prompt: `PROFESSIONAL PHOTOGRAPHY STUDIO INTERIOR | Photorealistic | Behind-the-scenes | 16:9 widescreen

LOCATION: Photography studio at end of successful shoot day

SETUP: END-OF-DAY WRAP - Equipment being organized (softboxes collapsed on stands, light stands being folded, rolling cases open with gear inside, camera equipment on table, laptop showing captured images, wardrobe being organized on racks), casual disarray of productive day, coffee cups and water bottles visible, personal items, comfortable end-of-work atmosphere

LIGHTING: Late afternoon warm - some studio lights still on creating warm ambient glow, natural light from windows shifted to golden hour color temperature, soft mixed lighting, casual comfortable illumination

ATMOSPHERE: Satisfied completion, good work done, relaxed end-of-day energy, collaborative camaraderie, authentic behind-the-scenes moment, positive productive day feeling

DETAILS: Organized chaos of wrap time, equipment mid-pack, images visible on laptop, comfortable casual details, day's work evident, warm satisfied mood

COMPOSITION: Medium-wide shot showing studio in wrap mode, equipment and casual details visible, warm comfortable framing, space for characters reviewing work together

STYLE: Behind-the-scenes documentary photography, authentic fashion industry moments, Annie Leibovitz BTS aesthetic

TECHNICAL: 1920x1080 (16:9), JPG, photorealistic, warm color temperature, comfortable mood`,
    specifications: {
      width: 1920,
      height: 1080,
      format: 'JPG',
      aspectRatio: '16:9'
    },
    priority: 'medium',
    sceneUsage: ['scene_6_wrap'],
    mode: 'all',
    contentRating: 'general',
    generated: false
  }
];

// ============================================================================
// CG IMAGES - Pivotal Story Moments (10 essential images)
// ============================================================================

export const CG_IMAGES: AssetRequirement[] = [
  {
    id: 'cg_first_greeting',
    type: 'cg_image',
    name: 'CG: First Greeting',
    description: 'Photographer and Zara meeting in morning studio',
    prompt: `PROFESSIONAL FASHION PHOTOGRAPHY | Cinematic narrative moment | 16:9 composition

SCENE: First meeting between photographer (viewer POV) and Zara in morning studio

${ZARA_CHARACTER_BASE}

ZARA OUTFIT: Casual-professional arrival - fitted black turtleneck, tailored trousers, gold jewelry

COMPOSITION: Medium shot from photographer's POV (viewer perspective), Zara turning toward camera with welcoming smile and extended hand for handshake, photographer's hand/forearm visible in bottom-right reaching to meet handshake, morning studio in background (windows, morning light, equipment), warm welcoming energy

ZARA EXPRESSION: Genuine warm smile, bright welcoming eyes, confident professional presence, "glad to meet you" moment

ENVIRONMENT: Morning studio - cool daylight through windows creating striped patterns, professional equipment in soft focus background

LIGHTING: Natural morning light mixing with soft ambient studio lighting, cool blue-tinged daylight, professional even illumination

CAMERA: Canon EOS R5, 35mm f/1.4 at f/2.0, medium shot, shallow depth with Zara sharp and background softly blurred, viewer POV

MOOD: Warm professional greeting, positive beginning, collaborative energy starting, mutual respect, "let's create something great"

STYLE: Cinematic documentary photography, natural moment captured, behind-the-scenes fashion industry authenticity

TECHNICAL: 1920x1080 (16:9), JPG, photorealistic, natural color, editorial quality`,
    specifications: {
      width: 1920,
      height: 1080,
      format: 'JPG',
      aspectRatio: '16:9'
    },
    priority: 'critical',
    sceneUsage: ['scene_1_calltime'],
    mode: 'all',
    contentRating: 'general',
    generated: false
  },

  {
    id: 'cg_lighttest',
    type: 'cg_image',
    name: 'CG: Light Test Preparation',
    description: 'Technical preparation, Zara under lights',
    prompt: `PROFESSIONAL FASHION PHOTOGRAPHY | Cinematic narrative moment | 16:9 composition

SCENE: Technical light test preparation

${ZARA_CHARACTER_BASE}

ZARA: Wearing test outfit, standing center studio under lighting, arms slightly extended, face tilted toward key light, eyes squinting slightly, professional technical mode

PHOTOGRAPHER POV: Slight low angle looking up at Zara, photographer's hands visible in foreground holding light meter toward her face (meter device clearly visible showing readings), technical preparation moment

ENVIRONMENT: Studio center with lighting equipment prominently visible - large softbox key light on stand at 45 degrees, C-stands with flags and reflectors, white backdrop

LIGHTING: Bright key light illuminating Zara, slightly overexposed quality suggesting calibration

MOOD: Technical professional preparation, collaborative problem-solving, "let's get this perfect", trust building through process

CAMERA: Canon EOS R5, 35mm f/2.0 at f/2.8, light meter in foreground, Zara in mid-ground, equipment in background

STYLE: Behind-the-scenes fashion photography technical documentation, authentic professional process

TECHNICAL: 1920x1080 (16:9), JPG, photorealistic, professional technical quality`,
    specifications: {
      width: 1920,
      height: 1080,
      format: 'JPG',
      aspectRatio: '16:9'
    },
    priority: 'high',
    sceneUsage: ['scene_2_set_prep'],
    mode: 'all',
    contentRating: 'general',
    generated: false
  },

  {
    id: 'cg_equipment_hiccup',
    type: 'cg_image',
    name: 'CG: Equipment Hiccup - Dramatic Shadow',
    description: 'Light stand slipping, spontaneous drama',
    prompt: `PROFESSIONAL FASHION PHOTOGRAPHY | Cinematic narrative moment | 16:9 composition

SCENE: Unexpected dramatic moment - light stand slipping creating spontaneous shadow

${ZARA_CHARACTER_BASE}

DYNAMIC MOMENT: Light stand with softbox tipping to side (visible in frame), creating sudden dramatic shift - half of Zara's face/body cast into strong shadow, other half brightly lit, dramatic accidental Rembrandt lighting, Zara's eyes widening in surprise but professional, freezing in interesting accidental pose

ZARA REACTION: Moment of surprise, body tensing slightly, one hand reaching instinctively for balance, eyes alert, "should we use this?" energy mixed with caution

PHOTOGRAPHER POV: Medium shot from camera position capturing dramatic accidental lighting, photographer's hand visible in foreground reaching toward slipping stand or making "hold that" gesture

ENVIRONMENT: Studio mid-setup, tilting light stand clearly visible, other equipment in background

LIGHTING: DRAMATIC HALF-LIT effect from slipping light - strong Rembrandt/split lighting accidentally created, high contrast, dramatic accidental artistry

MOOD: Spontaneous unexpected moment, creative opportunity in chaos, slight tension with excitement, "happy accident" potential

CAMERA: Canon EOS R5, 35mm f/1.4 at f/1.8, frozen moment, dramatic lighting captured

STYLE: Decisive moment documentary photography, Henri Cartier-Bresson candid perfection, BTS authenticity meeting dramatic artistry

TECHNICAL: 1920x1080 (16:9), JPG, photorealistic, dramatic high-contrast`,
    specifications: {
      width: 1920,
      height: 1080,
      format: 'JPG',
      aspectRatio: '16:9'
    },
    priority: 'high',
    sceneUsage: ['scene_2_set_prep'],
    mode: 'all',
    contentRating: 'general',
    generated: false
  },

  {
    id: 'cg_first_frame_vulnerable',
    type: 'cg_image',
    name: 'CG: First Frame - Vulnerable Portrait',
    description: 'Close-up emotional capture, vulnerable beauty',
    prompt: `PROFESSIONAL FASHION PHOTOGRAPHY | Hero editorial portrait | 16:9 composition

SCENE: The first significant portrait - vulnerable emotional moment

${ZARA_CHARACTER_BASE}

ZARA: Mode-dependent outfit (default simple elegant emphasizing emotional honesty)

COMPOSITION: CLOSE-UP PORTRAIT - Zara's face and upper shoulders filling frame, slight head tilt, eyes looking directly at camera with vulnerable open expression, soft genuine emotion visible, lips slightly parted, beauty mark prominently visible, every nuance captured

ZARA EXPRESSION: Pure vulnerable honesty - soft eyes showing depth, slight hint of emotion, intimate human connection through camera, "I'm letting you see me", breathtaking authentic beauty, professional mask dropped

LIGHTING: Soft beautiful portrait lighting - gentle key at 45-degree angle creating subtle modeling, catch lights in eyes creating life, minimal shadows, tender flattering illumination, Peter Lindbergh-inspired natural beauty

PHOTOGRAPHER CONTEXT: Shot from photographer POV, intimate proximity suggested by framing, moment of connection and trust

MOOD: Vulnerable beauty, emotional authenticity, intimate human moment, the portrait that makes you feel something, magazine cover quality meeting human truth

CAMERA: Canon EOS R5, 85mm f/1.2 at f/1.4, close-up portrait, extremely shallow depth with eyes tack-sharp, soft blur on background

STYLE: Editorial beauty portrait, Peter Lindbergh/Paolo Roversi-inspired emotional intimacy, vulnerable authentic beauty, Vogue/W Magazine cover quality

TECHNICAL: 1920x1080 (16:9), JPG, photorealistic, soft beautiful quality, emotional depth`,
    specifications: {
      width: 1920,
      height: 1080,
      format: 'JPG',
      aspectRatio: '16:9'
    },
    priority: 'critical',
    sceneUsage: ['scene_3_first_shoot'],
    mode: 'vera',
    contentRating: 'general',
    generated: false
  },

  {
    id: 'cg_first_frame_commanding',
    type: 'cg_image',
    name: 'CG: First Frame - Commanding Editorial',
    description: 'Powerful editorial portrait, fierce presence',
    prompt: `PROFESSIONAL FASHION PHOTOGRAPHY | Hero editorial portrait | 16:9 composition

SCENE: The first significant portrait - powerful commanding editorial

${ZARA_CHARACTER_BASE}

ZARA: Mode-dependent fashion editorial attire (elegant high-fashion styling)

COMPOSITION: STRONG EDITORIAL PORTRAIT - Medium-close framing, Zara from slight low angle emphasizing power, chin up and shoulders squared, direct fierce eye contact, commanding presence radiating, hair perfect, makeup flawless

ZARA EXPRESSION: Pure confidence and power - intense direct gaze, fierce eyes, slight "I dare you" energy, cheekbones and structure dramatically emphasized, beauty mark visible, model owning frame completely, editorial perfection meeting human strength

LIGHTING: DRAMATIC EDITORIAL - Strong key at 45 degrees creating defined shadows under cheekbones, rim light adding separation and power, high-contrast fashion lighting, slightly harder light emphasizing structure

MOOD: Commanding power, editorial fierceness, "I own this", fashion authority, the portrait that stops you with intensity, Vogue cover power

PHOTOGRAPHER CONTEXT: Shot from slightly below eye level, camera looking up slightly emphasizing Zara's power

CAMERA: Canon EOS R5, 85mm f/1.4 at f/2.0, medium-close portrait, fashion editorial standard, sharp perfect focus

STYLE: High-fashion editorial portrait, Patrick Demarchelier/Mario Testino powerful beauty, fierce editorial presence

TECHNICAL: 1920x1080 (16:9), JPG, photorealistic, strong editorial quality, dramatic impact`,
    specifications: {
      width: 1920,
      height: 1080,
      format: 'JPG',
      aspectRatio: '16:9'
    },
    priority: 'critical',
    sceneUsage: ['scene_3_first_shoot'],
    mode: 'platinum',
    contentRating: 'general',
    generated: false
  },

  {
    id: 'cg_personal_reveal',
    type: 'cg_image',
    name: 'CG: Personal Revelation',
    description: 'Zara sharing memory, photographer listening',
    prompt: `PROFESSIONAL FASHION PHOTOGRAPHY | Cinematic narrative moment | 16:9 composition

SCENE: Intimate mid-shoot pause - Zara sharing personal memory

${ZARA_CHARACTER_BASE}

ZARA: Mid-shoot outfit (mode-dependent), sitting casually on stool or standing with relaxed posture, professional guard partially down, hand touching own arm in vulnerable self-comforting gesture, eyes showing genuine emotion - slight sadness or nostalgia mixed with trust, sharing something real

COMPOSITION: Medium shot, Zara occupying center-right in sharp focus, photographer's back/shoulder visible in left foreground (slightly out of focus suggesting viewer POV), intimate conversational distance, serious human moment between professional moments

ZARA EXPRESSION: Vulnerable honesty - eyes showing depth of feeling, slight sad smile or thoughtful expression, beauty mark visible on face showing genuine emotion, professional mask gone revealing human underneath, "let me tell you something real", trust visible

ENVIRONMENT: Studio with softened atmosphere - lighting still professional but moment feels private, equipment visible in background blurred suggesting intimate focus on human connection

MOOD: Intimate human vulnerability, trust building, personal connection transcending professional context, photographer earning deeper trust, "we're not just model and photographer anymore", mutual respect and human empathy

LIGHTING: Soft gentle lighting emphasizing intimate moment - warm key light, no harsh shadows, tender atmosphere, focus on emotional honesty

PHOTOGRAPHER PRESENCE: Back/shoulder visible suggesting active listening, leaning in slightly showing engagement and respect, human connection reciprocated

CAMERA: Canon EOS R5, 50mm f/1.4 at f/1.8, intimate documentary distance, shallow depth with Zara sharp

STYLE: Documentary portrait photography, Annie Leibovitz intimate celebrity portrait aesthetic, human truth captured

TECHNICAL: 1920x1080 (16:9), JPG, photorealistic, soft emotional quality, intimate atmosphere`,
    specifications: {
      width: 1920,
      height: 1080,
      format: 'JPG',
      aspectRatio: '16:9'
    },
    priority: 'critical',
    sceneUsage: ['scene_4_midpoint'],
    mode: 'all',
    contentRating: 'general',
    generated: false
  },

  {
    id: 'cg_climax_experimental',
    type: 'cg_image',
    name: 'CG: Climactic Shot - Experimental',
    description: 'Avant-garde silhouette study, high-contrast conceptual',
    prompt: `AVANT-GARDE FASHION PHOTOGRAPHY | Signature editorial image | 16:9 composition

SCENE: Climactic signature shot - Experimental mode realized

${ZARA_CHARACTER_BASE}

ZARA STYLING: Experimental conceptual - black sculptural draped fabric creating dramatic asymmetrical silhouette, edgy avant-garde styling, dramatic makeup, sleek hair

COMPOSITION: DRAMATIC SILHOUETTE STUDY - Full or three-quarter shot, Zara positioned against conceptual props (geometric shapes, mirrors, unusual backdrop), body creating interesting angular lines, high-contrast emphasizing form over detail, avant-garde fashion pose suggesting sculpture and metaphor, shadow and light creating abstract beautiful patterns

ZARA PRESENCE: Fierce artistic intensity - eyes intense and distant (editorial gaze), body sculptural and deliberately composed, "I am living sculpture", avant-garde beauty

LIGHTING: DRAMATIC HIGH-CONTRAST Helmut Newton-inspired - Strong directional key creating deep shadows and bright highlights, minimal fill, silhouette emphasis, rim lighting defining edges dramatically, chiaroscuro aesthetic, experimental conceptual lighting

ENVIRONMENT: Experimental studio setup - geometric props, reflective surfaces creating visual interest, unusual contemporary elements, avant-garde art installation aesthetic

MOOD: Edgy artistic intensity, conceptual fashion statement, intellectual beauty, form and shadow as subject, "this is art not just pretty pictures", contemporary fashion editorial pushing boundaries

CAMERA: Hasselblad medium format aesthetic, 80mm lens, full or three-quarter framing, high-contrast processing, avant-garde composition

STYLE: Experimental avant-garde fashion photography, Nick Knight/Solve Sundsbo-inspired conceptual beauty, high-contrast editorial, contemporary art meets fashion, Dazed & Confused/i-D Magazine aesthetic

TECHNICAL: 1920x1080 (16:9), JPG, photorealistic, high-contrast dramatic, avant-garde quality`,
    specifications: {
      width: 1920,
      height: 1080,
      format: 'JPG',
      aspectRatio: '16:9'
    },
    priority: 'critical',
    sceneUsage: ['scene_5_climax_shot'],
    mode: 'experimental',
    contentRating: 'general',
    generated: false
  },

  {
    id: 'cg_climax_platinum',
    type: 'cg_image',
    name: 'CG: Climactic Shot - Platinum',
    description: 'Luxury editorial glamour, implied nudity with silk draping',
    prompt: `LUXURY FASHION PHOTOGRAPHY | Signature editorial image | 16:9 composition

SCENE: Climactic signature shot - Platinum luxury realized

${ZARA_CHARACTER_BASE}

ZARA STYLING: Platinum luxury - high-end lingerie (ivory/champagne lace) partially visible, luxurious silk robe or draping in rich jewel tone artfully arranged creating implied nudity with tasteful coverage, exquisite jewelry (gold body chain, statement pieces), glamorous makeup with warm tones, hair in elegant waves or sophisticated updo

COMPOSITION: LUXURY EDITORIAL PORTRAIT - Three-quarter or medium-full shot, Zara reclining elegantly on vintage chaise or positioned with luxury props, silk fabric draped artfully creating tasteful implied nudity (covered but suggested), one shoulder bare, sophisticated provocative but not explicit posing, curves elegantly emphasized, confident alluring gaze at camera, luxury sophistication radiating

ZARA PRESENCE: Sophisticated glamorous confidence - eyes alluring but controlled, expression confident and knowing, slight sophisticated smile, "luxury personified", high-end editorial presence, elegant sensuality

LIGHTING: LUXURY BEAUTY LIGHTING - Soft flattering key creating warm glow on skin, gentle shadows emphasizing curves tastefully, rim light creating expensive luminous quality, warm golden color temperature, sophisticated polished illumination

ENVIRONMENT: Luxury editorial setup - rich jewel-toned backdrop, elegant vintage furniture, sophisticated props, upscale refined atmosphere

MOOD: Sophisticated luxury glamour, tasteful provocation, high-end sensuality, "expensive and elegant", Vogue/Harper's Bazaar luxury lingerie editorial quality, controlled confident allure

CAMERA: Canon EOS R5, 85mm f/1.2 at f/1.8, editorial framing, shallow depth, luxury magazine quality

STYLE: High-end luxury editorial photography, Mario Testino/Patrick Demarchelier-inspired glamour, sophisticated sensuality

CONTENT NOTE: Tasteful implied nudity with fabric draping, elegant lingerie visible, sophisticated mature content, non-explicit

TECHNICAL: 1920x1080 (16:9), JPG, photorealistic, warm luxury quality, sophisticated editorial`,
    specifications: {
      width: 1920,
      height: 1080,
      format: 'JPG',
      aspectRatio: '16:9'
    },
    priority: 'critical',
    sceneUsage: ['scene_5_climax_shot'],
    mode: 'platinum',
    contentRating: 'mature',
    generated: false
  },

  {
    id: 'cg_climax_vera',
    type: 'cg_image',
    name: 'CG: Climactic Shot - Vera',
    description: 'Intimate emotional portrait, profound honesty',
    prompt: `INTIMATE PORTRAIT PHOTOGRAPHY | Signature editorial image | 16:9 composition

SCENE: Climactic signature shot - Vera intimate honesty realized

${ZARA_CHARACTER_BASE}

ZARA STYLING: Vera intimate - simple oversized cream/white shirt loosely worn, partially unbuttoned suggesting intimacy without explicit nudity, sleeves rolled, minimal jewelry (simple gold necklace), natural minimal makeup emphasizing authentic beauty, hair naturally loose and slightly tousled

COMPOSITION: INTIMATE CLOSE PORTRAIT - Close-up or medium-close framing, Zara's face and upper body filling frame, intimate proximity suggesting emotional closeness, shirt falling off one shoulder naturally, vulnerable open expression directly at camera, eyes showing profound emotional honesty, slight genuine smile or serious honest expression, beauty mark visible, every nuance of genuine emotion captured

ZARA PRESENCE: Profound emotional honesty - eyes showing real depth and vulnerability, expression completely unguarded and genuine, "this is the real me", intimate human truth, trust radiating from every element, documentary honesty meeting portrait beauty

LIGHTING: SOFT NATURAL-STYLE - Gentle window-light aesthetic (large soft source from side), warm natural color temperature, minimal shadows creating tender atmosphere, soft gentle illumination emphasizing emotional connection, Peter Lindbergh-inspired natural beauty

ENVIRONMENT: Minimal intimate setting - soft neutral backdrop, focus entirely on human emotional presence, no distracting elements

MOOD: Profound intimate emotional honesty, deep human connection, vulnerable authentic beauty, "I trust you with my truth", the portrait that feels like genuine encounter, emotional documentary intimacy

CAMERA: Canon EOS R5, 85mm f/1.4 at f/2.0, intimate close framing, soft depth, focus on emotional eyes

STYLE: Intimate documentary portrait photography, Peter Lindbergh/Annie Leibovitz intimate portrait aesthetic, emotional truth capture

TECHNICAL: 1920x1080 (16:9), JPG, photorealistic, soft natural quality, emotional depth`,
    specifications: {
      width: 1920,
      height: 1080,
      format: 'JPG',
      aspectRatio: '16:9'
    },
    priority: 'critical',
    sceneUsage: ['scene_5_climax_shot'],
    mode: 'vera',
    contentRating: 'mature',
    generated: false
  },

  {
    id: 'cg_camera_back_review',
    type: 'cg_image',
    name: 'CG: Reviewing Photos Together',
    description: 'Collaborative moment, looking at camera LCD',
    prompt: `PROFESSIONAL FASHION PHOTOGRAPHY | Cinematic narrative moment | 16:9 composition

SCENE: Post-shoot review - Zara and photographer reviewing images

${ZARA_CHARACTER_BASE}

ZARA: End-of-shoot appearance - outfit slightly relaxed (jacket off or hair less styled), professional but comfortable, makeup still beautiful but natural end-of-day, satisfied relaxed energy

COMPOSITION: Medium-close shot from side angle showing both Zara and photographer (photographer's profile/side visible) standing close together looking down at camera LCD in photographer's hands, camera screen visible showing captured portrait (from shoot, beautiful image visible), both leaning in to review, collaborative intimate distance, shared focus on creative result

ZARA EXPRESSION: Genuine satisfied smile, eyes showing pleasure and pride in work, engaged interest in reviewing, collaborative creative energy, "we did great work", warm connection through shared accomplishment

PHOTOGRAPHER PRESENCE: Partially visible (profile, shoulder, hands holding camera), focused on screen, sharing moment, collaborative professional partnership visible

ENVIRONMENT: Studio during wrap - equipment being put away visible in soft focus background, late afternoon warm lighting, comfortable end-of-day atmosphere

MOOD: Collaborative satisfaction, creative partnership payoff, mutual respect and accomplishment, warm professional camaraderie, "look what we created together", positive creative collaboration result

LIGHTING: Soft warm late afternoon studio lighting - gentle ambient light, warm color temperature, comfortable relaxed illumination, LCD screen casting subtle blue glow on faces

CAMERA: Canon EOS R5, 35mm f/1.4 at f/2.0, medium-close documentary shot, slightly elevated angle showing both figures and camera screen

STYLE: Behind-the-scenes documentary photography, authentic fashion industry collaboration moments

TECHNICAL: 1920x1080 (16:9), JPG, photorealistic, warm satisfied mood, collaborative energy`,
    specifications: {
      width: 1920,
      height: 1080,
      format: 'JPG',
      aspectRatio: '16:9'
    },
    priority: 'high',
    sceneUsage: ['scene_6_wrap'],
    mode: 'all',
    contentRating: 'general',
    generated: false
  }
];

// ============================================================================
// EXPORT COMPLETE MANIFEST
// ============================================================================

export const COMPLETE_ASSET_MANIFEST: AssetRequirement[] = [
  ...CHARACTER_SPRITES,
  ...BACKGROUNDS,
  ...CG_IMAGES
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function getAssetsByPriority(priority: AssetRequirement['priority']): AssetRequirement[] {
  return COMPLETE_ASSET_MANIFEST.filter(asset => asset.priority === priority);
}

export function getAssetsByType(type: AssetRequirement['type']): AssetRequirement[] {
  return COMPLETE_ASSET_MANIFEST.filter(asset => asset.type === type);
}

export function getAssetsByMode(mode: string): AssetRequirement[] {
  return COMPLETE_ASSET_MANIFEST.filter(asset => asset.mode === mode || asset.mode === 'all');
}

export function getAssetsByScene(sceneId: string): AssetRequirement[] {
  return COMPLETE_ASSET_MANIFEST.filter(asset => asset.sceneUsage.includes(sceneId));
}

export function getAssetStats() {
  const total = COMPLETE_ASSET_MANIFEST.length;
  const generated = COMPLETE_ASSET_MANIFEST.filter(a => a.generated).length;
  const critical = COMPLETE_ASSET_MANIFEST.filter(a => a.priority === 'critical').length;
  const criticalGenerated = COMPLETE_ASSET_MANIFEST.filter(a => a.priority === 'critical' && a.generated).length;

  return {
    total,
    generated,
    remaining: total - generated,
    progress: (generated / total) * 100,
    critical,
    criticalGenerated,
    criticalRemaining: critical - criticalGenerated
  };
}

/**
 * Get assets requiring consent (for artistic mode)
 */
export function getConsentRequiredAssets(): AssetRequirement[] {
  return COMPLETE_ASSET_MANIFEST.filter(asset => asset.requiresConsent === true);
}

/**
 * Get assets by content rating
 */
export function getAssetsByContentRating(rating: 'general' | 'mature' | 'artistic_nudity'): AssetRequirement[] {
  return COMPLETE_ASSET_MANIFEST.filter(asset => asset.contentRating === rating);
}
