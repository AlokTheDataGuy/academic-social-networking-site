/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '475px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        primary: {
          50: '#f5f5dc', // Beige (DSVV brand color)
          100: '#e6e6c3',
          200: '#d6d6aa',
          300: '#c7c791',
          400: '#b8b878',
          500: '#a9a95f',
          600: '#8b874c',
          700: '#6d6a3a',
          800: '#4e4c29',
          900: '#302e17',
        },
        secondary: {
          50: '#ffeaea',
          100: '#ffd5d5',
          200: '#ffabab',
          300: '#ff8282',
          400: '#ff5858',
          500: '#ff2e2e',
          600: '#cc0000', // Dark red (DSVV brand color)
          700: '#990000',
          800: '#660000',
          900: '#330000',
        },
        accent: {
          50: '#fff9e6',
          100: '#fff3cc',
          200: '#ffe799',
          300: '#ffdb66',
          400: '#ffcf33',
          500: '#ffc300',
          600: '#cc9c00', // Gold (DSVV brand color)
          700: '#997500',
          800: '#664e00',
          900: '#332700',
        },
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'yatra': ['"Yatra One"', 'cursive'],
        'noto-devanagari': ['"Noto Sans Devanagari"', 'sans-serif'],
        'playfair': ['"Playfair Display"', 'serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
      },
      keyframes: {
        'fade-in-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'reverse-spin-slow': {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        'pulse-glow': {
          '0%, 100%': {
            opacity: 0.8,
            boxShadow: '0 0 5px rgba(255, 195, 0, 0.5), 0 0 10px rgba(204, 0, 0, 0.3)'
          },
          '50%': {
            opacity: 1,
            boxShadow: '0 0 10px rgba(255, 195, 0, 0.8), 0 0 20px rgba(204, 0, 0, 0.5)'
          },
        }
      },
      animation: {
        'fade-in-down': 'fade-in-down 0.5s ease-out',
        'spin-slow': 'spin-slow 20s linear infinite',
        'reverse-spin-slow': 'reverse-spin-slow 20s linear infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
