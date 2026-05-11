// ── firebase.js — Firebase initialization for index.html (dashboard) ──
// This file is loaded as a classic module via type="module" in index.html.
// It imports Firebase ESM from CDN, initialises the app, and sets up
// the onSnapshot live listener that calls window._applyFirebaseSessions().

import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js';
import { initializeAppCheck, ReCaptchaV3Provider } from 'https://www.gstatic.com/firebasejs/12.13.0/firebase-app-check.js';
import { getFirestore, collection, onSnapshot, query, orderBy } from 'https://www.gstatic.com/firebasejs/12.13.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyC3j82YlH0cRxdsQU-2z5IuovewUrjbDFo",
  authDomain: "josh-tracker.firebaseapp.com",
  projectId: "josh-tracker",
  storageBucket: "josh-tracker.firebasestorage.app",
  messagingSenderId: "583138221225",
  appId: "1:583138221225:web:99b36e54cd2cb7c2b99db8"
};

const app = initializeApp(firebaseConfig);
initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('6LfImeQsAAAAAKWeHjz7iHDTfDz7w15dj3pGpE6R'),
  isTokenAutoRefreshEnabled: true
});
const db = getFirestore(app);

// Live listener — updates dashboard whenever a new session is submitted
const q = query(collection(db, 'sessions'), orderBy('submittedAt', 'desc'));
onSnapshot(q, (snapshot) => {
  const sessions = [];
  snapshot.forEach(doc => sessions.push({ id: doc.id, ...doc.data() }));
  window._applyFirebaseSessions(sessions);
}, (err) => {
  const el = document.getElementById('fb-sync-status');
  if (el) { el.textContent = '⚠ Firebase error: ' + err.message; el.style.color = '#dc2626'; }
});

document.getElementById('fb-sync-status').textContent = '● Live — syncing from Firebase';
document.getElementById('fb-sync-status').style.color = '#16a34a';
