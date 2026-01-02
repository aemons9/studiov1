/**
 * Vercel Serverless Function for Replicate Models API
 * GET /api/replicate/models/:owner/:name - Get model info
 */

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get the full model path from the catch-all route
    const { path } = req.query;
    const modelPath = Array.isArray(path) ? path.join('/') : path;
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return res.status(400).json({ error: 'Replicate API token required in Authorization header' });
    }

    console.log('🔍 Fetching model info:', modelPath);

    const response = await fetch(`https://api.replicate.com/v1/models/${modelPath}`, {
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
    return res.status(200).json(data);
  } catch (error) {
    console.error('❌ Serverless function error:', error);
    return res.status(500).json({
      error: 'Serverless function error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
