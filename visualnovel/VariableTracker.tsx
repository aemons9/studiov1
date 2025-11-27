import React from 'react';
import { GameVariables } from './chapterOneExpandedScenes';

// ============================================================================
// TYPES
// ============================================================================

interface VariableTrackerProps {
  variables: GameVariables;
  showDetailed?: boolean;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

interface VariableDisplayProps {
  label: string;
  value: number;
  min: number;
  max: number;
  color: string;
  icon: string;
  description?: string;
}

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

const VariableGauge: React.FC<VariableDisplayProps> = ({
  label,
  value,
  min,
  max,
  color,
  icon,
  description
}) => {
  // Calculate percentage (handle negative values properly)
  const range = max - min;
  const normalizedValue = value - min;
  const percentage = Math.max(0, Math.min(100, (normalizedValue / range) * 100));

  // Get status text and color intensity
  const getStatusInfo = () => {
    if (label === 'Trust') {
      if (value >= 15) return { text: 'Strong', intensity: 'high' };
      if (value >= 5) return { text: 'Growing', intensity: 'medium' };
      if (value >= -5) return { text: 'Neutral', intensity: 'low' };
      if (value >= -15) return { text: 'Strained', intensity: 'low' };
      return { text: 'Broken', intensity: 'critical' };
    } else {
      if (value >= 80) return { text: 'Excellent', intensity: 'high' };
      if (value >= 60) return { text: 'Good', intensity: 'medium' };
      if (value >= 40) return { text: 'Moderate', intensity: 'low' };
      if (value >= 20) return { text: 'Low', intensity: 'low' };
      return { text: 'Poor', intensity: 'critical' };
    }
  };

  const status = getStatusInfo();

  return (
    <div className="mb-3">
      {/* Label Row */}
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <span className="text-base" aria-label={label}>{icon}</span>
          <span className="text-sm font-semibold text-white tracking-wide">{label}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs font-medium ${
            status.intensity === 'high' ? 'text-green-400' :
            status.intensity === 'medium' ? 'text-yellow-400' :
            status.intensity === 'low' ? 'text-orange-400' :
            'text-red-400'
          }`}>
            {status.text}
          </span>
          <span className="text-sm font-bold text-white tabular-nums">
            {value}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative h-2 bg-gray-800/80 rounded-full overflow-hidden backdrop-blur-sm border border-gray-700/50">
        {/* Background Glow */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `linear-gradient(90deg, ${color}00 0%, ${color} 50%, ${color}00 100%)`,
            animation: 'pulse 3s ease-in-out infinite'
          }}
        />

        {/* Progress Fill */}
        <div
          className="h-full transition-all duration-700 ease-out relative"
          style={{
            width: `${percentage}%`,
            background: `linear-gradient(90deg, ${color}cc, ${color})`,
            boxShadow: `0 0 10px ${color}80`
          }}
        >
          {/* Shine Effect */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
              animation: 'shine 2s ease-in-out infinite'
            }}
          />
        </div>

        {/* Center Marker for Trust (0 position) */}
        {label === 'Trust' && (
          <div
            className="absolute top-0 bottom-0 w-px bg-white/40"
            style={{ left: `${((0 - min) / range) * 100}%` }}
          />
        )}
      </div>

      {/* Description (if provided) */}
      {description && (
        <p className="text-xs text-gray-400 mt-1 leading-tight">{description}</p>
      )}
    </div>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const VariableTracker: React.FC<VariableTrackerProps> = ({
  variables,
  showDetailed = false,
  position = 'top-right'
}) => {
  // Position classes
  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-24 right-4',
    'bottom-left': 'bottom-24 left-4'
  };

  return (
    <div className={`fixed ${positionClasses[position]} z-40 pointer-events-none`}>
      <div className="bg-black/75 backdrop-blur-md border border-purple-500/30 rounded-xl shadow-2xl p-4 min-w-[280px] max-w-[320px] pointer-events-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-purple-500/20">
          <h3 className="text-sm font-bold text-purple-300 tracking-wide uppercase">
            Relationship
          </h3>
          {variables.selectedMode && (
            <span className="text-xs px-2 py-1 rounded-full bg-purple-600/40 text-purple-200 border border-purple-500/30 capitalize">
              {variables.selectedMode}
            </span>
          )}
        </div>

        {/* Variable Gauges */}
        <div className="space-y-3">
          <VariableGauge
            label="Comfort"
            value={variables.ZaraComfort}
            min={0}
            max={100}
            color="#ec4899" // Pink
            icon="💗"
            description={showDetailed ? "Zara's emotional safety and confidence" : undefined}
          />

          <VariableGauge
            label="Trust"
            value={variables.Trust}
            min={-20}
            max={30}
            color="#8b5cf6" // Purple
            icon="🤝"
            description={showDetailed ? "Depth of professional and personal connection" : undefined}
          />

          <VariableGauge
            label="Cohesion"
            value={variables.ArtisticCohesion}
            min={0}
            max={100}
            color="#06b6d4" // Cyan
            icon="🎨"
            description={showDetailed ? "Stylistic unity of the portfolio" : undefined}
          />
        </div>

        {/* Footer Info (if detailed mode) */}
        {showDetailed && (
          <div className="mt-3 pt-3 border-t border-purple-500/20">
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>Current Scene</span>
              <span className="text-purple-300 font-mono">
                {variables.currentScene.replace('scene_', 'S').replace(/_/g, ' ').toUpperCase()}
              </span>
            </div>
            {variables.Flag_ArtNudeUsed && (
              <div className="mt-2 text-xs text-pink-400 flex items-center gap-1">
                <span>✨</span>
                <span>Artistic Content Unlocked</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes shine {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(200%); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
};

// ============================================================================
// MINIMAL VERSION - For Less Intrusive Display
// ============================================================================

export const VariableTrackerMinimal: React.FC<VariableTrackerProps> = ({
  variables,
  position = 'top-right'
}) => {
  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-24 right-4',
    'bottom-left': 'bottom-24 left-4'
  };

  const getColorForValue = (value: number, min: number, max: number) => {
    const range = max - min;
    const normalized = (value - min) / range;

    if (normalized >= 0.7) return 'text-green-400';
    if (normalized >= 0.4) return 'text-yellow-400';
    if (normalized >= 0.2) return 'text-orange-400';
    return 'text-red-400';
  };

  return (
    <div className={`fixed ${positionClasses[position]} z-40 pointer-events-none`}>
      <div className="bg-black/60 backdrop-blur-sm border border-purple-500/20 rounded-lg shadow-xl px-3 py-2 flex items-center gap-4 pointer-events-auto">
        {/* Comfort */}
        <div className="flex items-center gap-1 text-xs">
          <span>💗</span>
          <span className={`font-bold tabular-nums ${getColorForValue(variables.ZaraComfort, 0, 100)}`}>
            {variables.ZaraComfort}
          </span>
        </div>

        {/* Trust */}
        <div className="flex items-center gap-1 text-xs">
          <span>🤝</span>
          <span className={`font-bold tabular-nums ${getColorForValue(variables.Trust, -20, 30)}`}>
            {variables.Trust > 0 ? '+' : ''}{variables.Trust}
          </span>
        </div>

        {/* Cohesion */}
        <div className="flex items-center gap-1 text-xs">
          <span>🎨</span>
          <span className={`font-bold tabular-nums ${getColorForValue(variables.ArtisticCohesion, 0, 100)}`}>
            {variables.ArtisticCohesion}
          </span>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// VARIABLE CHANGE NOTIFICATION - Shows when variables change
// ============================================================================

interface VariableChangeNotificationProps {
  label: string;
  oldValue: number;
  newValue: number;
  icon: string;
  onComplete?: () => void;
}

export const VariableChangeNotification: React.FC<VariableChangeNotificationProps> = ({
  label,
  oldValue,
  newValue,
  icon,
  onComplete
}) => {
  const change = newValue - oldValue;
  const isPositive = change > 0;

  React.useEffect(() => {
    const timer = setTimeout(() => {
      onComplete?.();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed top-1/4 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none animate-fade-in-down">
      <div className={`px-6 py-3 rounded-xl shadow-2xl border-2 ${
        isPositive
          ? 'bg-green-600/90 border-green-400'
          : 'bg-red-600/90 border-red-400'
      } backdrop-blur-md`}>
        <div className="flex items-center gap-3 text-white">
          <span className="text-2xl">{icon}</span>
          <div>
            <p className="text-sm font-semibold">{label}</p>
            <p className="text-lg font-bold tabular-nums">
              {isPositive ? '+' : ''}{change}
              <span className="text-xs ml-2 opacity-80">({oldValue} → {newValue})</span>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in-down {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          10% {
            opacity: 1;
            transform: translateY(0);
          }
          90% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(10px);
          }
        }

        .animate-fade-in-down {
          animation: fade-in-down 3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

// ============================================================================
// EXPORTS
// ============================================================================

export default VariableTracker;

// Helper hook for managing variable changes with notifications
export const useVariableTracking = (initialVariables: GameVariables) => {
  const [variables, setVariables] = React.useState<GameVariables>(initialVariables);
  const [notification, setNotification] = React.useState<{
    label: string;
    oldValue: number;
    newValue: number;
    icon: string;
  } | null>(null);

  const updateVariable = (
    key: 'ZaraComfort' | 'Trust' | 'ArtisticCohesion',
    newValue: number,
    showNotification: boolean = true
  ) => {
    const oldValue = variables[key];

    if (oldValue !== newValue && showNotification) {
      const icons = {
        ZaraComfort: '💗',
        Trust: '🤝',
        ArtisticCohesion: '🎨'
      };

      const labels = {
        ZaraComfort: 'Comfort',
        Trust: 'Trust',
        ArtisticCohesion: 'Artistic Cohesion'
      };

      setNotification({
        label: labels[key],
        oldValue,
        newValue,
        icon: icons[key]
      });

      // Auto-clear notification after display
      setTimeout(() => setNotification(null), 3000);
    }

    setVariables(prev => ({
      ...prev,
      [key]: newValue
    }));
  };

  const applyEffects = (effects: Partial<GameVariables>, showNotifications: boolean = true) => {
    Object.entries(effects).forEach(([key, value]) => {
      if (key === 'ZaraComfort' || key === 'Trust' || key === 'ArtisticCohesion') {
        updateVariable(key, value as number, showNotifications);
      } else {
        setVariables(prev => ({ ...prev, [key]: value as any }));
      }
    });
  };

  return {
    variables,
    setVariables,
    updateVariable,
    applyEffects,
    notification,
    clearNotification: () => setNotification(null)
  };
};
