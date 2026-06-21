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
        'brand-blue': '#000000', // Mapped previous blue elements to pure black
        'brand-white': '#000000', // Pure black for maximum readability
      },
      fontFamily: {
        'sans': ['Outfit', 'sans-serif'],
        'display': ['"Playfair Display"', 'serif'],
      }
    },
  },
  plugins: [],
}
