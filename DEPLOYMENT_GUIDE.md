# Physical AI & Humanoid Robotics Textbook - Complete Deployment Guide

## 📋 Overview

This guide provides step-by-step instructions to deploy your Physical AI & Humanoid Robotics textbook built with Docusaurus, React, and Tailwind CSS.

---

## ✅ Prerequisites Checklist

- [ ] Node.js 20.x LTS installed
- [ ] Git installed and configured
- [ ] GitHub account created
- [ ] (Optional) Ubuntu 22.04 for ROS 2 code examples

---

## 🚀 Local Setup (First Time)

### Step 1: Navigate to Project

```bash
cd C:\Users\DC\Desktop\hackathon-claude\textbook-platform
```

### Step 2: Install Dependencies

```bash
npm install
```

**Expected Output**:
```
added 1500+ packages in 2-3 minutes
```

### Step 3: Start Development Server

```bash
npm start
```

**Expected Output**:
```
[INFO] Starting the development server...
[SUCCESS] Docusaurus website is running at: http://localhost:3000/
```

### Step 4: Verify in Browser

Open `http://localhost:3000` - you should see:
- ✅ Homepage with 4 ChapterCards (Module 1-4)
- ✅ Blue gradient header
- ✅ "Start Learning" button
- ✅ Sidebar navigation with all 13 lessons

---

## 🏗️ Build for Production

### Step 1: Create Production Build

```bash
npm run build
```

**Expected Output**:
```
[SUCCESS] Generated static files in "build".
[INFO] Use `npm run serve` to test your build locally.
```

### Step 2: Test Production Build Locally

```bash
npm run serve
```

Open `http://localhost:3000` and verify:
- ✅ All pages load correctly
- ✅ Navigation works
- ✅ Dark mode toggle functions
- ✅ No console errors

---

## 🌐 GitHub Pages Deployment

### Option A: Automatic Deployment (Recommended)

#### 1. Create GitHub Repository

```bash
# Navigate to project root
cd C:\Users\DC\Desktop\hackathon-claude

# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit: Physical AI textbook"

# Create GitHub repo (replace YOUR-USERNAME)
gh repo create YOUR-USERNAME/textbook-platform --public --source=. --remote=origin --push
```

#### 2. Configure `docusaurus.config.ts`

Edit `textbook-platform/docusaurus.config.ts`:

```typescript
const config: Config = {
  title: 'Physical AI & Humanoid Robotics',
  tagline: 'A Complete Guide to ROS 2, Simulation, and Advanced Robotics',

  // CHANGE THESE:
  url: 'https://YOUR-USERNAME.github.io',
  baseUrl: '/textbook-platform/',
  organizationName: 'YOUR-USERNAME',
  projectName: 'textbook-platform',

  // ... rest of config
};
```

#### 3. Enable GitHub Pages

1. Go to `https://github.com/YOUR-USERNAME/textbook-platform`
2. Click **Settings** → **Pages**
3. Under "Build and deployment":
   - Source: **GitHub Actions**
4. Click **Save**

#### 4. Push to Main Branch

```bash
git add .
git commit -m "Configure GitHub Pages"
git push origin main
```

GitHub Actions will automatically:
1. Build the site
2. Run tests
3. Deploy to `https://YOUR-USERNAME.github.io/textbook-platform/`

#### 5. Monitor Deployment

1. Go to `https://github.com/YOUR-USERNAME/textbook-platform/actions`
2. Watch the "Deploy Docusaurus to GitHub Pages" workflow
3. Wait 2-5 minutes for completion
4. Visit `https://YOUR-USERNAME.github.io/textbook-platform/`

---

### Option B: Manual Deployment

```bash
cd textbook-platform
GIT_USER=YOUR-USERNAME npm run deploy
```

This pushes the built site to the `gh-pages` branch.

---

## 🧪 Testing & Validation

### 1. Markdown Linting

```bash
npm run lint:md
```

**Expected**: No errors (or only minor warnings)

### 2. Build Test

```bash
npm run build
```

**Expected**: `[SUCCESS] Generated static files in "build".`

