/**
 * UzTenantBill - Professional Enterprise Auth System (2026)
 * Real registration + password login
 * Role-based: admin, accountant, tenant
 */

const AUTH_KEY = 'uztenantbill_users';
const CURRENT_KEY = 'uztenantbill_current';

// Seed demo users
function seedDemoUsers() {
  const existing = localStorage.getItem(AUTH_KEY);
  if (existing) return;
  
  const demoUsers = [
    {
      id: 1,
      fullName: "Alisher Karimov",
      company: "Sergeli Business Hub",
      email: "admin@uztenantbill.uz",
      phone: "+998901234567",
      password: "admin123",
      role: "admin",
      created: "2026-01-15"
    },
    {
      id: 2,
      fullName: "Dilshod Rakhimov",
      company: "Yakkasaroy Industrial Park",
      email: "accountant@uztenantbill.uz",
      phone: "+998935556677",
      password: "account123",
      role: "accountant",
      created: "2026-02-03"
    },
    {
      id: 3,
      fullName: "Nodira Alimova",
      company: "Chilonzor Trade Center",
      email: "tenant@uztenantbill.uz",
      phone: "+998977778899",
      password: "tenant123",
      role: "tenant",
      created: "2026-03-10"
    }
  ];
  
  localStorage.setItem(AUTH_KEY, JSON.stringify(demoUsers));
}

function getUsers() {
  seedDemoUsers();
  return JSON.parse(localStorage.getItem(AUTH_KEY) || '[]');
}

function saveUsers(users) {
  localStorage.setItem(AUTH_KEY, JSON.stringify(users));
}

function getCurrentUser() {
  const user = localStorage.getItem(CURRENT_KEY);
  return user ? JSON.parse(user) : null;
}

function setCurrentUser(user) {
  localStorage.setItem(CURRENT_KEY, JSON.stringify(user));
}

function logout() {
  localStorage.removeItem(CURRENT_KEY);
  window.location.href = 'login.html';
}

// Register
function registerUser(userData) {
  const users = getUsers();
  
  if (users.find(u => u.email.toLowerCase() === userData.email.toLowerCase())) {
    return { success: false, error: "Bu email allaqachon ro'yxatdan o'tgan." };
  }
  
  const newUser = {
    id: Date.now(),
    fullName: userData.fullName.trim(),
    company: userData.company.trim(),
    email: userData.email.trim().toLowerCase(),
    phone: userData.phone.trim(),
    password: userData.password,
    role: userData.role || "admin",
    created: new Date().toISOString().split('T')[0]
  };
  
  users.push(newUser);
  saveUsers(users);
  
  return { success: true, user: newUser };
}

// Login
function loginUser(email, password) {
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
  
  return { success: false, error: "Email yoki parol noto‘g‘ri." };
}

// Protect page: redirects unauthenticated users to login
function protectPage(allowedRoles = ['admin', 'accountant', 'tenant']) {
  const current = getCurrentUser();
  
  if (!current) {
    // Redirect to login
    window.location.href = 'login.html';
    return null;
  }
  
  if (!allowedRoles.includes(current.role)) {
    alert("Sizning rolingiz bu sahifaga ruxsat bermaydi.");
    window.location.href = 'dashboard.html';
    return null;
  }
  
  // Update navbar if present
  setTimeout(() => {
    updateNavbar();
  }, 30);
  
  return current;
}

function updateNavbar() {
  const current = getCurrentUser();
  const navUser = document.getElementById('nav-user');
  
  if (!navUser) return;
  
  if (current) {
    navUser.innerHTML = `
      <div class="user-info" style="display:flex; align-items:center; gap:12px;">
        <div style="text-align:right; line-height:1.1;">
          <strong style="font-size:14px;">${current.fullName}</strong><br>
          <span style="font-size:11.5px; color:#64748b;">${current.company}</span>
        </div>
        <span class="role-badge">${current.role}</span>
        <button onclick="logout()" class="btn btn-sm btn-secondary" style="padding:6px 15px; font-size:13px;">Chiqish</button>
      </div>
    `;
  } else {
    navUser.innerHTML = `
      <a href="login.html" class="btn btn-sm btn-secondary">Kirish</a>
      <a href="register.html" class="btn btn-sm btn-primary">Ro'yxatdan o'tish</a>
    `;
  }
}

function togglePasswordVisibility(inputId, iconId) {
  const input = document.getElementById(inputId);
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

window.checkPasswordStrength = function() {
  const input = document.getElementById('password');
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
  else if (score === 2) { label = 'O\'rtacha'; color = '#f59e0b'; bar.style.width = '50%'; }
  else if (score === 3) { label = 'Yaxshi'; color = '#10b981'; bar.style.width = '75%'; }
  else { label = 'Kuchli'; color = '#10b981'; bar.style.width = '100%'; }

  bar.style.background = color;
  text.style.color = color;
  text.textContent = label;
};

function forgotPassword() {
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

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  seedDemoUsers();
  // Update navbar only if logged in context
  updateNavbar();
});

// Global API
window.UzAuth = {
  registerUser,
  loginUser,
  getCurrentUser,
  setCurrentUser,
  logout,
  protectPage,
  updateNavbar,
  togglePasswordVisibility,
  forgotPassword
};