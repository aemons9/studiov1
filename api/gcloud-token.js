/**
 * Vercel Serverless Function for GCP OAuth Token
 * GET /api/gcloud-token - Fetches fresh OAuth token for GCP
 *
 * For local development: Uses gcloud CLI via exec (handled by proxy-server.js)
 * For Vercel deployment: Uses Google Auth Library with service account or ADC
 */

import { GoogleAuth } from 'google-auth-library';

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
    console.log('🔄 Fetching fresh OAuth token via Google Auth Library...');

    // Parse service account JSON from environment variable
    let credentials;
    const credentialsEnv = process.env.GOOGLE_APPLICATION_CREDENTIALS;

    if (credentialsEnv) {
      try {
        // Try to parse as JSON string
        credentials = JSON.parse(credentialsEnv);
        console.log('✅ Parsed service account credentials from env var');
      } catch (parseError) {
        console.error('⚠️ Failed to parse GOOGLE_APPLICATION_CREDENTIALS as JSON:', parseError.message);
        throw new Error('GOOGLE_APPLICATION_CREDENTIALS must be valid JSON string');
      }
    }

    // Initialize Google Auth client with credentials
    const auth = new GoogleAuth({
      credentials: credentials,
      scopes: [
        'https://www.googleapis.com/auth/cloud-platform',
        'https://www.googleapis.com/auth/aiplatform'
      ]
    });

    // Get access token
    const client = await auth.getClient();
    const accessToken = await client.getAccessToken();

    if (!accessToken || !accessToken.token) {
      throw new Error('No token returned from Google Auth Library');
    }

    console.log('✅ Fresh OAuth token fetched:', accessToken.token.substring(0, 20) + '...');

    return res.status(200).json({
      success: true,
      token: accessToken.token,
      expiresIn: 3600, // 1 hour in seconds
      fetchedAt: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Failed to fetch OAuth token:', error);
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Unknown error',
      hint: 'For Vercel: Set GOOGLE_APPLICATION_CREDENTIALS env var with service account JSON (not file path). For local: Use gcloud CLI (gcloud auth login)',
      environment: process.env.VERCEL ? 'vercel' : 'local'
    });
  }
}
