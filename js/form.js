// ── form.js — form handlers, validation, duplicate check, submit for form.html ──
// SUBJECTS and CHAPTERS are populated from Firebase by firebase-form.js
// Firebase globals (window._db, window._addDoc, etc.) are set by firebase-form.js

var SUBJECTS = {};
var CHAPTERS = {};

// ── STATE ──
let selHours = null;
let selStatus = null;
let isFoundation = false;

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  const t = new Date();
  document.getElementById('f-date').value =
    `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, '0')}-${String(t.getDate()).padStart(2, '0')}`;
});

// ── BATCH CHANGE ──
function onBatchChange() {
  const batch = document.getElementById('f-batch').value;
  isFoundation = batch.startsWith('F');
  document.getElementById('foundation-notice').style.display = isFoundation ? 'block' : 'none';
  document.getElementById('chapter-section').style.display = isFoundation ? 'none' : 'block';
  const sub = document.getElementById('f-subject');
  sub.innerHTML = '<option value="">— Select subject —</option>';
  document.getElementById('f-chapter').innerHTML = '<option value="">— Select subject first —</option>';
  if (batch && SUBJECTS[batch]) {
    SUBJECTS[batch].forEach(s => {
      const o = document.createElement('option'); o.value = s; o.textContent = s; sub.appendChild(o);
    });
  }
  clearErr('f-batch', 'err-batch');
  dismissDupWarning();
}

function onSubjectChange() {
  const batch = document.getElementById('f-batch').value;
  const subject = document.getElementById('f-subject').value;
  const ch = document.getElementById('f-chapter');
  ch.innerHTML = '<option value="">— Select chapter —</option>';
  if (batch && subject && CHAPTERS[batch] && CHAPTERS[batch][subject]) {
    CHAPTERS[batch][subject].forEach((c, i) => {
      const o = document.createElement('option');
      o.value = c; o.textContent = `Ch ${i + 1}: ${c}`; ch.appendChild(o);
    });
  }
  clearErr('f-subject', 'err-subject');
}

// ── SELECTIONS ──
function selectPillGroup(name, label) {
  document.querySelectorAll(`input[name="${name}"]`).forEach(r => {
    r.closest('.pill').classList.toggle('active', r.closest('.pill') === label);
  });
  const radio = label.querySelector('input');
  if (radio) radio.checked = true;
  if (name === 'session') clearErr(null, 'err-session');
}

function selectHour(val, card) {
  selHours = val;
  document.querySelectorAll('.hour-card').forEach(c => c.classList.remove('active'));
  card.classList.add('active');
  document.getElementById('f-hours').value = val;
  clearErr(null, 'err-hours');
}

function selectStatus(val) {
  selStatus = val;
  document.getElementById('f-status').value = val;
  document.getElementById('sc-progress').className = 'status-card' + (val === 'in_progress' ? ' active-progress' : '');
  document.getElementById('sc-complete').className = 'status-card' + (val === 'completed' ? ' active-complete' : '');
  clearErr(null, 'err-status');
}

// ── VALIDATION ──
function clearErr(fieldId, errId) {
  if (fieldId) document.getElementById(fieldId)?.classList.remove('field-err');
  if (errId) { const e = document.getElementById(errId); if (e) e.classList.remove('show'); }
}

function showErr(fieldId, errId) {
  if (fieldId) document.getElementById(fieldId)?.classList.add('field-err');
  if (errId) { const e = document.getElementById(errId); if (e) e.classList.add('show'); }
}

function validateAll() {
  let ok = true;
  if (!document.getElementById('f-date').value) { showErr('f-date', 'err-date'); ok = false; }
  else clearErr('f-date', 'err-date');
  if (!document.getElementById('f-name').value) { showErr('f-name', 'err-name'); ok = false; }
  else clearErr('f-name', 'err-name');
  if (!document.getElementById('f-batch').value) { showErr('f-batch', 'err-batch'); ok = false; }
  else clearErr('f-batch', 'err-batch');
  if (!document.querySelector('input[name="session"]:checked')) { showErr(null, 'err-session'); ok = false; }
  else clearErr(null, 'err-session');
  if (!selHours) { showErr(null, 'err-hours'); ok = false; }
  else clearErr(null, 'err-hours');
  if (!isFoundation) {
    if (!document.getElementById('f-subject').value) { showErr('f-subject', 'err-subject'); ok = false; }
    else clearErr('f-subject', 'err-subject');
    if (!document.getElementById('f-chapter').value) { showErr('f-chapter', 'err-chapter'); ok = false; }
    else clearErr('f-chapter', 'err-chapter');
    if (!selStatus) { showErr(null, 'err-status'); ok = false; }
    else clearErr(null, 'err-status');
  }
  if (!document.getElementById('f-desc').value.trim()) { showErr('f-desc', 'err-desc'); ok = false; }
  else clearErr('f-desc', 'err-desc');
  return ok;
}

