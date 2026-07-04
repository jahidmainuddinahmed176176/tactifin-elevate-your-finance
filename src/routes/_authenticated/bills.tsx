import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getBills, addBill, updateBill, deleteBill } from "@/lib/local-storage";
import type { Bill } from "@/lib/local-storage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Zap, Wifi, Droplets, Home, Phone, CreditCard, Plus, Trash2, CheckCircle, AlertCircle, Clock, Loader2 } from "lucide-react";

export const Route = createFileRoute("/_authenticated/bills")({
  head: () => ({ meta: [{ title: "Bill Pay — Tactifin" }] }),
  component: BillsPage,
});

type BillStatus = "upcoming" | "due-today" | "overdue" | "paid";
type PaymentMethod = "bkash" | "cash_on_delivery" | "other";

const BILL_CATEGORIES = [
  { label: "Electricity", icon: Zap },
  { label: "Internet", icon: Wifi },
  { label: "Water", icon: Droplets },
  { label: "Rent / Mortgage", icon: Home },
  { label: "Phone", icon: Phone },
  { label: "Credit Card", icon: CreditCard },
  { label: "Other", icon: CreditCard },
] as const;

const RECURRINGS = ["monthly", "quarterly", "annually", "one-time"] as const;

const PAYMENT_METHODS: { value: PaymentMethod; label: string }[] = [
  { value: "bkash", label: "bKash" },
  { value: "cash_on_delivery", label: "Cash on Delivery" },
  { value: "other", label: "Other" },
];

const today = new Date().toISOString().slice(0, 10);

function getStatus(dueDate: string, paid: boolean): BillStatus {
  if (paid) return "paid";
  if (dueDate < today) return "overdue";
  if (dueDate === today) return "due-today";
  return "upcoming";
}

