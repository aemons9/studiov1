// assurance/CorporateQualityAssurance.ts
export class CorporateQualityAssurance {
  public static async assessQuality(
    prompt: string,
    state: CorporatePowerState
  ): Promise<QualityAssessment> {
    const scores = {
      corporateContext: this.assessCorporateContext(prompt),
      artisticMerit: this.assessArtisticMerit(prompt),
      technicalExcellence: this.assessTechnicalExcellence(prompt),
      safetyCompliance: this.assessSafetyCompliance(prompt),
      roleFidelity: this.assessRoleFidelity(prompt, state.selectedRole)
    };

    const overallScore = Object.values(scores).reduce((a, b) => a + b, 0) / Object.values(scores).length;

    return {
      overallScore,
      categoryScores: scores,
      recommendations: this.generateRecommendations(scores, prompt),
      passed: overallScore >= 0.7
    };
  }

  private static assessCorporateContext(prompt: string): number {
    const corporateMarkers = [
      'corporate', 'executive', 'boardroom', 'office', 'professional',
      'business', 'CEO', 'director', 'manager', 'corporate'
    ];

    const lowerPrompt = prompt.toLowerCase();
    const foundMarkers = corporateMarkers.filter(marker => 
      lowerPrompt.includes(marker)
    ).length;

    return Math.min(foundMarkers / 5, 1); // Max 1.0 score
  }

  private static assessRoleFidelity(prompt: string, role: CorporateRole): number {
    const roleSpecificMarkers = {
      chief_executive: ['CEO', 'chief executive', 'corporate leader', 'strategic'],
      board_member: ['board', 'director', 'governance', 'oversight'],
      personal_secretary: ['assistant', 'secretary', 'support', 'coordination'],
      hr_executive: ['HR', 'human resources', 'personnel', 'talent'],
      design_executive: ['design', 'creative', 'aesthetic', 'concept'],
      government_official: ['government', 'minister', 'policy', 'public service'],
      lawyer: ['legal', 'attorney', 'counsel', 'case', 'brief']
    };

    const markers = roleSpecificMarkers[role];
    const lowerPrompt = prompt.toLowerCase();
    const foundMarkers = markers.filter(marker => 
      lowerPrompt.includes(marker.toLowerCase())
    ).length;

    return Math.min(foundMarkers / markers.length, 1);
  }

  private static generateRecommendations(scores: QualityScores, prompt: string): string[] {
    const recommendations: string[] = [];

    if (scores.corporateContext < 0.8) {
      recommendations.push('Add more corporate context markers for better role definition');
    }

    if (scores.artisticMerit < 0.7) {
      recommendations.push('Enhance artistic context with master photographer references');
    }

    if (scores.technicalExcellence < 0.8) {
      recommendations.push('Include more technical photographic specifications');
    }

    if (scores.roleFidelity < 0.9) {
      recommendations.push('Strengthen role-specific terminology and context');
    }

    return recommendations;
  }
}