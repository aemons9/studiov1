import type { PromptData } from '../types';
import type { ArtisticConcept } from './concepts';

/**
 * Visual Novel Asset Generation Concepts - REDESIGNED
 * "Zara — Chapter 1: Light & Shadow"
 *
 * A choice-driven fashion photography visual novel exploring creative collaboration,
 * power dynamics, and aesthetic decisions across 4 distinct shooting modes:
 * - Experimental (edgy conceptual)
 * - Platinum (luxury editorial)
 * - Vera (intimate emotional)
 * - Artistic (fine art with consent)
 *
 * Based on comprehensive asset taxonomy and assetManifest.ts redesign
 */

// ============================================================================
// CHARACTER BASELINE - Used in all sprite prompts for consistency
// ============================================================================

const ZARA_CHARACTER_BASE = `CHARACTER: Zara, Indian erotic-art film athletic glamourous (height 5'9"), with fit and toned body structure and exact measurements (bust 38D", waist 27", hips 39"). Fair complexion with dramatic lighting potential for cinematic character depth. Method acting specialist with complete emotional range and authentic character embodiment. Age 22-26. Modern Indian actress with bold confidence and cinematic aesthetic. Long dark brown hair with natural character styling. Natural manicured hands with character-appropriate dramatic polish. No tattoos, piercings, or body art - clean canvas for pure character work. Classic film-appropriate character heels. Photographed by Marcello Eros, erotic-art film specialist - ultra-high-end 8K photography with impeccable detail and professional retouching maintaining authentic texture. Modern wardrobe with cinematic character aesthetic and narrative intimate reveals`;

// ============================================================================
// CHARACTER SPRITES - Zara (12 sprites)
// ============================================================================

// --- EMOTIONAL STATE SPRITES (6) ---

export const vnSpriteNeutral: ArtisticConcept = {
  name: 'VN Sprite: Zara Neutral Professional',
  data: {
    shot: "PROFESSIONAL FASHION PHOTOGRAPHY | Full-body character sprite | PNG with alpha transparency | 9:16 portrait",
    subject: {
      variant: ZARA_CHARACTER_BASE,
      pose: "Full-body standing, weight on one leg (natural model stance), neutral friendly expression with soft professional smile, direct eye contact with camera, welcoming confident presence, hands relaxed at sides, perfect posture",
      hair_color: "black",
      hair_style: "long flowing black hair with natural shine",
      skin_finish: "Fair skin with dramatic film set lighting creating character depth",
      hand_and_nail_details: "Hands relaxed, graceful natural placement, natural manicured with character-appropriate dramatic polish",
      tattoos: "none",
      piercings: "none",
      body_art: "none",
      nail_art: "Natural manicured character-appropriate dramatic polish",
      high_heels: "classic, film-appropriate character heels"
    },
    wardrobe: "Casual-professional arrival outfit: fitted black turtleneck emphasizing figure, high-waisted tailored charcoal trousers, minimal gold jewelry (small hoop earrings, delicate necklace), natural makeup, hair loose and flowing",
    environment: "PURE TRANSPARENT BACKGROUND (alpha channel), isolated subject, clean professional cutout, NO background elements",
    lighting: "Professional studio portrait lighting - soft diffused key light at 45 degrees, gentle fill light, subtle rim light for depth, even flattering illumination",
    camera: {
      focal_length: "85mm f/1.8",
      aperture: "f/1.8",
      distance: "2 m",
      angle: "Eye-level, full body framing",
      framing: "Full body portrait, vertical 9:16 format, fashion editorial style"
    },
    color_grade: "Natural warm tones, balanced skin tones, cinematic beauty with dramatic character depth",
    style: "Cinematic film quality, erotic-art film specialist aesthetic, photorealistic with character authenticity",
    quality: "Ultra-high-end 8K photography with impeccable detail and professional retouching maintaining authentic texture. Marcello Eros, erotic-art film specialist. PNG with alpha, 1080x1920",
    figure_and_form: "Versatile fit actress physique with dramatic curves and emotional embodiment",
    skin_micro_details: "Natural skin texture with soft glow, professional beauty photography",
    fabric_physics: "Fitted garments with natural draping",
    material_properties: "Matte black turtleneck, tailored wool-blend trousers, gold jewelry with realistic metallic sheen"
  }
};

export const vnSpriteConfident: ArtisticConcept = {
  name: 'VN Sprite: Zara Confident',
  data: {
    shot: "PROFESSIONAL FASHION PHOTOGRAPHY | Full-body character sprite | PNG with alpha transparency | 9:16 portrait",
    subject: {
      variant: ZARA_CHARACTER_BASE,
      pose: "Full-body standing, chin up, shoulders back, commanding presence, direct intense gaze, one hand on hip, powerful stance, professional model confidence radiating, dominant energy",
      hair_color: "black",
      hair_style: "long flowing black hair styled with volume and confidence",
      skin_finish: "Fair complexion glowing with confidence",
      hand_and_nail_details: "One hand on hip in powerful stance, impeccably manicured",
      tattoos: "none",
      piercings: "none",
      body_art: "none",
      nail_art: "Professional neutral",
      high_heels: "not visible"
    },
    wardrobe: "Same casual-professional outfit emphasizing confident powerful presence",
    environment: "PURE TRANSPARENT BACKGROUND (alpha channel)",
    lighting: "Strong key light creating definition, dramatic lighting emphasizing power",
    camera: {
      focal_length: "85mm f/1.8",
      aperture: "f/1.8",
      distance: "2 m",
      angle: "Slightly below eye level to emphasize power",
      framing: "Full body portrait, commanding composition"
    },
    color_grade: "Strong contrast, powerful tones",
    style: "Fashion editorial, powerful presence, professional confidence",
    quality: "Canon EOS R5, PNG with alpha, 1080x1920",
    figure_and_form: "Dramatic curves showcased confidently, powerful stance",
    skin_micro_details: "Fair complexion with strong lighting, natural beauty",
    fabric_physics: "Fitted garments emphasizing figure and confidence",
    material_properties: "Professional attire with strong presence"
  }
};

export const vnSpriteVulnerable: ArtisticConcept = {
  name: 'VN Sprite: Zara Vulnerable',
  data: {
    shot: "PROFESSIONAL FASHION PHOTOGRAPHY | Full-body character sprite | PNG with alpha transparency | 9:16 portrait",
    subject: {
      variant: ZARA_CHARACTER_BASE,
      pose: "Full-body standing, soft eyes, slight head tilt, open body language, shoulders relaxed forward, one hand nervously touching other arm, gentle vulnerable expression, trust and openness visible",
      hair_color: "black",
      hair_style: "long flowing black hair softly framing face",
      skin_finish: "Fair complexion with soft emotional glow",
      hand_and_nail_details: "Hands in gentle protective gesture, natural graceful placement",
      tattoos: "none",
      piercings: "none",
      body_art: "none",
      nail_art: "Natural clean",
      high_heels: "not visible"
    },
    wardrobe: "Same outfit with softer, more vulnerable energy",
    environment: "PURE TRANSPARENT BACKGROUND (alpha channel)",
    lighting: "Soft diffused lighting emphasizing vulnerability and tenderness",
    camera: {
      focal_length: "85mm f/1.8",
      aperture: "f/1.8",
      distance: "2 m",
      angle: "Eye-level, gentle perspective",
      framing: "Full body portrait with soft vulnerable composition"
    },
    color_grade: "Soft warm tones, gentle romantic feeling",
    style: "Tender portrait photography, emotional vulnerability, natural beauty",
    quality: "Canon EOS R5, PNG with alpha, 1080x1920",
    figure_and_form: "Gentle posture, natural softness, vulnerability and trust",
    skin_micro_details: "Fair complexion in soft lighting, natural emotion visible",
    fabric_physics: "Soft draping with vulnerable movement",
    material_properties: "Warm tender lighting on all materials"
  }
};

export const vnSpritePlayful: ArtisticConcept = {
  name: 'VN Sprite: Zara Playful',
  data: {
    shot: "PROFESSIONAL FASHION PHOTOGRAPHY | Full-body character sprite | PNG with alpha transparency | 9:16 portrait",
    subject: {
      variant: ZARA_CHARACTER_BASE,
      pose: "Full-body standing, genuine laugh, eyes bright and sparkling, relaxed joyful posture, one hand gesturing in animated conversation, head tilted with joy, spontaneous happy energy",
      hair_color: "black",
      hair_style: "long flowing black hair with natural movement from laughter",
      skin_finish: "Fair complexion glowing with happiness",
      hand_and_nail_details: "Animated gesture, natural joyful movement",
      tattoos: "none",
      piercings: "none",
      body_art: "none",
      nail_art: "Clean neutral",
      high_heels: "not visible"
    },
    wardrobe: "Same outfit with playful joyful energy",
    environment: "PURE TRANSPARENT BACKGROUND (alpha channel)",
    lighting: "Bright warm lighting emphasizing happiness and energy",
    camera: {
      focal_length: "85mm f/1.8",
      aperture: "f/1.8",
      distance: "2 m",
      angle: "Eye-level capturing joyful expression",
      framing: "Full body portrait with playful animated composition"
    },
    color_grade: "Bright warm inviting tones, joyful energy",
    style: "Candid fashion photography, genuine joy, spontaneous beauty",
    quality: "Canon EOS R5, PNG with alpha, 1080x1920",
    figure_and_form: "Relaxed playful posture, natural joy and energy",
    skin_micro_details: "Fair complexion glowing with genuine happiness",
    fabric_physics: "Natural movement with playful animation",
    material_properties: "Bright cheerful lighting on all elements"
  }
};

export const vnSpriteUncomfortable: ArtisticConcept = {
  name: 'VN Sprite: Zara Uncomfortable',
  data: {
    shot: "PROFESSIONAL FASHION PHOTOGRAPHY | Full-body character sprite | PNG with alpha transparency | 9:16 portrait",
    subject: {
      variant: ZARA_CHARACTER_BASE,
      pose: "Full-body standing, subtle tension in shoulders, guarded posture, arms crossed or held close, slightly averted gaze, uncomfortable expression, defensive body language, visible tension",
      hair_color: "black",
      hair_style: "long flowing black hair, slightly tense positioning",
      skin_finish: "Fair complexion showing subtle stress",
      hand_and_nail_details: "Defensive hand positioning, tension visible",
      tattoos: "none",
      piercings: "none",
      body_art: "none",
      nail_art: "Clean neutral",
      high_heels: "not visible"
    },
    wardrobe: "Same outfit with visible discomfort",
    environment: "PURE TRANSPARENT BACKGROUND (alpha channel)",
    lighting: "Neutral lighting showing tension and discomfort",
    camera: {
      focal_length: "85mm f/1.8",
      aperture: "f/1.8",
      distance: "2 m",
      angle: "Eye-level capturing uncomfortable tension",
      framing: "Full body portrait with guarded composition"
    },
    color_grade: "Slightly cooler tones, tension visible",
    style: "Documentary portrait, authentic discomfort, real emotion",
    quality: "Canon EOS R5, PNG with alpha, 1080x1920",
    figure_and_form: "Guarded posture, protective stance, visible tension",
    skin_micro_details: "Fair complexion with subtle stress indicators",
    fabric_physics: "Tension visible in fabric and posture",
    material_properties: "Neutral lighting showing authentic discomfort"
  }
};

export const vnSpriteTrusting: ArtisticConcept = {
  name: 'VN Sprite: Zara Trusting',
  data: {
    shot: "PROFESSIONAL FASHION PHOTOGRAPHY | Full-body character sprite | PNG with alpha transparency | 9:16 portrait",
    subject: {
      variant: ZARA_CHARACTER_BASE,
      pose: "Full-body standing, relaxed shoulders, warm genuine smile, direct eye contact showing trust, open body language, hands relaxed and natural, comfortable confident posture radiating trust and connection",
      hair_color: "black",
      hair_style: "long flowing black hair naturally relaxed",
      skin_finish: "Fair complexion with warm trusting glow",
      hand_and_nail_details: "Relaxed natural hand placement showing trust",
      tattoos: "none",
      piercings: "none",
      body_art: "none",
      nail_art: "Clean neutral",
      high_heels: "not visible"
    },
    wardrobe: "Same outfit with warm trusting presence",
    environment: "PURE TRANSPARENT BACKGROUND (alpha channel)",
    lighting: "Warm inviting lighting emphasizing trust and connection",
    camera: {
      focal_length: "85mm f/1.8",
      aperture: "f/1.8",
      distance: "2 m",
      angle: "Eye-level capturing warm trusting expression",
      framing: "Full body portrait with open trusting composition"
    },
    color_grade: "Warm inviting tones, trust and connection visible",
    style: "Intimate portrait, genuine trust, emotional connection",
    quality: "Canon EOS R5, PNG with alpha, 1080x1920",
    figure_and_form: "Relaxed open posture, trust and comfort radiating",
    skin_micro_details: "Fair complexion with warm glow of trust",
    fabric_physics: "Relaxed natural draping showing comfort",
    material_properties: "Warm trusting lighting on all elements"
  }
};

