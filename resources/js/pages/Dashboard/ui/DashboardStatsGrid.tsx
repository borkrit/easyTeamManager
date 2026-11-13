import { DashboardStats, DashboardStatsGridProps } from '../types/types';
import { StatCard } from './StatCard';




export const DashboardStatsGrid = ({ stats }: DashboardStatsGridProps) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            <StatCard title="Wszystkie projekty" value={stats.totalProjects} icon="📁" colorTheme="indigo" />
            <StatCard title="Zadania w systemie" value={stats.totalTasks} icon="📋" colorTheme="blue" />
            <StatCard title="Ukończone zadania" value={stats.completedTasks} icon="✅" colorTheme="emerald" isHighlighted />
            <StatCard title="Członkowie zespołu" value={stats.totalTeamMembers} icon="👥" colorTheme="purple" />
        </div>
    );
};