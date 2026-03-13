// ─── Constants ────────────────────────────────────────────────────────────────
export const DAYS_OF_WEEK = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

export const MONTH_NAME_KEYS = [
  "common.months.1",
  "common.months.2",
  "common.months.3",
  "common.months.4",
  "common.months.5",
  "common.months.6",
  "common.months.7",
  "common.months.8",
  "common.months.9",
  "common.months.10",
  "common.months.11",
  "common.months.12",
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
export const getDaysInMonth = (year: number, month: number) =>
  new Date(year, month + 1, 0).getDate();

export const getFirstDayOfMonth = (year: number, month: number) => {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1;
};
