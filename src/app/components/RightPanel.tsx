import { 
  X,
  Table, 
  FileText, 
  Folder, 
  Globe, 
  Clock,
  CheckCircle,
  Settings,
  GitBranch
} from 'lucide-react';
import { PanelType } from '../App';

interface RightPanelProps {
  activePanel: PanelType;
  onClose: () => void;
}

export function RightPanel({ activePanel, onClose }: RightPanelProps) {
  const isOpen = activePanel !== null;

  const getPanelContent = () => {
    switch (activePanel) {
      case 'linked-assets':
        return (
          <>
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">Linked Assets</h2>
              <button 
                onClick={onClose}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-6 space-y-2">
              <button className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2">
                <Table className="w-4 h-4" />
                Create Table
              </button>
              <button className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Create Form
              </button>
            </div>
          </>
        );

      case 'recent-demos':
        return (
          <>
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">Recent Demos</h2>
              <button 
                onClick={onClose}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-6 space-y-2">
              <div className="text-xs text-gray-500 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="font-medium text-gray-700 mb-1">Email to Slack</div>
                <div className="text-gray-500">Modified 2 hours ago</div>
              </div>
              <div className="text-xs text-gray-500 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="font-medium text-gray-700 mb-1">Form to Database</div>
                <div className="text-gray-500">Modified yesterday</div>
              </div>
              <div className="text-xs text-gray-500 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="font-medium text-gray-700 mb-1">CSV to Sheets</div>
                <div className="text-gray-500">Modified 2 days ago</div>
              </div>
            </div>
          </>
        );

      case 'details':
        return (
          <>
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">Details</h2>
              <button 
                onClick={onClose}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-sm text-gray-600 mb-2 block">Folder</label>
                <select className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700">
                  <option>My Demos</option>
                  <option>Shared Demos</option>
                  <option>Archived</option>
                </select>
              </div>
              
              <div>
                <label className="text-sm text-gray-600 mb-2 block">Timezone</label>
                <select className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700">
                  <option>UTC (GMT+0:00)</option>
                  <option>EST (GMT-5:00)</option>
                  <option>PST (GMT-8:00)</option>
                </select>
              </div>

              <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
                Create Template
              </button>
            </div>
          </>
        );

      case 'notes':
        return (
          <>
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">Notes</h2>
              <button 
                onClick={onClose}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-sm text-gray-600 mb-2 block">Demo notes</label>
                <textarea
                  placeholder="Add notes about this Demo..."
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                />
              </div>
              
              <div>
                <label className="text-sm text-gray-600 mb-2 block">Step notes</label>
                <textarea
                  placeholder="Add step-specific notes..."
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
              </div>
            </div>
          </>
        );

      case 'change-history':
        return (
          <>
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">Change History</h2>
              <button 
                onClick={onClose}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-6 space-y-2">
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="font-medium text-sm text-gray-700 mb-1">Demo created</div>
                <div className="text-xs text-gray-500">Today at 10:30 AM</div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="font-medium text-sm text-gray-700 mb-1">Trigger added</div>
                <div className="text-xs text-gray-500">Today at 10:32 AM</div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="font-medium text-sm text-gray-700 mb-1">Action configured</div>
                <div className="text-xs text-gray-500">Today at 10:35 AM</div>
              </div>
            </div>
          </>
        );

      case 'demo-runs':
        return (
          <>
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">Demo Runs</h2>
              <button 
                onClick={onClose}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-6 space-y-3">
              <div className="text-sm text-gray-500 text-center py-8">
                No runs yet
              </div>
              <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
                <Globe className="w-4 h-4" />
                Test Demo
              </button>
            </div>
          </>
        );

      case 'status':
        return (
          <>
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">Status</h2>
              <button 
                onClick={onClose}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <div className="font-medium text-sm text-green-900 mb-1">All systems operational</div>
                  <div className="text-xs text-green-700">This Demo has no issues</div>
                </div>
              </div>
            </div>
          </>
        );

      case 'advanced-settings':
        return (
          <>
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">Advanced Settings</h2>
              <button 
                onClick={onClose}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input type="checkbox" className="mt-1 rounded" />
                <div>
                  <div className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Autoreplay override</div>
                  <div className="text-xs text-gray-500 mt-0.5">Enable automatic replay on errors</div>
                </div>
              </label>
              
              <label className="flex items-start gap-3 cursor-pointer group">
                <input type="checkbox" className="mt-1 rounded" />
                <div>
                  <div className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Error ratio override</div>
                  <div className="text-xs text-gray-500 mt-0.5">Customize error threshold limits</div>
                </div>
              </label>

              <div className="pt-4 border-t border-gray-200">
                <label className="text-sm text-gray-600 mb-2 block">Retry attempts</label>
                <input 
                  type="number" 
                  defaultValue={3}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </>
        );

      case 'versions':
        return (
          <>
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">Versions</h2>
              <button 
                onClick={onClose}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-6">
              <div className="text-sm text-gray-500 text-center py-8">
                <GitBranch className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                <p>This Demo doesn't have any versions</p>
                <button className="mt-4 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  Create Version
                </button>
              </div>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/10 z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Sliding Panel */}
      <div 
        className={`fixed right-0 top-16 bottom-0 w-96 bg-white border-l border-gray-200 shadow-2xl z-50 overflow-y-auto transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {getPanelContent()}
      </div>
    </>
  );
}
