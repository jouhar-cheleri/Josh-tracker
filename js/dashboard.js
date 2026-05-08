// ── dashboard.js — render/display/progress functions for index.html ──
// Depends on: data.js (DEFAULT_DATA, subjIcon)
// All globals stay as window globals.

var DATA = JSON.parse(JSON.stringify(DEFAULT_DATA));
var progress = {};
var _allSessions = [];
var activeClass = "8B1", activeSubject = null;
var SK_DATA = 'josh_tracker_data_v2', SK_PROG = 'josh_tracker_prog_v2';

function loadAll() {
  try { const d = localStorage.getItem(SK_DATA); if (d) DATA = JSON.parse(d); } catch(e) {}
  try { const p = localStorage.getItem(SK_PROG); if (p) progress = JSON.parse(p); } catch(e) {}
}
function saveAll() {
  try { localStorage.setItem(SK_DATA, JSON.stringify(DATA)); } catch(e) {}
  try { localStorage.setItem(SK_PROG, JSON.stringify(progress)); } catch(e) {}
}
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg || 'Saved ✓'; t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2200);
}
function progKey(c, s, i) { return c + '__' + s + '__' + i; }
function getUsed(c, s, i) { const k = progKey(c, s, i); return progress[k] ? progress[k].used || 0 : 0; }
function getRemark(c, s, i) { const k = progKey(c, s, i); return progress[k] ? progress[k].remark || '' : ''; }
function barColor(p) { return p >= 80 ? '#16a34a' : p >= 40 ? '#d97706' : '#2B7FE0'; }
function calcSubjPct(c, s) {
  const chs = DATA[c][s].chapters; let tp = 0, tu = 0;
  chs.forEach((ch, i) => { tp += ch.planned || 0; tu += getUsed(c, s, i); });
  return tp > 0 ? Math.round((tu / tp) * 100) : 0;
}
function calcClassPct(c) {
  const ss = Object.keys(DATA[c]);
  if (!ss.length) return 0;
  return Math.round(ss.reduce((a, s) => a + calcSubjPct(c, s), 0) / ss.length);
}

function switchClass(cls, btn) {
  activeClass = cls; activeSubject = null;
  document.querySelectorAll('.class-tab').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderDash();
}
function renderDash() { renderHero(); renderSummary(); renderSubjects(); renderChapters(); }

function renderHero() {
  const pct = calcClassPct(activeClass);
  document.getElementById('hero-title').textContent = 'Class ' + activeClass.replace('B1', '-B1').replace('B2', '-B2') + ' — Progress Overview';
  document.getElementById('hero-badge').textContent = pct + '% overall complete';
}

function renderSummary() {
  const c = activeClass, ss = Object.keys(DATA[c] || {});
  const pct = calcClassPct(c);
  const done = ss.filter(s => calcSubjPct(c, s) === 100).length;
  const totalCh = ss.reduce((a, s) => a + DATA[c][s].chapters.length, 0);
  const doneCh = ss.reduce((a, s) => a + DATA[c][s].chapters.filter((ch, i) => {
    const u = getUsed(c, s, i); return ch.planned > 0 ? u >= ch.planned : u > 0;
  }).length, 0);
  document.getElementById('summary-row').innerHTML = `
    <div class="sum-card">
      <div class="sum-label">Overall progress</div>
      <div class="sum-val">${pct}%</div>
      <div class="sum-prog"><div class="sum-prog-fill" style="width:${pct}%;background:${barColor(pct)}"></div></div>
    </div>
    <div class="sum-card">
      <div class="sum-label">Subjects complete</div>
      <div class="sum-val">${done}<span style="font-size:16px;font-weight:600;color:var(--text2)"> / ${ss.length}</span></div>
      <div class="sum-sub">subjects fully covered</div>
    </div>
    <div class="sum-card">
      <div class="sum-label">Chapters done</div>
      <div class="sum-val">${doneCh}<span style="font-size:16px;font-weight:600;color:var(--text2)"> / ${totalCh}</span></div>
      <div class="sum-sub">chapters completed</div>
    </div>
    <div class="sum-card">
      <div class="sum-label">Still remaining</div>
      <div class="sum-val">${totalCh - doneCh}</div>
      <div class="sum-sub">chapters remaining</div>
    </div>`;
}

function renderSubjects() {
  const c = activeClass, ss = Object.keys(DATA[c] || {});
  document.getElementById('subj-grid').innerHTML = ss.map(s => {
    const pct = calcSubjPct(c, s), col = barColor(pct);
    return `<div class="subj-card${activeSubject === s ? ' active' : ''}" onclick="selectSubject('${s.replace(/'/g, "\\'")}')">
      <div class="subj-icon">${subjIcon(s)}</div>
      <div class="subj-name">${s}</div>
      <div class="subj-meta">${DATA[c][s].chapters.length} chapters</div>
      <div class="prog-bar"><div class="prog-fill" style="width:${pct}%;background:${col}"></div></div>
      <div class="prog-pct">${pct}% complete</div>
    </div>`;
  }).join('');
}

function selectSubject(s) { activeSubject = s; renderSubjects(); renderChapters(); }

