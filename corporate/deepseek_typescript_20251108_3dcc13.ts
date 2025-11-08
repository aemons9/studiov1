// components/corporate/CorporatePowerSelector.tsx
import React from 'react';
import { CorporatePowerState, CorporateRole, OfficeEnvironmentType } from '../../types/corporate';

interface CorporatePowerSelectorProps {
  corporateState: CorporatePowerState;
  onCorporateStateChange: (state: CorporatePowerState) => void;
  isLoading: boolean;
}

export const CorporatePowerSelector: React.FC<CorporatePowerSelectorProps> = ({
  corporateState,
  onCorporateStateChange,
  isLoading
}) => {
  const handleRoleChange = (role: CorporateRole) => {
    onCorporateStateChange({
      ...corporateState,
      selectedRole: role
    });
  };

  const handleEnvironmentChange = (environment: OfficeEnvironmentType) => {
    onCorporateStateChange({
      ...corporateState,
      selectedEnvironment: environment
    });
  };

  const handleIntimacyChange = (level: number) => {
    onCorporateStateChange({
      ...corporateState,
      intimacyCalibration: {
        ...corporateState.intimacyCalibration,
        level
      }
    });
  };

  const handleExplicitnessChange = (explicitness: ArtisticExplicitness) => {
    onCorporateStateChange({
      ...corporateState,
      intimacyCalibration: {
        ...corporateState.intimacyCalibration,
        artisticExplicitness: explicitness
      }
    });
  };

  return (
    <div className="corporate-power-selector bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h3 className="text-xl font-bold text-white mb-4">Corporate Power Configuration</h3>
      
      {/* Role Selection Grid */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-gray-300 mb-3">Corporate Role</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {CORPORATE_ROLES.map(role => (
            <button
              key={role.role}
              onClick={() => handleRoleChange(role.role)}
              disabled={isLoading}
              className={`p-3 rounded-lg border-2 transition-all ${
                corporateState.selectedRole === role.role
                  ? 'border-indigo-500 bg-indigo-900/20 text-white'
                  : 'border-gray-600 bg-gray-700/50 text-gray-300 hover:border-gray-500'
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className="text-sm font-medium capitalize">
                {role.role.replace('_', ' ')}
              </div>
              <div className="text-xs text-gray-400 mt-1">
                Power: {role.powerLevel}/10
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Environment Selection */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-gray-300 mb-3">Office Environment</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {OFFICE_ENVIRONMENTS.map(environment => (
            <button
              key={environment.type}
              onClick={() => handleEnvironmentChange(environment.type)}
              disabled={isLoading}
              className={`p-3 rounded-lg border-2 transition-all ${
                corporateState.selectedEnvironment === environment.type
                  ? 'border-emerald-500 bg-emerald-900/20 text-white'
                  : 'border-gray-600 bg-gray-700/50 text-gray-300 hover:border-gray-500'
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className="text-sm font-medium capitalize">
                {environment.type.replace('_', ' ')}
              </div>
              <div className="text-xs text-gray-400 mt-1">
                Luxury: {environment.luxuryLevel}/10
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Intimacy Calibration */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-gray-300 mb-3">Intimacy Calibration</h4>
        
        {/* Intimacy Level Slider */}
        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">
            Intimacy Level: {corporateState.intimacyCalibration.level}/10
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={corporateState.intimacyCalibration.level}
            onChange={(e) => handleIntimacyChange(parseInt(e.target.value))}
            disabled={isLoading}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Minimal</span>
            <span>Balanced</span>
            <span>Explicit</span>
          </div>
        </div>

        {/* Artistic Explicitness Selector */}
        <div className="grid grid-cols-4 gap-2">
          {(['minimal', 'suggestive', 'revealing', 'artistically_explicit'] as ArtisticExplicitness[]).map(level => (
            <button
              key={level}
              onClick={() => handleExplicitnessChange(level)}
              disabled={isLoading}
              className={`p-2 rounded text-sm transition-all ${
                corporateState.intimacyCalibration.artisticExplicitness === level
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {level.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Power Dynamic Selector */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-gray-300 mb-3">Power Dynamic</h4>
        <div className="grid grid-cols-3 gap-3">
          {(['submissive', 'balanced', 'dominant'] as PowerDynamic[]).map(dynamic => (
            <button
              key={dynamic}
              onClick={() => handlePowerDynamicChange(dynamic)}
              disabled={isLoading}
              className={`p-3 rounded-lg border-2 transition-all ${
                corporateState.intimacyCalibration.powerDynamic === dynamic
                  ? 'border-orange-500 bg-orange-900/20 text-white'
                  : 'border-gray-600 bg-gray-700/50 text-gray-300 hover:border-gray-500'
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className="text-sm font-medium capitalize">
                {dynamic}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};