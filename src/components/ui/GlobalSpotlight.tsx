"use client";

import { useEffect, useRef, useState } from "react";

export const GlobalSpotlight = () => {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const targetPos = useRef({ x: -1000, y: -1000 });
  const currentPos = useRef({ x: -1000, y: -1000 });
  const [isVisible, setIsVisible] = useState(false);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Only enable on fine pointer devices (mouse / trackpad)
    const isTouchDevice =
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0);

    if (isTouchDevice) return;

    const handleMouseMove = (e: globalThis.MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    const animate = () => {
      const ease = 0.16;
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * ease;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * ease;

      if (spotlightRef.current) {
        const x = Math.round(currentPos.current.x);
        const y = Math.round(currentPos.current.y);

        spotlightRef.current.style.background = `radial-gradient(750px circle at ${x}px ${y}px, var(--cellyra-silver-border) 0%, transparent 65%)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isVisible]);

  return (
    <div
      ref={spotlightRef}
      className={`pointer-events-none fixed inset-0 z-20 transition-opacity duration-700 select-none ${
        isVisible ? "opacity-35 dark:opacity-75" : "opacity-0"
      }`}
      aria-hidden="true"
    />
  );
};
