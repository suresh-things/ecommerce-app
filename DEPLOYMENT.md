# Deployment Guide - Askhu Store

This guide explains how to deploy your e-commerce application for **free** using various hosting platforms.

## 🎯 Recommended Platform: Vercel

Vercel is the **best choice** for Next.js applications and offers:
- ✅ Free tier with generous limits
- ✅ Automatic deployments from Git
- ✅ Built-in CI/CD
- ✅ Edge network for fast global delivery
- ✅ Zero configuration for Next.js

---

## 📋 Prerequisites

Before deploying, ensure you have:

1. **Git installed** on your machine
2. **GitHub account** (or GitLab/Bitbucket)
3. **Vercel account** (sign up at [vercel.com](https://vercel.com))

---

## 🚀 Deployment Steps

### Step 1: Prepare Your Database

Your app currently uses **SQLite** (`dev.db`), which works locally but **won't persist on Vercel** (serverless environments have ephemeral file systems).

#### Option A: Use Vercel Postgres (Recommended for Production)

1. Install Vercel Postgres SDK:
   ```bash
   npm install @vercel/postgres
   ```

2. Update your `.env` file:
   ```env
   # Replace SQLite with Postgres
   DATABASE_URL="postgres://..."
   ```

3. Update `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"  // Change from "sqlite"
     url      = env("DATABASE_URL")
   }
   ```

4. Run migrations:
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

#### Option B: Keep SQLite for Demo (Quick Start)

If you want to deploy quickly for testing:
- The database will reset on each deployment
- Good for demos, not for production
- Seed data will need to run on each build

---

### Step 2: Initialize Git Repository

```bash
# Navigate to your project
cd c:\Users\sures_pu1g65y\Projects\E-Commerce\ecommerce

# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit - Askhu Store e-commerce app"
```

---

### Step 3: Push to GitHub

1. Create a new repository on [GitHub](https://github.com/new)
   - Name: `askhu-store` (or your preferred name)
   - Keep it **public** or **private**
   - **Don't** initialize with README (you already have one)

2. Push your code:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/askhu-store.git
   git branch -M main
   git push -u origin main
   ```

---

### Step 4: Deploy to Vercel

#### Method 1: Using Vercel Dashboard (Easiest)

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (leave as is)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)

5. Add Environment Variables:
   - Click **"Environment Variables"**
   - Add `DATABASE_URL` with your database connection string
   - If using Vercel Postgres, it will be auto-configured

6. Click **"Deploy"**

#### Method 2: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Y
# - Which scope? (select your account)
# - Link to existing project? N
# - Project name? askhu-store
# - Directory? ./
# - Override settings? N
```

---

### Step 5: Configure Database on Vercel

#### If Using Vercel Postgres:

1. In Vercel Dashboard, go to your project
2. Click **"Storage"** tab
3. Click **"Create Database"** → **"Postgres"**
4. Connect to your project
5. Copy the `DATABASE_URL` (automatically added to environment variables)

6. Run migrations from your local machine:
   ```bash
   # Set the production database URL
   DATABASE_URL="your-vercel-postgres-url" npx prisma migrate deploy
   
   # Seed the database
   DATABASE_URL="your-vercel-postgres-url" npx tsx prisma/seed.ts
   ```

#### If Using SQLite (Demo Only):

1. Add a build script to `package.json`:
   ```json
   "scripts": {
     "build": "prisma generate && prisma migrate deploy && npx tsx prisma/seed.ts && next build"
   }
   ```

2. This will seed the database on each deployment (data won't persist between deployments)

---

### Step 6: Verify Deployment

1. Vercel will provide a URL like: `https://askhu-store.vercel.app`
2. Visit the URL and test:
   - ✅ Homepage loads
   - ✅ Products display
   - ✅ Login/Signup works
   - ✅ Cart functionality
   - ✅ Checkout flow

---

## 🔄 Continuous Deployment

Once set up, **every push to your `main` branch** will automatically trigger a new deployment!

```bash
# Make changes to your code
git add .
git commit -m "Add new feature"
git push origin main

# Vercel automatically deploys! 🎉
```

---

## 🌐 Alternative Free Hosting Options

### Option 2: Netlify

1. Sign up at [netlify.com](https://netlify.com)
2. Connect your GitHub repository
3. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
4. Add environment variables
5. Deploy

**Note**: Netlify requires additional configuration for Next.js API routes (use Netlify Functions).

### Option 3: Railway

1. Sign up at [railway.app](https://railway.app)
2. Create new project from GitHub
3. Railway auto-detects Next.js
4. Add Postgres database (free tier available)
5. Deploy

**Pros**: Includes free Postgres database, great for full-stack apps.

### Option 4: Render

1. Sign up at [render.com](https://render.com)
2. Create new Web Service
3. Connect GitHub repository
4. Configure:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
5. Add environment variables
6. Deploy

---

## 🔐 Environment Variables Checklist

Make sure to add these to your hosting platform:

| Variable | Value | Required |
|----------|-------|----------|
| `DATABASE_URL` | Your database connection string | ✅ Yes |
| `NEXTAUTH_SECRET` | Random secret for auth (if using NextAuth) | Optional |
| `NEXTAUTH_URL` | Your deployment URL | Optional |

Generate a secret:
```bash
openssl rand -base64 32
```

---

## 🐛 Troubleshooting

### Build Fails with Prisma Error

**Solution**: Ensure `prisma generate` runs before build:
```json
"scripts": {
  "build": "prisma generate && next build"
}
```

### Database Connection Error

**Solution**: 
- Verify `DATABASE_URL` is set in environment variables
- Check database is accessible from the internet
- For SQLite, switch to Postgres for production

### Images Not Loading

**Solution**: Update `next.config.ts`:
```typescript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'images.unsplash.com',
    },
  ],
}
```

### API Routes Return 404

**Solution**: Ensure you're using `npm run build` not `next export` (static export doesn't support API routes).

---

## 📊 Free Tier Limits

### Vercel Free Tier:
- ✅ 100 GB bandwidth/month
- ✅ Unlimited deployments
- ✅ Automatic HTTPS
- ✅ Custom domains

### Vercel Postgres Free Tier:
- ✅ 256 MB storage
- ✅ 60 hours compute/month
- ✅ Good for small projects

---

## 🎓 Next Steps After Deployment

1. **Add Custom Domain**: Configure in Vercel dashboard
2. **Set up Analytics**: Add Vercel Analytics
3. **Monitor Performance**: Use Vercel Speed Insights
4. **Add Error Tracking**: Integrate Sentry or similar
5. **Set up Backups**: For production database

---

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Prisma Deployment](https://www.prisma.io/docs/guides/deployment)

---

## ✅ Quick Deployment Checklist

- [ ] Code is committed to Git
- [ ] Repository pushed to GitHub
- [ ] Database configured (Postgres recommended)
- [ ] Environment variables set
- [ ] Build succeeds locally (`npm run build`)
- [ ] Deployed to Vercel
- [ ] Database migrated and seeded
- [ ] Tested all features on production URL

---

**Need Help?** Check the [Vercel Discord](https://vercel.com/discord) or [Next.js Discussions](https://github.com/vercel/next.js/discussions).
