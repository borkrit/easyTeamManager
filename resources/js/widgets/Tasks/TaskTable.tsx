import { DataTable, Column } from '@/shared/ui/table';
import { Link } from '@inertiajs/react';
import { PaginationWidget } from '..';

export type UiTask = App.Data.TaskData & {
    priority?: 'niski' | 'sredni' | 'wysoki';
    projectName?: string;
    assigneeName?: string | null;
};

export interface BaseTaskTableProps {
    tasks: { data: UiTask[]; [key: string]: any };
    onEditTask?: (task: UiTask) => void;
}

interface DefaultTaskTableProps extends BaseTaskTableProps {
    selectable?: true;
    selectedTaskIds: number[];
    toggleSelectAll: (checked: boolean) => void;
    toggleTaskSelection: (id: number) => void;
}

interface DisabledSelectionTaskTableProps extends BaseTaskTableProps {
    selectable: false;
    selectedTaskIds?: never;
    toggleSelectAll?: never;
    toggleTaskSelection?: never;
}

export type TaskTableProps = DefaultTaskTableProps | DisabledSelectionTaskTableProps;

export function TaskTable(props: TaskTableProps) {
    const { tasks, onEditTask } = props;
    const selectable = props.selectable ?? true;
    
    const columns: Column<UiTask>[] = [
        { 
            header: 'Tytuł zadania', 
            accessor: 'title', 
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
            accessor: (task) => (
                <span
                    className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${
                        task.status === 'zakonczone'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : task.status === 'w_trakcie'
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                            : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}
                >
                    {task.status === 'zakonczone' ? 'Ukończone' : task.status === 'w_trakcie' ? 'W trakcie' : 'Do zrobienia'}
                </span>
            ),
        },
        {
            header: 'Priorytet',
            accessor: (task) => (
                <span
                    className={`text-xs font-bold uppercase tracking-wider ${
                        task.priority === 'wysoki'
                            ? 'text-red-400'
                            : task.priority === 'sredni'
                            ? 'text-amber-400'
                            : 'text-slate-400'
                    }`}
                >
                    {task.priority}
                </span>
            ),
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

    return (
        <DataTable
            data={tasks.data}
            columns={columns}
            selectable={selectable}
            selectedIds={selectable ? props.selectedTaskIds : []}
            onSelectAll={selectable ? props.toggleSelectAll : undefined}
            onSelectOne={selectable ? props.toggleTaskSelection : undefined}
            emptyText="Brak zadań spełniających kryteria."
        />
    );
}