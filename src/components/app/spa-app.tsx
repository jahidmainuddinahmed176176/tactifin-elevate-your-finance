import { useState, useMemo, useRef, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getTransactions, getBudgets, getGoals, getGoals as _getGoals,
  addTransaction, updateTransaction, deleteTransaction,
  addGoal, updateGoal, deleteGoal,
  getBudgets as _getBudgets, upsertBudget, deleteBudget,
  getBills, addBill, updateBill, deleteBill,
} from "@/lib/local-storage";
import type { Transaction, TxnType, Bill } from "@/lib/local-storage";
import { CATEGORIES, detectHaram, autoCategorize, HARAM_KEYWORDS } from "@/lib/haram";
import { useTheme } from "@/components/site/theme-provider";
import { TactifinLogo } from "@/components/site/tactifin-logo";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { JournalModal }         from "@/components/reports/journal-modal";
import { TrialBalanceModal }    from "@/components/reports/trial-balance-modal";
import { IncomeStatementModal } from "@/components/reports/income-statement-modal";
import { BalanceSheetModal }    from "@/components/reports/balance-sheet-modal";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, LineChart, Line,
} from "recharts";
import {
  LayoutDashboard, Receipt, Target, Wallet, Calculator, ShieldCheck, Bot,
  Moon, Sun, Menu, X, CreditCard, RotateCcw, Newspaper, BookOpen,
  BookOpenCheck, BarChart3, FileText, Scale,
  TrendingUp, TrendingDown, AlertTriangle, Trash2, Pencil,
  Zap, Wifi, Droplets, Home, Phone, Plus, CheckCircle, AlertCircle,
  Clock, Loader2, Search, DollarSign, Star, PlayCircle, Lock,
  Calendar, ChevronLeft, ChevronRight,
} from "lucide-react";

import { useServerFn } from "@tanstack/react-start";
import { sendChatMessage } from "@/lib/chat.functions";

// ─── Types ───────────────────────────────────────────────────────────[...]
type SectionKey = "dashboard" | "transactions" | "goals" | "budgets"
                | "calculators" | "compliance" | "rewinder" | "news" | "learn" | "ai";
type ReportKey  = "journal" | "trial" | "income" | "balance";
type BillStatus = "upcoming" | "due-today" | "overdue" | "paid";
type PaymentMethod = "bkash" | "cash_on_delivery" | "other";

// ─── Shared helpers ────────────────────────────────────────────────────────[...]
function fmt(n: number) {
  return new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(n);
}
function monthKey(dateStr: string) { return dateStr.slice(0, 7); }
function monthLabel(key: string) {
  const [y, m] = key.split("-");
  return new Date(Number(y), Number(m) - 1, 1).toLocaleString("default", { month: "short" });
}
function monthLabelLong(key: string) {
  const [y, m] = key.split("-");
  return new Date(Number(y), Number(m) - 1, 1).toLocaleString("default", { month: "short", year: "numeric" });
}

const PIE_COLORS = [
  "oklch(0.78 0.22 145)", "oklch(0.65 0.13 255)", "oklch(0.75 0.18 60)",
  "oklch(0.70 0.20 300)", "oklch(0.68 0.20 25)", "oklch(0.72 0.15 180)",
];

const today = new Date().toISOString().slice(0, 10);

// ─── Bills helpers ────────────────────────────────────────────────────────�[...]
const BILL_CATEGORIES = [
  { label: "Electricity", icon: Zap },
  { label: "Internet",    icon: Wifi },
  { label: "Water",       icon: Droplets },
  { label: "Rent / Mortgage", icon: Home },
  { label: "Phone",       icon: Phone },
  { label: "Credit Card", icon: CreditCard },
  { label: "Other",       icon: CreditCard },
] as const;

const RECURRINGS = ["monthly", "quarterly", "annually", "one-time"] as const;

const PAYMENT_METHODS: { value: PaymentMethod; label: string }[] = [
  { value: "bkash",            label: "bKash" },
  { value: "cash_on_delivery", label: "Cash on Delivery" },
  { value: "other",            label: "Other" },
];

