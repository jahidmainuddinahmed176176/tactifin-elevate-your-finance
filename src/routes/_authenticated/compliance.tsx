import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { getTransactions } from "@/lib/local-storage";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { detectHaram, HARAM_KEYWORDS } from "@/lib/haram";
import { ShieldCheck, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/compliance")({
  head: () => ({ meta: [{ title: "Compliance — Tactifin" }] }),
  component: CompliancePage,
});

function CompliancePage() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<{ isHaram: boolean; reason?: string } | null>(null);

  const { data: flagged = [] } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => getTransactions(),
    select: (txns) => txns.filter((t) => t.is_haram),
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl">Islamic compliance</h1>
        <p className="text-sm text-muted-foreground">Auto-detects interest, gambling, alcohol and other non-compliant transactions.</p>
      </div>

      <Card>
        <CardHeader><CardTitle>Check a transaction</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div>
            <Label>Description</Label>
            <Input className="mt-1" placeholder="e.g. Bank interest income" value={text} onChange={(e) => setText(e.target.value)} />
          </div>
          <Button onClick={() => setResult(detectHaram(text))}>Check compliance</Button>
          {result && (
            <div className={cn("flex items-center gap-2 rounded-lg border p-3 text-sm", result.isHaram ? "border-amber-500/40 bg-amber-500/10 text-amber-500" : "border-emerald-500/40 bg-emerald-500/10 text-emerald-500")}>
              {result.isHaram ? <AlertTriangle className="h-4 w-4" /> : <ShieldCheck className="h-4 w-4" />}
              {result.isHaram ? result.reason : "Looks Shariah-compliant"}
            </div>
          )}
          <div className="text-xs text-muted-foreground">Watched keywords: {HARAM_KEYWORDS.join(", ")}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-amber-500" /> Compliance notifications</CardTitle>
          {flagged.length > 0 && <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-xs text-amber-500">{flagged.length} flagged</span>}
        </CardHeader>
        <CardContent>
          {flagged.length === 0 ? (
            <div className="flex items-center gap-2 text-sm text-emerald-500"><ShieldCheck className="h-4 w-4" /> No compliance issues detected. All clear.</div>
          ) : (
            <div className="space-y-3">
              {flagged.map((t) => (
                <div key={t.id} className="flex items-start gap-3 rounded-lg border border-amber-500/30 bg-amber-500/5 p-3">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/20">
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium">{t.description || t.category}</div>
                    <div className="text-xs text-amber-500 mt-0.5">{t.haram_reason}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{t.category} · {t.transaction_date} · ${t.amount.toFixed(2)}</div>
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
