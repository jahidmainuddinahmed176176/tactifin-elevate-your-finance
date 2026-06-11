import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { T as Tabs, m as TabsList, n as TabsTrigger, o as TabsContent, C as Card, a as CardHeader, b as CardTitle, d as CardContent, P as Progress, L as Label, I as Input } from "./router-DLLEZnVG.mjs";
import "../_libs/sonner.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "./client-C60lNmPB.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/radix-ui__react-progress.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-tabs.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/react-remove-scroll.mjs";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/lucide-react.mjs";
import "../_libs/recharts.mjs";
import "../_libs/lodash.mjs";
import "../_libs/react-smooth.mjs";
import "../_libs/prop-types.mjs";
import "../_libs/fast-equals.mjs";
import "../_libs/tiny-invariant.mjs";
import "../_libs/react-is.mjs";
import "../_libs/d3-shape.mjs";
import "../_libs/d3-path.mjs";
import "../_libs/victory-vendor.mjs";
import "../_libs/d3-scale.mjs";
import "../_libs/internmap.mjs";
import "../_libs/d3-array.mjs";
import "../_libs/d3-time-format.mjs";
import "../_libs/d3-time.mjs";
import "../_libs/d3-interpolate.mjs";
import "../_libs/d3-color.mjs";
import "../_libs/d3-format.mjs";
import "../_libs/recharts-scale.mjs";
import "../_libs/decimal.js-light.mjs";
import "../_libs/eventemitter3.mjs";
function CalcPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl", children: "Calculators" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Zakat, personal tax, and credit health." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "zakat", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "zakat", children: "Zakat" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "tax", children: "Personal tax" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "credit", children: "Credit score" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "zakat", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zakat, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "tax", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Tax, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "credit", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Credit, {}) })
    ] })
  ] });
}
function Zakat() {
  const [cash, setCash] = reactExports.useState("0");
  const [gold, setGold] = reactExports.useState("0");
  const [investments, setInvestments] = reactExports.useState("0");
  const [debts, setDebts] = reactExports.useState("0");
  const [nisab, setNisab] = reactExports.useState("5200");
  const total = Number(cash) + Number(gold) + Number(investments) - Number(debts);
  const eligible = total >= Number(nisab);
  const zakat = eligible ? total * 0.025 : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "mt-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Zakat calculator (2.5%)" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "grid gap-4 md:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Cash & bank savings", v: cash, set: setCash }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Gold / silver value", v: gold, set: setGold }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Investments", v: investments, set: setInvestments }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Debts owed", v: debts, set: setDebts }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Nisab threshold", v: nisab, set: setNisab }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2 rounded-lg border border-border bg-card p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Zakatable wealth" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-2xl font-semibold", children: [
          "$",
          total.toFixed(2)
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 text-xs text-muted-foreground", children: "Zakat due" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-3xl font-semibold text-emerald-500", children: [
          "$",
          zakat.toFixed(2)
        ] }),
        !eligible && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-amber-500", children: "Below nisab — no Zakat due." })
      ] })
    ] })
  ] });
}
function Tax() {
  const [income, setIncome] = reactExports.useState("50000");
  const [deductions, setDeductions] = reactExports.useState("12000");
  const taxable = Math.max(0, Number(income) - Number(deductions));
  const brackets = [[11600, 0.1], [47150, 0.12], [100525, 0.22], [191950, 0.24], [243725, 0.32], [609350, 0.35], [Infinity, 0.37]];
  let remaining = taxable, prev = 0, tax = 0;
  for (const [cap, rate] of brackets) {
    const slice = Math.min(remaining, cap - prev);
    if (slice <= 0) break;
    tax += slice * rate;
    remaining -= slice;
    prev = cap;
  }
  const effective = taxable > 0 ? tax / taxable * 100 : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "mt-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Personal income tax (estimate)" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "grid gap-4 md:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Annual gross income", v: income, set: setIncome }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Deductions", v: deductions, set: setDeductions }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2 rounded-lg border border-border bg-card p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Taxable income" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-2xl font-semibold", children: [
          "$",
          taxable.toFixed(2)
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 text-xs text-muted-foreground", children: "Estimated tax" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-3xl font-semibold text-rose-500", children: [
          "$",
          tax.toFixed(2)
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 text-xs text-muted-foreground", children: [
          "Effective rate: ",
          effective.toFixed(1),
          "%"
        ] })
      ] })
    ] })
  ] });
}
function Credit() {
  const [payment, setPayment] = reactExports.useState(95);
  const [utilization, setUtilization] = reactExports.useState(20);
  const [age, setAge] = reactExports.useState(6);
  const [mix, setMix] = reactExports.useState(3);
  const [inquiries, setInquiries] = reactExports.useState(1);
  const score = Math.round(300 + 550 * (0.35 * (payment / 100) + 0.3 * Math.max(0, 1 - utilization / 100) + 0.15 * Math.min(1, age / 10) + 0.1 * Math.min(1, mix / 5) + 0.1 * Math.max(0, 1 - inquiries / 6)));
  const band = score >= 800 ? "Exceptional" : score >= 740 ? "Very good" : score >= 670 ? "Good" : score >= 580 ? "Fair" : "Poor";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "mt-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Credit score monitor" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { label: `On-time payment history: ${payment}%`, v: payment, set: setPayment, max: 100 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { label: `Credit utilization: ${utilization}%`, v: utilization, set: setUtilization, max: 100 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { label: `Avg. account age: ${age} yrs`, v: age, set: setAge, max: 20 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { label: `Credit mix (types): ${mix}`, v: mix, set: setMix, max: 6 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { label: `Recent inquiries: ${inquiries}`, v: inquiries, set: setInquiries, max: 10 }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-card p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Estimated score" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl font-semibold", children: score }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: band }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: (score - 300) / 550 * 100, className: "mt-3" })
      ] })
    ] })
  ] });
}
function Field({
  label,
  v,
  set
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { className: "mt-1", type: "number", min: "0", value: v, onChange: (e) => set(e.target.value) })
  ] });
}
function Slider({
  label,
  v,
  set,
  max
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "range", min: 0, max, value: v, onChange: (e) => set(Number(e.target.value)), className: "mt-2 w-full accent-foreground" })
  ] });
}
export {
  CalcPage as component
};
