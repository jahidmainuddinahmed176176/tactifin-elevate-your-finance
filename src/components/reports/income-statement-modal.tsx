import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "@/lib/local-storage";
import { useState, useMemo } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { computeTaxBD } from "@/lib/tax/bd";

interface Props { open: boolean; onClose: () => void; }

function fmt(n: number) {
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function Row({ label, amount, indent = false, bold = false, className = "" }: { label: string; amount?: number; indent?: boolean; bold?: boolean; className?: string }) {
  return (
    <tr className={className}>
      <td className={`py-1 ${indent ? "pl-8" : "pl-3"} pr-3 ${bold ? "font-semibold" : ""} text-sm`}>{label}</td>
      <td className={`py-1 pl-3 pr-3 text-right tabular-nums text-sm ${bold ? "font-semibold" : "text-muted-foreground"} ${amount !== undefined && amount < 0 ? "text-rose-500" : ""}`}>
        {amount !== undefined ? (amount < 0 ? `(${fmt(-amount)})` : fmt(amount)) : ""}
      </td>
    </tr>
  );
}

export function IncomeStatementModal({ open, onClose }: Props) {
  const { data: txns = [] } = useQuery({ queryKey: ["transactions"], queryFn: getTransactions });
  const currentYear  = new Date().getFullYear();
  const currentMonth = String(new Date().getMonth() + 1).padStart(2, "0");
  const [period, setPeriod] = useState("ytd");

  const filtered = useMemo(() => {
    const prefix = period === "ytd"   ? `${currentYear}` :
                   period === "month" ? `${currentYear}-${currentMonth}` : "";
    return txns.filter(t => !prefix || t.transaction_date.startsWith(prefix));
  }, [txns, period, currentYear, currentMonth]);

  const revenues: Record<string, number> = {};
  const expenses: Record<string, number> = {};
  for (const t of filtered) {
    if (t.type === "income")   revenues[t.category] = (revenues[t.category] ?? 0) + t.amount;
    else                       expenses[t.category] = (expenses[t.category] ?? 0) + t.amount;
  }

  const sortedRevenues = Object.entries(revenues).sort((a, b) => b[1] - a[1]);
  const sortedExpenses = Object.entries(expenses).sort((a, b) => b[1] - a[1]);
  const totalRevenue = sortedRevenues.reduce((s, [, v]) => s + v, 0);
  const totalExpenses = sortedExpenses.reduce((s, [, v]) => s + v, 0);
  const grossProfit = totalRevenue - totalExpenses;

  // BD tax toggle (off by default)
  const [applyBDTax, setApplyBDTax] = useState(false);
  const [bdInputs, setBdInputs] = useState({
    employmentIncome: Math.max(0, grossProfit),
    eligibleInvestments: 0,
    disabledChildren: 0,
    vehicles: {},
    netWealth: 0,
    minTaxFloor: 5000,
  });

  function setBdField<K extends keyof typeof bdInputs>(k: K, v: any) {
    setBdInputs((s) => ({ ...s, [k]: v }));
  }

  const bdBreakdown = applyBDTax ? computeTaxBD({
    ay: "AY 2026-27",
    category: "General",
    resident: true,
    employmentIncome: bdInputs.employmentIncome,
    eligibleInvestments: bdInputs.eligibleInvestments,
    disabledChildren: bdInputs.disabledChildren,
    vehicles: bdInputs.vehicles,
    netWealth: bdInputs.netWealth,
    minTaxFloor: bdInputs.minTaxFloor,
  }) : null;

  const tax = bdBreakdown ? bdBreakdown.totalTaxLiability : 0;
  const netIncome = grossProfit - tax;

  const periodLabel =
    period === "month" ? new Date(currentYear, Number(currentMonth) - 1).toLocaleString("default", { month: "long", year: "numeric" }) :
    period === "ytd"   ? `Year ${currentYear} (YTD)` : "All time";

  return (
    <Dialog open={open} onOpenChange={v => !v && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl">Income Statement</DialogTitle>
          <p className="text-sm text-muted-foreground">Statement of Comprehensive Income · {periodLabel}</p>
        </DialogHeader>

        <div className="shrink-0">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-44 h-8 text-xs"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="month">This month</SelectItem>
              <SelectItem value="ytd">Year to date</SelectItem>
              <SelectItem value="all">All time</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="p-3 flex gap-3 items-center">
          <label className="flex items-center gap-2"><input type="checkbox" checked={applyBDTax} onChange={(e) => setApplyBDTax(e.target.checked)} /> Apply Bangladesh tax to profit</label>
          {applyBDTax && (
            <div className="flex gap-3">
              <div>
                <Label>Eligible investments</Label>
                <Input type="number" className="w-36 mt-1" value={bdInputs.eligibleInvestments} onChange={(e) => setBdField("eligibleInvestments", Number(e.target.value))} />
              </div>
              <div>
                <Label>Disabled children</Label>
                <Input type="number" className="w-32 mt-1" value={bdInputs.disabledChildren} onChange={(e) => setBdField("disabledChildren", Number(e.target.value))} />
              </div>
            </div>
          )}
        </div>

        <div className="overflow-auto flex-1 border rounded-lg">
          <table className="w-full">
            <tbody>
              {/* REVENUES */}
              <tr className="bg-muted">
                <td colSpan={2} className="px-3 py-2 font-semibold text-sm uppercase tracking-wide text-muted-foreground">Revenue</td>
              </tr>
              {sortedRevenues.length === 0
                ? <Row label="No revenue recorded" />
                : sortedRevenues.map(([cat, amt]) => <Row key={cat} label={cat} amount={amt} indent />)}
              <Row label="Total revenue" amount={totalRevenue} bold className="border-t-2 border-border bg-emerald-500/5" />

              {/* EXPENSES */}
              <tr className="bg-muted">
                <td colSpan={2} className="px-3 py-2 font-semibold text-sm uppercase tracking-wide text-muted-foreground">Expenses</td>
              </tr>
              {sortedExpenses.length === 0
                ? <Row label="No expenses recorded" />
                : sortedExpenses.map(([cat, amt]) => <Row key={cat} label={cat} amount={amt} indent />)}
              <Row label="Total expenses" amount={totalExpenses} bold className="border-t-2 border-border bg-rose-500/5" />

              {/* RESULT */}
              <tr className="bg-muted">
                <td colSpan={2} className="px-3 py-2 font-semibold text-sm uppercase tracking-wide text-muted-foreground">Result</td>
              </tr>
              <Row label="Gross profit / (loss)" amount={grossProfit} bold indent />

              {bdBreakdown && (
                <>
                  <tr className="bg-muted"><td colSpan={2} className="px-3 py-2 font-semibold text-sm uppercase tracking-wide text-muted-foreground">Bangladesh tax (summary)</td></tr>
                  <Row label="Slab-taxable income" amount={bdBreakdown.slabTaxable} indent />
                  <Row label="Slab tax" amount={bdBreakdown.slabTax} indent />
                  <Row label="Investment credit" amount={-bdBreakdown.investmentCredit} indent />
                  <Row label="Tax after credit" amount={bdBreakdown.taxAfterCredit} indent />
                  <Row label="Total tax liability" amount={bdBreakdown.totalTaxLiability} indent bold />
                </>
              )}

              <tr className="border-t-2 border-border">
                <td className="pl-3 pr-3 py-2 font-bold text-base">
                  {netIncome >= 0 ? "Net income for the period" : "Net loss for the period"}
                </td>
                <td className={`pl-3 pr-3 py-2 text-right tabular-nums font-bold text-base ${netIncome >= 0 ? "text-emerald-600" : "text-rose-500"}`}>
                  {netIncome < 0 ? `(${fmt(-netIncome)})` : fmt(netIncome)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </DialogContent>
    </Dialog>
  );
}