// ── DUPLICATE CHECK ──
async function checkDuplicate(date, batch, session) {
  if (!window._db) return null;
  try {
    const q = window._query(
      window._collection(window._db, 'sessions'),
      window._where('date', '==', date),
      window._where('batch', '==', batch),
      window._where('session', '==', session)
    );
    const snap = await window._getDocs(q);
    if (snap.empty) return null;
    const existing = snap.docs[0].data();
    return existing;
  } catch(e) {
    console.warn('Duplicate check failed:', e);
    return null;
  }
}

function showDupWarning(existing) {
  const el = document.getElementById('dup-existing');
  el.innerHTML = `<b>Existing entry found:</b>
    Faculty: ${existing.faculty || '—'}<br>
    Subject: ${existing.subject || '—'}<br>
    Chapter: ${existing.chapter || '—'}<br>
    Hours: ${existing.hours || '—'} &nbsp;|&nbsp; Periods: ${existing.periods || '—'}<br>
    Description: ${existing.description || '—'}`;
  document.getElementById('dup-warning').classList.add('show');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function dismissDupWarning() {
  document.getElementById('dup-warning').classList.remove('show');
}

// ── SUBMIT FLOW ──
async function handleSubmit() {
  if (!validateAll()) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  const btn = document.getElementById('submit-btn');
  btn.disabled = true;
  btn.textContent = 'Checking…';

  const date = document.getElementById('f-date').value;
  const batch = document.getElementById('f-batch').value;
  const session = document.querySelector('input[name="session"]:checked').value;
  const data = {
    date, batch, session,
    faculty: document.getElementById('f-name').value,
    batchType: isFoundation ? 'foundation' : 'kerala',
    hours: parseFloat(selHours),
    subject: document.getElementById('f-subject').value || '',
    chapter: isFoundation ? null : document.getElementById('f-chapter').value,
    chapterStatus: isFoundation ? null : selStatus,
    description: document.getElementById('f-desc').value.trim(),
    submittedAt: null
  };

  const existing = await checkDuplicate(date, batch, session);
  if (existing) {
    btn.disabled = false;
    btn.textContent = 'Submit Session';
    showDupWarning(existing);
    return;
  }

  await doSubmit(data);
}

async function doSubmit(data) {
  const btn = document.getElementById('submit-btn');
  btn.disabled = true;
  btn.textContent = 'Saving…';

  const errEl = document.getElementById('global-err');
  errEl.classList.remove('show');

  try {
    data.submittedAt = window._serverTimestamp ? window._serverTimestamp() : new Date().toISOString();
    if (!window._db) throw new Error('Firebase not connected. Please refresh and try again.');
    await window._addDoc(window._collection(window._db, 'sessions'), data);
    showSuccess(data);
  } catch(e) {
    btn.disabled = false;
    btn.textContent = 'Submit Session';
    errEl.textContent = '❌ ' + e.message;
    errEl.classList.add('show');
  }
}

// ── SUCCESS ──
function showSuccess(data) {
  document.getElementById('form-body').style.display = 'none';
  document.getElementById('success-card').style.display = 'block';
  const isF = data.batchType === 'foundation';
  document.getElementById('suc-msg').textContent = isF
    ? `Foundation session recorded for ${data.batch}. Thank you, ${data.faculty}!`
    : `Chapter progress saved for ${data.batch}. Thank you, ${data.faculty}!`;
  document.getElementById('suc-detail').innerHTML = `
    📅 Date: ${data.date}<br>
    🏫 Batch: ${data.batch} &nbsp;|&nbsp; ${data.session}<br>
    ⏱ Hours: ${data.hours}h${!isF ? `<br>📖 ${data.subject} — ${data.chapter}<br>📊 ${data.chapterStatus === 'completed' ? '✅ Chapter completed' : '📖 In Progress'}` : ''}`;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── RESET ──
function resetForm() {
  document.getElementById('form-body').style.display = 'block';
  document.getElementById('success-card').style.display = 'none';
  document.getElementById('f-name').value = '';
  document.getElementById('f-batch').value = '';
  document.getElementById('f-subject').innerHTML = '<option value="">— Select batch first —</option>';
  document.getElementById('f-chapter').innerHTML = '<option value="">— Select subject first —</option>';
  document.getElementById('f-desc').value = '';
  document.querySelectorAll('input[type="radio"]').forEach(r => { r.checked = false; });
  document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.hour-card').forEach(c => c.classList.remove('active'));
  document.getElementById('sc-progress').className = 'status-card';
  document.getElementById('sc-complete').className = 'status-card';
  document.getElementById('foundation-notice').style.display = 'none';
  document.getElementById('chapter-section').style.display = 'block';
  document.getElementById('dup-warning').classList.remove('show');
  document.getElementById('global-err').classList.remove('show');
  document.getElementById('submit-btn').disabled = false;
  document.getElementById('submit-btn').textContent = 'Submit Session';
  selHours = null; selStatus = null; isFoundation = false;
  const t = new Date();
  document.getElementById('f-date').value =
    `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, '0')}-${String(t.getDate()).padStart(2, '0')}`;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
