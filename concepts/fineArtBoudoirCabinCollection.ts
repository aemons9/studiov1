/**
 * FINE ART BOUDOIR CABIN COLLECTION
 *
 * Indian Hourglass Muse - Intimacy Level 10
 * Minimal Lace Wardrobe Variants
 * Indoor Minimal Cabin Themed Photography
 *
 * Instagram-optimized with mapped captions and hashtags
 */

// ============================================================================
// TYPES
// ============================================================================

export interface CabinEnvironment {
  id: string;
  name: string;
  description: string;
  lighting: string;
  atmosphere: string;
  props: string[];
  photographyStyle: string;
  instagramCaption: string;
  instagramHashtags: string[];
}

export interface MinimalLaceWardrobe {
  id: string;
  name: string;
  intimacyLevel: number;
  description: string;
  materials: string[];
  colors: string[];
  coverage: 'micro' | 'minimal' | 'sheer' | 'artistic-drape';
  artisticNote: string;
  instagramCaption: string;
}

export interface ArtisticPose {
  id: string;
  name: string;
  description: string;
  bodyEmphasis: string[];
  mood: string;
  photographicAngle: string;
  instagramCaption: string;
}

export interface BoudoirConcept {
  id: string;
  name: string;
  environment: string;
  wardrobe: string;
  pose: string;
  intimacyLevel: number;
  fullPrompt: string;
  instagramCaption: string;
  instagramHashtags: string[];
  artisticDirection: string;
}

// ============================================================================
// MODEL BASE - INDIAN HOURGLASS MUSE
// ============================================================================

export const INDIAN_HOURGLASS_MUSE = {
  physique: "Indian woman, 24-26 years old, 5'7\" tall, hourglass figure with measurements 36-26-38",
  skin: "luminous sun-kissed bronze skin with natural golden undertones, flawless radiant glow, light perspiration sheen",
  face: "heart-shaped face with striking features, expressive dark chocolate eyes with naturally long lashes, full sensual lips, high defined cheekbones, subtle beauty mark",
  hair: "lustrous raven-black hair with natural waves cascading past shoulders, silk-like shine, bed-tousled texture",
  expression: "intimate knowing gaze, parted lips suggesting desire, vulnerability mixed with confidence, bedroom eyes",
};

// ============================================================================
// CABIN ENVIRONMENTS - INDOOR MINIMAL
// ============================================================================

