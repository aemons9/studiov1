// tests/integration/CorporateGeneration.test.ts
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { App } from '../../App';
import { CorporatePromptEngine } from '../../engines/CorporatePromptEngine';

describe('Corporate Generation Integration', () => {
  test('full corporate generation workflow', async () => {
    render(<App />);
    
    // Enter corporate mode
    const corporateButton = screen.getByText('💼 Enter Corporate Mode');
    fireEvent.click(corporateButton);
    
    // Select CEO role
    const ceoButton = screen.getByText('chief executive');
    fireEvent.click(ceoButton);
    
    // Select corporate environment
    const corporateEnvButton = screen.getByText('corporation mnc');
    fireEvent.click(corporateEnvButton);
    
    // Set intimacy level
    const intimacySlider = screen.getByLabelText(/intimacy level/i);
    fireEvent.change(intimacySlider, { target: { value: '7' } });
    
    // Generate
    const generateButton = screen.getByText('Generate Corporate');
    fireEvent.click(generateButton);
    
    // Wait for generation to complete
    await waitFor(() => {
      expect(screen.getByAltText(/corporate generation/i)).toBeInTheDocument();
    }, { timeout: 10000 });
  });
});