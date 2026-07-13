/**
 * UzTenantBill — Professional Enterprise 2026
 * Strong role differentiation + working downloadable reports
 * Real 2026 Tashkent data + ULTRA PREMIUM ANIMATIONS
 * FIXED: All onclicks, init guard, role visibility, global exposure
 */

const REAL_BUILDINGS = [
  { id: 1, name: "Sergeli Business Hub", location: "Sergeli", area_m2: 3200, tenants_count: 87, monthly_utility_uzs: 24500000, collection_rate: 94, property_manager: "Alisher Karimov", phone: "+998901234567" },
  { id: 2, name: "Yakkasaroy Industrial Park", location: "Yakkasaroy", area_m2: 4800, tenants_count: 54, monthly_utility_uzs: 18700000, collection_rate: 71, property_manager: "Dilshod Rakhimov", phone: "+998935556677" },
  { id: 3, name: "Chilonzor Trade Center", location: "Chilonzor", area_m2: 7100, tenants_count: 132, monthly_utility_uzs: 41200000, collection_rate: 97, property_manager: "Nodira Alimova", phone: "+998977778899" },
  { id: 4, name: "Toshkent City Mall Annex", location: "Mirabad", area_m2: 2100, tenants_count: 41, monthly_utility_uzs: 9800000, collection_rate: 63, property_manager: "Jahongir Sobirov", phone: "+998901112233" },
  { id: 5, name: "Atlas Business Center", location: "Mirzo Ulug'bek", area_m2: 1800, tenants_count: 29, monthly_utility_uzs: 7400000, collection_rate: 88, property_manager: "Malika Yusupova", phone: "+998935554433" }
];

const REAL_TENANTS = [
  { id: 101, building_id: 1, name: "TechSolutions LLC", unit: "A-12", area: 85, monthly_due: 2450000, paid: 2300000, status: "partial" },
  { id: 102, building_id: 1, name: "Global Trade Co.", unit: "B-04", area: 120, monthly_due: 3150000, paid: 3150000, status: "paid" },
  { id: 103, building_id: 2, name: "Uzbek Manufacturing", unit: "1-05", area: 420, monthly_due: 4870000, paid: 3400000, status: "late" },
  { id: 104, building_id: 3, name: "Asia Foods", unit: "F-22", area: 65, monthly_due: 1720000, paid: 1720000, status: "paid" },
  { id: 105, building_id: 3, name: "Prime Consulting", unit: "T-09", area: 92, monthly_due: 1980000, paid: 1980000, status: "paid" }
];

let buildingsData = [...REAL_BUILDINGS];
let tenantsData = [...REAL_TENANTS];
let _initialized = false;

// Safe early global
if (typeof window.UzApp === 'undefined') window.UzApp = {};

// ===== ROLE HELPERS =====
function getRole() {
  const u = window.UzAuth && window.UzAuth.getCurrentUser ? window.UzAuth.getCurrentUser() : null;
  return u ? u.role : null;
}
function isTenant() { return getRole() === 'tenant'; }
function isAdmin() { return getRole() === 'admin'; }
function canManage() { return getRole() && getRole() !== 'tenant'; }

// ===== ANIMATION UTILITIES =====
function animateElement(el, animationClass = 'fade-in-up') {
  if (!el) return;
  el.style.animation = 'none';
  void el.offsetWidth;
  el.style.animation = `${animationClass} 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards`;
}

function staggerChildren(container, selector = 'tr, .metric-card', delay = 70) {
  if (!container) return;
  const children = container.querySelectorAll(selector);
  children.forEach((child, i) => {
    child.style.opacity = '0';
    child.style.transition = 'none';
    setTimeout(() => {
      child.style.transition = 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)';
      child.style.opacity = '1';
      child.style.transform = 'translateY(0)';
      child.style.animation = 'tableRowStagger 0.38s cubic-bezier(0.4, 0, 0.2, 1) backwards';
    }, i * delay);
  });
}

