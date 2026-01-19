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
    value: 'meeranuke',
    label: 'MeeraNuke 💎',
    description: 'Ultimate fail-proof strategy: Nuclear translation + Vera2 safe language + Ultra optimizer + Meera model lock. Works with ALL providers (Imagen, Flux, ImagineArt). 99%+ success.',
    icon: '💎',
    color: 'pink'
  },
  {
    value: 'recursive',
    label: 'Recursive Prompting (RLM) 🔄',
    description: 'MIT CSAIL-inspired strategy: Decomposes prompts into components (subject, pose, wardrobe, environment, lighting) via sub-LM calls. Each component optimized individually with safe language, then synthesized. Adaptive refinement on failure. Best for complex intimate prompts.',
    icon: '🔄',
    color: 'cyan'
  },
  {
    value: 'rlm-meeranuke',
    label: 'RLM+MeeraNuke 🔄💎',
    description: 'Hybrid ultimate: RLM component decomposition + MeeraNuke strategy (Nuclear translation + Vera2 safe language + Meera model lock). The absolute most powerful generation strategy available.',
    icon: '💎',
    color: 'pink'
  },
  {
    value: 'ultra-rlm',
    label: 'Ultra RLM 🔄💎✨',
    description: 'Enhanced recursive prompting with hyper-detailed components. Uses proven quality patterns: exact measurements (37DD-27"-40"), master photographer references (Helmut Newton, Irving Penn), camera specs (Hasselblad X2D 100C), realistic skin texture (visible pores, vellus hair). Matches crystalline-exclusive quality. BEST for 10+ intimacy masterpieces.',
    icon: '✨',
    color: 'pink'
  },
  {
    value: 'rlm-nuclear-imagen',
    label: 'RLM+Nuclear Imagen 🔄🔥',
    description: 'Hybrid: RLM component decomposition + Nuclear translation bypass (FR/IT/ES/DE) for Imagen 4. Combines recursive prompting with translation strategies.',
    icon: '🔥',
    color: 'red'
  },
  {
    value: 'rlm-vera2',
    label: 'RLM+Vera2 🔄🚀',
    description: 'Hybrid: RLM component decomposition + Vera2 safe language mapping. Combines recursive prompting with euphemistic translations for blocked terms.',
    icon: '🚀',
    color: 'emerald'
  },
  {
    value: 'rlm-vera',
    label: 'RLM+Vera ✨🔄',
    description: 'Hybrid: RLM component decomposition + Vera Art Directors Declaration and quality optimization. Combines recursive prompting with professional framing.',
    icon: '✨',
    color: 'purple'
  },
  {
    value: 'vera2',
    label: 'Vera Strategy 2 🚀',
    description: 'Adaptive failure-proof engine with safe language mapping - 95%+ success rate at any intimacy level (RECOMMENDED)',
    icon: '🚀',
    color: 'emerald'
  },
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
    value: 'verastrategy',
    label: 'Vera Strategy ✨',
    description: 'Advanced Imagen 4 prompt optimization with cultural sensitivity and quality triggers (Vera mode technique)',
    icon: '✨',
    color: 'purple'
  },
  {
    value: 'ultraoptimizer',
    label: 'Ultra Optimizer 🎨',
    description: 'Sophisticated prompt engineering with Art Directors Declaration, quality triggers, and structured optimization (main mode technique)',
    icon: '🎨',
    color: 'cyan'
  },
  {
    value: 'aggressive',
    label: 'Aggressive',
    description: 'All strategies including Flux fallback with high tolerance (5/6)',
    icon: '⚡',
    color: 'orange'
  },
  {
    value: 'nuclear-imagen',
    label: 'Nuclear Imagen 🔥',
    description: 'Skip pre-screening, direct to Translation + Imagen 4 (max bypass, no Flux)',
    icon: '🔥',
    color: 'red'
  },
  {
    value: 'nuclear',
    label: 'Nuclear Flux ☢️',
    description: 'Skip all, direct to Translation + Flux max tolerance (6/6)',
    icon: '☢️',
    color: 'red'
  },
  {
    value: 'lucidorigin',
    label: 'Lucid Origin 🎨',
    description: 'Leonardo AI style-based artistic optimization. Use fashion/cinematic/moody styles with detailed prompts (LOCATION, LIGHTING, WARDROBE, POSE, MOOD). 83% intimate success.',
    icon: '🎨',
    color: 'orange'
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
            pink: isSelected ? 'bg-pink-500/20 border-pink-500' : 'border-gray-700 hover:border-pink-500/50',
            emerald: isSelected ? 'bg-emerald-500/20 border-emerald-500' : 'border-gray-700 hover:border-emerald-500/50',
            blue: isSelected ? 'bg-blue-500/20 border-blue-500' : 'border-gray-700 hover:border-blue-500/50',
            green: isSelected ? 'bg-green-500/20 border-green-500' : 'border-gray-700 hover:border-green-500/50',
            yellow: isSelected ? 'bg-yellow-500/20 border-yellow-500' : 'border-gray-700 hover:border-yellow-500/50',
            purple: isSelected ? 'bg-purple-500/20 border-purple-500' : 'border-gray-700 hover:border-purple-500/50',
            cyan: isSelected ? 'bg-cyan-500/20 border-cyan-500' : 'border-gray-700 hover:border-cyan-500/50',
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
              <li><strong>MeeraNuke:</strong> <span className="text-pink-300">Ultimate: Translation + Vera2 Safe Language + Ultra Optimizer + Meera Lock → ALL Providers</span></li>
              <li><strong>Recursive (RLM):</strong> <span className="text-cyan-300">Decompose prompt → Sub-LM components (Gemini) → Synthesize → Adaptive refinement → Imagen 4</span></li>
              <li><strong>RLM+MeeraNuke:</strong> <span className="text-pink-300">HYBRID: RLM decomposition → MeeraNuke ultimate strategy (most powerful)</span></li>
              <li><strong>RLM+Nuclear-Imagen:</strong> <span className="text-red-300">HYBRID: RLM decomposition → Nuclear translation bypass (FR/IT/ES/DE)</span></li>
              <li><strong>RLM+Vera2:</strong> <span className="text-emerald-300">HYBRID: RLM decomposition → Vera2 safe language mapping</span></li>
              <li><strong>RLM+Vera:</strong> <span className="text-purple-300">HYBRID: RLM decomposition → Vera Art Directors optimization</span></li>
              <li><strong>Auto:</strong> NL API → Gemini Rewrite → Imagen 4 → Translation → Flux</li>
              <li><strong>Conservative:</strong> Gemini rewrite → Imagen 4 only</li>
              <li><strong>Balanced:</strong> + Translation API (FR/IT/ES/DE) → Imagen 4</li>
              <li><strong>Vera Strategy:</strong> Advanced Imagen 4 prompt optimization (quality triggers + cultural sensitivity)</li>
              <li><strong>Ultra Optimizer:</strong> Art Directors Declaration + Structured prompt engineering + Quality presets</li>
              <li><strong>Aggressive:</strong> + Flux API fallback (safety 5/6)</li>
              <li><strong>Nuclear Imagen:</strong> Translation (FR/IT/ES/DE) → Imagen 4 (no Flux)</li>
              <li><strong>Nuclear Flux:</strong> Translation (FR/IT/ES/DE) → Flux max (6/6)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetyBypassStrategySelector;
