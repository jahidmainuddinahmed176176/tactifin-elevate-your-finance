import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Wallet, AlertTriangle, Target, CreditCard } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

export const Route = createFileRoute("/_authenticated/app")({
  head: () => ({ meta: [{ title: "Dashboard — Tactifin" }] }),
  component: Dashboard,
});

function fmt(n: number) {
  return new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(n);
}

function monthKey(dateStr: string) {
  return dateStr.slice(0, 7);
}
function monthLabel(key: string) {
  const [y, m] = key.split("-");
  return new Date(Number(y), Number(m) - 1, 1).toLocaleString("default", { month: "short" });
}

const PIE_COLORS = [
  "oklch(0.78 0.22 145)",
  "oklch(0.65 0.13 255)",
  "oklch(0.75 0.18 60)",
  "oklch(0.70 0.20 300)",
  "oklch(0.68 0.20 25)",
  "oklch(0.72 0.15 180)",
];

function Dashboard() {
  const { data: txns = [] } = useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("transactions")
        .select("*")
        .order("transaction_date", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const { data: goals = [] } = useQuery({
    queryKey: ["goals"],
    queryFn: async () => {
      const { data, error } = await supabase.from("goals").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const { data: budgets = [] } = useQuery({
    queryKey: ["budgets"],
    queryFn: async () => {
      const { data, error } = await supabase.from("budgets").select("*").order("category");
      if (error) throw error;
      return data;
    },
  });

  const income = txns.filter((t) => t.type === "income").reduce((a, t) => a + Number(t.amount), 0);
  const expenses = txns.filter((t) => t.type === "expense").reduce((a, t) => a + Number(t.amount), 0);
  const haramCount = txns.filter((t) => t.is_haram).length;
  const balance = income - expenses;

  // Spending by category (pie)
  const categoryData = useMemo(() => {
    const map: Record<string, number> = {};
    for (const t of txns) {
      if (t.type === "expense") {
        map[t.category] = (map[t.category] ?? 0) + Number(t.amount);
      }
    }
    return Object.entries(map)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([name, value]) => ({ name, value }));
  }, [txns]);

  // Monthly trend (last 6 months bar chart)
  const monthlyData = useMemo(() => {
    const map: Record<string, { income: number; expenses: number }> = {};
    for (const t of txns) {
      const key = monthKey(t.transaction_date);
      if (!map[key]) map[key] = { income: 0, expenses: 0 };
      if (t.type === "income") map[key].income += Number(t.amount);
      else map[key].expenses += Number(t.amount);
    }
    return Object.keys(map)
      .sort()
      .slice(-6)
      .map((key) => ({
        month: monthLabel(key),
        Income: map[key].income,
        Expenses: map[key].expenses,
      }));
  }, [txns]);

  // Goals near completion
  const topGoals = goals.slice(0, 3);

  // Over-budget categories
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().slice(0, 10);
  const spentBy: Record<string, number> = {};
  for (const t of txns) {
    if (t.type !== "expense" || t.transaction_date < monthStart) continue;
    spentBy[t.category] = (spentBy[t.category] ?? 0) + Number(t.amount);
  }
  const overBudget = budgets.filter((b) => (spentBy[b.category] ?? 0) > Number(b.monthly_limit));

  const stats = [
    { label: "Balance", value: fmt(balance), icon: Wallet, accent: "text-foreground" },
    { label: "Income", value: fmt(income), icon: TrendingUp, accent: "text-emerald-500" },
    { label: "Expenses", value: fmt(expenses), icon: TrendingDown, accent: "text-rose-500" },
    { label: "Flagged", value: String(haramCount), icon: AlertTriangle, accent: "text-amber-500" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Your financial overview at a glance.</p>
        </div>
        <Button asChild size="sm" variant="outline">
          <Link to="/transactions">+ Add transaction</Link>
        </Button>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{s.label}</CardTitle>
              <s.icon className={`h-4 w-4 ${s.accent}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-semibold ${s.accent}`}>{s.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts row */}
      {txns.length > 0 && (
        <div className="grid gap-4 lg:grid-cols-2">
          {/* Monthly trend */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly trend</CardTitle>
            </CardHeader>
            <CardContent>
              {monthlyData.length < 1 ? (
                <p className="text-sm text-muted-foreground">Not enough data yet.</p>
              ) : (
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={monthlyData} margin={{ top: 4, right: 8, bottom: 0, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} />
                    <YAxis tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                    <Tooltip
                      contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }}
                      formatter={(v: number) => fmt(v)}
                    />
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                    <Bar dataKey="Income" fill="oklch(0.6 0.18 145)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Expenses" fill="oklch(0.65 0.2 25)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>

          {/* Spending by category */}
          <Card>
            <CardHeader>
              <CardTitle>Spending by category</CardTitle>
            </CardHeader>
            <CardContent>
              {categoryData.length === 0 ? (
                <p className="text-sm text-muted-foreground">No expense data yet.</p>
              ) : (
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={85}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {categoryData.map((_, idx) => (
                        <Cell key={idx} fill={PIE_COLORS[idx % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }}
                      formatter={(v: number) => fmt(v)}
                    />
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Goals + budget alerts row */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Goals snapshot */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="flex items-center gap-2">
              <Target className="h-4 w-4 text-[color:var(--brand-bolt)]" /> Savings goals
            </CardTitle>
            <Button asChild size="sm" variant="ghost" className="text-xs">
              <Link to="/goals">View all</Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {topGoals.length === 0 ? (
              <p className="text-sm text-muted-foreground">No goals yet. <Link to="/goals" className="underline">Create one</Link>.</p>
            ) : (
              topGoals.map((g) => {
                const pct = Math.min(100, (Number(g.current_amount) / Number(g.target_amount)) * 100);
                return (
                  <div key={g.id} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span>{g.name}</span>
                      <span className="text-muted-foreground text-xs">
                        {fmt(Number(g.current_amount))} / {fmt(Number(g.target_amount))}
                      </span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full bg-brand-gradient transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </CardContent>
        </Card>

        {/* Budget alerts */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-[color:var(--brand-bolt)]" /> Budget status
            </CardTitle>
            <Button asChild size="sm" variant="ghost" className="text-xs">
              <Link to="/budgets">View all</Link>
            </Button>
          </CardHeader>
          <CardContent>
            {budgets.length === 0 ? (
              <p className="text-sm text-muted-foreground">No budgets set. <Link to="/budgets" className="underline">Add one</Link>.</p>
            ) : overBudget.length === 0 ? (
              <div className="flex items-center gap-2 text-sm text-emerald-500">
                <TrendingDown className="h-4 w-4" /> All budgets on track this month.
              </div>
            ) : (
              <div className="space-y-2">
                {overBudget.map((b) => {
                  const spent = spentBy[b.category] ?? 0;
                  return (
                    <div key={b.id} className="flex items-center justify-between rounded-lg border border-rose-500/30 bg-rose-500/5 px-3 py-2 text-sm">
                      <span className="flex items-center gap-2">
                        <AlertTriangle className="h-3.5 w-3.5 text-rose-500" />
                        {b.category}
                      </span>
                      <span className="text-rose-500 text-xs">
                        Over by {fmt(spent - Number(b.monthly_limit))}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent transactions */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle>Recent transactions</CardTitle>
          <Button asChild size="sm" variant="ghost" className="text-xs">
            <Link to="/transactions">View all</Link>
          </Button>
        </CardHeader>
        <CardContent>
          {txns.length === 0 ? (
            <p className="text-sm text-muted-foreground">No transactions yet. <Link to="/transactions" className="underline">Add one</Link>.</p>
          ) : (
            <div className="divide-y divide-border">
              {txns.slice(0, 8).map((t) => (
                <div key={t.id} className="flex items-center justify-between py-3">
                  <div>
                    <div className="font-medium">{t.description || t.category}</div>
                    <div className="text-xs text-muted-foreground">
                      {t.category} · {t.transaction_date}
                      {t.is_haram && <span className="ml-2 text-amber-500">⚠ flagged</span>}
                    </div>
                  </div>
                  <div className={t.type === "income" ? "text-emerald-500" : "text-rose-500"}>
                    {t.type === "income" ? "+" : "-"}
                    {fmt(Number(t.amount))}
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
