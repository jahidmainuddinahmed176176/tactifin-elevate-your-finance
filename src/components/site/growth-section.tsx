import { TrendingUp, Brain, ShieldCheck } from "lucide-react";

const STATS = [
  { icon: TrendingUp, k: "Income & Expense", v: "Real-time tracking", d: "Auto-collect cash in and cash out, categorized by AI the moment it lands." },
  { icon: Brain, k: "ML Budgeting", v: "Predictive control", d: "Personal tax calculation, reminders and goal-based savings tuned to your life." },
  { icon: ShieldCheck, k: "Fraud Detection", v: "Always on", d: "Anomaly alerts, credit-score monitoring and Islamic compliance baked in." },
];

export function GrowthSection() {
  return (
    <section id="platform" className="relative border-t border-border/40 bg-[color:var(--surface-sunken)] py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 md:grid-cols-2 md:items-end">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">The platform</div>
            <h2 className="mt-4 text-4xl md:text-5xl">
              Unlock a new phase<br />of <span className="italic text-brand-gradient">financial clarity</span>.
            </h2>
          </div>
          <p className="text-muted-foreground md:text-lg">
            One quiet system for accounts, lending, assets and receivables — connected
            to your bank and mobile wallet, and intelligent enough to stay out of the way.
          </p>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-border/60 bg-border/60 md:grid-cols-3">
          {STATS.map((s) => (
            <div key={s.k} className="group relative bg-card p-8 transition-smooth hover:bg-[color:var(--surface-elevated)]">
              <s.icon className="h-6 w-6 text-[color:var(--brand-bolt)]" />
              <div className="mt-6 text-xs uppercase tracking-wider text-muted-foreground">{s.k}</div>
              <div className="mt-2 text-2xl">{s.v}</div>
              <p className="mt-3 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}