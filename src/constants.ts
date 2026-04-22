import { Code, Palette, Megaphone, Briefcase } from 'lucide-react';

export const departments = [
  { name: 'Engineering', icon: Code, color: 'text-primary', bg: 'bg-primary/10' },
  { name: 'Design', icon: Palette, color: 'text-secondary', bg: 'bg-secondary/10' },
  { name: 'Marketing', icon: Megaphone, color: 'text-tertiary', bg: 'bg-tertiary/10' },
  { name: 'Product', icon: Briefcase, color: 'text-primary-container', bg: 'bg-primary-container/10' },
];

export const staffByDept: Record<string, string[]> = {
  'Engineering': ['Elena Rodriguez', 'Alex Rivera', 'David Miller', 'Budi Santoso'],
  'Design': ['Marcus Chen', 'Jamie Smith', 'Siti Aminah'],
  'Marketing': ['Sarah Jenkins', 'Andi Wijaya', 'Rina Pratama'],
  'Product': ['David Miller', 'Sarah Jenkins', 'Taufik Hidayat'],
};

export const initialTasks = [
  { id: '1', title: 'Interface Design Refresh', desc: 'Update the primary UI library with new luminous design tokens.', status: 'IN PROGRESS', date: '2026-10-24', department: 'Design', assignee: 'Marcus Chen' },
  { id: '2', title: 'API Security Audit', desc: 'Perform deep-scan on production endpoints for credential leaks.', status: 'CRITICAL', date: '2026-10-20', department: 'Engineering', assignee: 'Elena Rodriguez' },
  { id: '3', title: 'Client Onboarding Flow', desc: 'Map out the automated welcome sequence for Enterprise tier.', status: 'PLANNING', date: '2026-10-28', department: 'Product', assignee: 'David Miller' },
  { id: '4', title: 'Bi-Weekly Sync', desc: 'Review sprint velocity and blockers with the engineering team.', status: 'COMPLETED', date: '2026-10-15', department: 'Engineering', assignee: 'Alex Rivera' },
  { id: '5', title: 'Q4 Campaign Launch', desc: 'Coordinate with social media team for the year-end push.', status: 'PLANNING', date: '2026-11-05', department: 'Marketing', assignee: 'Sarah Jenkins' },
];
