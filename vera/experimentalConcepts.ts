import type { ArtisticConcept } from './types';
import rolePlayModeConcepts from './rolePlayModeConcepts';

const defaultSkinMicroDetails = "Ultra-high-resolution authentic skin texture with visible pores, natural imperfections, and realistic subsurface scattering. Museum-grade detail with no artificial smoothing.";
const defaultFabricPhysics = "Advanced fabric simulation with realistic draping, natural creases, and precise material interaction with body form. Visible fabric weave and texture.";
const defaultMaterialProperties = "Authentic material properties with complex light interaction, from soft matte absorption to precise specular highlights based on material type.";

export const ARTISTIC_CONCEPTS: ArtisticConcept[] = [
  {
    name: 'EXP-SAFE: Classic Editorial Portrait',
    data: {
      shot: "9:16 aspect ratio. Professional editorial framing with precision composition. Capturing authentic expression and form.",
      subject: { variant: "Professional Indian model (height 5'9\", measurements 36-26-38) with a luminous fair skin tone for fashion/editorial work. Graceful proportions with professional modeling experience.", pose: "Commanding, authoritative posture with corporate confidence and professional elegance", hair_color: "dark", hair_style: "Professionally styled with elegant volume and refined finish", skin_finish: "Natural professional finish with healthy radiance", hand_and_nail_details: "Professional manicure with refined presentation", tattoos: "none", piercings: "none", body_art: "none", nail_art: "Classic neutral manicure", high_heels: "Professional designer heels" },
      wardrobe: "Full coverage luxury garments with elegant sophistication and professional styling",
      environment: "Modern professional studio with clean minimalist aesthetic and controlled lighting environment",
      lighting: "Professional studio lighting with perfect control and balanced illumination for editorial excellence",
      camera: { focal_length: "85mm portrait lens", aperture: "f/2.8", distance: "2.5 m", angle: "Eye-level professional perspective", framing: "Medium portrait from mid-torso emphasizing professional presence" },
      color_grade: "Professional editorial color with natural saturation and balanced tones",
      style: "High-end editorial photography tradition with professional mastery and refined artistic vision",
      quality: "Ultra-premium 8K resolution with museum-grade quality and professional retouching",
      figure_and_form: "Professional modeling form with editorial elegance and refined posture",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: defaultFabricPhysics,
      material_properties: defaultMaterialProperties
    }
  },
  {
    name: 'EXP-SAFE: Corporate Power Portrait',
    data: {
      shot: "9:16 aspect ratio. Professional editorial framing with executive composition and corporate precision.",
      subject: { variant: "Professional Indian model (height 5'8\", measurements 38-27-40) with a commanding dusky skin tone, athletic proportions with executive presence and commanding authority", pose: "Corporate power stance with authoritative confidence and professional dominance", hair_color: "jet black", hair_style: "Sleek executive styling with sharp professional lines", skin_finish: "Professional corporate finish with natural radiance", hand_and_nail_details: "Executive manicure with corporate precision", tattoos: "none", piercings: "none", body_art: "none", nail_art: "Corporate red power polish", high_heels: "Executive designer power heels" },
      wardrobe: "Substantial luxury business attire with executive tailoring and corporate sophistication",
      environment: "Modern corporate office with floor-to-ceiling windows, executive furnishings, and professional luxury aesthetic",
      lighting: "Executive office lighting with dramatic window light and professional corporate atmosphere",
      camera: { focal_length: "50mm", aperture: "f/4.0", distance: "3 m", angle: "Slightly low angle emphasizing executive authority", framing: "Full body corporate portrait showing professional environment" },
      color_grade: "Corporate color grading with professional tones and executive depth",
      style: "Corporate editorial photography celebrating professional feminine power and executive elegance",
      quality: "Ultra-premium 8K corporate photography with museum-grade professional quality",
      figure_and_form: "Executive professional form with corporate poise and authoritative presence",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Luxury corporate suiting with precise tailoring and professional draping",
      material_properties: "Corporate materials: wool suiting, silk blouses, leather accessories with executive sophistication"
    }
  },
  {
    name: 'EXP-SAFE: Natural Beauty Editorial',
    data: {
      shot: "9:16 aspect ratio. Natural editorial framing with authentic composition and organic elegance.",
      subject: { variant: "Indian model (height 5'7\", measurements 36-26-39) with a natural wheatish skin tone, embodying authentic beauty and healthy proportions with organic grace", pose: "Natural confident stance with authentic expression and organic elegance", hair_color: "dark", hair_style: "Natural flowing style with organic volume and soft movement", skin_finish: "Natural dewy finish with healthy authentic glow", hand_and_nail_details: "Natural hand placement with organic grace", tattoos: "none", piercings: "none", body_art: "none", nail_art: "Natural neutral nails", high_heels: "not visible" },
      wardrobe: "Elegant natural fabrics with organic draping and sophisticated simplicity",
      environment: "Natural light studio with soft diffusion and organic atmosphere",
      lighting: "Soft natural window light with gentle wrap-around illumination and organic shadows",
      camera: { focal_length: "85mm f/1.8", aperture: "f/2.0", distance: "2 m", angle: "Natural eye-level connection", framing: "Intimate medium shot with natural framing" },
      color_grade: "Warm natural tones with organic color and soft highlights",
      style: "Natural beauty photography with authentic elegance and organic sophistication",
      quality: "Premium 8K natural photography with authentic texture and organic quality",
      figure_and_form: "Natural feminine form with organic grace and authentic beauty",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Natural fabric flow with organic draping and soft movement",
      material_properties: "Natural materials with soft light absorption and organic texture"
    }
  },
  {
    name: 'EXP-MOD: High Fashion Seduction',
    data: {
      shot: "9:16 aspect ratio. Intimate framing creating emotional connection and magnetic allure. Focus on seductive magnetism and editorial elegance.",
      subject: { variant: "Indian Seductress (height 5'8\", measurements 38DD-26-42) with a bombshell hourglass figure, confident sensual presence, and a warm, light brown skin tone. A boudoir specialist.", pose: "Seductive, intentional positioning conveying magnetic allure with confident body language and editorial elegance", hair_color: "jet black", hair_style: "Glamorous voluminous styling with sensual movement", skin_finish: "Luminous dewy finish with radiant glow", hand_and_nail_details: "Seductive hand placement with elegant gesture", tattoos: "none", piercings: "none", body_art: "none", nail_art: "Bold red seductive polish", high_heels: "Designer stiletto heels" },
      wardrobe: "Tasteful partial coverage with editorial sophistication, revealing elegance with high fashion sensuality",
      environment: "Luxury boutique hotel suite with designer furnishings and intimate atmosphere",
      lighting: "Warm intimate lighting with romantic atmosphere and seductive shadows",
      camera: { focal_length: "85mm f/1.4", aperture: "f/1.8", distance: "2 m", angle: "Slightly low angle with seductive perspective", framing: "Medium-close composition emphasizing curves and allure" },
      color_grade: "Warm romantic tones with sensual depth and rich highlights",
      style: "High fashion seduction photography with editorial excellence and confident sensuality",
      quality: "Ultra-premium 8K with exceptional clarity and professional seductive quality",
      figure_and_form: "Hourglass bombshell form with confident curves and seductive elegance",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Fashion fabric with elegant partial draping and seductive reveals",
      material_properties: "Luxury fashion materials with sensual light interaction and rich texture"
    }
  },
  {
    name: 'EXP-MOD: Confident Allure Portrait',
    data: {
      shot: "9:16 aspect ratio. Magnetic intimate framing with confident sensual composition.",
      subject: { variant: "Indian model (height 5'9\", measurements 38D-27-40) with a seductive presence, curvaceous proportions, magnetic confidence, and a radiant brown skin tone.", pose: "Magnetic presence with intentional body language expressing confident allure and seductive elegance", hair_color: "jet black", hair_style: "Styled with dramatic volume and seductive flow", skin_finish: "Radiant luminous finish with seductive glow", hand_and_nail_details: "Confident hand gesture with seductive refinement", tattoos: "none", piercings: "none", body_art: "none", nail_art: "Bold glamorous polish", high_heels: "Sharp designer heels" },
      wardrobe: "Moderate elegant coverage with sophisticated reveals and confident sensual styling",
      environment: "Luxury penthouse with city views and intimate sophisticated atmosphere",
      lighting: "Dramatic rim lighting with seductive shadows and confident illumination",
      camera: { focal_length: "50mm", aperture: "f/2.8", distance: "2.5 m", angle: "Eye-level magnetic connection", framing: "Full body showing confident seductive presence" },
      color_grade: "Rich dramatic tones with seductive warmth and confident depth",
      style: "Confident allure photography with editorial seduction and magnetic sophistication",
      quality: "Premium 8K with seductive clarity and confident professional quality",
      figure_and_form: "Confident curvaceous form with magnetic seductive elegance",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Elegant moderate fabric with sophisticated draping and confident reveals",
      material_properties: "Luxury materials with seductive specular highlights and rich interaction"
    }
  },
  {
    name: 'EXP-MOD: Fashion Forward Sensuality',
    data: {
      shot: "9:16 aspect ratio. Professional editorial framing with fashion-forward seductive composition.",
      subject: { variant: "Indian editorial model (height 5'10\", measurements 36-25-38) with fashion expertise, statuesque proportions, runway confidence, and a flawless dusky skin tone.", pose: "Fashion-forward power stance with seductive confidence and editorial poise", hair_color: "jet black", hair_style: "High fashion styling with editorial sophistication", skin_finish: "Professional editorial finish with fashion radiance", hand_and_nail_details: "Editorial hand positioning with fashion refinement", tattoos: "none", piercings: "none", body_art: "none", nail_art: "Fashion editorial polish", high_heels: "Runway designer heels" },
      wardrobe: "High fashion editorial pieces with sophisticated partial coverage and runway sensuality",
      environment: "Fashion studio with editorial backdrop and high-fashion atmosphere",
      lighting: "Dramatic fashion lighting with editorial precision and seductive highlights",
      camera: { focal_length: "70mm", aperture: "f/4.0", distance: "3 m", angle: "Fashion editorial perspective", framing: "Full editorial composition with fashion presence" },
      color_grade: "High fashion color with editorial sophistication and seductive richness",
      style: "Fashion-forward editorial with confident sensuality and runway excellence",
      quality: "Ultra-premium 8K fashion photography with editorial perfection",
      figure_and_form: "Statuesque fashion form with editorial poise and seductive confidence",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "High fashion fabrics with editorial draping and sophisticated movement",
      material_properties: "Fashion materials with editorial light interaction and luxury finish"
    }
  },
    {
    name: 'EXP-MOD: Graphic Cabin Editorial',
    data: {
      shot: "9:16 aspect ratio. Sharp, intentional fashion editorial framing. Using the graphic lines of the lace and the cabin's architecture for a strong composition.",
      subject: { variant: "Indian high-fashion model (height 5'10\", measurements 36-25-37) with a statuesque figure, strong bone structure, an edgy, confident presence, and a sharp, fair skin tone.", pose: "Strong, architectural poses. Leaning against a wooden beam, a powerful stance in front of the fireplace, creating geometric shapes with the body that complement the graphic lace.", hair_color: "jet black", hair_style: "Sleek and polished, perhaps a sharp wet look or a severe bun, contrasting with the rustic environment.", skin_finish: "Professional editorial finish, a subtle sheen that catches the light, less about firelight glow and more about professional lighting.", hand_and_nail_details: "Deliberate, sharp hand posing.", tattoos: "none", piercings: "none", body_art: "none", nail_art: "Matte black or deep oxblood nails.", high_heels: "Sharp stiletto heels" },
      wardrobe: "A bold, graphic editorial lace bodysuit with strong geometric patterns. Paired with sharp stiletto heels and sheer black stockings.",
      environment: "A minimalist wooden cabin, treated as a textured backdrop. The fireplace provides an element of warmth, but the focus is on the contrast between the raw wood and the polished subject.",
      lighting: "A mix of the warm fireplace light and a harder, directional key light. Creates more defined shadows and highlights the graphic nature of the lace.",
      camera: { focal_length: "50mm", aperture: "f/2.8", distance: "2.5 m", angle: "Slightly low angle to emphasize power and the architectural lines of the pose.", framing: "Full body or wide medium shot, incorporating the cabin's architectural elements into the composition." },
      color_grade: "Desaturated, moody tones. The warmth of the fire is present but controlled. A high-contrast, fashion-magazine look.",
      style: "High-fashion editorial meets rustic minimalism. A study in contrasts: raw vs. polished, warm vs. cool, organic vs. geometric.",
      quality: "Ultra-premium 8K fashion photography with impeccable detail and professional retouching.",
      figure_and_form: "Statuesque, architectural form with strong lines and confident posture.",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: defaultFabricPhysics,
      material_properties: "Contrast between the sharp, graphic patterns of the lace and the organic texture of raw wood. Specular highlights on leather heels against the matte wood floor."
    }
  },
  {
    name: 'EXP-ART: Intimate Boudoir Artistry',
    data: {
      shot: "9:16 aspect ratio. Intimate framing creating warmth and connection. Erotic art photography tradition with bold sensuality.",
      subject: { variant: "Indian Seductress bombshell (height 5'7\", measurements 40DD-26-44) with elite boudoir expertise, voluptuous proportions, confident intimate presence, and a warm, inviting wheatish skin tone.", pose: "Seductive, intentional intimate positioning with erotic allure and boudoir confidence", hair_color: "jet black", hair_style: "Loose flowing waves with intimate sensual styling", skin_finish: "Luminous intimate glow with warm radiance", hand_and_nail_details: "Intimate seductive hand placement with erotic refinement", tattoos: "none", piercings: "none", body_art: "none", nail_art: "Bold red intimate polish", high_heels: "Luxury boudoir heels" },
      wardrobe: "Architectural foundation garments with sculptural forms, revealing luxury lingerie with artistic boudoir sophistication",
      environment: "Luxury private bedroom with intimate boudoir atmosphere, silk sheets, and warm romantic setting",
      lighting: "Intimate, soft lighting creating warmth and connection with romantic shadows and seductive glow",
      camera: { focal_length: "85mm f/1.4", aperture: "f/1.8", distance: "1.5 m", angle: "Intimate close perspective", framing: "Close intimate framing emphasizing curves and sensuality" },
      color_grade: "Warm intimate tones with romantic depth and seductive highlights",
      style: "Erotic art photography tradition with bold sensuality and intimate artistic excellence. Fine art boudoir with museum-quality artistic merit.",
      quality: "Ultra-premium 8K resolution with museum-grade quality and intimate detail perfection",
      figure_and_form: "Voluptuous bombshell form with intimate sculptural curves and erotic artistic elegance",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Luxury lingerie with intimate draping, sheer reveals, and erotic artistic interaction",
      material_properties: "Silk, lace, satin with intimate light interaction and sensual specular highlights"
    }
  },
  {
    name: 'EXP-ART: Artistic Erotic Portrait',
    data: {
      shot: "9:16 aspect ratio. Erotic artistic framing with intimate bold composition.",
      subject: { variant: "Indian artistic model (height 5'8\", measurements 38-26-40) with erotic expertise, curvaceous artistic proportions, bold intimate confidence, and a deep, expressive brown skin tone.", pose: "Artistic erotic positioning with bold sensual expression and intimate confidence", hair_color: "jet black", hair_style: "Artistic sensual styling with bold volume", skin_finish: "Artistic luminous finish with erotic radiance", hand_and_nail_details: "Artistic hand placement with erotic gesture", tattoos: "none", piercings: "none", body_art: "none", nail_art: "Artistic bold polish", high_heels: "Artistic designer heels" },
      wardrobe: "High artistic foundation pieces with sculptural erotic forms and bold revealing elegance",
      environment: "Artist's private studio with intimate erotic atmosphere and creative artistic setting",
      lighting: "Dramatic erotic lighting with intimate artistic shadows and bold sculptural illumination",
      camera: { focal_length: "85mm f/1.4", aperture: "f/2.0", distance: "2 m", angle: "Artistic intimate perspective", framing: "Artistic composition emphasizing erotic form" },
      color_grade: "Bold artistic color with erotic warmth and intimate dramatic depth",
      style: "Artistic erotic photography with bold intimate sensuality and fine art tradition. Museum-quality erotic art excellence.",
      quality: "Museum-quality 8K fine-art photography with erotic artistic perfection",
      figure_and_form: "Curvaceous artistic form with erotic sculptural elegance and bold intimate confidence",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Artistic foundation fabrics with erotic reveals and sculptural intimate draping",
      material_properties: "Luxury artistic materials with erotic light interaction and intimate specular richness"
    }
  },
  {
    name: 'EXP-ART: Sensual Art Photography',
    data: {
      shot: "9:16 aspect ratio. Sensual artistic framing with intimate aesthetic composition.",
      subject: { variant: "Indian sensual artist model (height 5'9\", measurements 36-27-39) with intimate expertise, graceful sensual proportions, artistic confidence, and a luminous, light brown skin tone.", pose: "Sensual artistic pose with intimate expression and elegant erotic grace", hair_color: "dark", hair_style: "Sensual artistic flow with intimate styling", skin_finish: "Sensual artistic glow with intimate luminosity", hand_and_nail_details: "Sensual artistic gesture with intimate refinement", tattoos: "none", piercings: "none", body_art: "none", nail_art: "Artistic sensual polish", high_heels: "Artistic sensual heels" },
      wardrobe: "Artistic high-coverage foundation pieces with sensual sculptural elegance and intimate reveals",
      environment: "Private art gallery with intimate sensual atmosphere and artistic luxury setting",
      lighting: "Sensual artistic lighting with intimate warm glow and sculptural shadows",
      camera: { focal_length: "85mm", aperture: "f/2.0", distance: "2 m", angle: "Sensual artistic angle", framing: "Artistic sensual composition" },
      color_grade: "Sensual artistic tones with warm intimate depth",
      style: "Sensual art photography with intimate artistic tradition and fine art elegance",
      quality: "Fine-art 8K with sensual artistic quality and intimate perfection",
      figure_and_form: "Graceful sensual form with artistic intimate elegance",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Artistic sensual fabrics with intimate sculptural draping",
      material_properties: "Sensual artistic materials with intimate light interaction"
    }
  },
    {
    name: 'EXP-ART: Cabin Boudoir',
    data: {
      shot: "9:16 aspect ratio. Intimate, gentle framing capturing a quiet moment of sensual warmth. Focus on the interplay of firelight on skin and lace.",
      subject: { variant: "Indian model (height 5'7\", measurements 38-28-40) with a warm, inviting presence, soft curvaceous form, a natural dusky skin tone, and expertise in intimate, natural-feeling portraiture.", pose: "Relaxed, authentic positioning by the fireplace. A quiet moment of contemplation or gentle stretching, conveying warmth and comfortable sensuality.", hair_color: "jet black", hair_style: "Soft, loose waves, looking natural and slightly tousled by the warmth of the fire.", skin_finish: "Luminous glow from the firelight, emphasizing natural skin texture with a warm, radiant finish.", hand_and_nail_details: "Natural, graceful hand placement.", tattoos: "none", piercings: "none", body_art: "none", nail_art: "Deep, warm nail polish like burgundy or dark cherry.", high_heels: "Designer heels" },
      wardrobe: "A graphic editorial lace bodysuit, intricate yet delicate. Paired with sheer stockings. Heels are present but not the focus, perhaps resting nearby.",
      environment: "A cozy, minimalist wooden cabin. A warm, crackling fireplace is the primary light source. Simple, rustic decor like a sheepskin rug or a simple wooden chair.",
      lighting: "Dominated by the warm, flickering light of the fireplace. Soft, deep shadows creating an intimate, enveloping atmosphere.",
      camera: { focal_length: "85mm f/1.4", aperture: "f/1.8", distance: "1.5 m", angle: "Intimate eye-level or slightly lower, creating a personal connection.", framing: "Medium-close, focusing on the form from mid-thigh to head, capturing the interaction with the firelight." },
      color_grade: "Deep warm tones, rich oranges and reds from the fire, with soft, crushed blacks in the shadows. A romantic, filmic quality.",
      style: "Intimate boudoir art photography. Focus on natural sensuality, warmth, and quiet moments. A blend of rustic comfort and delicate lingerie.",
      quality: "Ultra-premium 8K resolution, capturing the fine details of the lace and the texture of the wood and skin.",
      figure_and_form: "Soft, natural feminine curves celebrated in a comfortable, intimate setting.",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: defaultFabricPhysics,
      material_properties: "Graphic lace detail interacting with flickering firelight. Natural wood grain, soft wool or sheepskin textures. The contrast between delicate lace and rustic materials."
    }
  },
   {
    name: 'EXP-ART: Solitude in Lace',
    data: {
      shot: "9:16 aspect ratio. A quiet, contemplative composition. The feeling of being alone and at peace in a secluded space. Fine art tradition.",
      subject: { variant: "Indian model (height 5'8\", measurements 36-26-38) with an introspective, artistic presence, a graceful, sculptural form, and a soft, fair skin tone.", pose: "Candid, unposed moments. Gazing into the fire, curled up on a rug with a book, looking out a window into a dark forest. A feeling of vulnerability and self-possession.", hair_color: "dark", hair_style: "Natural and undone. Effortless.", skin_finish: "Soft, matte finish, capturing the gentle firelight without high-gloss radiance. Very natural.", hand_and_nail_details: "Naturally posed, interacting with the environment (holding a mug, touching the floor).", tattoos: "none", piercings: "none", body_art: "none", nail_art: "Nude or bare nails.", high_heels: "none" },
      wardrobe: "Simplistic, graphic lace briefs and a delicate lace bralette or camisole. Paired with cozy, oversized wool stockings instead of sheer ones.",
      environment: "A secluded, minimalist wooden cabin. The fireplace is the heart of the scene. The outside world is visible as a dark, snowy forest through a large window.",
      lighting: "Almost exclusively the soft, ambient light from the fireplace. Deep, moody shadows that create a sense of privacy and seclusion.",
      camera: { focal_length: "50mm f/1.8", aperture: "f/2.0", distance: "3 m", angle: "Observational, as if a quiet onlooker. Eye-level or slightly high-angle.", framing: "Wider medium shot that includes more of the environment, emphasizing the feeling of solitude and the cabin's atmosphere." },
      color_grade: "Cooler shadows (blues and deep greens from the window view) contrasted with the warm core of the firelight. Muted, painterly tones.",
      style: "Fine art narrative photography. A story of quiet solitude, introspection, and the beauty of being alone. Blends intimacy with a sense of place.",
      quality: "Museum-quality 8K fine-art photography, rich in texture and emotional depth.",
      figure_and_form: "Graceful, natural form in repose. Not about power, but about quiet confidence and introspection.",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: defaultFabricPhysics,
      material_properties: "The texture of delicate lace against chunky knit wool stockings. The smooth grain of the wooden floorboards. The reflection of fire in the window pane."
    }
  },
  {
    name: 'EXP-PREMIUM: Maximum Artistic Expression',
    data: {
      shot: "9:16 aspect ratio. Maximum artistic intimate framing. Erotic art photography tradition with bold sensuality. Emphasizing power dynamics and commanding sensual presence.",
      subject: { variant: "Super-Seductress Indian Artist (height 5'9\", measurements 40DD-27-42) with elite artistic model expertise, bi-polar range from corporate power to vulnerable erotic-muse, voluptuous statuesque proportions with maximum artistic confidence and a flawless, radiant skin tone.", pose: "Powerful stance with commanding presence and authority combined with seductive intimate positioning conveying maximum artistic allure and erotic confidence", hair_color: "jet black", hair_style: "Dramatic maximum volume with artistic sensual flow and powerful styling", skin_finish: "Maximum luminous artistic glow with radiant perfection", hand_and_nail_details: "Artistic power gesture with maximum sensual refinement", tattoos: "none", piercings: "none", body_art: "none", nail_art: "Bold power red maximum polish", high_heels: "Maximum designer artistic heels" },
      wardrobe: "Minimal coverage with maximum artistic expression, avant-garde foundation pieces with bold sculptural erotic forms and premium intimate reveals",
      environment: "Private luxury penthouse with floor-to-ceiling windows, intimate premium atmosphere with artistic luxury and erotic sophistication",
      lighting: "Intimate, soft lighting creating warmth and connection. Dramatic sculptural lighting with maximum artistic shadows and powerful erotic illumination.",
      camera: { focal_length: "85mm f/1.4", aperture: "f/1.4", distance: "1.8 m", angle: "Low angle emphasizing power combined with intimate connection", framing: "Artistic maximum composition emphasizing power and erotic form" },
      color_grade: "Bold maximum artistic color with rich erotic warmth and powerful dramatic depth",
      style: "Erotic art photography tradition with bold sensuality. Sculptural abstraction with geometric form emphasis. Fine art photography tradition, museum-quality artistic merit. Maximum artistic expression with power dynamics and intimate confidence.",
      quality: "Ultra-premium 8K resolution with museum-grade quality. Museum-quality fine-art with maximum detail and erotic artistic perfection.",
      figure_and_form: "Powerful statuesque form with commanding sculptural presence and maximum erotic artistic elegance. Voluptuous bombshell proportions with premium intimate confidence.",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Maximum artistic foundation fabrics with bold erotic reveals, minimal coverage with sculptural premium draping and intimate interaction",
      material_properties: "Premium avant-garde materials with maximum light interaction, bold specular highlights, and artistic erotic richness"
    }
  },
  {
    name: 'EXP-PREMIUM: Avant-Garde Erotic Art',
    data: {
      shot: "9:16 aspect ratio. Avant-garde artistic framing with maximum erotic composition. Bold intimate artistic vision.",
      subject: { variant: "Super-Seductress Indian Artist (height 5'10\", measurements 36-25-38) with maximum artistic range, elite erotic-muse expertise, statuesque proportions with avant-garde confidence and a striking, high-contrast skin tone.", pose: "Avant-garde erotic positioning with maximum artistic bold expression and premium intimate confidence", hair_color: "jet black", hair_style: "Avant-garde artistic maximum styling with bold dramatic presence", skin_finish: "Premium artistic glow with maximum luminous radiance", hand_and_nail_details: "Avant-garde artistic gesture with maximum erotic refinement", tattoos: "none", piercings: "none", body_art: "none", nail_art: "Bold avant-garde polish", high_heels: "Premium avant-garde heels" },
      wardrobe: "Maximum artistic minimal coverage with avant-garde erotic sculptural forms and premium bold reveals",
      environment: "Private avant-garde gallery with maximum intimate atmosphere and premium artistic luxury",
      lighting: "Dramatic avant-garde lighting with maximum artistic erotic shadows and bold intimate illumination",
      camera: { focal_length: "85mm f/1.4", aperture: "f/1.4", distance: "1.5 m", angle: "Avant-garde artistic intimate perspective", framing: "Maximum artistic erotic composition" },
      color_grade: "Bold avant-garde artistic color with maximum erotic richness and premium dramatic depth",
      style: "Avant-garde erotic art photography with maximum bold sensuality. Fine art photography tradition, museum-quality artistic merit. Premium artistic expression.",
      quality: "Museum-quality 8K with maximum erotic artistic perfection and premium avant-garde excellence",
      figure_and_form: "Statuesque avant-garde form with maximum erotic sculptural elegance and premium artistic confidence",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Avant-garde minimal fabrics with maximum erotic reveals and premium sculptural artistic draping",
      material_properties: "Premium avant-garde materials with maximum erotic light interaction and bold artistic specular richness"
    }
  },
  {
    name: 'EXP-PREMIUM: Fine Art Erotic Mastery',
    data: {
      shot: "9:16 aspect ratio. Fine art erotic framing with museum-quality composition. Maximum artistic intimate vision.",
      subject: { variant: "Super-Seductress Indian Artist (height 5'8\", measurements 38DD-26-42) with museum-quality expertise, maximum artistic erotic range, voluptuous statuesque proportions with fine art confidence and a luminous, gallery-quality skin tone.", pose: "Fine art erotic positioning with museum-quality artistic expression and maximum intimate boldness", hair_color: "jet black", hair_style: "Fine art styling with maximum artistic sophistication", skin_finish: "Museum-quality luminous finish with fine art radiance", hand_and_nail_details: "Fine art gesture with maximum artistic erotic refinement", tattoos: "none", piercings: "none", body_art: "none", nail_art: "Fine art bold polish", high_heels: "Museum-quality designer heels" },
      wardrobe: "Maximum artistic minimal coverage with fine art erotic forms and museum-quality sculptural reveals",
      environment: "Private museum-quality gallery with maximum intimate fine art atmosphere and premium luxury",
      lighting: "Fine art erotic lighting with museum-quality artistic shadows and maximum intimate illumination",
      camera: { focal_length: "85mm f/1.4", aperture: "f/1.4", distance: "1.8 m", angle: "Fine art intimate perspective", framing: "Museum-quality erotic artistic composition" },
      color_grade: "Fine art color with maximum erotic artistic richness and museum-quality depth",
      style: "Fine art erotic photography with museum-quality tradition and maximum bold sensuality. Premium artistic mastery.",
      quality: "Museum-quality 8K fine-art photography with maximum erotic perfection and premium artistic excellence",
      figure_and_form: "Voluptuous fine art form with maximum erotic sculptural elegance and museum-quality confidence",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Fine art minimal fabrics with maximum erotic reveals and museum-quality sculptural draping",
      material_properties: "Museum-quality materials with maximum erotic light interaction and fine art specular perfection"
    }
  }
];

