import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Link } from 'react-router'; 
import { 
  Search, Download, Eye, X, 
  ChevronRight, ChevronDown, Bell, Settings
} from 'lucide-react';

// 1. KẾT NỐI SUPABASE
// Lưu ý nhỏ: Khi đưa dự án lên thực tế (production), em nhớ chuyển URL và Key này vào file .env để bảo mật nhé!
const supabaseUrl = 'https://bpyysgnckfaobrjbwidv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJweXlzZ25ja2Zhb2JyamJ3aWR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5ODYxMTQsImV4cCI6MjA4ODU2MjExNH0.1CU73oFPVD63NzLZ4hjAGrkWshk7S4ccTbtS_eVx1MA';
const supabase = createClient(supabaseUrl, supabaseKey);

const FILTER_OPTIONS: Record<string, string[]> = {
  time: ['All time', 'Today', 'Last 7 days', 'Last 30 days'],
  user: ['All user', 'System Admin', 'Finance Manager', 'Developer'],
  type: ['All type', 'Export', 'Modify', 'Authentication'],
  status: ['All status', 'Success', 'Failed', 'Warning']
};

export default function AuditLogPage() {
  const [selectedLog, setSelectedLog] = useState<any>(null);
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const [filters, setFilters] = useState<Record<string, string>>({
    time: 'All time', user: 'All user', type: 'All type', status: 'All status'
  });
  const [search, setSearch] = useState('');
  const [auditData, setAuditData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 2. FETCH DỮ LIỆU TỪ BẢNG
  const fetchLogs = async () => {
    const { data, error } = await supabase
      .from('audit_logs')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      const mapped = data.map((item: any) => ({
        id: `#${item.id.slice(0, 4)}`,
        user: item.user_name || 'Unknown',
        email: item.user_email || 'no-email@system.com',
        role: item.user_role || 'User',
        action: item.action_type || 'No Action',
        resource: item.resource_path || '/',
        status: item.status_result || 'Success',
        ip: item.ip_address || '0.0.0.0',
        old_values: item.old_values, 
        new_values: item.new_values, 
        rawDate: new Date(item.created_at), // Biến giữ lại ngày gốc để lọc time
        time: new Date(item.created_at).toLocaleString('en-US', { 
          month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true 
        }),
        avatar: `https://i.pravatar.cc/150?u=${item.user_name}`
      }));
      setAuditData(mapped);
    }
    setLoading(false);
  };

  useEffect(() => { fetchLogs(); }, []);

  // 3. LOGIC LỌC DỮ LIỆU TỔNG HỢP
  const filteredLogs = auditData.filter((log) => {
    // Lọc theo thanh Search
    if (search && !log.user.toLowerCase().includes(search.toLowerCase()) && !log.action.toLowerCase().includes(search.toLowerCase()) && !log.email.toLowerCase().includes(search.toLowerCase())) return false;
    
    // Lọc theo Status
    if (filters.status !== 'All status' && log.status !== filters.status) return false;
    
    // Lọc theo User (Role)
    if (filters.user !== 'All user' && log.role !== filters.user) return false;

    // Lọc theo Type (Action)
    if (filters.type !== 'All type' && !log.action.toLowerCase().includes(filters.type.toLowerCase())) return false;

    // Lọc theo Time
    if (filters.time !== 'All time') {
      const now = new Date();
      const logDate = log.rawDate; 
      
      if (filters.time === 'Today') {
        const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        if (logDate < startOfToday) return false;
      } 
      else if (filters.time === 'Last 7 days') {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(now.getDate() - 7);
        if (logDate < sevenDaysAgo) return false;
      } 
      else if (filters.time === 'Last 30 days') {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(now.getDate() - 30);
        if (logDate < thirtyDaysAgo) return false;
      }
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 w-full">
      {/* HEADER */}
      <header className="w-full px-8 h-16 border-b border-gray-200 flex items-center justify-between bg-white">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-pink-500 rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-white text-[10px] font-bold">⚡</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-800">DemoWebsite</span>
          </div>
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-500">
            <a href="/" className="hover:text-slate-900">Home</a>
            <a href="/workflow-builder" className="hover:text-slate-900">Workflow Designer</a>
            <a href="/automation" className="hover:text-slate-900">Automation</a>
            <a href="/templates" className="hover:text-slate-900">Templates</a>
            <div className="relative">
              <a href="/audit-log" className="text-slate-900">Audit Log</a>
              <div className="absolute -bottom-[21px] left-0 w-full h-0.5 bg-orange-500"></div>
            </div>
          </nav>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="p-8 w-full max-w-[1440px] mx-auto">
        <div className="mb-8">
          <h1 className="text-[28px] font-bold text-slate-900">Audit Log</h1>
          <p className="text-sm text-slate-500 mt-1">View and track system activities across the platform.</p>
        </div>

        {/* SEARCH & FILTERS */}
        <div className="flex items-center gap-3 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search logs by user, email, action..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition-all"
            />
          </div>

          <div className="flex items-center gap-2">
            {Object.keys(filters).map((key) => (
              <div key={key} className="relative">
                <button
                  onClick={() => setOpenFilter(openFilter === key ? null : key)}
                  className="px-4 py-2 border border-gray-200 bg-white rounded-lg text-sm text-slate-600 flex items-center gap-2 hover:bg-gray-50 capitalize"
                >
                  {filters[key]}
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>
                {openFilter === key && (
                  <div className="absolute top-11 left-0 bg-white border border-gray-200 rounded-lg shadow-lg w-40 z-30 py-1">
                    {FILTER_OPTIONS[key].map((opt: string) => (
                      <button 
                        key={opt} 
                        onClick={() => {
                          setFilters({...filters, [key]: opt}); 
                          setOpenFilter(null);
                        }} 
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 text-slate-700"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <button className="ml-auto flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-gray-50 shadow-sm">
            <Download className="w-4 h-4" /> Export
          </button>
        </div>

        {/* TABLE */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-gray-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-4 px-6">Timestamp</th>
                <th className="py-4 px-6">User</th>
                <th className="py-4 px-6">Action</th>
                <th className="py-4 px-6">Object / Resource</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6">IP Address</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredLogs.map((log, index) => (
                <tr key={index} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6 text-[13px] text-slate-600 whitespace-nowrap">{log.time}</td>
                  
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img src={log.avatar} className="w-8 h-8 rounded-full border border-gray-100" alt="" />
                      <div>
                        <div className="text-[13px] font-bold text-slate-900 leading-tight">{log.user}</div>
                        <div className="text-[11px] text-slate-500 mt-0.5">{log.email}</div>
                        <div className="text-[10px] text-slate-400 font-medium mt-0.5">{log.role}</div>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-6 text-[13px] font-bold text-slate-900">{log.action}</td>
                  <td className="py-4 px-6 text-[13px] font-mono text-slate-500 bg-slate-50/50 rounded">{log.resource}</td>
                  <td className="py-4 px-6">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                      log.status === 'Success' ? 'bg-green-100 text-green-700' : 
                      log.status === 'Failed' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {log.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-[13px] text-slate-500 font-mono">{log.ip}</td>
                  <td className="py-4 px-6 text-right">
                    <button onClick={() => setSelectedLog(log)} className="inline-flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-lg text-[12px] text-slate-600 hover:bg-gray-50 hover:border-slate-300 transition-all font-medium">
                      <Eye className="w-4 h-4" /> View Detail
                    </button>
                  </td>
                </tr>
              ))}
              
              {filteredLogs.length === 0 && !loading && (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500 text-sm">
                    No logs found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* MODAL HOÀN CHỈNH */}
      {selectedLog && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl shadow-2xl overflow-hidden border border-gray-200 animate-in fade-in zoom-in-95 duration-150">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white">
              <h2 className="text-xl font-bold text-slate-900">
                Log Details <span className="text-slate-900">#{selectedLog.id.replace('#', '')}</span>
              </h2>
              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 rounded-full text-[13px] font-medium ${
                  selectedLog.status === 'Success' ? 'bg-green-100 text-green-700' :
                  selectedLog.status === 'Failed' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                }`}>{selectedLog.status}</span>
                <button onClick={() => setSelectedLog(null)} className="hover:bg-gray-100 p-1 rounded-full transition-colors">
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>
            </div>
            
            {/* Modal Body */}
            <div className="p-6">
              {/* Top Info Grid */}
              <div className="grid grid-cols-2 gap-y-5 gap-x-8 text-[14px] border-b border-gray-100 pb-6">
                <div className="flex items-center gap-2">
                  <span className="text-slate-500 w-24">User:</span>
                  <span className="font-bold text-slate-900">{selectedLog.user}</span>
                  <span className="text-slate-400">({selectedLog.role})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-500 w-28">IP Address:</span>
                  <span className="text-slate-900 font-mono text-[15px]">{selectedLog.ip}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-500 w-24">Timestamp:</span>
                  <span className="text-slate-900">{selectedLog.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-500 w-28">Resource:</span>
                  <span className="bg-gray-100 px-2 py-1 rounded text-slate-700 font-mono text-[13px]">{selectedLog.resource}</span>
                </div>
              </div>

              {/* Action Name */}
              <div className="py-6 border-b border-gray-100">
                <span className="text-slate-500 text-[14px]">Action</span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">{selectedLog.action}</h3>
              </div>

              {/* DATA FIELD CHANGES */}
              {selectedLog.old_values && selectedLog.new_values && Object.keys(selectedLog.new_values).length > 0 && (
                <div className="pt-6">
                  <h4 className="text-[13px] font-bold uppercase text-slate-700 tracking-wider mb-4">DATA FIELD CHANGES</h4>
                  
                  <div className="space-y-3">
                    {Object.keys(selectedLog.new_values).map((key) => {
                      const oldVal = selectedLog.old_values[key];
                      const newVal = selectedLog.new_values[key];
                      
                      if (oldVal !== newVal) {
                        return (
                          <div key={key} className="flex items-center text-[14px] bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                            <span className="text-slate-600 w-1/3 capitalize font-medium">{key.replace(/_/g, ' ')}:</span>
                            
                            <div className="flex items-center gap-4 w-2/3">
                              <span className="text-red-500 font-medium">{String(oldVal)}</span>
                              <ChevronRight className="w-4 h-4 text-slate-300" />
                              <span className="text-green-600 font-bold">{String(newVal)}</span>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>
              )}
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
}