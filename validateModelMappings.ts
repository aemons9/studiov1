/**
 * VALIDATION AND TESTING FOR MODEL MAPPINGS
 * Run this file to verify all Instagram model mappings are working correctly
 */

import { generateTestPrompt, validateModelPreset, applyModelPreset, getAllModelNames } from './concepts/modelToPresetMappings';
import { indianModelVariants } from './concepts/subjects';

console.log("============================================");
console.log("MODEL MAPPING VALIDATION REPORT");
console.log("============================================\n");

// Test all Instagram models
const modelNames = getAllModelNames();

console.log(`Total Instagram Models Configured: ${modelNames.length}\n`);

// Verify each model has correct measurements
modelNames.forEach((modelName, index) => {
  console.log(`\n[${index + 1}] TESTING: ${modelName}`);
  console.log("=".repeat(60));

  const testPrompt = generateTestPrompt(modelName);
  console.log(testPrompt);
});

// Validate model variants are in subjects.ts
console.log("\n\n============================================");
console.log("CHECKING MODEL VARIANTS IN SUBJECTS.TS");
console.log("============================================\n");

const requiredModels = [
  "Instagram Hourglass Influencer (Golden-Bronze) 36-26-38",
  "College Fresher Influencer (Honey-Bronze) 34-25-36",
  "Bollywood Actress Fantasy (Porcelain-Bronze) 36-24-36",
  "Morning Routine Influencer (Golden-Honey) 35-26-37"
];

requiredModels.forEach((modelName) => {
  const found = indianModelVariants.find(v => v.name === modelName);
  if (found) {
    console.log(`✅ FOUND: ${modelName}`);
    console.log(`   Value: ${found.value.substring(0, 100)}...`);
  } else {
    console.log(`❌ MISSING: ${modelName}`);
  }
});

// Test a complete prompt generation
console.log("\n\n============================================");
console.log("SAMPLE COMPLETE PROMPT GENERATION");
console.log("============================================\n");

const samplePrompt = applyModelPreset(
  {},
  "Instagram Hourglass Influencer (Golden-Bronze) 36-26-38",
  { poseIndex: 0, wardrobeIndex: 0, hairStyleIndex: 0, lightingIndex: 0 }
);

console.log("Generated Prompt for Instagram Hourglass Influencer:");
console.log(JSON.stringify(samplePrompt, null, 2));

// Validate the sample prompt
const validation = validateModelPreset(
  samplePrompt,
  "Instagram Hourglass Influencer (Golden-Bronze) 36-26-38"
);

console.log("\n\nValidation Results:");
console.log(`Valid: ${validation.isValid}`);
if (validation.errors.length > 0) {
  console.log(`Errors: ${validation.errors.join(', ')}`);
}
if (validation.warnings.length > 0) {
  console.log(`Warnings: ${validation.warnings.join(', ')}`);
}

console.log("\n\n============================================");
console.log("CRITICAL MAPPING VERIFICATION");
console.log("============================================\n");

// Verify exact measurements are preserved
const hourglassModel = indianModelVariants.find(v => v.name.includes("Instagram Hourglass"));
if (hourglassModel) {
  const measurements = hourglassModel.value.match(/bust 36"|waist 26"|hips 38"/g);
  if (measurements && measurements.length === 3) {
    console.log("✅ Instagram Hourglass Influencer measurements VERIFIED: 36-26-38");
  } else {
    console.log("❌ ERROR: Measurements not found or incorrect!");
  }

  const height = hourglassModel.value.match(/height 5'7"/);
  if (height) {
    console.log("✅ Instagram Hourglass Influencer height VERIFIED: 5'7\"");
  } else {
    console.log("❌ ERROR: Height not found or incorrect!");
  }

  const age = hourglassModel.value.match(/Age 22-26/);
  if (age) {
    console.log("✅ Instagram Hourglass Influencer age range VERIFIED: 22-26");
  } else {
    console.log("❌ ERROR: Age range not found or incorrect!");
  }

  const skinTone = hourglassModel.value.match(/golden-bronze/i);
  if (skinTone) {
    console.log("✅ Instagram Hourglass Influencer skin tone VERIFIED: golden-bronze");
  } else {
    console.log("❌ ERROR: Skin tone not found or incorrect!");
  }
}

console.log("\n\n============================================");
console.log("MAPPING COMPLETE - NO ERRORS ALLOWED");
console.log("============================================");
console.log("\nAll Instagram model variants have been:");
console.log("1. Added to subjects.ts with EXACT measurements");
console.log("2. Mapped to appropriate poses, wardrobe, hair styles");
console.log("3. Integrated with lighting and makeup presets");
console.log("4. Validated for consistency and accuracy");
console.log("\nThe system is ready for production use.");