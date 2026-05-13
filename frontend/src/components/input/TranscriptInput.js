import React, { useState } from 'react';

const TranscriptInput = ({ onSubmit, loading }) => {
  const [transcript, setTranscript] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (transcript.trim() && !loading) {
      onSubmit(transcript);
    }
  };

  return (
    <div style={{background: 'white', padding: '30px', borderRadius: '16px', marginBottom: '30px'}}>
      <h2>📝 Step 1: Paste Supervisor Transcript</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          placeholder="Paste the supervisor's feedback transcript here..."
          rows={10}
          style={{width: '100%', padding: '16px', marginBottom: '20px', border: '2px solid #e0e0e0', borderRadius: '12px'}}
        />
        <button type="submit" disabled={loading || !transcript.trim()} style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '14px 32px', border: 'none', borderRadius: '40px', cursor: 'pointer'}}>
          {loading ? '⏳ Analyzing...' : '🔍 Analyze Transcript'}
        </button>
      </form>
    </div>
  );
};

export default TranscriptInput;