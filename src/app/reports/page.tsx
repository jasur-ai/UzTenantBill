'use client';

import { useEffect, useState } from 'react';
import Logo from '@/components/Logo';
import { useApp } from '@/lib/app-engine';
import { UzAuth } from '@/lib/auth';
import type { User } from '@/lib/types';

function ReportsContent() {
  const app = useApp();
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const user = UzAuth.protectPage();
    if (!user) return;
    setCurrentUser(user);
    UzAuth.updateNavbar();

    if (user.role === 'tenant') {
      document.querySelectorAll('.admin-only').forEach(el => (el as HTMLElement).style.display = 'none');
    }

    setTimeout(() => { if (app.initApp) app.initApp(); }, 80);
    setTimeout(showRecentDownloads, 350);
  }, []);

  const showRecentDownloads = () => {
    const container = document.getElementById('recent-downloads');
    if (!container) return;

    try {
      const recent = JSON.parse(localStorage.getItem('uztenantbill_downloads') || '[]');
      if (recent.length === 0) {
        container.innerHTML = `<div style="font-size:13.5px; color:#64748b;">Hali hisobot yuklanmagan. Yuqoridagi tugmalardan birini bosing.</div>`;
        return;
      }
      let html = '<div style="font-size:13.5px;">';
      recent.forEach((item: any) => {
        const d = new Date(item.date).toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' });
        html += `<div style="margin-bottom:6px; padding:4px 0; border-bottom:1px solid #e2e8f0;">✅ <strong>${item.filename}</strong> <span style="color:#64748b; font-size:12px;">(${d})</span></div>`;
      });
      html += '</div><div style="margin-top:8px; font-size:11.5px; color:#64748b;">Fayllar brauzeringizning "Yuklamalar" papkasida saqlanadi.</div>';
      container.innerHTML = html;
    } catch (e) { }
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-content">
          <a href="/" className="logo">
            <Logo size={28} />
            <span>UzTenantBill</span>
          </a>
          <div className="nav-links">
            <a href="/dashboard">Dashboard</a>
            {currentUser?.role !== 'tenant' && <a href="/buildings">Binolar</a>}
            {currentUser?.role !== 'tenant' && <a href="/tenants">Ijarachilar</a>}
            <a href="/billing">Billing</a>
            <a href="/reports" className="active">Hisobotlar</a>
          </div>
          <div id="nav-user"></div>
        </div>
      </nav>

      <div className="container">
        <div className="page-header">
          <div>
            <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800 }}>Hisobotlar va eksport</h1>
            <p style={{ margin: '4px 0 0', color: '#64748b' }}>Professional enterprise reports • 2026</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 22 }}>
          <div className="card">
            <div className="card-body">
              <div style={{ fontSize: 34, marginBottom: 4 }}>📄</div>
              <strong style={{ fontSize: 17 }}>PDF hisobot</strong>
              <p style={{ fontSize: 13.5, color: '#64748b', margin: '8px 0 16px' }}>Barcha binolar, yig'ish darajasi, RUBS va qarzlar.</p>
              <button onClick={() => app.generateReport('pdf')} className="btn btn-primary" style={{ width: '100%' }}>Yuklab olish PDF</button>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <div style={{ fontSize: 34, marginBottom: 4 }}>📊</div>
              <strong style={{ fontSize: 17 }}>Excel (XLSX)</strong>
              <p style={{ fontSize: 13.5, color: '#64748b', margin: '8px 0 16px' }}>Buxgalteriya uchun to'liq ma'lumotlar jadvali.</p>
              <button onClick={() => app.generateReport('excel')} className="btn btn-primary" style={{ width: '100%' }}>Yuklab olish Excel</button>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <div style={{ fontSize: 34, marginBottom: 4 }}>🔗</div>
              <strong style={{ fontSize: 17 }}>1C:Enterprise</strong>
              <p style={{ fontSize: 13.5, color: '#64748b', margin: '8px 0 16px' }}>O'zbekiston uchun XML eksport + CAM reconciliation.</p>
              <button onClick={() => app.exportCAMTo1C()} className="btn btn-primary" style={{ width: '100%' }}>1C + CAM Export</button>
            </div>
          </div>
        </div>

        <div className="card" style={{ marginTop: 26 }}>
          <div className="card-header"><strong>CAM Reconciliation (Yardi / MRI uslubi)</strong></div>
          <div className="card-body">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 30 }}>
              <div>
                <div style={{ marginBottom: 14, fontSize: 14, fontWeight: 600 }}>2026-07 yilgi natijalar</div>
                <table style={{ width: '100%', fontSize: 14 }}>
                  <tbody>
                    <tr><td style={{ padding: '6px 0' }}>Umumiy hisob</td><td style={{ textAlign: 'right', fontWeight: 700 }}>142.4M UZS</td></tr>
                    <tr><td style={{ padding: '6px 0' }}>Yig'ildi</td><td style={{ textAlign: 'right', fontWeight: 700, color: '#10b981' }}>117.3M UZS</td></tr>
                    <tr><td style={{ padding: '6px 0' }}>Kech to'lovlar</td><td style={{ textAlign: 'right', fontWeight: 700, color: '#ef4444' }}>25.1M UZS</td></tr>
                    <tr><td style={{ padding: '6px 0', borderTop: '1px solid #e2e8f0' }}>O'rtacha yig'ish</td><td style={{ textAlign: 'right', fontWeight: 700, color: '#10b981' }}>82.4%</td></tr>
                  </tbody>
                </table>
              </div>
              <div>
                <button onClick={() => app.generateReport('cam')} className="btn btn-secondary" style={{ width: '100%', marginBottom: 10 }}>CAM hisobotini yaratish</button>
                <button onClick={() => app.exportCAMTo1C()} className="btn btn-secondary" style={{ width: '100%', marginTop: 8 }}>Export 1C</button>
                <button onClick={() => app.previewSMSReminders()} className="btn btn-secondary" style={{ width: '100%', marginTop: 8 }}>Preview SMS Reminders</button>
                <button onClick={() => app.predictNextMonth()} className="btn btn-outline" style={{ width: '100%', marginTop: 8 }}>Predict Next Month</button>
                <div style={{ fontSize: 12.5, color: '#64748b', lineHeight: 1.5, marginTop: 10 }}>
                  Yardi, MRI va Re-Leased uslubida to'liq reconciliation.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card" style={{ marginTop: 22 }} id="recent-downloads-card">
          <div className="card-header">
            <strong>✅ So'nggi yuklangan hisobotlar</strong>
            <span style={{ fontSize: 12, color: '#64748b' }}>(Brauzer yuklamalar papkasiga tushadi)</span>
          </div>
          <div className="card-body" id="recent-downloads">
            <div style={{ fontSize: 13.5, color: '#64748b' }}>Hali hisobot yuklanmagan. Yuqoridagi tugmalardan birini bosing.</div>
          </div>
        </div>
      </div>

      <div id="modal" className="modal">
        <div className="modal-content">
          <div className="modal-header">Proof <span onClick={() => { const m = document.getElementById('modal'); if (m) m.style.display = 'none'; }} style={{ cursor: 'pointer', fontSize: 26, lineHeight: 1 }}>×</span></div>
          <div className="modal-body"></div>
        </div>
      </div>
    </>
  );
}

export default function ReportsPage() {
  useEffect(() => { UzAuth.protectPage(); }, []);
  return <ReportsContent />;
}
