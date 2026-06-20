/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-black': '#0a0a0a',
        'brand-dark': '#1a1a1a',
        'brand-gold': '#D4AF37',
        'brand-gold-light': '#F3E5AB',
        'brand-white': '#f8f8f8',
      }
    },
  },
  plugins: [],
}
