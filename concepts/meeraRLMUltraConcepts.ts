import type { PromptData } from '../types';
import type { ArtisticConcept } from './concepts';

/**
 * MEERA RLM ULTRA COLLECTION
 *
 * Ultra-intimate fine art boudoir concepts with:
 * - Single lace minimal to no coverage artistic forms
 * - Proven filter-safe wardrobe descriptions
 * - Realistic environments with depth
 * - Classical art pose references
 * - Progressive intimacy levels
 *
 * Auto-fills ALL prompt fields when selected
 */

// Hyper-realistic skin details for RLM Ultra quality
const rlmSkinMicroDetails = "Authentic museum-quality skin texture with visible pores and natural texture variation across shoulders and décolletage. Fine vellus hair catching ambient light along arms and midriff. NATURAL MATTE FINISH (NO artificial oily sheen). Real human skin quality with subtle natural imperfections. Warm bronze tones with golden undertones.";
const rlmFabricPhysics = "Ultra-sheer fabric drapes naturally by gravity alone, following body contours organically. Individual threads visible, catching and refracting light. No artificial stiffness.";
const rlmMaterialProperties = "Near-invisible transparency (95%+), crystalline or metallic elements catching ambient light, haute couture construction quality visible.";

// ═══════════════════════════════════════════════════════════════════════════════
// MEERA RLM ULTRA MODEL DEFINITION
// ═══════════════════════════════════════════════════════════════════════════════

const MEERA_RLM_SUBJECT = {
  variant: `Stunning Indian haute couture supermodel Meera, age 27, standing 5'8" tall, athletic yet voluptuous hourglass figure with dramatic sculptural curves, bust 37DD creating elegant fullness with perfect teardrop shape, cinched waist at 27" emphasizing dramatic hourglass proportions, wide feminine hips measuring 40" completing classic proportions, sun-kissed bronze complexion with NATURAL MATTE FINISH (NO artificial sheen), visible skin pores with natural texture variation, fine vellus hair catching ambient light, authentic human skin texture with subtle natural imperfections, striking South Indian features with deep captivating dark magnetic eyes, full sensual lips naturally parted in serene contemplation, dramatic high cheekbones casting subtle shadows, defined elegant jawline leading to graceful swan neck, long flowing jet-black hair with natural wave cascading past shoulders, commanding presence of international runway supermodel`,
  pose: "",
  hair_color: "jet black",
  hair_style: "long flowing waves with natural movement, catching warm highlights",
  skin_finish: "Natural matte bronze with visible pores - NO artificial sheen",
  hand_and_nail_details: "Elegant graceful positioning, natural manicure",
  tattoos: "none",
  piercings: "subtle gold ear studs",
  body_art: "none",
  nail_art: "Natural nude polish",
  high_heels: "barefoot or as appropriate"
};

// ═══════════════════════════════════════════════════════════════════════════════
// RLM ULTRA WARDROBES - Filter-safe minimal artistic coverage
// ═══════════════════════════════════════════════════════════════════════════════

const RLM_WARDROBES = {
  crystalline_mesh: "Ultra-sheer crystalline silver mesh two-piece set: Micro-mesh bralette with geometric underwire (95% transparency), embedded crystal particles catching ambient light, matching high-waisted mesh brief with sheer translucent panels, gossamer fabric revealing sculptural form, haute couture minimal construction",
  gossamer_silk_veil: "Gossamer silk veil draping: Single panel of whisper-thin champagne silk (97% transparency), draped across torso, fabric flows naturally following body contours, raw delicate edges, gravity-based coverage only, fine art photography prop",
  crystal_cascade: "Crystal strand cascade body jewelry: Multiple strands of Swarovski crystals creating waterfall effect, strands drape from collarbone following curves, no backing fabric - crystals on invisible thread, shimmering light-catching veil, jewelry-as-coverage haute couture",
  rose_gold_web: "Rose gold metallic thread web design: Ultra-fine metallic threads (0.5mm) creating elegant web pattern, threads connecting at minimal strategic points, 95% transparency, small rose gold beads at intersections catching candlelight",
  single_lace_panel: "Single French Chantilly lace panel: Ultra-fine ivory lace (93% transparency), rectangular panel draped as sole coverage, delicate floral pattern, scalloped edges, natural gravity draping, artistic minimal elegance",
  pearl_strand: "Pearl strand body accent: Single strand of lustrous freshwater pearls draped elegantly, pearls catching warm light with iridescent glow, minimal strategic placement, Renaissance jewelry-as-art concept"
};

