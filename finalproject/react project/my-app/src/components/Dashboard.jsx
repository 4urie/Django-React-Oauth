import { useState, useEffect } from 'react';
import './Dashboard.css';

const Dashboard = ({ user }) => {
  const [stats, setStats] = useState({
    totalJokes: 0,
    totalCiphers: 0,
    qrCodes: 0
  });

  const features = [
    {
      id: 'jokes',
      title: 'Random Jokes API',
      description: 'Get random programming jokes from our API',
      icon: '😂',
      color: '#FF6B6B',
      stats: 'Unlimited jokes available'
    },
    {
      id: 'jokes-qr',
      title: 'Joke QR Codes',
      description: 'Generate QR codes containing random jokes',
      icon: '📱',
      color: '#4ECDC4',
      stats: 'QR codes with embedded jokes'
    },
    {
      id: 'caesar',
      title: 'Caesar Cipher',
      description: 'Encrypt and decrypt text using Caesar cipher',
      icon: '🔐',
      color: '#45B7D1',
      stats: 'Classical encryption method'
    },
    {
      id: 'caesar-qr',
      title: 'Cipher QR Codes',
      description: 'Generate QR codes with encrypted messages',
      icon: '🔏',
      color: '#96CEB4',
      stats: 'Secure QR code generation'
    }
  ];

  const quickActions = [
    {
      title: 'Get Random Joke',
      description: 'Fetch a programming joke instantly',
      icon: '🎲',
      action: 'jokes'
    },
    {
      title: 'Encrypt Message',
      description: 'Use Caesar cipher to encrypt text',
      icon: '🔒',
      action: 'caesar'
    },
    {
      title: 'Generate QR Code',
      description: 'Create QR codes with custom content',
      icon: '📋',
      action: 'jokes-qr'
    }
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="welcome-section">
          <h1>
            {user ? `Welcome back, ${user.username}! 👋` : 'Welcome to Django + React API! 🚀'}
          </h1>
          <p>
            {user 
              ? 'Explore our powerful API features and tools below.' 
              : 'Sign in to unlock personalized features and save your preferences.'
            }
          </p>
        </div>
        
        {!user && (
          <div className="auth-prompt">
            <div className="auth-card">
              <h3>🔑 Ready to get started?</h3>
              <p>Sign in with your favorite social provider to access all features!</p>
              <div className="auth-benefits">
                <span>✨ Save preferences</span>
                <span>📊 Track usage</span>
                <span>🎨 Personalize experience</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="features-grid">
        <h2>🎯 Available Features</h2>
        <div className="features-container">
          {features.map(feature => (
            <div key={feature.id} className="feature-card" style={{'--accent-color': feature.color}}>
              <div className="feature-header">
                <span className="feature-icon">{feature.icon}</span>
                <h3>{feature.title}</h3>
              </div>
              <p className="feature-description">{feature.description}</p>
              <div className="feature-stats">{feature.stats}</div>
              <div className="feature-status">
                <span className="status-indicator active"></span>
                <span>Available</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {user && (
        <div className="quick-actions">
          <h2>⚡ Quick Actions</h2>
          <div className="actions-container">
            {quickActions.map((action, index) => (
              <div key={index} className="action-card">
                <div className="action-icon">{action.icon}</div>
                <div className="action-content">
                  <h4>{action.title}</h4>
                  <p>{action.description}</p>
                </div>
                <button className="action-btn">Try Now</button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="api-info">
        <h2>🔧 API Information</h2>
        <div className="info-grid">
          <div className="info-card">
            <h4>🌐 Base URL</h4>
            <code>http://127.0.0.1:8080/api/</code>
          </div>
          <div className="info-card">
            <h4>🔐 Authentication</h4>
            <code>OAuth 2.0 + Session-based</code>
          </div>
          <div className="info-card">
            <h4>📋 Format</h4>
            <code>JSON REST API</code>
          </div>
          <div className="info-card">
            <h4>⚡ Status</h4>
            <span className="status-badge online">Online</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;