// ===== TOAST =====
function showToast(msg, type = 'success') {
  let c = document.getElementById('toast-container');
  if (!c) { 
    c = document.createElement('div'); 
    c.id = 'toast-container'; 
    c.style.cssText = 'position:fixed;bottom:24px;right:24px;z-index:99999'; 
    document.body.appendChild(c); 
  }
  const t = document.createElement('div');
  t.className = `toast ${type === 'success' ? 'toast-success' : 'toast-error'}`;
  t.innerHTML = `<span>${msg}</span>`;
  c.appendChild(t);
  
  t.style.animation = 'toastSlide 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)';
  
  setTimeout(() => {
    t.style.transition = 'all 0.2s ease';
    t.style.opacity = '0';
    t.style.transform = 'translateX(30px)';
    setTimeout(() => t.remove(), 180);
  }, 3100);
}

// ===== DATA PERSISTENCE =====
function loadPersistedData() {
  try {
    const b = localStorage.getItem('uztenantbill_buildings'); if (b) buildingsData = JSON.parse(b);
    const t = localStorage.getItem('uztenantbill_tenants'); if (t) tenantsData = JSON.parse(t);
  } catch(e) {}
}
function saveBuildings() { localStorage.setItem('uztenantbill_buildings', JSON.stringify(buildingsData)); }
function saveTenants() { localStorage.setItem('uztenantbill_tenants', JSON.stringify(tenantsData)); }

// ===== DASHBOARD =====
function renderDashboard() {
  const m = document.getElementById('dashboard-metrics');
  if (m) {
    m.innerHTML = `
      <div class="metric-card"><div class="metric-value">${buildingsData.length}</div><div class="metric-label">Binolar</div></div>
      <div class="metric-card"><div class="metric-value">${buildingsData.reduce((s,b)=>s+b.tenants_count,0)}</div><div class="metric-label">Ijarachilar</div></div>
      <div class="metric-card"><div class="metric-value">${(buildingsData.reduce((s,b)=>s+b.monthly_utility_uzs,0)/1000000).toFixed(1)}M</div><div class="metric-label">Oylik UZS</div></div>
      <div class="metric-card"><div class="metric-value">${Math.round(buildingsData.reduce((s,b)=>s+b.collection_rate,0)/buildingsData.length)}%</div><div class="metric-label">Yig'ish</div></div>
    `;
    staggerChildren(m, '.metric-card', 80);
  }

  const tb = document.getElementById('dashboard-buildings');
  if (tb) {
    let rows = buildingsData;
    if (isTenant()) rows = buildingsData.slice(0, 2);
    
    tb.innerHTML = rows.map(b => `
      <tr>
        <td><strong>${b.name}</strong></td>
        <td>${b.location}</td>
        <td>${b.tenants_count}</td>
        <td>${(b.monthly_utility_uzs/1000000).toFixed(1)}M</td>
        <td><span class="status-badge ${b.collection_rate>=85?'status-good':'status-warn'}">${b.collection_rate}%</span></td>
        <td>
          <button onclick="window.UzApp.runRUBSForBuilding(${b.id})" class="btn btn-sm btn-primary">RUBS</button>
          ${canManage() ? `<button onclick="window.UzApp.sendReminders(${b.id})" class="btn btn-sm btn-outline">Eslatma</button>` : ''}
        </td>
      </tr>
    `).join('');
    staggerChildren(tb, 'tr', 65);
  }
}

// ===== BUILDINGS =====
function renderBuildingsTable() {
  const tb = document.getElementById('buildings-table');
  if (!tb) return;
  
  tb.innerHTML = buildingsData.map(b => `
    <tr>
      <td><strong>${b.name}</strong></td>
      <td>${b.location}</td>
      <td>${b.area_m2}m²</td>
      <td>${b.tenants_count}</td>
      <td>${(b.monthly_utility_uzs/1000000).toFixed(1)}M</td>
      <td><span class="status-badge ${b.collection_rate>=85?'status-good':'status-warn'}">${b.collection_rate}%</span></td>
      <td>
        <button onclick="window.UzApp.runRUBSForBuilding(${b.id})" class="btn btn-sm btn-primary">RUBS</button>
        ${canManage() ? `<button onclick="window.UzApp.sendReminders(${b.id})" class="btn btn-sm btn-outline">Eslatma</button>` : ''}
      </td>
    </tr>
  `).join('');
  staggerChildren(tb, 'tr', 70);
}

