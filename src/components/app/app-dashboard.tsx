import { useState, useMemo, useRef, useEffect, type ReactNode } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getTransactions, addTransaction, updateTransaction, deleteTransaction,
  getBudgets, upsertBudget, deleteBudget,
  getGoals, addGoal, updateGoal, deleteGoal,
  getBills, addBill, updateBill, deleteBill,
  getAccounts, addAccount, deleteAccount,
  getJournalEntries, addJournalEntry, deleteJournalEntry,
  computeLedger,
} from "@/lib/local-storage";
import type { Transaction, Budget, Goal, Bill, TxnType, Account, JournalEntry, EntryLine } from "@/lib/local-storage";
import { CATEGORIES, detectHaram, autoCategorize } from "@/lib/haram";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import {
  LayoutDashboard, Receipt, Target, Wallet, CreditCard, Calculator,
  ShieldCheck, Bot, RotateCcw, Trash2, Pencil, TrendingUp, TrendingDown,
  AlertTriangle, Sparkles, Newspaper, BookOpen, Send, User,
  ExternalLink, Lightbulb, Clock, ArrowRight, BookMarked, Scale, FileText, BarChart2, Plus, X,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import { cn } from "@/lib/utils";

type TabId =
  | "dashboard" | "transactions" | "goals" | "budgets" | "bills"
  | "rewinder" | "calculators" | "compliance" | "chat" | "news" | "learn"
  | "journal" | "ledger" | "trial-balance" | "income-statement" | "balance-sheet";

const TABS: { id: TabId; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "dashboard",        label: "Dashboard",        icon: LayoutDashboard },
  { id: "transactions",     label: "Transactions",     icon: Receipt },
  { id: "journal",          label: "Journal",          icon: BookMarked },
  { id: "ledger",           label: "Ledger",           icon: Scale },
  { id: "trial-balance",    label: "Trial Balance",    icon: FileText },
  { id: "income-statement", label: "Income Statement", icon: TrendingUp },
  { id: "balance-sheet",    label: "Balance Sheet",    icon: BarChart2 },
  { id: "goals",            label: "Goals",            icon: Target },
  { id: "budgets",          label: "Budgets",          icon: Wallet },
  { id: "bills",            label: "Bill Pay",         icon: CreditCard },
  { id: "rewinder",         label: "Rewinder",         icon: RotateCcw },
  { id: "calculators",      label: "Calculators",      icon: Calculator },
  { id: "compliance",       label: "Compliance",       icon: ShieldCheck },
  { id: "chat",             label: "AI Assistant",     icon: Bot },
  { id: "news",             label: "Tips & News",      icon: Newspaper },
  { id: "learn",            label: "Learning",         icon: BookOpen },
];

function fmt(n: number) {
  return new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(n);
}
function monthKey(dateStr: string) { return dateStr.slice(0, 7); }
function monthLabel(key: string) {
  const [y, m] = key.split("-");
  return new Date(Number(y), Number(m) - 1, 1).toLocaleString("default", { month: "short" });
}

const PIE_COLORS = [
  "oklch(0.78 0.22 145)", "oklch(0.65 0.13 255)", "oklch(0.75 0.18 60)",
  "oklch(0.70 0.20 300)", "oklch(0.68 0.20 25)", "oklch(0.72 0.15 180)",
];

export function AppDashboard() {
  const [tab, setTab] = useState<TabId>("dashboard");

  return (
    <section id="app" className="border-t border-border/40 py-20 scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/40 px-4 py-1.5 text-xs text-muted-foreground backdrop-blur mb-4">
            <Sparkles className="h-3 w-3 text-[color:var(--brand-bolt)]" />
            Your financial workspace
          </div>
          <h2 className="text-4xl md:text-5xl">
            Everything in <span className="italic text-brand-gradient">one place</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Track, budget, and grow your wealth — no separate app needed.
          </p>
        </div>

        <div className="rounded-2xl border border-border/60 bg-card/40 shadow-elegant backdrop-blur-xl overflow-hidden">
          <div className="flex gap-1 overflow-x-auto border-b border-border bg-background/50 p-2">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-sm whitespace-nowrap transition-colors",
                  tab === t.id
                    ? "bg-accent text-foreground"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
                )}
              >
                <t.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{t.label}</span>
              </button>
            ))}
          </div>

          <div className="p-4 md:p-8 min-h-[500px]">
            {tab === "dashboard" && <DashboardPanel />}
            {tab === "transactions" && <TransactionsPanel />}
            {tab === "journal" && <JournalPanel />}
            {tab === "ledger" && <LedgerPanel />}
            {tab === "trial-balance" && <TrialBalancePanel />}
            {tab === "income-statement" && <IncomeStatementPanel />}
            {tab === "balance-sheet" && <BalanceSheetPanel />}
            {tab === "goals" && <GoalsPanel />}
            {tab === "budgets" && <BudgetsPanel />}
            {tab === "bills" && <BillsPanel />}
            {tab === "rewinder" && <RewinderPanel />}
            {tab === "calculators" && <CalculatorsPanel />}
            {tab === "compliance" && <CompliancePanel />}
            {tab === "chat" && <ChatPanel />}
            {tab === "news" && <NewsPanel />}
            {tab === "learn" && <LearnPanel />}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Dashboard ── */
