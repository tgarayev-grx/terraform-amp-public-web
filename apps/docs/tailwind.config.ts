import type { Config } from "tailwindcss";
import {
  tailwindConfigColors,
  tailwindConfigShadows,
  tailwindConfigTypography,
} from "../../packages/ui/theme/tailwind.theme";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["selector", "[data-theme=dark]"],
  theme: {
    extend: {
      fontFamily: {
        bounded: ["var(--font-bounded)", "sans-serif"],
        "fira-code": ["var(--font-fira-code)", "monospace"],
      },
      colors: tailwindConfigColors,
      boxShadow: tailwindConfigShadows,
      fontSize: tailwindConfigTypography,
      keyframes: {
        "slide-in-from-right": {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
        "slide-out-to-right": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(100%)" },
        },
      },
      animation: {
        "slide-in-from-right": "slide-in-from-right 0.3s ease-in-out",
        "slide-out-to-right": "slide-out-to-right 0.3s ease-in-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
