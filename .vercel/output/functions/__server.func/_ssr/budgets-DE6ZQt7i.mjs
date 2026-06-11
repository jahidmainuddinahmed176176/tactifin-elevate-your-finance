import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { b as useQueryClient, u as useQuery, a as useMutation } from "../_libs/tanstack__react-query.mjs";
import { s as supabase } from "./client-C60lNmPB.mjs";
import { C as Card, a as CardHeader, b as CardTitle, d as CardContent, L as Label, S as Select, e as SelectTrigger, f as SelectValue, g as SelectContent, h as SelectItem, I as Input, B as Button, P as Progress } from "./router-DLLEZnVG.mjs";
import { C as CATEGORIES } from "./haram-CllXHDgO.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { n as Trash2, $ as TriangleAlert } from "../_libs/lucide-react.mjs";
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
function BudgetsPage() {
  const qc = useQueryClient();
  const [category, setCategory] = reactExports.useState("Food");
  const [limit, setLimit] = reactExports.useState("");
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
  const {
    data: txns = []
  } = useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("transactions").select("category,amount,type,transaction_date");
      if (error) throw error;
      return data;
    }
  });
  const now = /* @__PURE__ */ new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().slice(0, 10);
  const spentBy = {};
  for (const t of txns) {
    if (t.type !== "expense" || t.transaction_date < monthStart) continue;
    spentBy[t.category] = (spentBy[t.category] ?? 0) + Number(t.amount);
  }
  const add = useMutation({
    mutationFn: async () => {
      const {
        data: u
      } = await supabase.auth.getUser();
      if (!u.user) throw new Error("Not signed in");
      const {
        error
      } = await supabase.from("budgets").upsert({
        user_id: u.user.id,
        category,
        monthly_limit: Number(limit)
      }, {
        onConflict: "user_id,category"
      });
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["budgets"]
      });
      setLimit("");
      toast.success("Budget saved");
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Failed")
  });
  const del = useMutation({
    mutationFn: async (id) => {
      const {
        error
      } = await supabase.from("budgets").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({
      queryKey: ["budgets"]
    })
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl", children: "Budgets" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Set monthly limits per category. Get alerted when you go over." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Set / update a budget" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: (e) => {
        e.preventDefault();
        add.mutate();
      }, className: "grid gap-4 md:grid-cols-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Category" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: category, onValueChange: setCategory, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: CATEGORIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c, children: c }, c)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Monthly limit" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { className: "mt-1", type: "number", min: "1", step: "0.01", required: true, value: limit, onChange: (e) => setLimit(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", children: "Save budget" }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
      budgets.map((b) => {
        const spent = spentBy[b.category] ?? 0;
        const limit2 = Number(b.monthly_limit);
        const pct = Math.min(100, spent / limit2 * 100);
        const over = spent > limit2;
        const near = spent > limit2 * 0.8 && !over;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-start justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: b.category }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-xs text-muted-foreground", children: [
                "$",
                spent.toFixed(2),
                " of $",
                limit2.toFixed(2),
                " this month"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => del.mutate(b.id), className: "text-muted-foreground hover:text-destructive", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: pct }),
            over && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-rose-500", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-4 w-4" }),
              " Over budget by $",
              (spent - limit2).toFixed(2)
            ] }),
            near && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-amber-500", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-4 w-4" }),
              " Approaching limit"
            ] })
          ] })
        ] }, b.id);
      }),
      budgets.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No budgets yet." })
    ] })
  ] });
}
export {
  BudgetsPage as component
};
