import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import AdminDashboard from './pages/admin/AdminDashboard';
import PropertiesList from './pages/PropertiesList';
import PropertyDetails from './pages/PropertyDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="properties" element={<PropertiesList />} />
          <Route path="properties/:id" element={<PropertyDetails />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
