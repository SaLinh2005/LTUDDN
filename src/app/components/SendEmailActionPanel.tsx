import { useState } from 'react';
import { X, Check, Mail, CheckCircle } from 'lucide-react';

interface SendEmailActionPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onTestSuccess?: () => void;
}

type Step = 'setup' | 'configure' | 'test';

export function SendEmailActionPanel({ isOpen, onClose, onTestSuccess }: SendEmailActionPanelProps) {
  const [currentStep, setCurrentStep] = useState<Step>('setup');
  const [testResult, setTestResult] = useState<'idle' | 'success'>('idle');
  
  // Form fields
  const [to, setTo] = useState('');
  const [cc, setCc] = useState('');
  const [bcc, setBcc] = useState('');
  const [from, setFrom] = useState('');
  const [fromName, setFromName] = useState('');
  const [replyTo, setReplyTo] = useState('');
  const [subject, setSubject] = useState('');
  const [bodyType, setBodyType] = useState<'plain' | 'html'>('plain');
  const [body, setBody] = useState('');
  const [addSignature, setAddSignature] = useState('default');
  const [signatureDelimiter, setSignatureDelimiter] = useState<'true' | 'false'>('false');
  const [labelOrMailbox, setLabelOrMailbox] = useState('');
  const [attachments, setAttachments] = useState('');
  const [sendToContacts, setSendToContacts] = useState<'true' | 'false'>('false');

  if (!isOpen) return null;

  const handleContinueToTest = () => {
    setCurrentStep('test');
    // Auto-trigger test success
    setTimeout(() => {
      setTestResult('success');
      if (onTestSuccess) {
        onTestSuccess();
      }
    }, 500);
  };

  const canContinueFromConfigure = to.trim() !== '' && subject.trim() !== '';

  return (
    <div 
      className={`fixed right-0 top-16 bottom-0 w-[480px] bg-white border-l border-gray-200 shadow-2xl z-50 overflow-y-auto transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
        <h2 className="font-semibold text-gray-900">2. Send Email</h2>
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
          onClick={() => setCurrentStep('configure')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            currentStep === 'configure'
              ? 'bg-blue-50 text-blue-700'
              : 'text-gray-600 hover:bg-gray-50'
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
              <label className="text-sm font-medium text-gray-700 mb-2 block">Action</label>
              <div className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center">
                    <Mail className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-900">Send Email</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-600 mt-0.5" />
                <div className="text-sm text-blue-900">
                  <p className="font-medium mb-1">Email Action</p>
                  <p className="text-blue-700">
                    This action will send an email message with the content you configure in the next step.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setCurrentStep('configure')}
              className="w-full px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              Continue
            </button>
          </>
        )}

        {/* Configure Step */}
        {currentStep === 'configure' && (
          <>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">To</label>
              <input
                type="email"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="recipient@example.com"
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Cc</label>
              <input
                type="email"
                value={cc}
                onChange={(e) => setCc(e.target.value)}
                placeholder="cc@example.com"
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Bcc</label>
              <input
                type="email"
                value={bcc}
                onChange={(e) => setBcc(e.target.value)}
                placeholder="bcc@example.com"
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">From</label>
              <input
                type="email"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                placeholder="sender@example.com"
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">From Name</label>
              <input
                type="text"
                value={fromName}
                onChange={(e) => setFromName(e.target.value)}
                placeholder="Your Name"
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Reply To</label>
              <input
                type="email"
                value={replyTo}
                onChange={(e) => setReplyTo(e.target.value)}
                placeholder="reply@example.com"
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Email subject"
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Body type</label>
              <select
                value={bodyType}
                onChange={(e) => setBodyType(e.target.value as 'plain' | 'html')}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="plain">Plain</option>
                <option value="html">Html</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Body</label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Email content..."
                rows={6}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Add signature default</label>
              <select
                value={addSignature}
                onChange={(e) => setAddSignature(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="default">Default</option>
                <option value="none">None</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Signature delimiter</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setSignatureDelimiter('true')}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    signatureDelimiter === 'true'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  True
                </button>
                <button
                  onClick={() => setSignatureDelimiter('false')}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    signatureDelimiter === 'false'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  False
                </button>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Label or mailbox</label>
              <select
                value={labelOrMailbox}
                onChange={(e) => setLabelOrMailbox(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select...</option>
                <option value="inbox">Inbox</option>
                <option value="sent">Sent</option>
                <option value="drafts">Drafts</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Attachments</label>
              <input
                type="text"
                value={attachments}
                onChange={(e) => setAttachments(e.target.value)}
                placeholder="file.pdf, image.png"
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Send message to Google Contacts Group/Label
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setSendToContacts('true')}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    sendToContacts === 'true'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  True
                </button>
                <button
                  onClick={() => setSendToContacts('false')}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    sendToContacts === 'false'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  False
                </button>
              </div>
            </div>

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
              <h3 className="font-semibold text-gray-900 mb-2">Test your action</h3>
              <p className="text-sm text-gray-600 mb-4">
                To confirm your action is set up correctly, we'll prepare a test email.
              </p>
              
              {testResult === 'success' && (
                <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-start gap-3 mb-4">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="font-semibold text-green-900 mb-1">Action test successful</p>
                      <p className="text-sm text-green-800">
                        The email action was configured correctly and the test message was prepared successfully.
                      </p>
                    </div>
                  </div>

                  {/* Sample Output */}
                  <div className="p-3 bg-white rounded-lg border border-green-200 space-y-2">
                    <div className="flex items-start">
                      <span className="text-xs font-medium text-gray-500 w-24">To:</span>
                      <span className="text-xs text-gray-900">{to || 'example@gmail.com'}</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-xs font-medium text-gray-500 w-24">Subject:</span>
                      <span className="text-xs text-gray-900">{subject || 'Test email'}</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-xs font-medium text-gray-500 w-24">Status:</span>
                      <span className="text-xs text-gray-900">Ready to send</span>
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
