import React, { useState, useEffect, useCallback } from 'react';
import {
  INDIAN_HOURGLASS_MUSE,
  MUSE_LOCATIONS,
  MUSE_WARDROBE,
  MUSE_POSES,
  generateMusePrompt,
  PHOTOGRAPHY_STYLES,
  MUSE_COLLECTION_PRESETS
} from '../vera/indianHourglassMuseCollection';
import { imagenMusePromptLibrary, MUSE_COLLECTION_INFO } from '../concepts/imagenMusePromptLibrary';

interface MuseExperimentalModeProps {
  onGenerateImage: (prompt: string, settings: any) => Promise<void>;
  isActive?: boolean;
}

const MuseExperimentalMode: React.FC<MuseExperimentalModeProps> = ({
  onGenerateImage,
  isActive = false
}) => {
  // Advanced experimental states
  const [lightingExperiment, setLightingExperiment] = useState({
    primary: 'natural',
    secondary: 'none',
    intensity: 70,
    colorTemp: 5500,
    shadowSoftness: 50
  });

  const [compositionExperiment, setCompositionExperiment] = useState({
    rule: 'thirds',
    angle: 'eye_level',
    focalLength: 50,
    depth: 'shallow',
    bokehStyle: 'circular'
  });

  const [colorGradeExperiment, setColorGradeExperiment] = useState({
    style: 'cinematic',
    saturation: 100,
    contrast: 100,
    highlights: 0,
    shadows: 0,
    temperature: 0,
    tint: 0
  });

  const [fabricPhysics, setFabricPhysics] = useState({
    windEffect: 0,
    gravity: 100,
    wetness: 0,
    transparency: 0,
    reflectivity: 30
  });

  const [environmentBlend, setEnvironmentBlend] = useState({
    fogDensity: 0,
    particlesInAir: 'none',
    weatherEffect: 'clear',
    timeBlend: false,
    doubleExposure: false
  });

  // Multi-location blend experiment
  const [locationBlend, setLocationBlend] = useState<{
    primary: string | null;
    secondary: string | null;
    blendRatio: number;
  }>({
    primary: null,
    secondary: null,
    blendRatio: 50
  });

  // Wardrobe layering experiment
  const [wardrobeLayering, setWardrobeLayering] = useState<{
    base: string | null;
    overlay: string | null;
    transparency: number;
  }>({
    base: null,
    overlay: null,
    transparency: 50
  });

  // Pose morphing experiment
  const [poseMorphing, setPoseMorphing] = useState<{
    poseA: string | null;
    poseB: string | null;
    morphPercentage: number;
  }>({
    poseA: null,
    poseB: null,
    morphPercentage: 50
  });

  // AI variation parameters
  const [aiVariation, setAiVariation] = useState({
    creativity: 50,
    adherence: 50,
    surprise: 0,
    artisticLiberty: 30
  });

  const [activeExperiment, setActiveExperiment] = useState<
    'lighting' | 'composition' | 'colorGrade' | 'fabric' | 'environment' | 'blend' | 'ai'
  >('lighting');

  const [isGenerating, setIsGenerating] = useState(false);
  const [previewPrompt, setPreviewPrompt] = useState('');

  // Generate experimental prompt
  const generateExperimentalPrompt = useCallback(() => {
    let basePrompt = `EXPERIMENTAL ARTISTIC GENERATION:

Subject: ${INDIAN_HOURGLASS_MUSE.name}
Measurements: ${INDIAN_HOURGLASS_MUSE.measurements.bust}-${INDIAN_HOURGLASS_MUSE.measurements.waist}-${INDIAN_HOURGLASS_MUSE.measurements.hips}
Height: ${INDIAN_HOURGLASS_MUSE.measurements.height}
`;

    // Add lighting experiments
    if (activeExperiment === 'lighting') {
      basePrompt += `

EXPERIMENTAL LIGHTING SETUP:
Primary Light: ${lightingExperiment.primary} at ${lightingExperiment.intensity}% intensity
Secondary Light: ${lightingExperiment.secondary}
Color Temperature: ${lightingExperiment.colorTemp}K
Shadow Softness: ${lightingExperiment.shadowSoftness}%
Creating dramatic interplay of light and shadow with experimental techniques.`;
    }

    // Add composition experiments
    if (activeExperiment === 'composition') {
      basePrompt += `

EXPERIMENTAL COMPOSITION:
Compositional Rule: ${compositionExperiment.rule}
Camera Angle: ${compositionExperiment.angle}
Focal Length: ${compositionExperiment.focalLength}mm
Depth of Field: ${compositionExperiment.depth}
Bokeh Style: ${compositionExperiment.bokehStyle} bokeh effect
Revolutionary framing breaking traditional boundaries.`;
    }

    // Add color grading experiments
    if (activeExperiment === 'colorGrade') {
      basePrompt += `

EXPERIMENTAL COLOR GRADING:
Style: ${colorGradeExperiment.style}
Saturation: ${colorGradeExperiment.saturation}%
Contrast: ${colorGradeExperiment.contrast}%
Highlights: ${colorGradeExperiment.highlights > 0 ? '+' : ''}${colorGradeExperiment.highlights}
Shadows: ${colorGradeExperiment.shadows > 0 ? '+' : ''}${colorGradeExperiment.shadows}
Temperature Shift: ${colorGradeExperiment.temperature > 0 ? '+' : ''}${colorGradeExperiment.temperature}
Pushing color science boundaries for artistic effect.`;
    }

    // Add fabric physics experiments
    if (activeExperiment === 'fabric') {
      basePrompt += `

EXPERIMENTAL FABRIC PHYSICS:
Wind Effect: ${fabricPhysics.windEffect}% movement
Gravity Influence: ${fabricPhysics.gravity}%
Wetness: ${fabricPhysics.wetness}% wet fabric effect
Transparency: ${fabricPhysics.transparency}% see-through
Reflectivity: ${fabricPhysics.reflectivity}% light reflection
Fabric behaving with experimental physics properties.`;
    }

    // Add environment blend experiments
    if (activeExperiment === 'environment') {
      basePrompt += `

EXPERIMENTAL ENVIRONMENT:
Fog Density: ${environmentBlend.fogDensity}%
Particles: ${environmentBlend.particlesInAir}
Weather: ${environmentBlend.weatherEffect}
${environmentBlend.timeBlend ? 'Time-blended exposure showing motion trails' : ''}
${environmentBlend.doubleExposure ? 'Double exposure technique with ghosting effects' : ''}
Surreal environmental manipulation.`;
    }

    // Add location blending
    if (activeExperiment === 'blend' && locationBlend.primary && locationBlend.secondary) {
      const loc1 = MUSE_LOCATIONS.find(l => l.id === locationBlend.primary);
      const loc2 = MUSE_LOCATIONS.find(l => l.id === locationBlend.secondary);
      if (loc1 && loc2) {
        basePrompt += `

EXPERIMENTAL LOCATION BLEND:
Primary Location (${locationBlend.blendRatio}%): ${loc1.name} - ${loc1.description}
Secondary Location (${100 - locationBlend.blendRatio}%): ${loc2.name} - ${loc2.description}
Surreal merging of two distinct environments into one dreamlike space.`;
      }
    }

    // Add AI variation parameters
    if (activeExperiment === 'ai') {
      basePrompt += `

AI CREATIVE PARAMETERS:
Creativity Level: ${aiVariation.creativity}% (allowing AI to interpret creatively)
Prompt Adherence: ${aiVariation.adherence}% (balance between instruction and interpretation)
Surprise Element: ${aiVariation.surprise}% (unexpected artistic choices)
Artistic Liberty: ${aiVariation.artisticLiberty}% (freedom in artistic execution)
Experimental AI-driven artistic interpretation pushing boundaries.`;
    }

    // Add wardrobe layering if configured
    if (wardrobeLayering.base && wardrobeLayering.overlay) {
      const baseWard = MUSE_WARDROBE.find(w => w.id === wardrobeLayering.base);
      const overlayWard = MUSE_WARDROBE.find(w => w.id === wardrobeLayering.overlay);
      if (baseWard && overlayWard) {
        basePrompt += `

WARDROBE LAYERING EXPERIMENT:
Base Layer: ${baseWard.name}
Overlay Layer: ${overlayWard.name} at ${wardrobeLayering.transparency}% transparency
Creating impossible fashion through digital layering.`;
      }
    }

    // Add pose morphing if configured
    if (poseMorphing.poseA && poseMorphing.poseB) {
      const poseA = MUSE_POSES.find(p => p.id === poseMorphing.poseA);
      const poseB = MUSE_POSES.find(p => p.id === poseMorphing.poseB);
      if (poseA && poseB) {
        basePrompt += `

POSE MORPHING EXPERIMENT:
Pose A (${100 - poseMorphing.morphPercentage}%): ${poseA.name}
Pose B (${poseMorphing.morphPercentage}%): ${poseB.name}
Creating impossible transitional pose between two positions.`;
      }
    }

    basePrompt += `

Shot with experimental techniques, pushing the boundaries of digital photography and AI-generated art.
Ultra-high resolution, experimental post-processing, artistic breakthrough.`;

    setPreviewPrompt(basePrompt);
    return basePrompt;
  }, [
    activeExperiment,
    lightingExperiment,
    compositionExperiment,
    colorGradeExperiment,
    fabricPhysics,
    environmentBlend,
    locationBlend,
    wardrobeLayering,
    poseMorphing,
    aiVariation
  ]);

  useEffect(() => {
    if (isActive) {
      generateExperimentalPrompt();
    }
  }, [isActive, generateExperimentalPrompt]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const prompt = generateExperimentalPrompt();
      const settings = {
        aspectRatio: '3:4',
        personGeneration: 'allow_adult',
        safetyFilter: 'block_few',
        model: 'imagen-3.0-generate-001',
        sampleCount: 1,
        experimental: true
      };
      await onGenerateImage(prompt, settings);
    } catch (error) {
      console.error('Experimental generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-gray-900 rounded-xl p-6 space-y-6">
      {/* Header */}
      <div className="border-b border-gray-700 pb-4">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Muse Experimental Laboratory
        </h2>
        <p className="text-sm text-gray-400 mt-2">
          Push the boundaries of AI-generated art with experimental parameters
        </p>
      </div>

      {/* Experiment Tabs */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'lighting', label: '💡 Lighting', color: 'amber' },
          { id: 'composition', label: '📐 Composition', color: 'blue' },
          { id: 'colorGrade', label: '🎨 Color Grade', color: 'purple' },
          { id: 'fabric', label: '🧵 Fabric Physics', color: 'pink' },
          { id: 'environment', label: '🌫️ Environment', color: 'green' },
          { id: 'blend', label: '🔀 Blending', color: 'orange' },
          { id: 'ai', label: '🤖 AI Variation', color: 'red' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveExperiment(tab.id as any)}
            className={`
              px-4 py-2 rounded-lg font-semibold transition-all
              ${activeExperiment === tab.id
                ? `bg-${tab.color}-600 text-white`
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }
            `}
            style={activeExperiment === tab.id ? {
              backgroundColor: tab.color === 'amber' ? '#d97706' :
                              tab.color === 'blue' ? '#2563eb' :
                              tab.color === 'purple' ? '#9333ea' :
                              tab.color === 'pink' ? '#ec4899' :
                              tab.color === 'green' ? '#10b981' :
                              tab.color === 'orange' ? '#f97316' : '#ef4444'
            } : {}}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Experiment Controls */}
      <div className="bg-gray-800/50 rounded-lg p-6 space-y-4">
        {/* Lighting Controls */}
        {activeExperiment === 'lighting' && (
          <div className="space-y-4">
            <h3 className="font-semibold text-amber-400 mb-3">Lighting Experiment</h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-400">Primary Light</label>
                <select
                  value={lightingExperiment.primary}
                  onChange={(e) => setLightingExperiment({...lightingExperiment, primary: e.target.value})}
                  className="w-full mt-1 px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-gray-200"
                >
                  <option value="natural">Natural Sunlight</option>
                  <option value="studio">Studio Strobe</option>
                  <option value="neon">Neon Glow</option>
                  <option value="candlelight">Candlelight</option>
                  <option value="moonlight">Moonlight</option>
                  <option value="underwater">Underwater</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-gray-400">Secondary Light</label>
                <select
                  value={lightingExperiment.secondary}
                  onChange={(e) => setLightingExperiment({...lightingExperiment, secondary: e.target.value})}
                  className="w-full mt-1 px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-gray-200"
                >
                  <option value="none">None</option>
                  <option value="fill">Fill Light</option>
                  <option value="rim">Rim Light</option>
                  <option value="background">Background Light</option>
                  <option value="colored_gel">Colored Gel</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-400">
                Intensity: {lightingExperiment.intensity}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={lightingExperiment.intensity}
                onChange={(e) => setLightingExperiment({...lightingExperiment, intensity: Number(e.target.value)})}
                className="w-full mt-1"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400">
                Color Temperature: {lightingExperiment.colorTemp}K
              </label>
              <input
                type="range"
                min="2000"
                max="10000"
                step="100"
                value={lightingExperiment.colorTemp}
                onChange={(e) => setLightingExperiment({...lightingExperiment, colorTemp: Number(e.target.value)})}
                className="w-full mt-1"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400">
                Shadow Softness: {lightingExperiment.shadowSoftness}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={lightingExperiment.shadowSoftness}
                onChange={(e) => setLightingExperiment({...lightingExperiment, shadowSoftness: Number(e.target.value)})}
                className="w-full mt-1"
              />
            </div>
          </div>
        )}

        {/* Composition Controls */}
        {activeExperiment === 'composition' && (
          <div className="space-y-4">
            <h3 className="font-semibold text-blue-400 mb-3">Composition Experiment</h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-400">Compositional Rule</label>
                <select
                  value={compositionExperiment.rule}
                  onChange={(e) => setCompositionExperiment({...compositionExperiment, rule: e.target.value})}
                  className="w-full mt-1 px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-gray-200"
                >
                  <option value="thirds">Rule of Thirds</option>
                  <option value="golden">Golden Ratio</option>
                  <option value="centered">Centered</option>
                  <option value="diagonal">Diagonal</option>
                  <option value="spiral">Fibonacci Spiral</option>
                  <option value="asymmetric">Asymmetric Balance</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-gray-400">Camera Angle</label>
                <select
                  value={compositionExperiment.angle}
                  onChange={(e) => setCompositionExperiment({...compositionExperiment, angle: e.target.value})}
                  className="w-full mt-1 px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-gray-200"
                >
                  <option value="eye_level">Eye Level</option>
                  <option value="low_angle">Low Angle</option>
                  <option value="high_angle">High Angle</option>
                  <option value="dutch">Dutch Angle</option>
                  <option value="birds_eye">Bird's Eye</option>
                  <option value="worms_eye">Worm's Eye</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-400">
                Focal Length: {compositionExperiment.focalLength}mm
              </label>
              <input
                type="range"
                min="14"
                max="200"
                value={compositionExperiment.focalLength}
                onChange={(e) => setCompositionExperiment({...compositionExperiment, focalLength: Number(e.target.value)})}
                className="w-full mt-1"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-400">Depth of Field</label>
                <select
                  value={compositionExperiment.depth}
                  onChange={(e) => setCompositionExperiment({...compositionExperiment, depth: e.target.value})}
                  className="w-full mt-1 px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-gray-200"
                >
                  <option value="shallow">Shallow (Blurred Background)</option>
                  <option value="medium">Medium</option>
                  <option value="deep">Deep (Everything in Focus)</option>
                  <option value="tilt_shift">Tilt-Shift Effect</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-gray-400">Bokeh Style</label>
                <select
                  value={compositionExperiment.bokehStyle}
                  onChange={(e) => setCompositionExperiment({...compositionExperiment, bokehStyle: e.target.value})}
                  className="w-full mt-1 px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-gray-200"
                >
                  <option value="circular">Circular</option>
                  <option value="hexagonal">Hexagonal</option>
                  <option value="swirly">Swirly</option>
                  <option value="cateye">Cat Eye</option>
                  <option value="smooth">Smooth Cream</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Color Grade Controls */}
        {activeExperiment === 'colorGrade' && (
          <div className="space-y-4">
            <h3 className="font-semibold text-purple-400 mb-3">Color Grading Experiment</h3>

            <div>
              <label className="text-sm text-gray-400">Grading Style</label>
              <select
                value={colorGradeExperiment.style}
                onChange={(e) => setColorGradeExperiment({...colorGradeExperiment, style: e.target.value})}
                className="w-full mt-1 px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-gray-200"
              >
                <option value="cinematic">Cinematic</option>
                <option value="vintage">Vintage Film</option>
                <option value="cyberpunk">Cyberpunk Neon</option>
                <option value="pastel">Soft Pastel</option>
                <option value="noir">Film Noir</option>
                <option value="cross_process">Cross Process</option>
                <option value="bleach_bypass">Bleach Bypass</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-400">
                  Saturation: {colorGradeExperiment.saturation}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={colorGradeExperiment.saturation}
                  onChange={(e) => setColorGradeExperiment({...colorGradeExperiment, saturation: Number(e.target.value)})}
                  className="w-full mt-1"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400">
                  Contrast: {colorGradeExperiment.contrast}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={colorGradeExperiment.contrast}
                  onChange={(e) => setColorGradeExperiment({...colorGradeExperiment, contrast: Number(e.target.value)})}
                  className="w-full mt-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-400">
                  Highlights: {colorGradeExperiment.highlights > 0 ? '+' : ''}{colorGradeExperiment.highlights}
                </label>
                <input
                  type="range"
                  min="-100"
                  max="100"
                  value={colorGradeExperiment.highlights}
                  onChange={(e) => setColorGradeExperiment({...colorGradeExperiment, highlights: Number(e.target.value)})}
                  className="w-full mt-1"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400">
                  Shadows: {colorGradeExperiment.shadows > 0 ? '+' : ''}{colorGradeExperiment.shadows}
                </label>
                <input
                  type="range"
                  min="-100"
                  max="100"
                  value={colorGradeExperiment.shadows}
                  onChange={(e) => setColorGradeExperiment({...colorGradeExperiment, shadows: Number(e.target.value)})}
                  className="w-full mt-1"
                />
              </div>
            </div>
          </div>
        )}

        {/* Fabric Physics Controls */}
        {activeExperiment === 'fabric' && (
          <div className="space-y-4">
            <h3 className="font-semibold text-pink-400 mb-3">Fabric Physics Experiment</h3>

            <div>
              <label className="text-sm text-gray-400">
                Wind Effect: {fabricPhysics.windEffect}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={fabricPhysics.windEffect}
                onChange={(e) => setFabricPhysics({...fabricPhysics, windEffect: Number(e.target.value)})}
                className="w-full mt-1"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400">
                Gravity Influence: {fabricPhysics.gravity}%
              </label>
              <input
                type="range"
                min="0"
                max="150"
                value={fabricPhysics.gravity}
                onChange={(e) => setFabricPhysics({...fabricPhysics, gravity: Number(e.target.value)})}
                className="w-full mt-1"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400">
                Wetness Effect: {fabricPhysics.wetness}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={fabricPhysics.wetness}
                onChange={(e) => setFabricPhysics({...fabricPhysics, wetness: Number(e.target.value)})}
                className="w-full mt-1"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400">
                Transparency: {fabricPhysics.transparency}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={fabricPhysics.transparency}
                onChange={(e) => setFabricPhysics({...fabricPhysics, transparency: Number(e.target.value)})}
                className="w-full mt-1"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400">
                Reflectivity: {fabricPhysics.reflectivity}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={fabricPhysics.reflectivity}
                onChange={(e) => setFabricPhysics({...fabricPhysics, reflectivity: Number(e.target.value)})}
                className="w-full mt-1"
              />
            </div>
          </div>
        )}

        {/* Environment Controls */}
        {activeExperiment === 'environment' && (
          <div className="space-y-4">
            <h3 className="font-semibold text-green-400 mb-3">Environment Experiment</h3>

            <div>
              <label className="text-sm text-gray-400">
                Fog Density: {environmentBlend.fogDensity}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={environmentBlend.fogDensity}
                onChange={(e) => setEnvironmentBlend({...environmentBlend, fogDensity: Number(e.target.value)})}
                className="w-full mt-1"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400">Particles in Air</label>
              <select
                value={environmentBlend.particlesInAir}
                onChange={(e) => setEnvironmentBlend({...environmentBlend, particlesInAir: e.target.value})}
                className="w-full mt-1 px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-gray-200"
              >
                <option value="none">None</option>
                <option value="dust">Dust Motes</option>
                <option value="rain">Rain Drops</option>
                <option value="snow">Snowflakes</option>
                <option value="fireflies">Fireflies</option>
                <option value="bubbles">Bubbles</option>
                <option value="petals">Flower Petals</option>
                <option value="sparks">Sparks</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-400">Weather Effect</label>
              <select
                value={environmentBlend.weatherEffect}
                onChange={(e) => setEnvironmentBlend({...environmentBlend, weatherEffect: e.target.value})}
                className="w-full mt-1 px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-gray-200"
              >
                <option value="clear">Clear</option>
                <option value="misty">Misty</option>
                <option value="rainy">Rainy</option>
                <option value="stormy">Stormy</option>
                <option value="snowy">Snowy</option>
                <option value="foggy">Foggy</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={environmentBlend.timeBlend}
                  onChange={(e) => setEnvironmentBlend({...environmentBlend, timeBlend: e.target.checked})}
                  className="rounded"
                />
                <span className="text-sm text-gray-400">Time Blend (Motion Trails)</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={environmentBlend.doubleExposure}
                  onChange={(e) => setEnvironmentBlend({...environmentBlend, doubleExposure: e.target.checked})}
                  className="rounded"
                />
                <span className="text-sm text-gray-400">Double Exposure Effect</span>
              </label>
            </div>
          </div>
        )}

        {/* Blending Controls */}
        {activeExperiment === 'blend' && (
          <div className="space-y-4">
            <h3 className="font-semibold text-orange-400 mb-3">Blending Experiments</h3>

            {/* Location Blending */}
            <div className="p-4 bg-gray-900/50 rounded-lg space-y-3">
              <h4 className="text-sm font-medium text-gray-300">Location Blending</h4>

              <div>
                <label className="text-sm text-gray-400">Primary Location</label>
                <select
                  value={locationBlend.primary || ''}
                  onChange={(e) => setLocationBlend({...locationBlend, primary: e.target.value})}
                  className="w-full mt-1 px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-gray-200 text-sm"
                >
                  <option value="">Select Primary Location</option>
                  {MUSE_LOCATIONS.map(loc => (
                    <option key={loc.id} value={loc.id}>{loc.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm text-gray-400">Secondary Location</label>
                <select
                  value={locationBlend.secondary || ''}
                  onChange={(e) => setLocationBlend({...locationBlend, secondary: e.target.value})}
                  className="w-full mt-1 px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-gray-200 text-sm"
                >
                  <option value="">Select Secondary Location</option>
                  {MUSE_LOCATIONS.map(loc => (
                    <option key={loc.id} value={loc.id}>{loc.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm text-gray-400">
                  Blend Ratio: {locationBlend.blendRatio}% / {100 - locationBlend.blendRatio}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={locationBlend.blendRatio}
                  onChange={(e) => setLocationBlend({...locationBlend, blendRatio: Number(e.target.value)})}
                  className="w-full mt-1"
                />
              </div>
            </div>

            {/* Wardrobe Layering */}
            <div className="p-4 bg-gray-900/50 rounded-lg space-y-3">
              <h4 className="text-sm font-medium text-gray-300">Wardrobe Layering</h4>

              <div>
                <label className="text-sm text-gray-400">Base Layer</label>
                <select
                  value={wardrobeLayering.base || ''}
                  onChange={(e) => setWardrobeLayering({...wardrobeLayering, base: e.target.value})}
                  className="w-full mt-1 px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-gray-200 text-sm"
                >
                  <option value="">Select Base Wardrobe</option>
                  {MUSE_WARDROBE.map(w => (
                    <option key={w.id} value={w.id}>{w.name} (Level {w.intimacyLevel})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm text-gray-400">Overlay Layer</label>
                <select
                  value={wardrobeLayering.overlay || ''}
                  onChange={(e) => setWardrobeLayering({...wardrobeLayering, overlay: e.target.value})}
                  className="w-full mt-1 px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-gray-200 text-sm"
                >
                  <option value="">Select Overlay Wardrobe</option>
                  {MUSE_WARDROBE.map(w => (
                    <option key={w.id} value={w.id}>{w.name} (Level {w.intimacyLevel})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm text-gray-400">
                  Overlay Transparency: {wardrobeLayering.transparency}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={wardrobeLayering.transparency}
                  onChange={(e) => setWardrobeLayering({...wardrobeLayering, transparency: Number(e.target.value)})}
                  className="w-full mt-1"
                />
              </div>
            </div>

            {/* Pose Morphing */}
            <div className="p-4 bg-gray-900/50 rounded-lg space-y-3">
              <h4 className="text-sm font-medium text-gray-300">Pose Morphing</h4>

              <div>
                <label className="text-sm text-gray-400">Pose A</label>
                <select
                  value={poseMorphing.poseA || ''}
                  onChange={(e) => setPoseMorphing({...poseMorphing, poseA: e.target.value})}
                  className="w-full mt-1 px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-gray-200 text-sm"
                >
                  <option value="">Select First Pose</option>
                  {MUSE_POSES.map(p => (
                    <option key={p.id} value={p.id}>{p.name} (Level {p.intimacyLevel})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm text-gray-400">Pose B</label>
                <select
                  value={poseMorphing.poseB || ''}
                  onChange={(e) => setPoseMorphing({...poseMorphing, poseB: e.target.value})}
                  className="w-full mt-1 px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-gray-200 text-sm"
                >
                  <option value="">Select Second Pose</option>
                  {MUSE_POSES.map(p => (
                    <option key={p.id} value={p.id}>{p.name} (Level {p.intimacyLevel})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm text-gray-400">
                  Morph: {100 - poseMorphing.morphPercentage}% A / {poseMorphing.morphPercentage}% B
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={poseMorphing.morphPercentage}
                  onChange={(e) => setPoseMorphing({...poseMorphing, morphPercentage: Number(e.target.value)})}
                  className="w-full mt-1"
                />
              </div>
            </div>
          </div>
        )}

        {/* AI Variation Controls */}
        {activeExperiment === 'ai' && (
          <div className="space-y-4">
            <h3 className="font-semibold text-red-400 mb-3">AI Variation Parameters</h3>

            <div>
              <label className="text-sm text-gray-400">
                Creativity Level: {aiVariation.creativity}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={aiVariation.creativity}
                onChange={(e) => setAiVariation({...aiVariation, creativity: Number(e.target.value)})}
                className="w-full mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">Higher values allow more creative interpretation</p>
            </div>

            <div>
              <label className="text-sm text-gray-400">
                Prompt Adherence: {aiVariation.adherence}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={aiVariation.adherence}
                onChange={(e) => setAiVariation({...aiVariation, adherence: Number(e.target.value)})}
                className="w-full mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">Balance between following instructions and artistic freedom</p>
            </div>

            <div>
              <label className="text-sm text-gray-400">
                Surprise Element: {aiVariation.surprise}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={aiVariation.surprise}
                onChange={(e) => setAiVariation({...aiVariation, surprise: Number(e.target.value)})}
                className="w-full mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">Chance of unexpected artistic choices</p>
            </div>

            <div>
              <label className="text-sm text-gray-400">
                Artistic Liberty: {aiVariation.artisticLiberty}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={aiVariation.artisticLiberty}
                onChange={(e) => setAiVariation({...aiVariation, artisticLiberty: Number(e.target.value)})}
                className="w-full mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">Freedom in artistic execution and style</p>
            </div>
          </div>
        )}
      </div>

      {/* Prompt Preview */}
      <div className="bg-gray-800/30 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-300">Generated Experimental Prompt</h3>
          <button
            onClick={() => navigator.clipboard.writeText(previewPrompt)}
            className="text-xs px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded text-gray-300"
          >
            Copy
          </button>
        </div>
        <div className="text-xs text-gray-400 font-mono max-h-32 overflow-y-auto whitespace-pre-wrap">
          {previewPrompt || 'Configure experiment parameters to generate prompt...'}
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        disabled={isGenerating}
        className={`
          w-full py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2
          ${isGenerating
            ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 hover:from-cyan-500 hover:via-purple-500 hover:to-pink-500 text-white'
          }
        `}
      >
        {isGenerating ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            Experimenting...
          </>
        ) : (
          <>
            <span>🧪</span>
            Generate Experimental Art
          </>
        )}
      </button>

      {/* Info Panel */}
      <div className="bg-amber-900/20 border border-amber-500/30 rounded-lg p-4">
        <div className="flex gap-2">
          <span className="text-amber-400">⚠️</span>
          <div className="text-xs text-amber-300">
            <p className="font-semibold mb-1">Experimental Mode Active</p>
            <p>These parameters push AI boundaries and may produce unexpected results. Each generation is a unique artistic experiment.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MuseExperimentalMode;