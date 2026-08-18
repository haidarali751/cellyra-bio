"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { SunIcon, MoonIcon } from "@/components/icons";
import { CellyraLogo } from "@/components/ui/CellyraLogo";
import { navigation } from "@/data";

export const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <header
        className={`
          fixed inset-x-0 top-0 z-100
          transition-all duration-700
          ${scrolled
            ? "border-b border-(--cellyra-border) bg-(--cellyra-bg)/80 backdrop-blur-xl"
            : "bg-transparent"
          }
        `}
      >
        <div className="mx-auto flex h-19 max-w-360 items-center justify-between px-6 lg:px-10">
          {/* Premium Logo */}
          <div className="relative z-110">
            <CellyraLogo
              size="md"
              href="/"
              onClick={closeMenu}
              showBadge={true}
              badgeText="BIO"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 lg:flex">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative py-2 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-(--cellyra-muted) transition-colors duration-300 hover:text-(--cellyra-text)"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 h-px w-0 bg-(--cellyra-text) transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4 sm:gap-5">
            {/* Day / Night Mode Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              className="group relative flex h-9 w-9 items-center justify-center rounded-full border border-(--cellyra-border) bg-(--cellyra-surface)/60 text-(--cellyra-text) transition-all duration-300 hover:scale-105 hover:border-(--cellyra-silver-border) cursor-pointer"
            >
              {theme === "dark" ? (
                <SunIcon className="transition-transform duration-500 group-hover:rotate-45" />
              ) : (
                <MoonIcon className="transition-transform duration-500 group-hover:-rotate-12" />
              )}
            </button>

            <Link
              href="#contact"
              className="hidden items-center gap-2 rounded-full border border-(--cellyra-border) px-4 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-(--cellyra-text) transition-all duration-300 hover:border-(--cellyra-silver-border) hover:bg-(--cellyra-surface) sm:flex"
            >
              <span>Contact</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>

            {/* Mobile menu button */}

            <button
              type="button"
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((value) => !value)}
              className="relative z-110 flex h-10 w-10 items-center justify-center lg:hidden"
            >
              <span className="relative block h-4 w-5">
                <span
                  className={`
                    absolute left-0 top-0 h-px w-5
                    bg-(--cellyra-text)
                    transition-all duration-500
                    ${menuOpen ? "top-1.75 rotate-45" : ""}
                  `}
                />

                <span
                  className={`
                    absolute left-0 top-1.75 h-px w-5
                    bg-(--cellyra-text)
                    transition-all duration-500
                    ${menuOpen ? "opacity-0" : "opacity-100"}
                  `}
                />

                <span
                  className={`
                    absolute left-0 top-3.5 h-px w-5
                    bg-(--cellyra-text)
                    transition-all duration-500
                    ${menuOpen ? "top-1.75 -rotate-45" : ""}
                  `}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}

      <div
        className={`
          fixed inset-0 z-90 lg:hidden
          transition-all duration-700
          ${menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
          }
        `}
      >
        {/* Background */}

        <div className="absolute inset-0 bg-[#07080c]" />

        {/* Glow */}

        <div
          className={`
            absolute -right-32 top-20 h-125 w-125
            rounded-full bg-white/5
            blur-[140px]
            transition-transform duration-1200
            ${menuOpen ? "scale-100" : "scale-50"}
          `}
        />

        {/* Menu content */}

        <div className="relative flex h-full flex-col px-6 pb-8 pt-32">
          <div className="mb-8 flex items-center gap-3">
            <span className="h-px w-8 bg-(--cellyra-text) opacity-40" />
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.3em] text-(--cellyra-muted)">
              00 // Navigation
            </span>
          </div>

          <nav className="flex flex-col">
            {navigation.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className={`
                  group flex items-center justify-between
                  border-b border-(--cellyra-border)
                  py-5
                  transition-all duration-500
                  ${menuOpen
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                  }
                `}
                style={{
                  transitionDelay: `${index * 70}ms`,
                }}
              >
                <span className="font-heading text-[clamp(2.2rem,8vw,3.5rem)] font-bold leading-none tracking-tight text-(--cellyra-text) transition-colors duration-300 group-hover:text-(--cellyra-muted)">
                  {item.label}
                </span>

                <span className="font-mono text-xl text-(--cellyra-muted) transition-transform duration-300 group-hover:translate-x-2 group-hover:text-(--cellyra-text)">
                  ↗
                </span>
              </Link>
            ))}
          </nav>

          <div className="mt-auto flex items-end justify-between border-t border-(--cellyra-border) pt-6">
            <div>
              <span className="block font-mono text-[9px] uppercase tracking-[0.25em] text-(--cellyra-muted)">
                Biological Intelligence
              </span>
              <span className="mt-1 block font-mono text-xs font-semibold text-(--cellyra-text)">
                CELLYRA BIO
              </span>
            </div>

            <Link
              href="#contact"
              onClick={closeMenu}
              className="group flex items-center gap-2 rounded-full bg-(--cellyra-text) px-5 py-2.5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-(--cellyra-bg) transition-transform duration-300 hover:scale-105"
            >
              <span>Contact</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