export const CABIN_ENVIRONMENTS: CabinEnvironment[] = [
  {
    id: 'rustic_log_cabin',
    name: 'Rustic Log Cabin Bedroom',
    description: 'Intimate log cabin bedroom in Himachal hills, exposed wooden beams, stone fireplace with dying embers, hand-woven woolen throws on log-frame bed, morning light through frosted windows',
    lighting: 'Warm fireplace glow mixed with soft dawn light, honey-amber tones, dancing shadows from flames',
    atmosphere: 'Cozy mountain refuge, post-passion serenity, natural warmth',
    props: ['Faux fur throws', 'Antler chandelier', 'Cast iron fireplace tools', 'Vintage trunk', 'Woolen blankets'],
    photographyStyle: 'Intimate portrait, shallow depth of field, warm color grading',
    instagramCaption: 'Where the mountains keep secrets and the fire tells stories.',
    instagramHashtags: ['cabinlife', 'mountainescape', 'intimatemoments', 'rusticbeauty', 'boudoirart']
  },
  {
    id: 'minimalist_white_loft',
    name: 'Minimalist White Loft Space',
    description: 'Contemporary minimalist loft with all-white interiors, king-size platform bed with crisp white linens, floor-to-ceiling sheer curtains billowing, polished concrete floors, abstract art on walls',
    lighting: 'Soft diffused daylight through sheer curtains, high-key lighting, ethereal glow',
    atmosphere: 'Pure, clean, gallery-like intimacy, artistic sanctuary',
    props: ['White orchids', 'Geometric sculptures', 'Linen pillows', 'Ceramic vases', 'Minimalist side tables'],
    photographyStyle: 'High-key editorial, blown-out highlights, ethereal mood',
    instagramCaption: 'In the silence of white, every curve becomes poetry.',
    instagramHashtags: ['minimalistboudoir', 'whiteaesthetic', 'fineartportrait', 'editorialphotography', 'intimatebeauty']
  },
  {
    id: 'japanese_ryokan_room',
    name: 'Japanese-Inspired Ryokan Suite',
    description: 'Traditional Japanese-inspired room with tatami mats, low futon bed, shoji screen dividers casting geometric shadows, ikebana arrangement, zen garden view through sliding doors',
    lighting: 'Soft filtered light through paper screens, dappled shadows, golden hour glow',
    atmosphere: 'Zen tranquility, meditative sensuality, eastern elegance',
    props: ['Silk kimono draped nearby', 'Bamboo water feature', 'Bonsai tree', 'Incense burner', 'Traditional tea set'],
    photographyStyle: 'Geometric composition, shadow play, contemplative mood',
    instagramCaption: 'Finding stillness in the art of surrender.',
    instagramHashtags: ['zenbeauty', 'japaneseaesthetic', 'intimateart', 'shadowplay', 'contemplativeart']
  },
  {
    id: 'bohemian_tent_sanctuary',
    name: 'Bohemian Tent Sanctuary',
    description: 'Luxurious glamping tent interior, draped fabrics creating canopy, moroccan lanterns casting golden patterns, plush floor cushions, vintage persian rugs, string lights',
    lighting: 'Warm lantern glow creating intricate shadow patterns, candlelight, golden warmth',
    atmosphere: 'Nomadic luxury, exotic intimacy, dreamlike escape',
    props: ['Brass lanterns', 'Embroidered cushions', 'Hookah pipe', 'Carved wooden furniture', 'Hanging crystals'],
    photographyStyle: 'Warm editorial, rich textures, romantic mood',
    instagramCaption: 'A wanderer at heart, a goddess in the golden light.',
    instagramHashtags: ['bohemianstyle', 'glampinglife', 'exoticluxury', 'boudoirphotography', 'goldenhour']
  },
  {
    id: 'scandinavian_hygge_bedroom',
    name: 'Scandinavian Hygge Bedroom',
    description: 'Cozy Nordic-inspired bedroom, light wood furniture, chunky knit blankets, soft sheepskin rugs, minimalist decor, large windows with snow-covered pine view',
    lighting: 'Cool natural light with warm accent candles, balanced temperature, soft contrast',
    atmosphere: 'Hygge comfort, intimate warmth, natural simplicity',
    props: ['Chunky knit throws', 'Wooden candle holders', 'Sheepskin rug', 'Linen bedding', 'Dried eucalyptus'],
    photographyStyle: 'Soft natural light, clean composition, cozy intimacy',
    instagramCaption: 'The art of being present in perfect imperfection.',
    instagramHashtags: ['hyggeliving', 'scandinaviandesign', 'cozyboudoir', 'naturalbeauty', 'intimateportraits']
  },
  {
    id: 'vintage_boudoir_suite',
    name: 'Vintage French Boudoir Suite',
    description: 'Opulent French-inspired boudoir, ornate gilded mirror, velvet chaise lounge, crystal chandelier, silk wallpaper, vanity with perfume bottles, floor-to-ceiling drapes',
    lighting: 'Chandelier sparkle with window backlight, rich contrast, romantic shadows',
    atmosphere: 'Old Hollywood glamour, decadent femininity, timeless seduction',
    props: ['Antique perfume bottles', 'Feather boa', 'Pearl jewelry', 'Silk robes', 'Vintage hand mirror'],
    photographyStyle: 'Classic glamour, rich tones, dramatic lighting',
    instagramCaption: 'She wore confidence like couture and silence like perfume.',
    instagramHashtags: ['vintageboudoir', 'frenchaesthetic', 'oldhollyood', 'glamourphotography', 'boudoirelegance']
  },
  {
    id: 'artists_loft_studio',
    name: "Artist's Loft Studio",
    description: 'Creative artist studio loft, paint-splattered wooden floors, large canvases, natural light from skylights, unmade daybed with paint-stained sheets, scattered art supplies',
    lighting: 'Dramatic skylight creating painterly light pools, artistic shadows, natural contrast',
    atmosphere: 'Creative chaos, muse inspiration, artistic passion',
    props: ['Paint brushes', 'Canvas stretchers', 'Vintage easel', 'Artist palette', 'Scattered sketches'],
    photographyStyle: 'Documentary artistic, natural light, candid intimacy',
    instagramCaption: 'The muse becomes the masterpiece.',
    instagramHashtags: ['artistmuse', 'creativespace', 'fineartboudoir', 'artisticnude', 'studioportrait']
  },
  {
    id: 'mountain_stone_retreat',
    name: 'Mountain Stone Retreat',
    description: 'Luxurious mountain retreat with exposed stone walls, floor heating, panoramic mountain views, sunken stone bathtub, natural wood accents, earth-tone textiles',
    lighting: 'Morning mountain light flooding in, earth tones, natural warmth',
    atmosphere: 'Grounded luxury, elemental connection, primal intimacy',
    props: ['Stone sculptures', 'Woven baskets', 'Natural wood bowls', 'Earth-tone cushions', 'Aromatic herbs'],
    photographyStyle: 'Earth tones, natural textures, elemental mood',
    instagramCaption: 'Rooted in earth, reaching for the sky.',
    instagramHashtags: ['mountainretreat', 'naturalbeauty', 'earthtones', 'luxuryretreat', 'intimateart']
  },
];

// ============================================================================
// MINIMAL LACE WARDROBE - INTIMACY 10
// ============================================================================

