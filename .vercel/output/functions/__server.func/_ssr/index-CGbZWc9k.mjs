import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useTheme, B as Button, c as cn } from "./router-DLLEZnVG.mjs";
import { T as TactifinLogo } from "./tactifin-logo-qE3sXKy8.mjs";
import { R as Root2, I as Item, H as Header, T as Trigger2, C as Content2 } from "../_libs/radix-ui__react-accordion.mjs";
import "../_libs/sonner.mjs";
import { y as Sun, M as Moon, X, A as Menu, E as Sparkles, F as ArrowRight, T as TrendingUp, G as Brain, e as ShieldCheck, W as Wallet, f as Target, I as ChartLine, U as Users, J as Banknote, k as CreditCard, R as RotateCcw, w as Bot, K as ScanSearch, O as MoonStar, Q as WalletMinimal, V as Play, Y as ArrowUpRight, q as ChevronDown } from "../_libs/lucide-react.mjs";
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
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "./client-C60lNmPB.mjs";
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
import "../_libs/radix-ui__react-collapsible.mjs";
const NAV = [
  { label: "Platform", href: "#platform" },
  { label: "Features", href: "#features" },
  { label: "Intelligence", href: "#ai" },
  { label: "Partners", href: "#partners" },
  { label: "FAQ", href: "#faq" }
];
function SiteHeader() {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/70 backdrop-blur-xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex h-16 max-w-7xl items-center justify-between px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TactifinLogo, { size: 36 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-medium tracking-tight", children: "Tactifin" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "hidden items-center gap-8 md:flex", children: NAV.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: n.href, className: "text-sm text-muted-foreground transition-smooth hover:text-foreground", children: n.label }, n.href)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: toggle,
            "aria-label": "Toggle theme",
            className: "flex h-9 w-9 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-smooth hover:text-foreground hover:bg-accent",
            children: theme === "dark" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { className: "h-4 w-4" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", size: "sm", className: "hidden rounded-full md:inline-flex", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auth", children: "Sign in" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "default", size: "sm", className: "hidden rounded-full md:inline-flex", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/app", children: "Open app" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setOpen((o) => !o),
            className: "flex h-9 w-9 items-center justify-center rounded-full border border-border/60 md:hidden",
            "aria-label": "Menu",
            children: open ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-4 w-4" })
          }
        )
      ] })
    ] }),
    open && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border/40 bg-background/95 backdrop-blur-xl md:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-7xl flex-col gap-2 px-6 py-4", children: [
      NAV.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: n.href,
          onClick: () => setOpen(false),
          className: "rounded-md px-2 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground",
          children: n.label
        },
        n.href
      )),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "mt-2 rounded-full", children: "Join Beta" })
    ] }) })
  ] });
}
function Hero() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden bg-hero pt-32 pb-24", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 grid-noise opacity-50", "aria-hidden": true }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-1/2 top-0 -translate-x-1/2 h-[420px] w-[820px] rounded-full bg-brand-gradient opacity-10 blur-[120px] pointer-events-none", "aria-hidden": true }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto max-w-7xl px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-3xl text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/40 px-4 py-1.5 text-xs text-muted-foreground backdrop-blur", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3 w-3 text-[color:var(--brand-bolt)]" }),
          "AI-native accounting · Now in beta"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-5xl leading-[1.05] md:text-7xl", children: [
          "Accounting,",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic text-brand-gradient", children: "reimagined." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-6 max-w-xl text-base text-muted-foreground md:text-lg", children: "Tactifin unifies tracking, budgeting and Shariah-aware finance into one quiet, intelligent platform — built for the way you actually move money." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 flex flex-wrap items-center justify-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "lg", className: "rounded-full px-8 btn-glow-idle", children: [
            "Get early access ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-1.5 h-4 w-4" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "lg", variant: "ghost", className: "rounded-full px-8 border border-border/60 btn-glow", children: "Explore the platform" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto mt-20 max-w-5xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -inset-x-20 -inset-y-10 bg-brand-gradient opacity-20 blur-3xl", "aria-hidden": true }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative rounded-3xl border border-border/60 bg-card/60 p-2 shadow-elegant backdrop-blur-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-[color:var(--surface-sunken)] p-8 md:p-12", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 md:grid-cols-3", children: [
            { k: "Net worth", v: "$184,920", d: "+12.4%" },
            { k: "This month", v: "$6,240", d: "Under budget" },
            { k: "Zakat estimate", v: "$1,108", d: "Auto-calculated" }
          ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border/60 bg-card p-5 transition-smooth hover:-translate-y-0.5 hover:shadow-elegant", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: s.k }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-2xl", children: s.v }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-xs text-[color:var(--brand-bolt)]", children: s.d })
          ] }, s.k)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex items-center justify-between rounded-xl border border-border/60 bg-card p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TactifinLogo, { size: 40 }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm", children: "AI Categorization" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "14 transactions auto-sorted · 0 review needed" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden gap-2 md:flex", children: ["Food", "Rent", "Business", "Taxi"].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full border border-border/60 px-3 py-1 text-xs text-muted-foreground", children: t }, t)) })
          ] })
        ] }) })
      ] })
    ] })
  ] });
}
const STATS = [
  { icon: TrendingUp, k: "Income & Expense", v: "Real-time tracking", d: "Auto-collect cash in and cash out, categorized by AI the moment it lands." },
  { icon: Brain, k: "ML Budgeting", v: "Predictive control", d: "Personal tax calculation, reminders and goal-based savings tuned to your life." },
  { icon: ShieldCheck, k: "Fraud Detection", v: "Always on", d: "Anomaly alerts, credit-score monitoring and Islamic compliance baked in." }
];
function GrowthSection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "platform", className: "relative border-t border-border/40 bg-[color:var(--surface-sunken)] py-28", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-16 md:grid-cols-2 md:items-end", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-[color:var(--brand-bolt)]" }),
          "The platform"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-4 text-4xl md:text-5xl", children: [
          "Unlock a new phase",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "of ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic text-brand-gradient", children: "financial clarity" }),
          "."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground md:text-lg", children: "One quiet system for accounts, lending, assets and receivables — connected to your bank and mobile wallet, and intelligent enough to stay out of the way." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-16 grid gap-px overflow-hidden rounded-3xl border border-border/60 bg-border/60 md:grid-cols-3", children: STATS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group relative bg-card p-8 transition-smooth hover:bg-[color:var(--surface-elevated)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-0 right-0 h-px bg-brand-gradient opacity-0 transition-smooth group-hover:opacity-60" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: "h-6 w-6 text-[color:var(--brand-bolt)]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 text-xs uppercase tracking-wider text-muted-foreground", children: s.k }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-2xl", children: s.v }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: s.d })
    ] }, s.k)) })
  ] }) });
}
const FEATURES = [
  { icon: Wallet, t: "Accounts & Tracking", d: "Income and expense tracking with auto-collection across cash, bank and mobile wallets." },
  { icon: Target, t: "Goal-Based Savings", d: "Set saving goals and watch progress tracking surface what to do next, automatically." },
  { icon: ChartLine, t: "Investment & Markets", d: "Portfolio trackers and share market updates, in one premium dashboard." },
  { icon: Users, t: "Borrow, Lend & Share", d: "Lending module, accounts receivable and expense sharing — built for people, not just balance sheets." },
  { icon: Banknote, t: "Shariah-Based Finance", d: "Islamic compliance checker with Halal/Haram detection, Zakat alerts and interest-exposure reports." },
  { icon: Sparkles, t: "AI Recommendations", d: "Personalised guidance, fraud detection and an AI chatbot that knows your finances." },
  { icon: CreditCard, t: "Bill Pay System", d: "Track recurring bills, set autopay reminders, and never miss a due date — all categorised automatically." },
  { icon: RotateCcw, t: "Rewinder (Automatics)", d: "Replay your financial history month by month with AI-generated insights and category breakdowns." }
];
function FeaturesGrid() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "features", className: "border-t border-border/40 py-28", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-2xl text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-[color:var(--brand-bolt)]" }),
        "Features"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-4 text-4xl md:text-5xl", children: [
        "Built with accountants,",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic text-brand-gradient", children: "for everyone" }),
        "."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-muted-foreground", children: "A focused set of modules — each one quietly powerful, each one designed to disappear into your day." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3", children: FEATURES.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "article",
      {
        className: "group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-7 transition-smooth hover:border-[color:var(--brand-bolt)]/40 hover:-translate-y-1 hover:shadow-elegant",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -right-12 -top-12 h-32 w-32 rounded-full bg-brand-gradient opacity-0 blur-2xl transition-smooth group-hover:opacity-20" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border/60 bg-[color:var(--surface-elevated)] transition-smooth group-hover:border-[color:var(--brand-bolt)]/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx(f.icon, { className: "h-5 w-5 text-[color:var(--brand-bolt)]" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-5 text-xl", children: f.t }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: f.d })
          ] })
        ]
      },
      f.t
    )) })
  ] }) });
}
const PILLS = [
  "Income/Expense Auto Categorization",
  "Bank & Mobile Wallet Integration",
  "Food · Rent · Business · Taxi",
  "Personal Tax Calculation",
  "ML Budgeting",
  "Automatic Reminders",
  "Fraud Detection",
  "Goal-Based Saving & Progress",
  "Credit Score Monitoring",
  "Interest Detection & Alerts",
  "Halal / Haram Checker",
  "Zakat Alerts",
  "Interest Exposure ML Reports",
  "AI Chatbot",
  "Bill Pay & Autopay",
  "Rewinder — Financial History Replay",
  "Financial Tips & News",
  "Learning Resources"
];
function AISection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "ai", className: "relative overflow-hidden border-t border-border/40 bg-[color:var(--surface-sunken)] py-28", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 grid-noise opacity-30", "aria-hidden": true }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative mx-auto max-w-7xl px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-16 lg:grid-cols-12 lg:items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground", children: "Beta · Coming soon" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-4 text-4xl md:text-5xl", children: [
          "An ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic text-brand-gradient", children: "intelligent" }),
          " layer for every transaction."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-muted-foreground", children: "Tactifin's AI quietly works in the background — categorizing, alerting, and checking Islamic compliance — so the numbers always make sense." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 grid gap-3 sm:grid-cols-2", children: [
          { i: Bot, t: "AI Chatbot" },
          { i: ScanSearch, t: "Fraud Detection" },
          { i: MoonStar, t: "Islamic Compliance" },
          { i: WalletMinimal, t: "Auto Categorization" }
        ].map((x) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 rounded-xl border border-border/60 bg-card p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(x.i, { className: "h-4 w-4 text-[color:var(--brand-bolt)]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: x.t })
        ] }, x.t)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-7", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: PILLS.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: "rounded-full border border-border/60 bg-card px-4 py-2 text-sm text-muted-foreground transition-smooth hover:border-[color:var(--brand-bolt)] hover:text-foreground",
          style: { animationDelay: `${i * 30}ms` },
          children: p
        },
        p
      )) }) })
    ] }) })
  ] });
}
const VIDEOS = [
  {
    id: 1,
    title: "Getting Started with Tactifin",
    description: "Learn the basics of tracking your finances",
    thumbnail: "https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=800",
    embedId: "dQw4w9WgXcQ",
    duration: "3:24"
  },
  {
    id: 2,
    title: "Islamic Finance Compliance",
    description: "Understanding Halal vs Haram transactions",
    thumbnail: "https://images.pexels.com/photos/4386442/pexels-photo-4386442.jpeg?auto=compress&cs=tinysrgb&w=800",
    embedId: "dQw4w9WgXcQ",
    duration: "5:12"
  },
  {
    id: 3,
    title: "Automating Your Budget",
    description: "Set up autopay and smart categorization",
    thumbnail: "https://images.pexels.com/photos/4226256/pexels-photo-4226256.jpeg?auto=compress&cs=tinysrgb&w=800",
    embedId: "dQw4w9WgXcQ",
    duration: "4:08"
  },
  {
    id: 4,
    title: "Zakat Calculator Walkthrough",
    description: "Calculate your annual Zakat obligation",
    thumbnail: "https://images.pexels.com/photos/3943723/pexels-photo-3943723.jpeg?auto=compress&cs=tinysrgb&w=800",
    embedId: "dQw4w9WgXcQ",
    duration: "6:45"
  }
];
function VideoGallery() {
  const [activeVideo, setActiveVideo] = reactExports.useState(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative py-24 bg-[color:var(--surface-sunken)]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-4xl md:text-5xl", children: [
          "Learn ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic text-brand-gradient", children: "Visually" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-muted-foreground max-w-xl mx-auto", children: "Watch our curated video tutorials to master your finances with Tactifin" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 md:grid-cols-2 xl:grid-cols-4", children: VIDEOS.map((video) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          onClick: () => setActiveVideo(video),
          className: "group relative cursor-pointer overflow-hidden rounded-2xl border border-border/60 bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-elegant",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-video overflow-hidden", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: video.thumbnail,
                  alt: video.title,
                  className: "h-full w-full object-cover transition-transform group-hover:scale-105"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-14 w-14 items-center justify-center rounded-full bg-brand-gradient shadow-lg transition-transform group-hover:scale-110", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "h-6 w-6 text-white fill-white" }) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-3 right-3 rounded bg-black/70 px-2 py-0.5 text-xs text-white", children: video.duration })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-medium text-foreground", children: video.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: video.description })
            ] })
          ]
        },
        video.id
      )) })
    ] }),
    activeVideo && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm",
        onClick: () => setActiveVideo(null),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "relative w-full max-w-4xl rounded-2xl bg-card overflow-hidden shadow-elegant",
            onClick: (e) => e.stopPropagation(),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: () => setActiveVideo(null),
                  className: "absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white transition hover:bg-black/70",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-video w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "iframe",
                {
                  src: `https://www.youtube.com/embed/${activeVideo.embedId}?autoplay=1`,
                  title: activeVideo.title,
                  allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
                  allowFullScreen: true,
                  className: "h-full w-full"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-medium", children: activeVideo.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: activeVideo.description })
              ] })
            ]
          }
        )
      }
    )
  ] });
}
const QUOTES = [
  { q: "Tactifin replaced four apps in one weekend. The Zakat alerts alone made it worth it.", a: "Hamza R.", r: "Early beta user" },
  { q: "It's the first finance tool that actually feels designed. Quiet, sharp, and shockingly smart.", a: "Ayesha K.", r: "Independent accountant" },
  { q: "The AI categorization is uncanny. I haven't manually tagged a transaction in months.", a: "Daniel M.", r: "Founder" }
];
function Testimonials() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-t border-border/40 py-28", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-2xl text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-[color:var(--brand-bolt)]" }),
        "Voices"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-4 text-4xl md:text-5xl", children: [
        "What early users ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic text-brand-gradient", children: "are saying" }),
        "."
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-14 grid gap-5 md:grid-cols-3", children: QUOTES.map((q) => /* @__PURE__ */ jsxRuntimeExports.jsxs("figure", { className: "flex flex-col justify-between rounded-2xl border border-border/60 bg-card p-7 transition-smooth hover:-translate-y-1 hover:shadow-elegant hover:border-[color:var(--brand-bolt)]/30", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px w-12 bg-brand-gradient mb-6 rounded-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("blockquote", { className: "text-lg leading-relaxed", children: [
        '"',
        q.q,
        '"'
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("figcaption", { className: "mt-8 flex items-center gap-3 border-t border-border/60 pt-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-9 w-9 items-center justify-center rounded-full bg-brand-gradient text-sm font-medium text-black shrink-0", children: q.a[0] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm", children: q.a }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: q.r })
        ] })
      ] })
    ] }, q.a)) })
  ] }) });
}
function Partners() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "partners", className: "border-t border-border/40 bg-[color:var(--surface-sunken)] py-28", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-7xl px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-3xl border border-border/60 bg-card p-10 md:p-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -right-20 -top-20 h-72 w-72 rounded-full bg-brand-gradient opacity-20 blur-3xl", "aria-hidden": true }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative grid gap-12 md:grid-cols-2 md:items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground", children: "Partnership & rewards" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-4 text-4xl md:text-5xl", children: [
          "Grow with ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic text-brand-gradient", children: "Tactifin" }),
          "."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 max-w-md text-muted-foreground", children: "Join our partner program for accountants, advisors and institutions — early access to new modules, co-built integrations, and rewards for every client onboarded." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "lg", className: "rounded-full", children: [
            "Become a partner ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "ml-1 h-4 w-4" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "lg", variant: "ghost", className: "rounded-full", children: "Read the program" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-4", children: [
        { k: "Co-built", v: "Modules" },
        { k: "Revenue", v: "Sharing" },
        { k: "Priority", v: "Support" },
        { k: "Early", v: "Access" }
      ].map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border/60 bg-[color:var(--surface-elevated)] p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: c.k }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-2xl", children: c.v })
      ] }, c.v)) })
    ] })
  ] }) }) });
}
const Accordion = Root2;
const AccordionItem = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Item, { ref, className: cn("border-b", className), ...props }));
AccordionItem.displayName = "AccordionItem";
const AccordionTrigger = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Header, { className: "flex", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
  Trigger2,
  {
    ref,
    className: cn(
      "flex flex-1 items-center justify-between py-4 text-sm font-medium cursor-pointer transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" })
    ]
  }
) }));
AccordionTrigger.displayName = Trigger2.displayName;
const AccordionContent = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Content2,
  {
    ref,
    className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("pb-4 pt-0", className), children })
  }
));
AccordionContent.displayName = Content2.displayName;
const FAQS = [
  { q: "What is Tactifin?", a: "Tactifin is an AI-native accounting platform that unifies tracking, budgeting, lending, assets and Shariah-aware finance into a single, premium experience." },
  { q: "How does Shariah-based finance work?", a: "Our Islamic Compliance Checker monitors interest exposure, runs Halal/Haram detection, and sends Zakat alerts — with ML-generated compliance reports you can share." },
  { q: "What is the Rewinder feature?", a: "Rewinder automatically replays your financial history month by month. It surfaces spending trends, income vs expense charts, and category breakdowns so you can spot patterns and make smarter decisions going forward." },
  { q: "How does Bill Pay work?", a: "Add your recurring bills (electricity, rent, internet, etc.) and Tactifin tracks due dates, sends reminders, and lets you mark bills as paid or enable autopay. You'll always know exactly what's due and when." },
  { q: "Is my bank data secure?", a: "Bank and mobile wallet integrations use read-only connections. Fraud detection runs continuously, flagging anomalies before they become losses." },
  { q: "When can I use Tactifin?", a: "Tactifin is currently in private beta. Join the waitlist for early access and partner program updates." }
];
function FAQ() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "faq", className: "border-t border-border/40 py-28", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-3xl px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground", children: "FAQ" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-4 text-4xl md:text-5xl", children: [
        "Questions, ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic text-brand-gradient", children: "answered" }),
        "."
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Accordion, { type: "single", collapsible: true, className: "mt-12", children: FAQS.map((f, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(AccordionItem, { value: `item-${i}`, className: "border-border/60", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionTrigger, { className: "text-left text-lg hover:no-underline", children: f.q }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionContent, { className: "text-muted-foreground", children: f.a })
    ] }, i)) })
  ] }) });
}
function SiteFooter() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "relative border-t border-border/40 bg-[color:var(--surface-sunken)] py-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 left-1/2 -translate-x-1/2 h-px w-1/2 bg-brand-gradient opacity-60" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-10 md:grid-cols-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TactifinLogo, { size: 36 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-medium", children: "Tactifin" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 max-w-sm text-sm text-muted-foreground", children: "Premium, AI-native accounting and Shariah-aware finance — designed to disappear into your day." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: "Platform" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-4 space-y-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#features", className: "text-foreground/70 transition-smooth hover:text-foreground", children: "Features" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#ai", className: "text-foreground/70 transition-smooth hover:text-foreground", children: "Intelligence" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#partners", className: "text-foreground/70 transition-smooth hover:text-foreground", children: "Partners" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#faq", className: "text-foreground/70 transition-smooth hover:text-foreground", children: "FAQ" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: "Resources" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-4 space-y-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/news", className: "text-foreground/70 transition-smooth hover:text-foreground", children: "Financial Tips & News" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/learn", className: "text-foreground/70 transition-smooth hover:text-foreground", children: "Learning Resources" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#faq", className: "text-foreground/70 transition-smooth hover:text-foreground", children: "Beta Program" }) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-14 flex flex-col items-start justify-between gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground md:flex-row md:items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          "© ",
          (/* @__PURE__ */ new Date()).getFullYear(),
          " Tactifin. All rights reserved."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Crafted for a quieter way to handle money." })
      ] })
    ] })
  ] });
}
function Index() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Hero, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(GrowthSection, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FeaturesGrid, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AISection, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(VideoGallery, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Testimonials, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Partners, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FAQ, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {})
  ] });
}
export {
  Index as component
};
