import { useState } from 'react';
import axios from 'axios';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';
import API_BASE from '../api';

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ sender: 'ai', text: 'Hello! I am your AI Real Estate Consultant. How can I help you find your dream property in Pakistan today?' }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInput('');
    setLoading(true);

    try {
      const res = await axios.post(`${API_BASE}/api/v1/ai/chat`, { message: userMsg });
      let text = res.data.response;
      try {
         const parsed = JSON.parse(text);
         if(parsed.error) text = parsed.error;
      } catch(e) {}
      
      setMessages(prev => [...prev, { sender: 'ai', text: text }]);
    } catch (err) {
      setMessages(prev => [...prev, { sender: 'ai', text: 'Sorry, I am currently offline. Please try again later.' }]);
    }
    setLoading(false);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 bg-brand-gold text-brand-black p-4 rounded-full shadow-lg hover:bg-brand-gold-light transition-transform ${isOpen ? 'scale-0' : 'scale-100'} z-50`}
      >
        <MessageSquare size={24} />
      </button>

      <div className={`fixed bottom-6 right-6 w-80 sm:w-96 bg-brand-dark border border-brand-gold/30 rounded-xl shadow-2xl flex flex-col transition-all origin-bottom-right z-50 ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`} style={{ height: '500px' }}>
        <div className="bg-brand-black p-4 rounded-t-xl border-b border-brand-gold/20 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sparkles className="text-brand-gold" size={20} />
            <h3 className="font-bold text-brand-gold">AI Consultant</h3>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-brand-white/60 hover:text-brand-white">
            <X size={20} />
          </button>
        </div>

        <div className="flex-grow p-4 overflow-y-auto flex flex-col gap-3">
          {messages.map((msg, i) => (
            <div key={i} className={`max-w-[85%] p-3 rounded-lg text-sm ${msg.sender === 'user' ? 'bg-brand-gold text-brand-black self-end rounded-br-none' : 'bg-brand-black border border-brand-gold/20 text-brand-white self-start rounded-bl-none'}`}>
              {msg.text}
            </div>
          ))}
          {loading && (
            <div className="bg-brand-black border border-brand-gold/20 text-brand-white/50 self-start rounded-lg rounded-bl-none p-3 text-sm animate-pulse">
              Typing...
            </div>
          )}
        </div>

        <div className="p-3 bg-brand-black border-t border-brand-gold/20 rounded-b-xl flex gap-2">
          <input 
            type="text" 
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && sendMessage()}
            placeholder="Ask about properties..." 
            className="flex-grow bg-transparent border-none focus:outline-none text-brand-white text-sm"
          />
          <button onClick={sendMessage} disabled={loading} className="text-brand-gold hover:text-brand-gold-light disabled:opacity-50">
            <Send size={20} />
          </button>
        </div>
      </div>
    </>
  );
}
