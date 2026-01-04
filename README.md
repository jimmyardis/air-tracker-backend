# AirTracker Backend - Railway Deployment

## Quick Deploy to Railway

### Option 1: Deploy from GitHub (Recommended)

1. **Push this code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Go to Railway:**
   - Visit https://railway.app
   - Sign in with GitHub
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your airtracker-backend repo
   - Railway will auto-detect it's a Node.js app

3. **Add Environment Variable:**
   - Click on your deployment
   - Go to "Variables" tab
   - Click "New Variable"
   - Add: `ANTHROPIC_API_KEY` = `your-santa-key`
   - Save

4. **Get Your URL:**
   - Go to "Settings" tab
   - Click "Generate Domain"
   - Copy the URL (like `https://airtracker-backend-production.up.railway.app`)

5. **Update Your Frontend:**
   - Replace the API_URL in your HTML file with the Railway URL

---

### Option 2: Deploy from CLI

1. **Install Railway CLI:**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login:**
   ```bash
   railway login
   ```

3. **Initialize:**
   ```bash
   railway init
   ```

4. **Add API Key:**
   ```bash
   railway variables set ANTHROPIC_API_KEY=your-key-here
   ```

5. **Deploy:**
   ```bash
   railway up
   ```

6. **Get URL:**
   ```bash
   railway domain
   ```

---

## Testing Locally First

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create .env file:**
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` and add your Anthropic API key

3. **Run server:**
   ```bash
   npm start
   ```

4. **Test it:**
   Open browser to `http://localhost:3000`
   Should see: `{"status":"AirTracker Backend is running!"}`

5. **Test the endpoint:**
   ```bash
   curl -X POST http://localhost:3000/api/generate-bullets \
     -H "Content-Type: application/json" \
     -d '{
       "entries": [
         {
           "text": "Fixed hydraulic leak on B-52, saved 4 hours downtime",
           "category": "performance",
           "date": "12/31/2024"
         }
       ]
     }'
   ```

---

## What This Does

- **Express server** with proper CORS handling
- **Single endpoint:** `POST /api/generate-bullets`
- **Health check:** `GET /` shows status
- **Auto-scales** on Railway
- **Free tier** should handle your usage easily

---

## Environment Variables

Required:
- `ANTHROPIC_API_KEY` - Your Anthropic API key

Optional:
- `PORT` - Railway sets this automatically (defaults to 3000 locally)

---

## Why Railway > Vercel for This

- ✅ CORS works out of the box
- ✅ Traditional server (not serverless)
- ✅ Easier debugging
- ✅ Free tier is generous
- ✅ Simpler deployment

---

## Next Steps After Deploy

1. Get your Railway URL
2. Update `airtracker-updated.html` with the Railway URL (remove the CORS proxy)
3. Upload to GitHub Pages
4. Test the Generate button
5. Celebrate! 🎉
