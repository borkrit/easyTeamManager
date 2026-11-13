import { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { useApiMutation } from '@/shared/hooks/useApiMutation';
import { ProjectData, ProjectFormValues } from '../types/types';

interface UseCreateProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialData?: ProjectData | null;
}

export const useCreateProjectModal = ({ isOpen, onClose, initialData }: UseCreateProjectModalProps) => {
    const isEditing = Boolean(initialData?.id);
    const { mutate, isLoading: isMutating } = useApiMutation();

    const { data, setData, processing, errors, reset, clearErrors } = useForm<ProjectFormValues>({
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

        const url = isEditing ? `/projects/${initialData!.id}` : '/projects';
        const method = isEditing ? 'put' : 'post';

        mutate(method, url, data, {
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    };

    const toggleUser = (userId: number) => {
        setData(
            'user_ids',
            data.user_ids.includes(userId)
                ? data.user_ids.filter((id) => id !== userId)
                : [...data.user_ids, userId]
        );
    };

    return {
        isEditing,
        data,
        setData,
        processing: processing || isMutating,
        errors,
        handleSubmit,
        toggleUser,
    };
};