/**
 * Vercel Serverless Function for GCP Project ID
 * GET /api/gcloud-project - Fetches GCP project ID
 *
 * For local development: Uses gcloud CLI via exec (handled by proxy-server.js)
 * For Vercel deployment: Uses environment variable GCP_PROJECT_ID
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

  try {
    console.log('🔄 Fetching GCP project ID...');

    // For Vercel: Use environment variable
    // For local: This endpoint is handled by proxy-server.js which uses gcloud CLI
    const projectId = process.env.GCP_PROJECT_ID || process.env.GOOGLE_CLOUD_PROJECT;

    if (!projectId) {
      throw new Error('No project ID configured. Set GCP_PROJECT_ID environment variable in Vercel.');
    }

    console.log('✅ GCP Project ID:', projectId);

    return res.status(200).json({
      success: true,
      projectId: projectId,
      fetchedAt: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Failed to fetch project ID:', error);
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Unknown error',
      hint: 'For Vercel: Set GCP_PROJECT_ID environment variable. For local: Use gcloud CLI (gcloud config set project YOUR_PROJECT_ID)',
      environment: process.env.VERCEL ? 'vercel' : 'local'
    });
  }
}