export const NEW_ARTISTIC_CONCEPTS: ArtisticConcept[] = [
    {
    name: 'EXP-PREMIUM: Midnight Sovereign',
    data: {
      shot: "9:16 aspect ratio. A low-angle, powerful composition emphasizing authority and dominance. The city lights below create a sense of empire.",
      subject: { variant: "A commanding Indian model (height 5'9\", measurements 38-26-40) with an authoritative presence, sharp features, a powerful, athletic physique, and a cool, dusky skin tone that reflects the city lights.", pose: "Seated in a large executive chair, one leg crossed over the other, looking directly into the camera with an unyielding gaze. A posture of absolute control.", hair_color: "jet black", hair_style: "A severe, slicked-back high ponytail. Not a single hair out of place.", skin_finish: "A professional, almost porcelain finish, catching the cool highlights from the city lights.", hand_and_nail_details: "Hand resting authoritatively on the arm of the chair.", tattoos: "none", piercings: "none", body_art: "none", nail_art: "Glossy black or deep crimson nails, filed to a sharp point.", high_heels: "Blade-sharp stiletto heels" },
      wardrobe: "A deconstructed power suit jacket worn as a dress, sharp shoulders, held closed by a single button. Paired with designer stiletto heels.",
      environment: "A CEO's corner office on the top floor of a skyscraper at midnight. Floor-to-ceiling windows reveal a sprawling, glittering city.",
      lighting: "The primary light source is the cool, ambient glow of the city lights through the window, creating dramatic silhouettes and rim lighting. A single, hard key light from the side picks out sharp details.",
      camera: { focal_length: "35mm", aperture: "f/2.8", distance: "3 m", angle: "Low angle, looking up at the subject to reinforce her power and dominance.", framing: "Full body shot that captures both the subject and the scale of the city behind her." },
      color_grade: "Cool, deep blues and blacks, with sharp, cold highlights. A corporate, almost sterile color palette, punctuated by the city's electric colors.",
      style: "Corporate Noir. A fusion of high-powered executive aesthetics with the dramatic, shadowy tension of film noir. A story of power, ambition, and control.",
      quality: "Ultra-premium 8K, with sharp focus on the textures of the suit fabric, the reflections in the glass, and the details of the cityscape.",
      figure_and_form: "A powerful, athletic form that conveys authority and discipline. Sharp lines and a commanding posture.",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: defaultFabricPhysics,
      material_properties: "The sharp weave of a luxury wool suit, the cold reflection of chrome and glass, the smooth finish of a leather executive chair."
    }
  },
  {
    name: 'EXP-ART: Dawn Canvas',
    data: {
      shot: "9:16 aspect ratio. An observational, almost voyeuristic composition. The feeling of catching a private, unguarded moment of creativity and vulnerability.",
      subject: { variant: "An Indian model (height 5'7\", measurements 36-27-39) with an introspective, artistic soul, a soft, natural form that conveys grace and quiet strength, and a warm, wheatish skin tone.", pose: "Curled up on the floor amidst canvases, or standing and looking out a large window, lost in thought. Body language is relaxed, open, and vulnerable.", hair_color: "dark brown", hair_style: "Loose, messy bun with strands escaping to frame the face. Effortless and authentic.", skin_finish: "Soft, matte skin texture, capturing the gentle morning light. No artificial shine.", hand_and_nail_details: "Hands might be smudged with a bit of charcoal or paint.", tattoos: "a small, artistic tattoo might be visible", piercings: "simple, small earrings", body_art: "none", nail_art: "Bare, clean nails.", high_heels: "none" },
      wardrobe: "Wrapped in a large, paint-splattered canvas drop cloth, worn like a toga or a shawl, revealing a shoulder or a leg. The fabric is coarse and utilitarian, contrasting with the skin.",
      environment: "An artist's loft studio at dawn. Large, industrial windows, canvases leaning against the walls, wooden floors, the smell of turpentine and oil paint.",
      lighting: "Soft, diffused morning light streaming through the large windows. Long, gentle shadows. A feeling of peace and new beginnings.",
      camera: { focal_length: "50mm f/1.8", aperture: "f/2.2", distance: "4 m", angle: "Eye-level, observational. The camera is a quiet presence, not an intrusion.", framing: "A wider medium shot, placing the subject within her creative environment, emphasizing the space and the light." },
      color_grade: "Soft, muted tones. Pale blues and greys from the morning light, with the warm, earthy tones of the wooden floor and canvases. A painterly quality.",
      style: "Intimate Realism. A fine-art approach that finds beauty in authenticity and vulnerability. A portrait of the artist in her sanctuary.",
      quality: "Museum-quality 8K fine-art photography, capturing the rich textures of the canvas, the dust motes in the light, and the subtle emotion on the subject's face.",
      figure_and_form: "A natural, relaxed form. The beauty is in the authenticity of the pose, not its perfection.",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: defaultFabricPhysics,
      material_properties: "The rough texture of the canvas drop cloth against soft skin. The aged grain of the wooden floor. The transparency of glass."
    }
  },
   {
    name: 'EXP-MOD: Velvet Confessions',
    data: {
      shot: "9:16 aspect ratio. An intimate, close-up composition that feels like a shared secret. Focus on texture, emotion, and the warmth of the light.",
      subject: { variant: "An Indian model (height 5'6\", measurements 38D-28-42) with a soulful, expressive face, a curvaceous, inviting form, and a deep, warm brown skin tone that glows in the lamplight. She excels at conveying deep emotion.", pose: "Sitting on the edge of a bed, leaning towards the light, or half-submerged in plush pillows. The mood is one of quiet confession or intimate conversation.", hair_color: "jet black", hair_style: "Soft, tousled waves, as if she's just woken up. Intimate and natural.", skin_finish: "A warm, dewy finish that catches the golden light, making the skin look incredibly soft and touchable.", hand_and_nail_details: "Hands holding a silk pillowcase or resting gently on her own knee.", tattoos: "none", piercings: "none", body_art: "none", nail_art: "A deep, rich burgundy or plum.", high_heels: "none" },
      wardrobe: "A simple, elegant crimson silk slip dress or teddy. The fabric drapes and pools around her, catching the light like liquid.",
      environment: "A luxurious, dimly lit hotel suite. The key features are a bed with a plush velvet headboard and opulent, heavy curtains.",
      lighting: "A single, warm-toned bedside lamp is the only light source. It creates a dramatic, high-contrast scene with a single pool of golden light and deep, enveloping shadows. Chiaroscuro effect.",
      camera: { focal_length: "85mm f/1.4", aperture: "f/1.8", distance: "1.5 m", angle: "Intimate and close, at eye-level. Creates a strong connection with the subject.", framing: "A tight medium shot, from the waist up, focusing on her expression and the interplay of light on her skin and the velvet textures." },
      color_grade: "Extremely warm and saturated. Deep reds, golds, and rich, velvety blacks. A palette that is decadent and sensual.",
      style: "Cinematic Intimacy. Looks like a still from a dramatic, emotional film. A blend of luxury, sensuality, and narrative tension.",
      quality: "Ultra-premium 8K, capturing the lush texture of the velvet, the sheen of the silk, and the subtle nuances of her expression.",
      figure_and_form: "Soft, inviting curves that are revealed and concealed by the deep shadows. A celebration of natural, feminine form.",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: defaultFabricPhysics,
      material_properties: "The light-absorbing quality of plush velvet versus the high sheen of silk charmeuse. The soft glow of a fabric lampshade."
    }
  },
  {
    name: 'EXP-ART: Palace of Whispers',
    data: {
      shot: "9:16 aspect ratio. A quiet, reverent composition that captures the grandeur and intimacy of the space. A sense of timelessness and regal solitude.",
      subject: { variant: "An Indian model (height 5'8\", measurements 36-26-38) with a regal, graceful presence and classical features, a luminous, golden-fair skin tone, embodying the elegance of a modern Maharani.", pose: "Contemplative and serene. Seated on a plush divan, trailing a hand in a fountain, or standing silhouetted against a carved jali screen. Poses are elegant and unhurried.", hair_color: "dark", hair_style: "A long, intricate braid, perhaps adorned with jasmine flowers or simple gold ornaments. Traditional and elegant.", skin_finish: "A soft, matte finish that captures the diffused, golden light beautifully. Regal and understated.", hand_and_nail_details: "Graceful mudra-like hand positions.", tattoos: "none", piercings: "traditional nose or ear piercings", body_art: "none", nail_art: "Simple, clean nails or a touch of gold.", high_heels: "none, perhaps elegant mojari slippers" },
      wardrobe: "A floor-length, sheer silk or organza sari worn in a traditional yet slightly artistic style, revealing the silhouette beneath. The color is deep indigo or ivory.",
      environment: "An inner courtyard or chamber of a Rajasthani palace at dusk. Intricate archways, the sound of a small fountain, and the soft light of dozens of ornate lanterns.",
      lighting: "Soft, diffused, and golden light from numerous brass lanterns and candles. The light filters through carved screens, creating intricate patterns of light and shadow.",
      camera: { focal_length: "50mm f/1.8", aperture: "f/2.0", distance: "4 m", angle: "Eye-level, respectful distance. The camera observes the scene without intruding.", framing: "A wider shot that incorporates the stunning architecture, making the subject a jewel within a magnificent setting." },
      color_grade: "A rich, warm palette of gold, saffron, and deep indigo. Low contrast, giving the scene a soft, dreamlike quality.",
      style: "Historic Romanticism. A fine-art narrative that evokes the romance and mystique of a bygone era. A blend of cultural heritage and intimate, personal storytelling.",
      quality: "Museum-quality 8K, capturing the intricate details of the carvings, the texture of the silk, and the gentle flicker of the lantern light.",
      figure_and_form: "A graceful, elegant form that complements the flowing lines of the architecture and the sari.",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: defaultFabricPhysics,
      material_properties: "The delicate transparency of sheer silk against hand-carved sandstone. The warm gleam of polished brass. The cool smoothness of marble floors."
    }
  },
  {
    name: 'EXP-MOD: Chrome & Shadow',
    data: {
      shot: "9:16 aspect ratio. A gritty, high-impact composition. Dynamic angles and a sense of imminent action. Cinematic and edgy.",
      subject: { variant: "An Indian model (height 5'10\", measurements 36-25-37) with sharp, angular features, a powerful, athletic body, and a high-sheen, light brown skin tone that reflects neon light. She projects an aura of danger and futuristic cool.", pose: "A dynamic action stance, as if mid-movement. Crouched, or leaning against a grimy wall, ready to spring. A look of intense focus.", hair_color: "jet black with a streak of electric blue", hair_style: "A sharp, asymmetrical undercut or a futuristic bob.", skin_finish: "A high-sheen, almost wet look, reflecting the neon lights like polished chrome.", hand_and_nail_details: "Purposeful, strong hand poses.", tattoos: "cybernetic-style temporary tattoos", piercings: "industrial or facial piercings", body_art: "none", nail_art: "Chrome or glossy black nails.", high_heels: "Platform combat boots" },
      wardrobe: "A second-skin liquid latex or high-shine PVC catsuit. The material is key, creating sharp, specular highlights from the neon lights.",
      environment: "A rain-soaked, narrow back alley in a cyberpunk city. The ground is reflective, covered in puddles. Steam rises from vents. The air is thick with the glow of neon signs.",
      lighting: "Harsh, high-contrast lighting from vibrant neon signs. No natural light. The colors are electric blue, magenta, and toxic green. Creates razor-sharp highlights and deep, inky shadows.",
      camera: { focal_length: "24mm", aperture: "f/2.8", distance: "2 m", angle: "A Dutch angle or a very low angle to create a sense of unease and dynamism.", framing: "A full-body shot that captures the energy of the pose and the chaos of the environment. Reflections in the puddles are a key compositional element." },
      color_grade: "A heavily stylized, high-saturation palette dominated by neon colors. Crushed blacks and blown-out highlights are part of the aesthetic.",
      style: "Cyberpunk Femme Fatale. A gritty, futuristic, and action-oriented fashion story. Blends science fiction aesthetics with a high-fashion edge.",
      quality: "Ultra-premium 8K, capturing the texture of the wet pavement, the individual diodes in the neon signs, and the flawless sheen of the latex.",
      figure_and_form: "An athletic, powerful form that is both dangerous and sensual. The catsuit accentuates the model's physique, turning her into a living weapon.",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: defaultFabricPhysics,
      material_properties: "The mirror-like reflection of neon on liquid latex. The gritty texture of wet brick. The transparency of rain-streaked air."
    }
  },
  {
    name: 'EXP-PREMIUM: Fireside Muse',
    data: {
      shot: "9:16 aspect ratio. An intimate, artistic composition capturing a moment of quiet sensuality and warmth. Fine art boudoir tradition.",
      subject: { variant: "An Indian model (height 5'7\", measurements 38DD-28-40) with a warm, inviting presence, a soft, curvaceous form, and a rich dusky skin tone, specializing in natural, intimate portraiture.", pose: "Relaxed, authentic positioning near a fireplace, conveying warmth and comfortable sensuality. A quiet moment of contemplation or a gentle stretch.", hair_color: "jet black", hair_style: "Soft, loose waves, looking natural and slightly tousled by the warmth of the fire.", skin_finish: "A luminous glow from the firelight, emphasizing natural skin texture with a warm, radiant finish.", hand_and_nail_details: "Natural, graceful hand placement.", tattoos: "none", piercings: "none", body_art: "none", nail_art: "Deep, warm nail polish like burgundy.", high_heels: "Designer heels nearby" },
      wardrobe: "An intricate yet delicate graphic editorial lace bodysuit, paired with sheer stockings. The look is a blend of rustic comfort and high-fashion lingerie.",
      environment: "A cozy, minimalist wooden cabin with a warm, crackling fireplace as the primary light source and a sheepskin rug providing texture.",
      lighting: "Dominated by the warm, flickering light of the fireplace. Creates soft, deep shadows and an intimate, enveloping atmosphere.",
      camera: { focal_length: "85mm f/1.4", aperture: "f/1.8", distance: "1.5 m", angle: "Intimate eye-level or slightly lower, creating a personal connection.", framing: "Medium-close, focusing on the form from mid-thigh to head, capturing the interaction with the firelight." },
      color_grade: "Deep warm tones, rich oranges and reds from the fire, with soft, crushed blacks in the shadows. A romantic, filmic quality.",
      style: "Intimate Boudoir Art. A focus on natural sensuality, warmth, and quiet moments, blending rustic comfort with delicate, high-fashion elements.",
      quality: "Ultra-premium 8K, capturing the fine details of the lace, the texture of the wood, and the warmth on the skin.",
      figure_and_form: "Soft, natural feminine curves celebrated in a comfortable, intimate setting.",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: defaultFabricPhysics,
      material_properties: "The detailed texture of graphic lace interacting with flickering firelight. The contrast between delicate lace and the soft texture of a sheepskin rug."
    }
  },
  {
    name: 'EXP-ART: Sculptural Elegance',
    data: {
      shot: "9:16 aspect ratio. Sensual artistic framing with intimate aesthetic composition.",
      subject: { 
        variant: "Indian sensual artist model (height 5'9\", measurements 36-26-39) with intimate expertise, graceful sensual proportions, a flawless wheatish skin tone, and artistic confidence.", 
        pose: "Executing a sensual artistic gesture with intimate refinement.", 
        hair_color: "dark", 
        hair_style: "Sensual artistic styling, flowing.", 
        skin_finish: "Sensual artistic glow with intimate luminosity.", 
        hand_and_nail_details: "Sensual artistic gesture with intimate refinement.", 
        tattoos: "none", 
        piercings: "none", 
        body_art: "none", 
        nail_art: "Artistic sensual polish.", 
        high_heels: "Artistic sensual heels" 
      },
      wardrobe: "Artistic high-coverage foundation pieces with sensual sculptural elegance and intimate reveals, like a bespoke silk blend leotard.",
      environment: "A private art gallery with an intimate sensual atmosphere and artistic luxury; a softly lit, minimalist architectural studio with large abstract sculptures.",
      lighting: "Sensual artistic lighting, with an intimate warm glow and sculptural shadows.",
      camera: { 
        focal_length: "85mm", 
        aperture: "f/2.0", 
        distance: "2 m", 
        angle: "Sensual artistic angle.", 
        framing: "Artistic sensual composition." 
      },
      color_grade: "Sensual artistic tones with warm intimate depth.",
      style: "Sensual art photography with intimate artistic tradition and fine art elegance.",
      quality: "Fine-art 8K with sensual artistic quality and intimate perfection.",
      figure_and_form: "Graceful sensual form with artistic intimate elegance.",
      skin_micro_details: defaultSkinMicroDetails,
      fabric_physics: "Artistic sensual fabrics with intimate sculptural draping.",
      material_properties: "Sensual artistic materials with intimate light interaction."
    }
  }
];

