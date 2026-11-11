// resources/js/shared/hooks/useFormModal.ts
import { useEffect } from 'react';
import { useForm } from '@inertiajs/react';

interface UseFormModalProps<T extends Record<string, any>> {
    isOpen: boolean;
    onClose: () => void;
    initialData?: T | null;
    defaultValues: T;
    submitUrl: string;
    isEditing: boolean;
}

export function useFormModal<T extends Record<string, any>>({
    isOpen,
    onClose,
    initialData,
    defaultValues,
    submitUrl,
    isEditing,
}: UseFormModalProps<T>) {
    const form = useForm(defaultValues);

    useEffect(() => {
        if (initialData) {
            form.setData(initialData as any);
        } else {
            form.setData(defaultValues);
        }
        form.clearErrors();
    }, [initialData, isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEditing && initialData) {
            form.put(submitUrl, {
                onSuccess: () => {
                    onClose();
                    form.reset();
                },
            });
        } else {
            form.post(submitUrl, {
                onSuccess: () => {
                    onClose();
                    form.reset();
                },
            });
        }
    };

    return {
        ...form,
        handleSubmit,
    };
}