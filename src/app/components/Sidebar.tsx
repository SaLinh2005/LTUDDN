import { Search, FileText, Clock, Folder, StickyNote, History, Activity, CheckCircle, Settings, Archive } from 'lucide-react';
import { PanelType } from '../App';

interface SidebarProps {
  activePanel: PanelType;
  onPanelToggle: (panel: PanelType) => void;
}

export function Sidebar({ activePanel, onPanelToggle }: SidebarProps) {
  const menuItems: Array<{ icon: React.ReactNode; panel: PanelType; label: string }> = [
    { icon: <FileText className="w-5 h-5" />, panel: 'linked-assets', label: 'Linked Assets' },
    { icon: <Clock className="w-5 h-5" />, panel: 'recent-demos', label: 'Recent Demos' },
    { icon: <Folder className="w-5 h-5" />, panel: 'details', label: 'Details' },
    { icon: <StickyNote className="w-5 h-5" />, panel: 'notes', label: 'Notes' },
{ icon: <History className="w-5 h-5" />, panel: 'versions', label: 'Change History' },
    { icon: <Activity className="w-5 h-5" />, panel: 'demo-runs', label: 'Demo Runs' },
    { icon: <CheckCircle className="w-5 h-5" />, panel: 'status', label: 'Status' },
    { icon: <Settings className="w-5 h-5" />, panel: 'advanced-settings', label: 'Advanced Settings' },
    { icon: <Archive className="w-5 h-5" />, panel: 'versions', label: 'Versions' },
  ];

  return (
    <aside className="w-14 bg-gray-800 flex flex-col items-center py-4 gap-1">
      {/* Search */}
      <button className="w-10 h-10 flex items-center justify-center rounded hover:bg-gray-700 transition-colors mb-2">
        <Search className="w-5 h-5 text-gray-300" />
      </button>

      <div className="w-8 h-px bg-gray-700 my-2" />

      {/* Navigation Icons */}
      {menuItems.map((item) => (
        <button
          key={item.panel}
          onClick={() => onPanelToggle(item.panel)}
          className={`w-10 h-10 flex items-center justify-center rounded transition-colors ${
            activePanel === item.panel
              ? 'bg-gray-700 text-white'
              : 'text-gray-400 hover:bg-gray-700 hover:text-white'
          }`}
          title={item.label}
        >
          {item.icon}
        </button>
      ))}

      <div className="flex-1" />

      {/* Bottom Icon */}
      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-600">
        <span className="text-white text-sm">🤖</span>
      </div>
    </aside>
  );
}