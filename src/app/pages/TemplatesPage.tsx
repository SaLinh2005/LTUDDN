import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { 
  Bell, 
  Search,
  ChevronDown,
  Mail,
  Webhook,
  Database,
  MessageSquare,
  CheckCircle,
  FileText,
  Zap,
  Plus,
  Settings
} from 'lucide-react';
import { NotificationDropdown } from '../components/NotificationDropdown';
import { UserAccountDropdown } from '../components/UserAccountDropdown';
import { TemplatePreviewModal } from '../components/TemplatePreviewModal';
import { createClient } from '@supabase/supabase-js';

// 🌟 Khởi tạo Supabase y chang trang Audit
const supabaseUrl = 'https://bpyysgnckfaobrjbwidv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJweXlzZ25ja2Zhb2JyamJ3aWR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5ODYxMTQsImV4cCI6MjA4ODU2MjExNH0.1CU73oFPVD63NzLZ4hjAGrkWshk7S4ccTbtS_eVx1MA';
const supabase = createClient(supabaseUrl, supabaseKey);

// 🌟 Đã đổi tên thành Template cho khớp với bên dưới
interface Template {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: string;
  trigger: string;
  action: string;
  popularity: number;
  dateAdded: string;
  status?: 'draft' | 'published';
}

const templates: Template[] = [
  { id: '1', title: 'New Email → Send Notification', description: 'Trigger when a new email arrives and notify a team channel.', category: 'Email automation', icon: 'mail', trigger: 'Email Received', action: 'Send Notification', popularity: 98, dateAdded: '2026-01-20' },
  { id: '2', title: 'Webhook → Call API', description: 'Receive webhook data and send it to another system via API.', category: 'Webhook automation', icon: 'webhook', trigger: 'Webhook', action: 'Call API', popularity: 95, dateAdded: '2026-01-18' },
  { id: '3', title: 'Form Submission → Send Email', description: 'When a form is submitted, send a confirmation email automatically.', category: 'Email automation', icon: 'file', trigger: 'Form Submitted', action: 'Send Email', popularity: 92, dateAdded: '2026-01-15' },
  { id: '4', title: 'API Event → Create Workflow Record', description: 'Trigger automation when an API request is received.', category: 'API integration', icon: 'database', trigger: 'API Event', action: 'Create Record', popularity: 89, dateAdded: '2026-01-12' },
  { id: '5', title: 'Webhook → Data Sync', description: 'Sync webhook payload data into another service.', category: 'Data sync', icon: 'webhook', trigger: 'Webhook', action: 'Sync Data', popularity: 87, dateAdded: '2026-01-10' },
  { id: '6', title: 'Approval Request → Send Notification', description: 'When an approval is needed, notify the approver automatically.', category: 'Approval workflows', icon: 'check', trigger: 'Approval Requested', action: 'Send Notification', popularity: 85, dateAdded: '2026-01-08' },
  { id: '7', title: 'New Customer → Welcome Email', description: 'Send a welcome email sequence when a new customer signs up.', category: 'Email automation', icon: 'mail', trigger: 'Customer Created', action: 'Send Email Sequence', popularity: 83, dateAdded: '2026-01-05' },
  { id: '8', title: 'Scheduled Report → Send Email', description: 'Generate and email reports on a scheduled basis.', category: 'Email automation', icon: 'file', trigger: 'Schedule', action: 'Generate & Send Report', popularity: 80, dateAdded: '2026-01-03' },
  { id: '9', title: 'API Error → Alert Team', description: 'Monitor API errors and alert the technical team immediately.', category: 'Notifications', icon: 'message', trigger: 'API Error', action: 'Send Alert', popularity: 78, dateAdded: '2026-01-01' },
];

