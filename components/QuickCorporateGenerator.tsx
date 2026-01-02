import React, { useState } from 'react';
import { SuccessPromptEngine, CorporatePowerTemplate } from '../services/successTemplateEngine';
import { INDIAN_CORPORATE_VARIANTS, IndianCorporateVariant } from '../models/indianCorporateVariants';
import { INSTAGRAM_INFLUENCER_VARIANTS, InstagramInfluencerVariant } from '../models/instagramInfluencerVariants';
import { PromptData } from '../types';

type ModelVariant = IndianCorporateVariant | InstagramInfluencerVariant;

function isCorporateVariant(variant: ModelVariant): variant is IndianCorporateVariant {
  return 'template' in variant;
}

function isInstagramVariant(variant: ModelVariant): variant is InstagramInfluencerVariant {
  return 'viralPotential' in variant;
}

interface QuickCorporateGeneratorProps {
  onGenerate: (prompt: string, settings: { aspectRatio: '4:5' | '9:16' | '16:9' | '1:1', intimacyLevel: number, safetyTolerance: number }) => void;
  onPopulateFields: (data: PromptData) => void;
  isLoading: boolean;
}

const POSES = [
  'Kneeling among fabric samples and design swatches',
  'Standing at boardroom table with confident authority',
  'Seated on executive desk edge',
  'Reviewing design boards with creative focus',
  'Leaning against floor-to-ceiling glass window',
  'Adjusting designer presentation materials',
  'Positioned at corner office desk with city views'
];

const ENVIRONMENTS = [
  'Executive screening room with luxury seating',
  'Glass-walled boardroom with city skyline views',
  'Corner office with leather seating and art',
  'Creative studio with mood boards and design materials',
  'Luxury penthouse office with designer furniture',
  'Modern conference room with architectural lighting',
  'Private executive lounge with premium finishes'
];

const WARDROBES = [
  'A minimalist foundation piece designed with a single, continuous line of fabric, creating a graphic and almost invisible effect against the form',
  'Structured architectural blazer with deconstructed elements, creating professional sophistication with artistic edge',
  'Tailored power suit with structured authority, strategic design elements creating executive sophistication',
  'Deconstructed blazer over minimal architectural foundation, asymmetric lines',
  'Premium tailored foundation with continuous draping, executive elegance'
];

