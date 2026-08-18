"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { researchPrograms } from "@/data";

export const Research = () => {
  const [activeIdx, setActiveIdx] = useState<string | null>(null);
  const [hoveredIdx, setHoveredIdx] = useState<string | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if it is a touch device to disable hover states that stick on mobile/tablet
    const isTouch = window.matchMedia("(hover: none)").matches;
    setIsTouchDevice(isTouch);
  }, []);

  // Active item is hovered item (if hovering) or tapped/selected item
  const currentIdx = hoveredIdx ?? activeIdx;

  return (
    <section
      id="research"
      className="relative py-24 sm:py-32 overflow-hidden bg-(--cellyra-bg) text-(--cellyra-text) transition-colors duration-500"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40 dark:opacity-100"
        aria-hidden="true"
      >
        <div
          className="absolute left-[20%] top-[20%] h-125 w-125 rounded-full blur-[160px]"
          style={{
            background:
              "radial-gradient(circle, var(--cellyra-border) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute right-[10%] top-[10%] h-100 w-100 rounded-full blur-[140px]"
          style={{
            background:
              "radial-gradient(circle, var(--cellyra-border) 0%, transparent 70%)",
          }}
        />
      </div>
      <div className="cellyra-noise absolute inset-0 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="flex items-center gap-3"
            >
              <span className="h-px w-8 bg-(--cellyra-text) opacity-40" />
              <span className="font-mono text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.28em] text-(--cellyra-muted)">
                02 // Research Pipeline &amp; Discovery
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mt-6 max-w-3xl font-heading text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-(--cellyra-text) leading-[1.05]"
            >
              From discovery to biological intelligence.
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-2 text-xs font-mono text-(--cellyra-muted)"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="uppercase tracking-widest text-[10px]">
              Tap or hover cards to explore
            </span>
          </motion.div>
        </div>
      </div>

      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 mt-12 md:mt-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
          className="flex flex-col md:flex-row w-full gap-3 md:gap-2 md:h-[65vh] lg:h-[70vh] min-h-130 max-h-195"
        >
          {researchPrograms.map((program) => {
            const isActive = currentIdx === program.idx;

            return (
              <div
                key={program.idx}
                role="button"
                tabIndex={0}
                aria-expanded={isActive}
                onClick={() => {
                  setActiveIdx((prev) =>
                    prev === program.idx ? null : program.idx,
                  );
                }}
                onMouseEnter={() => {
                  if (!isTouchDevice) {
                    setHoveredIdx(program.idx);
                  }
                }}
                onMouseLeave={() => {
                  if (!isTouchDevice) {
                    setHoveredIdx(null);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveIdx((prev) =>
                      prev === program.idx ? null : program.idx,
                    );
                  }
                }}
                style={{
                  flexGrow: isActive ? 4 : 1,
                  flexBasis: isActive ? "320px" : "80px",
                }}
                className={`group relative overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer flex items-end min-w-0 select-none transform-gpu rounded-xl border bg-(--cellyra-surface)/40 backdrop-blur-xs ${isActive
                  ? "border-(--cellyra-silver-border) shadow-[0_12px_40px_rgba(0,0,0,0.4)] h-80 md:h-full"
                  : "border-(--cellyra-border) hover:border-(--cellyra-silver-border)/60 h-24 md:h-full opacity-80 md:opacity-100"
                  }`}
              >
                {/* Background Image */}
                <div className="absolute inset-0 transition-transform duration-700 ease-out transform-gpu scale-105 group-hover:scale-100">
                  <Image
                    src={program.image}
                    alt={program.title}
                    fill
                    className={`object-cover transition-opacity duration-500 ${isActive
                      ? "opacity-95"
                      : "opacity-50 group-hover:opacity-75"
                      }`}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
                    quality={75}
                  />
                </div>

                {/* Dark Vignette Overlay */}
                <div
                  className={`absolute inset-0 transition-opacity duration-500 ${isActive
                    ? "opacity-85"
                    : "opacity-90 group-hover:opacity-75"
                    }`}
                  style={{
                    background:
                      "linear-gradient(to top, #04050a 0%, rgba(4,5,10,0.65) 50%, rgba(4,5,10,0.2) 100%)",
                  }}
                />

                {/* Content Overlay */}
                <div className="relative z-10 p-4 sm:p-6 md:p-6 lg:p-8 w-full text-white flex flex-col justify-end h-full">
                  {/* Top / Header Meta */}
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-mono text-[11px] font-bold px-2.5 py-0.5 rounded-full transition-all duration-300 ${isActive
                        ? "bg-white text-black font-extrabold shadow-md"
                        : "bg-black/60 backdrop-blur-md border border-white/20 text-white"
                        }`}
                    >
                      {program.idx}
                    </span>
                    <span
                      className={`font-mono text-[9px] font-semibold uppercase tracking-[0.2em] transition-opacity duration-300 ${isActive
                        ? "text-white/90"
                        : "text-white/60 md:hidden lg:inline"
                        }`}
                    >
                      {program.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className={`font-heading font-bold tracking-tight text-white transition-all duration-300 ${isActive
                      ? "text-xl sm:text-2xl lg:text-3xl whitespace-normal mt-2.5"
                      : "text-base sm:text-lg md:text-xs lg:text-base whitespace-nowrap overflow-hidden text-ellipsis md:absolute md:left-1/2 md:-translate-x-1/2 md:-rotate-90 md:origin-center md:bottom-28 lg:relative lg:left-auto lg:translate-x-0 lg:rotate-0 lg:bottom-auto lg:mt-auto lg:mb-4"
                      }`}
                  >
                    {program.title}
                  </h3>

                  {/* Description (visible when active) */}
                  <div
                    className={`transition-all duration-400 ease-out overflow-hidden ${isActive
                      ? "opacity-100 max-h-36 mt-2 translate-y-0"
                      : "opacity-0 max-h-0 mt-0 translate-y-2 pointer-events-none"
                      }`}
                  >
                    <p className="font-sans text-xs sm:text-sm leading-relaxed text-white/85 line-clamp-3 max-w-xl">
                      {program.description}
                    </p>
                    <div className="mt-3 flex items-center gap-2 text-[9px] font-mono uppercase tracking-widest text-emerald-400">
                      <span>Live Pipeline Model</span>
                      <span>•</span>
                      <span>Status: Active</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
