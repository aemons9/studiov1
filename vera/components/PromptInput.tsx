import React, { useState, useEffect } from 'react';
import { MODEL_ARCHETYPE_GROUPS, ARTISTIC_STYLES, SHOT_TYPES, EXPERIMENTAL_CONCEPTS, INDIAN_GLAMOUR_MODELS, PHOTOGRAPHER_STYLES, ENVIRONMENT_CATEGORIES } from '../constants';
import { ModelIcon, SceneIcon, StyleIcon, SettingsIcon, SparklesIcon } from './Icons';
import { ROLEPLAY_SCENARIOS, RolePlayScenario } from '../rolePlayConcepts';

interface PromptInputProps {
  idea: string;
  setIdea: (idea: string) => void;
  model: string;
  setModel: (model: string) => void;
  environment: string;
  setEnvironment: (env: string) => void;
  wardrobe: string;
  setWardrobe: (wardrobe: string) => void;
  pose: string;
  setPose: (pose: string) => void;
  artisticStyle: string;
  setArtisticStyle: (style: string) => void;
  shotType: string;
  setShotType: (type: string) => void;
  numVariations: number;
  setNumVariations: (num: number) => void;
  experimentalConcept: string;
  setExperimentalConcept: (concept: string) => void;
  photographerStyle: string;
  setPhotographerStyle: (style: string) => void;
  environmentCategory: string;
  setEnvironmentCategory: (category: string) => void;
  wardrobeOptions: string[];
  poseOptions: string[];
  environmentOptions: string[];
  onGenerate: () => void;
  isLoading: boolean;
  isCreativeMode: boolean;
}

const ControlCard: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
  <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-5 flex flex-col gap-4 h-full">
    <h3 className="flex items-center gap-2 font-bold text-lg text-cyan-300">
      {icon}
      <span>{title}</span>
    </h3>
    {children}
  </div>
);

const LabeledSelect: React.FC<{ id: string; label: string; value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; disabled: boolean; children: React.ReactNode; }> = ({ id, label, value, onChange, disabled, children }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-slate-400 mb-1.5">{label}</label>
    <select
      id={id}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="w-full p-2.5 text-red-400 bg-slate-900/70 border-2 border-slate-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed appearance-none cursor-pointer relative z-50 [&>option]:text-red-400 [&>option]:bg-slate-900"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23f87171' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
        backgroundPosition: 'right 0.5rem center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '1.5em 1.5em',
        paddingRight: '2.5rem',
        pointerEvents: 'auto'
      }}
    >
      {children}
    </select>
  </div>
);

