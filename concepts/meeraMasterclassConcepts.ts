import type { PromptData } from '../types';
import type { ArtisticConcept } from './concepts';

/**
 * Meera Masterclass Collection Concepts
 * All artistic concepts from instagram-intimate-masterclass through meera-masterclass
 * Auto-fills all prompt fields when selected in the concept selector
 */

// Default hyper-realistic details
const defaultSkinMicroDetails = "Authentic, high-resolution skin texture with natural pores, subtle variations in skin tone, and realistic luminosity. Warm caramel tones with golden undertones catching light naturally. No airbrushing.";
const defaultFabricPhysics = "The fabric drapes naturally with realistic weight and movement, creating genuine creases and folds that follow the subject's form. Every thread and weave visible upon close inspection.";
const defaultMaterialProperties = "Materials have authentic texture and light response - silk catches light with liquid shimmer, lace shows intricate pattern depth, velvet absorbs light with rich depth.";

// ═══════════════════════════════════════════════════════════════════════════════
// MEERA - INDIAN HOURGLASS MUSE MODEL DEFINITIONS
// ═══════════════════════════════════════════════════════════════════════════════

const MEERA_SUBJECT = {
  variant: `Stunningly beautiful Indian woman Meera, age 27, height 5'9", naturally curvaceous hourglass figure with full bust and dramatic hip curves, warm golden-brown caramel skin with natural glow, captivating deep brown eyes with thick dark lashes, full sensual lips with natural color, long flowing black hair styled beautifully, authentic natural beauty with no artificial enhancement, confident relaxed expression`,
  pose: "",
  hair_color: "jet black",
  hair_style: "long flowing waves with subtle volume, elegant and natural",
  skin_finish: "Natural luminous glow with golden undertones",
  hand_and_nail_details: "Elegant natural manicure, graceful hand positioning",
  tattoos: "none",
  piercings: "subtle gold ear studs",
  body_art: "none",
  nail_art: "Natural nude polish",
  high_heels: "as appropriate for wardrobe"
};

// ═══════════════════════════════════════════════════════════════════════════════
// INTIMATE MASTERCLASS COLLECTION - Fashion Editorial Style
// ═══════════════════════════════════════════════════════════════════════════════

