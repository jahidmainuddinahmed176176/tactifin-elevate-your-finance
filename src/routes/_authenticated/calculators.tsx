import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { computeTaxBD, type AssessmentYear, type TaxpayerCategory, type BDTaxInput } from "@/lib/tax/bd";

export const Route = createFileRoute("/_authenticated/calculators")({
  head: () => ({ meta: [{ title: "Calculators — Tactifin" }] }),
  component: CalcPage,
});

function CalcPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl">Calculators</h1>
        <p className="text-sm text-muted-foreground">Zakat, Bangladesh personal tax, and credit health.</p>
      </div>
      <Tabs defaultValue="tax">
        <TabsList>
          <TabsTrigger value="tax">Personal tax</TabsTrigger>
          <TabsTrigger value="zakat">Zakat</TabsTrigger>
          <TabsTrigger value="credit">Credit score</TabsTrigger>
        </TabsList>
        <TabsContent value="tax"><Tax /></TabsContent>
        <TabsContent value="zakat"><Zakat /></TabsContent>
        <TabsContent value="credit"><Credit /></TabsContent>
      </Tabs>
    </div>
  );
}

const ASSESSMENT_YEARS: AssessmentYear[] = ["AY 2026-27 & 2027-28", "AY 2028-29 & 2029-30", "AY 2030-31"];
const CATEGORIES: TaxpayerCategory[] = ["General", "Woman or Senior Citizen (65+)", "Third Gender or Physically Challenged", "War-Wounded Gazetted Freedom Fighter or July Fighter"];

function bd(v: string): number { return Number(v) || 0; }
function fmtBDT(n: number): string { return "BDT " + n.toLocaleString("en-IN", { maximumFractionDigits: 0 }); }

