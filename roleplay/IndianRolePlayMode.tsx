import React, { useState } from 'react';
import { EROTIC_GLAMOUR_MODELS } from '../concepts/eroticGlamourModels';

interface IndianRolePlayModeProps {
  onGenerate: (prompt: string, settings: any) => void;
  onMigrateToMain: (prompt: string) => void;
  onExit: () => void;
}

const IndianRolePlayMode: React.FC<IndianRolePlayModeProps> = ({ onGenerate, onMigrateToMain, onExit }) => {
  const [selectedModelId, setSelectedModelId] = useState<string | null>(null);
  const [selectedWardrobe, setSelectedWardrobe] = useState<any | null>(null);
  const [selectedPose, setSelectedPose] = useState<any | null>(null);
  const [selectedEnvironment, setSelectedEnvironment] = useState<any | null>(null);
  const [intimacyLevel, setIntimacyLevel] = useState<number>(10);
  const [hoveredModel, setHoveredModel] = useState<string | null>(null);

  const selectedModel = EROTIC_GLAMOUR_MODELS.find(m => m.id === selectedModelId);

  // Quick selection helpers
  const handleRandomModel = () => {
    const randomModel = EROTIC_GLAMOUR_MODELS[Math.floor(Math.random() * EROTIC_GLAMOUR_MODELS.length)];
    setSelectedModelId(randomModel.id);
    setSelectedWardrobe(null);
    setSelectedPose(null);
    setSelectedEnvironment(randomModel.environments?.[0] || null);
  };

  const handleRandomCombination = () => {
    if (!selectedModel) {
      alert('Please select a model first');
      return;
    }

    const randomWardrobe = selectedModel.wardrobeCollection?.[Math.floor(Math.random() * selectedModel.wardrobeCollection.length)];
    const randomPose = selectedModel.poseGallery?.[Math.floor(Math.random() * selectedModel.poseGallery.length)];
    const randomEnv = selectedModel.environments?.[Math.floor(Math.random() * selectedModel.environments.length)];

    setSelectedWardrobe(randomWardrobe);
    setSelectedPose(randomPose);
    setSelectedEnvironment(randomEnv);
  };

  const handleQuickGenerate = () => {
    // Randomly select everything and generate
    const randomModel = EROTIC_GLAMOUR_MODELS[Math.floor(Math.random() * EROTIC_GLAMOUR_MODELS.length)];
    const randomWardrobe = randomModel.wardrobeCollection?.[Math.floor(Math.random() * randomModel.wardrobeCollection.length)];
    const randomPose = randomModel.poseGallery?.[Math.floor(Math.random() * randomModel.poseGallery.length)];
    const randomEnv = randomModel.environments?.[Math.floor(Math.random() * randomModel.environments.length)];

    setSelectedModelId(randomModel.id);
    setSelectedWardrobe(randomWardrobe);
    setSelectedPose(randomPose);
    setSelectedEnvironment(randomEnv);

    // Generate after a brief delay to show selections
    setTimeout(() => {
      if (randomWardrobe && randomPose && randomEnv) {
        const prompt = generatePromptWithSelections(randomModel, randomWardrobe, randomPose, randomEnv);
        const settings = {
          aspectRatio: randomPose.aspectRatio || '4:5',
          intimacyLevel: intimacyLevel,
          fluxSafetyTolerance: randomModel.personalPhotographer.fluxSettings.safetyTolerance,
          provider: 'replicate-flux'
        };
        onGenerate(prompt, settings);
      }
    }, 500);
  };

  const generatePromptWithSelections = (model: any, wardrobe: any, pose: any, environment: any) => {
    const photographer = model.personalPhotographer;

    return `Midnight role-playing photography. Intimacy ${intimacyLevel}/10. ${photographer.style}.

subject: variant: Elite Indian artistic model specializing in ${model.category}. Height ${model.physicalTraits.height}. Physical traits: ${model.physicalTraits.bust} bust, ${model.physicalTraits.waist} waist, ${model.physicalTraits.hips} hips. ${model.physicalTraits.skinTone}. Specializing in ${model.physicalTraits.specialties || model.category}.

pose: ${pose.description}. ${pose.poseName}.

hair_color: jet black, hair_style: Midnight glamour with flowing elegance, skin_finish: ${model.physicalTraits.skinTone} with natural luminosity, hand_and_nail_details: Graceful positioning with glamorous manicure, tattoos: none, piercings: none, body_art: none, nail_art: Midnight glamour polish, high_heels: Designer stilettos.

wardrobe: ${wardrobe.description}. ${wardrobe.fabricDetails}..

environment: ${environment.name}. ${environment.description}. ${environment.atmosphere}..

lighting: ${photographer.lightingSignature}. ${environment.lightingProfile}..

camera: focal_length: ${photographer.cameraPreference.split(' ')[0]}, aperture: ${photographer.cameraPreference.match(/f\/[\d.]+/)?.[0] || 'f/2.0'}, distance: 3 m, angle: Eye level intimate perspective, framing: ${pose.framing || 'Medium shot emphasizing form'}.

color_grade: Midnight dramatic tones with sensual warmth and natural color balance.

style: ${photographer.style}. Midnight encounter with ${model.name}. ${model.category} specialist with ${intimacyLevel}/10 intimacy. Collaborative artistic expression with trust-based intimacy.

quality: Ultra-high-end 8K glamour photography with exceptional detail and natural authenticity.

figure_and_form: ${model.emphasis}. Natural form celebrating feminine curves and presence.

skin_micro_details: Authentic skin texture with natural pores and subsurface scattering. Professional finish maintaining natural beauty.

fabric_physics: ${wardrobe.fabricDetails}. Natural draping following gravity with realistic folds and texture.

material_properties: Authentic materials from environment with natural light interaction. Luxury fabrics with premium tactile quality.`;
  };

  // Generate the complete prompt based on selections
  const generatePrompt = () => {
    if (!selectedModel || !selectedWardrobe || !selectedPose || !selectedEnvironment) {
      return '';
    }
    return generatePromptWithSelections(selectedModel, selectedWardrobe, selectedPose, selectedEnvironment);
  };

  const handleGenerate = () => {
    if (!selectedModel || !selectedWardrobe || !selectedPose || !selectedEnvironment) {
      alert('Please select a model, wardrobe, pose, and environment before generating.');
      return;
    }

    const prompt = generatePrompt();
    const settings = {
      aspectRatio: selectedPose.aspectRatio || '4:5',
      intimacyLevel: intimacyLevel,
      fluxSafetyTolerance: selectedModel.personalPhotographer.fluxSettings.safetyTolerance,
      provider: 'replicate-flux'
    };

    onGenerate(prompt, settings);
  };

  const handleMigrate = () => {
    if (!selectedModel || !selectedWardrobe || !selectedPose || !selectedEnvironment) {
      alert('Please select a model, wardrobe, pose, and environment before migrating.');
      return;
    }

    const prompt = generatePrompt();
    onMigrateToMain(prompt);
  };

  // Calculate selection progress
  const getSelectionProgress = () => {
    let progress = 0;
    if (selectedModelId) progress += 25;
    if (selectedWardrobe) progress += 25;
    if (selectedPose) progress += 25;
    if (selectedEnvironment) progress += 25;
    return progress;
  };

  const selectionProgress = getSelectionProgress();
  const isReadyToGenerate = selectedModel && selectedWardrobe && selectedPose && selectedEnvironment;

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
              9 Models × 3 Wardrobes × 4 Poses × 4 Environments = 432 Unique Combinations
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          {/* Progress Indicator */}
          <div style={{
            padding: '8px 16px',
            backgroundColor: 'rgba(147, 51, 234, 0.2)',
            borderRadius: '8px',
            border: '1px solid rgba(147, 51, 234, 0.3)'
          }}>
            <div style={{ fontSize: '12px', color: '#C084FC', marginBottom: '4px' }}>
              Selection Progress
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '100px',
                height: '6px',
                backgroundColor: 'rgba(147, 51, 234, 0.2)',
                borderRadius: '3px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${selectionProgress}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #F472B6 0%, #C084FC 100%)',
                  transition: 'width 0.3s ease'
                }} />
              </div>
              <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#F472B6' }}>
                {selectionProgress}%
              </span>
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
            ← Exit
          </button>
        </div>
      </div>

      <div style={{ padding: '32px', maxWidth: '1800px', margin: '0 auto' }}>
        {/* Quick Action Buttons */}
        <div style={{
          marginBottom: '32px',
          display: 'flex',
          gap: '12px',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={handleQuickGenerate}
            style={{
              padding: '12px 24px',
              background: 'linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)',
              border: 'none',
              borderRadius: '10px',
              color: '#FFF',
              cursor: 'pointer',
              fontSize: '15px',
              fontWeight: 'bold',
              boxShadow: '0 4px 12px rgba(245, 158, 11, 0.4)',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(245, 158, 11, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(245, 158, 11, 0.4)';
            }}
          >
            ⚡ Quick Generate (Random Everything)
          </button>

          <button
            onClick={handleRandomModel}
            style={{
              padding: '12px 24px',
              background: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
              border: 'none',
              borderRadius: '10px',
              color: '#FFF',
              cursor: 'pointer',
              fontSize: '15px',
              fontWeight: 'bold',
              boxShadow: '0 4px 12px rgba(139, 92, 246, 0.4)',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(139, 92, 246, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(139, 92, 246, 0.4)';
            }}
          >
            🎲 Random Model
          </button>

          <button
            onClick={handleRandomCombination}
            disabled={!selectedModel}
            style={{
              padding: '12px 24px',
              background: !selectedModel
                ? 'rgba(75, 85, 99, 0.5)'
                : 'linear-gradient(135deg, #06B6D4 0%, #3B82F6 100%)',
              border: 'none',
              borderRadius: '10px',
              color: '#FFF',
              cursor: !selectedModel ? 'not-allowed' : 'pointer',
              fontSize: '15px',
              fontWeight: 'bold',
              boxShadow: !selectedModel ? 'none' : '0 4px 12px rgba(6, 182, 212, 0.4)',
              opacity: !selectedModel ? 0.5 : 1,
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}
            onMouseEnter={(e) => {
              if (selectedModel) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(6, 182, 212, 0.5)';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedModel) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(6, 182, 212, 0.4)';
              }
            }}
          >
            🔀 Random Combination
          </button>
        </div>

        {/* Model Selector */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0, color: '#F472B6' }}>
              📸 Step 1: Select Your Model {selectedModelId && '✓'}
            </h2>
            <span style={{ fontSize: '13px', color: '#9CA3AF' }}>
              {EROTIC_GLAMOUR_MODELS.length} specialized models available
            </span>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '16px'
          }}>
            {EROTIC_GLAMOUR_MODELS.map((model) => (
              <div
                key={model.id}
                onClick={() => {
                  setSelectedModelId(model.id);
                  setSelectedWardrobe(null);
                  setSelectedPose(null);
                  setSelectedEnvironment(model.environments?.[0] || null);
                }}
                onMouseEnter={() => setHoveredModel(model.id)}
                onMouseLeave={() => setHoveredModel(null)}
                style={{
                  padding: '20px',
                  backgroundColor: selectedModelId === model.id ? 'rgba(147, 51, 234, 0.3)' : 'rgba(30, 10, 50, 0.5)',
                  border: selectedModelId === model.id ? '2px solid #9333EA' : '1px solid rgba(147, 51, 234, 0.2)',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  minHeight: '180px',
                  transform: hoveredModel === model.id ? 'translateY(-4px)' : 'translateY(0)',
                  boxShadow: hoveredModel === model.id ? '0 8px 24px rgba(147, 51, 234, 0.3)' : 'none'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#F3F4F6', margin: 0 }}>
                    {model.name}
                  </h3>
                  {selectedModelId === model.id && (
                    <span style={{
                      fontSize: '20px',
                      animation: 'pulse 2s ease-in-out infinite'
                    }}>✓</span>
                  )}
                </div>
                <p style={{ fontSize: '13px', color: '#C084FC', marginBottom: '12px' }}>
                  {model.category}
                </p>
                <div style={{ fontSize: '12px', color: '#9CA3AF', lineHeight: '1.6' }}>
                  <div style={{ marginBottom: '6px' }}>
                    <strong style={{ color: '#F472B6' }}>Emphasis:</strong> {model.emphasis}
                  </div>
                  <div style={{ marginBottom: '6px' }}>
                    <strong style={{ color: '#F472B6' }}>Figure:</strong> {model.physicalTraits.bust} / {model.physicalTraits.waist} / {model.physicalTraits.hips}
                  </div>
                  <div>
                    <strong style={{ color: '#F472B6' }}>Photographer:</strong> {model.personalPhotographer.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Wardrobe, Pose, Environment Selectors (only shown after model selection) */}
        {selectedModel && (
          <>
            {/* Wardrobe Selector */}
            <div style={{ marginBottom: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0, color: '#F472B6' }}>
                  👗 Step 2: Select Wardrobe {selectedWardrobe && '✓'}
                </h2>
                <span style={{ fontSize: '13px', color: '#9CA3AF' }}>
                  {selectedModel.wardrobeCollection?.length || 0} options available
                </span>
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                gap: '16px'
              }}>
                {selectedModel.wardrobeCollection?.map((wardrobe) => (
                  <div
                    key={wardrobe.id}
                    onClick={() => setSelectedWardrobe(wardrobe)}
                    style={{
                      padding: '16px',
                      backgroundColor: selectedWardrobe?.id === wardrobe.id ? 'rgba(236, 72, 153, 0.3)' : 'rgba(30, 10, 50, 0.5)',
                      border: selectedWardrobe?.id === wardrobe.id ? '2px solid #EC4899' : '1px solid rgba(236, 72, 153, 0.2)',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      if (selectedWardrobe?.id !== wardrobe.id) {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(236, 72, 153, 0.2)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                      <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: '#F3F4F6', marginBottom: '8px' }}>
                        {wardrobe.name}
                      </h4>
                      {selectedWardrobe?.id === wardrobe.id && (
                        <span style={{ fontSize: '18px' }}>✓</span>
                      )}
                    </div>
                    <p style={{ fontSize: '13px', color: '#D1D5DB', lineHeight: '1.5', marginBottom: '8px' }}>
                      {wardrobe.description}
                    </p>
                    <div style={{ fontSize: '12px', color: '#9CA3AF' }}>
                      <strong style={{ color: '#F472B6' }}>Fabric:</strong> {wardrobe.fabricDetails}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pose Selector */}
            <div style={{ marginBottom: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0, color: '#F472B6' }}>
                  💃 Step 3: Select Pose {selectedPose && '✓'}
                </h2>
                <span style={{ fontSize: '13px', color: '#9CA3AF' }}>
                  {selectedModel.poseGallery?.length || 0} signature poses
                </span>
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '16px'
              }}>
                {selectedModel.poseGallery?.map((pose) => (
                  <div
                    key={pose.id}
                    onClick={() => setSelectedPose(pose)}
                    style={{
                      padding: '16px',
                      backgroundColor: selectedPose?.id === pose.id ? 'rgba(192, 132, 252, 0.3)' : 'rgba(30, 10, 50, 0.5)',
                      border: selectedPose?.id === pose.id ? '2px solid #C084FC' : '1px solid rgba(192, 132, 252, 0.2)',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      if (selectedPose?.id !== pose.id) {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(192, 132, 252, 0.2)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                      <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: '#F3F4F6', marginBottom: '8px' }}>
                        {pose.poseName}
                      </h4>
                      {selectedPose?.id === pose.id && (
                        <span style={{ fontSize: '18px' }}>✓</span>
                      )}
                    </div>
                    <p style={{ fontSize: '13px', color: '#D1D5DB', lineHeight: '1.5' }}>
                      {pose.description}
                    </p>
                    {pose.aspectRatio && (
                      <div style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '8px' }}>
                        <strong style={{ color: '#C084FC' }}>Aspect Ratio:</strong> {pose.aspectRatio}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Environment & Intimacy Controls */}
            <div style={{ marginBottom: '32px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px', color: '#F472B6' }}>
                🌃 Step 4: Environment & Intimacy Settings {selectedEnvironment && '✓'}
              </h2>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr',
                gap: '24px',
                padding: '24px',
                backgroundColor: 'rgba(30, 10, 50, 0.5)',
                borderRadius: '12px',
                border: '1px solid rgba(147, 51, 234, 0.3)'
              }}>
                {/* Environment Selector */}
                <div>
                  <label style={{ fontSize: '14px', color: '#C084FC', display: 'block', marginBottom: '12px', fontWeight: '600' }}>
                    Environment / Location ({selectedModel.environments?.length || 0} options)
                  </label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {selectedModel.environments?.map((env, idx) => (
                      <div
                        key={idx}
                        onClick={() => setSelectedEnvironment(env)}
                        style={{
                          padding: '12px',
                          backgroundColor: selectedEnvironment === env ? 'rgba(147, 51, 234, 0.3)' : 'rgba(15, 5, 30, 0.6)',
                          border: selectedEnvironment === env ? '2px solid #9333EA' : '1px solid rgba(147, 51, 234, 0.2)',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          if (selectedEnvironment !== env) {
                            e.currentTarget.style.transform = 'translateX(4px)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateX(0)';
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '14px', color: '#F3F4F6', fontWeight: '500', marginBottom: '4px' }}>
                              {env.name}
                            </div>
                            <div style={{ fontSize: '12px', color: '#9CA3AF' }}>
                              {env.atmosphere}
                            </div>
                          </div>
                          {selectedEnvironment === env && (
                            <span style={{ fontSize: '16px', marginLeft: '8px' }}>✓</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Intimacy Level Slider */}
                <div>
                  <label style={{ fontSize: '14px', color: '#C084FC', display: 'block', marginBottom: '12px', fontWeight: '600' }}>
                    Intimacy Level: {intimacyLevel}/10
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={intimacyLevel}
                    onChange={(e) => setIntimacyLevel(parseInt(e.target.value))}
                    style={{
                      width: '100%',
                      height: '8px',
                      borderRadius: '4px',
                      outline: 'none',
                      marginBottom: '12px',
                      accentColor: '#F472B6'
                    }}
                  />
                  <div style={{
                    fontSize: '12px',
                    color: '#9CA3AF',
                    padding: '8px',
                    backgroundColor: 'rgba(147, 51, 234, 0.1)',
                    borderRadius: '6px',
                    textAlign: 'center'
                  }}>
                    {intimacyLevel <= 3 && '🌙 Subtle and elegant'}
                    {intimacyLevel > 3 && intimacyLevel <= 6 && '💫 Sensual and artistic'}
                    {intimacyLevel > 6 && intimacyLevel <= 8 && '🔥 Bold and expressive'}
                    {intimacyLevel > 8 && '⚡ Maximum intimacy and revelation'}
                  </div>

                  {/* Enhanced Preview Card */}
                  <div style={{
                    marginTop: '24px',
                    padding: '16px',
                    backgroundColor: isReadyToGenerate
                      ? 'rgba(34, 197, 94, 0.1)'
                      : 'rgba(147, 51, 234, 0.1)',
                    border: `1px solid ${isReadyToGenerate ? 'rgba(34, 197, 94, 0.3)' : 'rgba(147, 51, 234, 0.3)'}`,
                    borderRadius: '8px'
                  }}>
                    <h4 style={{
                      fontSize: '13px',
                      fontWeight: 'bold',
                      color: isReadyToGenerate ? '#22C55E' : '#F472B6',
                      marginBottom: '12px'
                    }}>
                      {isReadyToGenerate ? '✓ Ready to Generate!' : 'Current Selection'}
                    </h4>
                    <div style={{ fontSize: '11px', color: '#D1D5DB', lineHeight: '1.8' }}>
                      <div><strong>Model:</strong> {selectedModel.name}</div>
                      <div><strong>Wardrobe:</strong> {selectedWardrobe?.name || '❌ Not selected'}</div>
                      <div><strong>Pose:</strong> {selectedPose?.poseName || '❌ Not selected'}</div>
                      <div><strong>Environment:</strong> {selectedEnvironment?.name || '❌ Not selected'}</div>
                      <div><strong>Intimacy:</strong> {intimacyLevel}/10</div>
                    </div>
                    {isReadyToGenerate && (
                      <div style={{
                        marginTop: '12px',
                        padding: '8px',
                        backgroundColor: 'rgba(34, 197, 94, 0.2)',
                        borderRadius: '6px',
                        fontSize: '11px',
                        color: '#6EE7B7',
                        textAlign: 'center'
                      }}>
                        🎬 All selections complete! Ready to generate your scene.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={handleGenerate}
                disabled={!isReadyToGenerate}
                style={{
                  padding: '16px 48px',
                  background: !isReadyToGenerate
                    ? 'rgba(75, 85, 99, 0.5)'
                    : 'linear-gradient(135deg, #F472B6 0%, #C084FC 100%)',
                  border: 'none',
                  borderRadius: '12px',
                  color: '#FFF',
                  cursor: !isReadyToGenerate ? 'not-allowed' : 'pointer',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  opacity: !isReadyToGenerate ? 0.5 : 1,
                  boxShadow: isReadyToGenerate ? '0 6px 20px rgba(244, 114, 182, 0.4)' : 'none',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  if (isReadyToGenerate) {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(244, 114, 182, 0.5)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (isReadyToGenerate) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(244, 114, 182, 0.4)';
                  }
                }}
              >
                🎬 Generate Scene
              </button>

              <button
                onClick={handleMigrate}
                disabled={!isReadyToGenerate}
                style={{
                  padding: '16px 48px',
                  backgroundColor: !isReadyToGenerate
                    ? 'rgba(75, 85, 99, 0.3)'
                    : 'rgba(99, 102, 241, 0.2)',
                  border: `1px solid ${!isReadyToGenerate ? '#4B5563' : '#6366F1'}`,
                  borderRadius: '12px',
                  color: !isReadyToGenerate ? '#6B7280' : '#A5B4FC',
                  cursor: !isReadyToGenerate ? 'not-allowed' : 'pointer',
                  fontSize: '16px',
                  fontWeight: '600',
                  opacity: !isReadyToGenerate ? 0.5 : 1,
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  if (isReadyToGenerate) {
                    e.currentTarget.style.backgroundColor = 'rgba(99, 102, 241, 0.3)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (isReadyToGenerate) {
                    e.currentTarget.style.backgroundColor = 'rgba(99, 102, 241, 0.2)';
                  }
                }}
              >
                📋 Migrate to Main Mode
              </button>
            </div>
          </>
        )}

        {/* Enhanced Info Footer */}
        <div style={{ marginTop: '48px', padding: '24px', backgroundColor: 'rgba(147, 51, 234, 0.1)', border: '1px solid rgba(147, 51, 234, 0.3)', borderRadius: '12px' }}>
          <div style={{ display: 'flex', gap: '16px' }}>
            <svg style={{ width: '24px', height: '24px', color: '#F472B6', flexShrink: 0, marginTop: '2px' }} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div style={{ flex: 1 }}>
              <p style={{ color: '#F472B6', fontWeight: 'bold', marginBottom: '12px', fontSize: '15px' }}>
                🎭 Indian Role-Play Mode Features:
              </p>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '12px',
                fontSize: '13px'
              }}>
                <div style={{ color: '#D1D5DB', lineHeight: '1.8' }}>
                  <div style={{ color: '#C084FC', fontWeight: 'bold', marginBottom: '4px' }}>📸 Models:</div>
                  <ul style={{ margin: 0, paddingLeft: '20px' }}>
                    <li>9 specialized Indian glamour models</li>
                    <li>Distinct physical emphasis & styles</li>
                    <li>10/10 intimacy photographers</li>
                  </ul>
                </div>
                <div style={{ color: '#D1D5DB', lineHeight: '1.8' }}>
                  <div style={{ color: '#C084FC', fontWeight: 'bold', marginBottom: '4px' }}>🎨 Customization:</div>
                  <ul style={{ margin: 0, paddingLeft: '20px' }}>
                    <li>3 wardrobe variations per model</li>
                    <li>4 signature poses per model</li>
                    <li>4 midnight environments</li>
                    <li>Intimacy level control (1-10)</li>
                  </ul>
                </div>
                <div style={{ color: '#D1D5DB', lineHeight: '1.8' }}>
                  <div style={{ color: '#C084FC', fontWeight: 'bold', marginBottom: '4px' }}>⚡ Quick Actions:</div>
                  <ul style={{ margin: 0, paddingLeft: '20px' }}>
                    <li>Quick Generate (random all)</li>
                    <li>Random Model selector</li>
                    <li>Random Combination mixer</li>
                    <li>Visual selection progress</li>
                  </ul>
                </div>
              </div>
              <div style={{
                marginTop: '16px',
                padding: '12px',
                backgroundColor: 'rgba(236, 72, 153, 0.1)',
                borderRadius: '8px',
                color: '#F472B6',
                fontSize: '12px',
                fontWeight: 'bold',
                textAlign: 'center'
              }}>
                💫 Total Unique Combinations: 9 × 3 × 4 × 4 = 432 possible scenes!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndianRolePlayMode;
