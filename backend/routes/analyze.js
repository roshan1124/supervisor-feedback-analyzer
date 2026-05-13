const express = require('express');
const router = express.Router();
const { OllamaService } = require('../services/ollama.service');
const { PromptService } = require('../services/prompt.service');
const { FallbackParser } = require('../utils/fallbackParser');
const { ValidationUtils } = require('../utils/validation');

router.post('/', async (req, res) => {
  const { transcript } = req.body;

  if (!transcript || transcript.trim().length === 0) {
    return res.status(400).json({ error: 'Transcript is required' });
  }

  console.log('Analyzing transcript...');
  console.log(`Transcript length: ${transcript.length} characters`);

  try {
    const ollama = new OllamaService();
    const promptService = new PromptService();
    const parser = new FallbackParser();
    const validator = new ValidationUtils();

    // Build prompt
    const prompt = promptService.buildPrompt(transcript);
    
    // Call Ollama
    const rawOutput = await ollama.generate(prompt);
    console.log('Raw output received, parsing...');

    // Parse with fallback
    const parsed = parser.parse(rawOutput);
    
    // Validate
    if (!validator.validateAnalysis(parsed)) {
      console.warn('Validation failed, using sanitized version');
    }
    
    const sanitized = validator.sanitize(parsed);

    res.json({
      analysis: sanitized,
      meta: {
        transcriptLength: transcript.length,
        model: process.env.OLLAMA_MODEL || 'llama3.2'
      }
    });

  } catch (error) {
    console.error('Analysis error:', error.message);
    res.status(500).json({ 
      error: 'Analysis failed',
      details: error.message,
      suggestion: error.message.includes('Cannot connect') ? 'Run: ollama serve' : 'Try again'
    });
  }
});

module.exports = router;