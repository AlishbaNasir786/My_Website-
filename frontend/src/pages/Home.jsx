import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Shield, Smartphone, Headphones, BarChart2, Star, ChevronDown } from 'lucide-react';

export default function Home() {
  const [searchVal, setSearchVal] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchVal.trim()) navigate(`/properties?search=${encodeURIComponent(searchVal)}`);
    else navigate('/properties');
  };

  const features = [
    { icon: Shield, title: 'Verified Listings', desc: 'Every property is thoroughly verified by our team. No fake listings, no surprises — just genuine homes you can trust.' },
    { icon: Smartphone, title: 'Sync Across Devices', desc: 'Your saved properties and searches sync seamlessly between your phone, tablet, and laptop in real-time.' },
    { icon: Headphones, title: '24/7 Support', desc: 'Our dedicated support team is available around the clock to assist you with any questions or concerns.' },
    { icon: BarChart2, title: 'Market Insights', desc: 'Get real-time market data, price trends, and neighborhood analytics to make informed decisions.' },
  ];

  const cities = [
    { name: 'Lahore', count: '320+', img: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=600&q=80' },
    { name: 'Islamabad', count: '280+', img: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=600&q=80' },
    { name: 'Karachi', count: '450+', img: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&q=80' },
    { name: 'Rawalpindi', count: '190+', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80' },
  ];

  return (
    <div className="w-full overflow-x-hidden">

      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0"
          style={{ background: "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80') center/cover no-repeat" }} />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, rgba(26,26,46,0.88) 0%, rgba(22,33,62,0.72) 50%, rgba(26,26,46,0.92) 100%)' }} />

        {/* Content */}
        <div className="relative z-10 text-center text-white px-5 max-w-3xl mx-auto animate-fadeInUp pt-20">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-6 px-5 py-2 rounded-full text-sm font-medium"
            style={{ background: 'rgba(201,169,110,0.2)', border: '1px solid rgba(201,169,110,0.4)', color: '#e8d5a3', backdropFilter: 'blur(10px)' }}>
            <Star size={14} fill="currentColor" /> Trusted by 1,000+ Homeowners in Pakistan
          </div>

          {/* Title */}
          <h1 className="font-display font-bold mb-5 leading-tight"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 4.2rem)', textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}>
            Find Your <span style={{ color: '#c9a96e' }}>Dream Home</span> Today
          </h1>

          <p className="text-white/80 mb-8 max-w-xl mx-auto leading-relaxed text-base md:text-lg">
            Discover premium properties in Pakistan's most desirable locations. From luxury villas to modern apartments.
          </p>

          {/* Search box */}
          <form onSubmit={handleSearchSubmit}
            className="flex flex-col sm:flex-row gap-2 max-w-lg mx-auto p-2 rounded-2xl"
            style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.2)' }}>
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={16} />
              <input
                type="text"
                placeholder="Search city, society or keyword..."
                className="input-ghost w-full pl-10 text-sm"
                value={searchVal}
                onChange={e => setSearchVal(e.target.value)}
              />
            </div>
            <button type="submit" className="btn-accent text-sm px-6 py-3 rounded-xl whitespace-nowrap">
              <Search size={15} /> Search
            </button>
          </form>

          {/* Stats */}
          <div className="flex justify-center gap-10 mt-10 pt-8"
            style={{ borderTop: '1px solid rgba(255,255,255,0.15)' }}>
            {[['500+', 'Properties Listed'], ['1,000+', 'Happy Clients'], ['10+', 'Cities Covered']].map(([num, label]) => (
              <div key={label} className="text-center">
                <div className="font-display font-bold text-2xl md:text-3xl" style={{ color: '#c9a96e' }}>{num}</div>
                <div className="text-xs text-white/60 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 text-white/50 animate-bounce-slow cursor-pointer"
          onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}>
          <ChevronDown size={28} />
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section id="features" className="py-24 px-[5%]" style={{ background: '#f8f9fa' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="section-label">Why Choose Us</span>
            <h2 className="section-title">The Malik Real Estate Advantage</h2>
            <p className="text-brand-text-light max-w-xl mx-auto text-base leading-relaxed">
              We combine cutting-edge AI technology with personalized service to deliver an unmatched real estate experience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title}
                className="lux-card p-8 text-center relative overflow-hidden feature-card-top">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
                  style={{ background: 'linear-gradient(135deg, #1a1a2e, #16213e)' }}>
                  <Icon size={26} style={{ color: '#c9a96e' }} />
                </div>
                <h3 className="font-bold text-primary text-base mb-3">{title}</h3>
                <p className="text-brand-text-light text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== EXPLORE CITIES ===== */}
      <section className="py-24 px-[5%] bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="section-label">Explore Cities</span>
            <h2 className="section-title">Popular Locations in Pakistan</h2>
            <p className="text-brand-text-light max-w-xl mx-auto text-base leading-relaxed">
              Find your perfect home in these vibrant and sought-after cities.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {cities.map(({ name, count, img }) => (
              <div key={name}
                className="relative h-72 rounded-2xl overflow-hidden cursor-pointer group"
                onClick={() => navigate(`/properties?search=${name}`)}>
                <img src={img} alt={name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 flex flex-col justify-end p-6 transition-all duration-300"
                  style={{ background: 'linear-gradient(to top, rgba(26,26,46,0.9) 0%, rgba(26,26,46,0.3) 50%, transparent 100%)' }}>
                  <div className="font-display font-bold text-xl text-white mb-1">{name}</div>
                  <div className="text-sm font-medium" style={{ color: '#e8d5a3' }}>{count} Properties</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="py-20 px-[5%] relative overflow-hidden text-center"
        style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' }}>
        {/* Decorative circle */}
        <div className="absolute top-[-50%] right-[-10%] w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(201,169,110,0.1) 0%, transparent 70%)' }} />
        <div className="relative z-10 max-w-lg mx-auto">
          <h2 className="font-display font-bold text-white mb-4" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}>
            Ready to Find Your Dream Home?
          </h2>
          <p className="text-white/70 mb-8 leading-relaxed">
            Browse hundreds of verified properties across Pakistan's top cities. Start your journey today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => navigate('/properties')} className="btn-accent px-8 py-3">
              Browse Properties
            </button>
            <button onClick={() => navigate('/about')} className="btn-outline px-8 py-3">
              Learn More
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
