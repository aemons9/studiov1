import type { GlamourModel, Photographer, ModelEnvironment } from './types';

// ============================================================================
// NEW PERSONAL PHOTOGRAPHERS (Dominance & Intimacy)
// ============================================================================

export const NEW_PHOTOGRAPHERS: Record<string, Photographer> = {
  DOMINANCE_ARTIST: {
    name: 'Kaelen Vex',
    specialty: 'High-contrast sensual dominance and power dynamics',
    style: 'Sharp, architectural, and commanding fine-art eroticism',
    intimacy: 10,
    lightingSignature: 'Hard key lighting with deep, defined shadows, creating stark, graphic compositions. High-contrast and dramatic.',
    cameraPreference: '35mm f/2.0 for environmental power shots, emphasizing scale and control.',
    compositionStyle: 'Low angles to convey power, strong geometric lines, and a sense of imposing presence.',
    intimacyApproach: 'An intense, trust-based collaboration focused on embodying strength and authority.',
    fluxSettings: { safetyTolerance: 6, rawMode: true, guidanceScale: 8.0 },
    imagenSettings: { safetyFilter: 'block_few', personGeneration: 'allow_adult' }
  },
  INTIMACY_POET: {
    name: 'Liam Seraphin',
    specialty: 'Quiet moments, emotional connection, and soft vulnerability',
    style: 'Painterly, soft-focus, and deeply romantic intimacy.',
    intimacy: 10,
    lightingSignature: 'Soft, diffused natural light, often from a large window or candlelight, creating a gentle, wrapping glow.',
    cameraPreference: '85mm f/1.4 for dreamlike shallow depth of field and intimate, emotional portraits.',
    compositionStyle: 'Observational, capturing candid, introspective moments. Focus on texture, emotion, and gentle framing.',
    intimacyApproach: 'A quiet, patient observation, creating a safe space for genuine vulnerability and emotional expression.',
    fluxSettings: { safetyTolerance: 5, rawMode: true, guidanceScale: 7.0 },
    imagenSettings: { safetyFilter: 'block_few', personGeneration: 'allow_adult' }
  }
};

// ============================================================================
// NEW ENVIRONMENTS
// ============================================================================

const NEW_ENVIRONMENTS: ModelEnvironment[] = [
    {
      id: 'ceo-office-midnight',
      name: 'CEO\'s Office at Midnight',
      description: 'A top-floor corner office with floor-to-ceiling glass walls revealing a glittering cityscape. The space is minimalist, dominated by a large chrome and glass desk.',
      atmosphere: 'Cold, powerful, authoritative, and dominant.',
      privacyLevel: 10,
      luxuryLevel: 10,
      lightingProfile: 'The cold, ambient light from the city below, creating sharp rim lighting and deep, corporate shadows.',
      materialPalette: ['Polished Chrome', 'Smoked Glass', 'Black Leather', 'Cold Marble']
    },
    {
      id: 'artist-loft-dawn',
      name: 'Artist\'s Loft at Dawn',
      description: 'A spacious, airy loft with large, old factory windows. The space is filled with canvases, paint supplies, and draped drop cloths, all bathed in soft morning light.',
      atmosphere: 'Introspective, vulnerable, creative, and serene.',
      privacyLevel: 9,
      luxuryLevel: 6,
      lightingProfile: 'Soft, diffused, and cool-toned morning light streaming through large windows, creating long, gentle shadows.',
      materialPalette: ['Aged Wood Floors', 'Rough Canvas', 'Exposed Brick', 'Worn Linen']
    },
    {
      id: 'velvet-gold-suite',
      name: 'Velvet & Gold Hotel Suite',
      description: 'An opulent, decadent hotel suite decorated in rich jewel tones. Features a plush velvet bed, brass accents, and heavy drapery that blocks out the world.',
      atmosphere: 'Decadent, intimate, secretive, and luxurious.',
      privacyLevel: 10,
      luxuryLevel: 9,
      lightingProfile: 'A single, warm bedside lamp with a fabric shade, creating an isolated pool of golden light and deep, intimate shadows.',
      materialPalette: ['Crushed Velvet', 'Polished Brass', 'Dark Silk', 'High-Gloss Lacquer']
    }
];


// ============================================================================
// NEW MODEL DEFINITIONS (15 total)
// ============================================================================

// --- SENSUAL DOMINANCE MODELS (7 Models) ---

export const MODEL_SOVEREIGN: GlamourModel = {
  id: 'vanguard-001', name: 'Devika the Sovereign', category: 'Architectural Dominance Specialist', emphasis: 'Power, control, sharp lines, commanding presence', personalPhotographer: NEW_PHOTOGRAPHERS.DOMINANCE_ARTIST,
  physicalTraits: { height: '5\'9"', figure: 'Statuesque and athletic', bust: '38DD', waist: '26"', hips: '40"', emphasis: 'Sharp, defined musculature and an imposing, authoritative frame', skinTone: 'Luminous fair Indian skin with cool undertones that contrasts dramatically with dark elements', features: 'Sharp Indian features, piercing gaze, high cheekbones', fitness: 'Lean, defined, and powerful, like a classical statue', specialties: 'Embodying authority, architectural posing, intense eye contact' },
  wardrobeCollection: [ { id: 'dom-ward-001', name: 'Liquid Latex Bodysuit', description: 'A high-neck, long-sleeved bodysuit in high-gloss black latex that creates a second skin, reflecting light with mirror-like intensity.', coverage: 'full-body', intimacyLevel: 9, style: 'Futuristic Dominance', materials: 'Black Latex', fluxOptimized: true, imagenOptimized: true }, { id: 'dom-ward-002', name: 'Deconstructed Power Suit', description: 'A sharply tailored blazer worn with nothing underneath, paired with a complex leather body harness that peeks out from the lapels.', coverage: 'minimal-architectural', intimacyLevel: 10, style: 'Corporate Noir', materials: 'Wool Suiting, Leather, Steel', fluxOptimized: true, imagenOptimized: true } ],
  poseGallery: [ { id: 'dom-pose-001', name: 'The Throne', description: 'Seated in a minimalist, throne-like chair, looking down at the camera with an expression of absolute control.' }, { id: 'dom-pose-002', name: 'Glass Wall Stare-Down', description: 'Standing, back against a glass wall overlooking the city, silhouette stark and powerful.' } ],
  environments: NEW_ENVIRONMENTS
};

