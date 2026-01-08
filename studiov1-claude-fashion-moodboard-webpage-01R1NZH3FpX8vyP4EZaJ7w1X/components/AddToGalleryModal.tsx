import React, { useState } from 'react';

interface AddToGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory: (category: string) => void;
  imageUrl: string;
}

const GALLERY_CATEGORIES = [
  { id: 'editorial', name: 'Editorial', description: 'Magazine-style fashion photography', icon: '📸' },
  { id: 'minimalist', name: 'Minimalist', description: 'Clean, simple, modern aesthetics', icon: '✨' },
  { id: 'couture', name: 'Couture', description: 'Haute couture and luxury fashion', icon: '👗' },
  { id: 'contemporary', name: 'Contemporary', description: 'Modern urban fashion styles', icon: '🌆' }
];

const AddToGalleryModal: React.FC<AddToGalleryModalProps> = ({
  isOpen,
  onClose,
  onSelectCategory,
  imageUrl
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSave = async () => {
    if (selectedCategory) {
      await onSelectCategory(selectedCategory);
      // Note: Parent component (ImageDisplay) will handle closing the modal
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-2xl shadow-2xl max-w-2xl w-full border border-gray-700 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gray-900 border-b border-gray-700 p-6 flex justify-between items-center z-10">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">Add to Gallery</h2>
            <p className="text-sm text-gray-400">Select which gallery category for this image</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            aria-label="Close"
          >
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Image Preview */}
        <div className="p-6 border-b border-gray-800">
          <img
            src={imageUrl}
            alt="Preview"
            className="w-full max-h-64 object-contain rounded-lg bg-gray-800"
          />
        </div>

        {/* Category Selection */}
        <div className="p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Choose Category</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {GALLERY_CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`
                  p-4 rounded-xl border-2 text-left transition-all duration-300
                  ${selectedCategory === category.id
                    ? 'border-teal-500 bg-teal-500/10'
                    : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                  }
                `}
              >
                <div className="flex items-start gap-3">
                  <span className="text-3xl">{category.icon}</span>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white mb-1">{category.name}</h4>
                    <p className="text-sm text-gray-400">{category.description}</p>
                  </div>
                  {selectedCategory === category.id && (
                    <svg className="w-6 h-6 text-teal-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-gray-900 border-t border-gray-700 p-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!selectedCategory}
            className={`
              flex-1 px-6 py-3 font-semibold rounded-lg transition-all duration-300
              ${selectedCategory
                ? 'bg-teal-600 text-white hover:bg-teal-500'
                : 'bg-gray-700 text-gray-500 cursor-not-allowed'
              }
            `}
          >
            Save to Gallery
          </button>
        </div>

        {/* Instructions */}
        <div className="px-6 pb-6">
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-blue-400 mb-2 flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              How it works
            </h4>
            <ul className="text-xs text-gray-300 space-y-1">
              <li>• Image will be uploaded directly to GitHub repository</li>
              <li>• Saved to: <code className="text-blue-300">photo/{'{category}'}-{'{timestamp}'}.jpg</code></li>
              <li>• Gallery updates automatically via GitHub Actions!</li>
              <li>• Requires GitHub token in localStorage</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddToGalleryModal;
