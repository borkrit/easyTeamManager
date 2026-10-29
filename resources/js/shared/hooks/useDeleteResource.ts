import { router } from '@inertiajs/react';

type ResourceType = 'projects' | 'team' | 'tasks';

interface UseDeleteOptions {
    confirmMessage?: string;
    onSuccess?: () => void;
}

export function useDeleteResource(resourceType: ResourceType, options?: UseDeleteOptions) {
    const resourceLabels: Record<ResourceType, { pl: string; genitive: string }> = {
        projects: { pl: 'projekt', genitive: 'projektu' },
        team: { pl: 'użytkownika', genitive: 'użytkownika' },
        tasks: { pl: 'zadanie', genitive: 'zadania' },
    };

    const deleteItem = (id: number, name?: string) => {
        const label = resourceLabels[resourceType];
        const defaultMessage = name
            ? `Czy na pewno chcesz usunąć ${label.pl} "${name}"? Ta operacja jest nieodwracalna.`
            : `Czy na pewno chcesz usunąć ten element? Ta operacja jest nieodwracalna.`;

        if (confirm(options?.confirmMessage || defaultMessage)) {
            router.delete(`/${resourceType}/${id}`, {
                onSuccess: () => {
                    if (options?.onSuccess) {
                        options.onSuccess();
                    }
                },
            });
        }
    };

    return {
        deleteItem,
    };
}