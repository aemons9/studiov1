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

// Persistent Gallery Service
import {
  getAllImages,
  getFilteredImages,
  deleteImage,
  deleteMultipleImages,
  markAsPosted,
  getGalleryStats,
  cleanupOldImages,
  type GalleryImage,
  type SourceMode,
  type GalleryFilter,
  type GalleryStats,
} from '../services/instagram/galleryService';

// Fine Art Boudoir Collection
import {
  BOUDOIR_CONCEPTS,
  getConceptById,
  formatInstagramPost,
  buildFullPromptWithDeclaration,
  type BoudoirConcept,
} from '../concepts/fineArtBoudoirCabinCollection';

// Instagram service imports
import {
  // Token management
  saveTokenInfo,
  loadTokenInfo,
  saveGitHubToken,
  loadGitHubToken,
  initializeFromToken,
  getTokenStatus,
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

  // Reels service
  getMusicLibrary,
  uploadMusic,
  createAndPublishReel,
  isReelsServiceAvailable,
  DEFAULT_REEL_DURATIONS,
  type MusicTrack,
} from '../services/instagram';

interface InstagramModeProps {
  generatedImages: GeneratedImageData[] | null;
  onBack?: () => void;
}

type TabType = 'publish' | 'gallery' | 'queue' | 'agent' | 'settings' | 'history';