// --- MODE-SPECIFIC WARDROBE SPRITES (4) ---

export const vnSpriteExperimental: ArtisticConcept = {
  name: 'VN Sprite: Zara Experimental Mode',
  data: {
    shot: "CONCEPTUAL FASHION PHOTOGRAPHY | Full-body character sprite | PNG with alpha transparency | 9:16 portrait",
    subject: {
      variant: ZARA_CHARACTER_BASE,
      pose: "Full-body standing, edgy confident pose, dramatic body language, conceptual art-fashion stance, intense direct gaze, powerful presence for experimental conceptual photography",
      hair_color: "black",
      hair_style: "long flowing black hair with dramatic styling",
      skin_finish: "Fair complexion with dramatic lighting",
      hand_and_nail_details: "Dramatic conceptual hand positioning",
      tattoos: "none",
      piercings: "none",
      body_art: "none",
      nail_art: "Edgy dark manicure",
      high_heels: "not visible"
    },
    wardrobe: "EXPERIMENTAL MODE: Draped conceptual black fabric creating sculptural silhouette, emphasis on form and shadow over exposure, edgy minimalist accessories, dramatic editorial makeup with strong eyes",
    environment: "PURE TRANSPARENT BACKGROUND (alpha channel)",
    lighting: "High-contrast dramatic lighting, strong rim light creating sculptural shadows, edgy conceptual aesthetic",
    camera: {
      focal_length: "85mm f/1.8",
      aperture: "f/1.8",
      distance: "2 m",
      angle: "Dramatic angle emphasizing conceptual composition",
      framing: "Full body portrait with experimental edgy composition"
    },
    color_grade: "High contrast, desaturated with selective color, edgy editorial aesthetic",
    style: "Contemporary art photography, conceptual fashion, body as sculptural form",
    quality: "Hasselblad, PNG with alpha, 1080x1920, experimental fashion editorial",
    figure_and_form: "Dramatic curves showcased through conceptual fabric draping, sculptural aesthetic",
    skin_micro_details: "Fair complexion in dramatic conceptual lighting",
    fabric_physics: "Conceptual fabric creating sculptural geometric forms",
    material_properties: "Matte black conceptual fabric with dramatic light interaction"
  }
};

export const vnSpritePlatinum: ArtisticConcept = {
  name: 'VN Sprite: Zara Platinum Mode',
  data: {
    shot: "LUXURY EDITORIAL FASHION PHOTOGRAPHY | Full-body character sprite | PNG with alpha transparency | 9:16 portrait",
    subject: {
      variant: ZARA_CHARACTER_BASE,
      pose: "Full-body standing, luxury editorial pose, sophisticated glamorous presence, confident sensual stance, polished professional model energy, Vogue cover quality",
      hair_color: "black",
      hair_style: "long flowing black hair with luxury styling, polished waves",
      skin_finish: "Fair complexion with luminous luxury finish",
      hand_and_nail_details: "Elegant luxury hand positioning, glamorous manicure",
      tattoos: "none",
      piercings: "none",
      body_art: "none",
      nail_art: "Luxury nude or metallic polish",
      high_heels: "not visible"
    },
    wardrobe: "PLATINUM MODE: High-end champagne silk slip dress with subtle lace details, luxury draped fabrics, partial coverage with implied elegance, designer jewelry (statement earrings, delicate bracelet), sophisticated glamorous makeup",
    environment: "PURE TRANSPARENT BACKGROUND (alpha channel)",
    lighting: "Polished professional luxury lighting, soft key with subtle fill, refined glamorous illumination, jewel-toned accents",
    camera: {
      focal_length: "85mm f/1.4",
      aperture: "f/1.8",
      distance: "2 m",
      angle: "Eye-level luxury editorial perspective",
      framing: "Full body portrait with sophisticated luxury composition"
    },
    color_grade: "Rich warm tones with jewel accents, luxury editorial color grading, polished sophistication",
    style: "Vogue editorials, luxury fashion campaigns, sophisticated glamour",
    quality: "Hasselblad, PNG with alpha, 1080x1920, luxury editorial quality",
    figure_and_form: "Dramatic curves elegantly showcased in luxury silk, sophisticated sensuality",
    skin_micro_details: "Fair complexion with luminous luxury finish, professional retouching",
    fabric_physics: "Luxury silk draping elegantly with natural flow",
    material_properties: "Champagne silk with elegant sheen, designer jewelry with realistic luxury materials"
  }
};

export const vnSpriteVera: ArtisticConcept = {
  name: 'VN Sprite: Zara Vera Mode',
  data: {
    shot: "INTIMATE PORTRAIT PHOTOGRAPHY | Full-body character sprite | PNG with alpha transparency | 9:16 portrait",
    subject: {
      variant: ZARA_CHARACTER_BASE,
      pose: "Full-body standing, vulnerable intimate posture, soft emotional presence, open trusting body language, gentle direct gaze showing emotional honesty, natural authentic energy",
      hair_color: "black",
      hair_style: "long flowing black hair naturally loose, intimate casual styling",
      skin_finish: "Fair complexion with natural emotional glow",
      hand_and_nail_details: "Gentle vulnerable hand placement, natural manicure",
      tattoos: "none",
      piercings: "none",
      body_art: "none",
      nail_art: "Natural clean polish",
      high_heels: "not visible"
    },
    wardrobe: "VERA MODE: Simple ivory camisole with delicate straps, soft intimacy emphasizing vulnerability over sexuality, minimal jewelry, natural emotional makeup, focus on genuine connection",
    environment: "PURE TRANSPARENT BACKGROUND (alpha channel)",
    lighting: "Soft diffused natural light, gentle shadows, warm intimate tones, tender emotional lighting",
    camera: {
      focal_length: "85mm f/1.4",
      aperture: "f/1.4",
      distance: "2 m",
      angle: "Eye-level intimate perspective",
      framing: "Full body portrait with intimate emotional composition"
    },
    color_grade: "Warm soft tones, natural intimate color grading, emotional documentary aesthetic",
    style: "Intimate portrait photography, emotional honesty, vulnerable documentary style",
    quality: "Canon EOS R5, PNG with alpha, 1080x1920, intimate portrait quality",
    figure_and_form: "Natural curves softly visible, vulnerability and emotional honesty emphasized",
    skin_micro_details: "Fair complexion with natural emotional authenticity",
    fabric_physics: "Soft intimate fabric draping naturally",
    material_properties: "Soft ivory fabric with gentle intimate lighting"
  }
};

export const vnSpriteArtistic: ArtisticConcept = {
  name: 'VN Sprite: Zara Artistic Mode',
  data: {
    shot: "FINE ART NUDE PHOTOGRAPHY | Full-body character sprite | PNG with alpha transparency | 9:16 portrait",
    subject: {
      variant: ZARA_CHARACTER_BASE,
      pose: "Full-body standing, classical art-nude pose, sculptural stance emphasizing form and shadow, confident artistic presence, museum-quality composition, body as art form following Helmut Newton tradition",
      hair_color: "black",
      hair_style: "long flowing black hair naturally loose, classical art styling",
      skin_finish: "Fair complexion with sculptural chiaroscuro lighting",
      hand_and_nail_details: "Classical art pose hand placement, natural elegant",
      tattoos: "none",
      piercings: "none",
      body_art: "none",
      nail_art: "Natural clean",
      high_heels: "not visible"
    },
    wardrobe: "ARTISTIC MODE: Tasteful art-nude with minimal strategic silk wrap creating classical sculpture aesthetic, emphasis on light, shadow, and form, NO explicit detail, artistic merit focus, museum-quality composition",
    environment: "PURE TRANSPARENT BACKGROUND (alpha channel)",
    lighting: "Dramatic single-source chiaroscuro lighting creating sculptural shadows, strong contrast, museum-quality illumination, Helmut Newton influence",
    camera: {
      focal_length: "85mm f/1.4",
      aperture: "f/2.0",
      distance: "2 m",
      angle: "Classical art angle emphasizing sculptural form",
      framing: "Full body portrait with fine art classical composition"
    },
    color_grade: "High contrast black & white or desaturated tones, fine art aesthetic, museum quality",
    style: "Helmut Newton, Irving Penn, Robert Mapplethorpe (form not explicitness), fine art nude tradition, sculptural emphasis",
    quality: "Hasselblad, PNG with alpha, 1080x1920, museum-quality fine art",
    figure_and_form: "Dramatic curves as sculptural art form, light and shadow emphasis, classical beauty",
    skin_micro_details: "Fair complexion with dramatic chiaroscuro, sculptural skin rendering",
    fabric_physics: "Minimal silk wrap creating tasteful art-nude aesthetic",
    material_properties: "Dramatic lighting creating museum-quality fine art atmosphere"
  }
};

// --- STORY-SPECIFIC MOMENT SPRITES (2) ---

export const vnSpriteCrisisReveal: ArtisticConcept = {
  name: 'VN Sprite: Zara Crisis Reveal',
  data: {
    shot: "PROFESSIONAL FASHION PHOTOGRAPHY | Full-body character sprite | PNG with alpha transparency | 9:16 portrait",
    subject: {
      variant: ZARA_CHARACTER_BASE,
      pose: "Full-body standing, emotional vulnerable expression, mid-shoot personal moment, eyes showing depth of personal memory, mixture of professional composure with emotional breakthrough, raw authentic moment",
      hair_color: "black",
      hair_style: "long flowing black hair, slightly disheveled from emotional moment",
      skin_finish: "Fair complexion with emotional authenticity",
      hand_and_nail_details: "One hand touching face in emotional gesture, vulnerable placement",
      tattoos: "none",
      piercings: "none",
      body_art: "none",
      nail_art: "Natural neutral",
      high_heels: "not visible"
    },
    wardrobe: "Current mode outfit with emotional vulnerability visible",
    environment: "PURE TRANSPARENT BACKGROUND (alpha channel)",
    lighting: "Soft emotional lighting capturing vulnerable breakthrough moment",
    camera: {
      focal_length: "85mm f/1.8",
      aperture: "f/1.8",
      distance: "2 m",
      angle: "Eye-level capturing emotional authenticity",
      framing: "Full body portrait with emotional breakthrough composition"
    },
    color_grade: "Warm emotional tones, raw authenticity visible",
    style: "Documentary emotional portrait, authentic breakthrough moment",
    quality: "Canon EOS R5, PNG with alpha, 1080x1920, emotional story moment",
    figure_and_form: "Vulnerable posture, emotional authenticity radiating",
    skin_micro_details: "Fair complexion with real emotion visible",
    fabric_physics: "Natural draping with emotional moment",
    material_properties: "Soft emotional lighting on all elements"
  }
};

export const vnSpriteWrapSatisfied: ArtisticConcept = {
  name: 'VN Sprite: Zara Wrap Satisfied',
  data: {
    shot: "PROFESSIONAL FASHION PHOTOGRAPHY | Full-body character sprite | PNG with alpha transparency | 9:16 portrait",
    subject: {
      variant: ZARA_CHARACTER_BASE,
      pose: "Full-body standing, relaxed satisfied posture, genuine contentment smile, eyes showing fulfillment and accomplishment, comfortable casual body language, end-of-day satisfaction radiating",
      hair_color: "black",
      hair_style: "long flowing black hair naturally loose, end-of-day casual",
      skin_finish: "Fair complexion with satisfied glow",
      hand_and_nail_details: "Relaxed satisfied hand placement",
      tattoos: "none",
      piercings: "none",
      body_art: "none",
      nail_art: "Clean neutral",
      high_heels: "not visible"
    },
    wardrobe: "Back to casual-professional arrival outfit, relaxed end-of-day energy",
    environment: "PURE TRANSPARENT BACKGROUND (alpha channel)",
    lighting: "Warm satisfied lighting, comfortable end-of-day atmosphere",
    camera: {
      focal_length: "85mm f/1.8",
      aperture: "f/1.8",
      distance: "2 m",
      angle: "Eye-level capturing satisfaction",
      framing: "Full body portrait with satisfied completion composition"
    },
    color_grade: "Warm satisfied tones, accomplishment visible",
    style: "Casual portrait, genuine satisfaction, completion energy",
    quality: "Canon EOS R5, PNG with alpha, 1080x1920",
    figure_and_form: "Relaxed satisfied posture, accomplishment radiating",
    skin_micro_details: "Fair complexion with glow of satisfaction",
    fabric_physics: "Relaxed end-of-day draping",
    material_properties: "Warm satisfied lighting on all elements"
  }
};

// ============================================================================
// BACKGROUNDS - Studio Settings (8 backgrounds)
// ============================================================================

