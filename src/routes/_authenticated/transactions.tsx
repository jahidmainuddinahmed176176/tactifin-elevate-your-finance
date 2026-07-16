import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { getTransactions, addTransaction, updateTransaction, deleteTransaction } from "@/lib/local-storage";
import type { Transaction, TxnType } from "@/lib/local-storage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CATEGORIES, detectHaram, autoCategorize } from "@/lib/haram";
import { toast } from "sonner";
import { Trash2, Pencil } from "lucide-react";

export const Route = createFileRoute("/_authenticated/transactions")({
  head: () => ({ meta: [{ title: "Transactions — Tactifin" }] }),
  component: TransactionsPage,
});

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

  const editTotalNum = Number(editAmount) || 0;
  const editCashNum = Number(editCashAmount) || 0;
  const editCreditNum = editTotalNum > 0 && editCashAmount !== "" ? Math.max(0, editTotalNum - editCashNum) : 0;

  const { data: txns = [] } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => getTransactions(),
  });

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
      if (haram.isHaram) toast.warning(`Flagged: ${haram.reason}`);
      else toast.success("Transaction added");
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["transactions"] });
      setAmount(""); setDescription(""); setCashAmount("");
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Failed"),
  });

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
    setEditCashAmount(t.cash_amount != null ? String(t.cash_amount) : "");
    setEditCategory(t.category);
    setEditDescription(t.description ?? "");
    setEditDate(t.transaction_date);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl">Transactions</h1>
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
              <Label>Total Amount</Label>
              <Input className="mt-1" type="number" step="0.01" min="0" required value={amount} onChange={(e) => setAmount(e.target.value)} />
            </div>
            <div className="md:col-span-1">
              <Label>Cash Amount</Label>
              <Input
                className="mt-1"
                type="number"
                step="0.01"
                min="0"
                max={totalNum || undefined}
                placeholder="0.00"
                value={cashAmount}
                onChange={(e) => setCashAmount(e.target.value)}
              />
            </div>
            <div className="md:col-span-1">
              <Label>Credit Amount <span className="text-xs text-muted-foreground">(auto)</span></Label>
              <Input
                className="mt-1 opacity-70 cursor-not-allowed"
                type="number"
                step="0.01"
                readOnly
                tabIndex={-1}
                value={cashAmount !== "" ? creditNum.toFixed(2) : ""}
                placeholder="= Total − Cash"
              />
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
            <div className="md:col-span-4 flex items-center gap-4 pt-1">
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
                    <div className="text-right">
                      <div className={t.type === "income" ? "text-emerald-500 font-medium" : "text-rose-500 font-medium"}>
                        {t.type === "income" ? "+" : "-"}${t.amount.toFixed(2)}
                      </div>
                      {t.cash_amount != null && (
                        <div className="text-xs text-muted-foreground">
                          Cash ${t.cash_amount.toFixed(2)} | Credit ${(t.credit_amount ?? 0).toFixed(2)}
                        </div>
                      )}
                    </div>
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
              <Select value={editType} onValueChange={(v) => setEditType(v as TxnType)}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="expense">Expense</SelectItem>
                  <SelectItem value="income">Income</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Total Amount</Label>
              <Input className="mt-1" type="number" step="0.01" min="0" required value={editAmount} onChange={(e) => setEditAmount(e.target.value)} />
            </div>
            <div>
              <Label>Cash Amount</Label>
              <Input
                className="mt-1"
                type="number"
                step="0.01"
                min="0"
                max={editTotalNum || undefined}
                placeholder="0.00"
                value={editCashAmount}
                onChange={(e) => setEditCashAmount(e.target.value)}
              />
            </div>
            <div>
              <Label>Credit Amount <span className="text-xs text-muted-foreground">(auto)</span></Label>
              <Input
                className="mt-1 opacity-70 cursor-not-allowed"
                type="number"
                step="0.01"
                readOnly
                tabIndex={-1}
                value={editCashAmount !== "" ? editCreditNum.toFixed(2) : ""}
                placeholder="= Total − Cash"
              />
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
