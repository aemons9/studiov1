import React from 'react';
import type { SafetyBypassStrategy } from '../types';

interface SafetyBypassStrategySelectorProps {
  strategy: SafetyBypassStrategy;
  onChange: (strategy: SafetyBypassStrategy) => void;
}

const STRATEGIES: Array<{
  value: SafetyBypassStrategy;
  label: string;
  description: string;
  icon: string;
  color: string;
}> = [
  {
    value: 'auto',
    label: 'Auto (Smart Cascade)',
    description: 'Tries all strategies automatically - best success rate (~75% at intimacy 8-10)',
    icon: '🤖',
    color: 'blue'
  },
  {
    value: 'conservative',
    label: 'Conservative',
    description: 'Imagen 4 only with Gemini rewrite, no translation or Flux fallback',
    icon: '🛡️',
    color: 'green'
  },
  {
    value: 'balanced',
    label: 'Balanced',
    description: 'Imagen 4 + Gemini rewrite + Translation bypass if blocked (recommended)',
    icon: '⚖️',
    color: 'yellow'
  },
  {
    value: 'aggressive',
    label: 'Aggressive',
    description: 'All strategies including Flux fallback with high tolerance (5/6)',
    icon: '⚡',
    color: 'orange'
  },
  {
    value: 'nuclear',
    label: 'Nuclear ☢️',
    description: 'Skip Imagen 4, direct to Translation + Flux max tolerance (6/6)',
    icon: '☢️',
    color: 'red'
  }
];

const SafetyBypassStrategySelector: React.FC<SafetyBypassStrategySelectorProps> = ({
  strategy,
  onChange
}) => {
  return (
    <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
      <div className="flex items-center gap-2 mb-3">
        <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
        <h3 className="text-lg font-semibold text-gray-200">Safety Bypass Strategy</h3>
      </div>

      <p className="text-sm text-gray-400 mb-4">
        Choose how aggressively to bypass AI safety filters for <strong className="text-purple-400">Imagen 4 (Vertex AI)</strong> generation. Higher strategies use more techniques to maximize success rate.
      </p>

      <div className="space-y-2">
        {STRATEGIES.map((s) => {
          const isSelected = strategy === s.value;
          const colorClasses = {
            blue: isSelected ? 'bg-blue-500/20 border-blue-500' : 'border-gray-700 hover:border-blue-500/50',
            green: isSelected ? 'bg-green-500/20 border-green-500' : 'border-gray-700 hover:border-green-500/50',
            yellow: isSelected ? 'bg-yellow-500/20 border-yellow-500' : 'border-gray-700 hover:border-yellow-500/50',
            orange: isSelected ? 'bg-orange-500/20 border-orange-500' : 'border-gray-700 hover:border-orange-500/50',
            red: isSelected ? 'bg-red-500/20 border-red-500' : 'border-gray-700 hover:border-red-500/50',
          };

          return (
            <button
              key={s.value}
              onClick={() => onChange(s.value)}
              className={`w-full text-left p-3 rounded-lg border-2 transition-all ${colorClasses[s.color]}`}
            >
              <div className="flex items-start gap-3">
                <div className="text-2xl mt-0.5">{s.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-200">{s.label}</span>
                    {isSelected && (
                      <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <p className="text-sm text-gray-400 mt-1">{s.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-4 p-3 bg-purple-900/20 border border-purple-500/30 rounded-lg">
        <div className="flex gap-2">
          <svg className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <div className="text-sm">
            <p className="text-purple-300 font-semibold mb-1">How it works with Imagen 4:</p>
            <ul className="text-purple-200/80 space-y-1 text-xs">
              <li><strong>Auto:</strong> NL API → Gemini Rewrite → Imagen 4 → Translation → Flux</li>
              <li><strong>Conservative:</strong> Gemini rewrite → Imagen 4 only</li>
              <li><strong>Balanced:</strong> + Translation API (FR/IT/ES/DE) → Imagen 4</li>
              <li><strong>Aggressive:</strong> + Flux API fallback (safety 5/6)</li>
              <li><strong>Nuclear:</strong> Skip Imagen 4, direct to Translation + Flux (6/6)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetyBypassStrategySelector;
