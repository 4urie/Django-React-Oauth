import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaGithub } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { API_BASE_URL } from '../config/api';

const OAuthLogin = ({ onOAuthLogin }) => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);


  const providerConfig = {
    github: {
      icon: <FaGithub />,
      name: 'GitHub',
      gradient: 'linear-gradient(135deg, #24292e, #586069)',
      hoverGradient: 'linear-gradient(135deg, #586069, #24292e)'
    },
    google: {
      icon: <FaGoogle />,
      name: 'Google',
      gradient: 'linear-gradient(135deg, #f03800ff, #0e7fffff, #ffe23fff)',
      hoverGradient: 'linear-gradient(135deg, #f03800ff, #0e7fffff, #ffe23fff)',
    },
    facebook: {
      icon: <FaFacebook />,
      name: 'Facebook', 
      gradient: 'linear-gradient(135deg, #1877f2, #42a5f5)',
      hoverGradient: 'linear-gradient(135deg, #42a5f5, #1877f2)'
    }
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  const fetchProviders = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/auth/providers/`);
      setProviders(response.data.providers);
    } catch (error) {
     
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthLogin = (provider) => {
    // For OAuth, we need to redirect to Django's OAuth URLs
    // This will handle the OAuth flow and redirect back
    const loginUrl = `${API_BASE_URL}${provider.login_url}`;
    
    // Store current React app URL to redirect back after OAuth
    localStorage.setItem('oauth_redirect_url', window.location.href);
    
    // Redirect to Django OAuth provider
    window.location.href = loginUrl;
  };

  if (loading) {
    return (
      <div className="oauth-loading">
        <span className="loading"></span>
        <span style={{color: '#b0b6bd'}}>Loading social login options...</span>
      </div>
    );
  }

  if (providers.length === 0) {
    return (
      <div className="oauth-info">
        <p style={{color: '#7a8590', fontSize: '0.9rem', textAlign: 'center'}}>
          OAuth providers not configured yet
        </p>
      </div>
    );
  }

  return (
    <div className="oauth-section">
      <div className="oauth-divider">
        <span>or continue with</span>
      </div>
      
      <div className="oauth-buttons">
        {providers.map((provider) => {
          const config = providerConfig[provider.id] || {
            icon: provider.icon,
            name: provider.name,
            gradient: 'linear-gradient(135deg, #6c757d, #5a6268)',
            hoverGradient: 'linear-gradient(135deg, #5a6268, #6c757d)'
          };
          
          return (
            <button
              key={provider.id}
              onClick={() => handleOAuthLogin(provider)}
              className="oauth-btn"
              style={{
                background: config.gradient,
                '--hover-gradient': config.hoverGradient
              }}
            >
              <span className="oauth-icon">{config.icon}</span>
              <span className="oauth-text">Continue with {config.name}</span>
            </button>
          );
        })}
      </div>

      <div className="oauth-note">
        <p style={{fontSize: '0.8rem', color: '#7a8590', textAlign: 'center', marginTop: '1rem'}}>
          🔒 Secure authentication via social providers
        </p>
      </div>
    </div>
  );
};

export default OAuthLogin;