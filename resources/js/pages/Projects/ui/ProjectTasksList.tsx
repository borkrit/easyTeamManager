interface ProjectTasksListProps {
    tasks?: Array<{ id: number; title: string; status: string }>;
}

export const ProjectTasksList = ({ tasks = [] }: ProjectTasksListProps) => {
    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <h3 className="text-lg font-semibold text-slate-200 mb-4">Zadania w projekcie</h3>
            {tasks.length === 0 ? (
                <p className="text-sm text-slate-500">Brak przypisanych zadań.</p>
            ) : (
                <div className="space-y-2">
                    {tasks.map((task) => (
                        <div
                            key={task.id}
                            className="flex items-center justify-between p-3 bg-slate-950 border border-slate-800/80 rounded-lg"
                        >
                            <span className="text-sm text-slate-300">{task.title}</span>
                            <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                                {task.status}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};