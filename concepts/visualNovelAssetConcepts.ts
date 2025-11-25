import type { PromptData } from '../types';
import type { ArtisticConcept } from './concepts';

/**
 * Visual Novel Asset Generation Concepts
 * Pre-built concepts for generating all assets needed for the Visual Novel game
 * Based on assetManifest.ts - Chapter 1: The Golden Hour Connection
 */

// ============================================================================
// CHARACTER SPRITES - Zara (6 sprites)
// ============================================================================

export const vnSpriteNeutral: ArtisticConcept = {
  name: 'VN Sprite: Zara Neutral',
  data: {
    shot: "PHOTOREALISTIC CHARACTER PORTRAIT | Professional photography | PNG with alpha transparency | 9:16 vertical portrait",
    subject: {
      variant: "Elite Indian fit artistic model Zara, age 25, height 5'8\", versatile actress physique with dramatic curves (bust 38DD\", waist 27\", hips 39\"), fair complexion with warm undertones, long flowing black hair with natural shine, intensely expressive brown eyes, dramatic facial structure, cinematic beauty",
      pose: "Full body standing pose, weight shifted to one leg creating elegant S-curve silhouette, one hand relaxed at side, other hand lightly touching collarbone in natural gesture, neutral friendly expression with soft genuine smile, eyes looking directly at camera with warm inviting gaze, welcoming confident body language, shoulders back, chin slightly lifted",
      hair_color: "black",
      hair_style: "long flowing black hair with natural shine and movement",
      skin_finish: "Natural with soft healthy glow, fair complexion with warm undertones",
      hand_and_nail_details: "Hands relaxed and anatomically correct, graceful natural finger placement. Nails impeccably manicured with clean neutral polish reflecting soft light",
      tattoos: "none",
      piercings: "none",
      body_art: "none",
      nail_art: "Impeccably manicured, clean neutral polish",
      high_heels: "not visible"
    },
    wardrobe: "Elegant ivory silk wrap dress with subtle sheen, knee-length with gentle draping, thin gold chain necklace with small pendant, delicate gold hoop earrings, minimal jewelry emphasizing natural beauty, professional makeup with emphasis on eyes and defined lips",
    environment: "PURE TRANSPARENT BACKGROUND (alpha channel), isolated subject only, clean professional cutout with perfect edge detection, NO background elements, NO floor visible, NO props, ready for compositing over any scene background",
    lighting: "Professional 3-point studio lighting setup, soft diffused key light from front-left at 45 degrees creating gentle shadows that enhance facial structure and curves, subtle rim light from behind-right creating separation and depth, soft fill light reducing harsh shadows, even flattering illumination highlighting skin texture and fabric sheen, dramatic lighting potential showcasing fair complexion",
    camera: {
      focal_length: "85mm f/1.4",
      aperture: "f/1.8",
      distance: "2 m",
      angle: "Eye-level, full body framing from head to toe",
      framing: "Full body portrait, vertical 9:16 format, character centered, fashion editorial style"
    },
    color_grade: "Natural warm tones with professional color grading, balanced skin tones, cinematic beauty, film-like quality",
    style: "High-resolution professional fashion photography, Vogue magazine quality, commercial modeling standard, sharp focus on subject with beautiful bokeh, natural skin texture with subtle retouching, realistic lighting, film-like quality",
    quality: "Shot on Canon EOS R5, professional portrait lens. 8K resolution, razor-sharp focus, commercial quality, magazine-worthy. PNG format with alpha transparency, 1024x2048 pixels, ready for visual novel engine",
    figure_and_form: "Versatile actress physique with dramatic curves elegantly showcased by dress draping, elegant S-curve silhouette, natural confident posture",
    skin_micro_details: "Natural skin texture with soft glow, fair complexion beautifully lit, professional beauty photography standard",
    fabric_physics: "Silk dress with subtle sheen draping naturally, gentle movement suggesting life and authenticity",
    material_properties: "Ivory silk with natural luster, gold jewelry with realistic metallic sheen"
  }
};

export const vnSpriteSmile: ArtisticConcept = {
  name: 'VN Sprite: Zara Smile',
  data: {
    shot: "PHOTOREALISTIC CHARACTER PORTRAIT | Professional photography | PNG with alpha transparency | 9:16 vertical portrait",
    subject: {
      variant: "Elite Indian fit artistic model Zara, age 25, height 5'8\", versatile actress physique with dramatic curves (bust 38DD\", waist 27\", hips 39\"), fair complexion, long flowing black hair, intensely expressive brown eyes, dramatic facial structure",
      pose: "Full body standing pose, weight on one leg with hip slightly cocked, one hand at side, other hand gesturing gracefully in welcoming motion, warm genuine smile showing warmth and openness, eyes sparkling with joy and invitation, welcoming body language radiating positive energy, face lit with happiness, natural confident posture",
      hair_color: "black",
      hair_style: "long flowing with natural movement",
      skin_finish: "Warm natural glow emphasizing happiness",
      hand_and_nail_details: "Graceful welcoming gesture, impeccably manicured",
      tattoos: "none",
      piercings: "none",
      body_art: "none",
      nail_art: "Clean neutral polish",
      high_heels: "not visible"
    },
    wardrobe: "Same elegant ivory silk wrap dress, gold jewelry, professional makeup emphasizing natural beauty and warm expression",
    environment: "PURE TRANSPARENT BACKGROUND (alpha channel), isolated subject, clean cutout, NO background elements",
    lighting: "Soft studio lighting emphasizing warm expression, key light highlighting smile and eyes, creating warmth in fair complexion, gentle shadows enhancing curves, rim light creating glow effect, professional beauty lighting",
    camera: {
      focal_length: "85mm f/1.4",
      aperture: "f/1.8",
      distance: "2 m",
      angle: "Eye-level",
      framing: "Full body portrait, fashion editorial style"
    },
    color_grade: "Warm inviting tones emphasizing happiness and openness",
    style: "Vogue editorial quality, professional fashion photography, natural warmth, cinematic beauty, magazine standard",
    quality: "Canon EOS R5, professional portrait lens. PNG with alpha transparency, 1024x2048, 9:16 aspect ratio, professional modeling standard",
    figure_and_form: "Dramatic curves elegantly showcased, warm welcoming posture",
    skin_micro_details: "Fair complexion with warm glow, natural beauty lighting",
    fabric_physics: "Silk draping naturally with movement",
    material_properties: "Ivory silk with subtle sheen, gold jewelry"
  }
};

