import type { PromptData } from '../types';
import type { ArtisticConcept } from './concepts';

/**
 * MEERA GENERATOR V2 CONCEPTS
 *
 * Three premium collections optimized for high success rates:
 *
 * 1. MASTERCLASS V2 - Classical art references (Ingres, Bouguereau, Cabanel, Newton)
 * 2. INTIMACY MAX V2 - Fine art museum language (Courbet, Klimt, Freud)
 * 3. PATREON EXCLUSIVE V2 - Classical bathing references (Ingres, Degas, Renoir)
 *
 * All concepts auto-fill wardrobe, environment, lighting, pose, and camera settings.
 */

// ═══════════════════════════════════════════════════════════════════════════════
// DEFAULT FINE ART RENDERING SPECIFICATIONS
// ═══════════════════════════════════════════════════════════════════════════════

const defaultSkinMicroDetails = "Authentic natural skin texture with visible pores at appropriate detail, subtle variations in skin tone, natural matte finish with sheen ONLY where wet or oiled. Fine vellus hair catching sidelight naturally. NO plastic AI appearance - real human skin quality essential.";
const defaultFabricPhysics = "Fabric drapes with realistic weight and movement, creating genuine creases and folds following the subject's sculptural form. Every thread and weave visible, authentic physics with gravity.";
const defaultMaterialProperties = "Materials have authentic texture and light response - silk catches light with liquid shimmer, water droplets with individual refraction, natural environmental reflections accurate.";

// ═══════════════════════════════════════════════════════════════════════════════
// MEERA V2 - CLASSICAL FINE ART MUSE (37DD, 27, 40)
// ═══════════════════════════════════════════════════════════════════════════════

const MEERA_V2_SUBJECT = {
  variant: `Stunning Indian fine art model MEERA, age 27, height 5'8", sculpted hourglass figure with classical proportions: Full natural form with elegant teardrop shape (37DD), dramatically cinched waist creating hourglass definition (27"), wide sculptural hips completing classical proportions (40"), sun-kissed bronze complexion with warm golden undertones, natural matte skin with authentic texture, striking dark eyes with natural warmth and intelligence, full lips in natural expression, high cheekbones catching environmental light, expression of quiet confidence and artistic awareness`,
  pose: "",
  hair_color: "jet black",
  hair_style: "long flowing waves with natural volume catching light with individual strand definition",
  skin_finish: "Natural matte finish with authentic texture and visible pores",
  hand_and_nail_details: "Elegant natural manicure, graceful anatomically correct hand positioning",
  tattoos: "none",
  piercings: "delicate gold ear studs",
  body_art: "none",
  nail_art: "Natural nude polish",
  high_heels: "as appropriate for setting"
};

// ═══════════════════════════════════════════════════════════════════════════════
// MASTERCLASS V2 COLLECTION - Classical Art References
// Progressive Intimacy Levels 1-4
// ═══════════════════════════════════════════════════════════════════════════════

