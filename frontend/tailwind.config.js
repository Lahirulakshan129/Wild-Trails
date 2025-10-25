/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['Source Sans 3', 'ui-sans-serif', 'system-ui'],
      serif: ['Playfair Display', 'ui-serif', 'Georgia'],
      body: ['Lora', 'ui-serif', 'Georgia'],
      caveat: ['Caveat', 'cursive'],
      aref: ['Aref Ruqaa', 'ui-serif', 'Georgia'],
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        safari: {
          green: '#A0DA83', // From original config
          brown: '#78552b', // From original config
          gold: '#d9b95c', // From original config
          cream: '#fcf9f2', // From original config
          charcoal: '#8e8e8e', // From original config
          'light-green': '#4a7a4a', // From original config
          sand: '#e6d7b8', // From original config and used in Header as safari-sand
          black: '#111111', // From original config
          orange: '#F4A261', // From MapView getAnimalColor (bird) and Header buttons/badge
          forest: '#264653', // From MapView getAnimalColor (bear) and Header text
          leopard: '#E9C46A', // From MapView getAnimalColor (leopard)
          default: '#E76F51', // From MapView getAnimalColor (default)
          'alert-active-bg': '#FECACA', // From MapView createAlertMarkerElement (active alerts)
          'alert-active-fg': '#B91C1C', // From MapView createAlertMarkerElement (active alerts)
          'alert-resolved-bg': '#BBF7D0', // From MapView createAlertMarkerElement (resolved alerts)
          'alert-resolved-fg': '#15803D', // From MapView createAlertMarkerElement (resolved alerts)
          teal: '#2A9D8F', // For CardDescription text
          test:'#DBDBDB'
        },
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('tailwind-scrollbar-hide'),
  ],
}