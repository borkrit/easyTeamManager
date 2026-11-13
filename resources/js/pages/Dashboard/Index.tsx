
import { Head } from '@inertiajs/react';
import { DashboardHeader } from './ui/DashboardHeader';
import { DashboardStatsGrid } from './ui/DashboardStatsGrid';
import { DashboardRecentTasks } from './ui/DashboardRecentTasks';
import { DashboardSystemInfo } from './ui/DashboardSystemInfo';
import { DashboardProps } from './types/types';



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