import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { b as useQueryClient, u as useQuery, a as useMutation } from "../_libs/tanstack__react-query.mjs";
import { s as supabase } from "./client-C60lNmPB.mjs";
import { C as Card, a as CardHeader, b as CardTitle, d as CardContent, L as Label, I as Input, B as Button, P as Progress } from "./router-DLLEZnVG.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { n as Trash2 } from "../_libs/lucide-react.mjs";
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
function GoalsPage() {
  const qc = useQueryClient();
  const [name, setName] = reactExports.useState("");
  const [target, setTarget] = reactExports.useState("");
  const [date, setDate] = reactExports.useState("");
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
  const add = useMutation({
    mutationFn: async () => {
      const {
        data: u
      } = await supabase.auth.getUser();
      if (!u.user) throw new Error("Not signed in");
      const {
        error
      } = await supabase.from("goals").insert({
        user_id: u.user.id,
        name,
        target_amount: Number(target),
        target_date: date || null
      });
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["goals"]
      });
      setName("");
      setTarget("");
      setDate("");
      toast.success("Goal added");
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Failed")
  });
  const contribute = useMutation({
    mutationFn: async ({
      id,
      current,
      add: add2
    }) => {
      const {
        error
      } = await supabase.from("goals").update({
        current_amount: current + add2
      }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({
      queryKey: ["goals"]
    })
  });
  const del = useMutation({
    mutationFn: async (id) => {
      const {
        error
      } = await supabase.from("goals").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({
      queryKey: ["goals"]
    })
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl", children: "Savings goals" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Set targets and track your progress." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "New goal" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: (e) => {
        e.preventDefault();
        add.mutate();
      }, className: "grid gap-4 md:grid-cols-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { className: "mt-1", required: true, value: name, onChange: (e) => setName(e.target.value), placeholder: "Emergency fund" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Target amount" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { className: "mt-1", type: "number", min: "1", step: "0.01", required: true, value: target, onChange: (e) => setTarget(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Target date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { className: "mt-1", type: "date", value: date, onChange: (e) => setDate(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:col-span-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: add.isPending, children: "Add goal" }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
      goals.map((g) => {
        const pct = Math.min(100, Number(g.current_amount) / Number(g.target_amount) * 100);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-start justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: g.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-xs text-muted-foreground", children: [
                "$",
                Number(g.current_amount).toFixed(2),
                " of $",
                Number(g.target_amount).toFixed(2),
                g.target_date ? ` · by ${g.target_date}` : ""
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => del.mutate(g.id), className: "text-muted-foreground hover:text-destructive", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: pct }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: [10, 50, 100].map((v) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", onClick: () => contribute.mutate({
              id: g.id,
              current: Number(g.current_amount),
              add: v
            }), children: [
              "+$",
              v
            ] }, v)) })
          ] })
        ] }, g.id);
      }),
      goals.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No goals yet." })
    ] })
  ] });
}
export {
  GoalsPage as component
};
