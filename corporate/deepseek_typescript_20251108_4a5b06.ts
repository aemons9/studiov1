// libraries/WardrobeLibrary.ts
export class WardrobeLibrary {
  private minimalWardrobes: Map<PowerDynamic, string>;
  private suggestiveWardrobes: Map<PowerDynamic, string>;
  private revealingWardrobes: Map<PowerDynamic, string>;
  private explicitWardrobes: Map<PowerDynamic, string>;

  constructor() {
    this.initializeWardrobes();
  }

  public getMinimalWardrobe(powerDynamic: PowerDynamic): string {
    return this.minimalWardrobes.get(powerDynamic) || this.minimalWardrobes.get('balanced')!;
  }

  public getSuggestiveWardrobe(powerDynamic: PowerDynamic): string {
    return this.suggestiveWardrobes.get(powerDynamic) || this.suggestiveWardrobes.get('balanced')!;
  }

  public getRevealingWardrobe(powerDynamic: PowerDynamic): string {
    return this.revealingWardrobes.get(powerDynamic) || this.revealingWardrobes.get('balanced')!;
  }

  public getExplicitWardrobe(powerDynamic: PowerDynamic): string {
    return this.explicitWardrobes.get(powerDynamic) || this.explicitWardrobes.get('balanced')!;
  }

  public getBalancedWardrobe(): string {
    return this.suggestiveWardrobes.get('balanced')!;
  }

  private initializeWardrobes(): void {
    // Minimal Wardrobes - Strategic coverage with maximum suggestion
    this.minimalWardrobes = new Map([
      ['submissive', 'A precisely tailored blazer worn open over delicate lace intimates, creating strategic negative space that emphasizes vulnerability within power structures.'],
      ['balanced', 'A custom-fitted power suit with the jacket worn open and sleeves rolled, paired with architectural heels that complete the professional yet personal statement.'],
      ['dominant', 'A structural leather harness worn under a transparent organza shirt, creating layers of authority and control while maintaining corporate appropriateness.']
    ]);

    // Suggestive Wardrobes - More revealing while maintaining professionalism
    this.suggestiveWardrobes = new Map([
      ['submissive', 'A silk blouse unbuttoned to the waist revealing a delicate crystal harness, the fabric slipping off one shoulder to suggest both vulnerability and invitation.'],
      ['balanced', 'A transparent power suit worn over a structural bodysuit with geometric cutouts, creating interplay between corporate armor and personal expression.'],
      ['dominant', 'A floor-length leather coat worn open over a minimalist leather harness, the ensemble commanding attention while revealing strategic glimpses of power.']
    ]);

    // Revealing Wardrobes - Pushing corporate boundaries artistically
    this.revealingWardrobes = new Map([
      ['submissive', 'A traditional sari draped to reveal more back than front, the delicate gold jewelry tracing the spine and creating a narrative of cultural power reclaimed.'],
      ['balanced', 'An architectural jumpsuit unzipped to the navel, the sides open to reveal the curve of waist and hip, celebrating form within corporate context.'],
      ['dominant', 'A custom-tailored vest worn open over matching trousers, the chest bare but for strategic shadow, redefining corporate dress codes through confidence.']
    ]);

    // Artistically Explicit Wardrobes - Maximum artistic expression
    this.explicitWardrobes = new Map([
      ['submissive', 'The corporate uniform deconstructed - a shirt collar and cuffs worn as jewelry, the power suit reduced to its symbolic elements while the form remains uncovered.'],
      ['balanced', 'Body as corporate canvas - strategic corporate tattoos mapping business processes across skin, the only clothing being the authority of position and confidence.'],
      ['dominant', 'Architectural body jewelry in platinum and onyx that maps power points across the form, creating corporate armor through adornment rather than concealment.']
    ]);
  }
}