export const intimateMasterclassConcepts: ArtisticConcept[] = [
  {
    name: "Meera: Golden Touch - Penthouse",
    data: {
      shot: "Full body portrait (3:4), warm golden hour fashion photography",
      subject: {
        ...MEERA_SUBJECT,
        pose: "Standing elegantly with one hand on hip, confident smile, looking directly at camera"
      },
      wardrobe: "Luxurious champagne silk evening gown with draped neckline, elegant gold jewelry",
      environment: "Luxurious penthouse with floor-to-ceiling windows, cream and gold interior design, golden hour sunlight streaming through",
      lighting: "Warm golden hour sunlight creating beautiful rim lighting, soft catchlights in eyes, luminous skin glow",
      camera: { focal_length: "85mm", aperture: "f/2.8", distance: "3 m", angle: "Slightly low angle", framing: "Full body with elegant negative space" },
      color_grade: "Warm Golden, rich amber and champagne tones",
      style: "Vogue Living Editorial, Annie Leibovitz inspired",
      quality: "Hasselblad H6D-100c. 8K resolution, magazine cover quality, natural skin texture",
      figure_and_form: "Hourglass silhouette emphasized by draped silk and golden light",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Silk gown catches light with liquid shimmer, fabric draping sensuously over curves",
      material_properties: "Champagne silk with luminous sheen, gold jewelry catching warm light"
    }
  },
  {
    name: "Meera: Shadow Whispers - Chiaroscuro",
    data: {
      shot: "Medium portrait (3:4), dramatic noir fashion editorial",
      subject: {
        ...MEERA_SUBJECT,
        pose: "Standing in profile, elegant posture, one hand lightly touching neck, looking into distance"
      },
      wardrobe: "Sophisticated black velvet evening gown with high slit, statement gold earrings",
      environment: "Minimalist studio with single window, venetian blinds, dramatic noir atmosphere",
      lighting: "Venetian blind shadows casting dramatic stripes, high contrast chiaroscuro effect, sculptural shadows on face",
      camera: { focal_length: "50mm", aperture: "f/2.8", distance: "2.5 m", angle: "Eye level", framing: "Medium shot, dramatic negative space" },
      color_grade: "Cool Cinematic noir with warm skin tones",
      style: "Helmut Newton Inspired, Neo-noir Sensuality",
      quality: "RAW Cinematic. 8k, high contrast, film noir aesthetic",
      figure_and_form: "Silhouette sculpted by dramatic shadow play",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Black velvet absorbing light, creating rich depth and texture",
      material_properties: "Velvet with deep matte finish contrasting with luminous skin"
    }
  },
  {
    name: "Meera: Silk Surrender - Flowing",
    data: {
      shot: "Full body (3:4), ethereal flowing fabric photography",
      subject: {
        ...MEERA_SUBJECT,
        pose: "Standing gracefully wrapped in flowing fabric, hands gathering silk at chest, serene expression"
      },
      wardrobe: "Flowing champagne silk kaftan with gold embroidery, elegant draping",
      environment: "Minimalist white space with floating silk fabrics, ethereal atmosphere",
      lighting: "Soft studio lighting creating luminous fabric glow, beauty lighting on face",
      camera: { focal_length: "85mm", aperture: "f/2.8", distance: "3 m", angle: "Slightly elevated", framing: "Full body with flowing fabric" },
      color_grade: "Ethereal warm, soft champagne and gold",
      style: "Editorial Fashion, Liquid Luxury aesthetic",
      quality: "Medium format quality. 8K, soft focus on fabric movement",
      figure_and_form: "Form suggested through flowing fabric, elegant curves",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Silk flowing with natural movement, catching light at every fold",
      material_properties: "Champagne silk with liquid shimmer, gold embroidery catching highlights"
    }
  },
  {
    name: "Meera: Mirror Reflections - Vanity",
    data: {
      shot: "Medium portrait (3:4), intimate vanity moment",
      subject: {
        ...MEERA_SUBJECT,
        pose: "Standing before mirror, adjusting elegant necklace, soft smile at reflection"
      },
      wardrobe: "Elegant black cocktail dress, statement diamond necklace, sophisticated look",
      environment: "Vintage gilded mirror, elegant dressing room, classic glamour setting",
      lighting: "Soft vanity lighting with warm golden glow, flattering beauty light",
      camera: { focal_length: "50mm", aperture: "f/2.0", distance: "2 m", angle: "Three-quarter angle capturing reflection", framing: "Medium shot with mirror reflection" },
      color_grade: "Warm & Romantic, golden vanity tones",
      style: "Private & Personal, Paolo Roversi inspired",
      quality: "Shot on Kodak Portra 400 aesthetic. 8k, beautiful color rendition",
      figure_and_form: "Elegant form reflected in ornate mirror, classic beauty",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Cocktail dress draping elegantly, fabric following curves",
      material_properties: "Black fabric with subtle sheen, diamond necklace sparkling in vanity light"
    }
  },
  {
    name: "Meera: Sensual Repose - Chaise",
    data: {
      shot: "Full body (3:4), elegant relaxation portrait",
      subject: {
        ...MEERA_SUBJECT,
        pose: "Reclining on chaise lounge, one arm behind head, relaxed confident expression"
      },
      wardrobe: "Elegant cream cashmere wrap dress, minimal gold jewelry, effortless style",
      environment: "Luxurious living room, velvet furniture, cream and gold palette",
      lighting: "Soft morning light through sheer curtains, warm and inviting",
      camera: { focal_length: "85mm", aperture: "f/2.8", distance: "3 m", angle: "Low angle, intimate", framing: "Full body reclining composition" },
      color_grade: "Warm & Natural, cream and gold",
      style: "Relaxed Elegance, lifestyle editorial",
      quality: "Hasselblad medium format. 8K, intimate atmosphere",
      figure_and_form: "Natural curves emphasized by relaxed reclining pose",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Cashmere draping softly, warm and cozy texture",
      material_properties: "Cream cashmere with soft matte finish, velvet furniture reflecting light"
    }
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
// LINGERIE MASTERCLASS - Architectural Mesh Collection
// ═══════════════════════════════════════════════════════════════════════════════

export const lingerieMasterclassConcepts: ArtisticConcept[] = [
  {
    name: "Meera: Architectural Mesh - Standing",
    data: {
      shot: "Full body portrait (3:4), haute couture intimate editorial",
      subject: {
        ...MEERA_SUBJECT,
        pose: "Standing with weight shifted to one hip, hand on waist emphasizing dramatic hourglass silhouette, looking over shoulder with sultry confidence"
      },
      wardrobe: "Architectural black textured mesh bodysuit with single-line strategic draping, geometric cutouts following body contours, minimalist haute couture intimate design",
      environment: "Minimalist dark studio with single beam of golden light, high fashion editorial setting",
      lighting: "Dramatic chiaroscuro lighting with golden rim light outlining every curve, deep shadows defining cinched waist",
      camera: { focal_length: "85mm", aperture: "f/2.8", distance: "3 m", angle: "Three-quarter", framing: "Full body with dramatic lighting" },
      color_grade: "Warm golden with deep blacks",
      style: "Vogue Italia editorial, haute couture intimate",
      quality: "Hasselblad medium format. 8K, fashion editorial quality",
      figure_and_form: "Hourglass silhouette sculpted by architectural mesh design",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Textured mesh conforming to curves, geometric patterns catching light",
      material_properties: "Black mesh with architectural structure, skin visible through strategic design"
    }
  },
  {
    name: "Meera: Strategic Drape - Seated",
    data: {
      shot: "Medium portrait (3:4), intimate couture photography",
      subject: {
        ...MEERA_SUBJECT,
        pose: "Seated elegantly with legs crossed, leaning back on arms, chin tilted up confidently"
      },
      wardrobe: "Sheer black mesh one-piece with strategic fabric draping across chest and hips, architectural single-line design, avant-garde lingerie",
      environment: "Luxurious cream silk backdrop, intimate boudoir atmosphere",
      lighting: "Venetian blind shadows casting dramatic stripes across curvaceous form, high contrast",
      camera: { focal_length: "85mm", aperture: "f/2.0", distance: "2.5 m", angle: "Slightly elevated", framing: "Medium shot with dramatic shadows" },
      color_grade: "Cream and black contrast with warm skin",
      style: "Architectural Intimate, fashion-forward",
      quality: "RAW editorial. 8K, fine art quality",
      figure_and_form: "Curves emphasized by strategic draping and shadow play",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Sheer mesh draping strategically, creating geometric patterns",
      material_properties: "Black mesh against cream silk backdrop, light and shadow interplay"
    }
  },
  {
    name: "Meera: Geometric Cutout - Profile",
    data: {
      shot: "Full body portrait (3:4), fine art nude aesthetic",
      subject: {
        ...MEERA_SUBJECT,
        pose: "Standing in profile showing full hourglass silhouette, rounded hips emphasized, looking back at camera with alluring gaze"
      },
      wardrobe: "Textured mesh bodysuit with geometric architectural cutouts, single continuous line design wrapping around curves, minimal coverage",
      environment: "Pure black void, fine art nude aesthetic, gallery quality",
      lighting: "Dramatic side lighting sculpting every curve, rim light on silhouette",
      camera: { focal_length: "85mm", aperture: "f/2.8", distance: "3 m", angle: "Profile view", framing: "Full body silhouette" },
      color_grade: "High contrast black and warm skin",
      style: "Museum Quality Fine Art",
      quality: "Hasselblad X2D. 8K, gallery exhibition standard",
      figure_and_form: "Complete silhouette revealed through artistic mesh design",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Mesh conforming to body contours with geometric precision",
      material_properties: "Textured mesh catching rim light against pure black background"
    }
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
// MEERA CANDLELIT PREMIUM COLLECTION
// ═══════════════════════════════════════════════════════════════════════════════

export const meeraCandlelitPremiumConcepts: ArtisticConcept[] = [
  {
    name: "Meera: Silver Venus Recline",
    data: {
      shot: "Full body portrait (3:4), Renaissance sensual portraiture",
      subject: {
        ...MEERA_SUBJECT,
        pose: "Fully reclined on silver silk chaise with body extended in transcendent flow, one leg elegantly extended, other leg bent at knee, spine gently arched with Renaissance Venus grace, one arm extended above head"
      },
      wardrobe: "Champagne gold beaded bodychain with intricate geometric lace pattern, ultra-thin beaded straps creating delicate web design, architectural beaded cups catching candlelight",
      environment: "Luxurious private chamber with textured grey plaster walls, ornate silver candelabras with flickering white tapers, silver-grey silk drapery flowing from ceiling, plush cream fur throw on silver chaise",
      lighting: "Dramatic Cannes-winning cinematic lighting with chiaroscuro masterwork, low-angle golden key light from candelabras, soft fill maintaining intimate detail, rim light creating divine outline",
      camera: { focal_length: "85mm", aperture: "f/1.4", distance: "3 m", angle: "Low angle", framing: "Full body Venus composition" },
      color_grade: "Silver and gold Renaissance warmth",
      style: "Titian sensual mastery, Cannes Film Festival aesthetic",
      quality: "Canon EOS R5 with 85mm f/1.4. 8K museum-caliber finish",
      figure_and_form: "Venus recline celebrating divine feminine form",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Beaded bodychain catching candlelight, silk draping with liquid grace",
      material_properties: "Gold beads and crystals reflecting warm candlelight, silver silk creating luminous backdrop"
    }
  },
  {
    name: "Meera: Velvet Throne Command",
    data: {
      shot: "Medium portrait (3:4), Cannes Film Festival cinematography",
      subject: {
        ...MEERA_SUBJECT,
        pose: "Seated on deep burgundy velvet throne chair, one leg crossed over other showcasing length, spine straight with commanding presence, direct intense gaze at viewer"
      },
      wardrobe: "Sheer champagne mesh bodysuit with delicate gold embroidery tracing curves, ultra-thin fabric like second skin, plunging V-neckline, strategic gold thread coverage",
      environment: "Opulent candlelit chamber with deep burgundy velvet walls, multiple brass candelabras with white tapers casting warm glow, gold-framed mirror reflecting candlelight",
      lighting: "Dramatic Palme d'Or cinematic lighting, golden key light from candelabras, deep shadows on velvet walls, rim light defining silhouette",
      camera: { focal_length: "85mm", aperture: "f/1.8", distance: "2.5 m", angle: "Slightly low, commanding", framing: "Medium shot throne composition" },
      color_grade: "Deep burgundy with golden warmth",
      style: "Palme d'Or winning cinematography",
      quality: "ARRI Alexa cinematic. 8K, film festival standard",
      figure_and_form: "Commanding presence on velvet throne",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Sheer mesh like second skin, gold embroidery catching candlelight",
      material_properties: "Burgundy velvet absorbing light, gold accents reflecting warm glow"
    }
  },
  {
    name: "Meera: Amber Intimate Recline",
    data: {
      shot: "Full body portrait (3:4), warm intimate photography",
      subject: {
        ...MEERA_SUBJECT,
        pose: "Reclined on amber velvet with body creating flowing S-curve, one arm above head, other trailing along body contour, one leg extended, other bent at knee, intimate direct gaze, lips parted"
      },
      wardrobe: "Gold metallic mesh slip in warm honey tone, whisper-thin fabric that catches light, thin straps, thigh-length with flowing silhouette, fabric barely distinguishable from golden skin",
      environment: "Warm amber-toned chamber with honey-gold walls, brass candelabras with amber glass votives, golden silk drapery, caramel fur throw",
      lighting: "Warm amber candlelight throughout, golden glow harmonizing with skin tone, soft intimate atmosphere",
      camera: { focal_length: "85mm", aperture: "f/1.4", distance: "3 m", angle: "Intimate elevated angle", framing: "Full body S-curve composition" },
      color_grade: "Warm amber and honey gold",
      style: "Intimate Amber Warmth, Renaissance master warmth",
      quality: "Hasselblad medium format. 8K, intimate collection standard",
      figure_and_form: "S-curve silhouette bathed in amber light",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Gold mesh catching amber light, barely visible against skin",
      material_properties: "Honey-gold metallic mesh harmonizing with warm skin tones"
    }
  },
  {
    name: "Meera: Platinum Mirror Reflection",
    data: {
      shot: "Full body portrait (3:4), cool luxury elegance",
      subject: {
        ...MEERA_SUBJECT,
        pose: "Standing before full-length mirror, torso twisted to show both front and back reflection, one hand on hip, other touching mirror surface, confident self-admiration"
      },
      wardrobe: "Silver metallic mesh bodysuit with crystalline accents, cool platinum shimmer, thin straps, plunging back, fabric reflecting light like liquid mercury",
      environment: "Cool platinum-toned chamber with silver-grey walls, elegant silver candelabras with white candles, platinum silk drapery, white fur throw, large ornate silver-framed mirror",
      lighting: "Cool white candlelight with silver undertones, elegant highlights on metallic mesh",
      camera: { focal_length: "50mm", aperture: "f/2.0", distance: "3 m", angle: "Three-quarter capturing reflection", framing: "Full body with mirror reflection" },
      color_grade: "Cool platinum with warm skin contrast",
      style: "Met Museum contemporary sophistication",
      quality: "Medium format. 8K, museum collection standard",
      figure_and_form: "Form doubled in mirror, platinum elegance",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Silver mesh reflecting light like liquid mercury",
      material_properties: "Platinum metallic against cool silver environment"
    }
  },
  {
    name: "Meera: Noir Shadow Surrender",
    data: {
      shot: "Medium portrait (3:4), dark luxury noir",
      subject: {
        ...MEERA_SUBJECT,
        pose: "Kneeling on black fur throw, sitting back on heels, head tilted upward with eyes closed in surrendered expression, arms at sides with palms up in offering gesture"
      },
      wardrobe: "Black sheer mesh bodysuit with strategic opaque geometric panels, architectural cutouts revealing skin, long sleeves, high neck with keyhole, noir elegance",
      environment: "Dark luxurious chamber with charcoal black walls, matte black candelabras with black candles providing subtle glow, black silk drapery, black fur throw, silver accents",
      lighting: "Single dramatic candlelight source creating deep noir shadows, rim lighting on curves, Lars von Trier cinematic intensity",
      camera: { focal_length: "85mm", aperture: "f/1.8", distance: "2.5 m", angle: "Slightly elevated, dramatic", framing: "Medium shot surrender pose" },
      color_grade: "Deep noir with warm skin highlights",
      style: "Lars von Trier art-house, MoMA film archive",
      quality: "Cinematic 8K. Film noir aesthetic",
      figure_and_form: "Form emerging from darkness in surrender",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Black mesh creating geometric patterns against skin",
      material_properties: "Matte black absorbing light, skin glowing in single light source"
    }
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
// MEERA PLATINUM AMBER ELITE COLLECTION
// ═══════════════════════════════════════════════════════════════════════════════

export const meeraPlatinumAmberEliteConcepts: ArtisticConcept[] = [
  {
    name: "Meera: Amber Recline Intimate",
    data: {
      shot: "Medium-close portrait (3:4), intimate recline photography",
      subject: {
        ...MEERA_SUBJECT,
        pose: "Fully reclined on caramel velvet chaise with body in languid sensual flow, spine gently arched, one arm extended above head with fingers in hair, other hand on hip, head tilted back with sultry half-lidded gaze"
      },
      wardrobe: "Platinum silver chainmail micro bikini set with crystal fringe accents, cool silver interlocking metal rings catching warm amber light, minimal coverage with crystal drops cascading from edges",
      environment: "Luxurious private amber-toned boudoir chamber with warm honey-gold walls, ornate brass candelabras with flickering amber pillar candles, caramel velvet chaise with silk cushions",
      lighting: "Warm amber candlelight creating intimate golden atmosphere, low-angle honey-gold key light emphasizing form, golden rim light creating divine outline",
      camera: { focal_length: "85mm", aperture: "f/1.4", distance: "2 m", angle: "Elevated intimate", framing: "Medium-close capturing torso and face" },
      color_grade: "Warm amber with platinum accents",
      style: "Super-exclusive elite private collection, Renaissance master warmth",
      quality: "Canon EOS R5 with 85mm f/1.4. 8K hyper-realistic detail",
      figure_and_form: "Languid recline with chainmail catching amber light",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Chainmail with individual metal links visible, crystal fringe moving with breath",
      material_properties: "Platinum chainmail against warm amber environment, metal warming against caramel skin"
    }
  },
  {
    name: "Meera: Amber Venus Pose",
    data: {
      shot: "Full body portrait (3:4), classical Venus composition",
      subject: {
        ...MEERA_SUBJECT,
        pose: "Classic Venus recline on velvet with one arm supporting upper body, other arm gracefully at hip, legs in elegant classical composition with one knee raised, serene confident expression"
      },
      wardrobe: "Platinum silver chainmail micro bikini set with crystal fringe, cool silver metal catching warm amber candlelight, minimal coverage maximizing artistic form",
      environment: "Amber-toned candlelit boudoir with honey-gold walls, brass candelabras, golden silk drapery, caramel velvet chaise",
      lighting: "Warm amber candlelight with Titian master warmth, museum-worthy lighting",
      camera: { focal_length: "85mm", aperture: "f/1.4", distance: "3 m", angle: "Classical composition angle", framing: "Full body Venus pose" },
      color_grade: "Amber and gold Renaissance palette",
      style: "Titian masterwork, museum-caliber",
      quality: "Medium format. 8K, Renaissance painting quality",
      figure_and_form: "Classical Venus proportions with modern sensibility",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Chainmail draping naturally, crystals catching light",
      material_properties: "Platinum metal creating contrast with warm amber atmosphere"
    }
  },
  {
    name: "Meera: Amber Kneeling Goddess",
    data: {
      shot: "Full body portrait (3:4), goddess worship aesthetic",
      subject: {
        ...MEERA_SUBJECT,
        pose: "Kneeling on sheepskin with knees apart, sitting back on heels, spine elongated with chest lifted, hands resting on inner thighs, confident direct gaze, chainmail catching amber light"
      },
      wardrobe: "Platinum silver chainmail micro bikini with crystal accents, metal warming against caramel skin, catching warm amber candlelight throughout",
      environment: "Amber boudoir chamber with honey-gold walls, brass candelabras surrounding, golden silk drapery, plush cream sheepskin",
      lighting: "Warm amber candlelight enveloping form, golden highlights on chainmail, intimate atmosphere",
      camera: { focal_length: "85mm", aperture: "f/1.4", distance: "2.5 m", angle: "Frontal intimate", framing: "Full body kneeling composition" },
      color_grade: "Rich amber and honey gold",
      style: "Goddess worship aesthetic, super-exclusive elite",
      quality: "Canon EOS R5. 8K, private collection masterclass",
      figure_and_form: "Kneeling goddess with chainmail adornment",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Chainmail conforming to form, crystals creating sparkle movement",
      material_properties: "Platinum chainmail warming in amber light against caramel skin"
    }
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
// MEERA REVEALS - CHIAROSCURO VELVET INTIMACY
// ═══════════════════════════════════════════════════════════════════════════════

export const meeraRevealsConcepts: ArtisticConcept[] = [
  {
    name: "Meera: Shadow Emergence",
    data: {
      shot: "Full body portrait (3:4), Caravaggio-inspired chiaroscuro",
      subject: {
        ...MEERA_SUBJECT,
        pose: "Standing in three-quarter profile emerging from absolute darkness, body partially illuminated by single dramatic light source, one arm raised creating elegant line, hip shifted creating dramatic S-curve"
      },
      wardrobe: "Exquisite minimal black French lace lingerie with strategic shadow placement, delicate Chantilly lace creating artistic transparency patterns, gossamer-thin straps, shadow serving as natural artistic coverage",
      environment: "Opulent private velvet boudoir chamber with deep burgundy and midnight black velvet draping, dramatic single-source warm lighting creating Renaissance master chiaroscuro",
      lighting: "Dramatic Caravaggio-inspired chiaroscuro lighting with single powerful warm key light from 45-degree angle, deep absolute shadows creating sculptural dimensionality, Rembrandt triangle on face",
      camera: { focal_length: "85mm", aperture: "f/1.2", distance: "3 m", angle: "Three-quarter dramatic", framing: "Full figure emerging from darkness" },
      color_grade: "Deep blacks with warm golden highlights",
      style: "Uffizi Gallery masterwork, Caravaggio meets contemporary",
      quality: "Canon EOS R5 with 85mm f/1.2L. 8K museum permanent collection standard",
      figure_and_form: "Form emerging from shadow like classical painting",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Lace and shadow interplaying, creating artistic coverage",
      material_properties: "Black French lace against deep velvet darkness, skin glowing in dramatic light"
    }
  },
  {
    name: "Meera: Velvet Recline Reveal",
    data: {
      shot: "Full body portrait (3:4), Old Master painting aesthetic",
      subject: {
        ...MEERA_SUBJECT,
        pose: "Reclined on burgundy velvet chaise with body creating flowing sculptural line, dramatic light catching curves while shadow pools in valleys, one knee raised, arm draped creating classical pose"
      },
      wardrobe: "Minimal black French lace with strategic shadow placement, Chantilly lace creating transparency patterns, shadow merging with lace edges for artistic coverage",
      environment: "Velvet boudoir with burgundy and midnight velvet, dramatic single-source lighting, Renaissance atmosphere",
      lighting: "Chiaroscuro with golden highlights tracing form contours against velvet darkness, extreme contrast ratio",
      camera: { focal_length: "85mm", aperture: "f/1.4", distance: "3 m", angle: "Classical reclining angle", framing: "Full body classical composition" },
      color_grade: "Deep burgundy with golden skin highlights",
      style: "Old Master painting brought to life",
      quality: "Medium format. 8K, Louvre exhibition standard",
      figure_and_form: "Classical reclining composition with modern edge",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Lace barely visible against shadow and skin",
      material_properties: "Burgundy velvet absorbing light, lace catching golden highlights"
    }
  },
  {
    name: "Meera: Sculptural Twist",
    data: {
      shot: "Three-quarter portrait (3:4), body as sculpture",
      subject: {
        ...MEERA_SUBJECT,
        pose: "Standing with dramatic torso twist showing both back and front curves, dramatic side light carving form like sculpture, arms creating elegant lines, head turned over shoulder with intense gaze"
      },
      wardrobe: "Minimal black lace with shadow as natural coverage, body contours revealed through interplay of light and dark",
      environment: "Dark velvet chamber, single powerful light source, dramatic theatrical atmosphere",
      lighting: "Dramatic side lighting carving form like sculpture, body emerging from shadow",
      camera: { focal_length: "85mm", aperture: "f/1.4", distance: "2.5 m", angle: "Sculptural side angle", framing: "Three-quarter twisted composition" },
      color_grade: "High contrast blacks and warm skin",
      style: "Living sculpture, Venice Biennale featured artwork",
      quality: "8K, contemporary art gallery standard",
      figure_and_form: "Body as sculptural medium, dynamic artistic tension",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Minimal lace, shadow providing coverage",
      material_properties: "Skin catching dramatic light against absolute darkness"
    }
  },
  {
    name: "Meera: Velvet Venus",
    data: {
      shot: "Full body portrait (3:4), goddess archetype",
      subject: {
        ...MEERA_SUBJECT,
        pose: "Classic Venus pose adapted for dramatic chiaroscuro, reclining on velvet with classical proportions, one arm supporting head, other gracefully positioned, serene goddess expression"
      },
      wardrobe: "Minimal black French lace in strategic placement, shadow and lace in perfect artistic balance",
      environment: "Midnight velvet boudoir with single dramatic light, museum-quality intimate setting",
      lighting: "Caravaggio-level mastery, dramatic light painting across form",
      camera: { focal_length: "85mm", aperture: "f/1.2", distance: "3 m", angle: "Classical Venus angle", framing: "Full body goddess composition" },
      color_grade: "Deep blacks with golden highlights on skin",
      style: "Metropolitan Museum contemporary wing acquisition",
      quality: "8K, permanent collection masterwork standard",
      figure_and_form: "Timeless classical beauty, goddess archetype realized",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Lace and shadow in perfect balance",
      material_properties: "Velvet richness absorbing light, skin glowing in dramatic illumination"
    }
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
// MEERA MASTERCLASS - WARDROBE & ENVIRONMENT SHOWCASE (14 VARIANTS)
// ═══════════════════════════════════════════════════════════════════════════════

export const meeraMasterclassShowcaseConcepts: ArtisticConcept[] = [
  {
    name: "Meera Masterclass: Morning Silk",
    data: {
      shot: "Full body portrait (3:4), intimate morning photography",
      subject: {
        ...MEERA_SUBJECT,
        pose: "Sitting on edge of bed with one leg tucked under, silk robe loosely tied, natural relaxed morning pose, warm genuine smile, hair slightly tousled"
      },
      wardrobe: "Luxurious champagne silk robe loosely draped, falling off one shoulder revealing collarbone, tied loosely at waist accentuating curves, silk catching soft light with liquid shimmer",
      environment: "Spacious luxury hotel bedroom with king bed with crisp white linens and plush pillows, soft morning light streaming through sheer curtains, warm neutral tones, fresh flowers",
      lighting: "Soft diffused morning light from window creating gentle glow on skin, warm color temperature, natural shadows",
      camera: { focal_length: "85mm", aperture: "f/2.8", distance: "3 m", angle: "Intimate eye level", framing: "Full body relaxed composition" },
      color_grade: "Warm morning light, champagne and cream",
      style: "Girlfriend aesthetic, intimate morning moment",
      quality: "Hasselblad medium format. 8K, lifestyle magazine quality",
      figure_and_form: "Natural relaxed curves in morning light",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Silk robe draping loosely, catching soft light",
      material_properties: "Champagne silk with liquid shimmer, white linens creating soft backdrop"
    }
  },
  {
    name: "Meera Masterclass: Bath Elegance",
    data: {
      shot: "Medium portrait (3:4), spa luxury photography",
      subject: {
        ...MEERA_SUBJECT,
        pose: "Leaning against marble vanity, one hand on counter, body in elegant S-curve, looking at camera through mirror reflection, serene confident expression"
      },
      wardrobe: "Delicate white satin slip dress with thin spaghetti straps, bias-cut fabric draping naturally over curves, knee-length with side slit, subtle lace trim at neckline",
      environment: "Elegant marble bathroom with freestanding soaking tub, soft natural light from frosted window, white marble with gold fixtures, fluffy white towels",
      lighting: "Soft bathroom lighting with natural light from window, marble reflecting light, luminous skin",
      camera: { focal_length: "50mm", aperture: "f/2.0", distance: "2.5 m", angle: "Three-quarter with mirror", framing: "Medium shot with reflection" },
      color_grade: "Clean white and gold spa tones",
      style: "Spa luxury, quiet elegance",
      quality: "Medium format. 8K, luxury lifestyle quality",
      figure_and_form: "Elegant S-curve reflected in marble",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "White satin draping naturally, bias-cut following curves",
      material_properties: "White satin against white marble, gold fixtures adding warmth"
    }
  },
  {
    name: "Meera Masterclass: City Nights",
    data: {
      shot: "Full body portrait (3:4), urban sophistication photography",
      subject: {
        ...MEERA_SUBJECT,
        pose: "Standing by floor-to-ceiling window, body silhouetted against city lights, one hand on glass, looking out thoughtfully, confident powerful stance"
      },
      wardrobe: "Elegant black French lace bodysuit with intricate floral patterns, long sleeves, plunging neckline showcasing decolletage, high-cut design elongating legs",
      environment: "Floor-to-ceiling windows of penthouse apartment overlooking city lights at dusk, modern minimalist interior, soft ambient lighting",
      lighting: "Dramatic rim light from city below, face illuminated by ambient interior light, cinematic mood",
      camera: { focal_length: "35mm", aperture: "f/2.8", distance: "4 m", angle: "Wide capturing cityscape", framing: "Full body with city backdrop" },
      color_grade: "Cool urban with warm skin tones",
      style: "Urban sophistication, city glamour",
      quality: "Cinematic 8K, editorial quality",
      figure_and_form: "Powerful silhouette against city lights",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Black lace conforming to curves, intricate patterns visible",
      material_properties: "Black lace against city lights, glass reflecting ambient light"
    }
  },
  {
    name: "Meera Masterclass: Garden Dream",
    data: {
      shot: "Full body portrait (3:4), bohemian luxury photography",
      subject: {
        ...MEERA_SUBJECT,
        pose: "Reclining on outdoor daybed among cushions, one arm behind head, relaxed sensual pose, peaceful dreamy expression, natural and free"
      },
      wardrobe: "Flowing sheer ivory kaftan with gold embroidery at edges, bohemian luxury, fabric catching breeze and light",
      environment: "Private garden terrace with lush greenery and flowering plants, comfortable daybed with throw pillows, dappled sunlight through trees",
      lighting: "Dappled golden sunlight through leaves, natural warmth, soft shadows",
      camera: { focal_length: "85mm", aperture: "f/2.8", distance: "3 m", angle: "Natural elevated", framing: "Full body among greenery" },
      color_grade: "Natural green and gold, bohemian warmth",
      style: "Bohemian luxury, natural beauty",
      quality: "Medium format. 8K, lifestyle editorial quality",
      figure_and_form: "Relaxed natural curves among cushions",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Sheer kaftan catching breeze, flowing naturally",
      material_properties: "Ivory sheer fabric with gold embroidery catching dappled light"
    }
  },
  {
    name: "Meera Masterclass: Parisian Afternoon",
    data: {
      shot: "Medium portrait (3:4), French romance photography",
      subject: {
        ...MEERA_SUBJECT,
        pose: "Sitting in vintage armchair with legs crossed elegantly, one hand playing with hair, flirtatious knowing smile, relaxed confident posture"
      },
      wardrobe: "Rich burgundy red silk chemise with adjustable straps, low back design, fabric skimming over curves naturally, mid-thigh length, luxurious and passionate",
      environment: "Charming boutique hotel room with vintage furniture, soft afternoon light through lace curtains, floral wallpaper accent, romantic Parisian aesthetic",
      lighting: "Soft afternoon light through lace curtains creating delicate patterns, romantic atmosphere",
      camera: { focal_length: "85mm", aperture: "f/2.0", distance: "2.5 m", angle: "Intimate three-quarter", framing: "Medium shot in vintage setting" },
      color_grade: "Romantic burgundy and cream, Parisian warmth",
      style: "French romance, playful elegance",
      quality: "Kodak Portra aesthetic. 8K, romantic editorial quality",
      figure_and_form: "Elegant crossed legs, confident posture",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Burgundy silk skimming curves naturally",
      material_properties: "Rich red silk catching soft light, vintage furniture adding character"
    }
  },
  {
    name: "Meera Masterclass: Beach Goddess",
    data: {
      shot: "Full body portrait (3:4), tropical paradise photography",
      subject: {
        ...MEERA_SUBJECT,
        pose: "Standing in doorway between bedroom and beach, sarong tied low on hips, arms reaching up to doorframe, body stretched in natural pose, sun-kissed and radiant"
      },
      wardrobe: "Peacock blue silk sarong wrapped low on hips, paired with simple bandeau top, resort luxury, tropical elegance",
      environment: "Luxury beach villa bedroom opening to private beach, white linen curtains billowing in ocean breeze, natural light, tropical paradise",
      lighting: "Bright natural tropical sunlight, golden hour warmth, beach glow",
      camera: { focal_length: "50mm", aperture: "f/2.8", distance: "3 m", angle: "Framed in doorway", framing: "Full body in doorway frame" },
      color_grade: "Tropical blue and golden warmth",
      style: "Tropical paradise, vacation romance",
      quality: "Medium format. 8K, resort lifestyle quality",
      figure_and_form: "Stretched natural pose, sun-kissed glow",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Silk sarong catching breeze, curtains billowing",
      material_properties: "Peacock blue silk against white linen and tropical light"
    }
  },
  {
    name: "Meera Masterclass: Cozy Evening",
    data: {
      shot: "Full body portrait (3:4), intimate winter photography",
      subject: {
        ...MEERA_SUBJECT,
        pose: "Curled up on fur throw near fireplace, sweater slipping off shoulder, holding glass of wine, warm genuine smile, completely relaxed"
      },
      wardrobe: "Oversized cream cashmere sweater slipping off one shoulder, worn as dress reaching mid-thigh, cozy intimate aesthetic",
      environment: "Rustic luxury cabin interior with stone fireplace glowing warmly, plush fur throws, wooden beams, winter retreat warmth",
      lighting: "Warm firelight creating golden glow, intimate cozy atmosphere",
      camera: { focal_length: "85mm", aperture: "f/2.0", distance: "2.5 m", angle: "Intimate low angle", framing: "Full body cozy composition" },
      color_grade: "Warm firelight, cream and amber",
      style: "Cozy sensuality, romantic warmth",
      quality: "Medium format. 8K, intimate lifestyle quality",
      figure_and_form: "Relaxed curled pose, cozy warmth",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Cashmere draping softly, slipping off shoulder",
      material_properties: "Cream cashmere against fur throw, firelight creating warm glow"
    }
  },
  {
    name: "Meera Masterclass: Golden Hour",
    data: {
      shot: "Full body portrait (3:4), magic hour photography",
      subject: {
        ...MEERA_SUBJECT,
        pose: "Lying on lounge chair with one knee bent, arms relaxed above head, basking in golden light, peaceful blissful expression"
      },
      wardrobe: "Delicate blush pink lace bralette with matching high-waisted panties, soft romantic aesthetic, feminine and pretty",
      environment: "Private rooftop lounge at golden hour, comfortable seating area, city skyline in soft focus background, warm evening light",
      lighting: "Golden hour sunlight creating warm glow, soft lens flare, magic hour",
      camera: { focal_length: "85mm", aperture: "f/2.8", distance: "3 m", angle: "Low angle golden light", framing: "Full body basking in light" },
      color_grade: "Golden hour warmth, blush and gold",
      style: "Golden goddess, sunset beauty",
      quality: "Medium format. 8K, magic hour quality",
      figure_and_form: "Relaxed curves bathed in golden light",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Delicate lace catching golden light",
      material_properties: "Blush pink lace glowing in golden hour light"
    }
  },
  {
    name: "Meera Masterclass: Vintage Glamour",
    data: {
      shot: "Full body portrait (3:4), Old Hollywood photography",
      subject: {
        ...MEERA_SUBJECT,
        pose: "Standing before Hollywood mirror, hands adjusting corset, looking at reflection, old Hollywood starlet pose, glamorous confidence"
      },
      wardrobe: "Deep emerald green velvet corset with matching high-waisted briefs, structured boning creating hourglass silhouette, vintage glamour aesthetic",
      environment: "Elegant walk-in closet and dressing room with Hollywood mirror lights, velvet seating, luxury fashion environment",
      lighting: "Classic Hollywood vanity lights, soft and flattering, vintage glamour",
      camera: { focal_length: "50mm", aperture: "f/2.8", distance: "3 m", angle: "Three-quarter capturing mirror", framing: "Full body with vanity reflection" },
      color_grade: "Emerald and gold, vintage warmth",
      style: "Old Hollywood glamour, timeless elegance",
      quality: "Medium format. 8K, classic Hollywood quality",
      figure_and_form: "Hourglass silhouette enhanced by corset",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Velvet corset structured and form-fitting",
      material_properties: "Emerald velvet absorbing light, mirror reflecting vanity bulbs"
    }
  },
  {
    name: "Meera Masterclass: Yacht Luxury",
    data: {
      shot: "Full body portrait (3:4), nautical elegance photography",
      subject: {
        ...MEERA_SUBJECT,
        pose: "Sitting on edge of bed with legs elegantly crossed, hands on bed behind for support, confident sophisticated pose, knowing smile"
      },
      wardrobe: "Nude mesh bodycon dress with strategic solid panels, second-skin fit following every curve, modern minimalist design, barely-there elegance",
      environment: "Luxury yacht master cabin with porthole windows showing blue ocean, polished wood and brass details, nautical elegance",
      lighting: "Natural light from porthole windows, nautical warm tones, ocean reflections",
      camera: { focal_length: "50mm", aperture: "f/2.8", distance: "2.5 m", angle: "Elegant composition", framing: "Full body nautical setting" },
      color_grade: "Nautical blue and warm wood tones",
      style: "Jet-set luxury, maritime elegance",
      quality: "Medium format. 8K, luxury travel quality",
      figure_and_form: "Every curve revealed through second-skin mesh",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Mesh conforming perfectly to form",
      material_properties: "Nude mesh against polished wood and brass"
    }
  },
  {
    name: "Meera Masterclass: Hollywood Nights",
    data: {
      shot: "Full body portrait (3:4), dramatic glamour photography",
      subject: {
        ...MEERA_SUBJECT,
        pose: "Dramatic pose with robe flowing open, silhouetted against city lights, one hand on hip, powerful confident stance, red carpet energy"
      },
      wardrobe: "Floor-length sheer black robe with feather trim at cuffs and hem, worn open over matching lingerie set, old Hollywood glamour",
      environment: "Floor-to-ceiling windows of penthouse apartment overlooking city lights at night, modern interior, dramatic atmosphere",
      lighting: "Dramatic backlighting from city, face lit by interior ambient, cinematic",
      camera: { focal_length: "35mm", aperture: "f/2.8", distance: "4 m", angle: "Dramatic wide angle", framing: "Full body dramatic silhouette" },
      color_grade: "Cinematic noir with city lights",
      style: "Hollywood glamour, powerful femininity",
      quality: "Cinematic 8K, film quality",
      figure_and_form: "Dramatic silhouette with flowing robe",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Sheer robe flowing open, feather trim catching light",
      material_properties: "Sheer black fabric against city lights, feathers adding texture"
    }
  },
  {
    name: "Meera Masterclass: Spa Serenity",
    data: {
      shot: "Full body portrait (3:4), zen relaxation photography",
      subject: {
        ...MEERA_SUBJECT,
        pose: "Lying on massage table on stomach, head turned to side resting on arms, completely relaxed, peaceful serene expression, back exposed"
      },
      wardrobe: "Dusty rose satin pajama set with button-front top partially unbuttoned, matching shorts, relaxed morning-after elegance",
      environment: "Private spa suite with treatment bed, soft candlelight, natural materials, peaceful zen atmosphere",
      lighting: "Soft candlelight and diffused natural light, peaceful atmosphere",
      camera: { focal_length: "50mm", aperture: "f/2.8", distance: "2.5 m", angle: "Peaceful elevated angle", framing: "Full body spa composition" },
      color_grade: "Zen neutral with dusty rose",
      style: "Zen relaxation, tranquil sensuality",
      quality: "Medium format. 8K, spa lifestyle quality",
      figure_and_form: "Relaxed prone pose, peaceful vulnerability",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Satin pajamas pooling naturally",
      material_properties: "Dusty rose satin in soft candlelight"
    }
  },
  {
    name: "Meera Masterclass: Studio Artistic",
    data: {
      shot: "Full body portrait (3:4), high fashion editorial photography",
      subject: {
        ...MEERA_SUBJECT,
        pose: "Standing in classic contrapposto pose showing natural curves, one hand touching hair, body creating elegant S-curve, serene artistic expression"
      },
      wardrobe: "Elegant crystal and gold decorative jewelry adorning shoulders and decolletage, paired with simple champagne silk bandeau and matching briefs, jewelry as wearable art",
      environment: "Professional photography studio with large canvas backdrop in neutral gray, natural north light from skylights creating soft even illumination",
      lighting: "Soft diffused studio lighting from multiple angles, gentle fill light eliminating harsh shadows, professional fashion photography setup",
      camera: { focal_length: "85mm", aperture: "f/2.8", distance: "3 m", angle: "Classic fashion angle", framing: "Full body artistic composition" },
      color_grade: "Neutral studio with warm skin tones",
      style: "High fashion editorial, body as art",
      quality: "Hasselblad medium format. 8K, fashion editorial quality",
      figure_and_form: "Classical S-curve showcasing jewelry art",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Crystal chains catching studio light",
      material_properties: "Crystal and gold jewelry against neutral backdrop"
    }
  },
  {
    name: "Meera Masterclass: Botanical Beauty",
    data: {
      shot: "Full body portrait (3:4), botanical elegance photography",
      subject: {
        ...MEERA_SUBJECT,
        pose: "Standing among tropical plants, natural contrapposto pose, one hand touching leaves, ethereal connection with nature, serene beauty"
      },
      wardrobe: "Designer metallic gold draped top with elegant cowl neckline, paired with matching flowing palazzo pants, luxury resort fashion, sophisticated coverage",
      environment: "Magnificent glass conservatory filled with lush tropical plants and exotic flowers, wrought iron Victorian furniture, warm humid atmosphere",
      lighting: "Soft diffused light through glass ceiling creating greenhouse effect, dappled natural shadows from plants, warm golden tones",
      camera: { focal_length: "85mm", aperture: "f/2.8", distance: "3 m", angle: "Natural among plants", framing: "Full body botanical composition" },
      color_grade: "Botanical green with gold accents",
      style: "Natural luxury, botanical elegance",
      quality: "Medium format. 8K, botanical garden quality",
      figure_and_form: "Elegant pose among tropical foliage",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Gold draped fabric flowing naturally",
      material_properties: "Metallic gold against green botanical backdrop"
    }
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
// COMBINED EXPORT - ALL MEERA MASTERCLASS CONCEPTS
// ═══════════════════════════════════════════════════════════════════════════════

export const allMeeraMasterclassConcepts: ArtisticConcept[] = [
  ...intimateMasterclassConcepts,
  ...lingerieMasterclassConcepts,
  ...meeraCandlelitPremiumConcepts,
  ...meeraPlatinumAmberEliteConcepts,
  ...meeraRevealsConcepts,
  ...meeraMasterclassShowcaseConcepts
];

export default allMeeraMasterclassConcepts;
