"use client";

import { useEffect, useRef, useCallback } from "react";

// ── Desktop defaults ──
const PARTICLE_COUNT_DESKTOP = 65;
const PARTICLE_COUNT_MOBILE = 25;
const CONNECTION_DISTANCE = 130;
const CONNECTION_DIST_SQ = CONNECTION_DISTANCE * CONNECTION_DISTANCE;
const MOUSE_RADIUS = 200;
const MOUSE_RADIUS_SQ = MOUSE_RADIUS * MOUSE_RADIUS;
const MOUSE_FORCE = 0.12;
const DAMPING = 0.96;
const BASE_SPEED = 0.3;
const LEASH_RADIUS = 110;
const LEASH_RADIUS_SQ = LEASH_RADIUS * LEASH_RADIUS;
const SPRING_K = 0.008;
const PRIMARY = "140,216,18";

// ~30fps on mobile (skip every other frame)
const MOBILE_FRAME_INTERVAL = 1000 / 30;

// Indices for the Float32Array
const X = 0;
const Y = 1;
const ORIGIN_X = 2;
const ORIGIN_Y = 3;
const VX = 4;
const VY = 5;
const BASE_VX = 6;
const BASE_VY = 7;
const RADIUS = 8;
const STRIDE = 9;

function isMobileDevice() {
  if (typeof window === "undefined") return false;

  return window.innerWidth < 768 || "ontouchstart" in window;
}

