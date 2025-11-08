// optimizers/CorporateSafetyOptimizer.ts
export class CorporateSafetyOptimizer {
  private corporateSafeTerms: Map<string, string[]>;
  private artisticContexts: string[];

  constructor() {
    this.initializeSafeTerms();
    this.initializeArtisticContexts();
  }

  public optimizeForCorporateContext(prompt: string, safetyProfile: string): string {
    let optimizedPrompt = prompt;

    // Apply term replacement
    optimizedPrompt = this.replaceUnsafeTerms(optimizedPrompt);
    
    // Add appropriate artistic context
    optimizedPrompt = this.addArtisticContext(optimizedPrompt, safetyProfile);
    
    // Apply corporate safety framing
    optimizedPrompt = this.applySafetyFraming(optimizedPrompt, safetyProfile);
    
    return optimizedPrompt;
  }

  private replaceUnsafeTerms(prompt: string): string {
    let safePrompt = prompt;
    
    this.corporateSafeTerms.forEach((safeAlternatives, unsafeTerm) => {
      const regex = new RegExp(`\\b${unsafeTerm}\\b`, 'gi');
      safePrompt = safePrompt.replace(regex, () => {
        return safeAlternatives[Math.floor(Math.random() * safeAlternatives.length)];
      });
    });
    
    return safePrompt;
  }

  private addArtisticContext(prompt: string, safetyProfile: string): string {
    const context = this.selectArtisticContext(safetyProfile);
    return `${context} ${prompt}`;
  }

  private applySafetyFraming(prompt: string, safetyProfile: string): string {
    const framing = this.getSafetyFraming(safetyProfile);
    return `${prompt} ${framing}`;
  }

  private initializeSafeTerms(): void {
    this.corporateSafeTerms = new Map([
      ['naked', ['uncovered', 'revealed form', 'natural state']],
      ['nude', ['unadorned', 'in natural state', 'without covering']],
      ['sexual', ['sensual', 'intimate', 'personal']],
      ['erotic', ['artistically sensual', 'aesthetically intimate', 'sensually artistic']],
      ['provocative', ['bold', 'confrontational', 'powerfully expressive']],
      ['seductive', ['compelling', 'magnetic', 'captivating']],
      ['intimate', ['personal', 'focused', 'concentrated']],
      ['revealing', ['strategically transparent', 'architecturally open', 'artistically uncovered']]
    ]);
  }

  private initializeArtisticContexts(): void {
    this.artisticContexts = [
      'Award-winning corporate fashion photography',
      'Masterful executive portraiture with artistic sensibility',
      'Sophisticated editorial fashion in corporate environments',
      'Fine-art study of power dynamics in professional spaces',
      'Contemporary fashion narrative exploring corporate identity'
    ];
  }

  private selectArtisticContext(safetyProfile: string): string {
    const index = safetyProfile === 'corporate_conservative' ? 0 : 
                  safetyProfile === 'editorial_balanced' ? 2 : 4;
    return this.artisticContexts[index];
  }

  private getSafetyFraming(safetyProfile: string): string {
    const framings = {
      corporate_conservative: 'Professional corporate context, sophisticated business environment, executive fashion story.',
      editorial_balanced: 'Editorial fashion context, artistic corporate narrative, sophisticated professional aesthetic.',
      artistic_progressive: 'Fine-art corporate exploration, boundary-pushing professional aesthetics, gallery-quality execution.'
    };
    return framings[safetyProfile] || framings.editorial_balanced;
  }
}