const STATUS_CONFIG: Record<BillStatus, { label: string; color: string; icon: React.ElementType }> = {
  "due-today": { label: "Due today", color: "text-amber-500 bg-amber-500/10 border-amber-500/30", icon: AlertCircle },
  overdue: { label: "Overdue", color: "text-rose-500 bg-rose-500/10 border-rose-500/30", icon: AlertCircle },
  upcoming: { label: "Upcoming", color: "text-muted-foreground bg-muted border-border", icon: Clock },
  paid: { label: "Paid", color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/30", icon: CheckCircle },
};

function getCategoryIcon(category: string) {
  return BILL_CATEGORIES.find((c) => c.label === category)?.icon ?? CreditCard;
}

function fmt(n: number) {
  return new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(n);
}

export default function BillsPage() {
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

  const { data: bills = [] } = useQuery<Bill[]>({
    queryKey: ["bills"],
    queryFn: () => getBills(),
  });

  const addMutation = useMutation({
    mutationFn: () => {
      addBill({ name, amount: Number(amount), due_date: dueDate, category, recurring, paid: false, autopay, payment_method: null });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["bills"] });
      setName(""); setAmount(""); setDueDate(today); setCategory("Electricity");
      setRecurring("monthly"); setAutopay(false); setShowForm(false);
      toast.success("Bill added");
    },
    onError: () => toast.error("Failed to add bill"),
  });

  const markPaidMutation = useMutation({
    mutationFn: ({ id, method }: { id: string; method: PaymentMethod }) => {
      updateBill(id, { paid: true, payment_method: method });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["bills"] });
      setPayingBillId(null);
      toast.success("Marked as paid");
    },
    onError: () => toast.error("Failed to update bill"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => { deleteBill(id); },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["bills"] });
      toast.success("Bill removed");
    },
    onError: () => toast.error("Failed to delete bill"),
  });

  function handleAddBill(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !amount || !dueDate) return;
    addMutation.mutate();
  }

  const billsWithStatus = bills.map((b) => ({ ...b, status: getStatus(b.due_date, b.paid) }));
  const filtered = billsWithStatus.filter((b) => filterStatus === "all" || b.status === filterStatus);
  const totalDue = billsWithStatus.filter((b) => b.status !== "paid").reduce((a, b) => a + b.amount, 0);
  const overdue = billsWithStatus.filter((b) => b.status === "overdue");
  const dueToday = billsWithStatus.filter((b) => b.status === "due-today");
  const autopayCount = billsWithStatus.filter((b) => b.autopay && b.status !== "paid").length;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl">Bill Pay</h1>
          <p className="text-sm text-muted-foreground">Track, schedule and manage all your recurring bills.</p>
        </div>
        <Button onClick={() => setShowForm((s) => !s)}>
          <Plus className="mr-1.5 h-4 w-4" /> Add bill
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-xs font-medium text-muted-foreground">Total outstanding</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-semibold">{fmt(totalDue)}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-xs font-medium text-muted-foreground">Overdue</CardTitle></CardHeader>
          <CardContent><div className={`text-2xl font-semibold ${overdue.length > 0 ? "text-rose-500" : ""}`}>{overdue.length} bill{overdue.length !== 1 ? "s" : ""}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-xs font-medium text-muted-foreground">Due today</CardTitle></CardHeader>
          <CardContent><div className={`text-2xl font-semibold ${dueToday.length > 0 ? "text-amber-500" : ""}`}>{dueToday.length} bill{dueToday.length !== 1 ? "s" : ""}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-xs font-medium text-muted-foreground">Autopay active</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-semibold text-emerald-500">{autopayCount}</div></CardContent>
        </Card>
      </div>

      {showForm && (
        <Card>
          <CardHeader><CardTitle>Add a bill</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={handleAddBill} className="grid gap-4 md:grid-cols-3">
              <div>
                <Label>Bill name</Label>
                <Input className="mt-1" required value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Netflix" />
              </div>
              <div>
                <Label>Amount</Label>
                <Input className="mt-1" type="number" step="0.01" min="0.01" required value={amount} onChange={(e) => setAmount(e.target.value)} />
              </div>
              <div>
                <Label>Due date</Label>
                <Input className="mt-1" type="date" required value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
              </div>
              <div>
                <Label>Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>{BILL_CATEGORIES.map((c) => <SelectItem key={c.label} value={c.label}>{c.label}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label>Recurring</Label>
                <Select value={recurring} onValueChange={setRecurring}>
                  <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>{RECURRINGS.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="flex items-end gap-3">
                <div className="flex items-center gap-2 mb-0.5">
                  <input type="checkbox" id="autopay" checked={autopay} onChange={(e) => setAutopay(e.target.checked)} className="h-4 w-4 accent-foreground" />
                  <Label htmlFor="autopay" className="cursor-pointer">Autopay enabled</Label>
                </div>
              </div>
              <div className="md:col-span-3 flex gap-2">
                <Button type="submit" disabled={addMutation.isPending}>
                  {addMutation.isPending && <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />}
                  Save bill
                </Button>
                <Button type="button" variant="ghost" onClick={() => setShowForm(false)}>Cancel</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="flex gap-2 flex-wrap">
        {(["all", "overdue", "due-today", "upcoming", "paid"] as const).map((s) => (
          <Button key={s} size="sm" variant={filterStatus === s ? "default" : "outline"} onClick={() => setFilterStatus(s)}>
            {s === "all" ? "All" : s === "due-today" ? "Due today" : s.charAt(0).toUpperCase() + s.slice(1)}
          </Button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((b) => {
          const Icon = getCategoryIcon(b.category);
          const sc = STATUS_CONFIG[b.status];
          const StatusIcon = sc.icon;
          return (
            <Card key={b.id} className={`border ${b.status === "overdue" ? "border-rose-500/30" : b.status === "due-today" ? "border-amber-500/30" : ""}`}>
              <CardContent className="pt-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-muted p-2 mt-0.5">
                      <Icon className="h-4 w-4 text-muted-foreground" />
                    </div>
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
                    <Badge variant="outline" className={`mt-1 text-xs ${sc.color}`}>
                      <StatusIcon className="h-3 w-3 mr-1" />{sc.label}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  {b.status !== "paid" && (
                    <Button size="sm" onClick={() => { setPayingBillId(b.id); setPaymentMethod("bkash"); }}>
                      Mark paid
                    </Button>
                  )}
                  <Button size="sm" variant="ghost" onClick={() => deleteMutation.mutate(b.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
        {filtered.length === 0 && <p className="text-sm text-muted-foreground">No bills found.</p>}
      </div>

      <Dialog open={!!payingBillId} onOpenChange={(open) => { if (!open) setPayingBillId(null); }}>
        <DialogContent className="max-w-sm">
          <DialogHeader><DialogTitle>Mark as paid</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Payment method</Label>
              <Select value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as PaymentMethod)}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {PAYMENT_METHODS.map((m) => <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setPayingBillId(null)}>Cancel</Button>
              <Button disabled={markPaidMutation.isPending} onClick={() => payingBillId && markPaidMutation.mutate({ id: payingBillId, method: paymentMethod })}>
                {markPaidMutation.isPending && <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />}
                Confirm
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
