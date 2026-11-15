import { useState } from 'react';
import { router } from '@inertiajs/react';
import { HttpMethod, MutationOptions } from '@/shared/types/types';

export const useApiMutation = () => {
    const [isLoading, setIsLoading] = useState(false);

    const mutate = (
        method: HttpMethod,
        url: string,
        data: Record<string, any> = {},
        options: MutationOptions = {}
    ) => {
        setIsLoading(true);

        router[method](url, data, {
            preserveScroll: options.preserveScroll ?? true,
            preserveState: options.preserveState ?? true,
            onSuccess: () => {
                options.onSuccess?.();
            },
            onError: (errors) => {
                options.onError?.(errors);
            },
            onFinish: () => {
                setIsLoading(false);
            },
        });
    };

    return {
        mutate,
        isLoading,
    };
};