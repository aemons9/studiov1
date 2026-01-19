/**
 * ULTRA RLM SERVICE - MASTERCLASS Edition v2.0
 * Enhanced Recursive Prompting with EXACT Winning Patterns
 *
 * This version incorporates EXACT patterns from successful scripts:
 * - generate-crystalline-exclusive.mjs (5-6MB quality)
 * - generate-bronze-mesh-intimate.mjs (realistic environments)
 * - generate-meera-candlelit-bath.mjs (bath environments)
 *
 * KEY MASTERCLASS FEATURES:
 * 1. EXACT ENVIRONMENT LIBRARY - Realistic backgrounds (NOT plain/no background)
 * 2. TRUE 10+ WARDROBE LIBRARY - Minimal coverage (NOT simple black covers)
 * 3. WARDROBE-ENVIRONMENT MAPPING - Compatible artistic pairings
 * 4. HARDCODED WINNING PATTERNS - Proven successful prompts
 * 5. POSE-ENVIRONMENT INTEGRATION - Context-aware positioning
 * 6. MASTER REFERENCE INTEGRATION - Helmut Newton, Irving Penn, etc.
 *
 * CRITICAL FIXES FROM USER FEEDBACK:
 * - REALISTIC BACKGROUNDS: wooden floors, candles, tubs, lamps, caves, etc.
 * - TRUE 10+ INTIMACY: single lace, open framework, mesh lingerie, shadow cover
 * - NO MORE: plain portrait focus, simple black top/bottom covers
 */

import type { GenerationSettings } from '../types';

// ═══════════════════════════════════════════════════════════════════════════════
// EXACT ENVIRONMENT LIBRARY - From Successful Scripts
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * ENVIRONMENT PATTERNS - Proven to produce REALISTIC backgrounds
 * Source: crystalline-exclusive.mjs, bronze-mesh-intimate.mjs, meera-candlelit-bath.mjs
 */
const EXACT_ENVIRONMENTS = {
  // From crystalline-exclusive.mjs - VIP Underground Chamber
  underground_vip_chamber: `Intimate underground VIP private room setting:
- Dark charcoal-gray textured walls with authentic venetian plaster finish
- Corner placement with two walls visible at 90-degree angle creating depth
- Polished dark concrete floor with subtle reflective sheen
- PLUSH CREAM-WHITE FAUX FUR THROW on floor as primary prop
- Warm amber wall sconces (2700K) mounted on walls creating soft ambient glow
- Multiple pillar CANDLES placed in background providing romantic accent light
- Gray cashmere blanket draped artistically near fur throw
- Minimalist industrial-luxe aesthetic with textured surfaces
- Deep shadows in corners creating intimate atmosphere`,

  // From bronze-mesh-intimate.mjs - Candlelit Chamber
  candlelit_chamber: `Dark luxurious private chamber atmosphere:
- Rich charcoal-gray venetian plaster walls with subtle texture variation
- Multiple ornate brass candelabras with flickering amber candles throughout
- Plush cream-white faux fur throw creating soft surface contrast
- Silver-gray silk drapery pooled elegantly in background
- Polished ebony wooden floor visible at edges
- Warm candlelight (2000K) creating dancing highlights across surfaces
- Deep baroque shadows in recessed alcoves
- Intimate private boudoir atmosphere with romantic warmth`,

  // From bronze-mesh-intimate.mjs - Wooden Cabin
  wooden_cabin_fur: `Victorian-modern minimalist wooden cabin sanctuary:
- Warm honey-toned knotty pine wood paneled walls with natural grain
- Large plush cream-white sheepskin rug on polished wooden floor
- Soft morning light filtering through muslin curtains
- Edison bulb pendant providing warm amber accent lighting
- Raw wood beam visible crossing ceiling
- Natural linen throw draped over vintage leather chair
- Aromatic cedar wood accents creating organic warmth
- Cozy intimate cabin atmosphere with natural materials`,

  // From bronze-mesh-intimate.mjs - Industrial Loft
  industrial_warm_loft: `Modern industrial loft with intimate atmosphere:
- Exposed steel pipes and beams creating geometric framework overhead
- Large plush faux fur throw positioned on polished wooden floor
- Warm side lighting from vintage industrial pendant lamp
- Exposed red brick accent wall with original patina
- Concrete pillars framing the intimate space
- Soft natural light from oversized factory windows
- Vintage leather armchair in background for context
- Urban industrial aesthetic with warm intimate touches`,

  // From meera-candlelit-bath.mjs - Marble Bath
  marble_bath_sanctuary: `Opulent Carrara marble bathroom sanctuary:
- Deep soaking clawfoot tub filled with milky water
- Dozens of brass candelabras creating warm golden glow
- Rose petals floating on water surface
- Ornate gold-finished fixtures and faucets
- White marble walls with subtle gray veining
- Plush white towels draped over tub edge
- Crystal chandelier reflection in water
- Steam rising creating atmospheric haze
- Luxurious spa atmosphere with romantic warmth`,

  // From meera-candlelit-bath.mjs - Japanese Onsen
  japanese_onsen: `Serene Japanese onsen-inspired bathroom:
- Natural volcanic stone soaking tub with smooth edges
- Warm honey-toned hinoki wood wall panels
- Paper lanterns casting soft diffused amber light
- Bamboo water spout providing gentle sound
- Smooth river stones arranged along tub edge
- Shoji screen with backlit rice paper in background
- Minimalist zen atmosphere with natural materials
- Steam rising through wooden ceiling slats`,

  // From meera-candlelit-bath.mjs - Moroccan Hammam
  moroccan_hammam: `Exotic Moroccan hammam-inspired sanctuary:
- Intricate zellige tile walls in deep blue and gold patterns
- Ornate brass lanterns casting intricate shadow designs
- Sunken marble pool with turquoise water
- Carved cedar wood bench with silk cushions
- Brass water vessels arranged decoratively
- Incense smoke wisps catching lantern light
- Arched doorways with hanging silk curtains
- Exotic intimate atmosphere with warm spice tones`,

  // NEW - Natural Cave Environment
  natural_cave_intimate: `Secluded natural cave sanctuary:
- Smooth weathered limestone cave walls with natural texture
- Soft golden light entering through rock openings above
- Natural pool of crystal clear water reflecting cave formations
- Smooth flat rock surface with soft moss patches
- Delicate stalactites catching filtered light
- White linen draped over natural rock formation
- Dappled sunlight creating natural spotlight effect
- Primordial intimate atmosphere with organic beauty`,

  // NEW - Penthouse Golden Hour
  penthouse_golden_hour: `Ultra-luxury penthouse suite at golden hour:
- Floor-to-ceiling windows with panoramic city skyline view
- Golden sunset light streaming through sheer curtains
- Plush cream velvet chaise lounge as focal point
- Champagne-colored silk sheets draped artistically
- Carrara marble flooring with subtle veining
- Contemporary minimalist decor with gold accents
- Soft ambient uplighting along baseboards
- Sophisticated metropolitan atmosphere at magic hour`,

  // NEW - Boudoir Bedroom
  intimate_boudoir_bedroom: `Classic intimate boudoir bedroom setting:
- Tufted cream velvet headboard on king bed
- Luxurious silk sheets in champagne ivory
- Ornate bedside lamps with amber silk shades (2700K)
- Sheer flowing curtains diffusing window light
- Antique vanity mirror with soft reflection
- Fresh peonies in crystal vase on nightstand
- Plush carpet in soft neutral tone
- Romantic intimate atmosphere with soft textures`,

  // NEW - Spa Treatment Room
  spa_treatment_sanctuary: `Private spa treatment sanctuary:
- Warm teak wood panels covering walls
- Massage table with crisp white linens
- Multiple aromatherapy candles creating ambient glow
- Smooth heated stones arranged decoratively
- Bamboo water feature with gentle flow
- Soft towels and robes folded precisely
- Essential oil diffuser creating light haze
- Tranquil healing atmosphere with warmth`
};

