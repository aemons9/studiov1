import React, { useState } from 'react';
import { Palette, Camera, Moon, Sparkles, Image, Film } from 'lucide-react';
import { generateArtisticMoodboard, INTIMATE_ARTISTIC_POSES, MASTERCLASS_TECHNIQUES } from '../concepts/artisticMidnightModels';

interface MoodboardTheme {
  id: string;
  name: string;
  description: string;
  keywords: string[];
  colorPalette: string[];
  icon: React.ReactNode;
}

const ARTISTIC_THEMES: MoodboardTheme[] = [
  {
    id: 'candlelit',
    name: 'Candlelit Intimacy',
    description: 'Warm, golden tones with deep shadows creating Rembrandt-style chiaroscuro',
    keywords: ['candlelit', 'intimate', 'golden', 'shadow-play', 'vulnerable'],
    colorPalette: ['#D4A574', '#8B4513', '#2C1810', '#FFD700', '#CD853F'],
    icon: <Sparkles className="w-5 h-5" />
  },
  {
    id: 'moonlit',
    name: 'Moonlight Romance',
    description: 'Cool silver-blue tones mixed with warm interior glows',
    keywords: ['moonlit', 'mysterious', 'ethereal', 'urban romance', 'cinematic'],
    colorPalette: ['#C0C0C0', '#4169E1', '#191970', '#F0E68C', '#2F4F4F'],
    icon: <Moon className="w-5 h-5" />
  },
  {
    id: 'noir',
    name: 'Film Noir',
    description: 'High contrast black and white with neon accents',
    keywords: ['noir', 'urban', 'dangerous beauty', 'neon-lit', 'mysterious'],
    colorPalette: ['#000000', '#FFFFFF', '#FF1493', '#00CED1', '#8B0000'],
    icon: <Film className="w-5 h-5" />
  },
  {
    id: 'natural',
    name: 'Natural Light',
    description: 'Soft, organic lighting with warm earth tones',
    keywords: ['natural', 'cozy', 'authentic', 'warm', 'peaceful'],
    colorPalette: ['#F5E6D3', '#A0826D', '#7B6043', '#E6D4B8', '#C19A6B'],
    icon: <Image className="w-5 h-5" />
  },
  {
    id: 'artistic',
    name: 'Fine Art',
    description: 'Painterly aesthetics with classical composition',
    keywords: ['artistic', 'classical', 'painterly', 'sophisticated', 'timeless'],
    colorPalette: ['#8B4513', '#CD853F', '#DEB887', '#F5DEB3', '#FFE4C4'],
    icon: <Palette className="w-5 h-5" />
  },
  {
    id: 'sensual',
    name: 'Sensual Midnight',
    description: 'Deep, rich tones with intimate lighting',
    keywords: ['sensual', 'intimate', 'vulnerable', 'mysterious', 'dreamlike'],
    colorPalette: ['#800020', '#4B0082', '#301934', '#5D3A6A', '#B8860B'],
    icon: <Camera className="w-5 h-5" />
  }
];