export function NeuralNetworkBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Float32Array | null>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const animFrameRef = useRef<number>(0);
  const dimensionsRef = useRef({ w: 0, h: 0 });
  const isMobileRef = useRef(false);
  const particleCountRef = useRef(PARTICLE_COUNT_DESKTOP);
  const lastFrameTimeRef = useRef(0);

  const initParticles = useCallback((w: number, h: number, count: number) => {
    const particles = new Float32Array(count * STRIDE);

    for (let i = 0; i < count; i++) {
      const idx = i * STRIDE;
      const angle = Math.random() * Math.PI * 2;
      const speed = (Math.random() * 0.5 + 0.5) * BASE_SPEED;
      const px = Math.random() * w;
      const py = Math.random() * h;

      particles[idx + X] = px;
      particles[idx + Y] = py;
      particles[idx + ORIGIN_X] = px;
      particles[idx + ORIGIN_Y] = py;
      particles[idx + VX] = 0;
      particles[idx + VY] = 0;
      particles[idx + BASE_VX] = Math.cos(angle) * speed;
      particles[idx + BASE_VY] = Math.sin(angle) * speed;
      particles[idx + RADIUS] = Math.random() * 1.4 + 0.6;
    }
    particlesRef.current = particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });

    if (!ctx) return;

    const mobile = isMobileDevice();

    isMobileRef.current = mobile;
    const particleCount = mobile ? PARTICLE_COUNT_MOBILE : PARTICLE_COUNT_DESKTOP;

    particleCountRef.current = particleCount;

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

      if (!particlesRef.current) {
        initParticles(w, h, particleCount);
      }
    };

    resize();
    window.addEventListener("resize", resize);

    // Skip mouse listeners on touch devices — no persistent cursor
    let cleanupMouse = () => {};

    if (!mobile) {
      const handleMouseMove = (e: MouseEvent) => {
        mouseRef.current = { x: e.clientX, y: e.clientY };
      };
      const handleMouseLeave = () => {
        mouseRef.current = { x: -9999, y: -9999 };
      };

      window.addEventListener("mousemove", handleMouseMove, { passive: true });
      document.addEventListener("mouseleave", handleMouseLeave);
      cleanupMouse = () => {
        window.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseleave", handleMouseLeave);
      };
    }

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
      const particles = particlesRef.current;
      const count = particleCountRef.current;

      if (!particles) return;

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const mouseActive = !mobile && mx > -9000;

      ctx.clearRect(0, 0, w, h);

      // ── Update all particles ──
      for (let i = 0; i < count; i++) {
        const idx = i * STRIDE;
        const px = particles[idx + X];
        const py = particles[idx + Y];
        const originX = particles[idx + ORIGIN_X];
        const originY = particles[idx + ORIGIN_Y];
        let vx = particles[idx + VX];
        let vy = particles[idx + VY];

        // Mouse attraction (desktop only)
        if (mouseActive) {
          const dxM = mx - px;
          const dyM = my - py;
          const distSqM = dxM * dxM + dyM * dyM;

          if (distSqM < MOUSE_RADIUS_SQ && distSqM > 1) {
            const distM = Math.sqrt(distSqM);
            const t = 1 - distM / MOUSE_RADIUS;
            const force = t * t * MOUSE_FORCE;

            vx += (dxM / distM) * force;
            vy += (dyM / distM) * force;
          }
        }

        // Spring back toward origin
        const dxO = originX - px;
        const dyO = originY - py;
        const distSqO = dxO * dxO + dyO * dyO;

        if (distSqO > 1) {
          vx += dxO * SPRING_K;
          vy += dyO * SPRING_K;
        }

        // Hard leash (only sqrt when needed)
        if (distSqO > LEASH_RADIUS_SQ) {
          const distO = Math.sqrt(distSqO);
          const ratio = LEASH_RADIUS / distO;

          particles[idx + X] = originX - dxO * ratio;
          particles[idx + Y] = originY - dyO * ratio;
        }

        vx *= DAMPING;
        vy *= DAMPING;
        particles[idx + X] += vx;
        particles[idx + Y] += vy;
        particles[idx + VX] = vx;
        particles[idx + VY] = vy;

        // Drift the origin
        let newOriginX = originX + particles[idx + BASE_VX];
        let newOriginY = originY + particles[idx + BASE_VY];

        if (newOriginX < -10) {
          newOriginX += w + 20;
          particles[idx + X] += w + 20;
        } else if (newOriginX > w + 10) {
          newOriginX -= w + 20;
          particles[idx + X] -= w + 20;
        }

        if (newOriginY < -10) {
          newOriginY += h + 20;
          particles[idx + Y] += h + 20;
        } else if (newOriginY > h + 10) {
          newOriginY -= h + 20;
          particles[idx + Y] -= h + 20;
        }

        particles[idx + ORIGIN_X] = newOriginX;
        particles[idx + ORIGIN_Y] = newOriginY;
      }

      // ── Draw connections ──
      const opacityBuckets: number[] = [];

      for (let i = 0; i < count; i++) {
        const idxI = i * STRIDE;
        const pix = particles[idxI + X];
        const piy = particles[idxI + Y];

        for (let j = i + 1; j < count; j++) {
          const idxJ = j * STRIDE;
          const pjx = particles[idxJ + X];
          const pjy = particles[idxJ + Y];
          const dx = pix - pjx;
          const dy = piy - pjy;
          const distSq = dx * dx + dy * dy;

          if (distSq < CONNECTION_DIST_SQ) {
            const dist = Math.sqrt(distSq);
            const opacity = (1 - dist / CONNECTION_DISTANCE) * 0.35;

            if (opacity > 0.02) {
              opacityBuckets.push(pix, piy, pjx, pjy, opacity);
            }
          }
        }
      }

      // On mobile, use fewer opacity groups for less state changes
      ctx.lineWidth = 0.6;
      if (mobile) {
        // Single batch on mobile
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${PRIMARY},0.15)`;
        for (let k = 0; k < opacityBuckets.length; k += 5) {
          ctx.moveTo(opacityBuckets[k], opacityBuckets[k + 1]);
          ctx.lineTo(opacityBuckets[k + 2], opacityBuckets[k + 3]);
        }
        ctx.stroke();
      } else {
        const groups = [0.25, 0.15, 0.06];

        for (const threshold of groups) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(${PRIMARY},${threshold + 0.05})`;
          for (let k = 0; k < opacityBuckets.length; k += 5) {
            const op = opacityBuckets[k + 4];

            if (op >= threshold && op < threshold + 0.12) {
              ctx.moveTo(opacityBuckets[k], opacityBuckets[k + 1]);
              ctx.lineTo(opacityBuckets[k + 2], opacityBuckets[k + 3]);
            }
          }
          ctx.stroke();
        }

        // Remaining low-opacity lines
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${PRIMARY},0.04)`;
        for (let k = 0; k < opacityBuckets.length; k += 5) {
          const op = opacityBuckets[k + 4];

          if (op < 0.06) {
            ctx.moveTo(opacityBuckets[k], opacityBuckets[k + 1]);
            ctx.lineTo(opacityBuckets[k + 2], opacityBuckets[k + 3]);
          }
        }
        ctx.stroke();
      }

      // ── Draw cursor connections (desktop only) ──
      if (mouseActive) {
        ctx.lineWidth = 0.4;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${PRIMARY},0.35)`;
        for (let i = 0; i < count; i++) {
          const idx = i * STRIDE;
          const px = particles[idx + X];
          const py = particles[idx + Y];
          const dx = mx - px;
          const dy = my - py;
          const distSq = dx * dx + dy * dy;

          if (distSq < MOUSE_RADIUS_SQ) {
            ctx.moveTo(px, py);
            ctx.lineTo(mx, my);
          }
        }
        ctx.stroke();
      }

      // ── Draw particles — single fill pass ──
      ctx.fillStyle = `rgba(${PRIMARY},0.85)`;
      ctx.beginPath();
      for (let i = 0; i < count; i++) {
        const idx = i * STRIDE;
        const px = particles[idx + X];
        const py = particles[idx + Y];
        const r = particles[idx + RADIUS];

        ctx.moveTo(px + r, py);
        ctx.arc(px, py, r, 0, Math.PI * 2);
      }
      ctx.fill();

      // Glow pass — skip on mobile (expensive, barely visible on small screens)
      if (!mobile) {
        ctx.fillStyle = `rgba(${PRIMARY},0.08)`;
        ctx.beginPath();
        for (let i = 0; i < count; i++) {
          const idx = i * STRIDE;
          const px = particles[idx + X];
          const py = particles[idx + Y];
          const r = particles[idx + RADIUS];

          ctx.moveTo(px + r * 4, py);
          ctx.arc(px, py, r * 4, 0, Math.PI * 2);
        }
        ctx.fill();
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
      cleanupMouse();
    };
  }, [initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-screen h-screen pointer-events-none"
      style={{ zIndex: 0, willChange: "transform" }}
    />
  );
}
