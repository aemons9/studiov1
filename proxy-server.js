/**
 * API PROXY SERVER
 *
 * This server proxies requests to Replicate and Vertex AI APIs to avoid CORS issues.
 * Browsers cannot directly call these APIs due to CORS restrictions.
 *
 * Supported APIs:
 *   - Replicate API (Flux models)
 *   - Vertex AI (Imagen 4, Veo 3.1)
 *
 * Usage:
 *   npm run proxy
 *
 * The proxy server runs on http://localhost:3001
 * Your Vite app runs on http://localhost:3000
 */

import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

// Enable CORS for all origins (dev only - restrict in production)
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'api-proxy', supports: ['replicate', 'vertex-ai'] });
});

// ============================================================================
// VERTEX AI PROXY ENDPOINTS
// ============================================================================

// Proxy Vertex AI prediction requests (Imagen, Gemini, etc.)
app.post('/api/vertex-ai/predict', async (req, res) => {
  try {
    const { projectId, location, model, oauthToken, instances, parameters } = req.body;

    if (!projectId || !oauthToken) {
      return res.status(400).json({ error: 'Project ID and OAuth token required' });
    }

    const defaultLocation = location || 'us-central1';
    const endpoint = `https://${defaultLocation}-aiplatform.googleapis.com/v1/projects/${projectId}/locations/${defaultLocation}/publishers/google/models/${model}:predict`;

    console.log('🎨 Proxying Vertex AI request...');
    console.log('   Model:', model);
    console.log('   Location:', defaultLocation);
    console.log('   Endpoint:', endpoint);

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${oauthToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        instances: instances || [{}],
        parameters: parameters || {}
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('❌ Vertex AI error:', data);
      return res.status(response.status).json(data);
    }

    console.log('✅ Vertex AI prediction successful');
    res.json(data);
  } catch (error) {
    console.error('❌ Proxy error:', error);
    res.status(500).json({
      error: 'Proxy server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Proxy Vertex AI generateContent requests (Gemini)
app.post('/api/vertex-ai/generate-content', async (req, res) => {
  try {
    const { projectId, location, model, oauthToken, contents, systemInstruction, generationConfig } = req.body;

    if (!projectId || !oauthToken) {
      return res.status(400).json({ error: 'Project ID and OAuth token required' });
    }

    const defaultLocation = location || 'us-east4';
    const endpoint = `https://${defaultLocation}-aiplatform.googleapis.com/v1/projects/${projectId}/locations/${defaultLocation}/publishers/google/models/${model}:generateContent`;

    console.log('🤖 Proxying Gemini generateContent request...');
    console.log('   Model:', model);
    console.log('   Location:', defaultLocation);

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${oauthToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents,
        systemInstruction,
        generationConfig
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('❌ Vertex AI error:', data);
      return res.status(response.status).json(data);
    }

    console.log('✅ Gemini generation successful');
    res.json(data);
  } catch (error) {
    console.error('❌ Proxy error:', error);
    res.status(500).json({
      error: 'Proxy server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
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

app.listen(PORT, () => {
  console.log('');
  console.log('🚀 API Proxy Server Started');
  console.log('====================================');
  console.log(`✅ Running on: http://localhost:${PORT}`);
  console.log('✅ CORS enabled for all origins');
  console.log('✅ Ready to proxy Replicate & Vertex AI calls');
  console.log('');
  console.log('Endpoints:');
  console.log('');
  console.log('Replicate API:');
  console.log(`  GET  /health                           - Health check`);
  console.log(`  POST /api/replicate/predictions        - Create prediction`);
  console.log(`  GET  /api/replicate/predictions/:id    - Poll prediction`);
  console.log(`  GET  /api/replicate/models/:model      - Get model info`);
  console.log(`  GET  /api/replicate/download?url=...   - Download image`);
  console.log('');
  console.log('Vertex AI:');
  console.log(`  POST /api/vertex-ai/predict            - Imagen/Veo predictions`);
  console.log(`  POST /api/vertex-ai/generate-content   - Gemini generateContent`);
  console.log('');
});
