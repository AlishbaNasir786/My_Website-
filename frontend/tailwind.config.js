/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1a1a2e',
        'primary-light': '#16213e',
        accent: '#e94560',
        'accent-hover': '#d63d56',
        gold: '#c9a96e',
        'gold-light': '#e8d5a3',
        'brand-bg': '#f8f9fa',
        'brand-text': '#2d2d2d',
        'brand-text-light': '#6b7280',
        // keep legacy names working
        'brand-black': '#1a1a2e',
        'brand-dark': '#16213e',
        'brand-gold': '#c9a96e',
        'brand-gold-light': '#e8d5a3',
        'brand-white': '#ffffff',
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
        'display': ['"Playfair Display"', 'serif'],
      },
      boxShadow: {
        'card': '0 4px 20px rgba(0,0,0,0.08)',
        'card-lg': '0 10px 40px rgba(0,0,0,0.12)',
      }
    },
  },
  plugins: [],
}
