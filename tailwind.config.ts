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
        background: "var(--background)",
        foreground: "var(--foreground)",
        'primary-color': "#D6B483",
        'primary-darker': '#764F18',
        'input-field': "#F5F5F5",
        'input-field-color': "#B9B1B1",
      },
      fontFamily: {
        nunito_sans: ['var(--font-nunito-sans)'],
      }
    },
  },
  plugins: [],
};
export default config;
