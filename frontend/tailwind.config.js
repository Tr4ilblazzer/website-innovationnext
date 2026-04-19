/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#3C53FF',
          'blue-hover': '#2B3BB5',
          cyan: '#0DFFFF',
          dark: '#040404',
          surface: '#111111',
          card: '#161616',
          border: 'rgba(255,255,255,0.08)',
          neutral1: '#737373',
          neutral2: '#393939',
          neutral3: '#B1B1B1',
        },
      },
      fontFamily: {
        display: ['"Clash Display Variable"', '"Clash Display"', 'system-ui', 'sans-serif'],
        sans: ['"Public Sans"', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #3C53FF, #0DFFFF)',
        'brand-gradient-subtle': 'linear-gradient(135deg, rgba(60,83,255,0.15), rgba(13,255,255,0.05))',
        'grid-pattern': `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
      },
      backgroundSize: {
        'grid': '60px 60px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'gradient-x': 'gradient-x 4s ease infinite',
        'fade-up': 'fadeUp 0.6s ease forwards',
        'counter': 'counter 2s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        'brand': '0 0 40px rgba(60,83,255,0.2)',
        'brand-lg': '0 0 80px rgba(60,83,255,0.3)',
        'card': '0 4px 24px rgba(0,0,0,0.4)',
        'glass': 'inset 0 1px 0 rgba(255,255,255,0.05)',
      },
      borderRadius: {
        '2.5xl': '1.25rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
}
