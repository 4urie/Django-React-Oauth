import { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';
import OAuthLogin from './OAuthLogin';


const LoginForm = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login/`, {
        username: formData.username,
        password: formData.password
      });

      if (response.data.success) {
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        onLoginSuccess(response.data.user);
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="section">
      <h2>🔐 Login</h2>
      <p>Access your account</p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username or Email:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            placeholder="Enter your username or email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Enter your password"
          />
        </div>

        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? (
            <span>
              <span className="loading"></span>
              Signing In...
            </span>
          ) : (
            '🔑 Sign In'
          )}
        </button>
      </form>

      {error && (
        <div className="api-response error">
          <strong>Login Error:</strong> {error}
        </div>
      )}

      <OAuthLogin onOAuthLogin={onLoginSuccess} />
    </div>
  );
};

export default LoginForm;