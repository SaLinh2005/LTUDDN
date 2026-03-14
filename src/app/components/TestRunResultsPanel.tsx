import { X, CheckCircle, Clock } from 'lucide-react';

interface TestRunResultsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onRunAgain: () => void;
}

export function TestRunResultsPanel({ isOpen, onClose, onRunAgain }: TestRunResultsPanelProps) {
  if (!isOpen) return null;

  return (
    <div 
      className={`fixed right-0 top-16 bottom-0 w-[480px] bg-white border-l border-gray-200 shadow-2xl z-50 overflow-y-auto transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
        <h2 className="font-semibold text-gray-900">Test Run Results</h2>
        <button 
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Success Message */}
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="font-semibold text-green-900 mb-1">Test run successful</p>
              <p className="text-sm text-green-800">
                Your Demo ran successfully from trigger to action.
              </p>
            </div>
          </div>
        </div>

        {/* Run Summary */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Run Summary</h3>
          <div className="bg-white border border-gray-200 rounded-lg divide-y divide-gray-200">
            <div className="px-4 py-3 flex items-center justify-between">
              <span className="text-sm text-gray-600">Trigger</span>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-600">Completed</span>
              </div>
            </div>
            <div className="px-4 py-3 flex items-center justify-between">
              <span className="text-sm text-gray-600">Action</span>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-600">Completed</span>
              </div>
            </div>
            <div className="px-4 py-3 flex items-center justify-between">
              <span className="text-sm text-gray-600">Status</span>
              <span className="text-sm font-medium text-green-600">Success</span>
            </div>
            <div className="px-4 py-3 flex items-center justify-between">
              <span className="text-sm text-gray-600">Duration</span>
              <span className="text-sm font-medium text-gray-900">1.2s</span>
            </div>
            <div className="px-4 py-3 flex items-center justify-between">
              <span className="text-sm text-gray-600">Run time</span>
              <span className="text-sm font-medium text-gray-900">Just now</span>
            </div>
          </div>
        </div>

        {/* Trigger Output */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Trigger Output</h3>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="space-y-2">
              <div className="flex items-start">
                <span className="text-xs font-medium text-gray-500 w-32">Event Type:</span>
                <span className="text-xs text-gray-900">New Inbound Email</span>
              </div>
              <div className="flex items-start">
                <span className="text-xs font-medium text-gray-500 w-32">From:</span>
                <span className="text-xs text-gray-900">user@example.com</span>
              </div>
              <div className="flex items-start">
                <span className="text-xs font-medium text-gray-500 w-32">Subject:</span>
                <span className="text-xs text-gray-900">Demo Test Email</span>
              </div>
              <div className="flex items-start">
                <span className="text-xs font-medium text-gray-500 w-32">Timestamp:</span>
                <span className="text-xs text-gray-900">2026-03-06 14:23:45 UTC</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Output */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Action Output</h3>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="space-y-2">
              <div className="flex items-start">
                <span className="text-xs font-medium text-gray-500 w-32">Action Type:</span>
                <span className="text-xs text-gray-900">Send Email</span>
              </div>
              <div className="flex items-start">
                <span className="text-xs font-medium text-gray-500 w-32">To:</span>
                <span className="text-xs text-gray-900">recipient@example.com</span>
              </div>
              <div className="flex items-start">
                <span className="text-xs font-medium text-gray-500 w-32">Status:</span>
                <span className="text-xs text-gray-900">Sent successfully</span>
              </div>
              <div className="flex items-start">
                <span className="text-xs font-medium text-gray-500 w-32">Message ID:</span>
                <span className="text-xs text-gray-900 font-mono">msg_7x9k2m4n8p</span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <button
            onClick={onRunAgain}
            className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            Run again
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
