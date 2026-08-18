"use client";

import React, { useState, useRef, useEffect, MouseEvent } from "react";
import { motion, useInView } from "framer-motion";
import { stats } from "@/data";

const AnimatedCounter = ({
  targetValue,
  duration = 1800,
}: {
  targetValue: string;
  duration?: number;
}) => {
  // Parse numeric part and suffix (e.g., "98%", "42+", "12M+", "24")
  const match = targetValue.match(/^(\d+(?:\.\d+)?)(.*)$/);
  const numericVal = match ? parseFloat(match[1]) : 0;
  const suffix = match ? match[2] : "";

  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let rafId: number;

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Cubic ease-out
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(ease * numericVal));

      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [inView, numericVal, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
};

const AccuracyGaugeVisualizer = ({ inView }: { inView: boolean }) => {
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const targetOffset = circumference * (1 - 0.98);

  return (
    <div className="relative w-20 h-20 flex items-center justify-center">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
        {/* Background track */}
        <circle
          cx="40"
          cy="40"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          className="text-(--cellyra-border) opacity-40"
        />
        {/* Animated fill track */}
        <circle
          cx="40"
          cy="40"
          r={radius}
          fill="none"
          stroke="#00ffa3"
          strokeWidth="3.5"
          strokeDasharray={circumference}
          strokeDashoffset={inView ? targetOffset : circumference}
          strokeLinecap="round"
          className="transition-all duration-1500 ease-out"
          style={{
            filter: "drop-shadow(0 0 6px rgba(0, 255, 163, 0.5))",
          }}
        />
        {/* Dashed outer tick ring */}
        <circle
          cx="40"
          cy="40"
          r="37"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="2 6"
          className="text-(--cellyra-muted) opacity-30 animate-[spin_20s_linear_infinite]"
        />
      </svg>
      {/* Center live pulse dot */}
      <div className="absolute inset-0 flex items-center justify-center flex-col">
        <span className="w-2 h-2 rounded-full bg-[#00ffa3] shadow-[0_0_8px_#00ffa3] animate-ping" />
      </div>
    </div>
  );
};

const PipelineEqualizerVisualizer = ({ inView }: { inView: boolean }) => {
  const bars = [40, 75, 55, 90, 65, 85, 45];

  return (
    <div className="flex items-end gap-1.5 h-16 w-24 px-1 py-1">
      {bars.map((height, i) => (
        <motion.div
          key={i}
          initial={{ height: "10%" }}
          animate={
            inView
              ? {
                  height: [
                    `${height * 0.4}%`,
                    `${height}%`,
                    `${height * 0.7}%`,
                  ],
                }
              : { height: "10%" }
          }
          transition={{
            duration: 1.8 + i * 0.2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: i * 0.12,
          }}
          className="flex-1 rounded-t-sm bg-linear-to-t from-[#00d4ff]/20 to-[#00d4ff]"
          style={{
            boxShadow: "0 0 8px rgba(0, 212, 255, 0.3)",
          }}
        />
      ))}
    </div>
  );
};

