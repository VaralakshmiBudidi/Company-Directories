#!/bin/bash

# Frontend Deployment Script for Vercel
echo "🚀 Preparing frontend for Vercel deployment..."

# Navigate to frontend directory
cd frontend

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building project..."
npm run build

echo "✅ Frontend is ready for deployment!"
echo "📋 Next steps:"
echo "1. Go to Vercel Dashboard"
echo "2. Import your GitHub repository"
echo "3. Set Root Directory to: frontend"
echo "4. Set Build Command to: npm run build"
echo "5. Set Output Directory to: build"
