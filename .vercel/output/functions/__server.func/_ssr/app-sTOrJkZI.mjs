import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { s as supabase } from "./client-C60lNmPB.mjs";
import { B as Button, C as Card, a as CardHeader, b as CardTitle, d as CardContent } from "./router-DLLEZnVG.mjs";
import "../_libs/sonner.mjs";
import { W as Wallet, T as TrendingUp, a as TrendingDown, $ as TriangleAlert, f as Target, k as CreditCard } from "../_libs/lucide-react.mjs";
import { R as ResponsiveContainer, B as BarChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, L as Legend, a as Bar, P as PieChart, d as Pie, e as Cell } from "../_libs/recharts.mjs";
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
import "../_libs/tanstack__query-core.mjs";
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
function fmt(n) {
  return new Intl.NumberFormat(void 0, {
    style: "currency",
    currency: "USD"
  }).format(n);
}
function monthKey(dateStr) {
  return dateStr.slice(0, 7);
}
function monthLabel(key) {
  const [y, m] = key.split("-");
  return new Date(Number(y), Number(m) - 1, 1).toLocaleString("default", {
    month: "short"
  });
}
const PIE_COLORS = ["oklch(0.78 0.22 145)", "oklch(0.65 0.13 255)", "oklch(0.75 0.18 60)", "oklch(0.70 0.20 300)", "oklch(0.68 0.20 25)", "oklch(0.72 0.15 180)"];
function Dashboard() {
  const {
    data: txns = []
  } = useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("transactions").select("*").order("transaction_date", {
        ascending: false
      });
      if (error) throw error;
      return data;
    }
  });
  const {
    data: goals = []
  } = useQuery({
    queryKey: ["goals"],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("goals").select("*").order("created_at", {
        ascending: false
      });
      if (error) throw error;
      return data;
    }
  });
  const {
    data: budgets = []
  } = useQuery({
    queryKey: ["budgets"],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("budgets").select("*").order("category");
      if (error) throw error;
      return data;
    }
  });
  const income = txns.filter((t) => t.type === "income").reduce((a, t) => a + Number(t.amount), 0);
  const expenses = txns.filter((t) => t.type === "expense").reduce((a, t) => a + Number(t.amount), 0);
  const haramCount = txns.filter((t) => t.is_haram).length;
  const balance = income - expenses;
  const categoryData = reactExports.useMemo(() => {
    const map = {};
    for (const t of txns) {
      if (t.type === "expense") {
        map[t.category] = (map[t.category] ?? 0) + Number(t.amount);
      }
    }
    return Object.entries(map).sort((a, b) => b[1] - a[1]).slice(0, 6).map(([name, value]) => ({
      name,
      value
    }));
  }, [txns]);
  const monthlyData = reactExports.useMemo(() => {
    const map = {};
    for (const t of txns) {
      const key = monthKey(t.transaction_date);
      if (!map[key]) map[key] = {
        income: 0,
        expenses: 0
      };
      if (t.type === "income") map[key].income += Number(t.amount);
      else map[key].expenses += Number(t.amount);
    }
    return Object.keys(map).sort().slice(-6).map((key) => ({
      month: monthLabel(key),
      Income: map[key].income,
      Expenses: map[key].expenses
    }));
  }, [txns]);
  const topGoals = goals.slice(0, 3);
  const now = /* @__PURE__ */ new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().slice(0, 10);
  const spentBy = {};
  for (const t of txns) {
    if (t.type !== "expense" || t.transaction_date < monthStart) continue;
    spentBy[t.category] = (spentBy[t.category] ?? 0) + Number(t.amount);
  }
  const overBudget = budgets.filter((b) => (spentBy[b.category] ?? 0) > Number(b.monthly_limit));
  const stats = [{
    label: "Balance",
    value: fmt(balance),
    icon: Wallet,
    accent: "text-foreground"
  }, {
    label: "Income",
    value: fmt(income),
    icon: TrendingUp,
    accent: "text-emerald-500"
  }, {
    label: "Expenses",
    value: fmt(expenses),
    icon: TrendingDown,
    accent: "text-rose-500"
  }, {
    label: "Flagged",
    value: String(haramCount),
    icon: TriangleAlert,
    accent: "text-amber-500"
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl", children: "Dashboard" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Your financial overview at a glance." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "sm", variant: "outline", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/transactions", children: "+ Add transaction" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4", children: stats.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between pb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-medium text-muted-foreground", children: s.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: `h-4 w-4 ${s.accent}` })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `text-2xl font-semibold ${s.accent}`, children: s.value }) })
    ] }, s.label)) }),
    txns.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Monthly trend" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: monthlyData.length < 1 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Not enough data yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 220, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: monthlyData, margin: {
          top: 4,
          right: 8,
          bottom: 0,
          left: 0
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "var(--color-border)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "month", tick: {
            fontSize: 11,
            fill: "var(--color-muted-foreground)"
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tick: {
            fontSize: 11,
            fill: "var(--color-muted-foreground)"
          }, tickFormatter: (v) => `$${(v / 1e3).toFixed(0)}k` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: {
            background: "var(--color-card)",
            border: "1px solid var(--color-border)",
            borderRadius: 8,
            fontSize: 12
          }, formatter: (v) => fmt(v) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, { wrapperStyle: {
            fontSize: 12
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "Income", fill: "oklch(0.6 0.18 145)", radius: [4, 4, 0, 0] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "Expenses", fill: "oklch(0.65 0.2 25)", radius: [4, 4, 0, 0] })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Spending by category" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: categoryData.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No expense data yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 220, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PieChart, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Pie, { data: categoryData, cx: "50%", cy: "50%", innerRadius: 55, outerRadius: 85, paddingAngle: 3, dataKey: "value", children: categoryData.map((_, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: PIE_COLORS[idx % PIE_COLORS.length] }, idx)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: {
            background: "var(--color-card)",
            border: "1px solid var(--color-border)",
            borderRadius: 8,
            fontSize: 12
          }, formatter: (v) => fmt(v) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, { wrapperStyle: {
            fontSize: 11
          } })
        ] }) }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between pb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "h-4 w-4 text-[color:var(--brand-bolt)]" }),
            " Savings goals"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "sm", variant: "ghost", className: "text-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/goals", children: "View all" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-3", children: topGoals.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
          "No goals yet. ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/goals", className: "underline", children: "Create one" }),
          "."
        ] }) : topGoals.map((g) => {
          const pct = Math.min(100, Number(g.current_amount) / Number(g.target_amount) * 100);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: g.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground text-xs", children: [
                fmt(Number(g.current_amount)),
                " / ",
                fmt(Number(g.target_amount))
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 w-full rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full rounded-full bg-brand-gradient transition-all", style: {
              width: `${pct}%`
            } }) })
          ] }, g.id);
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between pb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "h-4 w-4 text-[color:var(--brand-bolt)]" }),
            " Budget status"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "sm", variant: "ghost", className: "text-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/budgets", children: "View all" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: budgets.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
          "No budgets set. ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/budgets", className: "underline", children: "Add one" }),
          "."
        ] }) : overBudget.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-emerald-500", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { className: "h-4 w-4" }),
          " All budgets on track this month."
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: overBudget.map((b) => {
          const spent = spentBy[b.category] ?? 0;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-lg border border-rose-500/30 bg-rose-500/5 px-3 py-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-3.5 w-3.5 text-rose-500" }),
              b.category
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-rose-500 text-xs", children: [
              "Over by ",
              fmt(spent - Number(b.monthly_limit))
            ] })
          ] }, b.id);
        }) }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between pb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Recent transactions" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "sm", variant: "ghost", className: "text-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/transactions", children: "View all" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: txns.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
        "No transactions yet. ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/transactions", className: "underline", children: "Add one" }),
        "."
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: txns.slice(0, 8).map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between py-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: t.description || t.category }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
            t.category,
            " · ",
            t.transaction_date,
            t.is_haram && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 text-amber-500", children: "⚠ flagged" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: t.type === "income" ? "text-emerald-500" : "text-rose-500", children: [
          t.type === "income" ? "+" : "-",
          fmt(Number(t.amount))
        ] })
      ] }, t.id)) }) })
    ] })
  ] });
}
export {
  Dashboard as component
};
