import React from 'react'

function TestApp() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#1a1a1a', 
      color: 'white', 
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1>Test React App</h1>
      <p>If you can see this, React is working!</p>
      <div style={{
        backgroundColor: '#333',
        padding: '20px',
        borderRadius: '10px',
        marginTop: '20px'
      }}>
        <h2>GSAP Animation Test</h2>
        <div 
          style={{
            width: '100px',
            height: '100px',
            backgroundColor: '#4a90e2',
            borderRadius: '50%',
            margin: '20px auto'
          }}
          className="test-circle"
        >
        </div>
      </div>
    </div>
  )
}

export default TestApp