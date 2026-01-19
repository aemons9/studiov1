import type { PromptData } from '../types';
import type { ArtisticConcept } from './concepts';

/**
 * MEERA+ EXCLUSIVE COLLECTION CONCEPTS
 * Premium intimate series with max-reveal aesthetics
 * Water • Shadow • Lace • Platinum elements
 * Updated Indian Hourglass Muse (38D, 27, 40)
 */

// Default hyper-realistic skin details
const defaultSkinMicroDetails = "Authentic ultra-high-resolution skin texture with visible natural pores, subtle variations in skin tone, and realistic luminosity. Warm caramel bronze tones with golden-amber undertones catching light naturally. Fine vellus hair visible on skin surface. Natural matte finish with authentic texture, NO artificial oily sheen or airbrushing.";
const defaultFabricPhysics = "Fabric drapes naturally with realistic weight and movement, creating genuine creases and folds that follow the subject's sculptural form. Every thread and weave visible upon close inspection.";
const defaultMaterialProperties = "Materials have authentic texture and light response - lace shows intricate pattern depth with skin visible beneath, mesh reveals form with geometric precision, platinum catches light with metallic shimmer.";

// ═══════════════════════════════════════════════════════════════════════════════
// MEERA+ - UPDATED INDIAN HOURGLASS CURVACEOUS MUSE (38D, 27, 40)
// ═══════════════════════════════════════════════════════════════════════════════

const MEERA_PLUS_SUBJECT = {
  variant: `Breathtakingly beautiful Indian woman Meera, age 27, height 5'9", naturally curvaceous fit hourglass figure with measurements 38D bust, 27" cinched waist, 40" dramatic rounded hips, warm caramel bronze skin with natural golden-amber undertones, visible skin pores and authentic texture, captivating deep brown magnetic eyes with thick dark lashes, full sensual lips with natural color, long flowing jet-black hair with natural waves, elegant dramatic high cheekbones, authentic natural beauty with no artificial enhancement, commanding presence with confident sensual energy`,
  pose: "",
  hair_color: "jet black with natural highlights",
  hair_style: "long flowing waves with natural tousled volume",
  skin_finish: "Natural matte finish with authentic texture and visible pores",
  hand_and_nail_details: "Elegant natural manicure, graceful expressive hand positioning",
  tattoos: "none",
  piercings: "delicate gold nose stud, subtle gold ear studs",
  body_art: "none",
  nail_art: "Natural nude polish with subtle sheen",
  high_heels: "as appropriate for wardrobe and setting"
};

// ═══════════════════════════════════════════════════════════════════════════════
// PLATINUM X COLLECTION - Water • Shadow • Platinum Thread
// ═══════════════════════════════════════════════════════════════════════════════

