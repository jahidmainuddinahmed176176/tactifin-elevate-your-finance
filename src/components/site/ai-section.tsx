import { Bot, ScanSearch, MoonStar, Wallet2, TrendingUp, Shield, Zap, BookOpen } from "lucide-react";

const FEATURES = [
  { icon: Bot, label: "AI Chatbot", desc: "Ask anything about your finances" },
  { icon: ScanSearch, label: "Fraud Detection", desc: "ML-powered anomaly alerts" },
  { icon: MoonStar, label: "Islamic Compliance", desc: "Halal/Haram auto-checker" },
  { icon: Wallet2, label: "Auto Categorization", desc: "Smart income & expense tagging" },
  { icon: TrendingUp, label: "ML Budgeting", desc: "Predictive spend limits" },
  { icon: Shield, label: "Zakat Calculator", desc: "Annual obligation estimator" },
  { icon: Zap, label: "Bill Autopay", desc: "Never miss a payment" },
  { icon: BookOpen, label: "Learning Hub", desc: "Financial literacy courses" },
];

const TAGS = [
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
  "Learning Resources",
];

export function AISection() {
  return (
    <section id="ai" className="border-t border-border/40 bg-[color:var(--surface-sunken)] py-16 md:py-28 overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">

        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-12 md:mb-16">
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Beta · Coming soon</div>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl leading-tight">
            An <span className="italic text-brand-gradient">intelligent</span> layer for every transaction.
          </h2>
          <p className="mt-5 text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
            Tactifin's AI quietly works in the background — categorizing, alerting, and checking
            Islamic compliance — so the numbers always make sense.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-12 md:mb-16">
          {FEATURES.map((f) => (
            <div
              key={f.label}
              className="group flex flex-col gap-2 rounded-2xl border border-border/60 bg-card p-4 md:p-5 transition-colors hover:border-[color:var(--brand-bolt)]/40"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[color:var(--brand-bolt)]/10">
                <f.icon className="h-4 w-4 text-[color:var(--brand-bolt)]" />
              </div>
              <div>
                <div className="text-sm font-medium leading-tight">{f.label}</div>
                <div className="mt-0.5 text-xs text-muted-foreground leading-snug">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Tag cloud */}
        <div className="text-center">
          <p className="mb-5 text-xs uppercase tracking-[0.2em] text-muted-foreground">Everything included</p>
          <div className="flex flex-wrap justify-center gap-2">
            {TAGS.map((tag) => (
              <span
                key={tag}
                className="inline-block rounded-full border border-border/60 bg-card px-3 py-1.5 text-xs text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
