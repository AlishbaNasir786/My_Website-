import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Home } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ background: '#0f0f1a' }} className="text-white/70">
      <div className="max-w-7xl mx-auto px-[5%] pt-16 pb-8">
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-3 text-white font-display font-bold text-xl mb-4">
              <img src="/image.png" alt="Malik Real Estate" loading="eager"
                className="w-10 h-10 rounded-full object-cover border-2 border-gold logo-spin" />
              Malik Real Estate
            </Link>
            <p className="text-sm leading-relaxed mb-6 text-white/60">
              Your trusted partner in finding the perfect property. We combine AI technology with personalized service to make your home search seamless and enjoyable.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#"
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:-translate-y-1"
                  style={{ background: 'rgba(255,255,255,0.08)' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#e94560'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}>
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-base mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {[['/', 'Home'], ['/properties', 'Properties'], ['/about', 'About Us']].map(([path, label]) => (
                <li key={path}>
                  <Link to={path} className="text-white/60 text-sm hover:text-gold transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h4 className="text-white font-semibold text-base mb-5">Property Types</h4>
            <ul className="space-y-3">
              {['Houses', 'Apartments', 'Villas', 'Plots', 'Commercial'].map(t => (
                <li key={t}>
                  <Link to="/properties" className="text-white/60 text-sm hover:text-gold transition-colors">{t}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-base mb-5">Contact</h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li>📍 DHA, Lahore, Pakistan</li>
              <li>📞 +92 316 757 6055</li>
              <li>✉️ info@malikrealestate.pk</li>
              <li className="pt-2">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold" style={{ background: 'rgba(201,169,110,0.15)', color: '#c9a96e', border: '1px solid rgba(201,169,110,0.3)' }}>
                  ⭐ Trusted by 1,000+ clients
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t pt-6 text-center text-xs text-white/30" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          © {new Date().getFullYear()} Malik Arshad Real Estate & Builders. All rights reserved. &nbsp;|&nbsp; AI-Powered Real Estate Solutions
        </div>
      </div>
    </footer>
  );
}
