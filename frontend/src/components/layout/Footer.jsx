export default function Footer() {
  return (
    <footer className="bg-brand-dark border-t border-brand-gold/20 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-6 text-center text-brand-white/70">
        <p>&copy; {new Date().getFullYear()} Prestige Estate Management. All rights reserved.</p>
        <p className="text-sm mt-2 text-brand-gold/80">AI-Powered Real Estate Solutions for Pakistan</p>
      </div>
    </footer>
  );
}