export const platinumXConcepts: ArtisticConcept[] = [
  {
    name: "Platinum X: Venus Rising - Private Spa",
    data: {
      shot: "Full body portrait (3:4), intimate spa fine art boudoir",
      subject: {
        ...MEERA_PLUS_SUBJECT,
        pose: "Emerging from warm spa pool at hip level, upper body exposed with single platinum chain draped across décolletage, arms gracefully gathering wet hair, head tilted back with serene expression of release"
      },
      wardrobe: "Single ultra-thin platinum chain draped delicately across décolletage, lower body submerged in warm spa water at hip level, venetian blind shadows creating horizontal stripe mesh pattern across upper torso",
      environment: "Private luxury spa sanctuary with warm stone walls and soft candlelight, steam rising from heated pool, intimate atmosphere with polished stone floor, soft ambient lighting",
      lighting: "Venetian blind shadows casting dramatic stripes across form, warm candlelight creating intimate golden glow, steam diffusing light ethereally",
      camera: { focal_length: "85mm", aperture: "f/1.4", distance: "2.5 m", angle: "Slightly elevated intimate", framing: "Full body emergence composition" },
      color_grade: "Warm amber and champagne with platinum highlights",
      style: "Museum fine art boudoir, classical Venus emergence reimagined",
      quality: "Hasselblad H6D-100c, 8K resolution, museum exhibition quality",
      figure_and_form: "Sculptural hourglass silhouette revealed through water and shadow interplay",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Water droplets beading on warm skin, platinum chain catching candlelight",
      material_properties: "Warm pool water with steam, polished stone, platinum thread with metallic shimmer"
    }
  },
  {
    name: "Platinum X: Grotto Secret - Hidden Sanctuary",
    data: {
      shot: "Full body portrait (3:4), primal intimate fine art",
      subject: {
        ...MEERA_PLUS_SUBJECT,
        pose: "Reclining on smooth rock formation, body in elegant S-curve, single platinum hip chain visible, lace shadow patterns across form, vulnerable trusting gaze at camera"
      },
      wardrobe: "Whisper-thin platinum thread chain resting on hip bone, lower body partially submerged in shallow warm tidal pool, ornate lace curtain shadows casting delicate floral mesh pattern across upper body",
      environment: "Hidden sea cave grotto with natural skylight, smooth water-worn rocks, warm shallow pool with turquoise tint, natural light filtering through cave opening creating dappled patterns",
      lighting: "Natural light through cave skylight creating lace-like shadow patterns, warm reflections from turquoise water, intimate sanctuary atmosphere",
      camera: { focal_length: "85mm", aperture: "f/1.4", distance: "3 m", angle: "Low intimate angle", framing: "Full body recline with natural setting" },
      color_grade: "Turquoise and warm bronze, natural grotto tones",
      style: "Primal goddess fine art, hidden sanctuary intimacy",
      quality: "Phase One IQ4 150MP, 8K exceptional natural light capture",
      figure_and_form: "Hourglass curves sculpted by natural light and shadow in primal setting",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Water lapping gently at curves, platinum chain catching natural light",
      material_properties: "Smooth water-worn rock, turquoise pool, platinum thread accent"
    }
  },
  {
    name: "Platinum X: Urban Twilight - Rooftop",
    data: {
      shot: "Full body portrait (3:4), urban goddess editorial",
      subject: {
        ...MEERA_PLUS_SUBJECT,
        pose: "Standing at rooftop infinity pool edge, water at hip level, single platinum body chain from neck crossing body, geometric lattice shadows across form, confident gaze at camera"
      },
      wardrobe: "Delicate platinum body chain draped from neck crossing diagonally across torso to hip, lower body submerged in rooftop infinity pool at hip level, architectural lattice shadows creating geometric mesh pattern across upper body",
      environment: "Modern luxury rooftop with infinity pool overlooking city skyline, evening golden hour transitioning to blue hour, geometric glass and steel architecture creating shadow patterns, urban sanctuary atmosphere",
      lighting: "Golden hour light transitioning to blue hour, architectural lattice shadows creating geometric patterns, city lights beginning to glow in background",
      camera: { focal_length: "85mm", aperture: "f/1.4", distance: "3 m", angle: "Slightly low angle powerful", framing: "Full body with urban skyline" },
      color_grade: "Golden to blue hour gradient, urban luxury tones",
      style: "Contemporary urban goddess, architectural beauty editorial",
      quality: "Hasselblad X2D 100C, 8K cinematic urban photography",
      figure_and_form: "Powerful hourglass silhouette against urban skyline with geometric shadow play",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Pool water reflecting city lights, platinum chain catching golden light",
      material_properties: "Infinity pool water, glass and steel architecture, platinum chain accent"
    }
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
// WATERY SHADOW MESH COLLECTION - Droplets • Shadow Grid • Wet Floor
// ═══════════════════════════════════════════════════════════════════════════════

export const wateryShadowMeshConcepts: ArtisticConcept[] = [
  {
    name: "Watery Shadow Mesh: Rainfall Venus",
    data: {
      shot: "Full body portrait (3:4), rainfall goddess fine art",
      subject: {
        ...MEERA_PLUS_SUBJECT,
        pose: "Standing under warm rainfall shower, arms raised gathering wet hair, body glistening with water droplets, venetian stripe shadows creating horizontal coverage, serene goddess expression"
      },
      wardrobe: "Water droplets covering skin like diamond jewels, venetian blind shadows casting horizontal stripe mesh pattern creating upper body coverage, warm rainfall cascading over curves",
      environment: "Luxurious rainfall shower room with warm water cascade, steam rising, polished stone floor creating mirror-like wet reflection, soft ambient lighting, intimate spa atmosphere",
      lighting: "Venetian blind shadows creating stripe pattern coverage, warm ambient glow through steam, water droplets catching light like diamonds",
      camera: { focal_length: "85mm", aperture: "f/1.4", distance: "2.5 m", angle: "Frontal intimate", framing: "Full body rainfall composition" },
      color_grade: "Warm amber with aquamarine water reflections",
      style: "Goddess fine art, rainfall sanctuary intimacy",
      quality: "RED Monstro 8K VV, exceptional water and skin detail capture",
      figure_and_form: "Sculptural curves revealed through water cascade and shadow mesh interplay",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Water beading and flowing naturally over warm skin, creating liquid jewelry effect",
      material_properties: "Warm water with steam, polished reflective stone, natural shadow patterns"
    }
  },
  {
    name: "Watery Shadow Mesh: Poolside Emergence",
    data: {
      shot: "Full body portrait (3:4), golden emergence editorial",
      subject: {
        ...MEERA_PLUS_SUBJECT,
        pose: "Emerging from pool at hip level, hands on pool edge for support, water streaming off body, diamond shadow mesh pattern across torso, confident powerful gaze"
      },
      wardrobe: "Water streaming off curves creating liquid coverage, geometric lattice shadows casting diamond mesh pattern across upper body, wet skin glistening with water droplets",
      environment: "Private pool with warm golden hour light, wet stone deck creating reflections, tropical foliage in background creating dappled shadows, steam rising from heated water",
      lighting: "Golden hour sunlight through geometric lattice creating diamond shadow patterns, warm reflections from pool surface, steam diffusing light",
      camera: { focal_length: "85mm", aperture: "f/1.4", distance: "3 m", angle: "Low powerful angle", framing: "Full body emergence with pool setting" },
      color_grade: "Rich golden amber with turquoise pool accents",
      style: "Venus emergence reimagined, poolside goddess editorial",
      quality: "Hasselblad H6D-100c, 8K golden hour mastery",
      figure_and_form: "Powerful hourglass silhouette emerging with water and shadow coverage",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Water streaming naturally over curves, droplets catching golden light",
      material_properties: "Pool water with golden reflections, wet stone deck, tropical shadow patterns"
    }
  },
  {
    name: "Watery Shadow Mesh: Studio Reflection",
    data: {
      shot: "Full body portrait (3:4), editorial double vision",
      subject: {
        ...MEERA_PLUS_SUBJECT,
        pose: "Kneeling on wet studio floor creating mirror reflection, body glistening with mist, shadow grid pattern across form, contemplative intimate gaze at camera"
      },
      wardrobe: "Fine water mist covering skin with glistening droplets, geometric shadow grid casting precise pattern coverage across body, wet floor creating perfect reflection doubling the visual",
      environment: "Professional photography studio with intentionally wet black floor for reflection effect, controlled mist in air, single dramatic spotlight, editorial atmosphere",
      lighting: "Single dramatic spotlight creating precise shadow grid, wet floor reflecting silhouette perfectly, controlled chaos of light and shadow",
      camera: { focal_length: "85mm", aperture: "f/1.4", distance: "2.5 m", angle: "Low reflection capture", framing: "Full body with mirror reflection" },
      color_grade: "High contrast noir with warm skin preservation",
      style: "Editorial mastery, Helmut Newton shadow artistry",
      quality: "Phase One IQ4 150MP, 8K exceptional reflection detail",
      figure_and_form: "Hourglass silhouette doubled by perfect reflection with geometric shadow play",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Fine mist creating glistening skin surface, droplets catching spotlight",
      material_properties: "Wet reflective studio floor, controlled mist, precise shadow geometry"
    }
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
// CANDLELIT BATH COLLECTION - Water Wardrobe • Cinematic Cameras
// ═══════════════════════════════════════════════════════════════════════════════

export const candlelitBathConcepts: ArtisticConcept[] = [
  {
    name: "Candlelit Bath: Emerging Venus",
    data: {
      shot: "Full body portrait (3:4), classical renaissance reimagined",
      subject: {
        ...MEERA_PLUS_SUBJECT,
        pose: "Rising from candlelit bath, water streaming from curves, arms gracefully positioned at chest, head tilted with serene divine expression, water as primary wardrobe"
      },
      wardrobe: "Water streaming elegantly over curves creating liquid coverage, rose petals floating on bath surface, warm candlelight shadows adding additional coverage patterns",
      environment: "Marble bathroom sanctuary with multiple candles creating warm golden glow, clawfoot copper tub filled with warm water, rose petals floating, steam rising, classical architectural elements",
      lighting: "Warm candlelight from multiple sources creating Caravaggio-style chiaroscuro, steam diffusing light, golden hour warmth preserved",
      camera: { focal_length: "80mm", aperture: "f/2.0", distance: "2.5 m", angle: "Classical elevated", framing: "Full body renaissance composition" },
      color_grade: "Rich warm amber, candlelit renaissance tones",
      style: "Botticelli Venus reimagined, classical fine art photography",
      quality: "Hasselblad H6D-100c medium format, 8K museum exhibition quality",
      figure_and_form: "Divine hourglass silhouette revealed through cascading water and candlelight shadow",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Water streaming naturally over warm skin, rose petals floating elegantly",
      material_properties: "Warm bath water, copper tub, marble surfaces, candlelight warmth"
    }
  },
  {
    name: "Candlelit Bath: Floating Reverie",
    data: {
      shot: "Full body portrait (3:4), dreamlike weightless intimacy",
      subject: {
        ...MEERA_PLUS_SUBJECT,
        pose: "Floating weightlessly in deep bath, hair fanning around head like halo, body partially submerged with curves breaking water surface, peaceful meditative expression"
      },
      wardrobe: "Warm bath water as coverage with form visible beneath surface, hair creating dark halo around head, skin breaking water surface at strategic points",
      environment: "Deep soaking tub in minimalist spa, soft blue-green water with subtle lighting from below, candles along edge, peaceful urban sanctuary atmosphere",
      lighting: "Subtle underwater lighting creating ethereal glow, candlelight from edges, weightless dreamlike atmosphere",
      camera: { focal_length: "35mm", aperture: "f/2.8", distance: "2 m", angle: "Elevated overhead artistic", framing: "Full body floating composition" },
      color_grade: "Ethereal blue-green with warm skin contrast",
      style: "Contemporary Ophelia reimagined, dreamlike fine art",
      quality: "Canon EOS C700 cinema camera, 8K ethereal capture",
      figure_and_form: "Weightless hourglass form with curves breaking water surface gracefully",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Water distorting and revealing form, hair floating naturally",
      material_properties: "Blue-green water with gentle movement, candlelight reflections"
    }
  },
  {
    name: "Candlelit Bath: Steam Goddess",
    data: {
      shot: "Full body portrait (3:4), ethereal steam shroud",
      subject: {
        ...MEERA_PLUS_SUBJECT,
        pose: "Seated at edge of hammam pool, steam swirling around form creating veils of coverage, one leg in warm water, confident goddess gaze through steam"
      },
      wardrobe: "Rising steam creating ethereal veils of natural coverage, warm water at lower body, geometric tile shadows adding pattern coverage",
      environment: "Traditional hammam bath house with ornate Moroccan tiles, warm pool with steam rising, intricate geometric shadows from lattice screens, exotic intimate atmosphere",
      lighting: "Steam diffusing and scattering light, lattice shadows creating geometric patterns, warm candlelight glow from wall sconces",
      camera: { focal_length: "85mm", aperture: "f/1.4", distance: "3 m", angle: "Dramatic low angle", framing: "Full body steam goddess composition" },
      color_grade: "Warm amber through ethereal steam haze",
      style: "Exotic goddess fine art, hammam mystique editorial",
      quality: "ARRI Alexa Mini LF, 8K exceptional steam capture",
      figure_and_form: "Powerful hourglass silhouette revealed and veiled by swirling steam",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Steam swirling naturally around warm skin, water droplets condensing",
      material_properties: "Steam veils, ornate tiles, warm hammam water, exotic lattice patterns"
    }
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
// SHADOW INTIMACY COLLECTION - Chiaroscuro Conceptual Art
// ═══════════════════════════════════════════════════════════════════════════════

export const shadowIntimacyConcepts: ArtisticConcept[] = [
  {
    name: "Shadow Intimacy: Venetian Dreams",
    data: {
      shot: "Full body portrait (3:4), dramatic venetian shadow art",
      subject: {
        ...MEERA_PLUS_SUBJECT,
        pose: "Standing in shaft of light through venetian blinds, body sculpted by horizontal shadow stripes creating coverage, arms raised adjusting hair, serene confident expression"
      },
      wardrobe: "Venetian blind shadows casting horizontal stripe pattern across entire form creating mesh-like coverage, strategic shadow placement for artistic modesty",
      environment: "Minimalist bedroom with floor-to-ceiling windows, venetian blinds filtering afternoon light, crisp white sheets on bed, intimate private atmosphere",
      lighting: "Strong afternoon sunlight through venetian blinds creating precise horizontal shadow stripes, high contrast chiaroscuro effect",
      camera: { focal_length: "85mm", aperture: "f/1.4", distance: "2.5 m", angle: "Frontal dramatic", framing: "Full body shadow sculpture composition" },
      color_grade: "High contrast noir with preserved warm skin tones",
      style: "Helmut Newton shadow mastery, venetian stripe artistry",
      quality: "Hasselblad X2D 100C, 8K exceptional shadow detail",
      figure_and_form: "Sculptural hourglass figure defined entirely by shadow stripe patterns",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Shadow patterns conforming to curves as if fabric",
      material_properties: "Crisp white sheets, afternoon light, precise shadow geometry"
    }
  },
  {
    name: "Shadow Intimacy: Lace Curtain Veil",
    data: {
      shot: "Full body portrait (3:4), ethereal lace shadow art",
      subject: {
        ...MEERA_PLUS_SUBJECT,
        pose: "Reclining on daybed near window with ornate lace curtains, body covered by intricate lace shadow patterns, one hand reaching toward light, dreamy vulnerable expression"
      },
      wardrobe: "Ornate lace curtain shadows casting intricate floral mesh pattern across entire form, delicate shadow patterns creating ethereal coverage",
      environment: "Romantic bedroom with antique daybed, floor-length ornate lace curtains, warm afternoon light filtering through, vintage intimate atmosphere",
      lighting: "Warm afternoon sunlight filtered through ornate lace curtains, intricate shadow patterns covering form, soft romantic atmosphere",
      camera: { focal_length: "85mm", aperture: "f/1.4", distance: "2.5 m", angle: "Elevated romantic", framing: "Full body lace shadow composition" },
      color_grade: "Warm golden with soft romantic tones",
      style: "Paolo Roversi ethereal beauty, vintage romantic intimacy",
      quality: "Phase One IQ4 150MP, 8K intricate shadow detail",
      figure_and_form: "Feminine hourglass curves adorned with delicate lace shadow patterns",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Shadow lace patterns conforming naturally to sculptural form",
      material_properties: "Antique daybed fabric, ornate lace curtain, warm afternoon light"
    }
  },
  {
    name: "Shadow Intimacy: Foliage Dappled",
    data: {
      shot: "Full body portrait (3:4), natural dappled shadow art",
      subject: {
        ...MEERA_PLUS_SUBJECT,
        pose: "Lying on soft grass beneath tree canopy, body dappled with leaf shadows creating organic coverage, peaceful connection with nature, serene natural expression"
      },
      wardrobe: "Dappled sunlight through tree foliage creating organic shadow coverage across form, natural patterns of light and dark providing artistic modesty",
      environment: "Private garden sanctuary beneath mature tree canopy, soft natural grass, dappled sunlight filtering through leaves, birdsong atmosphere, complete privacy",
      lighting: "Dappled sunlight through tree canopy creating organic shadow patterns, warm natural light with shifting patterns",
      camera: { focal_length: "85mm", aperture: "f/1.4", distance: "2.5 m", angle: "Elevated natural", framing: "Full body garden goddess composition" },
      color_grade: "Natural warm with green undertones from foliage",
      style: "Garden goddess fine art, natural intimacy editorial",
      quality: "Leica S3 medium format, 8K exceptional natural light capture",
      figure_and_form: "Natural hourglass silhouette adorned with organic dappled shadow patterns",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Organic shadow patterns moving gently with breeze",
      material_properties: "Soft grass, tree bark texture, dappled natural light"
    }
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
// MEERA+ MIDNIGHT INTIMATE COLLECTION - Max Reveal • Single Lace • Evening/Night
// ═══════════════════════════════════════════════════════════════════════════════

export const meeraPlusMidnightConcepts: ArtisticConcept[] = [
  {
    name: "Meera+ Midnight: Velvet Boudoir - Lace Embrace",
    data: {
      shot: "Full body portrait (3:4), intimate velvet noir boudoir",
      subject: {
        ...MEERA_PLUS_SUBJECT,
        pose: "Reclining on deep burgundy velvet chaise, single lace body piece draping strategically, one hand behind head, knees slightly bent, vulnerable intimate gaze with hint of invitation"
      },
      wardrobe: "Single piece of delicate black French Chantilly lace draped strategically across body following curves, gossamer-thin fabric revealing form beneath while providing artistic coverage, elegant simplicity",
      environment: "Intimate velvet-draped boudoir with deep burgundy and gold accents, soft candlelight, antique chaise lounge, heavy silk drapes, midnight intimate atmosphere",
      lighting: "Warm candlelight creating intimate golden glow, soft shadows adding depth, Caravaggio-inspired chiaroscuro",
      camera: { focal_length: "85mm", aperture: "f/1.4", distance: "2.5 m", angle: "Low intimate perspective", framing: "Full body velvet recline composition" },
      color_grade: "Rich burgundy noir with warm golden candlelight",
      style: "Intimate boudoir fine art, single lace elegance",
      quality: "Hasselblad H6D-100c, 8K exceptional fabric and skin detail",
      figure_and_form: "Sculptural 38D-27-40 hourglass curves draped with single lace element",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Single lace piece draping naturally following body contours with authentic weight",
      material_properties: "French Chantilly lace against velvet, candlelight on warm skin"
    }
  },
  {
    name: "Meera+ Midnight: Penthouse Night - City Glow",
    data: {
      shot: "Full body portrait (3:4), urban midnight goddess",
      subject: {
        ...MEERA_PLUS_SUBJECT,
        pose: "Standing at floor-to-ceiling window overlooking city lights, body silhouetted, single lace wrap held loosely at hips, confident nocturnal goddess gaze reflected in glass"
      },
      wardrobe: "Single length of champagne lace wrap held loosely at hips with long trail, city lights creating pattern reflections on body, strategic positioning for artistic elegance",
      environment: "Luxury penthouse at midnight with floor-to-ceiling windows, glittering city skyline below, minimal interior lighting, urban nocturnal sanctuary",
      lighting: "City lights from below creating rim lighting, subtle interior ambient glow, reflections in window glass adding ethereal quality",
      camera: { focal_length: "35mm", aperture: "f/1.4", distance: "3 m", angle: "Slightly low dramatic", framing: "Full body with city skyline" },
      color_grade: "Deep midnight blue with amber city light accents",
      style: "Urban midnight goddess, nocturnal glamour editorial",
      quality: "Sony A1, 8K exceptional low light and city detail",
      figure_and_form: "Powerful hourglass silhouette against glittering city lights with single lace accent",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Champagne lace catching city lights with elegant drape",
      material_properties: "Sheer champagne lace, window glass reflections, city light patterns"
    }
  },
  {
    name: "Meera+ Midnight: Cinematic Bed - Evening Intimacy",
    data: {
      shot: "Full body portrait (3:4), cinematic bedroom intimacy",
      subject: {
        ...MEERA_PLUS_SUBJECT,
        pose: "Lying on silk sheets, body in elegant curve, single black lace piece draped across torso, one knee raised, arm extended above head, deeply intimate trusting gaze"
      },
      wardrobe: "Single piece of black lace lingerie draped across curves with strategic placement, silk sheet partially covering lower body, intimate elegant simplicity",
      environment: "Cinematic bedroom with charcoal silk sheets, single warm lamp creating pool of golden light, deep shadows in corners, film noir intimate atmosphere",
      lighting: "Single warm lamp creating concentrated pool of golden light, deep cinematic shadows, film noir atmosphere",
      camera: { focal_length: "50mm", aperture: "f/1.4", distance: "2 m", angle: "Elevated intimate overhead", framing: "Full body cinematic bed composition" },
      color_grade: "Cinematic noir with warm golden pool of light",
      style: "Film noir intimacy, single element elegance",
      quality: "RED Monstro 8K VV, cinematic intimate capture",
      figure_and_form: "Intimate hourglass curves revealed through strategic lace and shadow play",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Black lace draping naturally on warm skin, silk sheets flowing around form",
      material_properties: "Black lace against charcoal silk, warm lamplight on bronze skin"
    }
  },
  {
    name: "Meera+ Midnight: Mirror Chamber - Double Vision",
    data: {
      shot: "Full body portrait (3:4), mirror reflection intimacy",
      subject: {
        ...MEERA_PLUS_SUBJECT,
        pose: "Standing before full-length mirror, body visible in reflection doubling the view, single ivory lace wrap held at shoulder, contemplative self-aware expression"
      },
      wardrobe: "Single ivory French lace wrap draped from shoulder across body with elegant flow, reflection in mirror creating artistic doubled composition",
      environment: "Intimate dressing room with large ornate mirror, warm evening light from side, velvet bench, private sanctuary atmosphere",
      lighting: "Warm evening side light creating sculptural shadows, mirror reflection adding depth and dimension, intimate golden glow",
      camera: { focal_length: "50mm", aperture: "f/1.4", distance: "2.5 m", angle: "Three-quarter capturing reflection", framing: "Full body with mirror reflection" },
      color_grade: "Warm ivory and gold with mirror silver accents",
      style: "Narcissus reimagined, mirror intimacy fine art",
      quality: "Phase One IQ4 150MP, 8K exceptional reflection detail",
      figure_and_form: "Hourglass silhouette doubled by mirror with single lace element unifying composition",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Ivory lace flowing naturally from shoulder following curves",
      material_properties: "French ivory lace, ornate mirror, velvet textures, warm evening light"
    }
  },
  {
    name: "Meera+ Midnight: Moonlit Garden - Natural Intimacy",
    data: {
      shot: "Full body portrait (3:4), moonlit natural intimacy",
      subject: {
        ...MEERA_PLUS_SUBJECT,
        pose: "Standing in private moonlit garden, arms crossed at chest with natural modesty, single white lace wrap at hips, silvery moonlight on skin, serene nocturnal expression"
      },
      wardrobe: "Single piece of white lace wrap held loosely at hips, arms providing natural upper coverage, moonlight creating ethereal silver glow on exposed skin",
      environment: "Private garden at night with full moon overhead, soft grass, flowering jasmine creating natural screen, fireflies in background, magical nocturnal sanctuary",
      lighting: "Full moon creating silvery blue light, soft and ethereal, fireflies adding magical accent points",
      camera: { focal_length: "85mm", aperture: "f/1.4", distance: "3 m", angle: "Frontal natural", framing: "Full body moonlit garden composition" },
      color_grade: "Silvery blue moonlight with warm skin preservation",
      style: "Moonlit goddess, natural nocturnal intimacy",
      quality: "Sony A1, 8K exceptional moonlight capture",
      figure_and_form: "Natural hourglass silhouette bathed in moonlight with simple lace accent",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "White lace catching moonlight with ethereal glow",
      material_properties: "White lace, moonlit grass, jasmine flowers, firefly light accents"
    }
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
// COMBINED EXPORTS
// ═══════════════════════════════════════════════════════════════════════════════

export const allMeeraPlusExclusiveConcepts: ArtisticConcept[] = [
  ...platinumXConcepts,
  ...wateryShadowMeshConcepts,
  ...candlelitBathConcepts,
  ...shadowIntimacyConcepts,
  ...meeraPlusMidnightConcepts
];

export {
  MEERA_PLUS_SUBJECT,
  defaultSkinMicroDetails,
  defaultFabricPhysics,
  defaultMaterialProperties
};
