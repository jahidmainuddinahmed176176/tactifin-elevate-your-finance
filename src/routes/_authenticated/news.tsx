import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Search, TrendingUp, BookOpen, AlertCircle, DollarSign, Loader2 } from "lucide-react";

export const Route = createFileRoute("/_authenticated/news")({
  head: () => ({ meta: [{ title: "Financial Tips & News — Tactifin" }] }),
  component: NewsPage,
});

const CATEGORIES = ["All", "Tips", "Markets", "Islamic Finance", "Tax", "Savings"] as const;
type Category = (typeof CATEGORIES)[number];

const TIPS = [
  {
    category: "Tips",
    title: "The 50/30/20 Rule: A Simple Budget Framework",
    summary:
      "Allocate 50% of take-home pay to needs, 30% to wants, and 20% to savings or debt repayment. This flexible rule works across most income levels and is a solid starting point before you fine-tune with Tactifin's budget tracker.",
    icon: DollarSign,
    readTime: "2 min",
    tags: ["Budgeting", "Beginner"],
  },
  {
    category: "Islamic Finance",
    title: "Understanding Riba: Why Interest Matters in Islamic Finance",
    summary:
      "Riba (interest) is prohibited in Islamic law. This applies to bank savings interest, credit card charges, and certain investment products. Tactifin's compliance checker flags these automatically so you stay on track.",
    icon: AlertCircle,
    readTime: "3 min",
    tags: ["Shariah", "Banking"],
  },
  {
    category: "Markets",
    title: "Dollar-Cost Averaging: Reduce Risk in Volatile Markets",
    summary:
      "Investing a fixed amount at regular intervals — regardless of price — smooths out market volatility over time. It removes the pressure of timing the market and is suitable for long-term wealth building.",
    icon: TrendingUp,
    readTime: "3 min",
    tags: ["Investing", "Strategy"],
  },
  {
    category: "Tax",
    title: "5 Deductions Most People Miss on Their Tax Return",
    summary:
      "Home office expenses, professional development costs, charitable donations, health insurance premiums (if self-employed), and student loan interest are frequently overlooked. Use Tactifin's tax estimator to see how each impacts your bill.",
    icon: DollarSign,
    readTime: "4 min",
    tags: ["Tax", "Savings"],
  },
  {
    category: "Savings",
    title: "Building a 6-Month Emergency Fund: Step by Step",
    summary:
      "Start by calculating three months of essential expenses (rent, food, utilities). Open a separate high-yield savings account. Automate a fixed transfer each payday. Tactifin's Goals feature tracks progress and surfaces how close you are in real time.",
    icon: TrendingUp,
    readTime: "3 min",
    tags: ["Emergency Fund", "Goals"],
  },
  {
    category: "Islamic Finance",
    title: "Calculating Your Zakat: A Practical Guide",
    summary:
      "Zakat is 2.5% of wealth held above the nisab threshold for one lunar year. Eligible assets include cash, gold, silver, and tradeable investments. Debts you owe are subtracted. Tactifin's Zakat calculator does this automatically.",
    icon: AlertCircle,
    readTime: "4 min",
    tags: ["Zakat", "Shariah"],
  },
  {
    category: "Tips",
    title: "Automate Your Finances: Set It and Forget It",
    summary:
      "Automate savings transfers, bill payments, and investment contributions on payday. Removing the manual decision reduces the chance of overspending and builds wealth passively. Tactifin's auto-reminders keep you on schedule.",
    icon: DollarSign,
    readTime: "2 min",
    tags: ["Automation", "Productivity"],
  },
  {
    category: "Markets",
    title: "What Is a Credit Score and How to Improve It",
    summary:
      "Your credit score (300–850) affects loan rates, rental applications, and sometimes employment. The biggest drivers: on-time payment history (35%), credit utilisation (30%), and account age (15%). Use Tactifin's credit monitor to simulate improvements.",
    icon: TrendingUp,
    readTime: "3 min",
    tags: ["Credit", "Borrowing"],
  },
  {
    category: "Tax",
    title: "Freelancers & Self-Employed: Estimated Tax Basics",
    summary:
      "If you earn self-employment income, the IRS expects quarterly estimated tax payments. Under-paying can trigger penalties. Tactifin's tax estimator calculates your likely quarterly obligation so you're never caught off guard.",
    icon: BookOpen,
    readTime: "5 min",
    tags: ["Freelance", "Tax"],
  },
];