export const QuickCorporateGenerator: React.FC<QuickCorporateGeneratorProps> = ({ onGenerate, onPopulateFields, isLoading }) => {
  const [selectedVariant, setSelectedVariant] = useState<IndianCorporateVariant>(INDIAN_CORPORATE_VARIANTS[0]);
  const [intimacyLevel, setIntimacyLevel] = useState<number>(7);
  const [powerDynamic, setPowerDynamic] = useState<'dominant' | 'submissive' | 'balanced'>('submissive');
  const [selectedPose, setSelectedPose] = useState<string>(POSES[0]);
  const [selectedEnvironment, setSelectedEnvironment] = useState<string>(ENVIRONMENTS[0]);
  const [selectedWardrobe, setSelectedWardrobe] = useState<string>(WARDROBES[0]);
  const [showPreview, setShowPreview] = useState<boolean>(false);

  const handleGenerate = () => {
    // Clone the variant template and apply customizations
    const customTemplate: CorporatePowerTemplate = {
      ...selectedVariant.template,
      intimacyLevel,
      powerDynamic,
      pose: selectedPose,
      environment: selectedEnvironment,
      wardrobe: selectedWardrobe,
      // Adjust power level based on intimacy
      powerLevel: Math.min(10, Math.max(5, intimacyLevel + 1))
    };

    // Generate the prompt using the exact proven structure
    const generatedPrompt = SuccessPromptEngine.generateCorporatePowerPrompt(customTemplate);

    console.log('🎯 Generated Corporate Power Prompt:', {
      variant: selectedVariant.name,
      intimacyLevel,
      powerDynamic,
      promptLength: generatedPrompt.length
    });

    // Call the generate function with optimal settings
    onGenerate(generatedPrompt, {
      aspectRatio: '4:5',
      intimacyLevel,
      safetyTolerance: 6 // Maximum safety tolerance for best success rate
    });
  };

  const previewPrompt = () => {
    const customTemplate: CorporatePowerTemplate = {
      ...selectedVariant.template,
      intimacyLevel,
      powerDynamic,
      pose: selectedPose,
      environment: selectedEnvironment,
      wardrobe: selectedWardrobe,
      powerLevel: Math.min(10, Math.max(5, intimacyLevel + 1))
    };

    return SuccessPromptEngine.generateCorporatePowerPrompt(customTemplate);
  };

  const handleMigrate = async () => {
    const { parseCorporateTemplateToData } = await import('../services/promptParser');

    const promptData = parseCorporateTemplateToData(
      selectedVariant.name,
      intimacyLevel,
      powerDynamic,
      selectedPose,
      selectedEnvironment,
      selectedWardrobe,
      selectedVariant.measurements,
      selectedVariant.height
    );

    onPopulateFields(promptData);
    console.log('🔄 Migrated Corporate Generator config to JSON fields');
  };

  const getIntimacyColor = (level: number) => {
    if (level <= 4) return 'text-green-400';
    if (level <= 6) return 'text-yellow-400';
    if (level <= 8) return 'text-orange-400';
    return 'text-red-400';
  };

  const getPowerDynamicIcon = (dynamic: string) => {
    if (dynamic === 'dominant') return '👑';
    if (dynamic === 'submissive') return '🎭';
    return '⚖️';
  };

  return (
    <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 rounded-lg p-5 border-2 border-indigo-500/50 shadow-xl">
      <div className="flex items-center gap-3 mb-4">
        <div className="text-3xl">🎯</div>
        <div>
          <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">
            Quick Corporate Power Generator
          </h3>
          <p className="text-sm text-gray-400">
            Based on <strong className="text-green-400">proven working template</strong> - 100% success rate with exact structure
          </p>
        </div>
      </div>

      {/* Variant Selection */}
      <div className="mb-5">
        <label className="block text-sm font-semibold text-indigo-300 mb-2">
          📊 Model Variant (Measurements)
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {INDIAN_CORPORATE_VARIANTS.map((variant) => (
            <button
              key={variant.id}
              onClick={() => setSelectedVariant(variant)}
              disabled={isLoading}
              className={`p-3 rounded-lg border-2 transition-all text-left ${
                selectedVariant.id === variant.id
                  ? 'bg-indigo-600/40 border-indigo-400 shadow-lg'
                  : 'bg-gray-800/50 border-gray-600 hover:border-indigo-500/50'
              }`}
            >
              <div className="font-semibold text-gray-200 mb-1">{variant.name}</div>
              <div className="text-xs text-gray-400">{variant.measurements.bust}</div>
              <div className="text-xs text-gray-500 mt-1">{variant.description.substring(0, 60)}...</div>
            </button>
          ))}
        </div>
      </div>

      {/* Intimacy Level */}
      <div className="mb-5">
        <label className="block text-sm font-semibold text-indigo-300 mb-2">
          <span className={getIntimacyColor(intimacyLevel)}>🔥 Intimacy Level: {intimacyLevel}/10</span>
        </label>
        <input
          type="range"
          min={selectedVariant.intimacyRange[0]}
          max={selectedVariant.intimacyRange[1]}
          value={intimacyLevel}
          onChange={(e) => setIntimacyLevel(parseInt(e.target.value))}
          disabled={isLoading}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Conservative ({selectedVariant.intimacyRange[0]})</span>
          <span>Maximum ({selectedVariant.intimacyRange[1]})</span>
        </div>
      </div>

      {/* Power Dynamic */}
      <div className="mb-5">
        <label className="block text-sm font-semibold text-indigo-300 mb-2">
          {getPowerDynamicIcon(powerDynamic)} Power Dynamic
        </label>
        <div className="grid grid-cols-3 gap-2">
          {(['dominant', 'balanced', 'submissive'] as const).map((dynamic) => (
            <button
              key={dynamic}
              onClick={() => setPowerDynamic(dynamic)}
              disabled={isLoading}
              className={`py-2 px-3 rounded-lg text-sm font-semibold transition-all ${
                powerDynamic === dynamic
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {getPowerDynamicIcon(dynamic)} {dynamic.charAt(0).toUpperCase() + dynamic.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Pose Selection */}
      <div className="mb-5">
        <label className="block text-sm font-semibold text-indigo-300 mb-2">
          🧘 Pose
        </label>
        <select
          value={selectedPose}
          onChange={(e) => setSelectedPose(e.target.value)}
          disabled={isLoading}
          className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-gray-200 text-sm"
        >
          {POSES.map((pose) => (
            <option key={pose} value={pose}>
              {pose.substring(0, 60)}...
            </option>
          ))}
        </select>
      </div>

      {/* Environment Selection */}
      <div className="mb-5">
        <label className="block text-sm font-semibold text-indigo-300 mb-2">
          🏢 Environment
        </label>
        <select
          value={selectedEnvironment}
          onChange={(e) => setSelectedEnvironment(e.target.value)}
          disabled={isLoading}
          className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-gray-200 text-sm"
        >
          {ENVIRONMENTS.map((env) => (
            <option key={env} value={env}>
              {env}
            </option>
          ))}
        </select>
      </div>

      {/* Wardrobe Selection */}
      <div className="mb-5">
        <label className="block text-sm font-semibold text-indigo-300 mb-2">
          👗 Wardrobe
        </label>
        <select
          value={selectedWardrobe}
          onChange={(e) => setSelectedWardrobe(e.target.value)}
          disabled={isLoading}
          className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-gray-200 text-sm"
        >
          {WARDROBES.map((wardrobe) => (
            <option key={wardrobe} value={wardrobe}>
              {wardrobe.substring(0, 70)}...
            </option>
          ))}
        </select>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleGenerate}
          disabled={isLoading}
          className="flex-1 py-3 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:from-gray-700 disabled:to-gray-700 text-white font-bold rounded-lg shadow-lg transition-all transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
        >
          {isLoading ? '⏳ Generating...' : '⚡ Generate Now'}
        </button>

        <button
          onClick={handleMigrate}
          disabled={isLoading}
          className="py-3 px-6 bg-emerald-600 hover:bg-emerald-500 disabled:bg-gray-800 text-white font-semibold rounded-lg transition-all"
        >
          🔄 Migrate
        </button>

        <button
          onClick={() => setShowPreview(!showPreview)}
          disabled={isLoading}
          className="py-3 px-6 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 text-white font-semibold rounded-lg transition-all"
        >
          {showPreview ? '👁️ Hide' : '👁️ Preview'}
        </button>
      </div>

      {/* Prompt Preview */}
      {showPreview && (
        <div className="mt-4 p-4 bg-gray-900/80 rounded-lg border border-indigo-500/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-indigo-300">📝 Generated Prompt Preview</span>
            <span className="text-xs text-gray-500">{previewPrompt().length} characters</span>
          </div>
          <div className="text-xs text-gray-400 font-mono max-h-60 overflow-y-auto bg-black/30 p-3 rounded">
            {previewPrompt()}
          </div>
        </div>
      )}

      {/* Success Info Panel */}
      <div className="mt-5 p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
        <div className="flex gap-2">
          <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <div className="text-xs">
            <p className="text-green-300 font-semibold mb-1">✅ Proven Success Formula</p>
            <ul className="text-green-200/80 space-y-1">
              <li>• Exact structure from 100% working Flux prompt</li>
              <li>• Preserves all punctuation, spacing, and cryptic details</li>
              <li>• Auto-configured with safety_tolerance: 6, raw: true, aspect_ratio: 4:5</li>
              <li>• Intimacy {intimacyLevel}/10 with {powerDynamic} power dynamic</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickCorporateGenerator;
