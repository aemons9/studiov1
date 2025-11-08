// components/CorporateInterface.tsx
import React from 'react';
import { CorporatePowerState, CorporateGenerateOptions } from '../types/corporate';
import { CorporatePowerSelector } from './corporate/CorporatePowerSelector';
import { CorporatePreview } from './corporate/CorporatePreview';
import { CorporateGenerationControl } from './corporate/CorporateGenerationControl';
import { CorporateBatchGenerator } from './corporate/CorporateBatchGenerator';

interface CorporateInterfaceProps {
  corporateState: CorporatePowerState;
  onCorporateStateChange: (state: CorporatePowerState) => void;
  onCorporateGenerate: (options: CorporateGenerateOptions) => void;
  onBatchGenerate: (configs: CorporatePowerState[]) => void;
  isLoading: boolean;
  generatedImages: any[] | null;
  basePrompt?: string;
}

export const CorporateInterface: React.FC<CorporateInterfaceProps> = ({
  corporateState,
  onCorporateStateChange,
  onCorporateGenerate,
  onBatchGenerate,
  isLoading,
  generatedImages,
  basePrompt = ''
}) => {
  return (
    <div className="corporate-interface p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-2">
          Corporate Power & Sensuality Generator
        </h1>
        <p className="text-gray-400">
          Create sophisticated corporate-themed artistic imagery with master-level quality
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column - Configuration */}
        <div className="xl:col-span-2 space-y-6">
          <CorporatePowerSelector
            corporateState={corporateState}
            onCorporateStateChange={onCorporateStateChange}
            isLoading={isLoading}
          />
          
          <CorporatePreview
            corporateState={corporateState}
            basePrompt={basePrompt}
          />

          <CorporateBatchGenerator
            corporateState={corporateState}
            onBatchGenerate={onBatchGenerate}
            isLoading={isLoading}
          />
        </div>

        {/* Right Column - Generation & Results */}
        <div className="space-y-6">
          <CorporateGenerationControl
            corporateState={corporateState}
            onCorporateGenerate={onCorporateGenerate}
            isLoading={isLoading}
            generationStep={null}
          />

          {/* Results Preview */}
          {generatedImages && generatedImages.length > 0 && (
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <h4 className="text-lg font-semibold text-white mb-3">
                Generation Results ({generatedImages.length})
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {generatedImages.slice(0, 4).map((image, index) => (
                  <img
                    key={index}
                    src={image.url}
                    alt={`Corporate generation ${index + 1}`}
                    className="w-full h-24 object-cover rounded border border-gray-600"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};