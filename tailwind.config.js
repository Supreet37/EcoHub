/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--color-border)", // sage green 20% opacity
        input: "var(--color-input)", // light neutral
        ring: "var(--color-ring)", // deep forest green
        background: "var(--color-background)", // off-white
        foreground: "var(--color-foreground)", // dark green-black
        primary: {
          DEFAULT: "var(--color-primary)", // deep forest green
          foreground: "var(--color-primary-foreground)", // white
        },
        secondary: {
          DEFAULT: "var(--color-secondary)", // sage green
          foreground: "var(--color-secondary-foreground)", // dark green-black
        },
        destructive: {
          DEFAULT: "var(--color-destructive)", // restrained red
          foreground: "var(--color-destructive-foreground)", // white
        },
        muted: {
          DEFAULT: "var(--color-muted)", // light neutral
          foreground: "var(--color-muted-foreground)", // medium green-gray
        },
        accent: {
          DEFAULT: "var(--color-accent)", // warm amber
          foreground: "var(--color-accent-foreground)", // dark green-black
        },
        popover: {
          DEFAULT: "var(--color-popover)", // white
          foreground: "var(--color-popover-foreground)", // dark green-black
        },
        card: {
          DEFAULT: "var(--color-card)", // light neutral
          foreground: "var(--color-card-foreground)", // dark green-black
        },
        success: {
          DEFAULT: "var(--color-success)", // vibrant green
          foreground: "var(--color-success-foreground)", // white
        },
        warning: {
          DEFAULT: "var(--color-warning)", // sustainable orange
          foreground: "var(--color-warning-foreground)", // dark green-black
        },
        error: {
          DEFAULT: "var(--color-error)", // restrained red
          foreground: "var(--color-error-foreground)", // white
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        'heading': ['Inter', 'sans-serif'],
        'body': ['Source Sans 3', 'sans-serif'],
        'caption': ['Inter', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
}