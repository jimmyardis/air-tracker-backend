import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';
import ChatWidget from './components/ChatWidget';
import AdminDashboard from './pages/AdminDashboard';
import LeadDetails from './pages/LeadDetails';

// Layout for the Patient-facing site
const PatientSite = () => (
  <div className="app-container">
    <header className="app-header">
      <h1>MedConcierge Demo Clinic</h1>
      <p>Premium Aesthetic Medicine & Dentistry</p>
      <Link to="/admin" style={{ fontSize: '12px', color: '#ccc', textDecoration: 'none', marginTop: '10px', display: 'block' }}>Staff Login</Link>
    </header>
    <main className="app-content">
      <section className="hero">
        <h2>Rediscover Your Confidence</h2>
        <p>Expert care personalized for your unique beauty.</p>
        <button className="cta-btn">Book Consultation</button>
      </section>
      <section className="services">
        <div className="service-card">
          <h3>Facial aesthetics</h3>
          <p>Rejuvenate your look with our non-surgical treatments.</p>
        </div>
        <div className="service-card">
          <h3>Body Contouring</h3>
          <p>Sculpt your dream silhouette with advanced technology.</p>
        </div>
        <div className="service-card">
          <h3>Smile Design</h3>
          <p>Perfect your smile with our cosmetic dentistry experts.</p>
        </div>
      </section>
    </main>
    <ChatWidget />
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PatientSite />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/leads/:id" element={<LeadDetails />} />
      </Routes>
    </Router>
  )
}

export default App;
