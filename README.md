# Safe Migration Tamale - Anti-Trafficking PWA

A mobile-first Progressive Web App for anti-trafficking education and job fraud detection in Tamale, Ghana.

## 🎯 Features

### 1. **Job Ad Fraud Screener**
- Camera photo capture or file upload of job advertisements
- OCR text extraction using Tesseract.js
- AI-powered fraud detection using Claude API
- Risk scoring (Low/Medium/High)
- Submission tracking with user phone numbers
- Real-time fraud pattern detection

### 2. **Gamified Education Module**
- 3 interactive scenarios based on real trafficking patterns:
  - The Kayaye Opportunity (market porter scam)
  - The WhatsApp Job Offer (social media fraud)
  - The Market Agent (unlicensed recruiter)
- Decision-tree gameplay with points system
- Safe/Warning/Danger endings
- Gold Certificate badge for completing all scenarios
- Progress saved locally

### 3. **Resource Hub**
- Emergency hotlines (Ghana Trafficking Hotline: 0800-100-100, Police: 191)
- Trafficking warning signs infographic
- Ghana Immigration Service verified agencies list
- Educational tips on safe migration
- Statistics and facts

### 4. **Admin Dashboard**
- Review submitted job ads
- Mark submissions as verified safe/confirmed scam
- Export data as CSV
- View risk scores and detected fraud patterns
- Track high-risk submissions

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Claude API key (for AI fraud detection - optional for prototype)

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Access Admin Dashboard
Add `?admin=true` to the URL: `http://localhost:5173?admin=true`

## 🔧 Configuration

### 1. Claude API Setup (Optional)

For AI-powered fraud detection, add your Claude API key:

**File:** `src/services/fraudDetection.js`

```javascript
const CLAUDE_API_KEY = 'your-actual-api-key-here';
```

**Note:** For the prototype/MVP, the app uses mock keyword-based fraud detection when no API key is provided.

### 2. PWA Icons

Replace placeholder icons in `/public/`:
- `icon-192.png` (192x192px)
- `icon-512.png` (512x512px)

Use tools like [Favicon Generator](https://www.favicon-generator.org/) to create icons.

### 3. Update Hotline Numbers

**File:** `src/data/resources.js`

Update the Hope Education Project contact number:
```javascript
{
  id: 'hope_project',
  name: 'Hope Education Project',
  number: '+233-XX-XXX-XXXX', // Replace with actual number
  ...
}
```

## 📦 Build & Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized build in `/dist` folder.

### Deploy to Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

Or use Vercel web interface to import your GitHub repository.

### Deploy to Netlify

1. Run `npm run build`
2. Go to [netlify.com](https://netlify.com)
3. Drag `/dist` folder to deploy

## 📱 Convert to Android App (APK)

### Using PWABuilder (Easiest)

1. Deploy your app to a public URL
2. Go to [PWABuilder.com](https://www.pwabuilder.com/)
3. Enter your URL
4. Click "Build My PWA"
5. Select "Android" and download APK

### Using Capacitor

```bash
npm install @capacitor/core @capacitor/cli @capacitor/android
npx cap init
npm run build
npx cap add android
npx cap sync
npx cap open android
```

Build APK in Android Studio.

## 💾 Data Storage

### LocalStorage Keys
- `safemigration_user` - User profile
- `safemigration_submissions` - Job ad submissions
- `safemigration_progress` - Education progress
- `safemigration_completed` - Completed scenarios

### Data Privacy
- All data stored locally on user's device
- No server-side storage in MVP version
- Phone numbers only collected for verification callbacks

## 🧪 Testing

### Test Locally
```bash
npm run dev
```

### Test as PWA
1. Deploy to HTTPS URL (use Vercel/Netlify)
2. Open on mobile browser
3. Look for "Add to Home Screen" prompt
4. Install and test as standalone app

## 🚨 Important Notes

### Current Limitations (MVP):
- No backend database - uses localStorage only
- No real-time admin notifications
- No SMS verification
- Mock fraud detection without Claude API key

### Recommended Next Steps:
1. Add Firebase backend for data persistence
2. Implement SMS verification for submissions
3. Add push notifications for admin updates
4. Add Dagbani language support
5. Conduct user testing in Tamale
6. Partner with local authorities for verification

---

**Built with ❤️ to protect Tamale from human trafficking**