export const MODEL_CONQUEROR: GlamourModel = {
  id: 'vanguard-002', name: 'Ishani the Conqueror', category: 'Primal Power Specialist', emphasis: 'Athletic strength, raw energy, untamed dominance', personalPhotographer: NEW_PHOTOGRAPHERS.DOMINANCE_ARTIST,
  physicalTraits: { height: '5\'9"', figure: 'Powerful athletic build', bust: '38D', waist: '28"', hips: '42"', emphasis: 'Strong thighs, defined back, and a tangible sense of physical power', skinTone: 'Deep, dusky Indian skin that absorbs light, creating rich, deep shadows', features: 'Strong jawline, fierce eyes, a wild mane of dark, curly hair, and powerful Indian features', fitness: 'Visibly powerful, like a warrior or athlete at her peak', specialties: 'Dynamic action poses, embodying raw, untamed energy' },
  wardrobeCollection: [ { id: 'dom-ward-003', name: 'Strappy Leather Harness', description: 'A complex web of thick leather straps that frame and accentuate the muscles of the torso and legs, paired with minimal fabric.', coverage: 'minimal-harness', intimacyLevel: 10, style: 'Warrior Fetish', materials: 'Thick-cut Leather, Iron Buckles', fluxOptimized: true, imagenOptimized: true }, { id: 'dom-ward-004', name: 'Torn Silk Wraps', description: 'Wraps of dark, torn silk that suggest a recent struggle, draped artfully to conceal and reveal.', coverage: 'minimal-artistic', intimacyLevel: 9, style: 'Post-Battle Serenity', materials: 'Raw Silk', fluxOptimized: true, imagenOptimized: true } ],
  poseGallery: [ { id: 'dom-pose-003', name: 'The Predator', description: 'Crouched low to the ground, muscles tensed, as if about to spring into action.' }, { id: 'dom-pose-004', name: 'The Victor', description: 'Standing tall, one foot resting on a metaphorical vanquished object, looking out with pride.' } ],
  environments: NEW_ENVIRONMENTS
};

export const MODEL_ENFORCER: GlamourModel = {
  id: 'vanguard-003', name: 'Zara the Enforcer', category: 'Urban Noir Dominatrix', emphasis: 'Edgy, urban, mysterious, and coldly dominant', personalPhotographer: NEW_PHOTOGRAPHERS.DOMINANCE_ARTIST,
  physicalTraits: { height: '5\'8"', figure: 'Lean and wiry', bust: '36B', waist: '26"', hips: '38"', emphasis: 'Sharp angles, a sense of coiled energy and street-smart toughness', skinTone: 'Edgy light brown Indian skin with neutral undertones, perfect for catching neon city lights', features: 'Sharp, intelligent Indian eyes, often hidden in shadow. A smirk that suggests she knows more than you.', fitness: 'Lean and agile, the fitness of a cat-burglar or street fighter', specialties: 'Embodying mystery, utilizing shadows, conveying intelligence and threat' },
  wardrobeCollection: [ { id: 'dom-ward-005', name: 'Wet-Look Trench Coat', description: 'A black, high-gloss trench coat worn as a dress, belted tightly at the waist. The material reflects the chaotic city lights.', coverage: 'full-coverage-revealing', intimacyLevel: 8, style: 'Cyberpunk Detective', materials: 'High-gloss PVC', fluxOptimized: true, imagenOptimized: true }, { id: 'dom-ward-006', name: 'Micro-Mesh Bodysuit', description: 'A full-body suit made of fine, black industrial micro-mesh, creating a moiré pattern effect over the skin.', coverage: 'sheer-full-body', intimacyLevel: 9, style: 'Digital Ghost', materials: 'Industrial Mesh', fluxOptimized: true, imagenOptimized: true } ],
  poseGallery: [ { id: 'dom-pose-005', name: 'Alleyway Ambush', description: 'Leaning against a graffiti-covered wall, face half-hidden in shadow, waiting.' }, { id: 'dom-pose-006', name: 'Rooftop Surveillance', description: 'Looking down on the city from a high vantage point, a figure of unseen power.' } ],
  environments: NEW_ENVIRONMENTS
};

