class FallbackParser {
  parse(rawOutput) {
    // Try to extract JSON from markdown code blocks
    let cleanOutput = rawOutput;
    
    // Remove markdown code blocks
    const codeBlockMatch = rawOutput.match(/```json\n([\s\S]*?)\n```/);
    if (codeBlockMatch) {
      cleanOutput = codeBlockMatch[1];
    } else {
      const anyCodeMatch = rawOutput.match(/```\n([\s\S]*?)\n```/);
      if (anyCodeMatch) {
        cleanOutput = anyCodeMatch[1];
      }
    }

    // Try parsing
    try {
      return JSON.parse(cleanOutput);
    } catch (firstError) {
      // Try to repair common issues
      const repaired = this.repairJSON(cleanOutput);
      try {
        return JSON.parse(repaired);
      } catch (secondError) {
        console.error('Failed to parse JSON after repair');
        return this.getFallbackResponse();
      }
    }
  }

  repairJSON(brokenJSON) {
    // Remove trailing commas
    let repaired = brokenJSON.replace(/,\s*}/g, '}');
    repaired = repaired.replace(/,\s*]/g, ']');
    
    // Add missing quotes around keys
    repaired = repaired.replace(/([{,]\s*)(\w+)(\s*:)/g, '$1"$2"$3');
    
    return repaired;
  }

  getFallbackResponse() {
    return {
      score: {
        value: 5,
        label: "Consistent Performer",
        band: "Productivity",
        justification: "Unable to parse complete analysis. Based on available evidence.",
        confidence: "low"
      },
      evidence: [],
      kpiMapping: [],
      gaps: [
        {
          dimension: "parsing_error",
          detail: "Raw output could not be parsed. Review transcript manually."
        }
      ],
      followUpQuestions: [
        {
          question: "What specific systems has the Fellow built?",
          targetGap: "systems_building",
          lookingFor: "Evidence of SOPs, trackers, or workflows"
        }
      ]
    };
  }
}

module.exports = { FallbackParser };