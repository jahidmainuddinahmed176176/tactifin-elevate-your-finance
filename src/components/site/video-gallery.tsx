import { Play } from "lucide-react";
import { useState } from "react";

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  youtubeId: string;
}

const videos: Video[] = [
  {
    id: "1",
    title: "Tactifin AI Accounting Overview",
    description: "See how Tactifin transforms accounting with AI",
    thumbnail: "https://img.youtube.com/vi/r6SoJi95l7w/maxresdefault.jpg",
    youtubeId: "r6SoJi95l7w",
  },
  {
    id: "2",
    title: "Shariah-Aware Finance Features",
    description: "Intelligent Shariah compliance in every transaction",
    thumbnail: "https://img.youtube.com/vi/g9VcBermbHg/maxresdefault.jpg",
    youtubeId: "g9VcBermbHg",
  },
];

export function VideoGallery() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  return (
    <section className="relative py-20 overflow-hidden bg-background">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center mb-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-bolt">Watch</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Video Gallery
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover how Tactifin revolutionizes your financial management with AI-powered insights
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {videos.map((video) => (
            <div
              key={video.id}
              className="group relative rounded-2xl overflow-hidden border border-border/60 bg-card/40 backdrop-blur transition-all duration-300 hover:border-border hover:bg-card/60 cursor-pointer"
              onClick={() => setSelectedVideo(video.youtubeId)}
            >
              {/* Video Thumbnail */}
              <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-blue-900/20 to-cyan-900/20">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                  onError={(e) => {
                    // Fallback if thumbnail fails
                    const img = e.target as HTMLImageElement;
                    img.style.display = "none";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-amber-400/40 rounded-full blur-xl group-hover:bg-amber-400/60 transition-all duration-300" />
                    {/* Button */}
                    <div className="relative w-16 h-16 rounded-full bg-amber-400 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Play className="w-6 h-6 text-black fill-black ml-0.5" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Video Info */}
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2 group-hover:text-brand-bolt transition-colors">
                  {video.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {video.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="w-full max-w-4xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
              title="Video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg"
            />
          </div>
        </div>
      )}
    </section>
  );
}
