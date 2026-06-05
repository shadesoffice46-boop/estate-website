import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Blue anchors trust and structure (headings, nav, primary CTAs).
        blue: {
          DEFAULT: "#14365C", // deep blue — primary
          deep: "#14365C",
          accent: "#2A5A8C", // accent blue — links, hover
        },
        // Brown / taupe adds warmth and luxury (accents, secondary CTAs).
        brown: {
          DEFAULT: "#8B5E3C", // warm brown — secondary
          taupe: "#C9A98B", // soft taupe — muted brown
        },
        // Airy neutrals keep large surfaces calm.
        cream: "#FAF7F2", // off-white background
        ink: "#1A1A1A", // body text
      },
      fontFamily: {
        // Poppins everywhere — 700 is the dominant display weight.
        sans: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Editorial display scale (≥1.25 ratio between steps).
        display: [
          "clamp(2.5rem, 6vw, 6rem)",
          { lineHeight: "0.95", letterSpacing: "-0.04em" },
        ],
        h2: [
          "clamp(2rem, 4vw, 3.5rem)",
          { lineHeight: "1.05", letterSpacing: "-0.03em" },
        ],
        h3: [
          "clamp(1.35rem, 2vw, 1.75rem)",
          { lineHeight: "1.2", letterSpacing: "-0.015em" },
        ],
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      maxWidth: {
        prose: "68ch",
      },
      boxShadow: {
        card: "0 1px 2px rgba(20,54,92,0.04), 0 12px 32px -12px rgba(20,54,92,0.18)",
        "card-hover":
          "0 1px 2px rgba(20,54,92,0.06), 0 28px 56px -16px rgba(20,54,92,0.30)",
        float:
          "0 2px 4px rgba(20,54,92,0.05), 0 24px 48px -16px rgba(20,54,92,0.22)",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "out-quart": "cubic-bezier(0.25, 1, 0.5, 1)",
      },
      zIndex: {
        nav: "40",
        overlay: "50",
        modal: "60",
      },
    },
  },
  plugins: [],
};

export default config;
