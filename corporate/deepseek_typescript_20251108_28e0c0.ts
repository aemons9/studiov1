// hooks/useCorporatePower.ts
import { useState, useCallback } from 'react';
import { CorporatePowerState, defaultCorporateState } from '../types/corporate';

export const useCorporatePower = () => {
  const [corporateState, setCorporateState] = useState<CorporatePowerState>(defaultCorporateState);
  const [isCorporateMode, setIsCorporateMode] = useState<boolean>(false);

  const updateCorporateState = useCallback((updates: Partial<CorporatePowerState>) => {
    setCorporateState(prev => ({ ...prev, ...updates }));
  }, []);

  const resetCorporateState = useCallback(() => {
    setCorporateState(defaultCorporateState);
  }, []);

  const toggleCorporateMode = useCallback(() => {
    setIsCorporateMode(prev => !prev);
  }, []);

  return {
    corporateState,
    isCorporateMode,
    updateCorporateState,
    resetCorporateState,
    toggleCorporateMode,
    setIsCorporateMode
  };
};

// Default state definition
export const defaultCorporateState: CorporatePowerState = {
  selectedRole: 'chief_executive',
  selectedEnvironment: 'corporation_mnc',
  intimacyCalibration: {
    level: 6,
    artisticExplicitness: 'suggestive',
    powerDynamic: 'balanced'
  },
  modelVariants: {
    measurements: {
      bust: '38DD',
      waist: '27"',
      hips: '42"'
    },
    skinTone: 'dusky',
    mood: 'authoritative'
  },
  generationSettings: {
    safetyProfile: 'editorial_balanced',
    qualityPreset: 'gallery',
    modelOptimization: 'imagen_office',
    batchGeneration: false,
    styleTransfer: false
  }
};