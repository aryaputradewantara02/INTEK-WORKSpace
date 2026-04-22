import { TrendingUp, ShieldCheck, Zap, Star, MoreVertical, Layers, Brush, ArrowRight, Code, Palette, Megaphone, Briefcase, Users } from 'lucide-react';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell, PieChart, Pie } from 'recharts';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

const velocityData = [
  { name: 'MON', value: 60 },
  { name: 'TUE', value: 85 },
  { name: 'WED', value: 40 },
  { name: 'THU', value: 95 },
  { name: 'FRI', value: 70 },
];

const departmentStats = [
  { name: 'Engineering', icon: Code, performance: 92, tasks: 45, color: 'text-primary', bg: 'bg-primary/10' },
  { name: 'Design', icon: Palette, performance: 88, tasks: 32, color: 'text-secondary', bg: 'bg-secondary/10' },
  { name: 'Marketing', icon: Megaphone, performance: 75, tasks: 28, color: 'text-tertiary', bg: 'bg-tertiary/10' },
  { name: 'Product', icon: Briefcase, performance: 95, tasks: 12, color: 'text-primary-container', bg: 'bg-primary-container/10' },
];

export function DashboardView() {
  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      {/* Department Performance Statistics */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold font-headline">Department Performance</h3>
          <button className="text-xs font-bold text-primary flex items-center gap-1 hover:underline">
            Detailed Report <ArrowRight className="w-3 h-3" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {departmentStats.map((dept, idx) => (
            <motion.div 
              key={dept.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-surface p-5 rounded-2xl border border-surface-container-high shadow-md hover:shadow-xl hover:-translate-y-1 transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={cn("p-3 rounded-xl transition-transform group-hover:scale-110", dept.bg, dept.color)}>
                  <dept.icon className="w-5 h-5" />
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-on-surface">{dept.performance}%</span>
                  <p className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-tighter">Efficiency</p>
                </div>
              </div>
              <h4 className="font-bold text-on-surface mb-1">{dept.name}</h4>
              <div className="flex items-center justify-between text-xs text-on-surface-variant mb-3">
                <span>{dept.tasks} active tasks</span>
                <span className="font-bold text-primary-container">+4%</span>
              </div>
              <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${dept.performance}%` }}
                  transition={{ duration: 1, delay: 0.5 + idx * 0.1 }}
                  className={cn("h-full rounded-full", dept.name === 'Marketing' ? 'bg-tertiary' : 'bg-primary')}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Urgent Tasks by Division */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {departmentStats.map((dept) => (
          <div key={dept.name} className="bg-surface rounded-2xl p-6 shadow-md border border-surface-container-high flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className={cn("p-2 rounded-lg", dept.bg, dept.color)}>
                  <dept.icon className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-on-surface">{dept.name} Urgent Tasks</h3>
              </div>
              <span className="text-[10px] font-bold text-tertiary bg-tertiary/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
                Action Required
              </span>
            </div>
            
            <div className="space-y-3 flex-1">
              {[
                { id: 1, title: `Critical ${dept.name} Sync`, time: '2h remaining', type: 'System' },
                { id: 2, title: `${dept.name} Resource Audit`, time: '5h remaining', type: 'Operational' }
              ].map((task) => (
                <div key={task.id} className="group flex items-center justify-between p-3 rounded-xl hover:bg-surface-container-low border border-transparent hover:border-surface-container-high transition-all cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-tertiary/10 flex items-center justify-center">
                      <Zap className="w-4 h-4 text-tertiary fill-current" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors">{task.title}</p>
                      <p className="text-[10px] text-on-surface-variant/60 font-medium uppercase tracking-tighter">{task.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-tertiary">{task.time}</p>
                    <div className="flex justify-end mt-1">
                      <div className="w-12 h-1 bg-surface-container-high rounded-full overflow-hidden">
                        <div className="bg-tertiary h-full w-2/3"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-6 py-2 rounded-xl text-xs font-bold border border-outline-variant text-on-surface-variant hover:bg-surface-container-low transition-all">
              View Division Backlog
            </button>
          </div>
        ))}
      </section>

    </div>
  );
}