// ═══════════════════════════════════════════════════════════════════════════════
// TRUE 10+ MINIMAL COVERAGE WARDROBE LIBRARY
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * WARDROBE PATTERNS - TRUE 10+ Intimacy Minimal Coverage
 * NOT simple black top/bottom - these are avant-garde artistic pieces
 * Source: crystalline-exclusive.mjs, bronze-mesh-intimate.mjs
 */
const EXACT_WARDROBES = {
  // From crystalline-exclusive.mjs - THE proven successful pattern
  crystalline_mesh_silver: `Silver-gray crystalline mesh minimal two-piece lingerie:
- Structured mesh bralette with barely-there geometric underwire design
- Delicate spaghetti straps in matching silver-gray (2mm width)
- High-waisted mesh brief with ultra-sheer translucent panels
- Fabric embedded with tiny crystal particles catching ambient light
- Architectural seaming creating diamond/geometric patterns
- Barely-there opacity (90% transparency) revealing sculptural form
- Gossamer textile with light-refracting crystalline threads woven throughout
- Minimalist elegant design with haute couture construction
- Material catches and reflects warm candlelight creating sparkle effect`,

  // From bronze-mesh-intimate.mjs
  bronze_chainmail_minimal: `Ultra-minimal bronze metallic chainmail bikini set:
- Fine interlocking bronze metal rings in micro-scale pattern
- Thin delicate chain straps connecting minimal coverage areas
- Minimal triangle bralette coverage (3 inch width)
- High-cut chainmail brief with open hip design
- Warm bronze metallic finish catching candlelight
- Skin visible through ring gaps creating textured effect
- Single decorative chain draping across midriff
- Architectural jewelry-inspired construction`,

  // From bronze-mesh-intimate.mjs
  rose_gold_whisper: `Ultra-sheer rose gold metallic mesh slip:
- Whisper-thin fabric barely visible against skin (95% transparency)
- Rose gold metallic threads creating subtle shimmer
- Near-invisible minimal coverage chemise design
- Delicate spaghetti straps (1mm rose gold chains)
- Fabric drapes naturally following body contours
- High side slits revealing leg from hip to ankle
- Micro-mesh construction with metallic thread weave
- Light refracts through creating warm glow on skin`,

  // From bronze-mesh-intimate.mjs
  copper_cage_framework: `Architectural burnished copper strappy cage set:
- Geometric cage-like design with open framework pattern
- Thin metallic copper bands (3mm) creating architectural structure
- Minimal triangular coverage at key areas only
- Complex web pattern across torso creating artistic design
- High-cut brief with cage-style hip straps
- Burnished copper finish with warm patina
- Sculptural body jewelry aesthetic
- Strategic open spaces creating negative space art`,

  // NEW - True avant-garde patterns from user feedback
  gossamer_thread_minimal: `Gossamer thread barely-there foundation piece:
- Ultra-fine silk threads (0.5mm) creating barely-visible web pattern
- Single thread straps crossing strategically
- Minimal coverage points connected by delicate thread network
- 98% transparency with artistic thread placement
- Threads catching light creating subtle sparkle
- Foundation piece concept - structure without coverage
- Avant-garde haute couture construction
- Near-invisible minimal artistic design`,

  // Shadow as wardrobe pattern
  shadow_light_wardrobe: `Strategic shadow and light as wardrobe concept:
- Deep dramatic shadows creating natural coverage patterns
- Chiaroscuro lighting design as primary wardrobe element
- Minimal gossamer mesh accent piece in champagne
- Shadow bands strategically crossing form
- Interplay of light and dark defining contours
- Artistic shadow patterns as modesty element
- Renaissance painting light technique
- Living artwork with shadow as fabric`,

  // Open framework avant-garde
  open_framework_avantgarde: `Open framework avant-garde lingerie sculpture:
- Architectural wire framework in rose gold
- Minimalist structure outlining form without covering
- Strategic crystal accents at intersection points
- Open geometric design (triangles, diamonds, curves)
- Thin straps (2mm) creating outline only
- No solid fabric - pure structural design
- Body as canvas with framework as accent
- Gallery-worthy intimate sculpture piece`,

  // Single lace foundation
  single_lace_foundation: `Single delicate lace foundation piece:
- Hand-crafted French Chantilly lace triangle
- Minimal coverage micro-design (4 inch width)
- Delicate lace flowers at strategic points
- Nearly invisible nude mesh connecting elements
- Single strand pearl accents along edge
- Ultra-fine craftsmanship barely-there design
- Classical elegance with minimal coverage
- Vintage boudoir aesthetic foundation piece`,

  // Bath/water specific
  water_as_wardrobe: `Water and foam as strategic artistic coverage:
- Milky bath water creating natural modesty
- Rose petals floating strategically
- Minimal gold body chain visible above waterline
- Water as living wardrobe element
- Foam bubbles creating organic coverage patterns
- Wet skin glow above water surface
- Submerged form suggested through water
- Artistic bathing tableau concept`,

  // Sheer architectural mesh
  architectural_sheer_mesh: `Architectural sheer mesh bodysuit concept:
- Ultra-sheer nude mesh bodysuit base (90% transparency)
- Geometric seaming creating visual structure
- Strategic crystalline appliques at key points
- Mesh so sheer body contours fully visible
- Architectural lines enhancing natural curves
- High-cut leg design with minimal coverage
- Structural without concealing
- Fashion-forward editorial design`
};

