# Vertex AI + Imagen 4 Ultra Setup Guide

This guide explains how to configure your visual novel asset generator to use **Imagen 4 Ultra** via **Vertex AI** with **OAuth authentication**.

## 🎯 Overview

The visual novel generator can use two authentication methods:

1. **API Key** (Gemini API) - Uses `generativelanguage.googleapis.com`
   - ❌ Does NOT support Imagen 4 models (you'll get 404 errors)
   - ✅ Supports text generation only

2. **Vertex AI** (OAuth) - Uses `aiplatform.googleapis.com`
   - ✅ Supports Imagen 4 Ultra, Imagen 4 Standard, Imagen 4 Fast
   - ✅ Supports all Vertex AI features
   - ⚠️ Requires proxy server to bypass CORS

## 🚀 Quick Setup (3 Steps)

### Step 1: Start the Proxy Server

The proxy server bypasses CORS restrictions that prevent browser apps from calling Vertex AI directly.

```bash
npm run proxy
```

You should see:
```
🚀 API Proxy Server Started
====================================
✅ Running on: http://localhost:3001
✅ CORS enabled for all origins
✅ Ready to proxy Replicate & Vertex AI calls

Vertex AI:
  POST /api/vertex-ai/predict            - Imagen/Veo predictions
  POST /api/vertex-ai/generate-content   - Gemini generateContent
```

**Keep this running in a separate terminal while using the app.**

### Step 2: Get Your OAuth Token

Run this command in your terminal:

```bash
gcloud auth print-access-token
```

Copy the output (starts with `ya29.`). **This token expires after ~1 hour**, so you'll need to regenerate it periodically.

### Step 3: Configure Vertex AI Settings

Open your browser console (F12) and run:

```javascript
// Paste the configure-vertex-ai.js script first
// Then run:
quickConfig()
```

Or manually configure:

```javascript
configureVertexAI('soy-vision-467808-e0', 'YOUR_OAUTH_TOKEN_HERE', 'imagen-4.0-ultra-generate-001')
```

**Refresh the page** after configuration.

## 📋 Detailed Configuration

### Option 1: Browser Console Script

1. Open `configure-vertex-ai.js` in your code editor
2. Copy the entire contents
3. Open your app in browser
4. Open browser console (F12 or Cmd+Option+I)
5. Paste the script
6. Run `quickConfig()` or use the manual configuration:

```javascript
configureVertexAI(
  'soy-vision-467808-e0',                      // Project ID
  'ya29.a0AfB_byJY...',                        // OAuth token
  'imagen-4.0-ultra-generate-001'               // Model (optional, defaults to ultra)
)
```

### Option 2: UI Settings (if available)

1. Navigate to Vera mode in the app
2. Click on "Authentication Settings"
3. Select "Vertex AI" authentication method
4. Enter:
   - **Project ID**: `soy-vision-467808-e0`
   - **OAuth Token**: Paste token from `gcloud auth print-access-token`
5. Choose **Imagen Model**: "Imagen 4 Ultra (Highest Quality)"
6. Click "Save Credentials"

### Option 3: Manual localStorage

Open browser console and run:

```javascript
localStorage.setItem('vera_auth_method', 'vertexai');
localStorage.setItem('vera_project_id', 'soy-vision-467808-e0');
localStorage.setItem('vera_oauth_token', 'YOUR_OAUTH_TOKEN_HERE');
localStorage.setItem('vera_imagen_model', 'imagen-4.0-ultra-generate-001');
localStorage.setItem('vera_use_proxy', 'true'); // Enable proxy (default)
localStorage.setItem('vera_proxy_url', 'http://localhost:3001'); // Proxy URL (default)
```

Then refresh the page.

## 🎨 Available Imagen 4 Models

| Model | Model ID | Description |
|-------|----------|-------------|
| **Imagen 4 Ultra** | `imagen-4.0-ultra-generate-001` | Highest quality, 8K output |
| **Imagen 4 Standard** | `imagen-4.0-generate-001` | Balanced quality and speed |
| **Imagen 4 Fast** | `imagen-4.0-fast-generate-001` | Rapid iterations |

## 🔧 Configuration Options

### Vertex AI Parameters

The service now sends all required parameters:

```json
{
  "instances": [{
    "prompt": "your prompt here"
  }],
  "parameters": {
    "sampleCount": 1,
    "aspectRatio": "9:16",
    "personGeneration": "allow_adult",
    "safetySetting": "block_few",
    "addWatermark": true,
    "enhancePrompt": false,
    "includeRaiReason": true,
    "language": "auto"
  }
}
```

### Proxy Settings

By default, the proxy is enabled and points to `http://localhost:3001`. To customize:

```javascript
// Disable proxy (not recommended - will cause CORS errors)
localStorage.setItem('vera_use_proxy', 'false');

// Change proxy URL
localStorage.setItem('vera_proxy_url', 'http://your-proxy-server:3001');
```

## 🐛 Troubleshooting

### Error: "models/imagen-4.0-generate-001 is not found"

**Cause**: You're using API Key auth which calls the Gemini API, not Vertex AI.

**Solution**:
1. Switch to Vertex AI auth method
2. Make sure `vera_auth_method` is set to `'vertexai'`
3. Run `checkConfig()` in console to verify

### Error: "Cannot connect to proxy server"

**Cause**: Proxy server is not running.

**Solution**:
```bash
npm run proxy
```

Keep it running in a separate terminal.

### Error: "Authentication error: 401 or 403"

**Cause**: OAuth token is invalid or expired (tokens last ~1 hour).

**Solution**:
1. Generate new token: `gcloud auth print-access-token`
2. Update in localStorage:
   ```javascript
   localStorage.setItem('vera_oauth_token', 'NEW_TOKEN_HERE');
   ```
3. Refresh page

### Error: "CORS policy"

**Cause**: Trying to call Vertex AI directly without proxy.

**Solutions**:
1. **Recommended**: Start proxy server (`npm run proxy`)
2. **Or**: Enable proxy in settings:
   ```javascript
   localStorage.setItem('vera_use_proxy', 'true');
   ```

### Verify Configuration

Run in console:

```javascript
checkConfig()
```

Expected output:
```
📋 Current Vertex AI Configuration:
  - Auth Method: vertexai
  - Project ID: soy-vision-467808-e0
  - OAuth Token: ya29.a0AfB...remaining
  - Imagen Model: imagen-4.0-ultra-generate-001
```

## 📊 Request Format

### Direct Vertex AI API Call

```bash
PROJECT_ID="soy-vision-467808-e0"
LOCATION="us-central1"
MODEL="imagen-4.0-ultra-generate-001"
TOKEN=$(gcloud auth print-access-token)

curl -X POST \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  "https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/publishers/google/models/${MODEL}:predict" \
  -d '{
    "instances": [
      {
        "prompt": "A professional photograph of an Indian woman in elegant attire"
      }
    ],
    "parameters": {
      "aspectRatio": "9:16",
      "sampleCount": 1,
      "personGeneration": "allow_adult",
      "safetySetting": "block_few",
      "addWatermark": true,
      "enhancePrompt": false,
      "includeRaiReason": true,
      "language": "auto"
    }
  }'
```

### Through Proxy Server

```javascript
const response = await fetch('http://localhost:3001/api/vertex-ai/predict', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    projectId: 'soy-vision-467808-e0',
    location: 'us-central1',
    model: 'imagen-4.0-ultra-generate-001',
    oauthToken: 'ya29.a0AfB_...',
    instances: [{
      prompt: 'A professional photograph of an Indian woman in elegant attire'
    }],
    parameters: {
      aspectRatio: '9:16',
      sampleCount: 1,
      personGeneration: 'allow_adult',
      safetySetting: 'block_few',
      addWatermark: true,
      enhancePrompt: false,
      includeRaiReason: true,
      language: 'auto'
    }
  })
});
```

## 🔄 Token Refresh Workflow

OAuth tokens expire after ~1 hour. When you see auth errors:

1. Generate new token:
   ```bash
   gcloud auth print-access-token
   ```

2. Update in browser console:
   ```javascript
   localStorage.setItem('vera_oauth_token', 'NEW_TOKEN');
   ```

3. **No page refresh needed** - next generation will use new token

## ✅ Success Checklist

- [ ] Proxy server running (`npm run proxy`)
- [ ] OAuth token is fresh (< 1 hour old)
- [ ] Auth method set to 'vertexai'
- [ ] Project ID set to 'soy-vision-467808-e0'
- [ ] Model set to 'imagen-4.0-ultra-generate-001'
- [ ] Proxy enabled (`vera_use_proxy = 'true'`)
- [ ] Configuration verified with `checkConfig()`

## 📚 Additional Resources

- [Vertex AI Imagen API Documentation](https://cloud.google.com/vertex-ai/docs/generative-ai/image/generate-images)
- [OAuth Token Management](https://cloud.google.com/docs/authentication/getting-started)
- [Imagen 4 Model Comparison](https://cloud.google.com/vertex-ai/docs/generative-ai/image/overview)

## 🆘 Still Having Issues?

Check browser console logs for detailed error messages:

```javascript
// Enable verbose logging
localStorage.setItem('debug', 'true');
```

Common log messages:
- `🎨 Using Imagen model: imagen-4.0-ultra-generate-001` ✅
- `🔄 Using proxy server: http://localhost:3001` ✅
- `⚠️ Making direct Vertex AI call (CORS may block this)` ⚠️
- `❌ Vertex AI error: ...` ❌

---

**Last Updated**: 2025-11-23