export const vnSpriteFlirty: ArtisticConcept = {
  name: 'VN Sprite: Zara Flirty',
  data: {
    shot: "PHOTOREALISTIC CHARACTER PORTRAIT | Professional photography | PNG with alpha transparency | 9:16 vertical portrait",
    subject: {
      variant: "Elite Indian fit artistic model Zara, age 25, height 5'8\", versatile actress physique with dramatic curves (bust 38DD\", waist 27\", hips 39\"), fair complexion, long flowing black hair, intensely expressive brown eyes, dramatic facial structure",
      pose: "Full body standing pose, hip cocked to one side creating S-curve, one hand on hip in confident stance, other hand playing with hair in flirtatious gesture, playful coy smile with slightly raised eyebrow, eyes with mischievous sparkle making direct eye contact, body language playful and teasing, head tilted slightly, confident sensual energy",
      hair_color: "black",
      hair_style: "long flowing, one hand playfully touching hair",
      skin_finish: "Luminous with soft glow",
      hand_and_nail_details: "One hand on hip, other playing with hair, manicured nails",
      tattoos: "none",
      piercings: "none",
      body_art: "none",
      nail_art: "Clean polish",
      high_heels: "not visible"
    },
    wardrobe: "Same elegant ivory silk wrap dress, gold jewelry, makeup emphasizing eyes and lips for flirtatious expression",
    environment: "PURE TRANSPARENT BACKGROUND (alpha channel), isolated subject, clean cutout, NO background elements",
    lighting: "Studio lighting emphasizing playful mood, key light highlighting facial expression and curves, warm inviting tones, rim light creating attractive glow, emphasizing fair complexion beautifully",
    camera: {
      focal_length: "85mm f/1.4",
      aperture: "f/1.8",
      distance: "2 m",
      angle: "Eye-level capturing playful expression",
      framing: "Full body portrait with emphasis on confident pose"
    },
    color_grade: "Warm inviting tones with playful energy",
    style: "Fashion editorial quality, playful confident beauty, professional modeling",
    quality: "Canon EOS R5, PNG with alpha transparency, 1024x2048, 9:16, professional standard",
    figure_and_form: "Dramatic curves showcased by S-curve pose, confident sensual energy",
    skin_micro_details: "Fair complexion luminous in playful lighting",
    fabric_physics: "Silk draping elegantly with pose movement",
    material_properties: "Ivory silk, gold jewelry catching light"
  }
};

export const vnSpriteShy: ArtisticConcept = {
  name: 'VN Sprite: Zara Shy',
  data: {
    shot: "PHOTOREALISTIC CHARACTER PORTRAIT | Professional photography | PNG with alpha transparency | 9:16 vertical portrait",
    subject: {
      variant: "Elite Indian fit artistic model Zara, age 25, height 5'8\", versatile actress physique with dramatic curves (bust 38DD\", waist 27\", hips 39\"), fair complexion, long flowing black hair, intensely expressive brown eyes, dramatic facial structure",
      pose: "Full body standing pose, weight on both feet creating gentle stance, shoulders slightly turned inward, one hand nervously touching other arm in protective gesture, other hand at side, shy gentle smile with slight blush, eyes cast slightly downward before meeting gaze, vulnerable body language showing softness, head slightly lowered, gentle reserved energy",
      hair_color: "black",
      hair_style: "long flowing, slightly falling forward framing face",
      skin_finish: "Soft natural with gentle blush",
      hand_and_nail_details: "Nervous gentle touch, natural graceful placement",
      tattoos: "none",
      piercings: "none",
      body_art: "none",
      nail_art: "Natural clean",
      high_heels: "not visible"
    },
    wardrobe: "Same elegant ivory silk wrap dress, minimal jewelry, natural makeup emphasizing vulnerability and softness",
    environment: "PURE TRANSPARENT BACKGROUND (alpha channel), isolated subject, clean cutout, NO background elements",
    lighting: "Soft gentle studio lighting emphasizing vulnerable mood, diffused key light creating tender atmosphere, minimal shadows for softness, warm protective feeling, highlighting natural beauty and fair complexion gently",
    camera: {
      focal_length: "85mm f/1.4",
      aperture: "f/1.8",
      distance: "2 m",
      angle: "Eye-level capturing gentle expression",
      framing: "Full body portrait with emphasis on vulnerable posture"
    },
    color_grade: "Soft warm tones with gentle romantic feeling",
    style: "Tender portrait photography, natural vulnerable beauty, emotional depth",
    quality: "Canon EOS R5, PNG with alpha transparency, 1024x2048, 9:16, soft portrait quality",
    figure_and_form: "Gentle reserved posture, natural softness",
    skin_micro_details: "Fair complexion with natural blush, soft lighting",
    fabric_physics: "Silk draping gently with reserved movement",
    material_properties: "Soft ivory silk, minimal jewelry"
  }
};

export const vnSpriteStudio: ArtisticConcept = {
  name: 'VN Sprite: Zara Studio Outfit',
  data: {
    shot: "PHOTOREALISTIC CHARACTER PORTRAIT | Professional photography | PNG with alpha transparency | 9:16 vertical portrait",
    subject: {
      variant: "Elite Indian fit artistic model Zara, age 25, height 5'8\", versatile actress physique with dramatic curves (bust 38DD\", waist 27\", hips 39\"), fair complexion, long flowing black hair, intensely expressive brown eyes, dramatic facial structure",
      pose: "Full body standing pose, confident professional model stance, weight shifted creating natural curve, one hand on hip in strong pose, other hand relaxed, confident serious expression showing professionalism, direct eye contact with intensity, powerful body language exuding competence, chin up, shoulders back, commanding presence",
      hair_color: "black",
      hair_style: "long flowing styled for professional photoshoot",
      skin_finish: "Professional matte finish",
      hand_and_nail_details: "Strong confident hand placement, professional manicure",
      tattoos: "none",
      piercings: "none",
      body_art: "none",
      nail_art: "Professional neutral",
      high_heels: "visible - professional heels"
    },
    wardrobe: "Professional photography studio outfit: fitted black turtleneck top, tailored high-waisted charcoal trousers with perfect fit, black ankle boots with low heel, minimal jewelry (small silver studs, simple watch), professional styling for photoshoot setting",
    environment: "PURE TRANSPARENT BACKGROUND (alpha channel), isolated subject, clean cutout, NO background elements",
    lighting: "Professional studio lighting emphasizing competence, key light creating strong definition, controlled shadows showing professionalism, bright even illumination, commercial photography standard lighting",
    camera: {
      focal_length: "85mm f/1.4",
      aperture: "f/2.0",
      distance: "2 m",
      angle: "Eye-level capturing professional confidence",
      framing: "Full body portrait showing complete outfit and professional stance"
    },
    color_grade: "Clean professional tones, commercial photography standard",
    style: "Professional modeling portfolio quality, commercial standard, powerful presence",
    quality: "Canon EOS R5, PNG with alpha transparency, 1024x2048, 9:16, professional modeling quality",
    figure_and_form: "Dramatic curves showcased by tailored professional outfit, powerful confident stance",
    skin_micro_details: "Professional photography finish, fair complexion in commercial lighting",
    fabric_physics: "Tailored garments fitting perfectly with professional drape",
    material_properties: "Matte black turtleneck, tailored wool-blend trousers, leather boots"
  }
};