export const MODEL_MATRIARCH: GlamourModel = {
  id: 'vanguard-004', name: 'Maharani Ishana', category: 'Opulent Authority Specialist', emphasis: 'Regal, decadent, and unshakeable power', personalPhotographer: NEW_PHOTOGRAPHERS.DOMINANCE_ARTIST,
  physicalTraits: { height: '5\'9"', figure: 'Full-figured and curvaceous', bust: '42DD', waist: '28"', hips: '44"', emphasis: 'A soft but powerful voluptuousness that speaks of luxury and command', skinTone: 'Warm, golden-brown Indian skin that glows in warm light', features: 'Commanding, heavy-lidded eyes, full lips, and an aura of regal Indian confidence', fitness: 'The powerful presence of a woman comfortable in her skin, exuding health and power', specialties: 'Embodying decadent power, conveying regal sensuality, luxurious settings' },
  wardrobeCollection: [ { id: 'dom-ward-007', name: 'Velvet & Gold Gown', description: 'A floor-length gown of the deepest crimson velvet, with intricate gold embroidery that traces the curves of the body. Features a dangerously high slit.', coverage: 'full-coverage-dramatic', intimacyLevel: 7, style: 'Modern Royalty', materials: 'Crushed Velvet, Gold Thread', fluxOptimized: true, imagenOptimized: true }, { id: 'dom-ward-008', name: 'Jeweled Corset', description: 'A structured corset adorned with dark jewels, worn with high-waisted silk briefs.', coverage: 'minimal-opulent', intimacyLevel: 10, style: 'Decadent Boudoir', materials: 'Silk, Steel Boning, Jewels', fluxOptimized: true, imagenOptimized: true } ],
  poseGallery: [ { id: 'dom-pose-007', name: 'The Audience', description: 'Seated on a velvet chaise lounge, regarding the viewer with a look of amusement and authority.' }, { id: 'dom-pose-008', name: 'The Decree', description: 'Standing, one hand on her hip, delivering a silent, unarguable command with her eyes.' } ],
  environments: NEW_ENVIRONMENTS
};

export const MODEL_SIREN: GlamourModel = {
  id: 'vanguard-005', name: 'Mira the Siren', category: 'Hypnotic Seduction Specialist', emphasis: 'Irresistible allure, quiet control, psychological dominance', personalPhotographer: NEW_PHOTOGRAPHERS.DOMINANCE_ARTIST,
  physicalTraits: { height: '5\'6"', figure: 'Classic, balanced hourglass', bust: '38D', waist: '26"', hips: '40"', emphasis: 'Perfectly proportioned curves that are hypnotic and alluring', skinTone: 'Luminous wheatish Indian skin that seems to glow from within', features: 'Large, captivating eyes, a perfectly shaped mouth, and classic Indian features', fitness: 'Softly toned, the epitome of classic feminine beauty', specialties: 'Hypnotic eye contact, subtle, controlling gestures, embodying irresistible allure' },
  wardrobeCollection: [ { id: 'dom-ward-009', name: 'Liquid Silk Gown', description: 'A bias-cut gown of liquid silver silk that clings to every curve, pooling at the floor. It is held up by delicate, barely-there straps.', coverage: 'full-coverage-clinging', intimacyLevel: 8, style: 'Old Hollywood Glamour', materials: 'Silk Charmeuse', fluxOptimized: true, imagenOptimized: true }, { id: 'dom-ward-010', name: 'Diamond Body Chain', description: 'A delicate but brilliant body chain of diamonds that traces the hourglass shape of the torso, worn with nothing else.', coverage: 'minimal-jewelry', intimacyLevel: 10, style: 'Expensive Taste', materials: 'Diamonds, Platinum', fluxOptimized: true, imagenOptimized: true } ],
  poseGallery: [ { id: 'dom-pose-009', name: 'The Invitation', description: 'Beckoning with a single finger, a slight smile playing on her lips, an irresistible command.' }, { id: 'dom-pose-010', name: 'The Gaze', description: 'A close-up shot focused entirely on her hypnotic, captivating eyes.' } ],
  environments: NEW_ENVIRONMENTS
};

export const MODEL_ORACLE: GlamourModel = {
  id: 'vanguard-006', name: 'Diya the Oracle', category: 'Intellectual Dominance Specialist', emphasis: 'Intelligence, psychological depth, and unnerving insight', personalPhotographer: NEW_PHOTOGRAPHERS.DOMINANCE_ARTIST,
  physicalTraits: { height: '5\'9"', figure: 'Slender and graceful', bust: '36B', waist: '26"', hips: '38"', emphasis: 'An elegant, cerebral presence; power comes from her mind, not her muscle', skinTone: 'Porcelain-fair Indian skin with a cool, almost translucent quality', features: 'Intelligent, all-knowing eyes; high forehead; delicate, fine Indian features', fitness: 'The toned grace of a dancer or yoga practitioner', specialties: 'Conveying deep thought, unnerving stillness, projecting intellectual authority' },
  wardrobeCollection: [ { id: 'dom-ward-011', name: 'Architectural Origami Dress', description: 'A dress made of stiff, white fabric folded into sharp, architectural, origami-like shapes. It is both concealing and sculptural.', coverage: 'high-coverage-artistic', intimacyLevel: 6, style: 'Avant-Garde Cerebral', materials: 'Starched Linen, Paper-like Fabric', fluxOptimized: true, imagenOptimized: true }, { id: 'dom-ward-012', name: 'Ink-Stained Robe', description: 'A simple, flowing robe of white silk, stained with black calligraphic ink as if she is a living manuscript.', coverage: 'full-coverage-artistic', intimacyLevel: 7, style: 'Poetic Intelligence', materials: 'Silk, Calligraphy Ink', fluxOptimized: true, imagenOptimized: true } ],
  poseGallery: [ { id: 'dom-pose-011', name: 'The Unseen', description: 'Looking just past the camera, as if seeing something the viewer cannot. A hint of a smile suggests she understands it all.' }, { id: 'dom-pose-012', name: 'The Scholar', description: 'Seated amidst a chaotic pile of old books, utterly serene and in control of the knowledge surrounding her.' } ],
  environments: NEW_ENVIRONMENTS
};

