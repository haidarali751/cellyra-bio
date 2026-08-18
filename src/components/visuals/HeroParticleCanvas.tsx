"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/context/ThemeContext";

/*
 * HeroParticleCanvas — performance-first rewrite with Day / Night support
 */

const PARTICLE_COUNT = 2000;
const REPULSION_RADIUS = 200;
const REPULSION_RADIUS2 = REPULSION_RADIUS * REPULSION_RADIUS; // pre-squared
const REPULSION_FORCE = 6.0;
const FRICTION = 0.88;
const RETURN_SPEED = 0.045;

const DARK_PALETTE: [string, number][] = [
  ["#ffffff", 50], // Pure crystal white
  ["#f1f5f9", 25], // Bright platinum silver
  ["#cbd5e1", 15], // Soft frosted silver
  ["#94a3b8", 10], // Shimmering slate silver
];

const LIGHT_PALETTE: [string, number][] = [
  ["#090d16", 50], // Deep obsidian ink
  ["#1e293b", 25], // Midnight slate
  ["#475569", 15], // Charcoal
  ["#64748b", 10], // Soft slate
];

interface Particle {
  homeX: number;
  homeY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  rgba: string;
  phaseOffset: number;
  speedFactor: number;
}

const pickColor = (isLight: boolean): string => {
  const palette = isLight ? LIGHT_PALETTE : DARK_PALETTE;
  const r = Math.random() * 100;
  let acc = 0;
  for (const [hex, w] of palette) {
    acc += w;
    if (r < acc) return hex;
  }
  return palette[0][0];
};

const hexToRgba = (hex: string, alpha: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha.toFixed(2)})`;
};

const HeroParticleCanvas = () => {
  const { theme } = useTheme();
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scatterRef = useRef<() => void>(() => {});

  useEffect(() => {
    scatterRef.current();
  }, [theme]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true })!;

    let W = 0,
      H = 0;
    let rafId: number;
    let running = false;
    let particles: Particle[] = [];
    let cachedRect = { left: 0, top: 0 };
    const mouse = { x: -99999, y: -99999 };
    let time = 0;

    /* ── resize ──────────────────────────────────────────────────── */
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2); // cap at 2×
      const rect = wrap!.getBoundingClientRect();
      cachedRect = { left: rect.left, top: rect.top };
      W = rect.width;
      H = rect.height;
      canvas!.width = W * dpr;
      canvas!.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      scatter();
    };

    /* ── scatter ─────────────────────────────────────────────────── */
    const scatter = () => {
      const isLight = document.documentElement.classList.contains("light");
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const hx = Math.random() * W;
        const hy = Math.random() * H;
        const radius =
          Math.random() < 0.75
            ? 0.8 + Math.random() * 2.0
            : 2.5 + Math.random() * 4.5;
        const alpha = isLight
          ? 0.35 + Math.random() * 0.5
          : 0.25 + Math.random() * 0.5;
        const color = pickColor(isLight);
        particles.push({
          homeX: hx,
          homeY: hy,
          x: hx,
          y: hy,
          vx: 0,
          vy: 0,
          radius,
          rgba: hexToRgba(color, alpha),
          phaseOffset: Math.random() * Math.PI * 2,
          speedFactor: 0.4 + Math.random() * 0.6,
        });
      }
    };
    scatterRef.current = scatter;

    /* ── draw ────────────────────────────────────────────────────── */
    const draw = () => {
      if (!running) return;
      ctx.clearRect(0, 0, W, H);
      time += 0.008;

      const mx = mouse.x,
        my = mouse.y;
      const rr = REPULSION_RADIUS2;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const dx = mx - p.x;
        const dy = my - p.y;
        const d2 = dx * dx + dy * dy; // NO Math.sqrt

        if (d2 < rr && d2 > 0.25) {
          const d = Math.sqrt(d2); // sqrt only when needed
          const force =
            ((REPULSION_RADIUS - d) / REPULSION_RADIUS) * REPULSION_FORCE;
          p.vx -= (dx / d) * force;
          p.vy -= (dy / d) * force;
        }

        // float
        const fx = Math.sin(time * p.speedFactor + p.phaseOffset) * 2.5;
        const fy = Math.cos(time * p.speedFactor * 0.7 + p.phaseOffset) * 2.5;

        p.vx += (p.homeX + fx - p.x) * RETURN_SPEED;
        p.vy += (p.homeY + fy - p.y) * RETURN_SPEED;
        p.vx *= FRICTION;
        p.vy *= FRICTION;
        p.x += p.vx;
        p.y += p.vy;

        ctx.fillStyle = p.rgba; // pre-baked string — zero allocation
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = requestAnimationFrame(draw);
    };

    /* ── visibility ──────────────────────────────────────────────── */
    const start = () => {
      if (!running) {
        running = true;
        draw();
      }
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(rafId);
    };

    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 },
    );
    io.observe(wrap);

    /* ── mouse — attached to section, NOT canvas ─────────────────── */
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX - cachedRect.left;
      mouse.y = e.clientY - cachedRect.top;
    };
    const onMouseLeave = () => {
      mouse.x = -99999;
      mouse.y = -99999;
    };
    const onTouchMove = (e: TouchEvent) => {
      mouse.x = e.touches[0].clientX - cachedRect.left;
      mouse.y = e.touches[0].clientY - cachedRect.top;
    };

    wrap.addEventListener("mousemove", onMouseMove);
    wrap.addEventListener("mouseleave", onMouseLeave);
    wrap.addEventListener("touchmove", onTouchMove, { passive: true });
    wrap.addEventListener("touchend", onMouseLeave);

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    resize();

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      wrap.removeEventListener("mousemove", onMouseMove);
      wrap.removeEventListener("mouseleave", onMouseLeave);
      wrap.removeEventListener("touchmove", onTouchMove);
      wrap.removeEventListener("touchend", onMouseLeave);
    };
  }, []);

  return (
    /* wrapper div — receives mouse events, canvas itself is pointer-events:none */
    <div
      ref={wrapRef}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 1,
        willChange: "transform", // promote to GPU layer
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          display: "block",
          pointerEvents: "none", // scroll events pass through freely
        }}
        aria-hidden="true"
      />
    </div>
  );
};

export default HeroParticleCanvas;
