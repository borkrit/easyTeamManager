import { Link } from '@inertiajs/react';
import { Button } from '@/shared/ui/button';

export const DashboardHeader = () => {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
                <h2 className="text-2xl font-bold text-slate-100">Witaj ponownie! 👋</h2>
                <p className="text-sm text-slate-400 mt-1">
                    Oto podsumowanie stanu projektów i zadań w systemie EasyTeamManager.
                </p>
            </div>
            <div className="flex items-center gap-3">
                <Link href="/projects">
                    <Button variant="secondary" size="md">
                        📂 Zobacz projekty
                    </Button>
                </Link>
                <Link href="/tasks">
                    <Button variant="primary" size="md">
                        + Nowe zadanie
                    </Button>
                </Link>
            </div>
        </div>
    );
};