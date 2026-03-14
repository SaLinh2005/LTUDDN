import { Plus, Zap, Play, Mail, CheckCircle, Check, Globe, Send, Webhook } from 'lucide-react';
import { useState, useEffect } from 'react';
import { SelectionModal } from './SelectionModal';
import { EmailTriggerPanel } from './EmailTriggerPanel';
import { APITriggerPanel } from './APITriggerPanel';
import { WebhookTriggerPanel } from './WebhookTriggerPanel';
import { ActionSelectionModal } from './ActionSelectionModal';
import { SendEmailActionPanel } from './SendEmailActionPanel';
import { CallAPIActionPanel } from './CallAPIActionPanel';
import { SendWebhookActionPanel } from './SendWebhookActionPanel';

interface WorkflowCanvasProps {
  onEmailTriggerSelect: () => void;
  emailTriggerConfigOpen: boolean;
  onCloseEmailTriggerConfig: () => void;
  isRunning?: boolean;
}

interface ActionNode {
  id: string;
  type: 'send-email' | 'call-api' | 'send-webhook';
  stepNumber: number;
  tested: boolean;
}

export function WorkflowCanvas({ onEmailTriggerSelect, emailTriggerConfigOpen, onCloseEmailTriggerConfig, isRunning = false }: WorkflowCanvasProps) {
  const [modalType, setModalType] = useState<'trigger' | 'action' | null>(null);
  const [selectedTrigger, setSelectedTrigger] = useState<string | null>(null);
  const [triggerConfigured, setTriggerConfigured] = useState(false);
  const [triggerTested, setTriggerTested] = useState(false);
  const [triggerEvent, setTriggerEvent] = useState<string>('');
  const [webhookTriggerEvent, setWebhookTriggerEvent] = useState<string>('');
  const [apiTriggerConfigOpen, setApiTriggerConfigOpen] = useState(false);
  const [webhookTriggerConfigOpen, setWebhookTriggerConfigOpen] = useState(false);
  const [showActionSelectionModal, setShowActionSelectionModal] = useState(false);
  const [actionNodes, setActionNodes] = useState<ActionNode[]>([]);
  const [activeActionPanel, setActiveActionPanel] = useState<{ type: string; id: string } | null>(null);
  const [selectedActionNodeId, setSelectedActionNodeId] = useState<string | null>(null);

  // Load template data on mount
  useEffect(() => {
    const templateDataStr = localStorage.getItem('templateData');
    const workflowDataStr = localStorage.getItem('workflowData');
    
    // Check for template data first
    if (templateDataStr) {
      const templateData = JSON.parse(templateDataStr);
      
      // Set trigger
      if (templateData.triggerType) {
        setSelectedTrigger(templateData.triggerType);
        setTriggerConfigured(true);
        
        // Set trigger event name if available
        if (templateData.triggerName) {
          if (templateData.triggerType === 'api') {
            setTriggerEvent(templateData.triggerName);
          } else if (templateData.triggerType === 'webhook') {
            setWebhookTriggerEvent(templateData.triggerName);
          }
        }
      }
      
      // Set action
      if (templateData.actionType) {
        const actionNode: ActionNode = {
          id: `${templateData.actionType}-${Date.now()}`,
          type: templateData.actionType as 'send-email' | 'call-api' | 'send-webhook',
          stepNumber: 2,
          tested: false,
        };
        setActionNodes([actionNode]);
      }
      
      // Clear template data from localStorage after loading
      localStorage.removeItem('templateData');
    }
    // Check for workflow data
    else if (workflowDataStr) {
      const workflowData = JSON.parse(workflowDataStr);
      
      // Set trigger
      if (workflowData.triggerType) {
        setSelectedTrigger(workflowData.triggerType);
        setTriggerConfigured(true);
        
        // Set trigger event name if available
        if (workflowData.triggerName) {
          if (workflowData.triggerType === 'api') {
            setTriggerEvent(workflowData.triggerName);
          } else if (workflowData.triggerType === 'webhook') {
            setWebhookTriggerEvent(workflowData.triggerName);
          }
        }
      }
      
      // Set action
      if (workflowData.actionType) {
        const actionNode: ActionNode = {
          id: `${workflowData.actionType}-${Date.now()}`,
          type: workflowData.actionType as 'send-email' | 'call-api' | 'send-webhook',
          stepNumber: 2,
          tested: false,
        };
        setActionNodes([actionNode]);
      }
      
      // Clear workflow data from localStorage after loading
      localStorage.removeItem('workflowData');
    }
  }, []);

  const handleTriggerSelect = (option: string) => {
    setSelectedTrigger(option);
    console.log('Selected trigger:', option);
    
    // If Email is selected, open the configuration panel
    if (option === 'email') {
      setTriggerConfigured(true);
      onEmailTriggerSelect();
    } else if (option === 'api') {
      setTriggerConfigured(true);
      setApiTriggerConfigOpen(true);
    } else if (option === 'webhook') {
      setTriggerConfigured(true);
      setWebhookTriggerConfigOpen(true);
    }
  };

  const handleAPIEventSelect = (event: string) => {
    setTriggerEvent(event);
  };

  const handleWebhookEventSelect = (event: string) => {
    setWebhookTriggerEvent(event);
  };

  const handleAPITestSuccess = () => {
    setTriggerTested(true);
  };

  const handleActionSelect = (actionId: string) => {
    console.log('Selected action:', actionId);
    
    const newActionNode: ActionNode = {
      id: `${actionId}-${Date.now()}`,
      type: actionId as 'send-email' | 'call-api' | 'send-webhook',
      stepNumber: actionNodes.length + 2, // Start from 2 since trigger is 1
      tested: false,
    };

    setActionNodes([...actionNodes, newActionNode]);
    setSelectedActionNodeId(newActionNode.id);
    setActiveActionPanel({ type: actionId, id: newActionNode.id });
  };

  const handleEmailTestSuccess = () => {
    setTriggerTested(true);
  };

  const handleActionTestSuccess = () => {
    if (activeActionPanel) {
      setActionNodes(actionNodes.map(node => 
        node.id === activeActionPanel.id ? { ...node, tested: true } : node
      ));
    }
  };

  const handleActionNodeClick = (nodeId: string) => {
    const node = actionNodes.find(n => n.id === nodeId);
    if (node) {
      setSelectedActionNodeId(nodeId);
      setActiveActionPanel({ type: node.type, id: nodeId });
    }
  };

  const handlePlusButtonClick = () => {
    setShowActionSelectionModal(true);
  };

  const getTriggerNodeContent = () => {
    if (selectedTrigger === 'email') {
      return {
        icon: <Mail className="w-5 h-5 text-blue-600" />,
        title: 'Email',
        description: triggerConfigured ? '1. New Inbound Email' : '1. Select the event',
        showCheckmark: triggerTested,
      };
    } else if (selectedTrigger === 'api') {
      return {
        icon: <Globe className="w-5 h-5 text-blue-600" />,
        title: 'API',
        description: triggerConfigured ? `1. ${triggerEvent}` : '1. Select the event',
        showCheckmark: triggerTested,
      };
    } else if (selectedTrigger === 'webhook') {
      return {
        icon: <Webhook className="w-5 h-5 text-blue-600" />,
        title: 'Webhook',
        description: webhookTriggerEvent ? `1. ${webhookTriggerEvent}` : '1. Select the event',
        showCheckmark: triggerTested,
      };
    }
    return {
      icon: <Zap className="w-5 h-5 text-gray-600" />,
      title: 'Trigger',
      description: '1. Select the event that starts your Demo',
      showCheckmark: false,
    };
  };

  const getActionNodeContent = (actionNode: ActionNode) => {
    if (actionNode.type === 'send-email') {
      return {
        icon: <Mail className="w-5 h-5 text-green-600" />,
        title: 'Email',
        description: `${actionNode.stepNumber}. Send Email`,
        showCheckmark: actionNode.tested,
        bgColor: 'bg-green-100',
        borderColor: actionNode.tested ? 'border-green-300' : 'border-gray-300',
      };
    } else if (actionNode.type === 'call-api') {
      return {
        icon: <Globe className="w-5 h-5 text-blue-600" />,
        title: 'API',
        description: `${actionNode.stepNumber}. Call API`,
        showCheckmark: actionNode.tested,
        bgColor: 'bg-blue-100',
        borderColor: actionNode.tested ? 'border-blue-300' : 'border-gray-300',
      };
    } else if (actionNode.type === 'send-webhook') {
      return {
        icon: <Send className="w-5 h-5 text-orange-600" />,
        title: 'Webhook',
        description: `${actionNode.stepNumber}. Send Webhook`,
        showCheckmark: actionNode.tested,
        bgColor: 'bg-orange-100',
        borderColor: actionNode.tested ? 'border-orange-300' : 'border-gray-300',
      };
    }
    return {
      icon: <Play className="w-5 h-5 text-gray-600" />,
      title: 'Action',
      description: `${actionNode.stepNumber}. Select the event for your Demo to run`,
      showCheckmark: false,
      bgColor: 'bg-gray-100',
      borderColor: 'border-gray-300',
    };
  };

  const triggerContent = getTriggerNodeContent();

  return (
    <div className="flex-1 relative overflow-auto">
      {/* Dotted Grid Background */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #d1d5db 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      />

      {/* Workflow Content */}
      <div className="relative min-h-full flex flex-col items-center pt-16 pb-32">
        {/* "or" divider */}
        <div className="flex items-center gap-4 mb-12 text-gray-400 text-sm">
          <div className="w-32 h-px bg-gray-300" />
          <span>or</span>
          <div className="w-32 h-px bg-gray-300" />
        </div>

        {/* Trigger Node */}
        <div className="relative z-10">
          <div 
            onClick={() => {
              if (selectedTrigger === 'email') {
                onEmailTriggerSelect();
              } else if (selectedTrigger === 'api') {
                setApiTriggerConfigOpen(true);
              } else if (selectedTrigger === 'webhook') {
                setWebhookTriggerConfigOpen(true);
              } else {
                setModalType('trigger');
              }
            }}
            className={`bg-white rounded-xl border-2 ${
              selectedTrigger ? 'border-blue-300' : 'border-dashed border-gray-300'
            } p-8 w-96 shadow-sm hover:shadow-md hover:border-blue-400 transition-all cursor-pointer`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-8 h-8 ${
                selectedTrigger === 'email' || selectedTrigger === 'api' || selectedTrigger === 'webhook' ? 'bg-blue-100' : 'bg-gray-100'
              } rounded-lg flex items-center justify-center`}>
                {triggerContent.icon}
              </div>
              <span className="font-semibold text-gray-900">{triggerContent.title}</span>
              {selectedTrigger && selectedTrigger !== 'email' && selectedTrigger !== 'api' && selectedTrigger !== 'webhook' && (
                <span className="ml-auto px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                  {selectedTrigger}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500 flex items-center gap-2">
              {triggerContent.showCheckmark && (
                <span 
                  className="inline-flex items-center justify-center flex-shrink-0 rounded-full shadow-sm"
                  style={{
                    width: '18px',
                    height: '18px',
                    backgroundColor: '#22C55E'
                  }}
                >
                  <Check className="w-3 h-3 text-white" strokeWidth={3} />
                </span>
              )}
              <span>{triggerContent.description}</span>
            </p>
          </div>

          {/* Connector Line */}
          <div className="flex flex-col items-center">
            <div className="w-0.5 h-12 border-l-2 border-dashed border-gray-300" />
            
            {/* Plus Button */}
            <button 
              onClick={handlePlusButtonClick}
              className="w-8 h-8 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center shadow-md transition-colors z-20"
            >
              <Plus className="w-5 h-5 text-white" />
            </button>
            
            {actionNodes.length > 0 && (
              <div className="w-0.5 h-12 border-l-2 border-dashed border-gray-300" />
            )}
          </div>
        </div>

        {/* Action Nodes */}
        {actionNodes.map((actionNode, index) => {
          const actionContent = getActionNodeContent(actionNode);
          return (
            <div key={actionNode.id} className="relative z-10">
              <div 
                onClick={() => handleActionNodeClick(actionNode.id)}
                className={`bg-white rounded-xl border-2 ${actionContent.borderColor} p-8 w-96 shadow-sm hover:shadow-md hover:border-blue-400 transition-all cursor-pointer`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-8 h-8 ${actionContent.bgColor} rounded-lg flex items-center justify-center`}>
                    {actionContent.icon}
                  </div>
                  <span className="font-semibold text-gray-900">{actionContent.title}</span>
                </div>
                <p className="text-sm text-gray-500 flex items-center gap-2">
                  {actionContent.showCheckmark && (
                    <span 
                      className="inline-flex items-center justify-center flex-shrink-0 rounded-full shadow-sm"
                      style={{
                        width: '18px',
                        height: '18px',
                        backgroundColor: '#22C55E'
                      }}
                    >
                      <Check className="w-3 h-3 text-white" strokeWidth={3} />
                    </span>
                  )}
                  <span>{actionContent.description}</span>
                </p>
              </div>

              {/* Connector Line */}
              <div className="flex flex-col items-center">
                <div className="w-0.5 h-12 border-l-2 border-dashed border-gray-300" />
                
                {/* Plus Button */}
                <button 
                  onClick={handlePlusButtonClick}
                  className="w-8 h-8 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center shadow-md transition-colors z-20"
                >
                  <Plus className="w-5 h-5 text-white" />
                </button>
                
                {index < actionNodes.length - 1 && (
                  <div className="w-0.5 h-12 border-l-2 border-dashed border-gray-300" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selection Modals */}
      <SelectionModal
        isOpen={modalType === 'trigger'}
        onClose={() => setModalType(null)}
        type="trigger"
        onSelect={handleTriggerSelect}
      />

      {/* Action Selection Modal */}
      <ActionSelectionModal
        isOpen={showActionSelectionModal}
        onClose={() => setShowActionSelectionModal(false)}
        onSelect={handleActionSelect}
      />

      {/* Email Trigger Configuration Panel */}
      <EmailTriggerPanel
        isOpen={emailTriggerConfigOpen}
        onClose={onCloseEmailTriggerConfig}
        onTestSuccess={handleEmailTestSuccess}
      />

      {/* Send Email Action Configuration Panel */}
      <SendEmailActionPanel
        isOpen={activeActionPanel?.type === 'send-email'}
        onClose={() => setActiveActionPanel(null)}
        onTestSuccess={handleActionTestSuccess}
      />

      {/* Call API Action Configuration Panel */}
      <CallAPIActionPanel
        isOpen={activeActionPanel?.type === 'call-api'}
        onClose={() => setActiveActionPanel(null)}
        onTestSuccess={handleActionTestSuccess}
      />

      {/* Send Webhook Action Configuration Panel */}
      <SendWebhookActionPanel
        isOpen={activeActionPanel?.type === 'send-webhook'}
        onClose={() => setActiveActionPanel(null)}
        onTestSuccess={handleActionTestSuccess}
      />

      {/* API Trigger Configuration Panel */}
      <APITriggerPanel
        isOpen={apiTriggerConfigOpen}
        onClose={() => setApiTriggerConfigOpen(false)}
        onEventSelect={handleAPIEventSelect}
        onTestSuccess={handleAPITestSuccess}
      />

      {/* Webhook Trigger Configuration Panel */}
      <WebhookTriggerPanel
        isOpen={webhookTriggerConfigOpen}
        onClose={() => setWebhookTriggerConfigOpen(false)}
        onEventSelect={handleWebhookEventSelect}
        onTestSuccess={handleAPITestSuccess}
      />
    </div>
  );
}