"use client";

import { useEffect, useState } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export function FloatingStars() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const starCount = 40;
    const newStars: Star[] = [];

    for (let i = 0; i < starCount; i++) {
      newStars.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100 + 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 15 + 10,
        delay: Math.random() * 10,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    setStars(newStars);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-[color:var(--brand-bolt)]"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animation: `floatUp ${star.duration}s linear ${star.delay}s infinite`,
            boxShadow: `0 0 ${star.size * 2}px rgba(120, 220, 130, 0.5), 0 0 ${star.size * 4}px rgba(120, 220, 130, 0.3)`,
          }}
        />
      ))}
      <style>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) scale(1);
            opacity: var(--star-opacity, 0.3);
          }
          10% {
            opacity: calc(var(--star-opacity, 0.3) * 1.5);
          }
          90% {
            opacity: calc(var(--star-opacity, 0.3) * 0.5);
          }
          100% {
            transform: translateY(-120vh) scale(0.5);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