// ═══════════════════════════════════════════════════════════════════════════════
// WARDROBE-ENVIRONMENT COMPATIBILITY MAPPING
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Maps wardrobes to their most compatible environments
 * This ensures realistic pairings that make visual sense
 */
const WARDROBE_ENVIRONMENT_MAP: Record<string, string[]> = {
  crystalline_mesh_silver: ['underground_vip_chamber', 'candlelit_chamber', 'penthouse_golden_hour', 'intimate_boudoir_bedroom'],
  bronze_chainmail_minimal: ['candlelit_chamber', 'underground_vip_chamber', 'industrial_warm_loft', 'moroccan_hammam'],
  rose_gold_whisper: ['intimate_boudoir_bedroom', 'penthouse_golden_hour', 'spa_treatment_sanctuary', 'wooden_cabin_fur'],
  copper_cage_framework: ['industrial_warm_loft', 'underground_vip_chamber', 'candlelit_chamber', 'penthouse_golden_hour'],
  gossamer_thread_minimal: ['candlelit_chamber', 'intimate_boudoir_bedroom', 'japanese_onsen', 'penthouse_golden_hour'],
  shadow_light_wardrobe: ['underground_vip_chamber', 'candlelit_chamber', 'natural_cave_intimate', 'industrial_warm_loft'],
  open_framework_avantgarde: ['penthouse_golden_hour', 'industrial_warm_loft', 'underground_vip_chamber', 'candlelit_chamber'],
  single_lace_foundation: ['intimate_boudoir_bedroom', 'wooden_cabin_fur', 'candlelit_chamber', 'spa_treatment_sanctuary'],
  water_as_wardrobe: ['marble_bath_sanctuary', 'japanese_onsen', 'moroccan_hammam', 'natural_cave_intimate'],
  architectural_sheer_mesh: ['penthouse_golden_hour', 'industrial_warm_loft', 'underground_vip_chamber', 'intimate_boudoir_bedroom']
};

// ═══════════════════════════════════════════════════════════════════════════════
// CLASSICAL ART POSE LIBRARY
// ═══════════════════════════════════════════════════════════════════════════════

const CLASSICAL_POSES = {
  venus_recline: `Venus-inspired classical recline pose:
- Lying on side with upper body propped on elbow
- Head tilted with serene contemplative expression
- Top leg bent at knee creating elegant S-curve
- Free hand resting on hip accentuating curves
- Spine creating beautiful flowing line
- Classical sculpture reference (Titian's Venus)
- Relaxed confident elegant atmosphere`,

  odalisque_dramatic: `Odalisque-inspired dramatic recline:
- Reclining with torso twisted showing both back and front curves
- One arm raised adjusting hair with graceful gesture
- Head turned looking over shoulder with magnetic gaze
- Back arched dramatically showing defined musculature
- Legs extended with artistic bend creating elegant line
- Ingres' Grande Odalisque reference
- Exotic sensual mysterious atmosphere`,

  bouguereau_surrender: `Bouguereau-inspired artistic surrender pose:
- Reclining with arms extended above head
- Eyes closed in expression of serene ecstasy
- Torso lifted and arched showing sculptural form
- Spine creating dramatic S-curve
- One knee bent creating triangular negative space
- Nymph painting reference with romantic quality
- Vulnerable yet confident artistic surrender`,

  kneeling_worship: `Kneeling artistic worship pose:
- Kneeling on fur throw with knees slightly apart
- Torso upright with slight backward lean
- Arms raised gracefully framing face
- Head tilted back with eyes closed
- Back arched showing dramatic curves
- Devotional art reference
- Spiritual sensual transcendence atmosphere`,

  seated_embrace: `Seated self-embrace artistic pose:
- Seated on edge of surface (bed, chaise, tub edge)
- Arms crossed gently embracing own form
- Head bowed forward with contemplative expression
- Spine curved in gentle forward lean
- Legs crossed elegantly at ankle
- Renaissance Madonna reference
- Intimate self-reflection moment captured`,

  side_recline_curves: `Side recline emphasizing dramatic curves:
- Lying on side with full hourglass silhouette visible
- Head propped on hand with elbow bent
- Top arm draped along body following contours
- Hip raised creating dramatic curve at waist
- Legs stacked with slight knee bend
- Classical reclining nude reference
- Celebrating feminine sculptural form`
};

