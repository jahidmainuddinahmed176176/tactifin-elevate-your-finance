const KEYS = {
  transactions: "tf_transactions",
  budgets: "tf_budgets",
  goals: "tf_goals",
  bills: "tf_bills",
  balance_sheet: "tf_balance_sheet",
} as const;

function randomId(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function load<T>(key: string): T[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(key) ?? "[]") as T[]; } catch { return []; }
}

function save<T>(key: string, data: T[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(data));
}

export type TxnType = "income" | "expense";

export interface Transaction {
  id: string; type: TxnType; amount: number; category: string;
  description: string; transaction_date: string; is_haram: boolean; haram_reason: string | null;
}

export interface Budget { id: string; category: string; monthly_limit: number; }

export interface Goal {
  id: string; name: string; target_amount: number; current_amount: number;
  target_date: string | null; created_at: string;
}

export interface Bill {
  id: string; name: string; amount: number; due_date: string; category: string;
  recurring: string; paid: boolean; autopay: boolean; payment_method: string | null; created_at: string;
}

export interface BSLineItem {
  id: string; label: string;
  section: "nca" | "ca" | "ncl" | "cl" | "equity";
  amount: number; auto?: boolean;
}

const DEFAULT_BS: BSLineItem[] = [
  // Non-current assets
  { id: "nca-ppe", label: "Property, plant and equipment", section: "nca", amount: 0 },
  { id: "nca-ip",  label: "Investment property", section: "nca", amount: 0 },
  { id: "nca-ia",  label: "Intangible assets", section: "nca", amount: 0 },
  { id: "nca-gw",  label: "Goodwill", section: "nca", amount: 0 },
  { id: "nca-fa",  label: "Financial assets (other than equity-accounted investments, trade receivables and cash)", section: "nca", amount: 0 },
  { id: "nca-em",  label: "Investments accounted for under the equity method", section: "nca", amount: 0 },
  { id: "nca-ba",  label: "Biological assets", section: "nca", amount: 0 },
  // Current assets
  { id: "ca-inv",  label: "Inventories", section: "ca", amount: 0 },
  { id: "ca-tr",   label: "Trade and other receivables", section: "ca", amount: 0 },
  { id: "ca-cash", label: "Cash and cash equivalents", section: "ca", amount: 0, auto: true },
  { id: "ca-hfs",  label: "Assets classified as held for sale", section: "ca", amount: 0 },
  // Non-current liabilities
  { id: "ncl-fl",  label: "Financial liabilities (other than trade and other payables and provisions)", section: "ncl", amount: 0 },
  { id: "ncl-dta", label: "Deferred tax liabilities and assets", section: "ncl", amount: 0 },
  { id: "ncl-prov",label: "Provisions (non-current)", section: "ncl", amount: 0 },
  // Current liabilities
  { id: "cl-tp",   label: "Trade and other payables", section: "cl", amount: 0 },
  { id: "cl-prov", label: "Provisions (current)", section: "cl", amount: 0 },
  { id: "cl-tax",  label: "Liabilities and assets for current tax", section: "cl", amount: 0 },
  { id: "cl-fl",   label: "Financial liabilities (current, other than trade payables and provisions)", section: "cl", amount: 0 },
  { id: "cl-dg",   label: "Liabilities in disposal groups classified as held for sale", section: "cl", amount: 0 },
  // Equity
  { id: "eq-ic",   label: "Issued equity capital and reserves", section: "equity", amount: 0 },
  { id: "eq-nci",  label: "Non-controlling interests", section: "equity", amount: 0 },
];

export function getTransactions(): Transaction[] {
  return load<Transaction>(KEYS.transactions).sort((a, b) => b.transaction_date.localeCompare(a.transaction_date));
}
export function addTransaction(t: Omit<Transaction, "id">): Transaction {
  const item: Transaction = { ...t, id: randomId() };
  const all = load<Transaction>(KEYS.transactions); all.push(item); save(KEYS.transactions, all); return item;
}
export function updateTransaction(id: string, changes: Partial<Omit<Transaction, "id">>): void {
  const all = load<Transaction>(KEYS.transactions);
  const idx = all.findIndex(t => t.id === id);
  if (idx !== -1) { all[idx] = { ...all[idx], ...changes }; save(KEYS.transactions, all); }
}
export function deleteTransaction(id: string): void {
  save(KEYS.transactions, load<Transaction>(KEYS.transactions).filter(t => t.id !== id));
}

export function getBudgets(): Budget[] {
  return load<Budget>(KEYS.budgets).sort((a, b) => a.category.localeCompare(b.category));
}
export function upsertBudget(category: string, monthly_limit: number): void {
  const all = load<Budget>(KEYS.budgets);
  const idx = all.findIndex(b => b.category === category);
  if (idx !== -1) { all[idx].monthly_limit = monthly_limit; } else { all.push({ id: randomId(), category, monthly_limit }); }
  save(KEYS.budgets, all);
}
export function deleteBudget(id: string): void {
  save(KEYS.budgets, load<Budget>(KEYS.budgets).filter(b => b.id !== id));
}

export function getGoals(): Goal[] {
  return load<Goal>(KEYS.goals).sort((a, b) => b.created_at.localeCompare(a.created_at));
}
export function addGoal(g: Pick<Goal, "name" | "target_amount" | "target_date">): Goal {
  const item: Goal = { ...g, id: randomId(), current_amount: 0, created_at: new Date().toISOString() };
  const all = load<Goal>(KEYS.goals); all.push(item); save(KEYS.goals, all); return item;
}
export function updateGoal(id: string, changes: Partial<Omit<Goal, "id" | "created_at">>): void {
  const all = load<Goal>(KEYS.goals);
  const idx = all.findIndex(g => g.id === id);
  if (idx !== -1) { all[idx] = { ...all[idx], ...changes }; save(KEYS.goals, all); }
}
export function deleteGoal(id: string): void {
  save(KEYS.goals, load<Goal>(KEYS.goals).filter(g => g.id !== id));
}

export function getBills(): Bill[] {
  return load<Bill>(KEYS.bills).sort((a, b) => a.due_date.localeCompare(b.due_date));
}
export function addBill(b: Omit<Bill, "id" | "created_at">): Bill {
  const item: Bill = { ...b, id: randomId(), created_at: new Date().toISOString() };
  const all = load<Bill>(KEYS.bills); all.push(item); save(KEYS.bills, all); return item;
}
export function updateBill(id: string, changes: Partial<Omit<Bill, "id" | "created_at">>): void {
  const all = load<Bill>(KEYS.bills);
  const idx = all.findIndex(b => b.id === id);
  if (idx !== -1) { all[idx] = { ...all[idx], ...changes }; save(KEYS.bills, all); }
}
export function deleteBill(id: string): void {
  save(KEYS.bills, load<Bill>(KEYS.bills).filter(b => b.id !== id));
}

export function getBSLineItems(): BSLineItem[] {
  const stored = load<BSLineItem>(KEYS.balance_sheet);
  if (stored.length === 0) { save(KEYS.balance_sheet, DEFAULT_BS); return DEFAULT_BS; }
  return stored;
}
export function updateBSLineItem(id: string, amount: number): void {
  const all = getBSLineItems();
  const idx = all.findIndex(i => i.id === id);
  if (idx !== -1) { all[idx].amount = amount; save(KEYS.balance_sheet, all); }
}
export function resetBSLineItems(): void {
  save(KEYS.balance_sheet, DEFAULT_BS.map(i => ({ ...i, amount: 0 })));
}
