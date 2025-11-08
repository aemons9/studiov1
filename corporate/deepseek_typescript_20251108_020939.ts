// engines/CorporatePromptEngine.ts
export class CorporatePromptEngine {
  private roleProfiles: Map<CorporateRole, CorporateRoleProfile>;
  private environmentTemplates: Map<OfficeEnvironmentType, OfficeEnvironment>;
  private wardrobeLibrary: WardrobeLibrary;
  private safetyOptimizer: CorporateSafetyOptimizer;

  constructor() {
    this.initializeProfiles();
    this.wardrobeLibrary = new WardrobeLibrary();
    this.safetyOptimizer = new CorporateSafetyOptimizer();
  }

  public generateCorporatePrompt(state: CorporatePowerState): string {
    try {
      const role = this.roleProfiles.get(state.selectedRole);
      const environment = this.environmentTemplates.get(state.selectedEnvironment);
      
      if (!role || !environment) {
        throw new Error('Invalid role or environment selection');
      }

      const baseTemplate = this.constructBaseTemplate(role, environment);
      const intimacyEnhanced = this.applyIntimacyCalibration(baseTemplate, state.intimacyCalibration);
      const modelSpecific = this.applyModelVariant(intimacyEnhanced, state.modelVariants);
      const wardrobeApplied = this.applyWardrobeSelection(modelSpecific, state);
      const safetyOptimized = this.applySafetyContext(wardrobeApplied, state.generationSettings);
      
      return this.finalizePrompt(safetyOptimized, state);
    } catch (error) {
      console.error('Corporate prompt generation failed:', error);
      throw new Error(`Failed to generate corporate prompt: ${error.message}`);
    }
  }

  private constructBaseTemplate(role: CorporateRoleProfile, environment: OfficeEnvironment): string {
    return `
Award-winning corporate fashion portrait of an Indian ${this.getRoleTitle(role.role)} in ${this.getEnvironmentDescription(environment.type)}. 
${this.getSettingDescription(environment)} 
${this.getPowerDynamicDescription(role)} 
${this.getCorporateContext(role, environment)}`;
  }

  private applyIntimacyCalibration(template: string, calibration: IntimacyCalibration): string {
    const wardrobeTemplate = this.getWardrobeTemplate(calibration);
    const poseTemplate = this.getPoseTemplate(calibration);
    
    return template
      .replace(/WARDROBE_PLACEHOLDER/g, wardrobeTemplate)
      .replace(/POSE_PLACEHOLDER/g, poseTemplate)
      .replace(/INTIMACY_LEVEL/g, calibration.level.toString());
  }

  private getWardrobeTemplate(calibration: IntimacyCalibration): string {
    switch(calibration.artisticExplicitness) {
      case 'minimal':
        return this.wardrobeLibrary.getMinimalWardrobe(calibration.powerDynamic);
      case 'suggestive':
        return this.wardrobeLibrary.getSuggestiveWardrobe(calibration.powerDynamic);
      case 'revealing':
        return this.wardrobeLibrary.getRevealingWardrobe(calibration.powerDynamic);
      case 'artistically_explicit':
        return this.wardrobeLibrary.getExplicitWardrobe(calibration.powerDynamic);
      default:
        return this.wardrobeLibrary.getBalancedWardrobe();
    }
  }

  private applySafetyContext(prompt: string, settings: GenerationSettings): string {
    return this.safetyOptimizer.optimizeForCorporateContext(prompt, settings.safetyProfile);
  }

  private finalizePrompt(prompt: string, state: CorporatePowerState): string {
    const technicalSpecs = this.getTechnicalSpecifications(state.generationSettings);
    const artisticContext = this.getArtisticContext(state);
    
    return `${artisticContext} ${prompt} ${technicalSpecs}`;
  }

  // Helper methods for template construction
  private getRoleTitle(role: CorporateRole): string {
    const titles = {
      chief_executive: 'CEO',
      board_member: 'board member',
      personal_secretary: 'personal secretary',
      hr_executive: 'HR director',
      design_executive: 'creative director',
      government_official: 'government minister',
      lawyer: 'senior partner'
    };
    return titles[role];
  }

  private initializeProfiles(): void {
    this.roleProfiles = new Map();
    this.environmentTemplates = new Map();
    
    CORPORATE_ROLES.forEach(role => this.roleProfiles.set(role.role, role));
    OFFICE_ENVIRONMENTS.forEach(env => this.environmentTemplates.set(env.type, env));
  }
}