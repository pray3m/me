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
    },
  },
  darkMode: "class",
  plugins: [],
};
export default config;
