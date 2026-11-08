// resources/js/shared/hooks/useApiMutation.ts
import { useState } from 'react';
import { router } from '@inertiajs/react';

type HttpMethod = 'post' | 'put' | 'patch' | 'delete';

interface MutationOptions {
    onSuccess?: () => void;
    onError?: (errors: Record<string, any>) => void;
    preserveScroll?: boolean;
    preserveState?: boolean;
}

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