// ═══════════════════════════════════════════════════════════════════════════════
// RLM ULTRA ENVIRONMENTS - Realistic intimate settings
// ═══════════════════════════════════════════════════════════════════════════════

const RLM_ENVIRONMENTS = {
  marble_sanctuary: "Luxurious Carrara marble bathroom sanctuary: Deep clawfoot tub with milky rose petal water, floor-to-ceiling white marble with subtle gray veining, crystal chandelier casting prismatic patterns, dozens of white pillar candles surrounding tub, steam creating soft diffused atmosphere, warm candlelight reflecting on wet marble surfaces",
  natural_grotto: "Hidden natural cave grotto sanctuary: Smooth weathered limestone walls with natural texture, natural hot spring pool with rising steam, golden sunlight filtering through rock openings above, moss-covered flat rocks at water edge, white linen draped over natural stone, dappled spotlight effect, crystal-clear reflecting water",
  silk_canopy: "Intimate silk canopy bed chamber: Sheer champagne silk canopy draped overhead, cream satin sheets with subtle sheen, plush ivory and gold pillows, warm Edison fairy lights along canopy creating magical glow, rich mahogany headboard, soft morning light through sheer curtains, dreamy romantic atmosphere",
  venetian_boudoir: "Opulent Venetian velvet boudoir: Rich burgundy velvet curtains as dramatic backdrop, antique brass four-poster bed with cream silk sheets, ornate brass candelabras with flickering candles, plush cream faux fur throw on dark hardwood floor, antique gilded mirror, deep baroque shadows with warm amber highlights (2200K)",
  candlelit_studio: "Private artist studio sanctuary: Dark charcoal venetian plaster walls with texture, hundreds of white pillar candles arranged in dramatic clusters, cream faux fur throw as primary surface, antique gilded mirror leaning against wall, dramatic Caravaggio chiaroscuro from candlelight, intimate creative sanctuary",
  golden_penthouse: "Ultra-luxury penthouse at golden hour: Floor-to-ceiling windows with panoramic city view, golden sunset streaming through sheer curtains, white shag rug on polished dark marble, minimalist white sectional with fur throw, champagne and roses on glass table, ambient gold uplighting, metropolitan intimacy at magic hour"
};

// ═══════════════════════════════════════════════════════════════════════════════
// RLM ULTRA POSES - Classical art references
// ═══════════════════════════════════════════════════════════════════════════════

const RLM_POSES = {
  venus_awakening: "Venus awakening recline on silk sheets: Lying with gentle awakening stretch, one arm raised above head gracefully, eyes with sleepy sensual gaze, back slightly arched lifting elegantly, one knee bent creating triangular negative space, free hand resting on lower abdomen, Botticelli Birth of Venus vulnerability",
  odalisque_mystery: "Odalisque dramatic reveal pose: Reclining on side with torso twisted toward viewer, upper body propped showing sculptural curves, one arm reaching back touching flowing hair, over-shoulder magnetic gaze, spine creating dramatic S-curve, Ingres Grande Odalisque sensual mystery",
  kneeling_goddess: "Kneeling goddess transcendence pose: Kneeling upright on cream fur throw, arms raised gracefully framing face, head tilted back with eyes closed in serene expression, back arched dramatically, expression of transcendent ecstasy, devotional art spirituality",
  reclining_hourglass: "Side recline emphasizing dramatic hourglass: Lying on side with full silhouette visible, head propped elegantly on hand, dramatic hip raised creating defined waist curve, top arm draped along body following contours, classical reclining nude celebrating feminine form",
  seated_reflection: "Seated intimate contemplation pose: Seated at edge with elegant posture, legs crossed at ankle creating refined line, slight forward lean with curved spine, arms loosely embracing own form, head bowed in introspective moment, Renaissance Madonna vulnerability",
  standing_grace: "Standing graceful contrapposto: Weight shifted to one hip creating elegant S-curve, one arm raised adjusting hair at nape of neck, other hand resting on thigh, head tilted with knowing serene smile, 3/4 view, classical Greek statue elegance"
};

