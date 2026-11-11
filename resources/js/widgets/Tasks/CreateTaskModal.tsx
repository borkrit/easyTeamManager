import { ModalFormWrapper } from '@/shared/ui/modalFormWrapper';
import { FormRenderer, FormFieldConfig } from '@/shared/ui/formRenderer';
import { useCreateTaskModal, CreateTaskModalProps } from './hooks/useCreateTaskModal';

export function CreateTaskModal(props: CreateTaskModalProps) {

    const normalizedProps = {
        ...props,
        task: props.task ?? props.initialData,
    };
    const { isOpen, onClose, projectId, projects = [] } = normalizedProps;

    const {
        isEditing,
        data,
        setData,
        processing,
        errors,
        availableUsers,
        hasNoUsers,
        handleSubmit,
    } = useCreateTaskModal(props);

    const fields: FormFieldConfig[] = [
        ...(!projectId && projects.length > 0 ? [{
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
                { value: 'do_zrobienia', label: 'Do zrobienia' },
                { value: 'w_trakcie', label: 'W trakcie' },
                { value: 'zakonczone', label: 'Zakończone' },
            ],
        },
        {
            name: 'priority',
            label: 'Priorytet',
            type: 'select' as const,
            options: [
                { value: 'niski', label: 'Niski' },
                { value: 'sredni', label: 'Średni' },
                { value: 'wysoki', label: 'Wysoki' },
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
    ];

    return (
        <ModalFormWrapper
            isOpen={isOpen}
            onClose={onClose}
            title={isEditing ? 'Edytuj zadanie' : 'Utwórz nowe zadanie'}
            onSubmit={handleSubmit}
            isEditing={isEditing}
            processing={processing}
        >
            <FormRenderer
                fields={fields}
                data={data}
                errors={errors}
                onChange={(name, value) => {
                    setData(name as any, value);
                    
                    if (name === 'project_id') {
                        setData('user_id', '');
                    }
                }}
            />
        </ModalFormWrapper>
    );
}