/**
 * Manual JWT token generation to debug OAuth issues
 * This bypasses google-auth-library to see actual error responses
 */

import crypto from 'crypto';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    console.log('🔄 Manual JWT token generation...');

    const credentialsEnv = process.env.GOOGLE_APPLICATION_CREDENTIALS;
    if (!credentialsEnv) {
      throw new Error('GOOGLE_APPLICATION_CREDENTIALS not set');
    }

    const credentials = JSON.parse(credentialsEnv);

    // Fix private key newlines
    let privateKey = credentials.private_key;
    if (privateKey.includes('\\n')) {
      privateKey = privateKey.replace(/\\n/g, '\n');
    }

    console.log('✅ Service account:', credentials.client_email);

    // Create JWT header
    const header = {
      alg: 'RS256',
      typ: 'JWT',
      kid: credentials.private_key_id
    };

    // Create JWT payload
    const now = Math.floor(Date.now() / 1000);
    const payload = {
      iss: credentials.client_email,
      aud: 'https://accounts.google.com/o/oauth2/token',
      iat: now,
      exp: now + 3600,
      scope: 'https://www.googleapis.com/auth/cloud-platform https://www.googleapis.com/auth/aiplatform'
      // Note: Using legacy token endpoint which properly returns access_token
    };

    console.log('📝 JWT payload:', JSON.stringify(payload, null, 2));

    // Encode header and payload
    const encodedHeader = Buffer.from(JSON.stringify(header)).toString('base64url');
    const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url');
    const signatureInput = `${encodedHeader}.${encodedPayload}`;

    // Sign the JWT
    console.log('✍️ Signing JWT with private key...');
    let signature;
    try {
      const sign = crypto.createSign('RSA-SHA256');
      sign.update(signatureInput);
      sign.end();
      signature = sign.sign(privateKey, 'base64url');
      console.log('✅ JWT signed successfully');
    } catch (signError) {
      console.error('❌ JWT signing failed:', signError.message);
      throw new Error(`JWT signing failed: ${signError.message}`);
    }

    const jwt = `${signatureInput}.${signature}`;
    console.log('📜 JWT created (length:', jwt.length, ')');

    // Exchange JWT for access token
    console.log('🌐 Exchanging JWT for access token...');
    const tokenResponse = await fetch('https://accounts.google.com/o/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion: jwt
      })
    });

    console.log('📡 OAuth response status:', tokenResponse.status);
    console.log('📡 OAuth response headers:', JSON.stringify(Object.fromEntries(tokenResponse.headers.entries())));

    const responseText = await tokenResponse.text();
    console.log('📡 OAuth response body:', responseText);

    if (!tokenResponse.ok) {
      console.error('❌ OAuth token exchange failed');
      let errorData;
      try {
        errorData = JSON.parse(responseText);
      } catch {
        errorData = { raw: responseText };
      }

      return res.status(500).json({
        error: 'OAuth token exchange failed',
        status: tokenResponse.status,
        details: errorData,
        hint: 'Check the OAuth response details above'
      });
    }

    const tokenData = JSON.parse(responseText);
    console.log('✅ Access token received!');
    console.log('🔍 Token data keys:', Object.keys(tokenData));
    console.log('🔍 Token data:', JSON.stringify(tokenData, null, 2));

    if (!tokenData.access_token) {
      console.error('❌ No access_token in response!');
      throw new Error('No access_token in OAuth response');
    }

    return res.status(200).json({
      success: true,
      token: tokenData.access_token,
      expiresIn: tokenData.expires_in || 3600,
      fetchedAt: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Error:', error);
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error.stack
    });
  }
}
