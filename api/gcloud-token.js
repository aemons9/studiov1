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

    // Create JWT payload for self-signed JWT (no exchange needed)
    // The aud should be the API endpoint, not the token endpoint
    const now = Math.floor(Date.now() / 1000);
    const payload = {
      iss: credentials.client_email,
      sub: credentials.client_email,
      aud: 'https://aiplatform.googleapis.com/',
      iat: now,
      exp: now + 3600
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
    console.log('📜 Self-signed JWT created (length:', jwt.length, ')');
    console.log('🎯 Using self-signed JWT directly as bearer token (no OAuth exchange)');

    // Return the JWT itself as the access token
    // Self-signed JWTs are valid for 1 hour as specified in exp claim
    return res.status(200).json({
      success: true,
      token: jwt,
      expiresIn: 3600,
      fetchedAt: new Date().toISOString(),
      type: 'self-signed-jwt'
    });

  } catch (error) {
    console.error('❌ Error:', error);
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error.stack
    });
  }
}
