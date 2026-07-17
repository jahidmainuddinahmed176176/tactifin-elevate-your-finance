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
  id: string;
  type: TxnType;
  amount: number;
  cash_amount?: number;
  credit_amount?: number;
  category: string;
  description: string;
  transaction_date: string;
  is_haram: boolean;
  haram_reason: string | null;
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
  amount: number;
  auto?: boolean;
  /** Which auto-calculation to use when auto=true */
  autoType?: "cash" | "receivables" | "payables" | "net_income";
}

const DEFAULT_BS: BSLineItem[] = [
  // Non-current assets
  { id: "nca-ppe",  label: "Property, plant and equipment",                                                                      section: "nca",    amount: 0 },
  { id: "nca-ip",   label: "Investment property",                                                                                 section: "nca",    amount: 0 },
  { id: "nca-ia",   label: "Intangible assets",                                                                                   section: "nca",    amount: 0 },
  { id: "nca-gw",   label: "Goodwill",                                                                                            section: "nca",    amount: 0 },
  { id: "nca-fa",   label: "Financial assets (other than equity-accounted investments, trade receivables and cash)",              section: "nca",    amount: 0 },
  { id: "nca-em",   label: "Investments accounted for under the equity method",                                                   section: "nca",    amount: 0 },
  { id: "nca-ba",   label: "Biological assets",                                                                                   section: "nca",    amount: 0 },
  // Current assets
  { id: "ca-inv",   label: "Inventories",                                                                                         section: "ca",     amount: 0 },
  { id: "ca-tr",    label: "Trade and other receivables",                                                                         section: "ca",     amount: 0, auto: true, autoType: "receivables" },
  { id: "ca-cash",  label: "Cash and cash equivalents",                                                                           section: "ca",     amount: 0, auto: true, autoType: "cash" },
  { id: "ca-hfs",   label: "Assets classified as held for sale",                                                                  section: "ca",     amount: 0 },
  // Non-current liabilities
  { id: "ncl-fl",   label: "Financial liabilities (other than trade and other payables and provisions)",                          section: "ncl",    amount: 0 },
  { id: "ncl-dta",  label: "Deferred tax liabilities and assets",                                                                 section: "ncl",    amount: 0 },
  { id: "ncl-prov", label: "Provisions (non-current)",                                                                            section: "ncl",    amount: 0 },
  // Current liabilities
  { id: "cl-tp",    label: "Trade and other payables",                                                                            section: "cl",     amount: 0, auto: true, autoType: "payables" },
  { id: "cl-prov",  label: "Provisions (current)",                                                                                section: "cl",     amount: 0 },
  { id: "cl-tax",   label: "Liabilities and assets for current tax",                                                              section: "cl",     amount: 0 },
  { id: "cl-fl",    label: "Financial liabilities (current, other than trade payables and provisions)",                           section: "cl",     amount: 0 },
  { id: "cl-dg",    label: "Liabilities in disposal groups classified as held for sale",                                          section: "cl",     amount: 0 },
  // Equity
  { id: "eq-ic",    label: "Issued equity capital and reserves",                                                                  section: "equity", amount: 0 },
  { id: "eq-re",    label: "Retained earnings (net income from transactions)",                                                    section: "equity", amount: 0, auto: true, autoType: "net_income" },
  { id: "eq-nci",   label: "Non-controlling interests",                                                                           section: "equity", amount: 0 },
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

  // Merge auto/autoType from DEFAULT_BS so upgrades reach existing users
  const defaults = new Map(DEFAULT_BS.map(d => [d.id, d]));
  const storedIds = new Set(stored.map(s => s.id));

  // Patch existing items with updated auto metadata
  const patched = stored.map(s => {
    const d = defaults.get(s.id);
    return d ? { ...s, auto: d.auto, autoType: d.autoType, label: d.label } : s;
  });

  // Append any brand-new line items that don't exist in stored data yet (e.g. eq-re)
  const newItems = DEFAULT_BS.filter(d => !storedIds.has(d.id));
  return [...patched, ...newItems];
}
export function updateBSLineItem(id: string, amount: number): void {
  const all = getBSLineItems();
  const idx = all.findIndex(i => i.id === id);
  if (idx !== -1) { all[idx].amount = amount; save(KEYS.balance_sheet, all); }
}
export function resetBSLineItems(): void {
  save(KEYS.balance_sheet, DEFAULT_BS.map(i => ({ ...i, amount: 0 })));
}

// ── Accounting ──────────────────────────────────────────────────────────────

const ACCT_KEYS = {
  journal: "tf_journal",
  accounts: "tf_accounts",
};

export type EntryLine = { accountName: string; debit: number; credit: number };

export interface JournalEntry {
  id: string;
  date: string;
  narration: string;
  lines: EntryLine[];
  created_at: string;
}