const STATUS_CONFIG: Record<BillStatus, { label: string; color: string; icon: React.ElementType }> = {
  "due-today": { label: "Due today", color: "text-amber-500 bg-amber-500/10 border-amber-500/30", icon: AlertCircle },
  overdue:     { label: "Overdue",   color: "text-rose-500 bg-rose-500/10 border-rose-500/30",   icon: AlertCircle },
  upcoming:    { label: "Upcoming",  color: "text-muted-foreground bg-muted border-border",       icon: Clock },
  paid:        { label: "Paid",      color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/30", icon: CheckCircle },
};

function getBillStatus(dueDate: string, paid: boolean): BillStatus {
  if (paid) return "paid";
  if (dueDate < today) return "overdue";
  if (dueDate === today) return "due-today";
  return "upcoming";
}

function getCategoryIcon(category: string) {
  return BILL_CATEGORIES.find((c) => c.label === category)?.icon ?? CreditCard;
}

// ─── Rewinder ─────────────────────────────────────────────────────────��[...]
const MONTHS_SHOWN = 6;

// ─── News ───────────────────────────────────────────────────────────[...]
const NEWS_FILTER_CATS = ["All", "Tips", "Markets", "Islamic Finance", "Tax", "Savings"] as const;
type NewsFilterCat = (typeof NEWS_FILTER_CATS)[number];

const TIPS = [
  { category: "Tips", title: "The 50/30/20 Rule: A Simple Budget Framework", summary: "Allocate 50% of take-home pay to needs, 30% to wants, and 20% to savings or debt repayment. This flexible rule helps stabilize finances." },
  { category: "Islamic Finance", title: "Understanding Riba: Why Interest Matters in Islamic Finance", summary: "Riba (interest) is prohibited in Islamic law and should be avoided in Shariah-compliant personal finance. Consider alternatives like profit-sharing or fee-based services where possible." },
  { category: "Markets", title: "Dollar-Cost Averaging: Reduce Risk in Volatile Markets", summary: "Investing a fixed amount at regular intervals — regardless of price — smooths out market volatility and reduces timing risk." },
  { category: "Tax", title: "5 Deductions Most People Miss on Their Tax Return", summary: "Home office expenses, professional development costs, charitable donations, health insurance premiums, and retirement contributions are commonly overlooked deductions." },
  { category: "Savings", title: "Building a 6-Month Emergency Fund: Step by Step", summary: "Start by calculating three months of essential expenses, then automate small transfers until you reach your goal." },
  { category: "Islamic Finance", title: "Calculating Your Zakat: A Practical Guide", summary: "Zakat is 2.5% of qualifying wealth above the nisab threshold held for one lunar year. Track eligible assets and liabilities carefully." },
  { category: "Tips", title: "Automate Your Finances: Set It and Forget It", summary: "Automate savings transfers, bill payments, and investment contributions on payday to avoid late fees and build savings consistently." },
  { category: "Markets", title: "What Is a Credit Score and How to Improve It", summary: "Your credit score (300–850) affects loan rates and access. Pay bills on time, lower utilization, and diversify credit to improve your score." },
  { category: "Tax", title: "Freelancers & Self-Employed: Estimated Tax Basics", summary: "If you earn self-employment income, the IRS expects quarterly estimated tax payments — track income and set aside funds to avoid penalties." },
];
const NEWS_ITEMS = [
  { category: "Markets", title: "Global Markets Digest: Key Trends This Week", summary: "Central banks in multiple economies are holding rates steady as inflation data shows signs of cooling." },
  { category: "Islamic Finance", title: "Sukuk Issuance Hits Record Levels in 2026", summary: "Global sukuk issuance has increased as governments and corporates seek Shariah-compliant financing alternatives." },
  { category: "Tax", title: "IRS Announces Inflation-Adjusted Tax Brackets for 2026", summary: "The IRS released updated tax bracket thresholds adjusted for inflation — check your filing guidance." },
];

// ─── Learn data ─────────────────────────────────────────────────────────[...]
const COURSES = [
  { id: 1, title: "Personal Finance 101", description: "Master the fundamentals — budgeting, saving, debt management and building an emergency fund.", icon: Wallet, level: "Beginner", duration: "2h", lessons: 5, lessons_list: [{ title: "Budgeting basics", duration: "20m" }, { title: "Saving strategies", duration: "30m" }, { title: "Debt management", duration: "30m" }, { title: "Emergency funds", duration: "20m" }, { title: "Putting it together", duration: "20m" }], bgColor: "bg-[color:var(--brand-bolt)]", color: "text-white", tags: ["budget", "saving"] },
  { id: 2, title: "Islamic Finance Fundamentals", description: "Understand Shariah-compliant finance: Riba, Zakat, Halal investing, Sukuk and more.", icon: ShieldCheck, level: "Beginner", duration: "1.5h", lessons: 4, lessons_list: [{ title: "Riba & ethics", duration: "20m" }, { title: "Zakat calculations", duration: "20m" }, { title: "Halal investing", duration: "30m" }, { title: "Sukuk overview", duration: "20m" }], bgColor: "bg-emerald-500/70", color: "text-white", tags: ["islamic", "finance"] },
  { id: 3, title: "Investing for Beginners", description: "From index funds to ETFs — learn how to start investing with confidence regardless of your starting amount.", icon: TrendingUp, level: "Beginner", duration: "2h", lessons: 6, lessons_list: [{ title: "Intro to investing", duration: "20m" }, { title: "Index funds vs active", duration: "20m" }, { title: "Risk & allocation", duration: "30m" }, { title: "Building a portfolio", duration: "20m" }, { title: "Costs & taxes", duration: "20m" }, { title: "Long-term planning", duration: "10m" }], bgColor: "bg-blue-500/70", color: "text-white", tags: ["investing"] },
  { id: 4, title: "Goal-Based Saving Strategies", description: "Practical techniques for saving towards specific goals — house deposit, education, retirement, and more.", icon: Target, level: "Intermediate", duration: "1.5h", lessons: 4, lessons_list: [{ title: "Setting goals", duration: "20m" }, { title: "Automating savings", duration: "30m" }, { title: "Tracking progress", duration: "20m" }, { title: "Rebalancing", duration: "20m" }], bgColor: "bg-[color:var(--brand-bolt)]/40", color: "text-white", tags: ["saving", "planning"] },
  { id: 5, title: "Understanding Your Credit", description: "Deep dive into how credit scores work, what damages them, and proven strategies to improve yours.", icon: TrendingUp, level: "Intermediate", duration: "1h", lessons: 3, lessons_list: [{ title: "Credit basics", duration: "20m" }, { title: "Improving score", duration: "20m" }, { title: "Monitoring & identity", duration: "20m" }], bgColor: "bg-rose-500/50", color: "text-white", tags: ["credit"] },
  { id: 6, title: "Tax Efficiency for Individuals", description: "Legal strategies to reduce your tax bill — deductions, credits, retirement accounts and filing tips.", icon: BookOpen, level: "Advanced", duration: "2h", lessons: 6, lessons_list: [{ title: "Deductions", duration: "20m" }, { title: "Credits", duration: "20m" }, { title: "Retirement accounts", duration: "30m" }, { title: "Filing strategies", duration: "20m" }, { title: "International considerations", duration: "20m" }, { title: "Case studies", duration: "10m" }], bgColor: "bg-indigo-500/60", color: "text-white", tags: ["tax"] },
];
const GLOSSARY = [
  { term: "Riba", def: "Arabic for usury or interest. Prohibited in Islamic finance as it is considered exploitative." },
  { term: "Zakat", def: "One of the Five Pillars of Islam — an annual charitable donation of 2.5% on wealth exceeding the nisab." },
  { term: "Nisab", def: "The minimum threshold of wealth above which Zakat becomes obligatory (approx. the value of 85g of gold)." },
  { term: "Sukuk", def: "Islamic financial certificates equivalent to bonds, structured to comply with Shariah law (no interest)." },
  { term: "Murabaha", def: "A cost-plus financing arrangement used in Islamic mortgages and trade finance, avoiding interest." },
  { term: "Dollar-Cost Averaging", def: "Investing a fixed amount at regular intervals regardless of price, reducing the impact of volatility." },
  { term: "ETF", def: "Exchange-Traded Fund — a basket of securities traded on an exchange, typically with low fees." },
  { term: "Credit Utilisation", def: "The ratio of your current credit card balances to your total credit limits. Keeping it under 30% helps your score." },
  { term: "Emergency Fund", def: "3–6 months of essential living expenses held in liquid, accessible savings as a financial safety net." },
  { term: "Net Worth", def: "Total assets (what you own) minus total liabilities (what you owe). The core measure of financial health." },
  { term: "Progressive Tax", def: "A tax system where higher income is taxed at higher rates, applied in brackets." },
  { term: "Index Fund", def: "A fund that tracks a market index (e.g. S&P 500), offering broad diversification at low cost." },
];
const LS_LEARN_KEY = "tf_learn_progress";
function loadLearnProgress(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try { const raw = localStorage.getItem(LS_LEARN_KEY); return new Set(raw ? JSON.parse(raw) : []); }
  catch { return new Set(); }
}
function saveLearnProgress(set: Set<string>) {
  localStorage.setItem(LS_LEARN_KEY, JSON.stringify([...set]));
}

// ════════════════════════════════════════════════════════════════[...]
// SECTION COMPONENTS
// ════════════════════════════════════════════════════════════════[...]

// ─── Dashboard ─────────────────────────────────────────────────────────�[...]
function Dashboard({ setSection }: { setSection: (s: SectionKey) => void }) {
  const { data: txns = [] } = useQuery({ queryKey: ["transactions"], queryFn: getTransactions });
  const { data: goals = [] } = useQuery({ queryKey: ["goals"], queryFn: getGoals });
  const { data: budgets = [] } = useQuery({ queryKey: ["budgets"], queryFn: getBudgets });

  const income   = txns.filter(t => t.type === "income").reduce((a, t) => a + t.amount, 0);
  const expenses = txns.filter(t => t.type === "expense").reduce((a, t) => a + t.amount, 0);
  const haramCount = txns.filter(t => t.is_haram).length;
  const balance  = income - expenses;

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
      if (t.type === "income") map[key].income += t.amount; else map[key].expenses += t.amount;
    }
    return Object.keys(map).sort().slice(-6).map(key => ({ month: monthLabel(key), Income: map[key].income, Expenses: map[key].expenses }));
  }, [txns]);

  const topGoals = goals.slice(0, 3);
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().slice(0, 10);
  const spentBy: Record<string, number> = {};
  for (const t of txns) {
    if (t.type !== "expense" || t.transaction_date < monthStart) continue;
    spentBy[t.category] = (spentBy[t.category] ?? 0) + t.amount;
  }
  const overBudget = budgets.filter(b => (spentBy[b.category] ?? 0) > b.monthly_limit);

  const stats = [
    { label: "Cash in Hand", value: fmt(balance), icon: Wallet,       accent: "text-emerald-600" },
    { label: "Income",        value: fmt(income),  icon: TrendingUp,   accent: "text-emerald-500" },
    { label: "Expenses",      value: fmt(expenses),icon: TrendingDown,  accent: "text-rose-500" },
    { label: "Flagged",       value: String(haramCount), icon: AlertTriangle, accent: "text-amber-500" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Your financial overview at a glance.</p>
        </div>
        <Button size="sm" variant="outline" onClick={() => setSection("transactions")}>+ Add transaction</Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(s => (
          <Card key={s.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{s.label}</CardTitle>
              <s.icon className={`h-4 w-4 ${s.accent}`} />
            </CardHeader>
            <CardContent><div className={`text-2xl font-semibold ${s.accent}`}>{s.value}</div></CardContent>
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
                    <YAxis tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
                    <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} formatter={(v: number) => fmt(v)} />
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                    <Bar dataKey="Income"   fill="oklch(0.6 0.18 145)"  radius={[4,4,0,0]} />
                    <Bar dataKey="Expenses" fill="oklch(0.65 0.2 25)"   radius={[4,4,0,0]} />
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
            <Button size="sm" variant="ghost" className="text-xs" onClick={() => setSection("goals")}>View all</Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {topGoals.length === 0 ? (
              <p className="text-sm text-muted-foreground">No goals yet. <button className="underline" onClick={() => setSection("goals")}>Create one</button>.</p>
            ) : topGoals.map(g => {
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
            <Button size="sm" variant="ghost" className="text-xs" onClick={() => setSection("budgets")}>View all</Button>
          </CardHeader>
          <CardContent>
            {budgets.length === 0 ? (
              <p className="text-sm text-muted-foreground">No budgets set. <button className="underline" onClick={() => setSection("budgets")}>Add one</button>.</p>
            ) : overBudget.length === 0 ? (
              <div className="flex items-center gap-2 text-sm text-emerald-500"><TrendingDown className="h-4 w-4" /> All budgets on track this month.</div>
            ) : (
              <div className="space-y-2">
                {overBudget.map(b => {
                  const spent = spentBy[b.category] ?? 0;
                  return (
                    <div key={b.id} className="flex items-center justify-between rounded-lg border border-rose-500/30 bg-rose-500/5 px-3 py-2 text-sm">
                      <span className="flex items-center gap-2"><AlertTriangle className="h-3.5 w-3.5 text-rose-500" />{b.category}</span>
                      <span className="text-rose-500 text-xs">Over by {fmt(spent - b.monthly_limit)}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle>Recent transactions</CardTitle>
          <Button size="sm" variant="ghost" className="text-xs" onClick={() => setSection("transactions")}>View all</Button>
        </CardHeader>
        <CardContent>
          {txns.length === 0 ? (
            <p className="text-sm text-muted-foreground">No transactions yet. <button className="underline" onClick={() => setSection("transactions")}>Add one</button>.</p>
          ) : (
            <div className="divide-y divide-border">
              {txns.slice(0, 8).map(t => (
                <div key={t.id} className="flex items-center justify-between py-3">
                  <div>
                    <div className="font-medium">{t.description || t.category}</div>
                    <div className="text-xs text-muted-foreground">
                      {t.category} · {t.transaction_date}
                      {t.is_haram && <span className="ml-2 text-amber-500">⚠ flagged</span>}
                    </div>
                  </div>
                  <div className={t.type === "income" ? "text-emerald-500" : "text-rose-500"}>
                    {t.type === "income" ? "+" : "-"}{fmt(t.amount)}
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

// ─── Transactions ────────────────────────────────────────────────────────�[...]
function TransactionsPage() {
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

  const { data: txns = [] } = useQuery({ queryKey: ["transactions"], queryFn: getTransactions });

  const add = useMutation({
    mutationFn: () => {
      const finalCategory = autoCat && description.trim() ? autoCategorize(description) : category;
      const haram = detectHaram(`${finalCategory} ${description}`);
      addTransaction({
        type,
        amount: totalNum,
        cash_amount: cashAmount !== "" ? cashNum : undefined,
        credit_amount: cashAmount !== "" ? creditNum : undefined,
        category: finalCategory,
        description,
        transaction_date: date,
        is_haram: haram.isHaram,
        haram_reason: haram.reason ?? null,
      });
      if (haram.isHaram) toast.warning(`Flagged: ${haram.reason}`); else toast.success("Transaction added");
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["transactions"] }); setAmount(""); setCashAmount(""); setDescription(""); },
    onError: e => toast.error(e instanceof Error ? e.message : "Failed"),
  });

  const editTotalNum = Number(editAmount) || 0;
  const editCashNum = Number(editCashAmount) || 0;
  const editCreditNum = editTotalNum > 0 && editCashAmount !== "" ? Math.max(0, editTotalNum - editCashNum) : 0;

  const edit = useMutation({
    mutationFn: () => {
      if (!editTxn) return;
      const haram = detectHaram(`${editCategory} ${editDescription}`);
      updateTransaction(editTxn.id, {
        type: editType,
        amount: editTotalNum,
        cash_amount: editCashAmount !== "" ? editCashNum : undefined,
        credit_amount: editCashAmount !== "" ? editCreditNum : undefined,
        category: editCategory,
        description: editDescription,
        transaction_date: editDate,
        is_haram: haram.isHaram,
        haram_reason: haram.reason ?? null,
      });
      if (haram.isHaram) toast.warning(`Updated & flagged: ${haram.reason}`); else toast.success("Transaction updated");
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["transactions"] }); setEditTxn(null); },
    onError: e => toast.error(e instanceof Error ? e.message : "Failed"),
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
      <div><h1 className="text-3xl">Transactions</h1><p className="text-sm text-muted-foreground">Record income and expenses. Auto-categorization enabled.</p></div>
      <Card>
        <CardHeader><CardTitle>Add transaction</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={e => { e.preventDefault(); add.mutate(); }} className="grid gap-4 md:grid-cols-6">
            <div className="md:col-span-1">
              <Label>Type</Label>
              <Select value={type} onValueChange={v => setType(v as TxnType)}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="expense">Expense</SelectItem><SelectItem value="income">Income</SelectItem></SelectContent>
              </Select>
            </div>
            <div className="md:col-span-1">
              <Label>Total Amount</Label>
              <Input className="mt-1" type="number" step="0.01" min="0" required value={amount} onChange={e => setAmount(e.target.value)} />
            </div>

