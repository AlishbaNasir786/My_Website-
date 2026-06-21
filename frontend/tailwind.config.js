/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-black': '#0a0510', // Deep luxurious black with a hint of purple
        'brand-dark': '#1a0b2e', // Deep purple/navy for cards
        'brand-gold': '#C084FC', // Repurposing 'gold' variable to Lilac for primary accents
        'brand-gold-light': '#F472B6', // Repurposing to Pink for highlights
        'brand-blue': '#3B82F6', // Vibrant blue
        'brand-white': '#f8f4fc', // Very light lilac/white
      },
      fontFamily: {
        'sans': ['Outfit', 'sans-serif'],
        'display': ['"Playfair Display"', 'serif'],
      }
    },
  },
  plugins: [],
}
