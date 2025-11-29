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

      // Fix private key newlines - handle multiple formats
      if (credentials.private_key) {
        const originalKey = credentials.private_key;

        // Replace escaped newlines with actual newlines
        if (credentials.private_key.includes('\\n')) {
          credentials.private_key = credentials.private_key.replace(/\\n/g, '\n');
          console.log('🔧 Fixed escaped newlines (\\n -> newline)');
        }

        // Log private key format for debugging
        const keyStart = credentials.private_key.substring(0, 50);
        const hasProperNewlines = credentials.private_key.includes('\n');
        console.log('🔑 Private key starts with:', keyStart);
        console.log('🔑 Has actual newlines:', hasProperNewlines);
        console.log('🔑 Key length:', credentials.private_key.length);

        // Validate private key format
        if (!credentials.private_key.includes('BEGIN PRIVATE KEY')) {
          throw new Error('Private key missing BEGIN PRIVATE KEY header');
        }
        if (!credentials.private_key.includes('END PRIVATE KEY')) {
          throw new Error('Private key missing END PRIVATE KEY footer');
        }
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

    // Initialize JWT client with createScopedRequired to use self-signed JWT
    // This avoids the OAuth token exchange and uses the JWT directly
    console.log('🔐 Initializing JWT client with self-signed JWT...');
    const jwtClient = new JWT({
      email: credentials.client_email,
      key: credentials.private_key,
      scopes: [
        'https://www.googleapis.com/auth/cloud-platform',
        'https://www.googleapis.com/auth/aiplatform'
      ],
      // Use self-signed JWT to avoid token exchange
      subject: credentials.client_email
    });

    // Get access token using getAccessToken method
    console.log('🎫 Requesting access token from Google OAuth endpoint...');

    let tokenResponse;
    try {
      tokenResponse = await jwtClient.getAccessToken();
    } catch (tokenError) {
      console.error('❌ JWT getAccessToken failed:', tokenError.message);

      // Log detailed error information
      if (tokenError.response) {
        console.error('📡 HTTP Response Status:', tokenError.response.status);
        console.error('📡 HTTP Response Data:', JSON.stringify(tokenError.response.data));
      }
      if (tokenError.code) {
        console.error('🔴 Error Code:', tokenError.code);
      }

      console.error('💡 This usually means:');
      console.error('   1. Private key format is incorrect (newlines not preserved)');
      console.error('   2. Service account is disabled');
      console.error('   3. Required APIs not enabled');
      console.error('   4. Service account lacks necessary IAM permissions');

      throw new Error(`JWT authentication failed: ${tokenError.message}`);
    }

    console.log('📦 Token response received:', JSON.stringify({
      hasResponse: !!tokenResponse,
      hasToken: !!tokenResponse?.token,
      tokenPreview: tokenResponse?.token ? tokenResponse.token.substring(0, 20) + '...' : 'none'
    }));

    if (!tokenResponse || !tokenResponse.token) {
      console.error('⚠️ Token response:', tokenResponse);
      throw new Error('No token returned from JWT client');
    }

    console.log('✅ Fresh OAuth token fetched successfully');

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
