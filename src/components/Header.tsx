import { useState, useRef, useEffect } from 'react';
import { Search, Bell, Settings, Clock, CheckCircle2, AlertCircle, X } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { View, UserRole } from '@/src/types';
import { motion, AnimatePresence } from 'motion/react';

interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'new_task' | 'due_date' | 'system';
  read: boolean;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    title: 'New Task Assigned',
    description: 'You have been assigned to "Q2 Strategic Planning"',
    time: '5m ago',
    type: 'new_task',
    read: false,
  },
  {
    id: '2',
    title: 'Due Date Reminder',
    description: 'Task "Design System Audit" is due in 2 hours',
    time: '1h ago',
    type: 'due_date',
    read: false,
  },
  {
    id: '3',
    title: 'System Update',
    description: 'Workspace performance has been optimized',
    time: '3h ago',
    type: 'system',
    read: true,
  },
];

interface HeaderProps {
  currentView: View;
  onViewChange: (view: View) => void;
  currentRole: UserRole;
}

export function Header({ currentView, onViewChange, currentRole }: HeaderProps) {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNotificationClick = (notification: Notification) => {
    // Mark as read
    setNotifications(notifications.map(n => 
      n.id === notification.id ? { ...n, read: true } : n
    ));

    // Navigate if it's a new task
    if (notification.type === 'new_task') {
      onViewChange('tasks');
    }

    // Close dropdown
    setIsNotificationsOpen(false);
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <header className="w-full top-0 sticky z-30 flex justify-between items-center px-8 py-4 bg-white/80 backdrop-blur-md font-headline antialiased shadow-[0_12px_40px_rgba(26,28,29,0.06)]">
      <div className="flex items-center gap-8">
        {/* Branding and Tabs removed as requested */}
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/40 w-4 h-4" />
          <input 
            className="bg-surface-container-high border-none rounded-full py-2 pl-10 pr-4 text-sm w-64 focus:ring-2 focus:ring-primary/40 transition-all" 
            placeholder="Search tasks..." 
            type="text"
          />
        </div>
        <div className="flex items-center gap-2 relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className={cn(
              "p-2 rounded-full transition-all relative active:scale-90",
              isNotificationsOpen ? "bg-primary/10 text-primary" : "hover:bg-surface-container-low text-on-surface-variant"
            )}
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 bg-tertiary rounded-full border border-white"></span>
            )}
          </button>

          <AnimatePresence>
            {isNotificationsOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute top-full right-0 mt-2 w-80 bg-surface rounded-2xl shadow-2xl border border-surface-container-high overflow-hidden z-50"
              >
                <div className="p-4 border-b border-surface-container-high flex items-center justify-between bg-surface-container-low/30">
                  <h3 className="font-bold text-on-surface">Notifications</h3>
                  <button 
                    onClick={markAllAsRead}
                    className="text-[10px] font-bold uppercase tracking-widest text-primary hover:text-primary-container transition-colors"
                  >
                    Mark all read
                  </button>
                </div>
                
                <div className="max-h-[400px] overflow-y-auto">
                  {notifications.length > 0 ? (
                    <div className="divide-y divide-surface-container">
                      {notifications.map((notification) => (
                        <div 
                          key={notification.id}
                          onClick={() => handleNotificationClick(notification)}
                          className={cn(
                            "p-4 hover:bg-surface-container-low transition-colors cursor-pointer flex gap-3",
                            !notification.read && "bg-primary/5"
                          )}
                        >
                          <div className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                            notification.type === 'new_task' ? "bg-primary/10 text-primary" :
                            notification.type === 'due_date' ? "bg-tertiary/10 text-tertiary" :
                            "bg-secondary/10 text-secondary"
                          )}>
                            {notification.type === 'new_task' && <CheckCircle2 className="w-5 h-5" />}
                            {notification.type === 'due_date' && <Clock className="w-5 h-5" />}
                            {notification.type === 'system' && <AlertCircle className="w-5 h-5" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start mb-1">
                              <p className={cn("text-sm leading-tight truncate", notification.read ? "text-on-surface/70" : "font-bold text-on-surface")}>
                                {notification.title}
                              </p>
                              <span className="text-[10px] text-on-surface-variant/40 whitespace-nowrap ml-2">{notification.time}</span>
                            </div>
                            <p className="text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
                              {notification.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center">
                      <div className="w-12 h-12 bg-surface-container rounded-full flex items-center justify-center mx-auto mb-3">
                        <Bell className="w-6 h-6 text-on-surface-variant/30" />
                      </div>
                      <p className="text-sm font-medium text-on-surface-variant">No new notifications</p>
                    </div>
                  )}
                </div>

                <div className="p-3 bg-surface-container-low/30 border-t border-surface-container-high text-center">
                  <button className="text-xs font-bold text-on-surface-variant hover:text-primary transition-colors">
                    View All Activity
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex flex-col items-end mr-2 hidden md:flex">
            <span className="text-[10px] font-black uppercase tracking-tighter text-on-surface leading-none mb-0.5">Arya Putra D.</span>
            <span className={`text-[8px] font-black uppercase px-1.5 py-0.5 rounded-full ${
              currentRole === 'supervisor' ? 'bg-primary/10 text-primary' : 'bg-surface-container-high text-on-surface-variant'
            }`}>
              {currentRole}
            </span>
          </div>

          <button 
            onClick={() => onViewChange('account')}
            className="ml-2 w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm hover:scale-105 active:scale-95 transition-transform"
          >
            <img 
              alt="User profile" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAo7Nd2a0XXu6wcAEKSnvLmaYd-zrWCP5BCOoox-3dcIEI1ldWEWctLin9-qSjqEKP9Y8oTi_OS8GGDlrcX9QwkPXb_DtMjNT1kxlfs2qQvcXLvGEz1m7KllRV7fn9BRj1uxE7w9gxGYcAKbpwStGM4O5GNFO31az5XTQpwA4yBVQM2hhjdysuK6KRShzjWhKAGgm8miC6wJ9GpvdDSl7d9hCC6MO0LbqbEk9LmbjsraIR4smjQGjXDJQsbY7uNjY0n3QjwfOp3vsg"
              referrerPolicy="no-referrer"
            />
          </button>
        </div>
      </div>
    </header>
  );
}
