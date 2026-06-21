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
      <section className="relative min-h-[80vh] flex items-center justify-center bg-transparent py-10">
        <div className="z-10 text-center w-full max-w-4xl px-4 md:px-8 py-8 md:py-12 bg-black/30 backdrop-blur-sm border-2 border-brand-gold shadow-[0_4px_30px_rgba(212,175,55,0.3)] rounded-3xl mx-4 md:mx-6 my-auto">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-brand-white tracking-tight mb-4 md:mb-6 drop-shadow-lg">
            Discover Your <span className="text-brand-gold">Dream</span> Estate
          </h1>
          <p className="text-xl text-brand-white/90 mb-10 font-medium drop-shadow-md">
            The premier AI-powered real estate platform in Pakistan. Discover elite properties, smart investments, and luxury living.
          </p>
          <form onSubmit={handleSearchSubmit} className="flex flex-col md:flex-row gap-4 max-w-3xl mx-auto z-10 relative">
            <input 
              type="text" 
              placeholder="Search by city, society, or keyword (e.g. Islamabad, DHA)..." 
              className="input-base flex-grow bg-[#121212]/80 backdrop-blur-md"
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
      <section className="py-20 bg-black/60 backdrop-blur-sm">
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
