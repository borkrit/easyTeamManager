import { useMemo } from 'react';
import { FormFieldConfig } from '@/shared/ui/formRenderer';
import { TASK_STATUS_OPTIONS, TASK_PRIORITY_OPTIONS } from '@/shared/config/task.constants';
import { GetTaskFormFieldsParams } from '../types/types';

export function useTaskFormFields({
    projectId,
    projects,
    availableUsers,
    hasNoUsers,
}: GetTaskFormFieldsParams): FormFieldConfig[] {
    return useMemo(() => [
        ...(!projectId && projects.length ? [{
            name: 'project_id',
            label: 'Projekt',
            type: 'select' as const,
            required: true,
            options: [
                { value: '', label: 'Wybierz projekt' },
                ...projects.map(p => ({ value: p.id, label: p.name }))
            ]
        }] : []),
        {
            name: 'title',
            label: 'Tytuł zadania',
            type: 'text' as const,
            required: true,
            placeholder: 'np. Implementacja autoryzacji',
        },
        {
            name: 'description',
            label: 'Opis',
            type: 'textarea' as const,
            placeholder: 'Szczegóły zadania...',
            rows: 3,
        },
        {
            name: 'status',
            label: 'Status',
            type: 'select' as const,
            options: [
                { value: '', label: 'Wybierz status' },
                ...TASK_STATUS_OPTIONS,
            ],
        },
        {
            name: 'priority',
            label: 'Priorytet',
            type: 'select' as const,
            options: [
                { value: '', label: 'Wybierz priorytet' },
                ...TASK_PRIORITY_OPTIONS,
            ],
        },
        {
            name: 'user_id',
            label: 'Przypisz wykonawcy',
            type: 'select' as const,
            required: true,
            disabled: hasNoUsers,
            hint: hasNoUsers ? 'Ten projekt nie ma przypisanych użytkowników.' : undefined,
            options: hasNoUsers ? [
                { value: '', label: 'Brak dostępnych użytkowników w projekcie' }
            ] : [
                { value: '', label: 'Wybierz członka zespołu' },
                ...availableUsers.map(u => ({ value: u.id, label: u.name }))
            ],
        },
    ], [projectId, projects, availableUsers, hasNoUsers]);
}