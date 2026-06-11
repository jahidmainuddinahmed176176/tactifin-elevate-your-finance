import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { s as supabase } from "./client-C60lNmPB.mjs";
import { c as createLovableAuth } from "../_libs/lovable.dev__cloud-auth-js.mjs";
import { B as Button, L as Label, I as Input } from "./router-DLLEZnVG.mjs";
import { t as toast } from "../_libs/sonner.mjs";
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
import "../_libs/tanstack__react-query.mjs";
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
const lovableAuth = createLovableAuth();
const lovable = {
  auth: {
    signInWithOAuth: async (provider, opts) => {
      const result = await lovableAuth.signInWithOAuth(provider, {
        redirect_uri: opts?.redirect_uri,
        extraParams: {
          ...opts?.extraParams
        }
      });
      if (result.redirected) {
        return result;
      }
      if (result.error) {
        return result;
      }
      try {
        await supabase.auth.setSession(result.tokens);
      } catch (e) {
        return { error: e instanceof Error ? e : new Error(String(e)) };
      }
      return result;
    }
  }
};
function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = reactExports.useState("signin");
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [name, setName] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  reactExports.useEffect(() => {
    supabase.auth.getSession().then(({
      data
    }) => {
      if (data.session) navigate({
        to: "/app"
      });
    });
  }, [navigate]);
  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const {
          error
        } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin + "/app",
            data: {
              full_name: name
            }
          }
        });
        if (error) throw error;
        toast.success("Account created");
        navigate({
          to: "/app"
        });
      } else {
        const {
          error
        } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (error) throw error;
        navigate({
          to: "/app"
        });
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setLoading(false);
    }
  }
  async function google() {
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin + "/auth/callback"
    });
    if (result.error) toast.error(result.error.message ?? "Google sign-in failed");
    else if (!result.redirected) navigate({
      to: "/app"
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center bg-background text-foreground px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-elegant", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "text-sm text-muted-foreground hover:text-foreground", children: "← Back" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-4 text-3xl", children: mode === "signin" ? "Welcome back" : "Create your account" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: mode === "signin" ? "Sign in to your Tactifin workspace." : "Start tracking your finances in seconds." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: google, variant: "outline", className: "mt-6 w-full", children: "Continue with Google" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "my-6 flex items-center gap-3 text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px flex-1 bg-border" }),
      " or ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px flex-1 bg-border" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "space-y-4", children: [
      mode === "signup" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "name", children: "Full name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "name", value: name, onChange: (e) => setName(e.target.value), required: true, className: "mt-1" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "email", children: "Email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "email", type: "email", autoComplete: "email", value: email, onChange: (e) => setEmail(e.target.value), required: true, className: "mt-1" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "password", children: "Password" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "password", type: "password", autoComplete: mode === "signin" ? "current-password" : "new-password", value: password, onChange: (e) => setPassword(e.target.value), required: true, minLength: 6, className: "mt-1" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: loading, className: "w-full", children: loading ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setMode(mode === "signin" ? "signup" : "signin"), className: "mt-6 w-full text-sm text-muted-foreground hover:text-foreground", children: mode === "signin" ? "Don't have an account? Sign up" : "Already have an account? Sign in" })
  ] }) });
}
export {
  AuthPage as component
};
