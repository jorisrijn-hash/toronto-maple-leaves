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
        // Depth ramp — a single flat blue can't carry 3D depth, so the background
        // sits on a navy-to-void gradient and content lifts toward leafs-blue / ice-blue.
        "ice-void": "#05132B",
        "rink-navy": "#00205B",
        "leafs-blue": "#00488D",
        "ice-blue": "#63B3FF",
        frost: "#E8F1FF",
        "goal-red": "#E8112D", // fills only: 4.01:1 on ice-void, too low for text
        // Text-safe red. #E8112D as a foreground fails WCAG AA on ice-void; this
        // lighter tint hits 5.72:1 while still reading as goal red.
        "goal-red-ink": "#FF4D63",
      },
      // Semantic stacking order. Replaces the ad-hoc z-[61] / z-[85] / z-[100]
      // magic numbers that were scattered across components.
      zIndex: {
        nav: "50",
        announce: "60",
        cursor: "65",
        consent: "70",
        drawer: "85",
        lightbox: "95",
        palette: "100",
      },
      fontFamily: {
        display: ["var(--font-display)", "Impact", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      transitionTimingFunction: {
        // Emil / animations.dev strong curves — built-in easings lack punch.
        out: "cubic-bezier(0.23, 1, 0.32, 1)",
        "in-out": "cubic-bezier(0.77, 0, 0.175, 1)",
        drawer: "cubic-bezier(0.32, 0.72, 0, 1)",
      },
      boxShadow: {
        "pop": "0 24px 60px -12px rgba(0, 12, 40, 0.75)",
        "glow": "0 0 0 1px rgba(99,179,255,0.25), 0 0 40px -8px rgba(99,179,255,0.5)",
      },
      keyframes: {
        "sheen": {
          "0%": { transform: "translateX(-120%) skewX(-12deg)" },
          "100%": { transform: "translateX(220%) skewX(-12deg)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-goal": {
          "0%, 100%": { opacity: "0.5", boxShadow: "0 0 0 0 rgba(232,17,45,0.5)" },
          "50%": { opacity: "1", boxShadow: "0 0 0 8px rgba(232,17,45,0)" },
        },
      },
      animation: {
        sheen: "sheen 1.1s cubic-bezier(0.23,1,0.32,1)",
        "float-slow": "float-slow 6s ease-in-out infinite",
        "pulse-goal": "pulse-goal 1.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
