'use client';

import { useEffect, useState } from 'react';
import Logo from '@/components/Logo';
import { useApp } from '@/lib/app-engine';
import { UzAuth } from '@/lib/auth';
import { ThemeToggle } from '@/lib/theme';
import type { User } from '@/lib/types';

function BuildingsContent() {
  const app = useApp();
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const user = UzAuth.protectPage();
    if (!user) return;
    setCurrentUser(user);

    // Tenantlarni qayta yo'naltirish
    if (user.role === 'tenant') {
      window.location.href = '/dashboard';
      return;
    }

    UzAuth.updateNavbar();

    setTimeout(() => {
      if (app.renderBuildingsTable) app.renderBuildingsTable();
    }, 80);
  }, []);

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
            <a href="/buildings" className="active">Binolar</a>
            {currentUser?.role !== 'tenant' && <a href="/tenants">Ijarachilar</a>}
            <a href="/billing">Billing</a>
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
            <h1 style={{ margin: 0, fontSize: 29, fontWeight: 800 }}>Binolar</h1>
            <p style={{ margin: '6px 0 0', color: 'var(--text-secondary)' }}>2026 Toshkent tijorat mulki — real ma'lumotlar</p>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button onClick={() => app.addNewBuilding()} className="btn btn-primary">+ Yangi bino qo'shish</button>
            <button onClick={() => app.uploadOCR()} className="btn btn-secondary">AI OCR yuklash</button>
            <button onClick={() => app.showLocalPenaltyLegal()} className="btn btn-secondary">5% Jarima hisoblash</button>
            <button onClick={() => app.exportCAMTo1C()} className="btn btn-outline">1C + CAM Export</button>
            <button onClick={() => app.showBuildingBenchmark(1)} className="btn btn-outline">Real Benchmark</button>
            <button onClick={() => app.analyzeOccupancy()} className="btn btn-outline">Occupancy Uplift</button>
            <button onClick={() => app.forecastCashflow()} className="btn btn-secondary">Cashflow Forecast</button>
            <button onClick={() => app.compareToYardi(1)} className="btn btn-outline">vs Yardi</button>
            <button onClick={() => app.calculateLocalROI()} className="btn btn-secondary">Local ROI</button>
            <button onClick={() => app.showMarketEdge()} className="btn btn-outline">Market Edge</button>
          </div>
        </div>

        <div className="card">
          <div className="card-body" style={{ padding: 0 }}>
            <div className="table-filter">
              <input id="bldg-search" className="advanced-input" placeholder="Bino qidirish..." style={{ maxWidth: 240 }} onKeyUp={() => app.renderBuildingsTable()} />
              <select id="bldg-filter-loc" className="advanced-input" style={{ maxWidth: 160 }} onChange={() => app.renderBuildingsTable()}>
                <option value="">Barcha hududlar</option>
                <option>Sergeli</option><option>Yakkasaroy</option><option>Chilonzor</option><option>Mirabad</option><option>Mirzo Ulug'bek</option>
              </select>
              <button onClick={() => app.renderBuildingsTable()} className="btn btn-sm btn-outline">Filtrla</button>
            </div>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Bino nomi</th><th>Hudud</th><th>Maydon</th><th>Ijarachilar</th><th>Oylik</th><th>Yig'ish</th><th>Harakatlar</th>
                  </tr>
                </thead>
                <tbody id="buildings-table"></tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div id="modal" className="modal">
        <div className="modal-content">
          <div className="modal-header">RUBS hisoblash <span onClick={() => { const m = document.getElementById('modal'); if (m) m.style.display = 'none'; }} style={{ cursor: 'pointer', fontSize: 26 }}>×</span></div>
          <div className="modal-body"></div>
        </div>
      </div>
    </>
  );
}

export default function BuildingsPage() {
  useEffect(() => { UzAuth.protectPage(); }, []);
  return <BuildingsContent />;
}
