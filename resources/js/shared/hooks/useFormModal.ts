import { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { useApiMutation } from './useApiMutation';
import { HttpMethod } from '../types/types';

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

    const {mutate, isLoading} = useApiMutation();

    useEffect(() => {
        if (!isOpen) return;

        form.setData(initialData ?? defaultValues);
        form.clearErrors();
    }, [initialData, isOpen, defaultValues]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const method: HttpMethod = isEditing && initialData ? 'put' : 'post';
        sendRequest(method);
    };

    const sendRequest = (method:HttpMethod)=>{
            mutate(method, submitUrl, form.data, {
            onSuccess: () => {
                onClose();
                form.reset();
                form.clearErrors();
            },
            onError: (errors) => {
                if (errors) {
                    form.setError(errors as Record<keyof T, string>)
                }
            },
        });
    }

    return {
        ...form,
        isLoading,
        handleSubmit,
    };
}