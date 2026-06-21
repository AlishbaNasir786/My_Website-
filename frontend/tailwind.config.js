/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-black': '#000000', // Pure black background
        'brand-dark': '#0a0a0a', // Almost black for subtle section contrast
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
