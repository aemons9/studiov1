import React, { useState } from 'react';
import type { PromptData } from '../types';
import { IMAGEN_ART_DIRECTOR_DECLARATION } from '../services/imagenOptimizer';

// VeraLabs Collection Themes with exact Instagram model specifications
export interface VeraLabsCollection {
  id: string;
  name: string;
  category: 'minimalist' | 'editorial' | 'couture' | 'avant-garde' | 'natural';
  season: string;
  intimacyLevel: number;
  colorPalette: string[];
  aspectRatio: '4:5' | '9:16' | '1:1' | '16:9';
  environment: string;
  lighting: string;
  wardrobe: string;
  pose: string;
  mood: string;
  cameraSpecs: {
    model: string;
    lens: string;
    aperture: string;
    distance: string;
  };
  fluxPrompt?: string;
  imagenPrompt?: string;
}

// Exact model specifications from Instagram moodboards
const VERALABS_MODEL_SPECS = {
  height: `5'7"`,
  measurements: '36-26-38',
  figure: 'curvaceous hourglass figure with full bust, tiny waist, wide curved hips',
  complexion: 'radiant golden-bronze complexion with sun-kissed glow',
  hair: 'long dark brown hair with honey highlights',
  hairStyle: 'loose glamorous beach waves cascading over shoulders',
  age: '22-26',
  beauty: 'sultry bedroom eyes with dramatic lashes and winged liner, glossy plump lips, contoured cheekbones, perfect Instagram face',
  presence: 'modern Indian social media star with bold influencer confidence',
  skinFinish: 'flawless Instagram-ready glow with highlighting on cheekbones and collarbones, bronzed radiant finish',
  nails: 'manicured hands with long stiletto nails in nude pink',
  accessories: 'layered gold necklaces, stacked bracelets, multiple ear piercings with gold hoops'
};