export const masterclassV2Concepts: ArtisticConcept[] = [
  // ─────────────────────────────────────────────────────────────────────────────
  // LEVEL 1 - CLASSICAL DRAPED
  // ─────────────────────────────────────────────────────────────────────────────
  {
    name: "MC v2: Ingres Silk Drape - Atelier",
    data: {
      shot: "Full body portrait (3:4), museum fine art photography",
      subject: {
        ...MEERA_V2_SUBJECT,
        pose: "Reclining Venus inspired by Titian: Lying with elegant S-curve, one arm behind head, classical fine art pose, museum-worthy composition"
      },
      wardrobe: "Classical draped ivory silk in Ingres tradition: Flowing silk in sculptural folds, revealing and concealing in museum fine art manner, fabric catching natural light",
      environment: "19th century Parisian artist's atelier: North-facing window with perfect diffused light, antique furnishings, velvet drapery, oil paintings on easels, bohemian artist studio",
      lighting: "Soft diffused window light creating dimensional modeling, warm color temperature enhancing skin tones, natural shadows creating dimension, no artificial studio lighting",
      camera: { focal_length: "80mm", aperture: "f/2.0", distance: "3 m", angle: "Eye level classical", framing: "Full body with elegant negative space" },
      color_grade: "Warm Golden, painterly rich tones",
      style: "Museum fine art photography in classical tradition, Ingres reference",
      quality: "Hasselblad medium format, 8K museum print quality, shallow depth with atmospheric bokeh",
      figure_and_form: "Complete sculptural form in classical tradition, natural feminine curves celebrated",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Silk draping naturally in sculptural folds, catching light with luminous quality",
      material_properties: "Ivory silk with natural sheen, classical painting atmosphere"
    }
  },
  {
    name: "MC v2: Botticelli Venus - Golden Hour",
    data: {
      shot: "Full body portrait (3:4), goddess iconography fine art",
      subject: {
        ...MEERA_V2_SUBJECT,
        pose: "Standing contrapposto inspired by Ingres La Source: Weight on one leg creating elegant S-curve, arms in graceful classical gesture, natural standing beauty"
      },
      wardrobe: "Venus aesthetic with flowing dark hair: Long waves cascading as nature's veil, goddess iconography, strands catching golden light in organic patterns",
      environment: "Bedroom at golden hour: Warm sunlight streaming through sheer curtains, cream silk linens, soft shadows, intimate atmosphere",
      lighting: "Golden hour streaming rays at low angle, warm golden skin tones, rim lighting on curves, no artificial sources",
      camera: { focal_length: "85mm", aperture: "f/2.0", distance: "3.5 m", angle: "Slightly low angle", framing: "Full body goddess composition" },
      color_grade: "Golden Hour Warmth, amber and champagne",
      style: "Gallery exhibition intimate portraiture, Botticelli Venus reference",
      quality: "Hasselblad medium format, 8K, natural golden hour mastery",
      figure_and_form: "Elegant standing figure with hourglass silhouette, museum-worthy classical beauty",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Hair flowing naturally with strand separation, catching golden light",
      material_properties: "Natural hair as coverage, golden light atmosphere"
    }
  },
  {
    name: "MC v2: Degas Bather - Intimate",
    data: {
      shot: "Medium portrait (3:4), domestic fine art scene",
      subject: {
        ...MEERA_V2_SUBJECT,
        pose: "Seated bather in Degas tradition: Seated on low surface with torso twisted showing elegant back, intimate bathing moment, natural relaxed posture, looking over shoulder"
      },
      wardrobe: "Bather with towel in Degas manner: Soft white towel draped casually at hip or shoulders, post-bathing naturalness, intimate domestic fine art scene",
      environment: "Classical marble bath: White Carrara marble with grey veining, steam diffusing window light, brass fixtures, candles providing warm glow",
      lighting: "Candlelight intimate glow creating warm amber tones (2200K), romantic flickering on skin",
      camera: { focal_length: "85mm", aperture: "f/1.8", distance: "2.5 m", angle: "Three-quarter back view", framing: "Medium shot showing elegant back" },
      color_grade: "Warm Candlelit, amber and bronze",
      style: "Documentary fine art celebration of form, Degas bather reference",
      quality: "Hasselblad medium format, 8K intimate atmosphere capture",
      figure_and_form: "Beautiful back contours and spine, natural seated composition",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Towel draping naturally with realistic weight",
      material_properties: "White cotton towel, marble surfaces, brass fixtures"
    }
  },
  {
    name: "MC v2: Renoir Warmth - Impressionist",
    data: {
      shot: "Full body portrait (3:4), impressionist fine art",
      subject: {
        ...MEERA_V2_SUBJECT,
        pose: "Renoir seated bather: Natural seated pose with soft lighting defining curves, warm impressionist aesthetic"
      },
      wardrobe: "Renoir bather aesthetic: Soft diffused light on luminous bronze skin, impressionist color warmth, natural bathing scene beauty",
      environment: "Fireplace sanctuary: Dancing orange firelight on plush fur rug, warm shadows, primal intimate atmosphere, cozy winter evening",
      lighting: "Fireplace warm chiaroscuro: Fire as primary light source creating orange-golden illumination, dramatic moving light quality",
      camera: { focal_length: "85mm", aperture: "f/2.0", distance: "3 m", angle: "Low intimate angle", framing: "Full body with fireplace warmth" },
      color_grade: "Warm Impressionist, orange and bronze",
      style: "Art historical reference reimagined, Renoir warmth",
      quality: "Hasselblad medium format, 8K, impressionist color mastery",
      figure_and_form: "Natural feminine curves, warm impressionist celebration",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Plush fur texture realistic beneath form",
      material_properties: "Faux fur rug, dancing firelight, warm stone"
    }
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // LEVEL 2 - ARTISTIC SHEER
  // ─────────────────────────────────────────────────────────────────────────────
  {
    name: "MC v2: Odalisque Sheer - Venetian",
    data: {
      shot: "Full body portrait (3:4), orientalist fine art",
      subject: {
        ...MEERA_V2_SUBJECT,
        pose: "Ingres Grande Odalisque: Reclining back view with elegant arch, looking over shoulder, elongated spine line"
      },
      wardrobe: "Contemporary Odalisque in Ingres tradition: Gossamer sheer fabric in warm tones, translucent quality, orientalist fine art aesthetic",
      environment: "Venetian palazzo interior: Warm terracotta and gold, ornate gilded mirror, damask fabrics, Renaissance afternoon light through tall windows",
      lighting: "Soft afternoon light through tall windows, warm reflections, Venetian atmosphere",
      camera: { focal_length: "85mm", aperture: "f/2.0", distance: "3.5 m", angle: "Three-quarter back elevated", framing: "Full body odalisque composition" },
      color_grade: "Warm Venetian, terracotta and gold",
      style: "Private collection classical nude masterwork, Ingres Odalisque reference",
      quality: "Hasselblad medium format, 8K, Renaissance luxury",
      figure_and_form: "Elegant back contours, elongated sculptural form",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Gossamer fabric with translucent draping",
      material_properties: "Sheer warm-toned fabric, gilded mirror, damask"
    }
  },
  {
    name: "MC v2: Cabanel Venus - Ethereal",
    data: {
      shot: "Full body portrait (3:4), romantic fine art",
      subject: {
        ...MEERA_V2_SUBJECT,
        pose: "Birth of Venus pose: Reclining among flowing fabric, arms gracefully framing form, romantic ethereal beauty"
      },
      wardrobe: "Birth of Venus aesthetic: Ethereal foam and mist elements, classical goddess emerging, romantic fine art beauty",
      environment: "Victorian glass conservatory: Morning sunlight through antique glass panels, tropical plants, prismatic light effects, botanical sanctuary",
      lighting: "Morning sunlight through aged glass creating prismatic effects, ethereal atmosphere",
      camera: { focal_length: "85mm", aperture: "f/1.8", distance: "3 m", angle: "Low angle romantic", framing: "Full body ethereal composition" },
      color_grade: "Ethereal Soft, prismatic pastels",
      style: "Contemporary interpretation of classical beauty, Cabanel reference",
      quality: "Hasselblad medium format, 8K, ethereal light capture",
      figure_and_form: "Refined sensual presence, flowing fabric movement",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Flowing fabric with ethereal movement",
      material_properties: "Sheer fabric, glass panels, tropical foliage"
    }
  },
  {
    name: "MC v2: Courbet Naturalist - Studio",
    data: {
      shot: "Full body portrait (3:4), bold artistic statement",
      subject: {
        ...MEERA_V2_SUBJECT,
        pose: "Lucian Freud floor study: Natural body on surface, authentic limb arrangement, bold contemporary approach"
      },
      wardrobe: "Naturalist study in Courbet tradition: Unidealized celebration of authentic form, bold artistic statement, documentary fine art",
      environment: "Minimalist gallery space: Clean white walls, natural skylight diffusion, museum-quality lighting, contemporary art context",
      lighting: "Natural skylight diffusion from above, even museum lighting, contemporary gallery atmosphere",
      camera: { focal_length: "50mm", aperture: "f/4.0", distance: "4 m", angle: "Slightly elevated documentary", framing: "Full body with gallery negative space" },
      color_grade: "Neutral Gallery, clean whites",
      style: "Documentary fine art celebration of form, Courbet naturalism",
      quality: "Hasselblad medium format, 8K, museum exhibition quality",
      figure_and_form: "Authentic unidealized form, bold honest observation",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Minimal fabric, authentic body on surface",
      material_properties: "Gallery floor, white walls, natural light"
    }
  },
  {
    name: "MC v2: Bouguereau Nymph - Classical",
    data: {
      shot: "Full body portrait (3:4), academic fine art",
      subject: {
        ...MEERA_V2_SUBJECT,
        pose: "Classical Venus Pudica: Standing with natural modest gesture, one hand near chest, elegant S-curve"
      },
      wardrobe: "Nymph aesthetic in Bouguereau style: Classical beauty with idealized form, soft diffused lighting, academic fine art tradition",
      environment: "Private boudoir: Deep velvet furnishings in blush tones, gilded mirror, soft natural light through sheers, romantic sanctuary",
      lighting: "Soft diffused natural light through sheer curtains, romantic glow, academic painting lighting",
      camera: { focal_length: "85mm", aperture: "f/2.0", distance: "3.5 m", angle: "Eye level classical", framing: "Full body academic composition" },
      color_grade: "Soft Classical, blush and cream",
      style: "Gallery exhibition intimate portraiture, Bouguereau reference",
      quality: "Hasselblad medium format, 8K, academic fine art quality",
      figure_and_form: "Natural modest gesture, elegant standing figure",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Minimal sheer elements with classical draping",
      material_properties: "Velvet furnishings, gilded mirror, sheer curtains"
    }
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // LEVEL 3 - ARTISTIC MINIMAL
  // ─────────────────────────────────────────────────────────────────────────────
  {
    name: "MC v2: Klimt Gold - Art Nouveau",
    data: {
      shot: "Full body portrait (3:4), decorative arts approach",
      subject: {
        ...MEERA_V2_SUBJECT,
        pose: "Renaissance contrapposto: Weight shifted creating natural curves, sculptural approach to standing figure"
      },
      wardrobe: "Klimt-inspired gold accents: Strategic gold leaf or jewelry elements catching light, art nouveau aesthetic, decorative arts approach",
      environment: "Venetian palazzo interior: Warm terracotta and gold, ornate gilded elements, rich atmosphere",
      lighting: "Warm golden light emphasizing gold accents, art nouveau atmosphere",
      camera: { focal_length: "85mm", aperture: "f/2.0", distance: "3 m", angle: "Frontal art nouveau", framing: "Full body with gold accents" },
      color_grade: "Rich Gold, Klimt palette",
      style: "Masterwork-inspired artistic celebration, Klimt reference",
      quality: "Hasselblad medium format, 8K, decorative arts quality",
      figure_and_form: "Body as living sculpture, sculptural standing approach",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Gold accents catching light, minimal fabric",
      material_properties: "Gold leaf, jewelry elements, rich textiles"
    }
  },
  {
    name: "MC v2: Modigliani Form - Modernist",
    data: {
      shot: "Full body portrait (3:4), modernist nude tradition",
      subject: {
        ...MEERA_V2_SUBJECT,
        pose: "Sleeping Venus from Giorgione: Peaceful repose with eyes closed, serene classical beauty, one arm above head"
      },
      wardrobe: "Modigliani study: Elongated elegant form, warm earth tones, modernist nude tradition, sculptural simplicity",
      environment: "Bedroom at golden hour: Cream silk linens, soft shadows, warm intimate atmosphere",
      lighting: "Dawn rose-gold rays through sheer curtains, ethereal atmosphere",
      camera: { focal_length: "85mm", aperture: "f/1.8", distance: "3 m", angle: "Low intimate angle", framing: "Full body elongated composition" },
      color_grade: "Warm Earth, Modigliani tones",
      style: "Art historical reference reimagined, Modigliani modernism",
      quality: "Hasselblad medium format, 8K, modernist simplicity",
      figure_and_form: "Serene peaceful expression, reclining classical pose",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Silk linens with natural draping",
      material_properties: "Cream silk, warm wood, soft textiles"
    }
  },
  {
    name: "MC v2: Schiele Expressive - Bold",
    data: {
      shot: "Full body portrait (3:4), unflinching artistic observation",
      subject: {
        ...MEERA_V2_SUBJECT,
        pose: "Mirror study: Form and reflection creating depth, self-regard moment, vanitas theme"
      },
      wardrobe: "Expressionist study in Schiele manner: Bold compositional angles, authentic body language, unflinching artistic observation",
      environment: "Private boudoir: Gilded mirror, velvet furnishings, natural window light",
      lighting: "Dramatic window light creating bold shadows, expressive contrast",
      camera: { focal_length: "50mm", aperture: "f/2.8", distance: "2.5 m", angle: "Dynamic angular", framing: "Mirror reflection composition" },
      color_grade: "Bold Contrast, Schiele palette",
      style: "Documentary fine art celebration, Schiele expressionism",
      quality: "Hasselblad medium format, 8K, expressive bold capture",
      figure_and_form: "Reflection creating depth, form and mirror interplay",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Minimal fabric, authentic body language",
      material_properties: "Gilded mirror, velvet, natural light"
    }
  },
  {
    name: "MC v2: Freud Naturalist - Contemporary",
    data: {
      shot: "Full body portrait (3:4), honest representation",
      subject: {
        ...MEERA_V2_SUBJECT,
        pose: "Naturalist floor study in Lucian Freud tradition: Natural body on plush surface, limbs arranged in authentic compositional balance, honest representation"
      },
      wardrobe: "Lucian Freud naturalist study: Honest representation on plush surface, impasto-like skin rendering, contemporary fine art boldness",
      environment: "Fireplace sanctuary: Plush fur rug before natural stone fireplace, dancing flames, warm shadows",
      lighting: "Fireplace warm chiaroscuro with dancing flames, primal intimate atmosphere",
      camera: { focal_length: "50mm", aperture: "f/2.8", distance: "3 m", angle: "Elevated documentary", framing: "Full body floor composition" },
      color_grade: "Warm Naturalist, firelight tones",
      style: "Contemporary interpretation of classical beauty, Freud reference",
      quality: "Hasselblad medium format, 8K, naturalist observation quality",
      figure_and_form: "Naturalist floor study, honest artistic observation",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Plush fur realistic beneath form",
      material_properties: "Faux fur, natural stone, firelight"
    }
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // LEVEL 4 - MAXIMUM ARTISTIC
  // ─────────────────────────────────────────────────────────────────────────────
  {
    name: "MC v2: Newton Power - Editorial",
    data: {
      shot: "Full body portrait (3:4), fashion meets fine art",
      subject: {
        ...MEERA_V2_SUBJECT,
        pose: "Newton power pose: Strong confident standing, dramatic lighting, fashion meets fine art presence"
      },
      wardrobe: "Helmut Newton Big Nudes aesthetic: Powerful feminine presence, dramatic lighting, fashion photography meets fine art",
      environment: "Minimalist gallery space: Clean white walls, natural skylight, museum-quality context",
      lighting: "Dramatic hard light creating bold shadows, Newton-style power lighting",
      camera: { focal_length: "35mm", aperture: "f/4.0", distance: "4 m", angle: "Low angle powerful", framing: "Full body power composition" },
      color_grade: "High Contrast B&W, Newton style",
      style: "Gallery exhibition, Helmut Newton Big Nudes reference",
      quality: "Hasselblad medium format, 8K, high fashion quality",
      figure_and_form: "Confident powerful presence, fashion editorial approach",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Minimal, body as primary subject",
      material_properties: "Gallery walls, dramatic light and shadow"
    }
  },
  {
    name: "MC v2: Mapplethorpe - Sculptural",
    data: {
      shot: "Full body portrait (3:4), body as living sculpture",
      subject: {
        ...MEERA_V2_SUBJECT,
        pose: "Window silhouette: Backlit figure creating rim lighting on curves, dramatic natural light composition"
      },
      wardrobe: "Mapplethorpe sculptural approach: Body as living sculpture, dramatic chiaroscuro, gallery-worthy composition",
      environment: "Parisian atelier with large window: Perfect backlight opportunity, artistic studio atmosphere",
      lighting: "Strong backlight creating rim lighting, sculptural shadows defining form",
      camera: { focal_length: "50mm", aperture: "f/4.0", distance: "4 m", angle: "Profile silhouette", framing: "Full body sculptural composition" },
      color_grade: "Dramatic B&W, Mapplethorpe contrast",
      style: "Masterwork-inspired artistic celebration, Mapplethorpe reference",
      quality: "Hasselblad medium format, 8K, sculptural quality",
      figure_and_form: "Dramatic rim lighting, body as sculpture",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "None, pure sculptural form",
      material_properties: "Natural backlight, silhouette definition"
    }
  },
  {
    name: "MC v2: Avedon Minimal - Truth",
    data: {
      shot: "Full body portrait (3:4), stripped-down artistic truth",
      subject: {
        ...MEERA_V2_SUBJECT,
        pose: "Renaissance contrapposto: Classical weight shift, elegant standing figure"
      },
      wardrobe: "Avedon minimal aesthetic: Clean composition, authentic presence, stripped-down artistic truth",
      environment: "Minimalist gallery: Pure white walls, even diffused lighting, no distractions",
      lighting: "Even soft diffused studio light, no harsh shadows, clean truth",
      camera: { focal_length: "85mm", aperture: "f/5.6", distance: "4 m", angle: "Eye level direct", framing: "Full body clean minimal" },
      color_grade: "Clean Minimal, subtle warm skin",
      style: "Documentary fine art, Avedon minimalism",
      quality: "Hasselblad medium format, 8K, pure minimal quality",
      figure_and_form: "Authentic presence, sculptural standing approach",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "None, pure form",
      material_properties: "White gallery, even light"
    }
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
// INTIMACY MAX V2 COLLECTION - Fine Art Museum Language
// Classical References: Ingres, Courbet, Degas, Bouguereau
// ═══════════════════════════════════════════════════════════════════════════════

export const intimacyMaxV2Concepts: ArtisticConcept[] = [
  {
    name: "Intimacy v2: Classical Draped Silk - Reclining Venus",
    data: {
      shot: "Full body portrait (3:4), museum fine art photography",
      subject: {
        ...MEERA_V2_SUBJECT,
        pose: "Reclining Venus inspired by Titian and Giorgione: Lying on side with elegant S-curve, one arm supporting head, classical fine art pose celebrating feminine form"
      },
      wardrobe: "Classical draped ivory silk in Ingres' La Source tradition: Single flowing silk fabric draped across form in sculptural folds, revealing and concealing in classical tradition, fabric catching natural light with luminous quality",
      environment: "19th century Parisian artist's atelier: North-facing window providing perfect diffused light, antique furnishings with rich velvet, classical props and drapery, oil paintings on easels",
      lighting: "Natural environmental light creating dimensional modeling, soft shadows defining form in classical painting tradition, warm color temperature enhancing skin tones",
      camera: { focal_length: "80mm", aperture: "f/2.0", distance: "3 m", angle: "Classical fine art", framing: "Full body museum composition" },
      color_grade: "Warm Classical, rich amber",
      style: "Museum fine art photography in the tradition of classical masters",
      quality: "Hasselblad medium format, 8K museum print quality",
      figure_and_form: "Complete sculptural form in classical tradition, natural feminine curves celebrated",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Silk flowing in sculptural folds with luminous quality",
      material_properties: "Ivory silk, antique velvet, artist studio atmosphere"
    }
  },
  {
    name: "Intimacy v2: Venus Emergence - Hair Veil",
    data: {
      shot: "Full body portrait (3:4), goddess iconography fine art",
      subject: {
        ...MEERA_V2_SUBJECT,
        pose: "La Source standing pose: Weight on one leg creating elegant contrapposto, arms in graceful classical gesture, natural standing beauty"
      },
      wardrobe: "Venus emerging aesthetic inspired by Botticelli: Long flowing hair as nature's primary coverage, strands catching golden light, cascading in organic waves, goddess iconography in contemporary form",
      environment: "Venetian palazzo interior: Warm terracotta and gold tones, ornate gilded mirror reflecting scene, rich damask fabrics, afternoon light through tall windows",
      lighting: "Golden hour streaming rays through tall windows, warm golden skin tones, rim lighting on curves",
      camera: { focal_length: "85mm", aperture: "f/2.0", distance: "3.5 m", angle: "Slightly low classical", framing: "Full body goddess composition" },
      color_grade: "Venetian Gold, terracotta warmth",
      style: "Gallery exhibition intimate portraiture study, Botticelli reference",
      quality: "Hasselblad medium format, 8K Renaissance luxury",
      figure_and_form: "Dramatic hourglass silhouette, elegant standing figure",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Hair cascading with individual strand definition",
      material_properties: "Natural hair, gilded mirror, damask fabrics"
    }
  },
  {
    name: "Intimacy v2: Bathers Study - Towel Hip",
    data: {
      shot: "Full body portrait (3:4), impressionist bathing scene",
      subject: {
        ...MEERA_V2_SUBJECT,
        pose: "Seated bather in Degas tradition: Seated on low surface, torso twisted showing elegant back, intimate bathing moment, domestic fine art scene"
      },
      wardrobe: "Study for The Bathers in Renoir tradition: Post-bathing naturalness with water droplets catching light, skin luminous from bath, towel draped casually at hip",
      environment: "Classical marble bath scene: White Carrara marble surfaces, steam diffusing natural light, brass fixtures with patina, candles providing warm glow",
      lighting: "Candlelight intimate glow with warm amber tones, steam diffusing window light, romantic bathing atmosphere",
      camera: { focal_length: "85mm", aperture: "f/1.8", distance: "2.5 m", angle: "Three-quarter intimate", framing: "Medium shot bathing scene" },
      color_grade: "Warm Impressionist, amber steam",
      style: "Private collection classical nude in contemporary interpretation",
      quality: "Hasselblad medium format, 8K, impressionist color mastery",
      figure_and_form: "Beautiful back contours and spine, natural seated composition",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Towel draping casually at hip with natural weight",
      material_properties: "White towel, Carrara marble, brass fixtures"
    }
  },
  {
    name: "Intimacy v2: Odalisque Sheer - Grande",
    data: {
      shot: "Full body portrait (3:4), orientalist fine art",
      subject: {
        ...MEERA_V2_SUBJECT,
        pose: "Reclining back view inspired by Ingres' Grande Odalisque: Lying prone with elegant back arch, looking over shoulder, elongated spine creating beautiful line"
      },
      wardrobe: "Contemporary Odalisque inspired by Ingres: Gossamer sheer fabric in warm tones, translucent quality revealing form beneath, orientalist fine art aesthetic updated for contemporary gallery",
      environment: "Intimate private boudoir: Soft natural light through sheer curtains, plush cream textiles, full-length gilded mirror, romantic feminine sanctuary",
      lighting: "Soft diffused window light: Large frosted window providing even wrap-around illumination, luminous skin quality",
      camera: { focal_length: "85mm", aperture: "f/2.0", distance: "3.5 m", angle: "Three-quarter back elevated", framing: "Full body odalisque composition" },
      color_grade: "Warm Intimate, cream and gold",
      style: "Art historical reference reimagined for modern sensibility",
      quality: "Hasselblad medium format, 8K, classical fine art quality",
      figure_and_form: "Elegant back contours, elongated sculptural form",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Gossamer fabric with translucent reveal",
      material_properties: "Sheer warm fabric, cream textiles, gilded mirror"
    }
  },
  {
    name: "Intimacy v2: Courbet Origin - Naturalist",
    data: {
      shot: "Full body portrait (3:4), bold naturalist statement",
      subject: {
        ...MEERA_V2_SUBJECT,
        pose: "Naturalist floor study in Lucian Freud tradition: Natural body on floor surface, honest representation without idealization, bold contemporary fine art"
      },
      wardrobe: "Artistic study referencing Courbet's naturalism: Unidealized celebration of authentic feminine form, natural body in repose, documentary fine art approach",
      environment: "Sanctuary before crackling fireplace: Dancing orange firelight as primary illumination, plush rug, warm shadows, primal intimate atmosphere",
      lighting: "Fireplace warm chiaroscuro: Fire as primary light source creating orange-golden illumination, dramatic moving light quality",
      camera: { focal_length: "50mm", aperture: "f/2.8", distance: "3 m", angle: "Elevated documentary", framing: "Full body naturalist floor study" },
      color_grade: "Warm Primal, firelight orange",
      style: "Masterwork-inspired artistic celebration of form",
      quality: "Hasselblad medium format, 8K, bold contemporary quality",
      figure_and_form: "Authentic unidealized form, naturalist floor composition",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Plush rug beneath form",
      material_properties: "Faux fur rug, natural stone fireplace"
    }
  },
  {
    name: "Intimacy v2: Golden Hour Study - Light Art",
    data: {
      shot: "Full body portrait (3:4), light as composition",
      subject: {
        ...MEERA_V2_SUBJECT,
        pose: "Sleeping Venus pose from Giorgione: Lying in peaceful repose, eyes closed, one arm above head, celebrating form in rest"
      },
      wardrobe: "Golden hour light study: Light itself as primary compositional element, dramatic chiaroscuro on bronze skin, shadows and highlights defining form",
      environment: "Bedroom bathed in golden hour: Warm sunlight streaming at low angle, cream silk linens catching light, soft shadows, intimate private space",
      lighting: "Golden hour streaming rays: Late afternoon sunlight at low angle, warm golden skin tones, dramatic rim lighting on curves",
      camera: { focal_length: "85mm", aperture: "f/1.8", distance: "3 m", angle: "Low angle golden", framing: "Full body light study composition" },
      color_grade: "Rich Golden Hour, amber warmth",
      style: "Documentary fine art nude study",
      quality: "Hasselblad medium format, 8K, golden hour mastery",
      figure_and_form: "Serene peaceful expression, form defined by light",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Silk linens catching golden light",
      material_properties: "Cream silk, golden light, soft shadows"
    }
  },
  {
    name: "Intimacy v2: Morning Bedsheet - Intimate",
    data: {
      shot: "Full body portrait (3:4), private bedroom moment",
      subject: {
        ...MEERA_V2_SUBJECT,
        pose: "Cabanel Born Venus pose: Reclining among waves or flowing fabric, arms gracefully framing form, ethereal classical beauty"
      },
      wardrobe: "Intimate morning study with cream silk sheet: Luxurious fabric pooled naturally, revealing form through artful arrangement, private bedroom moment, natural domestic intimacy",
      environment: "Bedroom at golden hour: Soft rose-gold morning light streaming through sheer curtains, cream silk sheets, intimate warm atmosphere",
      lighting: "Dawn rose-gold rays: Early morning light with pink and gold tones through sheer curtains, ethereal atmosphere",
      camera: { focal_length: "85mm", aperture: "f/1.8", distance: "2.5 m", angle: "Low intimate angle", framing: "Full body intimate bedroom" },
      color_grade: "Rose Gold Dawn, ethereal pink",
      style: "Private collection intimate masterwork",
      quality: "Hasselblad medium format, 8K, intimate domestic quality",
      figure_and_form: "Refined sensual presence, flowing fabric movement",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Silk sheet pooled naturally with artful arrangement",
      material_properties: "Cream silk, rose-gold light, sheer curtains"
    }
  },
  {
    name: "Intimacy v2: Mirror Reflection - Vanitas",
    data: {
      shot: "Medium portrait (3:4), form and reflection",
      subject: {
        ...MEERA_V2_SUBJECT,
        pose: "Renaissance contrapposto standing pose: Weight shifted creating natural S-curve through body, sculptural approach"
      },
      wardrobe: "Double exposure mirror study: Form and reflection creating compositional depth, natural self-regard moment, classical vanitas theme, intimate personal ritual",
      environment: "Ornate vanity mirror boudoir: Large gilded baroque frame mirror reflecting scene, crystal perfume bottles catching light, velvet-upholstered stool",
      lighting: "Soft natural window light diffusing through sheers, mirror reflections creating depth",
      camera: { focal_length: "50mm", aperture: "f/2.0", distance: "2.5 m", angle: "Three-quarter capturing reflection", framing: "Medium shot with mirror reflection" },
      color_grade: "Soft Boudoir, gilded warmth",
      style: "Gallery exhibition intimate portraiture study",
      quality: "Hasselblad medium format, 8K, classical vanitas quality",
      figure_and_form: "Form and reflection, compositional depth",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Minimal, mirror as primary element",
      material_properties: "Gilded mirror, crystal bottles, velvet"
    }
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
// PATREON EXCLUSIVE V2 COLLECTION - Classical Bathing References
// Natural Light Only (No Ring Light) - Ingres, Degas, Renoir
// ═══════════════════════════════════════════════════════════════════════════════

export const patreonExclusiveV2Concepts: ArtisticConcept[] = [
  {
    name: "Patreon v2: Turkish Bath - Marble Sanctuary",
    data: {
      shot: "Full body portrait (3:4), classical bathing fine art",
      subject: {
        ...MEERA_V2_SUBJECT,
        pose: "Classical tub recline inspired by Bonnard: Reclining in tub with head resting on edge, one arm draped over marble rim, water at mid-torso, peaceful repose"
      },
      wardrobe: "Study for The Turkish Bath in Ingres tradition: Classical bathing scene with skin glistening from warm water, natural post-bath luminosity, authentic bathing ritual documentation",
      environment: "Luxurious marble bath sanctuary: White Carrara marble with grey veining, deep soaking tub with rose-petal water, steam rising and diffusing natural window light, white pillar candles on marble ledge, brass fixtures with aged patina. No artificial lighting.",
      lighting: "Soft diffused window light: Large frosted window providing even wrap-around illumination with candlelight intimate glow, luminous skin quality. NO RING LIGHT.",
      camera: { focal_length: "85mm", aperture: "f/1.4", distance: "2.5 m", angle: "Slightly elevated intimate", framing: "Full body bathing composition" },
      color_grade: "Warm Amber, champagne with marble",
      style: "Museum fine art photography, Ingres Turkish Bath reference",
      quality: "Hasselblad X2D 100C medium format, 8K museum exhibition quality, Kodak Portra color science",
      figure_and_form: "Sculptural hourglass revealed through water and steam",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Water droplets beading naturally, steam diffusing",
      material_properties: "Carrara marble, rose-petal water, brass fixtures, candlelight"
    }
  },
  {
    name: "Patreon v2: Degas Towel - Vintage Clawfoot",
    data: {
      shot: "Full body portrait (3:4), French impressionist bathing",
      subject: {
        ...MEERA_V2_SUBJECT,
        pose: "Standing contrapposto before mirror: Classical weight-shift creating elegant S-curve, arms in graceful gesture, Ingres La Source influence"
      },
      wardrobe: "Bather with draped towel in Degas tradition: Soft white towel draped casually at hip or shoulders, post-bathing naturalness, intimate domestic moment, classical French impressionist aesthetic",
      environment: "Elegant vintage clawfoot tub: Pristine white porcelain on ornate brass feet, cloud-like bubble bath foam, original hexagonal tile floor, tall sash window with wavy glass filtering soft morning light, beadboard wainscoting. No artificial lighting.",
      lighting: "Golden hour streaming rays: Late afternoon sunlight at low angle through window, warm golden skin tones, rim lighting on curves. NO RING LIGHT.",
      camera: { focal_length: "85mm", aperture: "f/1.4", distance: "3 m", angle: "Three-quarter classical", framing: "Full body with vintage bathroom" },
      color_grade: "Soft Morning, golden cream",
      style: "Gallery exhibition quality, Degas bather reference",
      quality: "Hasselblad X2D 100C, 8K, French impressionist quality",
      figure_and_form: "Elegant standing figure, classical bathing beauty",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Towel draping naturally with casual elegance",
      material_properties: "White porcelain, brass feet, hexagonal tile, wavy glass"
    }
  },
  {
    name: "Patreon v2: Venus Droplets - Water Pearls",
    data: {
      shot: "Full body portrait (3:4), goddess emerging fine art",
      subject: {
        ...MEERA_V2_SUBJECT,
        pose: "Emerging from bath at tub edge: Rising with water cascading from curves, one foot still in water, arms reaching to gather wet hair, lifting chest"
      },
      wardrobe: "Venus emerging from water: Skin decorated with natural water droplets catching light like scattered pearls, fresh from bath radiance, goddess iconography in contemporary form",
      environment: "Victorian glass conservatory bath: Copper soaking tub among floor-to-ceiling antique glass panels with iron framework, lush tropical plants, morning sunlight through aged glass creating prismatic effects. Only natural sunlight.",
      lighting: "Overcast soft daylight: Diffused daylight through glass panels, even soft illumination, prismatic effects, luminous skin quality. NO RING LIGHT.",
      camera: { focal_length: "85mm", aperture: "f/1.4", distance: "3 m", angle: "Low powerful emergence", framing: "Full body with conservatory setting" },
      color_grade: "Prismatic Morning, soft diffused",
      style: "Private collection classical nude masterwork",
      quality: "Hasselblad X2D 100C, 8K, goddess emergence quality",
      figure_and_form: "Powerful hourglass emergence, water as jewels",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Water droplets with individual light refraction",
      material_properties: "Copper tub, antique glass, tropical foliage"
    }
  },
  {
    name: "Patreon v2: Renoir Natural - Impressionist",
    data: {
      shot: "Full body portrait (3:4), impressionist warmth",
      subject: {
        ...MEERA_V2_SUBJECT,
        pose: "Seated bather in Degas tradition: Seated on low surface with torso twisted showing elegant back, intimate bathing moment, looking over shoulder"
      },
      wardrobe: "Natural bather in Renoir tradition: Soft diffused light on luminous skin, authentic feminine form celebrated, impressionist color warmth, relaxed bathing scene",
      environment: "Dawn bedroom with silk linens: Soft rose-gold morning light streaming through sheer curtains, cream silk sheets catching early rays, polished dark walnut floor. No artificial lighting.",
      lighting: "Dawn rose-gold rays: Early morning light with pink and gold tones through sheer curtains, ethereal warm atmosphere. NO RING LIGHT.",
      camera: { focal_length: "85mm", aperture: "f/1.4", distance: "2.5 m", angle: "Three-quarter back intimate", framing: "Medium shot bathing beauty" },
      color_grade: "Rose Gold Impressionist, warm pink",
      style: "Art historical reference reimagined, Renoir warmth",
      quality: "Hasselblad X2D 100C, 8K, impressionist color mastery",
      figure_and_form: "Beautiful back contours, impressionist celebration",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Silk sheets with luminous draping",
      material_properties: "Cream silk, dark walnut, sheer curtains"
    }
  },
  {
    name: "Patreon v2: Classical Silk - Gilded Boudoir",
    data: {
      shot: "Full body portrait (3:4), classical museum quality",
      subject: {
        ...MEERA_V2_SUBJECT,
        pose: "Self-reflection before gilded mirror: Standing with both front form and reflection visible, hands adjusting wet hair in intimate self-admiration"
      },
      wardrobe: "Classical draped silk in wet marble setting: Single ivory silk fabric draped in sculptural folds, revealing and concealing in classical tradition, fabric catching natural light",
      environment: "Ornate vanity mirror boudoir: Large gilded baroque frame mirror reflecting scene, crystal perfume bottles catching light, velvet-upholstered stool, cream damask wallpaper. No artificial lighting.",
      lighting: "Soft natural window light diffusing through sheers, candlelight creating warm amber accents. NO RING LIGHT.",
      camera: { focal_length: "85mm", aperture: "f/1.4", distance: "3 m", angle: "Three-quarter capturing reflection", framing: "Full body with mirror composition" },
      color_grade: "Gilded Warm, baroque gold",
      style: "Museum fine art photography, classical tradition",
      quality: "Hasselblad X2D 100C, 8K, museum exhibition quality",
      figure_and_form: "Form and reflection, private feminine ritual",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Silk draping in sculptural folds",
      material_properties: "Ivory silk, gilded mirror, damask, crystal"
    }
  },
  {
    name: "Patreon v2: Morning Sheet - Dawn Intimacy",
    data: {
      shot: "Full body portrait (3:4), intimate domestic fine art",
      subject: {
        ...MEERA_V2_SUBJECT,
        pose: "Reclining Venus on plush surface: Lying on side with elegant S-curve, one arm supporting head, classical fine art pose"
      },
      wardrobe: "Intimate morning with pooled silk sheet: Luxurious cream sheet fallen naturally, revealing form through artful arrangement, private bedroom moment after bathing",
      environment: "Dawn bedroom with silk linens: Soft rose-gold morning light streaming through sheer curtains, cream silk sheets catching early rays, intimate warm atmosphere. No artificial lighting.",
      lighting: "Dawn rose-gold rays: Early morning light with pink and gold tones, magical golden-hour dawn. NO RING LIGHT.",
      camera: { focal_length: "85mm", aperture: "f/1.4", distance: "2.5 m", angle: "Low intimate angle", framing: "Full body intimate bedroom" },
      color_grade: "Dawn Rose, intimate pink gold",
      style: "Private collection intimate masterwork",
      quality: "Hasselblad X2D 100C, 8K, intimate domestic quality",
      figure_and_form: "Classical reclining pose, intimate domestic",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Silk sheet pooled with natural arrangement",
      material_properties: "Cream silk, rose-gold light, bedroom intimacy"
    }
  },
  {
    name: "Patreon v2: Steam Ethereal - Goddess Mist",
    data: {
      shot: "Full body portrait (3:4), ethereal bathing scene",
      subject: {
        ...MEERA_V2_SUBJECT,
        pose: "Naturalist floor study in Lucian Freud tradition: Natural body on plush surface, limbs arranged in authentic balance, bold contemporary fine art"
      },
      wardrobe: "Steam as ethereal veil: Bathroom steam creating soft-focus atmospheric effect around form, mist diffusing light, skin emerging luminous through vapor, goddess bathing moment",
      environment: "Luxurious marble bath sanctuary with thick steam rising, diffusing natural window light, creating ethereal atmospheric depth. White pillar candles visible through mist. No artificial lighting.",
      lighting: "Steam-diffused ethereal: Window light passing through steam layers, creating soft-focus divine atmosphere. NO RING LIGHT.",
      camera: { focal_length: "85mm", aperture: "f/1.4", distance: "3 m", angle: "Elevated through steam", framing: "Full body ethereal atmosphere" },
      color_grade: "Ethereal Mist, soft diffused",
      style: "Documentary fine art, goddess bathing",
      quality: "Hasselblad X2D 100C, 8K, steam volumetric quality",
      figure_and_form: "Form emerging through steam, ethereal goddess",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Steam with volumetric light interaction",
      material_properties: "Thick steam, marble, candlelight through mist"
    }
  },
  {
    name: "Patreon v2: Fireplace Recline - Primal Warmth",
    data: {
      shot: "Full body portrait (3:4), primal intimate fine art",
      subject: {
        ...MEERA_V2_SUBJECT,
        pose: "Complete recline on fur before fire: Lying on plush rug facing fireplace, propped on elbows with back arched, dancing firelight creating golden-orange skin tones"
      },
      wardrobe: "Golden body oil creating luminous sheen: Bronze skin glistening with warm oil highlighting curves, light reflecting off contours, sensual self-care ritual",
      environment: "Fireplace sanctuary on plush fur: Deep white faux fur rug before natural stone fireplace with dancing flames as primary light, weathered stone surround, dark wood mantel. Only firelight illumination.",
      lighting: "Fireplace warm chiaroscuro: Fire as primary light source creating orange-golden illumination, dramatic moving light quality. NO RING LIGHT.",
      camera: { focal_length: "85mm", aperture: "f/1.4", distance: "3 m", angle: "Low intimate firelit", framing: "Full body fireplace composition" },
      color_grade: "Warm Primal, orange firelight",
      style: "Classical bathing tradition meets contemporary vision",
      quality: "Hasselblad X2D 100C, 8K, primal warmth quality",
      figure_and_form: "Primal warmth, curves in firelight",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Body oil catching firelight, plush fur beneath",
      material_properties: "White faux fur, natural stone, dancing flames"
    }
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
// COMBINED EXPORT - All V2 Generator Concepts
// ═══════════════════════════════════════════════════════════════════════════════

export const allMeeraGeneratorV2Concepts: ArtisticConcept[] = [
  ...masterclassV2Concepts,
  ...intimacyMaxV2Concepts,
  ...patreonExclusiveV2Concepts
];

// Named category exports for PromptEditor concept selector
export const generatorV2Categories = {
  'Masterclass v2': masterclassV2Concepts,
  'Intimacy Max v2': intimacyMaxV2Concepts,
  'Patreon Exclusive v2': patreonExclusiveV2Concepts
};
