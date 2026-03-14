import { useState } from 'react';
import { useNavigate } from 'react-router';
import { 
  Bell, 
  Settings, 
  User,
  Lock,
  Mail,
  Zap,
  Link,
  Palette,
  ChevronRight,
  Check
} from 'lucide-react';
import { NotificationDropdown } from '../components/NotificationDropdown';
import { UserAccountDropdown } from '../components/UserAccountDropdown';

type SettingsSection = 'profile' | 'account' | 'security' | 'notifications' | 'workflow-preferences' | 'integrations' | 'appearance';

export default function SettingsPage() {
  const navigate = useNavigate();
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<SettingsSection>('profile');
  const [showSaveConfirmation, setShowSaveConfirmation] = useState(false);

  // Profile settings
  const [profileName, setProfileName] = useState('Hân Hân');
  const [profileEmail, setProfileEmail] = useState('anhthuqtqt@gmail.com');
  const [organization, setOrganization] = useState('Demo Company');

  // Account settings
  const [accountType, setAccountType] = useState('Individual');
  const [timezone, setTimezone] = useState('America/Los_Angeles');
  const [language, setLanguage] = useState('English');

  // Security settings
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  // Notification settings
  const [workflowRunNotifications, setWorkflowRunNotifications] = useState(true);
  const [errorNotifications, setErrorNotifications] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [systemUpdates, setSystemUpdates] = useState(false);

  // Workflow preferences
  const [defaultTrigger, setDefaultTrigger] = useState('api');
  const [defaultAction, setDefaultAction] = useState('send-email');
  const [autoSaveWorkflows, setAutoSaveWorkflows] = useState(true);

  // Appearance settings
  const [theme, setTheme] = useState('Light');
  const [uiDensity, setUiDensity] = useState('Comfortable');

  const handleNavigateToHome = () => {
    navigate('/');
  };

  const handleNavigateToAutomation = () => {
    navigate('/automation');
  };

  const handleNavigateToAuditLog = () => {
    navigate('/audit-log');
  };

  const handleNavigateToTemplates = () => {
    navigate('/templates');
  };

  const handleSaveSettings = () => {
    setShowSaveConfirmation(true);
    setTimeout(() => {
      setShowSaveConfirmation(false);
    }, 3000);
  };

  const settingsSections = [
    { id: 'profile' as SettingsSection, label: 'Profile', icon: User },
    { id: 'account' as SettingsSection, label: 'Account', icon: Settings },
    { id: 'security' as SettingsSection, label: 'Security', icon: Lock },
    { id: 'notifications' as SettingsSection, label: 'Notifications', icon: Bell },
    { id: 'workflow-preferences' as SettingsSection, label: 'Workflow Preferences', icon: Zap },
    { id: 'integrations' as SettingsSection, label: 'Integrations', icon: Link },
    { id: 'appearance' as SettingsSection, label: 'Appearance', icon: Palette },
  ];

  const renderSettingsContent = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-1">Profile</h2>
              <p className="text-sm text-gray-600">Manage your personal information</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Photo
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 text-xl font-semibold">HH</span>
                  </div>
                  <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                    Change Photo
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={profileEmail}
                  onChange={(e) => setProfileEmail(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Organization
                </label>
                <input
                  type="text"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <button
              onClick={handleSaveSettings}
              className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors"
            >
              Save Changes
            </button>
          </div>
        );

      case 'account':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-1">Account</h2>
              <p className="text-sm text-gray-600">Manage your account settings</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Account Type
                </label>
                <select
                  value={accountType}
                  onChange={(e) => setAccountType(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option>Individual</option>
                  <option>Team</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Timezone
                </label>
                <select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="America/Los_Angeles">Pacific Time (PT)</option>
                  <option value="America/Denver">Mountain Time (MT)</option>
                  <option value="America/Chicago">Central Time (CT)</option>
                  <option value="America/New_York">Eastern Time (ET)</option>
                  <option value="UTC">UTC</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Language
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleSaveSettings}
              className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors"
            >
              Save Changes
            </button>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-1">Security</h2>
              <p className="text-sm text-gray-600">Manage your security settings</p>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Change Password</h3>
                <div className="space-y-3">
                  <input
                    type="password"
                    placeholder="Current Password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="password"
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">Two-Factor Authentication</h3>
                    <p className="text-sm text-gray-600 mt-1">Add an extra layer of security to your account</p>
                  </div>
                  <button
                    onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      twoFactorEnabled ? 'bg-blue-500' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={handleSaveSettings}
              className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors"
            >
              Update Security Settings
            </button>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-1">Notifications</h2>
              <p className="text-sm text-gray-600">Manage your notification preferences</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between py-3">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Workflow run notifications</h3>
                  <p className="text-sm text-gray-600 mt-1">Get notified when workflows complete</p>
                </div>
                <button
                  onClick={() => setWorkflowRunNotifications(!workflowRunNotifications)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    workflowRunNotifications ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      workflowRunNotifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between py-3 border-t border-gray-200">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Error notifications</h3>
                  <p className="text-sm text-gray-600 mt-1">Get notified when workflows fail</p>
                </div>
                <button
                  onClick={() => setErrorNotifications(!errorNotifications)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    errorNotifications ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      errorNotifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between py-3 border-t border-gray-200">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Email alerts</h3>
                  <p className="text-sm text-gray-600 mt-1">Receive important updates via email</p>
                </div>
                <button
                  onClick={() => setEmailAlerts(!emailAlerts)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    emailAlerts ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      emailAlerts ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between py-3 border-t border-gray-200">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">System updates</h3>
                  <p className="text-sm text-gray-600 mt-1">Get notified about platform updates</p>
                </div>
                <button
                  onClick={() => setSystemUpdates(!systemUpdates)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    systemUpdates ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      systemUpdates ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            <button
              onClick={handleSaveSettings}
              className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors"
            >
              Save Changes
            </button>
          </div>
        );

      case 'workflow-preferences':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-1">Workflow Preferences</h2>
              <p className="text-sm text-gray-600">Customize your workflow defaults</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Default Trigger Type
                </label>
                <select
                  value={defaultTrigger}
                  onChange={(e) => setDefaultTrigger(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="email">Email</option>
                  <option value="api">API</option>
                  <option value="webhook">Webhook</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Default Action Type
                </label>
                <select
                  value={defaultAction}
                  onChange={(e) => setDefaultAction(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="send-email">Send Email</option>
                  <option value="call-api">Call API</option>
                  <option value="send-webhook">Send Webhook</option>
                </select>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">Auto-save workflows</h3>
                    <p className="text-sm text-gray-600 mt-1">Automatically save workflow changes</p>
                  </div>
                  <button
                    onClick={() => setAutoSaveWorkflows(!autoSaveWorkflows)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      autoSaveWorkflows ? 'bg-blue-500' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        autoSaveWorkflows ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={handleSaveSettings}
              className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors"
            >
              Save Changes
            </button>
          </div>
        );

      case 'integrations':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-1">Integrations</h2>
              <p className="text-sm text-gray-600">Manage your connected services</p>
            </div>

            <div className="space-y-3">
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Mail className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">Google</h3>
                      <p className="text-xs text-gray-600">Connected as henry@demowebsite.com</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-white border border-red-300 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
                    Disconnect
                  </button>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Link className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">Webhook Endpoints</h3>
                      <p className="text-xs text-gray-600">3 active endpoints</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                    Manage
                  </button>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Lock className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">API Keys</h3>
                      <p className="text-xs text-gray-600">2 active keys</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                    Manage
                  </button>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Zap className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">Slack</h3>
                      <p className="text-xs text-gray-600">Not connected</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-medium transition-colors">
                    Connect
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'appearance':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-1">Appearance</h2>
              <p className="text-sm text-gray-600">Customize how the platform looks</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Theme
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setTheme('Light')}
                    className={`p-4 border-2 rounded-lg transition-all ${
                      theme === 'Light'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">Light</span>
                      {theme === 'Light' && <Check className="w-4 h-4 text-blue-500" />}
                    </div>
                    <div className="h-20 bg-white border border-gray-200 rounded"></div>
                  </button>
                  <button
                    onClick={() => setTheme('Dark')}
                    className={`p-4 border-2 rounded-lg transition-all ${
                      theme === 'Dark'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">Dark</span>
                      {theme === 'Dark' && <Check className="w-4 h-4 text-blue-500" />}
                    </div>
                    <div className="h-20 bg-gray-900 border border-gray-700 rounded"></div>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  UI Density
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setUiDensity('Compact')}
                    className={`p-4 border-2 rounded-lg transition-all ${
                      uiDensity === 'Compact'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">Compact</span>
                      {uiDensity === 'Compact' && <Check className="w-4 h-4 text-blue-500" />}
                    </div>
                  </button>
                  <button
                    onClick={() => setUiDensity('Comfortable')}
                    className={`p-4 border-2 rounded-lg transition-all ${
                      uiDensity === 'Comfortable'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">Comfortable</span>
                      {uiDensity === 'Comfortable' && <Check className="w-4 h-4 text-blue-500" />}
                    </div>
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={handleSaveSettings}
              className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors"
            >
              Save Changes
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-50" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Top Navigation */}
      <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
        {/* Left: Logo and Nav */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">⚡</span>
            </div>
            <span className="text-lg font-semibold text-gray-900">DemoWebsite</span>
          </div>

          <nav className="flex items-center gap-6">
            <button onClick={handleNavigateToHome} className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Home
            </button>
            <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Workflow Designer
            </a>
            <button onClick={handleNavigateToAutomation} className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Automation
            </button>
            <button onClick={handleNavigateToTemplates} className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Templates
            </button>
            <button onClick={handleNavigateToAuditLog} className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Audit Log
            </button>
            <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Version History
            </a>
          </nav>
        </div>

        {/* Right: Icons */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <button 
              onClick={() => {
                setNotificationOpen(!notificationOpen);
                setUserMenuOpen(false);
              }}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
            >
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <NotificationDropdown 
              isOpen={notificationOpen} 
              onClose={() => setNotificationOpen(false)} 
            />
          </div>
          
          <button className="p-2 bg-blue-50 rounded-lg transition-colors">
            <Settings className="w-5 h-5 text-blue-600" />
          </button>
          
          <div className="relative">
            <button 
              onClick={() => {
                setUserMenuOpen(!userMenuOpen);
                setNotificationOpen(false);
              }}
              className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center hover:bg-purple-200 transition-colors"
            >
              <span className="text-purple-600 text-xs font-semibold">HH</span>
            </button>
            <UserAccountDropdown 
              isOpen={userMenuOpen} 
              onClose={() => setUserMenuOpen(false)} 
            />
          </div>
        </div>
      </header>

      {/* Save Confirmation Toast */}
      {showSaveConfirmation && (
        <div className="fixed top-20 right-6 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50 animate-slide-in">
          <Check className="w-5 h-5" />
          <span className="text-sm font-medium">Settings saved successfully</span>
        </div>
      )}

      <div className="flex h-[calc(100vh-64px)]">
        {/* Left Sidebar - Settings Navigation */}
        <aside className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-4">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Settings
            </h2>
            <div className="space-y-1">
              {settingsSections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors ${
                      activeSection === section.id
                        ? 'bg-blue-50 text-blue-700 font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${activeSection === section.id ? 'text-blue-600' : 'text-gray-500'}`} />
                      <span>{section.label}</span>
                    </div>
                    <ChevronRight className={`w-4 h-4 ${activeSection === section.id ? 'text-blue-600' : 'text-gray-400'}`} />
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Main Content - Settings Panel */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-3xl p-8">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              {renderSettingsContent()}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}