import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Bed, Bath, Square, MapPin, Phone, Send, CheckCircle2 } from 'lucide-react';
import API_BASE from '../api';

export default function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [activeImage, setActiveImage] = useState('');
  
  // Inquiry form states
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`${API_BASE}/api/v1/properties/${id}`)
      .then(res => {
        setProperty(res.data);
        if (res.data.images && res.data.images.length > 0) {
          // Use imageData (Base64) if available, fallback to URL
          setActiveImage(res.data.images[0].imageData || res.data.images[0].url);
        }
      })
      .catch(err => console.error(err));
  }, [id]);

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess(false);

    try {
      await axios.post(`${API_BASE}/api/v1/inquiries`, {
        propertyId: id,
        customerName: name,
        customerPhone: phone,
        customerEmail: email,
        message: message || `Hi, I am interested in: ${property.title}`
      });
      setSuccess(true);
      setName('');
      setPhone('');
      setEmail('');
      setMessage('');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to submit inquiry. Please try again.');
    }
    setSubmitting(false);
  };

  if (!property) return <div className="text-center py-20 text-brand-gold">Loading...</div>;

  const whatsappUrl = `https://wa.me/923167576055?text=${encodeURIComponent(
    `Hi, I am interested in your property: "${property.title}" (ID: ${property.id}, Price: Rs. ${property.price}) listed on Malik Real Estate.`
  )}`;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid md:grid-cols-3 gap-12">
        {/* Main Details and Media */}
        <div className="md:col-span-2">
          {/* Gallery */}
          <div className="mb-8">
            <div className="h-[450px] rounded-xl overflow-hidden bg-brand-black border border-brand-gold/15 mb-4 relative">
              {activeImage ? (
                <img 
                  src={activeImage.startsWith('data:') ? activeImage : `${API_BASE}${activeImage}`} 
                  alt={property.title} 
                  className="w-full h-full object-cover transition-opacity duration-300"
                />
              ) : (
                <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-40"></div>
              )}
            </div>
            
            {/* Thumbnails */}
            {property.images && property.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {property.images.map((img) => (
                  <button 
                    key={img.id} 
                    onClick={() => setActiveImage(img.imageData || img.url)}
                    className={`w-24 h-16 rounded overflow-hidden border-2 transition-all flex-shrink-0 ${
                      activeImage === (img.imageData || img.url) ? 'border-brand-gold' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img.imageData || `${API_BASE}${img.url}`} alt="thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 border-b border-brand-gold/15 pb-6">
            <div>
              <h1 className="text-4xl font-bold text-brand-white mb-2">{property.title}</h1>
              <p className="text-brand-gold/80 flex items-center gap-2 text-sm"><MapPin size={16} /> Elite Locality, Pakistan</p>
            </div>
            <div className="text-3xl font-bold text-brand-gold bg-brand-dark px-6 py-3 rounded-lg border border-brand-gold/20">
              Rs. {Number(property.price).toLocaleString('en-PK')}
            </div>
          </div>

          <div className="flex gap-8 py-6 border-b border-brand-gold/20 mb-8 text-brand-white/80">
            <div className="flex items-center gap-2"><Bed className="text-brand-gold" /> <span className="font-bold text-xl">{property.bedrooms || 0}</span> Beds</div>
            <div className="flex items-center gap-2"><Bath className="text-brand-gold" /> <span className="font-bold text-xl">{property.bathrooms || 0}</span> Baths</div>
            <div className="flex items-center gap-2"><Square className="text-brand-gold" /> <span className="font-bold text-xl">{property.areaSize}</span> {property.areaUnit}</div>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-bold text-brand-white mb-4 uppercase tracking-wider text-brand-gold">Description</h3>
            <p className="text-brand-white/70 leading-relaxed whitespace-pre-wrap">
              {property.descriptionEn || "A stunning luxury property offering world-class amenities and breathtaking views. Perfect for your family."}
            </p>
          </div>
        </div>

        {/* Sidebar contact info */}
        <div>
          <div className="bg-brand-dark p-6 rounded-xl border border-brand-gold/20 sticky top-24 shadow-lg shadow-brand-gold/5">
            <h3 className="text-xl font-bold text-brand-white mb-6 border-b border-brand-gold/20 pb-4 uppercase tracking-wider">Contact Agent</h3>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-brand-black flex items-center justify-center text-brand-gold font-bold text-lg border border-brand-gold/30">
                {property.agent?.firstName?.substring(0, 1) || 'A'}
              </div>
              <div>
                <h4 className="font-bold text-brand-white">{property.agent ? `${property.agent.firstName} ${property.agent.lastName}` : 'Malik Agent'}</h4>
                <p className="text-brand-white/50 text-xs">{property.agent?.role || 'Real Estate Consultant'}</p>
              </div>
            </div>
            
            {success ? (
              <div className="bg-green-500/15 border border-green-500/30 p-4 rounded-lg text-center mb-6">
                <CheckCircle2 className="text-green-500 mx-auto mb-2" size={32} />
                <h5 className="font-bold text-brand-white text-sm mb-1">Inquiry Submitted!</h5>
                <p className="text-xs text-brand-white/70">The agent will contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-4 mb-6">
                {error && <div className="bg-red-500/10 text-red-400 border border-red-500/30 p-3 rounded text-xs">{error}</div>}
                
                <div>
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    required
                    className="w-full bg-brand-black border border-brand-gold/30 rounded p-3 text-brand-white focus:outline-none focus:border-brand-gold text-sm"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </div>
                
                <div>
                  <input 
                    type="text" 
                    placeholder="Phone Number" 
                    required
                    className="w-full bg-brand-black border border-brand-gold/30 rounded p-3 text-brand-white focus:outline-none focus:border-brand-gold text-sm"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                  />
                </div>
                
                <div>
                  <input 
                    type="email" 
                    placeholder="Email Address" 
                    className="w-full bg-brand-black border border-brand-gold/30 rounded p-3 text-brand-white focus:outline-none focus:border-brand-gold text-sm"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
                
                <div>
                  <textarea 
                    placeholder="I would like to inquire about this property..." 
                    rows="3"
                    className="w-full bg-brand-black border border-brand-gold/30 rounded p-3 text-brand-white focus:outline-none focus:border-brand-gold text-sm"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  disabled={submitting}
                  className="w-full bg-brand-gold text-brand-black font-bold py-3 rounded hover:bg-brand-gold-light transition-colors flex items-center justify-center gap-2 text-sm uppercase tracking-wider"
                >
                  <Send size={16} /> {submitting ? 'Submitting...' : 'Send Message'}
                </button>
              </form>
            )}

            <a 
              href={whatsappUrl}
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-full border border-green-500 text-green-500 font-bold py-3 rounded hover:bg-green-500 hover:text-black transition-colors flex items-center justify-center gap-2 text-sm uppercase tracking-wider"
            >
              WhatsApp Agent
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
