import { useDeleteResource } from '@/shared/hooks/useDeleteResource';
import { DataTable, Column } from '@/shared/ui/table';
import { Link } from '@inertiajs/react';

export type TeamMember = App.Data.UserData

interface TeamTableProps {
    users: TeamMember[];
    selectedUserIds?: number[];
    onSelectAll?: (checked: boolean) => void;
    onSelectOne?: (id: number) => void;
}

export function TeamTable({ 
    users, 
    selectedUserIds = [], 
    onSelectAll, 
    onSelectOne 
}: TeamTableProps) {

    const { deleteItem: deleteUser } = useDeleteResource('team');  
    
    const columns: Column<TeamMember>[] = [
        { 
            header: 'Imię i nazwisko', 
            accessor: (user) => (
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold text-xs">
                        {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <div className="font-medium text-slate-200">{user.name}</div>
                        <div className="text-xs text-slate-500">{user.email}</div>
                    </div>
                </div>
            ) 
        },
        { 
            header: 'Rola', 
            accessor: (user) => (
                <span className="inline-flex px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                    {user.role ?? 'Członek zespołu'}
                </span>
            ) 
        },
        { 
            header: 'Projekty', 
            accessor: (user) => (
                <span className="text-slate-300 font-medium">
                    {user.projects_count ?? 0}
                </span>
            ),
            className: 'text-center w-28'
        },
        { 
            header: 'Zadania', 
            accessor: (user) => (
                <span className="text-slate-300 font-medium">
                    {user.tasks_count ?? 0}
                </span>
            ),
            className: 'text-center w-28'
        },
        {
            header: 'Dołączył',
            accessor: (user) => (
                <span className="text-xs text-slate-400">
                    {user.created_at ? new Date(user.created_at).toLocaleDateString('pl-PL') : '—'}
                </span>
            )
        },
        {
                    header: 'Akcje',
                    accessor: (team: TeamMember) => (
                        <div className="flex items-center justify-end gap-2">
                            <Link
                                href={`/team/${team.id}`}
                                className="text-indigo-400 hover:text-indigo-300 text-xs font-medium px-2.5 py-1 rounded-md bg-indigo-500/10 hover:bg-indigo-500/20 transition-colors"
                            >
                                Szczegóły
                            </Link>
                            <button
                                onClick={() => deleteUser(team.id, team.name)}
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
            data={users}
            columns={columns}
        
            emptyText="Brak członków zespołu w bazie."
        />
    );
}