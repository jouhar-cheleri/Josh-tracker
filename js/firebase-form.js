// ── firebase-form.js — Firebase initialization for form.html ──
// Imports Firebase ESM from CDN, exposes Firestore helpers as window globals
// so that classic (non-module) form.js scripts can use them.

import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js';
import { initializeAppCheck, ReCaptchaV3Provider } from 'https://www.gstatic.com/firebasejs/12.13.0/firebase-app-check.js';
import { getFirestore, collection, addDoc, query, where, getDocs, serverTimestamp } from 'https://www.gstatic.com/firebasejs/12.13.0/firebase-firestore.js';

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
if (barText) barText.textContent = 'Connected — ready to submit';
