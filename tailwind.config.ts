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
        ink: "#111827",
        deep: "#0f172a",
        muted: "#64748b",
        line: "#d9e4f2",
        paper: "#f8fbff",
        mist: "#eef5ff",
        moss: "#38bdf8",
        leaf: "#8b7cf6",
        coral: "#ef6a8a",
        sun: "#bfdbfe"
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
