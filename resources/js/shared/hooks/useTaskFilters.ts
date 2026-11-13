import { useTableFilters } from '@/shared/hooks/useTableFilters';

interface Project {
    id: number;
    name: string;
}

export function useTaskFilters(initialFilters: Record<string, any>, projects: Project[]) {
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