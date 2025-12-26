# Deploying Frontend to Vercel

## Prerequisites
- Node.js installed
- Vercel account (sign up at https://vercel.com)
- Git repository

## Quick Start - Automatic Deployment

### Method 1: Using PowerShell Script (Recommended)
```powershell
cd front-end
.\deploy-vercel.ps1
```

### Method 2: Using Vercel CLI Manually

1. **Install Vercel CLI globally**
```bash
npm install -g vercel
```

2. **Login to Vercel**
```bash
vercel login
```

3. **Navigate to the frontend directory**
```bash
cd front-end
```

4. **Deploy to Vercel**

For preview deployment:
```bash
vercel
```

For production deployment:
```bash
vercel --prod
```

## Method 3: Deploy via GitHub (CI/CD)

1. **Push your code to GitHub**
```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

2. **Connect to Vercel**
   - Go to https://vercel.com/dashboard
   - Click "Add New Project"
   - Import your GitHub repository
   - Configure:
     - **Framework Preset**: Vite
     - **Root Directory**: `front-end`
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`

3. **Set Environment Variables** (if needed)
   - In Vercel Dashboard → Project Settings → Environment Variables
   - Add any API URLs or configuration variables

4. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy
   - Every push to main branch will trigger automatic deployments

## Configuration Files

### vercel.json
Configures Vercel build and routing settings:
- Specifies build output directory (`dist`)
- Routes all requests to `index.html` for React Router support
- Sets production environment variables

### .vercelignore
Excludes unnecessary files from deployment to reduce bundle size.

## Environment Variables

If your app uses environment variables, create them in:
- **Local**: `.env.local`
- **Vercel Dashboard**: Project Settings → Environment Variables

Example variables:
```env
VITE_API_BASE_URL=https://your-api-url.com
VITE_USER_SERVICE_URL=https://user-service.onrender.com
VITE_PRODUCT_SERVICE_URL=https://product-service.onrender.com
VITE_CART_SERVICE_URL=https://cart-service.onrender.com
```

## Updating Your App

After making changes:
```bash
git add .
git commit -m "Update frontend"
git push origin main
```

Vercel will automatically rebuild and redeploy.

## Custom Domain

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

## Troubleshooting

### Build Fails
- Check build logs in Vercel Dashboard
- Ensure `package.json` has correct build script
- Verify all dependencies are in `package.json`

### 404 Errors on Routes
- Ensure `vercel.json` has correct routing configuration
- All routes should redirect to `/index.html`

### Environment Variables Not Working
- Make sure variables are prefixed with `VITE_`
- Redeploy after adding new variables

## Commands Reference

```bash
# Deploy preview
vercel

# Deploy to production
vercel --prod

# Pull environment variables
vercel env pull

# View deployment logs
vercel logs

# List deployments
vercel ls

# Remove deployment
vercel rm [deployment-url]
```

## Links
- [Vercel Documentation](https://vercel.com/docs)
- [Vite Documentation](https://vitejs.dev)
