/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-black': '#ffffff', // Pure white background
        'brand-dark': '#f8f9fa', // Very light gray for cards and sections
        'brand-gold': '#C084FC', // Lilac
        'brand-gold-light': '#F472B6', // Pink
        'brand-blue': '#3B82F6', // Vibrant blue
        'brand-white': '#1f2937', // Dark gray text for readability on white
      },
      fontFamily: {
        'sans': ['Outfit', 'sans-serif'],
        'display': ['"Playfair Display"', 'serif'],
      }
    },
  },
  plugins: [],
}
