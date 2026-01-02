/**
 * Vercel Serverless Function: Instagram Publish
 *
 * Complete Instagram publishing flow via Graph API
 * POST /api/instagram/publish
 */

const INSTAGRAM_CONFIG = {
  BUSINESS_ACCOUNT_ID: '17841478517688462',
  GRAPH_API_BASE: 'https://graph.facebook.com/v21.0',
};

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      accessToken,
      imageData,
      caption,
      hashtags = [],
      instagramAccountId = INSTAGRAM_CONFIG.BUSINESS_ACCOUNT_ID,
      githubToken,
      githubOwner = 'aemons9',
      githubRepo = 'studiov1',
      githubBranch = 'main',
    } = req.body;

    if (!accessToken) {
      return res.status(400).json({ error: 'Instagram access token required' });
    }

    if (!imageData) {
      return res.status(400).json({ error: 'Image data required' });
    }

    console.log('📸 Starting Instagram publish flow...');

    // Step 1: Get public URL
    let publicUrl;
    if (imageData.startsWith('https://')) {
      publicUrl = imageData;
    } else if (githubToken) {
      // Upload to GitHub
      const timestamp = new Date().toISOString()
        .replace(/[-:]/g, '')
        .replace('T', '-')
        .replace(/\..+/, '');
      const filename = `veracrvs-${timestamp}-${Math.random().toString(36).substr(2, 6)}.jpg`;
      const filePath = `photo/instagram/${filename}`;

      let cleanBase64 = imageData;
      if (cleanBase64.includes(',')) {
        cleanBase64 = cleanBase64.split(',')[1];
      }

      const githubResponse = await fetch(
        `https://api.github.com/repos/${githubOwner}/${githubRepo}/contents/${filePath}`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${githubToken}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: `[Instagram] Add image: ${filename}`,
            content: cleanBase64,
            branch: githubBranch,
          }),
        }
      );

      if (!githubResponse.ok) {
        const error = await githubResponse.json();
        return res.status(500).json({
          error: 'Failed to upload to GitHub',
          details: error.message,
        });
      }

      publicUrl = `https://raw.githubusercontent.com/${githubOwner}/${githubRepo}/${githubBranch}/${filePath}`;
      await new Promise(resolve => setTimeout(resolve, 2000));
    } else {
      return res.status(400).json({
        error: 'Public URL or GitHub token required',
      });
    }

    // Step 2: Format caption
    let finalCaption = caption || '';
    if (hashtags.length > 0) {
      const formattedHashtags = hashtags
        .map(tag => tag.startsWith('#') ? tag : `#${tag}`)
        .slice(0, 30)
        .join(' ');
      finalCaption = finalCaption
        ? `${finalCaption}\n\n${formattedHashtags}`
        : formattedHashtags;
    }

    // Step 3: Create container
    const containerResponse = await fetch(
      `${INSTAGRAM_CONFIG.GRAPH_API_BASE}/${instagramAccountId}/media`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          image_url: publicUrl,
          caption: finalCaption,
          access_token: accessToken,
        }).toString(),
      }
    );

    const containerData = await containerResponse.json();

    if (!containerResponse.ok) {
      return res.status(containerResponse.status).json({
        error: 'Failed to create container',
        details: containerData.error?.message,
      });
    }

    const containerId = containerData.id;

    // Step 4: Wait for ready
    let containerReady = false;
    let attempts = 0;

    while (!containerReady && attempts < 30) {
      await new Promise(resolve => setTimeout(resolve, 2000));

      const statusResponse = await fetch(
        `${INSTAGRAM_CONFIG.GRAPH_API_BASE}/${containerId}?fields=status,status_code&access_token=${accessToken}`
      );
      const statusData = await statusResponse.json();

      if (statusData.status === 'FINISHED') {
        containerReady = true;
      } else if (statusData.status === 'ERROR') {
        return res.status(500).json({
          error: 'Container processing failed',
          status_code: statusData.status_code,
        });
      }

      attempts++;
    }

    if (!containerReady) {
      return res.status(500).json({ error: 'Container processing timeout' });
    }

    // Step 5: Publish
    const publishResponse = await fetch(
      `${INSTAGRAM_CONFIG.GRAPH_API_BASE}/${instagramAccountId}/media_publish`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          creation_id: containerId,
          access_token: accessToken,
        }).toString(),
      }
    );

    const publishData = await publishResponse.json();

    if (!publishResponse.ok) {
      return res.status(publishResponse.status).json({
        error: 'Failed to publish',
        details: publishData.error?.message,
      });
    }

    console.log(`🎉 Published! Media ID: ${publishData.id}`);

    return res.json({
      success: true,
      mediaId: publishData.id,
      publicUrl,
      caption: finalCaption,
      publishedAt: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Instagram publish error:', error);
    return res.status(500).json({
      error: 'Publish failed',
      message: error.message,
    });
  }
}
