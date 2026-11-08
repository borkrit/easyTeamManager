
interface ProjectItem {
    id: number;
    name: string;
    description?: string | null;
    tasks_count?: number;
}

interface TeamProjectsListProps {
    projects: ProjectItem[];
}

export const TeamProjectsList = ({ projects }: TeamProjectsListProps) => {
    return (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-slate-100">
                    Projekty ({projects.length})
                </h2>
            </div>

            {projects.length === 0 ? (
                <p className="text-sm text-slate-500 py-4">Brak przypisanych projektów.</p>
            ) : (
                <div className="space-y-3">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="p-4 bg-slate-950 border border-slate-800/80 rounded-xl flex items-center justify-between"
                        >
                            <div>
                                <h3 className="text-sm font-semibold text-slate-200">{project.name}</h3>
                                {project.description && (
                                    <p className="text-xs text-slate-400 mt-1 line-clamp-1">
                                        {project.description}
                                    </p>
                                )}
                            </div>
                            <span className="text-xs text-slate-500 font-medium">
                                {project.tasks_count ?? 0} zadań
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};