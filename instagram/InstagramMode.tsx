/**
 * INSTAGRAM MODE
 *
 * Comprehensive Instagram publishing interface with:
 * - Direct publishing of generated images
 * - Queue management
 * - Auto-posting agent control
 * - Token management and auto-refresh
 * - Publishing history
 */

import React, { useState, useEffect, useCallback } from 'react';
import type { GeneratedImageData } from '../types';

// Instagram service imports
import {
  // Token management
  saveTokenInfo,
  loadTokenInfo,
  saveGitHubToken,
  loadGitHubToken,
  initializeFromToken,
  getTokenStatus,
  ensureValidToken,
  clearTokens,
  type TokenInfo,

  // Publishing
  sendToInstagram,
  loadInstagramConfig,
  saveInstagramConfig,
  loadHostingConfig,
  saveHostingConfig,
  getDefaultHostingConfig,

  // Agent and queue
  getPostQueue,
  addToQueue,
  removeFromQueue,
  clearCompletedFromQueue,
  getPublishLogs,
  startAgent,
  stopAgent,
  isAgentRunning,
  getAgentState,
  triggerAgentNow,
  generateCaption,
  quickPublish,
  type PostQueueItem,
  type InstagramPublishLog,
  type CaptionStyle,
} from '../services/instagram';

interface InstagramModeProps {
  generatedImages: GeneratedImageData[] | null;
  onBack?: () => void;
}

type TabType = 'publish' | 'queue' | 'agent' | 'settings' | 'history';

