# Vercel Deployment Checklist ✅

## Pre-Deployment Checklist

- [x] Serverless API functions created in `/api` directory
- [x] `vercel.json` configuration file added
- [x] Vite config updated for production builds
- [x] Frontend service updated to use `/api` endpoints
- [x] `.gitignore` updated to protect `.env` files
- [x] Documentation created
- [x] Build tested locally (`npm run build`)
- [x] Changes committed to git
- [x] Changes pushed to GitHub

## Deployment Checklist

### Step 1: Vercel Account Setup
- [ ] Create/login to Vercel account at https://vercel.com
- [ ] Connect GitHub account to Vercel

### Step 2: Import Project
- [ ] Go to https://vercel.com/new
- [ ] Select your GitHub repository (aemons9/studiov1)
- [ ] Choose the correct branch (main or your current branch)

### Step 3: Configure Project
- [ ] Framework: **Vite** (should auto-detect)
- [ ] Build Command: `npm run build`
- [ ] Output Directory: `dist`
- [ ] Install Command: `npm install`

### Step 4: Environment Variables
- [ ] Click "Environment Variables"
- [ ] Add: `GEMINI_API_KEY` = `your_actual_key`
- [ ] Scope: ✅ Production, ✅ Preview, ✅ Development

### Step 5: Deploy
- [ ] Click "Deploy"
- [ ] Wait 2-3 minutes for build to complete
- [ ] Check build logs if any errors occur

### Step 6: Verify Deployment
- [ ] Visit your deployment URL
- [ ] Test health endpoint: `https://your-app.vercel.app/api/health`
- [ ] Test image generation feature
- [ ] Check browser console for errors
- [ ] Test Replicate API integration

### Step 7: Post-Deployment (Optional)
- [ ] Add custom domain in Vercel settings
- [ ] Set up GitHub auto-deploy (deploy on push)
- [ ] Configure preview deployments for PRs
- [ ] Monitor function logs in Vercel dashboard
- [ ] Set up error notifications

## Quick Commands

```bash
# Local development (unchanged)
npm run dev:all

# Test production build
npm run build
npm run preview

# Test Vercel environment locally
npm i -g vercel
vercel dev

# Deploy from CLI
vercel --prod
```

## Environment Variables Required

| Variable | Where to Set | Required |
|----------|--------------|----------|
| `GEMINI_API_KEY` | Vercel Dashboard | ✅ Yes |

## Expected Behavior

### Development (Local)
```
✅ npm run dev:all starts proxy + vite
✅ Frontend runs on http://localhost:3000
✅ Proxy runs on http://localhost:3001
✅ API calls go to localhost:3001
```

### Production (Vercel)
```
✅ Frontend served from CDN (dist/)
✅ API calls go to /api/* (serverless functions)
✅ No proxy server needed
✅ Automatic HTTPS
✅ Global CDN distribution
```

## Troubleshooting

### Build Fails
```bash
# Test build locally
npm run build

# Check for errors
# Fix TypeScript/build errors
# Commit and push again
```

### API Calls Fail
1. Check Vercel Dashboard → Functions → Logs
2. Verify environment variables are set
3. Check browser Network tab for 404/500 errors
4. Verify CORS headers in response

### CORS Errors
- All API functions include CORS headers
- Should work automatically
- Check Network tab for actual error

### Function Timeout
- Vercel Hobby: 10 second limit
- Optimize or upgrade to Pro (60s limit)

## Success Criteria

✅ **Deployment succeeds** - Build completes without errors
✅ **Frontend loads** - App UI displays correctly
✅ **API health check** - `/api/health` returns 200 OK
✅ **Image generation works** - Can generate images using Replicate/Vertex AI
✅ **No console errors** - Browser console is clean
✅ **HTTPS enabled** - Site served over HTTPS

## Support Resources

- **Quick Start**: `VERCEL_QUICK_START.md` (5 min guide)
- **Full Documentation**: `VERCEL_DEPLOYMENT.md` (complete guide)
- **Summary**: `DEPLOYMENT_SUMMARY.md` (what was changed)
- **Vercel Docs**: https://vercel.com/docs
- **Vercel Community**: https://github.com/vercel/vercel/discussions

## After Deployment

### Monitoring
- View function logs in Vercel Dashboard
- Monitor bandwidth and execution time
- Set up error alerts

### Optimization
- Check Core Web Vitals in Vercel Analytics
- Monitor function cold starts
- Optimize bundle size if needed

### Updates
- Push to GitHub to trigger auto-deployment
- Use preview deployments for testing
- Promote successful previews to production

---

## Current Status

✅ **Configuration Complete**
✅ **Code Pushed to GitHub**
⏳ **Ready to Deploy to Vercel**

### Next Step
Go to https://vercel.com/new and import your repository!
