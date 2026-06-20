import { useState } from 'react';
import axios from 'axios';
import { Sparkles, Loader2, Copy, CheckCircle } from 'lucide-react';
import API_BASE from '../api';

export default function AiGenerator() {
  const [propertyDetails, setPropertyDetails] = useState({ title: '', location: '', price: '', type: 'House' });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState('');

  const generateContent = async () => {
    setLoading(true);
    setResult(null);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_BASE}/api/v1/ai/generate-description`, propertyDetails, {
        headers: { Authorization: `Bearer ${token}` }
      });
      let parsed;
      try {
        parsed = JSON.parse(response.data.ai_content);
      } catch(e) {
        parsed = { raw: response.data.ai_content };
      }
      setResult(parsed);
    } catch (err) {
      console.error(err);
      setResult({ error: 'Failed to generate content. Please try again.' });
    }
    setLoading(false);
  };

  const copyText = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(''), 2000);
  };

  const inputClass = 'w-full bg-brand-black border border-brand-gold/30 rounded-lg p-3 text-brand-white focus:outline-none focus:border-brand-gold transition-colors text-sm';

  return (
    <div className="bg-brand-dark p-6 rounded-xl border border-brand-gold/20 shadow-xl shadow-brand-gold/5 mt-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-brand-gold/10 rounded-lg">
          <Sparkles className="text-brand-gold" size={22} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-brand-white">AI Property Content Generator</h3>
          <p className="text-brand-white/50 text-xs mt-0.5">Generate professional descriptions in English & Urdu</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Input Panel */}
        <div className="space-y-3">
          <div>
            <label className="block text-brand-white/60 text-xs uppercase tracking-wider mb-1.5">Property Title *</label>
            <input type="text" placeholder="e.g. 10 Marla House DHA Phase 6" className={inputClass}
              onChange={e => setPropertyDetails({...propertyDetails, title: e.target.value})} />
          </div>
          <div>
            <label className="block text-brand-white/60 text-xs uppercase tracking-wider mb-1.5">Location</label>
            <input type="text" placeholder="e.g. DHA Phase 6, Lahore" className={inputClass}
              onChange={e => setPropertyDetails({...propertyDetails, location: e.target.value})} />
          </div>
          <div>
            <label className="block text-brand-white/60 text-xs uppercase tracking-wider mb-1.5">Price (PKR)</label>
            <input type="text" placeholder="e.g. 35000000" className={inputClass}
              onChange={e => setPropertyDetails({...propertyDetails, price: e.target.value})} />
          </div>
          <div>
            <label className="block text-brand-white/60 text-xs uppercase tracking-wider mb-1.5">Type</label>
            <select className={inputClass} onChange={e => setPropertyDetails({...propertyDetails, type: e.target.value})}>
              <option>House</option><option>Plot</option><option>Apartment</option><option>Villa</option><option>Commercial</option>
            </select>
          </div>
          <button onClick={generateContent} disabled={loading || !propertyDetails.title}
            className="w-full bg-brand-gold text-brand-black font-bold py-3 rounded-lg hover:bg-brand-gold-light transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed uppercase tracking-wider">
            {loading ? <><Loader2 className="animate-spin" size={18} /> Generating...</> : <><Sparkles size={18} /> Generate AI Content</>}
          </button>
        </div>

        {/* Result Panel */}
        <div className="bg-brand-black rounded-lg border border-brand-gold/20 overflow-hidden">
          {!result && !loading && (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center text-brand-white/30">
              <Sparkles size={40} className="mb-3 text-brand-gold/30" />
              <p className="text-sm">Enter property details and click Generate</p>
            </div>
          )}
          {loading && (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <Loader2 className="animate-spin text-brand-gold mb-3" size={36} />
              <p className="text-brand-white/50 text-sm">AI is writing your content...</p>
            </div>
          )}
          {result && !loading && (
            <div className="p-4 space-y-4 overflow-y-auto max-h-80 text-sm">
              {result.error ? (
                <p className="text-red-400">{result.error}</p>
              ) : result.raw ? (
                <p className="text-brand-white/80 whitespace-pre-wrap">{result.raw}</p>
              ) : (
                <>
                  {[
                    { key: 'en', label: '🇬🇧 English Description', value: result.englishDescription },
                    { key: 'ur', label: '🇵🇰 Urdu', value: result.urduDescription },
                    { key: 'ro', label: '📝 Roman Urdu', value: result.romanUrduDescription },
                    { key: 'seo', label: '🔍 SEO Keywords', value: result.seoKeywords },
                    { key: 'sm', label: '📱 Social Media Caption', value: result.socialMediaCaption },
                  ].map(({ key, label, value }) => value && (
                    <div key={key} className="border-b border-brand-gold/10 pb-3 last:border-0">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-brand-gold text-xs font-bold uppercase tracking-wider">{label}</span>
                        <button onClick={() => copyText(value, key)} className="text-brand-white/40 hover:text-brand-gold transition-colors">
                          {copied === key ? <CheckCircle size={14} className="text-green-400" /> : <Copy size={14} />}
                        </button>
                      </div>
                      <p className="text-brand-white/80 text-sm leading-relaxed">{value}</p>
                    </div>
                  ))}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
