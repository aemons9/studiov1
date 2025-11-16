/**
 * Vercel Serverless Function for Image Downloads
 * GET /api/replicate/download?url=... - Download image via proxy
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

    res.setHeader('Content-Type', contentType);
    return res.status(200).send(buffer);
  } catch (error) {
    console.error('❌ Download error:', error);
    return res.status(500).json({
      error: 'Download error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
