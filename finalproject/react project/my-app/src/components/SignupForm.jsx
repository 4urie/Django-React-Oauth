import { useState } from 'react';
import axios from 'axios';
import OAuthLogin from './OAuthLogin';

const SignupForm = ({ onSignupSuccess }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password1: '',
    password2: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password1 !== formData.password2) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8080/api/auth/signup/', {
        username: formData.username,
        email: formData.email,
        password1: formData.password1,
        password2: formData.password2
      });

      if (response.data.success) {
        onSignupSuccess();
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed');
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
      <h2>✨ Create Account</h2>
      <p>Join us today</p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            placeholder="Choose a username"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password1">Password:</label>
          <input
            type="password"
            id="password1"
            name="password1"
            value={formData.password1}
            onChange={handleChange}
            required
            placeholder="Enter your password"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password2">Confirm Password:</label>
          <input
            type="password"
            id="password2"
            name="password2"
            value={formData.password2}
            onChange={handleChange}
            required
            placeholder="Confirm your password"
          />
        </div>

        <button 
          type="submit" 
          className="btn btn-success"
          disabled={loading}
        >
          {loading ? (
            <span>
              <span className="loading"></span>
              Creating Account...
            </span>
          ) : (
            '✨ Create Account'
          )}
        </button>
      </form>

      {error && (
        <div className="api-response error">
          <strong>Signup Error:</strong> {error}
        </div>
      )}

      <OAuthLogin onOAuthLogin={onSignupSuccess} />
    </div>
  );
};

export default SignupForm;