# Vercel Deployment Guide

This guide explains how to deploy your AI Image Studio to Vercel with serverless functions.

## Architecture

### Development Mode
- **Frontend**: Vite dev server on `localhost:3000`
- **Backend**: Express proxy server on `localhost:3001`
- **Proxy**: Vite proxy forwards `/api/*` requests to `localhost:3001`

### Production Mode (Vercel)
- **Frontend**: Static Vite build served from `/dist`
- **Backend**: Vercel Serverless Functions in `/api` directory
- **No proxy needed**: Frontend makes direct `/api/*` requests to serverless functions

## Project Structure

```
version1/
├── api/                          # Vercel Serverless Functions
│   ├── health.js                 # Health check endpoint
│   └── replicate/
│       ├── predictions.js        # POST /api/replicate/predictions
│       ├── predictions/
│       │   └── [id].js          # GET /api/replicate/predictions/:id
│       ├── models/
│       │   └── [...path].js     # GET /api/replicate/models/*
│       └── download.js           # GET /api/replicate/download
├── dist/                         # Built frontend (generated)
├── services/                     # Frontend services
│   └── replicateService.ts       # Replicate API client
├── vite.config.ts               # Vite configuration
├── vercel.json                  # Vercel configuration
└── proxy-server.js              # Development proxy (not used in production)
```

## Deployment Steps

### 1. Connect GitHub to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will auto-detect it as a Vite project

### 2. Configure Environment Variables

In Vercel Dashboard → Settings → Environment Variables, add:

- **GEMINI_API_KEY**: Your Google Gemini API key
  - Scope: Production, Preview, Development
  - This is required for Vertex AI image generation

### 3. Configure Build Settings

Vercel should auto-detect these settings, but verify:

- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 4. Deploy

Click "Deploy" and Vercel will:
1. Install dependencies
2. Build your Vite frontend
3. Deploy serverless functions from `/api` directory
4. Serve static files from `/dist`

## API Endpoints

All API endpoints are available at `/api/*`:

### Health Check
```
GET /api/health
Response: { status: 'ok', service: 'replicate-proxy', environment: 'vercel-serverless' }
```

### Create Prediction
```
POST /api/replicate/predictions
Body: {
  token: 'your_replicate_token',
  version: 'model_version_hash',
  input: { ... }
}
```

### Get Prediction Status
```
GET /api/replicate/predictions/:id
Headers: Authorization: Bearer <token>
```

### Get Model Info
```
GET /api/replicate/models/:owner/:name
Headers: Authorization: Bearer <token>
```

### Download Image
```
GET /api/replicate/download?url=<image_url>
```

## Local Development

### Option 1: Using Proxy Server (Current Setup)

```bash
# Terminal 1: Start proxy server
npm run proxy

# Terminal 2: Start Vite dev server
npm run dev

# Or run both together
npm run dev:all
```

### Option 2: Using Vite Proxy (Recommended)

```bash
# Just start Vite - it will proxy /api requests to localhost:3001
npm run dev
```

Make sure the proxy server is running on port 3001.

### Option 3: Test Serverless Functions Locally

Install Vercel CLI:
```bash
npm i -g vercel
```

Run locally:
```bash
vercel dev
```

This simulates the Vercel environment locally.

## How It Works

### Development Mode

1. Frontend makes request to `/api/replicate/predictions`
2. Vite proxy forwards to `http://localhost:3001/api/replicate/predictions`
3. Express server proxies to Replicate API
4. Response flows back through proxy to frontend

### Production Mode (Vercel)

1. Frontend makes request to `/api/replicate/predictions`
2. Vercel routes to serverless function at `/api/replicate/predictions.js`
3. Serverless function proxies to Replicate API
4. Response sent directly to frontend

## CORS Configuration

All serverless functions include CORS headers to allow cross-origin requests:

```javascript
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
res.setHeader('Access-Control-Allow-Headers', '...');
```

## Environment Variables

### Frontend (.env)
```
GEMINI_API_KEY=your_key_here
```

### Vercel Environment Variables
- Set in Vercel Dashboard
- Available to serverless functions via `process.env`
- Available to frontend build via Vite's `import.meta.env`

## Troubleshooting

### Build Fails

Check:
- All dependencies in `package.json`
- Node version compatibility
- Build logs in Vercel dashboard

### API Calls Fail

Check:
- Environment variables are set in Vercel
- API endpoints match `/api/*` pattern
- CORS headers are present
- Network tab in browser DevTools

### Serverless Function Timeout

Vercel has a 10-second timeout for Hobby tier:
- Optimize API calls
- Consider upgrading to Pro tier (60s timeout)
- Add retry logic for long-running generations

## Performance Optimization

### Frontend
- Code splitting configured in `vite.config.ts`
- React vendor chunk separated
- Assets optimized and minified

### Serverless Functions
- Lightweight, single-purpose functions
- No cold start optimization needed (Node.js runtime)
- Automatic edge deployment

## Security

### API Keys
- Never commit `.env` files
- Store keys in Vercel Environment Variables
- Replicate tokens passed from client (user's own key)

### CORS
- Currently allows all origins (`*`)
- For production, restrict to your domain:
  ```javascript
  res.setHeader('Access-Control-Allow-Origin', 'https://yourdomain.com');
  ```

## Monitoring

Use Vercel Dashboard to monitor:
- Function invocations
- Error rates
- Response times
- Build logs

## Cost Considerations

### Vercel Hobby (Free)
- 100GB bandwidth
- 6000 minutes serverless function execution
- Usually sufficient for personal projects

### Vercel Pro ($20/month)
- 1TB bandwidth
- 1M serverless function execution time
- Better for production apps

## Next Steps

1. Deploy to Vercel
2. Test all features in production
3. Monitor usage and errors
4. Optimize based on metrics
5. Consider custom domain
6. Set up preview deployments for branches

## Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Documentation](https://vitejs.dev/)
- [Vercel Serverless Functions](https://vercel.com/docs/functions)
- [Environment Variables on Vercel](https://vercel.com/docs/environment-variables)
