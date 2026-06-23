import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CATEGORIES } from "@/lib/haram";
import { toast } from "sonner";
import { Trash2, AlertTriangle } from "lucide-react";

export const Route = createFileRoute("/_authenticated/budgets")({
  head: () => ({ meta: [{ title: "Budgets — Tactifin" }] }),
  component: BudgetsPage,
});

function BudgetsPage() {
  const qc = useQueryClient();
  const [category, setCategory] = useState<string>("Food");
  const [limit, setLimit] = useState("");

  const { data: budgets = [] } = useQuery({
    queryKey: ["budgets"],
    queryFn: async () => {
      const { data, error } = await supabase.from("budgets").select("*").order("category");
      if (error) throw error;
      return data;
    },
  });

  const { data: txns = [] } = useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const { data, error } = await supabase.from("transactions").select("category,amount,type,transaction_date");
      if (error) throw error;
      return data;
    },
  });

  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().slice(0, 10);
  const spentBy: Record<string, number> = {};
  for (const t of txns) {
    if (t.type !== "expense" || t.transaction_date < monthStart) continue;
    spentBy[t.category] = (spentBy[t.category] ?? 0) + Number(t.amount);
  }

  const add = useMutation({
    mutationFn: async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) throw new Error("Not signed in");
      const { error } = await supabase.from("budgets").upsert(
        { user_id: u.user.id, category, monthly_limit: Number(limit) },
        { onConflict: "user_id,category" },
      );
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["budgets"] });
      setLimit("");
      toast.success("Budget saved");
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Failed"),
  });

  const del = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("budgets").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["budgets"] }),
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl">Budgets</h1>
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
          const limit = Number(b.monthly_limit);
          const pct = Math.min(100, (spent / limit) * 100);
          const over = spent > limit;
          const near = spent > limit * 0.8 && !over;
          return (
            <Card key={b.id}>
              <CardHeader className="flex flex-row items-start justify-between">
                <div>
                  <CardTitle>{b.category}</CardTitle>
                  <p className="mt-1 text-xs text-muted-foreground">${spent.toFixed(2)} of ${limit.toFixed(2)} this month</p>
                </div>
                <button onClick={() => del.mutate(b.id)} className="text-muted-foreground hover:text-destructive">
                  <Trash2 className="h-4 w-4" />
                </button>
              </CardHeader>
              <CardContent className="space-y-2">
                <Progress value={pct} />
                {over && (
                  <div className="flex items-center gap-2 text-sm text-rose-500">
                    <AlertTriangle className="h-4 w-4" /> Over budget by ${(spent - limit).toFixed(2)}
                  </div>
                )}
                {near && (
                  <div className="flex items-center gap-2 text-sm text-amber-500">
                    <AlertTriangle className="h-4 w-4" /> Approaching limit
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
        {budgets.length === 0 && <p className="text-sm text-muted-foreground">No budgets yet.</p>}
      </div>
    </div>
  );
}