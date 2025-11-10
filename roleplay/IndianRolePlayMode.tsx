import React, { useState } from 'react';
import { ROLEPLAY_SCENARIOS, getRolePlayScenarioById, type RolePlayScenario } from './rolePlayConcepts';
import { EROTIC_GLAMOUR_MODELS } from '../concepts/eroticGlamourModels';

interface IndianRolePlayModeProps {
  onGenerate: (prompt: string, settings: any) => void;
  onMigrateToMain: (prompt: string) => void;
  onExit: () => void;
}

const IndianRolePlayMode: React.FC<IndianRolePlayModeProps> = ({ onGenerate, onMigrateToMain, onExit }) => {
  const [selectedScenario, setSelectedScenario] = useState<RolePlayScenario | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [unlockedRewards, setUnlockedRewards] = useState<string[]>([]);
  const [customizations, setCustomizations] = useState({
    pose: 'Standing intimate pose with seductive confidence',
    wardrobe: 'Minimal luxury designer aesthetic with strategic reveals',
    angle: 'Eye level intimate perspective',
    framing: 'Medium shot emphasizing curves and presence'
  });

  const handleScenarioSelect = (scenario: RolePlayScenario) => {
    setSelectedScenario(scenario);
    setCurrentStep(0);
    setCompletedSteps([]);
  };

  const handleStepComplete = () => {
    if (selectedScenario) {
      const newCompleted = [...completedSteps, currentStep];
      setCompletedSteps(newCompleted);

      // Unlock reward if all steps completed
      if (newCompleted.length === selectedScenario.gameElements.progressionSteps.length) {
        setUnlockedRewards([...unlockedRewards, ...selectedScenario.gameElements.rewards]);
      }

      // Move to next step
      if (currentStep < selectedScenario.gameElements.progressionSteps.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handleGenerate = () => {
    if (!selectedScenario) return;

    // Replace placeholders in template with customizations
    let finalPrompt = selectedScenario.promptTemplate
      .replace('{ROLEPLAY_POSE}', customizations.pose)
      .replace('{ROLEPLAY_WARDROBE}', customizations.wardrobe)
      .replace('{ROLEPLAY_ANGLE}', customizations.angle)
      .replace('{ROLEPLAY_FRAMING}', customizations.framing);

    const settings = {
      aspectRatio: selectedScenario.aspectRatio,
      intimacyLevel: selectedScenario.intimacyLevel,
      fluxSafetyTolerance: selectedScenario.safetyTolerance,
      provider: 'replicate-flux'
    };

    onGenerate(finalPrompt, settings);
  };

  const getDifficultyColor = (difficulty: RolePlayScenario['difficultyLevel']) => {
    switch (difficulty) {
      case 'beginner': return '#10B981';
      case 'intermediate': return '#F59E0B';
      case 'advanced': return '#F97316';
      case 'expert': return '#EF4444';
    }
  };

  const getProgressPercentage = () => {
    if (!selectedScenario) return 0;
    return (completedSteps.length / selectedScenario.gameElements.progressionSteps.length) * 100;
  };

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      backgroundColor: '#0A0118',
      color: '#F3F4F6',
      backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(147, 51, 234, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)'
    }}>
      {/* Header */}
      <div style={{
        padding: '20px 32px',
        backgroundColor: 'rgba(30, 10, 50, 0.8)',
        backdropFilter: 'blur(10px)',
        borderBottom: '2px solid rgba(147, 51, 234, 0.3)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '32px' }}>🎭</span>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, background: 'linear-gradient(135deg, #F472B6 0%, #C084FC 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Indian Role-Play Mode
            </h1>
            <p style={{ fontSize: '14px', color: '#D1D5DB', margin: '4px 0 0 0' }}>
              Gamified Midnight Encounter Experiences
            </p>
          </div>
        </div>

        <button
          onClick={onExit}
          style={{
            padding: '10px 20px',
            backgroundColor: 'rgba(239, 68, 68, 0.2)',
            border: '1px solid #EF4444',
            borderRadius: '8px',
            color: '#FCA5A5',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '600'
          }}
        >
          ← Exit Role-Play Mode
        </button>
      </div>

      <div style={{ display: 'flex', height: 'calc(100vh - 84px)' }}>
        {/* Left Panel - Scenario Selection */}
        <div style={{
          width: '380px',
          backgroundColor: 'rgba(15, 5, 30, 0.6)',
          borderRight: '1px solid rgba(147, 51, 234, 0.2)',
          overflowY: 'auto',
          padding: '20px'
        }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px', color: '#C084FC' }}>
            📜 Select Scenario
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {ROLEPLAY_SCENARIOS.map((scenario) => (
              <div
                key={scenario.id}
                onClick={() => handleScenarioSelect(scenario)}
                style={{
                  padding: '16px',
                  backgroundColor: selectedScenario?.id === scenario.id ? 'rgba(147, 51, 234, 0.3)' : 'rgba(30, 10, 50, 0.5)',
                  border: selectedScenario?.id === scenario.id ? '2px solid #9333EA' : '1px solid rgba(147, 51, 234, 0.2)',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#F3F4F6', margin: 0 }}>
                    {scenario.name}
                  </h3>
                  <span style={{
                    padding: '4px 8px',
                    backgroundColor: getDifficultyColor(scenario.difficultyLevel) + '33',
                    color: getDifficultyColor(scenario.difficultyLevel),
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: 'bold',
                    textTransform: 'uppercase'
                  }}>
                    {scenario.difficultyLevel}
                  </span>
                </div>

                <p style={{ fontSize: '12px', color: '#9CA3AF', margin: '8px 0' }}>
                  {scenario.theme}
                </p>

                <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                  <span style={{ fontSize: '12px', color: '#F472B6' }}>
                    ❤️ Intimacy {scenario.intimacyLevel}/10
                  </span>
                  <span style={{ fontSize: '12px', color: '#A78BFA' }}>
                    {scenario.modelName}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Center Panel - Main Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '32px' }}>
          {!selectedScenario ? (
            <div style={{ textAlign: 'center', paddingTop: '100px' }}>
              <span style={{ fontSize: '64px', display: 'block', marginBottom: '20px' }}>🎭</span>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#C084FC', marginBottom: '12px' }}>
                Select a Scenario to Begin
              </h2>
              <p style={{ color: '#9CA3AF', fontSize: '16px' }}>
                Choose from 9 midnight role-playing encounters on the left
              </p>
            </div>
          ) : (
            <>
              {/* Progress Bar */}
              <div style={{ marginBottom: '32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: '#F472B6' }}>
                    Scene Progress
                  </span>
                  <span style={{ fontSize: '14px', color: '#9CA3AF' }}>
                    {completedSteps.length} / {selectedScenario.gameElements.progressionSteps.length} Steps
                  </span>
                </div>
                <div style={{
                  width: '100%',
                  height: '8px',
                  backgroundColor: 'rgba(147, 51, 234, 0.2)',
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${getProgressPercentage()}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg, #F472B6 0%, #C084FC 100%)',
                    transition: 'width 0.3s'
                  }} />
                </div>
              </div>

              {/* Scenario Details */}
              <div style={{
                padding: '24px',
                backgroundColor: 'rgba(30, 10, 50, 0.5)',
                borderRadius: '16px',
                border: '1px solid rgba(147, 51, 234, 0.3)',
                marginBottom: '24px'
              }}>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '12px', color: '#F3F4F6' }}>
                  {selectedScenario.name}
                </h2>
                <p style={{ fontSize: '14px', color: '#D1D5DB', lineHeight: '1.6', marginBottom: '16px' }}>
                  {selectedScenario.scenario}
                </p>

                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  <div style={{ padding: '8px 16px', backgroundColor: 'rgba(147, 51, 234, 0.2)', borderRadius: '8px' }}>
                    <span style={{ fontSize: '12px', color: '#C084FC' }}>
                      📍 {selectedScenario.environment}
                    </span>
                  </div>
                  <div style={{ padding: '8px 16px', backgroundColor: 'rgba(236, 72, 153, 0.2)', borderRadius: '8px' }}>
                    <span style={{ fontSize: '12px', color: '#F472B6' }}>
                      🎬 {selectedScenario.theme}
                    </span>
                  </div>
                </div>
              </div>

              {/* Progression Steps */}
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px', color: '#C084FC' }}>
                  🎯 Scene Progression
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {selectedScenario.gameElements.progressionSteps.map((step, index) => (
                    <div
                      key={index}
                      style={{
                        padding: '16px',
                        backgroundColor: completedSteps.includes(index) ? 'rgba(34, 197, 94, 0.2)' : index === currentStep ? 'rgba(236, 72, 153, 0.2)' : 'rgba(30, 10, 50, 0.3)',
                        border: completedSteps.includes(index) ? '2px solid #22C55E' : index === currentStep ? '2px solid #F472B6' : '1px solid rgba(147, 51, 234, 0.2)',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                      }}
                    >
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: completedSteps.includes(index) ? '#22C55E' : index === currentStep ? '#F472B6' : 'rgba(147, 51, 234, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        color: '#FFF'
                      }}>
                        {completedSteps.includes(index) ? '✓' : index + 1}
                      </div>
                      <span style={{ fontSize: '14px', color: '#F3F4F6' }}>
                        {step}
                      </span>
                    </div>
                  ))}
                </div>

                {!completedSteps.includes(currentStep) && (
                  <button
                    onClick={handleStepComplete}
                    style={{
                      marginTop: '16px',
                      padding: '12px 24px',
                      backgroundColor: '#F472B6',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#FFF',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '600',
                      width: '100%'
                    }}
                  >
                    ✓ Complete Current Step
                  </button>
                )}
              </div>

              {/* Customization Panel */}
              <div style={{
                padding: '20px',
                backgroundColor: 'rgba(30, 10, 50, 0.5)',
                borderRadius: '12px',
                border: '1px solid rgba(147, 51, 234, 0.3)',
                marginBottom: '24px'
              }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px', color: '#C084FC' }}>
                  🎨 Customize Scene
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ fontSize: '12px', color: '#9CA3AF', display: 'block', marginBottom: '8px' }}>
                      Pose Style:
                    </label>
                    <input
                      type="text"
                      value={customizations.pose}
                      onChange={(e) => setCustomizations({ ...customizations, pose: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px',
                        backgroundColor: 'rgba(15, 5, 30, 0.6)',
                        border: '1px solid rgba(147, 51, 234, 0.3)',
                        borderRadius: '8px',
                        color: '#F3F4F6',
                        fontSize: '14px'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '12px', color: '#9CA3AF', display: 'block', marginBottom: '8px' }}>
                      Wardrobe:
                    </label>
                    <input
                      type="text"
                      value={customizations.wardrobe}
                      onChange={(e) => setCustomizations({ ...customizations, wardrobe: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px',
                        backgroundColor: 'rgba(15, 5, 30, 0.6)',
                        border: '1px solid rgba(147, 51, 234, 0.3)',
                        borderRadius: '8px',
                        color: '#F3F4F6',
                        fontSize: '14px'
                      }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ fontSize: '12px', color: '#9CA3AF', display: 'block', marginBottom: '8px' }}>
                        Camera Angle:
                      </label>
                      <select
                        value={customizations.angle}
                        onChange={(e) => setCustomizations({ ...customizations, angle: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '10px',
                          backgroundColor: 'rgba(15, 5, 30, 0.6)',
                          border: '1px solid rgba(147, 51, 234, 0.3)',
                          borderRadius: '8px',
                          color: '#F3F4F6',
                          fontSize: '14px'
                        }}
                      >
                        <option value="Eye level intimate perspective">Eye Level</option>
                        <option value="Low angle looking up emphasizing power">Low Angle (Power)</option>
                        <option value="Elevated looking down creating intimacy">High Angle (Intimate)</option>
                        <option value="Side profile perspective">Side Profile</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ fontSize: '12px', color: '#9CA3AF', display: 'block', marginBottom: '8px' }}>
                        Framing:
                      </label>
                      <select
                        value={customizations.framing}
                        onChange={(e) => setCustomizations({ ...customizations, framing: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '10px',
                          backgroundColor: 'rgba(15, 5, 30, 0.6)',
                          border: '1px solid rgba(147, 51, 234, 0.3)',
                          borderRadius: '8px',
                          color: '#F3F4F6',
                          fontSize: '14px'
                        }}
                      >
                        <option value="Full body emphasizing complete form">Full Body</option>
                        <option value="Medium shot bust to thigh">Medium Shot</option>
                        <option value="Close intimate portrait">Close Portrait</option>
                        <option value="Wide environmental context">Wide Scene</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={handleGenerate}
                  style={{
                    flex: 1,
                    padding: '16px',
                    background: 'linear-gradient(135deg, #F472B6 0%, #C084FC 100%)',
                    border: 'none',
                    borderRadius: '12px',
                    color: '#FFF',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: 'bold'
                  }}
                >
                  🎬 Generate Scene
                </button>

                <button
                  onClick={() => onMigrateToMain(selectedScenario.promptTemplate)}
                  style={{
                    padding: '16px 24px',
                    backgroundColor: 'rgba(99, 102, 241, 0.2)',
                    border: '1px solid #6366F1',
                    borderRadius: '12px',
                    color: '#A5B4FC',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}
                >
                  📋 To Main Mode
                </button>
              </div>
            </>
          )}
        </div>

        {/* Right Panel - Game Elements */}
        <div style={{
          width: '320px',
          backgroundColor: 'rgba(15, 5, 30, 0.6)',
          borderLeft: '1px solid rgba(147, 51, 234, 0.2)',
          overflowY: 'auto',
          padding: '20px'
        }}>
          {selectedScenario && (
            <>
              {/* Objective */}
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '12px', color: '#F472B6' }}>
                  🎯 Mission Objective
                </h3>
                <p style={{ fontSize: '13px', color: '#D1D5DB', lineHeight: '1.5' }}>
                  {selectedScenario.gameElements.objective}
                </p>
              </div>

              {/* Challenges */}
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '12px', color: '#F59E0B' }}>
                  ⚡ Challenges
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {selectedScenario.gameElements.challenges.map((challenge, index) => (
                    <div
                      key={index}
                      style={{
                        padding: '10px',
                        backgroundColor: 'rgba(251, 146, 60, 0.1)',
                        border: '1px solid rgba(251, 146, 60, 0.3)',
                        borderRadius: '8px',
                        fontSize: '12px',
                        color: '#FCD34D'
                      }}
                    >
                      • {challenge}
                    </div>
                  ))}
                </div>
              </div>

              {/* Rewards */}
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '12px', color: '#10B981' }}>
                  🏆 Rewards
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {selectedScenario.gameElements.rewards.map((reward, index) => (
                    <div
                      key={index}
                      style={{
                        padding: '10px',
                        backgroundColor: unlockedRewards.includes(reward) ? 'rgba(34, 197, 94, 0.2)' : 'rgba(16, 185, 129, 0.1)',
                        border: unlockedRewards.includes(reward) ? '1px solid #22C55E' : '1px solid rgba(16, 185, 129, 0.3)',
                        borderRadius: '8px',
                        fontSize: '12px',
                        color: unlockedRewards.includes(reward) ? '#6EE7B7' : '#86EFAC',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      <span>{unlockedRewards.includes(reward) ? '✓' : '🔒'}</span>
                      <span>{reward}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div style={{ marginTop: '24px', padding: '16px', backgroundColor: 'rgba(99, 102, 241, 0.1)', borderRadius: '12px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '12px', color: '#A5B4FC' }}>
                  📊 Session Stats
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px', color: '#D1D5DB' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Completed Steps:</span>
                    <span style={{ fontWeight: 'bold', color: '#F472B6' }}>{completedSteps.length}/{selectedScenario.gameElements.progressionSteps.length}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Unlocked Rewards:</span>
                    <span style={{ fontWeight: 'bold', color: '#10B981' }}>{unlockedRewards.length}/{selectedScenario.gameElements.rewards.length}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Difficulty:</span>
                    <span style={{ fontWeight: 'bold', color: getDifficultyColor(selectedScenario.difficultyLevel), textTransform: 'uppercase' }}>
                      {selectedScenario.difficultyLevel}
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default IndianRolePlayMode;