const InstagramMode: React.FC<InstagramModeProps> = ({ generatedImages, onBack }) => {
  // UI State
  const [activeTab, setActiveTab] = useState<TabType>('publish');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

  // Token state
  const [tokenStatus, setTokenStatus] = useState(getTokenStatus());
  const [instagramToken, setInstagramToken] = useState('');
  const [githubToken, setGithubToken] = useState('');

  // Publishing state
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [caption, setCaption] = useState('');
  const [captionStyle, setCaptionStyle] = useState<CaptionStyle>('editorial');
  const [hashtags, setHashtags] = useState<string[]>([
    'fashion', 'photography', 'editorial', 'indianbeauty', 'portrait',
    'highfashion', 'veracrvs', 'artistic', 'aiart', 'model'
  ]);
  const [newHashtag, setNewHashtag] = useState('');

  // Queue state
  const [queue, setQueue] = useState<PostQueueItem[]>([]);
  const [logs, setLogs] = useState<InstagramPublishLog[]>([]);

  // Agent state
  const [agentRunning, setAgentRunning] = useState(isAgentRunning());
  const [agentState, setAgentState] = useState(getAgentState());

  // Load saved tokens on mount
  useEffect(() => {
    const savedGithub = loadGitHubToken();
    if (savedGithub) setGithubToken(savedGithub);

    const tokenInfo = loadTokenInfo();
    if (tokenInfo) setInstagramToken(tokenInfo.accessToken);

    refreshState();
  }, []);

  // Refresh all state
  const refreshState = useCallback(() => {
    setTokenStatus(getTokenStatus());
    setQueue(getPostQueue());
    setLogs(getPublishLogs(50));
    setAgentRunning(isAgentRunning());
    setAgentState(getAgentState());
  }, []);

  // Auto-refresh state every 10 seconds
  useEffect(() => {
    const interval = setInterval(refreshState, 10000);
    return () => clearInterval(interval);
  }, [refreshState]);

  // Save tokens handler
  const handleSaveTokens = async () => {
    setIsLoading(true);
    setMessage(null);

    try {
      // Save GitHub token
      if (githubToken) {
        saveGitHubToken(githubToken);

        // Also update hosting config
        const hostingConfig = loadHostingConfig() || getDefaultHostingConfig();
        if (hostingConfig.github) {
          hostingConfig.github.token = githubToken;
          saveHostingConfig(hostingConfig);
        }
      }

      // Initialize and validate Instagram token
      if (instagramToken) {
        const result = await initializeFromToken(instagramToken);

        if (result.success) {
          // Also save to Instagram config
          const config = loadInstagramConfig() || {
            instagramBusinessAccountId: '17841478517688462',
            facebookPageId: '888169534380297',
            accessToken: '',
          };
          config.accessToken = instagramToken;
          saveInstagramConfig(config);

          setMessage({
            type: 'success',
            text: `Tokens saved! Instagram token type: ${result.tokenInfo?.tokenType}`,
          });
        } else {
          setMessage({
            type: 'error',
            text: `Instagram token validation failed: ${result.error}`,
          });
        }
      } else {
        setMessage({ type: 'success', text: 'GitHub token saved!' });
      }

      refreshState();
    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Failed to save tokens',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Generate caption
  const handleGenerateCaption = () => {
    const generated = generateCaption(captionStyle, {
      conceptName: 'Vera Collection',
    });
    setCaption(generated);
  };

  // Add hashtag
  const handleAddHashtag = () => {
    const tag = newHashtag.trim().replace(/^#/, '');
    if (tag && !hashtags.includes(tag)) {
      setHashtags([...hashtags, tag]);
      setNewHashtag('');
    }
  };

  // Remove hashtag
  const handleRemoveHashtag = (tag: string) => {
    setHashtags(hashtags.filter(h => h !== tag));
  };

  // Publish directly
  const handlePublish = async () => {
    if (!generatedImages || generatedImages.length === 0) {
      setMessage({ type: 'error', text: 'No image selected for publishing' });
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      // Ensure valid token
      const tokenResult = await ensureValidToken();
      if (!tokenResult.success) {
        setMessage({ type: 'error', text: tokenResult.error || 'Token invalid' });
        setIsLoading(false);
        return;
      }

      const image = generatedImages[selectedImageIndex];
      const imageData = image.url || image.base64 || '';

      const result = await sendToInstagram(imageData, {
        caption: caption || generateCaption(captionStyle),
        hashtags,
      });

      if (result.success) {
        setMessage({
          type: 'success',
          text: `Published! Media ID: ${result.mediaId}`,
        });
        refreshState();
      } else {
        setMessage({
          type: 'error',
          text: result.error || 'Failed to publish',
        });
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Publishing failed',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Add to queue
  const handleAddToQueue = () => {
    if (!generatedImages || generatedImages.length === 0) {
      setMessage({ type: 'error', text: 'No image selected' });
      return;
    }

    const image = generatedImages[selectedImageIndex];
    const imageData = image.url || image.base64 || '';

    const item = addToQueue({
      imageData,
      caption: caption || generateCaption(captionStyle),
      hashtags,
      metadata: {
        conceptName: 'Vera Collection',
        generatedAt: new Date().toISOString(),
      },
    });

    setMessage({ type: 'success', text: `Added to queue: ${item.id}` });
    refreshState();
  };

  // Remove from queue
  const handleRemoveFromQueue = (id: string) => {
    removeFromQueue(id);
    refreshState();
    setMessage({ type: 'info', text: 'Removed from queue' });
  };

  // Clear completed from queue
  const handleClearCompleted = () => {
    const count = clearCompletedFromQueue();
    refreshState();
    setMessage({ type: 'info', text: `Cleared ${count} completed items` });
  };

  // Process queue item now
  const handleProcessNow = async () => {
    setIsLoading(true);
    setMessage(null);

    try {
      const result = await triggerAgentNow();

      if (result.processed) {
        if (result.error) {
          setMessage({ type: 'error', text: result.error });
        } else {
          setMessage({ type: 'success', text: 'Queue item processed!' });
        }
      } else {
        setMessage({ type: 'info', text: result.error || 'No items to process' });
      }

      refreshState();
    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Failed to process',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Start/stop agent
  const handleToggleAgent = () => {
    if (agentRunning) {
      stopAgent();
      setMessage({ type: 'info', text: 'Agent stopped' });
    } else {
      const config = loadInstagramConfig();
      const hostingConfig = loadHostingConfig();

      if (!config?.accessToken) {
        setMessage({ type: 'error', text: 'Configure Instagram token first' });
        return;
      }

      if (!hostingConfig?.github?.token) {
        setMessage({ type: 'error', text: 'Configure GitHub token first' });
        return;
      }

      startAgent({
        instagram: config,
        hosting: hostingConfig,
        selectionStrategy: 'queue',
        captionStyle: 'editorial',
        defaultHashtags: hashtags,
        schedule: {
          enabled: true,
          minIntervalMinutes: 60,
          maxPostsPerDay: 5,
          timezone: 'Asia/Kolkata',
        },
        requireApproval: false,
      });

      setMessage({ type: 'success', text: 'Agent started!' });
    }

    refreshState();
  };

  // Render tabs
  const renderTabs = () => (
    <div className="flex border-b border-gray-700 mb-6">
      {(['publish', 'queue', 'agent', 'settings', 'history'] as TabType[]).map(tab => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-6 py-3 text-sm font-medium transition-colors ${
            activeTab === tab
              ? 'text-pink-400 border-b-2 border-pink-400'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </button>
      ))}
    </div>
  );

  // Render publish tab
  const renderPublishTab = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Image Selection */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Select Image</h3>

        {generatedImages && generatedImages.length > 0 ? (
          <>
            <div className="aspect-[4/5] rounded-lg overflow-hidden mb-4 bg-gray-900">
              <img
                src={generatedImages[selectedImageIndex]?.url || `data:image/jpeg;base64,${generatedImages[selectedImageIndex]?.base64}`}
                alt="Selected for Instagram"
                className="w-full h-full object-cover"
              />
            </div>

            {generatedImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {generatedImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                      idx === selectedImageIndex ? 'border-pink-500' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={img.url || `data:image/jpeg;base64,${img.base64}`}
                      alt={`Option ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="aspect-[4/5] rounded-lg bg-gray-900 flex items-center justify-center text-gray-500">
            <p>Generate an image first to publish</p>
          </div>
        )}
      </div>

      {/* Caption & Options */}
      <div className="space-y-6">
        {/* Caption */}
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Caption</h3>
            <select
              value={captionStyle}
              onChange={(e) => setCaptionStyle(e.target.value as CaptionStyle)}
              className="bg-gray-700 text-white px-3 py-1 rounded text-sm"
            >
              <option value="editorial">Editorial</option>
              <option value="minimalist">Minimalist</option>
              <option value="luxury">Luxury</option>
              <option value="artistic">Artistic</option>
              <option value="casual">Casual</option>
              <option value="custom">Custom</option>
            </select>
          </div>

          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Write your caption..."
            className="w-full h-32 bg-gray-700 text-white rounded-lg p-3 resize-none"
          />

          <button
            onClick={handleGenerateCaption}
            className="mt-2 text-sm text-pink-400 hover:text-pink-300"
          >
            Generate Caption
          </button>
        </div>

        {/* Hashtags */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Hashtags</h3>

          <div className="flex flex-wrap gap-2 mb-4">
            {hashtags.map(tag => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-700 text-white rounded-full text-sm flex items-center gap-2"
              >
                #{tag}
                <button
                  onClick={() => handleRemoveHashtag(tag)}
                  className="text-gray-400 hover:text-red-400"
                >
                  ×
                </button>
              </span>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={newHashtag}
              onChange={(e) => setNewHashtag(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddHashtag()}
              placeholder="Add hashtag..."
              className="flex-1 bg-gray-700 text-white rounded-lg px-3 py-2"
            />
            <button
              onClick={handleAddHashtag}
              className="px-4 py-2 bg-pink-600 hover:bg-pink-500 text-white rounded-lg"
            >
              Add
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            onClick={handlePublish}
            disabled={isLoading || !generatedImages?.length}
            className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Publishing...' : 'Publish Now'}
          </button>

          <button
            onClick={handleAddToQueue}
            disabled={!generatedImages?.length}
            className="flex-1 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add to Queue
          </button>
        </div>
      </div>
    </div>
  );

  // Render queue tab
  const renderQueueTab = () => (
    <div className="space-y-6">
      {/* Queue actions */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-white">
          Post Queue ({queue.length} items)
        </h3>
        <div className="flex gap-3">
          <button
            onClick={handleProcessNow}
            disabled={isLoading || queue.filter(q => q.status === 'pending').length === 0}
            className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg text-sm disabled:opacity-50"
          >
            Process Next
          </button>
          <button
            onClick={handleClearCompleted}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm"
          >
            Clear Completed
          </button>
        </div>
      </div>

      {/* Queue items */}
      {queue.length === 0 ? (
        <div className="bg-gray-800 rounded-lg p-12 text-center text-gray-500">
          <p>No items in queue</p>
          <p className="text-sm mt-2">Add images from the Publish tab</p>
        </div>
      ) : (
        <div className="space-y-4">
          {queue.map((item) => (
            <div
              key={item.id}
              className="bg-gray-800 rounded-lg p-4 flex gap-4"
            >
              {/* Thumbnail */}
              <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-700 flex-shrink-0">
                {item.imageData.startsWith('data:') || item.imageData.startsWith('http') ? (
                  <img
                    src={item.imageData}
                    alt="Queue item"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs">
                    Image
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm truncate">{item.caption}</p>
                <p className="text-gray-400 text-xs mt-1">
                  {new Date(item.createdAt).toLocaleString()}
                </p>
                <div className="flex gap-2 mt-2">
                  <span className={`px-2 py-0.5 rounded text-xs ${
                    item.status === 'published' ? 'bg-green-600 text-white' :
                    item.status === 'failed' ? 'bg-red-600 text-white' :
                    item.status === 'publishing' ? 'bg-yellow-600 text-white' :
                    'bg-gray-600 text-white'
                  }`}>
                    {item.status}
                  </span>
                  {item.instagramMediaId && (
                    <span className="text-xs text-gray-400">
                      ID: {item.instagramMediaId}
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <button
                onClick={() => handleRemoveFromQueue(item.id)}
                className="text-gray-400 hover:text-red-400 px-2"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // Render agent tab
  const renderAgentTab = () => (
    <div className="space-y-6">
      {/* Agent Status */}
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-white">Auto-Posting Agent</h3>
            <p className="text-gray-400 text-sm mt-1">
              Automatically publishes queued images on schedule
            </p>
          </div>

          <button
            onClick={handleToggleAgent}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              agentRunning
                ? 'bg-red-600 hover:bg-red-500 text-white'
                : 'bg-green-600 hover:bg-green-500 text-white'
            }`}
          >
            {agentRunning ? 'Stop Agent' : 'Start Agent'}
          </button>
        </div>

        {/* Status info */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-700 rounded-lg p-4">
            <p className="text-gray-400 text-sm">Status</p>
            <p className={`text-lg font-semibold ${agentRunning ? 'text-green-400' : 'text-gray-400'}`}>
              {agentRunning ? 'Running' : 'Stopped'}
            </p>
          </div>

          <div className="bg-gray-700 rounded-lg p-4">
            <p className="text-gray-400 text-sm">Posts Today</p>
            <p className="text-lg font-semibold text-white">{agentState.postsToday}</p>
          </div>

          <div className="bg-gray-700 rounded-lg p-4">
            <p className="text-gray-400 text-sm">Last Post</p>
            <p className="text-lg font-semibold text-white">
              {agentState.lastPost
                ? new Date(agentState.lastPost).toLocaleTimeString()
                : 'Never'}
            </p>
          </div>

          <div className="bg-gray-700 rounded-lg p-4">
            <p className="text-gray-400 text-sm">Queue Size</p>
            <p className="text-lg font-semibold text-white">
              {queue.filter(q => q.status === 'pending').length}
            </p>
          </div>
        </div>

        {/* Recent errors */}
        {agentState.errors.length > 0 && (
          <div className="mt-6">
            <h4 className="text-white font-medium mb-2">Recent Errors</h4>
            <div className="bg-red-900/30 rounded-lg p-4 space-y-2">
              {agentState.errors.slice(-3).map((err, idx) => (
                <p key={idx} className="text-red-300 text-sm">{err}</p>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Schedule Settings */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Schedule Settings</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-400 text-sm mb-2">Max Posts Per Day</label>
            <input
              type="number"
              value={5}
              className="w-full bg-gray-700 text-white rounded-lg px-3 py-2"
              readOnly
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">Min Interval (minutes)</label>
            <input
              type="number"
              value={60}
              className="w-full bg-gray-700 text-white rounded-lg px-3 py-2"
              readOnly
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">Timezone</label>
            <input
              type="text"
              value="Asia/Kolkata"
              className="w-full bg-gray-700 text-white rounded-lg px-3 py-2"
              readOnly
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">Caption Style</label>
            <select
              value={captionStyle}
              onChange={(e) => setCaptionStyle(e.target.value as CaptionStyle)}
              className="w-full bg-gray-700 text-white rounded-lg px-3 py-2"
            >
              <option value="editorial">Editorial</option>
              <option value="minimalist">Minimalist</option>
              <option value="luxury">Luxury</option>
              <option value="artistic">Artistic</option>
              <option value="casual">Casual</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  // Render settings tab
  const renderSettingsTab = () => (
    <div className="space-y-6">
      {/* Token Status */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Token Status</h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-700 rounded-lg p-4">
            <p className="text-gray-400 text-sm">Instagram Token</p>
            <p className={`text-lg font-semibold ${tokenStatus.hasToken ? 'text-green-400' : 'text-red-400'}`}>
              {tokenStatus.hasToken ? 'Configured' : 'Missing'}
            </p>
          </div>

          <div className="bg-gray-700 rounded-lg p-4">
            <p className="text-gray-400 text-sm">Token Type</p>
            <p className="text-lg font-semibold text-white">
              {tokenStatus.tokenType || 'N/A'}
            </p>
          </div>

          <div className="bg-gray-700 rounded-lg p-4">
            <p className="text-gray-400 text-sm">Expires In</p>
            <p className={`text-lg font-semibold ${tokenStatus.needsRefresh ? 'text-yellow-400' : 'text-white'}`}>
              {tokenStatus.expiresIn || 'N/A'}
            </p>
          </div>

          <div className="bg-gray-700 rounded-lg p-4">
            <p className="text-gray-400 text-sm">GitHub Token</p>
            <p className={`text-lg font-semibold ${loadGitHubToken() ? 'text-green-400' : 'text-red-400'}`}>
              {loadGitHubToken() ? 'Configured' : 'Missing'}
            </p>
          </div>
        </div>
      </div>

      {/* Token Configuration */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Configure Tokens</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-400 text-sm mb-2">Instagram Access Token</label>
            <input
              type="password"
              value={instagramToken}
              onChange={(e) => setInstagramToken(e.target.value)}
              placeholder="EAA..."
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 font-mono text-sm"
            />
            <p className="text-gray-500 text-xs mt-1">
              Page access token with instagram_content_publish permission
            </p>
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">GitHub Token</label>
            <input
              type="password"
              value={githubToken}
              onChange={(e) => setGithubToken(e.target.value)}
              placeholder="ghp_..."
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 font-mono text-sm"
            />
            <p className="text-gray-500 text-xs mt-1">
              Personal access token with repo write access
            </p>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              onClick={handleSaveTokens}
              disabled={isLoading}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-lg font-semibold disabled:opacity-50"
            >
              {isLoading ? 'Saving...' : 'Save Tokens'}
            </button>

            <button
              onClick={() => {
                clearTokens();
                setInstagramToken('');
                setGithubToken('');
                refreshState();
                setMessage({ type: 'info', text: 'Tokens cleared' });
              }}
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg"
            >
              Clear All
            </button>
          </div>
        </div>
      </div>

      {/* Account Info */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Account Configuration</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-400 text-sm mb-2">Instagram Account ID</label>
            <input
              type="text"
              value={tokenStatus.igAccountId || '17841478517688462'}
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 font-mono text-sm"
              readOnly
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">Facebook Page ID</label>
            <input
              type="text"
              value="888169534380297"
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 font-mono text-sm"
              readOnly
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">GitHub Repository</label>
            <input
              type="text"
              value="aemons9/studiov1"
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 font-mono text-sm"
              readOnly
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">Instagram Handle</label>
            <input
              type="text"
              value="@veracrvs"
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 font-mono text-sm"
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );

  // Render history tab
  const renderHistoryTab = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">
        Publishing History ({logs.length} entries)
      </h3>

      {logs.length === 0 ? (
        <div className="bg-gray-800 rounded-lg p-12 text-center text-gray-500">
          <p>No publishing history yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {logs.slice().reverse().map((log) => (
            <div
              key={log.id}
              className={`bg-gray-800 rounded-lg p-4 border-l-4 ${
                log.success ? 'border-green-500' : 'border-red-500'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`px-2 py-1 rounded text-xs ${
                  log.success ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                }`}>
                  {log.action.toUpperCase()}
                </span>
                <span className="text-gray-400 text-sm">
                  {new Date(log.timestamp).toLocaleString()}
                </span>
              </div>

              <p className="text-white text-sm truncate">{log.caption}</p>

              {log.instagramMediaId && (
                <p className="text-gray-400 text-xs mt-1">
                  Media ID: {log.instagramMediaId}
                </p>
              )}

              {log.error && (
                <p className="text-red-400 text-xs mt-1">{log.error}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {onBack && (
                <button
                  onClick={onBack}
                  className="text-gray-400 hover:text-white"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
                <div>
                  <h1 className="text-xl font-bold">Instagram Publisher</h1>
                  <p className="text-gray-400 text-sm">@veracrvs</p>
                </div>
              </div>
            </div>

            {/* Status indicator */}
            <div className="flex items-center gap-4">
              {agentRunning && (
                <div className="flex items-center gap-2 px-3 py-1 bg-green-600/20 rounded-full">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-green-400 text-sm">Agent Running</span>
                </div>
              )}

              <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${
                tokenStatus.hasToken && !tokenStatus.needsRefresh
                  ? 'bg-green-600/20'
                  : 'bg-yellow-600/20'
              }`}>
                <span className={`w-2 h-2 rounded-full ${
                  tokenStatus.hasToken && !tokenStatus.needsRefresh
                    ? 'bg-green-400'
                    : 'bg-yellow-400'
                }`} />
                <span className={`text-sm ${
                  tokenStatus.hasToken && !tokenStatus.needsRefresh
                    ? 'text-green-400'
                    : 'text-yellow-400'
                }`}>
                  {tokenStatus.hasToken ? 'Connected' : 'Not Connected'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Message */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.type === 'success' ? 'bg-green-600/20 text-green-400' :
            message.type === 'error' ? 'bg-red-600/20 text-red-400' :
            'bg-blue-600/20 text-blue-400'
          }`}>
            {message.text}
          </div>
        )}

        {/* Tabs */}
        {renderTabs()}

        {/* Tab Content */}
        {activeTab === 'publish' && renderPublishTab()}
        {activeTab === 'queue' && renderQueueTab()}
        {activeTab === 'agent' && renderAgentTab()}
        {activeTab === 'settings' && renderSettingsTab()}
        {activeTab === 'history' && renderHistoryTab()}
      </div>
    </div>
  );
};

export default InstagramMode;
