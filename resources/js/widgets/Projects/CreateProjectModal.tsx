import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { Button } from '@/shared/ui/button';

interface ProjectData {
    id?: number;
    name: string;
    description?: string | null;
    users?: { id: number; name: string }[];
}

interface CreateProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    users?: { id: number; name: string; email?: string }[];
    initialData?: ProjectData | null; 
}

export function CreateProjectModal({ isOpen, onClose, users = [], initialData = null }: CreateProjectModalProps) {
    const isEditing = Boolean(initialData?.id);

    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        name: '',
        description: '',
        user_ids: [] as number[],
    });

    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                setData({
                    name: initialData.name || '',
                    description: initialData.description || '',
                    user_ids: initialData.users ? initialData.users.map((u) => u.id) : [],
                });
            } else {
                reset();
            }
            clearErrors();
        }
    }, [isOpen, initialData]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEditing && initialData?.id) {
            put(`/projects/${initialData.id}`, {
                onSuccess: () => {
                    onClose();
                },
            });
        } else {
            post('/projects', {
                onSuccess: () => {
                    reset();
                    onClose();
                },
            });
        }
    };

    const toggleUser = (userId: number) => {
        setData(
            'user_ids',
            data.user_ids.includes(userId)
                ? data.user_ids.filter((id) => id !== userId)
                : [...data.user_ids, userId]
        );
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-lg p-6 shadow-xl text-slate-100">
                <div className="flex justify-between items-center mb-5">
                    <h3 className="text-lg font-bold">
                        {isEditing ? 'Edytuj projekt' : 'Utwórz nowy projekt'}
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-200 text-xl font-bold"
                    >
                        &times;
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">
                            Nazwa projektu *
                        </label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                            placeholder="np. Redesign strony internetowej"
                        />
                        {errors.name && (
                            <span className="text-xs text-red-400 mt-1 block">{errors.name}</span>
                        )}
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">
                            Opis projektu
                        </label>
                        <textarea
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            rows={3}
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                            placeholder="Krótki opis celów projektu..."
                        />
                        {errors.description && (
                            <span className="text-xs text-red-400 mt-1 block">{errors.description}</span>
                        )}
                    </div>

                    {users.length > 0 && (
                        <div>
                            <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">
                                Przypisz członków zespołu
                            </label>
                            <div className="max-h-36 overflow-y-auto space-y-1.5 pr-1">
                                {users.map((user) => (
                                    <label
                                        key={user.id}
                                        className="flex items-center gap-2 p-2 rounded-lg bg-slate-950/60 border border-slate-800/80 cursor-pointer hover:bg-slate-800/50"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={data.user_ids.includes(user.id)}
                                            onChange={() => toggleUser(user.id)}
                                            className="rounded border-slate-700 bg-slate-900 text-indigo-600 focus:ring-indigo-500/20"
                                        />
                                        <span className="text-sm text-slate-300">{user.name}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                        <Button
                            type="button"
                            variant="secondary"
                            size="md"
                            onClick={onClose}
                            disabled={processing}
                        >
                            Anuluj
                        </Button>
                        <Button type="submit" variant="primary" size="md" disabled={processing}>
                            {processing ? 'Zapisywanie...' : isEditing ? 'Zapisz zmiany' : 'Utwórz projekt'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}