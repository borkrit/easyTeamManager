import { Column } from '@/shared/ui/table';
import { Link } from '@inertiajs/react';
import { UiTask } from '../types/types';
import { getTaskStatusInfo, getTaskPriorityInfo } from '../taskTable.helpers';

interface UseTaskColumnsProps {
    onEditTask?: (task: UiTask) => void;
}

export function useTaskColumns({ onEditTask }: UseTaskColumnsProps): Column<UiTask>[] {
    return [
        { 
            header: 'Tytuł zadania', 
            accessor: (task) => (
                <Link
                    href={`/tasks/${task.id}`}
                    className="font-medium text-slate-100 hover:text-indigo-400 transition-colors"
                >
                    {task.title}
                </Link>
            ), 
            className: 'font-medium text-slate-200' 
        },
        { 
            header: 'Projekt', 
            accessor: (task) => task.projectName ?? '—', 
            className: 'text-slate-400' 
        },
        {
            header: 'Wykonawca',
            accessor: (task) =>
                task.assigneeName ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 text-xs font-medium border border-slate-700">
                        👤 {task.assigneeName}
                    </span>
                ) : (
                    <span className="text-slate-500 text-xs italic">Brak wykonawcy</span>
                ),
        },
        {
            header: 'Status',
            accessor: (task) => {
                const { label, className } = getTaskStatusInfo(task.status);
                return (
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${className}`}>
                        {label}
                    </span>
                );
            },
        },
        {
            header: 'Priorytet',
            accessor: (task) => {
                const { label, className } = getTaskPriorityInfo(task.priority);
                return (
                    <span className={`text-xs font-bold uppercase tracking-wider ${className}`}>
                        {label}
                    </span>
                );
            },
        },
        ...(onEditTask ? [{
            header: 'Akcje',
            accessor: (task: UiTask) => (
                <button
                    onClick={() => onEditTask(task)}
                    className="text-indigo-400 hover:text-indigo-300 text-xs font-medium px-2.5 py-1 rounded-md bg-indigo-500/10 hover:bg-indigo-500/20 transition-colors"
                >
                    Edytuj
                </button>
            ),
            className: 'text-right',
        }] : []),
    ];
}