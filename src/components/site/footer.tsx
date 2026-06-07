import logoAsset from "@/assets/tactifin-logo.png.asset.json";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/40 bg-[color:var(--surface-sunken)] py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <img src={logoAsset.url} alt="Tactifin" className="h-9 w-9 rounded-full" />
              <span className="text-lg font-medium">Tactifin</span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              Premium, AI-native accounting and Shariah-aware finance — designed to disappear into your day.
            </p>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Platform</div>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="#features" className="text-foreground/80 hover:text-foreground">Features</a></li>
              <li><a href="#ai" className="text-foreground/80 hover:text-foreground">Intelligence</a></li>
              <li><a href="#partners" className="text-foreground/80 hover:text-foreground">Partners</a></li>
              <li><a href="#faq" className="text-foreground/80 hover:text-foreground">FAQ</a></li>
            </ul>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Resources</div>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="#" className="text-foreground/80 hover:text-foreground">Financial Tips & News</a></li>
              <li><a href="#" className="text-foreground/80 hover:text-foreground">Learning Resources</a></li>
              <li><a href="#" className="text-foreground/80 hover:text-foreground">Beta Program</a></li>
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