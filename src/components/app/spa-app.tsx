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
  { category: "Tips", title: "The 50/30/20 Rule: A Simple Budget Framework", summary: "Allocate 50% of take-home pay to needs, 30% to wants, and 20% to savings or debt repayment. This flexible ru[...]
  { category: "Islamic Finance", title: "Understanding Riba: Why Interest Matters in Islamic Finance", summary: "Riba (interest) is prohibited in Islamic law. This applies to bank savings interes[...]
  { category: "Markets", title: "Dollar-Cost Averaging: Reduce Risk in Volatile Markets", summary: "Investing a fixed amount at regular intervals — regardless of price — smooths out market vo[...]
  { category: "Tax", title: "5 Deductions Most People Miss on Their Tax Return", summary: "Home office expenses, professional development costs, charitable donations, health insurance premiums (i[...]
  { category: "Savings", title: "Building a 6-Month Emergency Fund: Step by Step", summary: "Start by calculating three months of essential expenses (rent, food, utilities). Open a separate high-[...]
  { category: "Islamic Finance", title: "Calculating Your Zakat: A Practical Guide", summary: "Zakat is 2.5% of wealth held above the nisab threshold for one lunar year. Eligible assets include c[...]
  { category: "Tips", title: "Automate Your Finances: Set It and Forget It", summary: "Automate savings transfers, bill payments, and investment contributions on payday. Removing the manual decis[...]
  { category: "Markets", title: "What Is a Credit Score and How to Improve It", summary: "Your credit score (300–850) affects loan rates, rental applications, and sometimes employment. The bigg[...]
  { category: "Tax", title: "Freelancers & Self-Employed: Estimated Tax Basics", summary: "If you earn self-employment income, the IRS expects quarterly estimated tax payments. Under-paying can t[...]
];
const NEWS_ITEMS = [
  { category: "Markets", title: "Global Markets Digest: Key Trends This Week", summary: "Central banks in multiple economies are holding rates steady as inflation data shows signs of cooling. Equ[...]
  { category: "Islamic Finance", title: "Sukuk Issuance Hits Record Levels in 2026", summary: "Global sukuk (Islamic bond) issuance has surpassed previous records this year, driven by sovereign i[...]
  { category: "Tax", title: "IRS Announces Inflation-Adjusted Tax Brackets for 2026", summary: "The IRS has released updated tax bracket thresholds, adjusted upward to account for inflation. Stan[...]
];

// ─── Learn data ─────────────────────────────────────────────────────────[...]
const COURSES = [
  { id: 1, title: "Personal Finance 101", description: "Master the fundamentals — budgeting, saving, debt management and building an emergency fund.", icon: Wallet, level: "Beginner", duration:[...]
  { id: 2, title: "Islamic Finance Fundamentals", description: "Understand Shariah-compliant finance: Riba, Zakat, Halal investing, Sukuk and more.", icon: ShieldCheck, level: "Beginner", duratio[...]
  { id: 3, title: "Investing for Beginners", description: "From index funds to ETFs — learn how to start investing with confidence regardless of your starting amount.", icon: TrendingUp, level:[...]
  { id: 4, title: "Goal-Based Saving Strategies", description: "Practical techniques for saving towards specific goals — house deposit, education, retirement, and more.", icon: Target, level: "[...]
  { id: 5, title: "Understanding Your Credit", description: "Deep dive into how credit scores work, what damages them, and proven strategies to improve yours.", icon: TrendingUp, level: "Intermed[...]
  { id: 6, title: "Tax Efficiency for Individuals", description: "Legal strategies to reduce your tax bill — deductions, credits, retirement accounts and filing tips.", icon: BookOpen, level: "[...]
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
... (file continues)