export const MINIMAL_LACE_WARDROBES: MinimalLaceWardrobe[] = [
  {
    id: 'gossamer_french_lace',
    name: 'Gossamer French Lace',
    intimacyLevel: 10,
    description: 'Ultra-sheer French Chantilly lace triangle bralette with matching micro thong, barely-there coverage, delicate scalloped edges, silk ribbon ties',
    materials: ['French Chantilly lace', 'Silk ribbons', 'Gold clasps'],
    colors: ['Champagne', 'Blush pink', 'Ivory'],
    coverage: 'micro',
    artisticNote: 'The lace becomes a whisper against bronze skin, more suggestion than coverage',
    instagramCaption: 'Draped in whispers of French lace.'
  },
  {
    id: 'shadow_play_mesh',
    name: 'Shadow Play Mesh Set',
    intimacyLevel: 10,
    description: 'Completely sheer black mesh bodysuit with strategic lace appliqués at curves, creating graphic shadow patterns, open back design',
    materials: ['Italian mesh', 'Lace appliqués', 'Velvet trim'],
    colors: ['Black', 'Deep wine', 'Midnight blue'],
    coverage: 'sheer',
    artisticNote: 'Light passes through like silk through fingers, revealing architectural form',
    instagramCaption: 'Where shadows dance with light.'
  },
  {
    id: 'pearl_strand_lingerie',
    name: 'Pearl Strand Lingerie',
    intimacyLevel: 10,
    description: 'Avant-garde piece featuring strands of freshwater pearls draped strategically, minimal lace accent pieces, body jewelry aesthetic',
    materials: ['Freshwater pearls', 'Gold chains', 'Lace fragments'],
    colors: ['Pearl white', 'Rose gold', 'Cream'],
    coverage: 'minimal',
    artisticNote: 'Pearls trace the geography of desire, adorning rather than concealing',
    instagramCaption: 'Adorned in moonlight and pearls.'
  },
  {
    id: 'botanical_lace_barely_there',
    name: 'Botanical Lace Barely-There',
    intimacyLevel: 10,
    description: 'Delicate botanical lace pieces positioned as body art, leaf and flower motifs on sheer nude base, barely perceptible coverage',
    materials: ['Botanical embroidered lace', 'Nude mesh', 'Seed pearls'],
    colors: ['Nude with gold embroidery', 'Ivory with silver', 'Black with copper'],
    coverage: 'minimal',
    artisticNote: 'Nature adorns the form like morning dew on petals',
    instagramCaption: 'A garden of secrets blooming in lace.'
  },
  {
    id: 'venetian_mask_inspired',
    name: 'Venetian Mask-Inspired Set',
    intimacyLevel: 10,
    description: 'Theatrical lingerie with intricate mask-like lace patterns, dramatic eye-motif details, venetian carnival inspiration, micro coverage',
    materials: ['Venetian lace', 'Crystal beading', 'Satin ribbons'],
    colors: ['Midnight black', 'Crimson', 'Gold'],
    coverage: 'minimal',
    artisticNote: 'Mystery worn as intimately as skin',
    instagramCaption: 'Behind every mask, a story waiting to be told.'
  },
  {
    id: 'liquid_silk_drape',
    name: 'Liquid Silk Drape',
    intimacyLevel: 10,
    description: 'Single piece of liquid silk strategically draped, held by delicate lace straps, art piece rather than garment, flowing movement',
    materials: ['Charmeuse silk', 'Handmade lace', 'Gold thread'],
    colors: ['Champagne', 'Rose', 'Pearl grey'],
    coverage: 'artistic-drape',
    artisticNote: 'Silk flows like water, revealing the landscape beneath',
    instagramCaption: 'Silk speaks in the language of touch.'
  },
  {
    id: 'crystal_web_lingerie',
    name: 'Crystal Web Lingerie',
    intimacyLevel: 10,
    description: 'Spider-web fine lace with scattered Swarovski crystals, catching light at every angle, geometric micro pieces',
    materials: ['Spider-web lace', 'Swarovski crystals', 'Sterling silver'],
    colors: ['Crystal clear with silver', 'Black with aurora crystals'],
    coverage: 'micro',
    artisticNote: 'Light trapped in threads of desire, sparkling secrets',
    instagramCaption: 'Catching starlight in threads of desire.'
  },
  {
    id: 'japanese_shibori_lace',
    name: 'Japanese Shibori Lace',
    intimacyLevel: 10,
    description: 'Fusion piece combining traditional Japanese tie-dye patterns with European lace, minimal coverage with artistic depth',
    materials: ['Shibori-dyed silk', 'Japanese lace', 'Bamboo clasps'],
    colors: ['Indigo gradient', 'Sakura pink', 'Ocean wave blue'],
    coverage: 'minimal',
    artisticNote: 'East meets West in whispers of fabric',
    instagramCaption: 'Where tradition meets desire.'
  },
  {
    id: 'golden_chain_lace',
    name: 'Golden Chain Lace Harness',
    intimacyLevel: 10,
    description: 'Body harness combining fine gold chains with lace panels, geometric design emphasizing curves, architectural lingerie',
    materials: ['14k gold-filled chains', 'French lace', 'Adjustable clasps'],
    colors: ['Gold with black lace', 'Rose gold with blush lace', 'Silver with white lace'],
    coverage: 'minimal',
    artisticNote: 'Chains that liberate rather than bind',
    instagramCaption: 'Golden threads of freedom.'
  },
  {
    id: 'ethereal_organza_whisper',
    name: 'Ethereal Organza Whisper',
    intimacyLevel: 10,
    description: 'Layers of transparent organza with scattered lace petals, floating fabric effect, dreamlike coverage',
    materials: ['Silk organza', 'Lace petals', 'Crystal buttons'],
    colors: ['Soft white', 'Blush', 'Lavender'],
    coverage: 'sheer',
    artisticNote: 'Petals falling on warm skin, barely there',
    instagramCaption: 'Dressed in dreams and whispers.'
  },
];

// ============================================================================
// ARTISTIC POSES - INTIMACY 10
// ============================================================================

