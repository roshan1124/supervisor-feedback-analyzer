class ValidationUtils {
  validateAnalysis(data) {
    const required = ['score', 'evidence', 'kpiMapping', 'gaps', 'followUpQuestions'];
    
    for (const field of required) {
      if (!data[field]) {
        console.warn(`Missing field: ${field}`);
        return false;
      }
    }

    // Validate score object
    if (!data.score.value || data.score.value < 1 || data.score.value > 10) {
      console.warn('Invalid score value');
      return false;
    }

    return true;
  }

  sanitize(data) {
    return {
      score: {
        value: Math.min(10, Math.max(1, data.score.value || 5)),
        label: data.score.label || "Unable to determine",
        band: data.score.band || "Productivity",
        justification: data.score.justification || "Analysis based on transcript",
        confidence: data.score.confidence || "medium"
      },
      evidence: Array.isArray(data.evidence) ? data.evidence : [],
      kpiMapping: Array.isArray(data.kpiMapping) ? data.kpiMapping : [],
      gaps: Array.isArray(data.gaps) ? data.gaps : [],
      followUpQuestions: Array.isArray(data.followUpQuestions) ? data.followUpQuestions : []
    };
  }
}

module.exports = { ValidationUtils };