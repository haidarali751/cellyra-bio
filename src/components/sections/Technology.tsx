"use client";

import { useState, useRef, useEffect, MouseEvent } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { wordWallItems } from "@/data";
import { TechnologyItem } from "@/types";

export const Technology = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeItem, setActiveItem] = useState<TechnologyItem | null>(null);
  const [isPointerInside, setIsPointerInside] = useState(false);
  const [tappedItem, setTappedItem] = useState<TechnologyItem | null>(null);
  const [isTouchOrSmallScreen, setIsTouchOrSmallScreen] = useState(false);

  // Smooth mouse follower coordinates
  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const previewRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);

  // Detect touch or tablet / mobile viewport
  useEffect(() => {
    const checkScreen = () => {
      const isTouch = window.matchMedia(
        "(hover: none) and (pointer: coarse)"
      ).matches;
      const isSmall = window.innerWidth < 1024;
      setIsTouchOrSmallScreen(isTouch || isSmall);
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // Close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setTappedItem(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isTouchOrSmallScreen || !isPointerInside) {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      return;
    }

    let running = true;

    const updatePosition = () => {
      if (!running) return;

      const ease = 0.18;
      const dx = targetPos.current.x - currentPos.current.x;
      const dy = targetPos.current.y - currentPos.current.y;

      currentPos.current.x += dx * ease;
      currentPos.current.y += dy * ease;

      if (previewRef.current) {
        const cardWidth = 290;
        const cardHeight = 260;

        let posX = currentPos.current.x + 24;
        let posY = currentPos.current.y - 120;

        if (typeof window !== "undefined") {
          if (posX + cardWidth > window.innerWidth - 20) {
            posX = currentPos.current.x - cardWidth - 24;
          }
          if (posY + cardHeight > window.innerHeight - 20) {
            posY = window.innerHeight - cardHeight - 20;
          }
          if (posY < 80) {
            posY = 80;
          }
        }

        previewRef.current.style.transform = `translate3d(${posX}px, ${posY}px, 0)`;
      }

      rafId.current = requestAnimationFrame(updatePosition);
    };

    rafId.current = requestAnimationFrame(updatePosition);

    return () => {
      running = false;
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isPointerInside, isTouchOrSmallScreen]);

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (isTouchOrSmallScreen) return;
    targetPos.current = { x: e.clientX, y: e.clientY };

    if (spotlightRef.current && sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      spotlightRef.current.style.background = `radial-gradient(750px circle at ${x}% ${y}%, var(--cellyra-silver-border) 0%, transparent 65%)`;
    }
  };

  const handleWordMouseEnter = (item: TechnologyItem, e: MouseEvent) => {
    if (isTouchOrSmallScreen) return;
    targetPos.current = { x: e.clientX, y: e.clientY };
    currentPos.current = { x: e.clientX, y: e.clientY };
    setHoveredId(item.id || item.word);
    setActiveItem(item);
    setIsPointerInside(true);
  };

  const handleWordMouseLeave = () => {
    if (isTouchOrSmallScreen) return;
    setHoveredId(null);
    setIsPointerInside(false);
  };

  const handleWordClick = (item: TechnologyItem) => {
    setTappedItem(item);
  };

  return (
    <section
      ref={sectionRef}
      id="technology"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        setHoveredId(null);
        setIsPointerInside(false);
      }}
      className="relative min-h-screen px-6 py-28 md:py-36 lg:px-12 bg-(--cellyra-bg) text-(--cellyra-text) transition-colors duration-500 overflow-hidden select-none"
    >
      {/* Background Interactive Spotlight */}
      <div
        ref={spotlightRef}
        className="pointer-events-none absolute inset-0 transition-opacity duration-500 opacity-40 dark:opacity-75"
        style={{
          background: `radial-gradient(750px circle at 50% 50%, var(--cellyra-silver-border) 0%, transparent 65%)`,
        }}
      />

      {/* Ambient background glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute right-[-10%] top-[20%] h-137.5 w-137.5 rounded-full blur-[180px] opacity-25 dark:opacity-40"
          style={{
            background:
              "radial-gradient(circle, var(--cellyra-border) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute left-[-10%] bottom-[15%] h-125 w-125 rounded-full blur-[180px] opacity-20 dark:opacity-30"
          style={{
            background:
              "radial-gradient(circle, var(--cellyra-silver-border) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Architectural Fine Grid Lines */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04] dark:opacity-[0.07]"
        aria-hidden="true"
      >
        <div className="absolute left-0 top-[14%] h-px w-full bg-current" />
        <div className="absolute left-0 top-[48%] h-px w-full bg-current" />
        <div className="absolute left-0 top-[84%] h-px w-full bg-current" />

        <div className="absolute left-[6%] top-0 h-full w-px bg-current" />
        <div className="absolute left-[50%] top-0 h-full w-px bg-current" />
        <div className="absolute right-[6%] top-0 h-full w-px bg-current" />
      </div>

      {/* Section telemetry tags */}
      <div className="pointer-events-none absolute top-10 right-8 lg:right-12 hidden lg:flex items-center gap-4 text-[9px] font-mono uppercase tracking-[0.25em] text-(--cellyra-muted) opacity-60">
        <span>COORD // 42.3601° N</span>
        <span>•</span>
        <span>SYS.TECH // 03.TOOLKIT</span>
        <span>•</span>
        <span className="text-emerald-500 font-semibold">● ACTIVE</span>
      </div>

      <div className="pointer-events-none absolute bottom-10 left-8 lg:left-12 hidden lg:flex items-center gap-4 text-[9px] font-mono uppercase tracking-[0.25em] text-(--cellyra-muted) opacity-60">
        <span>26 PROGRAMMABLE MODALITIES</span>
        <span>•</span>
        <span>ATOMIC TO ORGAN-SCALE PRECISION</span>
      </div>

      {/* Grain noise overlay */}
      <div className="cellyra-noise absolute inset-0 pointer-events-none" />

      {/* Main Container */}
      <div className="mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 border-b border-(--cellyra-border)">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex items-center gap-3"
            >
              <span className="h-px w-8 bg-(--cellyra-text) opacity-40" />
              <span className="font-mono text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.28em] text-(--cellyra-muted)">
                03 // Methodologies &amp; Toolkit
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mt-6 font-heading text-[clamp(2.5rem,6vw,5.2rem)] font-extrabold leading-[0.92] tracking-[-0.04em] text-(--cellyra-text)"
            >
              Discover. Design.{" "}
              <span className="font-serif italic font-normal text-(--cellyra-muted)">
                Engineer.
              </span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="flex items-center gap-3 text-xs font-mono text-(--cellyra-muted)"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="uppercase tracking-[0.18em]">
              {isTouchOrSmallScreen
                ? "Tap terms to inspect molecular architecture"
                : "Hover or tap terms to inspect molecular architecture"}
            </span>
          </motion.div>
        </div>

        {/* ── Editorial Dense Typography Word Wall ── */}
        <div className="mt-14 lg:mt-20">
          <div className="relative flex flex-wrap items-baseline content-start gap-x-6 sm:gap-x-8 md:gap-x-10 gap-y-4 sm:gap-y-6 md:gap-y-8 leading-none tracking-tight">
            {wordWallItems.map((item, index) => {
              const itemId = item.id || item.word;
              const isHovered = hoveredId === itemId;
              const isTapped = tappedItem?.word === item.word;
              const isHighlighted = isHovered || isTapped;
              const hasAnyActive = hoveredId !== null || tappedItem !== null;
              const isDimmed = hasAnyActive && !isHighlighted;

              // Style variants matching editorial design reference
              const styleType =
                item.styleType || (item.italic ? "serif-italic" : "bold-sans");

              // Outline style calculations
              const isOutline = styleType === "outline-sans";

              return (
                <motion.div
                  key={itemId}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.05 }}
                  transition={{
                    duration: 0.45,
                    delay: Math.min(index * 0.012, 0.35),
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  onMouseEnter={(e) => handleWordMouseEnter(item, e)}
                  onMouseLeave={handleWordMouseLeave}
                  onClick={() => handleWordClick(item)}
                  className="inline-block relative cursor-pointer"
                >
                  <span
                    style={{
                      color: isHighlighted
                        ? item.highlightColor || "var(--cellyra-text)"
                        : isOutline
                          ? "transparent"
                          : undefined,
                      WebkitTextStroke: isOutline
                        ? isHighlighted
                          ? `0px transparent`
                          : `1.5px var(--cellyra-text)`
                        : undefined,
                      textShadow: isHighlighted
                        ? `0 0 35px ${item.highlightColor ? `${item.highlightColor}66` : "rgba(255,255,255,0.4)"}`
                        : "none",
                    }}
                    className={`inline-block transition-all duration-300 transform-gpu ${
                      isDimmed
                        ? "opacity-25 blur-[0.4px] scale-[0.98]"
                        : isHighlighted
                          ? "opacity-100 scale-[1.05] z-20"
                          : isOutline
                            ? "opacity-90 hover:opacity-100"
                            : "opacity-90 hover:opacity-100"
                    } ${
                      styleType === "bold-sans"
                        ? "font-heading font-black uppercase text-[clamp(1.9rem,4.4vw,4.2rem)] tracking-[-0.04em] text-(--cellyra-text)"
                        : styleType === "serif-italic"
                          ? "font-serif italic font-normal text-[clamp(2.1rem,4.6vw,4.5rem)] tracking-tight text-(--cellyra-muted) hover:text-(--cellyra-text)"
                          : styleType === "serif-title"
                            ? "font-serif font-medium text-[clamp(1.9rem,4.3vw,4rem)] tracking-tight text-(--cellyra-text)"
                            : styleType === "outline-sans"
                              ? "font-heading font-black uppercase text-[clamp(1.8rem,4.2vw,3.9rem)] tracking-[-0.03em]"
                              : "font-mono font-medium text-[clamp(1.5rem,3.4vw,3.2rem)] tracking-normal text-(--cellyra-text)"
                    }`}
                  >
                    {item.word}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Desktop Cursor Follower Preview Card (Non-touch & screen >= 1024px only) ── */}
      {!isTouchOrSmallScreen && (
        <div
          ref={previewRef}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            pointerEvents: "none",
            zIndex: 9999,
            willChange: "transform",
          }}
        >
          <AnimatePresence>
            {isPointerInside && activeItem && !tappedItem && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.88, y: 5 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="w-72.5 overflow-hidden rounded-2xl bg-(--cellyra-surface)/95 backdrop-blur-2xl border border-(--cellyra-border) shadow-[0_25px_60px_rgba(0,0,0,0.5),0_0_0_1px_var(--cellyra-border)]"
              >
                {/* Card Image */}
                <div className="relative w-full h-40 overflow-hidden bg-black/40">
                  <Image
                    src={activeItem.image}
                    alt={activeItem.word}
                    fill
                    className="object-cover transition-transform duration-700 ease-out hover:scale-105"
                    sizes="290px"
                    quality={75}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-(--cellyra-surface) via-transparent to-transparent opacity-90" />

                  {/* Category Pill */}
                  <div className="absolute top-3 left-3">
                    <span
                      style={{
                        borderColor: activeItem.highlightColor
                          ? `${activeItem.highlightColor}60`
                          : "var(--cellyra-border)",
                        color:
                          activeItem.highlightColor || "var(--cellyra-text)",
                      }}
                      className="px-2.5 py-1 text-[9px] font-mono uppercase tracking-[0.16em] rounded-full bg-black/60 backdrop-blur-md border font-semibold shadow-xs"
                    >
                      {activeItem.category}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 pt-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <h4
                      style={{
                        color:
                          activeItem.highlightColor || "var(--cellyra-text)",
                      }}
                      className="text-sm font-bold tracking-tight truncate"
                    >
                      {activeItem.word}
                    </h4>
                    {activeItem.stats && (
                      <span className="text-[8px] font-mono uppercase tracking-wider text-(--cellyra-muted) opacity-80 shrink-0">
                        {activeItem.stats}
                      </span>
                    )}
                  </div>

                  {activeItem.description && (
                    <p className="mt-1.5 text-[11px] leading-relaxed text-(--cellyra-muted) line-clamp-2">
                      {activeItem.description}
                    </p>
                  )}

                  <div className="mt-3 pt-2.5 border-t border-(--cellyra-border) flex items-center justify-between text-[8.5px] font-mono text-(--cellyra-muted) opacity-70">
                    <span>SYS.03 // MODEL VIEW</span>
                    <span className="text-emerald-400">READY</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* ── Centered Modal for Mobile, Tablet, and Tapped View ── */}
      <AnimatePresence>
        {tappedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setTappedItem(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Centered Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 26, stiffness: 320 }}
              className="relative w-full max-w-sm sm:max-w-md overflow-hidden rounded-2xl bg-(--cellyra-surface) border border-(--cellyra-border) shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_0_1px_var(--cellyra-border)] z-10"
            >
              {/* Close Button */}
              <button
                onClick={() => setTappedItem(null)}
                className="absolute top-3 right-3 z-30 flex h-8 w-8 items-center justify-center rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white/80 hover:text-white hover:bg-black/90 transition-colors"
                aria-label="Close dialog"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Modal Image */}
              <div className="relative w-full h-52 sm:h-60 overflow-hidden bg-black/40">
                <Image
                  src={tappedItem.image}
                  alt={tappedItem.word}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 450px"
                  quality={75}
                />
                <div className="absolute inset-0 bg-linear-to-t from-(--cellyra-surface) via-transparent to-transparent opacity-90" />

                {/* Category Pill */}
                <div className="absolute top-3 left-3">
                  <span
                    style={{
                      borderColor: tappedItem.highlightColor
                        ? `${tappedItem.highlightColor}60`
                        : "var(--cellyra-border)",
                      color:
                        tappedItem.highlightColor || "var(--cellyra-text)",
                    }}
                    className="px-3 py-1 text-[10px] font-mono uppercase tracking-[0.16em] rounded-full bg-black/70 backdrop-blur-md border font-semibold shadow-xs"
                  >
                    {tappedItem.category}
                  </span>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-5 sm:p-6 pt-3">
                <div className="flex items-start justify-between gap-3">
                  <h3
                    style={{
                      color:
                        tappedItem.highlightColor || "var(--cellyra-text)",
                    }}
                    className="text-lg sm:text-xl font-bold tracking-tight"
                  >
                    {tappedItem.word}
                  </h3>
                  {tappedItem.stats && (
                    <span className="text-[10px] font-mono uppercase tracking-wider text-(--cellyra-muted) opacity-90 shrink-0 px-2 py-0.5 rounded bg-(--cellyra-border)/40 mt-0.5">
                      {tappedItem.stats}
                    </span>
                  )}
                </div>

                {tappedItem.description && (
                  <p className="mt-3 text-xs sm:text-sm leading-relaxed text-(--cellyra-muted)">
                    {tappedItem.description}
                  </p>
                )}

                <div className="mt-5 pt-3 border-t border-(--cellyra-border) flex items-center justify-between text-[9px] font-mono text-(--cellyra-muted) opacity-75">
                  <span>SYS.03 // MODEL VIEW</span>
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>ACTIVE</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Bottom Border Line */}
      <div className="absolute bottom-0 left-0 h-px w-full bg-(--cellyra-border)" />
    </section>
  );
};
