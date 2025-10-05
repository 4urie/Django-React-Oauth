import { useState } from 'react';
import './Navbar.css';

const Navbar = ({ user, onAuthChange, currentPage, onPageChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8080/api/auth/logout/', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        localStorage.removeItem('user');
        localStorage.removeItem('authToken');
        onAuthChange(null);
        onPageChange('dashboard');
      }
    } catch (error) {
      console.error('Logout error:', error);
      // Force logout even if API call fails
      localStorage.removeItem('user');
      localStorage.removeItem('authToken');
      onAuthChange(null);
      onPageChange('dashboard');
    }
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
    { id: 'jokes', label: 'Jokes API', icon: '😂' },
    { id: 'caesar', label: 'Caesar Cipher', icon: '🔐' },
    { id: 'profile', label: 'Profile', icon: '👤', authRequired: true }
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <span className="brand-icon">🚀</span>
          <span className="brand-text">Django + React</span>
        </div>

        <div className={`navbar-menu ${isMenuOpen ? 'is-active' : ''}`}>
          <div className="navbar-nav">
            {menuItems.map(item => {
              if (item.authRequired && !user) return null;
              
              return (
                <button
                  key={item.id}
                  className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
                  onClick={() => {
                    onPageChange(item.id);
                    setIsMenuOpen(false);
                  }}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="navbar-auth">
            {user ? (
              <div className="user-menu">
                <div className="user-info">
                  <span className="user-greeting">👋 {user.username}</span>
                </div>
                <button className="logout-btn" onClick={handleLogout}>
                  <span>🚪</span> Logout
                </button>
              </div>
            ) : (
              <button
                className="login-btn"
                onClick={() => onPageChange('auth')}
              >
                <span>🔑</span> Login
              </button>
            )}
          </div>
        </div>

        <button
          className={`navbar-burger ${isMenuOpen ? 'is-active' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;