function DashboardPanel() {
  const { data: txns = [] } = useQuery({ queryKey: ["transactions"], queryFn: () => getTransactions() });
  const { data: goals = [] } = useQuery({ queryKey: ["goals"], queryFn: () => getGoals() });
  const { data: budgets = [] } = useQuery({ queryKey: ["budgets"], queryFn: () => getBudgets() });

  const income = txns.filter((t) => t.type === "income").reduce((a, t) => a + t.amount, 0);
  const expenses = txns.filter((t) => t.type === "expense").reduce((a, t) => a + t.amount, 0);
  const haramCount = txns.filter((t) => t.is_haram).length;
  const balance = income - expenses;

  const categoryData = useMemo(() => {
    const map: Record<string, number> = {};
    for (const t of txns) if (t.type === "expense") map[t.category] = (map[t.category] ?? 0) + t.amount;
    return Object.entries(map).sort((a, b) => b[1] - a[1]).slice(0, 6).map(([name, value]) => ({ name, value }));
  }, [txns]);

  const monthlyData = useMemo(() => {
    const map: Record<string, { income: number; expenses: number }> = {};
    for (const t of txns) {
      const key = monthKey(t.transaction_date);
      if (!map[key]) map[key] = { income: 0, expenses: 0 };
      if (t.type === "income") map[key].income += t.amount;
      else map[key].expenses += t.amount;
    }
    return Object.keys(map).sort().slice(-6).map((key) => ({ month: monthLabel(key), Income: map[key].income, Expenses: map[key].expenses }));
  }, [txns]);

  const topGoals = goals.slice(0, 3);
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().slice(0, 10);
  const spentBy: Record<string, number> = {};
  for (const t of txns) {
    if (t.type !== "expense" || t.transaction_date < monthStart) continue;
    spentBy[t.category] = (spentBy[t.category] ?? 0) + t.amount;
  }
  const overBudget = budgets.filter((b) => (spentBy[b.category] ?? 0) > b.monthly_limit);

  const stats = [
    { label: "Net Balance", value: fmt(balance), icon: Wallet, accent: "text-emerald-600" },
    { label: "Income", value: fmt(income), icon: TrendingUp, accent: "text-emerald-500" },
    { label: "Expenses", value: fmt(expenses), icon: TrendingDown, accent: "text-rose-500" },
    { label: "Flagged", value: String(haramCount), icon: AlertTriangle, accent: "text-amber-500" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl">Dashboard</h3>
        <p className="text-sm text-muted-foreground">Your financial overview at a glance.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{s.label}</CardTitle>
              <s.icon className={cn("h-4 w-4", s.accent)} />
            </CardHeader>
            <CardContent><div className={cn("text-2xl font-semibold", s.accent)}>{s.value}</div></CardContent>
          </Card>
        ))}
      </div>

      {txns.length > 0 && (
        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader><CardTitle>Monthly trend</CardTitle></CardHeader>
            <CardContent>
              {monthlyData.length < 1 ? <p className="text-sm text-muted-foreground">Not enough data yet.</p> : (
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={monthlyData} margin={{ top: 4, right: 8, bottom: 0, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} />
                    <YAxis tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                    <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} formatter={(v: number) => fmt(v)} />
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                    <Bar dataKey="Income" fill="oklch(0.6 0.18 145)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Expenses" fill="oklch(0.65 0.2 25)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Spending by category</CardTitle></CardHeader>
            <CardContent>
              {categoryData.length === 0 ? <p className="text-sm text-muted-foreground">No expense data yet.</p> : (
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie data={categoryData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
                      {categoryData.map((_, idx) => <Cell key={idx} fill={PIE_COLORS[idx % PIE_COLORS.length]} />)}
                    </Pie>
                    <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} formatter={(v: number) => fmt(v)} />
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="flex items-center gap-2"><Target className="h-4 w-4 text-[color:var(--brand-bolt)]" /> Savings goals</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {topGoals.length === 0 ? <p className="text-sm text-muted-foreground">No goals yet.</p> : topGoals.map((g) => {
              const pct = Math.min(100, (g.current_amount / g.target_amount) * 100);
              return (
                <div key={g.id} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span>{g.name}</span>
                    <span className="text-muted-foreground text-xs">{fmt(g.current_amount)} / {fmt(g.target_amount)}</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                    <div className="h-full rounded-full bg-brand-gradient transition-all" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="flex items-center gap-2"><CreditCard className="h-4 w-4 text-[color:var(--brand-bolt)]" /> Budget status</CardTitle>
          </CardHeader>
          <CardContent>
            {budgets.length === 0 ? <p className="text-sm text-muted-foreground">No budgets set.</p> : overBudget.length === 0 ? (
              <div className="flex items-center gap-2 text-sm text-emerald-500"><ShieldCheck className="h-4 w-4" /> All budgets on track this month.</div>
            ) : (
              <div className="space-y-2">
                {overBudget.map((b) => {
                  const spent = spentBy[b.category] ?? 0;
                  return <div key={b.id} className="flex items-center justify-between rounded-lg border border-rose-500/30 bg-rose-500/5 px-3 py-2 text-sm">
                    <span className="flex items-center gap-2"><AlertTriangle className="h-3.5 w-3.5 text-rose-500" />{b.category}</span>
                    <span className="text-rose-500 text-xs">Over by {fmt(spent - b.monthly_limit)}</span>
                  </div>;
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Recent transactions</CardTitle></CardHeader>
        <CardContent>
          {txns.length === 0 ? <p className="text-sm text-muted-foreground">No transactions yet.</p> : (
            <div className="divide-y divide-border">
              {txns.slice(0, 8).map((t) => (
                <div key={t.id} className="flex items-center justify-between py-3">
                  <div>
                    <div className="font-medium">{t.description || t.category}</div>
                    <div className="text-xs text-muted-foreground">{t.category} · {t.transaction_date}{t.is_haram && <span className="ml-2 text-amber-500">⚠ flagged</span>}</div>
                  </div>
                  <div className={t.type === "income" ? "text-emerald-500" : "text-rose-500"}>{t.type === "income" ? "+" : "-"}{fmt(t.amount)}</div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

/* ── Transactions (with auto-categorization) ── */
function TransactionsPanel() {
  const qc = useQueryClient();
  const [type, setType] = useState<TxnType>("expense");
  const [amount, setAmount] = useState("");
  const [cashAmount, setCashAmount] = useState("");
  const [category, setCategory] = useState<string>("Food");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [autoCat, setAutoCat] = useState(true);

  const [editTxn, setEditTxn] = useState<Transaction | null>(null);
  const [editType, setEditType] = useState<TxnType>("expense");
  const [editAmount, setEditAmount] = useState("");
  const [editCashAmount, setEditCashAmount] = useState("");
  const [editCategory, setEditCategory] = useState("Food");
  const [editDescription, setEditDescription] = useState("");
  const [editDate, setEditDate] = useState("");

  const totalNum = Number(amount) || 0;
  const cashNum = Number(cashAmount) || 0;
  const creditNum = totalNum > 0 && cashAmount !== "" ? Math.max(0, totalNum - cashNum) : 0;

  const editTotalNum = Number(editAmount) || 0;
  const editCashNum = Number(editCashAmount) || 0;
  const editCreditNum = editTotalNum > 0 && editCashAmount !== "" ? Math.max(0, editTotalNum - editCashNum) : 0;

  const { data: txns = [] } = useQuery({ queryKey: ["transactions"], queryFn: () => getTransactions() });

  const add = useMutation({
    mutationFn: () => {
      const finalCategory = autoCat && description.trim() ? autoCategorize(description) : category;
      const haram = detectHaram(`${finalCategory} ${description}`);
      addTransaction({
        type, amount: Number(amount),
        cash_amount: cashAmount !== "" ? cashNum : undefined,
        credit_amount: cashAmount !== "" ? creditNum : undefined,
        category: finalCategory, description, transaction_date: date, is_haram: haram.isHaram, haram_reason: haram.reason ?? null,
      });
      if (haram.isHaram) toast.warning(`Flagged: ${haram.reason}`);
      else toast.success("Transaction added");
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["transactions"] }); setAmount(""); setCashAmount(""); setDescription(""); },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Failed"),
  });

  const edit = useMutation({
    mutationFn: () => {
      if (!editTxn) return;
      const haram = detectHaram(`${editCategory} ${editDescription}`);
      updateTransaction(editTxn.id, {
        type: editType, amount: Number(editAmount),
        cash_amount: editCashAmount !== "" ? editCashNum : undefined,
        credit_amount: editCashAmount !== "" ? editCreditNum : undefined,
        category: editCategory, description: editDescription, transaction_date: editDate, is_haram: haram.isHaram, haram_reason: haram.reason ?? null,
      });
      if (haram.isHaram) toast.warning(`Updated & flagged: ${haram.reason}`);
      else toast.success("Transaction updated");
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["transactions"] }); setEditTxn(null); },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Failed"),
  });

  const del = useMutation({
    mutationFn: (id: string) => { deleteTransaction(id); },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["transactions"] }),
  });

  function openEdit(t: Transaction) {
    setEditTxn(t); setEditType(t.type); setEditAmount(String(t.amount));
    setEditCashAmount(t.cash_amount != null ? String(t.cash_amount) : "");
    setEditCategory(t.category); setEditDescription(t.description ?? ""); setEditDate(t.transaction_date);
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl">Transactions</h3>
        <p className="text-sm text-muted-foreground">Record income and expenses. Auto-categorization enabled.</p>
      </div>

      <Card>
        <CardHeader><CardTitle>Add transaction</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={(e) => { e.preventDefault(); add.mutate(); }} className="grid gap-4 md:grid-cols-6">
            <div className="md:col-span-1">
              <Label>Type</Label>
              <Select value={type} onValueChange={(v) => setType(v as TxnType)}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="expense">Expense</SelectItem>
                  <SelectItem value="income">Income</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-1">
              <Label>Total Amount</Label>
              <Input className="mt-1" type="number" step="0.01" min="0" required value={amount} onChange={(e) => setAmount(e.target.value)} />
            </div>
            <div className="md:col-span-1">
              <Label>Cash Amount</Label>
              <Input
                className="mt-1"
                type="number"
                step="0.01"
                min="0"
                max={totalNum || undefined}
                placeholder="0.00"
                value={cashAmount}
                onChange={(e) => setCashAmount(e.target.value)}
              />
            </div>
            <div className="md:col-span-1">
              <Label>Credit Amount <span className="text-xs text-muted-foreground">(auto)</span></Label>
              <Input
                className="mt-1 opacity-70 cursor-not-allowed"
                type="number"
                step="0.01"
                readOnly
                tabIndex={-1}
                value={cashAmount !== "" ? creditNum.toFixed(2) : ""}
                placeholder="= Total − Cash"
              />
            </div>
            <div className="md:col-span-2">
              <Label>Description</Label>
              <Input className="mt-1" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="e.g. Grocery shopping" />
              {autoCat && description.trim() && (
                <p className="mt-1 text-xs text-[color:var(--brand-bolt)]">
                  Auto-detected: {autoCategorize(description)}
                </p>
              )}
            </div>
            <div className="md:col-span-1">
              <Label>Category {autoCat && <span className="text-xs text-muted-foreground">(auto)</span>}</Label>
              <Select value={autoCat && description.trim() ? autoCategorize(description) : category} onValueChange={(v) => { setAutoCat(false); setCategory(v); }}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>{CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="md:col-span-1">
              <Label>Date</Label>
              <Input className="mt-1" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div className="md:col-span-6 flex items-center gap-4">
              <Button type="submit" disabled={add.isPending}>{add.isPending ? "Adding..." : "Add transaction"}</Button>
              <label className="flex items-center gap-2 text-sm text-muted-foreground">
                <input type="checkbox" checked={autoCat} onChange={(e) => setAutoCat(e.target.checked)} className="rounded" />
                Auto-categorize from description
              </label>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>All transactions ({txns.length})</CardTitle></CardHeader>
        <CardContent>
          {txns.length === 0 ? <p className="text-sm text-muted-foreground">Nothing yet.</p> : (
            <div className="divide-y divide-border">
              {txns.map((t) => (
                <div key={t.id} className="flex items-center justify-between gap-3 py-3">
                  <div className="min-w-0">
                    <div className="font-medium truncate">{t.description || t.category}</div>
                    <div className="text-xs text-muted-foreground">
                      {t.category} · {t.transaction_date}
                      {t.is_haram && <span className="ml-2 text-amber-500" title={t.haram_reason ?? ""}>⚠ {t.haram_reason}</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <div className="text-right">
                      <div className={t.type === "income" ? "text-emerald-500 font-medium" : "text-rose-500 font-medium"}>
                        {t.type === "income" ? "+" : "-"}${t.amount.toFixed(2)}
                      </div>
                      {t.cash_amount != null && (
                        <div className="text-xs text-muted-foreground">
                          Cash ${t.cash_amount.toFixed(2)} | Credit ${(t.credit_amount ?? 0).toFixed(2)}
                        </div>
                      )}
                    </div>
                    <button onClick={() => openEdit(t)} className="text-muted-foreground hover:text-foreground" title="Edit"><Pencil className="h-4 w-4" /></button>
                    <button onClick={() => del.mutate(t.id)} className="text-muted-foreground hover:text-destructive" title="Delete"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={!!editTxn} onOpenChange={(open) => { if (!open) setEditTxn(null); }}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Edit transaction</DialogTitle></DialogHeader>
          <form onSubmit={(e) => { e.preventDefault(); edit.mutate(); }} className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>Type</Label>
              <Select value={editType} onValueChange={(v) => setEditType(v as TxnType)}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="expense">Expense</SelectItem>
                  <SelectItem value="income">Income</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Total Amount</Label>
              <Input className="mt-1" type="number" step="0.01" min="0" required value={editAmount} onChange={(e) => setEditAmount(e.target.value)} />
            </div>
            <div>
              <Label>Cash Amount</Label>
              <Input
                className="mt-1"
                type="number"
                step="0.01"
                min="0"
                max={editTotalNum || undefined}
                placeholder="0.00"
                value={editCashAmount}
                onChange={(e) => setEditCashAmount(e.target.value)}
              />
            </div>
            <div>
              <Label>Credit Amount <span className="text-xs text-muted-foreground">(auto)</span></Label>
              <Input
                className="mt-1 opacity-70 cursor-not-allowed"
                type="number"
                step="0.01"
                readOnly
                tabIndex={-1}
                value={editCashAmount !== "" ? editCreditNum.toFixed(2) : ""}
                placeholder="= Total − Cash"
              />
            </div>
            <div>
              <Label>Category</Label>
              <Select value={editCategory} onValueChange={setEditCategory}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>{CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div>
              <Label>Date</Label>
              <Input className="mt-1" type="date" value={editDate} onChange={(e) => setEditDate(e.target.value)} />
            </div>
            <div className="md:col-span-2">
              <Label>Description</Label>
              <Input className="mt-1" value={editDescription} onChange={(e) => setEditDescription(e.target.value)} placeholder="e.g. Grocery shopping" />
            </div>
            <DialogFooter className="md:col-span-2">
              <Button type="button" variant="outline" onClick={() => setEditTxn(null)}>Cancel</Button>
              <Button type="submit" disabled={edit.isPending}>{edit.isPending ? "Saving..." : "Save changes"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

/* ── Goals ── */
function GoalsPanel() {
  const qc = useQueryClient();
  const [name, setName] = useState("");
  const [target, setTarget] = useState("");
  const [date, setDate] = useState("");

  const { data: goals = [] } = useQuery({ queryKey: ["goals"], queryFn: () => getGoals() });

  const add = useMutation({
    mutationFn: () => addGoal({ name, target_amount: Number(target), target_date: date || null }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["goals"] }); setName(""); setTarget(""); setDate(""); toast.success("Goal added"); },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Failed"),
  });
  const contribute = useMutation({
    mutationFn: ({ id, current, amount }: { id: string; current: number; amount: number }) => updateGoal(id, { current_amount: current + amount }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["goals"] }),
  });
  const del = useMutation({
    mutationFn: (id: string) => deleteGoal(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["goals"] }),
  });

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl">Savings goals</h3>
        <p className="text-sm text-muted-foreground">Set targets and track your progress.</p>
      </div>
      <Card>
        <CardHeader><CardTitle>New goal</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={(e) => { e.preventDefault(); add.mutate(); }} className="grid gap-4 md:grid-cols-4">
            <div className="md:col-span-2"><Label>Name</Label><Input className="mt-1" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Emergency fund" /></div>
            <div><Label>Target amount</Label><Input className="mt-1" type="number" min="1" step="0.01" required value={target} onChange={(e) => setTarget(e.target.value)} /></div>
            <div><Label>Target date</Label><Input className="mt-1" type="date" value={date} onChange={(e) => setDate(e.target.value)} /></div>
            <div className="md:col-span-4"><Button type="submit" disabled={add.isPending}>Add goal</Button></div>
          </form>
        </CardContent>
      </Card>
      <div className="grid gap-4 md:grid-cols-2">
        {goals.map((g) => {
          const pct = Math.min(100, (g.current_amount / g.target_amount) * 100);
          return (
            <Card key={g.id}>
              <CardHeader className="flex flex-row items-start justify-between">
                <div><CardTitle>{g.name}</CardTitle><p className="mt-1 text-xs text-muted-foreground">${g.current_amount.toFixed(2)} of ${g.target_amount.toFixed(2)}{g.target_date ? ` · by ${g.target_date}` : ""}</p></div>
                <button onClick={() => del.mutate(g.id)} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
              </CardHeader>
              <CardContent className="space-y-3">
                <Progress value={pct} />
                <div className="flex gap-2">{[10, 50, 100].map((v) => <Button key={v} size="sm" variant="outline" onClick={() => contribute.mutate({ id: g.id, current: g.current_amount, amount: v })}>+${v}</Button>)}</div>
              </CardContent>
            </Card>
          );
        })}
        {goals.length === 0 && <p className="text-sm text-muted-foreground">No goals yet.</p>}
      </div>
    </div>
  );
}

/* ── Budgets (with Other description) ── */
function BudgetsPanel() {
  const qc = useQueryClient();
  const [category, setCategory] = useState<string>("Food");
  const [limit, setLimit] = useState("");
  const [otherDesc, setOtherDesc] = useState("");

  const { data: budgets = [] } = useQuery({ queryKey: ["budgets"], queryFn: () => getBudgets() });
  const { data: txns = [] } = useQuery({ queryKey: ["transactions"], queryFn: () => getTransactions() });

  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().slice(0, 10);
  const spentBy: Record<string, number> = {};
  for (const t of txns) {
    if (t.type !== "expense" || t.transaction_date < monthStart) continue;
    const key = t.category === "Other" && t.description ? `Other: ${t.description}` : t.category;
    spentBy[key] = (spentBy[key] ?? 0) + t.amount;
  }

  const add = useMutation({
    mutationFn: () => {
      const cat = category === "Other" && otherDesc.trim() ? `Other: ${otherDesc.trim()}` : category;
      upsertBudget(cat, Number(limit));
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["budgets"] }); setLimit(""); setOtherDesc(""); toast.success("Budget saved"); },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Failed"),
  });
  const del = useMutation({
    mutationFn: (id: string) => deleteBudget(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["budgets"] }),
  });

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl">Budgets</h3>
        <p className="text-sm text-muted-foreground">Set monthly limits per category. Get alerted when you go over.</p>
      </div>
      <Card>
        <CardHeader><CardTitle>Set / update a budget</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={(e) => { e.preventDefault(); add.mutate(); }} className="grid gap-4 md:grid-cols-3">
            <div>
              <Label>Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>{CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            {category === "Other" && (
              <div className="md:col-span-1">
                <Label>Describe this category</Label>
                <Input className="mt-1" required value={otherDesc} onChange={(e) => setOtherDesc(e.target.value)} placeholder="e.g. Gifts, Subscriptions" />
              </div>
            )}
            <div>
              <Label>Monthly limit</Label>
              <Input className="mt-1" type="number" min="1" step="0.01" required value={limit} onChange={(e) => setLimit(e.target.value)} />
            </div>
            <div className="flex items-end"><Button type="submit">Save budget</Button></div>
          </form>
        </CardContent>
      </Card>
      <div className="grid gap-4 md:grid-cols-2">
        {budgets.map((b) => {
          const spent = spentBy[b.category] ?? 0;
          const pct = Math.min(100, (spent / b.monthly_limit) * 100);
          const over = spent > b.monthly_limit;
          const near = spent > b.monthly_limit * 0.8 && !over;
          return (
            <Card key={b.id}>
              <CardHeader className="flex flex-row items-start justify-between">
                <div><CardTitle>{b.category}</CardTitle><p className="mt-1 text-xs text-muted-foreground">${spent.toFixed(2)} of ${b.monthly_limit.toFixed(2)} this month</p></div>
                <button onClick={() => del.mutate(b.id)} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
              </CardHeader>
              <CardContent className="space-y-2">
                <Progress value={pct} />
                {over && <div className="flex items-center gap-2 text-sm text-rose-500"><AlertTriangle className="h-4 w-4" /> Over budget by ${(spent - b.monthly_limit).toFixed(2)}</div>}
                {near && <div className="flex items-center gap-2 text-sm text-amber-500"><AlertTriangle className="h-4 w-4" /> Approaching limit</div>}
              </CardContent>
            </Card>
          );
        })}
        {budgets.length === 0 && <p className="text-sm text-muted-foreground">No budgets yet.</p>}
      </div>
    </div>
  );
}

/* ── Bills ── */
function BillsPanel() {
  const qc = useQueryClient();
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("Utilities");
  const [recurring, setRecurring] = useState("monthly");
  const [autopay, setAutopay] = useState(false);

  const { data: bills = [] } = useQuery({ queryKey: ["bills"], queryFn: () => getBills() });

  const add = useMutation({
    mutationFn: () => addBill({ name, amount: Number(amount), due_date: dueDate, category, recurring, paid: false, autopay, payment_method: null }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["bills"] }); setName(""); setAmount(""); setDueDate(""); toast.success("Bill added"); },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Failed"),
  });
  const togglePaid = useMutation({
    mutationFn: ({ id, paid }: { id: string; paid: boolean }) => updateBill(id, { paid: !paid }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["bills"] }),
  });
  const del = useMutation({
    mutationFn: (id: string) => deleteBill(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["bills"] }),
  });

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl">Bill Pay</h3>
        <p className="text-sm text-muted-foreground">Track recurring bills and never miss a due date.</p>
      </div>
      <Card>
        <CardHeader><CardTitle>Add bill</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={(e) => { e.preventDefault(); add.mutate(); }} className="grid gap-4 md:grid-cols-3">
            <div><Label>Name</Label><Input className="mt-1" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Electric bill" /></div>
            <div><Label>Amount</Label><Input className="mt-1" type="number" step="0.01" min="0" required value={amount} onChange={(e) => setAmount(e.target.value)} /></div>
            <div><Label>Due date</Label><Input className="mt-1" type="date" required value={dueDate} onChange={(e) => setDueDate(e.target.value)} /></div>
            <div>
              <Label>Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>{CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div>
              <Label>Recurring</Label>
              <Select value={recurring} onValueChange={setRecurring}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                  <SelectItem value="one-time">One-time</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={autopay} onChange={(e) => setAutopay(e.target.checked)} /> Autopay
              </label>
            </div>
            <div className="md:col-span-3"><Button type="submit" disabled={add.isPending}>Add bill</Button></div>
          </form>
        </CardContent>
      </Card>
      <div className="grid gap-4 md:grid-cols-2">
        {bills.map((b) => (
          <Card key={b.id}>
            <CardHeader className="flex flex-row items-start justify-between">
              <div>
                <CardTitle className={b.paid ? "line-through text-muted-foreground" : ""}>{b.name}</CardTitle>
                <p className="mt-1 text-xs text-muted-foreground">${b.amount.toFixed(2)} · due {b.due_date} · {b.recurring}</p>
              </div>
              <button onClick={() => del.mutate(b.id)} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
            </CardHeader>
            <CardContent>
              <Button size="sm" variant={b.paid ? "outline" : "default"} onClick={() => togglePaid.mutate({ id: b.id, paid: b.paid })}>
                {b.paid ? "Mark unpaid" : "Mark paid"}
              </Button>
            </CardContent>
          </Card>
        ))}
        {bills.length === 0 && <p className="text-sm text-muted-foreground">No bills yet.</p>}
      </div>
    </div>
  );
}

/* ── Rewinder ── */
function RewinderPanel() {
  const { data: txns = [] } = useQuery({ queryKey: ["transactions"], queryFn: () => getTransactions() });
  const months = useMemo(() => {
    const map: Record<string, { income: number; expenses: number; count: number }> = {};
    for (const t of txns) {
      const key = monthKey(t.transaction_date);
      if (!map[key]) map[key] = { income: 0, expenses: 0, count: 0 };
      if (t.type === "income") map[key].income += t.amount;
      else map[key].expenses += t.amount;
      map[key].count++;
    }
    return Object.entries(map).sort().reverse();
  }, [txns]);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl">Rewinder</h3>
        <p className="text-sm text-muted-foreground">Replay your financial history month by month.</p>
      </div>
      {months.length === 0 ? <p className="text-sm text-muted-foreground">No data yet.</p> : (
        <div className="space-y-4">
          {months.map(([key, data]) => (
            <Card key={key}>
              <CardHeader><CardTitle>{monthLabel(key)} {key.slice(0, 4)}</CardTitle></CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-3">
                <div><div className="text-xs text-muted-foreground">Income</div><div className="text-lg text-emerald-500">{fmt(data.income)}</div></div>
                <div><div className="text-xs text-muted-foreground">Expenses</div><div className="text-lg text-rose-500">{fmt(data.expenses)}</div></div>
                <div><div className="text-xs text-muted-foreground">Net</div><div className="text-lg">{fmt(data.income - data.expenses)}</div></div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Calculators ── */
function CalculatorsPanel() {
  const [zakatSavings, setZakatSavings] = useState("");
  const [zakatGold, setZakotGold] = useState("");
  const [zakatSilver, setZakotSilver] = useState("");
  const [zakatInvestments, setZakatInvestments] = useState("");
  const [zakatDebts, setZakotDebts] = useState("");

  const totalAssets = (Number(zakatSavings) || 0) + (Number(zakatGold) || 0) + (Number(zakatSilver) || 0) + (Number(zakatInvestments) || 0);
  const netAssets = totalAssets - (Number(zakatDebts) || 0);
  const nisab = 612.36;
  const zakatDue = netAssets >= nisab ? netAssets * 0.025 : 0;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl">Calculators</h3>
        <p className="text-sm text-muted-foreground">Zakat and financial calculators.</p>
      </div>
      <Card>
        <CardHeader><CardTitle>Zakat Calculator</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div><Label>Savings & Cash</Label><Input className="mt-1" type="number" step="0.01" value={zakatSavings} onChange={(e) => setZakatSavings(e.target.value)} placeholder="0.00" /></div>
            <div><Label>Gold Value</Label><Input className="mt-1" type="number" step="0.01" value={zakatGold} onChange={(e) => setZakotGold(e.target.value)} placeholder="0.00" /></div>
            <div><Label>Silver Value</Label><Input className="mt-1" type="number" step="0.01" value={zakatSilver} onChange={(e) => setZakotSilver(e.target.value)} placeholder="0.00" /></div>
            <div><Label>Investments</Label><Input className="mt-1" type="number" step="0.01" value={zakatInvestments} onChange={(e) => setZakatInvestments(e.target.value)} placeholder="0.00" /></div>
            <div><Label>Outstanding Debts</Label><Input className="mt-1" type="number" step="0.01" value={zakatDebts} onChange={(e) => setZakotDebts(e.target.value)} placeholder="0.00" /></div>
          </div>
          <div className="rounded-lg border border-border p-4 space-y-2">
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Total assets</span><span>{fmt(totalAssets)}</span></div>
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Net assets (after debts)</span><span>{fmt(netAssets)}</span></div>
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Nisab threshold</span><span>{fmt(nisab)}</span></div>
            <div className="border-t border-border pt-2 flex justify-between"><span className="font-medium">Zakat due (2.5%)</span><span className="text-lg font-semibold text-[color:var(--brand-bolt)]">{fmt(zakatDue)}</span></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/* ── Compliance (Fraud Detection as Notifications) ── */
function CompliancePanel() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<{ isHaram: boolean; reason?: string } | null>(null);

  const { data: flagged = [] } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => getTransactions(),
    select: (txns) => txns.filter((t) => t.is_haram),
  });

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl">Islamic compliance</h3>
        <p className="text-sm text-muted-foreground">Auto-detects interest, gambling, alcohol and other non-compliant transactions.</p>
      </div>

      <Card>
        <CardHeader><CardTitle>Check a transaction</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div>
            <Label>Description</Label>
            <Input className="mt-1" placeholder="e.g. Bank interest income" value={text} onChange={(e) => setText(e.target.value)} />
          </div>
          <Button onClick={() => setResult(detectHaram(text))}>Check compliance</Button>
          {result && (
            <div className={cn("flex items-center gap-2 rounded-lg border p-3 text-sm", result.isHaram ? "border-amber-500/40 bg-amber-500/10 text-amber-500" : "border-emerald-500/40 bg-emerald-500/10 text-emerald-500")}>
              {result.isHaram ? <AlertTriangle className="h-4 w-4" /> : <ShieldCheck className="h-4 w-4" />}
              {result.isHaram ? result.reason : "Looks Shariah-compliant"}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-amber-500" /> Compliance notifications</CardTitle>
          {flagged.length > 0 && <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-xs text-amber-500">{flagged.length} flagged</span>}
        </CardHeader>
        <CardContent>
          {flagged.length === 0 ? (
            <div className="flex items-center gap-2 text-sm text-emerald-500"><ShieldCheck className="h-4 w-4" /> No compliance issues detected. All clear.</div>
          ) : (
            <div className="space-y-3">
              {flagged.map((t) => (
                <div key={t.id} className="flex items-start gap-3 rounded-lg border border-amber-500/30 bg-amber-500/5 p-3">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/20">
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium">{t.description || t.category}</div>
                    <div className="text-xs text-amber-500 mt-0.5">{t.haram_reason}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{t.category} · {t.transaction_date} · ${t.amount.toFixed(2)}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

/* ── AI Assistant (Gemini-powered) ── */
type ChatMsg = { role: "user" | "assistant"; content: string };

function ChatPanel() {
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);
  useEffect(() => { inputRef.current?.focus(); }, []);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || loading) return;
    const userMsg: ChatMsg = { role: "user", content: input.trim() };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) throw new Error("VITE_GEMINI_API_KEY is not set in Vercel env vars");

      const res = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": apiKey,
          },
          body: JSON.stringify({
            contents: [
              ...messages.map((m) => ({ role: m.role === "assistant" ? "model" : "user", parts: [{ text: m.content }] })),
              { role: "user", parts: [{ text: userMsg.content }] },
            ],
            systemInstruction: { parts: [{ text: "You are Tactifin's AI financial assistant. You help with budgeting, Zakat, Islamic finance, expense tracking, and general financial questions. Keep answers concise and helpful." }] },
          }),
        },
      );

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        const errMsg = (errData as { error?: { message?: string } })?.error?.message ?? res.statusText;
        throw new Error(`Gemini ${res.status}: ${errMsg}`);
      }
      const data = await res.json();
      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "Sorry, I could not generate a response.";
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setMessages((m) => [...m, { role: "assistant", content: `⚠️ ${msg}` }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-2xl">AI Assistant</h3>
        <p className="text-sm text-muted-foreground">Ask about budgeting, Zakat, taxes, or whether a transaction is Shariah-compliant.</p>
      </div>
      <Card className="overflow-hidden">
        <div className="flex flex-col h-[420px]">
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 && !loading && (
              <div className="flex flex-col items-center gap-3 pt-12 text-center text-muted-foreground">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-gradient">
                  <Bot className="h-6 w-6 text-white" />
                </div>
                <p className="text-sm max-w-xs">Ask me anything about your finances — budgeting tips, Zakat calculations, or Shariah compliance questions.</p>
                <div className="flex flex-wrap gap-2 justify-center mt-2">
                  {["How do I calculate Zakat?", "Tips for saving money", "Is interest haram?", "How to budget effectively"].map((s) => (
                    <button key={s} onClick={() => setInput(s)} className="rounded-full border border-border/60 bg-card px-3 py-1.5 text-xs text-muted-foreground hover:border-[color:var(--brand-bolt)]/40 hover:text-foreground transition-colors">
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={cn("flex gap-2", m.role === "user" ? "justify-end" : "justify-start")}>
                {m.role !== "user" && (
                  <div className="h-7 w-7 shrink-0 rounded-full bg-brand-gradient flex items-center justify-center text-white">
                    <Bot className="h-3.5 w-3.5" />
                  </div>
                )}
                <div className={cn(
                  "rounded-2xl px-3 py-2 text-sm whitespace-pre-wrap break-words max-w-[75%]",
                  m.role === "user" ? "bg-primary text-primary-foreground rounded-br-none" : "bg-accent text-foreground rounded-bl-none",
                )}>
                  {m.content}
                </div>
                {m.role === "user" && (
                  <div className="h-7 w-7 shrink-0 rounded-full bg-muted flex items-center justify-center">
                    <User className="h-3.5 w-3.5" />
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex gap-2">
                <div className="h-7 w-7 shrink-0 rounded-full bg-brand-gradient flex items-center justify-center text-white">
                  <Bot className="h-3.5 w-3.5" />
                </div>
                <div className="rounded-2xl bg-accent px-3 py-2 text-sm text-muted-foreground rounded-bl-none">Thinking…</div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
          <form onSubmit={send} className="border-t border-border p-3 flex items-end gap-2 bg-background shrink-0">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(e); } }}
              placeholder="Ask AI..."
              rows={1}
              className="flex-1 min-w-0 resize-none rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
            />
            <Button type="submit" disabled={loading || !input.trim()} size="icon" className="shrink-0 h-9 w-9">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}

/* ── Tips & News ── */
const TIPS = [
  { icon: Lightbulb, title: "The 50/30/20 Rule", category: "Budgeting", readTime: "3 min", content: "Allocate 50% of your income to needs, 30% to wants, and 20% to savings and debt repayment. This simple framework keeps spending balanced without requiring complex spreadsheets." },
  { icon: ShieldCheck, title: "Understanding Zakat", category: "Islamic Finance", readTime: "5 min", content: "Zakat is 2.5% of your qualifying wealth above the nisab threshold, paid annually. It applies to cash, gold, silver, and investments. Use the Zakat Calculator tab to calculate yours." },
  { icon: TrendingUp, title: "Building an Emergency Fund", category: "Savings", readTime: "4 min", content: "Aim for 3-6 months of living expenses in an easily accessible account. Start small — even $500 can prevent a financial crisis. Automate transfers to stay consistent." },
  { icon: AlertTriangle, title: "Avoiding Riba (Interest)", category: "Islamic Finance", readTime: "3 min", content: "Interest is prohibited in Islam. Avoid conventional mortgages, interest-bearing accounts, and credit card debt. Look for Shariah-compliant alternatives like Murabaha or Ijara." },
  { icon: Target, title: "SMART Financial Goals", category: "Planning", readTime: "4 min", content: "Make goals Specific, Measurable, Achievable, Relevant, and Time-bound. Instead of 'save money,' try 'save $5,000 for Hajj by December 2026.' Use the Goals tab to track progress." },
  { icon: CreditCard, title: "Bill Management Tips", category: "Organization", readTime: "3 min", content: "Set up autopay for fixed bills to avoid late fees. Review variable bills monthly. Use the Bill Pay tab to track due dates and never miss a payment." },
];

function NewsPanel() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl">Tips & News</h3>
        <p className="text-sm text-muted-foreground">Financial tips and guidance to help you make better decisions.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {TIPS.map((tip) => (
          <Card key={tip.title} className="group hover:border-[color:var(--brand-bolt)]/40 transition-colors">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[color:var(--brand-bolt)]/10">
                  <tip.icon className="h-5 w-5 text-[color:var(--brand-bolt)]" />
                </div>
              </div>
              <CardTitle className="mt-3 text-lg">{tip.title}</CardTitle>
              <div className="text-xs text-[color:var(--brand-bolt)]">{tip.category}</div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{tip.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ── Learning ── */
const COURSES = [
  {
    icon: BookOpen,
    title: "Islamic Finance Fundamentals",
    lessons: 8, level: "Beginner",
    description: "Learn the core principles of Shariah-compliant finance — from Zakat to halal investing and avoiding riba.",
    content: [
      {
        heading: "What is Shariah-compliant finance?",
        body: "Shariah-compliant finance just means handling money in a way that follows Islamic law. The big rules are: no interest (called Riba), no investing in businesses that harm people (like alcohol, gambling, or weapons), and no extreme uncertainty in contracts. Think of it as ethical finance with a spiritual foundation.",
      },
      {
        heading: "Why is interest (Riba) forbidden?",
        body: "In Islam, money on its own shouldn't grow — only real work and trade should create wealth. When a bank charges you interest, you're paying for the passage of time, not for any real service. Islam sees this as unfair because the lender gets richer without taking any real risk. Instead of interest, Islamic banks use profit-sharing: they invest your money in real businesses and share the gains (and losses) with you.",
      },
      {
        heading: "What is Zakat and how do you calculate it?",
        body: "Zakat is a yearly charity that every Muslim must give if their savings stay above a minimum threshold (the Nisab) for a full lunar year. The Nisab is roughly the value of 85 grams of gold. If you have more than that saved up, you give 2.5% of it. Example: if you have $10,000 in savings all year, your Zakat is $250. It purifies your wealth and helps those in need.",
      },
      {
        heading: "Halal vs Haram investments — the simple test",
        body: "Ask yourself: does this company make money from alcohol, pork, gambling, conventional banks, weapons, or adult content? If yes, avoid it. If no, it might be halal — but also check the company's debt level. A company that is loaded with interest-based loans is still problematic. Tools like Tactifin's compliance checker do this screening for you automatically.",
      },
      {
        heading: "What is a Sukuk?",
        body: "A Sukuk is the Islamic version of a bond. Normal bonds pay you interest. Sukuk work differently — you actually own a piece of a real asset (like a building or infrastructure project), and your return comes from the rent or profit that asset generates. Same idea as a bond (regular income, relatively safe), but structured to avoid interest.",
      },
      {
        heading: "What is Murabaha (Islamic mortgage)?",
        body: "Instead of lending you money and charging interest, an Islamic bank buys the house for you, then sells it to you at a higher fixed price that you pay off in instalments. The profit is built into the price upfront — not charged over time as interest. The total amount you pay is the same as a regular mortgage in practice, but the structure is Shariah-compliant.",
      },
      {
        heading: "Musharakah — profit sharing",
        body: "Musharakah means partnership. You and the bank both own a share of the asset. You pay rent on the bank's share, and as you pay down the purchase, you own more and the bank owns less. Eventually you own it fully. This is another halal alternative to a conventional mortgage.",
      },
      {
        heading: "Quick summary",
        body: "Islamic finance is not complicated — avoid interest, avoid harmful industries, and make sure your contracts are clear and fair. Zakat keeps wealth circulating. Profit-sharing replaces lending. Real assets back everything. That's the whole idea.",
      },
    ],
  },
  {
    icon: Wallet,
    title: "Personal Budgeting 101",
    lessons: 6, level: "Beginner",
    description: "Master the basics of income tracking, expense categorization, and building a budget that actually works.",
    content: [
      {
        heading: "Why most people don't budget — and why they should",
        body: "Budgeting sounds boring, but it's really just telling your money where to go instead of wondering where it went. Without a budget, spending expands to fill whatever income you have. With one, you decide in advance what matters — and you stop accidentally funding things you don't care about.",
      },
      {
        heading: "The 50/30/20 rule",
        body: "Split your take-home pay into three buckets: 50% for needs (rent, food, transport, utilities), 30% for wants (eating out, entertainment, subscriptions), and 20% for saving and paying off debt. It's a starting point, not a law — if you live in an expensive city, your needs bucket might be 60%. Adjust to fit your life, but keep savings as non-negotiable.",
      },
      {
        heading: "Building an emergency fund",
        body: "Before you invest or pay off extra debt, save 3 to 6 months of essential expenses in a separate account you don't touch. Essential expenses means rent, food, utilities, and transport — not Netflix. This fund is your shield. Without it, any emergency (car repair, job loss, hospital visit) puts you into debt.",
      },
      {
        heading: "Good debt vs bad debt",
        body: "Not all debt is equal. A mortgage on a home that's appreciating in value is different from credit card debt at 20% interest. Good debt helps you build wealth or earn income. Bad debt finances things you've already consumed. The rule: if the interest rate is higher than what you could earn by investing, pay off the debt first.",
      },
      {
        heading: "Credit cards — tool or trap?",
        body: "A credit card is a great tool if you pay the full balance every month. You get rewards, fraud protection, and credit score building — for free. It becomes a trap the moment you carry a balance, because interest compounds fast. Treat your credit card like a debit card: only spend what you already have in your account.",
      },
      {
        heading: "Automate your finances",
        body: "The best budgeting system is one that runs without you. On payday, set up automatic transfers: savings first, then bills. What's left is yours to spend freely without guilt. Automating removes willpower from the equation — you can't accidentally spend what's already been moved.",
      },
    ],
  },
  {
    icon: TrendingUp,
    title: "Investing for Beginners",
    lessons: 10, level: "Intermediate",
    description: "Understand stocks, bonds, ETFs, and halal investment options. Learn portfolio diversification and risk management.",
    content: [
      {
        heading: "Why invest at all?",
        body: "Inflation eats your savings. If your money sits in a regular bank account earning 1% while inflation is 3%, you're losing purchasing power every year. Investing puts your money to work so it grows faster than inflation. Even small amounts invested consistently over decades can compound into significant wealth.",
      },
      {
        heading: "Risk and return — the basic trade-off",
        body: "Higher potential returns always come with higher risk. A savings account is safe but grows slowly. Stocks can double your money — or lose half of it. The key insight: the longer your time horizon, the more risk you can take, because you have time to recover from downturns. Short-term money (you'll need it in 2 years) should be in safe places. Long-term money (10+ years) can be in stocks.",
      },
      {
        heading: "Stocks, bonds, and ETFs explained simply",
        body: "A stock is a tiny piece of ownership in a company. A bond is a loan you give to a company or government, and they pay you interest. An ETF (Exchange-Traded Fund) is a basket of stocks or bonds that you buy as one thing — so instead of owning one company, you own a small slice of hundreds. ETFs are the easiest way for beginners to diversify instantly.",
      },
      {
        heading: "Dollar-cost averaging",
        body: "Nobody can time the market perfectly. Dollar-cost averaging means investing a fixed amount every month no matter what the market is doing. When prices are high, you buy fewer shares. When prices are low, you buy more. Over time, your average cost per share comes out reasonable. It removes emotion from investing and keeps you consistent.",
      },
      {
        heading: "Halal investing — what to look for",
        body: "For halal investing, screen out companies in alcohol, tobacco, pork, gambling, conventional finance, weapons, and adult content. Also avoid companies with excessive debt (usually above 33% of their total assets in interest-based loans). Halal ETFs do this screening for you. Examples include certain Islamic finance ETFs and Shariah-screened index funds.",
      },
      {
        heading: "Diversification — don't put all eggs in one basket",
        body: "Spread your investments across different companies, industries, and countries. If one sector crashes, your whole portfolio doesn't crash with it. A simple diversified portfolio could be: a global stock ETF, a bond fund, and some real estate exposure. That alone beats most active investors over the long term.",
      },
      {
        heading: "Common mistakes beginners make",
        body: "Trying to pick winning stocks. Selling when the market drops (panic selling). Waiting for the 'right time' to invest (there isn't one). Investing money you'll need soon. Checking your portfolio every day. The fix for all of these: automate monthly contributions into a diversified ETF, and don't look at it more than once a quarter.",
      },
    ],
  },
  {
    icon: Target,
    title: "Goal-Based Savings",
    lessons: 5, level: "Beginner",
    description: "Set meaningful financial goals and build a savings plan to reach them. Includes emergency funds, Hajj, and retirement planning.",
    content: [
      {
        heading: "Why vague goals fail",
        body: '"Save more money" is not a goal — it\'s a wish. A goal is: "Save $5,000 for Hajj in 18 months." That breaks down to $278 per month. Specific goals with deadlines and amounts are the only kind that actually work, because you can calculate exactly what to do each month and track whether you\'re on track.',
      },
      {
        heading: "Short, medium, and long-term buckets",
        body: "Divide your saving goals by time horizon. Short-term (under 2 years): emergency fund, holiday, phone. Keep these in a high-yield savings account — safe and accessible. Medium-term (2–10 years): house deposit, Hajj, car. Low-risk investments or savings. Long-term (10+ years): retirement, children's education. This money can be invested in stocks because you have time to ride out volatility.",
      },
      {
        heading: "How to calculate your monthly saving target",
        body: "Take the total amount you need, divide by the number of months until your goal, and that's your monthly number. Example: Need $12,000 for a house deposit in 3 years (36 months)? That's $333/month. If that's too much for your budget, either extend the timeline or reduce the target. No maths beyond division required.",
      },
      {
        heading: "Saving for Hajj",
        body: "Hajj costs vary significantly by country and package, but budgeting $5,000–$10,000 is reasonable for most people. Start a dedicated Hajj savings account and treat contributions like a bill. If you start early, even $100–$200/month compounds meaningfully over several years. Some Islamic banks offer dedicated Hajj savings accounts with Shariah-compliant returns.",
      },
      {
        heading: "Retirement — start earlier than you think",
        body: "The earlier you start, the less you need to save each month. $200/month from age 25 grows to roughly the same as $600/month from age 40, assuming the same return. The difference is time and compounding. Even if retirement feels far away, starting small now beats starting big later. Use any tax-advantaged accounts available in your country.",
      },
    ],
  },
  {
    icon: ShieldCheck,
    title: "Islamic Compliance in Daily Finance",
    lessons: 7, level: "Intermediate",
    description: "Practical guidance on keeping your daily financial life Shariah-compliant — banking, insurance, and business transactions.",
    content: [
      {
        heading: "Shariah-compliant banking",
        body: "A regular bank takes your deposits, lends them out at interest, and pays you a smaller interest rate. An Islamic bank invests your money in real assets or trade, then shares the profit with you. Look for banks that offer Murabaha accounts, profit-sharing savings, and interest-free current accounts. In countries without Islamic banks, a regular current account (no interest earned, no overdraft interest) is generally acceptable.",
      },
      {
        heading: "Takaful vs conventional insurance",
        body: "Regular insurance involves paying premiums into a pool where the company profits from the difference. Takaful is cooperative insurance: participants contribute to a shared fund to help each other, and any surplus is returned to participants. It avoids the uncertainty (gharar) and interest elements of conventional insurance. Where Takaful isn't available, most scholars allow conventional insurance for necessities like health and car insurance.",
      },
      {
        heading: "Business and trade",
        body: "Islamic business ethics require transparency, fairness, and mutual consent. Contracts must be clear about what is being sold, at what price, and when delivery happens. Selling something you don't own yet (short selling) is generally not allowed. Partnerships should specify profit-sharing ratios upfront. A handshake deal is binding in Islamic law — written contracts just make it easier to verify.",
      },
      {
        heading: "How to screen stocks",
        body: "Step 1: Check the business — does it earn revenue from haram industries? If more than 5% of revenue comes from alcohol, pork, gambling, adult content, weapons, or conventional finance, skip it. Step 2: Check debt — is more than 33% of the company's assets financed by interest-bearing loans? If yes, it's risky. Step 3: Check cash — is more than 33% of assets in interest-bearing deposits? Same concern. Tactifin's compliance checker automates all three steps.",
      },
      {
        heading: "Handling interest income you can't avoid",
        body: "Sometimes interest lands in your account whether you want it or not — a regular savings account, a work pension fund, a government savings bond. The solution is purification: donate the interest amount to charity. You don't benefit from it, and you don't sin for receiving it accidentally. Track it separately and give it away each year.",
      },
      {
        heading: "Crypto — halal or haram?",
        body: "This is genuinely debated among scholars. The main concerns are: extreme speculation (gharar), no underlying asset, and potential use in illegal transactions. Bitcoin and Ethereum are considered permissible by some scholars when used as a medium of exchange or store of value — not for speculation. Others disagree entirely. The safe approach: treat crypto as a small, speculative part of your portfolio and avoid meme coins entirely.",
      },
      {
        heading: "Grey areas — a practical guide",
        body: "When you're genuinely unsure whether something is halal, ask: does this involve interest? Excessive uncertainty? Harm to others? Deception? If the answer is no to all four, it's probably fine. When in doubt, choose the more conservative option. The Prophet ﷺ said: leave what makes you doubt for what does not make you doubt. Financial peace of mind has real value.",
      },
    ],
  },
  {
    icon: Calculator,
    title: "Zakat & Tax Calculations",
    lessons: 4, level: "Beginner",
    description: "Step-by-step guides to calculating Zakat on various asset types and understanding your tax obligations.",
    content: [
      {
        heading: "Zakat on cash and savings",
        body: "If your total savings (cash in hand + bank accounts) stay above the Nisab for a full lunar year, you owe 2.5% of that amount. Nisab = value of 85g of gold (roughly $5,000–$6,000 depending on gold prices — check current rates). Example: you have $8,000 in savings all year. Nisab is $5,500. Your Zakat = 2.5% × $8,000 = $200. Debt you owe can be deducted from your Zakatable assets.",
      },
      {
        heading: "Zakat on gold and silver",
        body: "Gold and silver are Zakatable at their current market value. If you own more than 85g of gold or 595g of silver, you pay 2.5% of the market value of all of it. Jewellery that is worn regularly — scholars differ on this. The majority say it is still Zakatable; some say jewellery in regular use is exempt. The safe approach: include it.",
      },
      {
        heading: "Zakat on investments and business",
        body: "For stocks: calculate the Zakatable portion of the company's assets (cash + inventory) per share you own, and pay 2.5% of that. If that's too complex, a simpler approach accepted by many scholars: pay 2.5% of the current market value of your shares. For business: add up cash, goods for sale, and money owed to you — subtract what you owe others — pay 2.5% on what remains.",
      },
      {
        heading: "Understanding income tax",
        body: "Tax is not the same as Zakat — both are obligations in their respective systems. Most countries use progressive tax brackets: you pay a lower rate on the first portion of your income and higher rates on higher portions. You only pay the top rate on the income above each threshold, not on everything you earn. Deductions (things like pension contributions, charitable donations, work expenses) reduce the income that gets taxed. Always claim every deduction you're entitled to.",
      },
    ],
  },
];

type Course = typeof COURSES[0];

function CourseModal({ course, onClose }: { course: Course; onClose: () => void }) {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-1">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[color:var(--brand-bolt)]/10">
              <course.icon className="h-5 w-5 text-[color:var(--brand-bolt)]" />
            </div>
            <div>
              <DialogTitle className="text-lg leading-snug">{course.title}</DialogTitle>
            </div>
          </div>
        </DialogHeader>

        <p className="text-sm text-muted-foreground">{course.description}</p>

        <div className="space-y-4">
          {course.content.map((section, i) => (
            <div key={i} className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[color:var(--brand-bolt)]/10 text-[10px] font-semibold text-[color:var(--brand-bolt)]">{i + 1}</span>
                <p className="text-sm font-semibold">{section.heading}</p>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed pl-7">{section.body}</p>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function LearnPanel() {
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl">Learning</h3>
        <p className="text-sm text-muted-foreground">Financial literacy courses to grow your knowledge at your own pace.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {COURSES.map((course) => (
          <Card
            key={course.title}
            className="group hover:border-[color:var(--brand-bolt)]/40 transition-colors cursor-pointer"
            onClick={() => setActiveCourse(course)}
          >
            <CardHeader>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[color:var(--brand-bolt)]/10">
                <course.icon className="h-5 w-5 text-[color:var(--brand-bolt)]" />
              </div>
              <CardTitle className="mt-3 text-base">{course.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{course.description}</p>
              <div className="mt-4 flex items-center gap-1 text-sm text-[color:var(--brand-bolt)] group-hover:gap-2 transition-all">
                Start learning <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {activeCourse && <CourseModal course={activeCourse} onClose={() => setActiveCourse(null)} />}
    </div>
  );
}

/* ── helpers ── */
function fmtTk(n: number) {
  return new Intl.NumberFormat("en-BD", { minimumFractionDigits: 3, maximumFractionDigits: 3 }).format(n);
}

/* ══════════════════════════════════════════════════════════════
   JOURNAL PANEL
══════════════════════════════════════════════════════════════ */
function JournalPanel() {
  const qc = useQueryClient();
  const { data: entries = [] } = useQuery({ queryKey: ["journal"], queryFn: getJournalEntries });
  const { data: accounts = [] } = useQuery({ queryKey: ["accounts"], queryFn: getAccounts });

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [narration, setNarration] = useState("");
  const [lines, setLines] = useState<EntryLine[]>([
    { accountName: "", debit: 0, credit: 0 },
    { accountName: "", debit: 0, credit: 0 },
  ]);

  const addMut = useMutation({
    mutationFn: () => {
      const filled = lines.filter(l => l.accountName && (l.debit > 0 || l.credit > 0));
      const totalDr = filled.reduce((s, l) => s + l.debit, 0);
      const totalCr = filled.reduce((s, l) => s + l.credit, 0);
      if (Math.abs(totalDr - totalCr) > 0.001) throw new Error("Debits must equal credits");
      if (filled.length < 2) throw new Error("Need at least 2 lines");
      addJournalEntry({ date, narration, lines: filled });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["journal"] });
      setOpen(false); setNarration(""); setDate(new Date().toISOString().slice(0, 10));
      setLines([{ accountName: "", debit: 0, credit: 0 }, { accountName: "", debit: 0, credit: 0 }]);
      toast.success("Journal entry added");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const delMut = useMutation({
    mutationFn: (id: string) => { deleteJournalEntry(id); },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["journal"] }),
  });

  function setLine(i: number, field: keyof EntryLine, val: string | number) {
    setLines(prev => prev.map((l, idx) => idx === i ? { ...l, [field]: val } : l));
  }
  function addLine() { setLines(prev => [...prev, { accountName: "", debit: 0, credit: 0 }]); }
  function removeLine(i: number) { setLines(prev => prev.filter((_, idx) => idx !== i)); }

  const totalDr = lines.reduce((s, l) => s + (l.debit || 0), 0);
  const totalCr = lines.reduce((s, l) => s + (l.credit || 0), 0);
  const balanced = Math.abs(totalDr - totalCr) < 0.001 && totalDr > 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl">General Journal</h2>
          <p className="text-sm text-muted-foreground">Double-entry journal entries. Debits must equal credits.</p>
        </div>
        <Button onClick={() => setOpen(true)}><Plus className="h-4 w-4 mr-1" /> New entry</Button>
      </div>

      {entries.length === 0 ? (
        <Card><CardContent className="py-12 text-center text-muted-foreground text-sm">No journal entries yet. Click "New entry" to start.</CardContent></Card>
      ) : (
        <div className="space-y-3">
          {entries.map(e => {
            const dr = e.lines.reduce((s, l) => s + l.debit, 0);
            return (
              <Card key={e.id}>
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs text-muted-foreground font-mono">{e.date}</span>
                        <span className="text-sm font-medium">{e.narration || "—"}</span>
                      </div>
                      <table className="w-full text-sm">
                        <thead><tr className="text-xs text-muted-foreground"><th className="text-left pb-1 w-1/2">Account</th><th className="text-right pb-1 w-1/4">Dr</th><th className="text-right pb-1 w-1/4">Cr</th></tr></thead>
                        <tbody>
                          {e.lines.map((l, i) => (
                            <tr key={i}>
                              <td className={l.debit > 0 ? "" : "pl-4 text-muted-foreground"}>{l.accountName}</td>
                              <td className="text-right tabular-nums">{l.debit > 0 ? fmtTk(l.debit) : ""}</td>
                              <td className="text-right tabular-nums text-muted-foreground">{l.credit > 0 ? fmtTk(l.credit) : ""}</td>
                            </tr>
                          ))}
                          <tr className="border-t border-border/60 font-semibold text-xs">
                            <td>Total</td><td className="text-right tabular-nums">{fmtTk(dr)}</td><td className="text-right tabular-nums">{fmtTk(dr)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <button onClick={() => delMut.mutate(e.id)} className="text-muted-foreground hover:text-destructive shrink-0 mt-1"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>New Journal Entry</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Date</Label><Input type="date" className="mt-1" value={date} onChange={e => setDate(e.target.value)} /></div>
              <div><Label>Narration</Label><Input className="mt-1" placeholder="e.g. Cash received from sales" value={narration} onChange={e => setNarration(e.target.value)} /></div>
            </div>
            <div>
              <div className="grid grid-cols-[1fr_100px_100px_32px] gap-2 text-xs text-muted-foreground pb-1">
                <span>Account</span><span className="text-right">Debit (Tk.)</span><span className="text-right">Credit (Tk.)</span><span />
              </div>
              {lines.map((l, i) => (
                <div key={i} className="grid grid-cols-[1fr_100px_100px_32px] gap-2 mb-2">
                  <select value={l.accountName} onChange={e => setLine(i, "accountName", e.target.value)}
                    className="h-9 rounded-md border border-input bg-background px-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring">
                    <option value="">Select account</option>
                    {accounts.map(a => <option key={a.id} value={a.name}>{a.name}</option>)}
                  </select>
                  <Input type="number" min="0" step="0.001" className="text-right" value={l.debit || ""} onChange={e => setLine(i, "debit", parseFloat(e.target.value) || 0)} />
                  <Input type="number" min="0" step="0.001" className="text-right" value={l.credit || ""} onChange={e => setLine(i, "credit", parseFloat(e.target.value) || 0)} />
                  <button onClick={() => removeLine(i)} className="text-muted-foreground hover:text-destructive"><X className="h-4 w-4" /></button>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={addLine}><Plus className="h-3.5 w-3.5 mr-1" /> Add line</Button>
            </div>
            <div className={`flex justify-between text-sm font-medium px-1 ${balanced ? "text-emerald-500" : "text-rose-500"}`}>
              <span>Total Dr: {fmtTk(totalDr)}</span>
              <span>Total Cr: {fmtTk(totalCr)}</span>
              <span>{balanced ? "✓ Balanced" : "✗ Not balanced"}</span>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => addMut.mutate()} disabled={addMut.isPending || !balanced}>
              {addMut.isPending ? "Saving…" : "Post entry"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   LEDGER PANEL
══════════════════════════════════════════════════════════════ */
function LedgerPanel() {
  const { data: entries = [] } = useQuery({ queryKey: ["journal"], queryFn: getJournalEntries });
  const { data: accounts = [] } = useQuery({ queryKey: ["accounts"], queryFn: getAccounts });
  const [selected, setSelected] = useState<string>("all");

  // Build per-account ledger lines
  const allAccountNames = useMemo(() => {
    const names = new Set<string>();
    entries.forEach(e => e.lines.forEach(l => names.add(l.accountName)));
    return Array.from(names).sort();
  }, [entries]);

  const ledgerData = useMemo(() => {
    const map: Record<string, { date: string; narration: string; debit: number; credit: number; runBal: number }[]> = {};
    const running: Record<string, number> = {};
    const acctNormal: Record<string, "debit" | "credit"> = {};
    accounts.forEach(a => { acctNormal[a.name] = a.normal; });

    const sorted = [...entries].sort((a, b) => a.date.localeCompare(b.date));
    for (const entry of sorted) {
      for (const line of entry.lines) {
        if (!map[line.accountName]) { map[line.accountName] = []; running[line.accountName] = 0; }
        const normal = acctNormal[line.accountName] ?? "debit";
        running[line.accountName] += normal === "debit" ? line.debit - line.credit : line.credit - line.debit;
        map[line.accountName].push({ date: entry.date, narration: entry.narration, debit: line.debit, credit: line.credit, runBal: running[line.accountName] });
      }
    }
    return map;
  }, [entries, accounts]);

  const displayNames = selected === "all" ? allAccountNames : [selected];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-2xl">General Ledger</h2>
          <p className="text-sm text-muted-foreground">Running balance per account, derived from journal entries.</p>
        </div>
        <select value={selected} onChange={e => setSelected(e.target.value)}
          className="h-9 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring">
          <option value="all">All accounts</option>
          {allAccountNames.map(n => <option key={n} value={n}>{n}</option>)}
        </select>
      </div>

      {allAccountNames.length === 0 ? (
        <Card><CardContent className="py-12 text-center text-muted-foreground text-sm">No journal entries yet. Post entries in the Journal tab to see ledger accounts.</CardContent></Card>
      ) : (
        displayNames.map(name => {
          const lines = ledgerData[name] ?? [];
          const acct = accounts.find(a => a.name === name);
          const lastBal = lines[lines.length - 1]?.runBal ?? 0;
          return (
            <Card key={name}>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between text-base">
                  <span>{name}</span>
                  <span className={`text-sm font-medium ${lastBal >= 0 ? "text-emerald-500" : "text-rose-500"}`}>
                    Balance: {fmtTk(Math.abs(lastBal))} {lastBal >= 0 ? (acct?.normal === "credit" ? "Cr" : "Dr") : (acct?.normal === "credit" ? "Dr" : "Cr")}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <table className="w-full text-sm">
                  <thead><tr className="text-xs text-muted-foreground border-b border-border"><th className="text-left pb-2 w-24">Date</th><th className="text-left pb-2">Particulars</th><th className="text-right pb-2 w-28">Debit</th><th className="text-right pb-2 w-28">Credit</th><th className="text-right pb-2 w-28">Balance</th></tr></thead>
                  <tbody>
                    {lines.map((l, i) => (
                      <tr key={i} className="border-b border-border/40">
                        <td className="py-1.5 text-muted-foreground text-xs font-mono">{l.date}</td>
                        <td className="py-1.5">{l.narration || "—"}</td>
                        <td className="py-1.5 text-right tabular-nums">{l.debit > 0 ? fmtTk(l.debit) : "—"}</td>
                        <td className="py-1.5 text-right tabular-nums text-muted-foreground">{l.credit > 0 ? fmtTk(l.credit) : "—"}</td>
                        <td className={`py-1.5 text-right tabular-nums font-medium ${l.runBal >= 0 ? "" : "text-rose-500"}`}>{fmtTk(Math.abs(l.runBal))}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          );
        })
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   TRIAL BALANCE PANEL
══════════════════════════════════════════════════════════════ */
function TrialBalancePanel() {
  const { data: entries = [] } = useQuery({ queryKey: ["journal"], queryFn: getJournalEntries });
  const { data: accounts = [] } = useQuery({ queryKey: ["accounts"], queryFn: getAccounts });

  const balances = useMemo(() => computeLedger(entries, accounts), [entries, accounts]);

  const totalDr = balances.reduce((s, b) => s + (b.normal === "debit" ? Math.max(0, b.balance) : Math.max(0, -b.balance)), 0);
  const totalCr = balances.reduce((s, b) => s + (b.normal === "credit" ? Math.max(0, b.balance) : Math.max(0, -b.balance)), 0);
  const isBalanced = Math.abs(totalDr - totalCr) < 0.001;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl">Trial Balance</h2>
        <p className="text-sm text-muted-foreground">Closing balances of all accounts. Total debits must equal total credits.</p>
      </div>

      {balances.length === 0 ? (
        <Card><CardContent className="py-12 text-center text-muted-foreground text-sm">No data. Post journal entries first.</CardContent></Card>
      ) : (
        <Card>
          <CardContent className="pt-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-muted-foreground border-b border-border">
                  <th className="text-left pb-3">Account Name</th>
                  <th className="text-right pb-3 w-36">Debit (Tk.)</th>
                  <th className="text-right pb-3 w-36">Credit (Tk.)</th>
                </tr>
              </thead>
              <tbody>
                {balances.map((b) => {
                  const isDebitBal = b.balance >= 0 ? b.normal === "debit" : b.normal === "credit";
                  return (
                    <tr key={b.accountName} className="border-b border-border/40">
                      <td className="py-2">{b.accountName}</td>
                      <td className="py-2 text-right tabular-nums">{isDebitBal ? fmtTk(Math.abs(b.balance)) : "—"}</td>
                      <td className="py-2 text-right tabular-nums text-muted-foreground">{!isDebitBal ? fmtTk(Math.abs(b.balance)) : "—"}</td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-border font-semibold">
                  <td className="pt-3">Total</td>
                  <td className="pt-3 text-right tabular-nums">{fmtTk(totalDr)}</td>
                  <td className="pt-3 text-right tabular-nums">{fmtTk(totalCr)}</td>
                </tr>
                <tr>
                  <td colSpan={3} className={`pt-2 text-xs text-right ${isBalanced ? "text-emerald-500" : "text-rose-500"}`}>
                    {isBalanced ? "✓ Trial balance agrees" : `✗ Difference: ${fmtTk(Math.abs(totalDr - totalCr))}`}
                  </td>
                </tr>
              </tfoot>
            </table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   INCOME STATEMENT PANEL
══════════════════════════════════════════════════════════════ */
function IncomeStatementPanel() {
  const { data: entries = [] } = useQuery({ queryKey: ["journal"], queryFn: getJournalEntries });
  const { data: accounts = [] } = useQuery({ queryKey: ["accounts"], queryFn: getAccounts });

  const balances = useMemo(() => computeLedger(entries, accounts), [entries, accounts]);

  const acctBal = (name: string) => balances.find(b => b.accountName === name)?.balance ?? 0;

  // Revenue
  const sales    = acctBal("Sales Revenue");
  const salesRet = acctBal("Sales Returns");
  const netSales = sales - salesRet;

  // Cost of goods sold
  const purchases = acctBal("Purchases");
  const purchRet  = acctBal("Purchase Returns");
  const cogs      = purchases - purchRet;
  const grossProfit = netSales - cogs;

  // Operating expenses
  const expenseAccounts = accounts.filter(a => a.type === "expense" && !["Purchases", "Purchase Returns"].includes(a.name));
  const opExpenses = expenseAccounts.map(a => ({ name: a.name, amount: acctBal(a.name) })).filter(e => e.amount !== 0);
  const totalOpExp = opExpenses.reduce((s, e) => s + e.amount, 0);
  const operatingIncome = grossProfit - totalOpExp;

  // Other expenses
  const interestExp = acctBal("Interest Expense");
  const netIncome = operatingIncome - interestExp;

  if (balances.length === 0) return (
    <div className="space-y-4">
      <h2 className="text-2xl">Income Statement</h2>
      <Card><CardContent className="py-12 text-center text-muted-foreground text-sm">No data. Post journal entries first.</CardContent></Card>
    </div>
  );

  function Row({ label, amount, indent = false, bold = false, borderTop = false }: { label: string; amount: number; indent?: boolean; bold?: boolean; borderTop?: boolean }) {
    return (
      <tr className={borderTop ? "border-t border-border" : ""}>
        <td className={`py-1.5 ${indent ? "pl-6" : ""} ${bold ? "font-semibold" : ""}`}>{label}</td>
        <td className={`py-1.5 text-right tabular-nums w-36 ${bold ? "font-semibold" : ""} ${amount < 0 ? "text-rose-500" : ""}`}>
          {amount < 0 ? `(${fmtTk(Math.abs(amount))})` : fmtTk(amount)}
        </td>
      </tr>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl">Income Statement</h2>
        <p className="text-sm text-muted-foreground">Profit and loss for the current period.</p>
      </div>
      <Card>
        <CardContent className="pt-6">
          <table className="w-full text-sm">
            <tbody>
              <tr><td colSpan={2} className="text-xs uppercase tracking-wider text-muted-foreground pb-2 font-semibold">Revenue</td></tr>
              <Row label="Sales" amount={sales} indent />
              <Row label="Less: Sales Returns" amount={-salesRet} indent />
              <Row label="Net Sales" amount={netSales} bold borderTop />

              <tr><td colSpan={2} className="pt-4 text-xs uppercase tracking-wider text-muted-foreground pb-2 font-semibold">Cost of Goods Sold</td></tr>
              <Row label="Purchases" amount={purchases} indent />
              <Row label="Less: Purchase Returns" amount={-purchRet} indent />
              <Row label="Net Purchases (COGS)" amount={cogs} bold borderTop />
              <Row label="Gross Profit" amount={grossProfit} bold borderTop />

              <tr><td colSpan={2} className="pt-4 text-xs uppercase tracking-wider text-muted-foreground pb-2 font-semibold">Operating Expenses</td></tr>
              {opExpenses.filter(e => e.name !== "Interest Expense").map(e => <Row key={e.name} label={e.name} amount={e.amount} indent />)}
              <Row label="Total Operating Expenses" amount={totalOpExp - interestExp} bold borderTop />
              <Row label="Operating Income" amount={operatingIncome + interestExp} bold borderTop />

              {interestExp > 0 && <>
                <tr><td colSpan={2} className="pt-4 text-xs uppercase tracking-wider text-muted-foreground pb-2 font-semibold">Other Expenses</td></tr>
                <Row label="Interest Expense" amount={interestExp} indent />
              </>}
              <Row label="Net Income / (Loss)" amount={netIncome} bold borderTop />
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   BALANCE SHEET PANEL  (Statement of Financial Position — IAS 1)
══════════════════════════════════════════════════════════════ */
function BalanceSheetPanel() {
  const { data: entries = [] } = useQuery({ queryKey: ["journal"], queryFn: getJournalEntries });
  const { data: accounts = [] } = useQuery({ queryKey: ["accounts"], queryFn: getAccounts });
  const balances = useMemo(() => computeLedger(entries, accounts), [entries, accounts]);

  const bal = (name: string) => balances.find(b => b.accountName === name)?.balance ?? 0;

  // ── Non-current assets ──
  const ppe          = bal("Property, Plant & Equipment") - bal("Accumulated Depreciation");
  const goodwill     = bal("Goodwill");
  const intangibles  = bal("Intangible Assets");
  const investAssoc  = bal("Investments accounted for under the equity method");
  const bioAssets    = bal("Biological Assets");
  const ncFinAssets  = bal("Financial assets (other than equity-accounted investments, trade receivables and cash)");
  const totalNCA     = ppe + goodwill + intangibles + investAssoc + bioAssets + ncFinAssets;

  // ── Current assets ──
  const inventories  = bal("Inventory");
  const tradeRec     = bal("Accounts Receivable");
  const cash         = bal("Cash") + bal("Bank");
  const heldForSale  = bal("Assets classified as held for sale");
  const totalCA      = inventories + tradeRec + cash + heldForSale;

  const totalAssets  = totalNCA + totalCA;

  // ── Equity ──
  const shareCapital  = bal("Owner's Capital");
  const retained      = bal("Owner's Capital") === 0 ? 0 : (() => {
    const revenue = accounts.filter(a => a.type === "revenue").reduce((s,a) => s + bal(a.name), 0);
    const expenses = accounts.filter(a => a.type === "expense").reduce((s,a) => s + bal(a.name), 0);
    return revenue - expenses - bal("Owner's Drawings");
  })();
  const otherEquity   = bal("Other components of equity");
  const nci           = bal("Non-controlling interests");
  const totalEquity   = shareCapital + retained + otherEquity + nci;

  // ── Non-current liabilities ──
  const ncBorrowings  = bal("Bank Loan");
  const ncProvisions  = bal("Provisions (non-current)");
  const deferredTax   = bal("Deferred tax liabilities and assets");
  const ncFinLiab     = bal("Financial liabilities (other than trade and other payables and provisions)");
  const totalNCL      = ncBorrowings + ncProvisions + deferredTax + ncFinLiab;

  // ── Current liabilities ──
  const tradePayables = bal("Accounts Payable");
  const cProvisions   = bal("Accrued Liabilities");
  const currentTax    = bal("Liabilities and assets for current tax");
  const cFinLiab      = bal("Financial liabilities (current, other than trade payables and provisions)");
  const disposalLiab  = bal("Liabilities in disposal groups classified as held for sale");
  const totalCL       = tradePayables + cProvisions + currentTax + cFinLiab + disposalLiab;

  const totalLiab     = totalNCL + totalCL;
  const totalEL       = totalEquity + totalLiab;
  const isBalanced    = Math.abs(totalAssets - totalEL) < 0.01;

  function BSRow({ label, amount, bold = false, indent = false, topBorder = false, doubleBorder = false }:
    { label: string; amount: number; bold?: boolean; indent?: boolean; topBorder?: boolean; doubleBorder?: boolean }) {
    if (amount === 0 && !bold) return null;
    return (
      <tr className={topBorder ? "border-t border-border" : ""}>
        <td className={`py-1 text-sm ${indent ? "pl-6" : ""} ${bold ? "font-semibold" : ""}`}>{label}</td>
        <td className={`py-1 text-right tabular-nums text-sm w-32 ${bold ? "font-semibold" : ""} ${doubleBorder ? "border-b-2 border-border" : ""} ${amount < 0 ? "text-rose-500" : ""}`}>
          {amount < 0 ? `(${fmtTk(Math.abs(amount))})` : amount === 0 ? "—" : fmtTk(amount)}
        </td>
      </tr>
    );
  }

  function SectionHead({ label }: { label: string }) {
    return <tr><td colSpan={2} className="pt-5 pb-1 text-xs font-bold uppercase tracking-wider">{label}</td></tr>;
  }

  if (balances.length === 0) return (
    <div className="space-y-4">
      <h2 className="text-2xl">Statement of Financial Position</h2>
      <Card><CardContent className="py-12 text-center text-muted-foreground text-sm">No data. Post journal entries in the Journal tab first.</CardContent></Card>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl">Statement of Financial Position</h2>
        <p className="text-sm text-muted-foreground">Balance sheet as at current date — IAS 1 format.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {/* ── ASSETS ── */}
        <Card>
          <CardHeader><CardTitle className="text-sm uppercase tracking-wider">Assets</CardTitle></CardHeader>
          <CardContent>
            <table className="w-full">
              <tbody>
                <SectionHead label="Non-current assets" />
                <BSRow label="Property, plant and equipment" amount={ppe} indent />
                <BSRow label="Goodwill" amount={goodwill} indent />
                <BSRow label="Other intangible assets" amount={intangibles} indent />
                <BSRow label="Investments in associates and joint ventures" amount={investAssoc} indent />
                <BSRow label="Biological assets" amount={bioAssets} indent />
                <BSRow label="Financial assets" amount={ncFinAssets} indent />
                <BSRow label="Total non-current assets" amount={totalNCA} bold topBorder />

                <SectionHead label="Current assets" />
                <BSRow label="Inventories" amount={inventories} indent />
                <BSRow label="Trade receivables" amount={tradeRec} indent />
                <BSRow label="Cash and cash equivalents" amount={cash} indent />
                <BSRow label="Assets classified as held for sale" amount={heldForSale} indent />
                <BSRow label="Total current assets" amount={totalCA} bold topBorder />

                <BSRow label="Total assets" amount={totalAssets} bold topBorder doubleBorder />
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* ── EQUITY & LIABILITIES ── */}
        <Card>
          <CardHeader><CardTitle className="text-sm uppercase tracking-wider">Equity and Liabilities</CardTitle></CardHeader>
          <CardContent>
            <table className="w-full">
              <tbody>
                <SectionHead label="Equity attributable to owners" />
                <BSRow label="Share capital / Owner's capital" amount={shareCapital} indent />
                <BSRow label="Retained earnings" amount={retained} indent />
                <BSRow label="Other components of equity" amount={otherEquity} indent />
                <BSRow label="Non-controlling interests" amount={nci} indent />
                <BSRow label="Total equity" amount={totalEquity} bold topBorder />

                <SectionHead label="Non-current liabilities" />
                <BSRow label="Borrowings" amount={ncBorrowings} indent />
                <BSRow label="Provisions" amount={ncProvisions} indent />
                <BSRow label="Deferred tax liabilities and assets" amount={deferredTax} indent />
                <BSRow label="Financial liabilities" amount={ncFinLiab} indent />
                <BSRow label="Total non-current liabilities" amount={totalNCL} bold topBorder />

                <SectionHead label="Current liabilities" />
                <BSRow label="Payables for goods or services and other payables" amount={tradePayables} indent />
                <BSRow label="Provisions" amount={cProvisions} indent />
                <BSRow label="Income taxes payable" amount={currentTax} indent />
                <BSRow label="Financial liabilities (current)" amount={cFinLiab} indent />
                <BSRow label="Liabilities in disposal groups held for sale" amount={disposalLiab} indent />
                <BSRow label="Total current liabilities" amount={totalCL} bold topBorder />

                <BSRow label="Total liabilities" amount={totalLiab} bold topBorder />
                <BSRow label="Total equity and liabilities" amount={totalEL} bold topBorder doubleBorder />

                <tr><td colSpan={2} className={`pt-2 text-xs text-right ${isBalanced ? "text-emerald-500" : "text-rose-500"}`}>
                  {isBalanced ? "✓ Balance sheet agrees" : `✗ Difference: ${fmtTk(Math.abs(totalAssets - totalEL))}`}
                </td></tr>
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
