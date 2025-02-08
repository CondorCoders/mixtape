import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        flipBack: {
          "0%": { transform: "rotateY(0deg)" },
          "100%": { transform: "rotateY(180deg)" },
        },
        flip: {
          "0%": { transform: "rotateY(-180deg)" },
          "100%": { transform: "rotateY(0deg)" },
        },
        swap: {
          "0%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(105%)" },
          "100%": { transform: "translateY(-5%) rotate(5deg)", zIndex: "0" },
        },
        swapBack: {
          "0%": { transform: "translateY(-5%) rotate(5deg)", zIndex: "0" },
          "50%": { transform: "translateY(105%)" },
          "100%": { transform: "translateY(0) rotate(0)" },
        },
        backToFront: {
          "0%": { zIndex: "0" },
          "50%": { zIndex: "0" },
          "100%": { zIndex: "10" },
        },
        frontToBack: {
          "0%": { zIndex: "10" },
          "50%": { zIndex: "0" },
          "100%": { zIndex: "0" },
        },
      },
      animation: {
        flip: "flip 1.5s ease forwards",
        flipBack: "flipBack 1.5s ease forwards",
        swap: "swap 1.5s ease forwards",
        swapBack: "swapBack 1.5s ease forwards",
        backToFront: "backToFront 1.5s ease forwards",
        frontToBack: "frontToBack 1.5s ease forwards",
      },
      fontFamily: {
        shadow: ["var(--font-shadow)", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