export const MODEL_EXECUTIONER: GlamourModel = {
  id: 'vanguard-007', name: 'Kali the Executioner', category: 'Cold Fury Specialist', emphasis: 'Unstoppable force, cold anger, and precise, deadly power', personalPhotographer: NEW_PHOTOGRAPHERS.DOMINANCE_ARTIST,
  physicalTraits: { height: '5\'9"', figure: 'Amazonian and powerful', bust: '38C', waist: '27"', hips: '40"', emphasis: 'Broad shoulders, powerful legs, a body built for action and intimidation', skinTone: 'Deep brown Indian skin with a matte finish, seems to drink in the light', features: 'Completely unreadable expression, cold, dark eyes, and powerful, stoic Indian features', fitness: 'The peak physical condition of an elite soldier or assassin', specialties: 'Projecting cold, emotionless threat; powerful, precise movements; absolute intimidation' },
  wardrobeCollection: [ { id: 'dom-ward-013', name: 'Ballistic Weave Corset', description: 'A tactical, corset-style top made from a material that resembles carbon fiber or ballistic weave, paired with leather leggings.', coverage: 'high-coverage-tactical', intimacyLevel: 8, style: 'Futuristic Assassin', materials: 'Carbon Fiber Weave, Leather', fluxOptimized: true, imagenOptimized: true }, { id: 'dom-ward-014', name: 'Executioner\'s Hood', description: 'A minimal black garment paired with a flowing, face-concealing hood that leaves only her cold eyes and mouth visible.', coverage: 'minimal-hooded', intimacyLevel: 10, style: 'Anonymous Threat', materials: 'Matte Jersey, Silk', fluxOptimized: true, imagenOptimized: true } ],
  poseGallery: [ { id: 'dom-pose-013', name: 'The Final Judgment', description: 'Standing perfectly still, holding a symbolic weapon (like a modern sword or staff), radiating an aura of deadly calm.' }, { id: 'dom-pose-014', name: 'The Approach', description: 'Walking slowly and deliberately toward the camera, an unstoppable, emotionless force.' } ],
  environments: NEW_ENVIRONMENTS
};


// --- ARTISTIC INTIMACY MODELS (8 Models) ---

export const MODEL_DREAMER: GlamourModel = {
  id: 'vanguard-008', name: 'Anjali the Dreamer', category: 'Ethereal Intimacy Specialist', emphasis: 'Vulnerability, softness, introspection, and quiet moments', personalPhotographer: NEW_PHOTOGRAPHERS.INTIMACY_POET,
  physicalTraits: { height: '5\'7"', figure: 'Soft and slender', bust: '36B', waist: '26"', hips: '38"', emphasis: 'A delicate, graceful form that conveys a sense of gentle vulnerability', skinTone: 'Soft, wheatish Indian skin with warm, peachy undertones that glows in soft light', features: 'Large, expressive, doe-like eyes; soft, full lips; and delicate Indian features', fitness: 'Naturally slender with soft, untoned grace', specialties: 'Conveying deep emotion, introspective gazes, creating a sense of poetic melancholy' },
  wardrobeCollection: [ { id: 'int-ward-001', name: 'Oversized Cashmere Sweater', description: 'A large, worn cashmere sweater in a soft cream color that slips off one shoulder, hinting at the form beneath without revealing.', coverage: 'high-coverage-suggestive', intimacyLevel: 7, style: 'Comfortable Solitude', materials: 'Cashmere Wool', fluxOptimized: true, imagenOptimized: true }, { id: 'int-ward-002', name: 'Sheer Muslin Shift', description: 'A simple, shapeless shift dress made of semi-sheer, unbleached muslin, which becomes translucent when hit by light.', coverage: 'sheer-full-coverage', intimacyLevel: 8, style: 'Wabi-Sabi Beauty', materials: 'Raw Muslin', fluxOptimized: true, imagenOptimized: true } ],
  poseGallery: [ { id: 'int-pose-001', name: 'Window Gaze', description: 'Sitting on a windowsill, curled up and looking out at the rain, lost in thought.' }, { id: 'int-pose-002', name: 'Morning Stretch', description: 'A slow, languid stretch in bed, bathed in the soft light of dawn.' } ],
  environments: NEW_ENVIRONMENTS
};

