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

// ─── Types ───────────────────────────────────────────────────────────────────
type SectionKey = "dashboard" | "transactions" | "goals" | "budgets" | "bills"
                | "calculators" | "compliance" | "rewinder" | "news" | "learn" | "ai";
type ReportKey  = "journal" | "trial" | "income" | "balance";
type BillStatus = "upcoming" | "due-today" | "overdue" | "paid";
type PaymentMethod = "bkash" | "cash_on_delivery" | "other";

// ─── Shared helpers ───────────────────────────────────────────────────────────
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

// ─── Bills helpers ────────────────────────────────────────────────────────────
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

// ─── Rewinder ────────────────────────────────────────────────────────────────
const MONTHS_SHOWN = 6;

// ─── News ────────────────────────────────────────────────────────────────────
const NEWS_FILTER_CATS = ["All", "Tips", "Markets", "Islamic Finance", "Tax", "Savings"] as const;
type NewsFilterCat = (typeof NEWS_FILTER_CATS)[number];

const TIPS = [
  { category: "Tips", title: "The 50/30/20 Rule: A Simple Budget Framework", summary: "Allocate 50% of take-home pay to needs, 30% to wants, and 20% to savings or debt repayment. This flexible rule works across most income levels and is a solid starting point before you fine-tune with Tactifin's budget tracker.", icon: DollarSign, readTime: "2 min", tags: ["Budgeting", "Beginner"] },
  { category: "Islamic Finance", title: "Understanding Riba: Why Interest Matters in Islamic Finance", summary: "Riba (interest) is prohibited in Islamic law. This applies to bank savings interest, credit card charges, and certain investment products. Tactifin's compliance checker flags these automatically so you stay on track.", icon: AlertCircle, readTime: "3 min", tags: ["Shariah", "Banking"] },
  { category: "Markets", title: "Dollar-Cost Averaging: Reduce Risk in Volatile Markets", summary: "Investing a fixed amount at regular intervals — regardless of price — smooths out market volatility over time. It removes the pressure of timing the market and is suitable for long-term wealth building.", icon: TrendingUp, readTime: "3 min", tags: ["Investing", "Strategy"] },
  { category: "Tax", title: "5 Deductions Most People Miss on Their Tax Return", summary: "Home office expenses, professional development costs, charitable donations, health insurance premiums (if self-employed), and student loan interest are frequently overlooked. Use Tactifin's tax estimator to see how each impacts your bill.", icon: DollarSign, readTime: "4 min", tags: ["Tax", "Savings"] },
  { category: "Savings", title: "Building a 6-Month Emergency Fund: Step by Step", summary: "Start by calculating three months of essential expenses (rent, food, utilities). Open a separate high-yield savings account. Automate a fixed transfer each payday. Tactifin's Goals feature tracks progress and surfaces how close you are in real time.", icon: TrendingUp, readTime: "3 min", tags: ["Emergency Fund", "Goals"] },
  { category: "Islamic Finance", title: "Calculating Your Zakat: A Practical Guide", summary: "Zakat is 2.5% of wealth held above the nisab threshold for one lunar year. Eligible assets include cash, gold, silver, and tradeable investments. Debts you owe are subtracted. Tactifin's Zakat calculator does this automatically.", icon: AlertCircle, readTime: "4 min", tags: ["Zakat", "Shariah"] },
  { category: "Tips", title: "Automate Your Finances: Set It and Forget It", summary: "Automate savings transfers, bill payments, and investment contributions on payday. Removing the manual decision reduces the chance of overspending and builds wealth passively. Tactifin's auto-reminders keep you on schedule.", icon: DollarSign, readTime: "2 min", tags: ["Automation", "Productivity"] },
  { category: "Markets", title: "What Is a Credit Score and How to Improve It", summary: "Your credit score (300–850) affects loan rates, rental applications, and sometimes employment. The biggest drivers: on-time payment history (35%), credit utilisation (30%), and account age (15%). Use Tactifin's credit monitor to simulate improvements.", icon: TrendingUp, readTime: "3 min", tags: ["Credit", "Borrowing"] },
  { category: "Tax", title: "Freelancers & Self-Employed: Estimated Tax Basics", summary: "If you earn self-employment income, the IRS expects quarterly estimated tax payments. Under-paying can trigger penalties. Tactifin's tax estimator calculates your likely quarterly obligation so you're never caught off guard.", icon: BookOpen, readTime: "5 min", tags: ["Freelance", "Tax"] },
];
const NEWS_ITEMS = [
  { category: "Markets", title: "Global Markets Digest: Key Trends This Week", summary: "Central banks in multiple economies are holding rates steady as inflation data shows signs of cooling. Equity markets responded positively, with technology and consumer discretionary sectors leading gains.", icon: TrendingUp, readTime: "2 min", tags: ["Markets", "Macro"], date: "Jun 9, 2026" },
  { category: "Islamic Finance", title: "Sukuk Issuance Hits Record Levels in 2026", summary: "Global sukuk (Islamic bond) issuance has surpassed previous records this year, driven by sovereign issuers in the Gulf and Southeast Asia. Demand from institutional investors seeking Shariah-compliant fixed income continues to rise.", icon: AlertCircle, readTime: "3 min", tags: ["Sukuk", "Islamic Finance"], date: "Jun 7, 2026" },
  { category: "Tax", title: "IRS Announces Inflation-Adjusted Tax Brackets for 2026", summary: "The IRS has released updated tax bracket thresholds, adjusted upward to account for inflation. Standard deductions also increased. Taxpayers in all brackets will see modest reductions in effective tax rates.", icon: DollarSign, readTime: "3 min", tags: ["Tax", "IRS"], date: "Jun 5, 2026" },
];

