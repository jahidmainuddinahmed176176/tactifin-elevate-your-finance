import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/_authenticated/calculators")({
  head: () => ({ meta: [{ title: "Calculators — Tactifin" }] }),
  component: CalcPage,
});

function CalcPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl">Calculators</h1>
        <p className="text-sm text-muted-foreground">Zakat, personal tax, and credit health.</p>
      </div>
      <Tabs defaultValue="zakat">
        <TabsList>
          <TabsTrigger value="zakat">Zakat</TabsTrigger>
          <TabsTrigger value="tax">Personal tax</TabsTrigger>
          <TabsTrigger value="credit">Credit score</TabsTrigger>
        </TabsList>
        <TabsContent value="zakat"><Zakat /></TabsContent>
        <TabsContent value="tax"><Tax /></TabsContent>
        <TabsContent value="credit"><Credit /></TabsContent>
      </Tabs>
    </div>
  );
}

function Zakat() {
  const [cash, setCash] = useState("0");
  const [gold, setGold] = useState("0");
  const [investments, setInvestments] = useState("0");
  const [debts, setDebts] = useState("0");
  const [nisab, setNisab] = useState("5200");
  const total = Number(cash) + Number(gold) + Number(investments) - Number(debts);
  const eligible = total >= Number(nisab);
  const zakat = eligible ? total * 0.025 : 0;
  return (
    <Card className="mt-4">
      <CardHeader><CardTitle>Zakat calculator (2.5%)</CardTitle></CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-2">
        <Field label="Cash & bank savings" v={cash} set={setCash} />
        <Field label="Gold / silver value" v={gold} set={setGold} />
        <Field label="Investments" v={investments} set={setInvestments} />
        <Field label="Debts owed" v={debts} set={setDebts} />
        <Field label="Nisab threshold" v={nisab} set={setNisab} />
        <div className="md:col-span-2 rounded-lg border border-border bg-card p-4">
          <div className="text-xs text-muted-foreground">Zakatable wealth</div>
          <div className="text-2xl font-semibold">${total.toFixed(2)}</div>
          <div className="mt-3 text-xs text-muted-foreground">Zakat due</div>
          <div className="text-3xl font-semibold text-emerald-500">${zakat.toFixed(2)}</div>
          {!eligible && <p className="mt-2 text-xs text-amber-500">Below nisab — no Zakat due.</p>}
        </div>
      </CardContent>
    </Card>
  );
}

function Tax() {
  const [income, setIncome] = useState("50000");
  const [deductions, setDeductions] = useState("12000");
  const taxable = Math.max(0, Number(income) - Number(deductions));
  // Simplified US progressive brackets (2024 single)
  const brackets: [number, number][] = [
    [11600, 0.10], [47150, 0.12], [100525, 0.22], [191950, 0.24], [243725, 0.32], [609350, 0.35], [Infinity, 0.37],
  ];
  let remaining = taxable, prev = 0, tax = 0;
  for (const [cap, rate] of brackets) {
    const slice = Math.min(remaining, cap - prev);
    if (slice <= 0) break;
    tax += slice * rate;
    remaining -= slice;
    prev = cap;
  }
  const effective = taxable > 0 ? (tax / taxable) * 100 : 0;
  return (
    <Card className="mt-4">
      <CardHeader><CardTitle>Personal income tax (estimate)</CardTitle></CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-2">
        <Field label="Annual gross income" v={income} set={setIncome} />
        <Field label="Deductions" v={deductions} set={setDeductions} />
        <div className="md:col-span-2 rounded-lg border border-border bg-card p-4">
          <div className="text-xs text-muted-foreground">Taxable income</div>
          <div className="text-2xl font-semibold">${taxable.toFixed(2)}</div>
          <div className="mt-3 text-xs text-muted-foreground">Estimated tax</div>
          <div className="text-3xl font-semibold text-rose-500">${tax.toFixed(2)}</div>
          <div className="mt-1 text-xs text-muted-foreground">Effective rate: {effective.toFixed(1)}%</div>
        </div>
      </CardContent>
    </Card>
  );
}

function Credit() {
  const [payment, setPayment] = useState(95);
  const [utilization, setUtilization] = useState(20);
  const [age, setAge] = useState(6);
  const [mix, setMix] = useState(3);
  const [inquiries, setInquiries] = useState(1);
  // FICO-weighted estimate (300-850)
  const score = Math.round(
    300 +
      550 *
        (0.35 * (payment / 100) +
          0.30 * Math.max(0, 1 - utilization / 100) +
          0.15 * Math.min(1, age / 10) +
          0.10 * Math.min(1, mix / 5) +
          0.10 * Math.max(0, 1 - inquiries / 6)),
  );
  const band = score >= 800 ? "Exceptional" : score >= 740 ? "Very good" : score >= 670 ? "Good" : score >= 580 ? "Fair" : "Poor";
  return (
    <Card className="mt-4">
      <CardHeader><CardTitle>Credit score monitor</CardTitle></CardHeader>
      <CardContent className="space-y-5">
        <Slider label={`On-time payment history: ${payment}%`} v={payment} set={setPayment} max={100} />
        <Slider label={`Credit utilization: ${utilization}%`} v={utilization} set={setUtilization} max={100} />
        <Slider label={`Avg. account age: ${age} yrs`} v={age} set={setAge} max={20} />
        <Slider label={`Credit mix (types): ${mix}`} v={mix} set={setMix} max={6} />
        <Slider label={`Recent inquiries: ${inquiries}`} v={inquiries} set={setInquiries} max={10} />
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="text-xs text-muted-foreground">Estimated score</div>
          <div className="text-4xl font-semibold">{score}</div>
          <div className="text-sm text-muted-foreground">{band}</div>
          <Progress value={((score - 300) / 550) * 100} className="mt-3" />
        </div>
      </CardContent>
    </Card>
  );
}

function Field({ label, v, set }: { label: string; v: string; set: (v: string) => void }) {
  return (
    <div>
      <Label>{label}</Label>
      <Input className="mt-1" type="number" min="0" value={v} onChange={(e) => set(e.target.value)} />
    </div>
  );
}

function Slider({ label, v, set, max }: { label: string; v: number; set: (n: number) => void; max: number }) {
  return (
    <div>
      <Label>{label}</Label>
      <input type="range" min={0} max={max} value={v} onChange={(e) => set(Number(e.target.value))} className="mt-2 w-full accent-foreground" />
    </div>
  );
}