const PromptInput: React.FC<PromptInputProps> = ({
  idea, setIdea,
  model, setModel,
  environment, setEnvironment,
  wardrobe, setWardrobe,
  pose, setPose,
  artisticStyle, setArtisticStyle,
  shotType, setShotType,
  numVariations, setNumVariations,
  experimentalConcept, setExperimentalConcept,
  photographerStyle, setPhotographerStyle,
  environmentCategory, setEnvironmentCategory,
  wardrobeOptions, poseOptions, environmentOptions,
  onGenerate, isLoading, isCreativeMode
}) => {
  // Role-Play Mode State
  const [rolePlayMode, setRolePlayMode] = useState<boolean>(false);
  const [selectedScenario, setSelectedScenario] = useState<RolePlayScenario | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(0);

  // Handle scenario selection
  useEffect(() => {
    if (rolePlayMode && selectedScenario) {
      // Auto-fill fields based on scenario
      const matchedModel = INDIAN_GLAMOUR_MODELS.find(m => m.id === selectedScenario.modelId);
      if (matchedModel) {
        setModel(matchedModel.name);
      }
    }
  }, [selectedScenario, rolePlayMode, setModel]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      onGenerate();
    }
  };

  const selectedModelDetails = INDIAN_GLAMOUR_MODELS.find(m => m.name === model);

  let currentArchetypeLabel: string | null = null;
  for (const group of MODEL_ARCHETYPE_GROUPS) {
      if(group.options.some(opt => opt.name === model)) {
          currentArchetypeLabel = group.label;
          break;
      }
  }

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-8">
      <div className="bg-slate-800/40 border border-slate-700 p-5 rounded-xl">
         <label htmlFor="concept-select" className="flex items-center gap-2 text-lg font-bold text-cyan-300 mb-2">
           <SparklesIcon/>
           Generation Mode
         </label>
          <select
            id="concept-select"
            value={experimentalConcept}
            onChange={(e) => setExperimentalConcept(e.target.value)}
            disabled={isLoading}
            className="w-full p-2.5 text-red-400 bg-slate-900/70 border-2 border-slate-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-shadow duration-300 appearance-none cursor-pointer relative z-50 [&>option]:text-red-400 [&>option]:bg-slate-900"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23f87171' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
              backgroundPosition: 'right 0.5rem center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '1.5em 1.5em',
              paddingRight: '2.5rem',
              pointerEvents: 'auto'
            }}
          >
            {EXPERIMENTAL_CONCEPTS.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <p className="text-xs text-slate-500 mt-2">{isCreativeMode ? "Fine-tune your prompt with the creative controls below." : "Experimental mode selected. Creative controls are disabled."}</p>
      </div>

      {/* Role-Play Mode Toggle and Controls */}
      <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-2 border-purple-500/30 p-6 rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <svg className="w-7 h-7 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-bold text-purple-300">🎭 Role-Play Game Mode</h3>
          </div>
          <button
            onClick={() => {
              setRolePlayMode(!rolePlayMode);
              if (!rolePlayMode) {
                setSelectedScenario(null);
                setCurrentStep(0);
              }
            }}
            className={`px-5 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 ${
              rolePlayMode
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            {rolePlayMode ? '✓ Active' : 'Activate'}
          </button>
        </div>

        {rolePlayMode && (
          <div className="space-y-4 mt-4">
            {/* Scenario Selection */}
            <div>
              <label htmlFor="scenario-select" className="block text-sm font-medium text-purple-300 mb-2">
                📖 Choose Your Scenario
              </label>
              <select
                id="scenario-select"
                value={selectedScenario?.id || ''}
                onChange={(e) => {
                  const scenario = ROLEPLAY_SCENARIOS.find(s => s.id === e.target.value);
                  setSelectedScenario(scenario || null);
                  setCurrentStep(0);
                }}
                className="w-full p-3 text-purple-300 bg-slate-900/70 border-2 border-purple-500/30 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 appearance-none cursor-pointer"
              >
                <option value="">-- Select a Scenario --</option>
                {ROLEPLAY_SCENARIOS.map(scenario => (
                  <option key={scenario.id} value={scenario.id}>
                    {scenario.name} ({scenario.theme}) - Intimacy {scenario.intimacyLevel}/10
                  </option>
                ))}
              </select>
            </div>

            {selectedScenario && (
              <div className="bg-slate-900/50 border border-purple-500/20 rounded-lg p-5 space-y-4">
                {/* Scenario Details */}
                <div>
                  <h4 className="text-lg font-bold text-purple-200 mb-2">{selectedScenario.name}</h4>
                  <p className="text-sm text-slate-400 mb-3">{selectedScenario.scenario}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-purple-800/40 text-purple-300 text-xs rounded-full">
                      Model: {selectedScenario.modelName}
                    </span>
                    <span className="px-3 py-1 bg-pink-800/40 text-pink-300 text-xs rounded-full">
                      Difficulty: {selectedScenario.difficultyLevel}
                    </span>
                    <span className="px-3 py-1 bg-red-800/40 text-red-300 text-xs rounded-full">
                      Intimacy: {selectedScenario.intimacyLevel}/10
                    </span>
                  </div>
                </div>

                {/* Progression Steps */}
                <div>
                  <label className="block text-sm font-medium text-purple-300 mb-2">
                    🎯 Story Progression
                  </label>
                  <select
                    value={currentStep}
                    onChange={(e) => setCurrentStep(Number(e.target.value))}
                    className="w-full p-2.5 text-purple-300 bg-slate-900/70 border-2 border-purple-500/30 rounded-lg focus:ring-2 focus:ring-purple-500"
                  >
                    {selectedScenario.gameElements.progressionSteps.map((step, idx) => (
                      <option key={idx} value={idx}>
                        Step {idx + 1}: {step}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Objective */}
                <div className="bg-purple-900/20 border border-purple-500/20 rounded-lg p-3">
                  <p className="text-xs font-semibold text-purple-400 mb-1">📋 Objective:</p>
                  <p className="text-sm text-slate-300">{selectedScenario.gameElements.objective}</p>
                </div>

                {/* Rewards */}
                <div>
                  <p className="text-xs font-semibold text-purple-400 mb-2">🏆 Unlockable Rewards:</p>
                  <ul className="space-y-1">
                    {selectedScenario.gameElements.rewards.map((reward, idx) => (
                      <li key={idx} className="text-xs text-slate-400 flex items-center gap-2">
                        <span className="text-yellow-500">⭐</span> {reward}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Column 1: Model & Wardrobe */}
        <div className="flex flex-col gap-6">
          <ControlCard title="The Muse" icon={<ModelIcon />}>
            <LabeledSelect id="model-select" label="Model Specialist" value={model} onChange={(e) => setModel(e.target.value)} disabled={isLoading || !isCreativeMode}>
              {MODEL_ARCHETYPE_GROUPS.map(group => (
                <optgroup key={group.label} label={group.label}>
                  {group.options.map(m => <option key={m.name} value={m.name}>{m.name}</option>)}
                </optgroup>
              ))}
            </LabeledSelect>
            <LabeledSelect id="wardrobe-select" label="Wardrobe" value={wardrobe} onChange={(e) => setWardrobe(e.target.value)} disabled={isLoading || !isCreativeMode}>
              {wardrobeOptions.map(w => <option key={w} value={w}>{w}</option>)}
            </LabeledSelect>
            <LabeledSelect id="pose-select" label="Base Pose" value={pose} onChange={(e) => setPose(e.target.value)} disabled={isLoading || !isCreativeMode}>
              {poseOptions.map(p => <option key={p} value={p}>{p}</option>)}
            </LabeledSelect>
          </ControlCard>
          {selectedModelDetails && isCreativeMode && (
            <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-5 space-y-3 text-xs">
                <p className="font-bold text-cyan-400 text-sm">{currentArchetypeLabel}</p>
                <h4 className="font-bold text-lg text-slate-100">{selectedModelDetails.name}</h4>
                <p className="text-slate-400 italic">{selectedModelDetails.category}</p>
                <div className="pt-3 border-t border-slate-700 text-slate-300">
                    <p><strong className="text-slate-100">Traits:</strong> H: {selectedModelDetails.physicalTraits.height}, M: {selectedModelDetails.physicalTraits.bust}-{selectedModelDetails.physicalTraits.waist}-{selectedModelDetails.physicalTraits.hips}</p>
                    <p><strong className="text-slate-100">Skin:</strong> {selectedModelDetails.physicalTraits.skinTone}</p>
                </div>
            </div>
           )}
        </div>
        
        {/* Column 2: Scene & Style */}
        <div className="flex flex-col gap-6">
          <ControlCard title="The Scene" icon={<SceneIcon />}>
            <LabeledSelect id="environment-category-select" label="Environment Category" value={environmentCategory} onChange={(e) => setEnvironmentCategory(e.target.value)} disabled={isLoading || !isCreativeMode}>
              <option value="All">All Categories</option>
              {Object.keys(ENVIRONMENT_CATEGORIES).map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </LabeledSelect>
            <LabeledSelect id="environment-select" label="Specific Environment" value={environment} onChange={(e) => setEnvironment(e.target.value)} disabled={isLoading || !isCreativeMode}>
              {environmentOptions.map(e => <option key={e} value={e}>{e}</option>)}
            </LabeledSelect>
          </ControlCard>
          <ControlCard title="Artistic Direction" icon={<StyleIcon />}>
            <LabeledSelect id="photographer-select" label="Photographer Style" value={photographerStyle} onChange={(e) => setPhotographerStyle(e.target.value)} disabled={isLoading || !isCreativeMode}>
              <option value="None">None (Use Artistic Style)</option>
              {PHOTOGRAPHER_STYLES.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </LabeledSelect>
            <LabeledSelect id="style-select" label="Artistic Style" value={artisticStyle} onChange={(e) => setArtisticStyle(e.target.value)} disabled={isLoading || !isCreativeMode || photographerStyle !== 'None'}>
              {ARTISTIC_STYLES.map(group => (
                <optgroup key={group.label} label={group.label}>
                  {group.options.map(s => <option key={s} value={s}>{s}</option>)}
                </optgroup>
              ))}
            </LabeledSelect>
            <LabeledSelect id="shot-type-select" label="Primary Shot Type" value={shotType} onChange={(e) => setShotType(e.target.value)} disabled={isLoading || !isCreativeMode}>
              {SHOT_TYPES.map(s => <option key={s} value={s}>{s}</option>)}
            </LabeledSelect>
          </ControlCard>
        </div>

        {/* Column 3: Settings */}
        <div className="flex flex-col gap-6">
          <ControlCard title="Technical Settings" icon={<SettingsIcon />}>
            <LabeledSelect id="variations-select" label="Number of Variations" value={String(numVariations)} onChange={(e) => setNumVariations(Number(e.target.value))} disabled={isLoading}>
              <option value={3}>3 Prompts</option>
              <option value={5}>5 Prompts</option>
              <option value={7}>7 Prompts</option>
            </LabeledSelect>
          </ControlCard>
        </div>
      </div>
      
      <div className="relative mt-2">
        <label htmlFor="idea-textarea" className="block text-lg font-bold text-cyan-300 mb-2">Describe the Core Action or Scene</label>
        <div className="relative">
            <textarea
              id="idea-textarea"
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="e.g., 'walking slowly toward the camera', 'adjusting her dress', 'looking out a window at the rain'..."
              className="w-full h-32 p-4 pr-48 text-lg text-slate-200 bg-slate-900/70 border-2 border-slate-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300 resize-none placeholder:text-slate-500"
              disabled={isLoading}
            />
            <button
              onClick={onGenerate}
              disabled={isLoading || !idea.trim()}
              className="absolute top-1/2 right-4 -translate-y-1/2 px-6 py-3 text-base font-semibold text-white bg-gradient-to-r from-cyan-500 to-teal-600 rounded-lg hover:from-cyan-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-500 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed transition-all duration-300 transform active:scale-95 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30"
            >
              {isLoading ? 'Generating...' : 'Architect Prompts'}
            </button>
        </div>
      </div>
    </div>
  );
};

export default PromptInput;