// Rough CO2 estimator for the dashboard widget.
// Numbers are illustrative — based on consumer-spend-to-CO2 rules of thumb
// (kg CO2e per £ spent within a category). Not for compliance use.

export interface SpendCategory {
  id: string;
  label: string;
  icon: string;
  /** Mock GBP spent this month. */
  spent: number;
  /** kg of CO2e per GBP spent. */
  factor: number;
}

export const MOCK_SPEND: SpendCategory[] = [
  { id: "food",      label: "Food & dining", icon: "🍽️", spent: 320, factor: 0.7 },
  { id: "transport", label: "Transport",     icon: "🚗", spent: 180, factor: 1.2 },
  { id: "shopping",  label: "Shopping",      icon: "🛍️", spent: 240, factor: 0.5 },
  { id: "energy",    label: "Energy bills",  icon: "⚡", spent: 110, factor: 1.6 },
  { id: "travel",    label: "Travel",        icon: "✈️", spent: 90,  factor: 2.4 },
];

export interface CO2Result {
  totalKg: number;
  byCategory: { id: string; label: string; icon: string; kg: number }[];
  trend: "down" | "up" | "flat";
  trendPct: number;
  /** Average UK monthly footprint per person (mock baseline) for comparison. */
  baselineKg: number;
}

export function computeCO2(): CO2Result {
  const byCategory = MOCK_SPEND.map((c) => ({
    id: c.id,
    label: c.label,
    icon: c.icon,
    kg: Math.round(c.spent * c.factor),
  }));
  const totalKg = byCategory.reduce((a, b) => a + b.kg, 0);
  return {
    totalKg,
    byCategory: byCategory.sort((a, b) => b.kg - a.kg),
    trend: "down",
    trendPct: 6,
    baselineKg: 850,
  };
}
