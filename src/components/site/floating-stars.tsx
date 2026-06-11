// Tiny rising particles — hero section only
// Pure CSS, no JS DOM injection, SSR-safe

const PARTICLE_COUNT = 40;

// Pre-seeded particle configs so they're stable on SSR + client
// (avoids hydration mismatch from Math.random())
function seededRand(seed: number): number {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

function buildParticles() {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => {
    const r = (n: number) => seededRand(i * 7 + n);
    return {
      left:     r(0) * 100,                    // 0–100%
      bottom:   r(1) * 20,                      // start 0–20% from bottom
      size:     r(2) * 2.4 + 0.6,              // 0.6–3px
      duration: r(3) * 16 + 10,                // 10–26s
      delay:    -(r(4) * 20),                   // negative = already mid-flight
      sway:     (r(5) * 50 - 25),              // –25 to +25px horizontal
      opacity:  r(6) * 0.45 + 0.25,            // 0.25–0.70
      // green bolt dominant, some blue, some white
      color:    i % 5 === 3 ? "100,160,255"
              : i % 5 === 4 ? "210,220,255"
              : "120,230,130",
    };
  });
}

const particles = buildParticles();

export function FloatingStars() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <style>{`
        @keyframes tsRise {
          0%   { opacity: 0;   transform: translateY(0)      translateX(0); }
          8%   { opacity: 1; }
          50%  { transform: translateY(-50%) translateX(var(--p-sx, 0px)); }
          90%  { opacity: 0.4; }
          100% { opacity: 0;   transform: translateY(-105%)  translateX(0); }
        }
      `}</style>

      {particles.map((p, i) => (
        <span
          key={i}
          style={{
            position:    "absolute",
            display:     "block",
            borderRadius: "50%",
            left:        `${p.left}%`,
            bottom:      `${p.bottom}%`,
            width:       `${p.size}px`,
            height:      `${p.size}px`,
            // @ts-ignore CSS custom property
            "--p-sx":    `${p.sway}px`,
            background:  `rgba(${p.color},${p.opacity})`,
            boxShadow:   `0 0 ${p.size * 3}px ${p.size}px rgba(${p.color},${p.opacity * 0.5})`,
            animation:   `tsRise ${p.duration}s linear ${p.delay}s infinite`,
            willChange:  "transform, opacity",
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
