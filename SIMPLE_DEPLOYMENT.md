# Simple Deployment Guide

## Step 1: Deploy Backend First

### Option A: Railway (Recommended)
1. Go to [Railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository: `https://github.com/VaralakshmiBudidi/Company-Directories.git`
5. Select `main` branch
6. **Set Root Directory**: `backend`
7. **Add Environment Variables**:
   ```
   DATABASE_URL=postgresql://neondb_owner:npg_hw5xHlFMSK4r@ep-small-dust-adejr2g9-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
   NODE_ENV=production
   ```
8. **Deploy** → Get your backend URL (e.g., `https://your-app-production.up.railway.app`)

### Option B: Render
1. Go to [Render.com](https://render.com)
2. Sign up with GitHub
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. **Set Root Directory**: `backend`
6. **Build Command**: `npm install`
7. **Start Command**: `npm start`
8. **Add same environment variables**
9. **Deploy** → Get your backend URL

## Step 2: Deploy Frontend to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. **Select the `frontend-deploy` branch**
5. Vercel will auto-detect React app
6. **Add Environment Variable**:
   ```
   REACT_APP_API_URL=https://your-backend-url.com/api
   ```
7. **Deploy**

## Your URLs After Deployment:
- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://your-backend-url.com`
- **API**: `https://your-backend-url.com/api/companies`

## Test Your Deployment:
1. Visit your frontend URL
2. Try creating/editing companies
3. Check if data persists (Neon DB connection)
