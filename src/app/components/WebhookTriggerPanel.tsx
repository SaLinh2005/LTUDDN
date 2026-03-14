import { useState, useEffect } from 'react';
import { X, Check, Webhook, CheckCircle, ChevronDown } from 'lucide-react';

interface WebhookTriggerPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onTestSuccess?: () => void;
  onEventSelect?: (event: string) => void;
}

type Step = 'setup' | 'configure' | 'test';

export function WebhookTriggerPanel({ isOpen, onClose, onTestSuccess, onEventSelect }: WebhookTriggerPanelProps) {
  const [currentStep, setCurrentStep] = useState<Step>('setup');
  const [testResult, setTestResult] = useState<'idle' | 'success'>('idle');
  const [showEventSelector, setShowEventSelector] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<string>('');
  
  // Form fields
  const [webhookName, setWebhookName] = useState('');
  const [endpointUrl, setEndpointUrl] = useState('');
  const [httpMethod, setHttpMethod] = useState<'POST' | 'PUT'>('POST');
  const [contentType, setContentType] = useState<'application/json' | 'application/x-www-form-urlencoded' | 'text/plain'>('application/json');
  const [secretVerification, setSecretVerification] = useState<'true' | 'false'>('false');
  const [secretKey, setSecretKey] = useState('');
  const [storeRawPayload, setStoreRawPayload] = useState<'true' | 'false'>('true');
  const [responseBehavior, setResponseBehavior] = useState<'200' | 'custom'>('200');
  const [customResponse, setCustomResponse] = useState('');

  // Auto-trigger test success when entering test step
  useEffect(() => {
    if (currentStep === 'test' && testResult === 'idle') {
      const timer = window.setTimeout(() => {
        setTestResult('success');
        if (onTestSuccess) {
          onTestSuccess();
        }
      }, 500);
      return () => window.clearTimeout(timer);
    }
  }, [currentStep, testResult, onTestSuccess]);

  if (!isOpen) return null;

  const handleEventSelect = (event: string) => {
    setSelectedEvent(event);
    setShowEventSelector(false);
    if (onEventSelect) {
      onEventSelect(event);
    }
    // Auto-advance to configure step
    setTimeout(() => {
      setCurrentStep('configure');
    }, 300);
  };

  const handleContinueToTest = () => {
    setCurrentStep('test');
  };

  const canContinueFromConfigure = endpointUrl.trim() !== '';

  const triggerEvents = [
    {
      id: 'new-webhook-received',
      name: 'New Webhook Received',
      description: 'Triggers when a webhook payload is received from an external service.',
    },
    {
      id: 'verified-webhook-received',
      name: 'Verified Webhook Received',
      description: 'Triggers when a verified webhook payload is received with a matching secret.',
    },
  ];

  return (
    <div 
      className={`fixed right-0 top-16 bottom-0 w-[480px] bg-white border-l border-gray-200 shadow-2xl z-50 overflow-y-auto transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
        <h2 className="font-semibold text-gray-900">
          {selectedEvent ? '1. New Webhook Received' : '1. Select the event'}
        </h2>
        <button 
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      {/* Tabs */}
      <div className="px-6 py-4 border-b border-gray-200 flex items-center gap-4">
        <button
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            currentStep === 'setup'
              ? 'bg-blue-50 text-blue-700'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          {(currentStep === 'configure' || currentStep === 'test') && (
            <Check className="w-4 h-4 text-green-600" />
          )}
          Setup
        </button>
        
        <button
          onClick={() => selectedEvent && setCurrentStep('configure')}
          disabled={!selectedEvent}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            currentStep === 'configure'
              ? 'bg-blue-50 text-blue-700'
              : selectedEvent
              ? 'text-gray-600 hover:bg-gray-50'
              : 'text-gray-400 cursor-not-allowed'
          }`}
        >
          {currentStep === 'test' && <Check className="w-4 h-4 text-green-600" />}
          Configure
        </button>
        
        <button
          onClick={() => canContinueFromConfigure && setCurrentStep('test')}
          disabled={!canContinueFromConfigure}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            currentStep === 'test'
              ? 'bg-blue-50 text-blue-700'
              : canContinueFromConfigure
              ? 'text-gray-600 hover:bg-gray-50'
              : 'text-gray-400 cursor-not-allowed'
          }`}
        >
          {testResult === 'success' && <Check className="w-4 h-4 text-green-600" />}
          Test
        </button>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Setup Step */}
        {currentStep === 'setup' && (
          <>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Trigger event</label>
              <button
                onClick={() => setShowEventSelector(!showEventSelector)}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className={selectedEvent ? 'text-gray-900' : 'text-gray-500'}>
                  {selectedEvent || 'Select an event...'}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>

              {/* Event Selector Dropdown */}
              {showEventSelector && (
                <div className="mt-2 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                  <div className="p-3 border-b border-gray-200">
                    <input
                      type="text"
                      placeholder="Search events"
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {triggerEvents.map((event) => (
                      <button
                        key={event.id}
                        onClick={() => handleEventSelect(event.name)}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                      >
                        <div className="font-medium text-gray-900 text-sm mb-1">{event.name}</div>
                        <div className="text-xs text-gray-500">{event.description}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {selectedEvent && (
              <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <Webhook className="w-5 h-5 text-purple-600 mt-0.5" />
                  <div className="text-sm text-purple-900">
                    <p className="font-medium mb-1">Webhook Trigger</p>
                    <p className="text-purple-700">
                      This trigger will activate when a webhook payload is received at your configured endpoint.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* Configure Step */}
        {currentStep === 'configure' && (
          <>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Webhook Name</label>
              <input
                type="text"
                value={webhookName}
                onChange={(e) => setWebhookName(e.target.value)}
                placeholder="My Webhook"
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Endpoint URL</label>
              <input
                type="text"
                value={endpointUrl}
                onChange={(e) => setEndpointUrl(e.target.value)}
                placeholder="https://example.com/webhook"
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">HTTP Method</label>
              <select
                value={httpMethod}
                onChange={(e) => setHttpMethod(e.target.value as 'POST' | 'PUT')}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Content Type</label>
              <select
                value={contentType}
                onChange={(e) => setContentType(e.target.value as any)}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="application/json">application/json</option>
                <option value="application/x-www-form-urlencoded">application/x-www-form-urlencoded</option>
                <option value="text/plain">text/plain</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Secret Verification Enabled</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setSecretVerification('true')}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    secretVerification === 'true'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  True
                </button>
                <button
                  onClick={() => setSecretVerification('false')}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    secretVerification === 'false'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  False
                </button>
              </div>
            </div>

            {secretVerification === 'true' && (
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Secret Key</label>
                <input
                  type="text"
                  value={secretKey}
                  onChange={(e) => setSecretKey(e.target.value)}
                  placeholder="your-secret-key"
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            )}

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Store Raw Payload</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setStoreRawPayload('true')}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    storeRawPayload === 'true'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  True
                </button>
                <button
                  onClick={() => setStoreRawPayload('false')}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    storeRawPayload === 'false'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  False
                </button>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Response Behavior</label>
              <select
                value={responseBehavior}
                onChange={(e) => setResponseBehavior(e.target.value as '200' | 'custom')}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="200">Return 200 OK</option>
                <option value="custom">Return custom response</option>
              </select>
            </div>

            {responseBehavior === 'custom' && (
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Custom Response Body</label>
                <textarea
                  value={customResponse}
                  onChange={(e) => setCustomResponse(e.target.value)}
                  placeholder='{\n  "status": "received",\n  "message": "Webhook processed"\n}'
                  rows={6}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono"
                />
              </div>
            )}

            <button
              onClick={handleContinueToTest}
              disabled={!canContinueFromConfigure}
              className={`w-full px-4 py-2.5 rounded-lg font-medium transition-colors ${
                canContinueFromConfigure
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Continue
            </button>
          </>
        )}

        {/* Test Step */}
        {currentStep === 'test' && (
          <>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Test your trigger</h3>
              <p className="text-sm text-gray-600 mb-4">
                To confirm your trigger is set up correctly, we'll simulate a sample webhook payload.
              </p>
              
              {testResult === 'success' && (
                <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-start gap-3 mb-4">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="font-semibold text-green-900 mb-1">Trigger test successful</p>
                      <p className="text-sm text-green-800">
                        We successfully received a sample webhook payload for this trigger.
                      </p>
                    </div>
                  </div>

                  {/* Sample Test Data */}
                  <div className="p-3 bg-white rounded-lg border border-green-200 space-y-2">
                    <div className="flex items-start">
                      <span className="text-xs font-medium text-gray-500 w-32">Method:</span>
                      <span className="text-xs text-gray-900">{httpMethod}</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-xs font-medium text-gray-500 w-32">Content Type:</span>
                      <span className="text-xs text-gray-900">{contentType}</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-xs font-medium text-gray-500 w-32">Delivery:</span>
                      <span className="text-xs text-gray-900">Successful</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-xs font-medium text-gray-500 w-32">Received at:</span>
                      <span className="text-xs text-gray-900">just now</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <button
                  onClick={() => setTestResult('success')}
                  className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  Retest
                </button>
                {testResult === 'success' && (
                  <button 
                    onClick={onClose}
                    className="px-6 py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-medium transition-colors"
                  >
                    Continue
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
