import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { s as supabase } from "./client-C60lNmPB.mjs";
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
function AuthCallback() {
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    supabase.auth.getSession().then(({
      data
    }) => {
      if (data.session) {
        navigate({
          to: "/app",
          replace: true
        });
      } else {
        const url = new URL(window.location.href);
        const code = url.searchParams.get("code");
        if (code) {
          supabase.auth.exchangeCodeForSession(code).then(({
            error
          }) => {
            if (error) {
              console.error("OAuth callback error:", error);
              navigate({
                to: "/auth",
                replace: true
              });
            } else {
              navigate({
                to: "/app",
                replace: true
              });
            }
          });
        } else {
          navigate({
            to: "/auth",
            replace: true
          });
        }
      }
    });
  }, [navigate]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center bg-background text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 animate-spin rounded-full border-2 border-border border-t-foreground mx-auto" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Completing sign in…" })
  ] }) });
}
export {
  AuthCallback as component
};