export const ROLE_PLAY_CONCEPTS: ArtisticConcept[] = [
  { name: '🎭 Role-Play: Executive Midnight Reveal', data: rolePlayModeConcepts['roleplay-executive-reveal'] },
  { name: '🎭 Role-Play: Curves in Private Room', data: rolePlayModeConcepts['roleplay-curves-intimate'] },
  { name: '🎭 Role-Play: Bold Underground Encounter', data: rolePlayModeConcepts['roleplay-bold-underground'] },
  { name: '🎭 Role-Play: Actress in Midnight Cabin', data: rolePlayModeConcepts['roleplay-actress-cabin'] },
  { name: '🎭 Role-Play: Athletic Glamour in Office', data: rolePlayModeConcepts['roleplay-athletic-office'] },
  { name: '🎭 Role-Play: Maximum Glamour Luxury', data: rolePlayModeConcepts['roleplay-maxglam-luxury'] },
  { name: '🎭 Role-Play: Midnight Mystique Noir', data: rolePlayModeConcepts['roleplay-midnight-noir'] },
  { name: '🎭 Role-Play: Action Power in Cabin', data: rolePlayModeConcepts['roleplay-action-power'] },
  { name: '🎭 Role-Play: Fitness Vixen Office Scene', data: rolePlayModeConcepts['roleplay-fitness-office'] },
  { name: '🎭 Role-Play: Glamour Diva in Urban Edge', data: rolePlayModeConcepts['roleplay-diva-garage'] },
  { name: '🎭 Role-Play: Curves in Midnight Cabin', data: rolePlayModeConcepts['roleplay-curves-cabin'] },
  { name: '🎭 Role-Play: Cinematic Office Scene', data: rolePlayModeConcepts['roleplay-actress-office'] }
];
