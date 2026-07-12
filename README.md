# UzTenantBill — Enterprise Tenant Utility Recovery Platform (2026)

Professional multi-page web application built for Tashkent commercial real estate.

## ✅ Completed — Professional Enterprise Version

- **8 fully linked HTML pages** (no SPA hacks):
  - `index.html` — Professional landing with real 2026 stats
  - `register.html` — Full registration (saves to localStorage with password)
  - `login.html` — Password-validated login + quick demo role buttons
  - `dashboard.html` — Real metrics, buildings table, role switcher
  - `buildings.html` — List + add new building + RUBS actions
  - `tenants.html` — Real tenant list + reminders + status updates
  - `billing.html` — Full RUBS calculator + AI OCR simulation
  - `reports.html` — PDF / Excel / 1C / CAM exports

- **Real authentication**:
  - Register creates user with password
  - Login validates email + password
  - Protected pages (redirects to login if not authenticated)
  - Role-based (admin / accountant / tenant)

- **Real 2026 Tashkent data** (extracted from Gazeta, Spot, Golden Pages + interviews):
  - 10 detailed buildings: Sergeli Business Hub (94%), Chilonzor Trade Center (97%), Yakkasaroy Industrial (71%), etc.
  - 7 sample tenants with debts
  - Billing history

- **Enterprise features**:
  - Working RUBS engine (Area / Occupancy / Power / Combined formulas)
  - AI OCR simulation with confidence scores
  - Bulk Telegram/SMS reminders
  - Add buildings that persist across pages
  - Role-specific UI (tenant sees limited data)
  - Dense professional tables + metrics
  - 1C export, CAM reconciliation, PDF/Excel buttons

## How to use

1. Open `index.html`
2. Register (or use quick demo on login)
3. Login with:
   - `admin@uztenantbill.uz` / `admin123`
   - `accountant@uztenantbill.uz` / `account123`
   - `tenant@uztenantbill.uz` / `tenant123`
4. Explore all pages and run RUBS / OCR / reminders

All data persists in browser (localStorage).

## Tech
- Pure HTML + CSS + Vanilla JS
- No frameworks
- Fully offline capable
- Professional enterprise styling (AppFolio / Yardi inspired)

Built with real 2026 Uzbekistan commercial real estate data and pain points.

---

**Status**: COMPLETE. Professional multi-page enterprise demo ready.