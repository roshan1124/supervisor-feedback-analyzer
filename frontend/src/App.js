import React, { useState } from 'react';
import axios from 'axios';
import Header from './components/common/Header';
import Disclaimer from './components/common/Disclaimer';
import TranscriptInput from './components/input/TranscriptInput';
import LoadingSpinner from './components/common/LoadingSpinner';
import AnalysisDashboard from './components/analysis/AnalysisDashboard';
import './styles/App.css';

const API_URL = 'http://localhost:5005/api/analyze';

function App() {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyze = async (transcript) => {
    setLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const response = await axios.post(API_URL, { transcript });
      setAnalysis(response.data.analysis);
    } catch (err) {
      setError(err.response?.data?.details || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <div className="container">
          <Disclaimer />
          <TranscriptInput onSubmit={handleAnalyze} loading={loading} />
          {error && (
            <div className="error-message">
              <strong>Error:</strong> {error}
              <button onClick={() => setError(null)} className="close-btn">×</button>
            </div>
          )}
          {loading && <LoadingSpinner />}
          {analysis && <AnalysisDashboard analysis={analysis} />}
        </div>
      </main>
    </div>
  );
}

export default App;