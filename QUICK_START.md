# 🚀 Quick Start Guide

## Option 1: Easy Deployment (Recommended)

### For Windows Users:
1. Double-click `deploy.bat`
2. Follow the prompts
3. Go to [vercel.com](https://vercel.com) to deploy

### For Mac/Linux Users:
1. Open terminal in project folder
2. Run: `chmod +x deploy.sh && ./deploy.sh`
3. Follow the prompts
4. Go to [vercel.com](https://vercel.com) to deploy

## Option 2: Manual Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Test Locally
```bash
npm run dev
```
Visit: http://localhost:3000

### 3. Create GitHub Repository
1. Go to [github.com](https://github.com)
2. Click "New repository"
3. Name it (e.g., "my-portfolio")
4. Don't initialize with README

### 4. Upload Code
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### 5. Deploy on Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Import your repository
5. Click "Deploy"

## 🎯 What You Get

✅ **Mobile-responsive design**
✅ **Dedicated games section**
✅ **Smooth scroll animations**
✅ **Dark mode support**
✅ **Contact form ready**
✅ **SEO optimized**
✅ **Performance optimized**

## 📱 Mobile Features

- Hamburger menu navigation
- Floating action button
- Touch-optimized interactions
- Responsive image handling
- Mobile-first design

## 🎮 Games Showcase

Your games are now beautifully displayed with:
- Category badges
- Play button overlays
- Hover animations
- Responsive grid layout

## 🔧 Customization

Edit `lib/data.ts` to:
- Add/remove projects
- Add/remove games
- Update personal information
- Modify skills and experience

## 📧 Contact Form

To enable email functionality:
1. Get API key from [resend.com](https://resend.com)
2. Add to Vercel environment variables:
   - Key: `RESEND_API_KEY`
   - Value: Your API key

## 🆘 Need Help?

- Check `DEPLOYMENT_GUIDE.md` for detailed instructions
- Check `MOBILE_ENHANCEMENTS.md` for feature details
- Create an issue on GitHub if you encounter problems

---

**Your portfolio is ready to impress! 🌟**