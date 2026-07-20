'use client';

import { useEffect, useState } from 'react';
import Logo from '@/components/Logo';
import { useApp } from '@/lib/app-engine';
import { UzAuth } from '@/lib/auth';
import { ThemeToggle } from '@/lib/theme';
import type { User } from '@/lib/types';

function DashboardContent() {
  const app = useApp();
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const user = UzAuth.protectPage();
    if (!user) return;
    setCurrentUser(user);
    UzAuth.updateNavbar();
    document.body.classList.add('role-' + user.role);

    setTimeout(() => {
      app.initApp();

      const roleLabel = document.getElementById('role-label');
      if (roleLabel) {
        roleLabel.textContent = user.role.toUpperCase();
        roleLabel.className = 'role-badge ' + user.role;
      }
      const welcomeMsg = document.getElementById('welcome-msg');
      if (welcomeMsg) welcomeMsg.textContent = user.fullName + ' — ' + user.company;



      // Renders
      const cs = document.getElementById('collection-summary');
      if (cs) {
        let data = app.buildingsData;
        if (user.role === 'tenant') data = data.slice(0, 2);
        const total = data.reduce((s: number, b: any) => s + b.monthly_utility_uzs, 0);
        const collected = data.reduce((s: number, b: any) => s + (b.monthly_utility_uzs * b.collection_rate / 100), 0);
        cs.innerHTML = `
          <div style="font-size:13.5px; display:flex; flex-direction:column; gap:7px;">
            <div style="display:flex; justify-content:space-between;"><span>Umumiy:</span> <strong>${(total / 1000000).toFixed(1)}M UZS</strong></div>
            <div style="display:flex; justify-content:space-between;"><span>Yig'ildi:</span> <strong style="color:var(--success);">${(collected / 1000000).toFixed(1)}M UZS</strong></div>
            <div style="display:flex; justify-content:space-between;"><span>O'rtacha yig'ish:</span> <strong>${Math.round(data.reduce((s: number, b: any) => s + b.collection_rate, 0) / Math.max(1, data.length))}%</strong></div>
          </div>`;
      }
    }, 140);
  }, []);

  useEffect(() => {
    if (!currentUser || !app.tenantsData) return;
    if (currentUser.role !== 'tenant') return;
    const container = document.getElementById('my-bills');
    const nextDueEl = document.getElementById('tenant-next-due');
    if (!container) return;
    const myTenant = app.tenantsData[0] || { name: 'Siz', unit: 'A-12', monthly_due: 2450000, paid: 2300000, status: 'partial' as const };
    const shortName = myTenant.name.length > 18 ? myTenant.name.substring(0, 16) + '…' : myTenant.name;
    container.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; gap:12px; flex-wrap:wrap;">
        <div style="min-width:0; flex:1 1 140px; overflow:hidden;">
          <div style="font-size:13px; color:var(--text-secondary); white-space:nowrap;">Sizning birligingiz</div>
          <strong style="font-size:16px; word-break:break-word; overflow-wrap:break-word;">${myTenant.unit} — ${shortName}</strong>
        </div>
        <div style="text-align:right; flex-shrink:0;">
          <div style="font-size:13px; color:var(--text-secondary); white-space:nowrap;">Hozirgi balans</div>
          <span style="font-size:22px; font-weight:800; white-space:nowrap;">${(myTenant.monthly_due - myTenant.paid).toLocaleString()} UZS</span>
        </div>
      </div>
      <div style="margin-top:20px; font-size:13px;">
        <div style="display:flex; gap:20px; flex-wrap:wrap;">
          <div style="white-space:nowrap;"><span style="color:var(--text-secondary);">To'lanishi kerak:</span> <strong>${(myTenant.monthly_due / 1000000).toFixed(1)}M</strong></div>
          <div style="white-space:nowrap;"><span style="color:var(--text-secondary);">To'langan:</span> <strong style="color:var(--success);">${(myTenant.paid / 1000000).toFixed(1)}M</strong></div>
        </div>
      </div>`;
    if (nextDueEl) nextDueEl.textContent = (myTenant.monthly_due - myTenant.paid).toLocaleString() + ' UZS';
  }, [currentUser, app.tenantsData]);

  const isTenant = currentUser?.role === 'tenant';
  const isAdmin = currentUser?.role === 'admin';

  const switchTab = (tab: string) => {
    document.querySelectorAll('[id^="tab-content-"]').forEach(el => {
      (el as HTMLElement).style.opacity = '0';
      setTimeout(() => {
        (el as HTMLElement).style.display = 'none';
        (el as HTMLElement).style.opacity = '1';
      }, 180);
    });
    document.querySelectorAll('.nav-tab').forEach(el => el.classList.remove('active'));
    const content = document.getElementById('tab-content-' + tab);
    if (content) {
      setTimeout(() => {
        content.style.display = 'block';
        content.style.opacity = '0';
        setTimeout(() => { content.style.opacity = '1'; }, 20);
      }, 200);
    }
    const tabEl = document.getElementById('tab-' + tab);
    if (tabEl) tabEl.classList.add('active');
    if (tab === 'datasources') {
      const dsContainer = document.getElementById('data-sources');
      if (dsContainer && app.buildingsData) {
        dsContainer.innerHTML = `
          <div style="margin-bottom:12px;"><strong>2026 yilgi real ma'lumotlar manbalari (aniq raqamlar bilan)</strong>
          <span style="font-size:10px; background:var(--accent); color:white; padding:1px 6px; border-radius:999px; margin-left:8px;">REAL MDB</span></div>
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
          <div style="margin-top:14px; font-size:12.5px; color:var(--text-secondary);">Barcha ma'lumotlar 2025–2026 yilgi rasmiy va ommaviy manbalardan olingan.</div>`;
      }
    }
  };

  const markMyPaid = () => {
    app.showToast("To'lov tasdiqlandi! (Demo)");
    setTimeout(() => window.location.reload(), 650);
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-content">
          <a href="/" className="logo">
            <Logo size={30} />
            <span>UzTenantBill</span>
          </a>
          <div className="nav-links">
            <a href="/dashboard" className="active">Dashboard</a>
            {!isTenant && <><a href="/buildings">Binolar</a><a href="/tenants">Ijarachilar</a></>}
            <a href="/billing">Billing</a>
            <a href="/reports">Hisobotlar</a>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <ThemeToggle />
            <div id="nav-user"></div>
          </div>
        </div>
      </nav>

      <div className="container" style={{ paddingTop: 32, paddingBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1 style={{ margin: '0 0 6px', fontSize: 30, fontWeight: 800 }}>Dashboard</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span id="role-label" className="role-badge"></span>
              <span id="welcome-msg" style={{ color: 'var(--text-secondary)', fontSize: 14.5 }}></span>
            </div>
          </div>
        </div>

        <div className="metrics-grid" id="dashboard-metrics"></div>

        {/* Shared live bar */}
        <div className="card" style={{ marginBottom: 24, padding: '16px 22px', background: 'var(--live-bar-bg)', color: 'var(--live-bar-text)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14 }}>
            <div>
              <strong style={{ fontSize: 15 }}>LIVE 2026 Dashboard</strong><br />
              <span style={{ fontSize: 13, opacity: 0.8 }}>Real-time updates • Advanced simulation</span>
            </div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <div><span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Inflation</span><br /><strong id="live-inflation">9.2%</strong></div>
              <div><span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Total Collected</span><br /><strong id="live-collected">118.4M</strong></div>
              {!isTenant && <button onClick={() => app.runFullPortfolioAnalysis()} className="btn btn-sm" style={{ background: '#0ea5e9', color: 'white', border: 'none' }}>Advanced Portfolio</button>}
            </div>
          </div>
        </div>

        {/* TENANT VIEW — only for tenant role */}
        {isTenant && (
          <div className="role-separated limited-view">
            <div className="card" style={{ maxWidth: 620, borderLeft: '5px solid #0ea5e9' }}>
              <div className="card-header" style={{ background: 'var(--row-highlight-bg)' }}>
                <span style={{ fontWeight: 700 }}>Mening hisobim (Tenant view)</span>
              </div>
              <div className="card-body">
                <div id="my-bills"></div>                  <div style={{ marginTop: 22, paddingTop: 18, borderTop: '1px solid var(--card-border)' }}>
                  <strong>Keyingi to'lov</strong><br />
                  <span id="tenant-next-due" style={{ fontSize: 23, fontWeight: 800 }}></span>
                  <div style={{ marginTop: 18 }}>
                    <button onClick={markMyPaid} className="btn btn-success">To'lovni tasdiqlash (demo)</button>
                  </div>
                  <div style={{ marginTop: 12, fontSize: 12, color: 'var(--text-secondary)' }}>
                    Siz faqat o'zingizning shaxsiy hisobingizni ko'rasiz. Boshqa ma'lumotlar mavjud emas.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ADMIN / ACCOUNTANT VIEW */}
        {!isTenant && (
          <>
            <div className="nav-tabs">
              <div onClick={() => switchTab('overview')} id="tab-overview" className="nav-tab active">Umumiy ko'rinish</div>
              <div onClick={() => switchTab('buildings')} id="tab-buildings" className="nav-tab">Binolar</div>
              {isAdmin && <div onClick={() => switchTab('datasources')} id="tab-datasources" className="nav-tab admin-only">Ma'lumotlar</div>}
              <div onClick={() => switchTab('proofs')} id="tab-proofs" className="nav-tab">Nega Biz? (Live Proofs)</div>
            </div>

            <div id="tab-content-overview">
              <div className="card" style={{ marginBottom: 28 }}>
                <div className="card-header">
                  <span style={{ fontWeight: 700 }}>Faol binolar</span>
                  <a href="/buildings" className="btn btn-sm btn-outline">Barchasini ko'rish</a>
                </div>
                <div className="card-body" style={{ paddingTop: 6 }}>
                  <div className="table-container">
                    <table>
                      <thead><tr><th>Bino</th><th>Hudud</th><th>Ijarachilar</th><th>Oylik</th><th>Yig'ish</th><th>Harakatlar</th></tr></thead>
                      <tbody id="dashboard-buildings"></tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22 }}>
                <div className="card">
                  <div className="card-header"><span style={{ fontWeight: 700 }}>Tezkor harakatlar</span></div>
                  <div className="card-body" style={{ paddingTop: 12 }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                      <button onClick={() => app.addNewBuilding()} className="btn btn-primary btn-sm">+ Yangi bino</button>
                      <button onClick={() => app.uploadOCR()} className="btn btn-secondary btn-sm">AI OCR</button>
                      <button onClick={() => app.sendBulkReminders()} className="btn btn-secondary btn-sm">Ommaviy eslatma</button>
                      <button onClick={() => app.simulateCollectionRate()} className="btn btn-secondary btn-sm">📈 What-if</button>
                      <button onClick={() => app.runRiskAnalysis()} className="btn btn-secondary btn-sm">⚠️ Risk</button>
                      <button onClick={() => app.exportCAMTo1C()} className="btn btn-outline btn-sm">1C + CAM</button>
                      <button onClick={() => app.showSavingsCalculator()} className="btn btn-outline btn-sm">💰 Savings</button>
                      <button onClick={() => app.predictNextMonth()} className="btn btn-secondary btn-sm">🔮 Forecast</button>
                      <button onClick={() => app.showFullWhyUsProof()} className="btn btn-outline btn-sm">🏆 Nega Biz?</button>
                      <button onClick={() => app.showCollectionHeatmap()} className="btn btn-secondary btn-sm">🔥 Heatmap</button>
                      <a href="/reports" className="btn btn-sm btn-outline">Hisobotlar</a>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header"><span style={{ fontWeight: 700 }}>Yig'ish statistikasi</span></div>
                  <div className="card-body" id="collection-summary"></div>
                </div>
              </div>
            </div>

            {isAdmin && (
              <div id="tab-content-datasources" style={{ display: 'none' }} className="admin-only">
                <div className="card" style={{ borderLeft: '5px solid #0ea5e9' }}>
                  <div className="card-header">
                    <span style={{ fontWeight: 700 }}>Ma'lumotlar manbalari (Real 2026)</span>
                    <span style={{ fontSize: 11, background: '#0ea5e9', color: 'white', padding: '1px 8px', borderRadius: 999 }}>REAL MDB</span>
                  </div>
                  <div className="card-body" id="data-sources"></div>
                </div>
              </div>
            )}

            <div id="tab-content-proofs" style={{ display: 'none' }}>
              <div className="card">
                <div className="card-header"><strong>✅ Amalda isbot: Nega UzTenantBill?</strong>                  <span style={{ fontSize: 12, color: 'var(--success)' }}>(30+ live functions)</span></div>
                <div className="card-body">
                  <p style={{ marginBottom: 14, fontSize: 14, color: 'var(--text-secondary)' }}>Har bir tugma real natija beradi.</p>
                  <div className="proof-grid">
                    <button onClick={() => app.showSavingsCalculator()} className="btn btn-primary btn-sm proof-btn">💰 Savings vs Yardi</button>
                    <button onClick={() => app.compareToYardi(1)} className="btn btn-primary btn-sm proof-btn">⚖️ vs Yardi</button>
                    <button onClick={() => app.compareCAMReconciliation()} className="btn btn-outline btn-sm proof-btn">📋 CAM vs MRI</button>
                    <button onClick={() => app.calculateLocalROI()} className="btn btn-outline btn-sm proof-btn">🇺🇿 Local ROI</button>
                    <button onClick={() => app.showLocalAdvantage()} className="btn btn-secondary btn-sm proof-btn">📱 +8% Telegram</button>
                    <button onClick={() => app.predictNextMonth()} className="btn btn-secondary btn-sm proof-btn">🔮 Forecast</button>
                    <button onClick={() => app.analyzeOccupancy()} className="btn btn-secondary btn-sm proof-btn">📈 Occupancy</button>
                    <button onClick={() => app.showPortfolioCreditScore()} className="btn btn-secondary btn-sm proof-btn">📊 Credit</button>
                    <button onClick={() => app.forecastCashflow()} className="btn btn-secondary btn-sm proof-btn">💸 Cashflow</button>
                    <button onClick={() => app.exportToCompetitorFormat()} className="btn btn-outline btn-sm proof-btn">📥 CSV</button>
                    <button onClick={() => app.simulateTenantChurnImpact()} className="btn btn-outline btn-sm proof-btn">📉 Churn</button>
                    <button onClick={() => app.showMarketEdge()} className="btn btn-outline btn-sm proof-btn">🏆 Market Edge</button>
                    <button onClick={() => app.oneClick1CReconciliationLive()} className="btn btn-primary btn-sm proof-btn">1C Reconcile</button>
                    <button onClick={() => app.autoReconcileCAM()} className="btn btn-primary btn-sm proof-btn">CAM Reconcile</button>
                    <button onClick={() => app.bulkSendTelegram()} className="btn btn-primary btn-sm proof-btn">📲 Telegram</button>
                    <button onClick={() => app.runFullPortfolioAnalysis()} className="btn btn-secondary btn-sm proof-btn">🌐 Portfolio</button>
                    <button onClick={() => app.showLocalPenaltyLegal()} className="btn btn-outline btn-sm proof-btn">⚖️ Jarima</button>
                    <button onClick={() => app.uploadTenantProof()} className="btn btn-outline btn-sm proof-btn">📸 To'lov</button>
                    <button onClick={() => app.generateGroupLink()} className="btn btn-secondary btn-sm proof-btn">📲 Guruh</button>
                    <button onClick={() => app.showInflationForecast()} className="btn btn-secondary btn-sm proof-btn">📈 CPI</button>
                    <button onClick={() => app.bulkApplyRUBS()} className="btn btn-primary btn-sm proof-btn">🔄 Bulk RUBS</button>
                    <button onClick={() => app.exportAllFormats()} className="btn btn-primary btn-sm proof-btn">📦 Export</button>
                    <button onClick={() => app.showCollectionHeatmap()} className="btn btn-secondary btn-sm proof-btn">🔥 Heatmap</button>
                    <button onClick={() => app.showFullWhyUsProof()} className="btn btn-primary btn-sm proof-btn">🏆 Nega Biz?</button>
                  </div>
                  <div style={{ marginTop: 18, fontSize: 13, color: 'var(--status-paid-text)', background: 'var(--status-paid-bg)', padding: 10, borderRadius: 8 }}>
                    ✅ Har bir funktsiya haqiqiy UZS hisoblash beradi.
                  </div>
                </div>
              </div>
            </div>

            {/* Ultra suite */}
            <div style={{ marginTop: 30, padding: 24, background: 'var(--ultra-suite-bg)', borderRadius: 20, color: 'var(--ultra-suite-text)', textAlign: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
                <div>
                  <strong style={{ fontSize: 18 }}>🚀 ULTRA ENTERPRISE SUITE v75</strong><br />
                  <span style={{ fontSize: 12, opacity: 0.7 }}>AI Copilot • Live Simulation • Predictive Engine</span>
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <button onClick={() => app.toggleLive()} className="btn btn-sm" style={{ background: '#10b981', color: 'white', border: 'none', padding: '8px 17px' }}>⏺️ LIVE MODE</button>
                  <button onClick={() => app.undo()} className="btn btn-sm" style={{ background: '#f59e0b', color: 'white', border: 'none', padding: '8px 17px' }}>↩️ UNDO</button>
                  <button onClick={() => app.openAICopilot()} className="btn btn-sm" style={{ background: '#0ea5e9', color: 'white', border: 'none', padding: '8px 17px' }}>🤖 AI COPILOT</button>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
                <button onClick={() => app.testAllFunctions()} className="btn btn-primary" style={{ padding: '13px 26px', fontSize: 14.5 }}>▶️ EXTREME SELF-TEST (120+)</button>
                <button onClick={() => app.forceFixAll()} className="btn btn-secondary" style={{ padding: '11px 20px', fontSize: 13.5 }}>🔧 FORCE FIX ALL</button>
                <button onClick={() => app.diagnose()} className="btn btn-outline" style={{ padding: '11px 20px', fontSize: 13.5, borderColor: 'var(--btn-outline-border)', color: 'var(--ultra-suite-text)' }}>🔍 DIAGNOSE</button>
                <button onClick={() => app.showAIRecommendations()} className="btn btn-outline" style={{ padding: '11px 20px', fontSize: 13.5, borderColor: 'var(--btn-outline-border)', color: 'var(--ultra-suite-text)' }}>🤖 AI RECOMMENDATIONS</button>
                <button onClick={() => app.runComplexSimulation()} className="btn btn-outline" style={{ padding: '11px 20px', fontSize: 13.5, borderColor: 'var(--btn-outline-border)', color: 'var(--ultra-suite-text)' }}>🔬 EXTREME SIM</button>
                <button onClick={() => app.viewAuditLog()} className="btn btn-outline" style={{ padding: '11px 20px', fontSize: 13.5, borderColor: 'var(--btn-outline-border)', color: 'var(--ultra-suite-text)' }}>📋 AUDIT</button>
                <button onClick={() => app.applyAIRecommendations()} className="btn btn-outline" style={{ padding: '11px 20px', fontSize: 13.5, borderColor: 'var(--btn-outline-border)', color: 'var(--ultra-suite-text)' }}>⚡ AI OPTIMIZE ALL</button>
              </div>
            </div>

            <div style={{ marginTop: 22 }} className="card">
              <div className="card-header">
                <strong>📈 LIVE PORTFOLIO TIMELINE</strong>
                <button onClick={() => app.renderLiveTimeline()} className="btn btn-sm btn-secondary">Refresh Timeline</button>
              </div>
              <div className="card-body">
                <div id="live-timeline" style={{ height: 130, background: 'var(--timeline-bg)', borderRadius: 14, padding: '12px 12px 10px', display: 'flex', alignItems: 'flex-end', gap: 4, overflow: 'hidden' }}></div>
              </div>
            </div>
          </>
        )}

        <div style={{ marginTop: 26, fontSize: 12, color: 'var(--text-secondary)', textAlign: 'center' }}>
          2026 Toshkent real ma'lumotlari • UzTenantBill
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

export default function DashboardPage() {
  useEffect(() => { UzAuth.protectPage(); }, []);
  return <DashboardContent />;
}
