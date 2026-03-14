import { useState, useEffect } from 'react';
// 👇 ĐÃ SỬA CHỖ NÀY THÀNH react-router-dom
import { useNavigate } from 'react-router';
import { 
  Bell, 
  Settings, 
  Search, 
  Plus, 
  Play, 
  Edit, 
  MoreHorizontal,
  Folder,
  Tag
} from 'lucide-react';
import { NotificationDropdown } from '../components/NotificationDropdown';
import { UserAccountDropdown } from '../components/UserAccountDropdown';

interface Workflow {
  id: string;
  name: string;
  status: 'active' | 'paused';
  trigger: string;
  lastRun: string;
  successRate: string;
  updated: string;
  isNew?: boolean;
  folder: string;
  tags: string[];
  triggerType: string; // 'email', 'api', 'webhook'
  actionType: string; // 'send-email', 'call-api', 'send-webhook'
}

const initialWorkflows: Workflow[] = [
  {
    id: '1',
    name: 'Customer Onboarding Flow',
    status: 'active',
    trigger: 'Form Submission',
    lastRun: '2 mins ago',
    successRate: '98.5%',
    updated: 'Jan 27, 2026',
    folder: 'Customer Ops',
    tags: ['Automated'],
    triggerType: 'api',
    actionType: 'send-email',
  },
  {
    id: '2',
    name: 'Invoice Processing',
    status: 'active',
    trigger: 'Scheduled Daily',
    lastRun: '15 mins ago',
    successRate: '94.2%',
    updated: 'Jan 26, 2026',
    folder: 'Finance',
    tags: ['Critical'],
    triggerType: 'api',
    actionType: 'call-api',
  },
  {
    id: '3',
    name: 'Employee Onboarding Approval',
    status: 'paused',
    trigger: 'Manual',
    lastRun: '2 hours ago',
    successRate: '96.8%',
    updated: 'Jan 25, 2026',
    folder: 'HR & Onboarding',
    tags: ['Manual Review'],
    triggerType: 'email',
    actionType: 'send-email',
  },
  {
    id: '4',
    name: 'Campaign Webhook Sync',
    status: 'active',
    trigger: 'Webhook',
    lastRun: '5 mins ago',
    successRate: '99.1%',
    updated: 'Jan 27, 2026',
    folder: 'Marketing',
    tags: ['Automated'],
    triggerType: 'webhook',
    actionType: 'call-api',
  },
  {
    id: '5',
    name: 'New Email → Send Notification',
    status: 'active',
    trigger: 'Email Received',
    lastRun: '1 hour ago',
    successRate: '97.3%',
    updated: 'Jan 24, 2026',
    folder: 'Customer Ops',
    tags: ['Automated'],
    triggerType: 'email',
    actionType: 'send-email',
  },
  {
    id: '6',
    name: 'Payment Reminder Automation',
    status: 'active',
    trigger: 'Scheduled',
    lastRun: '30 mins ago',
    successRate: '99.5%',
    updated: 'Jan 27, 2026',
    folder: 'Finance',
    tags: ['Critical', 'Automated'],
    triggerType: 'api',
    actionType: 'send-email',
  },
  {
    id: '7',
    name: 'New Hire Welcome Email',
    status: 'active',
    trigger: 'API Event',
    lastRun: '3 hours ago',
    successRate: '100%',
    updated: 'Jan 26, 2026',
    folder: 'HR & Onboarding',
    tags: ['Automated'],
    triggerType: 'api',
    actionType: 'send-email',
  },
  {
    id: '8',
    name: 'Lead Capture → Send Email',
    status: 'active',
    trigger: 'Form Submission',
    lastRun: '10 mins ago',
    successRate: '98.8%',
    updated: 'Jan 27, 2026',
    folder: 'Marketing',
    tags: ['Automated'],
    triggerType: 'api',
    actionType: 'send-email',
  },
  {
    id: '9',
    name: 'Deal Follow-up Workflow',
    status: 'active',
    trigger: 'Webhook',
    lastRun: '25 mins ago',
    successRate: '95.7%',
    updated: 'Jan 26, 2026',
    folder: 'Sales',
    tags: ['Automated'],
    triggerType: 'webhook',
    actionType: 'send-email',
  },
  {
    id: '10',
    name: 'API Lead Assignment',
    status: 'active',
    trigger: 'API Event',
    lastRun: '45 mins ago',
    successRate: '96.2%',
    updated: 'Jan 25, 2026',
    folder: 'Sales',
    tags: ['Automated'],
    triggerType: 'api',
    actionType: 'call-api',
  },
  {
    id: '11',
    name: 'Old Approval Workflow',
    status: 'paused',
    trigger: 'Manual',
    lastRun: '5 days ago',
    successRate: '89.3%',
    updated: 'Jan 15, 2026',
    folder: 'HR & Onboarding',
    tags: ['Deprecated'],
    triggerType: 'email',
    actionType: 'send-email',
  },
];

