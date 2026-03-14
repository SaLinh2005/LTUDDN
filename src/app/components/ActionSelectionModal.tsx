import { X, Mail, Globe, Send } from 'lucide-react';

interface ActionSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (action: string) => void;
}

export function ActionSelectionModal({ isOpen, onClose, onSelect }: ActionSelectionModalProps) {
  if (!isOpen) return null;

  const actions = [
    {
      id: 'send-email',
      name: 'Send Email',
      description: 'Send an email message',
      icon: <Mail className="w-6 h-6 text-green-600" />,
      bgColor: 'bg-green-50',
    },
    {
      id: 'call-api',
      name: 'Call API',
      description: 'Make an API request',
      icon: <Globe className="w-6 h-6 text-blue-600" />,
      bgColor: 'bg-blue-50',
    },
    {
      id: 'send-webhook',
      name: 'Send Webhook',
      description: 'Send a webhook notification',
      icon: <Send className="w-6 h-6 text-orange-600" />,
      bgColor: 'bg-orange-50',
    },
  ];

  return (
    <div 
      className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Select an Action</h2>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="px-6 pt-4 pb-2">
          <input
            type="text"
            placeholder="Search actions..."
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Action Options */}
        <div className="px-6 py-4 space-y-2">
          {actions.map((action) => (
            <button
              key={action.id}
              onClick={() => {
                onSelect(action.id);
                onClose();
              }}
              className="w-full flex items-start gap-4 p-4 hover:bg-gray-50 rounded-xl transition-colors text-left border border-transparent hover:border-gray-200"
            >
              <div className={`w-12 h-12 ${action.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                {action.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 mb-1">{action.name}</h3>
                <p className="text-sm text-gray-500">{action.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
