export default function Footer() {
  return (
    <footer className="bg-brand-dark border-t border-brand-gold/20 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-6 text-center text-brand-white/70 flex flex-col items-center">
        <img src="/logo.png" alt="Malik Arshad Logo" className="w-16 h-16 rounded-full object-cover border-2 border-brand-gold mb-4 shadow-[0_0_15px_rgba(192,132,252,0.4)]" onError={(e) => e.target.style.display = 'none'} />
        <p className="font-display text-lg text-brand-gold">&copy; {new Date().getFullYear()} Malik Arshad Real Estate & Builders. All rights reserved.</p>
        <p className="text-sm mt-2 text-brand-gold-light">Luxurious AI-Powered Real Estate Solutions</p>
      </div>
    </footer>
  );
}