const VERALABS_COLLECTIONS: VeraLabsCollection[] = [
  {
    id: 'veralabs-001',
    name: 'Silk & Shadow',
    category: 'minimalist',
    season: 'SS 2025',
    intimacyLevel: 2,
    colorPalette: ['#FAF8F5', '#E8DFD3', '#B8A28E', '#3E3A37'],
    aspectRatio: '4:5',
    environment: 'modernist concrete loft with floor-to-ceiling windows, Barcelona Pavilion-inspired architecture',
    lighting: 'early morning golden hour light filtering through sheer curtains creating dramatic shadows on walls',
    wardrobe: 'flowing cream silk camisole dress by The Row, bias-cut slip dress in champagne, minimal jewelry',
    pose: 'standing elegantly near window, body angled to catch side light, one hand lightly touching wall, contemplative gaze toward light',
    mood: 'quiet luxury, contemplative elegance, minimalist sophistication',
    cameraSpecs: {
      model: 'Hasselblad X2D 100C',
      lens: '80mm',
      aperture: 'f/2.8',
      distance: '3m'
    }
  },
  {
    id: 'veralabs-002',
    name: 'Urban Poetry',
    category: 'editorial',
    season: 'FW 2025',
    intimacyLevel: 4,
    colorPalette: ['#1C1917', '#7C93A3', '#E8B4B8', '#D4AF37'],
    aspectRatio: '4:5',
    environment: 'rooftop terrace overlooking Mumbai skyline at blue hour, glass and steel architecture',
    lighting: 'blue hour with warm city lights contrast, dramatic clouds in background',
    wardrobe: 'structured black wool coat with architectural shoulders over charcoal silk blouse, tailored trousers',
    pose: 'powerful stance at rooftop edge, coat billowing slightly in wind, looking over shoulder at camera, metropolitan confidence',
    mood: 'metropolitan sophistication, powerful femininity, urban elegance',
    cameraSpecs: {
      model: 'Canon R5',
      lens: '85mm f/1.2',
      aperture: 'f/2.0',
      distance: '4m'
    }
  },
  {
    id: 'veralabs-003',
    name: 'Gilded Dreams',
    category: 'couture',
    season: 'Timeless Heritage',
    intimacyLevel: 7,
    colorPalette: ['#8B0000', '#FFD700', '#2C1810', '#F5E6D3'],
    aspectRatio: '4:5',
    environment: 'restored Haveli interior with carved wooden jharokhas, Rajasthan palace architecture',
    lighting: 'warm candlelight and oil lamps creating dramatic chiaroscuro lighting, Rembrandt lighting',
    wardrobe: 'deep burgundy silk saree with intricate gold zardozi embroidery by Sabyasachi, traditional gold jewelry including maang tikka and jhumkas',
    pose: 'regal seated pose on ornate cushions, body in graceful S-curve, adjusting pallu with one hand, regal bearing and expression',
    mood: 'regal opulence, timeless heritage luxury, royal elegance',
    cameraSpecs: {
      model: 'Phase One XF IQ4 150MP',
      lens: '110mm',
      aperture: 'f/4',
      distance: '5m'
    }
  },
  {
    id: 'veralabs-004',
    name: 'Fluid Architecture',
    category: 'avant-garde',
    season: 'Resort 2025',
    intimacyLevel: 5,
    colorPalette: ['#9CAF88', '#C8A2B8', '#FAF8F5', '#7C93A3'],
    aspectRatio: '16:9',
    environment: 'Zaha Hadid-designed space with curved white walls and organic architecture',
    lighting: 'natural light flooding through geometric skylights creating abstract shadow patterns',
    wardrobe: 'sculptural pleated dress by Issey Miyake in sage green, architectural jewelry',
    pose: 'dynamic pose echoing architectural curves, arms extended, fabric in motion, avant-garde expression',
    mood: 'future-forward, intellectual sophistication, architectural harmony',
    cameraSpecs: {
      model: 'Sony A1',
      lens: '24mm f/1.4',
      aperture: 'f/2.8',
      distance: '6m'
    }
  },
  {
    id: 'veralabs-005',
    name: 'Quiet Luxury',
    category: 'minimalist',
    season: 'All Seasons',
    intimacyLevel: 3,
    colorPalette: ['#F7F3ED', '#D4C4B0', '#B8A28E', '#3E3A37'],
    aspectRatio: '4:5',
    environment: 'minimalist interior with travertine and oak materials, Scandinavian-inspired design',
    lighting: 'soft north-facing window light, overcast daylight creating even illumination',
    wardrobe: 'cashmere turtleneck in warm beige and wide-leg wool trousers by Loro Piana',
    pose: 'relaxed seated pose in modernist chair, natural elegant posture, lifestyle editorial approach',
    mood: 'effortless elegance, stealth wealth aesthetic, understated luxury',
    cameraSpecs: {
      model: 'Leica SL2',
      lens: '50mm Summilux',
      aperture: 'f/2.0',
      distance: '3m'
    }
  },
  {
    id: 'veralabs-006',
    name: 'Monsoon Reverie',
    category: 'natural',
    season: 'Monsoon',
    intimacyLevel: 6,
    colorPalette: ['#2C5F7C', '#7BA39B', '#E8DCC4', '#8B6F47'],
    aspectRatio: '4:5',
    environment: 'colonial-era veranda during monsoon rain, lush tropical foliage',
    lighting: 'diffused overcast light with rain atmosphere, water droplets on glass',
    wardrobe: 'flowing indigo and white cotton ensemble with block print details, organic fabrics',
    pose: 'standing in veranda, one hand extended to feel rain, emotive expression gazing at monsoon',
    mood: 'romantic naturalism, seasonal poetry, monsoon melancholy',
    cameraSpecs: {
      model: 'Fujifilm GFX100 II',
      lens: '63mm',
      aperture: 'f/2.8',
      distance: '4m'
    }
  },
  {
    id: 'veralabs-007',
    name: 'Desert Mirage',
    category: 'editorial',
    season: 'Resort',
    intimacyLevel: 5,
    colorPalette: ['#F4A261', '#E76F51', '#8D5524', '#264653'],
    aspectRatio: '16:9',
    environment: 'sand dunes of Jaisalmer at golden hour, vast desert landscape',
    lighting: 'warm directional sunlight creating long shadows, golden hour magic',
    wardrobe: 'flowing earth-toned layers, lightweight fabrics catching desert wind',
    pose: 'walking through sand, fabric billowing, looking back over shoulder, desert goddess energy',
    mood: 'ethereal desert beauty, nomadic luxury, golden hour dreams',
    cameraSpecs: {
      model: 'Canon R3',
      lens: '135mm f/1.8',
      aperture: 'f/2.2',
      distance: '8m'
    }
  },
  {
    id: 'veralabs-008',
    name: 'Metropolitan Nights',
    category: 'editorial',
    season: 'FW 2025',
    intimacyLevel: 7,
    colorPalette: ['#0D0D0D', '#FFC857', '#DB3A34', '#573280'],
    aspectRatio: '9:16',
    environment: 'Marine Drive at midnight, neon-lit Mumbai streets, urban nightscape',
    lighting: 'neon lights, street lamps, cinematic color grading with blue and amber tones',
    wardrobe: 'designer streetwear with luxury edge, oversized leather jacket, statement accessories',
    pose: 'leaning against luxury car, confident urban stance, direct camera gaze',
    mood: 'urban glamour, night life sophistication, street luxury',
    cameraSpecs: {
      model: 'Sony A7S III',
      lens: '35mm f/1.4',
      aperture: 'f/1.8',
      distance: '3m'
    }
  }
];

