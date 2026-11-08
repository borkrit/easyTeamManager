import { Badge, BadgeVariant } from '@/shared/ui/badge';

interface TaskDetailsSidebarProps {
    task: App.Data.TaskData;
}

const priorityBadges: Record<App.Enums.TaskPriority, { label: string; variant: BadgeVariant }> = {
    niski: { label: 'Niski', variant: 'niski' },
    sredni: { label: 'Średni', variant: 'sredni' },
    wysoki: { label: 'Wysoki', variant: 'wysoki' },
};

export const TaskDetailsSidebar = ({ task }: TaskDetailsSidebarProps) => {
    const priorityInfo = task.priority 
        ? priorityBadges[task.priority as App.Enums.TaskPriority] 
        : null;

    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
            <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider border-b border-slate-800 pb-3">
                Szczegóły
            </h3>
            
            <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center py-1.5 border-b border-slate-800/60">
                    <span className="text-slate-400">Priorytet:</span>
                    <span>
                        {priorityInfo ? (
                            <Badge variant={priorityInfo.variant} size="sm">
                                {priorityInfo.label}
                            </Badge>
                        ) : (
                            <span className="text-slate-500">Brak</span>
                        )}
                    </span>
                </div>

                <div className="flex justify-between items-center py-1.5 border-b border-slate-800/60">
                    <span className="text-slate-400">Przypisana osoba:</span>
                    <span className="font-medium text-slate-200">{task.assigneeName || 'Nie przypisano'}</span>
                </div>

                <div className="flex justify-between items-center py-1.5 border-b border-slate-800/60">
                    <span className="text-slate-400">Projekt:</span>
                    <span className="font-medium text-slate-200">{task.projectName || 'Brak projektu'}</span>
                </div>

                <div className="flex justify-between items-center py-1.5">
                    <span className="text-slate-400">Utworшено:</span>
                    <span className="text-slate-300">
                        {task.created_at ? new Date(task.created_at).toLocaleDateString('pl-PL', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                        }) : '-'}
                    </span>
                </div>
            </div>
        </div>
    );
};