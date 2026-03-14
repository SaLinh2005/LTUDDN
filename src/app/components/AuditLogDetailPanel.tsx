import { X, User, Activity, MapPin, Calendar, CheckCircle, AlertTriangle, XCircle, Globe, Monitor, Clock } from 'lucide-react';

interface AuditLog {
  id: string;
  user: string;
  action: string;
  target: string;
  location: string;
  dateTime: string;
  status: 'success' | 'warning' | 'failed';
  details: string;
  metadata?: {
    ipAddress?: string;
    browser?: string;
    duration?: string;
  };
}

interface AuditLogDetailPanelProps {
  isOpen: boolean;
  log: AuditLog | null;
  onClose: () => void;
}

export function AuditLogDetailPanel({ isOpen, log, onClose }: AuditLogDetailPanelProps) {
  if (!isOpen || !log) return null;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'warning':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'failed':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/20 z-40"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Audit Log Details</h2>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Status Badge */}
          <div className="flex items-center justify-between">
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border ${getStatusBadge(log.status)}`}>
              {getStatusIcon(log.status)}
              <span className="capitalize">{log.status}</span>
            </div>
            <span className="text-xs text-gray-500">ID: {log.id}</span>
          </div>

          {/* Main Info */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 mb-1">User</p>
                <p className="text-sm font-medium text-gray-900">{log.user}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Activity className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 mb-1">Action</p>
                <p className="text-sm font-medium text-gray-900">{log.action}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Activity className="w-5 h-5 text-orange-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 mb-1">Target</p>
                <p className="text-sm font-medium text-gray-900">{log.target}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 mb-1">Location</p>
                <p className="text-sm font-medium text-gray-900">{log.location}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5 text-indigo-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 mb-1">Date & Time</p>
                <p className="text-sm font-medium text-gray-900">{log.dateTime}</p>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Details</h3>
            <p className="text-sm text-gray-700 bg-gray-50 p-4 rounded-lg border border-gray-200">
              {log.details}
            </p>
          </div>

          {/* Metadata Section */}
          {log.metadata && (
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Additional Information</h3>
              <div className="space-y-3">
                {log.metadata.ipAddress && (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Globe className="w-4 h-4 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500">IP Address</p>
                      <p className="text-sm font-medium text-gray-900">{log.metadata.ipAddress}</p>
                    </div>
                  </div>
                )}
                {log.metadata.browser && (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Monitor className="w-4 h-4 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500">Browser</p>
                      <p className="text-sm font-medium text-gray-900">{log.metadata.browser}</p>
                    </div>
                  </div>
                )}
                {log.metadata.duration && (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Clock className="w-4 h-4 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500">Duration</p>
                      <p className="text-sm font-medium text-gray-900">{log.metadata.duration}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="border-t border-gray-200 pt-6">
            <button
              onClick={onClose}
              className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
