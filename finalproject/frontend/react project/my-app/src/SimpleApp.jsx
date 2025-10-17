import React from 'react'

function SimpleApp() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          React + GSAP Dashboard
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Feature 1</h2>
            <p className="text-gray-300">This is a test card to check if Tailwind CSS is working.</p>
          </div>
          
          <div className="bg-blue-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Feature 2</h2>
            <p className="text-gray-300">Another test card with blue background.</p>
          </div>
          
          <div className="bg-purple-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Feature 3</h2>
            <p className="text-gray-300">Purple card to test colors.</p>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Test Button
          </button>
        </div>
      </div>
    </div>
  )
}

export default SimpleApp