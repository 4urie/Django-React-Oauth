import { useState, useEffect } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const AuthSection = ({ user, onAuthChange }) => {
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'
  const [showAuth, setShowAuth] = useState(false);

  const handleLoginSuccess = (userData) => {
    onAuthChange(userData);
    setShowAuth(false);
  };

  const handleSignupSuccess = () => {
    setAuthMode('login');
    // Show success message or auto-switch to login
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    onAuthChange(null);
  };

  if (user) {
    return (
      <div className="section">
        <h2>👤 Welcome, {user.username}!</h2>
        <p>You are logged in to the Django API</p>
        
        <div className="user-info">
          <p><strong>Username:</strong> {user.username}</p>
          {user.email && <p><strong>Email:</strong> {user.email}</p>}
          <p><strong>Status:</strong> <span style={{color: '#22c55e'}}>Authenticated ✅</span></p>
        </div>

        <button 
          className="btn btn-danger" 
          onClick={handleLogout}
        >
          🚪 Sign Out
        </button>
      </div>
    );
  }

  return (
    <div className="section">
      <h2>🔐 Authentication</h2>
      <p>Sign in to access additional features</p>
      
      {!showAuth ? (
        <div>
          <button 
            className="btn btn-primary" 
            onClick={() => {
              setShowAuth(true);
              setAuthMode('login');
            }}
            style={{marginRight: '1rem'}}
          >
            Sign In
          </button>
          <button 
            className="btn btn-success" 
            onClick={() => {
              setShowAuth(true);
              setAuthMode('signup');
            }}
          >
            ✨ Create Account
          </button>
        </div>
      ) : (
        <div>
          <div className="auth-toggle">
            <button 
              onClick={() => setAuthMode('login')}
              className={authMode === 'login' ? 'active' : ''}
            >
              🔑 Sign In
            </button>
            <button 
              onClick={() => setAuthMode('signup')}
              className={authMode === 'signup' ? 'active' : ''}
            >
              ✨ Sign Up
            </button>
          </div>

          {authMode === 'login' ? (
            <LoginForm onLoginSuccess={handleLoginSuccess} />
          ) : (
            <SignupForm onSignupSuccess={handleSignupSuccess} />
          )}

          <button 
            onClick={() => setShowAuth(false)}
            style={{
              background: 'transparent',
              color: '#666',
              border: 'none',
              textDecoration: 'underline',
              cursor: 'pointer',
              marginTop: '1rem'
            }}
          >
            ← Back
          </button>
        </div>
      )}
    </div>
  );
};

export default AuthSection;