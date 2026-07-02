"use client";

import { useState } from "react";
import { Play, X } from "lucide-react";

const VIDEOS = [
  {
    id: 1,
    title: "Understanding Zakat in Islam",
    description: "A comprehensive guide to Zakat obligations and calculations",
    embedId: "VIA5iIJRUzo",
    duration: "",
  },
  {
    id: 2,
    title: "Zakat Rules & Nisab Explained",
    description: "Learn the rules, nisab threshold and who must pay Zakat",
    embedId: "NAgUUqsY9T4",
    duration: "",
  },
  {
    id: 3,
    title: "How to Calculate Your Zakat",
    description: "Step-by-step walkthrough of calculating your annual Zakat",
    embedId: "XdQX74L0WMM",
    duration: "",
  },
  {
    id: 4,
    title: "Zakat on Wealth & Investments",
    description: "Zakat obligations on savings, gold, silver and investments",
    embedId: "5Vq96PTCANE",
    duration: "",
  },
];

const CARD_GRADIENTS = [
  "from-emerald-900/60 to-teal-900/60",
  "from-sky-900/60 to-blue-900/60",
  "from-amber-900/60 to-orange-900/60",
  "from-cyan-900/60 to-teal-900/60",
];

export function VideoGallery() {
  const [activeVideo, setActiveVideo] = useState<(typeof VIDEOS)[0] | null>(null);

  return (
    <section className="border-t border-border/40 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl">
            Learn <span className="italic text-brand-gradient">Visually</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Watch our curated video tutorials to master your finances with Tactifin
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {VIDEOS.map((video, i) => (
            <div
              key={video.id}
              onClick={() => setActiveVideo(video)}
              className="group relative cursor-pointer rounded-2xl border border-border/60 bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-elegant overflow-hidden"
            >
              <div className={`relative aspect-video bg-gradient-to-br ${CARD_GRADIENTS[i]}`}>
                <img
                  src={`https://img.youtube.com/vi/${video.embedId}/hqdefault.jpg`}
                  alt={video.title}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-gradient shadow-lg transition-transform duration-200 group-hover:scale-110">
                    <Play className="h-6 w-6 text-white fill-white" />
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-foreground">{video.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{video.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {activeVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-full max-w-4xl rounded-2xl bg-card overflow-hidden shadow-elegant"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white transition hover:bg-black/70"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="aspect-video w-full">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo.embedId}?autoplay=1`}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-medium">{activeVideo.title}</h3>
              <p className="mt-2 text-muted-foreground">{activeVideo.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
