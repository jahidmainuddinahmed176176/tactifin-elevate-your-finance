import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useServerFn, c as createSsrRpc } from "./createSsrRpc-DGpMxpJ_.mjs";
import { b as useQueryClient, u as useQuery, a as useMutation } from "../_libs/tanstack__react-query.mjs";
import { a as createServerFn } from "./server-BXa69LoB.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-8W3DX73W.mjs";
import { s as supabase } from "./client-C60lNmPB.mjs";
import { B as Button, C as Card, a as CardHeader, b as CardTitle, d as CardContent } from "./router-DLLEZnVG.mjs";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell, A as AlertDialog, f as AlertDialogTrigger, g as AlertDialogContent, h as AlertDialogHeader, i as AlertDialogTitle, j as AlertDialogDescription, k as AlertDialogFooter, l as AlertDialogCancel, m as AlertDialogAction } from "./alert-dialog-DBhgnJEi.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { n as Trash2 } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
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
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
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
import "../_libs/radix-ui__react-alert-dialog.mjs";
const listUsers = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("ae1d531e1714d053869d1e069815a71e199346ef621d80ab0f46be85080718ab"));
const deleteUser = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => input).handler(createSsrRpc("5f15d9c6194c3264109b1c81741c60a8654b66a5caffc1ee319315a3a983394e"));
const getMyRole = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("e2507865c01468809aa67f84f243facd748d53ebf53d1a04baa0f86f26aed510"));
function AdminUsersPage() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const list = useServerFn(listUsers);
  const del = useServerFn(deleteUser);
  const role = useServerFn(getMyRole);
  const [allowed, setAllowed] = reactExports.useState(null);
  reactExports.useEffect(() => {
    role().then((r) => {
      if (!r.isAdmin) {
        toast.error("Admins only");
        navigate({
          to: "/"
        });
      } else setAllowed(true);
    });
  }, [role, navigate]);
  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ["admin-users"],
    queryFn: () => list(),
    enabled: allowed === true
  });
  const deleteMut = useMutation({
    mutationFn: (userId) => del({
      data: {
        userId
      }
    }),
    onSuccess: () => {
      toast.success("User deleted");
      qc.invalidateQueries({
        queryKey: ["admin-users"]
      });
    },
    onError: (e) => toast.error(e.message)
  });
  async function handleSignOut() {
    await supabase.auth.signOut();
    navigate({
      to: "/auth"
    });
  }
  if (!allowed) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-5xl space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-semibold", children: "Users" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "Users" }),
          " ·",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/articles", className: "hover:underline", children: "Articles" }),
          " ·",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/courses", className: "hover:underline", children: "Courses" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: handleSignOut, children: "Sign out" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { children: [
        "All users (",
        data?.length ?? 0,
        ")"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Loading…" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Signed up" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "w-24 text-right", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TableBody, { children: [
          data?.map((u) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: u.email }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: new Date(u.created_at).toLocaleString() }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 text-destructive" }) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete user?" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
                    "This permanently deletes ",
                    u.email,
                    ". This action cannot be undone."
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { children: "Cancel" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { onClick: () => deleteMut.mutate(u.id), className: "bg-destructive text-destructive-foreground hover:bg-destructive/90", children: "Delete" })
                ] })
              ] })
            ] }) })
          ] }, u.id)),
          data?.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 3, className: "text-center text-muted-foreground", children: "No users" }) })
        ] })
      ] }) })
    ] })
  ] }) });
}
export {
  AdminUsersPage as component
};
