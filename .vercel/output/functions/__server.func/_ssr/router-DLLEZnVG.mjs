import { b as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider, u as useQuery, a as useMutation, b as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { S as redirect } from "../_libs/tanstack__router-core.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { T as Toaster$1, t as toast } from "../_libs/sonner.mjs";
import { s as supabase } from "./client-C60lNmPB.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { S as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { R as Root$1, I as Indicator } from "../_libs/radix-ui__react-progress.mjs";
import { R as Root2, L as List, T as Trigger, C as Content } from "../_libs/radix-ui__react-tabs.mjs";
import { R as Root$2 } from "../_libs/radix-ui__react-label.mjs";
import { S as Select$1, a as SelectValue$1, b as SelectTrigger$1, c as SelectIcon, d as SelectPortal, e as SelectContent$1, f as SelectViewport, g as SelectItem$1, h as SelectItemIndicator, i as SelectItemText, j as SelectScrollUpButton$1, k as SelectScrollDownButton$1, l as SelectLabel$1, m as SelectSeparator$1 } from "../_libs/radix-ui__react-select.mjs";
import { R as Root, P as Portal, C as Content$1, b as Close, a as Title, O as Overlay, D as Description, T as Trigger$1 } from "../_libs/radix-ui__react-dialog.mjs";
import { R as RotateCcw, T as TrendingUp, a as TrendingDown, C as ChevronLeft, b as Calendar, c as ChevronRight, D as DollarSign, d as CircleAlert, B as BookOpen, S as Search, L as LoaderCircle, W as Wallet, e as ShieldCheck, f as Target, g as Star, P as Plus, Z as Zap, h as Wifi, i as Droplets, H as House, j as Phone, k as CreditCard, l as CircleCheckBig, m as Clock, n as Trash2, o as CirclePlay, p as Lock, q as ChevronDown, r as Check, X, s as ChevronUp } from "../_libs/lucide-react.mjs";
import { R as ResponsiveContainer, B as BarChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, L as Legend, a as Bar, b as LineChart, c as Line } from "../_libs/recharts.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-presence.mjs";
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
const appCss = "/assets/styles-BOF9Qn36.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
const ThemeCtx = reactExports.createContext({
  theme: "dark",
  toggle: () => {
  }
});
function ThemeProvider({ children }) {
  const [theme, setTheme] = reactExports.useState("dark");
  reactExports.useEffect(() => {
    const stored = typeof window !== "undefined" && localStorage.getItem("tactifin-theme");
    if (stored) setTheme(stored);
  }, []);
  reactExports.useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    localStorage.setItem("tactifin-theme", theme);
  }, [theme]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeCtx.Provider, { value: { theme, toggle: () => setTheme((t) => t === "dark" ? "light" : "dark") }, children });
}
const useTheme = () => reactExports.useContext(ThemeCtx);
function FloatingStars() {
  const [stars, setStars] = reactExports.useState([]);
  reactExports.useEffect(() => {
    const starCount = 40;
    const newStars = [];
    for (let i = 0; i < starCount; i++) {
      newStars.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100 + 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 15 + 10,
        delay: Math.random() * 10,
        opacity: Math.random() * 0.5 + 0.2
      });
    }
    setStars(newStars);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pointer-events-none fixed inset-0 overflow-hidden", "aria-hidden": "true", children: [
    stars.map((star) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute rounded-full bg-[color:var(--brand-bolt)]",
        style: {
          left: `${star.x}%`,
          top: `${star.y}%`,
          width: `${star.size}px`,
          height: `${star.size}px`,
          opacity: star.opacity,
          animation: `floatUp ${star.duration}s linear ${star.delay}s infinite`,
          boxShadow: `0 0 ${star.size * 2}px rgba(120, 220, 130, 0.5), 0 0 ${star.size * 4}px rgba(120, 220, 130, 0.3)`
        }
      },
      star.id
    )),
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        @keyframes floatUp {
          0% {
            transform: translateY(0) scale(1);
            opacity: var(--star-opacity, 0.3);
          }
          10% {
            opacity: calc(var(--star-opacity, 0.3) * 1.5);
          }
          90% {
            opacity: calc(var(--star-opacity, 0.3) * 0.5);
          }
          100% {
            transform: translateY(-120vh) scale(0.5);
            opacity: 0;
          }
        }
      ` })
  ] });
}
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  reactExports.useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$k = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Tactifin — Premium Accounting, Reimagined" },
      { name: "description", content: "Tactifin is a premium accounting platform with AI-powered tracking, Shariah-based finance tools, and intelligent insights for modern finance." },
      { name: "author", content: "Tactifin" },
      { property: "og:title", content: "Tactifin — Premium Accounting, Reimagined" },
      { property: "og:description", content: "AI-driven accounting, budgeting, and Shariah-compliant finance — all in one premium platform." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" }
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap"
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$k.useRouteContext();
  const router2 = useRouter();
  reactExports.useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event) => {
      if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
      router2.invalidate();
      if (event !== "SIGNED_OUT") queryClient.invalidateQueries();
    });
    return () => data.subscription.unsubscribe();
  }, [router2, queryClient]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(ThemeProvider, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingStars, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, {})
  ] }) });
}
const $$splitComponentImporter$f = () => import("./auth-DpgvvgBL.mjs");
const Route$j = createFileRoute("/auth")({
  head: () => ({
    meta: [{
      title: "Sign in — Tactifin"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$f, "component")
});
const $$splitComponentImporter$e = () => import("./route-Cz3JvJPR.mjs");
const Route$i = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    const {
      data,
      error
    } = await supabase.auth.getUser();
    if (error || !data.user) throw redirect({
      to: "/auth"
    });
    return {
      user: data.user
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$e, "component")
});
const $$splitComponentImporter$d = () => import("./index-CGbZWc9k.mjs");
const Route$h = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "Tactifin — Premium Accounting, Reimagined"
    }, {
      name: "description",
      content: "AI-native accounting with Shariah-aware finance, tracking, budgeting and intelligent insights — built for the way you actually move money."
    }, {
      property: "og:title",
      content: "Tactifin — Premium Accounting, Reimagined"
    }, {
      property: "og:description",
      content: "AI-native accounting with Shariah-aware finance, tracking, budgeting and intelligent insights."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const $$splitComponentImporter$c = () => import("./auth.callback-BfmNJkbX.mjs");
const Route$g = createFileRoute("/auth/callback")({
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const $$splitComponentImporter$b = () => import("./transactions-Cf7Zvh1L.mjs");
const Route$f = createFileRoute("/_authenticated/transactions")({
  head: () => ({
    meta: [{
      title: "Transactions — Tactifin"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const Card = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref,
      className: cn("rounded-xl border bg-card text-card-foreground shadow", className),
      ...props
    }
  )
);
Card.displayName = "Card";
const CardHeader = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: cn("flex flex-col space-y-1.5 p-6", className), ...props })
);
CardHeader.displayName = "CardHeader";
const CardTitle = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref,
      className: cn("font-semibold leading-none tracking-tight", className),
      ...props
    }
  )
);
CardTitle.displayName = "CardTitle";
const CardDescription = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: cn("text-sm text-muted-foreground", className), ...props })
);
CardDescription.displayName = "CardDescription";
const CardContent = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: cn("p-6 pt-0", className), ...props })
);
CardContent.displayName = "CardContent";
const CardFooter = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: cn("flex items-center p-6 pt-0", className), ...props })
);
CardFooter.displayName = "CardFooter";
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = reactExports.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Comp, { className: cn(buttonVariants({ variant, size, className })), ref, ...props });
  }
);
Button.displayName = "Button";
const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({ className, variant, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn(badgeVariants({ variant }), className), ...props });
}
const Progress = reactExports.forwardRef(({ className, value, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Root$1,
  {
    ref,
    className: cn("relative h-2 w-full overflow-hidden rounded-full bg-primary/20", className),
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Indicator,
      {
        className: "h-full w-full flex-1 bg-primary transition-all",
        style: { transform: `translateX(-${100 - (value || 0)}%)` }
      }
    )
  }
));
Progress.displayName = Root$1.displayName;
const Tabs = Root2;
const TabsList = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  List,
  {
    ref,
    className: cn(
      "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      className
    ),
    ...props
  }
));
TabsList.displayName = List.displayName;
const TabsTrigger = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Trigger,
  {
    ref,
    className: cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
      className
    ),
    ...props
  }
));
TabsTrigger.displayName = Trigger.displayName;
const TabsContent = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Content,
  {
    ref,
    className: cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    ),
    ...props
  }
));
TabsContent.displayName = Content.displayName;
const Route$e = createFileRoute("/_authenticated/rewinder")({
  head: () => ({ meta: [{ title: "Rewinder — Tactifin" }] }),
  component: RewinderPage
});
function fmt$1(n) {
  return new Intl.NumberFormat(void 0, { style: "currency", currency: "USD" }).format(n);
}
function monthKey(dateStr) {
  return dateStr.slice(0, 7);
}
function monthLabel(key) {
  const [y, m] = key.split("-");
  return new Date(Number(y), Number(m) - 1, 1).toLocaleString("default", { month: "short", year: "numeric" });
}
const MONTHS_SHOWN = 6;
function RewinderPage() {
  const { data: txns = [] } = useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const { data, error } = await supabase.from("transactions").select("*").order("transaction_date", { ascending: true });
      if (error) throw error;
      return data;
    }
  });
  const monthlySummary = reactExports.useMemo(() => {
    const map = {};
    for (const t of txns) {
      const key = monthKey(t.transaction_date);
      if (!map[key]) map[key] = { income: 0, expenses: 0, categories: {} };
      if (t.type === "income") map[key].income += Number(t.amount);
      else {
        map[key].expenses += Number(t.amount);
        map[key].categories[t.category] = (map[key].categories[t.category] ?? 0) + Number(t.amount);
      }
    }
    return map;
  }, [txns]);
  const sortedMonths = Object.keys(monthlySummary).sort();
  const [offset, setOffset] = reactExports.useState(0);
  const displayMonths = sortedMonths.slice(
    Math.max(0, sortedMonths.length - MONTHS_SHOWN - offset),
    sortedMonths.length - offset || void 0
  );
  const canGoBack = sortedMonths.length > MONTHS_SHOWN + offset;
  const canGoForward = offset > 0;
  const chartData = displayMonths.map((key) => ({
    month: monthLabel(key),
    Income: monthlySummary[key].income,
    Expenses: monthlySummary[key].expenses,
    Net: monthlySummary[key].income - monthlySummary[key].expenses
  }));
  const allCategoryTotals = {};
  for (const t of txns) {
    if (t.type === "expense") {
      allCategoryTotals[t.category] = (allCategoryTotals[t.category] ?? 0) + Number(t.amount);
    }
  }
  const totalExpenses = Object.values(allCategoryTotals).reduce((a, b) => a + b, 0);
  const sortedCategories = Object.entries(allCategoryTotals).sort((a, b) => b[1] - a[1]);
  const runningData = reactExports.useMemo(() => {
    let balance = 0;
    const monthly = {};
    for (const t of txns) {
      const key = monthKey(t.transaction_date);
      balance += t.type === "income" ? Number(t.amount) : -Number(t.amount);
      monthly[key] = balance;
    }
    return Object.keys(monthly).sort().map((key) => ({ month: monthLabel(key), Balance: monthly[key] }));
  }, [txns]);
  const latestKey = sortedMonths[sortedMonths.length - 1];
  const prevKey = sortedMonths[sortedMonths.length - 2];
  const latestData = latestKey ? monthlySummary[latestKey] : null;
  const prevData = prevKey ? monthlySummary[prevKey] : null;
  const expenseChange = latestData && prevData ? latestData.expenses - prevData.expenses : null;
  const incomeChange = latestData && prevData ? latestData.income - prevData.income : null;
  if (txns.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl", children: "Rewinder" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Replay and analyse your financial history month by month." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex flex-col items-center gap-3 py-16 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-10 w-10 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "No transactions yet. Add some from the Transactions page to rewind your history." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/transactions", children: "Go to Transactions" }) })
      ] }) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl", children: "Rewinder" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Replay and analyse your financial history — income, expenses, and net worth month by month." })
    ] }),
    latestKey && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-xs font-medium text-muted-foreground", children: [
          "Income — ",
          monthLabel(latestKey)
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-semibold text-emerald-500", children: fmt$1(latestData?.income ?? 0) }),
          incomeChange !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `mt-1 flex items-center gap-1 text-xs ${incomeChange >= 0 ? "text-emerald-500" : "text-rose-500"}`, children: [
            incomeChange >= 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-3 w-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { className: "h-3 w-3" }),
            fmt$1(Math.abs(incomeChange)),
            " vs prev month"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-xs font-medium text-muted-foreground", children: [
          "Expenses — ",
          monthLabel(latestKey)
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-semibold text-rose-500", children: fmt$1(latestData?.expenses ?? 0) }),
          expenseChange !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `mt-1 flex items-center gap-1 text-xs ${expenseChange <= 0 ? "text-emerald-500" : "text-rose-500"}`, children: [
            expenseChange <= 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { className: "h-3 w-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-3 w-3" }),
            fmt$1(Math.abs(expenseChange)),
            " vs prev month"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-xs font-medium text-muted-foreground", children: [
          "Net — ",
          monthLabel(latestKey)
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `text-2xl font-semibold ${(latestData?.income ?? 0) - (latestData?.expenses ?? 0) >= 0 ? "text-foreground" : "text-rose-500"}`, children: fmt$1((latestData?.income ?? 0) - (latestData?.expenses ?? 0)) }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "monthly", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "monthly", children: "Monthly overview" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "balance", children: "Running balance" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "categories", children: "Category breakdown" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "monthly", className: "mt-4 space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Income vs Expenses" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", disabled: !canGoBack, onClick: () => setOffset((o) => o + 1), children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground px-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "inline h-3 w-3 mr-1" }),
              "Last ",
              MONTHS_SHOWN,
              " months"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", disabled: !canGoForward, onClick: () => setOffset((o) => o - 1), children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: chartData.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Not enough data." }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 280, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: chartData, margin: { top: 4, right: 16, bottom: 0, left: 0 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "var(--color-border)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "month", tick: { fontSize: 11, fill: "var(--color-muted-foreground)" } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tick: { fontSize: 11, fill: "var(--color-muted-foreground)" }, tickFormatter: (v) => `$${(v / 1e3).toFixed(0)}k` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Tooltip,
            {
              contentStyle: { background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 },
              formatter: (v) => fmt$1(v)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, { wrapperStyle: { fontSize: 12 } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "Income", fill: "oklch(0.6 0.18 145)", radius: [4, 4, 0, 0] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "Expenses", fill: "oklch(0.65 0.2 25)", radius: [4, 4, 0, 0] })
        ] }) }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "balance", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Running balance over time" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: runningData.length < 2 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Need at least 2 months of data to plot." }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 280, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(LineChart, { data: runningData, margin: { top: 4, right: 16, bottom: 0, left: 0 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "var(--color-border)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "month", tick: { fontSize: 11, fill: "var(--color-muted-foreground)" } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tick: { fontSize: 11, fill: "var(--color-muted-foreground)" }, tickFormatter: (v) => `$${(v / 1e3).toFixed(0)}k` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Tooltip,
            {
              contentStyle: { background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 },
              formatter: (v) => fmt$1(v)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Line, { type: "monotone", dataKey: "Balance", stroke: "oklch(0.78 0.22 145)", strokeWidth: 2, dot: { r: 3 } })
        ] }) }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "categories", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "All-time expense breakdown by category" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-3", children: sortedCategories.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No expense data yet." }) : sortedCategories.map(([cat, total]) => {
          const pct = totalExpenses > 0 ? total / totalExpenses * 100 : 0;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: cat }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "tabular-nums", children: [
                fmt$1(total),
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground text-xs", children: [
                  "(",
                  pct.toFixed(1),
                  "%)"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: pct, className: "h-1.5" })
          ] }, cat);
        }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl mb-4", children: "Monthly breakdown" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 md:grid-cols-2 xl:grid-cols-3", children: [...sortedMonths].reverse().map((key) => {
        const { income, expenses, categories } = monthlySummary[key];
        const net = income - expenses;
        const topCat = Object.entries(categories).sort((a, b) => b[1] - a[1])[0];
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "group relative overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-elegant", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -right-8 -top-8 h-20 w-20 rounded-full bg-brand-gradient opacity-0 blur-2xl transition-all duration-300 group-hover:opacity-15" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: monthLabel(key) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `text-base font-medium ${net >= 0 ? "text-emerald-500" : "text-rose-500"}`, children: [
              net >= 0 ? "+" : "",
              fmt$1(net)
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-3 w-3 text-emerald-500" }),
                " Income"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-emerald-500", children: fmt$1(income) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { className: "h-3 w-3 text-rose-500" }),
                " Expenses"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-rose-500", children: fmt$1(expenses) })
            ] }),
            topCat && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-1 text-xs text-muted-foreground", children: [
              "Top spend: ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: topCat[0] }),
              " (",
              fmt$1(topCat[1]),
              ")"
            ] })
          ] })
        ] }, key);
      }) })
    ] })
  ] });
}
const Input = reactExports.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";
const Route$d = createFileRoute("/_authenticated/news")({
  head: () => ({ meta: [{ title: "Financial Tips & News — Tactifin" }] }),
  component: NewsPage
});
const CATEGORIES = ["All", "Tips", "Markets", "Islamic Finance", "Tax", "Savings"];
const TIPS = [
  {
    category: "Tips",
    title: "The 50/30/20 Rule: A Simple Budget Framework",
    summary: "Allocate 50% of take-home pay to needs, 30% to wants, and 20% to savings or debt repayment. This flexible rule works across most income levels and is a solid starting point before you fine-tune with Tactifin's budget tracker.",
    icon: DollarSign,
    readTime: "2 min",
    tags: ["Budgeting", "Beginner"]
  },
  {
    category: "Islamic Finance",
    title: "Understanding Riba: Why Interest Matters in Islamic Finance",
    summary: "Riba (interest) is prohibited in Islamic law. This applies to bank savings interest, credit card charges, and certain investment products. Tactifin's compliance checker flags these automatically so you stay on track.",
    icon: CircleAlert,
    readTime: "3 min",
    tags: ["Shariah", "Banking"]
  },
  {
    category: "Markets",
    title: "Dollar-Cost Averaging: Reduce Risk in Volatile Markets",
    summary: "Investing a fixed amount at regular intervals — regardless of price — smooths out market volatility over time. It removes the pressure of timing the market and is suitable for long-term wealth building.",
    icon: TrendingUp,
    readTime: "3 min",
    tags: ["Investing", "Strategy"]
  },
  {
    category: "Tax",
    title: "5 Deductions Most People Miss on Their Tax Return",
    summary: "Home office expenses, professional development costs, charitable donations, health insurance premiums (if self-employed), and student loan interest are frequently overlooked. Use Tactifin's tax estimator to see how each impacts your bill.",
    icon: DollarSign,
    readTime: "4 min",
    tags: ["Tax", "Savings"]
  },
  {
    category: "Savings",
    title: "Building a 6-Month Emergency Fund: Step by Step",
    summary: "Start by calculating three months of essential expenses (rent, food, utilities). Open a separate high-yield savings account. Automate a fixed transfer each payday. Tactifin's Goals feature tracks progress and surfaces how close you are in real time.",
    icon: TrendingUp,
    readTime: "3 min",
    tags: ["Emergency Fund", "Goals"]
  },
  {
    category: "Islamic Finance",
    title: "Calculating Your Zakat: A Practical Guide",
    summary: "Zakat is 2.5% of wealth held above the nisab threshold for one lunar year. Eligible assets include cash, gold, silver, and tradeable investments. Debts you owe are subtracted. Tactifin's Zakat calculator does this automatically.",
    icon: CircleAlert,
    readTime: "4 min",
    tags: ["Zakat", "Shariah"]
  },
  {
    category: "Tips",
    title: "Automate Your Finances: Set It and Forget It",
    summary: "Automate savings transfers, bill payments, and investment contributions on payday. Removing the manual decision reduces the chance of overspending and builds wealth passively. Tactifin's auto-reminders keep you on schedule.",
    icon: DollarSign,
    readTime: "2 min",
    tags: ["Automation", "Productivity"]
  },
  {
    category: "Markets",
    title: "What Is a Credit Score and How to Improve It",
    summary: "Your credit score (300–850) affects loan rates, rental applications, and sometimes employment. The biggest drivers: on-time payment history (35%), credit utilisation (30%), and account age (15%). Use Tactifin's credit monitor to simulate improvements.",
    icon: TrendingUp,
    readTime: "3 min",
    tags: ["Credit", "Borrowing"]
  },
  {
    category: "Tax",
    title: "Freelancers & Self-Employed: Estimated Tax Basics",
    summary: "If you earn self-employment income, the IRS expects quarterly estimated tax payments. Under-paying can trigger penalties. Tactifin's tax estimator calculates your likely quarterly obligation so you're never caught off guard.",
    icon: BookOpen,
    readTime: "5 min",
    tags: ["Freelance", "Tax"]
  }
];
const NEWS = [
  {
    category: "Markets",
    title: "Global Markets Digest: Key Trends This Week",
    summary: "Central banks in multiple economies are holding rates steady as inflation data shows signs of cooling. Equity markets responded positively, with technology and consumer discretionary sectors leading gains.",
    icon: TrendingUp,
    readTime: "2 min",
    tags: ["Markets", "Macro"],
    date: "Jun 9, 2026"
  },
  {
    category: "Islamic Finance",
    title: "Sukuk Issuance Hits Record Levels in 2026",
    summary: "Global sukuk (Islamic bond) issuance has surpassed previous records this year, driven by sovereign issuers in the Gulf and Southeast Asia. Demand from institutional investors seeking Shariah-compliant fixed income continues to rise.",
    icon: CircleAlert,
    readTime: "3 min",
    tags: ["Sukuk", "Islamic Finance"],
    date: "Jun 7, 2026"
  },
  {
    category: "Tax",
    title: "IRS Announces Inflation-Adjusted Tax Brackets for 2026",
    summary: "The IRS has released updated tax bracket thresholds, adjusted upward to account for inflation. Standard deductions also increased. Taxpayers in all brackets will see modest reductions in effective tax rates.",
    icon: DollarSign,
    readTime: "3 min",
    tags: ["Tax", "IRS"],
    date: "Jun 5, 2026"
  }
];
function NewsPage() {
  const [activeCategory, setActiveCategory] = reactExports.useState("All");
  const [search, setSearch] = reactExports.useState("");
  const [newsletterEmail, setNewsletterEmail] = reactExports.useState("");
  const subscribeMutation = useMutation({
    mutationFn: async (email) => {
      const { data: { user } } = await supabase.auth.getUser();
      const { error } = await supabase.from("newsletter_subscribers").upsert(
        { email, user_id: user?.id ?? null },
        { onConflict: "email" }
      );
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Subscribed successfully");
      setNewsletterEmail("");
    },
    onError: () => toast.error("Could not subscribe. Please try again.")
  });
  function handleSubscribe(e) {
    e.preventDefault();
    const trimmed = newsletterEmail.trim();
    if (!trimmed || !trimmed.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    subscribeMutation.mutate(trimmed);
  }
  const allItems = [...TIPS.map((t) => ({ ...t, type: "tip" })), ...NEWS.map((n) => ({ ...n, type: "news" }))];
  const filtered = allItems.filter((item) => {
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    const matchesSearch = !search || item.title.toLowerCase().includes(search.toLowerCase()) || item.summary.toLowerCase().includes(search.toLowerCase()) || item.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchesCategory && matchesSearch;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl", children: "Financial Tips & News" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Curated insights to help you make smarter financial decisions." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 sm:flex-row sm:items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Search tips and news…",
            value: search,
            onChange: (e) => setSearch(e.target.value),
            className: "pl-9"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          size: "sm",
          variant: activeCategory === cat ? "default" : "outline",
          onClick: () => setActiveCategory(cat),
          className: "rounded-full",
          children: cat
        },
        cat
      )) })
    ] }),
    filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No results found. Try a different filter or search term." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 md:grid-cols-2 xl:grid-cols-3", children: filtered.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Card,
      {
        className: "group relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-elegant",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -right-10 -top-10 h-24 w-24 rounded-full bg-brand-gradient opacity-0 blur-2xl transition-all duration-300 group-hover:opacity-15" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-[color:var(--surface-elevated)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { className: "h-4 w-4 text-[color:var(--brand-bolt)]" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1", children: item.tags.slice(0, 2).map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-[10px]", children: tag }, tag)) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "mt-3 text-base leading-snug", children: item.title })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: item.summary }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                item.readTime,
                " read"
              ] }),
              "date" in item && item.date && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item.date })
            ] })
          ] })
        ]
      },
      idx
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-[color:var(--brand-bolt)]/30 bg-[color:var(--brand-bolt)]/5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex flex-col items-start justify-between gap-4 pt-6 sm:flex-row sm:items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-4 w-4 text-[color:var(--brand-bolt)]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: "Financial Tips Newsletter" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "Get curated tips, market updates and Islamic finance insights delivered weekly." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubscribe, className: "flex items-center gap-2 w-full sm:w-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "email",
            placeholder: "your@email.com",
            className: "text-sm",
            value: newsletterEmail,
            onChange: (e) => setNewsletterEmail(e.target.value),
            disabled: subscribeMutation.isPending
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", size: "sm", className: "shrink-0", disabled: subscribeMutation.isPending, children: subscribeMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : "Subscribe" })
      ] })
    ] }) })
  ] });
}
const Route$c = createFileRoute("/_authenticated/learn")({
  head: () => ({ meta: [{ title: "Learning Resources — Tactifin" }] }),
  component: LearnPage
});
const COURSES = [
  {
    id: 1,
    title: "Personal Finance 101",
    description: "Master the fundamentals — budgeting, saving, debt management and building an emergency fund.",
    icon: Wallet,
    level: "Beginner",
    duration: "45 min",
    lessons: 6,
    tags: ["Budgeting", "Savings", "Debt"],
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    lessons_list: [
      { title: "Why budgeting matters", duration: "5 min" },
      { title: "The 50/30/20 rule", duration: "7 min" },
      { title: "Setting up an emergency fund", duration: "8 min" },
      { title: "Understanding debt types", duration: "10 min" },
      { title: "Credit cards: friend or foe?", duration: "8 min" },
      { title: "Automating your finances", duration: "7 min" }
    ]
  },
  {
    id: 2,
    title: "Islamic Finance Fundamentals",
    description: "Understand Shariah-compliant finance: Riba, Zakat, Halal investing, Sukuk and more.",
    icon: ShieldCheck,
    level: "Beginner",
    duration: "60 min",
    lessons: 7,
    tags: ["Islamic Finance", "Shariah", "Zakat"],
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    lessons_list: [
      { title: "What is Shariah-compliant finance?", duration: "8 min" },
      { title: "Riba explained — why interest is prohibited", duration: "10 min" },
      { title: "Calculating Zakat step by step", duration: "10 min" },
      { title: "Halal vs Haram investments", duration: "9 min" },
      { title: "Sukuk: Islamic bonds", duration: "8 min" },
      { title: "Islamic mortgages (Murabaha)", duration: "8 min" },
      { title: "Using Tactifin's compliance checker", duration: "7 min" }
    ]
  },
  {
    id: 3,
    title: "Investing for Beginners",
    description: "From index funds to ETFs — learn how to start investing with confidence regardless of your starting amount.",
    icon: TrendingUp,
    level: "Beginner",
    duration: "55 min",
    lessons: 6,
    tags: ["Investing", "ETFs", "Portfolio"],
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    lessons_list: [
      { title: "Why invest at all?", duration: "6 min" },
      { title: "Risk vs return explained", duration: "9 min" },
      { title: "Index funds vs active funds", duration: "10 min" },
      { title: "Dollar-cost averaging", duration: "8 min" },
      { title: "Building a diversified portfolio", duration: "12 min" },
      { title: "Common investing mistakes", duration: "10 min" }
    ]
  },
  {
    id: 4,
    title: "Goal-Based Saving Strategies",
    description: "Practical techniques for saving towards specific goals — house deposit, education, retirement, and more.",
    icon: Target,
    level: "Intermediate",
    duration: "40 min",
    lessons: 5,
    tags: ["Goals", "Savings", "Planning"],
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    lessons_list: [
      { title: "Defining your financial goals", duration: "7 min" },
      { title: "Short, medium and long-term buckets", duration: "8 min" },
      { title: "High-yield savings accounts", duration: "8 min" },
      { title: "Saving for a house deposit", duration: "9 min" },
      { title: "Retirement planning basics", duration: "8 min" }
    ]
  },
  {
    id: 5,
    title: "Understanding Your Credit",
    description: "Deep dive into how credit scores work, what damages them, and proven strategies to improve yours.",
    icon: TrendingUp,
    level: "Intermediate",
    duration: "35 min",
    lessons: 5,
    tags: ["Credit", "Score", "Borrowing"],
    color: "text-rose-500",
    bgColor: "bg-rose-500/10",
    lessons_list: [
      { title: "How credit scores are calculated", duration: "8 min" },
      { title: "Reading your credit report", duration: "7 min" },
      { title: "Factors that hurt your score", duration: "7 min" },
      { title: "Building credit from scratch", duration: "7 min" },
      { title: "Using credit cards responsibly", duration: "6 min" }
    ]
  },
  {
    id: 6,
    title: "Tax Efficiency for Individuals",
    description: "Legal strategies to reduce your tax bill — deductions, credits, retirement accounts and filing tips.",
    icon: BookOpen,
    level: "Advanced",
    duration: "50 min",
    lessons: 6,
    tags: ["Tax", "Deductions", "Planning"],
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
    lessons_list: [
      { title: "Understanding tax brackets", duration: "8 min" },
      { title: "Above-the-line deductions", duration: "9 min" },
      { title: "Itemising vs standard deduction", duration: "8 min" },
      { title: "Tax-advantaged accounts (401k, IRA, HSA)", duration: "10 min" },
      { title: "Estimated quarterly taxes", duration: "8 min" },
      { title: "Working with a tax professional", duration: "7 min" }
    ]
  }
];
const GLOSSARY = [
  { term: "Riba", def: "Arabic for usury or interest. Prohibited in Islamic finance as it is considered exploitative." },
  { term: "Zakat", def: "One of the Five Pillars of Islam — an annual charitable donation of 2.5% on wealth exceeding the nisab." },
  { term: "Nisab", def: "The minimum threshold of wealth above which Zakat becomes obligatory (approx. the value of 85g of gold)." },
  { term: "Sukuk", def: "Islamic financial certificates equivalent to bonds, structured to comply with Shariah law (no interest)." },
  { term: "Murabaha", def: "A cost-plus financing arrangement used in Islamic mortgages and trade finance, avoiding interest." },
  { term: "Dollar-Cost Averaging", def: "Investing a fixed amount at regular intervals regardless of price, reducing the impact of volatility." },
  { term: "ETF", def: "Exchange-Traded Fund — a basket of securities traded on an exchange, typically with low fees." },
  { term: "Credit Utilisation", def: "The ratio of your current credit card balances to your total credit limits. Keeping it under 30% helps your score." },
  { term: "Emergency Fund", def: "3–6 months of essential living expenses held in liquid, accessible savings as a financial safety net." },
  { term: "Net Worth", def: "Total assets (what you own) minus total liabilities (what you owe). The core measure of financial health." },
  { term: "Progressive Tax", def: "A tax system where higher income is taxed at higher rates, applied in brackets." },
  { term: "Index Fund", def: "A fund that tracks a market index (e.g. S&P 500), offering broad diversification at low cost." }
];
function buildProgressSet(rows) {
  return new Set(rows.map((r) => `${r.course_id}:${r.lesson_index}`));
}
function CourseCard({
  course,
  completedLessons,
  onOpen
}) {
  const pct = course.lessons > 0 ? Math.round(completedLessons / course.lessons * 100) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Card,
    {
      className: "group relative overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-elegant",
      onClick: onOpen,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -right-10 -top-10 h-24 w-24 rounded-full bg-brand-gradient opacity-0 blur-2xl transition-all duration-300 group-hover:opacity-15" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border/60 ${course.bgColor}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(course.icon, { className: `h-5 w-5 ${course.color}` }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-[10px]", children: course.level })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "mt-3 text-base leading-snug", children: course.title })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: course.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1", children: course.tags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-[10px]", children: tag }, tag)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }),
                " ",
                course.duration
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                completedLessons,
                "/",
                course.lessons,
                " lessons"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: pct, className: "h-1.5" }),
            pct === 100 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs text-emerald-500", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-3 w-3" }),
              " Complete"
            ] }) : pct > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-[color:var(--brand-bolt)]", children: [
              pct,
              "% complete — keep going"
            ] }) : null
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", className: "w-full", variant: pct === 0 ? "default" : "outline", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlay, { className: "mr-1.5 h-4 w-4" }),
            pct === 0 ? "Start course" : pct === 100 ? "Review" : "Continue"
          ] })
        ] })
      ]
    }
  );
}
function CourseDetail({
  course,
  progressSet,
  onBack,
  onCompleteLesson,
  isSaving
}) {
  const completedLessons = course.lessons_list.filter((_, i) => progressSet.has(`${course.id}:${i}`)).length;
  const pct = course.lessons > 0 ? Math.round(completedLessons / course.lessons * 100) : 0;
  const nextLessonIndex = course.lessons_list.findIndex((_, i) => !progressSet.has(`${course.id}:${i}`));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", onClick: onBack, children: "← Back" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl", children: course.title })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-6 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-4 text-sm text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4" }),
          " ",
          course.duration
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-4 w-4" }),
          " ",
          course.lessons,
          " lessons"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: course.level })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: course.description }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            completedLessons,
            " of ",
            course.lessons,
            " completed"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            pct,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: pct })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: course.lessons_list.map((lesson, i) => {
      const done = progressSet.has(`${course.id}:${i}`);
      const isNext = i === nextLessonIndex;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          onClick: () => {
            if (isNext && !isSaving) onCompleteLesson(course.id, i);
          },
          className: `flex items-center gap-3 rounded-xl border p-4 transition-smooth ${done ? "border-emerald-500/30 bg-emerald-500/5" : isNext ? "border-[color:var(--brand-bolt)]/40 bg-[color:var(--brand-bolt)]/5 cursor-pointer hover:border-[color:var(--brand-bolt)]" : "border-border/60 bg-card"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0", children: done ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-5 w-5 text-emerald-500" }) : isNext ? isSaving ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-5 w-5 animate-spin text-[color:var(--brand-bolt)]" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlay, { className: "h-5 w-5 text-[color:var(--brand-bolt)]" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-5 w-5 text-muted-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `text-sm font-medium ${done ? "line-through text-muted-foreground" : ""}`, children: lesson.title }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs text-muted-foreground shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }),
              " ",
              lesson.duration
            ] })
          ]
        },
        i
      );
    }) })
  ] });
}
function LearnPage() {
  const qc = useQueryClient();
  const [selectedCourse, setSelectedCourse] = reactExports.useState(null);
  const [glossarySearch, setGlossarySearch] = reactExports.useState("");
  const { data: progressRows = [], isLoading: loadingProgress } = useQuery({
    queryKey: ["learn_progress"],
    queryFn: async () => {
      const { data, error } = await supabase.from("learn_progress").select("course_id, lesson_index");
      if (error) throw error;
      return data ?? [];
    }
  });
  const progressSet = buildProgressSet(progressRows);
  const completeMutation = useMutation({
    mutationFn: async ({ courseId, lessonIndex }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");
      const { error } = await supabase.from("learn_progress").upsert(
        { user_id: user.id, course_id: courseId, lesson_index: lessonIndex },
        { onConflict: "user_id,course_id,lesson_index" }
      );
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["learn_progress"] });
    },
    onError: () => {
    }
  });
  function handleCompleteLesson(courseId, lessonIndex) {
    completeMutation.mutate({ courseId, lessonIndex });
  }
  const totalLessons = COURSES.reduce((a, c) => a + c.lessons, 0);
  const doneLessons = progressRows.length;
  const overallPct = totalLessons > 0 ? Math.round(doneLessons / totalLessons * 100) : 0;
  const filteredGlossary = GLOSSARY.filter(
    (g) => !glossarySearch || g.term.toLowerCase().includes(glossarySearch.toLowerCase()) || g.def.toLowerCase().includes(glossarySearch.toLowerCase())
  );
  if (selectedCourse) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      CourseDetail,
      {
        course: selectedCourse,
        progressSet,
        onBack: () => setSelectedCourse(null),
        onCompleteLesson: handleCompleteLesson,
        isSaving: completeMutation.isPending
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl", children: "Learning Resources" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Bite-sized courses to build your financial literacy — from budgeting basics to Islamic finance." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-[color:var(--brand-bolt)]/30 bg-[color:var(--brand-bolt)]/5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex flex-col gap-4 pt-6 sm:flex-row sm:items-center sm:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-4 w-4 text-[color:var(--brand-bolt)]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: "Your learning progress" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: loadingProgress ? "Loading…" : `${doneLessons} of ${totalLessons} lessons completed across ${COURSES.length} courses` })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:w-48 space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Overall" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            overallPct,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: overallPct, className: "h-2" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "courses", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "courses", children: "Courses" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "glossary", children: "Glossary" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "courses", className: "mt-4", children: loadingProgress ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
        " Loading progress…"
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 md:grid-cols-2 xl:grid-cols-3", children: COURSES.map((course) => {
        const completed = course.lessons_list.filter((_, i) => progressSet.has(`${course.id}:${i}`)).length;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          CourseCard,
          {
            course,
            completedLessons: completed,
            onOpen: () => setSelectedCourse(course)
          },
          course.id
        );
      }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "glossary", className: "mt-4 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              placeholder: "Search terms…",
              value: glossarySearch,
              onChange: (e) => setGlossarySearch(e.target.value),
              className: "flex h-9 w-full rounded-lg border border-input bg-background pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 md:grid-cols-2", children: [
          filteredGlossary.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border/60", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-4 pb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-[color:var(--brand-bolt)]", children: g.term }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: g.def })
          ] }) }, g.term)),
          filteredGlossary.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground col-span-2", children: "No matching terms found." })
        ] })
      ] })
    ] })
  ] });
}
const $$splitComponentImporter$a = () => import("./goals-Bf3YQenU.mjs");
const Route$b = createFileRoute("/_authenticated/goals")({
  head: () => ({
    meta: [{
      title: "Goals — Tactifin"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./compliance-C-bQmh7c.mjs");
const Route$a = createFileRoute("/_authenticated/compliance")({
  head: () => ({
    meta: [{
      title: "Compliance — Tactifin"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./chat-MdPRg94v.mjs");
const Route$9 = createFileRoute("/_authenticated/chat")({
  head: () => ({
    meta: [{
      title: "AI Assistant — Tactifin"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./calculators-b0_UnWp2.mjs");
const Route$8 = createFileRoute("/_authenticated/calculators")({
  head: () => ({
    meta: [{
      title: "Calculators — Tactifin"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./budgets-DE6ZQt7i.mjs");
const Route$7 = createFileRoute("/_authenticated/budgets")({
  head: () => ({
    meta: [{
      title: "Budgets — Tactifin"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);
const Label = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Root$2, { ref, className: cn(labelVariants(), className), ...props }));
Label.displayName = Root$2.displayName;
const Select = Select$1;
const SelectValue = SelectValue$1;
const SelectTrigger = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  SelectTrigger$1,
  {
    ref,
    className: cn(
      "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background cursor-pointer data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectIcon, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4 opacity-50" }) })
    ]
  }
));
SelectTrigger.displayName = SelectTrigger$1.displayName;
const SelectScrollUpButton = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  SelectScrollUpButton$1,
  {
    ref,
    className: cn("flex cursor-default items-center justify-center py-1", className),
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "h-4 w-4" })
  }
));
SelectScrollUpButton.displayName = SelectScrollUpButton$1.displayName;
const SelectScrollDownButton = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  SelectScrollDownButton$1,
  {
    ref,
    className: cn("flex cursor-default items-center justify-center py-1", className),
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4" })
  }
));
SelectScrollDownButton.displayName = SelectScrollDownButton$1.displayName;
const SelectContent = reactExports.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectPortal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
  SelectContent$1,
  {
    ref,
    className: cn(
      "relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-select-content-transform-origin)",
      position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
      className
    ),
    position,
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectScrollUpButton, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SelectViewport,
        {
          className: cn(
            "p-1",
            position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          ),
          children
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectScrollDownButton, {})
    ]
  }
) }));
SelectContent.displayName = SelectContent$1.displayName;
const SelectLabel = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  SelectLabel$1,
  {
    ref,
    className: cn("px-2 py-1.5 text-sm font-semibold", className),
    ...props
  }
));
SelectLabel.displayName = SelectLabel$1.displayName;
const SelectItem = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  SelectItem$1,
  {
    ref,
    className: cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItemIndicator, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItemText, { children })
    ]
  }
));
SelectItem.displayName = SelectItem$1.displayName;
const SelectSeparator = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  SelectSeparator$1,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
SelectSeparator.displayName = SelectSeparator$1.displayName;
const Dialog = Root;
const DialogTrigger = Trigger$1;
const DialogPortal = Portal;
const DialogOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = Overlay.displayName;
const DialogContent = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Content$1,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = Content$1.displayName;
const DialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className), ...props });
DialogHeader.displayName = "DialogHeader";
const DialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "div",
  {
    className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
    ...props
  }
);
DialogFooter.displayName = "DialogFooter";
const DialogTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Title,
  {
    ref,
    className: cn("text-lg font-semibold leading-none tracking-tight", className),
    ...props
  }
));
DialogTitle.displayName = Title.displayName;
const DialogDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = Description.displayName;
const Route$6 = createFileRoute("/_authenticated/bills")({
  head: () => ({ meta: [{ title: "Bill Pay — Tactifin" }] }),
  component: BillsPage
});
const BILL_CATEGORIES = [
  { label: "Electricity", icon: Zap },
  { label: "Internet", icon: Wifi },
  { label: "Water", icon: Droplets },
  { label: "Rent / Mortgage", icon: House },
  { label: "Phone", icon: Phone },
  { label: "Credit Card", icon: CreditCard },
  { label: "Other", icon: CreditCard }
];
const RECURRINGS = ["monthly", "quarterly", "annually", "one-time"];
const PAYMENT_METHODS = [
  { value: "bkash", label: "bKash" },
  { value: "cash_on_delivery", label: "Cash on Delivery" },
  { value: "other", label: "Other" }
];
const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
function getStatus(dueDate, paid) {
  if (paid) return "paid";
  if (dueDate < today) return "overdue";
  if (dueDate === today) return "due-today";
  return "upcoming";
}
const STATUS_CONFIG = {
  "due-today": { label: "Due today", color: "text-amber-500 bg-amber-500/10 border-amber-500/30", icon: CircleAlert },
  overdue: { label: "Overdue", color: "text-rose-500 bg-rose-500/10 border-rose-500/30", icon: CircleAlert },
  upcoming: { label: "Upcoming", color: "text-muted-foreground bg-muted border-border", icon: Clock },
  paid: { label: "Paid", color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/30", icon: CircleCheckBig }
};
const PAYMENT_METHOD_LABELS = {
  bkash: "bKash",
  cash_on_delivery: "Cash on Delivery",
  other: "Other"
};
function getCategoryIcon(category) {
  return BILL_CATEGORIES.find((c) => c.label === category)?.icon ?? CreditCard;
}
function fmt(n) {
  return new Intl.NumberFormat(void 0, { style: "currency", currency: "USD" }).format(n);
}
function BillsPage() {
  const qc = useQueryClient();
  const [showForm, setShowForm] = reactExports.useState(false);
  const [filterStatus, setFilterStatus] = reactExports.useState("all");
  const [payingBillId, setPayingBillId] = reactExports.useState(null);
  const [paymentMethod, setPaymentMethod] = reactExports.useState("bkash");
  const [name, setName] = reactExports.useState("");
  const [amount, setAmount] = reactExports.useState("");
  const [dueDate, setDueDate] = reactExports.useState(today);
  const [category, setCategory] = reactExports.useState("Electricity");
  const [recurring, setRecurring] = reactExports.useState("monthly");
  const [autopay, setAutopay] = reactExports.useState(false);
  const { data: bills = [], isLoading } = useQuery({
    queryKey: ["bills"],
    queryFn: async () => {
      const { data, error } = await supabase.from("bills").select("*").order("due_date", { ascending: true });
      if (error) throw error;
      return data ?? [];
    }
  });
  const addMutation = useMutation({
    mutationFn: async (bill) => {
      const { error } = await supabase.from("bills").insert(bill);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["bills"] });
      setName("");
      setAmount("");
      setDueDate(today);
      setCategory("Electricity");
      setRecurring("monthly");
      setAutopay(false);
      setShowForm(false);
      toast.success("Bill added");
    },
    onError: () => toast.error("Failed to add bill")
  });
  const markPaidMutation = useMutation({
    mutationFn: async ({ id, method }) => {
      const { error } = await supabase.from("bills").update({ paid: true, payment_method: method }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["bills"] });
      setPayingBillId(null);
      toast.success("Marked as paid");
    },
    onError: () => toast.error("Failed to update bill")
  });
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from("bills").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["bills"] });
      toast.success("Bill removed");
    },
    onError: () => toast.error("Failed to delete bill")
  });
  async function addBill(e) {
    e.preventDefault();
    if (!name || !amount || !dueDate) return;
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    addMutation.mutate({
      user_id: user.id,
      name,
      amount: Number(amount),
      due_date: dueDate,
      category,
      recurring,
      paid: false,
      autopay,
      payment_method: null
    });
  }
  function openPayDialog(id) {
    setPayingBillId(id);
    setPaymentMethod("bkash");
  }
  function confirmPay() {
    if (!payingBillId) return;
    markPaidMutation.mutate({ id: payingBillId, method: paymentMethod });
  }
  const billsWithStatus = bills.map((b) => ({
    ...b,
    status: getStatus(b.due_date, b.paid)
  }));
  const filtered = billsWithStatus.filter((b) => filterStatus === "all" || b.status === filterStatus);
  const totalDue = billsWithStatus.filter((b) => b.status !== "paid").reduce((a, b) => a + Number(b.amount), 0);
  const overdue = billsWithStatus.filter((b) => b.status === "overdue");
  const dueToday = billsWithStatus.filter((b) => b.status === "due-today");
  const autopayCount = billsWithStatus.filter((b) => b.autopay && b.status !== "paid").length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl", children: "Bill Pay" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Track, schedule and manage all your recurring bills in one place." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => setShowForm((s) => !s), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-1.5 h-4 w-4" }),
        " Add bill"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-xs font-medium text-muted-foreground", children: "Total outstanding" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-semibold text-foreground", children: fmt(totalDue) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-xs font-medium text-muted-foreground", children: "Overdue" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `text-2xl font-semibold ${overdue.length > 0 ? "text-rose-500" : "text-foreground"}`, children: [
          overdue.length,
          " bill",
          overdue.length !== 1 ? "s" : ""
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-xs font-medium text-muted-foreground", children: "Due today" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `text-2xl font-semibold ${dueToday.length > 0 ? "text-amber-500" : "text-foreground"}`, children: [
          dueToday.length,
          " bill",
          dueToday.length !== 1 ? "s" : ""
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-xs font-medium text-muted-foreground", children: "Autopay active" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-semibold text-emerald-500", children: autopayCount }) })
      ] })
    ] }),
    showForm && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Add a bill" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: addBill, className: "grid gap-4 md:grid-cols-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Bill name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { className: "mt-1", required: true, value: name, onChange: (e) => setName(e.target.value), placeholder: "e.g. Netflix" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Amount" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { className: "mt-1", type: "number", step: "0.01", min: "0.01", required: true, value: amount, onChange: (e) => setAmount(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Due date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { className: "mt-1", type: "date", required: true, value: dueDate, onChange: (e) => setDueDate(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Category" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: category, onValueChange: setCategory, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: BILL_CATEGORIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c.label, children: c.label }, c.label)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Recurring" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: recurring, onValueChange: setRecurring, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: RECURRINGS.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: r, children: r }, r)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              id: "autopay",
              checked: autopay,
              onChange: (e) => setAutopay(e.target.checked),
              className: "h-4 w-4 accent-foreground"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "autopay", className: "cursor-pointer", children: "Autopay enabled" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-3 flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", disabled: addMutation.isPending, children: [
            addMutation.isPending && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-1.5 h-4 w-4 animate-spin" }),
            "Save bill"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", onClick: () => setShowForm(false), children: "Cancel" })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: ["all", "due-today", "overdue", "upcoming", "paid"].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        size: "sm",
        variant: filterStatus === s ? "default" : "outline",
        onClick: () => setFilterStatus(s),
        className: "rounded-full capitalize",
        children: s === "all" ? "All" : STATUS_CONFIG[s]?.label ?? s
      },
      s
    )) }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
      " Loading bills…"
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: bills.length === 0 ? "No bills yet. Add one to get started." : "No bills match this filter." }) : filtered.map((bill) => {
      const Icon = getCategoryIcon(bill.category);
      const statusCfg = STATUS_CONFIG[bill.status];
      const StatusIcon = statusCfg.icon;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "group", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex items-center justify-between gap-4 pt-4 pb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 shrink-0 rounded-xl border border-border/60 bg-[color:var(--surface-elevated)] flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4 text-[color:var(--brand-bolt)]" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: bill.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: `text-[10px] border ${statusCfg.color}`, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(StatusIcon, { className: "mr-1 h-2.5 w-2.5" }),
                statusCfg.label
              ] }),
              bill.autopay && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-[10px]", children: "Autopay" }),
              bill.payment_method && bill.paid && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-[10px]", children: PAYMENT_METHOD_LABELS[bill.payment_method] ?? bill.payment_method })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground mt-0.5", children: [
              bill.category,
              " · ",
              bill.recurring,
              " · Due ",
              bill.due_date
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-semibold", children: fmt(Number(bill.amount)) }),
          bill.status !== "paid" && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", onClick: () => openPayDialog(bill.id), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "mr-1 h-3.5 w-3.5 text-emerald-500" }),
            " Mark paid"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => deleteMutation.mutate(bill.id),
              disabled: deleteMutation.isPending,
              className: "text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" })
            }
          )
        ] })
      ] }) }, bill.id);
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!payingBillId, onOpenChange: (open) => {
      if (!open) setPayingBillId(null);
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Select payment method" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-2", children: PAYMENT_METHODS.map((pm) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setPaymentMethod(pm.value),
            className: `flex items-center gap-3 rounded-xl border px-4 py-3 text-sm transition-colors ${paymentMethod === pm.value ? "border-[color:var(--brand-bolt)] bg-[color:var(--brand-bolt)]/10 text-foreground" : "border-border bg-card text-muted-foreground hover:border-border/80 hover:text-foreground"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-3.5 w-3.5 rounded-full border-2 shrink-0 ${paymentMethod === pm.value ? "border-[color:var(--brand-bolt)] bg-[color:var(--brand-bolt)]" : "border-muted-foreground"}` }),
              pm.label
            ]
          },
          pm.value
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              className: "flex-1",
              onClick: confirmPay,
              disabled: markPaidMutation.isPending,
              children: [
                markPaidMutation.isPending && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-1.5 h-4 w-4 animate-spin" }),
                "Confirm payment"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => setPayingBillId(null), children: "Cancel" })
        ] })
      ] })
    ] }) })
  ] });
}
const $$splitComponentImporter$5 = () => import("./app-sTOrJkZI.mjs");
const Route$5 = createFileRoute("/_authenticated/app")({
  head: () => ({
    meta: [{
      title: "Dashboard — Tactifin"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./chat.index-D7IdIMgt.mjs");
const Route$4 = createFileRoute("/_authenticated/chat/")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./chat._threadId-Cg5qZR0Q.mjs");
const Route$3 = createFileRoute("/_authenticated/chat/$threadId")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./admin.users-BO9Bq2I3.mjs");
const Route$2 = createFileRoute("/_authenticated/admin/users")({
  head: () => ({
    meta: [{
      title: "Admin – Users"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./admin.courses-i1_0kHBY.mjs");
const Route$1 = createFileRoute("/_authenticated/admin/courses")({
  head: () => ({
    meta: [{
      title: "Admin – Learning Courses"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./admin.articles-DDNUkvdv.mjs");
const Route = createFileRoute("/_authenticated/admin/articles")({
  head: () => ({
    meta: [{
      title: "Admin – Tips & News"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const AuthRoute = Route$j.update({
  id: "/auth",
  path: "/auth",
  getParentRoute: () => Route$k
});
const AuthenticatedRouteRoute = Route$i.update({
  id: "/_authenticated",
  getParentRoute: () => Route$k
});
const IndexRoute = Route$h.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$k
});
const AuthCallbackRoute = Route$g.update({
  id: "/callback",
  path: "/callback",
  getParentRoute: () => AuthRoute
});
const AuthenticatedTransactionsRoute = Route$f.update({
  id: "/transactions",
  path: "/transactions",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedRewinderRoute = Route$e.update({
  id: "/rewinder",
  path: "/rewinder",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedNewsRoute = Route$d.update({
  id: "/news",
  path: "/news",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedLearnRoute = Route$c.update({
  id: "/learn",
  path: "/learn",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedGoalsRoute = Route$b.update({
  id: "/goals",
  path: "/goals",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedComplianceRoute = Route$a.update({
  id: "/compliance",
  path: "/compliance",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedChatRoute = Route$9.update({
  id: "/chat",
  path: "/chat",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedCalculatorsRoute = Route$8.update({
  id: "/calculators",
  path: "/calculators",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedBudgetsRoute = Route$7.update({
  id: "/budgets",
  path: "/budgets",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedBillsRoute = Route$6.update({
  id: "/bills",
  path: "/bills",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedAppRoute = Route$5.update({
  id: "/app",
  path: "/app",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedChatIndexRoute = Route$4.update({
  id: "/",
  path: "/",
  getParentRoute: () => AuthenticatedChatRoute
});
const AuthenticatedChatThreadIdRoute = Route$3.update({
  id: "/$threadId",
  path: "/$threadId",
  getParentRoute: () => AuthenticatedChatRoute
});
const AuthenticatedAdminUsersRoute = Route$2.update({
  id: "/admin/users",
  path: "/admin/users",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedAdminCoursesRoute = Route$1.update({
  id: "/admin/courses",
  path: "/admin/courses",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedAdminArticlesRoute = Route.update({
  id: "/admin/articles",
  path: "/admin/articles",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedChatRouteChildren = {
  AuthenticatedChatThreadIdRoute,
  AuthenticatedChatIndexRoute
};
const AuthenticatedChatRouteWithChildren = AuthenticatedChatRoute._addFileChildren(AuthenticatedChatRouteChildren);
const AuthenticatedRouteRouteChildren = {
  AuthenticatedAppRoute,
  AuthenticatedBillsRoute,
  AuthenticatedBudgetsRoute,
  AuthenticatedCalculatorsRoute,
  AuthenticatedChatRoute: AuthenticatedChatRouteWithChildren,
  AuthenticatedComplianceRoute,
  AuthenticatedGoalsRoute,
  AuthenticatedLearnRoute,
  AuthenticatedNewsRoute,
  AuthenticatedRewinderRoute,
  AuthenticatedTransactionsRoute,
  AuthenticatedAdminArticlesRoute,
  AuthenticatedAdminCoursesRoute,
  AuthenticatedAdminUsersRoute
};
const AuthenticatedRouteRouteWithChildren = AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren);
const AuthRouteChildren = {
  AuthCallbackRoute
};
const AuthRouteWithChildren = AuthRoute._addFileChildren(AuthRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  AuthenticatedRouteRoute: AuthenticatedRouteRouteWithChildren,
  AuthRoute: AuthRouteWithChildren
};
const routeTree = Route$k._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Button as B,
  Card as C,
  Dialog as D,
  Input as I,
  Label as L,
  Progress as P,
  Route$3 as R,
  Select as S,
  Tabs as T,
  CardHeader as a,
  CardTitle as b,
  cn as c,
  CardContent as d,
  SelectTrigger as e,
  SelectValue as f,
  SelectContent as g,
  SelectItem as h,
  DialogContent as i,
  DialogHeader as j,
  DialogTitle as k,
  DialogFooter as l,
  TabsList as m,
  TabsTrigger as n,
  TabsContent as o,
  DialogTrigger as p,
  Badge as q,
  buttonVariants as r,
  router as s,
  useTheme as u
};
