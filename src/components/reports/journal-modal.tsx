import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "@/lib/local-storage";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface Props { open: boolean; onClose: () => void; }

function fmt(n: number) {
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function JournalModal({ open, onClose }: Props) {
  const { data: txns = [] } = useQuery({ queryKey: ["transactions"], queryFn: getTransactions });
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const filtered = txns
    .filter(t => !from || t.transaction_date >= from)
    .filter(t => !to   || t.transaction_date <= to)
    .slice().sort((a, b) => a.transaction_date.localeCompare(b.transaction_date));

  let runningBalance = 0;
  const entries = filtered.map(t => {
    const debitAcct  = t.type === "income" ? "Cash and cash equivalents" : t.category;
    const creditAcct = t.type === "income" ? t.category : "Cash and cash equivalents";
    runningBalance += t.type === "income" ? t.amount : -t.amount;
    return { ...t, debitAcct, creditAcct, balance: runningBalance };
  });

  const totalDebits  = filtered.reduce((s, t) => s + t.amount, 0);
  const totalCredits = totalDebits;

  return (
    <Dialog open={open} onOpenChange={v => !v && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl">General Journal Ledger</DialogTitle>
        </DialogHeader>

        <div className="flex gap-4 shrink-0">
          <div>
            <Label className="text-xs">From</Label>
            <Input type="date" className="mt-1 h-8 text-xs" value={from} onChange={e => setFrom(e.target.value)} />
          </div>
          <div>
            <Label className="text-xs">To</Label>
            <Input type="date" className="mt-1 h-8 text-xs" value={to} onChange={e => setTo(e.target.value)} />
          </div>
        </div>

        <div className="overflow-auto flex-1 border rounded-lg">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-muted text-muted-foreground">
              <tr>
                <th className="px-3 py-2 text-left font-medium w-28">Date</th>
                <th className="px-3 py-2 text-left font-medium">Account</th>
                <th className="px-3 py-2 text-right font-medium w-28">Debit ($)</th>
                <th className="px-3 py-2 text-right font-medium w-28">Credit ($)</th>
                <th className="px-3 py-2 text-right font-medium w-28">Balance ($)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {entries.length === 0 ? (
                <tr><td colSpan={5} className="px-3 py-8 text-center text-muted-foreground">No transactions in range.</td></tr>
              ) : entries.map((e, i) => (
                <>
                  <tr key={`${e.id}-dr`} className={i % 2 === 0 ? "bg-background" : "bg-muted/20"}>
                    <td className="px-3 py-1.5 text-xs text-muted-foreground" rowSpan={2}>{e.transaction_date}</td>
                    <td className="px-3 py-1.5 flex items-center gap-2">
                      <span className="font-medium">{e.debitAcct}</span>
                      {e.is_haram && <Badge variant="outline" className="text-amber-500 border-amber-500 text-[10px] py-0">⚠ flagged</Badge>}
                    </td>
                    <td className="px-3 py-1.5 text-right tabular-nums font-medium">{fmt(e.amount)}</td>
                    <td className="px-3 py-1.5" />
                    <td className="px-3 py-1.5 text-right tabular-nums text-muted-foreground" rowSpan={2}>
                      <span className={e.balance >= 0 ? "text-emerald-600" : "text-rose-500"}>{fmt(e.balance)}</span>
                    </td>
                  </tr>
                  <tr key={`${e.id}-cr`} className={i % 2 === 0 ? "bg-background" : "bg-muted/20"}>
                    <td className="px-3 py-1.5 pl-8 text-muted-foreground italic">{e.creditAcct}</td>
                    <td className="px-3 py-1.5" />
                    <td className="px-3 py-1.5 text-right tabular-nums text-muted-foreground">{fmt(e.amount)}</td>
                  </tr>
                </>
              ))}
            </tbody>
            {entries.length > 0 && (
              <tfoot className="bg-muted font-semibold">
                <tr>
                  <td className="px-3 py-2 text-xs" colSpan={2}>Totals ({entries.length} entries)</td>
                  <td className="px-3 py-2 text-right tabular-nums">{fmt(totalDebits)}</td>
                  <td className="px-3 py-2 text-right tabular-nums">{fmt(totalCredits)}</td>
                  <td className="px-3 py-2 text-right tabular-nums text-emerald-600">{fmt(entries[entries.length - 1]?.balance ?? 0)}</td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </DialogContent>
    </Dialog>
  );
}
