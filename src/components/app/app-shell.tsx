import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Receipt,
  Target,
  Wallet,
  Calculator,
  ShieldCheck,
  Bot,
  LogOut,
  Moon,
  Sun,
  Menu,
  X,
  CreditCard,
  RotateCcw,
  Newspaper,
  BookOpen,
  Settings,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useTheme } from "@/components/site/theme-provider";
import { useQueryClient } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { isUserAdmin } from "@/lib/admin";
import { TactifinLogo } from "@/components/site/tactifin-logo";
import { useQuery } from "@tanstack/react-query";

const NAV = [
  { to: "/app", label: "Dashboard", icon: LayoutDashboard },
  { to: "/transactions", label: "Transactions", icon: Receipt },
  { to: "/goals", label: "Goals", icon: Target },
  { to: "/budgets", label: "Budgets", icon: Wallet },
  { to: "/bills", label: "Bill Pay", icon: CreditCard },
  { to: "/rewinder", label: "Rewinder", icon: RotateCcw },
  { to: "/calculators", label: "Calculators", icon: Calculator },
  { to: "/compliance", label: "Compliance", icon: ShieldCheck },
  { to: "/chat", label: "AI Assistant", icon: Bot },
  { to: "/news", label: "Tips & News", icon: Newspaper },
  { to: "/learn", label: "Learning", icon: BookOpen },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: (r) => r.location.pathname });
  const { theme, toggle } = useTheme();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [mobile, setMobile] = useState(false);

  // Check if current user is admin
  const { data: isAdmin } = useQuery({
    queryKey: ["is-admin"],
    queryFn: async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return false;
      return isUserAdmin(supabase, u.user.id);
    },
    staleTime: 5 * 60 * 1000,
  });

  async function signOut() {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 border-r border-border bg-card flex-col md:flex transition-transform",
          mobile ? "flex translate-x-0" : "hidden -translate-x-full md:translate-x-0",
        )}
      >
        <div className="flex h-16 items-center gap-2 border-b border-border px-5">
          <TactifinLogo size={32} />
          <span className="text-lg font-medium tracking-tight">Tactifin</span>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {NAV.map((n) => {
            const active = path === n.to || (n.to !== "/app" && path.startsWith(n.to));
            return (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setMobile(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  active ? "bg-accent text-foreground" : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
                )}
              >
                <n.icon className="h-4 w-4" />
                {n.label}
              </Link>
            );
          })}
          {isAdmin && (
            <>
              <div className="my-2 h-px bg-border" />
              <Link
                to="/admin"
                onClick={() => setMobile(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  path.startsWith("/admin") ? "bg-accent text-foreground" : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
                )}
              >
                <Settings className="h-4 w-4" />
                Admin
              </Link>
            </>
          )}
        </nav>
        <div className="border-t border-border p-3 space-y-1">
          <button
            onClick={toggle}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            {theme === "dark" ? "Light mode" : "Dark mode"}
          </button>
          <button
            onClick={signOut}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </aside>

      <div className="flex flex-1 flex-col md:pl-64">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur md:hidden">
          <button
            onClick={() => setMobile((m) => !m)}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-border"
          >
            {mobile ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
          <span className="text-sm font-medium">Tactifin</span>
          <button onClick={toggle} className="flex h-9 w-9 items-center justify-center rounded-md border border-border">
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </header>
        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
