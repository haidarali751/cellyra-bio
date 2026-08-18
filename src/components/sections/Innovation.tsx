"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import {
  innovationMetrics,
  molecules,
  genomicSequence,
  innovationTags,
} from "@/data";

/* animated counter */
const Counter = ({
  to,
  decimals = 0,
  suffix = "",
}: {
  to: number;
  decimals?: number;
  suffix?: string;
}) => {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  useEffect(() => {
    if (!inView) return;
    const dur = 1800;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / dur, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setVal(parseFloat((ease * to).toFixed(decimals)));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, to, decimals]);
  return (
    <span ref={ref}>
      {val.toFixed(decimals)}
      {suffix}
    </span>
  );
};

/* DNA helix canvas — no shadowBlur, pauses when off-screen */
const DNAHelixCanvas = () => {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let raf: number;
    let running = false;
    let t = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = canvas!.offsetWidth * dpr;
      canvas!.height = canvas!.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      if (!running) return;
      const isLight = document.documentElement.classList.contains("light");
      const W = canvas!.offsetWidth;
      const H = canvas!.offsetHeight;
      ctx.clearRect(0, 0, W, H);
      t += 0.012;
      const cx = W / 2;
      const steps = 50;
      const amp = W * 0.28;
      const stepH = H / steps;

      // rungs
      for (let i = 0; i < steps; i++) {
        const y = i * stepH;
        const angle = (i / steps) * Math.PI * 4 + t;
        const x1 = cx + Math.sin(angle) * amp;
        const x2 = cx + Math.sin(angle + Math.PI) * amp;
        const alpha = isLight
          ? 0.12 + ((Math.sin(angle) + 1) / 2) * 0.2
          : 0.08 + ((Math.sin(angle) + 1) / 2) * 0.2;
        ctx.beginPath();
        ctx.moveTo(x1, y);
        ctx.lineTo(x2, y);
        ctx.strokeStyle = isLight
          ? `rgba(0,0,0,${alpha.toFixed(2)})`
          : `rgba(255,255,255,${alpha.toFixed(2)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // strands
      const strandA: [number, number][] = [];
      const strandB: [number, number][] = [];
      for (let i = 0; i <= steps; i++) {
        const angle = (i / steps) * Math.PI * 4 + t;
        strandA.push([cx + Math.sin(angle) * amp, i * stepH]);
        strandB.push([cx + Math.sin(angle + Math.PI) * amp, i * stepH]);
      }
      const colorA = isLight ? "#090d16" : "#ffffff";
      const colorB = isLight ? "#475569" : "#cbd5e1";

      [
        { pts: strandA, color: colorA },
        { pts: strandB, color: colorB },
      ].forEach(({ pts, color }) => {
        ctx.beginPath();
        pts.forEach(([x, y], i) =>
          i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y),
        );
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.stroke();
      });

      // nodes
      for (let i = 0; i <= steps; i += 3) {
        const depth = (Math.sin((i / steps) * Math.PI * 4 + t) + 1) / 2;
        const r = 2 + depth * 2;
        [
          { x: strandA[i][0], y: strandA[i][1], c: colorA },
          { x: strandB[i][0], y: strandB[i][1], c: colorB },
        ].forEach(({ x, y, c }) => {
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fillStyle = c;
          ctx.fill();
        });
      }
      raf = requestAnimationFrame(draw);
    };

    const start = () => {
      if (!running) {
        running = true;
        draw();
      }
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };
    const io = new IntersectionObserver(
      ([e]) => (e.isIntersecting ? start() : stop()),
      { threshold: 0 },
    );
    io.observe(canvas);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
    };
  }, [theme]);

  return (
    <canvas ref={canvasRef} className="w-full h-full" aria-hidden="true" />
  );
};

/* node network canvas — pauses when off-screen */
const NodeNetworkCanvas = () => {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let raf: number;
    let running = false;
    let t = 0;

    const isLight = document.documentElement.classList.contains("light");
    const darkColors = ["#ffffff", "#f1f5f9", "#cbd5e1", "#94a3b8"];
    const lightColors = ["#090d16", "#1e293b", "#334155", "#64748b"];
    const activeColors = isLight ? lightColors : darkColors;

    const nodes = Array.from({ length: 18 }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0006,
      vy: (Math.random() - 0.5) * 0.0006,
      r: 2.5 + Math.random() * 3.5,
      color: activeColors[Math.floor(Math.random() * 4)],
      pulse: Math.random() * Math.PI * 2,
    }));

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = canvas!.offsetWidth * dpr;
      canvas!.height = canvas!.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      if (!running) return;
      const isLightMode = document.documentElement.classList.contains("light");
      const W = canvas!.offsetWidth,
        H = canvas!.offsetHeight;
      ctx.clearRect(0, 0, W, H);
      t += 0.01;

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > 1) n.vx *= -1;
        if (n.y < 0 || n.y > 1) n.vy *= -1;
      }

      // connections
      ctx.lineWidth = 0.8;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = (nodes[i].x - nodes[j].x) * W;
          const dy = (nodes[i].y - nodes[j].y) * H;
          const d2 = dx * dx + dy * dy;
          if (d2 < 160 * 160) {
            const a = (1 - Math.sqrt(d2) / 160) * 0.25;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x * W, nodes[i].y * H);
            ctx.lineTo(nodes[j].x * W, nodes[j].y * H);
            ctx.strokeStyle = isLightMode
              ? `rgba(0,0,0,${a.toFixed(2)})`
              : `rgba(255,255,255,${a.toFixed(2)})`;
            ctx.stroke();
          }
        }
      }

      // nodes
      for (const n of nodes) {
        const pulse = 1 + Math.sin(t * 2 + n.pulse) * 0.25;
        const x = n.x * W,
          y = n.y * H,
          r = n.r * pulse;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    const start = () => {
      if (!running) {
        running = true;
        draw();
      }
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };
    const io = new IntersectionObserver(
      ([e]) => (e.isIntersecting ? start() : stop()),
      { threshold: 0 },
    );
    io.observe(canvas);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
    };
  }, [theme]);

  return (
    <canvas ref={canvasRef} className="w-full h-full" aria-hidden="true" />
  );
};

const GenomicTicker = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let x = 0;
    let raf: number;
    const tick = () => {
      x -= 0.6;
      if (x < -el!.scrollWidth / 2) x = 0;
      el!.style.transform = `translateX(${x}px)`;
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(raf);
  }, []);
  const doubled = genomicSequence + genomicSequence;
  return (
    <div className="overflow-hidden whitespace-nowrap font-mono text-[10px] tracking-[0.18em] text-(--cellyra-muted) opacity-50 select-none">
      <div ref={ref} className="inline-block">
        {doubled}
      </div>
    </div>
  );
};

/* main section */
export const Innovation = () => {
  return (
    <section
      id="innovation"
      className="relative min-h-screen overflow-hidden bg-(--cellyra-bg) text-(--cellyra-text) transition-colors duration-500"
    >
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute right-[10%] top-[20%] h-150 w-150 rounded-full blur-[180px] opacity-30 dark:opacity-100"
          style={{
            background:
              "radial-gradient(circle, var(--cellyra-border) 0%, transparent 70%)",
          }}
        />
      </div>
      <div className="cellyra-noise absolute inset-0 pointer-events-none" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]">
        {[15, 38, 62, 85].map((p) => (
          <div
            key={p}
            className="absolute left-0 w-full h-px bg-current"
            style={{ top: `${p}%` }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-28 lg:px-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-3"
        >
          <span className="h-px w-8 bg-(--cellyra-text) opacity-40" />
          <span className="font-mono text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.28em] text-(--cellyra-muted)">
            01 // Synthetic Architecture &amp; Genomics
          </span>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-start">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.85 }}
              className="font-heading text-[clamp(2.4rem,5.2vw,4.4rem)] font-bold leading-[0.94] tracking-[-0.04em] text-(--cellyra-text)"
            >
              Biology is not
              <br />
              just something
              <br />
              to understand.
              <span
                className="block mt-3 font-semibold"
                style={{
                  background:
                    "linear-gradient(135deg, var(--cellyra-text) 10%, var(--cellyra-muted) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                It is something
                <br />
                to engineer.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mt-8 max-w-lg font-sans text-base sm:text-lg leading-relaxed text-(--cellyra-muted)"
            >
              We harness the programmable logic of living systems — combining
              synthetic biology, computational genomics, and precision CRISPR
              engineering into unified therapeutic platforms.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-10 grid grid-cols-2 gap-4"
            >
              {innovationMetrics.map((m, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-5 bg-(--cellyra-surface) border border-(--cellyra-border) shadow-sm hover:border-(--cellyra-silver-border) transition-colors duration-300"
                >
                  <div className="font-mono text-3xl sm:text-4xl font-bold tracking-tight text-(--cellyra-text) leading-none">
                    <Counter
                      to={m.value}
                      decimals={m.decimals}
                      suffix={m.suffix}
                    />
                  </div>
                  <span className="block font-mono text-[9px] font-semibold uppercase tracking-[0.22em] text-(--cellyra-muted) mt-3">
                    {m.label}
                  </span>
                </div>
              ))}
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 flex flex-wrap gap-2"
            >
              {innovationTags.map((tag) => (
                <span
                  key={tag}
                  className="px-3.5 py-1.5 rounded-full font-mono text-[10px] uppercase tracking-[0.16em] font-medium border border-(--cellyra-border) text-(--cellyra-text) bg-(--cellyra-surface) hover:border-(--cellyra-silver-border) transition-colors duration-200 cursor-default"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1 }}
              className="relative rounded-2xl overflow-hidden bg-(--cellyra-surface) border border-(--cellyra-border)"
              style={{ height: "500px" }}
            >
              <div className="absolute inset-0">
                <NodeNetworkCanvas />
              </div>
              <div className="absolute right-0 top-0 h-full w-[42%] border-l border-(--cellyra-border)">
                <DNAHelixCanvas />
              </div>
              {molecules.map((m, i) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="absolute pointer-events-none"
                  style={{ left: m.x, top: m.y }}
                >
                  <div className="rounded-lg px-2.5 py-1.5 backdrop-blur-md bg-(--cellyra-surface)/90 border border-(--cellyra-border) shadow-sm">
                    <div className="text-[11px] font-semibold font-mono leading-none text-(--cellyra-text)">
                      {m.label}
                    </div>
                    <div className="text-[8px] mt-0.5 text-(--cellyra-muted) font-mono">
                      {m.sub}
                    </div>
                  </div>
                </motion.div>
              ))}
              <div className="absolute bottom-4 left-4 text-[9px] uppercase tracking-[0.25em] text-(--cellyra-muted) font-mono">
                Live Molecular Network · 18 nodes
              </div>
              <div className="absolute top-4 right-4 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-(--cellyra-text) animate-pulse" />
                <span className="text-[9px] uppercase tracking-[0.2em] text-(--cellyra-text) opacity-80 font-mono">
                  Simulating
                </span>
              </div>
            </motion.div>
            <div className="mt-4 py-2 border-y border-(--cellyra-border)">
              <GenomicTicker />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 h-px w-full bg-(--cellyra-border)" />
    </section>
  );
};
