// UzTenantBill — Auth System (2026)
// Professional Enterprise Auth — Real registration + password login
// Role-based: admin, accountant, tenant
import type { User } from './types';

const AUTH_KEY = 'uztenantbill_users';
const CURRENT_KEY = 'uztenantbill_current';

function seedDemoUsers(): void {
  const existing = localStorage.getItem(AUTH_KEY);
  if (existing) return;

  const demoUsers: User[] = [
    { id: 1, fullName: "Alisher Karimov", company: "Sergeli Business Hub", email: "admin@uztenantbill.uz", phone: "+998901234567", password: "admin123", role: "admin", created: "2026-01-15" },
    { id: 2, fullName: "Dilshod Rakhimov", company: "Yakkasaroy Industrial Park", email: "accountant@uztenantbill.uz", phone: "+998935556677", password: "account123", role: "accountant", created: "2026-02-03" },
    { id: 3, fullName: "Nodira Alimova", company: "Chilonzor Trade Center", email: "tenant@uztenantbill.uz", phone: "+998977778899", password: "tenant123", role: "tenant", created: "2026-03-10" }
  ];

  localStorage.setItem(AUTH_KEY, JSON.stringify(demoUsers));
}

function getUsers(): User[] {
  seedDemoUsers();
  return JSON.parse(localStorage.getItem(AUTH_KEY) || '[]');
}

function saveUsers(users: User[]): void {
  localStorage.setItem(AUTH_KEY, JSON.stringify(users));
}

function getCurrentUser(): User | null {
  const user = localStorage.getItem(CURRENT_KEY);
  return user ? JSON.parse(user) : null;
}

function setCurrentUser(user: User): void {
  localStorage.setItem(CURRENT_KEY, JSON.stringify(user));
}

function logout(): void {
  localStorage.removeItem(CURRENT_KEY);
  window.location.href = '/login';
}

function registerUser(userData: { fullName: string; company: string; email: string; phone: string; password: string; role: string }): { success: boolean; user?: User; error?: string } {
  const users = getUsers();

  if (users.find(u => u.email.toLowerCase() === userData.email.toLowerCase())) {
    return { success: false, error: "Bu email allaqachon ro'yxatdan o'tgan." };
  }

  const newUser: User = {
    id: Date.now(),
    fullName: userData.fullName.trim(),
    company: userData.company.trim(),
    email: userData.email.trim().toLowerCase(),
    phone: userData.phone.trim(),
    password: userData.password,
    role: userData.role as User['role'],
    created: new Date().toISOString().split('T')[0]
  };

  users.push(newUser);
  saveUsers(users);

  return { success: true, user: newUser };
}

function loginUser(email: string, password: string): { success: boolean; user?: User; error?: string } {
  const users = getUsers();
  const user = users.find(u =>
    u.email.toLowerCase() === email.toLowerCase() &&
    u.password === password
  );

  if (user) {
    const safeUser = { ...user };
    delete safeUser.password;
    setCurrentUser(safeUser);
    return { success: true, user: safeUser };
  }

  return { success: false, error: "Email yoki parol noto'g'ri." };
}

function protectPage(allowedRoles: string[] = ['admin', 'accountant', 'tenant']): User | null {
  const current = getCurrentUser();

  if (!current) {
    window.location.href = '/login';
    return null;
  }

  if (!allowedRoles.includes(current.role)) {
    alert("Sizning rolingiz bu sahifaga ruxsat bermaydi.");
    window.location.href = '/dashboard';
    return null;
  }

  return current;
}

function updateNavbar(): void {
  const current = getCurrentUser();
  const navUser = document.getElementById('nav-user');

  if (!navUser) return;

  if (current) {
    navUser.innerHTML = `
      <div class="user-info">
        <div class="user-details">
          <strong>${current.fullName}</strong>
          <span>${current.company}</span>
        </div>
        <span class="role-badge" style="background:rgba(255,255,255,0.1); color:#cbd5e1; padding:3px 10px; border-radius:999px; font-size:10.5px; font-weight:700; text-transform:uppercase; letter-spacing:0.4px;">${current.role === 'admin' ? '👑 Admin' : current.role === 'accountant' ? '📊 Hisobchi' : '👤 Ijarachi'}</span>
        <button onclick="window.location.href='/login'; localStorage.removeItem('uztenantbill_current')" class="btn-logout">🚪 Chiqish</button>
      </div>
    `;
  }
}

function togglePasswordVisibility(inputId: string, iconId: string): void {
  const input = document.getElementById(inputId) as HTMLInputElement | null;
  const icon = document.getElementById(iconId);

  if (!input) return;

  if (input.type === 'password') {
    input.type = 'text';
    if (icon) icon.textContent = '🙈';
  } else {
    input.type = 'password';
    if (icon) icon.textContent = '👁️';
  }
}

function checkPasswordStrength(): void {
  const input = document.getElementById('password') as HTMLInputElement | null;
  const container = document.getElementById('password-strength');
  const bar = document.getElementById('strength-bar');
  const text = document.getElementById('strength-text');

  if (!input || !container || !bar || !text) return;

  const val = input.value;
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

  if (score <= 1) { label = 'Zaif'; color = '#ef4444'; bar.style.width = '25%'; }
  else if (score === 2) { label = "O'rtacha"; color = '#f59e0b'; bar.style.width = '50%'; }
  else if (score === 3) { label = 'Yaxshi'; color = '#10b981'; bar.style.width = '75%'; }
  else { label = 'Kuchli'; color = '#10b981'; bar.style.width = '100%'; }

  (bar as HTMLElement).style.background = color;
  text.style.color = color;
  text.textContent = label;
}

function forgotPassword(): void {
  const email = prompt("Parolni unutdingizmi?\n\nEmailingizni kiriting (demo uchun):\n• admin@uztenantbill.uz\n• accountant@uztenantbill.uz\n• tenant@uztenantbill.uz");

  if (!email) return;

  const users = getUsers();
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

  if (user) {
    alert(`✅ Parol tiklash\n\nHisob: ${user.fullName}\nDemo parol: ${user.password}\n\nHaqiqiy loyihada email yuboriladi.`);
  } else {
    alert("Bunday email topilmadi.\n\nDemo hisoblar:\n• admin@uztenantbill.uz (admin123)\n• accountant@uztenantbill.uz (account123)\n• tenant@uztenantbill.uz (tenant123)");
  }
}

export const UzAuth = {
  registerUser,
  loginUser,
  getCurrentUser,
  setCurrentUser,
  logout,
  protectPage,
  updateNavbar,
  togglePasswordVisibility,
  forgotPassword,
  checkPasswordStrength
};

// Make available globally for inline onclick handlers
if (typeof window !== 'undefined') {
  (window as any).UzAuth = UzAuth;
}
