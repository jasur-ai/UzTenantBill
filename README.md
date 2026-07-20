# UzTenantBill 2026 — Professional Tenant Utility Recovery Platform

**Next.js + TypeScript** — Full-stack tenant billing platform.

## Tech Stack
- **Next.js 16** (App Router)
- **TypeScript** 
- **React Context** (state management)
- **Tailwind CSS** + custom CSS

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Pages
| Route | Description |
|---|---|
| `/` | Landing page |
| `/login` | Login with demo accounts |
| `/register` | Registration |
| `/dashboard` | Dashboard (role-based views) |
| `/buildings` | Building management |
| `/tenants` | Tenant management |
| `/billing` | RUBS calculator |
| `/reports` | Reports & export |

## Demo Accounts
- `admin@uztenantbill.uz` / `admin123` (Admin)
- `accountant@uztenantbill.uz` / `account123` (Accountant)
- `tenant@uztenantbill.uz` / `tenant123` (Tenant)

## Project Structure
```
src/
├── app/           # Pages (App Router)
├── components/    # Reusable components
└── lib/           # Core logic (types, data, auth, engine)
```

© 2026 — Built for O'zbekiston commercial real estate.
