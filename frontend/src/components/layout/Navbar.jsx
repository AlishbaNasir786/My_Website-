import { Link, useNavigate } from 'react-router-dom';
import { Building2 } from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const userJson = localStorage.getItem('user');
  let user = null;
  if (userJson) {
    try {
      user = JSON.parse(userJson);
    } catch (e) {
      console.error(e);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const isAdminOrAgent = user && user.roles && (user.roles.includes('ROLE_ADMIN') || user.roles.includes('ROLE_AGENT'));

  return (
    <nav className="bg-brand-dark border-b border-brand-gold/20 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-brand-gold">
          <Building2 size={28} />
          <span className="text-xl font-bold tracking-wider font-display">PRESTIGE ESTATE</span>
        </Link>
        <div className="flex gap-6 items-center">
          <Link to="/" className="text-brand-white hover:text-brand-gold transition-colors">Home</Link>
          <Link to="/properties" className="text-brand-white hover:text-brand-gold transition-colors">Properties</Link>
          {isAdminOrAgent && (
            <Link to="/admin" className="text-brand-white hover:text-brand-gold transition-colors">Dashboard</Link>
          )}
          {token ? (
            <div className="flex items-center gap-4">
              <span className="text-brand-white/70 text-xs hidden md:inline border border-brand-gold/20 px-2 py-1 rounded bg-brand-black">
                {user?.email} ({user?.roles?.[0]?.replace('ROLE_', '')})
              </span>
              <button onClick={handleLogout} className="px-4 py-2 border border-brand-gold text-brand-gold rounded hover:bg-brand-gold hover:text-brand-black transition-colors text-sm font-medium">
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex gap-4 items-center">
              <Link to="/login" className="px-4 py-2 border border-brand-gold text-brand-gold rounded hover:bg-brand-gold hover:text-brand-black transition-colors text-sm font-medium">Sign In</Link>
              <Link to="/register" className="px-4 py-2 bg-brand-gold text-brand-black rounded hover:bg-brand-gold-light transition-colors text-sm font-medium">Register</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
