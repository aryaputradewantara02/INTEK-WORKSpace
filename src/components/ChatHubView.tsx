import { useState } from 'react';
import { Download, PlayCircle, FileText, Image as ImageIcon, Pin, Send, Bold, Italic, Link as LinkIcon, Paperclip, Smile, ChevronRight, MoreVertical, Eye, Users, Lock, MessageSquare, Hash, ArrowLeft, ShieldCheck, User } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

// Simulated Data
const departments = [
  { id: 'eng', name: 'Engineering', icon: Hash, color: 'text-primary', bg: 'bg-primary/10', head: 'Elena Rodriguez' },
  { id: 'des', name: 'Design', icon: Hash, color: 'text-secondary', bg: 'bg-secondary/10', head: 'Marcus Chen' },
  { id: 'mkt', name: 'Marketing', icon: Hash, color: 'text-tertiary', bg: 'bg-tertiary/10', head: 'Sarah Jenkins' },
  { id: 'prd', name: 'Product', icon: Hash, color: 'text-primary-container', bg: 'bg-primary-container/10', head: 'David Miller' },
];

const teamMembers = [
  { name: 'Marcus Chen', dept: 'Design', role: 'HEAD', avatar: 'https://i.pravatar.cc/150?u=marcus' },
  { name: 'Elena Rodriguez', dept: 'Engineering', role: 'HEAD', avatar: 'https://i.pravatar.cc/150?u=elena' },
  { name: 'Sarah Jenkins', dept: 'Marketing', role: 'HEAD', avatar: 'https://i.pravatar.cc/150?u=sarah' },
  { name: 'Alex Rivera', dept: 'Engineering', role: 'STAFF', avatar: 'https://i.pravatar.cc/150?u=alex' },
  { name: 'Jamie Smith', dept: 'Design', role: 'STAFF', avatar: 'https://i.pravatar.cc/150?u=jamie' },
];

const initialMessages: Record<string, any[]> = {
  'des': [
    { id: '1', sender: 'Sarah Jenkins', avatar: 'https://i.pravatar.cc/150?u=sarah', time: '10:42 AM', content: "Hey design team! Just finished the mood board for the new campaign. What do you think about the surrealist direction?", isMe: false },
    { id: '2', sender: 'You', avatar: 'https://i.pravatar.cc/150?u=me', time: '10:45 AM', content: "I love it. Especially the way the light hits the abstract forms.", isMe: true },
  ],
  'eng': [
    { id: '1', sender: 'Elena Rodriguez', avatar: 'https://i.pravatar.cc/150?u=elena', time: '09:15 AM', content: "Deployment to staging is complete. Please verify the new API endpoints.", isMe: false },
  ]
};

