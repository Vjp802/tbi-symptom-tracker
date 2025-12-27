# TBI Symptom Tracker

A clinical-grade web application for tracking traumatic brain injury (TBI) symptoms. Built with React, TypeScript, and Tailwind CSS.

![TBI Symptom Tracker](https://img.shields.io/badge/Medical-Research%20Tool-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## Features

✅ **Comprehensive Symptom Logging**
- Track 12+ common TBI symptoms
- Severity rating (1-10 scale)
- Timestamped entries with notes

✅ **Data Persistence**
- Automatic localStorage saving
- Privacy-focused (data stays on device)
- No account or login required

✅ **Advanced Analytics**
- 7-day severity trend visualization
- Symptom frequency analysis
- Trend indicators (improving/worsening/stable)

✅ **Data Export**
- CSV export for clinical review
- JSON export for data portability
- Timestamped filenames

✅ **Full CRUD Operations**
- Edit existing entries
- Delete with confirmation
- Date range filtering (7/30 days, all-time)

✅ **Clinical-Grade UI**
- Professional medical interface
- Responsive design (mobile & desktop)
- Accessibility-focused
- HIPAA-compliant data handling

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Build Tool**: Vite
- **Date Handling**: date-fns
- **Icons**: Lucide React

## Installation

### Prerequisites
- Node.js 18+ and npm

### Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd tbi-symptom-tracker

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Usage

### Logging Symptoms
1. Select symptom type from dropdown
2. Adjust severity slider (1-10)
3. Add optional notes for context
4. Click "Record Entry"

### Viewing Analytics
- Click the chart icon in the header to toggle analytics
- View 7-day trends, symptom frequency, and statistics
- Use date filters to focus on specific time periods

### Exporting Data
- Click "CSV" or "JSON" buttons in the activity history section
- Files are automatically downloaded with timestamps
- Share with healthcare providers as needed

## Deployment

### Deploy to Vercel

1. **Push to GitHub**:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

2. **Deploy on Vercel**:
   - Visit [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Vite settings
   - Click "Deploy"

3. **Access Your App**:
   - Your app will be live at `https://<your-project>.vercel.app`

### Alternative: Deploy to Netlify

```bash
npm run build
# Drag the 'dist' folder to netlify.com/drop
```

## Clinical Disclaimers

⚠️ **IMPORTANT MEDICAL NOTICE**

- This tool is for **symptom tracking only** and is not a diagnostic tool
- Always consult qualified healthcare providers for medical advice
- Do not use this app as a substitute for professional medical care
- Data is stored locally on your device - export regularly for backups
- This app is not HIPAA-certified for protected health information storage

## Privacy & Data Security

- **Local Storage**: All data remains on your device
- **No Cloud Sync**: Data is NOT transmitted to external servers
- **No Analytics**: No tracking or analytics scripts
- **Export Control**: You control all data exports and sharing

## Development

### Project Structure

```
tbi-symptom-tracker/
├── src/
│   ├── components/
│   │   └── Analytics.tsx      # Charts and statistics
│   ├── utils/
│   │   ├── storage.ts         # localStorage management
│   │   └── export.ts          # CSV/JSON export
│   ├── types.ts               # TypeScript definitions
│   ├── App.tsx                # Main application
│   ├── main.tsx               # Entry point
│   └── index.css              # Global styles
├── public/                    # Static assets
├── package.json
└── vite.config.ts
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

This is a medical research tool. Contributions should prioritize:
1. Data accuracy and integrity
2. User privacy and security
3. Clinical usability
4. Accessibility compliance

## License

MIT License - See LICENSE file for details

## Support

For issues or questions, please open a GitHub issue.

---

**Built with ❤️ for TBI patients and researchers**
