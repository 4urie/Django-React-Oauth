import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const EnhancedParticleBackground = () => {
  const containerRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create particles
    const particleCount = 50;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.position = 'absolute';
      particle.style.width = Math.random() * 4 + 1 + 'px';
      particle.style.height = particle.style.width;
      particle.style.borderRadius = '50%';
      particle.style.pointerEvents = 'none';
      
      // Random colors for particles
      const colors = ['#3b82f6', '#8b5cf6', '#06d6a0', '#f72585', '#ffd60a'];
      particle.style.background = colors[Math.floor(Math.random() * colors.length)];
      particle.style.opacity = Math.random() * 0.6 + 0.2;
      
      // Random starting position
      particle.style.left = Math.random() * window.innerWidth + 'px';
      particle.style.top = Math.random() * window.innerHeight + 'px';
      
      container.appendChild(particle);
      particles.push(particle);
    }

    particlesRef.current = particles;

    // Animate particles
    const ctx = gsap.context(() => {
      particles.forEach((particle, index) => {
        // Floating animation
        gsap.to(particle, {
          y: `+=${Math.random() * 100 - 50}`,
          x: `+=${Math.random() * 100 - 50}`,
          duration: Math.random() * 10 + 5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: Math.random() * 2
        });

        // Pulsing animation
        gsap.to(particle, {
          scale: Math.random() * 0.5 + 0.5,
          duration: Math.random() * 3 + 2,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
          delay: Math.random() * 2
        });

        // Opacity animation
        gsap.to(particle, {
          opacity: Math.random() * 0.8 + 0.1,
          duration: Math.random() * 4 + 2,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
          delay: Math.random() * 3
        });
      });

      // Create connecting lines animation
      const createConnections = () => {
        const canvas = document.createElement('canvas');
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.opacity = '0.3';
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        container.appendChild(canvas);
        const ctx = canvas.getContext('2d');

        const drawConnections = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.strokeStyle = '#4a90e2';
          ctx.lineWidth = 0.5;

          for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
              const p1 = particles[i];
              const p2 = particles[j];
              
              const rect1 = p1.getBoundingClientRect();
              const rect2 = p2.getBoundingClientRect();
              
              const dx = rect1.left - rect2.left;
              const dy = rect1.top - rect2.top;
              const distance = Math.sqrt(dx * dx + dy * dy);

              if (distance < 150) {
                ctx.beginPath();
                ctx.moveTo(rect1.left, rect1.top);
                ctx.lineTo(rect2.left, rect2.top);
                ctx.stroke();
              }
            }
          }
        };

        // Animate connections
        gsap.ticker.add(drawConnections);

        return () => {
          gsap.ticker.remove(drawConnections);
          if (canvas.parentNode) {
            canvas.parentNode.removeChild(canvas);
          }
        };
      };

      const cleanupConnections = createConnections();

      return () => {
        cleanupConnections();
      };
    }, container);

    // Handle resize
    const handleResize = () => {
      const canvas = container.querySelector('canvas');
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      ctx.revert();
      window.removeEventListener('resize', handleResize);
      
      // Cleanup particles
      particles.forEach(particle => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      });
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at center, rgba(59, 130, 246, 0.1) 0%, rgba(0, 0, 0, 0.8) 70%)',
      }}
    >
      {/* Animated background shapes */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute top-1/3 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-10 left-1/3 w-72 h-72 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse" style={{ animationDelay: '4s' }}></div>
      <div className="absolute bottom-1/3 right-1/3 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse" style={{ animationDelay: '6s' }}></div>
    </div>
  );
};

export default EnhancedParticleBackground;