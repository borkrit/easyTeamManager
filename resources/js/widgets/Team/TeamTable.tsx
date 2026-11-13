import { useDeleteResource } from '@/shared/hooks/useDeleteResource';
import { DataTable } from '@/shared/ui/table';
import { useTeamColumns } from './hooks/useTeamColumns';
import { TeamTableProps } from './types/types';



export function TeamTable({ 
    users, 
}: TeamTableProps) {
    const { deleteItem: deleteUser } = useDeleteResource('team');  
    const columns = useTeamColumns({ onDelete: deleteUser });

    return (
        <DataTable
            data={users}
            columns={columns}
            emptyText="Brak członków zespołu w bazie."
        />
    );
}