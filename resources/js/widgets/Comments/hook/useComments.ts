import React from 'react';
import { useForm } from '@inertiajs/react';

interface UseCommentsProps {
    commentableType: 'task' | 'project';
    commentableId: number;
}

export function useComments({ commentableType, commentableId }: UseCommentsProps) {
    const { data, setData, post, processing, reset, errors } = useForm({
        body: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/${commentableType}s/${commentableId}/comments`, {
            onSuccess: () => reset('body'),
        });
    };

    return {
        data,
        setData,
        handleSubmit,
        processing,
        errors,
    };
}