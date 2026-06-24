import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ChatbotWidget from '../ChatbotWidget';

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden w-full" style={{ background: '#f8f9fa' }}>
      <Navbar />
      <main className="flex-grow w-full overflow-x-hidden">
        <Outlet />
      </main>
      <Footer />
      <ChatbotWidget />
    </div>
  );
}