export const vnBgStudioMorningArrival: ArtisticConcept = {
  name: 'VN BG: Studio Morning Arrival',
  data: {
    shot: "VISUAL NOVEL BACKGROUND | Professional photography | 16:9 widescreen | 1920x1080px",
    subject: {
      variant: "Professional photography studio interior, morning scene, NO people visible",
      pose: "N/A - Background scene",
      hair_color: "N/A",
      hair_style: "N/A",
      skin_finish: "N/A",
      hand_and_nail_details: "N/A",
      tattoos: "N/A",
      piercings: "N/A",
      body_art: "N/A",
      nail_art: "N/A",
      high_heels: "N/A"
    },
    wardrobe: "N/A - Background scene",
    environment: "LOCATION: Minimal white professional photography studio, industrial loft aesthetic, exposed white-painted brick walls, high ceilings with exposed beams, polished concrete floor, large windows with cool daylight filtering through blinds creating linear shadow patterns, clean professional workspace. Clear foreground for character placement (lower third empty), studio depth showing professional photography environment",
    lighting: "TIME & LIGHTING: Morning, cool daylight through windows with blinds creating linear light/shadow patterns, professional clean atmosphere, bright welcoming workspace illumination. ATMOSPHERE: Fresh start energy, professional clean space, creative potential",
    camera: {
      focal_length: "35mm",
      aperture: "f/2.8",
      distance: "N/A",
      angle: "Eye level, architectural photography",
      framing: "16:9 widescreen, professional studio composition"
    },
    color_grade: "Cool professional tones with warm accents, clean morning light, architectural photography aesthetic",
    style: "Architectural environmental photography, professional studio documentation, visual novel background standard",
    quality: "Commercial visual novel quality, 1920x1080, professional photography studio atmosphere",
    figure_and_form: "Industrial loft architecture with clean professional composition",
    skin_micro_details: "N/A - Background scene",
    fabric_physics: "N/A - Background scene",
    material_properties: "White-painted brick texture, polished concrete floor with realistic reflection, glass windows with blinds creating linear shadows"
  }
};

export const vnBgWardrobeArea: ArtisticConcept = {
  name: 'VN BG: Wardrobe Area',
  data: {
    shot: "VISUAL NOVEL BACKGROUND | Professional photography | 16:9 widescreen | 1920x1080px",
    subject: {
      variant: "Photography studio wardrobe prep area, NO people visible",
      pose: "N/A",
      hair_color: "N/A",
      hair_style: "N/A",
      skin_finish: "N/A",
      hand_and_nail_details: "N/A",
      tattoos: "N/A",
      piercings: "N/A",
      body_art: "N/A",
      nail_art: "N/A",
      high_heels: "N/A"
    },
    wardrobe: "N/A",
    environment: "LOCATION: Studio wardrobe/prep area, clothing racks with various fabric samples and outfits visible, professional styling station with mirror, softboxes visible in background, organized creative workspace. Clear foreground for sprites",
    lighting: "Mixed studio lighting, natural daylight combined with professional studio lights, bright prep area atmosphere",
    camera: {
      focal_length: "35mm",
      aperture: "f/2.8",
      distance: "N/A",
      angle: "Eye level",
      framing: "16:9 showing wardrobe prep environment"
    },
    color_grade: "Professional bright tones, clean workspace aesthetic",
    style: "Professional studio environmental photography",
    quality: "Commercial VN quality, 1920x1080, authentic studio atmosphere",
    figure_and_form: "Studio workspace architecture",
    skin_micro_details: "N/A",
    fabric_physics: "N/A",
    material_properties: "Various fabric textures on wardrobe racks, mirror with realistic reflection, studio equipment"
  }
};

export const vnBgStudioCenterNeutral: ArtisticConcept = {
  name: 'VN BG: Studio Center Neutral',
  data: {
    shot: "VISUAL NOVEL BACKGROUND | Professional photography | 16:9 widescreen | 1920x1080px",
    subject: {
      variant: "Photography studio center shooting area, NO people",
      pose: "N/A",
      hair_color: "N/A",
      hair_style: "N/A",
      skin_finish: "N/A",
      hand_and_nail_details: "N/A",
      tattoos: "N/A",
      piercings: "N/A",
      body_art: "N/A",
      nail_art: "N/A",
      high_heels: "N/A"
    },
    wardrobe: "N/A",
    environment: "LOCATION: Studio center shooting area, white seamless backdrop visible, one key light and C-stand visible, camera on tripod partially visible, professional setup ready for shoot. Clear foreground",
    lighting: "Professional 3-point studio lighting setup visible, neutral professional illumination, classic photography lighting",
    camera: {
      focal_length: "35mm",
      aperture: "f/2.8",
      distance: "N/A",
      angle: "Eye level",
      framing: "16:9 studio center composition"
    },
    color_grade: "Neutral professional tones, clean studio aesthetic",
    style: "Professional studio photography environment",
    quality: "Commercial VN quality, 1920x1080",
    figure_and_form: "Studio architecture with professional equipment",
    skin_micro_details: "N/A",
    fabric_physics: "N/A",
    material_properties: "White backdrop fabric, metallic studio equipment stands, professional camera gear"
  }
};

export const vnBgStudioHighContrast: ArtisticConcept = {
  name: 'VN BG: Studio High Contrast (Experimental)',
  data: {
    shot: "VISUAL NOVEL BACKGROUND | Conceptual photography | 16:9 widescreen | 1920x1080px",
    subject: {
      variant: "Photography studio with dramatic high-contrast lighting setup, NO people",
      pose: "N/A",
      hair_color: "N/A",
      hair_style: "N/A",
      skin_finish: "N/A",
      hand_and_nail_details: "N/A",
      tattoos: "N/A",
      piercings: "N/A",
      body_art: "N/A",
      nail_art: "N/A",
      high_heels: "N/A"
    },
    wardrobe: "N/A",
    environment: "LOCATION: Studio configured for experimental high-contrast shoot, Newton-inspired dramatic rim lighting visible, strong shadows, dark backdrop, sculptural atmosphere. Clear foreground",
    lighting: "Dramatic high-contrast lighting, strong rim light creating sculptural shadows, edgy conceptual atmosphere, Newton-esque chiaroscuro",
    camera: {
      focal_length: "35mm",
      aperture: "f/2.8",
      distance: "N/A",
      angle: "Dramatic angle emphasizing contrast",
      framing: "16:9 experimental dramatic composition"
    },
    color_grade: "High contrast, desaturated with strong blacks, edgy editorial aesthetic",
    style: "Conceptual art photography environment, dramatic experimental setup",
    quality: "Commercial VN quality, 1920x1080, dramatic atmosphere",
    figure_and_form: "Dramatic sculptural studio architecture",
    skin_micro_details: "N/A",
    fabric_physics: "N/A",
    material_properties: "Dark backdrop creating dramatic atmosphere, rim lights with strong directional quality"
  }
};

export const vnBgStudioSoftGlow: ArtisticConcept = {
  name: 'VN BG: Studio Soft Glow (Vera)',
  data: {
    shot: "VISUAL NOVEL BACKGROUND | Intimate photography | 16:9 widescreen | 1920x1080px",
    subject: {
      variant: "Photography studio with soft intimate lighting setup, NO people",
      pose: "N/A",
      hair_color: "N/A",
      hair_style: "N/A",
      skin_finish: "N/A",
      hand_and_nail_details: "N/A",
      tattoos: "N/A",
      piercings: "N/A",
      body_art: "N/A",
      nail_art: "N/A",
      high_heels: "N/A"
    },
    wardrobe: "N/A",
    environment: "LOCATION: Studio configured for intimate portrait photography, diffused soft lighting setup visible, warm tones, intimate portraiture environment. Clear foreground",
    lighting: "Soft diffused lighting creating intimate portraiture atmosphere, warm inviting tones, gentle shadows, emotional photography setup",
    camera: {
      focal_length: "35mm",
      aperture: "f/2.8",
      distance: "N/A",
      angle: "Eye level intimate perspective",
      framing: "16:9 intimate portrait environment composition"
    },
    color_grade: "Warm soft tones, intimate emotional color grading",
    style: "Intimate portrait photography environment, emotional documentary setup",
    quality: "Commercial VN quality, 1920x1080, warm intimate atmosphere",
    figure_and_form: "Intimate studio architecture",
    skin_micro_details: "N/A",
    fabric_physics: "N/A",
    material_properties: "Soft diffused lighting with warm intimate quality"
  }
};

export const vnBgStudioPlatinum: ArtisticConcept = {
  name: 'VN BG: Studio Platinum Setup',
  data: {
    shot: "VISUAL NOVEL BACKGROUND | Luxury editorial photography | 16:9 widescreen | 1920x1080px",
    subject: {
      variant: "Photography studio with luxury editorial setup, NO people",
      pose: "N/A",
      hair_color: "N/A",
      hair_style: "N/A",
      skin_finish: "N/A",
      hand_and_nail_details: "N/A",
      tattoos: "N/A",
      piercings: "N/A",
      body_art: "N/A",
      nail_art: "N/A",
      high_heels: "N/A"
    },
    wardrobe: "N/A",
    environment: "LOCATION: Studio configured for luxury editorial shoot, polished professional lighting setup, jewel-toned accent props visible, glamorous Vogue-quality atmosphere. Clear foreground",
    lighting: "Polished professional luxury lighting, soft key with subtle fill, jewel-toned accents, sophisticated glamorous illumination",
    camera: {
      focal_length: "35mm",
      aperture: "f/2.8",
      distance: "N/A",
      angle: "Eye level luxury perspective",
      framing: "16:9 luxury editorial environment composition"
    },
    color_grade: "Rich warm tones with jewel accents, luxury editorial color grading",
    style: "Luxury fashion editorial environment, Vogue-quality setup",
    quality: "Premium VN quality, 1920x1080, luxury atmosphere",
    figure_and_form: "Sophisticated luxury studio architecture",
    skin_micro_details: "N/A",
    fabric_physics: "N/A",
    material_properties: "Polished professional equipment, jewel-toned accent elements, luxury atmosphere"
  }
};

export const vnBgStudioArtistic: ArtisticConcept = {
  name: 'VN BG: Studio Artistic Setup',
  data: {
    shot: "VISUAL NOVEL BACKGROUND | Fine art photography | 16:9 widescreen | 1920x1080px",
    subject: {
      variant: "Photography studio with fine art nude setup, NO people",
      pose: "N/A",
      hair_color: "N/A",
      hair_style: "N/A",
      skin_finish: "N/A",
      hand_and_nail_details: "N/A",
      tattoos: "N/A",
      piercings: "N/A",
      body_art: "N/A",
      nail_art: "N/A",
      high_heels: "N/A"
    },
    wardrobe: "N/A",
    environment: "LOCATION: Studio configured for fine art photography, minimal sculptural setting, dramatic chiaroscuro lighting setup visible, museum-quality aesthetic environment. Clear foreground",
    lighting: "Dramatic single-source chiaroscuro lighting, strong contrast, museum-quality illumination, Helmut Newton influence",
    camera: {
      focal_length: "35mm",
      aperture: "f/2.8",
      distance: "N/A",
      angle: "Classical art angle",
      framing: "16:9 fine art museum-quality composition"
    },
    color_grade: "High contrast or desaturated tones, fine art aesthetic, museum quality",
    style: "Fine art photography environment, museum-quality setup, classical beauty tradition",
    quality: "Premium VN quality, 1920x1080, museum atmosphere",
    figure_and_form: "Minimal sculptural studio architecture",
    skin_micro_details: "N/A",
    fabric_physics: "N/A",
    material_properties: "Dramatic lighting creating museum-quality fine art atmosphere"
  }
};

export const vnBgStudioWrap: ArtisticConcept = {
  name: 'VN BG: Studio Wrap',
  data: {
    shot: "VISUAL NOVEL BACKGROUND | Documentary photography | 16:9 widescreen | 1920x1080px",
    subject: {
      variant: "Photography studio end-of-day scene, NO people",
      pose: "N/A",
      hair_color: "N/A",
      hair_style: "N/A",
      skin_finish: "N/A",
      hand_and_nail_details: "N/A",
      tattoos: "N/A",
      piercings: "N/A",
      body_art: "N/A",
      nail_art: "N/A",
      high_heels: "N/A"
    },
    wardrobe: "N/A",
    environment: "LOCATION: Studio end-of-day wrap, equipment being casually packed, relaxed atmosphere, warm casual energy, completed work day feeling. Clear foreground",
    lighting: "Warm casual end-of-day lighting, comfortable atmosphere, satisfied completion mood",
    camera: {
      focal_length: "35mm",
      aperture: "f/2.8",
      distance: "N/A",
      angle: "Eye level documentary perspective",
      framing: "16:9 end-of-day studio composition"
    },
    color_grade: "Warm satisfied tones, casual comfortable aesthetic",
    style: "Documentary behind-the-scenes photography, authentic wrap atmosphere",
    quality: "Commercial VN quality, 1920x1080, warm satisfied atmosphere",
    figure_and_form: "Casual end-of-day studio architecture",
    skin_micro_details: "N/A",
    fabric_physics: "N/A",
    material_properties: "Studio equipment in casual packing state, warm satisfied lighting"
  }
};

// ============================================================================
// CG IMAGES - Pivotal Story Moments (10 CG images)
// ============================================================================

// Note: Due to length constraints, I'll create abbreviated versions of the CG concepts
// following the same pattern as the detailed sprites and backgrounds above.
// In a production environment, these would be fully detailed like the sprite concepts.

