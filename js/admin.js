// ── admin.js — admin panel CRUD functions for index.html ──
// Depends on: data.js, dashboard.js (DATA, progress, saveAll, showToast, renderDash)

let adminClass = "8B1", adminSubject = null, adminData = null;

function goToAdmin() {
  adminData = JSON.parse(JSON.stringify(DATA));
  adminClass = "8B1"; adminSubject = null;
  document.getElementById('page-dash').classList.remove('active');
  document.getElementById('page-admin').classList.add('active');
  renderAdminClassTabs(); renderAdminSubjTabs(); renderAdminContent();
}
function goToDash() {
  document.getElementById('page-admin').classList.remove('active');
  document.getElementById('page-dash').classList.add('active');
  renderDash();
}
function renderAdminClassTabs() {
  document.getElementById('admin-class-tabs').innerHTML =
    ['8B1', '9B1', '10B1', '10B2'].map(c =>
      `<button class="admin-tab${adminClass === c ? ' active' : ''}" onclick="switchAdminClass('${c}')">Class ${c.replace('B1', '-B1').replace('B2', '-B2')}</button>`
    ).join('');
}
function switchAdminClass(cls) {
  adminClass = cls; adminSubject = null;
  renderAdminClassTabs(); renderAdminSubjTabs(); renderAdminContent();
}
function renderAdminSubjTabs() {
  const ss = Object.keys(adminData[adminClass] || {});
  if (!adminSubject && ss.length) adminSubject = ss[0];
  document.getElementById('admin-subj-tabs').innerHTML =
    ss.map(s => `<button class="admin-subj-tab${adminSubject === s ? ' active' : ''}" onclick="switchAdminSubj('${s.replace(/'/g, "\\'")}');return false;">${s}</button>`).join('') +
    `<button class="admin-subj-tab" onclick="showAddSubjForm()" style="border-style:dashed">+ Add subject</button>`;
}
function switchAdminSubj(s) { adminSubject = s; renderAdminSubjTabs(); renderAdminContent(); }
function escHtml(s) { return (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function renderAdminContent() {
  const area = document.getElementById('admin-content');
  if (!adminSubject || !adminData[adminClass] || !adminData[adminClass][adminSubject]) {
    area.innerHTML = `<div class="no-sel">Select or add a subject to edit its chapters.</div>`; return;
  }
  const chs = adminData[adminClass][adminSubject].chapters;
  const skey = adminSubject.replace(/'/g, "\\'");
  let rows = chs.map((ch, i) => `
    <div class="ch-edit-row">
      <input type="text" value="${escHtml(ch.name)}" onchange="adminData['${adminClass}']['${skey}'].chapters[${i}].name=this.value" placeholder="Chapter name">
      <input type="text" value="${escHtml(ch.month)}" onchange="adminData['${adminClass}']['${skey}'].chapters[${i}].month=this.value" placeholder="Month">
      <input type="number" value="${ch.planned}" min="0" step="0.5" onchange="adminData['${adminClass}']['${skey}'].chapters[${i}].planned=parseFloat(this.value)||0" placeholder="Hours">
      <button class="btn-sm danger" onclick="deleteChapter(${i})">Delete</button>
      <button class="del-btn" title="Move up" onclick="moveChapter(${i},-1)">↑</button>
    </div>`).join('');
  area.innerHTML = `<div class="admin-card">
    <div class="admin-card-head">
      <input type="text" value="${escHtml(adminSubject)}" onchange="renameSubject(this.value)" placeholder="Subject name">
      <div class="admin-subj-actions"><button class="btn-sm danger" onclick="deleteSubject()">Delete subject</button></div>
    </div>
    <div class="ch-edit-head">
      <div class="col-h">Chapter name</div><div class="col-h">Month</div>
      <div class="col-h">Planned hours</div><div class="col-h"></div><div class="col-h"></div>
    </div>
    ${rows}
    <div class="add-ch-row"><button class="btn-sm primary" onclick="addChapter()">+ Add chapter</button></div>
  </div>`;
}
function renameSubject(newName) {
  if (!newName.trim() || newName === adminSubject) return;
  const entries = Object.entries(adminData[adminClass]);
  const rebuilt = {};
  entries.forEach(([k, v]) => { rebuilt[k === adminSubject ? newName : k] = v; });
  adminData[adminClass] = rebuilt; adminSubject = newName;
  renderAdminSubjTabs();
}
function deleteSubject() {
  if (!confirm('Delete subject "' + adminSubject + '" from Class ' + adminClass.replace('B1', '-B1').replace('B2', '-B2') + '?')) return;
  delete adminData[adminClass][adminSubject];
  const ss = Object.keys(adminData[adminClass]); adminSubject = ss[0] || null;
  renderAdminSubjTabs(); renderAdminContent();
}
function deleteChapter(idx) {
  if (!confirm('Delete this chapter?')) return;
  adminData[adminClass][adminSubject].chapters.splice(idx, 1); renderAdminContent();
}
function moveChapter(idx, dir) {
  const chs = adminData[adminClass][adminSubject].chapters, ni = idx + dir;
  if (ni < 0 || ni >= chs.length) return;
  [chs[idx], chs[ni]] = [chs[ni], chs[idx]]; renderAdminContent();
}
function addChapter() {
  adminData[adminClass][adminSubject].chapters.push({ name: 'New chapter', month: '', planned: 0 });
  renderAdminContent();
}
function showAddSubjForm() {
  document.getElementById('admin-content').innerHTML = `<div class="add-subj-form">
    <h3>Add new subject to Class ${adminClass.replace('B1', '-B1').replace('B2', '-B2')}</h3>
    <div class="form-row">
      <input type="text" id="new-subj-name" placeholder="Subject name (e.g. Hindi)">
      <button class="btn-sm primary" onclick="addSubject()">Add subject</button>
      <button class="btn-sm" onclick="renderAdminContent()">Cancel</button>
    </div></div>`;
}
function addSubject() {
  const name = document.getElementById('new-subj-name').value.trim();
  if (!name) return;
  if (adminData[adminClass][name]) { alert('Subject already exists.'); return; }
  adminData[adminClass][name] = { chapters: [] }; adminSubject = name;
  renderAdminSubjTabs(); renderAdminContent();
}
function saveAdminChanges() {
  DATA = JSON.parse(JSON.stringify(adminData));
  saveAll();
  if (window._saveCurriculum) {
    window._saveCurriculum(DATA).then(() => showToast('Saved to cloud ✓')).catch(() => showToast('Saved locally ✓'));
  } else {
    showToast('All changes saved ✓');
  }
  renderDash();
}
function exportData() {
  const blob = new Blob([JSON.stringify({ curriculum: DATA, progress: progress }, null, 2)], { type: 'application/json' });
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
  a.download = 'josh-tracker-backup-' + new Date().toISOString().slice(0, 10) + '.json'; a.click();
}
function importData() {
  const input = document.createElement('input'); input.type = 'file'; input.accept = '.json';
  input.onchange = e => {
    const file = e.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      try {
        const parsed = JSON.parse(ev.target.result);
        if (parsed.curriculum) DATA = parsed.curriculum;
        if (parsed.progress) progress = parsed.progress;
        adminData = JSON.parse(JSON.stringify(DATA));
        saveAll();
        if (window._saveCurriculum) window._saveCurriculum(DATA);
        renderAdminSubjTabs(); renderAdminContent(); renderDash();
        showToast('Data imported ✓');
      } catch(e) { alert('Invalid JSON file.'); }
    }; reader.readAsText(file);
  }; input.click();
}
function resetProgress() {
  if (!confirm('Reset ALL period counts and remarks? Curriculum data will not be changed.')) return;
  progress = {}; saveAll(); renderDash(); showToast('Progress reset ✓');
}