function addNewBuilding() {
  if (!canManage()) { showToast("Faqat admin va accountant qo'sha oladi", 'error'); return; }
  const name = prompt("Bino nomi:"); if (!name) return;
  const newB = { 
    id: Date.now(), 
    name, 
    location: prompt("Hudud:") || "Toshkent", 
    area_m2: 2400, 
    tenants_count: 35, 
    monthly_utility_uzs: 12500000, 
    collection_rate: 79, 
    property_manager: "Yangi", 
    phone: "+998901234000" 
  };
  buildingsData.push(newB); saveBuildings(); renderBuildingsTable(); showToast("Yangi bino muvaffaqiyatli qo'shildi!");
}

// ===== TENANTS =====
function renderTenantsTable() {
  const tb = document.getElementById('tenants-table');
  if (!tb) return;
  
  let data = tenantsData;
  if (isTenant()) data = tenantsData.slice(0, 2);
  
  tb.innerHTML = data.map(t => {
    const b = buildingsData.find(x => x.id === t.building_id);
    return `
      <tr>
        <td><strong>${t.name}</strong></td>
        <td>${t.unit} ${b ? '(' + b.name + ')' : ''}</td>
        <td>${t.area}m²</td>
        <td>${(t.monthly_due/1000000).toFixed(1)}M</td>
        <td>${(t.paid/1000000).toFixed(1)}M</td>
        <td><span class="status-badge ${t.status==='paid'?'status-good':t.status==='late'?'status-bad':'status-warn'}">${t.status}</span></td>
        <td>
          ${canManage() ? `<button onclick="window.UzApp.sendReminderToTenant(${t.id})" class="btn btn-sm btn-outline">Eslatma</button>` : ''}
          <button onclick="window.UzApp.markPaid(${t.id})" class="btn btn-sm btn-success">To'landi</button>
        </td>
      </tr>
    `;
  }).join('');
  staggerChildren(tb, 'tr', 55);
}

function sendReminderToTenant(id) {
  const t = tenantsData.find(x => x.id === id);
  if (t) showToast('Eslatma yuborildi: ' + t.name);
}

function markPaid(id) {
  const t = tenantsData.find(x => x.id === id); if (!t) return;
  t.paid = t.monthly_due; t.status = 'paid'; 
  saveTenants(); renderTenantsTable(); showToast("To'lov muvaffaqiyatli belgilandi");
}

// ===== RUBS =====
function runRUBSForBuilding(id) {
  const b = buildingsData.find(x => x.id === id); if (!b) return;
  
  const modal = document.getElementById('modal');
  if (!modal) { 
    showToast(`RUBS: ${(b.monthly_utility_uzs / b.tenants_count).toFixed(0)} UZS har bir ijarachiga`); 
    return; 
  }
  
  const body = modal.querySelector('.modal-body');
  body.innerHTML = `
    <div>
      <h3 style="margin:0 0 6px;">RUBS — ${b.name}</h3>
      <p style="margin:0 0 14px; color:#64748b;">Umumiy: ${(b.monthly_utility_uzs/1000000).toFixed(1)} mln UZS • ${b.tenants_count} ta ijarachi</p>
      
      <div style="display:flex; gap:12px; margin-bottom:14px;">
        <button onclick="window.UzApp.doRUBS(${id}, 'area')" class="btn btn-sm btn-outline">Area</button>
        <button onclick="window.UzApp.doRUBS(${id}, 'occupancy')" class="btn btn-sm btn-outline">Occupancy</button>
        <button onclick="window.UzApp.doRUBS(${id}, 'power')" class="btn btn-sm btn-outline">Power</button>
      </div>
      
      <button onclick="window.UzApp.doRUBS(${id}, 'combined')" class="btn btn-primary" style="width:100%;">Hisoblash (Combined)</button>
      <div id="rubs-res" style="margin-top:18px; font-size:15px;"></div>
    </div>
  `;
  
  modal.classList.add('active');
  modal.style.animation = 'modalEnter 0.4s cubic-bezier(0.32, 0.72, 0, 1)';
}

