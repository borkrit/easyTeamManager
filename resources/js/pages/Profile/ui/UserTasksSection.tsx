import { TaskTable, UiTask } from '@/widgets';
import { Pagination } from '@/shared/ui/pagination';

interface PaginatedData<T> {
    data: T[];
    links: { url: string | null; label: string; active: boolean }[];
    from: number | null;
    to: number | null;
    total: number;
}


interface UserTasksSectionProps {
    tasks?: PaginatedData<UiTask>;
}

export const UserTasksSection = ({ tasks }: UserTasksSectionProps) => {
    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-slate-100">Twoje zadania</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Lista zadań przypisanych do Twojego konta</p>
                </div>
                <span className="px-2.5 py-1 text-xs font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full">
                    Łącznie: {tasks?.total ?? 0}
                </span>
            </div>

            <TaskTable tasks={tasks ?? { data: [] }} selectable={false} />

            {tasks && tasks.links && (
                <Pagination 
                    links={tasks.links} 
                    from={tasks.from} 
                    to={tasks.to} 
                    total={tasks.total} 
                />
            )}
        </div>
    );
};