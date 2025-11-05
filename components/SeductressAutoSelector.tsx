/**
 * SEDUCTRESS AUTO-SELECTOR COMPONENT
 *
 * UI component that allows users to select from 7 progressive intimacy levels
 * for the Seductress Noir concept. Each level automatically configures:
 * - Wardrobe, poses, lighting, camera settings
 * - Nail art, color grading, photographer styles
 * - Complete prompt coordination for consistent results
 */

import React, { useState } from 'react';
import {
  intimacyLevels,
  generateSeductressConceptByIntimacy,
  type IntimacyLevel
} from '../concepts/seductressAutoSelector';
import type { PromptData } from '../types';

interface SeductressAutoSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLevel: (promptData: Partial<PromptData>, levelInfo: IntimacyLevel) => void;
}

export default function SeductressAutoSelector({
  isOpen,
  onClose,
  onSelectLevel
}: SeductressAutoSelectorProps) {
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [baseSubject, setBaseSubject] = useState('Indian Glamour model with dusky skin tone, commanding presence, and expressive eyes perfect for editorial drama (height 5\'8"). Athletic yet curvy figure (bust 36C", waist 26", hips 38") ideal for haute couture. Modern beauty with timeless elegance.');
  const [baseEnvironment, setBaseEnvironment] = useState('Executive noir office at night, floor-to-ceiling windows revealing a glowing city skyline. Sleek modern furniture in black and chrome, dramatic shadows, contemporary luxury. The scene exudes power, sophistication, and urban glamour.');

  if (!isOpen) return null;

  const handleSelectLevel = (level: number) => {
    setSelectedLevel(level);
  };

  const handleApply = () => {
    if (selectedLevel === null) return;

    const levelConfig = intimacyLevels.find(il => il.level === selectedLevel);
    if (!levelConfig) return;

    const generatedPrompt = generateSeductressConceptByIntimacy(
      selectedLevel,
      baseSubject,
      baseEnvironment
    );

    onSelectLevel(generatedPrompt, levelConfig);
    onClose();
  };

  const selectedLevelConfig = selectedLevel !== null
    ? intimacyLevels.find(il => il.level === selectedLevel)
    : null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-6 z-10">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-white">Seductress Noir Auto-Selector</h2>
              <p className="text-gray-400 mt-1 text-sm">
                7 progressive intimacy levels with complete artistic coordination
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white text-2xl leading-none"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Base Configuration */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Base Configuration</h3>
            <p className="text-sm text-gray-400">These settings apply to all levels. Modify if needed:</p>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Subject Description
              </label>
              <textarea
                value={baseSubject}
                onChange={(e) => setBaseSubject(e.target.value)}
                className="w-full bg-gray-700 text-white rounded p-3 text-sm"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Environment Description
              </label>
              <textarea
                value={baseEnvironment}
                onChange={(e) => setBaseEnvironment(e.target.value)}
                className="w-full bg-gray-700 text-white rounded p-3 text-sm"
                rows={3}
              />
            </div>
          </div>

          {/* Intimacy Level Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Select Intimacy Level</h3>
            <div className="grid grid-cols-1 gap-3">
              {intimacyLevels.map((level) => (
                <button
                  key={level.level}
                  onClick={() => handleSelectLevel(level.level)}
                  className={`text-left p-4 rounded-lg border-2 transition-all ${
                    selectedLevel === level.level
                      ? 'border-blue-500 bg-blue-900 bg-opacity-20'
                      : 'border-gray-600 bg-gray-700 hover:border-gray-500'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-bold text-blue-400">
                          {level.level}
                        </span>
                        <div>
                          <h4 className="text-white font-semibold">{level.name}</h4>
                          <p className="text-xs text-gray-400 mt-1">
                            Intimacy Score: {level.intimacyScore}/10
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-300 mt-2">{level.description}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <span className="text-xs px-2 py-1 bg-gray-600 rounded text-gray-200">
                          {level.wardrobe.style}
                        </span>
                        <span className="text-xs px-2 py-1 bg-gray-600 rounded text-gray-200">
                          {level.pose.category}
                        </span>
                        <span className="text-xs px-2 py-1 bg-gray-600 rounded text-gray-200">
                          Coverage: {level.wardrobe.coverage}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Preview */}
          {selectedLevelConfig && (
            <div className="bg-gray-700 rounded-lg p-4 space-y-3">
              <h3 className="text-lg font-semibold text-white">Preview: {selectedLevelConfig.name}</h3>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-400 font-medium">Wardrobe</p>
                  <p className="text-gray-200 text-xs mt-1">{selectedLevelConfig.wardrobe.primary}</p>
                </div>
                <div>
                  <p className="text-gray-400 font-medium">Pose</p>
                  <p className="text-gray-200 text-xs mt-1">{selectedLevelConfig.pose.description}</p>
                </div>
                <div>
                  <p className="text-gray-400 font-medium">Lighting</p>
                  <p className="text-gray-200 text-xs mt-1">{selectedLevelConfig.lighting.setup}</p>
                </div>
                <div>
                  <p className="text-gray-400 font-medium">Camera</p>
                  <p className="text-gray-200 text-xs mt-1">
                    {selectedLevelConfig.camera.focalLength} @ {selectedLevelConfig.camera.aperture}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-400 font-medium">Photographer Style</p>
                  <p className="text-gray-200 text-xs mt-1">{selectedLevelConfig.photographerStyle}</p>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-700">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              disabled={selectedLevel === null}
              className={`px-6 py-2 rounded-lg transition-colors ${
                selectedLevel === null
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-500 text-white'
              }`}
            >
              Apply Selected Level
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
