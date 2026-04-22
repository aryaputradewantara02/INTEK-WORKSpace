import { useState } from 'react';
import { X, Briefcase, Tag, User, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { departments, staffByDept } from '../constants';
import { UserRole } from '../types';

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTaskCreate: (task: any) => void;
  currentRole: UserRole;
}

export function CreateTaskModal({ isOpen, onClose, onTaskCreate, currentRole }: CreateTaskModalProps) {
  const [newTask, setNewTask] = useState({
    title: '',
    desc: '',
    status: 'PLANNING',
    date: new Date().toISOString().split('T')[0],
    department: 'Engineering',
    assignee: staffByDept['Engineering'][0]
  });

  const handleDeptChange = (dept: string) => {
    setNewTask({
      ...newTask,
      department: dept,
      assignee: staffByDept[dept][0]
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentRole !== 'supervisor') return;

    const task = {
      id: Math.random().toString(36).substr(2, 9),
      ...newTask,
    };
    onTaskCreate(task);
    setNewTask({ 
      title: '', 
      desc: '', 
      status: 'PLANNING', 
      date: new Date().toISOString().split('T')[0], 
      department: 'Engineering', 
      assignee: staffByDept['Engineering'][0] 
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && currentRole === 'supervisor' && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-on-surface/40 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-surface-container-high max-h-[90vh] flex flex-col"
          >
            <div className="p-8 pb-4 border-b border-surface-container flex items-center justify-between shrink-0">
              <div>
                <h2 className="text-2xl font-black text-on-surface font-headline tracking-tight">Create New Task</h2>
                <p className="text-xs text-on-surface-variant/60 font-bold uppercase tracking-widest mt-1">Division Head Authorization Required</p>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-surface-container rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-on-surface-variant/40" />
              </button>
            </div>

            <div className="p-8 pt-6 overflow-y-auto custom-scrollbar">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40 ml-1">Task Title</label>
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. Visual Identity Refresh"
                    value={newTask.title}
                    onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                    className="w-full bg-surface-container-low border-none rounded-2xl px-5 py-4 text-sm font-medium focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40 ml-1">Description</label>
                  <textarea 
                    required
                    placeholder="Describe the scope of work..."
                    value={newTask.desc}
                    onChange={(e) => setNewTask({...newTask, desc: e.target.value})}
                    className="w-full bg-surface-container-low border-none rounded-2xl px-5 py-4 text-sm font-medium focus:ring-2 focus:ring-primary/20 transition-all min-h-[100px] resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40 ml-1">Division</label>
                    <div className="relative">
                      <select 
                        value={newTask.department}
                        onChange={(e) => handleDeptChange(e.target.value)}
                        className="w-full bg-surface-container-low border-none rounded-2xl pl-11 pr-5 py-4 text-sm font-medium focus:ring-2 focus:ring-primary/20 transition-all appearance-none"
                      >
                        {departments.map(d => (
                          <option key={d.name} value={d.name}>{d.name}</option>
                        ))}
                      </select>
                      <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/40" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40 ml-1">Priority Status</label>
                    <div className="relative">
                      <select 
                        value={newTask.status}
                        onChange={(e) => setNewTask({...newTask, status: e.target.value})}
                        className="w-full bg-surface-container-low border-none rounded-2xl pl-11 pr-5 py-4 text-sm font-medium focus:ring-2 focus:ring-primary/20 transition-all appearance-none"
                      >
                        <option value="PLANNING">Planning</option>
                        <option value="IN PROGRESS">In Progress</option>
                        <option value="CRITICAL">Critical</option>
                        <option value="COMPLETED">Completed</option>
                      </select>
                      <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/40" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40 ml-1">Assign To Staff</label>
                    <div className="relative">
                      <select 
                        value={newTask.assignee}
                        onChange={(e) => setNewTask({...newTask, assignee: e.target.value})}
                        className="w-full bg-surface-container-low border-none rounded-2xl pl-11 pr-5 py-4 text-sm font-medium focus:ring-2 focus:ring-primary/20 transition-all appearance-none"
                      >
                        {staffByDept[newTask.department].map(staff => (
                          <option key={staff} value={staff}>{staff}</option>
                        ))}
                      </select>
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/40" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40 ml-1">Due Date</label>
                    <div className="relative">
                      <input 
                        required
                        type="date" 
                        value={newTask.date}
                        onChange={(e) => setNewTask({...newTask, date: e.target.value})}
                        className="w-full bg-surface-container-low border-none rounded-2xl pl-11 pr-10 py-4 text-sm font-medium focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer"
                      />
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/40 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex gap-3 sticky bottom-0 bg-white pb-2">
                  <button 
                    type="button"
                    onClick={onClose}
                    className="flex-1 py-4 rounded-2xl text-sm font-bold text-on-surface-variant hover:bg-surface-container transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-2 py-4 bg-primary text-white rounded-2xl text-sm font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    Create Task
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
