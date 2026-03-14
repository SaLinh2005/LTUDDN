import { Sparkles, Mic, ArrowUp } from 'lucide-react';

export function CopilotPanel() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-6 h-6 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <span className="font-medium text-gray-900">Copilot</span>
        <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">AI beta</span>
      </div>

      {/* Input Area */}
      <div className="mb-4">
        <textarea
          placeholder="Describe your workflow"
          className="w-full px-4 py-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          rows={3}
        />
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <span className="text-gray-400 text-xl">+</span>
          </button>
          <button className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm transition-colors">
            Auto
          </button>
          <button className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm transition-colors">
            Ask
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Mic className="w-5 h-5 text-gray-400" />
          </button>
          <button className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
            Start building
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
