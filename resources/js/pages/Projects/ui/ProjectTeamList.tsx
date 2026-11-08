
interface ProjectTeamListProps {
    users?: Array<{ id: number; name: string }>;
}

export const ProjectTeamList = ({ users = [] }: ProjectTeamListProps) => {
    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <h3 className="text-lg font-semibold text-slate-200 mb-4">Zespół projektu</h3>
            {users.length === 0 ? (
                <p className="text-sm text-slate-500">Brak członków w zespole.</p>
            ) : (
                <div className="space-y-2">
                    {users.map((user) => (
                        <div key={user.id} className="text-sm text-slate-300 py-1 border-b border-slate-800/50 last:border-0">
                            {user.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};