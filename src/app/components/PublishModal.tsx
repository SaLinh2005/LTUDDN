import { X, CheckCircle, Zap, Loader2 } from 'lucide-react';
import { useState } from 'react';

interface PublishModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPublish: () => void;
  onNavigateToHome: () => void;
}

export function PublishModal({ isOpen, onClose, onPublish, onNavigateToHome }: PublishModalProps) {
  const [isPublishing, setIsPublishing] = useState(false);
  const [isPublished, setIsPublished] = useState(false);

  if (!isOpen) return null;

  const handlePublish = async () => {
    setIsPublishing(true);
    
    // Simulate publishing delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsPublishing(false);
    setIsPublished(true);
    onPublish();
  };

  const handleClose = () => {
    if (!isPublishing && !isPublished) {
      onClose();
    }
  };

  const handleViewWorkflow = () => {
    setIsPublished(false);
    onClose();
    onNavigateToHome();
  };

  const handleGoToHome = () => {
    setIsPublished(false);
    onClose();
    onNavigateToHome();
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center"
        onClick={handleClose}
      >
        {/* Modal */}
        <div 
          className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {!isPublished ? (
            <>
              {/* Header */}
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-pink-500 rounded-lg flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">Publish Workflow</h2>
                </div>
                <button 
                  onClick={handleClose}
                  disabled={isPublishing}
                  className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                <p className="text-sm text-gray-600">
                  Your workflow is ready to go live.
                </p>

                {/* Readiness Checklist */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-sm font-medium text-green-900">Trigger configured</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-sm font-medium text-green-900">Action configured</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-sm font-medium text-green-900">Test run completed</span>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex gap-3">
                <button
                  onClick={handleClose}
                  disabled={isPublishing}
                  className="flex-1 px-4 py-2.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg font-medium transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePublish}
                  disabled={isPublishing}
                  className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {isPublishing && <Loader2 className="w-4 h-4 animate-spin" />}
                  {isPublishing ? 'Publishing workflow...' : 'Publish Workflow'}
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Success State */}
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Workflow published successfully</h3>
                <p className="text-sm text-gray-600 mb-6">
                  Your automation is now live and ready to run.
                </p>
                
                {/* Buttons */}
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={handleViewWorkflow}
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                  >
                    View workflow
                  </button>
                  <button
                    onClick={handleGoToHome}
                    className="px-5 py-2.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg font-medium transition-colors"
                  >
                    Go to Home
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}