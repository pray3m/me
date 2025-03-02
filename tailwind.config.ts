import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./modules/**/*.{js,ts,jsx,tsx,mdx}",
    "./common/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--jakartaSans-font)"],
        emoji: ["Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"],
      },
      colors: {
        darkText: "#EEEEEE", //! darkText: "#E4E6B",
        dark: "#121212",
        light: "#fafafa",
      },
      keyframes: {
        wave: {
          "0%": { transform: "rotate(0.0deg)" },
          "10%": { transform: "rotate(14deg)" },
          "20%": { transform: "rotate(-8deg)" },
          "30%": { transform: "rotate(14deg)" },
          "40%": { transform: "rotate(-4deg)" },
          "50%": { transform: "rotate(10.0deg)" },
          "60%": { transform: "rotate(0.0deg)" },
          "100%": { transform: "rotate(0.0deg)" },
        },
        flying: {
          "0%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(0.8rem)" },
          "100%": { transform: "translateY(0)" },
        },
      },
      animation: {
        "waving-hand": "wave 2s linear infinite",
        "flying-card": "flying 3s infinite normal",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
export default config;
