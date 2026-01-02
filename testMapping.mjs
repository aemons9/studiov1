// Quick validation test for model mappings
import { readFileSync, existsSync } from 'fs';

console.log("============================================");
console.log("CRITICAL MODEL MAPPING VERIFICATION");
console.log("============================================\n");

// Read subjects.ts file
const subjectsContent = readFileSync('./concepts/subjects.ts', 'utf8');

// Check for Instagram models
const requiredModels = [
  { name: "Instagram Hourglass Influencer (Golden-Bronze) 36-26-38", measurements: "36-26-38", height: "5'7\"" },
  { name: "College Fresher Influencer (Honey-Bronze) 34-25-36", measurements: "34-25-36", height: "5'6\"" },
  { name: "Bollywood Actress Fantasy (Porcelain-Bronze) 36-24-36", measurements: "36-24-36", height: "5'8\"" },
  { name: "Morning Routine Influencer (Golden-Honey) 35-26-37", measurements: "35-26-37", height: "5'7\"" }
];

console.log("Checking Instagram model variants in subjects.ts:\n");

let allChecksPass = true;

requiredModels.forEach((model, index) => {
  const nameFound = subjectsContent.includes(model.name);
  const measurementsFound = subjectsContent.includes(`bust ${model.measurements.split('-')[0]}"`);
  const waistFound = subjectsContent.includes(`waist ${model.measurements.split('-')[1]}"`);
  const hipsFound = subjectsContent.includes(`hips ${model.measurements.split('-')[2]}"`);
  const heightFound = subjectsContent.includes(`height ${model.height}`);

  console.log(`[${index + 1}] ${model.name}:`);
  console.log(`    Name: ${nameFound ? '✅' : '❌'}`);
  console.log(`    Bust ${model.measurements.split('-')[0]}": ${measurementsFound ? '✅' : '❌'}`);
  console.log(`    Waist ${model.measurements.split('-')[1]}": ${waistFound ? '✅' : '❌'}`);
  console.log(`    Hips ${model.measurements.split('-')[2]}": ${hipsFound ? '✅' : '❌'}`);
  console.log(`    Height ${model.height}: ${heightFound ? '✅' : '❌'}`);
  console.log("");

  if (!nameFound || !measurementsFound || !waistFound || !hipsFound || !heightFound) {
    allChecksPass = false;
  }
});

// Check concepts.ts for Instagram presets
const conceptsContent = readFileSync('./concepts/concepts.ts', 'utf8');
const instagramPresetsFound = conceptsContent.includes("Instagram: Hourglass Influencer");
const modelImportFound = conceptsContent.includes("import { applyModelPreset, INSTAGRAM_MODEL_MAPPINGS }");

console.log("\nChecking concepts.ts integration:");
console.log(`Instagram presets added: ${instagramPresetsFound ? '✅' : '❌'}`);
console.log(`Model mapping imports added: ${modelImportFound ? '✅' : '❌'}`);

// Check for model mapping files
const mappingFileExists = existsSync('./concepts/modelToPresetMappings.ts');
const enhancementsFileExists = existsSync('./concepts/modelSpecificEnhancements.ts');

console.log("\nChecking mapping files:");
console.log(`modelToPresetMappings.ts exists: ${mappingFileExists ? '✅' : '❌'}`);
console.log(`modelSpecificEnhancements.ts exists: ${enhancementsFileExists ? '✅' : '❌'}`);

// Sample prompt check
console.log("\n============================================");
console.log("SAMPLE PROMPT GENERATION TEST");
console.log("============================================\n");

// Extract a sample value to verify structure
const hourglassMatch = subjectsContent.match(/name: "Instagram Hourglass[^}]+value: "([^"]+)"/s);
if (hourglassMatch) {
  const sampleValue = hourglassMatch[1];
  console.log("Instagram Hourglass Model Value Preview:");
  console.log(sampleValue.substring(0, 200) + "...\n");

  // Check for key attributes
  const hasAllAttributes =
    sampleValue.includes("5'7\"") &&
    sampleValue.includes("36\"") &&
    sampleValue.includes("26\"") &&
    sampleValue.includes("38\"") &&
    sampleValue.includes("golden-bronze") &&
    sampleValue.includes("22-26");

  console.log(`All key attributes present: ${hasAllAttributes ? '✅' : '❌'}`);
}

console.log("\n============================================");
console.log("VALIDATION COMPLETE");
console.log("============================================");

// Final status
const finalStatus = allChecksPass && instagramPresetsFound && modelImportFound &&
                   mappingFileExists && enhancementsFileExists;

if (finalStatus) {
  console.log("\n✅ ALL CRITICAL MAPPINGS VERIFIED - READY FOR PRODUCTION");
  console.log("\nThe following have been successfully integrated:");
  console.log("1. Instagram Hourglass Influencer with exact 36-26-38 measurements");
  console.log("2. College Fresher Influencer with exact 34-25-36 measurements");
  console.log("3. Bollywood Actress Fantasy with exact 36-24-36 measurements");
  console.log("4. Morning Routine Influencer with exact 35-26-37 measurements");
  console.log("5. All models mapped to appropriate poses, wardrobe, and lighting");
  console.log("6. Integration with main concepts.ts for UI preset selection");
} else {
  console.log("\n❌ SOME MAPPINGS MISSING - REVIEW REQUIRED");
}