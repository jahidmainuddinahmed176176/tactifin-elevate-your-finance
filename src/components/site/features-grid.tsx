import { Wallet, Target, LineChart, Users, Banknote, Sparkles } from "lucide-react";

const FEATURES = [
  { icon: Wallet, t: "Accounts & Tracking", d: "Income and expense tracking with auto-collection across cash, bank and mobile wallets." },
  { icon: Target, t: "Goal-Based Savings", d: "Set saving goals and watch progress tracking surface what to do next, automatically." },
  { icon: LineChart, t: "Investment & Markets", d: "Portfolio trackers and share market updates, in one premium dashboard." },
  { icon: Users, t: "Borrow, Lend & Share", d: "Lending module, accounts receivable and expense sharing — built for people, not just balance sheets." },
  { icon: Banknote, t: "Shariah-Based Finance", d: "Islamic compliance checker with Halal/Haram detection, Zakat alerts and interest-exposure reports." },
  { icon: Sparkles, t: "AI Recommendations", d: "Personalised guidance, fraud detection and an AI chatbot that knows your finances." },
];

export function FeaturesGrid() {
  return (
    <section id="features" className="border-t border-border/40 py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Features</div>
          <h2 className="mt-4 text-4xl md:text-5xl">
            Built with accountants,<br />
            <span className="italic text-brand-gradient">for everyone</span>.
          </h2>
          <p className="mt-5 text-muted-foreground">
            A focused set of modules — each one quietly powerful, each one designed to disappear into your day.
          </p>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <article
              key={f.t}
              className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-7 transition-smooth hover:border-border hover:-translate-y-1 hover:shadow-elegant"
            >
              <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-brand-gradient opacity-0 blur-2xl transition-smooth group-hover:opacity-20" />
              <div className="relative">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border/60 bg-[color:var(--surface-elevated)]">
                  <f.icon className="h-5 w-5 text-[color:var(--brand-bolt)]" />
                </div>
                <h3 className="mt-5 text-xl">{f.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.d}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}