# 🚀 Deployment Guide

## Method 1: Deploy to Vercel (Recommended)

### Step 1: Prepare Your Repository

1. **Create a new GitHub repository**
   - Go to [github.com](https://github.com)
   - Click "New repository"
   - Name it something like `my-portfolio` or `personal-website`
   - Make it public or private (your choice)
   - Don't initialize with README (we already have one)

### Step 2: Upload Your Code to GitHub

```bash
# Navigate to your project folder
cd Web-Portfolio-Duel-main

# Initialize git (if not already done)
git init

# Add all files
git add .

# Make your first commit
git commit -m "Initial portfolio commit with mobile enhancements"

# Add your GitHub repository as origin
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git

# Push to GitHub
git push -u origin main
```

### Step 3: Deploy on Vercel

1. **Go to [vercel.com](https://vercel.com)**
2. **Sign up/Login** with your GitHub account
3. **Click "New Project"**
4. **Import your GitHub repository**
5. **Configure project:**
   - Framework Preset: Next.js
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
6. **Click "Deploy"**

🎉 **Your portfolio will be live in 2-3 minutes!**

---

## Method 2: Deploy to Netlify

### Step 1: Build for Static Export

First, update your `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    distDir: "build",
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com",
            },
        ],
    },
    experimental: {
        serverActions: true,
    }
};

module.exports = nextConfig;
```

### Step 2: Build and Deploy

```bash
# Build the project
npm run build

# The build folder will contain your static site
# Upload the 'build' folder to Netlify
```

---

## Method 3: Deploy to GitHub Pages

### Step 1: Install gh-pages

```bash
npm install --save-dev gh-pages
```

### Step 2: Update package.json

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

### Step 3: Update next.config.js

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    distDir: "build",
    basePath: "/YOUR_REPOSITORY_NAME",
    images: {
        unoptimized: true,
    }
};

module.exports = nextConfig;
```

### Step 4: Deploy

```bash
npm run deploy
```

---

## 📧 Contact Form Setup (Optional)

If you want the contact form to work:

### Step 1: Get Resend API Key
1. Go to [resend.com](https://resend.com)
2. Sign up and get your API key

### Step 2: Add Environment Variables

**For Vercel:**
1. Go to your project dashboard
2. Click "Settings" → "Environment Variables"
3. Add: `RESEND_API_KEY` = `your_api_key_here`

**For local development:**
Create `.env.local`:
```env
RESEND_API_KEY=your_api_key_here
```

---

## 🔧 Troubleshooting

### Common Issues:

1. **Build fails on Vercel**
   - Check that all dependencies are in `package.json`
   - Ensure no TypeScript errors
   - Check the build logs for specific errors

2. **Images not loading**
   - Make sure all images are in the `public` folder
   - Check image paths in `lib/data.ts`
   - For static export, set `images.unoptimized: true`

3. **Contact form not working**
   - Ensure you have the Resend API key set up
   - Check environment variables are properly configured

### Performance Tips:

1. **Optimize images** - Use WebP format when possible
2. **Check bundle size** - Run `npm run build` to see bundle analysis
3. **Test mobile performance** - Use Chrome DevTools mobile simulation

---

## 🎯 Post-Deployment Checklist

- [ ] Test all navigation links
- [ ] Verify mobile responsiveness
- [ ] Check dark mode toggle
- [ ] Test contact form (if enabled)
- [ ] Verify all project/game links work
- [ ] Test on different browsers
- [ ] Check loading performance

---

## 🌐 Custom Domain (Optional)

### For Vercel:
1. Go to project settings
2. Click "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

### For Netlify:
1. Go to site settings
2. Click "Domain management"
3. Add custom domain
4. Update DNS records

---

**Need help?** Check the troubleshooting section or create an issue in your repository!