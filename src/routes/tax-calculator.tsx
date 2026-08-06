import { createFileRoute } from "@tanstack/react-router";
import { SiteFooter } from "@/components/site/footer";
import { SiteHeader } from "@/components/site/header";
import { Tax } from "@/routes/_authenticated/calculators";

export const Route = createFileRoute("/tax-calculator")({
  head: () => ({
    meta: [
      { title: "Bangladesh Tax Calculator — Tactifin" },
      {
        name: "description",
        content: "Calculate Bangladesh personal income tax with NBR assessment-year rules, exemptions, investment credit, surcharges, and a full breakdown.",
      },
    ],
  }),
  component: TaxCalculatorPage,
});

function TaxCalculatorPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-3xl">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Bangladesh personal tax
          </p>
          <h1 className="text-4xl tracking-tight sm:text-5xl">
            Estimate your income tax with confidence.
          </h1>
          <p className="mt-4 text-base text-muted-foreground">
            Explore assessment years, taxpayer categories, employment exemptions,
            investment credit, minimum tax floors, flat-rate income, and surcharge
            details in one transparent calculation.
          </p>
        </div>
        <Tax />
      </main>
      <SiteFooter />
    </div>
  );
}