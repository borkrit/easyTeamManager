import { useDeleteResource } from '@/shared/hooks/useDeleteResource';
import { DataTable, Column } from '@/shared/ui/table';
import { Link } from '@inertiajs/react';

export type UiProject = {
    id: number;
    name: string;
    description?: string;
    tasks_count?: number;
    users?: { id: number; name: string; email: string }[];
    created_at: string;
};

interface ProjectTableProps {
    projects: UiProject[];
    selectedIds?: number[];
    onSelectAll?: (checked: boolean) => void;
    onSelectOne?: (id: number) => void;
}

export function ProjectTable({ 
    projects, 
    selectedIds = [], 
    onSelectAll, 
    onSelectOne 
}: ProjectTableProps) {
    const { deleteItem: deleteProject } = useDeleteResource('projects');    
    const columns: Column<UiProject>[] = [
        { 
            header: 'Nazwa projektu', 
            accessor: (project) => (
                <div>
                    <Link
                    href={`/projects/${project.id}`}
                    className="font-medium text-slate-100 hover:text-indigo-400 transition-colors"
                >
                    {project.name}
                </Link>
                    {project.description && (
                        <div className="text-xs text-slate-400 truncate max-w-md">{project.description}</div>
                    )}
                </div>
            ) 
        },
        { 
            header: 'Zadania', 
            accessor: (project) => (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 text-xs font-medium border border-slate-700">
                    📋 {project.tasks_count ?? 0} zadań
                </span>
            ),
            className: 'w-36'
        },
        { 
            header: 'Zespół', 
            accessor: (project) => (
                <div className="flex -space-x-2 overflow-hidden">
                    {project.users && project.users.length > 0 ? (
                        project.users.map((user) => (
                            <div 
                                key={user.id} 
                                title={user.name}
                                className="inline-block h-7 w-7 rounded-full ring-2 ring-slate-900 bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 text-xs font-bold flex items-center justify-center"
                            >
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                        ))
                    ) : (
                        <span className="text-xs text-slate-500 italic">Brak przypisanych</span>
                    )}
                </div>
            ) 
        },
        {
            header: 'Utworiono',
            accessor: (project) => (
                <span className="text-xs text-slate-400">
                    {project.created_at ? new Date(project.created_at).toLocaleDateString('pl-PL') : '—'}
                </span>
            ),
            className: 'w-36'
        },
        {
            header: 'Akcje',
            accessor: (project: UiProject) => (
                <div className="flex items-center justify-end gap-2">
                    <Link
                        href={`/projects/${project.id}`}
                        className="text-indigo-400 hover:text-indigo-300 text-xs font-medium px-2.5 py-1 rounded-md bg-indigo-500/10 hover:bg-indigo-500/20 transition-colors"
                    >
                        Szczegóły
                    </Link>
                    <button
                        onClick={() => deleteProject(project.id, project.name)}
                        className="text-red-400 hover:text-red-300 text-xs font-medium px-2.5 py-1 rounded-md bg-red-500/10 hover:bg-red-500/20 transition-colors"
                    >
                        Usuń
                    </button>
                </div>
            ),
            className: 'text-right',
        },
        
    ];

    return (
        <DataTable
            data={projects}
            columns={columns}
            // selectable={true}
            // selectedIds={selectedIds}
            // onSelectAll={onSelectAll}
            // onSelectOne={onSelectOne}
            emptyText="Brak aktywnych projektów. Utwórz pierwszy projekt, aby zacząć."
        />
    );
}