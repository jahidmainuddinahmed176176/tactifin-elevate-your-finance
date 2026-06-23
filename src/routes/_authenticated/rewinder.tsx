import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts";
import { RotateCcw, TrendingUp, TrendingDown, Calendar, ChevronLeft, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/_authenticated/rewinder")({
  head: () => ({ meta: [{ title: "Rewinder — Tactifin" }] }),
  component: RewinderPage,
});

function fmt(n: number) {
  return new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(n);
}

function monthKey(dateStr: string) {
  return dateStr.slice(0, 7); // YYYY-MM
}

function monthLabel(key: string) {
  const [y, m] = key.split("-");
  return new Date(Number(y), Number(m) - 1, 1).toLocaleString("default", { month: "short", year: "numeric" });
}

const MONTHS_SHOWN = 6;

export default function RewinderPage() {
  const { data: txns = [] } = useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("transactions")
        .select("*")
        .order("transaction_date", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  // Compute monthly summaries
  const monthlySummary = useMemo(() => {
    const map: Record<string, { income: number; expenses: number; categories: Record<string, number> }> = {};
    for (const t of txns) {
      const key = monthKey(t.transaction_date);
      if (!map[key]) map[key] = { income: 0, expenses: 0, categories: {} };
      if (t.type === "income") map[key].income += Number(t.amount);
      else {
        map[key].expenses += Number(t.amount);
        map[key].categories[t.category] = (map[key].categories[t.category] ?? 0) + Number(t.amount);
      }
    }
    return map;
  }, [txns]);

  const sortedMonths = Object.keys(monthlySummary).sort();
  const [offset, setOffset] = useState(0);

  const displayMonths = sortedMonths.slice(
    Math.max(0, sortedMonths.length - MONTHS_SHOWN - offset),
    sortedMonths.length - offset || undefined,
  );

  const canGoBack = sortedMonths.length > MONTHS_SHOWN + offset;
  const canGoForward = offset > 0;

  const chartData = displayMonths.map((key) => ({
    month: monthLabel(key),
    Income: monthlySummary[key].income,
    Expenses: monthlySummary[key].expenses,
    Net: monthlySummary[key].income - monthlySummary[key].expenses,
  }));

  // Category breakdown across all time
  const allCategoryTotals: Record<string, number> = {};
  for (const t of txns) {
    if (t.type === "expense") {
      allCategoryTotals[t.category] = (allCategoryTotals[t.category] ?? 0) + Number(t.amount);
    }
  }
  const totalExpenses = Object.values(allCategoryTotals).reduce((a, b) => a + b, 0);
  const sortedCategories = Object.entries(allCategoryTotals).sort((a, b) => b[1] - a[1]);

  // Running net worth (cumulative)
  const runningData = useMemo(() => {
    let balance = 0;
    const monthly: Record<string, number> = {};
    for (const t of txns) {
      const key = monthKey(t.transaction_date);
      balance += t.type === "income" ? Number(t.amount) : -Number(t.amount);
      monthly[key] = balance;
    }
    return Object.keys(monthly)
      .sort()
      .map((key) => ({ month: monthLabel(key), Balance: monthly[key] }));
  }, [txns]);

  // Month-over-month change for latest month
  const latestKey = sortedMonths[sortedMonths.length - 1];
  const prevKey = sortedMonths[sortedMonths.length - 2];
  const latestData = latestKey ? monthlySummary[latestKey] : null;
  const prevData = prevKey ? monthlySummary[prevKey] : null;
  const expenseChange = latestData && prevData ? latestData.expenses - prevData.expenses : null;
  const incomeChange = latestData && prevData ? latestData.income - prevData.income : null;

  if (txns.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl">Rewinder</h1>
          <p className="text-sm text-muted-foreground">
            Replay and analyse your financial history month by month.
          </p>
        </div>
        <Card>
          <CardContent className="flex flex-col items-center gap-3 py-16 text-center">
            <RotateCcw className="h-10 w-10 text-muted-foreground" />
            <p className="text-muted-foreground text-sm">No transactions yet. Add some from the Transactions page to rewind your history.</p>
            <Button variant="outline" asChild>
              <a href="/transactions">Go to Transactions</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl">Rewinder</h1>
        <p className="text-sm text-muted-foreground">
          Replay and analyse your financial history — income, expenses, and net worth month by month.
        </p>
      </div>

      {/* MoM change summary */}
      {latestKey && (
        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium text-muted-foreground">
                Income — {monthLabel(latestKey)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold text-emerald-500">{fmt(latestData?.income ?? 0)}</div>
              {incomeChange !== null && (
                <div className={`mt-1 flex items-center gap-1 text-xs ${incomeChange >= 0 ? "text-emerald-500" : "text-rose-500"}`}>
                  {incomeChange >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {fmt(Math.abs(incomeChange))} vs prev month
                </div>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium text-muted-foreground">
                Expenses — {monthLabel(latestKey)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold text-rose-500">{fmt(latestData?.expenses ?? 0)}</div>
              {expenseChange !== null && (
                <div className={`mt-1 flex items-center gap-1 text-xs ${expenseChange <= 0 ? "text-emerald-500" : "text-rose-500"}`}>
                  {expenseChange <= 0 ? <TrendingDown className="h-3 w-3" /> : <TrendingUp className="h-3 w-3" />}
                  {fmt(Math.abs(expenseChange))} vs prev month
                </div>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium text-muted-foreground">
                Net — {monthLabel(latestKey)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-semibold ${(latestData?.income ?? 0) - (latestData?.expenses ?? 0) >= 0 ? "text-foreground" : "text-rose-500"}`}>
                {fmt((latestData?.income ?? 0) - (latestData?.expenses ?? 0))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Tabs defaultValue="monthly">
        <TabsList>
          <TabsTrigger value="monthly">Monthly overview</TabsTrigger>
          <TabsTrigger value="balance">Running balance</TabsTrigger>
          <TabsTrigger value="categories">Category breakdown</TabsTrigger>
        </TabsList>

        {/* Monthly bar chart */}
        <TabsContent value="monthly" className="mt-4 space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Income vs Expenses</CardTitle>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" disabled={!canGoBack} onClick={() => setOffset((o) => o + 1)}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-xs text-muted-foreground px-2">
                  <Calendar className="inline h-3 w-3 mr-1" />
                  Last {MONTHS_SHOWN} months
                </span>
                <Button variant="ghost" size="icon" disabled={!canGoForward} onClick={() => setOffset((o) => o - 1)}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {chartData.length === 0 ? (
                <p className="text-sm text-muted-foreground">Not enough data.</p>
              ) : (
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={chartData} margin={{ top: 4, right: 16, bottom: 0, left: 0 }}>
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
        </TabsContent>

        {/* Running balance */}
        <TabsContent value="balance" className="mt-4">
          <Card>
            <CardHeader><CardTitle>Running balance over time</CardTitle></CardHeader>
            <CardContent>
              {runningData.length < 2 ? (
                <p className="text-sm text-muted-foreground">Need at least 2 months of data to plot.</p>
              ) : (
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart data={runningData} margin={{ top: 4, right: 16, bottom: 0, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} />
                    <YAxis tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                    <Tooltip
                      contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }}
                      formatter={(v: number) => fmt(v)}
                    />
                    <Line type="monotone" dataKey="Balance" stroke="oklch(0.78 0.22 145)" strokeWidth={2} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Category breakdown */}
        <TabsContent value="categories" className="mt-4">
          <Card>
            <CardHeader><CardTitle>All-time expense breakdown by category</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {sortedCategories.length === 0 ? (
                <p className="text-sm text-muted-foreground">No expense data yet.</p>
              ) : (
                sortedCategories.map(([cat, total]) => {
                  const pct = totalExpenses > 0 ? (total / totalExpenses) * 100 : 0;
                  return (
                    <div key={cat} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2">
                          <Badge variant="secondary">{cat}</Badge>
                        </span>
                        <span className="tabular-nums">
                          {fmt(total)} <span className="text-muted-foreground text-xs">({pct.toFixed(1)}%)</span>
                        </span>
                      </div>
                      <Progress value={pct} className="h-1.5" />
                    </div>
                  );
                })
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Monthly detail cards */}
      <div>
        <h2 className="text-xl mb-4">Monthly breakdown</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {[...sortedMonths].reverse().map((key) => {
            const { income, expenses, categories } = monthlySummary[key];
            const net = income - expenses;
            const topCat = Object.entries(categories).sort((a, b) => b[1] - a[1])[0];
            return (
              <Card key={key} className="group relative overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-elegant">
                <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-brand-gradient opacity-0 blur-2xl transition-all duration-300 group-hover:opacity-15" />
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center justify-between">
                    <span>{monthLabel(key)}</span>
                    <span className={`text-base font-medium ${net >= 0 ? "text-emerald-500" : "text-rose-500"}`}>
                      {net >= 0 ? "+" : ""}{fmt(net)}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span className="flex items-center gap-1"><TrendingUp className="h-3 w-3 text-emerald-500" /> Income</span>
                    <span className="text-emerald-500">{fmt(income)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span className="flex items-center gap-1"><TrendingDown className="h-3 w-3 text-rose-500" /> Expenses</span>
                    <span className="text-rose-500">{fmt(expenses)}</span>
                  </div>
                  {topCat && (
                    <div className="pt-1 text-xs text-muted-foreground">
                      Top spend: <span className="text-foreground">{topCat[0]}</span> ({fmt(topCat[1])})
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
