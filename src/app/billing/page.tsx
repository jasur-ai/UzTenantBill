'use client';

import { useEffect, useState } from 'react';
import Logo from '@/components/Logo';
import { useApp } from '@/lib/app-engine';
import { UzAuth } from '@/lib/auth';
import { ThemeToggle } from '@/lib/theme';
import type { User } from '@/lib/types';

function BillingContent() {
  const app = useApp();
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const user = UzAuth.protectPage();
    if (!user) return;
    setCurrentUser(user);
    UzAuth.updateNavbar();

    if (user.role === 'tenant') {
      document.querySelectorAll('.admin-only, button[onclick*="sendBulk"], button[onclick*="uploadOCR"]').forEach(el => (el as HTMLElement).style.display = 'none');
    }

    setTimeout(() => {
      const sel = document.getElementById('rubs-building-select') as HTMLSelectElement;
      if (sel && app.buildingsData) {
        const buildings = app.buildingsData;
        sel.innerHTML = buildings.map((b: any) => `<option value="${b.id}">${b.name} — ${(b.monthly_utility_uzs / 1000000).toFixed(1)}M</option>`).join('');
      }
      if (app.initApp) app.initApp();
    }, 120);
  }, []);

  const runRUBSFromBilling = () => {
    const sel = document.getElementById('rubs-building-select') as HTMLSelectElement;
    if (!sel || !sel.value) return;
    app.runRUBSForBuilding(parseInt(sel.value));
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
            <a href="/billing" className="active">Billing</a>
            <a href="/reports">Hisobotlar</a>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <ThemeToggle />
            <div id="nav-user"></div>
          </div>
        </div>
      </nav>

      <div className="container">
        <div className="page-header">
          <div>
            <h1 style={{ margin: 0, fontSize: 29, fontWeight: 800 }}>Billing &amp; RUBS</h1>
            <p style={{ color: 'var(--text-secondary)' }}>Real-time utility recovery va avtomatik hisob-kitob</p>
          </div>
        </div>

        <div className="card" style={{ marginBottom: 26 }}>
          <div className="card-body">
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button onClick={() => app.sendBulkReminders()} className="btn btn-primary">Eslatma yuborish</button>
              <button onClick={() => app.uploadOCR()} className="btn btn-secondary">AI OCR yuklash</button>
              <button onClick={() => app.showSavingsCalculator()} className="btn btn-outline">💰 Savings vs Yardi</button>
              <button onClick={() => app.calculateLocalROI()} className="btn btn-secondary">🇺🇿 Local ROI</button>
              <button onClick={() => app.generateReport('pdf')} className="btn btn-outline">PDF hisobot</button>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header"><strong>RUBS Calculator — Advanced</strong></div>
          <div className="card-body">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
              <div>
                <div className="rubs-form">
                  <h4 style={{ marginTop: 0 }}>Bino tanlang</h4>
                  <select id="rubs-building-select" className="advanced-input" style={{ marginBottom: 16 }}></select>

                  <div style={{ marginBottom: 14 }}>
                    <label style={{ fontSize: 12 }}>Advanced Mode</label>
                    <select id="rubs-mode" className="advanced-input">
                      <option value="combined">Combined (Default)</option>
                      <option value="area">Area-Based</option>
                      <option value="occupancy">Occupancy</option>
                      <option value="power">Power + Inflation</option>
                    </select>
                  </div>

                  <button onClick={runRUBSFromBilling} className="btn btn-primary">RUBS hisobla (Advanced)</button>
                  <div style={{ marginTop: 12, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <button onClick={() => app.predictNextMonth()} className="btn btn-sm btn-outline">🔮 Next Month Forecast</button>
                    <button onClick={() => app.analyzeOccupancy()} className="btn btn-sm btn-outline">📈 Occupancy Uplift</button>
                    <button onClick={() => app.simulateAdvancedPaymentGateway()} className="btn btn-sm btn-secondary">💳 Simulate Payment</button>
                  </div>
                </div>
              </div>
              <div>
                <div className="simulator" style={{ padding: 20 }}>
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>2026 yilgi real ma'lumotlar</div>
                  <div style={{ fontSize: 15, marginTop: 8, color: 'var(--text)' }}><strong>Sergeli Business Hub:</strong> 24.5M UZS (87 tenants) • 94%</div>
                  <div style={{ fontSize: 15, color: 'var(--text)' }}><strong>Chilonzor Trade Center:</strong> 41.2M UZS (132 tenants) • 97%</div>
                  <div style={{ marginTop: 10, fontSize: 12.5, color: 'var(--success)' }}>UzTenantBill RUBS vs Yardi 4.5% fee = 3.7x cheaper</div>
                  <div style={{ marginTop: 10 }}><button onClick={() => app.runFullPortfolioAnalysis()} className="btn btn-sm btn-outline">Run Portfolio Analysis</button></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card" style={{ marginTop: 20 }}>
          <div className="card-header"><strong>Proof: Hardware-free RUBS vs Competitors</strong></div>
          <div className="card-body">
            <button onClick={() => app.benchmarkVsAll()} className="btn btn-primary btn-sm">Benchmark vs 7 Competitors</button>
            <button onClick={() => app.penaltyVsCompetitor()} className="btn btn-secondary btn-sm">Penalties vs Yardi/MRI</button>
            <button onClick={() => app.showUzbekistanROI()} className="btn btn-outline btn-sm">Uzbekistan ROI</button>
          </div>
        </div>
      </div>

      <div id="modal" className="modal">
        <div className="modal-content">
          <div className="modal-header">RUBS / OCR / Proof <span onClick={() => { const m = document.getElementById('modal'); if (m) m.style.display = 'none'; }} style={{ cursor: 'pointer', fontSize: 27 }}>×</span></div>
          <div className="modal-body"></div>
        </div>
      </div>
    </>
  );
}

export default function BillingPage() {
  useEffect(() => { UzAuth.protectPage(); }, []);
  return <BillingContent />;
}
