/**
 * Vercel Serverless Function for GCP OAuth Token
 * GET /api/gcloud-token - Fetches fresh OAuth token for GCP
 *
 * For local development: Uses gcloud CLI via exec (handled by proxy-server.js)
 * For Vercel deployment: Uses Google Auth Library with service account or ADC
 */

import { JWT } from 'google-auth-library';

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
    console.log('🔄 Fetching fresh OAuth token via JWT client...');

    // Parse service account JSON from environment variable
    let credentials;
    const credentialsEnv = process.env.GOOGLE_APPLICATION_CREDENTIALS;

    if (!credentialsEnv) {
      throw new Error('GOOGLE_APPLICATION_CREDENTIALS environment variable is not set. Please add it in Vercel project settings.');
    }

    try {
      // Try to parse as JSON string
      credentials = JSON.parse(credentialsEnv);
      console.log('✅ Parsed service account credentials from env var');
      console.log('📋 Service account email:', credentials.client_email);
      console.log('📋 Project ID:', credentials.project_id);

      // Fix private key newlines: Replace literal \n with actual newlines
      // Vercel may store "\n" as literal string instead of newline character
      if (credentials.private_key && credentials.private_key.includes('\\n')) {
        credentials.private_key = credentials.private_key.replace(/\\n/g, '\n');
        console.log('🔧 Fixed private key newlines');
      }
    } catch (parseError) {
      console.error('⚠️ Failed to parse GOOGLE_APPLICATION_CREDENTIALS as JSON:', parseError.message);
      console.error('First 100 chars:', credentialsEnv.substring(0, 100));
      throw new Error('GOOGLE_APPLICATION_CREDENTIALS must be valid JSON string');
    }

    // Validate required fields
    if (!credentials.private_key || !credentials.client_email) {
      throw new Error('Service account JSON is missing required fields (private_key or client_email)');
    }

    // Initialize JWT client directly for more reliable service account auth
    console.log('🔐 Initializing JWT client...');
    const jwtClient = new JWT({
      email: credentials.client_email,
      key: credentials.private_key,
      scopes: [
        'https://www.googleapis.com/auth/cloud-platform',
        'https://www.googleapis.com/auth/aiplatform'
      ]
    });

    // Get access token using getAccessToken method
    console.log('🎫 Requesting access token...');
    const tokenResponse = await jwtClient.getAccessToken();

    console.log('📦 Token response received:', JSON.stringify({
      hasResponse: !!tokenResponse,
      hasToken: !!tokenResponse?.token,
      tokenPreview: tokenResponse?.token ? tokenResponse.token.substring(0, 20) + '...' : 'none'
    }));

    if (!tokenResponse || !tokenResponse.token) {
      console.error('⚠️ Token response:', tokenResponse);
      throw new Error('No token returned from JWT client');
    }

    console.log('✅ Fresh OAuth token fetched');

    return res.status(200).json({
      success: true,
      token: tokenResponse.token,
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