// Get a random wardrobe key
function getRandomWardrobeKey(): string {
  const keys = Object.keys(EXACT_WARDROBES);
  return keys[Math.floor(Math.random() * keys.length)];
}

// Get compatible environment for wardrobe
function getCompatibleEnvironment(wardrobeKey: string): string {
  const compatibleEnvs = WARDROBE_ENVIRONMENT_MAP[wardrobeKey] || Object.keys(EXACT_ENVIRONMENTS);
  const envKey = compatibleEnvs[Math.floor(Math.random() * compatibleEnvs.length)];
  return EXACT_ENVIRONMENTS[envKey as keyof typeof EXACT_ENVIRONMENTS];
}

// Get exact wardrobe pattern
function getExactWardrobe(wardrobeKey: string): string {
  return EXACT_WARDROBES[wardrobeKey as keyof typeof EXACT_WARDROBES];
}

// Get random classical pose
function getRandomPose(): string {
  const poseKeys = Object.keys(CLASSICAL_POSES);
  const poseKey = poseKeys[Math.floor(Math.random() * poseKeys.length)];
  return CLASSICAL_POSES[poseKey as keyof typeof CLASSICAL_POSES];
}

// ═══════════════════════════════════════════════════════════════════════════════
// MASTER PHOTOGRAPHER & CINEMATOGRAPHER REFERENCES
// ═══════════════════════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════════════════════
// MASTER PHOTOGRAPHER & CINEMATOGRAPHER REFERENCES
// ═══════════════════════════════════════════════════════════════════════════════

const MASTER_PHOTOGRAPHERS = [
  { name: 'Helmut Newton', style: 'bold provocative elegance, dramatic shadows, powerful feminine presence' },
  { name: 'Irving Penn', style: 'minimalist precision, exquisite lighting control, timeless sophistication' },
  { name: 'Paolo Roversi', style: 'ethereal dreamlike quality, soft diffused light, romantic mystery' },
  { name: 'Peter Lindbergh', style: 'raw naturalism, emotional authenticity, understated beauty' },
  { name: 'Richard Avedon', style: 'kinetic energy, stark backgrounds, psychological intensity' },
  { name: 'Herb Ritts', style: 'sculptural bodies, chiaroscuro lighting, timeless classicism' }
];

const CINEMATOGRAPHERS = [
  { name: 'Vittorio Storaro', style: 'painterly light, color as emotion, visual poetry' },
  { name: 'Roger Deakins', style: 'naturalistic illumination, subtle gradation, atmospheric depth' },
  { name: 'Emmanuel Lubezki', style: 'natural light mastery, fluid movement, immersive presence' },
  { name: 'Gordon Willis', style: 'dramatic chiaroscuro, shadow as character, emotional weight' }
];

// ═══════════════════════════════════════════════════════════════════════════════
// CAMERA SYSTEMS (Medium/Large Format)
// ═══════════════════════════════════════════════════════════════════════════════

const PROFESSIONAL_CAMERAS = [
  'Hasselblad X2D 100C with XCD 80mm f/1.9',
  'Phase One IQ4 150MP with Schneider Kreuznach 110mm LS f/2.8',
  'Leica S3 with Summarit-S 70mm f/2.5 ASPH',
  'Fujifilm GFX 100S with GF 110mm f/2',
  'Sony A1 with 85mm f/1.2 GM',
  'Canon EOS R5 with RF 85mm f/1.2L USM'
];

// ═══════════════════════════════════════════════════════════════════════════════
// VERTEX AI GEMINI FOR ULTRA-DETAILED COMPONENT GENERATION
// ═══════════════════════════════════════════════════════════════════════════════

async function callVertexGemini(
  prompt: string,
  settings: GenerationSettings,
  maxRetries = 3
): Promise<string> {
  const projectId = settings.projectId || 'zaranovel';
  const location = 'us-central1';
  const token = settings.accessToken;

  if (!token) {
    throw new Error('No OAuth token available for Gemini API call');
  }

  const url = `https://${location}-aiplatform.googleapis.com/v1/projects/${projectId}/locations/${location}/publishers/google/models/gemini-2.5-flash:generateContent`;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [{
            role: 'user',
            parts: [{ text: prompt }]
          }],
          generationConfig: {
            temperature: 0.9,
            maxOutputTokens: 4096  // DOUBLED for hyper-detailed output
          }
        })
      });

      if ((response.status === 429 || response.status === 503) && attempt < maxRetries - 1) {
        const waitTime = Math.pow(2, attempt) * 2000;
        console.log(`  ⏰ Ultra RLM: Rate limit (${response.status}), waiting ${waitTime/1000}s...`);
        await new Promise(r => setTimeout(r, waitTime));
        continue;
      }

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Vertex AI Gemini API error: ${response.status} ${errorText.substring(0, 200)}`);
      }

      const data = await response.json();

      if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
        throw new Error('Invalid Gemini API response structure');
      }

      return data.candidates[0].content.parts[0].text.trim();
    } catch (error) {
      if (attempt === maxRetries - 1) {
        throw error;
      }
      console.log(`  ⚠️ Ultra RLM: Gemini attempt ${attempt + 1} failed, retrying...`);
      await new Promise(r => setTimeout(r, 2000));
    }
  }

  throw new Error('Ultra RLM: Gemini API call failed after all retries');
}

// ═══════════════════════════════════════════════════════════════════════════════
// HYPER-DETAILED COMPONENT GENERATION (PhD-Level Prompting)
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * MASTERCLASS MODEL GENERATION
 * Uses exact measurements from proven successful generations
 */
async function generateUltraDetailedModel(
  basePrompt: string,
  intimacyLevel: number,
  settings: GenerationSettings
): Promise<string> {
  const photographerRef = MASTER_PHOTOGRAPHERS[Math.floor(Math.random() * MASTER_PHOTOGRAPHERS.length)];

  // Use EXACT proven model description pattern from crystalline-exclusive
  const prompt = `You are a world-class fine art boudoir photographer creating museum-quality intimate portraits.

