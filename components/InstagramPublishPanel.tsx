/**
 * InstagramPublishPanel - UI for Instagram publishing functionality
 *
 * Features:
 * - Send to Instagram button (one-click publish)
 * - Caption editor with hashtag suggestions
 * - Queue management for scheduled posts
 * - Configuration for tokens and settings
 * - Publish history and logs
 */

import React, { useState, useEffect } from 'react';
import {
  sendToInstagram,
  publishToInstagram,
  quickPublish,
  addToQueue,
  getPostQueue,
  removeFromQueue,
  updateQueueItem,
  getPublishLogs,
  clearCompletedFromQueue,
  loadInstagramConfig,
  saveInstagramConfig,
  getDefaultInstagramConfig,
  loadHostingConfig,
  saveHostingConfig,
  getDefaultHostingConfig,
  validateAccessToken,
  canMakeApiCall,
  getRateLimitState,
  formatCaption,
  getDefaultHashtags,
  generateCaption,
  startAgent,
  stopAgent,
  isAgentRunning,
  getAgentState,
  getAgentConfig,
  saveAgentConfig,
  getDefaultAgentConfig,
  type InstagramConfig,
  type ImageHostingConfig,
  type PostQueueItem,
  type InstagramPublishLog,
  type CaptionStyle,
} from '../services/instagram';

// ============================================================================
// TYPES
// ============================================================================

interface InstagramPublishPanelProps {
  /** Current image to publish (base64, data URL, or blob URL) */
  imageData?: string;

  /** Image format */
  imageFormat?: 'jpg' | 'jpeg' | 'png';

  /** Callback when publish succeeds */
  onPublishSuccess?: (mediaId: string) => void;

  /** Callback when publish fails */
  onPublishError?: (error: string) => void;

  /** Compact mode (collapsed by default) */
  compact?: boolean;

  /** Color theme */
  colorTheme?: 'purple' | 'pink' | 'blue' | 'teal' | 'gradient';

  /** Show configuration section */
  showConfig?: boolean;

  /** Show queue management */
  showQueue?: boolean;

  /** Show publish history */
  showHistory?: boolean;

  /** Metadata about the image */
  metadata?: {
    conceptName?: string;
    generatedAt?: string;
    intimacyLevel?: number;
    tags?: string[];
  };
}

type TabType = 'publish' | 'queue' | 'history' | 'config';

// ============================================================================
// COMPONENT
// ============================================================================

