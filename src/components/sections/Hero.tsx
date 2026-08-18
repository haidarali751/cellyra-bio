"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import HeroParticleCanvas from "@/components/visuals/HeroParticleCanvas";
import { heroMetadata } from "@/data";

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const hero = heroRef.current;

    if (!hero) return;

    const ctx = gsap.context(() => {
      const intro = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      intro
        .from(".hero-eyebrow", {
          y: 20,
          opacity: 0,
          duration: 0.8,
        })
        .from(
          ".hero-title-line",
          {
            y: 90,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
          },
          "-=0.45",
        )
        .from(
          ".hero-description",
          {
            y: 25,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.55",
        )
        .from(
          ".hero-actions",
          {
            y: 20,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.5",
        )
        .from(
          ".hero-meta",
          {
            y: 15,
            opacity: 0,
            duration: 0.6,
          },
          "-=0.4",
        )
        .from(
          ".hero-scroll",
          {
            opacity: 0,
            duration: 0.8,
          },
          "-=0.5",
        );
      gsap
        .timeline({
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        })
        .to(
          ".hero-content",
          {
            y: -130,
            opacity: 0,
            ease: "none",
          },
          0,
        )
        .to(
          ".hero-glow",
          {
            scale: 1.5,
            opacity: 0,
            ease: "none",
          },
          0,
        )
        .to(
          ".hero-scroll",
          {
            opacity: 0,
            ease: "none",
          },
          0,
        );
    }, hero);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen overflow-hidden bg-(--cellyra-bg) transition-colors duration-500"
    >
      <div className="absolute inset-0">
        <div
          className="hero-glow absolute left-[42%] top-[30%] h-175 w-175 rounded-full blur-[160px] opacity-40 dark:opacity-100"
          style={{
            background:
              "radial-gradient(circle, var(--cellyra-silver-border) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute right-[-10%] top-[10%] h-125 w-125 rounded-full blur-[140px] opacity-30 dark:opacity-100"
          style={{
            background:
              "radial-gradient(circle, var(--cellyra-border) 0%, transparent 80%)",
          }}
        />
      </div>
      <div className="cellyra-noise absolute inset-0" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]">
        <div className="absolute left-[8%] top-0 h-full w-px bg-current" />
        <div className="absolute left-[50%] top-0 h-full w-px bg-current" />
        <div className="absolute right-[8%] top-0 h-full w-px bg-current" />
        <div className="absolute left-0 top-[50%] h-px w-full bg-current" />
      </div>
      <HeroParticleCanvas />
      <div className="pointer-events-none absolute inset-0 z-2 bg-linear-to-r from-(--cellyra-bg)/85 via-(--cellyra-bg)/40 to-transparent transition-colors duration-500" />
      <div className="pointer-events-none absolute inset-0 z-2 bg-linear-to-t from-(--cellyra-bg) via-transparent to-(--cellyra-bg)/30 transition-colors duration-500" />
      <div className="pointer-events-none absolute inset-0 z-2 bg-linear-to-r from-(--cellyra-bg)/85 via-(--cellyra-bg)/40 to-transparent transition-colors duration-500" />
      <div className="pointer-events-none absolute inset-0 z-2 bg-linear-to-t from-(--cellyra-bg) via-transparent to-(--cellyra-bg)/30 transition-colors duration-500" />

      <div
        className="hero-content relative z-10 mx-auto flex min-h-screen max-w-360 items-center px-6 pb-20 pt-32 sm:px-8 lg:px-10"
        style={{ pointerEvents: "none" }}
      >
        <div className="w-full max-w-245">
          {/* Eyebrow */}
          <div className="hero-eyebrow mb-8 flex items-center gap-3">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-(--cellyra-muted)">
              00 // Biological Intelligence Platform
            </span>
          </div>
          <h1 className="overflow-hidden font-heading text-[clamp(3.6rem,8.8vw,8.5rem)] font-bold leading-[0.88] tracking-[-0.045em]">
            <span className="hero-title-line block text-(--cellyra-text)">
              Engineering
            </span>

            <span className="hero-title-line block text-(--cellyra-text)">
              biology
            </span>

            <span className="hero-title-line block text-(--cellyra-muted) font-medium">
              for what comes
            </span>

            <span
              className="hero-title-line block font-semibold"
              style={{
                background:
                  "linear-gradient(135deg, var(--cellyra-text) 10%, var(--cellyra-muted) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              next.
            </span>
          </h1>
          <div className="hero-description mt-8 max-w-145">
            <p className="font-sans text-base leading-relaxed text-(--cellyra-muted) sm:text-lg sm:leading-relaxed">
              We combine biological science, computational intelligence, and
              precision engineering to build the next generation of life science
              solutions.
            </p>
          </div>
          <div
            className="hero-actions mt-10 flex flex-col gap-3.5 sm:flex-row sm:items-center sm:gap-4"
            style={{ pointerEvents: "auto" }}
          >
            <Link
              href="#innovation"
              className="cellyra-button cellyra-button-primary group w-fit font-mono text-[11px] uppercase tracking-[0.16em]"
            >
              <span>Explore Our Science</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>

            <Link
              href="#research"
              className="cellyra-button cellyra-button-secondary group w-fit font-mono text-[11px] uppercase tracking-[0.16em]"
            >
              <span>View Research Pipeline</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                ↗
              </span>
            </Link>
          </div>
          <div className="hero-meta mt-16 grid max-w-180 grid-cols-1 border-t pt-6 sm:grid-cols-3 border-(--cellyra-border)">
            {heroMetadata.map((item, idx) => (
              <div
                key={item.label}
                className={`${idx === 0
                    ? "pb-4 sm:pb-0"
                    : idx === 1
                      ? "pb-4 sm:border-l sm:pl-6 sm:pb-0 border-(--cellyra-border)"
                      : "sm:border-l sm:pl-6 border-(--cellyra-border)"
                  }`}
              >
                <span className="block font-mono text-[9px] font-semibold uppercase tracking-[0.25em] text-(--cellyra-muted)">
                  {item.label}
                </span>
                <span className="mt-1.5 block font-heading text-sm font-semibold text-(--cellyra-text)">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div
        className="hero-scroll absolute bottom-8 left-6 z-30 flex items-center gap-4 sm:left-8 lg:left-10"
        style={{ pointerEvents: "none" }}
      >
        <div className="relative h-10 w-px overflow-hidden bg-current opacity-20">
          <div className="absolute left-0 top-0 h-1/2 w-full animate-pulse bg-(--cellyra-text)" />
        </div>

        <span className="text-[9px] uppercase tracking-[0.28em] text-(--cellyra-muted) font-mono">
          Scroll to explore
        </span>
      </div>
      <div className="absolute bottom-8 right-6 z-20 text-right sm:right-8 lg:right-10">
        <span className="block text-[9px] uppercase tracking-[0.25em] text-(--cellyra-muted) font-mono opacity-50">
          Biological system
        </span>

        <span className="mt-1 block font-mono text-[10px] text-(--cellyra-text) opacity-70">
          01 / 07
        </span>
      </div>
      <div className="absolute bottom-0 left-0 h-px w-full bg-(--cellyra-border)" />
    </section>
  );
};
