import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedCard from './AnimatedCard';
import AnimatedButton from './AnimatedButton';
import { FaLaugh, FaRefresh, FaCopy, FaCheck } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
import { API_BASE_URL } from '../config/api';

gsap.registerPlugin(ScrollTrigger);

const AnimatedJokeSection = () => {
  const [joke, setJoke] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const sectionRef = useRef(null);
  const jokeRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section entrance animation
      gsap.fromTo(sectionRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );
    }, sectionRef);

    // Fetch initial joke
    fetchJoke();

    return () => ctx.revert();
  }, []);

  const fetchJoke = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/joke/`);
      const data = await response.json();
      
      if (data.joke) {
        // Animate joke text change
        if (jokeRef.current) {
          gsap.to(jokeRef.current, {
            opacity: 0,
            scale: 0.95,
            duration: 0.2,
            ease: "power2.out",
            onComplete: () => {
              setJoke(data.joke);
              gsap.fromTo(jokeRef.current,
                { opacity: 0, scale: 0.95, y: 20 },
                { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "back.out(1.7)" }
              );
            }
          });
        } else {
          setJoke(data.joke);
        }
      }
    } catch (error) {
      console.error('Error fetching joke:', error);
      setJoke('Error fetching joke. Please try again!');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(joke);
      setCopied(true);
      
      // Reset copied state after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <div ref={sectionRef} className="max-w-4xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 rounded-full border border-yellow-500/30 mb-6">
          <HiSparkles className="text-yellow-400" />
          <span className="text-sm font-medium text-yellow-300">Random Jokes API</span>
          <FaLaugh className="text-yellow-400" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent mb-4">
          Programming Jokes
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Get random programming jokes to brighten your coding day! Our API serves up fresh humor for developers.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Joke Display Card */}
        <AnimatedCard 
          className="p-8 h-full"
          gradient="from-yellow-500/20 to-orange-500/20"
          scrollTrigger={true}
          delay={0.2}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
              <FaLaugh className="text-white text-xl" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Current Joke</h3>
              <p className="text-gray-400 text-sm">Fresh from our API</p>
            </div>
          </div>

          <div 
            ref={jokeRef}
            className="bg-gray-900/50 rounded-2xl p-6 mb-6 min-h-[120px] flex items-center"
          >
            {loading ? (
              <div className="flex items-center justify-center w-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400"></div>
                <span className="ml-3 text-gray-400">Loading joke...</span>
              </div>
            ) : (
              <p className="text-lg text-gray-200 leading-relaxed font-medium">
                {joke || 'Click "Get New Joke" to fetch a programming joke!'}
              </p>
            )}
          </div>

          <div className="flex gap-3">
            <AnimatedButton
              onClick={fetchJoke}
              disabled={loading}
              loading={loading}
              variant="primary"
              icon={<FaRefresh />}
              className="flex-1"
            >
              Get New Joke
            </AnimatedButton>
            
            <AnimatedButton
              onClick={copyToClipboard}
              disabled={!joke || loading}
              variant="secondary"
              icon={copied ? <FaCheck /> : <FaCopy />}
            >
              {copied ? 'Copied!' : 'Copy'}
            </AnimatedButton>
          </div>
        </AnimatedCard>

        {/* API Information Card */}
        <AnimatedCard 
          className="p-8 h-full"
          gradient="from-blue-500/20 to-purple-500/20"
          scrollTrigger={true}
          delay={0.4}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
              <span className="text-white text-xl font-bold">API</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">API Endpoint</h3>
              <p className="text-gray-400 text-sm">How to use this API</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-900/50 rounded-xl p-4">
              <h4 className="text-sm font-semibold text-blue-400 mb-2">GET Request</h4>
              <code className="text-sm text-gray-300 bg-gray-800 px-3 py-1 rounded block">
                {API_BASE_URL}/api/joke/
              </code>
            </div>

            <div className="bg-gray-900/50 rounded-xl p-4">
              <h4 className="text-sm font-semibold text-green-400 mb-2">Response Format</h4>
              <pre className="text-xs text-gray-300 bg-gray-800 p-3 rounded overflow-x-auto">
{`{
  "joke": "Why do programmers prefer dark mode?
  Because light attracts bugs!"
}`}
              </pre>
            </div>

            <div className="bg-gray-900/50 rounded-xl p-4">
              <h4 className="text-sm font-semibold text-purple-400 mb-2">Features</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Random programming jokes</li>
                <li>• No authentication required</li>
                <li>• Fast response times</li>
                <li>• JSON formatted output</li>
              </ul>
            </div>
          </div>
        </AnimatedCard>
      </div>

      {/* Usage Examples */}
      <AnimatedCard 
        className="p-8"
        scrollTrigger={true}
        delay={0.6}
        gradient="from-green-500/20 to-blue-500/20"
      >
        <h3 className="text-2xl font-bold text-white mb-6 text-center">
          📚 Usage Examples
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-900/50 rounded-xl p-6">
            <h4 className="text-lg font-semibold text-yellow-400 mb-3">JavaScript (Fetch)</h4>
            <pre className="text-sm text-gray-300 bg-gray-800 p-4 rounded overflow-x-auto">
{`fetch('${API_BASE_URL}/api/joke/')
  .then(response => response.json())
  .then(data => console.log(data.joke));`}
            </pre>
          </div>

          <div className="bg-gray-900/50 rounded-xl p-6">
            <h4 className="text-lg font-semibold text-blue-400 mb-3">Python (Requests)</h4>
            <pre className="text-sm text-gray-300 bg-gray-800 p-4 rounded overflow-x-auto">
{`import requests

response = requests.get('${API_BASE_URL}/api/joke/')
joke = response.json()['joke']
print(joke)`}
            </pre>
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default AnimatedJokeSection;