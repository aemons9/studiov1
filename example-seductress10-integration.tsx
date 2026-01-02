/**
 * EXAMPLE: Complete Integration of Seductress 10/10 NUCLEAR Panel
 *
 * This file demonstrates how to integrate the SEDUCTRESS 10/10 component
 * into your existing App.tsx with full functionality
 *
 * Copy the relevant sections into your actual App.tsx
 */

import React, { useState } from 'react';
import Seductress10of10Panel from './components/Seductress10of10Panel';
import { generateSeductress10, type Seductress10Config, type Seductress10Result } from './services/seductress10of10Service';

// ============================================================================
// EXAMPLE APP COMPONENT
// ============================================================================

function ExampleApp() {
  // Existing state from your App.tsx
  const [currentMode, setCurrentMode] = useState<'classic' | 'artistic' | 'corporate' | 'seductress10'>('classic');
  const [mainToken, setMainToken] = useState<string>('');
  const [generating, setGenerating] = useState(false);
  const [currentImage, setCurrentImage] = useState<string>('');
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [lastGeneratedPrompt, setLastGeneratedPrompt] = useState<string>('');
  const [generationResults, setGenerationResults] = useState<Seductress10Result[]>([]);

  // ============================================================================
  // SEDUCTRESS 10/10 HANDLERS
  // ============================================================================

  const handleSeductress10Generate = async (config: any) => {
    try {
      console.log('🔥 Starting SEDUCTRESS 10/10 NUCLEAR generation');
      console.log('📊 Config:', config);

      // Show loading state
      setGenerating(true);
      setCurrentImage('');

      // Build NUCLEAR configuration
      const seductressConfig: Seductress10Config = {
        modelId: config.model.id,
        modelName: config.model.name,
        poseIndex: config.poseIndex || 0,
        wardrobeIndex: config.wardrobeIndex || 0,
        environmentIndex: config.environmentIndex || 0,
        targetAPI: config.targetAPI,
        useTranslation: config.useTranslation,
        translationLanguage: config.model.translationLanguage,
        culturalFraming: config.model.culturalFraming,
        intimacyLevel: 10,
        boundaryLevel: 25
      };

      // Generate with NUCLEAR service
      console.log('🚀 Calling generateSeductress10...');
      const result = await generateSeductress10(seductressConfig, mainToken);

      console.log('📥 Generation result:', result);

      if (result.success) {
        console.log('✅ NUCLEAR generation successful!');
        console.log('📊 Strategies used:', result.strategies.join(', '));
        console.log('💰 Cost: $' + result.cost.toFixed(2));
        console.log('🌐 Used translation:', result.usedTranslation);
        console.log('🎨 Cultural justification:', result.culturalJustification);

        // Handle images
        if (result.images && result.images.length > 0) {
          console.log(`🖼️ Got ${result.images.length} images`);
          setCurrentImage(result.images[0]);
          setGeneratedImages(result.images);

          // Show success notification
          const message = `✅ NUCLEAR Generation Successful!\n\n` +
            `Model: ${config.model.name}\n` +
            `API: ${config.targetAPI.toUpperCase()}\n` +
            `Images: ${result.images.length}\n` +
            `Strategies: ${result.strategies.join(', ')}\n` +
            `Translation: ${result.usedTranslation ? 'YES (' + config.model.translationLanguage.toUpperCase() + ')' : 'NO'}\n` +
            `Cost: $${result.cost.toFixed(2)}\n` +
            `Cultural: ${result.culturalJustification}`;

          alert(message);
        }

        // Handle video (Veo)
        if (result.operationId) {
          console.log('🎬 Veo video generation started');
          console.log('🆔 Operation ID:', result.operationId);

          alert(`🎬 Veo 3.1 Video Generation Started!\n\n` +
            `Operation ID: ${result.operationId}\n` +
            `Duration: 8 seconds\n` +
            `Polling required to check completion\n` +
            `Cost: $${result.cost.toFixed(2)}`);

          // TODO: Implement polling for video completion
          // startVeoPolling(result.operationId);
        }

        // Store result
        setGenerationResults(prev => [...prev, result]);
      } else {
        console.error('❌ Generation failed:', result.error);

        // Try fallback to Flux if Imagen failed
        if (config.targetAPI === 'imagen') {
          console.log('⚠️ Imagen failed, attempting Flux fallback...');

          const fallbackConfig = {
            ...config,
            targetAPI: 'flux',
            useTranslation: false // Flux doesn't need translation
          };

          alert('⚠️ Imagen generation failed. Trying Flux fallback...');
          return await handleSeductress10Generate(fallbackConfig);
        }

        alert(`❌ NUCLEAR Generation Failed\n\n${result.error}\n\nCheck console for details.`);
      }
    } catch (error) {
      console.error('❌ Critical error in SEDUCTRESS 10/10 generation:', error);
      alert(`❌ Critical Error: ${error instanceof Error ? error.message : 'Unknown error'}\n\nCheck console for full details.`);
    } finally {
      setGenerating(false);
    }
  };

  const handlePromptGenerated = (prompt: string) => {
    console.log('📝 NUCLEAR Prompt generated');
    console.log('Length:', prompt.length, 'characters');
    console.log('Preview:', prompt.substring(0, 300) + '...');

    setLastGeneratedPrompt(prompt);

    // Optionally show prompt in modal or text area
    // setShowPromptPreview(true);
  };

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      backgroundColor: '#0F172A',
      padding: '24px'
    }}>
      {/* Header */}
      <header style={{
        marginBottom: '24px',
        paddingBottom: '16px',
        borderBottom: '2px solid #374151'
      }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: 'bold',
          background: 'linear-gradient(to right, #EC4899, #8B5CF6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '16px'
        }}>
          AI Fashion Studio - Enhanced Edition
        </h1>

        {/* Mode Navigation */}
        <nav style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setCurrentMode('classic')}
            style={{
              padding: '10px 20px',
              backgroundColor: currentMode === 'classic' ? '#3B82F6' : '#374151',
              border: '2px solid ' + (currentMode === 'classic' ? '#60A5FA' : '#4B5563'),
              borderRadius: '8px',
              color: '#ffffff',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            Classic Mode
          </button>

          <button
            onClick={() => setCurrentMode('artistic')}
            style={{
              padding: '10px 20px',
              backgroundColor: currentMode === 'artistic' ? '#8B5CF6' : '#374151',
              border: '2px solid ' + (currentMode === 'artistic' ? '#A78BFA' : '#4B5563'),
              borderRadius: '8px',
              color: '#ffffff',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            Artistic Mode
          </button>

          <button
            onClick={() => setCurrentMode('corporate')}
            style={{
              padding: '10px 20px',
              backgroundColor: currentMode === 'corporate' ? '#10B981' : '#374151',
              border: '2px solid ' + (currentMode === 'corporate' ? '#34D399' : '#4B5563'),
              borderRadius: '8px',
              color: '#ffffff',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            Corporate Mode
          </button>

          {/* SEDUCTRESS 10/10 BUTTON */}
          <button
            onClick={() => setCurrentMode('seductress10')}
            style={{
              padding: '10px 20px',
              backgroundColor: currentMode === 'seductress10' ? '#DC2626' : '#374151',
              border: '2px solid ' + (currentMode === 'seductress10' ? '#F87171' : '#4B5563'),
              borderRadius: '8px',
              color: '#ffffff',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: currentMode === 'seductress10' ? '0 0 20px rgba(220, 38, 38, 0.5)' : 'none'
            }}
          >
            🔥 SEDUCTRESS 10/10
            <span style={{
              marginLeft: '8px',
              padding: '2px 6px',
              backgroundColor: '#7F1D1D',
              borderRadius: '4px',
              fontSize: '10px',
              fontWeight: '700'
            }}>
              NUCLEAR
            </span>
          </button>
        </nav>
      </header>

      {/* Main Content Area */}
      <main style={{ display: 'flex', gap: '24px' }}>
        {/* Left Panel - Controls */}
        <div style={{ flex: '0 0 500px', maxWidth: '500px' }}>
          {currentMode === 'classic' && (
            <div style={{ padding: '20px', backgroundColor: '#1E293B', borderRadius: '12px' }}>
              <h2>Classic Mode</h2>
              <p>Your existing classic mode content...</p>
            </div>
          )}

          {currentMode === 'artistic' && (
            <div style={{ padding: '20px', backgroundColor: '#1E293B', borderRadius: '12px' }}>
              <h2>Artistic Mode</h2>
              <p>Your existing artistic mode content...</p>
            </div>
          )}

          {currentMode === 'corporate' && (
            <div style={{ padding: '20px', backgroundColor: '#1E293B', borderRadius: '12px' }}>
              <h2>Corporate Mode</h2>
              <p>Your existing corporate mode content...</p>
            </div>
          )}

          {/* SEDUCTRESS 10/10 PANEL */}
          {currentMode === 'seductress10' && (
            <Seductress10of10Panel
              accessToken={mainToken}
              onGenerate={handleSeductress10Generate}
              onPromptGenerated={handlePromptGenerated}
            />
          )}
        </div>

        {/* Right Panel - Image Display */}
        <div style={{ flex: 1 }}>
          <div style={{
            backgroundColor: '#1E293B',
            borderRadius: '12px',
            padding: '20px',
            minHeight: '600px'
          }}>
            {generating && (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                color: '#ffffff'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  border: '4px solid #374151',
                  borderTop: '4px solid #DC2626',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }} />
                <p style={{ marginTop: '20px', fontSize: '18px', fontWeight: '600' }}>
                  Generating NUCLEAR image...
                </p>
                <p style={{ marginTop: '8px', fontSize: '14px', color: '#9CA3AF' }}>
                  This may take 30-60 seconds
                </p>
              </div>
            )}

            {!generating && currentImage && (
              <div>
                <h3 style={{ color: '#ffffff', marginBottom: '16px' }}>Generated Image</h3>
                <img
                  src={currentImage}
                  alt="Generated"
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '8px',
                    border: '2px solid #DC2626'
                  }}
                />

                {/* Image Grid for Multiple Results */}
                {generatedImages.length > 1 && (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                    gap: '12px',
                    marginTop: '16px'
                  }}>
                    {generatedImages.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`Variant ${idx + 1}`}
                        onClick={() => setCurrentImage(img)}
                        style={{
                          width: '100%',
                          height: 'auto',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          border: img === currentImage ? '2px solid #DC2626' : '2px solid #374151',
                          transition: 'all 0.2s'
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {!generating && !currentImage && (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                color: '#9CA3AF'
              }}>
                <p style={{ fontSize: '48px', marginBottom: '16px' }}>🎨</p>
                <p style={{ fontSize: '18px', fontWeight: '600' }}>No image generated yet</p>
                <p style={{ fontSize: '14px', marginTop: '8px' }}>
                  Select a model and generate to see results
                </p>
              </div>
            )}
          </div>

          {/* Generation History */}
          {generationResults.length > 0 && (
            <div style={{
              marginTop: '24px',
              backgroundColor: '#1E293B',
              borderRadius: '12px',
              padding: '20px'
            }}>
              <h3 style={{ color: '#ffffff', marginBottom: '16px' }}>
                Generation History ({generationResults.length})
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {generationResults.slice(-5).reverse().map((result, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '12px',
                      backgroundColor: '#262626',
                      borderRadius: '6px',
                      border: result.success ? '1px solid #10B981' : '1px solid #DC2626'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ color: '#ffffff', fontWeight: '600' }}>
                        {result.success ? '✅' : '❌'} Generation {generationResults.length - idx}
                      </span>
                      <span style={{ color: '#9CA3AF', fontSize: '12px' }}>
                        ${result.cost.toFixed(2)}
                      </span>
                    </div>
                    <div style={{ fontSize: '12px', color: '#9CA3AF' }}>
                      Strategies: {result.strategies.join(', ')}
                    </div>
                    {result.usedTranslation && (
                      <div style={{ fontSize: '12px', color: '#10B981', marginTop: '4px' }}>
                        🌐 Translation bypass applied
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Add CSS for spinner animation */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default ExampleApp;
