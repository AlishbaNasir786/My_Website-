import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import AiGenerator from '../../components/AiGenerator';
import AddPropertyForm from '../../components/AddPropertyForm';
import { LayoutDashboard, Building2, PhoneCall, Sparkles, LogOut, Check, ChevronRight } from 'lucide-react';
import API_BASE from '../../api';

export default function AdminDashboard() {
  const [properties, setProperties] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [activeTab, setActiveTab] = useState('properties'); // 'properties', 'inquiries', 'ai'
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (!token || (!user?.roles?.includes('ROLE_ADMIN') && !user?.roles?.includes('ROLE_AGENT'))) {
      navigate('/login');
      return;
    }

    setCurrentUser(user);
    fetchProperties();
    fetchInquiries();
  }, [navigate]);

  const fetchProperties = async () => {
    try {
      const response = await axios.get(`${API_BASE}/api/v1/properties`);
      setProperties(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchInquiries = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE}/api/v1/inquiries`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setInquiries(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteProperty = async (id) => {
    if (!window.confirm('Are you sure you want to delete this property?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_BASE}/api/v1/properties/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchProperties();
    } catch (err) {
      console.error(err);
      alert('Failed to delete property');
    }
  };

  const updateInquiryStatus = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${API_BASE}/api/v1/inquiries/${id}/status`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchInquiries();
    } catch (err) {
      console.error(err);
      alert('Failed to update status');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-8">
      {/* Sidebar Navigation */}
      <div className="w-full md:w-64 flex-shrink-0">
        <div className="bg-brand-dark rounded-xl border border-brand-gold/20 p-6 shadow-xl sticky top-24">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-brand-gold/15">
            <LayoutDashboard className="text-brand-gold" size={24} />
            <div>
              <h3 className="font-bold text-brand-white">Prestige Panel</h3>
              <p className="text-xs text-brand-white/50">{currentUser?.roles?.[0]?.replace('ROLE_', '')} View</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <button 
              onClick={() => setActiveTab('properties')}
              className={`w-full flex items-center justify-between p-3 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'properties' 
                  ? 'bg-brand-gold text-brand-black' 
                  : 'text-brand-white/80 hover:bg-brand-black hover:text-brand-gold'
              }`}
            >
              <span className="flex items-center gap-2.5"><Building2 size={18} /> Listings</span>
              <ChevronRight size={16} />
            </button>
            
            <button 
              onClick={() => setActiveTab('inquiries')}
              className={`w-full flex items-center justify-between p-3 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'inquiries' 
                  ? 'bg-brand-gold text-brand-black' 
                  : 'text-brand-white/80 hover:bg-brand-black hover:text-brand-gold'
              }`}
            >
              <span className="flex items-center gap-2.5"><PhoneCall size={18} /> Inquiries & Leads</span>
              <ChevronRight size={16} />
            </button>

            <button 
              onClick={() => setActiveTab('ai')}
              className={`w-full flex items-center justify-between p-3 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'ai' 
                  ? 'bg-brand-gold text-brand-black' 
                  : 'text-brand-white/80 hover:bg-brand-black hover:text-brand-gold'
              }`}
            >
              <span className="flex items-center gap-2.5"><Sparkles size={18} /> AI Copywriter</span>
              <ChevronRight size={16} />
            </button>

            <button 
              onClick={handleLogout}
              className="w-full flex items-center justify-between p-3 rounded-lg text-sm font-semibold text-red-400 hover:bg-red-500/10 transition-all mt-4"
            >
              <span className="flex items-center gap-2.5"><LogOut size={18} /> Sign Out</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow">
        {activeTab === 'properties' && (
          <div className="bg-brand-dark p-6 rounded-xl border border-brand-gold/20 shadow-xl shadow-brand-gold/5">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-brand-gold/15">
              <h2 className="text-2xl font-bold text-brand-gold uppercase tracking-wider">Property Listings</h2>
              <button 
                onClick={() => setShowAddForm(true)} 
                className="bg-brand-gold text-brand-black px-5 py-2.5 rounded font-bold hover:bg-brand-gold-light transition-colors text-sm uppercase tracking-wide"
              >
                + Add Listing
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-brand-gold/30 text-brand-white/60 text-xs uppercase tracking-wider">
                    <th className="py-3 px-4 font-semibold">ID</th>
                    <th className="py-3 px-4 font-semibold">Title</th>
                    <th className="py-3 px-4 font-semibold">Type</th>
                    <th className="py-3 px-4 font-semibold">Price (PKR)</th>
                    <th className="py-3 px-4 font-semibold">Status</th>
                    <th className="py-3 px-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-gold/10 text-sm">
                  {properties.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center py-8 text-brand-white/40">No listings found.</td>
                    </tr>
                  ) : properties.map(p => (
                    <tr key={p.id} className="hover:bg-brand-black/35 transition-colors">
                      <td className="py-4 px-4 text-brand-white/70">#{p.id}</td>
                      <td className="py-4 px-4 text-brand-white font-medium">{p.title}</td>
                      <td className="py-4 px-4 text-brand-white/65">{p.propertyType}</td>
                      <td className="py-4 px-4 text-brand-gold font-bold">Rs. {Number(p.price).toLocaleString('en-PK')}</td>
                      <td className="py-4 px-4">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          p.status === 'ACTIVE' 
                            ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                            : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                        }`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex gap-3">
                          <Link to={`/properties/${p.id}`} className="text-brand-gold hover:underline">View</Link>
                          <button onClick={() => deleteProperty(p.id)} className="text-red-400 hover:underline">Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'inquiries' && (
          <div className="bg-brand-dark p-6 rounded-xl border border-brand-gold/20 shadow-xl shadow-brand-gold/5">
            <h2 className="text-2xl font-bold text-brand-gold mb-6 pb-4 border-b border-brand-gold/15 uppercase tracking-wider">Leads & Inquiries</h2>
            
            <div className="space-y-6">
              {inquiries.length === 0 ? (
                <div className="text-center py-12 text-brand-white/40">No inquiries received yet.</div>
              ) : inquiries.map(inq => (
                <div key={inq.id} className="bg-brand-black border border-brand-gold/15 rounded-lg p-5 hover:border-brand-gold/45 transition-colors flex flex-col md:flex-row justify-between gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h4 className="text-base font-bold text-brand-white">{inq.customerName}</h4>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        inq.status === 'NEW' ? 'bg-blue-500/15 text-blue-400 border border-blue-500/20' :
                        inq.status === 'CONTACTED' ? 'bg-yellow-500/15 text-yellow-400 border border-yellow-500/20' :
                        'bg-green-500/15 text-green-400 border border-green-500/20'
                      }`}>
                        {inq.status}
                      </span>
                    </div>
                    
                    <p className="text-xs text-brand-white/60">
                      <strong>Phone:</strong> {inq.customerPhone} | <strong>Email:</strong> {inq.customerEmail || 'N/A'}
                    </p>
                    
                    <p className="text-xs text-brand-gold font-medium">
                      <strong>Property:</strong> #{inq.property.id} - {inq.property.title} (Rs. {Number(inq.property.price).toLocaleString('en-PK')})
                    </p>
                    
                    <div className="bg-brand-dark/40 p-3 rounded border border-brand-gold/5 text-sm text-brand-white/85 italic">
                      "{inq.message || 'No description message.'}"
                    </div>
                    
                    <p className="text-[10px] text-brand-white/40">Received: {new Date(inq.createdAt).toLocaleString()}</p>
                  </div>

                  <div className="flex md:flex-col justify-end items-end gap-3 flex-shrink-0">
                    {inq.status !== 'CONTACTED' && inq.status !== 'CLOSED' && (
                      <button 
                        onClick={() => updateInquiryStatus(inq.id, 'CONTACTED')}
                        className="bg-brand-black border border-brand-gold text-brand-gold text-xs font-semibold py-2 px-4 rounded hover:bg-brand-gold hover:text-brand-black transition-colors"
                      >
                        Mark Contacted
                      </button>
                    )}
                    {inq.status !== 'CLOSED' && (
                      <button 
                        onClick={() => updateInquiryStatus(inq.id, 'CLOSED')}
                        className="bg-green-500/15 border border-green-500 text-green-400 text-xs font-semibold py-2 px-4 rounded hover:bg-green-500 hover:text-black transition-colors flex items-center gap-1.5"
                      >
                        <Check size={12} /> Close Lead
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'ai' && (
          <AiGenerator />
        )}
      </div>

      {showAddForm && <AddPropertyForm onClose={() => setShowAddForm(false)} onPropertyAdded={fetchProperties} />}
    </div>
  );
}
