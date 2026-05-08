// ── salary.js — salary report and CSV export for index.html ──
// Depends on: dashboard.js (_allSessions global set by _applyFirebaseSessions)
// _allSessions is declared and managed in dashboard.js via window._applyFirebaseSessions.

function openSalaryReport() {
  document.getElementById('salary-modal').style.display = 'block';
  const today = new Date();
  const firstOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  document.getElementById('sal-from').value = firstOfMonth.toISOString().slice(0, 10);
  document.getElementById('sal-to').value = today.toISOString().slice(0, 10);

  const faculties = [...new Set(_allSessions.map(s => s.faculty).filter(Boolean))].sort();
  const sel = document.getElementById('sal-faculty');
  sel.innerHTML = '<option value="">All Faculty</option>';
  faculties.forEach(f => { const o = document.createElement('option'); o.value = f; o.textContent = f; sel.appendChild(o); });

  buildSalaryReport();
}

function closeSalaryModal() {
  document.getElementById('salary-modal').style.display = 'none';
}

function clearSalaryFilters() {
  document.getElementById('sal-from').value = '';
  document.getElementById('sal-to').value = '';
  document.getElementById('sal-faculty').value = '';
  buildSalaryReport();
}

function getFilteredSessions() {
  const from = document.getElementById('sal-from').value;
  const to = document.getElementById('sal-to').value;
  const faculty = document.getElementById('sal-faculty').value;
  return _allSessions.filter(s => {
    if (from && s.date < from) return false;
    if (to && s.date > to) return false;
    if (faculty && s.faculty !== faculty) return false;
    return true;
  });
}

function buildSalaryReport() {
  const sessions = getFilteredSessions();
  const from = document.getElementById('sal-from').value;
  const to = document.getElementById('sal-to').value;

  const label = from && to ? `${from} to ${to}` : from ? `From ${from}` : to ? `Until ${to}` : 'All sessions';
  document.getElementById('salary-period-label').textContent = label + ` · ${sessions.length} sessions`;

  if (!sessions.length) {
    document.getElementById('salary-content').innerHTML = '<div style="text-align:center;padding:2rem;color:#9ca3af">No sessions found for the selected filters.</div>';
    document.getElementById('salary-summary').innerHTML = '';
    return;
  }

  const byFaculty = {};
  sessions.forEach(s => {
    const f = s.faculty || 'Unknown';
    if (!byFaculty[f]) byFaculty[f] = { name: f, totalHours: 0, sessions: 0, byBatch: {} };
    byFaculty[f].totalHours += parseFloat(s.hours) || 0;
    byFaculty[f].sessions++;
    const batch = s.batch || 'Unknown';
    if (!byFaculty[f].byBatch[batch]) byFaculty[f].byBatch[batch] = 0;
    byFaculty[f].byBatch[batch] += parseFloat(s.hours) || 0;
  });

  const totalHours = Object.values(byFaculty).reduce((a, f) => a + f.totalHours, 0);
  const totalSessions = sessions.length;
  const facCount = Object.keys(byFaculty).length;
  document.getElementById('salary-summary').innerHTML = `
    <div style="background:#fff;border:1px solid #e5e7eb;border-radius:10px;padding:0.875rem 1rem">
      <div style="font-size:11px;font-weight:600;color:#9ca3af;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:4px">Total hours</div>
      <div style="font-size:24px;font-weight:700;color:#1e1e1e">${totalHours.toFixed(1)}</div>
    </div>
    <div style="background:#fff;border:1px solid #e5e7eb;border-radius:10px;padding:0.875rem 1rem">
      <div style="font-size:11px;font-weight:600;color:#9ca3af;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:4px">Total sessions</div>
      <div style="font-size:24px;font-weight:700;color:#1e1e1e">${totalSessions}</div>
    </div>
    <div style="background:#fff;border:1px solid #e5e7eb;border-radius:10px;padding:0.875rem 1rem">
      <div style="font-size:11px;font-weight:600;color:#9ca3af;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:4px">Faculty active</div>
      <div style="font-size:24px;font-weight:700;color:#1e1e1e">${facCount}</div>
    </div>`;

  const rows = Object.values(byFaculty).sort((a, b) => b.totalHours - a.totalHours).map(f => {
    const batchBreakdown = Object.entries(f.byBatch).map(([b, h]) =>
      `<span style="display:inline-block;padding:2px 8px;background:#EBF3FD;border-radius:999px;font-size:11px;color:#1a5fc4;margin:2px">${b}: ${h.toFixed(1)}h</span>`
    ).join('');
    return `<tr style="border-bottom:1px solid #f3f4f6">
      <td style="padding:10px 12px;font-weight:600;color:#1e1e1e">${f.name}</td>
      <td style="padding:10px 12px;text-align:center;font-weight:700;color:#2B7FE0;font-size:16px">${f.totalHours.toFixed(1)}</td>
      <td style="padding:10px 12px;text-align:center;color:#6b7280">${f.sessions}</td>
      <td style="padding:10px 12px">${batchBreakdown}</td>
    </tr>`;
  }).join('');

  document.getElementById('salary-content').innerHTML = `
    <table style="width:100%;border-collapse:collapse">
      <thead>
        <tr style="background:#f8f9fb;border-bottom:2px solid #e5e7eb">
          <th style="padding:10px 12px;text-align:left;font-size:12px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em">Faculty</th>
          <th style="padding:10px 12px;text-align:center;font-size:12px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em">Total Hours</th>
          <th style="padding:10px 12px;text-align:center;font-size:12px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em">Sessions</th>
          <th style="padding:10px 12px;text-align:left;font-size:12px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em">Breakdown by batch</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>`;
}

function exportSalaryCSV() {
  const sessions = getFilteredSessions();
  const rows = [['Date', 'Faculty', 'Batch', 'Batch Type', 'Session', 'Hours', 'Subject', 'Chapter', 'Status', 'Description']];
  sessions.forEach(s => {
    rows.push([s.date || '', s.faculty || '', s.batch || '', s.batchType || '', s.session || '', s.hours || '', s.subject || '', s.chapter || '', s.chapterStatus || '', '"' + (s.description || '').replace(/"/g, "''") + '"']);
  });
  const csv = rows.map(r => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'josh-salary-report-' + new Date().toISOString().slice(0, 10) + '.csv';
  a.click();
}
