/**
 * Vercel Serverless Function: Instagram Token Validation
 *
 * GET /api/instagram/validate?access_token=...
 */

const INSTAGRAM_CONFIG = {
  BUSINESS_ACCOUNT_ID: '17841478517688462',
  GRAPH_API_BASE: 'https://graph.facebook.com/v21.0',
};

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const accessToken = req.query.access_token;
    const accountId = req.query.account_id || INSTAGRAM_CONFIG.BUSINESS_ACCOUNT_ID;

    if (!accessToken) {
      return res.status(400).json({ error: 'access_token required' });
    }

    const response = await fetch(
      `${INSTAGRAM_CONFIG.GRAPH_API_BASE}/${accountId}?fields=username,name,profile_picture_url&access_token=${accessToken}`
    );

    const data = await response.json();

    if (!response.ok) {
      return res.json({
        valid: false,
        error: data.error?.message || 'Invalid token',
      });
    }

    return res.json({
      valid: true,
      username: data.username,
      name: data.name,
      profilePicture: data.profile_picture_url,
    });

  } catch (error) {
    return res.json({
      valid: false,
      error: error.message,
    });
  }
}
