import { CheckCircle, AlertCircle, Pause, Play } from 'lucide-react';

interface NotificationDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

const notifications = [
  {
    id: 1,
    icon: CheckCircle,
    iconColor: 'text-green-600',
    iconBg: 'bg-green-50',
    text: "Workflow 'Customer Onboarding Flow' ran successfully",
    time: '2 mins ago',
  },
  {
    id: 2,
    icon: AlertCircle,
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-50',
    text: 'New webhook trigger received',
    time: '15 mins ago',
  },
  {
    id: 3,
    icon: Pause,
    iconColor: 'text-yellow-600',
    iconBg: 'bg-yellow-50',
    text: 'Invoice Processing workflow was paused',
    time: '1 hour ago',
  },
  {
    id: 4,
    icon: Play,
    iconColor: 'text-green-600',
    iconBg: 'bg-green-50',
    text: 'Test run completed successfully',
    time: '2 hours ago',
  },
];

export function NotificationDropdown({ isOpen, onClose }: NotificationDropdownProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40" 
        onClick={onClose}
      />
      
      {/* Dropdown */}
      <div className="absolute right-0 top-full mt-2 w-96 bg-white rounded-xl border border-gray-200 shadow-xl z-50 overflow-hidden">
        {/* Header */}
        <div className="px-4 py-3 border-b border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
        </div>

        {/* Notifications List */}
        <div className="max-h-96 overflow-y-auto">
          {notifications.map((notification) => {
            const Icon = notification.icon;
            return (
              <div
                key={notification.id}
                className="px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
              >
                <div className="flex gap-3">
                  <div className={`w-8 h-8 rounded-full ${notification.iconBg} flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-4 h-4 ${notification.iconColor}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 leading-snug mb-1">
                      {notification.text}
                    </p>
                    <p className="text-xs text-gray-500">{notification.time}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
            View all notifications
          </button>
        </div>
      </div>
    </>
  );
}
