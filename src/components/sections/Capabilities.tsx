"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CapabilityVisual } from "@/components/visuals/CapabilityVisuals";
import { capabilities } from "@/data";

export const Capabilities = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);

  useEffect(() => {
    const updateScrollRange = () => {
      if (trackRef.current) {
        const trackWidth = trackRef.current.scrollWidth;
        const windowWidth = window.innerWidth;
        const extraOffset = windowWidth < 640 ? 48 : 140;
        const totalScroll = Math.max(0, trackWidth - windowWidth + extraOffset);
        setScrollRange(totalScroll);
      }
    };

    updateScrollRange();
    const timer = setTimeout(updateScrollRange, 150);
    window.addEventListener("resize", updateScrollRange);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateScrollRange);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 0.88, 1], [0, -scrollRange, -scrollRange]);

  return (
    <section
      ref={targetRef}
      id="capabilities"
      className="relative h-[480vh] bg-(--cellyra-bg) text-(--cellyra-text) transition-colors duration-500"
    >
      {/* Sticky Container */}
      <div className="sticky top-0 flex h-screen w-full flex-col justify-between overflow-hidden px-4 sm:px-6 py-6 sm:py-8 lg:py-10 lg:px-12">
        {/* Multi-spectrum ambient glows */}
        <div
          className="pointer-events-none absolute -left-48 top-1/4 h-96 w-96 rounded-full blur-[160px] opacity-35 dark:opacity-80"
          style={{ background: "var(--cellyra-silver-border)" }}
        />
        <div
          className="pointer-events-none absolute -right-48 bottom-1/4 h-96 w-96 rounded-full blur-[140px] opacity-25 dark:opacity-80"
          style={{ background: "var(--cellyra-border)" }}
        />

        {/* Subtle noise overlay */}
        <div className="cellyra-noise absolute inset-0 pointer-events-none" />

        {/* Top Header & Telemetry */}
        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-3 sm:gap-4">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex items-center gap-3"
              >
                <span className="h-px w-8 bg-(--cellyra-text) opacity-40" />
                <span className="font-mono text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.28em] text-(--cellyra-muted)">
                  04 // Core Capabilities &amp; Platform
                </span>
              </motion.div>

              <h2 className="mt-2 sm:mt-2.5 font-heading text-xl sm:text-3xl lg:text-5xl font-bold tracking-tight leading-[1.1] text-(--cellyra-text)">
                Precision biology engineered from the molecular level up.
              </h2>
            </div>

            {/* Scroll Navigation / Status Guide */}
            <div className="hidden sm:flex items-center gap-6 pb-1">
              <div className="flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-(--cellyra-muted) uppercase">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-(--cellyra-text) animate-pulse" />
                <span>Scroll to explore full architecture</span>
              </div>
              <div className="h-4 w-px bg-(--cellyra-border)" />
              <div className="flex items-center gap-1.5 font-mono text-[11px] text-(--cellyra-muted)">
                <span className="text-(--cellyra-text) font-semibold">08</span>
                <span>/</span>
                <span>DOMAINS</span>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Content Track */}
        <div className="relative z-10 my-auto w-full overflow-visible py-2 sm:py-3">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex items-stretch gap-4 sm:gap-6 lg:gap-10 pr-6 sm:pr-12 lg:pr-24 will-change-transform"
          >
            {capabilities.map((cap, index) => (
              <div
                key={cap.id}
                className="group relative flex w-71.25 sm:w-95 md:w-115 lg:w-135 shrink-0 flex-col justify-between rounded-3xl p-5 sm:p-7 lg:p-9 transition-all duration-500 overflow-hidden cursor-default bg-(--cellyra-surface) border border-(--cellyra-border) shadow-sm hover:shadow-2xl hover:border-(--cellyra-silver-border) backdrop-blur-sm"
              >
                {/* Accent glow on hover */}
                <div
                  className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full blur-[80px] opacity-0 transition-opacity duration-500 group-hover:opacity-40"
                  style={{ background: cap.accent }}
                />

                {/* Top row: Number Badge & Visual Schematic */}
                <div>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <span className="inline-flex items-center justify-center font-mono text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-(--cellyra-border) text-(--cellyra-text) border border-(--cellyra-border)">
                        {cap.id}
                      </span>
                      <span className="font-mono text-[9px] sm:text-xs font-semibold uppercase tracking-[0.18em] sm:tracking-[0.2em] text-(--cellyra-muted)">
                        {cap.subtitle}
                      </span>
                    </div>

                    {/* Schematic Visual Box */}
                    <div className="relative h-12 w-12 sm:h-16 sm:w-16 lg:h-20 lg:w-20 shrink-0 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                      <CapabilityVisual index={index} />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="mt-4 sm:mt-6 lg:mt-8 font-heading text-lg sm:text-2xl lg:text-3xl font-bold tracking-tight text-(--cellyra-text) transition-colors duration-300">
                    {cap.title}
                  </h3>

                  <p className="mt-2 sm:mt-3 lg:mt-4 font-sans text-xs sm:text-sm lg:text-base leading-relaxed text-(--cellyra-muted) line-clamp-4 sm:line-clamp-none">
                    {cap.description}
                  </p>
                </div>

                {/* Bottom row: Telemetry Badges & Action Arrow */}
                <div className="mt-4 sm:mt-6 lg:mt-8 pt-4 sm:pt-5 lg:pt-6 border-t border-(--cellyra-border) flex flex-wrap items-center justify-between gap-2 sm:gap-3">
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {cap.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full px-2 sm:px-3 py-0.5 sm:py-1 font-mono text-[8px] sm:text-[10px] font-medium uppercase tracking-[0.12em] border border-(--cellyra-border) bg-(--cellyra-bg) text-(--cellyra-text)"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5 sm:gap-2 font-mono text-[10px] sm:text-xs font-semibold uppercase tracking-[0.14em] text-(--cellyra-text)">
                    <span>Explore</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                      →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom Horizontal Progress Bar */}
        <div className="relative z-10 mx-auto w-full max-w-7xl pt-2">
          <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em] text-(--cellyra-muted) pb-1.5 sm:pb-2">
            <span>01 // COMPUTATIONAL BIOLOGY</span>
            <span>08 // AUTONOMOUS WET LABS</span>
          </div>
          <div className="relative h-1 w-full rounded-full bg-(--cellyra-border) overflow-hidden">
            <motion.div
              style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
              className="absolute inset-y-0 left-0 w-full bg-(--cellyra-text) opacity-80"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

