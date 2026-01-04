/**
 * REPLICATE API PROXY SERVER
 *
 * This server proxies requests to Replicate API to avoid CORS issues.
 * Browsers cannot directly call Replicate API due to CORS restrictions.
 *
 * Usage:
 *   npm run proxy
 *
 * The proxy server runs on http://localhost:3001
 * Your Vite app runs on http://localhost:3000
 */

import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import fsSync from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';

// Set FFmpeg path from npm package
ffmpeg.setFfmpegPath(ffmpegInstaller.path);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

// Enable CORS for all origins (dev only - restrict in production)
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Asset directory for Visual Novel
const ASSETS_DIR = path.join(__dirname, 'visualnovel', 'assets');

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'replicate-proxy' });
});

// Proxy POST /predictions
app.post('/api/replicate/predictions', async (req, res) => {
  try {
    const { token, ...body } = req.body;

    if (!token) {
      return res.status(400).json({ error: 'Replicate API token required' });
    }

    console.log('🎨 Proxying Replicate prediction request...');

    const response = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Prefer': 'wait',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('❌ Replicate API error:', data);
      return res.status(response.status).json(data);
    }

    console.log('✅ Prediction created:', data.id);
    res.json(data);
  } catch (error) {
    console.error('❌ Proxy error:', error);
    res.status(500).json({
      error: 'Proxy server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Proxy GET /predictions/:id
app.get('/api/replicate/predictions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return res.status(400).json({ error: 'Replicate API token required in Authorization header' });
    }

    const response = await fetch(`https://api.replicate.com/v1/predictions/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    res.json(data);
  } catch (error) {
    console.error('❌ Proxy error:', error);
    res.status(500).json({
      error: 'Proxy server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Proxy GET /models/:owner/:name (for fetching model versions)
// Using a regex parameter to match the full path
app.get(/^\/api\/replicate\/models\/(.+)$/, async (req, res) => {
  try {
    // Extract model path from the regex capture group
    // e.g., "black-forest-labs/flux-1.1-pro-ultra"
    const model = req.params[0];
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return res.status(400).json({ error: 'Replicate API token required in Authorization header' });
    }

    console.log('🔍 Fetching model info:', model);

    const response = await fetch(`https://api.replicate.com/v1/models/${model}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('❌ Model fetch error:', data);
      return res.status(response.status).json(data);
    }

    console.log('✅ Model info fetched:', data.latest_version?.id?.substring(0, 12) + '...');
    res.json(data);
  } catch (error) {
    console.error('❌ Proxy error:', error);
    res.status(500).json({
      error: 'Proxy server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Proxy image downloads
app.get('/api/replicate/download', async (req, res) => {
  try {
    const { url } = req.query;

    if (!url || typeof url !== 'string') {
      return res.status(400).json({ error: 'Image URL required' });
    }

    console.log('📥 Downloading image via proxy:', url);

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; ReplicateProxy/1.0)',
      },
    });

    if (!response.ok) {
      console.error(`❌ Image fetch failed: ${response.status} ${response.statusText}`);
      return res.status(response.status).json({
        error: 'Failed to download image',
        status: response.status,
        statusText: response.statusText
      });
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const contentType = response.headers.get('content-type') || 'image/jpeg';
    console.log(`✅ Image downloaded: ${buffer.length} bytes, type: ${contentType}`);

    res.set('Content-Type', contentType);
    res.send(buffer);
  } catch (error) {
    console.error('❌ Download error:', error);
    res.status(500).json({
      error: 'Download error',
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
  }
});

// ==========================================
// GCP OAUTH TOKEN AUTO-REFRESH
// ==========================================

/**
 * GET /api/gcloud-token
 * Fetches fresh OAuth token from gcloud CLI
 */
app.get('/api/gcloud-token', async (req, res) => {
  try {
    const { exec } = await import('child_process');
    const { promisify } = await import('util');
    const execAsync = promisify(exec);

    console.log('🔄 Fetching fresh OAuth token from gcloud...');

    const { stdout, stderr } = await execAsync('gcloud auth print-access-token');

    if (stderr) {
      console.error('⚠️ gcloud stderr:', stderr);
    }

    const token = stdout.trim();

    if (!token) {
      throw new Error('No token returned from gcloud');
    }

    console.log('✅ Fresh OAuth token fetched:', token.substring(0, 20) + '...');

    res.json({
      success: true,
      token: token,
      expiresIn: 3600, // 1 hour in seconds
      fetchedAt: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Failed to fetch gcloud token:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Unknown error',
      hint: 'Make sure gcloud CLI is installed and authenticated (run: gcloud auth login)'
    });
  }
});

/**
 * GET /api/gcloud-project
 * Fetches current GCP project ID from gcloud CLI
 */
app.get('/api/gcloud-project', async (req, res) => {
  try {
    const { exec } = await import('child_process');
    const { promisify } = await import('util');
    const execAsync = promisify(exec);

    console.log('🔄 Fetching GCP project ID from gcloud...');

    const { stdout, stderr } = await execAsync('gcloud config get-value project');

    if (stderr && !stderr.includes('WARNING')) {
      console.error('⚠️ gcloud stderr:', stderr);
    }

    const projectId = stdout.trim();

    if (!projectId) {
      throw new Error('No project ID configured in gcloud');
    }

    console.log('✅ GCP Project ID:', projectId);

    res.json({
      success: true,
      projectId: projectId,
      fetchedAt: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Failed to fetch gcloud project:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Unknown error',
      hint: 'Make sure gcloud CLI is configured (run: gcloud config set project YOUR_PROJECT_ID)'
    });
  }
});

// ==========================================
// VISUAL NOVEL ASSET SAVING ENDPOINTS
// ==========================================

/**
 * POST /api/save-asset
 * Saves generated VN assets to file system
 */
app.post('/api/save-asset', async (req, res) => {
  try {
    const { assetId, type, base64Image, filename } = req.body;

    if (!assetId || !type || !base64Image || !filename) {
      return res.status(400).json({
        error: 'Missing required fields: assetId, type, base64Image, filename'
      });
    }

    // Determine subfolder based on asset type
    const subfolderMap = {
      'sprite': 'sprites',
      'character_sprite': 'sprites',
      'background': 'backgrounds',
      'cg': 'cg',
      'cg_image': 'cg',
      'cutscene_video': 'videos',
      'ui_element': 'ui',
      'bgm': 'bgm',
      'sfx': 'sfx',
      'location_map': 'maps'
    };

    const subfolder = subfolderMap[type] || 'misc';
    const targetDir = path.join(ASSETS_DIR, subfolder);

    // Ensure directory exists
    await fs.mkdir(targetDir, { recursive: true });

    // Clean base64 string (remove data URI prefix if present)
    let cleanBase64 = base64Image;
    if (cleanBase64.includes(',')) {
      cleanBase64 = cleanBase64.split(',')[1];
    }

    // Convert base64 to buffer
    const imageBuffer = Buffer.from(cleanBase64, 'base64');

    // Save to file
    const filePath = path.join(targetDir, filename);
    await fs.writeFile(filePath, imageBuffer);

    console.log(`✅ Saved VN asset: ${subfolder}/${filename} (${(imageBuffer.length / 1024).toFixed(1)} KB)`);

    res.json({
      success: true,
      path: `visualnovel/assets/${subfolder}/${filename}`,
      size: imageBuffer.length
    });

  } catch (error) {
    console.error('❌ Failed to save VN asset:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * GET /api/assets
 * Returns list of all saved VN assets
 */
app.get('/api/assets', async (req, res) => {
  try {
    const assets = {};
    const subfolders = ['sprites', 'backgrounds', 'cg', 'videos', 'ui', 'bgm', 'sfx', 'maps'];

    for (const subfolder of subfolders) {
      const dirPath = path.join(ASSETS_DIR, subfolder);

      try {
        const files = await fs.readdir(dirPath);
        assets[subfolder] = files;
      } catch (error) {
        // Directory doesn't exist yet
        assets[subfolder] = [];
      }
    }

    res.json(assets);

  } catch (error) {
    console.error('❌ Failed to list VN assets:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// ==========================================
// INSTAGRAM GRAPH API ENDPOINTS
// ==========================================

/**
 * Instagram API Configuration
 * Default values for @veracrvs account
 */
const INSTAGRAM_CONFIG = {
  BUSINESS_ACCOUNT_ID: '17841478517688462',
  FACEBOOK_PAGE_ID: '888169534380297',
  GRAPH_API_VERSION: 'v21.0',
  GRAPH_API_BASE: 'https://graph.facebook.com/v21.0',
};

/**
 * POST /api/instagram/publish
 *
 * Complete Instagram publishing flow:
 * 1. Upload image to GitHub (for public URL)
 * 2. Create media container
 * 3. Wait for processing
 * 4. Publish to Instagram
 *
 * Required body:
 * - accessToken: Instagram Page Access Token
 * - imageData: Base64 encoded image
 * - caption: Post caption
 *
 * Optional:
 * - hashtags: Array of hashtags
 * - instagramAccountId: Override default account
 * - githubToken: Token for image hosting
 * - githubOwner, githubRepo, githubBranch: GitHub config
 */
app.post('/api/instagram/publish', async (req, res) => {
  try {
    const {
      accessToken,
      imageData,
      caption,
      hashtags = [],
      instagramAccountId = INSTAGRAM_CONFIG.BUSINESS_ACCOUNT_ID,
      githubToken,
      githubOwner = 'aemons9',
      githubRepo = 'studiov1',
      githubBranch = 'main',
    } = req.body;

    if (!accessToken) {
      return res.status(400).json({ error: 'Instagram access token required' });
    }

    if (!imageData) {
      return res.status(400).json({ error: 'Image data (base64) required' });
    }

    console.log('📸 Starting Instagram publish flow...');

    // Step 1: Upload image to GitHub for public URL
    let publicUrl;
    if (imageData.startsWith('https://')) {
      // Already a public URL
      publicUrl = imageData;
      console.log('   Using existing public URL');
    } else if (githubToken) {
      console.log('   Step 1: Uploading to GitHub...');

      // Generate filename
      const timestamp = new Date().toISOString()
        .replace(/[-:]/g, '')
        .replace('T', '-')
        .replace(/\..+/, '');
      const filename = `veracrvs-${timestamp}-${Math.random().toString(36).substr(2, 6)}.jpg`;
      const filePath = `photo/instagram/${filename}`;

      // Clean base64
      let cleanBase64 = imageData;
      if (cleanBase64.includes(',')) {
        cleanBase64 = cleanBase64.split(',')[1];
      }

      // Upload to GitHub
      const githubApiUrl = `https://api.github.com/repos/${githubOwner}/${githubRepo}/contents/${filePath}`;

      const githubResponse = await fetch(githubApiUrl, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${githubToken}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `[Instagram] Add image: ${filename}`,
          content: cleanBase64,
          branch: githubBranch,
        }),
      });

      if (!githubResponse.ok) {
        const error = await githubResponse.json();
        console.error('❌ GitHub upload failed:', error);
        return res.status(500).json({
          error: 'Failed to upload image to GitHub',
          details: error.message,
        });
      }

      publicUrl = `https://raw.githubusercontent.com/${githubOwner}/${githubRepo}/${githubBranch}/${filePath}`;
      console.log(`   ✅ Uploaded to: ${publicUrl}`);

      // Wait for GitHub to propagate
      await new Promise(resolve => setTimeout(resolve, 2000));
    } else {
      return res.status(400).json({
        error: 'Either a public URL or GitHub token is required for image hosting',
      });
    }

    // Step 2: Format caption with hashtags
    let finalCaption = caption || '';
    if (hashtags.length > 0) {
      const formattedHashtags = hashtags
        .map(tag => tag.startsWith('#') ? tag : `#${tag}`)
        .slice(0, 30)
        .join(' ');
      finalCaption = finalCaption
        ? `${finalCaption}\n\n${formattedHashtags}`
        : formattedHashtags;
    }

    console.log('   Step 2: Creating media container...');

    // Step 3: Create media container
    const containerUrl = `${INSTAGRAM_CONFIG.GRAPH_API_BASE}/${instagramAccountId}/media`;
    const containerParams = new URLSearchParams({
      image_url: publicUrl,
      caption: finalCaption,
      access_token: accessToken,
    });

    const containerResponse = await fetch(containerUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: containerParams.toString(),
    });

    const containerData = await containerResponse.json();

    if (!containerResponse.ok) {
      console.error('❌ Container creation failed:', containerData);
      return res.status(containerResponse.status).json({
        error: 'Failed to create media container',
        details: containerData.error?.message || containerData,
      });
    }

    const containerId = containerData.id;
    console.log(`   ✅ Container created: ${containerId}`);

    // Step 4: Wait for container to be ready
    console.log('   Step 3: Waiting for processing...');
    let containerReady = false;
    let attempts = 0;
    const maxAttempts = 30;

    while (!containerReady && attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 2000));

      const statusUrl = `${INSTAGRAM_CONFIG.GRAPH_API_BASE}/${containerId}?fields=status,status_code&access_token=${accessToken}`;
      const statusResponse = await fetch(statusUrl);
      const statusData = await statusResponse.json();

      if (statusData.status === 'FINISHED') {
        containerReady = true;
        console.log('   ✅ Container ready');
      } else if (statusData.status === 'ERROR') {
        console.error('❌ Container processing failed:', statusData);
        return res.status(500).json({
          error: 'Media container processing failed',
          status_code: statusData.status_code,
        });
      }

      attempts++;
    }

    if (!containerReady) {
      return res.status(500).json({
        error: 'Timeout waiting for media container to process',
      });
    }

    // Step 5: Publish
    console.log('   Step 4: Publishing to Instagram...');

    const publishUrl = `${INSTAGRAM_CONFIG.GRAPH_API_BASE}/${instagramAccountId}/media_publish`;
    const publishParams = new URLSearchParams({
      creation_id: containerId,
      access_token: accessToken,
    });

    const publishResponse = await fetch(publishUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: publishParams.toString(),
    });

    const publishData = await publishResponse.json();

    if (!publishResponse.ok) {
      console.error('❌ Publish failed:', publishData);
      return res.status(publishResponse.status).json({
        error: 'Failed to publish to Instagram',
        details: publishData.error?.message || publishData,
      });
    }

    console.log(`🎉 Successfully published! Media ID: ${publishData.id}`);

    res.json({
      success: true,
      mediaId: publishData.id,
      publicUrl,
      caption: finalCaption,
      publishedAt: new Date().toISOString(),
    });

  } catch (error) {
    console.error('❌ Instagram publish error:', error);
    res.status(500).json({
      error: 'Instagram publish failed',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

/**
 * POST /api/instagram/create-container
 *
 * Step 1 of publishing: Create media container only
 * Use this for more control over the publishing process
 */
app.post('/api/instagram/create-container', async (req, res) => {
  try {
    const {
      accessToken,
      imageUrl,
      caption,
      instagramAccountId = INSTAGRAM_CONFIG.BUSINESS_ACCOUNT_ID,
    } = req.body;

    if (!accessToken || !imageUrl) {
      return res.status(400).json({
        error: 'accessToken and imageUrl are required',
      });
    }

    console.log('📦 Creating Instagram media container...');

    const url = `${INSTAGRAM_CONFIG.GRAPH_API_BASE}/${instagramAccountId}/media`;
    const params = new URLSearchParams({
      image_url: imageUrl,
      caption: caption || '',
      access_token: accessToken,
    });

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('❌ Container creation failed:', data);
      return res.status(response.status).json({
        error: 'Failed to create container',
        details: data.error?.message || data,
      });
    }

    console.log(`✅ Container created: ${data.id}`);
    res.json({ success: true, containerId: data.id });

  } catch (error) {
    console.error('❌ Container creation error:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

/**
 * GET /api/instagram/container-status/:id
 *
 * Check the status of a media container
 */
app.get('/api/instagram/container-status/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const accessToken = req.query.access_token;

    if (!accessToken) {
      return res.status(400).json({ error: 'access_token query param required' });
    }

    const url = `${INSTAGRAM_CONFIG.GRAPH_API_BASE}/${id}?fields=status,status_code&access_token=${accessToken}`;
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    res.json({ success: true, ...data });

  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

/**
 * POST /api/instagram/publish-container
 *
 * Step 2 of publishing: Publish a ready container
 */
app.post('/api/instagram/publish-container', async (req, res) => {
  try {
    const {
      accessToken,
      containerId,
      instagramAccountId = INSTAGRAM_CONFIG.BUSINESS_ACCOUNT_ID,
    } = req.body;

    if (!accessToken || !containerId) {
      return res.status(400).json({
        error: 'accessToken and containerId are required',
      });
    }

    console.log(`📤 Publishing container ${containerId}...`);

    const url = `${INSTAGRAM_CONFIG.GRAPH_API_BASE}/${instagramAccountId}/media_publish`;
    const params = new URLSearchParams({
      creation_id: containerId,
      access_token: accessToken,
    });

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('❌ Publish failed:', data);
      return res.status(response.status).json({
        error: 'Failed to publish',
        details: data.error?.message || data,
      });
    }

    console.log(`✅ Published! Media ID: ${data.id}`);
    res.json({
      success: true,
      mediaId: data.id,
      publishedAt: new Date().toISOString(),
    });

  } catch (error) {
    console.error('❌ Publish error:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

/**
 * GET /api/instagram/validate-token
 *
 * Validate an Instagram access token
 */
app.get('/api/instagram/validate-token', async (req, res) => {
  try {
    const accessToken = req.query.access_token;
    const instagramAccountId = req.query.account_id || INSTAGRAM_CONFIG.BUSINESS_ACCOUNT_ID;

    if (!accessToken) {
      return res.status(400).json({ error: 'access_token query param required' });
    }

    const url = `${INSTAGRAM_CONFIG.GRAPH_API_BASE}/${instagramAccountId}?fields=username,name,profile_picture_url&access_token=${accessToken}`;
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      return res.json({
        valid: false,
        error: data.error?.message || 'Invalid token',
      });
    }

    res.json({
      valid: true,
      username: data.username,
      name: data.name,
      profilePicture: data.profile_picture_url,
    });

  } catch (error) {
    res.json({
      valid: false,
      error: error instanceof Error ? error.message : 'Validation failed',
    });
  }
});

/**
 * POST /api/instagram/upload-to-github
 *
 * Helper endpoint to upload an image to GitHub and return public URL
 */
app.post('/api/instagram/upload-to-github', async (req, res) => {
  try {
    const {
      githubToken,
      imageData,
      filename,
      owner = 'aemons9',
      repo = 'studiov1',
      branch = 'main',
      pathPrefix = 'photo/instagram',
    } = req.body;

    if (!githubToken || !imageData) {
      return res.status(400).json({
        error: 'githubToken and imageData are required',
      });
    }

    // Generate filename if not provided
    const finalFilename = filename || (() => {
      const timestamp = new Date().toISOString()
        .replace(/[-:]/g, '')
        .replace('T', '-')
        .replace(/\..+/, '');
      return `veracrvs-${timestamp}-${Math.random().toString(36).substr(2, 6)}.jpg`;
    })();

    const filePath = `${pathPrefix}/${finalFilename}`;

    // Clean base64
    let cleanBase64 = imageData;
    if (cleanBase64.includes(',')) {
      cleanBase64 = cleanBase64.split(',')[1];
    }

    console.log(`📤 Uploading to GitHub: ${filePath}`);

    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;

    const response = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${githubToken}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `[Instagram] Add image: ${finalFilename}`,
        content: cleanBase64,
        branch,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('❌ GitHub upload failed:', data);
      return res.status(response.status).json({
        error: 'GitHub upload failed',
        details: data.message,
      });
    }

    const publicUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${filePath}`;

    console.log(`✅ Uploaded: ${publicUrl}`);

    res.json({
      success: true,
      publicUrl,
      rawUrl: publicUrl,
      htmlUrl: data.content?.html_url,
      filename: finalFilename,
      sha: data.content?.sha,
    });

  } catch (error) {
    console.error('❌ GitHub upload error:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// ==========================================
// INSTAGRAM TOKEN REFRESH ENDPOINTS
// ==========================================

/**
 * POST /api/instagram/exchange-token
 *
 * Exchange a short-lived token for a long-lived token
 * Long-lived tokens are valid for 60 days
 */
app.post('/api/instagram/exchange-token', async (req, res) => {
  try {
    const { shortLivedToken, appId, appSecret } = req.body;

    if (!shortLivedToken || !appId || !appSecret) {
      return res.status(400).json({
        error: 'shortLivedToken, appId, and appSecret are required',
      });
    }

    console.log('🔄 Exchanging short-lived token for long-lived token...');

    const url = new URL(`${INSTAGRAM_CONFIG.GRAPH_API_BASE}/oauth/access_token`);
    url.searchParams.set('grant_type', 'fb_exchange_token');
    url.searchParams.set('client_id', appId);
    url.searchParams.set('client_secret', appSecret);
    url.searchParams.set('fb_exchange_token', shortLivedToken);

    const response = await fetch(url.toString());
    const data = await response.json();

    if (!response.ok || data.error) {
      console.error('❌ Token exchange failed:', data);
      return res.status(response.status || 400).json({
        success: false,
        error: data.error?.message || 'Token exchange failed',
      });
    }

    console.log('✅ Token exchanged successfully');
    console.log(`   Expires in: ${data.expires_in} seconds (${Math.floor(data.expires_in / 86400)} days)`);

    res.json({
      success: true,
      accessToken: data.access_token,
      expiresIn: data.expires_in,
      tokenType: data.token_type || 'bearer',
    });

  } catch (error) {
    console.error('❌ Token exchange error:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

/**
 * POST /api/instagram/refresh-token
 *
 * Refresh a long-lived token to get a new long-lived token
 * Must be refreshed within 60 days of issuance
 */
app.post('/api/instagram/refresh-token', async (req, res) => {
  try {
    const { longLivedToken, appId, appSecret } = req.body;

    if (!longLivedToken || !appId || !appSecret) {
      return res.status(400).json({
        error: 'longLivedToken, appId, and appSecret are required',
      });
    }

    console.log('🔄 Refreshing long-lived token...');

    const url = new URL(`${INSTAGRAM_CONFIG.GRAPH_API_BASE}/oauth/access_token`);
    url.searchParams.set('grant_type', 'fb_exchange_token');
    url.searchParams.set('client_id', appId);
    url.searchParams.set('client_secret', appSecret);
    url.searchParams.set('fb_exchange_token', longLivedToken);

    const response = await fetch(url.toString());
    const data = await response.json();

    if (!response.ok || data.error) {
      console.error('❌ Token refresh failed:', data);
      return res.status(response.status || 400).json({
        success: false,
        error: data.error?.message || 'Token refresh failed',
      });
    }

    console.log('✅ Token refreshed successfully');
    console.log(`   New expiry: ${data.expires_in} seconds (${Math.floor(data.expires_in / 86400)} days)`);

    res.json({
      success: true,
      accessToken: data.access_token,
      expiresIn: data.expires_in,
      tokenType: data.token_type || 'bearer',
    });

  } catch (error) {
    console.error('❌ Token refresh error:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

/**
 * GET /api/instagram/debug-token
 *
 * Debug/inspect a token to check its validity and permissions
 */
app.get('/api/instagram/debug-token', async (req, res) => {
  try {
    const { access_token } = req.query;

    if (!access_token) {
      return res.status(400).json({
        error: 'access_token query param required',
      });
    }

    const url = new URL(`${INSTAGRAM_CONFIG.GRAPH_API_BASE}/debug_token`);
    url.searchParams.set('input_token', access_token);
    url.searchParams.set('access_token', access_token);

    const response = await fetch(url.toString());
    const data = await response.json();

    if (!response.ok || data.error) {
      return res.json({
        valid: false,
        error: data.error?.message || 'Token invalid',
      });
    }

    const tokenData = data.data;

    res.json({
      valid: tokenData.is_valid,
      userId: tokenData.user_id,
      appId: tokenData.app_id,
      type: tokenData.type,
      scopes: tokenData.scopes,
      expiresAt: tokenData.expires_at ? tokenData.expires_at * 1000 : null, // Convert to ms
      issuedAt: tokenData.issued_at ? tokenData.issued_at * 1000 : null,
      granularScopes: tokenData.granular_scopes,
    });

  } catch (error) {
    res.json({
      valid: false,
      error: error instanceof Error ? error.message : 'Debug failed',
    });
  }
});

/**
 * GET /api/instagram/page-token
 *
 * Get a page access token from a user access token
 * Page tokens derived from long-lived user tokens don't expire
 */
app.get('/api/instagram/page-token', async (req, res) => {
  try {
    const { user_token, page_id = INSTAGRAM_CONFIG.FACEBOOK_PAGE_ID } = req.query;

    if (!user_token) {
      return res.status(400).json({
        error: 'user_token query param required',
      });
    }

    console.log('🔑 Getting page access token...');

    const url = new URL(`${INSTAGRAM_CONFIG.GRAPH_API_BASE}/${page_id}`);
    url.searchParams.set('fields', 'access_token,name');
    url.searchParams.set('access_token', user_token);

    const response = await fetch(url.toString());
    const data = await response.json();

    if (!response.ok || data.error) {
      console.error('❌ Failed to get page token:', data);
      return res.status(response.status || 400).json({
        success: false,
        error: data.error?.message || 'Failed to get page token',
      });
    }

    console.log(`✅ Got page token for: ${data.name}`);

    res.json({
      success: true,
      pageToken: data.access_token,
      pageName: data.name,
      pageId: page_id,
    });

  } catch (error) {
    console.error('❌ Page token error:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// ==========================================
// REELS VIDEO GENERATION (FFmpeg)
// ==========================================

// Music library directory
const MUSIC_DIR = path.join(__dirname, 'assets', 'music');

// Temp directory for video generation
const TEMP_DIR = path.join(__dirname, 'temp');

// Ensure temp directory exists
fs.mkdir(TEMP_DIR, { recursive: true }).catch(() => {});
fs.mkdir(MUSIC_DIR, { recursive: true }).catch(() => {});

/**
 * GET /api/music/library
 * Returns list of available music tracks
 */
app.get('/api/music/library', async (req, res) => {
  try {
    // Ensure music directory exists
    await fs.mkdir(MUSIC_DIR, { recursive: true });

    const files = await fs.readdir(MUSIC_DIR);
    const musicFiles = files.filter(f =>
      ['.mp3', '.wav', '.m4a', '.aac', '.ogg'].some(ext => f.toLowerCase().endsWith(ext))
    );

    // Get file info for each track
    const tracks = await Promise.all(musicFiles.map(async (filename) => {
      const filePath = path.join(MUSIC_DIR, filename);
      const stats = await fs.stat(filePath);

      // Parse filename for metadata (format: Artist - Title.mp3)
      const nameWithoutExt = filename.replace(/\.[^/.]+$/, '');
      const parts = nameWithoutExt.split(' - ');

      return {
        id: filename,
        filename,
        title: parts.length > 1 ? parts[1] : nameWithoutExt,
        artist: parts.length > 1 ? parts[0] : 'Unknown',
        size: stats.size,
        path: filePath,
      };
    }));

    res.json({
      success: true,
      tracks,
      musicDir: MUSIC_DIR,
    });

  } catch (error) {
    console.error('❌ Failed to list music library:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

/**
 * POST /api/music/upload
 * Upload a music file to the library
 */
app.post('/api/music/upload', express.raw({ type: 'audio/*', limit: '50mb' }), async (req, res) => {
  try {
    const filename = req.headers['x-filename'] || `track-${Date.now()}.mp3`;
    const filePath = path.join(MUSIC_DIR, filename);

    await fs.writeFile(filePath, req.body);

    console.log(`✅ Music uploaded: ${filename}`);

    res.json({
      success: true,
      filename,
      path: filePath,
    });

  } catch (error) {
    console.error('❌ Failed to upload music:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

/**
 * POST /api/reels/create-video
 *
 * Convert image + music to video for Instagram Reels
 *
 * Required body:
 * - imageData: Base64 encoded image
 *
 * Optional:
 * - musicId: Filename of music track from library
 * - duration: Video duration in seconds (default: 15)
 * - fadeIn: Audio fade in duration (default: 1)
 * - fadeOut: Audio fade out duration (default: 2)
 */
app.post('/api/reels/create-video', async (req, res) => {
  try {
    const {
      imageData,
      musicId,
      duration = 15,
      fadeIn = 1,
      fadeOut = 2,
    } = req.body;

    if (!imageData) {
      return res.status(400).json({ error: 'imageData (base64) required' });
    }

    console.log('🎬 Creating Reel video...');
    console.log(`   Duration: ${duration}s, Music: ${musicId || 'none'}`);

    // Generate unique filenames
    const timestamp = Date.now();
    const imageFile = path.join(TEMP_DIR, `img-${timestamp}.jpg`);
    const outputFile = path.join(TEMP_DIR, `reel-${timestamp}.mp4`);

    // Save image to temp file
    let cleanBase64 = imageData;
    if (cleanBase64.includes(',')) {
      cleanBase64 = cleanBase64.split(',')[1];
    }
    await fs.writeFile(imageFile, Buffer.from(cleanBase64, 'base64'));

    console.log('   ✅ Image saved to temp');

    // Build FFmpeg command
    const musicPath = musicId ? path.join(MUSIC_DIR, musicId) : null;

    await new Promise((resolve, reject) => {
      let command = ffmpeg()
        // Input: Static image
        .input(imageFile)
        .inputOptions([
          '-loop', '1', // Loop the image
        ])
        // Video settings for Instagram Reels
        .outputOptions([
          '-c:v', 'libx264',      // H.264 codec
          '-t', String(duration), // Duration
          '-pix_fmt', 'yuv420p',  // Pixel format for compatibility
          '-r', '30',             // 30 fps
          '-preset', 'medium',    // Encoding preset
          '-crf', '23',           // Quality (lower = better)
        ]);

      // Add audio if music is provided
      if (musicPath && fsSync.existsSync(musicPath)) {
        console.log(`   🎵 Adding music: ${musicId}`);
        command = command
          .input(musicPath)
          .outputOptions([
            '-c:a', 'aac',          // AAC audio codec
            '-b:a', '192k',         // Audio bitrate
            '-shortest',            // End when shortest input ends
          ])
          .audioFilters([
            `afade=t=in:st=0:d=${fadeIn}`,                    // Fade in
            `afade=t=out:st=${duration - fadeOut}:d=${fadeOut}`, // Fade out
          ]);
      } else {
        // No audio - create silent track
        command = command.outputOptions(['-an']); // No audio
      }

      command
        .output(outputFile)
        .on('start', (cmd) => {
          console.log('   🔧 FFmpeg command:', cmd.substring(0, 100) + '...');
        })
        .on('progress', (progress) => {
          if (progress.percent) {
            console.log(`   📊 Progress: ${Math.round(progress.percent)}%`);
          }
        })
        .on('error', (err) => {
          console.error('❌ FFmpeg error:', err.message);
          reject(err);
        })
        .on('end', () => {
          console.log('   ✅ Video created successfully');
          resolve();
        })
        .run();
    });

    // Read the output video as base64
    const videoBuffer = await fs.readFile(outputFile);
    const videoBase64 = videoBuffer.toString('base64');

    // Clean up temp files
    await fs.unlink(imageFile).catch(() => {});
    await fs.unlink(outputFile).catch(() => {});

    console.log(`✅ Reel video ready: ${(videoBuffer.length / 1024 / 1024).toFixed(2)} MB`);

    res.json({
      success: true,
      videoData: `data:video/mp4;base64,${videoBase64}`,
      size: videoBuffer.length,
      duration,
      hasAudio: !!musicPath,
    });

  } catch (error) {
    console.error('❌ Video creation error:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// ==========================================
// PROFESSIONAL REEL GENERATION WITH EFFECTS
// ==========================================

/**
 * Helmut Newton / VERALABS Aesthetic Themes
 */
const NEWTON_THEMES = {
  bigNudes: {
    name: 'Big Nudes',
    colorGrade: 'colorchannelmixer=.3:.4:.3:0:.3:.4:.3:0:.3:.4:.3,eq=contrast=1.4:brightness=-0.05:saturation=0',
    vignette: 'vignette=PI/3:1.2',
  },
  sleepwalker: {
    name: 'Sleepwalker',
    colorGrade: 'eq=contrast=1.25:brightness=-0.02:saturation=0.8,colorbalance=rs=-0.05:gs=0:bs=0.12',
    vignette: 'vignette=PI/3.5:1.3',
  },
  domesticNude: {
    name: 'Domestic Nude',
    colorGrade: 'eq=contrast=1.15:brightness=0.03:saturation=1.1,colorbalance=rs=0.1:gs=0.06:bs=-0.04',
    vignette: 'vignette=PI/4:1.0',
  },
  polaroid: {
    name: 'Polaroid',
    colorGrade: 'eq=contrast=1.1:brightness=0.02:saturation=1.15,colorbalance=rs=0.08:gs=0.04:bs=0.02,noise=alls=8:allf=t',
    vignette: 'vignette=PI/4.5:0.8',
  },
  theyrecoming: {
    name: 'They Are Coming',
    colorGrade: 'eq=contrast=1.3:brightness=0:saturation=1.25',
    vignette: 'vignette=PI/3:1.4',
  },
  champagneLuxury: {
    name: 'Champagne Luxury',
    colorGrade: 'eq=contrast=1.1:brightness=0.03:saturation=1.15,colorbalance=rs=0.08:gs=0.05:bs=-0.02',
    vignette: 'vignette=PI/4',
  },
  boudoirGlow: {
    name: 'Boudoir Glow',
    colorGrade: 'eq=contrast=1.08:brightness=0.02:saturation=1.2,colorbalance=rs=0.1:gs=0.06:bs=0.02',
    vignette: 'vignette=PI/4.5',
  },
  midnightMystery: {
    name: 'Midnight Mystery',
    colorGrade: 'eq=contrast=1.15:brightness=-0.02:saturation=0.95,colorbalance=rs=-0.02:gs=0:bs=0.08',
    vignette: 'vignette=PI/3.5',
  },
  goldenSensual: {
    name: 'Golden Sensual',
    colorGrade: 'eq=contrast=1.05:brightness=0.04:saturation=1.25,colorbalance=rs=0.12:gs=0.08:bs=-0.04',
    vignette: 'vignette=PI/5',
  },
};

/**
 * Ken Burns Motion Presets
 */
const KEN_BURNS_PRESETS = {
  slowZoomIn: (duration, width, height) =>
    `zoompan=z='1.0+0.15*(on/${duration}/25)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=${duration * 25}:s=${width}x${height}:fps=25`,
  slowZoomOut: (duration, width, height) =>
    `zoompan=z='1.2-0.2*(on/${duration}/25)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=${duration * 25}:s=${width}x${height}:fps=25`,
  panLeftToRight: (duration, width, height) =>
    `zoompan=z='1.1':x='(iw-iw/zoom)*on/${duration}/25':y='ih/2-(ih/zoom/2)':d=${duration * 25}:s=${width}x${height}:fps=25`,
  panRightToLeft: (duration, width, height) =>
    `zoompan=z='1.1':x='(iw-iw/zoom)*(1-on/${duration}/25)':y='ih/2-(ih/zoom/2)':d=${duration * 25}:s=${width}x${height}:fps=25`,
  diagonalDrift: (duration, width, height) =>
    `zoompan=z='1.05+0.1*(on/${duration}/25)':x='(iw-iw/zoom)*0.3*(on/${duration}/25)':y='(ih-ih/zoom)*0.2*(on/${duration}/25)':d=${duration * 25}:s=${width}x${height}:fps=25`,
  faceZoom: (duration, width, height) =>
    `zoompan=z='1.0+0.25*(on/${duration}/25)':x='iw/2-(iw/zoom/2)':y='ih*0.2':d=${duration * 25}:s=${width}x${height}:fps=25`,
};

/**
 * POST /api/reels/create-professional
 *
 * Create a professional reel with Ken Burns effects, color grading,
 * VERALABS branding, film grain, and music overlay.
 *
 * Required body:
 * - images: Array of base64 encoded images
 *
 * Optional:
 * - theme: Color grade theme (default: 'champagneLuxury')
 * - motionPreset: Ken Burns motion (default: 'slowZoomIn')
 * - clipDuration: Duration per image in seconds (default: 4)
 * - addVignette: Add vignette effect (default: true)
 * - addGrain: Add film grain (default: false)
 * - addBranding: Add VERALABS watermark (default: true)
 * - brandingText: Custom branding text (default: 'VERALABS')
 * - musicId: Filename of music track from library
 * - musicVolume: Music volume 0-1 (default: 0.35)
 */
app.post('/api/reels/create-professional', async (req, res) => {
  const { execSync } = await import('child_process');

  try {
    const {
      images,
      theme = 'champagneLuxury',
      motionPreset = 'slowZoomIn',
      clipDuration = 4,
      addVignette = true,
      addGrain = false,
      addBranding = true,
      brandingText = 'VERALABS',
      musicId,
      musicVolume = 0.35,
    } = req.body;

    if (!images || !Array.isArray(images) || images.length === 0) {
      return res.status(400).json({ error: 'images array (base64) required' });
    }

    console.log('🎬 Creating PROFESSIONAL Reel...');
    console.log(`   Theme: ${theme}, Motion: ${motionPreset}`);
    console.log(`   Images: ${images.length}, Duration per clip: ${clipDuration}s`);
    console.log(`   Branding: ${addBranding ? brandingText : 'none'}, Grain: ${addGrain}`);

    const timestamp = Date.now();
    const tempClipsDir = path.join(TEMP_DIR, `reel-${timestamp}`);
    await fs.mkdir(tempClipsDir, { recursive: true });

    const FFMPEG_PATH = ffmpegInstaller.path;
    const REEL_WIDTH = 1080;
    const REEL_HEIGHT = 1920;
    const themeConfig = NEWTON_THEMES[theme] || NEWTON_THEMES.champagneLuxury;
    const motionPresets = Object.keys(KEN_BURNS_PRESETS);

    // Step 1: Process each image into a clip with Ken Burns + color grading
    console.log('   Step 1: Processing images with Ken Burns effects...');
    const clipPaths = [];

    for (let i = 0; i < images.length; i++) {
      const imageData = images[i];
      const imageFile = path.join(tempClipsDir, `img-${i}.jpg`);
      const clipFile = path.join(tempClipsDir, `clip-${i}.mp4`);

      // Save image to temp file
      let cleanBase64 = imageData;
      if (cleanBase64.includes(',')) {
        cleanBase64 = cleanBase64.split(',')[1];
      }
      await fs.writeFile(imageFile, Buffer.from(cleanBase64, 'base64'));

      // Get motion preset (cycle through if multiple images)
      const motion = motionPreset === 'mixed'
        ? motionPresets[i % motionPresets.length]
        : motionPreset;
      const kenBurnsFilter = KEN_BURNS_PRESETS[motion] || KEN_BURNS_PRESETS.slowZoomIn;

      // Build filter chain
      const filters = [
        // Scale up for Ken Burns room
        `scale=${REEL_WIDTH * 2}:${REEL_HEIGHT * 2}:force_original_aspect_ratio=increase`,
        `crop=${REEL_WIDTH * 2}:${REEL_HEIGHT * 2}`,
        // Ken Burns motion
        kenBurnsFilter(clipDuration, REEL_WIDTH, REEL_HEIGHT),
        // Color grading
        themeConfig.colorGrade,
      ];

      // Add vignette
      if (addVignette) {
        filters.push(themeConfig.vignette);
      }

      // Add film grain
      if (addGrain) {
        filters.push('noise=alls=12:allf=t');
      }

      const filterChain = filters.join(',');

      // Create clip with FFmpeg
      const cmd = `${FFMPEG_PATH} -y -loop 1 -i "${imageFile}" -vf "${filterChain}" -t ${clipDuration} -c:v libx264 -preset fast -crf 18 -pix_fmt yuv420p "${clipFile}" 2>/dev/null`;

      try {
        execSync(cmd, { maxBuffer: 200 * 1024 * 1024 });
        clipPaths.push(clipFile);
        console.log(`      ✅ Clip ${i + 1}/${images.length} created`);
      } catch (err) {
        console.error(`      ❌ Clip ${i + 1} failed:`, err.message);
      }
    }

    if (clipPaths.length === 0) {
      throw new Error('No clips were created');
    }

    // Step 2: Concatenate clips
    console.log('   Step 2: Concatenating clips...');
    const concatListPath = path.join(tempClipsDir, 'concat.txt');
    const concatContent = clipPaths.map(p => `file '${p}'`).join('\n');
    await fs.writeFile(concatListPath, concatContent);

    const concatOutput = path.join(tempClipsDir, 'concat.mp4');
    const concatCmd = `${FFMPEG_PATH} -y -f concat -safe 0 -i "${concatListPath}" -c:v libx264 -preset fast -crf 18 -pix_fmt yuv420p "${concatOutput}" 2>/dev/null`;
    execSync(concatCmd, { maxBuffer: 200 * 1024 * 1024 });

    // Step 3: Add VERALABS branding
    let currentOutput = concatOutput;
    if (addBranding) {
      console.log('   Step 3: Adding VERALABS branding...');
      const brandedOutput = path.join(tempClipsDir, 'branded.mp4');
      const brandFilter = [
        `drawtext=text='${brandingText}':fontsize=42:fontcolor=white@0.85:x=(w-text_w)/2:y=h-100:fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf`,
        `drawtext=text='━━━━━━━━━━━━━━━':fontsize=24:fontcolor=white@0.4:x=(w-text_w)/2:y=h-65`,
      ].join(',');
      const brandCmd = `${FFMPEG_PATH} -y -i "${currentOutput}" -vf "${brandFilter}" -c:v libx264 -preset fast -crf 18 -c:a copy "${brandedOutput}" 2>/dev/null`;
      execSync(brandCmd, { maxBuffer: 200 * 1024 * 1024 });
      currentOutput = brandedOutput;
    }

    // Step 4: Add music
    const totalDuration = clipPaths.length * clipDuration;
    const finalOutput = path.join(tempClipsDir, 'final.mp4');
    const musicPath = musicId ? path.join(MUSIC_DIR, musicId) : null;
    const veralabsMusicDir = path.join(__dirname, 'veralabs-music');

    // Try to find a music track
    let selectedMusicPath = null;
    if (musicPath && fsSync.existsSync(musicPath)) {
      selectedMusicPath = musicPath;
    } else if (fsSync.existsSync(veralabsMusicDir)) {
      // Auto-select a track from veralabs-music
      try {
        const tracks = fsSync.readdirSync(veralabsMusicDir).filter(f => f.endsWith('.wav') || f.endsWith('.mp3'));
        if (tracks.length > 0) {
          selectedMusicPath = path.join(veralabsMusicDir, tracks[Math.floor(Math.random() * tracks.length)]);
        }
      } catch {}
    }

    if (selectedMusicPath) {
      console.log('   Step 4: Adding music...');
      const musicCmd = `${FFMPEG_PATH} -y -i "${currentOutput}" -stream_loop 5 -i "${selectedMusicPath}" -filter_complex "[1:a]volume=${musicVolume},afade=t=in:st=0:d=2,afade=t=out:st=${totalDuration - 2}:d=2[a]" -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k -t ${totalDuration} "${finalOutput}" 2>/dev/null`;
      try {
        execSync(musicCmd, { maxBuffer: 200 * 1024 * 1024 });
        currentOutput = finalOutput;
        console.log('      ✅ Music added');
      } catch (err) {
        console.log('      ⚠️ Music failed, continuing without audio');
      }
    } else {
      console.log('   Step 4: No music available, skipping...');
      // Copy to final location
      fsSync.copyFileSync(currentOutput, finalOutput);
      currentOutput = finalOutput;
    }

    // Step 5: Extract thumbnail
    console.log('   Step 5: Extracting thumbnail...');
    const thumbnailPath = path.join(tempClipsDir, 'thumbnail.jpg');
    const thumbCmd = `${FFMPEG_PATH} -y -i "${currentOutput}" -ss 2 -vframes 1 -q:v 2 "${thumbnailPath}" 2>/dev/null`;
    try {
      execSync(thumbCmd);
    } catch {}

    // Read final video
    const videoBuffer = await fs.readFile(currentOutput);
    const videoBase64 = videoBuffer.toString('base64');

    // Read thumbnail if exists
    let thumbnailBase64 = null;
    try {
      const thumbBuffer = await fs.readFile(thumbnailPath);
      thumbnailBase64 = thumbBuffer.toString('base64');
    } catch {}

    // Clean up temp directory
    try {
      const files = await fs.readdir(tempClipsDir);
      for (const file of files) {
        await fs.unlink(path.join(tempClipsDir, file)).catch(() => {});
      }
      await fs.rmdir(tempClipsDir).catch(() => {});
    } catch {}

    console.log(`✅ Professional Reel ready: ${(videoBuffer.length / 1024 / 1024).toFixed(2)} MB, ${totalDuration}s`);

    res.json({
      success: true,
      videoData: `data:video/mp4;base64,${videoBase64}`,
      thumbnailData: thumbnailBase64 ? `data:image/jpeg;base64,${thumbnailBase64}` : null,
      size: videoBuffer.length,
      duration: totalDuration,
      theme: themeConfig.name,
      clipsCount: clipPaths.length,
      hasAudio: !!selectedMusicPath,
    });

  } catch (error) {
    console.error('❌ Professional reel creation error:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

/**
 * POST /api/instagram/publish-reel
 *
 * Publish a video as an Instagram Reel
 *
 * Required body:
 * - accessToken: Instagram Page Access Token
 * - videoUrl: Public HTTPS URL of the video
 * - caption: Post caption
 *
 * Optional:
 * - hashtags: Array of hashtags
 * - instagramAccountId: Override default account
 * - coverUrl: URL for custom cover image
 * - shareToFeed: Share to feed as well (default: true)
 * - audioName: Custom name for original audio
 */
app.post('/api/instagram/publish-reel', async (req, res) => {
  try {
    const {
      accessToken,
      videoUrl,
      caption,
      hashtags = [],
      instagramAccountId = INSTAGRAM_CONFIG.BUSINESS_ACCOUNT_ID,
      coverUrl,
      shareToFeed = true,
      audioName,
    } = req.body;

    if (!accessToken) {
      return res.status(400).json({ error: 'Instagram access token required' });
    }

    if (!videoUrl) {
      return res.status(400).json({ error: 'Video URL required' });
    }

    console.log('🎬 Starting Instagram Reel publish flow...');

    // Format caption with hashtags
    let finalCaption = caption || '';
    if (hashtags.length > 0) {
      const formattedHashtags = hashtags
        .map(tag => tag.startsWith('#') ? tag : `#${tag}`)
        .slice(0, 30)
        .join(' ');
      finalCaption = finalCaption
        ? `${finalCaption}\n\n${formattedHashtags}`
        : formattedHashtags;
    }

    // Step 1: Create Reel media container
    console.log('   Step 1: Creating Reel container...');

    const containerUrl = `${INSTAGRAM_CONFIG.GRAPH_API_BASE}/${instagramAccountId}/media`;
    const containerParams = new URLSearchParams({
      media_type: 'REELS',
      video_url: videoUrl,
      caption: finalCaption,
      share_to_feed: String(shareToFeed),
      access_token: accessToken,
    });

    // Add optional parameters
    if (coverUrl) {
      containerParams.set('cover_url', coverUrl);
    }
    if (audioName) {
      containerParams.set('audio_name', audioName);
    }

    const containerResponse = await fetch(containerUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: containerParams.toString(),
    });

    const containerData = await containerResponse.json();

    if (!containerResponse.ok) {
      console.error('❌ Reel container creation failed:', containerData);
      return res.status(containerResponse.status).json({
        error: 'Failed to create Reel container',
        details: containerData.error?.message || containerData,
      });
    }

    const containerId = containerData.id;
    console.log(`   ✅ Reel container created: ${containerId}`);

    // Step 2: Wait for video processing (can take longer than images)
    console.log('   Step 2: Waiting for video processing...');
    let containerReady = false;
    let attempts = 0;
    const maxAttempts = 60; // Up to 2 minutes for video processing

    while (!containerReady && attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 2000));

      const statusUrl = `${INSTAGRAM_CONFIG.GRAPH_API_BASE}/${containerId}?fields=status,status_code&access_token=${accessToken}`;
      const statusResponse = await fetch(statusUrl);
      const statusData = await statusResponse.json();

      console.log(`   📊 Status check ${attempts + 1}: ${statusData.status || 'UNKNOWN'}`);

      if (statusData.status === 'FINISHED') {
        containerReady = true;
        console.log('   ✅ Reel container ready');
      } else if (statusData.status === 'ERROR') {
        console.error('❌ Reel processing failed:', statusData);
        return res.status(500).json({
          error: 'Reel processing failed',
          status_code: statusData.status_code,
        });
      }

      attempts++;
    }

    if (!containerReady) {
      return res.status(500).json({
        error: 'Timeout waiting for Reel to process (2 minutes exceeded)',
      });
    }

    // Step 3: Publish
    console.log('   Step 3: Publishing Reel to Instagram...');

    const publishUrl = `${INSTAGRAM_CONFIG.GRAPH_API_BASE}/${instagramAccountId}/media_publish`;
    const publishParams = new URLSearchParams({
      creation_id: containerId,
      access_token: accessToken,
    });

    const publishResponse = await fetch(publishUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: publishParams.toString(),
    });

    const publishData = await publishResponse.json();

    if (!publishResponse.ok) {
      console.error('❌ Reel publish failed:', publishData);
      return res.status(publishResponse.status).json({
        error: 'Failed to publish Reel',
        details: publishData.error?.message || publishData,
      });
    }

    console.log(`🎉 Reel published! Media ID: ${publishData.id}`);

    res.json({
      success: true,
      mediaId: publishData.id,
      videoUrl,
      caption: finalCaption,
      publishedAt: new Date().toISOString(),
      type: 'REEL',
    });

  } catch (error) {
    console.error('❌ Reel publish error:', error);
    res.status(500).json({
      error: 'Reel publish failed',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

/**
 * POST /api/reels/upload-and-publish
 *
 * Complete flow: Create video from image + music, upload to GitHub, publish as Reel
 *
 * Required body:
 * - accessToken: Instagram Page Access Token
 * - imageData: Base64 encoded image
 * - caption: Post caption
 *
 * Optional:
 * - musicId: Filename of music track from library
 * - duration: Video duration in seconds (default: 15)
 * - hashtags: Array of hashtags
 * - githubToken: Token for video hosting
 * - audioName: Custom name for original audio
 */
app.post('/api/reels/upload-and-publish', async (req, res) => {
  try {
    const {
      accessToken,
      imageData,
      caption,
      musicId,
      duration = 15,
      hashtags = [],
      githubToken,
      githubOwner = 'aemons9',
      githubRepo = 'studiov1',
      githubBranch = 'main',
      audioName,
    } = req.body;

    if (!accessToken) {
      return res.status(400).json({ error: 'Instagram access token required' });
    }
    if (!imageData) {
      return res.status(400).json({ error: 'Image data required' });
    }
    if (!githubToken) {
      return res.status(400).json({ error: 'GitHub token required for video hosting' });
    }

    console.log('🎬 Starting complete Reel creation and publishing flow...');

    // Step 1: Create video
    console.log('   Step 1: Creating video from image + music...');

    const timestamp = Date.now();
    const imageFile = path.join(TEMP_DIR, `img-${timestamp}.jpg`);
    const outputFile = path.join(TEMP_DIR, `reel-${timestamp}.mp4`);

    // Save image to temp file
    let cleanBase64 = imageData;
    if (cleanBase64.includes(',')) {
      cleanBase64 = cleanBase64.split(',')[1];
    }
    await fs.writeFile(imageFile, Buffer.from(cleanBase64, 'base64'));

    const musicPath = musicId ? path.join(MUSIC_DIR, musicId) : null;

    await new Promise((resolve, reject) => {
      let command = ffmpeg()
        .input(imageFile)
        .inputOptions(['-loop', '1'])
        .outputOptions([
          '-c:v', 'libx264',
          '-t', String(duration),
          '-pix_fmt', 'yuv420p',
          '-r', '30',
          '-preset', 'medium',
          '-crf', '23',
        ]);

      if (musicPath && fsSync.existsSync(musicPath)) {
        command = command
          .input(musicPath)
          .outputOptions(['-c:a', 'aac', '-b:a', '192k', '-shortest'])
          .audioFilters([
            `afade=t=in:st=0:d=1`,
            `afade=t=out:st=${duration - 2}:d=2`,
          ]);
      } else {
        command = command.outputOptions(['-an']);
      }

      command
        .output(outputFile)
        .on('error', reject)
        .on('end', resolve)
        .run();
    });

    const videoBuffer = await fs.readFile(outputFile);
    console.log(`   ✅ Video created: ${(videoBuffer.length / 1024 / 1024).toFixed(2)} MB`);

    // Step 2: Upload video to GitHub
    console.log('   Step 2: Uploading video to GitHub...');

    const videoFilename = `reel-${timestamp}.mp4`;
    const videoPath = `photo/reels/${videoFilename}`;

    const githubApiUrl = `https://api.github.com/repos/${githubOwner}/${githubRepo}/contents/${videoPath}`;

    const githubResponse = await fetch(githubApiUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${githubToken}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `[Reel] Add video: ${videoFilename}`,
        content: videoBuffer.toString('base64'),
        branch: githubBranch,
      }),
    });

    if (!githubResponse.ok) {
      const error = await githubResponse.json();
      console.error('❌ GitHub upload failed:', error);
      return res.status(500).json({
        error: 'Failed to upload video to GitHub',
        details: error.message,
      });
    }

    const publicUrl = `https://raw.githubusercontent.com/${githubOwner}/${githubRepo}/${githubBranch}/${videoPath}`;
    console.log(`   ✅ Video uploaded: ${publicUrl}`);

    // Clean up temp files
    await fs.unlink(imageFile).catch(() => {});
    await fs.unlink(outputFile).catch(() => {});

    // Wait for GitHub propagation
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Step 3: Publish as Reel
    console.log('   Step 3: Publishing to Instagram as Reel...');

    // Format caption with hashtags
    let finalCaption = caption || '';
    if (hashtags.length > 0) {
      const formattedHashtags = hashtags
        .map(tag => tag.startsWith('#') ? tag : `#${tag}`)
        .slice(0, 30)
        .join(' ');
      finalCaption = finalCaption
        ? `${finalCaption}\n\n${formattedHashtags}`
        : formattedHashtags;
    }

    // Create Reel container
    const containerUrl = `${INSTAGRAM_CONFIG.GRAPH_API_BASE}/${INSTAGRAM_CONFIG.BUSINESS_ACCOUNT_ID}/media`;
    const containerParams = new URLSearchParams({
      media_type: 'REELS',
      video_url: publicUrl,
      caption: finalCaption,
      share_to_feed: 'true',
      access_token: accessToken,
    });

    if (audioName) {
      containerParams.set('audio_name', audioName);
    }

    const containerResponse = await fetch(containerUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: containerParams.toString(),
    });

    const containerData = await containerResponse.json();

    if (!containerResponse.ok) {
      console.error('❌ Reel container failed:', containerData);
      return res.status(containerResponse.status).json({
        error: 'Failed to create Reel container',
        details: containerData.error?.message || containerData,
      });
    }

    const containerId = containerData.id;
    console.log(`   ✅ Reel container: ${containerId}`);

    // Wait for processing
    let containerReady = false;
    let attempts = 0;
    while (!containerReady && attempts < 60) {
      await new Promise(resolve => setTimeout(resolve, 2000));

      const statusUrl = `${INSTAGRAM_CONFIG.GRAPH_API_BASE}/${containerId}?fields=status,status_code&access_token=${accessToken}`;
      const statusResponse = await fetch(statusUrl);
      const statusData = await statusResponse.json();

      if (statusData.status === 'FINISHED') {
        containerReady = true;
      } else if (statusData.status === 'ERROR') {
        return res.status(500).json({
          error: 'Reel processing failed',
          status_code: statusData.status_code,
        });
      }
      attempts++;
    }

    if (!containerReady) {
      return res.status(500).json({ error: 'Timeout waiting for Reel processing' });
    }

    // Publish
    const publishUrl = `${INSTAGRAM_CONFIG.GRAPH_API_BASE}/${INSTAGRAM_CONFIG.BUSINESS_ACCOUNT_ID}/media_publish`;
    const publishParams = new URLSearchParams({
      creation_id: containerId,
      access_token: accessToken,
    });

    const publishResponse = await fetch(publishUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: publishParams.toString(),
    });

    const publishData = await publishResponse.json();

    if (!publishResponse.ok) {
      return res.status(publishResponse.status).json({
        error: 'Failed to publish Reel',
        details: publishData.error?.message || publishData,
      });
    }

    console.log(`🎉 Reel published! Media ID: ${publishData.id}`);

    res.json({
      success: true,
      mediaId: publishData.id,
      videoUrl: publicUrl,
      caption: finalCaption,
      duration,
      hasMusic: !!musicPath,
      publishedAt: new Date().toISOString(),
      type: 'REEL',
    });

  } catch (error) {
    console.error('❌ Reel upload and publish error:', error);
    res.status(500).json({
      error: 'Reel creation failed',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// ==========================================
// START SERVER
// ==========================================

app.listen(PORT, () => {
  console.log('');
  console.log('🚀 Unified Dev Server Started');
  console.log('====================================');
  console.log(`✅ Running on: http://localhost:${PORT}`);
  console.log('✅ CORS enabled for all origins');
  console.log('✅ Ready for Replicate API + VN Asset saving + Instagram Publishing');
  console.log('');
  console.log('Endpoints:');
  console.log(`  GET  /health                           - Health check`);
  console.log('');
  console.log('  GCP OAuth Auto-Refresh:');
  console.log(`  GET  /api/gcloud-token                 - Fetch fresh OAuth token`);
  console.log(`  GET  /api/gcloud-project               - Fetch GCP project ID`);
  console.log('');
  console.log('  Replicate API Proxy:');
  console.log(`  POST /api/replicate/predictions        - Create prediction`);
  console.log(`  GET  /api/replicate/predictions/:id    - Poll prediction`);
  console.log(`  GET  /api/replicate/models/:model      - Get model info`);
  console.log(`  GET  /api/replicate/download?url=...   - Download image`);
  console.log('');
  console.log('  Visual Novel Assets:');
  console.log(`  POST /api/save-asset                   - Save VN asset to file system`);
  console.log(`  GET  /api/assets                       - List all saved VN assets`);
  console.log('');
  console.log('  Instagram Publishing (Graph API):');
  console.log(`  POST /api/instagram/publish            - Full publish flow (images)`);
  console.log(`  POST /api/instagram/create-container   - Create media container`);
  console.log(`  GET  /api/instagram/container-status   - Check container status`);
  console.log(`  POST /api/instagram/publish-container  - Publish ready container`);
  console.log(`  GET  /api/instagram/validate-token     - Validate access token`);
  console.log(`  POST /api/instagram/upload-to-github   - Upload image for hosting`);
  console.log('');
  console.log('  Instagram Reels (Video + Music):');
  console.log(`  GET  /api/music/library                - List available music tracks`);
  console.log(`  POST /api/music/upload                 - Upload music to library`);
  console.log(`  POST /api/reels/create-video           - Create video from image+music`);
  console.log(`  POST /api/instagram/publish-reel       - Publish video as Reel`);
  console.log(`  POST /api/reels/upload-and-publish     - Full Reel flow (image→video→publish)`);
  console.log('');
});
