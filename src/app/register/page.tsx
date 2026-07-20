'use client';

import { useState } from 'react';
import Logo from '@/components/Logo';
import { UzAuth } from '@/lib/auth';
import { ThemeToggle } from '@/lib/theme';

export default function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+998');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const role = 'tenant';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Parollar mos kelmadi!");
      return;
    }
    const result = UzAuth.registerUser({ fullName, company, email, phone, password, role });
    if (result.success && result.user) {
      UzAuth.setCurrentUser(result.user);
      alert("Ro'yxatdan o'tish muvaffaqiyatli! Dashboardga o'tilmoqda...");
      window.location.href = '/dashboard';
    } else {
      alert(result.error);
    }
  };

  const togglePasswordVisibility = (inputId: string, eyeId: string) => {
    const input = document.getElementById(inputId) as HTMLInputElement;
    const eye = document.getElementById(eyeId);
    if (!input) return;
    if (input.type === 'password') {
      input.type = 'text';
      if (eye) eye.textContent = '🙈';
    } else {
      input.type = 'password';
      if (eye) eye.textContent = '👁️';
    }
  };

  const checkStrength = (val: string) => {
    const container = document.getElementById('password-strength');
    const bar = document.getElementById('strength-bar');
    const text = document.getElementById('strength-text');
    if (!container || !bar || !text) return;

    let score = 0;
    let label = '';
    let color = '#ef4444';

    if (val.length >= 6) score += 1;
    if (val.length >= 8) score += 1;
    if (/[A-Z]/.test(val)) score += 1;
    if (/[0-9]/.test(val)) score += 1;
    if (/[^A-Za-z0-9]/.test(val)) score += 1;

    container.style.display = 'block';
    text.style.display = 'block';

    if (score <= 1) { label = 'Zaif'; color = '#ef4444'; (bar as HTMLElement).style.width = '25%'; }
    else if (score === 2) { label = "O'rtacha"; color = '#f59e0b'; (bar as HTMLElement).style.width = '50%'; }
    else if (score === 3) { label = 'Yaxshi'; color = '#10b981'; (bar as HTMLElement).style.width = '75%'; }
    else { label = 'Kuchli'; color = '#10b981'; (bar as HTMLElement).style.width = '100%'; }

    (bar as HTMLElement).style.background = color;
    text.style.color = color;
    text.textContent = label;
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <Logo size={28} />
            <span className="logo-text" style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.5 }}>UzTenantBill</span>
          </div>
          <div style={{ fontSize: 14.5, color: 'var(--text-secondary)' }}>Ro'yxatdan o'ting — 30 kun bepul</div>
        </div>

        <div style={{ padding: '26px 32px 30px' }}>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 5 }}>To'liq ism</label>
              <input type="text" className="premium-input" required placeholder="Ism Familiya" value={fullName} onChange={e => setFullName(e.target.value)} />
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 5 }}>Kompaniya / Bino nomi</label>
              <input type="text" className="premium-input" required placeholder="Masalan: Chilonzor Trade Center" value={company} onChange={e => setCompany(e.target.value)} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 5 }}>Email</label>
                <input type="email" className="premium-input" required placeholder="siz@kompaniya.uz" value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 5 }}>Telefon</label>
                <input type="tel" className="premium-input" required value={phone} onChange={e => setPhone(e.target.value)} />
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 5 }}>Parol</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="password"
                  id="password"
                  className="premium-input"
                  required minLength={6}
                  placeholder="Kamida 6 ta belgi"
                  value={password}
                  onChange={e => { setPassword(e.target.value); checkStrength(e.target.value); }}
                />
                <span onClick={() => togglePasswordVisibility('password', 'reg-eye')} id="reg-eye"
                  style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', fontSize: 17, opacity: 0.6 }}>👁️</span>
              </div>
              <div id="password-strength" style={{ marginTop: 6, height: 4, background: 'var(--input-border)', borderRadius: 999, overflow: 'hidden', display: 'none' }}>
                <div id="strength-bar" style={{ height: 4, width: '0%', transition: 'width .3s', background: '#ef4444' }}></div>
              </div>
              <small id="strength-text" style={{ fontSize: 11, color: 'var(--muted)', display: 'none', marginTop: 3 }}></small>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 5 }}>Parolni tasdiqlang</label>
              <input type="password" className="premium-input" required minLength={6} placeholder="Parolni qayta kiriting"
                value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
            </div>

            <div style={{ marginBottom: 16, padding: '10px 14px', background: 'var(--row-highlight-bg)', borderRadius: 10, fontSize: 13.5, border: '1px solid var(--card-hover-border)', display: 'flex', alignItems: 'center', gap: 8, color: 'var(--accent)' }}>
              <span>👤</span>
              <span><strong>Ijarachi</strong> sifatida ro'yxatdan o'tmoqdasiz</span>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: 13, marginTop: 10, fontSize: 15, fontWeight: 700 }}>
              Ro'yxatdan o'tish
            </button>
          </form>

          <div style={{ marginTop: 20, textAlign: 'center', fontSize: 13.5, color: 'var(--text-secondary)' }}>
            Allaqachon hisobingiz bormi? <a href="/login" style={{ color: 'var(--accent)', fontWeight: 600 }}>Kirish</a>
          </div>
        </div>
      </div>

      <div id="modal" className="modal">
        <div className="modal-content">
          <div className="modal-header">UzTenantBill <span onClick={() => { const m = document.getElementById('modal'); if (m) m.style.display = 'none'; }} style={{ cursor: 'pointer', fontSize: 26, lineHeight: 1 }}>×</span></div>
          <div className="modal-body"></div>
        </div>
      </div>

      <div className="floating-theme-toggle">
        <ThemeToggle />
      </div>
    </div>
  );
}
