import { Sparkles, Mail, Lock, ArrowRight, Terminal, HelpCircle, Shield, Users, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { UserRole } from '../types';

interface LoginViewProps {
  onLogin: (role: UserRole) => void;
}

export function LoginView({ onLogin }: LoginViewProps) {
  const [selectedRole, setSelectedRole] = useState<UserRole>('staff');
  const [validationCode, setValidationCode] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (selectedRole === 'supervisor') {
      if (validationCode !== 'SUPER-INTK-2026') {
        setError('Kode Validasi Supervisor Salah.');
        return;
      }
    }

    onLogin(selectedRole);
  };

  return (
    <main className="flex flex-col md:flex-row min-h-screen bg-white">
      {/* Left Side: Surreal Artistic Hero */}
      <section className="relative w-full md:w-1/2 min-h-[400px] md:min-h-screen overflow-hidden">
        <img 
          alt="Surreal Artistic Landscape" 
          className="absolute inset-0 w-full h-full object-cover" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAcdDPlmPiT3aiqcA0sDReLJI23E_CA-AHzIi4E4rNagba3taQ2yNhqJwuydQBf9v-n4MIwS6bjsiBuIbf60Ki32DvvaEX2fTpzdk4304OVprQMHUfZMz3Y2_y88tHAhN4QJQfgcqXkOrxAFq7yOkv0P8dNga4lmQgHXWwZ1gCBNYHUTFiC6udlJFDluG1z3E9EgRwg0DFNJhxAcXrPrVSACjHekPEKIkZM4DrdwRtcyiyMmJzWdWc0Ju3bMxED03OodUxVh949-B4"
          referrerPolicy="no-referrer"
        />
        {/* Overlay Content for Hero */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent flex flex-col justify-end p-8 md:p-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-md"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-semibold tracking-widest uppercase mb-6">
              Creative Intelligence
            </span>
            <h2 className="text-white font-headline text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6">
              Define the <br/><span className="text-primary-container">Next Frontier</span>
            </h2>
            <p className="text-white/80 text-lg leading-relaxed font-medium">
              Enter a space designed for elite creative execution and seamless digital architecture.
            </p>
          </motion.div>
        </div>
        {/* Branding Anchor */}
        <div className="absolute top-8 left-8">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
              <Sparkles className="text-primary w-6 h-6" />
            </div>
            <span className="font-headline font-extrabold text-2xl text-white tracking-tight">INTEK</span>
          </div>
        </div>
      </section>

      {/* Right Side: Clean Login Form */}
      <section className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-24 bg-white">
        <div className="w-full max-w-[420px]">
          <header className="mb-12">
            <h1 className="font-headline text-4xl font-extrabold text-on-surface tracking-tight mb-3">
              Studio <span className="text-tertiary">Access</span>
            </h1>
            <p className="text-on-surface-variant font-medium">Please enter your credentials to enter INTEK Workspace.</p>
          </header>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Role Selection */}
            <div className="space-y-3">
              <label className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant/70 ml-1">Access Role</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedRole('staff')}
                  className={`flex items-center justify-center gap-2 h-14 rounded-xl border-2 transition-all font-bold ${
                    selectedRole === 'staff' 
                      ? 'bg-primary/5 border-primary text-primary shadow-sm shadow-primary/10' 
                      : 'bg-surface-container-high border-transparent text-on-surface-variant hover:bg-surface-container'
                  }`}
                >
                  <Users className="w-5 h-5" />
                  <span>Staff</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRole('supervisor')}
                  className={`flex items-center justify-center gap-2 h-14 rounded-xl border-2 transition-all font-bold ${
                    selectedRole === 'supervisor' 
                      ? 'bg-primary/5 border-primary text-primary shadow-sm shadow-primary/10' 
                      : 'bg-surface-container-high border-transparent text-on-surface-variant hover:bg-surface-container'
                  }`}
                >
                  <Shield className="w-5 h-5" />
                  <span>Supervisor</span>
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {selectedRole === 'supervisor' && (
                <motion.div 
                  initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginBottom: 24 }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  className="space-y-2 overflow-hidden"
                >
                  <label className="text-[11px] font-bold uppercase tracking-wider text-tertiary ml-1">Validation Code</label>
                  <div className="relative">
                    <input 
                      className="w-full h-14 px-5 bg-tertiary/5 border-2 border-tertiary/20 rounded-xl text-on-surface placeholder:text-tertiary/30 focus:ring-2 focus:ring-tertiary/40 transition-all font-bold font-mono" 
                      placeholder="ENTER-VALIDATION-CODE" 
                      type="text"
                      value={validationCode}
                      onChange={(e) => setValidationCode(e.target.value)}
                      required
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-tertiary/40">
                      <Lock className="w-5 h-5" />
                    </div>
                  </div>
                  <p className="text-[10px] text-tertiary/60 font-medium ml-1">Hint: SUPER-INTK-2026</p>
                </motion.div>
              )}
            </AnimatePresence>

            {error && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-4 bg-error/10 border border-error/20 rounded-xl flex items-center gap-3 text-error text-sm font-bold"
              >
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}

            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant/70 ml-1">Work Email</label>
              <div className="relative group">
                <input 
                  className="w-full h-14 px-5 bg-surface-container-high border-none rounded-xl text-on-surface placeholder:text-outline/50 focus:ring-2 focus:ring-primary/40 transition-all font-medium" 
                  placeholder="name@company.com" 
                  type="email"
                  required
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40">
                  <Mail className="w-5 h-5" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-end">
                <label className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant/70 ml-1">Password</label>
                <button type="button" className="text-[11px] font-bold uppercase text-secondary hover:text-primary transition-colors">Forgot?</button>
              </div>
              <div className="relative group">
                <input 
                  className="w-full h-14 px-5 bg-surface-container-high border-none rounded-xl text-on-surface placeholder:text-outline/50 focus:ring-2 focus:ring-primary/40 transition-all font-medium" 
                  placeholder="••••••••" 
                  type="password"
                  required
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40">
                  <Lock className="w-5 h-5" />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 py-2">
              <input 
                className="w-5 h-5 rounded-md border-none bg-surface-container-high text-primary focus:ring-primary/40" 
                id="remember" 
                type="checkbox" 
              />
              <label className="text-sm font-medium text-on-surface-variant select-none" htmlFor="remember">Keep me authenticated for 30 days</label>
            </div>

            <div className="pt-4">
              <button 
                className="w-full h-14 bg-gradient-to-r from-primary to-primary-container text-white font-headline font-bold rounded-full shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98] transition-all flex items-center justify-center gap-3 group" 
                type="submit"
              >
                Enter INTEK Workspace
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </form>

          <div className="mt-12">
            <div className="relative flex items-center py-4">
              <div className="flex-grow border-t border-surface-container"></div>
              <span className="flex-shrink mx-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/40">Authorized Integrations</span>
              <div className="flex-grow border-t border-surface-container"></div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <button className="flex items-center justify-center gap-3 h-12 rounded-full bg-surface-container-low hover:bg-surface-container transition-colors">
                <img 
                  alt="Google" 
                  className="w-5 h-5 grayscale opacity-70 group-hover:grayscale-0" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxMU8ufgh12NclU5BGAmg0EvlqHA0oxpJh-YhcP_QSI8_b1lQkGdsxSIwWZL0FuZsSiWJHvhPSWfZ3fzmeUGBHNVz3IqBnB1IVIityJk6sjGOjwG8VoSfwe1m-EoKbb6-4ZPFQS4GgE7kyILvrjI3rOHJydi7BbouPge0JUzkyZQP7QlwSCeZ5ykX2ywAO7fVS4B9W7knGuxnRXrRflrh9A0PKbR7rLzqaluW3CXWAXihKqSYpjwRUVwFzjKJoXT5Ez3pjr4ui4zU"
                  referrerPolicy="no-referrer"
                />
                <span className="text-sm font-semibold text-on-surface">Google</span>
              </button>
              <button className="flex items-center justify-center gap-3 h-12 rounded-full bg-surface-container-low hover:bg-surface-container transition-colors">
                <Terminal className="w-5 h-5 text-on-surface" />
                <span className="text-sm font-semibold text-on-surface">SSO Vault</span>
              </button>
            </div>
          </div>

          <footer className="mt-20 text-center">
            <p className="text-xs text-on-surface-variant/40 font-medium tracking-tight">
              © 2024 INTEK Workspace. Crafted for Excellence.
            </p>
          </footer>
        </div>
      </section>

      {/* Contextual FAB */}
      <div className="fixed bottom-8 right-8 hidden md:block">
        <button className="w-14 h-14 bg-white text-secondary rounded-full shadow-[0_12px_40px_rgba(26,28,29,0.1)] flex items-center justify-center hover:scale-105 active:scale-95 transition-all">
          <HelpCircle className="w-6 h-6" />
        </button>
      </div>
    </main>
  );
}
