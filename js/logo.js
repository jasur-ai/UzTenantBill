// =============================================
// UzTenantBill — Enterprise Premium Logo v10 (2026)
// 10th iteration: Ultimate refined version
// Bold, modern, trustworthy, perfectly balanced
// Strong U + integrated building + premium gradient + shadow
// =============================================

function getLogoSVG(size = 32, variant = 'default') {
  if (variant === 'compact') {
    return `
      <svg width="${size}" height="${size}" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="lgC" x1="8" y1="8" x2="32" y2="32" gradientUnits="userSpaceOnUse">
            <stop stop-color="#0ea5e9"/>
            <stop offset="1" stop-color="#0284c8"/>
          </linearGradient>
        </defs>
        <path d="M9 10 Q9 30 20 30 Q31 30 31 10" stroke="url(#lgC)" stroke-width="8" stroke-linecap="round" fill="none"/>
        <path d="M14 20 L20 13 L26 20" stroke="#38bdf8" stroke-width="3.5" stroke-linecap="round"/>
        <rect x="17" y="20" width="6" height="5" rx="1" fill="#38bdf8"/>
      </svg>
    `;
  }
  
  // v10 — Final ultra-premium version
  return `
    <svg width="${size}" height="${size}" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="lgV10" x1="4" y1="4" x2="42" y2="42" gradientUnits="userSpaceOnUse">
          <stop stop-color="#0ea5e9"/>
          <stop offset="0.3" stop-color="#0284c8"/>
          <stop offset="1" stop-color="#0369a1"/>
        </linearGradient>
        <linearGradient id="acV10" x1="13" y1="12" x2="33" y2="34" gradientUnits="userSpaceOnUse">
          <stop stop-color="#38bdf8"/>
          <stop offset="1" stop-color="#0ea5e9"/>
        </linearGradient>
        <filter id="shV10" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="2" stdDeviation="2.8" flood-color="#0ea5e9" flood-opacity="0.38"/>
        </filter>
      </defs>
      
      <!-- Powerful outer U -->
      <path d="M7 6 Q7 40 23 40 Q39 40 39 6" stroke="url(#lgV10)" stroke-width="10.8" stroke-linecap="round" fill="none"/>
      
      <!-- Inner depth layer -->
      <path d="M11 10 Q11 36 23 36 Q35 36 35 10" stroke="#0f172a" stroke-width="3.8" stroke-linecap="round" fill="none" opacity="0.18"/>
      
      <!-- Building icon -->
      <path d="M15 22 L23 13 L31 22" stroke="url(#acV10)" stroke-width="3.9" stroke-linecap="round" stroke-linejoin="round"/>
      <rect x="17.5" y="22" width="11" height="9.8" rx="1.6" fill="url(#acV10)" filter="url(#shV10)"/>
      
      <!-- Windows -->
      <rect x="19" y="24" width="2.4" height="2.4" rx="0.5" fill="#0f172a"/>
      <rect x="24.6" y="24" width="2.4" height="2.4" rx="0.5" fill="#0f172a"/>
      <rect x="19" y="27.7" width="2.4" height="2.4" rx="0.5" fill="#0f172a"/>
      
      <!-- Signature accent -->
      <circle cx="23" cy="42.8" r="2.8" fill="#38bdf8"/>
    </svg>
  `;
}

window.UzLogo = { getLogoSVG };
console.log('%c[UzTenantBill] Premium Logo v10 (final ultra-refined) loaded', 'color:#64748b');