export const vnCgFirstGreeting: ArtisticConcept = {
  name: 'VN CG: First Greeting',
  data: {
    shot: "VISUAL NOVEL CG IMAGE | Cinematic scene | 16:9 widescreen | 1920x1080px",
    subject: {
      variant: ZARA_CHARACTER_BASE + ", meeting photographer in morning studio, warm professional energy",
      pose: "Zara and photographer (viewer POV - partial hand/shoulder visible) meeting in morning studio, warm friendly handshake beginning, genuine professional smile, welcoming body language",
      hair_color: "black",
      hair_style: "long flowing naturally",
      skin_finish: "Fair complexion in morning studio light",
      hand_and_nail_details: "Hand extended in professional greeting",
      tattoos: "none",
      piercings: "none",
      body_art: "none",
      nail_art: "Clean neutral",
      high_heels: "not visible"
    },
    wardrobe: "Casual-professional arrival outfit",
    environment: "Morning studio with cool daylight through windows, professional first meeting atmosphere",
    lighting: "Cool morning daylight creating professional welcoming atmosphere",
    camera: {
      focal_length: "50mm",
      aperture: "f/2.0",
      distance: "1.5 m",
      angle: "Viewer POV, eye level",
      framing: "Medium shot, 16:9 cinematic"
    },
    color_grade: "Cool professional morning tones with warm human connection",
    style: "Cinematic VN CG, professional first meeting, authentic connection beginning",
    quality: "Premium CG quality, 1920x1080, key story moment",
    figure_and_form: "Professional welcoming posture, first meeting energy",
    skin_micro_details: "Fair complexion in natural morning light",
    fabric_physics: "Natural casual-professional draping",
    material_properties: "Morning studio lighting on all elements"
  }
};

export const vnCgLighttestTechnical: ArtisticConcept = {
  name: 'VN CG: Light Test Technical',
  data: {
    shot: "VISUAL NOVEL CG IMAGE | Documentary scene | 16:9 widescreen | 1920x1080px",
    subject: {
      variant: ZARA_CHARACTER_BASE + ", during technical light test, professional focus",
      pose: "Zara standing in studio center under test lighting, photographer (viewer POV - hands adjusting light meter visible in foreground) checking exposure, Zara holding professional pose while light is adjusted, collaborative technical moment",
      hair_color: "black",
      hair_style: "long flowing naturally",
      skin_finish: "Fair complexion under test lighting",
      hand_and_nail_details: "Hands in professional modeling pose",
      tattoos: "none",
      piercings: "none",
      body_art: "none",
      nail_art: "Clean neutral",
      high_heels: "not visible"
    },
    wardrobe: "Casual-professional arrival outfit",
    environment: "Studio center with lighting equipment visible, technical setup atmosphere, professional collaboration moment",
    lighting: "Test lighting being adjusted, various light positions visible, professional studio atmosphere",
    camera: {
      focal_length: "35mm",
      aperture: "f/2.8",
      distance: "2.5 m",
      angle: "Photographer POV showing technical setup",
      framing: "Wide shot showing studio setup, 16:9 cinematic"
    },
    color_grade: "Neutral professional tones, documentary aesthetic",
    style: "Behind-the-scenes documentary, authentic professional collaboration",
    quality: "Premium CG quality, 1920x1080, technical moment capture",
    figure_and_form: "Professional modeling stance during technical preparation",
    skin_micro_details: "Fair complexion in test lighting conditions",
    fabric_physics: "Natural professional draping",
    material_properties: "Studio equipment and professional atmosphere"
  }
};

export const vnCgFirstFrameVulnerable: ArtisticConcept = {
  name: 'VN CG: First Frame - Vulnerable',
  data: {
    shot: "VISUAL NOVEL CG IMAGE | Intimate portrait | 16:9 widescreen | 1920x1080px",
    subject: {
      variant: ZARA_CHARACTER_BASE + ", first signature shot, vulnerable emotional approach",
      pose: "Zara in vulnerable portrait pose, soft eyes downcast then lifting to camera, one hand nervously touching neck, shoulders relaxed forward, genuine emotional vulnerability, intimate moment of trust being built",
      hair_color: "black",
      hair_style: "long flowing softly framing face",
      skin_finish: "Fair complexion with soft emotional glow",
      hand_and_nail_details: "Nervous vulnerable hand placement at neck",
      tattoos: "none",
      piercings: "none",
      body_art: "none",
      nail_art: "Clean neutral",
      high_heels: "not visible"
    },
    wardrobe: "Current mode outfit with vulnerable energy",
    environment: "Studio shooting area, soft focus background emphasizing emotional intimacy of the moment",
    lighting: "Soft diffused lighting emphasizing vulnerability and emotional honesty",
    camera: {
      focal_length: "85mm",
      aperture: "f/1.4",
      distance: "1.5 m",
      angle: "Slightly above eye level, gentle vulnerable perspective",
      framing: "Medium close-up, 16:9 emotional portrait"
    },
    color_grade: "Soft warm tones, emotional vulnerability emphasized",
    style: "Intimate portrait photography, emotional breakthrough moment",
    quality: "Premium CG quality, 1920x1080, pivotal emotional moment",
    figure_and_form: "Vulnerable posture showcasing emotional trust",
    skin_micro_details: "Fair complexion with authentic emotion visible",
    fabric_physics: "Soft draping with vulnerable movement",
    material_properties: "Tender emotional lighting on all elements"
  }
};

export const vnCgFirstFrameCommanding: ArtisticConcept = {
  name: 'VN CG: First Frame - Commanding',
  data: {
    shot: "VISUAL NOVEL CG IMAGE | Power portrait | 16:9 widescreen | 1920x1080px",
    subject: {
      variant: ZARA_CHARACTER_BASE + ", first signature shot, commanding powerful approach",
      pose: "Zara in powerful editorial pose, chin up, shoulders back, intense direct gaze into camera, one hand on hip in strong stance, dominant confident energy, professional model power radiating, fashion editorial command",
      hair_color: "black",
      hair_style: "long flowing with dramatic volume",
      skin_finish: "Fair complexion with powerful dramatic lighting",
      hand_and_nail_details: "Strong hand on hip, commanding placement",
      tattoos: "none",
      piercings: "none",
      body_art: "none",
      nail_art: "Professional neutral",
      high_heels: "not visible"
    },
    wardrobe: "Current mode outfit with powerful commanding presence",
    environment: "Studio shooting area with dramatic lighting setup visible, powerful editorial atmosphere",
    lighting: "Strong dramatic lighting emphasizing power and confidence, high contrast",
    camera: {
      focal_length: "85mm",
      aperture: "f/2.0",
      distance: "2 m",
      angle: "Slightly below eye level to emphasize commanding power",
      framing: "Medium shot, 16:9 powerful editorial composition"
    },
    color_grade: "High contrast dramatic tones, powerful editorial aesthetic",
    style: "High-fashion editorial photography, commanding presence capture",
    quality: "Premium CG quality, 1920x1080, powerful signature moment",
    figure_and_form: "Dramatic curves showcased with powerful commanding stance",
    skin_micro_details: "Fair complexion in dramatic powerful lighting",
    fabric_physics: "Strong confident draping",
    material_properties: "Dramatic lighting creating powerful atmosphere"
  }
};

export const vnCgFirstFramePlayful: ArtisticConcept = {
  name: 'VN CG: First Frame - Playful',
  data: {
    shot: "VISUAL NOVEL CG IMAGE | Candid moment | 16:9 widescreen | 1920x1080px",
    subject: {
      variant: ZARA_CHARACTER_BASE + ", first signature shot, playful spontaneous approach",
      pose: "Zara mid-laugh, genuine spontaneous joy, eyes bright and sparkling, one hand gesturing in animated conversation with photographer, head tilted naturally with happiness, relaxed playful body language, authentic joyful moment captured",
      hair_color: "black",
      hair_style: "long flowing with natural movement from laughter",
      skin_finish: "Fair complexion glowing with genuine happiness",
      hand_and_nail_details: "Animated playful gesture mid-conversation",
      tattoos: "none",
      piercings: "none",
      body_art: "none",
      nail_art: "Clean neutral",
      high_heels: "not visible"
    },
    wardrobe: "Current mode outfit with playful joyful energy",
    environment: "Studio shooting area, bright welcoming atmosphere capturing spontaneous moment",
    lighting: "Bright warm lighting emphasizing joy and spontaneous energy",
    camera: {
      focal_length: "50mm",
      aperture: "f/2.0",
      distance: "1.5 m",
      angle: "Eye level capturing candid playful moment",
      framing: "Medium shot, 16:9 candid joyful composition"
    },
    color_grade: "Bright warm inviting tones, joyful spontaneous energy",
    style: "Candid fashion photography, authentic spontaneous beauty",
    quality: "Premium CG quality, 1920x1080, joyful signature moment",
    figure_and_form: "Relaxed playful posture, natural joy radiating",
    skin_micro_details: "Fair complexion glowing with genuine laughter",
    fabric_physics: "Natural animated movement with playful energy",
    material_properties: "Bright cheerful lighting on all elements"
  }
};

export const vnCgPersonalReveal: ArtisticConcept = {
  name: 'VN CG: Personal Reveal',
  data: {
    shot: "VISUAL NOVEL CG IMAGE | Emotional intimate moment | 16:9 widescreen | 1920x1080px",
    subject: {
      variant: ZARA_CHARACTER_BASE + ", mid-shoot emotional breakthrough, personal story moment",
      pose: "Zara in close intimate framing, eyes glistening with emotional memory, one hand touching face in vulnerable gesture, mixture of professional composure with raw authentic emotion, personal story being shared, vulnerable breakthrough moment",
      hair_color: "black",
      hair_style: "long flowing naturally, slightly disheveled from emotional moment",
      skin_finish: "Fair complexion with authentic emotional depth",
      hand_and_nail_details: "Hand touching face in vulnerable emotional gesture",
      tattoos: "none",
      piercings: "none",
      body_art: "none",
      nail_art: "Natural neutral",
      high_heels: "not visible"
    },
    wardrobe: "Current mode outfit with emotional vulnerability visible",
    environment: "Studio background softly blurred, all focus on emotional intimate moment of personal sharing",
    lighting: "Soft emotional lighting capturing vulnerable authentic moment",
    camera: {
      focal_length: "85mm",
      aperture: "f/1.4",
      distance: "1 m",
      angle: "Eye level capturing intimate emotional honesty",
      framing: "Close-up, 16:9 intimate emotional moment"
    },
    color_grade: "Warm emotional tones, authentic vulnerability emphasized",
    style: "Intimate documentary portrait, emotional breakthrough capture",
    quality: "Premium CG quality, 1920x1080, pivotal emotional story moment",
    figure_and_form: "Vulnerable emotional posture, authentic human connection",
    skin_micro_details: "Fair complexion with real emotion and tears visible",
    fabric_physics: "Natural draping in emotional authentic moment",
    material_properties: "Soft emotional lighting creating intimate atmosphere"
  }
};

export const vnCgClimaxExperimental: ArtisticConcept = {
  name: 'VN CG: Climax - Experimental Mode',
  data: {
    shot: "VISUAL NOVEL CG IMAGE | Conceptual art photography | 16:9 widescreen | 1920x1080px",
    subject: {
      variant: ZARA_CHARACTER_BASE + ", climactic experimental conceptual shot",
      pose: "Zara in dramatic conceptual art pose, sculptural body positioning emphasizing form and shadow, intense powerful gaze, draped conceptual black fabric creating geometric sculptural silhouette, contemporary art aesthetic, body as art form",
      hair_color: "black",
      hair_style: "long flowing with dramatic edgy styling",
      skin_finish: "Fair complexion in high-contrast dramatic chiaroscuro",
      hand_and_nail_details: "Dramatic conceptual hand positioning as sculptural element",
      tattoos: "none",
      piercings: "none",
      body_art: "none",
      nail_art: "Edgy dark manicure",
      high_heels: "visible - dramatic heels as part of composition"
    },
    wardrobe: "EXPERIMENTAL MODE: Draped conceptual black fabric creating sculptural geometric forms, edgy minimalist accessories, dramatic editorial makeup",
    environment: "Dark minimalist studio setup emphasizing sculptural form, conceptual art gallery aesthetic",
    lighting: "High-contrast dramatic rim lighting creating strong sculptural shadows, Newton-esque chiaroscuro",
    camera: {
      focal_length: "50mm",
      aperture: "f/2.8",
      distance: "2.5 m",
      angle: "Dramatic angle emphasizing sculptural composition",
      framing: "Full to medium shot, 16:9 conceptual art composition"
    },
    color_grade: "High contrast desaturated with selective color, edgy editorial aesthetic",
    style: "Contemporary art photography, Helmut Newton influence, body as sculptural form",
    quality: "Premium CG quality, 1920x1080, conceptual art masterpiece",
    figure_and_form: "Dramatic curves as sculptural geometric art, contemporary aesthetic",
    skin_micro_details: "Fair complexion in dramatic conceptual lighting",
    fabric_physics: "Conceptual fabric creating sculptural architectural forms",
    material_properties: "Matte black fabric with dramatic light/shadow interaction"
  }
};

