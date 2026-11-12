import { DataTable } from '@/shared/ui/table';
import { useProjectTable } from './hooks/useProjectTable';
import { UiProject } from './types/types';

export type { UiProject };

interface ProjectTableProps {
    projects: UiProject[];
    selectedIds?: number[];
    onSelectAll?: (checked: boolean) => void;
    onSelectOne?: (id: number) => void;
    onEditProject?: (project: UiProject) => void;
}

export function ProjectTable({ 
    projects, 
    selectedIds = [], 
    onSelectAll, 
    onSelectOne 
}: ProjectTableProps) {
    const { columns } = useProjectTable();

    return (
        <DataTable
            data={projects}
            columns={columns}
            emptyText="Brak aktywnych projektów. Utwórz pierwszy projekt, aby zacząć."
        />
    );
}