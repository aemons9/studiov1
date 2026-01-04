#!/usr/bin/env node

/**
 * VERALABS LYRIA 2 MUSIC GENERATOR
 * Creates professional background music for reels using Google's Lyria 2 AI
 *
 * Usage:
 *   node scripts/lyriaMusician.mjs
 *
 * Requires: OAuth token with Vertex AI access
 */

import { execSync } from 'child_process';
import { existsSync, mkdirSync, writeFileSync, readFileSync, readdirSync } from 'fs';
import { join, basename } from 'path';
import crypto from 'crypto';

// ═══════════════════════════════════════════════════════════════════════════
// CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════

const OUTPUT_DIR = '/home/ecolex/version1/veralabs-music';
const REELS_DIR = '/home/ecolex/version1/veralabs-reels';
const FFMPEG = '/home/ecolex/version1/node_modules/@ffmpeg-installer/linux-x64/ffmpeg';

// Google Cloud config - will be loaded from env or credentials file
let PROJECT_ID = '';
let LOCATION = 'us-central1';

// Service account credentials path
const CREDENTIALS_PATH = '/home/ecolex/version1/studiov-drive-ingest-870127e5767e.json';
const ENV_CREDENTIALS = process.env.GOOGLE_APPLICATION_CREDENTIALS;

// ═══════════════════════════════════════════════════════════════════════════
// MUSIC PROMPTS FOR EACH AESTHETIC
// ═══════════════════════════════════════════════════════════════════════════

const MUSIC_AESTHETICS = {
  boudoir: {
    name: 'Boudoir',
    prompts: [
      'Intimate sensual jazz with soft saxophone, gentle piano, brushed drums, warm bass, romantic mood, slow tempo 70 BPM, elegant lounge atmosphere, subtle strings',
      'Dreamy R&B instrumental with silky synth pads, soft Rhodes piano, gentle hi-hats, intimate bass groove, sensual mood, 75 BPM, candlelit atmosphere',
      'Sultry neo-soul with warm electric piano, gentle finger snaps, soft bass, subtle percussion, intimate and cozy, 68 BPM, bedroom atmosphere',
    ],
    style: 'intimate sensual warm',
  },

  midnightMuse: {
    name: 'Midnight Muse',
    prompts: [
      'Mysterious dark ambient electronic with deep bass, ethereal synth pads, subtle glitchy percussion, atmospheric reverb, enigmatic mood, 85 BPM, nocturnal vibes',
      'Cinematic dark wave with haunting synth arpeggios, deep pulsing bass, minimal drums, mysterious atmosphere, 90 BPM, moonlit mystique',
      'Atmospheric trip-hop with vinyl crackle, deep bass, ethereal female vocal samples, mysterious piano, 80 BPM, late night introspection',
    ],
    style: 'mysterious dark ethereal',
  },

  goldenHour: {
    name: 'Golden Hour',
    prompts: [
      'Warm acoustic guitar with soft strings, gentle piano, light percussion, dreamy pads, golden sunset vibes, 85 BPM, ethereal and uplifting',
      'Cinematic orchestral with warm strings, soft brass, gentle harp glissandos, uplifting mood, golden light atmosphere, 80 BPM, magical hour',
      'Chillwave electronic with warm analog synths, soft arpeggios, gentle drums, nostalgic warmth, 88 BPM, sunset glow aesthetic',
    ],
    style: 'warm ethereal golden',
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// AUTHENTICATION
// ═══════════════════════════════════════════════════════════════════════════

async function getAccessToken() {
  console.log('🔐 Getting OAuth access token...');

  // Try to load service account credentials
  let credentials = null;

  // Check for env variable
  if (ENV_CREDENTIALS) {
    try {
      credentials = JSON.parse(ENV_CREDENTIALS);
      console.log('   ✓ Using credentials from environment');
    } catch {
      // ENV_CREDENTIALS might be a path
      if (existsSync(ENV_CREDENTIALS)) {
        credentials = JSON.parse(readFileSync(ENV_CREDENTIALS, 'utf8'));
        console.log('   ✓ Using credentials from path in environment');
      }
    }
  }

  // Check for credentials file
  if (!credentials && existsSync(CREDENTIALS_PATH)) {
    credentials = JSON.parse(readFileSync(CREDENTIALS_PATH, 'utf8'));
    console.log('   ✓ Using credentials from service-account.json');
  }

  // Check for JSON file with different name
  if (!credentials) {
    const files = readdirSync('/home/ecolex/version1').filter(f => f.endsWith('.json') && f.includes('service'));
    if (files.length > 0) {
      credentials = JSON.parse(readFileSync(join('/home/ecolex/version1', files[0]), 'utf8'));
      console.log(`   ✓ Using credentials from ${files[0]}`);
    }
  }

  if (!credentials) {
    throw new Error(
      '❌ No service account credentials found!\n\n' +
      'Please provide credentials in one of these ways:\n' +
      '1. Set GOOGLE_APPLICATION_CREDENTIALS environment variable\n' +
      '2. Create service-account.json in project root\n' +
      '3. Run: gcloud auth application-default login'
    );
  }

  // Extract project ID
  PROJECT_ID = credentials.project_id;
  console.log(`   📋 Project ID: ${PROJECT_ID}`);

  // Create self-signed JWT
  const privateKey = credentials.private_key.replace(/\\n/g, '\n');

  const header = {
    alg: 'RS256',
    typ: 'JWT',
    kid: credentials.private_key_id
  };

  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: credentials.client_email,
    sub: credentials.client_email,
    aud: 'https://aiplatform.googleapis.com/',
    iat: now,
    exp: now + 3600
  };

  const encodedHeader = Buffer.from(JSON.stringify(header)).toString('base64url');
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signatureInput = `${encodedHeader}.${encodedPayload}`;

  const sign = crypto.createSign('RSA-SHA256');
  sign.update(signatureInput);
  sign.end();
  const signature = sign.sign(privateKey, 'base64url');

  const jwt = `${signatureInput}.${signature}`;

  console.log('   ✅ JWT token generated');
  return jwt;
}

// ═══════════════════════════════════════════════════════════════════════════
// LYRIA 2 API FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

async function generateMusic(prompt, accessToken, sampleCount = 1) {
  const endpoint = `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/publishers/google/models/lyria-002:predict`;

  console.log(`   🎵 Generating music...`);
  console.log(`   📝 Prompt: "${prompt.substring(0, 80)}..."`);

  const requestBody = {
    instances: [
      {
        prompt: prompt
      }
    ],
    parameters: {
      sample_count: sampleCount
    }
  };

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      console.error('   ❌ Lyria API Error:', response.status, error);

      if (response.status === 403) {
        throw new Error(
          '🔒 Permission denied. Ensure:\n' +
          '1. Vertex AI API is enabled\n' +
          '2. Your service account has "Vertex AI User" role\n' +
          '3. Lyria 2 is available in your region'
        );
      }

      throw new Error(`Lyria API error: ${response.status}`);
    }

    const data = await response.json();

    console.log('   📦 Response structure:', JSON.stringify(data, null, 2).substring(0, 500));

    if (!data.predictions || data.predictions.length === 0) {
      throw new Error('No audio generated');
    }

    // Check different possible response formats
    const audioData = data.predictions.map(p => {
      // Try different field names
      if (p.audioContent) return p.audioContent;
      if (p.bytesBase64Encoded) return p.bytesBase64Encoded;
      if (p.audio) return p.audio;
      if (p.content) return p.content;
      console.log('   🔍 Prediction keys:', Object.keys(p));
      return null;
    }).filter(Boolean);

    if (audioData.length === 0) {
      console.log('   🔍 Full predictions:', JSON.stringify(data.predictions, null, 2));
      throw new Error('Could not extract audio from response');
    }

    return audioData;

  } catch (error) {
    console.error('   ❌ Music generation failed:', error.message);
    throw error;
  }
}

