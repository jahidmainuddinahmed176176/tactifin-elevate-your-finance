"use client";

import { useEffect, useRef } from "react";

const PARTICLE_COUNT = 55;

// Brand-aligned colors: green bolt (dominant), blue accent, soft white
const COLORS = [
  // green bolt — most common
  [120, 230, 130],
  [120, 230, 130],
  [120, 230, 130],
  // blue accent
  [100, 160, 255],
  [100, 160, 255],
  // soft white
  [220, 230, 255],
] as const;

export function FloatingStars() {
  const containerRef = useRef<HTMLDivElement>(null);
  const styleRef = useRef<HTMLStyleElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Inject keyframes into a <style> tag once
    if (!styleRef.current) {
      const style = document.createElement("style");
      style.textContent = `
        @keyframes tsRise {
          0%   { transform: translateY(0px)      translateX(0px); opacity: 0; }
          6%   { opacity: 1; }
          50%  { transform: translateY(-50%)     translateX(var(--sx)); }
          88%  { opacity: 0.5; }
          100% { transform: translateY(-110%)    translateX(0px); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
      styleRef.current = style;
    }

    const elements: HTMLElement[] = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const [r, g, b] = COLORS[Math.floor(Math.random() * COLORS.length)];
      const size     = Math.random() * 2.8 + 0.6;   // 0.6–3.4 px
      const opacity  = Math.random() * 0.5 + 0.25;  // 0.25–0.75
      const duration = Math.random() * 20 + 10;     // 10–30 s
      const delay    = Math.random() * -20;          // negative = already mid-cycle on load
      const left     = Math.random() * 100;          // 0–100 vw
      const sway     = (Math.random() * 60 - 30);   // –30 to +30 px horizontal drift

      const el = document.createElement("span");
      el.style.cssText = `
        position: absolute;
        display: block;
        border-radius: 50%;
        bottom: -4px;
        left: ${left}%;
        width: ${size}px;
        height: ${size}px;
        --sx: ${sway}px;
        background: rgba(${r},${g},${b},${opacity});
        box-shadow:
          0 0 ${size * 2.5}px ${size * 0.8}px rgba(${r},${g},${b},${opacity * 0.55}),
          0 0 ${size * 5}px   ${size * 1.5}px rgba(${r},${g},${b},${opacity * 0.2});
        animation: tsRise ${duration}s linear ${delay}s infinite;
        will-change: transform, opacity;
        pointer-events: none;
      `;
      container.appendChild(el);
      elements.push(el);
    }

    return () => elements.forEach((el) => el.remove());
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 overflow-hidden z-0"
      aria-hidden="true"
    />
  );
}
