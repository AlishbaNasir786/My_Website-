import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Search, TrendingUp, ShieldCheck } from 'lucide-react';

export default function Home() {
  const [searchVal, setSearchVal] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchVal.trim()) {
      navigate(`/properties?search=${encodeURIComponent(searchVal.trim())}`);
    } else {
      navigate('/properties');
    }
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center bg-brand-dark/50 border-b border-brand-gold/20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
        <div className="z-10 text-center max-w-4xl px-6">
          <h1 className="text-5xl md:text-7xl font-bold text-brand-white tracking-tight mb-6">
            Find Your <span className="text-brand-gold">Malik</span> Home
          </h1>
          <p className="text-xl text-brand-white/80 mb-10">
            The premier AI-powered real estate platform in Pakistan. Discover elite properties, smart investments, and luxury living.
          </p>
          <form onSubmit={handleSearchSubmit} className="glass-card p-4 rounded-xl flex flex-col md:flex-row gap-4 max-w-3xl mx-auto z-10 relative">
            <input 
              type="text" 
              placeholder="Search by city, society, or keyword (e.g. Islamabad, DHA)..." 
              className="input-base flex-grow"
              value={searchVal}
              onChange={e => setSearchVal(e.target.value)}
            />
            <button type="submit" className="btn-primary flex items-center justify-center gap-2">
              <Search size={20} /> SEARCH
            </button>
          </form>
        </div>
      </section>
      
      {/* Features */}
      <section className="py-20 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12 text-center">
          <div className="glass-card p-8 rounded-2xl cursor-pointer">
            <Building2 size={56} className="text-brand-gold mx-auto mb-6 drop-shadow-md" />
            <h3 className="text-2xl font-bold text-brand-white mb-3">Elite Properties</h3>
            <p className="text-brand-white/70">Curated listings of the finest homes, commercial spaces, and plots.</p>
          </div>
          <div className="glass-card p-8 rounded-2xl cursor-pointer">
            <TrendingUp size={56} className="text-brand-gold mx-auto mb-6 drop-shadow-md" />
            <h3 className="text-2xl font-bold text-brand-white mb-3">AI Insights</h3>
            <p className="text-brand-white/70">Market trends and property recommendations powered by advanced AI.</p>
          </div>
          <div className="glass-card p-8 rounded-2xl cursor-pointer">
            <ShieldCheck size={56} className="text-brand-gold mx-auto mb-6 drop-shadow-md" />
            <h3 className="text-2xl font-bold text-brand-white mb-3">Secure & Verified</h3>
            <p className="text-brand-white/70">Every listing is meticulously verified to ensure your peace of mind.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
