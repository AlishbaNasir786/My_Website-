import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useSearchParams } from 'react-router-dom';
import { MapPin, Bed, Bath, Square, Search, Filter } from 'lucide-react';
import API_BASE from '../api';

export default function PropertiesList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [properties, setProperties] = useState([]);
  
  // Search & filter states
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [propertyType, setPropertyType] = useState(searchParams.get('propertyType') || '');
  const [purpose, setPurpose] = useState(searchParams.get('purpose') || '');
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchFilteredProperties();
  }, [searchParams]);

  const fetchFilteredProperties = async () => {
    setLoading(true);
    try {
      const params = {};
      if (searchParams.get('search')) params.search = searchParams.get('search');
      if (searchParams.get('propertyType')) params.propertyType = searchParams.get('propertyType');
      if (searchParams.get('purpose')) params.purpose = searchParams.get('purpose');
      if (searchParams.get('minPrice')) params.minPrice = searchParams.get('minPrice');
      if (searchParams.get('maxPrice')) params.maxPrice = searchParams.get('maxPrice');

      const res = await axios.get(`${API_BASE}/api/v1/properties`, { params });
      setProperties(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = {};
    if (search) params.search = search;
    if (propertyType) params.propertyType = propertyType;
    if (purpose) params.purpose = purpose;
    if (minPrice) params.minPrice = minPrice;
    if (maxPrice) params.maxPrice = maxPrice;
    setSearchParams(params);
  };

  const clearFilters = () => {
    setSearch('');
    setPropertyType('');
    setPurpose('');
    setMinPrice('');
    setMaxPrice('');
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-4xl font-bold text-brand-gold mb-8 text-center tracking-wide uppercase">Discover Premium Properties</h2>
      
      {/* Search & Filter Panel */}
      <form onSubmit={handleSearchSubmit} className="glass-card p-6 rounded-2xl mb-12 relative z-10">
        <div className="flex items-center gap-2 mb-4 text-brand-gold border-b border-brand-gold/25 pb-2">
          <Filter size={18} />
          <span className="font-bold uppercase tracking-wider text-sm">Search Filters</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
          <div className="md:col-span-2">
              <input 
                type="text" 
                placeholder="Keyword (e.g. DHA, Bahria, Penthouse)" 
                className="input-base w-full"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
          </div>
          <div>
            <select 
              className="input-base w-full cursor-pointer"
              value={propertyType}
              onChange={e => setPropertyType(e.target.value)}
            >
              <option value="">All Types</option>
              <option value="HOUSE">House</option>
              <option value="APARTMENT">Apartment</option>
              <option value="PLOT">Plot</option>
              <option value="COMMERCIAL">Commercial</option>
            </select>
          </div>
          <div>
            <select 
              className="input-base w-full cursor-pointer"
              value={purpose}
              onChange={e => setPurpose(e.target.value)}
            >
              <option value="">All Purposes</option>
              <option value="SALE">For Sale</option>
              <option value="RENT">For Rent</option>
            </select>
          </div>
          <div className="flex gap-2">
              <input 
                type="number" 
                placeholder="Min Price" 
                className="input-base w-1/2"
              value={minPrice}
              onChange={e => setMinPrice(e.target.value)}
            />
              <input 
                type="number" 
                placeholder="Max Price" 
                className="input-base w-1/2"
              value={maxPrice}
              onChange={e => setMaxPrice(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex justify-end gap-4">
          <button 
            type="button" 
            onClick={clearFilters}
            className="btn-secondary"
          >
            Clear
          </button>
          <button 
            type="submit" 
            className="btn-primary flex items-center gap-2"
          >
            <Search size={16} /> Apply Filters
          </button>
        </div>
      </form>
      
      {/* Properties Grid */}
      {loading ? (
        <div className="text-center py-20 text-brand-gold">Loading Properties...</div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {properties.length === 0 ? (
            <div className="col-span-3 text-center text-brand-white/50 py-12">No properties matched your search.</div>
          ) : properties.map(p => (
            <div key={p.id} className="glass-card overflow-hidden flex flex-col justify-between group cursor-pointer">
              <div>
                <div className="h-48 bg-brand-black relative overflow-hidden">
                  {p.images && p.images.length > 0 ? (
                    <img 
                      src={p.images[0].imageData || `${API_BASE}${p.images[0].url}`}
                      alt={p.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80')] bg-cover bg-center group-hover:scale-110 transition-transform duration-500 opacity-50"></div>
                  )}
                  <div className="absolute top-4 left-4 bg-brand-gold text-brand-black text-xs font-bold px-3 py-1 rounded tracking-wider uppercase">
                    FOR {p.purpose}
                  </div>
                  <div className="absolute top-4 right-4 bg-brand-black/80 text-brand-gold text-xs font-semibold px-2.5 py-1 rounded">
                    {p.propertyType}
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-brand-gold font-bold text-2xl mb-2">Rs. {Number(p.price).toLocaleString('en-PK')}</div>
                  <h3 className="text-xl text-brand-white font-medium mb-3 truncate">{p.title}</h3>
                  <p className="text-brand-white/50 text-xs flex items-center gap-1 mb-4"><MapPin size={12} /> Elite Society, Pakistan</p>
                  
                  <div className="flex gap-4 text-brand-white/60 mb-2 text-sm border-t border-brand-gold/10 pt-4">
                    <span className="flex items-center gap-1"><Bed size={16} className="text-brand-gold" /> {p.bedrooms || 0} Beds</span>
                    <span className="flex items-center gap-1"><Bath size={16} className="text-brand-gold" /> {p.bathrooms || 0} Baths</span>
                    <span className="flex items-center gap-1"><Square size={16} className="text-brand-gold" /> {p.areaSize} {p.areaUnit}</span>
                  </div>
                </div>
              </div>
              <div className="p-6 pt-0">
                <Link to={`/properties/${p.id}`} className="btn-secondary block text-center w-full">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