export interface Account {
  id: string;
  name: string;
  type: "asset" | "liability" | "equity" | "revenue" | "expense";
  normal: "debit" | "credit"; // normal balance side
}

const DEFAULT_ACCOUNTS: Account[] = [
  { id: "cash",         name: "Cash",                              type: "asset",    normal: "debit" },
  { id: "bank",         name: "Bank",                             type: "asset",    normal: "debit" },
  { id: "ar",           name: "Accounts Receivable",              type: "asset",    normal: "debit" },
  { id: "inventory",    name: "Inventory",                        type: "asset",    normal: "debit" },
  { id: "prepaid",      name: "Prepaid Expenses",                 type: "asset",    normal: "debit" },
  { id: "ppe",          name: "Property, Plant & Equipment",      type: "asset",    normal: "debit" },
  { id: "acc_dep",      name: "Accumulated Depreciation",         type: "asset",    normal: "credit" },
  { id: "ap",           name: "Accounts Payable",                 type: "liability",normal: "credit" },
  { id: "loan",         name: "Bank Loan",                        type: "liability",normal: "credit" },
  { id: "accrued",      name: "Accrued Liabilities",              type: "liability",normal: "credit" },
  { id: "capital",      name: "Owner's Capital",                  type: "equity",   normal: "credit" },
  { id: "drawings",     name: "Owner's Drawings",                 type: "equity",   normal: "debit" },
  { id: "sales",        name: "Sales Revenue",                    type: "revenue",  normal: "credit" },
  { id: "sales_ret",    name: "Sales Returns",                    type: "revenue",  normal: "debit" },
  { id: "purchases",    name: "Purchases",                        type: "expense",  normal: "debit" },
  { id: "purch_ret",    name: "Purchase Returns",                 type: "expense",  normal: "credit" },
  { id: "rent_exp",     name: "Rent Expense",                     type: "expense",  normal: "debit" },
  { id: "salary_exp",   name: "Salary Expense",                   type: "expense",  normal: "debit" },
  { id: "util_exp",     name: "Utilities Expense",                type: "expense",  normal: "debit" },
  { id: "dep_exp",      name: "Depreciation Expense",             type: "expense",  normal: "debit" },
  { id: "interest_exp", name: "Interest Expense",                 type: "expense",  normal: "debit" },
  { id: "adv_exp",      name: "Advertising Expense",              type: "expense",  normal: "debit" },
  { id: "misc_exp",     name: "Miscellaneous Expense",            type: "expense",  normal: "debit" },
];

export function getAccounts(): Account[] {
  const stored = load<Account>(ACCT_KEYS.accounts);
  if (stored.length === 0) { save(ACCT_KEYS.accounts, DEFAULT_ACCOUNTS); return DEFAULT_ACCOUNTS; }
  return stored;
}
export function addAccount(a: Omit<Account, "id">): Account {
  const item: Account = { ...a, id: randomId() };
  const all = getAccounts(); all.push(item); save(ACCT_KEYS.accounts, all); return item;
}
export function deleteAccount(id: string): void {
  save(ACCT_KEYS.accounts, getAccounts().filter(a => a.id !== id));
}

export function getJournalEntries(): JournalEntry[] {
  return load<JournalEntry>(ACCT_KEYS.journal).sort((a, b) => b.date.localeCompare(a.date));
}
export function addJournalEntry(e: Omit<JournalEntry, "id" | "created_at">): JournalEntry {
  const item: JournalEntry = { ...e, id: randomId(), created_at: new Date().toISOString() };
  const all = load<JournalEntry>(ACCT_KEYS.journal); all.push(item); save(ACCT_KEYS.journal, all); return item;
}
export function deleteJournalEntry(id: string): void {
  save(ACCT_KEYS.journal, getJournalEntries().filter(e => e.id !== id));
}

// Compute ledger balances from journal entries
export interface LedgerBalance { accountName: string; debit: number; credit: number; balance: number; normal: "debit" | "credit" }

export function computeLedger(entries: JournalEntry[], accounts: Account[]): LedgerBalance[] {
  const map: Record<string, { debit: number; credit: number }> = {};
  for (const entry of entries) {
    for (const line of entry.lines) {
      if (!map[line.accountName]) map[line.accountName] = { debit: 0, credit: 0 };
      map[line.accountName].debit  += line.debit;
      map[line.accountName].credit += line.credit;
    }
  }
  return Object.entries(map).map(([name, { debit, credit }]) => {
    const acct = accounts.find(a => a.name === name);
    const normal = acct?.normal ?? "debit";
    const balance = normal === "debit" ? debit - credit : credit - debit;
    return { accountName: name, debit, credit, balance, normal };
  }).sort((a, b) => a.accountName.localeCompare(b.accountName));
}
