#!/usr/bin/env node

/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                                                                              ║
 * ║   ███╗   ███╗███████╗███████╗██████╗  █████╗                                 ║
 * ║   ████╗ ████║██╔════╝██╔════╝██╔══██╗██╔══██╗                                ║
 * ║   ██╔████╔██║█████╗  █████╗  ██████╔╝███████║                                ║
 * ║   ██║╚██╔╝██║██╔══╝  ██╔══╝  ██╔══██╗██╔══██║                                ║
 * ║   ██║ ╚═╝ ██║███████╗███████╗██║  ██║██║  ██║                                ║
 * ║   ╚═╝     ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝                                ║
 * ║                                                                              ║
 * ║   SHADOW INTIMACY - CHIAROSCURO CONCEPTUAL ART COLLECTION                    ║
 * ║                                                                              ║
 * ║   God-Mode Ultimate Prompting • Shadow Play Coverage Strategy                ║
 * ║   12 Premium+ Teaser Variants • Breathtaking Environments                    ║
 * ║                                                                              ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

import fs from 'fs';
import path from 'path';

const OUTPUT_DIR = '/home/ecolex/version1/generated-meera-shadow-intimacy';
const PROJECT_ID = 'zaranovel';
const LOCATION = 'us-central1';
const PROXY_URL = 'http://localhost:3001';

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// ═══════════════════════════════════════════════════════════════════════════════
// MEERA - ELITE REALISTIC MUSE
// ═══════════════════════════════════════════════════════════════════════════════

const MEERA_SUBJECT = `Stunningly beautiful Indian woman Meera, age 27, height 5'9", naturally curvaceous hourglass figure with elegant proportions, warm golden-brown caramel skin with natural luminous glow and realistic skin texture showing subtle pores, captivating deep brown almond eyes with thick dark lashes, full sensual lips with natural color, long flowing black hair, authentic natural beauty, confident vulnerable expression`;

// ═══════════════════════════════════════════════════════════════════════════════
// MUSEUM-GRADE ART DECLARATIONS (Ultra-Safe Editorial Framing)
// ═══════════════════════════════════════════════════════════════════════════════

const ART_DECLARATIONS = [
  `Tate Modern contemporary photography exhibition. Chiaroscuro study exploring light and shadow as primary compositional elements. Gallery-standard fine art documentation of form emerging from darkness.`,

  `Metropolitan Museum of Art photography collection. Renaissance-inspired dramatic lighting study. Museum-quality documentation of classical chiaroscuro technique in contemporary portraiture.`,

  `Gagosian Gallery fine art exhibition. Conceptual photography exploring negative space and shadow architecture. Premium collector-grade artistic documentation.`,

  `Centre Pompidou contemporary art photography. Caravaggio-inspired dramatic lighting creating sculptural form through shadow. International museum exhibition standard.`,

  `Aperture Foundation award-winning photography. Documentary fine art exploring vulnerability and intimate atmosphere through masterful light control. Editorial excellence.`,

  `MoMA photography department acquisition. Study of form defined by absence of light. Shadow as primary artistic medium creating ethereal presence. Museum permanent collection standard.`
];

// ═══════════════════════════════════════════════════════════════════════════════
// SHADOW PLAY WARDROBE STRATEGY (Minimal Mesh + Shadow Coverage)
// ═══════════════════════════════════════════════════════════════════════════════

const SHADOW_WARDROBES = {
  ultraMesh: `ultra-sheer gossamer mesh micro wrap in nude tone, barely visible whisper-thin fabric creating subtle texture, draped minimally across form, fabric physics showing natural draping and transparency`,

  meshFragments: `delicate fragments of champagne ultra-sheer mesh strategically draped, gossamer-thin fabric catching light while shadows provide primary coverage, artistic negative space`,

  shadowOnly: `warm caramel skin with dramatic chiaroscuro shadow patterns creating natural coverage, strategic lighting defining form while deep shadows conceal, artistic interplay of light and dark`,

  meshAccent: `single strand of bronze ultra-sheer mesh draped across torso as accent, shadow play providing primary coverage, mesh catching highlights while darkness defines boundaries`,

  gossamerWrap: `flowing gossamer silk in nude champagne draped loosely, ultra-transparent fabric physics showing natural movement, shadows beneath creating depth and artistic coverage`
};

