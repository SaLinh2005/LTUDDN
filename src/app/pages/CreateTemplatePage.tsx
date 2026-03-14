import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Bell, Settings, ArrowLeft, Zap, ArrowRight } from 'lucide-react';
import { NotificationDropdown } from '../components/NotificationDropdown';
import { UserAccountDropdown } from '../components/UserAccountDropdown';

export default function CreateTemplatePage() {
  const navigate = useNavigate();
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Form state
  const [templateName, setTemplateName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Email automation');
  const [tags, setTags] = useState('');
  const [triggerType, setTriggerType] = useState('Email Received');
  const [triggerEvent, setTriggerEvent] = useState('');
  const [actionType, setActionType] = useState('Send Email');
  const [actionSummary, setActionSummary] = useState('');

  const handleCancel = () => {
    navigate('/templates');
  };

  const handleSaveDraft = () => {
    const newTemplate = {
      id: `draft-${Date.now()}`,
      title: templateName || 'Untitled Template',
      description: description || 'No description',
      category,
      icon: getIconFromCategory(category),
      trigger: triggerType,
      action: actionType,
      popularity: 0,
      dateAdded: new Date().toISOString().split('T')[0],
      status: 'draft',
    };

    // Save to localStorage
    const existingTemplates = JSON.parse(localStorage.getItem('customTemplates') || '[]');
    existingTemplates.push(newTemplate);
    localStorage.setItem('customTemplates', JSON.stringify(existingTemplates));

    // Navigate back to templates page
    navigate('/templates');
  };

  const handlePublish = () => {
    const newTemplate = {
      id: `template-${Date.now()}`,
      title: templateName || 'Untitled Template',
      description: description || 'No description',
      category,
      icon: getIconFromCategory(category),
      trigger: triggerType,
      action: actionType,
      popularity: Math.floor(Math.random() * 20) + 60,
      dateAdded: new Date().toISOString().split('T')[0],
      status: 'published',
    };

    // Save to localStorage
    const existingTemplates = JSON.parse(localStorage.getItem('customTemplates') || '[]');
    existingTemplates.push(newTemplate);
    localStorage.setItem('customTemplates', JSON.stringify(existingTemplates));

    // Navigate back to templates page
    navigate('/templates');
  };

  const getIconFromCategory = (cat: string) => {
    switch (cat) {
      case 'Email automation':
        return 'mail';
      case 'Webhook automation':
        return 'webhook';
      case 'API integration':
        return 'database';
      case 'Data sync':
        return 'webhook';
      case 'Notifications':
        return 'message';
      case 'Approval workflows':
        return 'check';
      default:
        return 'file';
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-50" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Top Navigation */}
      <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
        {/* Left: Logo and Back Button */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">⚡</span>
            </div>
            <span className="text-lg font-semibold text-gray-900">DemoWebsite</span>
          </div>

          <button
            onClick={handleCancel}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Templates
          </button>
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
          
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Settings className="w-5 h-5 text-gray-600" />
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

      <div className="h-[calc(100vh-64px)] overflow-y-auto">
        <div className="max-w-4xl mx-auto px-6 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">Create Template</h1>
            <p className="text-sm text-gray-600">
              Build a reusable workflow template for your team.
            </p>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {/* Basic Information */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h2 className="text-base font-semibold text-gray-900 mb-4">Basic Information</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Template Name
                  </label>
                  <input
                    type="text"
                    value={templateName}
                    onChange={(e) => setTemplateName(e.target.value)}
                    placeholder="e.g., New Lead → Send Welcome Email"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe what this template does and when to use it..."
                    rows={3}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option>Email automation</option>
                      <option>API integration</option>
                      <option>Webhook automation</option>
                      <option>Data sync</option>
                      <option>Notifications</option>
                      <option>Approval workflows</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tags
                    </label>
                    <input
                      type="text"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      placeholder="e.g., sales, marketing, automation"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Trigger Setup */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h2 className="text-base font-semibold text-gray-900 mb-4">Trigger Setup</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Trigger Type
                  </label>
                  <select
                    value={triggerType}
                    onChange={(e) => setTriggerType(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option>Email Received</option>
                    <option>API Event</option>
                    <option>Webhook</option>
                    <option>Form Submitted</option>
                    <option>Schedule</option>
                    <option>Customer Created</option>
                    <option>Approval Requested</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Trigger Event Details (Optional)
                  </label>
                  <input
                    type="text"
                    value={triggerEvent}
                    onChange={(e) => setTriggerEvent(e.target.value)}
                    placeholder="e.g., when email contains specific subject line"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Action Setup */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h2 className="text-base font-semibold text-gray-900 mb-4">Action Setup</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Action Type
                  </label>
                  <select
                    value={actionType}
                    onChange={(e) => setActionType(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option>Send Email</option>
                    <option>Call API</option>
                    <option>Send Webhook</option>
                    <option>Send Notification</option>
                    <option>Create Record</option>
                    <option>Sync Data</option>
                    <option>Send Alert</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Action Summary
                  </label>
                  <input
                    type="text"
                    value={actionSummary}
                    onChange={(e) => setActionSummary(e.target.value)}
                    placeholder="e.g., send welcome email to new customer"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Template Preview */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h2 className="text-base font-semibold text-gray-900 mb-4">Template Preview</h2>
              
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-gray-200">
                <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-4">
                  Workflow Structure
                </p>
                
                <div className="flex items-center justify-center gap-6">
                  {/* Trigger Node */}
                  <div className="bg-white rounded-lg border-2 border-blue-500 shadow-sm p-4 flex-1 max-w-[200px]">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                        <Zap className="w-3.5 h-3.5 text-blue-600" />
                      </div>
                      <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
                        Trigger
                      </span>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      {triggerType || 'Select trigger type'}
                    </p>
                  </div>

                  {/* Arrow */}
                  <ArrowRight className="w-6 h-6 text-gray-400 flex-shrink-0" />

                  {/* Action Node */}
                  <div className="bg-white rounded-lg border-2 border-purple-500 shadow-sm p-4 flex-1 max-w-[200px]">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                        <Zap className="w-3.5 h-3.5 text-purple-600" />
                      </div>
                      <span className="text-xs font-semibold text-purple-600 uppercase tracking-wide">
                        Action
                      </span>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      {actionType || 'Select action type'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 pb-8">
              <button
                onClick={handleCancel}
                className="px-6 py-2.5 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveDraft}
                className="px-6 py-2.5 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg font-medium transition-colors"
              >
                Save as Draft
              </button>
              <button
                onClick={handlePublish}
                className="flex-1 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                Publish Template
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