export const ArtisticMoodboards: React.FC = () => {
  const [selectedTheme, setSelectedTheme] = useState<string>('candlelit');
  const [generatedMoodboard, setGeneratedMoodboard] = useState<any>(null);

  const handleGenerateMoodboard = (themeId: string) => {
    setSelectedTheme(themeId);
    const theme = ARTISTIC_THEMES.find(t => t.id === themeId);
    if (theme) {
      const moodboard = generateArtisticMoodboard(theme.name.toLowerCase());
      setGeneratedMoodboard(moodboard);
    }
  };

  return (
    <div className="p-6 bg-gray-900 rounded-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
          <Palette className="w-6 h-6 text-purple-400" />
          Artistic Photography Moodboards
        </h2>
        <p className="text-gray-400">
          Curated collections for masterclass photography with cinematic aesthetics
        </p>
      </div>

      {/* Theme Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {ARTISTIC_THEMES.map(theme => (
          <button
            key={theme.id}
            onClick={() => handleGenerateMoodboard(theme.id)}
            className={`p-4 rounded-lg border transition-all ${
              selectedTheme === theme.id
                ? 'bg-purple-600 border-purple-400'
                : 'bg-gray-800 border-gray-700 hover:border-purple-500'
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`p-2 rounded-lg ${
                selectedTheme === theme.id ? 'bg-purple-700' : 'bg-gray-700'
              }`}>
                {theme.icon}
              </div>
              <h3 className="font-medium text-white">{theme.name}</h3>
            </div>
            <p className="text-sm text-gray-300 mb-3">{theme.description}</p>

            {/* Color Palette Preview */}
            <div className="flex gap-1">
              {theme.colorPalette.map((color, index) => (
                <div
                  key={index}
                  className="h-6 flex-1 rounded"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </button>
        ))}
      </div>

      {/* Generated Moodboard */}
      {generatedMoodboard && (
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-4">
            {generatedMoodboard.theme}
          </h3>

          <p className="text-gray-300 mb-6">
            {generatedMoodboard.description}
          </p>

          {/* Color Palette */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-400 mb-3">Color Palette</h4>
            <div className="grid grid-cols-6 md:grid-cols-12 gap-2">
              {generatedMoodboard.colorPalette.map((color: string, index: number) => (
                <div key={index} className="text-center">
                  <div
                    className="h-12 w-full rounded-lg border border-gray-600"
                    style={{ backgroundColor: ARTISTIC_THEMES.find(t => t.id === selectedTheme)?.colorPalette[index % 5] }}
                  />
                  <p className="text-xs text-gray-400 mt-1 truncate">{color}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Poses */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-400 mb-3">Recommended Poses</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {generatedMoodboard.poses.slice(0, 4).map((pose: any, index: number) => (
                <div key={index} className="p-3 bg-gray-700 rounded-lg">
                  <div className="font-medium text-white mb-1">{pose.name}</div>
                  <div className="text-sm text-gray-400">{pose.mood}</div>
                  <div className="text-xs text-purple-400 mt-1">
                    Intimacy Level: {pose.intimacyLevel}/10
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Lighting Techniques */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-400 mb-3">Lighting Techniques</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {Object.entries(MASTERCLASS_TECHNIQUES.lightingSetups)
                .slice(0, 3)
                .map(([name, setup]) => (
                  <div key={name} className="p-3 bg-gray-700 rounded-lg">
                    <div className="font-medium text-white mb-1">{name}</div>
                    <div className="text-xs text-gray-400">{setup.mood}</div>
                  </div>
                ))}
            </div>
          </div>

          {/* Model Recommendations */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-400 mb-3">Recommended Models</h4>
            <div className="space-y-2">
              {generatedMoodboard.models.slice(0, 3).map((model: any) => (
                <div key={model.id} className="p-3 bg-gray-700 rounded-lg">
                  <div className="font-medium text-white">{model.name}</div>
                  <div className="text-sm text-gray-400 mt-1">
                    Setting: {model.setting.location}
                  </div>
                  <div className="text-xs text-purple-400 mt-1">
                    {model.moodKeywords.slice(0, 5).join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Photography Tips */}
          <div className="p-4 bg-purple-900 bg-opacity-30 rounded-lg">
            <h4 className="text-sm font-medium text-purple-300 mb-2">Pro Photography Tips</h4>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Use {MASTERCLASS_TECHNIQUES.compositionRules["Golden Ratio"]}</li>
              <li>• Apply {MASTERCLASS_TECHNIQUES.compositionRules["Negative Space"]}</li>
              <li>• Create depth with {MASTERCLASS_TECHNIQUES.compositionRules["Frame Within Frame"]}</li>
              <li>• Add tension using {MASTERCLASS_TECHNIQUES.compositionRules["Diagonal Method"]}</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtisticMoodboards;