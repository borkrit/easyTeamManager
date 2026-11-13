import { ModalFormWrapper } from '@/shared/ui/modalFormWrapper';
import { FormRenderer } from '@/shared/ui/formRenderer';
import { useTeamFormFields } from './hooks/useTeamFormFields';
import { CreateTeamModalProps } from './types/types';

export function CreateTeamModal({ isOpen, onClose, form, onSubmit, team }: CreateTeamModalProps) {
    const isEditing = !!team;
    const { data, setData, processing, errors } = form;
    const fields = useTeamFormFields();

    return (
        <ModalFormWrapper
            isOpen={isOpen}
            onClose={onClose}
            title={isEditing ? 'Edytuj członka zespołu' : 'Dodaj nowego członka zespołu'}
            onSubmit={onSubmit}
            isEditing={isEditing}
            processing={processing}
        >
            <FormRenderer
                fields={fields}
                data={data}
                errors={errors}
                onChange={(name, value) => {
                    setData(name as any, value);
                }}
            />
        </ModalFormWrapper>
    );
}