export const vnCgClimaxPlatinum: ArtisticConcept = {
  name: 'VN CG: Climax - Platinum Mode',
  data: {
    shot: "VISUAL NOVEL CG IMAGE | Luxury editorial photography | 16:9 widescreen | 1920x1080px",
    subject: {
      variant: ZARA_CHARACTER_BASE + ", climactic platinum luxury editorial shot",
      pose: "Zara in sophisticated luxury editorial pose, elegant sensual stance, one hand gracefully positioned, confident glamorous presence radiating, polished Vogue cover energy, luxury fashion campaign aesthetic, sophisticated beauty",
      hair_color: "black",
      hair_style: "long flowing with luxury salon styling, polished elegant waves",
      skin_finish: "Fair complexion with luminous luxury finish",
      hand_and_nail_details: "Elegant luxury hand positioning, glamorous manicure",
      tattoos: "none",
      piercings: "none",
      body_art: "none",
      nail_art: "Luxury metallic or nude polish",
      high_heels: "visible - luxury designer heels"
    },
    wardrobe: "PLATINUM MODE: Champagne silk slip dress with subtle lace, luxury draped fabrics, designer jewelry (statement earrings, delicate bracelet), sophisticated glamorous makeup",
    environment: "Polished luxury studio setup, jewel-toned accent elements, high-end editorial atmosphere",
    lighting: "Polished professional luxury lighting, soft key with refined fill, sophisticated glamorous illumination",
    camera: {
      focal_length: "85mm",
      aperture: "f/1.8",
      distance: "2 m",
      angle: "Eye level luxury editorial perspective",
      framing: "Medium shot, 16:9 sophisticated luxury composition"
    },
    color_grade: "Rich warm tones with jewel accents, luxury editorial color grading",
    style: "Vogue editorial photography, luxury fashion campaign, sophisticated glamour",
    quality: "Premium CG quality, 1920x1080, luxury editorial masterpiece",
    figure_and_form: "Dramatic curves elegantly showcased in luxury silk, sophisticated sensuality",
    skin_micro_details: "Fair complexion with luminous professional retouching",
    fabric_physics: "Luxury silk draping elegantly with sophisticated flow",
    material_properties: "Champagne silk with elegant sheen, designer jewelry with realistic luxury materials"
  }
};

export const vnCgClimaxVera: ArtisticConcept = {
  name: 'VN CG: Climax - Vera Mode',
  data: {
    shot: "VISUAL NOVEL CG IMAGE | Intimate emotional portrait | 16:9 widescreen | 1920x1080px",
    subject: {
      variant: ZARA_CHARACTER_BASE + ", climactic vera intimate emotional shot",
      pose: "Zara in deeply vulnerable intimate pose, eyes showing profound emotional connection, soft genuine expression of trust and openness, natural authentic beauty emphasized, intimate personal moment of complete emotional honesty and vulnerability",
      hair_color: "black",
      hair_style: "long flowing naturally loose, intimate casual authentic styling",
      skin_finish: "Fair complexion with natural emotional radiance",
      hand_and_nail_details: "Gentle vulnerable hand placement showing trust",
      tattoos: "none",
      piercings: "none",
      body_art: "none",
      nail_art: "Natural clean polish",
      high_heels: "not visible"
    },
    wardrobe: "VERA MODE: Simple ivory camisole with delicate straps, soft intimacy emphasizing vulnerability over sexuality, minimal jewelry, natural emotional makeup",
    environment: "Intimate studio setting with soft focus, all emphasis on emotional connection and vulnerability",
    lighting: "Soft diffused natural light, gentle tender shadows, warm intimate tones",
    camera: {
      focal_length: "85mm",
      aperture: "f/1.4",
      distance: "1.5 m",
      angle: "Eye level intimate emotional perspective",
      framing: "Medium close-up, 16:9 intimate emotional composition"
    },
    color_grade: "Warm soft natural tones, emotional documentary aesthetic",
    style: "Intimate documentary portrait, emotional vulnerability and honesty",
    quality: "Premium CG quality, 1920x1080, intimate emotional masterpiece",
    figure_and_form: "Natural curves softly visible, vulnerability and authenticity emphasized",
    skin_micro_details: "Fair complexion with natural emotional authenticity",
    fabric_physics: "Soft intimate fabric draping naturally",
    material_properties: "Gentle intimate lighting creating tender atmosphere"
  }
};

export const vnCgClimaxArtistic: ArtisticConcept = {
  name: 'VN CG: Climax - Artistic Mode',
  data: {
    shot: "VISUAL NOVEL CG IMAGE | Fine art nude photography | 16:9 widescreen | 1920x1080px",
    subject: {
      variant: ZARA_CHARACTER_BASE + ", climactic artistic fine art nude shot, museum quality",
      pose: "Zara in classical fine art nude pose, sculptural stance emphasizing light, shadow, and form, confident artistic presence, museum-quality composition following Helmut Newton tradition, body as sculptural art form, NO explicit detail, emphasis on artistic merit and classical beauty",
      hair_color: "black",
      hair_style: "long flowing naturally, classical art styling",
      skin_finish: "Fair complexion with dramatic sculptural chiaroscuro lighting",
      hand_and_nail_details: "Classical art pose hand placement creating sculptural lines",
      tattoos: "none",
      piercings: "none",
      body_art: "none",
      nail_art: "Natural clean",
      high_heels: "not visible or tastefully integrated"
    },
    wardrobe: "ARTISTIC MODE: Tasteful fine art nude with minimal strategic silk wrap, emphasis on light/shadow/form, NO explicit detail, museum-quality classical aesthetic",
    environment: "Minimal sculptural studio setting, dramatic chiaroscuro, fine art gallery atmosphere",
    lighting: "Dramatic single-source chiaroscuro creating strong sculptural shadows, museum-quality illumination, Helmut Newton aesthetic",
    camera: {
      focal_length: "85mm",
      aperture: "f/2.0",
      distance: "2.5 m",
      angle: "Classical art angle emphasizing sculptural beauty",
      framing: "Full to medium shot, 16:9 fine art classical composition"
    },
    color_grade: "High contrast black & white or desaturated tones, fine art museum aesthetic",
    style: "Helmut Newton, Irving Penn, Robert Mapplethorpe (form emphasis), fine art nude tradition",
    quality: "Premium CG quality, 1920x1080, museum-quality fine art masterpiece",
    figure_and_form: "Dramatic curves as sculptural classical art form, light/shadow emphasis",
    skin_micro_details: "Fair complexion with dramatic chiaroscuro, sculptural skin rendering",
    fabric_physics: "Minimal silk wrap creating tasteful fine art aesthetic",
    material_properties: "Dramatic lighting creating museum-quality atmosphere"
  }
};

// ============================================================================
// CHARACTER SPRITES - INTIMATE WARDROBE (8 new sprites for 10-scene expansion)
// Scenes 5-10: Progressive intimacy pathway with boudoir and fine art photography
// ============================================================================

export const vnSpriteLingerieElegant: ArtisticConcept = {
  name: 'VN Sprite: Zara Lingerie Elegant',
  data: {
    shot: "INTIMATE BOUDOIR PHOTOGRAPHY | Full-body character sprite | PNG with alpha transparency | 9:16 portrait",
    subject: {
      variant: ZARA_CHARACTER_BASE,
      pose: "Full-body standing, weight on one leg creating elegant curve, confident sensual expression, direct warm eye contact, one hand on hip, other arm relaxed, sophisticated boudoir model presence, comfortable in intimate attire",
      hair_color: "black",
      hair_style: "long flowing in soft waves",
      skin_finish: "Fair complexion with warm boudoir glow",
      hand_and_nail_details: "Confident hand placement, elegant manicure",
      tattoos: "none",
      piercings: "none",
      body_art: "none",
      nail_art: "Classic elegant polish",
      high_heels: "classic boudoir heels visible"
    },
    wardrobe: "ELEGANT LINGERIE - Sophisticated ivory/champagne lace bra and high-waisted briefs set, delicate lace details, classic elegant design, subtle gold body chain, natural glamorous makeup, hair in soft waves",
    environment: "PURE TRANSPARENT BACKGROUND (alpha channel)",
    lighting: "Soft flattering boudoir lighting - diffused key light creating gentle shadows, warm color temperature, intimate atmosphere, beauty lighting emphasizing curves tastefully",
    camera: {
      focal_length: "85mm f/1.8",
      aperture: "f/1.8",
      distance: "2 m",
      angle: "Eye-level, full body framing",
      framing: "Full body portrait, 9:16 boudoir style"
    },
    color_grade: "Warm romantic tones, sophisticated boudoir aesthetic",
    style: "Elegant boudoir photography, sophisticated intimacy",
    quality: "Ultra-high-end 8K boudoir quality, PNG with alpha, 1080x1920",
    figure_and_form: "Dramatic curves elegantly showcased, confident sensuality",
    skin_micro_details: "Natural skin texture with warm boudoir glow",
    fabric_physics: "Delicate lace with realistic texture",
    material_properties: "Ivory lace with soft sheen, gold chain with metallic highlights"
  }
};

export const vnSpriteLingerieMinimal: ArtisticConcept = {
  name: 'VN Sprite: Zara Lingerie Minimal',
  data: {
    shot: "INTIMATE BOUDOIR PHOTOGRAPHY | Full-body character sprite | PNG with alpha transparency | 9:16 portrait",
    subject: {
      variant: ZARA_CHARACTER_BASE,
      pose: "Full-body standing, sensual curve emphasizing natural S-line, direct gaze with heightened intimacy, vulnerable yet confident, one hand gently touching thigh, sophisticated minimalist presence",
      hair_color: "black",
      hair_style: "long flowing naturally",
      skin_finish: "Fair complexion with intimate glow",
      hand_and_nail_details: "Sensual hand placement on thigh",
      tattoos: "none",
      piercings: "none",
      body_art: "none",
      nail_art: "Natural nude polish",
      high_heels: "not visible"
    },
    wardrobe: "MINIMAL LINGERIE - Black minimalist triangle bralette and matching high-waisted brief, clean lines, modern minimalist design, subtle sophistication, intimate coverage emphasizing form",
    environment: "PURE TRANSPARENT BACKGROUND (alpha channel)",
    lighting: "Intimate natural lighting creating soft shadows, warm tender illumination, heightened intimate atmosphere",
    camera: {
      focal_length: "85mm f/1.4",
      aperture: "f/1.8",
      distance: "2 m",
      angle: "Eye-level intimate perspective",
      framing: "Full body portrait, 9:16 intimate style"
    },
    color_grade: "Warm intimate tones, heightened sensuality",
    style: "Intimate boudoir photography, progressive intimacy",
    quality: "Ultra-high-end 8K intimate quality, PNG with alpha, 1080x1920",
    figure_and_form: "Dramatic curves with intimate minimal coverage",
    skin_micro_details: "Natural skin with intimate warm glow",
    fabric_physics: "Minimal fabric showing natural body contours",
    material_properties: "Matte black minimalist fabric"
  }
};

export const vnSpriteSilkRobe: ArtisticConcept = {
  name: 'VN Sprite: Zara Silk Robe',
  data: {
    shot: "ARTISTIC INTIMATE PHOTOGRAPHY | Full-body character sprite | PNG with alpha transparency | 9:16 portrait",
    subject: {
      variant: ZARA_CHARACTER_BASE,
      pose: "Full-body standing, robe partially open revealing artistic minimal coverage beneath, one hand holding robe edge, other hand on hip, confident artistic sensuality, museum-worthy presence",
      hair_color: "black",
      hair_style: "long flowing with natural movement",
      skin_finish: "Fair complexion with artistic lighting",
      hand_and_nail_details: "Artistic hand positioning with robe",
      tattoos: "none",
      piercings: "none",
      body_art: "none",
      nail_art: "Elegant nude polish",
      high_heels: "not visible"
    },
    wardrobe: "SILK ROBE (ARTISTIC) - Floor-length champagne/ivory silk robe worn open, revealing minimal artistic foundation garment beneath, flowing elegant draping, luxurious fabric movement, sophisticated artistic aesthetic",
    environment: "PURE TRANSPARENT BACKGROUND (alpha channel)",
    lighting: "Artistic soft directional light creating elegant shadows, sophisticated illumination, fine art quality lighting",
    camera: {
      focal_length: "85mm f/1.4",
      aperture: "f/1.8",
      distance: "2 m",
      angle: "Eye-level artistic perspective",
      framing: "Full body portrait, 9:16 artistic style"
    },
    color_grade: "Sophisticated warm tones, artistic aesthetic",
    style: "Fine art boudoir photography, artistic intimacy",
    quality: "Ultra-high-end 8K artistic quality, PNG with alpha, 1080x1920",
    figure_and_form: "Curves artistically revealed through flowing silk",
    skin_micro_details: "Natural skin with artistic lighting sculpting form",
    fabric_physics: "Silk robe flowing elegantly with realistic draping",
    material_properties: "Champagne silk with elegant sheen and liquid movement"
  }
};

