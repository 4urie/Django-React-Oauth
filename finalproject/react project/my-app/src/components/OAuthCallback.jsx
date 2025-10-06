import { useEffect } from 'react';
import axios from 'axios';

const OAuthCallback = ({ onAuthSuccess }) => {
  useEffect(() => {
    handleOAuthCallback();
  }, []);

  const handleOAuthCallback = async () => {
    try {
      // Check URL parameters for OAuth success/error
      const urlParams = new URLSearchParams(window.location.search);
      const oauthSuccess = urlParams.get('oauth_success');
      const oauthError = urlParams.get('oauth_error');
      const username = urlParams.get('username');

      if (oauthSuccess === 'true' && username) {
        // OAuth success with username from URL
        const userData = { username: username };
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('authToken', 'oauth-session');
        
        // Notify parent component
        onAuthSuccess(userData);
        
        // Clean up URL parameters
        const cleanUrl = window.location.pathname;
        window.history.replaceState({}, document.title, cleanUrl);
        
        return;
      }

      if (oauthError === 'true') {
        console.error('OAuth authentication failed');
        return;
      }

      // Fallback: Check if user is authenticated via regular API call
      const response = await axios.get(`${API_BASE_URL}/api/auth/user/`, {
        withCredentials: true
      });
      
      if (response.data.authenticated) {
        // User successfully authenticated
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('authToken', 'oauth-session');
        
        // Notify parent component
        onAuthSuccess(response.data.user);
      }
    } catch (error) {
      // Silently handle OAuth callback errors
    }
  };

  return null; // This component doesn't render anything
};

export default OAuthCallback;