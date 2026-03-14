import { useState } from 'react';
import { X, Check, Mail, ChevronDown, AlertCircle, RefreshCw, CheckCircle } from 'lucide-react';

interface EmailTriggerPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onTestSuccess?: () => void;
}

type Step = 'setup' | 'configure' | 'test';
type Event = 'new-inbound' | 'read-receipt' | null;
type EmailType = 'user-specific' | 'account-wide' | null;

export function EmailTriggerPanel({ isOpen, onClose, onTestSuccess }: EmailTriggerPanelProps) {
  const [currentStep, setCurrentStep] = useState<Step>('setup');
  const [selectedEvent, setSelectedEvent] = useState<Event>(null);
  const [emailType, setEmailType] = useState<EmailType>(null);
  const [emailAddress, setEmailAddress] = useState('');
  const [showEventDropdown, setShowEventDropdown] = useState(false);
  const [showEmailTypeModal, setShowEmailTypeModal] = useState(false);
  const [testResult, setTestResult] = useState<'idle' | 'success'>('idle');

  if (!isOpen) return null;

  const handleEventSelect = (event: Event) => {
    setSelectedEvent(event);
    setShowEventDropdown(false);
    setCurrentStep('configure');
  };

  const handleTest = () => {
    // Simulate successful test
    setTimeout(() => {
      setTestResult('success');
      if (onTestSuccess) onTestSuccess();
    }, 500);
  };

  const canContinueFromConfigure = emailAddress.trim() !== '' && emailType !== null;

  return (
    <>
      {/* Panel */}
      <div 
        className={`fixed right-0 top-16 bottom-0 w-[480px] bg-white border-l border-gray-200 shadow-2xl z-50 overflow-y-auto transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
          <h2 className="font-semibold text-gray-900">
            {currentStep === 'setup' && '1. Select the event'}
            {currentStep === 'configure' && '1. New Inbound Email'}
            {currentStep === 'test' && '1. New Inbound Email'}
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
            Test
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Setup Step */}
          {currentStep === 'setup' && (
            <>
              {/* App Section */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">App</label>
                <div className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                      <Mail className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-900">Email</span>
                  </div>
                  <button className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded transition-colors">
                    Change
                  </button>
                </div>
              </div>

              {/* Trigger Event Section */}
              <div className="relative">
                <label className="text-sm font-medium text-gray-700 mb-2 block">Trigger event</label>
                <button
                  onClick={() => setShowEventDropdown(!showEventDropdown)}
                  className="w-full flex items-center justify-between p-3 bg-white border border-gray-300 rounded-lg hover:border-blue-400 transition-colors text-left"
                >
                  <span className="text-sm text-gray-500">
                    {selectedEvent === 'new-inbound' ? 'New Inbound Email (Instant)' : 'Choose an event'}
                  </span>
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </button>

                {/* Event Dropdown */}
                {showEventDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-20">
                    <div className="p-3 border-b border-gray-200">
                      <input
                        type="text"
                        placeholder="Search events"
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="p-2">
                      <button
                        onClick={() => handleEventSelect('new-inbound')}
                        className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <div className="font-medium text-sm text-gray-900 mb-1">
                          New Inbound Email <span className="text-green-600">(Instant)</span>
                        </div>
                        <div className="text-xs text-gray-500">
                          Triggers when an email is forwarded to a custom system email address.
                        </div>
                      </button>
                      
                      <button
                        onClick={() => handleEventSelect('read-receipt')}
                        className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <div className="font-medium text-sm text-gray-900 mb-1">
                          New Read Receipt <span className="text-green-600">(Instant)</span>
                        </div>
                        <div className="text-xs text-gray-500">
                          Triggers when an email read receipt is detected.
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Configure Step */}
          {currentStep === 'configure' && (
            <>
              {/* Email Address Section */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Email Address</label>
                <input
                  type="email"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  placeholder="Enter email address"
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Information Box */}
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div className="text-sm text-blue-900">
                    <p className="font-medium mb-1">How to use this email address</p>
                    <p className="text-blue-700">
                      Forward emails to this address to trigger your Demo. Any email sent to this address will be captured and processed by your workflow.
                    </p>
                  </div>
                </div>
              </div>

              {/* Email Address Type */}
              <div className="relative">
                <label className="text-sm font-medium text-gray-700 mb-2 block">Email address type</label>
                <button
                  onClick={() => setShowEmailTypeModal(true)}
                  className="w-full flex items-center justify-between p-3 bg-white border border-gray-300 rounded-lg hover:border-blue-400 transition-colors text-left"
                >
                  <span className="text-sm text-gray-700">
                    {emailType === 'user-specific' && 'User-specific'}
                    {emailType === 'account-wide' && 'Account-wide'}
                    {!emailType && 'Select type...'}
                  </span>
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Continue Button */}
              <button
                onClick={() => canContinueFromConfigure && setCurrentStep('test')}
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
                  To confirm your trigger is set up correctly, the system will look for recent emails.
                </p>
                
                {testResult === 'success' && (
                  <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-start gap-3 mb-4">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="font-semibold text-green-900 mb-1">Trigger test successful</p>
                        <p className="text-sm text-green-800">
                          We successfully detected a new inbound email for this trigger.
                        </p>
                      </div>
                    </div>

                    {/* Sample Test Data */}
                    <div className="p-3 bg-white rounded-lg border border-green-200 space-y-2">
                      <div className="flex items-start">
                        <span className="text-xs font-medium text-gray-500 w-24">From:</span>
                        <span className="text-xs text-gray-900">{emailAddress || 'example@gmail.com'}</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-xs font-medium text-gray-500 w-24">Subject:</span>
                        <span className="text-xs text-gray-900">Test email</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-xs font-medium text-gray-500 w-24">Received at:</span>
                        <span className="text-xs text-gray-900">just now</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <button
                    onClick={handleTest}
                    className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    {testResult === 'success' ? 'Retest' : 'Test trigger'}
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

      {/* Email Type Modal */}
      {showEmailTypeModal && (
        <div 
          className="fixed inset-0 bg-black/40 z-[60] flex items-center justify-center"
          onClick={() => setShowEmailTypeModal(false)}
        >
          <div 
            className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">Select value for Email address type</h3>
            </div>
            
            <div className="p-4 space-y-2">
              <button
                onClick={() => {
                  setEmailType('user-specific');
                  setShowEmailTypeModal(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all ${
                  emailType === 'user-specific'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-medium text-gray-900">User-specific</div>
                <div className="text-xs text-gray-500 mt-1">
                  Email address is unique to each user
                </div>
              </button>
              
              <button
                onClick={() => {
                  setEmailType('account-wide');
                  setShowEmailTypeModal(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all ${
                  emailType === 'account-wide'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-medium text-gray-900">Account-wide</div>
                <div className="text-xs text-gray-500 mt-1">
                  Email address is shared across the account
                </div>
              </button>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-2">
              <button
                onClick={() => {
                  setEmailType(null);
                  setShowEmailTypeModal(false);
                }}
                className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Clear selection
              </button>
              <button
                onClick={() => setShowEmailTypeModal(false)}
                className="px-4 py-2 text-sm bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}