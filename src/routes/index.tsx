import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { AppDashboard } from "@/components/app/app-dashboard";
import { FeaturesGrid } from "@/components/site/features-grid";
import { VideoGallery } from "@/components/site/video-gallery";
import { Testimonials } from "@/components/site/testimonials";
import { Partners } from "@/components/site/partners";
import { FAQ } from "@/components/site/faq";
import { SiteFooter } from "@/components/site/footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tactifin — Premium Accounting, Reimagined" },
      { name: "description", content: "AI-native accounting with Shariah-aware finance, tracking, budgeting and intelligent insights — built for the way you actually move money." },
      { property: "og:title", content: "Tactifin — Premium Accounting, Reimagined" },
      { property: "og:description", content: "AI-native accounting with Shariah-aware finance, tracking, budgeting and intelligent insights." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
        <SiteHeader />
        <main>
          <Hero />
          <AppDashboard />
          <FeaturesGrid />
          <VideoGallery />
          <Testimonials />
          <Partners />
          <FAQ />
        </main>
        <SiteFooter />
    </div>
  );
}
