import { JWT } from 'google-auth-library';
import fs from 'fs';

async function testJWT() {
  try {
    console.log('🔄 Testing JWT authentication with service account...\n');

    const keyFile = JSON.parse(fs.readFileSync('fresh-vercel-key.json', 'utf8'));

    console.log('📋 Service account:', keyFile.client_email);
    console.log('📋 Project ID:', keyFile.project_id);
    console.log('');

    // Fix private key newlines if needed
    if (keyFile.private_key && keyFile.private_key.includes('\\n')) {
      keyFile.private_key = keyFile.private_key.replace(/\\n/g, '\n');
      console.log('🔧 Fixed private key newlines');
    }

    // Initialize JWT client
    console.log('🔐 Initializing JWT client...');
    const jwtClient = new JWT({
      email: keyFile.client_email,
      key: keyFile.private_key,
      scopes: [
        'https://www.googleapis.com/auth/cloud-platform',
        'https://www.googleapis.com/auth/aiplatform'
      ]
    });

    // Get access token
    console.log('🎫 Requesting access token...\n');
    const tokenResponse = await jwtClient.getAccessToken();

    if (tokenResponse && tokenResponse.token) {
      console.log('✅ SUCCESS! Token received');
      console.log('Token preview:', tokenResponse.token.substring(0, 30) + '...');
      console.log('Token length:', tokenResponse.token.length);
      console.log('\n✨ JWT authentication is working correctly!');
      return true;
    } else {
      console.log('❌ No token in response');
      console.log('Response:', tokenResponse);
      return false;
    }
  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    if (error.stack) {
      console.error('\nStack trace:', error.stack);
    }
    return false;
  }
}

testJWT();