export default function TemplatesPage() {
  const navigate = useNavigate();
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All templates');
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [allTemplates, setAllTemplates] = useState<Template[]>(templates);
  const [loadingTemplateId, setLoadingTemplateId] = useState<string | null>(null);

  useEffect(() => {
    const customTemplates = JSON.parse(localStorage.getItem('customTemplates') || '[]');
    setAllTemplates([...customTemplates, ...templates]);
  }, []);

  // 🌟 Hàm ghi log viết thẳng trong này cho chắc ăn, không import nữa
  const logActionToAudit = async (actionName: string, resourceName: string) => {
    const userEmail = localStorage.getItem('userEmail') || 'anhthuqtqt@gmail.com';
    const { error } = await supabase.from('audit_logs').insert([
      {
        user_name: 'Phan Huỳnh Sa Linh', 
        user_email: userEmail,
        user_role: 'System Admin',
        action_type: actionName,
        resource_path: resourceName,
        status_result: 'Success',
        ip_address: '192.168.1.1'
      }
    ]);
    if (error) console.error('Lỗi ghi log:', error);
  };

  const handleUseTemplate = async (template: Template) => {
    if (loadingTemplateId === template.id) return;
    setLoadingTemplateId(template.id);

    try {
      const triggerTypeMap: any = { 'Email Received': 'email', 'Webhook': 'webhook', 'Form Submitted': 'api', 'API Event': 'api', 'Schedule': 'api', 'Customer Created': 'email', 'Approval Requested': 'email', 'API Error': 'api' };
      const actionTypeMap: any = { 'Send Notification': 'send-email', 'Call API': 'call-api', 'Send Email': 'send-email', 'Create Record': 'call-api', 'Sync Data': 'send-webhook', 'Send Email Sequence': 'send-email', 'Generate & Send Report': 'send-email', 'Send Alert': 'send-email' };

      const templateDataToStore = {
        templateId: template.id,
        templateTitle: template.title,
        triggerType: triggerTypeMap[template.trigger] || 'email',
        triggerName: template.trigger,
        actionType: actionTypeMap[template.action] || 'send-email',
        actionName: template.action,
      };

      localStorage.setItem('templateData', JSON.stringify(templateDataToStore));
      
      // 🌟 GỌI HÀM GHI LOG VÀO SUPABASE NGAY ĐÂY
      await logActionToAudit('Used Template', template.title);

      navigate('/builder');
    } catch (error: any) {
      alert('Lỗi khi dùng template!');
    } finally {
      setLoadingTemplateId(null);
    }
  };

  const filteredAndSortedTemplates = allTemplates.filter((template) => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = template.title.toLowerCase().includes(searchLower) || template.description.toLowerCase().includes(searchLower);
    if (!matchesSearch) return false;
    if (selectedCategory !== 'All templates' && template.category !== selectedCategory) return false;
    return true;
  });

  const getIconComponent = (iconType: string) => {
    switch (iconType) {
      case 'mail': return <Mail className="w-6 h-6" />;
      case 'webhook': return <Webhook className="w-6 h-6" />;
      case 'database': return <Database className="w-6 h-6" />;
      case 'message': return <MessageSquare className="w-6 h-6" />;
      case 'check': return <CheckCircle className="w-6 h-6" />;
      case 'file': return <FileText className="w-6 h-6" />;
      default: return <Zap className="w-6 h-6" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Email automation': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Webhook automation': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'API integration': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-50 flex flex-col" style={{ fontFamily: 'Inter, sans-serif' }}>
      <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">⚡</span>
            </div>
            <span className="text-lg font-semibold text-gray-900">DemoWebsite</span>
          </div>

          <nav className="flex items-center gap-6">
            <button onClick={() => navigate('/')} className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Home</button>
            <button onClick={() => navigate('/builder')} className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Workflow Designer</button>
            <button onClick={() => navigate('/automation')} className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Automation</button>
            <button className="text-sm font-medium text-gray-900 border-b-2 border-orange-500 pb-1">Templates</button>
            <button onClick={() => navigate('/audit-log')} className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Audit Log</button>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={() => setNotificationOpen(!notificationOpen)} className="p-2 hover:bg-gray-100 rounded-lg relative">
            <Bell className="w-5 h-5 text-gray-600" /><span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <NotificationDropdown isOpen={notificationOpen} onClose={() => setNotificationOpen(false)} />
          <button onClick={() => navigate('/settings')} className="p-2 hover:bg-gray-100 rounded-lg"><Settings className="w-5 h-5 text-gray-600" /></button>
          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center"><span className="text-purple-600 text-xs font-semibold">HH</span></div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">Templates</h1>
            <p className="text-sm text-gray-600">Start faster by using pre-built automation templates.</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-2 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="text" placeholder="Search templates..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <button onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)} className="flex items-center justify-between px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 relative">
                <span>{selectedCategory}</span><ChevronDown className="w-4 h-4" />
              </button>
              <button onClick={() => navigate('/templates/create')} className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-medium transition-colors">
                <Plus className="w-4 h-4" /> Create Template
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedTemplates.map((template) => (
              <div key={template.id} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-pink-500 rounded-lg flex items-center justify-center text-white">{getIconComponent(template.icon)}</div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getCategoryColor(template.category)}`}>{template.category}</span>
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">{template.title}</h3>
                <p className="text-sm text-gray-600 mb-6 line-clamp-2">{template.description}</p>
                <div className="flex items-center gap-3">
                  <button onClick={() => handleUseTemplate(template)} disabled={loadingTemplateId === template.id} className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors disabled:bg-blue-300">
                    {loadingTemplateId === template.id ? 'Loading...' : 'Use Template'}
                  </button>
                  <button onClick={() => { setPreviewTemplate(template); setPreviewModalOpen(true); }} className="px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg text-sm font-medium">Preview</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <TemplatePreviewModal isOpen={previewModalOpen} template={previewTemplate} onClose={() => setPreviewModalOpen(false)} onUseTemplate={handleUseTemplate} />
    </div>
  );
}