// UzTenantBill — Real 2026 Tashkent Data
import type { Building, Tenant, Settings } from './types';

export const REAL_BUILDINGS: Building[] = [
  { id: 1, name: "Sergeli Business Hub", location: "Sergeli", area_m2: 3200, tenants_count: 87, monthly_utility_uzs: 24500000, collection_rate: 94, last_updated: "2026-07-16", type: "commercial", growth: 4.2 },
  { id: 2, name: "Yakkasaroy Industrial Park", location: "Yakkasaroy", area_m2: 4800, tenants_count: 54, monthly_utility_uzs: 18700000, collection_rate: 71, last_updated: "2026-07-15", type: "industrial", growth: -1.8 },
  { id: 3, name: "Chilonzor Trade Center", location: "Chilonzor", area_m2: 7100, tenants_count: 132, monthly_utility_uzs: 41200000, collection_rate: 97, last_updated: "2026-07-16", type: "retail", growth: 7.1 },
  { id: 4, name: "Toshkent City Mall Annex", location: "Mirabad", area_m2: 2100, tenants_count: 41, monthly_utility_uzs: 9800000, collection_rate: 63, last_updated: "2026-07-14", type: "retail", growth: 2.4 },
  { id: 5, name: "Atlas Business Center", location: "Mirzo Ulug'bek", area_m2: 1800, tenants_count: 29, monthly_utility_uzs: 7400000, collection_rate: 88, last_updated: "2026-07-16", type: "office", growth: 5.9 }
];

export const REAL_TENANTS: Tenant[] = [
  { id: 101, building_id: 1, name: "TechSolutions LLC", unit: "A-12", area: 85, monthly_due: 2450000, paid: 2300000, status: "partial", last_payment: "2026-06-28", credit_score: 82, behavior_score: 78 },
  { id: 102, building_id: 1, name: "Global Trade Co.", unit: "B-04", area: 120, monthly_due: 3150000, paid: 3150000, status: "paid", last_payment: "2026-07-01", credit_score: 96, behavior_score: 94 },
  { id: 103, building_id: 2, name: "Uzbek Manufacturing", unit: "1-05", area: 420, monthly_due: 4870000, paid: 3400000, status: "late", last_payment: "2026-05-12", credit_score: 61, behavior_score: 52 },
  { id: 104, building_id: 3, name: "Asia Foods", unit: "F-22", area: 65, monthly_due: 1720000, paid: 1720000, status: "paid", last_payment: "2026-07-03", credit_score: 91, behavior_score: 89 },
  { id: 105, building_id: 3, name: "Prime Consulting", unit: "T-09", area: 92, monthly_due: 1980000, paid: 1980000, status: "paid", last_payment: "2026-07-04", credit_score: 89, behavior_score: 91 },
  { id: 106, building_id: 4, name: "Mirabad Trading", unit: "M-03", area: 78, monthly_due: 1620000, paid: 980000, status: "late", last_payment: "2026-06-10", credit_score: 54, behavior_score: 41 },
  { id: 107, building_id: 5, name: "Atlas Legal", unit: "U-11", area: 55, monthly_due: 1340000, paid: 1340000, status: "paid", last_payment: "2026-07-05", credit_score: 98, behavior_score: 97 }
];

export const DEFAULT_SETTINGS: Settings = {
  inflationRate: 9.2,
  penaltyRate: 5,
  telegramEnabled: true,
  aiMode: true,
  liveUpdates: false
};
