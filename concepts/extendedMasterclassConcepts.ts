import type { PromptData } from '../types';
import type { ArtisticConcept } from './concepts';

/**
 * Extended Masterclass Collection Concepts
 * All artistic concepts from VIP Underground through various premium series
 * Auto-fills all prompt fields when selected in the concept selector
 */

// Default hyper-realistic details
const defaultSkinMicroDetails = "Authentic, high-resolution skin texture with natural pores, subtle variations in skin tone, and realistic luminosity. Visible skin pores with fine vellus hair catching light naturally. Matte natural finish, NO artificial oily sheen.";
const defaultFabricPhysics = "Fabric drapes naturally with realistic weight and movement, creating genuine creases and folds. Every thread and weave visible upon close inspection.";
const defaultMaterialProperties = "Materials have authentic texture and light response - mesh reveals form beneath, lace shows intricate pattern depth, velvet absorbs light with rich depth.";

// ═══════════════════════════════════════════════════════════════════════════════
// INDIAN HOURGLASS MUSE - Base Model Definition
// ═══════════════════════════════════════════════════════════════════════════════

const INDIAN_HOURGLASS_SUBJECT = {
  variant: `Stunning Indian fashion muse, 5'8" tall, fit athletic voluptuous hourglass figure with dramatic sculptural curves, bust 37DD", cinched waist 27", wide rounded hips 40", sun-kissed bronze complexion with natural matte finish, visible skin pores and authentic texture, striking Indian features with captivating dark magnetic gaze, full sensual lips, dramatic high cheekbones, long flowing jet-black hair in natural waves, age 26, commanding presence`,
  pose: "",
  hair_color: "jet black",
  hair_style: "long flowing waves with natural tousled texture",
  skin_finish: "Natural matte finish with authentic texture",
  hand_and_nail_details: "Elegant natural manicure, graceful hand positioning",
  tattoos: "none",
  piercings: "subtle gold ear studs",
  body_art: "none",
  nail_art: "Natural nude polish",
  high_heels: "as appropriate for wardrobe"
};

// ═══════════════════════════════════════════════════════════════════════════════
// VIP UNDERGROUND GOSSAMER COLLECTION
// ═══════════════════════════════════════════════════════════════════════════════

