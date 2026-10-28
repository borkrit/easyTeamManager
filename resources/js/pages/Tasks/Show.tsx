import React, { useState } from 'react'; 
import { Head, Link } from '@inertiajs/react';
import { AppLayout } from '@/layouts/AppLayout';
import { Comments, CreateTaskModal } from '@/widgets/index'; 
import { Badge, BadgeVariant } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button'; 
import { BackButton } from '@/shared/ui/backButton';

interface TaskShowProps {
    task: App.Data.TaskData;
    allProjects?: Array<{ id: number; name: string }>; 
    allUsers?: Array<{ id: number; name: string }>;   
}

export default function TaskShow({ task, allProjects = [], allUsers = [] }: TaskShowProps) {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    return (
        <AppLayout title={task.title}>
            <Head title={task.title} />

           
            <BackButton href={'/tasks'}> Wróć do listy zadań </BackButton>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <Badge variant={(task.status as BadgeVariant) || 'default'}>
                            {task.status === 'do_zrobienia' && 'Do zrobienia'}
                            {task.status === 'w_trakcie' && 'W trakcie'}
                            {task.status === 'zakonczone' && 'Zakończone'}
                            {!['do_zrobienia', 'w_trakcie', 'zakonczone'].includes(task.status) && task.status}
                        </Badge>

                        {task.projectName && (
                            <span className="text-xs text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 rounded-md">
                                Projekt: {task.projectName}
                            </span>
                        )}
                    </div>
                    <h1 className="text-2xl font-bold text-slate-100 tracking-tight">{task.title}</h1>
                </div>

                <Button variant="secondary" size="md" onClick={() => setIsEditModalOpen(true)}>
                    Edytuj zadanie
                </Button>
            </div>

           
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
                        <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-3">Opis zadania</h3>
                        <div className="text-sm text-slate-300 whitespace-pre-line leading-relaxed">
                            {task.description || <span className="text-slate-500 italic">Brak opisu dla tego zadania.</span>}
                        </div>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
                        <Comments
                            comments={task.comments || []}
                            commentableType="task"
                            commentableId={task.id}
                        />
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
                        <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider border-b border-slate-800 pb-3">
                            Szczegóły
                        </h3>
                        
                        <div className="space-y-3 text-xs">
                            <div className="flex justify-between items-center py-1.5 border-b border-slate-800/60">
                                <span className="text-slate-400">Priorytet:</span>
                                <span>
                                    {task.priority ? (
                                        <Badge variant={(task.priority as BadgeVariant) || 'sredni'} size="sm">
                                            {(task.priority as string).charAt(0).toUpperCase() + (task.priority as string).slice(1)}
                                        </Badge>
                                    ) : (
                                        <span className="text-slate-500">Brak</span>
                                    )}
                                </span>
                            </div>

                            <div className="flex justify-between items-center py-1.5 border-b border-slate-800/60">
                                <span className="text-slate-400">Przypisana osoba:</span>
                                <span className="font-medium text-slate-200">{task.assigneeName || 'Nie przypisano'}</span>
                            </div>

                            <div className="flex justify-between items-center py-1.5 border-b border-slate-800/60">
                                <span className="text-slate-400">Projekt:</span>
                                <span className="font-medium text-slate-200">{task.projectName || 'Brak projektu'}</span>
                            </div>

                            <div className="flex justify-between items-center py-1.5">
                                <span className="text-slate-400">Utworшено:</span>
                                <span className="text-slate-300">
                                    {task.created_at ? new Date(task.created_at).toLocaleDateString('pl-PL', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric'
                                    }) : '-'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <CreateTaskModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                projects={allProjects}
                users={allUsers}
                task={task}
            />
        </AppLayout>
    );
}