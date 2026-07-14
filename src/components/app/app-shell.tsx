import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, Receipt, Target, Wallet, Calculator, ShieldCheck, Bot,
  Moon, Sun, Menu, X, CreditCard, RotateCcw, Newspaper, BookOpen,
  BookOpenCheck, BarChart3, FileText, Scale,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { useTheme } from "@/components/site/theme-provider";
import { cn } from "@/lib/utils";
import { TactifinLogo } from "@/components/site/tactifin-logo";
import { JournalModal }         from "@/components/reports/journal-modal";
import { TrialBalanceModal }    from "@/components/reports/trial-balance-modal";
import { IncomeStatementModal } from "@/components/reports/income-statement-modal";
import { BalanceSheetModal }    from "@/components/reports/balance-sheet-modal";

const NAV = [
  { to: "/app",          label: "Dashboard",    icon: LayoutDashboard },
  { to: "/transactions", label: "Transactions", icon: Receipt },
  { to: "/goals",        label: "Goals",        icon: Target },
  { to: "/budgets",      label: "Budgets",      icon: Wallet },
  { to: "/bills",        label: "Bill Pay",     icon: CreditCard },
  { to: "/rewinder",     label: "Rewinder",     icon: RotateCcw },
  { to: "/calculators",  label: "Calculators",  icon: Calculator },
  { to: "/compliance",   label: "Compliance",   icon: ShieldCheck },
  { to: "/chat",         label: "AI Assistant", icon: Bot },
  { to: "/news",         label: "Tips & News",  icon: Newspaper },
  { to: "/learn",        label: "Learning",     icon: BookOpen },
] as const;

type ReportKey = "journal" | "trial" | "income" | "balance";

const REPORTS: { key: ReportKey; label: string; icon: typeof FileText }[] = [
  { key: "journal", label: "Journal Ledger",   icon: BookOpenCheck },
  { key: "trial",   label: "Trial Balance",    icon: BarChart3 },
  { key: "income",  label: "Income Statement", icon: FileText },
  { key: "balance", label: "Balance Sheet",    icon: Scale },
];

export function AppShell({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: r => r.location.pathname });
  const { theme, toggle } = useTheme();
  const [mobile, setMobile]     = useState(false);
  const [report, setReport]     = useState<ReportKey | null>(null);

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 border-r border-border bg-card flex-col md:flex transition-transform",
        mobile ? "flex translate-x-0" : "hidden -translate-x-full md:translate-x-0",
      )}>
        {/* Logo */}
        <div className="flex h-16 items-center gap-2 border-b border-border px-5 shrink-0">
          <TactifinLogo size={32} />
          <span className="text-lg font-medium tracking-tight">Tactifin</span>
        </div>

        {/* Scrollable nav area */}
        <nav className="flex-1 space-y-0.5 overflow-y-auto p-3">
          {/* Main nav */}
          {NAV.map(n => {
            const active = path === n.to || (n.to !== "/app" && path.startsWith(n.to));
            return (
              <Link key={n.to} to={n.to} onClick={() => setMobile(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  active ? "bg-accent text-foreground" : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
                )}>
                <n.icon className="h-4 w-4 shrink-0" />
                {n.label}
              </Link>
            );
          })}

          {/* Reports section */}
          <div className="pt-3 mt-1 border-t border-border">
            <p className="px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Reports
            </p>
            {REPORTS.map(r => (
              <button key={r.key}
                onClick={() => { setReport(r.key); setMobile(false); }}
                className={cn(
                  "w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors text-left",
                  report === r.key
                    ? "bg-accent text-foreground"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
                )}>
                <r.icon className="h-4 w-4 shrink-0" />
                {r.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Theme toggle */}
        <div className="border-t border-border p-3 shrink-0">
          <button onClick={toggle}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground">
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            {theme === "dark" ? "Light mode" : "Dark mode"}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col md:pl-64">
        {/* Mobile header */}
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur md:hidden">
          <button onClick={() => setMobile(m => !m)}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-border">
            {mobile ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
          <span className="text-sm font-medium">Tactifin</span>
          <button onClick={toggle} className="flex h-9 w-9 items-center justify-center rounded-md border border-border">
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </header>

        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>

      {/* Report modals */}
      <JournalModal         open={report === "journal"} onClose={() => setReport(null)} />
      <TrialBalanceModal    open={report === "trial"}   onClose={() => setReport(null)} />
      <IncomeStatementModal open={report === "income"}  onClose={() => setReport(null)} />
      <BalanceSheetModal    open={report === "balance"} onClose={() => setReport(null)} />
    </div>
  );
}