export const MODEL_CONFIDANTE: GlamourModel = {
  id: 'vanguard-009', name: 'Priya the Confidante', category: 'Warm Invitation Specialist', emphasis: 'Comfort, trust, genuine warmth, and shared secrets', personalPhotographer: NEW_PHOTOGRAPHERS.INTIMACY_POET,
  physicalTraits: { height: '5\'6"', figure: 'Softly curvaceous and inviting', bust: '38DD', waist: '28"', hips: '42"', emphasis: 'A warm, nurturing, and approachable physique. The definition of comfortable curves.', skinTone: 'Warm caramel Indian skin that radiates health and warmth', features: 'A genuine, easy smile; kind, sparkling eyes; and warm, inviting Indian features', fitness: 'Healthy and soft, a body that is strong and nurturing', specialties: 'Creating a feeling of safety and trust, genuine emotional connection, warm invitations' },
  wardrobeCollection: [ { id: 'int-ward-003', name: 'Henley & Knit Shorts', description: 'A simple, soft-buttoned Henley shirt paired with cozy, hand-knit shorts. The essence of comfortable, approachable sensuality.', coverage: 'moderate-coverage-comfy', intimacyLevel: 6, style: 'Lazy Sunday Morning', materials: 'Soft Cotton, Wool Yarn', fluxOptimized: true, imagenOptimized: true }, { id: 'int-ward-004', name: 'Draped Linen Sheet', description: 'Artfully draped in a simple, high-quality linen bedsheet, suggesting a shared, intimate moment.', coverage: 'variable-artistic', intimacyLevel: 9, style: 'Post-Conversation Glow', materials: 'Washed Linen', fluxOptimized: true, imagenOptimized: true } ],
  poseGallery: [ { id: 'int-pose-003', name: 'Shared Laughter', description: 'A candid moment of genuine laughter, looking just off-camera as if sharing a joke with someone.' }, { id: 'int-pose-004', name: 'Listening', description: 'Leaning forward slightly, face resting in her hands, with an expression of deep, empathetic listening.' } ],
  environments: NEW_ENVIRONMENTS
};

export const MODEL_MUSE: GlamourModel = {
  id: 'vanguard-010', name: 'Ananya the Muse', category: 'Artistic Inspiration Specialist', emphasis: 'Creative energy, quiet passion, and the beauty of the artistic process', personalPhotographer: NEW_PHOTOGRAPHERS.INTIMACY_POET,
  physicalTraits: { height: '5\'9"', figure: 'Long, graceful, and expressive', bust: '36C', waist: '26"', hips: '39"', emphasis: 'A dancer\'s body, with long limbs and an innate sense of artistic line and form', skinTone: 'Classic medium brown Indian skin, a perfect canvas for creative lighting', features: 'An expressive Indian face capable of conveying a wide range of artistic emotions, from passion to sorrow', fitness: 'The lean, strong physique of a dancer or artist', specialties: 'Collaborating in a creative process, expressive body language, embodying artistic concepts' },
  wardrobeCollection: [ { id: 'int-ward-005', name: 'Paint-Stained Canvas Wrap', description: 'Wrapped in a canvas drop cloth that is stained with the history of past creations. A purely artistic garment.', coverage: 'variable-artistic', intimacyLevel: 8, style: 'The Artist and Her Work', materials: 'Heavy Canvas, Oil Paint', fluxOptimized: true, imagenOptimized: true }, { id: 'int-ward-006', name: 'Flowing Silk Kimono', description: 'A simple, unadorned silk kimono in a deep jewel tone, worn open over bare skin, that moves with a painterly grace.', coverage: 'variable-draped', intimacyLevel: 7, style: 'Poetic Movement', materials: 'Heavy Silk', fluxOptimized: true, imagenOptimized: true } ],
  poseGallery: [ { id: 'int-pose-005', name: 'The Unfinished Work', description: 'Standing before a large, abstract canvas, her pose echoing the lines and colors of the painting.' }, { id: 'int-pose-006', name: 'Repose', description: 'Resting on a wooden floor after a burst of creativity, body relaxed, surrounded by the tools of her trade.' } ],
  environments: NEW_ENVIRONMENTS
};

export const MODEL_GARDENER: GlamourModel = {
  id: 'vanguard-011', name: 'Rani the Gardener', category: 'Earthy & Grounded Specialist', emphasis: 'Connection to nature, organic beauty, and serene strength', personalPhotographer: NEW_PHOTOGRAPHERS.INTIMACY_POET,
  physicalTraits: { height: '5\'8"', figure: 'Strong, healthy, and capable', bust: '38C', waist: '28"', hips: '40"', emphasis: 'A sturdy, grounded physique that speaks of health and vitality', skinTone: 'Sun-kissed dusky Indian skin that looks at home in natural light', features: 'A kind, open face; strong, capable hands; and earthy Indian features', fitness: 'The practical strength that comes from working with the earth', specialties: 'Embodying serenity, connecting with natural elements, conveying a sense of peace' },
  wardrobeCollection: [ { id: 'int-ward-007', name: 'Linen Tunic Dress', description: 'A simple, loose-fitting tunic dress made of natural, undyed linen. It is comfortable, breathable, and moves easily with the body.', coverage: 'high-coverage-natural', intimacyLevel: 5, style: 'Organic Simplicity', materials: 'Raw Linen', fluxOptimized: true, imagenOptimized: true }, { id: 'int-ward-008', name: 'Damp Cotton Shift', description: 'A simple white cotton shift, damp as if after a swim in a lake, which clings to the body in a natural, unstudied way.', coverage: 'clinging-natural', intimacyLevel: 8, style: 'Primal Baptism', materials: 'Thin Cotton', fluxOptimized: true, imagenOptimized: true } ],
  poseGallery: [ { id: 'int-pose-007', name: 'Tending the Earth', description: 'Kneeling in a garden, hands in the soil, with a look of serene focus.' }, { id: 'int-pose-008', name: 'Forest Bathing', description: 'Leaning against an ancient tree, eyes closed, absorbing the energy of the forest.' } ],
  environments: NEW_ENVIRONMENTS
};

