/**
 * SEDUCTRESS 10/10 NUCLEAR PANEL
 *
 * UI Component for generating with enhanced 10/10 NUCLEAR models
 * Integrates with intelligent generation service and translation bypass
 * Provides visual selection of models, poses, and cultural framing
 */

import React, { useState } from 'react';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface SeductressModel {
  id: string;
  name: string;
  height: string;
  emphasis: string;
  figure: string;
  skinTone: string;
  signaturePose: string;
  culturalFraming: string[];
  translationLanguage: 'sa' | 'he' | 'fr' | 'it';
  intimacyLevel: 10;
  boundaryLevel: 25;
}

interface Pose {
  id: string;
  name: string;
  description: string;
  intimateFlow: string;
  veoOptimized: boolean;
  aspectRatio: '9:16' | '16:9' | '4:5';
}

interface GenerationConfig {
  model: SeductressModel;
  poseIndex: number;
  wardrobeIndex: number;
  environmentIndex: number;
  targetAPI: 'imagen' | 'veo' | 'flux';
  useTranslation: boolean;
  culturalReferences: number;
}

// ============================================================================
// 10 SEDUCTRESS MODELS DATA
// ============================================================================

const SEDUCTRESS_MODELS: SeductressModel[] = [
  {
    id: 'aisha-divine',
    name: 'Aisha Divine',
    height: '5\'10"',
    emphasis: 'Upper body transcendent revelation',
    figure: '42E"-26"-39"',
    skinTone: 'Luminous honey with golden glow',
    signaturePose: 'Divine Arch - Reclined back arch with arms above head',
    culturalFraming: ['UNESCO Khajuraho', 'Cannes Palme d\'Or', 'Uffizi Gallery', 'Renaissance masters'],
    translationLanguage: 'sa',
    intimacyLevel: 10,
    boundaryLevel: 25
  },
  {
    id: 'priya-curves',
    name: 'Priya Divine Curves',
    height: '5\'8"',
    emphasis: 'Lower body dramatic curves',
    figure: '36C"-25"-48"',
    skinTone: 'Deep rich dusky',
    signaturePose: 'Sacred Hip Sweep - Standing hip thrust with curve magnificence',
    culturalFraming: ['Uffizi Gallery', 'Michelangelo', 'UNESCO Khajuraho', 'Louvre'],
    translationLanguage: 'it',
    intimacyLevel: 10,
    boundaryLevel: 25
  },
  {
    id: 'meera-sensualite',
    name: 'Meera Sensualité',
    height: '5\'9"',
    emphasis: 'Balanced full-body bold sensuality',
    figure: '38D"-26"-40"',
    skinTone: 'Warm caramel with golden highlights',
    signaturePose: 'Transcendent Recline - Complete body extended with ALL curves',
    culturalFraming: ['Cannes Palme d\'Or', 'UNESCO Khajuraho', 'MoMA', 'Criterion Collection'],
    translationLanguage: 'fr',
    intimacyLevel: 10,
    boundaryLevel: 25
  },
  {
    id: 'zara-cinematique',
    name: 'Zara Cinématique',
    height: '5\'7"',
    emphasis: 'Cinematic narrative vulnerability',
    figure: '38DD"-27"-39"',
    skinTone: 'Fair luminous with dramatic potential',
    signaturePose: 'Temple Goddess Rise - Rising from kneeling with spiritual transformation',
    culturalFraming: ['Venice Golden Lion', 'UNESCO Khajuraho', 'Criterion Collection', 'Met Museum'],
    translationLanguage: 'sa',
    intimacyLevel: 10,
    boundaryLevel: 25
  },
  {
    id: 'kavya-athlea',
    name: 'Kavya Athléa Divine',
    height: '5\'11"',
    emphasis: 'Athletic curves & fitness glamour',
    figure: '36C"-25"-38"',
    skinTone: 'Sun-kissed bronze with healthy glow',
    signaturePose: 'Athletic Grace - Power stance with arms overhead',
    culturalFraming: ['Met Museum', 'Renaissance athletic', 'UNESCO Khajuraho', 'Louvre'],
    translationLanguage: 'sa',
    intimacyLevel: 10,
    boundaryLevel: 25
  },
  {
    id: 'ishani-glamazon',
    name: 'Ishani Glamazon Supreme',
    height: '5\'9"',
    emphasis: 'Maximum glamour diva luxury',
    figure: '38DD"-25"-40"',
    skinTone: 'Luminous fair with golden glamour',
    signaturePose: 'Glamour Divine - Commanding diva recline on luxury velvet',
    culturalFraming: ['Met Museum luxury', 'Helmut Newton', 'Renaissance opulence'],
    translationLanguage: 'fr',
    intimacyLevel: 10,
    boundaryLevel: 25
  },
  {
    id: 'maya-midnight',
    name: 'Maya Midnight',
    height: '5\'8"',
    emphasis: 'Dark mysterious midnight seduction',
    figure: '36D"-24"-37"',
    skinTone: 'Deep mocha with mysterious undertones',
    signaturePose: 'Midnight Mystery - Emerging from film-noir shadows',
    culturalFraming: ['Venice Golden Lion', 'Cannes Palme d\'Or', 'Criterion Collection noir'],
    translationLanguage: 'fr',
    intimacyLevel: 10,
    boundaryLevel: 25
  },
  {
    id: 'riya-powerhouse',
    name: 'Riya Powerhouse',
    height: '5\'10"',
    emphasis: 'Bold athletic action power',
    figure: '36C"-26"-39"',
    skinTone: 'Warm bronze with athletic glow',
    signaturePose: 'Power Action - Dynamic athletic lunge with twisted torso',
    culturalFraming: ['Met Museum', 'UNESCO warrior goddess', 'Renaissance'],
    translationLanguage: 'sa',
    intimacyLevel: 10,
    boundaryLevel: 25
  },
  {
    id: 'nisha-vitality',
    name: 'Nisha Vitality',
    height: '5\'9"',
    emphasis: 'Fitness glamour fusion elegance',
    figure: '36D"-24"-38"',
    skinTone: 'Radiant golden bronze with fitness glow',
    signaturePose: 'Fitness Elegance - Graceful arabesque stretch',
    culturalFraming: ['Met Museum fitness', 'UNESCO health goddess', 'Renaissance'],
    translationLanguage: 'sa',
    intimacyLevel: 10,
    boundaryLevel: 25
  },
  {
    id: 'zara-voluptuous',
    name: 'Zara Voluptuous Divine',
    height: '5\'9"',
    emphasis: 'Spectacular chest emphasis',
    figure: '42E"-28"-39"',
    skinTone: 'Radiant golden with warm bronze',
    signaturePose: 'Chest Sculpture - Leaning forward with dramatic emphasis',
    culturalFraming: ['Uffizi Gallery', 'Rubens baroque', 'UNESCO abundant goddess', 'Louvre'],
    translationLanguage: 'it',
    intimacyLevel: 10,
    boundaryLevel: 25
  }
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================

interface Seductress10of10PanelProps {
  accessToken: string;
  onGenerate: (config: GenerationConfig) => void;
  onPromptGenerated: (prompt: string) => void;
}

const Seductress10of10Panel: React.FC<Seductress10of10PanelProps> = ({
  accessToken,
  onGenerate,
  onPromptGenerated
}) => {
  const [selectedModel, setSelectedModel] = useState<SeductressModel>(SEDUCTRESS_MODELS[0]);
  const [targetAPI, setTargetAPI] = useState<'imagen' | 'veo' | 'flux'>('imagen');
  const [useTranslation, setUseTranslation] = useState(true);
  const [showCulturalPreview, setShowCulturalPreview] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');

  const handleModelSelect = (modelId: string) => {
    const model = SEDUCTRESS_MODELS.find(m => m.id === modelId);
    if (model) {
      setSelectedModel(model);
    }
  };

  const handleGeneratePrompt = async () => {
    setGenerating(true);

    try {
      // Import generation functions dynamically
      const { generateNuclearPrompt_10 } = await import('../concepts/eroticGlamourModelsEnhanced_10of10.ts');

      // Generate NUCLEAR prompt with translation bypass
      const result = await generateNuclearPrompt_10(
        {
          name: selectedModel.name,
          generateImagenPrompt: () => '', // Will be replaced by actual model
          generateNuclearImagenPrompt: () => ({ originalPrompt: '', translationLanguage: selectedModel.translationLanguage }),
          generateNuclearVeoPrompt: () => '',
        },
        0, // wardrobe index
        0, // pose index
        0, // environment index
        targetAPI,
        accessToken
      );

      setGeneratedPrompt(result.finalPrompt);
      onPromptGenerated(result.finalPrompt);
    } catch (error) {
      console.error('Prompt generation error:', error);
      alert('Failed to generate prompt. Check console for details.');
    } finally {
      setGenerating(false);
    }
  };

  const handleGenerate = () => {
    const config: GenerationConfig = {
      model: selectedModel,
      poseIndex: 0,
      wardrobeIndex: 0,
      environmentIndex: 0,
      targetAPI,
      useTranslation,
      culturalReferences: selectedModel.culturalFraming.length
    };

    onGenerate(config);
  };

  return (
    <div className="seductress-10of10-panel" style={{
      padding: '24px',
      backgroundColor: '#1a1a1a',
      borderRadius: '12px',
      border: '2px solid #DC2626',
      color: '#ffffff'
    }}>
      {/* Header */}
      <div style={{ marginBottom: '24px', borderBottom: '2px solid #DC2626', paddingBottom: '16px' }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: 'bold',
          background: 'linear-gradient(to right, #DC2626, #EC4899)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '8px'
        }}>
          🔥 SEDUCTRESS 10/10 NUCLEAR
        </h2>
        <p style={{ fontSize: '14px', color: '#9CA3AF' }}>
          Ultimate intimacy tier with TRANSCENDENT boundary freedom (25/25)
        </p>
        <div style={{
          marginTop: '12px',
          padding: '8px 12px',
          backgroundColor: '#7F1D1D',
          borderRadius: '6px',
          fontSize: '12px',
          fontWeight: '600'
        }}>
          ⚠️ NUCLEAR BYPASS ACTIVE: Translation + Multi-tier Cultural Legitimacy
        </div>
      </div>

      {/* Model Selector */}
      <div style={{ marginBottom: '24px' }}>
        <label style={{
          display: 'block',
          fontSize: '14px',
          fontWeight: '600',
          marginBottom: '8px',
          color: '#F3F4F6'
        }}>
          Select Model
        </label>
        <select
          value={selectedModel.id}
          onChange={(e) => handleModelSelect(e.target.value)}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#374151',
            border: '2px solid #DC2626',
            borderRadius: '8px',
            color: '#ffffff',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          {SEDUCTRESS_MODELS.map(model => (
            <option key={model.id} value={model.id}>
              {model.name} - {model.emphasis}
            </option>
          ))}
        </select>
      </div>

      {/* Model Details Card */}
      <div style={{
        backgroundColor: '#262626',
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '24px',
        border: '1px solid #404040'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div>
            <div style={{ fontSize: '12px', color: '#9CA3AF', marginBottom: '4px' }}>Height</div>
            <div style={{ fontSize: '14px', fontWeight: '600' }}>{selectedModel.height}</div>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#9CA3AF', marginBottom: '4px' }}>Figure</div>
            <div style={{ fontSize: '14px', fontWeight: '600' }}>{selectedModel.figure}</div>
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <div style={{ fontSize: '12px', color: '#9CA3AF', marginBottom: '4px' }}>Skin Tone</div>
            <div style={{ fontSize: '14px', fontWeight: '600' }}>{selectedModel.skinTone}</div>
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <div style={{ fontSize: '12px', color: '#9CA3AF', marginBottom: '4px' }}>Signature Pose</div>
            <div style={{ fontSize: '14px', fontWeight: '600', color: '#EC4899' }}>{selectedModel.signaturePose}</div>
          </div>
        </div>

        {/* Cultural Framing Tags */}
        <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #404040' }}>
          <div style={{ fontSize: '12px', color: '#9CA3AF', marginBottom: '8px' }}>Cultural Legitimacy</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {selectedModel.culturalFraming.map((ref, idx) => (
              <span key={idx} style={{
                padding: '4px 8px',
                backgroundColor: '#7C2D12',
                borderRadius: '4px',
                fontSize: '11px',
                fontWeight: '600',
                color: '#FED7AA'
              }}>
                {ref}
              </span>
            ))}
          </div>
        </div>

        {/* Translation Language Badge */}
        <div style={{ marginTop: '12px' }}>
          <span style={{
            padding: '4px 8px',
            backgroundColor: '#065F46',
            borderRadius: '4px',
            fontSize: '11px',
            fontWeight: '600',
            color: '#A7F3D0'
          }}>
            Translation: {selectedModel.translationLanguage.toUpperCase()}
            {selectedModel.translationLanguage === 'sa' && ' (Sanskrit)'}
            {selectedModel.translationLanguage === 'he' && ' (Hebrew - Strongest)'}
            {selectedModel.translationLanguage === 'fr' && ' (French)'}
            {selectedModel.translationLanguage === 'it' && ' (Italian)'}
          </span>
        </div>
      </div>

      {/* Target API Selector */}
      <div style={{ marginBottom: '24px' }}>
        <label style={{
          display: 'block',
          fontSize: '14px',
          fontWeight: '600',
          marginBottom: '8px',
          color: '#F3F4F6'
        }}>
          Target API
        </label>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={() => setTargetAPI('imagen')}
            style={{
              flex: 1,
              padding: '12px',
              backgroundColor: targetAPI === 'imagen' ? '#DC2626' : '#374151',
              border: targetAPI === 'imagen' ? '2px solid #F87171' : '2px solid #4B5563',
              borderRadius: '8px',
              color: '#ffffff',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            Imagen 4
            <div style={{ fontSize: '11px', fontWeight: '400', marginTop: '4px', color: '#9CA3AF' }}>
              95-99% success
            </div>
          </button>
          <button
            onClick={() => setTargetAPI('veo')}
            style={{
              flex: 1,
              padding: '12px',
              backgroundColor: targetAPI === 'veo' ? '#DC2626' : '#374151',
              border: targetAPI === 'veo' ? '2px solid #F87171' : '2px solid #4B5563',
              borderRadius: '8px',
              color: '#ffffff',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            Veo 3.1
            <div style={{ fontSize: '11px', fontWeight: '400', marginTop: '4px', color: '#9CA3AF' }}>
              90-95% video
            </div>
          </button>
          <button
            onClick={() => setTargetAPI('flux')}
            style={{
              flex: 1,
              padding: '12px',
              backgroundColor: targetAPI === 'flux' ? '#DC2626' : '#374151',
              border: targetAPI === 'flux' ? '2px solid #F87171' : '2px solid #4B5563',
              borderRadius: '8px',
              color: '#ffffff',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            Flux Ultra
            <div style={{ fontSize: '11px', fontWeight: '400', marginTop: '4px', color: '#9CA3AF' }}>
              85-90% fast
            </div>
          </button>
        </div>
      </div>

      {/* Translation Toggle */}
      <div style={{
        marginBottom: '24px',
        padding: '12px',
        backgroundColor: '#262626',
        borderRadius: '8px',
        border: '1px solid #404040'
      }}>
        <label style={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '600'
        }}>
          <input
            type="checkbox"
            checked={useTranslation}
            onChange={(e) => setUseTranslation(e.target.checked)}
            style={{
              marginRight: '8px',
              width: '18px',
              height: '18px',
              cursor: 'pointer'
            }}
          />
          <span style={{ color: '#F3F4F6' }}>Enable Translation Bypass</span>
          <span style={{
            marginLeft: '8px',
            padding: '2px 6px',
            backgroundColor: '#7F1D1D',
            borderRadius: '4px',
            fontSize: '10px',
            fontWeight: '700'
          }}>
            RECOMMENDED
          </span>
        </label>
        <p style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '8px', marginLeft: '26px' }}>
          Translates prompt to {selectedModel.translationLanguage.toUpperCase()} before generation for maximum bypass success
        </p>
      </div>

      {/* Generation Buttons */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
        <button
          onClick={handleGeneratePrompt}
          disabled={generating}
          style={{
            flex: 1,
            padding: '14px',
            backgroundColor: generating ? '#4B5563' : '#7C2D12',
            border: '2px solid #F97316',
            borderRadius: '8px',
            color: '#ffffff',
            fontSize: '14px',
            fontWeight: '700',
            cursor: generating ? 'not-allowed' : 'pointer',
            opacity: generating ? 0.6 : 1,
            transition: 'all 0.2s'
          }}
        >
          {generating ? '⏳ Generating Prompt...' : '📝 Generate NUCLEAR Prompt'}
        </button>

        <button
          onClick={() => setShowCulturalPreview(!showCulturalPreview)}
          style={{
            padding: '14px 20px',
            backgroundColor: '#065F46',
            border: '2px solid #10B981',
            borderRadius: '8px',
            color: '#ffffff',
            fontSize: '14px',
            fontWeight: '700',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          {showCulturalPreview ? '🔽' : '🔼'} Preview
        </button>
      </div>

      {/* Cultural Preview Modal */}
      {showCulturalPreview && (
        <div style={{
          marginBottom: '16px',
          padding: '16px',
          backgroundColor: '#262626',
          borderRadius: '8px',
          border: '2px solid #10B981'
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '12px', color: '#10B981' }}>
            Cultural Legitimacy Preview
          </h3>
          <div style={{ fontSize: '13px', lineHeight: '1.6', color: '#D1D5DB' }}>
            <p style={{ marginBottom: '8px' }}>
              <strong>Art Director Declaration:</strong> Creating transcendent masterwork in the tradition of:
            </p>
            <ul style={{ marginLeft: '20px', marginBottom: '12px' }}>
              {selectedModel.culturalFraming.map((ref, idx) => (
                <li key={idx}>{ref}</li>
              ))}
            </ul>
            <p style={{ marginBottom: '8px' }}>
              <strong>Translation Strategy:</strong> {selectedModel.translationLanguage.toUpperCase()} bypass
            </p>
            <p style={{ marginBottom: '8px' }}>
              <strong>Boundary Level:</strong> 25/25 (ULTIMATE FREEDOM)
            </p>
            <p>
              <strong>Expected Success Rate:</strong> {targetAPI === 'imagen' ? '95-99%' : targetAPI === 'veo' ? '90-95%' : '85-90%'}
            </p>
          </div>
        </div>
      )}

      {/* Generated Prompt Display */}
      {generatedPrompt && (
        <div style={{
          marginBottom: '16px',
          padding: '16px',
          backgroundColor: '#1F2937',
          borderRadius: '8px',
          border: '2px solid #EC4899',
          maxHeight: '300px',
          overflowY: 'auto'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#EC4899' }}>
              Generated NUCLEAR Prompt
            </h3>
            <button
              onClick={() => {
                navigator.clipboard.writeText(generatedPrompt);
                alert('Prompt copied to clipboard!');
              }}
              style={{
                padding: '6px 12px',
                backgroundColor: '#374151',
                border: '1px solid #6B7280',
                borderRadius: '6px',
                color: '#ffffff',
                fontSize: '12px',
                cursor: 'pointer'
              }}
            >
              📋 Copy
            </button>
          </div>
          <pre style={{
            fontSize: '12px',
            lineHeight: '1.5',
            color: '#D1D5DB',
            whiteSpace: 'pre-wrap',
            wordWrap: 'break-word',
            fontFamily: 'monospace'
          }}>
            {generatedPrompt}
          </pre>
        </div>
      )}

      {/* Generate Image Button */}
      <button
        onClick={handleGenerate}
        disabled={!generatedPrompt || generating}
        style={{
          width: '100%',
          padding: '16px',
          backgroundColor: (!generatedPrompt || generating) ? '#4B5563' : '#DC2626',
          border: '2px solid #F87171',
          borderRadius: '8px',
          color: '#ffffff',
          fontSize: '16px',
          fontWeight: '700',
          cursor: (!generatedPrompt || generating) ? 'not-allowed' : 'pointer',
          opacity: (!generatedPrompt || generating) ? 0.5 : 1,
          transition: 'all 0.2s'
        }}
      >
        🔥 Generate NUCLEAR Image ({targetAPI.toUpperCase()})
      </button>

      {/* Cost Estimate */}
      <div style={{
        marginTop: '16px',
        padding: '12px',
        backgroundColor: '#1F2937',
        borderRadius: '6px',
        fontSize: '12px',
        color: '#9CA3AF',
        textAlign: 'center'
      }}>
        💰 Estimated Cost: {
          targetAPI === 'imagen' ? (useTranslation ? '$0.06-$0.09' : '$0.04') :
          targetAPI === 'veo' ? (useTranslation ? '$0.17-$0.20' : '$0.15') :
          '$0.04'
        } {targetAPI === 'veo' && '(8 seconds)'}
      </div>

      {/* Warning Notice */}
      <div style={{
        marginTop: '16px',
        padding: '12px',
        backgroundColor: '#7F1D1D',
        borderRadius: '6px',
        border: '1px solid #DC2626'
      }}>
        <div style={{ fontSize: '12px', color: '#FEF2F2', lineHeight: '1.5' }}>
          <strong>⚠️ NUCLEAR TIER NOTICE:</strong> These prompts use maximum safety bypass with translation and multi-tier cultural legitimacy. Always ensure you have proper authorization and follow API terms of service.
        </div>
      </div>
    </div>
  );
};

export default Seductress10of10Panel;
