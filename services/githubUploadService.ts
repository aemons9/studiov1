/**
 * GitHub Upload Service
 * Handles direct uploads to GitHub repository
 */

interface GitHubUploadOptions {
  owner: string;
  repo: string;
  path: string;
  content: string; // base64 encoded
  message: string;
  token: string;
  branch?: string;
}

interface GitHubUploadResult {
  success: boolean;
  message: string;
  url?: string;
}

/**
 * Convert image URL (blob or data URL) to base64 string
 */
async function imageUrlToBase64(url: string): Promise<string> {
  // If it's already a data URL, extract the base64 part
  if (url.startsWith('data:')) {
    const base64Match = url.match(/base64,(.+)/);
    if (base64Match) {
      return base64Match[1];
    }
  }

  // Otherwise, fetch the image and convert to base64
  const response = await fetch(url);
  const blob = await response.blob();

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = (reader.result as string).split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

/**
 * Upload file to GitHub repository
 */
async function uploadToGitHub(options: GitHubUploadOptions): Promise<GitHubUploadResult> {
  const { owner, repo, path, content, message, token, branch = 'main' } = options;

  try {
    // GitHub API endpoint
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

    // Check if file already exists (to get SHA for update)
    let sha: string | undefined;
    try {
      const checkResponse = await fetch(apiUrl, {
        headers: {
          'Authorization': `token ${token}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      });

      if (checkResponse.ok) {
        const existingFile = await checkResponse.json();
        sha = existingFile.sha;
      }
    } catch (error) {
      // File doesn't exist, which is fine for new uploads
      console.log('File does not exist yet, creating new file');
    }

    // Upload the file
    const uploadPayload: any = {
      message,
      content,
      branch,
    };

    if (sha) {
      uploadPayload.sha = sha; // Include SHA if updating existing file
    }

    const uploadResponse = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadPayload),
    });

    if (!uploadResponse.ok) {
      const errorData = await uploadResponse.json();
      throw new Error(errorData.message || 'Failed to upload to GitHub');
    }

    const result = await uploadResponse.json();

    return {
      success: true,
      message: 'Image uploaded successfully to GitHub!',
      url: result.content.html_url,
    };
  } catch (error) {
    console.error('GitHub upload error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to upload to GitHub',
    };
  }
}

/**
 * Upload image to gallery on GitHub
 */
export async function uploadImageToGallery(
  imageUrl: string,
  category: string,
  githubToken: string
): Promise<GitHubUploadResult> {
  try {
    // Configuration - Update these values
    const GITHUB_OWNER = 'aemons9';
    const GITHUB_REPO = 'studiov1';
    const GITHUB_BRANCH = 'claude/add-gallery-section-01MkqAhZWBi99MC5GsV5SWbb';

    // Generate filename
    const timestamp = Date.now();
    const filename = `${category}-${timestamp}.jpg`;
    const filePath = `photo/${filename}`;

    // Convert image to base64
    console.log('🔄 Converting image to base64...');
    const base64Content = await imageUrlToBase64(imageUrl);

    // Upload to GitHub
    console.log('📤 Uploading to GitHub...');
    const result = await uploadToGitHub({
      owner: GITHUB_OWNER,
      repo: GITHUB_REPO,
      path: filePath,
      content: base64Content,
      message: `Add ${category} image to gallery (${filename})`,
      token: githubToken,
      branch: GITHUB_BRANCH,
    });

    return result;
  } catch (error) {
    console.error('Upload error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to upload image',
    };
  }
}
