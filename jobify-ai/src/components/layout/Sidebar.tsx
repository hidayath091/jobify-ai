import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Kanban, Sparkles, Settings, FileText, ChevronRight } from 'lucide-react';
import { clsx } from 'clsx';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Kanban Board', icon: Kanban, path: '/board' },
    { name: 'AI Resume Tool', icon: FileText, path: '/ai-feedback' },
    { name: 'AI Job Match', icon: Sparkles, path: '/ai-match' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside className={clsx(
        "fixed inset-y-0 left-0 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-50 transition-transform duration-300 lg:translate-x-0 lg:static lg:z-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-4 flex flex-col h-full">
          <div className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => onClose()}
                className={({ isActive }) => clsx(
                  "flex items-center justify-between p-3 rounded-xl transition-all group",
                  isActive 
                    ? "bg-primary-50 dark:bg-primary-900/10 text-primary-600 font-semibold" 
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </div>
                <ChevronRight className={clsx(
                  "w-4 h-4 transition-transform group-hover:translate-x-1",
                  "opacity-30"
                )} />
              </NavLink>
            ))}
          </div>

          <div className="mt-auto pt-6">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Support</p>
              <NavLink
                to="/settings"
                className="flex items-center gap-3 p-3 text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 rounded-xl transition-all shadow-sm"
              >
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </NavLink>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
