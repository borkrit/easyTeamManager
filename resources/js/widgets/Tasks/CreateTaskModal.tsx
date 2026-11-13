import { ModalFormWrapper } from '@/shared/ui/modalFormWrapper';
import { FormRenderer } from '@/shared/ui/formRenderer';
import { useCreateTaskModal } from './hooks/useCreateTaskModal';
import { useTaskFormFields } from './hooks/useTaskFormFields';
import { CreateTaskModalProps } from './types/types';

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

   const fields = useTaskFormFields({
    projectId,
    projects,
    availableUsers,
    hasNoUsers,
});

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