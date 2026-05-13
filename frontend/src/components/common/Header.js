import React from 'react';

const Header = () => {
  return (
    <header style={{background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)', color: 'white', padding: '20px 0'}}>
      <div style={{maxWidth: '1400px', margin: '0 auto', padding: '0 20px'}}>
        <h1>🎯 Supervisor Feedback Analyzer</h1>
        <p>AI-powered analysis for psychology internship supervisors</p>
      </div>
    </header>
  );
};

export default Header;