function saveWavFile(base64Audio, outputPath) {
  const buffer = Buffer.from(base64Audio, 'base64');
  writeFileSync(outputPath, buffer);
  console.log(`   💾 Saved: ${basename(outputPath)}`);
}

// ═══════════════════════════════════════════════════════════════════════════
// VIDEO PROCESSING
// ═══════════════════════════════════════════════════════════════════════════

function getVideoDuration(videoPath) {
  try {
    const result = execSync(
      `${FFMPEG} -i "${videoPath}" 2>&1 | grep Duration`,
      { stdio: 'pipe' }
    ).toString();

    const match = result.match(/Duration: (\d+):(\d+):(\d+\.\d+)/);
    if (match) {
      return parseFloat(match[1]) * 3600 + parseFloat(match[2]) * 60 + parseFloat(match[3]);
    }
    return 0;
  } catch {
    return 0;
  }
}

function addMusicToVideo(videoPath, audioPath, outputPath) {
  console.log(`   🎬 Adding music to ${basename(videoPath)}...`);

  const videoDuration = getVideoDuration(videoPath);
  console.log(`   ⏱️  Video duration: ${videoDuration.toFixed(1)}s`);

  // If video is longer than 30s, we need to loop the audio
  const loopCount = Math.ceil(videoDuration / 30);

  let cmd;
  if (loopCount > 1) {
    // Loop audio and trim to video length, mix at lower volume
    cmd = `${FFMPEG} -y -i "${videoPath}" -stream_loop ${loopCount} -i "${audioPath}" -filter_complex "[1:a]volume=0.4,afade=t=in:st=0:d=2,afade=t=out:st=${videoDuration - 2}:d=2[a]" -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k -t ${videoDuration} "${outputPath}" 2>/dev/null`;
  } else {
    // Single audio, trim to video length
    cmd = `${FFMPEG} -y -i "${videoPath}" -i "${audioPath}" -filter_complex "[1:a]volume=0.4,afade=t=in:st=0:d=2,afade=t=out:st=${videoDuration - 2}:d=2[a]" -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k -t ${videoDuration} "${outputPath}" 2>/dev/null`;
  }

  try {
    execSync(cmd, { stdio: 'pipe' });
    console.log(`   ✅ Output: ${basename(outputPath)}`);
    return true;
  } catch (error) {
    console.error(`   ❌ Failed to add music`);
    return false;
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN GENERATOR
// ═══════════════════════════════════════════════════════════════════════════

async function generate() {
  console.log(`
══════════════════════════════════════════════════════════════════════
   🎵 VERALABS LYRIA 2 MUSIC GENERATOR
   Creating Professional Background Music
══════════════════════════════════════════════════════════════════════
`);

  // Ensure output directory
  if (!existsSync(OUTPUT_DIR)) mkdirSync(OUTPUT_DIR, { recursive: true });

  // Get access token
  let accessToken;
  try {
    accessToken = await getAccessToken();
  } catch (error) {
    console.error(error.message);
    return;
  }

  console.log('\n──────────────────────────────────────────────────────────────────────');
  console.log('🎵 GENERATING MUSIC TRACKS');
  console.log('──────────────────────────────────────────────────────────────────────\n');

  const generatedTracks = {};

  // Generate music for each aesthetic
  for (const [aesthetic, config] of Object.entries(MUSIC_AESTHETICS)) {
    console.log(`\n   🎭 ${config.name.toUpperCase()}`);
    console.log('   ─────────────────────────────────────────────');

    generatedTracks[aesthetic] = [];

    // Generate one track per prompt (3 variations per aesthetic)
    for (let i = 0; i < config.prompts.length; i++) {
      const prompt = config.prompts[i];
      const outputPath = join(OUTPUT_DIR, `${aesthetic}_track_${i + 1}.wav`);

      console.log(`\n   Track ${i + 1}/${config.prompts.length}:`);

      try {
        const audioData = await generateMusic(prompt, accessToken, 1);

        if (audioData && audioData.length > 0) {
          saveWavFile(audioData[0], outputPath);
          generatedTracks[aesthetic].push(outputPath);
        }

        // Rate limiting - wait between requests
        await new Promise(resolve => setTimeout(resolve, 2000));

      } catch (error) {
        console.error(`   ⚠️  Track ${i + 1} failed: ${error.message}`);
      }
    }
  }

  console.log('\n──────────────────────────────────────────────────────────────────────');
  console.log('🎬 ADDING MUSIC TO REELS');
  console.log('──────────────────────────────────────────────────────────────────────\n');

  // Find reels and add music
  if (!existsSync(REELS_DIR)) {
    console.log('   ⚠️  No reels directory found');
    return;
  }

  const reels = readdirSync(REELS_DIR).filter(f => f.endsWith('.mp4'));
  console.log(`   📹 Found ${reels.length} reels`);

  const outputWithMusic = join(OUTPUT_DIR, 'reels-with-music');
  if (!existsSync(outputWithMusic)) mkdirSync(outputWithMusic, { recursive: true });

  let successCount = 0;

  for (const reel of reels) {
    const reelPath = join(REELS_DIR, reel);

    // Determine aesthetic from filename
    let aesthetic = 'boudoir';
    if (reel.includes('midnightMuse')) aesthetic = 'midnightMuse';
    else if (reel.includes('goldenHour')) aesthetic = 'goldenHour';

    // Get a random track for this aesthetic
    const tracks = generatedTracks[aesthetic];
    if (!tracks || tracks.length === 0) {
      console.log(`   ⚠️  No music for ${aesthetic}`);
      continue;
    }

    const trackIndex = Math.floor(Math.random() * tracks.length);
    const musicPath = tracks[trackIndex];

    const outputPath = join(outputWithMusic, reel.replace('.mp4', '_with_music.mp4'));

    console.log(`\n   🎬 ${basename(reel)}`);
    console.log(`   🎵 Using: ${basename(musicPath)}`);

    if (addMusicToVideo(reelPath, musicPath, outputPath)) {
      successCount++;
    }
  }

  console.log(`
══════════════════════════════════════════════════════════════════════
   ✨ MUSIC GENERATION COMPLETE
══════════════════════════════════════════════════════════════════════

   📊 SUMMARY
   ─────────────────────────────────────────
   Boudoir tracks:      ${generatedTracks.boudoir?.length || 0}
   Midnight Muse tracks: ${generatedTracks.midnightMuse?.length || 0}
   Golden Hour tracks:  ${generatedTracks.goldenHour?.length || 0}
   ─────────────────────────────────────────
   Reels with music:    ${successCount}/${reels.length}

   📁 Music: ${OUTPUT_DIR}
   📁 Reels: ${outputWithMusic}

══════════════════════════════════════════════════════════════════════
`);
}

generate().catch(console.error);