export const MODEL_KEEPER: GlamourModel = {
  id: 'vanguard-012', name: 'Zoya the Keeper', category: 'Keeper of Memories Specialist', emphasis: 'Nostalgia, history, and the quiet beauty of the past', personalPhotographer: NEW_PHOTOGRAPHERS.INTIMACY_POET,
  physicalTraits: { height: '5\'6"', figure: 'Petite and timeless', bust: '36C', waist: '27"', hips: '38"', emphasis: 'A classic, timeless Indian beauty that could belong to any era', skinTone: 'Timeless olive Indian skin with a classic glow', features: 'An old soul\'s eyes, with classic Indian features that are both delicate and enduring', fitness: 'Graceful and poised', specialties: 'Evoking nostalgia, interacting with historical objects, telling a story with a single look' },
  wardrobeCollection: [ { id: 'int-ward-009', name: 'Vintage Lace Slip', description: 'An authentic, age-yellowed lace slip from the 1940s. It is delicate, fragile, and full of history.', coverage: 'moderate-coverage-vintage', intimacyLevel: 7, style: 'Inherited Nostalgia', materials: 'Vintage Lace, Silk', fluxOptimized: true, imagenOptimized: true }, { id: 'int-ward-010', name: 'Hand-Knit Shawl', description: 'A large, heavy shawl, hand-knitted by a grandmother, wrapped around her bare shoulders for warmth and comfort.', coverage: 'variable-cozy', intimacyLevel: 6, style: 'Comforting Past', materials: 'Heavy Wool', fluxOptimized: true, imagenOptimized: true } ],
  poseGallery: [ { id: 'int-pose-009', name: 'The Old Photograph', description: 'Looking at a faded, black-and-white photograph with an expression of poignant memory.' }, { id: 'int-pose-010', name: 'Attic Discovery', description: 'Sitting on the floor of a dusty attic, surrounded by old treasures, a soft light from a single window.' } ],
  environments: NEW_ENVIRONMENTS
};

export const MODEL_HEALER: GlamourModel = {
  id: 'vanguard-013', name: 'Samira the Healer', category: 'Empathetic Touch Specialist', emphasis: 'Healing, empathy, gentle touch, and profound compassion', personalPhotographer: NEW_PHOTOGRAPHERS.INTIMACY_POET,
  physicalTraits: { height: '5\'8"', figure: 'A strong yet gentle frame', bust: '38D', waist: '28"', hips: '42"', emphasis: 'A presence that is both grounding and uplifting, a body that offers comfort', skinTone: 'Deep, rich brown Indian skin with warm, reddish undertones', features: 'Deep, compassionate Indian eyes; a gentle, reassuring touch; a calming aura', fitness: 'The sturdy, centered strength of a healer or bodyworker', specialties: 'Conveying compassion through touch, creating a safe and healing atmosphere, empathetic connection' },
  wardrobeCollection: [ { id: 'int-ward-011', name: 'Silk Massage Sarong', description: 'A large piece of heavy, warm silk, used in massage, draped around the body in a secure yet flowing manner.', coverage: 'variable-draped', intimacyLevel: 8, style: 'Therapeutic Touch', materials: 'Heavy Silk', fluxOptimized: true, imagenOptimized: true }, { id: 'int-ward-012', name: 'Warm Water Embrace', description: 'Submerged in a warm, candlelit bath, with only shoulders and face visible, conveying ultimate relaxation and care.', coverage: 'minimal-submerged', intimacyLevel: 9, style: 'Liquid Sanctuary', materials: 'Water, Candlelight', fluxOptimized: true, imagenOptimized: true } ],
  poseGallery: [ { id: 'int-pose-011', name: 'The Gentle Touch', description: 'Hands placed gently on another\'s (unseen) shoulder or arm, conveying comfort and healing.' }, { id: 'int-pose-012', name: 'Receiving Light', description: 'Eyes closed, face turned up towards a warm light, as if absorbing its healing energy.' } ],
  environments: NEW_ENVIRONMENTS
};

export const MODEL_LOVER: GlamourModel = {
  id: 'vanguard-014', name: 'Leila the Lover', category: 'Passionate Connection Specialist', emphasis: 'Deep connection, romantic passion, and the art of love', personalPhotographer: NEW_PHOTOGRAPHERS.INTIMACY_POET,
  physicalTraits: { height: '5\'7"', figure: 'Voluptuous and passionate', bust: '40D', waist: '27"', hips: '43"', emphasis: 'A body that is a celebration of romantic love and passionate connection', skinTone: 'Rich, honey-toned Indian skin that glows with passion', features: 'Full, sensual lips; heavy-lidded, romantic Indian eyes; an expression of deep affection', fitness: 'Soft, strong, and made for embrace', specialties: 'Portraying deep romantic connection, passionate embraces, conveying adoration' },
  wardrobeCollection: [ { id: 'int-ward-013', name: 'Bridal Lingerie Set', description: 'An exquisite set of ivory lace and silk lingerie, detailed with seed pearls. It is romantic, celebratory, and deeply intimate.', coverage: 'minimal-romantic', intimacyLevel: 10, style: 'Honeymoon Suite', materials: 'Ivory Lace, Silk, Pearls', fluxOptimized: true, imagenOptimized: true }, { id: 'int-ward-014', name: 'His White Shirt', description: 'Wearing a man\'s classic, oversized white button-down shirt, and nothing else. It is intimate, suggestive, and full of unspoken stories.', coverage: 'high-coverage-suggestive', intimacyLevel: 8, style: 'Morning After', materials: 'White Cotton Poplin', fluxOptimized: true, imagenOptimized: true } ],
  poseGallery: [ { id: 'int-pose-013', name: 'The Embrace', description: 'Arms wrapped around an unseen partner, head resting on their shoulder, eyes closed in contentment.' }, { id: 'int-pose-014', name: 'A Secret Smile', description: 'Lying in bed, looking at her lover (off-camera) with a smile full of love and shared secrets.' } ],
  environments: NEW_ENVIRONMENTS
};

