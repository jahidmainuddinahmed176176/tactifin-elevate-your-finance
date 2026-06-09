import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { CATEGORIES, detectHaram } from "@/lib/haram";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

export const Route = createFileRoute("/_authenticated/transactions")({
  head: () => ({ meta: [{ title: "Transactions — Tactifin" }] }),
  component: TransactionsPage,
});

function TransactionsPage() {
  const qc = useQueryClient();
  const [type, setType] = useState<"income" | "expense">("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<string>("Food");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  const { data: txns = [] } = useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const { data, error } = await supabase.from("transactions").select("*").order("transaction_date", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const add = useMutation({
    mutationFn: async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) throw new Error("Not signed in");
      const haram = detectHaram(`${category} ${description}`);
      const { error } = await supabase.from("transactions").insert({
        user_id: u.user.id,
        type,
        amount: Number(amount),
        category,
        description,
        transaction_date: date,
        is_haram: haram.isHaram,
        haram_reason: haram.reason ?? null,
      });
      if (error) throw error;
      if (haram.isHaram) toast.warning(`Flagged: ${haram.reason}`);
      else toast.success("Transaction added");
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["transactions"] });
      setAmount("");
      setDescription("");
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Failed"),
  });

  const del = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("transactions").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["transactions"] }),
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl">Transactions</h1>
        <p className="text-sm text-muted-foreground">Record income and expenses. Categories: Food, Rent, Business, Taxi and more.</p>
      </div>

      <Card>
        <CardHeader><CardTitle>Add transaction</CardTitle></CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => { e.preventDefault(); add.mutate(); }}
            className="grid gap-4 md:grid-cols-6"
          >
            <div className="md:col-span-1">
              <Label>Type</Label>
              <Select value={type} onValueChange={(v) => setType(v as "income" | "expense")}>
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
            <div className="md:col-span-1">
              <Label>Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-2">
              <Label>Description</Label>
              <Input className="mt-1" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="e.g. Grocery shopping" />
            </div>
            <div className="md:col-span-1">
              <Label>Date</Label>
              <Input className="mt-1" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div className="md:col-span-6">
              <Button type="submit" disabled={add.isPending}>{add.isPending ? "Adding..." : "Add transaction"}</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>All transactions</CardTitle></CardHeader>
        <CardContent>
          {txns.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nothing yet.</p>
          ) : (
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
                  <div className="flex items-center gap-3 shrink-0">
                    <span className={t.type === "income" ? "text-emerald-500" : "text-rose-500"}>
                      {t.type === "income" ? "+" : "-"}${Number(t.amount).toFixed(2)}
                    </span>
                    <button onClick={() => del.mutate(t.id)} className="text-muted-foreground hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </button>
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