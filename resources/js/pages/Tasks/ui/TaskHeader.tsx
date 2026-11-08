
import { Badge, BadgeVariant } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';

interface TaskHeaderProps {
    task: App.Data.TaskData;
    onEditClick: () => void;
}

const statusBadges: Record<App.Enums.TaskStatus, { label: string; variant: BadgeVariant }> = {
    do_zrobienia: { label: 'Do zrobienia', variant: 'do_zrobienia' },
    w_trakcie: { label: 'W trakcie', variant: 'w_trakcie' },
    zakonczone: { label: 'Zakończone', variant: 'zakonczone' },
};

export const TaskHeader = ({ task, onEditClick }: TaskHeaderProps) => {
    const statusInfo = statusBadges[task.status as App.Enums.TaskStatus] || { label: task.status, variant: 'default' };

    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
                <div className="flex items-center gap-3 mb-2">
                    <Badge variant={statusInfo.variant}>
                        {statusInfo.label}
                    </Badge>

                    {task.projectName && (
                        <span className="text-xs text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 rounded-md">
                            Projekt: {task.projectName}
                        </span>
                    )}
                </div>
                <h1 className="text-2xl font-bold text-slate-100 tracking-tight">{task.title}</h1>
            </div>

            <Button variant="secondary" size="md" onClick={onEditClick}>
                Edytuj zadanie
            </Button>
        </div>
    );
};