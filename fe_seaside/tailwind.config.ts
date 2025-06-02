import { url } from "inspector";
import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundColor: {
        'primary': '#0EBDD2',
      },
      borderColor: {
        'primary' : '#0EBDD2',
      },
      textColor:{
        'primary' : '#0EBDD2'
      },
    },
  },
  plugins: [],
} satisfies Config;
