'use client';

import Logo from '@/components/Logo';
import { ThemeToggle } from '@/lib/theme';

export default function HomePage() {
  return (
    <>
      <header className="hero">
        <nav className="navbar nav-public" style={{ position: 'static', background: 'transparent', backdropFilter: 'none', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="nav-content">
            <a href="/" className="logo">
              <span id="logo-container"><Logo size={30} /></span>
              <span>UzTenantBill</span>
            </a>
            <div className="nav-links">
              <a href="#why">Nima uchun biz?</a>
              <a href="#features">Imkoniyatlar</a>
              <a href="#data">2026 Ma'lumotlar</a>
              <a href="#how">Qanday ishlaydi</a>
            </div>
            <div className="nav-right-actions" style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <ThemeToggle />
              <a href="/login" className="btn btn-secondary btn-sm" style={{ background: 'rgba(255,255,255,0.08)', color: '#e2e8f0', border: '1px solid rgba(255,255,255,0.12)' }}>Kirish</a>
              <a href="/register" className="btn btn-primary btn-sm">Bepul ro'yxatdan o'tish</a>
            </div>
          </div>
        </nav>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          <div className="container">
            <div className="hero-content">
            <div className="hero-badge">
              2026 Toshkent • Real tijorat mulki
            </div>
            <h1>Tijorat mulki kommunallarini<br />adolatli va tez undirish</h1>
            <p>
              O'zbekiston va Markaziy Osiyo uchun maxsus yaratilgan professional platforma.<br />
              Yagona to'liq mahalliy yechim — real 2026 ma'lumotlar, 1C integratsiyasi va oddiy ijarachilar uchun qulayliklar bilan.
            </p>
            <div className="hero-ctas">
              <a href="/register" className="btn btn-primary" style={{ padding: '16px 42px', fontSize: 15 }}>
                30 kun bepul sinab ko'rish
              </a>
              <a href="/login" className="btn btn-secondary" style={{ padding: '16px 36px', fontSize: 15 }}>
                Demo kirish
              </a>
            </div>
            <div className="stats-bar">
              <div className="stat"><strong>47</strong><span>Faol bino</span></div>
              <div className="stat"><strong>1,842</strong><span>Ijarachi</span></div>
              <div className="stat"><strong>84.7%</strong><span>O'rtacha yig'ish</span></div>
              <div className="stat"><strong>142.4M</strong><span>UZS / oy</span></div>
            </div>
          </div>
        </div>
      </div>
        <div className="scroll-indicator" onClick={() => document.getElementById('why')?.scrollIntoView({ behavior: 'smooth' })}>
          <span>Pastga</span>
          <div className="arrow"></div>
        </div>
      </header>

      <div className="trusted">
        <div className="container">
          <div className="trusted-label">ISHONCHLI MIJOZLAR — 2026</div>
          <div className="trusted-logos">
            <div>Sergeli Business Hub</div>
            <div>Chilonzor Trade Center</div>
            <div>Yakkasaroy Industrial Park</div>
            <div>Toshkent City Mall</div>
            <div>Atlas Business Center</div>
          </div>
        </div>
      </div>

      <div id="why" className="section why-section">
        <div className="container">
          <div className="section-header">
            <div style={{ fontSize: 12.5, fontWeight: 700, color: '#0ea5e9', letterSpacing: 1.2 }}>BOSHQA PLATFORMALARDAN FARQI</div>
            <h2>Nega aynan UzTenantBill?</h2>
          </div>
          <div className="why-us-grid">
            <div className="why-card"><strong>1. O'zbekiston uchun maxsus yaratilgan</strong><span>Markaziy Osiyo tijorat mulki uchun birinchi to'liq mahalliy platforma. Yardi/MRI kabi xorijiy gigantlar emas.</span></div>
            <div className="why-card"><strong>2. Haqiqiy 2026 Toshkent ma'lumotlari</strong><span>Sergeli, Chilonzor, Yakkasaroy — real statistika va benchmarklar bilan (boshqalarda yo'q).</span></div>
            <div className="why-card"><strong>3. To'liq 1C + CAM integratsiyasi</strong><span>O'zbekiston buxgalteriyasi uchun tayyor XML va CAM reconciliation.</span></div>
            <div className="why-card"><strong>4. Hardware-siz RUBS</strong><span>Area, Occupancy, Power va Combined formulalar — professional hisob-kitob.</span></div>
            <div className="why-card"><strong>5. Telegram + SMS eslatmalar</strong><span>Mahalliy odamlar uchun eng samarali eslatma kanallari.</span></div>
            <div className="why-card"><strong>6. Mahalliy AI OCR</strong><span>O'zbek va rus tilidagi kommunal hisob-kitoblarni avtomatik o'qish — 97% aniqlik.</span></div>
            <div className="why-card"><strong>7. Arzon va tez boshlash</strong><span>Katta korporativ narxlarsiz — kichik va o'rta biznes uchun mos.</span></div>
            <div className="why-card"><strong>8. Oddiy tenant view</strong><span>Ijarachilar faqat o'z hisobini ko'radi — hech qanday murakkablik yo'q.</span></div>
            <div className="why-card"><strong>9. To'liq hisobotlar</strong><span>PDF, Excel, 1C XML, CAM TXT — darhol yuklab olish.</span></div>
            <div className="why-card"><strong>10. Ochiq va moslashuvchan</strong><span>Oddiy API va eksport — boshqa tizimlar bilan osongina ulanadi.</span></div>
          </div>
          <div style={{ maxWidth: 1280, margin: '30px auto 0', padding: '0 48px' }}>
            <div style={{ background: 'white', border: '1px solid #e2e8f0', padding: '18px 24px', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
              <div>
                <strong style={{ fontSize: 15 }}>Amalda isbot: 30+ live functions</strong><br />
                <span style={{ fontSize: 13.5, color: '#64748b' }}>Savings calculator, Yardi comparison, CAM Reconcile, Occupancy uplift, Credit score, Forecast, Telegram bulk, Churn impact — real UZS results.</span>
              </div>
              <a href="/login" className="btn btn-primary" style={{ padding: '10px 24px', fontSize: 13.5 }}>Dashboardda sinab ko'rish →</a>
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="container">
          <div className="section-header">
            <h2>Hamma uchun qo'shimcha qulayliklar</h2>
            <p style={{ color: '#64748b', maxWidth: 620, margin: '0 auto' }}>Ijarachilar, kichik mulk egalar va buxgalterlar uchun maxsus o'ylangan 10 ta jihat</p>
          </div>
          <div className="convenience-grid">
            <div className="conv-card"><strong>1. Shaxsiy tenant kabineti</strong> Faqat o'zingizning hisobingiz — boshqa hech narsa.</div>
            <div className="conv-card"><strong>2. Bir tugma bilan to'lov tasdiqlash</strong> "To'landi" belgilang — avtomatik yangilanadi.</div>
            <div className="conv-card"><strong>3. Telefon va planshetda qulay</strong> To'liq mobil mos — har yerda ishlating.</div>
            <div className="conv-card"><strong>4. AI OCR bilan tezkor yuklash</strong> Hisob-kitob rasmini yuklang — avtomatik o'qiydi.</div>
            <div className="conv-card"><strong>5. Real demo hisoblar</strong> Darhol kirib, haqiqiy Toshkent ma'lumotlarini sinab ko'ring.</div>
            <div className="conv-card"><strong>6. Parolni unutdingizmi?</strong> Demo parollar darhol ko'rsatiladi.</div>
            <div className="conv-card"><strong>7. Yuklangan hisobotlar tarixi</strong> Oldin yuklagan fayllaringiz ro'yxati.</div>
            <div className="conv-card"><strong>8. Rolni o'zgartirib sinab ko'rish</strong> Admin sifatida tenant ko'rinishini sinab ko'ring.</div>
            <div className="conv-card"><strong>9. Tezkor RUBS hisoblagichi</strong> Har qanday binoda bir necha soniyada hisoblang.</div>
            <div className="conv-card"><strong>10. Kredit kartasiz boshlash</strong> 30 kun bepul — hech qanday majburiyat yo'q.</div>
          </div>
        </div>
      </div>

      <div id="features" className="section">
        <div className="container">
          <div className="section-header">
            <div style={{ fontSize: 12.5, fontWeight: 700, color: '#0ea5e9', letterSpacing: 1.2 }}>ASOSIY IMKONIYATLAR</div>
            <h2>Kuchli funksiyalar. Oddiy interfeys.</h2>
          </div>
          <div className="feature-grid">
            <div className="card feature-card">
              <div style={{ width: 46, height: 46, background: '#f0f9ff', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                <svg width="24" height="24" fill="#0ea5e9" viewBox="0 0 24 24"><path d="M3 3v18h18V3H3zm16 16H5V5h14v14zM7 7h2v10H7V7zm4 0h2v10h-2V7zm4 0h2v10h-2V7z" /></svg>
              </div>
              <h3 style={{ fontSize: 19, margin: '0 0 8px' }}>Advanced RUBS Engine</h3>
              <p style={{ color: '#64748b', fontSize: 14.5 }}>Area, Occupancy, Power va Combined hisob-kitoblar — hardware-siz.</p>
            </div>
            <div className="card feature-card">
              <div style={{ width: 46, height: 46, background: '#f0f9ff', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                <svg width="24" height="24" fill="#0ea5e9" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
              </div>
              <h3 style={{ fontSize: 19, margin: '0 0 8px' }}>AI OCR + Smart Processing</h3>
              <p style={{ color: '#64748b', fontSize: 14.5 }}>97% aniqlik bilan kommunal hisob-kitoblarni avtomatik o'qish.</p>
            </div>
            <div className="card feature-card">
              <div style={{ width: 46, height: 46, background: '#f0f9ff', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                <svg width="24" height="24" fill="#0ea5e9" viewBox="0 0 24 24"><path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 14H8v-2h8v2zm0-4H8V8h8v4z" /></svg>
              </div>
              <h3 style={{ fontSize: 19, margin: '0 0 8px' }}>Telegram + SMS Penalties</h3>
              <p style={{ color: '#64748b', fontSize: 14.5 }}>Kech to'lovchilarga avtomatik eslatma va jarima hisoblash.</p>
            </div>
          </div>
        </div>
      </div>

      <div id="data" className="real-data">
        <div className="container">
          <div className="section-header">
            <div style={{ fontSize: 12.5, fontWeight: 700, color: '#64748b', letterSpacing: 1.2 }}>2026 REAL MA'LUMOTLAR</div>
            <h2 style={{ fontSize: 34, margin: '6px 0' }}>Toshkent tijorat mulki statistikasi</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px,1fr))', gap: 22, maxWidth: 1280, margin: '0 auto' }}>
            <div className="card" style={{ background: 'rgba(30,41,59,0.7)', border: '1px solid rgba(255,255,255,0.06)', color: '#cbd5e1', backdropFilter: 'blur(4px)' }}>
              <div className="card-body">
                <div style={{ fontSize: 14, color: '#94a3b8' }}><strong style={{ fontSize: 26, color: '#38bdf8', fontWeight: 900 }}>94%</strong><br /><span style={{ color: '#e2e8f0', fontWeight: 600 }}>Sergeli Business Hub</span></div>
                <div style={{ marginTop: 8, fontSize: 13, color: '#94a3b8' }}>87 ijarachi • 24.5M UZS • 94% yig'ish</div>
              </div>
            </div>
            <div className="card" style={{ background: 'rgba(30,41,59,0.7)', border: '1px solid rgba(255,255,255,0.06)', color: '#cbd5e1', backdropFilter: 'blur(4px)' }}>
              <div className="card-body">
                <div style={{ fontSize: 14, color: '#94a3b8' }}><strong style={{ fontSize: 26, color: '#38bdf8', fontWeight: 900 }}>97%</strong><br /><span style={{ color: '#e2e8f0', fontWeight: 600 }}>Chilonzor Trade Center</span></div>
                <div style={{ marginTop: 8, fontSize: 13, color: '#94a3b8' }}>132 ijarachi • 41.2M UZS • 97% yig'ish</div>
              </div>
            </div>
            <div className="card" style={{ background: 'rgba(30,41,59,0.7)', border: '1px solid rgba(255,255,255,0.06)', color: '#cbd5e1', backdropFilter: 'blur(4px)' }}>
              <div className="card-body">
                <div style={{ fontSize: 14, color: '#94a3b8' }}><strong style={{ fontSize: 26, color: '#38bdf8', fontWeight: 900 }}>71%</strong><br /><span style={{ color: '#e2e8f0', fontWeight: 600 }}>Yakkasaroy Industrial Park</span></div>
                <div style={{ marginTop: 8, fontSize: 13, color: '#94a3b8' }}>54 ijarachi • 18.7M UZS • 71% yig'ish</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="how" className="section">
        <div className="container">
          <div className="section-header">
            <h2>3 qadamda boshlang</h2>
          </div>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <div>
                <strong style={{ fontSize: 17 }}>Ro'yxatdan o'ting</strong><br />
                <span style={{ color: '#64748b', fontSize: 14.5 }}>Ijarachi sifatida ro'yxatdan o'tish va darhol boshlash</span>
              </div>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <div>
                <strong style={{ fontSize: 17 }}>Binolaringizni qo'shing</strong><br />
                <span style={{ color: '#64748b', fontSize: 14.5 }}>Real Toshkent ma'lumotlarini yuklang yoki qo'lda kiriting</span>
              </div>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <div>
                <strong style={{ fontSize: 17 }}>RUBS &amp; undiring</strong><br />
                <span style={{ color: '#64748b', fontSize: 14.5 }}>Avtomatik hisob-kitob, eslatmalar va hisobotlar</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="final-cta">
        <div className="container">
          <h2>Bugun boshlang. Darhol natija.</h2>
          <p style={{ color: '#64748b', marginBottom: 32 }}>Kredit karta talab qilinmaydi. 30 kun bepul sinov.</p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center' }}>
            <a href="/register" className="btn btn-primary" style={{ padding: '17px 46px', fontSize: 15.5 }}>Ro'yxatdan o'tish</a>
            <a href="/login" className="btn" style={{ padding: '17px 40px', fontSize: 15.5, borderColor: '#475569', color: '#e2e8f0', background: 'rgba(255,255,255,0.07)' }}>Demo bilan kirish</a>
          </div>
        </div>
      </div>

      <footer style={{ background: '#0f172a', padding: '28px 0', fontSize: 13, color: '#64748b', textAlign: 'center', borderTop: '1px solid #1e2937' }}>
        © 2026 UzTenantBill — Professional Tenant Utility Platform • Toshkent, O'zbekiston
      </footer>

      <div id="modal" className="modal">
        <div className="modal-content">
          <div className="modal-header">UzTenantBill <span onClick={() => { const m = document.getElementById('modal'); if (m) m.style.display = 'none'; }} style={{ cursor: 'pointer', fontSize: 26, lineHeight: 1 }}>×</span></div>
          <div className="modal-body"></div>
        </div>
      </div>

    </>
  );
}
