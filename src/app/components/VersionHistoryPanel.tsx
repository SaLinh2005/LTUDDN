import React from 'react';
import { X, Clock, RotateCcw, CheckCircle2 } from 'lucide-react';

interface VersionHistoryPanelProps {
  isOpen: boolean;
  onClose: () => void;
  historyList: any[];
  onRestore: (version: any) => void;
}

export const VersionHistoryPanel: React.FC<VersionHistoryPanelProps> = ({ 
  isOpen, onClose, historyList = [], onRestore 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-[340px] bg-white shadow-2xl z-50 border-l border-gray-200 flex flex-col animate-in slide-in-from-right duration-300" style={{ fontFamily: 'Inter, sans-serif' }}>
      
      {/* Header */}
      <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-white">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-gray-500" />
          <h2 className="font-semibold text-gray-900 text-sm">Lịch sử phiên bản</h2>
        </div>
        <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
          <X className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      {/* Body - Timeline Layout */}
      <div className="flex-1 overflow-y-auto p-6 pt-4">
        {historyList.length > 0 ? (
          <div className="relative border-l border-gray-200 ml-3 space-y-6">
            {historyList.map((v, index) => {
              const isLatest = index === 0; // Bản ghi đầu tiên là bản mới nhất
              
              return (
                <div key={v.id} className="relative pl-6 group">
                  {/* Timeline Dot */}
                  <span className={`absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full ring-4 ring-white ${
                    isLatest ? 'bg-green-500' : 'bg-gray-300 group-hover:bg-blue-400 transition-colors'
                  }`} />

                  {/* Card Content */}
                  <div className={`p-4 rounded-xl border transition-all duration-200 ${
                    isLatest 
                      ? 'border-green-200 bg-green-50/50' 
                      : 'border-gray-100 bg-white hover:border-blue-200 hover:shadow-sm hover:bg-blue-50/30'
                  }`}>
                    
                    {/* Tiêu đề & Thời gian */}
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase ${
                            isLatest ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                          }`}>
                            {v.id}
                          </span>
                          {isLatest && (
                            <span className="text-[10px] text-green-600 font-medium flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> Hiện tại
                            </span>
                          )}
                        </div>
                        <h3 className="text-sm font-semibold text-gray-900 leading-tight">{v.name}</h3>
                      </div>
                      <span className="text-[10px] text-gray-400 whitespace-nowrap">{v.time}</span>
                    </div>

                    {/* Tác giả & Nút Restore (Cùng 1 hàng) */}
                    <div className="flex items-center justify-between mt-4">
                      {/* Avatar người dùng */}
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-[8px] shadow-sm">
                          SL
                        </div>
                        <span className="text-xs text-gray-600 font-medium">Phan Huỳnh Sa Linh</span>
                      </div>

                      {/* Nút Restore tinh tế (Chỉ hiện rõ khi hover vào card) */}
                      {!isLatest && (
                        <button
                          onClick={() => onRestore(v)}
                          className="opacity-0 group-hover:opacity-100 flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 transition-all"
                        >
                          <RotateCcw className="w-3 h-3" />
                          Khôi phục
                        </button>
                      )}
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400">
            <Clock className="w-10 h-10 mx-auto mb-3 opacity-20" />
            <p className="text-sm font-medium">Chưa có lịch sử phiên bản</p>
            <p className="text-xs mt-1">Các thay đổi sẽ được lưu tại đây</p>
          </div>
        )}
      </div>
    </div>
  );
};