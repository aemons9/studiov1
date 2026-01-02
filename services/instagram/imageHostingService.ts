/**
 * IMAGE HOSTING SERVICE
 *
 * Handles uploading images to publicly accessible URLs for Instagram publishing.
 * Instagram Graph API requires images to be accessible via HTTPS public URLs.
 *
 * Supports:
 * - GitHub repository hosting (raw.githubusercontent.com URLs)
 * - Static website hosting (studiov.aemons.com)
 */

import type { ImageHostingConfig } from './types';

// ============================================================================
// CONFIGURATION
// ============================================================================

/**
 * Default GitHub configuration for the studiov1 repository
 */
export const DEFAULT_GITHUB_CONFIG: ImageHostingConfig['github'] = {
  owner: 'aemons9',
  repo: 'studiov1',
  branch: 'main',
  token: '', // Must be provided at runtime
  pathPrefix: 'photo/instagram',
};

/**
 * Default website configuration for studiov.aemons.com
 */
export const DEFAULT_WEBSITE_CONFIG: ImageHostingConfig['website'] = {
  baseUrl: 'https://studiov.aemons.com',
  pathPrefix: 'photo/instagram',
};

// ============================================================================
// UTILITIES
// ============================================================================

/**
 * Convert various image formats to base64 string
 * Handles: base64 strings, data URLs, blob URLs
 */
