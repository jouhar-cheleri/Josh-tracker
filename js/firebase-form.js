// ── firebase-form.js — Firebase initialization for form.html ──
// Imports Firebase ESM from CDN, exposes Firestore helpers as window globals
// so that classic (non-module) form.js scripts can use them.

import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js';
import { initializeAppCheck, ReCaptchaV3Provider } from 'https://www.gstatic.com/firebasejs/12.13.0/firebase-app-check.js';
import { getFirestore, collection, addDoc, query, where, getDocs, serverTimestamp, doc, getDoc } from 'https://www.gstatic.com/firebasejs/12.13.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyC3j82YlH0cRxdsQU-2z5IuovewUrjbDFo",
  authDomain: "josh-tracker.firebaseapp.com",
  projectId: "josh-tracker",
  storageBucket: "josh-tracker.firebasestorage.app",
  messagingSenderId: "583138221225",
  appId: "1:583138221225:web:99b36e54cd2cb7c2b99db8",
  measurementId: "G-CQC64VCF0D"
};

const app = initializeApp(firebaseConfig);
initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('6LfImeQsAAAAAKWeHjz7iHDTfDz7w15dj3pGpE6R'),
  isTokenAutoRefreshEnabled: true
});
const db = getFirestore(app);

// Expose as window globals for use by classic (non-module) scripts
window._db = db;
window._addDoc = addDoc;
window._collection = collection;
window._query = query;
window._where = where;
window._getDocs = getDocs;
window._serverTimestamp = serverTimestamp;

// Update UI
const badge = document.getElementById('fb-badge');
const bar = document.getElementById('fb-bar');
const barText = document.getElementById('fb-bar-text');
if (badge) { badge.textContent = '● Connected to database'; badge.style.background = 'rgba(74,222,128,0.2)'; }
if (bar) bar.className = 'fb-bar ok';
if (barText) barText.textContent = 'Loading curriculum…';

// Foundation batches/subjects are not in curriculum — always hardcoded
const _FOUNDATION_SUBJECTS = {
  "FB1": ["Foundation - English","Foundation - Maths","Foundation - Hindi"],
  "FB2": ["Foundation - English","Foundation - Maths","Foundation - Hindi"],
  "FB3": ["Foundation - English","Foundation - Maths","Foundation - Hindi"]
};
const _FOUNDATION_BATCHES = [
  { value: 'FB1', label: 'Foundation B1 (10th)' },
  { value: 'FB2', label: 'Foundation B2 (9th and 8th)' },
  { value: 'FB3', label: 'Foundation B3 (10th B2 and Remaining)' }
];
const _BATCH_LABELS = {
  '8B1':'8th Kerala Syllabus – B1', '9B1':'9th Kerala Syllabus – B1',
  '10B1':'10th Kerala Syllabus – B1', '10B2':'10th Kerala Syllabus – B2'
};

getDoc(doc(db, 'curriculum', 'main')).then(snap => {
  let parsed = null;
  if (snap.exists() && snap.data().json) {
    try { parsed = JSON.parse(snap.data().json); } catch(e) {}
  }

  if (parsed) {
    // Derive subjects and chapters from live Firestore curriculum
    const newSubjects = {};
    const newChapters = {};
    Object.keys(parsed).forEach(batch => {
      newSubjects[batch] = Object.keys(parsed[batch]);
      newChapters[batch] = {};
      Object.keys(parsed[batch]).forEach(subject => {
        newChapters[batch][subject] = parsed[batch][subject].chapters.map(ch => ch.name);
      });
    });
    Object.assign(newSubjects, _FOUNDATION_SUBJECTS);
    // Override the data.js globals
    window.SUBJECTS = newSubjects;
    window.CHAPTERS = newChapters;
  }

  // Rebuild batch dropdown from live data (or fall back to existing SUBJECTS keys)
  const keralaBatches = parsed ? Object.keys(parsed) : Object.keys(window.SUBJECTS).filter(k => !k.startsWith('F'));
  const batchSel = document.getElementById('f-batch');
  const currentVal = batchSel.value;
  batchSel.innerHTML = '<option value="">— Select batch —</option>';

  if (keralaBatches.length) {
    const og = document.createElement('optgroup');
    og.label = 'Kerala Syllabus';
    keralaBatches.forEach(key => {
      const o = document.createElement('option');
      o.value = key;
      o.textContent = _BATCH_LABELS[key] || key;
      og.appendChild(o);
    });
    batchSel.appendChild(og);
  }

  const fog = document.createElement('optgroup');
  fog.label = 'Foundation';
  _FOUNDATION_BATCHES.forEach(({ value, label }) => {
    const o = document.createElement('option');
    o.value = value; o.textContent = label;
    fog.appendChild(o);
  });
  batchSel.appendChild(fog);
  batchSel.disabled = false;

  // Restore any selection the user had made before curriculum loaded
  if (currentVal) {
    batchSel.value = currentVal;
    if (batchSel.value === currentVal) onBatchChange();
  }

  if (barText) barText.textContent = 'Connected — ready to submit';
}).catch(e => {
  console.warn('Curriculum load failed:', e);
  batchSel.innerHTML = '<option value="">Failed to load — refresh page</option>';
  if (barText) barText.textContent = 'Could not load curriculum — please refresh';
});
