import { router } from '@inertiajs/react';
import { useState, useEffect } from 'react';

interface TaskFiltersProps {
    filters: {
        search?: string;
        status?: string;
        priority?: string;
        user_id?: string;
        project_id?: string;
    };
    users: { id: number; name: string }[];
    projects: { id: number; name: string }[];
}

export function TaskFilters({ filters, users, projects }: TaskFiltersProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || '');
    const [priority, setPriority] = useState(filters.priority || '');
    const [userId, setUserId] = useState(filters.user_id || '');
    const [projectId, setProjectId] = useState(filters.project_id || '');

    
    useEffect(() => {
        const timer = setTimeout(() => {
            if (search !== (filters.search || '')) {
                applyFilters({ search, status, priority, user_id: userId, project_id: projectId });
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [search]);

    const applyFilters = (newFilters: { 
        search: string; 
        status: string; 
        priority: string; 
        user_id: string; 
        project_id: string 
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

    return (
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl mb-6 flex flex-wrap items-center gap-4">
           
            <div className="flex-1 min-w-[200px]">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Szukaj zadania..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                />
            </div>

            
            <div className="w-40">
                <select
                    value={status}
                    onChange={(e) => handleSelectChange('status', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
                >
                    <option value="">Statusy</option>
                    <option value="do_zrobienia">Do zrobienia</option>
                    <option value="w_trakcie">W trakcie</option>
                    <option value="zakonczone">Zakończone</option>
                </select>
            </div>

           
            <div className="w-40">
                <select
                    value={priority}
                    onChange={(e) => handleSelectChange('priority', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
                >
                    <option value="">Priorytety</option>
                    <option value="niski">Niski</option>
                    <option value="sredni">Średni</option>
                    <option value="wysoki">Wysoki</option>
                </select>
            </div>

            <div className="w-44">
                <select
                    value={userId}
                    onChange={(e) => handleSelectChange('user_id', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
                >
                    <option value="">Wykonawca</option>
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="w-44">
                <select
                    value={projectId}
                    onChange={(e) => handleSelectChange('project_id', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
                >
                    <option value="">Projekt</option>
                    {projects.map((project) => (
                        <option key={project.id} value={project.id}>
                            {project.name}
                        </option>
                    ))}
                </select>
            </div>

            {(search || status || priority || userId || projectId) && (
                <button
                    onClick={handleReset}
                    className="text-xs text-slate-400 hover:text-slate-200 bg-slate-800/50 hover:bg-slate-800 px-3 py-2 rounded-lg transition-colors border border-slate-700"
                >
                    Reset
                </button>
            )}
        </div>
    );
}