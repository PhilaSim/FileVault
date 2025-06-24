import React from 'react';
import { Home, Upload, Search, Settings, FolderOpen } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isMobileMenuOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange, isMobileMenuOpen }) => {
  const navigation = [
    { id: 'dashboard', name: 'Dashboard', icon: Home },
    { id: 'files', name: 'My Files', icon: FolderOpen },
    { id: 'upload', name: 'Upload', icon: Upload },
    { id: 'search', name: 'Search', icon: Search },
  ];

  return (
    <aside className={`bg-slate-900 text-white w-64 min-h-screen fixed lg:relative lg:translate-x-0 transform transition-transform duration-200 ease-in-out z-30 ${
      isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
    }`}>
      <div className="p-6">
        <nav className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === item.id
                    ? 'bg-cyan-500 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;