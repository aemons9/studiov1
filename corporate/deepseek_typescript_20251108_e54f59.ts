// validators/CorporateSafetyValidator.ts
export class CorporateSafetyValidator {
  private static corporateRedFlags = [
    'explicit sexual content',
    'non-consensual themes',
    'workplace harassment',
    'illegal activities',
    'harmful stereotypes'
  ];

  private static requiredCorporateContext = [
    'corporate',
    'executive',
    'professional',
    'business',
    'office',
    'boardroom'
  ];

  public static async validate(
    prompt: string, 
    state: CorporatePowerState
  ): Promise<ValidationResult> {
    const issues: string[] = [];

    // Check for red flags
    const redFlagIssues = this.checkRedFlags(prompt);
    issues.push(...redFlagIssues);

    // Verify corporate context
    if (!this.hasCorporateContext(prompt)) {
      issues.push('Missing sufficient corporate context');
    }

    // Validate artistic appropriateness
    const artisticIssues = this.validateArtisticAppropriateness(prompt, state);
    issues.push(...artisticIssues);

    // Check safety profile compliance
    const safetyIssues = this.checkSafetyCompliance(prompt, state.generationSettings.safetyProfile);
    issues.push(...safetyIssues);

    return {
      isValid: issues.length === 0,
      issues,
      warnings: this.generateWarnings(prompt, state)
    };
  }

  private static checkRedFlags(prompt: string): string[] {
    const issues: string[] = [];
    const lowerPrompt = prompt.toLowerCase();

    this.corporateRedFlags.forEach(flag => {
      if (lowerPrompt.includes(flag)) {
        issues.push(`Contains red flag: ${flag}`);
      }
    });

    return issues;
  }

  private static hasCorporateContext(prompt: string): boolean {
    const lowerPrompt = prompt.toLowerCase();
    return this.requiredCorporateContext.some(context => 
      lowerPrompt.includes(context)
    );
  }

  private static validateArtisticAppropriateness(
    prompt: string, 
    state: CorporatePowerState
  ): string[] {
    const issues: string[] = [];
    const { intimacyCalibration } = state;

    // Check if explicitness level matches corporate context
    if (intimacyCalibration.artisticExplicitness === 'artistically_explicit' &&
        intimacyCalibration.level > 8) {
      // Ensure sufficient artistic context for high-explicitness
      if (!this.hasStrongArtisticContext(prompt)) {
        issues.push('High explicitness requires stronger artistic context framing');
      }
    }

    return issues;
  }

  private static hasStrongArtisticContext(prompt: string): boolean {
    const artisticMarkers = [
      'fine-art',
      'masterful',
      'gallery',
      'exhibition',
      'award-winning',
      'editorial fashion',
      'artistic portrait'
    ];

    const lowerPrompt = prompt.toLowerCase();
    return artisticMarkers.some(marker => lowerPrompt.includes(marker));
  }
}