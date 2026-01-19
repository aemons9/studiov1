#!/usr/bin/env node
import Replicate from 'replicate';
import { writeFile } from 'fs/promises';

const replicate = new Replicate({ auth: 'r8_L30cnEji7Zl6Mb8pm5OYPDfxGPkOonw4Gw2PL' });

// Ultra-safe copper scene - removed ALL problematic terms
const ULTRA_SAFE_COPPER = {
  name: 'Copper Warmth Editorial',
  prompt: 'fashion editorial photography of elegant Indian model (age 27, graceful silhouette, bronze complexion, styled dark hair) wearing rust-colored silk blouse near vintage copper decorative pot in rustic cabin interior, warm candlelit ambiance with golden tones, sophisticated lifestyle editorial aesthetic, shot on Hasselblad X2D medium format camera'
};

async function generate() {
  console.log('🎨 Final attempt: Copper Warmth Editorial (ultra-safe)');
  console.log('📝 Prompt:', ULTRA_SAFE_COPPER.prompt);

  const styles = ['fashion', 'portrait', 'neutral', 'stock_photo'];

  for (const style of styles) {
    console.log(`\n🎭 Trying style: ${style}`);
    try {
      const output = await replicate.run("leonardoai/lucid-origin", {
        input: {
          prompt: ULTRA_SAFE_COPPER.prompt,
          style: style,
          contrast: 'medium',
          aspect_ratio: '3:4',
          generation_mode: 'ultra',
          prompt_enhance: false,
          num_images: 1
        }
      });

      if (output && output[0]) {
        const filename = `generated-cabin-crystalline/cabin-v4-copper-warmth-${style}-${Date.now()}.png`;
        await writeFile(filename, output[0]);
        console.log(`✅ SUCCESS: ${filename}`);
        return;
      }
    } catch (error) {
      console.log(`❌ Failed: ${error.message.substring(0, 60)}`);
    }
    await new Promise(r => setTimeout(r, 2000));
  }
  console.log('\n❌ All styles failed for copper scene');
}

generate().catch(console.error);
