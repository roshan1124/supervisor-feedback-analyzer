import React from 'react';

const LoadingSpinner = () => {
  return (
    <div style={{textAlign: 'center', padding: '60px', background: 'white', borderRadius: '12px'}}>
      <div style={{width: '50px', height: '50px', border: '4px solid #e0e0e0', borderTop: '4px solid #667eea', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 20px'}}></div>
      <p>Analyzing transcript with Ollama...</p>
      <style>{'@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }'}</style>
    </div>
  );
};

export default LoadingSpinner;