// Quick validation test for model mappings
const fs = require('fs');

console.log("============================================");
console.log("CRITICAL MODEL MAPPING VERIFICATION");
console.log("============================================\n");

// Read subjects.ts file
const subjectsContent = fs.readFileSync('./concepts/subjects.ts', 'utf8');

// Check for Instagram models
const requiredModels = [
  { name: "Instagram Hourglass Influencer (Golden-Bronze) 36-26-38", measurements: "36-26-38", height: "5'7\"" },
  { name: "College Fresher Influencer (Honey-Bronze) 34-25-36", measurements: "34-25-36", height: "5'6\"" },
  { name: "Bollywood Actress Fantasy (Porcelain-Bronze) 36-24-36", measurements: "36-24-36", height: "5'8\"" },
  { name: "Morning Routine Influencer (Golden-Honey) 35-26-37", measurements: "35-26-37", height: "5'7\"" }
];

console.log("Checking Instagram model variants in subjects.ts:\n");

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
});

// Check concepts.ts for Instagram presets
const conceptsContent = fs.readFileSync('./concepts/concepts.ts', 'utf8');
const instagramPresetsFound = conceptsContent.includes("Instagram: Hourglass Influencer");

console.log("\nChecking concepts.ts integration:");
console.log(`Instagram presets added: ${instagramPresetsFound ? '✅' : '❌'}`);

// Check for model mapping files
const mappingFileExists = fs.existsSync('./concepts/modelToPresetMappings.ts');
const enhancementsFileExists = fs.existsSync('./concepts/modelSpecificEnhancements.ts');

console.log("\nChecking mapping files:");
console.log(`modelToPresetMappings.ts exists: ${mappingFileExists ? '✅' : '❌'}`);
console.log(`modelSpecificEnhancements.ts exists: ${enhancementsFileExists ? '✅' : '❌'}`);

console.log("\n============================================");
console.log("VALIDATION COMPLETE");
console.log("============================================");

// Final status
const allChecked = nameFound && measurementsFound && waistFound && hipsFound && heightFound &&
                   instagramPresetsFound && mappingFileExists && enhancementsFileExists;

if (allChecked) {
  console.log("\n✅ ALL CRITICAL MAPPINGS VERIFIED - READY FOR PRODUCTION");
} else {
  console.log("\n❌ SOME MAPPINGS MISSING - REVIEW REQUIRED");
}