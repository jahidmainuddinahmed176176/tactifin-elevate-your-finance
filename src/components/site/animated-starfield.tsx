import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
}

export function AnimatedStarfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Create stars
    const stars: Star[] = [];
    const starCount = 60;

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.3,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 2,
      });
    }

    let animationFrameId: number;
    const startTime = Date.now();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const elapsed = (Date.now() - startTime) / 1000;

      stars.forEach((star) => {
        const time = (elapsed - star.delay) % star.duration;
        const progress = time / star.duration;

        // Calculate position - moving upward
        const yOffset = progress * 100;
        const currentY = star.y - yOffset;

        // Reset position when star goes above the viewport
        let drawY = currentY;
        if (currentY < -50) {
          drawY = canvas.height + 50;
        }

        // Pulsing opacity effect
        const pulse = Math.sin(progress * Math.PI * 2) * 0.3 + 0.7;
        const opacity = star.opacity * pulse;

        // Draw glow effect
        const gradient = ctx.createRadialGradient(star.x, drawY, 0, star.x, drawY, star.size * 3);
        gradient.addColorStop(0, `rgba(100, 200, 255, ${opacity * 0.6})`);
        gradient.addColorStop(1, `rgba(100, 200, 255, 0)`);

        ctx.fillStyle = gradient;
        ctx.fillRect(star.x - star.size * 3, drawY - star.size * 3, star.size * 6, star.size * 6);

        // Draw star core
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, drawY, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none opacity-60"
      style={{ zIndex: 0 }}
    />
  );
}
