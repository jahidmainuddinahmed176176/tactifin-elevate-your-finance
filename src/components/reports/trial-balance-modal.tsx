import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "@/lib/local-storage";

interface Props { open: boolean; onClose: () => void; }

function fmt(n: number) {
  return n === 0 ? "—" : n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function TrialBalanceModal({ open, onClose }: Props) {
  const { data: txns = [] } = useQuery({ queryKey: ["transactions"], queryFn: getTransactions });

  // Build account balances (double-entry)
  const accounts: Record<string, { debit: number; credit: number; type: "asset" | "revenue" | "expense" }> = {};

  function addEntry(acct: string, side: "debit" | "credit", amount: number, type: "asset" | "revenue" | "expense") {
    if (!accounts[acct]) accounts[acct] = { debit: 0, credit: 0, type };
    accounts[acct][side] += amount;
  }

  for (const t of txns) {
    if (t.type === "income") {
      addEntry("Cash and cash equivalents", "debit",  t.amount, "asset");
      addEntry(t.category,                  "credit", t.amount, "revenue");
    } else {
      addEntry(t.category,                  "debit",  t.amount, "expense");
      addEntry("Cash and cash equivalents", "credit", t.amount, "asset");
    }
  }

  const rows = Object.entries(accounts).map(([name, v]) => {
    const netDebit  = v.debit  > v.credit ? v.debit  - v.credit : 0;
    const netCredit = v.credit > v.debit  ? v.credit - v.debit  : 0;
    return { name, type: v.type, netDebit, netCredit };
  }).sort((a, b) => {
    const order = { asset: 0, expense: 1, revenue: 2 };
    return (order[a.type] - order[b.type]) || a.name.localeCompare(b.name);
  });

  const totalDebit  = rows.reduce((s, r) => s + r.netDebit,  0);
  const totalCredit = rows.reduce((s, r) => s + r.netCredit, 0);
  const balanced = Math.abs(totalDebit - totalCredit) < 0.01;
  const today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  return (
    <Dialog open={open} onOpenChange={v => !v && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl">Trial Balance</DialogTitle>
          <p className="text-sm text-muted-foreground">As at {today}</p>
        </DialogHeader>

        <div className="overflow-auto flex-1 border rounded-lg">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-muted text-muted-foreground">
              <tr>
                <th className="px-4 py-2 text-left font-medium">Account</th>
                <th className="px-4 py-2 text-center font-medium w-16 text-xs">Type</th>
                <th className="px-4 py-2 text-right font-medium w-32">Debit ($)</th>
                <th className="px-4 py-2 text-right font-medium w-32">Credit ($)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.length === 0 ? (
                <tr><td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">No transactions yet.</td></tr>
              ) : rows.map((r, i) => (
                <tr key={r.name} className={i % 2 === 0 ? "bg-background" : "bg-muted/20"}>
                  <td className="px-4 py-2">{r.name}</td>
                  <td className="px-4 py-2 text-center">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium uppercase tracking-wide ${
                      r.type === "revenue" ? "bg-emerald-500/10 text-emerald-600" :
                      r.type === "expense" ? "bg-rose-500/10 text-rose-600" :
                      "bg-blue-500/10 text-blue-600"
                    }`}>{r.type}</span>
                  </td>
                  <td className="px-4 py-2 text-right tabular-nums">{fmt(r.netDebit)}</td>
                  <td className="px-4 py-2 text-right tabular-nums">{fmt(r.netCredit)}</td>
                </tr>
              ))}
            </tbody>
            {rows.length > 0 && (
              <tfoot className="bg-muted">
                <tr>
                  <td className="px-4 py-2 font-bold" colSpan={2}>Totals</td>
                  <td className="px-4 py-2 text-right font-bold tabular-nums">{fmt(totalDebit)}</td>
                  <td className="px-4 py-2 text-right font-bold tabular-nums">{fmt(totalCredit)}</td>
                </tr>
                <tr>
                  <td colSpan={4} className="px-4 py-1.5 text-xs text-center">
                    {balanced
                      ? <span className="text-emerald-600 font-medium">✓ Trial balance agrees — debits equal credits</span>
                      : <span className="text-rose-500 font-medium">⚠ Difference of ${fmt(Math.abs(totalDebit - totalCredit))} — check entries</span>}
                  </td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </DialogContent>
    </Dialog>
  );
}
