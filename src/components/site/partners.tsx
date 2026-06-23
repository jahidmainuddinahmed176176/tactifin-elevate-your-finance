import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Partners() {
  return (
    <section id="partners" className="border-t border-border/40 bg-[color:var(--surface-sunken)] py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card p-10 md:p-16">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-brand-gradient opacity-20 blur-3xl" aria-hidden />
          <div className="relative grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Partnership & rewards</div>
              <h2 className="mt-4 text-4xl md:text-5xl">
                Grow with <span className="italic text-brand-gradient">Tactifin</span>.
              </h2>
              <p className="mt-5 max-w-md text-muted-foreground">
                Join our partner program for accountants, advisors and institutions —
                early access to new modules, co-built integrations, and rewards for every client onboarded.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button size="lg" className="rounded-full">Become a partner <ArrowUpRight className="ml-1 h-4 w-4" /></Button>
                <Button size="lg" variant="ghost" className="rounded-full">Read the program</Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { k: "Co-built", v: "Modules" },
                { k: "Revenue", v: "Sharing" },
                { k: "Priority", v: "Support" },
                { k: "Early", v: "Access" },
              ].map((c) => (
                <div key={c.v} className="rounded-2xl border border-border/60 bg-[color:var(--surface-elevated)] p-6">
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">{c.k}</div>
                  <div className="mt-2 text-2xl">{c.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}