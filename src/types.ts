export type View = 'login' | 'dashboard' | 'tasks' | 'chat' | 'analytics' | 'reports' | 'account' | 'support';

export type UserRole = 'supervisor' | 'staff';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'in-progress' | 'critical' | 'planning' | 'completed';
  dueDate: string;
  assignedTo?: string;
}

export interface Message {
  id: string;
  sender: string;
  avatar: string;
  time: string;
  content: string;
  isMe?: boolean;
  asset?: {
    name: string;
    url: string;
  };
}
