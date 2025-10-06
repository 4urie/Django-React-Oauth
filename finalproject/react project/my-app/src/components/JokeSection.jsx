import { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

const JokeSection = () => {
  const [joke, setJoke] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchJoke = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`${API_BASE_URL}/api/joke/`);
      setJoke(response.data.joke);
    } catch (err) {
      setError(`Failed to fetch joke: ${err.response?.data?.error || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section">
      <h2>😂 Random Joke</h2>
      <p>Get a random joke from online joke APIs</p>
      
      <button 
        className="btn btn-primary" 
        onClick={fetchJoke}
        disabled={loading}
      >
        {loading ? (
          <span>
            <span className="loading"></span>
            Getting Joke...
          </span>
        ) : (
          '🎲 Get Random Joke'
        )}
      </button>
      
      {joke && !error && (
        <div className="api-response success">
          <strong>Your Joke:</strong><br/>
          {joke}
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

export default JokeSection;