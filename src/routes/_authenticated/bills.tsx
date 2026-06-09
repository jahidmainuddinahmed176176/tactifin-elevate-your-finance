import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import {
  Zap,
  Wifi,
  Droplets,
  Home,
  Phone,
  CreditCard,
  Plus,
  Trash2,
  CheckCircle,
  AlertCircle,
  Clock,
  Loader2,
} from "lucide-react";

export const Route = createFileRoute("/_authenticated/bills")({
  head: () => ({ meta: [{ title: "Bill Pay — Tactifin" }] }),
  component: BillsPage,
});

type BillStatus = "upcoming" | "due-today" | "overdue" | "paid";
type PaymentMethod = "bkash" | "cash_on_delivery" | "other";

interface BillRow {
  id: string;
  user_id: string;
  name: string;
  amount: number;
  due_date: string;
  category: string;
  recurring: string;
  paid: boolean;
  autopay: boolean;
  payment_method: string | null;
  created_at: string;
}

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

const PAYMENT_METHOD_LABELS: Record<string, string> = {
  bkash: "bKash",
  cash_on_delivery: "Cash on Delivery",
  other: "Other",
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

  // Pay dialog state
  const [payingBillId, setPayingBillId] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("bkash");

  // Form state
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState(today);
  const [category, setCategory] = useState("Electricity");
  const [recurring, setRecurring] = useState<string>("monthly");
  const [autopay, setAutopay] = useState(false);

  // Fetch bills
  const { data: bills = [], isLoading } = useQuery<BillRow[]>({
    queryKey: ["bills"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("bills")
        .select("*")
        .order("due_date", { ascending: true });
      if (error) throw error;
      return data ?? [];
    },
  });

  // Add bill
  const addMutation = useMutation({
    mutationFn: async (bill: Omit<BillRow, "id" | "created_at">) => {
      const { error } = await supabase.from("bills").insert(bill);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["bills"] });
      setName(""); setAmount(""); setDueDate(today); setCategory("Electricity");
      setRecurring("monthly"); setAutopay(false);
      setShowForm(false);
      toast.success("Bill added");
    },
    onError: () => toast.error("Failed to add bill"),
  });

  // Mark paid
  const markPaidMutation = useMutation({
    mutationFn: async ({ id, method }: { id: string; method: PaymentMethod }) => {
      const { error } = await supabase
        .from("bills")
        .update({ paid: true, payment_method: method })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["bills"] });
      setPayingBillId(null);
      toast.success("Marked as paid");
    },
    onError: () => toast.error("Failed to update bill"),
  });

  // Delete bill
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("bills").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["bills"] });
      toast.success("Bill removed");
    },
    onError: () => toast.error("Failed to delete bill"),
  });

  async function addBill(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !amount || !dueDate) return;
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    addMutation.mutate({
      user_id: user.id,
      name,
      amount: Number(amount),
      due_date: dueDate,
      category,
      recurring,
      paid: false,
      autopay,
      payment_method: null,
    });
  }

  function openPayDialog(id: string) {
    setPayingBillId(id);
    setPaymentMethod("bkash");
  }

  function confirmPay() {
    if (!payingBillId) return;
    markPaidMutation.mutate({ id: payingBillId, method: paymentMethod });
  }

  // Derive status from DB fields
  const billsWithStatus = bills.map((b) => ({
    ...b,
    status: getStatus(b.due_date, b.paid),
  }));

  const filtered = billsWithStatus.filter((b) => filterStatus === "all" || b.status === filterStatus);

  const totalDue = billsWithStatus.filter((b) => b.status !== "paid").reduce((a, b) => a + Number(b.amount), 0);
  const overdue = billsWithStatus.filter((b) => b.status === "overdue");
  const dueToday = billsWithStatus.filter((b) => b.status === "due-today");
  const autopayCount = billsWithStatus.filter((b) => b.autopay && b.status !== "paid").length;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl">Bill Pay</h1>
          <p className="text-sm text-muted-foreground">Track, schedule and manage all your recurring bills in one place.</p>
        </div>
        <Button onClick={() => setShowForm((s) => !s)}>
          <Plus className="mr-1.5 h-4 w-4" /> Add bill
        </Button>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">Total outstanding</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-foreground">{fmt(totalDue)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">Overdue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-semibold ${overdue.length > 0 ? "text-rose-500" : "text-foreground"}`}>
              {overdue.length} bill{overdue.length !== 1 ? "s" : ""}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">Due today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-semibold ${dueToday.length > 0 ? "text-amber-500" : "text-foreground"}`}>
              {dueToday.length} bill{dueToday.length !== 1 ? "s" : ""}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">Autopay active</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-emerald-500">{autopayCount}</div>
          </CardContent>
        </Card>
      </div>

      {/* Add bill form */}
      {showForm && (
        <Card>
          <CardHeader><CardTitle>Add a bill</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={addBill} className="grid gap-4 md:grid-cols-3">
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
                  <SelectContent>
                    {BILL_CATEGORIES.map((c) => <SelectItem key={c.label} value={c.label}>{c.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Recurring</Label>
                <Select value={recurring} onValueChange={setRecurring}>
                  <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {RECURRINGS.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end gap-3">
                <div className="flex items-center gap-2 mb-0.5">
                  <input
                    type="checkbox"
                    id="autopay"
                    checked={autopay}
                    onChange={(e) => setAutopay(e.target.checked)}
                    className="h-4 w-4 accent-foreground"
                  />
                  <Label htmlFor="autopay" className="cursor-pointer">Autopay enabled</Label>
                </div>
              </div>
              <div className="md:col-span-3 flex gap-2">
                <Button type="submit" disabled={addMutation.isPending}>
                  {addMutation.isPending && <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />}
                  Save bill
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Filter */}
      <div className="flex flex-wrap gap-2">
        {(["all", "due-today", "overdue", "upcoming", "paid"] as const).map((s) => (
          <Button
            key={s}
            size="sm"
            variant={filterStatus === s ? "default" : "outline"}
            onClick={() => setFilterStatus(s)}
            className="rounded-full capitalize"
          >
            {s === "all" ? "All" : STATUS_CONFIG[s]?.label ?? s}
          </Button>
        ))}
      </div>

      {/* Bills list */}
      {isLoading ? (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading bills…
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              {bills.length === 0 ? "No bills yet. Add one to get started." : "No bills match this filter."}
            </p>
          ) : (
            filtered.map((bill) => {
              const Icon = getCategoryIcon(bill.category);
              const statusCfg = STATUS_CONFIG[bill.status];
              const StatusIcon = statusCfg.icon;
              return (
                <Card key={bill.id} className="group">
                  <CardContent className="flex items-center justify-between gap-4 pt-4 pb-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="h-10 w-10 shrink-0 rounded-xl border border-border/60 bg-[color:var(--surface-elevated)] flex items-center justify-center">
                        <Icon className="h-4 w-4 text-[color:var(--brand-bolt)]" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-medium">{bill.name}</span>
                          <Badge variant="outline" className={`text-[10px] border ${statusCfg.color}`}>
                            <StatusIcon className="mr-1 h-2.5 w-2.5" />
                            {statusCfg.label}
                          </Badge>
                          {bill.autopay && (
                            <Badge variant="secondary" className="text-[10px]">Autopay</Badge>
                          )}
                          {bill.payment_method && bill.paid && (
                            <Badge variant="secondary" className="text-[10px]">
                              {PAYMENT_METHOD_LABELS[bill.payment_method] ?? bill.payment_method}
                            </Badge>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {bill.category} · {bill.recurring} · Due {bill.due_date}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-lg font-semibold">{fmt(Number(bill.amount))}</span>
                      {bill.status !== "paid" && (
                        <Button size="sm" variant="outline" onClick={() => openPayDialog(bill.id)}>
                          <CheckCircle className="mr-1 h-3.5 w-3.5 text-emerald-500" /> Mark paid
                        </Button>
                      )}
                      <button
                        onClick={() => deleteMutation.mutate(bill.id)}
                        disabled={deleteMutation.isPending}
                        className="text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      )}

      {/* Pay dialog — select payment method */}
      <Dialog open={!!payingBillId} onOpenChange={(open) => { if (!open) setPayingBillId(null); }}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Select payment method</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="grid gap-2">
              {PAYMENT_METHODS.map((pm) => (
                <button
                  key={pm.value}
                  type="button"
                  onClick={() => setPaymentMethod(pm.value)}
                  className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm transition-colors ${
                    paymentMethod === pm.value
                      ? "border-[color:var(--brand-bolt)] bg-[color:var(--brand-bolt)]/10 text-foreground"
                      : "border-border bg-card text-muted-foreground hover:border-border/80 hover:text-foreground"
                  }`}
                >
                  <div className={`h-3.5 w-3.5 rounded-full border-2 shrink-0 ${
                    paymentMethod === pm.value ? "border-[color:var(--brand-bolt)] bg-[color:var(--brand-bolt)]" : "border-muted-foreground"
                  }`} />
                  {pm.label}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <Button
                className="flex-1"
                onClick={confirmPay}
                disabled={markPaidMutation.isPending}
              >
                {markPaidMutation.isPending && <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />}
                Confirm payment
              </Button>
              <Button variant="outline" onClick={() => setPayingBillId(null)}>Cancel</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