export const ARTISTIC_POSES: ArtisticPose[] = [
  {
    id: 'serpentine_recline',
    name: 'Serpentine Recline',
    description: 'Languid S-curve recline on side, one arm extended overhead, legs in relaxed scissor position, spine arched naturally, chin tilted upward',
    bodyEmphasis: ['Hourglass silhouette', 'Hip curve', 'Elongated torso', 'Neck line'],
    mood: 'Relaxed seduction, post-passion tranquility',
    photographicAngle: 'Three-quarter overhead, capturing full body flow',
    instagramCaption: 'Curves that tell a thousand stories.'
  },
  {
    id: 'mirror_reflection',
    name: 'Mirror Reflection Gaze',
    description: 'Kneeling before vintage mirror, back partially to camera, looking over shoulder at own reflection, creating double perspective, hair cascading down spine',
    bodyEmphasis: ['Back muscles', 'Shoulder blades', 'Profile', 'Hair flow'],
    mood: 'Self-admiration, intimate self-discovery',
    photographicAngle: 'Behind subject capturing both real and reflection',
    instagramCaption: 'She found her power in her own reflection.'
  },
  {
    id: 'window_silhouette',
    name: 'Window Silhouette Stretch',
    description: 'Standing at window, arms raised holding frame, body creating dramatic silhouette against natural light, one knee slightly bent',
    bodyEmphasis: ['Full body silhouette', 'Raised arms', 'Waist definition', 'Leg line'],
    mood: 'Yearning, morning awakening, ethereal presence',
    photographicAngle: 'Direct backlight creating rim-lit silhouette',
    instagramCaption: 'Reaching for the light she already holds within.'
  },
  {
    id: 'tangled_sheets',
    name: 'Tangled in Silk Sheets',
    description: 'Lying on stomach amid rumpled silk sheets, chin resting on folded arms, looking directly at camera, sheets draped strategically across lower body',
    bodyEmphasis: ['Back curve', 'Eye contact', 'Hair spread on pillows', 'Shoulder line'],
    mood: 'Morning-after intimacy, vulnerable confidence',
    photographicAngle: 'Low angle at bed level, shallow depth of field',
    instagramCaption: 'Some stories are written in tangled sheets.'
  },
  {
    id: 'artistic_arch',
    name: 'Artistic Backbend Arch',
    description: 'Kneeling backbend with dramatic arch, hair touching the floor behind, arms extended, chest lifted toward ceiling',
    bodyEmphasis: ['Torso arch', 'Neck extension', 'Rib definition', 'Hip placement'],
    mood: 'Surrender, physical poetry, dramatic expression',
    photographicAngle: 'Side angle capturing full arch silhouette',
    instagramCaption: 'Bending but never breaking.'
  },
  {
    id: 'firelight_embrace',
    name: 'Firelight Self-Embrace',
    description: 'Seated near fireplace, arms wrapped around drawn-up knees, face illuminated by flame glow, intimate self-holding posture',
    bodyEmphasis: ['Rounded form', 'Warm skin tones', 'Facial illumination', 'Compact curves'],
    mood: 'Contemplative warmth, solitary sensuality',
    photographicAngle: 'Profile with firelight as key light source',
    instagramCaption: 'Keeping warm with her own fire.'
  },
  {
    id: 'bath_edge_recline',
    name: 'Bath Edge Recline',
    description: 'Reclining against edge of stone bathtub, wet hair slicked back, one leg extended, skin glistening with water droplets',
    bodyEmphasis: ['Wet skin texture', 'Extended leg line', 'Neck and collarbone', 'Relaxed hands'],
    mood: 'Cleansing ritual, water sensuality, renewal',
    photographicAngle: 'Slightly elevated angle capturing water and form',
    instagramCaption: 'Water remembers every curve it touches.'
  },
  {
    id: 'doorframe_lean',
    name: 'Doorframe Lean',
    description: 'Leaning against doorframe, one arm raised against wood, hip popped creating S-curve, looking back over shoulder with knowing expression',
    bodyEmphasis: ['S-curve profile', 'Hip angle', 'Arm lines', 'Facial expression'],
    mood: 'Invitation, confident allure, playful seduction',
    photographicAngle: 'From behind capturing back curves and side profile',
    instagramCaption: 'Standing at the threshold of desire.'
  },
  {
    id: 'floating_meditation',
    name: 'Floating Meditation',
    description: 'Seated cross-legged on soft surface, eyes closed, hands resting on knees, peaceful expression, body relaxed but spine straight',
    bodyEmphasis: ['Centered posture', 'Peaceful face', 'Soft hands', 'Balanced form'],
    mood: 'Spiritual sensuality, inner peace, meditative beauty',
    photographicAngle: 'Frontal, soft diffused light from above',
    instagramCaption: 'Finding heaven in the depths of stillness.'
  },
  {
    id: 'dramatic_floor_sprawl',
    name: 'Dramatic Floor Sprawl',
    description: 'Lying on wooden floor, body arranged in artistic sprawl, limbs creating geometric shapes, hair spread dramatically, direct ceiling gaze',
    bodyEmphasis: ['Full body geography', 'Limb placement', 'Hair spread', 'Skin against wood'],
    mood: 'Abandoned passion, artistic expression, raw vulnerability',
    photographicAngle: 'Directly overhead, bird\'s eye view',
    instagramCaption: 'Art is how she signed her existence.'
  },
];

// ============================================================================
// COMPLETE BOUDOIR CONCEPTS - INSTAGRAM READY
// ============================================================================

