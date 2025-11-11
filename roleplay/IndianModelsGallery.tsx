import React, { useState } from 'react';
import { EROTIC_GLAMOUR_MODELS } from '../concepts/eroticGlamourModels';

interface IndianModelsGalleryProps {
  onGenerate: (prompt: string, settings: any) => void;
  onMigrateToMain: (prompt: string) => void;
  onExit: () => void;
}

// Camera presets for selection
const CAMERA_PRESETS = [
  { id: 'intimate-portrait', name: 'Intimate Portrait', focal: '85mm', aperture: 'f/1.4', distance: '2m', angle: 'Eye level intimate', description: 'Close intimate framing, shallow depth of field' },
  { id: 'sensual-medium', name: 'Sensual Medium Shot', focal: '70mm', aperture: 'f/2.0', distance: '3m', angle: 'Slightly elevated', description: 'Medium shot emphasizing form and curves' },
  { id: 'full-body-glamour', name: 'Full Body Glamour', focal: '50mm', aperture: 'f/2.8', distance: '4m', angle: 'Eye level full body', description: 'Full figure showcasing complete elegance' },
  { id: 'dramatic-wide', name: 'Dramatic Wide Angle', focal: '35mm', aperture: 'f/2.0', distance: '2.5m', angle: 'Slightly low angle', description: 'Dramatic perspective with environmental context' },
  { id: 'artistic-close', name: 'Artistic Close-Up', focal: '100mm', aperture: 'f/1.8', distance: '1.5m', angle: 'Intimate close perspective', description: 'Ultra-intimate artistic details' },
  { id: 'cinematic-profile', name: 'Cinematic Profile', focal: '85mm', aperture: 'f/2.0', distance: '3m', angle: 'Side profile angle', description: 'Cinematic side profile emphasis' }
];

