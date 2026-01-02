import React, { useState } from 'react';
import { generateImage } from '../services';
import type { GenerationSettings } from '../types';
import { IMAGEN_ART_DIRECTOR_DECLARATION } from '../../services/imagenOptimizer';

// VeraLabs Collection Interface
export interface VeraLabsCollection {
  id: string;
  name: string;
  category: 'minimalist' | 'editorial' | 'couture' | 'avant-garde' | 'natural';
  season: string;
  intimacyLevel: number;
  colorPalette: string[];
  aspectRatio: '4:5' | '9:16' | '1:1' | '16:9' | '3:4';
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
}

// Exact Instagram model specifications
const VERALABS_MODEL = {
  height: `5'7"`,
  measurements: '36-26-38',
  figure: 'curvaceous hourglass figure with full bust, tiny waist, wide curved hips',
  complexion: 'radiant golden-bronze complexion with sun-kissed glow',
  hair: 'long dark brown hair with honey highlights',
  hairStyle: 'loose glamorous beach waves cascading over shoulders',
  age: '22-26',
  beauty: 'sultry bedroom eyes with dramatic lashes and winged liner, glossy plump lips, contoured cheekbones, perfect Instagram face',
  presence: 'modern Indian social media star with bold influencer confidence'
};

// VeraLabs Premium Collections
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
    lighting: 'early morning golden hour light filtering through sheer curtains creating dramatic shadows',
    wardrobe: 'flowing cream silk camisole dress by The Row, bias-cut slip dress in champagne',
    pose: 'standing elegantly near window, body angled to catch side light, contemplative gaze',
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
    environment: 'rooftop terrace overlooking Mumbai skyline at blue hour',
    lighting: 'blue hour with warm city lights contrast',
    wardrobe: 'structured black wool coat with architectural shoulders over charcoal silk blouse',
    pose: 'powerful stance at rooftop edge, coat billowing, looking over shoulder',
    mood: 'metropolitan sophistication, powerful femininity',
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
    environment: 'restored Haveli interior with carved wooden jharokhas',
    lighting: 'warm candlelight and oil lamps creating dramatic chiaroscuro',
    wardrobe: 'deep burgundy silk saree with gold zardozi embroidery by Sabyasachi',
    pose: 'regal seated pose on ornate cushions, graceful S-curve',
    mood: 'regal opulence, timeless heritage luxury',
    cameraSpecs: {
      model: 'Phase One XF IQ4',
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
    environment: 'Zaha Hadid-designed space with curved white walls',
    lighting: 'natural light through geometric skylights creating abstract shadows',
    wardrobe: 'sculptural pleated dress by Issey Miyake in sage green',
    pose: 'dynamic pose echoing architectural curves, fabric in motion',
    mood: 'future-forward, intellectual sophistication',
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
    environment: 'minimalist interior with travertine and oak materials',
    lighting: 'soft north-facing window light',
    wardrobe: 'cashmere turtleneck and wide-leg wool trousers by Loro Piana',
    pose: 'relaxed seated pose, natural elegant posture',
    mood: 'effortless elegance, stealth wealth aesthetic',
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
    environment: 'colonial-era veranda during monsoon rain',
    lighting: 'diffused overcast light with rain atmosphere',
    wardrobe: 'flowing indigo cotton with block prints',
    pose: 'standing in veranda, hand extended to feel rain',
    mood: 'romantic naturalism, seasonal poetry',
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
    environment: 'sand dunes of Jaisalmer at golden hour',
    lighting: 'warm directional sunlight, golden hour magic',
    wardrobe: 'flowing earth-toned layers catching desert wind',
    pose: 'walking through sand, fabric billowing, looking back',
    mood: 'ethereal desert beauty, nomadic luxury',
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
    environment: 'Marine Drive at midnight, neon-lit Mumbai streets',
    lighting: 'neon lights, cinematic blue and amber tones',
    wardrobe: 'designer streetwear with luxury edge, oversized leather',
    pose: 'leaning against luxury car, confident urban stance',
    mood: 'urban glamour, night life sophistication',
    cameraSpecs: {
      model: 'Sony A7S III',
      lens: '35mm f/1.4',
      aperture: 'f/1.8',
      distance: '3m'
    }
  },
  {
    id: 'veralabs-009',
    name: 'Himalayan Heights',
    category: 'natural',
    season: 'Winter',
    intimacyLevel: 4,
    colorPalette: ['#FFFFFF', '#8B9DC3', '#3E5F8A', '#2C3E50'],
    aspectRatio: '16:9',
    environment: 'misty Himalayan mountain resort at dawn',
    lighting: 'crisp morning light through mountain mist',
    wardrobe: 'luxury knitwear and shearling coat, winter elegance',
    pose: 'standing on mountain terrace, wrapped in luxury shawl',
    mood: 'adventure elegance, mountain luxury',
    cameraSpecs: {
      model: 'Nikon Z9',
      lens: '70-200mm f/2.8',
      aperture: 'f/3.2',
      distance: '10m'
    }
  },
  {
    id: 'veralabs-010',
    name: 'Coastal Minimalism',
    category: 'minimalist',
    season: 'Resort',
    intimacyLevel: 5,
    colorPalette: ['#F5F5DC', '#D2B48C', '#4682B4', '#FFFFFF'],
    aspectRatio: '4:5',
    environment: 'minimalist beach architecture in Goa at sunset',
    lighting: 'golden hour backlight creating silhouettes',
    wardrobe: 'flowing linen and silk resort wear',
    pose: 'walking along water edge, dress flowing in sea breeze',
    mood: 'effortless coastal luxury, beach elegance',
    cameraSpecs: {
      model: 'Canon R6',
      lens: '50mm f/1.2',
      aperture: 'f/2.0',
      distance: '5m'
    }
  }
];

