import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, e as useRouterState, L as Link, O as Outlet } from "../_libs/tanstack__react-router.mjs";
import { b as useQueryClient, u as useQuery, a as useMutation } from "../_libs/tanstack__react-query.mjs";
import { u as useServerFn } from "./createSsrRpc-DGpMxpJ_.mjs";
import { l as listThreads, c as createThread, d as deleteThread } from "./threads.functions-D7tO_N8M.mjs";
import { B as Button, c as cn } from "./router-DLLEZnVG.mjs";
import "../_libs/seroval.mjs";
import "../_libs/sonner.mjs";
import { P as Plus, a0 as MessageSquare, n as Trash2 } from "../_libs/lucide-react.mjs";
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
import "./server-BXa69LoB.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "./auth-middleware-8W3DX73W.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/zod.mjs";
import "./client-C60lNmPB.mjs";
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
function ChatLayout() {
  const qc = useQueryClient();
  const navigate = useNavigate();
  const list = useServerFn(listThreads);
  const create = useServerFn(createThread);
  const del = useServerFn(deleteThread);
  const path = useRouterState({
    select: (r) => r.location.pathname
  });
  const {
    data: threads = []
  } = useQuery({
    queryKey: ["ai_threads"],
    queryFn: () => list()
  });
  const newThread = useMutation({
    mutationFn: () => create({
      data: {}
    }),
    onSuccess: (t) => {
      qc.invalidateQueries({
        queryKey: ["ai_threads"]
      });
      navigate({
        to: "/chat/$threadId",
        params: {
          threadId: t.id
        }
      });
    }
  });
  const removeThread = useMutation({
    mutationFn: (id) => del({
      data: {
        id
      }
    }),
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["ai_threads"]
      });
      navigate({
        to: "/chat"
      });
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid h-[calc(100vh-8rem)] grid-cols-1 gap-4 md:grid-cols-[260px_1fr]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "rounded-xl border border-border bg-card p-3 flex flex-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => newThread.mutate(), className: "w-full", size: "sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
        " New chat"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex-1 space-y-1 overflow-y-auto", children: [
        threads.map((t) => {
          const active = path === `/chat/${t.id}`;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("group flex items-center gap-2 rounded-md px-2 py-1.5 text-sm", active ? "bg-accent" : "hover:bg-accent/50"), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/chat/$threadId", params: {
              threadId: t.id
            }, className: "flex flex-1 items-center gap-2 truncate text-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "h-4 w-4 shrink-0 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: t.title })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: (e) => {
              e.stopPropagation();
              removeThread.mutate(t.id);
            }, className: "opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }) })
          ] }, t.id);
        }),
        threads.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-2 py-4 text-xs text-muted-foreground", children: "No chats yet. Start a new one." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "rounded-xl border border-border bg-card flex flex-col overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) })
  ] });
}
export {
  ChatLayout as component
};
