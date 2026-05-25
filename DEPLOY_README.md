# Mihir Giri Portfolio — Render Deployment Guide

## Files
- All source code in `/src`
- Built files in `/dist`

## Deploy on Render (Free)

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial portfolio"
git remote add origin https://github.com/MihirGiri/portfolio.git
git push -u origin main
```

### Step 2: Deploy on Render
1. Go to render.com → Sign up free
2. Click "New" → "Static Site"
3. Connect your GitHub repo
4. Fill these settings:
   - Build Command: `npm run build`
   - Publish Directory: `dist`
5. Click "Create Static Site"
6. Wait 2-3 minutes → Your site is LIVE! 🎉

## Local Development
```bash
npm install
npm run dev
```

## Add Your Photo
Replace the 👤 emoji in Hero section with:
```jsx
<img src="/your-photo.jpg" style={{width:110,height:110,borderRadius:"50%",...}} />
```
Put your photo in the `/public` folder.

## Add Resume PDF
Put your resume PDF in `/public/mihir_resume.pdf`
