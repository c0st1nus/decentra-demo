"use client";

import { useEffect, useRef, useCallback } from "react";

// ── Desktop defaults ──
const STAR_COUNT_DESKTOP = 150;
const STAR_COUNT_MOBILE = 60;
const BASE_SPEED = 0.05;
const PRIMARY = "255, 255, 255"; // White stars

// ~30fps on mobile (skip every other frame)
const MOBILE_FRAME_INTERVAL = 1000 / 30;

// Indices for the Float32Array
const X = 0;
const Y = 1;
const Z = 2; // Depth
const SIZE = 3;
const STRIDE = 4;

function isMobileDevice() {
  if (typeof window === "undefined") return false;

  return window.innerWidth < 768 || "ontouchstart" in window;
}

export function SpaceBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Float32Array | null>(null);
  const animFrameRef = useRef<number>(0);
  const dimensionsRef = useRef({ w: 0, h: 0 });
  const isMobileRef = useRef(false);
  const starCountRef = useRef(STAR_COUNT_DESKTOP);
  const lastFrameTimeRef = useRef(0);

  const initStars = useCallback((w: number, h: number, count: number) => {
    const stars = new Float32Array(count * STRIDE);

    for (let i = 0; i < count; i++) {
      resetStar(stars, i, w, h, true);
    }
    starsRef.current = stars;
  }, []);

  const resetStar = (
    stars: Float32Array,
    i: number,
    w: number,
    h: number,
    initial: boolean = false,
  ) => {
    const idx = i * STRIDE;

    stars[idx + X] = (Math.random() - 0.5) * w * 2; // Spread wider to cover rotation/movement if needed
    stars[idx + Y] = (Math.random() - 0.5) * h * 2;
    stars[idx + Z] = initial ? Math.random() * 1000 : 1000; // Start at random depth or far away
    stars[idx + SIZE] = Math.random() * 1.5 + 0.5;
  };

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false }); // False alpha for maybe better perf on black bg

    if (!ctx) return;

    const mobile = isMobileDevice();

    isMobileRef.current = mobile;
    const starCount = mobile ? STAR_COUNT_MOBILE : STAR_COUNT_DESKTOP;

    starCountRef.current = starCount;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2);
      const w = window.innerWidth;
      const h = window.innerHeight;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dimensionsRef.current = { w, h };

      if (!starsRef.current) {
        initStars(w, h, starCount);
      }
    };

    resize();
    window.addEventListener("resize", resize);

    const animate = (timestamp: number) => {
      // Throttle to ~30fps on mobile
      if (mobile) {
        const elapsed = timestamp - lastFrameTimeRef.current;

        if (elapsed < MOBILE_FRAME_INTERVAL) {
          animFrameRef.current = requestAnimationFrame(animate);

          return;
        }
        lastFrameTimeRef.current = timestamp - (elapsed % MOBILE_FRAME_INTERVAL);
      }

      const { w, h } = dimensionsRef.current;
      const stars = starsRef.current;
      const count = starCountRef.current;
      const cx = w / 2;
      const cy = h / 2;

      if (!stars) return;

      // Clear with very slight transparency for trails? No, requested "space with stars", usually clear.
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = `rgb(${PRIMARY})`;

      // ── Update and Draw stars ──
      for (let i = 0; i < count; i++) {
        const idx = i * STRIDE;

        // Move star closer
        stars[idx + Z] -= (10 + (2000 - stars[idx + Z]) * 0.01) * BASE_SPEED * (mobile ? 2 : 1);

        // Reset if behind camera
        if (stars[idx + Z] <= 0) {
          resetStar(stars, i, w, h);
          continue;
        }

        const x = stars[idx + X];
        const y = stars[idx + Y];
        const z = stars[idx + Z];

        // Project
        const scale = 500 / z;
        const screenX = cx + x * scale;
        const screenY = cy + y * scale;
        const size = stars[idx + SIZE] * scale;

        // Draw if within bounds
        if (screenX >= 0 && screenX <= w && screenY >= 0 && screenY <= h) {
          const alpha = Math.min(1, (1000 - z) / 200);

          ctx.globalAlpha = alpha;
          ctx.beginPath();
          ctx.arc(screenX, screenY, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [initStars]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-screen h-screen pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
