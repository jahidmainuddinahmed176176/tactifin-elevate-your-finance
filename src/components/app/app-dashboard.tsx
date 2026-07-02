import { useState, useMemo, type ReactNode } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getTransactions, addTransaction, updateTransaction, deleteTransaction,
  getBudgets, upsertBudget, deleteBudget,
  getGoals, addGoal, updateGoal, deleteGoal,
  getBills, addBill, updateBill, deleteBill,
} from "@/lib/local-storage";
import type { Transaction, Budget, Goal, Bill, TxnType } from "@/lib/local-storage";
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
  AlertTriangle, Sparkles, Newspaper, BookOpen,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import { cn } from "@/lib/utils";

type TabId =
  | "dashboard" | "transactions" | "goals" | "budgets" | "bills"
  | "rewinder" | "calculators" | "compliance" | "chat" | "news" | "learn";

const TABS: { id: TabId; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "transactions", label: "Transactions", icon: Receipt },
  { id: "goals", label: "Goals", icon: Target },
  { id: "budgets", label: "Budgets", icon: Wallet },
  { id: "bills", label: "Bill Pay", icon: CreditCard },
  { id: "rewinder", label: "Rewinder", icon: RotateCcw },
  { id: "calculators", label: "Calculators", icon: Calculator },
  { id: "compliance", label: "Compliance", icon: ShieldCheck },
  { id: "chat", label: "AI Assistant", icon: Bot },
  { id: "news", label: "Tips & News", icon: Newspaper },
  { id: "learn", label: "Learning", icon: BookOpen },
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
          {/* Tab bar */}
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

          {/* Tab content */}
          <div className="p-4 md:p-8 min-h-[500px]">
            {tab === "dashboard" && <DashboardPanel />}
            {tab === "transactions" && <TransactionsPanel />}
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
    { label: "Cash in Hand", value: fmt(balance), icon: Wallet, accent: "text-emerald-600" },
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
              <div className="flex items-center gap-2 text-sm text-emerald-500"><TrendingDown className="h-4 w-4" /> All budgets on track this month.</div>
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
  const [category, setCategory] = useState<string>("Food");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [autoCat, setAutoCat] = useState(true);

  const [editTxn, setEditTxn] = useState<Transaction | null>(null);
  const [editType, setEditType] = useState<TxnType>("expense");
  const [editAmount, setEditAmount] = useState("");
  const [editCategory, setEditCategory] = useState("Food");
  const [editDescription, setEditDescription] = useState("");
  const [editDate, setEditDate] = useState("");

  const { data: txns = [] } = useQuery({ queryKey: ["transactions"], queryFn: () => getTransactions() });

  const add = useMutation({
    mutationFn: () => {
      const finalCategory = autoCat && description.trim() ? autoCategorize(description) : category;
      const haram = detectHaram(`${finalCategory} ${description}`);
      addTransaction({ type, amount: Number(amount), category: finalCategory, description, transaction_date: date, is_haram: haram.isHaram, haram_reason: haram.reason ?? null });
      if (haram.isHaram) toast.warning(`Flagged: ${haram.reason}`);
      else toast.success("Transaction added");
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["transactions"] }); setAmount(""); setDescription(""); },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Failed"),
  });

  const edit = useMutation({
    mutationFn: () => {
      if (!editTxn) return;
      const haram = detectHaram(`${editCategory} ${editDescription}`);
      updateTransaction(editTxn.id, { type: editType, amount: Number(editAmount), category: editCategory, description: editDescription, transaction_date: editDate, is_haram: haram.isHaram, haram_reason: haram.reason ?? null });
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
              <Label>Amount</Label>
              <Input className="mt-1" type="number" step="0.01" min="0" required value={amount} onChange={(e) => setAmount(e.target.value)} />
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
                    <span className={t.type === "income" ? "text-emerald-500" : "text-rose-500"}>{t.type === "income" ? "+" : "-"}${t.amount.toFixed(2)}</span>
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
              <Label>Amount</Label>
              <Input className="mt-1" type="number" step="0.01" min="0" required value={editAmount} onChange={(e) => setEditAmount(e.target.value)} />
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
  const nisab = 612.36; // silver nisab approx in USD
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

/* ── Chat (placeholder) ── */
function ChatPanel() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl">AI Assistant</h3>
        <p className="text-sm text-muted-foreground">Ask questions about your finances.</p>
      </div>
      <Card>
        <CardContent className="py-12 text-center">
          <Bot className="mx-auto h-12 w-12 text-muted-foreground" />
          <p className="mt-4 text-sm text-muted-foreground">AI assistant is available in the full app view.</p>
        </CardContent>
      </Card>
    </div>
  );
}

/* ── News (placeholder) ── */
function NewsPanel() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl">Tips & News</h3>
        <p className="text-sm text-muted-foreground">Financial tips and market news.</p>
      </div>
      <Card>
        <CardContent className="py-12 text-center">
          <Newspaper className="mx-auto h-12 w-12 text-muted-foreground" />
          <p className="mt-4 text-sm text-muted-foreground">Tips and news are available in the full app view.</p>
        </CardContent>
      </Card>
    </div>
  );
}

/* ── Learn (placeholder) ── */
function LearnPanel() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl">Learning</h3>
        <p className="text-sm text-muted-foreground">Courses and educational content.</p>
      </div>
      <Card>
        <CardContent className="py-12 text-center">
          <BookOpen className="mx-auto h-12 w-12 text-muted-foreground" />
          <p className="mt-4 text-sm text-muted-foreground">Learning content is available in the full app view.</p>
        </CardContent>
      </Card>
    </div>
  );
}
