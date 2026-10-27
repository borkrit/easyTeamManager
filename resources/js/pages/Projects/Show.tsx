import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppLayout } from '@/layouts/AppLayout';
import { Button } from '@/shared/ui/button';
import { CreateProjectModal } from '@/widgets/index'; 
interface Project {
    id: number;
    name: string;
    description?: string;
    users: { id: number; name: string }[];
    tasks: { id: number; title: string; status: string }[];
    comments: { id: number; body: string; user: { name: string }; created_at: string }[];
}

interface ShowProps {
    project: Project;
    allUsers: { id: number; name: string }[];
}

export default function ProjectShow({ project, allUsers }: ShowProps) {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    return (
        <AppLayout title={project.name}>
            <Head title={project.name} />

            <div className="mb-4">
                <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-slate-100 transition-colors"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Wróć do listy projektów
                </Link>
            </div>

            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-slate-100">{project.name}</h2>
                    <p className="text-sm text-slate-400 mt-1">
                        {project.description || 'Brak opisu projektu.'}
                    </p>
                </div>
                <Button variant="secondary" size="md" onClick={() => setIsEditModalOpen(true)}>
                    Edytuj projekt
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
             
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                        <h3 className="text-lg font-semibold text-slate-200 mb-4">Zadania w projekcie</h3>
                        {project.tasks.length === 0 ? (
                            <p className="text-sm text-slate-500">Brak przypisanych zadań.</p>
                        ) : (
                            <div className="space-y-2">
                                {project.tasks.map((task) => (
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
                </div>

                
                <div className="space-y-6">
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                        <h3 className="text-lg font-semibold text-slate-200 mb-4">Zespół projektu</h3>
                        {project.users.length === 0 ? (
                            <p className="text-sm text-slate-500">Brak członków w zespole.</p>
                        ) : (
                            <div className="space-y-2">
                                {project.users.map((user) => (
                                    <div key={user.id} className="text-sm text-slate-300 py-1 border-b border-slate-800/50 last:border-0">
                                        {user.name}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            
            <CreateProjectModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                users={allUsers}
                initialData={project}
            />
        </AppLayout>
    );
}