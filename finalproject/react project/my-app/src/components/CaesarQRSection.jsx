import { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

const CaesarQRSection = () => {
  const [text, setText] = useState('');
  const [shift, setShift] = useState(3);
  const [result, setResult] = useState('');
  const [qrImage, setQrImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) {
      setError('Please enter some text to encode');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await axios.post(`${API_BASE_URL}/api/caesar-qr/`, {
        text: text,
        shift: parseInt(shift)
      });
      
      setResult(response.data.encoded_text);
      setQrImage(response.data.qr_image);
    } catch (err) {
      setError(`Failed to encode text with QR: ${err.response?.data?.error || err.message}`);
      console.error('Caesar QR error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section">
      <h2>🔐📱 Caesar Cipher + QR</h2>
      <p>Encode text with Caesar cipher and generate a QR code</p>
      
      <form onSubmit={handleSubmit}>
        <div className="inline-form">
          <div className="form-group">
            <label htmlFor="caesar-qr-text">Text to encode:</label>
            <input
              type="text"
              id="caesar-qr-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter your text here..."
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="caesar-qr-shift">Shift:</label>
            <input
              type="number"
              id="caesar-qr-shift"
              value={shift}
              onChange={(e) => setShift(e.target.value)}
              min="1"
              max="25"
              style={{width: '80px'}}
            />
          </div>
          
          <button 
            type="submit" 
            className="button"
            disabled={loading}
            style={{minWidth: '140px'}}
          >
            {loading ? (
              <span className="loading">
                <span className="spinner"></span>
                Processing...
              </span>
            ) : (
              'Encode + QR'
            )}
          </button>
        </div>
      </form>
      
      {result && qrImage && !error && (
        <div className="result">
          <div className="two-column">
            <div>
              <h3>Encoded text:</h3>
              <p><strong>Original:</strong> {text}</p>
              <p><strong>Shift:</strong> {shift}</p>
              <p><strong>Encoded:</strong> {result}</p>
            </div>
            <div className="qr-image">
              <img 
                src={`data:image/png;base64,${qrImage}`} 
                alt="QR Code for encoded text" 
              />
              <p><small>QR code for encoded text</small></p>
            </div>
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

export default CaesarQRSection;