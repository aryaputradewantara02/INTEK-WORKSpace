import { useState, useRef } from 'react';
import { 
  FileText, 
  Send, 
  Image as ImageIcon, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Plus, 
  X, 
  Camera, 
  Upload,
  ChevronRight,
  Search,
  Filter,
  MoreVertical
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface Report {
  id: string;
  staffName: string;
  division: string;
  taskTitle: string;
  progress: string;
  obstacles: string;
  imageUrl?: string;
  timestamp: string;
  status: 'pending' | 'reviewed' | 'approved';
}

const initialReports: Report[] = [
  {
    id: '1',
    staffName: 'Alex Rivera',
    division: 'Engineering',
    taskTitle: 'API Security Audit',
    progress: 'Completed the initial scan of the auth endpoints. Found 2 minor vulnerabilities that have been patched.',
    obstacles: 'Wait times for the security scanner were longer than expected.',
    imageUrl: 'https://picsum.photos/seed/code/400/300',
    timestamp: '2 hours ago',
    status: 'approved'
  },
  {
    id: '2',
    staffName: 'Jamie Smith',
    division: 'Design',
    taskTitle: 'Interface Design Refresh',
    progress: 'Drafted the new color tokens for the dark mode theme. Exported assets for the engineering team.',
    obstacles: 'Need feedback on the egg-yolk orange contrast ratio for accessibility.',
    imageUrl: 'https://picsum.photos/seed/design/400/300',
    timestamp: '5 hours ago',
    status: 'reviewed'
  }
];

const divisions = ['Engineering', 'Design', 'Marketing', 'Product'];

export function ReportsView() {
  const [reports, setReports] = useState<Report[]>(initialReports);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    taskTitle: '',
    division: 'Engineering',
    progress: '',
    obstacles: '',
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newReport: Report = {
      id: Math.random().toString(36).substr(2, 9),
      staffName: 'You',
      division: formData.division,
      taskTitle: formData.taskTitle,
      progress: formData.progress,
      obstacles: formData.obstacles,
      imageUrl: previewImage || undefined,
      timestamp: 'Just now',
      status: 'pending'
    };
    setReports([newReport, ...reports]);
    setIsFormOpen(false);
    setFormData({ taskTitle: '', division: 'Engineering', progress: '', obstacles: '' });
    setPreviewImage(null);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto w-full animate-in slide-in-from-bottom-4 duration-500">
      {/* Header Section */}
      <section className="mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-[0.6875rem] font-bold uppercase tracking-widest text-secondary mb-2 block">Performance Tracking</span>
            <h1 className="text-5xl font-extrabold tracking-tight text-on-surface mb-2">Progress Reports</h1>
            <p className="text-on-surface-variant max-w-lg">Submit and track performance updates across all departmental initiatives.</p>
          </div>
          <button 
            onClick={() => setIsFormOpen(true)}
            className="px-6 py-3 rounded-xl bg-primary text-white text-sm font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> New Report
          </button>
        </div>
      </section>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Feed */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-on-surface font-headline">Recent Submissions</h2>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-surface-container rounded-lg text-on-surface-variant/40"><Search className="w-5 h-5" /></button>
              <button className="p-2 hover:bg-surface-container rounded-lg text-on-surface-variant/40"><Filter className="w-5 h-5" /></button>
            </div>
          </div>

          <div className="space-y-6">
            {reports.map((report) => (
              <motion.div 
                layout
                key={report.id} 
                className="bg-white rounded-2xl border border-surface-container-high shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary font-bold border border-surface-container-high">
                        {report.staffName[0]}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-on-surface">{report.staffName}</h4>
                        <p className="text-[10px] text-on-surface-variant/60 font-bold uppercase tracking-widest">{report.division} Division</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] text-on-surface-variant/40 font-bold">{report.timestamp}</span>
                      <span className={cn(
                        "px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-tighter",
                        report.status === 'approved' ? "bg-green-100 text-green-700" : 
                        report.status === 'reviewed' ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700"
                      )}>
                        {report.status}
                      </span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-on-surface mb-2">{report.taskTitle}</h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">Progress Update</p>
                        <p className="text-sm text-on-surface-variant leading-relaxed">{report.progress}</p>
                      </div>
                      {report.obstacles && (
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-tertiary mb-1">Obstacles & Blockers</p>
                          <p className="text-sm text-on-surface-variant leading-relaxed">{report.obstacles}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {report.imageUrl && (
                    <div className="rounded-xl overflow-hidden border border-surface-container-high shadow-sm mb-4">
                      <img 
                        src={report.imageUrl} 
                        alt="Progress Evidence" 
                        className="w-full h-auto object-cover max-h-64"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}

                  <div className="pt-4 border-t border-surface-container flex items-center justify-between">
                    <div className="flex gap-4">
                      <button className="text-xs font-bold text-primary hover:underline">View Task Details</button>
                      <button className="text-xs font-bold text-on-surface-variant/40 hover:text-on-surface">Add Comment</button>
                    </div>
                    <button className="p-2 hover:bg-surface-container rounded-full text-on-surface-variant/40">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sidebar: Stats & Info */}
        <div className="space-y-8">
          <div className="bg-surface-container-low p-6 rounded-2xl border border-surface-container-high/50">
            <h3 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant/40 mb-6">Reporting Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg text-green-700">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-bold">Approved</span>
                </div>
                <span className="text-sm font-black">12</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-100 rounded-lg text-amber-700">
                    <Clock className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-bold">Pending</span>
                </div>
                <span className="text-sm font-black">4</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-tertiary-container/20 rounded-lg text-tertiary">
                    <AlertCircle className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-bold">Needs Review</span>
                </div>
                <span className="text-sm font-black">2</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary to-primary-container p-6 rounded-2xl text-white shadow-lg shadow-primary/20">
            <h4 className="text-xl font-bold mb-2">Weekly Goal</h4>
            <p className="text-xs text-white/80 mb-4 leading-relaxed">Submit at least 3 progress reports per week to maintain your high-velocity performance score.</p>
            <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
              <div className="bg-white h-full w-[66%]"></div>
            </div>
            <p className="text-[10px] font-bold mt-2 text-white/60 uppercase tracking-widest">2 of 3 Submitted</p>
          </div>
        </div>
      </div>

      {/* Submit Report Modal */}
      <AnimatePresence>
        {isFormOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFormOpen(false)}
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
                  <h2 className="text-2xl font-black text-on-surface font-headline tracking-tight">Submit Progress</h2>
                  <p className="text-xs text-on-surface-variant/60 font-bold uppercase tracking-widest mt-1">Performance Report Form</p>
                </div>
                <button 
                  onClick={() => setIsFormOpen(false)}
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
                      value={formData.taskTitle}
                      onChange={(e) => setFormData({...formData, taskTitle: e.target.value})}
                      className="w-full bg-surface-container-low border-none rounded-2xl px-5 py-4 text-sm font-medium focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40 ml-1">Division</label>
                      <select 
                        value={formData.division}
                        onChange={(e) => setFormData({...formData, division: e.target.value})}
                        className="w-full bg-surface-container-low border-none rounded-2xl px-5 py-4 text-sm font-medium focus:ring-2 focus:ring-primary/20 transition-all appearance-none"
                      >
                        {divisions.map(d => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40 ml-1">Progress Update</label>
                    <textarea 
                      required
                      placeholder="Explain what you have accomplished..."
                      value={formData.progress}
                      onChange={(e) => setFormData({...formData, progress: e.target.value})}
                      className="w-full bg-surface-container-low border-none rounded-2xl px-5 py-4 text-sm font-medium focus:ring-2 focus:ring-primary/20 transition-all min-h-[100px] resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40 ml-1">Obstacles & Blockers (Optional)</label>
                    <textarea 
                      placeholder="Any challenges you faced..."
                      value={formData.obstacles}
                      onChange={(e) => setFormData({...formData, obstacles: e.target.value})}
                      className="w-full bg-surface-container-low border-none rounded-2xl px-5 py-4 text-sm font-medium focus:ring-2 focus:ring-primary/20 transition-all min-h-[80px] resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40 ml-1">Evidence (Photo)</label>
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full aspect-video bg-surface-container-low rounded-2xl border-2 border-dashed border-surface-container-high flex flex-col items-center justify-center cursor-pointer hover:bg-surface-container transition-all overflow-hidden relative"
                    >
                      {previewImage ? (
                        <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <>
                          <Camera className="w-8 h-8 text-on-surface-variant/20 mb-2" />
                          <p className="text-xs font-bold text-on-surface-variant/40">Click to upload photo evidence</p>
                        </>
                      )}
                      <input 
                        type="file" 
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        accept="image/*"
                        className="hidden"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex gap-3 sticky bottom-0 bg-white pb-2">
                    <button 
                      type="button"
                      onClick={() => setIsFormOpen(false)}
                      className="flex-1 py-4 rounded-2xl text-sm font-bold text-on-surface-variant hover:bg-surface-container transition-all"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="flex-2 py-4 bg-primary text-white rounded-2xl text-sm font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" /> Submit Report
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