const NEWS = [
  {
    category: "Markets",
    title: "Global Markets Digest: Key Trends This Week",
    summary:
      "Central banks in multiple economies are holding rates steady as inflation data shows signs of cooling. Equity markets responded positively, with technology and consumer discretionary sectors leading gains.",
    icon: TrendingUp,
    readTime: "2 min",
    tags: ["Markets", "Macro"],
    date: "Jun 9, 2026",
  },
  {
    category: "Islamic Finance",
    title: "Sukuk Issuance Hits Record Levels in 2026",
    summary:
      "Global sukuk (Islamic bond) issuance has surpassed previous records this year, driven by sovereign issuers in the Gulf and Southeast Asia. Demand from institutional investors seeking Shariah-compliant fixed income continues to rise.",
    icon: AlertCircle,
    readTime: "3 min",
    tags: ["Sukuk", "Islamic Finance"],
    date: "Jun 7, 2026",
  },
  {
    category: "Tax",
    title: "IRS Announces Inflation-Adjusted Tax Brackets for 2026",
    summary:
      "The IRS has released updated tax bracket thresholds, adjusted upward to account for inflation. Standard deductions also increased. Taxpayers in all brackets will see modest reductions in effective tax rates.",
    icon: DollarSign,
    readTime: "3 min",
    tags: ["Tax", "IRS"],
    date: "Jun 5, 2026",
  },
];

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [search, setSearch] = useState("");
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const subscribeMutation = useMutation({
    mutationFn: async (email: string) => {
      const { data: { user } } = await supabase.auth.getUser();
      const { error } = await supabase
        .from("newsletter_subscribers")
        .upsert(
          { email, user_id: user?.id ?? null },
          { onConflict: "email" },
        );
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Subscribed successfully");
      setNewsletterEmail("");
    },
    onError: () => toast.error("Could not subscribe. Please try again."),
  });

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = newsletterEmail.trim();
    if (!trimmed || !trimmed.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    subscribeMutation.mutate(trimmed);
  }

  const allItems = [...TIPS.map((t) => ({ ...t, type: "tip" as const })), ...NEWS.map((n) => ({ ...n, type: "news" as const }))];

  const filtered = allItems.filter((item) => {
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    const matchesSearch =
      !search ||
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.summary.toLowerCase().includes(search.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl">Financial Tips &amp; News</h1>
        <p className="text-sm text-muted-foreground">
          Curated insights to help you make smarter financial decisions.
        </p>
      </div>

      {/* Search + filter */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search tips and news…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <Button
              key={cat}
              size="sm"
              variant={activeCategory === cat ? "default" : "outline"}
              onClick={() => setActiveCategory(cat)}
              className="rounded-full"
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>

      {/* Items */}
      {filtered.length === 0 ? (
        <p className="text-sm text-muted-foreground">No results found. Try a different filter or search term.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((item, idx) => (
            <Card
              key={idx}
              className="group relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-elegant"
            >
              <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-brand-gradient opacity-0 blur-2xl transition-all duration-300 group-hover:opacity-15" />
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-[color:var(--surface-elevated)]">
                    <item.icon className="h-4 w-4 text-[color:var(--brand-bolt)]" />
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {item.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-[10px]">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <CardTitle className="mt-3 text-base leading-snug">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground leading-relaxed">{item.summary}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{item.readTime} read</span>
                  {"date" in item && item.date && <span>{item.date}</span>}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Newsletter CTA */}
      <Card className="border-[color:var(--brand-bolt)]/30 bg-[color:var(--brand-bolt)]/5">
        <CardContent className="flex flex-col items-start justify-between gap-4 pt-6 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-[color:var(--brand-bolt)]" />
              <span className="text-sm font-medium">Financial Tips Newsletter</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Get curated tips, market updates and Islamic finance insights delivered weekly.
            </p>
          </div>
          <form onSubmit={handleSubscribe} className="flex items-center gap-2 w-full sm:w-auto">
            <Input
              type="email"
              placeholder="your@email.com"
              className="text-sm"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              disabled={subscribeMutation.isPending}
            />
            <Button type="submit" size="sm" className="shrink-0" disabled={subscribeMutation.isPending}>
              {subscribeMutation.isPending
                ? <Loader2 className="h-3.5 w-3.5 animate-spin" />
                : "Subscribe"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
