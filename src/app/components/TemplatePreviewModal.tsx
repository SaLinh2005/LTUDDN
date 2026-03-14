import { X, Zap, ArrowRight } from 'lucide-react';

interface Template {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: string;
  trigger: string;
  action: string;
  popularity: number;
  dateAdded: string;
}

interface TemplatePreviewModalProps {
  isOpen: boolean;
  template: Template | null;
  onClose: () => void;
  onUseTemplate: (template: Template) => void;
}

export function TemplatePreviewModal({ isOpen, template, onClose, onUseTemplate }: TemplatePreviewModalProps) {
  if (!isOpen || !template) return null;

  const handleUseTemplate = () => {
    onUseTemplate(template);
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
        onClick={onClose}
      >
        {/* Modal */}
        <div 
          className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Template Preview</h2>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Template Title */}
            <div className="mb-6">
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                {template.title}
              </h3>
              <p className="text-sm text-gray-600">
                {template.description}
              </p>
            </div>

            {/* Template Info */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="text-xs text-gray-500 mb-1">Category</p>
                <p className="text-sm font-medium text-gray-900">{template.category}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="text-xs text-gray-500 mb-1">Popularity</p>
                <p className="text-sm font-medium text-gray-900">{template.popularity}% of users</p>
              </div>
            </div>

            {/* Workflow Diagram */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-gray-200 mb-6">
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-4">
                Workflow Structure
              </p>
              
              <div className="flex items-center justify-center gap-6">
                {/* Trigger Node */}
                <div className="bg-white rounded-lg border-2 border-blue-500 shadow-sm p-4 flex-1 max-w-[180px]">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                      <Zap className="w-3.5 h-3.5 text-blue-600" />
                    </div>
                    <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
                      Trigger
                    </span>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {template.trigger}
                  </p>
                </div>

                {/* Arrow */}
                <ArrowRight className="w-6 h-6 text-gray-400 flex-shrink-0" />

                {/* Action Node */}
                <div className="bg-white rounded-lg border-2 border-purple-500 shadow-sm p-4 flex-1 max-w-[180px]">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                      <Zap className="w-3.5 h-3.5 text-purple-600" />
                    </div>
                    <span className="text-xs font-semibold text-purple-600 uppercase tracking-wide">
                      Action
                    </span>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {template.action}
                  </p>
                </div>
              </div>
            </div>

            {/* What You'll Get */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">What you'll get:</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 text-xs">✓</span>
                  </div>
                  <span>Pre-configured trigger: <span className="font-medium">{template.trigger}</span></span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 text-xs">✓</span>
                  </div>
                  <span>Pre-configured action: <span className="font-medium">{template.action}</span></span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 text-xs">✓</span>
                  </div>
                  <span>Ready-to-customize workflow canvas</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 text-xs">✓</span>
                  </div>
                  <span>Example configuration and settings</span>
                </li>
              </ul>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleUseTemplate}
                className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                Use This Template
              </button>
              <button
                onClick={onClose}
                className="px-6 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
