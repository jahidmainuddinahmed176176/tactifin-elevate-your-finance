import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { O as Outlet, e as useRouterState, d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { s as supabase } from "./client-C60lNmPB.mjs";
import { u as useTheme, c as cn } from "./router-DLLEZnVG.mjs";
import { b as useQueryClient, u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { T as TactifinLogo } from "./tactifin-logo-qE3sXKy8.mjs";
import "../_libs/sonner.mjs";
import { t as LayoutDashboard, u as Receipt, f as Target, W as Wallet, k as CreditCard, R as RotateCcw, v as Calculator, e as ShieldCheck, w as Bot, N as Newspaper, B as BookOpen, x as Settings, y as Sun, M as Moon, z as LogOut, X, A as Menu } from "../_libs/lucide-react.mjs";
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
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/tanstack__query-core.mjs";
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
const NAV = [
  { to: "/app", label: "Dashboard", icon: LayoutDashboard },
  { to: "/transactions", label: "Transactions", icon: Receipt },
  { to: "/goals", label: "Goals", icon: Target },
  { to: "/budgets", label: "Budgets", icon: Wallet },
  { to: "/bills", label: "Bill Pay", icon: CreditCard },
  { to: "/rewinder", label: "Rewinder", icon: RotateCcw },
  { to: "/calculators", label: "Calculators", icon: Calculator },
  { to: "/compliance", label: "Compliance", icon: ShieldCheck },
  { to: "/chat", label: "AI Assistant", icon: Bot },
  { to: "/news", label: "Tips & News", icon: Newspaper },
  { to: "/learn", label: "Learning", icon: BookOpen }
];
function AppShell({ children }) {
  const path = useRouterState({ select: (r) => r.location.pathname });
  const { theme, toggle } = useTheme();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [mobile, setMobile] = reactExports.useState(false);
  const { data: isAdmin } = useQuery({
    queryKey: ["is-admin"],
    queryFn: async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return false;
      const { data } = await supabase.rpc("has_role", { _user_id: u.user.id, _role: "admin" });
      return !!data;
    },
    staleTime: 5 * 60 * 1e3
  });
  async function signOut() {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-screen bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "aside",
      {
        className: cn(
          "fixed inset-y-0 left-0 z-40 w-64 border-r border-border bg-card flex-col md:flex transition-transform",
          mobile ? "flex translate-x-0" : "hidden -translate-x-full md:translate-x-0"
        ),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-16 items-center gap-2 border-b border-border px-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TactifinLogo, { size: 32 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-medium tracking-tight", children: "Tactifin" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex-1 space-y-1 overflow-y-auto p-3", children: [
            NAV.map((n) => {
              const active = path === n.to || n.to !== "/app" && path.startsWith(n.to);
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Link,
                {
                  to: n.to,
                  onClick: () => setMobile(false),
                  className: cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                    active ? "bg-accent text-foreground" : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                  ),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(n.icon, { className: "h-4 w-4" }),
                    n.label
                  ]
                },
                n.to
              );
            }),
            isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "my-2 h-px bg-border" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Link,
                {
                  to: "/admin/users",
                  onClick: () => setMobile(false),
                  className: cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                    path.startsWith("/admin") ? "bg-accent text-foreground" : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                  ),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "h-4 w-4" }),
                    "Admin"
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border p-3 space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: toggle,
                className: "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground",
                children: [
                  theme === "dark" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { className: "h-4 w-4" }),
                  theme === "dark" ? "Light mode" : "Dark mode"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: signOut,
                className: "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" }),
                  "Sign out"
                ]
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 flex-col md:pl-64", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur md:hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setMobile((m) => !m),
            className: "flex h-9 w-9 items-center justify-center rounded-md border border-border",
            children: mobile ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-4 w-4" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: "Tactifin" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: toggle, className: "flex h-9 w-9 items-center justify-center rounded-md border border-border", children: theme === "dark" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { className: "h-4 w-4" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 p-4 md:p-8", children })
    ] })
  ] });
}
const SplitComponent = () => /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) });
export {
  SplitComponent as component
};
