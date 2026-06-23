const QUOTES = [
  { q: "Tactifin replaced four apps in one weekend. The Zakat alerts alone made it worth it.", a: "Hamza R.", r: "Early beta user" },
  { q: "It's the first finance tool that actually feels designed. Quiet, sharp, and shockingly smart.", a: "Ayesha K.", r: "Independent accountant" },
  { q: "The AI categorization is uncanny. I haven't manually tagged a transaction in months.", a: "Daniel M.", r: "Founder" },
];

export function Testimonials() {
  return (
    <section className="border-t border-border/40 bg-background py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--brand-bolt)]" />
            Voices
          </div>
          <h2 className="mt-4 text-4xl md:text-5xl">
            What early users <span className="italic text-brand-gradient">are saying</span>.
          </h2>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {QUOTES.map((q) => (
            <figure key={q.a} className="flex flex-col justify-between rounded-2xl border border-border/60 bg-card p-7 transition-smooth hover:-translate-y-1 hover:shadow-elegant hover:border-[color:var(--brand-bolt)]/30">
              <div className="h-px w-12 bg-brand-gradient mb-6 rounded-full" />
              <blockquote className="text-lg leading-relaxed">"{q.q}"</blockquote>
              <figcaption className="mt-8 flex items-center gap-3 border-t border-border/60 pt-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-gradient text-sm font-medium text-black shrink-0">
                  {q.a[0]}
                </div>
                <div>
                  <div className="text-sm">{q.a}</div>
                  <div className="text-xs text-muted-foreground">{q.r}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}