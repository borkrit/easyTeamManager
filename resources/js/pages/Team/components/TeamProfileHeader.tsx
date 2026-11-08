import { Badge } from '@/shared/ui/badge';

interface TeamProfileHeaderProps {
    name: string;
    email: string;
    role: string;
}

export const TeamProfileHeader = ({ name, email, role }: TeamProfileHeaderProps) => {
    return (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold text-2xl uppercase">
                    {name.slice(0, 2)}
                </div>
                <div>
                    <h1 className="text-2xl font-extrabold text-slate-100">{name}</h1>
                    <p className="text-sm text-slate-400">{email}</p>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <div className="text-right">
                    <span className="text-xs text-slate-500 block">Rola w zespole</span>
                    <Badge variant="default" size="md">
                        {role.toUpperCase()}
                    </Badge>
                </div>
            </div>
        </div>
    );
};