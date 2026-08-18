import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["var(--font-heading)", "var(--font-inter)", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
      },
      colors: {
        cellyra: {
          bg: "#08090b",
          surface: "#111318",
          "surface-elevated": "#1a1d24",
          text: "#f3f5f2",
          muted: "#8b918e",
          subtle: "#555b58",
          green: "#b7ffb1",
          "green-bright": "#8fffa0",
          teal: "#4ecdc4",
          border: "rgba(255, 255, 255, 0.1)",
          "green-border": "rgba(183, 255, 177, 0.22)",
          "teal-border": "rgba(78, 205, 196, 0.22)",
        },
      },
      borderRadius: {
        "cellyra-sm": "8px",
        "cellyra-md": "16px",
        "cellyra-lg": "24px",
        "cellyra-xl": "32px",
      },
      transitionDuration: {
        "cellyra-fast": "200ms",
        "cellyra-base": "500ms",
        "cellyra-slow": "800ms",
      },
      transitionTimingFunction: {
        "cellyra-spring": "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      boxShadow: {
        "cellyra-glow": "0 4px 24px rgba(183, 255, 177, 0.15)",
        "cellyra-glow-lg": "0 8px 32px rgba(183, 255, 177, 0.25)",
        "cellyra-card": "0 12px 48px rgba(0, 0, 0, 0.3)",
        "cellyra-premium": "0 4px 24px rgba(183, 255, 177, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
      },
      backgroundImage: {
        "cellyra-gradient": "linear-gradient(135deg, #b7ffb1 0%, #8fffa0 50%, #4ecdc4 100%)",
        "cellyra-gradient-green": "linear-gradient(135deg, #b7ffb1 0%, #8fffa0 100%)",
        "cellyra-glow": "radial-gradient(circle at center, rgba(183, 255, 177, 0.08) 0%, rgba(183, 255, 177, 0.02) 50%, transparent 70%)",
        "cellyra-glow-teal": "radial-gradient(circle at center, rgba(78, 205, 196, 0.06) 0%, rgba(78, 205, 196, 0.01) 50%, transparent 70%)",
      },
    },
  },
  plugins: [],
};

export default config;