export const vipUndergroundConcepts: ArtisticConcept[] = [
  {
    name: "VIP Underground: Architectural Mesh - Noir Lounge",
    data: {
      shot: "Full body portrait (3:4), cinematic noir fine art",
      subject: {
        ...INDIAN_HOURGLASS_SUBJECT,
        pose: "Reclining on curved velvet sofa, one leg extended, dramatic S-curve, intense gaze at camera"
      },
      wardrobe: "High-fashion architectural mesh bodysuit in midnight black, geometric grid pattern with strategic opacity variations, sheer mesh panels revealing sculptural form beneath, structured bodice with underwire silhouette",
      environment: "Underground VIP lounge with deep charcoal walls, luxurious curved velvet sofa in rich burgundy, minimalist concrete floor, dramatic overhead spotlight creating pool of light, exposed industrial ceiling with black pipes",
      lighting: "Dramatic single spotlight from above creating theatrical pool of light, deep shadows in lounge depths, warm amber accent from wall neon strip",
      camera: { focal_length: "85mm", aperture: "f/1.4", distance: "3 m", angle: "Low angle dramatic", framing: "Full body with lounge setting" },
      color_grade: "Cinematic noir with warm skin tones against deep blacks",
      style: "Helmut Newton meets Peter Lindbergh, underground club royalty",
      quality: "Hasselblad X2D 100C, Zeiss Otus 85mm f/1.4. 8K resolution with exceptional tonal depth",
      figure_and_form: "Hourglass silhouette sculpted by dramatic lighting against velvet and concrete",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Architectural mesh conforming to curves, geometric patterns catching spotlight",
      material_properties: "Midnight mesh against burgundy velvet, skin glowing in single light source"
    }
  },
  {
    name: "VIP Underground: Gossamer Lace - Private Floor",
    data: {
      shot: "Full body portrait (3:4), intimate fine art boudoir",
      subject: {
        ...INDIAN_HOURGLASS_SUBJECT,
        pose: "Artistic recline on cream fur throw, body in elegant S-curve, one arm raised adjusting hair, head tilted back"
      },
      wardrobe: "Delicate French Chantilly lace bodice in champagne ivory, gossamer-thin translucent fabric with intricate floral patterns, structured underwire cups with sheer lace overlay, high-cut French leg design",
      environment: "Intimate private room with polished concrete floor, plush cream faux fur throw, dark textured walls with subtle venetian plaster, low warm lighting from recessed wall sconces, single dramatic shaft of light from above",
      lighting: "Low warm lighting from wall sconces creating intimate atmosphere, single shaft of light from above for drama, candles in background for romantic accent",
      camera: { focal_length: "85mm", aperture: "f/1.4", distance: "2.5 m", angle: "Elevated intimate", framing: "Full body on fur throw" },
      color_grade: "Warm amber with cream and champagne tones",
      style: "Paolo Roversi ethereal beauty meets raw intimacy",
      quality: "Phase One IQ4 150MP. 8K museum quality with exceptional skin detail",
      figure_and_form: "Sculptural curves defined by gossamer lace against soft fur",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Gossamer lace so fine skin texture shows through, fabric catching warm light",
      material_properties: "Champagne lace against cream fur, concrete and venetian plaster textures"
    }
  },
  {
    name: "VIP Underground: Crystalline Mesh - VIP Chamber",
    data: {
      shot: "Full body portrait (3:4), premium exclusive photography",
      subject: {
        ...INDIAN_HOURGLASS_SUBJECT,
        pose: "Kneeling on white sheets, sitting back on heels, arms raised above head in worship pose, head tilted back with serene expression"
      },
      wardrobe: "Two-piece crystalline mesh set in silver-gray, micro-mesh bralette with geometric underwire structure, matching high-waisted mesh brief with sheer panels, fabric embedded with tiny crystal particles catching light, architectural seaming creating diamond patterns",
      environment: "Exclusive VIP chamber with low platform bed, crisp white sheets with charcoal silk pillows, dark matte walls with integrated LED strip lighting, industrial exposed brick accent wall, intimate ambient lighting in warm tones",
      lighting: "Warm ambient LED lighting creating soft glow, single candle adding romantic accent, crystalline mesh catching and refracting light",
      camera: { focal_length: "85mm", aperture: "f/1.4", distance: "2.5 m", angle: "Frontal intimate", framing: "Full body kneeling composition" },
      color_grade: "Silver and warm amber, crystalline sparkle",
      style: "Luxury boudoir meets haute couture intimate",
      quality: "Hasselblad X2D 100C. 8K with exceptional light capture for crystalline detail",
      figure_and_form: "Hourglass silhouette adorned with crystalline mesh catching ambient light",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Crystalline mesh with embedded particles creating sparkle throughout",
      material_properties: "Silver-gray mesh with crystal particles against white sheets and dark walls"
    }
  },
  {
    name: "VIP Underground: Open Framework - Bar Counter",
    data: {
      shot: "Medium-full portrait (3:4), club noir editorial",
      subject: {
        ...INDIAN_HOURGLASS_SUBJECT,
        pose: "Seated on leather bar stool, legs crossed elegantly, one arm on marble counter, leaning back confidently, direct powerful gaze"
      },
      wardrobe: "Avant-garde open framework lingerie in matte black, architectural straps creating geometric patterns across torso, minimal triangular coverage with connector straps, body chain elements integrated with fabric framework, negative space design",
      environment: "Exclusive private bar with black marble counter, polished surface reflecting soft amber lighting, dark leather bar stool with chrome details, backlit shelving with premium spirits, industrial pendant lights overhead",
      lighting: "Soft amber lighting from bar backlit shelving, pendant lights creating pools of warm glow, marble reflecting ambient light",
      camera: { focal_length: "50mm", aperture: "f/2.0", distance: "3 m", angle: "Three-quarter bar composition", framing: "Medium-full capturing bar setting" },
      color_grade: "Warm amber with black marble and chrome accents",
      style: "Helmut Newton club noir, powerful feminine energy",
      quality: "Phase One IQ4. 8K with rich tonal depth for luxury materials",
      figure_and_form: "Powerful presence on bar stool, framework creating geometric art on form",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Open framework straps creating geometric patterns, body chain elements adding sparkle",
      material_properties: "Matte black framework against marble and chrome, leather stool texture"
    }
  },
  {
    name: "VIP Underground: Velvet Mesh Fusion - Wall Lean",
    data: {
      shot: "Full body portrait (3:4), dramatic corridor noir",
      subject: {
        ...INDIAN_HOURGLASS_SUBJECT,
        pose: "Leaning against textured concrete wall, one leg bent with foot on wall, body in dramatic S-curve, arms creating elegant lines, intense mysterious gaze"
      },
      wardrobe: "Luxurious velvet and mesh fusion bodysuit, rich burgundy velvet strategic panels at bust and hips, sheer black mesh connecting velvet sections, plunging V-neckline with velvet trim, mesh side panels revealing waist and ribs",
      environment: "Underground club corridor with textured concrete wall, dramatic side lighting creating sharp shadows, industrial metal accent panels, polished dark floor reflecting ambient light, minimalist raw aesthetic with luxury touches",
      lighting: "Dramatic side lighting creating sharp shadows on concrete, single spotlight illuminating wall section, form emerging from darkness",
      camera: { focal_length: "50mm", aperture: "f/2.0", distance: "3 m", angle: "Dramatic side angle", framing: "Full body against corridor wall" },
      color_grade: "Deep burgundy against concrete grey, dramatic shadows",
      style: "Industrial noir meets luxury boudoir",
      quality: "Hasselblad X2D. 8K with exceptional shadow detail and tonal range",
      figure_and_form: "S-curve silhouette sculpted by dramatic side lighting against raw concrete",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Velvet absorbing light at bust and hips, mesh revealing skin between",
      material_properties: "Burgundy velvet richness against industrial concrete and metal"
    }
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
// BOUNDARY INTIMACY SERIES - Seductress Archetypes
// ═══════════════════════════════════════════════════════════════════════════════

export const boundaryIntimacyConcepts: ArtisticConcept[] = [
  {
    name: "Boundary: Editorial Sensuality - Neo-Noir",
    data: {
      shot: "Full body portrait (3:4), Helmut Newton neo-noir editorial",
      subject: {
        ...INDIAN_HOURGLASS_SUBJECT,
        pose: "Dramatic S-curve pose with intense smoldering gaze, one hand on hip emphasizing hourglass, head tilted with confidence"
      },
      wardrobe: "Graphic editorial mesh piece with sheer panels, architectural lines creating geometric patterns on skin, bold cut-outs following body contours, cool cinematic aesthetic",
      environment: "Minimalist dark studio with venetian blind shadows, film noir atmosphere, dramatic negative space",
      lighting: "Neo-noir dramatic lighting with deep shadows and selective highlights, rim light defining silhouette, venetian blind shadow patterns",
      camera: { focal_length: "35mm", aperture: "f/2.0", distance: "2.5 m", angle: "Intimate viewer perspective", framing: "Full body with noir atmosphere" },
      color_grade: "Cool cinematic with desaturated palette, selective warm skin accents",
      style: "Helmut Newton neo-noir sensuality, powerful compositions",
      quality: "Phase One IQ4 150MP. 8K with dramatic tonal depth",
      figure_and_form: "Hourglass silhouette emphasized through graphic mesh patterns and architectural seaming",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Sheer mesh panels creating geometric patterns, light passing through fabric",
      material_properties: "Editorial mesh against dark studio void, venetian blind light patterns"
    }
  },
  {
    name: "Boundary: Intimate Artistry - Sculptural Form",
    data: {
      shot: "Full body portrait (3:4), Herb Ritts sculptural study",
      subject: {
        ...INDIAN_HOURGLASS_SUBJECT,
        pose: "Dramatic arched back pose revealing sculptural form, arms raised above head creating elegant lines, serene artistic expression"
      },
      wardrobe: "Architectural bodysuit with transparent mesh elements, geometric straps creating negative space, minimal strategic coverage highlighting curves",
      environment: "Pure black void with single dramatic light source, gallery-quality fine art setting, form emerging from absolute darkness",
      lighting: "Sculptural studio lighting with dramatic side light, chiaroscuro effect defining every contour, single powerful source",
      camera: { focal_length: "85mm", aperture: "f/2.8", distance: "3 m", angle: "Sculptural composition", framing: "Full body as living sculpture" },
      color_grade: "Warm cinematic with glowing highlights and rich shadows",
      style: "Herb Ritts sculptural form studies, geometric composition, body as architecture",
      quality: "Medium format. 8K gallery exhibition quality",
      figure_and_form: "Sculptural framework with geometric straps revealing hourglass form through negative space",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Geometric straps creating architectural framework on skin",
      material_properties: "Transparent mesh and geometric straps against pure black void"
    }
  },
  {
    name: "Boundary: High Concept Seduction - Boudoir",
    data: {
      shot: "Full body portrait (3:4), Peter Lindbergh raw intimacy",
      subject: {
        ...INDIAN_HOURGLASS_SUBJECT,
        pose: "Elegant reclining pose on silk fabrics, one knee raised showing sculpted thigh, arms creating artistic frame, intimate bedroom gaze"
      },
      wardrobe: "Minimalist architectural single-line design with strategic draping, gossamer fabric with artistic coverage, haute couture intimate piece in champagne gold",
      environment: "Luxurious private boudoir with silk sheets in champagne gold, warm ambient glow, intimate sanctuary atmosphere",
      lighting: "Peter Lindbergh natural soft lighting with high contrast, raw intimacy, beautiful skin texture emphasized",
      camera: { focal_length: "85mm", aperture: "f/1.8", distance: "2.5 m", angle: "Intimate bedroom perspective", framing: "Full body reclining on silk" },
      color_grade: "High contrast with warm skin tones emerging from champagne silk",
      style: "Peter Lindbergh raw intimacy, powerful simplicity, emotional connection",
      quality: "Leica M11 Monochrom. 8K with profound intimate quality",
      figure_and_form: "Pure graphic lines with hourglass silhouette sculpted by light, shadow, and minimal straps",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Gossamer fabric draping strategically, silk sheets pooling naturally",
      material_properties: "Champagne gossamer against champagne silk, warm intimate tones"
    }
  },
  {
    name: "Boundary: Maximum Expression - Odalisque",
    data: {
      shot: "Full body portrait (3:4), classical fine art composition",
      subject: {
        ...INDIAN_HOURGLASS_SUBJECT,
        pose: "Classical odalisque-inspired recline, showing full silhouette from side, one arm supporting head, rounded curves prominently displayed"
      },
      wardrobe: "Ultra-minimal mesh foundation with delicate gold chain accents, strategic shadow coverage, artistic fabric draping across intimate areas",
      environment: "Renaissance-inspired setting with rich velvet draping, dark luxurious backdrop, timeless classical atmosphere",
      lighting: "Classical painting lighting with warm golden tones, Rembrandt-style shadows, museum-quality illumination",
      camera: { focal_length: "85mm", aperture: "f/2.0", distance: "3 m", angle: "Classical side composition", framing: "Full figure odalisque pose" },
      color_grade: "Warm natural tones with glowing highlights, silver gelatin print aesthetic",
      style: "Helmut Newton boldness meets fine art, museum quality composition",
      quality: "Hasselblad 907X. 8K museum collection standard",
      figure_and_form: "Natural hourglass sculpted by delicate body chains and minimal adornments",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Delicate gold chains draping naturally, fabric flowing with pose",
      material_properties: "Gold chains against velvet draping, classical Renaissance materials"
    }
  },
  {
    name: "Boundary: Pure Artistry - Form Study",
    data: {
      shot: "Full body portrait (3:4), Edward Weston form study",
      subject: {
        ...INDIAN_HOURGLASS_SUBJECT,
        pose: "Standing profile showing complete hourglass silhouette, back arched dramatically, looking over shoulder with transcendent expression"
      },
      wardrobe: "Conceptual art wardrobe using shadow and silk as coverage, strategic light placement creating natural modesty, artistic fabric cascade",
      environment: "Pure black void with single shaft of golden light, fine art studio, timeless museum setting",
      lighting: "Old Master painting lighting with dramatic chiaroscuro, form emerging from pure darkness, sculptural illumination",
      camera: { focal_length: "85mm", aperture: "f/1.4", distance: "3 m", angle: "Profile silhouette", framing: "Full figure emerging from darkness" },
      color_grade: "Rich warm tones like classical paintings, dramatic black and white with velvety blacks",
      style: "Bill Brandt surreal nudes, Edward Weston form studies, Old Master painting lighting",
      quality: "Medium format. 8K fine art gallery standard",
      figure_and_form: "Form sculpted purely by light and shadow with silk draping, hourglass emerges from darkness",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Silk used as artistic draping, light and shadow as primary coverage",
      material_properties: "Silk catching single light shaft against pure black void"
    }
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
// EXECUTIVE MUSE STRATEGY VARIANTS
// ═══════════════════════════════════════════════════════════════════════════════

export const executiveMuseConcepts: ArtisticConcept[] = [
  {
    name: "Executive Muse: Cinematic Tableau",
    data: {
      shot: "Full body portrait (3:4), hyperrealistic cinematic tableau",
      subject: {
        ...INDIAN_HOURGLASS_SUBJECT,
        pose: "Reclining sensuously on modern office chaise, one leg bent beneath, other extended, one arm traces backrest, other rests on midriff, smile a whisper of intimate poise"
      },
      wardrobe: "Undone silk mesh blouse in charcoal parted to reveal delicate black lace beneath, high-waisted avant-garde mesh lower piece loosened, draping minimally over bust and thighs in poetic lace veils",
      environment: "Private executive haven with contemporary art, warm accents, after-hours hush, sophisticated private room",
      lighting: "Lindbergh-inspired natural softness, even and flattering, celebrating unretouched beauty in boudoir intimacy",
      camera: { focal_length: "35mm", aperture: "f/2.0", distance: "2.5 m", angle: "High-angle intimate view", framing: "Full body with chaise below" },
      color_grade: "Warm authentic tones with soft shadows, cinematic depth",
      style: "Museum-worthy fine art composition, Lindbergh personal boudoir artistry",
      quality: "Phase One IQ4 150MP. 8K with unparalleled depth and tonal subtlety",
      figure_and_form: "Fit athletic hourglass with dramatic curves showcased in after-hours relaxation",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Silk wrinkles naturally, tailored reveals through open curves, mesh and lace palette",
      material_properties: "Charcoal silk mesh and black lace on upholstered office comfort"
    }
  },
  {
    name: "Executive Muse: Editorial Vogue",
    data: {
      shot: "Full body portrait (3:4), luxurious fashion editorial",
      subject: {
        ...INDIAN_HOURGLASS_SUBJECT,
        pose: "Same reclining chaise pose with confident editorial energy, direct gaze at camera"
      },
      wardrobe: "Undone silk mesh blouse in charcoal with delicate black lace beneath, high-waisted avant-garde mesh lower piece, executive after-hours aesthetic",
      environment: "Private executive haven with contemporary art, sophisticated interior, editorial setting",
      lighting: "Refined studio radiance with artful contrasts, fashion editorial quality",
      camera: { focal_length: "90mm", aperture: "f/2.8", distance: "2.5 m", angle: "Editorial composition", framing: "Full body fashion editorial" },
      color_grade: "Premier publication color grading, sophisticated warmth",
      style: "Vogue editorial, luxurious fashion capture",
      quality: "Hasselblad X2D with 90mm lens. 8K with exquisite clarity",
      figure_and_form: "Editorial hourglass presentation, fashion-forward curves",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Editorial fabric presentation, silk and lace interplay",
      material_properties: "Charcoal silk and black lace with editorial finish"
    }
  },
  {
    name: "Executive Muse: Intimate Boudoir",
    data: {
      shot: "Full body portrait (3:4), tender boudoir fine art",
      subject: {
        ...INDIAN_HOURGLASS_SUBJECT,
        pose: "Gentle intimate reclining pose, soft expression, vulnerable connection with viewer"
      },
      wardrobe: "Same silk mesh and lace executive wardrobe in after-hours dishevelment",
      environment: "Private executive haven transformed into intimate sanctuary, warm candlelike atmosphere",
      lighting: "Gentle organic light evoking canvas-like richness, soft focus, profound intimacy",
      camera: { focal_length: "50mm", aperture: "f/0.95", distance: "2 m", angle: "Intimate close perspective", framing: "Full body with emotional resonance" },
      color_grade: "Canvas-like richness in hues, soft warm tones",
      style: "Tender boudoir fine art, organic gentle mood",
      quality: "Leica M11 Monochrom with Noctilux 50mm f/0.95. 8K with profound intimacy",
      figure_and_form: "Soft intimate presentation of hourglass curves",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Fabric softly disheveled, natural intimate state",
      material_properties: "Silk and lace in tender intimate light"
    }
  },
  {
    name: "Executive Muse: Artistic Visionary",
    data: {
      shot: "Full body portrait (3:4), exquisite fine art exploration",
      subject: {
        ...INDIAN_HOURGLASS_SUBJECT,
        pose: "Dramatic artistic pose echoing Newton and Leibovitz visionary styles"
      },
      wardrobe: "Executive silk mesh and lace ensemble, dramatically styled",
      environment: "Private executive space as artist's canvas, dramatic atmospheric setting",
      lighting: "Dramatic chiaroscuro sculpting ethereal forms, supreme artistic finesse",
      camera: { focal_length: "85mm", aperture: "f/2.0", distance: "3 m", angle: "Artistic dramatic", framing: "Full body as artistic statement" },
      color_grade: "Gallery excellence color grading, dramatic tonal range",
      style: "Helmut Newton and Annie Leibovitz visionary fusion",
      quality: "Gallery exhibition standard. 8K elevated to gallery excellence",
      figure_and_form: "Ethereal forms sculpted by dramatic chiaroscuro",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Fabric as artistic element, dramatic draping",
      material_properties: "Executive fabrics under artistic lighting conditions"
    }
  },
  {
    name: "Executive Muse: Romantic Reverie",
    data: {
      shot: "Full body portrait (3:4), romantic fine art reverie",
      subject: {
        ...INDIAN_HOURGLASS_SUBJECT,
        pose: "Soft passionate pose with graceful elegance, romantic expression"
      },
      wardrobe: "Executive silk mesh and lace worn with romantic softness",
      environment: "Private executive haven with warm romantic atmosphere, candlelike warmth",
      lighting: "Candle-like warmth casting tender highlights, romantic soft glow",
      camera: { focal_length: "85mm", aperture: "f/1.4", distance: "2.5 m", angle: "Romantic composition", framing: "Full body with emotional resonance" },
      color_grade: "Warm romantic tones, velvety bokeh quality",
      style: "Romantic fine art, soft passion and grace",
      quality: "Nikon Z9 with 85mm f/1.4. 8K with velvety bokeh",
      figure_and_form: "Romantic presentation of feminine curves",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Fabric in soft romantic drape",
      material_properties: "Silk and lace under warm romantic lighting"
    }
  },
  {
    name: "Executive Muse: Minimalist Pure",
    data: {
      shot: "Full body portrait (3:4), stark minimalist composition",
      subject: {
        ...INDIAN_HOURGLASS_SUBJECT,
        pose: "Pure form essence, minimalist elegant pose focusing on silhouette"
      },
      wardrobe: "Executive ensemble reduced to essential elements, architectural minimalism",
      environment: "Private executive space with clean minimalist aesthetic",
      lighting: "Clean diffused light stripping away excess, pure form illumination",
      camera: { focal_length: "50mm", aperture: "f/1.2", distance: "3 m", angle: "Unadorned precision", framing: "Full body pure minimalist" },
      color_grade: "Clean neutral tones, precise color accuracy",
      style: "Stark minimalist, pure form and essence",
      quality: "Sony A1 with 50mm f/1.2. 8K with razor-sharp precision",
      figure_and_form: "Pure hourglass form stripped to essence",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Minimal fabric, clean lines",
      material_properties: "Essential executive materials only"
    }
  },
  {
    name: "Executive Muse: Sculptural Form",
    data: {
      shot: "Full body portrait (3:4), sculptural fine art study",
      subject: {
        ...INDIAN_HOURGLASS_SUBJECT,
        pose: "Body as living marble, sculptural artistic pose with monumental presence"
      },
      wardrobe: "Executive silk mesh and lace as sculptural elements",
      environment: "Private executive space transformed into sculpture gallery",
      lighting: "Monumental lighting accentuating contours and textures, sculptural definition",
      camera: { focal_length: "85mm", aperture: "f/2.8", distance: "3 m", angle: "Monumental scale", framing: "Full body as sculpture" },
      color_grade: "Sculptural tonal range, marble-like quality",
      style: "Sculptural fine art, form as living marble",
      quality: "Pentax 645Z medium format. 8K with monumental scale and fidelity",
      figure_and_form: "Living sculpture, form treated as art object",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Fabric as sculptural draping element",
      material_properties: "Executive fabrics with sculptural light treatment"
    }
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
// NEXUS MASTERCLASS SERIES
// ═══════════════════════════════════════════════════════════════════════════════

export const nexusMasterclassConcepts: ArtisticConcept[] = [
  // OBSIDIAN TEMPLE SERIES
  {
    name: "Nexus: Obsidian Temple - Haveli Courtyard",
    data: {
      shot: "Full body portrait (3:4), sacred architectural photography",
      subject: {
        ...INDIAN_HOURGLASS_SUBJECT,
        variant: `${INDIAN_HOURGLASS_SUBJECT.variant}, small lotus shoulder tattoo, delicate gold belly chain, refined classical Indian beauty with subtle gold nose ring`,
        pose: "Standing in divine light beam like deity manifest, body creating classical tribhanga curve, one hand touching carved pillar, head tilted back catching golden light"
      },
      wardrobe: "Antique gold tissue silk drape worn as sculptural element, traditional fabric cascading from shoulder to floor revealing one side completely, hammered brass jewelry adorning neck and waist, bare feet with gold anklets",
      environment: "Abandoned Haveli courtyard at dusk, crumbling ornate plaster walls with exposed ancient brick, single shaft of golden light through broken roof creating divine spotlight, dust particles dancing in beam, weathered carved stone pillars",
      lighting: "Single shaft of warm golden light from above creating divine chiaroscuro, deep obsidian shadows, sacred geometry of light and dark",
      camera: { focal_length: "50mm", aperture: "f/4.0", distance: "4 m", angle: "Sacred composition", framing: "Full body in architectural frame" },
      color_grade: "Ancient gold and deep shadows, sacred warmth",
      style: "Sacred feminine power, goddess incarnate, timeless heritage beauty",
      quality: "Phase One IQ4 150MP, Schneider 110mm f/2.8. 8K museum quality",
      figure_and_form: "Classical tribhanga curve silhouetted against sacred architecture",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Gold tissue silk cascading with sculptural drape",
      material_properties: "Antique gold silk against weathered stone and ancient brick"
    }
  },
  {
    name: "Nexus: Obsidian Temple - Stepwell Sanctuary",
    data: {
      shot: "Full body portrait (3:4), mystical emergence photography",
      subject: {
        ...INDIAN_HOURGLASS_SUBJECT,
        pose: "Emerging from water at stepwell edge, body half-submerged, dramatic arch of back as she rises, water droplets on bronze skin catching light"
      },
      wardrobe: "Sheer chanderi silk with intricate gold zari border, fabric wet and clinging from stepwell water, traditional draping revealing sculptural form beneath translucent layers, oxidized silver body chains",
      environment: "Hidden underground stepwell chamber, geometric water reflections on carved stone ceiling, ancient pillars descending into darkness, subterranean intimacy with mystical atmosphere",
      lighting: "Reflected light from water creating dancing patterns on stone and skin, underwater luminescence, deep shadows in recesses",
      camera: { focal_length: "35mm", aperture: "f/2.8", distance: "3 m", angle: "Emergence composition", framing: "Full body rising from water" },
      color_grade: "Water blues and stone grays with bronze skin warmth",
      style: "Emergence and rebirth, water goddess rising, ancient ritual beauty",
      quality: "Hasselblad X2D. 8K with exceptional water reflection detail",
      figure_and_form: "Emergence pose revealing complete form through wet translucent fabric",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Wet chanderi clinging to form, floating on water surface",
      material_properties: "Wet silk transparency against ancient stone and water"
    }
  },
  // MONSOON NOIR SERIES
  {
    name: "Nexus: Monsoon Noir - Rooftop Rain",
    data: {
      shot: "Full body portrait (3:4), urban storm photography",
      subject: {
        ...INDIAN_HOURGLASS_SUBJECT,
        pose: "Standing in flooded terrace with head thrown back, arms spread catching rain, water streaming down body, fabric completely molded to hourglass form, ecstatic surrender"
      },
      wardrobe: "Rain-soaked white cotton shirt becoming completely transparent clinging to every curve, high-waisted black mesh bottom barely visible through water, barefoot in the urban lake",
      environment: "Rain-flooded penthouse terrace at night, ankle-deep water reflecting city lights like scattered diamonds, streaming sheer curtains billowing in storm wind, lightning illuminating skyline",
      lighting: "Lightning flash freezing the moment, neon city lights reflecting in water surface, rain creating silver streaks in exposure",
      camera: { focal_length: "35mm", aperture: "f/2.0", distance: "4 m", angle: "Wide storm capture", framing: "Full body with city storm backdrop" },
      color_grade: "Urban neon with silver rain streaks, dramatic storm palette",
      style: "Urban goddess, storm surrender, liberation in rain",
      quality: "Canon EOS R5. 8K with exceptional rain/light capture",
      figure_and_form: "Complete hourglass revealed through rain-soaked transparent fabric",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Rain-soaked cotton completely molded to form, mesh barely visible",
      material_properties: "Wet transparent cotton against rain, city lights, and storm"
    }
  },
  {
    name: "Nexus: Monsoon Noir - Neon Alley",
    data: {
      shot: "Full body portrait (3:4), cinematic noir rain photography",
      subject: {
        ...INDIAN_HOURGLASS_SUBJECT,
        pose: "Looking at her reflection in rain puddle creating duality composition, one knee bent, leaning against graffitied wall, mysterious film noir expression"
      },
      wardrobe: "Wet-look metallic mini dress in silver, water beading on PVC-like surface, sheer rain coat worn open revealing everything beneath, high heels creating ripples in puddles",
      environment: "Rain-slicked urban alleyway with neon signs in Hindi and English, puddles reflecting colored lights, steam rising from grates, cinematic noir atmosphere",
      lighting: "Neon signs casting colored glow through rain, pink and blue reflections on wet skin, noir shadows under umbrella rim",
      camera: { focal_length: "50mm", aperture: "f/1.8", distance: "3 m", angle: "Noir reflection composition", framing: "Full body with puddle reflection" },
      color_grade: "Neon pink and blue against noir shadows",
      style: "Urban mystery, rain-washed seduction, night city dreams",
      quality: "Sony A1. 8K with exceptional neon and reflection capture",
      figure_and_form: "Hourglass silhouette doubled in puddle reflection",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Water beading on metallic PVC, sheer coat revealing everything",
      material_properties: "Silver metallic against neon reflections and rain-slicked surfaces"
    }
  },
  // CRYSTALLINE DREAMS SERIES
  {
    name: "Nexus: Crystalline Dreams - Mirror Infinity",
    data: {
      shot: "Full body portrait (3:4), infinite reflection luxury photography",
      subject: {
        ...INDIAN_HOURGLASS_SUBJECT,
        pose: "Positioned for maximum mirror multiplication, body at angle showing infinite copies receding, one pose captured from every angle simultaneously, arms creating elegant lines multiplied infinitely"
      },
      wardrobe: "Crystal and Swarovski chain harness creating geometric pattern across body, silver chains catching light in every reflection, minimal strategic coverage, body as crystal sculpture",
      environment: "Luxury hotel mirror suite with wall-to-wall mirrors creating infinite reflections, multiple versions of subject extending into infinity, silvered surfaces catching light",
      lighting: "Soft diffused hotel lighting creating luminous glow, every reflection catching different angle of light, crystalline sparkle throughout",
      camera: { focal_length: "35mm", aperture: "f/2.8", distance: "3 m", angle: "Infinity composition", framing: "Full body with infinite reflections" },
      color_grade: "Silver and crystal with warm skin tones, infinite luxury",
      style: "Infinite beauty, multiplied sensuality, luxury narcissism",
      quality: "Phase One IQ4. 8K capturing every reflection with clarity",
      figure_and_form: "Hourglass multiplied infinitely in mirror maze",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Crystal chains catching light in every reflection angle",
      material_properties: "Swarovski crystals against infinite silvered mirror surfaces"
    }
  },
  {
    name: "Nexus: Crystalline Dreams - Chandelier Rainbow",
    data: {
      shot: "Full body portrait (3:4), rainbow prism photography",
      subject: {
        ...INDIAN_HOURGLASS_SUBJECT,
        pose: "Standing directly beneath chandelier with arms raised as if conducting the light, rainbow prisms painting across bronze skin, robe falling open showing pearl-adorned figure"
      },
      wardrobe: "Sheer white silk organza robe with marabou feather trim, worn open revealing pearl string composition beneath, pearls catching rainbow light, ultimate luxury boudoir",
      environment: "Grand ballroom with massive crystal chandelier casting thousands of rainbow prisms across white walls and floor, light fractured into spectrum dancing on surfaces",
      lighting: "Crystal chandelier creating rainbow spectrum painting entire scene, prisms creating living artwork on skin, divine illumination",
      camera: { focal_length: "50mm", aperture: "f/2.0", distance: "4 m", angle: "Beneath chandelier", framing: "Full body with rainbow prisms" },
      color_grade: "Rainbow spectrum on white with warm bronze skin",
      style: "Light goddess, rainbow embodiment, crystalline transcendence",
      quality: "Hasselblad X2D. 8K capturing rainbow prism detail",
      figure_and_form: "Form painted with rainbow light, pearls catching spectrum",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "White organza catching rainbow light, feathers creating soft edges",
      material_properties: "Pearls and crystals refracting chandelier rainbow light"
    }
  },
  // VELVET UNDERGROUND SERIES
  {
    name: "Nexus: Velvet Underground - Throne Room",
    data: {
      shot: "Full body portrait (3:4), underground royalty photography",
      subject: {
        ...INDIAN_HOURGLASS_SUBJECT,
        pose: "Seated regally on velvet throne, spine arched pushing chest forward, one arm on armrest, other near throat, head tilted back, imperious confident expression, legs crossed showing thigh"
      },
      wardrobe: "Minimal burgundy velvet choker with matching velvet micro-pieces, gold chain connections creating geometric body pattern, strategic coverage only at essentials, Victorian dominance aesthetic",
      environment: "Private red velvet room with floor-to-ceiling crushed velvet walls in deep burgundy, single gold spotlight creating theatrical focus, art deco details in gold, rich mahogany furniture, crystal decanters",
      lighting: "Single gold spotlight from above creating theatrical drama, light sculpting curves with precision, deep shadows, velvet absorbing ambient light",
      camera: { focal_length: "85mm", aperture: "f/1.8", distance: "3 m", angle: "Low angle regal", framing: "Full body throne composition" },
      color_grade: "Deep burgundy with gold spotlight warmth",
      style: "Regal sensuality, underground empress, commanding presence",
      quality: "Phase One IQ4. 8K with exceptional velvet texture capture",
      figure_and_form: "Regal hourglass on velvet throne, gold chains on burgundy velvet",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Velvet micro-pieces with gold chain geometric patterns",
      material_properties: "Burgundy velvet against gold chains and mahogany throne"
    }
  },
  // ETHEREAL BLOOM SERIES
  {
    name: "Nexus: Ethereal Bloom - Botanical Sanctuary",
    data: {
      shot: "Full body portrait (3:4), botanical goddess photography",
      subject: {
        ...INDIAN_HOURGLASS_SUBJECT,
        pose: "Standing among tropical foliage, body partially obscured by large leaves, arms raised touching overhead vines, ethereal connection with nature, serene expression"
      },
      wardrobe: "Sheer green organza wrap matching foliage, fabric becoming one with leaves, minimal coverage beneath, body decorated with fresh flowers and leaves, nature as wardrobe",
      environment: "Lush botanical greenhouse conservatory, tropical plants and exotic flowers surrounding, humid glass cathedral, nature's sanctuary",
      lighting: "Soft diffused light through greenhouse glass, green reflections from foliage, humid atmosphere creating ethereal glow",
      camera: { focal_length: "85mm", aperture: "f/2.0", distance: "3 m", angle: "Natural framing", framing: "Full body among foliage" },
      color_grade: "Lush green with bronze skin warmth, botanical palette",
      style: "Botanical goddess, nature sanctuary, organic beauty",
      quality: "Hasselblad X2D. 8K with exceptional botanical detail",
      figure_and_form: "Form emerging from and merging with botanical setting",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Sheer organza blending with foliage, flowers as adornment",
      material_properties: "Green organza and fresh botanicals in humid greenhouse light"
    }
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
// PREMIUM COUCH EDITORIAL SERIES
// ═══════════════════════════════════════════════════════════════════════════════

export const premiumCouchEditorialConcepts: ArtisticConcept[] = [
  {
    name: "Premium Couch: Mesh Whispers Decolletage",
    data: {
      shot: "Full body portrait (3:4), Helmut Newton editorial",
      subject: {
        ...INDIAN_HOURGLASS_SUBJECT,
        pose: "Reclining elegantly on velvet chaise, upper body slightly elevated, one arm draped overhead emphasizing decolletage curves, head tilted back in artistic abandon"
      },
      wardrobe: "Ultra-sheer black mesh bodysuit with strategic architectural one-line coverage, delicate mesh creating gossamer veil effect across decolletage, minimal fabric strategically placed, body visible through translucent material",
      environment: "Luxurious indoor setting with elegant velvet chaise lounge in rich burgundy, sophisticated private room with warm ambient lighting, plush textures and rich fabrics, intimate boudoir atmosphere",
      lighting: "Warm golden side light caressing curves, dramatic shadows defining form, soft highlights on mesh fabric",
      camera: { focal_length: "85mm", aperture: "f/1.8", distance: "3 m", angle: "Editorial elevated", framing: "Full body on chaise" },
      color_grade: "Warm burgundy with golden skin highlights",
      style: "Helmut Newton/Annie Leibovitz visionary editorial",
      quality: "Phase One IQ4 150MP. 8K gallery excellence",
      figure_and_form: "Decolletage emphasis with bust line and graceful neck curve",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Ultra-sheer mesh creating gossamer veil effect",
      material_properties: "Black mesh against burgundy velvet, translucent revelation"
    }
  },
  {
    name: "Premium Couch: Lace Architecture Hip Focus",
    data: {
      shot: "Full body portrait (3:4), dramatic chiaroscuro editorial",
      subject: {
        ...INDIAN_HOURGLASS_SUBJECT,
        pose: "Kneeling on couch facing away, torso twisted to show profile, hands on hips, showcasing dramatic hip-to-waist ratio and glute roundness"
      },
      wardrobe: "Minimal lace high-cut bodysuit with daringly low back, architectural straps creating frame around wide hips and rounded glutes, lace barely covering essentials",
      environment: "Sophisticated private room with velvet chaise in midnight blue, warm lamp glow mixed with soft natural light through sheer curtains",
      lighting: "Side lighting emphasizing hourglass curves, shadows in hip valleys, dramatic definition",
      camera: { focal_length: "85mm", aperture: "f/2.0", distance: "3 m", angle: "Posterior three-quarter", framing: "Full body hip emphasis" },
      color_grade: "Deep blue with warm skin contrast",
      style: "Dramatic chiaroscuro sculpting ethereal forms",
      quality: "Phase One IQ4. 8K with exceptional curve definition",
      figure_and_form: "Wide hips, rounded glutes, dramatic waist definition showcased",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Architectural lace straps framing curves",
      material_properties: "Delicate lace against bronze skin and blue velvet"
    }
  },
  {
    name: "Premium Couch: Languid Mesh Goddess",
    data: {
      shot: "Full body portrait (3:4), golden hour editorial",
      subject: {
        ...INDIAN_HOURGLASS_SUBJECT,
        pose: "Fully reclined on chaise, one arm above head, one leg bent at knee creating elegant line, body stretched showing full hourglass proportions, direct confident gaze"
      },
      wardrobe: "Full-body ultra-sheer mesh bodysuit with strategic architectural panels, minimal coverage at key points, mesh revealing complete hourglass silhouette beneath",
      environment: "Luxurious boudoir with velvet chaise, warm natural light filtering through sheer curtains, intimate artistic atmosphere",
      lighting: "Golden hour warmth flooding scene, soft shadows defining every curve",
      camera: { focal_length: "85mm", aperture: "f/1.8", distance: "3 m", angle: "Full recline composition", framing: "Complete hourglass figure" },
      color_grade: "Golden warmth with soft shadows",
      style: "Museum-quality fine art photography, Mario Testino influence",
      quality: "Phase One IQ4. 8K photorealistic with authentic skin texture",
      figure_and_form: "Complete hourglass figure, bust to hip ratio, sculpted legs",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Ultra-sheer mesh revealing complete silhouette",
      material_properties: "Architectural mesh panels against warm velvet and golden light"
    }
  },
  {
    name: "Premium Couch: Shadow Venus Rising",
    data: {
      shot: "Full body portrait (3:4), contra-jour dramatic editorial",
      subject: {
        ...INDIAN_HOURGLASS_SUBJECT,
        pose: "Semi-reclined rising from couch, weight on one arm, body arched in dynamic movement, showcasing full figure from multiple angles, powerful feminine energy"
      },
      wardrobe: "Shadow nude architectural bodysuit with minimal one-line strategic coverage, nude mesh creating second-skin effect, impeccably tailored to reveal maximum form",
      environment: "Private boudoir with dramatic lighting, velvet backdrop, artistic interior with contemporary art",
      lighting: "Dramatic contra-jour backlighting creating silhouette with selective illumination",
      camera: { focal_length: "50mm", aperture: "f/2.0", distance: "3 m", angle: "Dynamic rising composition", framing: "Full figure in motion" },
      color_grade: "Silhouette with selective warm illumination",
      style: "Powerful dynamic editorial, feminine energy unleashed",
      quality: "Hasselblad X2D. 8K with exceptional backlight capture",
      figure_and_form: "Dynamic full-body pose, all curves in motion, powerful presence",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Shadow nude creating second-skin illusion",
      material_properties: "Nude mesh against dramatic backlighting"
    }
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
// CRYSTALLINE EXCLUSIVE COLLECTION
// ═══════════════════════════════════════════════════════════════════════════════

export const crystallineExclusiveConcepts: ArtisticConcept[] = [
  {
    name: "Crystalline: Original Artistic Recline",
    data: {
      shot: "Full body portrait (3:4), fine art boudoir photography",
      subject: {
        ...INDIAN_HOURGLASS_SUBJECT,
        pose: "Reclining on cream fur throw with dramatic artistic pose, body in elegant S-curve showing hourglass silhouette, one arm raised to head adjusting hair, head tilted back with eyes closed in ecstasy, torso lifted showing defined form"
      },
      wardrobe: "Silver-gray crystalline mesh two-piece lingerie set: structured mesh bralette with geometric underwire design, delicate spaghetti straps, high-waisted mesh brief with sheer translucent panels, fabric embedded with tiny crystal particles catching light, architectural seaming creating diamond patterns",
      environment: "Intimate underground VIP private room: dark charcoal-gray textured walls with venetian plaster finish, plush cream-white faux fur throw on polished concrete floor, warm amber wall sconces, candles providing romantic accent light, minimalist industrial-luxe aesthetic",
      lighting: "Warm amber wall sconces creating intimate glow, candles for romantic accent, crystalline mesh catching and refracting ambient light",
      camera: { focal_length: "85mm", aperture: "f/1.4", distance: "2.5 m", angle: "Artistic elevated", framing: "Full body on fur throw" },
      color_grade: "Warm amber with silver crystalline sparkle",
      style: "Helmut Newton and Peter Lindbergh tradition, museum-quality intimate portraiture",
      quality: "Hasselblad X2D 100C. 8K with exceptional crystal detail capture",
      figure_and_form: "Hourglass S-curve on fur with crystalline mesh adornment",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Crystalline mesh with embedded particles creating sparkle movement",
      material_properties: "Silver-gray mesh with crystals against cream fur and dark walls"
    }
  },
  {
    name: "Crystalline: Modern Odalisque",
    data: {
      shot: "Full body portrait (3:4), classical tribute photography",
      subject: {
        ...INDIAN_HOURGLASS_SUBJECT,
        pose: "Classical odalisque pose on cream fur throw, lying on side propped on one elbow, dramatic hip curve prominently displayed, looking over shoulder at camera, free arm draped elegantly along body"
      },
      wardrobe: "Silver-gray crystalline mesh two-piece set with geometric patterns, crystal particles catching candlelight, architectural diamond seaming",
      environment: "VIP private room with dark venetian plaster walls, cream faux fur throw, candles visible in soft focus background, warm intimate atmosphere",
      lighting: "Candlelight creating warm romantic glow, crystals catching flickering light, soft shadows on fur",
      camera: { focal_length: "85mm", aperture: "f/1.4", distance: "3 m", angle: "Classical odalisque", framing: "Full body side recline" },
      color_grade: "Warm candlelit amber with crystalline sparkle",
      style: "Classical odalisque reimagined, Ingres tribute",
      quality: "Phase One IQ4. 8K museum classical quality",
      figure_and_form: "Classical dramatic hip curve, complete silhouette on side",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Crystalline mesh draping with classical elegance",
      material_properties: "Crystal-embedded mesh against cream fur in candlelight"
    }
  },
  {
    name: "Crystalline: Kneeling Worship",
    data: {
      shot: "Full body portrait (3:4), devotional fine art",
      subject: {
        ...INDIAN_HOURGLASS_SUBJECT,
        pose: "Kneeling on cream fur throw with elegant posture, sitting back on heels with spine perfectly straight, arms raised above head in worship/stretch pose, showing full front torso, head tilted back with serene expression"
      },
      wardrobe: "Crystalline mesh two-piece set, geometric underwire bralette, high-waisted sheer brief, crystal particles catching light throughout",
      environment: "Dark VIP chamber with venetian plaster walls, cream fur throw, amber wall sconces, intimate private sanctuary",
      lighting: "Amber sconces creating warm uplight, crystals catching light from multiple angles, serene illumination",
      camera: { focal_length: "85mm", aperture: "f/1.4", distance: "2.5 m", angle: "Frontal worship", framing: "Full body kneeling composition" },
      color_grade: "Amber warmth with silver crystal sparkle",
      style: "Devotional beauty, worship pose fine art",
      quality: "Hasselblad X2D. 8K with exceptional pose detail",
      figure_and_form: "Full front torso revealed in worship pose, crystalline adornment",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Mesh stretched by raised arm pose, crystals catching light",
      material_properties: "Crystalline mesh against fur and dark walls in amber light"
    }
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
// VELVET INTIMACY FUSION SERIES
// ═══════════════════════════════════════════════════════════════════════════════

export const velvetIntimacyFusionConcepts: ArtisticConcept[] = [
  {
    name: "Velvet Fusion: Throne Decolletage",
    data: {
      shot: "Full body portrait (3:4), theatrical velvet photography",
      subject: {
        ...INDIAN_HOURGLASS_SUBJECT,
        pose: "Seated regally on velvet throne, spine arched back pushing chest forward, one arm draped on armrest, other hand near throat drawing attention to decolletage, head tilted back, imperious confident expression, legs crossed showing thigh"
      },
      wardrobe: "Minimal burgundy velvet choker with matching velvet micro-pieces, gold chain connections creating geometric body pattern, strategic coverage only at essentials, Victorian dominance aesthetic with contemporary boldness",
      environment: "Private red velvet room with floor-to-ceiling crushed velvet walls in deep burgundy, single gold spotlight creating theatrical focus, art deco details in gold, rich mahogany furniture, crystal decanters",
      lighting: "Single gold spotlight from above creating theatrical drama, light sculpting decolletage curves with precision, deep shadows in depth, velvet absorbing ambient light creating infinite backdrop",
      camera: { focal_length: "85mm", aperture: "f/1.8", distance: "3 m", angle: "Low angle regal", framing: "Full body throne composition" },
      color_grade: "Deep burgundy with gold spotlight warmth",
      style: "Regal sensuality, underground empress, commanding decolletage display",
      quality: "Phase One IQ4. 8K with exceptional velvet and gold capture",
      figure_and_form: "Decolletage prominence, bust architecture, neck elegance, throne power",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Velvet micro-pieces with gold chain geometric patterns",
      material_properties: "Burgundy velvet and gold chains against mahogany and crystal"
    }
  },
  {
    name: "Velvet Fusion: Wine Cellar Mystery",
    data: {
      shot: "Full body portrait (3:4), candlelit cellar photography",
      subject: {
        ...INDIAN_HOURGLASS_SUBJECT,
        pose: "Leaning forward against oak barrel, arms pressing together enhancing cleavage, wine glass held near chest drawing eye to decolletage, mysterious smile, body angled to show complete bust line, one leg bent creating elegant line"
      },
      wardrobe: "Architectural French lace in wine-dark burgundy, single-line design framing curves, delicate lace barely covering essentials, negative space as design element, body visible through gossamer fabric",
      environment: "Underground wine cellar with aged oak barrels stacked to ceiling, candlelit stone arches casting dancing shadows, centuries of wine stains on ancient stone, intimate speakeasy atmosphere, wine-dark ambiance",
      lighting: "Warm candlelight flickering across decolletage, dancing shadows, wine-dark atmosphere with golden highlights on curves, chiaroscuro defining every contour",
      camera: { focal_length: "85mm", aperture: "f/1.4", distance: "2.5 m", angle: "Intimate cellar angle", framing: "Full body among barrels" },
      color_grade: "Wine-dark burgundy with candlelight gold",
      style: "Wine-dark mystery, cellar seduction, candlelit decolletage revelation",
      quality: "Hasselblad X2D. 8K with exceptional candlelight capture",
      figure_and_form: "Decolletage depth, bust enhancement through pose, lace framing",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Architectural lace creating single-line design, negative space revealing form",
      material_properties: "Wine-dark lace against oak barrels and stone in candlelight"
    }
  },
  {
    name: "Velvet Fusion: Baroque Lumbar Poetry",
    data: {
      shot: "Full body portrait (3:4), baroque sensual photography",
      subject: {
        ...INDIAN_HOURGLASS_SUBJECT,
        pose: "Standing with back to camera, silk draping from one shoulder, complete back exposed from neck to lower curve, spine creating dramatic S-curve, looking over shoulder with smoldering gaze, arms raised arranging hair"
      },
      wardrobe: "Ultra-sheer burgundy silk worn as artistic draping, fabric cascading from one shoulder revealing complete silhouette, strategic gathering only at most intimate areas, silk catching light",
      environment: "Boutique hotel penthouse in maximalist baroque style, layered velvet textures in burgundy and gold, ornate gilded mirrors, silk sheets in champagne and burgundy, opulent warmth",
      lighting: "Warm golden light cascading down spine, shadows defining muscle valleys, silk catching light creating liquid highlights, baroque warmth from multiple sources",
      camera: { focal_length: "85mm", aperture: "f/1.8", distance: "3 m", angle: "Posterior poetry", framing: "Full back exposure composition" },
      color_grade: "Baroque burgundy and gold warmth",
      style: "Baroque sensuality, silk revelation, lumbar poetry",
      quality: "Phase One IQ4. 8K with exceptional back detail and silk capture",
      figure_and_form: "Complete back exposure, spine curve, lumbar dimples, shoulder blade sculpture",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Ultra-sheer silk cascading and catching light",
      material_properties: "Burgundy silk against baroque gold and velvet"
    }
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
// PREMIUM VELVET HYBRID SERIES
// ═══════════════════════════════════════════════════════════════════════════════

export const premiumVelvetHybridConcepts: ArtisticConcept[] = [
  {
    name: "Premium Velvet: Reclining Form Study",
    data: {
      shot: "Full body portrait (3:4), classical figure study",
      subject: {
        ...INDIAN_HOURGLASS_SUBJECT,
        variant: `Captivating Indian fine art model, 5'8" tall, sculptural athletic feminine silhouette with graceful natural curves, sun-kissed bronze complexion with warm golden luminosity, body oil creating sculptural highlights, striking almond eyes with magnetic depth, long flowing jet-black hair, age 26, classical beauty with modern confidence`,
        pose: "Reclining on velvet chaise in classical pose, body creating elegant S-curve from shoulder through hip to extended leg, one arm draped above head elongating torso, expression of serene confidence"
      },
      wardrobe: "Flowing silk fabric in champagne gold used as artistic draping, fabric cascading from shoulder creating sculptural composition, strategic gathering at essential areas through natural fabric physics, silk catching light to enhance form",
      environment: "Artist's private studio with velvet draping as backdrop, warm north light filtering through, classical art references, the space where masters created their nude studies",
      lighting: "Warm north light from studio window creating soft modeling, every curve defined by gentle gradation from highlight to shadow, skin luminosity enhanced by subtle oil sheen, Rembrandt-quality chiaroscuro",
      camera: { focal_length: "85mm", aperture: "f/2.0", distance: "3 m", angle: "Classical composition", framing: "Full figure form study" },
      color_grade: "Classical warm with champagne and bronze",
      style: "Edward Weston form studies, Irving Penn sculptural portraits, Ingres and Manet tradition",
      quality: "Phase One IQ4 150MP, Schneider-Kreuznach 110mm. 8K museum-quality",
      figure_and_form: "Classical reclining figure study celebrating natural curves and proportions",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Champagne silk cascading with sculptural drape, strategic gathering",
      material_properties: "Champagne gold silk against velvet backdrop in north light"
    }
  },
  {
    name: "Premium Velvet: Standing Figure Sculpture",
    data: {
      shot: "Full body portrait (3:4), sculptural fine art",
      subject: {
        ...INDIAN_HOURGLASS_SUBJECT,
        pose: "Standing in classical contrapposto against velvet backdrop, weight on one leg creating natural hip tilt and elegant S-curve of spine, arms positioned to create elegant lines, gaze confident and direct"
      },
      wardrobe: "Body adorned only with oil creating golden highlights, light itself becoming the wardrobe, shadows providing natural modesty at intimate areas, skin as canvas, light as clothing",
      environment: "Private velvet chamber bathed in warm golden light, deep burgundy walls creating infinite depth, silk sheets in champagne, single shaft of light sculpting form from darkness",
      lighting: "Single warm spotlight from above creating sculptural drama, form emerging from velvet darkness like sculpture from stone, skin glowing with golden luminosity, dramatic chiaroscuro worthy of Caravaggio",
      camera: { focal_length: "85mm", aperture: "f/2.0", distance: "3 m", angle: "Sculptural contrapposto", framing: "Full standing figure" },
      color_grade: "Golden spotlight against velvet darkness",
      style: "Body as living sculpture, Caravaggio lighting, timeless and powerful",
      quality: "Phase One IQ4. 8K fine art photography at most elevated level",
      figure_and_form: "Classical Greek sculpture contrapposto, living marble, bronze skin",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Light and shadow as coverage, oil creating sculptural definition",
      material_properties: "Oiled bronze skin against burgundy velvet in golden spotlight"
    }
  },
  {
    name: "Premium Velvet: Profile Silhouette Study",
    data: {
      shot: "Full body portrait (3:4), silhouette form study",
      subject: {
        ...INDIAN_HOURGLASS_SUBJECT,
        pose: "Pure profile against deep velvet background, silhouette revealing complete contour of figure, natural arch of back, curve of hip, elegant line from neck to shoulder"
      },
      wardrobe: "Gossamer fabric in skin-matching tone creating veil effect, fabric so sheer it becomes suggestion rather than coverage, light passes through revealing form as shadow and highlight",
      environment: "Hidden baroque alcove with crushed velvet in wine-dark tones, gilded mirror reflecting candlelight, luxurious excess, warm amber glow",
      lighting: "Dramatic rim lighting defining silhouette from behind, form traced by light against velvet darkness, Edward Weston shell study aesthetic translated to human form",
      camera: { focal_length: "85mm", aperture: "f/1.4", distance: "3 m", angle: "Pure profile", framing: "Complete silhouette contour" },
      color_grade: "Deep velvet darkness with rim-lit silhouette",
      style: "Edward Weston shell studies translated to human form",
      quality: "Hasselblad X2D. 8K with exceptional silhouette definition",
      figure_and_form: "Complete contour from forehead to toes traced by light, every curve defined",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Gossamer veil becoming suggestion, light passing through",
      material_properties: "Skin-tone gossamer against wine-dark velvet in rim light"
    }
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
// COMBINED EXPORT - ALL EXTENDED MASTERCLASS CONCEPTS
// ═══════════════════════════════════════════════════════════════════════════════

export const allExtendedMasterclassConcepts: ArtisticConcept[] = [
  ...vipUndergroundConcepts,
  ...boundaryIntimacyConcepts,
  ...executiveMuseConcepts,
  ...nexusMasterclassConcepts,
  ...premiumCouchEditorialConcepts,
  ...crystallineExclusiveConcepts,
  ...velvetIntimacyFusionConcepts,
  ...premiumVelvetHybridConcepts
];

export default allExtendedMasterclassConcepts;