const IndianModelsGallery: React.FC<IndianModelsGalleryProps> = ({ onGenerate, onMigrateToMain, onExit }) => {
  const [selectedModelId, setSelectedModelId] = useState<string | null>(null);
  const [selectedWardrobe, setSelectedWardrobe] = useState<any | null>(null);
  const [selectedPose, setSelectedPose] = useState<any | null>(null);
  const [selectedEnvironment, setSelectedEnvironment] = useState<any | null>(null);
  const [selectedCamera, setSelectedCamera] = useState<any | null>(CAMERA_PRESETS[0]);
  const [intimacyLevel, setIntimacyLevel] = useState<number>(10);
  const [customCameraAngle, setCustomCameraAngle] = useState<string>('');

  const selectedModel = EROTIC_GLAMOUR_MODELS.find(m => m.id === selectedModelId);

  // Collect all unique poses across all models
  const getAllPoses = () => {
    const posesMap = new Map();
    EROTIC_GLAMOUR_MODELS.forEach(model => {
      model.poseGallery?.forEach(pose => {
        if (!posesMap.has(pose.id)) {
          posesMap.set(pose.id, { ...pose, modelName: model.name });
        }
      });
    });
    return Array.from(posesMap.values());
  };

  // Collect all unique environments
  const getAllEnvironments = () => {
    const envsMap = new Map();
    EROTIC_GLAMOUR_MODELS.forEach(model => {
      model.environments?.forEach(env => {
        if (!envsMap.has(env.id)) {
          envsMap.set(env.id, env);
        }
      });
    });
    return Array.from(envsMap.values());
  };

  const generatePrompt = () => {
    if (!selectedModel || !selectedWardrobe || !selectedPose || !selectedEnvironment || !selectedCamera) {
      return '';
    }

    const photographer = selectedModel.personalPhotographer;
    const cameraAngle = customCameraAngle || selectedCamera.angle;

    return `Private intimate art photography in fine-art erotica style. Intimacy ${intimacyLevel}/10, personal artistic encounter. subject: variant: Elite Indian artistic model ${selectedModel.name} (height ${selectedModel.physicalTraits.height}) specializing in ${selectedModel.category} and ${selectedModel.physicalTraits.specialties || 'intimate fine-art photography'}. ${selectedModel.physicalTraits.figure} (bust ${selectedModel.physicalTraits.bust}, waist ${selectedModel.physicalTraits.waist}, hips ${selectedModel.physicalTraits.hips}). ${selectedModel.physicalTraits.skinTone}. ${selectedModel.physicalTraits.features}. ${selectedModel.physicalTraits.fitness}. pose: ${selectedPose.description}. ${selectedPose.poseName}. hair_color: jet black, hair_style: Glamorous fine-art styling with flowing elegant volume and sophisticated artistry, skin_finish: ${selectedModel.physicalTraits.skinTone} with natural luminosity and artistic glow, hand_and_nail_details: Graceful artistic positioning with glamorous manicure and expressive hand movement, tattoos: none, piercings: none, body_art: none, nail_art: Glamour polish with artistic sophistication, high_heels: Designer stilettos with artistic elegance. wardrobe: ${selectedWardrobe.description}. ${selectedWardrobe.fabricDetails || selectedWardrobe.materials}. ${selectedWardrobe.style} aesthetic with ${intimacyLevel}/10 intimacy level. environment: ${selectedEnvironment.name}. ${selectedEnvironment.description}. ${selectedEnvironment.atmosphere}. Place of indulgence with ultimate privacy and luxury setting. lighting: ${photographer.lightingSignature}. ${selectedEnvironment.lightingProfile}. Creating sculptural definition and intimate artistic atmosphere. camera: focal_length: ${selectedCamera.focal}, aperture: ${selectedCamera.aperture}, distance: ${selectedCamera.distance}, angle: ${cameraAngle}, framing: ${selectedPose.framing || selectedCamera.description} emphasizing ${selectedModel.emphasis}. color_grade: Dramatic artistic tones with sensual warmth and natural color balance. Rich shadows with intimate ambiance. style: ${photographer.style}. Private intimate photography celebrating ${selectedModel.category}. Power level ${intimacyLevel}/10. Personal photographer: ${photographer.name}, ${photographer.specialty}. Personal and private intimate art erotica. Collaborative artistic expression with trust-based intimacy. quality: Ultra-high-end 8K glamour photography with impeccable detail and professional retouching maintaining authentic texture and natural beauty. figure_and_form: ${selectedModel.emphasis}. Natural form celebrating feminine curves and presence through sophisticated artistic grace and intimate revelation. skin_micro_details: Premium high-resolution skin texture with authentic pores and subsurface scattering. Professional finish maintaining natural beauty and ${selectedModel.physicalTraits.skinTone} natural radiance while perfecting artistic appearance. fabric_physics: ${selectedWardrobe.fabricDetails || selectedWardrobe.materials}. Luxury fabric with natural draping following gravity with realistic folds and texture. Professional wardrobe with precise body-conscious elements. material_properties: Authentic materials from ${selectedEnvironment.name} with natural light interaction. Luxury fabrics and environmental materials with premium tactile quality and rich artistic detail.`;
  };

  const handleGenerate = () => {
    if (!selectedModel || !selectedWardrobe || !selectedPose || !selectedEnvironment || !selectedCamera) {
      alert('Please select a model, wardrobe, pose, environment, and camera before generating.');
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
    if (!selectedModel || !selectedWardrobe || !selectedPose || !selectedEnvironment || !selectedCamera) {
      alert('Please complete all selections before migrating.');
      return;
    }

    const prompt = generatePrompt();
    onMigrateToMain(prompt);
  };

  const isReadyToGenerate = selectedModel && selectedWardrobe && selectedPose && selectedEnvironment && selectedCamera;
  const selectionProgress = (
    (selectedModelId ? 20 : 0) +
    (selectedWardrobe ? 20 : 0) +
    (selectedPose ? 20 : 0) +
    (selectedEnvironment ? 20 : 0) +
    (selectedCamera ? 20 : 0)
  );

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
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '32px' }}>🎨</span>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, background: 'linear-gradient(135deg, #F472B6 0%, #C084FC 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Indian Models Gallery - Comprehensive Selector
            </h1>
            <p style={{ fontSize: '14px', color: '#D1D5DB', margin: '4px 0 0 0' }}>
              15 Models × Wardrobes × Poses × Cameras × Places of Indulgence
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          {/* Progress */}
          <div style={{
            padding: '8px 16px',
            backgroundColor: 'rgba(147, 51, 234, 0.2)',
            borderRadius: '8px',
            border: '1px solid rgba(147, 51, 234, 0.3)'
          }}>
            <div style={{ fontSize: '12px', color: '#C084FC', marginBottom: '4px' }}>
              Selections: {selectionProgress}%
            </div>
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
          </div>

          <button onClick={onExit} style={{
            padding: '10px 20px',
            backgroundColor: 'rgba(239, 68, 68, 0.2)',
            border: '1px solid #EF4444',
            borderRadius: '8px',
            color: '#FCA5A5',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '600'
          }}>
            ← Exit
          </button>
        </div>
      </div>

      <div style={{ padding: '32px', maxWidth: '1800px', margin: '0 auto' }}>
        {/* Model Selection */}
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '16px', color: '#F472B6', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>💎</span> Step 1: Select Your Model {selectedModelId && '✓'}
          </h2>
          <p style={{ fontSize: '13px', color: '#9CA3AF', marginBottom: '16px' }}>
            Choose from our exclusive collection of {EROTIC_GLAMOUR_MODELS.length} specialized Indian glamour models
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '16px'
          }}>
            {EROTIC_GLAMOUR_MODELS.map((model) => (
              <div
                key={model.id}
                onClick={() => {
                  setSelectedModelId(model.id);
                  setSelectedWardrobe(null);
                  setSelectedPose(null);
                }}
                style={{
                  padding: '16px',
                  backgroundColor: selectedModelId === model.id ? 'rgba(147, 51, 234, 0.3)' : 'rgba(30, 10, 50, 0.5)',
                  border: selectedModelId === model.id ? '2px solid #9333EA' : '1px solid rgba(147, 51, 234, 0.2)',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  minHeight: '150px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#F3F4F6', margin: 0 }}>
                    {model.name}
                  </h3>
                  {selectedModelId === model.id && <span style={{ fontSize: '18px' }}>✓</span>}
                </div>
                <p style={{ fontSize: '11px', color: '#C084FC', marginBottom: '8px', fontStyle: 'italic' }}>
                  {model.category}
                </p>
                <div style={{ fontSize: '10px', color: '#9CA3AF', lineHeight: '1.5' }}>
                  <div><strong>Emphasis:</strong> {model.emphasis.substring(0, 40)}...</div>
                  <div><strong>Figure:</strong> {model.physicalTraits.bust}/{model.physicalTraits.waist}/{model.physicalTraits.hips}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Wardrobe Selection (after model selected) */}
        {selectedModel && (
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '16px', color: '#F472B6', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span>👗</span> Step 2: Select Wardrobe {selectedWardrobe && '✓'}
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
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
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <h4 style={{ fontSize: '15px', fontWeight: 'bold', color: '#F3F4F6', margin: 0 }}>
                      {wardrobe.name}
                    </h4>
                    {selectedWardrobe?.id === wardrobe.id && <span style={{ fontSize: '16px' }}>✓</span>}
                  </div>
                  <p style={{ fontSize: '12px', color: '#D1D5DB', lineHeight: '1.5', marginBottom: '6px' }}>
                    {wardrobe.description}
                  </p>
                  <div style={{ fontSize: '11px', color: '#9CA3AF' }}>
                    <strong>Style:</strong> {wardrobe.style} | <strong>Intimacy:</strong> {wardrobe.intimacyLevel}/10
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pose Selection */}
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '16px', color: '#F472B6', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>💃</span> Step 3: Select Pose {selectedPose && '✓'}
          </h2>
          <p style={{ fontSize: '13px', color: '#9CA3AF', marginBottom: '16px' }}>
            {selectedModel ? `Select from ${selectedModel.name}'s signature poses` : 'Choose from all available poses across our model collection'}
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '16px'
          }}>
            {(selectedModel ? selectedModel.poseGallery : getAllPoses()).map((pose) => (
              <div
                key={pose.id}
                onClick={() => setSelectedPose(pose)}
                style={{
                  padding: '14px',
                  backgroundColor: selectedPose?.id === pose.id ? 'rgba(192, 132, 252, 0.3)' : 'rgba(30, 10, 50, 0.5)',
                  border: selectedPose?.id === pose.id ? '2px solid #C084FC' : '1px solid rgba(192, 132, 252, 0.2)',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: 'bold', color: '#F3F4F6', margin: 0 }}>
                    {pose.poseName}
                  </h4>
                  {selectedPose?.id === pose.id && <span style={{ fontSize: '16px' }}>✓</span>}
                </div>
                <p style={{ fontSize: '12px', color: '#D1D5DB', lineHeight: '1.5' }}>
                  {pose.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Camera Selection */}
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '16px', color: '#F472B6', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>📷</span> Step 4: Select Camera & Angle {selectedCamera && '✓'}
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '16px',
            marginBottom: '16px'
          }}>
            {CAMERA_PRESETS.map((camera) => (
              <div
                key={camera.id}
                onClick={() => setSelectedCamera(camera)}
                style={{
                  padding: '14px',
                  backgroundColor: selectedCamera?.id === camera.id ? 'rgba(99, 102, 241, 0.3)' : 'rgba(30, 10, 50, 0.5)',
                  border: selectedCamera?.id === camera.id ? '2px solid #6366F1' : '1px solid rgba(99, 102, 241, 0.2)',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: 'bold', color: '#F3F4F6', margin: 0 }}>
                    {camera.name}
                  </h4>
                  {selectedCamera?.id === camera.id && <span style={{ fontSize: '16px' }}>✓</span>}
                </div>
                <p style={{ fontSize: '11px', color: '#D1D5DB', marginBottom: '6px' }}>
                  {camera.description}
                </p>
                <div style={{ fontSize: '10px', color: '#9CA3AF' }}>
                  {camera.focal} • {camera.aperture} • {camera.distance}
                </div>
              </div>
            ))}
          </div>

          {/* Custom Angle Input */}
          <div style={{
            padding: '16px',
            backgroundColor: 'rgba(30, 10, 50, 0.5)',
            borderRadius: '12px',
            border: '1px solid rgba(99, 102, 241, 0.2)'
          }}>
            <label style={{ fontSize: '13px', color: '#A5B4FC', display: 'block', marginBottom: '8px', fontWeight: '600' }}>
              Custom Camera Angle (optional):
            </label>
            <input
              type="text"
              value={customCameraAngle}
              onChange={(e) => setCustomCameraAngle(e.target.value)}
              placeholder="e.g., Low angle looking up, Over-the-shoulder perspective..."
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: 'rgba(15, 5, 30, 0.8)',
                border: '1px solid rgba(99, 102, 241, 0.3)',
                borderRadius: '8px',
                color: '#F3F4F6',
                fontSize: '13px'
              }}
            />
          </div>
        </div>

        {/* Environment - Places of Indulgence */}
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '16px', color: '#F472B6', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>🌃</span> Step 5: Select Place of Indulgence {selectedEnvironment && '✓'}
          </h2>
          <p style={{ fontSize: '13px', color: '#9CA3AF', marginBottom: '16px' }}>
            Choose your intimate environment for this private art session
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '16px'
          }}>
            {getAllEnvironments().map((env) => (
              <div
                key={env.id}
                onClick={() => setSelectedEnvironment(env)}
                style={{
                  padding: '16px',
                  backgroundColor: selectedEnvironment?.id === env.id ? 'rgba(147, 51, 234, 0.3)' : 'rgba(30, 10, 50, 0.5)',
                  border: selectedEnvironment?.id === env.id ? '2px solid #9333EA' : '1px solid rgba(147, 51, 234, 0.2)',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <h4 style={{ fontSize: '15px', fontWeight: 'bold', color: '#F3F4F6', margin: 0 }}>
                    {env.name}
                  </h4>
                  {selectedEnvironment?.id === env.id && <span style={{ fontSize: '16px' }}>✓</span>}
                </div>
                <p style={{ fontSize: '12px', color: '#D1D5DB', lineHeight: '1.5', marginBottom: '6px' }}>
                  {env.description}
                </p>
                <p style={{ fontSize: '11px', color: '#9CA3AF', fontStyle: 'italic' }}>
                  {env.atmosphere}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Intimacy Level */}
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '16px', color: '#F472B6', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>🔥</span> Step 6: Set Intimacy Level
          </h2>
          <div style={{
            padding: '24px',
            backgroundColor: 'rgba(30, 10, 50, 0.5)',
            borderRadius: '12px',
            border: '1px solid rgba(147, 51, 234, 0.3)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <label style={{ fontSize: '15px', color: '#C084FC', fontWeight: '600' }}>
                Intimacy Level:
              </label>
              <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#F472B6' }}>
                {intimacyLevel}/10
              </span>
            </div>
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
              fontSize: '13px',
              color: '#E5E7EB',
              padding: '12px',
              backgroundColor: 'rgba(147, 51, 234, 0.1)',
              borderRadius: '8px',
              textAlign: 'center',
              fontWeight: '500'
            }}>
              {intimacyLevel <= 3 && '🌙 Subtle and elegant intimacy'}
              {intimacyLevel > 3 && intimacyLevel <= 6 && '💫 Sensual and artistic expression'}
              {intimacyLevel > 6 && intimacyLevel <= 8 && '🔥 Bold and expressive intimacy'}
              {intimacyLevel > 8 && '⚡ Maximum intimacy and artistic revelation'}
            </div>
          </div>
        </div>

        {/* Generate Actions */}
        <div style={{
          padding: '32px',
          backgroundColor: 'rgba(147, 51, 234, 0.1)',
          borderRadius: '16px',
          border: '2px solid rgba(147, 51, 234, 0.3)',
          textAlign: 'center'
        }}>
          {isReadyToGenerate && (
            <div style={{
              marginBottom: '20px',
              padding: '16px',
              backgroundColor: 'rgba(34, 197, 94, 0.15)',
              borderRadius: '12px',
              border: '1px solid rgba(34, 197, 94, 0.3)'
            }}>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#6EE7B7', marginBottom: '10px' }}>
                ✓ All Selections Complete!
              </h3>
              <div style={{ fontSize: '13px', color: '#D1FAE5', lineHeight: '1.8' }}>
                <div><strong>Model:</strong> {selectedModel?.name}</div>
                <div><strong>Wardrobe:</strong> {selectedWardrobe?.name}</div>
                <div><strong>Pose:</strong> {selectedPose?.poseName}</div>
                <div><strong>Camera:</strong> {selectedCamera?.name}</div>
                <div><strong>Place:</strong> {selectedEnvironment?.name}</div>
                <div><strong>Intimacy:</strong> {intimacyLevel}/10</div>
              </div>
            </div>
          )}

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={handleGenerate}
              disabled={!isReadyToGenerate}
              style={{
                padding: '18px 48px',
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
            >
              🎨 Generate Private Art
            </button>

            <button
              onClick={handleMigrate}
              disabled={!isReadyToGenerate}
              style={{
                padding: '18px 48px',
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
            >
              📋 Migrate to Main Mode
            </button>
          </div>
        </div>

        {/* Info Footer */}
        <div style={{ marginTop: '48px', padding: '24px', backgroundColor: 'rgba(147, 51, 234, 0.1)', border: '1px solid rgba(147, 51, 234, 0.3)', borderRadius: '12px' }}>
          <p style={{ color: '#F472B6', fontWeight: 'bold', marginBottom: '12px', fontSize: '15px' }}>
            🎨 Personal & Private Intimate Art Erotica Gallery
          </p>
          <div style={{ fontSize: '13px', color: '#D1D5DB', lineHeight: '1.8' }}>
            <p>
              This comprehensive selector allows you to create highly personalized intimate art photography by selecting every aspect of your scene:
            </p>
            <ul style={{ margin: '12px 0', paddingLeft: '20px' }}>
              <li><strong>15 Specialized Models:</strong> Choose from our expanded collection of Indian glamour specialists</li>
              <li><strong>Custom Wardrobes:</strong> Each model has 3 unique minimal attire options</li>
              <li><strong>Signature Poses:</strong> Select from model-specific poses or browse all available options</li>
              <li><strong>Professional Cameras:</strong> 6 preset camera configurations plus custom angle input</li>
              <li><strong>Places of Indulgence:</strong> Private intimate environments designed for ultimate privacy</li>
              <li><strong>Intimacy Control:</strong> Fine-tune the level of artistic revelation (1-10)</li>
            </ul>
            <p style={{ marginTop: '12px', fontStyle: 'italic', color: '#C084FC' }}>
              All content is generated as fine art photography with professional artistic intent, celebrating feminine beauty through glamour photography aesthetics.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndianModelsGallery;