const InstagramPublishPanel: React.FC<InstagramPublishPanelProps> = ({
  imageData,
  imageFormat = 'jpg',
  onPublishSuccess,
  onPublishError,
  compact = true,
  colorTheme = 'gradient',
  showConfig = true,
  showQueue = true,
  showHistory = true,
  metadata,
}) => {
  // Panel state
  const [expanded, setExpanded] = useState(!compact);
  const [activeTab, setActiveTab] = useState<TabType>('publish');

  // Publishing state
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishStatus, setPublishStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  // Caption state
  const [caption, setCaption] = useState('');
  const [captionStyle, setCaptionStyle] = useState<CaptionStyle>('editorial');
  const [hashtags, setHashtags] = useState<string[]>(getDefaultHashtags('fashion'));
  const [customHashtags, setCustomHashtags] = useState('');

  // Configuration state
  const [instagramConfig, setInstagramConfig] = useState<InstagramConfig>(
    loadInstagramConfig() || getDefaultInstagramConfig()
  );
  const [hostingConfig, setHostingConfig] = useState<ImageHostingConfig>(
    loadHostingConfig() || getDefaultHostingConfig()
  );
  const [tokenValid, setTokenValid] = useState<boolean | null>(null);
  const [tokenUsername, setTokenUsername] = useState<string>('');

  // Queue state
  const [queue, setQueue] = useState<PostQueueItem[]>([]);
  const [logs, setLogs] = useState<InstagramPublishLog[]>([]);

  // Agent state
  const [agentRunning, setAgentRunning] = useState(false);

  // Theme colors
  const themeColors = {
    purple: { border: 'border-purple-500/30', bg: 'bg-purple-900/20', text: 'text-purple-300', accent: 'bg-purple-600', hover: 'hover:bg-purple-700' },
    pink: { border: 'border-pink-500/30', bg: 'bg-pink-900/20', text: 'text-pink-300', accent: 'bg-pink-600', hover: 'hover:bg-pink-700' },
    blue: { border: 'border-blue-500/30', bg: 'bg-blue-900/20', text: 'text-blue-300', accent: 'bg-blue-600', hover: 'hover:bg-blue-700' },
    teal: { border: 'border-teal-500/30', bg: 'bg-teal-900/20', text: 'text-teal-300', accent: 'bg-teal-600', hover: 'hover:bg-teal-700' },
    gradient: { border: 'border-pink-500/30', bg: 'bg-gradient-to-br from-purple-900/20 to-pink-900/20', text: 'text-pink-300', accent: 'bg-gradient-to-r from-purple-600 to-pink-600', hover: 'hover:from-purple-700 hover:to-pink-700' },
  };
  const theme = themeColors[colorTheme];

  // Load data on mount
  useEffect(() => {
    setQueue(getPostQueue());
    setLogs(getPublishLogs(50));
    setAgentRunning(isAgentRunning());

    // Generate initial caption
    if (!caption) {
      setCaption(generateCaption(captionStyle, metadata));
    }
  }, []);

  // Validate token on config change
  useEffect(() => {
    if (instagramConfig.accessToken) {
      validateAccessToken(instagramConfig.accessToken, instagramConfig.instagramBusinessAccountId)
        .then(result => {
          setTokenValid(result.valid);
          setTokenUsername(result.username || '');
        });
    } else {
      setTokenValid(null);
      setTokenUsername('');
    }
  }, [instagramConfig.accessToken]);

  // ============================================================================
  // HANDLERS
  // ============================================================================

  const handlePublishNow = async () => {
    if (!imageData) {
      setPublishStatus('error');
      setStatusMessage('No image to publish');
      return;
    }

    if (!instagramConfig.accessToken) {
      setPublishStatus('error');
      setStatusMessage('Instagram access token is required');
      return;
    }

    setIsPublishing(true);
    setPublishStatus('idle');
    setStatusMessage('Publishing to Instagram...');

    try {
      // Combine preset and custom hashtags
      const allHashtags = [
        ...hashtags,
        ...customHashtags.split(/[,\s]+/).filter(h => h.trim()),
      ];

      const result = await quickPublish(
        imageData,
        {
          caption,
          hashtags: allHashtags,
          captionStyle,
          metadata,
        },
        instagramConfig,
        hostingConfig
      );

      if (result.success) {
        setPublishStatus('success');
        setStatusMessage(`Published! Media ID: ${result.mediaId}`);
        onPublishSuccess?.(result.mediaId!);

        // Refresh logs
        setLogs(getPublishLogs(50));
      } else {
        setPublishStatus('error');
        setStatusMessage(result.error || 'Failed to publish');
        onPublishError?.(result.error || 'Unknown error');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setPublishStatus('error');
      setStatusMessage(errorMessage);
      onPublishError?.(errorMessage);
    } finally {
      setIsPublishing(false);
    }
  };

  const handleAddToQueue = () => {
    if (!imageData) return;

    const allHashtags = [
      ...hashtags,
      ...customHashtags.split(/[,\s]+/).filter(h => h.trim()),
    ];

    const item = addToQueue({
      imageData,
      caption,
      hashtags: allHashtags,
      metadata,
    });

    setQueue(getPostQueue());
    setStatusMessage(`Added to queue: ${item.id}`);
    setPublishStatus('success');
  };

  const handleRemoveFromQueue = (id: string) => {
    removeFromQueue(id);
    setQueue(getPostQueue());
  };

  const handleClearCompleted = () => {
    clearCompletedFromQueue();
    setQueue(getPostQueue());
  };

  const handleGenerateCaption = () => {
    setCaption(generateCaption(captionStyle, metadata));
  };

  const handleSaveConfig = () => {
    saveInstagramConfig(instagramConfig);
    saveHostingConfig(hostingConfig);
    setStatusMessage('Configuration saved!');
    setPublishStatus('success');
  };

  const handleToggleAgent = () => {
    if (agentRunning) {
      stopAgent();
    } else {
      const config = getAgentConfig() || getDefaultAgentConfig();
      config.instagram = instagramConfig;
      config.hosting = hostingConfig;
      saveAgentConfig(config);
      startAgent(config);
    }
    setAgentRunning(isAgentRunning());
  };

  // ============================================================================
  // RENDER HELPERS
  // ============================================================================

  const renderHeader = () => (
    <button
      onClick={() => setExpanded(!expanded)}
      className={`w-full flex items-center justify-between p-4 rounded-lg ${theme.bg} border ${theme.border} transition-all hover:opacity-90`}
    >
      <div className="flex items-center gap-3">
        {/* Instagram Icon */}
        <svg className={`w-6 h-6 ${theme.text}`} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
        <span className={`font-semibold ${theme.text}`}>Instagram Publishing</span>
        {tokenValid && (
          <span className="px-2 py-0.5 bg-green-600/50 text-green-200 text-xs rounded">
            @{tokenUsername || 'connected'}
          </span>
        )}
      </div>
      <div className="flex items-center gap-4">
        {/* Rate limit indicator */}
        <div className="text-xs text-gray-400">
          {getRateLimitState().remaining}/25 posts remaining
        </div>
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform ${expanded ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </button>
  );

  const renderTabs = () => (
    <div className="flex gap-1 p-1 bg-gray-800/50 rounded-lg mb-4">
      {(['publish', 'queue', 'history', 'config'] as TabType[]).map(tab => {
        if (tab === 'queue' && !showQueue) return null;
        if (tab === 'history' && !showHistory) return null;
        if (tab === 'config' && !showConfig) return null;

        return (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all ${
              activeTab === tab
                ? `${theme.accent} text-white`
                : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
            {tab === 'queue' && queue.length > 0 && (
              <span className="ml-1 px-1.5 py-0.5 bg-gray-700 rounded text-xs">
                {queue.length}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );

  const renderPublishTab = () => (
    <div className="space-y-4">
      {/* Status Message */}
      {statusMessage && (
        <div className={`p-3 rounded-lg ${
          publishStatus === 'success' ? 'bg-green-900/30 text-green-300 border border-green-500/30' :
          publishStatus === 'error' ? 'bg-red-900/30 text-red-300 border border-red-500/30' :
          'bg-blue-900/30 text-blue-300 border border-blue-500/30'
        }`}>
          {statusMessage}
        </div>
      )}

      {/* Image Preview */}
      {imageData && (
        <div className="relative">
          <img
            src={imageData}
            alt="To publish"
            className="w-full h-48 object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg" />
        </div>
      )}

      {/* Caption Style Selector */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Caption Style</label>
        <div className="grid grid-cols-3 gap-2">
          {(['editorial', 'minimalist', 'luxury', 'artistic', 'casual', 'custom'] as CaptionStyle[]).map(style => (
            <button
              key={style}
              onClick={() => {
                setCaptionStyle(style);
                if (style !== 'custom') {
                  setCaption(generateCaption(style, metadata));
                }
              }}
              className={`py-2 px-3 rounded-lg text-sm transition-all ${
                captionStyle === style
                  ? `${theme.accent} text-white`
                  : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
              }`}
            >
              {style.charAt(0).toUpperCase() + style.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Caption Editor */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-300">Caption</label>
          <span className="text-xs text-gray-500">{caption.length}/2200</span>
        </div>
        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Write a caption..."
          rows={3}
          className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 resize-none"
        />
        <button
          onClick={handleGenerateCaption}
          className="mt-2 text-sm text-pink-400 hover:text-pink-300"
        >
          Generate new caption
        </button>
      </div>

      {/* Hashtag Presets */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Hashtags</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {['fashion', 'artistic', 'portrait', 'luxury', 'minimal'].map(category => (
            <button
              key={category}
              onClick={() => setHashtags(getDefaultHashtags(category))}
              className="px-2 py-1 bg-gray-700/50 text-gray-300 rounded text-xs hover:bg-gray-600/50"
            >
              {category}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-1 p-2 bg-gray-800/50 rounded-lg min-h-[40px]">
          {hashtags.map((tag, i) => (
            <span key={i} className="px-2 py-1 bg-pink-900/30 text-pink-300 rounded text-xs">
              #{tag}
            </span>
          ))}
        </div>
        <input
          type="text"
          value={customHashtags}
          onChange={(e) => setCustomHashtags(e.target.value)}
          placeholder="Add custom hashtags (comma separated)"
          className="w-full mt-2 bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-2 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-pink-500"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={handlePublishNow}
          disabled={!imageData || isPublishing || !tokenValid}
          className={`flex-1 py-3 rounded-lg font-semibold text-white transition-all ${theme.accent} ${theme.hover} disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
        >
          {isPublishing ? (
            <>
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Publishing...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z"/>
              </svg>
              Publish Now
            </>
          )}
        </button>
        <button
          onClick={handleAddToQueue}
          disabled={!imageData}
          className="py-3 px-4 rounded-lg font-medium text-gray-300 bg-gray-700/50 hover:bg-gray-600/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Add to Queue
        </button>
      </div>

      {/* Token Warning */}
      {tokenValid === false && (
        <div className="p-3 bg-yellow-900/30 border border-yellow-500/30 rounded-lg text-yellow-300 text-sm">
          Instagram access token is invalid or expired. Please update it in the Config tab.
        </div>
      )}
    </div>
  );

  const renderQueueTab = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-white">Post Queue</h3>
        <div className="flex gap-2">
          <button
            onClick={handleClearCompleted}
            className="text-sm text-gray-400 hover:text-white"
          >
            Clear completed
          </button>
          <button
            onClick={handleToggleAgent}
            className={`px-3 py-1 rounded text-sm ${
              agentRunning
                ? 'bg-green-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {agentRunning ? 'Agent Running' : 'Start Agent'}
          </button>
        </div>
      </div>

      {queue.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No items in queue
        </div>
      ) : (
        <div className="space-y-2">
          {queue.map(item => (
            <div
              key={item.id}
              className={`p-3 rounded-lg border ${
                item.status === 'published' ? 'bg-green-900/20 border-green-500/30' :
                item.status === 'failed' ? 'bg-red-900/20 border-red-500/30' :
                item.status === 'publishing' ? 'bg-blue-900/20 border-blue-500/30' :
                'bg-gray-800/50 border-gray-700'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                  <img
                    src={item.hostedUrl || item.imageData}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-xs ${
                      item.status === 'published' ? 'bg-green-600 text-white' :
                      item.status === 'failed' ? 'bg-red-600 text-white' :
                      item.status === 'publishing' ? 'bg-blue-600 text-white' :
                      item.status === 'approved' ? 'bg-yellow-600 text-white' :
                      'bg-gray-600 text-gray-200'
                    }`}>
                      {item.status}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(item.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-300 mt-1 truncate">
                    {item.caption.substring(0, 60)}...
                  </p>
                  {item.error && (
                    <p className="text-xs text-red-400 mt-1">{item.error}</p>
                  )}
                </div>
                <button
                  onClick={() => handleRemoveFromQueue(item.id)}
                  className="text-gray-500 hover:text-red-400"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderHistoryTab = () => (
    <div className="space-y-4">
      <h3 className="font-semibold text-white">Publish History</h3>

      {logs.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No publish history yet
        </div>
      ) : (
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {logs.slice().reverse().map(log => (
            <div
              key={log.id}
              className={`p-3 rounded-lg border ${
                log.success
                  ? 'bg-green-900/20 border-green-500/30'
                  : 'bg-red-900/20 border-red-500/30'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className={`w-2 h-2 rounded-full ${log.success ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className="text-xs text-gray-400">
                  {new Date(log.timestamp).toLocaleString()}
                </span>
                <span className="text-xs text-gray-500">
                  {log.action}
                </span>
              </div>
              <p className="text-sm text-gray-300 truncate">
                {log.caption.substring(0, 80)}...
              </p>
              {log.instagramMediaId && (
                <p className="text-xs text-gray-500 mt-1">
                  Media ID: {log.instagramMediaId}
                </p>
              )}
              {log.error && (
                <p className="text-xs text-red-400 mt-1">{log.error}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderConfigTab = () => (
    <div className="space-y-6">
      {/* Instagram Access Token */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Instagram Access Token
          {tokenValid === true && <span className="ml-2 text-green-400">Valid</span>}
          {tokenValid === false && <span className="ml-2 text-red-400">Invalid</span>}
        </label>
        <input
          type="password"
          value={instagramConfig.accessToken}
          onChange={(e) => setInstagramConfig({ ...instagramConfig, accessToken: e.target.value })}
          placeholder="Enter your Page Access Token"
          className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500"
        />
        <p className="text-xs text-gray-500 mt-1">
          Requires instagram_content_publish permission
        </p>
      </div>

      {/* Account IDs */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Instagram Business Account ID
          </label>
          <input
            type="text"
            value={instagramConfig.instagramBusinessAccountId}
            onChange={(e) => setInstagramConfig({ ...instagramConfig, instagramBusinessAccountId: e.target.value })}
            className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-pink-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Facebook Page ID
          </label>
          <input
            type="text"
            value={instagramConfig.facebookPageId}
            onChange={(e) => setInstagramConfig({ ...instagramConfig, facebookPageId: e.target.value })}
            className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-pink-500"
          />
        </div>
      </div>

      {/* GitHub Hosting */}
      <div>
        <h4 className="font-semibold text-white mb-3">Image Hosting (GitHub)</h4>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              GitHub Token
            </label>
            <input
              type="password"
              value={hostingConfig.github?.token || ''}
              onChange={(e) => setHostingConfig({
                ...hostingConfig,
                github: { ...hostingConfig.github!, token: e.target.value }
              })}
              placeholder="GitHub Personal Access Token"
              className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Owner</label>
              <input
                type="text"
                value={hostingConfig.github?.owner || ''}
                onChange={(e) => setHostingConfig({
                  ...hostingConfig,
                  github: { ...hostingConfig.github!, owner: e.target.value }
                })}
                className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-pink-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Repo</label>
              <input
                type="text"
                value={hostingConfig.github?.repo || ''}
                onChange={(e) => setHostingConfig({
                  ...hostingConfig,
                  github: { ...hostingConfig.github!, repo: e.target.value }
                })}
                className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-pink-500 text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSaveConfig}
        className={`w-full py-3 rounded-lg font-semibold text-white ${theme.accent} ${theme.hover} transition-all`}
      >
        Save Configuration
      </button>
    </div>
  );

  // ============================================================================
  // MAIN RENDER
  // ============================================================================

  return (
    <div className="space-y-4">
      {compact && renderHeader()}

      {(expanded || !compact) && (
        <div className={`p-4 rounded-lg ${theme.bg} border ${theme.border}`}>
          {renderTabs()}

          {activeTab === 'publish' && renderPublishTab()}
          {activeTab === 'queue' && renderQueueTab()}
          {activeTab === 'history' && renderHistoryTab()}
          {activeTab === 'config' && renderConfigTab()}
        </div>
      )}
    </div>
  );
};

export default InstagramPublishPanel;
