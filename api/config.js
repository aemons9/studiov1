/**
 * Vercel Serverless Function to provide configuration
 * GET /api/config - Returns public configuration including API key
 */

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
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

  // Return the GEMINI_API_KEY from environment
  // This is safe because it's a server-side only endpoint
  const apiKey = process.env.GEMINI_API_KEY || '';

  return res.status(200).json({
    geminiApiKey: apiKey,
    hasApiKey: !!apiKey
  });
}
