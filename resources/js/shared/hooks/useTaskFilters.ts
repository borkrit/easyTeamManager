import { useTableFilters } from '@/shared/hooks/useTableFilters';
import { ProjectOption, TaskFilterOptions } from '@/shared/types/types';

export function useTaskFilters(initialFilters: TaskFilterOptions, projects: ProjectOption[]) {
    const { filters, handleFilterChange, handleReset } = useTableFilters(initialFilters);

    const fields = [
        {
            name: 'status',
            label: 'Status zadania',
            type: 'select' as const,
            options: [
                { value: 'do_zrobienia', label: 'Do zrobienia' },
                { value: 'w_trakcie', label: 'W trakcie' },
                { value: 'zakonczone', label: 'Ukończone' },
            ],
        },
        {
            name: 'project_id',
            label: 'Projekt',
            type: 'select' as const,
            options: projects.map((p) => ({ value: p.id, label: p.name })),
        },
    ];

    return {
        filters,
        fields,
        handleFilterChange,
        handleReset,
    };
}