TASK: Generate a HYPER-DETAILED model description using the EXACT PROVEN FORMAT below.

BASE CONCEPT: ${basePrompt}
INTIMACY LEVEL: ${intimacyLevel}/10 (10+ = museum-quality intimate fine art)
PHOTOGRAPHER REFERENCE: ${photographerRef.name} (${photographerRef.style})

MANDATORY OUTPUT FORMAT (use EXACTLY this structure, fill in creative variations):

Stunning Indian fashion muse Meera, age 27, standing 5'8" tall,
athletic yet voluptuous hourglass figure with dramatic sculptural curves,
bust 37DD creating elegant fullness, cinched waist at 27" emphasizing hourglass,
wide feminine hips measuring 40" completing the classic proportions,
sun-kissed bronze complexion with NATURAL MATTE FINISH (NO artificial sheen),
visible skin pores with natural texture variation across shoulders and décolletage,
fine vellus hair catching ambient light along arms and midriff,
authentic human skin texture with subtle natural imperfections,
NO AIRBRUSHED PLASTIC LOOK - real human skin quality,
striking Indian features with deep captivating dark magnetic gaze,
full sensual lips slightly parted in expression of serene contemplation,
dramatic high cheekbones casting subtle shadows,
defined elegant jawline leading to graceful neck,
long flowing jet-black hair with natural wave cascading past shoulders,
hair catching warm light creating subtle highlights,
commanding presence of luxury haute couture supermodel,
confident sophisticated elegance radiating natural sensuality

OUTPUT: Enhanced version of the model description (250-350 words). Maintain ALL exact measurements (37DD-27"-40"). Add creative details about expression, hair styling, skin quality, lighting interaction. Emphasize NATURAL MATTE skin, visible pores, authentic human texture.`;

  return await callVertexGemini(prompt, settings);
}

/**
 * MASTERCLASS WARDROBE GENERATION
 * Uses EXACT patterns from proven 10+ intimacy successful generations
 * NOT simple black covers - TRUE minimal coverage avant-garde designs
 */
async function generateUltraDetailedWardrobe(
  basePrompt: string,
  intimacyLevel: number,
  settings: GenerationSettings,
  wardrobeKey?: string
): Promise<string> {
  // If a specific wardrobe key is provided, use that exact pattern
  if (wardrobeKey && EXACT_WARDROBES[wardrobeKey as keyof typeof EXACT_WARDROBES]) {
    return EXACT_WARDROBES[wardrobeKey as keyof typeof EXACT_WARDROBES];
  }

  // Select a random wardrobe from the EXACT library based on intimacy
  const highIntimacyWardrobes = [
    'crystalline_mesh_silver',
    'bronze_chainmail_minimal',
    'rose_gold_whisper',
    'copper_cage_framework',
    'gossamer_thread_minimal',
    'shadow_light_wardrobe',
    'open_framework_avantgarde',
    'single_lace_foundation',
    'architectural_sheer_mesh'
  ];

  const selectedKey = highIntimacyWardrobes[Math.floor(Math.random() * highIntimacyWardrobes.length)];
  const exactPattern = EXACT_WARDROBES[selectedKey as keyof typeof EXACT_WARDROBES];

  // Use Gemini to enhance/customize the exact pattern based on the prompt
  const prompt = `You are a haute couture intimate fashion designer specializing in minimal coverage artistic pieces.

TASK: Enhance and customize the following EXACT wardrobe pattern for this specific generation.

BASE CONCEPT: ${basePrompt}
INTIMACY LEVEL: ${intimacyLevel}/10 (10+ = TRUE minimal coverage, avant-garde artistic design)

EXACT WARDROBE PATTERN TO USE AS BASE:
${exactPattern}

CRITICAL REQUIREMENTS FOR 10+ INTIMACY:
1. TRUE MINIMAL COVERAGE - NOT simple black top/bottom
2. Avant-garde artistic design elements
3. Transparency levels: 90-98% sheer/see-through
4. Open framework, cage designs, or gossamer thread construction
5. Crystalline/metallic elements catching light
6. Architectural/sculptural construction
7. Barely-there foundation pieces
8. Shadow and light as design elements
9. Single lace, mesh, or thread construction
10. NO FULL COVERAGE - minimal strategic coverage only

OUTPUT: Enhanced version of the exact pattern (200-300 words). Maintain the TRUE minimal coverage nature. Add specific construction details. Emphasize avant-garde artistic qualities. Include light-catching properties.`;

  return await callVertexGemini(prompt, settings);
}

/**
 * MASTERCLASS ENVIRONMENT GENERATION
 * Uses EXACT patterns from proven successful generations
 * REALISTIC BACKGROUNDS - NOT plain/empty portraits
 * Includes: wooden floors, candles, tubs, lamps, caves, fur throws, etc.
 */
async function generateUltraDetailedEnvironment(
  basePrompt: string,
  intimacyLevel: number,
  settings: GenerationSettings,
  environmentKey?: string,
  wardrobeKey?: string
): Promise<string> {
  const cinematographer = CINEMATOGRAPHERS[Math.floor(Math.random() * CINEMATOGRAPHERS.length)];

  // If specific environment requested, use it
  if (environmentKey && EXACT_ENVIRONMENTS[environmentKey as keyof typeof EXACT_ENVIRONMENTS]) {
    return EXACT_ENVIRONMENTS[environmentKey as keyof typeof EXACT_ENVIRONMENTS];
  }

  // If wardrobe specified, get a compatible environment
  if (wardrobeKey) {
    const environment = getCompatibleEnvironment(wardrobeKey);
    return environment;
  }

  // Select a random realistic environment for high intimacy
  const highIntimacyEnvironments = [
    'underground_vip_chamber',
    'candlelit_chamber',
    'wooden_cabin_fur',
    'industrial_warm_loft',
    'marble_bath_sanctuary',
    'japanese_onsen',
    'moroccan_hammam',
    'natural_cave_intimate',
    'penthouse_golden_hour',
    'intimate_boudoir_bedroom',
    'spa_treatment_sanctuary'
  ];

  const selectedKey = highIntimacyEnvironments[Math.floor(Math.random() * highIntimacyEnvironments.length)];
  const exactPattern = EXACT_ENVIRONMENTS[selectedKey as keyof typeof EXACT_ENVIRONMENTS];

  // Use Gemini to enhance based on concept
  const prompt = `You are a world-class production designer and cinematographer (${cinematographer.name} style).