export const vnSpriteArtisticDrape: ArtisticConcept = {
  name: 'VN Sprite: Zara Artistic Drape',
  data: {
    shot: "FINE ART PHOTOGRAPHY | Full-body character sprite | PNG with alpha transparency | 9:16 portrait",
    subject: {
      variant: ZARA_CHARACTER_BASE,
      pose: "Full-body standing in classical art pose, translucent silk artistically draped creating sculptural shapes, confident artistic presence, museum-quality composition, body as fine art form",
      hair_color: "black",
      hair_style: "long flowing in artistic arrangement",
      skin_finish: "Fair complexion with dramatic chiaroscuro",
      hand_and_nail_details: "Classical art pose hand placement",
      tattoos: "none",
      piercings: "none",
      body_art: "none",
      nail_art: "Natural clean",
      high_heels: "not visible"
    },
    wardrobe: "ARTISTIC SILK DRAPE - Single translucent ivory silk fabric artistically draped around form, creating Renaissance painting aesthetic, strategic partial coverage with sculptural shapes, concealing and revealing simultaneously, museum-quality fine art composition",
    environment: "PURE TRANSPARENT BACKGROUND (alpha channel)",
    lighting: "Dramatic chiaroscuro lighting (Caravaggio style) creating strong sculptural shadows, museum-quality illumination, fine art aesthetic",
    camera: {
      focal_length: "85mm f/2.0",
      aperture: "f/2.0",
      distance: "2 m",
      angle: "Classical fine art angle",
      framing: "Full body portrait, 9:16 fine art style"
    },
    color_grade: "Desaturated fine art tones, museum aesthetic, classical beauty",
    style: "Fine art nude tradition, Renaissance influence, sculptural emphasis",
    quality: "Museum-quality 8K fine art, PNG with alpha, 1080x1920",
    figure_and_form: "Curves as sculptural art form, light/shadow emphasis",
    skin_micro_details: "Dramatic chiaroscuro revealing sculptural skin texture",
    fabric_physics: "Translucent silk creating elegant sculptural shapes",
    material_properties: "Sheer ivory silk with ethereal translucent quality"
  }
};

export const vnSpriteMinimalArtistic: ArtisticConcept = {
  name: 'VN Sprite: Zara Minimal Artistic',
  data: {
    shot: "FINE ART NUDE PHOTOGRAPHY | Full-body character sprite | PNG with alpha transparency | 9:16 portrait",
    subject: {
      variant: ZARA_CHARACTER_BASE,
      pose: "Full-body standing in powerful artistic stance, minimal strategic coverage with artistic focus on form/light/shadow, confident fine art presence, body as ultimate art form, museum-worthy composition following Newton/Mapplethorpe tradition",
      hair_color: "black",
      hair_style: "long flowing naturally, fine art styling",
      skin_finish: "Fair complexion with sculptural lighting",
      hand_and_nail_details: "Powerful artistic hand placement",
      tattoos: "none",
      piercings: "none",
      body_art: "none",
      nail_art: "Natural",
      high_heels: "architectural heels visible as part of composition"
    },
    wardrobe: "MINIMAL ARTISTIC FOUNDATION - Single high-waisted minimalist black foundation piece providing tasteful strategic coverage, emphasis on sculptural form and dramatic lighting, museum-quality fine art aesthetic, NO explicit detail, artistic merit focus",
    environment: "PURE TRANSPARENT BACKGROUND (alpha channel)",
    lighting: "Dramatic single-source chiaroscuro creating brilliant highlights and deep shadows, museum-quality fine art lighting, Helmut Newton influence",
    camera: {
      focal_length: "85mm f/2.0",
      aperture: "f/2.0",
      distance: "2.5 m",
      angle: "Low angle emphasizing power and sculptural monumentality",
      framing: "Full body portrait, 9:16 fine art gallery style"
    },
    color_grade: "High-contrast B&W or desaturated, museum fine art aesthetic",
    style: "Helmut Newton, Irving Penn, Robert Mapplethorpe (form not explicitness), fine art nude mastery",
    quality: "Museum-quality 8K fine art masterpiece, PNG with alpha, 1080x1920",
    figure_and_form: "Curves as powerful sculptural art, light/shadow/form emphasis",
    skin_micro_details: "Dramatic chiaroscuro sculpting every contour",
    fabric_physics: "Minimal foundation piece with clean sculptural lines",
    material_properties: "Matte black minimalist fabric, architectural heels creating vertical power lines"
  }
};

export const vnSpriteBoudoirConfident: ArtisticConcept = {
  name: 'VN Sprite: Zara Boudoir Confident',
  data: {
    shot: "CONFIDENT BOUDOIR PHOTOGRAPHY | Full-body character sprite | PNG with alpha transparency | 9:16 portrait",
    subject: {
      variant: ZARA_CHARACTER_BASE,
      pose: "Full-body standing with powerful confident boudoir presence, shoulders back, direct bold gaze, one hand on hip in commanding stance, fully owning sensuality and power, professional boudoir model confidence",
      hair_color: "black",
      hair_style: "long flowing with volume and confidence",
      skin_finish: "Fair complexion glowing with confidence",
      hand_and_nail_details: "Strong confident hand on hip",
      tattoos: "none",
      piercings: "none",
      body_art: "none",
      nail_art: "Bold confident polish",
      high_heels: "dramatic boudoir heels visible"
    },
    wardrobe: "CONFIDENT BOUDOIR - Black lace bodysuit with strategic cutouts, high-fashion boudoir aesthetic, bold confident styling, dramatic makeup, hair styled with volume, owning intimate power",
    environment: "PURE TRANSPARENT BACKGROUND (alpha channel)",
    lighting: "Strong confident boudoir lighting emphasizing power and sensuality, dramatic shadows sculpting curves",
    camera: {
      focal_length: "85mm f/1.8",
      aperture: "f/1.8",
      distance: "2 m",
      angle: "Slightly low angle emphasizing power",
      framing: "Full body portrait, 9:16 powerful boudoir style"
    },
    color_grade: "Rich dramatic tones, powerful boudoir aesthetic",
    style: "High-fashion boudoir photography, confident sensual power",
    quality: "Ultra-high-end 8K boudoir power, PNG with alpha, 1080x1920",
    figure_and_form: "Dramatic curves showcased with complete confidence",
    skin_micro_details: "Fair complexion with strong dramatic lighting",
    fabric_physics: "Lace bodysuit with realistic texture and fit",
    material_properties: "Black lace with intricate patterns, dramatic heels with glossy finish"
  }
};

export const vnSpriteBoudoirVulnerable: ArtisticConcept = {
  name: 'VN Sprite: Zara Boudoir Vulnerable',
  data: {
    shot: "VULNERABLE BOUDOIR PHOTOGRAPHY | Full-body character sprite | PNG with alpha transparency | 9:16 portrait",
    subject: {
      variant: ZARA_CHARACTER_BASE,
      pose: "Full-body standing with soft vulnerable presence, gentle posture, eyes showing trust and nervous anticipation, one hand nervously touching neck, shoulders softly forward, intimate vulnerability radiating, authentic emotional honesty",
      hair_color: "black",
      hair_style: "long flowing softly framing face",
      skin_finish: "Fair complexion with soft vulnerable glow",
      hand_and_nail_details: "Nervous vulnerable hand at neck",
      tattoos: "none",
      piercings: "none",
      body_art: "none",
      nail_art: "Soft natural polish",
      high_heels: "not visible"
    },
    wardrobe: "VULNERABLE BOUDOIR - Soft ivory lace lingerie with delicate details, romantic vulnerable aesthetic, natural soft makeup, hair loose and flowing, emphasis on emotional vulnerability over sexuality",
    environment: "PURE TRANSPARENT BACKGROUND (alpha channel)",
    lighting: "Soft tender boudoir lighting emphasizing vulnerability and trust, gentle shadows, warm intimate atmosphere",
    camera: {
      focal_length: "85mm f/1.4",
      aperture: "f/1.4",
      distance: "2 m",
      angle: "Eye-level tender perspective",
      framing: "Full body portrait, 9:16 vulnerable intimate style"
    },
    color_grade: "Soft warm romantic tones, tender vulnerability",
    style: "Romantic boudoir photography, emotional vulnerability and trust",
    quality: "Ultra-high-end 8K tender boudoir, PNG with alpha, 1080x1920",
    figure_and_form: "Curves softly visible with vulnerable gentle posture",
    skin_micro_details: "Fair complexion with soft emotional glow",
    fabric_physics: "Delicate lace with soft draping",
    material_properties: "Ivory lace with romantic soft textures"
  }
};

export const vnSpriteIntimateTrust: ArtisticConcept = {
  name: 'VN Sprite: Zara Intimate Trust',
  data: {
    shot: "INTIMATE TRUST PHOTOGRAPHY | Full-body character sprite | PNG with alpha transparency | 9:16 portrait",
    subject: {
      variant: ZARA_CHARACTER_BASE,
      pose: "Full-body standing with complete trust and openness, relaxed shoulders, warm genuine expression, direct eye contact showing deep trust and connection, open body language, comfortable in intimate space, authentic partnership visible",
      hair_color: "black",
      hair_style: "long flowing naturally relaxed",
      skin_finish: "Fair complexion with warm trusting radiance",
      hand_and_nail_details: "Relaxed open hand placement showing complete trust",
      tattoos: "none",
      piercings: "none",
      body_art: "none",
      nail_art: "Natural elegant",
      high_heels: "not visible"
    },
    wardrobe: "INTIMATE TRUST - Current intimate attire (context-dependent from scene), worn with complete comfort and trust, natural relaxed presence",
    environment: "PURE TRANSPARENT BACKGROUND (alpha channel)",
    lighting: "Warm inviting intimate lighting emphasizing trust and deep connection, soft beautiful illumination",
    camera: {
      focal_length: "85mm f/1.4",
      aperture: "f/1.4",
      distance: "2 m",
      angle: "Eye-level warm trusting perspective",
      framing: "Full body portrait, 9:16 intimate trust style"
    },
    color_grade: "Warm glowing tones, deep trust and connection visible",
    style: "Intimate partnership photography, profound trust and artistic collaboration",
    quality: "Ultra-high-end 8K intimate trust quality, PNG with alpha, 1080x1920",
    figure_and_form: "Curves shown with complete comfort, trust radiating",
    skin_micro_details: "Fair complexion with warm glow of deep trust",
    fabric_physics: "Natural comfortable draping showing complete ease",
    material_properties: "Warm trusting lighting creating profound connection atmosphere"
  }
};

// ============================================================================
// BACKGROUNDS - BOUDOIR & INTIMATE LOCATIONS (5 new backgrounds for expansion)
// Scenes 5-10: Progressive intimacy pathway locations
// ============================================================================

export const vnBgBoudoirBedroomNatural: ArtisticConcept = {
  name: 'VN BG: Boudoir Bedroom Natural Light',
  data: {
    shot: "VISUAL NOVEL BACKGROUND | Boudoir photography environment | 16:9 widescreen | 1920x1080px",
    subject: {
      variant: "Intimate bedroom boudoir location, NO people",
      pose: "N/A",
      hair_color: "N/A",
      hair_style: "N/A",
      skin_finish: "N/A",
      hand_and_nail_details: "N/A",
      tattoos: "N/A",
      piercings: "N/A",
      body_art: "N/A",
      nail_art: "N/A",
      high_heels: "N/A"
    },
    wardrobe: "N/A",
    environment: "LOCATION: Intimate bedroom with soft romantic atmosphere, white/cream aesthetic. Elegant bed with white linen sheets and plush pillows, soft cream duvet naturally rumpled, minimal elegant nightstand with single fresh flower in vase, sheer white curtains, warm wooden floor or cream carpet, minimal elegant decor. Clear foreground for character placement",
    lighting: "NATURAL WINDOW LIGHT - Soft diffused sunlight streaming through sheer curtains creating gentle glow, warm natural illumination, no harsh shadows, golden hour quality light, intimate tender atmosphere",
    camera: {
      focal_length: "35mm",
      aperture: "f/2.8",
      distance: "N/A",
      angle: "Eye level boudoir perspective",
      framing: "16:9 intimate bedroom environment"
    },
    color_grade: "Warm soft romantic tones, intimate boudoir aesthetic",
    style: "Romantic boudoir environmental photography, intimate tender atmosphere",
    quality: "Commercial VN quality, 1920x1080, romantic intimate atmosphere",
    figure_and_form: "Intimate bedroom architecture with elegant minimal design",
    skin_micro_details: "N/A",
    fabric_physics: "N/A",
    material_properties: "White linen texture, sheer curtain translucency, warm wood flooring"
  }
};