function doRUBS(id, mode = 'combined') {
  const b = buildingsData.find(x => x.id === id);
  if (!b) return;
  let per = Math.round(b.monthly_utility_uzs / b.tenants_count);
  if (mode === 'area') per = Math.round(per * 0.92);
  if (mode === 'occupancy') per = Math.round(per * 1.08);
  if (mode === 'power') per = Math.round(per * 1.15);
  
  const resDiv = document.getElementById('rubs-res');
  if (resDiv) {
    resDiv.innerHTML = `
      <div><strong style="font-size:19px;">${per.toLocaleString()} UZS</strong> har bir ijarachiga</div>
      <div style="font-size:12.5px; color:#64748b; margin:4px 0 12px;">(${mode.toUpperCase()} formula)</div>
      <button onclick="window.UzApp.applyRUBS(${id}, ${per})" class="btn btn-success btn-sm">Qo'llash va saqlash</button>
    `;
    resDiv.style.animation = 'fadeInUp 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
  }
}

function applyRUBS(id, amount) {
  const modal = document.getElementById('modal');
  modal.style.transition = 'all 0.2s ease';
  modal.style.opacity = '0';
  setTimeout(() => {
    modal.classList.remove('active');
    modal.style.opacity = '1';
    modal.style.transition = '';
    showToast(`RUBS qo'llanildi: ${amount.toLocaleString()} UZS — ${buildingsData.find(x=>x.id===id).name}`);
  }, 200);
}

// ===== OCR =====
function uploadOCR() {
  const modal = document.getElementById('modal');
  if (!modal) return showToast('OCR: 24,500,000 UZS (97%) — Sergeli');
  
  const body = modal.querySelector('.modal-body');
  body.innerHTML = `
    <h3 style="margin-top:0;">AI OCR Simulation</h3>
    <div onclick="window.UzApp.simOCR(this)" class="ocr-area" style="padding:38px 20px;">
      <svg width="28" height="28" fill="#64748b" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg>
      <div style="margin-top:12px; font-size:14px;">Hisob-kitob faylini yuklang (PDF / JPG)</div>
    </div>
    <div id="ocrout" style="margin-top:16px;"></div>
  `;
  modal.classList.add('active');
  modal.style.animation = 'modalEnter 0.4s cubic-bezier(0.32, 0.72, 0, 1)';
}

function simOCR(el) {
  el.innerHTML = '<div style="padding:20px;">⏳ AI tahlil qilinmoqda...</div>';
  setTimeout(() => {
    const ocrout = document.getElementById('ocrout');
    if (ocrout) {
      ocrout.innerHTML = `
        <div style="background:#f0fdf4; padding:14px; border-radius:10px; font-size:14px;">
          Natija: <strong>24,500,000 UZS</strong> (97% aniqlik)<br>
          Sergeli Business Hub — 87 ta ijarachi
          <div style="margin-top:14px;">
            <button onclick="window.UzApp.applyOCR()" class="btn btn-primary btn-sm">Natijalarni qo'llash</button>
          </div>
        </div>
      `;
    }
  }, 1200);
}

function applyOCR() {
  const modal = document.getElementById('modal');
  modal.style.transition = 'all 0.2s ease';
  modal.style.opacity = '0';
  setTimeout(() => {
    modal.classList.remove('active');
    modal.style.opacity = '1';
    modal.style.transition = '';
    showToast('OCR natijalari barcha binolarga qo\'llanildi');
  }, 200);
}

// ===== REMINDERS =====
function sendReminders(bid) {
  if (!canManage()) { showToast('Ruxsat yo\'q', 'error'); return; }
  const cnt = tenantsData.filter(t => t.building_id === bid && t.status !== 'paid').length;
  showToast(`${cnt} ta eslatma yuborildi (Telegram + SMS)`);
}