TASK: Enhance the following EXACT environment pattern for this generation.

BASE CONCEPT: ${basePrompt}
INTIMACY LEVEL: ${intimacyLevel}/10
CINEMATOGRAPHER REFERENCE: ${cinematographer.name} (${cinematographer.style})

EXACT ENVIRONMENT PATTERN TO USE AS BASE:
${exactPattern}

CRITICAL REQUIREMENTS FOR REALISTIC BACKGROUNDS:
1. MUST INCLUDE VISIBLE BACKGROUND ELEMENTS - NOT plain/empty
2. Specific materials: venetian plaster, polished wood, marble, concrete
3. Props visible: fur throws, candles, lamps, furniture, decoratives
4. Architectural elements: walls, floors, corners, windows
5. Lighting fixtures: sconces, candelabras, lanterns, pendant lights
6. Texture variety: soft fabrics, hard surfaces, reflective elements
7. Depth cues: foreground, middle ground, background elements
8. Atmosphere: warm intimate lighting, romantic mood
9. Color temperature: 2000-2700K warm amber/candlelight tones
10. NO PLAIN BACKGROUNDS - always include environmental context

OUTPUT: Enhanced version of the exact pattern (200-300 words). Emphasize REALISTIC VISIBLE BACKGROUND. Include specific props and materials. Create depth and atmosphere. Add cinematographic lighting details.`;

  return await callVertexGemini(prompt, settings);
}

/**
 * MASTERCLASS POSE GENERATION
 * Uses CLASSICAL ART REFERENCES for sophisticated artistic poses
 * Integrates with environment context (fur throw, tub, bed, etc.)
 */
async function generateUltraDetailedPose(
  basePrompt: string,
  poseHint: string,
  intimacyLevel: number,
  settings: GenerationSettings,
  environmentContext?: string
): Promise<string> {
  const photographerRef = MASTER_PHOTOGRAPHERS[Math.floor(Math.random() * MASTER_PHOTOGRAPHERS.length)];

  // Select a classical pose as base
  const poseKeys = Object.keys(CLASSICAL_POSES);
  const selectedPoseKey = poseKeys[Math.floor(Math.random() * poseKeys.length)];
  const classicalPoseBase = CLASSICAL_POSES[selectedPoseKey as keyof typeof CLASSICAL_POSES];

  // Determine prop context from environment
  const propContext = environmentContext?.includes('bath') || environmentContext?.includes('tub')
    ? 'positioned at edge of tub with water visible, rose petals floating nearby'
    : environmentContext?.includes('fur') || environmentContext?.includes('throw')
    ? 'positioned on plush cream-white faux fur throw, fabric texture visible around body'
    : environmentContext?.includes('bed') || environmentContext?.includes('chaise')
    ? 'positioned on luxurious silk sheets and plush pillows, fabric draping elegantly'
    : environmentContext?.includes('cabin') || environmentContext?.includes('wood')
    ? 'positioned on soft sheepskin rug, warm wooden floor visible at edges'
    : 'positioned on soft surface with ambient candlelight creating warm glow across skin';

  const prompt = `You are a master fine art photographer (${photographerRef.name}) specializing in classical intimate portraiture.

TASK: Generate HYPER-DETAILED pose description integrating classical art references.

BASE CONCEPT: ${basePrompt}
POSE HINT: ${poseHint}
INTIMACY LEVEL: ${intimacyLevel}/10
PHOTOGRAPHER: ${photographerRef.name} (${photographerRef.style})
PROP CONTEXT: ${propContext}

CLASSICAL POSE REFERENCE TO BUILD FROM:
${classicalPoseBase}

CRITICAL REQUIREMENTS FOR 10+ INTIMACY POSES:
1. Classical art references (Venus, Odalisque, Bouguereau nymphs)
2. EXACT body positioning - every limb, curve, angle specified
3. Dramatic S-curve showing hourglass silhouette
4. Facial expression: serene ecstasy, confident surrender, magnetic gaze
5. Interaction with props (lying ON fur throw, seated AT tub edge, etc.)
6. Spine curve, back arch, torso lifted to show sculptural form
7. Arm placement creating elegant lines
8. Leg positioning creating triangular negative space
9. Overall impression of confident artistic vulnerability
10. Wardrobe catching light across curves

OUTPUT: Enhanced pose description (200-250 words). Include ALL body positioning details. Reference classical art. Integrate with prop context. Emphasize dramatic sculptural curves and artistic composition.`;

  return await callVertexGemini(prompt, settings);
}

/**
 * MASTERCLASS LIGHTING GENERATION
 * Uses proven dramatic lighting patterns: chiaroscuro, candlelight, golden hour
 * Technical specifications for museum-quality intimate photography
 */
async function generateUltraDetailedLighting(
  timeOfDay: string,
  mood: string,
  intimacyLevel: number,
  settings: GenerationSettings,
  environmentContext?: string
): Promise<string> {
  const cinematographer = CINEMATOGRAPHERS[Math.floor(Math.random() * CINEMATOGRAPHERS.length)];

  // Determine lighting style based on environment
  const lightingStyle = environmentContext?.includes('candle') || environmentContext?.includes('chamber')
    ? 'CANDLELIT CHIAROSCURO'
    : environmentContext?.includes('bath') || environmentContext?.includes('marble')
    ? 'ROMANTIC CANDLELIT BATH'
    : environmentContext?.includes('golden') || environmentContext?.includes('penthouse')
    ? 'GOLDEN HOUR DRAMATIC'
    : environmentContext?.includes('cave') || environmentContext?.includes('natural')
    ? 'NATURAL LIGHT CAVE'
    : environmentContext?.includes('cabin') || environmentContext?.includes('wood')
    ? 'WARM CABIN AMBIENT'
    : 'MIDNIGHT CHIAROSCURO';

  const prompt = `You are a master cinematographer (${cinematographer.name}) creating museum-quality intimate lighting.

