# Vercel Deployment Guide

## Method 1: Two Separate Vercel Projects

### Backend Project:
1. Go to Vercel Dashboard
2. New Project → Import GitHub repo
3. Select `main` branch
4. Set Root Directory: `backend`
5. Framework: Node.js
6. Environment Variables:
   - DATABASE_URL=your_neon_db_url
   - NODE_ENV=production

### Frontend Project:
1. New Project → Import same GitHub repo
2. Select `frontend-deploy` branch
3. Auto-detects React app
4. Environment Variables:
   - REACT_APP_API_URL=https://your-backend-project.vercel.app/api

## Method 2: Vercel CLI (Single Project)

1. Install Vercel CLI: `npm install -g vercel`
2. Run: `vercel`
3. Follow prompts to configure both frontend and backend
4. Set environment variables in Vercel dashboard

## Your URLs:
- Frontend: https://your-frontend.vercel.app
- Backend: https://your-backend.vercel.app
- API: https://your-backend.vercel.app/api/companies