export const vnSpriteBoudoir: ArtisticConcept = {
  name: 'VN Sprite: Zara Boudoir Outfit',
  data: {
    shot: "PHOTOREALISTIC CHARACTER PORTRAIT | Fine art boudoir photography | PNG with alpha transparency | 9:16 vertical portrait",
    subject: {
      variant: "Elite Indian fit artistic model Zara, age 25, height 5'8\", versatile actress physique with dramatic curves (bust 38DD\", waist 27\", hips 39\"), fair complexion, long flowing black hair, intensely expressive brown eyes, dramatic facial structure, cinematic beauty",
      pose: "Full body standing pose with elegant sensual energy, weight on one leg with hip elegantly cocked, one hand gently touching collarbone, other hand at side with relaxed fingers, confident sensual expression with soft inviting smile, eyes with warmth and intimacy, body language combining elegance with allure, graceful posture, natural confidence",
      hair_color: "black",
      hair_style: "long flowing loose waves cascading naturally",
      skin_finish: "Luminous natural glow",
      hand_and_nail_details: "Graceful elegant placement, manicured",
      tattoos: "none",
      piercings: "none",
      body_art: "none",
      nail_art: "Elegant neutral",
      high_heels: "not visible"
    },
    wardrobe: "Fine art boudoir ensemble: elegant ivory silk robe (short, thigh-length) loosely draped and artfully falling off one shoulder, delicate ivory lace foundation garments visible beneath (tasteful fine art aesthetic), minimal jewelry (small pendant necklace), elegant natural makeup, everything styled for fine art boudoir photography in tradition of Helmut Newton",
    environment: "PURE TRANSPARENT BACKGROUND (alpha channel), isolated subject, clean cutout, NO background elements",
    lighting: "Fine art boudoir lighting, soft dramatic chiaroscuro creating artistic shadows and highlights, key light sculpting form beautifully, rim light creating luminous glow on fair complexion, professional intimate photography lighting, museum-quality illumination",
    camera: {
      focal_length: "85mm f/1.4",
      aperture: "f/1.8",
      distance: "2 m",
      angle: "Eye-level capturing elegant sensuality",
      framing: "Full body portrait, fine art boudoir composition"
    },
    color_grade: "Warm romantic tones with fine art aesthetic, cinema-quality color grading",
    style: "Fine art boudoir photography in tradition of Helmut Newton, museum-quality intimate portraiture, tasteful elegant sensuality, artistic excellence",
    quality: "Canon EOS R5, professional portrait lens. Fine art photography standard, museum-quality. PNG with alpha transparency, 1024x2048, 9:16",
    figure_and_form: "Dramatic curves elegantly showcased by silk robe draping, artistic sensual posture, fine art aesthetic",
    skin_micro_details: "Fair complexion luminous in dramatic lighting, natural skin texture, professional retouching",
    fabric_physics: "Silk robe draping artfully with natural flow, lace with realistic texture",
    material_properties: "Ivory silk with luxurious sheen, delicate lace with fine texture"
  }
};

// ============================================================================
// BACKGROUNDS (5 backgrounds)
// ============================================================================

