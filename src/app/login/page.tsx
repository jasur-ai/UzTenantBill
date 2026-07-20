'use client';

import { useEffect, useState } from 'react';
import Logo from '@/components/Logo';
import { UzAuth } from '@/lib/auth';
import { ThemeToggle } from '@/lib/theme';

function LoginContent() {
  const [email, setEmail] = useState('admin@uztenantbill.uz');
  const [password, setPassword] = useState('admin123');

  useEffect(() => {
    const logoContainer = document.getElementById('logo-container');
    if (logoContainer && typeof document !== 'undefined') {
      // Logo is rendered via React
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = UzAuth.loginUser(email, password);
    if (result.success) {
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

  const forgotPassword = () => {
    alert('Demo parollar:\n\nAdmin: admin123\nAccountant: account123\nTenant: tenant123');
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-header">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 10 }}>
            <div id="logo-container"><Logo size={32} /></div>
            <span style={{ fontSize: 26, fontWeight: 800, letterSpacing: -1, color: '#0f172a' }}>UzTenantBill</span>
          </div>
          <div style={{ fontSize: 14, color: '#64748b' }}>2026 Toshkent tijorat mulki platformasi</div>
        </div>

        <div style={{ padding: '28px 32px 32px' }}>
          <div style={{ marginBottom: 22 }}>
            <h2 style={{ margin: '0 0 4px 0', fontSize: 23, fontWeight: 800 }}>Kirish</h2>
            <p style={{ margin: 0, color: '#64748b', fontSize: 14.5 }}>Hisobingizga kiring</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 18 }}>
              <label style={{ display: 'block', fontSize: 13.5, fontWeight: 600, marginBottom: 6 }}>Email</label>
              <input
                type="email"
                className="premium-input"
                required
                placeholder="siz@kompaniya.uz"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            <div style={{ marginBottom: 18 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <label style={{ fontSize: 13.5, fontWeight: 600 }}>Parol</label>
                <a href="#" onClick={(e) => { e.preventDefault(); forgotPassword(); }} style={{ fontSize: 12.5, color: '#0ea5e9', fontWeight: 600 }}>Parolni unutdingizmi?</a>
              </div>
              <div style={{ position: 'relative' }}>
                <input
                  type="password"
                  id="password"
                  className="premium-input"
                  required
                  placeholder="Parolingiz"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                <span
                  onClick={() => togglePasswordVisibility('password', 'login-eye')}
                  id="login-eye"
                  style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', fontSize: 18, opacity: 0.6 }}
                >👁️</span>
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: 14, fontSize: 15.5, fontWeight: 700, marginTop: 8 }}>
              Kirish
            </button>
          </form>

          <div className="demo-box" style={{ marginTop: 24 }}>
            <div style={{ fontWeight: 700, marginBottom: 8, color: '#334155', fontSize: 13.5 }}>Demo hisoblar</div>
            <div style={{ fontSize: 13.2, color: '#475569', lineHeight: 1.65 }}>
              <div><strong>Admin:</strong> admin@uztenantbill.uz / admin123</div>
              <div><strong>Accountant:</strong> accountant@uztenantbill.uz / account123</div>
              <div><strong>Tenant:</strong> tenant@uztenantbill.uz / tenant123</div>
            </div>
          </div>

          <div style={{ marginTop: 20, textAlign: 'center', fontSize: 14 }}>
            Hisobingiz yo'qmi? <a href="/register" style={{ color: '#0ea5e9', fontWeight: 700 }}>Ro'yxatdan o'tish</a>
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

export default function LoginPage() {
  return <LoginContent />;
}
