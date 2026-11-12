import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { ModalFormWrapper } from '@/shared/ui/modalFormWrapper';
import { FormRenderer, FormFieldConfig } from '@/shared/ui/formRenderer';
import { ProjectData, ProjectUser,ProjectFormValues } from './types/types';
import { Label } from '@/shared/ui/label';


interface CreateProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    users?: ProjectUser[];
    initialData?: ProjectData | null;
}

export function CreateProjectModal({
    isOpen,
    onClose,
    users = [],
    initialData = null,
}: CreateProjectModalProps) {
    const isEditing = Boolean(initialData?.id);

    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm<ProjectFormValues>({
        name: '',
        description: '',
        user_ids: [],
    });

    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                setData({
                    name: initialData.name || '',
                    description: initialData.description || '',
                    user_ids: initialData.users ? initialData.users.map((u) => u.id) : [],
                });
            } else {
                reset();
            }
            clearErrors();
        }
    }, [isOpen, initialData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const options = {
            onSuccess: () => {
                reset();
                onClose();
            },
        };

        if (isEditing && initialData?.id) {
            put(`/projects/${initialData.id}`, options);
        } else {
            post('/projects', options);
        }
    };

    const fields: FormFieldConfig[] = [
        {
            name: 'name',
            label: 'Nazwa projektu',
            type: 'text' as const,
            required: true,
            placeholder: 'np. Redesign strony internetowej',
        },
        {
            name: 'description',
            label: 'Opis projektu',
            type: 'textarea' as const,
            placeholder: 'Krótki opis celów projektu...',
            rows: 3,
        },
    ];

    return (
        <ModalFormWrapper
            isOpen={isOpen}
            onClose={onClose}
            title={isEditing ? 'Edytuj projekt' : 'Utwórz nowy projekt'}
            onSubmit={handleSubmit}
            isEditing={isEditing}
            processing={processing}
        >
            <FormRenderer
                fields={fields}
                data={data}
                errors={errors}
                onChange={(name, value) => setData(name as any, value)}
            />

            {users.length > 0 && (
                <div className="space-y-1.5 pt-2">
                    <Label>Przypisz członków zespołu</Label>
                    <div className="max-h-36 overflow-y-auto space-y-1.5 pr-1">
                        {users.map((user) => {
                            const userIds = (data.user_ids as number[]) || [];
                            const isChecked = userIds.includes(user.id);

                            return (
                                <label
                                    key={user.id}
                                    className="flex items-center gap-2 p-2 rounded-lg bg-slate-950/60 border border-slate-800/80 cursor-pointer hover:bg-slate-800/50 transition-colors"
                                >
                                    <input
                                        type="checkbox"
                                        checked={isChecked}
                                        onChange={() => {
                                            const updated = isChecked
                                                ? userIds.filter((id) => id !== user.id)
                                                : [...userIds, user.id];
                                            setData('user_ids', updated);
                                        }}
                                        className="rounded border-slate-700 bg-slate-900 text-indigo-600 focus:ring-indigo-500/20"
                                    />
                                    <span className="text-sm text-slate-300">{user.name}</span>
                                </label>
                            );
                        })}
                    </div>
                </div>
            )}
        </ModalFormWrapper>
    );
}