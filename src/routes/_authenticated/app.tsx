import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Wallet, AlertTriangle } from "lucide-react";

export const Route = createFileRoute("/_authenticated/app")({
  head: () => ({ meta: [{ title: "Dashboard — Tactifin" }] }),
  component: Dashboard,
});

function fmt(n: number) {
  return new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(n);
}

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

  const income = txns.filter((t) => t.type === "income").reduce((a, t) => a + Number(t.amount), 0);
  const expenses = txns.filter((t) => t.type === "expense").reduce((a, t) => a + Number(t.amount), 0);
  const haramCount = txns.filter((t) => t.is_haram).length;
  const balance = income - expenses;

  const stats = [
    { label: "Balance", value: fmt(balance), icon: Wallet, accent: "text-foreground" },
    { label: "Income", value: fmt(income), icon: TrendingUp, accent: "text-emerald-500" },
    { label: "Expenses", value: fmt(expenses), icon: TrendingDown, accent: "text-rose-500" },
    { label: "Flagged", value: String(haramCount), icon: AlertTriangle, accent: "text-amber-500" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Your financial overview at a glance.</p>
      </div>

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

      <Card>
        <CardHeader>
          <CardTitle>Recent transactions</CardTitle>
        </CardHeader>
        <CardContent>
          {txns.length === 0 ? (
            <p className="text-sm text-muted-foreground">No transactions yet. Add one from the Transactions page.</p>
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