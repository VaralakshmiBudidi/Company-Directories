# Deployment Guide for Company Management System

## Vercel Deployment

### Prerequisites
- GitHub repository with your code
- Vercel account (free tier available)
- Neon DB account (for database)

### Step 1: Deploy Frontend to Vercel

1. **Go to [Vercel Dashboard](https://vercel.com/dashboard)**
2. **Click "New Project"**
3. **Import your GitHub repository**
4. **Configure the project:**
   - **Framework Preset**: Create React App
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

### Step 2: Deploy Backend (Choose one option)

#### Option A: Deploy Backend to Railway/Render (Recommended)
1. **Go to [Railway](https://railway.app) or [Render](https://render.com)**
2. **Connect your GitHub repository**
3. **Set Root Directory to `backend`**
4. **Add Environment Variables:**
   ```
   DATABASE_URL=your_neon_db_connection_string
   NODE_ENV=production
   ```

#### Option B: Convert to Vercel Serverless Functions
1. **Create `api` folder in your project root**
2. **Move backend logic to serverless functions**
3. **Update frontend API calls**

### Step 3: Configure Environment Variables

#### In Vercel Dashboard:
1. **Go to Project Settings → Environment Variables**
2. **Add the following variables:**
   ```
   REACT_APP_API_URL=https://your-backend-url.com/api
   ```

#### In your Backend deployment:
```
DATABASE_URL=postgresql://neondb_owner:password@ep-small-dust-adejr2g9-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
NODE_ENV=production
```

### Step 4: Update Frontend API Configuration

The frontend is already configured to use environment variables:
```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
```

### Step 5: Test Your Deployment

1. **Frontend**: Visit your Vercel URL
2. **Backend**: Test API endpoints
3. **Database**: Verify data persistence

## Alternative: Full Vercel Deployment

If you want to deploy everything on Vercel, you'll need to convert your Express backend to Vercel serverless functions.

### Converting Backend to Serverless Functions

1. **Create `api` folder in project root**
2. **Move each route to a separate serverless function**
3. **Update database connection for serverless environment**

## Environment Variables Reference

### Frontend (Vercel)
- `REACT_APP_API_URL`: Your backend API URL

### Backend (Railway/Render)
- `DATABASE_URL`: Your Neon DB connection string
- `NODE_ENV`: Set to `production`

## Troubleshooting

### Common Issues:
1. **CORS errors**: Ensure backend allows your frontend domain
2. **API not found**: Check environment variables
3. **Database connection**: Verify DATABASE_URL format

### Debug Steps:
1. Check Vercel function logs
2. Verify environment variables
3. Test API endpoints directly
4. Check database connection

## Support

For issues with deployment, check:
- Vercel documentation
- Railway/Render documentation
- Neon DB documentation