export const vnBgArtGallery: ArtisticConcept = {
  name: 'VN BG: Art Gallery',
  data: {
    shot: "VISUAL NOVEL BACKGROUND | Cinematic photography | 16:9 widescreen | 1920x1080px",
    subject: {
      variant: "Contemporary art gallery interior scene, NO people visible",
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
    wardrobe: "N/A - Background scene with no people",
    environment: "LOCATION: Upscale contemporary art gallery interior, modern minimalist architecture, high ceilings with track lighting, white walls with large contemporary art pieces, polished light grey concrete floors. Clear foreground for character placement (lower third empty), gallery depth extending into background, blurred figures in far background (bokeh effect), architectural lines leading eye to center",
    lighting: "TIME & LIGHTING: Golden hour (late afternoon), warm amber sunlight streaming through floor-to-ceiling windows, dramatic light rays with dust particles visible, chiaroscuro effect (high contrast light/shadow), professional color grading. ATMOSPHERE: Sophisticated upscale ambiance, warm inviting tones, artistic cultural vibe, evening cocktail event atmosphere, museum-quality space",
    camera: {
      focal_length: "35mm",
      aperture: "f/2.8",
      distance: "N/A",
      angle: "Eye level, architectural photography perspective",
      framing: "Rule of thirds composition, 16:9 widescreen format"
    },
    color_grade: "Teal and orange complementary colors, cinema-quality color grading, film-like grain texture, warm inviting golden hour tones",
    style: "TECHNICAL: NO people in foreground (reserved for sprite layer), professional architectural photography, cinema-quality color grading, film-like grain texture. DEPTH OF FIELD: Shallow DoF, foreground sharp, mid-ground slightly soft, background with beautiful bokeh blur, professional cinema lens aesthetic (f/2.8)",
    quality: "QUALITY: Commercial visual novel standard, 4K downsampled to 1080p, professional photography, Steam-release quality, Makoto Shinkai background quality. Professional architectural photography with cinematic atmosphere",
    figure_and_form: "Architectural composition with strong lines and depth",
    skin_micro_details: "N/A - Background scene",
    fabric_physics: "N/A - Background scene",
    material_properties: "Polished concrete floors with realistic reflection, matte white gallery walls, glass windows with realistic transparency and light refraction"
  }
};

export const vnBgPhotoStudio: ArtisticConcept = {
  name: 'VN BG: Photography Studio',
  data: {
    shot: "VISUAL NOVEL BACKGROUND | Professional photography | 16:9 widescreen | 1920x1080px",
    subject: {
      variant: "Professional photography studio interior, NO people visible",
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
    environment: "LOCATION: Professional photography studio interior, industrial loft aesthetic, exposed brick walls painted white, high exposed beam ceilings, polished concrete floor, studio lighting equipment visible (softboxes, C-stands, backdrop rolls), large windows with natural light, professional creative workspace. Clear foreground for character placement (lower third empty), studio depth showing equipment and workspace",
    lighting: "TIME & LIGHTING: Daytime with mixed lighting, natural daylight from large windows combined with studio strobes creating professional photography atmosphere, bright even illumination with dramatic potential, professional studio lighting setup visible. ATMOSPHERE: Creative professional workspace, energetic productive vibe, artistic photography environment",
    camera: {
      focal_length: "35mm",
      aperture: "f/2.8",
      distance: "N/A",
      angle: "Eye level, wide environmental shot",
      framing: "16:9 widescreen, architectural composition showing studio space"
    },
    color_grade: "Clean professional tones, slightly cool with warm accents from wood and brick, commercial photography aesthetic",
    style: "Professional architectural/environmental photography, commercial workspace documentation, visual novel background standard. DEPTH OF FIELD: Moderate DoF, foreground clear for sprites, mid-ground with studio equipment in focus, background softly blurred",
    quality: "Commercial visual novel quality, professional photography, 1920x1080, clean sharp details, Steam-release standard",
    figure_and_form: "Industrial loft architecture with professional equipment creating authentic studio environment",
    skin_micro_details: "N/A - Background scene",
    fabric_physics: "N/A - Background scene",
    material_properties: "Exposed white-painted brick with realistic texture, polished concrete floor, metal studio equipment with realistic materials, fabric backdrop rolls"
  }
};

export const vnBgLuxuryBedroom: ArtisticConcept = {
  name: 'VN BG: Luxury Bedroom',
  data: {
    shot: "VISUAL NOVEL BACKGROUND | Cinematic photography | 16:9 widescreen | 1920x1080px",
    subject: {
      variant: "Upscale luxury bedroom interior, NO people visible",
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
    environment: "LOCATION: Upscale luxury bedroom in modern apartment, king-sized bed with pristine white silk sheets and plush pillows, elegant tufted headboard, modern minimalist furniture (nightstands with designer lamps), floor-to-ceiling windows with sheer curtains, hardwood floors with plush area rug, tasteful artwork on walls. Clear foreground for character placement (lower third empty), bedroom depth showing luxury furnishings",
    lighting: "TIME & LIGHTING: Romantic evening/twilight, soft warm lighting from designer bedside lamps creating intimate atmosphere, gentle twilight glow from windows with city lights visible outside, dramatic chiaroscuro with soft shadows, warm inviting ambiance. ATMOSPHERE: Intimate romantic luxury, sophisticated upscale comfort, private personal space, warm sensual mood",
    camera: {
      focal_length: "35mm",
      aperture: "f/2.8",
      distance: "N/A",
      angle: "Eye level, romantic environmental shot",
      framing: "16:9 widescreen, rule of thirds with bed as focal point"
    },
    color_grade: "Warm romantic tones, rich amber and golden hues, cinematic intimate color grading, soft film-like quality",
    style: "Cinematic intimate photography, luxury lifestyle aesthetic, romantic visual novel background. DEPTH OF FIELD: Shallow DoF, foreground clear for sprites, bed and main furniture in focus, windows softly blurred with bokeh city lights",
    quality: "Premium visual novel quality, cinematic photography, 1920x1080, romantic atmosphere, film-like texture, high-end production value",
    figure_and_form: "Luxury bedroom architecture with elegant romantic composition",
    skin_micro_details: "N/A - Background scene",
    fabric_physics: "N/A - Background scene",
    material_properties: "White silk sheets with realistic sheen and folds, plush velvet headboard, polished hardwood floor, sheer curtains with translucent quality, warm lamp lighting with realistic glow"
  }
};

export const vnBgUpscaleCafe: ArtisticConcept = {
  name: 'VN BG: Upscale Cafe',
  data: {
    shot: "VISUAL NOVEL BACKGROUND | Lifestyle photography | 16:9 widescreen | 1920x1080px",
    subject: {
      variant: "Trendy upscale cafe interior, NO people visible",
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
    environment: "LOCATION: Trendy upscale cafe interior, modern sophisticated design, marble-topped tables, comfortable leather seating, exposed Edison bulb lighting, large windows with street view, polished wood floors, artistic wall decorations, espresso bar visible in background. Clear foreground for character placement (lower third empty), cafe depth showing ambiance and atmosphere",
    lighting: "TIME & LIGHTING: Late afternoon, warm natural daylight streaming through large windows, soft ambient cafe lighting from Edison bulbs, golden hour quality creating inviting atmosphere, gentle shadows. ATMOSPHERE: Sophisticated casual upscale vibe, trendy comfortable setting, warm social space, artistic coffee culture aesthetic",
    camera: {
      focal_length: "35mm",
      aperture: "f/2.8",
      distance: "N/A",
      angle: "Eye level, lifestyle environmental shot",
      framing: "16:9 widescreen, inviting composition showing cafe ambiance"
    },
    color_grade: "Warm inviting tones with cafe aesthetic, golden afternoon light, trendy lifestyle color grading, Instagram-worthy quality",
    style: "Lifestyle environmental photography, trendy cafe aesthetic, visual novel background standard. DEPTH OF FIELD: Moderate DoF, foreground clear for sprites, tables and seating in focus, background with soft bokeh",
    quality: "Commercial visual novel quality, lifestyle photography, 1920x1080, warm inviting atmosphere, professional cafe photography",
    figure_and_form: "Modern upscale cafe architecture with inviting comfortable composition",
    skin_micro_details: "N/A - Background scene",
    fabric_physics: "N/A - Background scene",
    material_properties: "Marble tabletops with realistic veining, leather seating with authentic texture, polished wood floors, warm Edison bulb glow, glass windows with street view"
  }
};

export const vnBgFashionShowroom: ArtisticConcept = {
  name: 'VN BG: Fashion Showroom',
  data: {
    shot: "VISUAL NOVEL BACKGROUND | Fashion photography | 16:9 widescreen | 1920x1080px",
    subject: {
      variant: "High-end fashion showroom interior, NO people visible",
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
    environment: "LOCATION: High-end fashion showroom/boutique interior, minimalist luxury design, pristine white walls, elegant clothing racks with designer pieces visible, modern display pedestals with accessories, large mirrors with designer frames, polished marble floors, track lighting. Clear foreground for character placement (lower third empty), showroom depth showing luxury fashion retail environment",
    lighting: "TIME & LIGHTING: Bright professional retail lighting, even illumination highlighting merchandise, track lighting creating focal points, bright clean atmosphere perfect for fashion presentation. ATMOSPHERE: Sophisticated luxury retail, high-end boutique vibe, professional fashion environment, elegant upscale shopping experience",
    camera: {
      focal_length: "35mm",
      aperture: "f/2.8",
      distance: "N/A",
      angle: "Eye level, professional retail photography",
      framing: "16:9 widescreen, clean minimalist composition"
    },
    color_grade: "Clean bright tones with luxury aesthetic, crisp professional lighting, high-end retail color grading",
    style: "Professional retail/fashion photography, luxury boutique aesthetic, visual novel background standard. DEPTH OF FIELD: Moderate DoF, foreground clear for sprites, showroom fixtures in focus, background softly blurred",
    quality: "Premium visual novel quality, professional retail photography, 1920x1080, luxury atmosphere, commercial standard",
    figure_and_form: "Modern luxury showroom architecture with elegant professional composition",
    skin_micro_details: "N/A - Background scene",
    fabric_physics: "N/A - Background scene",
    material_properties: "Polished marble floors with realistic reflection, pristine white walls, chrome fixtures, designer fabric textures on clothing displays"
  }
};

// ============================================================================
// CG IMAGES - Special Event Scenes (5 CG images)
// ============================================================================

export const vnCgFirstMeeting: ArtisticConcept = {
  name: 'VN CG: First Meeting',
  data: {
    shot: "VISUAL NOVEL CG IMAGE | Cinematic scene photography | 16:9 widescreen | 1920x1080px | Key emotional moment capture",
    subject: {
      variant: "Elite Indian fit artistic model Zara (age 25, height 5'8\", dramatic curves bust 38DD\", waist 27\", hips 39\", fair complexion, long flowing black hair, intensely expressive brown eyes) making eye contact with viewer in crowded art gallery",
      pose: "Zara standing in three-quarter profile, head turning to make direct eye contact with camera (representing player), caught mid-conversation with someone off-screen, warm surprised smile beginning to form, eyes wide with interest and curiosity, natural candid body language showing moment of connection, elegant ivory silk dress, gallery opening atmosphere",
      hair_color: "black",
      hair_style: "long flowing black hair with natural movement",
      skin_finish: "Natural glow in golden hour lighting",
      hand_and_nail_details: "Hands in natural conversational gesture",
      tattoos: "none",
      piercings: "none",
      body_art: "none",
      nail_art: "Elegant manicure",
      high_heels: "elegant heels visible"
    },
    wardrobe: "Elegant ivory silk wrap dress (same as sprites), gold jewelry, sophisticated gallery opening attire",
    environment: "LOCATION: Art gallery interior (same as gallery background but WITH people), golden hour sunlight streaming through windows, other gallery attendees visible in soft focus background creating crowded opening atmosphere, contemporary art on walls, sophisticated cultural event. COMPOSITION: Medium shot focusing on Zara's face and upper body, rule of thirds, Zara slightly off-center with gallery depth behind her",
    lighting: "Golden hour warm amber sunlight creating romantic atmosphere, dramatic chiaroscuro highlighting Zara's face and eyes, soft shadows sculpting features, warm inviting tones emphasizing moment of connection, cinematic lighting capturing emotional significance",
    camera: {
      focal_length: "50mm",
      aperture: "f/1.8",
      distance: "1.5 m",
      angle: "Eye level from viewer's POV, direct eye contact",
      framing: "Medium close-up, 16:9 cinematic framing, shallow depth of field"
    },
    color_grade: "Warm romantic golden hour tones, cinema-quality color grading, teal and orange palette, film-like quality, emotional atmosphere",
    style: "Cinematic visual novel CG, key emotional scene capture, romantic first meeting aesthetic, A24 film quality, meaningful moment photography. DEPTH OF FIELD: Very shallow DoF (f/1.8), Zara's face razor-sharp focus especially eyes, background gallery and people beautifully blurred bokeh",
    quality: "QUALITY: Premium CG quality, cinematic photography, 1920x1080, key story moment, emotional depth, professional narrative photography, Steam visual novel quality. Capturing the exact moment of connection and chemistry",
    figure_and_form: "Dramatic elegant curves in sophisticated dress, natural confident posture, romantic first meeting energy",
    skin_micro_details: "Fair complexion luminous in golden hour light, natural beauty emphasized",
    fabric_physics: "Silk dress draping elegantly with natural movement",
    material_properties: "Ivory silk with warm glow from golden hour lighting, gold jewelry catching light romantically"
  }
};

export const vnCgStudioPhotoshoot: ArtisticConcept = {
  name: 'VN CG: Studio Photoshoot',
  data: {
    shot: "VISUAL NOVEL CG IMAGE | Behind-the-scenes photography | 16:9 widescreen | 1920x1080px | Intimate creative moment",
    subject: {
      variant: "Elite Indian fit artistic model Zara in professional photography studio, wearing studio outfit (black turtleneck, charcoal trousers), engaged in photoshoot with viewer as photographer",
      pose: "Zara mid-pose for camera, looking toward viewer/photographer with confident professional smile mixed with personal warmth, standing under studio lights, modeling stance showing professionalism but eyes showing personal connection, professional yet intimate atmosphere of creative collaboration",
      hair_color: "black",
      hair_style: "styled for professional photoshoot",
      skin_finish: "Professional photography finish",
      hand_and_nail_details: "Professional modeling hand position",
      tattoos: "none",
      piercings: "none",
      body_art: "none",
      nail_art: "Professional neutral",
      high_heels: "professional heels visible"
    },
    wardrobe: "Studio outfit: fitted black turtleneck, tailored charcoal trousers, professional photoshoot styling",
    environment: "LOCATION: Professional photography studio (same as studio background but active shoot), studio lighting equipment visible and active, softboxes glowing, backdrop in background, camera equipment partially visible, creative workspace atmosphere. COMPOSITION: Medium shot showing Zara in photoshoot context with some studio equipment visible creating authentic behind-scenes feeling",
    lighting: "Professional studio lighting actively in use, key light illuminating Zara beautifully, dramatic rim lighting, mixed with ambient studio atmosphere, creative professional lighting creating both technical excellence and personal warmth",
    camera: {
      focal_length: "50mm",
      aperture: "f/2.0",
      distance: "2 m",
      angle: "Eye level, photographer's POV during shoot",
      framing: "Medium shot, 16:9 cinematic, showing photoshoot in progress"
    },
    color_grade: "Professional studio tones with creative warmth, slightly desaturated with warm accents, cinematic behind-the-scenes aesthetic",
    style: "Behind-the-scenes photography, intimate creative moment, visual novel CG capturing professional collaboration with personal connection, authentic photoshoot aesthetic. DEPTH OF FIELD: Moderate shallow DoF, Zara in sharp focus, studio equipment softly blurred background",
    quality: "Premium CG quality, professional photography aesthetic, 1920x1080, capturing creative collaboration moment, authentic studio atmosphere",
    figure_and_form: "Professional modeling stance showcasing dramatic curves in tailored outfit, confident creative energy",
    skin_micro_details: "Fair complexion in professional studio lighting, natural beauty with professional finish",
    fabric_physics: "Tailored garments fitting perfectly with professional styling",
    material_properties: "Matte black turtleneck, wool trousers, studio lighting creating professional atmosphere"
  }
};

export const vnCgViewingPhotos: ArtisticConcept = {
  name: 'VN CG: Viewing Photos Together',
  data: {
    shot: "VISUAL NOVEL CG IMAGE | Intimate close-up scene | 16:9 widescreen | 1920x1080px | Emotional connection moment",
    subject: {
      variant: "Elite Indian fit artistic model Zara viewing photographs with viewer, close-up emotional scene showing vulnerability and beauty",
      pose: "Zara in close intimate framing, looking down at photographs (held in hands or on table, partially visible), expression shifting from thoughtful to emotional, eyes beginning to glisten with tears of joy or nostalgia, soft vulnerable smile, intimate personal moment of sharing and connection, guard down showing authentic emotion",
      hair_color: "black",
      hair_style: "natural loose styling, slightly messy from intimate moment",
      skin_finish: "Natural emotional glow",
      hand_and_nail_details: "Hands holding or gesturing toward photographs, natural intimate gesture",
      tattoos: "none",
      piercings: "none",
      body_art: "none",
      nail_art: "Elegant natural",
      high_heels: "not visible"
    },
    wardrobe: "Same outfit as current scene context, more casual intimate setting",
    environment: "LOCATION: Close intimate setting (likely studio or private space), viewer and Zara sitting close together looking at photographs, photographs partially visible in frame showing their work together, soft private atmosphere. COMPOSITION: Close-up shot focusing on Zara's emotional expression, photographs visible but secondary to emotional reaction",
    lighting: "Soft warm intimate lighting creating tender atmosphere, gentle key light on Zara's face highlighting emotional expression, warm tones emphasizing vulnerability and connection, romantic intimate mood lighting",
    camera: {
      focal_length: "85mm f/1.4",
      aperture: "f/1.4",
      distance: "1 m",
      angle: "Slightly above eye level, close intimate perspective",
      framing: "Close-up to medium close-up, 16:9 cinematic, emotional intimacy"
    },
    color_grade: "Warm romantic tones, soft tender color grading, emotional depth, film-like intimate quality",
    style: "Intimate emotional photography, visual novel CG capturing vulnerable authentic moment, romantic connection scene, tender personal moment aesthetic. DEPTH OF FIELD: Very shallow DoF (f/1.4), Zara's face and emotion in razor-sharp focus, everything else soft dreamy bokeh",
    quality: "Premium emotional CG quality, intimate photography, 1920x1080, capturing vulnerable authentic moment, professional narrative photography emphasizing emotional connection",
    figure_and_form: "Natural intimate posture, vulnerability and openness",
    skin_micro_details: "Fair complexion with natural emotion visible, authentic beauty in intimate moment",
    fabric_physics: "Casual comfortable draping suggesting intimate private moment",
    material_properties: "Soft warm lighting on all materials creating tender intimate atmosphere"
  }
};

export const vnCgBoudoirSession: ArtisticConcept = {
  name: 'VN CG: Boudoir Photoshoot',
  data: {
    shot: "VISUAL NOVEL CG IMAGE | Fine art boudoir photography | 16:9 widescreen | 1920x1080px | Artistic intimate scene",
    subject: {
      variant: "Elite Indian fit artistic model Zara in fine art boudoir setting, wearing elegant boudoir ensemble, captured in moment of artistic sensual beauty",
      pose: "Zara positioned in artistic boudoir pose (could be reclining on furniture, seated elegantly, or standing with graceful sensual posture), looking toward camera/viewer with confident sensual expression mixed with artistic vulnerability, elegant ivory silk robe artfully draped, pose combining elegance with intimate artistic energy, in tradition of Helmut Newton fine art boudoir",
      hair_color: "black",
      hair_style: "long flowing loose waves, natural sensual styling",
      skin_finish: "Luminous natural glow in dramatic lighting",
      hand_and_nail_details: "Graceful elegant placement enhancing pose",
      tattoos: "none",
      piercings: "none",
      body_art: "none",
      nail_art: "Elegant neutral manicure",
      high_heels: "not visible or elegantly integrated into composition"
    },
    wardrobe: "Fine art boudoir ensemble: elegant ivory silk robe (short, thigh-length) artfully draped, ivory lace foundation garments tastefully visible, minimal jewelry, everything styled for fine art aesthetic in tradition of Helmut Newton",
    environment: "LOCATION: Luxury bedroom setting (same as bedroom background but styled for fine art boudoir shoot), soft romantic lighting, elegant furnishings visible creating upscale intimate atmosphere, artistic composition. COMPOSITION: Artistic framing showing Zara in elegant sensual pose with bedroom environment supporting fine art aesthetic",
    lighting: "Fine art boudoir lighting, dramatic chiaroscuro creating artistic shadows and highlights, soft key light sculpting form beautifully, rim lighting creating luminous glow on fair complexion, romantic warm tones, museum-quality dramatic lighting in tradition of fine art masters",
    camera: {
      focal_length: "85mm f/1.4",
      aperture: "f/1.8",
      distance: "2 m",
      angle: "Artistic angle flattering to pose and composition",
      framing: "Medium to full shot depending on pose, 16:9 cinematic, fine art composition"
    },
    color_grade: "Warm romantic cinema tones, fine art color grading, rich shadows and luminous highlights, film-like museum quality",
    style: "Fine art boudoir photography in tradition of Helmut Newton, museum-quality intimate portraiture, tasteful elegant sensuality, artistic excellence, visual novel premium CG aesthetic. DEPTH OF FIELD: Shallow DoF, Zara in beautiful sharp focus, bedroom environment softly blurred creating artistic bokeh",
    quality: "Premium CG quality, fine art photography standard, 1920x1080, museum-quality composition, artistic intimate scene, professional fine art aesthetic capturing beauty and sensuality with artistic taste",
    figure_and_form: "Dramatic curves elegantly showcased by artistic pose and silk robe draping, fine art sensual aesthetic",
    skin_micro_details: "Fair complexion luminous in dramatic artistic lighting, natural beauty with fine art photography finish",
    fabric_physics: "Ivory silk robe draping artfully with natural sensual flow, lace with realistic delicate texture",
    material_properties: "Luxurious ivory silk with elegant sheen, delicate lace texture, warm lighting creating fine art atmosphere"
  }
};

export const vnCgIntimateConnection: ArtisticConcept = {
  name: 'VN CG: Intimate Connection',
  data: {
    shot: "VISUAL NOVEL CG IMAGE | Cinematic emotional scene | 16:9 widescreen | 1920x1080px | Culminating intimate moment",
    subject: {
      variant: "Elite Indian fit artistic model Zara in deeply intimate emotional moment with viewer, close romantic scene",
      pose: "Zara in extremely close intimate framing, face filling much of frame, gazing directly at camera/viewer with deep emotional connection, eyes full of warmth and intimacy, soft tender smile, close enough to feel personal and romantic, vulnerable authentic expression showing complete emotional openness and connection, this is the emotional culmination of their relationship journey",
      hair_color: "black",
      hair_style: "natural loose styling, intimate casual",
      skin_finish: "Natural luminous glow in romantic lighting",
      hand_and_nail_details: "Possibly one hand visible reaching toward camera/viewer in intimate gesture",
      tattoos: "none",
      piercings: "none",
      body_art: "none",
      nail_art: "Natural elegant",
      high_heels: "not visible"
    },
    wardrobe: "Casual intimate clothing (could be simple comfortable outfit or continuation of previous scene), styling emphasizing authentic personal moment rather than fashion",
    environment: "LOCATION: Intimate private setting with soft focus background (could be bedroom, private space, or even abstract soft bokeh), everything secondary to emotional connection between Zara and viewer. COMPOSITION: Very close-up framing, Zara's face and emotion are entire focus, background beautifully blurred into romantic bokeh",
    lighting: "Soft romantic warm lighting creating tender intimate atmosphere, gentle key light on Zara's face emphasizing eyes and emotional expression, warm golden tones creating romantic mood, perfect lighting for capturing emotional vulnerability and connection",
    camera: {
      focal_length: "85mm f/1.4",
      aperture: "f/1.4",
      distance: "0.7 m",
      angle: "Eye level, extremely close intimate perspective",
      framing: "Extreme close-up, face filling frame, 16:9 cinematic"
    },
    color_grade: "Warm romantic golden tones, cinema-quality emotional color grading, soft dreamy quality, intimate film aesthetic",
    style: "Cinematic intimate emotional photography, visual novel premium CG capturing relationship culmination, romantic connection aesthetic, A24 indie film emotional intimacy quality. DEPTH OF FIELD: Extremely shallow DoF (f/1.4), Zara's eyes and face in perfect sharp focus, everything else soft dreamy romantic bokeh",
    quality: "Premium emotional CG quality, cinematic intimate photography, 1920x1080, capturing ultimate emotional connection and vulnerability, professional narrative photography at its most intimate, Steam visual novel premium quality",
    figure_and_form: "Close intimate framing emphasizing face and emotional connection rather than full figure",
    skin_micro_details: "Fair complexion luminous in soft romantic lighting, natural authentic beauty in vulnerable intimate moment",
    fabric_physics: "Minimal focus on clothing, all emphasis on emotional connection",
    material_properties: "Soft warm lighting creating romantic intimate atmosphere on all visible elements"
  }
};

// ============================================================================
// INTIMATE CUTSCENE VIDEOS - Veo Generated (5 levels)
// ============================================================================

export const vnCutsceneFirstTouch: ArtisticConcept = {
  name: 'VN Cutscene: First Touch',
  data: {
    shot: "VEO VIDEO CUTSCENE | 8-second cinematic video | 16:9 widescreen | Emotional connection moment",
    subject: {
      variant: "Elite Indian fit artistic model Zara, age 25, 5'8\", dramatic curves (38DD-27-39\"), fair complexion, long flowing black hair, expressive brown eyes, wearing elegant ivory silk wrap dress from gallery scene",
      pose: "Standing close to viewer, eyes locked in emotional moment, viewer's hand (partially visible in frame) gently reaching toward Zara's hand, Zara responding with vulnerable smile, fingers beginning to intertwine, gentle intimate proximity, emotional connection building",
      hair_color: "black",
      hair_style: "long flowing naturally with soft movement",
      skin_finish: "Natural emotional glow in romantic lighting",
      hand_and_nail_details: "Hands moving toward each other, elegant manicure, gentle touching beginning",
      tattoos: "none",
      piercings: "none",
      body_art: "none",
      nail_art: "Elegant neutral polish",
      high_heels: "elegant heels visible"
    },
    wardrobe: "Elegant ivory silk wrap dress, gold jewelry, sophisticated styling",
    environment: "LOCATION: Art gallery interior with golden hour lighting, soft focus background, intimate moment during gallery event. CAMERA MOVEMENT: Slow push-in toward hands and faces, creating emotional intimacy. 8 seconds capturing the exact moment of first intentional touch.",
    lighting: "Warm golden hour sunlight creating romantic atmosphere, soft diffused key light on faces and hands, rim light creating emotional glow, warm inviting tones emphasizing vulnerable moment",
    camera: {
      focal_length: "85mm f/1.4",
      aperture: "f/1.4",
      distance: "1.5m slowly moving closer",
      angle: "Eye level, viewer POV, slow push-in on emotional moment",
      framing: "Medium close-up transitioning to close-up, 16:9 cinematic"
    },
    color_grade: "Warm romantic golden tones, cinema-quality emotional color grading, soft dreamy quality",
    style: "Cinematic visual novel cutscene, emotional first touch moment, romantic A24 indie film aesthetic, slow motion emphasizing vulnerable connection, professional narrative cinematography capturing relationship beginning",
    quality: "Premium VEO video quality, 8-second emotional cutscene, cinematic romance, professional film quality, intimate moment capture",
    figure_and_form: "Elegant curves in sophisticated dress, vulnerable body language, romantic connection energy",
    skin_micro_details: "Fair complexion luminous in golden hour light, natural emotion visible",
    fabric_physics: "Silk dress moving naturally with subtle movement, realistic draping",
    material_properties: "Ivory silk catching golden light, gold jewelry glinting, warm romantic atmosphere"
  }
};

export const vnCutsceneFirstKiss: ArtisticConcept = {
  name: 'VN Cutscene: First Kiss',
  data: {
    shot: "VEO VIDEO CUTSCENE | 8-second cinematic video | 16:9 widescreen | Romantic kiss moment",
    subject: {
      variant: "Elite Indian fit artistic model Zara, age 25, 5'8\", dramatic curves (38DD-27-39\"), fair complexion glowing in romantic lighting, long flowing black hair, expressive brown eyes showing deep emotion, wearing elegant ivory silk wrap dress",
      pose: "Zara and viewer (partially visible - shoulder/back) in close intimate proximity, faces very close, Zara's eyes slowly closing as they lean together, gentle first kiss beginning, hands visible - one of Zara's hands on viewer's shoulder, tender vulnerable moment, slow motion capturing emotional significance",
      hair_color: "black",
      hair_style: "long flowing, slightly disheveled from intimate moment",
      skin_finish: "Luminous with emotional glow and romantic lighting",
      hand_and_nail_details: "One hand on viewer's shoulder, gentle intimate touch, elegant manicure",
      tattoos: "none",
      piercings: "none",
      body_art: "none",
      nail_art: "Elegant neutral",
      high_heels: "not visible in close framing"
    },
    wardrobe: "Elegant ivory silk wrap dress, minimal jewelry, romantic styling",
    environment: "LOCATION: Private moment after gallery event, soft focus background suggesting intimate space. CAMERA MOVEMENT: Slow gentle orbit around the couple, creating cinematic romantic capture. 8 seconds showing approach and first kiss moment.",
    lighting: "Soft romantic warm lighting creating tender atmosphere, gentle key light on faces, rim light creating dreamy glow around couple, warm golden tones emphasizing emotional intimacy, professional romantic cinematography lighting",
    camera: {
      focal_length: "85mm f/1.4",
      aperture: "f/1.2",
      distance: "1m, slow gentle orbit movement",
      angle: "Eye level transitioning to slight side angle, intimate romantic perspective",
      framing: "Close-up intimate framing, 16:9 cinematic, faces filling frame"
    },
    color_grade: "Warm romantic golden tones, soft dreamy color grading, emotional depth, film-like intimate quality",
    style: "Cinematic romantic visual novel cutscene, first kiss capture, A24 romantic drama aesthetic, slow motion at critical moment (60fps to 24fps), professional romance cinematography capturing vulnerable authentic connection",
    quality: "Premium VEO video quality, 8-second romantic cutscene, cinema-quality first kiss, professional intimate cinematography, emotional breakthrough moment",
    figure_and_form: "Close intimate framing emphasizing emotional connection, elegant forms softly blurred in shallow depth of field",
    skin_micro_details: "Fair complexion luminous in soft romantic lighting, authentic emotion visible in expressions",
    fabric_physics: "Silk dress draping naturally in close intimate positioning",
    material_properties: "Soft romantic lighting creating dreamy atmosphere on all visible elements"
  }
};

export const vnCutsceneBoudoirBeginning: ArtisticConcept = {
  name: 'VN Cutscene: Boudoir Session Beginning',
  data: {
    shot: "VEO VIDEO CUTSCENE | 8-second cinematic video | 16:9 widescreen | Artistic intimate transition",
    subject: {
      variant: "Elite Indian fit artistic model Zara, age 25, 5'8\", dramatic curves (38DD-27-39\"), fair complexion glowing in dramatic lighting, long flowing black hair loose waves, expressive brown eyes showing trust and vulnerability, wearing elegant ivory silk robe over ivory lace foundation garments",
      pose: "Zara standing by luxury bedroom window, slowly turning from window toward camera/viewer, silk robe falling off one shoulder naturally revealing elegant lace beneath, confident vulnerable expression, eyes meeting viewer with trust and anticipation, graceful movement emphasizing artistic sensuality",
      hair_color: "black",
      hair_style: "long flowing loose waves cascading naturally",
      skin_finish: "Luminous with dramatic artistic lighting creating sculptural shadows",
      hand_and_nail_details: "One hand lightly touching robe, other hand relaxed, elegant manicure",
      tattoos: "none",
      piercings: "none",
      body_art: "none",
      nail_art: "Elegant neutral",
      high_heels: "not visible"
    },
    wardrobe: "Fine art boudoir ensemble: elegant ivory silk robe (short, thigh-length) loosely draped, ivory lace foundation garments tastefully visible, minimal jewelry, styled for Helmut Newton fine art aesthetic",
    environment: "LOCATION: Luxury bedroom with dramatic window lighting, white silk bedding visible in soft focus background, intimate artistic atmosphere. CAMERA MOVEMENT: Slow tracking movement following Zara's turn from window, creating artistic revealing composition. 8 seconds capturing transition from window to facing viewer.",
    lighting: "Fine art boudoir lighting, dramatic chiaroscuro from window creating artistic shadows and highlights, key light sculpting form beautifully, rim light creating luminous glow on fair complexion, museum-quality dramatic lighting in tradition of fine art masters",
    camera: {
      focal_length: "85mm f/1.4",
      aperture: "f/1.8",
      distance: "2.5m, slow tracking following movement",
      angle: "Slightly below eye level creating elegant composition, artistic angle",
      framing: "Full body to medium shot, 16:9 cinematic, fine art composition"
    },
    color_grade: "Warm romantic cinema tones, fine art color grading, rich shadows and luminous highlights, museum-quality film aesthetic",
    style: "Fine art boudoir cinematography in tradition of Helmut Newton and Ellen von Unwerth, museum-quality intimate portraiture video, tasteful elegant sensuality, artistic excellence, visual novel premium cutscene aesthetic capturing trust and vulnerability",
    quality: "Premium VEO video quality, 8-second artistic intimate cutscene, fine art boudoir cinematography, professional artistic sensuality, museum-standard intimate video capture",
    figure_and_form: "Dramatic curves elegantly showcased by silk robe movement and artistic lighting, fine art sensual aesthetic",
    skin_micro_details: "Fair complexion luminous in dramatic artistic lighting, natural beauty with fine art cinematography finish",
    fabric_physics: "Ivory silk robe flowing naturally with movement, realistic draping and revealing, lace with delicate realistic texture movement",
    material_properties: "Luxurious ivory silk with elegant sheen catching dramatic light, delicate lace texture, warm cinematic lighting creating fine art atmosphere"
  }
};

export const vnCutsceneDeepConnection: ArtisticConcept = {
  name: 'VN Cutscene: Deep Emotional Connection',
  data: {
    shot: "VEO VIDEO CUTSCENE | 8-second cinematic video | 16:9 widescreen | Profound intimate moment",
    subject: {
      variant: "Elite Indian fit artistic model Zara, age 25, 5'8\", dramatic curves (38DD-27-39\"), fair complexion with warm emotional glow, long flowing black hair naturally disheveled, intensely expressive brown eyes conveying profound emotion and connection, wearing minimal elegant attire or continuation of boudoir styling",
      pose: "Extreme close-up intimate moment, Zara's face very close to camera/viewer suggesting profound physical and emotional closeness, eyes locked with viewer showing deep vulnerability and connection, subtle movements - gentle breathing, eyes closing and opening slowly, lips parting slightly, hand visible reaching toward viewer's face (viewer partially visible), tender profound intimacy",
      hair_color: "black",
      hair_style: "naturally loose and slightly disheveled from intimate moment",
      skin_finish: "Natural luminous glow with emotional warmth and intimate lighting",
      hand_and_nail_details: "One hand visible reaching tenderly toward viewer's face, intimate gentle touch, elegant natural manicure",
      tattoos: "none",
      piercings: "none",
      body_art: "none",
      nail_art: "Natural elegant",
      high_heels: "not visible"
    },
    wardrobe: "Minimal focus on clothing, emphasis on emotional and physical connection, intimate casual or continuation of previous scene",
    environment: "LOCATION: Intimate private setting with soft focus abstract background (bedroom environment implied), everything secondary to profound emotional connection. CAMERA MOVEMENT: Extremely slow push-in toward eyes and faces, creating intensifying emotional intimacy. 8 seconds capturing depth of emotional and physical connection.",
    lighting: "Soft romantic warm lighting creating tender intimate atmosphere, gentle key light on face emphasizing eyes and emotional expression, warm golden tones creating profound romantic mood, perfect lighting for capturing emotional and physical vulnerability",
    camera: {
      focal_length: "85mm f/1.2",
      aperture: "f/1.2",
      distance: "0.5m extremely close, slow push-in even closer",
      angle: "Eye level, extremely close intimate perspective suggesting profound closeness",
      framing: "Extreme close-up, face filling entire frame, 16:9 cinematic"
    },
    color_grade: "Warm romantic golden tones, cinema-quality emotional color grading, soft dreamy quality emphasizing profound intimacy, A24 intimate film aesthetic",
    style: "Cinematic profound intimate cinematography, visual novel premium cutscene capturing relationship culmination, deepest emotional and physical connection aesthetic, professional intimate cinematography at its most vulnerable and profound, tasteful mature intimate moment capture",
    quality: "Premium VEO video quality, 8-second profound intimate cutscene, cinema-quality emotional and physical connection, professional narrative cinematography capturing ultimate vulnerability and trust, Steam visual novel premium intimate quality",
    figure_and_form: "Extreme close-up framing emphasizing face and profound emotional connection rather than full figure",
    skin_micro_details: "Fair complexion luminous in soft romantic lighting, natural authentic emotion visible in vulnerable intimate moment, subtle movements of breathing and emotional response",
    fabric_physics: "Minimal focus on fabric, all emphasis on emotional and physical connection",
    material_properties: "Soft warm intimate lighting creating profound romantic atmosphere on all visible elements"
  }
};

export const vnCutsceneTenderAftermath: ArtisticConcept = {
  name: 'VN Cutscene: Tender Aftermath',
  data: {
    shot: "VEO VIDEO CUTSCENE | 8-second cinematic video | 16:9 widescreen | Post-intimate tenderness",
    subject: {
      variant: "Elite Indian fit artistic model Zara, age 25, 5'8\", dramatic curves (38DD-27-39\"), fair complexion with natural post-intimate glow, long flowing black hair naturally tousled across pillow, expressive brown eyes showing contentment and deep affection, minimal covering with white silk sheets",
      pose: "Zara reclining on white silk bedding, propped on one elbow, looking at viewer with tender affectionate expression, white silk sheet artfully draped across body creating tasteful aesthetic composition, gentle intimate smile, relaxed vulnerable body language showing trust and contentment, natural post-intimate atmosphere",
      hair_color: "black",
      hair_style: "naturally tousled and spread across white pillows, intimate natural styling",
      skin_finish: "Natural luminous glow with warm post-intimate radiance",
      hand_and_nail_details: "One hand supporting head, other hand visible on white sheets, natural elegant manicure",
      tattoos: "none",
      piercings: "none",
      body_art: "none",
      nail_art: "Natural elegant",
      high_heels: "not visible"
    },
    wardrobe: "White silk sheets artfully draped creating tasteful fine art aesthetic composition, minimal styling emphasizing natural intimate beauty",
    environment: "LOCATION: Luxury bedroom morning light, white silk bedding, soft morning glow from windows, intimate private space atmosphere. CAMERA MOVEMENT: Slow gentle zoom from medium to close-up on Zara's face and expression, creating emotional tender capture. 8 seconds capturing post-intimate tender emotional connection.",
    lighting: "Soft morning window light creating gentle natural glow, warm tender atmosphere, key light from window creating natural beautiful illumination, soft shadows, warm intimate morning quality lighting",
    camera: {
      focal_length: "50mm f/1.4",
      aperture: "f/1.8",
      distance: "2m, slow gentle zoom closer to face",
      angle: "Slightly above eye level creating intimate tender perspective",
      framing: "Medium to close-up, 16:9 cinematic, white silk and face composition"
    },
    color_grade: "Soft warm morning tones, natural intimate color grading, tender emotional depth, film-like quality emphasizing natural beauty and contentment",
    style: "Tasteful post-intimate cinematography, fine art tender moment capture, Helmut Newton influence with tasteful aesthetic, visual novel mature relationship portrayal, professional intimate aftermath cinematography emphasizing emotional connection and trust",
    quality: "Premium VEO video quality, 8-second tender aftermath cutscene, tasteful intimate cinematography, professional mature relationship video, emotional tender moment capture",
    figure_and_form: "Elegant reclining composition with white silk creating tasteful fine art aesthetic, natural relaxed post-intimate posture",
    skin_micro_details: "Fair complexion with natural morning glow, authentic contentment and affection visible in expression",
    fabric_physics: "White silk sheets draping naturally with realistic fabric movement and realistic intimate positioning",
    material_properties: "White silk with natural sheen in morning light, soft tender atmosphere on all elements"
  }
};

// ============================================================================
// EXPORT ALL VN CONCEPTS
// ============================================================================

export const visualNovelAssetConcepts: ArtisticConcept[] = [
  // Character Sprites (6)
  vnSpriteNeutral,
  vnSpriteSmile,
  vnSpriteFlirty,
  vnSpriteShy,
  vnSpriteStudio,
  vnSpriteBoudoir,

  // Backgrounds (5)
  vnBgArtGallery,
  vnBgPhotoStudio,
  vnBgLuxuryBedroom,
  vnBgUpscaleCafe,
  vnBgFashionShowroom,

  // CG Images (5)
  vnCgFirstMeeting,
  vnCgStudioPhotoshoot,
  vnCgViewingPhotos,
  vnCgBoudoirSession,
  vnCgIntimateConnection,

  // Intimate Cutscene Videos (5 levels)
  vnCutsceneFirstTouch,
  vnCutsceneFirstKiss,
  vnCutsceneBoudoirBeginning,
  vnCutsceneDeepConnection,
  vnCutsceneTenderAftermath
];

export default visualNovelAssetConcepts;
