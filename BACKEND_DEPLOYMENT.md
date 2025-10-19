# Backend Deployment Guide

## Railway Deployment (Recommended)

### Step 1: Deploy to Railway
1. Go to [Railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose your repository: `https://github.com/VaralakshmiBudidi/Company-Directories.git`
6. Select `main` branch

### Step 2: Configure Project
1. **Root Directory**: `backend`
2. **Environment Variables**:
   ```
   DATABASE_URL=postgresql://neondb_owner:npg_hw5xHlFMSK4r@ep-small-dust-adejr2g9-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
   NODE_ENV=production
   ```

### Step 3: Get Your Backend URI
After deployment, Railway will provide a URL like:
```
https://your-project-name-production.up.railway.app
```

Your API endpoints will be:
- Companies: `https://your-project-name-production.up.railway.app/api/companies`
- Health check: `https://your-project-name-production.up.railway.app/api/health`

## Render Deployment (Alternative)

### Step 1: Deploy to Render
1. Go to [Render.com](https://render.com)
2. Sign up with GitHub
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Select `main` branch

### Step 2: Configure Service
- **Root Directory**: `backend`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Environment Variables**: Same as Railway

## Testing Your Backend

Once deployed, test these endpoints:
- `GET /api/companies` - Get all companies
- `POST /api/companies` - Create company
- `GET /api/health` - Health check

## Next Steps

1. Copy your backend URL
2. Update frontend environment variable in Vercel
3. Test the full application
