import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { useApiMutation } from '@/shared/hooks/useApiMutation';

export function useTeamForm() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { mutate, isLoading } = useApiMutation();

    const form = useForm({
        name: '',
        email: '',
        password: '',
        role: 'developer',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        mutate('post', '/team', form.data, {
            onSuccess: () => {
                setIsModalOpen(false);
                form.reset();
                form.clearErrors();
            },
            onError: (errors) => {
                if (errors) {
                    form.setError(errors as any);
                }
            },
        });
    };

    return {
        isModalOpen,
        setIsModalOpen,
        form: {
            ...form,
            processing: isLoading, 
        },
        handleSubmit,
    };
}