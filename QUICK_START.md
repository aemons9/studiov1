# 🚀 StudioV Quick Start Guide

## Two-Account Setup for Maximum Benefits

Use **two OAuth tokens** to get the best of both worlds:
- **Work Token (aemons.com)** → Vertex AI access for image generation
- **Personal Token** → 2TB Google Drive storage (with AI Pro subscription)

---

## 📋 Step 1: Get Your OAuth Tokens

### Option A: Use the Token Generator Tool (Easiest)

1. **Open** `get-oauth-token.html` in your browser
2. **Create OAuth credentials** in [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
   - Project: `creatives-476816`
   - Create **OAuth 2.0 Client ID**
   - Application type: **Web application**
   - Authorized redirect URI: `http://localhost:8080`
3. **Paste your Client ID** into the token generator
4. **Get Work Token**:
   - Click "Get Work Token (aemons.com)"
   - **Sign in with your aemons.com account**
   - Copy the full redirect URL from the error page
   - Paste it back to extract the token
5. **Get Personal Token** (optional, for 2TB Drive):
   - Click "Get Personal Token"
   - **Sign in with your personal Gmail account**
   - Copy the full redirect URL from the error page
   - Paste it back to extract the token

### Option B: Manual OAuth Flow

If you prefer the manual method, see [TWO_ACCOUNT_SETUP.md](./TWO_ACCOUNT_SETUP.md)

---

## 📦 Step 2: Add Tokens to StudioV

Open your StudioV app in the browser, then open the **browser console** (F12) and paste:

```javascript
// Work token (aemons.com) - for Vertex AI
localStorage.setItem("mainToken", "ya29.a0AcM612xyz...");

// Personal token (optional) - for 2TB Drive
localStorage.setItem("driveToken", "ya29.a0AcM612abc...");
```

**Refresh the page** and you should see:
```
✅ Tokens loaded from localStorage
  • Work token (mainToken): Found
  • Drive token (driveToken): Found
```

---

## 🎯 Step 3: Configure Storage Provider

In the **Generation Settings** section of StudioV:

### For Google Drive (FREE 15GB / 2TB with AI Pro):
- Storage Provider: **Google Drive**
- Folder Name: `StudioV Generated Images`
- The app will use `driveToken` (or fall back to `mainToken`)

### For Cloud Storage (Paid):
- Storage Provider: **Cloud Storage**
- Bucket Name: `studiov-generated-images`
- The app will use `mainToken`

---

## ✅ What Each Token Does

| Token | Account | Used For | Required? |
|-------|---------|----------|-----------|
| **mainToken** | aemons.com | • Image generation (Imagen API)<br>• Risk analysis (Vertex AI)<br>• Cloud Storage uploads | ✅ **Yes** |
| **driveToken** | Personal Gmail | • Google Drive uploads<br>• 2TB storage access | ⚠️ Optional |

---

## 🔧 Troubleshooting

### "Permission denied" errors
- Make sure you're using the **aemons.com token** for image generation
- Personal Gmail accounts don't have Vertex AI permissions

### "No token found" warnings
- These are just reminders, not errors
- Follow Step 2 to add your tokens

### Risk analysis unavailable
- This is **optional** and requires Vertex AI permissions
- Only works with work token (aemons.com)
- App works perfectly without it

### Tokens expired
- OAuth tokens expire after ~1 hour
- Re-run the token generator to get fresh tokens
- Paste new tokens using the same `localStorage.setItem()` commands

---

## 🎨 Features Enabled

With both tokens configured, you get:

✅ **Image Generation** (Imagen 4.0 Ultra)
✅ **7-Level Auto-Selector** (Seductress Noir concepts)
✅ **Gallery** (view all generated images)
✅ **Google Drive Storage** (2TB free with AI Pro)
✅ **Risk Analysis** (optional - work token only)
✅ **Prompt Enhancement** (AI-powered)
✅ **Lock Fields** (preserve prompt sections)
✅ **History & Saved Prompts**

---

## 📚 Additional Resources

- **Two-Account Setup Details**: [TWO_ACCOUNT_SETUP.md](./TWO_ACCOUNT_SETUP.md)
- **Google Drive Setup**: [GOOGLE_DRIVE_SETUP.md](./GOOGLE_DRIVE_SETUP.md)
- **Main README**: [README.md](./README.md)

---

## 🆘 Need Help?

If you encounter issues:
1. Check browser console (F12) for errors
2. Verify tokens are set: `localStorage.getItem('mainToken')`
3. Make sure you're signed in with the correct account when generating tokens
4. Tokens expire hourly - regenerate if needed

---

**Happy Generating! 🎨✨**
