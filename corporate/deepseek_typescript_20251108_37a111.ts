// components/corporate/CorporateBatchGenerator.tsx
import React, { useState } from 'react';
import { CorporatePowerState, CORPORATE_ROLES, OFFICE_ENVIRONMENTS } from '../../types/corporate';

interface CorporateBatchGeneratorProps {
  corporateState: CorporatePowerState;
  onBatchGenerate: (configs: CorporatePowerState[]) => void;
  isLoading: boolean;
}

export const CorporateBatchGenerator: React.FC<CorporateBatchGeneratorProps> = ({
  corporateState,
  onBatchGenerate,
  isLoading
}) => {
  const [selectedRoles, setSelectedRoles] = useState<Set<CorporateRole>>(new Set());
  const [selectedEnvironments, setSelectedEnvironments] = useState<Set<OfficeEnvironmentType>>(new Set());

  const toggleRole = (role: CorporateRole) => {
    setSelectedRoles(prev => {
      const newSet = new Set(prev);
      if (newSet.has(role)) {
        newSet.delete(role);
      } else {
        newSet.add(role);
      }
      return newSet;
    });
  };

  const toggleEnvironment = (environment: OfficeEnvironmentType) => {
    setSelectedEnvironments(prev => {
      const newSet = new Set(prev);
      if (newSet.has(environment)) {
        newSet.delete(environment);
      } else {
        newSet.add(environment);
      }
      return newSet;
    });
  };

  const handleGenerateBatch = () => {
    const configs: CorporatePowerState[] = [];
    
    selectedRoles.forEach(role => {
      selectedEnvironments.forEach(environment => {
        configs.push({
          ...corporateState,
          selectedRole: role,
          selectedEnvironment: environment
        });
      });
    });

    if (configs.length > 0) {
      onBatchGenerate(configs);
    }
  };

  const totalCombinations = selectedRoles.size * selectedEnvironments.size;

  return (
    <div className="corporate-batch-generator bg-gray-800 rounded-lg p-4 border border-gray-700">
      <h4 className="text-lg font-semibold text-white mb-3">Batch Generation</h4>
      
      {/* Role Selection */}
      <div className="mb-4">
        <h5 className="text-sm font-medium text-gray-300 mb-2">Select Roles</h5>
        <div className="grid grid-cols-2 gap-2">
          {CORPORATE_ROLES.map(role => (
            <button
              key={role.role}
              onClick={() => toggleRole(role.role)}
              disabled={isLoading}
              className={`p-2 rounded text-sm transition-all ${
                selectedRoles.has(role.role)
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {role.role.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Environment Selection */}
      <div className="mb-4">
        <h5 className="text-sm font-medium text-gray-300 mb-2">Select Environments</h5>
        <div className="grid grid-cols-2 gap-2">
          {OFFICE_ENVIRONMENTS.map(environment => (
            <button
              key={environment.type}
              onClick={() => toggleEnvironment(environment.type)}
              disabled={isLoading}
              className={`p-2 rounded text-sm transition-all ${
                selectedEnvironments.has(environment.type)
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {environment.type.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Batch Control */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-400">
          {totalCombinations} combination{totalCombinations !== 1 ? 's' : ''}
        </div>
        
        <button
          onClick={handleGenerateBatch}
          disabled={isLoading || totalCombinations === 0}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:from-gray-600 disabled:to-gray-600 text-white font-semibold py-2 px-4 rounded transition-all"
        >
          {isLoading ? 'Generating...' : 'Generate Batch'}
        </button>
      </div>
    </div>
  );
};