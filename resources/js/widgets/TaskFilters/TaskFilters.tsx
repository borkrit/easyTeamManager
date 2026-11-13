import { useTaskFilters } from './hooks/useTaskFilters';
import { TaskFiltersProps } from './types/types';
import { TASK_STATUS_OPTIONS, TASK_PRIORITY_OPTIONS } from '@/shared/config';
import { Input } from '@/shared/ui/input';
import { Select } from '@/shared/ui/select';
import { Button } from '@/shared/ui/button';

export function TaskFilters({ filters, users, projects }: TaskFiltersProps) {
    const {
        search,
        setSearch,
        status,
        priority,
        userId,
        projectId,
        hasActiveFilters,
        handleSelectChange,
        handleReset,
    } = useTaskFilters({ filters });

    const selectFilters = [
        {
            value: status,
            key: 'status' as const,
            placeholder: 'Statusy',
            options: TASK_STATUS_OPTIONS,
            width: 'w-40',
        },
        {
            value: priority,
            key: 'priority' as const,
            placeholder: 'Priorytety',
            options: TASK_PRIORITY_OPTIONS,
            width: 'w-40',
        },
        {
            value: userId,
            key: 'user_id' as const,
            placeholder: 'Wykonawca',
            options: users.map((u) => ({ value: String(u.id), label: u.name })),
            width: 'w-44',
        },
        {
            value: projectId,
            key: 'project_id' as const,
            placeholder: 'Projekt',
            options: projects.map((p) => ({ value: String(p.id), label: p.name })),
            width: 'w-44',
        },
    ];

    return (
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl mb-6 flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-50">
                <Input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Szukaj zadania..."
                />
            </div>

            {selectFilters.map((filter) => (
                <div key={filter.key} className={filter.width}>
                    <Select
                        value={filter.value}
                        onChange={(e) => handleSelectChange(filter.key, e.target.value)}
                        options={filter.options}
                        placeholder={filter.placeholder}
                    />
                </div>
            ))}

            {hasActiveFilters && (
                <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={handleReset}
                >
                    Reset
                </Button>
            )}
        </div>
    );
}