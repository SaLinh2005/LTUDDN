import { X, Search, Zap, Mail, Webhook, Send, Globe } from 'lucide-react';

interface SelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'trigger' | 'action';
  onSelect: (option: string) => void;
}

export function SelectionModal({ isOpen, onClose, type, onSelect }: SelectionModalProps) {
  if (!isOpen) return null;

  const triggerOptions = [
    {
      id: 'api',
      name: 'API',
      description: 'Trigger when an API request is received',
      icon: <Globe className="w-6 h-6 text-blue-600" />,
      color: 'bg-blue-50',
    },
    {
      id: 'webhook',
      name: 'Webhook',
      description: 'Trigger when a webhook event occurs',
      icon: <Webhook className="w-6 h-6 text-purple-600" />,
      color: 'bg-purple-50',
    },
    {
      id: 'email',
      name: 'Email',
      description: 'Trigger when an email is received',
      icon: <Mail className="w-6 h-6 text-green-600" />,
      color: 'bg-green-50',
    },
  ];

  const actionOptions = [
    {
      id: 'send-email',
      name: 'Send Email',
      description: 'Send an email message',
      icon: <Mail className="w-6 h-6 text-green-600" />,
      color: 'bg-green-50',
    },
    {
      id: 'call-api',
      name: 'Call API',
      description: 'Make an API request',
      icon: <Globe className="w-6 h-6 text-blue-600" />,
      color: 'bg-blue-50',
    },
    {
      id: 'send-webhook',
      name: 'Send Webhook',
      description: 'Send a webhook notification',
      icon: <Send className="w-6 h-6 text-orange-600" />,
      color: 'bg-orange-50',
    },
  ];

  const options = type === 'trigger' ? triggerOptions : actionOptions;
  const title = type === 'trigger' ? 'Select a Trigger' : 'Select an Action';

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center"
        onClick={onClose}
      >
        {/* Modal */}
        <div 
          className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-pink-500 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
            </div>
            <button 
              onClick={onClose}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="space-y-3">
              {options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => {
                    onSelect(option.id);
                    onClose();
                  }}
                  className="w-full flex items-start gap-4 p-4 bg-white border border-gray-200 rounded-xl hover:border-blue-400 hover:bg-blue-50/30 transition-all group"
                >
                  <div className={`${option.color} p-3 rounded-lg group-hover:scale-110 transition-transform`}>
                    {option.icon}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-semibold text-gray-900 mb-1">{option.name}</div>
                    <div className="text-sm text-gray-500">{option.description}</div>
                  </div>
                  <div className="text-gray-400 group-hover:text-blue-600 transition-colors">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              Select an option to continue building your Demo
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
