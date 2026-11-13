import { useForm } from '@inertiajs/react';
import { useApiMutation } from '@/shared/hooks/useApiMutation';

interface UseCommentsProps {
    commentableType: 'task' | 'project';
    commentableId: number;
}

export function useComments({ commentableType, commentableId }: UseCommentsProps) {
    const { mutate, isLoading: isMutating } = useApiMutation();
    const { data, setData, processing, reset, errors, clearErrors } = useForm({
        body: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        mutate('post', `/${commentableType}s/${commentableId}/comments`, data, {
            onSuccess: () => {
                reset('body');
                clearErrors();
            },
        });
    };

    return {
        data,
        setData,
        handleSubmit,
        processing: processing || isMutating,
        errors,
    };
}