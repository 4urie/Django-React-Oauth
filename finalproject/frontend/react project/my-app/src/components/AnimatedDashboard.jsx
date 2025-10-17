import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaGrinSquintTears, FaRocket, FaCode, FaUsers } from "react-icons/fa";
import { IoQrCode, IoDocumentLock, IoAnalytics, IoShield } from "react-icons/io5";
import { HiSparkles } from "react-icons/hi";
import { API_BASE_URL } from '../config/api';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const AnimatedDashboard = ({ user }) => {
  const [stats, setStats] = useState({
    totalJokes: 0,
    totalCiphers: 0,
    qrCodes: 0,
    activeUsers: 1234
  });

  // Refs for GSAP animations
  const dashboardRef = useRef(null);
  const headerRef = useRef(null);
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const featuresRef = useRef(null);
  const cardsRef = useRef([]);

  const features = [
    {
      id: 'jokes',
      title: 'Random Jokes API',
      description: 'Get random programming jokes from our curated collection',
      icon: <FaGrinSquintTears />,
      gradient: 'from-purple-500 to-pink-500',
      stats: '1000+ jokes',
      delay: 0.1
    },
    {
      id: 'jokes-qr',
      title: 'Joke QR Codes',
      description: 'Generate QR codes containing random jokes for easy sharing',
      icon: <IoQrCode />,
      gradient: 'from-blue-500 to-cyan-500',
      stats: 'Dynamic QR codes',
      delay: 0.2
    },
    {
      id: 'caesar',
      title: 'Caesar Cipher',
      description: 'Encrypt and decrypt text using classical Caesar cipher',
      icon: <IoDocumentLock />,
      gradient: 'from-green-500 to-emerald-500',
      stats: 'Military-grade encryption',
      delay: 0.3
    },
    {
      id: 'caesar-qr',
      title: 'Cipher QR Codes',
      description: 'Generate QR codes with encrypted messages for secure sharing',
      icon: <IoShield />,
      gradient: 'from-orange-500 to-red-500',
      stats: 'Secure messaging',
      delay: 0.4
    }
  ];

  const quickStats = [
    { label: 'Active Users', value: '1.2K+', icon: <FaUsers />, color: 'text-blue-400' },
    { label: 'API Calls', value: '50K+', icon: <IoAnalytics />, color: 'text-green-400' },
    { label: 'Features', value: '4', icon: <FaCode />, color: 'text-purple-400' },
    { label: 'Uptime', value: '99.9%', icon: <FaRocket />, color: 'text-yellow-400' }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial page load animation
      gsap.fromTo(dashboardRef.current, 
        { opacity: 0 },
        { opacity: 1, duration: 0.5 }
      );

      // Header animations
      gsap.fromTo(headerRef.current,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
      );

      // Hero section animation
      gsap.fromTo(heroRef.current.children,
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.6, 
          stagger: 0.2, 
          ease: "power2.out",
          delay: 0.3
        }
      );

      // Stats animation
      gsap.fromTo(statsRef.current.children,
        { scale: 0.8, opacity: 0 },
        { 
          scale: 1, 
          opacity: 1, 
          duration: 0.5, 
          stagger: 0.1, 
          ease: "back.out(1.7)",
          delay: 0.6
        }
      );

      // Feature cards animation
      gsap.fromTo(cardsRef.current,
        { y: 60, opacity: 0, rotationX: 45 },
        { 
          y: 0, 
          opacity: 1, 
          rotationX: 0,
          duration: 0.8, 
          stagger: 0.15, 
          ease: "power3.out",
          delay: 0.8
        }
      );

      // Scroll-triggered animations
      ScrollTrigger.create({
        trigger: featuresRef.current,
        start: "top 80%",
        animation: gsap.fromTo(featuresRef.current.querySelectorAll('.feature-card'),
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" }
        )
      });

    }, dashboardRef);

    return () => ctx.revert();
  }, []);

  // Hover animations for cards
  const handleCardHover = (index, isHovering) => {
    const card = cardsRef.current[index];
    if (!card) return;

    gsap.to(card, {
      scale: isHovering ? 1.05 : 1,
      y: isHovering ? -10 : 0,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  return (
    <div ref={dashboardRef} className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-bounce-soft"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-bounce-soft" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-bounce-soft" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <header ref={headerRef} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full border border-purple-500/30 mb-6">
            <HiSparkles className="text-yellow-400" />
            <span className="text-sm font-medium">Django + React API Platform</span>
            <HiSparkles className="text-yellow-400" />
          </div>
        </header>

        {/* Hero Section */}
        <section ref={heroRef} className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-6">
            {user ? `Welcome back, ${user.username}!` : 'Welcome to the Future'}
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            {user 
              ? 'Explore our powerful API features and tools in this modern showcase.' 
              : 'Experience our cutting-edge API platform with smooth animations and modern design.'
            }
          </p>
          {!user && (
            <div className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <span className="text-lg font-semibold">🚀 Ready to get started?</span>
              <span className="text-sm opacity-90">Sign in to unlock all features</span>
            </div>
          )}
        </section>

        {/* Quick Stats */}
        <section ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {quickStats.map((stat, index) => (
            <div
              key={stat.label}
              className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 text-center hover:bg-gray-800/70 transition-all duration-300"
            >
              <div className={`text-3xl mb-2 ${stat.color}`}>
                {stat.icon}
              </div>
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </section>

        {/* Features Grid */}
        <section ref={featuresRef} className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            ✨ Available Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.id}
                ref={el => cardsRef.current[index] = el}
                className="feature-card group cursor-pointer"
                onMouseEnter={() => handleCardHover(index, true)}
                onMouseLeave={() => handleCardHover(index, false)}
              >
                <div className="relative bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 h-full hover:border-gray-600/50 transition-all duration-300">
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-300`}></div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <div className={`text-4xl mb-4 bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-white transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 font-medium">{feature.stats}</span>
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* API Information */}
        <section className="bg-gray-800/30 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8">
          <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            🌐 API Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gray-900/50 rounded-2xl">
              <h4 className="text-lg font-semibold mb-2 text-blue-400">Base URL</h4>
              <code className="text-sm text-gray-300 bg-gray-800 px-3 py-1 rounded">{API_BASE_URL}/api/</code>
            </div>
            <div className="text-center p-6 bg-gray-900/50 rounded-2xl">
              <h4 className="text-lg font-semibold mb-2 text-purple-400">Authentication</h4>
              <code className="text-sm text-gray-300 bg-gray-800 px-3 py-1 rounded">OAuth 2.0</code>
            </div>
            <div className="text-center p-6 bg-gray-900/50 rounded-2xl">
              <h4 className="text-lg font-semibold mb-2 text-green-400">Format</h4>
              <code className="text-sm text-gray-300 bg-gray-800 px-3 py-1 rounded">JSON REST</code>
            </div>
            <div className="text-center p-6 bg-gray-900/50 rounded-2xl">
              <h4 className="text-lg font-semibold mb-2 text-yellow-400">Status</h4>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-green-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                Online
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AnimatedDashboard;