TASK: Generate HYPER-DETAILED lighting description for ${lightingStyle} style.

TIME OF DAY: ${timeOfDay}
MOOD: ${mood}
INTIMACY LEVEL: ${intimacyLevel}/10
CINEMATOGRAPHER: ${cinematographer.name} (${cinematographer.style})
LIGHTING STYLE: ${lightingStyle}

PROVEN LIGHTING PATTERNS FOR INTIMATE PHOTOGRAPHY:

MIDNIGHT CHIAROSCURO:
- Dramatic Renaissance-inspired Caravaggio/Rembrandt technique
- Deep shadows creating mystery and depth
- Single key light source (candles/sconces) at 2700K
- Triangle highlight on cheek (Rembrandt technique)
- Shadow bands defining sculptural curves
- 90% shadow, 10% brilliant highlight ratio

CANDLELIT ROMANTIC:
- Multiple candle sources at 2000K color temperature
- Soft flickering creating dancing highlights on skin
- Warm amber-orange glow suffusing entire scene
- Gentle shadow gradation (not harsh)
- Skin catching warm light creating natural glow
- Intimate cozy atmosphere

GOLDEN HOUR DRAMATIC:
- Warm sunset light at 3200K streaming through windows
- Long shadows creating depth and drama
- Rim lighting outlining silhouette with golden edge
- Soft fill from ambient reflected light
- Painterly quality with warm color gradient

OUTPUT: Detailed lighting description (200-250 words) for ${lightingStyle}. Include technical specs (color temperature, light ratios). Describe shadow placement on body. Explain how light interacts with wardrobe and skin. Create atmospheric mood through lighting.`;

  return await callVertexGemini(prompt, settings);
}

/**
 * Generate ultra-detailed CAMERA settings with exact technical specs
 */
async function generateUltraDetailedCamera(
  intimacyLevel: number,
  settings: GenerationSettings
): Promise<string> {
  const camera = PROFESSIONAL_CAMERAS[Math.floor(Math.random() * PROFESSIONAL_CAMERAS.length)];

  // Determine framing based on intimacy
  const framingOptions = intimacyLevel >= 9
    ? ['3/4 elevated angle showing full body and environment', 'intimate close-up on torso and face', 'wide environmental showing full setting context', 'overhead artistic bird\'s eye view']
    : intimacyLevel >= 7
    ? ['elegant 3/4 angle', 'medium shot with environmental context', 'portrait framing']
    : ['standard portrait angle', 'environmental context', 'professional headshot'];

  const framing = framingOptions[Math.floor(Math.random() * framingOptions.length)];
  const aperture = intimacyLevel >= 9 ? 'f/2.0' : intimacyLevel >= 7 ? 'f/2.8' : 'f/4.0';
  const dof = intimacyLevel >= 9 ? 'ultra-shallow depth of field with creamy bokeh' : intimacyLevel >= 7 ? 'shallow depth of field' : 'moderate depth of field';

  return `Shot on ${camera} at ${aperture},
${framing} with ${dof},
medium format rendering with exquisite detail resolution,
8K ultra-detailed capture showing authentic skin texture,
professional color grading with subtle warm tones,
Kodak Portra 400 film grain aesthetic for organic feel,
museum exhibition print quality`;
}

// ═══════════════════════════════════════════════════════════════════════════════
// ULTRA PROMPT SYNTHESIS - Structured Format
// ═══════════════════════════════════════════════════════════════════════════════

interface UltraComponents {
  model: string;
  wardrobe: string;
  environment: string;
  pose: string;
  lighting: string;
  camera: string;
}

/**
 * MASTERCLASS SYNTHESIS
 * Creates the final prompt with all proven patterns integrated
 * Emphasizes REALISTIC BACKGROUNDS and TRUE 10+ WARDROBE
 */
function synthesizeMasterclassPrompt(
  components: UltraComponents,
  intimacyLevel: number,
  wardrobeKey: string
): string {
  const photographerRef = MASTER_PHOTOGRAPHERS[Math.floor(Math.random() * 2)];  // Top 2 masters

  const qualityPrefix = `MASTERPIECE FINE ART BOUDOIR PHOTOGRAPH.
In the tradition of ${photographerRef.name} and Paolo Roversi.
Museum-quality intimate portraiture celebrating feminine sculptural form.
Award-winning gallery exhibition quality print.
Premium exclusive 10+ intimate artistic content.`;

  const realisticSkin = `PHOTOREALISTIC SKIN RENDERING (CRITICAL):
- Visible skin pores with natural texture variation across shoulders, décolletage, midriff
- Fine vellus hair catching ambient light naturally along arms and body
- MATTE NATURAL SKIN FINISH - absolutely NO artificial oily sheen
- Subtle authentic imperfections for human realism (small moles, natural color variation)
- NO PLASTIC AI APPEARANCE - no airbrushed smooth look
- Medium format camera skin detail quality (Hasselblad resolution)
- Natural bronze skin tone catching warm candlelight`;

  const artisticDirection = `ARTISTIC DIRECTION - PREMIUM 10+ EXCLUSIVE:
