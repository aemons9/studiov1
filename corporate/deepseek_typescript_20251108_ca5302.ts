// components/corporate/CorporateGenerationControl.tsx
import React from 'react';
import { CorporatePowerState } from '../../types/corporate';

interface CorporateGenerationControlProps {
  corporateState: CorporatePowerState;
  onCorporateGenerate: (options: CorporateGenerateOptions) => void;
  isLoading: boolean;
  generationStep: string | null;
}

export interface CorporateGenerateOptions {
  batchMode: boolean;
  styleTransfer: boolean;
  qualityBoost: boolean;
  safetyLevel: 'conservative' | 'balanced' | 'progressive';
}

export const CorporateGenerationControl: React.FC<CorporateGenerationControlProps> = ({
  corporateState,
  onCorporateGenerate,
  isLoading,
  generationStep
}) => {
  const handleGenerate = (options: CorporateGenerateOptions) => {
    onCorporateGenerate(options);
  };

  const handleQuickGenerate = () => {
    handleGenerate({
      batchMode: false,
      styleTransfer: false,
      qualityBoost: true,
      safetyLevel: 'balanced'
    });
  };

  const handleBatchGenerate = () => {
    handleGenerate({
      batchMode: true,
      styleTransfer: true,
      qualityBoost: true,
      safetyLevel: 'balanced'
    });
  };

  return (
    <div className="corporate-generation-control bg-gray-800 rounded-lg p-4 border border-gray-700">
      <h4 className="text-lg font-semibold text-white mb-3">Corporate Generation</h4>
      
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Quick Generate */}
        <button
          onClick={handleQuickGenerate}
          disabled={isLoading || !corporateState.selectedRole}
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2"
        >
          {isLoading && generationStep === 'corporate_generating' ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Generating...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Generate Corporate
            </>
          )}
        </button>

        {/* Batch Generate */}
        <button
          onClick={handleBatchGenerate}
          disabled={isLoading}
          className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Batch Generate
        </button>
      </div>

      {/* Generation Status */}
      {generationStep && (
        <div className="mt-3 p-2 bg-gray-700 rounded text-sm text-gray-300">
          <div className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
            <span>Step: {generationStep.replace('_', ' ')}</span>
          </div>
        </div>
      )}

      {/* Configuration Summary */}
      <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-gray-400">
        <div>Role: <span className="text-white">{corporateState.selectedRole || 'None'}</span></div>
        <div>Environment: <span className="text-white">{corporateState.selectedEnvironment || 'None'}</span></div>
        <div>Intimacy: <span className="text-white">{corporateState.intimacyCalibration.level}/10</span></div>
        <div>Style: <span className="text-white">{corporateState.intimacyCalibration.artisticExplicitness}</span></div>
      </div>
    </div>
  );
};