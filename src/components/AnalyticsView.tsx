import { Calendar, ChevronDown, Download, Eye, MoreVertical, Search, TrendingUp, Verified, FileText, BarChart3, Code, Palette, Megaphone, Briefcase } from 'lucide-react';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell, CartesianGrid, Legend, LineChart, Line } from 'recharts';
import { cn } from '@/src/lib/utils';
import { motion } from 'motion/react';

const dailyTaskData = [
  { day: 'Mon', Engineering: 12, Design: 8, Marketing: 15, Product: 5 },
  { day: 'Tue', Engineering: 18, Design: 12, Marketing: 10, Product: 7 },
  { day: 'Wed', Engineering: 15, Design: 15, Marketing: 12, Product: 6 },
  { day: 'Thu', Engineering: 22, Design: 10, Marketing: 18, Product: 9 },
  { day: 'Fri', Engineering: 20, Design: 14, Marketing: 20, Product: 8 },
  { day: 'Sat', Engineering: 5, Design: 4, Marketing: 5, Product: 2 },
  { day: 'Sun', Engineering: 2, Design: 1, Marketing: 3, Product: 1 },
];

const departmentStats = [
  { name: 'Engineering', icon: Code, color: '#4c56af', total: 94 },
  { name: 'Design', icon: Palette, color: '#f9a825', total: 64 },
  { name: 'Marketing', icon: Megaphone, color: '#bc004b', total: 83 },
  { name: 'Product', icon: Briefcase, color: '#006a6a', total: 38 },
];

export function AnalyticsView() {
  return (
    <section className="p-8 space-y-8 max-w-7xl mx-auto w-full animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-on-surface font-headline">Department Analytics</h2>
          <p className="text-on-surface-variant/60 text-sm">Daily task completion performance across all divisions</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-white px-4 py-2 rounded-xl border border-surface-container-high shadow-sm flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" />
            <span className="text-xs font-bold text-on-surface">Last 7 Days</span>
            <ChevronDown className="w-3 h-3 text-on-surface-variant/40" />
          </div>
          <button className="bg-primary text-white px-4 py-2 rounded-xl shadow-lg shadow-primary/20 text-xs font-bold flex items-center gap-2 hover:scale-105 transition-all">
            <Download className="w-4 h-4" />
            Export Data
          </button>
        </div>
      </div>

      {/* Performance Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {departmentStats.map((dept, idx) => (
          <motion.div 
            key={dept.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-6 rounded-2xl border border-surface-container-high shadow-sm hover:shadow-md transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-surface-container-low" style={{ color: dept.color }}>
                <dept.icon className="w-5 h-5" />
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-on-surface">{dept.total}</span>
                <p className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-tighter">Tasks Done</p>
              </div>
            </div>
            <h4 className="font-bold text-on-surface mb-1">{dept.name}</h4>
            <div className="flex items-center gap-2 text-[10px] font-bold text-green-600">
              <TrendingUp className="w-3 h-3" />
              <span>+12% from last week</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-surface-container-high overflow-hidden flex flex-col">
          <div className="p-6 border-b border-surface-container flex justify-between items-center bg-surface-container-low/30">
            <h3 className="text-lg font-bold font-headline">Daily Completion Trend</h3>
            <div className="flex gap-2">
              <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/60 mr-4">
                {departmentStats.map(d => (
                  <div key={d.name} className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }}></span>
                    {d.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="p-8 flex-1">
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyTaskData}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="day" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} 
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} 
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    cursor={{ fill: '#f8fafc' }} 
                  />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '10px', fontWeight: 'bold', paddingTop: '20px' }} />
                  <Bar dataKey="Engineering" fill="#4c56af" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Design" fill="#f9a825" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Marketing" fill="#bc004b" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Product" fill="#006a6a" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Efficiency Breakdown */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-surface-container-high flex flex-col">
          <h3 className="text-lg font-bold font-headline mb-6">Efficiency Score</h3>
          <div className="space-y-8 flex-1">
            {departmentStats.map((dept) => (
              <div key={dept.name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <dept.icon className="w-4 h-4" style={{ color: dept.color }} />
                    <span className="text-sm font-bold text-on-surface">{dept.name}</span>
                  </div>
                  <span className="text-sm font-black" style={{ color: dept.color }}>
                    {Math.round((dept.total / 100) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(dept.total / 100) * 100}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: dept.color }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 p-4 bg-primary/5 rounded-xl border border-primary/10">
            <p className="text-xs text-primary font-bold flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Overall productivity is up 8.4%
            </p>
          </div>
        </div>
      </div>

      {/* Productivity Heatmap Placeholder / Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-surface-container-high overflow-hidden">
        <div className="p-6 border-b border-surface-container flex justify-between items-center">
          <h3 className="text-lg font-bold font-headline">Weekly Task Distribution</h3>
          <button className="text-xs font-bold text-primary hover:underline">View Monthly History</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container-low/50">
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/40">Division</th>
                {dailyTaskData.map(d => (
                  <th key={d.day} className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/40 text-center">{d.day}</th>
                ))}
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/40 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container">
              {departmentStats.map((dept) => (
                <tr key={dept.name} className="hover:bg-surface-container-low/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-surface-container-low" style={{ color: dept.color }}>
                        <dept.icon className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-bold text-on-surface">{dept.name}</span>
                    </div>
                  </td>
                  {dailyTaskData.map(d => (
                    <td key={d.day} className="px-6 py-4 text-center">
                      <span className={cn(
                        "text-xs font-bold px-2 py-1 rounded-md",
                        (d as any)[dept.name] > 15 ? "bg-green-100 text-green-700" : 
                        (d as any)[dept.name] > 5 ? "bg-blue-100 text-blue-700" : 
                        "bg-slate-100 text-slate-500"
                      )}>
                        {(d as any)[dept.name]}
                      </span>
                    </td>
                  ))}
                  <td className="px-6 py-4 text-right">
                    <span className="text-sm font-black" style={{ color: dept.color }}>{dept.total}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

