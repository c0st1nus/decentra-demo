"use client";

import { useEffect, useRef, useCallback } from "react";

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    baseVx: number;
    baseVy: number;
    radius: number;
}

const PARTICLE_COUNT = 120;
const CONNECTION_DISTANCE = 140;
const MOUSE_RADIUS = 250;
const MOUSE_FORCE = 0.15;
const DAMPING = 0.97;
const BASE_SPEED = 0.35;
const PRIMARY_R = 140;
const PRIMARY_G = 216;
const PRIMARY_B = 18;

export function NeuralNetworkBg() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const mouseRef = useRef({ x: -9999, y: -9999 });
    const animFrameRef = useRef<number>(0);
    const dimensionsRef = useRef({ w: 0, h: 0 });

    const initParticles = useCallback((w: number, h: number) => {
        const particles: Particle[] = [];

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = (Math.random() * 0.5 + 0.5) * BASE_SPEED;

            particles.push({
                x: Math.random() * w,
                y: Math.random() * h,
                vx: 0,
                vy: 0,
                baseVx: Math.cos(angle) * speed,
                baseVy: Math.sin(angle) * speed,
                radius: Math.random() * 1.6 + 0.8,
            });
        }
        particlesRef.current = particles;
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;

        if (!canvas) return;
        const ctx = canvas.getContext("2d");

        if (!ctx) return;

        const resize = () => {
            const dpr = window.devicePixelRatio || 1;
            const w = window.innerWidth;
            const h = window.innerHeight;

            canvas.width = w * dpr;
            canvas.height = h * dpr;
            canvas.style.width = `${w}px`;
            canvas.style.height = `${h}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            dimensionsRef.current = { w, h };

            if (particlesRef.current.length === 0) {
                initParticles(w, h);
            }
        };

        resize();
        window.addEventListener("resize", resize);

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };

        const handleMouseLeave = () => {
            mouseRef.current = { x: -9999, y: -9999 };
        };

        window.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseleave", handleMouseLeave);

        const animate = () => {
            const { w, h } = dimensionsRef.current;
            const particles = particlesRef.current;
            const mouse = mouseRef.current;

            ctx.clearRect(0, 0, w, h);

            // ── Update particles ──
            for (const p of particles) {
                // Apply constant base drift
                p.vx += p.baseVx * 0.01;
                p.vy += p.baseVy * 0.01;

                // Mouse attraction — strong pull toward cursor
                const dxM = mouse.x - p.x;
                const dyM = mouse.y - p.y;
                const distM = Math.sqrt(dxM * dxM + dyM * dyM);

                if (distM < MOUSE_RADIUS && distM > 1) {
                    // Quadratic falloff for snappy attraction
                    const t = 1 - distM / MOUSE_RADIUS;
                    const force = t * t * MOUSE_FORCE;

                    p.vx += (dxM / distM) * force;
                    p.vy += (dyM / distM) * force;
                }

                p.vx *= DAMPING;
                p.vy *= DAMPING;
                p.x += p.vx;
                p.y += p.vy;

                // Wrap around all edges seamlessly
                if (p.x < -10) p.x += w + 20;
                else if (p.x > w + 10) p.x -= w + 20;
                if (p.y < -10) p.y += h + 20;
                else if (p.y > h + 10) p.y -= h + 20;
            }

            // ── Draw inter-particle connections ──
            ctx.lineWidth = 0.7;
            for (let i = 0; i < particles.length; i++) {
                const pi = particles[i];

                for (let j = i + 1; j < particles.length; j++) {
                    const pj = particles[j];
                    const dx = pi.x - pj.x;
                    const dy = pi.y - pj.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < CONNECTION_DISTANCE) {
                        const opacity = (1 - dist / CONNECTION_DISTANCE) * 0.4;

                        ctx.beginPath();
                        ctx.moveTo(pi.x, pi.y);
                        ctx.lineTo(pj.x, pj.y);
                        ctx.strokeStyle = `rgba(${PRIMARY_R},${PRIMARY_G},${PRIMARY_B},${opacity})`;
                        ctx.stroke();
                    }
                }
            }

            // ── Draw cursor connection lines ──
            if (mouse.x > -9000) {
                ctx.lineWidth = 0.5;
                for (const p of particles) {
                    const dx = mouse.x - p.x;
                    const dy = mouse.y - p.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < MOUSE_RADIUS) {
                        const opacity = (1 - dist / MOUSE_RADIUS) * 0.55;

                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.strokeStyle = `rgba(${PRIMARY_R},${PRIMARY_G},${PRIMARY_B},${opacity})`;
                        ctx.stroke();
                    }
                }
            }

            // ── Draw particles with glow ──
            for (const p of particles) {
                // Outer glow
                const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 5);

                g.addColorStop(0, `rgba(${PRIMARY_R},${PRIMARY_G},${PRIMARY_B},0.55)`);
                g.addColorStop(1, `rgba(${PRIMARY_R},${PRIMARY_G},${PRIMARY_B},0)`);
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius * 5, 0, Math.PI * 2);
                ctx.fillStyle = g;
                ctx.fill();

                // Core dot
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${PRIMARY_R},${PRIMARY_G},${PRIMARY_B},0.9)`;
                ctx.fill();
            }

            animFrameRef.current = requestAnimationFrame(animate);
        };

        animFrameRef.current = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animFrameRef.current);
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [initParticles]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-screen h-screen pointer-events-none"
            style={{ zIndex: 0 }}
        />
    );
}