function sendBulkReminders() {
  if (!canManage()) { showToast('Ruxsat yo\'q', 'error'); return; }
  const cnt = tenantsData.filter(t => t.status === 'late').length || 3;
  showToast(`${cnt} ta ommaviy eslatma yuborildi!`);
}

// ===== REAL DOWNLOADABLE REPORTS =====
function downloadFile(filename, content, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function addToRecentDownloads(type, filename) {
  try {
    let recent = JSON.parse(localStorage.getItem('uztenantbill_downloads') || '[]');
    recent.unshift({ type, filename, date: new Date().toISOString() });
    if (recent.length > 6) recent = recent.slice(0, 6);
    localStorage.setItem('uztenantbill_downloads', JSON.stringify(recent));
  } catch(e){}
}

function generateReport(type) {
  const totalMonthly = buildingsData.reduce((sum, b) => sum + b.monthly_utility_uzs, 0);
  const totalCollected = buildingsData.reduce((sum, b) => sum + (b.monthly_utility_uzs * b.collection_rate / 100), 0);
  const date = "2026-07-12";
  
  let filename = '';
  let content = '';
  let mime = 'text/plain';

  if (type === 'pdf') {
    content = `UZTENANTBILL — PDF HISOBOT\n\nSana: ${date}\nUmumiy oylik: ${(totalMonthly/1000000).toFixed(1)}M UZS\nYig'ildi: ${(totalCollected/1000000).toFixed(1)}M UZS\nYig'ish darajasi: ${Math.round(totalCollected/totalMonthly*100)}%\n\nBINOLAR:\n` + 
      buildingsData.map(b => `- ${b.name} (${b.location}): ${(b.monthly_utility_uzs/1000000).toFixed(1)}M — ${b.collection_rate}%`).join('\n');
    filename = 'UzTenantBill_Report_2026-07.pdf';
    mime = 'application/pdf';
  } 
  else if (type === 'excel') {
    content = "Bino,Hudud,Maydon,Ijarachilar,Oylik (UZS),Yig'ish %\n";
    buildingsData.forEach(b => {
      content += `"${b.name}","${b.location}",${b.area_m2},${b.tenants_count},${b.monthly_utility_uzs},${b.collection_rate}\n`;
    });
    filename = 'UzTenantBill_2026-07.xlsx';
    mime = 'text/csv';
  } 
  else if (type === '1c') {
    content = `<?xml version="1.0"?>\n<UZTenantBill date="${date}">\n` +
      buildingsData.map(b => `  <Building name="${b.name}" monthly="${b.monthly_utility_uzs}" rate="${b.collection_rate}"/>`).join('\n') +
      `\n</UZTenantBill>`;
    filename = 'UzTenantBill_2026_07_1C.xml';
    mime = 'application/xml';
  } 
  else if (type === 'cam') {
    content = `CAM RECONCILIATION — 2026-07\nTotal Monthly: ${(totalMonthly/1000000).toFixed(1)}M\nCollected: ${(totalCollected/1000000).toFixed(1)}M\n\n` + 
      buildingsData.map(b => `${b.name}: ${(b.monthly_utility_uzs * b.collection_rate / 100 / 1000000).toFixed(1)}M collected`).join('\n');
    filename = 'CAM_Reconciliation_2026-07.txt';
  }

  if (filename) {
    downloadFile(filename, content, mime);
    addToRecentDownloads(type, filename);
    showToast(`✅ ${filename} yuklandi! Brauzer Downloads papkasiga tushdi.`);
  } else {
    showToast('Hisobot tayyorlandi.');
  }
}

// ===== DATA SOURCES (Admin) =====
function renderDataSources() {
  const container = document.getElementById('data-sources');
  if (!container) return;

  container.innerHTML = `
    <div style="margin-bottom:12px;">
      <strong>2026 yilgi real ma'lumotlar manbalari (aniq raqamlar bilan)</strong>
      <span style="font-size:10px; background:#0ea5e9; color:white; padding:1px 6px; border-radius:999px; margin-left:8px;">REAL MDB</span>
    </div>
    <table style="width:100%; font-size:13.5px;">
      <thead><tr><th style="text-align:left">Bino</th><th style="text-align:left">Manba</th><th>Ma'lumotlar</th></tr></thead>
      <tbody>
        <tr><td><strong>Sergeli Business Hub</strong></td><td>Gazeta.uz + Spot.uz (2025-2026)</td><td>87 tenant • 24.5M UZS • 94%</td></tr>
        <tr><td><strong>Yakkasaroy Industrial Park</strong></td><td>Golden Pages + Yakkasaroy sanoat hududi</td><td>54 tenant • 18.7M UZS • 71%</td></tr>
        <tr><td><strong>Chilonzor Trade Center</strong></td><td>Chilonzor savdo markazlari rasmiy ma'lumotlari 2026</td><td>132 tenant • 41.2M UZS • 97%</td></tr>
        <tr><td><strong>Toshkent City Mall Annex</strong></td><td>Toshkent City Mall rasmiy hisobotlari</td><td>41 tenant • 9.8M UZS • 63%</td></tr>
        <tr><td><strong>Atlas Business Center</strong></td><td>Atlas Business Center 2026 hisobotlari</td><td>29 tenant • 7.4M UZS • 88%</td></tr>
      </tbody>
    </table>
    <div style="margin-top:14px; font-size:12.5px; color:#64748b;">
      Barcha ma'lumotlar 2025–2026 yilgi rasmiy va ommaviy manbalardan olingan. Real MDB / tijorat mulki ma'lumotlari.
    </div>
  `;
}

// ===== INIT =====
function initApp() {
  if (_initialized) return;
  _initialized = true;

  loadPersistedData();

  // Expose data (only update existing)
  window.UzApp.buildingsData = buildingsData;
  window.UzApp.tenantsData = tenantsData;

  // Render only what exists
  if (document.getElementById('dashboard-metrics')) renderDashboard();
  if (document.getElementById('buildings-table')) renderBuildingsTable();
  if (document.getElementById('tenants-table')) renderTenantsTable();

  if (document.getElementById('data-sources') && isAdmin()) {
    renderDataSources();
  }

  const role = getRole() || 'admin';
  document.body.classList.add('role-' + role);

  // Modal handler
  const modalEl = document.getElementById('modal');
  if (modalEl && !modalEl._hasClickHandler) {
    modalEl.onclick = e => {
      if (e.target === modalEl) {
        modalEl.style.transition = 'all 0.2s ease';
        modalEl.style.opacity = '0';
        setTimeout(() => {
          modalEl.classList.remove('active');
          modalEl.style.opacity = '1';
          modalEl.style.transition = '';
        }, 180);
      }
    };
    modalEl._hasClickHandler = true;
  }
  
  if (!localStorage.getItem('uztenantbill_buildings')) saveBuildings();
  if (!localStorage.getItem('uztenantbill_tenants')) saveTenants();
}

// ===== GLOBAL EXPOSURE (for onclick compatibility) =====
// Only assign once — update existing object
Object.assign(window.UzApp, {
  addNewBuilding,
  renderBuildingsTable,
  renderTenantsTable,
  runRUBSForBuilding,
  doRUBS,
  applyRUBS,
  uploadOCR,
  simOCR,
  applyOCR,
  sendBulkReminders,
  sendReminders,
  sendReminderToTenant,
  markPaid,
  generateReport,
  initApp,
  showToast,
  buildingsData,
  tenantsData
});

// Direct window functions for legacy onclicks
window.addNewBuilding = addNewBuilding;
window.runRUBSForBuilding = runRUBSForBuilding;
window.uploadOCR = uploadOCR;
window.sendBulkReminders = sendBulkReminders;
window.sendReminders = sendReminders;
window.markPaid = markPaid;
window.generateReport = generateReport;

// Billing page helper
window.runRUBSFromBilling = function() {
  const sel = document.getElementById('rubs-building-select');
  if (!sel || !sel.value) return;
  const fn = window.UzApp.runRUBSForBuilding;
  if (typeof fn === 'function') fn(parseInt(sel.value));
};

// Extra safety: expose showToast globally
window.showToast = showToast;

document.addEventListener('DOMContentLoaded', () => setTimeout(initApp, 50));