import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import { TaskTable, PaginationWidget,UiTask } from '@/widgets'; 
import { AppLayout } from '@/layouts/AppLayout';


interface User {
    id: number;
    name: string;
    email: string;
}


interface PaginatedData<T> {
    data: T[];
    links: { url: string | null; label: string; active: boolean }[];
    from: number | null;
    to: number | null;
    total: number;
}

export default function ProfileShow() {
    const { auth, tasks } = usePage().props as unknown as { 
        auth?: { user?: User };
        tasks?: PaginatedData<UiTask>;
    };
    const user = auth?.user;

    if (!user) {
        return (
            <div className="p-8 text-slate-100">
                <p>Ładowanie profilu lub brak autoryzacji...</p>
            </div>
        );
    }

    return (
        <AppLayout>
            <div className="py-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-slate-100">
                <Head title="Profil użytkownika" />

                <div className="mb-8">
                    <h1 className="text-2xl font-bold tracking-tight">Profil użytkownika</h1>
                    <p className="text-sm text-slate-400 mt-1">
                        Zarządzaj swoimi danymi osobowymi i przeglądaj przypisane zadania.
                    </p>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-6 mb-8">
                    <div className="flex items-center gap-4 pb-6 border-b border-slate-800">
                        <div className="w-16 h-16 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 text-2xl font-bold">
                            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold">{user.name}</h2>
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

                {/* Секция задач с пагинацией */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-lg font-semibold text-slate-100">Twoje zadania</h3>
                            <p className="text-xs text-slate-400 mt-0.5">Lista zadań przypisanych do Twojego konta</p>
                        </div>
                        <span className="px-2.5 py-1 text-xs font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full">
                            Łącznie: {tasks?.total ?? 0}
                        </span>
                    </div>

                    <TaskTable tasks={tasks ?? { data: [] }} selectable={false} />

                    {tasks && (
                        <PaginationWidget 
                            links={tasks.links} 
                            from={tasks.from} 
                            to={tasks.to} 
                            total={tasks.total} 
                        />
                    )}
                </div>
            </div>
        </AppLayout>
    );
}