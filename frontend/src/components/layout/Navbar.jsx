import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');
  const userJson = localStorage.getItem('user');
  let user = null;
  if (userJson) { try { user = JSON.parse(userJson); } catch (e) {} }

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Only be transparent on homepage
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const isAdminOrAgent = user && user.roles && (user.roles.includes('ROLE_ADMIN') || user.roles.includes('ROLE_AGENT'));
  const isDark = isHome && !scrolled; // dark bg = white text; light bg = dark text

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        (isHome && !scrolled) ? 'navbar-transparent py-5 px-[5%]' : 'navbar-scrolled py-4 px-[5%]'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className={`flex items-center gap-3 font-display font-bold text-2xl transition-colors ${isDark ? 'text-white' : 'text-primary'}`}>
            <img src="/image.png" alt="Malik Real Estate" loading="eager" fetchPriority="high"
              className="w-10 h-10 rounded-full object-cover border-2 border-gold logo-spin" />
            <span>Malik Real Estate</span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8">
            {['/', '/properties', '/about'].map((path, i) => {
              const labels = ['Home', 'Properties', 'About'];
              return (
                <Link key={path} to={path}
                  className={`font-medium text-sm relative group transition-colors ${isDark ? 'text-white/90 hover:text-gold' : 'text-primary hover:text-accent'}`}>
                  {labels[i]}
                  <span className={`absolute -bottom-1 left-0 h-0.5 w-0 bg-gold group-hover:w-full transition-all duration-300`} />
                </Link>
              );
            })}
            {isAdminOrAgent && (
              <Link to="/admin" className={`font-medium text-sm transition-colors ${isDark ? 'text-white/90 hover:text-gold' : 'text-primary hover:text-accent'}`}>
                Dashboard
              </Link>
            )}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
            {token ? (
              <>
                <span className={`text-xs font-medium ${isDark ? 'text-white/60' : 'text-brand-text-light'}`}>
                  {user?.email}
                </span>
                <button onClick={handleLogout}
                  className={`btn-outline text-sm ${isDark ? '' : 'btn-outline-dark'}`}>
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className={`btn-outline text-sm ${isDark ? '' : 'btn-outline-dark'}`}>Sign In</Link>
                <Link to="/register" className="btn-accent text-sm">Register</Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden p-2 ${isDark ? 'text-white' : 'text-primary'}`}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-primary/95 backdrop-blur-md flex flex-col items-center justify-center gap-6 text-white">
          <button onClick={() => setMobileOpen(false)} className="absolute top-5 right-5 text-white">
            <X size={28} />
          </button>
          {[['/', 'Home'], ['/properties', 'Properties'], ['/about', 'About']].map(([path, label]) => (
            <Link key={path} to={path} onClick={() => setMobileOpen(false)}
              className="text-2xl font-display font-semibold hover:text-gold transition-colors">
              {label}
            </Link>
          ))}
          {isAdminOrAgent && (
            <Link to="/admin" onClick={() => setMobileOpen(false)}
              className="text-2xl font-display font-semibold hover:text-gold transition-colors">Dashboard</Link>
          )}
          <div className="flex gap-4 mt-4">
            {token ? (
              <button onClick={() => { handleLogout(); setMobileOpen(false); }}
                className="btn-outline">Sign Out</button>
            ) : (
              <>
                <Link to="/login" onClick={() => setMobileOpen(false)} className="btn-outline">Sign In</Link>
                <Link to="/register" onClick={() => setMobileOpen(false)} className="btn-accent">Register</Link>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