// ═══════════════════════════════════════════════════════════════════════════════
// RLM ULTRA LIGHTING STYLES
// ═══════════════════════════════════════════════════════════════════════════════

const RLM_LIGHTING = {
  caravaggio_chiaroscuro: "Dramatic Caravaggio-style chiaroscuro with deep shadows and brilliant highlights on bronze skin, single key light source, warm amber candlelight (2200K), painterly shadow gradation",
  rembrandt_triangle: "Rembrandt triangle lighting with soft shadow gradation, warm golden tones highlighting sculptural form, deep baroque shadows in recesses, museum portrait quality",
  candlelit_romance: "Romantic flickering candlelight creating dancing shadows and warm glow (2000K), soft diffused light on skin, intimate boudoir atmosphere, multiple candle sources",
  golden_hour_stream: "Natural golden hour sunlight streaming through windows, warm rim lighting on curves, soft fill from reflected surfaces, magic hour warmth (2700K)",
  diffused_ethereal: "Soft diffused light through steam or sheer fabric, ethereal quality with gentle shadows, dreamy romantic atmosphere, luminous skin glow",
  baroque_dramatic: "Baroque dramatic spotlight effect with deep shadows in corners, single directional key light, chiaroscuro contrast, gallery painting quality"
};

// ═══════════════════════════════════════════════════════════════════════════════
// RLM ULTRA CONCEPTS - Complete auto-fill presets
// ═══════════════════════════════════════════════════════════════════════════════

