import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#102033",
        deep: "#0b1f33",
        muted: "#5f6f82",
        line: "#d7e0ea",
        paper: "#f7f9fc",
        mist: "#edf3f8",
        moss: "#0f8b8d",
        leaf: "#1769aa",
        coral: "#d8664d",
        sun: "#f2c94c"
      },
      boxShadow: {
        soft: "0 22px 70px rgba(15, 23, 42, 0.12)",
        glow: "0 0 40px rgba(56, 189, 248, 0.22)"
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: [typography]
};

export default config;
