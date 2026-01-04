/**
 * GenerationControlsPanel - Unified generation controls for all modes
 * Includes: Intimacy, Safety Filter, Person Generation, Strategy Selector
 */

import React, { useState } from 'react';
import IntimacyController from './IntimacyController';
import SafetyBypassStrategySelector from './SafetyBypassStrategySelector';
import type { SafetyBypassStrategy, ImageProvider } from '../types';

export type AspectRatioOption = '1:1' | '4:5' | '3:4' | '9:16' | '16:9';

export interface GenerationControlsState {
  intimacyLevel: number;
  safetySetting: 'block_few' | 'block_some' | 'block_most';
  personGeneration: 'allow_all' | 'allow_adult' | 'dont_allow';
  safetyBypassStrategy: SafetyBypassStrategy;
  provider: ImageProvider;
  fluxSafetyTolerance: number;
  aspectRatio: AspectRatioOption;
}

interface GenerationControlsPanelProps {
  settings: GenerationControlsState;
  onChange: (settings: GenerationControlsState) => void;
  disabled?: boolean;
  showIntimacy?: boolean;
  showSafetyFilter?: boolean;
  showPersonGeneration?: boolean;
  showStrategy?: boolean;
  showProvider?: boolean;
  showFluxTolerance?: boolean;
  showAspectRatio?: boolean;
  compact?: boolean;
  colorTheme?: 'purple' | 'pink' | 'blue' | 'teal' | 'cyan';
}

// Aspect ratio options with Instagram compatibility info
const ASPECT_RATIO_OPTIONS: { value: AspectRatioOption; label: string; description: string; instagram: boolean }[] = [
  { value: '1:1', label: '1:1 Square', description: 'Instagram Feed (Recommended)', instagram: true },
  { value: '4:5', label: '4:5 Portrait', description: 'Instagram Feed Portrait', instagram: true },
  { value: '3:4', label: '3:4 Portrait', description: 'Classic Portrait', instagram: true },
  { value: '9:16', label: '9:16 Stories', description: 'Instagram Stories/Reels', instagram: true },
  { value: '16:9', label: '16:9 Landscape', description: 'Widescreen/Video', instagram: false },
];

