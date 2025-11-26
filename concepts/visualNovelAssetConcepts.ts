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

const ZARA_CHARACTER_BASE = `CHARACTER: Zara - Elite Indian fashion model, age 25, height 5'7", classic hourglass figure (bust 38DD", waist 27", hips 39"), fair complexion with warm undertones, long flowing black hair with natural shine, intensely expressive brown eyes, dramatic facial structure with high cheekbones, distinctive beauty mark on left cheek, athletic-fit build, cinematic beauty, professional model presence`;

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
      skin_finish: "Fair complexion with warm undertones, natural healthy glow",
      hand_and_nail_details: "Hands relaxed, graceful natural placement, impeccably manicured with clean neutral polish",
      tattoos: "none",
      piercings: "none",
      body_art: "none",
      nail_art: "Clean neutral polish",
      high_heels: "not visible"
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
    color_grade: "Natural warm tones, balanced skin tones, cinematic beauty",
    style: "Vogue editorial quality, professional modeling portfolio standard, photorealistic",
    quality: "Canon EOS R5, 85mm lens, PNG with alpha, 1080x1920, magazine quality",
    figure_and_form: "Classic hourglass figure, natural confident posture, professional model presence",
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
// EXPORT ALL VN CONCEPTS
// ============================================================================

export const visualNovelAssetConcepts: ArtisticConcept[] = [
  // Character Sprites - Emotional States (6)
  vnSpriteNeutral,
  vnSpriteConfident,
  vnSpriteVulnerable,
  vnSpritePlayful,
  vnSpriteUncomfortable,
  vnSpriteTrusting,

  // Character Sprites - Mode-Specific (4)
  vnSpriteExperimental,
  vnSpritePlatinum,
  vnSpriteVera,
  vnSpriteArtistic,

  // Character Sprites - Story Moments (2)
  vnSpriteCrisisReveal,
  vnSpriteWrapSatisfied,

  // Backgrounds (8)
  vnBgStudioMorningArrival,
  vnBgWardrobeArea,
  vnBgStudioCenterNeutral,
  vnBgStudioHighContrast,
  vnBgStudioSoftGlow,
  vnBgStudioPlatinum,
  vnBgStudioArtistic,
  vnBgStudioWrap,

  // CG Images (10)
  vnCgFirstGreeting,
  vnCgLighttestTechnical,
  vnCgFirstFrameVulnerable,
  vnCgFirstFrameCommanding,
  vnCgFirstFramePlayful,
  vnCgPersonalReveal,
  vnCgClimaxExperimental,
  vnCgClimaxPlatinum,
  vnCgClimaxVera,
  vnCgClimaxArtistic
];

export default visualNovelAssetConcepts;