export const VeraLabsCollectionGenerator: React.FC<{
  onApplyPrompt: (promptData: PromptData, finalPrompt: string) => void;
  currentPromptData: PromptData;
}> = ({ onApplyPrompt, currentPromptData }) => {
  const [selectedCollection, setSelectedCollection] = useState<VeraLabsCollection | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePromptForCollection = (collection: VeraLabsCollection): { promptData: PromptData; fluxPrompt: string; imagenPrompt: string } => {
    // Build detailed prompt with exact model specifications
    const modelDescription = `Indian Instagram influencer model, height ${VERALABS_MODEL_SPECS.height}, ${VERALABS_MODEL_SPECS.figure}, measurements ${VERALABS_MODEL_SPECS.measurements}. ${VERALABS_MODEL_SPECS.complexion}. ${VERALABS_MODEL_SPECS.beauty}. Age ${VERALABS_MODEL_SPECS.age}. ${VERALABS_MODEL_SPECS.presence}`;

    const promptData: PromptData = {
      shot: `${collection.name} editorial photography`,
      subject: {
        variant: modelDescription,
        pose: collection.pose,
        hair_color: VERALABS_MODEL_SPECS.hair,
        hair_style: VERALABS_MODEL_SPECS.hairStyle,
        nail_art: VERALABS_MODEL_SPECS.nails,
        high_heels: collection.wardrobe.includes('heels') ? 'black stiletto heels' : 'barefoot',
        tattoos: 'small delicate infinity symbol on wrist',
        piercings: VERALABS_MODEL_SPECS.accessories,
        body_art: 'none',
        skin_finish: VERALABS_MODEL_SPECS.skinFinish,
        hand_and_nail_details: VERALABS_MODEL_SPECS.nails
      },
      wardrobe: collection.wardrobe,
      environment: collection.environment,
      lighting: collection.lighting,
      camera: {
        focal_length: collection.cameraSpecs.lens,
        aperture: collection.cameraSpecs.aperture,
        distance: collection.cameraSpecs.distance,
        angle: 'eye level professional',
        framing: `${collection.aspectRatio} aspect ratio, editorial framing`
      },
      color_grade: `Professional color grading with ${collection.colorPalette.join(', ')} palette`,
      style: `${collection.mood}. VeraLabs signature aesthetic`,
      quality: 'Ultra-high-end 8K professional fashion photography',
      figure_and_form: `Emphasizing ${VERALABS_MODEL_SPECS.measurements} figure with elegant posing`,
      skin_micro_details: 'Premium resolution with authentic skin texture and professional retouching',
      fabric_physics: 'Realistic fabric draping and movement',
      material_properties: 'Authentic material rendering with proper light interaction'
    };

    // Generate Flux prompt
    const fluxPrompt = `${collection.name} fashion editorial photography. Intimacy ${collection.intimacyLevel}/10. Professional VeraLabs collection.
subject: ${modelDescription}
pose: ${collection.pose}
hair: ${VERALABS_MODEL_SPECS.hairStyle}
wardrobe: ${collection.wardrobe}
environment: ${collection.environment}
lighting: ${collection.lighting}
camera: ${collection.cameraSpecs.model}, ${collection.cameraSpecs.lens} lens, ${collection.cameraSpecs.aperture}, ${collection.cameraSpecs.distance} distance
color_grade: ${collection.colorPalette.join(', ')} palette
style: ${collection.mood}
quality: Ultra-premium 8K fashion photography for VeraLabs collection`;

    // Generate Imagen prompt with Art Director's Declaration
    const imagenPrompt = `${IMAGEN_ART_DIRECTOR_DECLARATION}

${collection.name} Collection - VeraLabs Fashion Editorial

A photograph of ${modelDescription}. Professional fashion photography session for VeraLabs ${collection.season} collection.

The model poses ${collection.pose}. She wears ${collection.wardrobe}.

Environment: ${collection.environment}. ${collection.lighting}.

Camera settings: ${collection.cameraSpecs.model} with ${collection.cameraSpecs.lens} lens, ${collection.cameraSpecs.aperture} aperture, ${collection.cameraSpecs.distance} distance, professional editorial framing.

Color grading: ${collection.colorPalette.join(', ')} palette emphasizing ${collection.mood}.

Technical Specifications: Ultra-premium 8K+ professional fashion photography. ${VERALABS_MODEL_SPECS.measurements} figure with elegant posing. Authentic skin micro-details with professional retouching. Realistic fabric physics.

Intimacy level ${collection.intimacyLevel}/10 - sophisticated fashion editorial content for VeraLabs collection.`;

    return { promptData, fluxPrompt, imagenPrompt };
  };

  const handleGenerateCollection = () => {
    if (!selectedCollection) return;

    setIsGenerating(true);
    const { promptData, fluxPrompt, imagenPrompt } = generatePromptForCollection(selectedCollection);

    // Apply the generated prompt
    setTimeout(() => {
      onApplyPrompt(promptData, imagenPrompt);
      setIsGenerating(false);
    }, 500);
  };

  const filteredCollections = activeCategory === 'all'
    ? VERALABS_COLLECTIONS
    : VERALABS_COLLECTIONS.filter(c => c.category === activeCategory);

  return (
    <div className="veralabs-generator p-4 bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 rounded-xl border border-purple-500/20">
      <div className="header mb-6">
        <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          VeraLabs Collection Generator
        </h2>
        <p className="text-gray-400 text-sm">
          Premium fashion editorial collections featuring our signature Instagram model
        </p>
      </div>

      {/* Category Filters */}
      <div className="filters mb-6 flex gap-2 flex-wrap">
        {['all', 'minimalist', 'editorial', 'couture', 'avant-garde', 'natural'].map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeCategory === category
                ? 'bg-purple-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Collections Grid */}
      <div className="collections-grid grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {filteredCollections.map(collection => (
          <div
            key={collection.id}
            onClick={() => setSelectedCollection(collection)}
            className={`collection-card p-4 rounded-lg border transition-all cursor-pointer ${
              selectedCollection?.id === collection.id
                ? 'bg-purple-900/30 border-purple-500'
                : 'bg-gray-800/50 border-gray-700 hover:border-purple-600'
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-white">{collection.name}</h3>
              <span className="text-xs px-2 py-1 bg-purple-600/30 rounded text-purple-300">
                Level {collection.intimacyLevel}/10
              </span>
            </div>
            <p className="text-sm text-gray-400 mb-2">{collection.season}</p>
            <p className="text-xs text-gray-500 mb-3">{collection.mood}</p>

            {/* Color Palette */}
            <div className="flex gap-1 mb-2">
              {collection.colorPalette.map((color, idx) => (
                <div
                  key={idx}
                  className="w-6 h-6 rounded"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>

            {/* Technical Info */}
            <div className="text-xs text-gray-600">
              <span className="inline-block mr-3">📷 {collection.cameraSpecs.model}</span>
              <span className="inline-block">📐 {collection.aspectRatio}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Collection Details */}
      {selectedCollection && (
        <div className="selected-details p-4 bg-gray-800/50 rounded-lg mb-4">
          <h4 className="font-semibold mb-2 text-purple-300">
            {selectedCollection.name} - Full Details
          </h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-gray-500">Environment:</span>
              <p className="text-gray-300 text-xs">{selectedCollection.environment}</p>
            </div>
            <div>
              <span className="text-gray-500">Lighting:</span>
              <p className="text-gray-300 text-xs">{selectedCollection.lighting}</p>
            </div>
            <div>
              <span className="text-gray-500">Wardrobe:</span>
              <p className="text-gray-300 text-xs">{selectedCollection.wardrobe}</p>
            </div>
            <div>
              <span className="text-gray-500">Camera:</span>
              <p className="text-gray-300 text-xs">
                {selectedCollection.cameraSpecs.lens} @ {selectedCollection.cameraSpecs.aperture}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Model Specifications Display */}
      <div className="model-specs p-4 bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-lg mb-4">
        <h4 className="font-semibold mb-2 text-pink-300">Instagram Model Specifications</h4>
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-400">
          <div>Height: {VERALABS_MODEL_SPECS.height}</div>
          <div>Measurements: {VERALABS_MODEL_SPECS.measurements}</div>
          <div>Age: {VERALABS_MODEL_SPECS.age}</div>
          <div>Hair: {VERALABS_MODEL_SPECS.hair}</div>
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerateCollection}
        disabled={!selectedCollection || isGenerating}
        className={`w-full py-3 rounded-lg font-semibold transition-all ${
          selectedCollection && !isGenerating
            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700'
            : 'bg-gray-800 text-gray-500 cursor-not-allowed'
        }`}
      >
        {isGenerating ? 'Generating Collection...' : 'Generate VeraLabs Collection'}
      </button>

      {/* Info */}
      <div className="mt-4 p-3 bg-blue-900/20 border border-blue-600/30 rounded-lg">
        <p className="text-xs text-blue-300">
          💡 Each collection includes Art Director's Declaration for Imagen 4 safety compliance
          and exact Instagram model specifications for consistent brand identity.
        </p>
      </div>
    </div>
  );
};