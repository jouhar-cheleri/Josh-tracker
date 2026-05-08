# Josh Tracker — Project Briefing for Claude Code

## What this project is
A full-stack web app for **Josh Center for Excellence**, a coaching institute in Kozhikode, Kerala.
It tracks chapter-wise teaching progress across classes and calculates faculty salary hours.
Built as static HTML files hosted on GitHub Pages, with Firebase Firestore as the backend.

**Live URL:** https://jouhar-cheleri.github.io/Josh-tracker/
**GitHub repo:** https://github.com/jouhar-cheleri/Josh-tracker
**Firebase project:** josh-tracker (Firestore, Spark free plan)

---

## Files in this project

### `index.html` — HM Dashboard
- Shows teaching progress for all batches and subjects
- Pulls live from Firebase Firestore (`sessions` collection), auto-refreshes via `onSnapshot`
- Also uses `localStorage` as a manual fallback
- Hidden admin panel at `index.html#admin` — full curriculum data editor
- Salary Hours Report modal in admin panel — filters by date range and faculty, exports CSV

### `form.html` — Teacher Session Submission Form
- Teachers fill this after every class and submit to Firebase
- Branded with Josh logo and blue theme
- Validates required fields before submission
- Duplicate check on submit: blocks if same `date + batch + session` already exists in Firestore
- Shows existing entry details if duplicate found — hard block, no bypass

---

## Batches tracked

### Kerala Syllabus (full chapter tracking + hours)
| Key | Label |
|-----|-------|
| `8B1` | 8th Kerala Syllabus – B1 |
| `9B1` | 9th Kerala Syllabus – B1 |
| `10B1` | 10th Kerala Syllabus – B1 |
| `10B2` | 10th Kerala Syllabus – B2 |

### Foundation (salary tracking only — no chapter tracking)
| Key | Label |
|-----|-------|
| `FB1` | Foundation B1 (10th) |
| `FB2` | Foundation B2 (9th and 8th) |
| `FB3` | Foundation B3 (10th B2 and Remaining) |

---

## Firebase structure

### Collection: `sessions`
Each document = one teacher session submission.

| Field | Type | Notes |
|-------|------|-------|
| `date` | string | YYYY-MM-DD |
| `faculty` | string | Teacher name |
| `batch` | string | e.g. `10B1`, `FB2` |
| `batchType` | string | `kerala` or `foundation` |
| `session` | string | `Session 1` to `Session 4` |
| `hours` | number | Hours for this session (1, 1.5, 2, 2.5) |
| `subject` | string | e.g. `Physics`, `English` |
| `chapter` | string | Chapter name (null for Foundation) |
| `chapterStatus` | string | `in_progress` or `completed` (null for Foundation) |
| `description` | string | Free text notes |
| `submittedAt` | timestamp | Firestore serverTimestamp |

**Primary key constraint (enforced in form):** `date + batch + session` must be unique.

### Firestore rules (current — test mode, to be tightened later)
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /sessions/{doc} {
      allow write: if true;
      allow read: if true;
    }
  }
}
```

---

## Progress calculation logic

```
chapter progress % = (sum of hours from all sessions for that chapter) / planned hours × 100
```

- **No cap** — can exceed 100% if extra classes are taken
- Only Kerala batches contribute to chapter progress
- Foundation hours go to salary data only
- `planned hours` is stored in `DATA[batch][subject].chapters[i].planned` — editable via admin panel
- `actual hours` = sum of `s.hours` from all Firebase sessions matching `batch + subject + chapter`

---

## Key data structure in index.html

```javascript
DATA = {
  "8B1": {
    "English": {
      chapters: [
        { name: "A Long Walk With Granny", month: "June", planned: 16 },
        // planned = hours (not periods)
        ...
      ]
    },
    "Mathematics": { chapters: [...] },
    "Basic Science": { chapters: [...] },
    "Social Science": { chapters: [...] }
  },
  "9B1": {
    "English": { chapters: [...] },
    "Mathematics": { chapters: [...] },
    "Physics": { chapters: [...] },
    "Chemistry": { chapters: [...] },
    "Biology": { chapters: [...] },
    "Social Science I": { chapters: [...] },
    "Social Science II": { chapters: [...] }
  },
  "10B1": { /* same subjects as 9B1 */ },
  "10B2": { /* same curriculum as 10B1, tracked separately */ }
}
```

Progress state stored in `localStorage`:
```javascript
progress = {
  "10B1__Physics__0": { used: 4.5, remark: "Completed numericals" },
  // key = batch__subject__chapterIndex
}
```

---

## Faculty list (current)
Nabeela, Aneesa, Rini, Shaharban, Drishya, Rizwana, Rajina, Rasna, Theertha

---

## Brand identity
- **Primary blue:** `#2B7FE0`
- **Dark blue:** `#1a5fc4`
- **Light blue:** `#EBF3FD`
- **Grey text:** `#4a4a4a`
- **Font:** DM Sans (body), DM Serif Display (headings)
- Logo is embedded as base64 PNG in both HTML files

---

## Known issues / pending improvements
1. **Social Science planned hours** for classes 8, 9, 10 are set to `0` — need correct values filled in admin panel
2. **Firestore security rules** need tightening before going fully public:
   - Teachers should only be able to write (not read)
   - HM should authenticate to read all data
3. **Salary report** in admin panel currently only shows totals — no per-day breakdown yet
4. **Foundation subjects** in form are hardcoded as English/Maths/Hindi — may need updating
5. **localStorage vs Firebase merge** — currently takes the higher value; edge cases possible if same chapter is manually edited and also submitted via form

---

## Design decisions made (don't reverse without reason)
- **Hours not periods** — progress is calculated in hours, not period counts. Planned hours stored in curriculum data.
- **No period count in form** — removed to simplify teacher input. Hours alone drive progress.
- **Hard duplicate block** — duplicate `date+batch+session` is fully blocked, no override option.
- **Foundation = salary only** — Foundation batches show no chapter tracking UI anywhere.
- **No cap at 100%** — progress can exceed 100% to reflect extra classes taken.
- **Admin at #admin hash** — editor is hidden from navigation, accessed by typing `#admin` in URL.
- **Data persists in localStorage** — Firebase syncs in, manual edits also possible in dashboard.

---

## How to run locally
```bash
# Clone repo
git clone https://github.com/jouhar-cheleri/Josh-tracker
cd Josh-tracker

# Open in browser directly (no build step needed)
open index.html        # macOS
start index.html       # Windows
xdg-open index.html    # Linux

# Or use a local server (recommended to avoid CORS issues with Firebase)
npx serve .
# then open http://localhost:3000
```

## How to deploy
```bash
git add .
git commit -m "your change description"
git push origin main
# GitHub Pages auto-deploys in ~30 seconds
```

---

## Firebase config (already embedded in both HTML files)
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC3j82YlH0cRxdsQU-2z5IuovewUrjbDFo",
  authDomain: "josh-tracker.firebaseapp.com",
  projectId: "josh-tracker",
  storageBucket: "josh-tracker.firebasestorage.app",
  messagingSenderId: "583138221225",
  appId: "1:583138221225:web:99b36e54cd2cb7c2b99db8",
  measurementId: "G-CQC64VCF0D"
};
```
SDK version: `12.13.0`

---

*This file was generated from a Claude.ai chat session where the entire app was designed and built. Use it as the source of truth when continuing development in Claude Code or any editor.*
