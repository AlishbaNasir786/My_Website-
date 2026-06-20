// Central API configuration
// In development: uses localhost:8080
// In production: uses the VITE_API_URL environment variable set in Vercel
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export default API_BASE;
