# Deploy Backend from Main Branch on Vercel

## Step 1: Deploy Backend to Vercel

1. **Go to [Vercel Dashboard](https://vercel.com/dashboard)**
2. **Click "New Project"**
3. **Import your GitHub repository**: `https://github.com/VaralakshmiBudidi/Company-Directories.git`
4. **Select `main` branch** ✅
5. **Vercel will auto-detect it as a Node.js app**

## Step 2: Configure Backend Project

### In Vercel Project Settings:
- **Framework**: Node.js (auto-detected)
- **Root Directory**: Leave empty (uses root)
- **Build Command**: Leave default
- **Output Directory**: Leave default

### Environment Variables:
Add these in Vercel project settings:
```
DATABASE_URL=postgresql://neondb_owner:npg_hw5xHlFMSK4r@ep-small-dust-adejr2g9-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
NODE_ENV=production
```

## Step 3: Test Your Backend

After deployment, test these endpoints:
- **Root**: `https://your-backend.vercel.app/`
- **Health**: `https://your-backend.vercel.app/api/health`
- **Companies**: `https://your-backend.vercel.app/api/companies`

## Step 4: Deploy Frontend (Separate Project)

1. **Create another Vercel project**
2. **Import same GitHub repository**
3. **Select `frontend-deploy` branch**
4. **Add Environment Variable**:
   ```
   REACT_APP_API_URL=https://your-backend.vercel.app/api
   ```

## Your URLs:
- **Backend**: `https://your-backend.vercel.app`
- **Frontend**: `https://your-frontend.vercel.app`
- **API**: `https://your-backend.vercel.app/api/companies`