const GenerationControlsPanel: React.FC<GenerationControlsPanelProps> = ({
  settings,
  onChange,
  disabled = false,
  showIntimacy = true,
  showSafetyFilter = true,
  showPersonGeneration = true,
  showStrategy = true,
  showProvider = true,
  showFluxTolerance = true,
  showAspectRatio = true,
  compact = false,
  colorTheme = 'purple'
}) => {
  const [expanded, setExpanded] = useState(!compact);

  const themeColors = {
    purple: { border: 'border-purple-500/30', bg: 'bg-purple-900/20', text: 'text-purple-300', accent: 'purple' },
    pink: { border: 'border-pink-500/30', bg: 'bg-pink-900/20', text: 'text-pink-300', accent: 'pink' },
    blue: { border: 'border-blue-500/30', bg: 'bg-blue-900/20', text: 'text-blue-300', accent: 'blue' },
    teal: { border: 'border-teal-500/30', bg: 'bg-teal-900/20', text: 'text-teal-300', accent: 'teal' },
    cyan: { border: 'border-cyan-500/30', bg: 'bg-cyan-900/20', text: 'text-cyan-300', accent: 'cyan' }
  };

  const theme = themeColors[colorTheme];

  const updateSetting = <K extends keyof GenerationControlsState>(
    key: K,
    value: GenerationControlsState[K]
  ) => {
    onChange({ ...settings, [key]: value });
  };

  const renderCompactHeader = () => (
    <button
      onClick={() => setExpanded(!expanded)}
      className={`w-full flex items-center justify-between p-4 rounded-lg ${theme.bg} border ${theme.border} transition-all hover:opacity-90`}
    >
      <div className="flex items-center gap-3">
        <svg className={`w-5 h-5 ${theme.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
        <span className={`font-semibold ${theme.text}`}>Generation Controls</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex gap-2 text-xs text-gray-400">
          <span>Intimacy: {settings.intimacyLevel}</span>
          <span>|</span>
          <span>{settings.aspectRatio}</span>
          <span>|</span>
          <span>{settings.provider === 'vertex-ai' ? 'Imagen' : 'Flux'}</span>
        </div>
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform ${expanded ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </button>
  );

  const renderControls = () => (
    <div className={`space-y-6 ${compact && expanded ? 'mt-4' : ''}`}>
      {/* Row 1: Intimacy + Provider */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Intimacy Controller */}
        {showIntimacy && (
          <div className={`p-4 rounded-lg ${theme.bg} border ${theme.border}`}>
            <IntimacyController
              level={settings.intimacyLevel}
              onLevelChange={(level) => updateSetting('intimacyLevel', level)}
              disabled={disabled}
            />
          </div>
        )}

        {/* Provider Selection */}
        {showProvider && (
          <div className={`p-4 rounded-lg ${theme.bg} border ${theme.border}`}>
            <label className={`block font-semibold ${theme.text} mb-3`}>
              Generation Provider
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => updateSetting('provider', 'vertex-ai')}
                disabled={disabled}
                className={`p-3 rounded-lg border-2 transition-all ${
                  settings.provider === 'vertex-ai'
                    ? 'border-indigo-500 bg-indigo-500/20 text-white'
                    : 'border-gray-600 bg-gray-800/50 text-gray-300 hover:border-indigo-500/50'
                } disabled:opacity-50`}
              >
                <div className="text-lg mb-1">Imagen 4</div>
                <div className="text-xs text-gray-400">Vertex AI</div>
              </button>
              <button
                onClick={() => updateSetting('provider', 'replicate-flux')}
                disabled={disabled}
                className={`p-3 rounded-lg border-2 transition-all ${
                  settings.provider === 'replicate-flux'
                    ? 'border-orange-500 bg-orange-500/20 text-white'
                    : 'border-gray-600 bg-gray-800/50 text-gray-300 hover:border-orange-500/50'
                } disabled:opacity-50`}
              >
                <div className="text-lg mb-1">Flux</div>
                <div className="text-xs text-gray-400">Replicate</div>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Row 2: Aspect Ratio */}
      {showAspectRatio && (
        <div className={`p-4 rounded-lg ${theme.bg} border ${theme.border}`}>
          <label className={`block font-semibold ${theme.text} mb-3`}>
            Aspect Ratio
            <span className="ml-2 text-xs font-normal text-green-400">(Instagram-Ready)</span>
          </label>
          <div className="grid grid-cols-5 gap-2">
            {ASPECT_RATIO_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => updateSetting('aspectRatio', option.value)}
                disabled={disabled}
                className={`p-3 rounded-lg border-2 transition-all text-center ${
                  settings.aspectRatio === option.value
                    ? option.instagram
                      ? 'border-green-500 bg-green-500/20 text-white'
                      : 'border-blue-500 bg-blue-500/20 text-white'
                    : 'border-gray-600 bg-gray-800/50 text-gray-300 hover:border-gray-500'
                } disabled:opacity-50`}
              >
                <div className="text-sm font-medium">{option.label.split(' ')[0]}</div>
                <div className="text-xs text-gray-400 mt-1">{option.label.split(' ')[1]}</div>
                {option.instagram && settings.aspectRatio === option.value && (
                  <div className="text-xs text-green-400 mt-1">✓ IG</div>
                )}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-gray-400">
            {ASPECT_RATIO_OPTIONS.find(o => o.value === settings.aspectRatio)?.description || 'Select aspect ratio'}
          </p>
        </div>
      )}

      {/* Row 3: Safety Filter + Person Generation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Safety Filter */}
        {showSafetyFilter && (
          <div className={`p-4 rounded-lg ${theme.bg} border ${theme.border}`}>
            <label className={`block font-semibold ${theme.text} mb-3`}>
              Safety Filter Level
            </label>
            <select
              value={settings.safetySetting}
              onChange={(e) => updateSetting('safetySetting', e.target.value as any)}
              disabled={disabled}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-gray-200 focus:border-purple-500 focus:outline-none disabled:opacity-50"
            >
              <option value="block_few">Block Few (Most Permissive)</option>
              <option value="block_some">Block Some (Balanced)</option>
              <option value="block_most">Block Most (Strictest)</option>
            </select>
            <p className="mt-2 text-xs text-gray-400">
              {settings.safetySetting === 'block_few' && 'Minimal content filtering - allows most artistic content'}
              {settings.safetySetting === 'block_some' && 'Moderate filtering - balanced approach'}
              {settings.safetySetting === 'block_most' && 'Maximum filtering - strictest content policy'}
            </p>
          </div>
        )}

        {/* Person Generation */}
        {showPersonGeneration && (
          <div className={`p-4 rounded-lg ${theme.bg} border ${theme.border}`}>
            <label className={`block font-semibold ${theme.text} mb-3`}>
              Person Generation
            </label>
            <select
              value={settings.personGeneration}
              onChange={(e) => updateSetting('personGeneration', e.target.value as any)}
              disabled={disabled}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-gray-200 focus:border-purple-500 focus:outline-none disabled:opacity-50"
            >
              <option value="allow_all">Allow All (Full Freedom)</option>
              <option value="allow_adult">Allow Adult Only</option>
              <option value="dont_allow">Don't Allow</option>
            </select>
            <p className="mt-2 text-xs text-gray-400">
              {settings.personGeneration === 'allow_all' && 'Generate any person type'}
              {settings.personGeneration === 'allow_adult' && 'Only generate adult subjects'}
              {settings.personGeneration === 'dont_allow' && 'No person generation'}
            </p>
          </div>
        )}
      </div>

      {/* Row 3: Flux Safety Tolerance (when Flux selected) */}
      {showFluxTolerance && settings.provider === 'replicate-flux' && (
        <div className={`p-4 rounded-lg ${theme.bg} border ${theme.border}`}>
          <label className={`block font-semibold ${theme.text} mb-3`}>
            Flux Safety Tolerance: {settings.fluxSafetyTolerance}/6
          </label>
          <input
            type="range"
            min="1"
            max="6"
            value={settings.fluxSafetyTolerance}
            onChange={(e) => updateSetting('fluxSafetyTolerance', parseInt(e.target.value))}
            disabled={disabled}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-orange-500 disabled:opacity-50"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-2">
            <span>1 - Strict</span>
            <span>3 - Balanced</span>
            <span>6 - Maximum</span>
          </div>
          <p className="mt-2 text-xs text-gray-400">
            Higher values allow more permissive content generation with Flux models.
          </p>
        </div>
      )}

      {/* Row 4: Safety Bypass Strategy (for Vertex AI) */}
      {showStrategy && settings.provider === 'vertex-ai' && (
        <SafetyBypassStrategySelector
          strategy={settings.safetyBypassStrategy}
          onChange={(strategy) => updateSetting('safetyBypassStrategy', strategy)}
        />
      )}
    </div>
  );

  if (compact) {
    return (
      <div className="w-full">
        {renderCompactHeader()}
        {expanded && (
          <div className={`p-4 rounded-lg ${theme.bg} border ${theme.border} border-t-0 rounded-t-none`}>
            {renderControls()}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`p-6 rounded-xl ${theme.bg} border ${theme.border}`}>
      <div className="flex items-center gap-3 mb-6">
        <svg className={`w-6 h-6 ${theme.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
        <h2 className={`text-xl font-bold ${theme.text}`}>Generation Controls</h2>
      </div>
      {renderControls()}
    </div>
  );
};

export default GenerationControlsPanel;

// Export default settings for easy initialization
export const defaultGenerationControls: GenerationControlsState = {
  intimacyLevel: 7,
  safetySetting: 'block_few',
  personGeneration: 'allow_adult',
  safetyBypassStrategy: 'auto',
  provider: 'vertex-ai',
  fluxSafetyTolerance: 5,
  aspectRatio: '1:1' // Instagram-compatible square format
};