### 3. Accessibility Audit

```bash
# Start dev server first
npm start

# In another terminal:
npm run a11y
```

**Expected**: WCAG 2.1 AA compliance

### 4. Performance Audit (Lighthouse)

```bash
# Start dev server first
npm start

# In another terminal:
npm run lighthouse
```

**Expected**: Scores >90 in all categories

---

## 📝 Content Management

### Adding a New Lesson

1. **Create Markdown File**:
   ```bash
   cd docs/book/chapters/module-1-ros2
   touch week-05-new-topic.md
   ```

2. **Add Frontmatter**:
   ```markdown
   ---
   id: week-05-new-topic
   title: 'Week 5: New Topic Title'
   sidebar_label: 'Week 5: New Topic'
   ---
   ```

3. **Update `sidebars.ts`**:
   ```typescript
   {
     type: 'category',
     label: 'Module 1: ROS 2 Foundations',
     items: [
       'book/chapters/module-1-ros2/week-01-intro-physical-ai',
       'book/chapters/module-1-ros2/week-05-new-topic', // ADD HERE
     ],
   }
   ```

4. **Test Locally**:
   ```bash
   npm start
   ```

5. **Deploy**:
   ```bash
   git add .
   git commit -m "Add Week 5 lesson"
   git push origin main
   ```

---

## 🎨 Customization

### Change Theme Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  primary: {
    500: '#YOUR-HEX-COLOR', // Change primary color
  },
},
```

Update `src/css/custom.css`:

```css
:root {
  --ifm-color-primary: #YOUR-HEX-COLOR;
}
```

### Modify Homepage

Edit `src/pages/index.tsx`:

```typescript
<h1 className="text-5xl font-bold mb-4">
  YOUR NEW TITLE
</h1>
```

---

## 🔧 Troubleshooting

### Issue: `npm start` fails with port error

**Solution**:
```bash
npm start -- --port 3001
```

### Issue: Build fails with TypeScript errors

**Solution**:
```bash
npm run typecheck
# Fix reported errors, then:
npm run build
```

### Issue: GitHub Actions deployment fails

**Solution**:
1. Check `.github/workflows/deploy.yml` syntax
2. Verify GitHub Pages is enabled in repo settings
3. Ensure `docusaurus.config.ts` has correct `url` and `baseUrl`

### Issue: Tailwind classes not working

**Solution**:
```bash
# Rebuild with cache clear
npm run clear
npm run build
```

---

## 📦 Production Checklist

Before deploying to production:

- [ ] All 13 lessons created and tested
- [ ] Images optimized (<500KB total bundle)
- [ ] All code examples tested on ROS 2 Humble
- [ ] Accessibility audit passed (WCAG 2.1 AA)
- [ ] Lighthouse scores >90 (Performance, Accessibility, Best Practices, SEO)
- [ ] All links validated (no 404s)
- [ ] Mobile responsive (375px to 1920px)
- [ ] Dark mode tested
- [ ] Cross-browser tested (Chrome, Firefox, Safari)
- [ ] GitHub Actions workflows passing
- [ ] README.md updated with correct URLs

---

## 🔐 Security

### Environment Variables (if needed)

Create `.env.local`:
```
REACT_APP_API_KEY=your-key-here
```

**Never commit `.env` files to Git!**

Add to `.gitignore`:
```
.env
.env.local
.env.production
```

---

## 📞 Support

**Issues**: https://github.com/YOUR-USERNAME/textbook-platform/issues
**Docs**: https://docusaurus.io/docs

---

## 🎓 Next Steps

1. **Add Content**: Complete all 13 weekly lessons
2. **Add Media**: Screenshots, diagrams, videos
3. **SEO Optimization**: Add meta descriptions, Open Graph tags
4. **Analytics**: Integrate Google Analytics (optional)
5. **Search**: Enable Algolia DocSearch (optional)
6. **Community**: Enable GitHub Discussions for Q&A

---

**Last Updated**: 2025-12-07
**Docusaurus Version**: 3.9.2
**Node.js**: 20.x LTS
