'use client';

import { useEffect, useState } from 'react';
import Logo from '@/components/Logo';
import { useApp } from '@/lib/app-engine';
import { UzAuth } from '@/lib/auth';
import { ThemeToggle } from '@/lib/theme';
import type { User } from '@/lib/types';

function TenantsContent() {
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
      if (app.renderTenantsTable) app.renderTenantsTable();
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
            {currentUser?.role !== 'tenant' && <a href="/buildings">Binolar</a>}
            <a href="/tenants" className="active">Ijarachilar</a>
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
            <h1 style={{ margin: 0, fontSize: 29, fontWeight: 800 }}>Ijarachilar</h1>
            <p style={{ margin: '6px 0 0', color: '#64748b' }}>Barcha ijarachilar va to'lov holati</p>
          </div>
          <div className="admin-only">
            <button onClick={() => app.sendBulkReminders()} className="btn btn-secondary">Ommaviy eslatma</button>
            <button onClick={() => app.bulkMarkPaid()} className="btn btn-secondary">Bulk To'landi</button>
            <button onClick={() => app.showCollectionHeatmap()} className="btn btn-outline">Heatmap</button>
          </div>
        </div>

        <div className="card">
          <div className="card-body" style={{ padding: 0 }}>
            <div className="table-filter">
              <input id="tenant-search" className="advanced-input" placeholder="Ijarachi qidirish..." style={{ maxWidth: 210 }} onKeyUp={() => app.renderTenantsTable()} />
              <select id="tenant-status-filter" className="advanced-input" style={{ maxWidth: 140 }} onChange={() => app.renderTenantsTable()}>
                <option value="">Barcha statuslar</option>
                <option value="paid">Paid</option>
                <option value="partial">Partial</option>
                <option value="late">Late</option>
              </select>
              <button onClick={() => app.renderTenantsTable()} className="btn btn-sm btn-outline">Filter</button>
              <button onClick={() => app.bulkMarkPaid()} className="btn btn-sm btn-success admin-only">Bulk To'landi</button>
            </div>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Ijarachi</th><th>Unit / Bino</th><th>Maydon</th><th>Oylik hisob</th><th>To'langan</th><th>Status</th><th>Balance</th><th>Harakatlar</th>
                  </tr>
                </thead>
                <tbody id="tenants-table"></tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="admin-only" style={{ marginTop: 12, fontSize: 12.5, color: '#64748b' }}>
          Faqat admin va buxgalter to'liq ma'lumotlarni ko'radi.
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

export default function TenantsPage() {
  useEffect(() => { UzAuth.protectPage(); }, []);
  return <TenantsContent />;
}
