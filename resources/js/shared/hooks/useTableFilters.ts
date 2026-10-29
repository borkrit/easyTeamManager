import { router } from '@inertiajs/react';
import { useState } from 'react';

interface FilterValues {
    [key: string]: any;
}

export function useTableFilters(initialFilters: FilterValues) {
    const [filters, setFilters] = useState<FilterValues>(initialFilters);

    const handleFilterChange = (key: string, value: any) => {
        const updatedFilters = {
            ...filters,
            [key]: value,
        };
        setFilters(updatedFilters);

        router.get(
            window.location.pathname,
            { ...updatedFilters, page: 1 },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    };

    const handleReset = () => {
        const resetFilters: FilterValues = {};
        Object.keys(filters).forEach((key) => {
            resetFilters[key] = '';
        });
        setFilters(resetFilters);

        router.get(
            window.location.pathname,
            {},
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    };

    return {
        filters,
        handleFilterChange,
        handleReset,
    };
}