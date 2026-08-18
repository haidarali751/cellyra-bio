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

| Technology | Purpose |
| :--- | :--- |
| **[Next.js 16 (App Router)](https://nextjs.org/)** | React Framework with Turbopack & Server/Client components |
| **[React 19](https://react.dev/)** | Core UI library |
| **[TypeScript 5](https://www.typescriptlang.org/)** | Type safety and strict interface definitions |
| **[Tailwind CSS v4](https://tailwindcss.com/)** | Utility-first styling engine with `@theme` token mappings |
| **[GSAP & ScrollTrigger](https://greensock.com/gsap/)** | Advanced timeline animations and scroll-scrubbed effects |
| **[Framer Motion](https://www.framer.com/motion/)** | Spring physics, magnetic buttons, and viewport reveals |
| **[Lenis](https://lenis.darkroom.engineering/)** | Smooth inertial scrolling engine |
| **[Three.js / React Three Fiber](https://threejs.org/)** | 3D WebGL scenes and structural rendering |

---

## 🔤 Design & Typography System

The application utilizes a curated 3-tier font stack via `next/font/google`:

- **Display & Headings**: `Plus Jakarta Sans` (`--font-heading`) — crisp, modern, geometric letterforms for impactful titles.
- **Body Text**: `Inter` (`--font-inter`) — optimized for high readability and rhythmic prose.
- **Technical & Telemetry**: `JetBrains Mono` (`--font-mono`) — authentic engineering precision for metadata, indices (`01 // SYNTHETIC ARCHITECTURE`), badges, and genomic sequence tickers.

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
