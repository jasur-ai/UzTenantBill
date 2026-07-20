// UzTenantBill — TypeScript Types (2026)

export interface Building {
  id: number;
  name: string;
  location: string;
  area_m2: number;
  tenants_count: number;
  monthly_utility_uzs: number;
  collection_rate: number;
  last_updated: string;
  type: string;
  growth: number;
}

export interface Tenant {
  id: number;
  building_id: number;
  name: string;
  unit: string;
  area: number;
  monthly_due: number;
  paid: number;
  status: 'paid' | 'partial' | 'late';
  last_payment: string;
  credit_score: number;
  behavior_score: number;
}

export interface Settings {
  inflationRate: number;
  penaltyRate: number;
  telegramEnabled: boolean;
  aiMode: boolean;
  liveUpdates: boolean;
}

export interface AuditEntry {
  ts: string;
  action: string;
  details: string;
  user: string;
}

export interface HistoryEntry {
  ts: number;
  b: string;
  t: string;
}

export interface User {
  id: number;
  fullName: string;
  company: string;
  email: string;
  phone: string;
  password?: string;
  role: 'admin' | 'accountant' | 'tenant';
  created: string;
}

export interface AIConversation {
  q: string;
  reply: string;
}

export interface ModalOptions {
  html: string;
  title?: string;
  size?: 'normal' | 'wide' | 'large';
}
