import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
} from "lucide-react";

export const Route = createFileRoute("/_authenticated/bills")({
  head: () => ({ meta: [{ title: "Bill Pay — Tactifin" }] }),
  component: BillsPage,
});

type BillStatus = "upcoming" | "due-today" | "overdue" | "paid";

interface Bill {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
  category: string;
  recurring: "monthly" | "quarterly" | "annually" | "one-time";
  status: BillStatus;
  autopay: boolean;
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

const today = new Date().toISOString().slice(0, 10);

function getStatus(dueDate: string, paid: boolean): BillStatus {
  if (paid) return "paid";
  if (dueDate < today) return "overdue";
  if (dueDate === today) return "due-today";
  return "upcoming";
}

const DEMO_BILLS: Bill[] = [
  { id: "1", name: "Electricity", amount: 85.5, dueDate: today, category: "Electricity", recurring: "monthly", status: "due-today", autopay: true },
  { id: "2", name: "Internet", amount: 59.99, dueDate: "2026-06-15", category: "Internet", recurring: "monthly", status: "upcoming", autopay: false },
  { id: "3", name: "Rent", amount: 1200, dueDate: "2026-06-01", category: "Rent / Mortgage", recurring: "monthly", status: "overdue", autopay: false },
  { id: "4", name: "Phone", amount: 45, dueDate: "2026-06-20", category: "Phone", recurring: "monthly", status: "upcoming", autopay: true },
  { id: "5", name: "Water", amount: 32.0, dueDate: "2026-05-28", category: "Water", recurring: "monthly", status: "paid", autopay: false },
];

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
  const [bills, setBills] = useState<Bill[]>(DEMO_BILLS);
  const [showForm, setShowForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState<BillStatus | "all">("all");

  // form state
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState(today);
  const [category, setCategory] = useState("Electricity");
  const [recurring, setRecurring] = useState<Bill["recurring"]>("monthly");
  const [autopay, setAutopay] = useState(false);

  function addBill(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !amount || !dueDate) return;
    const bill: Bill = {
      id: Date.now().toString(),
      name,
      amount: Number(amount),
      dueDate,
      category,
      recurring,
      status: getStatus(dueDate, false),
      autopay,
    };
    setBills((prev) => [bill, ...prev]);
    setName(""); setAmount(""); setDueDate(today); setCategory("Electricity"); setRecurring("monthly"); setAutopay(false);
    setShowForm(false);
    toast.success("Bill added");
  }

  function markPaid(id: string) {
    setBills((prev) => prev.map((b) => (b.id === id ? { ...b, status: "paid" as BillStatus } : b)));
    toast.success("Marked as paid");
  }

  function deleteBill(id: string) {
    setBills((prev) => prev.filter((b) => b.id !== id));
    toast.success("Bill removed");
  }

  const filtered = bills.filter((b) => filterStatus === "all" || b.status === filterStatus);

  const totalDue = bills.filter((b) => b.status !== "paid").reduce((a, b) => a + b.amount, 0);
  const overdue = bills.filter((b) => b.status === "overdue");
  const dueToday = bills.filter((b) => b.status === "due-today");
  const autopayCount = bills.filter((b) => b.autopay && b.status !== "paid").length;

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
                <Select value={recurring} onValueChange={(v) => setRecurring(v as Bill["recurring"])}>
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
                <Button type="submit">Save bill</Button>
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
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <p className="text-sm text-muted-foreground">No bills match this filter.</p>
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
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {bill.category} · {bill.recurring} · Due {bill.dueDate}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-lg font-semibold">{fmt(bill.amount)}</span>
                    {bill.status !== "paid" && (
                      <Button size="sm" variant="outline" onClick={() => markPaid(bill.id)}>
                        <CheckCircle className="mr-1 h-3.5 w-3.5 text-emerald-500" /> Mark paid
                      </Button>
                    )}
                    <button
                      onClick={() => deleteBill(bill.id)}
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
    </div>
  );
}
