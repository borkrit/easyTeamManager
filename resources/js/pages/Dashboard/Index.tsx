
import { Head } from '@inertiajs/react';
import { DashboardHeader } from './ui/DashboardHeader';
import { DashboardStatsGrid } from './ui/DashboardStatsGrid';
import { DashboardRecentTasks } from './ui/DashboardRecentTasks';
import { DashboardSystemInfo } from './ui/DashboardSystemInfo';

interface DashboardStats {
  totalProjects: number;
  totalTasks: number;
  completedTasks: number;
  totalTeamMembers: number;
}

interface RecentTask {
  id: number;
  title: string;
  projectName: string;
  status: App.Enums.TaskStatus;
  assigneeName: string | null;
}

interface DashboardProps {
  stats: DashboardStats;
  recentTasks: RecentTask[];
}

export default function DashboardIndex({ stats, recentTasks }: DashboardProps) {
  return (
    <>
      <Head title="Pulpit" />

      <DashboardHeader />

      <DashboardStatsGrid stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <DashboardRecentTasks recentTasks={recentTasks} />
        <DashboardSystemInfo />
      </div>
    </>
  );
}