export function ChatHubView() {
  const [currentUser, setCurrentUser] = useState(teamMembers[0]); // Default: Marcus Chen (Design Head)
  const [selectedDeptId, setSelectedDeptId] = useState<string | null>(null);
  const [messages, setMessages] = useState(initialMessages);
  const [inputText, setInputText] = useState('');

  const selectedDept = departments.find(d => d.id === selectedDeptId);
  const hasAccess = (deptName: string) => {
    return currentUser.dept === deptName || currentUser.role === 'ADMIN'; // Simplified: same dept or admin
  };

  const handleSendMessage = () => {
    if (!inputText.trim() || !selectedDeptId) return;
    const newMessage = {
      id: Date.now().toString(),
      sender: 'You',
      avatar: currentUser.avatar,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      content: inputText,
      isMe: true
    };
    setMessages({
      ...messages,
      [selectedDeptId]: [...(messages[selectedDeptId] || []), newMessage]
    });
    setInputText('');
  };

  return (
    <div className="flex-1 flex h-full bg-white animate-in fade-in duration-500 overflow-hidden">
      {/* Left Sidebar: Dept Groups */}
      <aside className="w-80 border-r border-surface-container flex flex-col bg-surface-container-low/30">
        <div className="p-6 border-b border-surface-container">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black text-on-surface font-headline tracking-tight">Team Hub</h2>
            <div className="p-2 bg-white rounded-xl shadow-sm border border-surface-container-high">
              <Users className="w-5 h-5 text-primary" />
            </div>
          </div>
          
          {/* User Profile Simulation */}
          <div className="bg-white p-4 rounded-2xl border border-surface-container-high shadow-sm mb-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40 mb-3">Your Identity</p>
            <div className="flex items-center gap-3">
              <img src={currentUser.avatar} className="w-10 h-10 rounded-full border-2 border-primary/20" alt="Me" referrerPolicy="no-referrer" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold truncate">{currentUser.name}</p>
                <div className="flex items-center gap-1">
                  <span className="text-[10px] font-bold text-primary uppercase">{currentUser.dept}</span>
                  <span className="text-[10px] text-on-surface-variant/40">•</span>
                  <span className="text-[10px] font-bold text-secondary uppercase">{currentUser.role}</span>
                </div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <select 
                onChange={(e) => setCurrentUser(teamMembers[parseInt(e.target.value)])}
                className="col-span-2 text-[10px] font-bold bg-surface-container-low border-none rounded-lg px-2 py-1.5 focus:ring-1 focus:ring-primary/20"
              >
                {teamMembers.map((m, i) => (
                  <option key={m.name} value={i}>{m.name} ({m.dept})</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          <p className="px-2 text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40 mb-2">Department Groups</p>
          {departments.map((dept) => {
            const accessible = hasAccess(dept.name);
            return (
              <button
                key={dept.id}
                onClick={() => accessible && setSelectedDeptId(dept.id)}
                className={cn(
                  "w-full flex items-center justify-between p-3 rounded-xl transition-all group",
                  selectedDeptId === dept.id ? "bg-primary text-white shadow-lg shadow-primary/20" : "hover:bg-white text-on-surface-variant",
                  !accessible && "opacity-50 cursor-not-allowed"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
                    selectedDeptId === dept.id ? "bg-white/20" : dept.bg
                  )}>
                    <dept.icon className={cn("w-4 h-4", selectedDeptId === dept.id ? "text-white" : dept.color)} />
                  </div>
                  <div className="text-left">
                    <p className={cn("text-sm font-bold", selectedDeptId === dept.id ? "text-white" : "text-on-surface")}>{dept.name}</p>
                    <p className={cn("text-[10px] font-medium", selectedDeptId === dept.id ? "text-white/60" : "text-on-surface-variant/40")}>
                      {dept.head}
                    </p>
                  </div>
                </div>
                {!accessible && <Lock className="w-3 h-3 opacity-40" />}
                {accessible && selectedDeptId !== dept.id && <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />}
              </button>
            );
          })}
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col bg-white relative">
        <AnimatePresence mode="wait">
          {selectedDeptId ? (
            <motion.div 
              key={selectedDeptId}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex flex-col h-full"
            >
              {/* Chat Header */}
              <div className="px-8 py-5 border-b border-surface-container flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-10">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setSelectedDeptId(null)}
                    className="lg:hidden p-2 hover:bg-surface-container rounded-full"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-black text-on-surface font-headline tracking-tight">#{selectedDept?.name.toLowerCase()}-group</h3>
                      <ShieldCheck className="w-4 h-4 text-primary" />
                    </div>
                    <p className="text-xs text-on-surface-variant/60 font-medium">Official communication channel for {selectedDept?.name} staff.</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <img key={i} className="w-8 h-8 rounded-full border-2 border-white" src={`https://i.pravatar.cc/150?u=u-${i}`} alt="User" referrerPolicy="no-referrer" />
                    ))}
                  </div>
                  <button className="p-2 hover:bg-surface-container rounded-full text-on-surface-variant/40">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-8 py-8 space-y-8">
                {(messages[selectedDeptId] || []).map((msg) => (
                  <div key={msg.id} className={cn("flex items-start gap-4", msg.isMe && "flex-row-reverse")}>
                    <img src={msg.avatar} className="w-10 h-10 rounded-full border-2 border-white shadow-sm" alt={msg.sender} referrerPolicy="no-referrer" />
                    <div className={cn("max-w-[70%] flex flex-col", msg.isMe && "items-end")}>
                      <div className={cn("flex items-center gap-2 mb-1", msg.isMe && "flex-row-reverse")}>
                        <span className="text-sm font-bold text-on-surface">{msg.sender}</span>
                        <span className="text-[10px] font-medium text-on-surface-variant/40">{msg.time}</span>
                      </div>
                      <div className={cn(
                        "p-4 rounded-2xl shadow-sm text-sm leading-relaxed",
                        msg.isMe ? "bg-primary text-white rounded-tr-none" : "bg-surface-container-low text-on-surface rounded-tl-none"
                      )}>
                        {msg.content}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="p-6 border-t border-surface-container bg-white">
                <div className="flex flex-col bg-surface-container-high rounded-2xl p-2 shadow-sm focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                  <div className="flex items-center gap-2 px-2 pb-2">
                    <button className="p-1.5 hover:bg-white rounded-lg text-on-surface-variant/40 transition-colors"><Bold className="w-4 h-4" /></button>
                    <button className="p-1.5 hover:bg-white rounded-lg text-on-surface-variant/40 transition-colors"><Italic className="w-4 h-4" /></button>
                    <button className="p-1.5 hover:bg-white rounded-lg text-on-surface-variant/40 transition-colors"><Paperclip className="w-4 h-4" /></button>
                    <button className="p-1.5 hover:bg-white rounded-lg text-on-surface-variant/40 transition-colors"><Smile className="w-4 h-4" /></button>
                  </div>
                  <div className="flex items-center gap-3">
                    <textarea 
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendMessage())}
                      className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2 px-4 resize-none min-h-[44px] max-h-32 text-on-surface" 
                      placeholder={`Message #${selectedDept?.name.toLowerCase()}-group`} 
                      rows={1}
                    ></textarea>
                    <button 
                      onClick={handleSendMessage}
                      className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center shadow-md transition-transform active:scale-95"
                    >
                      <Send className="w-5 h-5 fill-current" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
              <div className="w-20 h-20 bg-surface-container-low rounded-3xl flex items-center justify-center mb-6">
                <MessageSquare className="w-10 h-10 text-primary/40" />
              </div>
              <h3 className="text-2xl font-black text-on-surface font-headline tracking-tight mb-2">Welcome to Team Hub</h3>
              <p className="text-on-surface-variant/60 max-w-sm font-medium">
                Select a department group from the sidebar to start collaborating. Access is restricted to authorized staff members only.
              </p>
              <div className="mt-8 flex items-center gap-2 px-4 py-2 bg-surface-container-low rounded-full border border-surface-container-high">
                <Lock className="w-3 h-3 text-on-surface-variant/40" />
                <span className="text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-widest">End-to-End Encrypted</span>
              </div>
            </div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