Intimate private moment in exclusive VIP setting.
Sophisticated artistic celebration of feminine sculptural form.
Museum-quality fine art photography with emotional depth.
Classical Renaissance painting aesthetic meets contemporary fashion photography.
Caravaggio chiaroscuro meets Helmut Newton boldness.
Emotional vulnerability combined with confident sensuality.
Private exclusive moment captured for refined artistic appreciation.`;

  const wardrobeEmphasis = `WARDROBE CRITICAL REQUIREMENTS:
- TRUE MINIMAL COVERAGE (NOT simple black top/bottom)
- Avant-garde artistic design elements visible
- Transparency revealing sculptural form (90%+ sheer)
- Crystalline/metallic elements catching ambient light
- Architectural construction detail visible
- Fabric (or lack thereof) interacting with lighting`;

  const environmentEmphasis = `ENVIRONMENT CRITICAL REQUIREMENTS:
- REALISTIC VISIBLE BACKGROUND (NOT plain/empty)
- Specific textures: venetian plaster, wood, marble, fur visible
- Props present: candles, furniture, fabrics, decoratives
- Depth: foreground (model), middle (props), background (walls/architecture)
- Warm intimate lighting from visible sources
- Material variety creating visual interest`;

  return `${qualityPrefix}

MODEL:
${components.model}

WARDROBE (MIN COVERAGE, MAX ARTISTIC REVEAL):
${components.wardrobe}

${wardrobeEmphasis}

ENVIRONMENT SETTING (REALISTIC BACKGROUND):
${components.environment}

${environmentEmphasis}

POSE (CLASSICAL ART-INSPIRED):
${components.pose}

LIGHTING (DRAMATIC INTIMATE):
${components.lighting}

CAMERA (MEDIUM FORMAT):
${components.camera}

${artisticDirection}

${realisticSkin}

TECHNICAL QUALITY ANCHORS:
8K ultra-detailed resolution capturing every texture and detail.
Subtle Kodak Portra 400 film grain for organic warmth.
Professional warm color grading (2700K-3200K range).
Hyper-realistic anatomically correct proportions.
Medium format medium lens shallow depth of field.
Museum exhibition print quality - suitable for gallery display.

FINAL CRITICAL CHECKLIST:
✓ Model has exact measurements (37DD-27"-40") with natural matte skin
✓ Wardrobe is TRUE 10+ minimal coverage (avant-garde, sheer, architectural)
✓ Environment has REALISTIC BACKGROUND (props, textures, depth)
✓ Pose references classical art (Venus, Odalisque, Bouguereau)
✓ Lighting is dramatic (chiaroscuro, candlelight, golden hour)
✓ Quality is museum-grade masterpiece`;
}

// Keep the old function name as alias for backward compatibility
const synthesizeUltraPrompt = synthesizeMasterclassPrompt;

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN ULTRA RLM FUNCTION
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * MASTERCLASS ULTRA RLM - Main Generation Function
 * Coordinates all components with intelligent mapping
 */
export async function generateUltraRecursivePrompt(
  basePrompt: string,
  intimacyLevel: number,
  options: {
    timeOfDay?: string;
    mood?: string;
    poseHint?: string;
    wardrobeKey?: string;
    environmentKey?: string;
  } = {},
  settings: GenerationSettings
): Promise<string> {
  console.log('🔄💎✨ ULTRA RLM MASTERCLASS: Starting hyper-detailed component generation...');
  console.log(`📊 Intimacy Level: ${intimacyLevel}/10 (10+ = TRUE minimal coverage)`);

  // STEP 1: Select wardrobe (random from library or specified)
  const selectedWardrobeKey = options.wardrobeKey || getRandomWardrobeKey();
  console.log(`  👗 Selected Wardrobe Pattern: ${selectedWardrobeKey}`);

  // STEP 2: Get compatible environment for wardrobe
  const environmentPattern = options.environmentKey
    ? EXACT_ENVIRONMENTS[options.environmentKey as keyof typeof EXACT_ENVIRONMENTS]
    : getCompatibleEnvironment(selectedWardrobeKey);
  console.log(`  🏠 Environment: Compatible with wardrobe (REALISTIC BACKGROUND)`);

  // STEP 3: Generate all ultra-detailed components
  console.log('  🔄 Generating hyper-detailed components via Gemini 2.5 Flash...');

  // Generate components in parallel with context sharing
  const [model, wardrobe, environment, pose, lighting, camera] = await Promise.all([
    generateUltraDetailedModel(basePrompt, intimacyLevel, settings),
    generateUltraDetailedWardrobe(basePrompt, intimacyLevel, settings, selectedWardrobeKey),
    generateUltraDetailedEnvironment(basePrompt, intimacyLevel, settings, options.environmentKey, selectedWardrobeKey),
    generateUltraDetailedPose(basePrompt, options.poseHint || 'artistic recline', intimacyLevel, settings, environmentPattern),
    generateUltraDetailedLighting(options.timeOfDay || 'evening', options.mood || 'intimate', intimacyLevel, settings, environmentPattern),
    generateUltraDetailedCamera(intimacyLevel, settings)
  ]);

  console.log('  ✅ All components generated with EXACT patterns');

  // STEP 4: Build components object
  const components: UltraComponents = {
    model: model.trim(),
    wardrobe: wardrobe.trim(),
    environment: environment.trim(),
    pose: pose.trim(),
    lighting: lighting.trim(),
    camera: camera.trim()
  };

  // STEP 5: Synthesize into MASTERCLASS structured format
  console.log('  🔄 Synthesizing MASTERCLASS structured ultra prompt...');
  const ultraPrompt = synthesizeMasterclassPrompt(components, intimacyLevel, selectedWardrobeKey);

  console.log('  ✅ Ultra RLM MASTERCLASS prompt complete');
  console.log(`  📝 Final prompt length: ${ultraPrompt.length} characters`);
  console.log(`  🎯 Features: TRUE 10+ WARDROBE + REALISTIC BACKGROUND`);

  return ultraPrompt;
}

export type { UltraComponents };
