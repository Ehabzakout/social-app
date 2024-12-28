import type { Config } from "tailwindcss";
import { withUt } from "uploadthing/tw";


export default withUt( {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "primary":"#1976d2"
      },
    },
  },
  plugins: [],
}) satisfies Config;
