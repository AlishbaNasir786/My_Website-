import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_BASE from '../../api';

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', password: '', phone: '', role: 'CUSTOMER'
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post(`${API_BASE}/api/v1/auth/register`, formData);
      setSuccess('Account created! Redirecting to login...');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12">
      <div className="bg-brand-dark p-8 rounded-lg shadow-xl shadow-brand-gold/5 border border-brand-gold/20 w-full max-w-md">
        <h2 className="text-3xl font-bold text-brand-gold mb-2 text-center tracking-wide">CREATE ACCOUNT</h2>
        <p className="text-brand-white/50 text-center text-sm mb-6">Join Prestige Estate</p>

        {error && <div className="bg-red-500/10 text-red-400 border border-red-500/30 p-3 rounded mb-4 text-sm">{error}</div>}
        {success && <div className="bg-green-500/10 text-green-400 border border-green-500/30 p-3 rounded mb-4 text-sm">{success}</div>}

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-brand-white/80 mb-2 text-sm uppercase tracking-wider">First Name</label>
              <input type="text" className="w-full bg-brand-black border border-brand-gold/30 rounded p-3 text-brand-white focus:border-brand-gold outline-none transition-colors" required
                onChange={e => setFormData({...formData, firstName: e.target.value})} />
            </div>
            <div>
              <label className="block text-brand-white/80 mb-2 text-sm uppercase tracking-wider">Last Name</label>
              <input type="text" className="w-full bg-brand-black border border-brand-gold/30 rounded p-3 text-brand-white focus:border-brand-gold outline-none transition-colors" required
                onChange={e => setFormData({...formData, lastName: e.target.value})} />
            </div>
          </div>

          <div>
            <label className="block text-brand-white/80 mb-2 text-sm uppercase tracking-wider">Email</label>
            <input type="email" className="w-full bg-brand-black border border-brand-gold/30 rounded p-3 text-brand-white focus:border-brand-gold outline-none transition-colors" required
              onChange={e => setFormData({...formData, email: e.target.value})} />
          </div>

          <div>
            <label className="block text-brand-white/80 mb-2 text-sm uppercase tracking-wider">Phone</label>
            <input type="text" className="w-full bg-brand-black border border-brand-gold/30 rounded p-3 text-brand-white focus:border-brand-gold outline-none transition-colors"
              onChange={e => setFormData({...formData, phone: e.target.value})} />
          </div>

          <div>
            <label className="block text-brand-white/80 mb-2 text-sm uppercase tracking-wider">Password</label>
            <input type="password" className="w-full bg-brand-black border border-brand-gold/30 rounded p-3 text-brand-white focus:border-brand-gold outline-none transition-colors" required
              onChange={e => setFormData({...formData, password: e.target.value})} />
          </div>

          <div>
            <label className="block text-brand-white/80 mb-2 text-sm uppercase tracking-wider">Account Role</label>
            <select
              className="w-full bg-brand-black border border-brand-gold/30 rounded p-3 text-brand-white focus:border-brand-gold outline-none transition-colors appearance-none cursor-pointer"
              value={formData.role}
              onChange={e => setFormData({...formData, role: e.target.value})}
            >
              <option value="CUSTOMER">Customer (Browse Properties)</option>
              <option value="AGENT">Agent (Manage Inquiries)</option>
              <option value="ADMIN">Admin (Full Access)</option>
            </select>
          </div>

          <button type="submit" className="w-full bg-brand-gold text-brand-black font-bold py-3 rounded mt-2 hover:bg-brand-gold-light transition-colors tracking-wider">
            CREATE ACCOUNT
          </button>
        </form>
        <p className="mt-6 text-center text-brand-white/60">
          Already have an account? <Link to="/login" className="text-brand-gold hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