export const BOUDOIR_CONCEPTS: BoudoirConcept[] = [
  {
    id: 'cabin_sunrise_awakening',
    name: 'Cabin Sunrise Awakening',
    environment: 'rustic_log_cabin',
    wardrobe: 'gossamer_french_lace',
    pose: 'tangled_sheets',
    intimacyLevel: 10,
    fullPrompt: `${INDIAN_HOURGLASS_MUSE.physique}. ${INDIAN_HOURGLASS_MUSE.skin}. ${INDIAN_HOURGLASS_MUSE.face}. ${INDIAN_HOURGLASS_MUSE.hair}. ${INDIAN_HOURGLASS_MUSE.expression}.

WARDROBE: Ultra-sheer French Chantilly lace triangle bralette in champagne, matching micro thong with delicate scalloped edges, silk ribbon ties barely holding the gossamer fabric.

ENVIRONMENT: Intimate log cabin bedroom in Himachal hills, exposed wooden beams above, stone fireplace with dying embers casting warm amber glow, hand-woven woolen throws on rustic log-frame bed, golden morning light streaming through frosted windows.

POSE: Lying on stomach amid rumpled silk sheets, chin resting on folded arms, looking directly at camera with intimate knowing gaze, sheets draped strategically across lower curves, hair spread across pillows in wild abandon.

PHOTOGRAPHY: Phase One IQ4 150MP, 80mm lens at f/2.0, warm color grading, intimate shallow depth of field, natural window light mixed with fireplace glow. Fine art boudoir editorial style.`,
    instagramCaption: `Awakening to mountains and mysteries.

Some mornings, the fire dies down but the warmth remains.

Cabin stories, written in golden light.`,
    instagramHashtags: ['fineartboudoir', 'cabinlife', 'morninglight', 'intimateart', 'boudoirphotography', 'indianbeauty', 'editorialphotography', 'goldenlight', 'mountainretreat', 'luxurylingerie', 'artisticnude', 'bodypositivity', 'sensualart', 'veracrvs', 'photographyart'],
    artisticDirection: 'Warm, intimate, morning-after serenity with golden tones'
  },
  {
    id: 'white_loft_ethereal',
    name: 'White Loft Ethereal Dreams',
    environment: 'minimalist_white_loft',
    wardrobe: 'ethereal_organza_whisper',
    pose: 'serpentine_recline',
    intimacyLevel: 10,
    fullPrompt: `${INDIAN_HOURGLASS_MUSE.physique}. ${INDIAN_HOURGLASS_MUSE.skin}. ${INDIAN_HOURGLASS_MUSE.face}. ${INDIAN_HOURGLASS_MUSE.hair}. ${INDIAN_HOURGLASS_MUSE.expression}.

WARDROBE: Layers of transparent silk organza with scattered lace petals in soft white, floating fabric effect creating dreamlike coverage, crystal buttons catching light.

ENVIRONMENT: Contemporary minimalist loft with all-white interiors, king-size platform bed with crisp white linens, floor-to-ceiling sheer curtains billowing in gentle breeze, polished concrete floors, abstract white sculpture nearby.

POSE: Languid S-curve recline on side, one arm extended overhead, legs in relaxed scissor position, spine arched naturally creating perfect hourglass silhouette, chin tilted upward in serene expression.

PHOTOGRAPHY: Hasselblad H6D-100c, 100mm lens, high-key lighting, soft diffused daylight through sheer curtains, ethereal glow, minimal contrast. Gallery-quality fine art aesthetic.`,
    instagramCaption: `In the architecture of silence, she became the art.

White canvas. Bronze poetry.

Where minimalism meets the divine feminine.`,
    instagramHashtags: ['minimalistboudoir', 'whiteaesthetic', 'fineartphotography', 'etherealbeauty', 'artisticnude', 'highkeyphotography', 'luxurylingerie', 'boudoirart', 'editorialfashion', 'indianmodel', 'contemporaryart', 'sensualelegance', 'veracrvs', 'galleryart', 'modernbeauty'],
    artisticDirection: 'High-key, ethereal, gallery-quality minimalism'
  },
  {
    id: 'zen_shadow_meditation',
    name: 'Zen Shadow Meditation',
    environment: 'japanese_ryokan_room',
    wardrobe: 'japanese_shibori_lace',
    pose: 'floating_meditation',
    intimacyLevel: 10,
    fullPrompt: `${INDIAN_HOURGLASS_MUSE.physique}. ${INDIAN_HOURGLASS_MUSE.skin}. ${INDIAN_HOURGLASS_MUSE.face}. ${INDIAN_HOURGLASS_MUSE.hair}. ${INDIAN_HOURGLASS_MUSE.expression}.

WARDROBE: Japanese Shibori-inspired minimal lingerie, indigo gradient dyed silk with delicate Japanese lace accents, bamboo clasps, micro coverage with artistic depth.

ENVIRONMENT: Traditional Japanese-inspired room with tatami mats, low futon bed nearby, shoji screen dividers casting geometric shadow patterns, ikebana flower arrangement, soft filtered light through paper screens creating dappled patterns.

POSE: Seated cross-legged on soft tatami, eyes closed in peaceful meditation, hands resting gracefully on knees, peaceful expression, body relaxed but spine elegantly straight, shadow patterns falling across bronze skin.

PHOTOGRAPHY: Sony A7R V, 85mm Zeiss lens, geometric composition emphasizing shadow play, contemplative mood, natural filtered light, zen aesthetic.`,
    instagramCaption: `Stillness is not the absence of movement.
It is the presence of peace.

Finding infinity in the spaces between shadows.`,
    instagramHashtags: ['zenbeauty', 'japaneseaesthetic', 'shadowplay', 'meditativeart', 'fineartboudoir', 'geometricbeauty', 'indianbeauty', 'mindfulmoments', 'artisticportrait', 'spiritualart', 'boudoirphotography', 'contemplativeart', 'veracrvs', 'easternelegance', 'innerpeace'],
    artisticDirection: 'Zen contemplative, geometric shadows, east-meets-sensuality'
  },
  {
    id: 'bohemian_golden_goddess',
    name: 'Bohemian Golden Goddess',
    environment: 'bohemian_tent_sanctuary',
    wardrobe: 'golden_chain_lace',
    pose: 'firelight_embrace',
    intimacyLevel: 10,
    fullPrompt: `${INDIAN_HOURGLASS_MUSE.physique}. ${INDIAN_HOURGLASS_MUSE.skin}. ${INDIAN_HOURGLASS_MUSE.face}. ${INDIAN_HOURGLASS_MUSE.hair}. ${INDIAN_HOURGLASS_MUSE.expression}.

WARDROBE: Body harness of fine 14k gold-filled chains with black French lace panels, geometric design emphasizing every curve, architectural lingerie that adorns rather than conceals.

ENVIRONMENT: Luxurious glamping tent interior, draped fabrics creating romantic canopy, moroccan brass lanterns casting intricate golden patterns across skin, plush floor cushions in jewel tones, vintage persian rugs, string lights creating starfield effect.

POSE: Seated near brass lantern, arms wrapped around drawn-up knees, face illuminated by warm golden glow, intimate self-holding posture, eyes half-closed in contemplation, golden light dancing across chain-draped body.

PHOTOGRAPHY: Canon EOS R5, 50mm f/1.2, warm editorial tones, rich textures, romantic candlelit mood, golden color palette.`,
    instagramCaption: `She collected golden moments like treasures.

Draped in chains that set her free.
Surrounded by light she became.

Nomad queen of her own palace.`,
    instagramHashtags: ['bohemianstyle', 'goldenlight', 'glamping', 'luxurylingerie', 'bodychain', 'fineartboudoir', 'indiangoddess', 'romanticphotography', 'warmtones', 'boudoirart', 'exoticbeauty', 'jeweledbeauty', 'veracrvs', 'glampinglife', 'goldenhour'],
    artisticDirection: 'Warm bohemian luxury, golden tones, nomadic goddess aesthetic'
  },
  {
    id: 'nordic_morning_light',
    name: 'Nordic Morning Light',
    environment: 'scandinavian_hygge_bedroom',
    wardrobe: 'liquid_silk_drape',
    pose: 'window_silhouette',
    intimacyLevel: 10,
    fullPrompt: `${INDIAN_HOURGLASS_MUSE.physique}. ${INDIAN_HOURGLASS_MUSE.skin}. ${INDIAN_HOURGLASS_MUSE.face}. ${INDIAN_HOURGLASS_MUSE.hair}. ${INDIAN_HOURGLASS_MUSE.expression}.

WARDROBE: Single piece of liquid champagne silk strategically draped around body, held by delicate handmade lace straps, fabric flowing like water revealing the landscape of curves beneath.

ENVIRONMENT: Cozy Nordic-inspired bedroom, light wood furniture, chunky knit blankets on bed behind, soft sheepskin rugs on floor, large windows with snow-covered pine forest view, soft morning light flooding space.

POSE: Standing at window, arms raised holding white frame, body creating dramatic silhouette against natural light, one knee slightly bent, silk drape catching morning breeze, rim light defining every curve.

PHOTOGRAPHY: Nikon Z9, 35mm wide angle, cool natural light with warm accent contrast, clean Scandinavian composition, cozy intimacy.`,
    instagramCaption: `Between the white pines and white sheets,
she found her color.

Morning rituals written in light.

The cold outside makes the warmth within that much sweeter.`,
    instagramHashtags: ['hyggeliving', 'scandinavianstyle', 'morninglight', 'silhouettephotography', 'fineartboudoir', 'naturalbeauty', 'nordicdesign', 'cozyboudoir', 'wintermorning', 'indianbeauty', 'backlitportrait', 'intimateportraits', 'veracrvs', 'windowlight', 'cozyaesthetic'],
    artisticDirection: 'Scandinavian clean aesthetic, rim-lit silhouette, hygge warmth'
  },
  {
    id: 'vintage_glamour_reflections',
    name: 'Vintage Glamour Reflections',
    environment: 'vintage_boudoir_suite',
    wardrobe: 'venetian_mask_inspired',
    pose: 'mirror_reflection',
    intimacyLevel: 10,
    fullPrompt: `${INDIAN_HOURGLASS_MUSE.physique}. ${INDIAN_HOURGLASS_MUSE.skin}. ${INDIAN_HOURGLASS_MUSE.face}. ${INDIAN_HOURGLASS_MUSE.hair}. ${INDIAN_HOURGLASS_MUSE.expression}.

WARDROBE: Theatrical Venetian-inspired lingerie with intricate mask-like black lace patterns, dramatic eye-motif details across micro pieces, crimson satin ribbons, crystal beading catching light.

ENVIRONMENT: Opulent French-inspired boudoir, ornate gilded mirror as centerpiece, velvet burgundy chaise lounge, crystal chandelier casting rainbow prisms, silk champagne wallpaper, antique vanity with vintage perfume bottles.

POSE: Kneeling before vintage gilded mirror, back partially to camera showing spine and shoulder blades, looking over shoulder at own reflection with knowing gaze, hair cascading down spine like black silk, creating double perspective of desire.

PHOTOGRAPHY: Leica SL2, 90mm Summilux, classic glamour lighting, rich jewel tones, dramatic chandelier highlights and shadows.`,
    instagramCaption: `She wore mystery like vintage perfume.

In gilded mirrors, she found not vanity
but understanding.

Old Hollywood never died.
She simply evolved.`,
    instagramHashtags: ['vintageglamour', 'oldhollyood', 'mirrorportrait', 'fineartboudoir', 'frenchboudoir', 'luxurylingerie', 'dramaticportrait', 'indianbeauty', 'reflectionphotography', 'crystalchandelier', 'boudoirart', 'timelessbeauty', 'veracrvs', 'venetianlace', 'elegantboudoir'],
    artisticDirection: 'Old Hollywood glamour, rich jewel tones, mirror mystique'
  },
  {
    id: 'artists_muse_studio',
    name: "Artist's Muse Studio",
    environment: 'artists_loft_studio',
    wardrobe: 'shadow_play_mesh',
    pose: 'dramatic_floor_sprawl',
    intimacyLevel: 10,
    fullPrompt: `${INDIAN_HOURGLASS_MUSE.physique}. ${INDIAN_HOURGLASS_MUSE.skin}. ${INDIAN_HOURGLASS_MUSE.face}. ${INDIAN_HOURGLASS_MUSE.hair}. ${INDIAN_HOURGLASS_MUSE.expression}.

WARDROBE: Completely sheer black Italian mesh bodysuit with strategic lace appliqués at curves creating graphic shadow patterns, open back design, fabric becoming art tool for light manipulation.

ENVIRONMENT: Creative artist studio loft, paint-splattered wooden floors, large blank canvases leaning against walls, dramatic natural light from skylights creating painterly pools, scattered art supplies, vintage easel nearby.

POSE: Lying on painted wooden floor, body arranged in artistic sprawl, limbs creating geometric shapes like living art, hair spread dramatically in dark fan, direct gaze toward skylight, paint tubes scattered nearby.

PHOTOGRAPHY: Medium format Fuji GFX, overhead bird's eye perspective, documentary artistic style, dramatic skylight contrast, candid intimacy of creative process.`,
    instagramCaption: `She wasn't just the muse.
She was the masterpiece.

Art doesn't imitate life.
Life becomes art.

Paint-stained floors remember
every curve that graced them.`,
    instagramHashtags: ['artistmuse', 'fineartphotography', 'creativespace', 'artisticnude', 'boudoirart', 'birdseyeview', 'studiolife', 'indianmodel', 'dramaticportrait', 'lightandshadow', 'contemporaryart', 'museandartist', 'veracrvs', 'floorportrait', 'creativeboudoir'],
    artisticDirection: 'Artistic documentary, overhead perspective, creative chaos beauty'
  },
  {
    id: 'mountain_stone_primal',
    name: 'Mountain Stone Primal',
    environment: 'mountain_stone_retreat',
    wardrobe: 'botanical_lace_barely_there',
    pose: 'bath_edge_recline',
    intimacyLevel: 10,
    fullPrompt: `${INDIAN_HOURGLASS_MUSE.physique}. ${INDIAN_HOURGLASS_MUSE.skin}. ${INDIAN_HOURGLASS_MUSE.face}. ${INDIAN_HOURGLASS_MUSE.hair}. ${INDIAN_HOURGLASS_MUSE.expression}.

WARDROBE: Delicate botanical lace pieces positioned as body art, leaf and flower motifs on sheer nude base, barely perceptible coverage, seed pearl accents like morning dew on petals.

ENVIRONMENT: Luxurious mountain retreat with exposed stone walls, sunken stone bathtub filled with clear water, panoramic Himalayan mountain views through floor-to-ceiling windows, natural wood accents, earth-tone textiles, steam rising.

POSE: Reclining against edge of warm stone bathtub, wet hair slicked back revealing face structure, one leg extended along stone edge, skin glistening with water droplets, relaxed hands trailing in water.

PHOTOGRAPHY: Sony A1, 24-70mm zoom, earth tones, natural textures, elemental mood, morning mountain light.`,
    instagramCaption: `Stone, water, skin.
The elements remember her.

Mountains witnessed what words cannot describe.

In stone and steam, she found her temple.`,
    instagramHashtags: ['mountainretreat', 'stonebath', 'naturalbeauty', 'earthtones', 'fineartboudoir', 'waterportrait', 'himalayanbeauty', 'luxuryretreat', 'indianbeauty', 'elementalart', 'bathtubphotography', 'boudoirart', 'veracrvs', 'primalbeauty', 'stonespa'],
    artisticDirection: 'Elemental earth tones, water and stone, primal luxury'
  },
  {
    id: 'crystal_web_midnight',
    name: 'Crystal Web Midnight',
    environment: 'vintage_boudoir_suite',
    wardrobe: 'crystal_web_lingerie',
    pose: 'artistic_arch',
    intimacyLevel: 10,
    fullPrompt: `${INDIAN_HOURGLASS_MUSE.physique}. ${INDIAN_HOURGLASS_MUSE.skin}. ${INDIAN_HOURGLASS_MUSE.face}. ${INDIAN_HOURGLASS_MUSE.hair}. ${INDIAN_HOURGLASS_MUSE.expression}.

WARDROBE: Spider-web fine black lace with scattered Swarovski crystals catching light at every angle, micro geometric pieces creating constellation effect across bronze skin, sterling silver connectors.

ENVIRONMENT: Opulent boudoir at midnight, crystal chandelier dimmed to romantic glow, velvet chaise lounge in deep purple, moonlight streaming through tall windows, soft candles creating warm pools of light.

POSE: Kneeling backbend with dramatic arch on velvet chaise, hair touching the cushion behind, arms extended gracefully, chest lifted toward crystal chandelier, crystals on body catching and scattering light like stars.

PHOTOGRAPHY: Canon R3, 85mm f/1.4, dramatic side lighting, crystal reflections, midnight blue and gold color palette.`,
    instagramCaption: `She wore the night sky on her skin.

Every crystal a captured star.
Every curve a constellation.

Midnight has never looked this luminous.`,
    instagramHashtags: ['crystalbeauty', 'midnightboudoir', 'fineartphotography', 'swarovskicrystals', 'dramaticportrait', 'backbendpose', 'luxurylingerie', 'indianbeauty', 'starlight', 'boudoirart', 'crystalweb', 'nightphotography', 'veracrvs', 'luminousbeauty', 'chandelierlight'],
    artisticDirection: 'Midnight drama, crystal light-play, celestial sensuality'
  },
  {
    id: 'pearl_dawn_goddess',
    name: 'Pearl Dawn Goddess',
    environment: 'minimalist_white_loft',
    wardrobe: 'pearl_strand_lingerie',
    pose: 'doorframe_lean',
    intimacyLevel: 10,
    fullPrompt: `${INDIAN_HOURGLASS_MUSE.physique}. ${INDIAN_HOURGLASS_MUSE.skin}. ${INDIAN_HOURGLASS_MUSE.face}. ${INDIAN_HOURGLASS_MUSE.hair}. ${INDIAN_HOURGLASS_MUSE.expression}.

WARDROBE: Avant-garde strands of freshwater pearls draped strategically across body, minimal rose gold chains connecting pieces, lace fragment accents, body jewelry aesthetic transforming the body into living art.

ENVIRONMENT: Minimalist white loft at dawn, soft pink-gold light streaming through sheer curtains, white-framed doorway as compositional element, polished floors reflecting light, simple elegance.

POSE: Leaning against white doorframe, one arm raised against wood with fingers spread, hip popped creating perfect S-curve silhouette, looking back over shoulder with knowing invitation, pearls catching first light of day.

PHOTOGRAPHY: Hasselblad X2D, 65mm lens, soft pink dawn light, clean minimal composition, pearl luminescence against bronze skin.`,
    instagramCaption: `Dawn arrived wearing nothing but pearls.

She stood at doorways
but never truly waited.

The first light always knew
where to find her.`,
    instagramHashtags: ['pearlbeauty', 'dawnlight', 'minimalistboudoir', 'fineartphotography', 'bodyjewelry', 'indianbeauty', 'silhouetteportrait', 'doorwayshot', 'luxuryaesthetic', 'boudoirart', 'rosegold', 'morninggoddess', 'veracrvs', 'freshwaterpearls', 'elegantboudoir'],
    artisticDirection: 'Dawn minimal, pearl luminescence, doorway framing'
  },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function getConceptById(id: string): BoudoirConcept | undefined {
  return BOUDOIR_CONCEPTS.find(c => c.id === id);
}

export function getEnvironmentById(id: string): CabinEnvironment | undefined {
  return CABIN_ENVIRONMENTS.find(e => e.id === id);
}

export function getWardrobeById(id: string): MinimalLaceWardrobe | undefined {
  return MINIMAL_LACE_WARDROBES.find(w => w.id === id);
}

export function getPoseById(id: string): ArtisticPose | undefined {
  return ARTISTIC_POSES.find(p => p.id === id);
}

export function getAllConceptNames(): string[] {
  return BOUDOIR_CONCEPTS.map(c => c.name);
}

export function getRandomConcept(): BoudoirConcept {
  return BOUDOIR_CONCEPTS[Math.floor(Math.random() * BOUDOIR_CONCEPTS.length)];
}

export function buildArtDirectorsDeclaration(): string {
  return `As a professional creative art director working on a museum-quality fine art boudoir photography collection for an international luxury publication, I am requesting the generation of sophisticated artistic imagery that celebrates the human form within the highest standards of fine art photography. This request adheres to professional artistic standards as seen in prestigious galleries, Vogue, Harper's Bazaar, and museum exhibitions worldwide. The imagery should be elegant, tasteful, and represent the apex of contemporary fine art photography.`;
}

export function buildFullPromptWithDeclaration(concept: BoudoirConcept): string {
  return `${buildArtDirectorsDeclaration()}

${concept.fullPrompt}`;
}

// ============================================================================
// INSTAGRAM PUBLISHING HELPERS
// ============================================================================

export interface InstagramPublishConfig {
  caption: string;
  hashtags: string[];
  conceptName: string;
  conceptId: string;
}

export function getInstagramConfig(conceptId: string): InstagramPublishConfig | null {
  const concept = getConceptById(conceptId);
  if (!concept) return null;

  return {
    caption: concept.instagramCaption,
    hashtags: concept.instagramHashtags,
    conceptName: concept.name,
    conceptId: concept.id,
  };
}

export function formatInstagramPost(concept: BoudoirConcept): string {
  const hashtagString = concept.instagramHashtags.map(h => `#${h}`).join(' ');
  return `${concept.instagramCaption}\n\n.\n.\n.\n${hashtagString}`;
}

// Export all for easy importing
export default {
  INDIAN_HOURGLASS_MUSE,
  CABIN_ENVIRONMENTS,
  MINIMAL_LACE_WARDROBES,
  ARTISTIC_POSES,
  BOUDOIR_CONCEPTS,
  getConceptById,
  getEnvironmentById,
  getWardrobeById,
  getPoseById,
  getAllConceptNames,
  getRandomConcept,
  buildArtDirectorsDeclaration,
  buildFullPromptWithDeclaration,
  getInstagramConfig,
  formatInstagramPost,
};
