import React, { useState } from 'react';
import { VEO_MODEL_TEMPLATES, VeoSegment, getModelSegments } from './veoPromptTemplates';
import { generateVeoVideo, pollVeoOperation, VeoGenerationResult } from '../services/veoService';

interface VideoGenerationModeProps {
  onExit: () => void;
  accessToken: string; // OAuth token from Vertex AI
}

interface GeneratedVideo {
  segmentId: string;
  segmentName: string;
  status: 'generating' | 'completed' | 'failed';
  operationId?: string;
  videoUrl?: string;
  error?: string;
}

const VideoGenerationMode: React.FC<VideoGenerationModeProps> = ({ onExit, accessToken }) => {
  const [selectedModelId, setSelectedModelId] = useState<string | null>(null);
  const [selectedSegments, setSelectedSegments] = useState<string[]>([]);
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
  const [generatedVideos, setGeneratedVideos] = useState<GeneratedVideo[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const selectedModel = VEO_MODEL_TEMPLATES.find(m => m.modelId === selectedModelId);
  const modelSegments = selectedModelId ? getModelSegments(selectedModelId) : [];

  const toggleSegment = (segmentId: string) => {
    if (selectedSegments.includes(segmentId)) {
      setSelectedSegments(selectedSegments.filter(id => id !== segmentId));
    } else {
      setSelectedSegments([...selectedSegments, segmentId]);
    }
  };

  const handleGenerateVideos = async () => {
    if (!accessToken) {
      alert('Access token required. Please configure Vertex AI credentials.');
      return;
    }

    if (selectedSegments.length === 0 && !customPrompt) {
      alert('Please select at least one segment or enter a custom prompt.');
      return;
    }

    setIsGenerating(true);
    const newVideos: GeneratedVideo[] = [];

    try {
      // Generate videos for selected segments
      for (const segmentId of selectedSegments) {
        const segment = modelSegments.find(s => s.id === segmentId);
        if (!segment) continue;

        console.log(`🎬 Generating video for segment: ${segment.name}`);

        const result = await generateVeoVideo(segment.prompt, accessToken, {
          aspectRatio: segment.aspectRatio,
          resolution: '720p',
          generateAudio: true,
          addWatermark: true,
          includeRaiReason: true
        });

        const video: GeneratedVideo = {
          segmentId: segment.id,
          segmentName: segment.name,
          status: result.status === 'failed' ? 'failed' : 'generating',
          operationId: result.operationId,
          error: result.error
        };

        newVideos.push(video);
      }

      // Generate custom prompt video if provided
      if (customPrompt.trim()) {
        const result = await generateVeoVideo(customPrompt, accessToken, {
          aspectRatio: aspectRatio,
          resolution: '720p',
          generateAudio: true,
          addWatermark: true,
          includeRaiReason: true
        });

        const video: GeneratedVideo = {
          segmentId: 'custom',
          segmentName: 'Custom Prompt',
          status: result.status === 'failed' ? 'failed' : 'generating',
          operationId: result.operationId,
          error: result.error
        };

        newVideos.push(video);
      }

      setGeneratedVideos(newVideos);

      // Start polling for all videos
      pollAllVideos(newVideos);
    } catch (error: any) {
      console.error('❌ Video generation error:', error);
      alert(`Error: ${error.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const pollAllVideos = async (videos: GeneratedVideo[]) => {
    for (const video of videos) {
      if (video.operationId && video.status === 'generating') {
        pollSingleVideo(video.operationId, video.segmentId);
      }
    }
  };

  const pollSingleVideo = async (operationId: string, segmentId: string) => {
    try {
      const result = await pollVeoOperation(operationId, accessToken, 60, 10000);

      setGeneratedVideos(prev =>
        prev.map(v =>
          v.segmentId === segmentId
            ? {
                ...v,
                status: result.status === 'completed' ? 'completed' : 'failed',
                videoUrl: result.videoUrl,
                error: result.error
              }
            : v
        )
      );
    } catch (error: any) {
      console.error(`❌ Polling error for ${segmentId}:`, error);
      setGeneratedVideos(prev =>
        prev.map(v =>
          v.segmentId === segmentId
            ? { ...v, status: 'failed', error: error.message }
            : v
        )
      );
    }
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
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '32px' }}>🎬</span>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, background: 'linear-gradient(135deg, #F472B6 0%, #C084FC 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Video Generation Mode - Veo 3.1
            </h1>
            <p style={{ fontSize: '14px', color: '#D1D5DB', margin: '4px 0 0 0' }}>
              8-Second Cinematic Segments × 15 Models
            </p>
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

      <div style={{ padding: '32px', maxWidth: '1800px', margin: '0 auto' }}>
        {/* Model Selection */}
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '16px', color: '#F472B6' }}>
            🎭 Step 1: Select Model {selectedModelId && '✓'}
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: '16px'
          }}>
            {VEO_MODEL_TEMPLATES.map((model) => (
              <div
                key={model.modelId}
                onClick={() => {
                  setSelectedModelId(model.modelId);
                  setSelectedSegments([]);
                }}
                style={{
                  padding: '20px',
                  backgroundColor: selectedModelId === model.modelId ? 'rgba(147, 51, 234, 0.3)' : 'rgba(30, 10, 50, 0.5)',
                  border: selectedModelId === model.modelId ? '2px solid #9333EA' : '1px solid rgba(147, 51, 234, 0.2)',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#F3F4F6', margin: 0 }}>
                    {model.modelName}
                  </h3>
                  {selectedModelId === model.modelId && <span style={{ fontSize: '18px' }}>✓</span>}
                </div>
                <p style={{ fontSize: '12px', color: '#C084FC', marginBottom: '8px' }}>
                  {model.category}
                </p>
                <p style={{ fontSize: '11px', color: '#9CA3AF' }}>
                  {model.segments.length} video segments
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Segment Selection */}
        {selectedModel && (
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '16px', color: '#F472B6' }}>
              🎥 Step 2: Select Segments ({selectedSegments.length} selected)
            </h2>
            <p style={{ fontSize: '13px', color: '#9CA3AF', marginBottom: '16px' }}>
              Each segment is 8 seconds and can be combined. Select multiple segments to create a sequence.
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '16px'
            }}>
              {modelSegments.map((segment) => (
                <div
                  key={segment.id}
                  onClick={() => toggleSegment(segment.id)}
                  style={{
                    padding: '16px',
                    backgroundColor: selectedSegments.includes(segment.id) ? 'rgba(236, 72, 153, 0.3)' : 'rgba(30, 10, 50, 0.5)',
                    border: selectedSegments.includes(segment.id) ? '2px solid #EC4899' : '1px solid rgba(236, 72, 153, 0.2)',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                    <div>
                      <h4 style={{ fontSize: '15px', fontWeight: 'bold', color: '#F3F4F6', margin: '0 0 4px 0' }}>
                        {segment.name}
                      </h4>
                      <div style={{ display: 'flex', gap: '8px', fontSize: '10px' }}>
                        <span style={{
                          padding: '2px 8px',
                          borderRadius: '4px',
                          backgroundColor: segment.type === 'intro' ? 'rgba(99, 102, 241, 0.3)' :
                                          segment.type === 'movement' ? 'rgba(236, 72, 153, 0.3)' :
                                          segment.type === 'detail' ? 'rgba(251, 146, 60, 0.3)' :
                                          'rgba(147, 51, 234, 0.3)',
                          color: '#FFF'
                        }}>
                          {segment.type}
                        </span>
                        <span style={{ padding: '2px 8px', borderRadius: '4px', backgroundColor: 'rgba(75, 85, 99, 0.3)', color: '#D1D5DB' }}>
                          {segment.aspectRatio}
                        </span>
                        <span style={{ padding: '2px 8px', borderRadius: '4px', backgroundColor: 'rgba(75, 85, 99, 0.3)', color: '#D1D5DB' }}>
                          8s
                        </span>
                      </div>
                    </div>
                    {selectedSegments.includes(segment.id) && (
                      <span style={{ fontSize: '18px' }}>✓</span>
                    )}
                  </div>
                  <p style={{ fontSize: '12px', color: '#D1D5DB', lineHeight: '1.5', margin: '12px 0 0 0' }}>
                    {segment.prompt.substring(0, 120)}...
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Custom Prompt */}
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '16px', color: '#F472B6' }}>
            ✍️ Step 3: Custom Prompt (Optional)
          </h2>
          <div style={{
            padding: '20px',
            backgroundColor: 'rgba(30, 10, 50, 0.5)',
            borderRadius: '12px',
            border: '1px solid rgba(147, 51, 234, 0.3)'
          }}>
            <textarea
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="Enter your custom 8-second video prompt... Focus on cinematography, movement, lighting, and artistic framing."
              style={{
                width: '100%',
                minHeight: '120px',
                padding: '12px',
                backgroundColor: 'rgba(15, 5, 30, 0.8)',
                border: '1px solid rgba(147, 51, 234, 0.3)',
                borderRadius: '8px',
                color: '#F3F4F6',
                fontSize: '14px',
                fontFamily: 'inherit',
                resize: 'vertical'
              }}
            />
            <div style={{ marginTop: '12px', display: 'flex', gap: '12px', alignItems: 'center' }}>
              <label style={{ fontSize: '13px', color: '#C084FC' }}>Aspect Ratio:</label>
              <select
                value={aspectRatio}
                onChange={(e) => setAspectRatio(e.target.value as '16:9' | '9:16')}
                style={{
                  padding: '8px 12px',
                  backgroundColor: 'rgba(15, 5, 30, 0.8)',
                  border: '1px solid rgba(147, 51, 234, 0.3)',
                  borderRadius: '6px',
                  color: '#F3F4F6',
                  fontSize: '13px'
                }}
              >
                <option value="16:9">16:9 (Landscape)</option>
                <option value="9:16">9:16 (Portrait)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <div style={{
          padding: '32px',
          backgroundColor: 'rgba(147, 51, 234, 0.1)',
          borderRadius: '16px',
          border: '2px solid rgba(147, 51, 234, 0.3)',
          textAlign: 'center',
          marginBottom: '40px'
        }}>
          <button
            onClick={handleGenerateVideos}
            disabled={isGenerating || (selectedSegments.length === 0 && !customPrompt.trim())}
            style={{
              padding: '18px 48px',
              background: (isGenerating || (selectedSegments.length === 0 && !customPrompt.trim()))
                ? 'rgba(75, 85, 99, 0.5)'
                : 'linear-gradient(135deg, #F472B6 0%, #C084FC 100%)',
              border: 'none',
              borderRadius: '12px',
              color: '#FFF',
              cursor: (isGenerating || (selectedSegments.length === 0 && !customPrompt.trim())) ? 'not-allowed' : 'pointer',
              fontSize: '18px',
              fontWeight: 'bold',
              opacity: (isGenerating || (selectedSegments.length === 0 && !customPrompt.trim())) ? 0.5 : 1,
              boxShadow: (isGenerating || (selectedSegments.length === 0 && !customPrompt.trim())) ? 'none' : '0 6px 20px rgba(244, 114, 182, 0.4)'
            }}
          >
            {isGenerating ? '🎬 Generating Videos...' : '🎬 Generate Videos'}
          </button>
          {(selectedSegments.length > 0 || customPrompt.trim()) && (
            <p style={{ fontSize: '13px', color: '#9CA3AF', marginTop: '12px' }}>
              {selectedSegments.length + (customPrompt.trim() ? 1 : 0)} video(s) will be generated (8 seconds each)
            </p>
          )}
        </div>

        {/* Generated Videos */}
        {generatedVideos.length > 0 && (
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '16px', color: '#F472B6' }}>
              📹 Generated Videos
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
              gap: '20px'
            }}>
              {generatedVideos.map((video, index) => (
                <div
                  key={index}
                  style={{
                    padding: '20px',
                    backgroundColor: 'rgba(30, 10, 50, 0.6)',
                    borderRadius: '12px',
                    border: '1px solid rgba(147, 51, 234, 0.3)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: '#F3F4F6', margin: 0 }}>
                      {video.segmentName}
                    </h4>
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontSize: '11px',
                      fontWeight: 'bold',
                      backgroundColor: video.status === 'completed' ? 'rgba(34, 197, 94, 0.3)' :
                                      video.status === 'generating' ? 'rgba(251, 146, 60, 0.3)' :
                                      'rgba(239, 68, 68, 0.3)',
                      color: video.status === 'completed' ? '#6EE7B7' :
                            video.status === 'generating' ? '#FED7AA' :
                            '#FCA5A5'
                    }}>
                      {video.status === 'completed' ? '✓ Complete' :
                       video.status === 'generating' ? '⏳ Generating...' :
                       '✗ Failed'}
                    </span>
                  </div>

                  {video.status === 'generating' && (
                    <div style={{
                      padding: '16px',
                      backgroundColor: 'rgba(251, 146, 60, 0.1)',
                      borderRadius: '8px',
                      fontSize: '12px',
                      color: '#FED7AA'
                    }}>
                      ⏳ Video is being generated... This may take several minutes. Operation ID: {video.operationId?.substring(0, 40)}...
                    </div>
                  )}

                  {video.status === 'completed' && video.videoUrl && (
                    <div style={{
                      padding: '16px',
                      backgroundColor: 'rgba(34, 197, 94, 0.1)',
                      borderRadius: '8px'
                    }}>
                      <video
                        controls
                        style={{
                          width: '100%',
                          borderRadius: '8px',
                          marginBottom: '12px'
                        }}
                        src={video.videoUrl}
                      />
                      <a
                        href={video.videoUrl}
                        download
                        style={{
                          display: 'inline-block',
                          padding: '8px 16px',
                          backgroundColor: 'rgba(34, 197, 94, 0.3)',
                          border: '1px solid rgba(34, 197, 94, 0.5)',
                          borderRadius: '6px',
                          color: '#6EE7B7',
                          textDecoration: 'none',
                          fontSize: '12px',
                          fontWeight: 'bold'
                        }}
                      >
                        ⬇️ Download Video
                      </a>
                    </div>
                  )}

                  {video.status === 'failed' && (
                    <div style={{
                      padding: '16px',
                      backgroundColor: 'rgba(239, 68, 68, 0.1)',
                      borderRadius: '8px',
                      fontSize: '12px',
                      color: '#FCA5A5'
                    }}>
                      ✗ Error: {video.error || 'Video generation failed'}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Info */}
        <div style={{ marginTop: '48px', padding: '24px', backgroundColor: 'rgba(147, 51, 234, 0.1)', border: '1px solid rgba(147, 51, 234, 0.3)', borderRadius: '12px' }}>
          <p style={{ color: '#F472B6', fontWeight: 'bold', marginBottom: '12px', fontSize: '15px' }}>
            🎬 Veo 3.1 Video Generation
          </p>
          <div style={{ fontSize: '13px', color: '#D1D5DB', lineHeight: '1.8' }}>
            <ul style={{ margin: '0', paddingLeft: '20px' }}>
              <li><strong>Duration:</strong> Each video is exactly 8 seconds</li>
              <li><strong>Segments:</strong> Combine multiple segments for longer scenes</li>
              <li><strong>Quality:</strong> 720p cinematic with audio</li>
              <li><strong>Strategy:</strong> Prompts focus on cinematography, movement, and artistic framing to bypass content restrictions</li>
              <li><strong>Models:</strong> 15 specialized templates with 3 segments each (intro, movement, detail/atmosphere)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoGenerationMode;
