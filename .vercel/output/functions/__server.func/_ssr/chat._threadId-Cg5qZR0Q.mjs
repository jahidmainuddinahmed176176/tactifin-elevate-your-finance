import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { b as useQueryClient, u as useQuery, a as useMutation } from "../_libs/tanstack__react-query.mjs";
import { u as useServerFn, c as createSsrRpc } from "./createSsrRpc-DGpMxpJ_.mjs";
import { g as getMessages } from "./threads.functions-D7tO_N8M.mjs";
import { a as createServerFn } from "./server-BXa69LoB.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-8W3DX73W.mjs";
import { R as Route$3, c as cn, B as Button } from "./router-DLLEZnVG.mjs";
import "../_libs/seroval.mjs";
import "../_libs/sonner.mjs";
import { w as Bot, a1 as User, a2 as Send } from "../_libs/lucide-react.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-router.mjs";
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
const sendChatMessage = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  threadId: stringType().uuid(),
  content: stringType().min(1).max(4e3)
}).parse(d)).handler(createSsrRpc("abb0f390d0d9d5c002c238029f7d6ac7eceb5f795c2ff0103d4fb2cfd687a422"));
function ChatView() {
  const {
    threadId
  } = Route$3.useParams();
  const qc = useQueryClient();
  const fetchMessages = useServerFn(getMessages);
  const send = useServerFn(sendChatMessage);
  const [input, setInput] = reactExports.useState("");
  const inputRef = reactExports.useRef(null);
  const bottomRef = reactExports.useRef(null);
  const {
    data: messages = []
  } = useQuery({
    queryKey: ["ai_messages", threadId],
    queryFn: () => fetchMessages({
      data: {
        threadId
      }
    })
  });
  const mutation = useMutation({
    mutationFn: (content) => send({
      data: {
        threadId,
        content
      }
    }),
    onMutate: (content) => {
      qc.setQueryData(["ai_messages", threadId], (old = []) => [...old, {
        id: "tmp-" + Date.now(),
        role: "user",
        content,
        created_at: (/* @__PURE__ */ new Date()).toISOString()
      }]);
    },
    onSettled: () => {
      qc.invalidateQueries({
        queryKey: ["ai_messages", threadId]
      });
      qc.invalidateQueries({
        queryKey: ["ai_threads"]
      });
      inputRef.current?.focus();
    }
  });
  reactExports.useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  }, [messages, mutation.isPending]);
  reactExports.useEffect(() => {
    inputRef.current?.focus();
  }, [threadId]);
  function submit(e) {
    e.preventDefault();
    const text = input.trim();
    if (!text || mutation.isPending) return;
    setInput("");
    mutation.mutate(text);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto p-6 space-y-4", children: [
      messages.length === 0 && !mutation.isPending && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "m-auto flex max-w-md flex-col items-center gap-2 pt-10 text-center text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "h-8 w-8" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Ask about budgeting, Zakat, taxes, or whether a transaction is Shariah-compliant." })
      ] }),
      messages.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("flex gap-3", m.role === "user" ? "justify-end" : "justify-start"), children: [
        m.role !== "user" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 shrink-0 rounded-full bg-brand-gradient flex items-center justify-center text-background", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("max-w-[80%] rounded-2xl px-4 py-2.5 text-sm whitespace-pre-wrap", m.role === "user" ? "bg-primary text-primary-foreground" : "bg-accent text-foreground"), children: m.content }),
        m.role === "user" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 shrink-0 rounded-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-4 w-4" }) })
      ] }, m.id)),
      mutation.isPending && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 shrink-0 rounded-full bg-brand-gradient flex items-center justify-center text-background", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl bg-accent px-4 py-2.5 text-sm text-muted-foreground", children: "Thinking…" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: bottomRef })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "border-t border-border p-3 flex items-end gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { ref: inputRef, value: input, onChange: (e) => setInput(e.target.value), onKeyDown: (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          submit(e);
        }
      }, placeholder: "Ask Tactifin AI...", rows: 1, className: "flex-1 resize-none rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: mutation.isPending || !input.trim(), size: "icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-4 w-4" }) })
    ] })
  ] });
}
export {
  ChatView as component
};