export const vnBgBoudoirLuxuryDramatic: ArtisticConcept = {
  name: 'VN BG: Boudoir Luxury Dramatic',
  data: {
    shot: "VISUAL NOVEL BACKGROUND | Luxury boudoir environment | 16:9 widescreen | 1920x1080px",
    subject: {
      variant: "Luxury boudoir with dramatic lighting, NO people",
      pose: "N/A",
      hair_color: "N/A",
      hair_style: "N/A",
      skin_finish: "N/A",
      hand_and_nail_details: "N/A",
      tattoos: "N/A",
      piercings: "N/A",
      body_art: "N/A",
      nail_art: "N/A",
      high_heels: "N/A"
    },
    wardrobe: "N/A",
    environment: "LOCATION: Luxury boudoir bedroom with dramatic elegant atmosphere. Rich velvet curtains in deep jewel tones (burgundy/navy), elegant tufted chaise lounge or luxury bed, dramatic architectural details, high-end furnishings, sophisticated luxury aesthetic, museum-quality art on walls. Clear foreground",
    lighting: "DRAMATIC SIDE LIGHTING - Strong directional light from side creating sculptural shadows and highlights, chiaroscuro boudoir aesthetic, sophisticated dramatic illumination, warm accent lighting, fine art quality lighting",
    camera: {
      focal_length: "35mm",
      aperture: "f/2.8",
      distance: "N/A",
      angle: "Dramatic angle emphasizing luxury",
      framing: "16:9 luxury boudoir environment"
    },
    color_grade: "Rich dramatic tones with deep jewel colors, luxury boudoir aesthetic",
    style: "Luxury fine art boudoir environmental photography, dramatic sophistication",
    quality: "Premium VN quality, 1920x1080, dramatic luxury atmosphere",
    figure_and_form: "Luxury architectural details with dramatic sophisticated design",
    skin_micro_details: "N/A",
    fabric_physics: "N/A",
    material_properties: "Rich velvet textures, luxury fabrics, dramatic lighting on elegant furnishings"
  }
};

export const vnBgStudioIntimateCorner: ArtisticConcept = {
  name: 'VN BG: Studio Intimate Corner',
  data: {
    shot: "VISUAL NOVEL BACKGROUND | Intimate studio space | 16:9 widescreen | 1920x1080px",
    subject: {
      variant: "Studio intimate corner setup, NO people",
      pose: "N/A",
      hair_color: "N/A",
      hair_style: "N/A",
      skin_finish: "N/A",
      hand_and_nail_details: "N/A",
      tattoos: "N/A",
      piercings: "N/A",
      body_art: "N/A",
      nail_art: "N/A",
      high_heels: "N/A"
    },
    wardrobe: "N/A",
    environment: "LOCATION: Intimate corner of studio configured for private intimate work. Soft seating area (elegant bench or daybed), warm atmospheric lighting setup visible, privacy screens or draped fabric creating intimate enclosure, comfortable cozy professional atmosphere. Clear foreground",
    lighting: "INTIMATE ATMOSPHERIC LIGHTING - Soft warm directional lighting creating cozy intimate space, gentle shadows, comfortable private atmosphere, professional yet personal lighting setup",
    camera: {
      focal_length: "35mm",
      aperture: "f/2.8",
      distance: "N/A",
      angle: "Eye level intimate perspective",
      framing: "16:9 intimate studio corner environment"
    },
    color_grade: "Warm cozy tones, intimate private atmosphere",
    style: "Intimate studio environmental photography, private professional space",
    quality: "Commercial VN quality, 1920x1080, warm intimate atmosphere",
    figure_and_form: "Cozy intimate studio corner architecture",
    skin_micro_details: "N/A",
    fabric_physics: "N/A",
    material_properties: "Soft fabrics, warm wood tones, intimate lighting creating cozy enclosure"
  }
};

export const vnBgDressingRoomPrivate: ArtisticConcept = {
  name: 'VN BG: Dressing Room Private',
  data: {
    shot: "VISUAL NOVEL BACKGROUND | Private dressing space | 16:9 widescreen | 1920x1080px",
    subject: {
      variant: "Private dressing room, NO people",
      pose: "N/A",
      hair_color: "N/A",
      hair_style: "N/A",
      skin_finish: "N/A",
      hand_and_nail_details: "N/A",
      tattoos: "N/A",
      piercings: "N/A",
      body_art: "N/A",
      nail_art: "N/A",
      high_heels: "N/A"
    },
    wardrobe: "N/A",
    environment: "LOCATION: Private dressing room area with intimate atmosphere. Full-length mirror (foreground left or right), elegant vanity with soft lighting, clothing rack with intimate garments visible, comfortable seating, private enclosed space, warm inviting environment. Clear foreground center",
    lighting: "SOFT VANITY LIGHTING - Warm flattering makeup mirror lights, soft ambient fill, intimate private atmosphere, comfortable dressing room illumination",
    camera: {
      focal_length: "35mm",
      aperture: "f/2.8",
      distance: "N/A",
      angle: "Eye level dressing room perspective",
      framing: "16:9 private dressing room environment"
    },
    color_grade: "Warm inviting tones, private comfortable aesthetic",
    style: "Private dressing room environmental photography, intimate preparation space",
    quality: "Commercial VN quality, 1920x1080, warm private atmosphere",
    figure_and_form: "Private dressing room architecture with elegant furnishings",
    skin_micro_details: "N/A",
    fabric_physics: "N/A",
    material_properties: "Mirror reflection, soft fabrics on rack, warm vanity lighting"
  }
};

export const vnBgNaturalLightLoft: ArtisticConcept = {
  name: 'VN BG: Natural Light Loft',
  data: {
    shot: "VISUAL NOVEL BACKGROUND | Natural light loft space | 16:9 widescreen | 1920x1080px",
    subject: {
      variant: "Natural light loft with golden hour, NO people",
      pose: "N/A",
      hair_color: "N/A",
      hair_style: "N/A",
      skin_finish: "N/A",
      hand_and_nail_details: "N/A",
      tattoos: "N/A",
      piercings: "N/A",
      body_art: "N/A",
      nail_art: "N/A",
      high_heels: "N/A"
    },
    wardrobe: "N/A",
    environment: "LOCATION: Open loft space with floor-to-ceiling windows. Warm golden hour sunlight flooding interior, minimal furniture (modern couch or window seat), polished wood floors, white walls, open airy atmosphere, city skyline visible through windows (soft focus). Clear foreground",
    lighting: "GOLDEN HOUR NATURAL LIGHT - Warm glowing sunlight streaming through massive windows, soft ambient fill from reflections, beautiful natural illumination, romantic golden atmosphere, perfect portrait lighting",
    camera: {
      focal_length: "35mm",
      aperture: "f/2.8",
      distance: "N/A",
      angle: "Eye level capturing golden light",
      framing: "16:9 natural light loft environment"
    },
    color_grade: "Warm golden tones, romantic natural light aesthetic",
    style: "Natural light environmental photography, romantic golden hour atmosphere",
    quality: "Premium VN quality, 1920x1080, golden hour romantic atmosphere",
    figure_and_form: "Open loft architecture with dramatic natural lighting",
    skin_micro_details: "N/A",
    fabric_physics: "N/A",
    material_properties: "Polished wood floors reflecting golden light, massive windows with city view"
  }
};

// ============================================================================
// CG IMAGES - INTIMATE MOMENTS (8 new CG images for expansion)
// Scenes 5-10: Key intimate story moments
// ============================================================================

export const vnCgWardrobeDiscussion: ArtisticConcept = {
  name: 'VN CG: Wardrobe Discussion (Scene 2)',
  data: {
    shot: "VISUAL NOVEL CG IMAGE | Intimate consultation moment | 16:9 widescreen | 1920x1080px",
    subject: {
      variant: ZARA_CHARACTER_BASE + ", discussing intimate wardrobe options, private moment",
      pose: "Zara and photographer (viewer POV - hands holding garment samples visible in foreground) having intimate conversation about boudoir wardrobe, Zara looking at lingerie options with thoughtful vulnerable expression, trust-building moment, comfortable private discussion",
      hair_color: "black",
      hair_style: "long flowing naturally",
      skin_finish: "Fair complexion in soft private atmosphere",
      hand_and_nail_details: "Hands gently touching fabric samples",
      tattoos: "none",
      piercings: "none",
      body_art: "none",
      nail_art: "Natural",
      high_heels: "not visible"
    },
    wardrobe: "Casual-professional outfit, examining intimate garment options",
    environment: "Private wardrobe area with intimate atmosphere, soft focus background emphasizing personal consultation moment",
    lighting: "Soft private lighting creating comfortable intimate discussion atmosphere",
    camera: {
      focal_length: "50mm",
      aperture: "f/2.0",
      distance: "1.5 m",
      angle: "Eye level capturing vulnerable consultation moment",
      framing: "Medium shot, 16:9 intimate consultation"
    },
    color_grade: "Warm comfortable tones, private vulnerable conversation",
    style: "Documentary intimate consultation, trust-building moment",
    quality: "Premium CG quality, 1920x1080, private consultation moment",
    figure_and_form: "Vulnerable posture during intimate discussion",
    skin_micro_details: "Fair complexion showing authentic emotional consideration",
    fabric_physics: "Intimate garments visible in discussion",
    material_properties: "Soft private lighting on consultation moment"
  }
};

export const vnCgMirrorPreparation: ArtisticConcept = {
  name: 'VN CG: Mirror Preparation (Scene 2)',
  data: {
    shot: "VISUAL NOVEL CG IMAGE | Private preparation moment | 16:9 widescreen | 1920x1080px",
    subject: {
      variant: ZARA_CHARACTER_BASE + ", preparing for intimate session, mirror reflection",
      pose: "Zara standing before full-length mirror in dressing room, adjusting elegant lingerie, mirror showing both direct view and reflection, vulnerable preparation moment, photographer (viewer reflection partially visible) providing supportive presence, intimate trust-building",
      hair_color: "black",
      hair_style: "long flowing being styled",
      skin_finish: "Fair complexion in soft dressing room light",
      hand_and_nail_details: "Hands adjusting garment with nervous grace",
      tattoos: "none",
      piercings: "none",
      body_art: "none",
      nail_art: "Elegant polish",
      high_heels: "visible"
    },
    wardrobe: "Elegant lingerie (ivory lace), vulnerable preparation state",
    environment: "Private dressing room with large mirror, intimate preparation atmosphere, soft vanity lighting",
    lighting: "Soft flattering vanity lighting creating tender preparation atmosphere",
    camera: {
      focal_length: "50mm",
      aperture: "f/2.0",
      distance: "2 m",
      angle: "Capturing both direct and mirror reflection",
      framing: "Medium shot, 16:9 mirror preparation moment"
    },
    color_grade: "Soft warm tones, vulnerable preparation aesthetic",
    style: "Intimate preparation photography, vulnerable trust moment",
    quality: "Premium CG quality, 1920x1080, tender preparation moment",
    figure_and_form: "Elegant curves in lingerie, vulnerable preparation posture",
    skin_micro_details: "Fair complexion in flattering vanity light",
    fabric_physics: "Elegant lace with realistic draping",
    material_properties: "Mirror reflection, soft fabrics, warm intimate lighting"
  }
};

export const vnCgFirstIntimatePortrait: ArtisticConcept = {
  name: 'VN CG: First Intimate Portrait (Scene 4)',
  data: {
    shot: "VISUAL NOVEL CG IMAGE | First intimate portrait capture | 16:9 widescreen | 1920x1080px",
    subject: {
      variant: ZARA_CHARACTER_BASE + ", first intimate portrait, vulnerable beauty",
      pose: "Zara in elegant intimate portrait pose wearing sophisticated lingerie, soft vulnerable expression showing trust, gentle posture, intimate yet tasteful composition, photographer perspective capturing breakthrough moment of intimate artistry",
      hair_color: "black",
      hair_style: "long flowing softly styled",
      skin_finish: "Fair complexion with soft intimate glow",
      hand_and_nail_details: "Graceful gentle placement",
      tattoos: "none",
      piercings: "none",
      body_art: "none",
      nail_art: "Elegant",
      high_heels: "visible"
    },
    wardrobe: "Sophisticated elegant lingerie (ivory/champagne lace)",
    environment: "Studio with soft intimate lighting setup, background softly blurred emphasizing subject",
    lighting: "Soft flattering boudoir lighting creating beautiful intimate atmosphere",
    camera: {
      focal_length: "85mm",
      aperture: "f/1.8",
      distance: "2 m",
      angle: "Slightly above eye level, flattering perspective",
      framing: "Medium portrait, 16:9 intimate first capture"
    },
    color_grade: "Warm romantic tones, intimate breakthrough aesthetic",
    style: "Elegant boudoir portrait, vulnerable beauty and trust",
    quality: "Premium CG quality, 1920x1080, intimate portrait moment",
    figure_and_form: "Elegant curves tastefully revealed, vulnerable beauty",
    skin_micro_details: "Fair complexion with soft beautiful glow",
    fabric_physics: "Elegant lace draping naturally",
    material_properties: "Soft intimate lighting creating romantic atmosphere"
  }
};

