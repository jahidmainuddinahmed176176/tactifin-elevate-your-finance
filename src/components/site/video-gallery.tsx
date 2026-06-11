"use client";

import { useState } from "react";
import { Play, X } from "lucide-react";
import { cn } from "@/lib/utils";

const VIDEOS = [
  {
    id: 1,
    title: "Getting Started with Tactifin",
    description: "Learn the basics of tracking your finances",
    thumbnail: "https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=800",
    embedId: "dQw4w9WgXcQ",
    duration: "3:24",
  },
  {
    id: 2,
    title: "Islamic Finance Compliance",
    description: "Understanding Halal vs Haram transactions",
    thumbnail: "https://images.pexels.com/photos/4386442/pexels-photo-4386442.jpeg?auto=compress&cs=tinysrgb&w=800",
    embedId: "dQw4w9WgXcQ",
    duration: "5:12",
  },
  {
    id: 3,
    title: "Automating Your Budget",
    description: "Set up autopay and smart categorization",
    thumbnail: "https://images.pexels.com/photos/4226256/pexels-photo-4226256.jpeg?auto=compress&cs=tinysrgb&w=800",
    embedId: "dQw4w9WgXcQ",
    duration: "4:08",
  },
  {
    id: 4,
    title: "Zakat Calculator Walkthrough",
    description: "Calculate your annual Zakat obligation",
    thumbnail: "https://images.pexels.com/photos/3943723/pexels-photo-3943723.jpeg?auto=compress&cs=tinysrgb&w=800",
    embedId: "dQw4w9WgXcQ",
    duration: "6:45",
  },
];

export function VideoGallery() {
  const [activeVideo, setActiveVideo] = useState<(typeof VIDEOS)[0] | null>(null);

  return (
    <section className="relative py-24 bg-[color:var(--surface-sunken)]">
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
          {VIDEOS.map((video) => (
            <div
              key={video.id}
              onClick={() => setActiveVideo(video)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-border/60 bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-elegant"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-gradient shadow-lg transition-transform group-hover:scale-110">
                    <Play className="h-6 w-6 text-white fill-white" />
                  </div>
                </div>
                <div className="absolute bottom-3 right-3 rounded bg-black/70 px-2 py-0.5 text-xs text-white">
                  {video.duration}
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

      {/* Video Modal */}
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