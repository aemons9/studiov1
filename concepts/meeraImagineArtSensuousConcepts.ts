import type { PromptData } from '../types';
import type { ArtisticConcept } from './concepts';

/**
 * MEERA IMAGINEART SENSUOUS COLLECTION CONCEPTS
 * ImagineArt 1.0 Premium Variants - All Pre-filled Selectors
 *
 * Collections included:
 * - Plus Sensuous (20 variants)
 * - Helmut Newton Big Nudes (20 variants)
 * - Inner Thigh Closeup (16 variants)
 * - Midnight Muse Reclined (20 variants)
 * - Laying Poses All Angles (24 variants)
 * - Bent Knees & V Legs Closeup Realistic (24 variants)
 *
 * Updated: 2026-01-14
 * STRICTLY LOCKED INDIAN MUSE: Meera (37DD-27-40)
 */

// Hyper-realistic skin details for ImagineArt
const imagineArtSkinDetails = "HYPER-REALISTIC golden-brown caramel Indian skin texture with visible pores, natural skin variations, micro-imperfections, subtle veins visible under skin surface, natural skin shine in intimate areas, goosebumps texture where applicable, realistic skin folds at joints and bends, natural color variations - slightly darker in creases, lighter on prominences. Authentic golden-brown Indian tone - NOT pale/white. No airbrushing.";
const imagineArtFabricPhysics = "Ultra-minimal coverage with fabric physics responding naturally to body, single thread or gossamer strand draping with realistic weight, catching light at edges.";
const imagineArtMaterialProperties = "Platinum navel piercing with diamond catching light, gold anklet with delicate glint, ultra-fine thread/chain materials with metallic shimmer against warm skin.";

// ═══════════════════════════════════════════════════════════════════════════════
// LOCKED MEERA SUBJECT - 37DD-27-40 INDIAN HOURGLASS
// ═══════════════════════════════════════════════════════════════════════════════

const MEERA_IMAGINEART_SUBJECT = {
  variant: `STRICTLY LOCKED Indian woman Meera, South Asian Indian ethnicity, 27 years old, 5'9" height. Indian curvaceous hourglass body: 37DD full natural bust with heavy teardrop fullness, 27" dramatically cinched waist, 40" wide round Indian hips with full feminine curves. Golden-brown caramel Indian skin complexion with natural luminous glow, warm undertones typical of South Asian women. Deep brown almond-shaped Indian eyes with thick black lashes, full sensual lips with natural rose tone, high cheekbones typical of Indian women. Long flowing jet black Indian hair with natural shine. Platinum navel ring piercing with diamond accent, delicate gold anklet on left ankle, small diamond nose stud.`,
  pose: "",
  hair_color: "jet black with natural shine",
  hair_style: "long flowing waves spread across surface",
  skin_finish: "Natural luminous golden-brown with visible pores",
  hand_and_nail_details: "Graceful natural manicure, elegant hand positioning",
  tattoos: "none",
  piercings: "platinum navel ring with diamond, gold anklet, diamond nose stud",
  body_art: "none",
  nail_art: "Natural nude polish",
  high_heels: "not applicable for reclined poses"
};

// ═══════════════════════════════════════════════════════════════════════════════
// PLUS SENSUOUS COLLECTION - Minimal Coverage, Indoor Environments
// ═══════════════════════════════════════════════════════════════════════════════

