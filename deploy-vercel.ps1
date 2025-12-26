# Vercel Deployment Script for E-Commerce Frontend
# This script deploys the React + Vite frontend to Vercel

Write-Host "🚀 Starting Vercel Deployment..." -ForegroundColor Cyan

# Check if Vercel CLI is installed
if (-not (Get-Command vercel -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Vercel CLI not found. Installing..." -ForegroundColor Yellow
    npm install -g vercel
}

# Check if in correct directory
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Error: package.json not found. Please run this script from the front-end directory." -ForegroundColor Red
    exit 1
}

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Cyan
npm install

# Build the project
Write-Host "🔨 Building the project..." -ForegroundColor Cyan
npm run build

# Check if build was successful
if (-not (Test-Path "dist")) {
    Write-Host "❌ Build failed. dist directory not found." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Build successful!" -ForegroundColor Green

# Deploy to Vercel
Write-Host "🌐 Deploying to Vercel..." -ForegroundColor Cyan
Write-Host ""
Write-Host "Choose deployment type:" -ForegroundColor Yellow
Write-Host "1. Production deployment (vercel --prod)"
Write-Host "2. Preview deployment (vercel)"
$choice = Read-Host "Enter your choice (1 or 2)"

if ($choice -eq "1") {
    Write-Host "Deploying to production..." -ForegroundColor Green
    vercel --prod
} else {
    Write-Host "Deploying as preview..." -ForegroundColor Green
    vercel
}

Write-Host ""
Write-Host "✅ Deployment complete!" -ForegroundColor Green
Write-Host "🎉 Your app is now live on Vercel!" -ForegroundColor Cyan