/* ─────────────────────────────────────────────────────────
   MINI VISUALIZER: DATA STREAM WAVEFORM (for Card 3: 12M+)
───────────────────────────────────────────────────────── */
const WaveformVisualizer = ({ inView }: { inView: boolean }) => {
  return (
    <div className="relative w-24 h-16 overflow-hidden flex items-center">
      <svg
        className="w-full h-full"
        viewBox="0 0 100 50"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Filled wave area */}
        <motion.path
          d="M 0 35 Q 25 10 50 30 T 100 15 L 100 50 L 0 50 Z"
          fill="url(#waveGradient)"
          animate={
            inView
              ? {
                  d: [
                    "M 0 35 Q 25 10 50 30 T 100 15 L 100 50 L 0 50 Z",
                    "M 0 20 Q 25 35 50 15 T 100 30 L 100 50 L 0 50 Z",
                    "M 0 35 Q 25 10 50 30 T 100 15 L 100 50 L 0 50 Z",
                  ],
                }
              : {}
          }
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Top glowing wave stroke */}
        <motion.path
          d="M 0 35 Q 25 10 50 30 T 100 15"
          fill="none"
          stroke="#a855f7"
          strokeWidth="2.5"
          strokeLinecap="round"
          animate={
            inView
              ? {
                  d: [
                    "M 0 35 Q 25 10 50 30 T 100 15",
                    "M 0 20 Q 25 35 50 15 T 100 30",
                    "M 0 35 Q 25 10 50 30 T 100 15",
                  ],
                }
              : {}
          }
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            filter: "drop-shadow(0 0 6px rgba(168, 85, 247, 0.6))",
          }}
        />
      </svg>

      {/* Floating data pulse point */}
      <motion.div
        className="absolute w-2 h-2 rounded-full bg-[#a855f7] shadow-[0_0_8px_#a855f7]"
        animate={{
          x: [0, 80, 0],
          y: [20, 10, 20],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

/* ─────────────────────────────────────────────────────────
   MINI VISUALIZER: ORBITAL RADAR MESH (for Card 4: 24)
───────────────────────────────────────────────────────── */
const RadarMeshVisualizer = ({ inView }: { inView: boolean }) => {
  return (
    <div className="relative w-20 h-20 flex items-center justify-center">
      {/* Outer concentric rings */}
      <div className="absolute inset-0 rounded-full border border-[#ffb830]/20" />
      <div className="absolute inset-2.5 rounded-full border border-[#ffb830]/30" />
      <div className="absolute inset-5 rounded-full border border-[#ffb830]/40" />

      {/* Rotating radar sweep ray */}
      <motion.div
        className="absolute inset-0 rounded-full origin-center"
        animate={inView ? { rotate: 360 } : {}}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0deg, rgba(255, 184, 48, 0.4) 60deg, transparent 70deg)",
        }}
      />

      {/* Center node */}
      <div className="w-2.5 h-2.5 rounded-full bg-[#ffb830] shadow-[0_0_10px_#ffb830] z-10" />

      {/* Orbiting partner satellites */}
      <motion.div
        className="absolute w-1.5 h-1.5 rounded-full bg-[#ffb830]"
        animate={{
          x: [18, -14, -10, 18],
          y: [-12, -16, 18, -12],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{ boxShadow: "0 0 6px #ffb830" }}
      />
      <motion.div
        className="absolute w-1.5 h-1.5 rounded-full bg-white"
        animate={{
          x: [-20, 15, 12, -20],
          y: [10, 16, -14, 10],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        style={{ boxShadow: "0 0 6px rgba(255, 255, 255, 0.8)" }}
      />
    </div>
  );
};

/* ─────────────────────────────────────────────────────────
   METRIC CARD COMPONENT WITH SPOTLIGHT & HOVER PHYSICS
───────────────────────────────────────────────────────── */
const MetricCard = ({
  stat,
  index,
}: {
  stat: (typeof stats)[0];
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const inView = useInView(cardRef, { once: true, margin: "-60px" });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const getVisualizer = (idx: number) => {
    switch (idx) {
      case 0:
        return <AccuracyGaugeVisualizer inView={inView} />;
      case 1:
        return <PipelineEqualizerVisualizer inView={inView} />;
      case 2:
        return <WaveformVisualizer inView={inView} />;
      case 3:
        return <RadarMeshVisualizer inView={inView} />;
      default:
        return null;
    }
  };

  const accentColor = stat.color || "#00ffa3";

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.215, 0.61, 0.355, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col justify-between rounded-2xl p-7 transition-all duration-500 overflow-hidden bg-(--cellyra-surface) border border-(--cellyra-border) hover:border-(--cellyra-silver-border) shadow-sm hover:shadow-2xl hover:-translate-y-1 transform-gpu"
    >
      {/* Radial spotlight effect following cursor */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 rounded-2xl"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, ${accentColor}18, transparent 70%)`,
        }}
      />

      {/* Subtle top glow line on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-px transition-opacity duration-500 opacity-0 group-hover:opacity-100"
        style={{
          background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
        }}
      />

      {/* Corner HUD accent marks */}
      <div className="pointer-events-none absolute top-3 right-3 font-mono text-[9px] text-(--cellyra-muted) opacity-40 group-hover:opacity-80 transition-opacity">
        [0{index + 1}/04]
      </div>

      <div className="relative z-10">
        {/* Top bar: Delta badge + Status pulse */}
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 font-mono text-[9px] font-semibold uppercase tracking-[0.16em] px-2.5 py-1 rounded-full border border-(--cellyra-border) bg-(--cellyra-bg) text-(--cellyra-text) transition-colors group-hover:border-(--cellyra-silver-border)">
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ backgroundColor: accentColor }}
            />
            {stat.delta}
          </span>
        </div>

        {/* Dynamic Graphic Visualizer + Large Metric readout */}
        <div className="mt-6 flex items-center justify-between gap-4">
          <div className="font-mono text-4xl sm:text-5xl font-bold tracking-tight text-(--cellyra-text) group-hover:scale-105 transition-transform duration-300 origin-left">
            <AnimatedCounter targetValue={stat.value} />
          </div>
          <div className="shrink-0">{getVisualizer(index)}</div>
        </div>

        {/* Label */}
        <div className="mt-3 font-heading text-lg font-bold text-(--cellyra-text) tracking-tight">
          {stat.label}
        </div>
      </div>

      {/* Subtext description */}
      <div className="relative z-10 mt-6 font-sans text-xs leading-relaxed text-(--cellyra-muted) border-t border-(--cellyra-border) pt-4 flex items-center justify-between">
        <span>{stat.subtext}</span>
      </div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────────────────
   MAIN IMPACT SECTION COMPONENT
───────────────────────────────────────────────────────── */
export const Impact = () => {
  return (
    <section
      id="impact"
      className="relative px-6 lg:py-36 py-10 lg:px-8 overflow-hidden bg-(--cellyra-bg) text-(--cellyra-text) transition-colors duration-500"
    >
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-175 w-250 rounded-full blur-[200px] opacity-40 dark:opacity-100"
        style={{
          background:
            "radial-gradient(ellipse, var(--cellyra-border) 0%, transparent 80%)",
        }}
      />
      <div className="cellyra-noise absolute inset-0 pointer-events-none" />

      {/* Subtle sci-fi background grid lines */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        aria-hidden="true"
      >
        <div className="absolute left-0 top-[20%] h-px w-full bg-current" />
        <div className="absolute left-0 top-[80%] h-px w-full bg-current" />
        <div className="absolute left-[15%] top-0 h-full w-px bg-current" />
        <div className="absolute right-[15%] top-0 h-full w-px bg-current" />
      </div>

      <div className="mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="flex items-center gap-3"
            >
              <span className="h-px w-8 bg-(--cellyra-text) opacity-40" />
              <span className="font-mono text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.28em] text-(--cellyra-muted)">
                05 // Quantitative Impact &amp; Metrics
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="mt-6 font-heading text-4xl sm:text-6xl font-bold tracking-tight leading-[1.06] text-(--cellyra-text)"
            >
              Demonstrated performance at every stage of discovery.
            </motion.h2>
          </div>

          {/* Telemetry Status Strip */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="flex items-center gap-3 px-4 py-2 rounded-xl border border-(--cellyra-border) bg-(--cellyra-surface) backdrop-blur-sm self-start lg:self-end"
          >
            <span className="w-2 h-2 rounded-full bg-[#00ffa3] shadow-[0_0_8px_#00ffa3] animate-pulse" />
            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-(--cellyra-muted)">
              SYS.TELEMETRY // LIVE IN SILICO VALIDATION
            </span>
          </motion.div>
        </div>

        {/* 4 Metrics Interactive Grid */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <MetricCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>

        {/* Bottom In-Silico Benchmark Comparison Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mt-12 rounded-2xl p-6 sm:p-8 bg-(--cellyra-surface) border border-(--cellyra-border) relative overflow-hidden"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-white/10 text-(--cellyra-text)">
                  CASP-15 COMPLIANT
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-(--cellyra-muted)">
                  CONTINUOUS VERIFICATION CYCLE
                </span>
              </div>
              <h3 className="mt-2 font-heading text-lg sm:text-xl font-bold text-(--cellyra-text)">
                De Novo Structural Affinity &amp; Binding Confidence
              </h3>
            </div>

            {/* Benchmark progress bars */}
            <div className="w-full md:w-80 space-y-2.5">
              <div>
                <div className="flex justify-between font-mono text-[10px] text-(--cellyra-muted) mb-1">
                  <span>CELLYRA BIOLOGICAL ENGINE</span>
                  <span className="font-bold text-[#00ffa3]">98.2%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-(--cellyra-bg) overflow-hidden border border-(--cellyra-border)">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "98.2%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, ease: "easeOut", delay: 0.2 }}
                    className="h-full rounded-full bg-linear-to-r from-[#00ffa3]/70 to-[#00ffa3] shadow-[0_0_10px_#00ffa3]"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-mono text-[10px] text-(--cellyra-muted) mb-1">
                  <span>CONVENTIONAL IN SILICO BASELINE</span>
                  <span>84.0%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-(--cellyra-bg) overflow-hidden border border-(--cellyra-border)">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "84%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, ease: "easeOut", delay: 0.4 }}
                    className="h-full rounded-full bg-(--cellyra-muted)/50"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
