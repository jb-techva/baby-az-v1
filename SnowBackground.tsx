import { useEffect, useRef, memo } from 'react';

interface Snowflake {
  x: number;
  y: number;
  size: number;
  speed: number;
  drift: number;
  driftSpeed: number;
  rotation: number;
  rotationSpeed: number;
  type: 0 | 1 | 2; // 0: branching dendrite, 1: star crystal, 2: six-fold ice crystal
  opacity: number;
  color: string;
}

export const SnowBackground = memo(function SnowBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const isMobile = width < 640;
    // Naturally spaced, comfortable density (not crowded)
    const flakeCount = isMobile ? 24 : 45;
    const flakes: Snowflake[] = [];

    // Colors: Pure White, Frosted Silver, Pale Icy Blue
    const colors = ['#FFFFFF', '#F9FCFF', '#EAF6FF', '#DDE5EF', '#B9E2F5'];

    for (let i = 0; i < flakeCount; i++) {
      flakes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 10 + (isMobile ? 7 : 8), // 8px to 18px radius
        speed: Math.random() * 0.7 + 0.35,
        drift: Math.random() * Math.PI * 2,
        driftSpeed: Math.random() * 0.015 + 0.005,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.012,
        type: (i % 3) as 0 | 1 | 2,
        opacity: Math.random() * 0.5 + 0.4, // 0.4 to 0.9
        color: colors[i % colors.length],
      });
    }

    /**
     * Draw authentic six-pointed Frozen snowflakes
     */
    const drawSnowflake = (f: Snowflake) => {
      ctx.save();
      ctx.translate(f.x, f.y);
      ctx.rotate(f.rotation);
      ctx.globalAlpha = f.opacity;
      ctx.strokeStyle = f.color;
      ctx.fillStyle = f.color;
      ctx.lineWidth = Math.max(1, f.size * 0.1);
      ctx.lineCap = 'round';

      const r = f.size;

      if (f.type === 0) {
        // Type 0: Classic Elsa Branching Dendrite (6 arms with v-branches)
        for (let i = 0; i < 6; i++) {
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(0, -r);
          ctx.stroke();

          // Outer branchlets
          const b1 = r * 0.65;
          ctx.beginPath();
          ctx.moveTo(0, -b1);
          ctx.lineTo(-r * 0.3, -b1 - r * 0.2);
          ctx.moveTo(0, -b1);
          ctx.lineTo(r * 0.3, -b1 - r * 0.2);
          ctx.stroke();

          // Inner branchlets
          const b2 = r * 0.38;
          ctx.beginPath();
          ctx.moveTo(0, -b2);
          ctx.lineTo(-r * 0.22, -b2 - r * 0.15);
          ctx.moveTo(0, -b2);
          ctx.lineTo(r * 0.22, -b2 - r * 0.15);
          ctx.stroke();

          ctx.rotate(Math.PI / 3);
        }

        // Tiny central crystal dot
        ctx.beginPath();
        ctx.arc(0, 0, f.size * 0.12, 0, Math.PI * 2);
        ctx.fill();
      } else if (f.type === 1) {
        // Type 1: Star Crystal with Diamond Arrow Tips
        for (let i = 0; i < 6; i++) {
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(0, -r);
          ctx.stroke();

          // Diamond arrow tip at the end of each ray
          ctx.beginPath();
          ctx.moveTo(0, -r);
          ctx.lineTo(-r * 0.18, -r * 0.78);
          ctx.lineTo(0, -r * 0.62);
          ctx.lineTo(r * 0.18, -r * 0.78);
          ctx.closePath();
          ctx.fill();

          ctx.rotate(Math.PI / 3);
        }

        // Hexagon center
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const a = (i * Math.PI) / 3;
          const hx = Math.sin(a) * (r * 0.25);
          const hy = -Math.cos(a) * (r * 0.25);
          if (i === 0) ctx.moveTo(hx, hy);
          else ctx.lineTo(hx, hy);
        }
        ctx.closePath();
        ctx.stroke();
      } else {
        // Type 2: Delicate Six-Ray Ice Crystal with Cross-Feathers
        for (let i = 0; i < 6; i++) {
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(0, -r);
          ctx.stroke();

          // Delicate single chevron
          const b = r * 0.55;
          ctx.beginPath();
          ctx.moveTo(-r * 0.25, -b - r * 0.15);
          ctx.lineTo(0, -b);
          ctx.lineTo(r * 0.25, -b - r * 0.15);
          ctx.stroke();

          ctx.rotate(Math.PI / 3);
        }

        // Tiny crystal point at tips
        for (let i = 0; i < 6; i++) {
          ctx.beginPath();
          ctx.arc(0, -r, f.size * 0.08, 0, Math.PI * 2);
          ctx.fill();
          ctx.rotate(Math.PI / 3);
        }
      }

      ctx.restore();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < flakeCount; i++) {
        const f = flakes[i];

        if (!prefersReducedMotion) {
          f.y += f.speed;
          f.drift += f.driftSpeed;
          f.x += Math.sin(f.drift) * 0.55;
          f.rotation += f.rotationSpeed;
        }

        // Wrap around viewport edges
        if (f.y > height + 20) {
          f.y = -20;
          f.x = Math.random() * width;
        }
        if (f.x > width + 20) f.x = -20;
        if (f.x < -20) f.x = width + 20;

        drawSnowflake(f);
      }

      ctx.globalAlpha = 1;

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(draw);
      }
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-20"
      aria-hidden="true"
    />
  );
});