export const MODEL_VOYAGER: GlamourModel = {
  id: 'vanguard-015', name: 'Jasmine the Voyager', category: 'Wanderlust Spirit Specialist', emphasis: 'Freedom, adventure, and a deep connection to the journey', personalPhotographer: NEW_PHOTOGRAPHERS.INTIMACY_POET,
  physicalTraits: { height: '5\'9"', figure: 'Lean, toned, and resilient', bust: '36B', waist: '26"', hips: '38"', emphasis: 'A body that is strong and capable, ready for any journey. Tanned and weathered by sun and wind.', skinTone: 'Deeply tanned, dusky Indian skin from a life of travel', features: 'Adventurous Indian features, eyes that have seen the world, a confident and independent spirit', fitness: 'The practical, resilient fitness of a seasoned traveler and adventurer', specialties: 'Embodying freedom and independence, interacting with vast landscapes, telling a story of a life lived fully' },
  wardrobeCollection: [ { id: 'int-ward-015', name: 'Worn Leather Jacket', description: 'A vintage, worn-in leather jacket that has seen a thousand roads, worn over a simple, minimal top.', coverage: 'moderate-coverage-adventurous', intimacyLevel: 5, style: 'The Open Road', materials: 'Aged Leather, Cotton', fluxOptimized: true, imagenOptimized: true }, { id: 'int-ward-016', name: 'Sarong on a Beach', description: 'A simple, travel-worn sarong tied around the waist on a deserted beach, suggesting a moment of peace in a long journey.', coverage: 'minimal-travel', intimacyLevel: 7, style: 'Wanderer\'s Rest', materials: 'Printed Cotton Sarong', fluxOptimized: true, imagenOptimized: true } ],
  poseGallery: [ { id: 'int-pose-015', name: 'Horizon Gaze', description: 'Standing on a cliff or at a train station, looking out towards the horizon, ready for the next adventure.' }, { id: 'int-pose-016', name: 'Mapping the Journey', description: 'Studying an old, worn map, a look of excitement and anticipation on her face.' } ],
  environments: NEW_ENVIRONMENTS
};


// ============================================================================
// SUPER-SEDUCTRESS MODELS - Based on Intimacy Levels (5-10)
// ============================================================================

export const MODEL_SEDUCTRESS_PROFESSIONAL: GlamourModel = {
  id: 'seductress-001', name: 'Seductress: Professional Elegance', category: 'Executive Seduction Specialist', emphasis: 'Commanding executive presence, structured sophistication, corporate glamour', personalPhotographer: NEW_PHOTOGRAPHERS.DOMINANCE_ARTIST,
  physicalTraits: { height: '5\'9"', figure: 'Powerful hourglass silhouette sculpted by architectural foundation garments', bust: '38D', waist: '26"', hips: '40"', emphasis: 'Commanding presence with strong posture and magnetic confidence', skinTone: 'Luminous complexion with executive glow and dewy finish', features: 'Strong features with direct eye contact, magnetic Indian beauty, sophisticated power', fitness: 'Toned executive fitness with confident power', specialties: 'Executive editorial photography, Helmut Newton powerful women series, corporate glamour' },
  wardrobeCollection: [ { id: 'seductress-ward-001', name: 'Structured Executive Foundation', description: 'Architectural longline bodice in matte black with seamless construction, paired with high-waisted foundation and transparent mesh blazer with sharp shoulders.', coverage: 'minimal-executive', intimacyLevel: 5, style: 'Corporate Power', materials: 'Architectural Fabric, Seamless Mesh, Structured Panels', fluxOptimized: true, imagenOptimized: true } ],
  poseGallery: [ { id: 'seductress-pose-001', name: 'Executive Power Stance', description: 'Standing with confidence, hands on hips, looking directly at camera with commanding expression.' }, { id: 'seductress-pose-002', name: 'Boardroom Dominance', description: 'Leaning back in executive chair with one foot on desk, exuding absolute authority.' } ],
  environments: NEW_ENVIRONMENTS
};

export const MODEL_SEDUCTRESS_NOIR: GlamourModel = {
  id: 'seductress-002', name: 'Seductress: Noir Luxury', category: 'Film Noir Glamour Specialist', emphasis: 'Classic Hollywood glamour, vintage aesthetic, film noir sensuality', personalPhotographer: NEW_PHOTOGRAPHERS.INTIMACY_POET,
  physicalTraits: { height: '5\'8"', figure: 'Elegant hourglass with classic Hollywood proportions', bust: '38DD', waist: '26"', hips: '40"', emphasis: 'Timeless glamour and sultry vintage beauty', skinTone: 'Matte flawless complexion perfect for classic lighting', features: 'Vintage Hollywood waves, sultry knowing expression, timeless Indian beauty', fitness: 'Classic Hollywood curves with feminine grace', specialties: 'Classic film noir lighting, art deco settings, timeless Hollywood glamour photography' },
  wardrobeCollection: [ { id: 'seductress-ward-002', name: 'Noir Luxury Ensemble', description: 'Sheer black silk stockings with seams and lace tops, ornate black lace corset with intricate embroidery, floor-length sheer black chiffon robe worn open.', coverage: 'minimal-glamour', intimacyLevel: 7, style: 'Film Noir Glamour', materials: 'Glossy Silk Stockings, Structured Satin, Translucent Chiffon', fluxOptimized: true, imagenOptimized: true } ],
  poseGallery: [ { id: 'seductress-pose-003', name: 'Glamour Recline', description: 'Reclining luxuriously on velvet chaise, propped on one elbow, sultry knowing expression with half-lidded eyes.' }, { id: 'seductress-pose-004', name: 'Deco Ambiance', description: 'Standing in art deco suite, one hand on burgundy velvet furniture, film noir lighting creating dramatic shadows.' } ],
  environments: NEW_ENVIRONMENTS
};

