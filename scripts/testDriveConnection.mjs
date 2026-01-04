/**
 * Test Google Drive connection using service account
 */

import { google } from 'googleapis';
import fs from 'fs';

const credPath = '/home/ecolex/version1/studiov-drive-ingest-870127e5767e.json';

async function testDrive() {
  console.log('🔐 Testing Google Drive Connection\n');
  console.log('═'.repeat(50));

  // Load credentials
  const creds = JSON.parse(fs.readFileSync(credPath, 'utf8'));
  console.log('Service Account:', creds.client_email);
  console.log('Project ID:', creds.project_id);
  console.log();

  // Create auth
  const auth = new google.auth.JWT({
    email: creds.client_email,
    key: creds.private_key,
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  });

  const drive = google.drive({ version: 'v3', auth });

  // Find asset1.1 folder
  console.log('📂 Searching for asset1.1 folder...');

  const folderResponse = await drive.files.list({
    q: "name = 'asset1.1' and mimeType = 'application/vnd.google-apps.folder' and trashed = false",
    fields: 'files(id, name, parents)',
    spaces: 'drive',
  });

  const folders = folderResponse.data.files || [];
  console.log(`   Found ${folders.length} folder(s)`);

  if (folders.length === 0) {
    console.log('\n❌ No asset1.1 folder found!');
    console.log('   Make sure the folder is shared with the service account:');
    console.log(`   ${creds.client_email}`);
    return;
  }

  const folder = folders[0];
  console.log(`   Folder ID: ${folder.id}`);
  console.log(`   Folder Name: ${folder.name}`);

  // List images in folder
  console.log('\n📸 Listing images in folder...');

  const imagesResponse = await drive.files.list({
    q: `'${folder.id}' in parents and mimeType contains 'image/' and trashed = false`,
    fields: 'files(id, name, mimeType, createdTime, size)',
    pageSize: 20,
    orderBy: 'createdTime desc',
  });

  const images = imagesResponse.data.files || [];
  console.log(`   Found ${images.length} images`);

  if (images.length > 0) {
    console.log('\n   Sample images:');

    // Filter for ai-image-studio prefix
    const studioImages = images.filter(f => f.name?.startsWith('ai-image-studio'));
    console.log(`   Images with 'ai-image-studio' prefix: ${studioImages.length}`);

    studioImages.slice(0, 5).forEach(img => {
      const size = img.size ? `${(parseInt(img.size) / 1024).toFixed(1)} KB` : 'unknown size';
      console.log(`   - ${img.name} (${size})`);
    });

    // Extract batch timestamps
    const timestamps = new Set();
    studioImages.forEach(img => {
      const match = img.name?.match(/ai-image-studio-(\d+)/);
      if (match) timestamps.add(match[1]);
    });

    console.log(`\n   Unique batches (by timestamp): ${timestamps.size}`);
  }

  console.log('\n' + '═'.repeat(50));
  console.log('✅ Google Drive connection successful!');
}

testDrive().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
