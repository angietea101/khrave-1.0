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
        'primary-darker': '#764F18',
        'input-field': "#F5F5F5",
        'input-field-color': "#B9B1B1",
        primary: "#F8F5ED",
        secondary: "#D6B483",
        secondaryhover: "#C59A6A",
        scbackground: 'hsl(var(--sc-background))',
        scforeground: 'hsl(var(--sc-foreground))',
        sccard: {
          DEFAULT: 'hsl(var(--sc-card))',
          foreground: 'hsl(var(--sc-card-foreground))'
        },
        scpopover: {
          DEFAULT: 'hsl(var(--sc-popover))',
          foreground: 'hsl(var(--sc-popover-foreground))'
        },
        scprimary: {
          DEFAULT: 'hsl(var(--sc-primary))',
          foreground: 'hsl(var(--sc-primary-foreground))'
        },
        scsecondary: {
          DEFAULT: 'hsl(var(--sc-secondary))',
          foreground: 'hsl(var(--sc-secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--sc-muted))',
          foreground: 'hsl(var(--sc-muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--sc-accent))',
          foreground: 'hsl(var(--sc-accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--sc-destructive))',
          foreground: 'hsl(var(--sc-destructive-foreground))'
        },
        border: 'hsl(var(--sc-border))',
  			input: 'hsl(var(--sc-input))',
  			ring: 'hsl(var(--sc-ring))',
  			chart: {
  				'1': 'hsl(var(--sc-chart-1))',
  				'2': 'hsl(var(--sc-chart-2))',
  				'3': 'hsl(var(--sc-chart-3))',
  				'4': 'hsl(var(--sc-chart-4))',
  				'5': 'hsl(var(--sc-chart-5))'
  			}
      },
      fontFamily: {
        nunito_sans: ['var(--font-nunito-sans)'],
        teachers: ["Teachers", 'serif'],
      },
      borderRadius: {
  			lg: 'var(--sc-radius)',
  			md: 'calc(var(--sc-radius) - 2px)',
  			sm: 'calc(var(--sc-radius) - 4px)'
  		}
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
