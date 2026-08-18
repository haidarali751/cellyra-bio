"use client";

import React from "react";
import Link from "next/link";

export interface CellyraLogoProps {
  /** Size variant */
  size?: "sm" | "md" | "lg" | "xl";
  /** Whether to show the BIO badge */
  showBadge?: boolean;
  /** Custom badge text */
  badgeText?: string;
  /** Whether to link to homepage */
  href?: string;
  /** Additional wrapper class */
  className?: string;
  /** Click handler */
  onClick?: () => void;
  /** Whether to enable interactive hover sheen */
  interactive?: boolean;
}

/**
 * Cellyra Prismatic Biomark Emblem
 * A razor-sharp, mathematically calculated faceted geometric 'C' / Möbius prism
 * Inspired by ultra-luxury precision engineering (Linear, Neuralink, Teenage Engineering)
 */
export const CellyraMark = ({
  size = 32,
  className = "",
  animated = true,
}: {
  size?: number;
  className?: string;
  animated?: boolean;
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Ambient Diamond Sheen / Specular Glow on hover */}
      <div className="absolute inset-0 rounded-xl bg-white/20 dark:bg-white/15 opacity-0 blur-lg transition-all duration-700 group-hover:opacity-100 pointer-events-none scale-125" />

      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-full relative z-10 transition-transform duration-500 ease-out ${
          animated ? "group-hover:scale-105" : ""
        }`}
      >
        <defs>
          {/* Top Facet: High-Reflectance Liquid Platinum */}
          <linearGradient
            id="facet-top-grad"
            x1="12"
            y1="6"
            x2="38"
            y2="20"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="var(--cellyra-silver-bright)" stopOpacity="1" />
            <stop offset="60%" stopColor="var(--cellyra-silver-dim)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="var(--cellyra-subtle)" stopOpacity="0.75" />
          </linearGradient>

          {/* Left Spine Facet: Brushed Titanium & Obsidian Depth */}
          <linearGradient
            id="facet-spine-grad"
            x1="6"
            y1="14"
            x2="24"
            y2="38"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="var(--cellyra-silver-bright)" stopOpacity="0.95" />
            <stop offset="40%" stopColor="var(--cellyra-silver-dim)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="var(--cellyra-muted)" stopOpacity="0.4" />
          </linearGradient>

          {/* Bottom Facet: Deep Obsidian Reflection */}
          <linearGradient
            id="facet-bottom-grad"
            x1="10"
            y1="40"
            x2="38"
            y2="28"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="var(--cellyra-silver-dim)" stopOpacity="0.9" />
            <stop offset="50%" stopColor="var(--cellyra-silver-bright)" stopOpacity="1" />
            <stop offset="100%" stopColor="var(--cellyra-subtle)" stopOpacity="0.6" />
          </linearGradient>

          {/* Core Prismatic Node Gradient */}
          <linearGradient
            id="facet-core-grad"
            x1="20"
            y1="18"
            x2="30"
            y2="30"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="var(--cellyra-silver-bright)" />
            <stop offset="100%" stopColor="var(--cellyra-silver-dim)" />
          </linearGradient>

          {/* Hairline Edge Specular Highlight */}
          <linearGradient
            id="edge-specular"
            x1="0"
            y1="0"
            x2="48"
            y2="48"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.5" />
          </linearGradient>
        </defs>

        {/* ── Facet 1: Top Arm of the 'C' Prism ── */}
        <path
          d="M 24 6 L 40 15.24 L 32 19.86 L 20 12.93 L 24 6 Z"
          fill="url(#facet-top-grad)"
          className="transition-opacity duration-300 group-hover:brightness-110"
        />

        {/* ── Facet 2: Left Spine Outer Chamfer ── */}
        <path
          d="M 24 6 L 20 12.93 L 12 17.55 L 8 24 L 12 30.45 L 8 24 L 8 15.24 L 24 6 Z"
          fill="url(#facet-spine-grad)"
          opacity="0.85"
        />

        {/* ── Facet 3: Spine Inner Geometric Ribbon ── */}
        <path
          d="M 12 17.55 L 20 22.17 L 20 25.83 L 12 30.45 L 8 24 L 12 17.55 Z"
          fill="url(#facet-spine-grad)"
        />

        {/* ── Facet 4: Bottom Arm of the 'C' Prism ── */}
        <path
          d="M 12 30.45 L 20 35.07 L 32 28.14 L 40 32.76 L 24 42 L 8 32.76 L 12 30.45 Z"
          fill="url(#facet-bottom-grad)"
          className="transition-opacity duration-300 group-hover:brightness-110"
        />

        {/* ── Facet 5: Top Outer Blade (Bevel Edge) ── */}
        <path
          d="M 24 6 L 40 15.24 L 38 16.4 L 24 8.32 L 10 16.4 L 8 15.24 L 24 6 Z"
          fill="url(#edge-specular)"
          opacity="0.9"
        />

        {/* ── Facet 6: Inner Floating Geometric Nucleus (Crystalline Diamond Node) ── */}
        <path
          d="M 28 20 L 34 24 L 28 28 L 22 24 Z"
          fill="url(#facet-core-grad)"
          className="transition-transform duration-500 origin-center group-hover:scale-110 group-hover:brightness-125"
        />

        {/* Inner Core Precision Specular Dot */}
        <circle
          cx="28"
          cy="24"
          r="1.25"
          fill="var(--cellyra-silver-bright)"
          className="group-hover:animate-ping opacity-75"
        />

        {/* Hairline Precision Chamfer Lines */}
        <line
          x1="20"
          y1="12.93"
          x2="20"
          y2="35.07"
          stroke="url(#edge-specular)"
          strokeWidth="0.75"
          opacity="0.4"
        />
        <line
          x1="20"
          y1="22.17"
          x2="28"
          y2="20"
          stroke="url(#edge-specular)"
          strokeWidth="0.5"
          opacity="0.5"
        />
        <line
          x1="20"
          y1="25.83"
          x2="28"
          y2="28"
          stroke="url(#edge-specular)"
          strokeWidth="0.5"
          opacity="0.5"
        />
      </svg>
    </div>
  );
};

export const CellyraLogo = ({
  size = "md",
  showBadge = true,
  badgeText = "BIO",
  href,
  className = "",
  onClick,
  interactive = true,
}: CellyraLogoProps) => {
  // Precision sizing metrics
  const markSizes = {
    sm: 24,
    md: 30,
    lg: 38,
    xl: 48,
  };

  const textSizes = {
    sm: "text-[14px]",
    md: "text-[16px]",
    lg: "text-[22px]",
    xl: "text-[28px]",
  };

  const badgeSizes = {
    sm: "text-[8px] px-1.5 py-0.5",
    md: "text-[9px] px-2 py-0.5",
    lg: "text-[10px] px-2.5 py-1",
    xl: "text-[11px] px-3 py-1.5",
  };

  const content = (
    <div
      className={`group inline-flex items-center gap-3 select-none ${
        interactive ? "cursor-pointer" : ""
      } ${className}`}
      onClick={onClick}
    >
      {/* Precision Prismatic Biomark */}
      <CellyraMark
        size={markSizes[size]}
        animated={interactive}
        className="transition-all duration-300"
      />

      {/* Bespoke Wordmark & Meta Badge */}
      <div className="flex items-center gap-2.5">
        {/* Wordmark with razor-sharp typography & subtle metallic gradient */}
        <span
          className={`font-heading font-black tracking-[0.24em] uppercase transition-all duration-300 ${textSizes[size]}`}
          style={{
            background:
              "linear-gradient(180deg, var(--cellyra-silver-bright) 0%, var(--cellyra-silver-dim) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.25))",
          }}
        >
          CELLYRA
        </span>

        {/* Minimalist Engineered Badge */}
        {showBadge && (
          <div
            className={`font-mono font-semibold uppercase rounded-md border border-(--cellyra-border) bg-(--cellyra-surface)/80 backdrop-blur-md text-(--cellyra-muted) transition-all duration-300 group-hover:border-[var(--cellyra-silver-border)] group-hover:text-[var(--cellyra-text)] group-hover:shadow-[0_0_12px_rgba(255,255,255,0.08)] flex items-center gap-1.5 ${badgeSizes[size]}`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/90 shadow-[0_0_6px_#34d399]" />
            <span className="tracking-[0.2em] font-medium leading-none">{badgeText}</span>
          </div>
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex items-center group">
        {content}
      </Link>
    );
  }

  return content;
};
