import { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

const JokeQRSection = () => {
  const [joke, setJoke] = useState('');
  const [qrImage, setQrImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchJokeWithQR = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`${API_BASE_URL}/api/joke-qr/`);
      setJoke(response.data.joke);
      setQrImage(response.data.qr_image);
    } catch (err) {
      setError(`Failed to fetch joke with QR: ${err.response?.data?.error || err.message}`);
      console.error('Joke QR fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section">
      <h2>📱 Joke with QR Code</h2>
      <p>Get a random joke with a QR code for easy sharing</p>
      
      <button 
        className="button" 
        onClick={fetchJokeWithQR}
        disabled={loading}
      >
        {loading ? (
          <span className="loading">
            <span className="spinner"></span>
            Generating...
          </span>
        ) : (
          'Get Joke + QR Code'
        )}
      </button>
      
      {joke && qrImage && !error && (
        <div className="result">
          <h3>Here's your joke with QR code:</h3>
          <p>{joke}</p>
          <div className="qr-image">
            <img 
              src={`data:image/png;base64,${qrImage}`} 
              alt="QR Code for the joke" 
            />
            <p><small>Scan QR code to share this joke!</small></p>
          </div>
        </div>
      )}
      
      {error && (
        <div className="result error">
          <h3>Error</h3>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default JokeQRSection;