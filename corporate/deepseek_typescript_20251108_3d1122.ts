// tests/CorporatePromptEngine.test.ts
import { CorporatePromptEngine } from '../engines/CorporatePromptEngine';
import { CorporatePowerState } from '../types/corporate';

describe('CorporatePromptEngine', () => {
  let engine: CorporatePromptEngine;

  beforeEach(() => {
    engine = new CorporatePromptEngine();
  });

  test('generates valid prompt for CEO in corporate environment', () => {
    const state: CorporatePowerState = {
      selectedRole: 'chief_executive',
      selectedEnvironment: 'corporation_mnc',
      intimacyCalibration: {
        level: 6,
        artisticExplicitness: 'suggestive',
        powerDynamic: 'dominant'
      },
      // ... rest of state
    };

    const prompt = engine.generateCorporatePrompt(state);
    
    expect(prompt).toContain('CEO');
    expect(prompt).toContain('corporate');
    expect(prompt).toContain('executive');
    expect(prompt).not.toContain('explicit sexual content');
  });

  test('applies safety context appropriately', () => {
    const state: CorporatePowerState = {
      // ... state with conservative safety profile
      generationSettings: {
        safetyProfile: 'corporate_conservative',
        // ... other settings
      }
    };

    const prompt = engine.generateCorporatePrompt(state);
    
    expect(prompt).toContain('Professional corporate context');
    expect(prompt).toContain('sophisticated business environment');
  });

  test('handles all role and environment combinations', () => {
    const roles = ['chief_executive', 'board_member', 'personal_secretary'] as CorporateRole[];
    const environments = ['corporation_mnc', 'hotel_chain', 'real_estate'] as OfficeEnvironmentType[];

    roles.forEach(role => {
      environments.forEach(environment => {
        const state: CorporatePowerState = {
          selectedRole: role,
          selectedEnvironment: environment,
          // ... rest of state with default values
        };

        expect(() => {
          engine.generateCorporatePrompt(state);
        }).not.toThrow();
      });
    });
  });
});