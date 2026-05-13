const axios = require('axios');

const OLLAMA_URL = process.env.OLLAMA_URL || 'http://localhost:11434';
const MODEL = process.env.OLLAMA_MODEL || 'tinyllama';

class OllamaService {
  async generate(prompt) {
    console.log(`Calling Ollama with model: ${MODEL}`);
    
    try {
      const response = await axios.post(`${OLLAMA_URL}/api/generate`, {
        model: MODEL,
        prompt: prompt,
        stream: false,
        options: {
          temperature: 0.3,
          num_predict: 2048
        }
      });

      return response.data.response;
    } catch (error) {
      console.error('Ollama error details:', error.message);
      if (error.code === 'ECONNREFUSED') {
        throw new Error('Cannot connect to Ollama. Make sure it\'s running (ollama serve)');
      }
      throw new Error(`Ollama request failed: ${error.message}`);
    }
  }

  async checkHealth() {
    try {
      await axios.get(`${OLLAMA_URL}/api/tags`);
      return true;
    } catch {
      return false;
    }
  }
}

module.exports = { OllamaService };