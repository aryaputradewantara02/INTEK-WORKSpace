import { User, Mail, Shield, Bell, LogOut, Camera, MapPin, Globe, Briefcase, FileText, CheckCircle2, AlertCircle, Search } from 'lucide-react';
import { motion } from 'motion/react';
import { UserRole } from '../types';

interface AccountViewProps {
  currentRole: UserRole;
  onLogout: () => void;
}

export function AccountView({ currentRole, onLogout }: AccountViewProps) {
  const user = {
    name: 'Arya Putra Dewantara',
    email: 'aryaputradewantara02@gmail.com',
    role: 'Senior Product Designer',
    location: 'Jakarta, Indonesia',
    timezone: 'GMT+7 (WIB)',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAo7Nd2a0XXu6wcAEKSnvLmaYd-zrWCP5BCOoox-3dcIEI1ldWEWctLin9-qSjqEKP9Y8oTi_OS8GGDlrcX9QwkPXb_DtMjNT1kxlfs2qQvcXLvGEz1m7KllRV7fn9BRj1uxE7w9gxGYcAKbpwStGM4O5GNFO31az5XTQpwA4yBVQM2hhjdysuK6KRShzjWhKAGgm8miC6wJ9GpvdDSl7d9hCC6MO0LbqbEk9LmbjsraIR4smjQGjXDJQsbY7uNjY0n3QjwfOp3vsg'
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 max-w-4xl mx-auto"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-black text-on-surface font-headline mb-2">Account Settings</h1>
        <p className="text-on-surface-variant">Manage your profile and account preferences</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="md:col-span-1 flex flex-col gap-6">
          <div className="bg-surface rounded-3xl p-6 shadow-md border border-surface-container-high flex flex-col items-center text-center">
            <div className="relative mb-4 group">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/10">
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full shadow-lg hover:scale-110 transition-transform">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <h2 className="text-xl font-bold text-on-surface mb-1">{user.name}</h2>
            <p className="text-sm text-primary font-medium mb-4">{user.role}</p>
            <div className="w-full pt-4 border-t border-surface-container flex flex-col gap-3">
              <div className="flex items-center gap-3 text-on-surface-variant text-sm">
                <MapPin className="w-4 h-4" />
                <span>{user.location}</span>
              </div>
              <div className="flex items-center gap-3 text-on-surface-variant text-sm">
                <Globe className="w-4 h-4" />
                <span>{user.timezone}</span>
              </div>
            </div>
          </div>

          {/* Account Status Information */}
          <div className="bg-surface rounded-3xl p-6 shadow-md border border-surface-container-high">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 text-primary rounded-xl">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-on-surface">System Access</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-on-surface-variant font-medium">Current Role</span>
                <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-lg ${
                  currentRole === 'supervisor' ? 'bg-primary/10 text-primary' : 'bg-surface-container-low text-on-surface-variant'
                }`}>
                  {currentRole}
                </span>
              </div>
              <div className="p-3 bg-surface-container-low rounded-xl">
                <p className="text-[10px] text-on-surface-variant font-medium leading-relaxed">
                  {currentRole === 'supervisor' 
                    ? "As a Supervisor, you have full administrative rights including task creation and team oversight."
                    : "As a Staff member, you have read-access to all project data but are restricted from creating new tasks."
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Settings Sections */}
        <div className="md:col-span-2 flex flex-col gap-6">
          {/* Personal Info */}
          <div className="bg-surface rounded-3xl p-6 shadow-md border border-surface-container-high">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary/10 text-primary rounded-xl">
                <User className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-on-surface">Personal Information</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Full Name</label>
                <input 
                  type="text" 
                  defaultValue={user.name}
                  className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Email Address</label>
                <input 
                  type="email" 
                  defaultValue={user.email}
                  className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Job Title</label>
                <input 
                  type="text" 
                  defaultValue={user.role}
                  className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Department</label>
                <input 
                  type="text" 
                  defaultValue="Design & Creative"
                  className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button className="bg-primary text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                Save Changes
              </button>
            </div>
          </div>

          {/* Security & Notifications */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-surface rounded-3xl p-6 shadow-md border border-surface-container-high">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-tertiary/10 text-tertiary rounded-xl">
                  <Shield className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-on-surface">Security</h3>
              </div>
              <button className="w-full text-left px-4 py-2 hover:bg-surface-container-low rounded-xl text-sm text-on-surface-variant transition-colors">
                Change Password
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-surface-container-low rounded-xl text-sm text-on-surface-variant transition-colors">
                Two-Factor Auth
              </button>
            </div>
            <div className="bg-surface rounded-3xl p-6 shadow-md border border-surface-container-high">
              <div className="flex items-center gap-3 mb-4 text-on-surface">
                <div className="p-2 bg-secondary/10 text-secondary rounded-xl">
                  <Bell className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-on-surface">Notifications</h3>
              </div>
              <button className="w-full text-left px-4 py-2 hover:bg-surface-container-low rounded-xl text-sm text-on-surface-variant transition-colors">
                Email Preferences
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-surface-container-low rounded-xl text-sm text-on-surface-variant transition-colors">
                Push Notifications
              </button>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-error/5 rounded-3xl p-6 border border-error/20">
            <h3 className="font-bold text-error mb-4">Danger Zone</h3>
            <button 
              onClick={onLogout}
              className="flex items-center gap-2 text-error text-sm font-bold hover:underline"
            >
              <LogOut className="w-4 h-4" />
              Sign Out from all devices
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
