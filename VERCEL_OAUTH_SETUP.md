# Vercel OAuth Auto-Refresh Setup

This guide explains how to set up GCP OAuth token auto-refresh for your Vercel deployment.

## How It Works

### Local Development (npm run dev:all)
- Uses `gcloud` CLI commands via proxy-server.js
- Calls `gcloud auth print-access-token` and `gcloud config get-value project`
- No additional setup needed if gcloud is already configured

### Vercel Production
- Uses Google Auth Library with service account credentials
- Serverless functions: `/api/gcloud-token` and `/api/gcloud-project`
- Requires service account JSON and environment variables

---

## Vercel Setup Instructions

### 1. Create a GCP Service Account

```bash
# Set your project ID
export PROJECT_ID="your-gcp-project-id"

# Create service account
gcloud iam service-accounts create vercel-oauth-refresh \
    --display-name="Vercel OAuth Token Refresh" \
    --project=$PROJECT_ID

# Grant necessary roles
gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:vercel-oauth-refresh@$PROJECT_ID.iam.gserviceaccount.com" \
    --role="roles/aiplatform.user"

gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:vercel-oauth-refresh@$PROJECT_ID.iam.gserviceaccount.com" \
    --role="roles/storage.admin"

# Create and download key
gcloud iam service-accounts keys create vercel-sa-key.json \
    --iam-account=vercel-oauth-refresh@$PROJECT_ID.iam.gserviceaccount.com
```

### 2. Set Vercel Environment Variables

Go to your Vercel project settings → Environment Variables and add:

#### Required Variables:

**GCP_PROJECT_ID**
- Value: Your GCP project ID (e.g., `my-project-12345`)
- Applies to: Production, Preview, Development

**GOOGLE_APPLICATION_CREDENTIALS**
- Value: The **entire contents** of `vercel-sa-key.json` file as a single-line JSON string
- Applies to: Production, Preview, Development

Example:
```json
{"type":"service_account","project_id":"your-project","private_key_id":"...","private_key":"-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n","client_email":"vercel-oauth-refresh@your-project.iam.gserviceaccount.com","client_id":"...","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"..."}
```

**Tip**: To convert the JSON file to a single line:
```bash
cat vercel-sa-key.json | jq -c
```

### 3. Deploy to Vercel

```bash
npm run vercel:deploy
```

---

## Testing the Setup

### Test Locally
```bash
# Start dev server
npm run dev:all

# In browser console:
fetch('/api/gcloud-token').then(r => r.json()).then(console.log)
fetch('/api/gcloud-project').then(r => r.json()).then(console.log)
```

### Test on Vercel
```bash
# After deployment, test in browser console:
fetch('https://your-app.vercel.app/api/gcloud-token')
  .then(r => r.json())
  .then(console.log)

fetch('https://your-app.vercel.app/api/gcloud-project')
  .then(r => r.json())
  .then(console.log)
```

---

## How Auto-Refresh Works

### On App Startup
1. Frontend calls `/api/gcloud-token` and `/api/gcloud-project`
2. Serverless functions fetch fresh token using service account
3. Token and project ID are stored in localStorage
4. Token is set in React state for Imagen API calls

### Every 50 Minutes
1. Frontend automatically calls `/api/gcloud-token`
2. Fresh token is fetched and updated in localStorage + state
3. User never has to manually refresh tokens

### Token Expiration
- GCP OAuth tokens expire after 60 minutes
- Auto-refresh runs every 50 minutes (10-minute buffer)
- Seamless experience for long development/usage sessions

---

## Environment Variables Summary

| Variable | Required | Where Used | Example Value |
|----------|----------|------------|---------------|
| `GCP_PROJECT_ID` | ✅ Yes (Vercel) | `/api/gcloud-project` | `my-project-12345` |
| `GOOGLE_APPLICATION_CREDENTIALS` | ✅ Yes (Vercel) | `/api/gcloud-token` | Service account JSON (single-line) |

---

## Troubleshooting

### "No token returned from Google Auth Library"
- Check that `GOOGLE_APPLICATION_CREDENTIALS` contains valid service account JSON
- Verify the service account has necessary IAM roles
- Check Vercel function logs for detailed errors

### "No project ID configured"
- Set `GCP_PROJECT_ID` environment variable in Vercel
- Make sure it matches your actual GCP project ID

### "Failed to fetch OAuth token"
- Verify service account has `roles/aiplatform.user` role
- Check that the private key in service account JSON is valid
- Ensure the service account is enabled in GCP

### Local Development Not Working
- Make sure `gcloud` CLI is installed and authenticated
- Run `gcloud auth login` to authenticate
- Run `gcloud config set project YOUR_PROJECT_ID` to set project
- Restart the dev server with `npm run dev:all`

---

## Security Notes

⚠️ **Important Security Considerations:**

1. **Never commit service account keys to git**
   - Add `*-sa-key.json` to `.gitignore`
   - Store securely in password manager

2. **Restrict service account permissions**
   - Only grant minimum required IAM roles
   - Use separate service accounts for dev/prod if needed

3. **Rotate keys regularly**
   - Create new keys every 90 days
   - Delete old keys after rotation

4. **Monitor usage**
   - Set up GCP audit logs for service account
   - Review API usage in GCP Console

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     VERCEL DEPLOYMENT                        │
│                                                              │
│  ┌──────────────┐         ┌─────────────────────────────┐  │
│  │   Frontend   │────────▶│ /api/gcloud-token           │  │
│  │   (React)    │         │ (Serverless Function)       │  │
│  │              │         │                             │  │
│  │  Auto-refresh│◀────────│ Returns: OAuth token        │  │
│  │  every 50min │         │ Uses: Service Account       │  │
│  └──────────────┘         └─────────────────────────────┘  │
│         │                                                    │
│         │                 ┌─────────────────────────────┐  │
│         └────────────────▶│ /api/gcloud-project         │  │
│                           │ (Serverless Function)       │  │
│                           │                             │  │
│                           │ Returns: Project ID         │  │
│                           │ Uses: Environment Variable  │  │
│                           └─────────────────────────────┘  │
│                                                              │
└──────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌──────────────────────┐
                    │   Google Cloud API   │
                    │  (Vertex AI/Imagen)  │
                    └──────────────────────┘
```

---

## Additional Resources

- [GCP Service Accounts](https://cloud.google.com/iam/docs/service-accounts)
- [Google Auth Library for Node.js](https://github.com/googleapis/google-auth-library-nodejs)
- [Vercel Environment Variables](https://vercel.com/docs/projects/environment-variables)
- [Vertex AI Authentication](https://cloud.google.com/vertex-ai/docs/authentication)
