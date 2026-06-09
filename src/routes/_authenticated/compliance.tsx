import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { detectHaram, HARAM_KEYWORDS } from "@/lib/haram";
import { ShieldCheck, AlertTriangle } from "lucide-react";

export const Route = createFileRoute("/_authenticated/compliance")({
  head: () => ({ meta: [{ title: "Compliance — Tactifin" }] }),
  component: CompliancePage,
});

function CompliancePage() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<{ isHaram: boolean; reason?: string } | null>(null);

  const { data: flagged = [] } = useQuery({
    queryKey: ["flagged"],
    queryFn: async () => {
      const { data, error } = await supabase.from("transactions").select("*").eq("is_haram", true).order("transaction_date", { ascending: false });
      if (error) throw error;
      return data;
    },
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
            <div className={`flex items-center gap-2 rounded-lg border p-3 text-sm ${result.isHaram ? "border-amber-500/40 bg-amber-500/10 text-amber-500" : "border-emerald-500/40 bg-emerald-500/10 text-emerald-500"}`}>
              {result.isHaram ? <AlertTriangle className="h-4 w-4" /> : <ShieldCheck className="h-4 w-4" />}
              {result.isHaram ? result.reason : "Looks Shariah-compliant"}
            </div>
          )}
          <div className="text-xs text-muted-foreground">Watched keywords: {HARAM_KEYWORDS.join(", ")}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Flagged transactions</CardTitle></CardHeader>
        <CardContent>
          {flagged.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nothing flagged. Looking good.</p>
          ) : (
            <div className="divide-y divide-border">
              {flagged.map((t) => (
                <div key={t.id} className="flex items-center justify-between py-3">
                  <div>
                    <div className="font-medium">{t.description || t.category}</div>
                    <div className="text-xs text-amber-500">⚠ {t.haram_reason}</div>
                  </div>
                  <div className="text-sm text-muted-foreground">${Number(t.amount).toFixed(2)}</div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}