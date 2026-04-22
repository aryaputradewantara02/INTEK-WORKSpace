/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { View, UserRole } from './types';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { LoginView } from './components/LoginView';
import { DashboardView } from './components/DashboardView';
import { TaskMatrixView } from './components/TaskMatrixView';
import { ChatHubView } from './components/ChatHubView';
import { AnalyticsView } from './components/AnalyticsView';
import { ReportsView } from './components/ReportsView';
import { AccountView } from './components/AccountView';
import { SupportView } from './components/SupportView';
import { Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CreateTaskModal } from './components/CreateTaskModal';
import { initialTasks } from './constants';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentRole, setCurrentRole] = useState<UserRole>('supervisor');
  const [tasks, setTasks] = useState(initialTasks);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Handle login
  const handleLogin = (role: UserRole) => {
    setCurrentRole(role);
    setIsLoggedIn(true);
    setCurrentView('dashboard');
  };

  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentView('login');
  };

  const handleTaskCreate = (task: any) => {
    setTasks([task, ...tasks]);
  };

  // If not logged in, show login view
  if (!isLoggedIn || currentView === 'login') {
    return <LoginView onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar 
        currentView={currentView} 
        onViewChange={setCurrentView} 
        currentRole={currentRole}
        onLogout={handleLogout}
        onOpenCreateModal={() => setIsCreateModalOpen(true)}
      />
      
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto relative">
        <Header 
          currentView={currentView} 
          onViewChange={setCurrentView} 
          currentRole={currentRole}
        />
        
        <div className="flex-1 pb-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              {currentView === 'dashboard' && <DashboardView />}
              {currentView === 'tasks' && (
                <TaskMatrixView 
                  currentRole={currentRole} 
                  tasks={tasks}
                  onOpenCreateModal={() => setIsCreateModalOpen(true)}
                />
              )}
              {currentView === 'chat' && <ChatHubView />}
              {currentView === 'analytics' && <AnalyticsView />}
              {currentView === 'reports' && <ReportsView />}
              {currentView === 'account' && <AccountView currentRole={currentRole} onLogout={handleLogout} />}
              {currentView === 'support' && <SupportView />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Global Floating Action Button - Only for Supervisors */}
        {currentView !== 'chat' && currentRole === 'supervisor' && (
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="fixed bottom-8 right-8 w-14 h-14 bg-primary text-white rounded-full shadow-2xl shadow-primary/40 flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 group"
          >
            <Plus className="w-6 h-6 transition-transform group-hover:rotate-90" />
          </button>
        )}

        <CreateTaskModal 
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onTaskCreate={handleTaskCreate}
          currentRole={currentRole}
        />

        {/* Mobile Navigation Bar */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl flex justify-around items-center px-6 py-3 z-40 border-t border-surface-container">
          <button 
            onClick={() => setCurrentView('dashboard')}
            className={currentView === 'dashboard' ? "text-primary font-bold" : "text-on-surface-variant/40"}
          >
            <span className="text-[10px] uppercase font-bold">Dashboard</span>
          </button>
          <button 
            onClick={() => setCurrentView('tasks')}
            className={currentView === 'tasks' ? "text-primary font-bold" : "text-on-surface-variant/40"}
          >
            <span className="text-[10px] uppercase font-bold">Projects</span>
          </button>
          <button 
            onClick={() => setCurrentView('chat')}
            className={currentView === 'chat' ? "text-primary font-bold" : "text-on-surface-variant/40"}
          >
            <span className="text-[10px] uppercase font-bold">Team</span>
          </button>
          <button 
            onClick={() => setCurrentView('analytics')}
            className={currentView === 'analytics' ? "text-primary font-bold" : "text-on-surface-variant/40"}
          >
            <span className="text-[10px] uppercase font-bold">Analytics</span>
          </button>
          <button 
            onClick={() => setCurrentView('reports')}
            className={currentView === 'reports' ? "text-primary font-bold" : "text-on-surface-variant/40"}
          >
            <span className="text-[10px] uppercase font-bold">Reports</span>
          </button>
        </nav>
      </main>
    </div>
  );
}

