
import { Badge, BadgeVariant } from '@/shared/ui/badge';

interface TeamTasksListProps {
    tasks: App.Data.TaskData[];
}

const statusBadges: Record<App.Enums.TaskStatus, { label: string; variant: BadgeVariant }> = {
    do_zrobienia: { label: 'Do zrobienia', variant: 'do_zrobienia' },
    w_trakcie: { label: 'W trakcie', variant: 'w_trakcie' },
    zakonczone: { label: 'Zakończone', variant: 'zakonczone' },
};

export const TeamTasksList = ({ tasks }: TeamTasksListProps) => {
    return (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-slate-100">
                    Zadania użytkownika ({tasks.length})
                </h2>
            </div>

            {tasks.length === 0 ? (
                <p className="text-sm text-slate-500 py-4">Brak przypisanych zadań.</p>
            ) : (
                <div className="space-y-3">
                    {tasks.map((task) => {
                        const status = statusBadges[task.status] || { label: task.status, variant: 'default' };

                        return (
                            <div
                                key={task.id}
                                className="p-4 bg-slate-950 border border-slate-800/80 rounded-xl flex items-center justify-between gap-4"
                            >
                                <div>
                                    <h3 className="text-sm font-semibold text-slate-200">{task.title}</h3>
                                    {task.projectName && (
                                        <p className="text-xs text-indigo-400 mt-0.5">Projekt: {task.projectName}</p>
                                    )}
                                </div>
                                <Badge variant={status.variant} size="sm">
                                    {status.label}
                                </Badge>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};