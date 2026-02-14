# Setup Guide - Safe Migration Tamale App

Complete step-by-step guide to set up and deploy the app.

## Part 1: Running Locally (Testing)

### Step 1: Install Node.js

1. Go to https://nodejs.org/
2. Download the LTS (Long Term Support) version
3. Run the installer
4. Verify installation:
   ```bash
   node --version
   npm --version
   ```

### Step 2: Run the App

1. Open Terminal (Mac/Linux) or Command Prompt (Windows)
2. Navigate to the app folder:
   ```bash
   cd safemigration-app
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
   (This takes 2-5 minutes)

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open browser to: `http://localhost:5173`

### Step 3: Access Admin Dashboard

Add `?admin=true` to the URL:
```
http://localhost:5173?admin=true
```

## Part 2: Configure Claude API (Optional)

The app works with mock fraud detection out of the box. For AI-powered fraud detection:

### Step 1: Get Claude API Key

1. Go to https://console.anthropic.com/
2. Create an account
3. Go to "API Keys"
4. Create a new key
5. Copy the key (starts with `sk-ant-...`)

### Step 2: Add API Key to App

1. Open `src/services/fraudDetection.js`
2. Find line 4:
   ```javascript
   const CLAUDE_API_KEY = 'your-api-key-here';
   ```
3. Replace `'your-api-key-here'` with your actual key:
   ```javascript
   const CLAUDE_API_KEY = 'sk-ant-api03-...';
   ```
4. Save the file

**Important:** Never share your API key or commit it to GitHub!

## Part 3: Deploy to the Internet (Free)

### Option A: Deploy to Vercel (Recommended - Easiest)

1. Create a free account at https://vercel.com/signup

2. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

3. Log in:
   ```bash
   vercel login
   ```

4. Deploy:
   ```bash
   vercel
   ```

5. Follow prompts:
   - Link to existing project? **No**
   - Project name? **safemigration-tamale** (or your choice)
   - Directory? Press **Enter** (current directory)
   - Modify settings? **No**

6. You'll get a URL like: `https://safemigration-tamale.vercel.app`

### Option B: Deploy to Netlify

1. Create account at https://netlify.com

2. Method 1 - Drag & Drop:
   ```bash
   npm run build
   ```
   Then drag the `dist` folder to Netlify's deploy page

3. Method 2 - CLI:
   ```bash
   npm install -g netlify-cli
   netlify login
   netlify deploy --prod
   ```

### Option C: Deploy to GitHub Pages

1. Add to `package.json`:
   ```json
   "homepage": "https://yourusername.github.io/safemigration-app"
   ```

2. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

3. Add scripts to `package.json`:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```

4. Deploy:
   ```bash
   npm run deploy
   ```

## Part 4: Create Android App (APK)

### Method 1: PWA Builder (Easiest - No Coding)

1. Deploy your app first (Part 3)

2. Go to https://www.pwabuilder.com/

3. Enter your app URL (e.g., `https://safemigration-tamale.vercel.app`)

4. Click "Start" and wait for analysis

5. Click "Package For Stores"

6. Select "Android" → "Generate Package"

7. Configure:
   - Package ID: `com.safemigration.tamale`
   - App Name: `Safe Migration Tamale`
   - Launcher Name: `SafeMigration`
   - Version: `1.0.0`

8. Click "Generate" and download the APK

9. Download to your Android phone and install
   (You may need to enable "Install from Unknown Sources")

### Method 2: Capacitor (More Control)

1. Install Capacitor:
   ```bash
   npm install @capacitor/core @capacitor/cli
   npm install @capacitor/android
   ```

2. Initialize:
   ```bash
   npx cap init
   ```
   - App name: `Safe Migration Tamale`
   - Package ID: `com.safemigration.tamale`
   - Web asset directory: `dist`

3. Build web app:
   ```bash
   npm run build
   ```

4. Add Android platform:
   ```bash
   npx cap add android
   npx cap sync
   ```

5. Open in Android Studio:
   ```bash
   npx cap open android
   ```

6. In Android Studio:
   - Build → Generate Signed Bundle / APK
   - Select APK
   - Create a keystore (save it safely!)
   - Build the APK
   - Find it in `android/app/build/outputs/apk/`

## Part 5: Customize the App

### Update Branding

1. **App Name:**
   - Edit `index.html` → Change `<title>`
   - Edit `vite.config.js` → Update `manifest.name`

2. **Icons:**
   - Replace `public/icon-192.png` and `public/icon-512.png`
   - Use https://www.favicon-generator.org/

3. **Colors:**
   - Edit `tailwind.config.js`:
     ```javascript
     colors: {
       primary: '#2563eb', // Change this
     }
     ```

### Update Contact Info

1. **Hotlines:**
   - Edit `src/data/resources.js`
   - Update Hope Education Project number

2. **Admin Email:**
   - Update in README.md

### Add New Scenarios

1. Open `src/data/scenarios.js`

2. Copy the structure of an existing scenario

3. Create your story with decision points

4. Test it: Go to Education → Your New Scenario

## Part 6: Testing Checklist

Before launching:

- [ ] Test job scanner with photos
- [ ] Test OCR text extraction
- [ ] Complete all 3 education scenarios
- [ ] Check all hotline numbers work (tel: links)
- [ ] Submit a test job ad
- [ ] Access admin dashboard and review it
- [ ] Test on actual mobile phone
- [ ] Test offline (turn off WiFi)
- [ ] Install as PWA on phone
- [ ] Test "Add to Home Screen"

## Part 7: Launch Checklist

- [ ] Deploy to production URL
- [ ] Test on 2G/3G connection
- [ ] Test on low-end Android phones
- [ ] Create promotional materials
- [ ] Train admin staff on dashboard
- [ ] Set up monitoring/analytics
- [ ] Prepare user support documentation
- [ ] Plan community outreach in Tamale

## Troubleshooting

### "npm: command not found"
- Node.js not installed properly
- Reinstall from nodejs.org

### "Port 5173 already in use"
- Another app is running
- Close other terminal windows or use different port:
  ```bash
  npm run dev -- --port 3000
  ```

### OCR Not Working
- Image quality too low
- Try with better lighting
- Use higher resolution camera

### Admin Dashboard Empty
- No submissions yet
- Scan a job ad first
- Check localStorage in DevTools

### PWA Not Installing
- Must be HTTPS (not http://)
- Must have valid manifest
- Test on deployed version, not localhost

## Getting Help

### Resources
- Vite Documentation: https://vite.dev/
- React Documentation: https://react.dev/
- Tailwind CSS: https://tailwindcss.com/
- Tesseract.js: https://tesseract.projectnaptha.com/

### Support Channels
- Create GitHub Issue
- Email: [your-support-email]
- Community forum: [if applicable]

## Maintenance

### Regular Updates
```bash
# Update dependencies monthly
npm update

# Check for security issues
npm audit

# Fix security issues
npm audit fix
```

### Backup Data
- Export CSV from admin dashboard regularly
- Store API keys securely
- Keep deployment credentials safe

### Monitor Usage
- Track scam reports
- Monitor high-risk detections
- Review user feedback
- Update fraud detection patterns

---

## Next Steps After Setup

1. **User Testing:** Test with 5-10 target users in Tamale
2. **Content Review:** Have local experts review scenarios
3. **Translation:** Add Dagbani language support
4. **Backend:** Move to Firebase for persistence
5. **Partnerships:** Connect with Ghana Immigration Service
6. **Marketing:** Promote in Tamale markets
7. **Training:** Train community leaders to use the app
8. **Iteration:** Gather feedback and improve

Good luck! 🚀
