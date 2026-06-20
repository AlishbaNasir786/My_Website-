import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_BASE from '../../api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE}/api/v1/auth/login`, { email, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
      navigate('/');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="bg-brand-dark p-8 rounded-lg shadow-xl shadow-brand-gold/5 border border-brand-gold/20 w-full max-w-md">
        <h2 className="text-3xl font-bold text-brand-gold mb-6 text-center tracking-wide">SIGN IN</h2>
        {error && <div className="bg-red-500/10 text-red-500 border border-red-500 p-3 rounded mb-4 text-sm">{error}</div>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-brand-white/80 mb-2 text-sm uppercase tracking-wider">Email</label>
            <input 
              type="email" 
              className="w-full bg-brand-black border border-brand-gold/30 rounded p-3 text-brand-white focus:outline-none focus:border-brand-gold"
              value={email} onChange={e => setEmail(e.target.value)} required 
            />
          </div>
          <div>
            <label className="block text-brand-white/80 mb-2 text-sm uppercase tracking-wider">Password</label>
            <input 
              type="password" 
              className="w-full bg-brand-black border border-brand-gold/30 rounded p-3 text-brand-white focus:outline-none focus:border-brand-gold"
              value={password} onChange={e => setPassword(e.target.value)} required 
            />
          </div>
          <button type="submit" className="w-full bg-brand-gold text-brand-black font-bold py-3 rounded mt-4 hover:bg-brand-gold-light transition-colors">
            LOGIN TO DASHBOARD
          </button>
        </form>
        <p className="mt-6 text-center text-brand-white/60">
          Don't have an account? <Link to="/register" className="text-brand-gold hover:underline">Register here</Link>
        </p>
      </div>
    </div>
  );
}
