import type { PromptData } from './types';
import { INDIAN_GLAMOUR_MODELS } from './indianGlamourModels';

// Helper to find a model by name from the full list, with a fallback to the first model.
const getModelVariant = (partialName: string): string => {
  const model = INDIAN_GLAMOUR_MODELS.find(m => m.name.toLowerCase().includes(partialName.toLowerCase()));
  return model ? model.name : INDIAN_GLAMOUR_MODELS[0].name;
};

const defaultSkinMicroDetails = "Ultra-high-resolution authentic skin texture with visible pores, natural imperfections, and realistic subsurface scattering. Museum-grade detail with no artificial smoothing.";
const defaultFabricPhysics = "Advanced fabric simulation with realistic draping, natural creases, and precise material interaction with body form. Visible fabric weave and texture.";
const defaultMaterialProperties = "Authentic material properties with complex light interaction, from soft matte absorption to precise specular highlights based on material type.";

const rolePlayModeConcepts: Record<string, PromptData> = {
  'roleplay-executive-reveal': {
    shot: "9:16 aspect ratio. An intimate, dramatic medium shot capturing a power dynamic shift. The focus is on the reveal and the subject's commanding expression.",
    subject: {
      variant: getModelVariant('Aisha Décolletage'),
      pose: "Seated in a large executive chair, slowly unbuttoning a silk blouse to reveal an intricate lace garment beneath. Her gaze is direct, confident, and challenging.",
      hair_color: "jet black",
      hair_style: "A sharp, professional updo, with a few intentional strands escaping to soften the look.",
      skin_finish: "Luminous, catching the low light of the desk lamp.",
      hand_and_nail_details: "Impeccable manicure with deep crimson polish, hands moving with deliberate grace.",
      tattoos: "none", piercings: "none", body_art: "none",
      nail_art: "Deep Crimson Polish",
      high_heels: "Sharp stiletto heels, visible as she crosses her legs."
    },
    wardrobe: "A crisp white silk blouse, partially unbuttoned, over a 'Single Lace Thread Upper' artistic piece. A high-waisted leather pencil skirt.",
    environment: "A private, secret office late at night. The only light comes from a single, warm desk lamp and the cool glow of the city skyline through a large window.",
    lighting: "Dramatic chiaroscuro. The warm desk lamp creates strong side-lighting, carving her features out of the deep shadows of the otherwise dark room.",
    camera: { focal_length: "85mm f/1.4", aperture: "f/1.8", distance: "2 m", angle: "Eye-level, creating an intense, personal connection.", framing: "Medium shot from the waist up, focusing on the action of the reveal and her expression." },
    color_grade: "A cool, cinematic grade for the city, contrasted with the warm, intimate glow of the lamp. Deep, rich blacks.",
    style: "Corporate Noir meets intimate role-play. A story of power, confidence, and sensual revelation.",
    quality: "Ultra-premium 8K, with focus on the texture of the silk, the intricate detail of the lace, and the micro-expressions on her face.",
    figure_and_form: "Emphasizes the upper body curves and décolletage, framed by the professional attire being removed.",
    skin_micro_details: defaultSkinMicroDetails, fabric_physics: defaultFabricPhysics, material_properties: "The soft sheen of silk against the intricate matte texture of lace. The cool reflection of glass and the warm grain of a mahogany desk."
  },
  'roleplay-curves-intimate': {
    shot: "9:16 aspect ratio. A soft, painterly medium shot focusing on the sculptural quality of the subject's lower body.",
    subject: {
      variant: getModelVariant('Priya Curves'),
      pose: "Reclining on a bed with silk sheets, arching her back slightly. One hand trails over her hip, drawing attention to the curve. Her expression is soft, vulnerable, and inviting.",
      hair_color: "jet black",
      hair_style: "Long, loose waves spread out across the silk pillows.",
      skin_finish: "Dewy and radiant, glowing in the soft bedside light.",
      hand_and_nail_details: "Natural manicure, fingers gently tracing her own form.",
      tattoos: "none", piercings: "none", body_art: "none",
      nail_art: "Natural nude polish",
      high_heels: "None, barefoot."
    },
    wardrobe: "A 'Single Lace Thread Lower' hip harness combined with a simple, sheer silk short robe worn open, pooling around her waist.",
    environment: "A private, intimate room with minimalist luxury. The focus is a large bed with dark silk sheets. Soft, warm ambient light.",
    lighting: "A single, soft bedside lamp provides a warm, directional light that creates gentle, rolling shadows across her hips and thighs, emphasizing their shape.",
    camera: { focal_length: "85mm f/1.4", aperture: "f/1.8", distance: "2.5 m", angle: "Slightly high angle, looking down, creating a sense of intimacy and artistic observation.", framing: "Medium shot from the waist to the knees, making the hip curves the central element of the composition." },
    color_grade: "Warm, romantic tones with soft, deep shadows. A palette of gold, cream, and deep charcoal.",
    style: "Fine-art boudoir. A quiet, sensual celebration of the female form, focusing on shape and texture.",
    quality: "Museum-quality 8K, capturing the texture of the silk sheets, the delicate lace, and the soft glow on the skin.",
    figure_and_form: "A sculptural study of the hips and thighs. The pose and lighting are designed to maximize the dramatic S-curve of the lower body.",
    skin_micro_details: defaultSkinMicroDetails, fabric_physics: defaultFabricPhysics, material_properties: "The high sheen of silk sheets contrasted with the matte softness of skin. The delicate, almost invisible texture of the lace threads."
  },
    'roleplay-bold-underground': {
    shot: "16:9 aspect ratio. A wide, cinematic shot capturing the contrast between the subject and the harsh environment.",
    subject: {
      variant: getModelVariant('Meera Sensualité'),
      pose: "Leaning against a concrete pillar, one leg propped up on a vintage sports car's bumper. Her pose is casual but her gaze is intense and direct. A mix of relaxation and coiled energy.",
      hair_color: "jet black",
      hair_style: "A slightly messy, high-volume style that suggests a wild night.",
      skin_finish: "A subtle sheen, reflecting the harsh overhead lights.",
      hand_and_nail_details: "Glossy black nails, one hand resting on her thigh.",
      tattoos: "none", piercings: "none", body_art: "none",
      nail_art: "Glossy Black Polish",
      high_heels: "Platform combat boots."
    },
    wardrobe: "A 'Single Leather Thread Body Harness' over a minimalist black bralette and high-waisted shorts. The look is edgy and powerful.",
    environment: "A gritty, industrial underground garage. Fluorescent lights flicker overhead, casting long shadows. A classic, red muscle car is parked nearby.",
    lighting: "Harsh, top-down fluorescent lighting creates dramatic, stark shadows and a cool, almost greenish color cast, contrasted by the warm red of the car.",
    camera: { focal_length: "35mm", aperture: "f/2.8", distance: "4 m", angle: "Low angle, making both the model and the car appear powerful and imposing.", framing: "Wide shot capturing the full scene: model, car, and the gritty texture of the garage." },
    color_grade: "Gritty, desaturated tones with a pop of saturated red from the car. Increased contrast and a slight film grain effect.",
    style: "Urban Noir with a high-fashion, fetishistic edge. A story of danger, power, and underground encounters.",
    quality: "8K with a focus on gritty textures: the rough concrete, the peeling paint on the car, the grain of the leather.",
    figure_and_form: "A balanced, powerful hourglass silhouette standing out against the harsh, geometric lines of the industrial environment.",
    skin_micro_details: defaultSkinMicroDetails, fabric_physics: defaultFabricPhysics, material_properties: "The gleam of worn leather against the matte texture of concrete. The high-gloss reflection of the car's paint job."
  },
  'roleplay-actress-cabin': {
    shot: "16:9 aspect ratio. A cinematic wide shot with a sense of isolation and introspection.",
    subject: {
      variant: getModelVariant('Zara Cinématique'),
      pose: "Standing in front of a floor-to-ceiling window in a remote cabin, looking out at a misty, moonlit forest. Her silhouette is framed by the window. A feeling of quiet, emotional contemplation.",
      hair_color: "jet black",
      hair_style: "Natural, loose waves, slightly damp from the misty air.",
      skin_finish: "Natural, with cool moonlight creating a soft, ethereal glow on her skin.",
      hand_and_nail_details: "One hand resting on the cold glass of the window.",
      tattoos: "none", piercings: "none", body_art: "none",
      nail_art: "Bare, natural nails.",
      high_heels: "None, barefoot on a wooden floor."
    },
    wardrobe: "An 'Erotic-Art Film Costume' consisting of a simple, sheer, floor-length white silk robe, worn open over a minimal lace piece.",
    environment: "A minimalist, modern cabin deep in a forest at midnight. The interior is dark, with the only light coming from the moon outside.",
    lighting: "Dramatic backlighting from a full moon outside the window. This creates a powerful silhouette, with soft, cool rim light defining her form.",
    camera: { focal_length: "50mm", aperture: "f/2.0", distance: "5 m", angle: "Eye-level, from across the room, creating an observational, almost voyeuristic feel.", framing: "Wide shot that includes the large window and the silhouette, emphasizing her solitude and the vastness of the nature outside." },
    color_grade: "Deep, moody blues and blacks, with the soft, ethereal white of the moonlight. A very low-saturation, atmospheric palette.",
    style: "Cinematic psychological drama. A story of introspection, vulnerability, and isolation in a remote, beautiful setting.",
    quality: "8K resolution, capturing the texture of the mist outside and the subtle details of her silhouette against the light.",
    figure_and_form: "A graceful, expressive silhouette. The sheer robe hints at her dramatic curves, making them part of the atmospheric landscape.",
    skin_micro_details: defaultSkinMicroDetails, fabric_physics: defaultFabricPhysics, material_properties: "The transparency of sheer silk against the cold, hard surface of glass. The organic texture of the dark wood interior."
  },
   'roleplay-athletic-office': {
    shot: "9:16 aspect ratio. A dynamic, high-contrast full-body shot that juxtaposes athletic power with a corporate environment.",
    subject: {
      variant: getModelVariant('Kavya Athléa'),
      pose: "A powerful, dynamic pose on top of a large mahogany desk. Perhaps a deep athletic lunge or a graceful handstand, showcasing her strength and flexibility. Her expression is one of intense focus and control.",
      hair_color: "jet black",
      hair_style: "A sleek, tight, high ponytail that emphasizes her athletic movements.",
      skin_finish: "A light sheen of perspiration, as if from a workout, catching the sharp office lighting.",
      hand_and_nail_details: "Strong, capable hands, nails are short and practical.",
      tattoos: "none", piercings: "none", body_art: "none",
      nail_art: "Clear, protective gloss.",
      high_heels: "Worn as a prop, not on feet. Maybe holding a stiletto heel with a look of disdain."
    },
    wardrobe: "An 'Erotic-Art Athletic Minimal Set' that showcases her muscular definition, combined with elements of corporate attire, like a discarded tie or a blazer worn open.",
    environment: "A private secret office, late at night. The corporate setting is treated as a playground or a gym.",
    lighting: "Harsh, dramatic lighting from a single desk lamp, creating sharp, sculpted shadows that highlight her muscle definition, reminiscent of a Helmut Newton photograph.",
    camera: { focal_length: "35mm", aperture: "f/4.0", distance: "3 m", angle: "Low angle, to make her athletic form seem even more powerful and dominant over the executive environment.", framing: "Full body shot that captures the entire pose and its interaction with the desk and office." },
    color_grade: "High-contrast black and white, or a severely desaturated color palette to emphasize form and shadow.",
    style: "Aggressive Corporate Takeover. A narrative of athletic power and sensuality subverting a traditional space of masculine authority.",
    quality: "Ultra-sharp 8K, focusing on the details of muscle striation, the texture of the athletic wear, and the polished wood of the desk.",
    figure_and_form: "A celebration of the powerful, athletic female form. The pose is sculptural, turning the body into a piece of living art that dominates the space.",
    skin_micro_details: defaultSkinMicroDetails, fabric_physics: defaultFabricPhysics, material_properties: "The matte, high-performance fabric of her athletic wear against the high-gloss polish of the executive desk. The contrast of soft skin and hard wood."
  },
  'roleplay-maxglam-luxury': {
    shot: "9:16 aspect ratio. An opulent, full-body portrait that screams luxury and high glamour.",
    subject: {
      variant: getModelVariant('Ishani Glamazon'),
      pose: "Draped elegantly over a velvet chaise lounge in a luxury suite, one hand holding a vintage champagne coupe. Her expression is one of bored, confident decadence.",
      hair_color: "jet black",
      hair_style: "Elaborate, voluminous Hollywood waves, perfectly coiffed.",
      skin_finish: "Flawless and luminous, with a golden highlight on the cheekbones.",
      hand_and_nail_details: "Long, perfectly manicured nails with a deep red polish.",
      tattoos: "none", piercings: "none", body_art: "none",
      nail_art: "Classic Red Glamour",
      high_heels: "Jewel-encrusted stiletto heels."
    },
    wardrobe: "'Golden Goddess Chains'—an ultra-luxury minimal garment made of 24k gold chains and strategically placed silk accents, revealing her commanding curves.",
    environment: "A luxury penthouse suite, with opulent furnishings, a marble fireplace, and a stunning night view of the city.",
    lighting: "Soft, warm, and golden. A mix of ambient light from lamps and the fireplace creates a rich, glamorous glow that makes everything sparkle.",
    camera: { focal_length: "50mm f/1.4", aperture: "f/2.0", distance: "3.5 m", angle: "Eye-level, to capture her as an equal in this luxurious setting, not an object.", framing: "A full-body composition that includes the chaise lounge and elements of the luxurious room to build the atmosphere." },
    color_grade: "A rich, warm, golden-hued palette. Saturated colors and soft, glowing highlights.",
    style: "Maximum Hollywood Glamour. A timeless fantasy of luxury, wealth, and unapologetic sensuality.",
    quality: "8K resolution with a focus on luxury textures: the pile of the velvet, the sparkle of gold and jewels, the sheen of silk.",
    figure_and_form: "A perfect, bold hourglass figure presented with ultimate confidence and glamour. The pose is elegant and designed to showcase her commanding presence.",
    skin_micro_details: defaultSkinMicroDetails, fabric_physics: defaultFabricPhysics, material_properties: "The texture of crushed velvet, the hard sparkle of gold chains against soft skin, the reflection of light in a crystal champagne glass."
  },
    'roleplay-midnight-noir': {
    shot: "16:9 aspect ratio. A classic film noir frame, with deep shadows and a sense of mystery.",
    subject: {
      variant: getModelVariant('Maya Midnight'),
      pose: "Standing partially obscured by the shadows from Venetian blinds, peering out into the night. Her expression is enigmatic and unreadable.",
      hair_color: "jet black",
      hair_style: "A classic 1940s-style wave, elegant and mysterious.",
      skin_finish: "Matte, with sharp highlights created by the slices of light cutting through the blinds.",
      hand_and_nail_details: "Hand resting on the window frame, nails painted a dark, mysterious color.",
      tattoos: "none", piercings: "none", body_art: "none",
      nail_art: "Deep Oxblood",
      high_heels: "Classic black pumps."
    },
    wardrobe: "'Shadow Lace Midnight'—a dark, mysterious lace garment that blends into the shadows, with its patterns only revealed by the light.",
    environment: "A dimly lit private office or detective's room. The key element is a large window with Venetian blinds, casting dramatic shadows.",
    lighting: "High-contrast, low-key lighting. A single, hard light source from outside the window, filtered through the blinds, creates a striped pattern of light and shadow across the scene.",
    camera: { focal_length: "35mm", aperture: "f/2.8", distance: "4 m", angle: "Slightly low angle, adding to the sense of drama and intrigue.", framing: "Medium wide shot that captures her relationship to the window and the dramatic play of light and shadow." },
    color_grade: "Classic black and white, with deep, crushed blacks and bright, sharp whites. High contrast and film grain.",
    style: "Classic Film Noir. A narrative of mystery, secrets, and dangerous allure, told through light and shadow.",
    quality: "8K, capturing the sharp details of the light patterns and the texture of the lace against her skin.",
    figure_and_form: "An enigmatic silhouette, where curves are suggested and revealed by the patterns of light, creating a sense of mystery.",
    skin_micro_details: defaultSkinMicroDetails, fabric_physics: defaultFabricPhysics, material_properties: "The interplay of light and shadow as the primary texture. The matte finish of shadow lace against skin."
  },
  'roleplay-action-power': {
    shot: "16:9 aspect ratio. A wide, dynamic action shot, filled with energy and a sense of imminent impact.",
    subject: {
      variant: getModelVariant('Riya Powerhouse'),
      pose: "Mid-action, perhaps kicking down the cabin door or in a powerful martial arts stance. Her body is tensed, her expression is fierce and determined. She is a force of nature.",
      hair_color: "jet black",
      hair_style: "A practical but stylish braid, whipping through the air with her movement.",
      skin_finish: "Natural, with a healthy athletic glow. Might be smudged with dirt from the action.",
      hand_and_nail_details: "Hands balled into fists or in a fighting stance, ready for impact.",
      tattoos: "none", piercings: "none", body_art: "none",
      nail_art: "Short, practical nails.",
      high_heels: "Barefoot or wearing practical combat boots."
    },
    wardrobe: "An 'Action Leather Minimal' outfit, designed for movement and to highlight her powerful physique. It's tactical, yet sensual.",
    environment: "A minimalist cabin in the woods, now the scene of an intense action sequence. The environment is being destroyed by the action (splintering wood, broken furniture).",
    lighting: "Dramatic, high-contrast lighting. A mix of the cabin's warm interior light and cool, dramatic moonlight from outside, with flashes of simulated gunfire or explosions.",
    camera: { focal_length: "24mm", aperture: "f/4.0", distance: "3 m", angle: "A low, Dutch angle to increase the sense of chaos and dynamism. Shutter speed is fast to freeze the action.", framing: "Wide shot to capture the full body in action and the environmental destruction." },
    color_grade: "A gritty, cinematic color grade with high contrast. Muted colors, except for flashes of orange from the action.",
    style: "High-Octane Action Film. A narrative of a powerful heroine who is both dangerous and alluring.",
    quality: "Ultra-sharp 8K, freezing every detail of the action, from flying wood splinters to the tension in her muscles.",
    figure_and_form: "A powerful, athletic hourglass physique captured in peak motion. A demonstration of strength, agility, and sensual power.",
    skin_micro_details: defaultSkinMicroDetails, fabric_physics: defaultFabricPhysics, material_properties: "The texture of splintering wood, the tactical feel of her action gear, the flash of light on worn leather."
  },
    'roleplay-fitness-office': {
    shot: "9:16 aspect ratio. A powerful, full-body portrait that blends fitness aesthetics with corporate power.",
    subject: {
      variant: getModelVariant('Nisha Vitality'),
      pose: "A demonstration of supreme physical confidence, such as holding a perfect plank on the executive desk or performing an elegant yoga pose in the center of the boardroom. The pose is controlled, powerful, and serene.",
      hair_color: "jet black",
      hair_style: "A sleek, functional, and stylish high ponytail.",
      skin_finish: "A healthy, radiant glow, enhanced by a light sheen of perspiration.",
      hand_and_nail_details: "Strong, well-kept hands, nails are short and neat.",
      tattoos: "none", piercings: "none", body_art: "none",
      nail_art: "A subtle, metallic polish.",
      high_heels: "Designer stilettos neatly placed on the floor, discarded in favor of barefoot power."
    },
    wardrobe: "A 'Fitness Glamour Minimal' set that looks like high-end athletic wear, but with luxurious materials and a fashion-forward design that accentuates her toned physique.",
    environment: "A private secret office or a large, empty boardroom at night. The corporate furniture becomes her workout equipment.",
    lighting: "Clean, sharp, and modern lighting. A mix of cool architectural lighting and a warmer key light to sculpt her form. High-contrast but very clean.",
    camera: { focal_length: "50mm", aperture: "f/2.8", distance: "3.5 m", angle: "Eye-level or slightly low, to respect her power and control over the space.", framing: "A full-body shot that clearly shows the juxtaposition of her fitness pose and the corporate environment." },
    color_grade: "A clean, modern color palette with cool tones, deep blacks, and sharp highlights. Looks like a high-end fitness brand advertisement.",
    style: "Corporate Fitness Editorial. A story about a new kind of power, where physical discipline and mental focus conquer the corporate world.",
    quality: "Flawless 8K, capturing the perfect definition of her muscles, the texture of her high-tech athletic wear, and the clean lines of the office.",
    figure_and_form: "An athletic glamour hourglass, demonstrating that strength, health, and sensuality are the ultimate forms of power.",
    skin_micro_details: defaultSkinMicroDetails, fabric_physics: defaultFabricPhysics, material_properties: "The contrast between advanced, moisture-wicking athletic fabrics and the traditional luxury materials of the office: chrome, glass, and polished wood."
  },
  'roleplay-diva-garage': {
    shot: "16:9 aspect ratio. A high-fashion, cinematic wide shot that contrasts extreme glamour with a gritty, unexpected location.",
    subject: {
      variant: getModelVariant('Ishani Glamazon'),
      pose: "Casually lounging against the hood of a dusty, vintage motorcycle in an underground garage. Her pose is one of regal indifference to her surroundings. She owns the space.",
      hair_color: "jet black",
      hair_style: "An impossibly glamorous, voluminous updo, as if she's just come from a red carpet event.",
      skin_finish: "Perfectly flawless and radiant, a stark contrast to the grime of the garage.",
      hand_and_nail_details: "Long, dramatic nails, perhaps holding a single, perfect long-stemmed rose.",
      tattoos: "none", piercings: "none", body_art: "none",
      nail_art: "Metallic Gold or Silver",
      high_heels: "Outrageously high and glamorous stiletto heels."
    },
    wardrobe: "A 'Luxury Silk Minimal' design—perhaps a flowing, backless silk gown that pools on the dirty concrete floor, completely out of place yet perfectly confident.",
    environment: "A dark, gritty underground garage. Oil stains on the floor, exposed pipes overhead, and harsh, single-point lighting.",
    lighting: "A single, harsh, bare bulb overhead creates a dramatic spotlight effect, with deep shadows and high-contrast highlights that catch the sheen of her silk dress.",
    camera: { focal_length: "35mm", aperture: "f/2.8", distance: "4 m", angle: "Low angle, to elevate her status and make her seem like a queen in this unlikely kingdom.", framing: "A wide composition that emphasizes the contrast between her glamour and the garage's grit." },
    color_grade: "A desaturated, moody color palette for the environment, but the colors of her dress and lipstick are kept vibrant and saturated.",
    style: "Gritty Glamour Editorial. A high-fashion concept built on the power of contrast and unexpected juxtaposition.",
    quality: "8K with a focus on contrasting textures: the smooth, liquid flow of silk against rough, stained concrete; her flawless skin against the dusty chrome of the motorcycle.",
    figure_and_form: "The perfect, commanding hourglass silhouette of a glamour diva, made even more powerful by the unexpected, gritty setting.",
    skin_micro_details: defaultSkinMicroDetails, fabric_physics: defaultFabricPhysics, material_properties: "The high sheen of luxury silk, the rough texture of concrete, the dull gleam of old chrome, the soft petals of a rose."
  },
    'roleplay-curves-cabin': {
    shot: "9:16 aspect ratio. An intimate, warm, and sensual portrait celebrating curves in a cozy, natural setting.",
    subject: {
      variant: getModelVariant('Ananya Curves'),
      pose: "Seated on a plush sheepskin rug in front of a crackling fireplace. Her body is angled to the camera to emphasize the dramatic curve of her hip. Her expression is warm, content, and deeply sensual.",
      hair_color: "jet black",
      hair_style: "Long, thick, natural waves, cascading over her shoulders.",
      skin_finish: "A warm, radiant glow from the firelight, making her skin look soft and inviting.",
      hand_and_nail_details: "Hands are relaxed, one perhaps resting on her thigh.",
      tattoos: "none", piercings: "none", body_art: "none",
      nail_art: "A deep, warm burgundy.",
      high_heels: "None, she is barefoot."
    },
    wardrobe: "A 'Lace Hip Frame'—a minimal lace garment that specifically frames and celebrates her spectacular hip curves, paired with a cozy, oversized, hand-knit cardigan worn open.",
    environment: "A minimalist, rustic cabin. The main features are a warm, crackling fireplace and a large window looking out into a dark, snowy forest.",
    lighting: "The scene is lit almost entirely by the warm, flickering light of the fireplace. This creates soft, dancing shadows that play across her curves.",
    camera: { focal_length: "85mm f/1.4", aperture: "f/1.8", distance: "2 m", angle: "An intimate, eye-level perspective that makes the viewer feel like they are in the room.", framing: "A medium shot, from the mid-thigh up, with her hip curve as the focal point of the composition." },
    color_grade: "A very warm, saturated palette of oranges, reds, and deep, soft blacks. A cozy and intensely romantic mood.",
    style: "Rustic Boudoir. A celebration of natural curves and sensual warmth, away from the cold world outside.",
    quality: "8K, focusing on the soft textures of the knit cardigan, the plush rug, and the warm glow of the firelight on her skin.",
    figure_and_form: "A celebration of the extreme pear-shaped hourglass figure. The pose, lighting, and wardrobe are all chosen to emphasize her dramatic waist-to-hip ratio.",
    skin_micro_details: defaultSkinMicroDetails, fabric_physics: defaultFabricPhysics, material_properties: "The contrast of delicate lace, chunky knit wool, and soft, plush sheepskin. The warm glow of firelight on skin."
  },
  'roleplay-actress-office': {
    shot: "16:9 aspect ratio. A tense, cinematic frame, suggesting a scene from a high-stakes corporate thriller.",
    subject: {
      variant: getModelVariant('Zara Cinématique'),
      pose: "Sitting on the edge of a large executive desk, phone held to her ear. Her body is tense, her expression is one of serious, high-stakes conversation. She is playing a role, deep in character.",
      hair_color: "jet black",
      hair_style: "A sophisticated and severe corporate bob.",
      skin_finish: "A cool, flawless, matte finish, suitable for a tense cinematic scene.",
      hand_and_nail_details: "One hand grips the phone tightly, the other is a tense fist on the desk. Nails are a professional, neutral color.",
      tattoos: "none", piercings: "none", body_art: "none",
      nail_art: "Classic Nude",
      high_heels: "Sharp, classic stiletto heels."
    },
    wardrobe: "A sharp, impeccably tailored business dress that emphasizes her dramatic curves, suggesting a femme fatale character. The wardrobe is part of her character's armor.",
    environment: "A private secret office. It's late at night, and the room is filled with dramatic shadows. The city lights glitter menacingly outside the window.",
    lighting: "Classic film noir lighting. A single, hard light source (like a desk lamp) creates a dramatic, high-contrast scene. Deep shadows obscure parts of her face and the room, adding to the mystery.",
    camera: { focal_length: "35mm", aperture: "f/2.8", distance: "3 m", angle: "A slightly Dutch angle to create a sense of unease and tension. The camera is an observer of a private, dangerous moment.", framing: "A medium wide shot that establishes the scene—her on the desk, the dark office, the city outside." },
    color_grade: "A cool, desaturated color palette with deep blues and blacks, typical of a modern thriller. The city lights provide small, sharp points of color.",
    style: "Corporate Femme Fatale Thriller. A cinematic role-play that is all about tension, power, and secrets.",
    quality: "8K cinematic quality, with sharp focus and a subtle film grain to enhance the movie-like feel.",
    figure_and_form: "Her dramatic actress's physique is used to create a character of power and sensual danger. The tailored dress highlights a silhouette that is both professional and alluring.",
    skin_micro_details: defaultSkinMicroDetails, fabric_physics: defaultFabricPhysics, material_properties: "The sharp texture of high-end suiting fabric, the cold reflection on the polished desk, the hard gleam of a stiletto heel."
  }
};

export default rolePlayModeConcepts;
