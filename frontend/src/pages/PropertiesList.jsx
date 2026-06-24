import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useSearchParams } from 'react-router-dom';
import { MapPin, Bed, Bath, Square, Search, SlidersHorizontal } from 'lucide-react';
import API_BASE from '../api';

export default function PropertiesList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [propertyType, setPropertyType] = useState(searchParams.get('propertyType') || '');
  const [purpose, setPurpose] = useState(searchParams.get('purpose') || '');
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => { fetchFilteredProperties(); }, [searchParams]);

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
    } catch (err) { console.error(err); }
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
    setSearch(''); setPropertyType(''); setPurpose(''); setMinPrice(''); setMaxPrice('');
    setSearchParams({});
  };

  const filtered = properties.filter(p => {
    if (activeTab === 'sale') return p.purpose === 'SALE';
    if (activeTab === 'rent') return p.purpose === 'RENT';
    return true;
  });

  const selectClass = "input-base cursor-pointer";

  return (
    <div className="pt-20" style={{ background: '#ffffff', minHeight: '100vh' }}>

      {/* Page header */}
      <div className="px-[5%] py-14 text-center" style={{ background: '#f8f9fa' }}>
        <span className="section-label">All Listings</span>
        <h1 className="section-title">Discover Premium Properties</h1>
        <p className="text-brand-text-light max-w-xl mx-auto text-sm leading-relaxed">
          Handpicked properties that offer the best in luxury, comfort, and location across Pakistan.
        </p>
      </div>

      {/* Search & Filter */}
      <div className="px-[5%] py-6" style={{ background: '#f8f9fa', borderBottom: '1px solid #e5e7eb' }}>
        <form onSubmit={handleSearchSubmit} className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-3 text-primary">
            <SlidersHorizontal size={16} />
            <span className="font-semibold text-sm uppercase tracking-wide">Search Filters</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 mb-3">
            <div className="md:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-text-light" size={15} />
              <input type="text" placeholder="Keyword, city, society..." className="input-base pl-9 text-sm"
                value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <select className={selectClass + " text-sm"} value={propertyType} onChange={e => setPropertyType(e.target.value)}>
              <option value="">All Types</option>
              <option value="HOUSE">House</option>
              <option value="APARTMENT">Apartment</option>
              <option value="PLOT">Plot</option>
              <option value="COMMERCIAL">Commercial</option>
              <option value="VILLA">Villa</option>
            </select>
            <select className={selectClass + " text-sm"} value={purpose} onChange={e => setPurpose(e.target.value)}>
              <option value="">All Purposes</option>
              <option value="SALE">For Sale</option>
              <option value="RENT">For Rent</option>
            </select>
            <div className="flex gap-2">
              <input type="number" placeholder="Min ₨" className="input-base w-1/2 text-sm" value={minPrice} onChange={e => setMinPrice(e.target.value)} />
              <input type="number" placeholder="Max ₨" className="input-base w-1/2 text-sm" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <button type="button" onClick={clearFilters} className="px-5 py-2.5 rounded-full text-sm font-medium border border-gray-200 text-brand-text-light hover:border-primary hover:text-primary transition-colors">
              Clear
            </button>
            <button type="submit" className="btn-accent text-sm px-6 py-2.5 rounded-full">
              <Search size={15} /> Apply Filters
            </button>
          </div>
        </form>
      </div>

      {/* Filter tabs */}
      <div className="px-[5%] py-6 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto flex gap-3 flex-wrap">
          {[['all', 'All Properties'], ['sale', 'For Sale'], ['rent', 'For Rent']].map(([val, label]) => (
            <button key={val} onClick={() => setActiveTab(val)} className={`filter-tab ${activeTab === val ? 'active' : ''}`}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="px-[5%] py-12 bg-white">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="text-center py-24 text-brand-text-light text-lg">Loading Properties...</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24 text-brand-text-light">No properties matched your search.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {filtered.map(p => (
                <div key={p.id} className="lux-card overflow-hidden flex flex-col group cursor-pointer">
                  {/* Image */}
                  <div className="h-56 relative overflow-hidden property-img-wrap">
                    {p.images && p.images.length > 0 ? (
                      <img src={p.images[0].imageData || `${API_BASE}${p.images[0].url}`} alt={p.title}
                        className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80')" }} />
                    )}
                    {/* Badges */}
                    <span className="absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full uppercase"
                      style={{ background: p.purpose === 'SALE' ? '#e94560' : '#c9a96e', color: p.purpose === 'SALE' ? '#fff' : '#1a1a2e' }}>
                      {p.purpose === 'SALE' ? 'For Sale' : 'For Rent'}
                    </span>
                    <span className="absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full"
                      style={{ background: 'rgba(26,26,46,0.85)', color: '#fff' }}>
                      {p.propertyType}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="p-5 flex-grow flex flex-col">
                    <div className="font-display font-bold text-xl mb-1" style={{ color: '#e94560' }}>
                      Rs. {Number(p.price).toLocaleString('en-PK')}
                    </div>
                    <h3 className="font-semibold text-primary text-base mb-2 line-clamp-2 leading-snug">{p.title}</h3>
                    <p className="flex items-center gap-1.5 text-brand-text-light text-xs mb-4">
                      <MapPin size={12} /> {p.location || 'Pakistan'}
                    </p>
                    <div className="flex gap-5 pt-3 border-t border-gray-100 mt-auto text-xs text-brand-text-light">
                      <span className="flex items-center gap-1.5"><Bed size={14} style={{ color: '#c9a96e' }} /> {p.bedrooms || 0} Beds</span>
                      <span className="flex items-center gap-1.5"><Bath size={14} style={{ color: '#c9a96e' }} /> {p.bathrooms || 0} Baths</span>
                      <span className="flex items-center gap-1.5"><Square size={14} style={{ color: '#c9a96e' }} /> {p.areaSize} {p.areaUnit}</span>
                    </div>
                  </div>

                  <div className="px-5 pb-5">
                    <Link to={`/properties/${p.id}`} className="btn-primary w-full text-sm py-2.5 rounded-xl text-center block">
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
