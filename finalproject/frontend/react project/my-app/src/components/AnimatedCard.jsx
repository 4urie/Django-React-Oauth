import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AnimatedCard = ({ 
  children, 
  className = '', 
  delay = 0, 
  direction = 'up', 
  hover = true,
  scrollTrigger = false,
  gradient = '',
  ...props 
}) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const ctx = gsap.context(() => {
      // Initial animation based on direction
      let fromVars = { opacity: 0 };
      let toVars = { opacity: 1, duration: 0.6, ease: "power2.out", delay };

      switch (direction) {
        case 'up':
          fromVars.y = 50;
          toVars.y = 0;
          break;
        case 'down':
          fromVars.y = -50;
          toVars.y = 0;
          break;
        case 'left':
          fromVars.x = -50;
          toVars.x = 0;
          break;
        case 'right':
          fromVars.x = 50;
          toVars.x = 0;
          break;
        case 'scale':
          fromVars.scale = 0.8;
          toVars.scale = 1;
          break;
        case 'rotate':
          fromVars.rotationY = 90;
          toVars.rotationY = 0;
          break;
        default:
          fromVars.y = 30;
          toVars.y = 0;
      }

      if (scrollTrigger) {
        // Scroll-triggered animation
        ScrollTrigger.create({
          trigger: card,
          start: "top 85%",
          animation: gsap.fromTo(card, fromVars, toVars)
        });
      } else {
        // Immediate animation
        gsap.fromTo(card, fromVars, toVars);
      }

      // Hover animations
      if (hover) {
        const handleMouseEnter = () => {
          gsap.to(card, {
            scale: 1.05,
            y: -10,
            duration: 0.3,
            ease: "power2.out"
          });
        };

        const handleMouseLeave = () => {
          gsap.to(card, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out"
          });
        };

        card.addEventListener('mouseenter', handleMouseEnter);
        card.addEventListener('mouseleave', handleMouseLeave);

        return () => {
          card.removeEventListener('mouseenter', handleMouseEnter);
          card.removeEventListener('mouseleave', handleMouseLeave);
        };
      }
    }, cardRef);

    return () => ctx.revert();
  }, [delay, direction, hover, scrollTrigger]);

  return (
    <div
      ref={cardRef}
      className={`
        relative overflow-hidden rounded-2xl bg-gray-800/50 backdrop-blur-xl 
        border border-gray-700/50 transition-all duration-300 group
        ${gradient && `hover:bg-gradient-to-br ${gradient}`}
        ${className}
      `}
      {...props}
    >
      {/* Gradient overlay for hover effect */}
      {gradient && (
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default AnimatedCard;