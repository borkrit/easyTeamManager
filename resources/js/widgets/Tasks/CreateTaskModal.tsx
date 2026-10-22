import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { Button } from '@/shared/ui/button';
import { UiTask } from '@/widgets/Tasks/TaskTable';

interface User {
    id: number;
    name: string;
}

interface Project {
    id: number;
    name: string;
    users?: User[];
}

interface CreateTaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    projectId?: number;
    users: User[];
    projects?: Project[];
    task?: UiTask | null; 
}

export function CreateTaskModal({ isOpen, onClose, projectId, users = [], projects = [], task = null }: CreateTaskModalProps) {
    const isEditing = !!task;

    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        project_id: task?.project_id || projectId || (projects[0]?.id ?? ''),
        title: task?.title || '',
        description: task?.description || '',
        user_id: task?.user_id || ('' as number | ''),
        status: task?.status || 'do_zrobienia',
        priority: task?.priority || 'sredni',
    });

    useEffect(() => {
        if (isOpen) {
            if (task) {
                setData({
                    project_id: task.project_id || '',
                    title: task.title,
                    description: task.description || '',
                    user_id: task.user_id || '',
                    status: task.status,
                    priority: task.priority || 'sredni',
                });
            } else {
                setData('project_id', projectId || (projects[0]?.id ?? ''));
                reset('title', 'description', 'user_id', 'status', 'priority');
            }
            clearErrors();
        }
    }, [isOpen, task, projectId]);

    if (!isOpen) return null;

    const currentProject = projects.find((p) => p.id === Number(data.project_id));
    const availableUsers = projects.length > 0 
        ? (currentProject?.users || []) 
        : users;

    const hasNoUsers = availableUsers.length === 0;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEditing && task) {
            put(`/tasks/${task.id}`, {
                onSuccess: () => {
                    reset();
                    onClose();
                },
            });
        } else {
            post('/tasks', {
                onSuccess: () => {
                    reset();
                    onClose();
                },
            });
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-lg p-6 shadow-xl text-slate-100 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-5">
                    <h3 className="text-lg font-bold">
                        {isEditing ? 'Edytuj zadanie' : 'Utwórz nowe zadanie'}
                    </h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-200 text-xl font-bold">
                        &times;
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {!projectId && projects.length > 0 && (
                        <div>
                            <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">
                                Projekt *
                            </label>
                            <select
                                value={data.project_id}
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        project_id: Number(e.target.value),
                                        user_id: '',
                                    });
                                }}
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                            >
                                <option value="">Wybierz projekt</option>
                                {projects.map((p) => (
                                    <option key={p.id} value={p.id}>
                                        {p.name}
                                    </option>
                                ))}
                            </select>
                            {errors.project_id && (
                                <span className="text-xs text-red-400 mt-1 block">{errors.project_id}</span>
                            )}
                        </div>
                    )}

                    <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">
                            Tytuł zadania *
                        </label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                            placeholder="np. Implementacja autoryzacji"
                        />
                        {errors.title && <span className="text-xs text-red-400 mt-1 block">{errors.title}</span>}
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Opis</label>
                        <textarea
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            rows={3}
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                            placeholder="Szczegóły zadania..."
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Status</label>
                            <select
                                value={data.status}
                                onChange={(e) => setData('status', e.target.value)}
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                            >
                                <option value="do_zrobienia">Do zrobienia</option>
                                <option value="w_trakcie">W trakcie</option>
                                <option value="zakonczone">Zakończone</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Priorytet</label>
                            <select
                                value={data.priority}
                                onChange={(e) => setData('priority', e.target.value as any)}
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                            >
                                <option value="niski">Niski</option>
                                <option value="sredni">Średni</option>
                                <option value="wysoki">Wysoki</option>
                            </select>
                            {errors.priority && <span className="text-xs text-red-400 mt-1 block">{errors.priority}</span>}
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">
                            Przypisz wykonawcy *
                        </label>
                        <select
                            value={data.user_id}
                            onChange={(e) => setData('user_id', e.target.value ? Number(e.target.value) : '')}
                            disabled={hasNoUsers}
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {hasNoUsers ? (
                                <option value="">Brak dostępnych użytkowników w projekcie</option>
                            ) : (
                                <>
                                    <option value="">Wybierz członka zespołu</option>
                                    {availableUsers.map((user) => (
                                        <option key={user.id} value={user.id}>
                                            {user.name}
                                        </option>
                                    ))}
                                </>
                            )}
                        </select>
                        {hasNoUsers && (
                            <span className="text-xs text-amber-400 mt-1 block">
                                Ten projekt nie ma przypisanych użytkowników.
                            </span>
                        )}
                        {errors.user_id && <span className="text-xs text-red-400 mt-1 block">{errors.user_id}</span>}
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                        <Button type="button" variant="secondary" size="md" onClick={onClose} disabled={processing}>
                            Anuluj
                        </Button>
                        <Button type="submit" variant="primary" size="md" disabled={processing || hasNoUsers}>
                            {processing ? 'Zapisywanie...' : (isEditing ? 'Zapisz zmiany' : 'Utwórz zadanie')}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}