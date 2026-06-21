/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-black': '#ffffff', // Pure white background (less black overall)
        'brand-dark': '#fafafa', // Off-white for subtle section contrast
        'brand-gold': '#D4AF37', // Rich luxurious gold
        'brand-gold-light': '#F3E5AB', // Soft light gold
        'brand-blue': '#222222', // Mapped previous blue elements to a soft black/charcoal
        'brand-white': '#111111', // Very dark charcoal/black for highly readable text
      },
      fontFamily: {
        'sans': ['Outfit', 'sans-serif'],
        'display': ['"Playfair Display"', 'serif'],
      }
    },
  },
  plugins: [],
}
