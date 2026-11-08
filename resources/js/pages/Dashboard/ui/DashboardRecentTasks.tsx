import { Link } from '@inertiajs/react';

interface RecentTask {
    id: number;
    title: string;
    projectName: string;
    status: App.Enums.TaskStatus;
    assigneeName: string | null;
}

interface DashboardRecentTasksProps {
    recentTasks: RecentTask[];
}

export const DashboardRecentTasks = ({ recentTasks }: DashboardRecentTasksProps) => {
    return (
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
    );
};