import { DataTable } from '@/shared/ui/table';
import { TaskTableProps } from './types/types';
import { useTaskColumns } from './hooks/useTaskColumns';

export function TaskTable(props: TaskTableProps) {
    const { tasks, onEditTask } = props;
    const selectable = props.selectable ?? true;
    
    const columns = useTaskColumns({ onEditTask });

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