function renderChapters() {
  const area = document.getElementById('ch-area');
  if (!activeSubject) {
    area.innerHTML = `<div class="no-sel"><div class="no-sel-icon">👆</div>Select a subject above to view and update chapter progress</div>`;
    return;
  }
  const chs = DATA[activeClass][activeSubject].chapters;
  let rows = '';
  chs.forEach((ch, i) => {
    const used = getUsed(activeClass, activeSubject, i);
    const planned = ch.planned || 0;
    const pct = planned > 0 ? Math.round((used / planned) * 100) : (used > 0 ? 100 : 0);
    const col = barColor(pct);
    const rem = getRemark(activeClass, activeSubject, i);
    rows += `<div>
      <div class="ch-row">
        <div class="ch-num">${i + 1}</div>
        <div class="ch-name">${ch.name}</div>
        <div class="ch-month">${ch.month}</div>
        <div class="ch-planned">${planned > 0 ? planned : '—'}</div>
        <div class="ch-used-wrap"><input type="number" min="0" max="${planned > 0 ? planned * 3 : 999}" value="${used}" id="used-${i}" step="0.5" onchange="updateUsed(${i},this.value)"></div>
        <div class="ch-prog-wrap">
          <div class="ch-prog-bar"><div class="ch-prog-fill" id="pb-${i}" style="width:${pct}%;background:${col}"></div></div>
          <div class="ch-pct" id="pp-${i}">${pct}%</div>
        </div>
        <button class="save-btn" id="sb-${i}" onclick="saveRow(${i})" title="Save">💾</button>
      </div>
      <div class="remark-row">
        <textarea rows="1" placeholder="Add a remark or note…" id="rem-${i}" onchange="updateRemark(${i},this.value)">${rem}</textarea>
      </div>
    </div>`;
  });
  area.innerHTML = `<div class="chapter-panel">
    <div class="panel-head">
      <h2>${subjIcon(activeSubject)} ${activeSubject}</h2>
      <div class="panel-head-sub">Class ${activeClass.replace('B1', '-B1').replace('B2', '-B2')} &mdash; ${chs.length} chapters</div>
    </div>
    <div class="col-head">
      <div class="col-h c">#</div>
      <div class="col-h">Chapter</div>
      <div class="col-h">Month</div>
      <div class="col-h c">Planned hrs</div>
      <div class="col-h c">Actual hrs</div>
      <div class="col-h">Progress</div>
      <div class="col-h"></div>
    </div>${rows}</div>`;
}

function updateUsed(idx, val) {
  const k = progKey(activeClass, activeSubject, idx);
  if (!progress[k]) progress[k] = {};
  progress[k].used = Math.max(0, parseFloat(val) || 0);
  const ch = DATA[activeClass][activeSubject].chapters[idx];
  const planned = ch.planned || 0, used = progress[k].used;
  const pct = planned > 0 ? Math.round((used / planned) * 100) : (used > 0 ? 100 : 0);
  const col = barColor(pct);
  const pb = document.getElementById('pb-' + idx), pp = document.getElementById('pp-' + idx);
  if (pb) { pb.style.width = pct + '%'; pb.style.background = col; }
  if (pp) pp.textContent = pct + '%';
}
function updateRemark(idx, val) {
  const k = progKey(activeClass, activeSubject, idx);
  if (!progress[k]) progress[k] = {};
  progress[k].remark = val;
}
function saveRow(idx) {
  saveAll(); renderSubjects(); renderSummary(); renderHero();
  const sb = document.getElementById('sb-' + idx);
  if (sb) { sb.textContent = '✓'; sb.classList.add('ok'); setTimeout(() => { sb.textContent = '💾'; sb.classList.remove('ok'); }, 1600); }
}

// ── FIREBASE LIVE SYNC ────────────────────────────────────────────
window._applyFirebaseSessions = function(sessions) {
  _allSessions = sessions; // store globally for salary report
  const fbProgress = {};

  sessions.forEach(s => {
    if (s.batchType !== 'kerala') return;
    const batch = s.batch;
    const subject = s.subject;
    const chapter = s.chapter;
    const hours = parseFloat(s.hours) || 0;
    if (!batch || !subject || !chapter || !hours) return;

    if (!DATA[batch] || !DATA[batch][subject]) return;
    const chs = DATA[batch][subject].chapters;
    const idx = chs.findIndex(c => c.name === chapter || chapter.includes(c.name) || c.name.includes(chapter));
    if (idx === -1) return;

    const k = progKey(batch, subject, idx);
    if (!fbProgress[k]) fbProgress[k] = { used: 0, remark: '', status: '' };
    fbProgress[k].used += hours;
    if (s.chapterStatus === 'completed') fbProgress[k].status = 'completed';
    if (s.description) fbProgress[k].remark = s.description;
  });

  Object.entries(fbProgress).forEach(([k, v]) => {
    if (!progress[k]) progress[k] = {};
    progress[k].used = Math.max(parseFloat(progress[k].used) || 0, v.used);
    if (v.remark && !progress[k].remark) progress[k].remark = v.remark;
  });

  saveAll();
  renderDash();

  const el = document.getElementById('fb-sync-status');
  if (el) {
    const keralaSessions = sessions.filter(s => s.batchType === 'kerala').length;
    el.textContent = `● Live · ${keralaSessions} sessions synced`;
    el.style.color = '#16a34a';
  }
};

function checkRoute() {
  if (window.location.hash === '#admin') goToAdmin();
  else {
    document.getElementById('page-dash').classList.add('active');
    document.getElementById('page-admin').classList.remove('active');
  }
}
window.addEventListener('hashchange', checkRoute);