function Tax() {
  const [assessmentYear, setAssessmentYear] = useState<AssessmentYear>("AY 2026-27 & 2027-28");
  const [category, setCategory] = useState<TaxpayerCategory>("General");
  const [isCitizen, setIsCitizen] = useState("yes");
  const [isNewTaxpayer, setIsNewTaxpayer] = useState("no");
  const [disabledChildren, setDisabledChildren] = useState("0");
  const [employment, setEmployment] = useState("904397");
  const [rent, setRent] = useState("0");
  const [agriculture, setAgriculture] = useState("0");
  const [business, setBusiness] = useState("0");
  const [financial, setFinancial] = useState("0");
  const [dividend, setDividend] = useState("0");
  const [other, setOther] = useState("0");
  const [cgGold, setCgGold] = useState("0");
  const [cgLong, setCgLong] = useState("0");
  const [cgShort, setCgShort] = useState("0");
  const [investments, setInvestments] = useState("200000");
  const [netWealth, setNetWealth] = useState("0");
  const [cars, setCars] = useState("0");
  const [houseArea, setHouseArea] = useState("0");
  const [v1, setV1] = useState("0");
  const [v2, setV2] = useState("0");
  const [v3, setV3] = useState("0");
  const [v4, setV4] = useState("0");
  const [v5, setV5] = useState("0");
  const [v6, setV6] = useState("0");

  const input: BDTaxInput = {
    assessmentYear, category,
    isBangladeshiCitizen: isCitizen === "yes",
    isNewTaxpayer: isNewTaxpayer === "yes",
    childrenWithDisabilities: bd(disabledChildren),
    employmentIncome: bd(employment), rentIncome: bd(rent), agricultureIncome: bd(agriculture),
    businessIncome: bd(business), financialAssetsIncome: bd(financial), dividendIncome: bd(dividend),
    otherIncome: bd(other), capitalGainGold: bd(cgGold), capitalGainOtherLongTerm: bd(cgLong),
    capitalGainOtherShortTerm: bd(cgShort), eligibleInvestments: bd(investments), netWealth: bd(netWealth),
    motorCarsOwned: bd(cars), housePropertyArea: bd(houseArea),
    vehiclesUpTo1500: bd(v1), vehicles1501_2000: bd(v2), vehicles2001_2500: bd(v3),
    vehicles2501_3000: bd(v4), vehicles3001_3500: bd(v5), vehiclesAbove3500: bd(v6),
  };
  const r = computeTaxBD(input);

  return (
    <Card className="mt-4">
      <CardHeader><CardTitle>Bangladesh personal income tax</CardTitle></CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Label>Assessment year</Label>
            <Select value={assessmentYear} onValueChange={(v) => setAssessmentYear(v as AssessmentYear)}>
              <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
              <SelectContent>{ASSESSMENT_YEARS.map((y) => <SelectItem key={y} value={y}>{y}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div>
            <Label>Taxpayer category</Label>
            <Select value={category} onValueChange={(v) => setCategory(v as TaxpayerCategory)}>
              <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
              <SelectContent>{CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div>
            <Label>Bangladeshi citizen?</Label>
            <Select value={isCitizen} onValueChange={setIsCitizen}>
              <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="yes">Yes</SelectItem><SelectItem value="no">No (flat 30%)</SelectItem></SelectContent>
            </Select>
          </div>
          <div>
            <Label>New taxpayer? (first return)</Label>
            <Select value={isNewTaxpayer} onValueChange={setIsNewTaxpayer}>
              <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="no">No</SelectItem><SelectItem value="yes">Yes</SelectItem></SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-3">Income by head (BDT)</h4>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <BDField label="Employment income (gross)" v={employment} set={setEmployment} />
            <BDField label="Rent income (net)" v={rent} set={setRent} />
            <BDField label="Agriculture income (net)" v={agriculture} set={setAgriculture} />
            <BDField label="Business / profession (net)" v={business} set={setBusiness} />
            <BDField label="Financial assets (interest/gains)" v={financial} set={setFinancial} />
            <BDField label="Dividend income (15% flat)" v={dividend} set={setDividend} />
            <BDField label="Other sources" v={other} set={setOther} />
            <BDField label="Capital gain — gold/jewellery (5% flat)" v={cgGold} set={setCgGold} />
            <BDField label="Capital gain — other >5 yrs (15% flat)" v={cgLong} set={setCgLong} />
            <BDField label="Capital gain — other <5 yrs (slab)" v={cgShort} set={setCgShort} />
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-3">Investments & wealth</h4>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <BDField label="Eligible investments (BDT)" v={investments} set={setInvestments} />
            <BDField label="Net wealth (BDT)" v={netWealth} set={setNetWealth} />
            <BDField label="Motor cars owned" v={cars} set={setCars} />
            <BDField label="House property area (sq ft, city)" v={houseArea} set={setHouseArea} />
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-3">Environmental surcharge — additional vehicles by engine capacity</h4>
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
            <BDField label="Up to 1,500cc" v={v1} set={setV1} />
            <BDField label="1,501–2,000cc" v={v2} set={setV2} />
            <BDField label="2,001–2,500cc" v={v3} set={setV3} />
            <BDField label="2,501–3,000cc" v={v4} set={setV4} />
            <BDField label="3,001–3,500cc" v={v5} set={setV5} />
            <BDField label="Above 3,500cc" v={v6} set={setV6} />
          </div>
        </div>

        <div className="rounded-lg border-2 border-border bg-card p-5 space-y-2">
          <div className="text-sm font-medium text-muted-foreground">Tax breakdown</div>
          <Row label="Gross employment income" value={fmtBDT(r.grossEmploymentIncome)} />
          <Row label="Employment exemption (1/3 or BDT 500k)" value={fmtBDT(r.employmentExemption)} />
          <Row label="Net employment income" value={fmtBDT(r.netEmploymentIncome)} />
          <Row label="Other slab-taxed income" value={fmtBDT(r.otherSlabIncome)} />
          <Row label="Total income taxed at slab rates" value={fmtBDT(r.totalSlabTaxedIncome)} bold />
          <div className="border-t border-border my-1" />
          <Row label="Basic exemption" value={fmtBDT(r.basicExemption)} />
          <Row label="Child-disability exemption" value={fmtBDT(r.childDisabilityExemption)} />
          <Row label="Total exemption" value={fmtBDT(r.totalExemption)} />
          <Row label="Taxable income after exemption" value={fmtBDT(r.taxableIncome)} bold />
          <div className="border-t border-border my-1" />
          <Row label="Income tax on slabs" value={fmtBDT(r.slabTax)} />
          <Row label="Investment tax credit" value={"− " + fmtBDT(r.investmentCredit)} />
          <Row label="Tax after investment credit" value={fmtBDT(r.taxAfterCredit)} />
          <Row label={`Minimum tax floor (${input.isNewTaxpayer ? "new taxpayer" : "regular"})`} value={fmtBDT(r.minimumTaxFloor)} />
          <Row label="Regular income tax payable" value={fmtBDT(r.regularTaxPayable)} bold />
          <div className="border-t border-border my-1" />
          <Row label="Dividend tax @ 15%" value={fmtBDT(r.dividendTax)} />
          <Row label="Capital gain — gold @ 5%" value={fmtBDT(r.capitalGainGoldTax)} />
          <Row label="Capital gain — other >5yr @ 15%" value={fmtBDT(r.capitalGainOtherLongTermTax)} />
          <Row label="Total tax before surcharge" value={fmtBDT(r.totalTaxBeforeSurcharge)} bold />
          <div className="border-t border-border my-1" />
          <Row label={`Surcharge @ ${(r.surchargeRate * 100).toFixed(1)}%`} value={fmtBDT(r.surchargeAmount)} />
          <Row label="Environmental surcharge" value={fmtBDT(r.environmentalSurcharge)} />
          <div className="border-t-2 border-border mt-2 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold">Total tax liability</span>
              <span className="text-2xl font-bold text-rose-500">{fmtBDT(r.totalTaxLiability)}</span>
            </div>
            <div className="mt-1 text-xs text-muted-foreground">Effective rate: {r.effectiveRate.toFixed(2)}%</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function BDField({ label, v, set }: { label: string; v: string; set: (v: string) => void }) {
  return (
    <div>
      <Label className="text-xs">{label}</Label>
      <Input className="mt-1" type="number" min="0" value={v} onChange={(e) => set(e.target.value)} />
    </div>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className={bold ? "font-medium" : "text-muted-foreground"}>{label}</span>
      <span className={bold ? "font-semibold" : ""}>{value}</span>
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

function Credit() {
  const [payment, setPayment] = useState(95);
  const [utilization, setUtilization] = useState(20);
  const [age, setAge] = useState(6);
  const [mix, setMix] = useState(3);
  const [inquiries, setInquiries] = useState(1);
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