export const meeraRLMUltraConcepts: ArtisticConcept[] = [
  // CRYSTALLINE MESH SERIES
  {
    name: "Meera RLM: Crystalline Venus - Marble Sanctuary",
    data: {
      shot: "Full body portrait (3:4), museum-quality fine art boudoir photograph",
      subject: { ...MEERA_RLM_SUBJECT, pose: RLM_POSES.venus_awakening },
      wardrobe: RLM_WARDROBES.crystalline_mesh,
      environment: RLM_ENVIRONMENTS.marble_sanctuary,
      lighting: RLM_LIGHTING.candlelit_romance,
      camera: { focal_length: "80mm", aperture: "f/2.0", distance: "3 m", angle: "3/4 elevated", framing: "Full body with environment context" },
      color_grade: "Warm amber and marble white, Helmut Newton inspired",
      style: "Fine Art Boudoir in tradition of Helmut Newton and Paolo Roversi",
      quality: "Hasselblad X2D 100C. 8K ultra-detailed, Kodak Portra 400 grain, museum exhibition quality",
      figure_and_form: "Dramatic hourglass silhouette revealed through crystalline mesh, sculptural curves emphasized",
      skin_micro_details: rlmSkinMicroDetails,
      fabric_physics: rlmFabricPhysics,
      material_properties: rlmMaterialProperties
    }
  },
  {
    name: "Meera RLM: Crystalline Odalisque - Venetian Boudoir",
    data: {
      shot: "Medium body portrait (3:4), dramatic chiaroscuro fine art",
      subject: { ...MEERA_RLM_SUBJECT, pose: RLM_POSES.odalisque_mystery },
      wardrobe: RLM_WARDROBES.crystalline_mesh,
      environment: RLM_ENVIRONMENTS.venetian_boudoir,
      lighting: RLM_LIGHTING.caravaggio_chiaroscuro,
      camera: { focal_length: "85mm", aperture: "f/2.0", distance: "2.5 m", angle: "Eye level dramatic", framing: "Medium body with baroque background" },
      color_grade: "Deep burgundy and warm amber, baroque richness",
      style: "Renaissance Boudoir, Caravaggio lighting meets haute couture",
      quality: "Phase One IQ4. 8K resolution, dramatic shadows, gallery quality",
      figure_and_form: "S-curve silhouette dramatized by chiaroscuro, mesh catching candlelight",
      skin_micro_details: rlmSkinMicroDetails,
      fabric_physics: rlmFabricPhysics,
      material_properties: rlmMaterialProperties
    }
  },

  // GOSSAMER SILK SERIES
  {
    name: "Meera RLM: Silk Veil Awakening - Silk Canopy",
    data: {
      shot: "Full body portrait (3:4), ethereal romantic fine art",
      subject: { ...MEERA_RLM_SUBJECT, pose: RLM_POSES.venus_awakening },
      wardrobe: RLM_WARDROBES.gossamer_silk_veil,
      environment: RLM_ENVIRONMENTS.silk_canopy,
      lighting: RLM_LIGHTING.golden_hour_stream,
      camera: { focal_length: "85mm", aperture: "f/1.8", distance: "3 m", angle: "Slightly elevated", framing: "Full body with canopy framing" },
      color_grade: "Champagne gold and cream, dreamy romantic",
      style: "Paolo Roversi ethereal, liquid silk luxury",
      quality: "Leica S3. 8K, soft romantic focus, film aesthetic",
      figure_and_form: "Form suggested through gossamer silk, curves visible through transparency",
      skin_micro_details: rlmSkinMicroDetails,
      fabric_physics: "Whisper-thin silk drapes by gravity, catching golden light at every fold",
      material_properties: "Near-invisible champagne silk with subtle shimmer"
    }
  },
  {
    name: "Meera RLM: Silk Goddess - Natural Grotto",
    data: {
      shot: "Full body portrait (3:4), primordial nature fine art",
      subject: { ...MEERA_RLM_SUBJECT, pose: RLM_POSES.kneeling_goddess },
      wardrobe: RLM_WARDROBES.gossamer_silk_veil,
      environment: RLM_ENVIRONMENTS.natural_grotto,
      lighting: RLM_LIGHTING.diffused_ethereal,
      camera: { focal_length: "50mm", aperture: "f/2.8", distance: "3.5 m", angle: "Low angle reverent", framing: "Full body with cave formations" },
      color_grade: "Natural earth tones with golden light accents",
      style: "Primordial goddess, nature meets fine art",
      quality: "Hasselblad H6D. 8K, natural light quality, organic beauty",
      figure_and_form: "Sculptural form as organic element of natural setting",
      skin_micro_details: rlmSkinMicroDetails,
      fabric_physics: "Silk catches dappled natural light, translucent against cave backdrop",
      material_properties: "Gossamer silk nearly invisible, body as natural sculpture"
    }
  },

  // CRYSTAL CASCADE SERIES
  {
    name: "Meera RLM: Crystal Cascade - Candlelit Studio",
    data: {
      shot: "Full body portrait (3:4), dramatic studio fine art",
      subject: { ...MEERA_RLM_SUBJECT, pose: RLM_POSES.standing_grace },
      wardrobe: RLM_WARDROBES.crystal_cascade,
      environment: RLM_ENVIRONMENTS.candlelit_studio,
      lighting: RLM_LIGHTING.baroque_dramatic,
      camera: { focal_length: "85mm", aperture: "f/2.0", distance: "3 m", angle: "3/4 view", framing: "Full body with dramatic negative space" },
      color_grade: "Deep charcoal and warm candlelight amber",
      style: "Baroque studio, crystal jewelry as coverage",
      quality: "Phase One XF. 8K, dramatic contrast, gallery exhibition",
      figure_and_form: "Contrapposto curves adorned with cascading crystals catching light",
      skin_micro_details: rlmSkinMicroDetails,
      fabric_physics: "Crystals drape following body contours, creating waterfall light effect",
      material_properties: "Swarovski crystals refracting candlelight into prismatic display"
    }
  },
  {
    name: "Meera RLM: Crystal Reflection - Marble Sanctuary",
    data: {
      shot: "Medium portrait (3:4), luxury spa fine art",
      subject: { ...MEERA_RLM_SUBJECT, pose: RLM_POSES.seated_reflection },
      wardrobe: RLM_WARDROBES.crystal_cascade,
      environment: RLM_ENVIRONMENTS.marble_sanctuary,
      lighting: RLM_LIGHTING.candlelit_romance,
      camera: { focal_length: "80mm", aperture: "f/2.0", distance: "2.5 m", angle: "Eye level intimate", framing: "Medium body with marble and candlelight" },
      color_grade: "White marble and warm golden candlelight",
      style: "Luxury spa intimacy, crystal elegance",
      quality: "Hasselblad X2D. 8K, soft romantic quality, museum print",
      figure_and_form: "Seated curves decorated with crystal strands, reflections in marble",
      skin_micro_details: rlmSkinMicroDetails,
      fabric_physics: "Crystal strands drape over seated form, catching multiple light sources",
      material_properties: "Crystals creating prism effects on wet marble surfaces"
    }
  },

  // ROSE GOLD WEB SERIES
  {
    name: "Meera RLM: Rose Gold Web - Golden Penthouse",
    data: {
      shot: "Full body portrait (3:4), metropolitan luxury fine art",
      subject: { ...MEERA_RLM_SUBJECT, pose: RLM_POSES.standing_grace },
      wardrobe: RLM_WARDROBES.rose_gold_web,
      environment: RLM_ENVIRONMENTS.golden_penthouse,
      lighting: RLM_LIGHTING.golden_hour_stream,
      camera: { focal_length: "50mm", aperture: "f/2.8", distance: "4 m", angle: "3/4 elevated", framing: "Full body with city panorama" },
      color_grade: "Golden sunset and rose gold warmth",
      style: "Metropolitan glamour, haute couture minimalism",
      quality: "Leica S3. 8K, golden hour magic, editorial quality",
      figure_and_form: "Silhouette against sunset, rose gold threads catching dying light",
      skin_micro_details: rlmSkinMicroDetails,
      fabric_physics: "Ultra-fine metallic threads nearly invisible, creating web of light",
      material_properties: "Rose gold threads refracting sunset into warm glow patterns"
    }
  },
  {
    name: "Meera RLM: Rose Gold Recline - Silk Canopy",
    data: {
      shot: "Full body portrait (3:4), romantic bedroom fine art",
      subject: { ...MEERA_RLM_SUBJECT, pose: RLM_POSES.reclining_hourglass },
      wardrobe: RLM_WARDROBES.rose_gold_web,
      environment: RLM_ENVIRONMENTS.silk_canopy,
      lighting: RLM_LIGHTING.diffused_ethereal,
      camera: { focal_length: "85mm", aperture: "f/1.8", distance: "3 m", angle: "Elevated 45 degrees", framing: "Full reclining body with canopy" },
      color_grade: "Cream and rose gold, soft romantic tones",
      style: "Intimate bedroom, romantic vulnerability",
      quality: "Hasselblad X2D. 8K, soft focus background, magazine quality",
      figure_and_form: "Dramatic hourglass curve emphasized in recline, web pattern highlighting form",
      skin_micro_details: rlmSkinMicroDetails,
      fabric_physics: "Delicate web pattern conforms to reclining curves",
      material_properties: "Rose gold threads catching fairy light glow from canopy"
    }
  },

  // SINGLE LACE PANEL SERIES
  {
    name: "Meera RLM: Lace Veil Venus - Venetian Boudoir",
    data: {
      shot: "Full body portrait (3:4), baroque boudoir fine art",
      subject: { ...MEERA_RLM_SUBJECT, pose: RLM_POSES.venus_awakening },
      wardrobe: RLM_WARDROBES.single_lace_panel,
      environment: RLM_ENVIRONMENTS.venetian_boudoir,
      lighting: RLM_LIGHTING.rembrandt_triangle,
      camera: { focal_length: "80mm", aperture: "f/2.0", distance: "3 m", angle: "3/4 elevated classical", framing: "Full body with baroque setting" },
      color_grade: "Rich burgundy and ivory lace, warm amber",
      style: "Renaissance boudoir, Titian Venus reference",
      quality: "Phase One IQ4. 8K, painterly quality, museum collection",
      figure_and_form: "Classical Venus pose with single lace panel as artistic coverage",
      skin_micro_details: rlmSkinMicroDetails,
      fabric_physics: "Chantilly lace drapes naturally over curves, delicate and organic",
      material_properties: "French lace with intricate floral pattern, near-transparent ivory"
    }
  },
  {
    name: "Meera RLM: Lace Goddess - Natural Grotto",
    data: {
      shot: "Full body portrait (3:4), nature goddess fine art",
      subject: { ...MEERA_RLM_SUBJECT, pose: RLM_POSES.kneeling_goddess },
      wardrobe: RLM_WARDROBES.single_lace_panel,
      environment: RLM_ENVIRONMENTS.natural_grotto,
      lighting: RLM_LIGHTING.diffused_ethereal,
      camera: { focal_length: "50mm", aperture: "f/2.8", distance: "3.5 m", angle: "Low reverent angle", framing: "Full body with cave and pool" },
      color_grade: "Natural stone and warm golden light accents",
      style: "Primordial goddess, nature sanctuary",
      quality: "Hasselblad H6D. 8K, natural organic beauty, fine art print",
      figure_and_form: "Kneeling goddess form with lace as ritual veil element",
      skin_micro_details: rlmSkinMicroDetails,
      fabric_physics: "Lace catches dappled light through rock openings",
      material_properties: "Ivory lace contrasting with bronze skin and natural stone"
    }
  },

  // PEARL STRAND SERIES
  {
    name: "Meera RLM: Pearl Elegance - Marble Sanctuary",
    data: {
      shot: "Medium body portrait (3:4), classical luxury fine art",
      subject: { ...MEERA_RLM_SUBJECT, pose: RLM_POSES.seated_reflection },
      wardrobe: RLM_WARDROBES.pearl_strand,
      environment: RLM_ENVIRONMENTS.marble_sanctuary,
      lighting: RLM_LIGHTING.candlelit_romance,
      camera: { focal_length: "85mm", aperture: "f/2.0", distance: "2.5 m", angle: "3/4 intimate", framing: "Medium body with marble and candles" },
      color_grade: "Pearl white and warm marble, candlelight glow",
      style: "Renaissance luxury, Vermeer lighting reference",
      quality: "Leica S3. 8K, luminous pearl quality, gallery exhibition",
      figure_and_form: "Seated elegance with pearl strand as sole adornment",
      skin_micro_details: rlmSkinMicroDetails,
      fabric_physics: "Pearl strand drapes with natural weight and movement",
      material_properties: "Lustrous freshwater pearls with iridescent glow catching candlelight"
    }
  },
  {
    name: "Meera RLM: Pearl Odalisque - Candlelit Studio",
    data: {
      shot: "Full body portrait (3:4), dramatic studio fine art",
      subject: { ...MEERA_RLM_SUBJECT, pose: RLM_POSES.odalisque_mystery },
      wardrobe: RLM_WARDROBES.pearl_strand,
      environment: RLM_ENVIRONMENTS.candlelit_studio,
      lighting: RLM_LIGHTING.caravaggio_chiaroscuro,
      camera: { focal_length: "80mm", aperture: "f/2.0", distance: "3 m", angle: "Eye level dramatic", framing: "Full reclining body with dramatic shadows" },
      color_grade: "Deep charcoal and luminous pearl highlights",
      style: "Baroque studio, Ingres Odalisque with pearl adornment",
      quality: "Phase One XF. 8K, dramatic chiaroscuro, museum masterpiece",
      figure_and_form: "S-curve odalisque with pearl strand as minimal elegant coverage",
      skin_micro_details: rlmSkinMicroDetails,
      fabric_physics: "Pearls follow body contours in dramatic recline",
      material_properties: "Pearls glowing against deep shadows, luminous accents"
    }
  }
];

// Export all concepts
export const allMeeraRLMUltraConcepts = meeraRLMUltraConcepts;

// Quick access by category
export const rlmCrystallineConcepts = meeraRLMUltraConcepts.filter(c => c.name.includes('Crystalline'));
export const rlmSilkConcepts = meeraRLMUltraConcepts.filter(c => c.name.includes('Silk'));
export const rlmCrystalCascadeConcepts = meeraRLMUltraConcepts.filter(c => c.name.includes('Crystal'));
export const rlmRoseGoldConcepts = meeraRLMUltraConcepts.filter(c => c.name.includes('Rose Gold'));
export const rlmLaceConcepts = meeraRLMUltraConcepts.filter(c => c.name.includes('Lace'));
export const rlmPearlConcepts = meeraRLMUltraConcepts.filter(c => c.name.includes('Pearl'));
