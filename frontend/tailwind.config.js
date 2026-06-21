/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-black': '#ffffff', // Was black, now pure white background
        'brand-dark': '#f8f9fa', // Was dark gray, now very light gray for cards
        'brand-gold': '#D4AF37', // Kept elegant gold
        'brand-gold-light': '#F3E5AB',
        'brand-white': '#1f2937', // Was white text, now dark gray text
      }
    },
  },
  plugins: [],
}
