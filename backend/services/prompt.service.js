const { SYSTEM_PROMPT } = require('../prompts/systemPrompt');

class PromptService {
  buildPrompt(transcript) {
    return `${SYSTEM_PROMPT}

USER INPUT (Supervisor Transcript):

"""
${transcript}
"""

Now analyze this transcript following ALL rules above.

Return ONLY valid JSON with this exact structure:

{
  "score": {
    "value": (number 1-10),
    "label": "(band label)",
    "band": "(Need Attention/Productivity/Performance)",
    "justification": "(reasoning with quote evidence)",
    "confidence": "(high/medium/low)"
  },
  "evidence": [
    {
      "quote": "(exact quote from transcript)",
      "signal": "(positive/negative/neutral)",
      "dimension": "(execution/systems_building/kpi_impact/change_management)",
      "interpretation": "(what this quote means)"
    }
  ],
  "kpiMapping": [
    {
      "kpi": "(KPI name)",
      "evidence": "(quote showing this KPI)",
      "systemOrPersonal": "(system or personal)"
    }
  ],
  "gaps": [
    {
      "dimension": "(missing dimension name)",
      "detail": "(what evidence is missing)"
    }
  ],
  "followUpQuestions": [
    {
      "question": "(question to ask supervisor)",
      "targetGap": "(which gap this addresses)",
      "lookingFor": "(what answer would reveal)"
    }
  ]
}

Remember: Be critical. Distinguish 6 vs 7. Don't over-score. Return ONLY JSON.`;
  }
}

module.exports = { PromptService };