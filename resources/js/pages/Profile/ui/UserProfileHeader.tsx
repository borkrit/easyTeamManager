interface UserProfileHeaderProps {
    user: App.Data.UserData;
}

export const UserProfileHeader = ({ user }: UserProfileHeaderProps) => {
    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-6">
            <div className="flex items-center gap-4 pb-6 border-b border-slate-800">
                <div className="w-16 h-16 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 text-2xl font-bold">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div>
                    <h2 className="text-xl font-semibold text-slate-100">{user.name}</h2>
                    <p className="text-sm text-slate-400">{user.email}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-950 p-4 rounded-lg border border-slate-800/60">
                    <span className="block text-xs font-semibold text-slate-400 uppercase mb-1">
                        Imię i nazwisko
                    </span>
                    <span className="text-sm text-slate-200">{user.name}</span>
                </div>

                <div className="bg-slate-950 p-4 rounded-lg border border-slate-800/60">
                    <span className="block text-xs font-semibold text-slate-400 uppercase mb-1">
                        Adres E-mail
                    </span>
                    <span className="text-sm text-slate-200">{user.email}</span>
                </div>
            </div>
        </div>
    );
};