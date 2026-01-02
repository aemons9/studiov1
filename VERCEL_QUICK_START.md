# Vercel Deployment - Quick Start

## 🚀 Deploy Now (5 Minutes)

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Add Vercel serverless configuration"
git push origin main
```

### Step 2: Deploy to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Add environment variable:
   - **Name**: `GEMINI_API_KEY`
   - **Value**: Your Gemini API key
4. Click **Deploy**

That's it! Your app will be live in ~2 minutes.

## 📋 What Changed

### ✅ Added Files
- `/api/` - Serverless functions (replaces proxy-server.js in production)
- `vercel.json` - Vercel configuration
- `.env.example` - Environment variable template
- `VERCEL_DEPLOYMENT.md` - Full deployment guide

### ✅ Updated Files
- `vite.config.ts` - Added production build config and dev proxy
- `services/replicateService.ts` - Uses `/api` endpoints in production
- `package.json` - Added Vercel scripts
- `.gitignore` - Added .env protection

### ✅ How It Works

**Development (Local)**
```
Browser → Vite → Proxy Server (port 3001) → Replicate API
```

**Production (Vercel)**
```
Browser → Vercel Serverless Functions → Replicate API
```

## 🧪 Test Locally

### Option 1: Current Setup (Recommended)
```bash
# Start proxy + frontend
npm run dev:all
```

### Option 2: Simulate Vercel Environment
```bash
# Install Vercel CLI
npm i -g vercel

# Run locally
vercel dev
```

## 🔧 Configuration

### Environment Variables in Vercel

Set these in: **Vercel Dashboard → Settings → Environment Variables**

| Variable | Value | Required |
|----------|-------|----------|
| `GEMINI_API_KEY` | Your Gemini API key | ✅ Yes |

### Build Settings in Vercel

These are auto-detected, but verify:

| Setting | Value |
|---------|-------|
| Framework | Vite |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |

## 🌐 API Endpoints

All endpoints work the same in dev and production:

```
POST   /api/replicate/predictions
GET    /api/replicate/predictions/:id
GET    /api/replicate/models/:owner/:name
GET    /api/replicate/download?url=...
GET    /api/health
```

## ⚡ Performance

- **Cold Start**: ~200ms (first request)
- **Warm Response**: ~50ms + API time
- **Frontend**: Optimized Vite build with code splitting
- **Serverless**: Auto-scaling, no server management

## 🐛 Troubleshooting

### Build fails on Vercel
```bash
# Test build locally first
npm run build
```

### API calls fail
- Check environment variables in Vercel dashboard
- Check browser console for errors
- Check Vercel function logs

### CORS errors
- Functions include CORS headers by default
- Check Network tab in DevTools

## 📊 Monitoring

View in Vercel Dashboard:
- Function invocations
- Error rates
- Build logs
- Performance metrics

## 💰 Cost (Vercel Hobby - Free)

- 100GB bandwidth/month
- 100 hours serverless execution/month
- Unlimited static requests
- Perfect for personal projects

## 🎯 Next Steps

1. ✅ Deploy to Vercel
2. 🧪 Test all features
3. 🌐 Add custom domain (optional)
4. 📊 Monitor usage
5. 🚀 Share your app!

## 📚 Full Documentation

See `VERCEL_DEPLOYMENT.md` for complete details.

## ⚙️ Development Workflow

```bash
# Local development
npm run dev:all        # Start proxy + vite

# Test production build
npm run build          # Build for production
npm run preview        # Preview production build

# Deploy to Vercel
git push origin main   # Auto-deploys on push
```

## 🎉 You're Ready!

Your app is now configured for serverless deployment on Vercel with:
- ✅ Vite frontend optimized for production
- ✅ Serverless API functions for Replicate proxy
- ✅ Environment variable support
- ✅ CORS configured
- ✅ Build optimizations enabled

Just push to GitHub and deploy on Vercel!