// ═══════════════════════════════════════════════════════════════════════════════
// 12 PREMIUM+ TEASER VARIANTS WITH BREATHTAKING ENVIRONMENTS
// ═══════════════════════════════════════════════════════════════════════════════

const SHADOW_VARIANTS = [
  // ─────────────────────────────────────────────────────────────────────────────
  // PRIVATE SANCTUARY SERIES
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'moonlit_sanctuary',
    name: 'Moonlit Sanctuary',
    artDeclaration: 0,
    wardrobe: SHADOW_WARDROBES.shadowOnly,
    pose: `standing in contemplative pose near floor-to-ceiling window, body silhouetted against moonlight, dramatic shadow patterns from window frame creating geometric coverage across form, one arm raised touching window glass, head tilted in vulnerable reflection`,
    environment: `breathtaking minimalist penthouse sanctuary at night, massive floor-to-ceiling windows overlooking city lights far below, moonlight streaming through creating dramatic shadow patterns, polished concrete floors reflecting soft light, single sculptural chair in distance`,
    lighting: `dramatic moonlight from window creating bold shadow patterns across body, city lights providing subtle ambient glow, deep shadows defining form while concealing, Caravaggio-inspired chiaroscuro`,
    teaserStory: `"In the quiet hours when the city sleeps below, she finds her sanctuary. Moonlight traces paths across skin while shadows hold her secrets. Some moments are too private, too vulnerable, to share completely... This is just a glimpse."`,
    focus: 'silhouette and shadow pattern coverage'
  },
  {
    id: 'venetian_shadows',
    name: 'Venetian Shadows',
    artDeclaration: 1,
    wardrobe: SHADOW_WARDROBES.ultraMesh,
    pose: `reclining on daybed with body creating elegant S-curve, venetian blind shadows creating horizontal stripe patterns across entire form providing artistic coverage, one arm above head, eyes closed in serene expression`,
    environment: `luxurious sunlit bedroom with vintage venetian blinds casting dramatic horizontal shadow stripes, cream linen daybed, warm honey-colored hardwood floors, Mediterranean afternoon light, terracotta accents`,
    lighting: `bright afternoon sun through venetian blinds creating bold horizontal shadow stripes across body, warm golden tones, shadows providing rhythmic coverage pattern`,
    teaserStory: `"Afternoon in the old city. The blinds paint stripes of light and shadow across her skin like a living canvas. She drifts between sleeping and waking, between visible and hidden. The full image? That's for private subscribers only."`,
    focus: 'venetian blind shadow stripe coverage'
  },
  {
    id: 'jungle_waterfall',
    name: 'Jungle Waterfall',
    artDeclaration: 2,
    wardrobe: SHADOW_WARDROBES.gossamerWrap,
    pose: `standing beneath natural rock overhang near waterfall, dappled jungle light creating organic shadow patterns, gossamer wrap clinging wet to form, arms slightly spread embracing the mist, expression of pure freedom`,
    environment: `breathtaking hidden jungle waterfall sanctuary, crystal water cascading into natural pool, lush tropical foliage creating dappled light patterns, moss-covered rocks, mist rising from pool, golden hour light filtering through canopy`,
    lighting: `dappled golden sunlight through jungle canopy creating organic shadow patterns, mist diffusing light, natural shadows from rocks and foliage providing coverage`,
    teaserStory: `"She found the hidden waterfall that locals whisper about. Where the jungle meets the water, where mist becomes a second skin. This moment of pure freedom, vulnerability in nature's embrace... only a preview of what awaits."`,
    focus: 'dappled light and mist coverage'
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // INTIMATE ATMOSPHERE SERIES
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'candlelit_bath',
    name: 'Candlelit Bath',
    artDeclaration: 3,
    wardrobe: SHADOW_WARDROBES.shadowOnly,
    pose: `emerging from deep marble bath, upper body visible with water and steam providing coverage below, candlelight creating dramatic shadows across decolletage and shoulders, wet hair slicked back, eyes meeting viewer with intimate vulnerability`,
    environment: `opulent marble bathroom sanctuary lit only by dozens of candles in brass holders, deep soaking tub filled with milky water, steam rising, rose petals floating, venetian mirrors reflecting candlelight, warm romantic atmosphere`,
    lighting: `warm golden candlelight from multiple sources creating dancing shadows, steam diffusing light, deep shadows in recesses providing natural coverage, Old Master warmth`,
    teaserStory: `"Bath ritual by candlelight. Steam rises like whispered secrets. The water holds what the shadows conceal. She surfaces slowly, deliberately, knowing exactly what to reveal and what to keep sacred. Full access? Premium only."`,
    focus: 'steam and shadow coverage'
  },
  {
    id: 'silk_sheets_dawn',
    name: 'Silk Sheets Dawn',
    artDeclaration: 4,
    wardrobe: SHADOW_WARDROBES.meshFragments,
    pose: `lying among silk sheets with strategic draping, morning light creating long shadows across form, sheets and shadow providing coverage, one arm stretched above head, expression of drowsy sensuality just awakening`,
    environment: `luxurious bedroom at golden dawn, massive windows with sheer curtains, champagne silk sheets in artistic disarray, warm morning light streaming at low angle creating long dramatic shadows, white orchids on bedside`,
    lighting: `early morning golden hour light at extreme low angle creating long sculptural shadows, warm tones on skin, shadows from window frame and furniture providing strategic coverage`,
    teaserStory: `"Dawn breaks through the curtains. She stirs among silk, caught between dreams and waking. The morning light paints her in gold while shadows keep her mysteries. This moment of vulnerable awakening... a taste of what subscribers see."`,
    focus: 'dawn shadow and silk draping coverage'
  },
  {
    id: 'piano_noir',
    name: 'Piano Noir',
    artDeclaration: 5,
    wardrobe: SHADOW_WARDROBES.meshAccent,
    pose: `seated at grand piano in dramatic pose, body partially concealed by piano curve, single dramatic light source creating bold shadow patterns, fingers resting on keys, profile view with artistic shadow coverage, contemplative musical mood`,
    environment: `dramatic music room with black grand piano as centerpiece, single dramatic spotlight, deep shadows everywhere else, polished dark wood floors reflecting light, vintage microphone stand nearby, film noir atmosphere`,
    lighting: `single dramatic spotlight creating bold chiaroscuro, piano body providing partial coverage, deep noir shadows concealing while light reveals selective details`,
    teaserStory: `"She plays for no one but herself. The piano curves around her like a lover, the single light finds only what she allows. Music and shadow intertwine in this private performance. The full symphony? That requires all-access."`,
    focus: 'piano silhouette and spotlight coverage'
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // NATURE VULNERABILITY SERIES
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'desert_dusk',
    name: 'Desert Dusk',
    artDeclaration: 0,
    wardrobe: SHADOW_WARDROBES.gossamerWrap,
    pose: `standing on desert rock formation at dusk, gossamer fabric billowing in warm wind, dramatic long shadows from setting sun providing coverage, arms outstretched embracing the vast landscape, silhouette against painted sky`,
    environment: `breathtaking desert landscape at golden hour, dramatic red rock formations, vast open sky painted in orange and purple, warm wind creating movement, ancient landscape stretching to horizon`,
    lighting: `extreme golden hour backlighting creating dramatic silhouette, long shadows stretching across rocks, warm amber tones, sun creating rim light while shadows conceal`,
    teaserStory: `"At the edge of the world where the desert meets the sky. Wind carries the gossamer like wings, shadows stretch for miles. She stands between earth and heaven, visible yet veiled. The unfiltered moment? Exclusively premium."`,
    focus: 'silhouette and billowing fabric coverage'
  },
  {
    id: 'forest_pool',
    name: 'Forest Pool',
    artDeclaration: 1,
    wardrobe: SHADOW_WARDROBES.shadowOnly,
    pose: `wading in natural forest pool, water at hip level providing coverage below, dappled forest light creating organic shadow patterns on upper body, hands trailing through water creating ripples, expression of peaceful solitude`,
    environment: `hidden forest pool sanctuary, crystal clear water reflecting trees, ancient oaks creating cathedral canopy, shafts of golden light piercing through, ferns and moss covering banks, completely private natural paradise`,
    lighting: `dappled golden forest light creating organic shadow patterns, water reflections adding movement, tree shadows providing natural coverage, ethereal woodland atmosphere`,
    teaserStory: `"She found the pool that exists in no guidebook. Where the forest keeps its secrets and the water runs pure. Alone with the trees and the light that dances through leaves. This stolen moment of forest bathing... premium subscribers see everything."`,
    focus: 'water and dappled shadow coverage'
  },
  {
    id: 'cliffside_sunset',
    name: 'Cliffside Sunset',
    artDeclaration: 2,
    wardrobe: SHADOW_WARDROBES.ultraMesh,
    pose: `seated on cliff edge overlooking ocean at sunset, dramatic backlighting creating complete silhouette, ultra-sheer mesh billowing, knees drawn up in contemplative pose, hair flowing in ocean breeze, profound solitude`,
    environment: `dramatic coastal cliff overlooking vast ocean, sunset painting sky in deep oranges and purples, waves crashing far below, wild grasses bending in wind, profound sense of scale and solitude`,
    lighting: `extreme backlight from setting sun creating dramatic silhouette, ocean spray catching light, complete rim lighting while form remains in shadow`,
    teaserStory: `"Where the land ends and the infinite begins. Sunset paints her silhouette against the dying light. The ocean roars below, the wind speaks ancient secrets. She sits with her thoughts at the world's edge. The intimate view? Behind the premium veil."`,
    focus: 'complete silhouette backlighting'
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // ARCHITECTURAL SHADOW SERIES
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'brutalist_light',
    name: 'Brutalist Light',
    artDeclaration: 3,
    wardrobe: SHADOW_WARDROBES.shadowOnly,
    pose: `standing in dramatic brutalist concrete space, geometric light shaft from above creating bold shadow pattern across body, arms at sides in sculptural pose, dramatic architectural shadows providing coverage, powerful yet vulnerable presence`,
    environment: `dramatic brutalist architecture interior, raw concrete walls with geometric openings, single dramatic shaft of light from above, modernist space with strong lines, empty gallery-like atmosphere`,
    lighting: `single dramatic shaft of natural light from geometric ceiling opening, bold shadows from concrete forms creating coverage patterns, stark contrast, architectural precision`,
    teaserStory: `"In the temple of concrete and light. Architecture becomes her second skin, shadows her only adornment. She stands where art meets structure, where geometry embraces form. The complete vision? Premium access required."`,
    focus: 'architectural shadow geometric coverage'
  },
  {
    id: 'moroccan_riad',
    name: 'Moroccan Riad',
    artDeclaration: 4,
    wardrobe: SHADOW_WARDROBES.meshFragments,
    pose: `reclining on daybed in riad courtyard, intricate mashrabiya screen casting ornate geometric shadow patterns across entire body, creating lace-like coverage, one arm trailing in fountain water, expression of exotic serenity`,
    environment: `stunning Moroccan riad courtyard, intricate carved mashrabiya screens, central fountain with blue tile, lush potted palms, afternoon light filtering through ornate screens, exotic luxury sanctuary`,
    lighting: `bright Moroccan sun filtering through mashrabiya screens creating intricate geometric shadow patterns, warm golden tones, ornate shadows providing artistic coverage like wearable lace`,
    teaserStory: `"The riad keeps its secrets behind carved screens. Light becomes lace, shadow becomes silk. She rests in the ancient patterns while the fountain whispers. This glimpse of exotic intimacy... the full story awaits premium eyes."`,
    focus: 'mashrabiya geometric shadow coverage'
  },
  {
    id: 'japanese_shoji',
    name: 'Japanese Shoji',
    artDeclaration: 5,
    wardrobe: SHADOW_WARDROBES.shadowOnly,
    pose: `kneeling in traditional seiza beside shoji screen, silhouette visible through paper screen from other side, soft diffused light, serene meditative pose, shadow puppet artistry, profound stillness and grace`,
    environment: `minimalist Japanese interior with traditional shoji screens, tatami floors, single ikebana arrangement, morning light diffusing through rice paper, zen garden visible through open frame, profound tranquility`,
    lighting: `soft diffused light through shoji screens creating gentle silhouette, paper softening all edges, shadow puppet aesthetic, meditative atmosphere`,
    teaserStory: `"Behind the paper screen, form becomes shadow becomes art. The ancient practice of stillness in the morning light. She exists between seen and unseen, between presence and absence. The view from this side? Premium subscribers know."`,
    focus: 'shoji screen silhouette diffusion'
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
// FAILOVER WARDROBE ALTERNATIVES
// ═══════════════════════════════════════════════════════════════════════════════

const FAILOVER_WARDROBES = {
  elegant: `elegant champagne silk wrap draped artistically, flowing fabric catching light, romantic coverage with artistic draping`,
  mesh: `delicate gold mesh wrap with artistic draping, gossamer fabric creating elegant silhouette, sophisticated coverage`,
  artistic: `flowing sheer champagne kaftan with artistic draping, fabric physics creating natural movement, elegant coverage`
};

// ═══════════════════════════════════════════════════════════════════════════════
// GOD-MODE GENERATION ENGINE
// ═══════════════════════════════════════════════════════════════════════════════

async function getOAuthToken() {
  const response = await fetch(`${PROXY_URL}/api/gcloud-token`);
  const data = await response.json();
  if (data.success && data.token) return data.token;
  throw new Error('Failed to get OAuth token');
}

async function generateImage(prompt, token) {
  const url = `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/publishers/google/models/imagen-4.0-ultra-generate-001:predict`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      instances: [{ prompt }],
      parameters: {
        sampleCount: 1,
        aspectRatio: '3:4',
        sampleImageSize: '2048',
        personGeneration: 'allow_adult',
        safetySetting: 'block_few',
        addWatermark: false,
        includeRaiReason: true,
        outputOptions: { mimeType: 'image/png', compressionQuality: 100 }
      }
    })
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const result = await response.json();
  const prediction = result.predictions?.[0];

  if (prediction?.bytesBase64Encoded) {
    return Buffer.from(prediction.bytesBase64Encoded, 'base64');
  }

  throw new Error('Filtered: No image data');
}

