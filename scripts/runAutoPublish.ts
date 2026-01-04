#!/usr/bin/env npx ts-node
/**
 * AUTO-PUBLISH ORCHESTRATOR CLI
 *
 * Run automated Instagram publishing from Google Drive images.
 *
 * Usage:
 *   npx ts-node scripts/runAutoPublish.ts [options]
 *
 * Options:
 *   --dry-run       Preview without publishing
 *   --max <n>       Maximum posts per run (default: 3)
 *   --format <type> Prefer specific format (feed|carousel|reel)
 *   --status        Show status only, don't publish
 *   --quick         Quick publish: just the next best content
 */

import {
  runOrchestrator,
  quickAutoPublish,
  getOrchestratorStatus,
} from '../services/drive';

// Tokens from environment variables
if (!process.env.INSTAGRAM_TOKEN) throw new Error('INSTAGRAM_TOKEN environment variable required');
if (!process.env.GITHUB_TOKEN) throw new Error('GITHUB_TOKEN environment variable required');

const DEFAULT_CONFIG = {
  IG_ACCOUNT_ID: process.env.INSTAGRAM_ACCOUNT_ID || '17841478517688462',
  PAGE_ACCESS_TOKEN: process.env.INSTAGRAM_TOKEN,
  GITHUB_TOKEN: process.env.GITHUB_TOKEN,
};

// Parse command line arguments
function parseArgs(): {
  dryRun: boolean;
  max: number;
  format?: 'feed' | 'carousel' | 'reel';
  statusOnly: boolean;
  quick: boolean;
} {
  const args = process.argv.slice(2);
  const result = {
    dryRun: false,
    max: 3,
    format: undefined as 'feed' | 'carousel' | 'reel' | undefined,
    statusOnly: false,
    quick: false,
  };

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--dry-run':
      case '-d':
        result.dryRun = true;
        break;
      case '--max':
      case '-m':
        result.max = parseInt(args[++i], 10) || 3;
        break;
      case '--format':
      case '-f':
        const format = args[++i];
        if (['feed', 'carousel', 'reel'].includes(format)) {
          result.format = format as 'feed' | 'carousel' | 'reel';
        }
        break;
      case '--status':
      case '-s':
        result.statusOnly = true;
        break;
      case '--quick':
      case '-q':
        result.quick = true;
        break;
      case '--help':
      case '-h':
        console.log(`
Instagram Auto-Publisher

Usage: npx ts-node scripts/runAutoPublish.ts [options]

Options:
  -d, --dry-run       Preview without actually publishing
  -m, --max <n>       Maximum posts per run (default: 3)
  -f, --format <type> Prefer specific format: feed, carousel, or reel
  -s, --status        Show status only, don't publish
  -q, --quick         Quick publish: just the next best content
  -h, --help          Show this help message

Examples:
  npx ts-node scripts/runAutoPublish.ts --status
  npx ts-node scripts/runAutoPublish.ts --dry-run --max 5
  npx ts-node scripts/runAutoPublish.ts --format reel --max 1
  npx ts-node scripts/runAutoPublish.ts --quick
        `);
        process.exit(0);
    }
  }

  return result;
}

// Main function
async function main() {
  console.log('═'.repeat(60));
  console.log('📸 INSTAGRAM AUTO-PUBLISHER');
  console.log('═'.repeat(60));
  console.log();

  const args = parseArgs();

  // Check environment
  const credentialsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS ||
    '/home/ecolex/version1/studiov-drive-ingest-870127e5767e.json';

  console.log('🔐 Configuration:');
  console.log(`   Service Account: ${credentialsPath}`);
  console.log(`   Instagram Account: ${DEFAULT_CONFIG.IG_ACCOUNT_ID}`);
  console.log(`   Dry Run: ${args.dryRun ? 'Yes' : 'No'}`);
  console.log(`   Max Posts: ${args.max}`);
  if (args.format) {
    console.log(`   Preferred Format: ${args.format}`);
  }
  console.log();

  try {
    // Status only
    if (args.statusOnly) {
      console.log('📊 Fetching status...\n');
      const status = await getOrchestratorStatus();

      console.log('Drive Content:');
      console.log(`   Batches: ${status.driveStats.batches}`);
      console.log(`   Images: ${status.driveStats.images}`);
      console.log();
      console.log('Available Candidates:');
      console.log(`   Feed Posts: ${status.candidates.feed}`);
      console.log(`   Carousels: ${status.candidates.carousel}`);
      console.log(`   Reels: ${status.candidates.reel}`);
      console.log();
      console.log(status.history);
      return;
    }

    // Quick publish
    if (args.quick) {
      console.log('⚡ Quick auto-publish mode...\n');
      const result = await quickAutoPublish({
        accessToken: DEFAULT_CONFIG.PAGE_ACCESS_TOKEN,
        githubToken: DEFAULT_CONFIG.GITHUB_TOKEN,
        instagramAccountId: DEFAULT_CONFIG.IG_ACCOUNT_ID,
        dryRun: args.dryRun,
      });

      if (result) {
        console.log('\n✅ Quick publish complete!');
        console.log(`   Type: ${result.postType}`);
        console.log(`   Success: ${result.success}`);
        if (result.mediaId) {
          console.log(`   Media ID: ${result.mediaId}`);
        }
        if (result.error) {
          console.log(`   Error: ${result.error}`);
        }
      } else {
        console.log('\n⚠️ No content available for quick publish');
      }
      return;
    }

    // Full orchestrator run
    const result = await runOrchestrator({
      accessToken: DEFAULT_CONFIG.PAGE_ACCESS_TOKEN,
      githubToken: DEFAULT_CONFIG.GITHUB_TOKEN,
      instagramAccountId: DEFAULT_CONFIG.IG_ACCOUNT_ID,
      dryRun: args.dryRun,
      maxPostsPerRun: args.max,
      preferredFormat: args.format,
    });

    console.log('\n' + result.summary);

    if (!result.success) {
      console.error('\n❌ Orchestrator failed:', result.error);
      process.exit(1);
    }

    // Log individual results
    if (result.results.length > 0) {
      console.log('\n📝 Post Details:');
      for (const post of result.results) {
        const status = post.success ? '✅' : '❌';
        console.log(`   ${status} ${post.postType}: ${post.driveFileIds.length} files`);
        if (post.mediaId) {
          console.log(`      Media ID: ${post.mediaId}`);
        }
        if (post.error) {
          console.log(`      Error: ${post.error}`);
        }
      }
    }

  } catch (error) {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  }
}

// Run
main().catch(console.error);