// ─── Learn data ───────────────────────────────────────────────────────────────
const COURSES = [
  { id: 1, title: "Personal Finance 101", description: "Master the fundamentals — budgeting, saving, debt management and building an emergency fund.", icon: Wallet, level: "Beginner", duration: "45 min", lessons: 6, tags: ["Budgeting", "Savings", "Debt"], color: "text-emerald-500", bgColor: "bg-emerald-500/10", lessons_list: [{ title: "Why budgeting matters", duration: "5 min" }, { title: "The 50/30/20 rule", duration: "7 min" }, { title: "Setting up an emergency fund", duration: "8 min" }, { title: "Understanding debt types", duration: "10 min" }, { title: "Credit cards: friend or foe?", duration: "8 min" }, { title: "Automating your finances", duration: "7 min" }] },
  { id: 2, title: "Islamic Finance Fundamentals", description: "Understand Shariah-compliant finance: Riba, Zakat, Halal investing, Sukuk and more.", icon: ShieldCheck, level: "Beginner", duration: "60 min", lessons: 7, tags: ["Islamic Finance", "Shariah", "Zakat"], color: "text-amber-500", bgColor: "bg-amber-500/10", lessons_list: [{ title: "What is Shariah-compliant finance?", duration: "8 min" }, { title: "Riba explained — why interest is prohibited", duration: "10 min" }, { title: "Calculating Zakat step by step", duration: "10 min" }, { title: "Halal vs Haram investments", duration: "9 min" }, { title: "Sukuk: Islamic bonds", duration: "8 min" }, { title: "Islamic mortgages (Murabaha)", duration: "8 min" }, { title: "Using Tactifin's compliance checker", duration: "7 min" }] },
  { id: 3, title: "Investing for Beginners", description: "From index funds to ETFs — learn how to start investing with confidence regardless of your starting amount.", icon: TrendingUp, level: "Beginner", duration: "55 min", lessons: 6, tags: ["Investing", "ETFs", "Portfolio"], color: "text-blue-500", bgColor: "bg-blue-500/10", lessons_list: [{ title: "Why invest at all?", duration: "6 min" }, { title: "Risk vs return explained", duration: "9 min" }, { title: "Index funds vs active funds", duration: "10 min" }, { title: "Dollar-cost averaging", duration: "8 min" }, { title: "Building a diversified portfolio", duration: "12 min" }, { title: "Common investing mistakes", duration: "10 min" }] },
  { id: 4, title: "Goal-Based Saving Strategies", description: "Practical techniques for saving towards specific goals — house deposit, education, retirement, and more.", icon: Target, level: "Intermediate", duration: "40 min", lessons: 5, tags: ["Goals", "Savings", "Planning"], color: "text-purple-500", bgColor: "bg-purple-500/10", lessons_list: [{ title: "Defining your financial goals", duration: "7 min" }, { title: "Short, medium and long-term buckets", duration: "8 min" }, { title: "High-yield savings accounts", duration: "8 min" }, { title: "Saving for a house deposit", duration: "9 min" }, { title: "Retirement planning basics", duration: "8 min" }] },
  { id: 5, title: "Understanding Your Credit", description: "Deep dive into how credit scores work, what damages them, and proven strategies to improve yours.", icon: TrendingUp, level: "Intermediate", duration: "35 min", lessons: 5, tags: ["Credit", "Score", "Borrowing"], color: "text-rose-500", bgColor: "bg-rose-500/10", lessons_list: [{ title: "How credit scores are calculated", duration: "8 min" }, { title: "Reading your credit report", duration: "7 min" }, { title: "Factors that hurt your score", duration: "7 min" }, { title: "Building credit from scratch", duration: "7 min" }, { title: "Using credit cards responsibly", duration: "6 min" }] },
  { id: 6, title: "Tax Efficiency for Individuals", description: "Legal strategies to reduce your tax bill — deductions, credits, retirement accounts and filing tips.", icon: BookOpen, level: "Advanced", duration: "50 min", lessons: 6, tags: ["Tax", "Deductions", "Planning"], color: "text-cyan-500", bgColor: "bg-cyan-500/10", lessons_list: [{ title: "Understanding tax brackets", duration: "8 min" }, { title: "Above-the-line deductions", duration: "9 min" }, { title: "Itemising vs standard deduction", duration: "8 min" }, { title: "Tax-advantaged accounts (401k, IRA, HSA)", duration: "10 min" }, { title: "Estimated quarterly taxes", duration: "8 min" }, { title: "Working with a tax professional", duration: "7 min" }] },
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

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

// ─── Dashboard ────────────────────────────────────────────────────────────────
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

// ─── Transactions ─────────────────────────────────────────────────────────────
function TransactionsPage() {
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

  const { data: txns = [] } = useQuery({ queryKey: ["transactions"], queryFn: getTransactions });

  const add = useMutation({
    mutationFn: () => {
      const finalCategory = autoCat && description.trim() ? autoCategorize(description) : category;
      const haram = detectHaram(`${finalCategory} ${description}`);
      addTransaction({ type, amount: Number(amount), category: finalCategory, description, transaction_date: date, is_haram: haram.isHaram, haram_reason: haram.reason ?? null });
      if (haram.isHaram) toast.warning(`Flagged: ${haram.reason}`); else toast.success("Transaction added");
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["transactions"] }); setAmount(""); setDescription(""); },
    onError: e => toast.error(e instanceof Error ? e.message : "Failed"),
  });

  const edit = useMutation({
    mutationFn: () => {
      if (!editTxn) return;
      const haram = detectHaram(`${editCategory} ${editDescription}`);
      updateTransaction(editTxn.id, { type: editType, amount: Number(editAmount), category: editCategory, description: editDescription, transaction_date: editDate, is_haram: haram.isHaram, haram_reason: haram.reason ?? null });
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
              <Label>Amount</Label>
              <Input className="mt-1" type="number" step="0.01" min="0" required value={amount} onChange={e => setAmount(e.target.value)} />
            </div>
            <div className="md:col-span-2">
              <Label>Description</Label>
              <Input className="mt-1" value={description} onChange={e => setDescription(e.target.value)} placeholder="e.g. Grocery shopping" />
              {autoCat && description.trim() && <p className="mt-1 text-xs text-[color:var(--brand-bolt)]">Auto-detected: {autoCategorize(description)}</p>}
            </div>
            <div className="md:col-span-1">
              <Label>Category {autoCat && <span className="text-xs text-muted-foreground">(auto)</span>}</Label>
              <Select value={autoCat && description.trim() ? autoCategorize(description) : category} onValueChange={v => { setAutoCat(false); setCategory(v); }}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>{CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="md:col-span-1"><Label>Date</Label><Input className="mt-1" type="date" value={date} onChange={e => setDate(e.target.value)} /></div>
            <div className="md:col-span-6 flex items-center gap-4">
              <Button type="submit" disabled={add.isPending}>{add.isPending ? "Adding..." : "Add transaction"}</Button>
              <label className="flex items-center gap-2 text-sm text-muted-foreground">
                <input type="checkbox" checked={autoCat} onChange={e => setAutoCat(e.target.checked)} className="rounded" />
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
              {txns.map(t => (
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
                    <button onClick={() => openEdit(t)} className="text-muted-foreground hover:text-foreground"><Pencil className="h-4 w-4" /></button>
                    <button onClick={() => del.mutate(t.id)} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      <Dialog open={!!editTxn} onOpenChange={open => { if (!open) setEditTxn(null); }}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Edit transaction</DialogTitle></DialogHeader>
          <form onSubmit={e => { e.preventDefault(); edit.mutate(); }} className="grid gap-4 md:grid-cols-2">
            <div><Label>Type</Label>
              <Select value={editType} onValueChange={v => setEditType(v as TxnType)}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="expense">Expense</SelectItem><SelectItem value="income">Income</SelectItem></SelectContent>
              </Select>
            </div>
            <div><Label>Amount</Label><Input className="mt-1" type="number" step="0.01" min="0" required value={editAmount} onChange={e => setEditAmount(e.target.value)} /></div>
            <div><Label>Category</Label>
              <Select value={editCategory} onValueChange={setEditCategory}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>{CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div><Label>Date</Label><Input className="mt-1" type="date" value={editDate} onChange={e => setEditDate(e.target.value)} /></div>
            <div className="md:col-span-2"><Label>Description</Label><Input className="mt-1" value={editDescription} onChange={e => setEditDescription(e.target.value)} /></div>
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

// ─── Goals ────────────────────────────────────────────────────────────────────
function GoalsPage() {
  const qc = useQueryClient();
  const [name, setName] = useState("");
  const [target, setTarget] = useState("");
  const [date, setDate] = useState("");
  const { data: goals = [] } = useQuery({ queryKey: ["goals"], queryFn: getGoals });

  const add = useMutation({
    mutationFn: () => { addGoal({ name, target_amount: Number(target), target_date: date || null }); },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["goals"] }); setName(""); setTarget(""); setDate(""); toast.success("Goal added"); },
    onError: e => toast.error(e instanceof Error ? e.message : "Failed"),
  });
  const contribute = useMutation({
    mutationFn: ({ id, current, amount }: { id: string; current: number; amount: number }) => { updateGoal(id, { current_amount: current + amount }); },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["goals"] }),
  });
  const del = useMutation({
    mutationFn: (id: string) => { deleteGoal(id); },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["goals"] }),
  });

  return (
    <div className="space-y-6">
      <div><h1 className="text-3xl">Savings goals</h1><p className="text-sm text-muted-foreground">Set targets and track your progress.</p></div>
      <Card>
        <CardHeader><CardTitle>New goal</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={e => { e.preventDefault(); add.mutate(); }} className="grid gap-4 md:grid-cols-4">
            <div className="md:col-span-2"><Label>Name</Label><Input className="mt-1" required value={name} onChange={e => setName(e.target.value)} placeholder="Emergency fund" /></div>
            <div><Label>Target amount</Label><Input className="mt-1" type="number" min="1" step="0.01" required value={target} onChange={e => setTarget(e.target.value)} /></div>
            <div><Label>Target date</Label><Input className="mt-1" type="date" value={date} onChange={e => setDate(e.target.value)} /></div>
            <div className="md:col-span-4"><Button type="submit" disabled={add.isPending}>Add goal</Button></div>
          </form>
        </CardContent>
      </Card>
      <div className="grid gap-4 md:grid-cols-2">
        {goals.map(g => {
          const pct = Math.min(100, (g.current_amount / g.target_amount) * 100);
          return (
            <Card key={g.id}>
              <CardHeader className="flex flex-row items-start justify-between">
                <div>
                  <CardTitle>{g.name}</CardTitle>
                  <p className="mt-1 text-xs text-muted-foreground">${g.current_amount.toFixed(2)} of ${g.target_amount.toFixed(2)}{g.target_date ? ` · by ${g.target_date}` : ""}</p>
                </div>
                <button onClick={() => del.mutate(g.id)} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
              </CardHeader>
              <CardContent className="space-y-3">
                <Progress value={pct} />
                <div className="flex gap-2">
                  {[10, 50, 100].map(v => <Button key={v} size="sm" variant="outline" onClick={() => contribute.mutate({ id: g.id, current: g.current_amount, amount: v })}>+${v}</Button>)}
                </div>
              </CardContent>
            </Card>
          );
        })}
        {goals.length === 0 && <p className="text-sm text-muted-foreground">No goals yet.</p>}
      </div>
    </div>
  );
}

// ─── Budgets ──────────────────────────────────────────────────────────────────
function BudgetsPage() {
  const qc = useQueryClient();
  const [category, setCategory] = useState<string>("Food");
  const [limit, setLimit] = useState("");
  const [otherDesc, setOtherDesc] = useState("");
  const { data: budgets = [] } = useQuery({ queryKey: ["budgets"], queryFn: getBudgets });
  const { data: txns = [] } = useQuery({ queryKey: ["transactions"], queryFn: getTransactions });

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
    onError: e => toast.error(e instanceof Error ? e.message : "Failed"),
  });
  const del = useMutation({
    mutationFn: (id: string) => { deleteBudget(id); },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["budgets"] }),
  });

  return (
    <div className="space-y-6">
      <div><h1 className="text-3xl">Budgets</h1><p className="text-sm text-muted-foreground">Set monthly limits per category. Get alerted when you go over.</p></div>
      <Card>
        <CardHeader><CardTitle>Set / update a budget</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={e => { e.preventDefault(); add.mutate(); }} className="grid gap-4 md:grid-cols-3">
            <div><Label>Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>{CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            {category === "Other" && <div><Label>Describe this category</Label><Input className="mt-1" required value={otherDesc} onChange={e => setOtherDesc(e.target.value)} placeholder="e.g. Gifts, Subscriptions" /></div>}
            <div><Label>Monthly limit</Label><Input className="mt-1" type="number" min="1" step="0.01" required value={limit} onChange={e => setLimit(e.target.value)} /></div>
            <div className="flex items-end"><Button type="submit">Save budget</Button></div>
          </form>
        </CardContent>
      </Card>
      <div className="grid gap-4 md:grid-cols-2">
        {budgets.map(b => {
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

// ─── Bills ────────────────────────────────────────────────────────────────────
function BillsPage() {
  const qc = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState<BillStatus | "all">("all");
  const [payingBillId, setPayingBillId] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("bkash");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState(today);
  const [category, setCategory] = useState("Electricity");
  const [recurring, setRecurring] = useState<string>("monthly");
  const [autopay, setAutopay] = useState(false);

  const { data: bills = [] } = useQuery<Bill[]>({ queryKey: ["bills"], queryFn: getBills });

  const addMutation = useMutation({
    mutationFn: () => { addBill({ name, amount: Number(amount), due_date: dueDate, category, recurring, paid: false, autopay, payment_method: null }); },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["bills"] }); setName(""); setAmount(""); setDueDate(today); setCategory("Electricity"); setRecurring("monthly"); setAutopay(false); setShowForm(false); toast.success("Bill added"); },
    onError: () => toast.error("Failed to add bill"),
  });
  const markPaidMutation = useMutation({
    mutationFn: ({ id, method }: { id: string; method: PaymentMethod }) => { updateBill(id, { paid: true, payment_method: method }); },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["bills"] }); setPayingBillId(null); toast.success("Marked as paid"); },
    onError: () => toast.error("Failed to update bill"),
  });
  const deleteMutation = useMutation({
    mutationFn: (id: string) => { deleteBill(id); },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["bills"] }); toast.success("Bill removed"); },
    onError: () => toast.error("Failed to delete bill"),
  });

  const billsWithStatus = bills.map(b => ({ ...b, status: getBillStatus(b.due_date, b.paid) }));
  const filtered = billsWithStatus.filter(b => filterStatus === "all" || b.status === filterStatus);
  const totalDue = billsWithStatus.filter(b => b.status !== "paid").reduce((a, b) => a + b.amount, 0);
  const overdue = billsWithStatus.filter(b => b.status === "overdue");
  const dueToday2 = billsWithStatus.filter(b => b.status === "due-today");
  const autopayCount = billsWithStatus.filter(b => b.autopay && b.status !== "paid").length;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div><h1 className="text-3xl">Bill Pay</h1><p className="text-sm text-muted-foreground">Track, schedule and manage all your recurring bills.</p></div>
        <Button onClick={() => setShowForm(s => !s)}><Plus className="mr-1.5 h-4 w-4" /> Add bill</Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card><CardHeader className="pb-2"><CardTitle className="text-xs font-medium text-muted-foreground">Total outstanding</CardTitle></CardHeader><CardContent><div className="text-2xl font-semibold">{fmt(totalDue)}</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-xs font-medium text-muted-foreground">Overdue</CardTitle></CardHeader><CardContent><div className={`text-2xl font-semibold ${overdue.length > 0 ? "text-rose-500" : ""}`}>{overdue.length} bill{overdue.length !== 1 ? "s" : ""}</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-xs font-medium text-muted-foreground">Due today</CardTitle></CardHeader><CardContent><div className={`text-2xl font-semibold ${dueToday2.length > 0 ? "text-amber-500" : ""}`}>{dueToday2.length} bill{dueToday2.length !== 1 ? "s" : ""}</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-xs font-medium text-muted-foreground">Autopay active</CardTitle></CardHeader><CardContent><div className="text-2xl font-semibold text-emerald-500">{autopayCount}</div></CardContent></Card>
      </div>
      {showForm && (
        <Card>
          <CardHeader><CardTitle>Add a bill</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={e => { e.preventDefault(); if (!name || !amount || !dueDate) return; addMutation.mutate(); }} className="grid gap-4 md:grid-cols-3">
              <div><Label>Bill name</Label><Input className="mt-1" required value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Netflix" /></div>
              <div><Label>Amount</Label><Input className="mt-1" type="number" step="0.01" min="0.01" required value={amount} onChange={e => setAmount(e.target.value)} /></div>
              <div><Label>Due date</Label><Input className="mt-1" type="date" required value={dueDate} onChange={e => setDueDate(e.target.value)} /></div>
              <div><Label>Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>{BILL_CATEGORIES.map(c => <SelectItem key={c.label} value={c.label}>{c.label}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div><Label>Recurring</Label>
                <Select value={recurring} onValueChange={setRecurring}>
                  <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>{RECURRINGS.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="flex items-end gap-3">
                <div className="flex items-center gap-2"><input type="checkbox" id="autopay" checked={autopay} onChange={e => setAutopay(e.target.checked)} className="h-4 w-4 accent-foreground" /><Label htmlFor="autopay" className="cursor-pointer">Autopay enabled</Label></div>
              </div>
              <div className="md:col-span-3 flex gap-2">
                <Button type="submit" disabled={addMutation.isPending}>{addMutation.isPending && <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />}Save bill</Button>
                <Button type="button" variant="ghost" onClick={() => setShowForm(false)}>Cancel</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
      <div className="flex gap-2 flex-wrap">
        {(["all", "overdue", "due-today", "upcoming", "paid"] as const).map(s => (
          <Button key={s} size="sm" variant={filterStatus === s ? "default" : "outline"} onClick={() => setFilterStatus(s)}>
            {s === "all" ? "All" : s === "due-today" ? "Due today" : s.charAt(0).toUpperCase() + s.slice(1)}
          </Button>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map(b => {
          const Icon = getCategoryIcon(b.category);
          const sc = STATUS_CONFIG[b.status];
          const StatusIcon = sc.icon;
          return (
            <Card key={b.id} className={`border ${b.status === "overdue" ? "border-rose-500/30" : b.status === "due-today" ? "border-amber-500/30" : ""}`}>
              <CardContent className="pt-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-muted p-2 mt-0.5"><Icon className="h-4 w-4 text-muted-foreground" /></div>
                    <div>
                      <div className="font-medium">{b.name}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {b.category} · {b.recurring} · Due {b.due_date}
                        {b.autopay && <span className="ml-2 text-emerald-500">autopay</span>}
                        {b.paid && b.payment_method && <span className="ml-2">via {b.payment_method === "cash_on_delivery" ? "Cash" : b.payment_method === "bkash" ? "bKash" : b.payment_method}</span>}
                      </div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-semibold">{fmt(b.amount)}</div>
                    <Badge variant="outline" className={`mt-1 text-xs ${sc.color}`}><StatusIcon className="h-3 w-3 mr-1" />{sc.label}</Badge>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  {b.status !== "paid" && <Button size="sm" onClick={() => { setPayingBillId(b.id); setPaymentMethod("bkash"); }}>Mark paid</Button>}
                  <Button size="sm" variant="ghost" onClick={() => deleteMutation.mutate(b.id)}><Trash2 className="h-4 w-4" /></Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
        {filtered.length === 0 && <p className="text-sm text-muted-foreground">No bills found.</p>}
      </div>
      <Dialog open={!!payingBillId} onOpenChange={open => { if (!open) setPayingBillId(null); }}>
        <DialogContent className="max-w-sm">
          <DialogHeader><DialogTitle>Mark as paid</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><Label>Payment method</Label>
              <Select value={paymentMethod} onValueChange={v => setPaymentMethod(v as PaymentMethod)}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>{PAYMENT_METHODS.map(m => <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setPayingBillId(null)}>Cancel</Button>
              <Button disabled={markPaidMutation.isPending} onClick={() => payingBillId && markPaidMutation.mutate({ id: payingBillId, method: paymentMethod })}>
                {markPaidMutation.isPending && <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />}Confirm
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ─── Calculators ──────────────────────────────────────────────────────────────
function CalcField({ label, v, set }: { label: string; v: string; set: (v: string) => void }) {
  return <div><Label>{label}</Label><Input className="mt-1" type="number" min="0" value={v} onChange={e => set(e.target.value)} /></div>;
}
function CalcSlider({ label, v, set, max }: { label: string; v: number; set: (n: number) => void; max: number }) {
  return <div><Label>{label}</Label><input type="range" min={0} max={max} value={v} onChange={e => set(Number(e.target.value))} className="mt-2 w-full accent-foreground" /></div>;
}
function ZakatCalc() {
  const [cash, setCash] = useState("0"); const [gold, setGold] = useState("0");
  const [investments, setInvestments] = useState("0"); const [debts, setDebts] = useState("0");
  const [nisab, setNisab] = useState("5200");
  const total = Number(cash) + Number(gold) + Number(investments) - Number(debts);
  const eligible = total >= Number(nisab);
  const zakat = eligible ? total * 0.025 : 0;
  return (
    <Card className="mt-4"><CardHeader><CardTitle>Zakat calculator (2.5%)</CardTitle></CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-2">
        <CalcField label="Cash & bank savings" v={cash} set={setCash} />
        <CalcField label="Gold / silver value" v={gold} set={setGold} />
        <CalcField label="Investments" v={investments} set={setInvestments} />
        <CalcField label="Debts owed" v={debts} set={setDebts} />
        <CalcField label="Nisab threshold" v={nisab} set={setNisab} />
        <div className="md:col-span-2 rounded-lg border border-border bg-card p-4">
          <div className="text-xs text-muted-foreground">Zakatable wealth</div>
          <div className="text-2xl font-semibold">${total.toFixed(2)}</div>
          <div className="mt-3 text-xs text-muted-foreground">Zakat due</div>
          <div className="text-3xl font-semibold text-emerald-500">${zakat.toFixed(2)}</div>
          {!eligible && <p className="mt-2 text-xs text-amber-500">Below nisab — no Zakat due.</p>}
        </div>
      </CardContent>
    </Card>
  );
}
function TaxCalc() {
  const [income, setIncome] = useState("50000"); const [deductions, setDeductions] = useState("12000");
  const taxable = Math.max(0, Number(income) - Number(deductions));
  const brackets: [number, number][] = [[11600,0.10],[47150,0.12],[100525,0.22],[191950,0.24],[243725,0.32],[609350,0.35],[Infinity,0.37]];
  let remaining = taxable, prev = 0, tax = 0;
  for (const [cap, rate] of brackets) { const slice = Math.min(remaining, cap - prev); if (slice <= 0) break; tax += slice * rate; remaining -= slice; prev = cap; }
  const effective = taxable > 0 ? (tax / taxable) * 100 : 0;
  return (
    <Card className="mt-4"><CardHeader><CardTitle>Personal income tax (estimate)</CardTitle></CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-2">
        <CalcField label="Annual gross income" v={income} set={setIncome} />
        <CalcField label="Deductions" v={deductions} set={setDeductions} />
        <div className="md:col-span-2 rounded-lg border border-border bg-card p-4">
          <div className="text-xs text-muted-foreground">Taxable income</div>
          <div className="text-2xl font-semibold">${taxable.toFixed(2)}</div>
          <div className="mt-3 text-xs text-muted-foreground">Estimated tax</div>
          <div className="text-3xl font-semibold text-rose-500">${tax.toFixed(2)}</div>
          <div className="mt-1 text-xs text-muted-foreground">Effective rate: {effective.toFixed(1)}%</div>
        </div>
      </CardContent>
    </Card>
  );
}
function CreditCalc() {
  const [payment, setPayment] = useState(95); const [utilization, setUtilization] = useState(20);
  const [age, setAge] = useState(6); const [mix, setMix] = useState(3); const [inquiries, setInquiries] = useState(1);
  const score = Math.round(300 + 550 * (0.35*(payment/100) + 0.30*Math.max(0,1-utilization/100) + 0.15*Math.min(1,age/10) + 0.10*Math.min(1,mix/5) + 0.10*Math.max(0,1-inquiries/6)));
  const band = score>=800?"Exceptional":score>=740?"Very good":score>=670?"Good":score>=580?"Fair":"Poor";
  return (
    <Card className="mt-4"><CardHeader><CardTitle>Credit score monitor</CardTitle></CardHeader>
      <CardContent className="space-y-5">
        <CalcSlider label={`On-time payment history: ${payment}%`} v={payment} set={setPayment} max={100} />
        <CalcSlider label={`Credit utilization: ${utilization}%`} v={utilization} set={setUtilization} max={100} />
        <CalcSlider label={`Avg. account age: ${age} yrs`} v={age} set={setAge} max={20} />
        <CalcSlider label={`Credit mix (types): ${mix}`} v={mix} set={setMix} max={6} />
        <CalcSlider label={`Recent inquiries: ${inquiries}`} v={inquiries} set={setInquiries} max={10} />
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="text-xs text-muted-foreground">Estimated score</div>
          <div className="text-4xl font-semibold">{score}</div>
          <div className="text-sm text-muted-foreground">{band}</div>
          <Progress value={((score - 300) / 550) * 100} className="mt-3" />
        </div>
      </CardContent>
    </Card>
  );
}
function CalcPage() {
  return (
    <div className="space-y-6">
      <div><h1 className="text-3xl">Calculators</h1><p className="text-sm text-muted-foreground">Zakat, personal tax, and credit health.</p></div>
      <Tabs defaultValue="zakat">
        <TabsList><TabsTrigger value="zakat">Zakat</TabsTrigger><TabsTrigger value="tax">Personal tax</TabsTrigger><TabsTrigger value="credit">Credit score</TabsTrigger></TabsList>
        <TabsContent value="zakat"><ZakatCalc /></TabsContent>
        <TabsContent value="tax"><TaxCalc /></TabsContent>
        <TabsContent value="credit"><CreditCalc /></TabsContent>
      </Tabs>
    </div>
  );
}

// ─── Compliance ───────────────────────────────────────────────────────────────
function CompliancePage() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<{ isHaram: boolean; reason?: string } | null>(null);
  const { data: flagged = [] } = useQuery({ queryKey: ["transactions"], queryFn: getTransactions, select: txns => txns.filter(t => t.is_haram) });
  return (
    <div className="space-y-6">
      <div><h1 className="text-3xl">Islamic compliance</h1><p className="text-sm text-muted-foreground">Auto-detects interest, gambling, alcohol and other non-compliant transactions.</p></div>
      <Card>
        <CardHeader><CardTitle>Check a transaction</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div><Label>Description</Label><Input className="mt-1" placeholder="e.g. Bank interest income" value={text} onChange={e => setText(e.target.value)} /></div>
          <Button onClick={() => setResult(detectHaram(text))}>Check compliance</Button>
          {result && (
            <div className={cn("flex items-center gap-2 rounded-lg border p-3 text-sm", result.isHaram ? "border-amber-500/40 bg-amber-500/10 text-amber-500" : "border-emerald-500/40 bg-emerald-500/10 text-emerald-500")}>
              {result.isHaram ? <AlertTriangle className="h-4 w-4" /> : <ShieldCheck className="h-4 w-4" />}
              {result.isHaram ? result.reason : "Looks Shariah-compliant"}
            </div>
          )}
          <div className="text-xs text-muted-foreground">Watched keywords: {HARAM_KEYWORDS.join(", ")}</div>
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
              {flagged.map(t => (
                <div key={t.id} className="flex items-start gap-3 rounded-lg border border-amber-500/30 bg-amber-500/5 p-3">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/20"><AlertTriangle className="h-4 w-4 text-amber-500" /></div>
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

// ─── Rewinder ─────────────────────────────────────────────────────────────────
function RewinderPage({ setSection }: { setSection: (s: SectionKey) => void }) {
  const { data: txns = [] } = useQuery({ queryKey: ["transactions"], queryFn: getTransactions });
  const monthlySummary = useMemo(() => {
    const map: Record<string, { income: number; expenses: number; categories: Record<string, number> }> = {};
    for (const t of txns) {
      const key = monthKey(t.transaction_date);
      if (!map[key]) map[key] = { income: 0, expenses: 0, categories: {} };
      if (t.type === "income") map[key].income += t.amount;
      else { map[key].expenses += t.amount; map[key].categories[t.category] = (map[key].categories[t.category] ?? 0) + t.amount; }
    }
    return map;
  }, [txns]);

  const sortedMonths = Object.keys(monthlySummary).sort();
  const [offset, setOffset] = useState(0);
  const displayMonths = sortedMonths.slice(Math.max(0, sortedMonths.length - MONTHS_SHOWN - offset), sortedMonths.length - offset || undefined);
  const canGoBack = sortedMonths.length > MONTHS_SHOWN + offset;
  const canGoForward = offset > 0;

  const chartData = displayMonths.map(key => ({ month: monthLabelLong(key), Income: monthlySummary[key].income, Expenses: monthlySummary[key].expenses }));

  const allCategoryTotals: Record<string, number> = {};
  for (const t of txns) if (t.type === "expense") allCategoryTotals[t.category] = (allCategoryTotals[t.category] ?? 0) + t.amount;
  const totalExpenses = Object.values(allCategoryTotals).reduce((a, b) => a + b, 0);
  const sortedCategories = Object.entries(allCategoryTotals).sort((a, b) => b[1] - a[1]);

  const runningData = useMemo(() => {
    let balance = 0;
    const monthly: Record<string, number> = {};
    const sorted = [...txns].sort((a, b) => a.transaction_date.localeCompare(b.transaction_date));
    for (const t of sorted) { const key = monthKey(t.transaction_date); balance += t.type === "income" ? t.amount : -t.amount; monthly[key] = balance; }
    return Object.keys(monthly).sort().map(key => ({ month: monthLabelLong(key), Balance: monthly[key] }));
  }, [txns]);

  const latestKey = sortedMonths[sortedMonths.length - 1];
  const prevKey = sortedMonths[sortedMonths.length - 2];
  const latestData = latestKey ? monthlySummary[latestKey] : null;
  const prevData = prevKey ? monthlySummary[prevKey] : null;
  const expenseChange = latestData && prevData ? latestData.expenses - prevData.expenses : null;
  const incomeChange = latestData && prevData ? latestData.income - prevData.income : null;

  if (txns.length === 0) {
    return (
      <div className="space-y-6">
        <div><h1 className="text-3xl">Rewinder</h1><p className="text-sm text-muted-foreground">Replay and analyse your financial history month by month.</p></div>
        <Card><CardContent className="flex flex-col items-center gap-3 py-16 text-center">
          <RotateCcw className="h-10 w-10 text-muted-foreground" />
          <p className="text-muted-foreground text-sm">No transactions yet. Add some to rewind your history.</p>
          <Button variant="outline" onClick={() => setSection("transactions")}>Go to Transactions</Button>
        </CardContent></Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div><h1 className="text-3xl">Rewinder</h1><p className="text-sm text-muted-foreground">Replay and analyse your financial history — income, expenses, and net worth month by month.</p></div>
      {latestKey && (
        <div className="grid gap-4 sm:grid-cols-3">
          <Card><CardHeader className="pb-2"><CardTitle className="text-xs font-medium text-muted-foreground">Income — {monthLabelLong(latestKey)}</CardTitle></CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold text-emerald-500">{fmt(latestData?.income ?? 0)}</div>
              {incomeChange !== null && <div className={`mt-1 flex items-center gap-1 text-xs ${incomeChange >= 0 ? "text-emerald-500" : "text-rose-500"}`}>{incomeChange >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}{fmt(Math.abs(incomeChange))} vs prev month</div>}
            </CardContent>
          </Card>
          <Card><CardHeader className="pb-2"><CardTitle className="text-xs font-medium text-muted-foreground">Expenses — {monthLabelLong(latestKey)}</CardTitle></CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold text-rose-500">{fmt(latestData?.expenses ?? 0)}</div>
              {expenseChange !== null && <div className={`mt-1 flex items-center gap-1 text-xs ${expenseChange <= 0 ? "text-emerald-500" : "text-rose-500"}`}>{expenseChange <= 0 ? <TrendingDown className="h-3 w-3" /> : <TrendingUp className="h-3 w-3" />}{fmt(Math.abs(expenseChange))} vs prev month</div>}
            </CardContent>
          </Card>
          <Card><CardHeader className="pb-2"><CardTitle className="text-xs font-medium text-muted-foreground">Net — {monthLabelLong(latestKey)}</CardTitle></CardHeader>
            <CardContent><div className={`text-2xl font-semibold ${(latestData?.income ?? 0) - (latestData?.expenses ?? 0) >= 0 ? "text-foreground" : "text-rose-500"}`}>{fmt((latestData?.income ?? 0) - (latestData?.expenses ?? 0))}</div></CardContent>
          </Card>
        </div>
      )}
      <Tabs defaultValue="monthly">
        <TabsList><TabsTrigger value="monthly">Monthly overview</TabsTrigger><TabsTrigger value="balance">Running balance</TabsTrigger><TabsTrigger value="categories">Category breakdown</TabsTrigger></TabsList>
        <TabsContent value="monthly" className="mt-4 space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Income vs Expenses</CardTitle>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" disabled={!canGoBack} onClick={() => setOffset(o => o+1)}><ChevronLeft className="h-4 w-4" /></Button>
                <span className="text-xs text-muted-foreground px-2"><Calendar className="inline h-3 w-3 mr-1" />Last {MONTHS_SHOWN} months</span>
                <Button variant="ghost" size="icon" disabled={!canGoForward} onClick={() => setOffset(o => o-1)}><ChevronRight className="h-4 w-4" /></Button>
              </div>
            </CardHeader>
            <CardContent>
              {chartData.length === 0 ? <p className="text-sm text-muted-foreground">Not enough data.</p> : (
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={chartData} margin={{ top: 4, right: 16, bottom: 0, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} />
                    <YAxis tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
                    <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} formatter={(v: number) => fmt(v)} />
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                    <Bar dataKey="Income" fill="oklch(0.6 0.18 145)" radius={[4,4,0,0]} />
                    <Bar dataKey="Expenses" fill="oklch(0.65 0.2 25)" radius={[4,4,0,0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="balance" className="mt-4">
          <Card><CardHeader><CardTitle>Running balance over time</CardTitle></CardHeader>
            <CardContent>
              {runningData.length < 2 ? <p className="text-sm text-muted-foreground">Need at least 2 months of data to plot.</p> : (
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart data={runningData} margin={{ top: 4, right: 16, bottom: 0, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} />
                    <YAxis tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
                    <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} formatter={(v: number) => fmt(v)} />
                    <Line type="monotone" dataKey="Balance" stroke="oklch(0.78 0.22 145)" strokeWidth={2} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="categories" className="mt-4">
          <Card><CardHeader><CardTitle>All-time expense breakdown by category</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {sortedCategories.length === 0 ? <p className="text-sm text-muted-foreground">No expense data yet.</p> : sortedCategories.map(([cat, total]) => {
                const pct = totalExpenses > 0 ? (total / totalExpenses) * 100 : 0;
                return (
                  <div key={cat} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2"><Badge variant="secondary">{cat}</Badge></span>
                      <span className="tabular-nums">{fmt(total)} <span className="text-muted-foreground text-xs">({pct.toFixed(1)}%)</span></span>
                    </div>
                    <Progress value={pct} className="h-1.5" />
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <div>
        <h2 className="text-xl mb-4">Monthly breakdown</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {[...sortedMonths].reverse().map(key => {
            const { income, expenses, categories } = monthlySummary[key];
            const net = income - expenses;
            const topCat = Object.entries(categories).sort((a, b) => b[1] - a[1])[0];
            return (
              <Card key={key} className="group relative overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-elegant">
                <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-brand-gradient opacity-0 blur-2xl transition-all duration-300 group-hover:opacity-15" />
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center justify-between">
                    <span>{monthLabelLong(key)}</span>
                    <span className={`text-base font-medium ${net >= 0 ? "text-emerald-500" : "text-rose-500"}`}>{net >= 0 ? "+" : ""}{fmt(net)}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between text-muted-foreground"><span className="flex items-center gap-1"><TrendingUp className="h-3 w-3 text-emerald-500" /> Income</span><span className="text-emerald-500">{fmt(income)}</span></div>
                  <div className="flex justify-between text-muted-foreground"><span className="flex items-center gap-1"><TrendingDown className="h-3 w-3 text-rose-500" /> Expenses</span><span className="text-rose-500">{fmt(expenses)}</span></div>
                  {topCat && <div className="pt-1 text-xs text-muted-foreground">Top spend: <span className="text-foreground">{topCat[0]}</span> ({fmt(topCat[1])})</div>}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── News ─────────────────────────────────────────────────────────────────────
function NewsPage() {
  const [activeCategory, setActiveCategory] = useState<NewsFilterCat>("All");
  const [search, setSearch] = useState("");
  const [newsletterEmail, setNewsletterEmail] = useState("");

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = newsletterEmail.trim();
    if (!trimmed || !trimmed.includes("@")) { toast.error("Please enter a valid email address"); return; }
    toast.success("Subscribed successfully"); setNewsletterEmail("");
  }

  const allItems = [...TIPS.map(t => ({ ...t, type: "tip" as const })), ...NEWS_ITEMS.map(n => ({ ...n, type: "news" as const }))];
  const filtered = allItems.filter(item => {
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    const matchesSearch = !search || item.title.toLowerCase().includes(search.toLowerCase()) || item.summary.toLowerCase().includes(search.toLowerCase()) || item.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div><h1 className="text-3xl">Financial Tips &amp; News</h1><p className="text-sm text-muted-foreground">Curated insights to help you make smarter financial decisions.</p></div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input placeholder="Search tips and news…" value={search} onChange={e => setSearch(e.target.value)} className="pl-9" /></div>
        <div className="flex flex-wrap gap-2">
          {NEWS_FILTER_CATS.map(cat => <Button key={cat} size="sm" variant={activeCategory === cat ? "default" : "outline"} onClick={() => setActiveCategory(cat)} className="rounded-full">{cat}</Button>)}
        </div>
      </div>
      {filtered.length === 0 ? <p className="text-sm text-muted-foreground">No results found.</p> : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((item, idx) => (
            <Card key={idx} className="group relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-elegant">
              <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-brand-gradient opacity-0 blur-2xl transition-all duration-300 group-hover:opacity-15" />
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-[color:var(--surface-elevated)]"><item.icon className="h-4 w-4 text-[color:var(--brand-bolt)]" /></div>
                  <div className="flex flex-wrap gap-1">{item.tags.slice(0, 2).map(tag => <Badge key={tag} variant="secondary" className="text-[10px]">{tag}</Badge>)}</div>
                </div>
                <CardTitle className="mt-3 text-base leading-snug">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground leading-relaxed">{item.summary}</p>
                <div className="flex items-center justify-end text-xs text-muted-foreground">
                  {"date" in item && item.date && <span>{item.date}</span>}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      <Card className="border-[color:var(--brand-bolt)]/30 bg-[color:var(--brand-bolt)]/5">
        <CardContent className="flex flex-col items-start justify-between gap-4 pt-6 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2"><BookOpen className="h-4 w-4 text-[color:var(--brand-bolt)]" /><span className="text-sm font-medium">Financial Tips Newsletter</span></div>
            <p className="mt-1 text-xs text-muted-foreground">Get curated tips, market updates and Islamic finance insights delivered weekly.</p>
          </div>
          <form onSubmit={handleSubscribe} className="flex items-center gap-2 w-full sm:w-auto">
            <Input type="email" placeholder="your@email.com" className="text-sm" value={newsletterEmail} onChange={e => setNewsletterEmail(e.target.value)} />
            <Button type="submit" size="sm" className="shrink-0">Subscribe</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Learn ────────────────────────────────────────────────────────────────────
function CourseCard({ course, completedLessons, onOpen }: { course: typeof COURSES[0]; completedLessons: number; onOpen: () => void }) {
  const pct = course.lessons > 0 ? Math.round((completedLessons / course.lessons) * 100) : 0;
  return (
    <Card className="group relative overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-elegant" onClick={onOpen}>
      <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-brand-gradient opacity-0 blur-2xl transition-all duration-300 group-hover:opacity-15" />
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border/60 ${course.bgColor}`}><course.icon className={`h-5 w-5 ${course.color}`} /></div>
          <Badge variant="outline" className="text-[10px]">{course.level}</Badge>
        </div>
        <CardTitle className="mt-3 text-base leading-snug">{course.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground leading-relaxed">{course.description}</p>
        <div className="flex flex-wrap gap-1">{course.tags.map(tag => <Badge key={tag} variant="secondary" className="text-[10px]">{tag}</Badge>)}</div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {course.duration}</span>
            <span>{completedLessons}/{course.lessons} lessons</span>
          </div>
          <Progress value={pct} className="h-1.5" />
          {pct === 100 ? <div className="flex items-center gap-1 text-xs text-emerald-500"><CheckCircle className="h-3 w-3" /> Complete</div> : pct > 0 ? <div className="text-xs text-[color:var(--brand-bolt)]">{pct}% complete — keep going</div> : null}
        </div>
        <Button size="sm" className="w-full" variant={pct === 0 ? "default" : "outline"}><PlayCircle className="mr-1.5 h-4 w-4" />{pct === 0 ? "Start course" : pct === 100 ? "Review" : "Continue"}</Button>
      </CardContent>
    </Card>
  );
}
function CourseDetail({ course, progressSet, onBack, onCompleteLesson }: { course: typeof COURSES[0]; progressSet: Set<string>; onBack: () => void; onCompleteLesson: (courseId: number, lessonIndex: number) => void }) {
  const completedLessons = course.lessons_list.filter((_, i) => progressSet.has(`${course.id}:${i}`)).length;
  const pct = course.lessons > 0 ? Math.round((completedLessons / course.lessons) * 100) : 0;
  const nextLessonIndex = course.lessons_list.findIndex((_, i) => !progressSet.has(`${course.id}:${i}`));
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3"><Button variant="outline" size="sm" onClick={onBack}>← Back</Button><h2 className="text-2xl">{course.title}</h2></div>
      <Card><CardContent className="pt-6 space-y-4">
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {course.duration}</span>
          <span className="flex items-center gap-1"><BookOpen className="h-4 w-4" /> {course.lessons} lessons</span>
          <Badge variant="outline">{course.level}</Badge>
        </div>
        <p className="text-muted-foreground">{course.description}</p>
        <div className="space-y-1"><div className="flex justify-between text-xs text-muted-foreground"><span>{completedLessons} of {course.lessons} completed</span><span>{pct}%</span></div><Progress value={pct} /></div>
      </CardContent></Card>
      <div className="space-y-2">
        {course.lessons_list.map((lesson, i) => {
          const done = progressSet.has(`${course.id}:${i}`);
          const isNext = i === nextLessonIndex;
          return (
            <div key={i} onClick={() => { if (isNext) onCompleteLesson(course.id, i); }}
              className={`flex items-center gap-3 rounded-xl border p-4 transition-smooth ${done ? "border-emerald-500/30 bg-emerald-500/5" : isNext ? "border-[color:var(--brand-bolt)]/40 bg-[color:var(--brand-bolt)]/5 cursor-pointer hover:border-[color:var(--brand-bolt)]" : "border-border/60 bg-card"}`}>
              <div className="shrink-0">{done ? <CheckCircle className="h-5 w-5 text-emerald-500" /> : isNext ? <PlayCircle className="h-5 w-5 text-[color:var(--brand-bolt)]" /> : <Lock className="h-5 w-5 text-muted-foreground" />}</div>
              <div className="flex-1 min-w-0"><div className={`text-sm font-medium ${done ? "line-through text-muted-foreground" : ""}`}>{lesson.title}</div></div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0"><Clock className="h-3 w-3" /> {lesson.duration}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
function LearnPage() {
  const [glossarySearch, setGlossarySearch] = useState("");

  const filteredGlossary = GLOSSARY.filter(g =>
    !glossarySearch ||
    g.term.toLowerCase().includes(glossarySearch.toLowerCase()) ||
    g.def.toLowerCase().includes(glossarySearch.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl">Learning Resources</h1>
        <p className="text-sm text-muted-foreground">Courses and financial literacy resources — more coming soon.</p>
      </div>

      <Tabs defaultValue="courses">
        <TabsList>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="glossary">Glossary</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="mt-4">
          <Card>
            <CardContent className="flex flex-col items-center gap-4 py-16 text-center">
              <BookOpen className="h-12 w-12 text-muted-foreground/40" />
              <div>
                <p className="font-medium text-foreground">No courses yet</p>
                <p className="text-sm text-muted-foreground mt-1">Courses will appear here once they are added through the admin panel.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="glossary" className="mt-4 space-y-4">
          <div className="relative">
            <BookOpen className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Search terms…"
              value={glossarySearch}
              onChange={e => setGlossarySearch(e.target.value)}
              className="flex h-9 w-full rounded-lg border border-input bg-background pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {filteredGlossary.map(g => (
              <Card key={g.term} className="border-border/60">
                <CardContent className="pt-4 pb-4">
                  <div className="text-sm font-semibold text-[color:var(--brand-bolt)]">{g.term}</div>
                  <p className="mt-1 text-sm text-muted-foreground">{g.def}</p>
                </CardContent>
              </Card>
            ))}
            {filteredGlossary.length === 0 && (
              <p className="text-sm text-muted-foreground col-span-2">No matching terms found.</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// ─── AI Assistant placeholder ─────────────────────────────────────────────────
function AiAssistantPage() {
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    setMessages(prev => [...prev, { role: "user", text }]);
    setLoading(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      const apiUrl = import.meta.env.VITE_AI_API_URL;
      if (!apiKey || !apiUrl) throw new Error("AI API not configured");

      const SYSTEM = "You are Tactifin AI, a friendly personal-finance assistant. Help with budgeting, expense tracking, Zakat calculation (2.5% on wealth above nisab ~$5,200), Shariah-compliance questions (flag riba/interest, gambling, alcohol), tax estimation, and savings goals. Keep answers concise and practical.";

      const history = messages.map(m => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.text }],
      }));

      // VITE_AI_API_URL already ends with ?key=, append the key directly
      const url = `${apiUrl}${apiKey}`;

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            // Inject system prompt as first user/model turn
            { role: "user",  parts: [{ text: SYSTEM }] },
            { role: "model", parts: [{ text: "Understood. I am Tactifin AI, ready to help with your finances." }] },
            ...history,
            { role: "user",  parts: [{ text }] },
          ],
          generationConfig: { maxOutputTokens: 800, temperature: 0.7 },
        }),
      });

      if (!res.ok) {
        const errBody = await res.text();
        throw new Error(`API error ${res.status}: ${errBody.slice(0, 120)}`);
      }
      const data = await res.json();
      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "Sorry, I couldn't generate a response.";
      setMessages(prev => [...prev, { role: "assistant", text: reply }]);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "AI request failed");
      setMessages(prev => [...prev, { role: "assistant", text: "Sorry, something went wrong. Please try again." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="mb-4">
        <h1 className="text-3xl">AI Assistant</h1>
        <p className="text-sm text-muted-foreground">Ask anything about your finances — budgeting, Zakat, tax, Shariah compliance.</p>
      </div>

      <Card className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && !loading && (
            <div className="flex flex-col items-center gap-3 pt-12 text-center text-muted-foreground">
              <Bot className="h-10 w-10 text-[color:var(--brand-bolt)]" />
              <p className="text-sm">Ask about budgeting, Zakat, taxes, or whether a transaction is Shariah-compliant.</p>
            </div>
          )}
          {messages.map((m, i) => (
            <div key={i} className={cn("flex gap-3", m.role === "user" ? "justify-end" : "justify-start")}>
              {m.role === "assistant" && (
                <div className="h-8 w-8 shrink-0 rounded-full bg-[color:var(--brand-bolt)]/20 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-[color:var(--brand-bolt)]" />
                </div>
              )}
              <div className={cn(
                "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm whitespace-pre-wrap",
                m.role === "user" ? "bg-primary text-primary-foreground" : "bg-accent text-foreground",
              )}>
                {m.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex gap-3">
              <div className="h-8 w-8 shrink-0 rounded-full bg-[color:var(--brand-bolt)]/20 flex items-center justify-center">
                <Bot className="h-4 w-4 text-[color:var(--brand-bolt)]" />
              </div>
              <div className="rounded-2xl bg-accent px-4 py-2.5 text-sm text-muted-foreground">Thinking…</div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <form onSubmit={send} className="border-t border-border p-3 flex items-end gap-2">
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(e); } }}
            placeholder="Ask Tactifin AI…"
            rows={1}
            className="flex-1 resize-none rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
          />
          <Button type="submit" disabled={loading || !input.trim()} size="icon">
            <TrendingUp className="h-4 w-4" />
          </Button>
        </form>
      </Card>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SIDEBAR NAV CONFIG
// ═══════════════════════════════════════════════════════════════════════════════

const NAV: { key: SectionKey; label: string; icon: React.ElementType }[] = [
  { key: "dashboard",    label: "Dashboard",    icon: LayoutDashboard },
  { key: "transactions", label: "Transactions", icon: Receipt },
  { key: "goals",        label: "Goals",        icon: Target },
  { key: "budgets",      label: "Budgets",      icon: Wallet },
  { key: "bills",        label: "Bill Pay",     icon: CreditCard },
  { key: "rewinder",     label: "Rewinder",     icon: RotateCcw },
  { key: "calculators",  label: "Calculators",  icon: Calculator },
  { key: "compliance",   label: "Compliance",   icon: ShieldCheck },
  { key: "ai",           label: "AI Assistant", icon: Bot },
  { key: "news",         label: "Tips & News",  icon: Newspaper },
  { key: "learn",        label: "Learning",     icon: BookOpen },
];

const REPORTS: { key: ReportKey; label: string; icon: React.ElementType }[] = [
  { key: "journal", label: "Journal Ledger",   icon: BookOpenCheck },
  { key: "trial",   label: "Trial Balance",    icon: BarChart3 },
  { key: "income",  label: "Income Statement", icon: FileText },
  { key: "balance", label: "Balance Sheet",    icon: Scale },
];

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN SPA EXPORT
// ═══════════════════════════════════════════════════════════════════════════════

export function SpaApp() {
  const [section, setSection] = useState<SectionKey>("dashboard");
  const [mobile, setMobile] = useState(false);
  const [report, setReport] = useState<ReportKey | null>(null);
  const { theme, toggle } = useTheme();

  // Import React for ElementType usage
  const content: Record<SectionKey, React.ReactNode> = {
    dashboard:    <Dashboard setSection={setSection} />,
    transactions: <TransactionsPage />,
    goals:        <GoalsPage />,
    budgets:      <BudgetsPage />,
    bills:        <BillsPage />,
    calculators:  <CalcPage />,
    compliance:   <CompliancePage />,
    rewinder:     <RewinderPage setSection={setSection} />,
    news:         <NewsPage />,
    learn:        <LearnPage />,
    ai:           <AiAssistantPage />,
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 border-r border-border bg-card flex-col md:flex transition-transform",
        mobile ? "flex translate-x-0" : "hidden -translate-x-full md:translate-x-0",
      )}>
        <div className="flex h-16 items-center gap-2 border-b border-border px-5 shrink-0">
          <TactifinLogo size={32} />
          <span className="text-lg font-medium tracking-tight">Tactifin</span>
        </div>
        <nav className="flex-1 space-y-0.5 overflow-y-auto p-3">
          {NAV.map(n => (
            <button key={n.key}
              onClick={() => { setSection(n.key); setMobile(false); }}
              className={cn(
                "w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors text-left",
                section === n.key ? "bg-accent text-foreground" : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
              )}>
              <n.icon className="h-4 w-4 shrink-0" />
              {n.label}
            </button>
          ))}
          <div className="pt-3 mt-1 border-t border-border">
            <p className="px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Reports</p>
            {REPORTS.map(r => (
              <button key={r.key}
                onClick={() => { setReport(r.key); setMobile(false); }}
                className={cn(
                  "w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors text-left",
                  report === r.key ? "bg-accent text-foreground" : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
                )}>
                <r.icon className="h-4 w-4 shrink-0" />
                {r.label}
              </button>
            ))}
          </div>
        </nav>
        <div className="border-t border-border p-3 shrink-0">
          <button onClick={toggle} className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground">
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            {theme === "dark" ? "Light mode" : "Dark mode"}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col md:pl-64">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur md:hidden">
          <button onClick={() => setMobile(m => !m)} className="flex h-9 w-9 items-center justify-center rounded-md border border-border">
            {mobile ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
          <span className="text-sm font-medium">Tactifin</span>
          <button onClick={toggle} className="flex h-9 w-9 items-center justify-center rounded-md border border-border">
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </header>
        <main className="flex-1 p-4 md:p-8">{content[section]}</main>
      </div>

      {/* Report modals */}
      <JournalModal         open={report === "journal"} onClose={() => setReport(null)} />
      <TrialBalanceModal    open={report === "trial"}   onClose={() => setReport(null)} />
      <IncomeStatementModal open={report === "income"}  onClose={() => setReport(null)} />
      <BalanceSheetModal    open={report === "balance"} onClose={() => setReport(null)} />
    </div>
  );
}
