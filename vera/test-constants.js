// Test file to debug Vera constants loading
console.log('Testing Vera Constants Loading...');

try {
  // Test individual imports
  const { MODELS, ENVIRONMENTS, ARTISTIC_STYLES, SHOT_TYPES } = await import('./constants');

  console.log('MODELS length:', MODELS?.length);
  console.log('MODELS first 3:', MODELS?.slice(0, 3));
  console.log('ENVIRONMENTS length:', ENVIRONMENTS?.length);
  console.log('ENVIRONMENTS first 3:', ENVIRONMENTS?.slice(0, 3));
  console.log('ARTISTIC_STYLES length:', ARTISTIC_STYLES?.length);
  console.log('SHOT_TYPES length:', SHOT_TYPES?.length);

  if (MODELS?.length === 0) {
    console.error('ERROR: MODELS array is empty!');
  }
  if (ENVIRONMENTS?.length === 0) {
    console.error('ERROR: ENVIRONMENTS array is empty!');
  }

} catch (error) {
  console.error('Error loading constants:', error);
}
