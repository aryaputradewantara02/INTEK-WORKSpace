import { 
  LayoutDashboard, 
  BarChart3, 
  Briefcase, 
  Users, 
  FileText, 
  Plus, 
  HelpCircle, 
  UserCircle,
  Diamond,
  LogOut
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { View, UserRole } from '@/src/types';

interface SidebarProps {
  currentView: View;
  onViewChange: (view: View) => void;
  currentRole: UserRole;
  onLogout?: () => void;
  onOpenCreateModal?: () => void;
}

export function Sidebar({ currentView, onViewChange, currentRole, onLogout, onOpenCreateModal }: SidebarProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'tasks', label: 'Projects', icon: Briefcase },
    { id: 'chat', label: 'Team', icon: Users },
    { id: 'reports', label: 'Reports', icon: FileText },
  ];

  const handleLogoutClick = () => {
    if (onLogout) onLogout();
  };

  return (
    <aside className="hidden md:flex h-screen w-64 left-0 sticky flex-col p-4 gap-2 bg-surface-container-low border-r border-outline-variant/15 font-sans text-sm font-medium">
      <div className="flex items-center gap-3 px-4 py-6 mb-4">
        <div className="w-10 h-10 bg-gradient-to-tr from-primary to-primary-container rounded-xl flex items-center justify-center text-white shadow-sm">
          <Diamond className="w-6 h-6 fill-current" />
        </div>
        <div>
          <h2 className="text-lg font-black text-on-surface font-headline leading-tight">INTEK</h2>
          <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Workspace</p>
        </div>
      </div>

      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id as View)}
              className={cn(
                "flex items-center gap-3 px-4 py-2 rounded-full transition-all duration-150 scale-98 active:scale-95",
                isActive 
                  ? "bg-primary-container/20 text-primary font-bold" 
                  : "text-on-surface-variant hover:bg-tertiary-container/10 hover:text-tertiary"
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive && "fill-current")} />
              <span>{item.label}</span>
            </button>
          );
        })}

        {/* Channels section removed as requested */}
      </nav>

      <div className="mt-auto pt-6 flex flex-col gap-1">
        {currentRole === 'supervisor' && (
          <button 
            onClick={onOpenCreateModal}
            className="mb-4 bg-gradient-to-r from-primary to-primary-container text-white rounded-full py-3 px-4 font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 transition-transform active:scale-95 h-12"
          >
            {/* Keeping it minimal/hidden per previous instruction, but functional */}
            <Plus className="w-5 h-5" />
          </button>
        )}
        <button 
          onClick={() => onViewChange('support')}
          className={cn(
            "flex items-center gap-3 px-4 py-2 rounded-full transition-all",
            currentView === 'support' 
              ? "bg-primary-container/20 text-primary font-bold" 
              : "text-on-surface-variant hover:bg-tertiary-container/10 hover:text-tertiary"
          )}
        >
          <HelpCircle className="w-5 h-5" />
          <span>Support</span>
        </button>
        <button 
          onClick={() => onViewChange('account')}
          className={cn(
            "flex items-center gap-3 px-4 py-2 rounded-full transition-all",
            currentView === 'account' 
              ? "bg-primary-container/20 text-primary font-bold" 
              : "text-on-surface-variant hover:bg-tertiary-container/10 hover:text-tertiary"
          )}
        >
          <UserCircle className="w-5 h-5" />
          <span>Account</span>
        </button>
        
        <div className="my-2 border-t border-outline-variant/10"></div>
        
        <button 
          onClick={handleLogoutClick}
          className="flex items-center gap-3 px-4 py-2 rounded-full text-error/60 hover:text-error hover:bg-error/5 transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
