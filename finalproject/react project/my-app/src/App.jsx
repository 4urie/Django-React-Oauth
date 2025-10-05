import { useState, useEffect } from 'react'
import './App.css'
import './components/DarkTheme.css'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import Profile from './components/Profile'
import ParticleBackground from './components/ParticleBackground'
import JokeSection from './components/JokeSection'
import JokeQRSection from './components/JokeQRSection'
import CaesarSection from './components/CaesarSection'
import CaesarQRSection from './components/CaesarQRSection'
import AuthSection from './components/AuthSection'
import OAuthCallback from './components/OAuthCallback'

function App() {
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('dashboard');

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('user');
    const token = localStorage.getItem('authToken');
    
    if (savedUser && token) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        // Invalid saved user data, clear it
        localStorage.removeItem('user');
        localStorage.removeItem('authToken');
      }
    }
  }, []);

  const handleAuthChange = (userData) => {
    setUser(userData);
    if (userData) {
      setCurrentPage('dashboard'); // Redirect to dashboard after login
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard user={user} />;
      case 'jokes':
        return (
          <div className="api-sections">
            <JokeSection />
            <JokeQRSection />
          </div>
        );
      case 'caesar':
        return (
          <div className="api-sections">
            <CaesarSection />
            <CaesarQRSection />
          </div>
        );
      case 'profile':
        return <Profile user={user} onAuthChange={handleAuthChange} />;
      case 'auth':
        return (
          <div className="auth-page">
            <AuthSection user={user} onAuthChange={handleAuthChange} />
          </div>
        );
      default:
        return <Dashboard user={user} />;
    }
  };

  return (
    <div className="app">
      <ParticleBackground />
      
      {/* OAuth Callback Handler */}
      <OAuthCallback onAuthSuccess={handleAuthChange} />
      
      <Navbar 
        user={user} 
        onAuthChange={handleAuthChange}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      
      <main className="app-main">
        {renderCurrentPage()}
      </main>
      
      <footer className="app-footer">
        <p>Built with Django REST Framework + React + Vite + OAuth Authentication</p>
      </footer>
    </div>
  )
}

export default App
