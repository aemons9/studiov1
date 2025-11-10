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

  const selectedModel = EROTIC_GLAMOUR_MODELS.find(m => m.id === selectedModelId);

  // Generate the complete prompt based on selections
  const generatePrompt = () => {
    if (!selectedModel || !selectedWardrobe || !selectedPose || !selectedEnvironment) {
      return '';
    }

    const photographer = selectedModel.personalPhotographer;

    return `Midnight role-playing photography. Intimacy ${intimacyLevel}/10. ${photographer.style}.

subject: variant: Elite Indian artistic model specializing in ${selectedModel.category}. Height ${selectedModel.physicalTraits.height}. Physical traits: ${selectedModel.physicalTraits.bust} bust, ${selectedModel.physicalTraits.waist} waist, ${selectedModel.physicalTraits.hips} hips. ${selectedModel.physicalTraits.skinTone}. Specializing in ${selectedModel.physicalTraits.specialties || selectedModel.category}.

pose: ${selectedPose.description}. ${selectedPose.poseName}.

hair_color: jet black, hair_style: Midnight glamour with flowing elegance, skin_finish: ${selectedModel.physicalTraits.skinTone} with natural luminosity, hand_and_nail_details: Graceful positioning with glamorous manicure, tattoos: none, piercings: none, body_art: none, nail_art: Midnight glamour polish, high_heels: Designer stilettos.

wardrobe: ${selectedWardrobe.description}. ${selectedWardrobe.fabricDetails}..

environment: ${selectedEnvironment.name}. ${selectedEnvironment.description}. ${selectedEnvironment.atmosphere}..

lighting: ${photographer.lightingSignature}. ${selectedEnvironment.lightingProfile}..

camera: focal_length: ${photographer.cameraPreference.split(' ')[0]}, aperture: ${photographer.cameraPreference.match(/f\/[\d.]+/)?.[0] || 'f/2.0'}, distance: 3 m, angle: Eye level intimate perspective, framing: ${selectedPose.framing || 'Medium shot emphasizing form'}.

color_grade: Midnight dramatic tones with sensual warmth and natural color balance.

style: ${photographer.style}. Midnight encounter with ${selectedModel.name}. ${selectedModel.category} specialist with ${intimacyLevel}/10 intimacy. Collaborative artistic expression with trust-based intimacy.

quality: Ultra-high-end 8K glamour photography with exceptional detail and natural authenticity.

figure_and_form: ${selectedModel.emphasis}. Natural form celebrating feminine curves and presence.

skin_micro_details: Authentic skin texture with natural pores and subsurface scattering. Professional finish maintaining natural beauty.

fabric_physics: ${selectedWardrobe.fabricDetails}. Natural draping following gravity with realistic folds and texture.

material_properties: Authentic materials from environment with natural light interaction. Luxury fabrics with premium tactile quality.`;
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
              Visual Selection: 9 Models × Multiple Variations
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

      <div style={{ padding: '32px', maxWidth: '1800px', margin: '0 auto' }}>
        {/* Model Selector */}
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px', color: '#F472B6' }}>
            📸 Step 1: Select Your Model
          </h2>
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
                style={{
                  padding: '20px',
                  backgroundColor: selectedModelId === model.id ? 'rgba(147, 51, 234, 0.3)' : 'rgba(30, 10, 50, 0.5)',
                  border: selectedModelId === model.id ? '2px solid #9333EA' : '1px solid rgba(147, 51, 234, 0.2)',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  minHeight: '180px'
                }}
              >
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#F3F4F6', marginBottom: '8px' }}>
                  {model.name}
                </h3>
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
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px', color: '#F472B6' }}>
                👗 Step 2: Select Wardrobe ({selectedModel.wardrobeCollection?.length || 0} options)
              </h2>
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
                  >
                    <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: '#F3F4F6', marginBottom: '8px' }}>
                      {wardrobe.name}
                    </h4>
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
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px', color: '#F472B6' }}>
                💃 Step 3: Select Pose ({selectedModel.poseGallery?.length || 0} options)
              </h2>
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
                  >
                    <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: '#F3F4F6', marginBottom: '8px' }}>
                      {pose.poseName}
                    </h4>
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
                🌃 Step 4: Environment & Intimacy Settings
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
                    Environment / Location
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
                      >
                        <div style={{ fontSize: '14px', color: '#F3F4F6', fontWeight: '500', marginBottom: '4px' }}>
                          {env.name}
                        </div>
                        <div style={{ fontSize: '12px', color: '#9CA3AF' }}>
                          {env.atmosphere}
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
                      marginBottom: '12px'
                    }}
                  />
                  <div style={{ fontSize: '12px', color: '#9CA3AF' }}>
                    {intimacyLevel <= 3 && 'Subtle and elegant'}
                    {intimacyLevel > 3 && intimacyLevel <= 6 && 'Sensual and artistic'}
                    {intimacyLevel > 6 && intimacyLevel <= 8 && 'Bold and expressive'}
                    {intimacyLevel > 8 && 'Maximum intimacy and revelation'}
                  </div>

                  {/* Preview Card */}
                  <div style={{
                    marginTop: '24px',
                    padding: '16px',
                    backgroundColor: 'rgba(147, 51, 234, 0.1)',
                    border: '1px solid rgba(147, 51, 234, 0.3)',
                    borderRadius: '8px'
                  }}>
                    <h4 style={{ fontSize: '13px', fontWeight: 'bold', color: '#F472B6', marginBottom: '12px' }}>
                      Current Selection
                    </h4>
                    <div style={{ fontSize: '11px', color: '#D1D5DB', lineHeight: '1.8' }}>
                      <div><strong>Model:</strong> {selectedModel.name}</div>
                      <div><strong>Wardrobe:</strong> {selectedWardrobe?.name || 'Not selected'}</div>
                      <div><strong>Pose:</strong> {selectedPose?.poseName || 'Not selected'}</div>
                      <div><strong>Environment:</strong> {selectedEnvironment?.name || 'Not selected'}</div>
                      <div><strong>Intimacy:</strong> {intimacyLevel}/10</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
              <button
                onClick={handleGenerate}
                disabled={!selectedWardrobe || !selectedPose || !selectedEnvironment}
                style={{
                  padding: '16px 48px',
                  background: (!selectedWardrobe || !selectedPose || !selectedEnvironment)
                    ? 'rgba(75, 85, 99, 0.5)'
                    : 'linear-gradient(135deg, #F472B6 0%, #C084FC 100%)',
                  border: 'none',
                  borderRadius: '12px',
                  color: '#FFF',
                  cursor: (!selectedWardrobe || !selectedPose || !selectedEnvironment) ? 'not-allowed' : 'pointer',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  opacity: (!selectedWardrobe || !selectedPose || !selectedEnvironment) ? 0.5 : 1
                }}
              >
                🎬 Generate Scene
              </button>

              <button
                onClick={handleMigrate}
                disabled={!selectedWardrobe || !selectedPose || !selectedEnvironment}
                style={{
                  padding: '16px 48px',
                  backgroundColor: (!selectedWardrobe || !selectedPose || !selectedEnvironment)
                    ? 'rgba(75, 85, 99, 0.3)'
                    : 'rgba(99, 102, 241, 0.2)',
                  border: `1px solid ${(!selectedWardrobe || !selectedPose || !selectedEnvironment) ? '#4B5563' : '#6366F1'}`,
                  borderRadius: '12px',
                  color: (!selectedWardrobe || !selectedPose || !selectedEnvironment) ? '#6B7280' : '#A5B4FC',
                  cursor: (!selectedWardrobe || !selectedPose || !selectedEnvironment) ? 'not-allowed' : 'pointer',
                  fontSize: '16px',
                  fontWeight: '600',
                  opacity: (!selectedWardrobe || !selectedPose || !selectedEnvironment) ? 0.5 : 1
                }}
              >
                📋 Migrate to Main Mode
              </button>
            </div>
          </>
        )}

        {/* Info Footer */}
        <div style={{ marginTop: '48px', padding: '20px', backgroundColor: 'rgba(147, 51, 234, 0.1)', border: '1px solid rgba(147, 51, 234, 0.3)', borderRadius: '12px' }}>
          <div style={{ display: 'flex', gap: '12px' }}>
            <svg className="w-5 h-5" style={{ width: '20px', height: '20px', color: '#F472B6', flexShrink: 0, marginTop: '2px' }} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div style={{ fontSize: '13px' }}>
              <p style={{ color: '#F472B6', fontWeight: 'bold', marginBottom: '8px' }}>Visual Selection Mode:</p>
              <ul style={{ color: '#D1D5DB', lineHeight: '1.8', marginLeft: '20px' }}>
                <li>✅ 9 specialized Indian glamour models with distinct emphasis and style</li>
                <li>✅ 3 wardrobe variations per model with detailed descriptions</li>
                <li>✅ 4 signature poses per model optimized for their specialty</li>
                <li>✅ Multiple environment/location options with atmospheric details</li>
                <li>✅ Intimacy level control (1-10) for personalized experience</li>
                <li>✅ All selections paired with 10/10 intimacy personal photographers</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndianRolePlayMode;
