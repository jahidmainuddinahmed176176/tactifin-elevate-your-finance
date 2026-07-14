import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getTransactions, getBSLineItems, updateBSLineItem, resetBSLineItems } from "@/lib/local-storage";
import type { BSLineItem } from "@/lib/local-storage";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RotateCcw } from "lucide-react";

interface Props { open: boolean; onClose: () => void; }

function fmt(n: number) {
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

const SECTION_LABELS: Record<BSLineItem["section"], string> = {
  nca: "Non-current assets",
  ca:  "Current assets",
  ncl: "Non-current liabilities",
  cl:  "Current liabilities",
  equity: "Equity",
};

function SectionHeader({ label }: { label: string }) {
  return (
    <tr className="bg-muted">
      <td colSpan={2} className="px-3 py-2 font-semibold text-xs uppercase tracking-wide text-muted-foreground">{label}</td>
    </tr>
  );
}

function SubtotalRow({ label, amount, isTotal = false }: { label: string; amount: number; isTotal?: boolean }) {
  return (
    <tr className={`border-t border-border ${isTotal ? "bg-muted/60" : "bg-muted/30"}`}>
      <td className={`px-3 py-1.5 text-sm ${isTotal ? "font-bold" : "font-semibold pl-3"}`}>{label}</td>
      <td className={`px-3 py-1.5 text-right tabular-nums text-sm ${isTotal ? "font-bold" : "font-semibold"} ${amount < 0 ? "text-rose-500" : ""}`}>
        {amount < 0 ? `(${fmt(-amount)})` : fmt(amount)}
      </td>
    </tr>
  );
}

export function BalanceSheetModal({ open, onClose }: Props) {
  const qc = useQueryClient();
  const { data: txns = [] } = useQuery({ queryKey: ["transactions"],   queryFn: getTransactions });
  const { data: items = [] } = useQuery({ queryKey: ["bs_line_items"], queryFn: getBSLineItems });
  const [editing, setEditing] = useState<Record<string, string>>({});

  const cashFromTxns = useMemo(() =>
    txns.reduce((s, t) => s + (t.type === "income" ? t.amount : -t.amount), 0),
    [txns]);

  function val(item: BSLineItem): number {
    if (item.auto) return cashFromTxns;
    return item.amount;
  }

  function handleChange(id: string, raw: string) {
    setEditing(prev => ({ ...prev, [id]: raw }));
  }

  function handleBlur(item: BSLineItem) {
    const raw = editing[item.id];
    if (raw === undefined) return;
    const amount = parseFloat(raw) || 0;
    updateBSLineItem(item.id, amount);
    qc.invalidateQueries({ queryKey: ["bs_line_items"] });
    setEditing(prev => { const n = { ...prev }; delete n[item.id]; return n; });
  }

  function handleReset() {
    if (!confirm("Reset all values to zero?")) return;
    resetBSLineItems();
    qc.invalidateQueries({ queryKey: ["bs_line_items"] });
  }

  const get = (section: BSLineItem["section"]) => items.filter(i => i.section === section);
  const sum = (section: BSLineItem["section"]) => get(section).reduce((s, i) => s + val(i), 0);

  const totalNCA = sum("nca");
  const totalCA  = sum("ca");
  const totalAssets = totalNCA + totalCA;
  const totalNCL = sum("ncl");
  const totalCL  = sum("cl");
  const totalLiabilities = totalNCL + totalCL;
  const totalEquity = sum("equity");
  const totalLiabEquity = totalLiabilities + totalEquity;
  const balanced = Math.abs(totalAssets - totalLiabEquity) < 0.01;
  const today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  function LineRow({ item }: { item: BSLineItem }) {
    const current = editing[item.id] ?? String(val(item) === 0 ? "" : val(item));
    return (
      <tr className="hover:bg-muted/10 group">
        <td className="px-3 py-1 pl-8 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
          {item.label}
          {item.auto && <span className="ml-1 text-[10px] bg-blue-500/10 text-blue-600 px-1 rounded">auto</span>}
        </td>
        <td className="px-2 py-1 text-right w-36">
          {item.auto ? (
            <span className="tabular-nums text-sm font-medium text-blue-600">{fmt(cashFromTxns)}</span>
          ) : (
            <Input
              type="number"
              step="0.01"
              min="0"
              className="h-7 text-sm text-right tabular-nums w-32 ml-auto"
              value={current}
              onChange={e => handleChange(item.id, e.target.value)}
              onBlur={() => handleBlur(item)}
              placeholder="0.00"
            />
          )}
        </td>
      </tr>
    );
  }

  return (
    <Dialog open={open} onOpenChange={v => !v && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-xl">Statement of Financial Position</DialogTitle>
              <p className="text-sm text-muted-foreground mt-0.5">Balance Sheet · As at {today}</p>
            </div>
            <Button size="sm" variant="ghost" onClick={handleReset} className="text-xs text-muted-foreground mt-0.5">
              <RotateCcw className="h-3 w-3 mr-1" /> Reset
            </Button>
          </div>
          <p className="text-xs text-muted-foreground bg-blue-500/10 border border-blue-500/20 rounded px-2 py-1">
            Click any value to edit. "Cash and cash equivalents" is auto-calculated from your transactions.
          </p>
        </DialogHeader>

        <div className="overflow-auto flex-1 border rounded-lg">
          <table className="w-full">
            <thead className="sticky top-0 bg-background z-10 border-b">
              <tr>
                <th className="px-3 py-2 text-left font-semibold text-sm">ASSETS</th>
                <th className="px-3 py-2 text-right font-semibold text-sm w-36">$'000</th>
              </tr>
            </thead>
            <tbody>
              <SectionHeader label={SECTION_LABELS.nca} />
              {get("nca").map(i => <LineRow key={i.id} item={i} />)}
              <SubtotalRow label="Total non-current assets" amount={totalNCA} />

              <SectionHeader label={SECTION_LABELS.ca} />
              {get("ca").map(i => <LineRow key={i.id} item={i} />)}
              <SubtotalRow label="Total current assets" amount={totalCA} />

              <SubtotalRow label="TOTAL ASSETS" amount={totalAssets} isTotal />

              <tr><td colSpan={2} className="py-2" /></tr>
              <tr className="border-t-2 border-border">
                <th className="px-3 py-2 text-left font-semibold text-sm" colSpan={2}>EQUITY AND LIABILITIES</th>
              </tr>

              <SectionHeader label={SECTION_LABELS.equity} />
              {get("equity").map(i => <LineRow key={i.id} item={i} />)}
              <SubtotalRow label="Total equity" amount={totalEquity} />

              <SectionHeader label={SECTION_LABELS.ncl} />
              {get("ncl").map(i => <LineRow key={i.id} item={i} />)}
              <SubtotalRow label="Total non-current liabilities" amount={totalNCL} />

              <SectionHeader label={SECTION_LABELS.cl} />
              {get("cl").map(i => <LineRow key={i.id} item={i} />)}
              <SubtotalRow label="Total current liabilities" amount={totalCL} />

              <SubtotalRow label="Total liabilities" amount={totalLiabilities} />
              <SubtotalRow label="TOTAL EQUITY AND LIABILITIES" amount={totalLiabEquity} isTotal />

              <tr>
                <td colSpan={2} className="px-3 py-2 text-xs text-center">
                  {balanced
                    ? <span className="text-emerald-600 font-medium">✓ Balance sheet balances — Assets = Equity + Liabilities</span>
                    : <span className="text-rose-500 font-medium">⚠ Difference of ${fmt(Math.abs(totalAssets - totalLiabEquity))} — please check values</span>}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </DialogContent>
    </Dialog>
  );
}
