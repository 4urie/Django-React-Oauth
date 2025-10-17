import { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

const CaesarSection = () => {
  const [text, setText] = useState('');
  const [shift, setShift] = useState(3);
  const [result, setResult] = useState('');
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
      const response = await axios.post(`${API_BASE_URL}/api/caesar/`, {
        text: text,
        shift: parseInt(shift)
      });
      
      setResult(response.data.encoded_text);
    } catch (err) {
      setError(`Failed to encode text: ${err.response?.data?.error || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section">
      <h2>🔐 Caesar Cipher</h2>
      <p>Encode text using the Caesar cipher algorithm</p>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="caesar-text">Text to encode:</label>
          <textarea
            id="caesar-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your text here..."
            rows="3"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="caesar-shift">Shift value:</label>
          <input
            type="number"
            id="caesar-shift"
            value={shift}
            onChange={(e) => setShift(e.target.value)}
            min="1"
            max="25"
          />
          <small style={{color: '#7a8590', fontSize: '0.9rem'}}>
            Choose a number between 1 and 25
          </small>
        </div>
        
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={loading || !text.trim()}
        >
          {loading ? (
            <span>
              <span className="loading"></span>
              Encoding...
            </span>
          ) : (
            '🔐 Encode Text'
          )}
        </button>
      </form>
      
      {result && !error && (
        <div className="api-response success">
          <strong>Encoded Result:</strong><br/>
          <strong>Original:</strong> {text}<br/>
          <strong>Shift:</strong> {shift}<br/>
          <strong>Encoded:</strong> {result}
        </div>
      )}
      
      {error && (
        <div className="api-response error">
          <strong>Error:</strong> {error}
        </div>
      )}
    </div>
  );
};

export default CaesarSection;