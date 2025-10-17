import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'

function WorkingAnimatedApp() {
  const [user, setUser] = useState(null)
  const containerRef = useRef(null)
  const titleRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    // GSAP animations
    const ctx = gsap.context(() => {
      // Animate title
      gsap.fromTo(titleRef.current, 
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
      )

      // Animate cards
      gsap.fromTo(cardsRef.current, 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out", delay: 0.5 }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const features = [
    {
      title: 'Random Jokes API',
      description: 'Get programming jokes from our API',
      color: 'bg-yellow-600',
      icon: '😂'
    },
    {
      title: 'Caesar Cipher',
      description: 'Encrypt and decrypt messages',
      color: 'bg-blue-600',
      icon: '🔒'
    },
    {
      title: 'QR Code Generator',
      description: 'Generate QR codes instantly',
      color: 'bg-purple-600',
      icon: '📱'
    }
  ]

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-6 py-12">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 
            ref={titleRef}
            className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-6"
          >
            {user ? `Welcome back, ${user.username}!` : 'Welcome to the API Platform'}
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Experience our cutting-edge API platform with smooth GSAP animations and modern design.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              ref={el => cardsRef.current[index] = el}
              className={`${feature.color}/20 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 hover:scale-105 transition-transform duration-300 cursor-pointer`}
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, { scale: 1.05, duration: 0.3 })
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, { scale: 1, duration: 0.3 })
              }}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
              <div className="mt-4 flex items-center text-sm text-gray-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
                Available
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <button 
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            onClick={() => setUser({ username: 'Developer' })}
          >
            {user ? 'Explore Features' : 'Get Started'}
          </button>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-400">
          <p>Built with React + Vite + GSAP + Tailwind CSS</p>
        </footer>
      </div>
    </div>
  )
}

export default WorkingAnimatedApp