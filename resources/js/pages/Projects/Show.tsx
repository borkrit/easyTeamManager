import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppLayout } from '@/layouts/AppLayout';
import { Button } from '@/shared/ui/button';
import { Comments, CreateProjectModal } from '@/widgets/index'; 
import { BackButton } from '@/shared/ui/backButton';
import { useDeleteResource } from '@/shared/hooks/useDeleteResource';

type Project = App.Data.ProjectData;
interface ShowProps {
    project: Project;
    allUsers: { id: number; name: string }[];
}

export default function ProjectShow({ project, allUsers }: ShowProps) {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    
    const { deleteItem: deleteProject } = useDeleteResource('projects');

    return (
        <AppLayout title={project.name}>
            <Head title={project.name} />

            
            <BackButton href={'/projects'}> Wróć do listy projektów </BackButton>

            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-slate-100">{project.name}</h2>
                    <p className="text-sm text-slate-400 mt-1">
                        {project.description || 'Brak opisu projektu.'}
                    </p>
                </div>
                
                <div className="flex items-center gap-3">
                    <Button variant="secondary" size="md" onClick={() => setIsEditModalOpen(true)}>
                        Edytuj projekt
                    </Button>
                    <Button 
                        variant="danger" 
                        size="md" 
                        onClick={() => deleteProject(project.id, project.name)}
                    >
                        Usuń projekt
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                        <h3 className="text-lg font-semibold text-slate-200 mb-4">Zadania w projekcie</h3>
                        {(!project.tasks || project.tasks.length === 0) ? (
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

                    
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                        <Comments
                            comments={project.comments || []}
                            commentableType="project" 
                            commentableId={project.id}
                        />
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                        <h3 className="text-lg font-semibold text-slate-200 mb-4">Zespół projektu</h3>
                        {(!project.users || project.users.length === 0) ? (
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