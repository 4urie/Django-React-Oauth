import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FaHome, FaLaugh, FaLock, FaUser, FaSignInAlt, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

const AnimatedNavbar = ({ user, onAuthChange, currentPage, onPageChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const menuRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <FaHome /> },
    { id: 'jokes', label: 'Jokes API', icon: <FaLaugh /> },
    { id: 'caesar', label: 'Caesar Cipher', icon: <FaLock /> },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial navbar animation
      gsap.fromTo(navRef.current, 
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );

      // Logo animation
      gsap.fromTo(logoRef.current,
        { scale: 0, rotation: -180 },
        { scale: 1, rotation: 0, duration: 0.6, ease: "back.out(1.7)", delay: 0.2 }
      );

      // Menu items stagger animation
      gsap.fromTo(menuRef.current.children,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out", delay: 0.4 }
      );

    }, navRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (mobileMenuRef.current) {
      if (isMenuOpen) {
        gsap.fromTo(mobileMenuRef.current,
          { opacity: 0, scale: 0.95, y: -10 },
          { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: "power2.out" }
        );
        gsap.fromTo(mobileMenuRef.current.children,
          { x: -20, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.2, stagger: 0.05, delay: 0.1 }
        );
      }
    }
  }, [isMenuOpen]);

  const handlePageChange = (pageId) => {
    // Animate current page indicator
    gsap.to(`.nav-item-${currentPage}`, {
      scale: 1,
      duration: 0.2
    });
    
    onPageChange(pageId);
    setIsMenuOpen(false);
    
    // Animate new page indicator
    gsap.fromTo(`.nav-item-${pageId}`, {
      scale: 1.2
    }, {
      scale: 1,
      duration: 0.3,
      ease: "elastic.out(1, 0.3)"
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    onAuthChange(null);
    onPageChange('dashboard');
    setIsMenuOpen(false);
  };

  const animateButton = (e) => {
    const button = e.currentTarget;
    gsap.to(button, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut"
    });
  };

  return (
    <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-xl border-b border-gray-700/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div ref={logoRef} className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <HiSparkles className="text-white text-xl" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse border-2 border-gray-900"></div>
            </div>
            <div className="hidden md:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                API Platform
              </h1>
              <p className="text-xs text-gray-400">Powered by Django + React</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div ref={menuRef} className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handlePageChange(item.id)}
                onMouseDown={animateButton}
                className={`nav-item-${item.id} flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                  currentPage === item.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </div>

          {/* User Section */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="hidden md:flex items-center space-x-4">
                <button
                  onClick={() => handlePageChange('profile')}
                  onMouseDown={animateButton}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-800/50 rounded-xl hover:bg-gray-700/50 transition-all duration-300"
                >
                  <FaUser className="text-blue-400" />
                  <span className="text-white font-medium">{user.username}</span>
                </button>
                <button
                  onClick={handleLogout}
                  onMouseDown={animateButton}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-600/20 text-red-400 rounded-xl hover:bg-red-600/30 transition-all duration-300"
                >
                  <FaSignOutAlt />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => handlePageChange('auth')}
                onMouseDown={animateButton}
                className="hidden md:flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all duration-300"
              >
                <FaSignInAlt />
                <span className="font-medium">Sign In</span>
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              onMouseDown={animateButton}
              className="md:hidden p-2 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-xl transition-all duration-300"
            >
              {isMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            ref={mobileMenuRef}
            className="md:hidden absolute top-16 left-0 right-0 bg-gray-900/95 backdrop-blur-xl border-b border-gray-700/50 shadow-xl"
          >
            <div className="px-6 py-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handlePageChange(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    currentPage === item.id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
              
              {user ? (
                <>
                  <button
                    onClick={() => handlePageChange('profile')}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-xl transition-all duration-300"
                  >
                    <FaUser className="text-blue-400" />
                    <span className="font-medium">Profile ({user.username})</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-600/20 rounded-xl transition-all duration-300"
                  >
                    <FaSignOutAlt />
                    <span className="font-medium">Logout</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => handlePageChange('auth')}
                  className="w-full flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl transition-all duration-300"
                >
                  <FaSignInAlt />
                  <span className="font-medium">Sign In</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default AnimatedNavbar;