export const MODEL_SEDUCTRESS_GODDESS: GlamourModel = {
  id: 'seductress-003', name: 'Seductress: Golden Goddess', category: 'Ethereal Divine Beauty Specialist', emphasis: 'Ethereal golden light, goddess presence, transcendent beauty', personalPhotographer: NEW_PHOTOGRAPHERS.INTIMACY_POET,
  physicalTraits: { height: '5\'8"', figure: 'Elegant hourglass with ethereal goddess presence', bust: '36C', waist: '26"', hips: '38"', emphasis: 'Divine presence with transcendent beauty and luminous glow', skinTone: 'Luminous complexion with dewy finish and extreme subsurface scattering', features: 'Serene goddess-like features, eyes closed in blissful state, transcendent Indian beauty', fitness: 'Graceful dancer-like form with ethereal presence', specialties: 'Annie Leibovitz golden hour natural light, ethereal atmosphere, goddess photography' },
  wardrobeCollection: [ { id: 'seductress-ward-003', name: 'Goddess Body Chains', description: 'Delicate gold body chains draped across shoulders and around waist, minimal foundation, ethereal minimal aesthetic.', coverage: 'minimal-goddess', intimacyLevel: 10, style: 'Ethereal Goddess', materials: 'Fine Gold Chains, Sheer Nude Mesh, Minimal Silk', fluxOptimized: true, imagenOptimized: true } ],
  poseGallery: [ { id: 'seductress-pose-005', name: 'Dance of Light', description: 'Standing with arms raised gracefully above head in dance gesture, body in elegant contrapposto, eyes closed basking in golden light.' }, { id: 'seductress-pose-006', name: 'Heavenly Glow', description: 'Serene goddess pose in white studio with golden hour sunlight creating luminous wrap-around glow.' } ],
  environments: NEW_ENVIRONMENTS
};

export const MODEL_SEDUCTRESS_ARCHITECTURAL: GlamourModel = {
  id: 'seductress-004', name: 'Seductress: Architectural Form', category: 'Geometric Body Architecture Specialist', emphasis: 'Architectural minimalism, geometric patterns, graphic fashion editorial', personalPhotographer: NEW_PHOTOGRAPHERS.DOMINANCE_ARTIST,
  physicalTraits: { height: '5\'9"', figure: 'Statuesque with architectural emphasis on geometric lines', bust: '38C', waist: '27"', hips: '40"', emphasis: 'Body becomes living sculpture with powerful architectural presence', skinTone: 'Luminous complexion with matte flawless finish', features: 'Severe beauty with high ponytail, sculptural bone structure, powerful Indian features', fitness: 'Athletic architectural form with dramatic definition', specialties: 'Peter Lindbergh hard directional lighting, industrial minimalist settings, architectural body photography' },
  wardrobeCollection: [ { id: 'seductress-ward-004', name: 'Architectural Harness System', description: 'Intricate black leather harness system with geometric straps creating graphic patterns, high-waisted architectural brief with strategic cutouts.', coverage: 'minimal-architectural', intimacyLevel: 8, style: 'Geometric Architecture', materials: 'Matte and Glossy Leather, Metal Hardware, Structured Elastic', fluxOptimized: true, imagenOptimized: true } ],
  poseGallery: [ { id: 'seductress-pose-007', name: 'Geometric Pose', description: 'Kneeling upright with back arched dramatically, both arms stretched overhead with hands clasped, head tilted back.' }, { id: 'seductress-pose-008', name: 'Industrial Power', description: 'Powerful stance in industrial space with textured concrete walls and dramatic shadows.' } ],
  environments: NEW_ENVIRONMENTS
};

// ============================================================================
// EXPORTS
// ============================================================================

export const ARTISTIC_INTIMACY_MODELS: GlamourModel[] = [
    // Dominance
    MODEL_SOVEREIGN,
    MODEL_CONQUEROR,
    MODEL_ENFORCER,
    MODEL_MATRIARCH,
    MODEL_SIREN,
    MODEL_ORACLE,
    MODEL_EXECUTIONER,
    // Intimacy
    MODEL_DREAMER,
    MODEL_CONFIDANTE,
    MODEL_MUSE,
    MODEL_GARDENER,
    MODEL_KEEPER,
    MODEL_HEALER,
    MODEL_LOVER,
    MODEL_VOYAGER,
    // Super-Seductress
    MODEL_SEDUCTRESS_PROFESSIONAL,
    MODEL_SEDUCTRESS_NOIR,
    MODEL_SEDUCTRESS_GODDESS,
    MODEL_SEDUCTRESS_ARCHITECTURAL
];