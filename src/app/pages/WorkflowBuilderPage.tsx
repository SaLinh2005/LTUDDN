import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { CopilotPanel } from '../components/CopilotPanel';
import { WorkflowCanvas } from '../components/WorkflowCanvas';
import { RightPanel } from '../components/RightPanel';
import { TestRunResultsPanel } from '../components/TestRunResultsPanel';
import { PublishModal } from '../components/PublishModal';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { VersionHistoryPanel } from '../components/VersionHistoryPanel';
import { createClient } from '@supabase/supabase-js';

// Khởi tạo kết nối Supabase
const supabaseUrl = 'https://bpyysgnckfaobrjbwidv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJweXlzZ25ja2Zhb2JyamJ3aWR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5ODYxMTQsImV4cCI6MjA4ODU2MjExNH0.1CU73oFPVD63NzLZ4hjAGrkWshk7S4ccTbtS_eVx1MA';
const supabase = createClient(supabaseUrl, supabaseKey);

export type PanelType = 
  | 'linked-assets'
  | 'recent-demos'
  | 'details'
  | 'notes'
  | 'change-history'
  | 'demo-runs'
  | 'status'
  | 'advanced-settings'
  | 'versions'
  | null;

export default function WorkflowBuilderPage() {
  const [activePanel, setActivePanel] = useState<PanelType>(null);
  const [emailTriggerConfigOpen, setEmailTriggerConfigOpen] = useState(false);
  const [testRunResultsOpen, setTestRunResultsOpen] = useState(false);
  const [publishModalOpen, setPublishModalOpen] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  
  const [canvasKey, setCanvasKey] = useState(0); 
  const navigate = useNavigate();

  const [historyList] = useState([
    { id: 'v3', name: 'Version 3', time: 'Just now' },
    { id: 'v2', name: 'Version 2', time: '20 mins ago' },
    { id: 'v1', name: 'Version 1', time: '1 hour ago' }
  ]);

  // HÀM GHI LOG VỚI CHUẨN MIS MỚI
  const logActionToAudit = async (actionName: string, resourceName: string) => {
    const userEmail = localStorage.getItem('userEmail') || 'anhthuqtqt@gmail.com';
    
    const { error } = await supabase.from('audit_logs').insert([
      {
        user_name: 'Phan Huỳnh Sa Linh', 
        user_email: userEmail,
        user_role: 'System Admin',
        action_type: actionName, // Create, Update, Modify, Delete, Execute...
        resource_path: resourceName, // workflows/workflow-mis-123...
        status_result: 'Success',
        ip_address: '192.168.1.1'
      }
    ]);

    if (error) console.error('Lỗi ghi log:', error);
  };

  const handleRestoreVersion = async (version: any) => {
    alert(`Successfully restored to: ${version.name}`);
    
    // 🌟 CHUẨN HÓA LOG: Khôi phục -> Modify
    await logActionToAudit('Modify', `workflows/workflow-mis-123/version/${version.id}`);

    setCanvasKey(prevKey => prevKey + 1); 
    setActivePanel(null); 
    setEmailTriggerConfigOpen(false);
  };

  const handlePanelToggle = (panel: PanelType) => {
    setActivePanel(activePanel === panel ? null : panel);
  };

  const handleEmailTriggerSelect = () => {
    setActivePanel(null);
    setEmailTriggerConfigOpen(true);
  };

  const handleTestRun = async () => {
    setIsRunning(true);
    setActivePanel(null);
    
    // 🌟 CHUẨN HÓA LOG: Chạy thử -> Execute
    await logActionToAudit('Execute', 'workflows/workflow-mis-123/test');

    await new Promise(resolve => setTimeout(resolve, 1200));
    setIsRunning(false);
    setTestRunResultsOpen(true);
  };

  const handleRunAgain = () => {
    setTestRunResultsOpen(false);
    handleTestRun();
  };

  const handlePublishClick = () => {
    setPublishModalOpen(true);
  };

  const handlePublish = async () => {
    setIsPublished(true);
    setShowSuccessToast(true);
    
    // Tạo 1 ID ngẫu nhiên cho chuẩn đường dẫn
    const randomId = Math.floor(Math.random() * 900) + 100; // Random 100-999
    const workflowId = `workflow-mis-${randomId}`;

    // 🌟 CHUẨN HÓA LOG: Đăng flow mới -> Create
    await logActionToAudit('Create', `workflows/${workflowId}`);

    // Lưu dữ liệu để trang Automation đọc được
    const newWorkflow = {
      id: workflowId,
      name: 'My New Workflow', 
      status: 'active',
      trigger: 'Email Event',
      lastRun: 'Just now',
      successRate: '100%',
      updated: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      folder: 'Customer Ops', 
      tags: ['Automated'],
      triggerType: 'email',
      actionType: 'send-email',
      isNew: true, 
    };
    
    localStorage.setItem('newWorkflow', JSON.stringify(newWorkflow));

    setTimeout(() => setShowSuccessToast(false), 3000);
  };

  const handleNavigateToHome = () => {
    navigate('/');
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-50" style={{ fontFamily: 'Inter, sans-serif' }}>
      <Header 
        onTestRun={handleTestRun}
        onPublish={handlePublishClick}
        isPublished={isPublished}
        isRunning={isRunning}
        onOpenHistory={() => setActivePanel('change-history')}
      />

      <div className="flex h-[calc(100vh-64px)]">
        <Sidebar activePanel={activePanel} onPanelToggle={handlePanelToggle} />

        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 flex flex-col overflow-auto">
            <div className="px-8 pt-6">
              <CopilotPanel />
            </div>

            <WorkflowCanvas 
              key={canvasKey} 
              onEmailTriggerSelect={handleEmailTriggerSelect}
              emailTriggerConfigOpen={emailTriggerConfigOpen}
              onCloseEmailTriggerConfig={() => setEmailTriggerConfigOpen(false)}
              isRunning={isRunning}
            />
          </div>
        </div>

        {activePanel !== 'change-history' && activePanel !== 'versions' && (
          <RightPanel activePanel={activePanel} onClose={() => setActivePanel(null)} />
        )}
      </div>

      <TestRunResultsPanel
        isOpen={testRunResultsOpen}
        onClose={() => setTestRunResultsOpen(false)}
        onRunAgain={handleRunAgain}
      />

      <PublishModal
        isOpen={publishModalOpen}
        onClose={() => setPublishModalOpen(false)}
        onPublish={handlePublish}
        onNavigateToHome={handleNavigateToHome}
      />

      <VersionHistoryPanel
        isOpen={activePanel === 'change-history' || activePanel === 'versions'}
        onClose={() => setActivePanel(null)}
        historyList={historyList}
        onRestore={handleRestoreVersion}
      />
    </div>
  );
}