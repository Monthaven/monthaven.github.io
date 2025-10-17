import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx,mdx}", "./components/**/*.{ts,tsx}", "./content/**/*.{mdx}", "./theme/**/*.{ts}"] ,
  theme: {
    extend: {
      colors: {
        mh: {
          cream: "#F7F5F2",
          cream100: "#FCFAF8",
          sage: "#D6D3CC",
          sage700: "#BEB9AE",
          charcoal: "#555553",
          charcoal900: "#2D2D2B",
          accent: "#35614D",
          white: "#FFFFFF",
        },
      },
      boxShadow: {
        soft: "0 6px 24px rgba(0,0,0,.06)",
      },
      borderRadius: {
        "2xl": "1.25rem",
      },
    },
  },
  plugins: [],
};

export default config;
