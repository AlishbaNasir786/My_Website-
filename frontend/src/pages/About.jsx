import { MapPin, Phone, Mail } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-5xl font-bold text-brand-gold mb-12 text-center tracking-widest uppercase">About Us</h2>
      
      {/* Founder Section */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
        <div className="order-2 md:order-1 bg-black/30 backdrop-blur-sm border-2 border-brand-gold shadow-[0_4px_30px_rgba(212,175,55,0.3)] rounded-3xl p-6 md:p-8">
          <h3 className="text-3xl font-bold text-brand-gold mb-6 font-display">Meet Malik Arshad</h3>
          <p className="text-brand-white/80 text-lg mb-6 leading-relaxed">
            As the visionary founder of Malik Real Estate, Malik Arshad brings decades of unmatched expertise, integrity, and dedication to the real estate market of Pakistan.
          </p>
          <p className="text-brand-white/80 text-lg mb-8 leading-relaxed">
            "Our mission is to build trust through transparency, providing our clients with the finest properties and the most lucrative investment opportunities in the country."
          </p>
          <div className="glass-card p-6 inline-block rounded-xl border border-brand-gold/50">
            <h4 className="text-xl font-bold text-brand-gold">Malik Arshad</h4>
            <p className="text-brand-white/60">CEO & Founder</p>
          </div>
        </div>
        <div className="glass-card p-2 rounded-2xl order-1 md:order-2">
          {/* Using the image copy 2.png that was just uploaded to the public folder */}
          <img 
            src="/image copy 2.png" 
            alt="Malik Arshad" 
            onError={(e) => {
              e.target.onerror = null; 
              e.target.src="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80"
            }}
            className="w-full h-[500px] object-cover object-top rounded-xl border-2 border-brand-gold"
          />
        </div>
      </div>

      {/* Office Section */}
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="glass-card p-2 rounded-2xl">
          <img 
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80" 
            alt="Malik Arshad Real Estate Office" 
            className="w-full h-[400px] object-cover rounded-xl border-2 border-brand-gold"
          />
        </div>
        <div className="bg-black/30 backdrop-blur-sm border-2 border-brand-gold shadow-[0_4px_30px_rgba(212,175,55,0.3)] rounded-3xl p-6 md:p-8">
          <h3 className="text-3xl font-bold text-brand-gold mb-6 font-display">Our Professional Office</h3>
          <p className="text-brand-white/80 text-lg mb-6 leading-relaxed">
            Welcome to the heart of Malik Real Estate. Located in the prestigious <strong className="text-white">DHA Phase 5, Islamabad</strong>, our state-of-the-art office is designed to provide you with the most comfortable and premium property consultation experience in the region.
          </p>
          <div className="space-y-4 text-brand-white/70">
            <div className="flex items-center gap-4">
              <MapPin className="text-brand-gold" size={24} />
              <span className="text-lg">DHA Phase 5, Islamabad, Pakistan</span>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="text-brand-gold" size={24} />
              <span className="text-lg">+92 316 7576055</span>
            </div>
            <div className="flex items-center gap-4">
              <Mail className="text-brand-gold" size={24} />
              <span className="text-lg">contact@malikrealestate.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
