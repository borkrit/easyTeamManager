import { useState } from 'react';
import { useForm } from '@inertiajs/react';

export function useTeamForm() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const form = useForm({
        name: '',
        email: '',
        password: '',
        role: 'developer',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post('/team', {
            onSuccess: () => {
                setIsModalOpen(false);
                form.reset();
            },
        });
    };

    return {
        isModalOpen,
        setIsModalOpen,
        form,
        handleSubmit,
    };
}