export async function imageToBase64(imageData: string): Promise<string> {
  // Already a clean base64 string (no prefix)
  if (!imageData.includes(':') && !imageData.includes('/')) {
    return imageData;
  }

  // Data URL format: data:image/jpeg;base64,/9j/4AAQ...
  if (imageData.startsWith('data:')) {
    const base64Match = imageData.match(/base64,(.+)/);
    if (base64Match) {
      return base64Match[1];
    }
    throw new Error('Invalid data URL format');
  }

  // Blob URL format: blob:http://localhost:3000/...
  if (imageData.startsWith('blob:')) {
    const response = await fetch(imageData);
    const blob = await response.blob();

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        const base64 = result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  // HTTP(S) URL - fetch and convert
  if (imageData.startsWith('http://') || imageData.startsWith('https://')) {
    const response = await fetch(imageData);
    const blob = await response.blob();

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        const base64 = result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  // Assume it's already base64
  return imageData;
}

/**
 * Generate a unique filename for Instagram uploads
 */
export function generateInstagramFilename(
  prefix: string = 'veracrvs',
  format: 'jpg' | 'jpeg' | 'png' = 'jpg'
): string {
  const timestamp = new Date().toISOString()
    .replace(/[-:]/g, '')
    .replace('T', '-')
    .replace(/\..+/, '');

  const randomSuffix = Math.random().toString(36).substring(2, 8);

  return `${prefix}-${timestamp}-${randomSuffix}.${format}`;
}

// ============================================================================
// GITHUB HOSTING
// ============================================================================

interface GitHubUploadResult {
  success: boolean;
  publicUrl?: string;
  rawUrl?: string;
  htmlUrl?: string;
  sha?: string;
  error?: string;
}

/**
 * Upload image to GitHub repository and return public raw URL
 *
 * The raw.githubusercontent.com URL is publicly accessible and works
 * with Instagram Graph API's image_url parameter.
 */
export async function uploadToGitHub(
  imageData: string,
  filename: string,
  config: NonNullable<ImageHostingConfig['github']>
): Promise<GitHubUploadResult> {
  const { owner, repo, branch, token, pathPrefix } = config;

  if (!token) {
    return {
      success: false,
      error: 'GitHub token is required for uploading',
    };
  }

  try {
    // Convert image to base64 if needed
    const base64Content = await imageToBase64(imageData);

    // Full path within the repository
    const filePath = `${pathPrefix}/${filename}`;

    // GitHub API endpoint for file creation/update
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;

    console.log(`📤 Uploading to GitHub: ${filePath}`);

    // Check if file already exists (to get SHA for update)
    let existingSha: string | undefined;
    try {
      const checkResponse = await fetch(`${apiUrl}?ref=${branch}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github.v3+json',
          'X-GitHub-Api-Version': '2022-11-28',
        },
      });

      if (checkResponse.ok) {
        const existingFile = await checkResponse.json();
        existingSha = existingFile.sha;
        console.log(`📝 File exists, will update (SHA: ${existingSha.substring(0, 7)})`);
      }
    } catch {
      // File doesn't exist, which is fine for new uploads
    }

    // Prepare upload payload
    const uploadPayload: {
      message: string;
      content: string;
      branch: string;
      sha?: string;
    } = {
      message: `[Instagram] Add image: ${filename}`,
      content: base64Content,
      branch,
    };

    if (existingSha) {
      uploadPayload.sha = existingSha;
    }

    // Upload to GitHub
    const uploadResponse = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
        'X-GitHub-Api-Version': '2022-11-28',
      },
      body: JSON.stringify(uploadPayload),
    });

    if (!uploadResponse.ok) {
      const errorData = await uploadResponse.json();
      console.error('❌ GitHub upload failed:', errorData);
      return {
        success: false,
        error: errorData.message || `GitHub API error: ${uploadResponse.status}`,
      };
    }

    const result = await uploadResponse.json();

    // Construct the raw URL that Instagram can access
    // Format: https://raw.githubusercontent.com/{owner}/{repo}/{branch}/{path}
    const rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${filePath}`;

    console.log(`✅ Uploaded to GitHub: ${rawUrl}`);

    return {
      success: true,
      publicUrl: rawUrl,
      rawUrl,
      htmlUrl: result.content?.html_url,
      sha: result.content?.sha,
    };
  } catch (error) {
    console.error('❌ GitHub upload error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown upload error',
    };
  }
}

// ============================================================================
// WEBSITE HOSTING
// ============================================================================

interface WebsiteHostingResult {
  success: boolean;
  publicUrl?: string;
  error?: string;
}

/**
 * For website hosting, images need to be deployed to the static site.
 * This function constructs the public URL assuming the image is already deployed.
 *
 * In practice, this would be used after GitHub Pages deployment or
 * when images are served from the same domain as the app.
 */
export function getWebsiteUrl(
  filename: string,
  config: NonNullable<ImageHostingConfig['website']>
): string {
  const { baseUrl, pathPrefix } = config;
  return `${baseUrl}/${pathPrefix}/${filename}`;
}

/**
 * Upload to website via GitHub (since the website is hosted on GitHub Pages)
 * This is effectively the same as GitHub upload but returns website URL
 */
export async function uploadToWebsite(
  imageData: string,
  filename: string,
  githubConfig: NonNullable<ImageHostingConfig['github']>,
  websiteConfig: NonNullable<ImageHostingConfig['website']>
): Promise<WebsiteHostingResult> {
  // Upload to GitHub first
  const githubResult = await uploadToGitHub(imageData, filename, githubConfig);

  if (!githubResult.success) {
    return {
      success: false,
      error: githubResult.error,
    };
  }

  // Return the website URL instead of raw GitHub URL
  // Note: There may be a delay before the image is accessible on the website
  // after GitHub Pages deployment
  const publicUrl = getWebsiteUrl(filename, websiteConfig);

  return {
    success: true,
    publicUrl,
  };
}

// ============================================================================
// UNIFIED HOSTING SERVICE
// ============================================================================

export interface HostImageResult {
  success: boolean;
  publicUrl?: string;
  filename?: string;
  provider?: 'github' | 'website';
  error?: string;
}

/**
 * Host an image publicly for Instagram publishing
 *
 * This is the main entry point for the hosting service.
 * It handles the image upload based on the configured provider
 * and returns a public URL that Instagram can access.
 *
 * @param imageData - Image data (base64, data URL, or blob URL)
 * @param format - Image format (jpg, jpeg, or png)
 * @param config - Hosting configuration
 * @param customFilename - Optional custom filename
 */
export async function hostImage(
  imageData: string,
  format: 'jpg' | 'jpeg' | 'png',
  config: ImageHostingConfig,
  customFilename?: string
): Promise<HostImageResult> {
  // Generate filename if not provided
  const filename = customFilename || generateInstagramFilename('veracrvs', format);

  console.log(`🌐 Hosting image: ${filename} via ${config.provider}`);

  try {
    switch (config.provider) {
      case 'github': {
        if (!config.github) {
          return {
            success: false,
            error: 'GitHub configuration is required',
          };
        }

        const result = await uploadToGitHub(imageData, filename, config.github);

        return {
          success: result.success,
          publicUrl: result.publicUrl,
          filename,
          provider: 'github',
          error: result.error,
        };
      }

      case 'website': {
        if (!config.github || !config.website) {
          return {
            success: false,
            error: 'Both GitHub and website configurations are required for website hosting',
          };
        }

        // Upload via GitHub, but return website URL
        const result = await uploadToWebsite(
          imageData,
          filename,
          config.github,
          config.website
        );

        return {
          success: result.success,
          publicUrl: result.publicUrl,
          filename,
          provider: 'website',
          error: result.error,
        };
      }

      default:
        return {
          success: false,
          error: `Unsupported hosting provider: ${config.provider}`,
        };
    }
  } catch (error) {
    console.error('❌ Image hosting error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown hosting error',
    };
  }
}

/**
 * Validate that an image URL is publicly accessible
 * Useful for verifying before attempting Instagram publish
 */
export async function validatePublicUrl(url: string): Promise<{
  valid: boolean;
  contentType?: string;
  size?: number;
  error?: string;
}> {
  try {
    console.log(`🔍 Validating URL accessibility: ${url}`);

    const response = await fetch(url, {
      method: 'HEAD',
    });

    if (!response.ok) {
      return {
        valid: false,
        error: `URL returned status ${response.status}`,
      };
    }

    const contentType = response.headers.get('content-type') || undefined;
    const contentLength = response.headers.get('content-length');
    const size = contentLength ? parseInt(contentLength, 10) : undefined;

    // Validate content type is an image
    if (contentType && !contentType.startsWith('image/')) {
      return {
        valid: false,
        contentType,
        error: `Invalid content type: ${contentType}`,
      };
    }

    console.log(`✅ URL is valid: ${contentType}, ${size} bytes`);

    return {
      valid: true,
      contentType,
      size,
    };
  } catch (error) {
    return {
      valid: false,
      error: error instanceof Error ? error.message : 'Failed to validate URL',
    };
  }
}

// ============================================================================
// STORAGE HELPERS
// ============================================================================

const HOSTING_CONFIG_KEY = 'instagram_hosting_config';

/**
 * Save hosting configuration to localStorage
 */
export function saveHostingConfig(config: ImageHostingConfig): void {
  // Don't save sensitive tokens
  const safeConfig: ImageHostingConfig = {
    ...config,
    github: config.github ? {
      ...config.github,
      token: '', // Never persist token
    } : undefined,
  };

  localStorage.setItem(HOSTING_CONFIG_KEY, JSON.stringify(safeConfig));
}

/**
 * Load hosting configuration from localStorage
 */
export function loadHostingConfig(): ImageHostingConfig | null {
  const stored = localStorage.getItem(HOSTING_CONFIG_KEY);
  if (!stored) return null;

  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

/**
 * Get default hosting configuration
 */
export function getDefaultHostingConfig(): ImageHostingConfig {
  return {
    provider: 'github',
    github: { ...DEFAULT_GITHUB_CONFIG },
    website: { ...DEFAULT_WEBSITE_CONFIG },
  };
}