export const plusSensuousConcepts: ArtisticConcept[] = [
  // BED SERIES
  {
    name: "IA Sensuous: Morning Invitation",
    data: {
      shot: "Full body portrait (3:4), intimate boudoir fine art",
      subject: {
        ...MEERA_IMAGINEART_SUBJECT,
        pose: "Fully reclined on back, one knee raised, arms relaxed above head, inner thighs parted naturally, direct inviting gaze, vulnerable open pose, navel piercing prominently displayed"
      },
      wardrobe: "Single gossamer thread across body, barely visible ultra-fine strand, 99% golden-brown Indian skin exposed, thread as artistic accent only",
      environment: "Opulent king-size bed with cream silk sheets and gold accents, plush pillows, soft diffused morning light through sheer curtains, intimate bedroom atmosphere, private boudoir setting",
      lighting: "Soft golden morning light through sheer curtains, warm diffused glow on golden-brown skin, intimate bedroom lighting",
      camera: { focal_length: "85mm f/1.2", aperture: "f/1.4", distance: "2.5 m", angle: "Elevated intimate", framing: "Full body reclined composition" },
      color_grade: "Warm golden morning, soft amber and cream tones",
      style: "Renaissance meets modern boudoir, ImagineArt 1.0 quality",
      quality: "Canon EOS R5 Mark II with 85mm f/1.2L, 8K ultra-high resolution with exceptional anatomical detail",
      figure_and_form: "Indian hourglass 37DD-27-40 proportions, inner thigh curves visible on silk sheets, full body with intimate focus",
      skin_micro_details: imagineArtSkinDetails,
      fabric_physics: imagineArtFabricPhysics,
      material_properties: imagineArtMaterialProperties
    }
  },
  {
    name: "IA Sensuous: Silk Surrender",
    data: {
      shot: "Full body portrait (3:4), complete surrender fine art",
      subject: {
        ...MEERA_IMAGINEART_SUBJECT,
        pose: "Side-lying recline, one arm supporting head, top leg drawn up revealing inner thigh, 40\" hips prominent, relaxed sensuous expression, 37DD bust naturally falling"
      },
      wardrobe: "Artistic nude, platinum navel ring and gold anklet jewelry only, full golden-brown Indian body revealed, museum fine art",
      environment: "Luxurious king-size bed with silk sheets in cream and gold, plush pillows, soft diffused morning light through sheer curtains, private boudoir",
      lighting: "Soft golden morning light through sheer curtains, warm diffused glow, romantic warmth",
      camera: { focal_length: "85mm", aperture: "f/1.4", distance: "2.5 m", angle: "Side intimate", framing: "Full body side recline" },
      color_grade: "Warm golden, soft cream and champagne",
      style: "Complete surrender, private collection artistry",
      quality: "8K ultra-high resolution, professional boudoir photography",
      figure_and_form: "Complete surrender showing inner thigh curves, navel to thigh flow visible",
      skin_micro_details: imagineArtSkinDetails,
      fabric_physics: imagineArtFabricPhysics,
      material_properties: imagineArtMaterialProperties
    }
  },
  {
    name: "IA Sensuous: Velvet Recline",
    data: {
      shot: "Full body portrait (3:4), velvet chaise boudoir",
      subject: {
        ...MEERA_IMAGINEART_SUBJECT,
        pose: "Side-lying recline, one arm supporting head, top leg drawn up revealing inner thigh, 40\" hips prominent, sensuous expression"
      },
      wardrobe: "Single silk strand draped from shoulder, crossing body diagonally, 99% exposure of golden-brown Indian curves",
      environment: "Deep burgundy velvet chaise lounge, ornate carved wood frame, warm amber lamplight, vintage boudoir aesthetic, intimate living space",
      lighting: "Warm flickering candlelight, romantic shadows playing across curves, amber tones on golden-brown complexion",
      camera: { focal_length: "85mm", aperture: "f/1.4", distance: "2.5 m", angle: "Low intimate", framing: "Full body velvet recline" },
      color_grade: "Rich burgundy and amber, vintage warmth",
      style: "Vintage boudoir, inner thigh curves on velvet chaise",
      quality: "8K professional intimate photography",
      figure_and_form: "Inner thigh curves prominent on velvet, hips emphasized",
      skin_micro_details: imagineArtSkinDetails,
      fabric_physics: imagineArtFabricPhysics,
      material_properties: imagineArtMaterialProperties
    }
  },
  {
    name: "IA Sensuous: Couch Spread",
    data: {
      shot: "Full body portrait (3:4), spread pose boudoir",
      subject: {
        ...MEERA_IMAGINEART_SUBJECT,
        pose: "Seated with legs spread naturally, leaning back on hands, inner thighs featured, midriff elongated showing navel ring, relaxed intimate pose"
      },
      wardrobe: "Single delicate chain thread from navel piercing, minimal drape, body fully exposed except thin chain line",
      environment: "Deep burgundy velvet chaise lounge, ornate carved wood frame, warm firelight glow, vintage boudoir aesthetic",
      lighting: "Warm fireplace glow from side, dramatic shadows and highlights, cozy intimate illumination on skin",
      camera: { focal_length: "85mm", aperture: "f/1.4", distance: "2.5 m", angle: "Frontal low", framing: "Full body seated spread" },
      color_grade: "Warm amber firelight, deep burgundy accents",
      style: "Parted thighs showing inner curves, firelight intimacy",
      quality: "8K ultra resolution, exceptional anatomical detail",
      figure_and_form: "Inner thigh curves prominently displayed, parted legs",
      skin_micro_details: imagineArtSkinDetails,
      fabric_physics: imagineArtFabricPhysics,
      material_properties: imagineArtMaterialProperties
    }
  },
  {
    name: "IA Sensuous: Fur Nest",
    data: {
      shot: "Full body portrait (3:4), floor nest intimate",
      subject: {
        ...MEERA_IMAGINEART_SUBJECT,
        pose: "Lying prone with back arched, glutes raised, looking over shoulder with sultry gaze, full body curves emphasized, relaxed surrender"
      },
      wardrobe: "Platinum navel ring and gold anklet only as coverage, otherwise completely exposed, museum fine art nude",
      environment: "Soft white fur rug on hardwood floor, scattered silk cushions, warm fireplace glow, cozy intimate floor setting",
      lighting: "Warm fireplace glow from side, dramatic shadows and highlights, cozy intimate illumination on skin",
      camera: { focal_length: "85mm", aperture: "f/1.4", distance: "2.5 m", angle: "Low behind", framing: "Full body prone arch" },
      color_grade: "Warm firelight amber, soft white fur contrast",
      style: "Inner thighs and glutes on fur, firelight intimacy",
      quality: "8K professional fine art photography",
      figure_and_form: "Full rounded glutes, inner thighs visible from behind",
      skin_micro_details: imagineArtSkinDetails,
      fabric_physics: imagineArtFabricPhysics,
      material_properties: imagineArtMaterialProperties
    }
  },
  {
    name: "IA Sensuous: Copper Goddess",
    data: {
      shot: "Full body portrait (3:4), bathing chamber fine art",
      subject: {
        ...MEERA_IMAGINEART_SUBJECT,
        pose: "Reclined in tub, one leg over edge, wet glistening skin, relaxed pleasure expression, intimate bathing moment"
      },
      wardrobe: "Artistic nude, platinum navel ring and gold anklet visible, wet glistening golden-brown skin",
      environment: "Vintage copper clawfoot bathtub, warm water with rose petals, candlelit bathroom, steam rising softly, intimate bathing chamber",
      lighting: "Warm flickering candlelight, romantic shadows playing across wet curves, amber tones on glistening golden-brown skin",
      camera: { focal_length: "85mm", aperture: "f/1.4", distance: "2.5 m", angle: "Side elevated", framing: "Full body tub recline" },
      color_grade: "Warm amber candlelight, copper and rose tones",
      style: "Inner thigh curves in candlelit bath, goddess bathing",
      quality: "8K museum quality intimate photography",
      figure_and_form: "Wet curves visible, inner thighs and decolletage emphasized",
      skin_micro_details: imagineArtSkinDetails,
      fabric_physics: "Water droplets beading on warm skin, rose petals floating",
      material_properties: "Warm bath water, copper tub, candlelight on wet skin"
    }
  },
  {
    name: "IA Sensuous: Urban Goddess",
    data: {
      shot: "Full body portrait (3:4), industrial loft intimate",
      subject: {
        ...MEERA_IMAGINEART_SUBJECT,
        pose: "Leaning against wall, one leg raised, arms above head, full frontal exposure, navel piercing centered, confident sensuous stance"
      },
      wardrobe: "Single delicate chain thread from navel piercing, minimal drape, body fully exposed except thin chain line",
      environment: "Industrial loft with exposed brick wall, soft afternoon light through large windows, minimal furnishings, urban intimate space",
      lighting: "Soft natural window light, gentle shadows defining curves, realistic indoor lighting",
      camera: { focal_length: "85mm", aperture: "f/1.4", distance: "3 m", angle: "Frontal low", framing: "Full body wall lean" },
      color_grade: "Natural warm, industrial brick tones",
      style: "Inner thigh curves against brick, urban goddess",
      quality: "8K professional boudoir photography",
      figure_and_form: "Full frontal with navel piercing centered, inner thighs prominent",
      skin_micro_details: imagineArtSkinDetails,
      fabric_physics: imagineArtFabricPhysics,
      material_properties: imagineArtMaterialProperties
    }
  },
  {
    name: "IA Sensuous: Window Light",
    data: {
      shot: "Full body portrait (3:4), window seat intimate",
      subject: {
        ...MEERA_IMAGINEART_SUBJECT,
        pose: "Side-lying recline on window seat, one arm supporting head, top leg drawn up revealing inner thigh, 40\" hips prominent"
      },
      wardrobe: "Single silk strand draped from shoulder, crossing body diagonally, 99% exposure of golden-brown Indian curves",
      environment: "Large bay window seat with plush cushions, soft natural light flooding in, city view beyond, intimate reading nook transformed",
      lighting: "Soft natural window light, gentle shadows defining curves, realistic indoor lighting",
      camera: { focal_length: "85mm", aperture: "f/1.4", distance: "2.5 m", angle: "Side natural", framing: "Full body window recline" },
      color_grade: "Natural warm, soft window light",
      style: "Inner thigh curves in window light, intimate morning",
      quality: "8K natural light photography",
      figure_and_form: "Inner thigh curves prominent, hip-to-thigh flow visible",
      skin_micro_details: imagineArtSkinDetails,
      fabric_physics: imagineArtFabricPhysics,
      material_properties: imagineArtMaterialProperties
    }
  },
  {
    name: "IA Sensuous: Fireside Surrender",
    data: {
      shot: "Full body portrait (3:4), fireplace intimate",
      subject: {
        ...MEERA_IMAGINEART_SUBJECT,
        pose: "Fully reclined on back, one knee raised, arms relaxed above head, inner thighs parted naturally, direct inviting gaze"
      },
      wardrobe: "Platinum navel ring and gold anklet only as coverage, otherwise completely exposed, museum fine art nude",
      environment: "Beside crackling fireplace, soft fur rug, warm flickering light, intimate warmth, cozy private corner",
      lighting: "Warm fireplace glow from side, dramatic shadows and highlights, cozy intimate illumination on skin",
      camera: { focal_length: "85mm", aperture: "f/1.4", distance: "2.5 m", angle: "Low side", framing: "Full body fireplace recline" },
      color_grade: "Warm firelight amber and orange",
      style: "Inner thigh surrender by firelight, intimate warmth",
      quality: "8K professional fine art photography",
      figure_and_form: "Inner thighs parted, midriff to thigh flow visible",
      skin_micro_details: imagineArtSkinDetails,
      fabric_physics: imagineArtFabricPhysics,
      material_properties: imagineArtMaterialProperties
    }
  },
  {
    name: "IA Sensuous: Ultimate Expression",
    data: {
      shot: "Full body portrait (3:4), peak intimate fine art",
      subject: {
        ...MEERA_IMAGINEART_SUBJECT,
        pose: "Fully reclined on back, one knee raised, arms relaxed above head, inner thighs parted naturally, direct inviting gaze, vulnerable open pose"
      },
      wardrobe: "Artistic nude, platinum navel ring and gold anklet jewelry only, full golden-brown Indian body revealed",
      environment: "Opulent king-size bed with cream silk sheets, soft diffused morning light through sheer curtains, private boudoir setting",
      lighting: "Soft golden morning light through sheer curtains, warm diffused glow on golden-brown skin",
      camera: { focal_length: "85mm f/1.2", aperture: "f/1.4", distance: "2.5 m", angle: "Elevated intimate", framing: "Full body peak composition" },
      color_grade: "Warm golden, soft amber and cream",
      style: "Peak inner thigh artistic expression, ultimate Meera",
      quality: "8K ultra-high resolution, museum exhibition quality",
      figure_and_form: "Peak 37DD-27-40 display, inner thighs prominently featured",
      skin_micro_details: imagineArtSkinDetails,
      fabric_physics: imagineArtFabricPhysics,
      material_properties: imagineArtMaterialProperties
    }
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
// HELMUT NEWTON BIG NUDES COLLECTION - Fine Art Nude Photography
// ═══════════════════════════════════════════════════════════════════════════════

export const helmutNewtonBigNudesConcepts: ArtisticConcept[] = [
  {
    name: "IA Newton: Power Stance",
    data: {
      shot: "Full body portrait (3:4), Helmut Newton signature power nude",
      subject: {
        ...MEERA_IMAGINEART_SUBJECT,
        pose: "Standing power pose - nude, legs apart showing inner thighs, hands on hips emphasizing 27\" waist, 37DD bust lifted, chin raised with confidence, full frontal revealing complete hourglass"
      },
      wardrobe: "Fine art nude, platinum navel ring as sole adornment, museum-quality artistic photography",
      environment: "Professional white photography studio, seamless background, dramatic directional lighting creating Helmut Newton contrast, clean minimalist space",
      lighting: "Helmut Newton signature lighting - high contrast, dramatic shadows, single strong key light creating bold sculptural shadows on curves, black shadows defining form",
      camera: { focal_length: "80mm f/2.8", aperture: "f/2.8", distance: "3 m", angle: "Slightly low powerful", framing: "Full body power composition" },
      color_grade: "High contrast noir with warm skin preservation",
      style: "Helmut Newton Big Nudes tribute, powerful confident sculptural",
      quality: "Hasselblad H6D-100c, 8K ultra-high resolution, museum exhibition quality",
      figure_and_form: "Full nude revealing hourglass proportions, power stance with inner thighs visible",
      skin_micro_details: imagineArtSkinDetails,
      fabric_physics: imagineArtFabricPhysics,
      material_properties: imagineArtMaterialProperties
    }
  },
  {
    name: "IA Newton: Urban Goddess",
    data: {
      shot: "Full body portrait (3:4), city power nude at night",
      subject: {
        ...MEERA_IMAGINEART_SUBJECT,
        pose: "Standing power pose - nude, legs apart showing inner thighs, hands on hips emphasizing waist, bust lifted, chin raised with confidence"
      },
      wardrobe: "Fine art nude, platinum navel ring and gold anklet visible",
      environment: "Ultra-modern penthouse apartment, floor-to-ceiling windows with city skyline at night, minimalist white furniture, dramatic spotlight creating bold shadows",
      lighting: "Night city lighting - ambient city glow through windows, dramatic silhouette possibilities, urban fine art atmosphere",
      camera: { focal_length: "50mm", aperture: "f/2.8", distance: "3.5 m", angle: "Low powerful", framing: "Full body with city skyline" },
      color_grade: "Deep urban noir with amber city accents",
      style: "City power nude at night, urban goddess",
      quality: "8K cinematic urban photography",
      figure_and_form: "Powerful hourglass silhouette against city lights",
      skin_micro_details: imagineArtSkinDetails,
      fabric_physics: imagineArtFabricPhysics,
      material_properties: imagineArtMaterialProperties
    }
  },
  {
    name: "IA Newton: Victory Stance",
    data: {
      shot: "Full body portrait (3:4), classical victory pose as nude art",
      subject: {
        ...MEERA_IMAGINEART_SUBJECT,
        pose: "Victoria pose - standing nude like classical victory statue, one leg forward showing inner thigh, arms raised, full body as monument to feminine power"
      },
      wardrobe: "Fine art nude, platinum navel ring catching spotlight",
      environment: "Private art gallery space, white walls, spotlit as if subject is the artwork, museum quality setting, body as living sculpture",
      lighting: "Museum spotlight effect - body lit as sculpture, dark surroundings, dramatic focus on form, curves catching concentrated light",
      camera: { focal_length: "35mm", aperture: "f/2.8", distance: "4 m", angle: "Low dramatic", framing: "Full body gallery composition" },
      color_grade: "Gallery white with warm skin tones",
      style: "Classical victory pose as nude art, living sculpture",
      quality: "8K museum exhibition photography",
      figure_and_form: "Sculptural 37DD-27-40 form as living artwork",
      skin_micro_details: imagineArtSkinDetails,
      fabric_physics: imagineArtFabricPhysics,
      material_properties: imagineArtMaterialProperties
    }
  },
  {
    name: "IA Newton: Wall Lean",
    data: {
      shot: "Full body portrait (3:4), industrial wall lean nude",
      subject: {
        ...MEERA_IMAGINEART_SUBJECT,
        pose: "Leaning against wall - nude, one leg bent showing inner thigh curves, full body exposed, torso twisted to show 37DD profile and 40\" hip curve, powerful confident expression"
      },
      wardrobe: "Fine art nude, platinum navel ring visible",
      environment: "Industrial loft space, exposed brick walls, large steel-framed windows, dramatic natural light, raw concrete floors, fashion editorial setting",
      lighting: "Split lighting - half body in dramatic light, half in shadow, sculptural definition of curves, artistic high contrast",
      camera: { focal_length: "85mm", aperture: "f/2.0", distance: "3 m", angle: "Three-quarter", framing: "Full body wall composition" },
      color_grade: "Industrial warm with deep shadows",
      style: "Industrial wall lean inner thigh focus, raw elegance",
      quality: "8K professional fine art photography",
      figure_and_form: "Inner thigh curves prominent, hip-bust profile visible",
      skin_micro_details: imagineArtSkinDetails,
      fabric_physics: imagineArtFabricPhysics,
      material_properties: imagineArtMaterialProperties
    }
  },
  {
    name: "IA Newton: Goddess Recline",
    data: {
      shot: "Full body portrait (3:4), classical reclined nude inner thigh study",
      subject: {
        ...MEERA_IMAGINEART_SUBJECT,
        pose: "Reclined nude on luxurious surface - legs parted naturally showing inner thigh detail, one arm above head, 37DD bust falling naturally, full 40\" hips prominent, direct powerful gaze"
      },
      wardrobe: "Fine art nude, platinum navel ring centered, gold anklet glinting",
      environment: "Classic Parisian boudoir, ornate gilded mirrors, velvet chaise in deep burgundy, antique chandelier casting warm light, luxurious private atmosphere",
      lighting: "Classic Rembrandt lighting - triangular light on cheek, dramatic chiaroscuro, painterly quality highlighting golden-brown Indian skin",
      camera: { focal_length: "85mm", aperture: "f/1.4", distance: "2.5 m", angle: "Elevated classical", framing: "Full body chaise recline" },
      color_grade: "Rich burgundy and gold, painterly warmth",
      style: "Classical reclined nude inner thigh study, Renaissance meets modern",
      quality: "8K medium format quality, museum exhibition",
      figure_and_form: "Inner thigh detail prominently displayed, classical goddess pose",
      skin_micro_details: imagineArtSkinDetails,
      fabric_physics: imagineArtFabricPhysics,
      material_properties: imagineArtMaterialProperties
    }
  },
  {
    name: "IA Newton: Kneeling Power",
    data: {
      shot: "Full body portrait (3:4), kneeling nude power study",
      subject: {
        ...MEERA_IMAGINEART_SUBJECT,
        pose: "Kneeling nude - knees apart revealing inner thigh curves, torso upright, hands on thighs, 37DD bust prominent, platinum navel ring centered, commanding presence"
      },
      wardrobe: "Fine art nude, platinum navel ring catching dramatic light",
      environment: "Professional white photography studio, seamless background, dramatic directional lighting",
      lighting: "Helmut Newton signature - high contrast, dramatic shadows, single strong key light creating bold sculptural shadows on curves",
      camera: { focal_length: "85mm", aperture: "f/2.8", distance: "2.5 m", angle: "Low powerful", framing: "Full body kneeling power" },
      color_grade: "High contrast noir with warm skin",
      style: "Kneeling nude power study, commanding presence",
      quality: "8K professional fine art photography",
      figure_and_form: "Kneeling with inner thighs revealed, powerful upright torso",
      skin_micro_details: imagineArtSkinDetails,
      fabric_physics: imagineArtFabricPhysics,
      material_properties: imagineArtMaterialProperties
    }
  },
  {
    name: "IA Newton: Seated Spread",
    data: {
      shot: "Full body portrait (3:4), seated spread nude",
      subject: {
        ...MEERA_IMAGINEART_SUBJECT,
        pose: "Seated nude with legs spread - inner thighs prominently displayed, leaning back on hands, full hourglass visible from chest to thighs, confident sexual power"
      },
      wardrobe: "Fine art nude, platinum navel ring centered, gold anklet visible",
      environment: "Ultra-modern penthouse apartment, floor-to-ceiling windows with city skyline at night, dramatic lighting",
      lighting: "Night city lighting - ambient city glow through windows, dramatic silhouette with warm skin illumination",
      camera: { focal_length: "50mm", aperture: "f/2.0", distance: "3 m", angle: "Frontal low", framing: "Full body seated spread" },
      color_grade: "Urban noir with amber accents",
      style: "Seated spread inner thigh prominence, confident power",
      quality: "8K cinematic photography",
      figure_and_form: "Inner thighs prominently displayed, full hourglass visible",
      skin_micro_details: imagineArtSkinDetails,
      fabric_physics: imagineArtFabricPhysics,
      material_properties: imagineArtMaterialProperties
    }
  },
  {
    name: "IA Newton: Arched Beauty",
    data: {
      shot: "Full body portrait (3:4), dramatic back arch nude",
      subject: {
        ...MEERA_IMAGINEART_SUBJECT,
        pose: "Prone with back dramatically arched - nude, full rounded glutes lifted, inner thighs visible from behind, looking over shoulder, powerful sensual curve"
      },
      wardrobe: "Fine art nude, gold anklet visible",
      environment: "Luxury hotel suite, king bed with white linens, floor-to-ceiling drapery, elegant neutral tones, private intimate atmosphere",
      lighting: "Soft natural window light - ethereal Paolo Roversi influence, gentle shadows, golden hour warmth on Indian skin",
      camera: { focal_length: "85mm", aperture: "f/1.4", distance: "2.5 m", angle: "Low behind", framing: "Full body arch composition" },
      color_grade: "Warm natural, soft white and gold",
      style: "Dramatic back arch nude, sculptural posterior",
      quality: "8K professional intimate photography",
      figure_and_form: "Full rounded glutes, inner thighs visible from behind",
      skin_micro_details: imagineArtSkinDetails,
      fabric_physics: imagineArtFabricPhysics,
      material_properties: imagineArtMaterialProperties
    }
  },
  {
    name: "IA Newton: Sculptural Twist",
    data: {
      shot: "Full body portrait (3:4), torso twist showing all curves",
      subject: {
        ...MEERA_IMAGINEART_SUBJECT,
        pose: "Standing with torso twist - nude, showing both 37DD bust profile and 40\" hip curve simultaneously, legs creating strong lines, inner thighs catching light"
      },
      wardrobe: "Fine art nude, platinum navel ring catching light",
      environment: "Professional white photography studio, seamless background, professional three-point lighting",
      lighting: "Professional three-point lighting - key, fill, and rim creating dimensional form, fashion photography precision",
      camera: { focal_length: "85mm", aperture: "f/2.8", distance: "3 m", angle: "Three-quarter", framing: "Full body twist composition" },
      color_grade: "Clean studio with warm skin",
      style: "Torso twist showing all curves, sculptural mastery",
      quality: "8K professional studio photography",
      figure_and_form: "Both bust profile and hip curve visible simultaneously",
      skin_micro_details: imagineArtSkinDetails,
      fabric_physics: imagineArtFabricPhysics,
      material_properties: imagineArtMaterialProperties
    }
  },
  {
    name: "IA Newton: Ultimate Masterpiece",
    data: {
      shot: "Full body portrait (3:4), ultimate Helmut Newton tribute",
      subject: {
        ...MEERA_IMAGINEART_SUBJECT,
        pose: "Standing power pose - nude, legs apart showing inner thighs, hands on hips emphasizing 27\" waist, 37DD bust lifted, chin raised with ultimate confidence"
      },
      wardrobe: "Fine art nude, platinum navel ring as sole adornment",
      environment: "Professional white photography studio, seamless background, dramatic directional Helmut Newton lighting",
      lighting: "Helmut Newton signature lighting - high contrast, dramatic shadows, single strong key light creating bold sculptural shadows",
      camera: { focal_length: "80mm f/2.8", aperture: "f/2.8", distance: "3 m", angle: "Slightly low powerful", framing: "Ultimate power composition" },
      color_grade: "High contrast noir with warm skin preservation",
      style: "Ultimate Helmut Newton tribute, peak fine art nude",
      quality: "Hasselblad H6D-100c, 8K museum exhibition quality",
      figure_and_form: "Peak 37DD-27-40 power display, inner thighs prominent",
      skin_micro_details: imagineArtSkinDetails,
      fabric_physics: imagineArtFabricPhysics,
      material_properties: imagineArtMaterialProperties
    }
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
// INNER THIGH CLOSEUP COLLECTION - Macro Photography
// ═══════════════════════════════════════════════════════════════════════════════

export const innerThighCloseupConcepts: ArtisticConcept[] = [
  {
    name: "IA Closeup: Intimate V",
    data: {
      shot: "Closeup portrait (3:4), detailed V-shape where thighs meet",
      subject: {
        ...MEERA_IMAGINEART_SUBJECT,
        pose: "V-shaped intimate area where inner thighs meet, laying position, golden-brown Indian skin texture visible, soft feminine curves where thighs converge, natural shadows in intimate V-formation"
      },
      wardrobe: "Artistic nude, inner thigh focus, platinum navel piercing visible when midriff in frame",
      environment: "On cream silk bedsheets, intimate bedroom setting, soft fabric contrast against golden-brown skin",
      lighting: "Soft diffused studio light, even illumination on golden-brown skin, minimal shadows, beauty photography lighting",
      camera: { focal_length: "100mm macro", aperture: "f/2.8", distance: "1.5 m", angle: "Intimate closeup", framing: "Inner thigh V-shape detail" },
      color_grade: "Natural warm, soft silk tones",
      style: "Detailed V-shape where thighs meet, macro artistry",
      quality: "8K macro detail, exceptional skin texture capture",
      figure_and_form: "Extreme closeup V-shape focus, inner thigh skin texture",
      skin_micro_details: imagineArtSkinDetails,
      fabric_physics: imagineArtFabricPhysics,
      material_properties: imagineArtMaterialProperties
    }
  },
  {
    name: "IA Closeup: Golden V",
    data: {
      shot: "Closeup portrait (3:4), golden light on V-formation",
      subject: {
        ...MEERA_IMAGINEART_SUBJECT,
        pose: "V-shaped intimate area where inner thighs meet, natural relaxed position, ultra-detailed golden-brown Indian skin"
      },
      wardrobe: "Artistic nude, inner thigh focus",
      environment: "On burgundy velvet chaise lounge, luxurious texture, vintage boudoir atmosphere",
      lighting: "Golden hour warm light, amber tones on golden-brown Indian skin, soft shadows, intimate atmosphere",
      camera: { focal_length: "100mm macro", aperture: "f/2.8", distance: "1.5 m", angle: "Elevated closeup", framing: "V-shape golden light" },
      color_grade: "Warm golden amber, velvet burgundy accents",
      style: "Golden light on inner thigh V-formation, intimate warmth",
      quality: "8K exceptional golden hour detail",
      figure_and_form: "Inner thigh V with golden lighting emphasis",
      skin_micro_details: imagineArtSkinDetails,
      fabric_physics: imagineArtFabricPhysics,
      material_properties: imagineArtMaterialProperties
    }
  },
  {
    name: "IA Closeup: Silk Parting",
    data: {
      shot: "Medium closeup (3:4), parted inner thighs on silk",
      subject: {
        ...MEERA_IMAGINEART_SUBJECT,
        pose: "Both inner thighs parted naturally, golden-brown skin catching warm light, V-shaped negative space between thighs, soft shadows defining inner curves"
      },
      wardrobe: "Artistic nude, inner thigh focus",
      environment: "On cream silk bedsheets, intimate bedroom setting, soft fabric contrast",
      lighting: "Soft diffused studio light, even illumination revealing skin texture, beauty lighting on body",
      camera: { focal_length: "85mm", aperture: "f/2.0", distance: "2 m", angle: "Elevated intimate", framing: "Parted thighs composition" },
      color_grade: "Soft cream and warm skin tones",
      style: "Parted inner thighs on silk sheets, intimate detail",
      quality: "8K professional intimate photography",
      figure_and_form: "Both inner thighs visible, V-shaped negative space",
      skin_micro_details: imagineArtSkinDetails,
      fabric_physics: imagineArtFabricPhysics,
      material_properties: imagineArtMaterialProperties
    }
  },
  {
    name: "IA Closeup: Gap Study",
    data: {
      shot: "Closeup portrait (3:4), backlit thigh gap artistic study",
      subject: {
        ...MEERA_IMAGINEART_SUBJECT,
        pose: "Inner thigh gap study, space between toned thighs, golden-brown skin on both inner thigh surfaces, light passing through thigh gap, natural feminine curves framing negative space"
      },
      wardrobe: "Artistic nude, standing position, inner thigh focus",
      environment: "Clean white studio background, professional closeup photography, focused on skin detail",
      lighting: "Backlighting creating silhouette edge, light wrapping around thigh curves, ethereal glow on skin edges",
      camera: { focal_length: "85mm", aperture: "f/2.8", distance: "2 m", angle: "Low backlit", framing: "Thigh gap silhouette" },
      color_grade: "High contrast with warm skin preservation",
      style: "Backlit thigh gap artistic study, ethereal edges",
      quality: "8K professional studio photography",
      figure_and_form: "Thigh gap with light passing through, silhouette edges",
      skin_micro_details: imagineArtSkinDetails,
      fabric_physics: imagineArtFabricPhysics,
      material_properties: imagineArtMaterialProperties
    }
  },
  {
    name: "IA Closeup: Ultimate Detail",
    data: {
      shot: "Extreme closeup (3:4), peak inner thigh masterpiece",
      subject: {
        ...MEERA_IMAGINEART_SUBJECT,
        pose: "V-shaped intimate area where inner thighs meet, ultra-detailed golden-brown Indian skin texture, natural pores visible, soft feminine shadowing"
      },
      wardrobe: "Artistic nude, extreme inner thigh detail focus",
      environment: "On cream silk bedsheets, intimate bedroom setting, soft fabric contrast against golden-brown skin",
      lighting: "Golden hour warm light, amber tones on golden-brown Indian skin, soft shadows, intimate atmosphere",
      camera: { focal_length: "100mm macro", aperture: "f/2.8", distance: "1 m", angle: "Intimate macro", framing: "Peak detail composition" },
      color_grade: "Warm golden, natural skin tones",
      style: "Peak inner thigh closeup masterpiece, ultra-realistic",
      quality: "8K macro photography, maximum skin texture detail",
      figure_and_form: "Ultimate inner thigh detail, hyper-realistic skin",
      skin_micro_details: imagineArtSkinDetails,
      fabric_physics: imagineArtFabricPhysics,
      material_properties: imagineArtMaterialProperties
    }
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
// MIDNIGHT MUSE RECLINED COLLECTION - Candlelit Environments
// ═══════════════════════════════════════════════════════════════════════════════

export const midnightMuseReclinedConcepts: ArtisticConcept[] = [
  {
    name: "IA Midnight: Candlelit Surrender",
    data: {
      shot: "Full body portrait (3:4), full spread surrender on candlelit bed",
      subject: {
        ...MEERA_IMAGINEART_SUBJECT,
        pose: "Legs naturally parted revealing complete inner thigh landscape, V-shaped intimate space between thighs catching candlelight, golden-brown Indian skin visible from hips to knees"
      },
      wardrobe: "Artistic nude with platinum navel piercing catching candlelight, gold anklet glinting",
      environment: "Luxurious king-size bed with black silk sheets and burgundy velvet pillows, dozens of flickering candles surrounding bed, dark midnight atmosphere with pools of golden light, scattered rose petals",
      lighting: "Rembrandt lighting with single soft key creating triangular highlight on cheek and body, deep shadows, candle flames as practical lights, chiaroscuro mastery",
      camera: { focal_length: "85mm", aperture: "f/1.4", distance: "2.5 m", angle: "Elevated intimate", framing: "Full spread candlelit" },
      color_grade: "Rich amber candlelight, burgundy and gold accents",
      style: "Full spread surrender on candlelit bed, intimate philosophy",
      quality: "8K cinematic, legendary cinematographic quality",
      figure_and_form: "Complete inner thigh landscape visible, V-shaped intimate space",
      skin_micro_details: imagineArtSkinDetails,
      fabric_physics: imagineArtFabricPhysics,
      material_properties: "Platinum navel ring catching candlelight, gold anklet glinting, diamond accents sparkling"
    }
  },
  {
    name: "IA Midnight: Butterfly Position",
    data: {
      shot: "Full body portrait (3:4), maximum butterfly inner thigh exposure",
      subject: {
        ...MEERA_IMAGINEART_SUBJECT,
        pose: "Butterfly position - soles of feet together, knees fallen outward to sides, maximum inner thigh exposure, diamond-shaped negative space between thighs, golden-brown inner thigh skin fully displayed"
      },
      wardrobe: "Artistic nude, platinum navel ring with diamond, gold anklet visible",
      environment: "Luxurious king-size bed with black silk sheets, dozens of flickering candles, dark midnight atmosphere",
      lighting: "Warm golden candlelight simulating perpetual golden hour, amber tones wrapping around curves, soft fill from multiple flame sources",
      camera: { focal_length: "85mm", aperture: "f/1.4", distance: "2.5 m", angle: "Overhead intimate", framing: "Butterfly spread" },
      color_grade: "Golden amber, romantic candlelight",
      style: "Butterfly position revealing maximum inner thigh, vulnerable strength",
      quality: "8K professional intimate photography",
      figure_and_form: "Maximum inner thigh exposure, butterfly position",
      skin_micro_details: imagineArtSkinDetails,
      fabric_physics: imagineArtFabricPhysics,
      material_properties: imagineArtMaterialProperties
    }
  },
  {
    name: "IA Midnight: Velvet Recline",
    data: {
      shot: "Full body portrait (3:4), full body reclined on velvet by firelight",
      subject: {
        ...MEERA_IMAGINEART_SUBJECT,
        pose: "Legs naturally parted revealing complete inner thigh landscape, V-shaped intimate space, reclined on velvet with serene goddess expression"
      },
      wardrobe: "Artistic nude, platinum navel piercing visible, gold anklet",
      environment: "Antique velvet chaise lounge in deep burgundy, positioned before roaring fireplace, candlelit sconces on walls, Persian rug beneath, midnight intimacy",
      lighting: "Flickering firelight creating animated shadows, warm orange-red undertones, dancing light patterns on skin, primal intimate atmosphere",
      camera: { focal_length: "85mm", aperture: "f/1.4", distance: "3 m", angle: "Side elevated", framing: "Full velvet recline" },
      color_grade: "Warm firelight orange, deep burgundy",
      style: "Full body reclined on velvet chaise by firelight, serene goddess",
      quality: "8K cinematic firelight capture",
      figure_and_form: "Full body curves on velvet, inner thighs prominent",
      skin_micro_details: imagineArtSkinDetails,
      fabric_physics: imagineArtFabricPhysics,
      material_properties: imagineArtMaterialProperties
    }
  },
  {
    name: "IA Midnight: City Lights Muse",
    data: {
      shot: "Full body portrait (3:4), provocative pose against city night skyline",
      subject: {
        ...MEERA_IMAGINEART_SUBJECT,
        pose: "One leg extended, other raised with knee bent showing full inner thigh, inner thigh catching candlelight from multiple angles, golden-brown skin texture visible with natural pores"
      },
      wardrobe: "Artistic nude, platinum navel ring, gold anklet visible",
      environment: "Plush daybed beneath large window showing city lights at midnight, sheer curtains partially drawn, candles on window ledge and floor, moonlight mixing with candlelight",
      lighting: "Cool moonlight from window mixing with warm candlelight, color temperature contrast, blue rim light, amber key light",
      camera: { focal_length: "50mm", aperture: "f/1.4", distance: "3 m", angle: "Low dramatic", framing: "City skyline backdrop" },
      color_grade: "Cool blue moonlight with warm amber candlelight",
      style: "Provocative pose against city night skyline, urban goddess",
      quality: "8K cinematic night photography",
      figure_and_form: "Full inner thigh visible, city lights backdrop",
      skin_micro_details: imagineArtSkinDetails,
      fabric_physics: imagineArtFabricPhysics,
      material_properties: imagineArtMaterialProperties
    }
  },
  {
    name: "IA Midnight: Ultimate Masterpiece",
    data: {
      shot: "Full body portrait (3:4), peak midnight muse inner thigh masterpiece",
      subject: {
        ...MEERA_IMAGINEART_SUBJECT,
        pose: "Legs naturally parted revealing complete inner thigh landscape, V-shaped intimate space between thighs catching candlelight, passionate intensity expression"
      },
      wardrobe: "Artistic nude, platinum navel ring with diamond catching candlelight, gold anklet glinting",
      environment: "Luxurious king-size bed with black silk sheets and burgundy velvet pillows, dozens of flickering candles, dark midnight atmosphere with pools of golden light",
      lighting: "Rembrandt lighting with soft key creating triangular highlight, candle flames as practical lights, museum-quality dramatic illumination",
      camera: { focal_length: "85mm", aperture: "f/1.4", distance: "2.5 m", angle: "Elevated intimate", framing: "Ultimate midnight composition" },
      color_grade: "Rich amber, burgundy, and gold",
      style: "Peak inner thigh display, passionate midnight masterpiece",
      quality: "8K legendary cinematographic quality",
      figure_and_form: "Ultimate 37DD-27-40 midnight display, inner thighs prominent",
      skin_micro_details: imagineArtSkinDetails,
      fabric_physics: imagineArtFabricPhysics,
      material_properties: "Platinum piercing and gold anklet catching candlelight with sparkle"
    }
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
// LAYING POSES ALL ANGLES COLLECTION - Camera Angle Variations
// ═══════════════════════════════════════════════════════════════════════════════

export const layingPosesAllAnglesConcepts: ArtisticConcept[] = [
  {
    name: "IA Laying: Frontal Spread",
    data: {
      shot: "Full body portrait (3:4), classic frontal spread on silk bed",
      subject: {
        ...MEERA_IMAGINEART_SUBJECT,
        pose: "Laying on back, legs naturally parted and spread toward camera, inner thighs fully visible from ankle to hip, V-shaped intimate space prominent, 37DD bust visible falling naturally, 40\" round hips framing thigh area, direct intimate frontal view"
      },
      wardrobe: "Artistic nude, platinum navel ring visible, gold anklet",
      environment: "Luxurious bed with cream silk sheets, scattered silk pillows, warm ambient lighting, private bedroom at golden hour",
      lighting: "Golden warm light wrapping around curves, soft shadows defining inner thigh contours, intimate warmth on golden-brown Indian skin",
      camera: { focal_length: "85mm", aperture: "f/1.4", distance: "2.5 m", angle: "Frontal at foot of bed", framing: "Full spread frontal" },
      color_grade: "Warm golden, cream silk tones",
      style: "Classic frontal spread on silk bed, intimate invitation",
      quality: "8K professional intimate photography",
      figure_and_form: "Inner thighs fully visible, V-shaped intimate space",
      skin_micro_details: imagineArtSkinDetails,
      fabric_physics: imagineArtFabricPhysics,
      material_properties: imagineArtMaterialProperties
    }
  },
  {
    name: "IA Laying: Butterfly Display",
    data: {
      shot: "Full body portrait (3:4), maximum butterfly exposure",
      subject: {
        ...MEERA_IMAGINEART_SUBJECT,
        pose: "Laying on back in butterfly position - soles of feet together, knees fallen outward to sides, maximum inner thigh exposure from hips to knees on both legs, diamond-shaped negative space between thighs, 27\" waist with navel piercing visible"
      },
      wardrobe: "Artistic nude, platinum navel ring centered",
      environment: "Luxurious bed with cream silk sheets, warm ambient lighting, private bedroom",
      lighting: "Soft natural diffused light, even illumination revealing skin texture, beauty lighting on body",
      camera: { focal_length: "85mm", aperture: "f/1.4", distance: "2.5 m", angle: "Frontal elevated", framing: "Maximum butterfly" },
      color_grade: "Natural warm, soft diffused",
      style: "Maximum butterfly exposure, complete vulnerability",
      quality: "8K exceptional anatomical detail",
      figure_and_form: "Maximum inner thigh exposure, diamond negative space",
      skin_micro_details: imagineArtSkinDetails,
      fabric_physics: imagineArtFabricPhysics,
      material_properties: imagineArtMaterialProperties
    }
  },
  {
    name: "IA Laying: Birds Eye Spread",
    data: {
      shot: "Full body portrait (3:4), overhead view full spread",
      subject: {
        ...MEERA_IMAGINEART_SUBJECT,
        pose: "Laying on back, legs spread in V-shape, camera looking straight down at full body, inner thighs visible from above, 37DD bust, 27\" waist, 40\" round hips all visible, hair spread around head, geometric body composition"
      },
      wardrobe: "Artistic nude, platinum navel ring centered, all jewelry visible",
      environment: "Luxurious bed with cream silk sheets, warm ambient lighting",
      lighting: "Soft natural diffused light, even illumination from above revealing skin texture",
      camera: { focal_length: "35mm", aperture: "f/2.8", distance: "2 m", angle: "Directly overhead", framing: "Bird's eye full body" },
      color_grade: "Natural warm, geometric composition",
      style: "Overhead view full spread, artistic geometry",
      quality: "8K overhead composition photography",
      figure_and_form: "Full body visible from above, geometric hourglass",
      skin_micro_details: imagineArtSkinDetails,
      fabric_physics: imagineArtFabricPhysics,
      material_properties: imagineArtMaterialProperties
    }
  },
  {
    name: "IA Laying: Low Feet View",
    data: {
      shot: "Full body portrait (3:4), dramatic low angle from feet",
      subject: {
        ...MEERA_IMAGINEART_SUBJECT,
        pose: "Laying on back, legs parted toward low camera, inner thighs creating dramatic converging perspective, thighs framing view toward torso, 37DD bust visible in background, dramatic intimate low perspective"
      },
      wardrobe: "Artistic nude, gold anklet prominent, navel piercing visible",
      environment: "Luxurious bed with cream silk sheets",
      lighting: "Backlighting creating glowing outline, inner thighs catching fill light, ethereal goddess quality",
      camera: { focal_length: "35mm", aperture: "f/2.0", distance: "1.5 m", angle: "Very low from feet", framing: "Dramatic perspective" },
      color_grade: "Backlit ethereal with warm fill",
      style: "Dramatic low angle from feet, converging perspective",
      quality: "8K dramatic perspective photography",
      figure_and_form: "Inner thighs in converging perspective, dramatic depth",
      skin_micro_details: imagineArtSkinDetails,
      fabric_physics: imagineArtFabricPhysics,
      material_properties: imagineArtMaterialProperties
    }
  },
  {
    name: "IA Laying: Three-Quarter Back",
    data: {
      shot: "Full body portrait (3:4), three-quarter back over shoulder",
      subject: {
        ...MEERA_IMAGINEART_SUBJECT,
        pose: "Laying on stomach, hips slightly raised, looking over shoulder, inner thigh visible from behind, full round glutes and 40\" hip curves, back of thigh meeting inner thigh visible"
      },
      wardrobe: "Artistic nude, gold anklet visible",
      environment: "Luxurious bed with cream silk sheets, warm ambient lighting",
      lighting: "Golden warm light wrapping around curves, soft shadows defining contours",
      camera: { focal_length: "85mm", aperture: "f/1.4", distance: "2.5 m", angle: "Three-quarter back", framing: "Over shoulder glance" },
      color_grade: "Warm golden, intimate atmosphere",
      style: "Three-quarter back over shoulder, posterior elegance",
      quality: "8K professional intimate photography",
      figure_and_form: "Full glutes and hip curves, inner thigh visible from behind",
      skin_micro_details: imagineArtSkinDetails,
      fabric_physics: imagineArtFabricPhysics,
      material_properties: imagineArtMaterialProperties
    }
  },
  {
    name: "IA Laying: Ultimate Intimate",
    data: {
      shot: "Full body portrait (3:4), ultimate intimate inner thigh masterpiece",
      subject: {
        ...MEERA_IMAGINEART_SUBJECT,
        pose: "Laying among scattered pillows, legs naturally spread in relaxed intimate pose, inner thighs soft and accessible, comfortable vulnerable positioning, floor level intimate perspective"
      },
      wardrobe: "Artistic nude, platinum navel ring, gold anklet visible",
      environment: "Luxurious bed with cream silk sheets, soft cushions, warm ambient lighting, private bedroom at golden hour",
      lighting: "Golden warm light wrapping around curves, soft shadows defining inner thigh contours, intimate warmth",
      camera: { focal_length: "85mm", aperture: "f/1.4", distance: "2 m", angle: "Floor level intimate", framing: "Ultimate intimate" },
      color_grade: "Warm golden, soft intimate",
      style: "Ultimate intimate inner thigh masterpiece, vulnerable beauty",
      quality: "8K museum quality intimate photography",
      figure_and_form: "Peak 37DD-27-40 laying display, inner thighs prominent",
      skin_micro_details: imagineArtSkinDetails,
      fabric_physics: imagineArtFabricPhysics,
      material_properties: imagineArtMaterialProperties
    }
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
// BENT KNEES & V LEGS CLOSEUP REALISTIC COLLECTION
// ═══════════════════════════════════════════════════════════════════════════════

export const bentKneesVLegsRealisticConcepts: ArtisticConcept[] = [
  {
    name: "IA Bent: Classic Window Light",
    data: {
      shot: "Full body portrait (3:4), classic bent knees in soft window light",
      subject: {
        ...MEERA_IMAGINEART_SUBJECT,
        pose: "Laying on back, both knees bent at 90 degrees and fallen apart naturally to sides, feet flat on surface, inner thighs fully exposed creating V-shape toward intimate area, natural relaxed positioning, golden-brown inner thigh skin catching light"
      },
      wardrobe: "Artistic nude, platinum navel ring visible, gold anklet",
      environment: "Private intimate bedroom, luxurious soft surfaces, natural morning atmosphere",
      lighting: "Natural soft light from large window, even diffused illumination, realistic indoor daylight, subtle shadows defining curves, true-to-life skin color rendering",
      camera: { focal_length: "85mm", aperture: "f/1.4", distance: "2.5 m", angle: "Elevated frontal", framing: "Classic bent composition" },
      color_grade: "Natural warm, realistic indoor tones",
      style: "Classic bent knees in soft window light, ultra-realistic",
      quality: "8K hyper-realistic skin detail photography",
      figure_and_form: "Bent knees apart creating V-shape, full inner thigh exposure",
      skin_micro_details: imagineArtSkinDetails,
      fabric_physics: imagineArtFabricPhysics,
      material_properties: imagineArtMaterialProperties
    }
  },
  {
    name: "IA Bent: Wide Firelight",
    data: {
      shot: "Full body portrait (3:4), wide spread in warm firelight glow",
      subject: {
        ...MEERA_IMAGINEART_SUBJECT,
        pose: "Knees bent and spread extra wide, almost touching surface on each side, maximum inner thigh exposure, dramatic V-shape with intimate shadowing, feet may lift slightly from wide spread"
      },
      wardrobe: "Artistic nude, platinum navel ring catching firelight",
      environment: "Beside fireplace on soft surface, warm intimate atmosphere",
      lighting: "Warm flickering firelight, orange-amber tones, dancing subtle shadows, intimate realistic fireplace scene",
      camera: { focal_length: "85mm", aperture: "f/1.4", distance: "2.5 m", angle: "Low frontal", framing: "Wide spread firelight" },
      color_grade: "Warm firelight amber and orange",
      style: "Wide spread in warm firelight glow, maximum exposure",
      quality: "8K firelight capture with skin detail",
      figure_and_form: "Maximum inner thigh exposure, wide bent knees",
      skin_micro_details: imagineArtSkinDetails,
      fabric_physics: imagineArtFabricPhysics,
      material_properties: imagineArtMaterialProperties
    }
  },
  {
    name: "IA V-Legs: Classic Window",
    data: {
      shot: "Full body portrait (3:4), classic V spread soft window light",
      subject: {
        ...MEERA_IMAGINEART_SUBJECT,
        pose: "Legs extended straight and spread in V-shape, inner thighs visible full length from hip to ankle, V-angle approximately 60-90 degrees, clean geometric body lines, full inner thigh surface exposed"
      },
      wardrobe: "Artistic nude, platinum navel ring centered, gold anklet visible",
      environment: "Private intimate bedroom, luxurious surfaces, natural morning atmosphere",
      lighting: "Natural soft light from large window, even diffused illumination, realistic indoor daylight, subtle shadows",
      camera: { focal_length: "85mm", aperture: "f/1.4", distance: "3 m", angle: "Elevated frontal", framing: "Classic V spread" },
      color_grade: "Natural warm, realistic tones",
      style: "Classic V spread soft window light, geometric elegance",
      quality: "8K hyper-realistic photography",
      figure_and_form: "Full V-spread with inner thighs visible entire length",
      skin_micro_details: imagineArtSkinDetails,
      fabric_physics: imagineArtFabricPhysics,
      material_properties: imagineArtMaterialProperties
    }
  },
  {
    name: "IA V-Legs: Wide Golden",
    data: {
      shot: "Full body portrait (3:4), wide V in golden afternoon light",
      subject: {
        ...MEERA_IMAGINEART_SUBJECT,
        pose: "Legs spread in very wide V, approaching 120 degrees, maximum inner thigh exposure, extreme spread showing full inner leg surfaces, dramatic intimate geometry"
      },
      wardrobe: "Artistic nude, jewelry catching golden light",
      environment: "Private intimate space, warm afternoon atmosphere",
      lighting: "Warm late afternoon sunlight, golden tones wrapping around golden-brown Indian skin, long soft shadows, romantic realistic warmth",
      camera: { focal_length: "85mm", aperture: "f/1.4", distance: "3 m", angle: "Frontal low", framing: "Wide V golden" },
      color_grade: "Warm golden afternoon",
      style: "Wide V in golden afternoon light, maximum spread",
      quality: "8K golden hour photography",
      figure_and_form: "Maximum V-spread approaching 120 degrees",
      skin_micro_details: imagineArtSkinDetails,
      fabric_physics: imagineArtFabricPhysics,
      material_properties: imagineArtMaterialProperties
    }
  },
  {
    name: "IA Closeup: V Studio",
    data: {
      shot: "Closeup portrait (3:4), extreme detail closeup studio light",
      subject: {
        ...MEERA_IMAGINEART_SUBJECT,
        pose: "Camera positioned close between V-spread legs, extreme closeup of inner thigh area where V converges, intimate detail of inner thigh skin meeting at top"
      },
      wardrobe: "Artistic nude, extreme inner thigh closeup focus",
      environment: "Professional studio setting, clean background",
      lighting: "Professional soft studio lighting, even illumination for maximum detail, clean realistic rendering, beauty photography quality",
      camera: { focal_length: "100mm macro", aperture: "f/2.8", distance: "1 m", angle: "Intimate closeup", framing: "Extreme V detail" },
      color_grade: "Clean studio, natural skin tones",
      style: "Extreme detail closeup studio light, hyper-realistic skin",
      quality: "8K macro studio photography, maximum texture detail",
      figure_and_form: "Extreme closeup V converging point, skin detail",
      skin_micro_details: imagineArtSkinDetails,
      fabric_physics: imagineArtFabricPhysics,
      material_properties: imagineArtMaterialProperties
    }
  },
  {
    name: "IA Bent: Ultimate Realistic",
    data: {
      shot: "Full body portrait (3:4), peak bent knees ultra-realistic masterpiece",
      subject: {
        ...MEERA_IMAGINEART_SUBJECT,
        pose: "Knees bent and spread extra wide, maximum inner thigh exposure, hyper-realistic skin with visible pores, natural skin variations, realistic skin folds at joints"
      },
      wardrobe: "Artistic nude, platinum navel ring, gold anklet visible",
      environment: "Private intimate bedroom, luxurious soft surfaces, natural atmosphere",
      lighting: "Natural soft light from large window, even diffused illumination, realistic indoor daylight, true-to-life skin rendering",
      camera: { focal_length: "85mm", aperture: "f/1.4", distance: "2.5 m", angle: "Elevated frontal", framing: "Peak realistic composition" },
      color_grade: "Natural warm, hyper-realistic tones",
      style: "Peak bent knees ultra-realistic masterpiece, maximum skin detail",
      quality: "8K hyper-realistic photography, visible pores and texture",
      figure_and_form: "Ultimate bent knees display with hyper-realistic skin",
      skin_micro_details: imagineArtSkinDetails,
      fabric_physics: imagineArtFabricPhysics,
      material_properties: imagineArtMaterialProperties
    }
  },
  {
    name: "IA V-Legs: Ultimate Realistic",
    data: {
      shot: "Full body portrait (3:4), peak V closeup ultra-realistic masterpiece",
      subject: {
        ...MEERA_IMAGINEART_SUBJECT,
        pose: "Camera positioned close between V-spread legs, extreme closeup focus on inner thigh area, hyper-realistic golden-brown Indian skin with visible pores, natural tonal variations"
      },
      wardrobe: "Artistic nude, extreme inner thigh focus",
      environment: "Private intimate setting, luxurious atmosphere",
      lighting: "Warm late afternoon sunlight, golden tones wrapping around curves, romantic realistic warmth",
      camera: { focal_length: "100mm macro", aperture: "f/2.8", distance: "1.5 m", angle: "Intimate V closeup", framing: "Peak V realistic" },
      color_grade: "Warm golden, hyper-realistic skin",
      style: "Peak V closeup ultra-realistic masterpiece, maximum detail",
      quality: "8K macro photography with exceptional skin texture",
      figure_and_form: "Ultimate V closeup with hyper-realistic rendering",
      skin_micro_details: imagineArtSkinDetails,
      fabric_physics: imagineArtFabricPhysics,
      material_properties: imagineArtMaterialProperties
    }
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
// MEERA DUSKY COLLECTION - Deep Warm Skin Tone Variants
// Updated: 2026-01-14 - V-Spread, Front View, No Coverage
// ═══════════════════════════════════════════════════════════════════════════════

// Dusky Indian skin tone definition - darker than caramel
const DUSKY_SKIN_DETAILS = "HYPER-REALISTIC deep warm dusky brown Indian skin - darker than typical caramel, rich coffee-with-milk undertones typical of South Indian women, warm bronze highlights where light catches skin, visible pores across all skin surfaces, natural micro-texture grain, subtle hair follicle texture, goosebumps where lighting creates cool contrast, subtle visible veins under thin skin areas, natural skin oil sheen in intimate areas, realistic skin folds at bent joints. NO airbrushing, authentic dusky melanin richness.";

const MEERA_DUSKY_SUBJECT = {
  variant: `STRICTLY LOCKED Dusky Indian woman Meera, South Asian Indian ethnicity, 27 years old, 5'9" height. Deep warm dusky brown complexion - darker than typical caramel, coffee-with-milk undertones. Indian curvaceous hourglass: 37DD full natural bust with heavy teardrop fullness, 27" dramatically cinched waist, 40" wide round Indian hips with full feminine curves. Deep dark brown almond-shaped Indian eyes with thick black lashes, full sensual lips with natural dusky rose tone, high cheekbones. Long flowing jet black Indian hair. Platinum navel ring with diamond, delicate gold anklet on left ankle, small diamond nose stud.`,
  pose: "",
  hair_color: "jet black with natural shine",
  hair_style: "long flowing waves spread across surface",
  skin_finish: "Deep warm dusky brown with bronze highlights",
  hand_and_nail_details: "Graceful natural manicure",
  tattoos: "none",
  piercings: "platinum navel ring with diamond, gold anklet, diamond nose stud",
  body_art: "none",
  nail_art: "Natural nude polish",
  high_heels: "not applicable for reclined poses"
};

export const meeraDuskyConcepts: ArtisticConcept[] = [
  // V-SPREAD LOWKEY DRAMA SERIES
  {
    name: "IA Dusky: Lowkey Drama V-Spread",
    data: {
      shot: "Full body portrait (3:4), V-spread inner thigh lowkey dramatic",
      subject: {
        ...MEERA_DUSKY_SUBJECT,
        pose: "Laying on back, knees bent at 90 degrees fallen completely apart to sides, maximum comfortable spread, V-shaped inner thigh prominence, feet flat or slightly lifted, arms above head, confident sensuous expression"
      },
      wardrobe: "Fine art nude, platinum navel ring and gold anklet only, NO coverage, museum quality artistic",
      environment: "Professional studio with dramatic black setup, deep black seamless velvet background, black fabric platform, subject emerging from darkness",
      lighting: "Low-key dramatic - single concentrated light source, 80% of frame in shadow, strategic illumination on inner thighs, extreme chiaroscuro contrast, noir/Renaissance hybrid aesthetic",
      camera: { focal_length: "85mm f/1.4", aperture: "f/1.4", distance: "2.5 m", angle: "Elevated intimate", framing: "Full body V-spread composition" },
      color_grade: "High contrast noir with warm bronze skin preservation",
      style: "Lowkey dramatic V-spread, inner thighs catching concentrated light",
      quality: "Hasselblad H6D-100c, 8K ultra-high resolution, museum exhibition quality",
      figure_and_form: "V-spread with inner thighs as PRIMARY focal point, 37DD-27-40 visible",
      skin_micro_details: DUSKY_SKIN_DETAILS,
      fabric_physics: imagineArtFabricPhysics,
      material_properties: imagineArtMaterialProperties
    }
  },
  {
    name: "IA Dusky: Front View V-Shape",
    data: {
      shot: "Full body portrait (3:4), front view V-shape inner thigh focused",
      subject: {
        ...MEERA_DUSKY_SUBJECT,
        pose: "Laying on back head away from camera, knees bent and spread apart forming symmetrical V-shape, V opens toward camera, both inner thighs equally visible, direct frontal perspective looking down V-spread"
      },
      wardrobe: "Fine art nude, NO coverage, platinum navel ring visible, completely unclothed artistic form",
      environment: "Dark studio, black seamless background, dark fabric surface, intimate dramatic setting",
      lighting: "Front lit V-shape - light falling on inner thigh surfaces, soft directional light on dusky skin, bronze highlights on lit inner thighs, 60-70% shadow ratio",
      camera: { focal_length: "50-85mm", aperture: "f/1.4", distance: "2.5 m", angle: "Frontal at foot level", framing: "Direct front view V-shape" },
      color_grade: "Dramatic with warm bronze skin",
      style: "Front view V-shape inner thigh symmetrical, camera at feet looking toward head",
      quality: "8K ultra-realistic, medium format quality",
      figure_and_form: "Symmetrical V-shape composition, both inner thighs equal in frame",
      skin_micro_details: DUSKY_SKIN_DETAILS,
      fabric_physics: imagineArtFabricPhysics,
      material_properties: imagineArtMaterialProperties
    }
  },
  {
    name: "IA Dusky: Inner Thigh Focus Detail",
    data: {
      shot: "Closeup portrait (3:4), inner thigh primary subject",
      subject: {
        ...MEERA_DUSKY_SUBJECT,
        pose: "V-spread pose with inner thighs as THE PRIMARY SUBJECT, soft inner thigh flesh filling significant portion of frame, V-shaped space between spread inner thighs centered"
      },
      wardrobe: "Fine art nude, inner thigh focus, no coverage",
      environment: "Black studio, dramatic setting",
      lighting: "Dramatic artistic - inner thighs receive primary illumination, 70-80% shadow with strategic illumination, bronze highlights on dusky skin",
      camera: { focal_length: "85mm", aperture: "f/1.4", distance: "2 m", angle: "Intimate closeup", framing: "Inner thigh primary subject" },
      color_grade: "Warm bronze with deep shadows",
      style: "Inner thigh focused macro artistry, hyper-realistic skin rendering",
      quality: "8K macro detail, exceptional skin texture capture",
      figure_and_form: "Inner thighs as 60%+ visual attention, V-spread centered",
      skin_micro_details: DUSKY_SKIN_DETAILS,
      fabric_physics: imagineArtFabricPhysics,
      material_properties: imagineArtMaterialProperties
    }
  },
  {
    name: "IA Dusky: Artistic No Coverage Classic",
    data: {
      shot: "Full body portrait (3:4), fine art nude V bent legs",
      subject: {
        ...MEERA_DUSKY_SUBJECT,
        pose: "Laying on back, V bent legs with knees spread, classical artistic nude pose, natural feminine form displayed artistically, arms above head or artistically placed"
      },
      wardrobe: "COMPLETELY UNCLOTHED artistic nude, NO lingerie NO underwear NO fabric, platinum navel ring only, museum fine art tradition",
      environment: "Fine art photography studio, deep black seamless velvet, classical artistic atmosphere",
      lighting: "Renaissance/Baroque chiaroscuro technique, single concentrated light, 70-80% shadow, inner thighs and curves catching primary light, bronze highlights on dusky skin",
      camera: { focal_length: "85mm f/1.4", aperture: "f/1.4", distance: "2.5 m", angle: "Classical artistic", framing: "Full body fine art composition" },
      color_grade: "Painterly warm with gallery quality",
      style: "Classical fine art nude, museum-quality artistic photography",
      quality: "8K museum exhibition print quality",
      figure_and_form: "Natural unclothed form, V bent legs with inner thigh prominence",
      skin_micro_details: DUSKY_SKIN_DETAILS,
      fabric_physics: imagineArtFabricPhysics,
      material_properties: imagineArtMaterialProperties
    }
  },
  {
    name: "IA Dusky: Wide Bent Knees Maximum",
    data: {
      shot: "Full body portrait (3:4), maximum inner thigh exposure",
      subject: {
        ...MEERA_DUSKY_SUBJECT,
        pose: "Laying on back, knees bent and fallen completely apart to maximum comfortable width, feet flat on surface, inner thighs fully exposed creating dramatic V-shape, 40\" hips visible framing composition"
      },
      wardrobe: "Fine art nude, no coverage, jewelry only as adornment",
      environment: "Black studio environment, professional setup, dramatic noir potential",
      lighting: "Low-key dramatic, 80% shadow, inner thighs strategically illuminated, mystery and sensuality emphasized",
      camera: { focal_length: "85mm", aperture: "f/1.4", distance: "2.5 m", angle: "Elevated frontal", framing: "Maximum inner thigh display" },
      color_grade: "High contrast with warm dusky skin",
      style: "Maximum bent knees width, peak inner thigh exposure",
      quality: "8K ultra-realistic professional intimate photography",
      figure_and_form: "Peak 37DD-27-40 display, maximum V-spread width",
      skin_micro_details: DUSKY_SKIN_DETAILS,
      fabric_physics: imagineArtFabricPhysics,
      material_properties: imagineArtMaterialProperties
    }
  },
  {
    name: "IA Dusky: Bronze Highlights Dramatic",
    data: {
      shot: "Full body portrait (3:4), bronze highlighted inner thigh art",
      subject: {
        ...MEERA_DUSKY_SUBJECT,
        pose: "V-spread position, deep warm dusky brown complexion with warm bronze highlights where light catches inner thigh skin, relaxed sensuous expression"
      },
      wardrobe: "Artistic nude, platinum navel ring catching light, gold anklet glinting",
      environment: "Dramatic black studio, deep shadows, spotlit artistic atmosphere",
      lighting: "Single concentrated light source creating bronze highlights on dusky inner thigh skin, warm tones, extreme chiaroscuro",
      camera: { focal_length: "85mm", aperture: "f/1.4", distance: "2.5 m", angle: "Intimate artistic", framing: "Bronze highlight composition" },
      color_grade: "Warm bronze and deep shadow contrast",
      style: "Bronze highlighted dusky skin, inner thigh prominence",
      quality: "8K professional fine art photography",
      figure_and_form: "Bronze-lit inner thighs against deep shadow",
      skin_micro_details: DUSKY_SKIN_DETAILS,
      fabric_physics: imagineArtFabricPhysics,
      material_properties: imagineArtMaterialProperties
    }
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
// COMBINED EXPORTS
// ═══════════════════════════════════════════════════════════════════════════════

export const allMeeraImagineArtSensuousConcepts: ArtisticConcept[] = [
  ...plusSensuousConcepts,
  ...helmutNewtonBigNudesConcepts,
  ...innerThighCloseupConcepts,
  ...midnightMuseReclinedConcepts,
  ...layingPosesAllAnglesConcepts,
  ...bentKneesVLegsRealisticConcepts,
  ...meeraDuskyConcepts
];

export {
  MEERA_IMAGINEART_SUBJECT,
  MEERA_DUSKY_SUBJECT,
  imagineArtSkinDetails,
  DUSKY_SKIN_DETAILS,
  imagineArtFabricPhysics,
  imagineArtMaterialProperties
};
