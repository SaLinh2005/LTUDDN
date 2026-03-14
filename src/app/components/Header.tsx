import { Home, Undo, Play, ChevronDown, HelpCircle, Loader2, History } from 'lucide-react'; // 👈 Thêm History icon
import { useNavigate } from 'react-router';

interface HeaderProps {
  onTestRun: () => void;
  onPublish: () => void;
  isPublished: boolean;
  isRunning: boolean;
  onOpenVersionHistory?: () => void; // 👈 Đã có sẵn chìa khóa này
}

// 👈 NHỚ THÊM onOpenVersionHistory VÀO TRONG NGOẶC DƯỚI ĐÂY
export function Header({ onTestRun, onPublish, isPublished, isRunning, onOpenVersionHistory }: HeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate('/')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Home className="w-5 h-5 text-gray-700" />
        </button>
        
        <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg">
          <div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-pink-500 rounded flex items-center justify-center">
            <span className="text-white text-xs font-semibold">⚡</span>
          </div>
          <span className="text-sm font-medium text-gray-800">Demos</span>
        </div>
      </div>

      {/* Center Section */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-200">
          <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
            <span className="text-purple-600 text-xs font-semibold">HH</span>
          </div>
          <span className="text-sm text-gray-700">Demo Automation Builder</span>
        </div>
        
        {isPublished ? (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-lg">
            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
            <span className="text-sm font-medium text-green-700">Published</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-lg">
            <span className="text-sm font-medium text-blue-700">Draft</span>
            <ChevronDown className="w-4 h-4 text-blue-700" />
          </div>
        )}
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 mr-2">
          {/* 👈 NÚT VERSION HISTORY MỚI THÊM VÀO ĐÂY */}
          <button 
            onClick={onOpenVersionHistory}
            className="px-3 py-1.5 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2"
            title="Version History"
          >
            <History className="w-4 h-4 text-gray-600" />
            <span className="text-sm text-gray-700 font-medium">History</span>
          </button>

          <button className="px-3 py-1.5 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2">
            <Undo className="w-4 h-4 text-gray-600" />
            <span className="text-sm text-gray-700">Undo</span>
          </button>
          
          <button className="px-3 py-1.5 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2" onClick={onTestRun}>
            {isRunning ? <Loader2 className="w-4 h-4 animate-spin text-gray-600" /> : <Play className="w-4 h-4 text-gray-600" />}
            <span className="text-sm text-gray-700">Test run</span>
          </button>
          
          <button className="px-4 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors" onClick={onPublish}>
            <span className="text-sm font-medium">{isPublished ? 'Published' : 'Publish'}</span>
          </button>
        </div>

        <div className="flex items-center gap-3 pl-3 border-l border-gray-200">
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <span>93%</span>
            <ChevronDown className="w-4 h-4" />
          </div>
          
          <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-800">
            <HelpCircle className="w-5 h-5" />
            <span>Help</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}