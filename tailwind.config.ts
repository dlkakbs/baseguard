import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        base: {
          blue: "#0052FF",
          dark: "#0D1117",
          light: "#F0F6FC",
        },
        risk: {
          safe: "#10B981",
          warning: "#F59E0B",
          danger: "#EF4444",
        }
      },
    },
  },
  plugins: [],
};
export default config;
