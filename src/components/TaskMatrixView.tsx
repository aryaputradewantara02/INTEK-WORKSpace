import { useState } from 'react';
import { Zap, AlertCircle, Bolt, Check, Calendar, Clock, Plus, TrendingUp, Sparkles, Search, Bell, Settings, MoreVertical, X, User, Tag, Briefcase, Code, Palette, Megaphone, ShieldAlert, ChevronRight, ChevronDown } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { UserRole } from '../types';
import { departments } from '../constants';

const formatDate = (dateStr: string) => {
  if (!dateStr || dateStr === 'ASAP' || dateStr === 'Done') return dateStr;
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  } catch (e) {
    return dateStr;
  }
};

interface TaskMatrixViewProps {
  currentRole: UserRole;
  tasks: any[];
  onOpenCreateModal: () => void;
}

export function TaskMatrixView({ currentRole, tasks, onOpenCreateModal }: TaskMatrixViewProps) {
  const [expandedDepts, setExpandedDepts] = useState<string[]>(['Engineering', 'Design', 'Marketing', 'Product']);
  
  const toggleDept = (dept: string) => {
    setExpandedDepts(prev => 
      prev.includes(dept) ? prev.filter(d => d !== dept) : [...prev, dept]
    );
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'CRITICAL': return 'bg-tertiary/20 text-tertiary border-tertiary/10';
      case 'IN PROGRESS': return 'bg-primary/20 text-primary border-primary/10';
      case 'PLANNING': return 'bg-secondary/20 text-secondary border-secondary/10';
      case 'COMPLETED': return 'bg-slate-100 text-slate-500 border-slate-200';
      default: return 'bg-surface-container text-on-surface-variant';
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto w-full animate-in slide-in-from-bottom-4 duration-500">
      {/* Header Section */}
      <section className="mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[0.6875rem] font-bold uppercase tracking-widest text-secondary block">INTEK Workspace</span>
              <div className="h-1 w-1 rounded-full bg-on-surface-variant/20"></div>
              <span className={`text-[0.6875rem] font-bold uppercase tracking-widest block ${currentRole === 'supervisor' ? 'text-primary' : 'text-on-surface-variant/40'}`}>
                Role: {currentRole}
              </span>
            </div>
            <h1 className="text-5xl font-extrabold tracking-tight text-on-surface mb-2">Project Matrix</h1>
          </div>
          
          <div className="flex items-center gap-4">
            {currentRole === 'supervisor' && (
              <button 
                onClick={onOpenCreateModal}
                className="px-6 py-3 rounded-xl bg-primary text-white text-sm font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
              >
                <Plus className="w-4 h-4" /> Create Task
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Department Task Lists */}
      <div className="space-y-8">
        {departments.map((dept) => {
          const deptTasks = tasks.filter(t => t.department === dept.name);
          const isExpanded = expandedDepts.includes(dept.name);

          return (
            <div key={dept.name} className="bg-surface rounded-2xl border border-surface-container-high shadow-md overflow-hidden">
              <button 
                onClick={() => toggleDept(dept.name)}
                className="w-full p-6 flex items-center justify-between hover:bg-surface-container-low transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={cn("p-3 rounded-xl", dept.bg, dept.color)}>
                    <dept.icon className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-bold text-on-surface">{dept.name} Division</h3>
                    <p className="text-xs text-on-surface-variant/60 font-medium">{deptTasks.length} active tasks in pipeline</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="hidden sm:flex gap-2">
                    {['CRITICAL', 'IN PROGRESS', 'PLANNING'].map(status => {
                      const count = deptTasks.filter(t => t.status === status).length;
                      if (count === 0) return null;
                      return (
                        <span key={status} className={cn("px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-tighter", getStatusStyle(status))}>
                          {count} {status}
                        </span>
                      );
                    })}
                  </div>
                  {isExpanded ? <ChevronDown className="w-5 h-5 text-on-surface-variant/40" /> : <ChevronRight className="w-5 h-5 text-on-surface-variant/40" />}
                </div>
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 space-y-3">
                      {deptTasks.length > 0 ? (
                        deptTasks.map((task) => (
                          <div key={task.id} className="group flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl border border-surface-container-high hover:border-primary/20 hover:bg-primary/5 transition-all">
                            <div className="flex items-start gap-4 flex-1">
                              <div className={cn(
                                "mt-1 w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-all",
                                task.status === 'COMPLETED' ? "bg-slate-200 border-slate-200" : 
                                task.status === 'CRITICAL' ? "border-tertiary bg-tertiary/10" : "border-surface-container-high"
                              )}>
                                {task.status === 'COMPLETED' && <Check className="w-4 h-4 text-slate-600" />}
                                {task.status === 'CRITICAL' && <ShieldAlert className="w-3 h-3 text-tertiary" />}
                              </div>
                              <div>
                                <h4 className={cn("font-bold text-on-surface text-sm transition-all", task.status === 'COMPLETED' && "line-through opacity-40")}>{task.title}</h4>
                                <p className="text-xs text-on-surface-variant/60 leading-relaxed">{task.desc}</p>
                                <div className="flex items-center gap-2 mt-2">
                                  <div className="w-4 h-4 rounded-full bg-surface-container flex items-center justify-center">
                                    <User className="w-2.5 h-2.5 text-on-surface-variant/60" />
                                  </div>
                                  <span className="text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-widest">{task.assignee}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-6 mt-4 sm:mt-0 w-full sm:w-auto justify-between sm:justify-end">
                              <span className={cn(
                                "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border",
                                getStatusStyle(task.status)
                              )}>
                                {task.status}
                              </span>
                              <div className="flex items-center gap-2 text-on-surface-variant/40">
                                <Calendar className="w-4 h-4" />
                                <span className="text-xs font-bold">{formatDate(task.date)}</span>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="py-12 text-center border-2 border-dashed border-surface-container-high rounded-2xl">
                          <p className="text-sm text-on-surface-variant/40 font-medium">No active tasks in this division.</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

