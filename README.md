# 🧬 CELLYRA BIO — Engineering Biology

> **Next-Generation Biological Intelligence & Synthetic Genomics Platform**  
> Combining biological science, computational intelligence, and precision engineering to construct the next era of life science solutions.

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Design & Typography System](#-design--typography-system)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development Server](#development-server)
  - [Production Build](#production-build)
- [License](#-license)

---

## 🌐 Overview

**Cellyra Bio** is an editorial, high-performance web experience built for a modern biotechnology and computational biology pioneer. It features interactive particle simulations, real-time molecular visualization canvases, smooth inertial scrolling, dynamic dark/light theme switching, and a modern typography hierarchy.

---

## ✨ Key Features

- **Interactive Molecular Particle Field**: Real-time canvas listening to cursor physics, generating repulsion fields around biological nodes.
- **DNA Double Helix & Network Simulator**: High-performance interactive 2D canvas running dynamic DNA strand computations and node networks with automatic viewport throttling.
- **Interactive Methodology Word Wall**: Dynamic terms wall with cursor-following 3D structural previews.
- **Edge-to-Edge Expanding Accordion**: Smooth cubic-bezier expanding carousel showcasing active research programs.
- **Lenis Smooth Inertial Scrolling**: Smooth scroll physics synchronized with GSAP ScrollTrigger.
- **Dark & Light Mode Support**: Instant, hydration-safe theme switching with zero layout shift (CLS).
- **Responsive Architecture**: Fluid clamp scaling across mobile, tablet, desktop, and ultra-wide displays.

---

## 🛠 Tech Stack

| Technology                                               | Purpose                                                   |
| :------------------------------------------------------- | :-------------------------------------------------------- |
| **[Next.js 16 (App Router)](https://nextjs.org/)**       | React Framework with Turbopack & Server/Client components |
| **[React 19](https://react.dev/)**                       | Core UI library                                           |
| **[TypeScript 5](https://www.typescriptlang.org/)**      | Type safety and strict interface definitions              |
| **[Tailwind CSS v4](https://tailwindcss.com/)**          | Utility-first styling engine with `@theme` token mappings |
| **[GSAP & ScrollTrigger](https://greensock.com/gsap/)**  | Advanced timeline animations and scroll-scrubbed effects  |
| **[Framer Motion](https://www.framer.com/motion/)**      | Spring physics, magnetic buttons, and viewport reveals    |
| **[Lenis](https://lenis.darkroom.engineering/)**         | Smooth inertial scrolling engine                          |
| **[Three.js / React Three Fiber](https://threejs.org/)** | 3D WebGL scenes and structural rendering                  |

---

## 🔤 Design & Typography System

The application utilizes a curated 3-tier font stack via `next/font/google`:

- **Display & Headings**: `Plus Jakarta Sans` (`--font-heading`) — crisp, modern, geometric letterforms for impactful titles.
- **Body Text**: `Inter` (`--font-inter`) — optimized for high readability and rhythmic prose.
- **Technical & Telemetry**: `JetBrains Mono` (`--font-mono`) — authentic engineering precision for metadata, indices (`01 // SYNTHETIC ARCHITECTURE`), badges, and genomic sequence tickers.

---

## 🎨 Design & Animation Philosophy

### Color System — "Hyper Monochrome"

The palette is intentionally near-black with **platinum/silver whites** — no generic accent colors. Dark mode uses deep charcoal (`#07080c`) with off-white accents (`#f8fafc`). Light mode perfectly inverts this to obsidian ink on pearl. Accent glows (green `#00ffa3`, violet `#a855f7`, cyan `#00d4ff`) appear sparingly as **light sources**, not fills — embedded in blurred radial gradients rather than applied as solid colors.

### Typography Hierarchy — Editorial Scale

Four distinct typographic roles drive the hierarchy:

| Class             | Scale                    | Tracking   | Role                    |
| :---------------- | :----------------------- | :--------- | :---------------------- |
| `cellyra-display` | `clamp(3.2rem → 8.5rem)` | `-0.055em` | Hero titles             |
| `cellyra-h2`      | `clamp(2.4rem → 4.8rem)` | `-0.04em`  | Section headings        |
| `cellyra-h3`      | `clamp(1.4rem → 2.2rem)` | `-0.025em` | Card headings           |
| `cellyra-eyebrow` | `11px` mono              | `+0.28em`  | Index / category labels |

All sizes use `clamp()` for fluid, viewport-proportional scaling with zero breakpoint jumps.

### Glassmorphism & Depth

Cards, navigation, and overlay panels use `cellyra-glass`: `backdrop-filter: blur(24px)` over a semi-transparent surface. Scene depth is created with large gaussian-blurred radial gradient orbs ("glow layers") rather than solid box shadows — every section feels lit from within.

### Noise Texture

A zero-CPU-cost dot-grid overlay (`opacity: 0.018`, 24px grid) prevents flat backgrounds from looking sterile. Light mode inverts to dark dots. The finer variant (`cellyra-noise-fine`) at 16px pitch is used inside denser UI areas.

---

### ✨ Animation Approach

#### Entry — GSAP Orchestrated Timelines

The Hero section uses a `gsap.timeline` with `power3.out` easing. Elements enter in a cinematic cascade with overlapping offsets:

```
eyebrow (y:20) → title lines (y:90, stagger 0.1s) → description → CTAs → meta stats → scroll indicator
```

Each element overlaps the previous by `−0.45s` to `−0.55s`, creating a smooth wave rather than sequential pops.

#### Scroll — Scrubbed Parallax Exit

A second GSAP timeline with `ScrollTrigger` (`scrub: 1`) smoothly fades and lifts the hero content (`y: −130`) while expanding the ambient glow orb (`scale: 1.5`) as the user scrolls. The section **evaporates** out of view rather than abruptly disappearing.

#### Capabilities Section — Horizontal Scroll Track

The Capabilities section pins itself at `h-[480vh]`, using `useScroll` + `useTransform` (Framer Motion) to map vertical scroll progress into a horizontal `x` translation across the card track — creating a native-feeling lateral scroll panel driven by the vertical scroll wheel.

#### Section Reveals — CSS Intersection Observer

All lower sections use `.cellyra-reveal` and `.cellyra-reveal-stagger` classes driven by `IntersectionObserver`. The easing curve — `cubic-bezier(0.22, 1, 0.36, 1)` — is an **expo-out** feel applied consistently: fast initial movement, silky deceleration.

Stagger delays are baked directly into CSS via `:nth-child` rules (80ms increments), eliminating JavaScript overhead for reveal choreography.

#### Micro-Interactions

| Element           | Hover Effect                                       |
| :---------------- | :------------------------------------------------- |
| Buttons           | `translateY(−2px)` lift, `translateY(0)` on active |
| Cards             | `translateY(−4px)` lift + violet glow border       |
| Pills             | Border brightens to `--cellyra-silver-border`      |
| Secondary buttons | Glassmorphic background intensifies                |

All transitions use the shared `--cellyra-transition-base` token (`500ms cubic-bezier(0.22, 1, 0.36, 1)`) — nothing is arbitrary.

#### Ambient — CSS Keyframe Loops

- **`aurora-border`** — 6s loop cycling green → violet → cyan border glow (used on featured UI elements)
- **`float`** — 6s sine-wave Y-axis bob (`translateY(0 → −8px)`) for decorative floating elements

#### Scroll Engine — Lenis

Native browser scroll is replaced with **Lenis** for smooth inertial momentum. This makes scrubbed `ScrollTrigger` timelines feel physically natural — the content slides against physics rather than snapping mechanically.

#### Accessibility

All motion is wrapped in `@media (prefers-reduced-motion: reduce)`, collapsing all `animation-duration` and `transition-duration` values to `0.01ms` and making `.cellyra-reveal` elements instantly visible. No user is forced through animation.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: `v18.17.0` or higher
- **npm**: `v9.0.0` or higher (or `pnpm` / `yarn`)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/cellyra-bio.git
   cd cellyra-bio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

### Development Server

Start the local development server with Turbopack:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Production Build

Create an optimized production bundle:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

Lint codebase:

```bash
npm run lint
```

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
