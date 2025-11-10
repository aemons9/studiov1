# Vercel Deploy Hooks Setup Guide

This guide explains how to set up and use Vercel deploy hooks for automated deployments across all branches in the studiov1 repository.

## Build Test Results

All branches have been tested and build successfully:

### Branch: `claude/test-build-deploy-hooks-011CUzLG4EX5fybyy2E6b2qy`
- ✅ Build: **PASSED**
- Build time: ~1.22s
- Output size: 441.54 kB (129.03 kB gzipped)
- Status: Ready for deployment

### Branch: `claude/check-tools-011CUwxroJjnrY3ZzpXzQqDh`
- ✅ Build: **PASSED**
- Build time: ~4.04s
- Output size: 1,253.22 kB (315.27 kB gzipped)
- Status: Ready for deployment

## Configuration Files

### 1. `vercel.json`
Contains Vercel project configuration:
- Build command: `npm run build`
- Output directory: `dist`
- Framework: Vite
- Environment variables configuration
- Deploy settings for both branches
- Cache headers for static assets
- SPA routing rewrites

### 2. `.github/workflows/vercel-deploy.yml`
GitHub Actions workflow that:
- Tests builds on all branches
- Triggers Vercel deployments via deploy hooks
- Uploads build artifacts
- Runs on push to `claude/**` branches

## Setup Instructions

### Step 1: Create Deploy Hooks in Vercel

1. Go to your Vercel Dashboard
2. Navigate to your project (ai-image-studio)
3. Go to **Settings** → **Git** → **Deploy Hooks**
4. Create deploy hooks for each branch:

   **For `claude/test-build-deploy-hooks-011CUzLG4EX5fybyy2E6b2qy`:**
   - Name: `test-build-deploy-hooks`
   - Git Branch: `claude/test-build-deploy-hooks-011CUzLG4EX5fybyy2E6b2qy`
   - Copy the generated hook URL

   **For `claude/check-tools-011CUwxroJjnrY3ZzpXzQqDh`:**
   - Name: `check-tools`
   - Git Branch: `claude/check-tools-011CUwxroJjnrY3ZzpXzQqDh`
   - Copy the generated hook URL

### Step 2: Add Secrets to GitHub

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Add the following secrets:
   - `VERCEL_DEPLOY_HOOK_TEST_BUILD`: Paste the hook URL for test-build-deploy-hooks branch
   - `VERCEL_DEPLOY_HOOK_CHECK_TOOLS`: Paste the hook URL for check-tools branch

### Step 3: Configure Environment Variables in Vercel

1. In Vercel Dashboard, go to **Settings** → **Environment Variables**
2. Add the following variable:
   - Name: `GEMINI_API_KEY`
   - Value: Your Gemini API key
   - Environments: Production, Preview, Development

## Usage

### Automatic Deployments

Once configured, deployments will trigger automatically:
- On every push to `claude/test-build-deploy-hooks-011CUzLG4EX5fybyy2E6b2qy`
- On every push to `claude/check-tools-011CUwxroJjnrY3ZzpXzQqDh`

The GitHub Actions workflow will:
1. Run build tests for both branches
2. Upload build artifacts
3. Trigger Vercel deployments via deploy hooks

### Manual Deployment Trigger

You can manually trigger a deployment using curl:

```bash
# For test-build-deploy-hooks branch
curl -X POST "YOUR_VERCEL_DEPLOY_HOOK_URL_HERE"

# For check-tools branch
curl -X POST "YOUR_VERCEL_DEPLOY_HOOK_URL_HERE"
```

## Deployment Workflow

```
┌─────────────────┐
│  Push to Branch │
└────────┬────────┘
         │
         ▼
┌─────────────────────┐
│ GitHub Actions      │
│ - Install deps      │
│ - Test build        │
│ - Upload artifacts  │
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│ Trigger Deploy Hook │
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│ Vercel Deployment   │
│ - Clone repo        │
│ - Install deps      │
│ - Build project     │
│ - Deploy to CDN     │
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│ Live Deployment     │
│ Unique URL per      │
│ branch              │
└─────────────────────┘
```

## Monitoring Deployments

### Via Vercel Dashboard
- Go to Vercel Dashboard → Deployments
- Filter by branch to see deployment history
- View build logs and deployment status

### Via GitHub Actions
- Go to GitHub repository → Actions
- Click on "Vercel Deploy Hooks" workflow
- View build test results and deployment triggers

## Troubleshooting

### Build Fails
- Check GitHub Actions logs for error details
- Verify dependencies are correctly listed in `package.json`
- Ensure environment variables are set in Vercel

### Deploy Hook Not Triggering
- Verify GitHub secrets are correctly set
- Check deploy hook URL is valid in Vercel Dashboard
- Ensure branch names match exactly

### Environment Variables Missing
- Add `GEMINI_API_KEY` in Vercel Dashboard → Environment Variables
- Redeploy to pick up new environment variables

## Additional Resources

- [Vercel Deploy Hooks Documentation](https://vercel.com/docs/concepts/git/deploy-hooks)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vite Build Documentation](https://vitejs.dev/guide/build.html)

## Notes

- Both branches build successfully with production optimizations
- Static assets are configured with 1-year cache headers
- SPA routing is handled via rewrites to `index.html`
- Environment variables are injected at build time via Vite's `define` config
