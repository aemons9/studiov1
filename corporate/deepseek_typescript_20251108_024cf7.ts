// components/corporate/CorporatePreview.tsx
import React, { useState, useEffect } from 'react';
import { CorporatePowerState } from '../../types/corporate';
import { CorporatePromptEngine } from '../../engines/CorporatePromptEngine';

interface CorporatePreviewProps {
  corporateState: CorporatePowerState;
  basePrompt: string;
}

export const CorporatePreview: React.FC<CorporatePreviewProps> = ({
  corporateState,
  basePrompt
}) => {
  const [enhancedPrompt, setEnhancedPrompt] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  useEffect(() => {
    const generatePreview = async () => {
      if (!corporateState.selectedRole || !corporateState.selectedEnvironment) {
        return;
      }

      setIsGenerating(true);
      try {
        const engine = new CorporatePromptEngine();
        const preview = await engine.generateCorporatePrompt(corporateState);
        setEnhancedPrompt(preview);
      } catch (error) {
        console.error('Preview generation failed:', error);
        setEnhancedPrompt(basePrompt);
      } finally {
        setIsGenerating(false);
      }
    };

    const timeoutId = setTimeout(generatePreview, 500);
    return () => clearTimeout(timeoutId);
  }, [corporateState, basePrompt]);

  return (
    <div className="corporate-preview bg-gray-800 rounded-lg p-4 border border-gray-700">
      <h4 className="text-lg font-semibold text-white mb-3">Corporate Prompt Preview</h4>
      
      {isGenerating ? (
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
          <span className="ml-3 text-gray-400">Generating corporate preview...</span>
        </div>
      ) : (
        <div className="prompt-preview bg-gray-900 rounded p-4 max-h-60 overflow-y-auto">
          <pre className="text-sm text-gray-300 whitespace-pre-wrap">
            {enhancedPrompt || basePrompt}
          </pre>
        </div>
      )}
      
      <div className="mt-3 text-xs text-gray-500">
        Role: {corporateState.selectedRole} | 
        Environment: {corporateState.selectedEnvironment} | 
        Intimacy: {corporateState.intimacyCalibration.level}/10
      </div>
    </div>
  );
};