export const vnCgBoudoirPose: ArtisticConcept = {
  name: 'VN CG: Boudoir Pose (Scene 6)',
  data: {
    shot: "VISUAL NOVEL CG IMAGE | Signature boudoir moment | 16:9 widescreen | 1920x1080px",
    subject: {
      variant: ZARA_CHARACTER_BASE + ", signature boudoir session, confident beauty",
      pose: "Zara reclining elegantly on white linen bed in sophisticated lingerie, confident sensual expression, professional boudoir model presence, one hand gracefully positioned, other arm relaxed, intimate yet sophisticated composition, natural light streaming through sheer curtains",
      hair_color: "black",
      hair_style: "long flowing in soft romantic waves",
      skin_finish: "Fair complexion glowing in natural boudoir light",
      hand_and_nail_details: "Graceful confident placement",
      tattoos: "none",
      piercings: "none",
      body_art: "none",
      nail_art: "Classic elegant",
      high_heels: "visible"
    },
    wardrobe: "Sophisticated elegant lingerie (ivory lace bra and high-waisted briefs)",
    environment: "Intimate bedroom with natural window light, white linens, romantic boudoir atmosphere",
    lighting: "Soft natural window light diffused through sheer curtains, warm romantic illumination",
    camera: {
      focal_length: "50mm",
      aperture: "f/2.0",
      distance: "2.5 m",
      angle: "Slightly elevated elegant perspective",
      framing: "Medium to wide shot, 16:9 signature boudoir composition"
    },
    color_grade: "Warm romantic tones, sophisticated boudoir aesthetic",
    style: "High-end boudoir photography, elegant confident intimacy",
    quality: "Premium CG quality, 1920x1080, signature boudoir moment",
    figure_and_form: "Dramatic curves elegantly showcased, confident sensual beauty",
    skin_micro_details: "Fair complexion with natural romantic glow",
    fabric_physics: "Elegant lace and white linens with realistic draping",
    material_properties: "Natural romantic lighting on elegant fabrics"
  }
};

export const vnCgArtisticDrapingMoment: ArtisticConcept = {
  name: 'VN CG: Artistic Draping Moment (Scene 7)',
  data: {
    shot: "VISUAL NOVEL CG IMAGE | Fine art collaboration | 16:9 widescreen | 1920x1080px",
    subject: {
      variant: ZARA_CHARACTER_BASE + ", fine art draping collaboration, artistic trust",
      pose: "Photographer (viewer POV - hands visible arranging translucent silk fabric) artistically draping fabric around Zara's form, Zara standing with trusting expression, eyes closed or looking at photographer with complete trust, intimate artistic collaboration moment, Renaissance painting aesthetic being created",
      hair_color: "black",
      hair_style: "long flowing arranged artistically",
      skin_finish: "Fair complexion in dramatic fine art lighting",
      hand_and_nail_details: "Photographer hands arranging silk, Zara's hands relaxed in trust",
      tattoos: "none",
      piercings: "none",
      body_art: "none",
      nail_art: "Natural",
      high_heels: "not visible"
    },
    wardrobe: "Translucent ivory silk being artistically draped creating sculptural shapes",
    environment: "Luxury boudoir with dramatic side lighting, fine art atmosphere",
    lighting: "Dramatic chiaroscuro side lighting creating sculptural shadows, museum-quality illumination",
    camera: {
      focal_length: "50mm",
      aperture: "f/2.8",
      distance: "1.5 m",
      angle: "Photographer POV showing collaborative artistic process",
      framing: "Medium shot, 16:9 artistic collaboration moment"
    },
    color_grade: "Desaturated fine art tones, Renaissance painting aesthetic",
    style: "Fine art photography collaboration, intimate trust and artistic partnership",
    quality: "Premium CG quality, 1920x1080, artistic collaboration moment",
    figure_and_form: "Sculptural form being created through fabric draping, fine art aesthetic",
    skin_micro_details: "Dramatic chiaroscuro revealing sculptural beauty",
    fabric_physics: "Translucent silk being actively draped, creating elegant shapes",
    material_properties: "Sheer silk with ethereal quality, dramatic artistic lighting"
  }
};

export const vnCgIntimateCloseMoment: ArtisticConcept = {
  name: 'VN CG: Intimate Close Moment (Scene 8)',
  data: {
    shot: "VISUAL NOVEL CG IMAGE | Emotional connection close-up | 16:9 widescreen | 1920x1080px",
    subject: {
      variant: ZARA_CHARACTER_BASE + ", golden hour emotional connection, profound moment",
      pose: "Close intimate framing of Zara sitting on window ledge in natural light loft, wrapped in silk robe, eyes showing deep emotional connection and vulnerability, gentle genuine smile, photographer (viewer perspective - partial presence suggested) sharing quiet profound moment together, unguarded authentic connection",
      hair_color: "black",
      hair_style: "long flowing naturally loose",
      skin_finish: "Fair complexion glowing in golden hour light",
      hand_and_nail_details: "Relaxed natural placement showing comfort",
      tattoos: "none",
      piercings: "none",
      body_art: "none",
      nail_art: "Natural",
      high_heels: "not visible"
    },
    wardrobe: "Champagne silk robe worn casually, comfortable relaxed state",
    environment: "Natural light loft with golden hour sunlight streaming through massive windows, soft focus city skyline background",
    lighting: "Warm golden hour natural light creating romantic emotional atmosphere",
    camera: {
      focal_length: "85mm",
      aperture: "f/1.4",
      distance: "1.2 m",
      angle: "Eye level capturing intimate emotional connection",
      framing: "Close medium shot, 16:9 intimate emotional moment"
    },
    color_grade: "Warm golden tones, profound emotional connection aesthetic",
    style: "Intimate documentary portrait, profound human connection and trust",
    quality: "Premium CG quality, 1920x1080, golden hour emotional moment",
    figure_and_form: "Natural relaxed posture, emotional openness and trust radiating",
    skin_micro_details: "Fair complexion glowing with golden hour warmth and emotion",
    fabric_physics: "Silk robe draped casually, comfortable relaxed state",
    material_properties: "Warm golden light creating profound emotional atmosphere"
  }
};

export const vnCgClimaxBoudoir: ArtisticConcept = {
  name: 'VN CG: Climax Boudoir (Scene 9)',
  data: {
    shot: "VISUAL NOVEL CG IMAGE | Ultimate boudoir masterpiece | 16:9 widescreen | 1920x1080px",
    subject: {
      variant: ZARA_CHARACTER_BASE + ", ultimate boudoir masterpiece, peak intimacy",
      pose: "Zara in ultimate boudoir pose on luxury bed with dramatic lighting, minimal elegant lingerie, complete confidence and trust, direct intense gaze showing culmination of intimate journey, professional boudoir artistry at its peak, sophisticated sensual power, museum-worthy composition",
      hair_color: "black",
      hair_style: "long flowing with perfect styling",
      skin_finish: "Fair complexion with dramatic boudoir glow",
      hand_and_nail_details: "Powerful confident placement",
      tattoos: "none",
      piercings: "none",
      body_art: "none",
      nail_art: "Bold confident polish",
      high_heels: "dramatic heels visible"
    },
    wardrobe: "Minimal elegant lingerie (black lace), ultimate boudoir sophistication",
    environment: "Luxury boudoir bedroom with dramatic velvet and elegant furnishings, sophisticated atmosphere",
    lighting: "Dramatic side lighting creating sculptural shadows and highlights, ultimate boudoir illumination",
    camera: {
      focal_length: "50mm",
      aperture: "f/2.0",
      distance: "2.5 m",
      angle: "Slightly low angle emphasizing power and beauty",
      framing: "Medium to wide shot, 16:9 ultimate boudoir masterpiece"
    },
    color_grade: "Rich dramatic tones with deep jewel colors, ultimate boudoir aesthetic",
    style: "Ultimate boudoir photography mastery, sophisticated sensual power and artistry",
    quality: "Premium CG quality, 1920x1080, ultimate boudoir masterpiece",
    figure_and_form: "Dramatic curves at peak beauty, ultimate confident sensuality",
    skin_micro_details: "Fair complexion with dramatic sculptural lighting",
    fabric_physics: "Minimal elegant lace, luxury bed linens",
    material_properties: "Dramatic lighting creating ultimate boudoir masterpiece atmosphere"
  }
};

export const vnCgClimaxMinimal: ArtisticConcept = {
  name: 'VN CG: Climax Minimal Artistic (Scene 9)',
  data: {
    shot: "VISUAL NOVEL CG IMAGE | Ultimate fine art masterpiece | 16:9 widescreen | 1920x1080px",
    subject: {
      variant: ZARA_CHARACTER_BASE + ", ultimate fine art nude, museum masterpiece",
      pose: "Zara in ultimate fine art nude pose, minimal tasteful strategic coverage, dramatic chiaroscuro lighting creating powerful sculptural shadows, confident artistic presence, direct powerful gaze, body as ultimate art form, museum-worthy composition following Newton/Mapplethorpe mastery, NO explicit detail, emphasis on light/shadow/form",
      hair_color: "black",
      hair_style: "long flowing with fine art styling",
      skin_finish: "Fair complexion with ultimate sculptural chiaroscuro",
      hand_and_nail_details: "Powerful artistic placement",
      tattoos: "none",
      piercings: "none",
      body_art: "none",
      nail_art: "Natural",
      high_heels: "architectural heels as compositional element"
    },
    wardrobe: "MINIMAL ARTISTIC - Single high-waisted minimalist foundation piece, ultimate fine art aesthetic, museum-quality composition",
    environment: "Minimal luxury boudoir with dramatic chiaroscuro setup, fine art gallery atmosphere",
    lighting: "Ultimate dramatic single-source chiaroscuro creating brilliant highlights and deep shadows, museum-quality fine art illumination, Helmut Newton mastery",
    camera: {
      focal_length: "50mm",
      aperture: "f/2.8",
      distance: "3 m",
      angle: "Low angle emphasizing sculptural power and monumentality",
      framing: "Full to medium shot, 16:9 ultimate fine art masterpiece"
    },
    color_grade: "High-contrast B&W, museum fine art aesthetic, timeless beauty",
    style: "Helmut Newton, Irving Penn, Robert Mapplethorpe (form mastery), ultimate fine art nude tradition",
    quality: "Museum-quality 8K fine art masterpiece, 1920x1080, ultimate artistic achievement",
    figure_and_form: "Curves as ultimate sculptural art form, light/shadow/form mastery",
    skin_micro_details: "Ultimate dramatic chiaroscuro sculpting every contour with museum-quality precision",
    fabric_physics: "Minimal foundation piece with perfect sculptural lines",
    material_properties: "Dramatic museum-quality lighting creating ultimate fine art atmosphere"
  }
};

// ============================================================================
// EXPORT ALL VN CONCEPTS (UPDATED WITH EXPANSION ASSETS)
// ============================================================================

export const visualNovelAssetConcepts: ArtisticConcept[] = [
  // Character Sprites - Emotional States (6 original)
  vnSpriteNeutral,
  vnSpriteConfident,
  vnSpriteVulnerable,
  vnSpritePlayful,
  vnSpriteUncomfortable,
  vnSpriteTrusting,

  // Character Sprites - Mode-Specific (4 original - DEPRECATED for old 6-scene story)
  vnSpriteExperimental,
  vnSpritePlatinum,
  vnSpriteVera,
  vnSpriteArtistic,

  // Character Sprites - Story Moments (2 original)
  vnSpriteCrisisReveal,
  vnSpriteWrapSatisfied,

  // Character Sprites - Intimate Wardrobe (8 NEW for 10-scene expansion)
  vnSpriteLingerieElegant,
  vnSpriteLingerieMinimal,
  vnSpriteSilkRobe,
  vnSpriteArtisticDrape,
  vnSpriteMinimalArtistic,
  vnSpriteBoudoirConfident,
  vnSpriteBoudoirVulnerable,
  vnSpriteIntimateTrust,

  // Backgrounds - Studio Settings (8 original)
  vnBgStudioMorningArrival,
  vnBgWardrobeArea,
  vnBgStudioCenterNeutral,
  vnBgStudioHighContrast,
  vnBgStudioSoftGlow,
  vnBgStudioPlatinum,
  vnBgStudioArtistic,
  vnBgStudioWrap,

  // Backgrounds - Boudoir & Intimate Locations (5 NEW for expansion)
  vnBgBoudoirBedroomNatural,
  vnBgBoudoirLuxuryDramatic,
  vnBgStudioIntimateCorner,
  vnBgDressingRoomPrivate,
  vnBgNaturalLightLoft,

  // CG Images - Original Moments (10 original)
  vnCgFirstGreeting,
  vnCgLighttestTechnical,
  vnCgFirstFrameVulnerable,
  vnCgFirstFrameCommanding,
  vnCgFirstFramePlayful,
  vnCgPersonalReveal,
  vnCgClimaxExperimental,
  vnCgClimaxPlatinum,
  vnCgClimaxVera,
  vnCgClimaxArtistic,

  // CG Images - Intimate Moments (8 NEW for expansion)
  vnCgWardrobeDiscussion,
  vnCgMirrorPreparation,
  vnCgFirstIntimatePortrait,
  vnCgBoudoirPose,
  vnCgArtisticDrapingMoment,
  vnCgIntimateCloseMoment,
  vnCgClimaxBoudoir,
  vnCgClimaxMinimal
];

export default visualNovelAssetConcepts;
