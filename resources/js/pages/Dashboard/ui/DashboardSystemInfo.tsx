export const DashboardSystemInfo = () => {
    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm flex flex-col justify-between">
            <div>
                <h3 className="text-base font-bold text-slate-100 mb-3">Informacje o systemie</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                    Panel zarządzania EasyTeamManager został zaprojektowany w architekturze <strong className="text-slate-200">Feature-Sliced Design</strong> z użyciem <strong className="text-slate-200">Laravel, Inertia.js, React oraz Tailwind CSS</strong>.
                </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800">
                <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Wersja aplikacji:</span>
                    <span className="font-mono font-medium text-slate-200">1.0.0-rc</span>
                </div>
            </div>
        </div>
    );
};