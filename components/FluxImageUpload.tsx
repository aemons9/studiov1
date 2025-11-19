import React, { useState, useRef } from 'react';

interface FluxImageUploadProps {
  onImageUpload: (dataUri: string) => void;
  onImageRemove: () => void;
  currentImage?: string;
}

export const FluxImageUpload: React.FC<FluxImageUploadProps> = ({
  onImageUpload,
  onImageRemove,
  currentImage,
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImage || null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 10MB)
    const MAX_SIZE = 10 * 1024 * 1024; // 10MB
    if (file.size > MAX_SIZE) {
      alert('Image size must be less than 10MB');
      return;
    }

    setIsLoading(true);

    try {
      // Create preview URL
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);

      // Convert to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        // Pass the full data URI (includes mime type)
        onImageUpload(base64String);
        setIsLoading(false);
      };
      reader.onerror = () => {
        alert('Failed to read the image file');
        setIsLoading(false);
        setPreviewUrl(null);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error processing image:', error);
      alert('Failed to process the image');
      setIsLoading(false);
      setPreviewUrl(null);
    }
  };

  const handleRemoveImage = () => {
    setPreviewUrl(null);
    onImageRemove();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;
    if (files.length > 0 && fileInputRef.current) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(files[0]);
      fileInputRef.current.files = dataTransfer.files;
      handleFileSelect({ target: { files: dataTransfer.files } } as any);
    }
  };

  return (
    <div className="flux-image-upload">
      <div className="mb-3">
        <label className="form-label">
          <span className="badge bg-info me-2">Flux Pro 1.1 Ultra</span>
          Image Reference (Optional)
        </label>
        <div className="text-muted small mb-2">
          Upload an image to use as a reference for image-to-image generation
        </div>
      </div>

      {!previewUrl ? (
        <div
          className="upload-area border-dashed border-2 rounded p-4 text-center"
          style={{
            borderColor: '#6c757d',
            backgroundColor: 'rgba(108, 117, 125, 0.05)',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="mb-3">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-muted"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          </div>
          <p className="mb-1 fw-semibold">Click to upload or drag & drop</p>
          <p className="text-muted small mb-0">PNG, JPG, WEBP (max 10MB)</p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />
        </div>
      ) : (
        <div className="preview-container">
          <div className="position-relative">
            <img
              src={previewUrl}
              alt="Upload preview"
              className="img-fluid rounded shadow-sm"
              style={{
                maxHeight: '200px',
                width: 'auto',
                display: 'block',
                margin: '0 auto'
              }}
            />
            {isLoading && (
              <div
                className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center rounded"
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
              >
                <div className="spinner-border text-light" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
            <button
              type="button"
              className="btn btn-sm btn-danger position-absolute top-0 end-0 m-2"
              onClick={handleRemoveImage}
              disabled={isLoading}
              style={{ zIndex: 10 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <div className="mt-2 text-center">
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading}
            >
              Change Image
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              style={{ display: 'none' }}
            />
          </div>
        </div>
      )}

      <div className="mt-2">
        <div className="alert alert-info py-2 px-3 small mb-0">
          <strong>Tip:</strong> The uploaded image will guide the generation style and composition while your prompt defines the content.
        </div>
      </div>
    </div>
  );
};