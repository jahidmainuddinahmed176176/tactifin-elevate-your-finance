import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TactifinLogo } from "@/components/site/tactifin-logo";
import { AnimatedStarfield } from "@/components/site/animated-starfield";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero pt-32 pb-24">
      {/* Animated Starfield Background */}
      <AnimatedStarfield />
      <div className="absolute inset-0 grid-noise opacity-50" aria-hidden />
      {/* Extra ambient glow */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[420px] w-[820px] rounded-full bg-brand-gradient opacity-10 blur-[120px] pointer-events-none" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/40 px-4 py-1.5 text-xs text-muted-foreground backdrop-blur">
            <Sparkles className="h-3 w-3 text-[color:var(--brand-bolt)]" />
            AI-native accounting · Now in beta
          </div>
          <h1 className="text-5xl leading-[1.05] md:text-7xl">
            Accounting,<br />
            <span className="italic text-brand-gradient">reimagined.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
            Tactifin unifies tracking, budgeting and Shariah-aware finance into one quiet,
            intelligent platform — built for the way you actually move money.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button 
              size="lg" 
              className="rounded-full px-8 shadow-glow relative bg-white text-black hover:bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 font-semibold"
              style={{
                boxShadow: "0 0 20px rgba(255, 193, 7, 0.6), 0 0 40px rgba(255, 193, 7, 0.3)"
              }}
            >
              Get early access <ArrowRight className="ml-1.5 h-4 w-4" />
            </Button>
            <Button size="lg" variant="ghost" className="rounded-full px-8 border border-border/60">
              Explore the platform
            </Button>
          </div>
        </div>

        {/* Hero visual */}
        <div className="relative mx-auto mt-20 max-w-5xl">
          <div className="absolute -inset-x-20 -inset-y-10 bg-brand-gradient opacity-20 blur-3xl" aria-hidden />
          <div className="relative rounded-3xl border border-border/60 bg-card/60 p-2 shadow-elegant backdrop-blur-xl">
            <div className="rounded-2xl bg-[color:var(--surface-sunken)] p-8 md:p-12">
              <div className="grid gap-6 md:grid-cols-3">
                {[
                  { k: "Net worth", v: "$184,920", d: "+12.4%" },
                  { k: "This month", v: "$6,240", d: "Under budget" },
                  { k: "Zakat estimate", v: "$1,108", d: "Auto-calculated" },
                ].map((s) => (
                  <div key={s.k} className="rounded-xl border border-border/60 bg-card p-5 transition-smooth hover:-translate-y-0.5 hover:shadow-elegant">
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">{s.k}</div>
                    <div className="mt-2 text-2xl">{s.v}</div>
                    <div className="mt-1 text-xs text-[color:var(--brand-bolt)]">{s.d}</div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex items-center justify-between rounded-xl border border-border/60 bg-card p-5">
                <div className="flex items-center gap-3">
                  <TactifinLogo size={40} />
                  <div>
                    <div className="text-sm">AI Categorization</div>
                    <div className="text-xs text-muted-foreground">14 transactions auto-sorted · 0 review needed</div>
                  </div>
                </div>
                <div className="hidden gap-2 md:flex">
                  {["Food", "Rent", "Business", "Taxi"].map((t) => (
                    <span key={t} className="rounded-full border border-border/60 px-3 py-1 text-xs text-muted-foreground">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
