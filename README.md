# TBI Symptom Tracker

A privacy-first web app for tracking traumatic brain injury (TBI) symptoms over time — log entries in seconds, view trends, and export reports for appointments.

[![Medical](https://img.shields.io/badge/Medical-Research%20Tool-blue)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**Live Demo:** https://tbi-symptom-tracker.vercel.app/  
**Vercel Project:** https://vercel.com/vincent-s-projects-352f4508/tbi-symptom-tracker  
**Repo:** https://github.com/Vjp802/tbi-symptom-tracker  
**Deploy:** [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Vjp802/tbi-symptom-tracker)

> **Privacy note:** Your data stays on your device (localStorage). No accounts. No analytics. No cloud sync.

---

## What it does

✅ **Symptom logging**
- Track common TBI symptoms
- Severity rating (1–10)
- Timestamped notes

✅ **Insights**
- 7-day severity trend chart
- Symptom frequency analysis
- Trend indicators (improving / stable / worsening)

✅ **Export**
- CSV export for review
- JSON export for portability
- Timestamped filenames

✅ **Manage entries**
- Edit and delete (with confirmation)
- Date range filtering (7/30 days, all-time)

---

## Tech Stack

- **React 18 + TypeScript**
- **Tailwind CSS**
- **Recharts**
- **Vite**
- **date-fns**
- **Lucide React**

---

## Quickstart

### Prerequisites
- Node.js 18+ and npm

### Setup
```bash
git clone https://github.com/Vjp802/tbi-symptom-tracker.git
cd tbi-symptom-tracker
npm install
npm run dev


npm run build
npm run preview
```

### Usage
Log symptoms

Select a symptom

Set severity (1–10)

Add notes (optional)

Click Record Entry

### View analytics

Toggle analytics from the header

Use date filters to focus on specific windows

### Export data

Click CSV or JSON

Share exports with your clinician as needed

### Clinical & Privacy Disclaimers

⚠️ Important

This tool is for symptom tracking only and is not a diagnostic tool or medical device.

It does not provide medical advice. Always consult qualified healthcare professionals.

This app is not intended for storing Protected Health Information (PHI) and is not a HIPAA-regulated system.

Data is stored locally on your device; export regularly if you want backups.

## Project Structure

```text
tbi-symptom-tracker/
├── src/
│   ├── components/
│   │   └── Analytics.tsx
│   ├── utils/
│   │   ├── storage.ts
│   │   └── export.ts
│   ├── types.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
├── package.json
└── vite.config.ts
```

### Contributing

Contributions welcome — please prioritize:

Data integrity

User privacy

Clinical usability

Accessibility

Open an issue with a bug/feature request.

### License
[License: MIT](LICENSE) • [MIT license text](https://choosealicense.com/licenses/mit/)

