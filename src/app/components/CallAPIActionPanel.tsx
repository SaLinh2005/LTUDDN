import { useState, useEffect } from 'react';
import { X, Check, Globe, CheckCircle, Plus, Trash2 } from 'lucide-react';

interface CallAPIActionPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onTestSuccess?: () => void;
}

type Step = 'setup' | 'configure' | 'test';
type AuthType = 'none' | 'bearer' | 'api-key' | 'basic';
type BodyType = 'json' | 'form-data' | 'raw';

interface KeyValuePair {
  id: string;
  key: string;
  value: string;
}

export function CallAPIActionPanel({ isOpen, onClose, onTestSuccess }: CallAPIActionPanelProps) {
  const [currentStep, setCurrentStep] = useState<Step>('setup');
  const [testResult, setTestResult] = useState<'idle' | 'success'>('idle');
  
  // Form fields
  const [requestName, setRequestName] = useState('');
  const [method, setMethod] = useState<'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'>('GET');
  const [endpointUrl, setEndpointUrl] = useState('');
  const [authType, setAuthType] = useState<AuthType>('none');
  const [bearerToken, setBearerToken] = useState('');
  const [apiKeyName, setApiKeyName] = useState('');
  const [apiKeyValue, setApiKeyValue] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [queryParams, setQueryParams] = useState<KeyValuePair[]>([{ id: '1', key: '', value: '' }]);
  const [headers, setHeaders] = useState<KeyValuePair[]>([{ id: '1', key: '', value: '' }]);
  const [bodyType, setBodyType] = useState<BodyType>('json');
  const [requestBody, setRequestBody] = useState('');
  const [timeout, setTimeout] = useState('30');
  const [retryOnFailure, setRetryOnFailure] = useState<'true' | 'false'>('false');

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

  const handleContinueToTest = () => {
    setCurrentStep('test');
  };

  const canContinueFromConfigure = endpointUrl.trim() !== '';

  const addQueryParam = () => {
    setQueryParams([...queryParams, { id: Date.now().toString(), key: '', value: '' }]);
  };

  const removeQueryParam = (id: string) => {
    setQueryParams(queryParams.filter(p => p.id !== id));
  };

  const updateQueryParam = (id: string, field: 'key' | 'value', value: string) => {
    setQueryParams(queryParams.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const addHeader = () => {
    setHeaders([...headers, { id: Date.now().toString(), key: '', value: '' }]);
  };

  const removeHeader = (id: string) => {
    setHeaders(headers.filter(h => h.id !== id));
  };

  const updateHeader = (id: string, field: 'key' | 'value', value: string) => {
    setHeaders(headers.map(h => h.id === id ? { ...h, [field]: value } : h));
  };

  return (
    <div 
      className={`fixed right-0 top-16 bottom-0 w-[480px] bg-white border-l border-gray-200 shadow-2xl z-50 overflow-y-auto transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
        <h2 className="font-semibold text-gray-900">2. Call API</h2>
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
                  <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                    <Globe className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-900">Call API</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-3">
                <Globe className="w-5 h-5 text-blue-600 mt-0.5" />
                <div className="text-sm text-blue-900">
                  <p className="font-medium mb-1">API Action</p>
                  <p className="text-blue-700">
                    This action will make an HTTP request to the API endpoint you configure in the next step.
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
              <label className="text-sm font-medium text-gray-700 mb-2 block">Request Name</label>
              <input
                type="text"
                value={requestName}
                onChange={(e) => setRequestName(e.target.value)}
                placeholder="My API Request"
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Method</label>
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value as any)}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="PATCH">PATCH</option>
                <option value="DELETE">DELETE</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Endpoint URL</label>
              <input
                type="url"
                value={endpointUrl}
                onChange={(e) => setEndpointUrl(e.target.value)}
                placeholder="https://api.example.com/endpoint"
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Authentication Type</label>
              <select
                value={authType}
                onChange={(e) => setAuthType(e.target.value as AuthType)}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="none">None</option>
                <option value="bearer">Bearer Token</option>
                <option value="api-key">API Key</option>
                <option value="basic">Basic Auth</option>
              </select>
            </div>

            {/* Conditional Auth Fields */}
            {authType === 'bearer' && (
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Authorization Token</label>
                <input
                  type="text"
                  value={bearerToken}
                  onChange={(e) => setBearerToken(e.target.value)}
                  placeholder="your-bearer-token"
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            )}

            {authType === 'api-key' && (
              <>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">API Key Name</label>
                  <input
                    type="text"
                    value={apiKeyName}
                    onChange={(e) => setApiKeyName(e.target.value)}
                    placeholder="X-API-Key"
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">API Key Value</label>
                  <input
                    type="text"
                    value={apiKeyValue}
                    onChange={(e) => setApiKeyValue(e.target.value)}
                    placeholder="your-api-key-value"
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </>
            )}

            {authType === 'basic' && (
              <>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Username</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="username"
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="password"
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </>
            )}

            {/* Query Parameters */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Query Parameters</label>
              <div className="space-y-2">
                {queryParams.map((param) => (
                  <div key={param.id} className="flex gap-2">
                    <input
                      type="text"
                      value={param.key}
                      onChange={(e) => updateQueryParam(param.id, 'key', e.target.value)}
                      placeholder="Key"
                      className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      value={param.value}
                      onChange={(e) => updateQueryParam(param.id, 'value', e.target.value)}
                      placeholder="Value"
                      className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {queryParams.length > 1 && (
                      <button
                        onClick={() => removeQueryParam(param.id)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={addQueryParam}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add parameter
                </button>
              </div>
            </div>

            {/* Headers */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Headers</label>
              <div className="space-y-2">
                {headers.map((header) => (
                  <div key={header.id} className="flex gap-2">
                    <input
                      type="text"
                      value={header.key}
                      onChange={(e) => updateHeader(header.id, 'key', e.target.value)}
                      placeholder="Header Name"
                      className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      value={header.value}
                      onChange={(e) => updateHeader(header.id, 'value', e.target.value)}
                      placeholder="Header Value"
                      className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {headers.length > 1 && (
                      <button
                        onClick={() => removeHeader(header.id)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={addHeader}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add header
                </button>
              </div>
            </div>

            {/* Request Body Type */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Request Body Type</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setBodyType('json')}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    bodyType === 'json'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  JSON
                </button>
                <button
                  onClick={() => setBodyType('form-data')}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    bodyType === 'form-data'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Form Data
                </button>
                <button
                  onClick={() => setBodyType('raw')}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    bodyType === 'raw'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Raw Text
                </button>
              </div>
            </div>

            {/* Request Body */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Request Body</label>
              <textarea
                value={requestBody}
                onChange={(e) => setRequestBody(e.target.value)}
                placeholder={bodyType === 'json' ? '{\n  "key": "value"\n}' : 'Request body content...'}
                rows={6}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono"
              />
            </div>

            {/* Timeout */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Timeout (seconds)</label>
              <input
                type="number"
                value={timeout}
                onChange={(e) => setTimeout(e.target.value)}
                placeholder="30"
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Retry on Failure */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Retry on Failure</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setRetryOnFailure('true')}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    retryOnFailure === 'true'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  True
                </button>
                <button
                  onClick={() => setRetryOnFailure('false')}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    retryOnFailure === 'false'
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
                To confirm your action is set up correctly, we'll send a test API request.
              </p>
              
              {testResult === 'success' && (
                <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-start gap-3 mb-4">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="font-semibold text-green-900 mb-1">API call test successful</p>
                      <p className="text-sm text-green-800">
                        The API action was configured correctly and the test request completed successfully.
                      </p>
                    </div>
                  </div>

                  {/* Sample Response */}
                  <div className="p-3 bg-white rounded-lg border border-green-200 space-y-2">
                    <div className="flex items-start">
                      <span className="text-xs font-medium text-gray-500 w-32">Status Code:</span>
                      <span className="text-xs text-gray-900">200 OK</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-xs font-medium text-gray-500 w-32">Response Time:</span>
                      <span className="text-xs text-gray-900">324 ms</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-xs font-medium text-gray-500 w-32">Result:</span>
                      <span className="text-xs text-gray-900">Request completed successfully</span>
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