import { Check, Settings as SettingsIcon, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router';
import { logout } from '../utils/auth';

interface UserAccountDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UserAccountDropdown({ isOpen, onClose }: UserAccountDropdownProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    onClose();
    navigate('/login');
  };

  const handleNavigateToSettings = () => {
    onClose();
    navigate('/settings');
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40" 
        onClick={onClose}
      />
      
      {/* Dropdown */}
      <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-xl border border-gray-200 shadow-xl z-50 overflow-hidden">
        {/* Email Header */}
        <div className="px-4 py-3 border-b border-gray-200">
          <p className="text-xs text-gray-500">Signed in as</p>
          <p className="text-sm font-medium text-gray-900 mt-0.5">anhthuqtqt@gmail.com</p>
        </div>

        {/* Active Account Card */}
        <div className="px-2 py-2">
          <div className="flex items-center gap-3 px-3 py-2.5 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-purple-600 text-sm font-semibold">HH</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">Hân Hân</p>
              <p className="text-xs text-gray-600">Individual</p>
            </div>
            <Check className="w-5 h-5 text-blue-600 flex-shrink-0" />
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-200 my-1"></div>

        {/* Menu Items */}
        <div className="py-1">
          <button 
            onClick={handleNavigateToSettings}
            className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors text-left"
          >
            <SettingsIcon className="w-4 h-4 text-gray-600" />
            <span className="text-sm text-gray-900">Settings</span>
          </button>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors text-left"
          >
            <LogOut className="w-4 h-4 text-gray-600" />
            <span className="text-sm text-gray-900">Log out</span>
          </button>
        </div>
      </div>
    </>
  );
}