import React from 'react';

const AnalysisDashboard = ({ analysis }) => {
  if (!analysis) return null;

  return (
    <div style={{marginTop: '30px'}}>
      <h2>📊 Step 2: AI-Generated Analysis</h2>
      <div style={{background: 'white', padding: '25px', borderRadius: '12px', marginTop: '20px'}}>
        <h3>Score: {analysis.score.value}/10 - {analysis.score.label}</h3>
        <p>{analysis.score.justification}</p>
        <p><em>Confidence: {analysis.score.confidence}</em></p>
      </div>
    </div>
  );
};

export default AnalysisDashboard;