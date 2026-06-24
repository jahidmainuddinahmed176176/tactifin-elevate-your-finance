import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { getTransactions, addTransaction, updateTransaction, deleteTransaction } from "@/lib/local-storage";
import type { Transaction } from "@/lib/local-storage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CATEGORIES, detectHaram } from "@/lib/haram";
import { toast } from "sonner";
import { Trash2, Pencil } from "lucide-react";

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

  const [editTxn, setEditTxn] = useState<Transaction | null>(null);
  const [editType, setEditType] = useState<"income" | "expense">("expense");
  const [editAmount, setEditAmount] = useState("");
  const [editCategory, setEditCategory] = useState("Food");
  const [editDescription, setEditDescription] = useState("");
  const [editDate, setEditDate] = useState("");

  const { data: txns = [] } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => getTransactions(),
  });

  const add = useMutation({
    mutationFn: () => {
      const haram = detectHaram(`${category} ${description}`);
      addTransaction({ type, amount: Number(amount), category, description, transaction_date: date, is_haram: haram.isHaram, haram_reason: haram.reason ?? null });
      if (haram.isHaram) toast.warning(`Flagged: ${haram.reason}`);
      else toast.success("Transaction added");
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["transactions"] });
      setAmount(""); setDescription("");
    },
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
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["transactions"] });
      setEditTxn(null);
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Failed"),
  });

  const del = useMutation({
    mutationFn: (id: string) => { deleteTransaction(id); },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["transactions"] }),
  });

  function openEdit(t: Transaction) {
    setEditTxn(t);
    setEditType(t.type);
    setEditAmount(String(t.amount));
    setEditCategory(t.category);
    setEditDescription(t.description ?? "");
    setEditDate(t.transaction_date);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl">Transactions</h1>
        <p className="text-sm text-muted-foreground">Record income and expenses. Data saved to your device only.</p>
      </div>

      <Card>
        <CardHeader><CardTitle>Add transaction</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={(e) => { e.preventDefault(); add.mutate(); }} className="grid gap-4 md:grid-cols-6">
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
                <SelectContent>{CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
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
        <CardHeader><CardTitle>All transactions ({txns.length})</CardTitle></CardHeader>
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
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={t.type === "income" ? "text-emerald-500" : "text-rose-500"}>
                      {t.type === "income" ? "+" : "-"}${t.amount.toFixed(2)}
                    </span>
                    <button onClick={() => openEdit(t)} className="text-muted-foreground hover:text-foreground" title="Edit">
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button onClick={() => del.mutate(t.id)} className="text-muted-foreground hover:text-destructive" title="Delete">
                      <Trash2 className="h-4 w-4" />
                    </button>
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
              <Select value={editType} onValueChange={(v) => setEditType(v as "income" | "expense")}>
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
