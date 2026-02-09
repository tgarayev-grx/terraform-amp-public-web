import type { Config } from "tailwindcss";
// Tailwind can't handle workspace packages, so we need to import using relative path
import { tailwindConfigColors } from "../../packages/ui/theme/tailwind.theme";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    // TODO: Remove this once we have a proper external package for components
    "../../packages/ui/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        unbounded: ["var(--font-unbounded)", "sans-serif"],
      },
      colors: tailwindConfigColors,
      boxShadow: {
        "light-sm":
          "0 12px 40px -4px rgba(16, 24, 40, 0.08), 0 4px 8px -2px rgba(16, 24, 40, 0.03)",
        "dark-sm":
          "0 3px 8px 0 rgba(0, 0, 0, 0.35), 0 1px 3px 0 rgba(0, 0, 0, 0.5), inset 0 0.5px 0 0 rgba(255, 255, 255, 0.08), inset 0 0 0.5px 0 rgba(255, 255, 255, 0.3)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "slide-in-from-right": {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
        "slide-out-to-right": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(100%)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-out": {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
        "popover-in": {
          from: { opacity: "0", transform: "scale(0.96)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        "popover-out": {
          from: { opacity: "1", transform: "scale(1)" },
          to: { opacity: "0", transform: "scale(0.96)" },
        },
        "cursor-blink": {
          "0%, 50%": { opacity: "1" },
          "51%, 100%": { opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "slide-in-from-right": "slide-in-from-right 0.3s ease-in-out",
        "slide-out-to-right": "slide-out-to-right 0.3s ease-in-out",
        "fade-in": "fade-in 0.3s ease-in-out",
        "fade-out": "fade-out 0.3s ease-in-out",
        "popover-in": "popover-in 0.15s ease-out",
        "popover-out": "popover-out 0.15s ease-in",
        "cursor-blink": "cursor-blink 1s step-end infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
