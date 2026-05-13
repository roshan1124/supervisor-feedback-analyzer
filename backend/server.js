const express = require('express');
const cors = require('cors');
const analyzeRoute = require('./routes/analyze');

const app = express();
const PORT = 5005;

app.use(cors());
app.use(express.json());

app.use('/api/analyze', analyzeRoute);

app.get('/health', async (req, res) => {
  const { OllamaService } = require('./services/ollama.service');
  const ollama = new OllamaService();
  const isOllamaRunning = await ollama.checkHealth();
  
  res.json({ 
    status: 'ok', 
    ollamaRunning: isOllamaRunning,
    ollamaUrl: process.env.OLLAMA_URL || 'http://localhost:11434'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Waiting for Ollama on: ${process.env.OLLAMA_URL || 'http://localhost:11434'}`);
});