const InstagramMode: React.FC<InstagramModeProps> = ({ generatedImages, onBack }) => {
  // UI State
  const [activeTab, setActiveTab] = useState<TabType>('gallery');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

  // Token state
  const [tokenStatus, setTokenStatus] = useState(getTokenStatus());
  const [instagramToken, setInstagramToken] = useState('');
  const [githubToken, setGithubToken] = useState('');

  // Persistent Gallery state
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [galleryStats, setGalleryStats] = useState<GalleryStats | null>(null);
  const [galleryFilter, setGalleryFilter] = useState<GalleryFilter>({ sourceMode: 'all' });
  const [selectedGalleryImages, setSelectedGalleryImages] = useState<Set<string>>(new Set());
  const [galleryLoading, setGalleryLoading] = useState(true);

  // Publishing state - now using gallery image
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<GalleryImage | null>(null);
  const [caption, setCaption] = useState('');
  const [captionStyle, setCaptionStyle] = useState<CaptionStyle>('editorial');
  const [hashtags, setHashtags] = useState<string[]>([
    'fashion', 'photography', 'editorial', 'indianbeauty', 'portrait',
    'highfashion', 'veracrvs', 'artistic', 'aiart', 'model'
  ]);
  const [newHashtag, setNewHashtag] = useState('');
  const [selectedConcept, setSelectedConcept] = useState<BoudoirConcept | null>(null);

  // Queue state
  const [queue, setQueue] = useState<PostQueueItem[]>([]);
  const [logs, setLogs] = useState<InstagramPublishLog[]>([]);

  // Agent state
  const [agentRunning, setAgentRunning] = useState(isAgentRunning());
  const [agentState, setAgentState] = useState(getAgentState());

  // Reels state
  const [publishMode, setPublishMode] = useState<'image' | 'reel'>('image');
  const [musicLibrary, setMusicLibrary] = useState<MusicTrack[]>([]);
  const [selectedMusic, setSelectedMusic] = useState<string>('');
  const [reelDuration, setReelDuration] = useState(15);
  const [reelsAvailable, setReelsAvailable] = useState(false);
  const [musicLoading, setMusicLoading] = useState(false);

  // Load saved tokens and gallery on mount
  useEffect(() => {
    const savedGithub = loadGitHubToken();
    if (savedGithub) setGithubToken(savedGithub);

    const tokenInfo = loadTokenInfo();
    if (tokenInfo) setInstagramToken(tokenInfo.accessToken);

    refreshState();
    loadGalleryImages();
  }, []);

  // Check Reels service availability and load music library
  useEffect(() => {
    const checkReelsService = async () => {
      const available = await isReelsServiceAvailable();
      setReelsAvailable(available);

      if (available) {
        setMusicLoading(true);
        try {
          const tracks = await getMusicLibrary();
          setMusicLibrary(tracks);
        } catch (error) {
          console.error('Failed to load music library:', error);
        } finally {
          setMusicLoading(false);
        }
      }
    };

    checkReelsService();
  }, []);

  // Music upload handler
  const handleMusicUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setMusicLoading(true);
    try {
      const result = await uploadMusic(file);
      if (result.success) {
        // Reload music library
        const tracks = await getMusicLibrary();
        setMusicLibrary(tracks);
        setMessage({ type: 'success', text: `Music uploaded: ${result.filename}` });
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to upload music' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to upload music' });
    } finally {
      setMusicLoading(false);
    }
  };

  // Load gallery images from IndexedDB
  const loadGalleryImages = useCallback(async () => {
    setGalleryLoading(true);
    try {
      const images = galleryFilter.sourceMode === 'all'
        ? await getAllImages()
        : await getFilteredImages(galleryFilter);
      setGalleryImages(images);

      const stats = await getGalleryStats();
      setGalleryStats(stats);
    } catch (error) {
      console.error('Failed to load gallery:', error);
      setMessage({ type: 'error', text: 'Failed to load gallery images' });
    } finally {
      setGalleryLoading(false);
    }
  }, [galleryFilter]);

  // Reload gallery when filter changes
  useEffect(() => {
    loadGalleryImages();
  }, [galleryFilter, loadGalleryImages]);

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

  // Select a pre-built concept
  const handleSelectConcept = (conceptId: string) => {
    if (!conceptId) {
      setSelectedConcept(null);
      return;
    }
    const concept = getConceptById(conceptId);
    if (concept) {
      setSelectedConcept(concept);
      setCaption(concept.instagramCaption);
      setHashtags(concept.instagramHashtags);
      setMessage({ type: 'info', text: `Loaded concept: ${concept.name}` });
    }
  };

  // Copy generation prompt
  const handleCopyPrompt = () => {
    if (selectedConcept) {
      const fullPrompt = buildFullPromptWithDeclaration(selectedConcept);
      navigator.clipboard.writeText(fullPrompt);
      setMessage({ type: 'success', text: 'Full prompt copied to clipboard! Use in image generator.' });
    }
  };

  // Publish directly from gallery
  const handlePublish = async () => {
    if (!selectedGalleryImage) {
      setMessage({ type: 'error', text: 'No image selected for publishing. Select an image from the Gallery tab.' });
      return;
    }

    // Check if we have a token (don't require refresh)
    const tokenInfo = loadTokenInfo();
    if (!tokenInfo?.accessToken) {
      setMessage({ type: 'error', text: 'No Instagram token configured. Go to Settings tab.' });
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      const imageData = selectedGalleryImage.url;
      const finalCaption = caption || generateCaption(captionStyle);

      // Publish as Reel with music
      if (publishMode === 'reel') {
        if (!reelsAvailable) {
          setMessage({ type: 'error', text: 'Reels service not available. Make sure proxy server is running (npm run proxy).' });
          setIsLoading(false);
          return;
        }

        const savedGithub = loadGitHubToken();
        if (!savedGithub) {
          setMessage({ type: 'error', text: 'GitHub token required for Reel publishing. Go to Settings tab.' });
          setIsLoading(false);
          return;
        }

        setMessage({ type: 'info', text: 'Creating video and publishing as Reel... This may take a minute.' });

        const result = await createAndPublishReel({
          accessToken: tokenInfo.accessToken,
          imageData,
          caption: finalCaption,
          musicId: selectedMusic || undefined,
          duration: reelDuration,
          hashtags,
          githubToken: savedGithub,
          audioName: selectedMusic ? musicLibrary.find(m => m.id === selectedMusic)?.title : undefined,
        });

        if (result.success) {
          await markAsPosted(selectedGalleryImage.id, result.mediaId || '');
          setMessage({
            type: 'success',
            text: `Reel published! Media ID: ${result.mediaId}`,
          });
          refreshState();
          loadGalleryImages();
        } else {
          setMessage({
            type: 'error',
            text: result.error || 'Failed to publish Reel',
          });
        }
      } else {
        // Publish as regular image
        const result = await sendToInstagram(imageData, {
          caption: finalCaption,
          hashtags,
        });

        if (result.success) {
          await markAsPosted(selectedGalleryImage.id, result.mediaId || '');
          setMessage({
            type: 'success',
            text: `Published! Media ID: ${result.mediaId}`,
          });
          refreshState();
          loadGalleryImages();
        } else {
          setMessage({
            type: 'error',
            text: result.error || 'Failed to publish',
          });
        }
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

  // Add to queue from gallery
  const handleAddToQueue = () => {
    if (!selectedGalleryImage) {
      setMessage({ type: 'error', text: 'No image selected. Select an image from the Gallery tab.' });
      return;
    }

    const item = addToQueue({
      imageData: selectedGalleryImage.url,
      caption: caption || generateCaption(captionStyle),
      hashtags,
      metadata: {
        conceptName: selectedGalleryImage.metadata.conceptName || 'Vera Collection',
        generatedAt: new Date(selectedGalleryImage.timestamp).toISOString(),
      },
    });

    setMessage({ type: 'success', text: `Added to queue: ${item.id}` });
    refreshState();
  };

  // Gallery management handlers
  const handleSelectGalleryImage = (image: GalleryImage) => {
    setSelectedGalleryImage(image);
    // Auto-fill caption/hashtags from concept if available
    if (image.metadata.conceptId) {
      const concept = getConceptById(image.metadata.conceptId);
      if (concept) {
        setCaption(concept.instagramCaption);
        setHashtags(concept.instagramHashtags);
      }
    }
    setActiveTab('publish');
    setMessage({ type: 'info', text: `Selected image from ${image.sourceMode} mode` });
  };

  const handleDeleteGalleryImage = async (id: string) => {
    try {
      await deleteImage(id);
      if (selectedGalleryImage?.id === id) {
        setSelectedGalleryImage(null);
      }
      selectedGalleryImages.delete(id);
      setSelectedGalleryImages(new Set(selectedGalleryImages));
      await loadGalleryImages();
      setMessage({ type: 'info', text: 'Image deleted from gallery' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to delete image' });
    }
  };

  const handleDeleteSelectedImages = async () => {
    if (selectedGalleryImages.size === 0) return;

    try {
      await deleteMultipleImages(Array.from(selectedGalleryImages));
      if (selectedGalleryImage && selectedGalleryImages.has(selectedGalleryImage.id)) {
        setSelectedGalleryImage(null);
      }
      setSelectedGalleryImages(new Set());
      await loadGalleryImages();
      setMessage({ type: 'info', text: `Deleted ${selectedGalleryImages.size} images` });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to delete images' });
    }
  };

  const handleCleanupOldImages = async () => {
    try {
      const count = await cleanupOldImages({ maxAgeDays: 30, keepPosted: true });
      await loadGalleryImages();
      setMessage({ type: 'info', text: `Cleaned up ${count} old images (kept posted ones)` });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to cleanup images' });
    }
  };

  const toggleImageSelection = (id: string) => {
    const newSelection = new Set(selectedGalleryImages);
    if (newSelection.has(id)) {
      newSelection.delete(id);
    } else {
      newSelection.add(id);
    }
    setSelectedGalleryImages(newSelection);
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
    <div className="flex border-b border-gray-700 mb-6 overflow-x-auto">
      {(['gallery', 'publish', 'queue', 'agent', 'settings', 'history'] as TabType[]).map(tab => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-4 sm:px-6 py-3 text-sm font-medium transition-colors whitespace-nowrap flex items-center gap-2 ${
            activeTab === tab
              ? 'text-pink-400 border-b-2 border-pink-400'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          {tab === 'gallery' && <span>📸</span>}
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
          {tab === 'gallery' && galleryStats && (
            <span className="ml-1 px-1.5 py-0.5 bg-pink-600/30 text-pink-300 text-xs rounded-full">
              {galleryStats.totalImages}
            </span>
          )}
        </button>
      ))}
    </div>
  );

  // Render gallery tab - persistent image library
  const renderGalleryTab = () => (
    <div className="space-y-6">
      {/* Stats & Filters */}
      <div className="bg-gray-800 rounded-lg p-4">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-4">
            <h3 className="text-lg font-semibold text-white">Image Gallery</h3>
            {galleryStats && (
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <span>{galleryStats.totalImages} total</span>
                <span className="text-green-400">{galleryStats.posted} posted</span>
                <span className="text-yellow-400">{galleryStats.unposted} pending</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Filter by mode */}
            <select
              value={galleryFilter.sourceMode || 'all'}
              onChange={(e) => setGalleryFilter({
                ...galleryFilter,
                sourceMode: e.target.value as SourceMode | 'all'
              })}
              className="bg-gray-700 text-white rounded-lg px-3 py-2 text-sm"
            >
              <option value="all">All Modes</option>
              <option value="classic">Classic</option>
              <option value="roleplay">Roleplay</option>
              <option value="masterclass">MasterClass</option>
              <option value="platinum">Platinum</option>
              <option value="vera">Vera</option>
              <option value="experimental">Experimental</option>
              <option value="visualnovel">Visual Novel</option>
              <option value="artistic">Artistic</option>
            </select>

            {/* Filter by posted status */}
            <select
              value={galleryFilter.posted === undefined ? 'all' : galleryFilter.posted ? 'posted' : 'unposted'}
              onChange={(e) => setGalleryFilter({
                ...galleryFilter,
                posted: e.target.value === 'all' ? undefined : e.target.value === 'posted'
              })}
              className="bg-gray-700 text-white rounded-lg px-3 py-2 text-sm"
            >
              <option value="all">All Status</option>
              <option value="unposted">Not Posted</option>
              <option value="posted">Posted</option>
            </select>

            {/* Refresh button */}
            <button
              onClick={loadGalleryImages}
              disabled={galleryLoading}
              className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm"
            >
              {galleryLoading ? '...' : '↻ Refresh'}
            </button>
          </div>
        </div>

        {/* Bulk actions */}
        {selectedGalleryImages.size > 0 && (
          <div className="flex items-center gap-3 pt-3 border-t border-gray-700">
            <span className="text-sm text-gray-400">{selectedGalleryImages.size} selected</span>
            <button
              onClick={handleDeleteSelectedImages}
              className="px-3 py-1 bg-red-600/20 hover:bg-red-600/40 text-red-400 rounded text-sm"
            >
              Delete Selected
            </button>
            <button
              onClick={() => setSelectedGalleryImages(new Set())}
              className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded text-sm"
            >
              Clear Selection
            </button>
          </div>
        )}
      </div>

      {/* Gallery Grid */}
      {galleryLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-pink-500"></div>
        </div>
      ) : galleryImages.length === 0 ? (
        <div className="bg-gray-800 rounded-lg p-12 text-center">
          <p className="text-gray-400 text-lg mb-2">No images in gallery</p>
          <p className="text-gray-500 text-sm">
            Generate images in any mode (Classic, Roleplay, Platinum, etc.) and they'll automatically appear here!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {galleryImages.map((image) => (
            <div
              key={image.id}
              className={`relative group rounded-lg overflow-hidden bg-gray-800 cursor-pointer transition-all ${
                selectedGalleryImage?.id === image.id ? 'ring-2 ring-pink-500' : ''
              } ${selectedGalleryImages.has(image.id) ? 'ring-2 ring-blue-500' : ''}`}
            >
              {/* Thumbnail */}
              <div
                className="aspect-[4/5] bg-gray-700"
                onClick={() => handleSelectGalleryImage(image)}
              >
                <img
                  src={image.thumbnailUrl || image.url}
                  alt="Gallery image"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    console.error('Failed to load gallery image:', image.id, image.url?.substring(0, 100));
                    // Show placeholder on error
                    (e.target as HTMLImageElement).style.display = 'none';
                    const parent = (e.target as HTMLImageElement).parentElement;
                    if (parent && !parent.querySelector('.error-placeholder')) {
                      const placeholder = document.createElement('div');
                      placeholder.className = 'error-placeholder w-full h-full flex items-center justify-center text-gray-400 text-xs';
                      placeholder.innerHTML = '<span>Failed to load</span>';
                      parent.appendChild(placeholder);
                    }
                  }}
                />
              </div>

              {/* Selection checkbox */}
              <div
                className="absolute top-2 left-2 z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleImageSelection(image.id);
                }}
              >
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center cursor-pointer ${
                  selectedGalleryImages.has(image.id)
                    ? 'bg-blue-500 border-blue-500'
                    : 'bg-gray-800/70 border-gray-400 hover:border-white'
                }`}>
                  {selectedGalleryImages.has(image.id) && (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </div>

              {/* Status badge */}
              {image.instagramStatus?.posted && (
                <div className="absolute top-2 right-2">
                  <span className="px-1.5 py-0.5 bg-green-600 text-white text-xs rounded">
                    Posted
                  </span>
                </div>
              )}

              {/* Overlay with info */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-white text-xs truncate capitalize">{image.sourceMode}</p>
                <p className="text-gray-400 text-xs">
                  {new Date(image.timestamp).toLocaleDateString()}
                </p>
              </div>

              {/* Delete button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteGalleryImage(image.id);
                }}
                className="absolute top-2 right-2 p-1 bg-red-600/80 rounded opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500"
              >
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Cleanup option */}
      {galleryStats && galleryStats.totalImages > 50 && (
        <div className="bg-gray-800 rounded-lg p-4 flex items-center justify-between">
          <div>
            <p className="text-white text-sm">Gallery getting large?</p>
            <p className="text-gray-400 text-xs">Clean up images older than 30 days (keeps posted ones)</p>
          </div>
          <button
            onClick={handleCleanupOldImages}
            className="px-4 py-2 bg-yellow-600/20 hover:bg-yellow-600/40 text-yellow-400 rounded-lg text-sm"
          >
            Cleanup Old Images
          </button>
        </div>
      )}

      {/* Mode Stats */}
      {galleryStats && (
        <div className="bg-gray-800 rounded-lg p-4">
          <h4 className="text-white font-medium mb-3">Images by Mode</h4>
          <div className="flex flex-wrap gap-2">
            {Object.entries(galleryStats.byMode)
              .filter(([_, count]) => count > 0)
              .sort(([, a], [, b]) => b - a)
              .map(([mode, count]) => (
                <button
                  key={mode}
                  onClick={() => setGalleryFilter({ ...galleryFilter, sourceMode: mode as SourceMode })}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    galleryFilter.sourceMode === mode
                      ? 'bg-pink-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {mode}: {count}
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
  );

  // Render publish tab
  const renderPublishTab = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Selected Image from Gallery */}
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Selected Image</h3>
          {selectedGalleryImage && (
            <span className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded capitalize">
              From: {selectedGalleryImage.sourceMode}
            </span>
          )}
        </div>

        {selectedGalleryImage ? (
          <>
            <div className="aspect-[4/5] rounded-lg overflow-hidden mb-4 bg-gray-900">
              <img
                src={selectedGalleryImage.url}
                alt="Selected for Instagram"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">
                {new Date(selectedGalleryImage.timestamp).toLocaleString()}
              </span>
              {selectedGalleryImage.instagramStatus?.posted ? (
                <span className="px-2 py-1 bg-green-600/30 text-green-400 rounded">
                  Already Posted
                </span>
              ) : (
                <span className="px-2 py-1 bg-yellow-600/30 text-yellow-400 rounded">
                  Not Posted
                </span>
              )}
            </div>

            <button
              onClick={() => setActiveTab('gallery')}
              className="mt-4 w-full py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm"
            >
              Select Different Image
            </button>
          </>
        ) : (
          <div className="aspect-[4/5] rounded-lg bg-gray-900 flex flex-col items-center justify-center text-gray-500 p-6">
            <p className="text-center mb-4">No image selected</p>
            <button
              onClick={() => setActiveTab('gallery')}
              className="px-6 py-3 bg-pink-600 hover:bg-pink-500 text-white rounded-lg"
            >
              Browse Gallery
            </button>
          </div>
        )}
      </div>

      {/* Caption & Options */}
      <div className="space-y-6">
        {/* Pre-Built Concept Selector */}
        <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-lg p-6 border border-purple-500/30">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-white">Fine Art Boudoir Concepts</h3>
              <p className="text-gray-400 text-xs mt-1">Indian Hourglass Muse - Intimacy 10 - Cabin Collection</p>
            </div>
            <span className="px-2 py-1 bg-pink-600/30 text-pink-300 text-xs rounded-full">10 Concepts</span>
          </div>

          <select
            value={selectedConcept?.id || ''}
            onChange={(e) => handleSelectConcept(e.target.value)}
            className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 mb-3 border border-purple-500/30"
          >
            <option value="">Select a pre-built concept...</option>
            {BOUDOIR_CONCEPTS.map(concept => (
              <option key={concept.id} value={concept.id}>
                {concept.name}
              </option>
            ))}
          </select>

          {selectedConcept && (
            <div className="space-y-3">
              <div className="bg-gray-800/50 rounded-lg p-3">
                <p className="text-gray-400 text-xs mb-1">Environment</p>
                <p className="text-white text-sm">{selectedConcept.environment.replace(/_/g, ' ')}</p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-3">
                <p className="text-gray-400 text-xs mb-1">Wardrobe</p>
                <p className="text-white text-sm">{selectedConcept.wardrobe.replace(/_/g, ' ')}</p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-3">
                <p className="text-gray-400 text-xs mb-1">Artistic Direction</p>
                <p className="text-white text-sm">{selectedConcept.artisticDirection}</p>
              </div>
              <button
                onClick={handleCopyPrompt}
                className="w-full py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-sm font-medium transition-colors"
              >
                Copy Full Prompt for Generation
              </button>
            </div>
          )}
        </div>

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

        {/* Publish Mode Toggle */}
        <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg p-6 border border-purple-500/30">
          <h3 className="text-lg font-semibold text-white mb-4">Publish Type</h3>

          <div className="flex gap-4 mb-4">
            <button
              onClick={() => setPublishMode('image')}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                publishMode === 'image'
                  ? 'bg-pink-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <span className="text-xl mr-2">📷</span>
              Image Post
            </button>
            <button
              onClick={() => setPublishMode('reel')}
              disabled={!reelsAvailable}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                publishMode === 'reel'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <span className="text-xl mr-2">🎬</span>
              Reel with Music
              {!reelsAvailable && <span className="block text-xs mt-1">(Proxy server required)</span>}
            </button>
          </div>

          {/* Reel Settings */}
          {publishMode === 'reel' && reelsAvailable && (
            <div className="space-y-4 pt-4 border-t border-purple-500/30">
              {/* Duration */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">Video Duration</label>
                <select
                  value={reelDuration}
                  onChange={(e) => setReelDuration(Number(e.target.value))}
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-2"
                >
                  {DEFAULT_REEL_DURATIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              {/* Music Selection */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm text-gray-400">Background Music</label>
                  <label className="cursor-pointer text-pink-400 hover:text-pink-300 text-sm">
                    <input
                      type="file"
                      accept="audio/*"
                      onChange={handleMusicUpload}
                      className="hidden"
                    />
                    + Upload Music
                  </label>
                </div>

                {musicLoading ? (
                  <div className="text-gray-500 text-sm py-2">Loading music library...</div>
                ) : musicLibrary.length === 0 ? (
                  <div className="bg-gray-700/50 rounded-lg p-4 text-center">
                    <p className="text-gray-400 text-sm mb-2">No music tracks available</p>
                    <p className="text-gray-500 text-xs">
                      Upload MP3 files or add them to:<br />
                      <code className="text-pink-400">assets/music/</code>
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    <button
                      onClick={() => setSelectedMusic('')}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                        !selectedMusic
                          ? 'bg-purple-600/30 border border-purple-500'
                          : 'bg-gray-700 hover:bg-gray-600'
                      }`}
                    >
                      <span className="text-gray-300">No music (silent)</span>
                    </button>
                    {musicLibrary.map(track => (
                      <button
                        key={track.id}
                        onClick={() => setSelectedMusic(track.id)}
                        className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                          selectedMusic === track.id
                            ? 'bg-purple-600/30 border border-purple-500'
                            : 'bg-gray-700 hover:bg-gray-600'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl">🎵</span>
                          <div>
                            <p className="text-white font-medium">{track.title}</p>
                            <p className="text-gray-400 text-xs">{track.artist}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="text-xs text-gray-500 mt-2">
                <p>Note: Music will be embedded into a video with your image and published as a Reel.</p>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            onClick={handlePublish}
            disabled={isLoading || !selectedGalleryImage}
            className={`flex-1 py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed ${
              publishMode === 'reel'
                ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-500 hover:via-pink-500 hover:to-red-500 text-white'
                : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white'
            }`}
          >
            {isLoading
              ? (publishMode === 'reel' ? 'Creating Reel...' : 'Publishing...')
              : (publishMode === 'reel' ? '🎬 Publish as Reel' : '📷 Publish Now')}
          </button>

          <button
            onClick={handleAddToQueue}
            disabled={!selectedGalleryImage || publishMode === 'reel'}
            className="flex-1 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            title={publishMode === 'reel' ? 'Queue not available for Reels' : undefined}
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
      {/* Token Status - Always Ready */}
      <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border border-green-500/30 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
          <h3 className="text-lg font-semibold text-green-400">Ready to Publish</h3>
        </div>

        <p className="text-gray-300 mb-4">
          Default tokens are pre-configured. You can publish to @veracrvs immediately without any setup.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-800/50 rounded-lg p-4">
            <p className="text-gray-400 text-sm">Instagram</p>
            <p className="text-lg font-semibold text-green-400">✓ Connected</p>
          </div>

          <div className="bg-gray-800/50 rounded-lg p-4">
            <p className="text-gray-400 text-sm">Token Type</p>
            <p className="text-lg font-semibold text-white">Page Token</p>
          </div>

          <div className="bg-gray-800/50 rounded-lg p-4">
            <p className="text-gray-400 text-sm">Expires</p>
            <p className="text-lg font-semibold text-green-400">Never</p>
          </div>

          <div className="bg-gray-800/50 rounded-lg p-4">
            <p className="text-gray-400 text-sm">GitHub</p>
            <p className="text-lg font-semibold text-green-400">✓ Connected</p>
          </div>
        </div>
      </div>

      {/* Optional Custom Token Configuration */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-2">Custom Tokens (Optional)</h3>
        <p className="text-gray-400 text-sm mb-4">
          Override default tokens with your own. Leave empty to use defaults.
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-400 text-sm mb-2">
              Instagram Page Access Token
              <span className="ml-2 text-green-400 text-xs">(default configured)</span>
            </label>
            <input
              type="password"
              value={instagramToken}
              onChange={(e) => setInstagramToken(e.target.value)}
              placeholder="Leave empty to use default..."
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 font-mono text-sm"
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">
              GitHub Token
              <span className="ml-2 text-green-400 text-xs">(default configured)</span>
            </label>
            <input
              type="password"
              value={githubToken}
              onChange={(e) => setGithubToken(e.target.value)}
              placeholder="Leave empty to use default..."
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 font-mono text-sm"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              onClick={handleSaveTokens}
              disabled={isLoading || (!instagramToken && !githubToken)}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-lg font-semibold disabled:opacity-50"
            >
              {isLoading ? 'Saving...' : 'Save Custom Tokens'}
            </button>

            <button
              onClick={() => {
                clearTokens();
                setInstagramToken('');
                setGithubToken('');
                refreshState();
                setMessage({ type: 'info', text: 'Custom tokens cleared - using defaults' });
              }}
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg"
            >
              Reset to Defaults
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
        {activeTab === 'gallery' && renderGalleryTab()}
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