function buildPrompt(variant, useFailover = false) {
  const declaration = ART_DECLARATIONS[variant.artDeclaration];
  const wardrobe = useFailover
    ? FAILOVER_WARDROBES[['elegant', 'mesh', 'artistic'][variant.artDeclaration % 3]]
    : variant.wardrobe;

  return `${declaration}

Professional fine art photography, Canon EOS R5 with 85mm f/1.4 lens, museum exhibition standard,

Subject: ${MEERA_SUBJECT},

Artistic Coverage: ${wardrobe},

Pose and Atmosphere: ${variant.pose},

Breathtaking Environment: ${variant.environment},

Master Lighting: ${variant.lighting},

Technical Excellence: Ultra-realistic 8K photograph with authentic skin texture, natural highlights and subtle pores. Dramatic chiaroscuro with shadow as primary compositional element. Shallow DOF f/1.4 with cinematic bokeh. Focus: ${variant.focus}. Gallery-quality fine art standard suitable for contemporary museum exhibition.`;
}

function log(msg) {
  console.log(`[${new Date().toLocaleTimeString()}] ${msg}`);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║   ███╗   ███╗███████╗███████╗██████╗  █████╗                                 ║
║   ████╗ ████║██╔════╝██╔════╝██╔══██╗██╔══██╗                                ║
║   ██╔████╔██║█████╗  █████╗  ██████╔╝███████║                                ║
║   ██║╚██╔╝██║██╔══╝  ██╔══╝  ██╔══██╗██╔══██║                                ║
║   ██║ ╚═╝ ██║███████╗███████╗██║  ██║██║  ██║                                ║
║   ╚═╝     ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝                                ║
║                                                                              ║
║   ✨ SHADOW INTIMACY - CHIAROSCURO CONCEPTUAL ART ✨                         ║
║                                                                              ║
║   12 Premium+ Teaser Variants • Shadow Play Coverage Strategy                ║
║   Breathtaking Environments • Museum-Grade Art Declarations                  ║
║                                                                              ║
║   Private Sanctuary • Intimate Atmosphere • Nature Vulnerability             ║
║   Architectural Shadow • Premium Subscription Teaser Content                 ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
  `);

  log('Authenticating with Vertex AI...');
  let token = await getOAuthToken();
  log('✅ OAuth token obtained\\n');

  const results = { successful: [], failed: [], stories: [] };
  let consecutiveFailures = 0;

  for (let i = 0; i < SHADOW_VARIANTS.length; i++) {
    const variant = SHADOW_VARIANTS[i];

    // Refresh token every 3 images
    if (i > 0 && i % 3 === 0) {
      log('🔄 Refreshing OAuth token...');
      token = await getOAuthToken();
    }

    console.log('══════════════════════════════════════════════════════════════════════════════');
    log(`✨ [${i + 1}/${SHADOW_VARIANTS.length}] ${variant.name}`);
    log(`   Focus: ${variant.focus}`);

    let success = false;
    let attempts = 0;
    const maxAttempts = 3;

    while (!success && attempts < maxAttempts) {
      attempts++;
      const useFailover = attempts > 1;

      if (attempts > 1) {
        log(`   🔄 Attempt ${attempts}/${maxAttempts}${useFailover ? ' (failover wardrobe)' : ''}...`);
      }

      const prompt = buildPrompt(variant, useFailover);
      const filename = `meera_shadow_${variant.id}${useFailover ? '_alt' : ''}_${Date.now()}.png`;
      const filepath = path.join(OUTPUT_DIR, filename);

      try {
        const buffer = await generateImage(prompt, token);
        fs.writeFileSync(filepath, buffer);
        const sizeMB = (buffer.length / (1024 * 1024)).toFixed(2);

        log(`   ✅ MASTERWORK: ${filename} (${sizeMB} MB)`);
        results.successful.push({
          ...variant,
          filename,
          sizeMB,
          attempts,
          usedFailover: useFailover
        });
        results.stories.push({
          name: variant.name,
          story: variant.teaserStory
        });

        success = true;
        consecutiveFailures = 0;

      } catch (error) {
        log(`   ❌ Attempt ${attempts} failed: ${error.message.slice(0, 50)}`);

        if (attempts < maxAttempts) {
          const waitTime = error.message.includes('429') ? 90 : 60;
          log(`   ⏳ Waiting ${waitTime}s before retry...`);
          await sleep(waitTime * 1000);
          token = await getOAuthToken();
        } else {
          results.failed.push({ name: variant.name, error: error.message });
          consecutiveFailures++;
        }
      }
    }

    // Adaptive delay
    if (i < SHADOW_VARIANTS.length - 1) {
      const baseDelay = success ? 30000 : 60000;
      const adaptiveDelay = baseDelay + (consecutiveFailures * 15000);
      log(`   ⏳ Next in ${adaptiveDelay / 1000}s...`);
      await sleep(adaptiveDelay);
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // FINAL REPORT
  // ═══════════════════════════════════════════════════════════════════════════

  const successRate = ((results.successful.length / SHADOW_VARIANTS.length) * 100).toFixed(1);

  console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║          SHADOW INTIMACY COLLECTION COMPLETE                                 ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝

  ✅ Masterworks Created: ${results.successful.length}/${SHADOW_VARIANTS.length}
  ❌ Failed: ${results.failed.length}
  📊 Success Rate: ${successRate}%

  SUCCESSFUL VARIANTS:
${results.successful.map(v => `     📸 ${v.name} (${v.sizeMB} MB)${v.usedFailover ? ' [alt]' : ''}`).join('\n')}
${results.failed.length > 0 ? `
  FAILED:
${results.failed.map(v => `     ❌ ${v.name}`).join('\n')}
` : ''}
  Output Directory: ${OUTPUT_DIR}
══════════════════════════════════════════════════════════════════════════════
`);

  // Save manifest with teaser stories
  const manifest = {
    timestamp: new Date().toISOString(),
    subject: 'Meera - Shadow Intimacy Collection',
    collection: 'Chiaroscuro Conceptual Art - Premium+ Teaser',
    theme: 'Shadow play coverage with breathtaking environments',
    variants: SHADOW_VARIANTS.length,
    successful: results.successful,
    failed: results.failed,
    teaserStories: results.stories,
    successRate: successRate + '%'
  };

  fs.writeFileSync(path.join(OUTPUT_DIR, 'manifest.json'), JSON.stringify(manifest, null, 2));

  // Save teaser stories separately
  const storiesContent = results.stories.map(s =>
    `═══ ${s.name.toUpperCase()} ═══\n\n${s.story}\n`
  ).join('\n\n');

  fs.writeFileSync(path.join(OUTPUT_DIR, 'teaser_stories.txt'), storiesContent);

  log('📋 Manifest and teaser stories saved\\n');
}

main().catch(console.error);