const folders = [
  { name: 'All Workflows' },
  { name: 'Customer Ops' },
  { name: 'Finance' },
  { name: 'HR & Onboarding' },
  { name: 'Marketing' },
  { name: 'Sales' },
];

const tags = [
  { name: 'Critical', color: 'text-red-600 bg-red-50' },
  { name: 'Automated', color: 'text-blue-600 bg-blue-50' },
  { name: 'Manual Review', color: 'text-yellow-600 bg-yellow-50' },
  { name: 'Deprecated', color: 'text-gray-600 bg-gray-50' },
];

export default function HomePage() {
  const navigate = useNavigate();
  const [selectedFolder, setSelectedFolder] = useState('All Workflows');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [triggerFilter, setTriggerFilter] = useState('All Triggers');
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [workflows, setWorkflows] = useState<Workflow[]>(initialWorkflows);
  const [highlightedWorkflowId, setHighlightedWorkflowId] = useState<string | null>(null);

  // Check for new workflow from localStorage
  useEffect(() => {
    const newWorkflowData = localStorage.getItem('newWorkflow');
    if (newWorkflowData) {
      const newWorkflow: Workflow = JSON.parse(newWorkflowData);
      setWorkflows((prev) => [newWorkflow, ...prev]);
      setHighlightedWorkflowId(newWorkflow.id);
      
      // Remove from localStorage
      localStorage.removeItem('newWorkflow');
      
      // Remove highlight after 3 seconds
      setTimeout(() => {
        setHighlightedWorkflowId(null);
      }, 3000);
    }
  }, []);

  const handleNewWorkflow = () => {
    navigate('/builder');
  };

  const handleNavigateToAuditLog = () => {
    navigate('/audit-log');
  };

  const handleNavigateToTemplates = () => {
    navigate('/templates');
  };

  const handleNavigateToAutomation = () => {
    navigate('/automation');
  };

  const handleNavigateToSettings = () => {
    navigate('/settings');
  };

  const handleTagClick = (tagName: string) => {
    if (selectedTag === tagName) {
      setSelectedTag(null); // Deselect if already selected
      setSelectedFolder('All Workflows'); // Reset to All Workflows
    } else {
      setSelectedTag(tagName);
      setSelectedFolder('All Workflows'); // Reset folder when tag is selected
    }
  };

  const handleFolderClick = (folderName: string) => {
    setSelectedFolder(folderName);
    setSelectedTag(null); // Reset tag when folder is selected
  };

  const handleWorkflowClick = (workflow: Workflow) => {
    // Store workflow data in localStorage for the builder to load
    localStorage.setItem('workflowData', JSON.stringify({
      workflowId: workflow.id,
      workflowName: workflow.name,
      triggerType: workflow.triggerType,
      triggerName: workflow.trigger,
      actionType: workflow.actionType,
      actionName: workflow.name,
    }));
    navigate('/builder');
  };

  const handleClearFilters = () => {
    setSelectedFolder('All Workflows');
    setSelectedTag(null);
    setSearchQuery('');
    setStatusFilter('All Status');
    setTriggerFilter('All Triggers');
  };

  // Count filtered workflows
  const filteredWorkflows = workflows.filter((workflow) => {
    // Tag filter takes precedence over folder filter
    let primaryMatch = true;
    if (selectedTag) {
      primaryMatch = workflow.tags && workflow.tags.includes(selectedTag);
    } else {
      primaryMatch = selectedFolder === 'All Workflows' || workflow.folder === selectedFolder;
    }
    
    const searchMatch = workflow.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        workflow.trigger.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        workflow.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        workflow.folder.toLowerCase().includes(searchQuery.toLowerCase());
    const statusMatch = statusFilter === 'All Status' || workflow.status === statusFilter.toLowerCase();
    const triggerMatch = triggerFilter === 'All Triggers' || workflow.trigger === triggerFilter;
    
    return primaryMatch && searchMatch && statusMatch && triggerMatch;
  });

  const hasActiveFilters = selectedFolder !== 'All Workflows' || selectedTag !== null || searchQuery !== '' || statusFilter !== 'All Status' || triggerFilter !== 'All Triggers';

  // Calculate folder counts dynamically
  const getFolderCount = (folderName: string) => {
    if (folderName === 'All Workflows') {
      return workflows.length;
    }
    return workflows.filter(w => w.folder === folderName).length;
  };

  // Calculate tag counts dynamically
  const getTagCount = (tagName: string) => {
    return workflows.filter(w => w.tags && w.tags.includes(tagName)).length;
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
            <a href="#" className="text-sm font-medium text-gray-900 border-b-2 border-orange-500 pb-1">
              Home
            </a>
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
          
          <button onClick={handleNavigateToSettings} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
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

      <div className="flex h-[calc(100vh-64px)]">
        {/* Left Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-4">
            {/* Folders Section */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Folder className="w-4 h-4 text-gray-500" />
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Folders
                </h3>
              </div>
              <div className="space-y-1">
                {folders.map((folder) => (
                  <button
                    key={folder.name}
                    onClick={() => handleFolderClick(folder.name)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between ${
                      selectedFolder === folder.name && !selectedTag
                        ? 'bg-blue-50 text-blue-700 font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span>{folder.name}</span>
                    <span className={`text-xs tabular-nums ${
                      selectedFolder === folder.name && !selectedTag ? 'text-blue-600' : 'text-gray-500'
                    }`}>{getFolderCount(folder.name)}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tags Section */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Tag className="w-4 h-4 text-gray-500" />
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Tags
                </h3>
              </div>
              <div className="space-y-1">
                {tags.map((tag) => (
                  <button
                    key={tag.name}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between ${
                      selectedTag === tag.name
                        ? 'bg-blue-50 text-blue-700 font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => handleTagClick(tag.name)}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${tag.color.split(' ')[1].replace('bg-', 'bg-')}`}></div>
                      <span>{tag.name}</span>
                    </div>
                    <span className={`text-xs tabular-nums ${
                      selectedTag === tag.name ? 'text-blue-600' : 'text-gray-500'
                    }`}>{getTagCount(tag.name)}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-8">
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-gray-900 mb-4">Workflows</h1>
              
              <div className="flex items-center gap-4">
                {/* Search Bar */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search workflows..."
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                {/* Filters */}
                <select
                  className="px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option>All Status</option>
                  <option>Active</option>
                  <option>Paused</option>
                </select>

                <select
                  className="px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={triggerFilter}
                  onChange={(e) => setTriggerFilter(e.target.value)}
                >
                  <option>All Triggers</option>
                  <option>Form Submission</option>
                  <option>Scheduled</option>
                  <option>Webhook</option>
                  <option>Manual</option>
                </select>

                {/* New Workflow Button */}
                <button
                  onClick={handleNewWorkflow}
                  className="px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors flex items-center gap-2 whitespace-nowrap"
                >
                  <Plus className="w-4 h-4" />
                  New Workflow
                </button>
              </div>
            </div>

            {/* Workflows Table */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                      Trigger
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                      Last Run
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                      Success Rate
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                      Updated
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredWorkflows
                    .map((workflow) => (
                      <tr 
                        key={workflow.id} 
                        className={`hover:bg-gray-50 transition-all duration-500 cursor-pointer ${
                          highlightedWorkflowId === workflow.id 
                            ? 'bg-blue-50 border-l-4 border-blue-500' 
                            : ''
                        }`}
                        onClick={() => handleWorkflowClick(workflow)}
                      >
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">{workflow.name}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                              workflow.status === 'active'
                                ? 'bg-green-50 text-green-700'
                                : 'bg-yellow-50 text-yellow-700'
                            }`}
                          >
                            <div
                              className={`w-1.5 h-1.5 rounded-full ${
                                workflow.status === 'active' ? 'bg-green-600' : 'bg-yellow-600'
                              }`}
                            ></div>
                            {workflow.status.charAt(0).toUpperCase() + workflow.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-700">{workflow.trigger}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-700">{workflow.lastRun}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-medium text-gray-900">{workflow.successRate}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-700">{workflow.updated}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors" title="Run">
                              <Play className="w-4 h-4 text-gray-600" />
                            </button>
                            <button 
                              onClick={handleNewWorkflow}
                              className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors" 
                              title="Edit"
                            >
                              <Edit className="w-4 h-4 text-gray-600" />
                            </button>
                            <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors" title="More">
                              <MoreHorizontal className="w-4 h-4 text-gray-600" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}