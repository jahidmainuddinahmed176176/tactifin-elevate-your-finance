import { Bot, ScanSearch, MoonStar, Wallet2 } from "lucide-react";

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
  "Learning Resources",
];

export function AISection() {
  return (
    <section id="ai" className="border-t border-border/40 bg-[color:var(--surface-sunken)] py-16 md:py-28">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-8 md:gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Beta · Coming soon</div>
            <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl leading-tight">
              An <span className="italic text-brand-gradient">intelligent</span> layer for every transaction.
            </h2>
            <p className="mt-5 text-sm sm:text-base text-muted-foreground">
              Tactifin's AI quietly works in the background — categorizing, alerting, and checking
              Islamic compliance — so the numbers always make sense.
            </p>
            <div className="mt-6 md:mt-8 grid gap-2 sm:gap-3 grid-cols-2 sm:grid-cols-2">
              {[
                { i: Bot, t: "AI Chatbot" },
                { i: ScanSearch, t: "Fraud Detection" },
                { i: MoonStar, t: "Islamic Compliance" },
                { i: Wallet2, t: "Auto Categorization" },
              ].map((x) => (
                <div key={x.t} className="flex items-center gap-2 sm:gap-3 rounded-xl border border-border/60 bg-card p-2 sm:p-3">
                  <x.i className="h-4 w-4 shrink-0 text-[color:var(--brand-bolt)]" />
                  <span className="text-xs sm:text-sm whitespace-nowrap">{x.t}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {PILLS.map((p) => (
                <span
                  key={p}
                  className="inline-block rounded-full border border-border/60 bg-card px-2.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-muted-foreground"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}