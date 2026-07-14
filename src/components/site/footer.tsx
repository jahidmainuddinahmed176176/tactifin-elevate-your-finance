import { TactifinLogo } from "./tactifin-logo";

export function SiteFooter() {
  return (
    <footer className="relative border-t border-border/40 bg-[color:var(--surface-sunken)] py-16">
      {/* Thin gradient accent line at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-1/2 bg-brand-gradient opacity-60" />
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <TactifinLogo size={36} />
              <span className="text-lg font-medium">Tactifin</span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              Premium, AI-native accounting and Shariah-aware finance — designed to disappear into your day.
            </p>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Platform</div>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="#app" className="text-foreground/70 transition-smooth hover:text-foreground">Workspace</a></li>
              <li><a href="#features" className="text-foreground/70 transition-smooth hover:text-foreground">Features</a></li>
              <li><a href="#faq" className="text-foreground/70 transition-smooth hover:text-foreground">FAQ</a></li>
            </ul>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Get started</div>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="/auth" className="text-foreground/70 transition-smooth hover:text-foreground">Sign in</a></li>
              <li><a href="/auth" className="text-foreground/70 transition-smooth hover:text-foreground">Create account</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <div>© {new Date().getFullYear()} Tactifin. All rights reserved.</div>
          <div>Crafted for a quieter way to handle money.</div>
        </div>
      </div>
    </footer>
  );
}
