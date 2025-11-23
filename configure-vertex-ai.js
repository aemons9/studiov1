/**
 * Vertex AI Configuration Script for Vera Mode
 *
 * This script configures your browser's localStorage to use Vertex AI with OAuth
 * authentication for Imagen 4 Ultra model generation.
 *
 * USAGE:
 * 1. Open your app in the browser
 * 2. Open browser console (F12 or Cmd+Option+I)
 * 3. Copy and paste this entire script
 * 4. Run: configureVertexAI('YOUR_PROJECT_ID', 'YOUR_OAUTH_TOKEN')
 *
 * GETTING YOUR OAUTH TOKEN:
 * Run this command in your terminal:
 *   gcloud auth print-access-token
 *
 * EXAMPLE:
 *   configureVertexAI('soy-vision-467808-e0', 'ya29.a0AfB_...')
 */

function configureVertexAI(projectId, oauthToken, model = 'imagen-4.0-ultra-generate-001') {
  if (!projectId || !oauthToken) {
    console.error('❌ Error: Both projectId and oauthToken are required');
    console.log('Usage: configureVertexAI("your-project-id", "your-oauth-token")');
    return;
  }

  console.log('🔧 Configuring Vertex AI authentication...');

  // Set auth method to Vertex AI
  localStorage.setItem('vera_auth_method', 'vertexai');
  console.log('✓ Auth method set to: Vertex AI');

  // Set project ID
  localStorage.setItem('vera_project_id', projectId);
  console.log('✓ Project ID set:', projectId);

  // Set OAuth token (redacted in log for security)
  localStorage.setItem('vera_oauth_token', oauthToken);
  const tokenPreview = oauthToken.substring(0, 10) + '...' + oauthToken.substring(oauthToken.length - 10);
  console.log('✓ OAuth token set:', tokenPreview);

  // Set Imagen model
  localStorage.setItem('vera_imagen_model', model);
  console.log('✓ Imagen model set:', model);

  console.log('\n✅ Configuration complete!');
  console.log('\n📋 Summary:');
  console.log('  - Auth Method: Vertex AI (OAuth)');
  console.log('  - Project ID:', projectId);
  console.log('  - Region: us-central1');
  console.log('  - Model:', model);
  console.log('  - Endpoint: https://us-central1-aiplatform.googleapis.com');

  console.log('\n⚠️  IMPORTANT NOTES:');
  console.log('  1. OAuth tokens expire after ~1 hour. Regenerate with: gcloud auth print-access-token');
  console.log('  2. If you get CORS errors, you may need to:');
  console.log('     - Use a browser extension to disable CORS (for testing only)');
  console.log('     - Set up a backend proxy server');
  console.log('     - Deploy your app with proper CORS configuration');

  console.log('\n🔄 Refresh the page to apply changes');
}

// Quick configuration for your specific project
function quickConfig() {
  const projectId = 'soy-vision-467808-e0';
  const token = prompt('Paste your OAuth token from: gcloud auth print-access-token');

  if (token) {
    configureVertexAI(projectId, token, 'imagen-4.0-ultra-generate-001');
  } else {
    console.log('❌ Configuration cancelled');
  }
}

// Display help
function showHelp() {
  console.log(`
╔════════════════════════════════════════════════════════════════╗
║           Vertex AI Configuration Helper                       ║
╚════════════════════════════════════════════════════════════════╝

Available commands:

  configureVertexAI(projectId, oauthToken, model?)
    Configure Vertex AI with your credentials

  quickConfig()
    Quick setup for project: soy-vision-467808-e0
    Will prompt for OAuth token

  checkConfig()
    View current configuration

  clearConfig()
    Remove all Vertex AI configuration

Examples:

  // Full configuration
  configureVertexAI('soy-vision-467808-e0', 'ya29.a0AfB_...')

  // Quick setup (prompts for token)
  quickConfig()

  // Use Imagen 4 Fast instead of Ultra
  configureVertexAI('soy-vision-467808-e0', 'ya29.a0AfB_...', 'imagen-4.0-fast-generate-001')
  `);
}

// Check current configuration
function checkConfig() {
  console.log('\n📋 Current Vertex AI Configuration:');
  console.log('  - Auth Method:', localStorage.getItem('vera_auth_method') || 'not set');
  console.log('  - Project ID:', localStorage.getItem('vera_project_id') || 'not set');

  const token = localStorage.getItem('vera_oauth_token');
  if (token) {
    const tokenPreview = token.substring(0, 10) + '...' + token.substring(token.length - 10);
    console.log('  - OAuth Token:', tokenPreview);
  } else {
    console.log('  - OAuth Token: not set');
  }

  console.log('  - Imagen Model:', localStorage.getItem('vera_imagen_model') || 'not set (will use default)');
}

// Clear configuration
function clearConfig() {
  if (confirm('Clear all Vertex AI configuration?')) {
    localStorage.removeItem('vera_auth_method');
    localStorage.removeItem('vera_project_id');
    localStorage.removeItem('vera_oauth_token');
    localStorage.removeItem('vera_imagen_model');
    console.log('✅ Configuration cleared');
  }
}

// Auto-display help on load
console.log('%c🚀 Vertex AI Configuration Helper Loaded', 'color: #00ff00; font-size: 16px; font-weight: bold;');
console.log('Type showHelp() for available commands');
console.log('Quick setup: quickConfig()');
