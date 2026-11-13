 export interface DashboardStats {
  totalProjects: number;
  totalTasks: number;
  completedTasks: number;
  totalTeamMembers: number;
}


export interface DashboardProps {
  stats: DashboardStats;
  recentTasks: App.Data.TaskData[];
}

export interface DashboardRecentTasksProps {
    recentTasks: App.Data.TaskData[];
}

export interface DashboardStatsGridProps {
    stats: DashboardStats;
}

export type ColorTheme = 'indigo' | 'blue' | 'emerald' | 'purple';
export interface ThemeClasses {
  bg: string;
  border: string;
  text: string;
}

export interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  colorTheme?: ColorTheme;
  isHighlighted?: boolean;
}
