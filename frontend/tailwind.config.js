/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-black': '#121212', // Much lighter black / dark gray
        'brand-dark': '#1c1c1c', // Lighter contrast layer
        'brand-gold': '#D4AF37', // Rich luxurious gold
        'brand-gold-light': '#F3E5AB', // Soft light gold
        'brand-blue': '#D4AF37', // Mapped previous blue elements to gold
        'brand-white': '#ffffff', // Pure white for text on black background
      },
      fontFamily: {
        'sans': ['Outfit', 'sans-serif'],
        'display': ['"Playfair Display"', 'serif'],
      }
    },
  },
  plugins: [],
}