interface VeraLabsCollectionsUIProps {
  onGenerateImage?: (prompt: string, settings: Partial<GenerationSettings>) => Promise<void>;
  isLoading?: boolean;
}

export const VeraLabsCollectionsUI: React.FC<VeraLabsCollectionsUIProps> = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedCollection, setSelectedCollection] = useState<VeraLabsCollection | null>(null);
  const [promptType, setPromptType] = useState<'imagen' | 'flux'>('imagen');
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const filteredCollections = selectedCategory === 'all'
    ? VERALABS_COLLECTIONS
    : VERALABS_COLLECTIONS.filter(c => c.category === selectedCategory);

  const generatePromptForCollection = (collection: VeraLabsCollection): string => {
    const modelDesc = `Indian Instagram influencer model, height ${VERALABS_MODEL.height}, ${VERALABS_MODEL.figure}, measurements ${VERALABS_MODEL.measurements}. ${VERALABS_MODEL.complexion}. ${VERALABS_MODEL.beauty}. Age ${VERALABS_MODEL.age}. ${VERALABS_MODEL.presence}`;

    if (promptType === 'imagen') {
      // Imagen 4 prompt with Art Director's Declaration
      return `${IMAGEN_ART_DIRECTOR_DECLARATION}

${collection.name} Collection - VeraLabs Fashion Editorial

A photograph of ${modelDesc}. Professional fashion photography session for VeraLabs ${collection.season} collection.

Hair: ${VERALABS_MODEL.hairStyle}. The model poses ${collection.pose}. She wears ${collection.wardrobe}.

Environment: ${collection.environment}. ${collection.lighting}.

Camera settings: ${collection.cameraSpecs.model} with ${collection.cameraSpecs.lens} lens, ${collection.cameraSpecs.aperture} aperture, ${collection.cameraSpecs.distance} distance, professional editorial framing.

Color grading: ${collection.colorPalette.join(', ')} palette emphasizing ${collection.mood}.

Technical Specifications: Ultra-premium 8K+ professional fashion photography. ${VERALABS_MODEL.measurements} figure with elegant posing. Authentic skin micro-details with professional retouching. Realistic fabric physics and material properties.

Intimacy level ${collection.intimacyLevel}/10 - sophisticated fashion editorial content for VeraLabs collection.`;
    } else {
      // Flux prompt
      return `${collection.name} fashion editorial photography. Intimacy ${collection.intimacyLevel}/10. VeraLabs collection.
subject: ${modelDesc}
pose: ${collection.pose}
hair: ${VERALABS_MODEL.hairStyle}
wardrobe: ${collection.wardrobe}
environment: ${collection.environment}
lighting: ${collection.lighting}
camera: ${collection.cameraSpecs.model}, ${collection.cameraSpecs.lens}, ${collection.cameraSpecs.aperture}
color_grade: ${collection.colorPalette.join(', ')} palette
style: ${collection.mood}
quality: Ultra-premium 8K fashion photography`;
    }
  };

  const handleGenerateCollection = async (collection: VeraLabsCollection) => {
    try {
      setIsLoading(true);
      setError(null);
      setGeneratedImages([]);

      const prompt = generatePromptForCollection(collection);

      const settings: GenerationSettings = {
        numImages: 1,
        aspectRatio: collection.aspectRatio === '4:5' ? '3:4' : collection.aspectRatio as any,
        imagenModel: 'imagen-4.0-generate-001',
      };

      console.log('🎨 Generating VeraLabs collection:', {
        collection: collection.name,
        promptType,
        intimacyLevel: collection.intimacyLevel,
        aspectRatio: settings.aspectRatio
      });

      const imageUrl = await generateImage(prompt, settings);
      setGeneratedImages([imageUrl]);

      // Scroll to results
      setTimeout(() => {
        document.getElementById('veralabs-results')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err: any) {
      console.error('VeraLabs generation error:', err);
      setError(err.message || 'Failed to generate collection. Please check your API settings.');
    } finally {
      setIsLoading(false);
    }
  };

  const getCategoryIcon = (category: string): string => {
    const icons: Record<string, string> = {
      minimalist: '○',
      editorial: '◈',
      couture: '♦',
      'avant-garde': '◇',
      natural: '❋'
    };
    return icons[category] || '●';
  };

  return (
    <div className="veralabs-collections-ui bg-gray-900 text-white rounded-xl p-6">
      {/* Header */}
      <div className="header mb-8">
        <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 bg-clip-text text-transparent">
          VeraLabs Premium Collections
        </h2>
        <p className="text-gray-400">
          Curated fashion editorial collections featuring our signature Instagram model with exact specifications
        </p>
        <div className="model-specs mt-4 p-3 bg-purple-900/20 rounded-lg border border-purple-600/30">
          <p className="text-xs text-purple-300">
            Model: {VERALABS_MODEL.height} | {VERALABS_MODEL.measurements} | {VERALABS_MODEL.age}
          </p>
        </div>
      </div>

      {/* Category Filters */}
      <div className="filters mb-6 flex gap-2 flex-wrap">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            selectedCategory === 'all'
              ? 'bg-purple-600 text-white'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
        >
          All Collections
        </button>
        {['minimalist', 'editorial', 'couture', 'avant-garde', 'natural'].map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              selectedCategory === category
                ? 'bg-purple-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            <span>{getCategoryIcon(category)}</span>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Prompt Type Toggle */}
      <div className="prompt-type mb-6 flex gap-2">
        <button
          onClick={() => setPromptType('imagen')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            promptType === 'imagen'
              ? 'bg-green-600 text-white'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
        >
          Imagen 4 (Safe)
        </button>
        <button
          onClick={() => setPromptType('flux')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            promptType === 'flux'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
        >
          Flux (Advanced)
        </button>
      </div>

      {/* Collections Grid */}
      <div className="collections-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {filteredCollections.map(collection => (
          <div
            key={collection.id}
            onClick={() => setSelectedCollection(collection)}
            className={`collection-card p-4 rounded-xl border transition-all cursor-pointer ${
              selectedCollection?.id === collection.id
                ? 'bg-purple-900/30 border-purple-500 shadow-lg shadow-purple-500/20'
                : 'bg-gray-800/50 border-gray-700 hover:border-purple-600'
            }`}
          >
            {/* Collection Header */}
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-bold text-lg text-white mb-1">
                  {collection.name}
                </h3>
                <p className="text-xs text-gray-400">{collection.season}</p>
              </div>
              <span className="px-2 py-1 text-xs bg-purple-600/30 text-purple-300 rounded">
                L{collection.intimacyLevel}
              </span>
            </div>

            {/* Color Palette */}
            <div className="flex gap-1 mb-3">
              {collection.colorPalette.slice(0, 4).map((color, idx) => (
                <div
                  key={idx}
                  className="w-8 h-8 rounded"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>

            {/* Mood */}
            <p className="text-xs text-gray-500 mb-3 line-clamp-2">
              {collection.mood}
            </p>

            {/* Technical Info */}
            <div className="flex justify-between items-center text-xs text-gray-600">
              <span>📷 {collection.cameraSpecs.model.split(' ')[0]}</span>
              <span>📐 {collection.aspectRatio}</span>
            </div>

            {/* Generate Button */}
            {selectedCollection?.id === collection.id && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleGenerateCollection(collection);
                }}
                disabled={isLoading}
                className="w-full mt-3 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium text-sm hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isLoading ? 'Generating...' : 'Generate Collection'}
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Selected Collection Details */}
      {selectedCollection && (
        <div className="details-panel p-6 bg-gray-800/50 rounded-xl border border-gray-700 mb-8">
          <h3 className="text-xl font-bold mb-4 text-purple-300">
            {selectedCollection.name} - Full Specifications
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold text-purple-400 mb-2">Environment</h4>
              <p className="text-gray-300">{selectedCollection.environment}</p>
            </div>
            <div>
              <h4 className="font-semibold text-purple-400 mb-2">Lighting</h4>
              <p className="text-gray-300">{selectedCollection.lighting}</p>
            </div>
            <div>
              <h4 className="font-semibold text-purple-400 mb-2">Wardrobe</h4>
              <p className="text-gray-300">{selectedCollection.wardrobe}</p>
            </div>
            <div>
              <h4 className="font-semibold text-purple-400 mb-2">Pose Direction</h4>
              <p className="text-gray-300">{selectedCollection.pose}</p>
            </div>
            <div>
              <h4 className="font-semibold text-purple-400 mb-2">Camera Setup</h4>
              <p className="text-gray-300">
                {selectedCollection.cameraSpecs.model} | {selectedCollection.cameraSpecs.lens} |
                {selectedCollection.cameraSpecs.aperture} | {selectedCollection.cameraSpecs.distance}
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-purple-400 mb-2">Art Direction</h4>
              <p className="text-gray-300">{selectedCollection.mood}</p>
            </div>
          </div>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="error-message p-4 bg-red-900/20 border border-red-600/50 rounded-lg mb-6">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {/* Results Section */}
      {generatedImages.length > 0 && (
        <div id="veralabs-results" className="results-section">
          <h3 className="text-xl font-bold mb-4 text-purple-300">Generated Collection</h3>
          <div className="grid grid-cols-1 gap-4">
            {generatedImages.map((image, idx) => (
              <div key={idx} className="relative rounded-xl overflow-hidden bg-gray-800">
                <img
                  src={image}
                  alt={`VeraLabs ${selectedCollection?.name}`}
                  className="w-full h-auto"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-white font-semibold">{selectedCollection?.name}</p>
                  <p className="text-gray-300 text-sm">{selectedCollection?.season}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Info Footer */}
      <div className="info-footer mt-8 p-4 bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-lg border border-purple-600/30">
        <p className="text-xs text-purple-300">
          💎 VeraLabs Premium Collections use Art Director's Declaration for Imagen 4 safety compliance.
          Each collection features photorealistic specifications with exact model measurements and professional camera settings.
        </p>
      </div>
    </div>
  );
};