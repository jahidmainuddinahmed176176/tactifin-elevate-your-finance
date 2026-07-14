import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { FeaturesGrid } from "@/components/site/features-grid";
import { VideoGallery } from "@/components/site/video-gallery";
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
        <FeaturesGrid />
        <VideoGallery />
        <FAQ />
      </main>
      <SiteFooter />
    </div>
  );
}
