import { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';

export interface TaskFilterValues {
    search?: string;
    status?: string;
    priority?: string;
    user_id?: string;
    project_id?: string;
}

interface UseTaskFiltersProps {
    filters: TaskFilterValues;
}

export const useTaskFilters = ({ filters }: UseTaskFiltersProps) => {
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || '');
    const [priority, setPriority] = useState(filters.priority || '');
    const [userId, setUserId] = useState(filters.user_id || '');
    const [projectId, setProjectId] = useState(filters.project_id || '');

    const applyFilters = (newFilters: {
        search: string;
        status: string;
        priority: string;
        user_id: string;
        project_id: string;
    }) => {
        router.get(
            window.location.pathname,
            {
                search: newFilters.search || undefined,
                status: newFilters.status || undefined,
                priority: newFilters.priority || undefined,
                user_id: newFilters.user_id || undefined,
                project_id: newFilters.project_id || undefined,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    };
    useEffect(() => {
        const timer = setTimeout(() => {
            if (search !== (filters.search || '')) {
                applyFilters({ search, status, priority, user_id: userId, project_id: projectId });
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [search]);

    const handleSelectChange = (key: 'status' | 'priority' | 'user_id' | 'project_id', value: string) => {
        const updated = {
            search,
            status: key === 'status' ? value : status,
            priority: key === 'priority' ? value : priority,
            user_id: key === 'user_id' ? value : userId,
            project_id: key === 'project_id' ? value : projectId,
        };

        if (key === 'status') setStatus(value);
        if (key === 'priority') setPriority(value);
        if (key === 'user_id') setUserId(value);
        if (key === 'project_id') setProjectId(value);

        applyFilters(updated);
    };

    const handleReset = () => {
        setSearch('');
        setStatus('');
        setPriority('');
        setUserId('');
        setProjectId('');
        router.get(window.location.pathname, {}, { preserveState: true, replace: true });
    };

    const hasActiveFilters = Boolean(search || status || priority || userId || projectId);

    return {
        search,
        setSearch,
        status,
        priority,
        userId,
        projectId,
        hasActiveFilters,
        handleSelectChange,
        handleReset,
    };
};