import { Head } from '@inertiajs/react';
import { UserProfileHeader } from './ui/UserProfileHeader';
import { UserTasksSection } from './ui/UserTasksSection';
import { useUserProfile } from './hooks/useUserProfile';

export default function ProfileShow() {
    const { user, tasks, isAuthenticated } = useUserProfile();

    if (!isAuthenticated || !user) {
        return (
            <div className="p-8 text-slate-100 flex items-center justify-center min-h-[50vh]">
                <p className="text-slate-400 text-sm">Ładowanie profilu lub brak autoryzacji...</p>
            </div>
        );
    }

    return (
        <>
            <Head title="Profil użytkownika" />

            <div className="py-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-100">Profil użytkownika</h1>
                    <p className="text-sm text-slate-400 mt-1">
                        Zarządzaj swoimi danymi osobowymi i przeglądaj przypisane zadania.
                    </p>
                </div>

                <UserProfileHeader user={user} />

                <UserTasksSection tasks={tasks} />
            </div>
        </>
    );
}