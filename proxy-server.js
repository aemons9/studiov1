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
import path from 'path';
import { fileURLToPath } from 'url';

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
  console.log(`  POST /api/instagram/publish            - Full publish flow`);
  console.log(`  POST /api/instagram/create-container   - Create media container`);
  console.log(`  GET  /api/instagram/container-status   - Check container status`);
  console.log(`  POST /api/instagram/publish-container  - Publish ready container`);
  console.log(`  GET  /api/instagram/validate-token     - Validate access token`);
  console.log(`  POST /api/instagram/upload-to-github   - Upload image for hosting`);
  console.log('');
});
