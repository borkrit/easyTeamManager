import React from 'react';
import { AppLayout } from '@/layouts/AppLayout';
import { Button } from '@/shared/ui/button';
import { Head, Link } from '@inertiajs/react';
import { StatCard } from './components/StatCard';

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
  status: 'do_zrobienia' | 'w_trakcie' | 'zakonczone';
  assigneeName: string | null;
}

interface DashboardProps {
  stats: DashboardStats;
  recentTasks: RecentTask[];
}



export default function DashboardIndex({ stats, recentTasks }: DashboardProps) {
  return (
    <AppLayout title="Pulpit główny">
      <Head title="Pulpit" />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-100">Witaj ponownie! 👋</h2>
          <p className="text-sm text-slate-400 mt-1">
            Oto podsumowanie stanu projektów i zadań w systemie EasyTeamManager.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/projects">
            <Button variant="secondary" size="md">
              📂 Zobacz projekty
            </Button>
          </Link>
          <Link href="/tasks">
            <Button variant="primary" size="md">
              + Nowe zadanie
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatCard title="Wszystkie projekty" value={stats.totalProjects} icon="📁" colorTheme="indigo" />
        <StatCard title="Zadania w systemie" value={stats.totalTasks} icon="📋" colorTheme="blue" />
        <StatCard title="Ukończone zadania" value={stats.completedTasks} icon="✅" colorTheme="emerald" isHighlighted />
        <StatCard title="Członkowie zespołu" value={stats.totalTeamMembers} icon="👥" colorTheme="purple" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-slate-100">Ostatnio dodane zadania</h3>
            <Link href="/tasks" className="text-xs font-medium text-indigo-400 hover:text-indigo-300">
              Zobacz wszystkie &rarr;
            </Link>
          </div>

          <div className="divide-y divide-slate-800">
            {recentTasks.length > 0 ? (
              recentTasks.map((task) => (
                <div key={task.id} className="py-3.5 flex items-center justify-between first:pt-0 last:pb-0">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-slate-200">{task.title}</p>
                    <p className="text-xs text-slate-400">
                      Projekt: <span className="text-slate-300 font-medium">{task.projectName}</span>
                    </p>
                  </div>
                  <div>
                    <span
                      className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${
                        task.status === 'zakonczone'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : task.status === 'w_trakcie'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : 'bg-slate-800 text-slate-400 border border-slate-700'
                      }`}
                    >
                      {task.status === 'zakonczone'
                        ? 'Ukończone'
                        : task.status === 'w_trakcie'
                        ? 'W trakcie'
                        : 'Do zrobienia'}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500 py-6 text-center">Brak ostatnich zadań w systemie.</p>
            )}
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-100 mb-3">Informacje o systemie</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Panel zarządzania EasyTeamManager został zaprojektowany w architekturze <strong className="text-slate-200">Feature-Sliced Design</strong> z użyciem <strong className="text-slate-200">Laravel, Inertia.js, React oraz Tailwind CSS</strong>.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Wersja aplikacji:</span>
              <span className="font-mono font-medium text-slate-200">1.0.0-rc</span>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}