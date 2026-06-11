import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { b as useQueryClient, u as useQuery, a as useMutation } from "../_libs/tanstack__react-query.mjs";
import { s as supabase } from "./client-C60lNmPB.mjs";
import { C as Card, a as CardHeader, b as CardTitle, d as CardContent, L as Label, S as Select, e as SelectTrigger, f as SelectValue, g as SelectContent, h as SelectItem, I as Input, B as Button, D as Dialog, i as DialogContent, j as DialogHeader, k as DialogTitle, l as DialogFooter } from "./router-DLLEZnVG.mjs";
import { d as detectHaram, C as CATEGORIES } from "./haram-CllXHDgO.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { _ as Pencil, n as Trash2 } from "../_libs/lucide-react.mjs";
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
function TransactionsPage() {
  const qc = useQueryClient();
  const [type, setType] = reactExports.useState("expense");
  const [amount, setAmount] = reactExports.useState("");
  const [category, setCategory] = reactExports.useState("Food");
  const [description, setDescription] = reactExports.useState("");
  const [date, setDate] = reactExports.useState((/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
  const [editTxn, setEditTxn] = reactExports.useState(null);
  const [editType, setEditType] = reactExports.useState("expense");
  const [editAmount, setEditAmount] = reactExports.useState("");
  const [editCategory, setEditCategory] = reactExports.useState("Food");
  const [editDescription, setEditDescription] = reactExports.useState("");
  const [editDate, setEditDate] = reactExports.useState("");
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
  const add = useMutation({
    mutationFn: async () => {
      const {
        data: u
      } = await supabase.auth.getUser();
      if (!u.user) throw new Error("Not signed in");
      const haram = detectHaram(`${category} ${description}`);
      const {
        error
      } = await supabase.from("transactions").insert({
        user_id: u.user.id,
        type,
        amount: Number(amount),
        category,
        description,
        transaction_date: date,
        is_haram: haram.isHaram,
        haram_reason: haram.reason ?? null
      });
      if (error) throw error;
      if (haram.isHaram) toast.warning(`Flagged: ${haram.reason}`);
      else toast.success("Transaction added");
    },
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["transactions"]
      });
      setAmount("");
      setDescription("");
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Failed")
  });
  const edit = useMutation({
    mutationFn: async () => {
      if (!editTxn) return;
      const haram = detectHaram(`${editCategory} ${editDescription}`);
      const {
        error
      } = await supabase.from("transactions").update({
        type: editType,
        amount: Number(editAmount),
        category: editCategory,
        description: editDescription,
        transaction_date: editDate,
        is_haram: haram.isHaram,
        haram_reason: haram.reason ?? null
      }).eq("id", editTxn.id);
      if (error) throw error;
      if (haram.isHaram) toast.warning(`Updated & flagged: ${haram.reason}`);
      else toast.success("Transaction updated");
    },
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["transactions"]
      });
      setEditTxn(null);
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Failed")
  });
  const del = useMutation({
    mutationFn: async (id) => {
      const {
        error
      } = await supabase.from("transactions").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({
      queryKey: ["transactions"]
    })
  });
  function openEdit(t) {
    setEditTxn(t);
    setEditType(t.type);
    setEditAmount(String(t.amount));
    setEditCategory(t.category);
    setEditDescription(t.description ?? "");
    setEditDate(t.transaction_date);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl", children: "Transactions" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Record income and expenses. Categories: Food, Rent, Business, Taxi and more." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Add transaction" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: (e) => {
        e.preventDefault();
        add.mutate();
      }, className: "grid gap-4 md:grid-cols-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Type" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: type, onValueChange: (v) => setType(v), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "expense", children: "Expense" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "income", children: "Income" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Amount" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { className: "mt-1", type: "number", step: "0.01", min: "0", required: true, value: amount, onChange: (e) => setAmount(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Category" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: category, onValueChange: setCategory, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: CATEGORIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c, children: c }, c)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Description" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { className: "mt-1", value: description, onChange: (e) => setDescription(e.target.value), placeholder: "e.g. Grocery shopping" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { className: "mt-1", type: "date", value: date, onChange: (e) => setDate(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:col-span-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: add.isPending, children: add.isPending ? "Adding..." : "Add transaction" }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "All transactions" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: txns.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Nothing yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: txns.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 py-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium truncate", children: t.description || t.category }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
            t.category,
            " · ",
            t.transaction_date,
            t.is_haram && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-2 text-amber-500", title: t.haram_reason ?? "", children: [
              "⚠ ",
              t.haram_reason
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: t.type === "income" ? "text-emerald-500" : "text-rose-500", children: [
            t.type === "income" ? "+" : "-",
            "$",
            Number(t.amount).toFixed(2)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => openEdit(t), className: "text-muted-foreground hover:text-foreground", title: "Edit", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => del.mutate(t.id), className: "text-muted-foreground hover:text-destructive", title: "Delete", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
        ] })
      ] }, t.id)) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!editTxn, onOpenChange: (open) => {
      if (!open) setEditTxn(null);
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Edit transaction" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: (e) => {
        e.preventDefault();
        edit.mutate();
      }, className: "grid gap-4 md:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Type" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: editType, onValueChange: (v) => setEditType(v), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "expense", children: "Expense" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "income", children: "Income" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Amount" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { className: "mt-1", type: "number", step: "0.01", min: "0", required: true, value: editAmount, onChange: (e) => setEditAmount(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Category" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: editCategory, onValueChange: setEditCategory, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: CATEGORIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c, children: c }, c)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { className: "mt-1", type: "date", value: editDate, onChange: (e) => setEditDate(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Description" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { className: "mt-1", value: editDescription, onChange: (e) => setEditDescription(e.target.value), placeholder: "e.g. Grocery shopping" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "md:col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", onClick: () => setEditTxn(null), children: "Cancel" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: edit.isPending, children: edit.isPending ? "Saving..." : "Save changes" })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  TransactionsPage as component
};
