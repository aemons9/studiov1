# Remote Access Guide - AI Image Studio

This guide shows you how to access your app from anywhere (phone, tablet, other computers, internet).

---

## Option 1: Local Network Access (Same WiFi) ⚡ FASTEST

Access from any device on your **same WiFi network** (phone, tablet, laptop).

### Step 1: Start the server
```bash
npm run dev:host
# Or with proxy:
npm run dev:all:host
```

### Step 2: Get your access URLs
The terminal will show something like:
```
  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.1.XXX:5173/
```

### Step 3: Access from any device
- **On same WiFi**: Use the Network URL: `http://192.168.1.XXX:5173/`
- **On your phone**:
  1. Connect to same WiFi
  2. Open browser
  3. Go to the Network URL

✅ **Pros**: Fast, no setup, private
❌ **Cons**: Only works on same WiFi network

---

## Option 2: Internet Access with Cloudflare Tunnel 🌐 FREE

Access from **anywhere in the world** using Cloudflare's free tunnel.

### Step 1: Install Cloudflare Tunnel
```bash
# Download cloudflared
wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
sudo dpkg -i cloudflared-linux-amd64.deb
```

### Step 2: Start your app
```bash
npm run dev
```

### Step 3: Create tunnel (in another terminal)
```bash
cloudflared tunnel --url http://localhost:5173
```

### Step 4: Get your public URL
Cloudflared will show:
```
Your quick Tunnel has been created! Visit it at:
https://random-name-1234.trycloudflare.com
```

### Step 5: Share the link
- Copy the `https://...trycloudflare.com` URL
- Access from **anywhere** - phone, computer, different network
- Share with others (they can access too!)

✅ **Pros**: Works from anywhere, free, HTTPS
❌ **Cons**: Random URL each time, temporary (closes when you stop tunnel)

---

## Option 3: Permanent Deployment (Vercel) ☁️ PERMANENT

Deploy permanently with a stable URL.

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Deploy
```bash
# From /home/user/studiov1 directory
vercel

# Follow prompts:
# - Login/signup (free)
# - Confirm project settings
# - Deploy!
```

### Step 3: Get your permanent URL
Vercel will give you:
```
✅ Production: https://your-app-name.vercel.app
```

### Step 4: Access from anywhere
- Permanent URL: `https://your-app-name.vercel.app`
- Auto-deploys on git push
- Free SSL certificate
- CDN for speed

✅ **Pros**: Permanent URL, fast CDN, free SSL, auto-deploys
❌ **Cons**: Requires account, code is public

---

## Option 4: Quick Preview with Built Version 📦

Preview the production build locally.

### Step 1: Build
```bash
npm run build
```

### Step 2: Preview
```bash
npm run preview:host
```

### Step 3: Access
Terminal shows:
```
  ➜  Local:   http://localhost:4173/
  ➜  Network: http://192.168.1.XXX:4173/
```

Use the Network URL from devices on same WiFi.

---

## Quick Comparison

| Option | Scope | Speed | Setup | Permanent |
|--------|-------|-------|-------|-----------|
| **Local Network** | Same WiFi | ⚡⚡⚡ | 10 sec | No |
| **Cloudflare Tunnel** | Internet | ⚡⚡ | 2 min | No |
| **Vercel Deploy** | Internet | ⚡⚡⚡ | 5 min | Yes |
| **Preview Build** | Same WiFi | ⚡⚡⚡ | 1 min | No |

---

## Recommended Usage

### For Development/Testing
```bash
# Quick access from phone on same WiFi
npm run dev:host

# Or in another terminal for internet access
cloudflared tunnel --url http://localhost:5173
```

### For Permanent Hosting
```bash
# One-time setup
npm install -g vercel
vercel

# Future updates
git push  # Auto-deploys!
```

---

## Security Notes

⚠️ **Important**: This app handles API keys and sensitive data.

### For Cloudflare Tunnel:
- URL is public but randomized
- Don't share URL publicly
- Tunnel closes when you stop the command

### For Vercel Deploy:
- Set environment variables in Vercel dashboard
- **Never commit** API keys to git
- Use Vercel's environment variables feature

### Best Practice:
1. Keep API keys in localStorage (current setup)
2. Don't commit `.env` files
3. Use separate API keys for production

---

## Troubleshooting

### Network URL not working?
```bash
# Check firewall
sudo ufw allow 5173

# Or temporarily disable
sudo ufw disable
```

### Cloudflare tunnel fails?
```bash
# Update cloudflared
sudo apt update
sudo apt install cloudflared

# Or use npx (no install)
npx cloudflared tunnel --url http://localhost:5173
```

### Vercel deployment fails?
```bash
# Check node version
node --version  # Should be 18+

# Re-login
vercel logout
vercel login
```

---

## Example Workflow

### Daily Development:
```bash
# Terminal 1: Start app
npm run dev:host

# Terminal 2 (optional): Internet tunnel
cloudflared tunnel --url http://localhost:5173

# Access from:
# - Laptop: http://localhost:5173
# - Phone (WiFi): http://192.168.1.XXX:5173
# - Phone (Internet): https://xyz.trycloudflare.com
```

### Production Deploy:
```bash
# Build and deploy
npm run build
vercel --prod

# Access from anywhere:
# https://your-app.vercel.app
```

---

## Additional Services (Alternatives)

### Other Tunneling Options:
1. **ngrok** - `ngrok http 5173` (similar to cloudflare)
2. **localtunnel** - `npx localtunnel --port 5173`
3. **serveo** - `ssh -R 80:localhost:5173 serveo.net`

### Other Hosting Options:
1. **Netlify** - Similar to Vercel
2. **GitHub Pages** - Free static hosting
3. **Railway** - Free tier available
4. **Render** - Free tier available

---

## Next Steps

1. **Quick Test**: Run `npm run dev:host` and access from your phone
2. **Internet Access**: Install cloudflared and create a tunnel
3. **Permanent Deploy**: Sign up for Vercel and deploy

Choose based on your needs:
- **Just testing?** → Local Network (`npm run dev:host`)
- **Show someone remotely?** → Cloudflare Tunnel
- **Need permanent URL?** → Vercel Deploy
